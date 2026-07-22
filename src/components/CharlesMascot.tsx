import { motion, useReducedMotion } from "motion/react"
import type { CSSProperties } from "react"

/*
 * Charles — the little big-helmet mascot. Renders a pose with a spring pop-in
 * and a gentle perpetual float (one ambient element, reduced-motion safe).
 *
 * Some source renders are on a dark radial background, some are transparent.
 * `DARK` poses get a rounded dark "portrait" frame so the background reads as
 * intentional; transparent poses drop straight onto any surface with a soft
 * brand drop-shadow.
 */
export type CharlesPose =
  | "wave" | "present" | "chart" | "celebrate" | "idea" | "calm" | "thumbsup"
  | "plan" | "success" | "thinking" | "start" | "run" | "wave2"

const SRC: Record<CharlesPose, string> = {
  wave: "/charles/6.webp", // waving hello — greeting
  present: "/charles/7.webp", // open visor + telemetry — coaching/reveal
  chart: "/charles/2.webp", // pointing at a chart — analytics/readiness
  celebrate: "/charles/4.webp", // fists up + confetti — reward
  idea: "/charles/5.webp", // finger up — tip/idea
  calm: "/charles/3.webp", // arms crossed — steady / empty state
  thumbsup: "/charles/1.webp", // thumbs up — positive / hero
  plan: "/charles/8.webp", // presenting a plan board — plan reveal / roadmap
  success: "/charles/9.webp", // double thumbs + sparkles — correct / passed
  thinking: "/charles/11.webp", // hand on chin + lightbulb — AI thinking / tip
  start: "/charles/12.webp", // sprint-ready crouch — begin a session
  run: "/charles/13.webp", // running + speed lines — momentum / streak
  wave2: "/charles/10.webp", // waving hello (alt) — greeting
}
// Only these three source renders sit on a dark background.
const DARK: Record<CharlesPose, boolean> = {
  wave: false, present: true, chart: true, celebrate: false, idea: false, calm: false, thumbsup: true,
  plan: false, success: false, thinking: false, start: false, run: false, wave2: false,
}

/*
 * PLUG-AND-PLAY REAL ANIMATION.
 * Drop a TRANSPARENT animated file (animated WebP / APNG / GIF) into
 * public/charles/anim/ and map the pose here. When a pose has an entry, the
 * mascot plays that file natively (real frame animation — hand wave, blink, …)
 * and the CSS "float" idle is switched off so the frames do the motion.
 * Until then, poses fall back to the static render + the lively CSS idle.
 * Example:  wave: "/charles/anim/wave.webp",
 */
const ANIM: Partial<Record<CharlesPose, string>> = {
  // wave: "/charles/anim/wave.webp",
  // celebrate: "/charles/anim/celebrate.webp",
  // thinking: "/charles/anim/thinking.webp",
}

export default function CharlesMascot({
  pose = "wave",
  size = 120,
  float = true,
  frame,
  delay = 0,
  style,
}: {
  pose?: CharlesPose
  /** Number (px) or any CSS size string (e.g. "clamp(150px,32vw,200px)"). */
  size?: number | string
  /** Gentle idle bob. */
  float?: boolean
  /** Force the dark rounded portrait frame on/off (defaults per-pose). */
  frame?: boolean
  delay?: number
  style?: CSSProperties
}) {
  const reduced = useReducedMotion()
  const framed = frame ?? DARK[pose]
  // Real animated file wins; when present, let the frames animate (no CSS float).
  const animSrc = ANIM[pose]
  const doFloat = float && !animSrc

  const img = (
    <img
      src={animSrc ?? SRC[pose]}
      alt="Charles, your Scholify race engineer"
      loading="lazy"
      style={{
        display: "block",
        width: framed ? "100%" : size,
        height: framed ? "100%" : size,
        objectFit: "contain",
        filter: framed ? "none" : "drop-shadow(0 12px 18px rgba(200,0,0,0.22))",
      }}
    />
  )
  const inner = framed ? (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: typeof size === "number" ? Math.round(size * 0.18) : "18%",
        overflow: "hidden",
        background: "radial-gradient(circle at 50% 38%, #1b0409, #0b0b0f 72%)",
        boxShadow: "0 14px 44px rgba(200,0,0,0.28)",
        display: "grid",
        placeItems: "center",
      }}
    >
      {img}
    </div>
  ) : (
    img
  )

  if (reduced) return <div style={{ display: "inline-block", ...style }}>{inner}</div>

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: "spring", stiffness: 240, damping: 18, delay }}
      style={{ display: "inline-block", willChange: "transform", ...style }}
    >
      <motion.div
        animate={
          doFloat
            ? { y: [0, -9, 0], scale: [1, 1.025, 1], rotate: [-1.6, 1.6, -1.6] }
            : { y: 0 }
        }
        transition={
          doFloat
            ? {
                // Different periods → organic, never-repeating "alive" idle.
                y: { duration: 3.1, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 4.3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
              }
            : undefined
        }
        style={{ transformOrigin: "50% 85%", willChange: "transform" }}
      >
        {inner}
      </motion.div>
    </motion.div>
  )
}
