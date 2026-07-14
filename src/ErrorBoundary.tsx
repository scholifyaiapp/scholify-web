import { Component, type ReactNode } from "react"
import { motion } from "motion/react"
import { IconBadge, Icon, C, SHADOW } from "@/components/acca/ui"
import { captureError } from "@/lib/analytics"

/*
 * Root error boundary — the last thing between a crash and the user.
 *
 * It used to print a raw JS stack and component stack, open, with no way out.
 * Now it shows a calm branded page with a reload, reports the crash, and keeps
 * the stack behind a collapsed panel that only exists in dev.
 */

interface State {
  error: Error | null
  info: string
}

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null, info: "" }

  static getDerivedStateFromError(error: Error): State {
    return { error, info: "" }
  }

  componentDidCatch(error: Error, info: { componentStack?: string | null }) {
    this.setState({ error, info: info.componentStack ?? "" })
    captureError(error, { boundary: "root", componentStack: info.componentStack ?? "" })
  }

  render() {
    const { error, info } = this.state
    if (!error) return this.props.children

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          background: "var(--sch-bg)",
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "100%",
            maxWidth: 460,
            textAlign: "center",
            background: "var(--sch-card)",
            border: `1px solid ${C.border}`,
            borderRadius: 20,
            boxShadow: SHADOW.md,
            padding: "36px 28px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
            <IconBadge name="mission" tone="brand" size={52} />
          </div>

          <h1 style={{ fontSize: 20, fontWeight: 800, color: C.text, margin: "0 0 8px" }}>
            Something went wrong
          </h1>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: C.soft,
              margin: "0 auto 24px",
              maxWidth: 340,
            }}
          >
            Scholify hit an unexpected error and couldn't finish loading. Your progress is
            saved — reloading usually clears it.
          </p>

          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.reload()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: "100%",
              padding: "13px 24px",
              borderRadius: 12,
              border: "none",
              background: "#C80000",
              color: "#fff",
              fontSize: 14.5,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: SHADOW.brand,
            }}
          >
            <Icon name="loop" size={16} color="#fff" />
            Reload
          </motion.button>

          <a
            href="/support"
            style={{
              display: "inline-block",
              marginTop: 14,
              fontSize: 13,
              fontWeight: 600,
              color: C.soft,
              textDecoration: "none",
            }}
          >
            Still stuck? Contact support
          </a>

          {import.meta.env.DEV && (
            <details style={{ marginTop: 22, textAlign: "left" }}>
              <summary style={{ fontSize: 12, fontWeight: 700, color: C.faint, cursor: "pointer" }}>
                Developer details
              </summary>
              <pre
                style={{
                  marginTop: 10,
                  padding: 12,
                  maxHeight: 260,
                  overflow: "auto",
                  borderRadius: 10,
                  background: "var(--sch-card-2)",
                  border: `1px solid ${C.hairline}`,
                  color: C.muted,
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 11,
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                }}
              >
                {error.name}: {error.message}
                {"\n\n"}
                {error.stack}
                {info ? `\n\nComponent stack:${info}` : ""}
              </pre>
            </details>
          )}
        </motion.div>
      </div>
    )
  }
}
