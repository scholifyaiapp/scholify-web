import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@supabase/supabase-js"

/*
 * Combined social endpoint — single Vercel function that dispatches by
 * an `action` query/body field, so we stay under the 12-function limit
 * on the Hobby plan. Three sub-handlers:
 *
 *   POST /api/social?action=partner-invite
 *     body: { email, inviteUrl, senderName, senderGoal? }
 *
 *   POST /api/social?action=team-invite
 *     body: { teamName, primaryColor?, logoUrl?, senderName,
 *             invites: [{ email, joinUrl }] }
 *
 *   GET  /api/social?action=leaderboard&category=…&weekOffset=0&userId=…
 *
 * All three degrade gracefully with `200 + isFallback` when their
 * relevant env vars (RESEND_API_KEY / SUPABASE_SERVICE_ROLE_KEY) or
 * tables are missing.
 */

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const action = String((req.query.action || (req.body as Record<string, unknown> | undefined)?.action) || "")
    .trim()
    .toLowerCase()

  if (action === "partner-invite") return partnerInvite(req, res)
  if (action === "team-invite") return teamInvite(req, res)
  if (action === "leaderboard") return leaderboard(req, res)
  if (action === "health") return health(req, res)
  if (action === "security") return securityCheck(req, res)

  res.status(400).json({
    error:
      "Unknown action. Use ?action=partner-invite | team-invite | leaderboard | health | security.",
  })
}

/* ── Health check ────────────────────────────────────────────────────────
 * Reachable at /api/health via a vercel.json rewrite. Reports which env keys
 * are configured server-side — values are NEVER returned, only booleans.
 * 503 when a critical key is missing so uptime monitors can alert.
 */
function health(_req: VercelRequest, res: VercelResponse): void {
  res.setHeader("Cache-Control", "no-store")
  const keys = {
    anthropic: !!process.env.ANTHROPIC_API_KEY,
    supabase_url: !!(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL),
    supabase_anon: !!(process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY),
    supabase_service: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    openai: !!process.env.OPENAI_API_KEY,
    perplexity: !!process.env.PERPLEXITY_API_KEY,
    gemini: !!process.env.GEMINI_API_KEY,
    resend: !!process.env.RESEND_API_KEY,
    fal: !!process.env.FAL_KEY,
    vapid: !!process.env.VAPID_PRIVATE_KEY,
    paddle: !!process.env.VITE_PADDLE_TOKEN,
    paddle_webhook: !!process.env.PADDLE_WEBHOOK_SECRET,
    paddle_api: !!process.env.PADDLE_API_KEY,
  }
  const allCriticalPresent =
    keys.anthropic && keys.supabase_url && keys.supabase_anon && keys.supabase_service
  res.status(allCriticalPresent ? 200 : 503).json({
    status: allCriticalPresent ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    keys,
  })
}

/* ── Security check ──────────────────────────────────────────────────────
 * Reachable at /api/security-check via a vercel.json rewrite. Confirms the
 * secret keys live server-side. Booleans only — never the key values.
 */
function securityCheck(_req: VercelRequest, res: VercelResponse): void {
  res.setHeader("Cache-Control", "no-store")
  res.status(200).json({
    anthropic_configured: !!process.env.ANTHROPIC_API_KEY,
    supabase_configured: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  })
}

/* ── Partner invite ──────────────────────────────────────────────────── */

interface PartnerInviteBody {
  email?: string
  inviteUrl?: string
  senderName?: string
  senderGoal?: string
}

