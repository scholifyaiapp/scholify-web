import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import html2canvas from "html2canvas"
import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  subDays,
  isSameMonth,
  isSameDay,
  differenceInCalendarDays,
} from "date-fns"
import { useAuth } from "@/lib/auth"
import { readPlan, readProgress } from "@/lib/scholify-data"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import LearningStyleCard from "@/components/LearningStyleCard"
import PhotoGallery from "@/components/PhotoGallery"
import StreakTree from "@/components/StreakTree"

/* ──────────────────────────────────────────────────────────────
 *  Scholify — Progress screen. Stats, streak heatmap, charts,
 *  a shareable card and achievements. All derived from the local
 *  plan + progress data (the same source the dashboard uses).
 * ────────────────────────────────────────────────────────────── */

const TEXT2 = "var(--sch-tx-2)"

const glassCard: CSSProperties = {
  background: "var(--sch-card)",
  border: "1px solid var(--sch-border)",
  borderRadius: 24,
  padding: 28,
}

const sectionTitle: CSSProperties = { fontSize: 16, fontWeight: 700, color: "var(--sch-text)" }

/* ── Count-up hook ───────────────────────────────────────────── */

function useCountUp(target: number, decimals = 0, duration = 1500): number {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
      else setVal(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return decimals > 0 ? Number(val.toFixed(decimals)) : Math.round(val)
}

/* ── Stat card ───────────────────────────────────────────────── */

function StatCard({
  index,
  icon,
  label,
  target,
  decimals,
  suffix,
  trend,
}: {
  index: number
  icon: string
  label: string
  target: number
  decimals: number
  suffix: string
  trend: string
}) {
  const value = useCountUp(target, decimals)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -4,
        borderColor: "rgba(139,92,246,0.3)",
        boxShadow: "0 8px 32px rgba(139,92,246,0.1)",
      }}
      style={{ ...glassCard, borderRadius: 20, padding: 24 }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          background: "rgba(139,92,246,0.1)",
          border: "1px solid rgba(139,92,246,0.2)",
        }}
      >
        {icon}
      </div>
      <div style={{ marginTop: 16, fontSize: 32, fontWeight: 900, letterSpacing: "-1px", ...iriText }}>
        {decimals > 0 ? value.toFixed(decimals) : value}
        {suffix}
      </div>
      <div style={{ marginTop: 4, fontSize: 13, fontWeight: 500, color: "var(--sch-tx-2)" }}>
        {label}
      </div>
      <span
        style={{
          display: "inline-block",
          marginTop: 8,
          fontSize: 11,
          padding: "3px 8px",
          borderRadius: 10,
          background: "rgba(52,211,153,0.1)",
          color: "#34D399",
          border: "1px solid rgba(52,211,153,0.2)",
        }}
      >
        ↑ {trend}
      </span>
    </motion.div>
  )
}

/* ── Streak heatmap ──────────────────────────────────────────── */

type CellState = "completed" | "missed" | "shield" | "future" | "today" | "none"

