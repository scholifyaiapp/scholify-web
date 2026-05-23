import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import LaraChat from "@/components/LaraChat"
import { useAuth } from "@/lib/auth"
import { readActivePlan } from "@/lib/scholify-data"
import { IRIDESCENT } from "@/components/auth/auth-ui"

/* ──────────────────────────────────────────────────────────────
 *  /chat — Ask Lara anything page.
 *
 *  Standalone full-height layout with a custom top bar; opts out
 *  of the sidebar shell so the chat fills the viewport on mobile.
 * ────────────────────────────────────────────────────────────── */

const BG = "#050508"
const TEXT = "#F0EEFF"
const TEXT_MUTED = "rgba(240,238,255,0.55)"

export default function Chat() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const plan = useMemo(readActivePlan, [])
  const [contextOn, setContextOn] = useState(true)

  const isPaid = Boolean(
    user?.user_metadata?.plan && user.user_metadata.plan !== "free",
  )

  const goalLabel = (plan?.goal || "Open chat").trim().slice(0, 36)

  const handleUpgrade = () => {
    navigate("/pricing")
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: BG,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          display: "flex",
          flexDirection: "column",
          height: "100dvh",
        }}
      >
        {/* Top bar */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 30,
            height: 64,
            padding: "0 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(10,10,16,0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              aria-label="Back"
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                color: TEXT_MUTED,
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              ←
            </motion.button>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: IRIDESCENT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 16,
                fontWeight: 800,
                position: "relative",
                flexShrink: 0,
                boxShadow: "0 0 20px rgba(139,92,246,0.3)",
              }}
            >
              L
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  right: -1,
                  bottom: -1,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#34D399",
                  border: "2px solid #050508",
                }}
              />
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 15,
                  fontWeight: 700,
                  color: TEXT,
                  lineHeight: 1.15,
                }}
              >
                Lara{" "}
                <span style={{ fontSize: 11, color: "#34D399", fontWeight: 500 }}>● Online</span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: TEXT_MUTED,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: 240,
                }}
              >
                Context: {goalLabel}
              </div>
            </div>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setContextOn((v) => !v)}
            aria-label="Toggle context"
            title={contextOn ? "Context: ON" : "Context: OFF"}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: `1px solid ${contextOn ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.08)"}`,
              background: contextOn ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.03)",
              color: contextOn ? "rgba(192,132,252,0.9)" : TEXT_MUTED,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            ⚙
          </motion.button>
        </header>

        <div style={{ flex: 1, minHeight: 0 }}>
          <LaraChat isPaid={isPaid} onUpgradeRequest={handleUpgrade} />
        </div>
      </div>
    </div>
  )
}
