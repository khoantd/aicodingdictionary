"use client";

import { useEffect, useState } from "react";
import s from "./agents.module.css";

/** A copyable code block. `{ORIGIN}` is replaced with this site's address once the page loads. */
export default function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [origin, setOrigin] = useState("https://your-site.example");
  const [copied, setCopied] = useState(false);
  useEffect(() => setOrigin(location.origin), []);
  const text = code.replaceAll("{ORIGIN}", origin);
  return (
    <div className={s.code}>
      <div className={s.codeHead}>
        <span>{label ?? ""}</span>
        <button
          type="button"
          className={s.copy}
          data-copied={copied}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(text);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            } catch {
              /* clipboard blocked */
            }
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>
        <code>{text}</code>
      </pre>
    </div>
  );
}
