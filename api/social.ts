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
  }

  const billing = [
    keys.paddle,
    keys.paddle_webhook,
    keys.paddle_api,
    keys.paddle_price_beginner_monthly,
    keys.paddle_price_pro_monthly,
    keys.paddle_price_annual_pro,
  ]
  // Billing is all-or-nothing. Nothing set = pre-launch, and the app degrades to
  // "payments open soon" by design. Everything set = live. ANYTHING IN BETWEEN
  // is the dangerous state — checkout renders but fulfilment silently can't —
  // so a half-configured billing stack fails the health check loudly.
  const billingConfigured = billing.every(Boolean)
  const billingHalfConfigured = billing.some(Boolean) && !billingConfigured

  const coreReady =
    keys.anthropic && keys.supabase_url && keys.supabase_anon && keys.supabase_service
  const ok = coreReady && !billingHalfConfigured

  res.status(ok ? 200 : 503).json({
    status: ok ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    billing: billingConfigured ? "live" : billingHalfConfigured ? "half_configured" : "not_configured",
    ...(billingHalfConfigured
      ? {
          error:
            "Billing is half-configured: checkout will open but the webhook cannot grant plans. Set every VITE_PADDLE_* price id server-side too.",
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
