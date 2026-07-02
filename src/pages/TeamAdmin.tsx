import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { format } from "date-fns"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/Toast"
import { DashboardLayout } from "@/components/dashboard-layout"
import { api } from "@/lib/api"
import {
  buildTeamJoinURL,
  createInvites,
  downloadCSV,
  isAdminOf,
  membersToCSV,
  postAnnouncement,
  readInvites,
  readMembers,
  readTeam,
  removeMember,
  subscribeTeamsLocal,
  updateMember,
  type Team,
  type TeamMember,
} from "@/lib/teams-storage"

/* ──────────────────────────────────────────────────────────────────────
 *  /teams/:id/admin — full admin workspace dashboard.
 *  Tabs: Overview · Members · Invite · Analytics · Broadcast · Settings
 * ────────────────────────────────────────────────────────────────────── */

type AdminTab = "overview" | "members" | "invite" | "analytics" | "broadcast" | "settings"

const TEXT_PRIMARY = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"
const TEXT_DIM = "var(--sch-tx-3)"

const card: CSSProperties = {
  borderRadius: 18,
  padding: 22,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
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

function relativeTime(iso: string): string {
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000)
  if (m < 5) return "active now"
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.round(h / 24)
  return `${d}d ago`
}

function statusColor(status: TeamMember["status"]): string {
  if (status === "active") return "#34D399"
  if (status === "inactive") return "#FB923C"
  return "rgba(255,255,255,0.35)"
}

function statusLabel(status: TeamMember["status"]): string {
  if (status === "active") return "Active"
  if (status === "inactive") return "Inactive"
  return "Not started"
}

