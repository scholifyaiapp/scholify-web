/*
 * Scholify Teams — data layer.
 *
 * Same local-first + Supabase mirror pattern as the other storage modules.
 * Tracks the active workspace per user so the rest of the app can apply
 * team-specific branding without prop-drilling.
 */

import { supabase, isSupabaseConfigured } from "@/lib/supabase"

/* ── Types ───────────────────────────────────────────────────────────── */

export type TeamRole = "admin" | "manager" | "member"
export type TeamPlan = "teams" | "enterprise"

export interface Team {
  id: string
  name: string
  description?: string
  logoDataUrl?: string
  primaryColor: string
  adminId: string
  planType: TeamPlan
  maxMembers: number
  defaultGoal?: string
  allowFreeGoals: boolean
  inviteToken: string
  createdAt: string
}

export interface TeamMember {
  id: string
  teamId: string
  userId: string
  name: string
  email?: string
  role: TeamRole
  assignedGoal?: string
  assignedDeadline?: string | null
  assignedDailyMinutes: number
  joinedAt: string
  // Cached engagement stats (derived from progress in real Supabase setup):
  currentDay: number
  totalDays: number
  streak: number
  weekSessions: number
  weekTotal: number
  lastActiveAt: string
  status: "active" | "inactive" | "not_started"
}

export interface TeamInvite {
  id: string
  teamId: string
  email: string
  role: TeamRole
  token: string
  expiresAt: string
  acceptedAt?: string
  createdAt: string
}

export interface TeamAnnouncement {
  id: string
  teamId: string
  authorId: string
  title: string
  message: string
  sendEmail: boolean
  sendPush: boolean
  createdAt: string
}

/* ── Storage keys ────────────────────────────────────────────────────── */

const KEY_TEAMS = "scholify-teams"
const KEY_MEMBERS_PREFIX = "scholify-team-members-"
const KEY_INVITES_PREFIX = "scholify-team-invites-"
const KEY_ANNOUNCEMENTS_PREFIX = "scholify-team-announcements-"
const KEY_MY_TEAMS = "scholify-my-teams"
const KEY_ACTIVE_TEAM = "scholify-active-team"
const KEY_PENDING_INVITE = "scholify-team-pending-invite"
const KEY_LEADERBOARD_OPT_IN = "scholify-team-leaderboard-optin"
const KEY_DISMISSED_ANNS = "scholify-team-dismissed-anns"

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
    window.dispatchEvent(new CustomEvent("scholify-teams-change", { detail: key }))
  } catch {
    /* ignore */
  }
}

function removeKey(key: string): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.removeItem(key)
    window.dispatchEvent(new CustomEvent("scholify-teams-change", { detail: key }))
  } catch {
    /* ignore */
  }
}

/* ── Token helpers ───────────────────────────────────────────────────── */

const ALPHA = "abcdefghjkmnpqrstuvwxyz23456789"

export function generateTeamToken(): string {
  let s = ""
  for (let i = 0; i < 32; i++) s += ALPHA[Math.floor(Math.random() * ALPHA.length)]
  return s
}

export function buildTeamJoinURL(token: string): string {
  if (typeof window === "undefined") return `/join-team/${token}`
  return `${window.location.origin}/join-team/${token}`
}

/* ── Teams CRUD ──────────────────────────────────────────────────────── */

export function readTeams(): Team[] {
  return readJSON<Team[]>(KEY_TEAMS, [])
}

function writeTeams(list: Team[]): void {
  writeJSON(KEY_TEAMS, list)
}

export function readTeam(id: string): Team | null {
  return readTeams().find((t) => t.id === id) ?? null
}

export function findTeamByInviteToken(token: string): Team | null {
  const t = token.trim().toLowerCase()
  return readTeams().find((x) => x.inviteToken.toLowerCase() === t) ?? null
}

