import { Component, type ReactNode } from "react"

/*
 * Per-page error boundary with a polished, user-facing fallback.
 *
 * App.tsx routes every page through this (via the <Page> wrapper), so a crash
 * in one section never takes down the whole app — the user sees a calm
 * "something went wrong" with a reload button instead of a blank screen.
 */

interface Props {
  children: ReactNode
  fallback?: ReactNode
  pageName?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack?: string | null }) {
    console.error(`[${this.props.pageName ?? "app"}] Error:`, error, info)
    // In production this is where an error-tracking call would go.
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "300px",
            padding: "40px 20px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "16px" }}>⚡</div>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--sch-text)",
              marginBottom: "8px",
            }}
          >
            Something went wrong
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "var(--sch-tx-2)",
              marginBottom: "24px",
              maxWidth: 320,
              lineHeight: 1.6,
            }}
          >
            {this.props.pageName
              ? `The ${this.props.pageName} section had an issue.`
              : "This section had an unexpected issue."}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              background: "linear-gradient(135deg, rgba(200,0,0,0.8), rgba(99,102,241,0.8))",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 0 24px rgba(200,0,0,0.25)",
            }}
          >
            Reload page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
