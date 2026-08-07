import { useEffect, useMemo } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import confetti from "canvas-confetti"
import CharlesMascot from "@/components/CharlesMascot"
import { Icon } from "@/components/acca/ui"

interface Props {
  open: boolean
  paperId: string
  paperName: string
  streak: number
  readiness: number | null
  targetReadiness: number
  daysToExam: number | null
  completedTasks: number
  onClose: () => void
  onRoadmap: () => void
}

const gradient = "linear-gradient(135deg,#C80000 0%,#E50068 48%,#F4A405 100%)"

export function DailyMissionCelebration({ open, paperId, paperName, streak, readiness, targetReadiness, daysToExam, completedTasks, onClose, onRoadmap }: Props) {
  const reduced = useReducedMotion()
  const readinessGap = readiness == null ? null : Math.max(0, targetReadiness - readiness)
  const rings = useMemo(() => [150, 210, 280, 360], [])

  useEffect(() => {
    if (!open || reduced) return
    const end = Date.now() + 2200
    const colors = ["#C80000", "#E50068", "#F4A405", "#10B981", "#FFFFFF"]
    const fire = () => {
      confetti({ particleCount: 10, angle: 60, spread: 70, origin: { x: 0, y: 0.72 }, colors, scalar: 1.1 })
      confetti({ particleCount: 10, angle: 120, spread: 70, origin: { x: 1, y: 0.72 }, colors, scalar: 1.1 })
      if (Date.now() < end) requestAnimationFrame(fire)
    }
    fire()
  }, [open, reduced])

  useEffect(() => {
    if (!open) return
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") onClose() }
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", key)
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", key) }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Today's mission completed"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: "fixed", inset: 0, zIndex: 2500, overflowY: "auto", background: "radial-gradient(circle at 50% 15%,#5b071f 0%,#20070e 38%,#080506 78%)", color: "#fff" }}
        >
          <div aria-hidden style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            {rings.map((size, index) => (
              <motion.span key={size} animate={reduced ? undefined : { rotate: index % 2 ? -360 : 360, scale: [0.96, 1.04, 0.96] }} transition={{ rotate: { duration: 18 + index * 5, repeat: Infinity, ease: "linear" }, scale: { duration: 3 + index, repeat: Infinity } }} style={{ position: "absolute", left: "50%", top: 170, width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, borderRadius: "50%", border: `1px solid rgba(244,164,5,${0.34 - index * 0.06})`, boxShadow: "0 0 45px rgba(229,0,104,.10)" }} />
            ))}
          </div>

          <button onClick={onClose} aria-label="Close celebration" style={{ position: "fixed", top: 18, right: 18, zIndex: 2, width: 42, height: 42, borderRadius: 14, border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.08)", color: "#fff", cursor: "pointer", fontSize: 22 }}>×</button>

          <div style={{ position: "relative", width: "min(680px,calc(100% - 28px))", margin: "0 auto", padding: "38px 0 48px", textAlign: "center" }}>
            <motion.div initial={reduced ? { opacity: 1 } : { opacity: 0, y: 30, scale: .75 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 150, damping: 14 }}>
              <CharlesMascot pose="celebrate" size="clamp(150px,42vw,230px)" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : .28 }}>
              <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 2.4, color: "#F4A405" }}>MISSION ACCOMPLISHED · {paperId}</div>
              <h1 style={{ margin: "8px 0 8px", fontSize: "clamp(32px,8vw,56px)", lineHeight: .98, letterSpacing: "-.045em" }}>You showed up.<br />You moved forward.</h1>
              <p style={{ margin: "0 auto", maxWidth: 520, color: "rgba(255,255,255,.72)", fontSize: 14.5, lineHeight: 1.6 }}>Today’s {paperName} mission is complete. The work is saved, your route has moved, and tomorrow’s mission will build from these results.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : .5 }} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(145px,1fr))", gap: 10, marginTop: 26 }}>
              <Metric icon="streak" value={`${Math.max(1, streak)}`} label="day streak" sub="Secured today" accent="#F4A405" pulse={!reduced} />
              <Metric icon="mission" value={`${completedTasks}`} label="tasks completed" sub="Daily loop closed" accent="#10B981" />
              <Metric icon="stats" value={readiness == null ? "Measuring" : `${readiness}%`} label="exam readiness" sub={readinessGap == null ? "More evidence tomorrow" : readinessGap === 0 ? "Target reached" : `${readinessGap} pts to target`} accent="#E50068" />
              <Metric icon="calendar" value={daysToExam == null ? "Plan" : `${daysToExam}`} label={daysToExam == null ? "route active" : "days to exam"} sub={`${targetReadiness}% target`} accent="#8B5CF6" />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : .72 }} style={{ marginTop: 14, padding: "15px 16px", borderRadius: 18, textAlign: "left", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ width: 42, height: 42, borderRadius: 13, display: "grid", placeItems: "center", background: "rgba(244,164,5,.14)" }}><Icon name="trophy" size={21} color="#F4A405" /></span>
              <div><div style={{ fontWeight: 850, fontSize: 14 }}>Earned today: Consistency Point + protected streak</div><div style={{ color: "rgba(255,255,255,.58)", fontSize: 12.5, marginTop: 3 }}>Your reward is real progress: completed work, stronger evidence, and a shorter route to the paper.</div></div>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 10, marginTop: 18 }}>
              <motion.button whileTap={{ scale: .98 }} onClick={onRoadmap} style={{ minHeight: 52, borderRadius: 15, border: 0, background: gradient, color: "#fff", fontWeight: 850, fontSize: 14.5, cursor: "pointer" }}>See my route to {paperId}</motion.button>
              <button onClick={onClose} style={{ minHeight: 52, borderRadius: 15, border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.07)", color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>Finish for today</button>
            </div>
            <div style={{ marginTop: 14, color: "rgba(255,255,255,.46)", fontSize: 11.5 }}>Come back tomorrow · one clear mission · no backlog</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Metric({ icon, value, label, sub, accent, pulse = false }: { icon: "streak" | "mission" | "stats" | "calendar"; value: string; label: string; sub: string; accent: string; pulse?: boolean }) {
  return <motion.div animate={pulse ? { boxShadow: [`0 0 0 rgba(244,164,5,0)`, `0 0 34px rgba(244,164,5,.28)`, `0 0 0 rgba(244,164,5,0)`] } : undefined} transition={{ duration: 2, repeat: Infinity }} style={{ padding: "16px 12px", borderRadius: 18, background: "rgba(255,255,255,.075)", border: "1px solid rgba(255,255,255,.12)" }}>
    <Icon name={icon} size={18} color={accent} />
    <div style={{ marginTop: 8, fontSize: 25, fontWeight: 900, letterSpacing: "-.03em" }}>{value}</div>
    <div style={{ fontSize: 11.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: .7 }}>{label}</div>
    <div style={{ marginTop: 4, color: "rgba(255,255,255,.5)", fontSize: 11 }}>{sub}</div>
  </motion.div>
}
