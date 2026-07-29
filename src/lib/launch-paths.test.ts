import { describe, it, expect } from "vitest"
import { signInPath, signUpPath } from "@/lib/launch"
import { PRELAUNCH_MODE } from "@/lib/launch"

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
