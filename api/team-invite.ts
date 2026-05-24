import type { VercelRequest, VercelResponse } from "@vercel/node"

/*
 * POST /api/team-invite — send a team invite email batch via Resend.
 *
 * Body: { teamName, primaryColor?, logoUrl?, senderName, invites: [{email, joinUrl}] }
 *
 * Degrades gracefully like the other endpoints: when RESEND_API_KEY is
 * missing it returns 200 with `sent: 0, isFallback: true` so the UI
 * still surfaces the invite-link-copy fallback. Never throws.
 */

interface InviteRow {
  email: string
  joinUrl: string
}
interface Body {
  teamName?: string
  primaryColor?: string
  logoUrl?: string
  senderName?: string
  invites?: InviteRow[]
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." })
    return
  }

  let body: Body = {}
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
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddr,
          to: [email],
          subject: `${senderName} invited you to ${teamName} on Scholify`,
          html: buildHTML({ teamName, senderName, joinUrl, primaryColor, logoUrl }),
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

function sanitizeColor(v: unknown): string | null {
  if (typeof v !== "string") return null
  const t = v.trim()
  if (/^#[0-9a-fA-F]{3,8}$/.test(t)) return t
  return null
}

function buildHTML(opts: {
  teamName: string
  senderName: string
  joinUrl: string
  primaryColor: string
  logoUrl: string
}): string {
  const { teamName, senderName, joinUrl, primaryColor, logoUrl } = opts
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#050508;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#F0EEFF;">
  <div style="max-width:560px;margin:0 auto;padding:40px 32px;">
    ${
      logoUrl
        ? `<img src="${escapeAttr(logoUrl)}" alt="${escapeAttr(teamName)}" style="max-height:48px;margin-bottom:24px;display:block;"/>`
        : ""
    }
    <h1 style="font-size:22px;font-weight:800;margin:0 0 12px;color:${primaryColor};">
      You're invited to ${escapeHtml(teamName)}
    </h1>
    <p style="font-size:15px;line-height:1.6;color:rgba(240,238,255,0.75);margin:0 0 24px;">
      ${escapeHtml(senderName)} added you to <strong>${escapeHtml(teamName)}</strong> on Scholify — a workspace where your team builds learning habits together. Daily plans, streaks, and shared progress in one place.
    </p>
    <a href="${escapeAttr(joinUrl)}"
       style="display:inline-block;padding:14px 28px;border-radius:999px;background:${primaryColor};color:#fff;font-weight:700;text-decoration:none;font-size:15px;">
      Accept invite →
    </a>
    <p style="font-size:12px;color:rgba(240,238,255,0.45);margin:32px 0 0;line-height:1.5;">
      Or copy this link into your browser:<br>
      <span style="word-break:break-all;color:rgba(240,238,255,0.65);">${escapeHtml(joinUrl)}</span>
    </p>
    <p style="font-size:11px;color:rgba(240,238,255,0.35);margin:28px 0 0;">
      Powered by Scholify — scholifyapp.com
    </p>
  </div>
</body>
</html>`
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
