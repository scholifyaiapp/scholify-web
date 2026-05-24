/*
 * Accountability-partner data layer.
 *
 * Mirrors the [[scholify-data]] pattern: writes go to localStorage so the
 * app always works in demo mode, with a best-effort Supabase sync when
 * configured. The frontend never crashes if the partnerships /
 * partner_notifications tables don't exist yet — failures are swallowed.
 *
 * When the real Supabase migration lands (supabase/migrations/0001_partnerships.sql)
 * the same calls become authoritative; no UI changes required.
 */

import { supabase, isSupabaseConfigured } from "@/lib/supabase"

/* ── Types ───────────────────────────────────────────────────────────── */

export type PartnershipStatus = "pending" | "active" | "declined"

export interface Partnership {
  id: string
  requesterId: string
  requesterName: string
  requesterEmail?: string
  partnerId: string
  partnerName: string
  partnerEmail?: string
  status: PartnershipStatus
  inviteCode: string
  createdAt: string
}

export type PartnerNotificationType =
  | "task_complete"
  | "streak_milestone"
  | "invite"
  | "encouragement"

export interface PartnerNotification {
  id: string
  recipientId: string
  senderId: string
  senderName?: string
  type: PartnerNotificationType
  message: string
  read: boolean
  createdAt: string
}

export interface PartnerSnapshot {
  /** Auth user id of the partner. */
  userId: string
  name: string
  email?: string
  goal: string
  streak: number
  completedPct: number
  doneToday: boolean
  lastActiveAt: string
}

/* ── Storage keys ────────────────────────────────────────────────────── */

const KEY_PARTNERSHIP = "scholify-partnership"
const KEY_PENDING_OUT = "scholify-partnership-pending-out"
const KEY_PENDING_IN = "scholify-partnership-pending-in"
const KEY_NOTIFICATIONS = "scholify-partner-notifications"
const KEY_PARTNER_SNAPSHOT = "scholify-partner-snapshot"
const KEY_PENDING_INVITE_CODE = "scholify-pending-invite-code"

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new CustomEvent("scholify-partner-change", { detail: key }))
  } catch {
    /* quota or private-mode — fail quiet */
  }
}

function clearKey(key: string): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.removeItem(key)
    window.dispatchEvent(new CustomEvent("scholify-partner-change", { detail: key }))
  } catch {
    /* ignore */
  }
}

/* ── Invite codes ────────────────────────────────────────────────────── */

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

export function generateInviteCode(): string {
  let out = ""
  for (let i = 0; i < 8; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  }
  return out
}

export function buildInviteURL(code: string): string {
  if (typeof window === "undefined") return `/partner/join/${code}`
  return `${window.location.origin}/partner/join/${code}`
}

/* ── Active partnership ──────────────────────────────────────────────── */

export function readPartnership(): Partnership | null {
  return readJSON<Partnership | null>(KEY_PARTNERSHIP, null)
}

export function writePartnership(p: Partnership): void {
  writeJSON(KEY_PARTNERSHIP, p)
  clearKey(KEY_PENDING_OUT)
  clearKey(KEY_PENDING_IN)
  if (isSupabaseConfigured) {
    supabase
      .from("partnerships")
      .upsert(
        {
          id: p.id,
          requester_id: p.requesterId,
          partner_id: p.partnerId,
          status: p.status,
          created_at: p.createdAt,
        },
        { onConflict: "id" },
      )
      .then(
        () => {},
        () => {},
      )
  }
}

export function clearPartnership(): void {
  clearKey(KEY_PARTNERSHIP)
}

/* ── Pending outgoing invite ─────────────────────────────────────────── */

export interface PendingOutgoing {
  id: string
  inviteCode: string
  email?: string
  link: string
  sentAt: string
  requesterId: string
  requesterName: string
}

export function readPendingOutgoing(): PendingOutgoing | null {
  return readJSON<PendingOutgoing | null>(KEY_PENDING_OUT, null)
}

export function writePendingOutgoing(p: PendingOutgoing): void {
  writeJSON(KEY_PENDING_OUT, p)
}

