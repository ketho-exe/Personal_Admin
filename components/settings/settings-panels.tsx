import type { BillRecord, InboxItem, NewsItem, TaskItem } from "@/lib/types";

type SettingsPanelsProps = Readonly<{
  bills: BillRecord[];
  inboxItems: InboxItem[];
  newsItems: NewsItem[];
  tasks: TaskItem[];
}>;

export function SettingsPanels({
  bills,
  inboxItems,
  newsItems,
  tasks
}: SettingsPanelsProps) {
  const panels = [
    {
      id: "settings-triage",
      eyebrow: "Workflow defaults",
      title: "Daily review posture",
      body: `${inboxItems.filter((item) => item.requiresResponse).length} inbox threads and ${tasks.length} active tasks currently shape the morning run-through.`
    },
    {
      id: "settings-billing",
      eyebrow: "Billing guardrails",
      title: "Autopay and review",
      body: `${bills.filter((bill) => bill.autopay).length} of ${bills.length} upcoming bills are protected by autopay, with manual review left for the remaining renewals.`
    },
    {
      id: "settings-news",
      eyebrow: "Digest cadence",
      title: "News priorities",
      body: `${newsItems.length} tracked signals are tuned toward personal finance and policy changes that could alter near-term household choices.`
    }
  ];

  return (
    <section
      aria-labelledby="settings-panels-title"
      className="rounded-[1.75rem] border border-[var(--panel-border)] bg-[var(--panel)] p-6 shadow-[0_20px_60px_var(--panel-shadow)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="m-0 font-[Trebuchet_MS,sans-serif] text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Settings Workspace
          </p>
          <h2 className="mt-3 text-3xl" id="settings-panels-title">
            Preferences and integrations
          </h2>
        </div>
        <p className="m-0 max-w-md text-sm leading-6 text-[var(--muted)]">
          Static placeholders for the controls that will eventually connect to live
          account, billing, and digest preferences.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {panels.map((panel) => (
          <article
            className="rounded-[1.5rem] border border-[var(--panel-border)] bg-[rgba(255,255,255,0.56)] p-5"
            key={panel.id}
          >
            <p className="m-0 text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
              {panel.eyebrow}
            </p>
            <h3 className="mt-3 text-2xl leading-8">{panel.title}</h3>
            <p className="m-0 mt-3 text-base leading-7 text-[var(--muted)]">{panel.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
