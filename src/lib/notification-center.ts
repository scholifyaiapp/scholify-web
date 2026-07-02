/*
 * Notification center.
 *
 * The read model behind the global header bell. The original sources
 * (partner, rooms, community, weekly quiz) were retired with the ACCA pivot —
 * their routes no longer exist — so the aggregator now returns an empty
 * summary while keeping the same API for the bell UI. New ACCA-native
 * signals (exam-date reminders, leaderboard movements, streak nudges) can be
 * added here without touching consumers.
 */

export type NotificationKind = "partner" | "room" | "community" | "quiz"

export interface NotificationItem {
  id: string
  kind: NotificationKind
  title: string
  body: string
  href: string
  createdAt: string
}

/* ── Read receipts ───────────────────────────────────────────────────── */

const KEY_LAST_SEEN = "scholify-notifications-last-seen"

interface LastSeenMap {
  partner?: string
  room?: string
  community?: string
  quiz?: string
}

function readLastSeen(): LastSeenMap {
  if (typeof window === "undefined") return {}
  try {
    const raw = window.localStorage.getItem(KEY_LAST_SEEN)
    return raw ? (JSON.parse(raw) as LastSeenMap) : {}
  } catch {
    return {}
  }
}

function writeLastSeen(patch: Partial<LastSeenMap>): void {
  if (typeof window === "undefined") return
  const next = { ...readLastSeen(), ...patch }
  try {
    window.localStorage.setItem(KEY_LAST_SEEN, JSON.stringify(next))
  } catch {
    /* ignore */
  }
}

export function markKindRead(kind: NotificationKind): void {
  writeLastSeen({ [kind]: new Date().toISOString() })
}

export function markAllRead(): void {
  const now = new Date().toISOString()
  writeLastSeen({ partner: now, room: now, community: now, quiz: now })
}

/* ── Derive ──────────────────────────────────────────────────────────── */

export interface NotificationSummary {
  items: NotificationItem[]
  counts: Record<NotificationKind, number>
  total: number
}

const EMPTY: NotificationSummary = {
  items: [],
  counts: { partner: 0, room: 0, community: 0, quiz: 0 },
  total: 0,
}

export function deriveNotifications(_currentUserId: string): NotificationSummary {
  return EMPTY
}

/* ── Subscribe ───────────────────────────────────────────────────────── */

export function subscribeNotifications(_handler: () => void): () => void {
  return () => {}
}
