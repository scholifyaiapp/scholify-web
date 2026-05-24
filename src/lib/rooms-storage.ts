/*
 * Study Rooms — data layer.
 *
 * Same pattern as partner-storage / scholify-data: localStorage is the
 * source of truth for the demo + offline experience, with a best-effort
 * Supabase mirror when configured. Realtime subscription helpers live
 * alongside the writers so RoomChat can opt in via `subscribeRoomMessages`.
 */

import { supabase, isSupabaseConfigured } from "@/lib/supabase"

/* ── Types ───────────────────────────────────────────────────────────── */

export type RoomCategory =
  | "general"
  | "ielts"
  | "coding"
  | "languages"
  | "design"
  | "certifications"

export interface StudyRoom {
  id: string
  name: string
  goal: string
  description?: string
  category: RoomCategory
  creatorId: string
  maxMembers: number
  isPrivate: boolean
  inviteCode: string
  examDate?: string | null
  createdAt: string
}

export interface RoomMember {
  id: string
  roomId: string
  userId: string
  name: string
  role: "creator" | "member"
  streak: number
  doneToday: boolean
  lastActiveAt: string
  joinedAt: string
}

export type RoomMessageType = "message" | "announcement" | "completion"

export interface RoomMessage {
  id: string
  roomId: string
  userId: string
  authorName: string
  content: string
  messageType: RoomMessageType
  createdAt: string
}

/* ── Storage keys ────────────────────────────────────────────────────── */

const KEY_ROOMS = "scholify-rooms"
const KEY_MEMBERSHIPS = "scholify-room-memberships"
const KEY_MEMBERS_PREFIX = "scholify-room-members-"
const KEY_MESSAGES_PREFIX = "scholify-room-messages-"
const KEY_PENDING_JOIN_CODE = "scholify-rooms-pending-code"
const KEY_DISCOVER_SEEDED = "scholify-rooms-seeded-v1"

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
    window.dispatchEvent(new CustomEvent("scholify-rooms-change", { detail: key }))
  } catch {
    /* ignore */
  }
}

/* ── Invite code ─────────────────────────────────────────────────────── */

const CODE_ALPHA = "abcdefghjkmnpqrstuvwxyz23456789"

export function generateRoomCode(): string {
  let out = ""
  for (let i = 0; i < 8; i++) out += CODE_ALPHA[Math.floor(Math.random() * CODE_ALPHA.length)]
  return out
}

export function buildJoinURL(code: string): string {
  if (typeof window === "undefined") return `/join/${code}`
  return `${window.location.origin}/join/${code}`
}

/* ── Rooms CRUD ──────────────────────────────────────────────────────── */

export function readRooms(): StudyRoom[] {
  return readJSON<StudyRoom[]>(KEY_ROOMS, [])
}

function writeRooms(list: StudyRoom[]): void {
  writeJSON(KEY_ROOMS, list)
}

export function readRoom(id: string): StudyRoom | null {
  return readRooms().find((r) => r.id === id) ?? null
}

export function findRoomByCode(code: string): StudyRoom | null {
  const c = code.toLowerCase()
  return readRooms().find((r) => r.inviteCode.toLowerCase() === c) ?? null
}

export interface CreateRoomInput {
  name: string
  goal: string
  description?: string
  category?: RoomCategory
  maxMembers?: number
  isPrivate?: boolean
  examDate?: string | null
}

