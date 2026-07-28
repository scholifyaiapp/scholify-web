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
 *   RouteJourney3D   The universal Scholify route in perspective — the same
 *                    journey every learner takes, whatever their starting point.
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

/* ── RouteJourney3D ──────────────────────────────────────────────
 *
 * The universal route: Diagnostic → Daily missions → Mocks → Pass. Every
 * learner walks the same four stages regardless of where they join, which is
 * the point this slide has to make in one glance — so the visual is deliberately
 * identical for all three onboarding routes.
 *
 * Built from CSS 3D rather than a canvas or WebGL: the whole thing is four
 * nodes and a track on a rotated plane, so a compositor-only implementation
 * gives real depth for no main-thread cost and no extra bytes. A WebGL scene
 * here would be heavier than the entire onboarding chunk.
 *
 * Depth comes from ONE perspective ancestor and per-node translateZ, so the
 * nodes genuinely sit at different distances rather than being faked with
 * scale. The track draws with scaleX (compositor) instead of width (layout).
 */

/*
 * Stage glyphs.
 *
 * These replace the plain 6px dot each stage used to carry. A dot said only
 * "here is an item"; a crosshair, a checklist, a stopwatch and a flag say what
 * the stage IS, which is the whole job of this slide — the learner reads the
 * shape of the route before they read a word of it.
 *
 * Drawn inline rather than pulled from components/acca/ui so the kit keeps no
 * dependency on the icon set, and stroked with round caps at 2.4 to match the
 * Scholify hexagon mark's own construction.
 */
