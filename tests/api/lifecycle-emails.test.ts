import { afterEach, describe, expect, it, vi } from "vitest"
import { dueLapse, daysBetween } from "../../api/reminders"
import { buildPaymentFailedEmail, buildCancellationEmail } from "../../api/purchase-email"
import { verifiedSender, isSandboxSender } from "../../api/email-theme"

/*
 * The lifecycle layer added with migration 0032: the lapse back-off that
 * replaces the endless daily cadence, the two revenue emails the webhook was
 * missing, and the sandbox-sender guard.
 *
 * The guard exists because both of its failure modes have actually shipped:
 * REMINDER_FROM empty (silent sandbox fallback — learners got nothing) and
 * REMINDER_FROM set TO the sandbox address, which redirected every learner
 * email into the admin inbox at ~90 a day. Neither may ever be quiet again.
 */

describe("dueLapse — the back-off that replaces the daily cadence", () => {
  // Practice at 19:00 → the lapse window opens at 18:50 and runs three hours.
  const row = { practice_time: "19:00", last_session_date: "2026-08-10" }
  const at = (date: string, hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number)
    return { date, minutes: h * 60 + m }
  }

  it("stays silent for the first two days away", () => {
    expect(dueLapse(row, at("2026-08-11", "18:50"))).toBeNull()
    expect(dueLapse(row, at("2026-08-12", "18:50"))).toBeNull()
  })

  it("fires the day-3 win-back once the gap reaches three days, near practice time", () => {
    expect(dueLapse(row, at("2026-08-13", "18:50"))).toBe("lapse3")
    expect(dueLapse(row, at("2026-08-13", "21:40"))).toBe("lapse3")
  })

  it("respects the delivery window — no lapse mail at breakfast for an evening learner", () => {
    expect(dueLapse(row, at("2026-08-13", "08:00"))).toBeNull()
    expect(dueLapse(row, at("2026-08-13", "21:55"))).toBeNull()
  })

  it("sends day 3 exactly once per episode", () => {
    const sent = { ...row, sent_lapse3_date: "2026-08-13" }
    expect(dueLapse(sent, at("2026-08-13", "19:00"))).toBeNull()
    expect(dueLapse(sent, at("2026-08-14", "19:00"))).toBeNull()
  })

  it("fires the day-7 goodbye at a week, then goes quiet for good", () => {
    const sent3 = { ...row, sent_lapse3_date: "2026-08-13" }
    expect(dueLapse(sent3, at("2026-08-17", "19:00"))).toBe("lapse7")
    const sent7 = { ...sent3, sent_lapse7_date: "2026-08-17" }
    expect(dueLapse(sent7, at("2026-08-18", "19:00"))).toBeNull()
    expect(dueLapse(sent7, at("2026-09-18", "19:00"))).toBeNull()
  })

  it("sends only the truthful email when a long lapse was discovered late", () => {
    // Day 9, nothing ever sent: one message — the day-7 one, never a stale day-3.
    expect(dueLapse(row, at("2026-08-19", "19:00"))).toBe("lapse7")
  })

  it("re-arms both emails when the learner returns", () => {
    const cameBack = {
      practice_time: "19:00",
      last_session_date: "2026-08-20",
      sent_lapse3_date: "2026-08-13",
      sent_lapse7_date: "2026-08-17",
    }
    // A fresh three-day lapse after the comeback fires day 3 again.
    expect(dueLapse(cameBack, at("2026-08-23", "19:00"))).toBe("lapse3")
  })

  it("refuses to guess with no last session or a malformed practice time", () => {
    expect(dueLapse({ practice_time: "19:00", last_session_date: null }, at("2026-08-19", "19:00"))).toBeNull()
    expect(dueLapse({ practice_time: "nonsense", last_session_date: "2026-08-10" }, at("2026-08-19", "19:00"))).toBeNull()
  })

  it("counts whole days between ISO dates and rejects garbage", () => {
    expect(daysBetween("2026-08-10", "2026-08-13")).toBe(3)
    expect(daysBetween("2026-08-10", "2026-08-10")).toBe(0)
    expect(daysBetween("garbage", "2026-08-13")).toBeNull()
  })
})

