import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, useInView } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { RESOURCE, type ResourceType } from "@/lib/scholify-data"
import {
  MIN_SESSIONS_FOR_INSIGHTS,
  MIN_SESSIONS_FOR_UI,
  analyzePatterns,
  buildProgressPatterns,
  type LearningStyle,
  type TypeBreakdown,
} from "@/lib/learningIntelligence"

/*
 * LearningStyleCard — Progress page section.
 *
 * Renders an iridescent style badge + per-task-type completion bars +
 * insights derived from the local analyzer. Bars animate width 0 → rate
 * on scroll into view via Framer's useInView hook (no extra deps).
 */

const TEXT_PRIMARY = "var(--sch-text, #F0EEFF)"
const TEXT_MUTED = "var(--sch-tx-2, rgba(240,238,255,0.6))"
const TEXT_DIM = "var(--sch-tx-3, rgba(240,238,255,0.45))"

const cardStyle: CSSProperties = {
  borderRadius: 20,
  padding: 24,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
}

const STYLE_META: Record<LearningStyle, { emoji: string; name: string; description: string; tip: string }> = {
  visual: {
    emoji: "👁",
    name: "Visual Learner",
    description: "You absorb best from videos, demos, and visual examples.",
    tip: "Stack a short demo video before practice — your retention jumps when you can see it once first.",
  },
  active: {
    emoji: "⚡",
    name: "Active Learner",
    description: "You learn by doing. Practice and exercise sessions are where your streaks live.",
    tip: "Front-load practice on every plan — reading sticks better after you've fumbled with the actual problem.",
  },
  reflective: {
    emoji: "🧘",
    name: "Reflective Learner",
    description: "You learn by stepping back and connecting concepts.",
    tip: "After each session, write three sentences answering 'what changed in my head today?'",
  },
  reading: {
    emoji: "📖",
    name: "Reading Learner",
    description: "Long-form text is where you do your deepest learning.",
    tip: "Pair reading with a one-page summary — the act of writing seals what reading uncovered.",
  },
  mixed: {
    emoji: "🌊",
    name: "Mixed Learner",
    description: "You shift modalities to match the topic — a rare and useful skill.",
    tip: "Keep at least three task types alive in your plan; that variety is exactly what's working for you.",
  },
}

const TYPE_COLOR: Record<ResourceType, string> = {
  video: "#818CF8",
  practice: "#34D399",
  reading: "#F472B6",
  reflection: "#FB923C",
  exercise: "#A78BFA",
}

const TYPE_ORDER: ResourceType[] = ["video", "practice", "reading", "reflection", "exercise"]

export default function LearningStyleCard() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, { once: true, margin: "-80px" })

  const analysis = useMemo(() => {
    const patterns = buildProgressPatterns()
    return analyzePatterns(patterns, 20)
  }, [])

  // Build a deterministic ordered breakdown — only types that actually
  // appear in this user's plan show up, but always in the same canonical
  // order so the chart doesn't reshuffle when the dominant style flips.
  const orderedBreakdown = useMemo(() => {
    const byType = new Map<ResourceType, TypeBreakdown>()
    for (const b of analysis.breakdown) byType.set(b.type, b)
    return TYPE_ORDER.map((t) => byType.get(t)).filter((b): b is TypeBreakdown => !!b)
  }, [analysis.breakdown])

  // Don't render at all if there's not enough data yet — keeps the
  // Progress page tidy for new users.
  if (analysis.totalSessions < MIN_SESSIONS_FOR_INSIGHTS) {
    return (
      <div style={cardStyle}>
        <p style={{ fontSize: 12, color: TEXT_DIM, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Learning style
        </p>
        <h2 style={{ marginTop: 6, fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }}>
          Detecting your style…
        </h2>
        <p style={{ marginTop: 6, fontSize: 13.5, color: TEXT_MUTED, lineHeight: 1.55 }}>
          Lara needs at least {MIN_SESSIONS_FOR_UI} completed sessions to read your pattern. You're
          at {analysis.totalSessions}.
        </p>
      </div>
    )
  }

  const styleMeta = STYLE_META[analysis.dominantStyle]

  return (
    <div ref={wrapRef} style={cardStyle}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <div>
          <p
            style={{
              fontSize: 11.5,
              color: TEXT_DIM,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Your learning style
          </p>
          <h2 style={{ marginTop: 4, fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }}>
            Detected from {analysis.totalSessions} session{analysis.totalSessions === 1 ? "" : "s"}
          </h2>
        </div>
      </div>

      {/* Style badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 6 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 6 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          marginTop: 18,
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "20px 24px",
          borderRadius: 20,
          background: IRIDESCENT,
          color: "#fff",
          boxShadow: "0 14px 36px rgba(167,139,250,0.35)",
        }}
      >
        <span style={{ fontSize: 48, lineHeight: 1 }} aria-hidden>
          {styleMeta.emoji}
        </span>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{styleMeta.name}</p>
          <p style={{ marginTop: 4, fontSize: 14, color: "rgba(255,255,255,0.78)", lineHeight: 1.5 }}>
            {styleMeta.description}
          </p>
        </div>
      </motion.div>

      {/* Breakdown bars */}
      <div style={{ marginTop: 20, display: "grid", gap: 10 }}>
        {orderedBreakdown.map((b, i) => {
          const meta = RESOURCE[b.type]
          const pct = Math.round(b.rate * 100)
          const color = TYPE_COLOR[b.type] || "#A78BFA"
          return (
            <div key={b.type}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: TEXT_MUTED,
                  marginBottom: 6,
                }}
              >
                <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                  <span aria-hidden>{meta?.icon || "✦"}</span>
                  {meta?.label || b.type}
                </span>
                <span style={{ color: TEXT_PRIMARY, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                  {pct}%
                </span>
              </div>
              <div
                style={{
                  height: 8,
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.05)",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${pct}%` } : { width: 0 }}
                  transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.08 }}
                  style={{ height: "100%", background: color, borderRadius: 6, boxShadow: `0 0 14px ${color}55` }}
                />
              </div>
              <p style={{ marginTop: 4, fontSize: 11, color: TEXT_DIM }}>
                {b.completed}/{b.total} completed · avg {Math.round(b.avgMinutes)} min
              </p>
            </div>
          )
        })}
      </div>

      {/* What this means */}
      <div
        style={{
          marginTop: 20,
          padding: 16,
          borderRadius: 14,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p
          style={{
            fontSize: 11.5,
            color: TEXT_DIM,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          What this means for you
        </p>
        <ul style={{ marginTop: 10, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
          <InsightItem
            text={
              analysis.insights[0] ||
              `Your ${styleMeta.name.toLowerCase()} pattern is showing up most strongly in your completed sessions.`
            }
          />
          <InsightItem text={styleMeta.tip} />
          <InsightItem text="Lara is gently weighting future tasks toward what's already working." />
        </ul>
      </div>

      <p style={{ marginTop: 14, fontSize: 11.5, color: TEXT_DIM, lineHeight: 1.55 }}>
        Your plan automatically includes more {styleMeta.name.toLowerCase()}-friendly tasks based on
        your patterns. Apply Lara's suggestions on the dashboard to keep this tuning fresh.
      </p>
    </div>
  )
}

function InsightItem({ text }: { text: string }) {
  return (
    <li
      style={{
        display: "flex",
        gap: 8,
        fontSize: 13,
        color: TEXT_PRIMARY,
        lineHeight: 1.55,
      }}
    >
      <span style={{ color: "#C084FC", flexShrink: 0, fontWeight: 800 }}>✦</span>
      <span>{text}</span>
    </li>
  )
}
