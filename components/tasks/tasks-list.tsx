import type { TaskItem } from "@/lib/types";

type TasksListProps = Readonly<{
  tasks: TaskItem[];
}>;

const dueDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short"
});

function getStatusLabel(status: TaskItem["status"]) {
  switch (status) {
    case "in_progress":
      return "In progress";
    case "todo":
      return "Ready next";
    case "blocked":
      return "Blocked";
    case "done":
      return "Done";
    default:
      return status;
  }
}

function getStatusTone(status: TaskItem["status"]) {
  switch (status) {
    case "in_progress":
      return "bg-[rgba(193,138,44,0.16)] text-[rgb(117,78,14)]";
    case "blocked":
      return "bg-[rgba(162,77,47,0.14)] text-[var(--accent-strong)]";
    case "done":
      return "bg-[rgba(77,132,79,0.12)] text-[rgb(52,92,54)]";
    default:
      return "bg-[rgba(32,25,19,0.08)] text-[var(--foreground)]";
  }
}

export function TasksList({ tasks }: TasksListProps) {
  const activeTasks = tasks.filter((task) => task.status !== "done").length;

  return (
    <section
      aria-labelledby="tasks-list-title"
      className="rounded-[1.75rem] border border-[var(--panel-border)] bg-[var(--panel)] p-6 shadow-[0_20px_60px_var(--panel-shadow)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="m-0 font-[Trebuchet_MS,sans-serif] text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Tasks Workspace
          </p>
          <h2 className="mt-3 text-3xl" id="tasks-list-title">
            Open tasks
          </h2>
        </div>
        <p className="m-0 text-sm text-[var(--muted)]">{activeTasks} active blocks in motion</p>
      </div>

      <div className="mt-6 grid gap-4">
        {tasks.map((task) => (
          <article
            className="grid gap-4 rounded-[1.5rem] border border-[var(--panel-border)] bg-[rgba(255,255,255,0.56)] p-5 lg:grid-cols-[minmax(0,1fr)_14rem]"
            key={task.id}
          >
            <div>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${getStatusTone(task.status)}`}
                >
                  {getStatusLabel(task.status)}
                </span>
                <span className="rounded-full bg-[rgba(32,25,19,0.06)] px-3 py-1 text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
                  {task.category}
                </span>
              </div>
              <h3 className="mt-4 text-2xl leading-8">{task.title}</h3>
              <p className="m-0 mt-2 text-base leading-7 text-[var(--muted)]">{task.summary}</p>
            </div>

            <div className="grid gap-3 rounded-[1.25rem] bg-[rgba(255,244,234,0.8)] p-4">
              <div>
                <p className="m-0 text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                  Estimate
                </p>
                <p className="m-0 mt-2 text-lg">{task.estimateMinutes} min</p>
              </div>
              <div>
                <p className="m-0 text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                  Due
                </p>
                <p className="m-0 mt-2 text-sm leading-6 text-[var(--foreground)]">
                  {task.dueDate
                    ? dueDateFormatter.format(new Date(task.dueDate))
                    : "No deadline yet"}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
