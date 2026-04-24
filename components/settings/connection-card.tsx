import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import type { DemoConnectionPlaceholder } from "@/lib/demo-data";

type ConnectionCardProps = Readonly<{
  connection: DemoConnectionPlaceholder;
}>;

export function ConnectionCard({ connection }: ConnectionCardProps) {
  return (
    <Card
      aria-labelledby={`${connection.id}-title`}
      as="article"
      className="flex h-full flex-col justify-between rounded-[1.75rem]"
      tone="warm"
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <StatusPill tone="accent">Connection placeholder</StatusPill>
          <span className="rounded-full bg-[rgba(32,25,19,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#5a473a]">
            {connection.statusLabel}
          </span>
        </div>
        <h3 className="mt-4 text-2xl leading-8" id={`${connection.id}-title`}>
          {connection.name}
        </h3>
        <p className="m-0 mt-3 text-base leading-7 text-[#4a3c32]">{connection.summary}</p>
      </div>

      <div className="mt-5 space-y-3">
        <p className="m-0 rounded-[1.25rem] bg-[rgba(255,255,255,0.82)] px-4 py-3 text-sm leading-6 text-[#6f2f1c]">
          {connection.callout}
        </p>
        <div className="rounded-[1.25rem] border border-dashed border-[var(--panel-border)] px-4 py-3 text-sm font-semibold text-[#5a473a]">
          {connection.actionLabel}
        </div>
      </div>
    </Card>
  );
}
