import { useState, type CSSProperties, type FormEvent } from "react"
import { Heart, Send, Sparkles } from "lucide-react"
import { submitFeedback, type FeedbackCategory } from "@/lib/feedback"

const categories: Array<[FeedbackCategory, string]> = [
  ["idea", "Idea"],
  ["bug", "Something broke"],
  ["content", "Study content"],
  ["general", "General"],
  ["love", "I love it"],
]

export default function FeedbackForm({
  source,
  defaultName = "",
  defaultEmail = "",
  compact = false,
  onSuccess,
}: {
  source: "landing" | "app" | "support"
  defaultName?: string
  defaultEmail?: string
  compact?: boolean
  onSuccess?: () => void
}) {
  const [name, setName] = useState(defaultName)
  const [email, setEmail] = useState(defaultEmail)
  const [category, setCategory] = useState<FeedbackCategory>("idea")
  const [rating, setRating] = useState(5)
  const [message, setMessage] = useState("")
  const [website, setWebsite] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError("")
    if (!/^\S+@\S+\.\S+$/.test(email) || message.trim().length < 10) {
      setError("Add a valid email and at least a few words of feedback.")
      return
    }
    setBusy(true)
    const result = await submitFeedback({
      name,
      email,
      category,
      rating,
      message,
      source,
      pageUrl: window.location.href,
      website,
    })
    setBusy(false)
    if (!result.ok) {
      setError(result.reason === "rate_limited" ? "Thanks — we already received several messages from you. Please try again later." : "We couldn't send that yet. Please try again.")
      return
    }
    setDone(true)
    setMessage("")
    onSuccess?.()
  }

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: compact ? "28px 18px" : "38px 24px" }}>
        <div style={{ width: 54, height: 54, margin: "0 auto", borderRadius: 18, display: "grid", placeItems: "center", background: "rgba(200,0,0,.08)", color: "#C80000" }}><Heart size={25} fill="currentColor" /></div>
        <h3 style={{ margin: "16px 0 7px", fontSize: 22, letterSpacing: "-.03em" }}>Scholify loves you.</h3>
        <p style={{ margin: 0, color: "var(--sch-tx-2, #6B6B76)", fontSize: 14, lineHeight: 1.6 }}>Thanks for your feedback. It’s in our product inbox, and we sent a confirmation to your email.</p>
        <button type="button" onClick={() => setDone(false)} style={{ marginTop: 18, border: 0, background: "transparent", color: "#C80000", fontWeight: 800, cursor: "pointer" }}>Send another</button>
      </div>
    )
  }

  const field: CSSProperties = { width: "100%", boxSizing: "border-box", border: "1px solid var(--sch-border, rgba(20,20,26,.12))", borderRadius: 12, background: "var(--sch-card, #fff)", color: "var(--sch-text, #14141A)", fontSize: 14, outline: "none" }
  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 13 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {categories.map(([value, label]) => <button key={value} type="button" onClick={() => setCategory(value)} style={{ border: `1px solid ${category === value ? "#C80000" : "var(--sch-border, rgba(20,20,26,.12))"}`, background: category === value ? "rgba(200,0,0,.07)" : "var(--sch-card, #fff)", color: category === value ? "#C80000" : "var(--sch-tx-1, #454550)", borderRadius: 999, padding: "8px 11px", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>{label}</button>)}
      </div>
      <div>
        <div style={{ fontSize: 11, color: "var(--sch-tx-2, #6B6B76)", marginBottom: 6 }}>How does Scholify feel?</div>
        <div style={{ display: "flex", gap: 5 }}>{[1, 2, 3, 4, 5].map((star) => <button aria-label={`${star} stars`} key={star} type="button" onClick={() => setRating(star)} style={{ border: 0, padding: 1, background: "transparent", color: star <= rating ? "#F4A405" : "#D8D5D1", fontSize: 23, cursor: "pointer" }}>★</button>)}</div>
      </div>
      <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="What should we improve, build, or keep exactly as it is?" rows={compact ? 4 : 5} maxLength={4000} style={{ ...field, padding: 13, resize: "vertical", lineHeight: 1.5 }} />
      <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "repeat(2,minmax(0,1fr))", gap: 10 }}>
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name (optional)" maxLength={120} style={{ ...field, minHeight: 44, padding: "0 12px" }} />
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" maxLength={200} required style={{ ...field, minHeight: 44, padding: "0 12px" }} />
      </div>
      <input value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden style={{ position: "absolute", left: -10000, width: 1, height: 1 }} />
      {error && <div role="alert" style={{ color: "#C80000", fontSize: 12, lineHeight: 1.4 }}>{error}</div>}
      <button disabled={busy} type="submit" style={{ minHeight: 47, border: 0, borderRadius: 12, background: "linear-gradient(135deg,#C80000,#E50068)", color: "#fff", fontWeight: 850, cursor: busy ? "wait" : "pointer", opacity: busy ? .65 : 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        {busy ? <Sparkles size={17} /> : <Send size={17} />} {busy ? "Sending…" : "Send feedback"}
      </button>
      <div style={{ color: "var(--sch-tx-2, #6B6B76)", fontSize: 10.5, lineHeight: 1.5 }}>Your message goes directly to Scholify’s founder and product inbox. We use feedback to guide improvements; changes are always reviewed before release.</div>
    </form>
  )
}