async function partnerInvite(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." })
    return
  }
  let body: PartnerInviteBody = {}
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {})
  } catch {
    res.status(400).json({ error: "Invalid JSON body." })
    return
  }

  const email = String(body.email || "").trim()
  const inviteUrl = String(body.inviteUrl || "").trim()
  const senderName = String(body.senderName || "Your study buddy").trim()
  const senderGoal = String(body.senderGoal || "").trim()

  if (!email || !inviteUrl) {
    res.status(400).json({ error: "Missing email or inviteUrl." })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  const fromAddr = process.env.RESEND_FROM_EMAIL || "Scholify <hello@scholifyapp.com>"

  if (!apiKey) {
    res.status(200).json({ sent: false, isFallback: true, reason: "missing_resend_key" })
    return
  }

  const subject = `${senderName} invited you to study together on Scholify`
  const html = `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#050508;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#F0EEFF;">
  <div style="max-width:560px;margin:0 auto;padding:48px 32px;">
    <h1 style="font-size:24px;font-weight:800;margin:0 0 12px;background:linear-gradient(135deg,#A78BFA 0%,#F472B6 50%,#22D3EE 100%);-webkit-background-clip:text;background-clip:text;color:transparent;">
      ${escapeHtml(senderName)} invited you to study together
    </h1>
    <p style="font-size:15px;line-height:1.6;color:rgba(240,238,255,0.75);margin:0 0 24px;">
      They're working on <strong>${escapeHtml(senderGoal || "a goal")}</strong> on Scholify and want you as their accountability partner. You'll see each other's progress and get notified when they finish their daily task.
    </p>
    <a href="${escapeAttr(inviteUrl)}" style="display:inline-block;padding:14px 28px;border-radius:999px;background:linear-gradient(135deg,#A78BFA,#F472B6,#22D3EE);color:#fff;font-weight:700;text-decoration:none;font-size:15px;">Accept invitation →</a>
    <p style="font-size:12px;color:rgba(240,238,255,0.45);margin:32px 0 0;line-height:1.5;">Or copy this link into your browser:<br><span style="word-break:break-all;color:rgba(240,238,255,0.65);">${escapeHtml(inviteUrl)}</span></p>
  </div>
</body></html>`

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: fromAddr, to: [email], subject, html }),
    })
    if (!r.ok) {
      const detail = await r.text().catch(() => "")
      res.status(200).json({ sent: false, isFallback: true, reason: "resend_error", detail: detail.slice(0, 200) })
      return
    }
    res.status(200).json({ sent: true })
  } catch (err) {
    console.error("partner-invite:", err)
    res.status(200).json({ sent: false, isFallback: true, reason: "network_error" })
  }
}

/* ── Team invite (bulk) ──────────────────────────────────────────────── */

interface TeamInviteRow {
  email: string
  joinUrl: string
}
interface TeamInviteBody {
  teamName?: string
  primaryColor?: string
  logoUrl?: string
  senderName?: string
  invites?: TeamInviteRow[]
}

async function teamInvite(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." })
    return
  }
  let body: TeamInviteBody = {}
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {})
  } catch {
    res.status(400).json({ error: "Invalid JSON body." })
    return
  }

  const teamName = String(body.teamName || "your team").trim()
  const senderName = String(body.senderName || "Your team admin").trim()
  const primaryColor = sanitizeColor(body.primaryColor) || "#5E5CE6"
  const logoUrl = String(body.logoUrl || "").trim().slice(0, 2000)
  const invites = Array.isArray(body.invites) ? body.invites.slice(0, 100) : []

  if (invites.length === 0) {
    res.status(400).json({ error: "No invites provided." })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  const fromAddr = process.env.RESEND_FROM_EMAIL || "Scholify Teams <hello@scholifyapp.com>"

  if (!apiKey) {
    res.status(200).json({ sent: 0, total: invites.length, isFallback: true, reason: "missing_resend_key" })
    return
  }

  let sent = 0
  const failures: { email: string; reason: string }[] = []

  for (const inv of invites) {
    const email = String(inv.email || "").trim()
    const joinUrl = String(inv.joinUrl || "").trim()
    if (!email || !joinUrl) {
      failures.push({ email, reason: "missing_field" })
      continue
    }
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromAddr,
          to: [email],
          subject: `${senderName} invited you to ${teamName} on Scholify`,
          html: teamInviteHTML({ teamName, senderName, joinUrl, primaryColor, logoUrl }),
        }),
      })
      if (!r.ok) {
        const detail = await r.text().catch(() => "")
        failures.push({ email, reason: detail.slice(0, 120) || `status_${r.status}` })
      } else {
        sent++
      }
    } catch (err) {
      failures.push({ email, reason: (err as Error).message?.slice(0, 120) || "network_error" })
    }
  }

  res.status(200).json({ sent, total: invites.length, failures })
}

