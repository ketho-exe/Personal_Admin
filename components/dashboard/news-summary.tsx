import type { NewsItem } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";

type NewsSummaryProps = Readonly<{
  items: NewsItem[];
}>;

const publishedFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit"
});

export function NewsSummary({ items }: NewsSummaryProps) {
  return (
    <Card
      aria-labelledby="today-news-title"
      as="section"
      className="rounded-[1.75rem]"
      padding="lg"
      tone="panel"
    >
      <SectionHeading
        description="A tighter read on policy and finance changes that could affect the next decisions."
        eyebrow="News Digest"
        id="today-news-title"
        title="Signals worth keeping in view"
      />

      <div className="mt-6 grid gap-4">
        {items.map((item) => (
          <Card as="article" key={item.id}>
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill tone="accent">
                {item.category.replace("-", " ")}
              </StatusPill>
              <span className="text-xs uppercase tracking-[0.08em] text-[var(--foreground)]">
                {item.sourceName} • {publishedFormatter.format(new Date(item.publishedAt))}
              </span>
            </div>
            <h3 className="mt-4 text-2xl leading-8">{item.title}</h3>
            <p className="m-0 mt-2 text-base leading-7 text-[var(--muted-strong)]">{item.summary}</p>
          </Card>
        ))}
      </div>
    </Card>
  );
}
