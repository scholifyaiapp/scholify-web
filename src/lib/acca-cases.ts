/*
 * Scholify — Section-B OT cases (the real CBE's scenario blocks).
 *
 * The Applied Skills exams (PM/TX/FR/FM) put 30 marks behind "OT cases": a
 * mini-scenario with five linked 2-mark objective questions; AA opens with
 * three of them; the Knowledge exams (FA/MA/BT/LW) close with multi-task
 * questions whose parts share one scenario. These are AUTHORED as units —
 * a scenario and its questions written together — never assembled by
 * grouping standalone bank questions (that would teach the wrong skill).
 *
 * All ORIGINAL and syllabus-aligned — no ACCA IP reproduced.
 */

import type { OtCase } from "@/lib/acca-content"
import { paperContent, loadedPaperIds } from "@/lib/acca-content-registry"
// Fills the registry eagerly under Node (tsx scripts + vitest); a no-op in the browser.
import "@/lib/acca-content-boot"

export type { OtCase } from "@/lib/acca-content"
export { otCaseMarks } from "@/lib/acca-content"

/** The authored OT cases for a paper (empty when none exist yet — the mock
 * composer then falls back to standalone OTs, honestly labelled). */
export function getOtCases(paperId: string): OtCase[] {
  return paperContent(paperId).cases
}

export function getOtCase(id: string): OtCase | undefined {
  for (const paperId of loadedPaperIds()) {
    const found = paperContent(paperId).cases.find((c) => c.id === id)
    if (found) return found
  }
  return undefined
}
