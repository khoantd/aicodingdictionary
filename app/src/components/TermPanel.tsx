"use client";

import { useEffect, useRef, useState } from "react";
import { neighbours, parseLinks, sectionOf, TERM_BY_SLUG, TERMS, type Term } from "@/data/terms";
import { termToMarkdown } from "@/lib/markdown";
import s from "./TermPanel.module.css";

function Roll({ children }: { children: string }) {
  return (
    <>
      <span className={s.roll} aria-hidden="true">
        <span>{children}</span>
        <span>{children}</span>
      </span>
    </>
  );
}

function Prose({ text, onOpen }: { text: string; onOpen: (slug: string) => void }) {
  return (
    <>
      {parseLinks(text).map((seg, i) =>
        seg.term ? (
          <button key={i} type="button" className={s.inlineLink} onClick={() => onOpen(seg.term!.slug)}>
            {seg.text}
          </button>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  );
}

const Arrow = ({ dir }: { dir: "prev" | "next" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === "prev" ? <path d="M15 5 8 12l7 7" /> : <path d="M9 5l7 7-7 7" />}
  </svg>
);

export interface TermPanelProps {
  term: Term | null;
  open: boolean;
  expanded: boolean;
  onExpand: (v: boolean) => void;
  onOpen: (slug: string) => void;
  onClose: () => void;
  onToast: (msg: string) => void;
  tour?: TourInfo | null;
  onEndTour?: () => void;
}

export interface TourInfo {
  name: string;
  step: number;
  total: number;
  note: string;
  prev: string | null;
  next: string | null;
}

export default function TermPanel({ term, open, expanded, onExpand, onOpen, onClose, onToast, tour, onEndTour }: TermPanelProps) {
  const [more, setMore] = useState(false);
  const [copied, setCopied] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMore(false);
    setCopied(false);
    bodyRef.current?.scrollTo({ top: 0 });
  }, [term?.slug]);

  if (!term) return <aside className={s.panel} data-open="false" aria-hidden="true" />;

  const total = TERMS.length;
  // Inside a tour the pager walks the tour; otherwise it walks the whole dictionary.
  const prev = tour ? (tour.prev ? TERM_BY_SLUG.get(tour.prev)! : null) : TERMS[(term.index - 2 + total) % total];
  const next = tour ? (tour.next ? TERM_BY_SLUG.get(tour.next)! : null) : TERMS[term.index % total];
  const links = neighbours(term);
  const paras = more ? term.full : term.full.slice(0, 1);

  const share = async () => {
    const url = `${location.origin}/?term=${term.slug}`;
    try {
      if (navigator.share && matchMedia("(hover: none)").matches) {
        await navigator.share({ title: term.name, text: term.def, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      onToast("Link copied");
    } catch {
      /* cancelled */
    }
  };

  const copyMd = async () => {
    try {
      await navigator.clipboard.writeText(termToMarkdown(term, location.origin));
      setCopied(true);
      onToast("Markdown copied");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      onToast("Couldn't copy");
    }
  };

  return (
    <aside
      className={s.panel}
      data-open={open ? "true" : "false"}
      data-expanded={expanded ? "true" : "false"}
      role="dialog"
      aria-modal="false"
      aria-label={`${term.name} — definition`}
    >
      <button type="button" className={s.grip} aria-label={expanded ? "Collapse" : "Expand"} onClick={() => onExpand(!expanded)}>
        <span className={s.gripBar} />
      </button>
      <button type="button" className={s.close} aria-label="Close" onClick={onClose}>
        <span className={s.closeMark} />
      </button>

      <div className={s.body} ref={bodyRef} key={term.slug}>
        {tour ? (
          <div className={s.tourStrip} role="note" aria-label={`Tour: ${tour.name}, stop ${tour.step} of ${tour.total}`}>
            <div className={s.tourHead}>
              <span className={s.tourKicker}>
                Tour · {tour.name} · {tour.step} / {tour.total}
              </span>
              <button type="button" className={s.tourEnd} onClick={onEndTour}>
                End tour
              </button>
            </div>
            <p className={s.tourNote}>{tour.note}</p>
            <div className={s.tourDots} aria-hidden="true">
              {Array.from({ length: tour.total }, (_, i) => (
                <span key={i} className={s.tourDot} data-done={i < tour.step ? "true" : "false"} />
              ))}
            </div>
          </div>
        ) : null}
        <header className={s.meta} style={{ ["--i" as string]: 0 }}>
          <span className={s.section}>{sectionOf(term.section).name}</span>
          <span className={s.index}>
            <em className={s.indexNum}>{term.index}</em>
            <span className={s.indexTotal}>/ {total}</span>
          </span>
        </header>
        <span className={s.rule} style={{ ["--i" as string]: 1 }} />
        <h2 className={s.title}>
          <span className={s.titleInner}>{term.name}</span>
        </h2>
        {term.aliases?.length ? <p className={s.aliases}>Also: {term.aliases.join(", ")}</p> : null}
        <p className={s.def} style={{ ["--i" as string]: 2 }}>
          {term.def}
        </p>

        <section className={s.block} style={{ ["--i" as string]: 3 }}>
          <span className={s.rule} />
          <p className={s.label}>Full definition</p>
          <div className={s.prose}>
            {paras.map((p, i) => (
              <p className={s.proseP} key={i}>
                <Prose text={p} onOpen={onOpen} />
              </p>
            ))}
            {term.full.length > 1 ? (
              <button type="button" className={s.readMore} data-open={more} aria-expanded={more} onClick={() => setMore(!more)}>
                {more ? "Show less" : "Read more"}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            ) : null}
          </div>
        </section>

        {term.usage ? (
          <section className={s.block} style={{ ["--i" as string]: 4 }}>
            <span className={s.rule} />
            <p className={s.label}>Heard in the wild</p>
            <ul className={s.usage}>
              <li className={s.bubble} data-role="q">
                {term.usage[0]}
              </li>
              <li className={s.bubble} data-role="a">
                {term.usage[1]}
              </li>
            </ul>
          </section>
        ) : null}

        <section className={s.block} style={{ ["--i" as string]: 5 }}>
          <span className={s.rule} />
          <p className={s.label}>Connects to</p>
          <ul className={s.tags}>
            {links.map((o) => (
              <li key={o.slug}>
                <button type="button" className={s.tag} onClick={() => onOpen(o.slug)}>
                  <Roll>{o.name}</Roll>
                  <span className="sr-only">{o.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.block} style={{ ["--i" as string]: 6 }}>
          <span className={s.rule} />
          <div className={s.ctaRow}>
            <a className={s.cta} href={`/terms/${term.slug}/`}>
              <Roll>Open full entry</Roll>
              <span className="sr-only">Open the full entry for {term.name}</span>
              <svg className={s.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
            <button type="button" className={s.share} onClick={share}>
              <Roll>Share</Roll>
              <span className="sr-only">Share {term.name}</span>
              <svg className={s.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M12 15V4" />
                <path d="M8 8l4-4 4 4" />
                <path d="M5 12v6a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5v-6" />
              </svg>
            </button>
            <button type="button" className={s.share} data-copied={copied} onClick={copyMd}>
              <Roll>{copied ? "Copied" : "Copy markdown"}</Roll>
              <span className="sr-only">Copy {term.name} as markdown</span>
              <svg className={s.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                {copied ? <path d="M5 12.5l4.5 4.5L19 7" /> : <path d="M8 8h10v12H8zM6 16H4V4h10v2" />}
              </svg>
            </button>
          </div>
        </section>
      </div>

      <nav className={s.pager} aria-label={tour ? "Tour stops" : "Browse terms"}>
        <button
          type="button"
          className={s.pagerBtn}
          data-dir="prev"
          disabled={!prev}
          style={prev ? undefined : { opacity: 0.35, cursor: "default" }}
          onClick={() => prev && onOpen(prev.slug)}
        >
          <span className={s.pagerArrow}>
            <Arrow dir="prev" />
          </span>
          <span className={s.pagerMeta}>
            <span className={s.pagerKicker}>{tour ? "Previous stop" : "Prev"}</span>
            <span className={s.pagerName}>{prev ? prev.name : "Start"}</span>
          </span>
        </button>
        <button
          type="button"
          className={s.pagerBtn}
          data-dir="next"
          onClick={() => (next ? onOpen(next.slug) : tour ? onEndTour?.() : undefined)}
        >
          <span className={s.pagerMeta}>
            <span className={s.pagerKicker}>{tour ? (next ? "Next stop" : "Done") : "Next"}</span>
            <span className={s.pagerName}>{next ? next.name : "Finish tour"}</span>
          </span>
          <span className={s.pagerArrow}>
            <Arrow dir="next" />
          </span>
        </button>
      </nav>
    </aside>
  );
}