export interface CreateTeamInput {
  name: string
  description?: string
  logoDataUrl?: string
  primaryColor?: string
  planType?: TeamPlan
  maxMembers?: number
  defaultGoal?: string
  allowFreeGoals?: boolean
}

export function createTeam(input: CreateTeamInput, admin: { id: string; name: string; email?: string }): Team {
  const team: Team = {
    id: `team_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: input.name.trim(),
    description: input.description?.trim(),
    logoDataUrl: input.logoDataUrl,
    primaryColor: input.primaryColor || "#5E5CE6",
    adminId: admin.id,
    planType: input.planType || "teams",
    maxMembers: Math.max(1, input.maxMembers || 50),
    defaultGoal: input.defaultGoal?.trim() || undefined,
    allowFreeGoals: input.allowFreeGoals ?? true,
    inviteToken: generateTeamToken(),
    createdAt: new Date().toISOString(),
  }
  writeTeams([team, ...readTeams()])

  // Register the admin as the first member.
  const adminMember: TeamMember = {
    id: `m_${Date.now()}_admin`,
    teamId: team.id,
    userId: admin.id,
    name: admin.name,
    email: admin.email,
    role: "admin",
    assignedGoal: team.defaultGoal,
    assignedDeadline: null,
    assignedDailyMinutes: 20,
    joinedAt: new Date().toISOString(),
    currentDay: 1,
    totalDays: 30,
    streak: 0,
    weekSessions: 0,
    weekTotal: 5,
    lastActiveAt: new Date().toISOString(),
    status: "not_started",
  }
  writeMembers(team.id, [adminMember])
  trackMembership(team.id)
  setActiveTeam(team.id)

  // Seed a handful of demo teammates so the admin dashboard isn't empty
  // before real invites are accepted. These get cleared on first real
  // invite acceptance.
  seedDemoTeammates(team)

  if (isSupabaseConfigured) {
    supabase
      .from("teams")
      .insert({
        id: team.id,
        name: team.name,
        description: team.description,
        logo_url: team.logoDataUrl,
        primary_color: team.primaryColor,
        admin_id: admin.id,
        plan_type: team.planType,
        max_members: team.maxMembers,
        default_goal: team.defaultGoal,
        allow_free_goals: team.allowFreeGoals,
        invite_token: team.inviteToken,
      })
      .then(
        () => {
          supabase
            .from("team_members")
            .insert({
              team_id: team.id,
              user_id: admin.id,
              role: "admin",
              assigned_goal: team.defaultGoal,
            })
            .then(
              () => {},
              () => {},
            )
        },
        () => {},
      )
  }

  return team
}

export function updateTeam(id: string, patch: Partial<Team>): Team | null {
  const list = readTeams()
  const idx = list.findIndex((t) => t.id === id)
  if (idx === -1) return null
  const next = { ...list[idx], ...patch }
  list[idx] = next
  writeTeams(list)
  if (isSupabaseConfigured) {
    supabase
      .from("teams")
      .update({
        name: next.name,
        description: next.description,
        logo_url: next.logoDataUrl,
        primary_color: next.primaryColor,
        default_goal: next.defaultGoal,
        allow_free_goals: next.allowFreeGoals,
        max_members: next.maxMembers,
      })
      .eq("id", id)
      .then(
        () => {},
        () => {},
      )
  }
  return next
}

/* ── Memberships (this user's teams) ─────────────────────────────────── */

export function readMyTeamIds(): string[] {
  return readJSON<string[]>(KEY_MY_TEAMS, [])
}

function trackMembership(id: string): void {
  const set = new Set(readMyTeamIds())
  set.add(id)
  writeJSON(KEY_MY_TEAMS, Array.from(set))
}

function untrackMembership(id: string): void {
  writeJSON(
    KEY_MY_TEAMS,
    readMyTeamIds().filter((x) => x !== id),
  )
  if (getActiveTeam() === id) removeKey(KEY_ACTIVE_TEAM)
}

export function getActiveTeam(): string | null {
  return readJSON<string | null>(KEY_ACTIVE_TEAM, null)
}

export function setActiveTeam(id: string): void {
  writeJSON(KEY_ACTIVE_TEAM, id)
}

export function clearActiveTeam(): void {
  removeKey(KEY_ACTIVE_TEAM)
}

/* ── Members ─────────────────────────────────────────────────────────── */

export function readMembers(teamId: string): TeamMember[] {
  return readJSON<TeamMember[]>(`${KEY_MEMBERS_PREFIX}${teamId}`, [])
}

function writeMembers(teamId: string, list: TeamMember[]): void {
  writeJSON(`${KEY_MEMBERS_PREFIX}${teamId}`, list)
}

export function findMember(teamId: string, userId: string): TeamMember | null {
  return readMembers(teamId).find((m) => m.userId === userId) ?? null
}

export function isAdminOf(teamId: string, userId: string): boolean {
  const team = readTeam(teamId)
  if (!team) return false
  if (team.adminId === userId) return true
  const m = findMember(teamId, userId)
  return m?.role === "admin"
}

export function addMember(
  teamId: string,
  m: { userId: string; name: string; email?: string; role?: TeamRole },
): TeamMember | null {
  const team = readTeam(teamId)
  if (!team) return null
  const existing = readMembers(teamId)
  if (existing.find((x) => x.userId === m.userId)) return existing.find((x) => x.userId === m.userId) ?? null
  if (existing.length >= team.maxMembers) return null
  const member: TeamMember = {
    id: `m_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    teamId,
    userId: m.userId,
    name: m.name,
    email: m.email,
    role: m.role || "member",
    assignedGoal: team.defaultGoal,
    assignedDeadline: null,
    assignedDailyMinutes: 20,
    joinedAt: new Date().toISOString(),
    currentDay: 1,
    totalDays: 30,
    streak: 0,
    weekSessions: 0,
    weekTotal: 5,
    lastActiveAt: new Date().toISOString(),
    status: "not_started",
  }
  writeMembers(teamId, [...existing, member])
  trackMembership(teamId)
  if (isSupabaseConfigured) {
    supabase
      .from("team_members")
      .upsert(
        {
          team_id: teamId,
          user_id: m.userId,
          role: member.role,
          assigned_goal: member.assignedGoal,
          assigned_deadline: member.assignedDeadline,
          assigned_daily_minutes: member.assignedDailyMinutes,
        },
        { onConflict: "team_id,user_id" },
      )
      .then(
        () => {},
        () => {},
      )
  }
  return member
}

