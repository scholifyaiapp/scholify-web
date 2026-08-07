import type { VercelRequest, VercelResponse } from "./vercel-types.js"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import postgres from "postgres"

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
 *   POST /api/affiliate?action=claim     (auth: Supabase JWT)
 *       Credits the signed-in user to one ACTIVE partner exactly once.
 *   POST /api/affiliate?action=dashboard (auth: Supabase JWT)
 *       Returns the partner's own row, commissions and exact invited-user count.
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

let schemaReady: Promise<void> | null = null
function ensureAffiliateSchema(): Promise<void> {
  if (schemaReady) return schemaReady
  const connection = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL
  if (!connection) return Promise.resolve()
  schemaReady = (async () => {
    const sql = postgres(connection, { max: 1, prepare: false, connect_timeout: 10, idle_timeout: 5 })
    try {
      await sql`
        create table if not exists public.affiliate_referrals (
          id uuid primary key default gen_random_uuid(),
          affiliate_id uuid not null references public.affiliates (id) on delete cascade,
          referred_user_id uuid not null references auth.users (id) on delete cascade,
          created_at timestamptz not null default now(),
          unique (referred_user_id)
        )
      `
      await sql`create index if not exists affiliate_referrals_affiliate_idx on public.affiliate_referrals (affiliate_id)`
      await sql`alter table public.affiliate_referrals enable row level security`
      await sql`drop policy if exists affiliate_referrals_partner_read on public.affiliate_referrals`
      await sql`
        create policy affiliate_referrals_partner_read on public.affiliate_referrals
        for select using (
          affiliate_id in (select id from public.affiliates where user_id = auth.uid())
        )
      `
      await sql`create unique index if not exists affiliates_email_unique_idx on public.affiliates (lower(email))`
      await sql`alter table public.affiliate_commissions add column if not exists paid_at timestamptz`
      await sql`
        create table if not exists public.product_feedback (
          id uuid primary key default gen_random_uuid(),
          user_id uuid references auth.users (id) on delete set null,
          name text,
          email text not null,
          category text not null default 'general',
          rating smallint,
          message text not null,
          source text not null default 'web',
          page_url text,
          status text not null default 'new',
          created_at timestamptz not null default now(),
          constraint product_feedback_rating_check check (rating is null or rating between 1 and 5),
          constraint product_feedback_category_check check (category in ('general','idea','bug','content','love')),
          constraint product_feedback_status_check check (status in ('new','reviewed','planned','completed','archived'))
        )
      `
      await sql`create index if not exists product_feedback_created_idx on public.product_feedback (created_at desc)`
      await sql`create index if not exists product_feedback_status_idx on public.product_feedback (status)`
      await sql`alter table public.product_feedback enable row level security`
    } finally {
      await sql.end({ timeout: 5 })
    }
  })().catch((error) => {
    schemaReady = null
    throw error
  })
  return schemaReady
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

/**
 * Escape LIKE/ILIKE metacharacters so an email is matched LITERALLY.
 *
 * `_` is a legitimate email character (john_smith@…) and a LIKE wildcard
 * meaning "any single character", and `%` means "any run of characters" — so
 * passing a raw address to .ilike() makes it match OTHER people's rows. That is
 * a real disclosure, not a theoretical one: /apply returns the matched row's
 * referral `code`, so an unauthenticated caller could probe with a wildcard
 * address (the email regex there happily accepts `%@gmail.com`) and read back a
 * partner's code; /dashboard used the same match to attach an unlinked
 * application to the caller's account.
 *
 * PostgREST also reads `*` as `%` in like/ilike values, so that is escaped too.
 * Callers must STILL verify the returned address with emailsMatch() — this
 * narrows the query, and that check is what actually authorises the match.
 */
export function likeLiteral(value: string): string {
  return String(value || "").replace(/[\\%_*]/g, (ch) => `\\${ch}`)
}

/** Case-insensitive exact address comparison — never a pattern match. */
export function emailsMatch(a: unknown, b: unknown): boolean {
  const left = String(a ?? "").trim().toLowerCase()
  return left.length > 0 && left === String(b ?? "").trim().toLowerCase()
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
  // Account deletion must not depend on affiliate tables being available.
  if (action === "delete-account") return deleteAccount(req, res, supa)
  try {
    await ensureAffiliateSchema()
  } catch (error) {
    console.error("affiliate schema:", error)
    res.status(503).json({ ok: false, reason: "database_schema_unavailable" })
    return
  }
  if (action === "apply") return apply(req, res, supa)
  if (action === "resolve") return resolve(req, res, supa)
  if (action === "claim") return claim(req, res, supa)
  if (action === "dashboard") return dashboard(req, res, supa)
  if (action === "list") return list(req, res, supa)
  if (action === "approve") return approve(req, res, supa)
  if (action === "mark-due-paid") return markDuePaid(req, res, supa)
  if (action === "feedback-submit") return submitFeedback(req, res, supa)
  if (action === "feedback-status") return updateFeedbackStatus(req, res, supa)
  res.status(400).json({ ok: false, reason: "unknown_action" })
}

const ADMIN_EMAIL = "scholifyaiapp@gmail.com"

/** Permanently delete only the caller's own authenticated account. */
async function deleteAccount(req: VercelRequest, res: VercelResponse, supa: SupabaseClient): Promise<void> {
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  if (!token) {
    res.status(401).json({ ok: false, reason: "auth_required" })
    return
  }
  const { data, error } = await supa.auth.getUser(token)
  const user = data?.user
  if (error || !user) {
    res.status(401).json({ ok: false, reason: "invalid_session" })
    return
  }

  await supa.storage
    .from("avatars")
    .remove([`${user.id}/avatar.webp`, `${user.id}/avatar.jpg`])
    .catch(() => undefined)

  const { error: deleteError } = await supa.auth.admin.deleteUser(user.id)
  if (deleteError) {
    console.error("account deletion:", deleteError.message)
    res.status(500).json({ ok: false, reason: "delete_failed" })
    return
  }
  res.setHeader("Cache-Control", "no-store")
  res.status(200).json({ ok: true })
}

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

/** Founder records a completed manual payout. Only commissions whose 30-day
 * hold has actually expired are eligible. */
async function markDuePaid(req: VercelRequest, res: VercelResponse, supa: SupabaseClient): Promise<void> {
  if (!(await requireAdmin(req, supa))) {
    res.status(403).json({ ok: false, reason: "forbidden" })
    return
  }
  const b = await body(req)
  const id = String(b.id || "")
  const reference = String(b.reference || "").trim().slice(0, 160)
  if (!id || reference.length < 3) {
    res.status(400).json({ ok: false, reason: "bad_params" })
    return
  }
  let { data, error } = await supa
    .from("affiliate_commissions")
    .update({ status: "paid", paid_at: new Date().toISOString(), payout_reference: reference })
    .eq("affiliate_id", id)
    .eq("status", "pending")
    .lte("available_after", new Date().toISOString())
    .select("id, commission_amount")
  // Backward-compatible during rollout if the additive migration has not reached
  // production yet. The founder confirmation still prevents accidental marking.
  if (error && /payout_reference/i.test(String(error.message || ""))) {
    const fallback = await supa
      .from("affiliate_commissions")
      .update({ status: "paid", paid_at: new Date().toISOString() })
      .eq("affiliate_id", id)
      .eq("status", "pending")
      .lte("available_after", new Date().toISOString())
      .select("id, commission_amount")
    data = fallback.data
    error = fallback.error
  }
  if (error) {
    res.status(200).json({ ok: false, reason: "update_failed" })
    return
  }
  res.status(200).json({
    ok: true,
    paidCount: data?.length ?? 0,
    paidAmount: (data ?? []).reduce((sum, row) => sum + Number(row.commission_amount || 0), 0),
  })
}

const FEEDBACK_CATEGORIES = new Set(["general", "idea", "bug", "content", "love"])

async function submitFeedback(req: VercelRequest, res: VercelResponse, supa: SupabaseClient): Promise<void> {
  const b = await body(req)
  if (String(b.website || "")) {
    res.status(200).json({ ok: true })
    return
  }
  const user = await authenticatedUser(req, supa)
  const email = String(user?.email || b.email || "").trim().toLowerCase().slice(0, 200)
  const name = String(b.name || user?.user_metadata?.full_name || "").trim().slice(0, 120)
  const message = String(b.message || "").trim().slice(0, 4000)
  const category = FEEDBACK_CATEGORIES.has(String(b.category)) ? String(b.category) : "general"
  const ratingValue = Number(b.rating)
  const rating = Number.isInteger(ratingValue) && ratingValue >= 1 && ratingValue <= 5 ? ratingValue : null
  const source = ["landing", "app", "support"].includes(String(b.source)) ? String(b.source) : "landing"
  if (!/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
    res.status(400).json({ ok: false, reason: "invalid_feedback" })
    return
  }
  const { count } = await supa
    .from("product_feedback")
    .select("id", { count: "exact", head: true })
    .eq("email", email)
    .gte("created_at", new Date(Date.now() - 3_600_000).toISOString())
  if ((count ?? 0) >= 3) {
    res.status(429).json({ ok: false, reason: "rate_limited" })
    return
  }
  const { data: saved, error } = await supa.from("product_feedback").insert({
    user_id: user?.id ?? null,
    name: name || null,
    email,
    category,
    rating,
    message,
    source,
    page_url: String(b.pageUrl || "").slice(0, 500) || null,
  }).select("id").single()
  if (error) {
    res.status(200).json({ ok: false, reason: "save_failed" })
    return
  }
  const stars = rating ? `${"★".repeat(rating)}${"☆".repeat(5 - rating)}` : "Not rated"
  const adminHtml = emailFrame({
    eyebrow: "Product feedback · New",
    title: "New Scholify feedback",
    intro: `${escapeHtml(name || "A learner")} shared feedback from <strong>${escapeHtml(source)}</strong>.`,
    content: `<div style="padding:16px;border-radius:14px;background:#FAFAF7;border:1px solid #EEE7E3;">
      <div style="font-size:12px;color:#8F8C85;">${escapeHtml(category)} · ${escapeHtml(stars)} · ${escapeHtml(email)}</div>
      <div style="margin-top:12px;font-size:15px;line-height:23px;white-space:pre-wrap;">${escapeHtml(message)}</div>
    </div>`,
    cta: { label: "Open feedback inbox", href: `${SITE_URL}/admin` },
  })
  const userHtml = emailFrame({
    eyebrow: "Feedback received · Thank you",
    title: "Scholify loves you.",
    intro: `Thanks for your feedback${name ? `, ${escapeHtml(name.split(/\s+/)[0])}` : ""}. We read every message and use it to decide what Scholify should improve next.`,
    content: `<div style="padding:16px;border-radius:14px;background:#FFF7F7;border:1px solid #F1D5D5;color:#5F5753;font-size:14px;line-height:22px;">Your feedback is safely in our product inbox. If we need more detail, we’ll reply to this email.</div>`,
  })
  const notificationResults = await Promise.allSettled([
    sendPartnerEmail({ to: ADMIN_EMAIL, replyTo: email, subject: `New Scholify feedback · ${category}`, html: adminHtml }),
    sendPartnerEmail({ to: email, subject: "Thanks for your feedback — Scholify loves you", html: userHtml }),
  ])
  const notifications = {
    admin: notificationResults[0]?.status === "fulfilled",
    submitter: notificationResults[1]?.status === "fulfilled",
  }
  if (!notifications.admin || !notifications.submitter) {
    console.error("feedback email delivery:", { feedbackId: saved.id, ...notifications })
  }
  res.status(200).json({ ok: true, id: saved.id, notifications })
}

async function updateFeedbackStatus(req: VercelRequest, res: VercelResponse, supa: SupabaseClient): Promise<void> {
  if (!(await requireAdmin(req, supa))) {
    res.status(403).json({ ok: false, reason: "forbidden" })
    return
  }
  const b = await body(req)
  const id = String(b.id || "")
  const status = String(b.status || "")
  if (!id || !["new", "reviewed", "planned", "completed", "archived"].includes(status)) {
    res.status(400).json({ ok: false, reason: "bad_params" })
    return
  }
  const { error } = await supa.from("product_feedback").update({ status }).eq("id", id)
  res.status(200).json(error ? { ok: false, reason: "update_failed" } : { ok: true })
}


async function authenticatedUser(req: VercelRequest, supa: SupabaseClient) {
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  if (!token) return null
  const { data, error } = await supa.auth.getUser(token)
  return error ? null : data.user
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
  // Literal match only, then re-verify the address in code before echoing the
  // row back — `code` is a partner secret and must never be returned for a row
  // that merely pattern-matched the supplied address.
  const { data: existing } = await supa
    .from("affiliates")
    .select("code, status, email")
    .ilike("email", likeLiteral(email))
    .maybeSingle()
  if (existing && emailsMatch(existing.email, email)) {
    res.status(200).json({ ok: false, reason: "already_applied", code: existing.code, status: existing.status })
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
    // Log the Postgres detail, don't return it. /apply is unauthenticated, and a
    // raw error message names tables, columns and index names (migration 0023
    // added affiliates_email_unique_idx, so a duplicate application echoed that
    // index straight back to the caller). 23505 there means the pre-check above
    // lost a race with a concurrent application for the same address, so report
    // it as the already-applied case the applicant can actually act on.
    console.error("partner application insert:", error.code, error.message)
    const duplicate = error.code === "23505"
    res.status(200).json({ ok: false, reason: duplicate ? "already_applied" : "insert_failed" })
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
  const brandHeader = `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
    <td valign="middle"><img src="${SITE_URL}/charles/email-avatar.png" width="72" height="72" alt="Charles, Scholify race engineer" style="display:block;width:72px;height:72px;border-radius:18px;border:1px solid #E8E0DC;"></td>
    <td align="right" valign="middle"><img src="${SITE_URL}/icon-192.png" width="68" height="68" alt="Scholify" style="display:inline-block;width:68px;height:68px;border-radius:17px;"><div style="font-size:9px;font-weight:700;letter-spacing:1.8px;color:#8F8C85;margin-top:5px;">LEARN DAILY &middot; GROW STEADILY</div></td>
  </tr></table>`
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#F7F3F1;font-family:Arial,Helvetica,sans-serif;color:#332B28;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F7F3F1;">
    <tr><td align="center" style="padding:28px 12px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#FFFFFF;border:1px solid #E8E0DC;border-radius:20px;overflow:hidden;">
        <tr><td style="height:5px;background:linear-gradient(90deg,#C80000 0%,#E50068 52%,#F4A405 100%);font-size:0;">&nbsp;</td></tr>
        <tr><td style="padding:28px 32px 18px;">
          ${brandHeader}
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

export async function sendPartnerEmail(payload: {
  to: string
  subject: string
  html: string
  replyTo?: string
}): Promise<string> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured")
  const from = process.env.FEEDBACK_FROM || process.env.REMINDER_FROM
  if (!from) throw new Error("FEEDBACK_FROM or REMINDER_FROM is not configured")

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: payload.to,
        reply_to: payload.replyTo || ADMIN_EMAIL,
        subject: payload.subject,
        html: payload.html,
      }),
    })
    const result = await response.json().catch(() => ({})) as { id?: string; message?: string; name?: string }
    if (response.ok && result.id) return result.id
    const retryable = response.status === 429 || response.status >= 500
    if (!retryable || attempt === 3) {
      throw new Error(`Resend ${response.status}: ${String(result.message || result.name || "delivery rejected").slice(0, 180)}`)
    }
  }
  throw new Error("Resend delivery failed")
}

