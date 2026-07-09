import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { useAuth } from "@/lib/auth"
import { Icon, type IconName } from "@/components/acca/ui"
import { ScholifyMark } from "@/components/brand"
import { paperLevels, setPassedPapers, setStudyingPapers } from "@/lib/acca-qualification"
import { setPlan } from "@/lib/acca-plan"
import { setDailyGoal } from "@/lib/acca"
import { GOAL_OPTIONS, setGoal, setExperience, isAccaOnboarded, markAccaOnboarded, type Goal } from "@/lib/acca-profile"

/*
 * /welcome — post-sign-in onboarding, implemented from the approved design
 * export ("Scholify post-sign-in onboarding", 2026-07-09).
 *
 *   0 hero → 1 target paper → 2 daily time → 3 exam date → 4 goal → 5 ready
 *   → /study/diagnostic?next=paywall → results → trial paywall → /dashboard
 *
 * Mobile (≤900px): single-column phone layout, photo hero on the welcome
 * screen, pinned CTA, mono counter "01 / 08" (the funnel is 8 steps —
 * diagnostic is 07, the trial paywall 08).
 * Desktop: 55/45 split-screen — question panel left, visual panel right
 * (photo or branded circuit illustration, crossfading per step).
 *
 * ACCA exam logic: BT·MA·FA·LW are on-demand CBEs (any date); all other
 * papers are session exams — Mar/Jun/Sep/Dec, exam week = first full
 * Mon–Fri week of the month.
 */

/* ── design tokens (from the design export) ──────────────────── */
const INK = "#14141A"
const BODY = "#5F584F"
const SUB = "#6B6259"
const META = "#7A7168"
const MUTE = "#8B837C"
const FAINT = "#A79E96"
const GHOST = "#B9B0A8"
const HINT = "#C3BAB2"
const RED = "#C80000"
const GREEN = "#0E9F6E"
const BORDER = "#ECE4DE"
const TRACK = "#EAE2DB"
const PAGE = "#FAFAF7"
const PANEL = "#F6F1ED"
const MONO = "'JetBrains Mono', ui-monospace, monospace"
const SANS = "'Plus Jakarta Sans', sans-serif"

const ON_DEMAND = new Set(["BT", "MA", "FA", "LW"])
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

interface Sitting {
  label: string // "September 2026"
  week: string // "7–11 Sep"
  date: string // nominal Wednesday of exam week
}

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
    const pad = (n: number) => `${n}`.padStart(2, "0")
    out.push({
      label: `${MONTHS[m]} ${year}`,
      week: `${firstMonday}–${firstMonday + 4} ${MONTHS[m].slice(0, 3)}`,
      date: `${year}-${pad(m + 1)}-${pad(firstMonday + 2)}`,
    })
    idx += 1
    if (idx >= SITTING_MONTHS.length) { idx = 0; year += 1 }
  }
  return out
}

const MINUTE_OPTIONS: { v: number; label: string; micro: string }[] = [
  { v: 15, label: "Focused", micro: "Small but daily beats big but rarely — the loop makes every minute count." },
  { v: 25, label: "Steady", micro: "The sweet spot most passers protect. We'll aim here." },
  { v: 40, label: "Committed", micro: "Strong pace — steady mastery every week." },
  { v: 60, label: "All in", micro: "Serious pace — mock-ready weeks early." },
]

const SLOT_OPTIONS: { label: string; time: string }[] = [
  { label: "Morning", time: "08:00" },
  { label: "Lunch", time: "13:00" },
  { label: "Evening", time: "19:00" },
  { label: "Night", time: "21:30" },
]

const GOAL_ICON: Record<Goal, IconName> = {
  "first-pass": "done",
  recovery: "loop",
  level: "roadmap",
  career: "study",
}

const TOTAL = 6

// The split-screen needs real width; below 1080 the phone layout reads better.
function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 1080px)").matches)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1080px)")
    const on = () => setMobile(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])
  return mobile
}

const PHOTOS = ["/onboarding/welcome-m.webp", "/onboarding/welcome-d.webp", "/onboarding/time-d.webp", "/onboarding/goal-d.webp"]

/* Directional slide variants — enter and exit run SIMULTANEOUSLY (no
   mode="wait" gap), so steps hand over in one continuous motion. */
const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 70 : -70 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -70 : 70 }),
}
const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
}

/* ── page ────────────────────────────────────────────────────── */

