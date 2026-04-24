import type { InboxItem, TaskItem } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";

type InboxListProps = Readonly<{
  items: InboxItem[];
  tasks: TaskItem[];
}>;

const receivedFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  month: "short"
});

function getPriorityClasses(priority: InboxItem["priority"]) {
  switch (priority) {
    case "urgent":
      return "attention";
    case "high":
      return "warning";
    default:
      return "neutral";
  }
}

function getStatusLabel(status: InboxItem["status"]) {
  switch (status) {
    case "new":
      return "Needs review";
    case "read":
      return "Read";
    case "dismissed":
      return "Dismissed";
    case "archived":
      return "Archived";
    default:
      return status;
  }
}

export function InboxList({ items, tasks }: InboxListProps) {
  const awaitingResponseCount = items.filter((item) => item.requiresResponse).length;
  const readCount = items.filter((item) => item.status === "read").length;
  const clearedCount = items.filter(
    (item) => item.status === "dismissed" || item.status === "archived"
  ).length;

  return (
    <Card
      aria-labelledby="inbox-list-title"
      as="section"
      className="rounded-[1.75rem]"
      padding="lg"
      tone="panel"
    >
      <SectionHeading
        description="Review what is new, what needs a reply, and which messages already have a follow-up task attached."
        eyebrow="Inbox Queue"
        id="inbox-list-title"
        title="Queue at a glance"
      />

      <div className="mt-5 flex flex-wrap gap-2 text-sm">
        <StatusPill tone="accent">{`${items.length} total items`}</StatusPill>
        <StatusPill tone="neutral">{`${awaitingResponseCount} awaiting response`}</StatusPill>
        <StatusPill tone="neutral">{`${readCount} read`}</StatusPill>
        <StatusPill tone="neutral">{`${clearedCount} cleared`}</StatusPill>
      </div>

      <div className="mt-6 grid gap-4">
        {items.map((item) => {
          const linkedTask = tasks.find((task) => task.linkedRecordId === item.id);

          return (
            <Card as="article" className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]" key={item.id}>
              <div>
                <div className="flex flex-wrap gap-2">
                  <StatusPill tone={getPriorityClasses(item.priority)}>
                    {item.priority}
                  </StatusPill>
                  <StatusPill tone={item.status === "new" ? "accent" : "neutral"}>
                    {getStatusLabel(item.status)}
                  </StatusPill>
                </div>
                <h3 className="mt-4 text-2xl leading-8">{item.title}</h3>
                <p className="m-0 mt-2 text-base leading-7 text-[var(--muted-strong)]">{item.summary}</p>
                <p className="m-0 mt-4 text-sm text-[var(--muted-strong)]">
                  {item.sender} • {receivedFormatter.format(new Date(item.receivedAt))}
                </p>
              </div>

              <Card className="grid gap-3 rounded-[1.25rem] p-4" tone="warm">
                <div>
                  <p className="m-0 text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                    Response lane
                  </p>
                  <p className="m-0 mt-2 text-lg">
                    {item.requiresResponse ? "Reply needed" : "No reply required"}
                  </p>
                </div>
                <div>
                  <p className="m-0 text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                    Linked task
                  </p>
                  <p className="m-0 mt-2 text-sm leading-6 text-[var(--foreground)]">
                    {linkedTask?.title ?? "Capture a next step if this needs work later."}
                  </p>
                </div>
              </Card>
            </Card>
          );
        })}
      </div>
    </Card>
  );
}
