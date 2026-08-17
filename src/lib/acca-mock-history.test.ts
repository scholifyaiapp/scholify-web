import { beforeEach, describe, expect, it } from "vitest"
import { recordMock, getMockHistory } from "@/lib/acca"

/*
 * The mock-result store the Mock Exam Centre reads. Guards the contract the
 * Centre depends on: most-recent-first order, percent derived from correct/total,
 * the optional per-form field (added for per-form best scores), and the
 * zero-total guard.
 */
beforeEach(() => localStorage.clear())

describe("mock history", () => {
  it("records mocks and returns them most-recent-first, with the form", () => {
    recordMock("SBR", 60, 100, 1)
    recordMock("SBR", 72, 100, 2)
    const h = getMockHistory("SBR")
    expect(h).toHaveLength(2)
    expect(h[0].percent).toBe(72)
    expect(h[0].form).toBe(2)
    expect(h[1].form).toBe(1)
  })

  it("derives percent from correct over total", () => {
    recordMock("SBL", 45, 90, 1)
    expect(getMockHistory("SBL")[0].percent).toBe(50)
  })

  it("stores a mock with no form (backward compatible) and leaves the field undefined", () => {
    recordMock("AA", 50, 100)
    expect(getMockHistory("AA")[0].form).toBeUndefined()
  })

  it("ignores a zero-total mock rather than dividing by zero", () => {
    recordMock("FM", 0, 0, 1)
    expect(getMockHistory("FM")).toHaveLength(0)
  })

  it("keeps papers separate", () => {
    recordMock("APM", 80, 100, 1)
    expect(getMockHistory("ATX")).toHaveLength(0)
    expect(getMockHistory("APM")).toHaveLength(1)
  })
})
