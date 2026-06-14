import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { format, differenceInCalendarDays } from "date-fns"
import { useAuth } from "@/lib/auth"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { useLanguage } from "@/i18n/LanguageProvider"
import { readPlan, readProgress, type Progress } from "@/lib/scholify-data"
import { DashboardLayout, iriText, ProgressBar } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useToast } from "@/components/Toast"
import { useTheme } from "@/lib/theme"
import { syncReminder } from "@/lib/reminders"
import CalendarSync from "@/components/CalendarSync"
import { readOptIn as readCommunityOptIn, writeOptIn as writeCommunityOptIn } from "@/lib/community-storage"
import { getReferralCode, referralUrl, getReferralStats } from "@/lib/referral"

/* ──────────────────────────────────────────────────────────────
 *  Scholify — Settings & Profile screen.
 * ────────────────────────────────────────────────────────────── */

const TEXT2 = "var(--sch-tx-2)"

/* ── Settings persistence ────────────────────────────────────── */

interface AppSettings {
  notifyDaily: boolean
  reminderTime: string
  streakAlerts: boolean
  weeklyReport: boolean
  newFeatures: boolean
  theme: "dark" | "darker" | "midnight"
  coachStyle: "direct" | "warm" | "brief"
  voiceCoach: boolean
  coachTime: string
}

const DEFAULT_SETTINGS: AppSettings = {
  notifyDaily: true,
  reminderTime: "08:00",
  streakAlerts: true,
  weeklyReport: true,
  newFeatures: false,
  theme: "dark",
  coachStyle: "direct",
  voiceCoach: false,
  coachTime: "08:00",
}

function readSettings(): AppSettings {
  try {
    const raw = window.localStorage.getItem("scholify-settings")
    if (raw) return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<AppSettings>) }
  } catch {
    /* ignore */
  }
  return DEFAULT_SETTINGS
}

/* ── Reusable bits ───────────────────────────────────────────── */

function Section({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        marginTop: 16,
        padding: 24,
        borderRadius: 20,
        background: "var(--sch-card)",
        border: "1px solid var(--sch-border)",
        ...style,
      }}
    >
      {children}
    </div>
  )
}

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

function SettingRow({
  name,
  desc,
  children,
  last,
}: {
  name: string
  desc: string
  children: ReactNode
  last?: boolean
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        padding: "14px 0",
        borderBottom: last ? "none" : "1px solid var(--sch-card-2)",
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

function Dropdown<T extends string>({
  value,
  options,
  onChange,
  minWidth = 160,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
  minWidth?: number
}) {
  const [open, setOpen] = useState(false)
  const current = options.find((o) => o.value === value)
  return (
    <div style={{ position: "relative", minWidth }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          borderRadius: 10,
          fontSize: 14,
          color: "var(--sch-text)",
          background: "var(--sch-card)",
          border: "1px solid var(--sch-border)",
          cursor: "pointer",
        }}
      >
        {current?.label ?? value}
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
              transition={{ duration: 0.15 }}
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                right: 0,
                left: 0,
                zIndex: 41,
                padding: 6,
                borderRadius: 12,
                background: "var(--sch-bg-2)",
                border: "1px solid var(--sch-border-2)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
              }}
            >
              {options.map((o) => {
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

function TimeInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "7px 12px",
        borderRadius: 10,
        fontSize: 14,
        color: "var(--sch-text)",
        background: "var(--sch-card)",
        border: "1px solid var(--sch-border)",
        colorScheme: "dark",
      }}
    />
  )
}

/* ── Confirm dialog ──────────────────────────────────────────── */

