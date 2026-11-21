import { TERMS, type Term } from "@/data/terms";

function distance(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();

export interface SearchResult {
  matches: Term[];
  suggestion: Term | null;
}

/** Name matches first (prefix, then contains), then definition matches. Typo suggestion when empty. */
export function searchTerms(query: string, limit = 72): SearchResult {
  const q = norm(query);
  if (!q) return { matches: [], suggestion: null };
  const scored: { t: Term; s: number }[] = [];
  for (const t of TERMS) {
    const names = [t.name, ...(t.aliases ?? [])].map(norm);
    let s = 0;
    if (names.some((n) => n === q)) s = 100;
    else if (names.some((n) => n.startsWith(q))) s = 80;
    else if (names.some((n) => n.split(" ").some((w) => w.startsWith(q)))) s = 60;
    else if (names.some((n) => n.includes(q))) s = 40;
    else if (q.length > 2 && norm(t.def).includes(q)) s = 10;
    if (s) scored.push({ t, s });
  }
  scored.sort((a, b) => b.s - a.s || a.t.name.localeCompare(b.t.name));
  const matches = scored.slice(0, limit).map((x) => x.t);
  let suggestion: Term | null = null;
  if (!matches.length && q.length > 1) {
    let best = Infinity;
    for (const t of TERMS) {
      for (const n of [t.name, ...(t.aliases ?? [])].map(norm)) {
        const d = distance(q, n.slice(0, Math.max(q.length, Math.min(n.length, q.length + 2))));
        if (d < best) {
          best = d;
          suggestion = t;
        }
      }
    }
    if (best > Math.max(2, Math.floor(q.length / 3))) suggestion = null;
  }
  return { matches, suggestion };
}
