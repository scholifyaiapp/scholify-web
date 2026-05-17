import { Component, type ReactNode } from "react"

interface Props {
  name: string
  children: ReactNode
}

interface State {
  error: Error | null
}

export default class SectionBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error) {
    console.error(`[${this.props.name}] crashed:`, error)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ margin: 24, padding: 16, border: "2px solid #dc2626", borderRadius: 8, background: "#fee2e2", color: "#000", fontFamily: "ui-monospace, monospace" }}>
          <h2 style={{ fontWeight: 700 }}>❌ Section "{this.props.name}" crashed</h2>
          <p style={{ marginTop: 8, fontSize: 14 }}><b>{this.state.error.name}:</b> {this.state.error.message}</p>
          <details style={{ marginTop: 8 }}>
            <summary>Stack</summary>
            <pre style={{ fontSize: 11, whiteSpace: "pre-wrap" }}>{this.state.error.stack}</pre>
          </details>
        </div>
      )
    }
    return this.props.children
  }
}
