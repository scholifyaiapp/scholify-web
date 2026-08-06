import type { VercelRequest, VercelResponse } from "@vercel/node"

/*
 * Ops endpoint — health + security introspection. Dispatches by `?action=` to
 * stay under the 12-function cap on the Hobby plan.
 *
 *   GET /api/health          → /api/social?action=health   (vercel.json rewrite)
 *   GET /api/security-check  → /api/social?action=security (vercel.json rewrite)
 *
 * Both are deliberately public (uptime monitors call them) and return BOOLEANS
 * ONLY — never a key value.
 *
 * REMOVED 2026-07-14 — `partner-invite`, `team-invite` and `leaderboard`.
 * They were vocab-era growth endpoints with NO caller left anywhere in the app,
 * and they took no auth: anyone could POST and have us send up to 100 emails per
 * request FROM OUR VERIFIED SENDING DOMAIN, with an attacker-controlled sender
 * name, body and destination link. That is branded phishing at our expense and a
 * blacklisted domain right when launch deliverability matters most. Dead code
 * that can still be called is not dead — so it is gone, not merely disabled.
 * (`leaderboard` also returned raw user ids to anonymous callers.)
 */

/**
 * Which Stripe MODE a key belongs to, from its prefix alone.
 *
 * Exported so it can be tested directly: telling live from test is the difference
 * between collecting money and only appearing to, and it must never be decided by
 * a guess. Returns null for an absent or unrecognised key rather than assuming
 * either mode - failing to "unknown" is safe, defaulting to "live" would not be.
 *
 * Only the derived mode is ever returned to a caller; no key material is exposed.
 */
export function stripeKeyMode(raw: string | undefined): "live" | "test" | null {
  if (!raw) return null
  if (/^(sk|rk)_live_/.test(raw) || /^pk_live_/.test(raw)) return "live"
  if (/^(sk|rk)_test_/.test(raw) || /^pk_test_/.test(raw)) return "test"
  return null
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const action = String((req.query.action || (req.body as Record<string, unknown> | undefined)?.action) || "")
    .trim()
    .toLowerCase()

  if (action === "health") return health(req, res)
  if (action === "security") return securityCheck(req, res)

  res.status(400).json({ error: "Unknown action. Use ?action=health | security." })
}

/* ── Health check ────────────────────────────────────────────────────────
 * Reachable at /api/health via a vercel.json rewrite. Reports which env keys
 * are configured server-side — values are NEVER returned, only booleans.
 * 503 when a critical key is missing so uptime monitors can alert.
 */
