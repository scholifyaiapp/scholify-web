import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Link } from "react-router-dom"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/Toast"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { readPlan, readProgress } from "@/lib/scholify-data"
import {
  pushNotification,
  readPartnership,
  readPartnerSnapshot,
  subscribePartnerChanges,
  type PartnerSnapshot,
  type Partnership,
} from "@/lib/partner-storage"

/* ──────────────────────────────────────────────────────────────────────
 *  Compact partner card for the Dashboard.
 *  Shows side-by-side streak + progress + today's status, with a
 *  send-encouragement row that drops preset messages into the partner's
 *  notification feed.
 * ────────────────────────────────────────────────────────────────────── */

const TEXT_PRIMARY = "#F0EEFF"
const TEXT_MUTED = "rgba(240,238,255,0.6)"
const TEXT_DIM = "rgba(240,238,255,0.45)"

const cardBase: CSSProperties = {
  borderRadius: 20,
  padding: 20,
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.06)",
  backdropFilter: "blur(18px) saturate(140%)",
  WebkitBackdropFilter: "blur(18px) saturate(140%)",
}

const PRESETS = [
  "You've got this! 💪",
  "Almost there! Keep going 🔥",
  "Great streak! Keep it up ⭐",
]

function initialOf(name: string): string {
  return (name?.trim()?.[0] || "?").toUpperCase()
}

function relativeOnlineLabel(iso: string): { text: string; color: string } {
  const ms = Date.now() - new Date(iso).getTime()
  const m = Math.round(ms / 60000)
  if (m < 5) return { text: "Online now", color: "#34D399" }
  if (m < 60) return { text: `Active ${m}m ago`, color: TEXT_MUTED }
  const h = Math.round(m / 60)
  if (h < 24) return { text: `Active ${h}h ago`, color: TEXT_MUTED }
  const d = Math.round(h / 24)
  return { text: `Active ${d}d ago`, color: TEXT_DIM }
}

function GradientAvatar({ name }: { name: string }) {
  const hue = useMemo(() => {
    let h = 0
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xff
    return h
  }, [name])
  const bg = `linear-gradient(135deg, hsl(${hue},80%,65%), hsl(${(hue + 60) % 360},75%,55%))`
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 12,
        background: bg,
        display: "grid",
        placeItems: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: 16,
        flexShrink: 0,
        boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
      }}
    >
      {initialOf(name)}
    </div>
  )
}

function StatColumn({
  label,
  streak,
  pct,
  done,
  highlightDone = false,
}: {
  label: string
  streak: number
  pct: number
  done: boolean
  highlightDone?: boolean
}) {
  return (
    <div style={{ flex: 1, textAlign: "center" }}>
      <p style={{ fontSize: 12, color: TEXT_MUTED, marginBottom: 8 }}>{label}</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY }}>
        <span aria-hidden>🔥 </span>
        {streak}
      </p>
      <p style={{ marginTop: 4, fontSize: 13, color: TEXT_MUTED }}>{pct}%</p>
      <motion.p
        animate={highlightDone && done ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ duration: 0.6, repeat: highlightDone && done ? 2 : 0 }}
        style={{
          marginTop: 8,
          fontSize: 12,
          fontWeight: 600,
          color: done ? "#34D399" : "#FB923C",
        }}
      >
        {done ? "✓ Done" : "⏳ Pending"}
      </motion.p>
    </div>
  )
}

/* ── Outer component ─────────────────────────────────────────────────── */

