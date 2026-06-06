import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react"
import { motion, AnimatePresence } from "motion/react"
import { useAuth } from "@/lib/auth"
import { readPlan, readProgress } from "@/lib/scholify-data"
import {
  disconnectGoogle,
  getGoogleAuthUrl,
  isGoogleConfigured,
  loadCalendarAccount,
  syncWeekToCalendar,
  updateCalendarAccount,
  type CalendarAccount,
} from "@/lib/calendar"
import {
  syncWeekToCalcom,
  testCalcomKey,
} from "@/lib/calcom"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import { useToast } from "@/components/Toast"

/* ──────────────────────────────────────────────────────────────
 *  Calendar Sync — Google Calendar + Cal.com.
 *
 *  Mounted inside Settings. Pulls/writes from the per-user
 *  `calendar_accounts` row (best-effort, falls back to local).
 * ────────────────────────────────────────────────────────────── */

const TEXT2 = "var(--sch-tx-2)"
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const cardStyle: CSSProperties = {
  padding: 24,
  borderRadius: 20,
  background: "var(--sch-card)",
  border: "1px solid var(--sch-border)",
  marginTop: 16,
}

const REMINDER_OPTIONS = [
  { value: 5, label: "5 minutes before" },
  { value: 10, label: "10 minutes before" },
  { value: 15, label: "15 minutes before" },
  { value: 30, label: "30 minutes before" },
  { value: 60, label: "1 hour before" },
] as const

/* ── Toggle (matches Settings.tsx) ───────────────────────────── */

function Toggle({
  on,
  onChange,
  disabled,
}: {
  on: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
}) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      onClick={() => !disabled && onChange(!on)}
      aria-pressed={on}
      style={{
        width: 44,
        height: 24,
        flexShrink: 0,
        borderRadius: 12,
        padding: 0,
        position: "relative",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        background: on ? IRIDESCENT : "var(--sch-border-2)",
        border: `1px solid ${on ? "rgba(139,92,246,0.5)" : "var(--sch-border-2)"}`,
        boxShadow: on ? "0 0 10px rgba(139,92,246,0.3)" : "none",
      }}
    >
      <motion.span
        animate={{ x: on ? 22 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        style={{
          position: "absolute",
          top: 2,
          left: 0,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
        }}
      />
    </motion.button>
  )
}

/* ── Status badge ────────────────────────────────────────────── */

function StatusBadge({ kind }: { kind: "connected" | "idle" | "warn" }) {
  const colors: Record<typeof kind, { bg: string; fg: string; dot: string; label: string }> = {
    connected: {
      bg: "rgba(52,211,153,0.1)",
      fg: "#34D399",
      dot: "#34D399",
      label: "Connected",
    },
    idle: {
      bg: "rgba(139,92,246,0.08)",
      fg: "rgba(192,132,252,0.9)",
      dot: "rgba(192,132,252,0.9)",
      label: "Not connected",
    },
    warn: {
      bg: "rgba(255,159,10,0.08)",
      fg: "#FFB454",
      dot: "#FFB454",
      label: "Not configured",
    },
  }
  const c = colors[kind]
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: 999,
        background: c.bg,
        color: c.fg,
        border: `1px solid ${c.fg}33`,
      }}
    >
      <motion.span
        animate={
          kind === "connected"
            ? { scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }
            : { opacity: 0.8 }
        }
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: c.dot,
        }}
      />
      {c.label}
    </span>
  )
}

/* ── Provider row ────────────────────────────────────────────── */

function ProviderRow({
  icon,
  title,
  status,
  children,
}: {
  icon: string
  title: string
  status: "connected" | "idle" | "warn"
  children?: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{
        padding: 16,
        borderRadius: 14,
        background: "var(--sch-card-2)",
        border: "1px solid var(--sch-border)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 22 }}>{icon}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--sch-text)" }}>
              {title}
            </div>
          </div>
        </div>
        <StatusBadge kind={status} />
      </div>
      {children && <div style={{ marginTop: 14 }}>{children}</div>}
    </motion.div>
  )
}

/* ── Reminder dropdown ───────────────────────────────────────── */

