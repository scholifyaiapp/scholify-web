import { describe, it, expect } from "vitest"
import { mergeProgressSnapshots } from "@/lib/acca-progress-merge"
import type { AccaProgressSnapshot } from "@/lib/acca"

/*
 * THE TWO-DEVICE FORK. syncAccaProgress used to let the bigger snapshot
 * REPLACE the smaller one, destroying any unsynced work on the smaller side.
 * These pin the merge that replaced it: paper-level, lossless for the
 * different-papers fork, never-worse for the same-paper fork, effort merged
 * by max so a re-synced device can never double-count itself.
 */

function snap(over: Partial<AccaProgressSnapshot>): AccaProgressSnapshot {
  return {
    questions: {},
    areas: {},
    totalAnswered: 0,
    totalCorrect: 0,
    lastStudied: null,
    history: [],
    streak: 0,
    daily: {},
    dailyCorrect: {},
    ...over,
  }
}

const q = (attempts: number, correct: number) => ({ attempts, correct })

describe("mergeProgressSnapshots", () => {
  it("the new-phone fork loses NOTHING: laptop's MA and phone's FM both survive", () => {
    const laptopCloud = snap({
      questions: { MA: { "ma-1": q(200, 150), "ma-2": q(100, 80) } },
      areas: { MA: { A: { seen: 300, correct: 230, wSeen: 300, wCorrect: 230 } } },
      totalAnswered: 300,
      totalCorrect: 230,
      daily: { "2026-08-10": 40 },
      history: ["2026-08-10"],
      streak: 4,
      lastStudied: "2026-08-10",
    })
    const phoneLocal = snap({
      questions: { FM: { "fm-1": q(50, 30) } },
      areas: { FM: { B: { seen: 50, correct: 30, wSeen: 50, wCorrect: 30 } } },
      totalAnswered: 50,
      totalCorrect: 30,
      daily: { "2026-08-19": 50 },
      history: ["2026-08-19"],
      streak: 1,
      lastStudied: "2026-08-19",
    })

    const merged = mergeProgressSnapshots(phoneLocal, laptopCloud)
    // Under the old replace rule the phone's 50 FM answers were destroyed here.
    expect(merged.questions.MA["ma-1"].attempts).toBe(200)
    expect(merged.questions.FM["fm-1"].attempts).toBe(50)
    expect(merged.areas.MA.A.seen).toBe(300)
    expect(merged.areas.FM.B.seen).toBe(50)
    expect(merged.totalAnswered).toBe(350) // recomputed from the merged parts
    expect(merged.totalCorrect).toBe(260)
    expect(merged.history).toEqual(["2026-08-10", "2026-08-19"])
    expect(merged.lastStudied).toBe("2026-08-19")
    expect(merged.streak).toBe(4)
  })

  it("the same-paper fork keeps the richer side whole — never a cross-device mixture for one paper", () => {
    const cloud = snap({
      questions: { MA: { "ma-1": q(100, 80), "ma-2": q(50, 40) } },
      areas: { MA: { A: { seen: 150, correct: 120, wSeen: 150, wCorrect: 120 } } },
    })
    const local = snap({
      questions: { MA: { "ma-1": q(10, 5) } },
      areas: { MA: { A: { seen: 10, correct: 5, wSeen: 10, wCorrect: 5 } } },
    })
    const merged = mergeProgressSnapshots(local, cloud)
    // Cloud is richer for MA (150 attempts vs 10): its questions AND areas
    // travel together — mixing local areas with cloud questions would corrupt
    // the accuracy model.
    expect(merged.questions.MA["ma-2"].attempts).toBe(50)
    expect(merged.questions.MA["ma-1"].attempts).toBe(100)
    expect(merged.areas.MA.A.seen).toBe(150)
    expect(merged.totalAnswered).toBe(150)
  })

  it("a tie keeps local — the device in the student's hand wins", () => {
    const cloud = snap({ questions: { MA: { "ma-1": q(10, 9) } }, areas: { MA: { A: { seen: 10, correct: 9, wSeen: 10, wCorrect: 9 } } } })
    const local = snap({ questions: { MA: { "ma-9": q(10, 2) } }, areas: { MA: { A: { seen: 10, correct: 2, wSeen: 10, wCorrect: 2 } } } })
    const merged = mergeProgressSnapshots(local, cloud)
    expect(merged.questions.MA["ma-9"]).toBeTruthy()
    expect(merged.questions.MA["ma-1"]).toBeUndefined()
  })

  it("day-keyed effort merges by MAX — a re-synced device can never double-count itself", () => {
    const cloud = snap({ daily: { "2026-08-18": 30, "2026-08-19": 12 }, dailyCorrect: { "2026-08-19": 9 } })
    const local = snap({ daily: { "2026-08-19": 20 }, dailyCorrect: { "2026-08-19": 15 } })
    const merged = mergeProgressSnapshots(local, cloud)
    expect(merged.daily["2026-08-18"]).toBe(30)
    expect(merged.daily["2026-08-19"]).toBe(20) // max, not 32
    expect(merged.dailyCorrect["2026-08-19"]).toBe(15)
  })

  it("degrades safely on empty and partial snapshots", () => {
    const empty = snap({})
    const real = snap({ questions: { MA: { "ma-1": q(3, 2) } }, totalAnswered: 3, totalCorrect: 2 })
    expect(mergeProgressSnapshots(empty, real).totalAnswered).toBe(3)
    expect(mergeProgressSnapshots(real, empty).totalAnswered).toBe(3)
    expect(mergeProgressSnapshots(empty, empty).totalAnswered).toBe(0)
  })
})
