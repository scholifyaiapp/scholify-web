import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@supabase/supabase-js"

/*
 * POST /api/remove-push-subscription — deletes a user's stored web-push
 * subscription. Best-effort; always returns 200.
 */

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." })
    return
  }

  let body: { userId?: string } = {}
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {})
  } catch {
    res.status(400).json({ error: "Invalid JSON body." })
    return
  }

  const url = process.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (url && serviceKey && body.userId) {
    try {
      const admin = createClient(url, serviceKey)
      await admin.from("push_subscriptions").delete().eq("user_id", body.userId)
    } catch (err) {
      console.error("remove-push-subscription:", err)
    }
  }

  res.status(200).json({ success: true })
}
