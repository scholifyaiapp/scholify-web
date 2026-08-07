alter table public.affiliate_commissions
  add column if not exists payout_reference text;

comment on column public.affiliate_commissions.payout_reference is
  'External bank/card transfer reference entered only after the founder completes a manual payout. Never store PAN or CVV.';
