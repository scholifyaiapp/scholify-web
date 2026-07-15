import { describe, it, expect } from "vitest"
import { trialActive } from "./lara"

/*
 * The server-side trial gate for AI metering. A trial grants Pro-level AI caps,
 * so getting this wrong means either giving a lapsed-trial user unlimited Pro AI
 * (real cost) or throttling a legitimate trial user. It must mirror the client
 * entitlement helper exactly, and — crucially — an EXPIRED trial must read false.
 */

const NOW = Date.parse("2026-07-15T12:00:00Z")
const at = (deltaDays: number) => new Date(NOW + deltaDays * 86400000).toISOString()

describe("trialActive (metering)", () => {
  it("is true for a trial ending in the future", () => {
    expect(trialActive({ trial_ends_at: at(3) }, NOW)).toBe(true)
  })

  it("is false the instant the trial has passed — no free Pro AI after expiry", () => {
    expect(trialActive({ trial_ends_at: at(-1) }, NOW)).toBe(false)
    expect(trialActive({ trial_ends_at: at(0) }, NOW)).toBe(false)
  })

  it("is false when there is no trial at all", () => {
    expect(trialActive({}, NOW)).toBe(false)
    expect(trialActive(undefined, NOW)).toBe(false)
  })

  it("is false — never throws — on a malformed value", () => {
    for (const bad of ["", "later", 123, null]) {
      expect(trialActive({ trial_ends_at: bad as unknown as string }, NOW)).toBe(false)
    }
  })
})
