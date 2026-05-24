-- Accountability-partner schema.
-- Paste this into Supabase dashboard → SQL Editor → New query → Run.
-- Idempotent: safe to re-run.

create table if not exists public.partnerships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references auth.users(id) on delete cascade,
  partner_id uuid references auth.users(id) on delete cascade,
  plan_id uuid,
  partner_plan_id uuid,
  invite_code text unique,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  unique (requester_id, partner_id)
);

create index if not exists partnerships_requester_idx on public.partnerships(requester_id);
create index if not exists partnerships_partner_idx on public.partnerships(partner_id);
create index if not exists partnerships_status_idx on public.partnerships(status);

create table if not exists public.partner_notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid references auth.users(id) on delete cascade,
  sender_id uuid references auth.users(id),
  type text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists partner_notifications_recipient_idx
  on public.partner_notifications(recipient_id, created_at desc);

-- Row-level security: a user can read their own row on either side of the
-- partnership, and can read notifications addressed to them.
alter table public.partnerships enable row level security;
alter table public.partner_notifications enable row level security;

drop policy if exists "partnerships_select_own" on public.partnerships;
create policy "partnerships_select_own" on public.partnerships
  for select using (auth.uid() = requester_id or auth.uid() = partner_id);

drop policy if exists "partnerships_insert_own" on public.partnerships;
create policy "partnerships_insert_own" on public.partnerships
  for insert with check (auth.uid() = requester_id);

drop policy if exists "partnerships_update_own" on public.partnerships;
create policy "partnerships_update_own" on public.partnerships
  for update using (auth.uid() = requester_id or auth.uid() = partner_id);

drop policy if exists "partner_notifications_select_own" on public.partner_notifications;
create policy "partner_notifications_select_own" on public.partner_notifications
  for select using (auth.uid() = recipient_id);

drop policy if exists "partner_notifications_insert_any" on public.partner_notifications;
create policy "partner_notifications_insert_any" on public.partner_notifications
  for insert with check (auth.uid() = sender_id);

-- After running, enable Realtime on both tables:
-- Database → Replication → enable for `partnerships` and `partner_notifications`.
