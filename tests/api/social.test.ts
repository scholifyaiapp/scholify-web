import { describe, it, expect } from "vitest"
import { configuredAiProvider, stripeKeyMode } from "../../api/social.js"

/*
 * Stripe key MODE detection.
 *
 * This decides whether /api/health tells the founder "you are collecting real
 * money" or "you are in test mode and collecting nothing". Before this existed,
 * health reported `billing: "live"` whenever the whole Stripe stack was SET — which
 * is true of a test-mode stack too. A test key gives a working checkout, a Stripe
 * dashboard full of payments, and an empty bank account, and nothing anywhere in
 * the app distinguished the two.
 *
 * So the two properties that matter are tested explicitly: it must recognise every
 * key shape Stripe issues, and it must fail to "unknown" rather than guessing —
 * defaulting an unrecognised key to "live" would restore exactly the false
 * reassurance this function exists to remove.
 */

describe("stripeKeyMode", () => {
  it("recognises live secret, restricted and publishable keys", () => {
    expect(stripeKeyMode("sk_live_abc123")).toBe("live")
    expect(stripeKeyMode("rk_live_abc123")).toBe("live")
    expect(stripeKeyMode("pk_live_abc123")).toBe("live")
  })

  it("recognises test secret, restricted and publishable keys", () => {
    expect(stripeKeyMode("sk_test_abc123")).toBe("test")
    expect(stripeKeyMode("rk_test_abc123")).toBe("test")
    expect(stripeKeyMode("pk_test_abc123")).toBe("test")
  })

  it("returns null for an absent key rather than assuming a mode", () => {
    expect(stripeKeyMode(undefined)).toBeNull()
    expect(stripeKeyMode("")).toBeNull()
  })

  it("returns null for an unrecognised key shape — failing to unknown, never to live", () => {
    for (const bad of [
      "whsec_abc123", // a webhook secret, not an API key
      "price_abc123", // a price id pasted into the wrong variable
      "sk_abc123", // no mode segment at all
      "SK_LIVE_ABC", // Stripe prefixes are lowercase
      " sk_live_abc", // a stray leading space is not a live key
      "not-a-key",
    ]) {
      expect(stripeKeyMode(bad), bad).toBeNull()
    }
  })

  it("distinguishes the two modes, which is the whole point", () => {
    expect(stripeKeyMode("sk_live_x")).not.toBe(stripeKeyMode("sk_test_x"))
  })
})

describe("configuredAiProvider", () => {
  it("reports OpenAI when both keys exist because OpenAI is primary", () => {
    expect(configuredAiProvider(true, true)).toBe("openai")
  })

  it("falls back to Anthropic only when OpenAI is absent", () => {
    expect(configuredAiProvider(false, true)).toBe("anthropic")
    expect(configuredAiProvider(false, false)).toBeNull()
  })
})
