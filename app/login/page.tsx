import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getDemoAuthEntrySurface } from "@/lib/demo-data";

export default function LoginPage() {
  const authEntrySurface = getDemoAuthEntrySurface();

  return (
    <div className="px-5 py-5 md:px-8 md:py-8 xl:px-10" data-testid="login-page">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <Card
          as="section"
          className="rounded-[2rem] bg-[linear-gradient(145deg,rgba(255,248,242,0.96),rgba(255,255,255,0.78))]"
          padding="lg"
          tone="panel"
        >
          <p className="m-0 font-[Trebuchet_MS,sans-serif] text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
            Auth Workspace
          </p>
          <h1 className="mt-3 text-5xl">Login</h1>
          <p className="m-0 mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            {authEntrySurface.summary}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card className="rounded-[1.75rem]" tone="glass">
              <p className="m-0 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                Auth-ready
              </p>
              <h2 className="mt-3 text-2xl leading-8">{authEntrySurface.title}</h2>
              <p className="m-0 mt-3 text-base leading-7 text-[var(--muted)]">
                Real sign-in buttons, recovery flows, and session state will plug into this page
                when provider setup begins.
              </p>
            </Card>
            <Card className="rounded-[1.75rem]" tone="warm">
              <p className="m-0 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                Next connections
              </p>
              <p className="m-0 mt-3 text-base leading-7 text-[var(--muted)]">
                Gmail and RSS placeholders already live in settings so integration rollout can
                stay visible while auth remains intentionally dormant.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
                  href="/settings"
                >
                  {authEntrySurface.secondaryActionLabel}
                </Link>
                <span className="rounded-full border border-dashed border-[var(--panel-border)] px-4 py-2 text-sm font-semibold text-[var(--muted)]">
                  {authEntrySurface.primaryActionLabel}
                </span>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}
