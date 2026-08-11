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

/*
 * THE SENDER ADDRESS, WITH NO SILENT FALLBACK.
 *
 * Every sender in this codebase used to fall back to
 * "Charles at Scholify <onboarding@resend.dev>" when REMINDER_FROM was unset.
 * That is Resend's SANDBOX address: it delivers only to the Resend account
 * owner, so every customer receipt, welcome email and reminder went nowhere —
 * and returned success, because Resend accepts the request.
 *
 * It happened. REMINDER_FROM existed in Vercel with an EMPTY value, which is
 * falsy, so the fallback was live in production. The variable being present
 * made it look configured. api/social.ts even carried a written warning about
 * this exact failure; nothing surfaced it where anyone would look.
 *
 * A fallback that quietly discards mail is worse than no delivery at all,
 * because it removes the symptom that would have led someone to the cause.
 * Returning null makes the caller log a real reason instead.
 */
function senderAddress(): string | null {
  const from = process.env.REMINDER_FROM?.trim()
  if (from) return from
  console.error(
    "[email] REMINDER_FROM is not set. Refusing to send from Resend's sandbox address, " +
      "which only delivers to the account owner. Set REMINDER_FROM to an address on a domain verified in Resend.",
  )
  return null
}

/** Fire-and-forget delivery. Never throws: a failed email must not fail a webhook. */
export async function sendPurchaseEmail(to: string, facts: PurchaseEmailFacts): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || !to) return false
  const from = senderAddress()
  if (!from) return false
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

/* ── The receipt Stripe is not sending ──────────────────────────────
 *
 * Stripe's "Successful payments" email is a dashboard toggle with no API, and
 * it is off. So every charge — the first one and every renewal after it —
 * completed in silence. A customer who pays and receives nothing has no proof,
 * no amount, no date and nothing to forward to an employer who is reimbursing
 * them; the next thing many of them open is their bank app.
 *
 * This does not recreate an invoice. Stripe already generates a proper hosted
 * invoice and PDF for every subscription charge, so the email carries the
 * numbers and LINKS to the real document. Ours is the covering note; Stripe's
 * remains the record.
 */

export interface ReceiptFacts {
  firstName?: string | null
  /** e.g. "$9.99" — already formatted in the invoice's own currency. */
  amount: string
  /** Localised charge date. */
  paidOn: string
  planLabel: string
  /** Stripe's hosted invoice page, when the webhook gave us one. */
  invoiceUrl?: string | null
  /** Next renewal date, when known. */
  nextChargeOn?: string | null
}

export function buildReceiptEmail(facts: ReceiptFacts): { subject: string; html: string; text: string } {
  const name = (facts.firstName || "").trim()
  const hello = name ? `Thanks, ${escapeHtml(name)}.` : "Thank you."
  const amount = escapeHtml(facts.amount)
  const plan = escapeHtml(facts.planLabel)
  const paidOn = escapeHtml(facts.paidOn)

  const rows: string[] = [
    `<tr><td style="padding:6px 0;font-size:13px;color:#8F8C85;">Plan</td><td align="right" style="padding:6px 0;font-size:13px;color:#14141A;font-weight:700;">${plan}</td></tr>`,
    `<tr><td style="padding:6px 0;font-size:13px;color:#8F8C85;">Paid</td><td align="right" style="padding:6px 0;font-size:13px;color:#14141A;font-weight:700;">${paidOn}</td></tr>`,
    `<tr><td style="padding:6px 0;font-size:13px;color:#8F8C85;">Amount</td><td align="right" style="padding:6px 0;font-size:16px;color:#14141A;font-weight:800;">${amount}</td></tr>`,
  ]
  if (facts.nextChargeOn) {
    rows.push(
      `<tr><td style="padding:6px 0;font-size:13px;color:#8F8C85;">Next charge</td><td align="right" style="padding:6px 0;font-size:13px;color:#14141A;font-weight:700;">${escapeHtml(facts.nextChargeOn)}</td></tr>`,
    )
  }

  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#F7F3F1;font-family:Arial,Helvetica,sans-serif;color:#332B28;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F7F3F1;">
    <tr><td align="center" style="padding:28px 12px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#FFFFFF;border:1px solid #E8E0DC;border-radius:20px;overflow:hidden;">
        <tr><td style="height:5px;background:linear-gradient(90deg,#C80000 0%,#E50068 52%,#F4A405 100%);font-size:0;">&nbsp;</td></tr>
        <tr><td style="padding:26px 32px 0;">
          <img src="${SITE}/icon-192.png" width="52" height="52" alt="Scholify" style="display:block;width:52px;height:52px;border-radius:13px;">
        </td></tr>
        <tr><td style="padding:14px 32px 0;font-size:10px;font-weight:800;letter-spacing:1.8px;color:#8F8C85;text-transform:uppercase;">Receipt</td></tr>
        <tr><td style="padding:6px 32px 0;font-size:24px;line-height:30px;font-weight:800;letter-spacing:-0.6px;color:#14141A;">${hello}</td></tr>
        <tr><td style="padding:10px 32px 0;font-size:15px;line-height:24px;color:#5F5753;">Your payment went through. Here are the details for your records.</td></tr>
        <tr><td style="padding:18px 32px 0;">
          <table role="presentation" width="100%" style="border-collapse:collapse;background:#FAFAF7;border:1px solid #EEE7E3;border-radius:14px;">
            <tr><td style="padding:14px 18px;"><table role="presentation" width="100%" style="border-collapse:collapse;">${rows.join("")}</table></td></tr>
          </table>
        </td></tr>
        ${
          facts.invoiceUrl
            ? `<tr><td style="padding:18px 32px 0;"><a href="${escapeHtml(facts.invoiceUrl)}" style="display:inline-block;background:#C80000;color:#FFFFFF;text-decoration:none;font-size:14px;font-weight:800;line-height:20px;padding:13px 22px;border-radius:12px;">View or download the invoice &rarr;</a></td></tr>`
            : ""
        }
        <tr><td style="padding:20px 32px;font-size:13px;line-height:21px;color:#5F5753;">Manage your plan or payment method any time in <a href="${SITE}/settings" style="color:#C80000;">Settings</a>.</td></tr>
        <tr><td style="padding:18px 32px;background:#FAFAF7;border-top:1px solid #EEE7E3;font-size:12px;line-height:19px;color:#8F8C85;">Scholify · You are receiving this because you have an active Scholify subscription.</td></tr>
      </table>
    </td></tr>
  </table>
  </body></html>`

  const text = [
    hello,
    "",
    "Your payment went through. Here are the details for your records.",
    "",
    `Plan: ${facts.planLabel}`,
    `Paid: ${facts.paidOn}`,
    `Amount: ${facts.amount}`,
    ...(facts.nextChargeOn ? [`Next charge: ${facts.nextChargeOn}`] : []),
    ...(facts.invoiceUrl ? ["", `Invoice: ${facts.invoiceUrl}`] : []),
    "",
    `Manage your plan: ${SITE}/settings`,
  ].join("\n")

  return { subject: `Your Scholify receipt — ${facts.amount}`, html, text }
}

/** Fire-and-forget. Never throws: a failed receipt must not fail a webhook. */
export async function sendReceiptEmail(to: string, facts: ReceiptFacts): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || !to) return false
  const from = senderAddress()
  if (!from) return false
  const { subject, html, text } = buildReceiptEmail(facts)
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
