import Link from "next/link";
import { navigationItems } from "@/components/layout/navigation";
import type { DashboardQuickAction } from "@/lib/types";

type QuickActionsProps = Readonly<{
  actions: DashboardQuickAction[];
}>;

function isAvailable(href: string) {
  return navigationItems.find((item) => item.href === href)?.available ?? false;
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <section className="rounded-[1.75rem] border border-[var(--panel-border)] bg-[var(--panel)] p-6 shadow-[0_20px_60px_var(--panel-shadow)]">
      <div>
        <p className="m-0 font-[Trebuchet_MS,sans-serif] text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          Quick Actions
        </p>
        <h2 className="mt-3 text-3xl">Choose the next lane</h2>
        <p className="m-0 mt-3 text-sm leading-6 text-[var(--muted)]">
          Shortcuts stay grounded in the product roadmap, so unfinished destinations remain
          visible without becoming dead ends.
        </p>
      </div>

      <div className="mt-6 grid gap-3">
        {actions.map((action) => {
          const available = isAvailable(action.href);
          const content = (
            <>
              <span className="block text-lg">{action.label}</span>
              <span className="mt-2 block text-sm leading-6 text-[var(--muted)]">
                {action.description}
              </span>
            </>
          );

          if (!available) {
            return (
              <span
                aria-disabled="true"
                className="rounded-[1.4rem] border border-[var(--panel-border)] bg-[rgba(255,255,255,0.46)] px-4 py-4"
                key={action.id}
                title={`${action.label} coming soon`}
              >
                {content}
              </span>
            );
          }

          return (
            <Link
              className="rounded-[1.4rem] border border-[var(--panel-border)] bg-[rgba(255,255,255,0.62)] px-4 py-4 transition-transform duration-150 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[rgba(255,244,234,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              href={action.href}
              key={action.id}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
