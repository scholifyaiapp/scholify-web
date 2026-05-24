import { useCallback, useMemo, useState, type CSSProperties } from "react"
import { motion } from "motion/react"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/Toast"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import {
  displayNameFromAuth,
  markOptInPromptShown,
  readOptIn,
  writeOptIn,
} from "@/lib/community-storage"

/*
 * Reusable opt-in prompt — used both as the empty state on /community
 * and as a one-time post-paywall card on the Dashboard.
 */

const TEXT_PRIMARY = "var(--sch-text, #F0EEFF)"
const TEXT_MUTED = "var(--sch-tx-2, rgba(240,238,255,0.6))"
const TEXT_DIM = "var(--sch-tx-3, rgba(240,238,255,0.45))"

const cardBase: CSSProperties = {
  borderRadius: 22,
  padding: 28,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
  position: "relative",
  overflow: "hidden",
}

export default function CommunityOptInCard({
  onChange,
  compact = false,
}: {
  onChange?: (optedIn: boolean) => void
  compact?: boolean
}) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [busy, setBusy] = useState(false)

  const displayName = useMemo(() => {
    const meta = (user?.user_metadata || {}) as { first_name?: string; last_name?: string }
    return displayNameFromAuth({
      firstName: meta.first_name,
      lastName: meta.last_name,
      email: user?.email || undefined,
    })
  }, [user])

  const onJoin = useCallback(() => {
    setBusy(true)
    writeOptIn({ optedIn: true, displayName }, user?.id)
    markOptInPromptShown()
    toast.success(`Welcome to the community, ${displayName}!`)
    onChange?.(true)
    setBusy(false)
  }, [displayName, user?.id, toast, onChange])

  const onSkip = useCallback(() => {
    markOptInPromptShown()
    onChange?.(false)
  }, [onChange])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={cardBase}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          background: IRIDESCENT,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>
        <p style={{ fontSize: 11.5, color: TEXT_DIM, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Optional
        </p>
        <h2
          style={{
            marginTop: 6,
            fontSize: compact ? 18 : 22,
            fontWeight: 800,
            color: TEXT_PRIMARY,
            lineHeight: 1.2,
          }}
        >
          Join the Scholify community? 🌍
        </h2>
        <p style={{ marginTop: 8, fontSize: 14, color: TEXT_MUTED, lineHeight: 1.55, maxWidth: 480 }}>
          Share your completions with other learners working toward the same goal. Only your first name
          is shown.
        </p>

        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: compact ? "1fr" : "1fr 1fr",
            gap: 12,
          }}
        >
          <Mini
            title="What's shared"
            items={[
              `"${displayName} completed Week 4 of IELTS prep"`,
              `"Day 30 milestone reached"`,
            ]}
            tone="ok"
          />
          <Mini
            title="What's NOT shared"
            items={["Your email or full name", "Your session notes or messages"]}
            tone="no"
          />
        </div>

        <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={busy}
            onClick={onJoin}
            style={{
              padding: "11px 22px",
              borderRadius: 12,
              background: IRIDESCENT,
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              border: "none",
              cursor: busy ? "default" : "pointer",
              boxShadow: "0 10px 28px rgba(167,139,250,0.4)",
              opacity: busy ? 0.7 : 1,
            }}
          >
            Join community
          </motion.button>
          <button
            onClick={onSkip}
            style={{
              padding: "11px 18px",
              borderRadius: 12,
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.08)",
              color: TEXT_MUTED,
              fontSize: 13.5,
              cursor: "pointer",
            }}
          >
            Keep private
          </button>
        </div>

        <p style={{ marginTop: 14, fontSize: 11.5, color: TEXT_DIM }}>
          You can change this any time in Settings.
        </p>
      </div>
    </motion.div>
  )
}

function Mini({
  title,
  items,
  tone,
}: {
  title: string
  items: string[]
  tone: "ok" | "no"
}) {
  const color = tone === "ok" ? "#34D399" : "#FF6B6B"
  const glyph = tone === "ok" ? "✓" : "✗"
  return (
    <div
      style={{
        padding: 14,
        borderRadius: 14,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <p style={{ fontSize: 11.5, color: TEXT_DIM, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {title}
      </p>
      <ul style={{ marginTop: 8, padding: 0, listStyle: "none", display: "grid", gap: 6 }}>
        {items.map((i, idx) => (
          <li key={idx} style={{ display: "flex", gap: 8, fontSize: 12.5, color: TEXT_PRIMARY }}>
            <span style={{ color, flexShrink: 0, fontWeight: 700 }}>{glyph}</span>
            <span style={{ color: tone === "ok" ? TEXT_PRIMARY : TEXT_MUTED }}>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function shouldShowOptInPrompt(currentStreak: number): boolean {
  const opt = readOptIn()
  if (opt.optedIn) return false
  // Per spec — trigger from day 7 onward.
  return currentStreak >= 7
}
