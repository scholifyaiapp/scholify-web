/*
 * Examiner Intelligence — what the last sittings actually show.
 *
 * Compiled from ACCA's OFFICIAL published sources: sitting pass-rate
 * announcements (accaglobal.com news), examiner's reports, and past-exam
 * analyses. All commentary below is ORIGINAL paraphrase of recurring,
 * publicly reported examiner themes — never reproduced report text, and
 * never ACCA exam content. Facts (pass rates) are facts; the coaching
 * framing is ours.
 *
 * Session papers (PM→options) have four sittings a year with published
 * per-sitting pass rates and examiner's reports. Knowledge papers
 * (BT·MA·FA·LW) are on-demand CBEs — ACCA publishes annual average pass
 * rates and an "examinable approach" instead of sitting reports.
 *
 * Refresh cadence: after every sitting's results week (roughly 6 weeks
 * after Mar/Jun/Sep/Dec exam weeks). Last refreshed: 2026-07-10 with
 * sittings through December 2025.
 */

export interface SittingStat {
  /** e.g. "Mar 25" */
  label: string
  /** Official global pass rate for the sitting, %. */
  passRate: number
}

export interface AreaHotspot {
  /** Syllabus area code (matches the paper's areas). */
  code: string
  /** How often this area carries major marks across recent sittings, 0-100. */
  frequency: number
  /** One-line coaching note — our paraphrase of recurring examiner themes. */
  note: string
}

export interface ExamIntel {
  paper: string
  /** "session" = 4 sittings/yr with reports; "on-demand" = CBE anytime. */
  kind: "session" | "on-demand"
  /** Last sittings, oldest first (session papers) or annual averages (on-demand). */
  sittings: SittingStat[]
  /** Recurring examiner-report themes, paraphrased. Newest thinking first. */
  themes: string[]
  /** Which syllabus areas the exam keeps going back to. */
  hotspots: AreaHotspot[]
  /** Official ACCA resource hub for this paper (reports, past exams, articles). */
  officialUrl: string
}

const ACCA_BASE = "https://www.accaglobal.com/gb/en/student/exam-support-resources.html"

