/*
 * Exact partner invite attribution.
 *
 * One authenticated Scholify account can be credited to one partner exactly
 * once. Clicks remain a traffic metric; this table is the source of truth for
 * "invited users".
 */
create table if not exists public.affiliate_referrals (
  id            uuid        primary key default gen_random_uuid(),
  affiliate_id  uuid        not null references public.affiliates (id) on delete cascade,
  referred_user_id uuid     not null references auth.users (id) on delete cascade,
  created_at    timestamptz not null default now(),
  unique (referred_user_id)
);

create index if not exists affiliate_referrals_affiliate_idx
  on public.affiliate_referrals (affiliate_id);

alter table public.affiliate_referrals enable row level security;

drop policy if exists affiliate_referrals_partner_read on public.affiliate_referrals;
create policy affiliate_referrals_partner_read on public.affiliate_referrals
  for select using (
    affiliate_id in (select id from public.affiliates where user_id = auth.uid())
  );

-- Prevent the same person from submitting several partner applications.
create unique index if not exists affiliates_email_unique_idx
  on public.affiliates (lower(email));

-- Audit when the founder records a manual payout.
alter table public.affiliate_commissions
  add column if not exists paid_at timestamptz;
