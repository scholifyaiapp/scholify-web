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
