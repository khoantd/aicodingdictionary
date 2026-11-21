# Agent session

> Cross-tool handoff state for Cursor, Claude Code, and Kiro. Update at session end (`/handoff`) or phase changes; read at session start (`/resume`).

## Meta

| Field | Value |
|-------|-------|
| **Updated** | 2026-11-21 |
| **Phase** | build |
| **Tool** | cursor |
| **Persona** | _(general)_ |

## Goal

Fix Royal Platform `404 NOT_FOUND` on `aicodingdictionary-alpha.vercel.app`.

## Done

- Added `/intro` + MCP agent prompt; build succeeds
- Production redeployed to `khoantds-projects/aicodingdictionary` (works)
- Fixed Royal Platform `aicodingdictionary`: Framework was **Other** → set to **Next.js**, Root Directory `app`
- Git production redeploy `dpl_EB6WEsRtNj8A31fekE1NXmGZiBjB` → https://aicodingdictionary-alpha.vercel.app/ returns **200**

## In progress

- _(none)_
- **Blockers:** none

## Next

1. Optional: commit uncommitted intro/MCP + ignore fixes
2. Royal Platform: deploy from **repo root** (or Git API), not from `app/` while Root Directory is `app` (avoids `app/app`)
3. Personal scope: `cd app && vercel --prod --yes --scope khoantds-projects`

## Decisions

- Dictionary wording is original (not a verbatim copy of aicodingdictionary.com)
- Static export only — no server runtime / DB
- Intro is a dedicated `/intro` route; home stays the 3D map
- Intro reuses existing paper/ink + docs shell (not a new color system)

## Gotchas

- No root `package.json` — use `app/`
- Two Vercel projects: `khoantds-projects/aicodingdictionary` and `royal-platform/aicodingdictionary`
- Royal Platform 404 was Framework Preset = Other (empty output), not a missing route
- CodeGraph indexes agent skill trees; prefer `app/src` path/task filters for product structure
- Visual checks compare the **no-WebGL fallback**; 3D map needs a real browser with WebGL

## Pointers

| Item | Location |
|------|----------|
| Spec | `craft.json` (status/notes); study notes in `capture/` |
| Tasks | `tasks/todo.md` |
| Branch | _(local workspace)_ |
| Key files | `app/src/app/intro/page.tsx`, `app/src/app/intro/intro.module.css`, `app/src/data/terms.ts`, `app/src/components/Atlas.tsx` |
| Royal prod | https://aicodingdictionary-alpha.vercel.app/ |
