import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { useAuth } from "@/lib/auth"
import { iriText } from "@/components/dashboard-layout"
import { Icon, Button, C, type IconName } from "@/components/acca/ui"
import { ScholifyMark, ScholifyLockup } from "@/components/brand"
import { paperLevels, setPassedPapers, setStudyingPapers } from "@/lib/acca-qualification"
import { setPlan } from "@/lib/acca-plan"
import { setDailyGoal } from "@/lib/acca"
import { GOAL_OPTIONS, setGoal, setExperience, isAccaOnboarded, markAccaOnboarded, type Goal } from "@/lib/acca-profile"

/*
 * /welcome — the post-sign-in onboarding: a full-screen, swipeable run of
 * essential questions, ending in the diagnostic (day-one activation):
 *
 *   0 hero → 1 target paper → 2 daily time → 3 exam date → 4 goal → 5 ready
 *   → /study/diagnostic?next=paywall → results → trial paywall → /dashboard
 *
 * Swipe horizontally (drag / arrow keys / buttons). ACCA exam logic:
 * BT·MA·FA·LW are on-demand CBEs (any date); every other paper is
 * session-based — four sittings a year (March / June / September /
 * December, exam week = the first full Mon–Fri week of the month).
 */

const ON_DEMAND = new Set(["BT", "MA", "FA", "LW"])
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

interface Sitting {
  label: string // "September 2026"
  week: string // "7–11 Sep"
  date: string // nominal Wednesday of exam week, YYYY-MM-DD
}

/** Next `count` ACCA session sittings (Mar/Jun/Sep/Dec, first full Mon–Fri week). */
function nextSittings(count = 3): Sitting[] {
  const SITTING_MONTHS = [2, 5, 8, 11]
  const now = new Date()
  const out: Sitting[] = []
  let year = now.getFullYear()
  let idx = SITTING_MONTHS.findIndex((m) => m > now.getMonth())
  if (idx === -1) { idx = 0; year += 1 }
  while (out.length < count) {
    const m = SITTING_MONTHS[idx]
    const first = new Date(year, m, 1)
    const firstMonday = 1 + ((8 - first.getDay()) % 7)
    const wed = firstMonday + 2
    const pad = (n: number) => `${n}`.padStart(2, "0")
    out.push({
      label: `${MONTHS[m]} ${year}`,
      week: `${firstMonday}–${firstMonday + 4} ${MONTHS[m].slice(0, 3)}`,
      date: `${year}-${pad(m + 1)}-${pad(wed)}`,
    })
    idx += 1
    if (idx >= SITTING_MONTHS.length) { idx = 0; year += 1 }
  }
  return out
}

const TOTAL = 6

