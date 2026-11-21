// The dictionary. All wording here is original to this project.
// In `full` text, [[Term]] or [[shown text|Term]] links to another entry.

export type SectionId =
  | "model"
  | "sessions"
  | "tools"
  | "failure"
  | "handoffs"
  | "memory"
  | "patterns";

export interface Section {
  id: SectionId;
  name: string;
  color: string;
}

export interface RawTerm {
  name: string;
  section: SectionId;
  def: string;
  full: string[];
  related: string[];
  usage?: [string, string];
  aliases?: string[];
}

export interface Term extends RawTerm {
  slug: string;
  index: number;
}

export const SITE = {
  name: "The AI Coding Dictionary",
  short: "AI Coding Dictionary",
  tagline:
    "The words people use when they talk about AI coding — tokens, context windows, agents, handoffs — defined plainly and wired into a 3D map you can explore term by term.",
};

export const SECTIONS: Section[] = [
  { id: "model", name: "The Model", color: "#c2552f" },
  { id: "sessions", name: "Sessions, Context Windows & Turns", color: "#2f6fc2" },
  { id: "tools", name: "Tools & Environment", color: "#2f9a6a" },
  { id: "failure", name: "Failure Modes", color: "#b8372f" },
  { id: "handoffs", name: "Handoffs", color: "#8a4fc2" },
  { id: "memory", name: "Memory and Steering", color: "#c2962f" },
  { id: "patterns", name: "Patterns of Work", color: "#2f9ab0" },
];

