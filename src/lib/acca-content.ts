/*
 * Scholify — ACCA content: papers, syllabus areas, and a seed question bank.
 *
 * IMPORTANT (legal): every question here is ORIGINAL and written to align with
 * the public ACCA syllabus. We do NOT reproduce ACCA's official exam questions
 * or marking schemes (their IP). "ACCA" is used descriptively only — Scholify
 * is not affiliated with or endorsed by ACCA.
 *
 * Accuracy is existential: one wrong answer destroys trust. Every item below
 * has a verified answer + a teaching explanation. New questions come from the
 * AI generator later; these seeds make the loop work with zero API keys.
 */

export type QuestionType = "mcq" | "multi" | "number"
export type Difficulty = "easy" | "medium" | "hard"

export interface SyllabusArea {
  /** Single-letter area code used across the syllabus, e.g. "D". */
  code: string
  label: string
}

export interface AccaPaper {
  /** Short id used in routes + storage, e.g. "FA". */
  id: string
  /** Display code, e.g. "FA (F3)". */
  code: string
  name: string
  /** ACCA level. */
  level: "Applied Knowledge" | "Applied Skills" | "Strategic Professional"
  blurb: string
  areas: SyllabusArea[]
  /** Strategic Professional Options paper (student picks 2 of 4). */
  isOption?: boolean
  /** True once a curated question bank exists (vs AI-generated practice only). */
  hasCuratedContent?: boolean
  /**
   * The real ACCA exam for this paper is 100% objective-test — BT, MA, FA and LW
   * have no constructed-response section at all. Written marking is therefore
   * not "coming soon" for them; it is not part of their exam, and promising it
   * would be teaching the wrong thing. The AI Examiner is hidden for these.
   */
  objectiveOnly?: boolean
}

export interface AccaQuestion {
  id: string
  /** Paper id this belongs to (matches AccaPaper.id). */
  paper: string
  /** Syllabus area code (matches a SyllabusArea.code on the paper). */
  area: string
  type: QuestionType
  /** The question text/stem. */
  stem: string
  /** Answer options (mcq / multi). */
  options?: string[]
  /** Correct option index (mcq) or indices (multi). */
  correct?: number | number[]
  /** Correct value for a numeric-entry question. */
  numericAnswer?: number
  /** Unit shown alongside a numeric answer, e.g. "$". */
  unit?: string
  /** Accepted +/- tolerance for numeric answers. */
  tolerance?: number
  /** Why the answer is correct — shown after grading. */
  explanation: string
  /** Marks the question is worth (OT questions are typically 2). */
  marks: number
  difficulty: Difficulty
}

/* ── Papers ───────────────────────────────────────────────────── */

export const PAPERS: AccaPaper[] = [
  {
    id: "FA",
    code: "FA (F3)",
    name: "Financial Accounting",
    level: "Applied Knowledge",
    hasCuratedContent: true,
    objectiveOnly: true,
    blurb:
      "The foundations: double-entry, recording transactions, trial balance, and preparing basic financial statements.",
    areas: [
      { code: "A", label: "Context & purpose of financial reporting" },
      { code: "B", label: "Qualitative characteristics of financial information" },
      { code: "C", label: "Double-entry & accounting systems" },
      { code: "D", label: "Recording transactions & events" },
      { code: "E", label: "Preparing a trial balance" },
      { code: "F", label: "Preparing basic financial statements" },
      { code: "G", label: "Simple consolidated financial statements" },
      { code: "H", label: "Interpretation of financial statements" },
    ],
  },
  {
    id: "FR",
    code: "FR (F7)",
    name: "Financial Reporting",
    level: "Applied Skills",
    hasCuratedContent: true,
    blurb:
      "Applying IFRS Accounting Standards to transactions, and preparing & interpreting financial statements including groups.",
    areas: [
      { code: "A", label: "The conceptual & regulatory framework" },
      { code: "B", label: "Accounting for transactions (IFRS)" },
      { code: "C", label: "Analysing & interpreting financial statements" },
      { code: "D", label: "Preparation of financial statements" },
      { code: "E", label: "Consolidated financial statements" },
    ],
  },
]

/* ── Question bank ────────────────────────────────────────────────
 * The questions themselves are NOT here any more, and nothing may import them
 * from this module. A student studies one paper; this file used to hand them all
 * fifteen (~2 MB) because every page imports acca.ts, which imported this barrel.
 *
 * The seed bank now lives in acca-content-core.ts, the per-paper waves in
 * acca-content-<paper>N.ts, and acca-paper-content.ts dynamically imports ONE
 * paper's worth into the registry. What stays here is METADATA — the types and
 * PAPERS — which the picker, onboarding, pricing and routing need eagerly, before
 * any paper has been chosen. Keep it that way: a single static content import
 * here undoes the whole split.
 */

