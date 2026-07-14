import posthog from "posthog-js"

/*
 * Product analytics — PostHog.
 *
 * Tracks the metrics that matter: onboarding completion, Day-3 retention,
 * paywall conversion. Everything is a no-op when VITE_POSTHOG_KEY is absent
 * (local dev / preview), so calls are always safe to make.
 */

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY

export const initAnalytics = () => {
  if (!POSTHOG_KEY) return
  posthog.init(POSTHOG_KEY, {
    api_host: "https://app.posthog.com",
    capture_pageview: true,
    persistence: "localStorage",
  })
  // Error tracking: unhandled throws and rejected promises land in PostHog with
  // a parsed stack, instead of only in the user's console.
  posthog.startExceptionAutocapture({
    capture_unhandled_errors: true,
    capture_unhandled_rejections: true,
    capture_console_errors: false,
  })
}

/*
 * Crash reporting. Called from both error boundaries and the global window
 * hooks, so a 2am exception leaves a trace instead of dying in a user's
 * console. Autocapture already sees unhandled throws, so identical reports
 * arriving within a couple of seconds (an error storm, or a hook firing
 * alongside autocapture) are collapsed into one.
 */
const recent = new Map<string, number>()
const DEDUPE_MS = 2000

/**
 * Report a crash. Always logs locally; ships to PostHog only when a key is
 * configured, so it is a safe no-op in dev/preview and in prod-without-a-key.
 */
export const captureError = (
  error: unknown,
  context?: Record<string, unknown>,
) => {
  const err =
    error instanceof Error ? error : new Error(String(error ?? "Unknown error"))

  const now = Date.now()
  const key = `${err.name}:${err.message}:${err.stack?.slice(0, 200) ?? ""}`
  const last = recent.get(key)
  if (last !== undefined && now - last < DEDUPE_MS) return
  recent.set(key, now)
  for (const [k, t] of recent) if (now - t > DEDUPE_MS) recent.delete(k)

  console.error("[scholify]", err, context ?? {})

  if (!POSTHOG_KEY) return
  try {
    posthog.captureException(err, context)
  } catch {
    // Reporting an error must never throw a second one.
  }
}

export const trackEvent = (
  event: string,
  properties?: Record<string, unknown>,
) => {
  if (!POSTHOG_KEY) return
  posthog.capture(event, properties)
}

export const identifyUser = (
  userId: string,
  properties: Record<string, unknown>,
) => {
  if (!POSTHOG_KEY) return
  posthog.identify(userId, properties)
}
