import { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"

const CONSERVE_MOTION_QUERY = "(max-width: 820px), (pointer: coarse)"

function shouldConserveMotion() {
  return typeof window !== "undefined" && window.matchMedia(CONSERVE_MOTION_QUERY).matches
}

/**
 * Ambient loops are decoration, not product state. Keep them off on touch and
 * small-screen devices, honour the OS preference everywhere, and pause them
 * while the tab is hidden so returning to Scholify does not inherit a backlog
 * of animation work.
 */
export function useCalmMotion() {
  const prefersReducedMotion = useReducedMotion()
  const [conserveMotion, setConserveMotion] = useState(shouldConserveMotion)
  const [pageVisible, setPageVisible] = useState(() =>
    typeof document === "undefined" || document.visibilityState === "visible",
  )

  useEffect(() => {
    const query = window.matchMedia(CONSERVE_MOTION_QUERY)
    const onQueryChange = () => setConserveMotion(query.matches)
    const onVisibilityChange = () => setPageVisible(document.visibilityState === "visible")

    query.addEventListener("change", onQueryChange)
    document.addEventListener("visibilitychange", onVisibilityChange)
    onQueryChange()
    onVisibilityChange()

    return () => {
      query.removeEventListener("change", onQueryChange)
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [])

  return Boolean(prefersReducedMotion) || conserveMotion || !pageVisible
}

