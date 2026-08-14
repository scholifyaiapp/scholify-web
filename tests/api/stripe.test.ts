import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import {
  claimEvent,
  commissionAmount,
  invoiceSubscriptionId,
  isCommissionableInvoice,
  planForPrice,
  priceForPlan,
  recordPaidInvoiceCommission,
  releaseEvent,
  resolveAffiliateMetadata,
} from "../../api/stripe.js"

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

describe("paid-invoice commission trigger", () => {
  it("ignores the zero-value trial invoice and records successful subscription cycles", () => {
    expect(isCommissionableInvoice(0, "subscription_create")).toBe(false)
    expect(isCommissionableInvoice(1499, "subscription_cycle")).toBe(true)
    expect(isCommissionableInvoice(1499, "subscription_create")).toBe(true)
  })

  it("does not treat upgrades, manual invoices or malformed amounts as monthly cycles", () => {
    expect(isCommissionableInvoice(500, "subscription_update")).toBe(false)
    expect(isCommissionableInvoice(500, "manual")).toBe(false)
    expect(isCommissionableInvoice(10.5, "subscription_cycle")).toBe(false)
  })

  it("finds a subscription in both legacy and current Stripe invoice shapes", () => {
    expect(invoiceSubscriptionId({ subscription: "sub_legacy" } as never)).toBe("sub_legacy")
    expect(invoiceSubscriptionId({ parent: { subscription_details: { subscription: "sub_current" } } } as never)).toBe("sub_current")
  })
})

function paidInvoiceDb(paidBefore: number) {
  const referrals = [
    ...Array.from({ length: paidBefore }, (_, index) => ({
      id: `old-${index}`,
      affiliate_id: "aff-1",
      referred_user_id: `old-user-${index}`,
      first_paid_at: "2026-01-01T00:00:00.000Z",
      commission_cycles: 1,
      stripe_customer_id: `cus-old-${index}`,
    })),
    {
      id: "ref-current",
      affiliate_id: "aff-1",
      referred_user_id: "user-1",
      first_paid_at: null as string | null,
      commission_cycles: 1,
      stripe_customer_id: null as string | null,
    },
  ]
  const commissions: Array<Record<string, unknown>> = []
  const affiliate = { id: "aff-1", code: "PARTNER27", user_id: "partner-user", status: "active", commission_rate: 0.27 }

  return {
    state: { referrals, commissions },
    from(table: string) {
      const filters: Record<string, unknown> = {}
      const notNull = new Set<string>()
      let updatePayload: Record<string, unknown> | null = null
      const rows = () => {
        const source: Array<Record<string, unknown>> = table === "affiliates" ? [affiliate] : table === "affiliate_referrals" ? referrals : commissions
        return source.filter((row) => Object.entries(filters).every(([key, value]) => row[key] === value) && [...notNull].every((key) => row[key] != null))
      }
      const execute = () => {
        if (updatePayload) Object.assign(rows()[0] ?? {}, updatePayload)
        return { data: null, count: rows().length, error: null }
      }
      const builder: Record<string, unknown> & {
        select: (columns: string, options?: unknown) => typeof builder
        eq: (column: string, value: unknown) => typeof builder
        not: (column: string, operator: string, value: unknown) => typeof builder
        update: (payload: Record<string, unknown>) => typeof builder
        maybeSingle: () => Promise<{ data: Record<string, unknown> | null }>
        insert: (row: Record<string, unknown>) => Promise<{ error: null }>
        then: (resolve: (value: unknown) => unknown, reject: (reason: unknown) => unknown) => Promise<unknown>
      } = {
        select: () => builder,
        eq(column, value) { filters[column] = value; return builder },
        not(column, operator, value) { if (operator === "is" && value === null) notNull.add(column); return builder },
        update(payload) { updatePayload = payload; return builder },
        async maybeSingle() { return { data: rows()[0] ?? null } },
        async insert(row) {
          if (table === "affiliate_referrals") referrals.push(row as typeof referrals[number])
          else if (table === "affiliate_commissions") commissions.push(row)
          return { error: null }
        },
        then(resolve, reject) { return Promise.resolve(execute()).then(resolve, reject) },
      }
      return builder
    },
  }
}

describe("recordPaidInvoiceCommission", () => {
  it("locks the 300th unique paid learner to three payments and records cycle one", async () => {
    const database = paidInvoiceDb(299)
    const stripe = {
      subscriptions: {
        retrieve: async () => ({
          metadata: { affiliate_id: "aff-1", userId: "user-1" },
          customer: "cus-current",
          items: { data: [{ price: { id: ENV.STRIPE_PRICE_PRO, recurring: { interval: "month" } } }] },
        }),
      },
    }
    const invoice = {
      id: "in_paid_1",
      amount_paid: 1499,
      billing_reason: "subscription_cycle",
      currency: "usd",
      customer: "cus-current",
      parent: { subscription_details: { subscription: "sub-1" } },
      status_transitions: { paid_at: 1_787_000_000 },
    }

    await recordPaidInvoiceCommission(database as never, stripe as never, invoice as never)

    const current = database.state.referrals.find((row) => row.id === "ref-current")
    expect(current).toMatchObject({ commission_cycles: 3, stripe_customer_id: "cus-current" })
    expect(database.state.commissions).toHaveLength(1)
    expect(database.state.commissions[0]).toMatchObject({
      stripe_invoice_id: "in_paid_1",
      billing_cycle: 1,
      commission_cycles: 3,
      commission_amount: 405,
      plan: "pro",
    })

    for (const cycle of [2, 3, 4]) {
      await recordPaidInvoiceCommission(
        database as never,
        stripe as never,
        { ...invoice, id: `in_paid_${cycle}`, status_transitions: { paid_at: 1_787_000_000 + cycle * 2_592_000 } } as never,
      )
    }
    expect(database.state.commissions.map((row) => row.billing_cycle)).toEqual([1, 2, 3])
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
  affiliates?: Record<string, { id: string; code: string; status: string; user_id?: string }>
  referrals?: Record<string, { affiliate_id: string }>
}) {
  const referrals = { ...(tables.referrals ?? {}) }
  return {
    from(table: string) {
      const filters: Record<string, string> = {}
      const builder = {
        select: () => builder,
        async insert(row: { affiliate_id: string; referred_user_id: string }) {
          if (table !== "affiliate_referrals") return { error: null }
          if (referrals[row.referred_user_id]) return { error: { code: "23505" } }
          referrals[row.referred_user_id] = { affiliate_id: row.affiliate_id }
          return { error: null }
        },
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
            return { data: referrals[filters.referred_user_id] ?? null }
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

  it("keeps the account's first partner when a later checkout sends another valid code", async () => {
    const other = { id: "aff-2", code: "OTHER27", status: "active" }
    const meta = await resolveAffiliateMetadata(
      supaStub({
        affiliates: { a: ACTIVE, b: other },
        referrals: { "user-1": { affiliate_id: "aff-1" } },
      }),
      "user-1",
      "OTHER27",
    )
    expect(meta).toEqual({ affiliate_id: "aff-1", affiliate_code: "PARTNER27" })
  })

  it("blocks a partner from earning on their own account", async () => {
    const self = { ...ACTIVE, user_id: "user-1" }
    expect(await resolveAffiliateMetadata(supaStub({ affiliates: { a: self } }), "user-1", "PARTNER27")).toEqual({})
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
