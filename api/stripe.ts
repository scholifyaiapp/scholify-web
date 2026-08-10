import type { VercelRequest, VercelResponse } from "./vercel-types.js"
import { createClient } from "@supabase/supabase-js"
import Stripe from "stripe"
import { timingSafeEqual } from "node:crypto"

/*
 * Stripe Billing — single Vercel function dispatched by `?action=` (12-function
 * Hobby cap), the international/card rail for Flowlify LLC.
 *
 *   POST /api/stripe?action=checkout   (auth: Supabase JWT)
 *     body: { plan: "beginner" | "annual_beginner" | "pro" | "annual_pro" }
 *     → creates a subscription Checkout Session for the signed-in user and
 *       returns { url } to redirect to. The user id rides in metadata so the
 *       webhook can grant the entitlement to the right account.
 *
 *   POST /api/stripe?action=webhook    (Stripe signature)
 *     → verifies the signature, dedupes the event, and writes the plan to the
 *       user's service-role-only app_metadata + the subscriptions audit table.
 *
 *   POST /api/stripe?action=cancel     (auth: Supabase JWT)
 *     → schedules cancellation at period end.
 *
 * Entitlement lives in service-role-only app_metadata: the browser can request
 * checkout, but cannot grant itself access. Pro checkout carries the one-time,
 * card-backed 3-day trial; Beginner starts billing immediately.
 *
 * Env: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_BEGINNER,
 * STRIPE_PRICE_BEGINNER_ANNUAL, STRIPE_PRICE_PRO, STRIPE_PRICE_ANNUAL,
 * SUPABASE_SERVICE_ROLE_KEY +
 * VITE_SUPABASE_URL. Client sees only VITE_STRIPE_PUBLISHABLE_KEY (the "is
 * billing live?" flag).
 */

// The webhook needs the exact raw bytes Stripe signed.
export const config = { api: { bodyParser: false } }

function stripeClient(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY
  return key ? new Stripe(key) : null
}

function admin() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

function readRawBody(req: VercelRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ""
    req.on("data", (chunk) => (data += chunk))
    req.on("end", () => resolve(data))
    req.on("error", reject)
  })
}

/** The four billing choices → their configured Stripe price ids (server-only). */
export function priceForPlan(plan: string): string | undefined {
  if (plan === "beginner") return process.env.STRIPE_PRICE_BEGINNER || undefined
  if (plan === "annual_beginner") return process.env.STRIPE_PRICE_BEGINNER_ANNUAL || undefined
  if (plan === "pro") return process.env.STRIPE_PRICE_PRO || undefined
  if (plan === "annual_pro") return process.env.STRIPE_PRICE_ANNUAL || undefined
  return undefined
}

/** A Stripe price id → the app's plan string (the inverse, for webhooks). */
export function planForPrice(priceId: string | undefined): string | null {
  if (!priceId) return null
  if (priceId === process.env.STRIPE_PRICE_BEGINNER) return "beginner"
  if (priceId === process.env.STRIPE_PRICE_BEGINNER_ANNUAL) return "beginner"
  if (priceId === process.env.STRIPE_PRICE_PRO) return "pro"
  if (priceId === process.env.STRIPE_PRICE_ANNUAL) return "annual_pro"
  return null
}

/** Verify the Supabase JWT; returns the user, or null when unauthenticated. */
async function authedUser(
  req: VercelRequest,
  supa: NonNullable<ReturnType<typeof admin>>,
): Promise<{ id: string; email: string; app_metadata: Record<string, unknown> } | null> {
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  if (!token) return null
  const { data, error } = await supa.auth.getUser(token)
  if (error || !data?.user) return null
  return { id: data.user.id, email: String(data.user.email || ""), app_metadata: data.user.app_metadata ?? {} }
}

/**
 * Idempotency: has this Stripe event already been applied? Stripe retries, so
 * recording the event id makes entitlement changes exactly-once. Returns true if
 * NEW (and claims it); false if seen before. A missing table (0018 not applied)
 * falls through rather than dropping a real payment.
 */
export async function claimEvent(supa: NonNullable<ReturnType<typeof admin>>, eventId: string): Promise<boolean> {
  const { error } = await supa.from("stripe_events").insert({ event_id: eventId })
  if (!error) return true
  if ((error as { code?: string }).code === "23505") return false
  return true
}

