import type { VercelRequest, VercelResponse } from "@vercel/node"
import postgres from "postgres"
import { createClient } from "@supabase/supabase-js"

const RESEND_API = "https://api.resend.com"
const ADMIN_EMAIL = "scholifyaiapp@gmail.com"
const SITE_URL = "https://www.scholifyapp.com"

type Json = Record<string, unknown>

async function listContacts(req: VercelRequest, res: VercelResponse): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  if (!supabaseUrl || !serviceKey || !token) {
    res.status(401).json({ ok: false, reason: "unauthorized" })
    return
  }

  const auth = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })
  const { data, error } = await auth.auth.getUser(token)
  if (error || data.user?.email?.toLowerCase() !== ADMIN_EMAIL) {
    res.status(403).json({ ok: false, reason: "forbidden" })
    return
  }

  const connection = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL
  if (!connection) {
    res.status(503).json({ ok: false, reason: "database_not_configured" })
    return
  }
  const sql = postgres(connection, { max: 1, prepare: false, connect_timeout: 10, idle_timeout: 5 })
  try {
    const contacts = await sql`
      select id, email, name, source, created_at
      from public.launch_waitlist
      order by created_at desc
      limit 500
    `
    const [{ total }] = await sql<{ total: number }[]>`
      select count(*)::int as total from public.launch_waitlist
    `
    res.status(200).json({ ok: true, contacts, total })
  } finally {
    await sql.end({ timeout: 5 })
  }
}