function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel,
  requireText,
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  body: string
  confirmLabel: string
  requireText?: string
  onConfirm: () => void
  onCancel: () => void
}) {
  const [typed, setTyped] = useState("")
  useEffect(() => {
    if (!open) setTyped("")
  }, [open])
  const canConfirm = !requireText || typed === requireText

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "100%",
              maxWidth: 420,
              padding: 28,
              borderRadius: 24,
              background: "var(--sch-bg-2)",
              border: "1px solid var(--sch-border-2)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--sch-text)" }}>{title}</h3>
            <p style={{ fontSize: 14, color: TEXT2, marginTop: 8, lineHeight: 1.6 }}>{body}</p>

            {requireText && (
              <input
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                placeholder={`Type ${requireText}`}
                style={{
                  width: "100%",
                  height: 44,
                  marginTop: 16,
                  padding: "0 14px",
                  borderRadius: 10,
                  fontSize: 14,
                  color: "var(--sch-text)",
                  background: "var(--sch-card-2)",
                  border: `1px solid ${canConfirm ? "#FF453A" : "var(--sch-border-2)"}`,
                  outline: "none",
                }}
              />
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button
                type="button"
                onClick={onCancel}
                style={{
                  flex: 1,
                  height: 44,
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "var(--sch-tx-1)",
                  background: "var(--sch-card)",
                  border: "1px solid var(--sch-border-2)",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!canConfirm}
                onClick={onConfirm}
                style={{
                  flex: 1,
                  height: 44,
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: canConfirm ? "pointer" : "not-allowed",
                  color: "#fff",
                  border: "none",
                  opacity: canConfirm ? 1 : 0.4,
                  background: "linear-gradient(135deg,#FF6B5E,#FF453A)",
                }}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Page ────────────────────────────────────────────────────── */

const LANGUAGES = [
  { value: "en", label: "🇺🇸 English" },
  { value: "uz", label: "🇺🇿 Uzbek" },
  { value: "ru", label: "🇷🇺 Russian" },
  { value: "ar", label: "🇦🇪 Arabic" },
  { value: "zh", label: "🇨🇳 Chinese" },
  { value: "de", label: "🇩🇪 German" },
] as const

const THEMES = [
  { id: "light", name: "Light", bg: "#f3f3f7", accent: "#6d5bf5" },
  { id: "dark", name: "Dark", bg: "#0b0b12", accent: "#818cf8" },
] as const

export default function Settings() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { lang, setLang } = useLanguage()
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  const plan = useMemo(readPlan, [])
  const [progress, setProgress] = useState<Progress>(readProgress)
  const [settings, setSettings] = useState<AppSettings>(readSettings)
  const [communityOptIn, setCommunityOptIn] = useState(readCommunityOptIn)

  const [editingProfile, setEditingProfile] = useState(false)
  const [firstName, setFirstName] = useState((user?.user_metadata?.first_name as string) || "")
  const [lastName, setLastName] = useState((user?.user_metadata?.last_name as string) || "")
  const [email, setEmail] = useState(user?.email || "")
  const [savingProfile, setSavingProfile] = useState(false)
  const [avatarHover, setAvatarHover] = useState(false)
  const [dialog, setDialog] = useState<"cancel" | "reset" | "delete" | null>(null)

  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Learner"
  const isPaid = Boolean(user?.user_metadata?.plan && user.user_metadata.plan !== "free")
  const memberSince = user?.created_at ? format(new Date(user.created_at), "MMMM yyyy") : "2026"

  /* Referrals */
  const referralLink = useMemo(() => referralUrl(getReferralCode(user)), [user])
  const referralStats = useMemo(() => getReferralStats(user), [user])
  const copyReferral = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      toast.success("Link copied!")
    } catch {
      toast.error("Couldn't copy — select the link and copy it manually.")
    }
  }, [referralLink, toast])

  /* Admin retention view — owner only. */
  const isAdmin = user?.email === "scholifyaiapp@gmail.com"
  const [retention, setRetention] = useState<{
    total: number
    day3: number
    day7: number
    converted: number
    limited: boolean
  } | null>(null)
  useEffect(() => {
    if (!isAdmin || !isSupabaseConfigured) return
    let cancelled = false
    ;(async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("day3_retained, day7_retained, converted_to_paid")
        if (error || !data || cancelled) return
        const total = data.length
        setRetention({
          total,
          day3: data.filter((r) => r.day3_retained).length,
          day7: data.filter((r) => r.day7_retained).length,
          converted: data.filter((r) => r.converted_to_paid).length,
          limited: total <= 1,
        })
      } catch {
        /* ignore — falls back to the PostHog note */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [isAdmin])

  /* Goal stats */
  const goal = plan.goal?.trim() || "Your learning goal"
  const dailyMinutes = Math.max(5, Number(plan.daily_minutes) || 20)
  const tasks = Array.isArray(plan.tasks) ? plan.tasks : []
  const deadline = plan.deadline ? new Date(plan.deadline) : null
  const daysRemaining =
    deadline && !Number.isNaN(deadline.getTime())
      ? Math.max(0, differenceInCalendarDays(deadline, new Date()))
      : Math.max(0, (tasks.length || 30) - progress.completed.length)
  const totalDays = Math.max(daysRemaining + progress.completed.length, tasks.length, 1)
  const goalPct = Math.round((progress.completed.length / totalDays) * 100)
  const currentDay = progress.completed.length + 1

  /* Auto-saving settings */
  const update = useCallback(
    <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
      setSettings((prev) => {
        const next = { ...prev, [key]: value }
        try {
          window.localStorage.setItem("scholify-settings", JSON.stringify(next))
        } catch {
          /* ignore */
        }
        return next
      })
      toast.success("Saved ✓")
    },
    [toast],
  )

  const saveProfile = async () => {
    setSavingProfile(true)
    try {
      if (isSupabaseConfigured && user) {
        await supabase.auth.updateUser({
          data: { first_name: firstName.trim(), last_name: lastName.trim() },
        })
      }
      toast.success("Profile updated")
      setEditingProfile(false)
    } catch {
      toast.error("Couldn't save profile")
    } finally {
      setSavingProfile(false)
    }
  }

  const exportData = () => {
    toast.info("Preparing export…")
    const payload = {
      exported_at: new Date().toISOString(),
      account: { name: fullName, email: user?.email },
      plan,
      progress,
      settings,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `scholify-data-${format(new Date(), "yyyy-MM-dd")}.json`
    a.click()
    URL.revokeObjectURL(url)
    setTimeout(() => toast.success("Download ready"), 400)
  }

  const lockedUpgrade = () => {
    toast.info("That's a Pro feature — opening pricing")
    navigate("/pricing")
  }

  const doReset = () => {
    try {
      window.localStorage.removeItem("scholify-progress")
      ;[7, 14, 21].forEach((n) => window.localStorage.removeItem(`scholify-paywall-shown-${n}`))
    } catch {
      /* ignore */
    }
    setProgress(readProgress())
    setDialog(null)
    toast.success("Progress reset — fresh start!")
  }

  const doDelete = async () => {
    // True auth-user deletion needs a server with the service-role key.
    // Client-side we clear everything and sign the user out.
    try {
      window.localStorage.clear()
    } catch {
      /* ignore */
    }
    await signOut()
    navigate("/", { replace: true })
  }

  const handleSignOut = async () => {
    await signOut()
    try {
      window.localStorage.clear()
    } catch {
      /* ignore */
    }
    navigate("/", { replace: true })
  }

  const handleLanguage = (code: string) => {
    if (code === "en" || code === "ru") {
      setLang(code)
      toast.success("Language updated")
    } else {
      toast.info(`${code.toUpperCase()} is coming soon`)
    }
  }

  const ghostBtn: CSSProperties = {
    padding: "9px 20px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    color: "var(--sch-tx-1)",
    background: "var(--sch-card)",
    border: "1px solid var(--sch-border-2)",
  }
  const redGhost: CSSProperties = {
    padding: "9px 18px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    color: "rgba(255,69,58,0.65)",
    background: "rgba(255,69,58,0.04)",
    border: "1px solid rgba(255,69,58,0.2)",
  }
  const sectionHead: CSSProperties = { fontSize: 15, fontWeight: 600, color: "var(--sch-text)" }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        {/* Header */}
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--sch-text)", letterSpacing: "-0.5px" }}>
          Settings
        </h1>
        <p style={{ fontSize: 14, color: "var(--sch-tx-3)", marginTop: 4 }}>
          Manage your account and preferences.
        </p>

        {/* ── Profile ── */}
        <Section style={{ marginTop: 32, borderRadius: 24, padding: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div
              onMouseEnter={() => setAvatarHover(true)}
              onMouseLeave={() => setAvatarHover(false)}
              style={{
                position: "relative",
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: IRIDESCENT,
                border: "3px solid rgba(139,92,246,0.4)",
                boxShadow: "0 0 30px rgba(139,92,246,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 32,
                fontWeight: 800,
                flexShrink: 0,
                cursor: "pointer",
              }}
              onClick={() => setEditingProfile(true)}
            >
              {fullName.charAt(0).toUpperCase()}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: "#fff",
                  opacity: avatarHover ? 1 : 0,
                  transition: "opacity 0.2s",
                }}
              >
                Edit
              </div>
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--sch-text)" }}>{fullName}</div>
              <div style={{ fontSize: 14, color: TEXT2, marginTop: 4 }}>{user?.email}</div>
              <div style={{ marginTop: 10 }}>
                <span
                  style={{
                    fontSize: 12,
                    padding: "4px 12px",
                    borderRadius: 999,
                    ...(isPaid
                      ? { background: IRIDESCENT, color: "#fff" }
                      : {
                          background: "var(--sch-hairline)",
                          border: "1px solid var(--sch-border)",
                          color: TEXT2,
                        }),
                  }}
                >
                  {isPaid ? "✦ Pro" : "Free Trial"}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "var(--sch-tx-4)", marginTop: 6 }}>
                Member since {memberSince}
              </div>
            </div>

            <motion.button
              type="button"
              onClick={() => setEditingProfile((v) => !v)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ ...ghostBtn, marginLeft: "auto" }}
            >
              Edit Profile
            </motion.button>
          </div>

          <AnimatePresence>
            {editingProfile && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: "hidden" }}
              >
                <div
                  style={{
                    marginTop: 20,
                    paddingTop: 20,
                    borderTop: "1px solid var(--sch-border)",
                  }}
                >
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <Field label="First name" value={firstName} onChange={setFirstName} />
                    <Field label="Last name" value={lastName} onChange={setLastName} />
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <Field label="Email" value={email} onChange={setEmail} full />
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                    <motion.button
                      type="button"
                      onClick={saveProfile}
                      disabled={savingProfile}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: "10px 22px",
                        borderRadius: 12,
                        border: "none",
                        background: IRIDESCENT,
                        color: "#fff",
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: "pointer",
                        opacity: savingProfile ? 0.7 : 1,
                      }}
                    >
                      {savingProfile ? "Saving…" : "Save changes"}
                    </motion.button>
                    <button
                      type="button"
                      onClick={() => setEditingProfile(false)}
                      style={{ ...ghostBtn, background: "transparent" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Section>

        {/* ── Current goal ── */}
        <Section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={sectionHead}>🎯 Current Goal</span>
            <button
              type="button"
              onClick={() => navigate("/onboarding")}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 13,
                color: "rgba(139,92,246,0.75)",
                cursor: "pointer",
              }}
            >
              Change goal →
            </button>
          </div>
          <div style={{ marginTop: 16, fontSize: 16, fontWeight: 600, color: "var(--sch-text)" }}>
            {goal}
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: 12 }}>
            {[
              [`Day ${currentDay}`, "of plan"],
              [`${goalPct}%`, "complete"],
              [`${daysRemaining} days`, "remaining"],
              [deadline ? format(deadline, "MMM d, yyyy") : "—", "deadline"],
            ].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: 18, fontWeight: 700, ...iriText }}>{v}</div>
                <div style={{ fontSize: 11, color: TEXT2 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <ProgressBar pct={goalPct} />
          </div>
        </Section>

        {/* ── Subscription ── */}
        <Section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={sectionHead}>{isPaid ? "✦ Pro" : "Free Trial"}</div>
              <div style={{ fontSize: 13, color: TEXT2, marginTop: 4 }}>
                {isPaid ? "Billed monthly · $13.99/month" : "7 days remaining in your trial"}
              </div>
              {!isPaid && (
                <div
                  style={{
                    width: 180,
                    height: 4,
                    borderRadius: 2,
                    marginTop: 8,
                    background: "var(--sch-border)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "0%",
                      background: "linear-gradient(90deg,#FF9F0A,#FF453A)",
                    }}
                  />
                </div>
              )}
            </div>
            {isPaid ? (
              <div style={{ display: "flex", gap: 10 }}>
                <button type="button" onClick={() => navigate("/pricing")} style={ghostBtn}>
                  Manage plan
                </button>
                <button type="button" onClick={() => setDialog("cancel")} style={redGhost}>
                  Cancel plan
                </button>
              </div>
            ) : (
              <motion.button
                type="button"
                onClick={() => navigate("/pricing")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "10px 24px",
                  borderRadius: 12,
                  border: "none",
                  background: IRIDESCENT,
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 0 20px rgba(139,92,246,0.3)",
                }}
              >
                Upgrade to Pro →
              </motion.button>
            )}
          </div>
        </Section>

        {/* ── Notifications ── */}
        <Section>
          <span style={sectionHead}>🔔 Notifications</span>
          <div style={{ marginTop: 8 }}>
            <SettingRow name="Daily email reminder" desc="A nudge to study on days you haven't yet">
              <Toggle
                on={settings.notifyDaily}
                onChange={(v) => {
                  update("notifyDaily", v)
                  void syncReminder(v, settings.reminderTime)
                }}
              />
            </SettingRow>
            {settings.notifyDaily && (
              <SettingRow name="Reminder time" desc="Send your daily reminder at">
                <TimeInput
                  value={settings.reminderTime}
                  onChange={(v) => {
                    update("reminderTime", v)
                    void syncReminder(true, v)
                  }}
                />
              </SettingRow>
            )}
            <SettingRow name="Streak alerts" desc="Be notified when your streak is at risk">
              <Toggle on={settings.streakAlerts} onChange={(v) => update("streakAlerts", v)} />
            </SettingRow>
            <SettingRow
              name="Weekly progress report"
              desc="Receive your weekly summary every Sunday"
            >
              <Toggle on={settings.weeklyReport} onChange={(v) => update("weeklyReport", v)} />
            </SettingRow>
            <SettingRow name="New features" desc="Updates about new Scholify features" last>
              <Toggle on={settings.newFeatures} onChange={(v) => update("newFeatures", v)} />
            </SettingRow>
          </div>
        </Section>

        {/* ── Invite friends (referrals) ── */}
        <Section>
          <span style={sectionHead}>🎁 Invite Friends</span>
          <p style={{ fontSize: 13, color: TEXT2, marginTop: 6, lineHeight: 1.6 }}>
            Share your link and earn rewards when friends build their habits.
          </p>

          <div style={{ display: "flex", gap: 8, marginTop: 14, alignItems: "center" }}>
            <input
              readOnly
              value={referralLink}
              onFocus={(e) => e.currentTarget.select()}
              aria-label="Your referral link"
              style={{
                flex: 1,
                minWidth: 0,
                height: 44,
                padding: "0 14px",
                borderRadius: 12,
                fontSize: 13,
                color: "var(--sch-text)",
                background: "var(--sch-card-2)",
                border: "1px solid var(--sch-border)",
                outline: "none",
              }}
            />
            <motion.button
              type="button"
              onClick={copyReferral}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                height: 44,
                padding: "0 18px",
                borderRadius: 12,
                border: "none",
                background: IRIDESCENT,
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                flexShrink: 0,
                boxShadow: "0 0 18px rgba(139,92,246,0.25)",
              }}
            >
              Copy
            </motion.button>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            {[
              `${referralStats.invited} friends invited`,
              `${referralStats.joined} joined`,
            ].map((label) => (
              <span
                key={label}
                style={{
                  padding: "6px 14px",
                  borderRadius: 999,
                  fontSize: 12,
                  color: TEXT2,
                  background: "var(--sch-card-2)",
                  border: "1px solid var(--sch-border)",
                }}
              >
                {label}
              </span>
            ))}
          </div>

          <p style={{ fontSize: 12, color: TEXT2, marginTop: 8, lineHeight: 1.6 }}>
            You earn: 1 extra Life Shield per referral who completes 7 days.
          </p>
        </Section>

        {/* ── Retention (admin only) ── */}
        {isAdmin && (
          <Section>
            <span style={sectionHead}>📊 Retention (admin)</span>
            {retention ? (
              <>
                <div
                  style={{
                    marginTop: 12,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
                    gap: 10,
                  }}
                >
                  {([
                    ["Signups", retention.total],
                    ["Day-3 retained", retention.day3],
                    ["Day-7 retained", retention.day7],
                    ["Converted", retention.converted],
                  ] as const).map(([label, val]) => (
                    <div
                      key={label}
                      style={{
                        padding: "12px 14px",
                        borderRadius: 12,
                        background: "var(--sch-card-2)",
                        border: "1px solid var(--sch-border)",
                      }}
                    >
                      <div style={{ fontSize: 20, fontWeight: 800, ...iriText }}>{val}</div>
                      <div style={{ fontSize: 12, color: TEXT2, marginTop: 2 }}>{label}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: TEXT2, marginTop: 10 }}>
                  Day-3 rate:{" "}
                  {retention.total
                    ? Math.round((retention.day3 / retention.total) * 100)
                    : 0}
                  %
                </p>
                {retention.limited && (
                  <p
                    style={{
                      fontSize: 11,
                      color: "rgba(255,159,10,0.7)",
                      marginTop: 6,
                      lineHeight: 1.5,
                    }}
                  >
                    Client reads are limited by row-level security — full cross-user totals
                    come from PostHog (where the retention events fire) or a service-role query.
                  </p>
                )}
              </>
            ) : (
              <p style={{ fontSize: 13, color: TEXT2, marginTop: 10, lineHeight: 1.6 }}>
                Retention events (first_task_completed, day3_retained, day7_retained) stream to
                PostHog. Apply migration 0011 + connect Supabase to populate this in-app table.
              </p>
            )}
          </Section>
        )}

        {/* ── Calendar Sync ── */}
        <CalendarSync />

        {/* ── Privacy ── */}
        <Section>
          <span style={sectionHead}>🌍 Privacy</span>
          <div style={{ marginTop: 8 }}>
            <SettingRow
              name="Share completions to community feed"
              desc="Auto-post your week completions and streak milestones to other learners with the same goal. Only your first name + last initial are shown."
            >
              <Toggle
                on={communityOptIn.optedIn && communityOptIn.shareCompletions}
                onChange={(v) =>
                  setCommunityOptIn((prev) => {
                    const next = { ...prev, shareCompletions: v, optedIn: v ? true : prev.optedIn }
                    writeCommunityOptIn({ shareCompletions: v, optedIn: next.optedIn }, user?.id)
                    return next
                  })
                }
              />
            </SettingRow>
            <SettingRow
              name="Share streak milestones"
              desc="Celebrate 7 / 14 / 30 / 60 / 90-day streaks in the community feed."
            >
              <Toggle
                on={communityOptIn.optedIn && communityOptIn.shareMilestones}
                onChange={(v) =>
                  setCommunityOptIn((prev) => {
                    const next = { ...prev, shareMilestones: v, optedIn: v ? true : prev.optedIn }
                    writeCommunityOptIn({ shareMilestones: v, optedIn: next.optedIn }, user?.id)
                    return next
                  })
                }
              />
            </SettingRow>
            <SettingRow
              name="Appear in leaderboards"
              desc="Show your rank in the per-category weekly leaderboard. Opting out fully also removes you from the feed."
              last
            >
              <Toggle
                on={communityOptIn.optedIn}
                onChange={(v) => {
                  setCommunityOptIn((prev) => {
                    const next = { ...prev, optedIn: v }
                    writeCommunityOptIn({ optedIn: v }, user?.id)
                    return next
                  })
                }}
              />
            </SettingRow>
          </div>
        </Section>

        {/* ── Appearance ── */}
        <Section>
          <span style={sectionHead}>🎨 Appearance</span>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            {THEMES.map((t) => {
              const selected = theme === t.id
              return (
                <motion.button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTheme(t.id)
                    toast.success("Theme updated")
                  }}
                  whileHover={selected ? undefined : { scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    flex: 1,
                    position: "relative",
                    padding: 16,
                    borderRadius: 14,
                    cursor: "pointer",
                    background: "var(--sch-card)",
                    border: `2px solid ${selected ? "rgba(139,92,246,0.6)" : "transparent"}`,
                    boxShadow: selected ? "0 0 20px rgba(139,92,246,0.15)" : "none",
                  }}
                >
                  {selected && (
                    <span
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: IRIDESCENT,
                        color: "#fff",
                        fontSize: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      ✓
                    </span>
                  )}
                  <div
                    style={{
                      width: 40,
                      height: 24,
                      borderRadius: 6,
                      background: t.bg,
                      border: "1px solid var(--sch-border-2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{ width: 8, height: 8, borderRadius: "50%", background: t.accent }}
                    />
                  </div>
                  <div style={{ fontSize: 12, color: "var(--sch-text)", marginTop: 8 }}>{t.name}</div>
                </motion.button>
              )
            })}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <span style={{ fontSize: 14, color: "var(--sch-text)" }}>Language</span>
            <Dropdown
              value={lang === "ru" ? "ru" : "en"}
              options={LANGUAGES.map((l) => ({ value: l.value, label: l.label }))}
              onChange={handleLanguage}
            />
          </div>
        </Section>

        {/* ── Lara settings ── */}
        <Section
          style={{
            border: "1px solid rgba(139,92,246,0.12)",
            background: "rgba(139,92,246,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={sectionHead}>✦ Lara Settings</span>
              <div style={{ fontSize: 12, color: TEXT2 }}>Customise your AI coach</div>
            </div>
            {!isPaid && (
              <button
                type="button"
                onClick={lockedUpgrade}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: 8,
                  background: "rgba(139,92,246,0.15)",
                  color: "#C084FC",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                PRO
              </button>
            )}
          </div>
          <div style={{ marginTop: 8 }}>
            <SettingRow name="Message style" desc="How Lara communicates with you">
              <Dropdown
                value={settings.coachStyle}
                minWidth={180}
                options={[
                  { value: "direct", label: "Direct & factual" },
                  { value: "warm", label: "Warm & encouraging" },
                  { value: "brief", label: "Brief & minimal" },
                ]}
                onChange={(v) => update("coachStyle", v)}
              />
            </SettingRow>
            <SettingRow name="Voice coach" desc="Hear Lara read your daily message">
              {isPaid ? (
                <Toggle on={settings.voiceCoach} onChange={(v) => update("voiceCoach", v)} />
              ) : (
                <button
                  type="button"
                  onClick={lockedUpgrade}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: 8,
                    background: "rgba(139,92,246,0.15)",
                    color: "#C084FC",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  🔒 PRO
                </button>
              )}
            </SettingRow>
            <SettingRow name="Coach message time" desc="When to receive your daily Lara message" last>
              <TimeInput value={settings.coachTime} onChange={(v) => update("coachTime", v)} />
            </SettingRow>
          </div>
        </Section>

        {/* ── Data & privacy ── */}
        <Section>
          <span style={sectionHead}>🔒 Data &amp; Privacy</span>
          <div style={{ marginTop: 8 }}>
            <SettingRow name="Export my data" desc="Download all your progress and plan data">
              <button type="button" onClick={exportData} style={ghostBtn}>
                Export →
              </button>
            </SettingRow>
            <SettingRow name="Privacy Policy" desc="Read how we handle your data">
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 13, color: "rgba(139,92,246,0.8)", textDecoration: "none" }}
              >
                Read →
              </a>
            </SettingRow>
            <SettingRow name="Terms of Service" desc="Read our terms" last>
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 13, color: "rgba(139,92,246,0.8)", textDecoration: "none" }}
              >
                Read →
              </a>
            </SettingRow>
          </div>
        </Section>

        {/* ── Danger zone ── */}
        <Section
          style={{
            border: "1px solid rgba(255,69,58,0.1)",
            background: "rgba(255,69,58,0.02)",
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,69,58,0.7)" }}>
            ⚠️ Danger Zone
          </span>
          <div style={{ marginTop: 8 }}>
            <SettingRow
              name="Reset progress"
              desc="Delete all sessions and start your streak over. Account and plan are kept."
            >
              <button type="button" onClick={() => setDialog("reset")} style={redGhost}>
                Reset
              </button>
            </SettingRow>
            <SettingRow
              name="Delete account"
              desc="Permanently delete your account and all data. This cannot be undone."
              last
            >
              <button type="button" onClick={() => setDialog("delete")} style={redGhost}>
                Delete account
              </button>
            </SettingRow>
          </div>
        </Section>

        {/* ── Sign out ── */}
        <motion.button
          type="button"
          onClick={handleSignOut}
          whileTap={{ scale: 0.99 }}
          className="sch-signout"
          style={{
            width: "100%",
            height: 52,
            marginTop: 8,
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontSize: 15,
            fontWeight: 500,
            cursor: "pointer",
            color: "var(--sch-tx-2)",
            background: "var(--sch-card)",
            border: "1px solid var(--sch-border)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,69,58,0.2)"
            e.currentTarget.style.color = "rgba(255,69,58,0.6)"
            e.currentTarget.style.background = "rgba(255,69,58,0.04)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--sch-border)"
            e.currentTarget.style.color = "var(--sch-tx-2)"
            e.currentTarget.style.background = "var(--sch-card)"
          }}
        >
          <span style={{ transform: "rotate(180deg)", display: "inline-block" }}>→</span>
          Sign out
        </motion.button>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <div style={{ fontSize: 12, color: "var(--sch-tx-4)" }}>Scholify v1.0.0</div>
          <div style={{ fontSize: 11, color: "var(--sch-tx-4)" }}>
            Built with ✦ for learners
          </div>
        </div>
      </motion.div>

      {/* ── Dialogs ── */}
      <ConfirmDialog
        open={dialog === "cancel"}
        title="Cancel your plan?"
        body="Your streak and progress are always saved. You'll switch to the free tier at the end of your billing period."
        confirmLabel="Cancel anyway"
        onConfirm={() => {
          setDialog(null)
          toast.success("Plan will end at the period close")
        }}
        onCancel={() => setDialog(null)}
      />
      <ConfirmDialog
        open={dialog === "reset"}
        title="Reset all progress?"
        body="This deletes every completed session and resets your streak to zero. Your account, plan and goal are kept."
        confirmLabel="Reset progress"
        onConfirm={doReset}
        onCancel={() => setDialog(null)}
      />
      <ConfirmDialog
        open={dialog === "delete"}
        title="Delete account"
        body="This permanently deletes your account and all data. This cannot be undone. Type DELETE to confirm."
        confirmLabel="Permanently delete"
        requireText="DELETE"
        onConfirm={doDelete}
        onCancel={() => setDialog(null)}
      />
    </DashboardLayout>
  )
}

/* ── Profile edit field ──────────────────────────────────────── */

function Field({
  label,
  value,
  onChange,
  full,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  full?: boolean
}) {
  return (
    <div style={{ flex: full ? "1 1 100%" : "1 1 160px" }}>
      <label style={{ fontSize: 12, color: TEXT2, display: "block", marginBottom: 6 }}>
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          height: 44,
          padding: "0 14px",
          borderRadius: 10,
          fontSize: 14,
          color: "var(--sch-text)",
          background: "var(--sch-card-2)",
          border: "1px solid var(--sch-border-2)",
          outline: "none",
        }}
      />
    </div>
  )
}
