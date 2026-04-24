import { InboxList } from "@/components/inbox/inbox-list";
import { getDemoInboxItems, getDemoTasks } from "@/lib/demo-data";

export default async function InboxPage() {
  const items = getDemoInboxItems();
  const tasks = getDemoTasks();
  const pendingCount = items.filter((item) => item.requiresResponse).length;

  return (
    <div className="px-5 py-5 md:px-8 md:py-8 xl:px-10" data-testid="inbox-page">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="rounded-[2rem] border border-[var(--panel-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,244,234,0.98))] p-6 text-[var(--foreground)] shadow-[0_24px_80px_var(--panel-shadow)]">
          <p className="m-0 font-[Trebuchet_MS,sans-serif] text-xs font-bold uppercase tracking-[0.22em] text-[#8a3a22]">
            Secondary Workspace
          </p>
          <h1 className="mt-3 text-5xl text-[#201913]">Inbox</h1>
          <p className="m-0 mt-4 max-w-3xl text-lg leading-8 text-[#4a3c32]">
            Triage the conversations that need a response, spot threads that already have
            work attached, and keep the backlog calm.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-[rgba(162,77,47,0.18)] px-3 py-1 text-[#6f2f1c]">
              {pendingCount} waiting for you
            </span>
            <span className="rounded-full bg-[rgba(32,25,19,0.08)] px-3 py-1 text-[#5a473a]">
              {tasks.length} linked task lanes
            </span>
          </div>
        </section>

        <InboxList items={items} tasks={tasks} />
      </div>
    </div>
  );
}