async function resend(path: string, apiKey: string, init?: RequestInit): Promise<Response> {
  return fetch(`${RESEND_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  })
}

async function saveContact(email: string, name: string): Promise<boolean> {
  const connection = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL
  if (!connection) throw new Error("database_not_configured")
  const sql = postgres(connection, { max: 1, prepare: false, connect_timeout: 10, idle_timeout: 5 })
  try {
    await sql`
      create table if not exists public.launch_waitlist (
        id uuid primary key default gen_random_uuid(),
        email text not null unique,
        name text not null,
        source text not null default 'website',
        created_at timestamptz not null default now()
      )
    `
    const rows = await sql<{ id: string }[]>`
      insert into public.launch_waitlist (email, name)
      values (${email}, ${name})
      on conflict (email) do nothing
      returning id
    `
    return rows.length > 0
  } finally {
    await sql.end({ timeout: 5 })
  }
}

function confirmationEmail(firstName: string): string {
  const safeName = firstName.replace(/[<>&"']/g, "")
  return `<!doctype html><html><body style="margin:0;background:#F7F3F1;font-family:Arial,Helvetica,sans-serif;color:#332B28;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F7F3F1;"><tr><td align="center" style="padding:28px 12px;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border:1px solid #E8E0DC;border-radius:20px;overflow:hidden;">
      <tr><td style="height:5px;background:linear-gradient(90deg,#C80000,#E50068,#F4A405);font-size:0;">&nbsp;</td></tr>
      <tr><td style="padding:28px 32px 16px;">
        <table role="presentation" width="100%"><tr>
          <td><img src="${SITE_URL}/charles/email-avatar.png" width="68" height="68" alt="Charles from Scholify" style="display:block;border-radius:17px;border:1px solid #E8E0DC;"></td>
          <td align="right" valign="middle"><img src="${SITE_URL}/icon-192.png" width="68" height="68" alt="Scholify" style="display:inline-block;width:68px;height:68px;border-radius:17px;"><div style="font-size:9px;font-weight:700;letter-spacing:1.8px;color:#8F8C85;margin-top:5px;">LEARN DAILY &middot; GROW STEADILY</div></td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:8px 32px 0;font-size:10px;font-weight:800;letter-spacing:1.7px;color:#C80000;text-transform:uppercase;">Launch waitlist · Position secured</td></tr>
      <tr><td style="padding:8px 32px 0;font-size:28px;line-height:35px;font-weight:800;color:#14141A;">You’re on the starting grid, ${safeName}.</td></tr>
      <tr><td style="padding:14px 32px 8px;font-size:15px;line-height:24px;color:#5F5753;">Your place is reserved. We’re giving every final detail the attention it deserves so that, from your first session, Scholify feels focused, polished and built around your ACCA journey.</td></tr>
      <tr><td style="padding:16px 32px 12px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#14141A;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:22px 22px 21px;">
              <div style="font-size:10px;font-weight:800;letter-spacing:1.6px;color:#FFB3B3;text-transform:uppercase;">Official launch</div>
              <div style="font-size:25px;line-height:32px;font-weight:800;color:#FFFFFF;margin-top:7px;">10 August 2026</div>
              <div style="width:42px;height:3px;background:#C80000;border-radius:99px;margin-top:14px;font-size:0;">&nbsp;</div>
              <div style="font-size:13px;line-height:21px;color:#D8D5D2;margin-top:13px;">We’ll send your access email as soon as the starting lights go out.</div>
            </td>
          </tr>
        </table>
      </td></tr>
      <tr><td style="padding:16px 32px 30px;">
        <div style="font-size:10px;font-weight:800;letter-spacing:1.5px;color:#8F8C85;text-transform:uppercase;margin-bottom:13px;">What happens next</div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td valign="top" width="28" style="padding:0 0 13px;"><div style="width:20px;height:20px;line-height:20px;text-align:center;border-radius:50%;background:#FCEBEC;color:#C80000;font-size:11px;font-weight:800;">1</div></td>
            <td valign="top" style="padding:1px 0 13px;font-size:13px;line-height:19px;color:#5F5753;"><strong style="color:#14141A;">Your place stays secured.</strong> There’s nothing else you need to do.</td>
          </tr>
          <tr>
            <td valign="top" width="28"><div style="width:20px;height:20px;line-height:20px;text-align:center;border-radius:50%;background:#FCEBEC;color:#C80000;font-size:11px;font-weight:800;">2</div></td>
            <td valign="top" style="padding-top:1px;font-size:13px;line-height:19px;color:#5F5753;"><strong style="color:#14141A;">Watch your inbox.</strong> Your launch invitation will arrive here when access opens.</td>
          </tr>
        </table>
      </td></tr>
      <tr><td style="padding:20px 32px;background:#FAFAF7;border-top:1px solid #EEE7E3;font-size:12px;line-height:19px;color:#8F8C85;">Scholify · From F1 to ACCA member.<br><a href="mailto:${ADMIN_EMAIL}" style="color:#C80000;text-decoration:none;">${ADMIN_EMAIL}</a></td></tr>
    </table>
  </td></tr></table></body></html>`
}

function adminWaitlistEmail(name: string, email: string): string {
  const safeName = name.replace(/[<>&"']/g, "")
  const safeEmail = email.replace(/[<>&"']/g, "")
  return `<!doctype html><html><body style="margin:0;background:#F7F3F1;font-family:Arial,Helvetica,sans-serif;color:#332B28;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:28px 12px;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border:1px solid #E8E0DC;border-radius:20px;overflow:hidden;">
      <tr><td style="height:5px;background:linear-gradient(90deg,#C80000,#E50068,#F4A405);font-size:0;">&nbsp;</td></tr>
      <tr><td style="padding:28px 32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>
          <td valign="middle"><img src="${SITE_URL}/charles/email-avatar.png" width="68" height="68" alt="Charles from Scholify" style="display:block;width:68px;height:68px;border-radius:17px;border:1px solid #E8E0DC;"></td>
          <td align="right" valign="middle"><img src="${SITE_URL}/icon-192.png" width="68" height="68" alt="Scholify" style="display:inline-block;width:68px;height:68px;border-radius:17px;"><div style="font-size:9px;font-weight:700;letter-spacing:1.8px;color:#8F8C85;margin-top:5px;">LEARN DAILY &middot; GROW STEADILY</div></td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:8px 32px 0;font-size:10px;font-weight:800;letter-spacing:1.7px;color:#C80000;text-transform:uppercase;">Race control · New waitlist signup</td></tr>
      <tr><td style="padding:9px 32px 0;font-size:28px;line-height:35px;font-weight:800;color:#14141A;">A new learner joined the grid.</td></tr>
      <tr><td style="padding:18px 32px 26px;">
        <div style="background:#FAFAF7;border:1px solid #EEE7E3;border-radius:14px;padding:18px;">
          <div style="font-size:17px;font-weight:800;color:#14141A;">${safeName}</div>
          <a href="mailto:${safeEmail}" style="display:inline-block;margin-top:6px;color:#C80000;text-decoration:none;font-size:14px;">${safeEmail}</a>
          <div style="margin-top:12px;font-size:12px;color:#8F8C85;">Source: Scholify launch waitlist</div>
        </div>
      </td></tr>
      <tr><td style="padding:0 32px 28px;"><a href="${SITE_URL}/admin" style="display:inline-block;background:#14141A;color:#fff;text-decoration:none;font-size:14px;font-weight:800;padding:13px 22px;border-radius:12px;">Open founder dashboard</a></td></tr>
      <tr><td style="padding:20px 32px;background:#FAFAF7;border-top:1px solid #EEE7E3;font-size:12px;color:#8F8C85;">Scholify race control · ${ADMIN_EMAIL}</td></tr>
    </table>
  </td></tr></table></body></html>`
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader("Cache-Control", "no-store")
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, reason: "post_only" })
    return
  }
  if (String(req.query.action || "") === "list") {
    try {
      await listContacts(req, res)
    } catch (error) {
      console.error("waitlist list:", error)
      res.status(500).json({ ok: false, reason: "list_failed" })
    }
    return
  }
  const body = (req.body || {}) as Json
  const name = String(body.name || "").trim().slice(0, 80)
  const email = String(body.email || "").trim().toLowerCase().slice(0, 200)
  const website = String(body.website || "")
  const startedAt = Number(body.startedAt || 0)
  const elapsed = Date.now() - startedAt
  if (website || !name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || elapsed < 1500 || elapsed > 3_600_000) {
    res.status(400).json({ ok: false, reason: "invalid" })
    return
  }
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    res.status(503).json({ ok: false, reason: "not_configured" })
    return
  }
  try {
    const isNew = await saveContact(email, name)
    if (isNew) {
      const from = process.env.REMINDER_FROM || "Charles at Scholify <onboarding@resend.dev>"
      const [confirmation, adminNotice] = await Promise.all([
        resend("/emails", apiKey, {
          method: "POST",
          body: JSON.stringify({
            from,
            to: email,
            reply_to: ADMIN_EMAIL,
            subject: "You’re on the Scholify launch waitlist 🏁",
            html: confirmationEmail(name.split(/\s+/)[0] || "there"),
          }),
        }),
        resend("/emails", apiKey, {
          method: "POST",
          body: JSON.stringify({
            from,
            to: ADMIN_EMAIL,
            reply_to: email,
            subject: `New waitlist signup — ${name}`,
            html: adminWaitlistEmail(name, email),
          }),
        }),
      ])
      if (!confirmation.ok) throw new Error(`confirmation_${confirmation.status}`)
      if (!adminNotice.ok) throw new Error(`admin_notice_${adminNotice.status}`)
    }
    res.status(200).json({ ok: true, alreadyJoined: !isNew })
  } catch (error) {
    console.error("waitlist:", error)
    res.status(500).json({ ok: false, reason: "save_failed" })
  }
}
