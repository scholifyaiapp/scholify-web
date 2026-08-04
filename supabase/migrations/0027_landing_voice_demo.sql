create table if not exists public.landing_voice_usage (
  visitor_hash text not null,
  day date not null,
  turns integer not null default 0,
  primary key (visitor_hash, day)
);

alter table public.landing_voice_usage enable row level security;

create or replace function public.take_landing_voice_turn(
  p_visitor_hash text,
  p_day date,
  p_cap integer
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  next_count integer;
begin
  insert into public.landing_voice_usage (visitor_hash, day, turns)
  values (p_visitor_hash, p_day, 1)
  on conflict (visitor_hash, day) do update
    set turns = landing_voice_usage.turns + 1
    where landing_voice_usage.turns < p_cap
  returning turns into next_count;
  return next_count is not null and next_count <= p_cap;
end;
$$;

revoke all on function public.take_landing_voice_turn(text, date, integer) from public, anon, authenticated;
grant execute on function public.take_landing_voice_turn(text, date, integer) to service_role;
