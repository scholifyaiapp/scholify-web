import { beforeEach, describe, expect, it } from "vitest"
import {
  STUDY_MAX_SECONDS,
  STUDY_MIN_SECONDS,
  blockLock,
  blockSecondsToday,
  canStartBlock,
  lockReason,
  recordBlockSeconds,
  requiredStudySeconds,
  studyGate,
} from "@/lib/acca-block-gate"
import { composeToday } from "@/lib/acca-today-composer"
import { setPlan } from "@/lib/acca-plan"
import { markChapterRead } from "@/lib/acca-topic-plan"
import { chapterKey } from "@/lib/acca-study-content"

/*
 * THE STEP GATE — one topic a day, in order, with the reading time served.
 *
 * Two holes this closes, both of which made the sequential day a suggestion:
 *
 *   · the study block completed on a click, so scrolling to the bottom of a
 *     chapter and pressing "Complete lesson" took about eight seconds and
 *     recorded the chapter as studied;
 *   · /study?tab=today&block=practice launched practice with no check, and the
 *     dashboard's mission list linked to exactly those URLs.
 */

beforeEach(() => {
  window.localStorage.clear()
})

const plan = { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 }

describe("how much reading time a block asks for", () => {
  it("asks for two-thirds of the minutes the plan set aside", () => {
    // Not all of them: this product's argument is that focused time beats long
    // time, and a full-duration stopwatch punishes a genuinely fast reader with
    // dead minutes.
    expect(requiredStudySeconds({ kind: "study", minutes: 18 })).toBe(12 * 60)
  })

  it("has a floor, so a small block still needs real attention", () => {
    expect(requiredStudySeconds({ kind: "study", minutes: 1 })).toBe(STUDY_MIN_SECONDS)
    expect(requiredStudySeconds({ kind: "study", minutes: 0 })).toBe(STUDY_MIN_SECONDS)
  })

  it("has a ceiling, so a heavy chapter never becomes a sentence", () => {
    expect(requiredStudySeconds({ kind: "study", minutes: 90 })).toBe(STUDY_MAX_SECONDS)
  })

  it("asks nothing of the steps that evidence themselves", () => {
    // Quizzes and practice are self-evidencing — you answered them or you did
    // not. Reading is the only step whose effort cannot be read from output.
    for (const kind of ["quiz", "practice", "flashcards", "article"] as const) {
      expect(requiredStudySeconds({ kind, minutes: 20 })).toBe(0)
    }
  })
})

describe("banking time", () => {
  it("accumulates across visits, so leaving and returning does not reset it", () => {
    recordBlockSeconds("BT", "study-x", 60)
    recordBlockSeconds("BT", "study-x", 45)
    expect(blockSecondsToday("BT", "study-x")).toBe(105)
  })

  it("clamps a single tick, so a laptop waking from sleep cannot clear a gate", () => {
    // One resume produces an enormous delta. Without the clamp that single tick
    // would satisfy any gate on its own.
    recordBlockSeconds("BT", "study-x", 60 * 60 * 8)
    expect(blockSecondsToday("BT", "study-x")).toBeLessThanOrEqual(120)
  })

  it("ignores nonsense rather than poisoning the ledger", () => {
    recordBlockSeconds("BT", "study-x", Number.NaN)
    recordBlockSeconds("BT", "study-x", -500)
    expect(blockSecondsToday("BT", "study-x")).toBe(0)
  })

  it("keeps papers and blocks apart", () => {
    recordBlockSeconds("BT", "study-x", 60)
    expect(blockSecondsToday("MA", "study-x")).toBe(0)
    expect(blockSecondsToday("BT", "quiz")).toBe(0)
  })
})

