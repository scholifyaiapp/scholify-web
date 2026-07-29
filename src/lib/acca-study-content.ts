/*
 * Scholify — rich study chapters (the "learn every aspect" layer).
 *
 * This is the Kaplan/BPP-depth study text, made native: a full chapter per
 * syllabus area with theory, worked examples, diagrams, charts, exam traps and
 * inline knowledge checks. Rendered by StudyChapterReader with tasteful CSS/SVG
 * depth and interactive visuals. Content is original and syllabus-aligned.
 *
 * Sits ABOVE the Topic Briefs: where a rich chapter exists the Study page opens
 * it for the UNDERSTAND step; otherwise it falls back to the brief.
 */

/* ── Blocks ───────────────────────────────────────────────────── */

/**
 * Inline emphasis in `md` text: **bold** only — no other markdown.
 *
 * The first six kinds are the original set. The last four were added to close
 * the pedagogical gap against the approved-provider study texts, which teach
 * with a wider vocabulary than prose + tables + steppers:
 *
 *  · `list`         — Kaplan and BPP both teach in bullet runs. These used to be
 *                     crammed into one `text` block as sentences joined by
 *                     semicolons, which reads as a wall and loses the parallelism
 *                     that makes a list memorable.
 *  · `definition`   — the boxed KEY TERM. Distinct from a `callout`: it is the
 *                     examinable wording of one term, and the reader renders it
 *                     so a learner can scan a chapter for its definitions alone.
 *  · `illustration` — Kaplan's "Illustration" / BPP's "Real life example": a
 *                     concrete instance that makes an abstraction stick. NOT a
 *                     computation, which is what `example` (the stepper) is for.
 *  · `activity`     — Kaplan's "Test your understanding" / BPP's "Activity": a
 *                     prompt the learner attempts BEFORE revealing a model
 *                     answer. Unlike `check` (one MCQ, auto-marked, gates the
 *                     progress bar) an activity can be discursive, which is how
 *                     the books build the reasoning objective tests then test.
 */
export type StudyBlock =
  | { kind: "text"; md: string }
  | { kind: "callout"; tone: "key" | "warn" | "rule" | "tip"; title?: string; md: string }
  | { kind: "formula"; name: string; expr: string; note?: string }
  | { kind: "table"; caption?: string; head: string[]; rows: string[][] }
  | { kind: "example"; title: string; scenario: string; steps: { label: string; detail: string }[]; result: string }
  | { kind: "diagram"; diagram: Diagram }
  | { kind: "list"; style?: "bullet" | "number"; title?: string; items: string[] }
  | { kind: "definition"; term: string; md: string }
  | { kind: "illustration"; title: string; md: string }
  | { kind: "activity"; title: string; prompt: string; answer: string }

/* ── Diagrams (rendered by StudyDiagram) ──────────────────────── */

export type DiagramType =
  | "scale"      // accounting equation balance: A = L + E
  | "tAccount"   // a debit/credit T-account
  | "radial"     // a centre node with labelled spokes (e.g. users of accounts)
  | "compare"    // two-column comparison (aspect | left | right)
  | "cards"      // a grid of labelled cards (e.g. the financial statements)
  | "flow"       // left-to-right step flow with arrows
  | "cycle"      // a circular process (e.g. the accounting cycle)
  | "waterfall"  // a bridge chart (start → +/− deltas → total)
  | "bars"       // a simple bar chart
  | "donut"      // proportion ring
  | "pyramid"    // stacked levels, top to bottom
  | "timeline"   // horizontal ordered points

export interface Diagram {
  type: DiagramType
  title?: string
  caption?: string
  /**
   * Shape depends on `type` (see StudyDiagram):
   *  scale     { assets, liabilities, equity }                    (strings)
   *  tAccount  { name, debits:[{label,amount}], credits:[...] }
   *  radial    { centre, nodes:[{label, sub?}] }
   *  compare   { leftTitle, rightTitle, rows:[{aspect, left, right}] }
   *  cards     { items:[{title, sub?}] }
   *  flow      { steps:[{label, sub?}] }
   *  cycle     { steps:[{label}] }
   *  waterfall { unit?, items:[{label, value, kind?:"start"|"delta"|"total"}] }
   *  bars      { unit?, items:[{label, value}] }
   *  donut     { items:[{label, value}] }
   *  pyramid   { levels:[{label, sub?}] }
   *  timeline  { points:[{label, sub?}] }
   */
  data: unknown
}

/* ── A mini knowledge check between sections ──────────────────── */

export interface MiniCheck {
  q: string
  options: string[]
  correct: number
  explain: string
}

/* ── Section & chapter ────────────────────────────────────────── */

export interface StudySection {
  id: string
  heading: string
  blocks: StudyBlock[]
  /** Optional inline check that gates the reader's progress bar. */
  check?: MiniCheck
}