const RAW: RawTerm[] = [
  // ── The Model ─────────────────────────────────────────────
  {
    name: "AI",
    section: "model",
    def: "A shifting umbrella word for whatever computers have recently learned to do impressively. Today it mostly means large language models.",
    full: [
      "The label keeps moving: once chess programs counted, now people mostly mean systems built on large language models. When someone says “the AI did it”, ask which part did it — the [[model]], the [[harness]], or a [[tool]].",
    ],
    related: ["Model", "Agent", "Harness", "Training"],
    usage: [
      "Can the AI just fix the build?",
      "The model can't run anything by itself — the agent's harness runs the build and feeds the errors back in.",
    ],
  },
  {
    name: "Cache tokens",
    section: "model",
    def: "Input tokens the provider recognises from an earlier request and bills at a steep discount instead of processing them again.",
    full: [
      "Because the [[model]] is [[stateless]], each [[model provider request]] resends the whole conversation. When the start of that conversation is unchanged, the provider reuses its earlier work from the [[prefix cache]] and charges those tokens as cache tokens.",
      "On a long [[session]], most of what you send should be cache tokens. If it isn't, something is breaking the prefix.",
    ],
    related: ["Input tokens", "Prefix cache", "Model provider request", "Session", "Output tokens"],
    usage: [
      "Why did that two-hour session cost so little?",
      "Nearly everything was cache tokens — the prefix stayed stable, so the provider barely re-read it.",
    ],
  },
  {
    name: "Effort",
    section: "model",
    def: "A setting for how much the model thinks before it answers. Higher effort spends more output tokens to improve its odds on hard problems.",
    full: [
      "Thinking happens as extra [[output tokens]] you may never see. Turning effort up makes each [[turn]] slower and pricier — worth it for tricky debugging or design, wasted on renaming a variable.",
    ],
    related: ["Output tokens", "Model", "Inference", "Turn"],
  },
  {
    name: "Harness",
    section: "model",
    def: "The software wrapped around a model that turns it into an agent: tools, system prompt, permissions, context management and hooks.",
    full: [
      "The [[model]] only predicts text. The harness decides what goes into the [[context window]], which [[tool|tools]] exist, when to raise a [[permission request]], and how to run each [[tool call]] the model writes.",
      "Swap the harness and the same model behaves like a very different [[agent]].",
    ],
    related: ["Agent", "Model", "Tool", "System prompt", "Permission mode", "Context window"],
  },
  {
    name: "Inference",
    section: "model",
    def: "Using a trained model to produce output. It happens on every request, and the model's parameters do not change while it runs.",
    full: [
      "[[Training]] sets the [[parameters]]; inference only reads them. Nothing the model sees during inference is learned for next time — anything it should remember has to be put back into the [[context]].",
    ],
    related: ["Training", "Parameters", "Model provider", "Model provider request"],
  },
  {
    name: "Input tokens",
    section: "model",
    def: "Everything the harness sends to the model on a request, counted in tokens. Cheaper per token than output.",
    full: [
      "Input includes the [[system prompt]], the conversation so far, file contents and every [[tool result]]. It grows with each [[turn]], which is why the [[prefix cache]] and [[cache tokens]] matter so much for cost.",
    ],
    related: ["Token", "Output tokens", "Cache tokens", "Context window", "System prompt"],
  },
  {
    name: "Model provider request",
    section: "model",
    def: "A single round trip: the harness sends the full context to the provider and gets back one response.",
    full: [
      "One [[turn]] can hold many requests — the model asks for a [[tool call]], the harness runs it, then sends a fresh request with the [[tool result]] attached. Each request is billed and rate-limited on its own.",
    ],
    related: ["Model provider", "Turn", "Tool call", "Input tokens", "Context window"],
  },
  {
    name: "Model provider",
    section: "model",
    def: "The service that runs a model for you. Often a cloud company, but it can just as well be software on your own machine.",
    full: [
      "The provider receives each [[model provider request]], runs [[inference]], and returns the output. It also sets pricing, rate limits and whether a [[prefix cache]] is available.",
    ],
    related: ["Model provider request", "Inference", "Model", "Prefix cache"],
  },
  {
    name: "Model",
    section: "model",
    def: "The trained parameters themselves. It predicts the next token and nothing more; on its own it can neither act nor remember.",
    full: [
      "Everything that looks agentic comes from the [[harness]] around it. The model is [[stateless]]: give it the same [[context]] and it starts fresh every time, writing its reply by [[next-token prediction]].",
    ],
    related: ["Parameters", "Next-token prediction", "Stateless", "Harness", "Agent"],
  },
  {
    name: "Next-token prediction",
    section: "model",
    def: "The model's one trick: pick a likely next token given everything before it, append it, and repeat.",
    full: [
      "Answers, plans, code and [[tool call|tool calls]] are all produced one [[token]] at a time this way. Because each choice is sampled, the same prompt can wander somewhere different — see [[non-determinism]].",
    ],
    related: ["Token", "Model", "Non-determinism", "Inference"],
  },
  {
    name: "Non-determinism",
    section: "model",
    def: "Asking the same thing twice can give two different answers. It comes from sampling and from how providers batch requests.",
    full: [
      "Plan for it rather than fight it: lean on [[automated check|automated checks]] that pass or fail the same way every time, and treat one good result as a sample, not a guarantee.",
    ],
    related: ["Next-token prediction", "Automated check", "Automated review", "Model"],
  },
  {
    name: "Output tokens",
    section: "model",
    def: "The tokens the model writes back. They cost more than input because each one takes a full step of computation.",
    full: [
      "Replies, hidden reasoning and [[tool call|tool calls]] all count as output. Raising [[effort]] mostly spends more of them.",
    ],
    related: ["Token", "Input tokens", "Effort", "Tool call"],
  },
  {
    name: "Parameters",
    section: "model",
    def: "The billions of numbers inside a model, adjusted during training. Everything it knows is stored in them. Also called weights.",
    full: [
      "Knowledge kept in parameters is [[parametric knowledge]]: broad, but frozen at the [[knowledge cutoff]] and impossible to edit during a [[session]].",
    ],
    related: ["Model", "Training", "Parametric knowledge", "Knowledge cutoff"],
    aliases: ["Weights"],
  },
  {
    name: "Prefix cache",
    section: "model",
    def: "The provider's short-term memory of recently processed context, letting a request skip work when it begins the same way as an earlier one.",
    full: [
      "It only helps while the beginning of the context stays identical. Reordering files or editing the [[system prompt]] mid-[[session]] breaks the prefix, and the next request is billed at the full [[input tokens|input]] rate.",
    ],
    related: ["Cache tokens", "Input tokens", "System prompt", "Model provider"],
  },
  {
    name: "Token",
    section: "model",
    def: "The small chunk of text a model reads and writes — often a word or part of one. Limits, prices and speed are all counted in tokens.",
    full: [
      "A [[context window]] is measured in tokens, bills split into [[input tokens|input]] and [[output tokens|output]], and [[next-token prediction]] produces exactly one at a time.",
    ],
    related: ["Input tokens", "Output tokens", "Context window", "Next-token prediction"],
  },
  {
    name: "Training",
    section: "model",
    def: "The long, expensive process that sets a model's parameters by showing it vast amounts of text and nudging it to predict better.",
    full: [
      "Training is finished before you ever use the model. It is where [[parametric knowledge]] comes from, where the [[knowledge cutoff]] is fixed, and where habits like [[sycophancy]] get baked in.",
    ],
    related: ["Parameters", "Inference", "Knowledge cutoff", "Sycophancy"],
  },

  // ── Sessions, Context Windows & Turns ─────────────────────
  {
    name: "Agent",
    section: "sessions",
    def: "A model wired into a harness with tools, a system prompt and a context window, taking turns with a person to get work done.",
    full: [
      "The [[model]] supplies predictions; the [[harness]] gives it hands ([[tool|tools]]) and eyes ([[tool result|tool results]]). An agent's work is organised into [[turn|turns]] inside a [[session]].",
    ],
    related: ["Model", "Harness", "Tool", "Session", "Turn", "Subagent"],
  },
  {
    name: "Context window",
    section: "sessions",
    def: "The full text the model can see on a request. It has a fixed size and is the only way the model perceives anything.",
    full: [
      "It holds the [[system prompt]], the conversation and every [[tool result]] so far. If a fact is not in the window, the model does not know it — however obvious it seems to you.",
      "As the window fills, quality drops: see [[attention degradation]]. Anything outside it must be brought in, usually by a [[tool call]].",
    ],
    related: ["Context", "Token", "System prompt", "Session", "Attention degradation", "Compaction"],
    usage: [
      "It ignored the rule I gave it an hour ago.",
      "That rule is buried deep in a crowded context window. Restate it — or start a fresh session with it up front.",
    ],
  },
  {
    name: "Context",
    section: "sessions",
    def: "The information an agent has to hand right now that actually matters for the task.",
    full: [
      "Context is about relevance; the [[context window]] is about capacity. Good agent work means loading the right context and leaving the rest out, with [[context pointer|context pointers]] and [[progressive disclosure]].",
    ],
    related: ["Context window", "Contextual knowledge", "Context pointer", "Progressive disclosure"],
  },
  {
    name: "Session",
    section: "sessions",
    def: "One continuous stretch of work with an agent. It starts empty, builds up, and ends when cleared, closed or compacted.",
    full: [
      "Everything the agent picks up during a session lives in its [[context window]]. When the session ends that state is gone, unless a [[handoff]] or a [[memory system]] carries some of it forward.",
    ],
    related: ["Turn", "Context window", "Clearing", "Compaction", "Handoff", "Stateful"],
  },
  {
    name: "Stateful",
    section: "sessions",
    def: "Keeps information from one step to the next. A session is stateful across its turns.",
    full: [
      "An [[agent]] becomes stateful across sessions only by writing things down in the [[environment]] — a [[memory system]], a [[handoff artifact]] or an [[AGENTS.md]] file.",
    ],
    related: ["Stateless", "Session", "Memory system"],
  },
  {
    name: "Stateless",
    section: "sessions",
    def: "Keeps nothing between steps. Every model request starts from scratch, and by default every new session does too.",
    full: [
      "Because the [[model]] is stateless, the [[harness]] resends the conversation on each [[model provider request]] — which is why [[input tokens]] keep piling up.",
    ],
    related: ["Stateful", "Model", "Session", "Input tokens"],
  },
  {
    name: "System prompt",
    section: "sessions",
    def: "The standing instructions the harness places at the top of every request — the agent's job description.",
    full: [
      "It usually stays fixed for a whole [[session]], which keeps the [[prefix cache]] warm. Project guidance often rides along with it, for example from an [[AGENTS.md]] file.",
    ],
    related: ["Harness", "Context window", "AGENTS.md", "Prefix cache", "Agent mode"],
  },
  {
    name: "Turn",
    section: "sessions",
    def: "One message from the user plus everything the agent does in reply, until it hands control back.",
    full: [
      "A single turn may involve many [[model provider request|model provider requests]] and [[tool call|tool calls]]. Long, unattended turns are the heart of [[AFK]] work.",
    ],
    related: ["Session", "Model provider request", "Tool call", "Agent"],
  },

  // ── Tools & Environment ───────────────────────────────────
  {
    name: "Agent mode",
    section: "tools",
    def: "A named preset that pairs a permission mode with extra instructions — “plan only”, “edit freely”. It can change mid-session.",
    full: [
      "Switching mode changes both what the agent is told and what it may do without asking. The permission half of a mode is its [[permission mode]]; the instruction half lands in the [[system prompt]].",
    ],
    related: ["Permission mode", "System prompt", "Harness"],
  },
  {
    name: "Environment",
    section: "tools",
    def: "Everything outside the harness that the agent can look at or change: files, terminals, browsers, services.",
    full: [
      "The agent perceives the environment only through [[tool result|tool results]] and changes it only through [[tool call|tool calls]]. For coding agents the default environment is the [[filesystem]].",
    ],
    related: ["Filesystem", "Tool", "Tool result", "Sandbox", "AX"],
  },
  {
    name: "Filesystem",
    section: "tools",
    def: "The folders and files an agent reads, writes and runs commands in. The usual environment for a coding agent.",
    full: [
      "Because it outlives every [[session]], the filesystem is also where memory lives: [[AGENTS.md]], [[spec|specs]], [[ticket|tickets]] and [[handoff artifact|handoff artifacts]].",
    ],
    related: ["Environment", "Tool", "AGENTS.md", "Memory system"],
  },
  {
    name: "MCP",
    section: "tools",
    def: "Model Context Protocol: a standard way to plug outside tool servers into a harness, so an agent gains tools it did not ship with.",
    full: [
      "An MCP server describes its [[tool|tools]]; the [[harness]] lists them for the model and forwards each [[tool call]]. It is how an agent learns to talk to a database, a browser — or this dictionary.",
    ],
    related: ["Tool", "Harness", "Tool call", "Environment"],
  },
  {
    name: "Permission mode",
    section: "tools",
    def: "The part of an agent mode that decides which tool calls run on their own and which stop to ask you first.",
    full: [
      "A strict mode raises a [[permission request]] for almost everything; a loose one lets the agent run freely — sensible mostly inside a [[sandbox]].",
    ],
    related: ["Agent mode", "Permission request", "Sandbox", "Human-in-the-loop"],
  },
  {
    name: "Permission request",
    section: "tools",
    def: "The prompt the harness shows before running a tool call that is not pre-approved. It keeps a person in control.",
    full: [
      "Each request is a small moment of [[human-in-the-loop]] review. Too many and people approve without reading; too few and the agent can do damage outside a [[sandbox]].",
    ],
    related: ["Permission mode", "Tool call", "Human-in-the-loop"],
  },
  {
    name: "Sandbox",
    section: "tools",
    def: "A walled-off place for the agent to work — a container, virtual machine or restricted shell — so mistakes stay contained.",
    full: [
      "A good sandbox makes it safe to loosen the [[permission mode]] and leave the agent [[AFK]].",
    ],
    related: ["Environment", "Permission mode", "AFK"],
  },
  {
    name: "Tool call",
    section: "tools",
    def: "Text the model writes that names a tool and its arguments. Nothing happens until the harness reads it and runs it.",
    full: [
      "The [[model]] cannot run code; it can only ask. The [[harness]] executes the call — perhaps after a [[permission request]] — and returns a [[tool result]].",
    ],
    related: ["Tool", "Tool result", "Harness", "Permission request", "Model provider request"],
  },
  {
    name: "Tool result",
    section: "tools",
    def: "What comes back after the harness runs a tool call: file contents, command output or an error. The agent's only view of the world.",
    full: [
      "Results land in the [[context window]], so large ones crowd out everything else. Trimming noisy output is one of the cheapest ways to improve [[AX]].",
    ],
    related: ["Tool call", "Tool", "Context window", "Environment"],
  },
  {
    name: "Tool",
    section: "tools",
    def: "A function the harness offers the agent — read a file, write a file, run a command, search. How an agent senses and acts.",
    full: [
      "The available tools define what an [[agent]] can do. More can be added through [[MCP]] or bundled into a [[skill]].",
    ],
    related: ["Tool call", "Tool result", "MCP", "Harness", "Environment"],
  },

  // ── Failure Modes ─────────────────────────────────────────
  {
    name: "Attention budget",
    section: "failure",
    def: "Each token has a limited amount of influence to spread over the rest of the context. The budget does not grow when the context does.",
    full: [
      "The more tokens compete, the thinner each [[attention relationship]] becomes. This is the mechanism behind [[attention degradation]].",
    ],
    related: ["Attention degradation", "Attention relationship", "Context window", "Token"],
  },
  {
    name: "Attention degradation",
    section: "failure",
    def: "As a session grows, each token's attention is split across more competitors and the important connections get weaker.",
    full: [
      "Symptoms: forgotten instructions, repeated mistakes, sloppy edits. The fixes are structural — [[clearing]], [[compaction]] or a [[handoff]] to a fresh [[session]].",
    ],
    related: ["Attention budget", "Smart zone", "Context window", "Clearing", "Compaction"],
  },
  {
    name: "Attention relationship",
    section: "failure",
    def: "The link between two tokens. Meaningful pairs sway each other strongly; unrelated pairs barely do. N tokens make roughly N² pairs.",
    full: [
      "That quadratic growth is why doubling the [[context window|context]] more than doubles the noise each [[attention budget]] must cut through.",
    ],
    related: ["Attention budget", "Attention degradation", "Token"],
  },
  {
    name: "Contextual knowledge",
    section: "failure",
    def: "Facts the agent can read straight from its context right now, rather than recall from training.",
    full: [
      "It beats [[parametric knowledge]] for anything recent or project-specific: hand over the docs and the agent stops guessing.",
    ],
    related: ["Parametric knowledge", "Context", "Hallucination", "Knowledge cutoff"],
  },
  {
    name: "Hallucination",
    section: "failure",
    def: "Output that is confidently wrong. Either it invents facts, or it drifts away from what is actually in its context.",
    full: [
      "Invented facts often fill gaps past the [[knowledge cutoff]]; drift often comes from [[attention degradation]]. [[Contextual knowledge]] and [[automated check|automated checks]] are the usual cures.",
    ],
    related: ["Knowledge cutoff", "Contextual knowledge", "Sycophancy", "Automated check"],
    usage: [
      "It used a function that doesn't exist in this library.",
      "Classic hallucination — that version is past its knowledge cutoff. Load the current docs into context first.",
    ],
  },
  {
    name: "Knowledge cutoff",
    section: "failure",
    def: "The date after which the model learned nothing. Libraries and APIs newer than that are traps unless you give it the docs.",
    full: [
      "Past the cutoff the model fills gaps with plausible guesses — a common source of [[hallucination]]. Loading current docs turns them into [[contextual knowledge]].",
    ],
    related: ["Parametric knowledge", "Training", "Hallucination", "Contextual knowledge"],
  },
  {
    name: "Parametric knowledge",
    section: "failure",
    def: "What the model knows from training, stored in its parameters. Broad, but frozen in time.",
    full: [
      "Great for general programming know-how; unreliable for your codebase or anything past the [[knowledge cutoff]]. Its counterpart is [[contextual knowledge]].",
    ],
    related: ["Parameters", "Training", "Contextual knowledge", "Knowledge cutoff"],
  },
  {
    name: "Smart zone",
    section: "failure",
    def: "The early stretch of a session when the agent is sharp. Push on too long and it slides into a dumb zone of forgetful, careless work.",
    full: [
      "Plan work in session-sized pieces — one [[ticket]] per [[session]] — and [[clearing|clear]] before you leave the smart zone.",
    ],
    related: ["Attention degradation", "Session", "Clearing", "Ticket"],
    aliases: ["Dumb zone"],
  },
  {
    name: "Sycophancy",
    section: "failure",
    def: "Output that is confidently agreeable. Training rewarded answers people liked, and people like being agreed with.",
    full: [
      "Watch for instant agreement right after you were wrong. Ask for criticism explicitly, try [[grilling]], or use an [[automated review]] with a different prompt.",
    ],
    related: ["Hallucination", "Training", "Automated review", "Grilling"],
  },

  // ── Handoffs ──────────────────────────────────────────────
  {
    name: "Autocompact",
    section: "handoffs",
    def: "Compaction the harness starts on its own when the context window is nearly full.",
    full: [
      "Convenient but unplanned: it fires mid-task and decides by itself what to keep. Many people prefer to [[clearing|clear]] or do a deliberate [[handoff]] first.",
    ],
    related: ["Compaction", "Context window", "Harness", "Handoff"],
  },
  {
    name: "Clearing",
    section: "handoffs",
    def: "Ending the current session and starting fresh, with an empty context window.",
    full: [
      "The cheapest way out of [[attention degradation]]. Anything worth keeping should be written to a [[handoff artifact]] before you clear.",
    ],
    related: ["Session", "Handoff", "Compaction", "Smart zone"],
  },
  {
    name: "Compaction",
    section: "handoffs",
    def: "A handoff done in place: the session's history is summarised and the summary seeds a new session. Detail is traded for room.",
    full: [
      "It frees space in the [[context window]], but the summary is a [[secondary source]] — fine for the gist, risky for exact details.",
    ],
    related: ["Autocompact", "Handoff", "Clearing", "Secondary source", "Session"],
  },
  {
    name: "Handoff artifact",
    section: "handoffs",
    def: "A document one session writes so another can pick up the work — notes, a plan, a ticket.",
    full: [
      "Unlike [[compaction]], it is visible, editable and lives in the [[filesystem]], so a person can review it before the next [[session]] reads it.",
    ],
    related: ["Handoff", "Ticket", "Spec", "Filesystem"],
  },
  {
    name: "Handoff",
    section: "handoffs",
    def: "Passing context from one session to another, one way only. The carrier can be a document, a compaction or something else.",
    full: [
      "Every handoff loses something. Good ones point back to [[primary source|primary sources]] rather than paraphrasing them.",
    ],
    related: ["Handoff artifact", "Compaction", "Clearing", "Session", "Subagent"],
  },
  {
    name: "Primary source",
    section: "handoffs",
    def: "The original material itself — code, transcripts, raw data. Complete and authoritative, but costly to load into context.",
    full: [
      "When precision matters, send the agent to the primary source with a [[context pointer]] instead of a summary.",
    ],
    related: ["Secondary source", "Context pointer", "Handoff"],
  },
  {
    name: "Secondary source",
    section: "handoffs",
    def: "A description of a primary source, written by a person or an agent. Cheap to read, but only as good as its author.",
    full: [
      "Summaries, [[compaction]] output and most [[handoff artifact|handoff artifacts]] are secondary sources.",
    ],
    related: ["Primary source", "Compaction", "Handoff artifact"],
  },
  {
    name: "Spec",
    section: "handoffs",
    def: "A document describing what to build and why, written before the work starts. Usually broken into tickets.",
    full: [
      "A spec captures the [[design concept]] in writing, so many [[session|sessions]] can share it.",
    ],
    related: ["Ticket", "Design concept", "Handoff artifact", "Grilling"],
  },
  {
    name: "Ticket",
    section: "handoffs",
    def: "A handoff artifact sized for one session of work. It can stand alone or belong to a spec, and can block or depend on other tickets.",
    full: [
      "Sizing tickets to fit the [[smart zone]] keeps each [[session]] sharp.",
    ],
    related: ["Spec", "Handoff artifact", "Session", "Software factory"],
  },

  // ── Memory and Steering ───────────────────────────────────
  {
    name: "AGENTS.md",
    section: "memory",
    def: "A file in the project that the harness loads into context at the start of each session — standing instructions for agents.",
    full: [
      "Keep it short and point outward: [[context pointer|context pointers]] to deeper docs beat pasting everything in.",
    ],
    related: ["System prompt", "Context pointer", "Memory system", "Home Repo", "Filesystem"],
  },
  {
    name: "Context pointer",
    section: "memory",
    def: "A reference in one document to another, so the agent can fetch it only when the task calls for it.",
    full: [
      "Pointers are what make [[progressive disclosure]] work: the [[context window]] stays lean until a detail is actually needed.",
    ],
    related: ["Progressive disclosure", "AGENTS.md", "Skill", "Primary source"],
  },
  {
    name: "Home Repo",
    section: "memory",
    def: "A single repository holding your skills, AGENTS.md and shared notes, pointing to your other projects. You start your agent from there.",
    full: [
      "It gives every [[session]] the same standing [[context]], whichever project you are touching.",
    ],
    related: ["AGENTS.md", "Skill", "Memory system"],
  },
  {
    name: "Memory system",
    section: "memory",
    def: "A way to make an agent remember across sessions by saving notes into the environment and loading them back next time.",
    full: [
      "The [[model]] stays [[stateless]]; memory is just files the [[harness]] reloads. Deciding what to save — and what to forget — is the hard part.",
    ],
    related: ["Stateful", "AGENTS.md", "Filesystem", "Home Repo"],
  },
  {
    name: "Progressive disclosure",
    section: "memory",
    def: "Showing the agent only what it needs now, with pointers to the rest. An idea borrowed from interface design.",
    full: [
      "It protects the [[attention budget]]: fewer tokens, each one more relevant.",
    ],
    related: ["Context pointer", "Skill", "Attention budget", "Context"],
  },
  {
    name: "Skill",
    section: "memory",
    def: "A packaged capability — instructions plus scripts — that stays out of context until a pointer pulls it in for the task.",
    full: [
      "Skills are [[progressive disclosure]] applied to know-how: the agent sees a one-line description and loads the whole skill only when it applies.",
    ],
    related: ["Progressive disclosure", "Context pointer", "Tool", "Home Repo"],
  },
  {
    name: "Subagent",
    section: "memory",
    def: "An agent launched by another agent through a tool call. It works in its own session and returns a single result.",
    full: [
      "Subagents keep messy exploration out of the parent's [[context window]] — only the conclusion comes back, as one [[tool result]].",
    ],
    related: ["Agent", "Tool call", "Tool result", "Handoff", "Session"],
  },

  // ── Patterns of Work ──────────────────────────────────────
  {
    name: "AFK",
    section: "patterns",
    def: "Away from keyboard: start a session and let the agent work unattended.",
    full: [
      "AFK work needs strong [[automated check|automated checks]], a [[sandbox]], and well-scoped [[ticket|tickets]].",
    ],
    related: ["Human-in-the-loop", "Sandbox", "Software factory", "Automated check"],
  },
  {
    name: "AX",
    section: "patterns",
    def: "Agent experience: how well a project is set up for an agent to succeed — fast checks, clear structure, room in the context.",
    full: [
      "The agent-facing twin of [[DX]]. Good AX shows up as fewer wrong turns and shorter [[session|sessions]].",
    ],
    related: ["DX", "Automated check", "Environment", "Context window"],
  },
  {
    name: "Automated check",
    section: "patterns",
    def: "A deterministic test that runs in the environment — unit tests, type checks, linters, builds, hooks. Pass or fail, no opinions.",
    full: [
      "Checks are the antidote to [[non-determinism]]: whatever the model writes, the check judges it the same way every time.",
    ],
    related: ["Automated review", "Non-determinism", "AX", "AFK"],
  },
  {
    name: "Automated review",
    section: "patterns",
    def: "One agent reviewing another agent's work, often with a different model or prompt. It forms an opinion, so results vary.",
    full: [
      "Useful for catching what [[automated check|checks]] cannot express, but it is still a judgement — not a substitute for [[human review]].",
    ],
    related: ["Automated check", "Human review", "Sycophancy", "Non-determinism"],
  },
  {
    name: "DX",
    section: "patterns",
    def: "Developer experience: how easy a codebase and its tools make it for people to do good work — docs, fast feedback, clear errors.",
    full: ["Most improvements to DX improve [[AX]] as well."],
    related: ["AX", "Automated check"],
  },
  {
    name: "Dark factory",
    section: "patterns",
    def: "A codebase, or part of one, where a software factory writes all the code and no person ever reads it.",
    full: [
      "The far end of [[vibe coding]] at scale — only as safe as its [[automated check|automated checks]].",
    ],
    related: ["Software factory", "Vibe coding", "Automated check", "Human review"],
  },
  {
    name: "Design concept",
    section: "patterns",
    def: "The shared idea of what is being built, held by both user and agent, separate from any document or code.",
    full: [
      "[[Grilling]] builds it, a [[spec]] records it, and [[prototyping]] tests it.",
    ],
    related: ["Grilling", "Spec", "Prototyping"],
  },
  {
    name: "Grilling",
    section: "patterns",
    def: "A way to shape a design concept: the agent questions you one decision at a time until the idea is clear.",
    full: [
      "It flips the usual flow — the agent asks, you answer — and surfaces gaps before any code exists.",
    ],
    related: ["Design concept", "Spec", "Human-in-the-loop"],
  },
  {
    name: "Human review",
    section: "patterns",
    def: "A person reading the code an agent produced and judging it. Reading the diff counts; reading the summary does not.",
    full: [
      "Summaries are [[secondary source|secondary sources]]; the diff is the [[primary source]].",
    ],
    related: ["Automated review", "Vibe coding", "Human-in-the-loop", "Primary source"],
  },
  {
    name: "Human-in-the-loop",
    section: "patterns",
    def: "Working alongside the agent during a session — steering, reviewing and correcting as it goes.",
    full: ["The opposite of [[AFK]]. Often shortened to HITL."],
    related: ["AFK", "Permission request", "Human review", "Grilling"],
    aliases: ["HITL"],
  },
  {
    name: "Prototyping",
    section: "patterns",
    def: "Getting the agent to build a quick, rough version when talking is not enough and you need something real to react to.",
    full: [
      "Prototypes are cheap now: use them to sharpen the [[design concept]], then throw them away.",
    ],
    related: ["Design concept", "Vibe coding", "Grilling"],
  },
  {
    name: "Software factory",
    section: "patterns",
    def: "A setup where events, not people, start agent sessions, so more work runs unattended and human time goes where it counts.",
    full: [
      "Triggers might be a new [[ticket]], a failed build or a schedule. Run fully unreviewed, it becomes a [[dark factory]].",
    ],
    related: ["AFK", "Dark factory", "Ticket", "Automated check"],
  },
  {
    name: "Vibe coding",
    section: "patterns",
    def: "Accepting the agent's code without reviewing it, treating the diff as a black box.",
    full: [
      "Fine for [[prototyping]] and throwaway scripts; risky anywhere the code must last without [[human review]].",
    ],
    related: ["Human review", "Prototyping", "Dark factory", "AFK"],
  },
];

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\.md$/, "-md")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const TERMS: Term[] = RAW.map((t, i) => ({ ...t, slug: slugify(t.name), index: i + 1 }));

