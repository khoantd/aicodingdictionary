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

MCP setup intro on `/intro` with a copyable agent prompt for integration.

## Done

- First-run `/understand` complete; `.agent/PROJECT.md` exists
- Added `/intro` introduction page (how to explore, sections, tours, keys, agents)
- Linked from About modal, WebGL Fallback, `/terms`, and `/agents`
- Expanded `/intro` with MCP setup: copyable agent prompt, download/register snippets, tool list
- `cd app && npm run build` succeeds

## In progress

- _(none)_
- **Blockers:** none

## Next

1. Optional: visual check of `/intro` MCP section in browser
2. Product lives under `app/`; build with `cd app && npm run build`

## Decisions

- Dictionary wording is original (not a verbatim copy of aicodingdictionary.com)
- Static export only — no server runtime / DB
- Intro is a dedicated `/intro` route; home stays the 3D map
- Intro reuses existing paper/ink + docs shell (not a new color system)

## Gotchas

- No root `package.json` — use `app/`
- CodeGraph indexes agent skill trees; prefer `app/src` path/task filters for product structure
- Visual checks compare the **no-WebGL fallback**; 3D map needs a real browser with WebGL

## Pointers

| Item | Location |
|------|----------|
| Spec | `craft.json` (status/notes); study notes in `capture/` |
| Tasks | `tasks/todo.md` |
| Branch | _(local workspace)_ |
| Key files | `app/src/app/intro/page.tsx`, `app/src/app/intro/intro.module.css`, `app/src/data/terms.ts`, `app/src/components/Atlas.tsx` |
