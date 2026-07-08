import { useMemo, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { iriText } from "@/components/dashboard-layout"
import { Icon, IconBadge, Button, C, GRAD, type IconName } from "@/components/acca/ui"
import {
  paperLevels,
  suggestedNextPapers,
  qualificationProgress,
  setPassedPapers,
  setStudyingPapers,
} from "@/lib/acca-qualification"
import { setPlan, generateStudyPlan, METHOD_PHASES } from "@/lib/acca-plan"
import { EXPERIENCE_OPTIONS, setExperience, type Experience } from "@/lib/acca-profile"

/*
 * Guided first-run for /study, in Lara's voice. Five steps:
 *   1. Welcome
 *   2. Your ACCA record — mark the exams you've passed (self-reported myACCA)
 *   3. Which paper(s) next (1–2) + exam date (3/6-month presets or exact)
 *   4. Shield time — the protected daily study slot + minutes commitment
 *   5. Personalised plan reveal
 * Shown once (the parent tracks the localStorage flag).
 */

const TEXT = C.text
const MUTED = C.soft
const DIM = C.faint
const CARD = C.card
const BORDER = C.border
const RED = C.brand

/** Method phase (learn/strengthen/revise/rehearse) → semantic Lucide icon. */
const PHASE_ICON: Record<string, IconName> = {
  Learn: "learn",
  Strengthen: "weak",
  Revise: "flashcards",
  Rehearse: "mock",
}
const phaseIcon = (label: string): IconName => PHASE_ICON[label] ?? "learn"

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
  const [exp, setExp] = useState<Experience | null>(null)

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
    if (exp) setExperience(exp)
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
          <div key={s} style={{ width: s === step ? 22 : 7, height: 7, borderRadius: 999, background: s <= step ? RED : "var(--sch-card-2)", transition: "width .2s ease, background .2s ease" }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* 0 — welcome */}
        {step === 0 && (
          <Slide key="s0">
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <IconBadge name="study" tone="brand" size={64} />
              </div>
              <h1 style={{ fontSize: 27, fontWeight: 800, color: TEXT, margin: "0 0 10px" }}>
                Hi, I'm <span style={iriText}>Lara</span> — your ACCA coach
              </h1>
              <p style={{ color: MUTED, fontSize: 15.5, lineHeight: 1.6, margin: "0 0 28px" }}>
                I'll take you all the way from Applied Knowledge to Strategic Professional — topic by topic,
                the way the top tuition providers teach, with a plan built around your exam date and your day.
              </p>
              <Button variant="primary" size="lg" full onClick={() => setStep(1)}>Let's go</Button>
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
                          style={{ padding: "8px 14px", borderRadius: 999, border: `1.5px solid ${on ? RED : BORDER}`, background: on ? C.brandSoft : CARD, color: on ? RED : TEXT, fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "border-color .15s ease, background .15s ease, color .15s ease" }}
                        >
                          {on && <Icon name="done" size={14} color={RED} />}{p.id}
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
                  <>You've passed <strong style={{ color: TEXT }}>{qual.passedCount}</strong> of 13 exams — <strong style={{ ...iriText }}>{qual.percent}%</strong> qualified. Keep going!</>
                ) : (
                  <>Just starting out? Perfect — everyone begins at Applied Knowledge.</>
                )}
              </span>
            </div>
            <Button variant="primary" size="lg" full onClick={() => setStep(2)}>Continue</Button>
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <Button variant="ghost" onClick={() => setStep(2)}>I'll do this later</Button>
            </div>
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
                    style={{ ...card({ cursor: "pointer", textAlign: "left", border: `1.5px solid ${on ? RED : BORDER}`, padding: 14 }), display: "flex", alignItems: "center", gap: 12, transition: "border-color .15s ease" }}
                  >
                    <div style={{ width: 42, height: 42, borderRadius: 11, background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", flexShrink: 0, fontSize: 14 }}>{p.id}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14.5, color: TEXT }}>{p.name}</div>
                      <div style={{ color: DIM, fontSize: 12 }}>{p.code} · {p.level}</div>
                    </div>
                    {on && <Icon name="done" size={18} color={RED} />}
                  </button>
                )
              })}
            </div>

            <div style={{ marginBottom: 22 }}>
              <FieldLabel icon="calendar">When's the exam?</FieldLabel>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                {([3, 6] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => pickPreset(m)}
                    style={{ flex: 1, padding: "11px 0", borderRadius: 12, border: `1.5px solid ${preset === m ? RED : BORDER}`, background: preset === m ? C.brandSoft : CARD, color: preset === m ? RED : TEXT, fontWeight: 700, fontSize: 13.5, cursor: "pointer", transition: "border-color .15s ease, background .15s ease, color .15s ease" }}
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

            <div style={{ marginBottom: 22 }}>
              <FieldLabel icon="roadmap">Where are you starting from?</FieldLabel>
              <div style={{ display: "grid", gap: 8 }}>
                {EXPERIENCE_OPTIONS.map((o) => {
                  const on = exp === o.value
                  return (
                    <button
                      key={o.value}
                      onClick={() => setExp(o.value)}
                      style={{ ...card({ cursor: "pointer", textAlign: "left", border: `1.5px solid ${on ? RED : BORDER}`, padding: "12px 14px", background: on ? C.brandSoft : CARD }), display: "flex", alignItems: "center", gap: 11, transition: "border-color .15s ease, background .15s ease" }}
                    >
                      <span style={{ fontSize: 20, flexShrink: 0 }}>{o.emoji}</span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: "block", fontWeight: 700, fontSize: 13.5, color: on ? RED : TEXT }}>{o.label}</span>
                        <span style={{ display: "block", fontSize: 12, color: MUTED, marginTop: 1 }}>{o.blurb}</span>
                      </span>
                      {on && <Icon name="done" size={16} color={RED} />}
                    </button>
                  )
                })}
              </div>
              <p style={{ fontSize: 12, color: DIM, margin: "8px 0 0", lineHeight: 1.5 }}>
                I pitch every explanation at your level — from first principles to pure exam technique.
              </p>
            </div>

            <Button variant="primary" size="lg" full disabled={picked.length === 0} onClick={() => setStep(3)}>Continue</Button>
          </Slide>
        )}

        {/* 3 — shield time */}
        {step === 3 && (
          <Slide key="s3">
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <IconBadge name="shield" tone="brand" size={52} />
            </div>
            <h2 style={h2}>Your shield time</h2>
            <p style={sub}>
              The students who pass don't find time — they protect it. Pick the daily slot that's yours,
              and how long you'll show up for. I'll build the plan around it.
            </p>

            <div style={{ ...card({ padding: 18, marginBottom: 14 }) }}>
              <FieldLabel icon="mock">Same time, every day</FieldLabel>
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
                    style={{ padding: "12px 0", borderRadius: 12, border: `1.5px solid ${minutes === m ? RED : BORDER}`, background: minutes === m ? C.brandSoft : CARD, color: minutes === m ? RED : TEXT, fontWeight: 750, fontSize: 14, cursor: "pointer", transition: "border-color .15s ease, background .15s ease, color .15s ease" }}
                  >
                    {m}m
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 12, color: DIM, margin: "10px 0 0", lineHeight: 1.5 }}>
                {minutes >= 60 ? "Serious pace — enough for two papers." : minutes >= 40 ? "Strong pace — steady mastery every week." : minutes >= 25 ? "The sweet spot most passers use." : "Small but daily beats big but rarely."}
              </p>
            </div>

            <Button variant="primary" size="lg" full onClick={() => setStep(4)}>
              Build my plan <Icon name="arrow" size={18} color="#fff" />
            </Button>
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
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          <IconBadge name="celebrate" tone="brand" size={52} />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: TEXT, margin: "0 0 6px" }}>Your personalised plan</h2>
        <p style={{ color: MUTED, fontSize: 14.5, margin: 0 }}>
          {plan.hasDate && plan.daysLeft
            ? <>{plan.daysLeft} days to go · {minutes} min at {studyTime}, every day.</>
            : <>{minutes} min at {studyTime}, every day — paced by mastery until you set a date.</>}
        </p>
      </div>

      {two && (
        <div style={{ ...card({ padding: 14, marginBottom: 12 }), display: "flex", gap: 12, alignItems: "center" }}>
          <IconBadge name="learn" tone="neutral" size={36} />
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
              style={{ ...card({ padding: 16 }), display: "flex", gap: 14, alignItems: "flex-start" }}
            >
              <IconBadge name={phaseIcon(ph.label)} tone="brand" size={40} />
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
              style={{ ...card({ padding: 16 }), display: "flex", gap: 14, alignItems: "flex-start" }}
            >
              <IconBadge name={phaseIcon(m.label)} tone="brand" size={40} />
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

      <Button variant="primary" size="lg" full onClick={onStart}>
        Start studying <Icon name="arrow" size={18} color="#fff" />
      </Button>
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

function FieldLabel({ icon, children }: { icon: IconName; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 700, color: TEXT, marginBottom: 8 }}>
      <Icon name={icon} size={16} color={RED} />
      {children}
    </div>
  )
}

const h2: CSSProperties = { fontSize: 23, fontWeight: 800, color: TEXT, margin: "0 0 6px", textAlign: "center" }
const sub: CSSProperties = { color: MUTED, fontSize: 14, textAlign: "center", margin: "0 0 20px", lineHeight: 1.55 }
