import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@supabase/supabase-js"

/*
 * Combined push-subscription endpoint — replaces the previous
 * save-push-subscription + remove-push-subscription pair to stay
 * under the 12-function Hobby cap.
 *
 *   POST /api/push-subscription?action=save
 *     body: { userId, subscription }
 *
 *   POST /api/push-subscription?action=remove
 *     body: { userId }
 *
 * Best-effort: persists to / deletes from Supabase `push_subscriptions`
 * when a service-role key is configured. Always returns 200 so the
 * client subscription flow never breaks.
 */

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." })
    return
  }

  let body: { action?: string; userId?: string; subscription?: unknown } = {}
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {})
  } catch {
    res.status(400).json({ error: "Invalid JSON body." })
    return
  }

  const action = String((req.query.action || body.action) || "").trim().toLowerCase()

  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (action === "save") {
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
        console.error("push-subscription save:", err)
      }
    }
    res.status(200).json({ success: true })
    return
  }

  if (action === "remove") {
    if (url && serviceKey && body.userId) {
      try {
        const admin = createClient(url, serviceKey)
        await admin.from("push_subscriptions").delete().eq("user_id", body.userId)
      } catch (err) {
        console.error("push-subscription remove:", err)
      }
    }
    res.status(200).json({ success: true })
    return
  }

  res.status(400).json({ error: "Unknown action. Use ?action=save | remove." })
}
