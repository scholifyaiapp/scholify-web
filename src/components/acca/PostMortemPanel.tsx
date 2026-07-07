import { useEffect, useState, type CSSProperties } from "react"
import { motion } from "motion/react"
import { getPostMortem, type PostMortem, type PostMortemAction, type PostMortemInput } from "@/lib/acca-ai"
import { learnerProfileSummary } from "@/lib/acca-diagnostic"

/*
 * The AI post-mortem — shown after a FAILED mock (and reused, via kind="exam",
 * inside the real-exam reflection). Lara analyses where the marks were lost,
 * names the weak topics, and hands back a 3-step recovery plan whose steps are
 * live buttons into the app's practice modes.
 */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"
const CARD = "var(--sch-card)"
const BORDER = "var(--sch-border)"
const RED = "#C80000"

const ACTION_ICON: Record<PostMortemAction, string> = {
  weak: "💪",
  practice: "✏️",
  flashcards: "🧠",
  mock: "⏱️",
}

export default function PostMortemPanel({
  input,
  onAction,
}: {
  input: Omit<PostMortemInput, "learnerContext">
  onAction: (a: PostMortemAction) => void
}) {
  const [result, setResult] = useState<PostMortem | null>(null)

  useEffect(() => {
    let alive = true
    void getPostMortem({ ...input, learnerContext: learnerProfileSummary(input.paperId) }).then((r) => {
      if (alive) setResult(r)
    })
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      style={{
        maxWidth: 480,
        margin: "0 auto 24px",
        textAlign: "left",
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderLeft: `3px solid ${RED}`,
        borderRadius: 18,
        padding: 20,
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: RED, marginBottom: 10 }}>
        {input.kind === "mock" ? "🔍 LARA'S POST-MORTEM" : "🔍 EXAMINER ANALYSIS"}
      </div>

      {!result ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0 10px" }}>
          <motion.span
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: 18 }}
          >
            ✨
          </motion.span>
          <span style={{ fontSize: 13.5, color: MUTED }}>Lara is going through your paper, mark by mark…</span>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 15.5, color: TEXT, lineHeight: 1.4 }}>{result.headline}</div>
          <p style={{ fontSize: 13.5, color: MUTED, lineHeight: 1.6, margin: "8px 0 0" }}>{result.analysis}</p>

          {result.lostMarks.length > 0 && (
            <>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, color: DIM, margin: "16px 0 8px" }}>
                WHERE THE MARKS WENT
              </div>
              <div style={{ display: "grid", gap: 6 }}>
                {result.lostMarks.map((l, i) => (
                  <motion.div
                    key={`${l.area}-${i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "9px 12px", borderRadius: 11, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)" }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 800, color: "#EF4444", padding: "2px 7px", borderRadius: 7, background: "rgba(239,68,68,0.12)", flexShrink: 0 }}>
                      {l.area}
                    </span>
                    <span style={{ fontSize: 12.5, color: TEXT, lineHeight: 1.5 }}>{l.detail}</span>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, color: DIM, margin: "16px 0 8px" }}>
            {input.kind === "mock" ? "THE RECOVERY PLAN" : "THE COMEBACK PLAN"}
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {result.plan.map((p, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onAction(p.action)}
                style={planBtn}
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>{ACTION_ICON[p.action]}</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "block", fontWeight: 700, fontSize: 13.5, color: TEXT }}>
                    {i + 1}. {p.title}
                  </span>
                  <span style={{ display: "block", fontSize: 12, color: MUTED, marginTop: 1 }}>{p.detail}</span>
                </span>
                <span style={{ color: RED, fontSize: 15, flexShrink: 0 }}>›</span>
              </motion.button>
            ))}
          </div>

          {result.isFallback && (
            <p style={{ fontSize: 11, color: DIM, margin: "10px 0 0" }}>
              Offline analysis from your area scores — connect the AI key for Lara's full read.
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

const planBtn: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 11,
  textAlign: "left",
  padding: "11px 13px",
  borderRadius: 12,
  cursor: "pointer",
  border: `1px solid ${BORDER}`,
  background: "var(--sch-bg)",
  width: "100%",
}
