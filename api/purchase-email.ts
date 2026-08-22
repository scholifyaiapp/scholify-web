import { deliverEmail, esc, renderBrandEmail, renderTextEmail, verifiedSender, SITE } from "./email-theme.js"

/*
 * The money emails: welcome, receipt, failed payment, cancellation.
 *
 * Four moments in a subscriber's financial life, each with exactly one job:
 *
 *   WELCOME    — the only moment they are guaranteed to feel good about the
 *                decision. Sets the habit, not the feature list.
 *   RECEIPT    — proof. Amount, date, plan, and Stripe's own hosted invoice.
 *                (Stripe's "Successful payments" toggle has no API and is off.)
 *   FAILED     — the highest-ROI email in any subscription business. A card
 *                expires, Stripe retries for two weeks, and a subscriber who
 *                never hears about it churns by accident. Ours tells them
 *                calmly, twice at most, with the fix one click away.
 *   CANCELLED  — the exit interview. Confirms what they keep (everything),
 *                when access ends, and that resuming is one click. A graceful
 *                goodbye is the cheapest re-acquisition channel there is.
 *
 * All builders are pure so the wording is unit-testable without sending.
 * All senders are fire-and-forget: a failed email must never fail a webhook.
 */

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

/**
 * Subject + HTML + text for the post-purchase welcome. The copy sells
 * consistency, not features: someone who has just paid does not need to be
 * told what they bought; they need to be told what to do tomorrow.
 */
export function buildPurchaseEmail(facts: PurchaseEmailFacts): { subject: string; html: string; text: string } {
  const name = (facts.firstName || "").trim()
  const hello = name ? `${esc(name)}, you're in.` : "You're in."
  const plan = esc(facts.planLabel)
  const price = esc(facts.priceLabel)

  const billingLine = facts.onTrial
    ? `Your 3 free days have started. ${facts.chargeDate ? `The first charge is on <b>${esc(facts.chargeDate)}</b>` : "You'll be charged when they end"}${price ? ` (${price})` : ""}.`
    : `You're on <b>${plan}</b>${price ? ` — ${price}` : ""}.${facts.chargeDate ? ` Your next charge is on <b>${esc(facts.chargeDate)}</b>.` : ""}`

  /*
   * EFFORT OVER TIME, never talent, speed or a promised pass — that is the
   * thing this product can actually deliver on and the thing ACCA rewards. A
   * guarantee we cannot keep is the one line a failing learner would remember.
   */
  const html = renderBrandEmail({
    preheader: facts.onTrial
      ? "Your plan is built. Here is exactly what your first week looks like."
      : `${facts.planLabel} is active. Here is exactly what your first week looks like.`,
    eyebrow: "Charles · Welcome aboard",
    title: hello,
    blocks: [
      { type: "p", lead: true, html: `You've just done the part most people put off. From here, the only thing that matters is showing up tomorrow, and the day after that — and my whole job is making those minutes land on the right topic, in the right order, every single day.` },
      { type: "p", html: `Nobody passes ACCA in a weekend. The qualification goes to the person who did 25 focused minutes on the days they didn't feel like it. Your plan is already built around your diagnostic, your exam date and your available hours — you never have to decide <i>what</i> to study again, only to arrive.` },
      {
        type: "facts",
        title: "Your first week, in order",
        rows: [
          { label: "Today", value: "Open today's block — it's already selected" },
          { label: "Tomorrow", value: "Same time, same desk. The streak starts" },
          { label: "By day 7", value: "Your readiness score runs on real evidence" },
        ],
      },
      { type: "panel", title: "Your plan", html: `<b style="color:#14141A;">${plan}</b><br>${billingLine}`, tone: "neutral" },
      { type: "note", html: `One honest warning from your race engineer: motivation gets you through week one. The schedule gets you through the rest. Protect the time you chose — I'll take care of everything on the desk.` },
    ],
    cta: { label: "Start today's block", href: `${SITE}/study` },
    reason: "You are receiving this because you started a Scholify subscription.",
  })

  const text = renderTextEmail([
    hello,
    "",
    "You've just done the part most people put off. From here, the only thing that matters is showing up tomorrow, and the day after that — my whole job is making those minutes land on the right topic, in the right order, every single day.",
    "",
    "Nobody passes ACCA in a weekend. The qualification goes to the person who did 25 focused minutes on the days they didn't feel like it. Your plan is already built around your diagnostic, your exam date and your available hours.",
    "",
    "Your first week, in order:",
    "  Today — open today's block, it's already selected.",
    "  Tomorrow — same time, same desk. The streak starts.",
    "  By day 7 — your readiness score runs on real evidence.",
    "",
    `Your plan: ${facts.planLabel}`,
    billingLine.replace(/<[^>]+>/g, ""),
    "",
    `Start today's block: ${SITE}/study`,
    "",
    "— Charles · Your Scholify race engineer",
    `Manage your plan: ${SITE}/settings`,
  ])

  return {
    subject: facts.onTrial ? "You're in — your 3 free days start now" : `You're in — ${facts.planLabel} is active`,
    html,
    text,
  }
}

