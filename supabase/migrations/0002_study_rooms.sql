-- Study Rooms — public + private group study spaces.
-- Paste into Supabase SQL Editor → Run. Idempotent.

create table if not exists public.study_rooms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  goal text not null,
  description text,
  category text default 'general',
  creator_id uuid references auth.users(id) on delete cascade,
  plan_id uuid,
  max_members integer not null default 10 check (max_members between 2 and 10),
  is_private boolean not null default false,
  invite_code text unique default substr(md5(random()::text), 1, 8),
  exam_date date,
  created_at timestamptz not null default now()
);

create index if not exists study_rooms_creator_idx on public.study_rooms(creator_id);
create index if not exists study_rooms_category_idx on public.study_rooms(category);
create index if not exists study_rooms_invite_code_idx on public.study_rooms(invite_code);

create table if not exists public.room_members (
  id uuid primary key default gen_random_uuid(),
  room_id uuid references public.study_rooms(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text not null default 'member',
  joined_at timestamptz not null default now(),
  unique (room_id, user_id)
);

create index if not exists room_members_room_idx on public.room_members(room_id);
create index if not exists room_members_user_idx on public.room_members(user_id);

create table if not exists public.room_messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid references public.study_rooms(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  content text not null,
  message_type text not null default 'message',
  created_at timestamptz not null default now()
);

create index if not exists room_messages_room_time_idx
  on public.room_messages(room_id, created_at desc);

-- ── RLS ─────────────────────────────────────────────────────────────────────
alter table public.study_rooms enable row level security;
alter table public.room_members enable row level security;
alter table public.room_messages enable row level security;

-- Anyone can see public rooms in the discover list. Members can always see
-- their own rooms (public or private).
drop policy if exists "study_rooms_select_public_or_member" on public.study_rooms;
create policy "study_rooms_select_public_or_member" on public.study_rooms
  for select using (
    is_private = false
    or auth.uid() = creator_id
    or exists (
      select 1 from public.room_members rm
      where rm.room_id = study_rooms.id and rm.user_id = auth.uid()
    )
  );

drop policy if exists "study_rooms_insert_own" on public.study_rooms;
create policy "study_rooms_insert_own" on public.study_rooms
  for insert with check (auth.uid() = creator_id);

drop policy if exists "study_rooms_update_creator" on public.study_rooms;
create policy "study_rooms_update_creator" on public.study_rooms
  for update using (auth.uid() = creator_id);

drop policy if exists "study_rooms_delete_creator" on public.study_rooms;
create policy "study_rooms_delete_creator" on public.study_rooms
  for delete using (auth.uid() = creator_id);

-- Members: any room participant can list other members.
drop policy if exists "room_members_select_member" on public.room_members;
create policy "room_members_select_member" on public.room_members
  for select using (
    exists (
      select 1 from public.room_members rm2
      where rm2.room_id = room_members.room_id and rm2.user_id = auth.uid()
    )
  );

drop policy if exists "room_members_insert_self" on public.room_members;
create policy "room_members_insert_self" on public.room_members
  for insert with check (auth.uid() = user_id);

drop policy if exists "room_members_delete_self" on public.room_members;
create policy "room_members_delete_self" on public.room_members
  for delete using (auth.uid() = user_id);

-- Messages: only members can read/write room messages.
drop policy if exists "room_messages_select_member" on public.room_messages;
create policy "room_messages_select_member" on public.room_messages
  for select using (
    exists (
      select 1 from public.room_members rm
      where rm.room_id = room_messages.room_id and rm.user_id = auth.uid()
    )
  );

drop policy if exists "room_messages_insert_member" on public.room_messages;
create policy "room_messages_insert_member" on public.room_messages
  for insert with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.room_members rm
      where rm.room_id = room_messages.room_id and rm.user_id = auth.uid()
    )
  );

-- After running, enable Realtime on `room_messages` and (optionally)
-- `room_members` in: Database → Replication.
