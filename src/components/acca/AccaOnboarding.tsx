import { useMemo, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import {
  paperLevels,
  suggestedNextPapers,
  qualificationProgress,
  setPassedPapers,
  setStudyingPapers,
} from "@/lib/acca-qualification"
import { setPlan, generateStudyPlan, METHOD_PHASES } from "@/lib/acca-plan"

/*
 * Guided first-run for /study, in Lara's voice. Five steps:
 *   1. Welcome
 *   2. Your ACCA record — mark the exams you've passed (self-reported myACCA)
 *   3. Which paper(s) next (1–2) + exam date (3/6-month presets or exact)
 *   4. Shield time — the protected daily study slot + minutes commitment
 *   5. Personalised plan reveal
 * Shown once (the parent tracks the localStorage flag).
 */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"
const CARD = "var(--sch-card)"
const BORDER = "var(--sch-border)"
const RED = "#C80000"

function card(extra?: CSSProperties): CSSProperties {
  return { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 20, ...extra }
}

function datePlusMonths(months: number): string {
  const d = new Date()
  d.setMonth(d.getMonth() + months)
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
}

export default function AccaOnboarding({
  onDone,
}: {
  onDone: (paperId: string, examDate: string | null) => void
}) {
  const levels = paperLevels()
  const [step, setStep] = useState(0)
  const [passed, setPassed] = useState<Set<string>>(new Set())
  const [picked, setPicked] = useState<string[]>([])
  const [examDate, setExamDate] = useState("")
  const [preset, setPreset] = useState<3 | 6 | null>(null)
  const [studyTime, setStudyTime] = useState("19:00")
  const [minutes, setMinutes] = useState(25)

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

  function togglePicked(id: string) {
    setPicked((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id)
      if (prev.length >= 2) return [prev[0], id]
      return [...prev, id]
    })
  }

  function pickPreset(months: 3 | 6) {
    setPreset(months)
    setExamDate(datePlusMonths(months))
  }

  function finish() {
    if (picked.length === 0) return
    setPassedPapers([...passed])
    setStudyingPapers(picked)
    for (const pid of picked) {
      setPlan(pid, {
        examDate: examDate || null,
        studyTime: studyTime || null,
        dailyMinutes: minutes,
        dailyGoal: minutes >= 60 ? 30 : minutes >= 40 ? 22 : minutes >= 25 ? 15 : 10,
      })
    }
    onDone(picked[0], examDate || null)
  }

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", paddingTop: 12 }}>
      {/* progress dots */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 26 }}>
        {[0, 1, 2, 3, 4].map((s) => (
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
                I'll take you all the way from Applied Knowledge to Strategic Professional — topic by topic,
                the way the top tuition providers teach, with a plan built around your exam date and your day.
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
              Tap the exams you've already passed so I can see where you are. (Quick self-report — you can update
              it anytime.)
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
                          style={{ padding: "8px 14px", borderRadius: 999, border: `1.5px solid ${on ? RED : BORDER}`, background: on ? "rgba(200,0,0,0.07)" : CARD, color: on ? RED : TEXT, fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
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

        {/* 2 — next paper(s) + exam date */}
        {step === 2 && (
          <Slide key="s2">
            <h2 style={h2}>What are you studying next?</h2>
            <p style={sub}>
              Pick your next paper — or two, if you have the hours. (One paper per sitting is the
              tutors' advice for most people; two works with a solid daily slot.)
            </p>
            <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
              {nextPapers.map((p) => {
                const on = picked.includes(p.id)
                return (
                  <button
                    key={p.id}
                    onClick={() => togglePicked(p.id)}
                    style={{ ...card({ cursor: "pointer", textAlign: "left", border: `1.5px solid ${on ? RED : BORDER}`, padding: 14 }), display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div style={{ width: 42, height: 42, borderRadius: 11, background: IRIDESCENT, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", flexShrink: 0, fontSize: 14 }}>{p.id}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14.5, color: TEXT }}>{p.name}</div>
                      <div style={{ color: DIM, fontSize: 12 }}>{p.code} · {p.level}</div>
                    </div>
                    {on && <span style={{ color: RED, fontWeight: 800 }}>✓</span>}
                  </button>
                )
              })}
            </div>

            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: TEXT, marginBottom: 8 }}>📅 When's the exam?</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                {([3, 6] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => pickPreset(m)}
                    style={{ flex: 1, padding: "11px 0", borderRadius: 12, border: `1.5px solid ${preset === m ? RED : BORDER}`, background: preset === m ? "rgba(200,0,0,0.07)" : CARD, color: preset === m ? RED : TEXT, fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}
                  >
                    In ~{m} months
                  </button>
                ))}
              </div>
              <input
                type="date"
                value={examDate}
                onChange={(e) => { setExamDate(e.target.value); setPreset(null) }}
                style={{ width: "100%", boxSizing: "border-box", padding: "13px 16px", borderRadius: 12, border: `1px solid ${BORDER}`, background: "var(--sch-bg)", color: TEXT, fontSize: 15, colorScheme: "dark light" }}
              />
              <p style={{ fontSize: 12, color: DIM, margin: "8px 0 0", lineHeight: 1.5 }}>
                Roughly 3 months per paper is the standard tuition pace. No date yet? Skip it — I'll pace you by mastery instead.
              </p>
            </div>

            <Primary disabled={picked.length === 0} onClick={() => setStep(3)}>Continue</Primary>
          </Slide>
        )}

        {/* 3 — shield time */}
        {step === 3 && (
          <Slide key="s3">
            <h2 style={h2}>🛡️ Your shield time</h2>
            <p style={sub}>
              The students who pass don't find time — they protect it. Pick the daily slot that's yours,
              and how long you'll show up for. I'll build the plan around it.
            </p>

            <div style={{ ...card({ padding: 18, marginBottom: 14 }) }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 8 }}>⏰ Same time, every day</div>
              <input
                type="time"
                value={studyTime}
                onChange={(e) => setStudyTime(e.target.value)}
                style={{ width: "100%", boxSizing: "border-box", padding: "13px 16px", borderRadius: 12, border: `1px solid ${BORDER}`, background: "var(--sch-bg)", color: TEXT, fontSize: 17, fontWeight: 700, colorScheme: "dark light" }}
              />
            </div>

            <div style={{ ...card({ padding: 18, marginBottom: 22 }) }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 10 }}>How long can you protect?</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {[15, 25, 40, 60].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMinutes(m)}
                    style={{ padding: "12px 0", borderRadius: 12, border: `1.5px solid ${minutes === m ? RED : BORDER}`, background: minutes === m ? "rgba(200,0,0,0.07)" : CARD, color: minutes === m ? RED : TEXT, fontWeight: 750, fontSize: 14, cursor: "pointer" }}
                  >
                    {m}m
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 12, color: DIM, margin: "10px 0 0", lineHeight: 1.5 }}>
                {minutes >= 60 ? "Serious pace — enough for two papers." : minutes >= 40 ? "Strong pace — steady mastery every week." : minutes >= 25 ? "The sweet spot most passers use." : "Small but daily beats big but rarely."}
              </p>
            </div>

            <Primary onClick={() => setStep(4)}>Build my plan →</Primary>
          </Slide>
        )}

        {/* 4 — plan reveal */}
        {step === 4 && picked.length > 0 && (
          <Slide key="s4">
            <PlanReveal
              paperIds={picked}
              examDate={examDate}
              studyTime={studyTime}
              minutes={minutes}
              onStart={finish}
            />
          </Slide>
        )}
      </AnimatePresence>
    </div>
  )
}