export function createRoom(input: CreateRoomInput, creator: { id: string; name: string }): StudyRoom {
  const room: StudyRoom = {
    id: `r_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: input.name.trim(),
    goal: input.goal.trim(),
    description: input.description?.trim(),
    category: input.category || "general",
    creatorId: creator.id,
    maxMembers: Math.max(2, Math.min(10, input.maxMembers ?? 10)),
    isPrivate: !!input.isPrivate,
    inviteCode: generateRoomCode(),
    examDate: input.examDate || null,
    createdAt: new Date().toISOString(),
  }
  writeRooms([room, ...readRooms()])

  // Add creator as the first member (locally) and register the membership.
  addMemberLocal(room.id, {
    userId: creator.id,
    name: creator.name,
    role: "creator",
  })
  trackMembership(room.id)

  if (isSupabaseConfigured) {
    supabase
      .from("study_rooms")
      .insert({
        id: room.id,
        name: room.name,
        goal: room.goal,
        description: room.description,
        category: room.category,
        creator_id: creator.id,
        max_members: room.maxMembers,
        is_private: room.isPrivate,
        invite_code: room.inviteCode,
        exam_date: room.examDate,
      })
      .then(
        () => {
          supabase
            .from("room_members")
            .insert({ room_id: room.id, user_id: creator.id, role: "creator" })
            .then(
              () => {},
              () => {},
            )
        },
        () => {},
      )
  }

  return room
}

export function deleteRoom(id: string): void {
  writeRooms(readRooms().filter((r) => r.id !== id))
  writeJSON(`${KEY_MEMBERS_PREFIX}${id}`, [])
  writeJSON(`${KEY_MESSAGES_PREFIX}${id}`, [])
  untrackMembership(id)
  if (isSupabaseConfigured) {
    supabase
      .from("study_rooms")
      .delete()
      .eq("id", id)
      .then(
        () => {},
        () => {},
      )
  }
}

/* ── Memberships (the rooms _this_ user has joined) ──────────────────── */

export function readMemberships(): string[] {
  return readJSON<string[]>(KEY_MEMBERSHIPS, [])
}

function trackMembership(roomId: string): void {
  const set = new Set(readMemberships())
  set.add(roomId)
  writeJSON(KEY_MEMBERSHIPS, Array.from(set))
}

function untrackMembership(roomId: string): void {
  const next = readMemberships().filter((id) => id !== roomId)
  writeJSON(KEY_MEMBERSHIPS, next)
}

export function isMemberLocal(roomId: string): boolean {
  return readMemberships().includes(roomId)
}

/* ── Members ─────────────────────────────────────────────────────────── */

export function readMembers(roomId: string): RoomMember[] {
  return readJSON<RoomMember[]>(`${KEY_MEMBERS_PREFIX}${roomId}`, [])
}

function writeMembers(roomId: string, list: RoomMember[]): void {
  writeJSON(`${KEY_MEMBERS_PREFIX}${roomId}`, list)
}

function addMemberLocal(
  roomId: string,
  m: { userId: string; name: string; role?: "creator" | "member" },
): RoomMember {
  const existing = readMembers(roomId)
  const dup = existing.find((x) => x.userId === m.userId)
  if (dup) return dup
  const fresh: RoomMember = {
    id: `m_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    roomId,
    userId: m.userId,
    name: m.name,
    role: m.role || "member",
    streak: 0,
    doneToday: false,
    lastActiveAt: new Date().toISOString(),
    joinedAt: new Date().toISOString(),
  }
  writeMembers(roomId, [...existing, fresh])
  return fresh
}

export function joinRoom(roomId: string, user: { id: string; name: string }): RoomMember | null {
  const room = readRoom(roomId)
  if (!room) return null
  const members = readMembers(roomId)
  if (members.length >= room.maxMembers && !members.find((m) => m.userId === user.id)) return null
  const m = addMemberLocal(roomId, { userId: user.id, name: user.name })
  trackMembership(roomId)
  if (isSupabaseConfigured) {
    supabase
      .from("room_members")
      .upsert(
        { room_id: roomId, user_id: user.id, role: "member" },
        { onConflict: "room_id,user_id" },
      )
      .then(
        () => {},
        () => {},
      )
  }
  return m
}

export function leaveRoom(roomId: string, userId: string): void {
  writeMembers(
    roomId,
    readMembers(roomId).filter((m) => m.userId !== userId),
  )
  untrackMembership(roomId)
  if (isSupabaseConfigured) {
    supabase
      .from("room_members")
      .delete()
      .eq("room_id", roomId)
      .eq("user_id", userId)
      .then(
        () => {},
        () => {},
      )
  }
}

export function updateMemberStreak(
  roomId: string,
  userId: string,
  patch: Partial<Pick<RoomMember, "streak" | "doneToday" | "lastActiveAt">>,
): void {
  const list = readMembers(roomId).map((m) =>
    m.userId === userId ? { ...m, ...patch, lastActiveAt: new Date().toISOString() } : m,
  )
  writeMembers(roomId, list)
}

/* ── Messages ────────────────────────────────────────────────────────── */

export function readMessages(roomId: string): RoomMessage[] {
  return readJSON<RoomMessage[]>(`${KEY_MESSAGES_PREFIX}${roomId}`, [])
}

function writeMessages(roomId: string, list: RoomMessage[]): void {
  writeJSON(`${KEY_MESSAGES_PREFIX}${roomId}`, list.slice(-200))
}

