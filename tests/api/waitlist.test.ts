import { describe, it, expect } from "vitest"
import { waitlistRejectReason } from "../../api/waitlist.js"

/*
 * The launch signup gate. Until 10 August the waitlist IS the public product, so
 * a false rejection here is a lost signup shown a generic "invalid" — and the
 * gate had no test at all.
 *
 * The trap it contained: `startedAt` is stamped once at PAGE LOAD, not at first
 * keystroke, so the elapsed window measures how long the TAB has been open. A
 * one-hour ceiling therefore rejected anyone who left the launch page open and
 * came back to sign up.
 */

const ok = { name: "Nuriddin", email: "founder@flowlifyai.com", website: "", elapsedMs: 9_000 }

describe("waitlistRejectReason", () => {
  it("accepts an ordinary signup", () => {
    expect(waitlistRejectReason(ok)).toBeNull()
  })

  it("accepts a signup from a tab that has been open for hours", () => {
    expect(waitlistRejectReason({ ...ok, elapsedMs: 5 * 60 * 60 * 1000 })).toBeNull()
    expect(waitlistRejectReason({ ...ok, elapsedMs: 23 * 60 * 60 * 1000 })).toBeNull()
  })

  it("still drops a script that submits instantly", () => {
    expect(waitlistRejectReason({ ...ok, elapsedMs: 200 })).toBe("too_fast")
    expect(waitlistRejectReason({ ...ok, elapsedMs: 0 })).toBe("too_fast")
  })

  it("treats a missing or nonsense timestamp as too fast, never as valid", () => {
    expect(waitlistRejectReason({ ...ok, elapsedMs: NaN })).toBe("too_fast")
    expect(waitlistRejectReason({ ...ok, elapsedMs: -1000 })).toBe("too_fast")
  })

  it("drops a stale timestamp beyond a day", () => {
    expect(waitlistRejectReason({ ...ok, elapsedMs: 25 * 60 * 60 * 1000 })).toBe("stale")
  })

  it("drops a filled honeypot before anything else", () => {
    expect(waitlistRejectReason({ ...ok, website: "http://spam.example" })).toBe("honeypot")
  })

  it("requires a name and a plausible email", () => {
    expect(waitlistRejectReason({ ...ok, name: "" })).toBe("name")
    expect(waitlistRejectReason({ ...ok, email: "not-an-email" })).toBe("email")
    expect(waitlistRejectReason({ ...ok, email: "a@b" })).toBe("email")
    expect(waitlistRejectReason({ ...ok, email: "a b@c.com" })).toBe("email")
  })
})
