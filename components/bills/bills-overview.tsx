import type { BillRecord } from "@/lib/types";

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
      return "bg-[rgba(162,77,47,0.14)] text-[var(--accent-strong)]";
    case "paid":
      return "bg-[rgba(77,132,79,0.12)] text-[rgb(52,92,54)]";
    default:
      return "bg-[rgba(32,25,19,0.08)] text-[var(--foreground)]";
  }
}

export function BillsOverview({ bills }: BillsOverviewProps) {
  const totalUpcoming = bills.reduce((sum, bill) => sum + bill.amountDue, 0);
  const autopayCount = bills.filter((bill) => bill.autopay).length;

  return (
    <section
      aria-labelledby="bills-overview-title"
      className="rounded-[1.75rem] border border-[var(--panel-border)] bg-[var(--panel)] p-6 shadow-[0_20px_60px_var(--panel-shadow)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="m-0 font-[Trebuchet_MS,sans-serif] text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Bills Workspace
          </p>
          <h2 className="mt-3 text-3xl" id="bills-overview-title">
            Upcoming payments
          </h2>
        </div>
        <div className="grid gap-1 text-right">
          <p className="m-0 text-sm text-[var(--muted)]">Next cycle total</p>
          <p className="m-0 text-2xl">{amountFormatter.format(totalUpcoming)}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <div className="grid gap-3 rounded-[1.5rem] border border-[var(--panel-border)] bg-[rgba(255,244,234,0.72)] p-5">
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
        </div>

        <div className="grid gap-4">
          {bills.map((bill) => (
            <article
              className="rounded-[1.5rem] border border-[var(--panel-border)] bg-[rgba(255,255,255,0.56)] p-5"
              key={bill.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${getStatusTone(bill.status)}`}
                    >
                      {bill.status.replace("-", " ")}
                    </span>
                    <span className="rounded-full bg-[rgba(32,25,19,0.06)] px-3 py-1 text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
                      {bill.category}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl">{bill.name}</h3>
                  <p className="m-0 mt-1 text-sm text-[var(--muted)]">{bill.vendor}</p>
                </div>
                <p className="m-0 text-2xl">{amountFormatter.format(bill.amountDue)}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-[rgba(32,25,19,0.06)] px-3 py-1 text-[var(--muted)]">
                  Due {dueDateFormatter.format(new Date(bill.dueDate))}
                </span>
                <span
                  className={`rounded-full px-3 py-1 ${
                    bill.autopay
                      ? "bg-[rgba(77,132,79,0.12)] text-[rgb(52,92,54)]"
                      : "bg-[rgba(162,77,47,0.12)] text-[var(--accent-strong)]"
                  }`}
                >
                  {bill.autopay ? "Autopay enabled" : "Manual check"}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
