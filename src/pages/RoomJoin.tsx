import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { motion } from "motion/react"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/Toast"
import { DashboardLayout } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import {
  consumePendingJoinCode,
  findRoomByCode,
  joinRoom,
  readMembers,
  setPendingJoinCode,
  type StudyRoom,
} from "@/lib/rooms-storage"

/*
 * /join/:code — public invite landing.
 *  • Guests: stash the code, bounce to /sign-up?invite=…
 *  • Signed-in: show a preview card, then "Join this room →".
 */

const TEXT_PRIMARY = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"

const card: CSSProperties = {
  borderRadius: 24,
  padding: 32,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px solid var(--sch-border, rgba(255,255,255,0.08))",
  textAlign: "center",
}

export default function RoomJoin() {
  const { code = "" } = useParams<{ code: string }>()
  const { user, loading } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (!user && code) setPendingJoinCode(code)
  }, [user, loading, code])

  // Once signed in, consume any pending code that was stashed during sign-up.
  const effectiveCode = useMemo(() => {
    if (!user) return code
    return code || consumePendingJoinCode() || ""
  }, [user, code])

  const [room, setRoom] = useState<StudyRoom | null>(null)
  useEffect(() => {
    if (!effectiveCode) return
    setRoom(findRoomByCode(effectiveCode))
  }, [effectiveCode])

  const handleJoin = useCallback(() => {
    if (!room || !user) return
    const meta = (user.user_metadata || {}) as { first_name?: string }
    const name = (meta.first_name || "").trim() || user.email?.split("@")[0] || "Friend"
    const m = joinRoom(room.id, { id: user.id, name })
    if (!m) {
      toast.error("This room is full.")
      return
    }
    toast.success(`Joined ${room.name} 🎉`)
    navigate(`/rooms/${room.id}`)
  }, [room, user, toast, navigate])

  if (loading) return null
  if (!user) return <Navigate to={`/sign-up?invite=${code}`} replace />

  if (!room) {
    return (
      <DashboardLayout>
        <div style={{ padding: "60px 16px", maxWidth: 460, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            style={card}
          >
            <h1 style={{ fontSize: 22, fontWeight: 800, color: TEXT_PRIMARY }}>Invite expired</h1>
            <p style={{ marginTop: 8, fontSize: 14, color: TEXT_MUTED }}>
              We couldn't find a room for that code. Ask your friend to share a new link.
            </p>
            <button
              onClick={() => navigate("/rooms")}
              style={{
                marginTop: 18,
                padding: "10px 18px",
                borderRadius: 12,
                background: IRIDESCENT,
                color: "#fff",
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Browse rooms →
            </button>
          </motion.div>
        </div>
      </DashboardLayout>
    )
  }

  const members = readMembers(room.id)

  return (
    <DashboardLayout>
      <div style={{ padding: "60px 16px", maxWidth: 480, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={card}
        >
          <p style={{ fontSize: 12, color: TEXT_MUTED, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            You're invited
          </p>
          <h1 style={{ marginTop: 8, fontSize: 24, fontWeight: 800, color: TEXT_PRIMARY }}>
            {room.name}
          </h1>
          <p style={{ marginTop: 8, fontSize: 14, color: TEXT_MUTED, lineHeight: 1.55 }}>
            {room.goal}
          </p>
          <p style={{ marginTop: 14, fontSize: 12.5, color: TEXT_MUTED }}>
            {members.length}/{room.maxMembers} members
          </p>
          <button
            onClick={handleJoin}
            style={{
              marginTop: 22,
              padding: "12px 22px",
              borderRadius: 999,
              background: IRIDESCENT,
              color: "#fff",
              border: "none",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 10px 28px rgba(167,139,250,0.4)",
            }}
          >
            Join this room →
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
