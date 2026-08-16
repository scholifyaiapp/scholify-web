-- Make Stripe the sole billing rail while preserving existing subscription data.
do $$
begin
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'subscriptions' and column_name = 'paddle_subscription_id')
     and not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'subscriptions' and column_name = 'stripe_subscription_id') then
    alter table public.subscriptions rename column paddle_subscription_id to stripe_subscription_id;
  end if;

  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'subscriptions' and column_name = 'paddle_customer_id')
     and not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'subscriptions' and column_name = 'stripe_customer_id') then
    alter table public.subscriptions rename column paddle_customer_id to stripe_customer_id;
  end if;
end $$;

drop index if exists public.subscriptions_paddle_sub_idx;
create index if not exists subscriptions_stripe_sub_idx on public.subscriptions (stripe_subscription_id);
drop table if exists public.paddle_events;

update auth.users
set raw_app_meta_data = raw_app_meta_data - 'paddle_subscription_id' - 'paddle_customer_id'
where raw_app_meta_data ? 'paddle_subscription_id' or raw_app_meta_data ? 'paddle_customer_id';
