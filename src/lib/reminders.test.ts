import { beforeEach, describe, expect, it, vi } from "vitest"

const mocks = vi.hoisted(() => ({
  getSession: vi.fn(),
}))

vi.mock("@/lib/supabase", () => ({
  supabase: { auth: { getSession: mocks.getSession } },
}))

import { registerPracticeTime } from "@/lib/reminders"

describe("practice-time configuration", () => {
  beforeEach(() => {
    localStorage.clear()
    mocks.getSession.mockReset().mockResolvedValue({ data: { session: null } })
  })

  it("stores the onboarding clock that Settings and reminders both display", () => {
    registerPracticeTime("07:30")
    const saved = JSON.parse(localStorage.getItem("scholify-settings") ?? "{}")
    expect(saved).toMatchObject({
      practiceTime: "07:30",
      reminderTime: "07:30",
      notifyDaily: true,
      reminderSlots: { lead: false, soon: true, catchup: true },
    })
  })

  it("updates the visible clock without overriding an explicit reminder opt-out", () => {
    localStorage.setItem("scholify-settings", JSON.stringify({ notifyDaily: false, practiceTime: "19:00" }))
    registerPracticeTime("06:45")
    const saved = JSON.parse(localStorage.getItem("scholify-settings") ?? "{}")
    expect(saved.practiceTime).toBe("06:45")
    expect(saved.notifyDaily).toBe(false)
    expect(mocks.getSession).not.toHaveBeenCalled()
  })
})

