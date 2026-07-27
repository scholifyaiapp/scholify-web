import { describe, expect, it } from "vitest"
import { ALL_PAPERS } from "@/lib/acca-qualification"
import { loadPaperContent } from "@/lib/acca-paper-content"
import { paperContent } from "@/lib/acca-content-registry"
import { buildDiagnostic } from "@/lib/acca-diagnostic"

/*
 * Examiner-standard integrity of the objective banks.
 *
 * A question is worthless — worse than absent — if it can be answered without
 * knowing the subject, because the learner's mastery model, diagnostic score and
 * Exam Readiness Score are all computed from these answers. An inflated score is
 * the single most damaging thing this product can produce.
 *
 * The defect this pins: the "Which pairing correctly matches X to its meaning?"
 * questions built their distractors as `otherTerm — thisDefinition`, so all four
 * options carried the SAME definition and only the correct one began with the
 * term named in the stem. 289 of 289 such questions across all 15 papers were
 * answerable by string-matching alone.
 */

describe("objective bank integrity", () => {
  it("has no question whose answer is identifiable from the stem alone", async () => {
    const offenders: string[] = []
    for (const paper of ALL_PAPERS) {
      await loadPaperContent(paper.id)
      for (const q of paperContent(paper.id).questions) {
        if (q.type !== "mcq" || !q.options) continue
        // The term the stem is asking about, when it names one in quotes.
        const subject = (q.stem.match(/[“"]([^”"]+)[”"]/) || [])[1]
        if (!subject) continue
        const startsWithSubject = q.options.filter((o) => String(o).startsWith(subject))
        const answer = String(q.options[q.correct as number])
        // Only the right answer visibly echoing the stem's subject = giveaway.
        if (startsWithSubject.length === 1 && answer.startsWith(subject)) {
          offenders.push(`${paper.id} ${q.id}`)
        }
      }
    }
    expect(offenders.slice(0, 12), `${offenders.length} giveaway questions`).toEqual([])
  })

  it("never offers the same option text twice in one question", async () => {
    const offenders: string[] = []
    for (const paper of ALL_PAPERS) {
      await loadPaperContent(paper.id)
      for (const q of paperContent(paper.id).questions) {
        if (!q.options) continue
        const seen = new Set(q.options.map((o) => String(o).trim().toLowerCase()))
        if (seen.size !== q.options.length) offenders.push(`${paper.id} ${q.id}`)
      }
    }
    expect(offenders.slice(0, 12), `${offenders.length} questions with duplicate options`).toEqual([])
  })

  it("never labels a derived recall drill as medium or hard", async () => {
    // DIFFICULTY_WEIGHT scores the diagnostic by this label, and the reveal
    // promises "a hard one right counts for more". A one-step glossary lookup
    // tagged "hard" hands the learner unearned readiness.
    for (const paper of ALL_PAPERS) {
      await loadPaperContent(paper.id)
      const mislabelled = paperContent(paper.id).questions.filter((q) => q.recall && q.difficulty !== "easy")
      expect(mislabelled.map((q) => q.id).slice(0, 5), `${paper.id}`).toEqual([])
    }
  })

  it("keeps the graded diagnostic authored wherever the bank allows it", async () => {
    // The Exam Readiness Score is the product's central promise. Recall drills
    // are far easier than a real CBE, so a diagnostic padded with them reads
    // high and then the real exam doesn't. Papers with a real authored bank must
    // produce an essentially recall-free form; the exception is a paper whose
    // bank genuinely has almost nothing authored, where a short honest ladder
    // still beats an absent syllabus area.
    const thin = new Set(["LW"]) // LW-Global ships 8 authored questions; see review notes.
    for (const paper of ALL_PAPERS) {
      if (thin.has(paper.id)) continue
      await loadPaperContent(paper.id)
      const form = buildDiagnostic(paper.id, 42)
      const recall = form.filter((q) => q.recall).length
      expect(recall / form.length, `${paper.id} diagnostic is ${recall}/${form.length} recall`).toBeLessThanOrEqual(0.2)
    }
  })

  it("always places the correct option somewhere other than a fixed position", async () => {
    // Answer-position bias: if the key is always A, a candidate who always picks
    // A scores 100% and the readiness model believes them.
    for (const paper of ALL_PAPERS) {
      await loadPaperContent(paper.id)
      const mcqs = paperContent(paper.id).questions.filter((q) => q.type === "mcq" && q.options)
      const positions = new Set(mcqs.map((q) => q.correct as number))
      expect(positions.size, `${paper.id} uses only ${positions.size} answer position(s)`).toBeGreaterThan(1)
    }
  })
})
