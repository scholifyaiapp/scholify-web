/*
 * Entitlement — the single source of truth for "what can this user access?"
 *
 * Before this, `isPro` was computed inline in four places as
 * `plan && plan !== "free"`. That was (a) duplicated, so the trial would have
 * had to be added in four places, and (b) blind to the trial entirely. Every
 * gate now asks this one function.
 *
 * The model, in priority order:
 *   1. A PAID plan (beginner / pro / annual_pro) — set only by the Paddle
 *      webhook, in service-role-only app_metadata. This is the real thing.
 *   2. An active TRIAL — `trial_ends_at` in the future, also written only by the
 *      server (see api/paddle.ts start-trial). A user cannot forge either field,
 *      because app_metadata is not client-writable.
 *   3. Otherwise, free.
 *
 * A trial grants Pro-level access; it does not touch `plan`, so Paddle logic
 * stays clean and a real subscription always wins over (and outlives) a trial.
 */

/** The paid tiers, in the shape Paddle writes them. */
const PAID_PLANS = new Set(["beginner", "pro", "annual_pro"])

const DAY_MS = 24 * 60 * 60 * 1000

export interface Entitlement {
  /** The raw paid plan string ("free" when there is no subscription). */
  plan: string
  /** A real, paid subscription is active. */
  isPaid: boolean
  /** A free trial is active (and there is no paid plan). */
  isTrial: boolean
  /** Pro-level access, from EITHER a paid plan or an active trial. */
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
  const isPaid = PAID_PLANS.has(plan)

  const trialEndsAt = typeof meta.trial_ends_at === "string" ? meta.trial_ends_at : null
  const hadTrial = Boolean(meta.trial_started_at)

  const trialEndMs = trialEndsAt ? Date.parse(trialEndsAt) : NaN
  const trialActive = !isPaid && Number.isFinite(trialEndMs) && trialEndMs > now
  const trialDaysLeft = trialActive ? Math.max(0, Math.ceil((trialEndMs - now) / DAY_MS)) : 0

  return {
    plan,
    isPaid,
    isTrial: trialActive,
    isPro: isPaid || trialActive,
    trialEndsAt,
    trialDaysLeft,
    hadTrial,
  }
}

/** The common question, answered in one place. */
export function isProUser(user: MetaCarrier | null | undefined, now: number = Date.now()): boolean {
  return entitlementOf(user, now).isPro
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
export const TRIAL_DAYS = 7
