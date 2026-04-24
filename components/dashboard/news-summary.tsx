import type { NewsItem } from "@/lib/types";

type NewsSummaryProps = Readonly<{
  items: NewsItem[];
}>;

const publishedFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit"
});

export function NewsSummary({ items }: NewsSummaryProps) {
  return (
    <section
      aria-labelledby="today-news-title"
      className="rounded-[1.75rem] border border-[var(--panel-border)] bg-[var(--panel)] p-6 shadow-[0_20px_60px_var(--panel-shadow)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="m-0 font-[Trebuchet_MS,sans-serif] text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            News Digest
          </p>
          <h2 className="mt-3 text-3xl" id="today-news-title">
            Signals worth keeping in view
          </h2>
        </div>
        <p className="m-0 max-w-md text-sm leading-6 text-[var(--muted)]">
          A tighter read on policy and finance changes that could affect the next decisions.
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        {items.map((item) => (
          <article
            className="rounded-[1.5rem] border border-[var(--panel-border)] bg-[rgba(255,255,255,0.56)] p-5"
            key={item.id}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[rgba(162,77,47,0.12)] px-3 py-1 text-xs uppercase tracking-[0.08em] text-[var(--accent-strong)]">
                {item.category.replace("-", " ")}
              </span>
              <span className="text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
                {item.sourceName} • {publishedFormatter.format(new Date(item.publishedAt))}
              </span>
            </div>
            <h3 className="mt-4 text-2xl leading-8">{item.title}</h3>
            <p className="m-0 mt-2 text-base leading-7 text-[var(--muted)]">{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