export function sendMessage(
  roomId: string,
  author: { id: string; name: string },
  content: string,
  messageType: RoomMessageType = "message",
): RoomMessage {
  const msg: RoomMessage = {
    id: `mm_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    roomId,
    userId: author.id,
    authorName: author.name,
    content: content.trim(),
    messageType,
    createdAt: new Date().toISOString(),
  }
  writeMessages(roomId, [...readMessages(roomId), msg])
  if (isSupabaseConfigured) {
    supabase
      .from("room_messages")
      .insert({
        room_id: roomId,
        user_id: author.id,
        content: msg.content,
        message_type: msg.messageType,
      })
      .then(
        () => {},
        () => {},
      )
  }
  return msg
}

export interface RoomChannelHandle {
  unsubscribe: () => void
}

/**
 * Subscribe to new messages in a room.
 *  - When Supabase is configured, listens on the realtime channel.
 *  - Always also listens to cross-tab local storage events so two
 *    browsers on the same machine (e.g. demo mode) still feel live.
 */
export function subscribeRoomMessages(
  roomId: string,
  handler: (msg: RoomMessage) => void,
): RoomChannelHandle {
  const subs: Array<() => void> = []

  if (isSupabaseConfigured) {
    const channel = supabase
      .channel(`room-${roomId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "room_messages", filter: `room_id=eq.${roomId}` },
        (payload) => {
          const raw = payload.new as Record<string, unknown>
          handler({
            id: String(raw.id),
            roomId,
            userId: String(raw.user_id),
            authorName: String(raw.author_name || raw.user_id || ""),
            content: String(raw.content),
            messageType: (raw.message_type as RoomMessageType) || "message",
            createdAt: String(raw.created_at),
          })
        },
      )
      .subscribe()
    subs.push(() => {
      supabase.removeChannel(channel)
    })
  }

  if (typeof window !== "undefined") {
    const onLocal = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (typeof detail === "string" && detail === `${KEY_MESSAGES_PREFIX}${roomId}`) {
        const list = readMessages(roomId)
        const last = list[list.length - 1]
        if (last) handler(last)
      }
    }
    window.addEventListener("scholify-rooms-change", onLocal)
    subs.push(() => window.removeEventListener("scholify-rooms-change", onLocal))
  }

  return {
    unsubscribe: () => subs.forEach((fn) => fn()),
  }
}

/* ── Group streak ────────────────────────────────────────────────────── */

/**
 * Group streak = consecutive days where ≥60% of members completed.
 * Computed off the day-by-day records we keep per room. In demo mode we
 * approximate using the members' current `streak` value — the minimum
 * streak across the top 60% sets the floor.
 */
export function computeGroupStreak(roomId: string): number {
  const members = readMembers(roomId)
  if (members.length === 0) return 0
  const sorted = [...members].sort((a, b) => b.streak - a.streak)
  const threshold = Math.ceil(sorted.length * 0.6)
  const cutoff = sorted[threshold - 1] ?? sorted[sorted.length - 1]
  return cutoff?.streak ?? 0
}

/**
 * Returns the % of members who completed today.
 * Combined with a 6pm cutoff, the Room page can warn about an at-risk
 * group streak.
 */
export function computeTodayCompletion(roomId: string): { done: number; total: number; pct: number } {
  const members = readMembers(roomId)
  const total = members.length || 1
  const done = members.filter((m) => m.doneToday).length
  return { done, total, pct: Math.round((done / total) * 100) }
}

/* ── Weekly leaderboard ──────────────────────────────────────────────── */

export interface LeaderboardRow {
  userId: string
  name: string
  sessions: number
  total: number
  streak: number
  isYou: boolean
}

export function computeWeeklyLeaderboard(roomId: string, currentUserId: string): LeaderboardRow[] {
  const members = readMembers(roomId)
  return members
    .map((m) => {
      const sessions = Math.min(7, Math.max(0, m.streak))
      return {
        userId: m.userId,
        name: m.name,
        sessions,
        total: 7,
        streak: m.streak,
        isYou: m.userId === currentUserId,
      }
    })
    .sort((a, b) => b.sessions - a.sessions || b.streak - a.streak)
}

/* ── Auto-completion broadcast ───────────────────────────────────────── */

/**
 * Called from the Dashboard when the user marks today complete. Posts a
 * "completion" system message into every room they belong to and bumps
 * their member row's streak/doneToday across the group.
 */
export function notifyRoomsOnCompletion(opts: {
  userId: string
  userName: string
  dayNumber: number
  streak: number
}): void {
  const myRooms = readMemberships()
  for (const roomId of myRooms) {
    updateMemberStreak(roomId, opts.userId, {
      streak: opts.streak,
      doneToday: true,
    })
    sendMessage(
      roomId,
      { id: opts.userId, name: opts.userName },
      `🔥 ${opts.userName} completed Day ${opts.dayNumber} — ${opts.streak} day streak!`,
      "completion",
    )
  }
}

/* ── Pending join code (pre-auth) ────────────────────────────────────── */

export function setPendingJoinCode(code: string): void {
  writeJSON(KEY_PENDING_JOIN_CODE, code)
}

