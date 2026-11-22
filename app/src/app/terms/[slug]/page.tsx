import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TermDocBody from "@/components/TermDocBody";
import { sectionOf, SITE, TERM_BY_SLUG, TERMS } from "@/data/terms";
import { absoluteUrl } from "@/lib/site";
import s from "../docs.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return TERMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = TERM_BY_SLUG.get(slug);
  if (!t) return {};
  const title = `${t.name} — ${SITE.name}`;
  return {
    title,
    description: t.def,
    alternates: {
      canonical: `/terms/${t.slug}/`,
      types: {
        "text/markdown": `/api/md/${t.slug}.md`,
        "application/json": `/api/terms/${t.slug}.json`,
      },
    },
    openGraph: {
      title,
      description: t.def,
      type: "article",
      url: absoluteUrl(`/terms/${t.slug}/`),
      images: [{ url: "/og-default.svg", width: 1200, height: 630, alt: t.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t.def,
      images: ["/og-default.svg"],
    },
  };
}

export default async function TermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = TERM_BY_SLUG.get(slug);
  if (!t) notFound();
  const sec = sectionOf(t.section);
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
        <TermDocBody
          term={t}
          classes={{
            aliases: s.aliases,
            def: s.def,
            label: s.label,
            prose: s.prose,
            bubbles: s.bubbles,
            bubbleQ: s.q,
            bubbleA: s.a,
            tags: s.tags,
            tag: s.tag,
          }}
          renderTermLink={(term, text) => <a href={`/terms/${term.slug}/`}>{text}</a>}
          renderRelated={(o) => (
            <a className={s.tag} href={`/terms/${o.slug}/`}>
              {o.name}
            </a>
          )}
        />

        <div className={s.formats}>
          <a className={s.primary} href={`/api/md/${t.slug}.md`}>
            Markdown
          </a>
          <a className={s.back} href={`/api/terms/${t.slug}.json`}>
            JSON
          </a>
          <a className={s.back} href={`/share/term/${t.slug}/`}>
            Share card
          </a>
          <a className={s.back} href="/terms/">
            All terms
          </a>
        </div>
      </div>
    </main>
  );
}
