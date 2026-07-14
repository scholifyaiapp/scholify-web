-- 0017: exactly-once application of Paddle webhooks.
--
-- The HMAC proves Paddle signed a payload; it does not prove the payload is
-- fresh or that we haven't already acted on it. Paddle retries on any non-2xx,
-- and a captured body can be replayed inside the signature's freshness window.
-- Recording each event id once makes entitlement changes idempotent: a replayed
-- `subscription.activated` cannot re-grant a plan after cancellation.
--
-- Service-role only. No user ever reads this.

create table if not exists public.paddle_events (
  event_id   text        primary key,
  applied_at timestamptz not null default now()
);

alter table public.paddle_events enable row level security;
-- No policies: only the service role (RLS-exempt) touches this table.

-- Billing history is worth keeping, but the dedupe window doesn't need to be
-- infinite; prune anything older than 90 days when convenient.
create index if not exists paddle_events_applied_at_idx
  on public.paddle_events (applied_at);
