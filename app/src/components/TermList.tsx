import { SECTIONS, SITE, TERMS } from "@/data/terms";

/** Hidden, screen-reader and agent friendly list of every term (same role as the original's sr-only article). */
export default function TermList() {
  return (
    <article className="sr-only">
      <h1>{SITE.name}</h1>
      <p>
        The vocabulary of AI coding, in plain English. Agents can read it all at <a href="/llms.txt">/llms.txt</a> or{" "}
        <a href="/api/terms.json">/api/terms.json</a>.
      </p>
      {SECTIONS.map((s) => (
        <section key={s.id}>
          <h2>{s.name}</h2>
          <dl>
            {TERMS.filter((t) => t.section === s.id).map((t) => (
              <div key={t.slug}>
                <dt>
                  <a href={`/terms/${t.slug}/`}>{t.name}</a>
                </dt>
                <dd>{t.def}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
      <p>{SECTIONS.length} sections describing how agentic coding works.</p>
    </article>
  );
}
