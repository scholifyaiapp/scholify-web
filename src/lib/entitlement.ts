/*
 * Entitlement — the single source of truth for "what can this user access?"
 *
 * Before this, `isPro` was computed inline in four places as
 * `plan && plan !== "free"`. That was (a) duplicated, so the trial would have
 * had to be added in four places, and (b) blind to the trial entirely. Every
 * gate now asks this one function.
 *
 * The model, in priority order:
 *   1. A PAID plan (beginner / pro / annual_pro) — set only by the billing
 *      webhook, in service-role-only app_metadata. This is the real thing.
 *   2. An active TRIAL — `trial_ends_at` in the future, also written only by the
 *      server. A user cannot forge either field,
 *      because app_metadata is not client-writable.
 *   3. Otherwise, free.
 *
 * A legacy promotional trial grants Pro-level access without touching `plan`;
 * Stripe-backed Pro trials use `plan_status: trialing`.
 * stays clean and a real subscription always wins over (and outlives) a trial.
 */

/** Every paying tier. `isPaid` (→ all 15 papers) is true for any of these. */
const PAID_PLANS = new Set(["beginner", "pro", "annual_pro"])
/** The PRO tier only — unlocks the premium modes (mocks / examiner / custom). */
const PRO_PLANS = new Set(["pro", "annual_pro"])

const DAY_MS = 24 * 60 * 60 * 1000

/* ── The dunning policy ────────────────────────────────────────────
 *
 * A card fails. What happens next is a commercial decision, not a technical
 * one, and it was previously left entirely to Stripe's retry settings — which
 * meant `plan` stayed "pro" and BOTH this file and the server-side AI meter
 * kept handing out the full Pro tier, indefinitely, to an account that had
 * paid nothing. A 3-day trial on an empty card bought weeks of free mocks and
 * AI Examiner marking at our model cost.
 *
 * The policy now, in one place:
 *
 *   1. A failed payment is usually an EXPIRED CARD, not a thief. So we do not
 *      lock the door: for GRACE_DAYS they keep everything they study with —
 *      all 15 papers, chapters, question banks, flashcards, analytics, the
 *      daily plan. Exactly the Beginner tier.
 *   2. What they lose immediately is the expensive half: timed mocks, the AI
 *      Examiner and custom AI practice. Those cost us real money per call and
 *      are the reason Pro costs more than Beginner.
 *   3. The window is OURS, not Stripe's. After GRACE_DAYS the account is free
 *      and hits the wall, whatever the dashboard's retry schedule says. A
 *      misconfigured "leave subscription past due" can no longer mean free
 *      Pro forever.
 *
 * `past_due_since` is stamped by the billing webhook and cleared the moment a
 * payment succeeds. When it is missing (an older row) the grace period is
 * treated as still running, so nobody is cut off by a field we never wrote.
 */
export const GRACE_DAYS = 7

export interface Entitlement {
  /** The raw plan string ("free" when there is no subscription). */
  plan: string
  /** A paying customer (Beginner, Pro or Annual) — unlocks all 15 papers. */
  isPaid: boolean
  /** Beginner tier specifically (paid, but NOT the premium modes). */
  isBeginner: boolean
  /** A free trial is active (and there is no paid plan). */
  isTrial: boolean
  /**
   * PRO-level access — unlocks timed mocks, the AI Examiner and custom AI
   * practice. True for the Pro/Annual tier, an active trial, OR an active
   * subscription whose price id wasn't mapped (unknown tier → grant full rather
   * than under-serve a paying customer). Beginner is paid but NOT pro.
   */
  isPro: boolean
  /** ISO end of the trial, or null. */
  trialEndsAt: string | null
  /** Whole days of trial remaining (0 when none / expired). */
  trialDaysLeft: number
  /** This account has started a trial before — so it can't get another. */
  hadTrial: boolean
  /** A payment failed and the grace window is still open. Pro modes are off. */
  isPastDue: boolean
  /** Whole days of grace remaining (0 once the window has closed). */
  graceDaysLeft: number
}

interface MetaCarrier {
  app_metadata?: Record<string, unknown> | null
}

/**
 * Resolve a user's entitlement from their auth metadata. `now` is injectable so
 * this is testable without mocking the clock.
 */
