import { socialRowHtml } from "../src/lib/social-links.js"

/*
 * The Scholify email theme — one voice, one frame, every message.
 *
 * Before this module each sender carried its own copy of the 600px card, and
 * they had already drifted (three slightly different footers, two different
 * heading sizes). Every learner- and partner-facing email now renders through
 * renderBrandEmail(), so "make the emails premium" is a change made once.
 *
 * WHAT "PREMIUM" MEANS HERE, CONCRETELY:
 *   · Georgia for headlines — a serif reads as editorial and ships on every
 *     mail client ever made; no webfont roulette.
 *   · A preheader — the grey preview line next to the subject in the inbox.
 *     Most senders leave it to chance and the inbox shows "View in browser" or
 *     a random first sentence. Ours is written.
 *   · Real paragraphs. The premium register is specificity and calm, not
 *     brevity: each email says exactly what is prepared, what happens next and
 *     why, with no exclamation marks and no guilt.
 *   · One CTA. An email that asks for two things gets neither.
 *
 * EVERY string that originates from a user (names, topics, feedback) MUST be
 * passed through esc() by the CALLER before it reaches a block. Blocks accept
 * html precisely so callers can bold and link; that power is why escaping is
 * their responsibility.
 */

export const SITE = "https://www.scholifyapp.com"

/** Palette — mirrors the app (src/pages/AdminDashboard.tsx C constants). */
const INK = "#14141A"
const BODY = "#4A4149"
const SOFT = "#6E6570"
const FAINT = "#9A939C"
const RED = "#C80000"
const CREAM = "#F4F0ED"
const CARD_BORDER = "#E8E0DC"
const PANEL_BG = "#FAF8F6"
const PANEL_BORDER = "#EEE7E3"

const HEAD_FONT = "Georgia,'Times New Roman',serif"
const BODY_FONT = "Arial,Helvetica,sans-serif"

