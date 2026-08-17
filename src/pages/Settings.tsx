import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type ReactNode,
} from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { format } from "date-fns"
import { useAuth } from "@/lib/auth"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useToast } from "@/components/Toast"
import { useTheme } from "@/lib/theme"
import { syncReminder, localTimeZone, DEFAULT_SLOTS, type ReminderSlots } from "@/lib/reminders"
import CalendarSync from "@/components/CalendarSync"
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
  GRAD,
} from "@/components/acca/ui"
import {
  getPaper,
  getPaperStats,
  setDailyGoal,
  getOverallProgress,
  snapshotProgress,
  clearAccaProgress,
} from "@/lib/acca"
import { getPlan, setPlan, WEEK_DAYS } from "@/lib/acca-plan"
import { configuredStudyDays, derivePlanUpdate, weeklyStudyHours } from "@/lib/acca-plan-config"
import { shapeDay, ambitionFactor } from "@/lib/acca-schedule"
import { buildOnboardingGuide } from "@/lib/acca-onboarding-guide"
import { getLearnerBaseline } from "@/lib/acca-learner-baseline"
import { paperWorkHours } from "@/lib/acca-topic-plan"
import { entitlementOf } from "@/lib/entitlement"
import { openStripeBillingPortal } from "@/lib/stripe"
import { avatarUrlOf, onAvatarChange, saveAvatar, removeAvatar, AVATAR_MAX_SOURCE_MB, type AvatarError } from "@/lib/avatar"
import { ALL_PAPERS, getCurrentPaper, getStudyingPapers, setCurrentPaper } from "@/lib/acca-qualification"
import {
  getPaperPause,
  pausePaper,
  resumePaper,
  recordPaperSwitch,
  type PlanChangeReason,
} from "@/lib/acca-plan-adjustment"
import { getPaperVariant, setPaperVariant, type PaperVariant } from "@/lib/acca-profile"
import { persistAccountSetup, SETUP_KEYS } from "@/lib/account-state"

/* ──────────────────────────────────────────────────────────────
 *  Scholify — Settings & Profile screen.
 * ────────────────────────────────────────────────────────────── */

const TEXT2 = "var(--sch-tx-2)"

/* ── Settings persistence ────────────────────────────────────── */

interface AppSettings {
  notifyDaily: boolean
  /** When the daily session starts. All three reminders are offsets from this. */
  practiceTime: string
  /** Pre-0026 key, kept so an existing install's saved hour is not lost. */
  reminderTime: string
  /** Which of the three daily reminders to send. */
  reminderSlots: ReminderSlots
  streakAlerts: boolean
  weeklyReport: boolean
  newFeatures: boolean
  theme: "dark" | "darker" | "midnight"
}

const DEFAULT_SETTINGS: AppSettings = {
  notifyDaily: true,
  // 19:00 matches the onboarding default so the two cannot disagree on a
  // learner who never opened either screen.
  practiceTime: "19:00",
  reminderTime: "19:00",
  reminderSlots: DEFAULT_SLOTS,
  streakAlerts: true,
  weeklyReport: true,
  newFeatures: false,
  theme: "dark",
}

/**
 * The reminder rows. Each description states the ACTUAL time it will arrive,
 * derived from the practice clock — "30 minutes before" is abstract, and a learner
 * cannot sanity-check it, whereas "18:30" they can.
 *
 * THE OFFSETS HERE MUST MATCH `SLOTS` IN api/reminders.ts. They are the same
 * numbers written twice — once for the sender, once for this copy — and when they
 * drifted (the sender moved to −30/+2h while this still said "ten minutes") the UI
 * was quietly telling every learner the wrong time for an email they then received
 * at a different one. There is nothing to catch that but this comment and the test
 * in tests/api/reminders-schedule.test.ts, so change both together.
 *
 * `optIn` marks the row that is OFF by default: two reminders a day is the promise,
 * and the advance notice is the third. Saying so in the row stops it reading as a
 * setting that has mysteriously switched itself off.
 */
const REMINDER_SLOT_ROWS: {
  key: keyof ReminderSlots
  name: string
  desc: (practiceTime: string) => string
  optIn?: boolean
}[] = [
  {
    key: "soon",
    name: "Ten minutes before",
    desc: (t) => `${shiftClock(t, -10) ? `Around ${shiftClock(t, -10)}` : "Ten minutes ahead"} — the one that starts the session`,
  },
  {
    key: "catchup",
    name: "If the day is still open",
    desc: (t) => `${shiftClock(t, 120) ? `Around ${shiftClock(t, 120)}` : "Two hours after your start time"} — only if you haven't studied yet`,
  },
  {
    key: "lead",
    name: "Advance notice",
    optIn: true,
    desc: (t) => `Off by default. Two hours ahead${shiftClock(t, -120) ? ` — around ${shiftClock(t, -120)}` : ""}, so you can protect the time`,
  },
]

/**
 * Shift "19:00" by N minutes → "16:00". Returns "" when the result falls outside
 * the same day, which is exactly when the server skips that slot too (see the
 * offset note in api/reminders.ts) — so the UI cannot promise a reminder that
 * will not be sent.
 */
