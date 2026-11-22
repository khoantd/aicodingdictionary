import type { Metadata } from "next";
import { SITE } from "@/data/terms";
import { TOURS } from "@/data/tours";
import {
  agentEndpointRows,
  MCP_CLAUDE_CODE,
  MCP_DOWNLOAD,
  MCP_JSON,
  MCP_TOOLS,
} from "@/data/agentSetup";
import { absoluteUrl } from "@/lib/site";
import d from "../terms/docs.module.css";
import CodeBlock from "./CodeBlock";
import s from "./agents.module.css";

export const metadata: Metadata = {
  title: `Connect your agent — ${SITE.name}`,
  description:
    "Give any AI agent the AI Coding Dictionary: MCP install kits for Cursor, Claude Code, and Windsurf — plus Markdown and JSON files.",
  alternates: { canonical: "/agents/" },
  openGraph: {
    title: `Connect your agent — ${SITE.short}`,
    description: "MCP install kits, llms.txt, and in-page tools. No API key.",
    url: absoluteUrl("/agents/"),
    images: [{ url: "/og-default.svg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Connect your agent — ${SITE.short}`,
    description: "MCP install kits, llms.txt, and in-page tools. No API key.",
    images: ["/og-default.svg"],
  },
};

const VERIFY_PROMPTS = [
  "List the tools available from the ai-coding-dictionary MCP server.",
  'Look up "context window" with get_term and summarise it in one sentence.',
  `Walk me through the “${TOURS.find((t) => t.id === "debugging-a-bad-session")?.name ?? "Debugging a bad session"}” tour using get_tour.`,
];

const ENDPOINTS = agentEndpointRows();

export default function AgentsPage() {
  return (
    <main className={d.page} id="main-content">
      <div className={d.inner}>
        <div className={d.top}>
          <span className={d.kicker}>For AI agents</span>
          <div className={s.topLinks}>
            <a className={d.back} href="/intro/">
              Introduction
            </a>
            <a className={d.back} href="/terms/">
              All terms
            </a>
            <a className={d.back} href="/">
              Open the 3D map
            </a>
          </div>
        </div>
        <span className={d.rule} />
        <h1 className={d.title}>Connect your agent</h1>
        <p className={d.def}>
          Install kits for Cursor, Claude Code, and Windsurf — plus plain text and JSON for any model. Nothing needs a
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
            <span className={s.num}>02</span>Download the MCP server
          </h2>
          <p className={s.text}>
            A single file with the whole dictionary inside — no installs beyond Node. It gives any{" "}
            <a href="/terms/mcp/">MCP</a>-capable agent tools to search and read entries.
          </p>
          <CodeBlock label="Download" code={MCP_DOWNLOAD} />
          <CodeBlock
            label="One-liner (download + keep in project)"
            code={`curl -fsSL {ORIGIN}/mcp/dictionary-mcp.mjs -o ./dictionary-mcp.mjs && chmod +x ./dictionary-mcp.mjs`}
          />
        </section>

        <section className={s.step}>
          <h2 className={s.stepTitle}>
            <span className={s.num}>03</span>Install kits by client
          </h2>
          <p className={s.text}>
            Pick your tool. Use an absolute path to <code>dictionary-mcp.mjs</code> in every config.
          </p>

          <h3 className={s.kitTitle}>Cursor</h3>
          <p className={s.text}>
            Open Cursor Settings → MCP, or edit <code>.cursor/mcp.json</code> in the project (or the global MCP config).
          </p>
          <CodeBlock label=".cursor/mcp.json" code={MCP_JSON} />

          <h3 className={s.kitTitle}>Claude Code</h3>
          <CodeBlock label="CLI" code={MCP_CLAUDE_CODE} />

          <h3 className={s.kitTitle}>Windsurf</h3>
          <p className={s.text}>
            Add the same MCP server block to Windsurf&apos;s MCP / Cascade tools config (absolute path required).
          </p>
          <CodeBlock label="MCP config" code={MCP_JSON} />

          <h3 className={s.kitTitle}>Claude Desktop &amp; other clients</h3>
          <CodeBlock label="mcpServers JSON" code={MCP_JSON} />

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
            <span className={s.num}>04</span>Verify it works
          </h2>
          <p className={s.text}>After the server is connected, paste one of these into the agent chat:</p>
          <ul className={s.prompts}>
            {VERIFY_PROMPTS.map((p) => (
              <li key={p} className={s.prompt}>
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section className={s.step}>
          <h2 className={s.stepTitle}>
            <span className={s.num}>05</span>Let it use the page
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
            <span className={s.num}>06</span>Or just read the files
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
            <span className={s.num}>07</span>Things to ask it
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
