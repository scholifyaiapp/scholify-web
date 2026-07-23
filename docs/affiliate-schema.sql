-- ─────────────────────────────────────────────────────────────────────────
--  Scholify affiliate / referral-partner schema (Phase 1)
--  Run this in the Supabase SQL editor. Safe to re-run (IF NOT EXISTS).
--
--  Model: a partner applies (pending) → you approve (active) → their code
--  attributes Stripe checkouts → a 27% commission is recorded (pending) and
--  becomes payable 30 days after purchase, unless refunded/disputed.
--  Payouts (Stripe Connect transfers) are Phase 2.
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.affiliates (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid references auth.users(id) on delete set null,
  name                text not null,
  email               text not null,
  university          text,
  country             text,
  socials             text,          -- Instagram / Telegram / LinkedIn handle(s)
  audience_size       text,
  area_of_study       text,
  code                text unique not null,          -- the ?ref / promo code, e.g. "LARA"
  commission_rate     numeric(4,3) not null default 0.270,  -- 0.270 = 27% (flat, all partners)
  status              text not null default 'pending',       -- pending | active | rejected
  clicks              integer not null default 0,
  stripe_account_id   text,                                  -- Connect account (Phase 2)
  created_at          timestamptz not null default now()
);

create table if not exists public.affiliate_commissions (
  id                   uuid primary key default gen_random_uuid(),
  affiliate_id         uuid not null references public.affiliates(id) on delete cascade,
  stripe_session_id    text unique,          -- idempotency: one row per checkout session
  stripe_payment_intent text,
  stripe_customer_id   text,
  currency             text not null default 'usd',
  sale_amount          integer not null,     -- cents
  commission_amount    integer not null,     -- cents
  status               text not null default 'pending',   -- pending | approved | canceled | paid
  available_after      timestamptz not null,               -- purchase + 30 days
  created_at           timestamptz not null default now()
);

create index if not exists affiliate_commissions_affiliate_idx on public.affiliate_commissions(affiliate_id);
create index if not exists affiliate_commissions_pi_idx on public.affiliate_commissions(stripe_payment_intent);

-- Row-Level Security: a partner can read their OWN affiliate row + commissions.
-- All writes happen server-side with the service role (apply endpoint + webhook),
-- which bypasses RLS — so we only add read policies here.
alter table public.affiliates enable row level security;
alter table public.affiliate_commissions enable row level security;

drop policy if exists "own affiliate row" on public.affiliates;
create policy "own affiliate row" on public.affiliates
  for select using (auth.uid() = user_id);

drop policy if exists "own commissions" on public.affiliate_commissions;
create policy "own commissions" on public.affiliate_commissions
  for select using (
    affiliate_id in (select id from public.affiliates where user_id = auth.uid())
  );
