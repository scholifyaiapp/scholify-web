import { motion, useReducedMotion } from "motion/react"

interface ProCountdownProps {
  secondsLeft: number
  totalSeconds: number
  label?: string
  fixed?: boolean
  size?: number
}

function clock(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds))
  const hours = Math.floor(safe / 3600)
  const minutes = Math.floor((safe % 3600) / 60)
  const secs = safe % 60
  return hours
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
    : `${minutes}:${String(secs).padStart(2, "0")}`
}

/** Shared visual exam clock. The owning runner remains authoritative on expiry. */
export function ProCountdown({
  secondsLeft,
  totalSeconds,
  label = "Time left",
  fixed = true,
  size = 104,
}: ProCountdownProps) {
  const reduce = useReducedMotion()
  const fraction = Math.max(0, Math.min(1, secondsLeft / Math.max(1, totalSeconds)))
  const urgent = fraction <= 0.1 || secondsLeft <= 60
  const warning = !urgent && fraction <= 0.25
  const circumference = 2 * Math.PI * 43
  const tone = urgent ? "#ef4444" : warning ? "#f59e0b" : "#ff3b30"

  return (
    <motion.aside
      className={`pro-countdown${fixed ? " pro-countdown-fixed" : ""}${urgent ? " is-urgent" : warning ? " is-warning" : ""}`}
      aria-label={`${label}: ${clock(secondsLeft)}`}
      role="timer"
      initial={reduce ? false : { opacity: 0, scale: 0.82, rotateY: -18 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: size, height: size }}
    >
      <div className="pro-countdown-aura" />
      <motion.div
        className="pro-countdown-shell"
        animate={!reduce && urgent ? { scale: [1, 1.035, 1] } : undefined}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="pro-countdown-ring" viewBox="0 0 100 100" aria-hidden>
          <defs>
            <linearGradient id="proTimerTrack" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(255,255,255,.24)" />
              <stop offset="1" stopColor="rgba(255,255,255,.05)" />
            </linearGradient>
            <filter id="proTimerGlow">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <circle cx="50" cy="50" r="43" fill="none" stroke="url(#proTimerTrack)" strokeWidth="5" />
          <motion.circle
            cx="50" cy="50" r="43" fill="none" stroke={tone} strokeWidth="5.5"
            strokeLinecap="round" filter="url(#proTimerGlow)"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference * (1 - fraction) }}
            transition={{ duration: 0.8, ease: "linear" }}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="pro-countdown-face">
          <span>{label}</span>
          <strong>{clock(secondsLeft)}</strong>
          <small>{secondsLeft <= 0 ? "TIME" : urgent ? "FINAL PUSH" : warning ? "STAY SHARP" : "IN SESSION"}</small>
        </div>
        <div className="pro-countdown-shine" />
      </motion.div>
    </motion.aside>
  )
}