function ReminderDropdown({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  const [open, setOpen] = useState(false)
  const current = REMINDER_OPTIONS.find((o) => o.value === value) ?? REMINDER_OPTIONS[2]
  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          borderRadius: 10,
          fontSize: 13,
          color: "var(--sch-text)",
          background: "var(--sch-card)",
          border: "1px solid var(--sch-border)",
          cursor: "pointer",
        }}
      >
        {current.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} style={{ fontSize: 10, color: TEXT2 }}>
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                right: 0,
                zIndex: 41,
                minWidth: 200,
                padding: 6,
                borderRadius: 12,
                background: "var(--sch-bg-2)",
                border: "1px solid var(--sch-border-2)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
              }}
            >
              {REMINDER_OPTIONS.map((o) => {
                const active = o.value === value
                return (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => {
                      onChange(o.value)
                      setOpen(false)
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: 14,
                      textAlign: "left",
                      ...(active ? iriText : { color: "var(--sch-tx-1)" }),
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(139,92,246,0.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {o.label}
                    {active && <span>✓</span>}
                  </button>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── The component ───────────────────────────────────────────── */

export default function CalendarSync() {
  const { user } = useAuth()
  const { toast } = useToast()
  const plan = useMemo(readPlan, [])
  const progress = useMemo(readProgress, [])

  const tasks = Array.isArray(plan.tasks) ? plan.tasks : []
  const dailyMinutes = Math.max(5, Number(plan.daily_minutes) || 20)
  const planStartDate = useMemo(() => {
    if (progress.lastDate) return progress.lastDate
    return new Date().toISOString().slice(0, 10)
  }, [progress.lastDate])

  const [account, setAccount] = useState<CalendarAccount | null>(null)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState({ done: 0, total: 0 })
  const [calcomInput, setCalcomInput] = useState("")
  const [calcomSaving, setCalcomSaving] = useState(false)

  /* Load + refresh */
  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!user?.id) {
        setLoading(false)
        return
      }
      const acc = await loadCalendarAccount(user.id)
      if (!cancelled) {
        setAccount(acc)
        setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [user?.id])

  /* Pick up ?calendar=connected once after the OAuth callback. */
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const flag = params.get("calendar")
      if (flag === "connected") {
        toast.success("Google Calendar connected ✦")
      } else if (flag === "error") {
        toast.error("Couldn't finish Google Calendar sign-in")
      }
      if (flag) {
        params.delete("calendar")
        const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}`
        window.history.replaceState({}, "", next)
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const googleConnected = Boolean(
    account?.google_access_token && account.calendar_sync_enabled,
  )
  const calcomConnected = Boolean(account?.calcom_api_key)

  const handleConnectGoogle = useCallback(() => {
    if (!isGoogleConfigured) {
      toast.warning("Add Google Calendar credentials in Vercel env first.")
      return
    }
    const url = getGoogleAuthUrl(user?.id)
    if (url) {
      try {
        window.sessionStorage.setItem("scholify-calendar-pending", "1")
      } catch {
        /* ignore */
      }
      window.location.href = url
    }
  }, [toast, user?.id])

  const handleDisconnectGoogle = useCallback(async () => {
    if (!user?.id) return
    await disconnectGoogle(user.id)
    const acc = await loadCalendarAccount(user.id)
    setAccount(acc)
    toast.info("Google Calendar disconnected")
  }, [toast, user?.id])

  const handleReminderChange = useCallback(
    async (mins: number) => {
      if (!user?.id) return
      const acc = await updateCalendarAccount(user.id, {
        calendar_reminder_minutes: mins,
      })
      setAccount(acc)
      toast.success("Reminder updated")
    },
    [toast, user?.id],
  )

  const handleToggleAutoSync = useCallback(
    async (next: boolean) => {
      if (!user?.id) return
      const acc = await updateCalendarAccount(user.id, { auto_sync: next })
      setAccount(acc)
      toast.success(next ? "Auto-sync on" : "Auto-sync off")
    },
    [toast, user?.id],
  )

  const handleToggleSync = useCallback(
    async (next: boolean) => {
      if (!user?.id) return
      const acc = await updateCalendarAccount(user.id, {
        calendar_sync_enabled: next,
      })
      setAccount(acc)
      toast.success(next ? "Sync enabled" : "Sync paused")
    },
    [toast, user?.id],
  )

  const handleSaveCalcom = useCallback(async () => {
    if (!user?.id) return
    const key = calcomInput.trim()
    if (!key) {
      toast.error("Paste your Cal.com API key first")
      return
    }
    setCalcomSaving(true)
    const ok = await testCalcomKey(key)
    if (!ok) {
      toast.error("That Cal.com key didn't work")
      setCalcomSaving(false)
      return
    }
    const acc = await updateCalendarAccount(user.id, {
      calcom_api_key: key,
      calendar_sync_enabled: true,
    })
    setAccount(acc)
    setCalcomInput("")
    setCalcomSaving(false)
    toast.success("Cal.com connected ✦")
  }, [calcomInput, toast, user?.id])

  const handleDisconnectCalcom = useCallback(async () => {
    if (!user?.id) return
    const acc = await updateCalendarAccount(user.id, { calcom_api_key: null })
    setAccount(acc)
    toast.info("Cal.com disconnected")
  }, [toast, user?.id])

  const handleSyncWeek = useCallback(async () => {
    if (!account || syncing) return
    const upcoming = tasks
      .filter((t) => !progress.completed.includes(t.day_number))
      .slice(0, 7)
    if (upcoming.length === 0) {
      toast.info("No upcoming tasks to sync")
      return
    }
    setSyncing(true)
    setSyncProgress({ done: 0, total: upcoming.length })

    let success = 0
    let failed = 0
    if (googleConnected) {
      const result = await syncWeekToCalendar(
        {
          account,
          tasks: upcoming,
          planStartDate,
          dailyMinutes,
          reminderMinutes: account.calendar_reminder_minutes,
        },
        (done, total) => setSyncProgress({ done, total }),
      )
      success = result.success
      failed = result.failed
    } else if (calcomConnected && account.calcom_api_key) {
      const result = await syncWeekToCalcom(
        account.calcom_api_key,
        upcoming,
        planStartDate,
        dailyMinutes,
        (done, total) => setSyncProgress({ done, total }),
      )
      success = result.success
      failed = result.failed
    }

    setSyncing(false)
    if (success > 0 && failed === 0) {
      toast.success(`${success} event${success === 1 ? "" : "s"} added to calendar ✓`)
    } else if (success > 0) {
      toast.warning(`${success} added · ${failed} failed`)
    } else {
      toast.error("Sync failed — check your connection and reconnect")
    }
  }, [
    account,
    googleConnected,
    calcomConnected,
    planStartDate,
    dailyMinutes,
    syncing,
    tasks,
    progress.completed,
    toast,
  ])

  /* ── Render ── */

  if (loading) {
    return (
      <section style={cardStyle} aria-busy="true">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: "2px solid var(--sch-border-2)",
              borderTopColor: "rgba(139,92,246,0.8)",
            }}
          />
          <span style={{ fontSize: 13, color: TEXT2 }}>Loading calendar…</span>
        </div>
      </section>
    )
  }

  const anyConnected = googleConnected || calcomConnected

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      style={cardStyle}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--sch-text)" }}>
            📅 Calendar Sync
          </h3>
          <div style={{ fontSize: 13, color: TEXT2, marginTop: 4 }}>
            Auto-add tasks to your calendar
          </div>
        </div>
        {anyConnected && (
          <motion.span
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 20 }}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#34D399",
              boxShadow: "0 0 10px rgba(52,211,153,0.6)",
            }}
            aria-label="connected"
          />
        )}
      </div>

      {/* Providers */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
        {/* Google */}
        <ProviderRow
          icon="🅖"
          title="Google Calendar"
          status={
            googleConnected
              ? "connected"
              : isGoogleConfigured
                ? "idle"
                : "warn"
          }
        >
          <AnimatePresence mode="wait">
            {googleConnected ? (
              <motion.div
                key="connected"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: 13, color: TEXT2 }}>
                    Remind me
                  </span>
                  <ReminderDropdown
                    value={account?.calendar_reminder_minutes ?? 15}
                    onChange={handleReminderChange}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleDisconnectGoogle}
                  style={{
                    alignSelf: "flex-start",
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    fontSize: 12,
                    color: "rgba(255,69,58,0.7)",
                    cursor: "pointer",
                  }}
                >
                  Disconnect
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="connect"
                type="button"
                onClick={handleConnectGoogle}
                disabled={!isGoogleConfigured}
                whileHover={isGoogleConfigured ? { scale: 1.02 } : undefined}
                whileTap={isGoogleConfigured ? { scale: 0.97 } : undefined}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  padding: "10px 18px",
                  borderRadius: 12,
                  border: "none",
                  background: isGoogleConfigured ? IRIDESCENT : "var(--sch-card)",
                  color: isGoogleConfigured ? "#fff" : TEXT2,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: isGoogleConfigured ? "pointer" : "not-allowed",
                  boxShadow: isGoogleConfigured
                    ? "0 0 20px rgba(139,92,246,0.3)"
                    : "none",
                }}
              >
                {isGoogleConfigured
                  ? "Connect Google Calendar"
                  : "Configure on server first"}
              </motion.button>
            )}
          </AnimatePresence>
        </ProviderRow>

        {/* Cal.com */}
        <ProviderRow
          icon="📆"
          title="Cal.com"
          status={calcomConnected ? "connected" : "idle"}
        >
          <AnimatePresence mode="wait">
            {calcomConnected ? (
              <motion.div
                key="calcom-on"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <div style={{ fontSize: 13, color: TEXT2 }}>
                  Cal.com API key stored securely.
                </div>
                <button
                  type="button"
                  onClick={handleDisconnectCalcom}
                  style={{
                    alignSelf: "flex-start",
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    fontSize: 12,
                    color: "rgba(255,69,58,0.7)",
                    cursor: "pointer",
                  }}
                >
                  Disconnect
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="calcom-input"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
              >
                <input
                  type="password"
                  value={calcomInput}
                  onChange={(e) => setCalcomInput(e.target.value)}
                  placeholder="cal_xxxxx"
                  style={{
                    flex: "1 1 200px",
                    height: 40,
                    padding: "0 14px",
                    borderRadius: 10,
                    fontSize: 13,
                    color: "var(--sch-text)",
                    background: "var(--sch-card)",
                    border: "1px solid var(--sch-border)",
                    outline: "none",
                  }}
                />
                <motion.button
                  type="button"
                  onClick={handleSaveCalcom}
                  disabled={calcomSaving}
                  whileHover={calcomSaving ? undefined : { scale: 1.02 }}
                  whileTap={calcomSaving ? undefined : { scale: 0.97 }}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 10,
                    border: "none",
                    background: IRIDESCENT,
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: calcomSaving ? "wait" : "pointer",
                    opacity: calcomSaving ? 0.7 : 1,
                  }}
                >
                  {calcomSaving ? "Saving…" : "Save"}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </ProviderRow>
      </div>

      {/* Sync settings (only after a provider connects) */}
      <AnimatePresence>
        {anyConnected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                marginTop: 18,
                paddingTop: 18,
                borderTop: "1px solid var(--sch-border)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <Row
                name="Auto-sync new tasks"
                desc="Add tomorrow's task to your calendar after each Mark Complete"
              >
                <Toggle
                  on={account?.auto_sync ?? true}
                  onChange={handleToggleAutoSync}
                />
              </Row>
              <Row
                name="Reminder notification"
                desc="Include a popup reminder before each session"
              >
                <Toggle
                  on={account?.calendar_sync_enabled ?? false}
                  onChange={handleToggleSync}
                />
              </Row>

              <motion.button
                type="button"
                onClick={handleSyncWeek}
                disabled={syncing || tasks.length === 0}
                whileHover={syncing ? undefined : { scale: 1.01 }}
                whileTap={syncing ? undefined : { scale: 0.98 }}
                style={{
                  marginTop: 4,
                  width: "100%",
                  height: 48,
                  borderRadius: 14,
                  border: "none",
                  background: IRIDESCENT,
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: syncing ? "wait" : "pointer",
                  boxShadow: "0 0 24px rgba(139,92,246,0.25)",
                  position: "relative",
                  overflow: "hidden",
                  opacity: syncing ? 0.85 : 1,
                }}
              >
                <AnimatePresence mode="wait">
                  {syncing ? (
                    <motion.span
                      key="syncing"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          border: "2px solid rgba(255,255,255,0.4)",
                          borderTopColor: "#fff",
                        }}
                      />
                      Syncing {syncProgress.done}/{syncProgress.total}…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                    >
                      Sync this week's tasks →
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

function Row({
  name,
  desc,
  children,
}: {
  name: string
  desc: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 14, color: "var(--sch-text)" }}>{name}</div>
        <div style={{ fontSize: 12, color: TEXT2, marginTop: 2 }}>{desc}</div>
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  )
}
