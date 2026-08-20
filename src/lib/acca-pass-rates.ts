/*
 * ACCA's official pass rates for the June 2026 sitting, paper by paper —
 * the table the landing page's PassRates section renders (source: ACCA
 * results release, July 2026, as compiled in the investor data report).
 *
 * A deliberate snapshot of ONE sitting, kept separate from acca-examiner's
 * rolling per-paper history: that file has no per-sitting figures for the
 * on-demand Knowledge papers, and this table's claim is "here is the latest
 * sitting, complete". Each level's `average` must be the rounded mean of its
 * own papers — a test pins that, so the marketing chip can't drift from the
 * figures it summarises.
 */

export interface PassRateLevel {
  level: string
  /** Rounded mean of this level's paper rates — pinned by test. */
  average: number
  papers: readonly { code: string; name: string; rate: number }[]
}

export const JUNE_2026_PASS_RATES: readonly PassRateLevel[] = [
  {
    level: "Applied Knowledge",
    average: 75,
    papers: [
      { code: "BT", name: "Business & Technology", rate: 89 },
      { code: "FA", name: "Financial Accounting", rate: 71 },
      { code: "MA", name: "Management Accounting", rate: 65 },
    ],
  },
  {
    level: "Applied Skills",
    average: 54,
    papers: [
      { code: "LW", name: "Corporate & Business Law", rate: 82 },
      { code: "TX", name: "Taxation", rate: 55 },
      { code: "FR", name: "Financial Reporting", rate: 52 },
      { code: "FM", name: "Financial Management", rate: 48 },
      { code: "AA", name: "Audit & Assurance", rate: 47 },
      { code: "PM", name: "Performance Management", rate: 41 },
    ],
  },
  {
    level: "Strategic Professional",
    average: 46,
    papers: [
      { code: "SBL", name: "Strategic Business Leader", rate: 51 },
      { code: "SBR", name: "Strategic Business Reporting", rate: 47 },
      { code: "AFM", name: "Advanced Financial Management", rate: 47 },
      { code: "ATX", name: "Advanced Taxation", rate: 47 },
      { code: "APM", name: "Advanced Performance Management", rate: 42 },
      { code: "AAA", name: "Advanced Audit & Assurance", rate: 39 },
    ],
  },
]
