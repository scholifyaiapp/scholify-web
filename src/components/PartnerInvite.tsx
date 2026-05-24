import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react"
import { motion } from "motion/react"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/Toast"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { readPlan, readProgress } from "@/lib/scholify-data"
import { api } from "@/lib/api"
import {
  acceptIncomingInvite,
  buildInviteURL,
  clearPendingOutgoing,
  declineIncomingInvite,
  generateInviteCode,
  readPartnership,
  readPendingIncoming,
  readPendingOutgoing,
  subscribePartnerChanges,
  writePendingOutgoing,
  writePartnership,
  type PendingIncoming,
  type PendingOutgoing,
} from "@/lib/partner-storage"

/* ──────────────────────────────────────────────────────────────────────
 *  Partner invite card.
 *  Decides between four states:
 *   • Active partnership exists → render nothing (the card is the truth)
 *   • Incoming invite pending → accept/decline
 *   • Outgoing invite pending → waiting state with cancel
 *   • Otherwise → email + link invite form
 * ────────────────────────────────────────────────────────────────────── */

const TEXT_PRIMARY = "#F0EEFF"
const TEXT_MUTED = "rgba(240,238,255,0.6)"
const TEXT_DIM = "rgba(240,238,255,0.45)"

const cardBase: CSSProperties = {
  borderRadius: 20,
  padding: 24,
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(139,92,246,0.1)",
  backdropFilter: "blur(18px) saturate(140%)",
  WebkitBackdropFilter: "blur(18px) saturate(140%)",
}

function ProBadge() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        background: "rgba(139,92,246,0.15)",
        color: "#C084FC",
        borderRadius: 6,
        textTransform: "uppercase",
      }}
    >
      Pro
    </span>
  )
}

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime()
  const m = Math.round(ms / 60000)
  if (m < 1) return "just now"
  if (m < 60) return `${m} minute${m === 1 ? "" : "s"} ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`
  const d = Math.round(h / 24)
  return `${d} day${d === 1 ? "" : "s"} ago`
}

/* ── Outer component ─────────────────────────────────────────────────── */

export default function PartnerInvite({ onPartnerActive }: { onPartnerActive?: () => void }) {
  const [tick, setTick] = useState(0)
  useEffect(() => subscribePartnerChanges(() => setTick((t) => t + 1)), [])

  const partnership = readPartnership()
  const pendingIn: PendingIncoming | null = readPendingIncoming()
  const pendingOut: PendingOutgoing | null = readPendingOutgoing()

  if (partnership && partnership.status === "active") return null

  if (pendingIn) {
    return <IncomingInviteCard incoming={pendingIn} onActivated={onPartnerActive} key={tick} />
  }
  if (pendingOut) {
    return <PendingOutgoingCard pending={pendingOut} key={tick} />
  }
  return <NewInviteCard key={tick} />
}

/* ── State 1: no invite — invite form ────────────────────────────────── */

