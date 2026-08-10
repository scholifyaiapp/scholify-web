import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { commissionAmount, priceForPlan, planForPrice, resolveAffiliateMetadata, claimEvent, releaseEvent } from "../../api/stripe.js"

/*
 * Stripe plan ↔ price mapping. Every bug here either charges for the wrong plan
 * or grants a plan nobody paid for, so both directions must be exact and must
 * fail CLOSED on anything unknown.
 */

const ENV = {
  STRIPE_PRICE_BEGINNER: "price_beginner_123",
  STRIPE_PRICE_BEGINNER_ANNUAL: "price_beginner_annual_123",
  STRIPE_PRICE_PRO: "price_pro_123",
  STRIPE_PRICE_ANNUAL: "price_annual_123",
}

beforeEach(() => {
  for (const [k, v] of Object.entries(ENV)) vi.stubEnv(k, v)
})
afterEach(() => vi.unstubAllEnvs())

describe("priceForPlan (checkout: plan → price)", () => {
  it("maps each plan to its configured price", () => {
    expect(priceForPlan("beginner")).toBe(ENV.STRIPE_PRICE_BEGINNER)
    expect(priceForPlan("annual_beginner")).toBe(ENV.STRIPE_PRICE_BEGINNER_ANNUAL)
    expect(priceForPlan("pro")).toBe(ENV.STRIPE_PRICE_PRO)
    expect(priceForPlan("annual_pro")).toBe(ENV.STRIPE_PRICE_ANNUAL)
  })

  it("returns undefined for an unknown plan — checkout refuses rather than guess", () => {
    for (const bad of ["", "free", "enterprise", "PRO"]) {
      expect(priceForPlan(bad)).toBeUndefined()
    }
  })

  it("returns undefined when the price ids aren't configured server-side", () => {
    vi.stubEnv("STRIPE_PRICE_PRO", "")
    expect(priceForPlan("pro")).toBeUndefined()
  })
})

describe("planForPrice (webhook: price → plan)", () => {
  it("maps each configured price back to its plan", () => {
    expect(planForPrice(ENV.STRIPE_PRICE_BEGINNER)).toBe("beginner")
    expect(planForPrice(ENV.STRIPE_PRICE_BEGINNER_ANNUAL)).toBe("beginner")
    expect(planForPrice(ENV.STRIPE_PRICE_PRO)).toBe("pro")
    expect(planForPrice(ENV.STRIPE_PRICE_ANNUAL)).toBe("annual_pro")
  })

  it("fails closed on an unknown, empty or absent price id", () => {
    for (const bad of ["price_unknown", "", undefined]) {
      expect(planForPrice(bad as string | undefined)).toBeNull()
    }
  })
})

describe("partner commission calculation", () => {
  it("calculates the fixed 27% rate in integer cents", () => {
    expect(commissionAmount(999)).toBe(270)
    expect(commissionAmount(1499)).toBe(405)
    expect(commissionAmount(11_999)).toBe(3240)
  })

  it("rejects invalid money inputs rather than creating a bad commission", () => {
    expect(commissionAmount(0)).toBe(0)
    expect(commissionAmount(-100)).toBe(0)
    expect(commissionAmount(10.5)).toBe(0)
    expect(commissionAmount(Number.NaN)).toBe(0)
  })
})

/*
 * Partner attribution at checkout.
 *
 * This is the regression test for the bug that made the whole partner programme
 * pay nothing. The client sent the code it had captured from `?aff=CODE` in
 * localStorage — but `claimCapturedAffiliate()` DELETES that code at signup once
 * the attribution is banked in `affiliate_referrals`. Since checkout requires a
 * signed-in user, the code was always already gone by the time anyone paid, so
 * the session carried no `affiliate_id` and `recordCommission` returned at its
 * first line. Partners watched their invited-user count rise and their earnings
 * stay at zero.
 *
 * The fix reads `affiliate_referrals` as the fallback, so the durable row written
 * at signup is what earns the commission weeks later.
 */

/** Minimal Supabase query-builder stub: enough for the two lookups under test. */
/*
 * Webhook idempotency must be exactly-once WITH recovery. The event id is claimed
 * (inserted) before the entitlement write; if that write fails the handler returns
 * 500 so Stripe retries. Without releaseEvent, the claim would still be there on
 * retry, claimEvent would report "duplicate", and the paid customer's plan would
 * be dropped forever. These tests pin: claim once, dedupe the retry, and — only
 * after a release — allow the retry to re-process.
 */
function eventsTableStub() {
  const claimed = new Set<string>()
  return {
    claimed,
    from(table: string) {
      if (table !== "stripe_events") throw new Error(`unexpected table ${table}`)
      return {
        async insert({ event_id }: { event_id: string }) {
          if (claimed.has(event_id)) return { error: { code: "23505" } }
          claimed.add(event_id)
          return { error: null }
        },
        delete() {
          return {
            async eq(_col: string, value: string) {
              claimed.delete(value)
              return { error: null }
            },
          }
        },
      }
    },
  }
}

