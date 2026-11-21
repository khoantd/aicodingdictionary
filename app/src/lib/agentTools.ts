// Tools AI agents can call from inside the page: WebMCP (navigator.modelContext) when the
// browser offers it, plus a plain `window.aiCodingDictionary` object for agents that run scripts.
import { findTerm, SECTIONS, TERMS } from "@/data/terms";
import { TOUR_BY_ID, TOURS, tourToMarkdown } from "@/data/tours";
import { termToJson, termToMarkdown } from "./markdown";
import { searchTerms } from "./search";

type Json = Record<string, unknown>;

export interface AgentHooks {
  open: (slug: string) => void;
  close: () => void;
  startTour?: (id: string) => void;
}

function text(data: unknown) {
  return { content: [{ type: "text", text: typeof data === "string" ? data : JSON.stringify(data, null, 2) }] };
}

export function buildTools(hooks: AgentHooks) {
  const notFound = (q: string) => text(`No term called "${q}". Try search_terms first.`);
  return [
    {
      name: "search_terms",
      description: "Search the AI Coding Dictionary by name, alias or words in the definition. Returns matching terms with short definitions.",
      inputSchema: { type: "object", properties: { query: { type: "string", description: "What to look for" } }, required: ["query"] },
      annotations: { readOnlyHint: true },
      execute: async ({ query }: { query: string }) => {
        const r = searchTerms(query, 12);
        return text({
          matches: r.matches.map((t) => ({ slug: t.slug, name: t.name, definition: t.def })),
          did_you_mean: r.suggestion ? r.suggestion.slug : null,
        });
      },
    },
    {
      name: "get_term",
      description: "Get one dictionary entry (by name or slug) as Markdown, with its full definition and related terms.",
      inputSchema: { type: "object", properties: { term: { type: "string" } }, required: ["term"] },
      annotations: { readOnlyHint: true },
      execute: async ({ term }: { term: string }) => {
        const t = findTerm(term);
        return t ? text(termToMarkdown(t, location.origin)) : notFound(term);
      },
    },
    {
      name: "related_terms",
      description: "List the terms connected to a given term on the map.",
      inputSchema: { type: "object", properties: { term: { type: "string" } }, required: ["term"] },
      annotations: { readOnlyHint: true },
      execute: async ({ term }: { term: string }) => {
        const t = findTerm(term);
        return t ? text(termToJson(t).connects_to) : notFound(term);
      },
    },
    {
      name: "list_sections",
      description: "List the dictionary's sections and the terms in each.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () =>
        text(SECTIONS.map((s) => ({ section: s.name, terms: TERMS.filter((t) => t.section === s.id).map((t) => t.slug) }))),
    },
    {
      name: "open_term",
      description: "Show a term to the person: focuses it on the 3D map and opens its panel.",
      inputSchema: { type: "object", properties: { term: { type: "string" } }, required: ["term"] },
      execute: async ({ term }: { term: string }) => {
        const t = findTerm(term);
        if (!t) return notFound(term);
        hooks.open(t.slug);
        return text(`Opened ${t.name}.`);
      },
    },
    {
      name: "list_tours",
      description: "List the guided tours: short ordered lessons that walk through related terms.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () => text(TOURS.map((t) => ({ id: t.id, name: t.name, blurb: t.blurb, stops: t.steps.map((s) => s.slug) }))),
    },
    {
      name: "get_tour",
      description: "Get one guided tour as Markdown: each stop with why it matters and its definition.",
      inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
      annotations: { readOnlyHint: true },
      execute: async ({ id }: { id: string }) => {
        const t = TOUR_BY_ID.get(id);
        return t ? text(tourToMarkdown(t)) : text(`No tour "${id}". Try list_tours.`);
      },
    },
    {
      name: "start_tour",
      description: "Start a guided tour for the person on the 3D map.",
      inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
      execute: async ({ id }: { id: string }) => {
        const t = TOUR_BY_ID.get(id);
        if (!t || !hooks.startTour) return text(`No tour "${id}". Try list_tours.`);
        hooks.startTour(id);
        return text(`Started the tour "${t.name}".`);
      },
    },
    {
      name: "close_term",
      description: "Close the open term panel.",
      inputSchema: { type: "object", properties: {} },
      execute: async () => {
        hooks.close();
        return text("Closed.");
      },
    },
  ];
}

export function registerAgentTools(hooks: AgentHooks): () => void {
  const tools = buildTools(hooks);
  const cleanups: (() => void)[] = [];

  const w = window as unknown as Json;
  w.aiCodingDictionary = {
    terms: () => TERMS.map(termToJson),
    search: (q: string) => searchTerms(q).matches.map(termToJson),
    get: (q: string) => {
      const t = findTerm(q);
      return t ? termToJson(t) : null;
    },
    markdown: (q: string) => {
      const t = findTerm(q);
      return t ? termToMarkdown(t, location.origin) : null;
    },
    open: (q: string) => {
      const t = findTerm(q);
      if (t) hooks.open(t.slug);
      return !!t;
    },
    close: hooks.close,
    tours: () => TOURS.map((t) => ({ id: t.id, name: t.name, blurb: t.blurb, stops: t.steps })),
    startTour: (id: string) => {
      if (!TOUR_BY_ID.has(id) || !hooks.startTour) return false;
      hooks.startTour(id);
      return true;
    },
    tools: tools.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })),
  };
  cleanups.push(() => delete w.aiCodingDictionary);

  const mc = (navigator as unknown as { modelContext?: Json }).modelContext as
    | { provideContext?: (c: Json) => void; registerTool?: (t: Json) => unknown; unregisterTool?: (n: string) => void; clearContext?: () => void }
    | undefined;
  try {
    if (mc?.provideContext) {
      mc.provideContext({ tools });
      cleanups.push(() => mc.clearContext?.());
    } else if (mc?.registerTool) {
      for (const t of tools) {
        const reg = mc.registerTool(t) as { unregister?: () => void } | undefined;
        cleanups.push(() => (reg?.unregister ? reg.unregister() : mc.unregisterTool?.(t.name)));
      }
    }
  } catch {
    /* WebMCP not usable here */
  }
  return () => cleanups.forEach((c) => c());
}
