import s from "./Fallback.module.css";

export function ExtIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 5h5v5" />
      <path d="M19 5l-8.5 8.5" />
      <path d="M19 13.5V18a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V6.5A1.5 1.5 0 0 1 6 5h4.5" />
    </svg>
  );
}

/** Shown when the browser can't draw the 3D map (no WebGL). */
export default function Fallback() {
  return (
    <main className={s.root} id="main-content">
      <div className={s.lockup}>
        <p className={s.credit}>An open glossary</p>
        <h1 className={s.title}>AI Coding Dictionary</h1>
        <span className={s.rule} />
      </div>
      <div className={s.notice}>
        <p className={s.message}>
          The 3D map needs WebGL, which isn&apos;t available in this browser. Every term is also a plain page, and
          agents can read it all as Markdown.
        </p>
        <div className={s.actions}>
          <a href="/terms/" className={s.primary}>
            Browse all terms
            <ExtIcon className={s.extIcon} />
          </a>
          <a href="/llms.txt" className={s.secondary}>
            Markdown for agents
            <ExtIcon className={s.extIcon} />
          </a>
        </div>
      </div>
    </main>
  );
}