const GLYPH = { fill: "none", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const

function Crosshair({ tone }: { tone: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden stroke={tone} {...GLYPH}>
      <circle cx="12" cy="12" r="6.5" />
      <path d="M12 1.8v3.4M12 18.8v3.4M1.8 12h3.4M18.8 12h3.4" />
    </svg>
  )
}

function Checklist({ tone }: { tone: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden stroke={tone} {...GLYPH}>
      <path d="M3 6.5l2.6 2.6L10.4 4.3M3 17.5l2.6 2.6 4.8-4.8M14 6.8h7M14 17.8h7" />
    </svg>
  )
}

function Stopwatch({ tone }: { tone: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden stroke={tone} {...GLYPH}>
      <circle cx="12" cy="13.6" r="7.6" />
      <path d="M12 13.6V9.8M9.4 2.4h5.2" />
    </svg>
  )
}

function Flag({ tone }: { tone: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden stroke={tone} {...GLYPH}>
      <path d="M5.6 21.4V3M5.6 4.2h11.8l-2.2 4.4 2.2 4.4H5.6" />
    </svg>
  )
}

const STAGES = [
  { label: "Diagnostic", detail: "Where you actually are", tint: RED, Glyph: Crosshair },
  { label: "Daily missions", detail: "One task at a time", tint: "#D51436", Glyph: Checklist },
  { label: "Mocks", detail: "Exam conditions", tint: MAGENTA, Glyph: Stopwatch },
  { label: "Pass", detail: "The only metric", tint: GOLD, Glyph: Flag },
] as const

/* One trip of the relay, in seconds. Each stage lights up a quarter of the way
   through, so the sweep on the rail and the glyph pulses stay in step. */
const RELAY = 3.2

/*
 * The Pass card.
 *
 * It used to be a gold→magenta gradient carrying WHITE text, which measures
 * 2.07:1 against the gold stop — far under the 4.5:1 floor, on the single most
 * important node of the slide. Keeping the gradient inside the amber range and
 * putting DARK text on it measures 6.82:1 at its worst, and reads as a medal
 * rather than as a warning, which is the note this card wants to hit anyway.
 */
const PASS_FILL = `linear-gradient(140deg, #FFCC55 0%, ${GOLD} 52%, #E08A07 100%)`
const PASS_INK = "#14141A" // 6.82:1 at the worst stop
const PASS_SUB = "#3A2A05" // 5.16:1 at the worst stop

export function RouteJourney3D({ style }: { style?: CSSProperties }) {
  const reduce = useReducedMotion()

  return (
    <div
      style={{
        position: "relative",
        // Perspective lives on the wrapper so every child shares one vanishing
        // point. Per-element perspective would give each node its own, which
        // reads as unrelated tilts rather than one receding plane.
        perspective: 1100,
        perspectiveOrigin: "50% 42%",
        ...style,
      }}
      role="img"
      aria-label="The Scholify route: diagnostic, then daily missions, then mocks, then pass."
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: reduce ? "none" : "rotateX(16deg) rotateZ(-1.2deg)",
        }}
      >
        {/* The track. Drawn with scaleX from the left so it reads as travelled
            distance, and it sits behind the nodes at negative Z. */}
        <div
          aria-hidden
          style={{
            position: "relative",
            height: 3,
            borderRadius: 99,
            background: "rgba(20,20,26,.07)",
            transform: "translateZ(-26px)",
            marginBottom: 20,
          }}
        >
          <motion.div
            initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={reduce ? { duration: 0 } : { delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 99,
              transformOrigin: "left center",
              background: `linear-gradient(90deg, ${RED} 0%, ${MAGENTA} 58%, ${GOLD} 100%)`,
              willChange: "transform",
            }}
          />
          {/* A highlight travelling the rail, so the route reads as a loop that
              is RUNNING rather than a finished diagram. The strip is the full
              width of the rail, which is what lets `x: -100% → 100%` carry it
              exactly one rail-width without the component ever needing to know
              its own pixel width — percentage translation is relative to the
              element's own box. */}
          {!reduce && (
            <span style={{ position: "absolute", inset: 0, borderRadius: 99, overflow: "hidden" }}>
              <motion.span
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: RELAY, repeat: Infinity, ease: "linear", delay: 1.05 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,.92) 50%, transparent 100%)",
                  willChange: "transform",
                }}
              />
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "stretch", gap: 10, transformStyle: "preserve-3d" }}>
          {STAGES.map((stage, index) => {
            const last = index === STAGES.length - 1
            return (
              <motion.div
                key={stage.label}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 22, z: -60, rotateX: -14 }}
                animate={{ opacity: 1, y: 0, z: last ? 34 : 0, rotateX: 0 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { delay: 0.28 + index * 0.055, type: "spring", stiffness: 210, damping: 24, mass: 0.8 }
                }
                style={{
                  flex: 1,
                  minWidth: 0,
                  // Positioned so the Pass node's ring can overlay it. Without
                  // this the ring would resolve against the perspective wrapper
                  // and stretch across the whole route.
                  position: "relative",
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity",
                  padding: "13px 13px 14px",
                  borderRadius: 16,
                  // The final node is the promise, so it is the only filled one
                  // and the only one pushed toward the viewer.
                  background: last ? PASS_FILL : "rgba(255,255,255,.72)",
                  backdropFilter: last ? undefined : "blur(14px) saturate(150%)",
                  WebkitBackdropFilter: last ? undefined : "blur(14px) saturate(150%)",
                  border: `1px solid ${last ? "rgba(179,117,3,.55)" : "rgba(20,20,26,.07)"}`,
                  boxShadow: last
                    ? "inset 0 1px 0 rgba(255,255,255,.4), 0 18px 34px -16px rgba(244,164,5,.6)"
                    : "inset 0 1px 0 rgba(255,255,255,.9), 0 10px 22px -14px rgba(20,20,26,.24)",
                }}
              >
                {/* Pass is the promise of the whole slide, so it gets the one
                    beat the other three do not: a ring expanding outward as the
                    relay completes, timed to land when the rail's highlight
                    arrives. Scale and opacity, no layout, and it renders nothing
                    at all under reduced motion. */}
                {last && !reduce && (
                  <motion.span
                    aria-hidden
                    animate={{ scale: [1, 1.14, 1.24], opacity: [0, 0.55, 0] }}
                    transition={{ duration: RELAY, repeat: Infinity, ease: "easeOut", delay: 1.05 + (3 * RELAY) / 4 }}
                    style={{
                      position: "absolute",
                      inset: -1,
                      borderRadius: 17,
                      border: `1.5px solid ${GOLD}`,
                      pointerEvents: "none",
                      willChange: "transform, opacity",
                    }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    font: `600 9.5px/1 ${MONO}`,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: last ? PASS_SUB : MUTE,
                  }}
                >
                  {/* The glyph brightens and swells as the rail's highlight
                      reaches this stage — index / 4 of a trip, so the four fire
                      in order rather than together. opacity and scale only, and
                      the loop is dropped entirely under reduced motion. */}
                  <motion.span
                    aria-hidden
                    style={{ flex: "none", display: "grid", placeItems: "center", willChange: "transform" }}
                    animate={reduce ? undefined : { scale: [1, 1.22, 1, 1], opacity: [0.62, 1, 0.62, 0.62] }}
                    transition={
                      reduce
                        ? undefined
                        : {
                            duration: RELAY,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.05 + (index * RELAY) / STAGES.length,
                            // `times` MUST be the same length as the keyframes and
                            // MUST end at 1 — Motion asserts both, and a failed
                            // invariant throws inside the frame loop, which freezes
                            // every other animation on the slide at its initial
                            // value rather than just this one. The trailing 1 is
                            // what holds the glyph at rest for the remaining 80%
                            // of the relay instead of pulsing continuously.
                            times: [0, 0.08, 0.2, 1],
                          }
                    }
                  >
                    <stage.Glyph tone={last ? PASS_SUB : stage.tint} />
                  </motion.span>
                  0{index + 1}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    font: `800 14px/1.15 ${SANS}`,
                    letterSpacing: "-0.02em",
                    color: last ? PASS_INK : INK,
                  }}
                >
                  {stage.label}
                </div>
                <div
                  style={{
                    marginTop: 3,
                    font: `500 11px/1.35 ${SANS}`,
                    color: last ? PASS_SUB : MUTE,
                  }}
                >
                  {stage.detail}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
