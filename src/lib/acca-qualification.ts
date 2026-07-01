/*
 * Scholify — the full ACCA qualification map.
 *
 * The whole journey: 13 exams across three levels (plus 4 Options to choose 2
 * from), and the non-exam requirements (EPSM + PER). FA and FR carry curated
 * question banks (acca-content.ts); every other paper is still fully
 * practisable via AI-generated questions and gets a personalised study plan.
 *
 * myACCA has no public API, so "your ACCA record" is self-reported: the
 * learner marks the exams they've passed. The storage shape below is ready for
 * a real myACCA/OAuth sync to populate later without changing callers.
 */

import { PAPERS as CONTENT_PAPERS, type AccaPaper } from "@/lib/acca-content"

/* Papers without a curated bank yet — practisable via AI generation. */
const OTHER_PAPERS: AccaPaper[] = [
  // Applied Knowledge
  {
    id: "BT", code: "BT (F1)", name: "Business and Technology", level: "Applied Knowledge", hasCuratedContent: true,
    blurb: "How businesses work: structure, environment, people, governance, ethics and technology.",
    areas: [
      { code: "A", label: "Business organisation & environment" },
      { code: "B", label: "People in organisations" },
      { code: "C", label: "Governance, ethics & professional behaviour" },
      { code: "D", label: "Accounting, internal control & technology" },
    ],
  },
  {
    id: "MA", code: "MA (F2)", name: "Management Accounting", level: "Applied Knowledge", hasCuratedContent: true,
    blurb: "Costing, budgeting, variances and performance measurement to support decisions.",
    areas: [
      { code: "A", label: "Cost accounting & classification" },
      { code: "B", label: "Costing techniques" },
      { code: "C", label: "Budgeting" },
      { code: "D", label: "Standard costing & variances" },
      { code: "E", label: "Performance measurement" },
    ],
  },
  // Applied Skills
  {
    id: "LW", code: "LW (F4)", name: "Corporate and Business Law", level: "Applied Skills", hasCuratedContent: true,
    blurb: "The legal framework businesses operate in: contract, employment, company law and more.",
    areas: [
      { code: "A", label: "Essential elements of the legal system" },
      { code: "B", label: "The law of obligations (contract & tort)" },
      { code: "C", label: "Employment law" },
      { code: "D", label: "Company law & corporate governance" },
    ],
  },
  {
    id: "PM", code: "PM (F5)", name: "Performance Management", level: "Applied Skills", hasCuratedContent: true,
    blurb: "Management accounting techniques for planning, decision-making and control.",
    areas: [
      { code: "A", label: "Specialist cost & management accounting" },
      { code: "B", label: "Decision-making techniques" },
      { code: "C", label: "Budgeting & control" },
      { code: "D", label: "Performance measurement & control" },
    ],
  },
  {
    id: "TX", code: "TX (F6)", name: "Taxation", level: "Applied Skills",
    blurb: "Core UK taxes: income tax, corporation tax, chargeable gains, VAT and more.",
    areas: [
      { code: "A", label: "Income tax & NIC" },
      { code: "B", label: "Chargeable gains" },
      { code: "C", label: "Corporation tax" },
      { code: "D", label: "Value added tax (VAT)" },
      { code: "E", label: "Inheritance tax" },
    ],
  },
  {
    id: "AA", code: "AA (F8)", name: "Audit and Assurance", level: "Applied Skills", hasCuratedContent: true,
    blurb: "The audit process end to end: planning, risk, evidence, review and reporting.",
    areas: [
      { code: "A", label: "Audit framework & regulation" },
      { code: "B", label: "Planning & risk assessment" },
      { code: "C", label: "Internal control" },
      { code: "D", label: "Audit evidence" },
      { code: "E", label: "Review & reporting" },
    ],
  },
  {
    id: "FM", code: "FM (F9)", name: "Financial Management", level: "Applied Skills", hasCuratedContent: true,
    blurb: "Investment appraisal, working capital, business finance, cost of capital and valuation.",
    areas: [
      { code: "A", label: "Financial management function" },
      { code: "B", label: "Investment appraisal" },
      { code: "C", label: "Working capital management" },
      { code: "D", label: "Business finance & cost of capital" },
      { code: "E", label: "Business valuations & risk" },
    ],
  },
  // Strategic Professional — Essentials
  {
    id: "SBL", code: "SBL", name: "Strategic Business Leader", level: "Strategic Professional",
    blurb: "The integrated case-study exam: leadership, governance, strategy, risk and professional skills.",
    areas: [
      { code: "A", label: "Leadership & governance" },
      { code: "B", label: "Strategy" },
      { code: "C", label: "Risk & control" },
      { code: "D", label: "Technology, data & innovation" },
      { code: "E", label: "Professional skills" },
    ],
  },
  {
    id: "SBR", code: "SBR", name: "Strategic Business Reporting", level: "Strategic Professional",
    blurb: "Applying and appraising IFRS across complex transactions, groups and current issues.",
    areas: [
      { code: "A", label: "Conceptual & regulatory framework" },
      { code: "B", label: "Reporting financial performance" },
      { code: "C", label: "Groups & business combinations" },
      { code: "D", label: "Financial instruments & employee benefits" },
      { code: "E", label: "Interpretation & current issues" },
    ],
  },
  // Strategic Professional — Options (choose 2)
  {
    id: "AFM", code: "AFM (P4)", name: "Advanced Financial Management", level: "Strategic Professional", isOption: true,
    blurb: "The senior adviser's role: advanced appraisal, mergers, reconstruction, treasury & risk.",
    areas: [
      { code: "A", label: "Role of the senior financial adviser" },
      { code: "B", label: "Advanced investment appraisal" },
      { code: "C", label: "Acquisitions & mergers" },
      { code: "D", label: "Corporate reconstruction & reorganisation" },
      { code: "E", label: "Treasury & advanced risk management" },
    ],
  },
  {
    id: "APM", code: "APM (P5)", name: "Advanced Performance Management", level: "Strategic Professional", isOption: true,
    blurb: "Designing and evaluating strategic performance management systems.",
    areas: [
      { code: "A", label: "Strategic planning & control" },
      { code: "B", label: "Performance management systems & design" },
      { code: "C", label: "Strategic performance measurement" },
      { code: "D", label: "Performance evaluation & corporate failure" },
    ],
  },
  {
    id: "ATX", code: "ATX (P6)", name: "Advanced Taxation", level: "Strategic Professional", isOption: true,
    blurb: "Advanced UK tax planning across taxes, with ethics and adviser communication.",
    areas: [
      { code: "A", label: "Income tax & NIC (advanced)" },
      { code: "B", label: "Chargeable gains & IHT (advanced)" },
      { code: "C", label: "Corporation tax (advanced)" },
      { code: "D", label: "VAT & stamp taxes" },
      { code: "E", label: "Tax planning & ethics" },
    ],
  },
  {
    id: "AAA", code: "AAA (P7)", name: "Advanced Audit and Assurance", level: "Strategic Professional", isOption: true,
    blurb: "Advanced audit: ethics, quality management, complex planning, evidence and reporting.",
    areas: [
      { code: "A", label: "Regulatory environment" },
      { code: "B", label: "Professional & ethical considerations" },
      { code: "C", label: "Quality management" },
      { code: "D", label: "Planning & conducting an engagement" },
      { code: "E", label: "Completion, review & reporting" },
    ],
  },
]