describe("buildPaymentFailedEmail — the dunning email", () => {
  const base = { amount: "$14.99", planLabel: "Pro", attempt: 1 }

  it("is calm on the first failure and urgent on the third", () => {
    const first = buildPaymentFailedEmail(base)
    expect(first.subject).toContain("your access is safe")
    expect(first.html).toContain("retries automatically")
    const third = buildPaymentFailedEmail({ ...base, attempt: 3 })
    expect(third.subject).toContain("Last call")
    expect(third.html).toContain("retry window is nearly over")
  })

  it("states the amount, plan and retry date", () => {
    const mail = buildPaymentFailedEmail({ ...base, nextRetryOn: "27 August 2026" })
    for (const fact of ["$14.99", "Pro", "27 August 2026"]) {
      expect(mail.html).toContain(fact)
      expect(mail.text).toContain(fact)
    }
  })

  it("escapes the name and ships a clean plain-text alternative", () => {
    const mail = buildPaymentFailedEmail({ ...base, firstName: "<script>alert(1)</script>" })
    expect(mail.html).not.toContain("<script>")
    expect(mail.text).not.toMatch(/<[a-z/][^>]*>/i)
  })

  it("never threatens data loss — the truthful consequence is a paused plan", () => {
    const words = buildPaymentFailedEmail({ ...base, attempt: 3 }).text.toLowerCase()
    expect(words).toContain("never deleted")
    expect(words).not.toContain("lose your progress")
  })
})

describe("buildCancellationEmail — the graceful goodbye", () => {
  const base = { planLabel: "Pro", accessUntil: "12 September 2026" }

  it("confirms the end date and that everything is kept", () => {
    const mail = buildCancellationEmail({ ...base, firstName: "Aziza" })
    expect(mail.subject).toContain("12 September 2026")
    expect(mail.html).toContain("12 September 2026")
    for (const kept of ["Saved, permanently", "None"]) expect(mail.html).toContain(kept)
    expect(mail.text.toLowerCase()).toContain("saved")
  })

  it("works without a known end date and without a name", () => {
    const mail = buildCancellationEmail({ planLabel: "Beginner" })
    expect(mail.subject).toBe("Your Scholify cancellation is confirmed")
    expect(mail.html).toContain("current billing period")
  })

  it("contains no dark patterns — no fake discounts, no guilt", () => {
    const words = buildCancellationEmail(base).text.toLowerCase()
    for (const banned of ["50% off", "last chance", "are you sure", "we're sad"]) {
      expect(words).not.toContain(banned)
    }
  })
})

describe("the sandbox-sender guard", () => {
  afterEach(() => vi.unstubAllEnvs())

  it("recognises every resend.dev shape", () => {
    expect(isSandboxSender("onboarding@resend.dev")).toBe(true)
    expect(isSandboxSender("Charles at Scholify <onboarding@resend.dev>")).toBe(true)
    expect(isSandboxSender("Charles <charles@scholifyapp.com>")).toBe(false)
  })

  it("refuses a sandbox REMINDER_FROM — the admin-flood configuration", () => {
    vi.stubEnv("REMINDER_FROM", "onboarding@resend.dev")
    expect(verifiedSender()).toBeNull()
  })

  it("refuses a missing or empty REMINDER_FROM", () => {
    vi.stubEnv("REMINDER_FROM", "")
    expect(verifiedSender()).toBeNull()
  })

  it("accepts a real verified-domain sender", () => {
    vi.stubEnv("REMINDER_FROM", "Charles at Scholify <charles@scholifyapp.com>")
    expect(verifiedSender()).toBe("Charles at Scholify <charles@scholifyapp.com>")
  })
})
