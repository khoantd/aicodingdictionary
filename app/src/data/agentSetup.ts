import { TERMS } from "@/data/terms";
import { TOURS } from "@/data/tours";

/** MCP tool names and one-line descriptions — shared by /intro and /agents. */
export const MCP_TOOLS: [string, string][] = [
  ["search_terms", "Find terms by name or by words in the definition."],
  ["get_term", "One full entry as Markdown."],
  ["related_terms", "The terms connected to a term."],
  ["list_sections", "Sections and their terms."],
  ["list_tours / get_tour", "The guided tours as ordered lessons."],
];

/** Generic MCP client JSON (absolute path required). */
export const MCP_JSON = `{
  "mcpServers": {
    "ai-coding-dictionary": {
      "command": "node",
      "args": ["/full/path/to/dictionary-mcp.mjs"]
    }
  }
}`;

export const MCP_DOWNLOAD = `curl -fsSL {ORIGIN}/mcp/dictionary-mcp.mjs -o dictionary-mcp.mjs`;

export const MCP_CLAUDE_CODE = `claude mcp add ai-coding-dictionary -- node "$PWD/dictionary-mcp.mjs"`;

/** Machine-readable / export links shown on About, /terms, and /agents. */
export const AGENT_EXPORT_LINKS: { href: string; label: string; blurb?: string }[] = [
  { href: "/intro/", label: "Introduction" },
  { href: "/agents/", label: "Connect your agent" },
  { href: "/llms.txt", label: "llms.txt", blurb: "Short index of every term and tour, written for language models." },
  { href: "/llms-full.txt", label: "Full Markdown", blurb: "Every entry in one Markdown document — paste it into any chat." },
  { href: "/api/terms.json", label: "JSON", blurb: `All ${TERMS.length} terms as JSON, with connections.` },
  { href: "/openapi.json", label: "OpenAPI", blurb: "OpenAPI description of the dictionary endpoints." },
  { href: "/mcp/dictionary-mcp.mjs", label: "MCP server" },
  { href: "/terms/", label: "All terms" },
];

/** Endpoint table rows for the agents page (paths that agents fetch). */
export function agentEndpointRows(): [string, string][] {
  return [
    ["/llms.txt", "Short index of every term and tour, written for language models."],
    ["/llms-full.txt", "Every entry in one Markdown document — paste it into any chat."],
    ["/api/terms.json", `All ${TERMS.length} terms as JSON, with connections.`],
    ["/api/terms/context-window.json", "One term as JSON (swap in any slug)."],
    ["/api/md/context-window.md", "One term as Markdown."],
    ["/api/sections.json", "The seven sections and what's in them."],
    ["/api/tours.json", `The ${TOURS.length} guided tours, stop by stop.`],
    ["/openapi.json", "OpenAPI description of all of the above."],
  ];
}

export const KEYBOARD_HINTS: { keys: string[]; action: string }[] = [
  { keys: ["⌘", "K"], action: "Search the dictionary" },
  { keys: ["←", "→"], action: "Previous / next term" },
  { keys: ["Esc"], action: "Close the panel or dialog" },
];
