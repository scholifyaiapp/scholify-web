import { useEffect, useMemo, useState, type ReactNode } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { Icon, C, type IconName } from "@/components/acca/ui"
import { type RevealPhase } from "@/components/acca/CinematicReveal"
import PlanBuildLoader from "@/components/acca/PlanBuildLoader"
import ExamDateReveal from "@/components/acca/ExamDateReveal"
import { PlanDashboard } from "@/components/acca/PlanDashboard"
import PaywallModal from "@/components/PaywallModal"
import { usePaperContent } from "@/hooks/usePaperContent"
import { trackEvent } from "@/lib/analytics"
import { getPaper } from "@/lib/acca"
import { getPlan, daysUntilExam } from "@/lib/acca-plan"
import { MOCK_GATE } from "@/lib/acca-loop"
import { TRIAL_DAYS } from "@/lib/entitlement"

/*
 * ZeroPlanReveal — the plan-generation moment for the learner who chose
 * "Start learning" (StartMode zero) at onboarding.
 *
 * The assess path gets a reveal after its diagnostic; the zero-start learner
 * used to be dropped straight onto the dashboard with no ceremony at all —
 * their plan silently existed and the app "started without anything". This is
 * their moment, in three beats:
 *
 *   1. BUILDING  Charles visibly builds the plan from their onboarding answers
 *                (paper, minutes, slot, target, exam date). The wait is REAL:
 *                the paper's content chunk is downloading behind it, and the
 *                sequence will not hand over until both the choreography has
 *                played AND the content has landed. So the loader is honest —
 *                it is not a timer pretending to be work.
 *   2. PLAN      The concrete day-by-day (PlanDashboard) — what they actually
 *                get, before anything is asked of them.
 *   3. COMMIT    The emotional close, then the paywall. Deliberately a separate
 *                beat rather than a modal that ambushes the "Start day 1"
 *                button: the learner sees their own numbers before checkout.
 */

/*
 * "date" sits between the build and the plan on purpose. Charles computes a
 * recommended sitting and a target from the learner's answers and both were
 * written straight into localStorage without ever being said out loud — the
 * most committing fact in the product arriving as a saved field. It gets its
 * own beat now, and only when there is a real date to announce.
 */
type Stage = "building" | "date" | "plan" | "commit"

