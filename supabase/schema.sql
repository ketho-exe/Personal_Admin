-- Personal Admin Dashboard Supabase Schema
-- Designed for Supabase Postgres with Row Level Security.

create extension if not exists "pgcrypto";

-- =========================================================
-- ENUMS
-- =========================================================

do $$ begin
  create type item_source as enum ('email', 'news', 'calendar', 'manual', 'system');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type item_status as enum ('new', 'read', 'dismissed', 'archived');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type item_priority as enum ('low', 'medium', 'high', 'urgent');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type item_category as enum (
    'general',
    'bill',
    'invoice',
    'renewal',
    'payment_failed',
    'appointment',
    'delivery',
    'refund',
    'government',
    'banking',
    'security',
    'news',
    'task',
    'other'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type bill_status as enum ('upcoming', 'paid', 'overdue', 'dismissed', 'unknown');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type task_status as enum ('todo', 'in_progress', 'done', 'dismissed');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type rule_action as enum (
    'ignore',
    'mark_important',
    'set_category',
    'boost_score',
    'lower_score',
    'create_bill_candidate',
    'create_task_candidate'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type match_operator as enum (
    'contains',
    'not_contains',
    'equals',
    'starts_with',
    'ends_with',
    'regex'
  );
exception when duplicate_object then null;
end $$;

-- =========================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =========================================================
-- PROFILES
-- =========================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  timezone text not null default 'Europe/London',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- =========================================================
-- USER SETTINGS
-- =========================================================

create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  theme text not null default 'system' check (theme in ('system', 'light', 'dark')),
  density text not null default 'comfortable' check (density in ('compact', 'comfortable')),
  daily_briefing_enabled boolean not null default true,
  daily_briefing_time time not null default '06:00',
  importance_threshold integer not null default 50 check (importance_threshold between 0 and 100),
  max_news_items_per_day integer not null default 15 check (max_news_items_per_day between 1 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger user_settings_set_updated_at
before update on public.user_settings
for each row execute function public.set_updated_at();

-- =========================================================
-- CONNECTED ACCOUNTS
-- =========================================================

create table if not exists public.connected_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null check (provider in ('gmail', 'google_calendar')),
  provider_user_id text,
  email text,
  access_token text,
  refresh_token text,
  token_expires_at timestamptz,
  scopes text[] not null default '{}',
  is_active boolean not null default true,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, provider, provider_user_id)
);

create index if not exists connected_accounts_user_id_idx on public.connected_accounts(user_id);
create index if not exists connected_accounts_provider_idx on public.connected_accounts(provider);

create trigger connected_accounts_set_updated_at
before update on public.connected_accounts
for each row execute function public.set_updated_at();

-- =========================================================
-- RSS FEEDS
-- =========================================================

create table if not exists public.rss_feeds (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  url text not null,
  category text default 'general',
  include_keywords text[] not null default '{}',
  exclude_keywords text[] not null default '{}',
  is_active boolean not null default true,
  last_fetched_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, url)
);

create index if not exists rss_feeds_user_id_idx on public.rss_feeds(user_id);
create index if not exists rss_feeds_active_idx on public.rss_feeds(user_id, is_active);

create trigger rss_feeds_set_updated_at
before update on public.rss_feeds
for each row execute function public.set_updated_at();

-- =========================================================
-- ADMIN ITEMS
-- =========================================================

create table if not exists public.admin_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source item_source not null,
  source_account_id uuid references public.connected_accounts(id) on delete set null,
  source_external_id text,
  source_url text,
  title text not null,
  summary text,
  sender_name text,
  sender_email text,
  source_name text,
  category item_category not null default 'general',
  priority item_priority not null default 'medium',
  importance_score integer not null default 50 check (importance_score between 0 and 100),
  status item_status not null default 'new',
  is_starred boolean not null default false,
  detected_amount numeric(12,2),
  detected_currency text default 'GBP',
  detected_due_date date,
  received_at timestamptz,
  published_at timestamptz,
  raw_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, source, source_external_id)
);

