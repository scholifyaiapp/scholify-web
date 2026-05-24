import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { motion } from "motion/react"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { useAuth } from "@/lib/auth"
import { readPlan } from "@/lib/scholify-data"
import CommunityFeed, { type CommunityFilter } from "@/components/CommunityFeed"
import CategoryLeaderboard from "@/components/CategoryLeaderboard"
import CommunityOptInCard from "@/components/CommunityOptInCard"
import {
  CATEGORY_ICON,
  CATEGORY_LABEL,
  detectGoalCategory,
  ensureSeeded,
  readOptIn,
  subscribeOptInLocal,
  type GoalCategory,
} from "@/lib/community-storage"

/* ──────────────────────────────────────────────────────────────────────
 *  /community — opt-in social feed + per-category weekly leaderboard.
 *  Renders nothing until the user opts in (they see the opt-in card).
 * ────────────────────────────────────────────────────────────────────── */

const TEXT_PRIMARY = "var(--sch-text, #F0EEFF)"
const TEXT_MUTED = "var(--sch-tx-2, rgba(240,238,255,0.6))"
const TEXT_DIM = "var(--sch-tx-3, rgba(240,238,255,0.45))"

const FEED_FILTERS: Array<{ key: CommunityFilter; label: string }> = [
  { key: "all", label: "All" },
  { key: "following", label: "Goals like mine" },
  { key: "exams", label: "Exams" },
  { key: "programming", label: "Programming" },
  { key: "languages", label: "Languages" },
  { key: "design", label: "Design" },
  { key: "certifications", label: "Certifications" },
]

export default function Community() {
  const { user } = useAuth()
  const myCategory: GoalCategory = useMemo(() => {
    const goal = (readPlan().goal || "").trim()
    return detectGoalCategory(goal)
  }, [])

  // Seed once for demo mode.
  useEffect(() => ensureSeeded(), [])

  const [optedIn, setOptedIn] = useState<boolean>(() => readOptIn().optedIn)
  useEffect(() => subscribeOptInLocal(() => setOptedIn(readOptIn().optedIn)), [])

  const [filter, setFilter] = useState<CommunityFilter>("all")

  return (
    <DashboardLayout>
      <div style={{ padding: "24px clamp(16px, 4vw, 40px) 80px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1 style={{ fontSize: 22, fontWeight: 800, color: TEXT_PRIMARY, lineHeight: 1.2 }}>
            <span style={iriText}>Community</span> 🌍
          </h1>
          <p style={{ marginTop: 4, fontSize: 14, color: TEXT_MUTED }}>
            Learners making progress right now.
          </p>
          <p style={{ marginTop: 4, fontSize: 12, color: TEXT_DIM }}>
            Your category: {CATEGORY_ICON[myCategory]} {CATEGORY_LABEL[myCategory]}
          </p>
        </motion.div>

        {/* Opt-in card if not opted in yet */}
        {!optedIn && (
          <div style={{ marginTop: 22 }}>
            <CommunityOptInCard onChange={setOptedIn} />
          </div>
        )}

        {/* Filter pills */}
        <div
          style={{
            marginTop: 22,
            display: "flex",
            gap: 6,
            overflowX: "auto",
            paddingBottom: 6,
          }}
          className="dash-scroll"
        >
          {FEED_FILTERS.map((f) => {
            const active = filter === f.key
            const labelOverride =
              f.key === "following" ? `Goals like mine · ${CATEGORY_LABEL[myCategory]}` : f.label
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  flexShrink: 0,
                  padding: "7px 14px",
                  borderRadius: 999,
                  background: active ? "rgba(139,92,246,0.14)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${active ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.06)"}`,
                  color: active ? "#C084FC" : TEXT_MUTED,
                  fontSize: 12.5,
                  fontWeight: active ? 600 : 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {labelOverride}
              </button>
            )
          })}
        </div>

        {/* Two-column layout */}
        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "minmax(0, 6fr) minmax(280px, 4fr)",
            gap: 18,
            alignItems: "flex-start",
          }}
          className="community-layout"
        >
          <div>
            <CommunityFeed filter={filter} myCategory={myCategory} />
          </div>
          <div>
            <CategoryLeaderboard defaultCategory={myCategory} />
          </div>
        </div>

        <style>{`
          @media (max-width: 880px) {
            .community-layout {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* Footer reminder when opted in */}
        {optedIn && (
          <p style={{ marginTop: 28, fontSize: 11.5, color: TEXT_DIM, textAlign: "center" }}>
            Only your first name + last initial are shown. You can opt out any time from{" "}
            <a href="/settings" style={{ color: "#C084FC", textDecoration: "none" }}>
              Settings
            </a>
            .
          </p>
        )}
      </div>
    </DashboardLayout>
  )
}
