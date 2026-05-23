import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "motion/react"
import { differenceInCalendarDays } from "date-fns"
import { useAuth } from "@/lib/auth"
import { readPlan, readProgress } from "@/lib/scholify-data"
import { loadCalendarAccount } from "@/lib/calendar"
import { IRIDESCENT } from "@/components/auth/auth-ui"

/* ──────────────────────────────────────────────────────────────
 *  Shared app shell for the signed-in screens (Dashboard, Progress…).
 *  Renders the sidebar + mobile tab bar; pages supply their content.
 * ────────────────────────────────────────────────────────────── */

/** Iridescent gradient as text fill — the app-wide accent. */
export const iriText: CSSProperties = {
  background: IRIDESCENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
}

const LAYOUT_CSS = `
  @keyframes dash-spin { to { transform: rotate(360deg); } }
  @keyframes sch-shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  .dash-scroll::-webkit-scrollbar { width: 7px; }
  .dash-scroll::-webkit-scrollbar-thumb { background: var(--sch-border); border-radius: 8px; }
`

export const NAV = [
  { icon: "🏠", label: "Today", to: "/dashboard" },
  { icon: "📈", label: "Progress", to: "/progress" },
  { icon: "🎯", label: "My Goals", to: "/goals" },
  { icon: "📚", label: "Resources", to: "/resources" },
  { icon: "💬", label: "Ask Lara", to: "/chat" },
  { icon: "🏆", label: "Achievements", to: "/achievements" },
  { icon: "⚙️", label: "Settings", to: "/settings" },
]

/* ── Shared bits ─────────────────────────────────────────────── */

export function ProgressBar({ pct, height = 6 }: { pct: number; height?: number }) {
  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius: height / 2,
        background: "var(--sch-hairline)",
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

export function Pill({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 12px",
        borderRadius: 999,
        fontSize: 12,
        border: "1px solid var(--sch-border)",
        background: "var(--sch-card)",
        color: "var(--sch-tx-1)",
        ...style,
      }}
    >
      {children}
    </span>
  )
}

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

function NavItem({
  item,
  active,
  badge,
}: {
  item: (typeof NAV)[number]
  active: boolean
  badge?: boolean
}) {
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
        color: active ? "var(--sch-text)" : "var(--sch-tx-2)",
        fontWeight: active ? 600 : 400,
      }}
      onMouseEnter={(e) => {
        if (active) return
        e.currentTarget.style.background = "var(--sch-card-2)"
        e.currentTarget.style.color = "var(--sch-tx-1)"
      }}
      onMouseLeave={(e) => {
        if (active) return
        e.currentTarget.style.background = "transparent"
        e.currentTarget.style.color = "var(--sch-tx-2)"
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
      <span style={{ position: "relative", fontSize: 16 }}>
        {item.icon}
        {badge && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 22 }}
            style={{
              position: "absolute",
              top: -2,
              right: -4,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#34D399",
              boxShadow: "0 0 8px rgba(52,211,153,0.7)",
            }}
            aria-label="calendar connected"
          />
        )}
      </span>
      {item.label}
    </Link>
  )
}

/* ── Layout ──────────────────────────────────────────────────── */

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const location = useLocation()

  const plan = useMemo(readPlan, [])
  const [progress] = useState(readProgress)
  const [calendarConnected, setCalendarConnected] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function check() {
      if (!user?.id) return
      const acc = await loadCalendarAccount(user.id)
      if (cancelled) return
      setCalendarConnected(
        Boolean(
          (acc?.google_access_token && acc.calendar_sync_enabled) ||
            acc?.calcom_api_key,
        ),
      )
    }
    check()
    return () => {
      cancelled = true
    }
  }, [user?.id])

  const firstName = (user?.user_metadata?.first_name as string) || "there"
  const goal = plan.goal?.trim() || "Your learning goal"
  const tasks = Array.isArray(plan.tasks) ? plan.tasks : []
  const completedCount = progress.completed.length

  const deadline = plan.deadline ? new Date(plan.deadline) : null
  const daysRemaining =
    deadline && !Number.isNaN(deadline.getTime())
      ? Math.max(0, differenceInCalendarDays(deadline, new Date()))
      : Math.max(0, (tasks.length || 30) - completedCount)
  const totalDays = Math.max(daysRemaining + completedCount, tasks.length, 1)
  const goalPct = Math.round((completedCount / totalDays) * 100)

  return (
    <div style={{ minHeight: "100dvh", background: "var(--sch-bg)" }}>
      <style>{LAYOUT_CSS}</style>

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
          background: "var(--sch-card)",
          borderRight: "1px solid var(--sch-hairline)",
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
                color: "var(--sch-text)",
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

        {/* Streak card */}
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            marginTop: 24,
            padding: "20px 16px",
            borderRadius: 16,
            textAlign: "center",
            background: "var(--sch-card)",
            border: "1px solid var(--sch-border)",
            boxShadow: "0 0 30px rgba(139,92,246,0.1)",
          }}
        >
          <div style={{ fontSize: 24 }}>🔥</div>
          <div style={{ fontSize: 28, fontWeight: 800, ...iriText, marginTop: 2 }}>
            {progress.streak}
          </div>
          <div style={{ fontSize: 11, color: "var(--sch-tx-2)" }}>day streak</div>
          <div style={{ fontSize: 12, color: "rgba(255,159,67,0.9)", marginTop: 4 }}>
            🛡 {progress.shields} shield{progress.shields === 1 ? "" : "s"}
          </div>
        </motion.div>

        {/* Nav */}
        <nav style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV.map((item) => (
            <NavItem
              key={item.to}
              item={item}
              active={location.pathname === item.to}
              badge={item.to === "/settings" && calendarConnected}
            />
          ))}
        </nav>

        {/* Goal mini card */}
        <div style={{ marginTop: "auto", paddingTop: 20 }}>
          <div
            style={{
              padding: 14,
              borderRadius: 12,
              background: "var(--sch-card)",
              border: "1px solid var(--sch-border)",
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "var(--sch-tx-2)",
                marginBottom: 8,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {goal}
            </div>
            <ProgressBar pct={goalPct} />
            <div style={{ fontSize: 11, color: "var(--sch-tx-3)", marginTop: 8 }}>
              {goalPct}% · {daysRemaining} day{daysRemaining === 1 ? "" : "s"} left
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="lg:pl-[240px]">
        <div className="px-4 py-5 lg:px-10 lg:py-8" style={{ paddingBottom: 110 }}>
          {children}
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
          background: "var(--sch-bg-blur)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: "1px solid var(--sch-hairline)",
          zIndex: 30,
        }}
      >
        {NAV.map((item) => {
          const active = location.pathname === item.to
          const showBadge = item.to === "/settings" && calendarConnected
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
                color: active ? "var(--sch-text)" : "var(--sch-tx-2)",
                fontWeight: active ? 600 : 400,
              }}
            >
              <span style={{ position: "relative", fontSize: 18 }}>
                {item.icon}
                {showBadge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 360, damping: 22 }}
                    style={{
                      position: "absolute",
                      top: -1,
                      right: -3,
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#34D399",
                      boxShadow: "0 0 6px rgba(52,211,153,0.7)",
                    }}
                  />
                )}
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
