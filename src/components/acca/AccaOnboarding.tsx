import { useMemo, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import {
  paperLevels,
  suggestedNextPapers,
  qualificationProgress,
  setPassedPapers,
  setCurrentPaper,
} from "@/lib/acca-qualification"
import { setPlan, generateStudyPlan } from "@/lib/acca-plan"

/*
 * Guided first-run for /study, in Lara's voice. Four steps:
 *   1. Welcome
 *   2. Your ACCA record — mark the exams you've passed (self-reported myACCA)
 *   3. Which paper next + when's the exam
 *   4. Personalised plan reveal
 * Shown once (the parent tracks the localStorage flag).
 */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"
const CARD = "var(--sch-card)"
const BORDER = "var(--sch-border)"
const PURPLE = "#A78BFA"

function card(extra?: CSSProperties): CSSProperties {
  return { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 20, ...extra }
}

export default function AccaOnboarding({
  onDone,
}: {
  onDone: (paperId: string, examDate: string | null) => void
}) {
  const levels = paperLevels()
  const [step, setStep] = useState(0)
  const [passed, setPassed] = useState<Set<string>>(new Set())
  const [paperId, setPaperId] = useState<string | null>(null)
  const [examDate, setExamDate] = useState("")

  const nextPapers = useMemo(() => suggestedNextPapers([...passed]), [passed])
  const qual = useMemo(() => qualificationProgress([...passed]), [passed])

  function togglePassed(id: string) {
    setPassed((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }

  function finish() {
    if (!paperId) return
    setPassedPapers([...passed])
    setCurrentPaper(paperId)
    if (examDate) setPlan(paperId, { examDate })
    onDone(paperId, examDate || null)
  }

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", paddingTop: 12 }}>
      {/* progress dots */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 26 }}>
        {[0, 1, 2, 3].map((s) => (
          <div key={s} style={{ width: s === step ? 22 : 7, height: 7, borderRadius: 999, background: s <= step ? "transparent" : "var(--sch-card-2)", backgroundImage: s <= step ? IRIDESCENT : undefined, transition: "width .2s" }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* 0 — welcome */}
        {step === 0 && (
          <Slide key="s0">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>🎓</div>
              <h1 style={{ fontSize: 27, fontWeight: 800, color: TEXT, margin: "0 0 10px" }}>
                Hi, I'm <span style={iriText}>Lara</span> — your ACCA coach
              </h1>
              <p style={{ color: MUTED, fontSize: 15.5, lineHeight: 1.6, margin: "0 0 28px" }}>
                I'll take you all the way from Applied Knowledge to Strategic Professional — one paper at a time,
                with a plan built around your exam date. Let's set you up in 30 seconds.
              </p>
              <Primary onClick={() => setStep(1)}>Let's go</Primary>
            </div>
          </Slide>
        )}

        {/* 1 — your ACCA record */}
        {step === 1 && (
          <Slide key="s1">
            <h2 style={h2}>Your ACCA record</h2>
            <p style={sub}>
              Tap the exams you've already passed so I can see where you are. (myACCA has no live connection yet —
              this is a quick self-report; you can update it anytime.)
            </p>
            <div style={{ display: "grid", gap: 16, marginBottom: 22 }}>
              {levels.map((g) => (
                <div key={g.key}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 750, color: TEXT }}>{g.label}</span>
                    {g.note && <span style={{ fontSize: 11, color: DIM }}>· {g.note}</span>}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {g.papers.map((p) => {
                      const on = passed.has(p.id)
                      return (
                        <button
                          key={p.id}
                          onClick={() => togglePassed(p.id)}
                          title={p.name}
                          style={{ padding: "8px 14px", borderRadius: 999, border: `1.5px solid ${on ? PURPLE : BORDER}`, background: on ? "rgba(167,139,250,0.12)" : CARD, color: on ? PURPLE : TEXT, fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                        >
                          {on && <span>✓</span>}{p.id}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ ...card({ padding: 14, marginBottom: 18, textAlign: "center" }) }}>
              <span style={{ fontSize: 13.5, color: MUTED }}>
                {qual.passedCount > 0 ? (
                  <>You've passed <strong style={{ color: TEXT }}>{qual.passedCount}</strong> of 13 exams — <strong style={{ ...iriText }}>{qual.percent}%</strong> qualified. Keep going! 💪</>
                ) : (
                  <>Just starting out? Perfect — everyone begins at Applied Knowledge.</>
                )}
              </span>
            </div>
            <Primary onClick={() => setStep(2)}>Continue</Primary>
            <Skip onClick={() => setStep(2)}>I'll do this later</Skip>
          </Slide>
        )}

        {/* 2 — next paper + exam date */}
        {step === 2 && (
          <Slide key="s2">
            <h2 style={h2}>What are you studying next?</h2>
            <p style={sub}>Here's what comes next on your path. Pick the paper you're sitting.</p>
            <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
              {nextPapers.map((p) => {
                const on = paperId === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => setPaperId(p.id)}
                    style={{ ...card({ cursor: "pointer", textAlign: "left", border: `1.5px solid ${on ? PURPLE : BORDER}`, padding: 14 }), display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div style={{ width: 42, height: 42, borderRadius: 11, background: IRIDESCENT, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", flexShrink: 0, fontSize: 14 }}>{p.id}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14.5, color: TEXT }}>{p.name}</div>
                      <div style={{ color: DIM, fontSize: 12 }}>{p.code} · {p.level}</div>
                    </div>
                    {on && <span style={{ color: PURPLE, fontWeight: 800 }}>✓</span>}
                  </button>
                )
              })}
            </div>

            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: TEXT, marginBottom: 8 }}>📅 When's your exam? <span style={{ color: DIM, fontWeight: 400 }}>(optional)</span></div>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                style={{ width: "100%", boxSizing: "border-box", padding: "13px 16px", borderRadius: 12, border: `1px solid ${BORDER}`, background: "var(--sch-bg)", color: TEXT, fontSize: 15, colorScheme: "dark light" }}
              />
            </div>

            <Primary disabled={!paperId} onClick={() => setStep(3)}>Build my plan →</Primary>
          </Slide>
        )}

        {/* 3 — plan reveal */}
        {step === 3 && paperId && (
          <Slide key="s3">
            <PlanReveal paperId={paperId} examDate={examDate} onStart={finish} />
          </Slide>
        )}
      </AnimatePresence>
    </div>
  )
}

function PlanReveal({ paperId, examDate, onStart }: { paperId: string; examDate: string; onStart: () => void }) {
  // Persist the date first so the plan generator can read it.
  useMemo(() => {
    if (examDate) setPlan(paperId, { examDate })
  }, [paperId, examDate])
  const plan = generateStudyPlan(paperId)

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 46, marginBottom: 8 }}>✨</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: TEXT, margin: "0 0 6px" }}>Your personalised plan</h2>
        <p style={{ color: MUTED, fontSize: 14.5, margin: 0 }}>
          {plan.hasDate && plan.daysLeft
            ? <>{plan.daysLeft} days to go · aim for ~{plan.dailyTarget} questions a day.</>
            : <>Set an exam date anytime to get a day-by-day countdown.</>}
        </p>
      </div>

      {plan.phases.length > 0 ? (
        <div style={{ display: "grid", gap: 10, marginBottom: 22 }}>
          {plan.phases.map((ph, i) => (
            <motion.div
              key={ph.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 * i }}
              style={{ ...card({ padding: 16 }), display: "flex", gap: 14 }}
            >
              <span style={{ fontSize: 24, flexShrink: 0 }}>{ph.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontWeight: 750, fontSize: 15, color: TEXT }}>{ph.label}</span>
                  <span style={{ fontSize: 12, color: DIM, whiteSpace: "nowrap" }}>{ph.days}d</span>
                </div>
                <div style={{ fontSize: 12.5, color: PURPLE, margin: "1px 0 4px" }}>{ph.range}</div>
                <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>{ph.focus}</div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div style={{ ...card({ marginBottom: 22 }) }}>
          <p style={{ margin: 0, color: MUTED, fontSize: 14, lineHeight: 1.55 }}>
            I'll guide you through Learn → Practice → Revise for this paper. Add your exam date and I'll turn it into a dated, day-by-day plan.
          </p>
        </div>
      )}

      <Primary onClick={onStart}>Start studying →</Primary>
    </div>
  )
}

/* ── small building blocks ────────────────────────────────────── */

function Slide({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
      {children}
    </motion.div>
  )
}

function Primary({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.99 }}
      disabled={disabled}
      onClick={onClick}
      style={{ width: "100%", padding: 16, borderRadius: 14, border: "none", background: disabled ? "var(--sch-card-2)" : IRIDESCENT, color: disabled ? DIM : "#fff", fontWeight: 750, fontSize: 16, cursor: disabled ? "not-allowed" : "pointer" }}
    >
      {children}
    </motion.button>
  )
}

function Skip({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ display: "block", margin: "14px auto 0", background: "none", border: "none", color: DIM, fontSize: 14, cursor: "pointer" }}>
      {children}
    </button>
  )
}

const h2: CSSProperties = { fontSize: 23, fontWeight: 800, color: TEXT, margin: "0 0 6px", textAlign: "center" }
const sub: CSSProperties = { color: MUTED, fontSize: 14, textAlign: "center", margin: "0 0 20px", lineHeight: 1.55 }
