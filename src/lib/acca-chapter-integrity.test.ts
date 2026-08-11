import { describe, expect, it } from "vitest"
import { chaptersForPaper, chapterKey } from "@/lib/acca-study-content"
import { paperLevels } from "@/lib/acca-qualification"

/*
 * STRUCTURAL INTEGRITY OF EVERY STUDY CHAPTER.
 *
 * Chapters are hand-authored TypeScript objects, thousands of lines of them, and
 * the compiler only checks their shape — not whether the content makes sense. A
 * mis-keyed inline check is invisible to `tsc`, invisible in review, and teaches
 * the learner the wrong answer with an explanation that contradicts it.
 *
 * That is not hypothetical: an FM sensitivity-analysis check shipped with
 * `correct` pointing at 6.25% while its own explanation argued for 16%. It was
 * caught by re-reading, which does not scale across fifteen papers.
 *
 * These assertions cannot judge whether an answer is RIGHT — that needs a human
 * who knows the syllabus. They catch every failure that is mechanically
 * detectable, which is most of them.
 */

const ALL_PAPERS = paperLevels().flatMap((level) => level.papers.map((p) => p.id))

describe("every chapter in every paper", () => {
  const chapters = ALL_PAPERS.flatMap((id) => chaptersForPaper(id).map((c) => ({ paper: id, c })))

  it("was loaded at all", () => {
    expect(chapters.length).toBeGreaterThan(200)
  })

  it("has a unique key within its paper", () => {
    // Learner progress records against this key. A duplicate silently credits
    // one chapter's reading to another.
    for (const paper of ALL_PAPERS) {
      const keys = chaptersForPaper(paper).map((c) => chapterKey(c))
      expect(new Set(keys).size, `${paper} has duplicate chapter keys`).toBe(keys.length)
    }
  })

  it("carries the teaching furniture a chapter is supposed to have", () => {
    for (const { paper, c } of chapters) {
      const where = `${paper}/${c.id ?? c.area} "${c.title}"`
      expect(c.sections.length, `${where} has no sections`).toBeGreaterThan(0)
      expect(c.outcomes.length, `${where} has no outcomes`).toBeGreaterThan(0)
      expect(c.summary.length, `${where} has no summary`).toBeGreaterThan(0)
      expect(c.intro.trim(), `${where} has no intro`).not.toBe("")
      expect(c.minutes, `${where} has an implausible reading time`).toBeGreaterThan(0)
      expect(c.minutes, `${where} has an implausible reading time`).toBeLessThanOrEqual(45)
    }
  })

  it("gives every section a non-empty id and heading", () => {
    for (const { paper, c } of chapters) {
      const ids = c.sections.map((s) => s.id)
      expect(new Set(ids).size, `${paper}/${c.id ?? c.area} has duplicate section ids`).toBe(ids.length)
      for (const s of c.sections) {
        expect(s.id.trim(), `${paper}/${c.id ?? c.area} section with empty id`).not.toBe("")
        expect(s.heading.trim(), `${paper}/${c.id ?? c.area}/${s.id} has no heading`).not.toBe("")
        expect(s.blocks.length, `${paper}/${c.id ?? c.area}/${s.id} has no blocks`).toBeGreaterThan(0)
      }
    }
  })

  it("keys every inline check to an option that exists", () => {
    /*
     * THE ONE THIS FILE EXISTS FOR. `correct` is an index into `options`; an
     * off-by-one or a stale index after reordering the options marks the right
     * answer wrong, and the learner is told they failed a question they passed.
     */
    for (const { paper, c } of chapters) {
      for (const s of c.sections) {
        if (!s.check) continue
        const at = `${paper}/${c.id ?? c.area}/${s.id}`
        expect(s.check.options.length, `${at} check has too few options`).toBeGreaterThanOrEqual(2)
        expect(Number.isInteger(s.check.correct), `${at} check.correct is not an integer`).toBe(true)
        expect(s.check.correct, `${at} check.correct is below 0`).toBeGreaterThanOrEqual(0)
        expect(s.check.correct, `${at} check.correct is past the end of options`).toBeLessThan(s.check.options.length)
        expect(s.check.q.trim(), `${at} check has no question`).not.toBe("")
        expect(s.check.explain.trim().length, `${at} check has no real explanation`).toBeGreaterThan(20)
        // Duplicate options make more than one answer defensible.
        const opts = s.check.options.map((o) => o.trim().toLowerCase())
        expect(new Set(opts).size, `${at} check has duplicate options`).toBe(opts.length)
      }
    }
  })

  it("pairs every exam trap with a fix, and every key term with a definition", () => {
    for (const { paper, c } of chapters) {
      const where = `${paper}/${c.id ?? c.area}`
      for (const t of c.examTraps) {
        expect(t.trap.trim(), `${where} has an empty trap`).not.toBe("")
        expect(t.fix.trim(), `${where} trap "${t.trap.slice(0, 40)}" has no fix`).not.toBe("")
      }
      for (const k of c.keyTerms) {
        expect(k.term.trim(), `${where} has an empty key term`).not.toBe("")
        expect(k.def.trim(), `${where} term "${k.term}" has no definition`).not.toBe("")
      }
    }
  })

  it("pairs every knowledge-diagnostic question with an answer", () => {
    for (const { paper, c } of chapters) {
      for (const d of c.knowledgeDiagnostic ?? []) {
        expect(d.q.trim(), `${paper}/${c.id ?? c.area} diagnostic with no question`).not.toBe("")
        expect(d.a.trim(), `${paper}/${c.id ?? c.area} diagnostic "${d.q.slice(0, 40)}" has no answer`).not.toBe("")
      }
    }
  })
})

