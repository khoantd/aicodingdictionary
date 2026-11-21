import type { Metadata } from "next";
import { SITE, TERMS } from "@/data/terms";
import { TOURS } from "@/data/tours";
import d from "../terms/docs.module.css";
import CodeBlock from "./CodeBlock";
import s from "./agents.module.css";

export const metadata: Metadata = {
  title: `Connect your agent — ${SITE.name}`,
  description: "Give any AI agent the AI Coding Dictionary: an MCP server, Markdown and JSON files, and in-page tools.",
};

const ENDPOINTS: [string, string][] = [
  ["/llms.txt", "Short index of every term and tour, written for language models."],
  ["/llms-full.txt", "Every entry in one Markdown document — paste it into any chat."],
  ["/api/terms.json", `All ${TERMS.length} terms as JSON, with connections.`],
  ["/api/terms/context-window.json", "One term as JSON (swap in any slug)."],
  ["/api/md/context-window.md", "One term as Markdown."],
  ["/api/sections.json", "The seven sections and what's in them."],
  ["/api/tours.json", `The ${TOURS.length} guided tours, stop by stop.`],
  ["/openapi.json", "OpenAPI description of all of the above."],
];

const MCP_TOOLS: [string, string][] = [
  ["search_terms", "Find terms by name or by words in the definition."],
  ["get_term", "One full entry as Markdown."],
  ["related_terms", "The terms connected to a term."],
  ["list_sections", "Sections and their terms."],
  ["list_tours / get_tour", "The guided tours as ordered lessons."],
];

export default function AgentsPage() {
  return (
    <main className={d.page} id="main-content">
      <div className={d.inner}>
        <div className={d.top}>
          <span className={d.kicker}>For AI agents</span>
          <a className={d.back} href="/">
            Open the 3D map
          </a>
        </div>
        <span className={d.rule} />
        <h1 className={d.title}>Connect your agent</h1>
        <p className={d.def}>
          Three ways to give an AI agent this dictionary — from a one-line pointer to a full tool server. Nothing needs a
          key or an account.
        </p>

        <section className={s.step}>
          <h2 className={s.stepTitle}>
            <span className={s.num}>01</span>Point it at the text
          </h2>
          <p className={s.text}>
            The quickest option. Add this to your project&apos;s <a href="/terms/agents-md/">AGENTS.md</a> (or any
            instructions file) and the agent will look terms up when it needs them.
          </p>
          <CodeBlock
            label="AGENTS.md"
            code={`## Vocabulary
When we talk about AI coding concepts (context window, compaction,
subagent, handoff…), use the definitions in {ORIGIN}/llms.txt.
Fetch one entry as Markdown from {ORIGIN}/api/md/<slug>.md`}
          />
        </section>

        <section className={s.step}>
          <h2 className={s.stepTitle}>
            <span className={s.num}>02</span>Run the MCP server
          </h2>
          <p className={s.text}>
            A single file with the whole dictionary inside — no installs beyond Node. It gives any{" "}
            <a href="/terms/mcp/">MCP</a>-capable agent proper tools to search and read entries.
          </p>
          <CodeBlock label="Download" code={`curl -O {ORIGIN}/mcp/dictionary-mcp.mjs`} />
          <CodeBlock label="Claude Code" code={`claude mcp add ai-coding-dictionary -- node "$PWD/dictionary-mcp.mjs"`} />
          <CodeBlock
            label="Cursor, Claude Desktop & other MCP clients"
            code={`{
  "mcpServers": {
    "ai-coding-dictionary": {
      "command": "node",
      "args": ["/full/path/to/dictionary-mcp.mjs"]
    }
  }
}`}
          />
          <table className={s.table}>
            <tbody>
              {MCP_TOOLS.map(([n, w]) => (
                <tr key={n}>
                  <td>{n}</td>
                  <td>{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={s.step}>
          <h2 className={s.stepTitle}>
            <span className={s.num}>03</span>Let it use the page
          </h2>
          <p className={s.text}>
            Agents that drive a browser get tools right on the map. Where the browser supports WebMCP, the page offers
            them through <code>navigator.modelContext</code>; otherwise they can call{" "}
            <code>window.aiCodingDictionary</code>. Besides search and look-up, an agent can open a term or start a
            guided tour for you to follow.
          </p>
          <CodeBlock
            label="In the page"
            code={`aiCodingDictionary.search("cache")
aiCodingDictionary.markdown("compaction")
aiCodingDictionary.open("subagent")
aiCodingDictionary.startTour("${TOURS[0].id}")`}
          />
        </section>

        <section className={s.step}>
          <h2 className={s.stepTitle}>
            <span className={s.num}>04</span>Or just read the files
          </h2>
          <table className={s.table}>
            <tbody>
              {ENDPOINTS.map(([path, what]) => (
                <tr key={path}>
                  <td>
                    <a href={path}>{path}</a>
                  </td>
                  <td>{what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={s.step}>
          <h2 className={s.stepTitle}>
            <span className={s.num}>05</span>Things to ask it
          </h2>
          <ul className={s.prompts}>
            <li className={s.prompt}>Explain the difference between compaction and clearing, using the dictionary.</li>
            <li className={s.prompt}>Walk me through the “{TOURS[1].name}” tour.</li>
            <li className={s.prompt}>Which dictionary terms describe what went wrong in this session?</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