function PlanReveal({
  paperIds, examDate, studyTime, minutes, onStart,
}: { paperIds: string[]; examDate: string; studyTime: string; minutes: number; onStart: () => void }) {
  // Persist the primary paper's plan first so the generator can read it.
  useMemo(() => {
    if (examDate) setPlan(paperIds[0], { examDate })
  }, [paperIds, examDate])
  const plan = generateStudyPlan(paperIds[0])
  const two = paperIds.length === 2

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 46, marginBottom: 8 }}>✨</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: TEXT, margin: "0 0 6px" }}>Your personalised plan</h2>
        <p style={{ color: MUTED, fontSize: 14.5, margin: 0 }}>
          {plan.hasDate && plan.daysLeft
            ? <>{plan.daysLeft} days to go · {minutes} min at {studyTime}, every day.</>
            : <>{minutes} min at {studyTime}, every day — paced by mastery until you set a date.</>}
        </p>
      </div>

      {two && (
        <div style={{ ...card({ padding: 14, marginBottom: 12 }), display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 20 }}>📚</span>
          <span style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>
            Two papers ({paperIds.join(" + ")}): alternate them day by day — I'll keep both plans and both study paths on track.
          </span>
        </div>
      )}

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
                <div style={{ fontSize: 12.5, color: RED, margin: "1px 0 4px" }}>{ph.range}</div>
                <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>{ph.focus}</div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10, marginBottom: 22 }}>
          {METHOD_PHASES.map((m, i) => (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 * i }}
              style={{ ...card({ padding: 16 }), display: "flex", gap: 14 }}
            >
              <span style={{ fontSize: 24, flexShrink: 0 }}>{m.emoji}</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 750, fontSize: 15, color: TEXT }}>
                  {i + 1}. {m.label}
                </span>
                <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.5, marginTop: 3 }}>{m.goal}</div>
              </div>
            </motion.div>
          ))}
          <p style={{ margin: "4px 0 0", color: MUTED, fontSize: 12.5, lineHeight: 1.55 }}>
            This is how I'll coach you through every paper — topic by topic, each one gated by a knowledge check,
            finishing with full mocks. Add your exam date anytime for a dated, day-by-day plan.
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
