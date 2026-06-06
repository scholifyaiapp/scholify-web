import { useCallback, useState } from "react"
import { readProgress } from "@/lib/scholify-data"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { trackEvent } from "@/lib/analytics"

/*
 * Paywall trigger logic.
 *
 * The streak-based triggers fire on dashboard load: first time the user
 * reaches a 7 / 14 / 21-day streak. "Shown" flags are tracked in
 * localStorage (with a best-effort Supabase `streaks` sync) so each
 * milestone modal only appears once.
 */

export type PaywallType = "streak7" | "streak14" | "streak21" | "feature" | "general"

const shownFlag = (n: number) => `scholify-paywall-shown-${n}`

function wasShown(n: number): boolean {
  try {
    return window.localStorage.getItem(shownFlag(n)) === "1"
  } catch {
    return false
  }
}

function markShown(n: number, userId?: string) {
  try {
    window.localStorage.setItem(shownFlag(n), "1")
  } catch {
    /* ignore */
  }
  // Best-effort server sync — non-fatal if the table doesn't exist.
  if (isSupabaseConfigured && userId) {
    const col = `paywall_shown_at_${n}`
    supabase
      .from("streaks")
      .update({ [col]: true })
      .eq("user_id", userId)
      .then(
        () => {},
        () => {},
      )
  }
}

export function usePaywall() {
  const [showPaywall, setShowPaywall] = useState(false)
  const [paywallType, setPaywallType] = useState<PaywallType>("general")

  /** Run on dashboard load — shows the highest unseen streak milestone. */
  const checkPaywallTrigger = useCallback((userId?: string) => {
    let streak = 0
    try {
      streak = readProgress().streak
    } catch {
      streak = 0
    }

    if (streak >= 21 && !wasShown(21)) {
      setPaywallType("streak21")
      setShowPaywall(true)
      markShown(21, userId)
      trackEvent("paywall_shown", { trigger: "streak_21" })
      return
    }
    if (streak >= 14 && !wasShown(14)) {
      setPaywallType("streak14")
      setShowPaywall(true)
      markShown(14, userId)
      trackEvent("paywall_shown", { trigger: "streak_14" })
      return
    }
    if (streak >= 7 && !wasShown(7)) {
      setPaywallType("streak7")
      setShowPaywall(true)
      markShown(7, userId)
      trackEvent("paywall_shown", { trigger: "streak_7" })
    }
  }, [])

  /** Open the paywall when a free user taps a Pro-only feature. */
  const triggerFeaturePaywall = useCallback(() => {
    setPaywallType("feature")
    setShowPaywall(true)
    trackEvent("paywall_shown", { trigger: "feature" })
  }, [])

  /** Open the generic "upgrade" paywall. */
  const triggerUpgrade = useCallback(() => {
    setPaywallType("general")
    setShowPaywall(true)
    trackEvent("paywall_shown", { trigger: "general" })
  }, [])

  const closePaywall = useCallback(() => {
    setShowPaywall(false)
    trackEvent("paywall_dismissed")
    try {
      window.localStorage.setItem("scholify-paywall-dismissed-at", String(Date.now()))
    } catch {
      /* ignore */
    }
  }, [])

  return {
    showPaywall,
    paywallType,
    checkPaywallTrigger,
    triggerFeaturePaywall,
    triggerUpgrade,
    closePaywall,
  }
}
