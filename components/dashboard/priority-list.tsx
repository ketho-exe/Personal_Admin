import type { AdminItemRecord, TaskItem } from "@/lib/types";

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
      return "bg-[rgba(162,77,47,0.14)] text-[var(--accent-strong)]";
    case "high":
      return "bg-[rgba(193,138,44,0.16)] text-[rgb(117,78,14)]";
    default:
      return "bg-[rgba(32,25,19,0.08)] text-[var(--foreground)]";
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
    <section className="rounded-[1.75rem] border border-[var(--panel-border)] bg-[var(--panel)] p-6 shadow-[0_20px_60px_var(--panel-shadow)]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="m-0 font-[Trebuchet_MS,sans-serif] text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Priorities
          </p>
          <h2 className="mt-3 text-3xl">What deserves attention first</h2>
        </div>
        <p className="m-0 max-w-md text-sm leading-6 text-[var(--muted)]">
          The queue blends urgent admin signals with the task context needed to move them
          forward.
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        {items.map((item, index) => {
          const linkedTask =
            tasks.find((task) => task.linkedRecordId === item.id) ?? tasks[index] ?? null;

          return (
            <article
              className="grid gap-4 rounded-[1.5rem] border border-[var(--panel-border)] bg-[rgba(255,255,255,0.56)] p-5 lg:grid-cols-[minmax(0,1fr)_15rem]"
              key={item.id}
            >
              <div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${getPriorityClasses(item.priority)}`}
                  >
                    {getPriorityLabel(item.priority)}
                  </span>
                  <span className="rounded-full bg-[rgba(32,25,19,0.06)] px-3 py-1 text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
                    {getSourceLabel(item.source)}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl leading-8">{item.title}</h3>
                <p className="m-0 mt-2 text-base leading-7 text-[var(--muted)]">{item.summary}</p>
              </div>

              <div className="grid gap-3 rounded-[1.25rem] bg-[rgba(255,244,234,0.8)] p-4">
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
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