/**
 * Undo a claim when processing FAILED, so Stripe's retry actually re-processes.
 *
 * The claim is inserted before the entitlement write; without this release a
 * transient failure (a Supabase blip mid-write) would leave the event id claimed,
 * every retry would short-circuit as a duplicate, and a paying customer would
 * never be granted their plan. Every downstream write is idempotent
 * (recordCommission has a unique stripe_session_id; writeEntitlement merges), so
 * re-processing on retry is safe.
 */
export async function releaseEvent(supa: NonNullable<ReturnType<typeof admin>>, eventId: string): Promise<void> {
  try {
    await supa.from("stripe_events").delete().eq("event_id", eventId)
  } catch {
    /* best-effort — a still-claimed event just means Stripe's next retry no-ops */
  }
}

/** Write the entitlement to app_metadata + the subscriptions audit table. */
async function writeEntitlement(
  supa: NonNullable<ReturnType<typeof admin>>,
  userId: string,
  fields: {
    plan?: string
    status: string
    priceId?: string
    billingInterval?: "month" | "year"
    subscriptionId?: string
    customerId?: string
    trialStartsAt?: string
    trialEndsAt?: string
    eventType: string
  },
): Promise<void> {
  const canceled = fields.status === "canceled"
  const meta: Record<string, unknown> = canceled
    ? { plan: "free", plan_status: "canceled" }
    : {
        ...(fields.plan ? { plan: fields.plan } : {}),
        plan_status: fields.status,
        ...(fields.subscriptionId ? { stripe_subscription_id: fields.subscriptionId } : {}),
        ...(fields.customerId ? { stripe_customer_id: fields.customerId } : {}),
        ...(fields.billingInterval ? { billing_interval: fields.billingInterval } : {}),
        ...(fields.trialStartsAt ? { trial_started_at: fields.trialStartsAt } : {}),
        ...(fields.trialEndsAt ? { trial_ends_at: fields.trialEndsAt } : {}),
      }
  // Entitlement is service-role-only app_metadata — a user cannot self-grant it.
  const { data: existingUser } = await supa.auth.admin.getUserById(userId)
  const previousMeta = existingUser?.user?.app_metadata ?? {}

  /*
   * Stamp when the dunning clock STARTED, so the grace window in
   * src/lib/entitlement.ts (GRACE_DAYS) is measured from the first failure and
   * not restarted by every retry webhook Stripe sends afterwards. Cleared the
   * moment a payment succeeds, so a customer who fixes their card is not still
   * carrying a countdown.
   */
  if (fields.status === "past_due") {
    meta.past_due_since =
      typeof previousMeta.past_due_since === "string" ? previousMeta.past_due_since : new Date().toISOString()
  } else {
    meta.past_due_since = null
  }

  await supa.auth.admin.updateUserById(userId, {
    app_metadata: { ...previousMeta, ...meta },
  })

  // The durable billing record behind app_metadata (best-effort — never blocks).
  try {
    await supa.from("subscriptions").upsert(
      {
        user_id: userId,
        ...(canceled ? { plan: "free" } : fields.plan ? { plan: fields.plan } : {}),
        status: fields.status,
        ...(fields.priceId ? { price_id: fields.priceId } : {}),
        ...(fields.subscriptionId ? { paddle_subscription_id: fields.subscriptionId } : {}),
        ...(fields.customerId ? { paddle_customer_id: fields.customerId } : {}),
        last_event_type: `stripe.${fields.eventType}`,
        last_event_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    if (!canceled && fields.status === "active") {
      await supa.from("profiles").upsert(
        { id: userId, converted_to_paid: true },
        { onConflict: "id" },
      )
    }
  } catch {
    /* audit trail is best-effort */
  }
}

/* ── Affiliate commissions (Phase 1: record only — payouts are Phase 2) ── */

const COMMISSION_HOLD_DAYS = 30

/** Integer-cents commission calculation. Keeping this pure and tested avoids
 * floating-point drift in the money path. */
export function commissionAmount(saleAmount: number, rate = 0.27): number {
  if (!Number.isSafeInteger(saleAmount) || saleAmount <= 0 || !Number.isFinite(rate) || rate < 0) return 0
  return Math.round(saleAmount * rate)
}

/**
 * Resolve the partner a checkout should be credited to.
 *
 * ── Why this reads the DATABASE and not only the request ─────────
 * The client sends the code it captured from `?aff=CODE` in localStorage. That
 * used to be the ONLY source, and it silently lost every commission the
 * programme was supposed to pay:
 *
 *   1. a visitor arrives on `?aff=CODE` — the code goes into localStorage;
 *   2. they sign up — `claimCapturedAffiliate()` records the attribution in
 *      `affiliate_referrals` and then CLEARS the code from localStorage;
 *   3. days or weeks later they upgrade — `getCapturedAffiliate()` returns null,
 *      the checkout session carries no `affiliate_id`, and `recordCommission`
 *      returns immediately.
 *
 * Because checkout requires a signed-in user, step 2 ALWAYS happens before step
 * 3, so there was no path in which a commission was ever recorded. Partners saw
 * their invited-user count rise and their earnings stay at zero.
 *
 * `affiliate_referrals` already holds the durable attribution written at signup,
 * so it is the right source of truth here: it survives a cleared localStorage, a
 * different browser, a different device, and the months between a free signup and
 * a paid upgrade. The request code is still honoured first — it covers the case
 * of a visitor who arrives on a partner link and buys in the same session before
 * any referral row exists — and the database is the fallback.
 */
export async function resolveAffiliateMetadata(
  supa: NonNullable<ReturnType<typeof admin>>,
  userId: string,
  rawCode: unknown,
): Promise<Record<string, string>> {
  const code = String(rawCode || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 20)
  if (code) {
    const { data: aff } = await supa
      .from("affiliates")
      .select("id, code")
      .eq("code", code)
      .eq("status", "active")
      .maybeSingle()
    if (aff) return { affiliate_id: aff.id, affiliate_code: aff.code }
  }

  // Fall back to the attribution recorded when this user signed up.
  const { data: referral } = await supa
    .from("affiliate_referrals")
    .select("affiliate_id")
    .eq("referred_user_id", userId)
    .maybeSingle()
  if (!referral?.affiliate_id) return {}

  // Only an ACTIVE partner earns — a revoked one keeps the referral row but not
  // the commission, which is the same rule recordCommission applies.
  const { data: aff } = await supa
    .from("affiliates")
    .select("id, code, status")
    .eq("id", referral.affiliate_id)
    .maybeSingle()
  if (!aff || aff.status !== "active") return {}
  return { affiliate_id: aff.id, affiliate_code: aff.code }
}

/**
 * Record a 27% (or the affiliate's own rate) commission for a completed
 * checkout, if the session was attributed to an affiliate. Idempotent via the
 * unique `stripe_session_id`. Best-effort — the caller swallows any error so a
 * commission failure can never block the buyer's entitlement.
 */
async function recordCommission(
  supa: NonNullable<ReturnType<typeof admin>>,
  session: Stripe.Checkout.Session,
): Promise<void> {
  const affiliateId = session.metadata?.affiliate_id
  const saleAmount = session.amount_total ?? 0
  if (!affiliateId || saleAmount <= 0) return

  // Use the affiliate's own rate (defaults to 27%); confirm they're still active.
  const { data: aff } = await supa
    .from("affiliates")
    .select("commission_rate, status")
    .eq("id", affiliateId)
    .maybeSingle()
  if (!aff || aff.status !== "active") return

  const rate = typeof aff.commission_rate === "number" ? aff.commission_rate : 0.27
  const commission = commissionAmount(saleAmount, rate)
  const availableAfter = new Date(Date.now() + COMMISSION_HOLD_DAYS * 864e5).toISOString()

  const paymentIntent =
    typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null
  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id ?? null

  // Unique stripe_session_id makes this a no-op if the webhook is redelivered.
  await supa.from("affiliate_commissions").insert({
    affiliate_id: affiliateId,
    stripe_session_id: session.id,
    stripe_payment_intent: paymentIntent,
    stripe_customer_id: customerId,
    currency: session.currency ?? "usd",
    sale_amount: saleAmount,
    commission_amount: commission,
    status: "pending",
    available_after: availableAfter,
  })
}

/**
 * A refund or chargeback pulls back any still-pending commission for that
 * Stripe customer. We match on customer (subscription-mode charges don't carry
 * the checkout's payment_intent) and only touch rows not yet paid out.
 */
async function cancelCommissionForCustomer(
  supa: NonNullable<ReturnType<typeof admin>>,
  customerId: string,
  fully: boolean,
): Promise<void> {
  await supa
    .from("affiliate_commissions")
    .update({ status: "canceled" })
    .eq("stripe_customer_id", customerId)
    .in("status", ["pending", "approved"])
  // (Partial refunds still cancel in Phase 1 — a rare edge; revisit if needed.)
  void fully
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "POST only" })
    return
  }
  const action = String(req.query.action || "").trim().toLowerCase()
  if (action === "webhook") return webhook(req, res)
  if (action === "checkout") return checkout(req, res)
  if (action === "cancel") return cancel(req, res)
  if (action === "portal") return portal(req, res)
  if (action === "refund") return refundPayment(req, res)
  if (action === "selftest") return selftest(req, res)
  res.status(400).json({ error: "Unknown action. Use ?action=checkout | webhook | cancel | portal | refund | selftest." })
}