export function esc(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

/*
 * THE SANDBOX GUARD. Resend's onboarding@resend.dev sender delivers ONLY to
 * the Resend account owner: every "sent" email quietly lands in the admin
 * inbox instead of the learner's, and Resend reports success. This exact
 * failure has now happened twice in this product's short life — once as an
 * empty env var falling back to the sandbox, once (the 90-emails-a-day admin
 * flood) as the sandbox address pasted INTO the env var to "fix" the first
 * incident. A resend.dev sender is never a production configuration, so it is
 * now refused at the same gate that refuses a missing one.
 */
export function isSandboxSender(from: string): boolean {
  return /resend\.dev/i.test(from)
}

/** The verified sender, or null with a loud log. No silent fallback, ever. */
export function verifiedSender(preferred?: string): string | null {
  const from = (preferred ?? process.env.REMINDER_FROM ?? "").trim()
  if (!from) {
    console.error("[email] REMINDER_FROM is not set. Refusing to send; set it to an address on a domain verified in Resend.")
    return null
  }
  if (isSandboxSender(from)) {
    console.error(`[email] The configured sender is Resend's sandbox (resend.dev), which delivers only to the Resend account owner — this is the admin-inbox flood. Refusing to send; set REMINDER_FROM to an address on the verified scholifyapp.com domain.`)
    return null
  }
  return from
}

/* ── Blocks ──────────────────────────────────────────────────────── */

export type EmailBlock =
  | { type: "p"; html: string; lead?: boolean }
  | { type: "facts"; title?: string; rows: Array<{ label: string; value: string }> }
  | { type: "stats"; items: Array<{ value: string; label: string }> }
  | { type: "note"; html: string }
  | { type: "panel"; html: string; tone?: "neutral" | "good" | "gold" | "red"; title?: string }
  | { type: "progress"; label: string; percent: number; detail?: string }

function renderBlock(block: EmailBlock): string {
  if (block.type === "p") {
    return block.lead
      ? `<tr><td style="padding:16px 40px 0;font-family:${BODY_FONT};font-size:16px;line-height:26px;color:${BODY};">${block.html}</td></tr>`
      : `<tr><td style="padding:14px 40px 0;font-family:${BODY_FONT};font-size:15px;line-height:25px;color:${SOFT};">${block.html}</td></tr>`
  }
  if (block.type === "facts") {
    const rows = block.rows
      .map(
        (row) =>
          `<tr><td style="padding:7px 0;font-family:${BODY_FONT};font-size:13px;color:${FAINT};">${row.label}</td><td align="right" style="padding:7px 0 7px 16px;font-family:${BODY_FONT};font-size:13px;font-weight:700;color:${INK};">${row.value}</td></tr>`,
      )
      .join("")
    const title = block.title
      ? `<div style="font-family:${BODY_FONT};font-size:10px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:${FAINT};padding-bottom:8px;">${block.title}</div>`
      : ""
    return `<tr><td style="padding:20px 40px 0;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;background:${PANEL_BG};border:1px solid ${PANEL_BORDER};border-radius:14px;">
        <tr><td style="padding:16px 20px;">${title}<table role="presentation" width="100%" style="border-collapse:collapse;">${rows}</table></td></tr>
      </table>
    </td></tr>`
  }
  if (block.type === "stats") {
    const cells = block.items
      .map(
        (item) =>
          `<td align="center" style="padding:16px 8px;"><div style="font-family:${HEAD_FONT};font-size:26px;color:${INK};">${item.value}</div><div style="font-family:${BODY_FONT};font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${FAINT};margin-top:5px;">${item.label}</div></td>`,
      )
      .join("")
    return `<tr><td style="padding:20px 40px 0;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;background:${PANEL_BG};border:1px solid ${PANEL_BORDER};border-radius:14px;"><tr>${cells}</tr></table>
    </td></tr>`
  }
  if (block.type === "note") {
    return `<tr><td style="padding:20px 40px 0;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>
        <td width="3" style="background:${RED};border-radius:3px;font-size:0;">&nbsp;</td>
        <td style="padding:2px 0 2px 18px;font-family:${HEAD_FONT};font-style:italic;font-size:15px;line-height:24px;color:${BODY};">${block.html}</td>
      </tr></table>
    </td></tr>`
  }
  if (block.type === "progress") {
    const percent = Math.max(0, Math.min(100, Math.round(block.percent)))
    return `<tr><td style="padding:20px 40px 0;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;background:${PANEL_BG};border:1px solid ${PANEL_BORDER};border-radius:14px;"><tr><td style="padding:16px 20px;">
        <table role="presentation" width="100%" style="border-collapse:collapse;"><tr>
          <td style="font-family:${BODY_FONT};font-size:12px;font-weight:700;color:${INK};">${block.label}</td>
          <td align="right" style="font-family:${BODY_FONT};font-size:12px;font-weight:700;color:${RED};">${percent}%</td>
        </tr></table>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:9px;border-collapse:separate;"><tr>
          <td style="background:#ECE5E1;border-radius:99px;height:8px;font-size:0;line-height:0;">
            <table role="presentation" width="${Math.max(percent, 2)}%" cellspacing="0" cellpadding="0" style="border-collapse:separate;"><tr><td style="background:${RED};border-radius:99px;height:8px;font-size:0;line-height:0;">&nbsp;</td></tr></table>
          </td>
        </tr></table>
        ${block.detail ? `<div style="font-family:${BODY_FONT};font-size:12px;line-height:19px;color:${FAINT};margin-top:9px;">${block.detail}</div>` : ""}
      </td></tr></table>
    </td></tr>`
  }
  // panel
  const tones = {
    neutral: { bg: PANEL_BG, border: PANEL_BORDER, label: FAINT },
    good: { bg: "#F1FBF6", border: "#CBEBD9", label: "#1E7D50" },
    gold: { bg: "#FFF8E7", border: "#F4DDA2", label: "#9A6500" },
    red: { bg: "#FFF6F5", border: "#F3D2CE", label: RED },
  } as const
  const tone = tones[block.tone ?? "neutral"]
  const title = block.title
    ? `<div style="font-family:${BODY_FONT};font-size:10px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:${tone.label};padding-bottom:8px;">${block.title}</div>`
    : ""
  return `<tr><td style="padding:20px 40px 0;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;background:${tone.bg};border:1px solid ${tone.border};border-radius:14px;">
      <tr><td style="padding:16px 20px;font-family:${BODY_FONT};font-size:14px;line-height:22px;color:${BODY};">${title}${block.html}</td></tr>
    </table>
  </td></tr>`
}

/* ── The frame ───────────────────────────────────────────────────── */

export interface BrandEmailOptions {
  /** The grey inbox preview line. Written, never left to chance. */
  preheader: string
  /** HTML — the CALLER escapes any user-supplied fragment with esc(). */
  eyebrow: string
  /** HTML — the CALLER escapes any user-supplied fragment with esc(). Kept
   *  un-escaped here so an apostrophe in our own copy stays an apostrophe. */
  title: string
  blocks: EmailBlock[]
  cta?: { label: string; href: string }
  /** A quiet text link under the CTA for the secondary path. */
  secondary?: { label: string; href: string }
  /** "Charles · Your Scholify race engineer" unless overridden. */
  signoff?: string
  /** The one honest sentence saying why this email arrived. */
  reason: string
  /** When present, footer carries Unsubscribe + Settings and the send helper adds RFC 8058 headers. */
  unsubUrl?: string
}

export function renderBrandEmail(options: BrandEmailOptions): string {
  const cta = options.cta
    ? `<tr><td style="padding:26px 40px 0;">
        <a href="${esc(options.cta.href)}" style="display:inline-block;background:${RED};color:#FFFFFF;text-decoration:none;font-family:${BODY_FONT};font-size:14px;font-weight:700;line-height:20px;padding:14px 26px;border-radius:12px;">${esc(options.cta.label)} &rarr;</a>
      </td></tr>`
    : ""
  const secondary = options.secondary
    ? `<tr><td style="padding:${options.cta ? "14px" : "26px"} 40px 0;font-family:${BODY_FONT};font-size:13px;"><a href="${esc(options.secondary.href)}" style="color:${SOFT};">${esc(options.secondary.label)}</a></td></tr>`
    : ""
  const unsub = options.unsubUrl
    ? `<a href="${esc(options.unsubUrl)}" style="color:${FAINT};">Unsubscribe</a> &middot; <a href="${SITE}/settings" style="color:${FAINT};">Email preferences</a>`
    : `<a href="${SITE}/settings" style="color:${FAINT};">Manage your account</a>`
  const social = `<br><br><span style="display:inline-block;margin-bottom:7px;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#B7B2AC;">Follow Scholify</span><br>${socialRowHtml()}`

  return `<!doctype html><html><body style="margin:0;padding:0;background:${CREAM};">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${esc(options.preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${CREAM};">
    <tr><td align="center" style="padding:32px 12px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#FFFFFF;border:1px solid ${CARD_BORDER};border-radius:22px;overflow:hidden;">
        <tr><td style="height:5px;background:linear-gradient(90deg,#C80000 0%,#E50068 52%,#F4A405 100%);font-size:0;">&nbsp;</td></tr>
        <tr><td style="padding:32px 40px 0;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>
            <td valign="middle"><img src="${SITE}/charles/email-avatar.png" width="66" height="66" alt="Charles, Scholify race engineer" style="display:block;width:66px;height:66px;border-radius:17px;border:1px solid ${CARD_BORDER};"></td>
            <td align="right" valign="middle"><img src="${SITE}/icon-192.png" width="60" height="60" alt="Scholify" style="display:inline-block;width:60px;height:60px;border-radius:15px;"><div style="font-family:${BODY_FONT};font-size:9px;font-weight:700;letter-spacing:1.8px;color:${FAINT};margin-top:5px;">LEARN DAILY &middot; GROW STEADILY</div></td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:26px 40px 0;font-family:${BODY_FONT};font-size:10px;font-weight:700;letter-spacing:2px;color:${RED};text-transform:uppercase;">${options.eyebrow}</td></tr>
        <tr><td style="padding:10px 40px 0;font-family:${HEAD_FONT};font-size:31px;line-height:38px;letter-spacing:-0.3px;color:${INK};">${options.title}</td></tr>
        ${options.blocks.map(renderBlock).join("")}
        ${cta}
        ${secondary}
        <tr><td style="padding:30px 40px 0;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td style="border-top:1px solid ${PANEL_BORDER};font-size:0;">&nbsp;</td></tr></table>
        </td></tr>
        <tr><td style="padding:8px 40px 34px;font-family:${BODY_FONT};font-size:12px;line-height:20px;color:${FAINT};">
          <span style="color:${BODY};font-weight:700;">${esc(options.signoff ?? "Charles · Your Scholify race engineer")}</span><br>
          ${esc(options.reason)}<br>${unsub}${social}
        </td></tr>
      </table>
      <div style="max-width:620px;padding:16px 8px 0;font-family:${BODY_FONT};font-size:11px;line-height:17px;color:#B7B2AC;">Scholify &middot; AI-powered ACCA preparation &middot; <a href="${SITE}" style="color:#B7B2AC;">scholifyapp.com</a></div>
    </td></tr>
  </table>
  </body></html>`
}

/** Plain-text alternative. Joined lines, empty string entries become blank lines. */
export function renderTextEmail(lines: Array<string | null | undefined | false>): string {
  return lines.filter((line): line is string => typeof line === "string").join("\n")
}

/* ── Delivery ────────────────────────────────────────────────────── */

export interface DeliverOptions {
  from: string
  to: string
  subject: string
  html: string
  text?: string
  replyTo?: string
  unsubUrl?: string
}

/**
 * One send through Resend. Returns the provider id, or null on any failure —
 * callers that must not lose an email (the reminder tick) release their claim
 * on null; callers riding a webhook just log it.
 */
export async function deliverEmail(options: DeliverOptions): Promise<string | null> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  if (isSandboxSender(options.from)) {
    console.error("[email] refused: sandbox sender", options.subject)
    return null
  }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: options.from,
        to: options.to,
        subject: options.subject,
        html: options.html,
        ...(options.text ? { text: options.text } : {}),
        ...(options.replyTo ? { reply_to: options.replyTo } : {}),
        ...(options.unsubUrl
          ? {
              headers: {
                "List-Unsubscribe": `<${options.unsubUrl}>`,
                "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
              },
            }
          : {}),
      }),
    })
    if (!response.ok) return null
    const result = (await response.json().catch(() => ({}))) as { id?: string }
    return result.id ?? "sent"
  } catch {
    return null
  }
}