/** Fire-and-forget delivery. Never throws: a failed email must not fail a webhook. */
export async function sendPurchaseEmail(to: string, facts: PurchaseEmailFacts): Promise<boolean> {
  const from = verifiedSender()
  if (!from || !to) return false
  const { subject, html, text } = buildPurchaseEmail(facts)
  return Boolean(await deliverEmail({ from, to, subject, html, text }))
}

/* ── The receipt ─────────────────────────────────────────────────── */

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
  const hello = name ? `Thanks, ${esc(name)}.` : "Thank you."
  const rows = [
    { label: "Plan", value: esc(facts.planLabel) },
    { label: "Paid", value: esc(facts.paidOn) },
    { label: "Amount", value: `<span style="font-size:16px;">${esc(facts.amount)}</span>` },
    ...(facts.nextChargeOn ? [{ label: "Next charge", value: esc(facts.nextChargeOn) }] : []),
  ]

  const html = renderBrandEmail({
    preheader: `Payment received — ${facts.amount} for ${facts.planLabel}. Your record is inside.`,
    eyebrow: "Receipt · Payment received",
    title: hello,
    blocks: [
      { type: "p", lead: true, html: `Your payment went through. Here are the details for your records — and the official invoice, should an employer be reimbursing you.` },
      { type: "facts", rows },
      { type: "p", html: `Every charge generates a proper Stripe invoice with a downloadable PDF; this email is the covering note, Stripe's document is the record. You can change your plan or payment method any time in <a href="${SITE}/settings" style="color:#C80000;">Settings</a>.` },
    ],
    ...(facts.invoiceUrl ? { cta: { label: "View or download the invoice", href: facts.invoiceUrl } } : {}),
    signoff: "Scholify Billing",
    reason: "You are receiving this because you have an active Scholify subscription.",
  })

  const text = renderTextEmail([
    hello,
    "",
    "Your payment went through. Here are the details for your records.",
    "",
    `Plan: ${facts.planLabel}`,
    `Paid: ${facts.paidOn}`,
    `Amount: ${facts.amount}`,
    facts.nextChargeOn ? `Next charge: ${facts.nextChargeOn}` : null,
    facts.invoiceUrl ? "" : null,
    facts.invoiceUrl ? `Invoice: ${facts.invoiceUrl}` : null,
    "",
    `Manage your plan: ${SITE}/settings`,
  ])

  return { subject: `Your Scholify receipt — ${facts.amount}`, html, text }
}

/** Fire-and-forget. Never throws: a failed receipt must not fail a webhook. */
export async function sendReceiptEmail(to: string, facts: ReceiptFacts): Promise<boolean> {
  const from = verifiedSender()
  if (!from || !to) return false
  const { subject, html, text } = buildReceiptEmail(facts)
  return Boolean(await deliverEmail({ from, to, subject, html, text }))
}

/* ── The failed payment ──────────────────────────────────────────── */

export interface PaymentFailedFacts {
  firstName?: string | null
  /** e.g. "$14.99" in the invoice's currency. */
  amount: string
  planLabel: string
  /** Stripe's attempt number for this invoice: 1 on the first failure. */
  attempt: number
  /** When Stripe will retry, if known. */
  nextRetryOn?: string | null
}

/**
 * Sent on failure attempts 1 and 3 only — the first says "no action may be
 * needed", the third says "this is the last window". Stripe retries a card up
 * to four times over roughly two weeks; a learner who fixes it after either
 * email never notices an interruption, which is the entire point.
 */
export function buildPaymentFailedEmail(facts: PaymentFailedFacts): { subject: string; html: string; text: string } {
  const name = (facts.firstName || "").trim()
  const urgent = facts.attempt >= 3
  const title = urgent ? "Last call on your payment" : (name ? `${esc(name)}, a payment didn't go through` : "A payment didn't go through")

  const lead = urgent
    ? `Stripe has now tried your card ${facts.attempt} times without success, and its retry window is nearly over. When it closes, your subscription pauses and your plan stops adapting — your progress stays saved, but the daily engine goes quiet.`
    : `Your card declined today's ${esc(facts.amount)} charge for <b>${esc(facts.planLabel)}</b>. This is almost always mundane — an expired card, a limit, a bank being cautious — and nothing has been interrupted: your access continues while Stripe retries automatically${facts.nextRetryOn ? `, next on <b>${esc(facts.nextRetryOn)}</b>` : ""}.`

  const html = renderBrandEmail({
    preheader: urgent
      ? "Stripe's retry window is nearly over — one minute fixes it."
      : "Nothing is interrupted. Updating your card takes one minute.",
    eyebrow: urgent ? "Billing · Action needed" : "Billing · Heads-up",
    title,
    blocks: [
      { type: "p", lead: true, html: lead },
      {
        type: "facts",
        rows: [
          { label: "Plan", value: esc(facts.planLabel) },
          { label: "Amount", value: esc(facts.amount) },
          { label: "Attempt", value: String(facts.attempt) },
          ...(facts.nextRetryOn ? [{ label: "Next automatic retry", value: esc(facts.nextRetryOn) }] : []),
        ],
      },
      { type: "p", html: `Updating your payment method takes about a minute: open Settings, choose <b>Manage billing</b>, and Stripe's secure page does the rest. The moment a retry succeeds, everything continues as if nothing happened — streak, plan and progress untouched.` },
      ...(urgent ? [{ type: "panel" as const, tone: "red" as const, title: "If the window closes", html: `Your data is never deleted. But the plan stops re-sequencing around your exam date, and restarting later means rebuilding momentum — the most expensive thing in exam preparation.` }] : []),
    ],
    cta: { label: "Update payment method", href: `${SITE}/settings` },
    reason: "You are receiving this because a subscription payment could not be collected.",
  })

  const text = renderTextEmail([
    title,
    "",
    lead.replace(/<[^>]+>/g, ""),
    "",
    `Plan: ${facts.planLabel}`,
    `Amount: ${facts.amount}`,
    `Attempt: ${facts.attempt}`,
    facts.nextRetryOn ? `Next automatic retry: ${facts.nextRetryOn}` : null,
    "",
    "Updating your payment method takes about a minute: Settings -> Manage billing.",
    urgent ? "If the window closes: your data is never deleted, but the plan stops adapting until billing resumes." : null,
    "",
    `Update payment method: ${SITE}/settings`,
    "",
    "— Charles · Your Scholify race engineer",
  ])

  return {
    subject: urgent ? "Last call — your Scholify payment needs a minute" : "A payment didn't go through — your access is safe",
    html,
    text,
  }
}

