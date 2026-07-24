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
    posthog: !!process.env.VITE_POSTHOG_KEY,
    cron_secret: !!process.env.CRON_SECRET,
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

  const coreReady =
    (keys.anthropic || keys.openai) && keys.supabase_url && keys.supabase_anon && keys.supabase_service
  const ok = coreReady && !billingHalfConfigured

  res.status(ok ? 200 : 503).json({
    status: ok ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    billing: billingConfigured ? "live" : billingHalfConfigured ? "half_configured" : "not_configured",
    ...(billingHalfConfigured
      ? {
          error:
            "Billing is half-configured: checkout will open but the webhook cannot grant plans. Set the ENTIRE Stripe (or Paddle) stack — secret + webhook secret + publishable + all 3 price ids.",
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
    supabase_configured: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  })
}
