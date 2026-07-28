import { motion, useReducedMotion } from "motion/react"
import { Fragment, type CSSProperties, type ReactNode } from "react"

/*
 * Onboarding UI kit — the premium surface for /welcome.
 *
 * Three pieces, all built to the same motion contract:
 *
 *   GlassButton      Apple-style glass control, matching the landing page's
 *                    nav bar (ui/nav-header.tsx) so onboarding and marketing
 *                    speak with one visual voice.
 *   AnimatedHeadline Word-by-word reveal for the welcome sentences.
 *   RouteLoop        The Scholify cycle drawn as a cycle — measure, assign,
 *                    recalculate — with Pass as the exit condition at its centre.
 *
 * MOTION CONTRACT (applies to everything here)
 *  · transform and opacity ONLY — never width/height/top/left, which force
 *    layout on every frame and cause the jank this app has already been
 *    audited for.
 *  · Spring physics over cubic-beziers for anything that should feel physical;
 *    entrances 260-420ms, exits ~65% of that so dismissal feels responsive.
 *  · Stagger 40-55ms per item. Faster reads as a flicker, slower as a wait.
 *  · prefers-reduced-motion is honoured by EVERY component: the final visual
 *    state renders immediately, with no transform and no infinite loops. This
 *    is an accessibility requirement, not a nicety — vestibular disorders make
 *    perspective motion genuinely unpleasant.
 *  · Nothing here animates layout-affecting properties, so onboarding cannot
 *    introduce CLS.
 */

/* Brand tokens — Scholify Brand Board (Visual Identity). */
const INK = "#14141A"
const RED = "#C80000"
const MAGENTA = "#E50068"
const GOLD = "#F4A405"
const MUTE = "#6B6B76"
const SANS = "'Plus Jakarta Sans', system-ui, sans-serif"
const MONO = "'JetBrains Mono', ui-monospace, monospace"

/* ── GlassButton ─────────────────────────────────────────────────
 *
 * The landing nav bar's material: a translucent white pill over a heavy
 * backdrop blur, a hairline border, and an inset top highlight that reads as a
 * lit edge. That top highlight is what makes it look like glass rather than a
 * grey rectangle — it is the whole trick, so it is present on every variant.
 *
 * Height is fixed at 48px (>= the 44px minimum touch target) rather than
 * derived from padding, so a label of any length keeps the same tappable box.
 */

type GlassVariant = "primary" | "ghost"

export function GlassButton({
  children,
  onClick,
  disabled,
  variant = "primary",
  full,
  big,
  type = "button",
  ariaLabel,
  style,
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: GlassVariant
  full?: boolean
  big?: boolean
  type?: "button" | "submit"
  ariaLabel?: string
  style?: CSSProperties
}) {
  const reduce = useReducedMotion()
  const primary = variant === "primary"

  const base: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    minHeight: big ? 54 : 48,
    padding: big ? "0 30px" : "0 22px",
    width: full ? "100%" : undefined,
    borderRadius: 999,
    font: `${primary ? 800 : 700} ${big ? 15.5 : 14.5}px/1 ${SANS}`,
    letterSpacing: "-0.01em",
    cursor: disabled ? "default" : "pointer",
    // Disabled sits at 0.45 — visibly inert, still legible. Never hidden.
    opacity: disabled ? 0.45 : 1,
    // `manipulation` drops the 300ms tap delay mobile browsers add.
    touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",
    overflow: "hidden",
    isolation: "isolate",
  }

  const skin: CSSProperties = primary
    ? {
        color: "#fff",
        border: "1px solid rgba(200,0,0,.55)",
        background: `linear-gradient(135deg, ${RED} 0%, #D51436 55%, ${MAGENTA} 100%)`,
        boxShadow: disabled
          ? "none"
          : "inset 0 1px 0 rgba(255,255,255,.32), 0 10px 26px -10px rgba(200,0,0,.55), 0 1px 3px rgba(20,20,26,.10)",
      }
    : {
        color: INK,
        border: "1px solid rgba(20,20,26,.08)",
        background: "rgba(255,255,255,.58)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,.85), 0 8px 24px -8px rgba(20,20,26,.08), 0 1px 3px rgba(20,20,26,.04)",
      }

  return (
    <motion.button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      // Scale only — the skill's press-feedback range, and the one transform
      // that cannot disturb neighbouring layout.
      whileTap={disabled || reduce ? undefined : { scale: 0.975 }}
      whileHover={disabled || reduce ? undefined : { y: -1 }}
      transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.5 }}
      style={{ ...base, ...skin, ...style }}
    >
      {/* Specular sweep across the top third — the lit-glass read. Pointer
          events off so it can never swallow the click. */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: primary
            ? "linear-gradient(180deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,0) 46%)"
            : "linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,0) 52%)",
          pointerEvents: "none",
        }}
      />
      <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 9 }}>{children}</span>
    </motion.button>
  )
}

