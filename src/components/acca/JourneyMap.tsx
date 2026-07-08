import type { CSSProperties } from "react"
import { motion } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import { getPaper, getMockHistory } from "@/lib/acca"
import { getJourneyStages, MOCK_GATE, MOCK_PASS, MOCKS_REQUIRED, type JourneyStage } from "@/lib/acca-loop"
import { Icon, type IconName } from "@/components/acca/ui"

const STAGE_ICON: Record<string, IconName> = {
  onboarding: "study",
  diagnostic: "diagnostic",
  roadmap: "roadmap",
  missions: "mission",
  progress: "stats",
  mock: "mock",
  exam: "exam",
  recovery: "reflect",
  next: "loop",
}

/*
 * The journey loop, made visible — the full arc of one paper:
 * onboarding → diagnostic → roadmap → daily missions → progress check →
 * the 60% gate → mock → real exam → pass/fail fork → next paper, and around
 * again. Every node's status is derived from the learner's real data.
 */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"
const CARD = "var(--sch-card)"
const BORDER = "var(--sch-border)"
const RED = "#C80000"
const GREEN = "#10B981"

function card(extra?: CSSProperties): CSSProperties {
  return { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 20, ...extra }
}

function nodeVisual(s: JourneyStage): { fill: string; content: React.ReactNode; dim: boolean } {
  const icon = STAGE_ICON[s.key] ?? "study"
  if (s.status === "done")
    return { fill: "rgba(16,185,129,0.12)", content: <Icon name="done" size={18} color={GREEN} />, dim: false }
  if (s.status === "current")
    return { fill: IRIDESCENT, content: <Icon name={icon} size={17} color="#fff" />, dim: false }
  if (s.status === "locked")
    return { fill: "var(--sch-card-2)", content: <Icon name="lock" size={14} color={DIM} />, dim: true }
  return { fill: "var(--sch-card-2)", content: <Icon name={icon} size={16} color={MUTED} style={{ opacity: 0.75 }} />, dim: true }
}