export default function Welcome() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const firstName = (user?.user_metadata?.full_name as string | undefined)?.split(" ")[0]
    || user?.email?.split("@")[0]
    || null

  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [passed, setPassed] = useState<Set<string>>(new Set())
  const [showPassed, setShowPassed] = useState(false)
  const [paper, setPaper] = useState<string | null>(null)
  const [minutes, setMinutes] = useState(25)
  const [slot, setSlot] = useState("19:00")
  const [examDate, setExamDate] = useState("")
  const [pickedSitting, setPickedSitting] = useState<string | null>(null)
  const [goal, setGoalState] = useState<Goal | null>(null)

  const levels = useMemo(() => paperLevels(), [])
  const sittings = useMemo(() => nextSittings(3), [])
  const sessionPaper = paper !== null && !ON_DEMAND.has(paper)

  useEffect(() => {
    if (isAccaOnboarded()) navigate("/dashboard", { replace: true })
    // Decode every photo up front so step changes never flash or stall.
    for (const src of PHOTOS) {
      const img = new Image()
      img.src = src
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const canAdvance = step === 1 ? paper !== null : step === 4 ? goal !== null : true

  function go(delta: number) {
    setDir(delta)
    setStep((s) => Math.min(TOTAL - 1, Math.max(0, s + delta)))
  }

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
    setPlan(paper, { examDate: examDate || null, studyTime: slot, dailyMinutes: minutes, dailyGoal: questionsPerDay })
    setDailyGoal(questionsPerDay)
    markAccaOnboarded()
  }

  const finishToDiagnostic = () => { persist(); navigate("/study/diagnostic?next=paywall") }
  const finishSkip = () => { persist(); navigate("/dashboard") }

  const slideAnim = {
    variants: reduced ? fadeVariants : slideVariants,
    initial: "enter" as const,
    animate: "center" as const,
    exit: "exit" as const,
    custom: dir,
  }

  /* shared slide bodies (question controls only — chrome differs per device) */
  const body: Record<number, ReactNode> = {
    1: (
      <PaperSlide
        levels={levels}
        paper={paper}
        setPaper={setPaper}
        passed={passed}
        setPassed={setPassed}
        showPassed={showPassed}
        setShowPassed={setShowPassed}
        isMobile={isMobile}
      />
    ),
    2: <TimeSlide minutes={minutes} setMinutes={setMinutes} slot={slot} setSlot={setSlot} />,
    3: (
      <SittingSlide
        sessionPaper={sessionPaper}
        paper={paper}
        sittings={sittings}
        pickedSitting={pickedSitting}
        onPick={(d) => { setPickedSitting(d); setExamDate(d) }}
        examDate={examDate}
        setExamDate={setExamDate}
      />
    ),
    4: <GoalSlide goal={goal} setGoal={setGoalState} />,
    5: (
      <ReadySlide
        paper={paper ?? ""}
        minutes={minutes}
        slot={slot}
        examDate={examDate}
        sitting={sittings.find((s) => s.date === pickedSitting) ?? null}
        goal={goal}
        onDiagnostic={finishToDiagnostic}
        onSkip={finishSkip}
        isMobile={isMobile}
      />
    ),
  }

  const KICKERS = ["A GPS for ACCA", "Step 1 · your target", "Protect your time", "Lock your date", "Your why", ""]
  // Step 3's question depends on the paper: session exams pick a sitting,
  // on-demand CBEs (BT·MA·FA·LW) pick any date.
  const TITLES = [
    "",
    "Which paper are we passing?",
    "How much time can you protect, daily?",
    sessionPaper ? "Which sitting are you taking?" : "When's your exam?",
    "What are you here for?",
    "Your loop is set.",
  ]
  const SUBS = [
    "",
    "Pick one to start. You can add more later.",
    "Honest beats ambitious. We build the plan around this.",
    sessionPaper
      ? "Your plan counts back from exam week."
      : `${paper ?? "Your paper"} is an on-demand computer exam — book any date at your local centre.`,
    "This shapes the tone I'll coach you in.",
    "",
  ]

  /* ═══ MOBILE ═══ */
  if (isMobile) {
    return (
      <div style={{ position: "fixed", inset: 0, background: PAGE, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: SANS }}>
        {step === 0 && (
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 264, overflow: "hidden", background: PANEL }}>
            <img src="/onboarding/welcome-m.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(20,20,26,.12) 0%, rgba(250,250,247,0) 34%, rgba(250,250,247,.65) 82%, ${PAGE} 100%)`, pointerEvents: "none" }} />
          </div>
        )}

        {/* header */}
        <div style={{ position: "relative", padding: "22px 24px 0", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <motion.div
              initial={reduced ? undefined : { opacity: 0, scale: 0.4, rotate: -25 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              style={{ display: "flex", alignItems: "center", gap: 9 }}
            >
              <ScholifyMark size={24} />
              <span style={{ font: `800 17px/1 ${SANS}`, letterSpacing: "-0.6px", color: INK }}>Scholify</span>
            </motion.div>
            <span style={{ font: `500 11px/1 ${MONO}`, color: GHOST }}>{`0${step + 1}`} / 08</span>
          </div>
          <div style={{ marginTop: 14, height: 4, borderRadius: 99, background: TRACK, overflow: "hidden" }}>
            <motion.div animate={{ width: `${((step + 1) / 8) * 100}%` }} transition={{ type: "spring", stiffness: 170, damping: 26 }} style={{ height: "100%", background: RED, borderRadius: 99 }} />
          </div>
        </div>

        {/* content */}
        <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
          <AnimatePresence custom={dir} initial={false}>
            <motion.div
              key={step}
              {...slideAnim}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              drag={reduced ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70 && canAdvance && step < TOTAL - 1) go(1)
                else if (info.offset.x > 70 && step > 0) go(-1)
              }}
              style={{ position: "absolute", inset: 0, overflowY: "auto", padding: step === 0 ? "284px 24px 12px" : "22px 24px 12px", display: "flex", flexDirection: "column" }}
            >
              {step === 0 ? (
                <>
                  <h1 style={{ margin: 0, font: `800 32px/1.06 ${SANS}`, letterSpacing: "-1px", color: INK }}>
                    Welcome{firstName ? `, ${firstName}` : ""}.<br />Let's pass your<br />next paper.
                  </h1>
                  <p style={{ margin: "16px 0 0", font: `400 15px/1.5 ${SANS}`, color: BODY, maxWidth: 300 }}>
                    A GPS for ACCA: it measures where you are, hands you the next task daily, and recalculates until you pass.
                  </p>
                  <WaypointChips style={{ marginTop: 24 }} />
                </>
              ) : (
                <>
                  {step === 5 ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 7, font: `600 11px/1 ${MONO}`, letterSpacing: "0.13em", textTransform: "uppercase", color: GREEN, marginBottom: 12 }}>
                      <Icon name="done" size={15} color={GREEN} /> Ready
                    </div>
                  ) : null}
                  <h2 style={{ margin: "0 0 5px", font: `800 ${step === 5 ? 29 : step === 1 ? 25 : 26}px/1.1 ${SANS}`, letterSpacing: "-0.7px", color: INK }}>{TITLES[step]}</h2>
                  {SUBS[step] && <p style={{ margin: "0 0 18px", font: `400 13px/1.45 ${SANS}`, color: SUB }}>{SUBS[step]}</p>}
                  {step === 5 && <div style={{ height: 10 }} />}
                  {body[step]}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* pinned footer */}
        <div style={{ padding: step === 5 ? "14px 24px 24px" : "12px 24px 24px", background: `linear-gradient(180deg, rgba(250,250,247,0), ${PAGE} 30%)`, position: "relative", zIndex: 2 }}>
          {step === 2 && (
            <div style={{ display: "flex", gap: 9, alignItems: "flex-start", marginBottom: 14, padding: "0 2px" }}>
              <span style={{ color: RED, fontSize: 15, lineHeight: 1.2 }}>“</span>
              <span style={{ font: `600 13px/1.4 ${SANS}`, color: "#3E3831" }}>The students who pass don't find time — they protect it.</span>
            </div>
          )}
          {step === 3 && (
            <div style={{ marginBottom: 12, font: `500 12px/1.4 ${SANS}`, color: MUTE, textAlign: "center" }}>Not booked yet? I'll pace you by mastery.</div>
          )}
          {step === 5 ? (
            <>
              <PrimaryBtn onClick={finishToDiagnostic} big>Find my pass probability</PrimaryBtn>
              <button onClick={finishSkip} style={{ width: "100%", marginTop: 10, padding: 15, borderRadius: 15, background: "transparent", color: MUTE, font: `700 14px/1 ${SANS}`, border: `1.5px solid ${BORDER}`, cursor: "pointer" }}>
                Skip for now
              </button>
            </>
          ) : (
            <>
              <PrimaryBtn onClick={() => (canAdvance ? go(1) : undefined)} big={step === 0} disabled={!canAdvance}>
                {step === 0 ? "Start — it takes a minute" : "Continue"}
              </PrimaryBtn>
              <div style={{ display: "flex", alignItems: "center", marginTop: 12, minHeight: 22, position: "relative" }}>
                {step > 0 && (
                  <button onClick={() => go(-1)} style={{ background: "none", border: "none", color: MUTE, font: `600 12px/1 ${SANS}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: "4px 6px 4px 0" }}>
                    <Icon name="arrow" size={13} color={MUTE} style={{ transform: "rotate(180deg)" }} /> Back
                  </button>
                )}
                <div style={{ position: "absolute", left: 0, right: 0, textAlign: "center", font: `500 10px/1 ${MONO}`, letterSpacing: "0.2em", color: HINT, textTransform: "uppercase", pointerEvents: "none" }}>
                  swipe →
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  /* ═══ DESKTOP · 55/45 split ═══ */
  return (
    <div style={{ position: "fixed", inset: 0, background: PAGE, display: "flex", overflow: "hidden", fontFamily: SANS }}>
      {/* left — question panel */}
      <div style={{ width: "55%", flex: "none", display: "flex", flexDirection: "column", padding: "40px clamp(32px, 4vw, 60px) 54px", position: "relative", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <ScholifyMark size={30} />
          <span style={{ font: `800 21px/1 ${SANS}`, letterSpacing: "-0.6px", color: INK }}>Scholify</span>
        </div>
        <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ font: `600 12px/1 ${MONO}`, color: MUTE, letterSpacing: "0.05em" }}>{step + 1} / {TOTAL}</span>
          <div style={{ flex: 1, maxWidth: 340, height: 5, borderRadius: 99, background: TRACK, overflow: "hidden" }}>
            <motion.div animate={{ width: `${((step + 1) / TOTAL) * 100}%` }} transition={{ type: "spring", stiffness: 170, damping: 26 }} style={{ height: "100%", background: RED, borderRadius: 99 }} />
          </div>
        </div>

        <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
          <AnimatePresence custom={dir} initial={false}>
            <motion.div
              key={step}
              {...slideAnim}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 620, overflowY: "auto", paddingRight: 8 }}
            >
              {step === 0 ? (
                <div>
                  <div style={kicker}>A GPS for ACCA</div>
                  <h1 style={{ margin: 0, font: `800 clamp(32px, 3vw, 43px)/1.05 ${SANS}`, letterSpacing: "-1.4px", color: INK }}>
                    Welcome{firstName ? `, ${firstName}` : ""}. Let's pass your next paper.
                  </h1>
                  <p style={{ margin: "20px 0 0", font: `400 18px/1.5 ${SANS}`, color: BODY, maxWidth: 460 }}>
                    It measures where you are, hands you the next task daily, and recalculates until you pass.
                  </p>
                  <WaypointChips style={{ marginTop: 30 }} big />
                </div>
              ) : (
                <div>
                  {step === 5 ? (
                    <div style={{ ...kicker, color: GREEN, display: "flex", alignItems: "center", gap: 7 }}>
                      <Icon name="done" size={14} color={GREEN} /> Ready
                    </div>
                  ) : (
                    <div style={kicker}>{KICKERS[step]}</div>
                  )}
                  <h1 style={{ margin: 0, font: `800 clamp(30px, ${step === 5 ? "3vw" : step === 1 ? "2.6vw" : "2.8vw"}, ${step === 5 ? 43 : step === 1 ? 38 : 40}px)/1.05 ${SANS}`, letterSpacing: "-1.6px", color: INK, marginBottom: step === 5 ? 24 : 0 }}>
                    {TITLES[step]}
                  </h1>
                  {SUBS[step] && <p style={{ margin: "12px 0 0", font: `400 15px/1.5 ${SANS}`, color: SUB }}>{SUBS[step]}</p>}
                  <div style={{ marginTop: 26 }}>{body[step]}</div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* footer buttons */}
        {step < 5 && (
          <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => go(-1)}
              disabled={step === 0}
              style={{ padding: "15px 22px", borderRadius: 14, background: "transparent", border: `1.5px solid ${BORDER}`, color: step === 0 ? "#CFC7BF" : MUTE, font: `700 14px/1 ${SANS}`, cursor: step === 0 ? "default" : "pointer", display: "flex", alignItems: "center", gap: 8 }}
            >
              <Icon name="arrow" size={16} color={step === 0 ? "#CFC7BF" : MUTE} style={{ transform: "rotate(180deg)" }} /> Back
            </button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => (canAdvance ? go(1) : undefined)}
              disabled={!canAdvance}
              style={{ padding: "16px 30px", borderRadius: 14, background: RED, border: "none", color: "#fff", font: `800 15px/1 ${SANS}`, cursor: canAdvance ? "pointer" : "default", opacity: canAdvance ? 1 : 0.45, boxShadow: "0 12px 24px -12px rgba(200,0,0,.5)", display: "flex", alignItems: "center", gap: 9 }}
            >
              {step === 0 ? "Start — it takes a minute" : "Continue"} <Icon name="arrow" size={17} color="#fff" />
            </motion.button>
          </div>
        )}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 22, textAlign: "center", font: `500 10px/1 ${MONO}`, letterSpacing: "0.2em", textTransform: "uppercase", color: HINT, pointerEvents: "none" }}>
          ← → or swipe
        </div>
      </div>

      {/* right — visual panel */}
      <div style={{ width: "45%", flex: "none", position: "relative", overflow: "hidden" }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={step}
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", inset: 0 }}
          >
            <VisualPanel step={step} paper={paper} sitting={sittings.find((s) => s.date === pickedSitting) ?? null} sittings={sittings} levels={levels} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

const kicker: CSSProperties = {
  font: `600 11px/1 ${MONO}`,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: RED,
  marginBottom: 16,
}

/* ── shared slide bodies ─────────────────────────────────────── */

function WaypointChips({ style, big }: { style?: CSSProperties; big?: boolean }) {
  const chip = (label: string, filled = false): CSSProperties => ({
    padding: big ? "9px 14px" : "8px 12px",
    borderRadius: 99,
    background: filled ? RED : "#fff",
    border: `1px solid ${filled ? RED : BORDER}`,
    font: `${filled ? 700 : 600} ${big ? 13 : 12}px/1 ${SANS}`,
    color: filled ? "#fff" : INK,
  })
  return (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: big ? 9 : 7, ...style }}>
      {["Diagnostic", "Daily missions", "3 mocks"].map((l, i) => (
        <motion.span key={l} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.12 }} style={{ display: "inline-flex", alignItems: "center", gap: big ? 9 : 7 }}>
          <span style={chip(l)}>{l}</span>
          <span style={{ color: "#C9C0B8", fontSize: 12 }}>→</span>
        </motion.span>
      ))}
      <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.61 }} style={chip("Pass", true)}>Pass</motion.span>
    </div>
  )
}

function tileStyle(on: boolean): CSSProperties {
  return {
    textAlign: "left",
    borderRadius: 14,
    transition: "all .18s",
    cursor: "pointer",
    border: `1.5px solid ${on ? RED : BORDER}`,
    background: on ? "rgba(200,0,0,.05)" : "#fff",
    boxShadow: on ? "0 0 0 3px rgba(200,0,0,.07)" : "none",
  }
}

function PaperSlide({
  levels, paper, setPaper, passed, setPassed, showPassed, setShowPassed, isMobile,
}: {
  levels: ReturnType<typeof paperLevels>
  paper: string | null
  setPaper: (p: string | null) => void
  passed: Set<string>
  setPassed: (fn: (prev: Set<string>) => Set<string>) => void
  showPassed: boolean
  setShowPassed: (fn: (v: boolean) => boolean) => void
  isMobile: boolean
}) {
  return (
    <div>
      <div style={{ display: isMobile ? "block" : "flex", gap: 18 }}>
        {levels.map((g) => (
          <div key={g.key} style={{ flex: 1, marginBottom: isMobile ? 18 : 0 }}>
            <div style={{ font: `600 10px/1 ${MONO}`, letterSpacing: "0.12em", textTransform: "uppercase", color: FAINT, marginBottom: 9 }}>{g.label}</div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr", gap: 8 }}>
              {g.papers.map((p) => {
                const on = paper === p.id
                const done = passed.has(p.id)
                return (
                  <button
                    key={p.id}
                    onClick={() => !done && setPaper(p.id)}
                    disabled={done}
                    style={{ ...tileStyle(on), padding: isMobile ? "12px 12px" : "10px 12px", opacity: done ? 0.5 : 1, cursor: done ? "default" : "pointer" }}
                  >
                    <div style={{ font: `700 ${isMobile ? 13 : 12}px/1 ${MONO}`, color: RED, marginBottom: 5 }}>{p.id}</div>
                    <div style={{ font: `600 ${isMobile ? 11.5 : 11}px/1.25 ${SANS}`, color: INK }}>{done ? "Passed ✓" : p.name}</div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowPassed((v) => !v)}
        style={{ display: "inline-block", marginTop: isMobile ? 4 : 20, font: `600 ${isMobile ? 12 : 13}px/1 ${SANS}`, color: MUTE, textDecoration: "underline", textUnderlineOffset: 3, background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        {showPassed ? "Done marking passed papers" : "I've already passed some papers"}
      </button>
      {showPassed && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
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
                style={{ padding: "6px 11px", borderRadius: 99, border: `1.5px solid ${on ? RED : BORDER}`, background: on ? "rgba(200,0,0,.05)" : "#fff", color: on ? RED : INK, font: `700 12px/1 ${MONO}`, cursor: "pointer" }}
              >
                {p.id}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function TimeSlide({ minutes, setMinutes, slot, setSlot }: { minutes: number; setMinutes: (n: number) => void; slot: string; setSlot: (s: string) => void }) {
  const micro = MINUTE_OPTIONS.find((m) => m.v === minutes)?.micro ?? ""
  return (
    <div style={{ maxWidth: 440 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
        {MINUTE_OPTIONS.map((m) => {
          const on = minutes === m.v
          return (
            <button key={m.v} onClick={() => setMinutes(m.v)} style={{ ...tileStyle(on), padding: "20px 18px" }}>
              <div style={{ font: `800 34px/1 ${SANS}`, letterSpacing: "-1px", color: INK }}>
                {m.v}
                <span style={{ font: `600 13px/1 ${MONO}`, color: FAINT }}> min</span>
              </div>
              <div style={{ marginTop: 8, font: `600 12px/1 ${SANS}`, color: RED }}>{m.label}</div>
            </button>
          )
        })}
      </div>
      <div style={{ marginTop: 14, padding: "14px 16px", borderRadius: 14, background: "rgba(200,0,0,.05)", border: "1px solid rgba(200,0,0,.14)", font: `500 13px/1.45 ${SANS}`, color: "#8A2222" }}>
        {micro}
      </div>
      <div style={{ marginTop: 22, font: `600 10px/1 ${MONO}`, letterSpacing: "0.14em", textTransform: "uppercase", color: FAINT, marginBottom: 10 }}>My daily slot</div>
      <div style={{ display: "flex", gap: 8 }}>
        {SLOT_OPTIONS.map((s) => {
          const on = slot === s.time
          return (
            <button
              key={s.time}
              onClick={() => setSlot(s.time)}
              style={{ flex: 1, padding: "12px 6px", borderRadius: 12, font: `600 12px/1.2 ${SANS}`, cursor: "pointer", transition: "all .18s", border: `1.5px solid ${on ? RED : BORDER}`, background: on ? "rgba(200,0,0,.05)" : "#fff", color: on ? RED : INK }}
            >
              {s.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SittingSlide({
  sessionPaper, paper, sittings, pickedSitting, onPick, examDate, setExamDate,
}: {
  sessionPaper: boolean
  paper: string | null
  sittings: Sitting[]
  pickedSitting: string | null
  onPick: (date: string) => void
  examDate: string
  setExamDate: (d: string) => void
}) {
  return (
    <div style={{ maxWidth: 480 }}>
      {sessionPaper ? (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {sittings.map((s) => {
              const on = pickedSitting === s.date
              return (
                <button key={s.date} onClick={() => onPick(s.date)} style={{ ...tileStyle(on), display: "flex", gap: 14, alignItems: "center", padding: "16px 18px" }}>
                  <span style={{ flex: "none", width: 44, height: 44, borderRadius: 12, background: "rgba(200,0,0,.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="calendar" size={20} color={RED} />
                  </span>
                  <span>
                    <span style={{ display: "block", font: `700 15px/1.15 ${SANS}`, color: INK }}>{s.label} sitting</span>
                    <span style={{ display: "block", marginTop: 3, font: `500 12px/1.35 ${SANS}`, color: META }}>Exam week {s.week} · plan counts back from it</span>
                  </span>
                </button>
              )
            })}
          </div>
        </>
      ) : (
        <div style={{ padding: "15px 16px", borderRadius: 16, border: "1.5px dashed #E1D8D0", background: "#fff" }}>
          <div style={{ font: `600 10px/1 ${MONO}`, letterSpacing: "0.13em", textTransform: "uppercase", color: FAINT, marginBottom: 9 }}>
            {paper ?? "Your paper"} · on-demand computer exam
          </div>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 11, border: `1px solid ${BORDER}`, background: PAGE, color: INK, font: `600 14px/1 ${SANS}`, colorScheme: "light" }}
          />
          <div style={{ marginTop: 8, font: `500 12px/1.35 ${SANS}`, color: META }}>Book any date at your local centre.</div>
        </div>
      )}
    </div>
  )
}

function GoalSlide({ goal, setGoal: set }: { goal: Goal | null; setGoal: (g: Goal) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 11, maxWidth: 500 }}>
      {GOAL_OPTIONS.map((o) => {
        const on = goal === o.value
        return (
          <button key={o.value} onClick={() => set(o.value)} style={{ ...tileStyle(on), display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 18px" }}>
            <span style={{ flex: "none", width: 42, height: 42, borderRadius: 12, background: on ? RED : "rgba(200,0,0,.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .18s" }}>
              <Icon name={GOAL_ICON[o.value]} size={18} color={on ? "#fff" : RED} />
            </span>
            <span>
              <span style={{ display: "block", font: `700 15px/1.15 ${SANS}`, color: INK }}>{o.label}</span>
              <span style={{ display: "block", marginTop: 3, font: `500 12px/1.4 ${SANS}`, color: on ? "#8A2222" : META }}>{o.blurb}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

function ReadySlide({
  paper, minutes, slot, examDate, sitting, goal, onDiagnostic, onSkip, isMobile,
}: {
  paper: string
  minutes: number
  slot: string
  examDate: string
  sitting: Sitting | null
  goal: Goal | null
  onDiagnostic: () => void
  onSkip: () => void
  isMobile: boolean
}) {
  const slotLabel = SLOT_OPTIONS.find((s) => s.time === slot)?.label ?? slot
  const goalLabel = GOAL_OPTIONS.find((g) => g.value === goal)?.label
  const rows: [string, string][] = [
    ["Paper", paper],
    ["Daily", `${minutes} min · ${slotLabel}`],
    ["Exam", sitting ? `${sitting.label} (wk ${sitting.week})` : examDate || "Paced by mastery"],
    ...(goalLabel ? ([["Goal", goalLabel]] as [string, string][]) : []),
  ]
  return (
    <div style={{ maxWidth: 500 }}>
      <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 18, overflow: "hidden", boxShadow: "0 12px 30px -22px rgba(20,20,26,.4)" }}>
        {rows.map(([k, v], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + i * 0.08 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "16px 18px" : "18px 22px", borderTop: i > 0 ? `1px solid ${BORDER}` : "none" }}
          >
            <span style={{ font: `600 12px/1 ${MONO}`, letterSpacing: "0.06em", textTransform: "uppercase", color: FAINT }}>{k}</span>
            <span style={{ font: `700 ${isMobile ? 14 : 15}px/1.2 ${SANS}`, color: INK, textAlign: "right" }}>{v}</span>
          </motion.div>
        ))}
      </div>
      <div style={{ marginTop: 18, display: "flex", gap: 12, padding: "16px 18px", borderRadius: 16, background: "rgba(244,164,5,.09)", border: "1px solid rgba(244,164,5,.28)" }}>
        <Icon name="time" size={18} color="#B37503" style={{ marginTop: 1 }} />
        <span style={{ font: `500 13px/1.45 ${SANS}`, color: "#6B4E12" }}>
          A 10-minute diagnostic sets your starting <b style={{ fontWeight: 700, color: "#4E3A0D" }}>pass probability</b> — the number your plan steers by.
        </span>
      </div>
      {!isMobile && (
        <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
          <motion.button whileTap={{ scale: 0.98 }} onClick={onDiagnostic} style={{ padding: "17px 32px", borderRadius: 14, background: RED, border: "none", color: "#fff", font: `800 16px/1 ${SANS}`, cursor: "pointer", boxShadow: "0 14px 28px -12px rgba(200,0,0,.55)" }}>
            Find my pass probability
          </motion.button>
          <button onClick={onSkip} style={{ padding: "17px 28px", borderRadius: 14, background: "transparent", border: `1.5px solid ${BORDER}`, color: MUTE, font: `700 15px/1 ${SANS}`, cursor: "pointer" }}>
            Skip for now
          </button>
        </div>
      )}
    </div>
  )
}

function PrimaryBtn({ children, onClick, big, disabled }: { children: ReactNode; onClick: () => void; big?: boolean; disabled?: boolean }) {
  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%",
        padding: big ? 17 : 16, borderRadius: 15, background: RED, color: "#fff",
        font: `800 ${big ? 16 : 15}px/1 ${SANS}`, border: "none", cursor: disabled ? "default" : "pointer",
        letterSpacing: "-0.2px", opacity: disabled ? 0.45 : 1,
        boxShadow: disabled ? "none" : "0 12px 24px -10px rgba(200,0,0,.5)",
      }}
    >
      {children}
    </motion.button>
  )
}

/* ── desktop right visual panels ─────────────────────────────── */

function IllusBase({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 90% at 78% 16%, rgba(200,0,0,.10), transparent 58%), radial-gradient(100% 80% at 12% 92%, rgba(244,164,5,.13), transparent 55%), ${PANEL}` }} />
      <div style={{ position: "absolute", right: -80, top: -60, opacity: 0.05, pointerEvents: "none" }}>
        <ScholifyMark size={400} variant="ink" />
      </div>
      {children}
    </div>
  )
}

function VisualPanel({
  step, paper, sitting, sittings, levels,
}: {
  step: number
  paper: string | null
  sitting: Sitting | null
  sittings: Sitting[]
  levels: ReturnType<typeof paperLevels>
}) {
  /* 0 · welcome photo + brand chip */
  if (step === 0) {
    return (
      <div style={{ position: "absolute", inset: 0, background: PANEL }}>
        <img src="/onboarding/welcome-d.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", left: 28, bottom: 28, display: "flex", alignItems: "center", gap: 13, padding: "12px 18px 12px 12px", borderRadius: 16, background: RED, boxShadow: "0 18px 44px -16px rgba(200,0,0,.7)" }}>
          <div style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(255,255,255,.16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ScholifyMark size={27} variant="white" />
          </div>
          <div>
            <div style={{ font: `800 14px/1 ${SANS}`, color: "#fff" }}>Scholify</div>
            <div style={{ font: `500 11px/1.3 ${MONO}`, color: "rgba(255,255,255,.78)", marginTop: 4 }}>measure · task · recalculate</div>
          </div>
        </div>
      </div>
    )
  }

  /* 1 · the ACCA paper path */
  if (step === 1) {
    const all = levels.flatMap((g) => g.papers.map((p) => p.id))
    return (
      <IllusBase>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "56px 0" }}>
          <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", maxHeight: 640 }}>
            <div style={{ position: "absolute", top: 6, bottom: 6, width: 2, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(#E7CFC9,#EBD9A9)" }} />
            {all.map((code) => {
              const on = paper === code
              return (
                <div
                  key={code}
                  style={{
                    position: "relative", padding: "6px 13px", borderRadius: 99, font: `600 12px/1 ${MONO}`, transition: "all .2s",
                    background: on ? RED : "#fff", color: on ? "#fff" : "#9A8F86",
                    border: `1px solid ${on ? RED : BORDER}`,
                    boxShadow: on ? "0 10px 24px -10px rgba(200,0,0,.6)" : "none",
                    transform: on ? "scale(1.22)" : "none",
                  }}
                >
                  {code}
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: 22, font: `500 12px/1 ${MONO}`, color: "#9A8F86", letterSpacing: "0.04em" }}>
            {paper ? `Your route runs through ${paper}.` : "BT → AAA · one loop at a time"}
          </div>
        </div>
      </IllusBase>
    )
  }

  /* 2 · time photo + caption chip */
  if (step === 2) {
    return (
      <div style={{ position: "absolute", inset: 0, background: PANEL }}>
        <img src="/onboarding/time-d.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", left: 28, bottom: 28, display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", borderRadius: 14, background: "rgba(20,20,26,.72)", backdropFilter: "blur(6px)" }}>
          <Icon name="time" size={16} color="#F4A405" />
          <span style={{ font: `600 13px/1.3 ${SANS}`, color: "#fff" }}>Small but daily beats big but rarely.</span>
        </div>
      </div>
    )
  }

  /* 3 · sitting calendar */
  if (step === 3) {
    const year = (sitting ?? sittings[0])?.label.split(" ")[1] ?? `${new Date().getFullYear()}`
    const monthsRow = ["Mar", "Jun", "Sep", "Dec"]
    const activeMonth = (sitting ?? sittings[0])?.label.slice(0, 3)
    return (
      <IllusBase>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ font: `600 11px/1 ${MONO}`, letterSpacing: "0.14em", textTransform: "uppercase", color: FAINT, marginBottom: 44 }}>
            ACCA sitting calendar · {year}
          </div>
          <div style={{ position: "relative", width: "78%", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ position: "absolute", top: 15, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#E7CFC9,#EBD9A9)" }} />
            {monthsRow.map((m) => {
              const on = m === activeMonth
              return (
                <div key={m} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                  {on && sitting && (
                    <div style={{ position: "absolute", top: -34, font: `700 10px/1 ${MONO}`, color: RED, whiteSpace: "nowrap" }}>
                      EXAM WEEK {sitting.week.toUpperCase()}
                    </div>
                  )}
                  <div style={{ borderRadius: "50%", transition: "all .2s", width: on ? 30 : 14, height: on ? 30 : 14, background: on ? RED : "#fff", border: `2px solid ${on ? RED : "#DED2C8"}`, boxShadow: on ? "0 12px 26px -10px rgba(200,0,0,.6)" : "none", marginTop: on ? 0 : 8 }} />
                  <div style={{ font: `600 14px/1 ${SANS}`, color: on ? INK : "#B4A99F", fontWeight: on ? 800 : 600 }}>{m}</div>
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: 46, font: `500 12px/1.4 ${SANS}`, color: "#9A8F86", maxWidth: 300, textAlign: "center" }}>
            Your plan counts back from exam week — every mission dated to the day.
          </div>
        </div>
      </IllusBase>
    )
  }

  /* 4 · goal photo */
  if (step === 4) {
    return (
      <div style={{ position: "absolute", inset: 0, background: PANEL }}>
        <img src="/onboarding/goal-d.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    )
  }

  /* 5 · the loop */
  const orbit: { label: string; icon: IconName; left: number; top: number }[] = [
    { label: "Diagnose", icon: "diagnostic", left: 210, top: 40 },
    { label: "Learn", icon: "learn", left: 371, top: 157 },
    { label: "Practise", icon: "practice", left: 310, top: 347 },
    { label: "Mock", icon: "check", left: 110, top: 347 },
    { label: "Exam", icon: "study", left: 49, top: 157 },
  ]
  return (
    <IllusBase>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 420, height: 420 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", inset: 34, borderRadius: "50%", border: "2px dashed #E0C9C3" }}
          />
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 118, height: 118, borderRadius: "50%", background: "#fff", border: `1px solid ${BORDER}`, boxShadow: "0 16px 40px -18px rgba(200,0,0,.5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <ScholifyMark size={34} />
            <span style={{ font: `800 18px/1 ${MONO}`, color: RED, letterSpacing: "0.02em" }}>{paper ?? "FR"}</span>
          </div>
          {orbit.map((o, i) => (
            <motion.div
              key={o.label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              style={{ position: "absolute", left: o.left, top: o.top, transform: "translate(-50%,-50%)", display: "flex", alignItems: "center", gap: 8, padding: "9px 14px 9px 10px", borderRadius: 99, background: "#fff", border: `1px solid ${BORDER}`, boxShadow: "0 10px 24px -14px rgba(20,20,26,.5)" }}
            >
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(200,0,0,.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={o.icon} size={15} color={RED} />
              </span>
              <span style={{ font: `700 12px/1 ${SANS}`, color: INK }}>{o.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </IllusBase>
  )
}