export const EXAM_INTEL: ExamIntel[] = [
  /* ── Applied Knowledge — on-demand CBEs (annual average pass rates) ── */
  {
    paper: "BT",
    kind: "on-demand",
    sittings: [
      { label: "2022", passRate: 84 },
      { label: "2023", passRate: 85 },
      { label: "2024", passRate: 84 },
      { label: "2025", passRate: 84 },
    ],
    themes: [
      "On-demand CBE — sit it any day; results are immediate and the pass rate is the friendliest in the qualification.",
      "Losses concentrate in governance and stakeholder questions, not the business-organisation basics.",
      "Read every word of scenario stems: BT distractors punish skimming, not ignorance.",
    ],
    hotspots: [],
    officialUrl: ACCA_BASE,
  },
  {
    paper: "MA",
    kind: "on-demand",
    sittings: [
      { label: "2022", passRate: 66 },
      { label: "2023", passRate: 68 },
      { label: "2024", passRate: 67 },
      { label: "2025", passRate: 68 },
    ],
    themes: [
      "On-demand CBE. The computational half is where passes are won — variances and budgeting flexing above all.",
      "Candidates consistently mix up fixed-overhead volume and expenditure variances.",
      "Practise with the on-screen calculator: transcription slips cost more marks than knowledge gaps.",
    ],
    hotspots: [],
    officialUrl: ACCA_BASE,
  },
  {
    paper: "FA",
    kind: "on-demand",
    sittings: [
      { label: "2022", passRate: 70 },
      { label: "2023", passRate: 71 },
      { label: "2024", passRate: 71 },
      { label: "2025", passRate: 72 },
    ],
    themes: [
      "On-demand CBE. Double-entry discipline decides it: candidates who can journal anything pass.",
      "Control accounts, suspense accounts and bank reconciliations are the classic mark-leakers.",
      "The consolidation and interpretation areas (G, H) are small in marks but decide the strong passes.",
    ],
    hotspots: [],
    officialUrl: ACCA_BASE,
  },
  {
    paper: "LW",
    kind: "on-demand",
    sittings: [
      { label: "2022", passRate: 83 },
      { label: "2023", passRate: 85 },
      { label: "2024", passRate: 84 },
      { label: "2025", passRate: 85 },
    ],
    themes: [
      "On-demand CBE with the highest pass rate at Knowledge level — but it is memory-dense.",
      "Company-law sections carry the weight; contract and employment law are the quick wins.",
      "Flashcard-style recall (cases, thresholds, duties) beats long reading for LW.",
    ],
    hotspots: [],
    officialUrl: ACCA_BASE,
  },

  /* ── Applied Skills — session exams (per-sitting official pass rates) ── */
  {
    paper: "PM",
    kind: "session",
    sittings: [
      { label: "Dec 24", passRate: 40 },
      { label: "Mar 25", passRate: 42 },
      { label: "Jun 25", passRate: 43 },
      { label: "Sep 25", passRate: 42 },
      { label: "Dec 25", passRate: 40 },
    ],
    themes: [
      "Consistently the hardest Skills paper (~40-43%). The examiner's recurring line: candidates compute without interpreting — Section C asks 'so what?', not just 'how much?'.",
      "Variance analysis remains the single biggest differentiator between pass and fail.",
      "Throughput and limiting-factor questions are routinely attempted with the wrong technique.",
      "Time management: Section C answers are strong for the first question and rushed for the second.",
    ],
    hotspots: [
      { code: "B", frequency: 100, note: "Decision techniques anchor Section C almost every sitting" },
      { code: "C", frequency: 95, note: "Budgeting & variances — the pass/fail divider" },
      { code: "D", frequency: 90, note: "Performance measurement discussion marks are under-collected" },
      { code: "A", frequency: 75, note: "Costing techniques dominate Sections A/B OTs" },
    ],
    officialUrl: ACCA_BASE,
  },
  {
    paper: "TX",
    kind: "session",
    sittings: [
      { label: "Dec 24", passRate: 56 },
      { label: "Mar 25", passRate: 55 },
      { label: "Jun 25", passRate: 54 },
      { label: "Sep 25", passRate: 54 },
      { label: "Dec 25", passRate: 55 },
    ],
    themes: [
      "The friendliest Skills paper (~54-56%) — computational proformas reward drilled practice directly.",
      "Examiner's recurring gap: administration (deadlines, penalties, payment dates) — pure recall marks left on the table.",
      "Income tax and corporation tax computations decide the grade; follow the proforma layout every time.",
      "VAT questions are short and formulaic — bank them fast, spend the time on the long computations.",
    ],
    hotspots: [
      { code: "A", frequency: 100, note: "Income tax computation appears at full length every sitting" },
      { code: "C", frequency: 100, note: "Corporation tax — the second long computation" },
      { code: "D", frequency: 90, note: "VAT — short, formulaic, highly bankable" },
      { code: "B", frequency: 80, note: "Chargeable gains rotate through reliefs — rollover, gift, PRR" },
      { code: "E", frequency: 60, note: "IHT appears in most sittings at 10-15 marks" },
    ],
    officialUrl: ACCA_BASE,
  },
  {
    paper: "FR",
    kind: "session",
    sittings: [
      { label: "Dec 24", passRate: 50 },
      { label: "Mar 25", passRate: 49 },
      { label: "Jun 25", passRate: 50 },
      { label: "Sep 25", passRate: 49 },
      { label: "Dec 25", passRate: 51 },
    ],
    themes: [
      "Remarkably stable pass rate (~49-51%). The examiner keeps repeating: show your workings — consolidation marks are awarded per figure, and unexplained numbers earn nothing.",
      "Interpretation answers describe the ratio movement instead of explaining WHY — cause-led answers score double.",
      "IFRS 15 (revenue timing) and IFRS 16 (lease liabilities) are the most-misapplied standards in Section B.",
      "Section C preparation questions: candidates lose easy marks on presentation — headings, formats, OCI placement.",
    ],
    hotspots: [
      { code: "E", frequency: 100, note: "Consolidation carries major marks EVERY sitting — goodwill, NCI, PURP" },
      { code: "D", frequency: 100, note: "Single-entity statements with adjustments — the other Section C anchor" },
      { code: "B", frequency: 95, note: "IFRS application OTs — 15/16/36/37 rotate constantly" },
      { code: "C", frequency: 85, note: "Ratios & interpretation — cause-led answers separate passes" },
      { code: "A", frequency: 60, note: "Framework & regulation fills Section A gaps" },
    ],
    officialUrl: ACCA_BASE,
  },
  {
    paper: "AA",
    kind: "session",
    sittings: [
      { label: "Dec 24", passRate: 44 },
      { label: "Mar 25", passRate: 47 },
      { label: "Jun 25", passRate: 44 },
      { label: "Sep 25", passRate: 47 },
      { label: "Dec 25", passRate: 46 },
    ],
    themes: [
      "The examiner's evergreen complaint: generic answers. Audit procedures must be TAILORED to the scenario — a memorised list scores almost nothing.",
      "Candidates confuse tests of controls with substantive procedures sitting after sitting.",
      "Risk questions: identify the risk AND the auditor's response — half-answers earn half marks at best.",
      "Knowledge of ISAs is adequate; application to the client in front of you is what fails candidates.",
    ],
    hotspots: [
      { code: "B", frequency: 100, note: "Planning & risk assessment — the big Section B question every sitting" },
      { code: "D", frequency: 100, note: "Audit evidence & procedures — must be scenario-specific" },
      { code: "C", frequency: 90, note: "Internal control deficiencies → recommendations format" },
      { code: "E", frequency: 80, note: "Reports & review — going concern is the recurring finale" },
      { code: "A", frequency: 65, note: "Ethics & regulation threaded through Section A" },
    ],
    officialUrl: ACCA_BASE,
  },
  {
    paper: "FM",
    kind: "session",
    sittings: [
      { label: "Dec 24", passRate: 49 },
      { label: "Mar 25", passRate: 50 },
      { label: "Jun 25", passRate: 48 },
      { label: "Sep 25", passRate: 50 },
      { label: "Dec 25", passRate: 48 },
    ],
    themes: [
      "Steady at ~48-50%. Investment appraisal with tax and inflation is the classic Section C differentiator — real vs nominal rates trip half the hall.",
      "Working capital calculations score well; the DISCUSSION marks around them are routinely skipped.",
      "Cost of capital: candidates can compute WACC but struggle to say when (not) to use it.",
      "The examiner rewards structured narrative — headings and short paragraphs, not essays.",
    ],
    hotspots: [
      { code: "B", frequency: 100, note: "NPV with tax & inflation — the flagship Section C question" },
      { code: "D", frequency: 95, note: "Cost of capital / WACC computations and their limits" },
      { code: "C", frequency: 90, note: "Working capital cycle & management — calc + discuss" },
      { code: "E", frequency: 75, note: "Valuations & risk (forex/interest) rotate in Section B" },
      { code: "A", frequency: 55, note: "Objectives & environment fill OT sections" },
    ],
    officialUrl: ACCA_BASE,
  },

  /* ── Strategic Professional (per-sitting official pass rates) ── */
  {
    paper: "SBL",
    kind: "session",
    sittings: [
      { label: "Dec 24", passRate: 51 },
      { label: "Sep 25", passRate: 53 },
      { label: "Dec 25", passRate: 50 },
    ],
    themes: [
      "The professional-skills marks (20) decide SBL — answering the task in role, for the audience asked.",
      "Candidates who plan reading time and answer the ACTUAL requirement outperform better technicians who don't.",
      "Recurring examiner theme: repetition of case facts without analysis earns nothing.",
    ],
    hotspots: [],
    officialUrl: ACCA_BASE,
  },
  {
    paper: "SBR",
    kind: "session",
    sittings: [
      { label: "Dec 24", passRate: 48 },
      { label: "Mar 25", passRate: 50 },
      { label: "Jun 25", passRate: 49 },
      { label: "Sep 25", passRate: 50 },
      { label: "Dec 25", passRate: 48 },
    ],
    themes: [
      "Explain the WHY of a treatment, not just the entries — SBR marks reasoning against the Framework.",
      "Groups question every sitting: complex consolidation with a twist (step acquisition, disposal, foreign sub).",
      "The investor-perspective question is the most-skipped and the easiest to bank with practice.",
    ],
    hotspots: [
      { code: "C", frequency: 100, note: "Groups & combinations anchor Question 1 every sitting" },
      { code: "B", frequency: 95, note: "Performance reporting standards with judgement calls" },
      { code: "D", frequency: 85, note: "Instruments, pensions, share-based payment rotate" },
      { code: "E", frequency: 80, note: "Investor perspective & current issues — bankable" },
      { code: "A", frequency: 70, note: "Framework reasoning threads through every answer" },
    ],
    officialUrl: ACCA_BASE,
  },
  {
    paper: "AFM",
    kind: "session",
    sittings: [
      { label: "Dec 24", passRate: 47 },
      { label: "Mar 25", passRate: 45 },
      { label: "Jun 25", passRate: 46 },
    ],
    themes: [
      "Investment appraisal (APV, international NPV) carries the paper — set up the proforma before computing.",
      "Hedging questions: candidates present one method well; comparisons of methods score higher.",
    ],
    hotspots: [],
    officialUrl: ACCA_BASE,
  },
  {
    paper: "APM",
    kind: "session",
    sittings: [
      { label: "Dec 24", passRate: 38 },
      { label: "Mar 25", passRate: 39 },
      { label: "Jun 25", passRate: 40 },
    ],
    themes: [
      "The hardest option historically (~34-40%). The examiner is blunt: pre-learned models pasted without application fail.",
      "Every requirement verb matters — 'evaluate' answered as 'describe' scores a third of the marks.",
    ],
    hotspots: [],
    officialUrl: ACCA_BASE,
  },
  {
    paper: "ATX",
    kind: "session",
    sittings: [
      { label: "Dec 24", passRate: 51 },
      { label: "Mar 25", passRate: 52 },
      { label: "Jun 25", passRate: 49 },
    ],
    themes: [
      "The strongest option pass rate — deep TX foundations convert directly.",
      "Marks concentrate in planning scenarios: reliefs interaction, groups, overseas aspects.",
    ],
    hotspots: [],
    officialUrl: ACCA_BASE,
  },
  {
    paper: "AAA",
    kind: "session",
    sittings: [
      { label: "Dec 24", passRate: 34 },
      { label: "Mar 25", passRate: 39 },
      { label: "Jun 25", passRate: 40 },
    ],
    themes: [
      "Historically the lowest pass rate in the qualification — but climbing (34% → 40% across 2025).",
      "Same disease as AA, amplified: procedures and risks must be case-specific at professional depth.",
      "Current-issues and quality-management questions are the most under-prepared areas.",
    ],
    hotspots: [],
    officialUrl: ACCA_BASE,
  },
]

/* ── Lookups & aggregates ─────────────────────────────────────── */

export function getExamIntel(paperId: string): ExamIntel | null {
  return EXAM_INTEL.find((e) => e.paper === paperId) ?? null
}

/** Average official pass rate across the tracked sittings, or null. */
export function avgPassRate(paperId: string): number | null {
  const intel = getExamIntel(paperId)
  if (!intel || intel.sittings.length === 0) return null
  return Math.round(intel.sittings.reduce((s, x) => s + x.passRate, 0) / intel.sittings.length)
}
