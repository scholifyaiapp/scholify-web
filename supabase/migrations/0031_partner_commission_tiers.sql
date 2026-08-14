/*
 * Performance partner commissions.
 *
 * A referral locks its 1/3/5-payment window when the learner first pays. Each
 * paid Stripe invoice is one auditable commission row, while annual plans keep
 * a one-payment window because their full year is collected up front.
 */

alter table public.affiliate_referrals
  add column if not exists stripe_customer_id text;
alter table public.affiliate_referrals
  add column if not exists first_paid_at timestamptz;
alter table public.affiliate_referrals
  add column if not exists commission_cycles smallint not null default 1;

create unique index if not exists affiliate_referrals_customer_unique_idx
  on public.affiliate_referrals (stripe_customer_id)
  where stripe_customer_id is not null;
create index if not exists affiliate_referrals_paid_tier_idx
  on public.affiliate_referrals (affiliate_id, first_paid_at)
  where first_paid_at is not null;

/* Preserve the paid-customer totals already visible before this migration.
 * Stripe customer ids are service-role app metadata, then the earliest valid
 * historical commission proves when that referral first paid. */
do $$
begin
  if exists (
    select 1
      from public.affiliate_referrals as referral
      join auth.users as auth_user on auth_user.id = referral.referred_user_id
     where referral.stripe_customer_id is null
       and nullif(auth_user.raw_app_meta_data ->> 'stripe_customer_id', '') is not null
  ) then
    update public.affiliate_referrals as referral
       set stripe_customer_id = nullif(auth_user.raw_app_meta_data ->> 'stripe_customer_id', '')
      from auth.users as auth_user
     where auth_user.id = referral.referred_user_id
       and referral.stripe_customer_id is null
       and nullif(auth_user.raw_app_meta_data ->> 'stripe_customer_id', '') is not null;
  end if;

  if exists (
    select 1
      from public.affiliate_referrals as linked
      join public.affiliate_commissions as commission
        on commission.affiliate_id = linked.affiliate_id
       and commission.stripe_customer_id = linked.stripe_customer_id
       and commission.status <> 'canceled'
     where linked.first_paid_at is null
  ) then
    update public.affiliate_referrals as referral
       set first_paid_at = history.first_paid_at
      from (
        select linked.id, min(commission.created_at) as first_paid_at
          from public.affiliate_referrals as linked
          join public.affiliate_commissions as commission
            on commission.affiliate_id = linked.affiliate_id
           and commission.stripe_customer_id = linked.stripe_customer_id
           and commission.status <> 'canceled'
         where linked.first_paid_at is null
         group by linked.id
      ) as history
     where referral.id = history.id;
  end if;
end $$;

alter table public.affiliate_commissions
  add column if not exists stripe_invoice_id text;
alter table public.affiliate_commissions
  add column if not exists billing_cycle smallint;
alter table public.affiliate_commissions
  add column if not exists commission_cycles smallint;
alter table public.affiliate_commissions
  add column if not exists plan text;

create unique index if not exists affiliate_commissions_invoice_unique_idx
  on public.affiliate_commissions (stripe_invoice_id)
  where stripe_invoice_id is not null;

do $$
begin
  if exists (select 1 from public.affiliate_commissions where billing_cycle is null and stripe_customer_id is not null) then
    with ranked as (
      select id,
             row_number() over (partition by affiliate_id, stripe_customer_id order by created_at, id) as cycle
        from public.affiliate_commissions
       where stripe_customer_id is not null
    )
    update public.affiliate_commissions as commission
       set billing_cycle = ranked.cycle,
           commission_cycles = coalesce(commission.commission_cycles, 1)
      from ranked
     where commission.id = ranked.id
       and commission.billing_cycle is null;
  end if;
end $$;

/* Click tracking used to finish the HTTP response before its database update
 * and performed a racy read/modify/write. One awaited atomic increment fixes
 * both failure modes. */
create or replace function public.increment_affiliate_click(target_affiliate_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.affiliates
     set clicks = clicks + 1
   where id = target_affiliate_id
     and status = 'active';
$$;

revoke all on function public.increment_affiliate_click(uuid) from public;
grant execute on function public.increment_affiliate_click(uuid) to service_role;
