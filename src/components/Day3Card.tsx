import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"

/*
 * Day-3 retention card. Day 3 is the first major dropout cliff — research
 * shows most people quit before it. Crossing it is worth celebrating, so we
 * surface this 1.5s after the completion confetti (and auto-dismiss after 8s,
 * handled by the caller).
 */

export default function Day3Card({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(5,5,8,0.72)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "grid",
            placeItems: "center",
            padding: 20,
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{
              width: "100%",
              maxWidth: 420,
              padding: "36px 28px",
              borderRadius: 24,
              textAlign: "center",
              background: "var(--sch-bg-2, #0D0015)",
              border: "1px solid rgba(200,0,0,0.4)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.7), 0 0 80px rgba(200,0,0,0.08)",
            }}
          >
            <div style={{ fontSize: 52, lineHeight: 1 }}>🌱</div>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--sch-text)",
                marginTop: 16,
              }}
            >
              Day 3. This is where it counts.
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "var(--sch-tx-2)",
                lineHeight: 1.6,
                marginTop: 8,
              }}
            >
              Research shows most people quit before Day 3. You didn't.
            </p>
            <p
              style={{
                fontSize: 14,
                color: "var(--sch-tx-2)",
                lineHeight: 1.6,
                marginTop: 6,
              }}
            >
              You're officially in the top 30% of learners who start a Scholify plan.
            </p>
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                marginTop: 24,
                padding: "12px 28px",
                borderRadius: 12,
                border: "none",
                background: IRIDESCENT,
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 0 28px rgba(200,0,0,0.3)",
              }}
            >
              Keep going →
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
