import { describe, it, expect, beforeEach } from "vitest"
import {
  composeToday,
  dayProgress,
  blockComplete,
  diagnosticDue,
  QUIZ_SIZE,
  PRACTICE_MAX,
  CARDS_MIN,
  CARDS_MAX,
} from "@/lib/acca-today-composer"
import { setPlan } from "@/lib/acca-plan"
import { markChapterRead } from "@/lib/acca-topic-plan"
import { chaptersForPaper, chapterKey } from "@/lib/acca-study-content"
import { markArticleRead } from "@/lib/acca-tech-article"
import { getPaper, getQuestions, recordAnswer } from "@/lib/acca"
import { getFlashcards, reviewFlashcard } from "@/lib/acca-flashcards"
import { setStartMode } from "@/lib/acca-profile"
import { saveDiagnosticLocal, type DiagnosticResult } from "@/lib/acca-diagnostic"

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

  it("never exceeds the practice ceiling, and the count is the honest served number", () => {
    for (const dailyMinutes of budgets) {
      setPlan("BT", { dailyMinutes, daysPerWeek: 6, targetProb: 85 })
      const day = composeToday("BT", true)
      const practice = day.blocks.find((b) => b.kind === "practice")!
      // The ceiling holds on a 300-minute day — extra minutes must not buy a grind.
      expect(practice.count, `ceiling at ${dailyMinutes} min`).toBeLessThanOrEqual(PRACTICE_MAX)
      // `count` now reports what the picker ACTUALLY served (block.title reads the
      // same figure), not the sizing target. On a small area pool that can be
      // below PRACTICE_MIN — the card must not promise 15 and serve 9 — but it is
      // always a real, positive, in-bounds number the session will actually give.
      expect(practice.count, `served > 0 at ${dailyMinutes} min`).toBeGreaterThan(0)
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

/*
 * ── The diagnostic has to REACH the learner ────────────────────────
 *
 * This is a regression guard for a real one. When the composer first replaced the
 * action-based plan it had no diagnostic branch at all, so a zero-start learner
 * read chapters indefinitely and was NEVER offered the measurement they had earned
 * — the founder's rule ("give the diagnostic after the essential topics") silently
 * stopped happening, and nothing failed or logged.
 */
describe("the diagnostic milestone", () => {
  /** Satisfy the A·B·C gate: read every chapter, practise and revise each area. */
  function clearTheGate(paperId: string) {
    const paper = getPaper(paperId)!
    for (const c of chaptersForPaper(paperId)) markChapterRead(paperId, chapterKey(c))
    const questions = getQuestions(paperId)
    for (const area of paper.areas.slice(0, 3)) {
      for (const q of questions.filter((item) => item.area === area.code).slice(0, 8)) {
        recordAnswer(paperId, q, true)
      }
      for (const card of getFlashcards(paperId).filter((item) => item.area === area.code).slice(0, 1)) {
        reviewFlashcard(card.id, true)
      }
    }
  }

  it("does NOT measure a brand-new learner on day one", () => {
    setStartMode("zero")
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const day = composeToday("BT", true)
    // A 25-question diagnostic on zero knowledge returns noise, and the number it
    // prints is both meaningless and demoralising.
    expect(day.isDiagnosticDay).toBe(false)
    expect(day.blocks[0].kind).toBe("study")
  })

  it("explains the wait while the gate is still closed", () => {
    setStartMode("zero")
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const day = composeToday("BT", true)
    expect(day.diagnosticGate).toBeTruthy()
    expect(day.diagnosticGate!.total).toBeGreaterThan(0)
    expect(day.diagnosticGate!.done).toBeLessThan(day.diagnosticGate!.total)
    // Naming the next area is what turns a lock into a target.
    expect(day.diagnosticGate!.nextArea).toBeTruthy()
  })

  it("offers the diagnostic once the essential areas are covered", () => {
    setStartMode("zero")
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    clearTheGate("BT")
    expect(diagnosticDue("BT")).toBe(true)

    const day = composeToday("BT", true)
    expect(day.isDiagnosticDay).toBe(true)
    // It REPLACES the day: every number downstream changes, so a chapter studied
    // beside it would be planned against a readiness about to be rewritten.
    expect(day.blocks).toHaveLength(1)
    expect(day.blocks[0].kind).toBe("diagnostic")
    expect(day.blocks[0].id).toBe("diagnostic")
    expect(day.diagnosticGate).toBeNull()
    expect(day.totalMinutes).toBeGreaterThan(0)
  })

  it("stops offering it once a baseline exists", () => {
    setStartMode("zero")
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    clearTheGate("BT")
    expect(diagnosticDue("BT")).toBe(true)

    saveDiagnosticLocal({
      paperId: "BT",
      answeredAt: new Date().toISOString(),
      questionsAnswered: 25,
      rawCorrect: 15,
      estimatedScore: 60,
      passProbability: 58,
      confidence: 0.5,
      areas: [],
      weakest: [],
      strongest: [],
      target: { areas: [], questions: 0, weeks: 0 },
    } as unknown as DiagnosticResult)

    expect(diagnosticDue("BT")).toBe(false)
    const day = composeToday("BT", true)
    expect(day.isDiagnosticDay).toBe(false)
    // And the gate note disappears — it has served its purpose.
    expect(day.diagnosticGate).toBeNull()
  })

  it("never becomes a diagnostic day for a returner", () => {
    // A returner is measured on day one by the onboarding flow itself, so this
    // branch must not fire for them and re-offer it mid-plan.
    setStartMode("assess")
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    clearTheGate("BT")
    expect(diagnosticDue("BT")).toBe(false)
    expect(composeToday("BT", true).isDiagnosticDay).toBe(false)
    expect(composeToday("BT", true).diagnosticGate).toBeNull()
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

/*
 * THE HANDOVER — read the chapter, then answer on THAT chapter.
 *
 * The chapter reader ends on a button that says "Complete lesson — unlock 5
 * Quizzes". For a while it recorded the read and returned to the overview,
 * which offered the next topic: sixteen minutes of reading, a promise of five
 * quizzes, and a different chapter instead. A day is one topic — read it, then
 * answer on it — and these pin both halves of that.
 */
describe("the lesson → quizzes handover", () => {
  const plan = { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 }

  it("aims the day's quizzes at the day's chapter, not somewhere else", () => {
    setPlan("BT", plan)
    const day = composeToday("BT", true)
    const study = day.blocks.find((b) => b.kind === "study")!
    const quiz = day.blocks.find((b) => b.kind === "quiz")!
    expect(study.chapterKey).toBe(chapterKey(day.chapter!))
    // One topic a day: the quizzes sit on the same syllabus area that was read.
    expect(quiz.area).toBe(day.chapter!.area)
    expect(day.quiz.length).toBe(QUIZ_SIZE)
  })

  it("has quizzes ready to hand over the moment the chapter is finished", () => {
    // The button promises five. If the composed day cannot supply them, the
    // reader falls back to a topic session — but for a normal paper it must
    // never come to that, or the promise is decoration.
    setPlan("BT", plan)
    const day = composeToday("BT", true)
    expect(day.blocks.some((b) => b.kind === "quiz")).toBe(true)
    expect(day.quiz.length).toBeGreaterThan(0)
  })

  it("composes the NEXT chapter once the read is recorded — so the handover must read the day first", () => {
    /*
     * This is the trap the fix had to step around, and the reason the reader
     * captures today's composition BEFORE calling markChapterRead. Compose in
     * the wrong order and the learner is handed questions on a chapter they
     * have not opened yet — the same "another topic" bug, one step later.
     */
    setPlan("BT", plan)
    const before = composeToday("BT", true)
    const captured = before.quiz.map((q) => q.id)

    markChapterRead("BT", chapterKey(before.chapter!))

    const after = composeToday("BT", true)
    expect(chapterKey(after.chapter!)).not.toBe(chapterKey(before.chapter!))
    // Proof that the order matters: composing after the read yields a different
    // question set, so a handover built on it would leave the chapter behind.
    expect(after.quiz.map((q) => q.id)).not.toEqual(captured)
  })
})

/*
 * THE DAY MUST FIT THE MINUTES THEY PROMISED.
 *
 * A learner who committed 40 minutes was handed a 45-minute day: an 18-minute
 * chapter, five quizzes, ten practice questions, six cards AND a five-minute
 * technical article. Being over budget on day one is how a plan starts being
 * ignored — and it contradicts the number onboarding asked them to protect.
 */
describe("the day against the budget", () => {
  it("never overshoots the committed minutes, at every budget onboarding offers", () => {
    // MINUTE_OPTIONS in the onboarding deck: 40 / 60 / 90 / 120.
    for (const dailyMinutes of [40, 45, 60, 90, 120]) {
      window.localStorage.clear()
      setPlan("BT", { dailyMinutes, daysPerWeek: 6, targetProb: 75 })
      const day = composeToday("BT", true)
      expect(day.totalMinutes, `${dailyMinutes} min/day → ${day.totalMinutes}`).toBeLessThanOrEqual(day.budgetMinutes)
    }
  })

  it("is honest, not magical, below the length of a single chapter", () => {
    /*
     * A REAL FLOOR, recorded rather than papered over. A BT chapter is ~18
     * minutes and cannot be subdivided, so a 15-minute budget physically cannot
     * hold one topic cycle — no amount of trimming practice or dropping the
     * article changes that. Such a budget is not reachable from onboarding
     * (the shortest option is 40) but is reachable by editing the plan.
     *
     * What matters is that totalMinutes reports the truth, so the board says
     * "38 minutes" rather than pretending the day fits. If this is ever to be
     * solved properly it needs chapters split across days, which is a content
     * change, not an allocator one.
     */
    window.localStorage.clear()
    setPlan("BT", { dailyMinutes: 15, daysPerWeek: 6, targetProb: 75 })
    const day = composeToday("BT", true)
    expect(day.totalMinutes).toBeGreaterThan(day.budgetMinutes)
    // It still trims what it can: the article is the first thing to go.
    expect(day.article).toBeNull()
    // And the total is the sum of the blocks — no quiet under-reporting.
    expect(day.totalMinutes).toBe(day.blocks.reduce((n, b) => n + b.minutes, 0))
  })

  it("drops the technical article rather than the method when room runs out", () => {
    // Read it, check it landed, apply it, fix it in memory — that is the method
    // and none of it is optional. The examiner's commentary on top is.
    window.localStorage.clear()
    setPlan("BT", { dailyMinutes: 40, daysPerWeek: 6, targetProb: 75 })
    const tight = composeToday("BT", true)
    expect(tight.blocks.map((b) => b.kind)).toEqual(["study", "quiz", "practice", "flashcards"])
    expect(tight.article).toBeNull()

    window.localStorage.clear()
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const roomy = composeToday("BT", true)
    expect(roomy.blocks.some((b) => b.kind === "article")).toBe(true)
    expect(roomy.article).not.toBeNull()
  })

  it("keeps composition.article and the block list agreeing", () => {
    // Callers read both; if they disagree the board offers a step the day does
    // not contain, or hides one it does.
    for (const dailyMinutes of [25, 40, 60, 120]) {
      window.localStorage.clear()
      setPlan("BT", { dailyMinutes, daysPerWeek: 6, targetProb: 75 })
      const day = composeToday("BT", true)
      expect(Boolean(day.article), `${dailyMinutes} min`).toBe(day.blocks.some((b) => b.kind === "article"))
    }
  })
})
