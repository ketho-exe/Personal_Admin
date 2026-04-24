# Personal Admin Dashboard Foundation Design

## Summary

This spec defines the first implementation slice for the Personal Admin Dashboard. The goal of this slice is to produce a visually complete, locally runnable app foundation with real Supabase wiring in place, while using mock and seeded data for the dashboard experience until Gmail and RSS ingestion are implemented in a later phase.

This phase should answer two questions:

1. Does the product feel right visually and structurally?
2. Is the application foundation solid enough to layer live integrations onto without major rewrites?

## Goals

- Build the initial application in the GitHub repository at `ketho-exe/Personal_Admin`
- Use Next.js App Router with TypeScript and Tailwind CSS
- Wire Supabase into the app from day one for auth, database access, and future persistence
- Check the provided SQL schema into the repo as the initial database definition
- Deliver a strong, polished dashboard shell with realistic mock data
- Create page-level foundations for `Today`, `Inbox`, `Bills`, `News`, `Tasks`, and `Settings`
- Support dark and light themes
- Make it easy to replace demo data with live Supabase queries incrementally

## Non-Goals

This phase will not implement:

- Gmail OAuth or Gmail API fetching
- RSS ingestion or feed polling
- Vercel cron ingestion runs
- Rules engine execution
- Production item classification
- Calendar integration
- Paid AI features

## Product Direction

The product should feel calm, editorial, and intentional rather than like a default SaaS admin panel. The default landing experience should immediately answer the core product question:

> What needs my attention today?

The dashboard should feel personal and trustworthy. It should emphasize clarity, urgency, due dates, and quick triage over dense controls or enterprise-style complexity.

## Foundation Architecture

### Application Layer

The application will be a Next.js App Router project with:

- server-rendered page shells where useful
- reusable UI components for cards, navigation, status badges, and panels
- a shared application layout for navigation and top-level framing
- theme support for light and dark modes

### Data Layer

Supabase will be wired into the project immediately through:

- environment configuration
- browser and server Supabase clients
- shared typed helpers
- a documented schema file in the repository

The app will not depend on live external integrations yet. Instead, the first version of page data will come from a demo data module that mirrors the schema shape closely enough that pages can later swap to real database-backed loaders without major UI churn.

### Database Scope For This Phase

The repository should include the provided schema as the source SQL definition. The product foundation should be designed around the following tables because they matter directly to the first visual slice:

- `profiles`
- `user_settings`
- `connected_accounts`
- `rss_feeds`
- `admin_items`
- `detected_bills`
- `tasks`
- `user_rules`
- `ingestion_runs`

Other tables from the schema may remain present in SQL without full UI implementation yet.

## Navigation And Pages

### Global Navigation

The app should use a persistent left-side navigation on desktop and a simplified mobile treatment. Navigation items:

- Today
- Inbox
- Bills
- News
- Tasks
- Settings

The navigation should feel product-led rather than purely utilitarian. It should support quick orientation and clearly communicate the current active workspace.

### Today

This is the main landing page and the most important page in the foundation phase.

It should include:

- a morning briefing hero
- high-priority items summary
- upcoming bills and renewals
- curated news snapshot
- quick actions
- visual indicators for ingestion readiness or demo mode

The hero should present the app as a personal command center rather than a raw list view.

### Inbox

This page should present all important admin items using realistic card or row treatments and filters for:

- source
- priority
- category
- status

The page should make it obvious how the app will eventually help the user triage email-derived items.

### Bills

This page should focus on payment-related items and upcoming due dates. It should visually separate urgent and upcoming obligations and make bill status easy to scan.

### News

This page should present curated articles in a calmer, more editorial style than the task-focused surfaces. It should still feel integrated with the product, not like a separate RSS reader.

### Tasks

This page should show manual and item-linked tasks with simple progression states and due dates.

### Settings

This page should include:

- profile basics
- appearance preferences
- daily briefing preferences
- importance threshold controls
- placeholder connection states for Gmail and RSS
- clear indicators that the integration surfaces are foundation-only in this phase

## Visual Design Direction

### Tone

The UI should feel:

- calm
- precise
- premium
- personal

It should avoid looking like a generic analytics dashboard.

### Layout

The design should prioritize:

- generous hierarchy
- restrained but expressive color
- strong typography contrast
- card groupings with clear information priority
- responsive behavior that still feels intentional on mobile

### Styling

The palette should lean warm-neutral with clear urgency accents. Priority states should be visually meaningful without turning the whole interface into warning colors. Cards should be soft but structured, with enough contrast and separation to support scanning.

### Theme Support

Light and dark modes should both feel designed rather than inverted automatically. The theme system should be part of the initial foundation, not retrofitted later.

## Data Strategy For The Foundation Phase

### Demo Data

The app should include realistic demo data that mirrors the kinds of records expected from the schema:

- important admin items
- bills and renewals
- news items
- tasks
- connection states

Demo records should be believable and varied enough to validate the UI under different priorities, categories, and statuses.

### Swap Strategy

Pages should not read mock arrays directly inside component files. Instead, the app should use a small data-access layer with clear interfaces, so each page can later switch from demo loaders to Supabase-backed queries in a focused change.

This keeps the foundation work durable.

## Supabase Integration Requirements

The project should be ready for Supabase connection immediately after setup by the user. That includes:

- `.env.example` with required environment variables
- a clearly organized Supabase client setup
- typed helpers or generated-type-ready structure
- schema SQL committed into the repo
- setup instructions in the README
- a final handoff path that tells the user to run `supabase/schema.sql` in Supabase

The UI may remain in demo mode even when Supabase credentials are absent. Missing environment variables should not crash the entire local app if the user only wants to preview the interface.

## Error Handling And Empty States

The foundation should include graceful states for:

- demo mode active
- Supabase not configured
- no items available
- no bills due
- no tasks pending
- integrations not connected yet

These states should feel intentional and informative, not like missing features or broken screens.

## Testing Expectations

This phase should include enough verification to support confident iteration:

- project builds locally
- linting passes
- at least a small set of component or rendering tests for critical foundation surfaces
- a quick manual visual verification path for the main dashboard experience

The testing goal is to protect the foundation while keeping the first slice lightweight.

## Deliverables

The end of this phase should produce:

- a working Next.js project scaffold
- Tailwind and theme support
- Supabase wiring and setup files
- schema SQL in the repo
- the exact Supabase setup file documented as `supabase/schema.sql`
- polished multi-page dashboard foundation
- realistic seeded/demo content
- documentation for local setup
- an initial commit history that cleanly captures the foundation work

## Final Verification And Handoff

Before handoff, the implementation should be verified with:

- `npm run lint`
- `npm test`
- `npm run build`

For the current `HEAD` handoff state, `npm run lint`, `npm test`, and `npm run build` were run as the final verification set and all passed before handoff commit creation.

The README handoff must explicitly direct the user to copy `.env.example` to `.env.local`, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for configured Supabase mode, and run `supabase/schema.sql` in their Supabase project's SQL Editor during initial setup.

## Open Decisions Resolved In This Spec

- Build order: foundation first, live integrations later
- Supabase: wire it now, even if initial UI data is mocked
- Visual review: prioritize a quick, strong, testable dashboard before Gmail and RSS implementation

## Success Criteria

This phase is successful when:

- the app runs locally
- the main pages exist and feel coherent
- the dashboard looks close to the intended product direction
- Supabase wiring is present and organized
- the codebase is ready for Gmail and RSS work without structural rework