export default function TeamAdmin() {
  const { id = "" } = useParams<{ id: string }>()
  const { user } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const [tick, setTick] = useState(0)
  useEffect(() => subscribeTeamsLocal(() => setTick((t) => t + 1)), [])

  const team: Team | null = useMemo(() => readTeam(id), [id, tick])
  const members = useMemo(() => readMembers(id), [id, tick])
  const invites = useMemo(() => readInvites(id), [id, tick])

  const [tab, setTab] = useState<AdminTab>("overview")
  const isAdmin = useMemo(() => (user ? isAdminOf(id, user.id) : false), [id, user, tick])

  if (!team) {
    return (
      <DashboardLayout>
        <div style={{ padding: 32, color: TEXT_MUTED }}>
          This workspace doesn't exist.{" "}
          <Link to="/teams" style={{ color: "#D92E10" }}>
            Back to Teams
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  if (!isAdmin) {
    return <Navigate to={`/teams/${team.id}`} replace />
  }

  const brand = team.primaryColor

  return (
    <DashboardLayout>
      <div style={{ padding: "24px clamp(16px, 4vw, 40px) 80px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Branded header */}
        <BrandedHeader team={team} />

        {/* Tabs */}
        <div style={{ marginTop: 18, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {(["overview", "members", "invite", "analytics", "broadcast", "settings"] as AdminTab[]).map((t) => {
            const active = tab === t
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: active ? `${brand}22` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${active ? `${brand}66` : "rgba(255,255,255,0.06)"}`,
                  color: active ? brand : TEXT_MUTED,
                  fontSize: 12.5,
                  fontWeight: active ? 700 : 500,
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {t}
              </button>
            )
          })}
          <div style={{ flex: 1 }} />
          <button
            onClick={() => navigate(`/teams/${team.id}`)}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: TEXT_MUTED,
              fontSize: 12.5,
              cursor: "pointer",
            }}
          >
            View as member →
          </button>
        </div>

        <div style={{ marginTop: 20 }}>
          {tab === "overview" && <OverviewTab team={team} members={members} />}
          {tab === "members" && (
            <MembersTab team={team} members={members} onChange={() => setTick((t) => t + 1)} />
          )}
          {tab === "invite" && (
            <InviteTab team={team} invites={invites} adminName={user?.email?.split("@")[0] || "Admin"} onChange={() => setTick((t) => t + 1)} />
          )}
          {tab === "analytics" && <AnalyticsTab team={team} members={members} />}
          {tab === "broadcast" && (
            <BroadcastTab
              team={team}
              memberCount={members.length}
              authorId={user?.id || "demo-user"}
              onSent={() => {
                toast.success("Announcement broadcast.")
                setTick((t) => t + 1)
              }}
            />
          )}
          {tab === "settings" && <SettingsTab team={team} />}
        </div>
      </div>
    </DashboardLayout>
  )
}

/* ── Branded header ──────────────────────────────────────────────────── */

function BrandedHeader({ team }: { team: Team }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: 16,
        borderRadius: 16,
        background: `linear-gradient(135deg, ${team.primaryColor}33, transparent)`,
        border: `1px solid ${team.primaryColor}55`,
      }}
    >
      {team.logoDataUrl ? (
        <img src={team.logoDataUrl} alt={team.name} style={{ width: 44, height: 44, borderRadius: 12, objectFit: "cover" }} />
      ) : (
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: team.primaryColor,
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontWeight: 800,
            fontSize: 18,
          }}
        >
          {(team.name?.trim()?.[0] || "?").toUpperCase()}
        </div>
      )}
      <div style={{ minWidth: 0, flex: 1 }}>
        <p style={{ fontSize: 11.5, color: TEXT_DIM, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Admin · {team.planType === "enterprise" ? "Enterprise" : "Teams"}
        </p>
        <h1 style={{ marginTop: 2, fontSize: 22, fontWeight: 800, color: TEXT_PRIMARY }}>{team.name}</h1>
      </div>
    </div>
  )
}

/* ── Overview ────────────────────────────────────────────────────────── */

function OverviewTab({ team, members }: { team: Team; members: TeamMember[] }) {
  const total = members.length
  const today = members.filter((m) => m.status === "active").length
  const avgStreak = total > 0 ? Math.round(members.reduce((s, m) => s + m.streak, 0) / total) : 0
  const weekTotalSlots = members.reduce((s, m) => s + (m.weekTotal || 5), 0) || 1
  const weekDone = members.reduce((s, m) => s + (m.weekSessions || 0), 0)
  const completion = Math.round((weekDone / weekTotalSlots) * 100)

  const stats = [
    { label: "Total members", value: total },
    { label: "Active today", value: today },
    { label: "Average streak", value: `${avgStreak} 🔥` },
    { label: "Completion this week", value: `${completion}%` },
  ]

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 14,
        }}
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={card}
          >
            <p style={{ fontSize: 12, color: TEXT_MUTED }}>{s.label}</p>
            <p style={{ marginTop: 6, fontSize: 24, fontWeight: 800, color: team.primaryColor }}>
              {s.value}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Members ─────────────────────────────────────────────────────────── */

type SortKey = "name" | "goal" | "currentDay" | "streak" | "week" | "lastActive" | "status"

function MembersTab({
  team,
  members,
  onChange,
}: {
  team: Team
  members: TeamMember[]
  onChange: () => void
}) {
  const { toast } = useToast()
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [asc, setAsc] = useState(true)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState("")
  const [actionFor, setActionFor] = useState<string | null>(null)
  const [assignFor, setAssignFor] = useState<TeamMember | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = members
    if (q) list = list.filter((m) => m.name.toLowerCase().includes(q) || (m.email || "").toLowerCase().includes(q))
    const sorted = [...list].sort((a, b) => {
      const dir = asc ? 1 : -1
      switch (sortKey) {
        case "name":
          return dir * a.name.localeCompare(b.name)
        case "goal":
          return dir * (a.assignedGoal || "").localeCompare(b.assignedGoal || "")
        case "currentDay":
          return dir * (a.currentDay - b.currentDay)
        case "streak":
          return dir * (a.streak - b.streak)
        case "week":
          return dir * (a.weekSessions - b.weekSessions)
        case "lastActive":
          return dir * (new Date(a.lastActiveAt).getTime() - new Date(b.lastActiveAt).getTime())
        case "status":
          return dir * a.status.localeCompare(b.status)
      }
    })
    return sorted
  }, [members, sortKey, asc, search])

  const toggleSort = (k: SortKey) => {
    if (k === sortKey) setAsc((v) => !v)
    else {
      setSortKey(k)
      setAsc(true)
    }
  }

  const allSelected = filtered.length > 0 && filtered.every((m) => selected.has(m.userId))
  const toggleAll = () => {
    if (allSelected) setSelected(new Set())
    else setSelected(new Set(filtered.map((m) => m.userId)))
  }
  const toggleOne = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  const onRowAction = useCallback(
    (kind: "remind" | "remove", m: TeamMember) => {
      if (kind === "remind") {
        toast.success(`Reminder queued for ${m.name}.`)
      } else if (kind === "remove") {
        if (m.userId === team.adminId) {
          toast.warning("You can't remove the workspace admin.")
          return
        }
        removeMember(team.id, m.userId)
        toast.info(`${m.name} removed.`)
        onChange()
      }
      setActionFor(null)
    },
    [team.id, team.adminId, toast, onChange],
  )

  const onBulkRemind = () => {
    if (selected.size === 0) {
      toast.warning("Select at least one member.")
      return
    }
    toast.success(`Reminder queued for ${selected.size} member${selected.size === 1 ? "" : "s"}.`)
  }
  const onBulkExport = () => {
    const subset = selected.size > 0 ? members.filter((m) => selected.has(m.userId)) : members
    downloadCSV(`${team.name.replace(/\s+/g, "-").toLowerCase()}-members.csv`, membersToCSV(subset))
    toast.success(`Exported ${subset.length} row${subset.length === 1 ? "" : "s"}.`)
  }

  return (
    <div style={card}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search members…"
          style={{ ...inputStyle, maxWidth: 260, padding: "9px 12px", fontSize: 13 }}
        />
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: TEXT_DIM }}>
          {selected.size > 0 ? `${selected.size} selected` : `${filtered.length} members`}
        </span>
        <button
          onClick={onBulkRemind}
          style={{
            padding: "8px 12px",
            borderRadius: 10,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: TEXT_PRIMARY,
            fontSize: 12.5,
            cursor: "pointer",
          }}
        >
          Send reminder
        </button>
        <button
          onClick={onBulkExport}
          style={{
            padding: "8px 12px",
            borderRadius: 10,
            background: team.primaryColor,
            color: "#fff",
            fontSize: 12.5,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Export {selected.size > 0 ? `${selected.size} →` : "all →"}
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
          <thead>
            <tr>
              <Th>
                <input type="checkbox" checked={allSelected} onChange={toggleAll} aria-label="Select all" />
              </Th>
              {[
                ["name", "Name"],
                ["goal", "Goal"],
                ["currentDay", "Day"],
                ["streak", "Streak"],
                ["week", "This week"],
                ["lastActive", "Last active"],
                ["status", "Status"],
              ].map(([k, label]) => (
                <Th key={k} onClick={() => toggleSort(k as SortKey)}>
                  <span style={{ display: "inline-flex", gap: 4, cursor: "pointer" }}>
                    {label}
                    {sortKey === k && <span style={{ color: TEXT_MUTED }}>{asc ? "↑" : "↓"}</span>}
                  </span>
                </Th>
              ))}
              <Th />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} style={{ padding: "32px 12px", textAlign: "center", color: TEXT_MUTED, fontSize: 13.5 }}>
                  No members match.
                </td>
              </tr>
            )}
            {filtered.map((m) => {
              const pct = m.totalDays > 0 ? Math.min(100, Math.round((m.currentDay / m.totalDays) * 100)) : 0
              return (
                <tr
                  key={m.id}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    background: selected.has(m.userId) ? `${team.primaryColor}0F` : "transparent",
                  }}
                >
                  <Td>
                    <input
                      type="checkbox"
                      checked={selected.has(m.userId)}
                      onChange={() => toggleOne(m.userId)}
                      aria-label={`Select ${m.name}`}
                    />
                  </Td>
                  <Td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <MiniAvatar name={m.name} color={team.primaryColor} />
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: 13, color: TEXT_PRIMARY, fontWeight: 600 }}>
                          {m.name}
                          {m.role === "admin" && (
                            <span style={{ marginLeft: 6, fontSize: 10, color: team.primaryColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                              admin
                            </span>
                          )}
                        </p>
                        {m.email && (
                          <p style={{ fontSize: 11, color: TEXT_DIM, marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>
                            {m.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <span
                      title={m.assignedGoal || ""}
                      style={{
                        display: "inline-block",
                        maxWidth: 180,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        padding: "3px 9px",
                        borderRadius: 999,
                        background: `${team.primaryColor}1A`,
                        border: `1px solid ${team.primaryColor}33`,
                        color: TEXT_PRIMARY,
                        fontSize: 12,
                      }}
                    >
                      {m.assignedGoal || "—"}
                    </span>
                  </Td>
                  <Td>
                    <div style={{ minWidth: 100 }}>
                      <p style={{ fontSize: 12, color: TEXT_MUTED, fontVariantNumeric: "tabular-nums" }}>
                        {m.currentDay} / {m.totalDays}
                      </p>
                      <div style={{ marginTop: 4, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: team.primaryColor }} />
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <span style={{ fontSize: 13, color: m.streak >= 7 ? "#FB923C" : TEXT_MUTED, fontWeight: 600 }}>
                      🔥 {m.streak}
                    </span>
                  </Td>
                  <Td>
                    <span style={{ fontSize: 12, color: TEXT_MUTED, fontVariantNumeric: "tabular-nums" }}>
                      {m.weekSessions}/{m.weekTotal}
                    </span>
                  </Td>
                  <Td>
                    <span style={{ fontSize: 12, color: TEXT_DIM }}>{relativeTime(m.lastActiveAt)}</span>
                  </Td>
                  <Td>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        color: statusColor(m.status),
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor(m.status) }} />
                      {statusLabel(m.status)}
                    </span>
                  </Td>
                  <Td>
                    <div style={{ position: "relative" }}>
                      <button
                        onClick={() => setActionFor(actionFor === m.id ? null : m.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: TEXT_MUTED,
                          fontSize: 16,
                          cursor: "pointer",
                          padding: "0 6px",
                        }}
                        aria-label="Actions"
                      >
                        ⋯
                      </button>
                      {actionFor === m.id && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            right: 0,
                            marginTop: 4,
                            padding: 4,
                            borderRadius: 12,
                            background: "rgba(10,10,20,0.95)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            backdropFilter: "blur(14px)",
                            WebkitBackdropFilter: "blur(14px)",
                            boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
                            zIndex: 5,
                            minWidth: 160,
                          }}
                        >
                          <RowMenuItem label="Send reminder" onClick={() => onRowAction("remind", m)} />
                          <RowMenuItem
                            label="Assign new goal"
                            onClick={() => {
                              setAssignFor(m)
                              setActionFor(null)
                            }}
                          />
                          <RowMenuItem label="Remove from team" danger onClick={() => onRowAction("remove", m)} />
                        </div>
                      )}
                    </div>
                  </Td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {assignFor && (
          <AssignGoalModal
            member={assignFor}
            team={team}
            onClose={() => setAssignFor(null)}
            onSaved={() => {
              setAssignFor(null)
              onChange()
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function Th({ children, onClick }: { children?: React.ReactNode; onClick?: () => void }) {
  return (
    <th
      onClick={onClick}
      style={{
        padding: "10px 10px",
        textAlign: "left",
        fontSize: 11,
        color: TEXT_DIM,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontWeight: 600,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {children}
    </th>
  )
}
function Td({ children }: { children?: React.ReactNode }) {
  return <td style={{ padding: "10px 10px", verticalAlign: "middle", fontSize: 13 }}>{children}</td>
}

function MiniAvatar({ name, color }: { name: string; color: string }) {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: 8,
        background: color,
        display: "grid",
        placeItems: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: 12,
        flexShrink: 0,
      }}
    >
      {(name?.[0] || "?").toUpperCase()}
    </div>
  )
}

function RowMenuItem({ label, onClick, danger }: { label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        padding: "8px 10px",
        background: "transparent",
        border: "none",
        color: danger ? "#FF6B6B" : TEXT_PRIMARY,
        fontSize: 12.5,
        borderRadius: 8,
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {label}
    </button>
  )
}

/* ── Assign goal modal ───────────────────────────────────────────────── */

function AssignGoalModal({
  member,
  team,
  onClose,
  onSaved,
}: {
  member: TeamMember
  team: Team
  onClose: () => void
  onSaved: () => void
}) {
  const [goal, setGoal] = useState(member.assignedGoal || "")
  const [deadline, setDeadline] = useState(member.assignedDeadline || "")
  const [daily, setDaily] = useState(member.assignedDailyMinutes)
  const { toast } = useToast()

  const save = () => {
    updateMember(team.id, member.userId, {
      assignedGoal: goal || undefined,
      assignedDeadline: deadline || null,
      assignedDailyMinutes: daily,
    })
    toast.success(`Updated ${member.name}.`)
    onSaved()
  }

  return (
    <ModalShell onClose={onClose} title={`Assign goal — ${member.name}`}>
      <div style={{ display: "grid", gap: 12 }}>
        <Field label="Goal">
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </Field>
        <Field label="Deadline (optional)">
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} style={inputStyle} />
        </Field>
        <Field label={`Daily minutes — ${daily}`}>
          <input
            type="range"
            min={5}
            max={120}
            step={5}
            value={daily}
            onChange={(e) => setDaily(Number(e.target.value))}
            style={{ width: "100%", accentColor: team.primaryColor }}
          />
        </Field>
      </div>
      <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button onClick={onClose} style={{ padding: "9px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: TEXT_PRIMARY, cursor: "pointer" }}>
          Cancel
        </button>
        <button onClick={save} style={{ padding: "9px 16px", borderRadius: 10, background: team.primaryColor, color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}>
          Save
        </button>
      </div>
    </ModalShell>
  )
}

/* ── Invite tab ──────────────────────────────────────────────────────── */

function InviteTab({
  team,
  invites,
  adminName,
  onChange,
}: {
  team: Team
  invites: ReturnType<typeof readInvites>
  adminName: string
  onChange: () => void
}) {
  const { toast } = useToast()
  const [emailsRaw, setEmailsRaw] = useState("")
  const [expires, setExpires] = useState<7 | 30 | 90>(7)
  const [sending, setSending] = useState(false)
  const teamLink = useMemo(() => buildTeamJoinURL(team.inviteToken), [team.inviteToken])

  const onSend = async () => {
    const list = emailsRaw.split(/[\n,;]+/).map((e) => e.trim()).filter(Boolean)
    if (list.length === 0) {
      toast.warning("Paste at least one email.")
      return
    }
    setSending(true)
    try {
      const created = createInvites(team.id, list, "member", expires)
      const payload = created.map((c) => ({ email: c.email, joinUrl: buildTeamJoinURL(c.token) }))
      const result = await api.teamInvite({
        teamName: team.name,
        primaryColor: team.primaryColor,
        logoUrl: team.logoDataUrl,
        senderName: adminName,
        invites: payload,
      })
      if (result.sent > 0) toast.success(`${result.sent} invite${result.sent === 1 ? "" : "s"} sent.`)
      else toast.info("Invites saved — share the team link until email is configured.")
      setEmailsRaw("")
      onChange()
    } catch {
      toast.info("Saved invites locally.")
    } finally {
      setSending(false)
    }
  }

  const onCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(teamLink)
      toast.success("Team invite link copied 📋")
    } catch {
      toast.error("Couldn't copy.")
    }
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={card}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>Invite by email</h2>
        <p style={{ marginTop: 4, fontSize: 12.5, color: TEXT_MUTED }}>
          Paste a list. One per line, or comma-separated.
        </p>
        <textarea
          value={emailsRaw}
          onChange={(e) => setEmailsRaw(e.target.value)}
          rows={6}
          placeholder="alice@acme.com&#10;bob@acme.com&#10;…"
          style={{ ...inputStyle, marginTop: 12, fontFamily: "var(--font-mono)", resize: "vertical" }}
        />
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 8 }}>
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setExpires(d as 7 | 30 | 90)}
                style={{
                  padding: "7px 12px",
                  borderRadius: 999,
                  background: expires === d ? `${team.primaryColor}22` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${expires === d ? `${team.primaryColor}66` : "rgba(255,255,255,0.06)"}`,
                  color: expires === d ? team.primaryColor : TEXT_MUTED,
                  fontSize: 12.5,
                  cursor: "pointer",
                }}
              >
                Expires in {d} days
              </button>
            ))}
          </div>
          <button
            onClick={onSend}
            disabled={sending}
            style={{
              padding: "10px 18px",
              borderRadius: 12,
              background: team.primaryColor,
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              border: "none",
              cursor: sending ? "default" : "pointer",
              opacity: sending ? 0.7 : 1,
            }}
          >
            {sending ? "Sending…" : "Send invites →"}
          </button>
        </div>
      </div>

      <div style={card}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>Team invite link</h2>
        <p style={{ marginTop: 4, fontSize: 12.5, color: TEXT_MUTED }}>
          Anyone with this link can join your workspace.
        </p>
        <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <code
            style={{
              flex: "1 1 280px",
              padding: "10px 12px",
              borderRadius: 10,
              background: "rgba(0,0,0,0.25)",
              color: "var(--sch-text)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              wordBreak: "break-all",
            }}
          >
            {teamLink}
          </code>
          <button
            onClick={onCopyLink}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              background: team.primaryColor,
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              border: "none",
              cursor: "pointer",
            }}
          >
            Copy link
          </button>
        </div>
      </div>

      <div style={card}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>Recent invites</h2>
        {invites.length === 0 ? (
          <p style={{ marginTop: 10, fontSize: 13, color: TEXT_MUTED }}>
            None yet — invites you send will show up here with status.
          </p>
        ) : (
          <ul style={{ marginTop: 12, padding: 0, listStyle: "none", display: "grid", gap: 6 }}>
            {invites.slice(-10).reverse().map((inv) => (
              <li
                key={inv.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span style={{ fontSize: 13, color: TEXT_PRIMARY, fontFamily: "var(--font-mono)" }}>{inv.email}</span>
                <span style={{ fontSize: 11, color: inv.acceptedAt ? "#34D399" : TEXT_DIM }}>
                  {inv.acceptedAt ? "Accepted" : `Expires ${format(new Date(inv.expiresAt), "MMM d")}`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

/* ── Analytics ───────────────────────────────────────────────────────── */

function AnalyticsTab({ team, members }: { team: Team; members: TeamMember[] }) {
  const { toast } = useToast()

  // Completion rate over the last 30 days (synthesized).
  const series = useMemo(() => {
    const arr: { day: string; pct: number }[] = []
    const today = new Date()
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      // Deterministic pseudo-pct based on day-of-year + member count.
      const base = members.length > 0 ? Math.min(100, 55 + ((d.getDate() * 7 + d.getMonth() * 11) % 35)) : 0
      arr.push({ day: format(d, "MMM d"), pct: base })
    }
    return arr
  }, [members.length])

  const top = useMemo(() => [...members].sort((a, b) => b.weekSessions - a.weekSessions || b.streak - a.streak).slice(0, 5), [members])

  const goalSlices = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const m of members) {
      const g = (m.assignedGoal || "Unassigned").trim().slice(0, 24)
      counts[g] = (counts[g] || 0) + 1
    }
    const arr = Object.entries(counts).map(([label, count]) => ({ label, count }))
    arr.sort((a, b) => b.count - a.count)
    return arr.slice(0, 6)
  }, [members])

  const streakBuckets = useMemo(() => {
    const buckets = [0, 0, 0, 0, 0]
    for (const m of members) {
      if (m.streak === 0) buckets[0]++
      else if (m.streak < 4) buckets[1]++
      else if (m.streak < 8) buckets[2]++
      else if (m.streak < 15) buckets[3]++
      else buckets[4]++
    }
    return [
      { label: "0", count: buckets[0] },
      { label: "1–3", count: buckets[1] },
      { label: "4–7", count: buckets[2] },
      { label: "8–14", count: buckets[3] },
      { label: "15+", count: buckets[4] },
    ]
  }, [members])

  const onExport = () => {
    downloadCSV(`${team.name.replace(/\s+/g, "-").toLowerCase()}-members.csv`, membersToCSV(members))
    toast.success("CSV downloaded.")
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ ...card, padding: 24 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>Completion rate</h2>
            <p style={{ marginTop: 2, fontSize: 12, color: TEXT_MUTED }}>Last 30 days</p>
          </div>
          <button
            onClick={onExport}
            style={{
              padding: "8px 14px",
              borderRadius: 10,
              background: team.primaryColor,
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            Export CSV
          </button>
        </div>
        <LineChart data={series} color={team.primaryColor} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        <div style={card}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>Top performers this week</h2>
          <ul style={{ marginTop: 12, padding: 0, listStyle: "none", display: "grid", gap: 6 }}>
            {top.length === 0 && <li style={{ fontSize: 13, color: TEXT_MUTED }}>No data yet.</li>}
            {top.map((m, i) => (
              <li
                key={m.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <span style={{ fontSize: 12, width: 22, color: TEXT_DIM }}>#{i + 1}</span>
                <MiniAvatar name={m.name} color={team.primaryColor} />
                <span style={{ flex: 1, fontSize: 13, color: TEXT_PRIMARY }}>{m.name}</span>
                <span style={{ fontSize: 12, color: TEXT_MUTED, fontVariantNumeric: "tabular-nums" }}>
                  {m.weekSessions}/{m.weekTotal} · 🔥 {m.streak}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div style={card}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>Goal distribution</h2>
          <PieChart slices={goalSlices} color={team.primaryColor} />
        </div>

        <div style={card}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>Streak distribution</h2>
          <BarChart data={streakBuckets} color={team.primaryColor} />
        </div>
      </div>
    </div>
  )
}

/* ── Charts (lightweight SVG) ────────────────────────────────────────── */

function LineChart({ data, color }: { data: { day: string; pct: number }[]; color: string }) {
  const w = 720
  const h = 180
  const padL = 32
  const padB = 24
  const innerW = w - padL - 8
  const innerH = h - padB - 8
  const max = Math.max(1, ...data.map((d) => d.pct))
  const stepX = data.length > 1 ? innerW / (data.length - 1) : 0
  const pts = data
    .map((d, i) => `${padL + i * stepX},${8 + innerH - (d.pct / max) * innerH}`)
    .join(" ")
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" style={{ display: "block" }}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((g) => {
          const y = 8 + innerH - (g / 100) * innerH
          return (
            <g key={g}>
              <line x1={padL} x2={w - 8} y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="2 4" />
              <text x={4} y={y + 3} fontSize={9} fill="var(--sch-tx-2)">{g}%</text>
            </g>
          )
        })}
        <polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => (
          <circle key={i} cx={padL + i * stepX} cy={8 + innerH - (d.pct / max) * innerH} r={2.5} fill={color} />
        ))}
        {/* X labels (every 5th) */}
        {data.map((d, i) =>
          i % 5 === 0 || i === data.length - 1 ? (
            <text key={`x-${i}`} x={padL + i * stepX} y={h - 6} fontSize={9} fill="var(--sch-tx-2)" textAnchor="middle">
              {d.day}
            </text>
          ) : null,
        )}
      </svg>
    </div>
  )
}

function PieChart({ slices, color }: { slices: { label: string; count: number }[]; color: string }) {
  const total = slices.reduce((s, x) => s + x.count, 0) || 1
  let start = 0
  const colors = [color, "#C80000", "#22D3EE", "#FB923C", "#34D399", "#F472B6"]
  const radius = 70
  const cx = 80
  const cy = 80
  const arcs = slices.map((sl, i) => {
    const angle = (sl.count / total) * Math.PI * 2
    const x1 = cx + radius * Math.cos(start - Math.PI / 2)
    const y1 = cy + radius * Math.sin(start - Math.PI / 2)
    const x2 = cx + radius * Math.cos(start + angle - Math.PI / 2)
    const y2 = cy + radius * Math.sin(start + angle - Math.PI / 2)
    const large = angle > Math.PI ? 1 : 0
    const path = `M${cx},${cy} L${x1},${y1} A${radius},${radius} 0 ${large},1 ${x2},${y2} Z`
    start += angle
    return { path, color: colors[i % colors.length], label: sl.label, pct: Math.round((sl.count / total) * 100) }
  })
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10 }}>
      <svg width={160} height={160} viewBox="0 0 160 160">
        {arcs.map((a, i) => (
          <path key={i} d={a.path} fill={a.color} />
        ))}
        <circle cx={cx} cy={cy} r={32} fill="var(--sch-card, rgba(10,10,20,0.95))" />
      </svg>
      <ul style={{ flex: 1, padding: 0, listStyle: "none", display: "grid", gap: 4 }}>
        {arcs.map((a, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: a.color }} />
            <span style={{ flex: 1, color: TEXT_MUTED, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {a.label}
            </span>
            <span style={{ color: TEXT_DIM, fontVariantNumeric: "tabular-nums" }}>{a.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function BarChart({ data, color }: { data: { label: string; count: number }[]; color: string }) {
  const max = Math.max(1, ...data.map((d) => d.count))
  return (
    <div style={{ marginTop: 10, display: "flex", alignItems: "flex-end", gap: 10, height: 160 }}>
      {data.map((d) => (
        <div key={d.label} style={{ flex: 1, textAlign: "center" }}>
          <div style={{ height: 130, display: "flex", alignItems: "flex-end" }}>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(d.count / max) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: "100%",
                background: color,
                borderRadius: 6,
                minHeight: 4,
              }}
            />
          </div>
          <p style={{ marginTop: 6, fontSize: 11, color: TEXT_MUTED }}>{d.label}</p>
          <p style={{ fontSize: 10.5, color: TEXT_DIM }}>{d.count}</p>
        </div>
      ))}
    </div>
  )
}

/* ── Broadcast ───────────────────────────────────────────────────────── */

function BroadcastTab({
  team,
  memberCount,
  authorId,
  onSent,
}: {
  team: Team
  memberCount: number
  authorId: string
  onSent: () => void
}) {
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [sendEmail, setSendEmail] = useState(false)
  const [sendPush, setSendPush] = useState(true)
  const [preview, setPreview] = useState(false)

  const submit = () => {
    if (!title.trim() || !message.trim()) {
      toast.warning("Add a title and a message.")
      return
    }
    postAnnouncement(
      team.id,
      { id: authorId },
      { title: title.trim(), message: message.trim(), sendEmail, sendPush },
    )
    setTitle("")
    setMessage("")
    setPreview(false)
    onSent()
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 340px)", gap: 16, alignItems: "flex-start" }}>
      <div style={card}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>Send to all members</h2>
        <p style={{ marginTop: 4, fontSize: 12.5, color: TEXT_MUTED }}>
          {memberCount} member{memberCount === 1 ? "" : "s"} will receive this.
        </p>

        <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
          <Field label="Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 80))}
              placeholder="Friday demo at 4pm"
              style={inputStyle}
            />
          </Field>
          <Field label="Message">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              placeholder="What do you want the team to know?"
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
            />
          </Field>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <Toggle label="Send as email" on={sendEmail} onChange={setSendEmail} />
            <Toggle label="Send as push notification" on={sendPush} onChange={setSendPush} />
          </div>
        </div>

        <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
            onClick={() => setPreview((v) => !v)}
            style={{
              padding: "9px 14px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: TEXT_PRIMARY,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            {preview ? "Hide preview" : "Preview"}
          </button>
          <button
            onClick={submit}
            style={{
              padding: "9px 18px",
              borderRadius: 12,
              background: team.primaryColor,
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              border: "none",
              cursor: "pointer",
            }}
          >
            Send now
          </button>
        </div>
      </div>

      <div style={{ display: preview ? "block" : "none" }}>
        <div style={card}>
          <p style={{ fontSize: 11, color: TEXT_DIM, letterSpacing: "0.12em", textTransform: "uppercase" }}>Preview</p>
          <div
            style={{
              marginTop: 10,
              padding: "14px 16px",
              borderRadius: 14,
              background: `${team.primaryColor}1A`,
              border: `1px solid ${team.primaryColor}55`,
            }}
          >
            <p style={{ fontSize: 14, fontWeight: 700, color: TEXT_PRIMARY }}>📢 {title || "(title)"}</p>
            <p style={{ marginTop: 4, fontSize: 13, color: TEXT_MUTED, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
              {message || "(message)"}
            </p>
            <p style={{ marginTop: 8, fontSize: 11, color: TEXT_DIM }}>{team.name} · just now</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13, color: TEXT_PRIMARY }}>
      <span
        onClick={() => onChange(!on)}
        style={{
          width: 36,
          height: 20,
          borderRadius: 10,
          background: on ? "rgba(200,0,0,0.45)" : "rgba(255,255,255,0.08)",
          position: "relative",
          transition: "background 0.2s",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: on ? 18 : 2,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          }}
        />
      </span>
      {label}
    </label>
  )
}

/* ── Settings ────────────────────────────────────────────────────────── */

function SettingsTab({ team }: { team: Team }) {
  const { toast } = useToast()
  const teamLink = useMemo(() => buildTeamJoinURL(team.inviteToken), [team.inviteToken])
  return (
    <div style={card}>
      <h2 style={{ fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>Workspace settings</h2>
      <ul style={{ marginTop: 14, padding: 0, listStyle: "none", display: "grid", gap: 10, fontSize: 13 }}>
        <SettingRow label="Workspace name" value={team.name} />
        <SettingRow label="Plan" value={team.planType === "enterprise" ? "Enterprise" : "Teams"} />
        <SettingRow label="Max members" value={String(team.maxMembers)} />
        <SettingRow label="Goal mode" value={team.allowFreeGoals ? "Members set own goals" : "Shared team goal"} />
        <SettingRow label="Default goal" value={team.defaultGoal || "—"} />
        <SettingRow label="Created" value={format(new Date(team.createdAt), "MMM d, yyyy")} />
      </ul>
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(teamLink)
            toast.success("Team link copied 📋")
          } catch {
            toast.error("Couldn't copy.")
          }
        }}
        style={{
          marginTop: 16,
          padding: "9px 14px",
          borderRadius: 10,
          background: team.primaryColor,
          color: "#fff",
          fontWeight: 600,
          fontSize: 13,
          border: "none",
          cursor: "pointer",
        }}
      >
        Copy team invite link
      </button>
    </div>
  )
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <li style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
      <span style={{ color: TEXT_MUTED }}>{label}</span>
      <span style={{ color: TEXT_PRIMARY, fontWeight: 500, textAlign: "right", maxWidth: 360, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {value}
      </span>
    </li>
  )
}

/* ── Modal shell + field ─────────────────────────────────────────────── */

function ModalShell({ onClose, title, children }: { onClose: () => void; title: string; children: React.ReactNode }) {
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
          maxWidth: 460,
          padding: 28,
          borderRadius: 22,
          background: "var(--sch-card, rgba(10,10,20,0.92))",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }}>{title}</h2>
          <button onClick={onClose} aria-label="Close" style={{ background: "transparent", border: "none", color: TEXT_MUTED, fontSize: 20, cursor: "pointer" }}>
            ×
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{ marginBottom: 6, fontSize: 11.5, color: TEXT_DIM, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {label}
      </p>
      {children}
    </div>
  )
}
