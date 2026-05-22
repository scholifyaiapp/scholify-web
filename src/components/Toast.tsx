import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { motion, AnimatePresence } from "motion/react"

/* ──────────────────────────────────────────────────────────────
 *  App-wide toast notifications.
 *  Wrap the app in <ToastProvider>, then call useToast():
 *    const { toast } = useToast()
 *    toast.success("Saved ✓")
 * ────────────────────────────────────────────────────────────── */

type ToastType = "success" | "error" | "info" | "warning"

interface ToastItem {
  id: number
  type: ToastType
  message: string
}

const META: Record<ToastType, { color: string; icon: string }> = {
  success: { color: "#34D399", icon: "✓" },
  error: { color: "#FF453A", icon: "✕" },
  info: { color: "rgba(139,92,246,0.9)", icon: "ℹ" },
  warning: { color: "#FF9F0A", icon: "⚠" },
}

const ToastContext = createContext<((type: ToastType, message: string) => void) | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const remove = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id))
  }, [])

  const show = useCallback(
    (type: ToastType, message: string) => {
      const id = Date.now() + Math.random()
      setToasts((list) => [...list, { id, type, message }])
      setTimeout(() => remove(id), 3000)
    },
    [remove],
  )

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          pointerEvents: "none",
        }}
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const meta = META[t.type]
            return (
              <motion.div
                key={t.id}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  minWidth: 280,
                  maxWidth: 360,
                  padding: "14px 18px",
                  borderRadius: 14,
                  background: "rgba(15,14,22,0.97)",
                  border: "1px solid var(--sch-border)",
                  borderLeft: `3px solid ${meta.color}`,
                  boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                  pointerEvents: "auto",
                }}
              >
                <span style={{ color: meta.color, fontSize: 18, flexShrink: 0 }}>{meta.icon}</span>
                <span style={{ fontSize: 14, color: "var(--sch-text)", flex: 1 }}>{t.message}</span>
                <button
                  type="button"
                  onClick={() => remove(t.id)}
                  aria-label="Dismiss"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--sch-tx-3)",
                    fontSize: 16,
                    cursor: "pointer",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const show = useContext(ToastContext)
  return useMemo(
    () => ({
      toast: {
        success: (m: string) => show?.("success", m),
        error: (m: string) => show?.("error", m),
        info: (m: string) => show?.("info", m),
        warning: (m: string) => show?.("warning", m),
      },
    }),
    [show],
  )
}