/*
 * THE F1–F9 STANDARD.
 *
 * The nine papers a student meets before Strategic Professional are the ones
 * Scholify sells today, so they carry a floor that the rest do not yet.
 *
 * A sweep on 11 Aug 2026 found exactly two chapters in those nine missing the
 * teaching furniture every other chapter had — FM Area H and AA Area F, both
 * legacy bodies left in place while the rest of their paper was rebuilt. They
 * had chapters, and they had no syllabusRefs, no inline check and no knowledge
 * diagnostic, and nothing in the codebase would have said so.
 *
 * This is that sweep, made permanent. It is deliberately scoped to F1–F9: the
 * Strategic papers are mid-rebuild and flagged as such in the picker, so holding
 * them to a standard they have not reached yet would just mean a permanently red
 * suite. Add each one here as its rebuild lands.
 */
describe("the F1–F9 chapter standard", () => {
  const PAPERS = ["BT", "MA", "FA", "LW", "PM", "TX", "FR", "AA", "FM"]

  it("holds for the nine papers currently sold", () => {
    for (const paper of PAPERS) {
      const chapters = chaptersForPaper(paper)
      expect(chapters.length, `${paper} has no chapters`).toBeGreaterThanOrEqual(20)

      for (const c of chapters) {
        const where = `${paper}/${c.id ?? c.area} "${c.title}"`
        // Maps the chapter to the official study guide, so coverage is checkable.
        expect(c.syllabusRefs?.length ?? 0, `${where} has no syllabusRefs`).toBeGreaterThan(0)
        // A bullet is read; a question is answered. Only the second tells the
        // learner whether the chapter landed.
        expect(c.knowledgeDiagnostic?.length ?? 0, `${where} has no knowledgeDiagnostic`).toBeGreaterThan(0)
        // At least one inline check, so the reader is tested mid-chapter rather
        // than only at the end of the day.
        expect(c.sections.some((s) => s.check), `${where} has no inline check`).toBe(true)
        // Traps are the whole point of an exam-prep chapter.
        expect(c.examTraps.length, `${where} has fewer than 2 exam traps`).toBeGreaterThanOrEqual(2)
        expect(c.keyTerms.length, `${where} has no key terms`).toBeGreaterThan(0)
      }
    }
  })

  it("gives every F1–F9 chapter a stable id and number", () => {
    // Learner progress keys off id, and the composer orders by number. A chapter
    // missing either sorts unpredictably — which put an area with three
    // questions in the whole bank first in line for a new AA learner.
    for (const paper of PAPERS) {
      for (const c of chaptersForPaper(paper)) {
        expect(c.id, `${paper}/${c.area} "${c.title}" has no id`).toBeTruthy()
        expect(typeof c.number, `${paper}/${c.id} has no number`).toBe("number")
      }
    }
  })
})
