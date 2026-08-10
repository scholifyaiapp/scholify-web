-- 0029 · The day-completion congratulation email.
--
-- WHY A COLUMN AND NOT A CLIENT FLAG. The app already knows locally that the day
-- is finished (scholify-day-complete in localStorage) and could simply refuse to
-- POST twice. That is not a guard: two tabs open on /study both finish the same
-- day, a learner clears site data, or a reload lands between the send and the
-- flag write — and each of those sends a second congratulation email from our
-- domain to the same address on the same day, which is precisely the pattern
-- Gmail's bulk-sender rules treat as spam.
--
-- So exactly-once lives here, as a LOCAL date claimed by a conditional update
-- before the mail is handed to Resend, exactly like the three reminder slots in
-- 0026. A local date, not UTC: a learner east of Greenwich finishing at 23:30
-- would otherwise cross a UTC midnight mid-evening and be able to claim the same
-- day twice.
--
-- The reminder slots and this one are independent on purpose: the congratulation
-- is transactional (it arrives because the learner did something) and must keep
-- working for someone who has switched the daily reminders off.

alter table public.study_reminders
  add column if not exists sent_done_date date;

comment on column public.study_reminders.sent_done_date is
  'LOCAL date of the last day-complete congratulation email. Claimed by a conditional update before sending, so a duplicate POST is a no-op.';

-- 0026 defaulted the three reminder switches to true, which is three emails a
-- day. The product promises TWO: half an hour before the session (soon) and two
-- hours after the start time if the day is still open (catchup). The 3-hour
-- heads-up is now opt-in, so existing rows that never explicitly asked for it
-- are moved off it once.
--
-- ── WHY THIS IS GUARDED, AND NOT JUST AN UPDATE ──────────────────────────────
-- scripts/apply-launch-db.mjs re-runs every listed migration on EVERY production
-- build. That is safe for pure DDL written with `if not exists`, and it is NOT
-- safe for a data migration: a bare
--
--     update public.study_reminders set lead_on = false where lead_on is true;
--
-- would fire again on the next deploy, and the next, silently switching the
-- 3-hour reminder back off for every learner who had deliberately turned it ON in
-- Settings in the meantime. The symptom surfaces weeks later as "my morning
-- reminder keeps disappearing", with nothing in the app to explain it.
--
-- So the backfill runs exactly once, gated on the state it is itself installing:
-- the column default. On the first run the default is still `true` (from 0026),
-- so the block flips the default and rewrites existing rows. On every later run
-- the default is already `false` and the block does nothing at all.
do $$
begin
  if coalesce(
       (select column_default
          from information_schema.columns
         where table_schema = 'public'
           and table_name = 'study_reminders'
           and column_name = 'lead_on'),
       'true'
     ) not like '%false%'
  then
    alter table public.study_reminders alter column lead_on set default false;

    -- One-time: move everyone who was opted in BY THE 0026 DEFAULT rather than by
    -- choice. There is no way to distinguish the two after the fact, so this
    -- deliberately resets all of them; Settings re-enables it on the next sync for
    -- anyone who wants it, and that write happens after this block can ever run again.
    update public.study_reminders set lead_on = false where lead_on is true;
  end if;
end $$;
