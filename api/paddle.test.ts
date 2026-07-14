import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import crypto from "node:crypto"
import { planForPrice, verifySignature } from "./paddle"

/*
 * Billing. Every bug here is a bug that either takes money and gives nothing, or
 * gives access nobody paid for.
 *
 * Two properties are pinned:
 *   1. planForPrice maps ONLY the three real price ids, and fails CLOSED on
 *      anything else. It reads the price ids server-side from VITE_-named env
 *      vars — the single easiest go-live mistake is shipping them client-only,
 *      after which every payment succeeds and nobody is ever granted a plan.
 *   2. verifySignature rejects a REPLAY. The HMAC alone only proves Paddle signed
 *      *a* payload, not that it signed it recently — so a captured
 *      `subscription.activated` body could be re-sent forever to re-grant a plan
 *      after cancellation. The timestamp is part of the signature and must be
 *      part of the check.
 */

const SECRET = "pdl_ntfset_test_secret"

const ENV = {
  VITE_PADDLE_BEGINNER_MONTHLY: "pri_beginner_monthly",
  VITE_PADDLE_PRO_MONTHLY: "pri_pro_monthly",
  VITE_PADDLE_ANNUAL_PRO: "pri_annual_pro",
}

beforeEach(() => {
  for (const [k, v] of Object.entries(ENV)) vi.stubEnv(k, v)
})
afterEach(() => {
  vi.unstubAllEnvs()
  vi.useRealTimers()
})

/** Build a genuine Paddle-Signature header for a body at a given time. */
function sign(body: string, atSeconds: number, secret = SECRET): string {
  const h1 = crypto.createHmac("sha256", secret).update(`${atSeconds}:${body}`).digest("hex")
  return `ts=${atSeconds};h1=${h1}`
}

describe("planForPrice", () => {
  it("maps each real price id to its plan", () => {
    expect(planForPrice(ENV.VITE_PADDLE_BEGINNER_MONTHLY)).toBe("beginner")
    expect(planForPrice(ENV.VITE_PADDLE_PRO_MONTHLY)).toBe("pro")
    expect(planForPrice(ENV.VITE_PADDLE_ANNUAL_PRO)).toBe("annual_pro")
  })

  it("fails closed on an unknown, empty or absent price id", () => {
    for (const bad of ["pri_something_else", "", undefined]) {
      expect(planForPrice(bad as string | undefined)).toBeNull()
    }
  })

  it("grants nothing when the price ids are missing server-side", () => {
    // The go-live trap: ids shipped to the client only. Checkout works, the
    // webhook fires, and planForPrice matches nothing — so no plan is written.
    // It must return null (grant nothing), never guess a plan.
    vi.unstubAllEnvs()
    expect(planForPrice("pri_pro_monthly")).toBeNull()
  })
})

describe("verifySignature", () => {
  const body = JSON.stringify({ event_type: "subscription.activated", data: { id: "sub_1" } })

  it("accepts a correctly signed, fresh payload", () => {
    const now = Math.floor(Date.now() / 1000)
    expect(verifySignature(body, sign(body, now), SECRET)).toBe(true)
  })

  it("rejects a tampered body", () => {
    const now = Math.floor(Date.now() / 1000)
    const header = sign(body, now)
    const tampered = body.replace("sub_1", "sub_ATTACKER")
    expect(verifySignature(tampered, header, SECRET)).toBe(false)
  })

  it("rejects a signature made with the wrong secret", () => {
    const now = Math.floor(Date.now() / 1000)
    expect(verifySignature(body, sign(body, now, "wrong_secret"), SECRET)).toBe(false)
  })

  // The replay: a valid, correctly-signed body captured from a log or a proxy and
  // sent again next week to re-grant a cancelled plan.
  it("rejects a REPLAY of a genuinely signed payload from an hour ago", () => {
    const anHourAgo = Math.floor(Date.now() / 1000) - 3600
    const header = sign(body, anHourAgo) // a real Paddle signature, just stale
    expect(verifySignature(body, header, SECRET)).toBe(false)
  })

  it("rejects a payload timestamped in the future", () => {
    const later = Math.floor(Date.now() / 1000) + 3600
    expect(verifySignature(body, sign(body, later), SECRET)).toBe(false)
  })

  it("accepts a payload at the edge of the tolerance window but not beyond it", () => {
    const now = Math.floor(Date.now() / 1000)
    expect(verifySignature(body, sign(body, now - 4 * 60), SECRET)).toBe(true) // 4 min: in
    expect(verifySignature(body, sign(body, now - 6 * 60), SECRET)).toBe(false) // 6 min: out
  })

  it("rejects malformed, missing or non-numeric headers instead of throwing", () => {
    const now = Math.floor(Date.now() / 1000)
    for (const bad of [
      undefined,
      "",
      "garbage",
      `ts=${now}`, // no h1
      "h1=abc", // no ts
      `ts=notanumber;h1=${crypto.createHmac("sha256", SECRET).update(`x:${body}`).digest("hex")}`,
      `ts=${now};h1=nothexatall`,
    ]) {
      expect(() => verifySignature(body, bad as string | undefined, SECRET)).not.toThrow()
      expect(verifySignature(body, bad as string | undefined, SECRET)).toBe(false)
    }
  })
})
