import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { useAuth } from "@/lib/auth"
import { IRIDESCENT } from "@/components/auth/auth-ui"

/*
 * Lightweight onboarding interstitial shown right after sign-up.
 * Kept minimal on purpose — the full "Your goal" / "Your plan" flow
 * will be built in a later prompt. For now it welcomes the new user
 * and hands them off to the dashboard so the journey is unbroken.
 */
export default function Onboarding() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const firstName = (user?.user_metadata?.first_name as string) || ""

  return (
    <div
      className="min-h-[100dvh] w-full flex items-center justify-center px-6"
      style={{ background: "linear-gradient(135deg,#0D0015,#120820)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 440, width: "100%", textAlign: "center" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 56,
            lineHeight: 1,
            background: IRIDESCENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            margin: "0 auto",
            width: "fit-content",
          }}
        >
          ✦
        </motion.div>

        <h1
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: "#F0EEFF",
            letterSpacing: "-1px",
            marginTop: 20,
          }}
        >
          Welcome to Scholify{firstName ? `, ${firstName}` : ""}!
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "rgba(240,238,255,0.45)",
            marginTop: 10,
            lineHeight: 1.6,
          }}
        >
          Your account is ready. Next, Lara will help you turn your goal into a
          daily plan — let's head to your dashboard to begin.
        </p>

        <motion.button
          onClick={() => navigate("/dashboard")}
          whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(139,92,246,0.4)" }}
          whileTap={{ scale: 0.98 }}
          style={{
            marginTop: 32,
            width: "100%",
            maxWidth: 280,
            height: 52,
            background: "linear-gradient(135deg,rgba(139,92,246,0.8),rgba(99,102,241,0.8))",
            border: "1px solid rgba(139,92,246,0.5)",
            borderRadius: 12,
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 0 30px rgba(139,92,246,0.25)",
          }}
        >
          Go to dashboard →
        </motion.button>
      </motion.div>
    </div>
  )
}
