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
 *   RouteClimb       The Scholify cycle drawn as an ascent — the three stages
 *                    step upward and the loop returns one level higher, with
 *                    Pass as the summit the climb is for.
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

/* ── RouteClimb ──────────────────────────────────────────────────
 *
 * The Scholify loop as an ASCENT.
 *
 * Third shape for this diagram, and the reasoning is cumulative:
 *
 *  1. A left-to-right rail ending at "Pass" described a one-way trip. Wrong:
 *     the mechanism repeats.
 *  2. A ring fixed the repetition but introduced a worse error — a circle
 *     returns you to where you started, so it drew the loop as going nowhere.
 *     The whole point is that each cycle leaves the learner further on.
 *  3. A climb says both things at once. The three stages step UPWARD, and the
 *     loop-back arc returns you to the first stage a level higher than before.
 *     Repetition plus accumulation, which is what the readiness score actually
 *     does.
 *
 * Pass sits at the summit rather than at the end of a line: it is what the climb
 * is FOR, and it is off the cycle, not a fourth step inside it.
 *
 * COLOUR ENCODES ROLE, NOT IDENTITY
 *  · The three steps are deliberately identical — white card, red glyph, ink
 *    label. They are the same KIND of thing; giving them three hues, as the
 *    original rail did, implied they differed in kind.
 *  · The loop-back arc is muted red and dashed: it is the mechanism, not a
 *    destination, and dashes read as "again" rather than as another path.
 *  · Gold is reserved for the one thing that IS different — the summit. Its text
 *    sits at 6.82:1 on the amber range, so the payoff is also the most legible
 *    element on the slide.
 *
 * A landscape 268x180 viewBox, which suits the slide far better than the ring's
 * square did — the writing panel is wide, and a square left dead space on both
 * sides.
 *
 * MOTION: cards rise staggered, the summit springs in, the loop-back arc draws
 * once. All one-shot — no permanent loop, so nothing here paints forever. Under
 * reduced motion every element renders at rest.
 */

/*
 * The Pass palette.
 *
 * White text on the old gold-to-magenta fill measured 2.07:1 against the gold
 * stop, against a 4.5:1 floor, on the most important element of the slide.
 * Holding the gradient inside the amber range and using DARK text gives 6.82:1
 * at its worst, and reads as a medal rather than as a warning.
 */
const PASS_INK = "#14141A" // 6.82:1 at the worst amber stop
const PASS_SUB = "#3A2A05" // 5.16:1 at the worst amber stop

type StepKind = "crosshair" | "checklist" | "stopwatch"

/* Glyph geometry in a shared 24x24 space, as <g> children rather than nested
   <svg> so they inherit the parent's stroke and scale cleanly. */
