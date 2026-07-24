import type { VercelRequest, VercelResponse } from "@vercel/node"
import postgres from "postgres"

const RESEND_API = "https://api.resend.com"
const ADMIN_EMAIL = "scholifyapp@gmail.com"
const SITE_URL = "https://www.scholifyapp.com"

type Json = Record<string, unknown>

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
          <td align="right" style="font-size:23px;font-weight:800;color:#14141A;">Scholify<span style="color:#C80000;">.</span><div style="font-size:9px;letter-spacing:2px;color:#8F8C85;margin-top:4px;">LEARN DAILY · GROW STEADILY</div></td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:8px 32px 0;font-size:10px;font-weight:800;letter-spacing:1.7px;color:#C80000;text-transform:uppercase;">Launch waitlist · Position secured</td></tr>
      <tr><td style="padding:8px 32px 0;font-size:28px;line-height:35px;font-weight:800;color:#14141A;">You’re on the starting grid, ${safeName}.</td></tr>
      <tr><td style="padding:14px 32px 8px;font-size:15px;line-height:24px;color:#5F5753;">Thanks for joining the Scholify launch waitlist. We’re completing the final checks now so your first experience feels fast, focused and genuinely useful.</td></tr>
      <tr><td style="padding:14px 32px 24px;">
        <div style="background:#FAFAF7;border:1px solid #EEE7E3;border-radius:14px;padding:18px;">
          <div style="font-size:10px;font-weight:800;letter-spacing:1.4px;color:#C80000;text-transform:uppercase;">Official launch</div>
          <div style="font-size:22px;font-weight:800;color:#14141A;margin-top:6px;">10 August 2026</div>
          <div style="font-size:13px;line-height:20px;color:#6B6460;margin-top:6px;">We’ll email you when access opens. No unfinished dashboard. No broken first lap.</div>
        </div>
      </td></tr>
      <tr><td style="padding:0 32px 28px;"><a href="${SITE_URL}" style="display:inline-block;background:#C80000;color:#fff;text-decoration:none;font-size:14px;font-weight:800;padding:13px 22px;border-radius:12px;">See the Scholify preview</a></td></tr>
      <tr><td style="padding:20px 32px;background:#FAFAF7;border-top:1px solid #EEE7E3;font-size:12px;line-height:19px;color:#8F8C85;">Scholify · From F1 to ACCA member.<br><a href="mailto:${ADMIN_EMAIL}" style="color:#C80000;text-decoration:none;">${ADMIN_EMAIL}</a></td></tr>
    </table>
  </td></tr></table></body></html>`
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader("Cache-Control", "no-store")
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, reason: "post_only" })
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
      const sent = await resend("/emails", apiKey, {
        method: "POST",
        body: JSON.stringify({
          from: process.env.REMINDER_FROM || "Charles at Scholify <onboarding@resend.dev>",
          to: email,
          reply_to: ADMIN_EMAIL,
          subject: "You’re on the Scholify launch waitlist 🏁",
          html: confirmationEmail(name.split(/\s+/)[0] || "there"),
        }),
      })
      if (!sent.ok) throw new Error(`confirmation_${sent.status}`)
    }
    res.status(200).json({ ok: true, alreadyJoined: !isNew })
  } catch (error) {
    console.error("waitlist:", error)
    res.status(500).json({ ok: false, reason: "save_failed" })
  }
}