/** The Mock 1 → 2 → 3 slots — the last three sittings, oldest first. */
function MockChips({ paperId }: { paperId: string }) {
  const recent = getMockHistory(paperId).slice(0, MOCKS_REQUIRED).reverse()
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
      {Array.from({ length: MOCKS_REQUIRED }, (_, i) => {
        const m = recent[i]
        const passed = m ? m.percent >= MOCK_PASS : null
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.08 }}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: 10,
              textAlign: "center",
              border: `1.5px solid ${m ? (passed ? GREEN : "#EF4444") : BORDER}`,
              background: m ? (passed ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.06)") : "var(--sch-card-2)",
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.4, color: m ? (passed ? GREEN : "#EF4444") : DIM }}>
              MOCK {i + 1}
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 750, color: m ? TEXT : DIM, marginTop: 2 }}>
              {m ? `${m.percent}%${passed ? " ✓" : ""}` : "—"}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function JourneyMap({ paperId, onBack }: { paperId: string; onBack: () => void }) {
  const paper = getPaper(paperId)
  const stages = getJourneyStages(paperId)
  const current = stages.find((s) => s.status === "current")

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "none", border: "none", color: MUTED, cursor: "pointer", fontSize: 14, padding: "6px 4px", marginBottom: 10, marginLeft: -4 }}>
        <Icon name="chevron" size={16} color={MUTED} style={{ transform: "rotate(180deg)" }} />
        {paper?.id ?? "Paper"} overview
      </button>
      <p style={{ color: DIM, fontSize: 13, fontWeight: 600, letterSpacing: 0.4, margin: "0 0 6px" }}>
        {paper?.id} · THE LOOP
      </p>
      <h1 style={{ fontSize: 27, fontWeight: 800, margin: "0 0 6px", color: TEXT }}>
        Your <span style={iriText}>journey loop</span>
      </h1>
      <p style={{ color: MUTED, margin: "0 0 20px", fontSize: 14.5, lineHeight: 1.55 }}>
        One closed loop per paper — from diagnostic to the real exam and around again. You're at:{" "}
        <b style={{ color: RED }}>{current?.label ?? "the finish line"}</b>.
      </p>

      {/* the loop, stage by stage */}
      <div>
        {stages.map((s, i) => {
          const v = nodeVisual(s)
          const isLast = i === stages.length - 1
          const active = s.status === "current"
          return (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{ display: "flex", gap: 14 }}
            >
              {/* node + connector */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <motion.div
                  animate={active ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: active ? Infinity : 0, ease: "easeInOut" }}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: v.fill,
                    border: s.status === "done" ? `2px solid ${GREEN}` : active ? "none" : `2px solid ${BORDER}`,
                    boxShadow: active ? "0 4px 16px rgba(200,0,0,0.35)" : "none",
                    zIndex: 1,
                  }}
                >
                  {v.content}
                </motion.div>
                {!isLast && (
                  <div
                    style={{
                      width: 2,
                      flex: 1,
                      minHeight: 26,
                      background: s.status === "done" ? GREEN : "var(--sch-border)",
                      opacity: s.status === "done" ? 0.6 : 1,
                    }}
                  />
                )}
              </div>

              {/* label + detail */}
              <div style={{ paddingBottom: isLast ? 0 : 18, flex: 1, minWidth: 0, opacity: v.dim ? 0.6 : 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", paddingTop: 8 }}>
                  <span style={{ fontWeight: active ? 800 : 700, fontSize: 14.5, color: active ? RED : TEXT }}>{s.label}</span>
                  {active && (
                    <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 0.5, padding: "2px 8px", borderRadius: 999, background: "rgba(200,0,0,0.1)", color: RED }}>
                      YOU ARE HERE
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12.5, color: MUTED, marginTop: 3, lineHeight: 1.5 }}>{s.detail}</div>

                {/* the readiness gate fork, visualised under the progress-check stage */}
                {s.key === "progress" && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
                    <div style={{ ...card({ padding: "10px 12px", borderRadius: 12 }), borderLeft: "3px solid #F59E0B" }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: "#F59E0B" }}>≤ {MOCK_GATE}% READY</div>
                      <div style={{ fontSize: 11.5, color: MUTED, marginTop: 2, lineHeight: 1.45 }}>Revision — AI adjusts your roadmap at your weak topics.</div>
                    </div>
                    <div style={{ ...card({ padding: "10px 12px", borderRadius: 12 }), borderLeft: `3px solid ${GREEN}` }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: GREEN }}>≥ {MOCK_GATE}% READY</div>
                      <div style={{ fontSize: 11.5, color: MUTED, marginTop: 2, lineHeight: 1.45 }}>The mock room unlocks — Mock 1 → 2 → 3, then the real thing.</div>
                    </div>
                  </div>
                )}

                {/* Mock 1 → 2 → 3, with the rehabilitation loop on a fail */}
                {s.key === "mock" && s.status !== "locked" && <MockChips paperId={paperId} />}

                {/* the pass/fail fork after the real exam */}
                {s.key === "exam" && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
                    <div style={{ ...card({ padding: "10px 12px", borderRadius: 12 }), borderLeft: `3px solid ${GREEN}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 800, color: GREEN }}>
                        <Icon name="celebrate" size={13} color={GREEN} /> PASS
                      </div>
                      <div style={{ fontSize: 11.5, color: MUTED, marginTop: 2, lineHeight: 1.45 }}>Celebrate · progress updates · next paper unlocks.</div>
                    </div>
                    <div style={{ ...card({ padding: "10px 12px", borderRadius: 12 }), borderLeft: "3px solid #EF4444" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 800, color: "#EF4444" }}>
                        <Icon name="support" size={13} color="#EF4444" /> NOT YET
                      </div>
                      <div style={{ fontSize: 11.5, color: MUTED, marginTop: 2, lineHeight: 1.45 }}>Reflection session · examiner analysis · new date · new roadmap.</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* the loop closes */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: stages.length * 0.06 + 0.1 }}
        style={{ ...card({ padding: 16, marginTop: 18 }), display: "flex", alignItems: "center", gap: 12, background: "linear-gradient(135deg, rgba(200,0,0,0.05), var(--sch-card))" }}
      >
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          style={{ display: "inline-flex", flexShrink: 0 }}
        >
          <Icon name="loop" size={22} color={RED} />
        </motion.span>
        <span style={{ fontSize: 13, color: MUTED, lineHeight: 1.55 }}>
          Then the loop restarts on your next paper — the same machine, paper after paper, until all 13 exams are
          behind you and it reads <b style={{ color: TEXT }}>ACCA ✓</b>.
        </span>
      </motion.div>
    </motion.div>
  )
}