export function updateMember(
  teamId: string,
  userId: string,
  patch: Partial<TeamMember>,
): TeamMember | null {
  let updated: TeamMember | null = null
  const list = readMembers(teamId).map((m) => {
    if (m.userId !== userId) return m
    updated = { ...m, ...patch }
    return updated
  })
  if (updated) writeMembers(teamId, list)
  return updated
}

export function removeMember(teamId: string, userId: string): void {
  writeMembers(
    teamId,
    readMembers(teamId).filter((m) => m.userId !== userId),
  )
  if (isSupabaseConfigured) {
    supabase
      .from("team_members")
      .delete()
      .eq("team_id", teamId)
      .eq("user_id", userId)
      .then(
        () => {},
        () => {},
      )
  }
}

export function leaveTeam(teamId: string, userId: string): void {
  removeMember(teamId, userId)
  untrackMembership(teamId)
}

/* ── Invites ─────────────────────────────────────────────────────────── */

export function readInvites(teamId: string): TeamInvite[] {
  return readJSON<TeamInvite[]>(`${KEY_INVITES_PREFIX}${teamId}`, [])
}

function writeInvites(teamId: string, list: TeamInvite[]): void {
  writeJSON(`${KEY_INVITES_PREFIX}${teamId}`, list)
}

export function createInvites(
  teamId: string,
  emails: string[],
  role: TeamRole = "member",
  expiresInDays = 7,
): TeamInvite[] {
  const team = readTeam(teamId)
  if (!team) return []
  const now = Date.now()
  const expires = new Date(now + expiresInDays * 24 * 60 * 60 * 1000).toISOString()
  const fresh: TeamInvite[] = emails
    .map((e) => e.trim().toLowerCase())
    .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))
    .map((email, i) => ({
      id: `inv_${now}_${i}_${Math.random().toString(36).slice(2, 6)}`,
      teamId,
      email,
      role,
      token: generateTeamToken(),
      expiresAt: expires,
      createdAt: new Date().toISOString(),
    }))
  writeInvites(teamId, [...readInvites(teamId), ...fresh])
  if (isSupabaseConfigured && fresh.length > 0) {
    supabase
      .from("team_invites")
      .insert(
        fresh.map((inv) => ({
          id: inv.id,
          team_id: inv.teamId,
          email: inv.email,
          role: inv.role,
          token: inv.token,
          expires_at: inv.expiresAt,
        })),
      )
      .then(
        () => {},
        () => {},
      )
  }
  return fresh
}

