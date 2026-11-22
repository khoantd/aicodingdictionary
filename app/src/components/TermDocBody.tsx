import type { ReactNode } from "react";
import { neighbours, type Term } from "@/data/terms";
import TermProse from "@/components/TermProse";

export type TermDocClasses = {
  aliases?: string;
  def: string;
  label: string;
  prose: string;
  bubbles?: string;
  bubbleQ?: string;
  bubbleA?: string;
  tags: string;
  tag: string;
};

type Props = {
  term: Term;
  classes: TermDocClasses;
  /** Which full-definition paragraphs to show (default: all). */
  paragraphs?: string[];
  renderTermLink: (term: Term, text: string) => ReactNode;
  renderRelated: (term: Term) => ReactNode;
  /** Optional control after the prose (e.g. “Read more”). */
  afterProse?: ReactNode;
};

/** Shared term content: aliases, short def, full prose, usage, related tags. */
export default function TermDocBody({
  term,
  classes,
  paragraphs,
  renderTermLink,
  renderRelated,
  afterProse,
}: Props) {
  const full = paragraphs ?? term.full;
  const links = neighbours(term);
  return (
    <>
      {term.aliases?.length ? (
        <p className={classes.aliases}>Also: {term.aliases.join(", ")}</p>
      ) : null}
      <p className={classes.def}>{term.def}</p>

      <h2 className={classes.label}>Full definition</h2>
      <div className={classes.prose}>
        {full.map((p, i) => (
          <p key={i}>
            <TermProse text={p} renderTerm={renderTermLink} />
          </p>
        ))}
        {afterProse}
      </div>

      {term.usage && classes.bubbles ? (
        <>
          <h2 className={classes.label}>Heard in the wild</h2>
          <ul className={classes.bubbles}>
            <li className={classes.bubbleQ}>{term.usage[0]}</li>
            <li className={classes.bubbleA}>{term.usage[1]}</li>
          </ul>
        </>
      ) : null}

      <h2 className={classes.label}>Connects to</h2>
      <ul className={classes.tags}>
        {links.map((o) => (
          <li key={o.slug}>{renderRelated(o)}</li>
        ))}
      </ul>
    </>
  );
}
