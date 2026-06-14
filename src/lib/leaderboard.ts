import { supabase } from "@/lib/supabase"
import { currentWeeklyXp, readVocabProgress } from "@/lib/vocab"

/*
 * Weekly leaderboard client. Talks to /api/leaderboard. Every call degrades
 * gracefully: if the user is signed out, the backend is unconfigured, or the
 * table doesn't exist yet, it returns { entries: [], disabled: true } and the
 * UI shows a friendly empty state — never an error.
 */

const API_BASE = import.meta.env.VITE_API_URL || ""

export interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  weeklyXp: number
  streak: number
}

export interface LeaderboardResult {
  entries: LeaderboardEntry[]
  weekStart: string
  disabled: boolean
  /** This user's id, so the UI can highlight their row. */
  meId: string | null
}

const KEY_OPTIN = "scholify-leaderboard-name"

/** The opted-in display name, or null if the learner hasn't joined. */
export function leaderboardName(): string | null {
  try {
    return window.localStorage.getItem(KEY_OPTIN)
  } catch {
    return null
  }
}

export function setLeaderboardName(name: string): void {
  try {
    window.localStorage.setItem(KEY_OPTIN, name.trim().slice(0, 24))
  } catch {
    /* ignore */
  }
}

export function leaveLeaderboard(): void {
  try {
    window.localStorage.removeItem(KEY_OPTIN)
  } catch {
    /* ignore */
  }
}

async function accessToken(): Promise<{ token: string | null; userId: string | null }> {
  try {
    const { data } = await supabase.auth.getSession()
    return {
      token: data.session?.access_token ?? null,
      userId: data.session?.user?.id ?? null,
    }
  } catch {
    return { token: null, userId: null }
  }
}

/**
 * Fetch the weekly board. If the learner has opted in (has a display name) and
 * is signed in, also push their current weekly XP + streak first.
 */
export async function fetchLeaderboard(): Promise<LeaderboardResult> {
  const name = leaderboardName()
  const { token, userId } = await accessToken()
  const empty: LeaderboardResult = { entries: [], weekStart: "", disabled: true, meId: userId }

  try {
    let res: Response
    if (name && token) {
      const progress = readVocabProgress()
      res = await fetch(`${API_BASE}/api/leaderboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ displayName: name, weeklyXp: currentWeeklyXp(progress), streak: progress.streak }),
      })
    } else {
      res = await fetch(`${API_BASE}/api/leaderboard`, { method: "GET" })
    }
    if (!res.ok) return empty
    const data = (await res.json()) as Omit<LeaderboardResult, "meId">
    return { ...data, meId: userId }
  } catch {
    return empty
  }
}
