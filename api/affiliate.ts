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

const ADMIN_EMAIL = "scholifyapp@gmail.com"

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
  const { data: affiliate } = await supa
    .from("affiliates")
    .select("name, email, code, status")
    .eq("id", id)
    .maybeSingle()
  if (!affiliate) {
    res.status(404).json({ ok: false, reason: "not_found" })
    return
  }
  const { error } = await supa.from("affiliates").update({ status }).eq("id", id)
  if (error) {
    res.status(200).json({ ok: false, reason: "update_failed" })
    return
  }
  if (affiliate.status !== status && (status === "active" || status === "rejected")) {
    await notifyApplicationDecision({ ...affiliate, status }).catch((error: unknown) => {
      console.error("partner decision email:", error)
    })
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
    commission_rate: 0.27,
    status: "pending",
  })
  if (error) {
    res.status(200).json({ ok: false, reason: "insert_failed", detail: error.message })
    return
  }
  // Await the best-effort sends so the serverless function is not frozen before
  // Resend receives the founder notification and applicant confirmation.
  await notifyApplication({ name, email, code, b }).catch((error: unknown) => {
    console.error("partner application email:", error)
  })
  res.status(200).json({ ok: true, code, status: "pending" })
}

const SITE_URL = "https://www.scholifyapp.com"

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function emailFrame(options: {
  eyebrow: string
  title: string
  intro: string
  content: string
  cta?: { label: string; href: string }
  charles?: boolean
}): string {
  const cta = options.cta
    ? `<tr><td style="padding:8px 32px 30px;">
        <a href="${escapeHtml(options.cta.href)}" style="display:inline-block;background:#C80000;color:#ffffff;text-decoration:none;font-size:14px;font-weight:800;line-height:20px;padding:13px 22px;border-radius:12px;">${escapeHtml(options.cta.label)}</a>
      </td></tr>`
    : ""
  const charles = options.charles
    ? `<img src="${SITE_URL}/charles/email-avatar.png" width="72" height="72" alt="Charles, Scholify race engineer" style="display:block;width:72px;height:72px;border-radius:18px;border:1px solid #E8E0DC;">`
    : `<img src="${SITE_URL}/icon-192.png" width="56" height="56" alt="Scholify" style="display:block;width:56px;height:56px;border-radius:14px;">`
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#F7F3F1;font-family:Arial,Helvetica,sans-serif;color:#332B28;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F7F3F1;">
    <tr><td align="center" style="padding:28px 12px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#FFFFFF;border:1px solid #E8E0DC;border-radius:20px;overflow:hidden;">
        <tr><td style="height:5px;background:linear-gradient(90deg,#C80000 0%,#E50068 52%,#F4A405 100%);font-size:0;">&nbsp;</td></tr>
        <tr><td style="padding:28px 32px 18px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
            <td>${charles}</td>
            <td align="right" style="font-size:23px;font-weight:800;letter-spacing:-0.6px;color:#14141A;">Scholify<span style="color:#C80000;">.</span><div style="font-size:9px;font-weight:700;letter-spacing:2px;color:#8F8C85;margin-top:4px;">LEARN DAILY · GROW STEADILY</div></td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:8px 32px 0;font-size:10px;font-weight:800;letter-spacing:1.8px;color:#C80000;text-transform:uppercase;">${escapeHtml(options.eyebrow)}</td></tr>
        <tr><td style="padding:8px 32px 0;font-size:28px;line-height:34px;font-weight:800;letter-spacing:-0.8px;color:#14141A;">${escapeHtml(options.title)}</td></tr>
        <tr><td style="padding:14px 32px 16px;font-size:15px;line-height:24px;color:#5F5753;">${options.intro}</td></tr>
        <tr><td style="padding:0 32px 20px;">${options.content}</td></tr>
        ${cta}
        <tr><td style="padding:20px 32px;background:#FAFAF7;border-top:1px solid #EEE7E3;font-size:12px;line-height:19px;color:#8F8C85;">
          Scholify Preferred Partner Program<br>
          <a href="mailto:${ADMIN_EMAIL}" style="color:#C80000;text-decoration:none;">${ADMIN_EMAIL}</a> · <a href="${SITE_URL}" style="color:#C80000;text-decoration:none;">scholifyapp.com</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

async function sendPartnerEmail(payload: {
  to: string
  subject: string
  html: string
  replyTo?: string
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.REMINDER_FROM || "Scholify Partners <onboarding@resend.dev>",
      to: payload.to,
      reply_to: payload.replyTo || ADMIN_EMAIL,
      subject: payload.subject,
      html: payload.html,
    }),
  })
  if (!response.ok) throw new Error(`Resend returned ${response.status}`)
}