/** Founder-only full refund. Refund first, then cancel immediately; webhook
 * delivery remains the durable entitlement/commission reconciliation path. */
async function refundPayment(req: VercelRequest, res: VercelResponse): Promise<void> {
  const stripe = stripeClient()
  const supa = admin()
  if (!stripe || !supa) return void res.status(200).json({ ok: false, reason: "not_configured" })
  if (!(await selftestAuthorised(req, supa))) return void res.status(403).json({ ok: false, reason: "forbidden" })
  const raw = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {})
  const userId = String(raw.userId || "")
  const reason = String(raw.reason || "requested_by_customer").slice(0, 300)
  if (!/^[0-9a-f-]{36}$/i.test(userId)) return void res.status(400).json({ ok: false, reason: "bad_user" })
  const { data } = await supa.auth.admin.getUserById(userId)
  const user = data.user
  const subId = String(user?.app_metadata?.stripe_subscription_id || "")
  if (!subId) return void res.status(200).json({ ok: false, reason: "no_subscription" })
  try {
    const invoices = await stripe.invoices.list({ subscription: subId, status: "paid", limit: 1 })
    const invoice = invoices.data[0] as Stripe.Invoice & { charge?: string | Stripe.Charge | null; payment_intent?: string | Stripe.PaymentIntent | null }
    const charge = typeof invoice?.charge === "string" ? invoice.charge : invoice?.charge?.id
    const paymentIntent = typeof invoice?.payment_intent === "string" ? invoice.payment_intent : invoice?.payment_intent?.id
    if (!charge && !paymentIntent) return void res.status(200).json({ ok: false, reason: "no_refundable_payment" })
    const refunded = await stripe.refunds.create({ ...(charge ? { charge } : { payment_intent: paymentIntent! }), metadata: { refunded_user_id: userId, admin_reason: reason } })
    // A successful refund must revoke app access even if Stripe reports the
    // subscription was already canceled between the invoice lookup and here.
    try {
      await stripe.subscriptions.cancel(subId)
    } catch (cancelError) {
      console.warn("stripe refund subscription cancel:", cancelError)
    }
    await writeEntitlement(supa, userId, { plan: "free", status: "refunded", subscriptionId: subId, eventType: "admin.refund" })
    res.status(200).json({ ok: true, refundId: refunded.id, amount: refunded.amount, currency: refunded.currency })
  } catch (error) {
    console.error("stripe refund:", error)
    res.status(200).json({ ok: false, reason: "refund_failed" })
  }
}