export default function Welcome() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const reduced = useReducedMotion()
  const firstName = (user?.user_metadata?.full_name as string | undefined)?.split(" ")[0]
    || user?.email?.split("@")[0]
    || null

  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [passed, setPassed] = useState<Set<string>>(new Set())
  const [showPassed, setShowPassed] = useState(false)
  const [paper, setPaper] = useState<string | null>(null)
  const [minutes, setMinutes] = useState(25)
  const [studyTime, setStudyTime] = useState("19:00")
  const [examDate, setExamDate] = useState("")
  const [pickedSitting, setPickedSitting] = useState<string | null>(null)
  const [goal, setGoalState] = useState<Goal | null>(null)

  const levels = useMemo(() => paperLevels(), [])
  const sittings = useMemo(() => nextSittings(3), [])
  const sessionPaper = paper !== null && !ON_DEMAND.has(paper)

  // Already onboarded → this page is not for you.
  useEffect(() => {
    if (isAccaOnboarded()) navigate("/dashboard", { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const canAdvance =
    step === 1 ? paper !== null :
    step === 4 ? goal !== null :
    true

  function go(delta: number) {
    setDir(delta)
    setStep((s) => Math.min(TOTAL - 1, Math.max(0, s + delta)))
  }

  // Arrow-key navigation.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && canAdvance && step < TOTAL - 1) go(1)
      if (e.key === "ArrowLeft" && step > 0) go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  function persist() {
    if (!paper) return
    setPassedPapers([...passed])
    setStudyingPapers([paper])
    if (goal) setGoal(goal)
    if (goal === "career") setExperience("professional")
    const questionsPerDay = minutes >= 60 ? 30 : minutes >= 40 ? 22 : minutes >= 25 ? 15 : 10
    setPlan(paper, {
      examDate: examDate || null,
      studyTime: studyTime || null,
      dailyMinutes: minutes,
      dailyGoal: questionsPerDay,
    })
    setDailyGoal(questionsPerDay)
    markAccaOnboarded()
  }

  function finishToDiagnostic() {
    persist()
    navigate("/study/diagnostic?next=paywall")
  }
  function finishSkip() {
    persist()
    navigate("/dashboard")
  }

  const slideAnim = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: dir > 0 ? 90 : -90 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: dir > 0 ? -90 : 90 },
      }

  return (
    <div style={shell}>
      <BackdropArt step={step} />

      {/* top bar: brand + progress */}
      <div style={topBar}>
        <ScholifyLockup size={22} color={C.text} />
        <div style={{ flex: 1, maxWidth: 220, height: 4, borderRadius: 999, background: "var(--sch-card-2)", overflow: "hidden" }}>
          <motion.div
            animate={{ width: `${((step + 1) / TOTAL) * 100}%` }}
            transition={{ type: "spring", stiffness: 170, damping: 26 }}
            style={{ height: "100%", borderRadius: 999, background: C.brand }}
          />
        </div>
        <span style={{ fontSize: 11.5, fontWeight: 750, color: C.faint, fontVariantNumeric: "tabular-nums", width: 34, textAlign: "right" }}>
          {step + 1}/{TOTAL}
        </span>
      </div>

      {/* slides */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0, position: "relative", zIndex: 1 }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            {...slideAnim}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            drag={reduced ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70 && canAdvance && step < TOTAL - 1) go(1)
              else if (info.offset.x > 70 && step > 0) go(-1)
            }}
            style={slideBox}
          >
            {step === 0 && <HeroSlide firstName={firstName} onNext={() => go(1)} />}

            {step === 1 && (
              <SlideFrame
                icon="roadmap"
                kicker="Question 1 of 4"
                title="Which paper are we passing?"
                sub="One paper, one loop. You can add a second later from Settings."
              >
                <div style={{ display: "grid", gap: 14, maxHeight: "44vh", overflowY: "auto", paddingRight: 4 }}>
                  {levels.map((g) => (
                    <div key={g.key}>
                      <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: C.faint, marginBottom: 7 }}>
                        {g.label}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
                        {g.papers.map((p) => {
                          const on = paper === p.id
                          const done = passed.has(p.id)
                          return (
                            <button
                              key={p.id}
                              onClick={() => !done && setPaper(p.id)}
                              disabled={done}
                              style={{
                                ...tile,
                                borderColor: on ? C.brand : C.border,
                                background: on ? C.brandSoft : done ? "var(--sch-card-2)" : C.card,
                                opacity: done ? 0.55 : 1,
                                cursor: done ? "default" : "pointer",
                              }}
                            >
                              <span style={{ fontWeight: 800, fontSize: 14, color: on ? C.brand : C.text }}>{p.id}</span>
                              <span style={{ fontSize: 11, color: C.soft, lineHeight: 1.3, display: "block", marginTop: 2 }}>
                                {done ? "Passed ✓" : p.name}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowPassed((v) => !v)} style={linkBtn}>
                  <Icon name={showPassed ? "close" : "done"} size={13} color={C.brand} />
                  {showPassed ? "Done marking passed papers" : "I've already passed some papers"}
                </button>
                {showPassed && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                    {levels.flatMap((g) => g.papers).map((p) => {
                      const on = passed.has(p.id)
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            setPassed((prev) => {
                              const n = new Set(prev)
                              if (n.has(p.id)) n.delete(p.id)
                              else n.add(p.id)
                              return n
                            })
                            if (paper === p.id) setPaper(null)
                          }}
                          style={{ padding: "6px 11px", borderRadius: 999, border: `1.5px solid ${on ? C.brand : C.border}`, background: on ? C.brandSoft : C.card, color: on ? C.brand : C.text, fontWeight: 700, fontSize: 12, cursor: "pointer" }}
                        >
                          {on && <Icon name="done" size={11} color={C.brand} />} {p.id}
                        </button>
                      )
                    })}
                  </div>
                )}
              </SlideFrame>
            )}

            {step === 2 && (
              <SlideFrame
                icon="time"
                kicker="Question 2 of 4"
                title="How much time can you protect, daily?"
                sub="The students who pass don't find time — they protect it. Small but daily beats big but rarely."
              >
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 14 }}>
                  {[15, 25, 40, 60].map((m) => {
                    const on = minutes === m
                    return (
                      <button key={m} onClick={() => setMinutes(m)} style={{ ...tile, textAlign: "center", padding: "18px 6px", borderColor: on ? C.brand : C.border, background: on ? C.brandSoft : C.card }}>
                        <span style={{ fontWeight: 800, fontSize: 20, color: on ? C.brand : C.text, fontVariantNumeric: "tabular-nums" }}>{m}</span>
                        <span style={{ fontSize: 11, color: C.soft, display: "block" }}>min/day</span>
                      </button>
                    )
                  })}
                </div>
                <p style={{ fontSize: 13, color: C.soft, margin: "0 0 18px", lineHeight: 1.5, minHeight: 20 }}>
                  {minutes >= 60 ? "Serious pace — mock-ready weeks early." : minutes >= 40 ? "Strong pace — steady mastery every week." : minutes >= 25 ? "The sweet spot most passers use." : "A real start — the loop will make every minute count."}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.text, whiteSpace: "nowrap" }}>My daily slot:</span>
                  <input
                    type="time"
                    value={studyTime}
                    onChange={(e) => setStudyTime(e.target.value)}
                    style={{ flex: 1, maxWidth: 160, padding: "12px 14px", borderRadius: 12, border: `1px solid ${C.border}`, background: "var(--sch-bg)", color: C.text, fontSize: 16, fontWeight: 700, colorScheme: "light dark" }}
                  />
                </div>
              </SlideFrame>
            )}

            {step === 3 && (
              <SlideFrame
                icon="calendar"
                kicker="Question 3 of 4"
                title={sessionPaper ? "Which sitting are you taking?" : "When's your exam?"}
                sub={
                  sessionPaper
                    ? `${paper} is a session exam — ACCA runs four sittings a year (March · June · September · December). Pick yours and the plan dates itself backwards.`
                    : `${paper ?? "Your paper"} is an on-demand computer exam — you can book any date at your local centre.`
                }
              >
                {sessionPaper ? (
                  <div style={{ display: "grid", gap: 10 }}>
                    {sittings.map((s) => {
                      const on = pickedSitting === s.date
                      return (
                        <button
                          key={s.date}
                          onClick={() => { setPickedSitting(s.date); setExamDate(s.date) }}
                          style={{ ...tile, display: "flex", alignItems: "center", gap: 14, padding: "15px 16px", borderColor: on ? C.brand : C.border, background: on ? C.brandSoft : C.card }}
                        >
                          <span style={{ width: 42, height: 42, borderRadius: 11, background: on ? C.brand : "var(--sch-card-2)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                            <Icon name="calendar" size={19} color={on ? "#fff" : C.soft} />
                          </span>
                          <span style={{ flex: 1, textAlign: "left" }}>
                            <span style={{ display: "block", fontWeight: 800, fontSize: 15, color: on ? C.brand : C.text }}>{s.label} sitting</span>
                            <span style={{ display: "block", fontSize: 12, color: C.soft }}>Exam week {s.week} · plan counts back from it</span>
                          </span>
                          {on && <Icon name="done" size={18} color={C.brand} />}
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    style={{ width: "100%", boxSizing: "border-box", padding: "14px 16px", borderRadius: 12, border: `1px solid ${C.border}`, background: "var(--sch-bg)", color: C.text, fontSize: 16, colorScheme: "light dark" }}
                  />
                )}
                <p style={{ fontSize: 12, color: C.faint, margin: "12px 0 0", lineHeight: 1.5 }}>
                  Not booked yet? Skip this — I'll pace you by mastery and you can set the date anytime in Settings.
                </p>
              </SlideFrame>
            )}

            {step === 4 && (
              <SlideFrame
                icon="diagnostic"
                kicker="Question 4 of 4"
                title="What are you here for?"
                sub="I coach differently for each of these — be honest, not ambitious."
              >
                <div style={{ display: "grid", gap: 10 }}>
                  {GOAL_OPTIONS.map((o) => {
                    const on = goal === o.value
                    return (
                      <button
                        key={o.value}
                        onClick={() => setGoalState(o.value)}
                        style={{ ...tile, display: "flex", alignItems: "center", gap: 13, padding: "14px 16px", borderColor: on ? C.brand : C.border, background: on ? C.brandSoft : C.card }}
                      >
                        <span style={{ width: 38, height: 38, borderRadius: 10, background: on ? C.brand : "var(--sch-card-2)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                          <Icon name={GOAL_ICON[o.value]} size={17} color={on ? "#fff" : C.soft} />
                        </span>
                        <span style={{ flex: 1, textAlign: "left" }}>
                          <span style={{ display: "block", fontWeight: 750, fontSize: 14.5, color: on ? C.brand : C.text }}>{o.label}</span>
                          <span style={{ display: "block", fontSize: 12, color: C.soft, marginTop: 1 }}>{o.blurb}</span>
                        </span>
                        {on && <Icon name="done" size={17} color={C.brand} />}
                      </button>
                    )
                  })}
                </div>
              </SlideFrame>
            )}

            {step === 5 && paper && (
              <ReadySlide
                paper={paper}
                minutes={minutes}
                studyTime={studyTime}
                examDate={examDate}
                sitting={sittings.find((s) => s.date === pickedSitting) ?? null}
                goal={goal}
                onDiagnostic={finishToDiagnostic}
                onSkip={finishSkip}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* bottom nav */}
      {step > 0 && step < TOTAL - 1 && (
        <div style={bottomBar}>
          <Button variant="ghost" onClick={() => go(-1)}>
            <Icon name="arrow" size={15} style={{ transform: "rotate(180deg)" }} /> Back
          </Button>
          <span style={{ fontSize: 11.5, color: C.faint }}>swipe or use ← →</span>
          <Button variant="primary" disabled={!canAdvance} onClick={() => go(1)}>
            Continue <Icon name="arrow" size={15} color="#fff" />
          </Button>
        </div>
      )}
    </div>
  )
}

const GOAL_ICON: Record<Goal, IconName> = {
  "first-pass": "done",
  recovery: "weak",
  level: "roadmap",
  career: "exam",
}

/* ── slides ──────────────────────────────────────────────────── */

function HeroSlide({ firstName, onNext }: { firstName: string | null; onNext: () => void }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -18 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
      >
        <ScholifyMark size={72} />
      </motion.div>
      <h1 style={{ fontSize: "clamp(26px, 5vw, 34px)", fontWeight: 800, color: C.text, margin: "0 0 12px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
        {firstName ? <>Welcome, {firstName}.</> : <>Welcome.</>}<br />
        Let's pass your <span style={iriText}>next paper</span>.
      </h1>
      <p style={{ color: C.soft, fontSize: 15.5, lineHeight: 1.65, margin: "0 0 24px" }}>
        Scholify is a GPS for ACCA: it measures where you are, hands you the next best task
        every day, and recalculates until you pass. Four questions, then a 10-minute diagnostic
        finds your starting <strong style={{ color: C.text }}>pass probability</strong>.
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, flexWrap: "wrap", marginBottom: 28 }}>
        {([["diagnostic", "Diagnostic"], ["mission", "Daily missions"], ["mock", "3 mocks"], ["celebrate", "Pass"]] as [IconName, string][]).map(([icon, label], i, arr) => (
          <motion.span key={label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.13 }} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 999, border: `1px solid ${C.border}`, background: C.card, fontSize: 12, fontWeight: 750, color: C.text }}>
              <Icon name={icon} size={13} color={C.brand} /> {label}
            </span>
            {i < arr.length - 1 && <Icon name="arrow" size={12} color={C.faint} />}
          </motion.span>
        ))}
      </div>
      <div style={{ maxWidth: 340, margin: "0 auto" }}>
        <Button variant="primary" size="lg" full onClick={onNext}>Start — it takes a minute</Button>
      </div>
    </div>
  )
}

function ReadySlide({
  paper, minutes, studyTime, examDate, sitting, goal, onDiagnostic, onSkip,
}: {
  paper: string
  minutes: number
  studyTime: string
  examDate: string
  sitting: Sitting | null
  goal: Goal | null
  onDiagnostic: () => void
  onSkip: () => void
}) {
  const goalLabel = GOAL_OPTIONS.find((g) => g.value === goal)?.label
  const rows: [IconName, string, string][] = [
    ["roadmap", "Paper", paper],
    ["time", "Daily", `${minutes} min at ${studyTime}`],
    ["calendar", "Exam", sitting ? `${sitting.label} sitting (${sitting.week})` : examDate || "Paced by mastery"],
    ...(goalLabel ? ([["diagnostic", "Goal", goalLabel]] as [IconName, string, string][]) : []),
  ]
  return (
    <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
        <ScholifyMark size={52} />
      </motion.div>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: C.text, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
        Your loop is set.
      </h2>
      <p style={{ color: C.soft, fontSize: 14.5, margin: "0 0 20px", lineHeight: 1.6 }}>
        One thing left: a <strong style={{ color: C.text }}>10-minute diagnostic</strong> sets your starting{" "}
        <strong style={iriText}>pass probability</strong> — the number your whole plan steers by.
      </p>
      <div style={{ display: "grid", gap: 8, marginBottom: 22, textAlign: "left" }}>
        {rows.map(([icon, k, v], i) => (
          <motion.div key={k} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.09 }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 15px", borderRadius: 13, border: `1px solid ${C.border}`, background: C.card }}>
            <Icon name={icon} size={16} color={C.brand} />
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase", color: C.faint, width: 52 }}>{k}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{v}</span>
          </motion.div>
        ))}
      </div>
      <div style={{ maxWidth: 380, margin: "0 auto" }}>
        <Button variant="primary" size="lg" full onClick={onDiagnostic}>
          Find my pass probability <Icon name="arrow" size={17} color="#fff" />
        </Button>
        <div style={{ marginTop: 8 }}>
          <Button variant="ghost" onClick={onSkip}>Skip for now — take me to my dashboard</Button>
        </div>
      </div>
    </div>
  )
}

/* ── chrome ──────────────────────────────────────────────────── */

function SlideFrame({ icon, kicker, title, sub, children }: { icon: IconName; kicker: string; title: string; sub: string; children: ReactNode }) {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ width: 30, height: 30, borderRadius: 9, background: C.brandSoft, display: "grid", placeItems: "center" }}>
          <Icon name={icon} size={15} color={C.brand} />
        </span>
        <span style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: C.brand }}>{kicker}</span>
      </div>
      <h2 style={{ fontSize: "clamp(22px, 4vw, 27px)", fontWeight: 800, color: C.text, margin: "0 0 8px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{title}</h2>
      <p style={{ color: C.soft, fontSize: 14, margin: "0 0 20px", lineHeight: 1.6 }}>{sub}</p>
      {children}
    </div>
  )
}

