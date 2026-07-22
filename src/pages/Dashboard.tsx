import { useEffect, useState, type ReactNode } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useAuth } from "@/lib/auth"
import { isProUser, entitlementOf } from "@/lib/entitlement"
import { usePaywall } from "@/hooks/usePaywall"
import PaywallModal from "@/components/PaywallModal"
import { Icon, Card, C, SP, R, TYPE, type IconName } from "@/components/acca/ui"
import { RingGauge, MeterBar, bandColor } from "@/components/acca/charts"
import ExamDayFlow from "@/components/acca/ExamDayFlow"
import { getPaper, getTodayStats, getDailyActivity } from "@/lib/acca"
import { getMockHistory } from "@/lib/acca"
import { passBand } from "@/lib/acca-diagnostic"
import { daysUntilExam, currentPhase, METHOD_PHASES, getPlan } from "@/lib/acca-plan"
import { getCurrentPaper, getStudyingPapers, qualificationProgress } from "@/lib/acca-qualification"
import { passProbability, recoveryState, examDayDue, mockGate, mockProgress, MOCK_GATE, MOCK_PASS, MOCKS_REQUIRED } from "@/lib/acca-loop"
import { buildTodayPlan, greeting, todayHeadline, type TodayAction } from "@/lib/acca-today"
import CharlesMascot from "@/components/CharlesMascot"
import { flashcardStats } from "@/lib/acca-flashcards"
import { probabilityMomentum, snapshotProbability, palestArea } from "@/lib/acca-analytics"
import { isAccaOnboarded, getGoal, getStartMode, GOAL_OPTIONS } from "@/lib/acca-profile"
import { diagnosticGate, missedDayNote } from "@/lib/acca-schedule"
import { PlanRoute } from "@/components/acca/PlanRoute"
import { usePaperContent } from "@/hooks/usePaperContent"
import { PaperContentSkeleton, PaperContentError } from "@/components/acca/PaperContentGate"
import { format } from "date-fns"

/*
 * /dashboard — the command centre, not a report. One glance answers
 * "where am I, and what's the one thing to do next?", pulling only the
 * best-of from Study, Analytics and Settings and linking deeper.
 *
 * Three states (per the approved design export):
 *   normal        — prob ring + countdown, next action, vitals, footer strip
 *   no diagnostic — a single "find out your pass probability" CTA
 *   exam day      — the "how did it go?" flow replaces the hero
 */

const MISSION_MINUTES: Record<TodayAction, number> = {
  diagnostic: 15, weak: 25, practice: 20, essentials: 6, flashcards: 12, mock: 30, study: 7, bank: 40,
}
const MISSION_ICONS: Record<TodayAction, IconName> = {
  diagnostic: "diagnostic", weak: "weak", practice: "practice", essentials: "mission", flashcards: "flashcards", mock: "mock", study: "study", bank: "practice",
}

