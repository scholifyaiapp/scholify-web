/*
 * Partner earnings and reward-progress maths.
 *
 * Lives in one place because the same numbers are shown twice and MUST agree:
 * the worked example on the public /partners/apply page, and a real partner's
 * own progress on /partners. If the marketing page computes 27% one way and the
 * dashboard another, a partner finds out by feeling cheated.
 *
 * Everything here is pure. No fetching, no formatting decisions beyond rounding
 * money to cents.
 */

/** The published partner rate. One constant — the offer page, the dashboard and
 *  the footer pill all read it from here. */
export const COMMISSION_RATE = 0.27

/** Advertised plan prices, in USD. Mirrors src/pages/Pricing.tsx. */
export const PLAN_PRICE = {
  beginner: 9.99,
  pro: 14.99,
  beginnerAnnual: 79.99,
  proAnnual: 119.99,
} as const

export type PlanTier = "beginner" | "pro" | "other"

/** Money rounded to cents. Applied per LINE, never once at the end — a total
 *  that does not equal the sum of the rows shown above it reads as a bug. */
export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

/*
 * Which tier a recorded sale belongs to. The commission row carries an amount,
 * not a plan name, so the tier is recovered from the price. Anything that is
 * not a current published price is "other": it still counts toward total sales
 * (reward tier 1) but never toward the PRO-only count (tier 2), because
 * miscounting in the partner's favour is a promise Scholify would have to break
 * later.
 */
export function classifySaleAmount(amount: number): PlanTier {
  const cents = Math.round(amount * 100)
  if (cents === Math.round(PLAN_PRICE.beginner * 100) || cents === Math.round(PLAN_PRICE.beginnerAnnual * 100)) {
    return "beginner"
  }
  if (cents === Math.round(PLAN_PRICE.pro * 100) || cents === Math.round(PLAN_PRICE.proAnnual * 100)) {
    return "pro"
  }
  return "other"
}

/** What a run of sales on one plan is worth to the partner. */
export function commissionOn(tier: Exclude<PlanTier, "other">, units: number): number {
  return round2(units * PLAN_PRICE[tier] * COMMISSION_RATE)
}

export interface EarningsBreakdown {
  beginnerSales: number
  proSales: number
  totalSales: number
  beginnerRevenue: number
  proRevenue: number
  totalRevenue: number
  beginnerCommission: number
  proCommission: number
  totalCommission: number
  /** Commission on a single sale of each plan — the "per sale" line. */
  perBeginnerSale: number
  perProSale: number
}

export function earningsFor({ beginnerSales, proSales }: { beginnerSales: number; proSales: number }): EarningsBreakdown {
  const beginnerRevenue = round2(beginnerSales * PLAN_PRICE.beginner)
  const proRevenue = round2(proSales * PLAN_PRICE.pro)
  const beginnerCommission = commissionOn("beginner", beginnerSales)
  const proCommission = commissionOn("pro", proSales)
  return {
    beginnerSales,
    proSales,
    totalSales: beginnerSales + proSales,
    beginnerRevenue,
    proRevenue,
    totalRevenue: round2(beginnerRevenue + proRevenue),
    beginnerCommission,
    proCommission,
    // Sum of the rounded rows, so the total always equals what is printed above it.
    totalCommission: round2(beginnerCommission + proCommission),
    perBeginnerSale: round2(PLAN_PRICE.beginner * COMMISSION_RATE),
    perProSale: round2(PLAN_PRICE.pro * COMMISSION_RATE),
  }
}

export interface RewardTier {
  id: string
  /** What the partner wins. */
  prize: string
  event: string
  venue: string
  raceDates: string
  /** How many sales it takes. */
  target: number
  /** Which sales count — every plan, or Pro only. */
  counts: "all" | "pro"
  deadlineISO: string
  deadlineLabel: string
}

/*
 * The two published reward tiers. Kept in step with the offer copy on
 * /partners/apply — if a tier changes there it changes here, or the dashboard
 * tells partners they are chasing a target that no longer exists.
 */
export const REWARD_TIERS: RewardTier[] = [
  {
    id: "qatar",
    prize: "Grand Prix ticket",
    event: "Formula 1® Qatar Grand Prix 2026",
    venue: "Lusail",
    raceDates: "27–29 Nov 2026",
    target: 1000,
    counts: "all",
    deadlineISO: "2026-10-01T00:00:00+05:00",
    deadlineLabel: "1 Oct 2026",
  },
  {
    id: "abu-dhabi",
    prize: "Full trip — flights, tickets, race day",
    event: "Formula 1® Abu Dhabi Grand Prix 2026",
    venue: "Yas Marina",
    raceDates: "4–6 Dec 2026",
    target: 2000,
    counts: "pro",
    deadlineISO: "2026-11-01T00:00:00+05:00",
    deadlineLabel: "1 Nov 2026",
  },
]

export interface RewardProgress {
  tier: RewardTier
  /** Sales that count toward THIS tier. */
  achieved: number
  target: number
  /** Never negative — a partner past the line is not "-40 sales" away. */
  remaining: number
  /** 0–100, clamped. */
  percent: number
  reached: boolean
  /** Days left to the deadline, floored at 0. Null when `now` is not supplied. */
  daysLeft: number | null
}

export function rewardProgress(
  tier: RewardTier,
  counts: { all: number; pro: number },
  now?: number | Date,
): RewardProgress {
  const achieved = tier.counts === "pro" ? counts.pro : counts.all
  const remaining = Math.max(0, tier.target - achieved)
  const percent = tier.target > 0 ? Math.min(100, (achieved / tier.target) * 100) : 0
  let daysLeft: number | null = null
  if (now !== undefined) {
    const timestamp = now instanceof Date ? now.getTime() : now
    daysLeft = Math.max(0, Math.ceil((Date.parse(tier.deadlineISO) - timestamp) / 86_400_000))
  }
  return { tier, achieved, target: tier.target, remaining, percent, reached: achieved >= tier.target, daysLeft }
}

/* ── The worked example shown on the public offer page ──────────────
 *
 * 780 sales, split evenly between Beginner and Pro. It is labelled on the page
 * as an EXAMPLE CALCULATION, not as a partner's results — inventing a person
 * and quoting earnings they never made would be a fabricated endorsement, and
 * the arithmetic is persuasive enough without one.
 */
export const EXAMPLE_SALES = 780

export const EXAMPLE_EARNINGS = earningsFor({
  beginnerSales: EXAMPLE_SALES / 2,
  proSales: EXAMPLE_SALES / 2,
})

export const EXAMPLE_PROGRESS = rewardProgress(REWARD_TIERS[0], {
  all: EXAMPLE_SALES,
  pro: EXAMPLE_SALES / 2,
})
