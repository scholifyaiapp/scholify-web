import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@supabase/supabase-js"
import crypto from "node:crypto"

/*
 * Paddle Billing fulfillment — single Vercel function, dispatched by
 * `?action=` (12-function Hobby limit):
 *
 *   POST /api/paddle?action=webhook
 *     Paddle notification destination. Verifies the Paddle-Signature
 *     HMAC over the raw body, then writes the entitlement to the
 *     user's Supabase auth metadata (`plan`, `paddle_subscription_id`,
 *     `paddle_customer_id`). The client passes the Supabase user id as
 *     checkout `custom_data.userId` (see src/lib/paddle.ts).
 *
 *   POST /api/paddle?action=cancel
 *     Authenticated (Supabase JWT in Authorization: Bearer). Schedules
 *     the user's subscription to cancel at the end of the billing
 *     period via the Paddle API.
 *
 * Required env: PADDLE_WEBHOOK_SECRET (webhook), PADDLE_API_KEY (cancel),
 * SUPABASE_SERVICE_ROLE_KEY + VITE_SUPABASE_URL (both). PADDLE_ENV=sandbox
 * switches the Paddle API host. Everything degrades gracefully with
 * `200 + { ok:false, reason }` when config is missing so the client can
 * show a friendly notice instead of erroring.
 */

// Signature verification needs the exact raw bytes Paddle signed.
export const config = { api: { bodyParser: false } }

const PADDLE_API_HOST =
  process.env.PADDLE_ENV === "sandbox" ? "https://sandbox-api.paddle.com" : "https://api.paddle.com"

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

/** Map a Paddle price id to the app's plan string. */
function planForPrice(priceId: string | undefined): string | null {
  if (!priceId) return null
  if (priceId === process.env.VITE_PADDLE_BEGINNER_MONTHLY) return "beginner"
  if (priceId === process.env.VITE_PADDLE_PRO_MONTHLY) return "pro"
  if (priceId === process.env.VITE_PADDLE_ANNUAL_PRO) return "annual_pro"
  return null
}

/**
 * Mirror the entitlement into the `subscriptions` table (migration 0015) —
 * the durable billing record behind app_metadata. app_metadata answers "what
 * plan does this user have?"; this answers "why, since when, and from which
 * Paddle event?" — the audit trail a chargeback or a support ticket needs.
 *
 * Best-effort by design: the entitlement write is what the student is waiting
 * on, so a missing table (0015 not applied) must never fail their checkout.
 */
