import { useId, type CSSProperties } from "react"

/*
 * Scholify brand identity v1.0 — the hexagonal circuit mark and wordmark.
 * Source of truth: the brand board ("Scholify logo design brief") and
 * docs/03-design-bible.md §0. One arm rotated six times (60°); waypoint
 * nodes at every turn; gradient Deep Red #C80000 → Magenta #E50068.
 *
 * Rules: never stretch, recolor off-brand, add shadows/3D, or render
 * below 16px. Clear space = one node diameter on every side.
 */

export type MarkVariant = "gradient" | "ink" | "white" | "red"

const VARIANT_COLOR: Record<Exclude<MarkVariant, "gradient">, string> = {
  ink: "#14141A",
  white: "#FAFAF7",
  red: "#C80000",
}

export function ScholifyMark({
  size = 24,
  // MONO / DEEP RED is the primary variant (founder decision 2026-07-09);
  // gradient remains available for special surfaces.
  variant = "red",
  style,
}: {
  size?: number
  variant?: MarkVariant
  style?: CSSProperties
}) {
  const uid = useId().replace(/:/g, "")
  const gradId = `sgrad-${uid}`
  const armId = `sarm-${uid}`
  const paint = variant === "gradient" ? `url(#${gradId})` : VARIANT_COLOR[variant]

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" role="img" aria-label="Scholify" style={{ flexShrink: 0, display: "block", ...style }}>
      <defs>
        {variant === "gradient" && (
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#C80000" />
            <stop offset="1" stopColor="#E50068" />
          </linearGradient>
        )}
        <g id={armId} fill={paint} stroke={paint} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="71" cy="46" r="5.5" stroke="none" />
          <path fill="none" d="M 79,46 L 123,46 L 133,63" />
          <path fill="none" d="M 89,57 L 114,57" />
          <circle cx="133" cy="63" r="4" stroke="none" />
        </g>
      </defs>
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <use key={deg} href={`#${armId}`} transform={`rotate(${deg} 100 100)`} />
      ))}
    </svg>
  )
}

/**
 * The wordmark — Plus Jakarta Sans Bold, −2% tracking, with the brand's
 * signature glyph: the dot of the "i" is a gradient circuit node.
 */
export function ScholifyWordmark({
  size = 18,
  color = "#14141A",
  style,
}: {
  size?: number
  color?: string
  style?: CSSProperties
}) {
  return (
    <span
      style={{
        fontWeight: 700,
        fontSize: size,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        color,
        whiteSpace: "nowrap",
        ...style,
      }}
      aria-label="Scholify"
    >
      Schol
      <span style={{ position: "relative", display: "inline-block" }} aria-hidden>
        {"ı"}
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "0.09em",
            transform: "translateX(-50%)",
            width: "0.16em",
            height: "0.16em",
            borderRadius: "50%",
            background: "#C80000",
          }}
        />
      </span>
      fy
    </span>
  )
}

/** The standard lockup: mark + wordmark, spacing keyed to the mark size. */
export function ScholifyLockup({
  size = 26,
  variant = "red",
  color = "#14141A",
  wordmark = true,
  style,
}: {
  size?: number
  variant?: MarkVariant
  color?: string
  wordmark?: boolean
  style?: CSSProperties
}) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: Math.round(size * 0.34), ...style }}>
      <ScholifyMark size={size} variant={variant} />
      {wordmark && <ScholifyWordmark size={Math.max(15, Math.round(size * 0.68))} color={color} />}
    </span>
  )
}
