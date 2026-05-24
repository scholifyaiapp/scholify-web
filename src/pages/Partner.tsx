import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { format } from "date-fns"
import { useAuth } from "@/lib/auth"
import { DashboardLayout, iriText, Pill } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { readPlan, readProgress } from "@/lib/scholify-data"
import PartnerInvite from "@/components/PartnerInvite"
import PartnerCard from "@/components/PartnerCard"
import {
  readNotifications,
  readPartnership,
  readPartnerSnapshot,
  subscribePartnerChanges,
  type PartnerNotification,
} from "@/lib/partner-storage"
import { usePaywall } from "@/hooks/usePaywall"
import PaywallModal from "@/components/PaywallModal"

/* ──────────────────────────────────────────────────────────────────────
 *  /partner — full accountability-partner surface.
 *  Pro feature: free users see the paywall and a teaser preview.
 * ────────────────────────────────────────────────────────────────────── */

const TEXT_PRIMARY = "var(--sch-text, #F0EEFF)"
const TEXT_MUTED = "var(--sch-tx-2, rgba(240,238,255,0.6))"
const TEXT_DIM = "var(--sch-tx-3, rgba(240,238,255,0.45))"

const glassCard: CSSProperties = {
  borderRadius: 20,
  padding: 24,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
}

export default function Partner() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { showPaywall, paywallType, triggerFeaturePaywall, closePaywall } = usePaywall()

  const isPaid = Boolean(
    user?.user_metadata?.plan && user.user_metadata.plan !== "free",
  )

  // For Pro paywall — show modal on mount for free users, but keep the
  // teaser content visible underneath so they know what they're missing.
  useEffect(() => {
    if (!isPaid) triggerFeaturePaywall()
  }, [isPaid, triggerFeaturePaywall])

  const [tick, setTick] = useState(0)
  useEffect(() => subscribePartnerChanges(() => setTick((t) => t + 1)), [])

  const partnership = useMemo(() => readPartnership(), [tick])
  const snapshot = useMemo(() => readPartnerSnapshot(), [tick])
  const notifications = useMemo(() => readNotifications(), [tick])

  const { weekly, timeline } = useMemo(
    () => buildComparisonData(snapshot?.userId),
    [tick, snapshot?.userId],
  )

  return (
    <DashboardLayout>
      <div style={{ padding: "24px clamp(16px, 4vw, 40px) 80px", maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 8 }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              background: "transparent",
              border: "none",
              color: TEXT_MUTED,
              fontSize: 13,
              cursor: "pointer",
              padding: 0,
            }}
          >
            ← Dashboard
          </button>
          <Pill>PRO</Pill>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800, ...iriText, lineHeight: 1.15 }}
        >
          Accountability partner
        </motion.h1>
        <p style={{ marginTop: 6, fontSize: 14, color: TEXT_MUTED, maxWidth: 540 }}>
          Two people, one goal. See each other's progress in real-time and stay accountable when
          motivation dips.
        </p>

        {/* If no partnership yet → invite. If active → expanded card. */}
        <div style={{ marginTop: 28 }}>
          {partnership && partnership.status === "active" && snapshot ? (
            <PartnerCard variant="full" />
          ) : (
            <PartnerInvite onPartnerActive={() => setTick((t) => t + 1)} />
          )}
        </div>

        {/* When active, show the deeper analytics */}
        {partnership && partnership.status === "active" && snapshot && (
          <>
            {/* Week-by-week chart */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              style={{ ...glassCard, marginTop: 24 }}
            >
              <h2 style={{ fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }}>
                Week-by-week completion
              </h2>
              <p style={{ marginTop: 4, fontSize: 12.5, color: TEXT_MUTED }}>
                Side by side, by ISO week.
              </p>
              <ComparisonBars data={weekly} youLabel="You" partnerLabel={snapshot.name} />
            </motion.section>

            {/* Activity timeline */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              style={{ ...glassCard, marginTop: 20 }}
            >
              <h2 style={{ fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }}>
                Activity timeline
              </h2>
              <p style={{ marginTop: 4, fontSize: 12.5, color: TEXT_MUTED }}>Last 14 days.</p>
              <ActivityTimeline data={timeline} partnerName={snapshot.name} />
            </motion.section>

            {/* Message history */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              style={{ ...glassCard, marginTop: 20 }}
            >
              <h2 style={{ fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }}>
                Recent encouragement
              </h2>
              <MessageHistory
                items={notifications.slice(-10).reverse()}
                youId={user?.id}
                partnerName={snapshot.name}
              />
            </motion.section>
          </>
        )}
      </div>

      <PaywallModal open={showPaywall} type={paywallType} onClose={closePaywall} />
    </DashboardLayout>
  )
}

/* ── Comparison bars ─────────────────────────────────────────────────── */

function ComparisonBars({
  data,
  youLabel,
  partnerLabel,
}: {
  data: { week: string; you: number; partner: number }[]
  youLabel: string
  partnerLabel: string
}) {
  const max = Math.max(1, ...data.flatMap((d) => [d.you, d.partner]))
  return (
    <div style={{ marginTop: 18 }}>
      <div style={{ display: "flex", gap: 16, fontSize: 12, color: TEXT_MUTED, marginBottom: 12 }}>
        <Legend swatch={IRIDESCENT} label={youLabel} />
        <Legend swatch="linear-gradient(135deg,#F472B6,#22D3EE)" label={partnerLabel} />
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160 }}>
        {data.map((d) => (
          <div key={d.week} style={{ flex: 1, minWidth: 24 }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 140 }}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.you / max) * 100}%` }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  flex: 1,
                  borderRadius: 6,
                  background: IRIDESCENT,
                  minHeight: 4,
                }}
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.partner / max) * 100}%` }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                style={{
                  flex: 1,
                  borderRadius: 6,
                  background: "linear-gradient(135deg,#F472B6,#22D3EE)",
                  minHeight: 4,
                }}
              />
            </div>
            <p
              style={{
                marginTop: 8,
                fontSize: 11,
                color: TEXT_DIM,
                textAlign: "center",
              }}
            >
              {d.week}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: 3,
          background: swatch,
          display: "inline-block",
        }}
      />
      {label}
    </span>
  )
}

