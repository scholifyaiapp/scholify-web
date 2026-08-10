/*
 * The email nobody was sending.
 *
 * A learner pays, Stripe redirects them back, and until now that was the whole
 * conversation — no confirmation, no receipt, nothing in their inbox with the
 * word Scholify on it. The founder found this the only way it gets found: by
 * buying his own product and waiting for an email that never came.
 *
 * Two separate things are missing when that happens, and only one of them is
 * ours:
 *
 *   · the RECEIPT is Stripe's job — Dashboard → Settings → Emails →
 *     "Successful payments". It is a toggle, not code, and it is off.
 *   · the WELCOME is ours, and it is the more valuable of the two. It is the
 *     first thing a paying learner reads, it is the only moment they are
 *     guaranteed to be feeling good about the decision, and it is where the
 *     habit that decides whether they pass gets set.
 *
 * The copy therefore sells consistency, not features. Someone who has just
 * paid does not need to be told what they bought; they need to be told what to
 * do tomorrow, and the day after.
 */

const SITE = "https://www.scholifyapp.com"

export interface PurchaseEmailFacts {
  firstName?: string | null
  /** "Beginner" | "Pro" | "Annual Pro" — as the learner bought it. */
  planLabel: string
  /** e.g. "$9.99/month". Empty string when the price is unknown. */
  priceLabel: string
  /** True for a Pro subscription that started with its 3 free days. */
  onTrial: boolean
  /** Localised date of the first (or next) charge, if known. */
  chargeDate?: string | null
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c,
  )
}

/**
 * Subject + HTML + text for the post-purchase welcome. Kept as a pure builder
 * so the wording can be unit-tested without sending anything.
 */
export function buildPurchaseEmail(facts: PurchaseEmailFacts): { subject: string; html: string; text: string } {
  const name = (facts.firstName || "").trim()
  const hello = name ? `${escapeHtml(name)}, you're in.` : "You're in."
  const plan = escapeHtml(facts.planLabel)
  const price = escapeHtml(facts.priceLabel)

  const billingLine = facts.onTrial
    ? `Your 3 free days have started. ${facts.chargeDate ? `The first charge is on <b>${escapeHtml(facts.chargeDate)}</b>` : "You'll be charged when they end"}${price ? ` (${price})` : ""}.`
    : `You're on <b>${plan}</b>${price ? ` — ${price}` : ""}.${facts.chargeDate ? ` Your next charge is on <b>${escapeHtml(facts.chargeDate)}</b>.` : ""}`

  /*
   * The motivational line is deliberately about EFFORT OVER TIME rather than
   * talent or speed, because that is the thing this product can actually
   * deliver on and the thing ACCA rewards. No promises about passing — that
   * would be a claim we cannot make and they would remember it if it failed.
   */
  const body = [
    `You've just done the part most people put off. Now the only thing that matters is showing up tomorrow, and the day after that.`,
    `Nobody passes ACCA in a weekend. It goes to the person who did 25 focused minutes on the days they didn't feel like it — and Scholify exists to make sure those minutes land on the right topic, in the right order, every single day.`,
    `Your plan is built and waiting. Open it, do today's block, and start the streak.`,
  ]

  const avatar = `${SITE}/charles/email-avatar.png`
  const logo = `${SITE}/icon-192.png`

  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#F7F3F1;font-family:Arial,Helvetica,sans-serif;color:#332B28;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F7F3F1;">
    <tr><td align="center" style="padding:28px 12px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#FFFFFF;border:1px solid #E8E0DC;border-radius:20px;overflow:hidden;">
        <tr><td style="height:5px;background:linear-gradient(90deg,#C80000 0%,#E50068 52%,#F4A405 100%);font-size:0;">&nbsp;</td></tr>
        <tr><td style="padding:28px 32px 18px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
            <td valign="middle"><img src="${avatar}" width="72" height="72" alt="Charles, Scholify race engineer" style="display:block;width:72px;height:72px;border-radius:18px;border:1px solid #E8E0DC;"></td>
            <td align="right" valign="middle"><img src="${logo}" width="68" height="68" alt="Scholify" style="display:inline-block;width:68px;height:68px;border-radius:17px;"><div style="font-size:9px;font-weight:700;letter-spacing:1.8px;color:#8F8C85;margin-top:5px;">LEARN DAILY &middot; GROW STEADILY</div></td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:8px 32px 0;font-size:10px;font-weight:800;letter-spacing:1.8px;color:#C80000;text-transform:uppercase;">Charles &middot; Welcome aboard</td></tr>
        <tr><td style="padding:8px 32px 0;font-size:28px;line-height:34px;font-weight:800;letter-spacing:-0.8px;color:#14141A;">${hello}</td></tr>
        ${body.map((p) => `<tr><td style="padding:14px 32px 0;font-size:15px;line-height:24px;color:#5F5753;">${p}</td></tr>`).join("")}
        <tr><td style="padding:18px 32px 0;">
          <table role="presentation" width="100%" style="border-collapse:collapse;background:#FAFAF7;border:1px solid #EEE7E3;border-radius:14px;">
            <tr><td style="padding:14px 18px;font-size:13px;line-height:21px;color:#5F5753;">
              <b style="color:#14141A;">Your plan:</b> ${plan}<br>${billingLine}
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:20px 32px 30px;"><a href="${SITE}/study" style="display:inline-block;background:#C80000;color:#FFFFFF;text-decoration:none;font-size:14px;font-weight:800;line-height:20px;padding:13px 22px;border-radius:12px;">Start today's block &rarr;</a></td></tr>
        <tr><td style="padding:20px 32px;background:#FAFAF7;border-top:1px solid #EEE7E3;font-size:12px;line-height:19px;color:#8F8C85;">Charles &middot; Your Scholify race engineer<br>You are receiving this because you started a Scholify subscription.<br>Manage your plan in <a href="${SITE}/settings" style="color:#8F8C85;">Settings</a>.</td></tr>
      </table>
    </td></tr>
  </table>
  </body></html>`

  const text = [
    hello,
    "",
    ...body.map((p) => p.replace(/<[^>]+>/g, "")),
    "",
    `Your plan: ${facts.planLabel}`,
    billingLine.replace(/<[^>]+>/g, ""),
    "",
    `Start today's block: ${SITE}/study`,
    "",
    "— Charles · Your Scholify race engineer",
    `Manage your plan: ${SITE}/settings`,
  ].join("\n")

  return {
    subject: facts.onTrial ? "You're in — your 3 free days start now" : `You're in — ${facts.planLabel} is active`,
    html,
    text,
  }
}

/** Fire-and-forget delivery. Never throws: a failed email must not fail a webhook. */
export async function sendPurchaseEmail(to: string, facts: PurchaseEmailFacts): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || !to) return false
  const from = process.env.REMINDER_FROM || "Charles at Scholify <onboarding@resend.dev>"
  const { subject, html, text } = buildPurchaseEmail(facts)
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({ from, to, subject, html, text }),
    })
    return res.ok
  } catch {
    return false
  }
}
