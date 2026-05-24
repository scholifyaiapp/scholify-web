import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { formatDistanceToNowStrict } from "date-fns"
import { useAuth } from "@/lib/auth"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import {
  deriveNotifications,
  markAllRead,
  markKindRead,
  subscribeNotifications,
  type NotificationItem,
  type NotificationKind,
} from "@/lib/notification-center"

/*
 * Global notification bell — lives in DashboardLayout's top-right.
 * Click → dropdown with grouped unread items + "mark all read".
 */

const TEXT_PRIMARY = "var(--sch-text, #F0EEFF)"
const TEXT_MUTED = "var(--sch-tx-2, rgba(240,238,255,0.6))"
const TEXT_DIM = "var(--sch-tx-3, rgba(240,238,255,0.45))"

const KIND_LABEL: Record<NotificationKind, string> = {
  partner: "Partner",
  room: "Rooms",
  community: "Community",
  quiz: "Quiz",
}

const KIND_ICON: Record<NotificationKind, string> = {
  partner: "👥",
  room: "🏫",
  community: "🌍",
  quiz: "🏆",
}

export default function NotificationBell() {
  const { user } = useAuth()
  const me = user?.id || "demo-user"
  const [open, setOpen] = useState(false)
  const [tick, setTick] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => subscribeNotifications(() => setTick((t) => t + 1)), [])

  const summary = useMemo(() => deriveNotifications(me), [me, tick])

  // Close on outside click.
  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [open])

  const onItemClick = useCallback((item: NotificationItem) => {
    markKindRead(item.kind)
    setOpen(false)
  }, [])

  const onMarkAll = useCallback(() => {
    markAllRead()
  }, [])

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.95 }}
        aria-label="Notifications"
        style={{
          position: "relative",
          width: 36,
          height: 36,
          borderRadius: 12,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
          color: TEXT_PRIMARY,
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
        }}
      >
        <span style={{ fontSize: 16 }} aria-hidden>🔔</span>
        {summary.total > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 22 }}
            style={badgeStyle}
          >
            {summary.total > 9 ? "9+" : summary.total}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={dropdownStyle}
          >
            <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: TEXT_PRIMARY }}>Notifications</span>
              {summary.total > 0 && (
                <button
                  onClick={onMarkAll}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#C084FC",
                    fontSize: 11.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Mark all read
                </button>
              )}
            </div>

            <div style={{ maxHeight: 360, overflowY: "auto" }} className="dash-scroll">
              {summary.items.length === 0 ? (
                <div style={{ padding: "28px 16px", textAlign: "center", color: TEXT_MUTED, fontSize: 13 }}>
                  <p style={{ fontSize: 22, marginBottom: 8 }} aria-hidden>✨</p>
                  You're all caught up.
                </div>
              ) : (
                <ul style={{ margin: 0, padding: 6, listStyle: "none", display: "grid", gap: 4 }}>
                  {summary.items.map((it) => (
                    <li key={it.id}>
                      <Link
                        to={it.href}
                        onClick={() => onItemClick(it)}
                        style={{
                          display: "block",
                          padding: "10px 12px",
                          borderRadius: 10,
                          textDecoration: "none",
                          color: "inherit",
                          background: "transparent",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                          <span style={{ fontSize: 16, lineHeight: 1, marginTop: 1 }} aria-hidden>
                            {KIND_ICON[it.kind]}
                          </span>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <p style={{ fontSize: 13, fontWeight: 600, color: TEXT_PRIMARY, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {it.title}
                            </p>
                            <p style={{ marginTop: 2, fontSize: 12, color: TEXT_MUTED, lineHeight: 1.45, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                              {it.body}
                            </p>
                            <p style={{ marginTop: 4, fontSize: 10.5, color: TEXT_DIM }}>
                              {KIND_LABEL[it.kind]} · {formatDistanceToNowStrict(new Date(it.createdAt), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const badgeStyle: CSSProperties = {
  position: "absolute",
  top: -4,
  right: -4,
  minWidth: 18,
  height: 18,
  padding: "0 5px",
  borderRadius: 9,
  background: IRIDESCENT,
  color: "#fff",
  fontSize: 10,
  fontWeight: 700,
  display: "grid",
  placeItems: "center",
  border: "2px solid var(--sch-bg, #0A0A14)",
  lineHeight: 1,
}

const dropdownStyle: CSSProperties = {
  position: "absolute",
  top: "calc(100% + 8px)",
  right: 0,
  width: 340,
  maxWidth: "calc(100vw - 32px)",
  borderRadius: 16,
  background: "var(--sch-card, rgba(10,10,20,0.95))",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px) saturate(140%)",
  WebkitBackdropFilter: "blur(20px) saturate(140%)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  zIndex: 50,
  overflow: "hidden",
}
