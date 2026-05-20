import { useEffect } from "react"

/*
 * Lara voice widget — landing page only.
 *
 * The ElevenLabs ConvAI embed renders a floating widget at <body> level.
 * Mounting it here (instead of in index.html) keeps it scoped to the
 * Landing route: it appears when Landing mounts and is removed on unmount,
 * so it never shows inside the web app. The app gets its own Lara agent.
 */

const AGENT_ID = "agent_1301krym07svfe3sbh7pt7y2428r"
const SCRIPT_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed"

export default function LaraLandingWidget() {
  useEffect(() => {
    // Floating widget element — appended to body, removed on unmount.
    const widget = document.createElement("elevenlabs-convai")
    widget.setAttribute("agent-id", AGENT_ID)
    document.body.appendChild(widget)

    // Embed script defines the <elevenlabs-convai> custom element.
    // Load it once; it stays cached for later visits to Landing.
    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const script = document.createElement("script")
      script.src = SCRIPT_SRC
      script.async = true
      script.type = "text/javascript"
      document.body.appendChild(script)
    }

    return () => {
      widget.remove()
    }
  }, [])

  return null
}