export default function ZeroPlanReveal({ paperId }: { paperId: string }) {
  const paper = getPaper(paperId)
  const plan = getPlan(paperId)
  const days = daysUntilExam(paperId)
  const reduced = useReducedMotion()
  const [stage, setStage] = useState<Stage>("building")
  const [showPaywall, setShowPaywall] = useState(false)

  /*
   * The real work behind the loader. Kicking the paper's content chunk off here
   * means the choreography and the download overlap, so the learner waits once
   * instead of twice — and PlanDashboard's projectPlan() reads a loaded paper
   * rather than falling back to a synthesised week.
   */
  const content = usePaperContent(paperId)
  const [choreographyDone, setChoreographyDone] = useState(false)
  /*
   * Hard ceiling on the wait. `error` covers a rejected import, but a request
   * that simply hangs (captive portal, dead 3G) never resolves OR rejects — and
   * this is a full-screen takeover, so the learner would have no way out of the
   * loader at all. After this we go on without the chunk: PlanDashboard falls
   * back to the syllabus-derived week, which is still a real plan.
   */
  // Comfortably past the ring's ten seconds, so a slow connection gets its
  // honest "Loading your material…" line for a few seconds before we go on
  // without the chunk. At 9000 the ceiling expired before the loader even
  // finished, so that message could never appear.
  const CONTENT_WAIT_CEILING_MS = 14_000
  const [waitedLongEnough, setWaitedLongEnough] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setWaitedLongEnough(true), CONTENT_WAIT_CEILING_MS)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!choreographyDone || !(content.ready || content.error || waitedLongEnough)) return
    // Announce the date only when there IS one. A learner with no sitting yet
    // gets the plan directly rather than a ceremony around an empty field.
    setStage(plan.examDate && days !== null && days > 0 ? "date" : "plan")
  }, [choreographyDone, content.ready, content.error, waitedLongEnough, plan.examDate, days])

  const foundations = (paper?.areas ?? []).slice(0, 3)
  const firstArea = foundations[0]

  const phases = useMemo<RevealPhase[]>(
    () => [
      { icon: "study", label: "Reading your profile", sub: `Brand new to ${paperId} — so we teach first, test later.` },
      { icon: "roadmap", label: `Weighting the ${paperId} syllabus`, sub: `${paper?.areas.length ?? "Every"} areas, in the order examiners build them.` },
      { icon: "mission", label: "Sizing your daily block", sub: `${plan.dailyGoal} questions in ${plan.dailyMinutes} min${plan.studyTime ? ` at ${plan.studyTime}` : ""}` },
      days !== null && days > 0
        ? { icon: "calendar", label: "Counting back from exam day", sub: `${days} days to your sitting — every one has a job.` }
        : { icon: "calendar", label: "Pacing by mastery", sub: "No date yet — the plan advances as you prove each area." },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  /*
   * The commitment numbers. Every one is derived from what they actually chose,
   * so nothing here is a stock figure: sessions come from their exam date and
   * days-per-week, questions and hours from their own daily block.
   */
  const scale = useMemo(() => {
    if (days === null || days <= 0) return null
    const perWeek = plan.daysPerWeek || 6
    const sessions = Math.max(1, Math.round((days * perWeek) / 7))
    return {
      sessions,
      questions: sessions * (plan.dailyGoal || 15),
      hours: Math.max(1, Math.round((sessions * (plan.dailyMinutes || 25)) / 60)),
    }
  }, [days, plan.daysPerWeek, plan.dailyGoal, plan.dailyMinutes])

  useEffect(() => {
    if (stage === "commit") trackEvent("plan_commit_shown", { paper: paperId, days, hasDate: days !== null })
  }, [stage, paperId, days])

  if (!paper) return null

  const dailyBlock: { icon: IconName; label: string }[] = [
    { icon: "learn", label: "Study brief" },
    { icon: "practice", label: `Practise ×${plan.dailyGoal}` },
    { icon: "flashcards", label: "Flashcards" },
  ]

  const road = [
    `Learn ${foundations.map((a) => a.code).join("·")}`,
    "Diagnostic unlocks",
    "Daily missions",
    `${MOCK_GATE}% unlocks mocks`,
    "Mock 1·2·3",
    `${plan.targetProb}% → exam day`,
  ]

  return (
    <div style={{ position: "fixed", inset: 0, background: "var(--sch-bg, #FAFAF7)", overflowY: "auto", overflowX: "hidden", zIndex: 50, fontFamily: "var(--sch-font)" }}>
      <AnimatePresence mode="wait">
        {stage === "building" ? (
          <motion.div
            key="building"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          >
            <div style={{ width: "100%", maxWidth: 420 }}>
              {/*
                Ten seconds, on a ring, counting 0 → 100.
                The previous choreography was four phases at 950ms and was over
                in under four — a plan that appears that fast reads as a
                template with your name typed into it, and this one is not.
                The paper's content chunk downloads behind it, so the time is
                real work rather than a stall with a spinner over it.
              */}
              <PlanBuildLoader phases={phases} accent={C.brand} totalMs={10_000} onComplete={() => setChoreographyDone(true)} />
              {/* Only shown if the content download is the thing still running —
                  i.e. the learner is on a slow connection and the choreography
                  finished first. Never a fake message. */}
              {choreographyDone && !content.ready && !content.error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{ marginTop: 18, textAlign: "center", fontSize: 12.5, color: C.faint }}
                >
                  Loading your {paperId} material…
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : stage === "date" ? (
          <motion.div
            key="date"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.4 }}
          >
            <ExamDateReveal
              examDate={plan.examDate ?? ""}
              target={plan.targetProb}
              daysAway={days}
              paperCode={paper.code ?? paperId}
              onContinue={() => setStage("plan")}
            />
          </motion.div>
        ) : stage === "plan" ? (
          <motion.div
            key="plan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            style={{ maxWidth: 560, margin: "0 auto", padding: "40px 22px 48px" }}
          >
            {/* headline */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.2, color: C.brand, marginBottom: 10 }}>
                CHARLES BUILT THIS FROM YOUR ANSWERS
              </div>
              <h1 style={{ fontSize: "clamp(25px, 6vw, 30px)", fontWeight: 850, letterSpacing: "-0.8px", color: C.text, margin: "0 0 8px", lineHeight: 1.15 }}>
                Your {paperId} <span style={iriText}>plan is ready.</span>
              </h1>
              <p style={{ fontSize: 14.5, color: C.soft, lineHeight: 1.55, margin: "0 0 22px" }}>
                You're new to {paper.name} — so the plan teaches first and tests later. Once you've covered the
                foundations, your diagnostic unlocks and every number below recalibrates on real evidence.
              </p>
            </motion.div>

            {/* the daily block */}
            <Reveal delay={0.15}>
              <SectionTag>YOUR DAILY BLOCK · {plan.dailyMinutes} MIN{plan.studyTime ? ` AT ${plan.studyTime}` : ""}</SectionTag>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 22 }}>
                {dailyBlock.map((b, i) => (
                  <motion.span
                    key={b.label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + i * 0.12, type: "spring", stiffness: 320, damping: 22 }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 14px", borderRadius: 999,
                      border: `1px solid ${C.border}`, background: "var(--sch-card, #fff)", fontSize: 13, fontWeight: 700, color: C.text,
                    }}
                  >
                    <Icon name={b.icon} size={14} color={C.brand} /> {b.label}
                    {i < dailyBlock.length - 1 && <Icon name="chevron" size={13} color={C.faint} style={{ marginLeft: 2, marginRight: -6 }} />}
                  </motion.span>
                ))}
              </div>
            </Reveal>

            {/* the personalised plan — the concrete day-by-day, not just chips */}
            <Reveal delay={0.35}>
              <SectionTag>YOUR PERSONALISED PLAN</SectionTag>
              <PlanDashboard paperId={paperId} days={7} />
              <p style={{ fontSize: 12, color: C.faint, lineHeight: 1.5, margin: "12px 0 22px" }}>
                Testing you on day one would measure nothing but nerves. Cover the foundations and the diagnostic opens —
                that's when your Exam Readiness Score becomes meaningful, and every day after recalibrates on real evidence.
              </p>
            </Reveal>

            {/* the road */}
            <Reveal delay={0.6}>
              <SectionTag>THE ROAD TO {plan.targetProb}%</SectionTag>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
                {road.map((r, i) => (
                  <motion.span
                    key={r}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.09 }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                  >
                    <span style={{
                      fontSize: 11.5, fontWeight: 750, padding: "5px 10px", borderRadius: 999,
                      background: i === road.length - 1 ? "rgba(16,185,129,0.10)" : "var(--sch-card-2)",
                      color: i === road.length - 1 ? "#0E9F6E" : C.soft,
                      border: i === 0 ? `1px solid ${C.brandLine}` : "1px solid transparent",
                    }}>
                      {r}
                    </span>
                    {i < road.length - 1 && <Icon name="chevron" size={12} color={C.faint} />}
                  </motion.span>
                ))}
              </div>
              {days !== null && days > 0 && (
                <p style={{ fontSize: 12.5, color: C.soft, margin: "0 0 24px" }}>
                  <b style={{ color: C.text, fontVariantNumeric: "tabular-nums" }}>{days} days</b> to your sitting — the plan already knows what each one is for.
                </p>
              )}
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.85}>
              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -1 }}
                onClick={() => {
                  trackEvent("plan_day_one_started", { paper: paperId, days })
                  setShowPaywall(true)
                }}
                style={{
                  width: "100%", padding: "16px 18px", borderRadius: 14, border: "none", cursor: "pointer",
                  background: IRIDESCENT, color: "#fff", fontWeight: 800, fontSize: 15.5,
                  boxShadow: "0 10px 28px rgba(200,0,0,0.28)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                Start day 1 — {firstArea ? firstArea.label : "your first topic"} <Icon name="arrow" size={17} color="#fff" />
              </motion.button>
              {/*
                "Take me to my dashboard instead" was removed here.
                It called onDone("dashboard") directly, so it neither showed the
                offer nor delivered a dashboard — it navigated to a gated route
                and the learner met the wall a moment later, having been invited
                there by us. An exit that promises something it cannot give is
                worse than no exit, and it was the one people used to go looking
                for a way round the paywall.

                After the plan is revealed there is exactly one honest next
                step, and both buttons on this screen now lead to it: the offer.
              */}
            </Reveal>
          </motion.div>
        ) : (
          /* ── COMMIT ── the emotional close, then the ask ─────────── */
          <motion.div
            key="commit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
            style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 22px" }}
          >
            <div style={{ width: "100%", maxWidth: 500, textAlign: "center" }}>
              <Reveal delay={0}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.2, color: C.brand, marginBottom: 14 }}>
                  ONE THING LEFT
                </div>
              </Reveal>

              {/* The headline number. Their exam date, or their syllabus if they
                  haven't booked one — never a placeholder. */}
              <Reveal delay={0.1}>
                {days !== null && days > 0 ? (
                  <h1 style={{ margin: 0, fontWeight: 850, letterSpacing: "-1.4px", color: C.text, lineHeight: 1.04, fontSize: "clamp(30px, 8vw, 44px)" }}>
                    Charles has planned<br />
                    <motion.span
                      initial={reduced ? undefined : { opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35, type: "spring", stiffness: 240, damping: 20 }}
                      style={{ ...iriText, fontVariantNumeric: "tabular-nums", display: "inline-block" }}
                    >
                      all {days} days.
                    </motion.span>
                  </h1>
                ) : (
                  <h1 style={{ margin: 0, fontWeight: 850, letterSpacing: "-1.4px", color: C.text, lineHeight: 1.04, fontSize: "clamp(30px, 8vw, 44px)" }}>
                    Every area of {paperId},<br />
                    <span style={{ ...iriText, display: "inline-block" }}>already sequenced.</span>
                  </h1>
                )}
              </Reveal>

              {/* Their own numbers, counted up. */}
              {scale && (
                <Reveal delay={0.45}>
                  <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", margin: "26px 0 0" }}>
                    <ScaleStat value={scale.sessions} label="study sessions" />
                    <ScaleStat value={scale.questions} label="questions waiting" />
                    <ScaleStat value={scale.hours} label="hours mapped" suffix="h" />
                  </div>
                </Reveal>
              )}

              {/* The emotional beat. Anchored to the one published fact the
                  landing page already uses — no invented statistics. */}
              <Reveal delay={0.6}>
                <p style={{ fontSize: "clamp(14.5px, 3.6vw, 16px)", lineHeight: 1.6, color: C.muted, margin: "26px auto 0", maxWidth: 430 }}>
                  Around half of candidates fail a typical Applied Skills sitting. Not for lack of ability —
                  because nobody ever handed them the next hour's work.
                  {scale ? <> Yours is written. All {scale.sessions} of them.</> : <> Yours is written, area by area.</>}
                </p>
              </Reveal>

              <Reveal delay={0.72}>
                <p style={{ fontSize: "clamp(14.5px, 3.6vw, 16px)", lineHeight: 1.6, color: C.text, fontWeight: 750, margin: "16px auto 0", maxWidth: 430 }}>
                  There is exactly one thing this plan cannot do for you: show up tomorrow.
                </p>
              </Reveal>

              {/*
                * The ask, stated truthfully. Diagnosis and the plan are free;
                * the learning workspace requires a paid plan or card-backed
                * Pro trial (see route-guards.tsx).
                *
                * The true version is the stronger one anyway — the gap between
                * a 3-day trial and a plan measured in months is real tension
                * that needs no embellishment.
                */}
              <Reveal delay={0.84}>
                <div style={{
                  display: "flex", gap: 11, alignItems: "flex-start", textAlign: "left",
                  margin: "26px auto 0", maxWidth: 430, padding: "14px 16px", borderRadius: 14,
                  border: `1px solid ${C.brandLine}`, background: "linear-gradient(135deg, rgba(200,0,0,0.05), var(--sch-card, #fff))",
                }}>
                  <span style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, display: "grid", placeItems: "center", background: C.brandSoft }}>
                    <Icon name="time" size={16} color={C.brand} />
                  </span>
                  <div style={{ fontSize: 12.5, lineHeight: 1.55, color: C.soft }}>
                    {scale
                      ? <><b style={{ color: C.text }}>Your plan runs {days} days. Your trial covers {TRIAL_DAYS}.</b>{" "}</>
                      : <><b style={{ color: C.text }}>Your trial covers the next {TRIAL_DAYS} days.</b>{" "}</>}
                    Pro starts with three free days. Checkout securely saves a payment method, charges nothing
                    today, and unlocks the workspace immediately.
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.96}>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ y: -1 }}
                  onClick={() => {
                    trackEvent("plan_commit_upgrade_clicked", { paper: paperId, days })
                    setShowPaywall(true)
                  }}
                  style={{
                    width: "100%", marginTop: 26, padding: "17px 18px", borderRadius: 14, border: "none", cursor: "pointer",
                    background: IRIDESCENT, color: "#fff", fontWeight: 800, fontSize: 16,
                    boxShadow: "0 12px 32px rgba(200,0,0,0.30)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}
                >
                  Unlock everything Charles planned <Icon name="arrow" size={17} color="#fff" />
                </motion.button>
                <button
                  onClick={() => {
                    trackEvent("plan_commit_declined", { paper: paperId, days })
                    setShowPaywall(true)
                  }}
                  style={{ width: "100%", marginTop: 10, padding: 13, borderRadius: 12, border: "none", background: "transparent", color: C.soft, fontSize: 13.5, fontWeight: 700, cursor: "pointer" }}
                >
                  Choose a plan to start day 1
                </button>
              </Reveal>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout begins only after the personalised plan has been revealed. */}
      <PaywallModal open={showPaywall} type="general" required onClose={() => {}} />
    </div>
  )
}

function SectionTag({ children }: { children: ReactNode }) {
  return <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.8, color: C.faint, marginBottom: 10 }}>{children}</div>
}

/** A counted-up commitment number. */
function ScaleStat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(reduced ? value : 0)

  useEffect(() => {
    if (reduced) { setShown(value); return }
    const DURATION = 900
    let raf = 0
    let t0 = 0
    const tick = (t: number) => {
      if (!t0) t0 = t
      const p = Math.min(1, (t - t0) / DURATION)
      setShown(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, reduced])

  return (
    <div style={{ minWidth: 96, flex: "1 1 96px", maxWidth: 150, padding: "13px 10px", borderRadius: 14, border: `1px solid ${C.border}`, background: "var(--sch-card, #fff)" }}>
      <div style={{ fontSize: "clamp(20px, 5.5vw, 25px)", fontWeight: 850, letterSpacing: "-0.03em", color: C.text, fontVariantNumeric: "tabular-nums", lineHeight: 1.1 }}>
        {shown.toLocaleString("en-GB")}{suffix}
      </div>
      <div style={{ fontSize: 11, color: C.faint, marginTop: 3, lineHeight: 1.3 }}>{label}</div>
    </div>
  )
}

function Reveal({ delay, children }: { delay: number; children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}
