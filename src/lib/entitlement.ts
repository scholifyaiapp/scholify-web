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
  const isPaid = PAID_PLANS.has(plan) || planStatusActive
  const isBeginner = plan === "beginner"

  const trialEndsAt = typeof meta.trial_ends_at === "string" ? meta.trial_ends_at : null
  const hadTrial = Boolean(meta.trial_started_at)

  const trialEndMs = trialEndsAt ? Date.parse(trialEndsAt) : NaN
  const stripeTrial = meta.plan_status === "trialing"
  const trialActive = Number.isFinite(trialEndMs) && trialEndMs > now && (stripeTrial || !isPaid)
  const trialDaysLeft = trialActive ? Math.max(0, Math.ceil((trialEndMs - now) / DAY_MS)) : 0

  // PRO = the Pro/Annual tier, OR an active-but-unmapped subscription (unknown
  // tier → don't under-serve a payer), OR an active trial. Beginner is excluded.
  const isPro = PRO_PLANS.has(plan) || (planStatusActive && !PAID_PLANS.has(plan)) || trialActive

  return {
    plan,
    isPaid,
    isBeginner,
    isTrial: trialActive,
    isPro,
    trialEndsAt,
    trialDaysLeft,
    hadTrial,
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
 *   - A PAID subscriber: every paper.
 *   - Everyone else (trial or free): only the paper(s) they onboarded with — the
 *     "target". A trial grants the Pro *features* (mocks, examiner, generate) but
 *     still only on the target paper; the other 14 need a paid plan.
 * `now` is injectable for testing. After the trial expires the app-level gate
 * blocks the whole app, so this only needs to split paid-vs-target.
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