async function sendAllPartnerEmails(messages: Promise<unknown>[]): Promise<void> {
  const results = await Promise.allSettled(messages)
  const failures = results.filter((result) => result.status === "rejected")
  if (failures.length > 0) throw new Error(`${failures.length} partner email send(s) failed`)
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
    cta: { label: "Review partner applications", href: `${SITE_URL}/admin` },
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

  await sendAllPartnerEmails([
    sendPartnerEmail({ to: ADMIN_EMAIL, replyTo: app.email, subject: `New partner application — ${app.name} (${app.code})`, html: adminHtml }),
    sendPartnerEmail({ to: app.email, subject: "Your Scholify partner application is pending review", html: applicantHtml }),
  ])
}

/** Attribute one registered user to one active partner. The database UNIQUE
 * constraint on referred_user_id is the final authority under concurrent calls. */
async function claim(req: VercelRequest, res: VercelResponse, supa: SupabaseClient): Promise<void> {
  const user = await authenticatedUser(req, supa)
  if (!user) {
    res.status(401).json({ ok: false, reason: "auth_required" })
    return
  }
  const b = await body(req)
  const code = cleanCode(b.code as string)
  const { data: affiliate } = await supa
    .from("affiliates")
    .select("id, user_id")
    .eq("code", code)
    .eq("status", "active")
    .maybeSingle()
  if (!affiliate) {
    res.status(200).json({ ok: false, reason: "invalid_partner" })
    return
  }
  if (affiliate.user_id === user.id) {
    res.status(200).json({ ok: false, reason: "self_referral" })
    return
  }
  const { error } = await supa.from("affiliate_referrals").insert({
    affiliate_id: affiliate.id,
    referred_user_id: user.id,
  })
  if (error && error.code !== "23505") {
    res.status(200).json({ ok: false, reason: "claim_failed" })
    return
  }
  res.status(200).json({ ok: true, credited: !error })
}

