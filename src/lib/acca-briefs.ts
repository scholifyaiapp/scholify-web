/*
 * Topic Briefs — the instruction layer of the Learn stage (2026-07-10).
 * Each brief opens a topic BEFORE any question: the concept in plain
 * language, the structures/formulas, worked examples, and the classic
 * traps (the same nameable errors the question distractors are built on).
 */

export interface TopicBrief {
  paper: string // "FA" | "FR"
  area: string // syllabus area code
  title: string // human title, e.g. "Double-entry & accounting systems"
  minutes: number // realistic reading time, 4-7
  /** Markdown-ish sections rendered in order. */
  sections: {
    kind: "concept" | "structure" | "example" | "traps"
    heading: string
    body: string // plain text with \n\n paragraphs; formulas as plain text lines; NO markdown syntax like ** or #
  }[]
}

import { paperContent } from "@/lib/acca-content-registry"
// Fills the registry eagerly under Node (tsx scripts + vitest); a no-op in the browser.
import "@/lib/acca-content-boot"

/*
 * The briefs load per paper (see acca-content-registry.ts) instead of every
 * paper's brief set being imported here. The loader already resolved which brief
 * modules own this paper, so the five-way fallback chain collapses to one lookup.
 */

/** Look up the brief for a paper + syllabus area, if one exists. */
export function getTopicBrief(paperId: string, area: string): TopicBrief | undefined {
  return paperContent(paperId).briefs.find((b) => b.area === area)
}