export default function PartnerCard({ variant = "compact" }: { variant?: "compact" | "full" }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [tick, setTick] = useState(0)
  useEffect(() => subscribePartnerChanges(() => setTick((t) => t + 1)), [])

  const partnership: Partnership | null = useMemo(() => readPartnership(), [tick])
  const snapshot: PartnerSnapshot | null = useMemo(() => readPartnerSnapshot(), [tick])

  // Recompute "your" stats from local progress/plan.
  const { yourStreak, yourPct, yourDone, yourName, yourGoal } = useMemo(() => {
    const plan = readPlan()
    const progress = readProgress()
    const totalTasks = Math.max(1, Array.isArray(plan.tasks) ? plan.tasks.length : 30)
    const meta = (user?.user_metadata || {}) as { first_name?: string }
    const firstName = (meta.first_name || "").trim() || user?.email?.split("@")[0] || "You"
    const todayISO = new Date().toISOString().slice(0, 10)
    return {
      yourStreak: progress.streak,
      yourPct: Math.round((progress.completed.length / totalTasks) * 100),
      yourDone: progress.lastDate === todayISO,
      yourName: firstName,
      yourGoal: (plan.goal || "").trim(),
    }
  }, [user, tick])

  const [highlightPartnerDone, setHighlightPartnerDone] = useState(false)
  const partnerJustCompleted = snapshot?.doneToday ?? false

  // When the partner snapshot first flips to doneToday, pulse + toast once.
  useEffect(() => {
    if (!partnerJustCompleted || !snapshot) return
    setHighlightPartnerDone(true)
    const t = window.setTimeout(() => setHighlightPartnerDone(false), 4000)
    return () => window.clearTimeout(t)
  }, [partnerJustCompleted, snapshot])

  const [sendOpen, setSendOpen] = useState(false)
  const [customText, setCustomText] = useState("")

  const sendEncouragement = useCallback(
    (text: string) => {
      if (!partnership || !snapshot) return
      const msg = text.trim()
      if (!msg) {
        toast.warning("Add a message first.")
        return
      }
      pushNotification({
        recipientId: snapshot.userId,
        senderId: user?.id || "demo-user",
        senderName: yourName,
        type: "encouragement",
        message: msg,
      })
      toast.success(`Sent to ${snapshot.name} ✨`)
      setSendOpen(false)
      setCustomText("")
    },
    [partnership, snapshot, user, yourName, toast],
  )

  if (!partnership || partnership.status !== "active" || !snapshot) return null

  const online = relativeOnlineLabel(snapshot.lastActiveAt)
  const partnerName = snapshot.name || partnership.requesterName || "Partner"

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={cardBase}
    >
      <p
        style={{
          fontSize: 12,
          color: TEXT_MUTED,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        Your study partner
      </p>

      <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12 }}>
        <GradientAvatar name={partnerName} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>{partnerName}</p>
          <p style={{ fontSize: 12, color: online.color, marginTop: 2 }}>{online.text}</p>
        </div>
        {variant === "compact" && (
          <Link
            to="/partner"
            style={{
              fontSize: 12,
              color: TEXT_MUTED,
              textDecoration: "none",
              padding: "6px 10px",
              borderRadius: 8,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            View →
          </Link>
        )}
      </div>

      {/* Goal pill */}
      {snapshot.goal && (
        <div style={{ marginTop: 14 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 999,
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.18)",
              fontSize: 11.5,
              color: "#C084FC",
            }}
          >
            🎯 {snapshot.goal}
          </span>
        </div>
      )}

      {/* Stats compare */}
      <div
        style={{
          marginTop: 18,
          display: "flex",
          alignItems: "stretch",
          gap: 12,
        }}
      >
        <StatColumn
          label={yourName}
          streak={yourStreak}
          pct={yourPct}
          done={yourDone}
        />
        <div
          style={{
            width: 1,
            background: "linear-gradient(180deg,transparent,rgba(255,255,255,0.08),transparent)",
          }}
        />
        <StatColumn
          label={partnerName}
          streak={snapshot.streak}
          pct={snapshot.completedPct}
          done={snapshot.doneToday}
          highlightDone={highlightPartnerDone}
        />
      </div>

      {/* Send encouragement */}
      <div style={{ marginTop: 18 }}>
        <motion.button
          onClick={() => setSendOpen((v) => !v)}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: TEXT_PRIMARY,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          ✨ Send encouragement {sendOpen ? "↑" : "→"}
        </motion.button>

        <AnimatePresence>
          {sendOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: "hidden", marginTop: 12 }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => sendEncouragement(p)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 999,
                      background: "rgba(139,92,246,0.08)",
                      border: "1px solid rgba(139,92,246,0.2)",
                      color: TEXT_PRIMARY,
                      fontSize: 12.5,
                      cursor: "pointer",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                <input
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendEncouragement(customText)
                  }}
                  placeholder="Write your own…"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: "9px 12px",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: TEXT_PRIMARY,
                    fontSize: 13,
                    outline: "none",
                  }}
                />
                <button
                  onClick={() => sendEncouragement(customText)}
                  style={{
                    padding: "9px 16px",
                    borderRadius: 10,
                    background: IRIDESCENT,
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 13,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Send
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* In compact mode, expose "your turn" prompt */}
      {variant === "compact" && partnerJustCompleted && !yourDone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            marginTop: 14,
            padding: "10px 14px",
            borderRadius: 12,
            background: "rgba(52,211,153,0.08)",
            border: "1px solid rgba(52,211,153,0.2)",
            fontSize: 13,
            color: TEXT_PRIMARY,
          }}
        >
          <span style={{ color: "#34D399", fontWeight: 600 }}>{partnerName} finished their task.</span>{" "}
          Now it's your turn 🔥
        </motion.div>
      )}

      {/* Goal hint when variants don't match */}
      {!snapshot.goal && yourGoal && (
        <p style={{ marginTop: 12, fontSize: 11.5, color: TEXT_DIM }}>
          Both working on: {yourGoal}
        </p>
      )}
    </motion.div>
  )
}
