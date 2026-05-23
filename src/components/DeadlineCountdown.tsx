import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { format } from "date-fns"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"

/* ──────────────────────────────────────────────────────────────
 *  DeadlineCountdown — two display modes:
 *    "compact"  → dashboard banner with circular % ring
 *    "full"     → big flip-card countdown for the Goals page
 *
 *  Ticks once per second; pauses ticking when the tab is hidden.
 * ────────────────────────────────────────────────────────────── */

export type CountdownMode = "compact" | "full"

export interface DeadlineCountdownProps {
  mode: CountdownMode
  /** ISO date of deadline. */
  deadline: string | null | undefined
  /** Used by compact mode for the goal label / progress ring. */
  goal?: string
  /** % of plan complete (0-100). */
  percent?: number
  /** ISO of plan start, for the "Started … · Ends …" line in full mode. */
  startedAt?: string | null
  /** Fires once when remaining hits 0 (used to trigger confetti, etc.). */
  onReached?: () => void
}

interface Remaining {
  total: number // ms
  days: number
  hours: number
  minutes: number
  seconds: number
}

function diff(deadline: number, now: number): Remaining {
  const total = Math.max(0, deadline - now)
  const days = Math.floor(total / 86_400_000)
  const hours = Math.floor((total % 86_400_000) / 3_600_000)
  const minutes = Math.floor((total % 3_600_000) / 60_000)
  const seconds = Math.floor((total % 60_000) / 1_000)
  return { total, days, hours, minutes, seconds }
}

function useCountdown(deadline: string | null | undefined): Remaining | null {
  const target = useMemo(() => {
    if (!deadline) return null
    const d = new Date(deadline).getTime()
    return Number.isNaN(d) ? null : d
  }, [deadline])

  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (target == null) return
    let raf = 0
    let alive = true
    let lastTick = 0
    function tick(ts: number) {
      if (!alive) return
      // Throttle to ~1 update / second.
      if (ts - lastTick >= 1000) {
        setNow(Date.now())
        lastTick = ts
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    function onVisibility() {
      if (!document.hidden) setNow(Date.now())
    }
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [target])

  return useMemo(() => (target == null ? null : diff(target, now)), [target, now])
}

/* ── Urgency tier ────────────────────────────────────────────── */

type Tier = "normal" | "warm" | "warn" | "critical" | "final"

function urgency(daysRemaining: number, total: number): Tier {
  if (total <= 0) return "final"
  if (daysRemaining < 1) return "critical"
  if (daysRemaining < 7) return "warn"
  if (daysRemaining < 15) return "warm"
  return "normal"
}

const TIER_COLOR: Record<Tier, string> = {
  normal: "transparent",
  warm: "#F0B45D",
  warn: "#FF9F0A",
  critical: "#FF453A",
  final: "#FF453A",
}

/* ── Flip number for FULL mode ───────────────────────────────── */

function FlipNumber({
  value,
  label,
}: {
  value: number
  label: string
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: "var(--flip-w, 70px)",
          height: "var(--flip-h, 80px)",
          padding: 0,
          borderRadius: 14,
          background: "var(--sch-card)",
          border: "1px solid var(--sch-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          perspective: 800,
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ rotateX: 90, y: -10, opacity: 0 }}
            animate={{ rotateX: 0, y: 0, opacity: 1 }}
            exit={{ rotateX: -90, y: 10, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 28,
              fontWeight: 900,
              ...iriText,
              fontVariantNumeric: "tabular-nums",
              display: "inline-block",
            }}
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.06em",
          color: "var(--sch-tx-3)",
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  )
}

function Colon() {
  return (
    <div
      style={{
        fontSize: 24,
        color: "var(--sch-tx-4)",
        fontWeight: 700,
        margin: "0 4px",
        lineHeight: 1,
        alignSelf: "center",
        marginBottom: 22,
      }}
    >
      :
    </div>
  )
}

/* ── Pulse ring for critical state ───────────────────────────── */

function PulseRing({ color }: { color: string }) {
  return (
    <motion.span
      aria-hidden
      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        inset: -6,
        borderRadius: "inherit",
        border: `1px solid ${color}`,
        pointerEvents: "none",
      }}
    />
  )
}

/* ── Circular progress ring (compact mode) ───────────────────── */

