import type { BillRecord } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";

type BillSummaryProps = Readonly<{
  bills: BillRecord[];
}>;

const amountFormatter = new Intl.NumberFormat("en-GB", {
  currency: "GBP",
  style: "currency"
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short"
});

export function BillSummary({ bills }: BillSummaryProps) {
  return (
    <Card
      aria-labelledby="today-bills-title"
      as="section"
      className="rounded-[1.75rem]"
      padding="lg"
      tone="panel"
    >
      <SectionHeading eyebrow="Upcoming Bills" id="today-bills-title" title="Cash flow at a glance" />

      <div className="mt-6 grid gap-4">
        {bills.map((bill) => (
          <Card as="article" className="rounded-[1.4rem] p-4" key={bill.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl">{bill.name}</h3>
                <p className="m-0 mt-1 text-sm text-[var(--foreground)]">{bill.vendor}</p>
              </div>
              <p className="m-0 text-xl">{amountFormatter.format(bill.amountDue)}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <StatusPill tone="accent">{`Due ${dateFormatter.format(new Date(bill.dueDate))}`}</StatusPill>
              <StatusPill tone={bill.autopay ? "success" : "attention"}>
                {bill.autopay ? "Autopay on" : "Needs review"}
              </StatusPill>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
