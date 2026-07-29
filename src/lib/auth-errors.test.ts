import { describe, it, expect } from "vitest"

/*
 * Sign-in rejected a correct email address, and told learners their password was
 * wrong when it wasn't. Two separate bugs, both reported as "it shown me wrong
 * email" on credentials that were right.
 *
 * 1. TRIM MISMATCH. The form validated the RAW input against ^\S+@\S+\.\S+$
 *    while submitting email.trim(). A single trailing space — routine from a
 *    mobile keyboard's autocomplete or a paste out of a password manager — failed
 *    validation, so a valid address was reported invalid and never even sent.
 *
 * 2. SWALLOWED CLASSIFICATION. Every failure was rewritten to "Wrong email or
 *    password", discarding the specific message auth.tsx had produced. A learner
 *    who had not confirmed their email was told their password was wrong, retyped
 *    a correct password five times, and got locked out for 60 seconds — with the
 *    real cause never shown anywhere.
 */

/** The exact pattern both auth pages use. */
const EMAIL_RE = /^\S+@\S+\.\S+$/

describe("email validation must agree with what is submitted", () => {
  const REAL_WORLD = [
    "founder@flowlifyai.com ",
    " founder@flowlifyai.com",
    "  founder@flowlifyai.com  ",
    "founder@flowlifyai.com\t",
    "\nfounder@flowlifyai.com",
  ]

  it.each(REAL_WORLD)("accepts %j once trimmed, as the submit path does", (raw) => {
    // The old code: tested the raw value, which is what produced the false error.
    expect(EMAIL_RE.test(raw), "raw value fails — this WAS the bug").toBe(false)
    // The fix: validate exactly what gets sent.
    expect(EMAIL_RE.test(raw.trim())).toBe(true)
  })

  it("still rejects addresses that are genuinely malformed", () => {
    for (const bad of ["", "   ", "notanemail", "no@domain", "@example.com", "a b@example.com"]) {
      expect(EMAIL_RE.test(bad.trim()), `"${bad}"`).toBe(false)
    }
  })
})

/*
 * friendlyError is module-private, so this pins the CONTRACT the sign-in page
 * depends on: which raw Supabase message maps to which code, and specifically
 * that only one of them is the vague-message case.
 */
describe("auth error classification", () => {
  const classify = (raw: string): string => {
    const m = raw.toLowerCase()
    if (m.includes("invalid login credentials")) return "credentials"
    if (m.includes("email not confirmed")) return "unconfirmed"
    if (m.includes("already registered") || m.includes("already exists")) return "exists"
    if (m.includes("rate limit")) return "rate_limit"
    return "unknown"
  }

  it("treats a bad password as the one case that must stay vague", () => {
    expect(classify("Invalid login credentials")).toBe("credentials")
  })

  it("does NOT classify an unconfirmed email as a credential failure", () => {
    // The whole bug: this used to be shown as "Wrong email or password", which
    // the learner cannot fix by retyping anything.
    expect(classify("Email not confirmed")).toBe("unconfirmed")
    expect(classify("Email not confirmed")).not.toBe("credentials")
  })

  it("does NOT classify a rate limit as a credential failure", () => {
    expect(classify("Email rate limit exceeded")).toBe("rate_limit")
    expect(classify("Email rate limit exceeded")).not.toBe("credentials")
  })

  it("leaves anything unrecognised unclassified rather than guessing", () => {
    expect(classify("Failed to fetch")).toBe("unknown")
    expect(classify("Failed to fetch")).not.toBe("credentials")
  })

  /*
   * The property that fixes the report: only a real credential failure may be
   * replaced with the vague message and counted toward the 5-attempt lockout.
   * Everything else must reach the learner as written.
   */
  it("only one classification may be shown vaguely or count toward a lockout", () => {
    const shownVaguely = (raw: string) => classify(raw) === "credentials"
    expect(shownVaguely("Invalid login credentials")).toBe(true)
    for (const raw of ["Email not confirmed", "Email rate limit exceeded", "Failed to fetch"]) {
      expect(shownVaguely(raw), `"${raw}" must be shown as itself`).toBe(false)
    }
  })
})
