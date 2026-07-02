import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/Toast"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import {
  createRoom,
  ensureDiscoverSeeded,
  findRoomByCode,
  joinRoom,
  readMemberships,
  readRooms,
  subscribeRoomsLocal,
  type RoomCategory,
  type StudyRoom,
} from "@/lib/rooms-storage"
import RoomCard from "@/components/RoomCard"

/* ──────────────────────────────────────────────────────────────────────
 *  /rooms — list page with Your Rooms carousel + Discover grid.
 * ────────────────────────────────────────────────────────────────────── */

const TEXT_PRIMARY = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"
const TEXT_DIM = "var(--sch-tx-3)"

const FILTERS: Array<{ key: "all" | RoomCategory; label: string }> = [
  { key: "all", label: "All" },
  { key: "ielts", label: "IELTS" },
  { key: "coding", label: "Coding" },
  { key: "languages", label: "Languages" },
  { key: "design", label: "Design" },
  { key: "certifications", label: "Certifications" },
]

const glassBtn: CSSProperties = {
  padding: "10px 16px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: TEXT_PRIMARY,
  fontSize: 13.5,
  fontWeight: 600,
  cursor: "pointer",
}

const iridescentBtn: CSSProperties = {
  padding: "10px 16px",
  borderRadius: 12,
  background: IRIDESCENT,
  color: "#fff",
  fontSize: 13.5,
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 8px 24px rgba(200,0,0,0.35)",
}

const sectionLabel: CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: TEXT_DIM,
}

export default function Rooms() {
  const { user } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  // Seed once.
  useEffect(() => ensureDiscoverSeeded(), [])

  const [tick, setTick] = useState(0)
  useEffect(() => subscribeRoomsLocal(() => setTick((t) => t + 1)), [])

  const allRooms = useMemo(() => readRooms(), [tick])
  const myIds = useMemo(() => new Set(readMemberships()), [tick])
  const myRooms = useMemo(() => allRooms.filter((r) => myIds.has(r.id)), [allRooms, myIds])
  const discoverRooms = useMemo(
    () => allRooms.filter((r) => !myIds.has(r.id) && !r.isPrivate),
    [allRooms, myIds],
  )

  const [filter, setFilter] = useState<"all" | RoomCategory>("all")
  const filtered = useMemo(
    () => (filter === "all" ? discoverRooms : discoverRooms.filter((r) => r.category === filter)),
    [discoverRooms, filter],
  )

  const [showJoin, setShowJoin] = useState(false)
  const [showCreate, setShowCreate] = useState(false)

  const meId = user?.id || "demo-user"
  const meName = useMemo(() => {
    const meta = (user?.user_metadata || {}) as { first_name?: string }
    return (meta.first_name || "").trim() || user?.email?.split("@")[0] || "You"
  }, [user])

  const handleJoinRoom = useCallback(
    (room: StudyRoom) => {
      const m = joinRoom(room.id, { id: meId, name: meName })
      if (!m) {
        toast.error("This room is full.")
        return
      }
      toast.success(`Joined ${room.name} 🎉`)
      navigate(`/rooms/${room.id}`)
    },
    [meId, meName, toast, navigate],
  )

  const handleJoinByCode = useCallback(
    (rawCode: string) => {
      const code = rawCode.trim().toLowerCase()
      if (!code) {
        toast.warning("Paste an invite code first.")
        return
      }
      const room = findRoomByCode(code)
      if (!room) {
        toast.error("No room found for that code.")
        return
      }
      const m = joinRoom(room.id, { id: meId, name: meName })
      if (!m) {
        toast.error("This room is full.")
        return
      }
      toast.success(`Joined ${room.name} 🎉`)
      setShowJoin(false)
      navigate(`/rooms/${room.id}`)
    },
    [meId, meName, toast, navigate],
  )

  return (
    <DashboardLayout>
      <div style={{ padding: "24px clamp(16px, 4vw, 40px) 80px", maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              style={{ fontSize: 22, fontWeight: 800, color: TEXT_PRIMARY, lineHeight: 1.2 }}
            >
              <span style={iriText}>Study Rooms</span>
            </motion.h1>
            <p style={{ marginTop: 4, fontSize: 14, color: TEXT_MUTED }}>
              Study together. Stay consistent together.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => setShowJoin(true)} style={glassBtn}>
              Join with code
            </button>
            <button onClick={() => setShowCreate(true)} style={iridescentBtn}>
              + Create room
            </button>
          </div>
        </div>

        {/* Your rooms */}
        {myRooms.length > 0 && (
          <section style={{ marginTop: 32 }}>
            <p style={sectionLabel}>Your rooms</p>
            <div
              style={{
                marginTop: 12,
                display: "flex",
                gap: 14,
                overflowX: "auto",
                paddingBottom: 6,
              }}
              className="dash-scroll"
            >
              {myRooms.map((r) => (
                <div key={r.id} style={{ minWidth: 320, maxWidth: 360, flex: "0 0 auto" }}>
                  <RoomCard room={r} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Discover */}
        <section style={{ marginTop: 32 }}>
          <p style={sectionLabel}>Discover rooms</p>
          <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
            {FILTERS.map((f) => {
              const active = filter === f.key
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 999,
                    background: active ? "rgba(200,0,0,0.14)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${active ? "rgba(200,0,0,0.4)" : "rgba(255,255,255,0.06)"}`,
                    color: active ? "#D92E10" : TEXT_MUTED,
                    fontSize: 12.5,
                    fontWeight: active ? 600 : 500,
                    cursor: "pointer",
                  }}
                >
                  {f.label}
                </button>
              )
            })}
          </div>

          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {filtered.length === 0 && (
              <p style={{ fontSize: 14, color: TEXT_MUTED, padding: "32px 0" }}>
                Nothing in this category yet — be the first to create one.
              </p>
            )}
            {filtered.map((r) => (
              <RoomCard key={r.id} room={r} onJoin={handleJoinRoom} />
            ))}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {showJoin && <JoinByCodeModal onClose={() => setShowJoin(false)} onSubmit={handleJoinByCode} />}
      </AnimatePresence>
      <AnimatePresence>
        {showCreate && (
          <CreateRoomModal
            onClose={() => setShowCreate(false)}
            onCreated={(room) => {
              setShowCreate(false)
              navigate(`/rooms/${room.id}`)
            }}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  )
}

/* ── Join by code modal ──────────────────────────────────────────────── */

function ModalShell({
  onClose,
  children,
  title,
}: {
  onClose: () => void
  children: React.ReactNode
  title: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(5,5,8,0.65)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 100,
        display: "grid",
        placeItems: "center",
        padding: 16,
      }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        style={{
          width: "100%",
          maxWidth: 480,
          padding: 32,
          borderRadius: 24,
          background: "var(--sch-card, rgba(10,10,20,0.85))",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: TEXT_PRIMARY }}>{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "transparent",
              border: "none",
              color: TEXT_MUTED,
              fontSize: 20,
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  )
}

function JoinByCodeModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void
  onSubmit: (code: string) => void
}) {
  const [code, setCode] = useState("")
  return (
    <ModalShell onClose={onClose} title="Join with code">
      <p style={{ fontSize: 13.5, color: TEXT_MUTED, lineHeight: 1.55 }}>
        Paste the 8-character invite code your friend shared.
      </p>
      <input
        autoFocus
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit(code)
        }}
        placeholder="e.g. 7k3pma2x"
        style={{
          marginTop: 14,
          width: "100%",
          padding: "12px 14px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: TEXT_PRIMARY,
          fontSize: 16,
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.1em",
          outline: "none",
        }}
      />
      <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button onClick={onClose} style={{ ...glassBtn, padding: "9px 14px" }}>
          Cancel
        </button>
        <button onClick={() => onSubmit(code)} style={{ ...iridescentBtn, padding: "9px 18px" }}>
          Join →
        </button>
      </div>
    </ModalShell>
  )
}