describe("webhook idempotency (claim / dedupe / release)", () => {
  it("claims a fresh event once and treats a redelivery as a duplicate", async () => {
    const supa = eventsTableStub()
    expect(await claimEvent(supa as never, "evt_1")).toBe(true) // first delivery
    expect(await claimEvent(supa as never, "evt_1")).toBe(false) // Stripe retry → skip
  })

  it("lets the retry re-process after a failed attempt releases the claim", async () => {
    const supa = eventsTableStub()
    expect(await claimEvent(supa as never, "evt_2")).toBe(true) // first delivery
    await releaseEvent(supa as never, "evt_2") // entitlement write threw → release before 500
    expect(supa.claimed.has("evt_2")).toBe(false)
    expect(await claimEvent(supa as never, "evt_2")).toBe(true) // retry re-processes, not dropped
  })

  it("does not release an unrelated event", async () => {
    const supa = eventsTableStub()
    await claimEvent(supa as never, "evt_a")
    await claimEvent(supa as never, "evt_b")
    await releaseEvent(supa as never, "evt_a")
    expect(supa.claimed.has("evt_a")).toBe(false)
    expect(supa.claimed.has("evt_b")).toBe(true) // evt_b's claim is untouched
  })
})

function supaStub(tables: {
  affiliates?: Record<string, { id: string; code: string; status: string }>
  referrals?: Record<string, { affiliate_id: string }>
}) {
  return {
    from(table: string) {
      const filters: Record<string, string> = {}
      const builder = {
        select: () => builder,
        eq(column: string, value: string) {
          filters[column] = value
          return builder
        },
        maybeSingle: async () => {
          if (table === "affiliates") {
            const rows = Object.values(tables.affiliates ?? {})
            const row = rows.find(
              (r) =>
                (filters.code === undefined || r.code === filters.code) &&
                (filters.id === undefined || r.id === filters.id) &&
                (filters.status === undefined || r.status === filters.status),
            )
            return { data: row ?? null }
          }
          if (table === "affiliate_referrals") {
            return { data: tables.referrals?.[filters.referred_user_id] ?? null }
          }
          return { data: null }
        },
      }
      return builder
    },
  } as never
}

describe("resolveAffiliateMetadata (which partner earns the commission)", () => {
  const ACTIVE = { id: "aff-1", code: "PARTNER27", status: "active" }

  it("credits the code sent with the request when it belongs to an active partner", async () => {
    const meta = await resolveAffiliateMetadata(
      supaStub({ affiliates: { a: ACTIVE } }),
      "user-1",
      "partner27",
    )
    expect(meta).toEqual({ affiliate_id: "aff-1", affiliate_code: "PARTNER27" })
  })

  it("falls back to the signup attribution when the client sends NO code", async () => {
    // The bug: this returned {} and no commission was ever recorded.
    const meta = await resolveAffiliateMetadata(
      supaStub({ affiliates: { a: ACTIVE }, referrals: { "user-1": { affiliate_id: "aff-1" } } }),
      "user-1",
      undefined,
    )
    expect(meta).toEqual({ affiliate_id: "aff-1", affiliate_code: "PARTNER27" })
  })

  it("falls back when the client sends an unknown code rather than dropping the referral", async () => {
    const meta = await resolveAffiliateMetadata(
      supaStub({ affiliates: { a: ACTIVE }, referrals: { "user-1": { affiliate_id: "aff-1" } } }),
      "user-1",
      "NOSUCHCODE",
    )
    expect(meta).toEqual({ affiliate_id: "aff-1", affiliate_code: "PARTNER27" })
  })

  it("pays nobody when the user was never referred", async () => {
    const meta = await resolveAffiliateMetadata(supaStub({ affiliates: { a: ACTIVE } }), "user-9", undefined)
    expect(meta).toEqual({})
  })

  it("pays nobody when the referring partner is no longer active", async () => {
    const revoked = { id: "aff-2", code: "REVOKED", status: "rejected" }
    const meta = await resolveAffiliateMetadata(
      supaStub({ affiliates: { a: revoked }, referrals: { "user-1": { affiliate_id: "aff-2" } } }),
      "user-1",
      undefined,
    )
    expect(meta).toEqual({})
  })

  it("ignores a code belonging to an INACTIVE partner and falls back to the referral", async () => {
    const pending = { id: "aff-3", code: "PENDING1", status: "pending" }
    const meta = await resolveAffiliateMetadata(
      supaStub({
        affiliates: { p: pending, a: ACTIVE },
        referrals: { "user-1": { affiliate_id: "aff-1" } },
      }),
      "user-1",
      "PENDING1",
    )
    expect(meta).toEqual({ affiliate_id: "aff-1", affiliate_code: "PARTNER27" })
  })

  it("normalises a lowercase or punctuated code before matching", async () => {
    const meta = await resolveAffiliateMetadata(
      supaStub({ affiliates: { a: ACTIVE } }),
      "user-1",
      " partner-27 ",
    )
    expect(meta).toEqual({ affiliate_id: "aff-1", affiliate_code: "PARTNER27" })
  })
})
