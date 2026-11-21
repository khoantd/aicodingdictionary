import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { neighbours, parseLinks, sectionOf, SITE, TERM_BY_SLUG, TERMS } from "@/data/terms";
import s from "../docs.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return TERMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = TERM_BY_SLUG.get(slug);
  if (!t) return {};
  return {
    title: `${t.name} — ${SITE.name}`,
    description: t.def,
    alternates: {
      types: {
        "text/markdown": `/api/md/${t.slug}.md`,
        "application/json": `/api/terms/${t.slug}.json`,
      },
    },
  };
}

export default async function TermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = TERM_BY_SLUG.get(slug);
  if (!t) notFound();
  const sec = sectionOf(t.section);
  const links = neighbours(t);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: t.name,
    description: t.def,
    inDefinedTermSet: { "@type": "DefinedTermSet", name: SITE.name },
  };
  return (
    <main className={s.page} id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={s.inner}>
        <div className={s.top}>
          <span className={s.kicker}>
            {sec.name} · {t.index} / {TERMS.length}
          </span>
          <a className={s.back} href={`/?term=${t.slug}`}>
            See it on the map
          </a>
        </div>
        <span className={s.rule} />
        <h1 className={s.title}>{t.name}</h1>
        {t.aliases?.length ? <p className={s.kicker} style={{ marginTop: "0.9rem" }}>Also: {t.aliases.join(", ")}</p> : null}
        <p className={s.def}>{t.def}</p>

        <h2 className={s.label}>Full definition</h2>
        <div className={s.prose}>
          {t.full.map((p, i) => (
            <p key={i}>
              {parseLinks(p).map((seg, j) =>
                seg.term ? (
                  <a key={j} href={`/terms/${seg.term.slug}/`}>
                    {seg.text}
                  </a>
                ) : (
                  <span key={j}>{seg.text}</span>
                ),
              )}
            </p>
          ))}
        </div>

        {t.usage ? (
          <>
            <h2 className={s.label}>Heard in the wild</h2>
            <ul className={s.bubbles}>
              <li className={s.q}>{t.usage[0]}</li>
              <li className={s.a}>{t.usage[1]}</li>
            </ul>
          </>
        ) : null}

        <h2 className={s.label}>Connects to</h2>
        <ul className={s.tags}>
          {links.map((o) => (
            <li key={o.slug}>
              <a className={s.tag} href={`/terms/${o.slug}/`}>
                {o.name}
              </a>
            </li>
          ))}
        </ul>

        <div className={s.formats}>
          <a className={s.primary} href={`/api/md/${t.slug}.md`}>
            Markdown
          </a>
          <a className={s.back} href={`/api/terms/${t.slug}.json`}>
            JSON
          </a>
          <a className={s.back} href="/terms/">
            All terms
          </a>
        </div>
      </div>
    </main>
  );
}
