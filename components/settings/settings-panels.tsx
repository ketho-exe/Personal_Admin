import type { BillRecord, InboxItem, NewsItem, TaskItem } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";

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
    <Card
      aria-labelledby="settings-panels-title"
      as="section"
      className="rounded-[1.75rem]"
      padding="lg"
      tone="panel"
    >
      <SectionHeading
        description="Static placeholders for the controls that will eventually connect to live account, billing, and digest preferences."
        eyebrow="Settings Workspace"
        id="settings-panels-title"
        title="Preferences and integrations"
      />

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {panels.map((panel) => (
          <Card as="article" key={panel.id}>
            <StatusPill tone="accent">{panel.eyebrow}</StatusPill>
            <h3 className="mt-3 text-2xl leading-8">{panel.title}</h3>
            <p className="m-0 mt-3 text-base leading-7 text-[var(--muted-strong)]">{panel.body}</p>
          </Card>
        ))}
      </div>
    </Card>
  );
}
