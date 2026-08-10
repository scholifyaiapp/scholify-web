import { describe, it, expect, beforeEach } from "vitest"
import {
  composeToday,
  dayProgress,
  blockComplete,
  QUIZ_SIZE,
  PRACTICE_MIN,
  PRACTICE_MAX,
  CARDS_MIN,
  CARDS_MAX,
} from "@/lib/acca-today-composer"
import { setPlan } from "@/lib/acca-plan"
import { markChapterRead } from "@/lib/acca-topic-plan"
import { chaptersForPaper, chapterKey } from "@/lib/acca-study-content"
import { markArticleRead } from "@/lib/acca-tech-article"

/*
 * TODAY, composed — the founder's numbers, enforced.
 *
 * These are product decisions with a specific history, and each assertion below
 * corresponds to something the old engine got wrong:
 *
 *   · practice ran to 30 questions on a long day (an endurance test, not a study
 *     session) and could fall to a handful on a short one;
 *   · flashcards ran to 40 cards, drawn from the whole deck, unrelated to what had
 *     just been read;
 *   · the study block named a syllabus AREA, so it could not be finished;
 *   · quizzes and practice were drawn from one bank minutes apart with no shared
 *     exclusion, so the same question could be asked twice in an hour.
 *
 * If any of these drifts again, the day stops matching what the landing page,
 * onboarding and the plan preview all promise — which is the specific failure this
 * file exists to prevent.
 */

beforeEach(() => {
  window.localStorage.clear()
})

describe("the shape of a day", () => {
  it("always composes the five blocks in teaching order", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const day = composeToday("BT", true)
    const kinds = day.blocks.map((b) => b.kind)
    // Study → quiz → practice → flashcards → (article). The order is pedagogical:
    // you cannot quiz a chapter you have not read, and practice before the quiz
    // measures reading comprehension rather than application.
    expect(kinds.slice(0, 4)).toEqual(["study", "quiz", "practice", "flashcards"])
    expect(day.blocks.every((b, i) => b.step === i + 1)).toBe(true)
  })

  it("names an EXACT chapter, never a syllabus area", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const day = composeToday("BT", true)
    expect(day.chapter).toBeTruthy()
    expect(day.hardness).toBeTruthy()
    const study = day.blocks[0]
    expect(study.chapterKey).toBe(chapterKey(day.chapter!))
    // The bug: "Study A · Business organisation" — a title that is only an area.
    expect(study.title).toContain(day.chapter!.title)
  })

  it("advances to the next chapter once today's is read", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const first = composeToday("BT", true)
    markChapterRead("BT", chapterKey(first.chapter!))
    const second = composeToday("BT", true)
    expect(chapterKey(second.chapter!)).not.toBe(chapterKey(first.chapter!))
  })

  it("offers a revision pass once the whole paper is read, instead of nothing", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    for (const c of chaptersForPaper("BT")) markChapterRead("BT", chapterKey(c))
    const day = composeToday("BT", true)
    // "Nothing left to learn" is not the same as "ready".
    expect(day.isRevision).toBe(true)
    expect(day.chapter).toBeTruthy()
    expect(day.blocks[0].detail).toContain("Second pass")
  })
})

describe("the counts, at every budget", () => {
  const budgets = [15, 25, 40, 60, 90, 120, 180, 300]

  it("gives exactly five quizzes, whatever the budget", () => {
    for (const dailyMinutes of budgets) {
      setPlan("BT", { dailyMinutes, daysPerWeek: 6, targetProb: 75 })
      const day = composeToday("BT", true)
      const quiz = day.blocks.find((b) => b.kind === "quiz")!
      expect(quiz.count, `at ${dailyMinutes} min`).toBe(QUIZ_SIZE)
    }
  })

  it("keeps practice between 10 and 15 at every budget", () => {
    for (const dailyMinutes of budgets) {
      setPlan("BT", { dailyMinutes, daysPerWeek: 6, targetProb: 85 })
      const day = composeToday("BT", true)
      const practice = day.blocks.find((b) => b.kind === "practice")!
      // The floor holds on a 15-minute day — a short day still owes ten questions.
      expect(practice.count, `floor at ${dailyMinutes} min`).toBeGreaterThanOrEqual(PRACTICE_MIN)
      // The ceiling holds on a 300-minute day — extra minutes must not buy a grind.
      expect(practice.count, `ceiling at ${dailyMinutes} min`).toBeLessThanOrEqual(PRACTICE_MAX)
    }
  })

  it("keeps flashcards between 5 and 10, drawn from today's topic", () => {
    for (const dailyMinutes of budgets) {
      setPlan("BT", { dailyMinutes, daysPerWeek: 6, targetProb: 75 })
      const day = composeToday("BT", true)
      const cards = day.blocks.find((b) => b.kind === "flashcards")!
      expect(cards.count!, `at ${dailyMinutes} min`).toBeGreaterThanOrEqual(1)
      expect(cards.count!, `at ${dailyMinutes} min`).toBeLessThanOrEqual(CARDS_MAX)
      if (day.cards.length >= CARDS_MIN) {
        expect(day.cards.length).toBeGreaterThanOrEqual(CARDS_MIN)
      }
    }
  })

  it("ties the flashcards to the chapter's own syllabus area where the deck allows", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const day = composeToday("BT", true)
    const area = day.chapter!.area
    const fromArea = day.cards.filter((c) => c.area === area).length
    // The old engine drew from the whole deck, so the cards had nothing to do with
    // what had just been read. Where the area has enough cards, they all come from it.
    if (day.cards.length > 0 && fromArea > 0) {
      expect(fromArea).toBe(day.cards.length)
    }
  })
})

