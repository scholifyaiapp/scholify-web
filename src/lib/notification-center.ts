/*
 * Notification center.
 *
 * One read model that aggregates every "do I need to look at this" signal
 * the user can act on from the global header bell + the sidebar dots:
 *
 *   • Partner: unread partner notifications
 *   • Rooms: announcements + completion pings since last visit
 *   • Community: cheers on your posts since last visit
 *   • Quiz: this week's challenge is ready and not yet completed
 *
 * Storage is local — each source updates the cross-tab event bus when
 * something changes; subscribers re-derive. Read receipts are per-source
 * timestamps so "mark all read" works without rewriting source data.
 */

import { readNotifications as readPartnerNotifications } from "@/lib/partner-storage"
import { readMemberships as readRoomMemberships, readMessages as readRoomMessages, readRoom } from "@/lib/rooms-storage"
import { readPosts, readOptIn } from "@/lib/community-storage"
import {
  getISOWeek,
  isQuizCompleted,
} from "@/lib/quiz-storage"

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
    window.dispatchEvent(new CustomEvent("scholify-notifications-change"))
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

/* ── Derivation ──────────────────────────────────────────────────────── */

function newer(itemISO: string, sinceISO?: string): boolean {
  if (!sinceISO) return true
  return new Date(itemISO).getTime() > new Date(sinceISO).getTime()
}

export interface NotificationSummary {
  items: NotificationItem[]
  counts: Record<NotificationKind, number>
  total: number
}

export function deriveNotifications(currentUserId: string): NotificationSummary {
  const lastSeen = readLastSeen()
  const items: NotificationItem[] = []

  // Partner notifications addressed to me, newer than last-seen partner.
  for (const n of readPartnerNotifications()) {
    if (n.recipientId !== currentUserId) continue
    if (!newer(n.createdAt, lastSeen.partner)) continue
    items.push({
      id: `partner-${n.id}`,
      kind: "partner",
      title: n.senderName ? `${n.senderName} sent you encouragement` : "Partner message",
      body: n.message,
      href: "/partner",
      createdAt: n.createdAt,
    })
  }

  // Room announcements + completion messages for rooms I'm in.
  for (const roomId of readRoomMemberships()) {
    const room = readRoom(roomId)
    if (!room) continue
    const msgs = readRoomMessages(roomId)
    for (const m of msgs) {
      if (m.userId === currentUserId) continue
      if (m.messageType !== "announcement" && m.messageType !== "completion") continue
      if (!newer(m.createdAt, lastSeen.room)) continue
      items.push({
        id: `room-${m.id}`,
        kind: "room",
        title:
          m.messageType === "announcement"
            ? `📢 ${room.name}`
            : `🔥 ${room.name}`,
        body: m.content,
        href: `/rooms/${roomId}`,
        createdAt: m.createdAt,
      })
    }
  }

  // Community: cheers received on my own posts since last visit.
  // (Likes counter — we surface the delta with a coarse threshold so an
  // unopened "new likes" notification fires at most once between visits.)
  const opt = readOptIn()
  if (opt.optedIn) {
    const myPosts = readPosts().filter((p) => p.userId === currentUserId)
    const since = lastSeen.community ? new Date(lastSeen.community).getTime() : 0
    let totalNewLikes = 0
    let latestPost = ""
    let latestPostTime = 0
    for (const p of myPosts) {
      // Approximation: any post updated since last visit with likes > 0 contributes.
      const updatedAt = new Date(p.createdAt).getTime()
      if (updatedAt < since && p.likes === 0) continue
      totalNewLikes += p.likes
      if (updatedAt > latestPostTime) {
        latestPostTime = updatedAt
        latestPost = p.content
      }
    }
    if (totalNewLikes > 0) {
      items.push({
        id: `community-cheers-${latestPostTime}`,
        kind: "community",
        title: `${totalNewLikes} cheer${totalNewLikes === 1 ? "" : "s"} on your posts`,
        body: latestPost || "Your community is rooting for you.",
        href: "/community",
        createdAt: new Date(latestPostTime || Date.now()).toISOString(),
      })
    }
  }

  // Sunday weekly quiz ready (per-week, dismissed when completed).
  if (typeof window !== "undefined") {
    const week = getISOWeek()
    const isSunday = new Date().getDay() === 0
    if (isSunday && !isQuizCompleted(week) && !lastSeen.quiz?.startsWith(String(week))) {
      items.push({
        id: `quiz-week-${week}`,
        kind: "quiz",
        title: `🏆 Week ${week} Challenge is ready`,
        body: "5 questions · 30 seconds each",
        href: "/quiz",
        createdAt: new Date().toISOString(),
      })
    }
  }

  // Newest first.
  items.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))

  const counts: Record<NotificationKind, number> = {
    partner: 0,
    room: 0,
    community: 0,
    quiz: 0,
  }
  for (const i of items) counts[i.kind]++

  return { items, counts, total: items.length }
}

/* ── Subscribe ───────────────────────────────────────────────────────── */

export function subscribeNotifications(handler: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  const fn = () => handler()
  const events = [
    "scholify-partner-change",
    "scholify-rooms-change",
    "scholify-community-change",
    "scholify-notifications-change",
    "storage",
  ]
  for (const e of events) window.addEventListener(e, fn)
  return () => {
    for (const e of events) window.removeEventListener(e, fn)
  }
}
