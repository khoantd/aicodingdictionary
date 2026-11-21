# The AI Coding Dictionary

A plain-English dictionary of AI coding terms on an explorable 3D map — also readable by AI agents.

Clone-inspired by [aicodingdictionary.com](https://www.aicodingdictionary.com/) with original wording. Static Next.js export + three.js force graph, plus Markdown/JSON/MCP surfaces for agents.

## Quick start

```bash
cd app
npm install
npm run build          # static site → app/out/
npx serve out          # or any static file server
```

Optional local MCP server (after build):

```bash
cd app && npm run mcp
```

## What’s inside

| Path | Purpose |
|------|---------|
| `app/` | Next.js product (source in `app/src/`) |
| `app/src/data/terms.ts` | ~72 dictionary entries across 7 sections |
| `app/src/data/tours.ts` | Guided tours through the map |
| `app/src/components/` | 3D atlas UI (`Atlas`, `GraphScene`) |
| `/agents` (in the site) | Copy-paste agent / MCP setup |

Agent-readable endpoints after build: `/llms.txt`, `/api/terms.json`, `/openapi.json`, `/mcp/dictionary-mcp.mjs`.

## AI agents working on this repo

See [AGENTS.md](./AGENTS.md). Cursor hub: `.cursor/CURSOR.md`.
