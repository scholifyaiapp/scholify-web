/*
 * Web push notification helpers (client-side).
 *
 * Browser support: desktop Chrome/Firefox/Edge, Android Chrome, and
 * iOS Safari 16.4+ (installed PWA only).
 *
 * Sending pushes requires VAPID keys + a server. This file handles the
 * client half: permission, subscribe, unsubscribe. The subscription is
 * posted to /api/save-push-subscription for the server to use later.
 */

export const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
  const raw = window.atob(base64)
  const output = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i += 1) output[i] = raw.charCodeAt(i)
  return output
}

/** Current notification permission, or "unsupported". */
export function notificationStatus(): NotificationPermission | "unsupported" {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported"
  return Notification.permission
}

/** Ask the browser for notification permission. Returns true if granted. */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!("Notification" in window) || !("serviceWorker" in navigator)) return false
  try {
    const permission = await Notification.requestPermission()
    return permission === "granted"
  } catch {
    return false
  }
}

/**
 * Subscribe this device to web push and register the subscription with
 * the server. Best-effort — returns false (no throw) if push isn't
 * available or VAPID keys aren't configured yet.
 */
export async function subscribeToPush(userId?: string): Promise<boolean> {
  try {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return false
    if (!VAPID_PUBLIC_KEY) return false

    const registration = await navigator.serviceWorker.ready
    const existing = await registration.pushManager.getSubscription()
    const subscription =
      existing ??
      (await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource,
      }))

    await fetch("/api/save-push-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, subscription: subscription.toJSON() }),
    }).catch(() => {})

    return true
  } catch (err) {
    console.error("Push subscription failed:", err)
    return false
  }
}

/** Remove this device's push subscription. */
export async function unsubscribeFromPush(userId?: string): Promise<void> {
  try {
    if (!("serviceWorker" in navigator)) return
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()
    if (subscription) {
      await subscription.unsubscribe()
      await fetch("/api/remove-push-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      }).catch(() => {})
    }
  } catch (err) {
    console.error("Unsubscribe failed:", err)
  }
}
