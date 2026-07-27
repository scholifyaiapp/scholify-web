import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { MessageCircleHeart, X } from "lucide-react"
import FeedbackForm from "@/components/FeedbackForm"

export default function FeedbackLauncher({ name, email }: { name?: string; email?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Send feedback"
        className="feedback-launcher"
        style={{ position: "fixed", right: 20, bottom: 24, zIndex: 38, width: 50, height: 50, borderRadius: 17, border: "1px solid rgba(255,255,255,.25)", background: "linear-gradient(135deg,#C80000,#E50068)", color: "#fff", display: "grid", placeItems: "center", cursor: "pointer", boxShadow: "0 14px 34px rgba(200,0,0,.28)" }}
      >
        <MessageCircleHeart size={22} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 80, display: "grid", placeItems: "center", padding: 18, background: "rgba(20,20,26,.48)", backdropFilter: "blur(8px)" }}
          >
            <motion.div initial={{ opacity: 0, y: 22, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} style={{ width: "min(100%,520px)", maxHeight: "calc(100dvh - 36px)", overflowY: "auto", boxSizing: "border-box", background: "var(--sch-card)", color: "var(--sch-text)", border: "1px solid var(--sch-border)", borderRadius: 22, padding: 24, boxShadow: "0 30px 90px rgba(20,20,26,.28)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 18 }}>
                <div><div style={{ color: "#C80000", fontSize: 10, fontWeight: 900, letterSpacing: ".14em", textTransform: "uppercase" }}>Direct to the founder</div><h2 style={{ margin: "7px 0 4px", fontSize: 24, letterSpacing: "-.035em" }}>Help shape Scholify.</h2><p style={{ margin: 0, color: "var(--sch-tx-2)", fontSize: 12.5 }}>Ideas, bugs, content notes—tell us everything.</p></div>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close feedback" style={{ width: 34, height: 34, borderRadius: 10, border: "1px solid var(--sch-border)", background: "var(--sch-bg)", color: "var(--sch-text)", display: "grid", placeItems: "center", cursor: "pointer", flexShrink: 0 }}><X size={17} /></button>
              </div>
              <FeedbackForm source="app" compact defaultName={name} defaultEmail={email} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
