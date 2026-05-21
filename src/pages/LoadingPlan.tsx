import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"

/*
 * Interstitial shown after onboarding while "Lara builds the plan".
 * Minimal for now — cycles through build messages, then hands off to
 * the dashboard. The real plan-generation will plug in here later.
 */

interface PlanState {
  goal?: string
  deadline?: string
  dailyMinutes?: number
}

const BUILD_STEPS = [
  "Analysing your goal…",
  "Breaking it into daily tasks…",
  "Spacing tasks to your deadline…",
  "Tuning to your daily time…",
  "Almost ready…",
]

export default function LoadingPlan() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state as PlanState | null) ?? {}
  const [stepIdx, setStepIdx] = useState(0)

  useEffect(() => {
    const ticker = setInterval(() => {
      setStepIdx((i) => Math.min(i + 1, BUILD_STEPS.length - 1))
    }, 900)
    const done = setTimeout(() => navigate("/dashboard", { replace: true }), 5000)
    return () => {
      clearInterval(ticker)
      clearTimeout(done)
    }
  }, [navigate])

  return (
    <div
      className="min-h-[100dvh] w-full flex items-center justify-center px-6"
      style={{ background: "linear-gradient(135deg,#0D0015,#120820)" }}
    >
      <style>{`@keyframes lp-spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
        {/* Spinning iridescent ring */}
        <div style={{ width: 88, height: 88, margin: "0 auto", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: IRIDESCENT,
              WebkitMask: "radial-gradient(farthest-side,transparent calc(100% - 5px),#000 0)",
              mask: "radial-gradient(farthest-side,transparent calc(100% - 5px),#000 0)",
              animation: "lp-spin 1.1s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              ...{
                background: IRIDESCENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              },
            }}
          >
            ✦
          </div>
        </div>

        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#F0EEFF",
            letterSpacing: "-0.5px",
            marginTop: 28,
          }}
        >
          Lara is building your plan
        </h1>

        {state.goal && (
          <p style={{ fontSize: 14, color: "rgba(240,238,255,0.4)", marginTop: 8 }}>
            {state.goal}
          </p>
        )}

        {/* Cycling build messages */}
        <div style={{ height: 22, marginTop: 20 }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: 13, color: "rgba(139,92,246,0.9)" }}
            >
              {BUILD_STEPS[stepIdx]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
