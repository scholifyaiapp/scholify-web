-- 0013: AI usage metering — per user, per day, per action.
-- Written by the service role from api/lara.ts; users can read their own rows.
-- This is the CFO guardrail: no metering table = no live AI spend.

create table if not exists public.ai_usage (
  user_id    uuid        not null,
  day        date        not null,
  action     text        not null,
  count      integer     not null default 0,
  tokens_in  bigint      not null default 0,
  tokens_out bigint      not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, day, action)
);

alter table public.ai_usage enable row level security;

-- Users may see their own usage (future in-app meter display); only the
-- service role (which bypasses RLS) may write.
drop policy if exists ai_usage_own_read on public.ai_usage;
create policy ai_usage_own_read on public.ai_usage
  for select using (auth.uid() = user_id);

-- Atomic increment used after each successful model call.
create or replace function public.increment_ai_usage(
  p_user       uuid,
  p_day        date,
  p_action     text,
  p_tokens_in  bigint default 0,
  p_tokens_out bigint default 0
) returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count integer;
begin
  insert into public.ai_usage (user_id, day, action, count, tokens_in, tokens_out)
  values (p_user, p_day, p_action, 1, p_tokens_in, p_tokens_out)
  on conflict (user_id, day, action) do update
    set count      = ai_usage.count + 1,
        tokens_in  = ai_usage.tokens_in + excluded.tokens_in,
        tokens_out = ai_usage.tokens_out + excluded.tokens_out,
        updated_at = now()
  returning count into new_count;
  return new_count;
end
$$;

revoke all on function public.increment_ai_usage(uuid, date, text, bigint, bigint) from public;
revoke all on function public.increment_ai_usage(uuid, date, text, bigint, bigint) from anon;
revoke all on function public.increment_ai_usage(uuid, date, text, bigint, bigint) from authenticated;
