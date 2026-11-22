import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE, TERM_BY_SLUG } from "@/data/terms";
import { TOUR_BY_ID, TOURS } from "@/data/tours";
import { absoluteUrl } from "@/lib/site";
import d from "@/app/terms/docs.module.css";
import s from "@/app/share/share.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return TOURS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const tour = TOUR_BY_ID.get(id);
  if (!tour) return {};
  const title = `${tour.name} — guided tour`;
  const description = tour.blurb;
  const url = absoluteUrl(`/share/tour/${tour.id}/`);
  return {
    title: tour.name,
    description,
    alternates: { canonical: `/share/tour/${tour.id}/` },
    openGraph: {
      title: `${title} · ${SITE.short}`,
      description,
      type: "article",
      url,
      images: [{ url: "/og-default.svg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE.short}`,
      description,
      images: ["/og-default.svg"],
    },
  };
}

export default async function TourShareCard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tour = TOUR_BY_ID.get(id);
  if (!tour) notFound();
  return (
    <main className={d.page} id="main-content">
      <div className={d.inner}>
        <div className={d.top}>
          <span className={d.kicker}>Guided tour</span>
          <a className={d.back} href="/intro/">
            Introduction
          </a>
        </div>
        <span className={d.rule} />
        <article className={s.card}>
          <p className={s.eyebrow}>
            {SITE.short} · {tour.steps.length} stops
          </p>
          <h1 className={s.name}>{tour.name}</h1>
          <p className={s.blurb}>{tour.blurb}</p>
          <div className={s.actions}>
            <a className={d.primary} href={`/?tour=${tour.id}`}>
              Start on the map
            </a>
            <a className={d.back} href="/agents/">
              Connect your agent
            </a>
          </div>
        </article>

        <h2 className={d.label}>Stops</h2>
        <ol className={s.stops}>
          {tour.steps.map((step, i) => {
            const term = TERM_BY_SLUG.get(step.slug);
            return (
              <li key={step.slug} className={s.stop}>
                <span className={s.stopNum}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className={s.stopName}>
                    {term ? <a href={`/share/term/${term.slug}/`}>{term.name}</a> : step.slug}
                  </div>
                  <p className={s.stopNote}>{step.note}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </main>
  );
}
