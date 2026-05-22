import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@supabase/supabase-js"

/*
 * POST /api/save-push-subscription — stores a web-push subscription so
 * the server can send daily reminders later.
 *
 * Best-effort: persists to the Supabase `push_subscriptions` table when
 * a service-role key is configured (see SUPABASE_SETUP.md for the SQL).
 * Always returns 200 so the client subscription flow never breaks.
 */

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." })
    return
  }

  let body: { userId?: string; subscription?: unknown } = {}
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {})
  } catch {
    res.status(400).json({ error: "Invalid JSON body." })
    return
  }

  const url = process.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (url && serviceKey && body.userId && body.subscription) {
    try {
      const admin = createClient(url, serviceKey)
      await admin.from("push_subscriptions").upsert(
        {
          user_id: body.userId,
          subscription: body.subscription,
          created_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      )
    } catch (err) {
      console.error("save-push-subscription:", err)
    }
  }

  res.status(200).json({ success: true })
}
