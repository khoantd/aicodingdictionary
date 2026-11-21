# Project structure map

> Persistent overview for AI agents. Generated on first run by `/understand` (see `.cursor/commands/understand-project.md`). Update when architecture changes significantly.

## Meta

| Field | Value |
|-------|-------|
| **Updated** | 2026-11-21 |
| **Tool** | cursor |

## Stack

- **App:** Next.js 16 (App Router) + React 19 + TypeScript, static export (`output: "export"`)
- **3D:** three.js custom force-layout graph (`GraphScene`)
- **No backend DB** — dictionary content is in-repo TypeScript data modules
- **Agent surfaces:** static JSON/Markdown/OpenAPI routes, in-page WebMCP/`window.aiCodingDictionary`, downloadable MCP script
- **Scaffolding:** class-ai-agent under `.cursor/` / `.claude/` / `.kiro/` / `.agents/` (not part of the product runtime)

## Layout

| Path | Purpose |
|------|---------|
| `app/` | The product — Next.js site (source in `app/src/`, static build in `app/out/`) |
| `app/src/app/` | Routes: home, `/intro`, `/terms`, `/agents`, `llms.txt`, OpenAPI, API JSON/MD, MCP download |
| `app/src/components/` | UI: `Experience` → `Atlas` / `Fallback`, `TermPanel`, `TermList`, `graph/GraphScene` |
| `app/src/data/` | Dictionary (`terms.ts` ~72 terms, 7 sections) and guided `tours.ts` |
| `app/src/lib/` | Search, markdown/JSON export, sound, in-page agent tools |
| `capture/` | Study artifacts from original aicodingdictionary.com (screenshots, how-it-works) |
| `checks/` | Visual regression comparison rounds vs original |
| `craft.json` / `feed.json` | Craft-anything build status and agent session feed |
| `investigation.cany/` | Investigation notes from clone study |
| `.agent/` | Cross-tool SESSION / PROJECT continuity |
| `.cursor/` (canonical) + synced `.claude/` `.kiro/` `.agents/` | AI agent workflow scaffolding |

## Entry points

- **Home UI:** `app/src/app/page.tsx` → `Experience` (WebGL map or Fallback) + hidden `TermList`
- **3D map shell:** `app/src/components/Atlas.tsx` (search, panel, tours, agent tool registration)
- **Renderer:** `app/src/components/graph/GraphScene.ts` (three.js force layout, edges, colors, tour path)
- **Content:** `app/src/data/terms.ts`, `app/src/data/tours.ts`
- **Introduction:** `app/src/app/intro/page.tsx`
- **Agent connect page:** `app/src/app/agents/page.tsx`
- **Static MCP file:** built/served under `/mcp/dictionary-mcp.mjs` (also `npm run mcp` from `app/`)
- **Build config:** `app/next.config.mjs` (static export, trailing slash)

## Key files

- `app/src/data/terms.ts` — SITE, SECTIONS, TERMS, findTerm, neighbours
- `app/src/data/tours.ts` — guided tours through the map
- `app/src/components/Experience.tsx` — WebGL detect → Atlas vs Fallback
- `app/src/components/Atlas.tsx` — main interactive UI
- `app/src/lib/agentTools.ts` — search_terms, get_term, tours, etc.
- `app/src/lib/search.ts` — fuzzy search / suggestions
- `app/src/app/llms.txt/route.ts`, `llms-full.txt`, `openapi.json`, `api/*` — agent-readable static assets
- `craft.json` — project status (~98% visual likeness vs original; 6/6 claims)

## Commands

| Action | Command |
|--------|---------|
| Install | `cd app && npm install` |
| Build | `cd app && npm run build` (writes static site to `app/out/`) |
| MCP local | `cd app && npm run mcp` (runs `out/mcp/dictionary-mcp.mjs`) |
| Dev | No `dev` script in package.json — use `npx next dev` from `app/` if needed |
| Serve static | Serve `app/out/` (e.g. any static file server) |

## Code intelligence

| Item | Status |
|------|--------|
| CodeGraph index | Present — `.codegraph/` (~96 files indexed; includes agent skill trees + `app/src`) |
| Workspace root | `/Volumes/Data/Software Development/TypeScript/aicodingdictionary` |
| OntoSight | `npx royalsolution-ontosight@0.2.1 "/Volumes/Data/Software Development/TypeScript/aicodingdictionary" --path app/src` |

## Notes

- Clone of [aicodingdictionary.com](https://www.aicodingdictionary.com/) with **original wording** (not copied definitions); visual check ~98%, text ~72% by design.
- Seven sections: model, sessions, tools, failure, handoffs, memory, patterns.
- Four guided tours (e.g. “Anatomy of a turn”, “Keeping costs down”) plus `/agents` connect page.
- Root has no `package.json` / README — product lives entirely under `app/`.
- Prefer structural queries with `--path app/src` / task wording that names Atlas/terms; CodeGraph also indexes vendored skill Python under `.cursor/skills/`.
