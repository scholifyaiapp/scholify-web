import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@supabase/supabase-js"

/*
 * GET /api/leaderboard?category=…&weekOffset=0&userId=…
 *
 * Returns the top 10 opted-in users in `category` for the current ISO
 * week (or weekOffset weeks back). When the Supabase service role key
 * isn't available — or the relevant tables don't exist yet — degrades
 * to 200 with `{ top10: [], yourRank: null, isFallback: true }` so the
 * client renders the local fallback instead of crashing.
 */

interface Top10Row {
  user_id: string
  display_name: string | null
  sessions: number
  streak: number
}

interface LeaderboardResponse {
  top10: Top10Row[]
  yourRank: { rank: number; sessions: number } | null
  category: string
  weekStart: string
  weekEnd: string
  isFallback?: boolean
  reason?: string
}

function isoWeekRange(weekOffset = 0): { start: Date; end: Date } {
  const now = new Date()
  const day = now.getUTCDay() || 7
  const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  monday.setUTCDate(monday.getUTCDate() - (day - 1) - weekOffset * 7)
  const end = new Date(monday)
  end.setUTCDate(end.getUTCDate() + 7)
  return { start: monday, end }
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const category = String(req.query.category || "all")
  const weekOffset = Math.max(0, Math.min(8, Number(req.query.weekOffset || 0)))
  const userId = req.query.userId ? String(req.query.userId) : null

  const { start, end } = isoWeekRange(weekOffset)
  const baseResponse: LeaderboardResponse = {
    top10: [],
    yourRank: null,
    category,
    weekStart: start.toISOString(),
    weekEnd: end.toISOString(),
  }

  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY

  if (!url || !serviceKey) {
    res.status(200).json({ ...baseResponse, isFallback: true, reason: "missing_supabase_env" })
    return
  }

  const client = createClient(url, serviceKey, { auth: { persistSession: false } })

  try {
    // Pull all opted-in users with the requested goal category.
    // Strategy: lean on a single query per source table since we can't
    // join across project schemas safely.
    const { data: optIns, error: optInErr } = await client
      .from("community_opt_in")
      .select("user_id, display_name, opted_in")
      .eq("opted_in", true)
    if (optInErr) throw optInErr

    if (!optIns || optIns.length === 0) {
      res.status(200).json(baseResponse)
      return
    }

    const optInIds = new Set(optIns.map((o) => o.user_id))
    const displayNames = new Map<string, string | null>(optIns.map((o) => [o.user_id, o.display_name]))

    // Count community_posts of type 'completion' in the window for opted-in
    // users in this category — that's what the leaderboard ranks on.
    let postsQ = client
      .from("community_posts")
      .select("user_id, streak_at_post, post_type, goal_category, created_at")
      .gte("created_at", start.toISOString())
      .lt("created_at", end.toISOString())
      .eq("post_type", "completion")
    if (category !== "all") postsQ = postsQ.eq("goal_category", category)
    const { data: posts, error: postsErr } = await postsQ
    if (postsErr) throw postsErr

    const buckets = new Map<string, { sessions: number; streak: number }>()
    for (const p of posts || []) {
      const uid = p.user_id as string
      if (!optInIds.has(uid)) continue
      const cur = buckets.get(uid) || { sessions: 0, streak: 0 }
      cur.sessions += 1
      if (typeof p.streak_at_post === "number" && p.streak_at_post > cur.streak) cur.streak = p.streak_at_post
      buckets.set(uid, cur)
    }

    const ranked = Array.from(buckets.entries())
      .map(([uid, agg]) => ({
        user_id: uid,
        display_name: displayNames.get(uid) ?? null,
        sessions: agg.sessions,
        streak: agg.streak,
      }))
      .sort((a, b) => b.sessions - a.sessions || b.streak - a.streak)

    const top10 = ranked.slice(0, 10)

    let yourRank: LeaderboardResponse["yourRank"] = null
    if (userId) {
      const idx = ranked.findIndex((r) => r.user_id === userId)
      if (idx !== -1) yourRank = { rank: idx + 1, sessions: ranked[idx].sessions }
    }

    res.status(200).json({ ...baseResponse, top10, yourRank })
  } catch (err) {
    console.error("leaderboard error:", err)
    res.status(200).json({
      ...baseResponse,
      isFallback: true,
      reason: (err as Error).message?.slice(0, 200) || "query_failed",
    })
  }
}