function HeatCell({
  date,
  state,
  minutes,
  delay,
}: {
  date: Date
  state: CellState
  minutes: number
  delay: number
}) {
  const [hover, setHover] = useState(false)

  const bg: Record<CellState, string> = {
    completed: IRIDESCENT,
    missed: "rgba(255,69,58,0.15)",
    shield: "rgba(255,159,10,0.15)",
    future: "var(--sch-card)",
    none: "var(--sch-card)",
    today: "rgba(139,92,246,0.1)",
  }
  const border: Record<CellState, string> = {
    completed: "1px solid transparent",
    missed: "1px solid rgba(255,69,58,0.2)",
    shield: "1px solid rgba(255,159,10,0.2)",
    future: "1px solid var(--sch-card-2)",
    none: "1px solid var(--sch-card-2)",
    today: "2px solid rgba(139,92,246,0.6)",
  }
  const label =
    state === "completed" || state === "today"
      ? `Completed · ${minutes} min`
      : state === "missed"
        ? "Missed"
        : state === "shield"
          ? "Missed · Shield used 🛡"
          : "Upcoming"

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: "relative" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay }}
        style={{
          aspectRatio: "1",
          borderRadius: 8,
          background: bg[state],
          border: border[state],
          boxShadow: state === "completed" ? "0 2px 8px rgba(139,92,246,0.3)" : "none",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 3,
            left: 4,
            fontSize: 9,
            color: state === "completed" ? "rgba(255,255,255,0.8)" : "var(--sch-tx-3)",
          }}
        >
          {format(date, "d")}
        </span>
        {state === "shield" && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 9,
            }}
          >
            🛡
          </span>
        )}
      </motion.div>
      <AnimatePresence>
        {hover && state !== "future" && state !== "none" && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              bottom: "112%",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "5px 10px",
              borderRadius: 8,
              fontSize: 11,
              whiteSpace: "nowrap",
              background: "rgba(20,18,30,0.97)",
              border: "1px solid var(--sch-border-2)",
              color: "var(--sch-text)",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            {format(date, "MMM d")} · {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Heatmap({
  streak,
  lastDate,
  dailyMinutes,
}: {
  streak: number
  lastDate: string | null
  dailyMinutes: number
}) {
  const today = useMemo(() => new Date(), [])
  const cells = useMemo(() => {
    const gridStart = startOfWeek(startOfMonth(today), { weekStartsOn: 1 })
    const gridEnd = endOfWeek(endOfMonth(today), { weekStartsOn: 1 })

    // Build the set of actually-completed dates from the streak window
    // ending at lastDate. No fabricated "missed" / "shield" cells.
    const completedSet = new Set<string>()
    if (lastDate && streak > 0) {
      let anchor: Date
      try {
        anchor = parseISO(lastDate)
      } catch {
        anchor = today
      }
      if (!Number.isNaN(anchor.getTime())) {
        for (let i = 0; i < streak; i++) {
          completedSet.add(format(subDays(anchor, i), "yyyy-MM-dd"))
        }
      }
    }

    const out: { date: Date; state: CellState }[] = []
    for (let d = gridStart; d <= gridEnd; d = addDays(d, 1)) {
      const inMonth = isSameMonth(d, today)
      const key = format(d, "yyyy-MM-dd")
      const isCompleted = completedSet.has(key)
      let state: CellState
      if (!inMonth) state = "none"
      else if (isCompleted) state = "completed"
      else if (isSameDay(d, today)) state = "today"
      else if (d > today) state = "future"
      else state = "none"
      out.push({ date: new Date(d), state })
    }
    return out
  }, [today, streak, lastDate])

  const legend: Array<[string, string]> = [
    ["Completed", IRIDESCENT],
    ["Missed", "rgba(255,69,58,0.4)"],
    ["Shield used", "rgba(255,159,10,0.4)"],
    ["Upcoming", "var(--sch-border)"],
  ]

  return (
    <div style={{ ...glassCard, marginTop: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={sectionTitle}>Streak Calendar</h2>
        <span style={{ fontSize: 14, color: TEXT2 }}>{format(today, "MMMM yyyy")}</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: 8,
          marginTop: 20,
          marginBottom: 6,
        }}
      >
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div
            key={d}
            style={{ fontSize: 10, color: "var(--sch-tx-4)", textAlign: "center" }}
          >
            {d}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8 }}>
        {cells.map((c, i) => (
          <HeatCell
            key={i}
            date={c.date}
            state={c.state}
            minutes={dailyMinutes}
            delay={Math.floor(i / 7) * 0.05 + (i % 7) * 0.02}
          />
        ))}
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 16 }}>
        {legend.map(([label, color]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: color }} />
            <span style={{ fontSize: 11, color: TEXT2 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Weekly bar chart ────────────────────────────────────────── */

function BarChart({ sessions }: { sessions: number }) {
  const bars = useMemo(() => {
    const split = [0.18, 0.26, 0.28, 0.28].map((f) =>
      Math.max(sessions > 0 ? 1 : 0, Math.min(7, Math.round(sessions * f))),
    )
    return split
  }, [sessions])
  const max = 7
  const weekNum = Math.ceil((differenceInCalendarDays(new Date(), startOfMonth(new Date())) + 1) / 7) + 11

  return (
    <div style={glassCard}>
      <h2 style={sectionTitle}>Weekly Activity</h2>
      <p style={{ fontSize: 13, color: TEXT2, marginTop: 2 }}>Sessions completed per week</p>

      <div style={{ position: "relative", height: 180, marginTop: 24 }}>
        {/* grid lines + y labels */}
        {[7, 5, 3, 1, 0].map((v, i) => (
          <div
            key={v}
            style={{ position: "absolute", left: 0, right: 0, top: `${(i / 4) * 100}%` }}
          >
            <span
              style={{
                position: "absolute",
                left: -2,
                top: -6,
                fontSize: 10,
                color: "var(--sch-tx-3)",
              }}
            >
              {v}
            </span>
            <div style={{ marginLeft: 18, height: 1, background: "var(--sch-card-2)" }} />
          </div>
        ))}
        {/* bars */}
        <div
          style={{
            position: "absolute",
            left: 26,
            right: 0,
            bottom: 0,
            top: 0,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
          }}
        >
          {bars.map((v, i) => {
            const isCurrent = i === bars.length - 1
            return (
              <BarColumn key={i} value={v} max={max} index={i} current={isCurrent} week={weekNum - 3 + i} />
            )
          })}
        </div>
      </div>

      <div
        style={{
          marginLeft: 26,
          display: "flex",
          justifyContent: "space-around",
          marginTop: 8,
          fontSize: 11,
          color: TEXT2,
        }}
      >
        {bars.map((_, i) => (
          <span key={i}>W{weekNum - 3 + i}</span>
        ))}
      </div>
    </div>
  )
}

function BarColumn({
  value,
  max,
  index,
  current,
  week,
}: {
  value: number
  max: number
  index: number
  current: boolean
  week: number
}) {
  const [hover, setHover] = useState(false)
  const pct = (value / max) * 100
  return (
    <div
      style={{ position: "relative", height: "100%", display: "flex", alignItems: "flex-end" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              bottom: `calc(${pct}% + 8px)`,
              left: "50%",
              transform: "translateX(-50%)",
              padding: "4px 9px",
              borderRadius: 8,
              fontSize: 11,
              whiteSpace: "nowrap",
              background: "rgba(20,18,30,0.97)",
              border: "1px solid var(--sch-border-2)",
              color: "var(--sch-text)",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            W{week}: {value} session{value === 1 ? "" : "s"}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: 40,
          height: `${pct}%`,
          minHeight: 4,
          borderRadius: "6px 6px 0 0",
          background: IRIDESCENT,
          transformOrigin: "bottom",
          boxShadow: current ? "0 -4px 20px rgba(139,92,246,0.3)" : "none",
        }}
      />
    </div>
  )
}

/* ── Goal donut ──────────────────────────────────────────────── */

function Donut({
  pct,
  completedDays,
  remainingDays,
}: {
  pct: number
  completedDays: number
  remainingDays: number
}) {
  const r = 58
  return (
    <div style={glassCard}>
      <h2 style={sectionTitle}>Goal Progress</h2>
      <div style={{ width: 140, height: 140, margin: "20px auto 0", position: "relative" }}>
        <svg width="140" height="140" viewBox="0 0 140 140">
          <defs>
            <linearGradient id="ir-donut" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="50%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
          <circle cx="70" cy="70" r={r} fill="none" stroke="var(--sch-hairline)" strokeWidth="12" />
          <motion.circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke="url(#ir-donut)"
            strokeWidth="12"
            strokeLinecap="round"
            transform="rotate(-90 70 70)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: pct / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
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
          <div style={{ fontSize: 28, fontWeight: 900, ...iriText }}>{pct}%</div>
          <div style={{ fontSize: 12, color: TEXT2 }}>Complete</div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        {[
          ["Days completed", completedDays],
          ["Days remaining", remainingDays],
        ].map(([label, val]) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              marginTop: 12,
            }}
          >
            <span style={{ color: TEXT2 }}>{label}</span>
            <span style={{ color: "var(--sch-text)", fontWeight: 600 }}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Time invested line chart ────────────────────────────────── */

function LineChart({
  dayMinutes,
  totalHours,
}: {
  dayMinutes: number[]
  totalHours: string
}) {
  const W = 600
  const H = 140
  const pad = 24
  const maxY = 30
  const pts = dayMinutes.map((m, i) => {
    const x = pad + (i / (dayMinutes.length - 1)) * (W - pad * 2)
    const y = H - pad - (Math.min(m, maxY) / maxY) * (H - pad * 2)
    return { x, y, m, day: i + 1 }
  })
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
  const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${H - pad} L ${pts[0].x} ${H - pad} Z`

  return (
    <div style={{ ...glassCard, marginTop: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={sectionTitle}>Time Invested</h2>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            padding: "4px 12px",
            borderRadius: 999,
            border: "1px solid var(--sch-border)",
            background: "var(--sch-card)",
            ...iriText,
          }}
        >
          {totalHours} total
        </span>
      </div>

      <div style={{ marginTop: 24 }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: "block" }}>
          <defs>
            <linearGradient id="ir-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(139,92,246,0.2)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0)" />
            </linearGradient>
          </defs>
          {/* y grid */}
          {[0, 15, 30].map((v) => {
            const y = H - pad - (v / maxY) * (H - pad * 2)
            return (
              <g key={v}>
                <line x1={pad} y1={y} x2={W - pad} y2={y} stroke="var(--sch-card-2)" />
                <text x={4} y={y + 3} fontSize="9" fill="var(--sch-tx-3)">
                  {v}
                </text>
              </g>
            )
          })}
          <motion.path
            d={areaPath}
            fill="url(#ir-area)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          />
          <motion.path
            d={linePath}
            fill="none"
            stroke="#818CF8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          {pts.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="#C084FC"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.04 }}
            >
              <title>
                Day {p.day} · {p.m} min
              </title>
            </motion.circle>
          ))}
        </svg>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
            padding: "0 20px",
            fontSize: 10,
            color: "var(--sch-tx-3)",
          }}
        >
          {pts.filter((_, i) => i % 3 === 0).map((p) => (
            <span key={p.day}>D{p.day}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Shareable card ──────────────────────────────────────────── */

function ShareCard({
  name,
  goal,
  weekNum,
  sessions,
  hours,
  pct,
  streak,
}: {
  name: string
  goal: string
  weekNum: number
  sessions: number
  hours: string
  pct: number
  streak: number
}) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [busy, setBusy] = useState(false)
  const todayLabel = useMemo(() => format(new Date(), "MMM d, yyyy"), [])

  // Render the card to a PNG and hand it to the OS share sheet (mobile) or
  // download it (desktop). Scale 3 → ~1080×1920, Instagram-Stories ready.
  const captureCard = async () => {
    const el = cardRef.current
    if (!el || busy) return
    setBusy(true)
    try {
      const canvas = await html2canvas(el, {
        scale: 3,
        backgroundColor: null,
        logging: false,
        useCORS: true,
      })
      canvas.toBlob(
        (blob) => {
          if (!blob) return
          const file = new File([blob], "scholify-progress.png", { type: "image/png" })
          const text = `I'm on a ${streak}-day learning streak studying ${goal}! 🔥`
          if (
            typeof navigator.share === "function" &&
            typeof navigator.canShare === "function" &&
            navigator.canShare({ files: [file] })
          ) {
            navigator
              .share({ title: "My Scholify Progress", text, files: [file] })
              .catch(() => {})
          } else {
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `scholify-day-${streak}.png`
            a.click()
            URL.revokeObjectURL(url)
          }
        },
        "image/png",
        0.95,
      )
    } catch {
      /* capture failed (rare) — non-fatal */
    } finally {
      setBusy(false)
    }
  }

  const stat = (value: string, label: string) => (
    <div style={{ flex: 1, textAlign: "center" }}>
      <div style={{ fontSize: 22, fontWeight: 900, color: "#F0EEFF" }}>{value}</div>
      <div style={{ fontSize: 11, color: "rgba(240,238,255,0.5)", marginTop: 2 }}>{label}</div>
    </div>
  )

  return (
    <div style={{ ...glassCard, marginTop: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={sectionTitle}>Share Your Progress</h2>
        <motion.button
          type="button"
          onClick={captureCard}
          disabled={busy}
          whileHover={busy ? undefined : { scale: 1.04 }}
          whileTap={busy ? undefined : { scale: 0.97 }}
          style={{
            padding: "8px 20px",
            borderRadius: 20,
            border: "none",
            background: IRIDESCENT,
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            cursor: busy ? "wait" : "pointer",
            opacity: busy ? 0.7 : 1,
          }}
        >
          {busy ? "Creating…" : "Share story →"}
        </motion.button>
      </div>

      {/* 9:16 Instagram-Stories card — this exact element is captured. */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <div
          ref={cardRef}
          style={{
            width: 360,
            height: 640,
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
            borderRadius: 24,
            background: "linear-gradient(135deg, #0D0015, #120820, #0A1520)",
            border: "1px solid rgba(139,92,246,0.25)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            padding: 32,
            display: "flex",
            flexDirection: "column",
            color: "#F0EEFF",
          }}
        >
          {/* Top */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#C084FC" }}>✦ Scholify</span>
            <span style={{ fontSize: 12, color: "rgba(240,238,255,0.5)" }}>
              Week {weekNum} · {todayLabel}
            </span>
          </div>

          {/* Hero streak */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* iridescent glow behind the number */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                width: 260,
                height: 260,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(139,92,246,0.35), rgba(139,92,246,0) 70%)",
              }}
            />
            <div
              style={{
                position: "relative",
                fontSize: 96,
                fontWeight: 900,
                lineHeight: 1,
                color: "#F0EEFF",
              }}
            >
              {streak}
            </div>
            <div
              style={{
                position: "relative",
                fontSize: 18,
                color: "rgba(240,238,255,0.6)",
                marginTop: 6,
              }}
            >
              day streak 🔥
            </div>

            {/* Goal pill */}
            <div
              style={{
                position: "relative",
                marginTop: 20,
                maxWidth: "100%",
                padding: "7px 16px",
                borderRadius: 999,
                fontSize: 13,
                color: "#F0EEFF",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(139,92,246,0.45)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              🎯 {goal}
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {stat(`${sessions}`, "Sessions")}
            <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.1)" }} />
            {stat(hours, "Hours")}
            <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.1)" }} />
            {stat(`${pct}%`, "Progress")}
          </div>

          {/* Progress bar */}
          <div
            style={{
              height: 6,
              borderRadius: 3,
              marginTop: 18,
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.min(100, Math.max(0, pct))}%`,
                background: IRIDESCENT,
              }}
            />
          </div>

          {/* Bottom */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 18,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: "#F0EEFF" }}>{name}</span>
            <span style={{ fontSize: 11, color: "rgba(240,238,255,0.5)" }}>scholifyapp.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Achievements ────────────────────────────────────────────── */

function Achievements({ streak, sessions }: { streak: number; sessions: number }) {
  const badges = [
    { icon: "🔥", name: "First Streak", desc: "Completed day 1", earned: sessions >= 1 },
    { icon: "⚡", name: "Speed Learner", desc: "5 sessions in a week", earned: sessions >= 5 },
    { icon: "🛡", name: "Resilient", desc: "Kept a 3-day streak", earned: streak >= 3 },
    { icon: "🏆", name: "Week Champion", desc: "Perfect 7 days", earned: streak >= 7 },
    { icon: "💎", name: "Month Master", desc: "30 day streak", earned: streak >= 30 },
  ]
  return (
    <div style={{ ...glassCard, marginTop: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={sectionTitle}>Recent Achievements</h2>
        <Link
          to="/achievements"
          style={{ fontSize: 13, color: TEXT2, textDecoration: "none" }}
        >
          View all →
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 16,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {badges.map((b) => (
          <motion.div
            key={b.name}
            whileHover={b.earned ? { scale: 1.05, y: -2, borderColor: "rgba(139,92,246,0.5)" } : undefined}
            style={{
              flex: "0 0 auto",
              minWidth: 120,
              textAlign: "center",
              padding: 16,
              borderRadius: 16,
              background: "var(--sch-card)",
              border: `1px solid ${b.earned ? "rgba(139,92,246,0.3)" : "var(--sch-border)"}`,
              boxShadow: b.earned ? "0 0 20px rgba(139,92,246,0.12)" : "none",
              opacity: b.earned ? 1 : 0.35,
              filter: b.earned ? "none" : "grayscale(1)",
            }}
          >
            <div style={{ fontSize: 40, lineHeight: 1 }}>{b.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sch-text)", marginTop: 8 }}>
              {b.name}
            </div>
            <div style={{ fontSize: 10, color: TEXT2, lineHeight: 1.4, marginTop: 2 }}>
              {b.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────── */

const RANGES = ["7 days", "30 days", "All time"] as const

export default function Progress() {
  const { user } = useAuth()
  const plan = useMemo(readPlan, [])
  const progress = useMemo(readProgress, [])
  const [range, setRange] = useState<(typeof RANGES)[number]>("30 days")

  const firstName = (user?.user_metadata?.first_name as string) || "Learner"
  const lastName = (user?.user_metadata?.last_name as string) || ""
  const shareName = lastName
    ? `${firstName} ${lastName.charAt(0).toUpperCase()}.`
    : firstName
  const goal = plan.goal?.trim() || "Your learning goal"
  const dailyMinutes = Math.max(5, Number(plan.daily_minutes) || 20)
  const tasks = Array.isArray(plan.tasks) ? plan.tasks : []
  const sessions = progress.completed.length

  const today = new Date()
  const deadline = plan.deadline ? new Date(plan.deadline) : null
  const daysRemaining =
    deadline && !Number.isNaN(deadline.getTime())
      ? Math.max(0, differenceInCalendarDays(deadline, today))
      : Math.max(0, (tasks.length || 30) - sessions)
  const totalDays = Math.max(daysRemaining + sessions, tasks.length, 1)
  const goalPct = Math.round((sessions / totalDays) * 100)
  const totalMinutes = sessions * dailyMinutes
  const totalHours = (totalMinutes / 60).toFixed(1)
  const weekNum = 11 + Math.ceil((differenceInCalendarDays(today, startOfMonth(today)) + 1) / 7)

  // Per-day minutes for the last 14 days (mock, consistent with the streak).
  const dayMinutes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const ago = 13 - i
        if (ago < progress.streak) return dailyMinutes + ((i * 7) % 3) * 4 - 2
        return i % 4 === 0 ? 0 : Math.max(0, dailyMinutes - 9 + ((i * 5) % 3) * 6)
      }),
    [progress.streak, dailyMinutes],
  )

  /* ── Empty state ── */
  if (sessions === 0) {
    return (
      <DashboardLayout>
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: 64, opacity: 0.85 }}
          >
            📊
          </motion.div>
          <div
            style={{
              marginTop: 8,
              fontSize: 18,
              fontWeight: 700,
              color: "var(--sch-text)",
            }}
          >
            No data yet.
          </div>
          <p
            style={{
              fontSize: 14,
              color: "var(--sch-tx-3)",
              marginTop: 6,
              maxWidth: 300,
              lineHeight: 1.6,
            }}
          >
            Complete your first task to start tracking your progress.
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ marginTop: 20 }}>
            <Link
              to="/dashboard"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                borderRadius: 12,
                background: IRIDESCENT,
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 0 24px rgba(139,92,246,0.3)",
              }}
            >
              Go to Today →
            </Link>
          </motion.div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 1080, margin: "0 auto" }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "var(--sch-text)",
                letterSpacing: "-0.5px",
              }}
            >
              Your Progress
            </h1>
            <p style={{ fontSize: 14, color: "var(--sch-tx-3)", marginTop: 4 }}>
              Keep showing up. Every day compounds.
            </p>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {RANGES.map((r) => {
              const active = r === range
              return (
                <motion.button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    fontSize: 13,
                    cursor: "pointer",
                    border: `1px solid ${active ? "transparent" : "var(--sch-border)"}`,
                    background: active ? IRIDESCENT : "var(--sch-card)",
                    color: active ? "#fff" : "var(--sch-tx-2)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {r}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Section 1 — stats grid */}
        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            gap: 16,
          }}
        >
          <StatCard index={0} icon="🔥" label="Current Streak" target={progress.streak} decimals={0} suffix=" days" trend="on a roll" />
          <StatCard index={1} icon="✅" label="Total Sessions" target={sessions} decimals={0} suffix="" trend="this week" />
          <StatCard index={2} icon="⏱" label="Time Invested" target={Number(totalHours)} decimals={1} suffix=" hrs" trend="climbing" />
          <StatCard index={3} icon="🎯" label="Goal Progress" target={goalPct} decimals={0} suffix="%" trend="ahead of pace" />
        </div>

        {/* Section 1b — Learning style */}
        <div style={{ marginTop: 24 }}>
          <LearningStyleCard />
        </div>

        {/* Section 2 — streak heatmap */}
        <Heatmap streak={progress.streak} lastDate={progress.lastDate} dailyMinutes={dailyMinutes} />

        {/* Section 3 — weekly activity + donut */}
        <div className="grid grid-cols-1 lg:grid-cols-5" style={{ gap: 20, marginTop: 20 }}>
          <div className="lg:col-span-3">
            <BarChart sessions={sessions} />
          </div>
          <div className="lg:col-span-2">
            <Donut pct={goalPct} completedDays={sessions} remainingDays={daysRemaining} />
          </div>
        </div>

        {/* Section 4 — time invested */}
        <LineChart dayMinutes={dayMinutes} totalHours={`${totalHours} hrs`} />

        {/* Section 5 — shareable card */}
        <ShareCard
          name={shareName}
          goal={goal}
          weekNum={weekNum}
          sessions={sessions}
          hours={totalHours}
          pct={goalPct}
          streak={progress.streak}
        />

        {/* Section 5a — living streak tree */}
        <div
          style={{
            marginTop: 24,
            padding: 20,
            borderRadius: 18,
            background: "var(--sch-card)",
            border: "1px solid var(--sch-border)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <StreakTree variant="compact" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 12, color: "var(--sch-tx-3)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Living streak tree
            </p>
            <p style={{ marginTop: 4, fontSize: 16, fontWeight: 700, color: "var(--sch-text)" }}>
              Your tree grows with every day you show up.
            </p>
            <p style={{ marginTop: 4, fontSize: 13, color: "var(--sch-tx-2)" }}>
              Tap the tree to view the full timeline and share your stage.
            </p>
          </div>
        </div>

        {/* Section 5b — photo journal */}
        <div style={{ marginTop: 24 }}>
          <PhotoGallery />
        </div>

        {/* Section 6 — achievements */}
        <Achievements streak={progress.streak} sessions={sessions} />
      </motion.div>
    </DashboardLayout>
  )
}