/** Email the admin and applicant when a new partner application arrives. */
async function notifyApplication(app: {
  name: string
  email: string
  code: string
  b: Record<string, unknown>
}): Promise<void> {
  const row = (label: string, val: unknown) => {
    const v = String(val ?? "").trim()
    return v ? `<tr><td style="padding:7px 12px 7px 0;color:#8F8C85;font-size:12px;">${escapeHtml(label)}</td><td style="padding:7px 0;color:#14141A;font-size:13px;font-weight:700;">${escapeHtml(v)}</td></tr>` : ""
  }
  const adminHtml = emailFrame({
    eyebrow: "Race control · New application",
    title: `${app.name} wants to partner with Scholify`,
    intro: `A new Preferred Partner application is waiting for your review. The requested code is <strong style="color:#C80000;">${escapeHtml(app.code)}</strong>.`,
    content: `<table role="presentation" width="100%" style="border-collapse:collapse;background:#FAFAF7;border:1px solid #EEE7E3;border-radius:14px;">
      <tr><td style="padding:12px 16px;"><table role="presentation" width="100%" style="border-collapse:collapse;">
      ${row("Name", app.name)}${row("Email", app.email)}${row("University", app.b.university)}${row("Country", app.b.country)}${row("Promotes on", app.b.socials)}${row("Audience", app.b.audienceSize)}${row("Area", app.b.areaOfStudy)}
      </table></td></tr></table>`,
    cta: { label: "Review partner applications", href: `${SITE_URL}/settings` },
  })

  const first = escapeHtml(app.name.split(/\s+/)[0] || "there")
  const applicantHtml = emailFrame({
    eyebrow: "Application received · Pending review",
    title: `You’re on the starting grid, ${app.name.split(/\s+/)[0] || "there"}`,
    intro: `Thanks for applying to the <strong>Scholify Preferred Partner Program</strong>. Your application is safely with our founder and is now pending personal review.`,
    content: `<div style="background:#FFF8E7;border:1px solid #F4DDA2;border-radius:14px;padding:16px 18px;">
      <div style="font-size:11px;font-weight:800;letter-spacing:1.3px;color:#9A6500;text-transform:uppercase;">Your application status</div>
      <div style="font-size:18px;font-weight:800;color:#14141A;margin-top:6px;">Pending review</div>
      <div style="font-size:13px;line-height:20px;color:#5F5753;margin-top:7px;">Requested partner code: <strong style="color:#C80000;">${escapeHtml(app.code)}</strong></div>
    </div>
    <p style="font-size:14px;line-height:22px;color:#5F5753;margin:18px 0 0;">We’ll email you again as soon as a decision is made. Once approved, you’ll receive your referral link and can earn a flat <strong>27%</strong> on qualifying Scholify plan sales.</p>
    <p style="font-size:13px;line-height:20px;color:#8F8C85;margin:18px 0 0;">Good luck, ${first}.<br>— Makhmudov Nuriddin, Founder, Scholify</p>`,
    charles: true,
  })

  await Promise.all([
    sendPartnerEmail({ to: ADMIN_EMAIL, replyTo: app.email, subject: `New partner application — ${app.name} (${app.code})`, html: adminHtml }),
    sendPartnerEmail({ to: app.email, subject: "Your Scholify partner application is pending review", html: applicantHtml }),
  ])
}

