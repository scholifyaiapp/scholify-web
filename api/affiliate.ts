import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/*
 * Scholify affiliate API (Phase 1).
 *
 *   POST /api/affiliate?action=apply     (auth: Supabase JWT)
 *       Body: { name, email, university, country, socials, audienceSize,
 *               areaOfStudy, code }. Creates a PENDING affiliate; you approve
 *       it (status → active) in Supabase. Returns the final (unique) code.
 *
 *   POST /api/affiliate?action=resolve   (public)
 *       Body: { code }. If it maps to an ACTIVE affiliate, increments a click
 *       and returns { exists: true }. Used for click tracking on the landing.
 *
 * Commission recording + refund handling live in api/stripe.ts (the payment
 * events). Payouts (Stripe Connect transfers) are Phase 2. All writes here use
 * the service role; reads for the dashboard go through RLS from the client.
 */

function admin(): SupabaseClient | null {
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

async function body(req: VercelRequest): Promise<Record<string, unknown>> {
  try {
    const raw = await readRawBody(req)
    return raw ? (JSON.parse(raw) as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}

/** Sanitize a desired code to A–Z 0–9, 3–20 chars. */
function cleanCode(input: string): string {
  return String(input || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 20)
}

export const config = { api: { bodyParser: false } }

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, reason: "post_only" })
    return
  }
  const supa = admin()
  if (!supa) {
    res.status(200).json({ ok: false, reason: "not_configured" })
    return
  }
  const action = String(req.query.action || "").trim().toLowerCase()
  if (action === "apply") return apply(req, res, supa)
  if (action === "resolve") return resolve(req, res, supa)
  if (action === "list") return list(req, res, supa)
  if (action === "approve") return approve(req, res, supa)
  res.status(400).json({ ok: false, reason: "unknown_action" })
}

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "scholifyaiapp@gmail.com").toLowerCase()

/** Verify the caller is the Scholify admin (by verified JWT email). */
async function requireAdmin(req: VercelRequest, supa: SupabaseClient): Promise<boolean> {
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  if (!token) return false
  const { data } = await supa.auth.getUser(token)
  return (data?.user?.email || "").toLowerCase() === ADMIN_EMAIL
}

/** Admin: list affiliates (newest first) so pending applications can be reviewed. */
async function list(req: VercelRequest, res: VercelResponse, supa: SupabaseClient): Promise<void> {
  if (!(await requireAdmin(req, supa))) {
    res.status(403).json({ ok: false, reason: "forbidden" })
    return
  }
  const { data, error } = await supa
    .from("affiliates")
    .select("id, name, email, university, country, socials, audience_size, code, status, clicks, created_at")
    .order("created_at", { ascending: false })
    .limit(200)
  if (error) {
    res.status(200).json({ ok: false, reason: "read_failed" })
    return
  }
  res.status(200).json({ ok: true, affiliates: data ?? [] })
}

/** Admin: set an affiliate's status (active | rejected | pending). */
async function approve(req: VercelRequest, res: VercelResponse, supa: SupabaseClient): Promise<void> {
  if (!(await requireAdmin(req, supa))) {
    res.status(403).json({ ok: false, reason: "forbidden" })
    return
  }
  const b = await body(req)
  const id = String(b.id || "")
  const status = String(b.status || "").toLowerCase()
  if (!id || !["active", "rejected", "pending"].includes(status)) {
    res.status(400).json({ ok: false, reason: "bad_params" })
    return
  }
  const { error } = await supa.from("affiliates").update({ status }).eq("id", id)
  if (error) {
    res.status(200).json({ ok: false, reason: "update_failed" })
    return
  }
  res.status(200).json({ ok: true, id, status })
}

