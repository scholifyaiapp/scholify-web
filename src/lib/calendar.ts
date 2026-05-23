/*
 * Google Calendar — client-side helpers.
 *
 * Token storage lives in the `calendar_accounts` Supabase table (see
 * SUPABASE_SETUP.md → Step 9). The OAuth code-for-token exchange happens
 * server-side in `/api/calendar-callback`, so the client secret never
 * ships to the browser.
 *
 * Every public function degrades gracefully when env vars or tokens
 * are missing — the UI surfaces a "not configured" / "not connected"
 * state instead of throwing.
 */

import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import type { PlanTask } from "@/lib/scholify-data"

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
const GOOGLE_EVENTS_URL =
  "https://www.googleapis.com/calendar/v3/calendars/primary/events"

const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar.readonly",
]

export interface CalendarAccount {
  user_id: string
  provider: "google" | "calcom"
  google_access_token: string | null
  google_refresh_token: string | null
  google_token_expiry: string | null
  calcom_api_key: string | null
  calendar_sync_enabled: boolean
  calendar_reminder_minutes: number
  auto_sync: boolean
}

/* ── Config ──────────────────────────────────────────────────── */

export const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as
  | string
  | undefined
export const googleRedirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI as
  | string
  | undefined

export const isGoogleConfigured = Boolean(googleClientId && googleRedirectUri)

/* ── OAuth start ─────────────────────────────────────────────── */

export function getGoogleAuthUrl(state?: string): string {
  if (!isGoogleConfigured) return ""
  const params = new URLSearchParams({
    client_id: googleClientId!,
    redirect_uri: googleRedirectUri!,
    response_type: "code",
    scope: SCOPES.join(" "),
    access_type: "offline",
    include_granted_scopes: "true",
    prompt: "consent",
  })
  if (state) params.set("state", state)
  return `${GOOGLE_AUTH_URL}?${params}`
}

/* ── Account persistence ─────────────────────────────────────── */

export async function loadCalendarAccount(
  userId: string,
): Promise<CalendarAccount | null> {
  if (!isSupabaseConfigured) return readLocalAccount(userId)
  try {
    const { data, error } = await supabase
      .from("calendar_accounts")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle()
    if (error) return readLocalAccount(userId)
    if (!data) return null
    return data as CalendarAccount
  } catch {
    return readLocalAccount(userId)
  }
}

export async function updateCalendarAccount(
  userId: string,
  patch: Partial<Omit<CalendarAccount, "user_id">>,
): Promise<CalendarAccount | null> {
  const current = (await loadCalendarAccount(userId)) ?? {
    user_id: userId,
    provider: "google" as const,
    google_access_token: null,
    google_refresh_token: null,
    google_token_expiry: null,
    calcom_api_key: null,
    calendar_sync_enabled: false,
    calendar_reminder_minutes: 15,
    auto_sync: true,
  }
  const next: CalendarAccount = { ...current, ...patch, user_id: userId }
  writeLocalAccount(next)
  if (isSupabaseConfigured) {
    try {
      await supabase
        .from("calendar_accounts")
        .upsert({ ...next, updated_at: new Date().toISOString() })
    } catch {
      /* ignore — local copy already updated */
    }
  }
  return next
}

export async function disconnectGoogle(userId: string): Promise<void> {
  await updateCalendarAccount(userId, {
    google_access_token: null,
    google_refresh_token: null,
    google_token_expiry: null,
    calendar_sync_enabled: false,
  })
}

function localKey(userId: string) {
  return `scholify-calendar-${userId}`
}

function readLocalAccount(userId: string): CalendarAccount | null {
  try {
    const raw = window.localStorage.getItem(localKey(userId))
    if (!raw) return null
    return JSON.parse(raw) as CalendarAccount
  } catch {
    return null
  }
}

function writeLocalAccount(account: CalendarAccount): void {
  try {
    window.localStorage.setItem(
      localKey(account.user_id),
      JSON.stringify(account),
    )
  } catch {
    /* ignore */
  }
}

/* ── Token refresh ───────────────────────────────────────────── */

async function ensureFreshAccessToken(
  account: CalendarAccount,
): Promise<string | null> {
  if (!account.google_access_token) return null
  const expiry = account.google_token_expiry
    ? new Date(account.google_token_expiry).getTime()
    : 0
  const fresh = expiry - Date.now() > 60_000 // > 1 min of life left
  if (fresh) return account.google_access_token

  if (!account.google_refresh_token) return account.google_access_token
  try {
    const res = await fetch("/api/calendar-callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "refresh",
        refresh_token: account.google_refresh_token,
        user_id: account.user_id,
      }),
    })
    if (!res.ok) return account.google_access_token
    const data = (await res.json()) as {
      access_token?: string
      expires_in?: number
    }
    if (!data.access_token) return account.google_access_token
    const expiresAt = new Date(
      Date.now() + (data.expires_in ?? 3600) * 1000,
    ).toISOString()
    await updateCalendarAccount(account.user_id, {
      google_access_token: data.access_token,
      google_token_expiry: expiresAt,
    })
    return data.access_token
  } catch {
    return account.google_access_token
  }
}

