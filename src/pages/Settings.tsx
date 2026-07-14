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
import { format } from "date-fns"
import { useAuth } from "@/lib/auth"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { useLanguage } from "@/i18n/LanguageProvider"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useToast } from "@/components/Toast"
import { useTheme } from "@/lib/theme"
import { syncReminder } from "@/lib/reminders"
import CalendarSync from "@/components/CalendarSync"
import { readOptIn as readCommunityOptIn, writeOptIn as writeCommunityOptIn } from "@/lib/community-storage"
import { getReferralCode, referralUrl, getReferralStats } from "@/lib/referral"
import {
  Icon,
  Badge,
  Card,
  Button,
  SectionHead,
  C,
  SP,
  R,
  SHADOW,
  TYPE,
} from "@/components/acca/ui"
import {
  getPaper,
  getDailyGoal,
  setDailyGoal,
  getOverallProgress,
  snapshotProgress,
  clearAccaProgress,
} from "@/lib/acca"
import { getPlan, setPlan } from "@/lib/acca-plan"
import { getCurrentPaper, getStudyingPapers } from "@/lib/acca-qualification"

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
}

const DEFAULT_SETTINGS: AppSettings = {
  notifyDaily: true,
  reminderTime: "08:00",
  streakAlerts: true,
  weeklyReport: true,
  newFeatures: false,
  theme: "dark",
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

/* ── ACCA study data — the keys export / reset actually operate on ── */

const ACCA_PREFIX = "scholify-acca-"

/** Setup, not progress: a reset keeps these so the learner isn't re-onboarded. */
const RESET_KEEP = new Set([
  "scholify-acca-onboarded",
  "scholify-acca-startmode",
  "scholify-acca-experience",
  "scholify-acca-goal",
  "scholify-acca-current-paper",
  "scholify-acca-studying",
  "scholify-acca-passed",
  "scholify-acca-plan",
  "scholify-acca-daily-goal",
])

function accaKeys(): string[] {
  try {
    return Object.keys(window.localStorage).filter((k) => k.startsWith(ACCA_PREFIX))
  } catch {
    return []
  }
}

/** Every ACCA store, parsed — what "Export my data" actually ships. */
function collectAccaData(): Record<string, unknown> {
  const out: Record<string, unknown> = { progress: snapshotProgress() }
  for (const key of accaKeys()) {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw == null) continue
      out[key.slice(ACCA_PREFIX.length)] = JSON.parse(raw)
    } catch {
      out[key.slice(ACCA_PREFIX.length)] = window.localStorage.getItem(key)
    }
  }
  return out
}

/* ── Reusable bits ───────────────────────────────────────────── */

/* ── Exam setup — current paper, exam date, daily goal & minutes ── */

