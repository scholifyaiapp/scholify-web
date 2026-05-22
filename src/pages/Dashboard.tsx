import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import confetti from "canvas-confetti"
import { format, differenceInCalendarDays } from "date-fns"
import { useAuth } from "@/lib/auth"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { IRIDESCENT } from "@/components/auth/auth-ui"

/* ──────────────────────────────────────────────────────────────
 *  Scholify dashboard — the screen users see every day.
 *  Plan data comes from localStorage (saved by onboarding/loading);
 *  daily progress is tracked locally with a best-effort Supabase sync.
 * ────────────────────────────────────────────────────────────── */

/* ── Types & data ────────────────────────────────────────────── */

type ResourceType = "video" | "reading" | "practice" | "reflection" | "exercise"

interface PlanTask {
  day_number: number
  week_number: number
  task_title: string
  task_description: string
  estimated_minutes: number
  resource_type: ResourceType
}

interface StoredPlan {
  goal?: string
  deadline?: string | null
  daily_minutes?: number
  tasks?: PlanTask[]
}

interface Progress {
  completed: number[]
  streak: number
  shields: number
  lastDate: string | null
}

const RESOURCE: Record<ResourceType, { icon: string; label: string }> = {
  video: { icon: "📹", label: "Video" },
  reading: { icon: "📖", label: "Reading" },
  practice: { icon: "✍️", label: "Practice" },
  reflection: { icon: "🧭", label: "Reflection" },
  exercise: { icon: "🏋️", label: "Exercise" },
}

function readPlan(): StoredPlan {
  try {
    const raw = window.localStorage.getItem("scholify-plan")
    if (raw) return JSON.parse(raw) as StoredPlan
    const ob = window.localStorage.getItem("scholify-onboarding")
    if (ob) return { ...(JSON.parse(ob) as StoredPlan), tasks: [] }
  } catch {
    /* ignore */
  }
  return {}
}

function readProgress(): Progress {
  try {
    const raw = window.localStorage.getItem("scholify-progress")
    if (raw) return JSON.parse(raw) as Progress
  } catch {
    /* ignore */
  }
  // Fresh start — 2 welcome shields to protect the first streak.
  return { completed: [], streak: 0, shields: 2, lastDate: null }
}

function writeProgress(p: Progress) {
  try {
    window.localStorage.setItem("scholify-progress", JSON.stringify(p))
  } catch {
    /* ignore */
  }
}

function resourceUrl(task: PlanTask): string {
  const q = encodeURIComponent(task.task_title)
  return task.resource_type === "video"
    ? `https://www.youtube.com/results?search_query=${q}`
    : `https://www.google.com/search?q=${q}`
}

/* ── Shared styles ───────────────────────────────────────────── */

const iriText: CSSProperties = {
  background: IRIDESCENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
}

const DASH_CSS = `
  @keyframes dash-spin { to { transform: rotate(360deg); } }
  .dash-scroll::-webkit-scrollbar { width: 7px; }
  .dash-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 8px; }
`

/* ── Typewriter hook ─────────────────────────────────────────── */

function useTypewriter(text: string, speed = 30): string {
  const [shown, setShown] = useState("")
  useEffect(() => {
    setShown("")
    let i = 0
    const id = setInterval(() => {
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return shown
}

/* ── Progress bar (with shimmer) ─────────────────────────────── */

function ProgressBar({ pct, height = 6 }: { pct: number; height?: number }) {
  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius: height / 2,
        background: "rgba(255,255,255,0.05)",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: "100%", background: IRIDESCENT, position: "relative" }}
      >
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)",
          }}
        />
      </motion.div>
    </div>
  )
}

/* ── Sidebar pieces ──────────────────────────────────────────── */

const NAV = [
  { icon: "🏠", label: "Today", to: "/dashboard" },
  { icon: "📈", label: "Progress", to: "/progress" },
  { icon: "🎯", label: "My Goals", to: "/goals" },
  { icon: "🏆", label: "Achievements", to: "/achievements" },
  { icon: "⚙️", label: "Settings", to: "/settings" },
]

function Avatar({ initial, size = 40 }: { initial: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: "50%",
        background: IRIDESCENT,
        border: "2px solid rgba(139,92,246,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 800,
        fontSize: size * 0.42,
      }}
    >
      {initial}
    </div>
  )
}