/* ── Self-test: does a payment actually reach OUR account? ───────────── */

/** The only account permitted to run the self-test (it returns account details). */
const ADMIN_EMAIL = "scholifyaiapp@gmail.com"

/** Constant-time bearer comparison — a length-safe equality that does not leak the
 * secret through timing. */
function bearerMatches(req: VercelRequest, expected: string | undefined): boolean {
  if (!expected) return false
  const supplied = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  if (!supplied || supplied.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))
}

/** May this caller run the self-test? The admin's JWT, or CRON_SECRET. */
async function selftestAuthorised(
  req: VercelRequest,
  supa: NonNullable<ReturnType<typeof admin>>,
): Promise<boolean> {
  if (bearerMatches(req, process.env.CRON_SECRET)) return true
  const user = await authedUser(req, supa)
  return !!user && user.email.toLowerCase() === ADMIN_EMAIL
}

/** The webhook events this file handles. A subscription missing any of these means
 * the corresponding entitlement change silently never happens. */
const REQUIRED_WEBHOOK_EVENTS = [
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
] as const

/**
 * Prove, against the live Stripe API, that a payment would reach this account —
 * the question "/api/health" cannot answer.
 *
 * Health reports whether keys are SET. That is not the same as money arriving, and
 * three separate misconfigurations produce a working-looking checkout that pays
 * nobody:
 *
 *   · a TEST-mode key — payments appear in the Stripe dashboard, the bank stays empty;
 *   · an account with `charges_enabled: false` or `payouts_enabled: false` — Stripe
 *     accepts the customer but will not settle to the bank;
 *   · a webhook endpoint that is missing, disabled, or not subscribed to
 *     `checkout.session.completed` — the customer pays and is never granted a plan.
 *
 * Each is invisible until a real customer is affected, so this endpoint checks all
 * three plus the four price ids, and returns a single `verdict`.
 *
 * Admin-only: it reveals account and price configuration. POST with the admin's
 * Supabase JWT.
 */