function ExamSetupSection() {
  const paperId = getCurrentPaper() ?? getStudyingPapers()[0] ?? "FA"
  const paper = getPaper(paperId)
  const [plan, setPlanState] = useState(() => getPlan(paperId))
  const [goal, setGoal] = useState(() => getDailyGoal())

  function updatePlan(patch: Parameters<typeof setPlan>[1]) {
    setPlanState(setPlan(paperId, patch))
  }
  function updateGoal(n: number) {
    setGoal(n)
    setDailyGoal(n)
  }

  return (
    <Section>
      <SectionHead icon="exam">Exam setup</SectionHead>
      <SettingRow name="Current paper" desc="The paper your loop is built around">
        <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
          <span style={{ width: 34, height: 34, borderRadius: 9, background: IRIDESCENT, display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: 12 }}>
            {paperId}
          </span>
          <span style={{ fontSize: 13, color: "var(--sch-text)", fontWeight: 650 }}>{paper?.name ?? paperId}</span>
        </span>
      </SettingRow>
      <SettingRow name="Exam date" desc="Your roadmap dates itself back from this">
        <input
          type="date"
          value={plan.examDate ?? ""}
          onChange={(e) => updatePlan({ examDate: e.target.value || null })}
          style={{
            padding: "10px 13px",
            borderRadius: R.md,
            border: `1px solid ${C.border}`,
            background: "var(--sch-bg)",
            color: C.text,
            fontSize: 13.5,
            fontWeight: 600,
            colorScheme: "light dark",
          }}
        />
      </SettingRow>
      <SettingRow name="Daily goal" desc="Questions to answer each day">
        <span style={{ display: "inline-flex", gap: 6 }}>
          {[10, 15, 20, 30].map((n) => {
            const on = goal === n
            return (
              <motion.button
                key={n}
                whileTap={{ scale: 0.96 }}
                onClick={() => updateGoal(n)}
                style={{
                  minWidth: 44,
                  height: 38,
                  padding: "0 10px",
                  borderRadius: R.sm,
                  border: `1.5px solid ${on ? C.brand : C.border}`,
                  background: on ? C.brandSoft : "var(--sch-card)",
                  color: on ? C.brand : C.text,
                  fontWeight: 750,
                  fontSize: 13.5,
                  cursor: "pointer",
                  transition: "background .15s ease, border-color .15s ease, color .15s ease",
                }}
              >
                {n}
              </motion.button>
            )
          })}
        </span>
      </SettingRow>
      <SettingRow name="Target before exam day" desc="The pass probability your plan pushes toward">
        <span style={{ display: "inline-flex", gap: 6 }}>
          {[65, 75, 85].map((v) => {
            const on = plan.targetProb === v
            return (
              <motion.button
                key={v}
                whileTap={{ scale: 0.96 }}
                onClick={() => updatePlan({ targetProb: v })}
                style={{
                  minWidth: 52,
                  height: 38,
                  padding: "0 10px",
                  borderRadius: R.sm,
                  border: `1.5px solid ${on ? C.brand : C.border}`,
                  background: on ? C.brandSoft : "var(--sch-card)",
                  color: on ? C.brand : C.text,
                  fontWeight: 750,
                  fontSize: 13.5,
                  cursor: "pointer",
                  transition: "background .15s ease, border-color .15s ease, color .15s ease",
                }}
              >
                {v}%
              </motion.button>
            )
          })}
        </span>
      </SettingRow>
      <SettingRow name="Daily study minutes" desc="Target study time per day" last>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => updatePlan({ dailyMinutes: Math.max(10, plan.dailyMinutes - 5) })}
            aria-label="decrease minutes"
            style={{ width: 36, height: 36, borderRadius: R.sm, border: `1px solid ${C.border}`, background: "var(--sch-card)", color: C.text, fontWeight: 800, fontSize: 17, cursor: "pointer", lineHeight: 1 }}
          >
            −
          </motion.button>
          <span style={{ fontSize: 14.5, fontWeight: 800, color: C.text, minWidth: 62, textAlign: "center", fontVariantNumeric: "tabular-nums" }}>
            {plan.dailyMinutes} min
          </span>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => updatePlan({ dailyMinutes: Math.min(240, plan.dailyMinutes + 5) })}
            aria-label="increase minutes"
            style={{ width: 36, height: 36, borderRadius: R.sm, border: `1px solid ${C.border}`, background: "var(--sch-card)", color: C.text, fontWeight: 800, fontSize: 17, cursor: "pointer", lineHeight: 1 }}
          >
            +
          </motion.button>
        </span>
      </SettingRow>
    </Section>
  )
}

function Section({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <Card style={{ marginTop: SP.lg, padding: SP["2xl"], ...style }}>
      {children}
    </Card>
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
        border: `1px solid ${on ? "rgba(200,0,0,0.5)" : "var(--sch-border-2)"}`,
        boxShadow: on ? "0 0 10px rgba(200,0,0,0.3)" : "none",
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
          padding: "0 14px",
          minHeight: 44,
          borderRadius: R.sm,
          fontSize: 14,
          fontWeight: 600,
          color: C.text,
          background: C.card,
          border: `1px solid ${C.border}`,
          cursor: "pointer",
        }}
      >
        {current?.label ?? value}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          style={{ display: "inline-flex", color: TEXT2 }}
        >
          <Icon name="chevron" size={15} style={{ transform: "rotate(90deg)" }} />
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
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(200,0,0,0.06)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {o.label}
                    {active && <Icon name="done" size={15} color={C.brand} />}
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

// Site language only — the study screens are English by design (ACCA's exam language).
const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "ru", label: "Russian" },
] as const

const THEMES = [
  { id: "light", name: "Light", bg: "#f3f3f7", accent: "#6d5bf5" },
  { id: "dark", name: "Dark", bg: "#0b0b12", accent: "#E50068" },
] as const

