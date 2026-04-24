# Personal Admin

## Database setup

Run exactly [`supabase/schema.sql`](./supabase/schema.sql) in your Supabase project's SQL editor to create the schema, triggers, policies, and helper view required by this app. This is the schema file to use for the initial Supabase setup for this project.

1. Open your Supabase project.
2. Go to `SQL Editor`.
3. Paste in the contents of `supabase/schema.sql` and run it.
4. Return to the app setup once that SQL finishes successfully.

Use `supabase/schema.sql` for initial setup only. This file is not documented as safe for repeated reruns against an existing Supabase database.
