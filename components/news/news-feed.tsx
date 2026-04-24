import type { NewsItem } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";

type NewsFeedProps = Readonly<{
  items: NewsItem[];
}>;

const publishedFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  month: "short"
});

function getPriorityClasses(priority: NewsItem["priority"]) {
  switch (priority) {
    case "high":
    case "urgent":
      return "attention";
    default:
      return "neutral";
  }
}

export function NewsFeed({ items }: NewsFeedProps) {
  return (
    <Card
      aria-labelledby="news-feed-title"
      as="section"
      className="rounded-[1.75rem]"
      padding="lg"
      tone="panel"
    >
      <SectionHeading
        description="A compact read on policy, markets, and household shifts that may change the next admin decision."
        eyebrow="News Workspace"
        id="news-feed-title"
        title="Signals worth keeping in view"
      />

      <div className="mt-6 grid gap-4">
        {items.map((item) => (
          <Card as="article" key={item.id}>
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill tone={getPriorityClasses(item.priority)}>
                {item.priority}
              </StatusPill>
              <StatusPill tone="neutral">
                {item.category.replace("-", " ")}
              </StatusPill>
              <span className="text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
                {item.sourceName} • {publishedFormatter.format(new Date(item.publishedAt))}
              </span>
            </div>
            <h3 className="mt-4 text-2xl leading-8">{item.title}</h3>
            <p className="m-0 mt-2 text-base leading-7 text-[var(--muted)]">{item.summary}</p>
          </Card>
        ))}
      </div>
    </Card>
  );
}
