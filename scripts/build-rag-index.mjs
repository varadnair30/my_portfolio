import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";
// Default: gemini-embedding-001 (current). If 404, try GEMINI_EMBED_MODEL=text-embedding-005
const EMBED_MODEL = process.env.GEMINI_EMBED_MODEL || "gemini-embedding-001";

if (!GEMINI_API_KEY) {
  console.error(
    "Missing GEMINI_API_KEY (or GOOGLE_API_KEY). Get a free key at https://aistudio.google.com/apikey\n" +
      "Example: $env:GEMINI_API_KEY='your-key'; npm run rag:build"
  );
  process.exit(1);
}

function normalize(vec) {
  const norm = Math.sqrt(vec.reduce((acc, x) => acc + x * x, 0)) || 1;
  return vec.map((x) => x / norm);
}

function collapseWhitespace(s) {
  return s
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function chunkText(text, { maxLen = 900, overlap = 120 } = {}) {
  const t = collapseWhitespace(text);
  if (!t) return [];
  if (t.length <= maxLen) return [t];

  const paras = t.split("\n\n").flatMap((p) => (p ? [p] : []));
  const chunks = [];
  let buf = "";

  const flush = () => {
    const out = buf.trim();
    if (out) chunks.push(out);
    buf = "";
  };

  for (const p of paras) {
    if (!buf) {
      buf = p;
      continue;
    }
    if ((buf + "\n\n" + p).length <= maxLen) {
      buf += "\n\n" + p;
    } else {
      flush();
      buf = p;
    }
  }
  flush();

  if (chunks.length <= 1 || overlap <= 0) return chunks;
  const withOverlap = [];
  for (let i = 0; i < chunks.length; i++) {
    const prevTail = i === 0 ? "" : chunks[i - 1].slice(-overlap);
    const merged = (prevTail ? prevTail + "\n\n" : "") + chunks[i];
    withOverlap.push(merged);
  }
  return withOverlap;
}

async function geminiEmbedOne(text, apiKey) {
  const url = `${GEMINI_BASE}/models/${EMBED_MODEL}:embedContent?key=${encodeURIComponent(apiKey)}`;
  const body = { content: { parts: [{ text }] } };
  if (EMBED_MODEL !== "embedding-001") body.taskType = "RETRIEVAL_DOCUMENT";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    const hint =
      res.status === 404
        ? "\n\nTry: $env:GEMINI_EMBED_MODEL='text-embedding-005'; npm run rag:build\nOr list models: GET https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_KEY"
        : "";
    throw new Error(`Gemini embed failed (${res.status}): ${err}${hint}`);
  }
  const data = await res.json();
  const values = data?.embedding?.values ?? data?.embeddings?.[0]?.values;
  if (!Array.isArray(values)) throw new Error("Unexpected Gemini embedding response.");
  return values;
}

async function geminiEmbedBatch(inputs, apiKey, concurrency = 5) {
  const vectors = [];
  for (let i = 0; i < inputs.length; i += concurrency) {
    const batch = inputs.slice(i, i + concurrency);
    const results = await Promise.all(batch.map((text) => geminiEmbedOne(text, apiKey)));
    vectors.push(...results);
  }
  return vectors;
}

function makeDoc({ section, href, title, body, tags = [], links = [] }) {
  const lines = [
    `Section: ${section}`,
    title ? `Title: ${title}` : null,
    tags.length ? `Tags: ${tags.join(", ")}` : null,
    links.length ? `Links: ${links.join(" | ")}` : null,
    href ? `Anchor: ${href}` : null,
    "",
    body,
  ].filter(Boolean);
  return collapseWhitespace(lines.join("\n"));
}

