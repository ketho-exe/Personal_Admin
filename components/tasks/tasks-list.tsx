import type { TaskItem } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";

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
      return "warning";
    case "blocked":
      return "attention";
    case "done":
      return "success";
    default:
      return "neutral";
  }
}

export function TasksList({ tasks }: TasksListProps) {
  const activeTasks = tasks.filter((task) => task.status !== "done").length;

  return (
    <Card
      aria-labelledby="tasks-list-title"
      as="section"
      className="rounded-[1.75rem]"
      padding="lg"
      tone="panel"
    >
      <SectionHeading
        action={<p className="m-0 text-sm text-[var(--muted)]">{activeTasks} active blocks in motion</p>}
        eyebrow="Tasks Workspace"
        id="tasks-list-title"
        title="Open tasks"
      />

      <div className="mt-6 grid gap-4">
        {tasks.map((task) => (
          <Card as="article" className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_14rem]" key={task.id}>
            <div>
              <div className="flex flex-wrap gap-2">
                <StatusPill tone={getStatusTone(task.status)}>
                  {getStatusLabel(task.status)}
                </StatusPill>
                <StatusPill tone="neutral">
                  {task.category}
                </StatusPill>
              </div>
              <h3 className="mt-4 text-2xl leading-8">{task.title}</h3>
              <p className="m-0 mt-2 text-base leading-7 text-[var(--muted)]">{task.summary}</p>
            </div>

            <Card className="grid gap-3 rounded-[1.25rem] p-4" tone="warm">
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
            </Card>
          </Card>
        ))}
      </div>
    </Card>
  );
}
