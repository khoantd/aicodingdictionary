# Agent session

> Cross-tool handoff state for Cursor, Claude Code, and Kiro. Update at session end (`/handoff`) or phase changes; read at session start (`/resume`).

## Meta

| Field | Value |
|-------|-------|
| **Updated** | 2026-11-22 |
| **Phase** | build |
| **Tool** | cursor |
| **Persona** | _(general)_ |

## Goal

Ship Tier 1 growth features: SEO/share cards, agent install kits, discovery hygiene (static-export safe).

## Done

- Added `/intro` + MCP agent prompt; build succeeds
- Production redeployed to `khoantds-projects/aicodingdictionary` (works)
- Fixed Royal Platform `aicodingdictionary`: Framework was **Other** → set to **Next.js**, Root Directory `app`
- Git production redeploy `dpl_EB6WEsRtNj8A31fekE1NXmGZiBjB` → https://aicodingdictionary-alpha.vercel.app/ returns **200**
- **Growth Tier 1 (2026-11-22):**
  - `sitemap.xml` + `robots.txt` + `metadataBase` / Open Graph / Twitter + `/og-default.svg`
  - Share cards: `/share/term/[slug]/`, `/share/tour/[id]/` (map share copies term card URL)
  - `/agents` install kits for Cursor, Claude Code, Windsurf + verify prompts
  - What’s new strip on `/intro` and `/terms`
  - Client search on `/terms`
  - Two new tours: `debugging-a-bad-session`, `tools-skills-and-mcp`
  - OpenAPI includes `/api/tours.json` + MCP download path
  - `npm run build` succeeds (309 static pages)
- **Dedup / linkage cleanup (2026-11-22):**
  - Shared `app/src/data/agentSetup.ts` (`MCP_TOOLS`, export links, keyboard hints)
  - `/intro` MCP section → short teaser + CTA to `/agents`
  - `TermDocBody` + `TermProse`; tour stops → `/terms/{slug}/`
  - Agents top nav includes `/terms/`; Tours dialog has share-card links
  - Build still green (309 pages)
- **Nav chrome for `/agents` (2026-11-22):**
  - `/intro` top bar: “Connect your agent” + map
  - Atlas toolbar: agents icon between intro and tours

## In progress

- _(none)_
- **Blockers:** none

## Next

1. Optional: commit growth + dedupe + agents nav chrome
2. Optional: set `NEXT_PUBLIC_SITE_URL` on Vercel to the preferred canonical host
3. Deferred: npm-packaged MCP, localStorage study kit, quizzes, accounts
4. Royal Platform: deploy from **repo root** (or Git API), not from `app/` while Root Directory is `app`

## Decisions

- Dictionary wording is original (not a verbatim copy of aicodingdictionary.com)
- Static export only — no server runtime / DB
- Intro is a dedicated `/intro` route; home stays the 3D map
- Intro reuses existing paper/ink + docs shell (not a new color system)
- Canonical site URL defaults to `https://aicodingdictionary-alpha.vercel.app` via `app/src/lib/site.ts` (override with `NEXT_PUBLIC_SITE_URL`)
- Share from the map uses `/share/term/...` for richer link previews

## Gotchas

- No root `package.json` — use `app/`
- Two Vercel projects: `khoantds-projects/aicodingdictionary` and `royal-platform/aicodingdictionary`
- Royal Platform 404 was Framework Preset = Other (empty output), not a missing route
- CodeGraph indexes agent skill trees; prefer `app/src` path/task filters for product structure
- Visual checks compare the **no-WebGL fallback**; 3D map needs a real browser with WebGL
- Share page CSS imports must use `@/app/...` aliases (relative paths break under `[slug]` / `[id]` folders)

## Pointers

| Item | Location |
|------|----------|
| Spec | `craft.json` (status/notes); study notes in `capture/` |
| Tasks | `tasks/todo.md` |
| Branch | _(local workspace)_ |
| Key files | `app/src/data/agentSetup.ts`, `app/src/components/TermDocBody.tsx`, `app/src/lib/site.ts`, `app/src/app/share/**`, `app/src/app/agents/page.tsx`, `app/src/data/tours.ts` |
| Royal prod | https://aicodingdictionary-alpha.vercel.app/ |
