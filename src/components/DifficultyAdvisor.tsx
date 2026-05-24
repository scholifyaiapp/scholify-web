import { type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import {
  LEVEL_META,
  type DifficultyLevel,
  type DifficultyResult,
} from "@/lib/difficultyAnalysis"

/*
 * DifficultyAdvisor — a Lara-message-styled card that shows the result
 * of `analyzeDifficulty(...)`. Designed to drop into the onboarding
 * chat in place of a regular Lara bubble, but it works standalone too
 * (e.g. on /goals when creating a new goal).
 *
 * Renders four visual variants per level, with a colored left border,
 * an inline suggested-deadline mini-card (unrealistic), an inline
 * stretch-goal mini-card (too_easy), and a set of quick-reply chips
 * the parent dispatches on.
 */

export type AdvisorReply =
  | "proceed"
  | "use_suggested_deadline"
  | "show_safer_deadline"
  | "keep_original_deadline"
  | "edit_goal"
  | "use_stretch_goal"
  | "keep_current_goal"

interface QuickReply {
  label: string
  value: AdvisorReply
  primary?: boolean
}

const TEXT_PRIMARY = "var(--sch-text, #F0EEFF)"
const TEXT_MUTED = "var(--sch-tx-2, rgba(240,238,255,0.6))"
const TEXT_DIM = "var(--sch-tx-3, rgba(240,238,255,0.45))"

const LARA_AVATAR_SIZE = 28

export default function DifficultyAdvisor({
  result,
  loading,
  onReply,
  showAvatar = true,
}: {
  result?: DifficultyResult | null
  loading?: boolean
  onReply: (reply: AdvisorReply, result?: DifficultyResult) => void
  showAvatar?: boolean
}) {
  if (loading || !result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        style={rowStyle}
      >
        {showAvatar && <LaraAvatar />}
        <div style={bubbleStyle({ accent: "rgba(167,139,250,0.4)" })}>
          <TypingDots />
        </div>
      </motion.div>
    )
  }

  const meta = LEVEL_META[result.level]
  const quickReplies = buildReplies(result.level, result)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={rowStyle}
    >
      {showAvatar && <LaraAvatar />}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={bubbleStyle({ accent: meta.accent, subtleBg: meta.subtle })}>
          <p
            style={{
              fontSize: 14.5,
              color: TEXT_PRIMARY,
              lineHeight: 1.6,
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
            }}
          >
            <span aria-hidden style={{ fontSize: 16, lineHeight: 1.25 }}>
              {meta.glyph}
            </span>
            <span>{result.message}</span>
          </p>

          {result.suggestion && (
            <p style={{ marginTop: 8, fontSize: 13.5, color: TEXT_MUTED, lineHeight: 1.55 }}>
              {result.suggestion}
            </p>
          )}

          {/* Inline suggested-deadline card */}
          {result.level === "unrealistic" && result.suggestedDeadline && (
            <SuggestedDeadlineCard
              iso={result.suggestedDeadline}
              label={result.suggestedDeadlineLabel}
              dailyHint={result.suggestion}
            />
          )}

          {/* Inline stretch-goal card */}
          {result.level === "too_easy" && result.suggestedGoal && (
            <StretchGoalCard goal={result.suggestedGoal} />
          )}
        </div>

        {/* Quick replies */}
        <AnimatePresence>
          {quickReplies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.12 }}
              style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 8 }}
            >
              {quickReplies.map((q) => (
                <motion.button
                  key={q.value}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onReply(q.value, result)}
                  style={
                    q.primary
                      ? primaryReplyStyle(meta.accent)
                      : ghostReplyStyle
                  }
                >
                  {q.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ── Sub-components ──────────────────────────────────────────────────── */

function LaraAvatar() {
  return (
    <div
      aria-hidden
      style={{
        width: LARA_AVATAR_SIZE,
        height: LARA_AVATAR_SIZE,
        borderRadius: "50%",
        background: IRIDESCENT,
        display: "grid",
        placeItems: "center",
        color: "#fff",
        fontWeight: 800,
        fontSize: 12,
        flexShrink: 0,
        marginTop: 2,
        boxShadow: "0 6px 18px rgba(167,139,250,0.4)",
      }}
    >
      L
    </div>
  )
}

function TypingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 5, alignItems: "center", height: 22 }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ scale: [0.55, 1, 0.55], opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "rgba(240,238,255,0.45)",
          }}
        />
      ))}
    </span>
  )
}