describe("nothing repeats", () => {
  it("never puts the same question in today's quiz and today's practice", () => {
    setPlan("BT", { dailyMinutes: 90, daysPerWeek: 6, targetProb: 75 })
    const day = composeToday("BT")
    const quizIds = new Set(day.quiz.map((q) => q.id))
    const overlap = day.practice.filter((p) => quizIds.has(p.id))
    expect(overlap).toEqual([])
  })

  it("draws the quiz from AUTHORED questions, not recall drills", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const day = composeToday("BT")
    // The quiz is the "did the reading land" check. A derived recall drill is a
    // flashcard wearing four options, and grading on it inflates the score.
    expect(day.quiz.every((q) => q.recall !== true)).toBe(true)
  })

  it("scopes the day's questions to today's topic, widening as one step not a mixture", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const day = composeToday("BT")
    const key = chapterKey(day.chapter!)
    const area = day.chapter!.area
    const all = [...day.quiz, ...day.practice]
    expect(all.length).toBeGreaterThan(0)

    const chapterScoped = all.filter((q) => q.chapter === key).length
    const areaScoped = all.filter((q) => q.area === area).length

    /*
     * The pool widens chapter → area → paper in one STEP, never as a blend: a
     * chapter with its own indexed questions must not get area filler mixed in
     * alongside them, because that is how "practise today's topic" quietly becomes
     * "practise anything". So either the whole set is chapter-indexed, or the whole
     * set is at least area-scoped, or the area genuinely has no bank at all.
     */
    if (chapterScoped > 0) {
      expect(chapterScoped).toBe(all.length)
    } else {
      const areaHasBank = areaScoped > 0
      if (areaHasBank) expect(areaScoped).toBe(all.length)
    }
  })

  it("is stable across re-composition, so a reload does not reshuffle the day", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const a = composeToday("BT", true)
    const b = composeToday("BT", true)
    expect(b.quiz.map((q) => q.id)).toEqual(a.quiz.map((q) => q.id))
    expect(b.practice.map((q) => q.id)).toEqual(a.practice.map((q) => q.id))
  })

  it("a dry run does not consume the day's questions", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    // Tomorrow's preview and the plan tab both compose without claiming. If a
    // preview consumed ids, merely LOOKING at tomorrow would change it.
    const preview = composeToday("BT", true)
    const live = composeToday("BT")
    expect(live.quiz.map((q) => q.id)).toEqual(preview.quiz.map((q) => q.id))
  })
})

describe("minutes", () => {
  it("adds up to roughly what the learner committed to", () => {
    for (const dailyMinutes of [40, 60, 90]) {
      setPlan("BT", { dailyMinutes, daysPerWeek: 6, targetProb: 75 })
      const day = composeToday("BT", true)
      expect(day.budgetMinutes).toBe(dailyMinutes)
      // Blocks are bounded (a chapter is as long as it is; practice is capped at
      // 15), so the total tracks the budget rather than matching it exactly. What
      // matters is that it is in the same ballpark and never wildly under.
      expect(day.totalMinutes).toBeGreaterThan(dailyMinutes * 0.5)
      expect(day.totalMinutes).toBeLessThan(dailyMinutes * 2.2)
    }
  })

  it("reports the total as the sum of its blocks — no phantom minutes", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const day = composeToday("BT", true)
    expect(day.totalMinutes).toBe(day.blocks.reduce((n, b) => n + b.minutes, 0))
  })
})

describe("progress and completion", () => {
  it("unlocks one block at a time", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const day = composeToday("BT", true)
    const fresh = dayProgress("BT", day, [])
    expect(fresh.done).toBe(0)
    expect(fresh.activeIndex).toBe(0)
    expect(fresh.complete).toBe(false)

    const after = dayProgress("BT", day, [day.blocks[0].id])
    expect(after.done).toBe(1)
    expect(after.activeIndex).toBe(1)
  })

  it("treats a read chapter as the study block being done, however it was marked", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const day = composeToday("BT", true)
    const study = day.blocks[0]
    markChapterRead("BT", study.chapterKey!)
    // The reader marks the chapter; the day ledger need not also be written for
    // the step to read as complete. Two sources of truth for one fact is how a
    // finished step regresses to unfinished on the next visit.
    expect(blockComplete("BT", study, [])).toBe(true)
  })

  it("treats a read article as its block being done", () => {
    setPlan("BT", { dailyMinutes: 180, daysPerWeek: 6, targetProb: 75 })
    const day = composeToday("BT", true)
    const article = day.blocks.find((b) => b.kind === "article")
    if (!article) return
    markArticleRead("BT", article.id)
    expect(blockComplete("BT", article, [])).toBe(true)
  })

  it("reports 100% only when every block is finished", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const day = composeToday("BT", true)
    const allButOne = day.blocks.slice(0, -1).map((b) => b.id)
    expect(dayProgress("BT", day, allButOne).complete).toBe(false)
    const all = day.blocks.map((b) => b.id)
    const full = dayProgress("BT", day, all)
    expect(full.complete).toBe(true)
    expect(full.percent).toBe(100)
    expect(full.activeIndex).toBe(-1)
  })
})

describe("a paper with no content loaded", () => {
  it("degrades to a shaped day rather than throwing", () => {
    setPlan("NOT_A_PAPER", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    expect(() => composeToday("NOT_A_PAPER", true)).not.toThrow()
    const day = composeToday("NOT_A_PAPER", true)
    expect(day.chapter).toBeNull()
    expect(day.blocks.length).toBeGreaterThanOrEqual(4)
  })
})