create index if not exists admin_items_user_id_idx on public.admin_items(user_id);
create index if not exists admin_items_status_idx on public.admin_items(user_id, status);
create index if not exists admin_items_priority_idx on public.admin_items(user_id, priority);
create index if not exists admin_items_category_idx on public.admin_items(user_id, category);
create index if not exists admin_items_source_idx on public.admin_items(user_id, source);
create index if not exists admin_items_due_date_idx on public.admin_items(user_id, detected_due_date);
create index if not exists admin_items_created_at_idx on public.admin_items(user_id, created_at desc);

create trigger admin_items_set_updated_at
before update on public.admin_items
for each row execute function public.set_updated_at();

-- =========================================================
-- ITEM EVENTS / AUDIT LOG
-- =========================================================

create table if not exists public.item_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id uuid not null references public.admin_items(id) on delete cascade,
  event_type text not null,
  event_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists item_events_user_id_idx on public.item_events(user_id);
create index if not exists item_events_item_id_idx on public.item_events(item_id);

-- =========================================================
-- DETECTED BILLS
-- =========================================================

create table if not exists public.detected_bills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id uuid references public.admin_items(id) on delete set null,
  provider_name text not null,
  amount numeric(12,2),
  currency text not null default 'GBP',
  due_date date,
  status bill_status not null default 'unknown',
  confidence_score integer not null default 50 check (confidence_score between 0 and 100),
  recurrence_hint text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists detected_bills_user_id_idx on public.detected_bills(user_id);
create index if not exists detected_bills_due_date_idx on public.detected_bills(user_id, due_date);
create index if not exists detected_bills_status_idx on public.detected_bills(user_id, status);

create trigger detected_bills_set_updated_at
before update on public.detected_bills
for each row execute function public.set_updated_at();

-- =========================================================
-- TASKS
-- =========================================================

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id uuid references public.admin_items(id) on delete set null,
  title text not null,
  description text,
  status task_status not null default 'todo',
  priority item_priority not null default 'medium',
  due_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tasks_user_id_idx on public.tasks(user_id);
create index if not exists tasks_status_idx on public.tasks(user_id, status);
create index if not exists tasks_due_date_idx on public.tasks(user_id, due_date);

create trigger tasks_set_updated_at
before update on public.tasks
for each row execute function public.set_updated_at();

-- =========================================================
-- USER RULES
-- =========================================================

create table if not exists public.user_rules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  source item_source,
  match_field text not null,
  operator match_operator not null default 'contains',
  match_value text not null,
  action rule_action not null,
  action_value text,
  score_delta integer default 0,
  priority integer not null default 100,
  is_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists user_rules_user_id_idx on public.user_rules(user_id);
create index if not exists user_rules_enabled_idx on public.user_rules(user_id, is_enabled);
create index if not exists user_rules_priority_idx on public.user_rules(user_id, priority);

create trigger user_rules_set_updated_at
before update on public.user_rules
for each row execute function public.set_updated_at();

-- =========================================================
-- INGESTION RUNS
-- =========================================================

create table if not exists public.ingestion_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  source item_source not null,
  status text not null check (status in ('started', 'success', 'partial_success', 'failed')),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  items_seen integer not null default 0,
  items_created integer not null default 0,
  items_updated integer not null default 0,
  error_message text,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists ingestion_runs_user_id_idx on public.ingestion_runs(user_id);
create index if not exists ingestion_runs_started_at_idx on public.ingestion_runs(started_at desc);

-- =========================================================
-- DEFAULT PROFILE CREATION
-- =========================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;

  insert into public.user_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- =========================================================
-- ROW LEVEL SECURITY
-- =========================================================

alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.connected_accounts enable row level security;
alter table public.rss_feeds enable row level security;
alter table public.admin_items enable row level security;
alter table public.item_events enable row level security;
alter table public.detected_bills enable row level security;
alter table public.tasks enable row level security;
alter table public.user_rules enable row level security;
alter table public.ingestion_runs enable row level security;

