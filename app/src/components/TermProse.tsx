import type { ReactNode } from "react";
import { parseLinks, type Term } from "@/data/terms";

/** Renders a definition paragraph with term links as anchors or custom nodes. */
export default function TermProse({
  text,
  renderTerm,
}: {
  text: string;
  renderTerm: (term: Term, text: string) => ReactNode;
}) {
  return (
    <>
      {parseLinks(text).map((seg, i) =>
        seg.term ? <span key={i}>{renderTerm(seg.term, seg.text)}</span> : <span key={i}>{seg.text}</span>,
      )}
    </>
  );
}
