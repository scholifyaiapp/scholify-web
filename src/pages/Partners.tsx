import { useEffect, useState, type CSSProperties } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { ScholifyLockup } from "@/components/brand"
import CharlesMascot from "@/components/CharlesMascot"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import { fetchAffiliateDashboard, formatMoney, type AffiliateDashboard } from "@/lib/affiliate"

/* ──────────────────────────────────────────────────────────────
 *  /partners — the partner (affiliate) dashboard. Shows the
 *  partner's link, code, clicks, sales and commission balance.
 *  Reads the partner's own rows via Supabase RLS.
 * ────────────────────────────────────────────────────────────── */

const SITE = "https://scholifyapp.com"

const card: CSSProperties = { background: "var(--sch-card)", border: "1px solid var(--sch-border)", borderRadius: 18, padding: 22 }

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ ...card, padding: 18 }}>
      <div style={{ fontSize: 12, letterSpacing: "0.04em", color: "var(--sch-tx-2)", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: "var(--sch-text)" }}>{value}</div>
    </div>
  )
}

export default function Partners() {
  const reduced = useReducedMotion()
  const [data, setData] = useState<AffiliateDashboard | null>(null)
  const [copied, setCopied] = useState<"link" | "code" | null>(null)

  useEffect(() => {
    let alive = true
    void fetchAffiliateDashboard().then((d) => alive && setData(d))
    return () => {
      alive = false
    }
  }, [])

  const aff = data?.affiliate ?? null
  const link = aff ? `${SITE}/?aff=${aff.code}` : ""

  const copy = (text: string, which: "link" | "code") => {
    void navigator.clipboard?.writeText(text).then(() => {
      setCopied(which)
      setTimeout(() => setCopied(null), 1600)
    })
  }

  return (
    <div style={{ minHeight: "100dvh", background: "var(--sch-bg)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", maxWidth: 960, margin: "0 auto" }}>
        <Link to="/" style={{ textDecoration: "none", display: "inline-flex" }} aria-label="Scholify">
          <ScholifyLockup size={24} color="var(--sch-text)" />
        </Link>
        <Link to="/study" style={{ fontSize: 14, color: "var(--sch-tx-1)", textDecoration: "none" }}>
          Go to app →
        </Link>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 96px" }}>
        <h1 style={{ fontSize: "clamp(24px,5vw,32px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--sch-text)", margin: "24px 0 20px" }}>
          Partner dashboard
        </h1>

        {/* Loading */}
        {!data && (
          <div style={{ ...card, textAlign: "center", padding: 48, color: "var(--sch-tx-2)" }}>Loading…</div>
        )}

        {/* Not a partner yet / pending */}
        {data && !aff && (
          <div style={{ ...card, textAlign: "center", padding: "40px 24px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <CharlesMascot pose="idea" size={120} />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--sch-text)", margin: "0 0 8px" }}>You're not a partner yet</h2>
            <p style={{ fontSize: 15, color: "var(--sch-tx-2)", lineHeight: 1.6, maxWidth: 420, margin: "0 auto 20px" }}>
              Apply to the Scholify partner program and earn 35% on every student you refer. If you've already applied, your account activates once we review it.
            </p>
            <Link
              to="/partners/apply"
              style={{ display: "inline-block", padding: "12px 24px", borderRadius: 12, background: IRIDESCENT, color: "#fff", fontSize: 15, fontWeight: 700, textDecoration: "none" }}
            >
              Apply now
            </Link>
          </div>
        )}

        {/* Active / pending partner */}
        {aff && data && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "grid", gap: 16 }}
          >
            {aff.status !== "active" && (
              <div style={{ fontSize: 14, color: "rgba(200,0,0,0.9)", background: "rgba(200,0,0,0.06)", border: "1px solid rgba(200,0,0,0.2)", borderRadius: 12, padding: "12px 16px" }}>
                Your partner account is <strong>{aff.status}</strong> — your link starts earning once we activate it.
              </div>
            )}

            {/* Link + code */}
            <div style={card}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sch-tx-1)", marginBottom: 10 }}>Your referral link</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                <code style={{ flex: "1 1 260px", fontFamily: "ui-monospace, monospace", fontSize: 14, color: "var(--sch-text)", background: "var(--sch-bg)", border: "1px solid var(--sch-border)", borderRadius: 10, padding: "10px 12px", overflowX: "auto", whiteSpace: "nowrap" }}>
                  {link}
                </code>
                <button
                  type="button"
                  onClick={() => copy(link, "link")}
                  style={{ padding: "10px 16px", borderRadius: 10, border: "none", background: IRIDESCENT, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  {copied === "link" ? "Copied ✓" : "Copy link"}
                </button>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
                <span style={{ fontSize: 13, color: "var(--sch-tx-2)" }}>Code:</span>
                <button
                  type="button"
                  onClick={() => copy(aff.code, "code")}
                  style={{ fontFamily: "ui-monospace, monospace", fontSize: 14, fontWeight: 800, letterSpacing: "0.06em", ...iriText, background: "none", border: "1px dashed var(--sch-border)", borderRadius: 8, padding: "4px 10px", cursor: "pointer" }}
                >
                  {aff.code}
                </button>
                {copied === "code" && <span style={{ fontSize: 12, color: "var(--sch-tx-2)" }}>Copied ✓</span>}
                <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--sch-tx-2)" }}>{(aff.commission_rate * 100).toFixed(0)}% commission</span>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
              <Stat label="Clicks" value={String(aff.clicks ?? 0)} />
              <Stat label="Sales" value={formatMoney(data.totals.sales)} />
              <Stat label="Pending" value={formatMoney(data.totals.pending)} />
              <Stat label="Approved" value={formatMoney(data.totals.approved + data.totals.paid)} />
            </div>

            {/* Commission history */}
            <div style={card}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--sch-text)", marginBottom: 14 }}>Commissions</div>
              {data.commissions.length === 0 ? (
                <p style={{ fontSize: 14, color: "var(--sch-tx-2)", margin: 0 }}>No commissions yet — share your link to get started.</p>
              ) : (
                <div style={{ display: "grid", gap: 8 }}>
                  {data.commissions.map((c) => (
                    <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "10px 12px", borderRadius: 10, background: "var(--sch-bg)", border: "1px solid var(--sch-border)" }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--sch-text)" }}>{formatMoney(c.commission_amount, c.currency)}</div>
                        <div style={{ fontSize: 12, color: "var(--sch-tx-2)" }}>on {formatMoney(c.sale_amount, c.currency)} sale</div>
                      </div>
                      <StatusPill status={c.status} availableAfter={c.available_after} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p style={{ fontSize: 12.5, color: "var(--sch-tx-2)", lineHeight: 1.6, textAlign: "center", margin: 0 }}>
              Payouts are sent once your approved balance clears. Commissions become payable 30 days after purchase and are void on refunds or chargebacks.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function StatusPill({ status, availableAfter }: { status: string; availableAfter: string }) {
  const clears = new Date(availableAfter)
  const pendingClearing = status === "pending" && clears.getTime() > Date.now()
  const map: Record<string, { bg: string; fg: string; label: string }> = {
    pending: { bg: "rgba(244,164,5,0.12)", fg: "#B7791F", label: pendingClearing ? `Clears ${clears.toLocaleDateString()}` : "Pending" },
    approved: { bg: "rgba(200,0,0,0.08)", fg: "#C80000", label: "Approved" },
    paid: { bg: "rgba(34,160,90,0.12)", fg: "#1E9E5A", label: "Paid" },
    canceled: { bg: "var(--sch-bg)", fg: "var(--sch-tx-2)", label: "Void" },
  }
  const s = map[status] ?? map.pending
  return (
    <span style={{ fontSize: 12, fontWeight: 700, padding: "5px 10px", borderRadius: 999, background: s.bg, color: s.fg, whiteSpace: "nowrap" }}>
      {s.label}
    </span>
  )
}