/** Deep-link for a mission task — carries the area so study/essentials land on today's topic. */
function missionHref(t: { action: TodayAction; area?: string }): string {
  return `/study?do=${t.action}${t.area ? `&area=${t.area}` : ""}`
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const firstName = (user?.user_metadata?.first_name as string) || ""
  const [, setTick] = useState(0)

  const paperId = getCurrentPaper() ?? getStudyingPapers()[0] ?? "FA"
  // The dashboard reads the CURRENT paper's bank + deck (flashcard counts, the
  // mission, coverage), so it waits for that one paper's content chunk — not for
  // all fifteen, which is what every page used to pull in.
  const content = usePaperContent(paperId)
  const paper = getPaper(paperId)
  const prob = passProbability(paperId)
  const band = prob !== null ? passBand(prob) : null
  const days = daysUntilExam(paperId)
  const phase = currentPhase(paperId)
  const rec = recoveryState(paperId)
  const examDue = examDayDue(paperId)
  const today = getTodayStats()
  const week = getDailyActivity(7)
  const fc = flashcardStats(paperId)
  const qual = qualificationProgress()
  const gate = mockGate(paperId)
  const mocks = mockProgress(paperId)
  const history = getMockHistory(paperId)
  const weakest = palestArea(paperId)
  const momentum = probabilityMomentum(paperId)
  const mission = buildTodayPlan(paperId)
  const isPro = isProUser(user)
  const { showPaywall, paywallType, maybeShowTrialReminder, closePaywall } = usePaywall()

  useEffect(() => {
    snapshotProbability(paperId)
  }, [paperId])

  // Gentle mid-trial nudge: once per day, from day 2 onward (the hook guards
  // both the cadence and the "not day 1" rule).
  useEffect(() => {
    const e = entitlementOf(user)
    if (e.isTrial) maybeShowTrialReminder(e.trialDaysLeft)
  }, [user, maybeShowTrialReminder])

  // The loop starts at onboarding — a brand-new user goes there first
  // (paper choice, exam date, commitment), never straight to a default "FA".
  if (!isAccaOnboarded()) return <Navigate to="/welcome" replace />

  // A "measure-first" learner must run the diagnostic (→ results → plan reveal)
  // BEFORE ever reaching the internal app — no slipping into the dashboard first.
  // Total beginners (startMode "zero") are exempt: their wow is the onboarding
  // plan-reveal, and forcing a diagnostic on zero knowledge is pointless. Once
  // the diagnostic is done `prob` is set, so this never loops.
  if (getStartMode() !== "zero" && prob === null) {
    return <Navigate to="/study/diagnostic?next=paywall" replace />
  }

  if (!paper) return null

  if (!content.ready) {
    return (
      <DashboardLayout>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "8px 0 48px" }}>
          {content.error ? (
            <PaperContentError paperId={paperId} onRetry={content.retry} />
          ) : (
            <PaperContentSkeleton paperId={paperId} />
          )}
        </div>
      </DashboardLayout>
    )
  }

  const noDiag = prob === null
  // Brand-new learners (start mode "zero") learn the basics BEFORE the
  // diagnostic: it unlocks only once sections A·B·C are each studied,
  // practised and revised — the point where a pass probability means something.
  const gateS = diagnosticGate(paperId)
  const zeroStart = noDiag && getStartMode() === "zero" && !gateS.unlocked
  const missedNote = missedDayNote(paperId)

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "8px 0 48px" }}>
        {/* header — the morning briefing */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: SP.md, flexWrap: "wrap", marginBottom: SP.xl }}>
          <div>
            <div className="race-kicker" style={{ color: C.brand, marginBottom: 7 }}>Race control · {paper.id}</div>
            <h1 style={{ fontSize: 27, fontWeight: 800, margin: 0, color: C.text, letterSpacing: "-0.02em" }}>{greeting(firstName)}</h1>
            <p style={{ ...TYPE.body, color: C.muted, margin: "5px 0 0", lineHeight: 1.5 }}>{todayHeadline(paperId)}</p>
          </div>
          {days != null && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: R.pill, background: C.card, border: `1px solid ${C.border}`, fontSize: 12.5, fontWeight: 700, color: C.muted, whiteSpace: "nowrap" }}>
              <Icon name="calendar" size={13} color={C.brand} />
              {paper.id} in {days} days
              <span style={{ color: C.faint }}>· {phase.label}</span>
            </span>
          )}
        </motion.div>

        {/* Charles's pit-wall briefing — reassures, never guilts (Doc 12, Phase 3).
            The line is state-aware: a brand-new or pre-diagnostic learner has no
            "lost marks" to recover, so only a learner with a real result hears
            the recovery framing. */}
        {!examDue && (
          <motion.div
            className="race-panel"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 14px", borderRadius: R.lg, background: C.card, border: `1px solid ${C.border}`, marginBottom: SP.lg }}
          >
            <CharlesMascot pose="wave" size={56} float />
            <div style={{ minWidth: 0, fontSize: 12.5, lineHeight: 1.5, color: C.muted }}>
              <strong style={{ color: C.text }}>Charles · pit-wall briefing:</strong>{" "}
              {zeroStart
                ? "learn the first sections, then sit the diagnostic — I'll build your race plan from your real result."
                : noDiag
                  ? "sit the diagnostic when you're ready and I'll turn the result into a focused daily race plan."
                  : "complete today's race plan, then use every result to adjust the route to your next sitting."}
            </div>
          </motion.div>
        )}

        {missedNote && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "13px 16px", borderRadius: R.lg, background: C.brandSoft, border: `1px solid ${C.brandLine}`, marginBottom: SP.lg }}
          >
            <Icon name="tutor" size={17} color={C.brand} style={{ marginTop: 1, flexShrink: 0 }} />
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.55 }}>{missedNote}</div>
          </motion.div>
        )}

        {/* exam day — the loop's decision point takes over the hero */}
        {examDue && (
          <ExamDayFlow
            paperId={paperId}
            onDone={() => setTick((t) => t + 1)}
            onStartPaper={() => navigate("/study")}
            onAction={(a) => navigate(`/study?do=${a}`)}
          />
        )}

        {/* brand-new learner — learn the basics first; the diagnostic unlocks at 15 answers */}
        {zeroStart && !examDue && (
          <Card style={{ padding: SP["3xl"], marginBottom: SP.md }}>
            <div style={{ display: "flex", gap: SP.lg, alignItems: "flex-start", flexWrap: "wrap" }}>
              <span style={{ flex: "none", width: 56, height: 56, borderRadius: 16, background: C.brandSoft, display: "grid", placeItems: "center" }}>
                <Icon name="learn" size={26} color={C.brand} />
              </span>
              <div style={{ flex: 1, minWidth: 240 }}>
                <div style={{ ...TYPE.label, color: C.brand, marginBottom: 6 }}>Start here — learn the basics</div>
                <h2 style={{ ...TYPE.h2, color: C.text, margin: "0 0 8px" }}>New to {paper.id}? Perfect. We start with the first topics.</h2>
                <p style={{ ...TYPE.body, color: C.soft, margin: "0 0 14px", lineHeight: 1.6 }}>
                  For each of the first three sections: read the topic brief, practise the guided questions, flip the flashcards.
                  Once <strong style={{ color: C.text }}>sections A·B·C</strong> are covered, the diagnostic unlocks and sets your
                  first Exam Readiness Score — measured fairly, after you've actually learned something.
                </p>
                {/* per-section checklist: studied · practised · revised */}
                {/* minmax(0,1fr): a nowrap label must TRUNCATE, never widen the
                    track past the viewport (the mobile sideways-scroll bug). */}
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 7, marginBottom: 16, maxWidth: 420 }}>
                  {gateS.sections.map((s) => (
                    <div key={s.area} style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, padding: "8px 12px", borderRadius: R.md, background: s.done ? C.greenSoft : C.card2, border: `1px solid ${s.done ? C.green : C.border}` }}>
                      <span style={{ flex: "none", width: 22, height: 22, borderRadius: 7, background: s.done ? C.green : C.card, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 11, color: s.done ? "#fff" : C.faint }}>{s.done ? "✓" : s.area}</span>
                      <span style={{ flex: 1, fontSize: 12.5, fontWeight: 700, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.label}</span>
                      <span style={{ display: "inline-flex", gap: 6, fontSize: 10.5, fontWeight: 700, color: C.faint }}>
                        <span style={{ color: s.studied ? C.green : C.faint }}>study</span>
                        <span style={{ color: s.practised ? C.green : C.faint }}>practise</span>
                        <span style={{ color: s.revised ? C.green : C.faint }}>revise</span>
                      </span>
                    </div>
                  ))}
                  <span style={{ fontSize: 12, fontWeight: 800, color: C.text, fontVariantNumeric: "tabular-nums" }}>
                    {gateS.done} / {gateS.total} sections <span style={{ color: C.faint, fontWeight: 600 }}>to your diagnostic</span>
                  </span>
                </div>
                <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} onClick={() => navigate("/study")} style={{ padding: "14px 26px", borderRadius: R.lg, border: "none", background: IRIDESCENT, color: "#fff", fontWeight: 750, fontSize: 15, cursor: "pointer" }}>
                  Continue your plan — today's tasks
                </motion.button>
              </div>
            </div>
          </Card>
        )}

        {/* no diagnostic yet — one CTA, nothing else competes */}
        {noDiag && !zeroStart && !examDue && (
          <Card style={{ textAlign: "center", padding: SP["4xl"], marginBottom: SP.md }}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 18 }} style={{ display: "inline-flex", marginBottom: 12 }}>
              <span style={{ width: 62, height: 62, borderRadius: 18, background: C.brandSoft, display: "grid", placeItems: "center" }}>
                <Icon name="diagnostic" size={30} color={C.brand} />
              </span>
            </motion.div>
            <div style={{ ...TYPE.label, color: C.brand, marginBottom: 6 }}>Start here</div>
            <h2 style={{ ...TYPE.h2, color: C.text, margin: "0 0 8px" }}>Find out your Exam Readiness Score</h2>
            <p style={{ ...TYPE.body, color: C.soft, maxWidth: 460, margin: "0 auto 18px", lineHeight: 1.6 }}>
              A ~15-minute diagnostic reads your current level across every {paper.id} syllabus area — then Scholify builds the roadmap and today's plan around it.
            </p>
            <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} onClick={() => navigate("/study/diagnostic")} style={{ padding: "15px 28px", borderRadius: R.lg, border: "none", background: IRIDESCENT, color: "#fff", fontWeight: 750, fontSize: 15.5, cursor: "pointer" }}>
              Take the diagnostic
            </motion.button>
            <div style={{ ...TYPE.small, color: C.faint, marginTop: 10 }}>~15 min · no score counts against you</div>
          </Card>
        )}

        {/* hero band — pass probability + countdown/retake */}
        {!noDiag && !examDue && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: SP.md, marginBottom: SP.md }}>
            <Card style={{ display: "flex", alignItems: "center", gap: SP.xl, flexWrap: "wrap" }}>
              <RingGauge value={prob!} size={140} stroke={12} color={band?.color} target={MOCK_PASS} />
              <div style={{ flex: 1, minWidth: 150 }}>
                <div style={{ ...TYPE.label, color: C.faint, marginBottom: 5 }}>
                  {history.length > 0 ? "Pass Probability" : "Exam Readiness Score"}
                </div>
                <div style={{ fontWeight: 800, fontSize: 16, color: C.text }}>{band?.label}</div>
                <div style={{ ...TYPE.small, color: momentum?.deltaPts != null && momentum.deltaPts !== 0 ? (momentum.deltaPts > 0 ? C.green : C.red) : C.soft, marginTop: 4, fontWeight: 650 }}>
                  {momentum?.deltaPts != null
                    ? momentum.deltaPts > 0
                      ? `+${momentum.deltaPts} pts this week — climbing`
                      : momentum.deltaPts < 0
                        ? `${momentum.deltaPts} pts this week — normal while drilling`
                        : "holding steady this week"
                    : "every answer moves this number"}
                </div>
                <Link to="/study/analytics" style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 12, fontSize: 12.5, fontWeight: 750, color: C.brand, textDecoration: "none" }}>
                  Full analytics <Icon name="arrow" size={13} color={C.brand} />
                </Link>
              </div>
            </Card>

            {/* the dark card — countdown, or the retake run */}
            <div style={{ borderRadius: R["2xl"], padding: SP.xl, background: "linear-gradient(135deg, #1c0f10, #3a0d16 60%, #55102a)", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              {rec.active ? (
                <>
                  <div style={{ ...TYPE.label, color: "#F4A405" }}>Retake run</div>
                  <div style={{ fontSize: 15.5, fontWeight: 750, lineHeight: 1.5, margin: "10px 0" }}>
                    You know exactly where the marks were lost — {rec.answeredSince > 0 ? `${rec.answeredSince} answers into recovering them` : "today's plan starts recovering them"}.
                  </div>
                  <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.65)" }}>
                    {rec.provenAgain ? "Fresh mock passed — hold it warm" : "Then a fresh mock"}{days != null ? ` · retake in ${days} days` : " · set your new date"}
                  </div>
                </>
              ) : days != null ? (
                <>
                  <div style={{ ...TYPE.label, color: "rgba(255,255,255,0.55)" }}>Exam countdown</div>
                  <div style={{ fontSize: 42, fontWeight: 800, lineHeight: 1, margin: "8px 0 4px" }}>
                    {days}
                    <span style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.65)" }}> days to your {paper.id} sitting</span>
                  </div>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start", padding: "4px 11px", borderRadius: R.pill, background: "rgba(244,164,5,0.18)", color: "#F4A405", fontSize: 11.5, fontWeight: 750, margin: "4px 0 10px" }}>
                    <Icon name="mission" size={11} color="#F4A405" />
                    Phase · {phase.label}
                  </span>
                  <div style={{ display: "flex", gap: 6 }}>
                    {METHOD_PHASES.map((p) => {
                      const on = p.key === phase.key
                      return (
                        <span key={p.key} style={{ flex: 1, textAlign: "center", fontSize: 10, fontWeight: on ? 800 : 600, color: on ? "#fff" : "rgba(255,255,255,0.45)", borderTop: `2px solid ${on ? "#F4A405" : "rgba(255,255,255,0.18)"}`, paddingTop: 5 }}>
                          {p.label}
                        </span>
                      )
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ ...TYPE.label, color: "rgba(255,255,255,0.55)" }}>Exam countdown</div>
                  <div style={{ fontSize: 19, fontWeight: 800, margin: "10px 0 6px" }}>No sitting booked yet</div>
                  <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
                    Set your exam date in Settings and the roadmap dates itself back from it.
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* the next action — the one gradient CTA on screen */}
        {!noDiag && mission.length > 0 && (
          <Card style={{ marginBottom: SP.md }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: SP.md }}>
              <span style={{ ...TYPE.label, color: C.faint }}>Your next action · the plan already chose</span>
              <span style={{ fontSize: 11.5, fontWeight: 750, color: today.goalMet ? C.green : C.faint }}>
                {today.goalMet ? "goal met" : today.answered > 0 ? `${today.answered}/${today.goal} today` : `0 of ${mission.length} done`}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: SP.lg, flexWrap: "wrap", padding: "4px 0 2px" }}>
              <span style={{ width: 46, height: 46, borderRadius: 13, background: IRIDESCENT, display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Icon name={MISSION_ICONS[mission[0].action]} size={21} color="#fff" />
              </span>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: C.text }}>① {mission[0].title}</div>
                <div style={{ fontSize: 12.5, color: C.soft, marginTop: 2 }}>{mission[0].detail} · ~{MISSION_MINUTES[mission[0].action]} min</div>
              </div>
              <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} onClick={() => navigate(missionHref(mission[0]))} style={{ padding: "13px 26px", borderRadius: R.lg, border: "none", background: IRIDESCENT, color: "#fff", fontWeight: 750, fontSize: 14.5, cursor: "pointer", flexShrink: 0 }}>
                Start now
              </motion.button>
            </div>
            {mission.slice(1).map((t, i) => (
              <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, marginTop: SP.sm, padding: "9px 12px", borderRadius: R.md, background: C.card2, fontSize: 13, color: C.muted }}>
                <Icon name={MISSION_ICONS[t.action]} size={14} color={C.faint} />
                <span style={{ flex: 1 }}>{["②", "③", "④", "⑤"][i] ?? ""} {t.title}</span>
                <span style={{ color: C.faint, fontSize: 12 }}>~{MISSION_MINUTES[t.action]} min</span>
              </div>
            ))}
          </Card>
        )}

        {/* the distributed route to exam day + shield status */}
        {!examDue && <PlanRoute paperId={paperId} />}

        {/* vitals — four glanceable tiles */}
        {!noDiag && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: SP.md, marginBottom: SP.md }}>
            <VitalTile icon="streak" label="Streak">
              <div style={{ fontSize: 22, fontWeight: 800, color: C.text, lineHeight: 1 }}>{today.streak} <span style={{ fontSize: 12.5, fontWeight: 700, color: C.soft }}>days</span></div>
              <div style={{ display: "flex", gap: 4, marginTop: 9 }}>
                {week.map((d) => (
                  <span key={d.date} style={{ width: 15, height: 15, borderRadius: 4.5, background: d.count > 0 ? C.green : C.card2 }} />
                ))}
              </div>
            </VitalTile>
            <VitalTile icon="practice" label="Daily goal">
              <div style={{ fontSize: 22, fontWeight: 800, color: today.goalMet ? C.green : C.text, lineHeight: 1 }}>
                {today.answered} <span style={{ fontSize: 12.5, fontWeight: 700, color: C.soft }}>/ {today.goal} today</span>
              </div>
              <MeterBar value={today.answered} max={today.goal} color={today.goalMet ? C.green : C.brand} track={today.goalMet ? C.greenSoft : C.brandSoft} height={7} style={{ marginTop: 10 }} />
            </VitalTile>
            <VitalTile
              icon="weak"
              label="Weakest topic"
              onClick={() => navigate("/study?do=weak")}
              action="drill →"
            >
              {weakest ? (
                <>
                  <div style={{ fontSize: 13, fontWeight: 750, color: C.text, lineHeight: 1.35, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                    Area {weakest.code} · {weakest.label}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 9 }}>
                    <MeterBar value={weakest.pct} color={bandColor(weakest.pct, 50)} height={7} style={{ flex: 1 }} />
                    <span style={{ fontSize: 12, fontWeight: 800, color: C.text }}>{weakest.pct}%</span>
                  </div>
                </>
              ) : (
                <div style={{ fontSize: 12.5, color: C.soft }}>Practise a little and this finds itself.</div>
              )}
            </VitalTile>
            <VitalTile icon={gate.unlocked ? "mock" : "lock"} label={gate.unlocked ? "Mock exams" : "Mock gate"} onClick={() => navigate(gate.unlocked ? "/study?do=mock" : "/study?do=weak")}>
              {gate.unlocked ? (
                <>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {Array.from({ length: MOCKS_REQUIRED }, (_, i) => {
                      const m = [...history].reverse()[i]
                      return (
                        <span key={i} style={{ padding: "3px 8px", borderRadius: R.pill, fontSize: 11, fontWeight: 750, background: m ? (m.percent >= MOCK_PASS ? C.greenSoft : C.redSoft) : C.card2, color: m ? (m.percent >= MOCK_PASS ? C.green : C.red) : C.faint }}>
                          {i + 1} · {m ? `${m.percent}%` : "—"}
                        </span>
                      )
                    })}
                  </div>
                  <div style={{ ...TYPE.small, color: C.faint, marginTop: 8 }}>
                    {mocks.examReady ? "Exam-ready — keep it warm" : history.length ? `best ${Math.max(...history.map((m) => m.percent))}%` : "Sit Mock 1"}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text, lineHeight: 1.4 }}>Unlocks at {MOCK_GATE}% — you're at {gate.prob}%</div>
                  <MeterBar value={gate.prob} max={MOCK_GATE} color={C.amber} track={C.amberSoft} height={7} style={{ marginTop: 9 }} />
                </>
              )}
            </VitalTile>
          </div>
        )}

        {/* your setup — the commitments made at onboarding, always visible */}
        <SetupStrip />

        {/* footer strip — quiet housekeeping */}
        <div style={{ display: "flex", alignItems: "center", gap: SP.md, flexWrap: "wrap", padding: "14px 18px", borderRadius: R.xl, background: C.card, border: `1px solid ${C.border}` }}>
          {isPro ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 750, color: C.green }}>
              <Icon name="done" size={14} color={C.green} /> Pro
            </span>
          ) : (
            <Link to="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 750, color: C.brand, textDecoration: "none", padding: "6px 12px", borderRadius: R.pill, border: `1.5px solid ${C.brandLine}` }}>
              Free — Upgrade to Pro
            </Link>
          )}
          {fc.due > 0 && (
            <Link to="/study?do=flashcards" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, color: C.muted, textDecoration: "none" }}>
              <Icon name="flashcards" size={14} color={C.amber} /> {fc.due} cards due
            </Link>
          )}
          <div style={{ flex: 1, minWidth: 180, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.soft, whiteSpace: "nowrap" }}>Journey to membership</span>
            <div style={{ flex: 1, height: 7, background: C.card2, borderRadius: R.pill, overflow: "hidden" }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${Math.max(2, qual.percent)}%` }} transition={{ duration: 1 }} style={{ height: "100%", background: IRIDESCENT, borderRadius: R.pill }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: C.text, whiteSpace: "nowrap" }}>{qual.passedCount} of {qual.totalExams} · {qual.percent}%</span>
          </div>
          <Link to="/study/analytics" style={{ fontSize: 12.5, fontWeight: 750, color: C.brand, textDecoration: "none", whiteSpace: "nowrap" }}>
            Roadmap →
          </Link>
        </div>
      </div>
      <PaywallModal open={showPaywall} type={paywallType} onClose={closePaywall} />
    </DashboardLayout>
  )
}

/** The onboarding answers, pinned: paper · daily commitment · exam date · goal. */
function SetupStrip() {
  const pid = getCurrentPaper()
  if (!pid) return null
  const plan = getPlan(pid)
  const goal = getGoal()
  const goalLabel = GOAL_OPTIONS.find((g) => g.value === goal)?.label
  const items: { icon: IconName; k: string; v: string }[] = [
    { icon: "roadmap", k: "Paper", v: pid },
    { icon: "time", k: "Daily", v: `${plan.dailyMinutes} min${plan.studyTime ? ` at ${plan.studyTime}` : ""}` },
    {
      icon: "calendar",
      k: "Exam",
      v: plan.examDate
        ? format(new Date(`${plan.examDate}T00:00:00`), "d MMM yyyy")
        : "Paced by mastery",
    },
    ...(goalLabel ? [{ icon: "diagnostic" as IconName, k: "Goal", v: goalLabel }] : []),
  ]
  return (
    <div style={{ display: "flex", alignItems: "center", gap: SP.md, flexWrap: "wrap", padding: "13px 18px", borderRadius: R.xl, background: C.card, border: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: C.faint, whiteSpace: "nowrap" }}>
        Your setup
      </span>
      {items.map((it) => (
        <span key={it.k} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: C.muted }}>
          <Icon name={it.icon} size={13} color={C.brand} />
          <span style={{ fontWeight: 750, color: C.text }}>{it.v}</span>
        </span>
      ))}
      <Link to="/settings" style={{ marginLeft: "auto", fontSize: 12.5, fontWeight: 750, color: C.brand, textDecoration: "none", whiteSpace: "nowrap" }}>
        Edit →
      </Link>
    </div>
  )
}

function VitalTile({ icon, label, action, onClick, children }: { icon: IconName; label: string; action?: string; onClick?: () => void; children: ReactNode }) {
  const Tag = onClick ? motion.button : motion.div
  return (
    <Tag
      onClick={onClick}
      whileHover={onClick ? { y: -1 } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: R.xl,
        padding: SP.lg,
        textAlign: "left",
        cursor: onClick ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <Icon name={icon} size={13} color={C.brand} strokeWidth={2.4} />
        <span style={{ ...TYPE.label, color: C.faint, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
        {action && <span style={{ fontSize: 11, fontWeight: 750, color: C.brand }}>{action}</span>}
      </div>
      {children}
    </Tag>
  )
}
