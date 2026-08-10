import { describe, it, expect } from "vitest"
import { dueSlot, dueTrialReminder } from "../../api/reminders"

/*
 * The reminder scheduler.
 *
 * This is the part that has to be right: the sender is called every 5 minutes
 * for every opted-in learner, so a bug here is either silence (a learner who
 * chose reminders gets none) or repetition (three emails about one session,
 * which is what gets a domain marked as spam).
 *
 * WHAT IT REPLACED. api/reminders.ts stored `reminder_time` and read it
 * nowhere — the old sender filtered on "hasn't studied today" alone and mailed
 * everyone at 08:00 UTC. There was no timezone column at all, so honouring a
 * learner's chosen hour was not merely unimplemented, it was impossible.
 */

const ROW = { practice_time: "19:00" }

/** Local clock helper — `at("18:50")` on an arbitrary but fixed local date. */
const at = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number)
  return { date: "2026-08-12", minutes: h * 60 + m }
}

describe("dueSlot — which reminder is due right now", () => {
  it("fires the advance notice three hours before the session", () => {
    expect(dueSlot(ROW, at("16:00"))).toBe("lead")
  })

  /*
   * THE reminder: half an hour ahead, not ten minutes. Ten minutes is not enough
   * notice to change what you are doing — it arrives, you are mid-something, and
   * the session is already late. Thirty minutes is the smallest window in which
   * someone can finish what they are on and be at the desk. The catch-up moved to
   * +2h for the same reason: it should arrive while the evening is still usable.
   */
  it("fires the main nudge thirty minutes before the session", () => {
    expect(dueSlot(ROW, at("18:30"))).toBe("soon")
  })

  it("fires the catch-up two hours after the session was due", () => {
    expect(dueSlot(ROW, at("21:00"))).toBe("catchup")
  })

  it("stays silent at every other time of day", () => {
    for (const t of ["00:00", "07:00", "12:00", "15:00", "17:00", "19:30", "20:30", "23:00"]) {
      expect(dueSlot(ROW, at(t)), `${t} should be silent`).toBeNull()
    }
  })

  /*
   * The window has to be wider than the 5-minute tick so one slow or skipped
   * pg_cron run does not silently drop a learner's reminder. That tolerance is
   * only safe because the sent-date guard below makes delivery exactly-once.
   */
  it("still delivers when a tick is late, within the tolerance window", () => {
    expect(dueSlot(ROW, at("18:35")), "5 min late").toBe("soon")
    expect(dueSlot(ROW, at("18:45")), "15 min late").toBe("soon")
    expect(dueSlot(ROW, at("18:52")), "past the window — too late to be useful notice").toBeNull()
  })

  it("never sends the same slot twice on the same local day", () => {
    const already = { ...ROW, sent_soon_date: "2026-08-12" }
    expect(dueSlot(already, at("18:30"))).toBeNull()
    // ...and the guard is per-DAY, not permanent: tomorrow it fires again.
    expect(dueSlot(already, { date: "2026-08-13", minutes: 18 * 60 + 30 })).toBe("soon")
  })

  it("respects a slot the learner switched off, without affecting the others", () => {
    const noLead = { ...ROW, lead_on: false }
    expect(dueSlot(noLead, at("16:00"))).toBeNull()
    expect(dueSlot(noLead, at("18:30"))).toBe("soon")
  })

  it("honours an exact, non-preset practice time", () => {
    // The whole point of the clock input in onboarding 5/8 — the old four
    // presets could not express 06:40, so reminders would have aimed at 08:00.
    const early = { practice_time: "06:40" }
    expect(dueSlot(early, at("03:40"))).toBe("lead")
    expect(dueSlot(early, at("06:10"))).toBe("soon")
    expect(dueSlot(early, at("08:40"))).toBe("catchup")
  })

  /*
   * Offsets that fall outside the learner's own calendar day are skipped rather
   * than wrapped: the sent-date guard is keyed on a LOCAL DATE, so a slot landing
   * on the previous or next day cannot be deduped correctly, and mailing someone
   * at 22:00 about "today's session" when they mean 01:00 tomorrow is wrong
   * anyway. The slots that do fit still fire.
   */
  it("skips an offset that would land on a different calendar day", () => {
    const nearMidnightStart = { practice_time: "01:00" }
    expect(dueSlot(nearMidnightStart, at("22:00")), "lead would be yesterday").toBeNull()
    expect(dueSlot(nearMidnightStart, at("00:30")), "soon still fits").toBe("soon")

    const lateStart = { practice_time: "23:00" }
    expect(dueSlot(lateStart, at("20:00")), "lead fits").toBe("lead")
    expect(dueSlot(lateStart, at("01:00")), "catchup would be tomorrow").toBeNull()
  })

  it("refuses to guess when the stored time is malformed", () => {
    for (const bad of ["", "nonsense", "25:00", "19:60", "7pm"]) {
      expect(dueSlot({ practice_time: bad }, at("18:30")), `"${bad}"`).toBeNull()
    }
  })

  it("treats midnight as 00:00, not 24:00", () => {
    // hourCycle h23 vs hour12:false — an ICU build rendering midnight as "24"
    // would put the whole day 24 hours out. Guard the arithmetic that consumes it.
    const midnightSession = { practice_time: "03:00" }
    expect(dueSlot(midnightSession, { date: "2026-08-12", minutes: 0 })).toBe("lead")
  })
})

describe("trial lifecycle reminders", () => {
  const start = "2026-08-10T00:00:00.000Z"
  const atHour = (hours: number) => Date.parse(start) + hours * 60 * 60 * 1000

  it("sends at 10 hours, day 2, and during day 3 exactly once", () => {
    expect(dueTrialReminder(start, {}, atHour(9))).toBeNull()
    expect(dueTrialReminder(start, {}, atHour(10))).toBe("10h")
    expect(dueTrialReminder(start, { "10h": start }, atHour(48))).toBe("day2")
    expect(dueTrialReminder(start, { "10h": start, day2: start }, atHour(60))).toBe("day3")
    expect(dueTrialReminder(start, { "10h": start, day2: start, day3: start }, atHour(65))).toBeNull()
  })

  it("does not send lifecycle nudges after the trial has expired", () => {
    expect(dueTrialReminder(start, {}, atHour(72))).toBeNull()
  })
})