function NewInviteCard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [sending, setSending] = useState(false)
  const inviteCode = useMemo(generateInviteCode, [])
  const inviteUrl = useMemo(() => buildInviteURL(inviteCode), [inviteCode])

  const senderName = useMemo(() => {
    const meta = (user?.user_metadata || {}) as { first_name?: string; last_name?: string }
    const first = (meta.first_name || "").trim()
    const last = (meta.last_name || "").trim()
    if (first || last) return `${first} ${last}`.trim()
    return user?.email?.split("@")[0] || "A friend"
  }, [user])

  const goal = useMemo(() => (readPlan().goal || "").trim(), [])

  const buildOutgoing = useCallback(
    (targetEmail?: string): PendingOutgoing => ({
      id: `p_${Date.now()}`,
      inviteCode,
      email: targetEmail,
      link: inviteUrl,
      sentAt: new Date().toISOString(),
      requesterId: user?.id || "demo-user",
      requesterName: senderName,
    }),
    [inviteCode, inviteUrl, user, senderName],
  )

  const onSendEmail = useCallback(async () => {
    const target = email.trim()
    if (!target) {
      toast.warning("Add an email first.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target)) {
      toast.error("That doesn't look like a valid email.")
      return
    }
    setSending(true)
    try {
      const result = await api.partnerInvite({
        email: target,
        inviteUrl,
        senderName,
        senderGoal: goal,
      })
      writePendingOutgoing(buildOutgoing(target))
      if (result.sent) {
        toast.success(`Invite sent to ${target}!`)
      } else {
        toast.info("Invite saved — share the link below until email is set up.")
      }
    } catch {
      writePendingOutgoing(buildOutgoing(target))
      toast.info("Invite saved — share the link with your study buddy.")
    } finally {
      setSending(false)
    }
  }, [email, inviteUrl, senderName, goal, buildOutgoing, toast])

  const onCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl)
      writePendingOutgoing(buildOutgoing())
      toast.success("Link copied! Share it with your study buddy.")
    } catch {
      toast.error("Couldn't copy — try selecting the link manually.")
    }
  }, [inviteUrl, buildOutgoing, toast])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={cardBase}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>
          👥 Accountability Partner
        </span>
        <ProBadge />
      </div>
      <p
        style={{
          marginTop: 8,
          fontSize: 14,
          color: TEXT_MUTED,
          lineHeight: 1.6,
        }}
      >
        Invite a friend to the same goal. You'll see each other's progress and get notified
        when they complete tasks.
      </p>

      {/* Option 1 — email */}
      <div style={{ marginTop: 20 }}>
        <label
          style={{
            display: "block",
            fontSize: 11,
            color: TEXT_DIM,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Invite by email
        </label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            type="email"
            placeholder="friend@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSendEmail()
            }}
            style={{
              flex: "1 1 220px",
              minWidth: 0,
              padding: "11px 14px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: TEXT_PRIMARY,
              fontSize: 14,
              outline: "none",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          />
          <motion.button
            whileHover={{ scale: sending ? 1 : 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onSendEmail}
            disabled={sending}
            style={{
              padding: "11px 18px",
              borderRadius: 12,
              background: IRIDESCENT,
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              border: "none",
              cursor: sending ? "default" : "pointer",
              boxShadow: "0 8px 24px rgba(167,139,250,0.35)",
              opacity: sending ? 0.7 : 1,
            }}
          >
            {sending ? "Sending…" : "Send invite →"}
          </motion.button>
        </div>
      </div>

      {/* Option 2 — copy link */}
      <div style={{ marginTop: 18 }}>
        <label
          style={{
            display: "block",
            fontSize: 11,
            color: TEXT_DIM,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Or share a link
        </label>
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCopyLink}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: "100%",
            padding: "11px 14px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: TEXT_PRIMARY,
            fontSize: 13,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <span style={{ fontSize: 16 }} aria-hidden>
            🔗
          </span>
          <span style={{ flex: 1, color: TEXT_MUTED, fontFamily: "var(--font-mono)" }}>
            {inviteUrl.replace(/^https?:\/\//, "")}
          </span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#C084FC" }}>
            Copy
          </span>
        </motion.button>
      </div>
    </motion.div>
  )
}

/* ── State 2: pending outgoing ───────────────────────────────────────── */

function PendingOutgoingCard({ pending }: { pending: PendingOutgoing }) {
  const { toast } = useToast()
  const onCancel = () => {
    clearPendingOutgoing()
    toast.info("Invite cancelled.")
  }
  const target = pending.email || "your study buddy"

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        ...cardBase,
        border: "1px solid rgba(251,146,60,0.3)",
        background: "rgba(251,146,60,0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <motion.span
          animate={{ rotate: [0, 14, -14, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: 18 }}
          aria-hidden
        >
          ⏳
        </motion.span>
        <span style={{ fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>
          Waiting for {target} to accept…
        </span>
      </div>
      <p style={{ marginTop: 8, fontSize: 13, color: TEXT_MUTED }}>
        Sent {timeAgo(pending.sentAt)}.
      </p>

      <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(pending.link)
              toast.success("Link copied again — try a different channel.")
            } catch {
              toast.error("Couldn't copy.")
            }
          }}
          style={{
            padding: "9px 14px",
            borderRadius: 10,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: TEXT_PRIMARY,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Copy link again
        </motion.button>
        <button
          onClick={onCancel}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,69,58,0.8)",
            fontSize: 13,
            cursor: "pointer",
            padding: 0,
          }}
        >
          Cancel invite
        </button>
      </div>
    </motion.div>
  )
}

/* ── State 3: pending incoming ───────────────────────────────────────── */

function IncomingInviteCard({
  incoming,
  onActivated,
}: {
  incoming: PendingIncoming
  onActivated?: () => void
}) {
  const { user } = useAuth()
  const { toast } = useToast()

  const currentUserName = useMemo(() => {
    const meta = (user?.user_metadata || {}) as { first_name?: string; last_name?: string }
    const first = (meta.first_name || "").trim()
    if (first) return first
    return user?.email?.split("@")[0] || "Partner"
  }, [user])

  const onAccept = useCallback(() => {
    const partnership = acceptIncomingInvite(user?.id || "demo-user", currentUserName)
    if (!partnership) {
      toast.error("Couldn't accept — invite expired.")
      return
    }
    toast.success(`You and ${incoming.senderName} are now partners 💪`)
    onActivated?.()
  }, [user, currentUserName, incoming.senderName, toast, onActivated])

  const onDecline = useCallback(() => {
    declineIncomingInvite()
    toast.info("Invite declined.")
  }, [toast])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{ position: "relative" }}
    >
      <motion.div
        aria-hidden
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: 21,
          padding: 1,
          background: IRIDESCENT,
          backgroundSize: "200% 200%",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        }}
      />

      <div style={{ ...cardBase, position: "relative" }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>
          {incoming.senderName} wants to study with you!
        </p>

        <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <span
            style={{
              padding: "5px 12px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: 12,
              color: TEXT_PRIMARY,
            }}
          >
            🎯 {incoming.senderGoal || "their goal"}
          </span>
          <span
            style={{
              padding: "5px 12px",
              borderRadius: 999,
              background: "rgba(251,146,60,0.1)",
              border: "1px solid rgba(251,146,60,0.2)",
              fontSize: 12,
              color: "#FB923C",
              fontWeight: 600,
            }}
          >
            🔥 {incoming.senderStreak} days
          </span>
        </div>

        <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onAccept}
            style={{
              padding: "10px 22px",
              borderRadius: 12,
              background: IRIDESCENT,
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(167,139,250,0.35)",
            }}
          >
            Accept →
          </motion.button>
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onDecline}
            style={{
              padding: "10px 18px",
              borderRadius: 12,
              background: "transparent",
              color: TEXT_MUTED,
              fontSize: 13,
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
            }}
          >
            Decline
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Helper export: parse and accept an invite code from a URL ───────── */

export function useAcceptInviteByCode(code: string | undefined) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!code || done) return
    if (!user) return
    // Synthesize an incoming invite from the code if there isn't one already
    // pending — in demo mode this is the only way to test the flow without
    // a server round-trip. In production the realtime channel would create
    // the pending row server-side and the dashboard would surface it.
    const senderMeta = readPendingIncoming()
    if (!senderMeta) {
      const synth: PendingIncoming = {
        id: `inv_${code}`,
        inviteCode: code,
        senderId: `peer_${code}`,
        senderName: "Your study partner",
        senderGoal: "the same goal",
        senderStreak: 5,
        receivedAt: new Date().toISOString(),
      }
      // Save the synthetic pending invite so IncomingInviteCard renders.
      // We don't auto-accept — the user still chooses.
      try {
        window.localStorage.setItem("scholify-partnership-pending-in", JSON.stringify(synth))
        window.dispatchEvent(new CustomEvent("scholify-partner-change", { detail: "pending-in" }))
      } catch {
        /* ignore */
      }
      toast.info("Invite ready — accept it to start studying together.")
    }
    setDone(true)
  }, [code, user, done, toast])
}