/* ── AnimatedHeadline ────────────────────────────────────────────
 *
 * Reveals a sentence word by word. Each word is an inline-block wrapped in an
 * overflow-hidden line box, so the words rise INTO view from behind their own
 * baseline rather than fading in place — the difference between "animated text"
 * and text that feels typeset.
 *
 * Word boundaries, never characters: per-character staggering on a 40-character
 * headline reads as a slot machine, and screen readers announce the whole
 * string either way because the text stays intact in the DOM.
 */

export function AnimatedHeadline({
  text,
  delay = 0,
  style,
  as = "h1",
}: {
  text: string
  delay?: number
  style?: CSSProperties
  as?: "h1" | "h2"
}) {
  const reduce = useReducedMotion()
  const words = text.split(" ")
  const Tag = as

  if (reduce) return <Tag style={{ margin: 0, ...style }}>{text}</Tag>

  return (
    <Tag style={{ margin: 0, ...style }} aria-label={text}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            aria-hidden
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
              // Descenders (g, y, p) sit below the baseline and the overflow
              // clip would shave them off without this.
              paddingBottom: "0.08em",
            }}
          >
            <motion.span
              initial={{ y: "108%" }}
              animate={{ y: 0 }}
              transition={{
                delay: delay + index * 0.045,
                type: "spring",
                stiffness: 260,
                damping: 26,
                mass: 0.7,
              }}
              style={{ display: "inline-block", willChange: "transform" }}
            >
              {word}
            </motion.span>
          </span>
          {/* A REAL space BETWEEN the wrappers, not inside them. Adjacent
              inline-blocks with no whitespace between them give the browser no
              soft-wrap opportunity, so the headline would overflow rather than
              wrap — on a 375px phone that means horizontal scroll. */}
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  )
}

/* ── RouteLoop ───────────────────────────────────────────────────
 *
 * The Scholify loop, drawn as a loop.
 *
 * This replaced a left-to-right rail that ended at "Pass". The rail was the
 * wrong diagram. It described a one-way journey, when the product is a CYCLE —
 * measure, assign, recalculate — that repeats until the learner passes. Read as
 * a line it implies you sit the diagnostic once and move on, which is exactly
 * the misunderstanding this slide exists to prevent.
 *
 * Three stages sit ON the ring because they ARE the repeating mechanism. Pass
 * sits INSIDE it because it is not a fourth stage: it is the exit condition the
 * loop converges on. A rail had to put Pass at the end, which made it look like
 * one more task to complete rather than the thing that stops the cycle.
 *
 * COLOUR ENCODES ROLE, NOT IDENTITY
 *  · The three ring stages are deliberately identical — white disc, red glyph,
 *    ink label. They are the same KIND of thing, and the rail's three different
 *    hues implied they differed in kind.
 *  · The ring track is a single flat tone. A gradient would have been wrong
 *    here: a gradient has a start and an end, which is the one thing a loop does
 *    not have. Direction is carried by arrowheads and the travelling dot instead.
 *  · Gold is reserved for the single thing that IS different — the goal. Its
 *    text sits at 6.82:1 on the amber range (see PASS_INK), so the payoff node
 *    is also the most legible one.
 *
 * Drawn as one SVG so it scales exactly at any width and needs no percentage
 * arithmetic to keep labels on their nodes. role="img" with a sentence-long
 * label, because four separate text nodes announce as disconnected fragments
 * and the RELATIONSHIP between them is the entire content.
 */