export default function Settings() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { lang, setLang } = useLanguage()
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  const [answered, setAnswered] = useState(() => getOverallProgress().totalAnswered)
  const [settings, setSettings] = useState<AppSettings>(readSettings)
  const [communityOptIn, setCommunityOptIn] = useState(readCommunityOptIn)

  const [newPassword, setNewPassword] = useState("")
  const [savingPassword, setSavingPassword] = useState(false)
  const [editingProfile, setEditingProfile] = useState(false)
  const [firstName, setFirstName] = useState((user?.user_metadata?.first_name as string) || "")
  const [lastName, setLastName] = useState((user?.user_metadata?.last_name as string) || "")
  const email = user?.email || ""
  const [savingProfile, setSavingProfile] = useState(false)
  const [avatarHover, setAvatarHover] = useState(false)
  const [dialog, setDialog] = useState<"cancel" | "reset" | "delete" | null>(null)

  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Learner"
  const isPaid = Boolean(user?.app_metadata?.plan && user.app_metadata.plan !== "free")
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

  const cancelPlan = async () => {
    setDialog(null)
    if (!isSupabaseConfigured) {
      toast.info("Billing isn't connected on this account")
      return
    }
    try {
      const { data } = await supabase.auth.getSession()
      const token = data.session?.access_token
      if (!token) {
        toast.error("Please sign in again to manage billing")
        return
      }
      const res = await fetch("/api/paddle?action=cancel", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; reason?: string }
      if (body.ok) {
        toast.success("Plan will end at the period close — access stays until then")
      } else if (body.reason === "no_subscription" || body.reason === "not_configured") {
        toast.info("No active subscription found on this account")
      } else {
        toast.error("Couldn't cancel right now — please try again or contact support")
      }
    } catch {
      toast.error("Couldn't reach billing — please try again")
    }
  }

  const changePassword = async () => {
    if (newPassword.length < 8) {
      toast.error("Use at least 8 characters")
      return
    }
    if (!isSupabaseConfigured) {
      toast.error("Password changes need a connected account — email support@scholifyapp.com")
      return
    }
    setSavingPassword(true)
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error
      setNewPassword("")
      toast.success("Password updated")
    } catch {
      toast.error("Couldn't update your password — sign in again and retry")
    } finally {
      setSavingPassword(false)
    }
  }

  const exportData = () => {
    toast.info("Preparing export…")
    const payload = {
      exported_at: new Date().toISOString(),
      account: { name: fullName, email: user?.email },
      settings,
      acca: collectAccaData(),
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

  const doReset = () => {
    // Wipes every ACCA study store (answers, mocks, flashcards, diagnostics,
    // analytics) but keeps the setup keys, so the learner isn't re-onboarded.
    try {
      clearAccaProgress()
      for (const key of accaKeys()) {
        if (!RESET_KEEP.has(key)) window.localStorage.removeItem(key)
      }
      ;[7, 14, 21].forEach((n) => window.localStorage.removeItem(`scholify-paywall-shown-${n}`))
    } catch {
      /* ignore */
    }
    setAnswered(getOverallProgress().totalAnswered)
    setDialog(null)
    toast.success("Progress reset — your papers and exam dates are kept")
  }

  const doDelete = async () => {
    // Deleting the auth user needs the service-role key on a server we don't
    // have yet, so we say exactly what this does: local wipe + sign out.
    try {
      for (const key of Object.keys(window.localStorage)) {
        if (key.startsWith("scholify-")) window.localStorage.removeItem(key)
      }
    } catch {
      /* ignore */
    }
    await signOut()
    toast.info("Signed out and local data erased. Email support@scholifyapp.com to delete the account itself.")
    navigate("/", { replace: true })
  }

  const handleSignOut = async () => {
    // Never wipe study data on sign-out — in demo mode it's the only copy.
    await signOut()
    navigate("/", { replace: true })
  }

  const handleLanguage = (code: string) => {
    if (code === "en" || code === "ru") {
      setLang(code)
      toast.success("Site language updated — app screens stay in English")
    }
  }

  const ghostBtn: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: SP.sm,
    padding: "0 18px",
    minHeight: 44,
    borderRadius: R.lg,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    color: C.text,
    background: C.card,
    border: `1px solid ${C.border}`,
    boxShadow: SHADOW.sm,
    transition: "background .18s ease, border-color .18s ease, color .18s ease",
  }
  const redGhost: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: SP.sm,
    padding: "0 18px",
    minHeight: 44,
    borderRadius: R.lg,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    color: C.red,
    background: C.redSoft,
    border: `1px solid ${C.red}33`,
    transition: "background .18s ease, border-color .18s ease",
  }
  const sectionHead: CSSProperties = { ...TYPE.h3, color: C.text }

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
                border: "3px solid rgba(200,0,0,0.4)",
                boxShadow: "0 0 30px rgba(200,0,0,0.2)",
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
                <Badge tone={isPaid ? "brand" : "neutral"}>
                  {isPaid ? (
                    <>
                      <Icon name="trophy" size={12} /> Pro
                    </>
                  ) : (
                    "Free plan"
                  )}
                </Badge>
              </div>
              <div style={{ fontSize: 12, color: "var(--sch-tx-4)", marginTop: 6 }}>
                Member since {memberSince}
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={() => setEditingProfile((v) => !v)}
              style={{ marginLeft: "auto" }}
            >
              <Icon name="settings" size={16} />
              Edit Profile
            </Button>
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
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: TEXT2, marginBottom: 5 }}>Email</div>
                    <div style={{ padding: "11px 13px", borderRadius: R.md, background: "var(--sch-card-2)", color: "var(--sch-text)", fontSize: 13.5 }}>
                      {email}
                    </div>
                    <div style={{ fontSize: 11, color: TEXT2, marginTop: 5 }}>
                      Your sign-in email — contact support to change it.
                    </div>
                  </div>

                  {/* Where a password-reset link lands you: set the new password here. */}
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: TEXT2, marginBottom: 5 }}>
                      New password
                    </div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <input
                        type="password"
                        value={newPassword}
                        autoComplete="new-password"
                        placeholder="At least 8 characters"
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{
                          flex: "1 1 200px",
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
                      <Button
                        variant="secondary"
                        onClick={changePassword}
                        disabled={savingPassword || newPassword.length === 0}
                      >
                        {savingPassword ? "Updating…" : "Update password"}
                      </Button>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                    <Button
                      onClick={saveProfile}
                      disabled={savingProfile}
                    >
                      {savingProfile ? "Saving…" : "Save changes"}
                    </Button>
                    <Button variant="ghost" onClick={() => setEditingProfile(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
              <div style={{ ...sectionHead, display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="trophy" size={18} color={C.brand} />
                {isPaid ? "Pro" : "Free plan"}
              </div>
              <div style={{ fontSize: 13, color: TEXT2, marginTop: 4, lineHeight: 1.6 }}>
                {isPaid
                  ? "Billed monthly · $14.99/month"
                  : "No time limit. Timed mocks, the AI Examiner and custom practice are the paid modes."}
              </div>
              {!isPaid && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ fontSize: 12, color: "var(--sch-tx-4)", marginTop: 8 }}
                >
                  {answered.toLocaleString()} question{answered === 1 ? "" : "s"} answered so far
                </motion.div>
              )}
            </div>
            {isPaid ? (
              <div style={{ display: "flex", gap: 10 }}>
                <Button variant="secondary" onClick={() => navigate("/pricing")}>
                  Manage plan
                </Button>
                <button type="button" onClick={() => setDialog("cancel")} style={redGhost}>
                  Cancel plan
                </button>
              </div>
            ) : (
              <Button onClick={() => navigate("/pricing")}>
                See plans
                <Icon name="arrow" size={16} />
              </Button>
            )}
          </div>
        </Section>

        {/* ── Exam setup — the loop's parameters ── */}
        <ExamSetupSection />

        {/* ── Notifications ── */}
        <Section>
          <SectionHead icon="mission">Notifications</SectionHead>
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
          <SectionHead icon="support">Invite Friends</SectionHead>
          <p style={{ fontSize: 13, color: TEXT2, marginTop: 6, lineHeight: 1.6 }}>
            Share your link — anyone who joins gets the full free plan, no card needed.
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
            <Button onClick={copyReferral} style={{ flexShrink: 0 }}>
              <Icon name="check" size={15} />
              Copy
            </Button>
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
            We count invites here so we know who to thank — there's no referral reward scheme yet,
            and we won't pretend there is.
          </p>
        </Section>

        {/* ── Retention (admin only) ── */}
        {isAdmin && (
          <Section>
            <SectionHead icon="stats">Retention (admin)</SectionHead>
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
          <SectionHead icon="shield">Privacy</SectionHead>
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
          <SectionHead icon="settings">Appearance</SectionHead>
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
                    border: `2px solid ${selected ? "rgba(200,0,0,0.6)" : "transparent"}`,
                    boxShadow: selected ? "0 0 20px rgba(200,0,0,0.08)" : "none",
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon name="done" size={12} color="#fff" />
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
          <div style={{ marginTop: 20 }}>
            <SettingRow
              name="Site language"
              desc="Applies to the landing, pricing and legal pages. Study screens stay in English — that's ACCA's exam language."
              last
            >
              <Dropdown
                value={lang === "ru" ? "ru" : "en"}
                options={LANGUAGES.map((l) => ({ value: l.value, label: l.label }))}
                onChange={handleLanguage}
              />
            </SettingRow>
          </div>
        </Section>


        {/* ── Data & privacy ── */}
        <Section>
          <SectionHead icon="lock">Data &amp; Privacy</SectionHead>
          <div style={{ marginTop: 8 }}>
            <SettingRow
              name="Export my data"
              desc="Download every answer, mock, flashcard review, diagnostic and plan as JSON"
            >
              <button type="button" onClick={exportData} style={ghostBtn}>
                Export
                <Icon name="arrow" size={15} />
              </button>
            </SettingRow>
            <SettingRow name="Privacy Policy" desc="Read how we handle your data">
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.brand,
                  textDecoration: "none",
                }}
              >
                Read <Icon name="arrow" size={14} />
              </a>
            </SettingRow>
            <SettingRow name="Terms of Service" desc="Read our terms" last>
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.brand,
                  textDecoration: "none",
                }}
              >
                Read <Icon name="arrow" size={14} />
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
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              ...TYPE.label,
              color: C.red,
            }}
          >
            <Icon name="settings" size={14} color={C.red} strokeWidth={2.4} />
            Danger Zone
          </span>
          <div style={{ marginTop: 8 }}>
            <SettingRow
              name="Reset progress"
              desc="Erases every answer, mock, flashcard review and diagnostic. Your papers, exam dates and plan are kept."
            >
              <button type="button" onClick={() => setDialog("reset")} style={redGhost}>
                Reset
              </button>
            </SettingRow>
            <SettingRow
              name="Erase local data & sign out"
              desc="Removes all Scholify data from this device and signs you out. Deleting the account record itself needs a request to support."
              last
            >
              <button type="button" onClick={() => setDialog("delete")} style={redGhost}>
                Erase & sign out
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
          <Icon name="arrow" size={16} style={{ transform: "rotate(180deg)" }} />
          Sign out
        </motion.button>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <div style={{ fontSize: 12, color: "var(--sch-tx-4)" }}>Scholify v1.0.0</div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 11,
              color: "var(--sch-tx-4)",
            }}
          >
            Built with
            <Icon name="tutor" size={12} />
            for learners
          </div>
        </div>
      </motion.div>

      {/* ── Dialogs ── */}
      <ConfirmDialog
        open={dialog === "cancel"}
        title="Cancel your plan?"
        body="Your streak and progress are always saved. You'll switch to the free tier at the end of your billing period."
        confirmLabel="Cancel anyway"
        onConfirm={() => void cancelPlan()}
        onCancel={() => setDialog(null)}
      />
      <ConfirmDialog
        open={dialog === "reset"}
        title="Reset all progress?"
        body="This erases every answered question, mock result, flashcard review and diagnostic, and resets your streak to zero. Your account, papers, exam dates and plan are kept. It cannot be undone — export your data first if you want a copy."
        confirmLabel="Reset progress"
        onConfirm={doReset}
        onCancel={() => setDialog(null)}
      />
      <ConfirmDialog
        open={dialog === "delete"}
        title="Erase local data & sign out"
        body="This removes all Scholify data from this device and signs you out. It does not delete your account record — email support@scholifyapp.com from your registered address and we'll delete it. Type DELETE to confirm."
        confirmLabel="Erase & sign out"
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