async function selftest(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader("Cache-Control", "no-store")
  const stripe = stripeClient()
  const supa = admin()
  if (!supa) {
    res.status(200).json({ ok: false, reason: "missing_supabase_admin" })
    return
  }
  /*
   * Two ways in, because the point of this endpoint is that it gets RUN.
   *
   * The admin's Supabase JWT is the primary path, but extracting one from the
   * browser to paste into a terminal is enough friction that a pre-launch check
   * quietly never happens. CRON_SECRET is already set in production, is held only
   * by the founder, and is compared in constant time — so `curl -H "Authorization:
   * Bearer $CRON_SECRET"` is a one-liner from any shell.
   *
   * Nothing secret is returned either way: account id, business name, price amounts
   * and webhook URLs are configuration, not credentials.
   */
  if (!(await selftestAuthorised(req, supa))) {
    res.status(403).json({ ok: false, reason: "forbidden" })
    return
  }
  if (!stripe) {
    res.status(200).json({ ok: false, reason: "not_configured", verdict: "STRIPE_SECRET_KEY is not set" })
    return
  }

  const secret = process.env.STRIPE_SECRET_KEY || ""
  const mode = /^(sk|rk)_live_/.test(secret) ? "live" : /^(sk|rk)_test_/.test(secret) ? "test" : "unknown"
  const problems: string[] = []

  /* 1. The account itself — can it charge, and can it pay out to a bank? */
  let account: {
    id?: string
    business_name?: string | null
    country?: string | null
    default_currency?: string | null
    charges_enabled?: boolean
    payouts_enabled?: boolean
  } = {}
  try {
    const acct = await stripe.accounts.retrieve()
    account = {
      id: acct.id,
      business_name: acct.business_profile?.name ?? acct.settings?.dashboard?.display_name ?? null,
      country: acct.country ?? null,
      default_currency: acct.default_currency ?? null,
      charges_enabled: acct.charges_enabled,
      payouts_enabled: acct.payouts_enabled,
    }
    if (!acct.charges_enabled) problems.push("Stripe account cannot accept charges (charges_enabled is false).")
    if (!acct.payouts_enabled)
      problems.push("Stripe account cannot pay out (payouts_enabled is false) — money would be collected but never settle to the bank.")
  } catch (err) {
    problems.push(`Could not read the Stripe account: ${(err as Error).message.slice(0, 140)}`)
  }

  /* 2. The four price ids — do they exist in THIS account, and are they active? */
  const plans = ["beginner", "annual_beginner", "pro", "annual_pro"] as const
  const prices: Record<string, unknown> = {}
  for (const plan of plans) {
    const id = priceForPlan(plan)
    if (!id) {
      prices[plan] = { configured: false }
      problems.push(`No price id configured for the "${plan}" plan.`)
      continue
    }
    try {
      const price = await stripe.prices.retrieve(id)
      prices[plan] = {
        configured: true,
        id: price.id,
        active: price.active,
        unit_amount: price.unit_amount,
        currency: price.currency,
        interval: price.recurring?.interval ?? null,
        livemode: price.livemode,
      }
      if (!price.active) problems.push(`The "${plan}" price (${price.id}) is ARCHIVED in Stripe — checkout will fail.`)
      if (!price.recurring)
        problems.push(`The "${plan}" price (${price.id}) is not recurring, but checkout runs in subscription mode.`)
    } catch (err) {
      prices[plan] = { configured: true, id, error: (err as Error).message.slice(0, 140) }
      problems.push(
        `The "${plan}" price id does not exist in this Stripe account — a price id from the OTHER mode (live vs test) is the usual cause.`,
      )
    }
  }

  /* 3. The webhook — without it, customers pay and are never granted a plan. */
  let webhookReport: unknown = { checked: false }
  try {
    const endpoints = await stripe.webhookEndpoints.list({ limit: 100 })
    const enabled = endpoints.data.filter((e) => e.status === "enabled")
    const subscribed = new Set<string>()
    for (const e of enabled) for (const ev of e.enabled_events) subscribed.add(ev)
    const wildcard = subscribed.has("*")
    const missing = REQUIRED_WEBHOOK_EVENTS.filter((ev) => !wildcard && !subscribed.has(ev))
    webhookReport = {
      checked: true,
      endpoints_total: endpoints.data.length,
      endpoints_enabled: enabled.length,
      urls: enabled.map((e) => e.url),
      missing_events: missing,
    }
    if (enabled.length === 0)
      problems.push("No ENABLED webhook endpoint in Stripe — customers would pay and never be granted their plan.")
    if (missing.length > 0)
      problems.push(
        `Webhook endpoint(s) do not subscribe to: ${missing.join(", ")}. Each missing event is an entitlement change that silently never happens.`,
      )
  } catch (err) {
    webhookReport = { checked: false, error: (err as Error).message.slice(0, 140) }
  }

  /* 4. The mode warning is last because it is a statement of fact, not a fault. */
  if (mode === "test")
    problems.push(
      "Stripe is in TEST mode: checkout works and payments show in the dashboard, but NO REAL MONEY is collected.",
    )
  if (mode === "unknown") problems.push("STRIPE_SECRET_KEY has an unrecognised prefix — cannot tell live from test.")

  const collectsRealMoney = mode === "live" && account.charges_enabled === true && account.payouts_enabled === true
  res.status(200).json({
    ok: problems.length === 0,
    mode,
    collects_real_money: collectsRealMoney,
    verdict: problems.length === 0
      ? `Payments reach the Stripe account ${account.id ?? ""} (${account.business_name ?? "unnamed"}) in ${mode} mode, and the webhook grants plans.`
      : `${problems.length} problem(s) would stop payments reaching the account or stop plans being granted.`,
    problems,
    account,
    prices,
    webhook: webhookReport,
  })
}

