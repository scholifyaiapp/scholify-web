import { useState, type CSSProperties } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import {
  getPapers,
  getPaperStats,
  getOverallProgress,
  getTodayStats,
  getDailyActivity,
  getDailyGoal,
  setDailyGoal,
} from "@/lib/acca"
import { readinessBand } from "@/lib/acca-plan"
import { flashcardStats } from "@/lib/acca-flashcards"

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
  const papers = getPapers()
  const overall = getOverallProgress()
  const today = getTodayStats()
  const activity = getDailyActivity(HEATMAP_DAYS)
  const [goal, setGoal] = useState(getDailyGoal())

  const maxCount = Math.max(1, ...activity.map((a) => a.count))

  function heatColor(count: number): string {
    if (count === 0) return "var(--sch-card-2)"
    const t = Math.min(1, count / maxCount)
    // pale → vivid purple
    const alpha = 0.25 + 0.65 * t
    return `rgba(167,139,250,${alpha.toFixed(2)})`
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
                    border: `1.5px solid ${goal === n ? "#A78BFA" : BORDER}`,
                    background: goal === n ? "rgba(167,139,250,0.1)" : CARD,
                    color: goal === n ? "#A78BFA" : TEXT,
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

          {/* per-paper readiness */}
          <h3 style={sectionH}>PAPERS</h3>
          <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
            {papers.map((p) => {
              const s = getPaperStats(p.id)
              const band = readinessBand(s.readiness)
              const fc = flashcardStats(p.id)
              return (
                <Link key={p.id} to="/study" style={{ textDecoration: "none" }}>
                  <motion.div whileHover={{ y: -2 }} style={card({ cursor: "pointer" })}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontWeight: 750, fontSize: 15, color: TEXT }}>{p.name}</div>
                        <div style={{ fontSize: 12, color: DIM }}>{p.code}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 800, fontSize: 20, ...iriText }}>{s.readiness}%</div>
                        <div style={{ fontSize: 11, color: band.color, fontWeight: 600 }}>{band.label}</div>
                      </div>
                    </div>
                    <div style={{ height: 8, background: "var(--sch-card-2)", borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${s.readiness}%`, background: band.color, borderRadius: 999 }} />
                    </div>
                    <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12, color: MUTED }}>
                      <span>{s.answered} answered</span>
                      <span>{s.answered ? Math.round(s.accuracy * 100) : 0}% accuracy</span>
                      <span>🧠 {fc.mastered}/{fc.total} cards</span>
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </div>

          <Link to="/study" style={{ display: "block", textAlign: "center", padding: 15, borderRadius: 14, border: `1px solid ${BORDER}`, background: CARD, color: TEXT, fontWeight: 650, fontSize: 15, textDecoration: "none" }}>
            ← Back to study
          </Link>
        </motion.div>
      </div>
    </DashboardLayout>
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
