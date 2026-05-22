import { useState } from "react"
import { motion } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useToast } from "@/components/Toast"
import { requestNotificationPermission, subscribeToPush } from "@/lib/notifications"

/*
 * Small prompt card inviting the user to enable daily reminders.
 * Shown after a task completion (see Dashboard). Dismissals are
 * remembered for 7 days.
 */

const DISMISS_KEY = "scholify-notif-dismissed-at"
const DISMISS_DAYS = 7

/** True when the prompt should be shown (supported, not granted, not recently dismissed). */
export function shouldShowNotificationPrompt(): boolean {
  if (typeof window === "undefined" || !("Notification" in window)) return false
  if (Notification.permission === "granted" || Notification.permission === "denied") return false
  try {
    const at = window.localStorage.getItem(DISMISS_KEY)
    if (at && Date.now() - Number(at) < DISMISS_DAYS * 86_400_000) return false
  } catch {
    /* ignore */
  }
  return true
}

export default function NotificationPrompt({
  userId,
  onClose,
}: {
  userId?: string
  onClose: () => void
}) {
  const { toast } = useToast()
  const [busy, setBusy] = useState(false)

  const enable = async () => {
    setBusy(true)
    const granted = await requestNotificationPermission()
    if (granted) {
      await subscribeToPush(userId)
      toast.success("Notifications enabled ✓")
    } else {
      toast.info("You can enable notifications anytime in Settings")
    }
    setBusy(false)
    onClose()
  }

  const notNow = () => {
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()))
    } catch {
      /* ignore */
    }
    onClose()
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        bottom: 80,
        right: 24,
        maxWidth: 320,
        zIndex: 500,
        padding: 20,
        borderRadius: 18,
        background: "rgba(15,14,22,0.98)",
        border: "1px solid rgba(139,92,246,0.2)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
      }}
    >
      <div style={{ fontSize: 24 }}>🔔</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#F0EEFF", marginTop: 8 }}>
        Never miss a day
      </div>
      <div style={{ fontSize: 13, color: "rgba(240,238,255,0.45)", marginTop: 4, lineHeight: 1.5 }}>
        Let Lara send you a daily reminder so your streak stays alive.
      </div>

      <motion.button
        type="button"
        onClick={enable}
        disabled={busy}
        whileTap={{ scale: 0.98 }}
        style={{
          width: "100%",
          height: 40,
          marginTop: 16,
          borderRadius: 10,
          border: "none",
          background: IRIDESCENT,
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          opacity: busy ? 0.7 : 1,
        }}
      >
        {busy ? "Enabling…" : "Enable notifications"}
      </motion.button>
      <button
        type="button"
        onClick={notNow}
        style={{
          width: "100%",
          marginTop: 8,
          background: "transparent",
          border: "none",
          fontSize: 13,
          color: "rgba(240,238,255,0.3)",
          cursor: "pointer",
        }}
      >
        Not now
      </button>
    </motion.div>
  )
}
