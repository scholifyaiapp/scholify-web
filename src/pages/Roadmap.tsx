import { useEffect, useMemo, useState } from "react"
import { motion } from "motion/react"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { readPlan, readProgress, type Progress, type StoredPlan } from "@/lib/scholify-data"
import RoadmapView from "@/components/RoadmapView"

/*
 * /roadmap — bird's-eye view of the entire learning journey.
 *
 * Reads the active plan + progress from local storage (same source the
 * dashboard uses) and hands them to <RoadmapView /> for the actual
 * timeline rendering.
 */

const TEXT_PRIMARY = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"
const TEXT_DIM = "var(--sch-tx-3)"

export default function Roadmap() {
  // Re-read on a custom event so a Dashboard task-complete updates the
  // roadmap in the background tab too.
  const [, setTick] = useState(0)
  useEffect(() => {
    const onChange = () => setTick((t) => t + 1)
    window.addEventListener("storage", onChange)
    window.addEventListener("scholify-plan-change", onChange)
    return () => {
      window.removeEventListener("storage", onChange)
      window.removeEventListener("scholify-plan-change", onChange)
    }
  }, [])

  const plan: StoredPlan = useMemo(readPlan, [])
  const progress: Progress = useMemo(readProgress, [])
  const tasks = Array.isArray(plan.tasks) ? plan.tasks : []
  const totalTasks = tasks.length
  const completed = progress.completed.length
  const pct = totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0
  const currentDay = Math.min(totalTasks, completed + 1)

  return (
    <DashboardLayout>
      <div style={{ padding: "24px clamp(16px, 4vw, 40px) 80px", maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}
        >
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: TEXT_PRIMARY, lineHeight: 1.2 }}>
              <span style={iriText}>Your Learning Roadmap</span>
            </h1>
            <p style={{ marginTop: 6, fontSize: 14, color: TEXT_MUTED }}>
              {totalTasks > 0
                ? `Day ${currentDay} of ${totalTasks} · ${pct}% complete`
                : "Finish onboarding to generate your roadmap."}
            </p>
          </div>
          {plan.goal && (
            <span
              style={{
                position: "relative",
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                fontSize: 12.5,
                color: TEXT_PRIMARY,
                maxWidth: 460,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: 1,
                  borderRadius: 999,
                  background: IRIDESCENT,
                  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  pointerEvents: "none",
                }}
              />
              🎯 {plan.goal}
            </span>
          )}
        </motion.div>

        {/* Empty state */}
        {totalTasks === 0 ? (
          <div
            style={{
              marginTop: 30,
              padding: 40,
              borderRadius: 22,
              background: "var(--sch-card, rgba(255,255,255,0.03))",
              border: "1px dashed var(--sch-border, rgba(255,255,255,0.08))",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 38, color: "var(--sch-tx-4)" }} aria-hidden>
              🗺️
            </p>
            <p style={{ marginTop: 10, fontSize: 15, color: TEXT_PRIMARY, fontWeight: 600 }}>
              No plan yet.
            </p>
            <p style={{ marginTop: 6, fontSize: 13, color: TEXT_MUTED, maxWidth: 420, margin: "6px auto 0" }}>
              Finish onboarding and Lara will generate your day-by-day plan. The full roadmap will
              show up here.
            </p>
            <a
              href="/dashboard"
              style={{
                display: "inline-block",
                marginTop: 18,
                padding: "10px 18px",
                borderRadius: 12,
                background: IRIDESCENT,
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                boxShadow: "0 10px 28px rgba(200,0,0,0.4)",
              }}
            >
              Back to dashboard →
            </a>
          </div>
        ) : (
          <div style={{ marginTop: 18 }}>
            <RoadmapView plan={plan} progress={progress} />
          </div>
        )}

        {/* Footer note */}
        {totalTasks > 0 && (
          <p style={{ marginTop: 28, fontSize: 11.5, color: TEXT_DIM, textAlign: "center" }}>
            Hover a task to preview · scroll horizontally to see the full journey.
          </p>
        )}
      </div>
    </DashboardLayout>
  )
}
