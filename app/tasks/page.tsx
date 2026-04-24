import { TasksList } from "@/components/tasks/tasks-list";
import { getDemoTasks } from "@/lib/demo-data";

export default async function TasksPage() {
  const tasks = getDemoTasks();
  const inProgressCount = tasks.filter((task) => task.status === "in_progress").length;

  return (
    <div className="px-5 py-5 md:px-8 md:py-8 xl:px-10" data-testid="tasks-page">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="rounded-[2rem] border border-[var(--panel-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,244,234,0.98))] p-6 text-[var(--foreground)] shadow-[0_24px_80px_var(--panel-shadow)]">
          <p className="m-0 font-[Trebuchet_MS,sans-serif] text-xs font-bold uppercase tracking-[0.22em] text-[#8a3a22]">
            Secondary Workspace
          </p>
          <h1 className="mt-3 text-5xl text-[#201913]">Tasks</h1>
          <p className="m-0 mt-4 max-w-3xl text-lg leading-8 text-[#4a3c32]">
            Sequence the admin work already in motion, protect enough time for urgent
            follow-through, and keep manual chores visible.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-[rgba(162,77,47,0.18)] px-3 py-1 text-[#6f2f1c]">
              {tasks.length} open tasks
            </span>
            <span className="rounded-full bg-[rgba(32,25,19,0.08)] px-3 py-1 text-[#5a473a]">
              {inProgressCount} in progress
            </span>
          </div>
        </section>

        <TasksList tasks={tasks} />
      </div>
    </div>
  );
}
