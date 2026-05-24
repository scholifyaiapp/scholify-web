import type { VercelRequest, VercelResponse } from "@vercel/node"

/*
 * POST /api/partner-invite — send a partner invite email via Resend.
 *
 * Body: { email, inviteUrl, senderName, senderGoal? }
 *
 * Degrades gracefully like the other endpoints: when RESEND_API_KEY is
 * missing it returns 200 with `sent:false, isFallback:true` so the UI can
 * still complete the local invite and surface the copy-link option. The
 * frontend never blocks on this call.
 */

interface Body {
  email?: string
  inviteUrl?: string
  senderName?: string
  senderGoal?: string
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
<html>
<body style="margin:0;padding:0;background:#050508;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#F0EEFF;">
  <div style="max-width:560px;margin:0 auto;padding:48px 32px;">
    <h1 style="font-size:24px;font-weight:800;margin:0 0 12px;background:linear-gradient(135deg,#A78BFA 0%,#F472B6 50%,#22D3EE 100%);-webkit-background-clip:text;background-clip:text;color:transparent;">
      ${escapeHtml(senderName)} invited you to study together
    </h1>
    <p style="font-size:15px;line-height:1.6;color:rgba(240,238,255,0.75);margin:0 0 24px;">
      They're working on <strong>${escapeHtml(senderGoal || "a goal")}</strong> on Scholify and want you as their accountability partner. You'll see each other's progress and get notified when they finish their daily task.
    </p>
    <a href="${escapeAttr(inviteUrl)}"
       style="display:inline-block;padding:14px 28px;border-radius:999px;background:linear-gradient(135deg,#A78BFA,#F472B6,#22D3EE);color:#fff;font-weight:700;text-decoration:none;font-size:15px;">
      Accept invitation →
    </a>
    <p style="font-size:12px;color:rgba(240,238,255,0.45);margin:32px 0 0;line-height:1.5;">
      Or copy this link into your browser:<br>
      <span style="word-break:break-all;color:rgba(240,238,255,0.65);">${escapeHtml(inviteUrl)}</span>
    </p>
  </div>
</body>
</html>`

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
        subject,
        html,
      }),
    })
    if (!r.ok) {
      const detail = await r.text().catch(() => "")
      res.status(200).json({ sent: false, isFallback: true, reason: "resend_error", detail: detail.slice(0, 200) })
      return
    }
    res.status(200).json({ sent: true })
  } catch (err) {
    console.error("Partner invite error:", err)
    res.status(200).json({ sent: false, isFallback: true, reason: "network_error" })
  }
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
