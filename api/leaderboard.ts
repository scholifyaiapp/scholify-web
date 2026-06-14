import { createClient } from "@supabase/supabase-js"
import type { VercelRequest, VercelResponse } from "@vercel/node"

/*
 * Weekly XP leaderboard.
 *
 *   GET  /api/leaderboard            → { entries, weekStart, disabled }
 *   POST /api/leaderboard            → upsert my score, then return the board
 *        Authorization: Bearer <supabase access token>
 *        body: { displayName, weeklyXp, streak }
 *
 * Requires a `vocab_leaderboard` table (see the migration shipped with this
 * feature). When Supabase env / the table is absent, responds with
 * { entries: [], disabled: true } so the client shows a graceful empty state.
 */

const TABLE = "vocab_leaderboard"

function admin() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

/** yyyy-MM-dd of the current week's Monday (UTC). */
function weekStart(): string {
  const d = new Date()
  const dow = (d.getUTCDay() + 6) % 7 // Monday = 0
  d.setUTCDate(d.getUTCDate() - dow)
  return d.toISOString().slice(0, 10)
}

function cleanName(v: unknown): string {
  const s = String(v || "").replace(/[<>]/g, "").trim().slice(0, 24)
  return s || "Learner"
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const db = admin()
  const ws = weekStart()

  // No backend configured → graceful no-op.
  if (!db) {
    res.status(200).json({ entries: [], weekStart: ws, disabled: true })
    return
  }

  try {
    if (req.method === "POST") {
      const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
      if (!token) {
        res.status(401).json({ error: "Not signed in." })
        return
      }
      const { data: userData, error: userErr } = await db.auth.getUser(token)
      if (userErr || !userData.user) {
        res.status(401).json({ error: "Invalid session." })
        return
      }
      const body = (req.body || {}) as Record<string, unknown>
      const row = {
        user_id: userData.user.id,
        display_name: cleanName(body.displayName),
        weekly_xp: Math.max(0, Math.min(1_000_000, Number(body.weeklyXp) || 0)),
        streak: Math.max(0, Math.min(100_000, Number(body.streak) || 0)),
        week_start: ws,
        updated_at: new Date().toISOString(),
      }
      const { error: upErr } = await db.from(TABLE).upsert(row, { onConflict: "user_id" })
      if (upErr) {
        // Most likely the table doesn't exist yet → disable gracefully.
        res.status(200).json({ entries: [], weekStart: ws, disabled: true })
        return
      }
    }

    const { data, error } = await db
      .from(TABLE)
      .select("user_id, display_name, weekly_xp, streak")
      .eq("week_start", ws)
      .order("weekly_xp", { ascending: false })
      .limit(50)

    if (error) {
      res.status(200).json({ entries: [], weekStart: ws, disabled: true })
      return
    }

    const entries = (data || []).map((r, i) => ({
      rank: i + 1,
      userId: r.user_id,
      name: r.display_name,
      weeklyXp: r.weekly_xp,
      streak: r.streak,
    }))
    res.status(200).json({ entries, weekStart: ws, disabled: false })
  } catch (err) {
    console.error("leaderboard:", err)
    res.status(200).json({ entries: [], weekStart: ws, disabled: true })
  }
}