export function consumePendingJoinCode(): string | null {
  const code = readJSON<string | null>(KEY_PENDING_JOIN_CODE, null)
  if (code && typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(KEY_PENDING_JOIN_CODE)
    } catch {
      /* ignore */
    }
  }
  return code
}

/* ── Subscribe to local changes (UI refresh) ─────────────────────────── */

export function subscribeRoomsLocal(handler: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  const onChange = () => handler()
  window.addEventListener("scholify-rooms-change", onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener("scholify-rooms-change", onChange)
    window.removeEventListener("storage", onChange)
  }
}

/* ── Discover seeds (only first visit, only if no rooms exist) ───────── */

const DISCOVER_SEEDS: Array<Omit<StudyRoom, "id" | "createdAt" | "inviteCode" | "creatorId"> & {
  members: { name: string; streak: number; doneToday: boolean }[]
}> = [
  {
    name: "IELTS Band 7+ Crew",
    goal: "Hit IELTS Band 7 across all four modules",
    description: "Daily speaking + writing drills, peer feedback.",
    category: "ielts",
    maxMembers: 10,
    isPrivate: false,
    examDate: addDays(new Date(), 24).toISOString().slice(0, 10),
    members: [
      { name: "Aliya", streak: 11, doneToday: true },
      { name: "Tomas", streak: 9, doneToday: false },
      { name: "Sana", streak: 14, doneToday: true },
    ],
  },
  {
    name: "Daily LeetCode 30 min",
    goal: "One LeetCode problem per day, every day",
    description: "Easy → medium ladder. We post solutions in the room.",
    category: "coding",
    maxMembers: 10,
    isPrivate: false,
    examDate: null,
    members: [
      { name: "Marco", streak: 22, doneToday: true },
      { name: "Yui", streak: 8, doneToday: true },
    ],
  },
  {
    name: "Spanish A2 → B1",
    goal: "Reach Spanish B1 in 90 days",
    description: "Daily Anki + one conversation a week.",
    category: "languages",
    maxMembers: 8,
    isPrivate: false,
    examDate: null,
    members: [
      { name: "Hadi", streak: 6, doneToday: false },
      { name: "Cleo", streak: 13, doneToday: true },
      { name: "Niko", streak: 5, doneToday: false },
    ],
  },
  {
    name: "Figma to Fluency",
    goal: "Daily UI exercises — match a public design 1:1",
    description: "60 minutes a day, screenshots welcome.",
    category: "design",
    maxMembers: 8,
    isPrivate: false,
    examDate: null,
    members: [
      { name: "Iva", streak: 4, doneToday: true },
    ],
  },
  {
    name: "AWS SAA in 8 weeks",
    goal: "Pass AWS Solutions Architect Associate",
    description: "One chapter + 10 questions a day.",
    category: "certifications",
    maxMembers: 10,
    isPrivate: false,
    examDate: addDays(new Date(), 47).toISOString().slice(0, 10),
    members: [
      { name: "Dan", streak: 18, doneToday: true },
      { name: "Pia", streak: 17, doneToday: true },
      { name: "Toma", streak: 9, doneToday: true },
      { name: "Reza", streak: 7, doneToday: false },
    ],
  },
]

function addDays(d: Date, days: number): Date {
  const n = new Date(d)
  n.setDate(n.getDate() + days)
  return n
}

export function ensureDiscoverSeeded(): void {
  if (typeof window === "undefined") return
  if (window.localStorage.getItem(KEY_DISCOVER_SEEDED) === "1") return
  if (readRooms().length > 0) {
    window.localStorage.setItem(KEY_DISCOVER_SEEDED, "1")
    return
  }
  const created: StudyRoom[] = DISCOVER_SEEDS.map((seed, i) => {
    const id = `seed_${i}_${Math.random().toString(36).slice(2, 7)}`
    const room: StudyRoom = {
      id,
      name: seed.name,
      goal: seed.goal,
      description: seed.description,
      category: seed.category,
      creatorId: `peer_${i}`,
      maxMembers: seed.maxMembers,
      isPrivate: seed.isPrivate,
      inviteCode: generateRoomCode(),
      examDate: seed.examDate ?? null,
      createdAt: new Date().toISOString(),
    }
    // Seed members
    writeMembers(
      id,
      seed.members.map((m, j) => ({
        id: `m_seed_${i}_${j}`,
        roomId: id,
        userId: `peer_${i}_${j}`,
        name: m.name,
        role: j === 0 ? "creator" : "member",
        streak: m.streak,
        doneToday: m.doneToday,
        lastActiveAt: new Date().toISOString(),
        joinedAt: new Date().toISOString(),
      })),
    )
    return room
  })
  writeRooms(created)
  window.localStorage.setItem(KEY_DISCOVER_SEEDED, "1")
}
