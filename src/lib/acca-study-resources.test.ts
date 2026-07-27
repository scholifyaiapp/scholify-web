import { beforeEach, describe, expect, it } from "vitest"
import {
  chapterForLearningDay,
  getStudyResource,
  resourceSummary,
  setStudyResource,
} from "@/lib/acca-study-resources"

beforeEach(() => {
  localStorage.clear()
})

describe("learner-owned study resources", () => {
  it("normalizes and persists a resource profile", () => {
    const saved = setStudyResource("FA", {
      providers: ["kaplan", "bpp"],
      primaryProvider: "bpp",
      materials: ["study-text", "practice-kit"],
      edition: "September 2026 – June 2027",
      totalChapters: 20.4,
      completedChapters: 25,
    })

    expect(saved.totalChapters).toBe(20)
    expect(saved.completedChapters).toBe(20)
    expect(getStudyResource("FA")).toEqual(saved)
    expect(resourceSummary(saved)).toBe("Kaplan + BPP · 20/20 chapters")
  })

  it("treats no-resource as an exclusive planning choice", () => {
    const saved = setStudyResource("AA", {
      providers: ["kaplan", "none"],
      primaryProvider: "kaplan",
      materials: ["study-text"],
      edition: "Not sure",
      totalChapters: null,
      completedChapters: 0,
    })

    expect(saved.providers).toEqual(["none"])
    expect(saved.primaryProvider).toBe("none")
    expect(resourceSummary(saved)).toBe("Scholify study path")
  })

  it("paces remaining chapters across the learning phase", () => {
    const profile = setStudyResource("PM", {
      providers: ["kaplan"],
      primaryProvider: "kaplan",
      materials: ["study-text"],
      edition: "September 2026 – June 2027",
      totalChapters: 10,
      completedChapters: 4,
    })

    expect(chapterForLearningDay(profile, 0, 6)).toBe(5)
    expect(chapterForLearningDay(profile, 2, 6)).toBe(7)
    expect(chapterForLearningDay(profile, 5, 6)).toBe(10)
  })
})
