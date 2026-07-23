import { useState, type CSSProperties } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { ScholifyLockup } from "@/components/brand"
import CharlesMascot from "@/components/CharlesMascot"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import { applyToAffiliate, type AffiliateApplication } from "@/lib/affiliate"

/* ──────────────────────────────────────────────────────────────
 *  /partners/apply — become a Scholify partner (affiliate).
 *  Earn 35% on every student you refer. Applications are reviewed
 *  before activation; commissions clear 30 days after purchase.
 * ────────────────────────────────────────────────────────────── */

const HOW: Array<{ n: string; t: string; d: string }> = [
  { n: "35%", t: "On every sale", d: "You earn 35% of what each student you refer pays — first payment and renewals." },
  { n: "30d", t: "Clears in 30 days", d: "Commissions become payable 30 days after the purchase, once the refund window closes." },
  { n: "∞", t: "Your own link", d: "Get a unique link and code. Share it anywhere — we track every click and sale for you." },
]

const field: CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid var(--sch-border)",
  background: "var(--sch-card)",
  color: "var(--sch-text)",
  fontSize: 15,
  outline: "none",
}
const labelStyle: CSSProperties = { fontSize: 13, fontWeight: 600, color: "var(--sch-tx-1)", marginBottom: 6, display: "block" }

export default function PartnersApply() {
  const reduced = useReducedMotion()
  const [form, setForm] = useState<AffiliateApplication>({ name: "", email: "" })
  const [agree, setAgree] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<{ code: string; status: string } | null>(null)

  const set = (k: keyof AffiliateApplication) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter your name and a valid email.")
      return
    }
    if (!agree) {
      setError("Please accept the partner terms to continue.")
      return
    }
    setBusy(true)
    const res = await applyToAffiliate(form)
    setBusy(false)
    if (res.ok && res.code) setDone({ code: res.code, status: res.status || "pending" })
    else setError(res.reason === "not_configured" ? "Applications open soon — check back shortly." : "Couldn't submit — please try again.")
  }

  return (
    <div style={{ minHeight: "100dvh", background: "var(--sch-bg)" }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", maxWidth: 960, margin: "0 auto" }}>
        <Link to="/" style={{ textDecoration: "none", display: "inline-flex" }} aria-label="Scholify">
          <ScholifyLockup size={24} color="var(--sch-text)" />
        </Link>
        <Link to="/partners" style={{ fontSize: 14, color: "var(--sch-tx-1)", textDecoration: "none" }}>
          Partner dashboard →
        </Link>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 96px" }}>
        {/* Hero */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", paddingTop: 48 }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
            <CharlesMascot pose="present" size={130} />
          </div>
          <span
            style={{
              display: "inline-block",
              fontSize: 12,
              letterSpacing: "0.1em",
              padding: "5px 14px",
              borderRadius: 999,
              border: "1px solid rgba(200,0,0,0.3)",
              background: "rgba(200,0,0,0.06)",
              color: "rgba(200,0,0,0.9)",
              marginBottom: 18,
            }}
          >
            SCHOLIFY PARTNERS
          </span>
          <h1 style={{ fontSize: "clamp(28px,6vw,40px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--sch-text)", margin: "0 0 14px" }}>
            Earn <span style={iriText}>35%</span> for every student
            <br /> you bring to Scholify
          </h1>
          <p style={{ fontSize: 16, color: "var(--sch-tx-2)", lineHeight: 1.6, maxWidth: 520, margin: "0 auto" }}>
            Share Scholify with your class, your society or your following. Get a unique link, track every sale, and get paid.
          </p>
        </motion.div>

        {/* How it works */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginTop: 40 }}>
          {HOW.map((h, i) => (
            <motion.div
              key={h.t}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: "var(--sch-card)", border: "1px solid var(--sch-border)", borderRadius: 16, padding: 20 }}
            >
              <div style={{ fontSize: 28, fontWeight: 800, ...iriText, marginBottom: 6 }}>{h.n}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--sch-text)", marginBottom: 4 }}>{h.t}</div>
              <div style={{ fontSize: 13, color: "var(--sch-tx-2)", lineHeight: 1.55 }}>{h.d}</div>
            </motion.div>
          ))}
        </div>

        {/* Form / success */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: 40, background: "var(--sch-card)", border: "1px solid var(--sch-border)", borderRadius: 20, padding: "clamp(20px,4vw,32px)" }}
        >
          {done ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                <CharlesMascot pose="success" size={120} />
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--sch-text)", margin: "0 0 8px" }}>Application received</h2>
              <p style={{ fontSize: 15, color: "var(--sch-tx-2)", lineHeight: 1.6, maxWidth: 440, margin: "0 auto 18px" }}>
                We'll review it and email you when your partner account is live. Your code will be:
              </p>
              <div
                style={{
                  display: "inline-block",
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  padding: "10px 22px",
                  borderRadius: 12,
                  color: "#fff",
                  background: IRIDESCENT,
                }}
              >
                {done.code}
              </div>
              <div style={{ marginTop: 22 }}>
                <Link to="/partners" style={{ fontSize: 14, fontWeight: 600, color: "var(--sch-tx-1)", textDecoration: "none" }}>
                  Go to your partner dashboard →
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--sch-text)", margin: "0 0 18px" }}>Apply to become a partner</h2>
              <div style={{ display: "grid", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Full name *</label>
                    <input style={field} value={form.name} onChange={set("name")} placeholder="Jane Doe" autoComplete="name" />
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input style={field} value={form.email} onChange={set("email")} placeholder="you@email.com" type="email" autoComplete="email" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>University</label>
                    <input style={field} value={form.university ?? ""} onChange={set("university")} placeholder="LSE" />
                  </div>
                  <div>
                    <label style={labelStyle}>Country</label>
                    <input style={field} value={form.country ?? ""} onChange={set("country")} placeholder="United Kingdom" autoComplete="country-name" />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Where will you share? (Instagram, Telegram, class, etc.)</label>
                  <input style={field} value={form.socials ?? ""} onChange={set("socials")} placeholder="@yourhandle / channel link" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Audience size</label>
                    <input style={field} value={form.audienceSize ?? ""} onChange={set("audienceSize")} placeholder="e.g. 3,000" />
                  </div>
                  <div>
                    <label style={labelStyle}>Preferred code</label>
                    <input style={field} value={form.code ?? ""} onChange={set("code")} placeholder="JANE (A–Z, 0–9)" />
                  </div>
                </div>

                <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13.5, color: "var(--sch-tx-2)", lineHeight: 1.5, cursor: "pointer" }}>
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ marginTop: 3, width: 18, height: 18, accentColor: "#C80000", flexShrink: 0 }} />
                  <span>
                    I agree to the Scholify partner terms: I'll promote honestly, won't bid on Scholify's brand terms or spam, and understand commissions (35%) clear 30 days after purchase and are void on refunds/chargebacks.
                  </span>
                </label>

                {error && (
                  <div role="alert" style={{ fontSize: 13.5, color: "#C80000", background: "rgba(200,0,0,0.06)", border: "1px solid rgba(200,0,0,0.2)", borderRadius: 10, padding: "10px 12px" }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  style={{
                    width: "100%",
                    padding: "14px 20px",
                    borderRadius: 14,
                    border: "none",
                    background: IRIDESCENT,
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: busy ? "default" : "pointer",
                    opacity: busy ? 0.7 : 1,
                  }}
                >
                  {busy ? "Submitting…" : "Apply now"}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
