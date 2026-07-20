/*
 * Scholify — the full ACCA qualification map.
 *
 * The whole journey: 13 exams across three levels (plus 4 Options to choose 2
 * from), and the non-exam requirements (EPSM + PER). All nine Applied
 * Knowledge/Skills papers carry curated question banks (acca-content.ts);
 * Strategic Professional papers are practisable via AI-generated questions
 * and (SBR) the AI Examiner's written bank, with a personalised study plan.
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
    id: "BT", code: "BT (F1)", name: "Business and Technology", level: "Applied Knowledge", hasCuratedContent: true, objectiveOnly: true,
    blurb: "How businesses work: structure, environment, people, governance, ethics and technology.",
    areas: [
      { code: "A", label: "Business organisation & external environment" },
      { code: "B", label: "Structure, culture, governance & sustainability" },
      { code: "C", label: "Business functions, regulation & technology" },
      { code: "D", label: "Leadership & management" },
      { code: "E", label: "Personal effectiveness & communication" },
      { code: "F", label: "Professional ethics" },
    ],
  },
  {
    id: "MA", code: "MA (F2)", name: "Management Accounting", level: "Applied Knowledge", hasCuratedContent: true, objectiveOnly: true,
    blurb: "Costing, budgeting, variances and performance measurement to support decisions.",
    areas: [
      { code: "A", label: "Nature, source & purpose of management information" },
      { code: "B", label: "Data analysis & statistical techniques" },
      { code: "C", label: "Cost accounting techniques" },
      { code: "D", label: "Budgeting" },
      { code: "E", label: "Standard costing" },
      { code: "F", label: "Performance measurement" },
    ],
  },
  // Applied Skills
  {
    id: "LW", code: "LW (F4)", name: "Corporate and Business Law", level: "Applied Skills", hasCuratedContent: true, objectiveOnly: true,
    blurb: "The legal framework businesses operate in: contract, employment, company law and more.",
    areas: [
      { code: "A", label: "Essential elements of the legal system" },
      { code: "B", label: "The law of obligations" },
      { code: "C", label: "Employment law" },
      { code: "D", label: "Formation & constitution of business organisations" },
      { code: "E", label: "Capital & financing of companies" },
      { code: "F", label: "Management, administration & regulation" },
      { code: "G", label: "Insolvency law" },
      { code: "H", label: "Corporate fraudulent & criminal behaviour" },
    ],
  },
  {
    id: "PM", code: "PM (F5)", name: "Performance Management", level: "Applied Skills", hasCuratedContent: true,
    blurb: "Management accounting techniques for planning, decision-making and control.",
    areas: [
      { code: "A", label: "Management information systems & data analytics" },
      { code: "B", label: "Specialist cost & management accounting" },
      { code: "C", label: "Decision-making techniques" },
      { code: "D", label: "Budgeting & control" },
      { code: "E", label: "Performance measurement & control" },
      { code: "F", label: "Employability & technology skills" },
    ],
  },
  {
    id: "TX", code: "TX (F6)", name: "Taxation", level: "Applied Skills", hasCuratedContent: true,
    blurb: "Core UK taxes: income tax, corporation tax, chargeable gains, VAT and more.",
    areas: [
      { code: "A", label: "UK tax system & administration" },
      { code: "B", label: "Income tax & NIC" },
      { code: "C", label: "Chargeable gains" },
      { code: "D", label: "Inheritance tax" },
      { code: "E", label: "Corporation tax" },
      { code: "F", label: "Value added tax (VAT)" },
      { code: "G", label: "Employability & technology skills" },
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
      { code: "F", label: "Employability & technology skills" },
    ],
  },
  {
    id: "FM", code: "FM (F9)", name: "Financial Management", level: "Applied Skills", hasCuratedContent: true,
    blurb: "Investment appraisal, working capital, business finance, cost of capital and valuation.",
    areas: [
      { code: "A", label: "Financial management function" },
      { code: "B", label: "Financial management environment" },
      { code: "C", label: "Working capital management" },
      { code: "D", label: "Investment appraisal" },
      { code: "E", label: "Business finance" },
      { code: "F", label: "Business valuations" },
      { code: "G", label: "Risk management" },
      { code: "H", label: "Employability & technology skills" },
    ],
  },
  // Strategic Professional — Essentials
  {
    id: "SBL", code: "SBL", name: "Strategic Business Leader", level: "Strategic Professional", hasCuratedContent: true,
    blurb: "The integrated case-study exam: leadership, governance, strategy, risk and professional skills.",
    areas: [
      { code: "A", label: "Leadership" },
      { code: "B", label: "Governance & sustainability" },
      { code: "C", label: "Strategy" },
      { code: "D", label: "Risk" },
      { code: "E", label: "Technology & data analytics" },
      { code: "F", label: "Organisational control & audit" },
      { code: "G", label: "Finance in planning & decision-making" },
      { code: "H", label: "Enabling success, change & projects" },
      { code: "I", label: "Professional skills" },
      { code: "J", label: "Other employability & digital skills" },
    ],
  },
  {
    id: "SBR", code: "SBR", name: "Strategic Business Reporting", level: "Strategic Professional", hasCuratedContent: true,
    blurb: "Applying and appraising IFRS across complex transactions, groups and current issues.",
    areas: [
      { code: "A", label: "Ethical & professional principles" },
      { code: "B", label: "Financial reporting framework" },
      { code: "C", label: "Reporting financial performance" },
      { code: "D", label: "Financial statements of groups" },
      { code: "E", label: "Interpret financial & non-financial information" },
      { code: "F", label: "Changes in accounting regulation" },
      { code: "G", label: "Employability & technology skills" },
    ],
  },
  // Strategic Professional — Options (choose 2)
  {
    id: "AFM", code: "AFM (P4)", name: "Advanced Financial Management", level: "Strategic Professional", isOption: true, hasCuratedContent: true,
    blurb: "The senior adviser's role: advanced appraisal, mergers, reconstruction, treasury & risk.",
    areas: [
      { code: "A", label: "Role of the senior financial adviser" },
      { code: "B", label: "Advanced investment appraisal" },
      { code: "C", label: "Acquisitions & mergers" },
      { code: "D", label: "Corporate reconstruction & reorganisation" },
      { code: "E", label: "Treasury & advanced risk management" },
      { code: "F", label: "Professional skills" },
      { code: "G", label: "Employability & technology skills" },
    ],
  },
  {
    id: "APM", code: "APM (P5)", name: "Advanced Performance Management", level: "Strategic Professional", isOption: true, hasCuratedContent: true,
    blurb: "Designing and evaluating strategic performance management systems.",
    areas: [
      { code: "A", label: "Strategic management & value creation" },
      { code: "B", label: "Performance optimisation" },
      { code: "C", label: "Performance reporting" },
      { code: "D", label: "Data science & technology for insights" },
      { code: "E", label: "Professional skills" },
    ],
  },
  {
    id: "ATX", code: "ATX (P6)", name: "Advanced Taxation", level: "Strategic Professional", isOption: true, hasCuratedContent: true,
    blurb: "Advanced UK tax planning across taxes, with ethics and adviser communication.",
    areas: [
      { code: "A", label: "Advanced UK tax knowledge" },
      { code: "B", label: "Impact & interaction of taxes" },
      { code: "C", label: "Tax planning" },
      { code: "D", label: "Professional skills & communication" },
      { code: "E", label: "Employability & technology skills" },
    ],
  },
  {
    id: "AAA", code: "AAA (P7)", name: "Advanced Audit and Assurance", level: "Strategic Professional", isOption: true, hasCuratedContent: true,
    blurb: "Advanced audit: ethics, quality management, complex planning, evidence and reporting.",
    areas: [
      { code: "A", label: "Regulatory environment" },
      { code: "B", label: "Professional & ethical considerations" },
      { code: "C", label: "Quality management" },
      { code: "D", label: "Planning & conducting an engagement" },
      { code: "E", label: "Completion, review & reporting" },
      { code: "F", label: "Other assignments" },
      { code: "G", label: "Current issues & developments" },
      { code: "H", label: "Professional skills" },
      { code: "I", label: "Employability & technology skills" },
    ],
  },
]

const PAPER_ORDER = [
  "BT", "MA", "FA",
  "LW", "PM", "TX", "FR", "AA", "FM",
  "SBL", "SBR",
  "AFM", "APM", "ATX", "AAA",
]

function orderPapers(papers: AccaPaper[]): AccaPaper[] {
  return [...papers].sort((a, b) => PAPER_ORDER.indexOf(a.id) - PAPER_ORDER.indexOf(b.id))
}

/** Every ACCA paper, in official qualification order. */
export const ALL_PAPERS: AccaPaper[] = orderPapers([...CONTENT_PAPERS, ...OTHER_PAPERS])

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