describe("the gate on today's chapter", () => {
  it("reports remaining time and a fraction for the ring", () => {
    const block = { kind: "study" as const, minutes: 15, id: "study-x" }
    expect(studyGate("BT", block).met).toBe(false)
    expect(studyGate("BT", block).fraction).toBe(0)

    // 10 minutes required (2/3 of 15); serve 5.
    for (let i = 0; i < 5; i++) recordBlockSeconds("BT", "study-x", 60)
    const half = studyGate("BT", block)
    expect(half.remaining).toBe(5 * 60)
    expect(half.fraction).toBeCloseTo(0.5, 2)
    expect(half.met).toBe(false)

    for (let i = 0; i < 5; i++) recordBlockSeconds("BT", "study-x", 60)
    expect(studyGate("BT", block).met).toBe(true)
    expect(studyGate("BT", block).fraction).toBe(1)
  })
})

describe("the sequence", () => {
  it("opens the first step and locks the rest", () => {
    setPlan("BT", plan)
    const day = composeToday("BT", true)
    const study = day.blocks.find((b) => b.kind === "study")!
    const quiz = day.blocks.find((b) => b.kind === "quiz")!
    const practice = day.blocks.find((b) => b.kind === "practice")!

    // Study is next but its clock is unserved.
    expect(blockLock("BT", day, study.id, []).state).toBe("timed")
    expect(blockLock("BT", day, quiz.id, []).state).toBe("locked")
    expect(blockLock("BT", day, practice.id, []).state).toBe("locked")
  })

  it("names what is blocking, so the learner is told rather than stonewalled", () => {
    setPlan("BT", plan)
    const day = composeToday("BT", true)
    const practice = day.blocks.find((b) => b.kind === "practice")!
    const lock = blockLock("BT", day, practice.id, [])
    expect(lock.state).toBe("locked")
    expect(lockReason(lock)).toContain(day.blocks[0].title)
  })

  it("unlocks the quizzes once the chapter is genuinely read", () => {
    setPlan("BT", plan)
    const day = composeToday("BT", true)
    const quiz = day.blocks.find((b) => b.kind === "quiz")!

    markChapterRead("BT", chapterKey(day.chapter!))
    expect(blockLock("BT", day, quiz.id, []).state).toBe("open")

    // ...and practice stays shut until the quizzes are answered.
    const practice = day.blocks.find((b) => b.kind === "practice")!
    expect(blockLock("BT", day, practice.id, []).state).toBe("locked")
    expect(blockLock("BT", day, practice.id, [quiz.id]).state).toBe("open")
  })

  it("walks the whole day one step at a time", () => {
    setPlan("BT", plan)
    const day = composeToday("BT", true)
    const done: string[] = []
    markChapterRead("BT", chapterKey(day.chapter!))

    for (const block of day.blocks.slice(1)) {
      // Every later step is shut...
      for (const later of day.blocks.slice(day.blocks.indexOf(block) + 1)) {
        expect(blockLock("BT", day, later.id, done).state, `${later.id} while on ${block.id}`).toBe("locked")
      }
      // ...and this one is open.
      expect(blockLock("BT", day, block.id, done).state, block.id).toBe("open")
      done.push(block.id)
    }
  })

  it("lets a learner OPEN the chapter whose clock is still running", () => {
    /*
     * The clock governs finishing a chapter, never opening one. Blocking the
     * open would leave someone staring at a locked card with no way to serve
     * the time it is demanding of them.
     */
    setPlan("BT", plan)
    const day = composeToday("BT", true)
    const study = day.blocks.find((b) => b.kind === "study")!
    expect(blockLock("BT", day, study.id, []).state).toBe("timed")
    expect(canStartBlock("BT", day, study.id, [])).toBe(true)
  })

  it("refuses a deep link to a later step — the dashboard's mission URLs", () => {
    setPlan("BT", plan)
    const day = composeToday("BT", true)
    const practice = day.blocks.find((b) => b.kind === "practice")!
    // /study?tab=today&block=practice, straight from the dashboard.
    expect(canStartBlock("BT", day, practice.id, [])).toBe(false)
  })
})
