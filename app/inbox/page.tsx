import { InboxList } from "@/components/inbox/inbox-list";
import { getDemoInboxItems, getDemoTasks } from "@/lib/demo-data";

export default async function InboxPage() {
  const items = getDemoInboxItems();
  const tasks = getDemoTasks();
  const pendingCount = items.filter((item) => item.requiresResponse).length;

  return (
    <div className="px-5 py-5 md:px-8 md:py-8 xl:px-10" data-testid="inbox-page">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="rounded-[2rem] border border-[var(--panel-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.66),rgba(255,244,234,0.88))] p-6 shadow-[0_24px_80px_var(--panel-shadow)]">
          <p className="m-0 font-[Trebuchet_MS,sans-serif] text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
            Secondary Workspace
          </p>
          <h1 className="mt-3 text-5xl">Inbox</h1>
          <p className="m-0 mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            Triage the conversations that need a response, spot threads that already have
            work attached, and keep the backlog calm.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-[rgba(162,77,47,0.12)] px-3 py-1 text-[var(--accent-strong)]">
              {pendingCount} waiting for you
            </span>
            <span className="rounded-full bg-[rgba(32,25,19,0.06)] px-3 py-1 text-[var(--muted)]">
              {tasks.length} linked task lanes
            </span>
          </div>
        </section>

        <InboxList items={items} tasks={tasks} />
      </div>
    </div>
  );
}
