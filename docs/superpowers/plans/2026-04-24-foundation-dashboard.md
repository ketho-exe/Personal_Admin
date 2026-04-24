# Personal Admin Dashboard Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first shippable foundation of the Personal Admin Dashboard with real Supabase wiring, polished multi-page UI, realistic demo data, and setup documentation, while deferring live Gmail and RSS integrations.

**Architecture:** Create a Next.js App Router application with Tailwind, typed UI primitives, a dashboard layout, and a small data layer that serves demo content now and can swap to Supabase-backed queries later. Keep Supabase wired from the start with environment-aware helpers so the app can render in demo mode without crashing when credentials are missing.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, React, Supabase JavaScript client, next-themes, Vitest, Testing Library, ESLint

---

### Task 1: Scaffold The Application

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.js`
- Create: `eslint.config.mjs`
- Create: `.gitignore`
- Create: `.env.example`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `public/.gitkeep`

- [ ] **Step 1: Write the failing smoke test for the root route**

```tsx
// tests/app/home.test.tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the dashboard heading", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { name: /personal admin dashboard/i }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL with missing app files or missing test setup

- [ ] **Step 3: Write the minimal project scaffold**

```json
// package.json
{
  "name": "personal-admin",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

```tsx
// app/page.tsx
export default function HomePage() {
  return <h1>Personal Admin Dashboard</h1>;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: scaffold next app foundation"
```

### Task 2: Add Theme, Global Styles, And App Shell

**Files:**
- Create: `components/theme-provider.tsx`
- Create: `components/layout/app-shell.tsx`
- Create: `components/layout/sidebar.tsx`
- Create: `components/layout/mobile-nav.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Test: `tests/components/app-shell.test.tsx`

- [ ] **Step 1: Write the failing layout shell test**

```tsx
// tests/components/app-shell.test.tsx
import { render, screen } from "@testing-library/react";
import { AppShell } from "@/components/layout/app-shell";

describe("AppShell", () => {
  it("renders primary navigation links", () => {
    render(<AppShell>content</AppShell>);
    expect(screen.getByRole("link", { name: /today/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /inbox/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /settings/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/components/app-shell.test.tsx`
Expected: FAIL with missing shell components

- [ ] **Step 3: Write the minimal themed shell**

```tsx
// components/layout/app-shell.tsx
import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

```tsx
// components/layout/sidebar.tsx
import Link from "next/link";

const links = ["Today", "Inbox", "Bills", "News", "Tasks", "Settings"];

export function Sidebar() {
  return (
    <nav aria-label="Primary">
      {links.map((label) => (
        <Link key={label} href={label === "Today" ? "/" : `/${label.toLowerCase()}`}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/components/app-shell.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app components tests
git commit -m "feat: add themed app shell and navigation"
```

### Task 3: Add Shared Types And Demo Data Access Layer

**Files:**
- Create: `lib/types.ts`
- Create: `lib/demo-data.ts`
- Create: `lib/data/dashboard.ts`
- Create: `lib/data/inbox.ts`
- Create: `lib/data/bills.ts`
- Create: `lib/data/news.ts`
- Create: `lib/data/tasks.ts`
- Test: `tests/lib/dashboard-data.test.ts`

- [ ] **Step 1: Write the failing dashboard data test**

```ts
// tests/lib/dashboard-data.test.ts
import { getDashboardData } from "@/lib/data/dashboard";

describe("getDashboardData", () => {
  it("returns a morning briefing and priority items", async () => {
    const data = await getDashboardData();
    expect(data.briefing.title).toMatch(/good/i);
    expect(data.priorityItems.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/lib/dashboard-data.test.ts`
Expected: FAIL with missing data loader

- [ ] **Step 3: Write the minimal data contracts and loader**

```ts
// lib/types.ts
export type Priority = "low" | "medium" | "high" | "urgent";

export interface AdminItemRecord {
  id: string;
  title: string;
  summary: string;
  category: string;
  priority: Priority;
  status: "new" | "read" | "dismissed" | "archived";
  source: "email" | "news" | "manual" | "system";
  dueDate?: string;
}
```

```ts
// lib/data/dashboard.ts
import { demoDashboardData } from "@/lib/demo-data";

export async function getDashboardData() {
  return demoDashboardData;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/lib/dashboard-data.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add lib tests
git commit -m "feat: add demo data layer for dashboard foundation"
```

### Task 4: Wire Supabase Clients And Environment-Aware Helpers

**Files:**
- Create: `lib/env.ts`
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/config.ts`
- Modify: `.env.example`
- Test: `tests/lib/env.test.ts`

- [ ] **Step 1: Write the failing environment helper test**

```ts
// tests/lib/env.test.ts
import { getSupabaseConfig } from "@/lib/supabase/config";

describe("getSupabaseConfig", () => {
  it("returns demo mode when env vars are missing", () => {
    const result = getSupabaseConfig({});
    expect(result.isConfigured).toBe(false);
    expect(result.mode).toBe("demo");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/lib/env.test.ts`
Expected: FAIL with missing Supabase config helper

- [ ] **Step 3: Write the minimal configuration layer**

```ts
// lib/supabase/config.ts
export function getSupabaseConfig(env: Record<string, string | undefined>) {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return { isConfigured: false, mode: "demo" as const };
  }

  return {
    isConfigured: true,
    mode: "live" as const,
    url,
    anonKey,
  };
}
```

```dotenv
# .env.example
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/lib/env.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .env.example lib tests
git commit -m "feat: add supabase wiring and demo mode fallback"
```

### Task 5: Commit The SQL Schema And Database Setup Docs

**Files:**
- Create: `supabase/schema.sql`
- Modify: `README.md`
- Test: `tests/docs/schema-path.test.ts`

- [ ] **Step 1: Write the failing schema path test**

```ts
// tests/docs/schema-path.test.ts
import { existsSync, readFileSync } from "node:fs";

describe("schema.sql", () => {
  it("stores the Supabase schema in the expected repo path", () => {
    expect(existsSync("supabase/schema.sql")).toBe(true);
    expect(readFileSync("supabase/schema.sql", "utf8")).toMatch(/create table if not exists public\.profiles/i);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/docs/schema-path.test.ts`
Expected: FAIL because schema file is missing

- [ ] **Step 3: Add the SQL schema and README setup section**

```md
<!-- README.md -->
## Supabase Setup

1. Create a Supabase project.
2. Open the SQL editor.
3. Run the schema from `supabase/schema.sql`.
4. Copy your project URL and anon key into `.env.local`.
```

```sql
-- supabase/schema.sql
-- Copy the approved schema into this file without changing table intent.
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/docs/schema-path.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add README.md supabase/schema.sql tests
git commit -m "feat: add supabase schema and setup docs"
```

### Task 6: Build The Today Page

**Files:**
- Modify: `app/page.tsx`
- Create: `components/dashboard/briefing-hero.tsx`
- Create: `components/dashboard/priority-list.tsx`
- Create: `components/dashboard/bill-summary.tsx`
- Create: `components/dashboard/news-summary.tsx`
- Create: `components/dashboard/quick-actions.tsx`
- Test: `tests/app/today-page.test.tsx`

- [ ] **Step 1: Write the failing today page test**

```tsx
// tests/app/today-page.test.tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("Today page", () => {
  it("shows the briefing and priority section", async () => {
    render(await HomePage());
    expect(screen.getByText(/priority items/i)).toBeInTheDocument();
    expect(screen.getByText(/quick actions/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/app/today-page.test.tsx`
Expected: FAIL because the sections do not exist yet

- [ ] **Step 3: Write the minimal dashboard composition**

```tsx
// app/page.tsx
import { getDashboardData } from "@/lib/data/dashboard";

export default async function HomePage() {
  const data = await getDashboardData();

  return (
    <section>
      <h1>{data.briefing.title}</h1>
      <h2>Priority Items</h2>
      <h2>Quick Actions</h2>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/app/today-page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app components tests
git commit -m "feat: add today dashboard experience"
```

### Task 7: Build Inbox, Bills, News, Tasks, And Settings Pages

**Files:**
- Create: `app/inbox/page.tsx`
- Create: `app/bills/page.tsx`
- Create: `app/news/page.tsx`
- Create: `app/tasks/page.tsx`
- Create: `app/settings/page.tsx`
- Create: `components/inbox/inbox-list.tsx`
- Create: `components/bills/bills-overview.tsx`
- Create: `components/news/news-feed.tsx`
- Create: `components/tasks/tasks-list.tsx`
- Create: `components/settings/settings-panels.tsx`
- Test: `tests/app/secondary-pages.test.tsx`

- [ ] **Step 1: Write the failing secondary pages test**

```tsx
// tests/app/secondary-pages.test.tsx
import { render, screen } from "@testing-library/react";
import InboxPage from "@/app/inbox/page";
import BillsPage from "@/app/bills/page";

describe("secondary pages", () => {
  it("renders inbox filters and bills overview", async () => {
    render(await InboxPage());
    expect(screen.getByText(/filter by status/i)).toBeInTheDocument();

    render(await BillsPage());
    expect(screen.getByText(/upcoming payments/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/app/secondary-pages.test.tsx`
Expected: FAIL with missing pages

- [ ] **Step 3: Write the minimal page implementations**

```tsx
// app/inbox/page.tsx
export default async function InboxPage() {
  return (
    <section>
      <h1>Inbox</h1>
      <p>Filter by status</p>
    </section>
  );
}
```

```tsx
// app/bills/page.tsx
export default async function BillsPage() {
  return (
    <section>
      <h1>Bills</h1>
      <p>Upcoming payments</p>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/app/secondary-pages.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app components tests
git commit -m "feat: add secondary dashboard workspaces"
```

### Task 8: Add Reusable Visual Primitives And Polishing

**Files:**
- Create: `components/ui/card.tsx`
- Create: `components/ui/badge.tsx`
- Create: `components/ui/section-heading.tsx`
- Create: `components/ui/status-pill.tsx`
- Modify: `components/dashboard/*`
- Modify: `components/inbox/*`
- Modify: `components/bills/*`
- Modify: `components/news/*`
- Modify: `components/tasks/*`
- Modify: `components/settings/*`
- Test: `tests/components/status-pill.test.tsx`

- [ ] **Step 1: Write the failing status pill test**

```tsx
// tests/components/status-pill.test.tsx
import { render, screen } from "@testing-library/react";
import { StatusPill } from "@/components/ui/status-pill";

describe("StatusPill", () => {
  it("renders urgent priority labels", () => {
    render(<StatusPill tone="urgent">Urgent</StatusPill>);
    expect(screen.getByText(/urgent/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/components/status-pill.test.tsx`
Expected: FAIL with missing UI primitive

- [ ] **Step 3: Write the minimal visual primitives**

```tsx
// components/ui/status-pill.tsx
import type { ReactNode } from "react";

export function StatusPill({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "neutral" | "info" | "high" | "urgent";
}) {
  return <span data-tone={tone}>{children}</span>;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/components/status-pill.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components tests
git commit -m "feat: add reusable dashboard ui primitives"
```

### Task 9: Add Auth Entry Surfaces And Connection Placeholders

**Files:**
- Create: `app/login/page.tsx`
- Create: `components/settings/connection-card.tsx`
- Modify: `app/settings/page.tsx`
- Modify: `lib/demo-data.ts`
- Test: `tests/app/settings-page.test.tsx`

- [ ] **Step 1: Write the failing settings integration state test**

```tsx
// tests/app/settings-page.test.tsx
import { render, screen } from "@testing-library/react";
import SettingsPage from "@/app/settings/page";

describe("SettingsPage", () => {
  it("shows Gmail and RSS connection placeholders", async () => {
    render(await SettingsPage());
    expect(screen.getByText(/gmail connection/i)).toBeInTheDocument();
    expect(screen.getByText(/rss sources/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/app/settings-page.test.tsx`
Expected: FAIL until settings page exposes integration placeholders

- [ ] **Step 3: Write the minimal settings placeholders**

```tsx
// app/settings/page.tsx
export default async function SettingsPage() {
  return (
    <section>
      <h1>Settings</h1>
      <h2>Gmail connection</h2>
      <h2>RSS sources</h2>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/app/settings-page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app components lib tests
git commit -m "feat: add auth and integration-ready settings surfaces"
```

### Task 10: Final Verification, README, And Handoff

**Files:**
- Modify: `README.md`
- Modify: `docs/superpowers/specs/2026-04-24-foundation-dashboard-design.md`
- Test: `tests/docs/readme-setup.test.ts`

- [ ] **Step 1: Write the failing README handoff test**

```ts
// tests/docs/readme-setup.test.ts
import { readFileSync } from "node:fs";

describe("README setup", () => {
  it("tells the user which SQL schema file to run in Supabase", () => {
    const readme = readFileSync("README.md", "utf8");
    expect(readme).toMatch(/supabase\/schema\.sql/i);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/docs/readme-setup.test.ts`
Expected: FAIL until README includes the exact schema handoff path

- [ ] **Step 3: Write the final setup and verification docs**

```md
<!-- README.md -->
## Local Development

npm install
npm run dev

## Supabase Schema

Run the SQL in `supabase/schema.sql` inside your Supabase SQL editor before switching the app from demo mode to live data.
```

- [ ] **Step 4: Run full verification**

Run: `npm run lint`
Expected: PASS

Run: `npm test`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add README.md docs tests
git commit -m "docs: finalize foundation setup and handoff"
```

## Self-Review

### Spec Coverage

- App scaffold: covered by Task 1
- Theme and visual shell: covered by Task 2
- Demo data strategy: covered by Task 3
- Supabase wiring: covered by Task 4
- SQL schema and setup: covered by Task 5
- Today page: covered by Task 6
- Secondary pages: covered by Task 7
- Reusable UI and visual polish: covered by Task 8
- Settings and auth-ready surfaces: covered by Task 9
- Final schema handoff and verification: covered by Task 10

No gaps found against the approved spec.

### Placeholder Scan

- No `TODO`, `TBD`, or deferred implementation placeholders remain in the task steps
- Each task has explicit files, commands, and expected results
- Each code-changing task includes concrete starter code

### Type Consistency

- `getDashboardData()` is defined in Task 3 and consumed in Task 6
- Demo mode terminology is defined in Task 4 and referenced again in Task 10
- `supabase/schema.sql` is introduced in Task 5 and referenced consistently in Task 10
