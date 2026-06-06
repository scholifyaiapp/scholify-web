import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { motion } from "motion/react"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/Toast"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  addMember,
  consumeInvite,
  consumePendingTeamInviteToken,
  findTeamByInviteToken,
  readMembers,
  readTeams,
  setActiveTeam,
  setPendingTeamInviteToken,
  type Team,
} from "@/lib/teams-storage"

/*
 * /join-team/:token — public landing for both team-link and per-email invites.
 *  • Guest → stash token + bounce to /sign-up?team-invite=…
 *  • Signed in → resolve team by token (either workspace token or invite
 *    token), show preview, then accept.
 */

const TEXT_PRIMARY = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"
const TEXT_DIM = "var(--sch-tx-3)"

const card: CSSProperties = {
  borderRadius: 24,
  padding: 32,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px solid var(--sch-border, rgba(255,255,255,0.08))",
  textAlign: "center",
}

export default function TeamJoin() {
  const { token = "" } = useParams<{ token: string }>()
  const { user, loading } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  // Stash token for guests pre-auth.
  useEffect(() => {
    if (loading) return
    if (!user && token) setPendingTeamInviteToken(token)
  }, [user, loading, token])

  // Resolve effective token (URL > pending after auth).
  const effectiveToken = useMemo(() => {
    if (!user) return token
    return token || consumePendingTeamInviteToken() || ""
  }, [user, token])

  // Look up either by workspace invite_token or by per-email invite token.
  const [team, setTeam] = useState<Team | null>(null)
  const [isEmailInvite, setIsEmailInvite] = useState(false)

  useEffect(() => {
    if (!effectiveToken) return
    // 1. Workspace-wide invite token
    const direct = findTeamByInviteToken(effectiveToken)
    if (direct) {
      setTeam(direct)
      setIsEmailInvite(false)
      return
    }
    // 2. Per-email invite token
    const inv = consumeInvite(effectiveToken)
    if (inv) {
      const t = readTeams().find((x) => x.id === inv.teamId) ?? null
      if (t) {
        setTeam(t)
        setIsEmailInvite(true)
        return
      }
    }
    setTeam(null)
  }, [effectiveToken])

  const handleJoin = useCallback(() => {
    if (!team || !user) return
    const meta = (user.user_metadata || {}) as { first_name?: string; last_name?: string }
    const name = [meta.first_name, meta.last_name].filter(Boolean).join(" ") || user.email?.split("@")[0] || "Member"
    const m = addMember(team.id, { userId: user.id, name, email: user.email || undefined })
    if (!m) {
      toast.error("This workspace is full.")
      return
    }
    setActiveTeam(team.id)
    toast.success(`Welcome to ${team.name} 👋`)
    navigate(`/teams/${team.id}`)
  }, [team, user, toast, navigate])

  if (loading) return null
  if (!user) return <Navigate to={`/sign-up?team-invite=${token}`} replace />

  if (!team) {
    return (
      <DashboardLayout>
        <div style={{ padding: "60px 16px", maxWidth: 460, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} style={card}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: TEXT_PRIMARY }}>Invite not found</h1>
            <p style={{ marginTop: 8, fontSize: 14, color: TEXT_MUTED }}>
              This invite has expired or doesn't exist. Ask your admin for a fresh link.
            </p>
            <button
              onClick={() => navigate("/teams")}
              style={{
                marginTop: 18,
                padding: "10px 18px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: TEXT_PRIMARY,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Back to Teams →
            </button>
          </motion.div>
        </div>
      </DashboardLayout>
    )
  }

  const members = readMembers(team.id)

  return (
    <DashboardLayout>
      <div style={{ padding: "60px 16px", maxWidth: 460, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} style={card}>
          {team.logoDataUrl ? (
            <img
              src={team.logoDataUrl}
              alt={team.name}
              style={{ width: 56, height: 56, borderRadius: 14, objectFit: "cover", margin: "0 auto" }}
            />
          ) : (
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: team.primaryColor,
                display: "grid",
                placeItems: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: 22,
                margin: "0 auto",
              }}
            >
              {(team.name?.trim()?.[0] || "?").toUpperCase()}
            </div>
          )}
          <p style={{ marginTop: 14, fontSize: 12, color: TEXT_DIM, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {isEmailInvite ? "You're invited" : "Join workspace"}
          </p>
          <h1 style={{ marginTop: 4, fontSize: 24, fontWeight: 800, color: TEXT_PRIMARY }}>{team.name}</h1>
          {team.description && (
            <p style={{ marginTop: 8, fontSize: 14, color: TEXT_MUTED, lineHeight: 1.55 }}>{team.description}</p>
          )}
          <p style={{ marginTop: 14, fontSize: 12.5, color: TEXT_MUTED }}>
            {members.length}/{team.maxMembers} members
          </p>
          <button
            onClick={handleJoin}
            style={{
              marginTop: 22,
              padding: "12px 22px",
              borderRadius: 999,
              background: team.primaryColor,
              color: "#fff",
              border: "none",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: `0 10px 28px ${team.primaryColor}66`,
            }}
          >
            Join this workspace →
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