/*
 * The Pass node's palette.
 *
 * White text on the old gold→magenta fill measured 2.07:1 against the gold stop,
 * against a 4.5:1 floor, on the most important element of the slide. Holding the
 * gradient inside the amber range and putting DARK text on it gives 6.82:1 at
 * its worst — and reads as a medal rather than as a warning, which is the note
 * this node wants anyway.
 */
const PASS_INK = "#14141A" // 6.82:1 at the worst amber stop
const PASS_SUB = "#3A2A05" // 5.16:1 at the worst amber stop

/* Glyph geometry, in the shared 24x24 space. Rendered as <g> children rather
   than nested <svg> so they inherit the parent's stroke and scale cleanly. */
function Glyph({ kind }: { kind: StageKind }) {
  if (kind === "crosshair")
    return (
      <>
        <circle cx="12" cy="12" r="6.4" />
        <path d="M12 2.2v3.2M12 18.6v3.2M2.2 12h3.2M18.6 12h3.2" />
      </>
    )
  if (kind === "checklist")
    return <path d="M3.2 6.6l2.5 2.5L10.3 4.5M3.2 17.4l2.5 2.5 4.6-4.6M13.8 6.9h7M13.8 17.7h7" />
  return (
    <>
      <circle cx="12" cy="13.7" r="7.4" />
      <path d="M12 13.7V10M9.5 2.6h5" />
    </>
  )
}

type StageKind = "crosshair" | "checklist" | "stopwatch"

/* Clockwise from the top. The angles are what place both the disc and its label,
   so the two cannot drift apart. */
const LOOP_STAGES: { kind: StageKind; label: string; angle: number }[] = [
  { kind: "crosshair", label: "Diagnostic", angle: -90 },
  { kind: "checklist", label: "Daily missions", angle: 30 },
  { kind: "stopwatch", label: "Mocks", angle: 150 },
]

/* Geometry, in viewBox units. */
const CX = 120
const CY = 98
const R = 62
const DISC = 17

/* One full revolution of the travelling dot. Nine seconds reads as a steady
   process; the 3.2s of the old linear sweep would be dizzying on a circle. */
const ORBIT = 9

const rad = (deg: number) => (deg * Math.PI) / 180
const px = (deg: number) => CX + R * Math.cos(rad(deg))
const py = (deg: number) => CY + R * Math.sin(rad(deg))

/* Arrowheads sit midway between consecutive stages. Position uses the angle;
   rotation is angle + 90, which is the clockwise tangent at that point. */
const ARROWS = [-30, 90, 210]

/* Where the travelling dot sits at rest, and where its orbit begins: -60deg,
   clear of both the Diagnostic disc at -90 and the first arrowhead at -30. */
const DOT_X = Number((R * Math.cos(rad(-60))).toFixed(2))
const DOT_Y = Number((R * Math.sin(rad(-60))).toFixed(2))