function health(_req: VercelRequest, res: VercelResponse): void {
  res.setHeader("Cache-Control", "no-store")
  const keys = {
    anthropic: !!process.env.ANTHROPIC_API_KEY,
    // OpenAI is only a TEMPORARY bridge for when the Anthropic org is unavailable
    // (see api/lara.ts callModel). Either provider satisfies the AI requirement.
    openai: !!process.env.OPENAI_API_KEY,
    supabase_url: !!(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL),
    supabase_anon: !!(process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY),
    supabase_service: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    resend: !!process.env.RESEND_API_KEY,
    // The API key alone does not send an email. Every sender in api/ resolves its
    // FROM address from FEEDBACK_FROM || REMINDER_FROM and THROWS without one, so a
    // key-only setup means partner emails, feedback receipts and study reminders all
    // fail while health still reported "ok". That is billing config's exact failure
    // shape - half-set is the dangerous state - so it is checked as first-class.
    email_from: !!(process.env.FEEDBACK_FROM || process.env.REMINDER_FROM),
    posthog: !!process.env.VITE_POSTHOG_KEY,
    cron_secret: !!process.env.CRON_SECRET,
    google_client: !!process.env.VITE_GOOGLE_CLIENT_ID,
    google_secret: !!process.env.GOOGLE_CLIENT_SECRET,
    google_redirect: !!process.env.VITE_GOOGLE_REDIRECT_URI,
    paddle: !!process.env.VITE_PADDLE_TOKEN,
    paddle_webhook: !!process.env.PADDLE_WEBHOOK_SECRET,
    paddle_api: !!process.env.PADDLE_API_KEY,
    // The three price ids are VITE_-named because the checkout needs them in the
    // client — but api/paddle.ts `planForPrice` also reads them SERVER-side to
    // turn a webhook into an entitlement. Ship them client-only and every
    // payment succeeds while no one is ever granted their plan. So they are
    // health-checked as first-class billing config.
    paddle_price_beginner_monthly: !!process.env.VITE_PADDLE_BEGINNER_MONTHLY,
    paddle_price_pro_monthly: !!process.env.VITE_PADDLE_PRO_MONTHLY,
    paddle_price_annual_pro: !!process.env.VITE_PADDLE_ANNUAL_PRO,
    // Stripe — the international/card rail (Flowlify LLC). The publishable key is
    // the client's "billing live?" flag; the rest are server-side.
    stripe_secret: !!process.env.STRIPE_SECRET_KEY,
    stripe_webhook: !!process.env.STRIPE_WEBHOOK_SECRET,
    stripe_publishable: !!process.env.VITE_STRIPE_PUBLISHABLE_KEY,
    stripe_price_beginner: !!process.env.STRIPE_PRICE_BEGINNER,
    stripe_price_beginner_annual: !!process.env.STRIPE_PRICE_BEGINNER_ANNUAL,
    stripe_price_pro: !!process.env.STRIPE_PRICE_PRO,
    stripe_price_annual: !!process.env.STRIPE_PRICE_ANNUAL,
  }

  // A billing rail is "live" only when its WHOLE stack is set — a half-set stack
  // is the dangerous state (checkout opens, fulfilment silently can't), so it
  // fails health loudly. Either rail (Stripe or Paddle) fully set = billing live.
  const stripeStack = [
    keys.stripe_secret,
    keys.stripe_webhook,
    keys.stripe_publishable,
    keys.stripe_price_beginner,
    keys.stripe_price_beginner_annual,
    keys.stripe_price_pro,
    keys.stripe_price_annual,
  ]
  const paddleStack = [
    keys.paddle,
    keys.paddle_webhook,
    keys.paddle_api,
    keys.paddle_price_beginner_monthly,
    keys.paddle_price_pro_monthly,
    keys.paddle_price_annual_pro,
  ]
  const billingConfigured = stripeStack.every(Boolean) || paddleStack.every(Boolean)
  const billingHalfConfigured =
    [...stripeStack, ...paddleStack].some(Boolean) && !billingConfigured

  /*
   * Email is a two-part stack for the same reason billing is: the Resend key
   * without a FROM address sends nothing, and every sender THROWS rather than
   * degrading. So it gets its own verdict instead of letting a set key imply
   * working email.
   */
  const emailStatus = keys.resend && keys.email_from
    ? "live"
    : keys.resend || keys.email_from
      ? "half_configured"
      : "not_configured"

  /*
   * Stripe LIVE vs TEST mode.
   *
   * "billing: live" above means CONFIGURED, not "collecting real money" - and the
   * two look identical from outside. A test-mode secret key gives a working
   * checkout, a Stripe dashboard full of payments and not one cent in the bank.
   * Nothing in the app surfaced that, so the question "if a user pays, does it
   * reach our account?" had no answer anywhere.
   *
   * Key PREFIXES are safe to inspect - they are metadata, not secret material -
   * and only the derived mode is ever returned. A MISMATCH between the secret and
   * the publishable key is reported separately because it is the worst case: the
   * client believes one mode while the server uses the other.
   */
  const secretMode = stripeKeyMode(process.env.STRIPE_SECRET_KEY)
  const publishableMode = stripeKeyMode(process.env.VITE_STRIPE_PUBLISHABLE_KEY)
  const stripeModeMismatch = !!secretMode && !!publishableMode && secretMode !== publishableMode

  const coreReady =
    (keys.anthropic || keys.openai) && keys.supabase_url && keys.supabase_anon && keys.supabase_service
  // A half-configured email stack, or a live/test key mismatch, each fail health
  // LOUDLY for the same reason a half-configured billing stack does: the app looks
  // healthy while a user-visible promise silently breaks.
  const ok =
    coreReady && !billingHalfConfigured && emailStatus !== "half_configured" && !stripeModeMismatch

  res.status(ok ? 200 : 503).json({
    status: ok ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    billing: billingConfigured ? "live" : billingHalfConfigured ? "half_configured" : "not_configured",
    // "billing" answers "is it configured?"; "stripe_mode" answers "is it real money?".
    stripe_mode: secretMode ?? "unknown",
    stripe_publishable_mode: publishableMode ?? "unknown",
    email: emailStatus,
    // Which provider is actually serving Charles. Anthropic is the intended one and
    // OpenAI is only a temporary bridge (see api/lara.ts callModel), so running on
    // the bridge is worth seeing here rather than discovering later.
    ai_provider: keys.anthropic ? "anthropic" : keys.openai ? "openai" : null,
    calendar:
      keys.google_client && keys.google_secret && keys.google_redirect
        ? "live"
        : "not_configured",
    ...(billingHalfConfigured
      ? {
          error:
            "Billing is half-configured: checkout will open but the webhook cannot grant plans. Set the ENTIRE Stripe (or Paddle) stack — secret + webhook secret + publishable + all 3 price ids.",
        }
      : {}),
    ...(stripeModeMismatch
      ? {
          stripe_mode_error:
            "Stripe key MODE MISMATCH: the secret key and the publishable key are from different Stripe modes (one live, one test). Checkout will fail or charge in the wrong mode. Both must come from the same mode.",
        }
      : {}),
    ...(secretMode === "test"
      ? {
          stripe_mode_warning:
            "Stripe is in TEST mode. Checkout works and payments appear in the Stripe dashboard, but NO REAL MONEY is collected. Move STRIPE_SECRET_KEY, VITE_STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET and all four price ids to their live-mode equivalents before taking customers.",
        }
      : {}),
    ...(emailStatus === "half_configured"
      ? {
          email_error:
            "Email is half-configured: RESEND_API_KEY and a FROM address (FEEDBACK_FROM or REMINDER_FROM) are BOTH required. Without the FROM address, partner emails, feedback receipts and study reminders all throw.",
        }
      : {}),
    keys,
  })
}

/* ── Security check ──────────────────────────────────────────────────────
 * Reachable at /api/security-check via a vercel.json rewrite. Confirms the
 * secret keys live server-side. Booleans only — never the key values.
 */
function securityCheck(_req: VercelRequest, res: VercelResponse): void {
  res.setHeader("Cache-Control", "no-store")
  res.status(200).json({
    anthropic_configured: !!process.env.ANTHROPIC_API_KEY,
    openai_configured: !!process.env.OPENAI_API_KEY,
    ai_configured: !!(process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY),
    ai_provider: process.env.ANTHROPIC_API_KEY
      ? "anthropic"
      : process.env.OPENAI_API_KEY
        ? "openai"
        : null,
    supabase_configured: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    // Booleans and a derived mode only - never key material. See health() for why
    // the MODE matters more than the presence of a key.
    email_configured: !!(
      process.env.RESEND_API_KEY && (process.env.FEEDBACK_FROM || process.env.REMINDER_FROM)
    ),
    stripe_mode: /^(sk|rk)_live_/.test(process.env.STRIPE_SECRET_KEY || "")
      ? "live"
      : /^(sk|rk)_test_/.test(process.env.STRIPE_SECRET_KEY || "")
        ? "test"
        : "unknown",
  })
}
