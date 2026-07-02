import { Suspense, lazy, type CSSProperties } from "react"

/*
 * Lara orb — a 3D animated sphere for hero moments (onboarding, plan reveal,
 * session complete, today's-session hero). The heavy three.js renderer is
 * lazy-loaded as its own chunk; until it loads (or where WebGL is missing)
 * the matching CSS orb shows, so there's never a blank or a layout shift.
 */

const Orb3D = lazy(() => import("@/components/LaraOrb3D"))

function cssOrb(size: number): CSSProperties {
  return {
    width: size,
    height: size,
    borderRadius: "50%",
    background: "radial-gradient(circle at 32% 28%, #fff, #D92E10 40%, #7C3AED 92%)",
    boxShadow: "0 8px 26px -4px rgba(124,58,237,0.5), inset 0 0 0 2px rgba(255,255,255,0.3)",
  }
}

export default function LaraOrb({ size = 96 }: { size?: number }) {
  return (
    <Suspense fallback={<div style={cssOrb(size)} aria-hidden />}>
      <Orb3D size={size} />
    </Suspense>
  )
}
