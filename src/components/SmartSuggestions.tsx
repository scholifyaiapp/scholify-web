import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useToast } from "@/components/Toast"
import { readActivePlanId, readPlan } from "@/lib/scholify-data"
import {
  MIN_SESSIONS_FOR_UI,
  analyzePatterns,
  applySuggestion,
  buildProgressPatterns,
  isSuggestionApplied,
  isSuggestionDismissed,
  markSuggestionDismissed,
  refineSuggestionsWithAI,
  type Suggestion,
} from "@/lib/learningIntelligence"

/*
 * SmartSuggestions — dashboard card.
 *
 * After 14+ completed sessions Lara analyses the user's pattern locally,
 * optionally rewrites the suggestion text via /api/lara?action=analyze-
 * patterns, and surfaces them one at a time. Apply mutates the active
 * plan in place; Keep dismisses just that suggestion. Both states
 * persist locally so the card never re-appears for an answered item.
 */

const TEXT_PRIMARY = "var(--sch-text, #F0EEFF)"
const TEXT_MUTED = "var(--sch-tx-2, rgba(240,238,255,0.6))"
const TEXT_DIM = "var(--sch-tx-3, rgba(240,238,255,0.45))"

const cardStyle: CSSProperties = {
  position: "relative",
  padding: 20,
  borderRadius: 20,
  background: "rgba(139,92,246,0.04)",
  border: "1px solid rgba(139,92,246,0.15)",
  backdropFilter: "blur(16px) saturate(140%)",
  WebkitBackdropFilter: "blur(16px) saturate(140%)",
  overflow: "hidden",
}

export default function SmartSuggestions() {
  const { toast } = useToast()
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [index, setIndex] = useState(0)
  const [exitDir, setExitDir] = useState<1 | -1>(1)
  const [cardHidden, setCardHidden] = useState(false)
  const [applying, setApplying] = useState(false)

  const planId = useMemo(() => readActivePlanId() || readPlan().id || undefined, [])

  // Compute analysis on mount. The AI refine call runs in parallel; if it
  // resolves we swap in the warmer copy, but the local analysis is what
  // gates whether anything shows.
  useEffect(() => {
    const patterns = buildProgressPatterns()
    const completed = patterns.filter((p) => p.completed).length
    if (completed < MIN_SESSIONS_FOR_UI) return

    const planned = readPlan().daily_minutes || 20
    const analysis = analyzePatterns(patterns, planned)
    const live = analysis.suggestions.filter(
      (s) => !isSuggestionDismissed(planId, s.id) && !isSuggestionApplied(planId, s.id),
    )
    if (live.length === 0) return

    setSuggestions(live)
    setIndex(0)

    ;(async () => {
      const goal = (readPlan().goal || "your goal").trim()
      const refined = await refineSuggestionsWithAI(goal, { ...analysis, suggestions: live })
      // Only update if the user hasn't started actioning a card yet.
      setSuggestions((prev) => (prev.length === refined.length ? refined : prev))
    })()
  }, [planId])

  const advance = useCallback((dir: 1 | -1) => {
    setExitDir(dir)
    setTimeout(() => {
      setIndex((i) => {
        const next = i + 1
        return next
      })
    }, 200)
  }, [])

  const onApply = useCallback(async () => {
    const s = suggestions[index]
    if (!s || applying) return
    setApplying(true)
    try {
      applySuggestion(s)
      toast.success("Plan updated by Lara ✓")
      advance(1)
    } catch (err) {
      console.error("apply suggestion:", err)
      toast.error("Couldn't update the plan — try again in a sec.")
    } finally {
      setApplying(false)
    }
  }, [suggestions, index, applying, toast, advance])

  const onDismissOne = useCallback(() => {
    const s = suggestions[index]
    if (!s) return
    markSuggestionDismissed(planId, s.id)
    advance(-1)
  }, [suggestions, index, planId, advance])

  const onDismissCard = useCallback(() => {
    // Soft dismiss for the whole card session — re-appears next dashboard
    // load if there are still live suggestions. (Persistent dismiss is
    // per-suggestion.)
    setCardHidden(true)
  }, [])

  if (cardHidden) return null
  if (suggestions.length === 0) return null
  if (index >= suggestions.length) return null

  const current = suggestions[index]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={cardStyle}
    >
      {/* Soft iridescent glow tint */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          background: IRIDESCENT,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: IRIDESCENT,
            display: "grid",
            placeItems: "center",
            fontSize: 13,
            color: "#fff",
            fontWeight: 800,
          }}
        >
          L
        </div>
        <p
          style={{
            fontSize: 12,
            color: "rgba(192,132,252,0.75)",
            letterSpacing: "0.04em",
            fontWeight: 600,
          }}
        >
          Lara noticed something
        </p>
        <div style={{ flex: 1 }} />
        <button
          aria-label="Dismiss"
          onClick={onDismissCard}
          style={{
            background: "transparent",
            border: "none",
            color: TEXT_MUTED,
            fontSize: 18,
            cursor: "pointer",
            lineHeight: 1,
            padding: 0,
          }}
        >
          ×
        </button>
      </div>

      {/* Suggestion card slides */}
      <div style={{ position: "relative", marginTop: 14, minHeight: 132 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ x: exitDir === 1 ? -20 : 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: exitDir === 1 ? 20 : -20, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 22, lineHeight: 1.2 }} aria-hidden>
                💡
              </span>
              <p style={{ fontSize: 15, color: TEXT_PRIMARY, lineHeight: 1.6 }}>{current.text}</p>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <motion.button
                whileHover={{ scale: applying ? 1 : 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onApply}
                disabled={applying}
                style={{
                  padding: "10px 18px",
                  borderRadius: 12,
                  background: IRIDESCENT,
                  color: "#fff",
                  fontSize: 13.5,
                  fontWeight: 700,
                  border: "none",
                  cursor: applying ? "default" : "pointer",
                  opacity: applying ? 0.7 : 1,
                  boxShadow: "0 10px 28px rgba(167,139,250,0.4)",
                }}
              >
                {applying ? "Updating…" : "Apply this change ✓"}
              </motion.button>
              <button
                onClick={onDismissOne}
                style={{
                  padding: "10px 16px",
                  borderRadius: 12,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: TEXT_MUTED,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Keep current plan
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      {suggestions.length > 1 && (
        <div
          style={{
            marginTop: 14,
            display: "flex",
            alignItems: "center",
            gap: 8,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            {suggestions.map((_, i) => (
              <span
                key={i}
                style={{
                  width: i === index ? 18 : 8,
                  height: 5,
                  borderRadius: 3,
                  background: i <= index ? IRIDESCENT : "rgba(255,255,255,0.1)",
                  transition: "width 0.25s ease",
                }}
              />
            ))}
          </div>
          <span style={{ marginLeft: 4, fontSize: 11.5, color: TEXT_DIM }}>
            {index + 1} of {suggestions.length} suggestions
          </span>
        </div>
      )}
    </motion.div>
  )
}
