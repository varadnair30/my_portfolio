const DEFAULT_FALLBACK = "I don't have information about it";

const OUT_OF_SCOPE_PATTERNS = [
  /\b(fight|fights|fought)\b/i,
  /\b(disagreement|disagreements)\b/i,
  /\b(argument|arguments|argue|argued)\b/i,
  /\b(conflict|conflicts)\b/i,
  /\b(controversy|controversies)\b/i,
  /\b(relationship|girlfriend|boyfriend|dating|marriage|wife|husband)\b/i,
  /\b(religion|politics|political)\b/i,
  /\b(arrest|crime|criminal)\b/i,
];

function json(data, { status = 200, headers = {} } = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    },
  });
}

function corsHeaders(req, env) {
  const origin = req.headers.get("Origin") || "";
  const allow = (env.ALLOWED_ORIGINS || "*").split(",").map((s) => s.trim());
  const allowOrigin =
    allow.includes("*") || allow.includes(origin) ? (allow.includes("*") ? "*" : origin) : "";
  return {
    "Access-Control-Allow-Origin": allowOrigin || "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function isOutOfScope(q) {
  const question = (q || "").trim();
  if (!question) return true;
  return OUT_OF_SCOPE_PATTERNS.some((re) => re.test(question));
}

function normalize(vec) {
  const norm = Math.sqrt(vec.reduce((acc, x) => acc + x * x, 0)) || 1;
  return vec.map((x) => x / norm);
}

function dot(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

let cachedIndex = null;
let cachedIndexAt = 0;

async function loadIndex(env) {
  const ttlMs = Number(env.INDEX_CACHE_TTL_MS || 10 * 60 * 1000);
  if (cachedIndex && Date.now() - cachedIndexAt < ttlMs) return cachedIndex;

  const url = env.PORTFOLIO_INDEX_URL;
  if (!url) throw new Error("Missing PORTFOLIO_INDEX_URL.");

  const res = await fetch(url, { cf: { cacheTtl: 300, cacheEverything: true } });
  if (!res.ok) throw new Error(`Failed to fetch index (${res.status})`);

  const data = await res.json();
  if (!data?.chunks?.length) throw new Error("Index missing chunks.");

  cachedIndex = data;
  cachedIndexAt = Date.now();
  return data;
}

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

async function geminiEmbed({ input, env }) {
  const apiKey = env.GEMINI_API_KEY || env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY (or GOOGLE_API_KEY).");

  const model = env.GEMINI_EMBED_MODEL || "gemini-embedding-001";
  const url = `${GEMINI_BASE}/models/${model}:embedContent?key=${encodeURIComponent(apiKey)}`;

  const body = { content: { parts: [{ text: input }] } };
  if (model !== "embedding-001") body.taskType = "RETRIEVAL_QUERY";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Gemini embed failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  const values = data?.embedding?.values ?? data?.embeddings?.[0]?.values;
  if (!Array.isArray(values)) throw new Error("Unexpected Gemini embedding response.");
  return values;
}

async function geminiChat({ systemInstruction, userText, env }) {
  const apiKey = env.GEMINI_API_KEY || env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY (or GOOGLE_API_KEY).");

  const model = env.GEMINI_CHAT_MODEL || "gemini-2.5-flash";
  const url = `${GEMINI_BASE}/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: [{ role: "user", parts: [{ text: userText }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 450,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Gemini generateContent failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  const textPart = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return (textPart || "").trim();
}

function buildSystemPrompt({ fallback }) {
  return [
    "You are a professional portfolio assistant for Varad Nair, helping recruiters and hiring managers learn about him.",
    "You MUST answer strictly and only using the provided context excerpts from Varad's portfolio.",
    `If the context does not contain the answer, or the question is outside the portfolio scope, reply with exactly: ${fallback}`,
    "Do not guess. Do not use external knowledge. Do not infer private details.",
    "If asked about personal conflicts/disagreements/fights or anything not explicitly in the portfolio context, use the fallback.",
    "Write answers in a natural, flowing paragraph style — like a knowledgeable colleague describing Varad to a recruiter.",
    "Use complete sentences. Mention specific details like role titles, company names, technologies, dates, and measurable impact when available in the context.",
    "Do NOT use bullet points or lists unless the question explicitly asks for a list (e.g. 'list his skills').",
    "Keep answers concise — 3 to 5 sentences is ideal. Be specific and highlight what makes Varad stand out.",
  ].join("\n");
}

function pickTopChunks({ chunks, queryEmbedding, topK, threshold }) {
  const scored = chunks
    .map((c) => ({ chunk: c, score: dot(queryEmbedding, c.embedding) }))
    .sort((a, b) => b.score - a.score);

  const best = scored[0];
  if (!best || best.score < threshold) return { picked: [], bestScore: best?.score ?? null };

  const picked = scored.slice(0, topK).map((s) => s.chunk);
  return { picked, bestScore: best.score };
}

function formatContext(picked) {
  return picked
    .map((c, i) => {
      const header = `[${i + 1}] (${c.section}${c.title ? `: ${c.title}` : ""}) ${c.href || ""}`.trim();
      return `${header}\n${c.text}`;
    })
    .join("\n\n---\n\n");
}

export default {
  async fetch(req, env) {
    const cors = corsHeaders(req, env);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

    try {
      const url = new URL(req.url);
      // GET / → friendly info (browser visit); only POST /api/chat handles chat
      if (req.method === "GET" && (url.pathname === "/" || url.pathname === "")) {
        return json(
          {
            service: "Portfolio RAG Chat",
            usage: "POST to /api/chat with JSON body: { \"message\": \"your question\" }",
            docs: "See project CHAT_SETUP.md",
          },
          { headers: cors }
        );
      }
      if (req.method !== "POST" || url.pathname !== "/api/chat") {
        return json({ error: "Not found" }, { status: 404, headers: cors });
      }

      const body = await req.json().catch(() => ({}));
      const question = (body?.message || "").toString().trim();

      if (!question || question.length > 1000) {
        return json({ answer: DEFAULT_FALLBACK, sources: [] }, { headers: cors });
      }

      if (isOutOfScope(question)) {
        return json({ answer: DEFAULT_FALLBACK, sources: [] }, { headers: cors });
      }

      const index = await loadIndex(env);

      const qEmbed = normalize(
        await geminiEmbed({ input: question, env })
      );

      const topK = Number(env.TOP_K || 6);
      const threshold = Number(env.SIMILARITY_THRESHOLD || 0.45);

      const { picked, bestScore } = pickTopChunks({
        chunks: index.chunks,
        queryEmbedding: qEmbed,
        topK,
        threshold,
      });

      if (!picked.length) {
        return json(
          { answer: DEFAULT_FALLBACK, sources: [], debug: env.DEBUG ? { bestScore } : undefined },
          { headers: cors }
        );
      }

      const context = formatContext(picked);
      const system = buildSystemPrompt({ fallback: DEFAULT_FALLBACK });
      const userText = [
        "Context excerpts (use these only):",
        context,
        "",
        `Question: ${question}`,
        "",
        `If you cannot answer from the context, reply exactly: ${DEFAULT_FALLBACK}`,
      ].join("\n");

      const assistant = await geminiChat({ systemInstruction: system, userText, env });

      const safeAnswer = assistant || DEFAULT_FALLBACK;
      const answer =
        safeAnswer.toLowerCase().includes("i don't have information about it".toLowerCase())
          ? DEFAULT_FALLBACK
          : safeAnswer;

      const sources = picked.slice(0, 4).map((c) => ({
        section: c.section,
        title: c.title || c.section,
        href: c.href || "",
      }));

      return json(
        { answer, sources, debug: env.DEBUG ? { bestScore, threshold } : undefined },
        { headers: cors }
      );
    } catch (err) {
      return json(
        {
          answer: DEFAULT_FALLBACK,
          sources: [],
          error: env.DEBUG ? String(err?.message || err) : undefined,
        },
        { headers: cors }
      );
    }
  },
};