export async function sendPaymentFailedEmail(to: string, facts: PaymentFailedFacts): Promise<boolean> {
  const from = verifiedSender()
  if (!from || !to) return false
  const { subject, html, text } = buildPaymentFailedEmail(facts)
  return Boolean(await deliverEmail({ from, to, subject, html, text }))
}

/* ── The cancellation ────────────────────────────────────────────── */

export interface CancellationFacts {
  firstName?: string | null
  planLabel: string
  /** Localised date access runs to. */
  accessUntil?: string | null
}

/**
 * Sent once, when a learner schedules a cancellation. No dark patterns, no
 * "are you sure" theatrics — a plain statement of what they keep (everything),
 * when access ends, and that the door is one click wide. People remember how
 * a product lets them leave; that memory is what brings them back at the next
 * exam session.
 */
export function buildCancellationEmail(facts: CancellationFacts): { subject: string; html: string; text: string } {
  const name = (facts.firstName || "").trim()
  const until = facts.accessUntil ? esc(facts.accessUntil) : null

  const html = renderBrandEmail({
    preheader: until ? `Your access runs to ${facts.accessUntil}. Everything you built stays saved.` : "Everything you built stays saved.",
    eyebrow: "Subscription · Cancellation confirmed",
    title: name ? `Understood, ${esc(name)}.` : "Understood.",
    blocks: [
      { type: "p", lead: true, html: `Your <b>${esc(facts.planLabel)}</b> subscription is set to end${until ? ` on <b>${until}</b>` : " at the close of the current billing period"}. Until then, nothing changes — your full plan keeps running and every session still counts.` },
      {
        type: "facts",
        title: "What happens to your work",
        rows: [
          { label: "Progress & answers", value: "Saved, permanently" },
          { label: "Streak trees & XP", value: "Saved, permanently" },
          { label: "Your study plan", value: "Paused where you left it" },
          { label: "Further charges", value: "None" },
        ],
      },
      { type: "p", html: `If you cancelled because the exam is done — congratulations, genuinely. If something about Scholify wasn't right, reply to this email and tell me what; the founder reads every answer, and it changes what gets built next.` },
      { type: "p", html: `And if you sit another paper later: sign back in, press resume, and your plan re-sequences around the new date in about a minute. Nothing to rebuild.` },
    ],
    cta: { label: "Manage subscription", href: `${SITE}/settings` },
    reason: "You are receiving this because you cancelled your Scholify subscription.",
  })

  const text = renderTextEmail([
    name ? `Understood, ${name}.` : "Understood.",
    "",
    `Your ${facts.planLabel} subscription is set to end${facts.accessUntil ? ` on ${facts.accessUntil}` : " at the close of the current billing period"}. Until then, nothing changes — your full plan keeps running.`,
    "",
    "What happens to your work:",
    "  Progress & answers — saved, permanently.",
    "  Streak trees & XP — saved, permanently.",
    "  Your study plan — paused where you left it.",
    "  Further charges — none.",
    "",
    "If something about Scholify wasn't right, reply to this email and tell us what — the founder reads every answer.",
    "",
    `Manage subscription: ${SITE}/settings`,
    "",
    "— Charles · Your Scholify race engineer",
  ])

  return { subject: until ? `Your Scholify access runs to ${facts.accessUntil}` : "Your Scholify cancellation is confirmed", html, text }
}

export async function sendCancellationEmail(to: string, facts: CancellationFacts): Promise<boolean> {
  const from = verifiedSender()
  if (!from || !to) return false
  const { subject, html, text } = buildCancellationEmail(facts)
  return Boolean(await deliverEmail({ from, to, subject, html, text }))
}
