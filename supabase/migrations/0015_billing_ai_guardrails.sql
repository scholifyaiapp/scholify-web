-- 0015: Phase 1 launch guardrails (Doc 10 §3) — three things that must be true
-- before a live Anthropic key and live Paddle keys are attached:
--
--   1. subscriptions       — entitlement source of truth + billing audit trail.
--   2. ai_usage_global     — an ORG-WIDE daily token budget. Per-user caps bound
--                            what one abuser costs; this bounds what a launch
--                            spike (or a bug) costs the company in a single day.
--   3. ai_rate             — a per-minute burst throttle inside the daily cap.
--   4. study_reminders     — the table the daily reminder cron has always
--                            assumed existed (it was writing to a dead name).
--
-- All four are written ONLY by the service role (api/*). Users may read their
-- own rows; nobody can write their own entitlement or usage.

/* ── 1. Subscriptions: the billing audit trail ───────────────────────────
 * app_metadata.plan stays the hot path (it rides in the JWT, so no read costs
 * a round-trip). This table is the durable record BEHIND it: every Paddle event
 * that changed an entitlement, with the price id and Paddle ids that caused it.
 * It answers "why does this user have Pro?" — which app_metadata alone cannot.
 */
create table if not exists public.subscriptions (
  user_id                uuid        primary key,
  plan                   text        not null default 'free',
  status                 text        not null default 'active',
  price_id               text,
  paddle_subscription_id text,
  paddle_customer_id     text,
  -- The Paddle event that last wrote this row: lets us detect replays and
  -- reconstruct the billing history from our own database.
  last_event_type        text,
  last_event_at          timestamptz,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index if not exists subscriptions_paddle_sub_idx
  on public.subscriptions (paddle_subscription_id);

alter table public.subscriptions enable row level security;

-- Read-your-own only. Writes are service-role (which bypasses RLS) — a user
-- must never be able to insert or update their own entitlement row.
drop policy if exists subscriptions_own_read on public.subscriptions;
create policy subscriptions_own_read on public.subscriptions
  for select using (auth.uid() = user_id);

/* ── 2. Org-wide daily AI budget ─────────────────────────────────────────
 * One row per UTC day for the whole org. api/lara.ts reads it before every
 * model call and fails closed (deterministic fallback, never an error) once
 * AI_DAILY_TOKEN_BUDGET is exhausted.
 */
create table if not exists public.ai_usage_global (
  day        date        primary key,
  calls      integer     not null default 0,
  tokens_in  bigint      not null default 0,
  tokens_out bigint      not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.ai_usage_global enable row level security;
-- No policy at all: only the service role (RLS-exempt) may touch it. Org spend
-- is not a user's business.

create or replace function public.increment_ai_global(
  p_day        date,
  p_tokens_in  bigint default 0,
  p_tokens_out bigint default 0
) returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  total bigint;
begin
  insert into public.ai_usage_global (day, calls, tokens_in, tokens_out)
  values (p_day, 1, p_tokens_in, p_tokens_out)
  on conflict (day) do update
    set calls      = ai_usage_global.calls + 1,
        tokens_in  = ai_usage_global.tokens_in + excluded.tokens_in,
        tokens_out = ai_usage_global.tokens_out + excluded.tokens_out,
        updated_at = now()
  returning tokens_in + tokens_out into total;
  return total;
end
$$;

revoke all on function public.increment_ai_global(date, bigint, bigint) from public;
revoke all on function public.increment_ai_global(date, bigint, bigint) from anon;
revoke all on function public.increment_ai_global(date, bigint, bigint) from authenticated;

/* ── 3. Per-minute burst throttle ────────────────────────────────────────
 * The daily cap allows 100 tutor calls; nothing stopped a script firing all 100
 * in ten seconds. bump_ai_rate atomically increments the caller's counter for
 * the current minute and returns the new value — check-then-act in one round
 * trip, so two concurrent requests can't both see "under the limit".
 */
create table if not exists public.ai_rate (
  user_id uuid        not null,
  minute  timestamptz not null,
  count   integer     not null default 0,
  primary key (user_id, minute)
);

alter table public.ai_rate enable row level security;
-- Service-role only, like ai_usage_global.

create or replace function public.bump_ai_rate(
  p_user   uuid,
  p_minute timestamptz
) returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count integer;
begin
  insert into public.ai_rate (user_id, minute, count)
  values (p_user, p_minute, 1)
  on conflict (user_id, minute) do update
    set count = ai_rate.count + 1
  returning count into new_count;

  -- Opportunistic garbage collection: these rows are worthless after an hour.
  delete from public.ai_rate where minute < now() - interval '1 hour';

  return new_count;
end
$$;

revoke all on function public.bump_ai_rate(uuid, timestamptz) from public;
revoke all on function public.bump_ai_rate(uuid, timestamptz) from anon;
revoke all on function public.bump_ai_rate(uuid, timestamptz) from authenticated;

/* ── 4. Study reminders ──────────────────────────────────────────────────
 * api/reminders.ts has always upserted into a `vocab_reminders` table that no
 * migration ever created — so the Settings toggle silently no-opped and the
 * daily cron always found zero rows. This is that table, under its real name.
 */
create table if not exists public.study_reminders (
  user_id           uuid        primary key,
  email             text        not null,
  opt_in            boolean     not null default false,
  reminder_time     text        not null default '08:00',
  last_session_date date,
  last_reminded     date,
  updated_at        timestamptz not null default now()
);

alter table public.study_reminders enable row level security;

-- The user may read their own preference; the API (service role) writes it.
drop policy if exists study_reminders_own_read on public.study_reminders;
create policy study_reminders_own_read on public.study_reminders
  for select using (auth.uid() = user_id);

-- The cron scans opt-in rows daily; keep that scan cheap.
create index if not exists study_reminders_optin_idx
  on public.study_reminders (opt_in) where opt_in;