const KEY_STUDYING = "scholify-acca-studying"

export function getCurrentPaper(): string | null {
  try {
    return getStudyingPapers()[0] ?? window.localStorage.getItem(KEY_CURRENT)
  } catch {
    return null
  }
}

export function setCurrentPaper(id: string): void {
  try {
    window.localStorage.setItem(KEY_CURRENT, id)
    setStudyingPapers([id, ...getStudyingPapers().filter((p) => p !== id)].slice(0, 2))
  } catch {
    /* ignore */
  }
}

/**
 * Papers being studied concurrently (1–2). Kaplan-style guidance: one paper
 * per sitting for most students; two only with real weekly hours to spare.
 * Falls back to the legacy single-paper key.
 */
export function getStudyingPapers(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY_STUDYING)
    if (raw) {
      const arr = JSON.parse(raw) as unknown
      if (Array.isArray(arr) && arr.length > 0) return arr.map(String).slice(0, 2)
    }
    const legacy = window.localStorage.getItem(KEY_CURRENT)
    return legacy ? [legacy] : []
  } catch {
    return []
  }
}

export function setStudyingPapers(ids: string[]): void {
  try {
    const clean = [...new Set(ids)].slice(0, 2)
    window.localStorage.setItem(KEY_STUDYING, JSON.stringify(clean))
    if (clean[0]) window.localStorage.setItem(KEY_CURRENT, clean[0])
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