/* ── Create room modal ───────────────────────────────────────────────── */

function CreateRoomModal({
  onClose,
  onCreated,
}: {
  onClose: () => void
  onCreated: (room: StudyRoom) => void
}) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [goal, setGoal] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<RoomCategory>("general")
  const [maxMembers, setMaxMembers] = useState(10)
  const [examDate, setExamDate] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)

  const meId = user?.id || "demo-user"
  const meName = useMemo(() => {
    const meta = (user?.user_metadata || {}) as { first_name?: string }
    return (meta.first_name || "").trim() || user?.email?.split("@")[0] || "You"
  }, [user])

  const submit = () => {
    if (!name.trim()) {
      toast.warning("Give your room a name.")
      return
    }
    if (!goal.trim()) {
      toast.warning("Describe what everyone is working on.")
      return
    }
    const room = createRoom(
      {
        name,
        goal,
        description: description || undefined,
        category,
        maxMembers,
        examDate: examDate || null,
        isPrivate,
      },
      { id: meId, name: meName },
    )
    toast.success("Room created ⚡")
    onCreated(room)
  }

  return (
    <ModalShell onClose={onClose} title="Create a study room">
      <div style={{ display: "grid", gap: 14 }}>
        <Field label="Room name" hint={`${name.length}/40`}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 40))}
            placeholder="IELTS Band 7 Crew"
            style={inputStyle}
            autoFocus
          />
        </Field>
        <Field label="What are you all studying?">
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Hit IELTS Band 7 across all four modules"
            rows={3}
            style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
          />
        </Field>
        <Field label="Description (optional)">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Daily speaking + writing drills, peer feedback."
            rows={2}
            style={{ ...inputStyle, resize: "vertical", minHeight: 60 }}
          />
        </Field>
        <Field label="Category">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as RoomCategory)}
            style={inputStyle}
          >
            <option value="general">General</option>
            <option value="ielts">IELTS</option>
            <option value="coding">Coding</option>
            <option value="languages">Languages</option>
            <option value="design">Design</option>
            <option value="certifications">Certifications</option>
          </select>
        </Field>
        <Field label={`Max members — ${maxMembers}`}>
          <input
            type="range"
            min={2}
            max={10}
            value={maxMembers}
            onChange={(e) => setMaxMembers(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#C80000" }}
          />
        </Field>
        <Field label="Exam date (optional)">
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            style={inputStyle}
          />
        </Field>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            style={{ accentColor: "#C80000" }}
          />
          <div>
            <p style={{ fontSize: 13, color: TEXT_PRIMARY }}>Private room</p>
            <p style={{ fontSize: 11.5, color: TEXT_DIM, marginTop: 2 }}>Invite code only — not listed in Discover.</p>
          </div>
        </label>
      </div>

      <div style={{ marginTop: 22, display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button onClick={onClose} style={{ ...glassBtn, padding: "9px 14px" }}>
          Cancel
        </button>
        <button onClick={submit} style={{ ...iridescentBtn, padding: "9px 20px" }}>
          Create room ⚡
        </button>
      </div>
    </ModalShell>
  )
}

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: TEXT_PRIMARY,
  fontSize: 14,
  outline: "none",
  fontFamily: "inherit",
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 11.5, color: TEXT_DIM, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {label}
        </span>
        {hint && <span style={{ fontSize: 11, color: TEXT_DIM }}>{hint}</span>}
      </div>
      {children}
    </div>
  )
}
