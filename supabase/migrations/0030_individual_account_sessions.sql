-- 0030 · Individual-account session enforcement.
--
-- Supabase allows unlimited concurrent sessions by default. Scholify sells an
-- individual learning workspace: five people sharing one password would merge
-- answers, mock scores, notes and Charles conversations into one learner record,
-- while also exposing that private record to every person holding the password.
--
-- The client revokes older sessions after every explicit login. A revoked
-- session's short-lived JWT can nevertheless remain cryptographically valid until
-- its expiry, so getUser() alone cannot tell the old browser that its server-side
-- session has gone. This narrowly-scoped function checks the JWT's session_id
-- against auth.sessions. It returns only a boolean and can inspect only the
-- caller's own session; no session ids, IP addresses or user agents are exposed.

create or replace function public.is_current_auth_session_valid()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
      from auth.sessions as session
     where session.user_id = auth.uid()
       and session.id::text = auth.jwt() ->> 'session_id'
  );
$$;

revoke all on function public.is_current_auth_session_valid() from public;
grant execute on function public.is_current_auth_session_valid() to authenticated;

comment on function public.is_current_auth_session_valid() is
  'Returns whether the authenticated caller session still exists. Exposes no session metadata and is used to eject a browser promptly after another login replaces it.';
