import { useMemo, useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "motion/react"
import { iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { Icon, C, type IconName } from "@/components/acca/ui"
import { CinematicReveal, type RevealPhase } from "@/components/acca/CinematicReveal"
import { PlanDashboard } from "@/components/acca/PlanDashboard"
import PaywallModal from "@/components/PaywallModal"
import { getPaper } from "@/lib/acca"
import { getPlan, daysUntilExam } from "@/lib/acca-plan"
import { MOCK_GATE } from "@/lib/acca-loop"

/*
 * ZeroPlanReveal — the cinematic plan-generation moment for the learner who
 * chose "Start learning" (StartMode zero) at onboarding.
 *
 * The assess path already gets a full reveal after the diagnostic; the
 * zero-start learner used to be dropped on the dashboard with no ceremony at
 * all — their plan silently existed. This is their wow moment: Charles visibly
 * builds the plan from their ONBOARDING answers (paper, minutes, slot,
 * target, exam date) — honest that it's profile-built, not evidence-built —
 * and shows the exact road: learn the foundations → diagnostic unlocks →
 * missions → mocks → exam day.
 */

export default function ZeroPlanReveal({ paperId, onDone }: { paperId: string; onDone: (dest: "study" | "dashboard") => void }) {
  const paper = getPaper(paperId)
  const plan = getPlan(paperId)
  const days = daysUntilExam(paperId)
  const [ready, setReady] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)

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
        {!ready ? (
          <motion.div
            key="building"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          >
            <div style={{ width: "100%", maxWidth: 420 }}>
              <CinematicReveal phases={phases} accent={C.brand} perPhaseMs={950} onComplete={() => setReady(true)} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="plan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ maxWidth: 560, margin: "0 auto", padding: "40px 22px 48px" }}
          >
            {/* headline */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.2, color: C.brand, marginBottom: 10 }}>
                CHARLES BUILT THIS FROM YOUR TELEMETRY
              </div>
              <h1 style={{ fontSize: 30, fontWeight: 850, letterSpacing: "-0.8px", color: C.text, margin: "0 0 8px", lineHeight: 1.15 }}>
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
                onClick={() => setShowPaywall(true)}
                style={{
                  width: "100%", padding: "16px 18px", borderRadius: 14, border: "none", cursor: "pointer",
                  background: IRIDESCENT, color: "#fff", fontWeight: 800, fontSize: 15.5,
                  boxShadow: "0 10px 28px rgba(200,0,0,0.28)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                Start day 1 — {firstArea ? firstArea.label : "your first topic"} <Icon name="arrow" size={17} color="#fff" />
              </motion.button>
              <button
                onClick={() => onDone("dashboard")}
                style={{ width: "100%", marginTop: 10, padding: 12, borderRadius: 12, border: "none", background: "transparent", color: C.faint, fontSize: 13, fontWeight: 650, cursor: "pointer" }}
              >
                Take me to my dashboard instead
              </button>
            </Reveal>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The plan reveal leads to the trial paywall, same as the assess path.
          Dismissing still drops the learner into their (free) plan. */}
      <PaywallModal open={showPaywall} type="general" onClose={() => { setShowPaywall(false); onDone("study") }} />
    </div>
  )
}

function SectionTag({ children }: { children: ReactNode }) {
  return <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.8, color: C.faint, marginBottom: 10 }}>{children}</div>
}

function Reveal({ delay, children }: { delay: number; children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}