function Glyph({ kind }: { kind: StepKind }) {
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

/* Card geometry. Position is derived from the index so a step cannot drift from
   its label or its connector. */
const CARD_W = 58
const CARD_H = 46
const STEP_X = 61
const STEP_Y = 0
const BASE_X = 5
const BASE_Y = 28

const STEPS: { kind: StepKind; label: string[] }[] = [
  { kind: "crosshair", label: ["Diagnose"] },
  { kind: "checklist", label: ["Daily"] },
  { kind: "stopwatch", label: ["Mocks"] },
]

const cardX = (i: number) => BASE_X + i * STEP_X
const cardY = (i: number) => BASE_Y - i * STEP_Y

/* Summit, clear of the last card's top-right corner. */
const SUMMIT_X = 242
const SUMMIT_Y = 51
const SUMMIT_R = 21

export function RouteClimb({ style }: { style?: CSSProperties }) {
  const reduce = useReducedMotion()

  return (
    <div style={style}>
      <div style={{ width: "100%", maxWidth: 420, margin: "0 auto" }}>
        <svg
          viewBox="0 0 268 104"
          style={{ width: "100%", height: "auto", display: "block" }}
          role="img"
          aria-label="The Scholify loop as a climb: a diagnostic measures where you are, daily missions work your weakest areas, and mocks test you under exam conditions. The cycle then repeats from a higher level than before, and the summit is passing the exam."
        >
          <defs>
            <linearGradient id="scholify-summit" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFCC55" />
              <stop offset="52%" stopColor={GOLD} />
              <stop offset="100%" stopColor="#E08A07" />
            </linearGradient>
          </defs>
          <path d="M63 51H221" fill="none" stroke="#D9CBC3" strokeWidth="1.5" strokeDasharray="3 4" />

          {/* Loop-back: from beneath the last step, round to the first. Dashed,
              because it means "again" rather than "another way forward". */}
          {/* Faded in rather than drawn with pathLength: Motion implements
              pathLength USING strokeDasharray, so it silently overrode the dash
              pattern and the arc rendered solid — losing the "again" reading the
              dashes carry. Opacity also keeps this off the paint path. */}
          <motion.path
            d="M196 150 C 150 172, 74 172, 30 152"
            fill="none"
            stroke="rgba(200,0,0,.34)"
            strokeWidth="1.8"
            strokeDasharray="5 4"
            strokeLinecap="round"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduce ? { duration: 0 } : { delay: 0.55, duration: 0.45, ease: "easeOut" }}
            display="none"
          />
          <path d="M-4,-3.2 L4,0 L-4,3.2 Z" fill="rgba(200,0,0,.42)" transform="translate(28 151) rotate(-152)" display="none" />
          <text
            x={113}
            /* Below the arc's lowest point, not level with it. At y=170 the
               dashed curve ran straight through this caption. */
            y={188}
            textAnchor="middle"
            style={{ font: "600 8.5px " + MONO, letterSpacing: "0.1em", fill: MUTE }}
            display="none"
          >
            REPEATS — ONE LEVEL HIGHER
          </text>

          {/* No connectors between the cards. STEP_X leaves them a 4px gap, so a
              riser was a 4px stub that read as a rendering artefact rather than
              as a join — and three cards each set a step higher than the last
              already read as a staircase without one. */}

          {/* The three steps. Identical by design — see COLOUR ENCODES ROLE. */}
          {STEPS.map((step, i) => {
            const x = cardX(i)
            const y = cardY(i)
            return (
              <motion.g
                key={step.label.join(" ")}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? { duration: 0 } : { delay: 0.1 + i * 0.1, type: "spring", stiffness: 240, damping: 24 }}
              >
                <rect
                  x={x}
                  y={y}
                  width={CARD_W}
                  height={CARD_H}
                  rx="13"
                  fill="#fff"
                  stroke="rgba(20,20,26,.10)"
                  strokeWidth="1"
                />
                <g
                  transform={"translate(" + (x + 9) + " " + (y + 9) + ") scale(0.62)"}
                  fill="none"
                  stroke={RED}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <Glyph kind={step.kind} />
                </g>
                <text
                  x={x + CARD_W / 2}
                  y={y + 15}
                  textAnchor="middle"
                  style={{ font: "600 7.5px " + MONO, letterSpacing: "0.09em", fill: MUTE }}
                >
                  {"0" + (i + 1)}
                </text>
                {step.label.map((word, w) => (
                  <text
                    key={word}
                    x={x + CARD_W / 2}
                    y={y + 31 + w * 10}
                    textAnchor="middle"
                    style={{ font: "750 9px " + SANS, letterSpacing: "-0.01em", fill: INK }}
                  >
                    {word}
                  </text>
                ))}
              </motion.g>
            )
          })}

          {/* The summit. Off the cycle, because Pass is what the climb is FOR. */}
          <motion.g
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduce ? { duration: 0 } : { delay: 0.42, type: "spring", stiffness: 280, damping: 18 }}
            style={{ transformOrigin: SUMMIT_X + "px " + SUMMIT_Y + "px" }}
          >
            <circle
              cx={SUMMIT_X}
              cy={SUMMIT_Y}
              r={SUMMIT_R}
              fill="url(#scholify-summit)"
              stroke="rgba(179,117,3,.5)"
              strokeWidth="1"
            />
            <g
              transform={"translate(" + (SUMMIT_X - 6.6) + " " + (SUMMIT_Y - 13.5) + ") scale(0.55)"}
              fill="none"
              stroke={PASS_SUB}
              strokeWidth="3.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5.6 21.4V3M5.6 4.2h11.8l-2.2 4.4 2.2 4.4H5.6" />
            </g>
            <text
              x={SUMMIT_X}
              y={SUMMIT_Y + 13}
              textAnchor="middle"
              style={{ font: "800 10px " + SANS, letterSpacing: "-0.02em", fill: PASS_INK }}
            >
              Pass
            </text>
          </motion.g>
        </svg>
      </div>
    </div>
  )
}
