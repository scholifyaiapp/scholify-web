import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"

/*
 * THE BUTTON MUST DO WHAT IT SAYS.
 *
 * The chapter reader ends on "Complete lesson — unlock 5 Quizzes". Its handler
 * lives in a different file (AccaStudy wires it in), which is exactly how the
 * two drifted apart: the label kept promising quizzes long after the handler
 * had been changed to return to the overview, where the plan offered the next
 * topic instead. Nothing failed, nothing logged, and a learner who had just
 * read for sixteen minutes was handed a different chapter.
 *
 * A label and a handler in separate files cannot be checked by reading either
 * one, so they are checked here, together.
 *
 * Behaviour of the day itself is covered in acca-today-composer.test.ts — this
 * file only guards the join, which is where the promise was actually lost.
 */

const src = (p: string) => readFileSync(resolve(__dirname, "..", p), "utf8")
const stripComments = (t: string) => t.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "")

describe("the end of a chapter", () => {
  const reader = src("components/acca/StudyChapterReader.tsx")
  const study = stripComments(src("pages/AccaStudy.tsx"))

  it("still promises quizzes on the button", () => {
    // If this promise is ever reworded, the assertions below are the ones that
    // need rewording with it — not quietly deleted.
    expect(reader).toMatch(/unlock \d+ Quizzes/i)
    expect(reader).toContain("onClick={onPractice}")
  })

  /** The onPractice handler AccaStudy hands to StudyChapterReader. */
  const handler = (() => {
    const at = study.indexOf("onPractice={() => {")
    expect(at, "AccaStudy no longer wires onPractice into the chapter reader").toBeGreaterThan(-1)
    return study.slice(at, study.indexOf("}}", study.indexOf("setMode(\"overview\")", at)) + 2)
  })()

  it("launches the quizzes rather than returning to the plan", () => {
    /*
     * THE BUG, PINNED. The handler used to end at setMode("overview") and
     * nothing else — recording the read, then dropping the learner back where
     * the next topic was waiting.
     */
    expect(handler, "the end-of-lesson handler no longer starts a question session")
      .toMatch(/onComposedFromLink|startTopicSession/)
  })

  it("hands over the day's OWN quiz block, so it gets marked done", () => {
    // A fresh topic session would leave the composed quiz block unfinished and
    // then serve five more questions on top of the five just answered.
    expect(handler).toContain("onComposedFromLink")
    expect(handler).toContain("today.quiz")
  })

  it("reads today BEFORE recording the chapter as read", () => {
    /*
     * composeToday derives the day from chapter progress, so once
     * markChapterRead lands it composes the NEXT chapter. Capturing the quiz
     * after that point hands over questions on a chapter the learner has not
     * opened — the same failure, one step later. Proven behaviourally in
     * acca-today-composer.test.ts ("composes the NEXT chapter once the read is
     * recorded"); the order is enforced here.
     */
    const composedAt = handler.indexOf("composeToday(")
    const markedAt = handler.indexOf("markChapterRead(")
    expect(composedAt, "the handler no longer composes today's day").toBeGreaterThan(-1)
    expect(markedAt, "the handler no longer records the chapter as read").toBeGreaterThan(-1)
    expect(composedAt, "composeToday must run before markChapterRead").toBeLessThan(markedAt)
  })

  it("keeps a way out when the paper has no questions for the topic", () => {
    // Otherwise the fallback parks the learner on the chapter they just
    // finished, with a toast and no next step.
    expect(handler).toContain("setMode(\"overview\")")
  })
})
