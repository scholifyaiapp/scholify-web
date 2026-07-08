import { useState, type CSSProperties } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import {
  Icon,
  IconBadge,
  Badge,
  Card,
  Stat,
  SectionLabel,
  C,
  SP,
  R,
  SHADOW,
  MOTION,
} from "@/components/acca/ui"
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
    if (count === 0) return C.card2
    const t = Math.min(1, count / maxCount)
    // pale → vivid brand
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
        <motion.div {...MOTION.rise}>
          <SectionLabel style={{ marginBottom: SP.xs }}>Your progress</SectionLabel>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 20px", color: C.text }}>
            ACCA <span style={iriText}>readiness</span>
          </h1>

          {/* headline stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: SP.md, marginBottom: SP.lg }}>
            <Stat
              label="Day streak"
              value={
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Icon name="streak" size={18} color={C.amber} />
                  {overall.streak}
                </span>
              }
            />
            <Stat label="Answered" value={`${overall.totalAnswered}`} />
            <Stat label="Accuracy" value={overall.totalAnswered ? `${Math.round(overall.accuracy * 100)}%` : "—"} accent />
          </div>

          {/* daily goal */}
          <Card style={{ marginBottom: SP.lg }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: SP.md }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: C.text }}>Daily goal</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 13,
                  color: today.goalMet ? C.green : C.soft,
                  fontWeight: 650,
                }}
              >
                {today.answered} / {goal} today
                {today.goalMet && <Icon name="done" size={15} color={C.green} />}
              </span>
            </div>
            <div style={{ display: "flex", gap: SP.sm }}>
              {[10, 15, 20, 30].map((n) => {
                const on = goal === n
                return (
                  <motion.button
                    key={n}
                    onClick={() => updateGoal(n)}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      flex: 1,
                      minHeight: 44,
                      borderRadius: R.sm,
                      border: `1.5px solid ${on ? C.brand : C.border}`,
                      background: on ? C.brandSoft : C.card,
                      color: on ? C.brand : C.text,
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: "pointer",
                      transition: "background .18s ease, border-color .18s ease, color .18s ease",
                    }}
                  >
                    {n}
                  </motion.button>
                )
              })}
            </div>
          </Card>

          {/* activity heatmap */}
          <Card style={{ marginBottom: SP.lg }}>
            <div style={{ display: "flex", alignItems: "center", gap: SP.sm, marginBottom: SP.md }}>
              <Icon name="stats" size={16} color={C.soft} />
              <span style={{ fontWeight: 700, fontSize: 14, color: C.text }}>Last {HEATMAP_DAYS} days</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {activity.map((a) => (
                <div
                  key={a.date}
                  title={`${a.date}: ${a.count} question${a.count === 1 ? "" : "s"}`}
                  style={{ width: 16, height: 16, borderRadius: 4, background: heatColor(a.count) }}
                />
              ))}
            </div>
          </Card>

          {/* qualification progress */}
          <Card style={{ marginBottom: SP.lg }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: SP.sm }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: C.text }}>Qualification progress</span>
              <span style={{ fontSize: 13, color: C.soft }}>
                <strong style={{ ...iriText }}>{qual.passedCount}</strong> / {qual.totalExams} exams · {qual.percent}%
              </span>
            </div>
            <div style={{ height: 10, background: C.card2, borderRadius: R.pill, overflow: "hidden" }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${qual.percent}%` }} style={{ height: "100%", background: IRIDESCENT, borderRadius: R.pill }} />
            </div>
            <div style={{ fontSize: 12, color: C.faint, marginTop: SP.sm, lineHeight: 1.5 }}>
              Plus the Ethics & Professional Skills Module (EPSM) and 36 months' Practical Experience (PER) to qualify as an ACCA member.
            </div>
          </Card>

          {/* qualification roadmap */}
          <SectionLabel>Your ACCA roadmap</SectionLabel>
          <p style={{ fontSize: 12.5, color: C.faint, margin: "0 0 12px", lineHeight: 1.5 }}>Tap a paper to mark it passed (your ACCA record).</p>
          <div style={{ display: "grid", gap: SP.lg, marginBottom: SP.xl }}>
            {levels.map((g) => (
              <div key={g.key}>
                <div style={{ display: "flex", alignItems: "baseline", gap: SP.sm, marginBottom: SP.sm }}>
                  <span style={{ fontSize: 12.5, fontWeight: 750, color: C.text }}>{g.label}</span>
                  {g.note && <span style={{ fontSize: 11, color: C.faint }}>· {g.note}</span>}
                </div>
                <div style={{ display: "grid", gap: SP.xs + 2 }}>
                  {g.papers.map((p) => {
                    const on = passed.has(p.id)
                    const isCurrent = current === p.id
                    const s = getPaperStats(p.id)
                    return (
                      <Card
                        key={p.id}
                        interactive
                        onClick={() => togglePassed(p.id)}
                        style={{
                          padding: "11px 14px",
                          borderColor: isCurrent ? C.brand : C.border,
                          display: "flex",
                          alignItems: "center",
                          gap: SP.md,
                        }}
                      >
                        <span
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: R.sm,
                            background: on ? C.greenSoft : C.card2,
                            color: on ? C.green : C.faint,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 800,
                            fontSize: 12,
                            flexShrink: 0,
                          }}
                        >
                          {on ? <Icon name="done" size={16} color={C.green} /> : p.id.slice(0, 2)}
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 650, fontSize: 13.5, color: C.text }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: C.faint }}>{p.code}</div>
                        </div>
                        {isCurrent && !on && <Badge tone="brand">Studying</Badge>}
                        {!on && !isCurrent && s.answered > 0 && <span style={{ fontSize: 12, fontWeight: 700, ...iriText }}>{s.readiness}%</span>}
                        {on && <span style={{ fontSize: 12, color: C.green, fontWeight: 700 }}>Passed</span>}
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* membership requirements (EPSM + PER) */}
          <SectionLabel>Membership requirements</SectionLabel>
          <p style={{ fontSize: 12.5, color: C.faint, margin: "0 0 12px", lineHeight: 1.5 }}>
            Beyond the exams, ACCA membership needs the Ethics module and practical experience.
          </p>

          {/* EPSM */}
          <Card style={{ marginBottom: SP.md - 2 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: SP.md, gap: SP.md }}>
              <div style={{ display: "flex", alignItems: "center", gap: SP.md, minWidth: 0 }}>
                <IconBadge name="shield" tone="brand" size={40} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>Ethics & Professional Skills (EPSM)</div>
                  <div style={{ fontSize: 12, color: C.soft, marginTop: 2 }}>{EPSM_LABEL[journey.epsm]}</div>
                </div>
              </div>
              {journey.epsm === "complete" && <Icon name="done" size={22} color={C.green} />}
            </div>
            <div style={{ display: "flex", gap: SP.sm }}>
              {(["not_started", "in_progress", "complete"] as EpsmStatus[]).map((s) => {
                const on = journey.epsm === s
                return (
                  <motion.button
                    key={s}
                    onClick={() => updateJourney({ epsm: s })}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      flex: 1,
                      minHeight: 44,
                      borderRadius: R.sm,
                      border: `1.5px solid ${on ? C.brand : C.border}`,
                      background: on ? C.brandSoft : C.card,
                      color: on ? C.brand : C.text,
                      fontWeight: 650,
                      fontSize: 12.5,
                      cursor: "pointer",
                      transition: "background .18s ease, border-color .18s ease, color .18s ease",
                    }}
                  >
                    {EPSM_LABEL[s]}
                  </motion.button>
                )
              })}
            </div>
          </Card>

          {/* PER */}
          <Card style={{ marginBottom: SP.xl }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: SP.md }}>
              <div style={{ display: "flex", alignItems: "center", gap: SP.md }}>
                <IconBadge name="roadmap" tone="amber" size={40} />
                <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>Practical Experience (PER)</div>
              </div>
              {perComplete(journey) && <Icon name="done" size={22} color={C.green} />}
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
            <div style={{ fontSize: 11.5, color: C.faint, marginTop: SP.md - 2, lineHeight: 1.5 }}>
              9 objectives to achieve (5 Essentials + 4 Technical), verified by a workplace mentor.
            </div>
          </Card>

          <Link
            to="/study"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: SP.sm,
              minHeight: 44,
              padding: 15,
              borderRadius: R.lg,
              border: `1px solid ${C.border}`,
              background: C.card,
              color: C.text,
              fontWeight: 650,
              fontSize: 15,
              textDecoration: "none",
              boxShadow: SHADOW.sm,
            }}
          >
            <Icon name="arrow" size={18} style={{ transform: "rotate(180deg)" }} />
            Back to study
          </Link>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}

function Stepper({ label, value, max, step, onChange }: { label: string; value: number; max: number; step: number; onChange: (v: number) => void }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  const btn: CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: R.sm,
    border: `1px solid ${C.border}`,
    background: C.card,
    color: C.text,
    fontWeight: 800,
    fontSize: 18,
    cursor: "pointer",
    flexShrink: 0,
    lineHeight: 1,
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: SP.sm }}>
        <span style={{ fontSize: 13, color: C.text }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: pct >= 100 ? C.green : C.soft }}>{value} / {max}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: SP.md - 2 }}>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => onChange(Math.max(0, value - step))} style={btn} aria-label="decrease">−</motion.button>
        <div style={{ flex: 1, height: 8, background: C.card2, borderRadius: R.pill, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: pct >= 100 ? C.green : C.brand, borderRadius: R.pill }} />
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => onChange(Math.min(max, value + step))} style={btn} aria-label="increase">+</motion.button>
      </div>
    </div>
  )
}