/* ── Event creation ──────────────────────────────────────────── */

export interface CreateEventInput {
  accessToken: string
  taskTitle: string
  taskDescription: string
  date: string // ISO date
  durationMinutes: number
  reminderMinutes?: number
}

export async function createCalendarEvent(
  params: CreateEventInput,
): Promise<{ id: string; htmlLink: string }> {
  const startTime = new Date(params.date)
  startTime.setHours(8, 0, 0, 0)

  const endTime = new Date(startTime)
  endTime.setMinutes(startTime.getMinutes() + params.durationMinutes)

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const event = {
    summary: `📚 ${params.taskTitle}`,
    description: `${params.taskDescription}\n\nPowered by Scholify ✦\nOpen app: https://scholifyapp.com/dashboard`,
    start: { dateTime: startTime.toISOString(), timeZone },
    end: { dateTime: endTime.toISOString(), timeZone },
    colorId: "9",
    reminders: {
      useDefault: false,
      overrides: [
        { method: "popup", minutes: params.reminderMinutes ?? 15 },
        { method: "email", minutes: 60 },
      ],
    },
    source: { title: "Scholify", url: "https://scholifyapp.com" },
  }

  const response = await fetch(GOOGLE_EVENTS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  })

  if (!response.ok) {
    const msg = await response.text().catch(() => "")
    throw new Error(`Google Calendar rejected event: ${response.status} ${msg}`)
  }
  return (await response.json()) as { id: string; htmlLink: string }
}

/* ── Week sync ───────────────────────────────────────────────── */

export interface SyncWeekInput {
  account: CalendarAccount
  tasks: PlanTask[]
  planStartDate: string
  dailyMinutes: number
  reminderMinutes?: number
}

export interface SyncResult {
  total: number
  success: number
  failed: number
  errors: string[]
}

export async function syncWeekToCalendar(
  params: SyncWeekInput,
  onProgress?: (done: number, total: number) => void,
): Promise<SyncResult> {
  const token = await ensureFreshAccessToken(params.account)
  if (!token) {
    return {
      total: params.tasks.length,
      success: 0,
      failed: params.tasks.length,
      errors: ["No access token — connect Google Calendar first."],
    }
  }

  const result: SyncResult = {
    total: params.tasks.length,
    success: 0,
    failed: 0,
    errors: [],
  }

  for (let i = 0; i < params.tasks.length; i++) {
    const task = params.tasks[i]
    const taskDate = new Date(params.planStartDate)
    taskDate.setDate(taskDate.getDate() + task.day_number - 1)

    try {
      await createCalendarEvent({
        accessToken: token,
        taskTitle: task.task_title,
        taskDescription: task.task_description,
        date: taskDate.toISOString(),
        durationMinutes: params.dailyMinutes,
        reminderMinutes: params.reminderMinutes,
      })
      result.success += 1
    } catch (err) {
      result.failed += 1
      result.errors.push(err instanceof Error ? err.message : String(err))
    }

    onProgress?.(i + 1, params.tasks.length)

    // Be gentle on the API — 100ms gap between writes.
    await new Promise((r) => setTimeout(r, 100))
  }

  return result
}

/* ── Single-task auto-sync ───────────────────────────────────── */

export async function syncSingleTask(
  account: CalendarAccount,
  task: PlanTask,
  date: Date,
  dailyMinutes: number,
): Promise<boolean> {
  if (!account.calendar_sync_enabled || !account.auto_sync) return false
  const token = await ensureFreshAccessToken(account)
  if (!token) return false
  try {
    await createCalendarEvent({
      accessToken: token,
      taskTitle: task.task_title,
      taskDescription: task.task_description,
      date: date.toISOString(),
      durationMinutes: dailyMinutes,
      reminderMinutes: account.calendar_reminder_minutes,
    })
    return true
  } catch {
    return false
  }
}

/* ── Server-side token exchange (kept here for type sharing) ── */

export interface GoogleTokenResponse {
  access_token: string
  refresh_token?: string
  expires_in: number
  scope: string
  token_type: string
}

export const GOOGLE_TOKEN_ENDPOINT = GOOGLE_TOKEN_URL