function shiftClock(time: string, deltaMinutes: number): string {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(time || ""))
  if (!m) return ""
  const total = Number(m[1]) * 60 + Number(m[2]) + deltaMinutes
  if (total < 0 || total >= 24 * 60) return ""
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`
}

function readSettings(): AppSettings {
  try {
    const currentPaper = getCurrentPaper()
    const plannedTime = currentPaper ? getPlan(currentPaper).studyTime : null
    const raw = window.localStorage.getItem("scholify-settings")
    if (raw) {
      const saved = JSON.parse(raw) as Partial<AppSettings>
      const merged = { ...DEFAULT_SETTINGS, ...saved }
      /*
       * An install from before 0026 has `reminderTime` and no `practiceTime`, so
       * a plain default-merge would silently move their session from the hour
       * they picked to 19:00. Carry it across instead.
       */
      if (!saved.practiceTime && saved.reminderTime) merged.practiceTime = saved.reminderTime
      else if (!saved.practiceTime && plannedTime) merged.practiceTime = plannedTime
      // A partially-saved slots object must not leave a slot undefined.
      merged.reminderSlots = { ...DEFAULT_SLOTS, ...(saved.reminderSlots || {}) }
      return merged
    }
    if (plannedTime) return { ...DEFAULT_SETTINGS, practiceTime: plannedTime, reminderTime: plannedTime }
  } catch {
    /* ignore */
  }
  return DEFAULT_SETTINGS
}

/* ── ACCA study data — the keys export / reset actually operate on ── */

const ACCA_PREFIX = "scholify-acca-"

/**
 * Setup, not progress: a reset keeps these so the learner isn't re-onboarded.
 *
 * Derived from account-state's SETUP_KEYS rather than hand-listed — the two were
 * maintained separately and had already drifted apart (see the note there), which
 * meant a reset silently destroyed setup that onboarding would never ask for
 * again. One list, no drift.
 */
const RESET_KEEP = new Set<string>(SETUP_KEYS)

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

/* ── Study-plan control centre ── */

function ExamSetupSection({
  sessionTime,
  onSessionTimeChange,
}: {
  sessionTime: string
  onSessionTimeChange: (time: string) => void
}) {
  const { toast } = useToast()
  const [paperId, setPaperId] = useState(() => getCurrentPaper() ?? getStudyingPapers()[0] ?? "FA")
  const paper = getPaper(paperId)
  const [plan, setPlanState] = useState(() => getPlan(paperId))
  const [reason, setReason] = useState<PlanChangeReason>("work")
  const [returnDate, setReturnDate] = useState("")
  const [paused, setPaused] = useState(() => getPaperPause(paperId))
  const [variant, setVariantState] = useState<PaperVariant | null>(() => getPaperVariant(paperId))
  const [savedLabel, setSavedLabel] = useState("Saved automatically")

  /*
   * Upgrade plans saved before explicit study days and automatic question goals
   * existed. This is a repair, not a cosmetic default: without it the screen
   * could display Monday–Saturday while the scheduler still treated Sunday as
   * active, and Analytics could retain an old manual question target.
   */
  useEffect(() => {
    const stored = getPlan(paperId)
    const resolved = derivePlanUpdate(stored, {
      dailyMinutes: stored.dailyMinutes,
      studyDays: configuredStudyDays(stored),
      studyTime: sessionTime,
    })
    const next = setPlan(paperId, resolved)
    setDailyGoal(next.dailyGoal)
    setPlanState(next)
    void persistAccountSetup()
  }, [paperId])

  const studyDays = configuredStudyDays(plan)
  const dayShape = shapeDay(plan.dailyMinutes, plan.targetProb)
  const stats = getPaperStats(paperId)
  const baseline = getLearnerBaseline()
  const guide = buildOnboardingGuide({
    paperId,
    route: baseline?.route ?? null,
    englishLevel: baseline?.englishLevel ?? null,
    minutesPerDay: plan.dailyMinutes,
    daysPerWeek: studyDays.length,
    examDate: plan.examDate,
    targetPercentage: plan.targetProb,
    contentHours: paperWorkHours(paperId),
  })
  const status = paused ? "paused" : guide.status
  const statusView = status === "comfortable"
    ? { label: "Healthy buffer", color: C.green, background: C.greenSoft }
    : status === "focused"
      ? { label: "Focused plan", color: C.amber, background: "rgba(244,164,5,0.10)" }
      : status === "risky"
        ? { label: "Time shortfall", color: C.red, background: C.redSoft }
        : { label: "Plan paused", color: C.amber, background: "rgba(244,164,5,0.10)" }

  function updatePlan(patch: Parameters<typeof setPlan>[1], success?: string) {
    const resolved = derivePlanUpdate(plan, patch)
    const next = setPlan(paperId, resolved)
    setPlanState(next)
    setDailyGoal(next.dailyGoal)
    setSavedLabel("Saved just now")
    void persistAccountSetup()
    if (success) toast.success(success)
  }

  function switchPaper(nextPaper: string) {
    if (nextPaper === paperId) return
    recordPaperSwitch(paperId, nextPaper, "personal")
    setCurrentPaper(nextPaper)
    const stored = getPlan(nextPaper)
    const next = setPlan(nextPaper, derivePlanUpdate(stored, { dailyMinutes: stored.dailyMinutes }))
    setPaperId(nextPaper)
    setPlanState(next)
    setDailyGoal(next.dailyGoal)
    setPaused(getPaperPause(nextPaper))
    setVariantState(getPaperVariant(nextPaper))
    setSavedLabel("Saved just now")
    void persistAccountSetup()
    toast.success(`Switched to ${nextPaper} — your ${paperId} progress is safely preserved`)
  }

  function toggleStudyDay(day: number) {
    const next = studyDays.includes(day) ? studyDays.filter((value) => value !== day) : [...studyDays, day]
    if (next.length === 0) {
      toast.info("Keep at least one study day — choose another day before removing this one")
      return
    }
    updatePlan({ studyDays: next })
  }

  function togglePause() {
    if (paused) {
      resumePaper(paperId)
      setPaused(null)
      void persistAccountSetup()
      toast.success(`Welcome back — your ${paperId} plan is ready`)
    } else {
      const next = pausePaper(paperId, reason, returnDate || null)
      setPaused(next)
      void persistAccountSetup()
      toast.success("Plan paused — progress is safe and there is no catch-up penalty")
    }
  }

  const selectStyle: CSSProperties = {
    width: "min(100%, 330px)",
    padding: "11px 13px",
    borderRadius: R.md,
    border: `1px solid ${C.border}`,
    background: "var(--sch-bg)",
    color: C.text,
    fontSize: 13,
    fontWeight: 700,
  }

  return (
    <Section style={{ marginTop: 32, borderRadius: 24, padding: 28 }}>
      <div id="study-plan" style={{ scrollMarginTop: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div>
            <SectionHead icon="mission">Study Plan</SectionHead>
            <p style={{ margin: "6px 0 0", color: TEXT2, fontSize: 13, lineHeight: 1.6 }}>
              One control centre for what you study, when you study, and how hard the plan should push.
            </p>
          </div>
          <Badge tone="green"><Icon name="done" size={12} /> {savedLabel}</Badge>
        </div>

        <div
          style={{
            marginTop: 18,
            padding: 18,
            borderRadius: R.lg,
            border: `1px solid ${C.border}`,
            background: "linear-gradient(135deg, rgba(200,0,0,0.055), var(--sch-card-2))",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
              <span style={{ width: 42, height: 42, borderRadius: 12, background: IRIDESCENT, display: "grid", placeItems: "center", color: "#fff", fontWeight: 850, fontSize: 13, flexShrink: 0 }}>
                {paperId}
              </span>
              <span style={{ minWidth: 0 }}>
                <strong style={{ display: "block", color: C.text, fontSize: 15 }}>{paper?.name ?? paperId}</strong>
                <span style={{ display: "block", color: TEXT2, fontSize: 12, marginTop: 2 }}>
                  {plan.examDate ? `Exam ${format(new Date(`${plan.examDate}T00:00:00`), "d MMMM yyyy")}` : "No exam date set"}
                </span>
              </span>
            </div>
            <span style={{ padding: "7px 11px", borderRadius: 999, color: statusView.color, background: statusView.background, fontSize: 11.5, fontWeight: 800 }}>
              {statusView.label}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(125px, 1fr))", gap: 10, marginTop: 16 }}>
            {[
              ["Daily block", `${plan.dailyMinutes} min`],
              ["Study week", `${studyDays.length} days · ${weeklyStudyHours(plan)}h`],
              ["Question target", `${dayShape.questionGoal} automatic`],
              ["Readiness", stats.answered > 0 ? `${Math.round(stats.readiness)}% → ${plan.targetProb}%` : `Measure → ${plan.targetProb}%`],
            ].map(([label, value]) => (
              <div key={label} style={{ padding: "11px 12px", borderRadius: R.md, background: "var(--sch-card)", border: `1px solid ${C.border}` }}>
                <div style={{ color: "var(--sch-tx-4)", fontSize: 10.5, fontWeight: 750, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
                <div style={{ color: C.text, fontSize: 13.5, fontWeight: 800, marginTop: 4 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <SettingRow name="Active paper" desc="Switch the workspace; progress on every paper remains separate and safe">
            <select aria-label="Active ACCA paper" value={paperId} onChange={(event) => switchPaper(event.target.value)} style={selectStyle}>
              {ALL_PAPERS.map((item) => <option key={item.id} value={item.id}>{item.id} — {item.name}</option>)}
            </select>
          </SettingRow>

          {["LW", "TX"].includes(paperId) && (
            <SettingRow name={`${paperId} variant`} desc="This changes the syllabus, question bank and study content—not your saved progress">
              <select
                aria-label={`${paperId} study variant`}
                value={variant ?? (paperId === "LW" ? "GLOBAL" : "UK")}
                onChange={(event) => {
                  const next = event.target.value as PaperVariant
                  setPaperVariant(paperId, next)
                  setVariantState(next)
                  void persistAccountSetup()
                  toast.success(`${paperId} changed to ${next === "UK" ? "United Kingdom" : paperId === "TX" ? "International foundation" : "Global"} — reloading study content`)
                  window.setTimeout(() => window.location.reload(), 350)
                }}
                style={selectStyle}
              >
                <option value="UK">United Kingdom</option>
                <option value="GLOBAL">{paperId === "TX" ? "International foundation (not an ACCA exam variant)" : "Global"}</option>
              </select>
            </SettingRow>
          )}

          <SettingRow name="Exam date" desc="The roadmap works backwards from this date and prioritises rehearsal as it approaches">
            <input
              type="date"
              aria-label="ACCA exam date"
              value={plan.examDate ?? ""}
              onChange={(event) => updatePlan({ examDate: event.target.value || null }, "Exam date updated — your roadmap has been recalculated")}
              style={{ ...selectStyle, colorScheme: "light dark" }}
            />
          </SettingRow>

          <SettingRow name="Study days" desc="Rest days stay clear; Scholify does not create a catch-up penalty for them">
            <div role="group" aria-label="Days of the week to study" style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: 6 }}>
              {WEEK_DAYS.map(({ day, short, long }) => {
                const on = studyDays.includes(day)
                return (
                  <motion.button
                    key={day}
                    type="button"
                    aria-label={`${long}: ${on ? "study day" : "rest day"}`}
                    aria-pressed={on}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleStudyDay(day)}
                    style={{
                      width: 42,
                      height: 38,
                      borderRadius: R.sm,
                      border: `1.5px solid ${on ? C.brand : C.border}`,
                      background: on ? C.brandSoft : "var(--sch-card)",
                      color: on ? C.brand : C.muted,
                      fontSize: 11.5,
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    {short}
                  </motion.button>
                )
              })}
            </div>
          </SettingRow>

          <SettingRow name="Session start time" desc="Your protected study appointment; reminder emails are scheduled around the same clock">
            <TimeInput
              value={sessionTime}
              onChange={(value) => {
                updatePlan({ studyTime: value })
                onSessionTimeChange(value)
              }}
            />
          </SettingRow>

          <SettingRow name="Daily study time" desc="A real time budget: Scholify fills it with learning, practice, recall and flashcards">
            <div style={{ display: "grid", justifyItems: "end", gap: 8 }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
                {[40, 60, 90, 120].map((minutes) => {
                  const on = plan.dailyMinutes === minutes
                  return (
                    <motion.button
                      key={minutes}
                      type="button"
                      aria-pressed={on}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => updatePlan({ dailyMinutes: minutes })}
                      style={{ padding: "0 11px", minWidth: 54, height: 38, borderRadius: R.sm, border: `1.5px solid ${on ? C.brand : C.border}`, background: on ? C.brandSoft : "var(--sch-card)", color: on ? C.brand : C.text, fontSize: 12.5, fontWeight: 800, cursor: "pointer" }}
                    >
                      {minutes}m
                    </motion.button>
                  )
                })}
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
                <motion.button type="button" whileTap={{ scale: 0.94 }} onClick={() => updatePlan({ dailyMinutes: Math.max(20, plan.dailyMinutes - 5) })} aria-label="Decrease daily study time by 5 minutes" style={{ width: 34, height: 34, borderRadius: R.sm, border: `1px solid ${C.border}`, background: "var(--sch-card)", color: C.text, fontWeight: 800, fontSize: 17, cursor: "pointer" }}>−</motion.button>
                <strong style={{ minWidth: 68, textAlign: "center", color: C.text, fontSize: 13.5, fontVariantNumeric: "tabular-nums" }}>{plan.dailyMinutes} min</strong>
                <motion.button type="button" whileTap={{ scale: 0.94 }} onClick={() => updatePlan({ dailyMinutes: Math.min(180, plan.dailyMinutes + 5) })} aria-label="Increase daily study time by 5 minutes" style={{ width: 34, height: 34, borderRadius: R.sm, border: `1px solid ${C.border}`, background: "var(--sch-card)", color: C.text, fontWeight: 800, fontSize: 17, cursor: "pointer" }}>+</motion.button>
              </div>
            </div>
          </SettingRow>

          <SettingRow name="Target readiness" desc="Your safety margin before exam day—not the ACCA pass mark and not a guarantee">
            <div role="radiogroup" aria-label="Target Exam Readiness Score" style={{ display: "flex", gap: 7, flexWrap: "wrap", justifyContent: "flex-end" }}>
              {[
                { value: 65, label: "Pass-ready" },
                { value: 75, label: "Confident" },
                { value: 85, label: "Stretch" },
              ].map(({ value, label }) => {
                const on = plan.targetProb === value
                const extra = Math.round((ambitionFactor(value) - 1) * 100)
                return (
                  <motion.button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => updatePlan({ targetProb: value })}
                    style={{ minWidth: 110, padding: "9px 10px", borderRadius: R.md, border: `1.5px solid ${on ? C.brand : C.border}`, background: on ? C.brandSoft : "var(--sch-card)", color: on ? C.brand : C.text, cursor: "pointer", textAlign: "left" }}
                  >
                    <span style={{ display: "block", fontSize: 14, fontWeight: 850 }}>{value}%</span>
                    <span style={{ display: "block", fontSize: 10.5, fontWeight: 700, marginTop: 2 }}>{label}</span>
                    <span style={{ display: "block", fontSize: 9.5, opacity: 0.78, marginTop: 2 }}>{extra > 0 ? `Up to +${extra}% practice` : "Standard practice"}</span>
                  </motion.button>
                )
              })}
            </div>
          </SettingRow>

          <SettingRow name="Daily question target" desc="Calculated automatically so the dashboard and today's mission cannot disagree" last>
            <div style={{ textAlign: "right" }}>
              <strong style={{ display: "block", color: C.text, fontSize: 17 }}>{dayShape.questionGoal} questions</strong>
              <span style={{ display: "block", color: TEXT2, fontSize: 11.5, marginTop: 2 }}>
                {dayShape.cycles.length} topic {dayShape.cycles.length === 1 ? "cycle" : "cycles"} · {dayShape.cards} flashcards
              </span>
            </div>
          </SettingRow>
        </div>

        <div style={{ marginTop: 18, padding: 18, borderRadius: R.lg, border: `1px solid ${C.border}`, background: "var(--sch-card-2)" }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: C.text }}>Three percentages that mean different things</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginTop: 12 }}>
            {[
              ["50% · ACCA pass mark", "Fixed by ACCA. You cannot change it in Scholify."],
              [`${stats.answered > 0 ? `${Math.round(stats.readiness)}%` : "—"} · Current readiness`, "Measured from your diagnostic, practice coverage, accuracy and exam evidence."],
              [`${plan.targetProb}% · Your target`, "The safety level your plan aims for. A higher target increases practice pressure."],
            ].map(([title, detail]) => (
              <div key={title} style={{ padding: 13, borderRadius: R.md, background: "var(--sch-card)", border: `1px solid ${C.border}` }}>
                <strong style={{ display: "block", color: C.text, fontSize: 12.5 }}>{title}</strong>
                <span style={{ display: "block", color: TEXT2, fontSize: 11.5, lineHeight: 1.5, marginTop: 5 }}>{detail}</span>
              </div>
            ))}
          </div>
          <p style={{ margin: "11px 0 0", color: "var(--sch-tx-4)", fontSize: 11.5, lineHeight: 1.55 }}>
            Published ACCA pass rates describe past candidate cohorts. They provide context only and never change your personal plan or score.
          </p>
          <a
            href="https://www.accaglobal.com/uk/en/help/exams-faqs.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", marginTop: 7, color: C.brand, fontSize: 11.5, fontWeight: 750, textDecoration: "none" }}
          >
            Verify the 50% pass mark on ACCA Global ↗
          </a>
        </div>

        <div style={{ marginTop: 14, padding: "14px 16px", borderRadius: R.md, color: statusView.color, background: statusView.background, fontSize: 12.5, lineHeight: 1.6 }}>
          <strong>{paused ? "Your plan is paused." : guide.headline}</strong>{" "}
          {paused
            ? `Your answers, notes, diagnostics and history remain safe${paused.returnDate ? ` until you return on ${paused.returnDate}` : ""}.`
            : `${studyDays.length} study days at ${plan.dailyMinutes} minutes gives ${guide.weeklyHours} protected hours per week${guide.availableWeeks !== null ? ` across ${guide.availableWeeks} weeks before the exam` : ""}. ${guide.status === "risky" ? `The current route is short by about ${guide.deficitHours} hours; add sustainable time or choose a later sitting.` : "Changes take effect from the next unstarted daily mission."}`}
        </div>

        <details style={{ marginTop: 16, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
          <summary style={{ color: C.text, fontSize: 13, fontWeight: 800, cursor: "pointer" }}>Pause this paper safely</summary>
          <p style={{ color: TEXT2, fontSize: 12, lineHeight: 1.55, margin: "8px 0 12px" }}>
            Use a pause for illness, work, travel or another real break. Nothing is deleted and no artificial catch-up debt is created.
          </p>
          {!paused && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              <select aria-label="Reason for pausing study plan" value={reason} onChange={(event) => setReason(event.target.value as PlanChangeReason)} style={{ ...selectStyle, flex: "1 1 230px" }}>
                <option value="difficulty">This paper feels too difficult</option>
                <option value="illness">Illness or recovery</option>
                <option value="work">Work, travel or family</option>
                <option value="course">My course or tutor changed</option>
                <option value="exam-date">My exam date changed</option>
                <option value="personal">Personal choice</option>
                <option value="other">Another reason</option>
              </select>
              <input type="date" aria-label="Optional return date" value={returnDate} min={new Date().toISOString().slice(0, 10)} onChange={(event) => setReturnDate(event.target.value)} style={{ ...selectStyle, width: "auto", flex: "1 1 170px", colorScheme: "light dark" }} />
            </div>
          )}
          <Button onClick={togglePause} variant={paused ? "primary" : "secondary"}>
            {paused ? "Resume my plan" : "Pause without losing progress"}
          </Button>
        </details>
      </div>
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
        flexWrap: "wrap",
        gap: 16,
        padding: "14px 0",
        borderBottom: last ? "none" : "1px solid var(--sch-card-2)",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 14, color: "var(--sch-text)" }}>{name}</div>
        <div style={{ fontSize: 12, color: TEXT2, marginTop: 2 }}>{desc}</div>
      </div>
      <div style={{ flexShrink: 0, maxWidth: "100%", marginLeft: "auto" }}>{children}</div>
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
        colorScheme: "light dark",
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
  const panelRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const titleId = useId()
  const bodyId = useId()

  useEffect(() => {
    if (!open) {
      setTyped("")
      return
    }
    // Remember where focus was, move it into the dialog, and restore on close.
    returnFocusRef.current = document.activeElement as HTMLElement | null
    const raf = requestAnimationFrame(() => panelRef.current?.focus())
    return () => {
      cancelAnimationFrame(raf)
      returnFocusRef.current?.focus?.()
      returnFocusRef.current = null
    }
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
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={bodyId}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.stopPropagation()
                onCancel()
              }
            }}
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
              outline: "none",
            }}
          >
            <h3 id={titleId} style={{ fontSize: 18, fontWeight: 700, color: "var(--sch-text)" }}>{title}</h3>
            <p id={bodyId} style={{ fontSize: 14, color: TEXT2, marginTop: 8, lineHeight: 1.6 }}>{body}</p>

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

const THEMES = [
  { id: "light", name: "Light", bg: "#f3f3f7", accent: "#6d5bf5" },
  { id: "dark", name: "Dark", bg: "#0b0b12", accent: "#E50068" },
] as const

export default function Settings() {
  const navigate = useNavigate()
  const { user, signOut, signOutOtherSessions } = useAuth()
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  const [answered, setAnswered] = useState(() => getOverallProgress().totalAnswered)
  const [settings, setSettings] = useState<AppSettings>(readSettings)

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [savingPassword, setSavingPassword] = useState(false)
  const [revokingSessions, setRevokingSessions] = useState(false)
  const [editingProfile, setEditingProfile] = useState(false)
  const [firstName, setFirstName] = useState((user?.user_metadata?.first_name as string) || "")
  const [lastName, setLastName] = useState((user?.user_metadata?.last_name as string) || "")
  const email = user?.email || ""
  const [savingProfile, setSavingProfile] = useState(false)
  const [avatarHover, setAvatarHover] = useState(false)
  const [avatarBusy, setAvatarBusy] = useState(false)
  const [avatarTick, setAvatarTick] = useState(0)
  const avatarFileRef = useRef<HTMLInputElement>(null)
  useEffect(() => onAvatarChange(() => setAvatarTick((t) => t + 1)), [])
  const avatarSrc = useMemo(() => avatarUrlOf(user), [user, avatarTick])
  const [dialog, setDialog] = useState<"cancel" | "reset" | "delete" | null>(null)

  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Learner"
  const ent = entitlementOf(user)
  const isPaid = ent.isPaid
  // The label and billing line must reflect the ACTUAL plan — a Beginner or
  // Annual Pro subscriber was previously shown "Pro · $14.99/month".
  const annualBeginner = ent.plan === "beginner" && user?.app_metadata?.billing_interval === "year"
  const planLabel = ent.plan === "beginner" ? (annualBeginner ? "Annual Beginner" : "Beginner") : ent.plan === "annual_pro" ? "Annual Pro" : "Pro"
  const planBilling =
    ent.plan === "beginner"
      ? annualBeginner ? "Billed annually · $79.99/year" : "Billed monthly · $9.99/month"
      : ent.plan === "annual_pro"
        ? "Billed annually · $119.99/year"
        : "Billed monthly · $14.99/month"
  const memberSince = user?.created_at ? format(new Date(user.created_at), "MMMM yyyy") : "2026"

  /*
   * Billing dates, written by the Stripe webhook into app_metadata. Rendered
   * only when present: an older subscription predating those fields shows the
   * plan without dates rather than an invented one. A trial's first charge is
   * its trial_end; a live subscription's next charge is its period end.
   */
  const billingDate = (raw: unknown): string | null => {
    if (typeof raw !== "string") return null
    const parsed = new Date(raw)
    return Number.isNaN(parsed.getTime()) ? null : format(parsed, "d MMMM yyyy")
  }
  const subscriptionStarted = billingDate(user?.app_metadata?.period_started_at)
  const nextChargeOn = ent.isTrial
    ? billingDate(ent.trialEndsAt)
    : billingDate(user?.app_metadata?.period_ends_at)

  // Founder operations live exclusively at /admin. These legacy render guards
  // stay false so Settings remains an account-preferences surface.
  const isAdmin = false
  const retention = { total: 0, day3: 0, day7: 0, converted: 0, limited: false }
  const waitlist = { contacts: [] as Array<{ id: string; name: string; email: string; created_at: string }>, total: 0 }
  const partners = [] as Array<{ id: string; name: string; code: string; email: string; university?: string; country?: string; socials?: string; audience_size?: string; status: string }>
  const reviewPartner = async (_id: string, _status: string) => false

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

  const updatePracticeTime = useCallback((practiceTime: string) => {
    setSettings((previous) => {
      const next = { ...previous, practiceTime, reminderTime: practiceTime }
      try {
        window.localStorage.setItem("scholify-settings", JSON.stringify(next))
      } catch {
        /* local persistence is best-effort */
      }
      void syncReminder(next.notifyDaily, practiceTime, next.reminderSlots)
      return next
    })
    toast.success("Study time and reminders updated")
  }, [toast])

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

  const onPickAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = "" // allow re-picking the same file
    if (!file || avatarBusy) return
    setAvatarBusy(true)
    try {
      const { mode } = await saveAvatar(user, file)
      setAvatarTick((t) => t + 1)
      toast.success(mode === "cloud" ? "Profile photo updated" : "Photo saved on this device")
    } catch (err) {
      const code = (err instanceof Error ? err.message : "") as AvatarError
      toast.error(
        code === "too_large"
          ? `Choose an image under ${AVATAR_MAX_SOURCE_MB} MB`
          : code === "not_image"
            ? "That file isn't an image"
            : "Couldn't read that image — try a different one",
      )
    } finally {
      setAvatarBusy(false)
    }
  }

  const onRemoveAvatar = async () => {
    if (avatarBusy) return
    setAvatarBusy(true)
    try {
      await removeAvatar(user)
      setAvatarTick((t) => t + 1)
      toast.success("Photo removed")
    } finally {
      setAvatarBusy(false)
    }
  }

  const changePassword = async () => {
    if (newPassword.length < 8) {
      toast.error("Use at least 8 characters")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("The two passwords don't match")
      return
    }
    if (!isSupabaseConfigured) {
      toast.error("Password changes need a connected account — email support@scholifyapp.com")
      return
    }
    setSavingPassword(true)
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      /*
       * Show what actually went wrong. This used to swallow the message and
       * always say "sign in again and retry", so a user told "your new password
       * must differ from the old one", or asked to reauthenticate, was instead
       * sent to re-login — which fixed nothing and taught them nothing. On the
       * one screen that can lock someone out of their own account, a vague
       * error is worse than no error.
       */
      if (error) {
        toast.error(error.message || "Couldn't update your password")
        return
      }
      setNewPassword("")
      setConfirmPassword("")
      const secured = await signOutOtherSessions()
      toast.success(
        secured.error
          ? "Password updated. Use 'End other logins' below to finish securing the account."
          : "Password updated and other logins ended",
      )
    } catch {
      toast.error("Couldn't reach the account service — check your connection and try again")
    } finally {
      setSavingPassword(false)
    }
  }

  const revokeOtherLogins = async () => {
    if (revokingSessions) return
    setRevokingSessions(true)
    try {
      const result = await signOutOtherSessions()
      if (result.error) {
        toast.error("Couldn't end the other logins — check your connection and try again")
        return
      }
      toast.success("Other logins ended. This browser stays signed in.")
    } finally {
      setRevokingSessions(false)
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
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    if (!token) {
      toast.error("Your session expired. Sign in again before deleting the account.")
      return
    }
    try {
      const response = await fetch("/api/affiliate?action=delete-account", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean }
      if (!response.ok || !result.ok) {
        toast.error("Account deletion failed. Nothing was erased — please try again.")
        return
      }
    } catch {
      toast.error("Account deletion failed. Nothing was erased — check your connection and try again.")
      return
    }

    try {
      // Match "scholify" (no separator), so BOTH the hyphen keys (scholify-…)
      // and the colon-namespaced stores (scholify:acca:notes:v1 and its
      // tombstones) are erased. The old "scholify-" filter left every written
      // note and its tombstones in the browser after "permanently deleted".
      const keys: string[] = []
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i)
        if (key) keys.push(key)
      }
      for (const key of keys) {
        if (key.startsWith("scholify")) window.localStorage.removeItem(key)
      }
    } catch {
      /* ignore */
    }
    await signOut()
    toast.success("Account and saved data permanently deleted")
    navigate("/", { replace: true })
  }

  const handleSignOut = async () => {
    // Never wipe study data on sign-out — in demo mode it's the only copy.
    await signOut()
    navigate("/", { replace: true })
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
          Tune your study plan, account and preferences. Changes save automatically.
        </p>

        {/* The learner came here to change the plan. Put that job first—not
            below profile, billing and security where it looked like an account
            administration detail. */}
        <ExamSetupSection sessionTime={settings.practiceTime} onSessionTimeChange={updatePracticeTime} />

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
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, flexShrink: 0 }}>
              <motion.button
                type="button"
                aria-label="Change profile photo"
                disabled={avatarBusy}
                onClick={() => avatarFileRef.current?.click()}
                onMouseEnter={() => setAvatarHover(true)}
                onMouseLeave={() => setAvatarHover(false)}
                whileTap={avatarBusy ? undefined : { scale: 0.96 }}
                style={{
                  position: "relative",
                  width: 80,
                  height: 80,
                  padding: 0,
                  border: "none",
                  background: "transparent",
                  cursor: avatarBusy ? "default" : "pointer",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: IRIDESCENT,
                    border: "3px solid rgba(200,0,0,0.4)",
                    boxShadow: "0 0 30px rgba(200,0,0,0.2)",
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                  }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {avatarSrc ? (
                      <motion.img
                        key={avatarSrc}
                        src={avatarSrc}
                        alt="Your profile photo"
                        initial={{ opacity: 0, scale: 1.15 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <motion.span
                        key="initial"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ fontSize: 32, fontWeight: 800 }}
                      >
                        {fullName.charAt(0).toUpperCase()}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.5)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 3,
                      color: "#fff",
                      opacity: avatarHover && !avatarBusy ? 1 : 0,
                      transition: "opacity 0.2s",
                    }}
                  >
                    <Icon name="camera" size={17} color="#fff" />
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.02em" }}>Change</span>
                  </div>
                  {avatarBusy && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.45)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          border: "2.5px solid rgba(255,255,255,0.35)",
                          borderTopColor: "#fff",
                          display: "block",
                        }}
                      />
                    </div>
                  )}
                </div>
                {/* the always-visible affordance — hover isn't a thing on touch */}
                <span
                  style={{
                    position: "absolute",
                    right: -2,
                    bottom: -2,
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: GRAD,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2.5px solid var(--sch-card)",
                    boxShadow: "0 4px 10px rgba(200,0,0,0.35)",
                    pointerEvents: "none",
                  }}
                >
                  <Icon name="camera" size={13} color="#fff" />
                </span>
              </motion.button>
              <input
                ref={avatarFileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                style={{ display: "none" }}
                onChange={onPickAvatar}
              />
              <AnimatePresence>
                {avatarSrc && !avatarBusy && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onClick={onRemoveAvatar}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      fontSize: 11,
                      fontWeight: 600,
                      color: TEXT2,
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                  >
                    Remove photo
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--sch-text)" }}>{fullName}</div>
              <div style={{ fontSize: 14, color: TEXT2, marginTop: 4 }}>{user?.email}</div>
              <div style={{ marginTop: 10 }}>
                <Badge tone={isPaid || ent.isTrial ? "brand" : "neutral"}>
                  {ent.isTrial ? (
                    <>
                      <Icon name="trophy" size={12} /> Pro trial · {ent.trialDaysLeft}d left
                    </>
                  ) : isPaid ? (
                    <>
                      <Icon name="trophy" size={12} /> {planLabel}
                    </>
                  ) : (
                    "Plan locked"
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
                    {/*
                      TWO fields, not one. With a single field a typo becomes
                      your new password silently — you are then locked out of an
                      account whose password you have never seen, and the only
                      way back is the reset email. This is the one form where a
                      mistake cannot be noticed and cannot be undone, so it is
                      the one form that must be typed twice.
                    */}
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
                      <input
                        type="password"
                        value={confirmPassword}
                        autoComplete="new-password"
                        placeholder="Repeat it"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{
                          flex: "1 1 200px",
                          height: 44,
                          padding: "0 14px",
                          borderRadius: 10,
                          fontSize: 14,
                          color: "var(--sch-text)",
                          background: "var(--sch-card-2)",
                          border: `1px solid ${
                            confirmPassword.length > 0 && confirmPassword !== newPassword
                              ? "rgba(200,0,0,0.55)"
                              : "var(--sch-border-2)"
                          }`,
                          outline: "none",
                        }}
                      />
                      <Button
                        variant="secondary"
                        onClick={changePassword}
                        disabled={savingPassword || newPassword.length === 0 || confirmPassword !== newPassword}
                      >
                        {savingPassword ? "Updating…" : "Update password"}
                      </Button>
                    </div>
                    {confirmPassword.length > 0 && confirmPassword !== newPassword && (
                      <div style={{ fontSize: 12, color: "#C80000", marginTop: 6 }}>
                        The two passwords don’t match.
                      </div>
                    )}
                    <div style={{ fontSize: 11.5, color: TEXT2, marginTop: 6, lineHeight: 1.5 }}>
                      Changing this signs you in with the new password next time. Your email stays the same — it
                      cannot be changed here.
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
                {ent.isTrial ? "Pro trial" : isPaid ? planLabel : "Plan locked"}
              </div>
              <div style={{ fontSize: 13, color: TEXT2, marginTop: 4, lineHeight: 1.6 }}>
                {ent.isTrial
                  ? `${ent.trialDaysLeft} day${ent.trialDaysLeft === 1 ? "" : "s"} free. All 15 papers and every Pro mode are unlocked.`
                  : isPaid
                    ? planBilling
                    : "Choose Beginner or Pro to unlock the workspace; your diagnosis and personalised plan remain saved."}
              </div>

              {/*
                The two dates a subscriber actually wants: when this started,
                and when the next charge lands. Not knowing the second one is
                the single commonest reason a legitimate charge gets disputed —
                showing it costs nothing and prevents that conversation.
              */}
              {isPaid && (subscriptionStarted || nextChargeOn) && (
                <div style={{ fontSize: 12.5, color: "var(--sch-tx-4)", marginTop: 8, lineHeight: 1.7 }}>
                  {subscriptionStarted && (
                    <div>
                      Subscription started <b style={{ color: TEXT2 }}>{subscriptionStarted}</b>
                    </div>
                  )}
                  {nextChargeOn && (
                    <div>
                      {ent.isTrial ? "First charge on " : "Next charge on "}
                      <b style={{ color: TEXT2 }}>{nextChargeOn}</b>
                    </div>
                  )}
                </div>
              )}
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
              /*
               * No "Cancel plan" button here — founder's call: a red cancel
               * control sitting next to the plan invites the thought rather
               * than answering a need. Billing is still fully self-serve
               * through Stripe's hosted portal below, which is what keeps us
               * inside Stripe's requirement for a clear cancellation route:
               * a customer who cannot find one disputes the charge instead,
               * and disputes cost far more than the churn they prevent.
               */
              <Button variant="secondary" onClick={() => { void openStripeBillingPortal().then((ok) => { if (!ok) toast.error("Couldn't open billing management — please try again") }) }}>
                Manage plan & billing
              </Button>
            ) : (
              <Button onClick={() => navigate("/pricing")}>
                Choose Beginner or Pro
                <Icon name="arrow" size={16} />
              </Button>
            )}
          </div>
        </Section>

        {/* ── Login security ── */}
        <Section>
          <SectionHead icon="lock">Login Security</SectionHead>
          <div
            style={{
              marginTop: 12,
              padding: "12px 14px",
              borderRadius: R.md,
              border: "1px solid rgba(244,164,5,0.24)",
              background: "rgba(244,164,5,0.07)",
              color: TEXT2,
              fontSize: 12.5,
              lineHeight: 1.6,
            }}
          >
            Your account contains your answers, mock scores, notes, Charles conversations and billing access. Never share its password — another person would see and change the same private learner record.
          </div>
          <div style={{ marginTop: 8 }}>
            <SettingRow
              name="Active-login policy"
              desc="One learner, one active login. Signing in on another browser replaces the older login."
            >
              <Badge tone="green">
                <Icon name="done" size={12} /> Protected
              </Badge>
            </SettingRow>
            <SettingRow
              name="End other logins"
              desc="Use this after a shared computer, a lost device, or any login you do not recognise."
              last
            >
              <Button variant="secondary" onClick={() => void revokeOtherLogins()} disabled={revokingSessions}>
                {revokingSessions ? "Securing…" : "End other logins"}
              </Button>
            </SettingRow>
          </div>
        </Section>

        {/* ── Notifications ── */}
        <Section>
          <SectionHead icon="mission">Notifications</SectionHead>
          <div style={{ marginTop: 8 }}>
            {/*
              * Every reminder derives from ONE clock — the practice time. Exposing
              * separate times would let a learner set them out of order (a "30
              * minutes before" that lands after the catch-up), and there is nothing
              * useful they could express that way.
              *
              * Every change re-syncs immediately, including the timezone, because
              * a stale zone is the one error that silently sends every reminder at
              * the wrong hour with no visible symptom in the UI.
              */}
            {/* A tour you cannot rewatch is a tour people skip and then regret
                skipping. Dispatching the event keeps the storage key owned by
                one file (AppTour) instead of duplicated here. */}
            <SettingRow name="Guided tour" desc="Replay the seven-step introduction to your workspace">
              <Button
                variant="secondary"
                onClick={() => window.dispatchEvent(new Event("scholify:app-tour:replay"))}
              >
                Show me again
              </Button>
            </SettingRow>
            <SettingRow name="Practice reminders" desc={`Email reminders around your ${settings.practiceTime} Study Plan appointment`}>
              <Toggle
                on={settings.notifyDaily}
                onChange={(v) => {
                  update("notifyDaily", v)
                  void syncReminder(v, settings.practiceTime, settings.reminderSlots)
                }}
              />
            </SettingRow>
            {settings.notifyDaily && (
              <>
                {REMINDER_SLOT_ROWS.map((row) => (
                  <SettingRow key={row.key} name={row.name} desc={row.desc(settings.practiceTime)}>
                    <Toggle
                      on={settings.reminderSlots[row.key] !== false}
                      onChange={(v) => {
                        const next = { ...settings.reminderSlots, [row.key]: v }
                        update("reminderSlots", next)
                        void syncReminder(true, settings.practiceTime, next)
                      }}
                    />
                  </SettingRow>
                ))}
                <div style={{ padding: "10px 2px 2px", fontSize: 11.5, lineHeight: 1.55, color: "var(--sch-tx-3)" }}>
                  Times are in your device's timezone ({localTimeZone()}). Reminders stop for the
                  rest of the day as soon as you start a session.
                </div>
              </>
            )}
            {/*
              THREE TOGGLES REMOVED HERE: "Streak alerts", "Weekly progress
              report" and "New features".

              All three wrote a flag to settings and nothing anywhere read it.
              Two of them described emails that do not exist in api/ at all —
              there is no weekly summary sender and no product-update sender —
              and the third gated nothing, since the streak line rides on the
              daily reminder the toggle above already controls.

              A switch that does nothing is worse than a missing feature. It
              teaches the learner that our settings are decorative, so when they
              later turn OFF something that does work, they have no reason to
              believe it. Any of these can come back the day its sender does.
            */}
          </div>
        </Section>

        {/* ── Invite friends (referrals) ── */}
        <Section>
          <SectionHead icon="support">Invite Friends</SectionHead>
          <p style={{ fontSize: 13, color: TEXT2, marginTop: 6, lineHeight: 1.6 }}>
            Share your link — anyone who joins can build their personalised plan free, then try Pro for 3 days after secure checkout.
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
            We count invites here so we know who to thank.
          </p>

          <div
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 14,
              background: "var(--sch-card-2)",
              border: "1px solid var(--sch-border)",
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--sch-text)", marginBottom: 4 }}>
              Want to earn from referrals?
            </div>
            <p style={{ fontSize: 12.5, color: TEXT2, lineHeight: 1.6, marginBottom: 12 }}>
              Join the Scholify partner program and earn 27% on every qualifying plan sale you bring in.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Button variant="secondary" onClick={() => navigate("/partners/apply")} style={{ flexShrink: 0 }}>
                Become a partner
              </Button>
              <Button variant="secondary" onClick={() => navigate("/partners")} style={{ flexShrink: 0 }}>
                Partner dashboard
              </Button>
            </div>
          </div>
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

        {/* ── Launch waitlist (admin only) ── */}
        {isAdmin && (
          <Section>
            <SectionHead icon="support">Launch waitlist (admin)</SectionHead>
            {waitlist === null ? (
              <p style={{ fontSize: 13, color: TEXT2, marginTop: 10 }}>Loading…</p>
            ) : (
              <>
                <div
                  style={{
                    marginTop: 12,
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "var(--sch-card-2)",
                    border: "1px solid var(--sch-border)",
                  }}
                >
                  <div style={{ fontSize: 22, fontWeight: 800, ...iriText }}>{waitlist.total}</div>
                  <div style={{ fontSize: 12, color: TEXT2, marginTop: 2 }}>People waiting for launch</div>
                </div>
                {waitlist.contacts.length === 0 ? (
                  <p style={{ fontSize: 13, color: TEXT2, marginTop: 10 }}>No waitlist signups yet.</p>
                ) : (
                  <div style={{ display: "grid", gap: 8, marginTop: 12, maxHeight: 360, overflowY: "auto" }}>
                    {waitlist.contacts.map((contact) => (
                      <div
                        key={contact.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: 8,
                          padding: "11px 13px",
                          borderRadius: 12,
                          background: "var(--sch-card-2)",
                          border: "1px solid var(--sch-border)",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>{contact.name}</div>
                          <a href={`mailto:${contact.email}`} style={{ fontSize: 12, color: C.red }}>
                            {contact.email}
                          </a>
                        </div>
                        <div style={{ fontSize: 11, color: TEXT2 }}>
                          {format(new Date(contact.created_at), "d MMM yyyy, HH:mm")}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </Section>
        )}

        {/* ── Partner applications (admin only) ── */}
        {isAdmin && (
          <Section>
            <SectionHead icon="support">Partner applications (admin)</SectionHead>
            {partners === null ? (
              <p style={{ fontSize: 13, color: TEXT2, marginTop: 10 }}>Loading…</p>
            ) : partners.length === 0 ? (
              <p style={{ fontSize: 13, color: TEXT2, marginTop: 10, lineHeight: 1.6 }}>
                No applications yet.
              </p>
            ) : (
              <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
                {partners.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: 10,
                      padding: "12px 14px",
                      borderRadius: 12,
                      background: "var(--sch-card-2)",
                      border: "1px solid var(--sch-border)",
                    }}
                  >
                    <div style={{ flex: "1 1 200px", minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--sch-text)" }}>
                        {p.name} · <span style={{ fontFamily: "ui-monospace, monospace" }}>{p.code}</span>
                      </div>
                      <div style={{ fontSize: 12, color: TEXT2, overflow: "hidden", textOverflow: "ellipsis" }}>
                        {p.email}
                        {p.university ? ` · ${p.university}` : ""}
                        {p.country ? ` · ${p.country}` : ""}
                        {p.socials ? ` · ${p.socials}` : ""}
                        {p.audience_size ? ` · ${p.audience_size} audience` : ""}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 999,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color:
                          p.status === "active" ? "#1E9E5A" : p.status === "rejected" ? "var(--sch-tx-2)" : "#B7791F",
                        background:
                          p.status === "active"
                            ? "rgba(34,160,90,0.12)"
                            : p.status === "rejected"
                              ? "var(--sch-bg)"
                              : "rgba(244,164,5,0.12)",
                      }}
                    >
                      {p.status}
                    </span>
                    {p.status !== "active" && (
                      <Button variant="secondary" onClick={() => void reviewPartner(p.id, "active")} style={{ flexShrink: 0 }}>
                        Approve
                      </Button>
                    )}
                    {p.status !== "rejected" && (
                      <Button variant="ghost" onClick={() => void reviewPartner(p.id, "rejected")} style={{ flexShrink: 0 }}>
                        Reject
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Section>
        )}

        {/* ── Calendar Sync ── */}
        <CalendarSync />

        {/*
          THE PRIVACY SECTION WAS REMOVED HERE.

          It held three switches - share completions to the community feed,
          share streak milestones, appear in leaderboards - governing a feature
          that does not exist. There is no feed and no leaderboard anywhere in
          the app: community-storage.ts, which generates the posts, is imported
          by exactly one file, and that file was this one. A learner opting out
          of a leaderboard they can never appear on is being asked to manage a
          privacy risk we invented.

          The storage module is left in place, dormant. When the feed is
          actually built, these controls come back WITH it - which is the right
          order, because a privacy control shipped ahead of the thing it
          protects is a claim about data handling that nothing backs.
        */}

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
              name="Delete account"
              desc="Permanently deletes your Scholify account and erases saved data from this device."
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
      {/* The in-app "Cancel your plan?" dialog was removed with the button that
          opened it. Cancellation now happens in Stripe's hosted portal, which
          states the no-refund terms at the point of cancelling and is the route
          Stripe requires us to provide. */}
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
        title="Permanently delete account?"
        body="This permanently deletes your Scholify account, cloud records and local study data. It cannot be undone. Type DELETE to confirm."
        confirmLabel="Delete account"
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
