-- 0016: calendar_accounts — the table that was never in a migration.
--
-- `api/calendar-callback.ts` upserts into it with the SERVICE ROLE, and
-- `src/lib/calendar.ts` reads it FROM THE BROWSER with the anon key. It holds
-- `google_refresh_token` and `calcom_api_key` — long-lived credentials to a
-- user's Google account.
--
-- Because no migration ever created it, any table that exists in production was
-- made by hand in the SQL editor — where RLS is OFF BY DEFAULT. With RLS off,
-- the anon key can read EVERY row: one signed-in user could exfiltrate every
-- user's Google refresh tokens. This migration makes the table's definition and
-- its RLS explicit, and is safe to run whether or not the table already exists.

create table if not exists public.calendar_accounts (
  user_id               uuid        primary key,
  provider              text        not null default 'google',
  google_access_token   text,
  google_refresh_token  text,
  google_token_expiry   timestamptz,
  calcom_api_key        text,
  calendar_sync_enabled boolean     not null default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- Idempotent even if the table pre-exists with a subset of columns.
alter table public.calendar_accounts add column if not exists provider              text        not null default 'google';
alter table public.calendar_accounts add column if not exists google_access_token   text;
alter table public.calendar_accounts add column if not exists google_refresh_token  text;
alter table public.calendar_accounts add column if not exists google_token_expiry   timestamptz;
alter table public.calendar_accounts add column if not exists calcom_api_key        text;
alter table public.calendar_accounts add column if not exists calendar_sync_enabled boolean     not null default false;
alter table public.calendar_accounts add column if not exists updated_at            timestamptz not null default now();

-- The whole point of this file.
alter table public.calendar_accounts enable row level security;

-- A user may only ever see and change THEIR OWN calendar row. The service role
-- (used by api/calendar-callback.ts) bypasses RLS and is unaffected.
drop policy if exists calendar_accounts_own_select on public.calendar_accounts;
create policy calendar_accounts_own_select on public.calendar_accounts
  for select using (auth.uid() = user_id);

drop policy if exists calendar_accounts_own_insert on public.calendar_accounts;
create policy calendar_accounts_own_insert on public.calendar_accounts
  for insert with check (auth.uid() = user_id);

drop policy if exists calendar_accounts_own_update on public.calendar_accounts;
create policy calendar_accounts_own_update on public.calendar_accounts
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists calendar_accounts_own_delete on public.calendar_accounts;
create policy calendar_accounts_own_delete on public.calendar_accounts
  for delete using (auth.uid() = user_id);