async function main() {
  process.env.PUBLIC_URL = process.env.PUBLIC_URL || "";

  const kbPath = pathToFileURL(
    path.join(repoRoot, "src", "portfolio", "knowledgeBase.mjs")
  ).href;
  const kb = await import(kbPath);

  const rawDocs = [];

  // Contact / personal info
  rawDocs.push({
    section: "contact",
    href: "#contact",
    title: "Contact Varad Nair",
    body: [
      "Name: Varad Nair",
      `Email: ${kb.portfolioOwner.email}`,
      `GitHub: ${kb.portfolioOwner.links.github}`,
      `LinkedIn: ${kb.portfolioOwner.links.linkedin}`,
      `LeetCode: ${kb.portfolioOwner.links.leetcode}`,
      `Resume: ${kb.portfolioOwner.links.resume}`,
      "",
      "To contact Varad, you can reach him via email at vnairusa30@gmail.com, connect on LinkedIn at linkedin.com/in/nvarad, or view his GitHub at github.com/varadnair30.",
    ].join("\n"),
  });

  rawDocs.push({
    section: "about",
    href: "#about",
    title: "About Varad Nair",
    body: [kb.about.lead, ...kb.about.paragraphs].join("\n\n"),
  });

  for (const p of kb.projects) {
    rawDocs.push({
      section: "projects",
      href: "#projects",
      title: p.title,
      tags: p.tech,
      links: [p.github, p.demo].filter(Boolean),
      body: p.description,
    });
  }

  for (const e of kb.experiences) {
    rawDocs.push({
      section: "experience",
      href: "#experience",
      title: `${e.title} — ${e.company}`,
      tags: e.tech,
      body: [
        `Duration: ${e.duration}`,
        `Location: ${e.location}`,
        "",
        "Highlights:",
        ...e.bullets.map((b) => `- ${b}`),
      ].join("\n"),
    });
  }

  rawDocs.push({
    section: "skills",
    href: "#skills",
    title: "Technical Skills",
    body: kb.skillCategories
      .map((c) => `${c.category}: ${c.skills.map((s) => s.name).join(", ")}`)
      .join("\n"),
  });

  for (const a of kb.leadership.achievements) {
    rawDocs.push({
      section: "leadership",
      href: "#leadership",
      title: `${a.title} — ${a.organization}`,
      tags: a.tags,
      body: [a.description, `Impact: ${a.impact}`].join("\n\n"),
    });
  }

  for (const c of kb.certifications) {
    rawDocs.push({
      section: "certifications",
      href: "#certifications",
      title: `${c.name} — ${c.issuer}`,
      links: [c.link].filter(Boolean),
      body: `${c.name} (${c.issuer})`,
    });
  }

  for (const t of kb.testimonials) {
    rawDocs.push({
      section: "testimonials",
      href: "#testimonials",
      title: `${t.name} — ${t.title}`,
      links: [t.linkedIn].filter(Boolean),
      body: t.text,
    });
  }

  const h = kb.highlights?.aitInternship;
  if (h) {
    rawDocs.push({
      section: "highlights",
      href: "#ait-internship",
      title: h.title,
      body: [h.subtitle, h.description].filter(Boolean).join("\n\n"),
    });
  }

  const docs = rawDocs.map((d) => ({ ...d, text: makeDoc(d) }));

  const chunks = [];
  for (const d of docs) {
    const parts = chunkText(d.text, { maxLen: 900, overlap: 120 });
    for (let i = 0; i < parts.length; i++) {
      chunks.push({
        id: `${d.section}:${chunks.length}`,
        section: d.section,
        href: d.href,
        title: d.title,
        text: parts[i],
      });
    }
  }

  console.log(`Prepared ${chunks.length} chunks. Embedding with Gemini (${EMBED_MODEL})...`);

  const inputs = chunks.map((c) => c.text);
  const vectors = await geminiEmbedBatch(inputs, GEMINI_API_KEY);
  const normalized = vectors.map(normalize);

  const out = {
    schemaVersion: 1,
    createdAt: new Date().toISOString(),
    embeddingModel: EMBED_MODEL,
    chunks: chunks.map((c, idx) => ({
      ...c,
      embedding: normalized[idx],
    })),
  };

  const outDir = path.join(repoRoot, "public", "rag");
  await fs.mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, "portfolio-index.json");
  await fs.writeFile(outPath, JSON.stringify(out), "utf-8");

  console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
