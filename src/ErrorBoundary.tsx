import { Component, type ReactNode } from "react"

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
    console.error("ErrorBoundary caught:", error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: "ui-monospace, monospace", whiteSpace: "pre-wrap", background: "#fff", color: "#000" }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#b91c1c" }}>Runtime error</h1>
          <p style={{ marginTop: 8 }}><b>{this.state.error.name}:</b> {this.state.error.message}</p>
          <details open style={{ marginTop: 12 }}>
            <summary>Component stack</summary>
            <pre style={{ fontSize: 12 }}>{this.state.info}</pre>
          </details>
          <details open style={{ marginTop: 12 }}>
            <summary>JS stack</summary>
            <pre style={{ fontSize: 12 }}>{this.state.error.stack}</pre>
          </details>
        </div>
      )
    }
    return this.props.children
  }
}