function SuggestedDeadlineCard({
  iso,
  label,
  dailyHint: _dailyHint,
}: {
  iso: string
  label?: string
  dailyHint?: string
}) {
  const display = label || new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  const days = Math.max(1, Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000))
  return (
    <div
      style={{
        position: "relative",
        marginTop: 12,
        padding: "12px 14px",
        borderRadius: 14,
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(10px) saturate(140%)",
        WebkitBackdropFilter: "blur(10px) saturate(140%)",
        overflow: "hidden",
      }}
    >
      {/* iridescent border */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          padding: 1,
          borderRadius: 14,
          background: IRIDESCENT,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        }}
      />
      <p
        style={{
          position: "relative",
          fontSize: 11.5,
          color: TEXT_DIM,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Lara suggests
      </p>
      <p style={{ position: "relative", marginTop: 4, fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }}>
        {display}
      </p>
      <p style={{ position: "relative", marginTop: 4, fontSize: 12.5, color: TEXT_MUTED }}>
        That gives you {days} day{days === 1 ? "" : "s"} — much more manageable.
      </p>
    </div>
  )
}

function StretchGoalCard({ goal }: { goal: string }) {
  return (
    <div
      style={{
        marginTop: 12,
        padding: "12px 14px",
        borderRadius: 14,
        background: "rgba(52,211,153,0.06)",
        border: "1px solid rgba(52,211,153,0.22)",
      }}
    >
      <p
        style={{
          fontSize: 11.5,
          color: "rgba(52,211,153,0.85)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Want to level up?
      </p>
      <p style={{ marginTop: 4, fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY, lineHeight: 1.45 }}>
        {goal}
      </p>
    </div>
  )
}

/* ── Quick-reply builders ────────────────────────────────────────────── */

function buildReplies(level: DifficultyLevel, result: DifficultyResult): QuickReply[] {
  switch (level) {
    case "realistic":
      return [{ label: "Perfect, let's build it ⚡", value: "proceed", primary: true }]
    case "ambitious":
      return [
        { label: "I'm up for the challenge", value: "proceed", primary: true },
        { label: "Show me a safer deadline", value: "show_safer_deadline" },
      ]
    case "unrealistic":
      return [
        ...(result.suggestedDeadline
          ? [{ label: "Use Lara's suggested date", value: "use_suggested_deadline" as const, primary: true }]
          : []),
        { label: "Keep my original deadline", value: "keep_original_deadline" },
        { label: "I'll adjust my goal", value: "edit_goal" },
      ]
    case "too_easy":
      return [
        ...(result.suggestedGoal
          ? [{ label: "Yes, set the bigger goal", value: "use_stretch_goal" as const, primary: true }]
          : []),
        { label: "Keep my current goal", value: "keep_current_goal", primary: !result.suggestedGoal },
      ]
  }
}

/* ── Styles ──────────────────────────────────────────────────────────── */

const rowStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
}

function bubbleStyle({ accent, subtleBg }: { accent: string; subtleBg?: string }): CSSProperties {
  return {
    flex: 1,
    minWidth: 0,
    padding: "13px 16px",
    borderRadius: 16,
    background: subtleBg || "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderLeft: `3px solid ${accent}`,
    backdropFilter: "blur(14px) saturate(140%)",
    WebkitBackdropFilter: "blur(14px) saturate(140%)",
  }
}

function primaryReplyStyle(accent: string): CSSProperties {
  return {
    padding: "8px 14px",
    borderRadius: 999,
    background: IRIDESCENT,
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    boxShadow: `0 8px 24px ${accent}40`,
  }
}

const ghostReplyStyle: CSSProperties = {
  padding: "8px 14px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: TEXT_PRIMARY,
  fontSize: 13,
  cursor: "pointer",
}

/* ── Inline indicator for the summary screen ─────────────────────────── */

export function DifficultyIndicator({ level }: { level: DifficultyLevel }) {
  const meta = LEVEL_META[level]
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 9px",
        borderRadius: 999,
        background: meta.subtle,
        border: `1px solid ${meta.accent}55`,
        color: meta.accent,
        fontSize: 11.5,
        fontWeight: 600,
      }}
    >
      {meta.indicator}
    </span>
  )
}
