# Agent session

> Cross-tool handoff state for Cursor, Claude Code, and Kiro. Update at session end (`/handoff`) or phase changes; read at session start (`/resume`).

## Meta

| Field | Value |
|-------|-------|
| **Updated** | 2026-11-21 |
| **Phase** | review |
| **Tool** | cursor |
| **Persona** | _(onboarding)_ |

## Goal

Understand and map the AI Coding Dictionary clone (Next.js + three.js 3D term map, agent-readable surfaces) so future work has a shared structure map.

## Done

- First-run `/understand` complete
- Wrote `.agent/PROJECT.md` and `.agent/onboarding.complete`

## In progress

- _(none)_
- **Blockers:** none

## Next

1. Await user direction (deploy, polish tours/UI, content edits, etc.)
2. Product lives under `app/`; build with `cd app && npm run build`

## Decisions

- Dictionary wording is original (not a verbatim copy of aicodingdictionary.com)
- Static export only — no server runtime / DB

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
| Key files | `app/src/data/terms.ts`, `app/src/components/Atlas.tsx`, `app/src/components/graph/GraphScene.ts` |
