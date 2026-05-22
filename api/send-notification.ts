import type { VercelRequest, VercelResponse } from "@vercel/node"
import webpush from "web-push"
import { createClient } from "@supabase/supabase-js"

/*
 * POST /api/send-notification — sends a web-push notification to one user.
 *
 * Looks up the user's stored push subscription (Supabase `push_subscriptions`,
 * service-role key) and delivers the payload via the VAPID keys. Expired
 * subscriptions (410/404) are pruned.
 *
 * Degrades gracefully: returns 200 with `sent:false` + a reason when VAPID
 * keys, the service key, or a subscription are missing. Never throws.
 */

interface Body {
  userId?: string
  title?: string
  body?: string
  url?: string
  taskTitle?: string
  streak?: number
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." })
    return
  }

  let body: Body = {}
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {})
  } catch {
    res.status(400).json({ error: "Invalid JSON body." })
    return
  }
  if (!body.userId) {
    res.status(400).json({ error: "Missing userId." })
    return
  }

  const vapidPublic = process.env.VAPID_PUBLIC_KEY
  const vapidPrivate = process.env.VAPID_PRIVATE_KEY
  const vapidEmail = process.env.VAPID_EMAIL || "mailto:hello@scholifyapp.com"
  const supaUrl = process.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!vapidPublic || !vapidPrivate) {
    res.status(200).json({ sent: false, reason: "VAPID keys not configured" })
    return
  }
  if (!supaUrl || !serviceKey) {
    res.status(200).json({ sent: false, reason: "Supabase service key not configured" })
    return
  }

  const admin = createClient(supaUrl, serviceKey)

  try {
    webpush.setVapidDetails(vapidEmail, vapidPublic, vapidPrivate)

    const { data } = await admin
      .from("push_subscriptions")
      .select("subscription")
      .eq("user_id", body.userId)
      .single()

    const subscription = data?.subscription as webpush.PushSubscription | undefined
    if (!subscription) {
      res.status(200).json({ sent: false, reason: "No subscription for user" })
      return
    }

    const payload = JSON.stringify({
      title: body.title || "✦ Scholify",
      body: body.body || "Your daily task is ready.",
      url: body.url || "/dashboard",
      taskTitle: body.taskTitle,
      streak: body.streak,
    })

    await webpush.sendNotification(subscription, payload)
    res.status(200).json({ sent: true })
  } catch (err) {
    const statusCode = (err as { statusCode?: number })?.statusCode
    // Subscription expired — prune it so we stop trying.
    if (statusCode === 410 || statusCode === 404) {
      await admin
        .from("push_subscriptions")
        .delete()
        .eq("user_id", body.userId)
        .then(
          () => {},
          () => {},
        )
    }
    const message = err instanceof Error ? err.message : "Push send failed"
    console.error("send-notification:", message)
    res.status(200).json({ sent: false, reason: message })
  }
}
