# Personal Admin

## Database setup

Run the SQL in [`supabase/schema.sql`](./supabase/schema.sql) in your Supabase project's SQL editor to create the schema, triggers, policies, and helper view required by this app. In short: run it in your Supabase project for initial setup in a fresh project before using the app.

1. Open your Supabase project.
2. Go to `SQL Editor`.
3. Paste in the contents of `supabase/schema.sql` and run it.

Use `supabase/schema.sql` for initial setup only. This file is not documented as safe for repeated reruns against an existing Supabase database.