export function clearPendingOutgoing(): void {
  clearKey(KEY_PENDING_OUT)
}

/* ── Pending incoming invite ─────────────────────────────────────────── */

export interface PendingIncoming {
  id: string
  inviteCode: string
  senderId: string
  senderName: string
  senderEmail?: string
  senderGoal: string
  senderStreak: number
  receivedAt: string
}

export function readPendingIncoming(): PendingIncoming | null {
  return readJSON<PendingIncoming | null>(KEY_PENDING_IN, null)
}

export function writePendingIncoming(p: PendingIncoming): void {
  writeJSON(KEY_PENDING_IN, p)
}

export function clearPendingIncoming(): void {
  clearKey(KEY_PENDING_IN)
}

/* ── Pending invite code (from /partner/join/[code] before sign-in) ──── */

export function setPendingInviteCode(code: string): void {
  writeJSON(KEY_PENDING_INVITE_CODE, code)
}

export function consumePendingInviteCode(): string | null {
  const code = readJSON<string | null>(KEY_PENDING_INVITE_CODE, null)
  if (code) clearKey(KEY_PENDING_INVITE_CODE)
  return code
}

/* ── Partner snapshot (their progress, cached) ───────────────────────── */

export function readPartnerSnapshot(): PartnerSnapshot | null {
  return readJSON<PartnerSnapshot | null>(KEY_PARTNER_SNAPSHOT, null)
}

export function writePartnerSnapshot(snap: PartnerSnapshot): void {
  writeJSON(KEY_PARTNER_SNAPSHOT, snap)
}

/* ── Notifications ───────────────────────────────────────────────────── */

export function readNotifications(): PartnerNotification[] {
  return readJSON<PartnerNotification[]>(KEY_NOTIFICATIONS, [])
}

export function writeNotifications(list: PartnerNotification[]): void {
  writeJSON(KEY_NOTIFICATIONS, list.slice(-50))
}

export function pushNotification(n: Omit<PartnerNotification, "id" | "createdAt" | "read">): PartnerNotification {
  const full: PartnerNotification = {
    ...n,
    id: `n_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    read: false,
  }
  const list = readNotifications()
  writeNotifications([...list, full])
  if (isSupabaseConfigured) {
    supabase
      .from("partner_notifications")
      .insert({
        recipient_id: full.recipientId,
        sender_id: full.senderId,
        type: full.type,
        message: full.message,
      })
      .then(
        () => {},
        () => {},
      )
  }
  return full
}

export function markAllNotificationsRead(): void {
  const list = readNotifications().map((n) => ({ ...n, read: true }))
  writeNotifications(list)
}

/* ── Subscription helper ─────────────────────────────────────────────── */

/**
 * Listens for local storage changes from any of the partner keys so other
 * tabs / components stay in sync without a full reload.
 */
export function subscribePartnerChanges(handler: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  const onChange = () => handler()
  window.addEventListener("scholify-partner-change", onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener("scholify-partner-change", onChange)
    window.removeEventListener("storage", onChange)
  }
}

/* ── Demo helper — accept an incoming invite synchronously ───────────── */

export function acceptIncomingInvite(currentUserId: string, currentUserName: string): Partnership | null {
  const incoming = readPendingIncoming()
  if (!incoming) return null
  const p: Partnership = {
    id: incoming.id,
    requesterId: incoming.senderId,
    requesterName: incoming.senderName,
    requesterEmail: incoming.senderEmail,
    partnerId: currentUserId,
    partnerName: currentUserName,
    status: "active",
    inviteCode: incoming.inviteCode,
    createdAt: incoming.receivedAt,
  }
  writePartnership(p)
  // Seed an initial partner snapshot so the dashboard card has something
  // to show before realtime catches up.
  writePartnerSnapshot({
    userId: incoming.senderId,
    name: incoming.senderName,
    email: incoming.senderEmail,
    goal: incoming.senderGoal,
    streak: incoming.senderStreak,
    completedPct: 0,
    doneToday: false,
    lastActiveAt: new Date().toISOString(),
  })
  return p
}

export function declineIncomingInvite(): void {
  clearPendingIncoming()
}
