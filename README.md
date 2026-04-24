# Personal Admin

## Local Development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Choose one of these local modes:
   - Leave the Supabase values unset in `.env.local` to preview the app in demo mode.
   - Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` to switch to configured Supabase mode.
4. If you are using Supabase mode, run the database setup steps below in your Supabase project before starting the app.
5. Start the app with `npm run dev`.

The app can stay in demo mode when Supabase is not configured. To connect it to Supabase, `.env.local` must define the required `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` values from your Supabase project.

## Database Setup

Run exactly [`supabase/schema.sql`](./supabase/schema.sql) in your Supabase project's SQL editor to create the schema, triggers, policies, and helper view required by this app. This is the schema file to use for the initial Supabase setup for this project.

1. Open your Supabase project.
2. Go to `SQL Editor`.
3. Paste in the contents of `supabase/schema.sql` and run it.
4. Return to the app setup once that SQL finishes successfully.

Use `supabase/schema.sql` for initial setup only. This file is not documented as safe for repeated reruns against an existing Supabase database.
