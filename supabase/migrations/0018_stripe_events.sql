-- 0018: exactly-once application of Stripe webhooks.
--
-- Stripe retries any non-2xx delivery, so recording each event id once makes
-- entitlement changes idempotent — a re-delivered checkout.session.completed
-- cannot double-grant. Service-role only; no user ever reads this.

create table if not exists public.stripe_events (
  event_id   text        primary key,
  applied_at timestamptz not null default now()
);

alter table public.stripe_events enable row level security;
-- No policies: only the service role (RLS-exempt) touches this table.

create index if not exists stripe_events_applied_at_idx
  on public.stripe_events (applied_at);
