import { NavigationItem, navigationItems } from "@/components/layout/navigation";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { DashboardQuickAction } from "@/lib/types";

type QuickActionsProps = Readonly<{
  actions: DashboardQuickAction[];
}>;

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <Card
      aria-labelledby="today-actions-title"
      as="section"
      className="rounded-[1.75rem]"
      padding="lg"
      tone="panel"
    >
      <SectionHeading
        className="items-start"
        description="Shortcuts stay grounded in the product roadmap, so unfinished destinations remain visible without becoming dead ends."
        eyebrow="Quick Actions"
        id="today-actions-title"
        title="Choose the next lane"
      />

      <div className="mt-6 grid gap-3">
        {actions.map((action) => {
          const navigationItem = navigationItems.find((item) => item.href === action.href);
          const content = (
            <>
              <span className="block text-lg text-[#2b211b]">{action.label}</span>
              <span className="mt-2 block text-sm leading-6 text-[#5a473a]">
                {action.description}
              </span>
            </>
          );

          return (
            <NavigationItem
              available={navigationItem?.available ?? false}
              className="rounded-[1.4rem] border border-[var(--panel-border)] bg-[rgba(255,255,255,0.92)] px-4 py-4 text-[var(--foreground)] transition-transform duration-150 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[rgba(255,244,234,0.98)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              disabledClassName="rounded-[1.4rem] border border-[var(--panel-border)] bg-[rgba(255,255,255,0.88)] px-4 py-4 text-[var(--foreground)]"
              href={action.href}
              key={action.id}
              label={action.label}
            >
              {content}
            </NavigationItem>
          );
        })}
      </div>
    </Card>
  );
}
