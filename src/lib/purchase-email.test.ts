import { describe, expect, it } from "vitest"
import { buildPurchaseEmail } from "../../api/purchase-email"

/*
 * The welcome email a paying learner reads first. It went unsent entirely
 * until launch night, which is exactly the kind of gap nobody notices without
 * buying the product — so its content is pinned here.
 *
 * What these tests protect is not the prose. It is the three ways this email
 * can do damage: promising a pass, misstating when money leaves someone's
 * account, or injecting a name straight into HTML.
 */

const base = { planLabel: "Beginner", priceLabel: "$9.99/month", onTrial: false }

describe("buildPurchaseEmail", () => {
  it("greets by name when there is one, and works without", () => {
    expect(buildPurchaseEmail({ ...base, firstName: "Nuriddin" }).html).toContain("Nuriddin, you're in.")
    expect(buildPurchaseEmail({ ...base, firstName: null }).html).toContain("You're in.")
  })

  it("escapes the name instead of trusting it", () => {
    // first_name comes from a sign-up form, so it is attacker-controlled text
    // being dropped into an HTML email.
    const html = buildPurchaseEmail({ ...base, firstName: "<script>alert(1)</script>" }).html
    expect(html).not.toContain("<script>")
    expect(html).toContain("&lt;script&gt;")
  })

  it("tells a trial user the free days started and when the first charge lands", () => {
    const mail = buildPurchaseEmail({ ...base, planLabel: "Pro", priceLabel: "$14.99/month", onTrial: true, chargeDate: "13 August 2026" })
    expect(mail.subject).toBe("You're in — your 3 free days start now")
    expect(mail.html).toContain("3 free days have started")
    expect(mail.html).toContain("13 August 2026")
  })

  it("tells a paying user the plan and the next charge, with no trial language", () => {
    const mail = buildPurchaseEmail({ ...base, chargeDate: "10 September 2026" })
    expect(mail.subject).toBe("You're in — Beginner is active")
    expect(mail.html).toContain("10 September 2026")
    expect(mail.html).not.toContain("free days")
  })

  it("never promises a pass", () => {
    // A guarantee we cannot keep is the one line a learner would remember if
    // they failed — and would be right to quote back at us.
    const mail = buildPurchaseEmail({ ...base, firstName: "Alex", onTrial: true })
    const words = `${mail.subject} ${mail.text}`.toLowerCase()
    for (const claim of ["guarantee", "guaranteed", "you will pass", "we'll get you a pass"]) {
      expect(words).not.toContain(claim)
    }
  })

  it("sells the habit, since that is what the product actually delivers", () => {
    const text = buildPurchaseEmail({ ...base, firstName: "Alex" }).text.toLowerCase()
    expect(text).toContain("tomorrow")
    expect(text).toContain("streak")
  })

  it("ships a plain-text alternative with no markup left in it", () => {
    // Text-only clients, and a lower spam score.
    const mail = buildPurchaseEmail({ ...base, firstName: "Alex", chargeDate: "1 October 2026" })
    expect(mail.text.length).toBeGreaterThan(200)
    expect(mail.text).not.toMatch(/<[a-z/][^>]*>/i)
  })
})
