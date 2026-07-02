import { useState, type CSSProperties } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import {
  getPaperStats,
  getOverallProgress,
  getTodayStats,
  getDailyActivity,
  getDailyGoal,
  setDailyGoal,
} from "@/lib/acca"
import {
  paperLevels,
  qualificationProgress,
  getPassedPapers,
  setPassedPapers,
  getCurrentPaper,
} from "@/lib/acca-qualification"
import {
  getJourney,
  setJourney,
  perComplete,
  EPSM_LABEL,
  PER_TARGET_MONTHS,
  PER_TARGET_OBJECTIVES,
  type EpsmStatus,
} from "@/lib/acca-journey"

/* /study/progress — ACCA progress: activity, readiness per paper, mastery. */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"
const CARD = "var(--sch-card)"
const BORDER = "var(--sch-border)"

function card(extra?: CSSProperties): CSSProperties {
  return { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 20, ...extra }
}

const HEATMAP_DAYS = 35

export default function AccaProgress() {
  const overall = getOverallProgress()
  const today = getTodayStats()
  const activity = getDailyActivity(HEATMAP_DAYS)
  const [goal, setGoal] = useState(getDailyGoal())
  const [passed, setPassed] = useState<Set<string>>(() => new Set(getPassedPapers()))
  const [journey, setJourneyState] = useState(() => getJourney())
  const current = getCurrentPaper()

  function updateJourney(patch: Parameters<typeof setJourney>[0]) {
    setJourneyState(setJourney(patch))
  }
  const levels = paperLevels()
  const qual = qualificationProgress([...passed])

  function togglePassed(id: string) {
    setPassed((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      setPassedPapers([...n])
      return n
    })
  }

  const maxCount = Math.max(1, ...activity.map((a) => a.count))

  function heatColor(count: number): string {
    if (count === 0) return "var(--sch-card-2)"
    const t = Math.min(1, count / maxCount)
    // pale → vivid purple
    const alpha = 0.25 + 0.65 * t
    return `rgba(200,0,0,${alpha.toFixed(2)})`
  }

  function updateGoal(n: number) {
    setGoal(n)
    setDailyGoal(n)
  }

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "8px 0 40px" }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p style={{ color: DIM, fontSize: 13, fontWeight: 600, letterSpacing: 0.4, margin: "0 0 6px" }}>YOUR PROGRESS</p>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 20px", color: TEXT }}>
            ACCA <span style={iriText}>readiness</span>
          </h1>

          {/* headline stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
            <Stat label="Day streak" value={`🔥 ${overall.streak}`} />
            <Stat label="Answered" value={`${overall.totalAnswered}`} />
            <Stat label="Accuracy" value={overall.totalAnswered ? `${Math.round(overall.accuracy * 100)}%` : "—"} accent />
          </div>

          {/* daily goal */}
          <div style={card({ marginBottom: 16 })}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: TEXT }}>Daily goal</span>
              <span style={{ fontSize: 13, color: today.goalMet ? "#10B981" : MUTED, fontWeight: 650 }}>
                {today.answered} / {goal} today {today.goalMet && "✓"}
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[10, 15, 20, 30].map((n) => (
                <button
                  key={n}
                  onClick={() => updateGoal(n)}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    borderRadius: 10,
                    border: `1.5px solid ${goal === n ? "#C80000" : BORDER}`,
                    background: goal === n ? "rgba(200,0,0,0.06)" : CARD,
                    color: goal === n ? "#C80000" : TEXT,
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* activity heatmap */}
          <div style={card({ marginBottom: 16 })}>
            <div style={{ fontWeight: 700, fontSize: 14, color: TEXT, marginBottom: 12 }}>Last {HEATMAP_DAYS} days</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {activity.map((a) => (
                <div
                  key={a.date}
                  title={`${a.date}: ${a.count} question${a.count === 1 ? "" : "s"}`}
                  style={{ width: 16, height: 16, borderRadius: 4, background: heatColor(a.count) }}
                />
              ))}
            </div>
          </div>

          {/* qualification progress */}
          <div style={card({ marginBottom: 16 })}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: TEXT }}>Qualification progress</span>
              <span style={{ fontSize: 13, color: MUTED }}>
                <strong style={{ ...iriText }}>{qual.passedCount}</strong> / {qual.totalExams} exams · {qual.percent}%
              </span>
            </div>
            <div style={{ height: 10, background: "var(--sch-card-2)", borderRadius: 999, overflow: "hidden" }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${qual.percent}%` }} style={{ height: "100%", background: IRIDESCENT, borderRadius: 999 }} />
            </div>
            <div style={{ fontSize: 12, color: DIM, marginTop: 8, lineHeight: 1.5 }}>
              Plus the Ethics & Professional Skills Module (EPSM) and 36 months' Practical Experience (PER) to qualify as an ACCA member.
            </div>
          </div>

          {/* qualification roadmap */}
          <h3 style={sectionH}>YOUR ACCA ROADMAP</h3>
          <p style={{ fontSize: 12.5, color: DIM, margin: "0 0 12px", lineHeight: 1.5 }}>Tap a paper to mark it passed (your ACCA record).</p>
          <div style={{ display: "grid", gap: 18, marginBottom: 20 }}>
            {levels.map((g) => (
              <div key={g.key}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 750, color: TEXT }}>{g.label}</span>
                  {g.note && <span style={{ fontSize: 11, color: DIM }}>· {g.note}</span>}
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  {g.papers.map((p) => {
                    const on = passed.has(p.id)
                    const isCurrent = current === p.id
                    const s = getPaperStats(p.id)
                    return (
                      <div
                        key={p.id}
                        onClick={() => togglePassed(p.id)}
                        style={{ ...card({ padding: "11px 14px", cursor: "pointer", border: `1px solid ${isCurrent ? "#C80000" : BORDER}` }), display: "flex", alignItems: "center", gap: 12 }}
                      >
                        <span style={{ width: 26, height: 26, borderRadius: 8, background: on ? "rgba(16,185,129,0.15)" : "var(--sch-card-2)", color: on ? "#10B981" : DIM, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>
                          {on ? "✓" : p.id.slice(0, 2)}
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 650, fontSize: 13.5, color: TEXT }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: DIM }}>{p.code}</div>
                        </div>
                        {isCurrent && !on && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, background: "rgba(200,0,0,0.08)", color: "#C80000", fontWeight: 700 }}>STUDYING</span>}
                        {!on && !isCurrent && s.answered > 0 && <span style={{ fontSize: 12, fontWeight: 700, ...iriText }}>{s.readiness}%</span>}
                        {on && <span style={{ fontSize: 12, color: "#10B981", fontWeight: 700 }}>Passed</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* membership requirements (EPSM + PER) */}
          <h3 style={sectionH}>MEMBERSHIP REQUIREMENTS</h3>
          <p style={{ fontSize: 12.5, color: DIM, margin: "0 0 12px", lineHeight: 1.5 }}>
            Beyond the exams, ACCA membership needs the Ethics module and practical experience.
          </p>

          {/* EPSM */}
          <div style={card({ marginBottom: 10 })}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 10 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: TEXT }}>🧭 Ethics & Professional Skills (EPSM)</div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{EPSM_LABEL[journey.epsm]}</div>
              </div>
              {journey.epsm === "complete" && <span style={{ fontSize: 20 }}>✅</span>}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {(["not_started", "in_progress", "complete"] as EpsmStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => updateJourney({ epsm: s })}
                  style={{ flex: 1, padding: "9px 0", borderRadius: 10, border: `1.5px solid ${journey.epsm === s ? "#C80000" : BORDER}`, background: journey.epsm === s ? "rgba(200,0,0,0.06)" : CARD, color: journey.epsm === s ? "#C80000" : TEXT, fontWeight: 650, fontSize: 12.5, cursor: "pointer" }}
                >
                  {EPSM_LABEL[s]}
                </button>
              ))}
            </div>
          </div>

          {/* PER */}
          <div style={card({ marginBottom: 20 })}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: TEXT }}>💼 Practical Experience (PER)</div>
              {perComplete(journey) && <span style={{ fontSize: 20 }}>✅</span>}
            </div>
            <Stepper
              label="Months of experience"
              value={journey.perMonths}
              max={PER_TARGET_MONTHS}
              step={1}
              onChange={(v) => updateJourney({ perMonths: v })}
            />
            <div style={{ height: 10 }} />
            <Stepper
              label="Performance objectives"
              value={journey.perObjectives}
              max={PER_TARGET_OBJECTIVES}
              step={1}
              onChange={(v) => updateJourney({ perObjectives: v })}
            />
            <div style={{ fontSize: 11.5, color: DIM, marginTop: 10, lineHeight: 1.5 }}>
              9 objectives to achieve (5 Essentials + 4 Technical), verified by a workplace mentor.
            </div>
          </div>

          <Link to="/study" style={{ display: "block", textAlign: "center", padding: 15, borderRadius: 14, border: `1px solid ${BORDER}`, background: CARD, color: TEXT, fontWeight: 650, fontSize: 15, textDecoration: "none" }}>
            ← Back to study
          </Link>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}

function Stepper({ label, value, max, step, onChange }: { label: string; value: number; max: number; step: number; onChange: (v: number) => void }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  const btn: CSSProperties = { width: 34, height: 34, borderRadius: 9, border: `1px solid ${BORDER}`, background: CARD, color: TEXT, fontWeight: 800, fontSize: 18, cursor: "pointer", flexShrink: 0, lineHeight: 1 }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: TEXT }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: pct >= 100 ? "#10B981" : MUTED }}>{value} / {max}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={() => onChange(Math.max(0, value - step))} style={btn} aria-label="decrease">−</button>
        <div style={{ flex: 1, height: 8, background: "var(--sch-card-2)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: pct >= 100 ? "#10B981" : "#C80000", borderRadius: 999 }} />
        </div>
        <button onClick={() => onChange(Math.min(max, value + step))} style={btn} aria-label="increase">+</button>
      </div>
    </div>
  )
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={card({ padding: 14, textAlign: "center" })}>
      <div style={{ fontWeight: 800, fontSize: 20, ...(accent ? iriText : { color: TEXT }) }}>{value}</div>
      <div style={{ color: DIM, fontSize: 11, marginTop: 2 }}>{label}</div>
    </div>
  )
}

const sectionH: CSSProperties = { fontSize: 13, fontWeight: 700, color: DIM, letterSpacing: 0.4, margin: "0 0 10px" }
