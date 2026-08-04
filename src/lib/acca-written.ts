/*
 * Scholify — ACCA written (constructed-response) questions for the AI Examiner.
 *
 * These are the questions the giants can't give instant feedback on: discursive
 * answers marked per valid point. Each carries a rubric (marking points) the AI
 * Examiner marks against. All ORIGINAL and syllabus-aligned — no ACCA IP
 * reproduced.
 *
 * Coverage follows the real exams: every paper with a constructed-response
 * section (FR, PM, TX, FM, AA and all six Strategic Professional papers) has a
 * written set. BT, MA, FA and LW are 100% objective-test exams — they carry no
 * written questions BY DESIGN, and the app hides the AI Examiner for them
 * rather than promising marking their exam will never ask for.
 */

export interface WrittenQuestion {
  id: string
  paper: string
  area: string
  /** Short topic label for lists. */
  topic: string
  /** The full question text. */
  stem: string
  maxMarks: number
  /** Marking points — the examiner awards ~1 mark per valid point covered. */
  rubric: string[]
  /**
   * The study chapter this question examines, e.g. "PM-14".
   *
   * Optional because the legacy banks predate the chapter trees. It does two jobs where
   * it is set: it lets a contract test assert that Section C actually covers the
   * chapters it claims to, and — as with the OT kits — it marks the question as authored
   * against the OFFICIAL syllabus, so the paper's legacy area-migration map must pass it
   * through untouched instead of shifting its area.
   */
  chapter?: string
}

import { paperContent, loadedPaperIds } from "@/lib/acca-content-registry"
// Fills the registry eagerly under Node (tsx scripts + vitest); a no-op in the browser.
import "@/lib/acca-content-boot"

/*
 * The written banks load per paper (see acca-content-registry.ts). These getters
 * stay synchronous and read the loaded paper's slice — a paper with no written
 * section (BT/MA/FA/LW) and a paper that simply has not loaded yet both read as
 * an empty list, and the Examiner surface waits on usePaperContent() so only the
 * first of those is ever shown.
 */
export function getWrittenQuestions(paperId: string): WrittenQuestion[] {
  return paperContent(paperId).written
}

export function getWrittenQuestion(id: string): WrittenQuestion | undefined {
  for (const paperId of loadedPaperIds()) {
    const found = paperContent(paperId).written.find((q) => q.id === id)
    if (found) return found
  }
  return undefined
}
