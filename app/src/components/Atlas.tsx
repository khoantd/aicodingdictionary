"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AGENT_EXPORT_LINKS, KEYBOARD_HINTS } from "@/data/agentSetup";
import { sectionOf, TERM_BY_SLUG, TERMS } from "@/data/terms";
import { TOUR_BY_ID, TOURS, type Tour } from "@/data/tours";
import { registerAgentTools } from "@/lib/agentTools";
import { searchTerms } from "@/lib/search";
import { blip, setMuted } from "@/lib/sound";
import { GraphScene, type ColorMode } from "./graph/GraphScene";
import TermPanel from "./TermPanel";
import s from "./Atlas.module.css";

function readParams() {
  const p = new URLSearchParams(location.search);
  const term = p.get("term");
  const tour = p.get("tour");
  return {
    term: term && TERM_BY_SLUG.has(term) ? term : null,
    q: p.get("q") ?? "",
    tour: tour && TOUR_BY_ID.has(tour) ? tour : null,
  };
}

function setParams(updates: Record<string, string | null>, push: boolean) {
  const p = new URLSearchParams(location.search);
  for (const [k, v] of Object.entries(updates)) {
    if (v) p.set(k, v);
    else p.delete(k);
  }
  const qs = p.toString();
  const url = location.pathname + (qs ? `?${qs}` : "") + location.hash;
  if (url === location.pathname + location.search + location.hash) return;
  history[push ? "pushState" : "replaceState"](null, "", url);
}