/** Soft branded backdrop — gradient wash + oversized ghost mark, per-step hue shift. */
function BackdropArt({ step }: { step: number }) {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
      <motion.div
        animate={{ opacity: 0.5 + (step % 2) * 0.15, x: step * -30 }}
        transition={{ duration: 0.8 }}
        style={{ position: "absolute", top: "-22%", right: "-14%", width: "58vmin", height: "58vmin", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,0,0,0.09), transparent 65%)" }}
      />
      <div style={{ position: "absolute", bottom: "-26%", left: "-12%", width: "52vmin", height: "52vmin", borderRadius: "50%", background: "radial-gradient(circle, rgba(244,164,5,0.08), transparent 65%)" }} />
      <motion.div
        animate={{ rotate: step * 12 }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
        style={{ position: "absolute", right: "-90px", bottom: "-90px", opacity: 0.05 }}
      >
        <ScholifyMark size={380} variant="ink" />
      </motion.div>
    </div>
  )
}

/* ── styles ──────────────────────────────────────────────────── */

const shell: CSSProperties = {
  position: "fixed",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  background: "var(--sch-bg)",
  overflow: "hidden",
}

const topBar: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  justifyContent: "space-between",
  padding: "18px 22px",
  position: "relative",
  zIndex: 2,
}

const slideBox: CSSProperties = {
  width: "100%",
  maxWidth: 640,
  padding: "0 22px",
  boxSizing: "border-box",
  maxHeight: "100%",
  overflowY: "auto",
}

const bottomBar: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "14px 22px calc(16px + env(safe-area-inset-bottom))",
  position: "relative",
  zIndex: 2,
}

const tile: CSSProperties = {
  border: `1.5px solid ${C.border}`,
  borderRadius: 13,
  padding: "12px 12px",
  background: C.card,
  cursor: "pointer",
  textAlign: "left",
  transition: "border-color .15s ease, background .15s ease",
}

const linkBtn: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  marginTop: 12,
  background: "none",
  border: "none",
  cursor: "pointer",
  color: C.brand,
  fontSize: 12.5,
  fontWeight: 750,
  padding: "4px 0",
}
