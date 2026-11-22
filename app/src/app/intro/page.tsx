import type { Metadata } from "next";
import { SECTIONS, SITE, TERMS } from "@/data/terms";
import { TOURS } from "@/data/tours";
import { ExtIcon } from "@/components/Fallback";
import WhatsNew from "@/components/WhatsNew";
import { absoluteUrl } from "@/lib/site";
import CodeBlock from "../agents/CodeBlock";
import d from "../terms/docs.module.css";
import s from "./intro.module.css";

export const metadata: Metadata = {
  title: `Introduction — ${SITE.name}`,
  description: SITE.tagline,
  alternates: { canonical: "/intro/" },
  openGraph: {
    title: `Introduction — ${SITE.short}`,
    description: SITE.tagline,
    url: absoluteUrl("/intro/"),
    images: [{ url: "/og-default.svg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Introduction — ${SITE.short}`,
    description: SITE.tagline,
    images: ["/og-default.svg"],
  },
};

const HOW_TO: [string, string, string][] = [
  [
    "01",
    "Turn the map",
    "Drag to rotate, scroll or pinch to zoom. Each term is a point; lines show how ideas connect.",
  ],
  [
    "02",
    "Open a term",
    "Click or tap any label to read a plain-English definition, a longer note, and related entries.",
  ],
  [
    "03",
    "Search or take a tour",
    "Press ⌘K to search, or open Guided tours for short paths through the map.",
  ],
];

const MCP_TOOLS: [string, string][] = [
  ["search_terms", "Find terms by name or by words in the definition."],
  ["get_term", "One full entry as Markdown."],
  ["related_terms", "The terms connected to a term."],
  ["list_sections", "Sections and their terms."],
  ["list_tours / get_tour", "The guided tours as ordered lessons."],
];

/** Prompt users paste into their agent so it learns and configures the MCP server. */
const AGENT_MCP_PROMPT = `Please set up the AI Coding Dictionary MCP so you can look up AI coding terms (tokens, context windows, agents, handoffs, etc.) with shared definitions.

## What to do

1. Download the single-file MCP server (Node only, no npm install):
   curl -O {ORIGIN}/mcp/dictionary-mcp.mjs

2. Register it with my MCP client.

   Claude Code:
   claude mcp add ai-coding-dictionary -- node "$PWD/dictionary-mcp.mjs"

   Cursor, Claude Desktop, or other MCP clients — add to MCP config (use the absolute path to the file):
   {
     "mcpServers": {
       "ai-coding-dictionary": {
         "command": "node",
         "args": ["/absolute/path/to/dictionary-mcp.mjs"]
       }
     }
   }

3. After it is connected, use these tools whenever we talk about AI coding vocabulary:
   - search_terms — find terms by name or definition text
   - get_term — one full entry as Markdown
   - related_terms — terms connected to a given term
   - list_sections — the seven sections and their terms
   - list_tours / get_tour — guided tours, stop by stop

4. Optional fallbacks (no MCP required):
   - Short index: {ORIGIN}/llms.txt
   - Full Markdown: {ORIGIN}/llms-full.txt
   - One term: {ORIGIN}/api/md/<slug>.md
   - Setup docs: {ORIGIN}/agents/

## Done when

Confirm the MCP server is configured, list the tools you can see from ai-coding-dictionary, then look up "context window" with get_term to prove it works.`;

export default function IntroPage() {
  return (
    <main className={d.page} id="main-content">
      <div className={d.inner}>
        <div className={d.top}>
          <span className={d.kicker}>Introduction</span>
          <a className={d.back} href="/">
            Open the 3D map
          </a>
        </div>
        <span className={d.rule} />

        <header className={s.hero}>
          <p className={s.brand}>An open glossary</p>
          <h1 className={s.title}>{SITE.short}</h1>
          <p className={s.lede}>{SITE.tagline}</p>
          <div className={s.ctas}>
            <a className={s.primary} href="/">
              Explore the map
              <ExtIcon className={s.ext} />
            </a>
            <a className={s.secondary} href="/terms/">
              Browse all terms
            </a>
          </div>
        </header>

        <WhatsNew />

        <section className={s.section} aria-labelledby="how-heading">
          <h2 className={s.sectionTitle} id="how-heading">
            How to explore
          </h2>
          <p className={s.sectionText}>
            The home page is a force-laid 3D graph of every entry. You do not need an account — open a term, follow a
            connection, or start a guided tour.
          </p>
          <ol className={s.steps}>
            {HOW_TO.map(([num, title, body]) => (
              <li key={num} className={s.step}>
                <span className={s.stepNum}>{num}</span>
                <div className={s.stepBody}>
                  <strong>{title}</strong>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={s.section} aria-labelledby="sections-heading">
          <h2 className={s.sectionTitle} id="sections-heading">
            {SECTIONS.length} sections · {TERMS.length} terms
          </h2>
          <p className={s.sectionText}>
            Entries are grouped so neighbouring ideas stay close on the map. Colour marks the section when you turn that
            mode on.
          </p>
          <ul className={s.sections}>
            {SECTIONS.map((sec) => {
              const n = TERMS.filter((t) => t.section === sec.id).length;
              return (
                <li key={sec.id} className={s.sectionRow}>
                  <span className={s.dot} style={{ background: sec.color }} aria-hidden="true" />
                  <span className={s.sectionName}>{sec.name}</span>
                  <span className={s.count}>{n}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={s.section} aria-labelledby="tours-heading">
          <h2 className={s.sectionTitle} id="tours-heading">
            Guided tours
          </h2>
          <p className={s.sectionText}>
            Short ordered walks through related terms. Start one from the map, or open any stop as a plain page.
          </p>
          <ul className={s.tours}>
            {TOURS.map((tour) => (
              <li key={tour.id} className={s.tour}>
                <div className={s.tourName}>
                  <a href={`/share/tour/${tour.id}/`}>{tour.name}</a>
                </div>
                <p className={s.tourMeta}>
                  {tour.steps.length} stops ·{" "}
                  <a href={`/?tour=${tour.id}`}>Start on the map</a>
                </p>
                <p className={s.tourBlurb}>{tour.blurb}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.section} aria-labelledby="keys-heading">
          <h2 className={s.sectionTitle} id="keys-heading">
            Keyboard
          </h2>
          <dl className={s.keys}>
            <div>
              <dt>
                <span className={s.kbd}>⌘</span>
                <span className={s.kbd}>K</span>
              </dt>
              <dd>Search the dictionary</dd>
            </div>
            <div>
              <dt>
                <span className={s.kbd}>←</span>
                <span className={s.kbd}>→</span>
              </dt>
              <dd>Previous / next term</dd>
            </div>
            <div>
              <dt>
                <span className={s.kbd}>Esc</span>
              </dt>
              <dd>Close the panel or dialog</dd>
            </div>
          </dl>
        </section>

        <section className={s.section} aria-labelledby="mcp-heading">
          <h2 className={s.sectionTitle} id="mcp-heading">
            MCP setup for your agent
          </h2>
          <p className={s.sectionText}>
            Give any MCP-capable agent this dictionary as tools — one Node file, no API key. Copy the prompt below into
            your agent chat and ask it to integrate; or follow the short steps yourself.
          </p>

          <div className={s.askBox}>
            <p className={s.askLabel}>Paste this to your agent</p>
            <p className={s.askHint}>
              It tells the agent what to download, how to register the MCP server, which tools to use, and how to verify
              the setup.
            </p>
            <CodeBlock label="Agent prompt" code={AGENT_MCP_PROMPT} />
          </div>

          <p className={s.subLabel}>Or set it up yourself</p>
          <ol className={s.steps}>
            <li className={s.step}>
              <span className={s.stepNum}>01</span>
              <div className={s.stepBody}>
                <strong>Download the MCP server</strong>
                <p>A single file with the whole dictionary inside — no installs beyond Node.</p>
              </div>
            </li>
            <li className={s.step}>
              <span className={s.stepNum}>02</span>
              <div className={s.stepBody}>
                <strong>Register it with your client</strong>
                <p>Claude Code, Cursor, Claude Desktop, or any MCP client that runs a local command.</p>
              </div>
            </li>
            <li className={s.step}>
              <span className={s.stepNum}>03</span>
              <div className={s.stepBody}>
                <strong>Use the tools</strong>
                <p>Once connected, your agent can search and read entries without leaving the chat.</p>
              </div>
            </li>
          </ol>

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

          <ul className={s.toolList}>
            {MCP_TOOLS.map(([name, desc]) => (
              <li key={name} className={s.toolRow}>
                <code className={s.toolName}>{name}</code>
                <span className={s.toolDesc}>{desc}</span>
              </li>
            ))}
          </ul>

          <div className={s.ctas}>
            <a className={s.primary} href="/agents/">
              Full agent setup
              <ExtIcon className={s.ext} />
            </a>
            <a className={s.secondary} href="/llms.txt">
              llms.txt
            </a>
            <a className={s.secondary} href="/mcp/dictionary-mcp.mjs">
              Download MCP file
            </a>
          </div>
        </section>

        <section className={s.closing} aria-labelledby="closing-heading">
          <h2 className={s.closingTitle} id="closing-heading">
            Ready when you are
          </h2>
          <p className={s.closingText}>
            Open the map to wander, or start from the full list if you prefer reading page by page.
          </p>
          <div className={s.ctas}>
            <a className={s.primary} href="/">
              Open the 3D map
              <ExtIcon className={s.ext} />
            </a>
            <a className={s.secondary} href="/terms/">
              All terms
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
