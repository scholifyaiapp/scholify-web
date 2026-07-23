/*
 * 0021 — Affiliate / Preferred Partner program.
 *
 * The affiliate feature shipped fully wired (api/affiliate.ts, api/stripe.ts,
 * src/lib/affiliate.ts, the /partners + /partners/apply pages) but NO migration
 * ever created its tables — so every "Apply" submission failed server-side with
 * PostgREST "Could not find the table 'public.affiliates'", which the client
 * surfaced only as the generic "Couldn't submit — please try again." This
 * migration adds the two tables the code has always expected.
 *
 * Column names/types mirror the code exactly:
 *   - api/affiliate.ts   apply()  → inserts into affiliates
 *   - api/stripe.ts      recordCommission()/cancelCommissionForCustomer()
 *   - src/lib/affiliate.ts fetchAffiliateDashboard() reads both via RLS
 *
 * All writes use the service role (bypasses RLS). Clients only READ their own
 * rows, so RLS ships with SELECT-only policies scoped to auth.uid().
 */

-- ── Partners ───────────────────────────────────────────────────────────────
create table if not exists public.affiliates (
  id                uuid        primary key default gen_random_uuid(),
  user_id           uuid        references auth.users (id) on delete set null,
  name              text        not null,
  email             text        not null,
  university        text,
  country           text,
  socials           text,
  audience_size     text,
  area_of_study     text,
  code              text        not null unique,
  commission_rate   numeric     not null default 0.27,
  status            text        not null default 'pending',   -- pending | active | rejected
  clicks            integer     not null default 0,
  stripe_account_id text,
  created_at        timestamptz not null default now()
);

-- resolve() looks up an ACTIVE affiliate by code on every tracked click.
create index if not exists affiliates_code_idx on public.affiliates (code);
-- The dashboard fetches "my" row by user_id.
create index if not exists affiliates_user_idx on public.affiliates (user_id);

alter table public.affiliates enable row level security;

-- A signed-in partner may read only their own row; the API (service role) writes.
drop policy if exists affiliates_own_read on public.affiliates;
create policy affiliates_own_read on public.affiliates
  for select using (auth.uid() = user_id);

-- ── Commissions ────────────────────────────────────────────────────────────
create table if not exists public.affiliate_commissions (
  id                    uuid        primary key default gen_random_uuid(),
  affiliate_id          uuid        not null references public.affiliates (id) on delete cascade,
  -- Unique session id makes recordCommission() idempotent on webhook redelivery.
  stripe_session_id     text        unique,
  stripe_payment_intent text,
  stripe_customer_id    text,
  currency              text        not null default 'usd',
  sale_amount           integer     not null default 0,   -- cents
  commission_amount     integer     not null default 0,   -- cents
  status                text        not null default 'pending', -- pending | approved | paid | canceled
  available_after       timestamptz,
  created_at            timestamptz not null default now()
);

create index if not exists affiliate_commissions_affiliate_idx
  on public.affiliate_commissions (affiliate_id);
-- Refund/chargeback reversal matches on the Stripe customer.
create index if not exists affiliate_commissions_customer_idx
  on public.affiliate_commissions (stripe_customer_id);

alter table public.affiliate_commissions enable row level security;

-- A partner may read only the commissions belonging to their own affiliate row.
drop policy if exists affiliate_commissions_own_read on public.affiliate_commissions;
create policy affiliate_commissions_own_read on public.affiliate_commissions
  for select using (
    affiliate_id in (select id from public.affiliates where user_id = auth.uid())
  );