function NavItem({ item, active }: { item: (typeof NAV)[number]; active: boolean }) {
  return (
    <Link
      to={item.to}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        borderRadius: 10,
        fontSize: 14,
        textDecoration: "none",
        transition: "all 0.2s ease",
        background: active ? "rgba(139,92,246,0.12)" : "transparent",
        border: `1px solid ${active ? "rgba(139,92,246,0.2)" : "transparent"}`,
        color: active ? "#F0EEFF" : "rgba(240,238,255,0.4)",
        fontWeight: active ? 600 : 400,
      }}
      onMouseEnter={(e) => {
        if (active) return
        e.currentTarget.style.background = "rgba(255,255,255,0.04)"
        e.currentTarget.style.color = "rgba(240,238,255,0.7)"
      }}
      onMouseLeave={(e) => {
        if (active) return
        e.currentTarget.style.background = "transparent"
        e.currentTarget.style.color = "rgba(240,238,255,0.4)"
      }}
    >
      {active && (
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 8,
            bottom: 8,
            width: 3,
            borderRadius: 3,
            background: "rgba(99,102,241,0.9)",
          }}
        />
      )}
      <span style={{ fontSize: 16 }}>{item.icon}</span>
      {item.label}
    </Link>
  )
}

function StreakCard({ streak, shields }: { streak: number; shields: number }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{
        marginTop: 24,
        padding: "20px 16px",
        borderRadius: 16,
        textAlign: "center",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 0 30px rgba(139,92,246,0.1)",
      }}
    >
      <div style={{ fontSize: 24 }}>🔥</div>
      <div style={{ fontSize: 28, fontWeight: 800, ...iriText, marginTop: 2 }}>{streak}</div>
      <div style={{ fontSize: 11, color: "rgba(240,238,255,0.4)" }}>day streak</div>
      <div style={{ fontSize: 12, color: "rgba(255,159,67,0.9)", marginTop: 4 }}>
        🛡 {shields} shield{shields === 1 ? "" : "s"}
      </div>
    </motion.div>
  )
}

function GoalMiniCard({
  goal,
  pct,
  daysLeft,
}: {
  goal: string
  pct: number
  daysLeft: number
}) {
  return (
    <div
      style={{
        marginTop: "auto",
        paddingTop: 20,
      }}
    >
      <div
        style={{
          padding: 14,
          borderRadius: 12,
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: "rgba(240,238,255,0.5)",
            marginBottom: 8,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {goal}
        </div>
        <ProgressBar pct={pct} />
        <div style={{ fontSize: 11, color: "rgba(240,238,255,0.35)", marginTop: 8 }}>
          {pct}% · {daysLeft} day{daysLeft === 1 ? "" : "s"} left
        </div>
      </div>
    </div>
  )
}

/* ── Stat card ───────────────────────────────────────────────── */

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      style={{
        padding: "16px 20px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 800, ...iriText }}>{value}</div>
      <div style={{ fontSize: 13, color: "rgba(240,238,255,0.4)", marginTop: 4 }}>{label}</div>
    </motion.div>
  )
}

/* ── Glass pill ──────────────────────────────────────────────── */

function Pill({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 12px",
        borderRadius: 999,
        fontSize: 12,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        color: "rgba(240,238,255,0.7)",
        ...style,
      }}
    >
      {children}
    </span>
  )
}

/* ── Page ────────────────────────────────────────────────────── */

