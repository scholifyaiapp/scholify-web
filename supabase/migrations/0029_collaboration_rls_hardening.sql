/*
 * 0029 — Harden legacy collaboration RLS.
 *
 * Policy-only and backward compatible: no rows or columns are changed. These
 * features currently have no active UI, but their tables remain reachable via
 * PostgREST, so their authorization boundaries must still be safe.
 */

-- SECURITY DEFINER membership checks avoid recursive RLS policies (a policy on
-- rooms selecting memberships whose policy selects rooms again). Parameters
-- always include auth.uid(); callers cannot use these helpers to enumerate.
create or replace function public.is_room_member(target_room uuid, target_user uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select target_user = auth.uid() and exists (
    select 1 from public.room_members
    where room_id = target_room and user_id = target_user
  );
$$;

revoke all on function public.is_room_member(uuid, uuid) from public;
grant execute on function public.is_room_member(uuid, uuid) to authenticated;

create or replace function public.is_team_member(target_team uuid, target_user uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select target_user = auth.uid() and exists (
    select 1 from public.team_members
    where team_id = target_team and user_id = target_user
  );
$$;

revoke all on function public.is_team_member(uuid, uuid) from public;
grant execute on function public.is_team_member(uuid, uuid) to authenticated;

drop policy if exists "study_rooms_select_public_or_member" on public.study_rooms;
create policy "study_rooms_select_public_or_member" on public.study_rooms
  for select using (
    is_private = false
    or auth.uid() = creator_id
    or public.is_room_member(id, auth.uid())
  );

drop policy if exists "room_messages_select_member" on public.room_messages;
create policy "room_messages_select_member" on public.room_messages
  for select using (public.is_room_member(room_id, auth.uid()));

drop policy if exists "room_messages_insert_member" on public.room_messages;
create policy "room_messages_insert_member" on public.room_messages
  for insert with check (
    auth.uid() = user_id and public.is_room_member(room_id, auth.uid())
  );

-- Notifications may only be sent between users who already share a partnership.
drop policy if exists "partner_notifications_insert_any" on public.partner_notifications;
create policy "partner_notifications_insert_partner" on public.partner_notifications
  for insert with check (
    auth.uid() = sender_id
    and recipient_id is not null
    and recipient_id <> sender_id
    and char_length(message) between 1 and 1000
    and exists (
      select 1 from public.partnerships p
      where p.status = 'active'
        and (
          (p.requester_id = sender_id and p.partner_id = recipient_id)
          or (p.partner_id = sender_id and p.requester_id = recipient_id)
        )
    )
  );

-- A member cannot discover a private room UUID and silently join it. Private
-- room membership must be added by the room creator until an invite RPC exists.
drop policy if exists "room_members_insert_self" on public.room_members;
create policy "room_members_insert_authorized" on public.room_members
  for insert with check (
    auth.uid() = user_id
    and role = 'member'
    and exists (
      select 1 from public.study_rooms r
      where r.id = room_id
        and (r.is_private = false or r.creator_id = auth.uid())
    )
  );

-- Avoid self-referential RLS recursion while keeping a user's own membership
-- visible. Room creators can also inspect their room roster.
drop policy if exists "room_members_select_member" on public.room_members;
create policy "room_members_select_authorized" on public.room_members
  for select using (
    auth.uid() = user_id
    or exists (
      select 1 from public.study_rooms r
      where r.id = room_id and r.creator_id = auth.uid()
    )
  );

-- Self-service team joining now requires a live invite addressed to the JWT's
-- verified email. Team admins retain the ability to add members explicitly.
drop policy if exists "team_members_insert_self_or_admin" on public.team_members;
create policy "team_members_insert_invited_or_admin" on public.team_members
  for insert with check (
    (
      auth.uid() = user_id
      and role = 'member'
      and exists (
        select 1 from public.team_invites i
        where i.team_id = team_id
          and lower(i.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
          and i.accepted_at is null
          and i.expires_at > now()
      )
    )
    or exists (
      select 1 from public.teams t
      where t.id = team_id and t.admin_id = auth.uid()
    )
  );

-- Remove the self-query that can recurse under RLS. Members see their own row;
-- team admins see the complete roster.
drop policy if exists "team_members_select" on public.team_members;
create policy "team_members_select_authorized" on public.team_members
  for select using (
    auth.uid() = user_id
    or exists (
      select 1 from public.teams t
      where t.id = team_id and t.admin_id = auth.uid()
    )
  );

drop policy if exists "teams_select_member" on public.teams;
create policy "teams_select_member" on public.teams
  for select using (
    auth.uid() = admin_id or public.is_team_member(id, auth.uid())
  );

drop policy if exists "team_announcements_select" on public.team_announcements;
create policy "team_announcements_select" on public.team_announcements
  for select using (
    public.is_team_member(team_id, auth.uid())
    or exists (
      select 1 from public.teams t
      where t.id = team_id and t.admin_id = auth.uid()
    )
  );
