import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/Toast"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { readPlan, readProgress } from "@/lib/scholify-data"
import {
  MILESTONES,
  STAGES,
  currentTreeImageUrl,
  nextMilestoneFor,
  progressToNext,
  readTrees,
  stageForStreak,
  subscribeTrees,
  svgDataUrl,
} from "@/lib/streak-tree-storage"

/*
 * Full-screen Streak Tree view.
 *
 *  • Ambient orb backdrop (matches the rest of the dark surfaces).
 *  • 3D-style float (translateY + rotateY) on the hero tree image.
 *  • Stage name in iridescent + poetic description.
 *  • Horizontal growth timeline: every milestone as a circle, with
 *    unlocked ones showing the tree image (real or SVG) and future
 *    ones grayed + locked.
 *  • Share button (Web Share API → clipboard fallback).
 */

const TEXT_PRIMARY = "var(--sch-text, #F0EEFF)"
const TEXT_MUTED = "var(--sch-tx-2, rgba(240,238,255,0.6))"
const TEXT_DIM = "var(--sch-tx-3, rgba(240,238,255,0.45))"

export default function StreakTreeFullscreen() {
  const { user } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const [tick, setTick] = useState(0)
  useEffect(() => subscribeTrees(() => setTick((t) => t + 1)), [])

  const progress = useMemo(() => readProgress(), [tick])
  const plan = useMemo(() => readPlan(), [])
  const streak = progress.streak
  const stage = stageForStreak(streak)
  const next = nextMilestoneFor(streak)
  const pct = progressToNext(streak)
  const display = currentTreeImageUrl(streak)

  const trees = useMemo(() => readTrees(), [tick])
  const treeByMilestone = useMemo(() => new Map(trees.map((t) => [t.milestone, t])), [trees])

  const userName = useMemo(() => {
    const meta = (user?.user_metadata || {}) as { first_name?: string; last_name?: string }
    const first = (meta.first_name || "").trim()
    return first || user?.email?.split("@")[0] || "Learner"
  }, [user])

  const goal = (plan.goal || "your goal").trim()
  const sessions = progress.completed.length
  const dailyMinutes = Math.max(5, Number(plan.daily_minutes) || 20)
  const totalHours = Math.round((sessions * dailyMinutes) / 60)

  const description = useMemo(() => {
    // Personalize the legendary + mythic descriptions with the name.
    if (stage.key === "mythic") {
      return `${userName}, this tree represents ${streak} days of showing up. That is extraordinary.`
    }
    if (stage.key === "legendary") {
      return `${userName}, you have built something rare. Very few people ever reach this.`
    }
    return stage.description
  }, [stage, userName, streak])

  const onShare = async () => {
    const text = `Day ${streak} of "${goal}" — my Scholify streak tree is at the ${stage.name} stage 🌳`
    const url = typeof window !== "undefined" ? `${window.location.origin}/tree` : "/tree"
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "Scholify streak tree", text, url })
        return
      }
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(`${text} ${url}`)
        toast.success("Tree summary copied — share it anywhere 🌳")
      }
    } catch {
      /* user cancelled — no-op */
    }
  }

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100dvh",
        background: "#050508",
        color: TEXT_PRIMARY,
        overflow: "hidden",
      }}
    >
      {/* Ambient orbs */}
      <AmbientOrbs />

      {/* Top bar */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          padding: "20px clamp(16px, 4vw, 32px)",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={topBtnStyle}
          aria-label="Back"
          type="button"
        >
          ←
          <span style={{ marginLeft: 6 }}>Back</span>
        </button>
        <Link to="/progress" style={{ ...topBtnStyle, textDecoration: "none" }}>
          Progress →
        </Link>
      </div>

      {/* Hero tree */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "10px clamp(16px, 4vw, 32px) 60px",
          maxWidth: 640,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            perspective: 1200,
            margin: "0 auto",
            width: "min(280px, 70vw)",
            aspectRatio: "1 / 1",
          }}
        >
          <motion.div
            animate={{ y: [0, -12, 0], rotateY: [-3, 3, -3] }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 28,
              overflow: "hidden",
              background: "#0B0B14",
              transformStyle: "preserve-3d",
              border: `1px solid ${stage.hue.ring}55`,
              boxShadow: `
                0 0 80px ${stage.hue.glow},
                0 30px 60px rgba(0,0,0,0.5),
                inset 0 0 40px rgba(0,0,0,0.4)
              `,
            }}
          >
            <img
              src={display.url}
              alt={`${stage.name} — day ${streak} streak tree`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </motion.div>
        </div>

        {/* Stage info */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          style={{
            marginTop: 28,
            fontSize: 26,
            fontWeight: 800,
            background: IRIDESCENT,
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.01em",
          }}
        >
          🌳 {stage.name}
        </motion.h1>
        <p style={{ marginTop: 6, fontSize: 15, color: TEXT_MUTED }}>Day {streak} streak</p>
        <p
          style={{
            marginTop: 14,
            fontSize: 14,
            color: "rgba(240,238,255,0.55)",
            lineHeight: 1.7,
            maxWidth: 360,
            margin: "14px auto 0",
          }}
        >
          {description}
        </p>

        {/* Next-milestone bar */}
        {next && (
          <div style={{ marginTop: 24, maxWidth: 360, margin: "24px auto 0" }}>
            <p
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11.5,
                color: TEXT_DIM,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <span>Next: {next.name}</span>
              <span>{pct}%</span>
            </p>
            <div
              style={{
                marginTop: 6,
                height: 6,
                borderRadius: 3,
                background: "rgba(255,255,255,0.05)",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: "100%",
                  background: IRIDESCENT,
                  backgroundSize: "200% 200%",
                  boxShadow: `0 0 12px ${stage.hue.glow}`,
                }}
              />
            </div>
            <p style={{ marginTop: 6, fontSize: 11, color: TEXT_MUTED }}>
              {next.milestone - streak} day{next.milestone - streak === 1 ? "" : "s"} until the next
              evolution.
            </p>
          </div>
        )}

        {/* Growth timeline */}
        <div style={{ marginTop: 36 }}>
          <p
            style={{
              fontSize: 11,
              color: TEXT_DIM,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Growth timeline
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              overflowX: "auto",
              paddingBottom: 6,
              justifyContent: "flex-start",
            }}
            className="dash-scroll"
          >
            {MILESTONES.map((m) => {
              const unlocked = streak >= m
              const milestoneStage = STAGES.find((s) => s.milestone === m) ?? STAGES[0]
              const tree = treeByMilestone.get(m)
              const src = tree?.url || svgDataUrl(milestoneStage.key)
              const isCurrent = m === stage.milestone
              return (
                <div
                  key={m}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: isCurrent ? 56 : 44,
                      height: isCurrent ? 56 : 44,
                      borderRadius: "50%",
                      overflow: "hidden",
                      position: "relative",
                      border: isCurrent
                        ? `2px solid ${milestoneStage.hue.ring}`
                        : "1px solid rgba(255,255,255,0.1)",
                      background: "#0A0A14",
                      boxShadow: isCurrent ? `0 0 18px ${milestoneStage.hue.glow}` : "none",
                      filter: unlocked ? "none" : "grayscale(0.85)",
                      opacity: unlocked ? 1 : 0.5,
                    }}
                    title={unlocked ? milestoneStage.name : `Unlock at day ${m}`}
                  >
                    <img src={src} alt={milestoneStage.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    {!unlocked && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(10,10,20,0.65)",
                          display: "grid",
                          placeItems: "center",
                          color: "rgba(240,238,255,0.7)",
                          fontSize: 14,
                        }}
                      >
                        🔒
                      </div>
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: 10.5,
                      color: isCurrent ? TEXT_PRIMARY : TEXT_DIM,
                      fontWeight: isCurrent ? 700 : 500,
                    }}
                  >
                    Day {m}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Sub-stats + Share */}
        <div
          style={{
            marginTop: 32,
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
            fontSize: 12,
            color: TEXT_MUTED,
          }}
        >
          <Pill>📚 {sessions} session{sessions === 1 ? "" : "s"}</Pill>
          <Pill>
            ⏱ {totalHours} hour{totalHours === 1 ? "" : "s"} invested
          </Pill>
          <Pill>🎯 {goal}</Pill>
        </div>

        <div
          style={{
            marginTop: 26,
            display: "flex",
            justifyContent: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onShare}
            style={shareBtnStyle}
            type="button"
          >
            📤 Share my tree
          </motion.button>
          <button onClick={() => navigate(-1)} style={ghostBtnStyle} type="button">
            ← Back
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Sub-bits ────────────────────────────────────────────────────────── */

function AmbientOrbs() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-15%",
          left: "-15%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(200,0,0,0.32), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        animate={{ x: [0, -30, 20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "30%",
          right: "-15%",
          width: 460,
          height: 460,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(244,114,182,0.24), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        animate={{ x: [0, 20, -30, 0], y: [0, -40, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "30%",
          width: 440,
          height: 440,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(34,211,238,0.22), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        padding: "5px 11px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        fontSize: 11.5,
        color: TEXT_PRIMARY,
      }}
    >
      {children}
    </span>
  )
}

/* ── Styles ──────────────────────────────────────────────────────────── */

const topBtnStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 14px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: TEXT_PRIMARY,
  fontSize: 13,
  cursor: "pointer",
}

const shareBtnStyle: CSSProperties = {
  padding: "12px 22px",
  borderRadius: 14,
  background: IRIDESCENT,
  color: "#fff",
  fontWeight: 700,
  fontSize: 14,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 14px 36px rgba(200,0,0,0.45)",
}

const ghostBtnStyle: CSSProperties = {
  padding: "11px 18px",
  borderRadius: 14,
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.08)",
  color: TEXT_MUTED,
  fontSize: 13,
  cursor: "pointer",
}
