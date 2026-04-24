import type { BillRecord } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";

type BillsOverviewProps = Readonly<{
  bills: BillRecord[];
}>;

const amountFormatter = new Intl.NumberFormat("en-GB", {
  currency: "GBP",
  style: "currency"
});

const dueDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  weekday: "short"
});

function getStatusTone(status: BillRecord["status"]) {
  switch (status) {
    case "due-soon":
      return "attention";
    case "paid":
      return "success";
    default:
      return "neutral";
  }
}

export function BillsOverview({ bills }: BillsOverviewProps) {
  const totalUpcoming = bills.reduce((sum, bill) => sum + bill.amountDue, 0);
  const autopayCount = bills.filter((bill) => bill.autopay).length;

  return (
    <Card
      aria-labelledby="bills-overview-title"
      as="section"
      className="rounded-[1.75rem]"
      padding="lg"
      tone="panel"
    >
      <SectionHeading
        action={
          <div className="grid gap-1 text-right">
            <p className="m-0 text-sm text-[var(--muted)]">Next cycle total</p>
            <p className="m-0 text-2xl">{amountFormatter.format(totalUpcoming)}</p>
          </div>
        }
        eyebrow="Bills Workspace"
        id="bills-overview-title"
        title="Upcoming payments"
      />

      <div className="mt-6 grid gap-4 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <Card className="grid gap-3" tone="warm">
          <div>
            <p className="m-0 text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
              Autopay coverage
            </p>
            <p className="m-0 mt-2 text-3xl">{autopayCount}</p>
            <p className="m-0 text-sm text-[var(--muted)]">of {bills.length} bills protected</p>
          </div>
          <div>
            <p className="m-0 text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
              Manual review
            </p>
            <p className="m-0 mt-2 text-sm leading-6 text-[var(--foreground)]">
              Flag any subscription or amount that feels off before it renews.
            </p>
          </div>
        </Card>

        <div className="grid gap-4">
          {bills.map((bill) => (
            <Card as="article" key={bill.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <StatusPill tone={getStatusTone(bill.status)}>
                      {bill.status.replace("-", " ")}
                    </StatusPill>
                    <StatusPill tone="neutral">
                      {bill.category}
                    </StatusPill>
                  </div>
                  <h3 className="mt-4 text-2xl">{bill.name}</h3>
                  <p className="m-0 mt-1 text-sm text-[var(--muted)]">{bill.vendor}</p>
                </div>
                <p className="m-0 text-2xl">{amountFormatter.format(bill.amountDue)}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <StatusPill tone="accent">{`Due ${dueDateFormatter.format(new Date(bill.dueDate))}`}</StatusPill>
                <StatusPill tone={bill.autopay ? "success" : "attention"}>
                  {bill.autopay ? "Autopay enabled" : "Manual check"}
                </StatusPill>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
}