export default function Dashboard() {
  const { user } = useAuth()
  const location = useLocation()

  const plan = useMemo(readPlan, [])
  const [progress, setProgress] = useState<Progress>(readProgress)
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle")

  const firstName = (user?.user_metadata?.first_name as string) || "there"
  const goal = plan.goal?.trim() || "Your learning goal"
  const dailyMinutes = Math.max(5, Number(plan.daily_minutes) || 20)
  const tasks = Array.isArray(plan.tasks) ? plan.tasks : []

  const today = useMemo(() => new Date(), [])
  const todayStr = format(today, "yyyy-MM-dd")
  const deadline = plan.deadline ? new Date(plan.deadline) : null
  const daysRemaining =
    deadline && !Number.isNaN(deadline.getTime())
      ? Math.max(0, differenceInCalendarDays(deadline, today))
      : Math.max(0, (tasks.length || 30) - progress.completed.length)

  const doneToday = progress.lastDate === todayStr
  const currentDay = doneToday
    ? Math.max(1, progress.completed.length)
    : progress.completed.length + 1
  const totalDays = Math.max(currentDay, daysRemaining + progress.completed.length, tasks.length, 1)
  const goalPct = Math.round((progress.completed.length / totalDays) * 100)

  // Initialise the button state from whether today is already done.
  useEffect(() => {
    if (doneToday) setStatus("done")
  }, [doneToday])

  const fallbackTask: PlanTask = {
    day_number: currentDay,
    week_number: Math.floor((currentDay - 1) / 7) + 1,
    task_title: "Start with one focused session",
    task_description:
      "Open your goal, find the very first thing you don't yet know, and give it one full focused block. Momentum is the whole game today.",
    estimated_minutes: dailyMinutes,
    resource_type: "practice",
  }
  const task: PlanTask =
    tasks.length > 0 ? tasks[Math.min(currentDay, tasks.length) - 1] : fallbackTask
  const resType = RESOURCE[task.resource_type] ?? RESOURCE.practice

  const isDone = status === "done"

  const handleComplete = useCallback(async () => {
    if (status !== "idle") return
    setStatus("loading")

    // 1. Persist locally (source of truth for the UI).
    const next: Progress = {
      completed: progress.completed.includes(currentDay)
        ? progress.completed
        : [...progress.completed, currentDay],
      streak: progress.streak + 1,
      shields: progress.shields,
      lastDate: todayStr,
    }

    // 2. Best-effort Supabase sync (table may not exist yet — non-fatal).
    if (isSupabaseConfigured && user) {
      await supabase
        .from("progress")
        .insert({
          user_id: user.id,
          day_number: currentDay,
          completed_at: new Date().toISOString(),
        })
        .then(
          () => {},
          () => {},
        )
    }

    // Brief pause so the "Saving..." state is perceptible.
    await new Promise((r) => setTimeout(r, 850))

    writeProgress(next)
    setProgress(next)
    setStatus("done")

    // 3. Confetti 🎉
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#8B5CF6", "#F472B6", "#38BDF8", "#34D399"],
    })
  }, [status, progress, currentDay, todayStr, user])

  /* ── Lara message ──────────────────────────────────────────── */

  const laraMessage = isDone
    ? `That's day ${currentDay} done — your streak is now ${progress.streak}. Showing up beats motivation every time. Rest well; tomorrow's task is ready when you are.`
    : `You're on day ${currentDay} of your "${goal}" journey. Today's task builds straight on what you've already done — ${dailyMinutes} focused minutes and you've kept the chain alive. Let's go.`
  const typed = useTypewriter(laraMessage, 30)

  const hour = today.getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"

  /* ── Render ────────────────────────────────────────────────── */

  return (
    <div style={{ minHeight: "100dvh", background: "#050508" }}>
      <style>{DASH_CSS}</style>

      {/* ── Sidebar (desktop) ── */}
      <aside
        className="hidden lg:flex dash-scroll"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: 240,
          flexDirection: "column",
          padding: "24px 16px",
          background: "rgba(255,255,255,0.02)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          overflowY: "auto",
          zIndex: 20,
        }}
      >
        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar initial={firstName.charAt(0).toUpperCase()} />
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#F0EEFF",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {firstName}
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "1px 7px",
                borderRadius: 999,
                background: "linear-gradient(135deg,#FFD66B,#F5A623)",
                color: "#3A2A00",
              }}
            >
              FREE
            </span>
          </div>
        </div>

        <StreakCard streak={progress.streak} shields={progress.shields} />

        {/* Nav */}
        <nav style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV.map((item) => (
            <NavItem key={item.to} item={item} active={location.pathname === item.to} />
          ))}
        </nav>

        <GoalMiniCard goal={goal} pct={goalPct} daysLeft={daysRemaining} />
      </aside>

      {/* ── Main content ── */}
      <main className="lg:pl-[240px]">
        <div
          className="px-4 py-5 lg:px-10 lg:py-8"
          style={{ maxWidth: 860, margin: "0 auto", paddingBottom: 110 }}
        >
          {/* Top bar */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: "#F0EEFF" }}>
                {greeting}, {firstName} 👋
              </h1>
              <div style={{ fontSize: 13, color: "rgba(240,238,255,0.4)", marginTop: 2 }}>
                {format(today, "EEEE, MMMM d")}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {["🔔", "⚙️"].map((icon, i) => (
                <button
                  key={i}
                  type="button"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    cursor: "pointer",
                    fontSize: 16,
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Today's task card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginTop: 24,
              padding: 32,
              borderRadius: 24,
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(139,92,246,0.2)",
              boxShadow: "0 0 60px rgba(139,92,246,0.08)",
            }}
          >
            {/* Top row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div>
                <Pill>
                  {resType.icon} {resType.label}
                </Pill>
                <div style={{ fontSize: 12, color: "rgba(240,238,255,0.4)", marginTop: 6 }}>
                  Day {currentDay} of {totalDays}
                </div>
              </div>
              <Pill>⏱ {task.estimated_minutes || dailyMinutes} min</Pill>
            </div>

            {/* Title */}
            <h2
              style={{
                marginTop: 20,
                fontSize: "clamp(20px,2.5vw,26px)",
                fontWeight: 800,
                color: "#F0EEFF",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
              }}
            >
              {task.task_title}
            </h2>

            {/* Description */}
            <p
              style={{
                marginTop: 12,
                fontSize: 15,
                color: "rgba(240,238,255,0.5)",
                lineHeight: 1.7,
                maxWidth: 600,
              }}
            >
              {task.task_description}
            </p>

            <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "20px 0" }} />

            {/* Progress row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                color: "rgba(240,238,255,0.4)",
                marginBottom: 10,
              }}
            >
              <span>{goalPct}% complete</span>
              <span>{daysRemaining} days remaining</span>
            </div>
            <ProgressBar pct={goalPct} />

            {/* Best resource */}
            <a
              href={resourceUrl(task)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "block", marginTop: 20 }}
            >
              <div style={{ fontSize: 12, color: "rgba(240,238,255,0.4)", marginBottom: 8 }}>
                📌 Best resource today
              </div>
              <motion.div
                whileHover={{ scale: 1.01, boxShadow: "0 0 24px rgba(139,92,246,0.2)" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "12px 16px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 13,
                }}
              >
                <span
                  style={{
                    color: "rgba(240,238,255,0.75)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {resType.icon} Curated for: {task.task_title}
                </span>
                <span style={{ color: "rgba(139,92,246,0.9)", flexShrink: 0, fontWeight: 600 }}>
                  → Open
                </span>
              </motion.div>
            </a>

            {/* Mark complete */}
            <motion.button
              type="button"
              onClick={handleComplete}
              disabled={status !== "idle"}
              whileHover={
                status === "idle"
                  ? { scale: 1.02, boxShadow: "0 0 60px rgba(139,92,246,0.4)" }
                  : undefined
              }
              whileTap={status === "idle" ? { scale: 0.98 } : undefined}
              style={{
                width: "100%",
                height: 56,
                marginTop: 24,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                fontSize: 17,
                fontWeight: 700,
                color: "#fff",
                cursor: status === "idle" ? "pointer" : "default",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                opacity: status === "loading" ? 0.7 : 1,
                background: isDone
                  ? "linear-gradient(135deg,rgba(52,211,153,0.7),rgba(16,185,129,0.7))"
                  : "linear-gradient(135deg,rgba(139,92,246,0.7),rgba(99,102,241,0.7))",
                border: `1px solid ${isDone ? "rgba(52,211,153,0.5)" : "rgba(139,92,246,0.5)"}`,
                boxShadow: isDone
                  ? "0 0 40px rgba(52,211,153,0.2)"
                  : "0 0 40px rgba(139,92,246,0.25)",
              }}
            >
              {status === "loading" && (
                <span
                  aria-hidden
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.35)",
                    borderTopColor: "#fff",
                    animation: "dash-spin 0.6s linear infinite",
                  }}
                />
              )}
              {status === "idle" && "Mark Today Complete ✓"}
              {status === "loading" && "Saving..."}
              {status === "done" && "✅ Done for today!"}
            </motion.button>
          </motion.div>

          {/* Lara message card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginTop: 20,
              padding: 24,
              borderRadius: 20,
              background: "rgba(139,92,246,0.06)",
              border: "1px solid rgba(139,92,246,0.15)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: IRIDESCENT,
                    border: "2px solid rgba(139,92,246,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 14,
                  }}
                >
                  L
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(192,132,252,0.7)" }}>
                  Lara · Your coach
                </span>
              </div>
              <button
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  color: "rgba(240,238,255,0.35)",
                }}
                title="Voice playback coming soon"
              >
                ▶ Hear Lara
              </button>
            </div>
            <p
              style={{
                marginTop: 12,
                fontSize: 15,
                color: "rgba(240,238,255,0.7)",
                lineHeight: 1.7,
                fontStyle: "italic",
                minHeight: 52,
              }}
            >
              {typed}
              <span style={{ opacity: typed.length < laraMessage.length ? 1 : 0 }}>▌</span>
            </p>
          </motion.div>

          {/* Stats row */}
          <div
            style={{
              marginTop: 20,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
              gap: 12,
            }}
          >
            <StatCard label="🔥 Current Streak" value={`${progress.streak}`} />
            <StatCard label="✅ Total Sessions" value={`${progress.completed.length}`} />
            <StatCard
              label="⏱ Time Invested"
              value={formatTime(progress.completed.length * dailyMinutes)}
            />
            <StatCard label="🎯 Goal Progress" value={`${goalPct}%`} />
          </div>
        </div>
      </main>

      {/* ── Mobile tab bar ── */}
      <nav
        className="lg:hidden"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "space-around",
          padding: "8px 4px",
          paddingBottom: "max(8px, env(safe-area-inset-bottom))",
          background: "rgba(5,5,8,0.9)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          zIndex: 30,
        }}
      >
        {NAV.map((item) => {
          const active = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                padding: "4px 8px",
                textDecoration: "none",
                fontSize: 10,
                color: active ? "#F0EEFF" : "rgba(240,238,255,0.4)",
                fontWeight: active ? 600 : 400,
              }}
            >
              <span style={active ? iriText : undefined} >
                <span style={{ fontSize: 18 }}>{item.icon}</span>
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

function formatTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  if (h === 0) return `${m} min`
  return `${h} hr${h === 1 ? "" : "s"} ${m} min`
}