/* ── Checkout: app → Stripe hosted checkout ─────────────────────────── */

async function checkout(req: VercelRequest, res: VercelResponse): Promise<void> {
  const stripe = stripeClient()
  const supa = admin()
  if (!stripe || !supa) {
    res.status(200).json({ ok: false, reason: "not_configured" })
    return
  }
  const user = await authedUser(req, supa)
  if (!user) {
    res.status(401).json({ ok: false, reason: "auth_required" })
    return
  }

  let body: Record<string, unknown> = {}
  try {
    const raw = await readRawBody(req)
    body = raw ? JSON.parse(raw) : {}
  } catch {
    res.status(400).json({ ok: false, reason: "bad_json" })
    return
  }

  const plan = String(body.plan || "")
  const priceId = priceForPlan(plan)
  if (!priceId) {
    res.status(400).json({ ok: false, reason: "unknown_plan" })
    return
  }

  const origin =
    (req.headers.origin as string | undefined) ||
    process.env.VITE_PUBLIC_SITE_URL ||
    "https://www.scholifyapp.com"

  // A paying customer must manage their existing subscription rather than
  // accidentally creating a second one. This server-side guard protects every
  // checkout entry point, including stale browser tabs and older app builds.
  const existingSubscriptionId = user.app_metadata?.stripe_subscription_id as string | undefined
  const existingCustomerId = user.app_metadata?.stripe_customer_id as string | undefined
  if (existingSubscriptionId && existingCustomerId) {
    try {
      const existing = await stripe.subscriptions.retrieve(existingSubscriptionId)
      if (existing.status !== "canceled" && existing.status !== "incomplete_expired") {
        const portalSession = await stripe.billingPortal.sessions.create({
          customer: existingCustomerId,
          return_url: `${origin}/pricing?billing=updated`,
        })
        res.status(200).json({ ok: true, url: portalSession.url, destination: "portal" })
        return
      }
    } catch {
      // A stale subscription id should not strand the customer; Checkout below
      // can create a fresh subscription and the webhook repairs app_metadata.
    }
  }

  const affMeta = await resolveAffiliateMetadata(supa, user.id, body.affiliateCode)
  /*
   * THE TRIAL IS MONTHLY PRO ONLY.
   *
   * It used to include annual_pro, which meant the highest-value plan we sell
   * — a $119.99 commitment — was also the one we handed over for three days on
   * a card we had never charged. Beginner has never had a trial and still
   * doesn't: it is payable immediately, at both billing intervals.
   *
   * The free part of Scholify is onboarding, the diagnosis and the plan it
   * generates. The trial is not a fourth free thing; it is a paid Pro
   * subscription whose first charge is deferred by three days, and it only
   * exists after full card details have been captured
   * (payment_method_collection: "always", below).
   */
  const isProPlan = plan === "pro"
  const hadTrial = Boolean(user.app_metadata?.trial_started_at)

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: user.email || undefined,
      client_reference_id: user.id,
      // Both the session AND the subscription carry the user id, so every
      // webhook (checkout + later renewals/cancellations) can map to the account.
      metadata: { userId: user.id, ...affMeta },
      subscription_data: {
        metadata: { userId: user.id, ...affMeta },
        ...(isProPlan && !hadTrial ? { trial_period_days: 3 } : {}),
      },
      payment_method_collection: "always",
      allow_promotion_codes: true,
      success_url: `${origin}/study?upgraded=true`,
      // Cancellation returns to plan selection, never into the learning app.
      cancel_url: `${origin}/pricing?checkout=cancelled`,
    })
    res.status(200).json({ ok: true, url: session.url })
  } catch (err) {
    console.error("stripe checkout:", err)
    res.status(200).json({ ok: false, reason: "checkout_failed" })
  }
}

