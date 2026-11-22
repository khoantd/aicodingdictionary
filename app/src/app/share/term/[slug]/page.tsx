import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sectionOf, SITE, TERM_BY_SLUG, TERMS } from "@/data/terms";
import { absoluteUrl } from "@/lib/site";
import d from "@/app/terms/docs.module.css";
import s from "@/app/share/share.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return TERMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = TERM_BY_SLUG.get(slug);
  if (!t) return {};
  const title = `${t.name} — ${SITE.short}`;
  const description = t.def;
  const url = absoluteUrl(`/share/term/${t.slug}/`);
  return {
    title: t.name,
    description,
    alternates: { canonical: `/terms/${t.slug}/` },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: [{ url: "/og-default.svg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-default.svg"],
    },
  };
}

export default async function TermShareCard({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = TERM_BY_SLUG.get(slug);
  if (!t) notFound();
  const sec = sectionOf(t.section);
  return (
    <main className={d.page} id="main-content">
      <div className={d.inner}>
        <div className={d.top}>
          <span className={d.kicker}>Share card</span>
          <a className={d.back} href="/terms/">
            All terms
          </a>
        </div>
        <span className={d.rule} />
        <article className={s.card}>
          <p className={s.eyebrow}>
            {SITE.short} · {sec.name}
          </p>
          <h1 className={s.name}>{t.name}</h1>
          <p className={s.blurb}>{t.def}</p>
          {t.aliases?.length ? <p className={s.meta}>Also: {t.aliases.join(", ")}</p> : null}
          <div className={s.actions}>
            <a className={d.primary} href={`/?term=${t.slug}`}>
              See it on the map
            </a>
            <a className={d.back} href={`/terms/${t.slug}/`}>
              Full definition
            </a>
            <a className={d.back} href={`/api/md/${t.slug}.md`}>
              Markdown
            </a>
          </div>
        </article>
      </div>
    </main>
  );
}
