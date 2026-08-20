/*
 * The global ACCA market at a glance — audited headline figures the landing
 * page's MarketAtGlance section renders. Every number is real and cited:
 * ACCA's Annual Integrated Report for the financial year to 31 March 2026,
 * plus the Dec 2025 / Jun 2026 results releases (as compiled in the investor
 * data report). Nothing here is estimated or rounded for effect.
 *
 * Two figures are COMPUTED from the others and must stay consistent —
 * tests pin both:
 *   · total community = members + future members
 *   · exams completed = Dec 2025 sitting + Jun 2026 sitting
 * The growth percentages are likewise derived from MEMBERS_BY_YEAR.
 */

export interface MarketStat {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
  source: string
}

/** The two session sittings behind the exams-completed headline. */
export const EXAMS_DEC_2025 = 137_609
export const EXAMS_JUN_2026 = 136_544

export const MARKET_HEADLINES: readonly MarketStat[] = [
  {
    value: 266_174,
    label: "ACCA members worldwide",
    source: "31 Mar 2026 · ACCA Integrated Report",
  },
  {
    value: 546_534,
    label: "Future members — students and affiliates",
    source: "31 Mar 2026 · ACCA Integrated Report",
  },
  {
    value: 812_708,
    label: "Total ACCA community",
    source: "2026 · ACCA Integrated Report",
  },
  {
    value: 179,
    label: "Countries with ACCA presence",
    source: "31 Mar 2026 · ACCA Integrated Report",
  },
  {
    value: 118_592,
    label: "New students in FY 2025–26 — ACCA's strongest-ever intake",
    source: "ACCA Integrated Report",
  },
  {
    value: 262.6,
    decimals: 1,
    prefix: "£",
    suffix: "m",
    label: "ACCA annual revenue, FY 2025–26",
    source: "ACCA Integrated Report",
  },
  {
    value: EXAMS_DEC_2025 + EXAMS_JUN_2026,
    label: "Exams completed in the two most recent session sittings",
    source: "Dec 2025 + Jun 2026 · ACCA results releases",
  },
  {
    value: 23.7,
    decimals: 1,
    suffix: "%",
    label: "ACCA share of its professional-qualification market",
    source: "FY 2025–26 · ACCA Integrated Report",
  },
]

/** Members at 31 March each year — ACCA's audited five-year summaries. */
export const MEMBERS_BY_YEAR: readonly { year: string; members: number }[] = [
  { year: "'21", members: 233_019 },
  { year: "'22", members: 240_952 },
  { year: "'23", members: 247_734 },
  { year: "'24", members: 252_562 },
  { year: "'25", members: 257_956 },
  { year: "'26", members: 266_174 },
]

/** 2021 → 2026 member growth, % to 1dp — pinned by test against the series. */
export const MEMBER_GROWTH_PCT = 14.2
/** The same growth as a compound annual rate, % to 1dp — pinned by test. */
export const MEMBER_GROWTH_CAGR_PCT = 2.7
