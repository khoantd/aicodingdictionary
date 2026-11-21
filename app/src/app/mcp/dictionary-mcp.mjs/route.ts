import { SECTIONS, SITE, TERMS } from "@/data/terms";
import { termToJson, termToMarkdown } from "@/lib/markdown";
import { TOURS, tourToMarkdown } from "@/data/tours";

export const dynamic = "force-static";

// A dependency-free MCP (Model Context Protocol) stdio server with the whole dictionary inside.
// Run it with:  node dictionary-mcp.mjs   — then add it to any MCP-capable agent.
export function GET() {
  const data = {
    name: SITE.name,
    sections: SECTIONS.map((s) => ({ id: s.id, name: s.name })),
    terms: TERMS.map((t) => ({ ...termToJson(t), markdown: termToMarkdown(t) })),
    tours: TOURS.map((t) => ({ id: t.id, name: t.name, blurb: t.blurb, steps: t.steps, markdown: tourToMarkdown(t) })),
  };
  const src = `#!/usr/bin/env node
// ${SITE.name} — MCP server (stdio). No dependencies. Usage: node dictionary-mcp.mjs
// Example config: { "mcpServers": { "ai-coding-dictionary": { "command": "node", "args": ["/path/to/dictionary-mcp.mjs"] } } }
import { createInterface } from "node:readline";

const DATA = ${JSON.stringify(data)};
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\\s+/g, " ").trim();
const find = (q) => {
  const k = norm(q);
  return DATA.terms.find((t) => norm(t.name) === k || t.slug === String(q).toLowerCase() || t.aliases.some((a) => norm(a) === k));
};
const search = (q) => {
  const k = norm(q);
  if (!k) return [];
  return DATA.terms
    .map((t) => {
      const n = norm(t.name);
      const s = n === k ? 100 : n.startsWith(k) ? 80 : n.includes(k) ? 40 : norm(t.definition).includes(k) ? 10 : 0;
      return { t, s };
    })
    .filter((x) => x.s)
    .sort((a, b) => b.s - a.s)
    .map((x) => ({ slug: x.t.slug, name: x.t.name, section: x.t.section, definition: x.t.definition }));
};
const text = (v) => ({ content: [{ type: "text", text: typeof v === "string" ? v : JSON.stringify(v, null, 2) }] });
const termArg = { type: "object", properties: { term: { type: "string", description: "Term name or slug" } }, required: ["term"] };

const TOOLS = [
  { name: "search_terms", description: "Search the AI Coding Dictionary by name or definition words.", inputSchema: { type: "object", properties: { query: { type: "string" } }, required: ["query"] }, run: (a) => text(search(a.query)) },
  { name: "get_term", description: "Get one dictionary entry as Markdown.", inputSchema: termArg, run: (a) => { const t = find(a.term); return t ? text(t.markdown) : text("Not found: " + a.term); } },
  { name: "related_terms", description: "List the terms connected to a term.", inputSchema: termArg, run: (a) => { const t = find(a.term); return t ? text(t.connects_to) : text("Not found: " + a.term); } },
  { name: "list_tours", description: "List the guided tours (ordered lessons through related terms).", inputSchema: { type: "object", properties: {} }, run: () => text(DATA.tours.map((t) => ({ id: t.id, name: t.name, blurb: t.blurb, stops: t.steps.map((s) => s.slug) }))) },
  { name: "get_tour", description: "Get one guided tour as Markdown.", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] }, run: (a) => { const t = DATA.tours.find((x) => x.id === a.id); return t ? text(t.markdown) : text("No tour: " + a.id); } },
  { name: "list_sections", description: "List the sections and the terms in each.", inputSchema: { type: "object", properties: {} }, run: () => text(DATA.sections.map((s) => ({ section: s.name, terms: DATA.terms.filter((t) => t.section_id === s.id).map((t) => t.slug) }))) },
];

const send = (msg) => process.stdout.write(JSON.stringify(msg) + "\\n");
const rl = createInterface({ input: process.stdin });
rl.on("line", (line) => {
  let req;
  try { req = JSON.parse(line); } catch { return; }
  const { id, method, params } = req;
  const ok = (result) => id !== undefined && send({ jsonrpc: "2.0", id, result });
  const fail = (code, message) => id !== undefined && send({ jsonrpc: "2.0", id, error: { code, message } });
  switch (method) {
    case "initialize":
      return ok({ protocolVersion: params?.protocolVersion ?? "2025-06-18", capabilities: { tools: {}, resources: {} }, serverInfo: { name: "ai-coding-dictionary", version: "1.0.0" } });
    case "ping":
      return ok({});
    case "tools/list":
      return ok({ tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })) });
    case "tools/call": {
      const tool = TOOLS.find((t) => t.name === params?.name);
      if (!tool) return fail(-32602, "Unknown tool " + params?.name);
      return ok(tool.run(params.arguments ?? {}));
    }
    case "resources/list":
      return ok({ resources: DATA.terms.map((t) => ({ uri: "dictionary://term/" + t.slug, name: t.name, mimeType: "text/markdown", description: t.definition })) });
    case "resources/read": {
      const slug = String(params?.uri ?? "").replace("dictionary://term/", "");
      const t = DATA.terms.find((x) => x.slug === slug);
      if (!t) return fail(-32602, "Unknown resource");
      return ok({ contents: [{ uri: params.uri, mimeType: "text/markdown", text: t.markdown }] });
    }
    default:
      if (method?.startsWith("notifications/")) return;
      return fail(-32601, "Method not found: " + method);
  }
});
`;
  return new Response(src, { headers: { "content-type": "text/javascript; charset=utf-8" } });
}
