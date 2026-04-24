import Link from "next/link";
import { ConnectionCard } from "@/components/settings/connection-card";
import { SettingsPanels } from "@/components/settings/settings-panels";
import {
  getDemoAuthEntrySurface,
  getDemoBills,
  getDemoConnectionPlaceholders,
  getDemoInboxItems,
  getDemoNewsItems,
  getDemoTasks
} from "@/lib/demo-data";

export default async function SettingsPage() {
  const authEntrySurface = getDemoAuthEntrySurface();
  const bills = getDemoBills();
  const connectionPlaceholders = getDemoConnectionPlaceholders();
  const inboxItems = getDemoInboxItems();
  const newsItems = getDemoNewsItems();
  const tasks = getDemoTasks();

  return (
    <div className="px-5 py-5 md:px-8 md:py-8 xl:px-10" data-testid="settings-page">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="rounded-[2rem] border border-[var(--panel-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,244,234,0.98))] p-6 text-[var(--foreground)] shadow-[0_24px_80px_var(--panel-shadow)]">
          <p className="m-0 font-[Trebuchet_MS,sans-serif] text-xs font-bold uppercase tracking-[0.22em] text-[#8a3a22]">
            Secondary Workspace
          </p>
          <h1 className="mt-3 text-5xl text-[#201913]">Settings</h1>
          <p className="m-0 mt-4 max-w-3xl text-lg leading-8 text-[#4a3c32]">
            Review the dashboard&apos;s current defaults, keep future integration surfaces in
            view, and make space for account-level preferences without overbuilding them yet.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-[rgba(162,77,47,0.18)] px-3 py-1 text-[#6f2f1c]">
              Demo-mode controls
            </span>
            <span className="rounded-full bg-[rgba(32,25,19,0.08)] px-3 py-1 text-[#5a473a]">
              Integration-ready placeholders
            </span>
          </div>
        </section>

        <section
          aria-labelledby="settings-auth-title"
          className="grid gap-4 lg:grid-cols-[1.15fr_1.85fr]"
        >
          <article className="rounded-[1.75rem] border border-[var(--panel-border)] bg-[rgba(255,255,255,0.9)] p-6 text-[var(--foreground)] shadow-[0_20px_60px_var(--panel-shadow)]">
            <p className="m-0 font-[Trebuchet_MS,sans-serif] text-xs font-bold uppercase tracking-[0.2em] text-[#8a3a22]">
              Login entry
            </p>
            <h2 className="mt-3 text-3xl" id="settings-auth-title">
              Auth-ready surface
            </h2>
            <p className="m-0 mt-4 text-base leading-7 text-[#4a3c32]">
              {authEntrySurface.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
                href="/login"
              >
                {authEntrySurface.primaryActionLabel}
              </Link>
              <span className="rounded-full border border-dashed border-[var(--panel-border)] px-4 py-2 text-sm font-semibold text-[#5a473a]">
                Provider flows coming later
              </span>
            </div>
          </article>

          <div
            aria-label="connection placeholders"
            className="grid gap-4 md:grid-cols-2"
            role="region"
          >
            {connectionPlaceholders.map((connection) => (
              <ConnectionCard connection={connection} key={connection.id} />
            ))}
          </div>
        </section>

        <SettingsPanels
          bills={bills}
          inboxItems={inboxItems}
          newsItems={newsItems}
          tasks={tasks}
        />
      </div>
    </div>
  );
}
