import { Link, useLocation } from "react-router-dom"
import { motion } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"

/*
 * Shared placeholder for dashboard sections not built yet
 * (/progress, /goals, /achievements, /settings). Keeps the sidebar
 * navigation working until each screen is built in a later prompt.
 */

const TITLES: Record<string, { emoji: string; name: string; blurb: string }> = {
  "/progress": { emoji: "📈", name: "Progress", blurb: "Charts, streak history and weekly focus minutes." },
  "/goals": { emoji: "🎯", name: "My Goals", blurb: "Manage your goals and let Lara rebuild your plan." },
  "/achievements": { emoji: "🏆", name: "Achievements", blurb: "Badges, milestones and your Life Shields." },
  "/settings": { emoji: "⚙️", name: "Settings", blurb: "Account, notifications and your subscription." },
}

export default function ComingSoon() {
  const { pathname } = useLocation()
  const info = TITLES[pathname] ?? { emoji: "✦", name: "Coming soon", blurb: "This section is on the way." }

  return (
    <div
      className="min-h-[100dvh] w-full flex items-center justify-center px-6"
      style={{ background: "var(--sch-bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 380, width: "100%", textAlign: "center" }}
      >
        <div style={{ fontSize: 48, lineHeight: 1 }}>{info.emoji}</div>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "var(--sch-text)",
            marginTop: 16,
            letterSpacing: "-0.5px",
          }}
        >
          {info.name}
        </h1>
        <p style={{ fontSize: 14, color: "var(--sch-tx-2)", marginTop: 8, lineHeight: 1.6 }}>
          {info.blurb}
        </p>
        <p style={{ fontSize: 12, color: "rgba(139,92,246,0.7)", marginTop: 14, fontWeight: 600 }}>
          Coming soon
        </p>
        <Link
          to="/dashboard"
          style={{
            display: "inline-block",
            marginTop: 24,
            padding: "12px 24px",
            borderRadius: 12,
            background: IRIDESCENT,
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          ← Back to Today
        </Link>
      </motion.div>
    </div>
  )
}
