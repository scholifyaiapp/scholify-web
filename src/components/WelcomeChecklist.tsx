import { useCallback, useMemo, useState, type CSSProperties } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { readPlan } from "@/lib/scholify-data"
import { readMyTeamIds } from "@/lib/teams-storage"
import { readMemberships as readRoomMemberships } from "@/lib/rooms-storage"
import { readPartnership } from "@/lib/partner-storage"

/*
 * One-time first-login welcome checklist.
 *
 * Lives outside any single page so it can be triggered after onboarding
 * completes. Persistence in localStorage so it never reappears.
 */

const KEY_SHOWN = "scholify-welcome-shown"

const TEXT_PRIMARY = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"
const TEXT_DIM = "var(--sch-tx-3)"

export function shouldShowWelcomeChecklist(): boolean {
  if (typeof window === "undefined") return false
  if (window.localStorage.getItem(KEY_SHOWN) === "1") return false
  // Only show once a plan exists so it never beats the onboarding flow.
  const plan = readPlan()
  return Array.isArray(plan.tasks) && plan.tasks.length > 0
}

export function markWelcomeShown(): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(KEY_SHOWN, "1")
  } catch {
    /* ignore */
  }
}

export default function WelcomeChecklist({ onDismiss }: { onDismiss: () => void }) {
  const [open, setOpen] = useState(true)

  // Snapshot the world once when the modal opens.
  const status = useMemo(
    () => ({
      planReady: (readPlan().tasks?.length || 0) > 0,
      // Notifications and calendar live in Settings; treat them as "todo"
      // because we can't easily detect grants from here, and the user can
      // re-check from settings.
      hasPartner: !!readPartnership(),
      hasRoom: readRoomMemberships().length > 0,
      hasTeam: readMyTeamIds().length > 0,
    }),
    [],
  )

  const dismiss = useCallback(
    (skip = false) => {
      markWelcomeShown()
      setOpen(false)
      // Defer the parent callback so the exit animation runs.
      window.setTimeout(() => onDismiss(), 220)
      // Mark `skip` referenced so unused-var rule stays quiet; useful for telemetry later.
      void skip
    },
    [onDismiss],
  )

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 110,
            background: "rgba(5,5,8,0.72)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "grid",
            placeItems: "center",
            padding: 16,
          }}
        >
          <motion.div
            initial={{ y: 12, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            style={modalStyle}
          >
            <p
              style={{
                fontSize: 11.5,
                color: TEXT_DIM,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Welcome
            </p>
            <h2 style={{ marginTop: 6, fontSize: 22, fontWeight: 800, color: TEXT_PRIMARY, lineHeight: 1.15 }}>
              Your Scholify is ready 🎉
            </h2>
            <p style={{ marginTop: 6, fontSize: 13.5, color: TEXT_MUTED, lineHeight: 1.55 }}>
              A few optional next steps to make the streak harder to break.
            </p>

            <ul style={{ marginTop: 18, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
              <Item
                done={status.planReady}
                title="Plan generated"
                body="Lara built your daily schedule. Open today's task on the dashboard."
                href="/dashboard"
                onClick={() => dismiss()}
                cta="Open"
              />
              <Item
                done={false}
                title="Turn on notifications"
                body="Daily nudge + reminder when the streak is at risk."
                href="/settings"
                onClick={() => dismiss()}
                cta="Settings →"
              />
              <Item
                done={false}
                title="Connect your calendar"
                body="Auto-sync your daily task to Google Calendar."
                href="/settings"
                onClick={() => dismiss()}
                cta="Settings →"
              />
              <Item
                done={status.hasPartner}
                title="Invite an accountability partner"
                body="Two people, one goal. See each other's progress."
                href="/partner"
                onClick={() => dismiss()}
                cta={status.hasPartner ? "Open" : "Invite →"}
              />
              <Item
                done={status.hasRoom}
                title="Join a study room"
                body="Study with people working on the same goal."
                href="/rooms"
                onClick={() => dismiss()}
                cta={status.hasRoom ? "Open" : "Browse →"}
              />
            </ul>

            <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
              <button
                onClick={() => dismiss(true)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: TEXT_MUTED,
                  fontSize: 13,
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Skip
              </button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => dismiss()}
                style={{
                  padding: "11px 22px",
                  borderRadius: 12,
                  background: IRIDESCENT,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 10px 28px rgba(167,139,250,0.4)",
                }}
              >
                Let's go →
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Item({
  done,
  title,
  body,
  href,
  cta,
  onClick,
}: {
  done: boolean
  title: string
  body: string
  href: string
  cta: string
  onClick: () => void
}) {
  return (
    <li
      style={{
        display: "flex",
        gap: 12,
        padding: "12px 14px",
        borderRadius: 14,
        background: done ? "rgba(52,211,153,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${done ? "rgba(52,211,153,0.18)" : "rgba(255,255,255,0.06)"}`,
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: done ? "rgba(52,211,153,0.2)" : "transparent",
          border: `1.5px solid ${done ? "rgba(52,211,153,0.6)" : "rgba(255,255,255,0.18)"}`,
          color: done ? "#34D399" : "transparent",
          fontWeight: 800,
          fontSize: 12,
          flexShrink: 0,
        }}
      >
        ✓
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <p style={{ fontSize: 13.5, fontWeight: 700, color: TEXT_PRIMARY }}>{title}</p>
        <p style={{ marginTop: 2, fontSize: 12, color: TEXT_MUTED, lineHeight: 1.5 }}>{body}</p>
      </div>
      <Link
        to={href}
        onClick={onClick}
        style={{
          flexShrink: 0,
          padding: "7px 11px",
          borderRadius: 10,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: TEXT_PRIMARY,
          fontSize: 12,
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        {cta}
      </Link>
    </li>
  )
}

const modalStyle: CSSProperties = {
  width: "100%",
  maxWidth: 520,
  maxHeight: "90vh",
  overflowY: "auto",
  padding: 28,
  borderRadius: 22,
  background: "var(--sch-card, rgba(10,10,20,0.95))",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
}
