"use client";

import { useMemo, useState } from "react";
import { SECTIONS, TERMS, type SectionId } from "@/data/terms";
import { searchTerms } from "@/lib/search";
import s from "@/app/terms/docs.module.css";
import local from "./TermsSearch.module.css";

export default function TermsSearch() {
  const [q, setQ] = useState("");
  const { matches, suggestion } = useMemo(() => searchTerms(q, 72), [q]);
  const filtered = q.trim() ? matches : TERMS;
  const bySection = useMemo(() => {
    const map = new Map<SectionId, typeof TERMS>();
    for (const sec of SECTIONS) map.set(sec.id, []);
    for (const t of filtered) map.get(t.section)?.push(t);
    return map;
  }, [filtered]);

  return (
    <>
      <label className={local.searchLabel} htmlFor="terms-search">
        Search terms
      </label>
      <input
        id="terms-search"
        className={local.search}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Name, alias, or words from a definition"
        autoComplete="off"
        spellCheck={false}
      />
      {q.trim() && !matches.length ? (
        <p className={local.empty}>
          No matches
          {suggestion ? (
            <>
              {" "}
              — did you mean{" "}
              <a href={`/terms/${suggestion.slug}/`}>{suggestion.name}</a>?
            </>
          ) : null}
        </p>
      ) : null}
      {SECTIONS.map((sec) => {
        const list = bySection.get(sec.id) ?? [];
        if (!list.length) return null;
        return (
          <section key={sec.id}>
            <h2 className={s.label}>
              {sec.name}
              {q.trim() ? ` · ${list.length}` : null}
            </h2>
            <ul className={s.list}>
              {list.map((t) => (
                <li key={t.slug}>
                  <a href={`/terms/${t.slug}/`}>{t.name}</a>
                  <span>{t.def}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
