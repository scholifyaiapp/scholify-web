-- 0032 · Lifecycle emails: lapse win-backs and the weekly partner digest.
--
-- THE BACK-OFF. Until now the soon/catchup reminders fired EVERY day for any
-- opted-in learner who stopped studying — two emails a day, forever, to someone
-- who has already stopped listening. That is how a sender domain dies, and it
-- is also a large silent send volume nobody was watching. From this migration
-- on, a learner three or more days away from their last session leaves the
-- daily cadence entirely: they get ONE email on day 3, ONE on day 7, and then
-- silence until they return. Returning (a new last_session_date) re-arms both.
--
-- The two date columns are the exactly-once guards, in the same claim-before-
-- send discipline as 0026/0029. "Sent for this lapse episode" is expressed as
-- `sent_lapse*_date > last_session_date` — a new session resets the episode,
-- so the comparison (not the value) is what re-arms the email.
alter table public.study_reminders
  add column if not exists sent_lapse3_date date,
  add column if not exists sent_lapse7_date date;

comment on column public.study_reminders.sent_lapse3_date is
  'LOCAL date the day-3 win-back went out. Re-arms when last_session_date moves past it.';
comment on column public.study_reminders.sent_lapse7_date is
  'LOCAL date the day-7 win-back went out. After it, silence until the learner returns.';

-- The weekly partner digest: one email every Monday (UTC) summarising the
-- partner's week — new learners, new paid learners, commission earned, what has
-- matured for payout, and tier progress. The date column is the same
-- claim-before-send guard; equality with today's date is the dedupe.
alter table public.affiliates
  add column if not exists digest_sent_date date;

comment on column public.affiliates.digest_sent_date is
  'UTC date of the last weekly digest email. Claimed before sending; Monday-only.';
