import { describe, it, expect } from "vitest"
import {
  isPrelaunchAt,
  isPartnerProgramVisibleAt,
  LAUNCH_DATE_ISO,
  LAUNCH_DATE_LABEL,
  PARTNER_LAUNCH_DATE_ISO,
  PARTNER_LAUNCH_DATE_LABEL,
  PRELAUNCH_MODE,
  signInPath,
  signUpPath,
} from "@/lib/launch"

/*
 * The auth routes are wrapped in TeamSignIn (App.tsx), which redirects to "/"
 * unless the URL carries ?team=1 while PRELAUNCH_MODE is on. Every internal link
 * to /sign-in or /sign-up therefore has to carry it, and each one that forgot was
 * a dead link that silently landed the learner on the waitlist.
 *
 * Three had already forgotten it:
 *   · ProtectedRoute's "you need to sign in" redirect — so a signed-out learner
 *     opening any app link was bounced to marketing and never shown a form.
 *   · the "Back to sign in" link on the sign-up confirmation panel — so someone
 *     who had just created an account could not get back to sign in.
 *   · AuthCallback's recovery link after a failed OAuth return.
 *
 * These helpers exist so it cannot be forgotten a fourth time.
 */

describe("auth path helpers", () => {
  it("opens automatically at the advertised Uzbekistan launch instant", () => {
    const launch = Date.parse(LAUNCH_DATE_ISO)
    expect(isPrelaunchAt(launch - 1)).toBe(true)
    expect(isPrelaunchAt(new Date(launch))).toBe(false)
    expect(isPrelaunchAt(launch + 1)).toBe(false)
  })

  it("carries the team param exactly when the app is gated", () => {
    // Asserted against the real flag so this test tracks the launch cutover:
    // when PRELAUNCH_MODE flips to false the param must disappear by itself.
    if (PRELAUNCH_MODE) {
      expect(signInPath()).toContain("team=1")
      expect(signUpPath()).toContain("team=1")
    } else {
      expect(signInPath()).toBe("/sign-in")
      expect(signUpPath()).toBe("/sign-up")
    }
  })

  it("keeps a next destination alongside the gate param", () => {
    const path = signInPath("/admin")
    expect(path.startsWith("/sign-in?")).toBe(true)
    expect(new URLSearchParams(path.split("?")[1]).get("next")).toBe("/admin")
    if (PRELAUNCH_MODE) {
      expect(new URLSearchParams(path.split("?")[1]).get("team")).toBe("1")
    }
  })

  it("omits next when there isn't one, rather than emitting an empty param", () => {
    expect(signInPath()).not.toContain("next=")
    expect(signUpPath()).not.toContain("next=")
  })

  it("always produces a same-origin app path", () => {
    for (const path of [signInPath(), signUpPath(), signInPath("/admin"), signUpPath("/welcome")]) {
      expect(path.startsWith("/"), path).toBe(true)
      expect(path.startsWith("//"), path).toBe(false)
    }
  })

  it("url-encodes a next value so it cannot break out of the query", () => {
    const path = signInPath("/study/analytics?tab=x")
    // Round-trips back to exactly what was asked for.
    expect(new URLSearchParams(path.split("?")[1]).get("next")).toBe("/study/analytics?tab=x")
  })
})

/*
 * The two launch gates, which must open themselves.
 *
 * The partner gate used to be `PARTNER_PROGRAM_VISIBLE = false` — a hardcoded flag
 * that could only become true by someone editing the file and shipping a deploy on
 * the morning of the announcement. The whole point of the product gate above is
 * that it does NOT depend on that, and the partner announcement carries the same
 * risk: social posts going out to a waitlist page with no partner link on it.
 *
 * These assertions pin the two instants and, critically, their ORDER — the partner
 * programme is announced two days BEFORE the product opens, so an off-by-one in
 * either date would be caught here rather than in public.
 */
describe("launch gates open themselves on their own dates", () => {
  it("reveals the partner programme exactly at midnight Tashkent on 8 August", () => {
    const open = Date.parse(PARTNER_LAUNCH_DATE_ISO)
    expect(isPartnerProgramVisibleAt(open - 1)).toBe(false)
    expect(isPartnerProgramVisibleAt(new Date(open))).toBe(true)
    expect(isPartnerProgramVisibleAt(open + 1)).toBe(true)
  })

  it("announces the partner programme BEFORE the product opens", () => {
    expect(Date.parse(PARTNER_LAUNCH_DATE_ISO)).toBeLessThan(Date.parse(LAUNCH_DATE_ISO))
  })

  it("keeps the partner programme visible after the product launches", () => {
    // A gate that re-hid itself at launch would remove the link the social posts
    // point at, two days after publishing them.
    expect(isPartnerProgramVisibleAt(Date.parse(LAUNCH_DATE_ISO))).toBe(true)
    expect(isPartnerProgramVisibleAt(Date.parse(LAUNCH_DATE_ISO) + 365 * 864e5)).toBe(true)
  })

  it("states both dates in the same timezone, so the two labels are comparable", () => {
    expect(PARTNER_LAUNCH_DATE_ISO).toContain("+05:00")
    expect(LAUNCH_DATE_ISO).toContain("+05:00")
  })

  it("agrees with the human-readable labels shown to visitors", () => {
    const partner = new Date(Date.parse(PARTNER_LAUNCH_DATE_ISO))
    const product = new Date(Date.parse(LAUNCH_DATE_ISO))
    // Rendered in the +05:00 zone the dates are quoted in.
    const inTashkent = (d: Date) =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Tashkent", day: "numeric", month: "long", year: "numeric",
      }).format(d)
    expect(inTashkent(partner)).toBe(PARTNER_LAUNCH_DATE_LABEL)
    expect(inTashkent(product)).toBe(LAUNCH_DATE_LABEL)
  })
})
