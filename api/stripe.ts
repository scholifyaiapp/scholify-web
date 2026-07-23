import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@supabase/supabase-js"
import Stripe from "stripe"

/*
 * Stripe Billing — single Vercel function dispatched by `?action=` (12-function
 * Hobby cap), the international/card rail for Flowlify LLC.
 *
 *   POST /api/stripe?action=checkout   (auth: Supabase JWT)
 *     body: { plan: "beginner" | "pro" | "annual_pro" }
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
 * Entitlement lives in app_metadata (service-role-only) exactly like the Paddle
 * path, so the AI meter, the client gates and the subscriptions table are all
 * shared. The 7-day trial is separate (app-level, granted on signup) — Stripe is
 * only the PAID conversion, so its subscriptions carry no Stripe-side trial.
 *
 * Env: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_BEGINNER,
 * STRIPE_PRICE_PRO, STRIPE_PRICE_ANNUAL, SUPABASE_SERVICE_ROLE_KEY +
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

/** The three plans → their configured Stripe price ids (server-only). */
export function priceForPlan(plan: string): string | undefined {
  if (plan === "beginner") return process.env.STRIPE_PRICE_BEGINNER
  if (plan === "pro") return process.env.STRIPE_PRICE_PRO
  if (plan === "annual_pro") return process.env.STRIPE_PRICE_ANNUAL
  return undefined
}

/** A Stripe price id → the app's plan string (the inverse, for webhooks). */
export function planForPrice(priceId: string | undefined): string | null {
  if (!priceId) return null
  if (priceId === process.env.STRIPE_PRICE_BEGINNER) return "beginner"
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
async function claimEvent(supa: NonNullable<ReturnType<typeof admin>>, eventId: string): Promise<boolean> {
  const { error } = await supa.from("stripe_events").insert({ event_id: eventId })
  if (!error) return true
  if ((error as { code?: string }).code === "23505") return false
  return true
}

/** Write the entitlement to app_metadata + the subscriptions audit table. */
async function writeEntitlement(
  supa: NonNullable<ReturnType<typeof admin>>,
  userId: string,
  fields: {
    plan?: string
    status: string
    priceId?: string
    subscriptionId?: string
    customerId?: string
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
      }
  // Entitlement is service-role-only app_metadata — a user cannot self-grant it.
  await supa.auth.admin.updateUserById(userId, { app_metadata: meta })

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
  } catch {
    /* audit trail is best-effort */
  }
}

/* ── Affiliate commissions (Phase 1: record only — payouts are Phase 2) ── */

const COMMISSION_HOLD_DAYS = 30

/**
 * Record a 35% (or the affiliate's own rate) commission for a completed
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

  // Use the affiliate's own rate (defaults to 35%); confirm they're still active.
  const { data: aff } = await supa
    .from("affiliates")
    .select("commission_rate, status")
    .eq("id", affiliateId)
    .maybeSingle()
  if (!aff || aff.status !== "active") return

  const rate = typeof aff.commission_rate === "number" ? aff.commission_rate : 0.35
  const commission = Math.round(saleAmount * rate)
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
  res.status(400).json({ error: "Unknown action. Use ?action=checkout | webhook | cancel." })
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
    "https://scholifyapp.com"

  // Affiliate attribution — resolve an active partner code to its id, so the
  // webhook can record a commission after payment (more reliable than UTM).
  const affCode = String(body.affiliateCode || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 20)
  let affMeta: Record<string, string> = {}
  if (affCode) {
    const { data: aff } = await supa
      .from("affiliates")
      .select("id, code")
      .eq("code", affCode)
      .eq("status", "active")
      .maybeSingle()
    if (aff) affMeta = { affiliate_id: aff.id, affiliate_code: aff.code }
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: user.email || undefined,
      client_reference_id: user.id,
      // Both the session AND the subscription carry the user id, so every
      // webhook (checkout + later renewals/cancellations) can map to the account.
      metadata: { userId: user.id, ...affMeta },
      subscription_data: { metadata: { userId: user.id, ...affMeta } },
      allow_promotion_codes: true,
      success_url: `${origin}/study?upgraded=true`,
      cancel_url: `${origin}/pricing`,
    })
    res.status(200).json({ ok: true, url: session.url })
  } catch (err) {
    console.error("stripe checkout:", err)
    res.status(200).json({ ok: false, reason: "checkout_failed" })
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
          status: "active",
          priceId,
          subscriptionId: sub.id,
          customerId: typeof sub.customer === "string" ? sub.customer : sub.customer?.id,
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
          sub.status === "active" || sub.status === "trialing"
            ? "active"
            : sub.status === "past_due"
              ? "past_due"
              : "canceled"
        await writeEntitlement(supa, userId, {
          plan: status === "canceled" ? "free" : (plan ?? undefined),
          status,
          priceId,
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
    await supa.auth.admin.updateUserById(user.id, { app_metadata: { plan_status: "canceling" } })
    res.status(200).json({ ok: true })
  } catch {
    res.status(200).json({ ok: false, reason: "stripe_error" })
  }
}
