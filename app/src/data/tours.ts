// Guided tours: short ordered paths through the map. Wording is original to this project.
import { TERM_BY_SLUG } from "./terms";

export interface TourStep {
  slug: string;
  note: string;
}

export interface Tour {
  id: string;
  name: string;
  blurb: string;
  steps: TourStep[];
}

export const TOURS: Tour[] = [
  {
    id: "anatomy-of-a-turn",
    name: "Anatomy of a turn",
    blurb: "Follow one message from you all the way through the agent and back.",
    steps: [
      { slug: "turn", note: "You send a message. Everything that happens until the agent hands back control is one turn." },
      { slug: "harness", note: "The harness packages your message with everything else the model needs to see." },
      { slug: "context-window", note: "That package is the context window — the model's entire view of the world." },
      { slug: "model-provider-request", note: "The harness sends it to the provider as one request." },
      { slug: "next-token-prediction", note: "The model writes its reply one token at a time." },
      { slug: "tool-call", note: "Often the reply is a request to use a tool, not an answer." },
      { slug: "tool-result", note: "The harness runs the tool and feeds the result back in — then the loop repeats." },
      { slug: "output-tokens", note: "When the model finally answers you, those words are output tokens. The turn ends." },
    ],
  },
  {
    id: "why-long-sessions-go-wrong",
    name: "Why long sessions go wrong",
    blurb: "Why an agent gets worse the longer you talk to it — and what to do about it.",
    steps: [
      { slug: "session", note: "A session starts empty and grows with every turn." },
      { slug: "context-window", note: "All of that history piles into the same fixed-size window." },
      { slug: "attention-budget", note: "Each token only has so much attention to share out." },
      { slug: "attention-degradation", note: "More tokens means thinner attention: instructions start slipping." },
      { slug: "smart-zone", note: "So the agent is sharpest early and drifts later." },
      { slug: "hallucination", note: "Drift shows up as confident mistakes." },
      { slug: "handoff-artifact", note: "Before resetting, write down what matters." },
      { slug: "clearing", note: "Then clear and start a fresh, sharp session." },
    ],
  },
  {
    id: "keeping-costs-down",
    name: "Keeping costs down",
    blurb: "Where the bill comes from, and the levers that shrink it.",
    steps: [
      { slug: "token", note: "Everything is priced in tokens." },
      { slug: "input-tokens", note: "Input is everything sent in — and it is resent on every request." },
      { slug: "output-tokens", note: "Output costs more per token, but there is usually less of it." },
      { slug: "prefix-cache", note: "Providers remember a stable start of the context…" },
      { slug: "cache-tokens", note: "…and bill those repeated tokens at a fraction of the price." },
      { slug: "effort", note: "Thinking harder spends more output tokens — use it when it pays." },
      { slug: "compaction", note: "Summarising history trades detail for a smaller, cheaper context." },
    ],
  },
  {
    id: "letting-agents-work-alone",
    name: "Letting agents work alone",
    blurb: "What you need in place before an agent can run without you watching.",
    steps: [
      { slug: "afk", note: "The goal: start the work and walk away." },
      { slug: "sandbox", note: "First, somewhere safe for mistakes to happen." },
      { slug: "permission-mode", note: "Inside the sandbox you can let tools run without asking." },
      { slug: "ticket", note: "Give it work sized for one sharp session." },
      { slug: "automated-check", note: "Tests and builds judge the result the same way every time." },
      { slug: "automated-review", note: "A second agent can add a judgement the checks can't make." },
      { slug: "software-factory", note: "Wire triggers to tickets and the work starts itself." },
      { slug: "dark-factory", note: "The far end: code nobody reads. Decide deliberately if you want it." },
    ],
  },
  {
    id: "debugging-a-bad-session",
    name: "Debugging a bad session",
    blurb: "When the agent starts sounding confident and wrong — name the failure, then reset cleanly.",
    steps: [
      { slug: "smart-zone", note: "Early turns are sharp. If quality dropped, you may already be past this zone." },
      { slug: "attention-degradation", note: "A long context spreads attention thin — instructions slip." },
      { slug: "hallucination", note: "Drift often looks like fluent invention, not an error message." },
      { slug: "sycophancy", note: "Or the agent agrees with a bad premise instead of pushing back." },
      { slug: "handoff-artifact", note: "Before you reset, write down what still matters." },
      { slug: "clearing", note: "Start a fresh session so attention can focus again." },
      { slug: "compaction", note: "If you must keep going, summarise instead of carrying every turn." },
      { slug: "human-in-the-loop", note: "Decide deliberately what still needs your eyes." },
    ],
  },
  {
    id: "tools-skills-and-mcp",
    name: "Tools, skills, and MCP",
    blurb: "How an agent reaches outside the model — tools, skills, and shared servers.",
    steps: [
      { slug: "tool", note: "A tool is a capability the harness can run on the model's behalf." },
      { slug: "tool-call", note: "The model asks for a tool; it does not run the tool itself." },
      { slug: "tool-result", note: "The harness returns what happened so the next turn can use it." },
      { slug: "mcp", note: "MCP is a shared way to expose tools to many clients." },
      { slug: "skill", note: "A skill packages instructions (and sometimes tools) the agent can load on demand." },
      { slug: "progressive-disclosure", note: "Show only what the agent needs now — keep the rest out of context." },
      { slug: "agents-md", note: "Project instructions steer which tools and skills matter here." },
      { slug: "permission-mode", note: "How freely tools may run without asking you first." },
    ],
  },
];

export const TOUR_BY_ID = new Map(TOURS.map((t) => [t.id, t]));

// Catch typos at build time.
for (const t of TOURS) for (const s of t.steps) if (!TERM_BY_SLUG.has(s.slug)) throw new Error(`Tour ${t.id}: unknown term ${s.slug}`);

export function tourToMarkdown(t: Tour): string {
  const lines = [`# Tour: ${t.name}`, "", t.blurb, ""];
  t.steps.forEach((s, i) => {
    const term = TERM_BY_SLUG.get(s.slug)!;
    lines.push(`${i + 1}. **[${term.name}](/terms/${term.slug}/)** — ${s.note}`);
    lines.push(`   _${term.def}_`);
  });
  return lines.join("\n") + "\n";
}