export interface StudyChapter {
  paper: string
  /**
   * The OFFICIAL syllabus area this chapter is examined under.
   *
   * NOT unique: a paper may have many chapters per area, which is how the
   * approved-provider texts are organised (Kaplan's BT text spends nine of its
   * twenty-five chapters on Area A alone). One chapter per area compresses a
   * whole area into a single sitting; a tree lets each topic get the room it
   * needs. Read `id`, not `area`, when you need to identify a chapter.
   */
  area: string
  title: string
  /** Realistic read+work time, 10–20. */
  minutes: number
  /** One-line hook shown under the title. */
  intro: string
  /** "By the end of this chapter you can …" */
  outcomes: string[]
  sections: StudySection[]
  /** The classic mistakes — mirror the question distractors. */
  examTraps: { trap: string; fix: string }[]
  /** Definitions for the flip-card glossary. */
  keyTerms: { term: string; def: string }[]
  /** Bullet recap. */
  summary: string[]

  /* ── Chapter-tree fields (optional: papers still on one-chapter-per-area
   *    omit them and every lookup below falls back to the area code) ── */

  /**
   * Stable unique id, e.g. "BT-04". Learner progress and the reader's routing
   * key off this, so it must never change once shipped — retitle freely, but
   * renumbering an id orphans whatever was recorded against it.
   */
  id?: string
  /** Position in the paper's reading order, 1-based. */
  number?: number
  /** Official study-guide references this chapter delivers, e.g. ["A1(a)", "A2(b)"]. */
  syllabusRefs?: string[]
  /**
   * The chapter-end recap as question → answer, mirroring BPP's "Knowledge
   * diagnostic". Deliberately not `summary`: a bullet is read, a question is
   * answered, and only the second one tells the learner whether the chapter
   * actually landed.
   */
  knowledgeDiagnostic?: { q: string; a: string }[]
  /** Where this chapter connects onward — later papers, ACCA articles, adjacent chapters. */
  furtherStudy?: string[]
}

/* ── Lookup ───────────────────────────────────────────────────────
 * The chapters themselves are no longer imported here: 75 chapters across 15
 * papers is ~2 MB, and a student reads ONE paper's. acca-paper-content.ts
 * dynamically imports the active paper's chapters into the registry; these
 * getters stay synchronous and read that paper's slice. A paper that has not
 * been loaded reads as "no chapters yet" — the study surfaces wait on
 * usePaperContent() before they render, so that state is never shown.
 */

import { paperContent } from "@/lib/acca-content-registry"
// Fills the registry eagerly under Node (tsx scripts + vitest); a no-op in the browser.
import "@/lib/acca-content-boot"

/**
 * A chapter's stable key. Chapters authored as a tree carry an explicit `id`;
 * legacy one-per-area chapters fall back to `PAPER-AREA`, which was already
 * unique for them, so nothing recorded against the old scheme is lost.
 */
export function chapterKey(chapter: StudyChapter): string {
  return chapter.id ?? `${chapter.paper}-${chapter.area}`
}

/**
 * The FIRST rich study chapter for a paper + area.
 *
 * Kept for the papers that genuinely have one chapter per area. On a paper with
 * a chapter tree this returns the area's opening chapter and hides the rest, so
 * new call sites should use `chaptersForArea` and let the learner choose.
 */
export function getStudyChapter(paperId: string, area: string): StudyChapter | undefined {
  return paperContent(paperId).chapters.find((c) => c.area === area)
}

/** Every chapter examined under one syllabus area, in reading order. */
export function chaptersForArea(paperId: string, area: string): StudyChapter[] {
  return paperContent(paperId).chapters.filter((c) => c.area === area)
}

/** One chapter by its stable key, from anywhere in the paper. */
export function getChapterByKey(paperId: string, key: string): StudyChapter | undefined {
  return paperContent(paperId).chapters.find((c) => chapterKey(c) === key)
}

/** Does a rich chapter exist for this paper + area? */
export function hasStudyChapter(paperId: string, area: string): boolean {
  return Boolean(getStudyChapter(paperId, area))
}

/** Areas of a paper that already have a rich chapter (for progress/coverage). */
export function chaptersForPaper(paperId: string): StudyChapter[] {
  return paperContent(paperId).chapters
}

/** True when this paper is authored as a multi-chapter tree rather than one per area. */
export function hasChapterTree(paperId: string): boolean {
  const chapters = paperContent(paperId).chapters
  return chapters.length > new Set(chapters.map((c) => c.area)).size
}

/** Total authored reading time for a paper, in minutes. */
export function paperStudyMinutes(paperId: string): number {
  return paperContent(paperId).chapters.reduce((total, c) => total + c.minutes, 0)
}
