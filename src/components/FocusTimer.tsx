import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react"
import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import { useToast } from "@/components/Toast"

/* ──────────────────────────────────────────────────────────────
 *  FocusTimer — embedded Pomodoro for the Dashboard task card.
 *
 *  Lifecycle: idle → running → break → running → … → done.
 *  State persisted to localStorage per active plan so a refresh
 *  picks up the elapsed seconds without losing the session.
 * ────────────────────────────────────────────────────────────── */

type Phase = "idle" | "focus" | "break" | "done"

interface TimerSettings {
  focusMin: number
  breakMin: number
  longBreakMin: number
  sessionsBeforeLongBreak: number
}

interface PersistedState {
  phase: Phase
  startedAt: number | null
  pausedAt: number | null
  accumulatedMs: number
  completedSessions: number
  settings: TimerSettings
  taskKey: string
  totalFocusMs: number
}

const DEFAULT_SETTINGS: TimerSettings = {
  focusMin: 25,
  breakMin: 5,
  longBreakMin: 15,
  sessionsBeforeLongBreak: 4,
}

const STORAGE_KEY = "scholify-focus-timer"
const SETTINGS_KEY = "scholify-focus-timer-settings"

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ── Persistence ─────────────────────────────────────────────── */

function readSettings(): TimerSettings {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<TimerSettings>
      return {
        focusMin: parsed.focusMin ?? DEFAULT_SETTINGS.focusMin,
        breakMin: parsed.breakMin ?? DEFAULT_SETTINGS.breakMin,
        longBreakMin: parsed.longBreakMin ?? DEFAULT_SETTINGS.longBreakMin,
        sessionsBeforeLongBreak:
          parsed.sessionsBeforeLongBreak ??
          DEFAULT_SETTINGS.sessionsBeforeLongBreak,
      }
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_SETTINGS
}

function writeSettings(s: TimerSettings) {
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(s))
  } catch {
    /* ignore */
  }
}

function readState(): PersistedState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as PersistedState
  } catch {
    return null
  }
}

function writeState(state: PersistedState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* ignore */
  }
}

function clearState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

/* ── Audio chime (Web Audio API) ─────────────────────────────── */

function playChime() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AC()
    const now = ctx.currentTime
    const notes = [880, 1318.51, 1760]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.value = freq
      osc.type = "sine"
      gain.gain.setValueAtTime(0, now + i * 0.12)
      gain.gain.linearRampToValueAtTime(0.18, now + i * 0.12 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.4)
      osc.connect(gain).connect(ctx.destination)
      osc.start(now + i * 0.12)
      osc.stop(now + i * 0.12 + 0.45)
    })
    setTimeout(() => ctx.close().catch(() => {}), 1500)
  } catch {
    /* ignore — silent fail is fine */
  }
}

function vibrate(ms: number | number[] = 200) {
  try {
    if ("vibrate" in navigator) navigator.vibrate(ms)
  } catch {
    /* ignore */
  }
}

function maybeNotify(title: string, body: string) {
  try {
    if (!("Notification" in window)) return
    if (Notification.permission === "granted") {
      new Notification(title, { body, icon: "/icon-192.png" })
    }
  } catch {
    /* ignore */
  }
}

/* ── Settings dropdown ───────────────────────────────────────── */