export function RouteLoop({ style }: { style?: CSSProperties }) {
  const reduce = useReducedMotion()

  return (
    <div style={style}>
      <div style={{ width: "100%", maxWidth: 330, margin: "0 auto" }}>
        <svg
          viewBox="0 0 240 196"
          style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
          role="img"
          aria-label="The Scholify loop: a diagnostic measures where you are, daily missions work your weakest areas, mocks test you under exam conditions, and the cycle then repeats with a fresh diagnostic. It keeps going until you pass."
        >
          <defs>
            <linearGradient id="scholify-pass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFCC55" />
              <stop offset="52%" stopColor={GOLD} />
              <stop offset="100%" stopColor="#E08A07" />
            </linearGradient>
          </defs>

          {/* Ring track — one flat tone, for the reason given in the header. */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(200,0,0,.14)" strokeWidth="2.5" />

          {/* Direction of travel. */}
          {ARROWS.map((angle) => (
            <path
              key={angle}
              d="M-4.2,-3.4 L4.2,0 L-4.2,3.4 Z"
              fill="rgba(200,0,0,.42)"
              transform={"translate(" + px(angle).toFixed(2) + " " + py(angle).toFixed(2) + ") rotate(" + (angle + 90) + ")"}
            />
          ))}

          {/* Pass — inside the ring, because it is the exit condition. */}
          <circle cx={CX} cy={CY} r="31" fill="url(#scholify-pass)" stroke="rgba(179,117,3,.5)" strokeWidth="1" />
          <g transform={"translate(" + (CX - 7.92) + " " + (CY - 17) + ") scale(0.66)"} fill="none" stroke={PASS_SUB} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5.6 21.4V3M5.6 4.2h11.8l-2.2 4.4 2.2 4.4H5.6" />
          </g>
          <text
            x={CX}
            y={CY + 13}
            textAnchor="middle"
            style={{ font: "800 12px " + SANS, letterSpacing: "-0.02em", fill: PASS_INK }}
          >
            Pass
          </text>

          {/* The three stages. Identical by design — see COLOUR ENCODES ROLE. */}
          {LOOP_STAGES.map((stage, index) => {
            const x = px(stage.angle)
            const y = py(stage.angle)
            const above = stage.angle === -90
            const words = stage.label.split(" ")
            return (
              <motion.g
                key={stage.label}
                initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={reduce ? { duration: 0 } : { delay: 0.2 + index * 0.11, type: "spring", stiffness: 260, damping: 22 }}
                style={{ transformOrigin: x.toFixed(2) + "px " + y.toFixed(2) + "px" }}
              >
                <circle cx={x} cy={y} r={DISC} fill="#fff" stroke="rgba(20,20,26,.10)" strokeWidth="1" />
                <circle cx={x} cy={y} r={DISC} fill="none" stroke="rgba(200,0,0,.22)" strokeWidth="1.4" />
                <g
                  transform={"translate(" + (x - 9.36) + " " + (y - 9.36) + ") scale(0.78)"}
                  fill="none"
                  stroke={RED}
                  strokeWidth="2.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <Glyph kind={stage.kind} />
                </g>
                {words.map((word, w) => (
                  <text
                    key={word}
                    x={x}
                    y={above ? y - DISC - 16 + w * 11 : y + DISC + 14 + w * 11}
                    textAnchor="middle"
                    style={{ font: "750 10.5px " + SANS, letterSpacing: "-0.01em", fill: INK }}
                  >
                    {word}
                  </text>
                ))}
              </motion.g>
            )
          })}

          {/* The learner travelling the loop. Rotated about the ring centre by
              nesting inside a translate, so the origin is the local (0,0) —
              px transform-origin on an SVG group is far less dependable.

              It STARTS at -60deg, between Diagnostic and the first arrowhead,
              rather than at the top. At the top it began life sitting exactly
              under the Diagnostic disc, which read as a red blob over the glyph
              instead of as a dot on the ring — and that is also where it rests
              under reduced motion, so the collision was permanent there. */}
          <g transform={"translate(" + CX + " " + CY + ")"}>
            {reduce ? (
              <circle cx={DOT_X} cy={DOT_Y} r="4.4" fill={RED} />
            ) : (
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: ORBIT, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "0px 0px", willChange: "transform" }}
              >
                <circle cx={DOT_X} cy={DOT_Y} r="7" fill={RED} opacity="0.16" />
                <circle cx={DOT_X} cy={DOT_Y} r="4.4" fill={RED} />
              </motion.g>
            )}
          </g>
        </svg>

        <p
          style={{
            margin: "6px 0 0",
            textAlign: "center",
            font: "500 11.5px/1.4 " + SANS,
            color: MUTE,
          }}
        >
          The loop recalculates every day — until you pass.
        </p>
      </div>
    </div>
  )
}
