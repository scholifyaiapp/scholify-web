import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"

/*
 * THE ROUTE TABLE IS THE LOCK. THIS TEST IS THE KEY REGISTER.
 *
 * Four separate ways into the paid app were found and closed on launch night,
 * and not one of them was a bug in the entitlement rule itself — the rule was
 * right every time. They were all the same shape: a route, a button or an
 * endpoint that never asked the rule at all.
 *
 * Reviewing a diff will not catch the fifth. A new route is one line, it looks
 * exactly like the line above it, and the missing word is `gate` — six letters
 * whose absence gives the whole product away for free. So the check is here,
 * where forgetting is loud.
 *
 * These tests read the source as text on purpose. There is no component
 * renderer in this suite (vitest runs in `node`), and more importantly a
 * rendering test would prove the guard works for the routes someone remembered
 * to test. This proves it for the routes nobody thought about — including the
 * one added six months from now.
 */

const src = (p: string) => readFileSync(resolve(__dirname, "..", p), "utf8")

/**
 * Every path that may be reached by a signed-in account WITHOUT an entitlement,
 * each with the reason it is allowed to be open. A path may only leave the gate
 * off by being named here, and the justification is the point: if you cannot
 * write one, the route needs `gate`.
 */
const UNGATED_BY_DESIGN: Record<string, string> = {
  "/welcome":
    "Onboarding, the diagnostic and plan generation are deliberately free — they are how someone decides to buy. The reveal ends at the paywall and has no other exit.",
  "/settings":
    "Billing recovery. Someone whose card was declined MUST be able to reach Account & billing to fix it; gating this would lock a paying customer out of the one page that un-locks them.",
  "/admin":
    "Self-guarded — AdminDashboard returns <Navigate to='/' /> unless isLaunchAdmin(user).",
  "/partners":
    "The partner programme is a separate relationship. Affiliates are not learners and never buy a study plan.",
}

describe("the app's route table", () => {
  const app = src("App.tsx")
  const routes = [...app.matchAll(/<Route\s+path="([^"]+)"\s+element=\{([\s\S]*?)\}\s*\/>/g)]

  it("was parsed at all", () => {
    // If the JSX shape changes and this regex silently matches nothing, every
    // assertion below would vacuously pass and the register would be worthless.
    expect(routes.length).toBeGreaterThan(15)
  })

  const protectedRoutes = routes.filter(([, , el]) => el.includes("<ProtectedRoute"))

  it("puts every signed-in route behind ProtectedRoute", () => {
    // A route that renders app UI without ProtectedRoute is reachable while
    // signed OUT, which is a worse hole than an ungated one.
    for (const [, path, el] of routes) {
      const looksLikeAppUi = /Dashboard|AccaStudy|AccaDiagnostic|AccaAnalytics|NotesHub|Settings|Welcome|Partners(?!Apply)/.test(el)
      if (looksLikeAppUi) expect(el, `${path} renders app UI`).toContain("<ProtectedRoute")
    }
  })

  it("gates every protected route except the ones justified above", () => {
    for (const [, path, el] of protectedRoutes) {
      const gated = /<ProtectedRoute[^>]*\bgate\b/.test(el)
      if (gated) continue
      expect(
        UNGATED_BY_DESIGN[path],
        `${path} is signed-in but NOT gated, and has no justification. Either add \`gate\` to the route, or add an entry to UNGATED_BY_DESIGN explaining why an account with no subscription may see it.`,
      ).toBeTruthy()
    }
  })

  it("keeps the paid surfaces gated, by name", () => {
    // The reverse direction: UNGATED_BY_DESIGN must never grow to swallow one
    // of these. Deleting `gate` from /study would otherwise be a one-word,
    // green-tests change.
    for (const path of ["/dashboard", "/study", "/study/analytics", "/notes"]) {
      const route = protectedRoutes.find(([, p]) => p === path)
      expect(route, `${path} vanished from the route table`).toBeTruthy()
      expect(/<ProtectedRoute[^>]*\bgate\b/.test(route![2]), `${path} lost its gate`).toBe(true)
    }
    expect(Object.keys(UNGATED_BY_DESIGN)).not.toContain("/dashboard")
  })
})

/** Source with comments stripped — so these assertions read code, not the prose explaining it. */
const codeOf = (text: string) => text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "")

describe("the plan reveal", () => {
  const reveal = codeOf(src("components/acca/ZeroPlanReveal.tsx"))

  it("has no exit that is not the paywall", () => {
    /*
     * This is the fourth hole, pinned. The reveal used to carry a quiet
     * secondary button — "Take me to my dashboard instead" — which called
     * onDone("dashboard") and navigated away without ever raising the offer.
     *
     * Every interactive element here must end at setShowPaywall(true).
     */
    const handlers = [...reveal.matchAll(/onClick=\{([\s\S]*?)\n\s*\}\}/g)].map(m => m[1])
    expect(handlers.length).toBeGreaterThan(1)
    for (const body of handlers) {
      expect(body, `a button in the reveal does something other than open the paywall:\n${body}`)
        .toContain("setShowPaywall(true)")
    }
  })

  it("takes no completion callback that could route around the wall", () => {
    expect(reveal).not.toContain("onDone")
  })

  it("renders its paywall as required and undismissable", () => {
    expect(reveal).toMatch(/<PaywallModal[^>]*\brequired\b/)
    expect(reveal).toMatch(/onClose=\{\(\) => \{\}\}/)
  })
})
