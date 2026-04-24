import type { DashboardBriefing, DashboardStat, InboxItem, TaskItem } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";

type BriefingHeroProps = Readonly<{
  briefing: DashboardBriefing;
  inboxPreview: InboxItem[];
  stats: DashboardStat[];
  tasks: TaskItem[];
}>;

const generatedAtFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit"
});

function getTaskStatusLabel(status: TaskItem["status"]) {
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

export function BriefingHero({
  briefing,
  inboxPreview,
  stats,
  tasks
}: BriefingHeroProps) {
  const leadInboxItem = inboxPreview.find((item) => item.requiresResponse) ?? inboxPreview[0];
  const leadTask = tasks.find((task) => task.status !== "done") ?? tasks[0];

  return (
    <section
      aria-labelledby="today-briefing-title"
      className="relative overflow-hidden rounded-[2rem] border border-[var(--panel-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(255,244,234,0.96))] p-6 shadow-[0_24px_80px_var(--panel-shadow)] backdrop-blur md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(162,77,47,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,214,171,0.3),transparent_32%)]" />
      <div className="relative grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(18rem,0.95fr)]">
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="m-0 font-[Trebuchet_MS,sans-serif] text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent-strong)]">
              Morning Briefing
            </p>
            <div className="space-y-3">
              <h2 className="m-0 text-lg tracking-[0.08em] text-[var(--accent-strong)]">
                Personal Admin Dashboard
              </h2>
              <h1
                className="m-0 max-w-3xl text-4xl leading-[0.95] md:text-6xl"
                id="today-briefing-title"
              >
                Today
              </h1>
              <p className="m-0 max-w-3xl text-lg leading-8 text-[var(--foreground)] md:text-xl">
                {briefing.title}
              </p>
              <p className="m-0 max-w-3xl text-base leading-7 text-[var(--muted-strong)]">
                {briefing.summary}
              </p>
            </div>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const toneClass =
                stat.tone === "attention"
                  ? "border-[rgba(162,77,47,0.22)] bg-[rgba(162,77,47,0.14)] text-[var(--foreground)]"
                  : stat.tone === "good"
                    ? "border-[rgba(77,132,79,0.2)] bg-[rgba(77,132,79,0.14)] text-[rgb(43,79,46)]"
                    : "border-[var(--panel-border)] bg-[rgba(255,255,255,0.5)] text-[var(--foreground)]";

              return (
                <div
                  className={`rounded-[1.35rem] border px-4 py-4 ${toneClass}`}
                  key={stat.id}
                >
                  <dt className="text-sm text-[var(--foreground)]">{stat.label}</dt>
                  <dd className="m-0 pt-2 text-2xl">{stat.value}</dd>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="grid gap-4 self-start">
          <Card as="section" tone="dark">
            <p className="m-0 text-xs uppercase tracking-[0.18em] text-[rgba(244,239,230,0.72)]">
              First move
            </p>
            <p className="mt-3 text-xl leading-7">{leadTask?.title}</p>
            <p className="m-0 mt-2 text-sm leading-6 text-[rgba(244,239,230,0.88)]">
              {leadTask?.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-[rgba(244,239,230,0.92)]">
              <span className="rounded-full bg-[rgba(255,255,255,0.12)] px-3 py-1">
                {leadTask ? `${leadTask.estimateMinutes} min` : "Quick win"}
              </span>
              <span className="rounded-full bg-[rgba(255,255,255,0.12)] px-3 py-1">
                {leadTask ? getTaskStatusLabel(leadTask.status) : "Ready"}
              </span>
            </div>
          </Card>

          <Card as="section" tone="warm">
            <p className="m-0 text-xs uppercase tracking-[0.18em] text-[var(--accent-strong)]">
              Inbox pulse
            </p>
            <p className="mt-3 text-lg leading-7 text-[var(--foreground)]">
              {leadInboxItem?.sender} is still waiting on a response.
            </p>
            <p className="m-0 mt-2 text-sm leading-6 text-[var(--muted-strong)]">
              {leadInboxItem?.summary}
            </p>
            <p className="m-0 mt-4 text-sm text-[var(--muted-strong)]">
              Briefing generated at{" "}
              <span className="text-[var(--foreground)]">
                {generatedAtFormatter.format(new Date(briefing.generatedAt))}
              </span>
            </p>
            {leadInboxItem?.requiresResponse ? (
              <div className="mt-4">
                <StatusPill tone="attention">Reply pending</StatusPill>
              </div>
            ) : null}
          </Card>
        </div>
      </div>
    </section>
  );
}
