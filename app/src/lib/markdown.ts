import { parseLinks, sectionOf, SECTIONS, SITE, TERMS, neighbours, type Term } from "@/data/terms";
import { TOURS } from "@/data/tours";

export function linkedMarkdown(text: string, base = ""): string {
  return parseLinks(text)
    .map((s) => (s.term ? `[${s.text}](${base}/terms/${s.term.slug}/)` : s.text))
    .join("");
}

export function termToMarkdown(t: Term, base = ""): string {
  const lines: string[] = [];
  lines.push(`# ${t.name}`, "");
  lines.push(`_Section: ${sectionOf(t.section).name} · Entry ${t.index} of ${TERMS.length}_`, "");
  if (t.aliases?.length) lines.push(`Also called: ${t.aliases.join(", ")}`, "");
  lines.push(`**${t.def}**`, "");
  for (const p of t.full) lines.push(linkedMarkdown(p, base), "");
  if (t.usage) {
    lines.push("## Heard in the wild", "");
    lines.push(`> **Q:** ${t.usage[0]}`, ">", `> **A:** ${t.usage[1]}`, "");
  }
  const n = neighbours(t);
  if (n.length) {
    lines.push("## Connects to", "");
    for (const o of n) lines.push(`- [${o.name}](${base}/terms/${o.slug}/)`);
    lines.push("");
  }
  return lines.join("\n");
}

export function termToJson(t: Term) {
  return {
    slug: t.slug,
    name: t.name,
    index: t.index,
    section: sectionOf(t.section).name,
    section_id: t.section,
    aliases: t.aliases ?? [],
    definition: t.def,
    full_definition: t.full.map((p) =>
      parseLinks(p)
        .map((s) => s.text)
        .join(""),
    ),
    heard_in_the_wild: t.usage ? { question: t.usage[0], answer: t.usage[1] } : null,
    connects_to: neighbours(t).map((o) => o.slug),
    urls: {
      page: `/terms/${t.slug}/`,
      markdown: `/api/md/${t.slug}.md`,
      json: `/api/terms/${t.slug}.json`,
      graph: `/?term=${t.slug}`,
    },
  };
}

export function llmsTxt(): string {
  const out: string[] = [];
  out.push(`# ${SITE.name}`, "");
  out.push(`> ${SITE.tagline}`, "");
  out.push(
    "This site is built to be read by AI agents as well as people. Everything is static and needs no key:",
    "",
    "- [Every term as one Markdown file](/llms-full.txt)",
    "- [Every term as JSON](/api/terms.json) — one entry per term with slug, definition, full definition and connections",
    "- [Sections as JSON](/api/sections.json)",
    "- [OpenAPI description of these files](/openapi.json)",
    "- [MCP server you can run locally](/mcp/dictionary-mcp.mjs) — `node dictionary-mcp.mjs` gives agents search_terms, get_term, list_sections and related_terms tools",
    "- [Guided tours as JSON](/api/tours.json) — short ordered lessons through related terms",
    "- [How to connect your agent](/agents/) — copy-paste setup for Claude Code, Cursor and other MCP clients",
    "- In a browser that supports WebMCP, the home page registers the same tools through `navigator.modelContext`.",
    "",
    "## Guided tours",
    "",
    ...TOURS.map((t) => `- [${t.name}](/?tour=${t.id}&term=${t.steps[0].slug}): ${t.blurb} Stops: ${t.steps.map((s) => s.slug).join(" → ")}`),
    "",
  );
  for (const s of SECTIONS) {
    out.push(`## ${s.name}`, "");
    for (const t of TERMS.filter((x) => x.section === s.id)) {
      out.push(`- [${t.name}](/api/md/${t.slug}.md): ${t.def}`);
    }
    out.push("");
  }
  return out.join("\n");
}

export function llmsFullTxt(): string {
  const out: string[] = [`# ${SITE.name}`, "", `> ${SITE.tagline}`, ""];
  for (const s of SECTIONS) {
    out.push(`---`, "", `# Section: ${s.name}`, "");
    for (const t of TERMS.filter((x) => x.section === s.id)) {
      out.push(termToMarkdown(t).replace(/^# /, "## "));
    }
  }
  return out.join("\n");
}
