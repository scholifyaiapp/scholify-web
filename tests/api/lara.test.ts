import { describe, it, expect, afterEach } from "vitest"
import { trialActive, envInt, aiProvider } from "../../api/lara.js"

/*
 * The server-side trial gate for AI metering. A trial grants Pro-level AI caps,
 * so getting this wrong means either giving a lapsed-trial user unlimited Pro AI
 * (real cost) or throttling a legitimate trial user. It must mirror the client
 * entitlement helper exactly, and — crucially — an EXPIRED trial must read false.
 */

const NOW = Date.parse("2026-07-15T12:00:00Z")
const at = (deltaDays: number) => new Date(NOW + deltaDays * 86400000).toISOString()

describe("aiProvider", () => {
  const originalOpenAi = process.env.OPENAI_API_KEY
  const originalAnthropic = process.env.ANTHROPIC_API_KEY

  afterEach(() => {
    if (originalOpenAi === undefined) delete process.env.OPENAI_API_KEY
    else process.env.OPENAI_API_KEY = originalOpenAi
    if (originalAnthropic === undefined) delete process.env.ANTHROPIC_API_KEY
    else process.env.ANTHROPIC_API_KEY = originalAnthropic
  })

  it("prefers Anthropic when both keys exist — Charles is a Claude persona", () => {
    process.env.OPENAI_API_KEY = "openai-test-key"
    process.env.ANTHROPIC_API_KEY = "anthropic-test-key"
    expect(aiProvider()).toBe("anthropic")
  })

  it("falls back to OpenAI only when Anthropic is unavailable", () => {
    process.env.OPENAI_API_KEY = "openai-test-key"
    delete process.env.ANTHROPIC_API_KEY
    expect(aiProvider()).toBe("openai")
  })
})

describe("trialActive (metering)", () => {
  it("is true for a card-backed trial ending in the future", () => {
    expect(trialActive({ plan_status: "trialing", trial_ends_at: at(3) }, NOW)).toBe(true)
    expect(trialActive({ stripe_subscription_id: "sub_123", trial_ends_at: at(3) }, NOW)).toBe(true)
    expect(trialActive({ trial_grant: "manual", trial_ends_at: at(3) }, NOW)).toBe(true)
  })

  it("is FALSE for a trial with no card behind it — no free Pro AI on our spend", () => {
    // The orphan written by the retired /api/paddle?action=start-trial: a
    // 3-day Pro trial for a signed-in JWT with no payment method. Without this
    // the meter still hands those accounts Pro caps — 20 AI Examiner calls a
    // day, billed to us.
    expect(trialActive({ trial_started_at: at(-1), trial_ends_at: at(3) }, NOW)).toBe(false)
  })

  it("is false the instant the trial has passed — no free Pro AI after expiry", () => {
    expect(trialActive({ trial_ends_at: at(-1) }, NOW)).toBe(false)
    expect(trialActive({ trial_ends_at: at(0) }, NOW)).toBe(false)
  })

  it("is false when there is no trial at all", () => {
    expect(trialActive({}, NOW)).toBe(false)
    expect(trialActive(undefined, NOW)).toBe(false)
  })

  it("is false — never throws — on a malformed value", () => {
    for (const bad of ["", "later", 123, null]) {
      expect(trialActive({ trial_ends_at: bad as unknown as string }, NOW)).toBe(false)
    }
  })
})

/*
 * envInt reads the AI cost-governance dials (AI_DAILY_TOKEN_BUDGET,
 * AI_PER_MINUTE_LIMIT). It used to reject 0 as "invalid" and silently fall
 * back to the generous default — so an operator setting either to 0 as an
 * emergency spend-stop got the opposite of what they asked for.
 */
describe("envInt (AI cost-governance env vars)", () => {
  const VAR = "SCHOLIFY_TEST_ENV_INT"
  afterEach(() => {
    delete process.env[VAR]
  })

  it("honors an explicit 0 as a deliberate hard-off, not 'unset'", () => {
    process.env[VAR] = "0"
    expect(envInt(VAR, 999)).toBe(0)
  })

  it("falls back when the var is genuinely unset or empty", () => {
    delete process.env[VAR]
    expect(envInt(VAR, 999)).toBe(999)
    process.env[VAR] = ""
    expect(envInt(VAR, 999)).toBe(999)
  })

  it("falls back on a non-numeric or negative value", () => {
    process.env[VAR] = "not-a-number"
    expect(envInt(VAR, 999)).toBe(999)
    process.env[VAR] = "-5"
    expect(envInt(VAR, 999)).toBe(999)
  })

  it("parses a normal positive value", () => {
    process.env[VAR] = "42"
    expect(envInt(VAR, 999)).toBe(42)
  })
})
