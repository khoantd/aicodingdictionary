import { WHATS_NEW } from "@/data/whatsNew";
import s from "./WhatsNew.module.css";

export default function WhatsNew({ limit = 3 }: { limit?: number }) {
  const items = WHATS_NEW.slice(0, limit);
  if (!items.length) return null;
  return (
    <section className={s.wrap} aria-labelledby="whats-new-heading">
      <h2 className={s.title} id="whats-new-heading">
        What&apos;s new
      </h2>
      <ul className={s.list}>
        {items.map((item) => (
          <li key={`${item.date}-${item.title}`} className={s.item}>
            <time className={s.date} dateTime={item.date}>
              {item.date}
            </time>
            <div className={s.body}>
              <a className={s.link} href={item.href}>
                {item.title}
              </a>
              <p className={s.blurb}>{item.blurb}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