function SettingsMenu({
  settings,
  onChange,
}: {
  settings: TimerSettings
  onChange: (next: TimerSettings) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: "relative" }}>
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Timer settings"
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: "var(--sch-card-2)",
          border: "1px solid var(--sch-border)",
          color: "var(--sch-tx-2)",
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        ⚙
      </motion.button>
      <AnimatePresence>
        {open && (
          <>
            <div
              style={{ position: "fixed", inset: 0, zIndex: 40 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                right: 0,
                top: "calc(100% + 8px)",
                minWidth: 220,
                padding: 12,
                borderRadius: 14,
                background: "var(--sch-bg-2)",
                border: "1px solid var(--sch-border-2)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.55)",
                zIndex: 41,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <SettingRow
                label="Focus"
                value={settings.focusMin}
                options={[25, 45, 60]}
                onChange={(v) => onChange({ ...settings, focusMin: v })}
                unit="min"
              />
              <SettingRow
                label="Break"
                value={settings.breakMin}
                options={[5, 10, 15]}
                onChange={(v) => onChange({ ...settings, breakMin: v })}
                unit="min"
              />
              <SettingRow
                label="Long break after"
                value={settings.sessionsBeforeLongBreak}
                options={[3, 4, 5]}
                onChange={(v) => onChange({ ...settings, sessionsBeforeLongBreak: v })}
                unit="sessions"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function SettingRow({
  label,
  value,
  options,
  onChange,
  unit,
}: {
  label: string
  value: number
  options: number[]
  onChange: (v: number) => void
  unit: string
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <span style={{ fontSize: 12, color: "var(--sch-tx-2)" }}>{label}</span>
        <span style={{ fontSize: 11, color: "var(--sch-tx-4)" }}>
          {value} {unit}
        </span>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {options.map((opt) => {
          const active = opt === value
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              style={{
                flex: 1,
                padding: "6px 0",
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 8,
                cursor: "pointer",
                background: active ? "rgba(139,92,246,0.18)" : "transparent",
                border: `1px solid ${active ? "rgba(139,92,246,0.45)" : "var(--sch-border)"}`,
                color: active ? "var(--sch-text)" : "var(--sch-tx-2)",
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Ring ────────────────────────────────────────────────────── */

function Ring({
  size = 120,
  stroke = 8,
  pct,
  warn,
}: {
  size?: number
  stroke?: number
  pct: number // 0-1
  warn?: boolean
}) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - Math.max(0, Math.min(1, pct)))
  return (
    <svg width={size} height={size}>
      <defs>
        <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={stroke}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={warn ? "#FF9F0A" : "url(#timer-gradient)"}
        strokeWidth={stroke}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        strokeDasharray={`${circ} ${circ}`}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.9, ease: "linear" }}
      />
    </svg>
  )
}

/* ── Props ───────────────────────────────────────────────────── */

export interface FocusTimerProps {
  /** Unique key for this task so progress survives refresh. */
  taskKey: string
  /** Optional callback when the user finishes all configured sessions. */
  onAllSessionsDone?: (totalFocusMinutes: number) => void
  /** Optional handler for "Mark Task Complete" inside the done overlay. */
  onMarkComplete?: () => void
}

/* ── Component ───────────────────────────────────────────────── */

export default function FocusTimer({
  taskKey,
  onAllSessionsDone,
  onMarkComplete,
}: FocusTimerProps) {
  const { toast } = useToast()
  const [settings, setSettings] = useState<TimerSettings>(readSettings)
  const [phase, setPhase] = useState<Phase>("idle")
  const [completedSessions, setCompletedSessions] = useState(0)
  const [totalFocusMs, setTotalFocusMs] = useState(0)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [paused, setPaused] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [showDoneOverlay, setShowDoneOverlay] = useState(false)
  const completionToastRef = useRef(false)

  // Cumulative paused milliseconds — tracked via accumulatedMs + active startedAt.
  const startedAtRef = useRef<number | null>(null)
  const accumulatedMsRef = useRef(0)

  /* ── Hydrate from localStorage on mount ── */
  useEffect(() => {
    const persisted = readState()
    if (!persisted) return
    if (persisted.taskKey !== taskKey) {
      // Different task — discard.
      clearState()
      return
    }
    setSettings(persisted.settings)
    setCompletedSessions(persisted.completedSessions)
    setTotalFocusMs(persisted.totalFocusMs)
    setPhase(persisted.phase)
    accumulatedMsRef.current = persisted.accumulatedMs
    if (persisted.phase === "focus" || persisted.phase === "break") {
      setExpanded(true)
      if (persisted.startedAt && !persisted.pausedAt) {
        startedAtRef.current = persisted.startedAt
        setPaused(false)
        toast.info("Welcome back — your session continued.")
      } else {
        startedAtRef.current = null
        setPaused(true)
      }
    } else if (persisted.phase === "done") {
      setExpanded(true)
      setShowDoneOverlay(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskKey])

  /* ── Tick ── */
  useEffect(() => {
    if (phase !== "focus" && phase !== "break") return
    if (paused) return
    if (!startedAtRef.current) startedAtRef.current = Date.now()
    let raf = 0
    let alive = true
    function tick() {
      if (!alive) return
      const now = Date.now()
      const liveElapsed =
        accumulatedMsRef.current + (now - (startedAtRef.current ?? now))
      setElapsedMs(liveElapsed)
      raf = window.setTimeout(() => tick(), 1000)
    }
    tick()
    return () => {
      alive = false
      window.clearTimeout(raf)
    }
  }, [phase, paused])

  /* ── Persist on any meaningful change ── */
  useEffect(() => {
    if (phase === "idle") {
      clearState()
      return
    }
    writeState({
      phase,
      startedAt: startedAtRef.current,
      pausedAt: paused ? Date.now() : null,
      accumulatedMs: accumulatedMsRef.current,
      completedSessions,
      settings,
      taskKey,
      totalFocusMs,
    })
  }, [phase, paused, completedSessions, settings, taskKey, totalFocusMs, elapsedMs])

  /* ── Phase config ── */
  const phaseLengthMs = useMemo(() => {
    if (phase === "focus") return settings.focusMin * 60_000
    if (phase === "break") {
      const isLong =
        (completedSessions + 1) % settings.sessionsBeforeLongBreak === 0
      return (isLong ? settings.longBreakMin : settings.breakMin) * 60_000
    }
    return settings.focusMin * 60_000
  }, [phase, settings, completedSessions])

  const remainingMs = Math.max(0, phaseLengthMs - elapsedMs)
  const pct = phaseLengthMs > 0 ? elapsedMs / phaseLengthMs : 0
  const remainingSec = Math.floor(remainingMs / 1000)
  const mm = Math.floor(remainingSec / 60)
  const ss = remainingSec % 60
  const lowTime = phase !== "idle" && phase !== "done" && remainingMs <= 60_000

  /* ── Auto-advance when phase ends ── */
  useEffect(() => {
    if (phase !== "focus" && phase !== "break") return
    if (remainingMs > 0) return

    // Phase ended.
    if (phase === "focus") {
      playChime()
      vibrate([180, 80, 180])
      maybeNotify(
        "Focus session complete ✓",
        `Take a ${
          (completedSessions + 1) % settings.sessionsBeforeLongBreak === 0
            ? settings.longBreakMin
            : settings.breakMin
        } min break.`,
      )
      const nextCompleted = completedSessions + 1
      const nextTotalFocus = totalFocusMs + settings.focusMin * 60_000
      setCompletedSessions(nextCompleted)
      setTotalFocusMs(nextTotalFocus)

      if (nextCompleted >= settings.sessionsBeforeLongBreak) {
        // All target sessions done.
        startedAtRef.current = null
        accumulatedMsRef.current = 0
        setElapsedMs(0)
        setPhase("done")
        setShowDoneOverlay(true)
        if (!completionToastRef.current) {
          completionToastRef.current = true
          onAllSessionsDone?.(Math.round(nextTotalFocus / 60_000))
        }
        return
      }

      // Slide into break.
      startedAtRef.current = Date.now()
      accumulatedMsRef.current = 0
      setElapsedMs(0)
      setPhase("break")
      return
    }
    // break → focus
    playChime()
    vibrate(140)
    maybeNotify(
      "Break over",
      `Ready for session ${completedSessions + 1}?`,
    )
    startedAtRef.current = Date.now()
    accumulatedMsRef.current = 0
    setElapsedMs(0)
    setPhase("focus")
  }, [
    remainingMs,
    phase,
    completedSessions,
    totalFocusMs,
    settings,
    onAllSessionsDone,
  ])

  /* ── Controls ── */
  const start = useCallback(() => {
    startedAtRef.current = Date.now()
    accumulatedMsRef.current = 0
    setElapsedMs(0)
    setPaused(false)
    setExpanded(true)
    setShowDoneOverlay(false)
    completionToastRef.current = false
    setPhase("focus")
  }, [])

  const togglePause = useCallback(() => {
    if (phase === "idle" || phase === "done") return
    if (paused) {
      // Resume.
      startedAtRef.current = Date.now()
      setPaused(false)
    } else {
      // Pause — accumulate elapsed and stop the live clock.
      if (startedAtRef.current) {
        accumulatedMsRef.current += Date.now() - startedAtRef.current
      }
      startedAtRef.current = null
      setPaused(true)
    }
  }, [paused, phase])

  const reset = useCallback(() => {
    startedAtRef.current = null
    accumulatedMsRef.current = 0
    setElapsedMs(0)
    setPaused(false)
    setPhase("idle")
    setCompletedSessions(0)
    setTotalFocusMs(0)
    setShowDoneOverlay(false)
    setExpanded(false)
    setConfirmReset(false)
    clearState()
  }, [])

  const skipBreak = useCallback(() => {
    if (phase !== "break") return
    startedAtRef.current = Date.now()
    accumulatedMsRef.current = 0
    setElapsedMs(0)
    setPaused(false)
    setPhase("focus")
  }, [phase])

  /* ── Settings save ── */
  const updateSettings = (next: TimerSettings) => {
    setSettings(next)
    writeSettings(next)
  }

  /* ── Request notification permission once when user starts ── */
  useEffect(() => {
    if (phase !== "focus") return
    try {
      if (
        "Notification" in window &&
        Notification.permission === "default"
      ) {
        Notification.requestPermission().catch(() => {})
      }
    } catch {
      /* ignore */
    }
  }, [phase])

  /* ── Render ── */
  const phaseLabel =
    phase === "focus"
      ? paused
        ? "Paused"
        : "Focus"
      : phase === "break"
        ? paused
          ? "Break · Paused"
          : "Break"
        : phase === "done"
          ? "Done"
          : "Ready"

  const timeText =
    phase === "done"
      ? "✓"
      : `${mm.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}`

  const totalMinutesNow = Math.floor((totalFocusMs + (phase === "focus" ? elapsedMs : 0)) / 60_000)

  // ── Collapsed
  if (!expanded) {
    return (
      <div
        style={{
          marginTop: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "10px 14px",
          borderRadius: 12,
          background: "var(--sch-card-2)",
          border: "1px solid var(--sch-border)",
        }}
      >
        <span style={{ fontSize: 13, color: "var(--sch-tx-2)" }}>🍅 Focus Timer</span>
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={start}
          style={{
            padding: "7px 14px",
            borderRadius: 999,
            border: "1px solid rgba(139,92,246,0.3)",
            background: "rgba(139,92,246,0.08)",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            ...iriText,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          Start {settings.focusMin} min session →
        </motion.button>
      </div>
    )
  }

  // ── Expanded
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      style={{
        marginTop: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          padding: 20,
          borderRadius: 16,
          background: "var(--sch-card-2)",
          border: "1px solid var(--sch-border)",
        }}
      >
        {/* Top right: settings */}
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            zIndex: 2,
          }}
        >
          <SettingsMenu settings={settings} onChange={updateSettings} />
        </div>

        {/* Ring */}
        <div
          style={{
            position: "relative",
            width: 120,
            height: 120,
            margin: "0 auto",
          }}
        >
          <Ring pct={pct} warn={lowTime} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={timeText}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                style={{
                  fontSize: phase === "done" ? 36 : 20,
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                  color: phase === "done" ? "#34D399" : lowTime ? "#FF9F0A" : "var(--sch-text)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {phase === "done" ? (
                  <motion.span
                    initial={{ scale: 0.6 }}
                    animate={{ scale: [0.6, 1.15, 1] }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    ✓
                  </motion.span>
                ) : lowTime ? (
                  <motion.span
                    animate={{ opacity: [0.65, 1, 0.65] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {timeText}
                  </motion.span>
                ) : (
                  timeText
                )}
              </motion.div>
            </AnimatePresence>
            <div
              style={{
                fontSize: 11,
                color: "var(--sch-tx-3)",
                marginTop: 2,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {phaseLabel}
            </div>
          </div>
        </div>

        {/* Session row */}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12,
            color: "var(--sch-tx-2)",
          }}
        >
          <span>
            Session {Math.min(completedSessions + 1, settings.sessionsBeforeLongBreak)}{" "}
            of {settings.sessionsBeforeLongBreak}
          </span>
          <span>
            {totalMinutesNow} / {settings.focusMin * settings.sessionsBeforeLongBreak} min
          </span>
        </div>

        {/* Dots */}
        <div
          style={{
            marginTop: 10,
            display: "flex",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {Array.from({ length: settings.sessionsBeforeLongBreak }).map((_, i) => {
            const done = i < completedSessions
            const current = i === completedSessions && phase !== "done"
            return (
              <motion.span
                key={i}
                animate={
                  current
                    ? { scale: [1, 1.2, 1], opacity: [0.85, 1, 0.85] }
                    : { scale: 1 }
                }
                transition={{ duration: 1.4, repeat: current ? Infinity : 0, ease: "easeInOut" }}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: done ? IRIDESCENT : "transparent",
                  border: `1px solid ${
                    done
                      ? "transparent"
                      : current
                        ? "rgba(139,92,246,0.6)"
                        : "var(--sch-border-2)"
                  }`,
                }}
              />
            )
          })}
        </div>

        {/* Controls */}
        <div
          style={{
            marginTop: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {phase !== "done" && (
            <motion.button
              type="button"
              onClick={togglePause}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={paused ? "Resume" : "Pause"}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "1px solid rgba(139,92,246,0.3)",
                background: "rgba(139,92,246,0.12)",
                color: "var(--sch-text)",
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              {paused ? "▶" : "⏸"}
            </motion.button>
          )}

          <motion.button
            type="button"
            onClick={() => {
              if (
                phase !== "idle" &&
                phase !== "done" &&
                completedSessions === 0 &&
                elapsedMs < 5_000
              ) {
                reset()
              } else if (phase === "done" || phase === "idle") {
                reset()
              } else {
                setConfirmReset(true)
              }
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Reset"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid var(--sch-border)",
              background: "var(--sch-card)",
              color: "var(--sch-tx-2)",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            ↺
          </motion.button>

          {phase === "break" && (
            <motion.button
              type="button"
              onClick={skipBreak}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: "7px 14px",
                borderRadius: 999,
                border: "1px solid var(--sch-border)",
                background: "var(--sch-card)",
                color: "var(--sch-tx-1)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Skip break →
            </motion.button>
          )}
        </div>

        {/* Done overlay */}
        <AnimatePresence>
          {showDoneOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 16,
                background: "rgba(8,8,16,0.78)",
                backdropFilter: "blur(8px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
                textAlign: "center",
              }}
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                style={{ fontSize: 36 }}
              >
                🍅 × {completedSessions}
              </motion.div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 15,
                  fontWeight: 700,
                  color: "var(--sch-text)",
                }}
              >
                Full focus session complete!
              </div>
              <div style={{ marginTop: 4, fontSize: 13, color: "var(--sch-tx-2)" }}>
                You studied for {Math.round(totalFocusMs / 60_000)} minutes.
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 18,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {onMarkComplete && (
                  <motion.button
                    type="button"
                    onClick={onMarkComplete}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: "10px 18px",
                      borderRadius: 12,
                      border: "none",
                      background: IRIDESCENT,
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 0 20px rgba(139,92,246,0.3)",
                    }}
                  >
                    Mark task complete →
                  </motion.button>
                )}
                <button
                  type="button"
                  onClick={reset}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 12,
                    border: "1px solid var(--sch-border)",
                    background: "transparent",
                    color: "var(--sch-tx-1)",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Done
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reset confirmation */}
        <AnimatePresence>
          {confirmReset && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={confirmStyle as CSSProperties}
            >
              <div
                style={{
                  fontSize: 13,
                  color: "var(--sch-text)",
                  marginBottom: 8,
                  textAlign: "center",
                }}
              >
                Reset the current session?
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  style={smallBtn}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={reset}
                  style={{
                    ...smallBtn,
                    background: "rgba(255,69,58,0.12)",
                    borderColor: "rgba(255,69,58,0.4)",
                    color: "#FF6B5E",
                  }}
                >
                  Reset
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

const confirmStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: 16,
  background: "rgba(8,8,16,0.84)",
  backdropFilter: "blur(6px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
}

const smallBtn: CSSProperties = {
  padding: "6px 14px",
  borderRadius: 10,
  border: "1px solid var(--sch-border)",
  background: "var(--sch-card)",
  color: "var(--sch-tx-1)",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
}