const SearchIcon = () => (
  <svg className={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.34-4.34" />
  </svg>
);

export default function Atlas({ onFail }: { onFail: () => void }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<GraphScene | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [selected, setSelected] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [activeResult, setActiveResult] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [tipPos, setTipPos] = useState<{ x: number; y: number } | null>(null);
  const [colorMode, setColorMode] = useState<ColorMode>("gray");
  const [muted, setMutedState] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [touch, setTouch] = useState(false);
  const [tourId, setTourId] = useState<string | null>(null);
  const [toursOpen, setToursOpen] = useState(false);
  const tourRef = useRef<string | null>(null);
  const tour: Tour | null = tourId ? (TOUR_BY_ID.get(tourId) ?? null) : null;
  const tourStep = tour && selected ? tour.steps.findIndex((st) => st.slug === selected) : -1;

  const term = selected ? (TERM_BY_SLUG.get(selected) ?? null) : null;
  const result = useMemo(() => searchTerms(query), [query]);

  // ── Navigation ─────────────────────────
  const open = useCallback((slug: string, push = true) => {
    setSelected(slug);
    setPanelOpen(true);
    blip("select");
    // Leaving the tour's route ends the tour.
    const t = tourRef.current ? TOUR_BY_ID.get(tourRef.current) : null;
    const keepTour = !!t && t.steps.some((st) => st.slug === slug);
    if (!keepTour && tourRef.current) {
      tourRef.current = null;
      setTourId(null);
    }
    setParams({ term: slug, tour: keepTour ? tourRef.current : null }, push);
  }, []);

  const close = useCallback(() => {
    setPanelOpen(false);
    setExpanded(false);
    setSelected(null);
    tourRef.current = null;
    setTourId(null);
    blip("close");
    setParams({ term: null, tour: null }, true);
  }, []);

  const startTour = useCallback((id: string) => {
    const t = TOUR_BY_ID.get(id);
    if (!t) return;
    tourRef.current = id;
    setTourId(id);
    setToursOpen(false);
    setSelected(t.steps[0].slug);
    setPanelOpen(true);
    blip("open");
    setParams({ term: t.steps[0].slug, tour: id }, true);
  }, []);

  const endTour = useCallback(() => {
    tourRef.current = null;
    setTourId(null);
    setParams({ tour: null }, false);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1600);
  }, []);

  // ── Scene setup ────────────────────────
  useEffect(() => {
    setTouch(matchMedia("(any-pointer: coarse) and (hover: none)").matches);
    let scene: GraphScene;
    try {
      scene = new GraphScene(canvasRef.current!, labelsRef.current!, {
        onSelect: (slug) => open(slug),
        onBackground: () => {
          if (sceneRef.current && selectedRef.current) close();
        },
        onHover: (slug) => {
          setHovered(slug);
          if (slug) blip("hover");
        },
        onInteract: () => setInteracted(true),
      });
    } catch {
      onFail();
      return;
    }
    sceneRef.current = scene;
    const init = readParams();
    if (init.q) setQuery(init.q);
    if (init.tour && TOUR_BY_ID.get(init.tour)!.steps.some((st) => st.slug === init.term)) {
      tourRef.current = init.tour;
      setTourId(init.tour);
    }
    if (init.term) {
      setSelected(init.term);
      setPanelOpen(true);
    }
    const onPop = () => {
      const p = readParams();
      setSelected(p.term);
      setPanelOpen(!!p.term);
      setQuery(p.q);
      tourRef.current = p.term ? p.tour : null;
      setTourId(p.term ? p.tour : null);
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      scene.dispose();
      sceneRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedRef = useRef<string | null>(null);
  useEffect(() => {
    selectedRef.current = selected;
    sceneRef.current?.setSelected(selected);
    document.title = term ? `${term.name} — The AI Coding Dictionary` : "The AI Coding Dictionary";
  }, [selected, term]);

  useEffect(() => {
    const sc = sceneRef.current;
    if (query.trim()) sc?.setHighlight(new Set(result.matches.map((t) => t.slug)));
    else if (tour) sc?.setHighlight(new Set(tour.steps.map((st) => st.slug)));
    else sc?.setHighlight(null);
    setActiveResult(0);
  }, [query, result, tour]);

  useEffect(() => {
    sceneRef.current?.setPath(tour ? tour.steps.map((st) => st.slug) : null);
  }, [tour]);

  useEffect(() => sceneRef.current?.setColorMode(colorMode), [colorMode]);
  useEffect(() => setMuted(muted), [muted]);

  // Tooltip follows the hovered node.
  useEffect(() => {
    if (!hovered) {
      setTipPos(null);
      return;
    }
    let raf = 0;
    const tick = () => {
      const sc = sceneRef.current?.screenOf(hovered);
      const rect = canvasRef.current?.getBoundingClientRect();
      if (sc && rect) setTipPos({ x: rect.left + sc.x, y: rect.top + sc.y + sc.r });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  // ── Agent tools ────────────────────────
  useEffect(() => registerAgentTools({ open: (slug) => open(slug), close, startTour }), [open, close, startTour]);

  // ── Keyboard ───────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchActive(true);
        inputRef.current?.focus();
        return;
      }
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setSearchActive(true);
        inputRef.current?.focus();
        return;
      }
      if (e.key === "Escape") {
        if (aboutOpen) setAboutOpen(false);
        else if (toursOpen) setToursOpen(false);
        else if (typing) {
          if (query) setQuery("");
          else inputRef.current?.blur();
          setParams({ q: null }, false);
        } else if (selectedRef.current) close();
        return;
      }
      if (typing || aboutOpen || toursOpen || !selectedRef.current) return;
      const tr = tourRef.current ? TOUR_BY_ID.get(tourRef.current) : null;
      if (tr) {
        const i = tr.steps.findIndex((st) => st.slug === selectedRef.current);
        if (e.key === "ArrowRight" && i < tr.steps.length - 1) open(tr.steps[i + 1].slug, false);
        if (e.key === "ArrowLeft" && i > 0) open(tr.steps[i - 1].slug, false);
        return;
      }
      const cur = TERM_BY_SLUG.get(selectedRef.current)!;
      const n = TERMS.length;
      if (e.key === "ArrowRight") open(TERMS[cur.index % n].slug, false);
      if (e.key === "ArrowLeft") open(TERMS[(cur.index - 2 + n) % n].slug, false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [aboutOpen, toursOpen, query, open, close]);

  // ── Search handlers ────────────────────
  const onQuery = (v: string) => {
    setQuery(v);
    setParams({ q: v || null }, false);
    setInteracted(true);
  };
  const onSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const list = result.matches.slice(0, 8);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveResult((i) => Math.min(i + 1, list.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveResult((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const pick = list[activeResult] ?? result.suggestion;
      if (pick) {
        open(pick.slug);
        inputRef.current?.blur();
      }
    }
  };

  const count = query.trim() ? result.matches.length : null;
  const hintText = count === null ? (touch ? "" : "⌘K to search") : count === 0 ? "no matches" : `${count} ${count === 1 ? "term" : "terms"}`;
  const showList = searchActive && query.trim() && result.matches.length > 0;
  const shift = panelOpen && !!term;
  const hoveredTerm = hovered ? TERM_BY_SLUG.get(hovered) : null;

  return (
    <div className={s.root}>
      <main id="main-content" aria-label="AI Coding Dictionary — 3D map of terms">
        <div
          className={s.canvas}
          ref={canvasRef}
          data-shift={shift ? "true" : "false"}
          data-detent={expanded ? "expanded" : "default"}
        >
          <div className={s.labels} ref={labelsRef} aria-hidden="true" />
        </div>
        <div className={s.grain} aria-hidden="true" />
      </main>

      {/* Search */}
      <div className={s.search}>
        <div className={s.field} data-active={searchActive || !!query ? "true" : "false"}>
          <button
            type="button"
            className={s.searchIconBtn}
            aria-label="Search the dictionary"
            onClick={() => {
              setSearchActive(true);
              inputRef.current?.focus();
            }}
          >
            <SearchIcon />
          </button>
          <input
            ref={inputRef}
            id="atlas-search"
            name="q"
            type="search"
            className={s.input}
            placeholder="Search the dictionary"
            autoComplete="off"
            spellCheck={false}
            value={query}
            role="combobox"
            aria-expanded={showList ? "true" : "false"}
            aria-controls="atlas-results"
            aria-activedescendant={showList ? `result-${activeResult}` : undefined}
            onChange={(e) => onQuery(e.target.value)}
            onKeyDown={onSearchKey}
            onFocus={() => setSearchActive(true)}
            onBlur={() => window.setTimeout(() => setSearchActive(false), 150)}
            tabIndex={searchActive || query ? 0 : -1}
          />
          {query ? (
            <button type="button" className={s.clear} aria-label="Clear search" onClick={() => onQuery("")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          ) : null}
        </div>
        <span className={s.hint} data-show={searchActive || !!query ? "true" : "false"} aria-live="polite">
          {hintText}
        </span>
        {query.trim() && !result.matches.length && result.suggestion ? (
          <button type="button" className={s.suggest} onClick={() => onQuery(result.suggestion!.name)}>
            Did you mean {result.suggestion.name}?
          </button>
        ) : null}
        {showList ? (
          <ul className={s.results} id="atlas-results" role="listbox">
            {result.matches.slice(0, 8).map((t, i) => (
              <li key={t.slug} role="option" id={`result-${i}`} aria-selected={i === activeResult}>
                <button
                  type="button"
                  className={s.result}
                  data-active={i === activeResult ? "true" : "false"}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    open(t.slug);
                    inputRef.current?.blur();
                  }}
                >
                  {t.name}
                  <span>{sectionOf(t.section).name}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* About */}
      <button
        type="button"
        className={`${s.iconBtn} ${s.about}`}
        data-shift={shift ? "true" : "false"}
        aria-label="About this project"
        aria-haspopup="dialog"
        aria-expanded={aboutOpen}
        onClick={() => {
          setAboutOpen(true);
          blip("open");
        }}
      >
        <svg className={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <path d="M12 11v5.5" />
          <path d="M12 7.4h0" />
        </svg>
      </button>

      {/* Introduction */}
      <a
        className={`${s.iconBtn} ${s.introBtn}`}
        href="/intro/"
        data-shift={shift ? "true" : "false"}
        aria-label="Read the introduction"
        title="Introduction"
        onClick={() => blip("open")}
      >
        <svg className={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4.5 5.5A2.5 2.5 0 0 1 7 3h5.5v16.5H7A2.5 2.5 0 0 0 4.5 22z" />
          <path d="M19.5 5.5A2.5 2.5 0 0 0 17 3h-4.5v16.5H17a2.5 2.5 0 0 1 2.5 2.5z" />
        </svg>
      </a>

      {/* Guided tours */}
      <button
        type="button"
        className={`${s.iconBtn} ${s.toursBtn}`}
        data-shift={shift ? "true" : "false"}
        data-active={toursOpen || !!tour ? "true" : "false"}
        aria-label="Guided tours"
        title="Guided tours"
        aria-haspopup="dialog"
        aria-expanded={toursOpen}
        onClick={() => {
          setToursOpen(true);
          blip("open");
        }}
      >
        <svg className={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="6" cy="18" r="2" />
          <circle cx="18" cy="6" r="2" />
          <path d="M8 18h6.5a3.5 3.5 0 0 0 0-7h-5a3.5 3.5 0 0 1 0-7H16" />
        </svg>
      </button>

      {/* Bottom-left wordmark */}
      <a className={s.mark} href="/terms/" aria-label="Browse all terms as a list">
        <b>AI</b>Lexicon
      </a>

      {/* Colour + sound */}
      <button
        type="button"
        className={`${s.iconBtn} ${s.colorBtn}`}
        data-shift={shift ? "true" : "false"}
        data-active={colorMode === "section" ? "true" : "false"}
        aria-pressed={colorMode === "section"}
        aria-label={colorMode === "section" ? "Switch to grayscale" : "Switch to section colors"}
        title={colorMode === "section" ? "Colors on" : "Colors off"}
        onClick={() => setColorMode((m) => (m === "gray" ? "section" : "gray"))}
      >
        <svg className={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.8-1.7H17a4 4 0 0 0 4-4c0-4.4-4-8.2-9-8.2z" />
          <circle cx="7.5" cy="11" r="1" fill="currentColor" />
          <circle cx="10" cy="7" r="1" fill="currentColor" />
          <circle cx="14.5" cy="7" r="1" fill="currentColor" />
          <circle cx="17" cy="11" r="1" fill="currentColor" />
        </svg>
      </button>
      <button
        type="button"
        className={`${s.iconBtn} ${s.soundBtn}`}
        data-shift={shift ? "true" : "false"}
        aria-pressed={muted}
        aria-label={muted ? "Unmute interface sounds" : "Mute interface sounds"}
        title={muted ? "Unmute" : "Mute"}
        onClick={() => setMutedState((m) => !m)}
      >
        <svg className={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 9v6h4l5 4V5L8 9H4z" />
          {muted ? <path d="m16 9 5 6m0-6-5 6" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8 8 0 0 1 0 12" />}
        </svg>
      </button>

      {/* Gesture hint */}
      {!shift ? (
        <div className={s.gesture} data-hide={interacted ? "true" : "false"} aria-hidden="true">
          {touch ? "Drag to rotate" : "Drag to rotate"}
          <span className={s.dot} />
          {touch ? "Pinch to zoom" : "Scroll to zoom"}
          <span className={s.dot} />
          Tap a term
        </div>
      ) : null}

      {/* Hover tooltip */}
      {hoveredTerm && tipPos && hovered !== selected ? (
        <div className={s.tip} style={{ left: tipPos.x, top: tipPos.y }} role="tooltip">
          <b>{sectionOf(hoveredTerm.section).name}</b>
          {hoveredTerm.def}
        </div>
      ) : null}

      <TermPanel
        term={term}
        open={panelOpen}
        expanded={expanded}
        onExpand={setExpanded}
        onOpen={(slug) => open(slug)}
        onClose={close}
        onToast={showToast}
        tour={
          tour && tourStep >= 0
            ? {
                name: tour.name,
                step: tourStep + 1,
                total: tour.steps.length,
                note: tour.steps[tourStep].note,
                prev: tourStep > 0 ? tour.steps[tourStep - 1].slug : null,
                next: tourStep < tour.steps.length - 1 ? tour.steps[tourStep + 1].slug : null,
              }
            : null
        }
        onEndTour={endTour}
      />

      {aboutOpen ? <About onClose={() => setAboutOpen(false)} /> : null}
      {toursOpen ? <ToursDialog onClose={() => setToursOpen(false)} onStart={startTour} /> : null}
      {toast ? (
        <div className={s.toast} role="status">
          {toast}
        </div>
      ) : null}
    </div>
  );
}

function About({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => closeRef.current?.focus(), []);
  return (
    <>
      <div className={s.backdrop} onClick={onClose} />
      <div className={s.popup} role="dialog" aria-modal="true" aria-labelledby="about-title">
        <button ref={closeRef} type="button" className={s.popClose} aria-label="Close" onClick={onClose}>
          <span className={s.closeMark} />
        </button>
        <p className={s.kicker}>About</p>
        <h2 className={s.popTitle} id="about-title">
          The AI Coding Dictionary
        </h2>
        <div className={s.desc}>
          <p>
            The words people use when they talk about AI coding, defined in plain English. Each of the {TERMS.length}{" "}
            terms is a dot on the map; the lines show how they connect.
          </p>
          <p>Drag to turn the map, scroll or pinch to zoom, and tap any term to read it.</p>
        </div>
        <span className={s.popRule} />
        <p className={s.kicker}>For AI agents</p>
        <div className={s.pills}>
          {AGENT_EXPORT_LINKS.map((link) => (
            <a key={link.href} className={s.pill} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <span className={s.popRule} />
        <p className={s.kicker}>Keys</p>
        <dl className={s.keys}>
          {KEYBOARD_HINTS.map((hint) => (
            <Fragment key={hint.action}>
              <dt>
                {hint.keys.map((k) => (
                  <span key={k} className={s.kbd}>
                    {k}
                  </span>
                ))}
              </dt>
              <dd>{hint.action === "Close the panel or dialog" ? "Close" : hint.action}</dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </>
  );
}

function ToursDialog({ onClose, onStart }: { onClose: () => void; onStart: (id: string) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => closeRef.current?.focus(), []);
  return (
    <>
      <div className={s.backdrop} onClick={onClose} />
      <div className={s.popup} role="dialog" aria-modal="true" aria-labelledby="tours-title">
        <button ref={closeRef} type="button" className={s.popClose} aria-label="Close" onClick={onClose}>
          <span className={s.closeMark} />
        </button>
        <p className={s.kicker}>Guided tours</p>
        <h2 className={s.popTitle} id="tours-title">
          Learn it in order
        </h2>
        <p className={s.desc}>Each tour walks a short route across the map, one term at a time.</p>
        <ul className={s.tourList}>
          {TOURS.map((t) => (
            <li key={t.id} className={s.tourRow}>
              <button type="button" className={s.tourItem} onClick={() => onStart(t.id)}>
                <span className={s.tourName}>{t.name}</span>
                <span className={s.tourBlurb}>{t.blurb}</span>
                <span className={s.tourMeta}>{t.steps.length} stops · start on map</span>
              </button>
              <a className={s.tourShare} href={`/share/tour/${t.id}/`}>
                Share card
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
