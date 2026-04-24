import type { InboxItem, TaskItem } from "@/lib/types";

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
      return "bg-[rgba(162,77,47,0.14)] text-[var(--accent-strong)]";
    case "high":
      return "bg-[rgba(193,138,44,0.16)] text-[rgb(117,78,14)]";
    default:
      return "bg-[rgba(32,25,19,0.08)] text-[var(--foreground)]";
  }
}

function getStatusLabel(status: InboxItem["status"]) {
  return status === "new" ? "Needs review" : "Read";
}

export function InboxList({ items, tasks }: InboxListProps) {
  return (
    <section
      aria-labelledby="inbox-list-title"
      className="rounded-[1.75rem] border border-[var(--panel-border)] bg-[var(--panel)] p-6 shadow-[0_20px_60px_var(--panel-shadow)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="m-0 font-[Trebuchet_MS,sans-serif] text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Inbox Queue
          </p>
          <h2 className="mt-3 text-3xl" id="inbox-list-title">
            Filter by status
          </h2>
        </div>
        <p className="m-0 max-w-md text-sm leading-6 text-[var(--muted)]">
          Review what is new, what needs a reply, and which messages already have a
          follow-up task attached.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-sm">
        <span className="rounded-full bg-[rgba(162,77,47,0.12)] px-3 py-1 text-[var(--accent-strong)]">
          All items
        </span>
        <span className="rounded-full bg-[rgba(32,25,19,0.06)] px-3 py-1 text-[var(--muted)]">
          Awaiting response
        </span>
        <span className="rounded-full bg-[rgba(32,25,19,0.06)] px-3 py-1 text-[var(--muted)]">
          Read only
        </span>
      </div>

      <div className="mt-6 grid gap-4">
        {items.map((item) => {
          const linkedTask = tasks.find((task) => task.linkedRecordId === item.id);

          return (
            <article
              className="grid gap-4 rounded-[1.5rem] border border-[var(--panel-border)] bg-[rgba(255,255,255,0.56)] p-5 lg:grid-cols-[minmax(0,1fr)_16rem]"
              key={item.id}
            >
              <div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${getPriorityClasses(item.priority)}`}
                  >
                    {item.priority}
                  </span>
                  <span className="rounded-full bg-[rgba(32,25,19,0.06)] px-3 py-1 text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
                    {getStatusLabel(item.status)}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl leading-8">{item.title}</h3>
                <p className="m-0 mt-2 text-base leading-7 text-[var(--muted)]">{item.summary}</p>
                <p className="m-0 mt-4 text-sm text-[var(--muted)]">
                  {item.sender} • {receivedFormatter.format(new Date(item.receivedAt))}
                </p>
              </div>

              <div className="grid gap-3 rounded-[1.25rem] bg-[rgba(255,244,234,0.8)] p-4">
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
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