export function entitlementOf(user: MetaCarrier | null | undefined, now: number = Date.now()): Entitlement {
  const meta = user?.app_metadata ?? {}
  const plan = String(meta.plan ?? "free")
  // A live subscription counts as paid even if its price id wasn't mapped to a
  // known plan name (mis-provisioned Stripe env) — otherwise a genuinely paying
  // customer would be treated as "free" and trapped behind the expired wall.
  //
  // "canceling" is cancel_at_period_end, NOT cancelled: the customer has paid
  // through the end of the current period and keeps everything until Stripe's
  // webhook reports the subscription actually lapsed (which writes "canceled"
  // and plan "free"). Treating it as inactive revoked access the instant someone
  // pressed Cancel — while Settings promised "access stays until then" and the
  // dialog promised "you'll lose workspace access at the end of your billing
  // period". It bit hardest exactly where the clause above is meant to help: a
  // customer on an unmapped price id has no PAID_PLANS entry to fall back on, so
  // `plan_status` was the only thing keeping them entitled.
  const planStatusActive = meta.plan_status === "active" || meta.plan_status === "trialing" || meta.plan_status === "canceling"

  /*
   * PAST DUE. Stripe kept `plan: "pro"` here, and PAID_PLANS.has("pro") alone
   * used to make both isPaid and isPro true — a non-payer with the whole
   * product. The grace clock decides instead: inside the window they hold
   * Beginner-level access, outside it they are free and meet the wall.
   */
  const pastDueSince = meta.plan_status === "past_due" && typeof meta.past_due_since === "string"
    ? Date.parse(meta.past_due_since)
    : NaN
  const graceMsLeft = Number.isFinite(pastDueSince)
    ? pastDueSince + GRACE_DAYS * DAY_MS - now
    // No stamp (a row written before this policy) — never cut someone off on a
    // field we did not record; treat the window as open.
    : GRACE_DAYS * DAY_MS
  const inGrace = meta.plan_status === "past_due" && graceMsLeft > 0
  const graceExpired = meta.plan_status === "past_due" && graceMsLeft <= 0

  const isPaid = (PAID_PLANS.has(plan) || planStatusActive || inGrace) && !graceExpired
  const isBeginner = plan === "beginner"

  const trialEndsAt = typeof meta.trial_ends_at === "string" ? meta.trial_ends_at : null
  const hadTrial = Boolean(meta.trial_started_at)

  const trialEndMs = trialEndsAt ? Date.parse(trialEndsAt) : NaN
  const stripeTrial = meta.plan_status === "trialing"
  const trialActive = Number.isFinite(trialEndMs) && trialEndMs > now && (stripeTrial || !isPaid)
  const trialDaysLeft = trialActive ? Math.max(0, Math.ceil((trialEndMs - now) / DAY_MS)) : 0

  // PRO = the Pro/Annual tier, OR an active-but-unmapped subscription (unknown
  // tier → don't under-serve a payer), OR an active trial. Beginner is excluded.
  // A failed payment drops the expensive modes immediately — during grace the
  // account is Beginner, not Pro. An active trial still overrides everything.
  const isPro =
    (!inGrace && !graceExpired && (PRO_PLANS.has(plan) || (planStatusActive && !PAID_PLANS.has(plan)))) || trialActive

  return {
    plan,
    isPaid,
    // Grace holds them at the Beginner feature set whatever tier they bought.
    isBeginner: isBeginner || inGrace,
    isTrial: trialActive,
    isPro,
    trialEndsAt,
    trialDaysLeft,
    hadTrial,
    isPastDue: inGrace,
    graceDaysLeft: inGrace ? Math.max(0, Math.ceil(graceMsLeft / DAY_MS)) : 0,
  }
}

/** The common question, answered in one place. */
export function isProUser(user: MetaCarrier | null | undefined, now: number = Date.now()): boolean {
  return entitlementOf(user, now).isPro
}

/** The hard post-trial wall applies only when the trial is over and no paid
 * plan exists. Beginner is paid and must never be mistaken for expired/free. */
export function shouldBlockForExpiredTrial(
  user: MetaCarrier | null | undefined,
  now: number = Date.now(),
): boolean {
  const entitlement = entitlementOf(user, now)
  return entitlement.hadTrial && !entitlement.isTrial && !entitlement.isPaid
}

/**
 * May this user reach the gated app at all? Entitlement to the workspace is
 * "paid OR in an active trial" — a trial is a full preview, so it counts. This
 * is the inverse of the route-level purchase wall, and it is deliberately NOT
 * the same as `isPaid`: a legacy/promo trial grants access via `trial_ends_at`
 * without a paid plan (isPaid=false, isTrial=true), and keying the wall on
 * `isPaid` alone shut those active trials out the instant they began.
 */
export function canAccessApp(
  user: MetaCarrier | null | undefined,
  now: number = Date.now(),
): boolean {
  const entitlement = entitlementOf(user, now)
  return entitlement.isPaid || entitlement.isTrial
}

/** Feature-level gate tied to the same contract rendered on /pricing. */
export function canUsePlanFeature(
  user: MetaCarrier | null | undefined,
  feature: PlanFeatureKey,
  now: number = Date.now(),
): boolean {
  const entitlement = entitlementOf(user, now)
  if (entitlement.isTrial) return tierHasFeature("trial", feature)
  if (entitlement.isBeginner) return tierHasFeature("beginner", feature)
  if (entitlement.isPro) return tierHasFeature("pro", feature)
  return false
}

/**
 * Which papers can this user open?
 *   - A PAID subscriber OR an active trial: every paper. A trial is a full
 *     preview of the paid workspace, so it unlocks all 15 papers, not just the
 *     onboarding target (see the "trial unlocks all papers" tests).
 *   - A FREE learner (no paid plan, no active trial): only the paper(s) they
 *     onboarded with — the "target".
 * `now` is injectable for testing. After the trial expires the app-level gate
 * blocks the whole app, so this only needs to split paid/trial-vs-target.
 */
export function canAccessPaper(
  user: MetaCarrier | null | undefined,
  paperId: string,
  targetPaperIds: readonly string[],
  now: number = Date.now(),
): boolean {
  const entitlement = entitlementOf(user, now)
  if (entitlement.isPaid || entitlement.isTrial) return true
  return targetPaperIds.includes(paperId)
}

/**
 * Is this account eligible to START a trial? Only a brand-new account with no
 * paid plan and no prior trial. The server enforces this too — this is the
 * client-side gate that decides whether to even make the call.
 */
export function canStartTrial(user: MetaCarrier | null | undefined): boolean {
  const e = entitlementOf(user)
  return !e.isPaid && !e.hadTrial
}

/** Length of a trial, in days — one constant, shared by copy and the server. */
export const TRIAL_DAYS = 3
import { tierHasFeature, type PlanFeatureKey } from "@/lib/plan-contract"
