# Portfolio Chat – Where to Set API Keys & What to Deploy

The "Ask about Varad" chat uses **Google Gemini** (free tier). You need a **Gemini API key** — no paid OpenAI account.

Get a free key: **[Google AI Studio → Get API key](https://aistudio.google.com/apikey)**

---

## 1. Gemini API key (used in two places)

- **Build the RAG index** (one-time on your machine): set `GEMINI_API_KEY` in your terminal when you run `npm run rag:build`.
- **Run the chat API** (Cloudflare Worker): add the same key as a secret: `wrangler secret put GEMINI_API_KEY`.

Do **not** put the key in the React app or in any file you commit.

---

## 2. Generate the RAG index (local, one-time)

From the **project root**:

```powershell
$env:GEMINI_API_KEY = "your-gemini-key-here"
npm run rag:build
```

This creates `public/rag/portfolio-index.json`. Commit and push, then deploy your site (e.g. GitHub Pages) so that file is publicly available, e.g.:

`https://varadnair30.github.io/my_portfolio/rag/portfolio-index.json`

**If you see "model is not found" (404):** The default is `gemini-embedding-001`. If that’s not available for your key, try:

```powershell
$env:GEMINI_EMBED_MODEL = "text-embedding-005"
$env:GEMINI_API_KEY = "your-key"
npm run rag:build
```

To see which models your key supports, open in a browser (with your key):  
`https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_KEY`  
and look for models whose name contains `embedding`. Use that name as `GEMINI_EMBED_MODEL`. Set the same value in the worker’s `wrangler.toml` so the chat API matches the index.

---

## 3. Deploy the chat API (Cloudflare Worker)

The chat widget calls a **backend** (Cloudflare Worker). That worker uses your **Gemini** key and the URL of the index you deployed.

1. Install Wrangler and log in:

   ```powershell
   npm i -g wrangler
   wrangler login
   ```

2. Go to the worker folder:

   ```powershell
   cd workers/portfolio-chat
   ```

3. Add your **Gemini** key as a secret:

   ```powershell
   wrangler secret put GEMINI_API_KEY
   ```
   Paste your key when prompted.

4. Edit `wrangler.toml` and set the index URL (after your site is deployed):

   ```toml
   PORTFOLIO_INDEX_URL = "https://varadnair30.github.io/my_portfolio/rag/portfolio-index.json"
   ```

5. Deploy the worker:

   ```powershell
   wrangler deploy
   ```

   Note the URL it prints, e.g. `https://varad-portfolio-chat.<your-subdomain>.workers.dev`.

---

## 4. Point the React app at your worker (optional)

By default the app uses a placeholder URL. To use **your** worker:

1. In the project root, copy `.env.example` to `.env`.
2. Set your worker’s chat URL:

   ```
   REACT_APP_CHAT_API_URL=https://varad-portfolio-chat.<your-subdomain>.workers.dev/api/chat
   ```

3. Rebuild and redeploy the React app:

   ```powershell
   npm run build
   npm run deploy
   ```

---

## 5. Updating portfolio content (adding new projects, experience, etc.)

The chatbot reads from a static index built at deploy time — it has **no automatic awareness of changes**. Every time you update your portfolio, do these 3 steps:

**Step 1 — Update the knowledge base**

Edit `src/portfolio/knowledgeBase.mjs` and add your new project, experience, certification, etc.

**Step 2 — Rebuild the RAG index** (from project root):

```powershell
$env:GEMINI_API_KEY = "your-gemini-key-here"
npm run rag:build
```

**Step 3 — Redeploy the site** (publishes the updated index):

```powershell
npm run build
npm run deploy
```

That's it. The worker does **not** need to be redeployed unless you change `wrangler.toml` settings.

---

## Summary

| Where | What to set |
|-------|-------------|
| **Local (PowerShell)** | `GEMINI_API_KEY` when running `npm run rag:build` |
| **Cloudflare Worker** | Secret: `GEMINI_API_KEY`; in `wrangler.toml`: `PORTFOLIO_INDEX_URL` |
| **React app** | In `.env`: `REACT_APP_CHAT_API_URL` = your worker URL + `/api/chat` |

After the index is built and deployed, the worker is deployed with the Gemini secret and index URL, and (optionally) the app is built with `REACT_APP_CHAT_API_URL`, the chat should work.
