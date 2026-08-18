import { Link } from "react-router-dom"
import { motion } from "motion/react"

/*
 * A real 404. The catch-all used to `Navigate to="/"` silently, so every dead
 * or mistyped link returned the homepage with the URL rewritten — Google reads
 * that as a soft 404 (and can penalise it), and a person following a broken
 * link was dumped on the landing page with no explanation. This page says what
 * happened and offers the way on. (A true HTTP 404 status needs server-side
 * routing an SPA doesn't have; the dedicated page + noindex is the honest
 * client-side equivalent.)
 */
export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "var(--sch-bg)",
        padding: 24,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center", maxWidth: 460 }}
      >
        <div
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.18em",
            color: "#C80000",
            marginBottom: 14,
          }}
        >
          404 · OFF TRACK
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: "var(--sch-text)", letterSpacing: "-0.02em", margin: "0 0 10px" }}>
          This page doesn't exist
        </h1>
        <p style={{ fontSize: 15, color: "var(--sch-tx-2)", lineHeight: 1.6, margin: "0 0 26px" }}>
          The link may be old, mistyped, or the page has moved. Your study plan is exactly where you left it.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "13px 26px",
              borderRadius: 14,
              background: "linear-gradient(135deg,#C80000 0%,#E50068 55%,#F4A405 100%)",
              color: "#fff",
              fontWeight: 750,
              fontSize: 14.5,
              textDecoration: "none",
            }}
          >
            Back to Scholify
          </Link>
          <Link
            to="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "13px 26px",
              borderRadius: 14,
              border: "1px solid var(--sch-border)",
              background: "var(--sch-card)",
              color: "var(--sch-text)",
              fontWeight: 700,
              fontSize: 14.5,
              textDecoration: "none",
            }}
          >
            My dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
