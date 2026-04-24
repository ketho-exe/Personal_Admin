import type { AdminItemRecord, TaskItem } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";

type PriorityListProps = Readonly<{
  items: AdminItemRecord[];
  tasks: TaskItem[];
}>;

const dueDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short"
});

function getPriorityLabel(priority: AdminItemRecord["priority"]) {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

function getPriorityClasses(priority: AdminItemRecord["priority"]) {
  switch (priority) {
    case "urgent":
      return "attention";
    case "high":
      return "warning";
    default:
      return "neutral";
  }
}

function getSourceLabel(source: AdminItemRecord["source"]) {
  switch (source) {
    case "email":
      return "Inbox";
    case "system":
      return "System";
    case "manual":
      return "Manual";
    case "news":
      return "News";
    default:
      return source;
  }
}

export function PriorityList({ items, tasks }: PriorityListProps) {
  return (
    <Card
      aria-labelledby="today-priorities-title"
      as="section"
      className="rounded-[1.75rem]"
      padding="lg"
      tone="panel"
    >
      <SectionHeading
        description="The queue blends urgent admin signals with the task context needed to move them forward."
        eyebrow="Priorities"
        id="today-priorities-title"
        title="What deserves attention first"
      />

      <div className="mt-6 grid gap-4">
        {items.map((item, index) => {
          const linkedTask =
            tasks.find((task) => task.linkedRecordId === item.id) ?? tasks[index] ?? null;

          return (
            <Card as="article" className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_15rem]" key={item.id}>
              <div>
                <div className="flex flex-wrap gap-2">
                  <StatusPill tone={getPriorityClasses(item.priority)}>
                    {getPriorityLabel(item.priority)}
                  </StatusPill>
                  <StatusPill tone="accent">
                    {getSourceLabel(item.source)}
                  </StatusPill>
                </div>
                <h3 className="mt-4 text-2xl leading-8">{item.title}</h3>
                <p className="m-0 mt-2 text-base leading-7 text-[var(--muted)]">{item.summary}</p>
              </div>

              <Card className="grid gap-3 rounded-[1.25rem] p-4" tone="warm">
                <div>
                  <p className="m-0 text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                    Due
                  </p>
                  <p className="m-0 mt-2 text-lg">
                    {item.dueDate ? dueDateFormatter.format(new Date(item.dueDate)) : "No deadline"}
                  </p>
                </div>
                <div>
                  <p className="m-0 text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                    Suggested action
                  </p>
                  <p className="m-0 mt-2 text-sm leading-6 text-[var(--foreground)]">
                    {linkedTask?.title ?? "Review details and decide next step"}
                  </p>
                  <p className="m-0 mt-1 text-sm text-[var(--muted)]">
                    {linkedTask ? `${linkedTask.estimateMinutes} min block` : "Quick review"}
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