function teamInviteHTML(opts: {
  teamName: string
  senderName: string
  joinUrl: string
  primaryColor: string
  logoUrl: string
}): string {
  const { teamName, senderName, joinUrl, primaryColor, logoUrl } = opts
  return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#050508;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#F0EEFF;">
  <div style="max-width:560px;margin:0 auto;padding:40px 32px;">
    ${logoUrl ? `<img src="${escapeAttr(logoUrl)}" alt="${escapeAttr(teamName)}" style="max-height:48px;margin-bottom:24px;display:block;"/>` : ""}
    <h1 style="font-size:22px;font-weight:800;margin:0 0 12px;color:${primaryColor};">
      You're invited to ${escapeHtml(teamName)}
    </h1>
    <p style="font-size:15px;line-height:1.6;color:rgba(240,238,255,0.75);margin:0 0 24px;">
      ${escapeHtml(senderName)} added you to <strong>${escapeHtml(teamName)}</strong> on Scholify — a workspace where your team builds learning habits together.
    </p>
    <a href="${escapeAttr(joinUrl)}" style="display:inline-block;padding:14px 28px;border-radius:999px;background:${primaryColor};color:#fff;font-weight:700;text-decoration:none;font-size:15px;">Accept invite →</a>
    <p style="font-size:12px;color:rgba(240,238,255,0.45);margin:32px 0 0;line-height:1.5;">Or copy this link into your browser:<br><span style="word-break:break-all;color:rgba(240,238,255,0.65);">${escapeHtml(joinUrl)}</span></p>
    <p style="font-size:11px;color:rgba(240,238,255,0.35);margin:28px 0 0;">Powered by Scholify — scholifyapp.com</p>
  </div>
</body></html>`
}

/* ── Leaderboard ─────────────────────────────────────────────────────── */

interface Top10Row {
  user_id: string
  display_name: string | null
  sessions: number
  streak: number
}

function isoWeekRange(weekOffset = 0): { start: Date; end: Date } {
  const now = new Date()
  const day = now.getUTCDay() || 7
  const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  monday.setUTCDate(monday.getUTCDate() - (day - 1) - weekOffset * 7)
  const end = new Date(monday)
  end.setUTCDate(end.getUTCDate() + 7)
  return { start: monday, end }
}

async function leaderboard(req: VercelRequest, res: VercelResponse): Promise<void> {
  const category = String(req.query.category || "all")
  const weekOffset = Math.max(0, Math.min(8, Number(req.query.weekOffset || 0)))
  const userId = req.query.userId ? String(req.query.userId) : null

  const { start, end } = isoWeekRange(weekOffset)
  const baseResponse = {
    top10: [] as Top10Row[],
    yourRank: null as { rank: number; sessions: number } | null,
    category,
    weekStart: start.toISOString(),
    weekEnd: end.toISOString(),
  }

  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY

  if (!url || !serviceKey) {
    res.status(200).json({ ...baseResponse, isFallback: true, reason: "missing_supabase_env" })
    return
  }

  const client = createClient(url, serviceKey, { auth: { persistSession: false } })

  try {
    const { data: optIns, error: optInErr } = await client
      .from("community_opt_in")
      .select("user_id, display_name, opted_in")
      .eq("opted_in", true)
    if (optInErr) throw optInErr
    if (!optIns || optIns.length === 0) {
      res.status(200).json(baseResponse)
      return
    }

    const optInIds = new Set(optIns.map((o) => o.user_id))
    const displayNames = new Map<string, string | null>(optIns.map((o) => [o.user_id, o.display_name]))

    let postsQ = client
      .from("community_posts")
      .select("user_id, streak_at_post, post_type, goal_category, created_at")
      .gte("created_at", start.toISOString())
      .lt("created_at", end.toISOString())
      .eq("post_type", "completion")
    if (category !== "all") postsQ = postsQ.eq("goal_category", category)
    const { data: posts, error: postsErr } = await postsQ
    if (postsErr) throw postsErr

    const buckets = new Map<string, { sessions: number; streak: number }>()
    for (const p of posts || []) {
      const uid = p.user_id as string
      if (!optInIds.has(uid)) continue
      const cur = buckets.get(uid) || { sessions: 0, streak: 0 }
      cur.sessions += 1
      if (typeof p.streak_at_post === "number" && p.streak_at_post > cur.streak) cur.streak = p.streak_at_post
      buckets.set(uid, cur)
    }

    const ranked = Array.from(buckets.entries())
      .map(([uid, agg]) => ({
        user_id: uid,
        display_name: displayNames.get(uid) ?? null,
        sessions: agg.sessions,
        streak: agg.streak,
      }))
      .sort((a, b) => b.sessions - a.sessions || b.streak - a.streak)

    const top10 = ranked.slice(0, 10)
    let yourRank = null as { rank: number; sessions: number } | null
    if (userId) {
      const idx = ranked.findIndex((r) => r.user_id === userId)
      if (idx !== -1) yourRank = { rank: idx + 1, sessions: ranked[idx].sessions }
    }
    res.status(200).json({ ...baseResponse, top10, yourRank })
  } catch (err) {
    console.error("leaderboard:", err)
    res.status(200).json({
      ...baseResponse,
      isFallback: true,
      reason: (err as Error).message?.slice(0, 200) || "query_failed",
    })
  }
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

function sanitizeColor(v: unknown): string | null {
  if (typeof v !== "string") return null
  const t = v.trim()
  if (/^#[0-9a-fA-F]{3,8}$/.test(t)) return t
  return null
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function escapeAttr(s: string): string {
  return escapeHtml(s).replace(/'/g, "&#39;")
}