/* ── Billing portal: change plan, payment method, invoices ──────────── */

async function portal(req: VercelRequest, res: VercelResponse): Promise<void> {
  const stripe = stripeClient()
  const supa = admin()
  if (!stripe || !supa) {
    res.status(200).json({ ok: false, reason: "not_configured" })
    return
  }
  const user = await authedUser(req, supa)
  if (!user) {
    res.status(401).json({ ok: false, reason: "auth_required" })
    return
  }
  const customerId = user.app_metadata?.stripe_customer_id as string | undefined
  if (!customerId) {
    res.status(200).json({ ok: false, reason: "no_customer" })
    return
  }
  const origin =
    (req.headers.origin as string | undefined) ||
    process.env.VITE_PUBLIC_SITE_URL ||
    "https://www.scholifyapp.com"
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/settings`,
    })
    res.status(200).json({ ok: true, url: session.url })
  } catch (err) {
    console.error("stripe portal:", err)
    res.status(200).json({ ok: false, reason: "portal_failed" })
  }
}

/* ── Webhook: Stripe → entitlement ──────────────────────────────────── */

async function webhook(req: VercelRequest, res: VercelResponse): Promise<void> {
  const stripe = stripeClient()
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!stripe || !secret) {
    res.status(200).json({ ok: false, reason: "not_configured" })
    return
  }
  const raw = await readRawBody(req)
  const sig = req.headers["stripe-signature"] as string | undefined

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(raw, sig ?? "", secret)
  } catch {
    res.status(400).json({ ok: false, reason: "bad_signature" })
    return
  }

  const supa = admin()
  if (!supa) {
    res.status(200).json({ ok: false, reason: "missing_supabase_admin" })
    return
  }
  if (!(await claimEvent(supa, event.id))) {
    res.status(200).json({ ok: true, duplicate: true })
    return
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId || session.client_reference_id || undefined
      const subId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id
      if (userId && subId) {
        const sub = await stripe.subscriptions.retrieve(subId)
        const priceId = sub.items.data[0]?.price?.id
        const plan = planForPrice(priceId)
        await writeEntitlement(supa, userId, {
          plan: plan ?? undefined,
          status: sub.status === "trialing" ? "trialing" : "active",
          priceId,
          billingInterval: sub.items.data[0]?.price?.recurring?.interval === "year" ? "year" : "month",
          subscriptionId: sub.id,
          customerId: typeof sub.customer === "string" ? sub.customer : sub.customer?.id,
          trialStartsAt: sub.trial_start ? new Date(sub.trial_start * 1000).toISOString() : undefined,
          trialEndsAt: sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : undefined,
          eventType: event.type,
        })
      }
      // Affiliate commission — best-effort side effect, never blocks entitlement.
      await recordCommission(supa, session).catch((e) => console.error("affiliate commission:", e))
    } else if (event.type === "charge.refunded" || event.type === "charge.dispute.created") {
      // Refund / chargeback → pull back any still-pending commission for that customer.
      const charge = event.data.object as Stripe.Charge | Stripe.Dispute
      const customerId =
        "customer" in charge && typeof charge.customer === "string" ? charge.customer : null
      const fullyRefunded =
        event.type === "charge.dispute.created" ||
        ("amount_refunded" in charge && "amount" in charge && charge.amount_refunded >= charge.amount)
      if (customerId) await cancelCommissionForCustomer(supa, customerId, fullyRefunded).catch(() => {})
    } else if (event.type === "customer.subscription.updated") {
      const sub = event.data.object as Stripe.Subscription
      const userId = sub.metadata?.userId
      if (userId) {
        const priceId = sub.items.data[0]?.price?.id
        const plan = planForPrice(priceId)
        // active/trialing → grant; past_due → keep access but flag; anything
        // terminal (canceled/unpaid) → revoke.
        const status =
          sub.status === "trialing"
            ? "trialing"
            : sub.status === "active"
              ? "active"
            : sub.status === "past_due"
              ? "past_due"
              : "canceled"
        await writeEntitlement(supa, userId, {
          plan: status === "canceled" ? "free" : (plan ?? undefined),
          status,
          priceId,
          billingInterval: sub.items.data[0]?.price?.recurring?.interval === "year" ? "year" : "month",
          subscriptionId: sub.id,
          customerId: typeof sub.customer === "string" ? sub.customer : sub.customer?.id,
          eventType: event.type,
        })
      }
    } else if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object as Stripe.Subscription
      const userId = sub.metadata?.userId
      if (userId) {
        await writeEntitlement(supa, userId, {
          plan: "free",
          status: "canceled",
          subscriptionId: sub.id,
          customerId: typeof sub.customer === "string" ? sub.customer : sub.customer?.id,
          eventType: event.type,
        })
      }
    }
    res.status(200).json({ received: true })
  } catch (err) {
    console.error("stripe webhook:", err)
    // Release the idempotency claim BEFORE the retry: it was inserted before the
    // entitlement write, so leaving it in place would make every Stripe retry
    // look like a duplicate and permanently drop this paid customer's plan.
    await releaseEvent(supa, event.id)
    // 500 → Stripe retries with backoff (correct for a transient failure).
    res.status(500).json({ ok: false, reason: "entitlement_write_failed" })
  }
}

/* ── Cancel: app → Stripe ───────────────────────────────────────────── */

async function cancel(req: VercelRequest, res: VercelResponse): Promise<void> {
  const stripe = stripeClient()
  const supa = admin()
  if (!stripe || !supa) {
    res.status(200).json({ ok: false, reason: "not_configured" })
    return
  }
  const user = await authedUser(req, supa)
  if (!user) {
    res.status(401).json({ ok: false, reason: "auth_required" })
    return
  }
  const subId = user.app_metadata?.stripe_subscription_id as string | undefined
  if (!subId) {
    res.status(200).json({ ok: false, reason: "no_subscription" })
    return
  }
  try {
    // Keep access until period end; the subscription.updated/deleted webhook
    // flips the plan to free when it actually lapses.
    await stripe.subscriptions.update(subId, { cancel_at_period_end: true })
    // Carry the existing entitlement forward explicitly rather than trusting
    // GoTrue to merge a partial app_metadata write. If it ever replaced instead
    // of merging, this single field would take `plan` with it — dropping a paying
    // customer to free the moment they pressed Cancel — along with
    // stripe_subscription_id and stripe_customer_id, which the webhook and the
    // affiliate-commission reversal both need to find this user later.
    await supa.auth.admin.updateUserById(user.id, {
      app_metadata: { ...(user.app_metadata ?? {}), plan_status: "canceling" },
    })
    res.status(200).json({ ok: true })
  } catch {
    res.status(200).json({ ok: false, reason: "stripe_error" })
  }
}