/** Tell an applicant when the founder approves or rejects their application. */
async function notifyApplicationDecision(app: {
  name: string
  email: string
  code: string
  status: string
}): Promise<void> {
  const first = escapeHtml(app.name.split(/\s+/)[0] || "there")
  const approved = app.status === "active"
  const subject = approved
    ? "You’re approved — welcome to the Scholify Partner Program"
    : "An update on your Scholify partner application"
  const html = approved
    ? emailFrame({
        eyebrow: "Application approved · Welcome aboard",
        title: `You’re officially a Scholify Partner, ${app.name.split(/\s+/)[0] || "there"}`,
        intro: `Congratulations — your application has been approved. You’re now part of the Scholify Preferred Partner Program and can earn <strong>27%</strong> on qualifying plan sales.`,
        content: `<div style="background:#FAFAF7;border:1px solid #EEE7E3;border-radius:14px;padding:16px 18px;">
          <div style="font-size:11px;font-weight:800;letter-spacing:1.3px;color:#1E7D50;text-transform:uppercase;">Your partner link</div>
          <div style="font-size:15px;font-weight:800;margin-top:7px;"><a href="${SITE_URL}/?aff=${escapeHtml(app.code)}" style="color:#C80000;text-decoration:none;">scholifyapp.com/?aff=${escapeHtml(app.code)}</a></div>
          <div style="font-size:12px;color:#8F8C85;margin-top:6px;">Partner code: ${escapeHtml(app.code)}</div>
        </div>
        <p style="font-size:14px;line-height:22px;color:#5F5753;margin:18px 0 0;">Share your unique link with your audience. Sign in to Scholify and open your Partners dashboard to monitor clicks, sales and commissions.</p>
        <p style="font-size:13px;line-height:20px;color:#8F8C85;margin:18px 0 0;">Welcome to the team, ${first}.<br>— Makhmudov Nuriddin, Founder, Scholify</p>`,
        cta: { label: "Open your partner dashboard", href: `${SITE_URL}/partners` },
        charles: true,
      })
    : emailFrame({
        eyebrow: "Partner application · Decision",
        title: `An update on your application, ${app.name.split(/\s+/)[0] || "there"}`,
        intro: `Thank you for your interest in the Scholify Preferred Partner Program. After reviewing your application, we’re unable to approve it at this time.`,
        content: `<p style="font-size:14px;line-height:22px;color:#5F5753;margin:0;">If your audience or promotion plans change, you’re welcome to reply to this email and share more information with our team.</p>
        <p style="font-size:13px;line-height:20px;color:#8F8C85;margin:18px 0 0;">Thank you for believing in Scholify.<br>— Makhmudov Nuriddin, Founder, Scholify</p>`,
      })

  const sends = [sendPartnerEmail({ to: app.email, subject, html })]
  if (approved) {
    const adminHtml = emailFrame({
      eyebrow: "Race control · Partner activated",
      title: `${app.name} is now a Scholify Partner`,
      intro: `Congratulations — you approved a new Preferred Partner. Their referral code is active and Scholify can now attribute clicks, sales and commissions to their account.`,
      content: `<div style="background:#F1FBF6;border:1px solid #CBEBD9;border-radius:14px;padding:16px 18px;">
        <div style="font-size:11px;font-weight:800;letter-spacing:1.3px;color:#1E7D50;text-transform:uppercase;">New active partner</div>
        <div style="font-size:18px;font-weight:800;color:#14141A;margin-top:7px;">${escapeHtml(app.name)}</div>
        <div style="font-size:13px;line-height:20px;color:#5F5753;margin-top:6px;">${escapeHtml(app.email)} · Code <strong style="color:#C80000;">${escapeHtml(app.code)}</strong></div>
      </div>`,
      cta: { label: "View partner applications", href: `${SITE_URL}/settings` },
      charles: true,
    })
    sends.push(sendPartnerEmail({
      to: ADMIN_EMAIL,
      replyTo: app.email,
      subject: `New Scholify Partner activated — ${app.name} (${app.code})`,
      html: adminHtml,
    }))
  }
  await Promise.all(sends)
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