async function recordSubscription(
  supa: NonNullable<ReturnType<typeof admin>>,
  userId: string,
  row: {
    plan?: string
    status: string
    price_id?: string
    paddle_subscription_id?: string
    paddle_customer_id?: string
    last_event_type: string
  },
): Promise<void> {
  try {
    await supa.from("subscriptions").upsert(
      {
        user_id: userId,
        ...row,
        last_event_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
  } catch {
    /* audit trail is best-effort — never block fulfilment on it */
  }
}

/** Verify `Paddle-Signature: ts=...;h1=...` over the raw body. */
function verifySignature(rawBody: string, header: string | undefined, secret: string): boolean {
  if (!header) return false
  const parts = Object.fromEntries(header.split(";").map((p) => p.split("=") as [string, string]))
  const ts = parts.ts
  const h1 = parts.h1
  if (!ts || !h1) return false
  const expected = crypto.createHmac("sha256", secret).update(`${ts}:${rawBody}`).digest("hex")
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(h1, "hex"))
  } catch {
    return false
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const action = String(req.query.action || "").trim().toLowerCase()
  if (req.method !== "POST") {
    res.status(405).json({ error: "POST only" })
    return
  }
  const rawBody = await readRawBody(req)

  if (action === "webhook") return webhook(req, res, rawBody)
  if (action === "cancel") return cancel(req, res, rawBody)
  res.status(400).json({ error: "Unknown action. Use ?action=webhook | cancel." })
}

/* ── Webhook: Paddle → entitlement ──────────────────────────────────── */

async function webhook(req: VercelRequest, res: VercelResponse, rawBody: string): Promise<void> {
  const secret = process.env.PADDLE_WEBHOOK_SECRET
  if (!secret) {
    // Not configured yet — acknowledge so Paddle doesn't retry-storm,
    // but flag it for the health check / logs.
    res.status(200).json({ ok: false, reason: "missing_webhook_secret" })
    return
  }
  if (!verifySignature(rawBody, req.headers["paddle-signature"] as string | undefined, secret)) {
    res.status(401).json({ ok: false, reason: "bad_signature" })
    return
  }

  let event: Record<string, any>
  try {
    event = JSON.parse(rawBody)
  } catch {
    res.status(400).json({ ok: false, reason: "bad_json" })
    return
  }

  const type: string = event.event_type || ""
  const data = event.data || {}
  const userId: string | undefined = data.custom_data?.userId
  const supa = admin()
  if (!supa) {
    res.status(200).json({ ok: false, reason: "missing_supabase_admin" })
    return
  }
  if (!userId) {
    // A checkout made outside the app (no custom_data) — nothing to map to.
    res.status(200).json({ ok: false, reason: "no_user_id" })
    return
  }

  try {
    if (
      type === "transaction.completed" ||
      type === "subscription.created" ||
      type === "subscription.activated" ||
      type === "subscription.updated"
    ) {
      const priceId: string | undefined =
        data.items?.[0]?.price?.id ?? data.details?.line_items?.[0]?.price_id
      const plan = planForPrice(priceId)
      const subscriptionId: string | undefined =
        type.startsWith("subscription.") ? data.id : data.subscription_id
      const status: string | undefined = data.status
      // subscription.updated with status "canceled" is the terminal event
      // when a scheduled cancellation lands.
      const canceled = type === "subscription.updated" && status === "canceled"
      // past_due keeps access during Paddle's dunning window but flags the UI;
      // the terminal subscription.canceled event is what revokes the plan.
      const pastDue = type === "subscription.updated" && status === "past_due"
      const meta: Record<string, unknown> = canceled
        ? { plan: "free", plan_status: "canceled" }
        : pastDue
          ? { plan_status: "past_due" }
          : {
              ...(plan ? { plan } : {}),
              plan_status: "active",
              ...(subscriptionId ? { paddle_subscription_id: subscriptionId } : {}),
              ...(data.customer_id ? { paddle_customer_id: data.customer_id } : {}),
            }
      // Entitlement MUST live in app_metadata: it is writable only by the
      // service role, so a user cannot self-grant Pro via auth.updateUser().
      await supa.auth.admin.updateUserById(userId, { app_metadata: meta })
      await recordSubscription(supa, userId, {
        ...(canceled ? { plan: "free" } : plan ? { plan } : {}),
        status: canceled ? "canceled" : pastDue ? "past_due" : "active",
        ...(priceId ? { price_id: priceId } : {}),
        ...(subscriptionId ? { paddle_subscription_id: subscriptionId } : {}),
        ...(data.customer_id ? { paddle_customer_id: String(data.customer_id) } : {}),
        last_event_type: type,
      })
      res.status(200).json({ ok: true, applied: type })
      return
    }

    if (type === "subscription.canceled") {
      await supa.auth.admin.updateUserById(userId, {
        app_metadata: { plan: "free", plan_status: "canceled" },
      })
      await recordSubscription(supa, userId, {
        plan: "free",
        status: "canceled",
        ...(data.id ? { paddle_subscription_id: String(data.id) } : {}),
        last_event_type: type,
      })
      res.status(200).json({ ok: true, applied: type })
      return
    }

    // Events we don't act on (invoices, adjustments, …) — acknowledge.
    res.status(200).json({ ok: true, ignored: type })
  } catch {
    // 500 makes Paddle retry with backoff — correct for transient failures.
    res.status(500).json({ ok: false, reason: "entitlement_write_failed" })
  }
}

/* ── Cancel: app → Paddle ───────────────────────────────────────────── */

async function cancel(req: VercelRequest, res: VercelResponse, _rawBody: string): Promise<void> {
  const supa = admin()
  const apiKey = process.env.PADDLE_API_KEY
  if (!supa || !apiKey) {
    res.status(200).json({ ok: false, reason: "not_configured" })
    return
  }

  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  if (!token) {
    res.status(401).json({ ok: false, reason: "no_token" })
    return
  }
  const { data: userData, error: userErr } = await supa.auth.getUser(token)
  const user = userData?.user
  if (userErr || !user) {
    res.status(401).json({ ok: false, reason: "bad_token" })
    return
  }

  const subscriptionId = user.app_metadata?.paddle_subscription_id as string | undefined
  if (!subscriptionId) {
    res.status(200).json({ ok: false, reason: "no_subscription" })
    return
  }

  try {
    const r = await fetch(`${PADDLE_API_HOST}/subscriptions/${subscriptionId}/cancel`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ effective_from: "next_billing_period" }),
    })
    if (!r.ok) {
      res.status(200).json({ ok: false, reason: "paddle_error", status: r.status })
      return
    }
    // Keep access until period end; the subscription.updated/canceled
    // webhook flips plan to "free" when it actually lapses.
    await supa.auth.admin.updateUserById(user.id, { app_metadata: { plan_status: "canceling" } })
    await recordSubscription(supa, user.id, {
      status: "canceling",
      paddle_subscription_id: subscriptionId,
      last_event_type: "app.cancel_requested",
    })
    res.status(200).json({ ok: true })
  } catch {
    res.status(200).json({ ok: false, reason: "paddle_unreachable" })
  }
}