const byLowerName = new Map<string, Term>();
for (const t of TERMS) {
  byLowerName.set(t.name.toLowerCase(), t);
  for (const a of t.aliases ?? []) byLowerName.set(a.toLowerCase(), t);
}
export const TERM_BY_SLUG = new Map(TERMS.map((t) => [t.slug, t]));

export function findTerm(nameOrSlug: string): Term | undefined {
  const k = nameOrSlug.trim().toLowerCase();
  return byLowerName.get(k) ?? TERM_BY_SLUG.get(k) ?? TERM_BY_SLUG.get(slugify(k));
}

export function sectionOf(id: SectionId): Section {
  return SECTIONS.find((s) => s.id === id)!;
}

/** Undirected neighbour list (related links in either direction). */
export function neighbours(t: Term): Term[] {
  const out = new Set<Term>();
  for (const r of t.related) {
    const o = findTerm(r);
    if (o && o !== t) out.add(o);
  }
  for (const o of TERMS) if (o !== t && o.related.some((r) => findTerm(r) === t)) out.add(o);
  return [...out];
}

export type Segment = { text: string; term?: Term };

/** Split text with [[links]] into plain and linked segments. */
export function parseLinks(text: string): Segment[] {
  const out: Segment[] = [];
  const re = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push({ text: text.slice(last, m.index) });
    const shown = m[1];
    const target = findTerm(m[2] ?? m[1]);
    out.push({ text: shown, term: target });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}

export function plainText(text: string): string {
  return parseLinks(text)
    .map((s) => s.text)
    .join("");
}