async function dashboard(req: VercelRequest, res: VercelResponse, supa: SupabaseClient): Promise<void> {
  const user = await authenticatedUser(req, supa)
  if (!user) {
    res.status(401).json({ ok: false, reason: "auth_required" })
    return
  }

  let { data: affiliate } = await supa
    .from("affiliates")
    .select("id, name, code, status, clicks, commission_rate, stripe_account_id")
    .eq("user_id", user.id)
    .maybeSingle()

  // Applications are public. Once the applicant signs in with the same
  // verified email, safely attach their previously anonymous application.
  if (!affiliate && user.email) {
    const { data: anonymous } = await supa
      .from("affiliates")
      .select("id, email")
      .is("user_id", null)
      .ilike("email", likeLiteral(user.email))
      .maybeSingle()
    // Only adopt an application whose address really IS this verified account's.
    // A pattern match here would hand someone else's pending application — and
    // every commission later attributed to it — to whoever signed in.
    if (anonymous && emailsMatch(anonymous.email, user.email)) {
      await supa.from("affiliates").update({ user_id: user.id }).eq("id", anonymous.id).is("user_id", null)
      const linked = await supa
        .from("affiliates")
        .select("id, name, code, status, clicks, commission_rate, stripe_account_id")
        .eq("user_id", user.id)
        .maybeSingle()
      affiliate = linked.data
    }
  }

  if (!affiliate) {
    res.status(200).json({
      ok: true,
      affiliate: null,
      commissions: [],
      totals: { pending: 0, approved: 0, paid: 0, sales: 0, invitedUsers: 0, paidInvitedUsers: 0 },
    })
    return
  }

  const [{ data: commissions }, { count: invitedUsers }] = await Promise.all([
    supa
      .from("affiliate_commissions")
      .select("id, currency, sale_amount, commission_amount, status, available_after, created_at, stripe_customer_id")
      .eq("affiliate_id", affiliate.id)
      .order("created_at", { ascending: false }),
    supa
      .from("affiliate_referrals")
      .select("id", { count: "exact", head: true })
      .eq("affiliate_id", affiliate.id),
  ])
  const paidCustomers = new Set((commissions ?? []).filter((row) => row.status !== "canceled" && row.stripe_customer_id).map((row) => row.stripe_customer_id))
  const totals = { pending: 0, approved: 0, paid: 0, sales: 0, invitedUsers: invitedUsers ?? 0, paidInvitedUsers: paidCustomers.size }
  for (const commission of commissions ?? []) {
    if (commission.status !== "canceled") totals.sales += Number(commission.sale_amount || 0)
    if (commission.status === "pending") totals.pending += Number(commission.commission_amount || 0)
    else if (commission.status === "approved") totals.approved += Number(commission.commission_amount || 0)
    else if (commission.status === "paid") totals.paid += Number(commission.commission_amount || 0)
  }
  res.status(200).json({ ok: true, affiliate, commissions: commissions ?? [], totals })
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
      cta: { label: "View partner applications", href: `${SITE_URL}/admin` },
      charles: true,
    })
    sends.push(sendPartnerEmail({
      to: ADMIN_EMAIL,
      replyTo: app.email,
      subject: `New Scholify Partner activated — ${app.name} (${app.code})`,
      html: adminHtml,
    }))
  }
  await sendAllPartnerEmails(sends)
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