function ProgressRing({ percent }: { percent: number }) {
  const size = 48
  const stroke = 4
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - Math.min(100, Math.max(0, percent)) / 100)

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="35%" stopColor="#818CF8" />
            <stop offset="70%" stopColor="#F0ABFC" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--sch-border)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          initial={{ strokeDasharray: `${circ} ${circ}`, strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 800,
          ...iriText,
        }}
      >
        {Math.round(percent)}%
      </div>
    </div>
  )
}

/* ── Main component ──────────────────────────────────────────── */

export default function DeadlineCountdown({
  mode,
  deadline,
  goal,
  percent = 0,
  startedAt,
  onReached,
}: DeadlineCountdownProps) {
  const remaining = useCountdown(deadline ?? null)
  const reachedRef = useRef(false)

  useEffect(() => {
    if (!remaining) return
    if (remaining.total <= 0 && !reachedRef.current) {
      reachedRef.current = true
      onReached?.()
    }
  }, [remaining, onReached])

  if (!deadline || !remaining) {
    // No deadline yet — render a minimal hint instead of breaking layout.
    return mode === "compact" ? (
      <div
        style={{
          padding: "14px 18px",
          borderRadius: 14,
          background: "var(--sch-card)",
          border: "1px solid var(--sch-border)",
          fontSize: 13,
          color: "var(--sch-tx-2)",
        }}
      >
        No deadline set — your plan is open-ended.
      </div>
    ) : null
  }

  const tier = urgency(remaining.days, remaining.total)

  if (mode === "compact") {
    const goalLabel = (goal ?? "").trim().slice(0, 25)
    const tierColor = TIER_COLOR[tier]
    const isCritical = tier === "warn" || tier === "critical" || tier === "final"
    const numberStyle: CSSProperties = isCritical
      ? { color: tierColor }
      : iriText
    const headlineText =
      remaining.total <= 0
        ? "Deadline reached!"
        : tier === "critical"
          ? "🔴 Final day"
          : tier === "warn"
            ? `⚠️ ${remaining.days} day${remaining.days === 1 ? "" : "s"} left`
            : `${remaining.days} day${remaining.days === 1 ? "" : "s"} · ${remaining.hours} hr · ${remaining.minutes} min`

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          padding: "14px 18px",
          borderRadius: 14,
          background: "var(--sch-card)",
          border: `1px solid ${
            isCritical ? `${tierColor}80` : "var(--sch-border)"
          }`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          overflow: "hidden",
        }}
      >
        {tier === "warn" || tier === "critical" || tier === "final" ? (
          <PulseRing color={tierColor} />
        ) : null}
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 12,
              color: "var(--sch-tx-3)",
              marginBottom: 4,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            📅 {goalLabel || "Your learning goal"}
          </div>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`${remaining.days}-${remaining.hours}-${remaining.minutes}`}
              initial={{ scale: 1.08, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                fontSize: 17,
                fontWeight: 800,
                letterSpacing: "-0.2px",
                ...numberStyle,
              }}
            >
              {headlineText}
            </motion.div>
          </AnimatePresence>
        </div>
        <ProgressRing percent={percent} />
      </motion.div>
    )
  }

  /* ── FULL mode ── */

  const startedLabel = startedAt
    ? format(new Date(startedAt), "MMM d")
    : null
  const endsLabel = format(new Date(deadline), "MMM d")

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: 24,
        borderRadius: 20,
        background: "var(--sch-card)",
        border: "1px solid var(--sch-border)",
      }}
    >
      <div
        style={
          {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "--flip-w": "70px",
            "--flip-h": "80px",
          } as CSSProperties & { [k: string]: string }
        }
        className="sch-flip-grid"
      >
        <FlipNumber value={remaining.days} label="Days" />
        <Colon />
        <FlipNumber value={remaining.hours} label="Hours" />
        <Colon />
        <FlipNumber value={remaining.minutes} label="Mins" />
        <Colon />
        <FlipNumber value={remaining.seconds} label="Secs" />
      </div>

      {/* Progress + meta */}
      <div style={{ marginTop: 22 }}>
        <div
          style={{
            width: "100%",
            height: 6,
            borderRadius: 3,
            background: "var(--sch-hairline)",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: "100%", background: IRIDESCENT }}
          />
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 13,
            color: "var(--sch-tx-2)",
            textAlign: "center",
          }}
        >
          {Math.round(percent)}% complete
          {startedLabel && <> · Started {startedLabel}</>} · Ends {endsLabel}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .sch-flip-grid { --flip-w: 50px !important; --flip-h: 60px !important; }
          .sch-flip-grid span { font-size: 22px !important; }
        }
      `}</style>
    </motion.div>
  )
}
