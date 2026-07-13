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

/** Inline emphasis in `md` text: **bold** only — no other markdown. */
export type StudyBlock =
  | { kind: "text"; md: string }
  | { kind: "callout"; tone: "key" | "warn" | "rule" | "tip"; title?: string; md: string }
  | { kind: "formula"; name: string; expr: string; note?: string }
  | { kind: "table"; caption?: string; head: string[]; rows: string[][] }
  | { kind: "example"; title: string; scenario: string; steps: { label: string; detail: string }[]; result: string }
  | { kind: "diagram"; diagram: Diagram }

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
}

/* ── Registry (per paper, extended as chapters land) ──────────── */

import { FA_A } from "@/lib/acca-study-fa-a"
import { FA_B } from "@/lib/acca-study-fa-b"
import { FA_C } from "@/lib/acca-study-fa-c"
import { FA_D } from "@/lib/acca-study-fa-d"
import { FA_E } from "@/lib/acca-study-fa-e"
import { FA_F } from "@/lib/acca-study-fa-f"
import { FA_G } from "@/lib/acca-study-fa-g"
import { FA_H } from "@/lib/acca-study-fa-h"
import { FR_A } from "@/lib/acca-study-fr-a"
import { FR_B } from "@/lib/acca-study-fr-b"
import { FR_C } from "@/lib/acca-study-fr-c"
import { FR_D } from "@/lib/acca-study-fr-d"
import { FR_E } from "@/lib/acca-study-fr-e"
import { MA_A } from "@/lib/acca-study-ma-a"
import { MA_B } from "@/lib/acca-study-ma-b"
import { MA_C } from "@/lib/acca-study-ma-c"
import { MA_D } from "@/lib/acca-study-ma-d"
import { MA_E } from "@/lib/acca-study-ma-e"
import { BT_A } from "@/lib/acca-study-bt-a"
import { BT_B } from "@/lib/acca-study-bt-b"
import { BT_C } from "@/lib/acca-study-bt-c"
import { BT_D } from "@/lib/acca-study-bt-d"

const REGISTRY: Record<string, StudyChapter[]> = {
  FA: [FA_A, FA_B, FA_C, FA_D, FA_E, FA_F, FA_G, FA_H],
  FR: [FR_A, FR_B, FR_C, FR_D, FR_E],
  MA: [MA_A, MA_B, MA_C, MA_D, MA_E],
  BT: [BT_A, BT_B, BT_C, BT_D],
}

/** The rich study chapter for a paper + area, if one exists. */
export function getStudyChapter(paperId: string, area: string): StudyChapter | undefined {
  return REGISTRY[paperId]?.find((c) => c.area === area)
}

/** Does a rich chapter exist for this paper + area? */
export function hasStudyChapter(paperId: string, area: string): boolean {
  return Boolean(getStudyChapter(paperId, area))
}

/** Areas of a paper that already have a rich chapter (for progress/coverage). */
export function chaptersForPaper(paperId: string): StudyChapter[] {
  return REGISTRY[paperId] ?? []
}