-- Profiles
create policy "Users can view own profile" on public.profiles
for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
for update using (auth.uid() = id);

-- User settings
create policy "Users can view own settings" on public.user_settings
for select using (auth.uid() = user_id);

create policy "Users can update own settings" on public.user_settings
for update using (auth.uid() = user_id);

create policy "Users can insert own settings" on public.user_settings
for insert with check (auth.uid() = user_id);

-- Connected accounts
create policy "Users can view own connected accounts" on public.connected_accounts
for select using (auth.uid() = user_id);

create policy "Users can insert own connected accounts" on public.connected_accounts
for insert with check (auth.uid() = user_id);

create policy "Users can update own connected accounts" on public.connected_accounts
for update using (auth.uid() = user_id);

create policy "Users can delete own connected accounts" on public.connected_accounts
for delete using (auth.uid() = user_id);

-- RSS feeds
create policy "Users can view own rss feeds" on public.rss_feeds
for select using (auth.uid() = user_id);

create policy "Users can insert own rss feeds" on public.rss_feeds
for insert with check (auth.uid() = user_id);

create policy "Users can update own rss feeds" on public.rss_feeds
for update using (auth.uid() = user_id);

create policy "Users can delete own rss feeds" on public.rss_feeds
for delete using (auth.uid() = user_id);

-- Admin items
create policy "Users can view own admin items" on public.admin_items
for select using (auth.uid() = user_id);

create policy "Users can insert own admin items" on public.admin_items
for insert with check (auth.uid() = user_id);

create policy "Users can update own admin items" on public.admin_items
for update using (auth.uid() = user_id);

create policy "Users can delete own admin items" on public.admin_items
for delete using (auth.uid() = user_id);

-- Item events
create policy "Users can view own item events" on public.item_events
for select using (auth.uid() = user_id);

create policy "Users can insert own item events" on public.item_events
for insert with check (auth.uid() = user_id);

-- Detected bills
create policy "Users can view own detected bills" on public.detected_bills
for select using (auth.uid() = user_id);

create policy "Users can insert own detected bills" on public.detected_bills
for insert with check (auth.uid() = user_id);

create policy "Users can update own detected bills" on public.detected_bills
for update using (auth.uid() = user_id);

create policy "Users can delete own detected bills" on public.detected_bills
for delete using (auth.uid() = user_id);

-- Tasks
create policy "Users can view own tasks" on public.tasks
for select using (auth.uid() = user_id);

create policy "Users can insert own tasks" on public.tasks
for insert with check (auth.uid() = user_id);

create policy "Users can update own tasks" on public.tasks
for update using (auth.uid() = user_id);

create policy "Users can delete own tasks" on public.tasks
for delete using (auth.uid() = user_id);

-- User rules
create policy "Users can view own rules" on public.user_rules
for select using (auth.uid() = user_id);

create policy "Users can insert own rules" on public.user_rules
for insert with check (auth.uid() = user_id);

create policy "Users can update own rules" on public.user_rules
for update using (auth.uid() = user_id);

create policy "Users can delete own rules" on public.user_rules
for delete using (auth.uid() = user_id);

-- Ingestion runs
create policy "Users can view own ingestion runs" on public.ingestion_runs
for select using (auth.uid() = user_id);

create policy "Users can insert own ingestion runs" on public.ingestion_runs
for insert with check (auth.uid() = user_id);

-- =========================================================
-- HELPFUL VIEWS
-- =========================================================

create or replace view public.today_priority_items as
select *
from public.admin_items
where status = 'new'
  and importance_score >= 50
order by
  case priority
    when 'urgent' then 1
    when 'high' then 2
    when 'medium' then 3
    else 4
  end,
  detected_due_date nulls last,
  created_at desc;

-- Note: RLS on underlying table still applies in Supabase when queried as authenticated user.

-- =========================================================
-- OPTIONAL DEFAULT RSS FEEDS
-- =========================================================
-- Insert user-specific default feeds in application code after signup, not globally here.
