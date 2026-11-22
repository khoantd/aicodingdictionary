import type { Metadata } from "next";
import WhatsNew from "@/components/WhatsNew";
import TermsSearch from "@/components/TermsSearch";
import { AGENT_EXPORT_LINKS } from "@/data/agentSetup";
import { SECTIONS, SITE, TERMS } from "@/data/terms";
import { absoluteUrl } from "@/lib/site";
import s from "./docs.module.css";

export const metadata: Metadata = {
  title: `All terms — ${SITE.name}`,
  description: `Browse all ${TERMS.length} terms across ${SECTIONS.length} sections. Search by name or definition.`,
  alternates: { canonical: "/terms/" },
  openGraph: {
    title: `All terms — ${SITE.short}`,
    description: SITE.tagline,
    url: absoluteUrl("/terms/"),
    images: [{ url: "/og-default.svg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `All terms — ${SITE.short}`,
    description: SITE.tagline,
    images: ["/og-default.svg"],
  },
};

/** Export / nav links for the index — skip “All terms” (this page). */
const INDEX_LINKS = AGENT_EXPORT_LINKS.filter((l) => l.href !== "/terms/");

export default function TermsIndex() {
  return (
    <main className={s.page} id="main-content">
      <div className={s.inner}>
        <div className={s.top}>
          <span className={s.kicker}>
            {TERMS.length} terms · {SECTIONS.length} sections
          </span>
          <a className={s.back} href="/">
            Open the 3D map
          </a>
        </div>
        <span className={s.rule} />
        <h1 className={s.title}>{SITE.name}</h1>
        <p className={s.def}>{SITE.tagline}</p>
        <div className={s.formats}>
          {INDEX_LINKS.map((link, i) => (
            <a key={link.href} className={i === 0 ? s.primary : s.back} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <WhatsNew />
        <TermsSearch />
      </div>
    </main>
  );
}
