-- 0026 · Practice-time reminders: three a day, in the learner's own clock.
--
-- WHAT WAS WRONG. study_reminders (0015) stored `reminder_time` and NOTHING
-- ever read it: api/reminders.ts?action=send filtered only on "hasn't studied
-- today", so the learner's chosen time was decorative and everyone was mailed
-- whenever the single Vercel cron fired — 08:00 UTC, which is 13:00 in
-- Tashkent and 03:00 in New York. There was also no timezone column at all, so
-- the server could not have honoured the time even if it had tried.
--
-- WHAT THIS ADDS.
--   · timezone      — the IANA zone (e.g. 'Asia/Tashkent'). The zone, not a
--                     fixed offset, so DST is handled by the server's ICU data
--                     instead of going an hour wrong twice a year.
--   · practice_time — when the learner said their session starts (onboarding
--                     step 5/8, editable in Settings). The three reminders are
--                     all derived from this one clock.
--   · three per-slot switches, so a learner can keep the 10-minute nudge and
--     drop the others without turning the whole system off.
--   · three per-slot sent-dates. These are what make delivery exactly-once:
--     the sender runs every 5 minutes with a tolerant match window, so the
--     guard against sending twice cannot be the window — it has to be a
--     durable "already sent on this LOCAL date" record, one per slot.
--
-- The dates are LOCAL dates, deliberately. A UTC date rolls over mid-evening
-- for eastern learners, which would let a slot fire twice in one of their days.

alter table public.study_reminders
  add column if not exists timezone          text not null default 'UTC',
  add column if not exists practice_time     text not null default '19:00',
  add column if not exists lead_on           boolean not null default true,
  add column if not exists soon_on           boolean not null default true,
  add column if not exists catchup_on        boolean not null default true,
  add column if not exists sent_lead_date    date,
  add column if not exists sent_soon_date    date,
  add column if not exists sent_catchup_date date;

-- Carry the old preference over rather than resetting everyone to 19:00: for
-- existing rows `reminder_time` IS the hour they chose to be contacted.
update public.study_reminders
   set practice_time = reminder_time
 where reminder_time is not null
   and reminder_time <> ''
   and practice_time = '19:00';

-- The sender scans opted-in rows every 5 minutes and must stay cheap as the
-- table grows; it never reads opted-out rows.
create index if not exists study_reminders_opt_in_idx
  on public.study_reminders (opt_in)
  where opt_in = true;

comment on column public.study_reminders.timezone is
  'IANA zone, e.g. Asia/Tashkent. Set from the browser at sync time.';
comment on column public.study_reminders.practice_time is
  'HH:MM local. All three reminders are offsets from this: -3h, -10m, +2h30.';


/* ──────────────────────────────────────────────────────────────────────────
 * THE SCHEDULER
 *
 * Vercel Hobby allows 2 cron jobs and triggers them once per day, so a
 * "10 minutes before your session" reminder is not buildable on Vercel cron —
 * it needs a caller every ~5 minutes. pg_cron runs inside the Postgres this
 * project already pays for, at any frequency, so that is what drives it.
 *
 * SETUP — once, in the Supabase dashboard (SQL editor, as postgres):
 *
 *   1. Enable the two extensions (Database → Extensions, or):
 *        create extension if not exists pg_cron  with schema pg_catalog;
 *        create extension if not exists pg_net   with schema extensions;
 *
 *   2. Store the shared secret so it is NOT written in plaintext into
 *      cron.job, which any dashboard viewer can read. It must be the same
 *      value as CRON_SECRET in Vercel:
 *        select vault.create_secret('<the CRON_SECRET value>', 'reminder_cron_secret');
 *
 *   3. Schedule it (this block is idempotent — safe to re-run):
 *        select cron.unschedule('scholify-practice-reminders')
 *         where exists (select 1 from cron.job where jobname = 'scholify-practice-reminders');
 *
 *        select cron.schedule(
 *          'scholify-practice-reminders',
 *          '<every five minutes>',
 *          $$
 *          select net.http_get(
 *            url     := 'https://www.scholifyapp.com/api/reminders?action=send',
 *            headers := jsonb_build_object(
 *              'Authorization',
 *              'Bearer ' || (select decrypted_secret
 *                              from vault.decrypted_secrets
 *                             where name = 'reminder_cron_secret')
 *            ),
 *            timeout_milliseconds := 25000
 *          );
 *          $$
 *        );
 *
 * VERIFYING IT RUNS:
 *   select jobname, schedule, active from cron.job;
 *   select status, return_message, start_time
 *     from cron.job_run_details
 *    where jobid = (select jobid from cron.job where jobname = 'scholify-practice-reminders')
 *    order by start_time desc limit 20;
 *
 * The endpoint is idempotent and cheap when nothing is due (it returns
 * { sent: 0 }), so a missed tick self-heals on the next one: the match window
 * is wider than the tick interval precisely so a single skipped run does not
 * drop a learner's reminder.
 *
 * The schedule example above is inside a SQL comment, so nothing here executes it — these
 * are instructions, run by hand once, because enabling extensions and writing
 * to vault both need privileges a migration run by the app role does not have.
 * ────────────────────────────────────────────────────────────────────────── */
