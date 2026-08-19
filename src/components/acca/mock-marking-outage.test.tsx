// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from "vitest"
import { render, cleanup, waitFor } from "@testing-library/react"
import CbeMockRunner from "./CbeMockRunner"
import { buildCbeMock } from "@/lib/acca-cbe-mock"
import { getMockHistory } from "@/lib/acca"
import { withShuffledOptions } from "@/lib/acca-options"
import { saveMockSitting, readMockSitting } from "@/lib/acca-mock-sitting"

/*
 * CHARLES GOES DOWN MID-MARKING.
 *
 * markAnswer never throws — when the examiner endpoint is unreachable it
 * returns marks:0 with `unmarked: true`. Before this suite existed, that zero
 * flowed straight into recordMock: on an all-written SP paper a network blip
 * booked a near-0% sitting from three hours of real answers, flipped
 * latestPassed, killed examReady and poisoned the trend.
 *
 * The contract now:
 *   - PARTIAL outage → the sitting records over the marks that actually got
 *     marked (unreachable tasks excluded from the denominator), and the
 *     results screen says so.
 *   - FULL outage (all-written paper) → nothing is recorded and the resume
 *     slot is KEPT, so reopening the form resubmits the answers for marking.
 *   - The server's own keyword-heuristic fallback (isFallback WITHOUT
 *     unmarked) is rough-but-real marking and records normally.
 *
 * Each test seeds an EXPIRED sitting with work — the runner then auto-submits
 * on mount through its ordinary deadline path, which exercises the identical
 * submit() a live student's sitting goes through.
 */

const markAnswerMock = vi.fn()
vi.mock("@/lib/acca-ai", async (importOriginal) => {
  const real = (await importOriginal()) as Record<string, unknown>
  return { ...real, markAnswer: (...args: unknown[]) => markAnswerMock(...args) }
})

afterEach(() => {
  cleanup()
  markAnswerMock.mockReset()
})
const noop = () => {}

type Task = { id: string; maxMarks: number; rubric?: string[] }

function unreachable(task: Task) {
  return Promise.resolve({
    marks: 0, maxMarks: task.maxMarks, hit: [], missed: task.rubric ?? [],
    feedback: "Couldn't reach the examiner. Please try again.", isFallback: true, unmarked: true,
  })
}

function heuristic(task: Task, marks: number) {
  return Promise.resolve({
    marks, maxMarks: task.maxMarks, hit: ["some point"], missed: [],
    feedback: "Demo marking.", isFallback: true,
  })
}

/** Seed an expired AAA sitting (all-written: 50+25+25) with an essay in every task. */
function seedExpiredAaaSitting(): void {
  const mock = buildCbeMock("AAA", 1)
  const essays: Record<string, { text: string; cells: Record<string, string> }> = {}
  for (const s of mock.sections) for (const it of s.items) if (it.kind === "task") essays[it.task.id] = { text: "A full written answer about audit risk.", cells: {} }
  saveMockSitting({ paperId: "AAA", form: 1, deadline: Date.now() - 60_000, cursor: 0, answers: {}, essays, flags: {}, savedAt: Date.now() - 60 * 60_000 })
}

describe("a FULL marking outage on an all-written paper", () => {
  it("records nothing, keeps the sitting for resubmission, and says so", async () => {
    markAnswerMock.mockImplementation((task: Task) => unreachable(task))
    const before = getMockHistory("AAA").length
    seedExpiredAaaSitting()

    const { container } = render(<CbeMockRunner paperId="AAA" form={1} onBack={noop} />)
    await waitFor(() => expect(container.textContent).toContain("hasn't been recorded"), { timeout: 8000 })

    expect(getMockHistory("AAA").length).toBe(before) // no false 0% booked
    expect(readMockSitting("AAA", 1)).not.toBeNull() // answers kept for resubmission
    expect(container.textContent).toContain("reopen this form")
  })
})

describe("a PARTIAL outage on a paper with objective sections", () => {
  it("records over the marks that were actually marked, and labels the exclusion", async () => {
    markAnswerMock.mockImplementation((task: Task) => unreachable(task))
    const before = getMockHistory("AA").length

    // An expired AA sitting (30 OT + 70 written): one OT answered CORRECTLY,
    // essays in every task. The written 70 becomes unreachable; the recorded
    // sitting must be earned/30, not earned/100.
    const mock = buildCbeMock("AA", 1)
    const answers: Record<string, { choice?: number | null }> = {}
    let firstOtMarks = 0
    outer: for (const s of mock.sections) {
      for (const it of s.items) {
        if (it.kind !== "task") {
          const shuffled = withShuffledOptions(it.q)
          if (typeof shuffled.correct === "number") {
            answers[it.q.id] = { choice: shuffled.correct }
            firstOtMarks = it.q.marks
            break outer
          }
        }
      }
    }
    const essays: Record<string, { text: string; cells: Record<string, string> }> = {}
    for (const s of mock.sections) for (const it of s.items) if (it.kind === "task") essays[it.task.id] = { text: "A written answer.", cells: {} }
    saveMockSitting({ paperId: "AA", form: 1, deadline: Date.now() - 60_000, cursor: 0, answers, essays, flags: {}, savedAt: Date.now() - 60 * 60_000 })

    const { container } = render(<CbeMockRunner paperId="AA" form={1} onBack={noop} />)
    await waitFor(() => expect(getMockHistory("AA").length).toBe(before + 1), { timeout: 8000 })

    const recorded = getMockHistory("AA")[0]
    expect(recorded.total).toBe(30) // written 70 excluded from the denominator
    expect(recorded.correct).toBe(firstOtMarks) // the one correct OT, nothing else
    expect(readMockSitting("AA", 1)).toBeNull() // recorded → slot cleared
    expect(container.textContent).toContain("excluded from this score")
  })
})

describe("the server's heuristic fallback is real marking", () => {
  it("isFallback WITHOUT unmarked records normally over the full total", async () => {
    markAnswerMock.mockImplementation((task: Task) => heuristic(task, Math.min(10, task.maxMarks)))
    const before = getMockHistory("AAA").length
    seedExpiredAaaSitting()

    render(<CbeMockRunner paperId="AAA" form={1} onBack={noop} />)
    await waitFor(() => expect(getMockHistory("AAA").length).toBe(before + 1), { timeout: 8000 })

    const recorded = getMockHistory("AAA")[0]
    expect(recorded.total).toBe(100) // nothing excluded — the heuristic marked everything
    expect(recorded.correct).toBe(30) // 3 tasks × 10 heuristic marks
    expect(readMockSitting("AAA", 1)).toBeNull()
  })
})