async function apply(req: VercelRequest, res: VercelResponse, supa: SupabaseClient): Promise<void> {
  // Auth is optional — if signed in we link the account so they get a dashboard.
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  let userId: string | null = null
  if (token) {
    const { data } = await supa.auth.getUser(token)
    userId = data?.user?.id ?? null
  }

  const b = await body(req)
  const name = String(b.name || "").trim().slice(0, 120)
  const email = String(b.email || "").trim().slice(0, 200)
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
    res.status(400).json({ ok: false, reason: "name_email_required" })
    return
  }
  let code = cleanCode((b.code as string) || name.replace(/\s+/g, ""))
  if (code.length < 3) code = `${code}${Math.floor(1000 + Math.random() * 9000)}`.slice(0, 20)

  // Ensure the code is unique — append a numeric suffix if taken.
  for (let i = 0; i < 6; i++) {
    const { data: taken } = await supa.from("affiliates").select("id").eq("code", code).maybeSingle()
    if (!taken) break
    code = `${cleanCode((b.code as string) || name).slice(0, 16)}${Math.floor(10 + Math.random() * 89)}`
  }

  const { error } = await supa.from("affiliates").insert({
    user_id: userId,
    name,
    email,
    university: String(b.university || "").slice(0, 160) || null,
    country: String(b.country || "").slice(0, 80) || null,
    socials: String(b.socials || "").slice(0, 300) || null,
    audience_size: String(b.audienceSize || "").slice(0, 60) || null,
    area_of_study: String(b.areaOfStudy || "").slice(0, 120) || null,
    code,
    commission_rate: 0.35,
    status: "pending",
  })
  if (error) {
    res.status(200).json({ ok: false, reason: "insert_failed", detail: error.message })
    return
  }
  // Email the founder about the new application (best-effort — never blocks).
  void notifyApplication({ name, email, code, b })
  res.status(200).json({ ok: true, code, status: "pending" })
}

/** Email the Scholify founder when a new partner application arrives (Resend). */
async function notifyApplication(app: {
  name: string
  email: string
  code: string
  b: Record<string, unknown>
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ADMIN_EMAIL || "founder@flowlifyai.com"
  const from = process.env.REMINDER_FROM || "Scholify Partners <onboarding@resend.dev>"
  if (!apiKey) return
  const row = (label: string, val: unknown) => {
    const v = String(val || "").trim()
    return v ? `<tr><td style="padding:4px 12px 4px 0;color:#8f8c85;font-size:13px;">${label}</td><td style="padding:4px 0;color:#14141A;font-size:13px;font-weight:600;">${v}</td></tr>` : ""
  }
  const html = `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;">
    <h2 style="color:#14141A;font-size:18px;margin:0 0 4px;">New partner application</h2>
    <p style="color:#8f8c85;font-size:13px;margin:0 0 16px;">Code <b style="color:#C80000;">${app.code}</b> · status pending · approve it in Settings → Partner applications.</p>
    <table style="border-collapse:collapse;">
      ${row("Name", app.name)}${row("Email", app.email)}${row("University", app.b.university)}${row("Country", app.b.country)}${row("Promotes on", app.b.socials)}${row("Audience", app.b.audienceSize)}${row("Area", app.b.areaOfStudy)}
    </table>
  </div>`
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, reply_to: app.email, subject: `New partner application — ${app.name} (${app.code})`, html }),
    })
  } catch {
    /* best-effort */
  }
}

async function resolve(req: VercelRequest, res: VercelResponse, supa: SupabaseClient): Promise<void> {
  const b = await body(req)
  const code = cleanCode(b.code as string)
  if (!code) {
    res.status(200).json({ ok: true, exists: false })
    return
  }
  const { data: aff } = await supa
    .from("affiliates")
    .select("id, clicks")
    .eq("code", code)
    .eq("status", "active")
    .maybeSingle()
  if (!aff) {
    res.status(200).json({ ok: true, exists: false })
    return
  }
  // Best-effort click increment (never blocks the response).
  void supa.from("affiliates").update({ clicks: (aff.clicks ?? 0) + 1 }).eq("id", aff.id)
  res.status(200).json({ ok: true, exists: true })
}