export function consumeInvite(token: string): TeamInvite | null {
  for (const teamId of readTeams().map((t) => t.id)) {
    const list = readInvites(teamId)
    const idx = list.findIndex((i) => i.token === token && !i.acceptedAt)
    if (idx !== -1) {
      const accepted = { ...list[idx], acceptedAt: new Date().toISOString() }
      list[idx] = accepted
      writeInvites(teamId, list)
      return accepted
    }
  }
  return null
}

/* ── Announcements ───────────────────────────────────────────────────── */

export function readAnnouncements(teamId: string): TeamAnnouncement[] {
  return readJSON<TeamAnnouncement[]>(`${KEY_ANNOUNCEMENTS_PREFIX}${teamId}`, [])
}

function writeAnnouncements(teamId: string, list: TeamAnnouncement[]): void {
  writeJSON(`${KEY_ANNOUNCEMENTS_PREFIX}${teamId}`, list.slice(-50))
}

export function postAnnouncement(
  teamId: string,
  author: { id: string },
  payload: { title: string; message: string; sendEmail?: boolean; sendPush?: boolean },
): TeamAnnouncement {
  const ann: TeamAnnouncement = {
    id: `ann_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    teamId,
    authorId: author.id,
    title: payload.title.trim(),
    message: payload.message.trim(),
    sendEmail: !!payload.sendEmail,
    sendPush: !!payload.sendPush,
    createdAt: new Date().toISOString(),
  }
  writeAnnouncements(teamId, [...readAnnouncements(teamId), ann])
  if (isSupabaseConfigured) {
    supabase
      .from("team_announcements")
      .insert({
        team_id: teamId,
        author_id: author.id,
        title: ann.title,
        message: ann.message,
        send_email: ann.sendEmail,
        send_push: ann.sendPush,
      })
      .then(
        () => {},
        () => {},
      )
  }
  return ann
}

/* ── Leaderboard opt-in ──────────────────────────────────────────────── */

export function isLeaderboardOptIn(teamId: string, userId: string): boolean {
  const map = readJSON<Record<string, boolean>>(KEY_LEADERBOARD_OPT_IN, {})
  return !!map[`${teamId}:${userId}`]
}

export function setLeaderboardOptIn(teamId: string, userId: string, on: boolean): void {
  const map = readJSON<Record<string, boolean>>(KEY_LEADERBOARD_OPT_IN, {})
  map[`${teamId}:${userId}`] = on
  writeJSON(KEY_LEADERBOARD_OPT_IN, map)
}

/* ── Announcement dismissal ──────────────────────────────────────────── */

export function isAnnouncementDismissed(annId: string): boolean {
  return readJSON<Record<string, boolean>>(KEY_DISMISSED_ANNS, {})[annId] === true
}

export function dismissAnnouncement(annId: string): void {
  const map = readJSON<Record<string, boolean>>(KEY_DISMISSED_ANNS, {})
  map[annId] = true
  writeJSON(KEY_DISMISSED_ANNS, map)
}

/* ── Pending invite token (pre-auth) ─────────────────────────────────── */

export function setPendingTeamInviteToken(token: string): void {
  writeJSON(KEY_PENDING_INVITE, token)
}

export function consumePendingTeamInviteToken(): string | null {
  const t = readJSON<string | null>(KEY_PENDING_INVITE, null)
  if (t) removeKey(KEY_PENDING_INVITE)
  return t
}

/* ── Subscribe ───────────────────────────────────────────────────────── */

export function subscribeTeamsLocal(handler: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  const fn = () => handler()
  window.addEventListener("scholify-teams-change", fn)
  window.addEventListener("storage", fn)
  return () => {
    window.removeEventListener("scholify-teams-change", fn)
    window.removeEventListener("storage", fn)
  }
}

/* ── CSV export ──────────────────────────────────────────────────────── */

export function membersToCSV(members: TeamMember[]): string {
  const header = [
    "member_name",
    "email",
    "role",
    "goal",
    "current_day",
    "total_days",
    "streak",
    "sessions_this_week",
    "sessions_total_in_week",
    "last_active",
    "status",
    "join_date",
  ].join(",")
  const lines = members.map((m) =>
    [
      csvField(m.name),
      csvField(m.email || ""),
      csvField(m.role),
      csvField(m.assignedGoal || ""),
      m.currentDay,
      m.totalDays,
      m.streak,
      m.weekSessions,
      m.weekTotal,
      m.lastActiveAt,
      m.status,
      m.joinedAt,
    ].join(","),
  )
  return [header, ...lines].join("\n")
}

function csvField(s: string): string {
  const needsQuote = /[",\n]/.test(s)
  const escaped = s.replace(/"/g, '""')
  return needsQuote ? `"${escaped}"` : escaped
}

export function downloadCSV(filename: string, csv: string): void {
  if (typeof window === "undefined") return
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/* ── Demo seed ───────────────────────────────────────────────────────── */

function seedDemoTeammates(team: Team) {
  const names: Array<{ name: string; email: string }> = [
    { name: "Aliya Bekova", email: "aliya@example.com" },
    { name: "Tomas Reyes", email: "tomas@example.com" },
    { name: "Sana Hassan", email: "sana@example.com" },
    { name: "Marco Greco", email: "marco@example.com" },
    { name: "Yui Watanabe", email: "yui@example.com" },
    { name: "Hadi Karimov", email: "hadi@example.com" },
    { name: "Iva Petrova", email: "iva@example.com" },
    { name: "Dan Ortega", email: "dan@example.com" },
  ]
  const now = Date.now()
  const existing = readMembers(team.id)
  const extras: TeamMember[] = names.map((n, i) => {
    const streak = Math.floor(Math.random() * 18)
    const week = Math.floor(Math.random() * 6)
    const inactive = Math.random() < 0.15
    return {
      id: `m_seed_${i}_${Math.random().toString(36).slice(2, 6)}`,
      teamId: team.id,
      userId: `peer_${team.id}_${i}`,
      name: n.name,
      email: n.email,
      role: "member",
      assignedGoal: team.defaultGoal,
      assignedDeadline: null,
      assignedDailyMinutes: 20,
      joinedAt: new Date(now - i * 86400000).toISOString(),
      currentDay: Math.max(1, streak + Math.floor(Math.random() * 5)),
      totalDays: 30,
      streak,
      weekSessions: week,
      weekTotal: 5,
      lastActiveAt: new Date(now - (inactive ? 4 * 86400000 : Math.random() * 86400000)).toISOString(),
      status: streak === 0 ? "not_started" : inactive ? "inactive" : "active",
    }
  })
  writeMembers(team.id, [...existing, ...extras])
}
