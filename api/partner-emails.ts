import type { SupabaseClient } from "@supabase/supabase-js"
import { deliverEmail, esc, renderBrandEmail, renderTextEmail, verifiedSender, SITE } from "./email-theme.js"
import { commissionTierProgress, COMMISSION_TIERS } from "../src/lib/partner-rewards.js"

/*
 * The tier-up email — the milestone a partner works toward for months.
 *
 * Commission-earned notifications and the weekly digest live with the rest of
 * the partner machinery (api/stripe.ts and api/affiliate.ts). This one is
 * separate because it fires from the same code path that locks a referral's
 * earning window — the only place the unique-paid-learner count passes 300 or
 * 600, which is what makes exactly-once free: a count crosses each threshold
 * one time in a partner's life.
 *
 * The copy makes the same promise the public offer page makes, including the
 * honest half: the longer window applies to future referrals, never
 * retroactively. A milestone email that quietly overpromises is a complaint
 * with a delay on it.
 */

const OFFICIAL_EMAIL = "info@scholifyapp.com"

/** Partner mail sends from FEEDBACK_FROM when set, REMINDER_FROM otherwise — same guard, no sandbox. */
function partnerSender(): string | null {
  return verifiedSender(process.env.FEEDBACK_FROM || process.env.REMINDER_FROM)
}

/**
 * Unique paid learner #300 (Growth) or #600 (Premier) just arrived. Call with
 * the NEW count immediately after the referral's window is locked; any other
 * count is a no-op. Never throws: a milestone email must not fail a webhook.
 */
export async function sendTierUpEmail(db: SupabaseClient, affiliateId: string, paidCustomers: number): Promise<boolean> {
  try {
    const tier = COMMISSION_TIERS.find((candidate) => candidate.paidCustomers === paidCustomers)
    if (!tier || tier.paidCustomers === 0) return false
    const from = partnerSender()
    if (!from) return false
    const { data: partner } = await db.from("affiliates").select("name, email, code").eq("id", affiliateId).maybeSingle()
    if (!partner?.email) return false

    const first = String(partner.name || "").split(/\s+/)[0] || "partner"
    const progress = commissionTierProgress(paidCustomers)
    const html = renderBrandEmail({
      preheader: `Paid learner #${paidCustomers} unlocked the ${tier.name} tier. Every future referral now earns longer.`,
      eyebrow: `Partner programme · ${tier.name} unlocked`,
      title: `${esc(first)}, you just unlocked ${tier.name}.`,
      blocks: [
        { type: "p", lead: true, html: `Your ${paidCustomers === 300 ? "three hundredth" : "six hundredth"} unique paid learner arrived today. From this learner onward, every referral you send earns your 27% across <b>${tier.monthlyPayments} successful monthly payments</b> instead of ${tier.monthlyPayments === 3 ? "one" : "three"} — the earning window itself just got longer.` },
        {
          type: "facts",
          title: "What changed",
          rows: [
            { label: "Your tier", value: esc(tier.name) },
            { label: "Unique paid learners", value: String(paidCustomers) },
            { label: "New earning window", value: `${tier.monthlyPayments} monthly payments per referral` },
            { label: "Applies to", value: "This learner and every one after" },
          ],
        },
        { type: "p", html: `One honest note, the same one the offer page makes: the longer window applies from this milestone forward, not retroactively to earlier referrals — their windows were locked when they first paid. What compounds now is everything ahead of you${progress.next ? `, and the next milestone (<b>${esc(progress.next.name)}</b> at ${progress.next.paidCustomers} paid learners) extends it again` : ""}.` },
        { type: "note", html: `Milestones like this one are rare enough that we notice each of them personally. ${paidCustomers} people are preparing for ACCA because you told them about us. Thank you — genuinely.` },
      ],
      cta: { label: "See your new numbers", href: `${SITE}/partners` },
      signoff: "Makhmudov Nuriddin · Founder, Scholify",
      reason: "You are receiving this because your partner account reached a commission tier milestone.",
    })

    const text = renderTextEmail([
      `You just unlocked ${tier.name}.`,
      "",
      `Unique paid learner #${paidCustomers} arrived today. Every referral from here earns 27% across ${tier.monthlyPayments} successful monthly payments.`,
      "The longer window applies to future referrals; earlier windows stay as locked when they first paid.",
      "",
      `Dashboard: ${SITE}/partners`,
      "",
      "— Makhmudov Nuriddin · Founder, Scholify",
    ])

    return Boolean(
      await deliverEmail({ from, to: partner.email, subject: `${tier.name} tier unlocked — your earning window just got longer`, html, text, replyTo: OFFICIAL_EMAIL }),
    )
  } catch (error) {
    console.error("tier-up email:", error)
    return false
  }
}
