## Portfolio RAG Chat API (Cloudflare Worker)

This worker exposes `POST /api/chat` and answers **only** from your portfolio RAG index, using **Google Gemini** (free tier) for embeddings and chat.

If it can’t find relevant context (or the question is out-of-scope), it returns exactly:

`I don't have information about it`

### Prereqs

- [Gemini API key](https://aistudio.google.com/apikey) (free)
- Cloudflare account
- `wrangler` installed (recommended: `npm i -g wrangler`)

### 1) Generate the index

From repo root:

```powershell
$env:GEMINI_API_KEY = "your-key"
npm run rag:build
```

This writes `public/rag/portfolio-index.json`.

### 2) Deploy your site (GitHub Pages)

Deploy your CRA build so the index is publicly reachable at `/rag/portfolio-index.json`.

### 3) Configure and deploy the worker

From `workers/portfolio-chat/`:

```powershell
wrangler login
wrangler secret put GEMINI_API_KEY
```

Edit `wrangler.toml` and set:

- `PORTFOLIO_INDEX_URL` to your deployed index URL

Then deploy:

```powershell
wrangler deploy
```

### 4) Call it

```powershell
curl -X POST "https://<your-worker>.workers.dev/api/chat" -H "Content-Type: application/json" -d "{\"message\":\"What is ReachCraft?\"}"
```