/* ── Activity timeline ───────────────────────────────────────────────── */

function ActivityTimeline({
  data,
  partnerName,
}: {
  data: { date: string; you: boolean; partner: boolean }[]
  partnerName: string
}) {
  return (
    <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 12 }}>
      {data.map((d) => (
        <div
          key={d.date}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            padding: "10px 12px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.05)",
            minWidth: 60,
          }}
          title={`${d.date} • you ${d.you ? "✓" : "—"} • ${partnerName} ${d.partner ? "✓" : "—"}`}
        >
          <span style={{ fontSize: 10, color: TEXT_DIM }}>
            {format(new Date(d.date), "MMM d")}
          </span>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: d.you ? IRIDESCENT : "rgba(255,255,255,0.08)",
              boxShadow: d.you ? "0 0 8px rgba(167,139,250,0.7)" : "none",
            }}
            aria-label={d.you ? "you completed" : "you missed"}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: d.partner ? "linear-gradient(135deg,#F472B6,#22D3EE)" : "rgba(255,255,255,0.08)",
              boxShadow: d.partner ? "0 0 8px rgba(244,114,182,0.7)" : "none",
            }}
            aria-label={d.partner ? `${partnerName} completed` : `${partnerName} missed`}
          />
        </div>
      ))}
    </div>
  )
}

/* ── Message history ─────────────────────────────────────────────────── */

function MessageHistory({
  items,
  youId,
  partnerName,
}: {
  items: PartnerNotification[]
  youId?: string
  partnerName: string
}) {
  if (items.length === 0) {
    return (
      <p style={{ marginTop: 14, fontSize: 13, color: TEXT_MUTED }}>
        Nothing yet — send your partner an encouragement to start the thread.
      </p>
    )
  }
  return (
    <ul style={{ marginTop: 14, listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
      {items.map((n) => {
        const fromYou = n.senderId === youId
        return (
          <li
            key={n.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 12,
              background: fromYou ? "rgba(139,92,246,0.06)" : "rgba(244,114,182,0.06)",
              border: `1px solid ${fromYou ? "rgba(139,92,246,0.16)" : "rgba(244,114,182,0.16)"}`,
            }}
          >
            <span style={{ fontSize: 12, color: TEXT_DIM, minWidth: 56 }}>
              {fromYou ? "You →" : `${partnerName} →`}
            </span>
            <span style={{ flex: 1, fontSize: 13.5, color: TEXT_PRIMARY }}>{n.message}</span>
            <span style={{ fontSize: 11, color: TEXT_DIM }}>
              {format(new Date(n.createdAt), "MMM d, HH:mm")}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

/* ── Mock comparison data — synthesized from local progress ──────────── */

function buildComparisonData(_partnerId?: string) {
  const plan = readPlan()
  const progress = readProgress()
  const tasks = Array.isArray(plan.tasks) ? plan.tasks : []
  const totalTasks = Math.max(1, tasks.length)
  const yourCompleted = new Set(progress.completed)

  // Week buckets — group day_number into weeks of 7.
  const weekly: { week: string; you: number; partner: number }[] = []
  const maxDay = Math.max(7, ...progress.completed, ...tasks.map((t) => t.day_number || 0))
  const weeks = Math.min(6, Math.ceil(maxDay / 7))
  for (let w = 1; w <= weeks; w++) {
    const start = (w - 1) * 7 + 1
    const end = w * 7
    let you = 0
    for (let d = start; d <= end; d++) if (yourCompleted.has(d)) you++
    // Partner data is synthesized deterministically off the same seed
    // so the chart isn't empty until realtime fills it in.
    const partner = Math.max(0, you - 1 + (w % 2))
    weekly.push({ week: `W${w}`, you, partner })
  }
  if (weekly.length === 0) weekly.push({ week: "W1", you: 0, partner: 0 })

  // 14-day timeline
  const timeline: { date: string; you: boolean; partner: boolean }[] = []
  const today = new Date()
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const iso = d.toISOString().slice(0, 10)
    // Demo: "you" = progress.lastDate within the window; partner = pseudo
    const yourDay = progress.lastDate === iso || (i % 3 === 0 && yourCompleted.size > 0)
    const partnerDay = (i + d.getDate()) % 4 < 2
    timeline.push({ date: iso, you: yourDay, partner: partnerDay })
  }
  // Ensure we don't reference _partnerId compile-time error
  void _partnerId

  return { weekly, timeline, totalTasks }
}