/** Every ACCA paper, in official qualification order. */
export const ALL_PAPERS: AccaPaper[] = orderPapers([...CONTENT_PAPERS, ...OTHER_PAPERS])

const PAPER_ORDER = [
  "BT", "MA", "FA",
  "LW", "PM", "TX", "FR", "AA", "FM",
  "SBL", "SBR",
  "AFM", "APM", "ATX", "AAA",
]

function orderPapers(papers: AccaPaper[]): AccaPaper[] {
  return [...papers].sort((a, b) => PAPER_ORDER.indexOf(a.id) - PAPER_ORDER.indexOf(b.id))
}

export interface LevelGroup {
  key: string
  label: string
  note?: string
  papers: AccaPaper[]
}

/** Papers grouped into the levels shown on the ACCA journey. */
export function paperLevels(): LevelGroup[] {
  const byId = (ids: string[]) => ALL_PAPERS.filter((p) => ids.includes(p.id))
  return [
    { key: "AK", label: "Applied Knowledge", papers: byId(["BT", "MA", "FA"]) },
    { key: "AS", label: "Applied Skills", papers: byId(["LW", "PM", "TX", "FR", "AA", "FM"]) },
    { key: "SPE", label: "Strategic Professional — Essentials", note: "Both required", papers: byId(["SBL", "SBR"]) },
    { key: "SPO", label: "Strategic Professional — Options", note: "Choose 2 of 4", papers: byId(["AFM", "APM", "ATX", "AAA"]) },
  ]
}

/* ── Passed-exam record (self-reported "myACCA") ──────────────── */

const KEY_PASSED = "scholify-acca-passed"
const KEY_CURRENT = "scholify-acca-current-paper"

export function getPassedPapers(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY_PASSED)
    if (raw) {
      const arr = JSON.parse(raw) as unknown
      if (Array.isArray(arr)) return arr.map(String)
    }
  } catch {
    /* ignore */
  }
  return []
}

export function setPassedPapers(ids: string[]): void {
  try {
    window.localStorage.setItem(KEY_PASSED, JSON.stringify([...new Set(ids)]))
  } catch {
    /* ignore */
  }
}

export function isPassed(id: string): boolean {
  return getPassedPapers().includes(id)
}

export function getCurrentPaper(): string | null {
  try {
    return window.localStorage.getItem(KEY_CURRENT)
  } catch {
    return null
  }
}

export function setCurrentPaper(id: string): void {
  try {
    window.localStorage.setItem(KEY_CURRENT, id)
  } catch {
    /* ignore */
  }
}

export interface QualificationProgress {
  passedCount: number
  /** Exams needed to qualify (13: all except 2 of the 4 Options). */
  totalExams: number
  percent: number
}

export function qualificationProgress(passed = getPassedPapers()): QualificationProgress {
  // Cap Options contribution at 2 (a student only needs 2 of the 4).
  const passedSet = new Set(passed)
  const optionsPassed = ALL_PAPERS.filter((p) => p.isOption && passedSet.has(p.id)).length
  const nonOptionPassed = ALL_PAPERS.filter((p) => !p.isOption && passedSet.has(p.id)).length
  const counted = nonOptionPassed + Math.min(2, optionsPassed)
  const totalExams = 13
  return {
    passedCount: counted,
    totalExams,
    percent: Math.round((counted / totalExams) * 100),
  }
}

/** Suggested next papers to study: earliest level with unpassed papers. */
export function suggestedNextPapers(passed = getPassedPapers()): AccaPaper[] {
  const passedSet = new Set(passed)
  for (const group of paperLevels()) {
    const remaining = group.papers.filter((p) => !passedSet.has(p.id))
    if (remaining.length > 0) return remaining
  }
  return []
}

export function getPaperFromCatalog(id: string): AccaPaper | undefined {
  return ALL_PAPERS.find((p) => p.id === id)
}
