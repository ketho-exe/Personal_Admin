import type { BillRecord } from "@/lib/types";

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
    <section className="rounded-[1.75rem] border border-[var(--panel-border)] bg-[var(--panel)] p-6 shadow-[0_20px_60px_var(--panel-shadow)]">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="m-0 font-[Trebuchet_MS,sans-serif] text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Upcoming Bills
          </p>
          <h2 className="mt-3 text-3xl">Cash flow at a glance</h2>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {bills.map((bill) => (
          <article
            className="rounded-[1.4rem] border border-[var(--panel-border)] bg-[rgba(255,255,255,0.58)] p-4"
            key={bill.id}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl">{bill.name}</h3>
                <p className="m-0 mt-1 text-sm text-[var(--muted)]">{bill.vendor}</p>
              </div>
              <p className="m-0 text-xl">{amountFormatter.format(bill.amountDue)}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-[rgba(32,25,19,0.06)] px-3 py-1 text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
                Due {dateFormatter.format(new Date(bill.dueDate))}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.08em] ${
                  bill.autopay
                    ? "bg-[rgba(77,132,79,0.12)] text-[rgb(52,92,54)]"
                    : "bg-[rgba(162,77,47,0.12)] text-[var(--accent-strong)]"
                }`}
              >
                {bill.autopay ? "Autopay on" : "Needs review"}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
