import type { Metadata } from "next";
import { SECTIONS, SITE, TERMS } from "@/data/terms";
import { TOURS } from "@/data/tours";
import { KEYBOARD_HINTS } from "@/data/agentSetup";
import { ExtIcon } from "@/components/Fallback";
import WhatsNew from "@/components/WhatsNew";
import { absoluteUrl } from "@/lib/site";
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
            {KEYBOARD_HINTS.map((hint) => (
              <div key={hint.action}>
                <dt>
                  {hint.keys.map((k) => (
                    <span key={k} className={s.kbd}>
                      {k}
                    </span>
                  ))}
                </dt>
                <dd>{hint.action}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={s.section} aria-labelledby="mcp-heading">
          <h2 className={s.sectionTitle} id="mcp-heading">
            For your AI agent
          </h2>
          <p className={s.sectionText}>
            Give any MCP-capable agent this dictionary as tools — one Node file, no API key. Install kits for Cursor,
            Claude Code, and Windsurf live on the agents page.
          </p>
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
