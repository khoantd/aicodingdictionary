import type { Metadata } from "next";
import { SECTIONS, SITE, TERMS } from "@/data/terms";
import s from "./docs.module.css";

export const metadata: Metadata = {
  title: `All terms — ${SITE.name}`,
  description: SITE.tagline,
};

export default function TermsIndex() {
  return (
    <main className={s.page} id="main-content">
      <div className={s.inner}>
        <div className={s.top}>
          <span className={s.kicker}>{TERMS.length} terms · {SECTIONS.length} sections</span>
          <a className={s.back} href="/">
            Open the 3D map
          </a>
        </div>
        <span className={s.rule} />
        <h1 className={s.title}>{SITE.name}</h1>
        <p className={s.def}>{SITE.tagline}</p>
        <div className={s.formats}>
          <a className={s.primary} href="/intro/">
            Introduction
          </a>
          <a className={s.back} href="/agents/">
            Connect your agent
          </a>
          <a className={s.back} href="/llms.txt">
            llms.txt
          </a>
          <a className={s.back} href="/llms-full.txt">
            Full Markdown
          </a>
          <a className={s.back} href="/api/terms.json">
            JSON
          </a>
          <a className={s.back} href="/mcp/dictionary-mcp.mjs">
            MCP server
          </a>
        </div>
        {SECTIONS.map((sec) => (
          <section key={sec.id}>
            <h2 className={s.label}>{sec.name}</h2>
            <ul className={s.list}>
              {TERMS.filter((t) => t.section === sec.id).map((t) => (
                <li key={t.slug}>
                  <a href={`/terms/${t.slug}/`}>{t.name}</a>
                  <span>{t.def}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
