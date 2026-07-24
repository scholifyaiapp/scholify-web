import { useEffect, useMemo, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { Activity, ArrowLeft, BarChart3, CheckCircle2, Clock3, RefreshCw, Users, UserRoundCheck } from "lucide-react"
import { ScholifyLockup } from "@/components/brand"
import CharlesMascot from "@/components/CharlesMascot"
import { useAuth } from "@/lib/auth"
import { isLaunchAdmin } from "@/lib/launch"
import { supabase } from "@/lib/supabase"
import { setAffiliateStatus } from "@/lib/affiliate"

type Data = {
  generatedAt: string
  summary: { users: number; active7d: number; waitlist: number; partners: number; activePartners: number; partnerClicks: number; partnerSales: number; revenue: number }
  users: Array<{ id: string; email?: string; name: string; createdAt: string; lastSignInAt?: string; provider: string; plan: string; firstTaskAt?: string; day3: boolean; day7: boolean; converted: boolean }>
  waitlist: Array<{ id: string; email: string; name: string; source?: string; created_at: string }>
  partners: Array<{ id: string; name: string; email: string; code: string; status: string; clicks: number; sales: number; revenue: number; commission: number; approvedCommission: number; created_at: string }>
  posthog: { connected: boolean; events: unknown[][]; funnel: unknown[]; error?: string }
}

const C = { ink: "#14141A", muted: "#6B6B76", red: "#C80000", gold: "#F4A405", paper: "#FAFAF7" }
const card = { background: "rgba(255,255,255,.9)", border: "1px solid rgba(20,20,26,.08)", borderRadius: 18, boxShadow: "0 14px 40px rgba(20,20,26,.055)" }
const money = (cents: number) => new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(cents / 100)
const date = (value?: string) => value ? new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "Never"

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth()
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [reviewing, setReviewing] = useState("")
  const [tab, setTab] = useState<"overview" | "users" | "waitlist" | "partners" | "journeys">("overview")

  const load = async () => {
    setLoading(true)
    setError("")
    const { data: sessionData } = await supabase.auth.getSession()
    try {
      const response = await fetch("/api/admin-analytics", { headers: { Authorization: `Bearer ${sessionData.session?.access_token || ""}` } })
      if (!response.ok) throw new Error(response.status === 403 ? "Founder access is required." : "Analytics could not be loaded.")
      setData((await response.json()) as Data)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Analytics could not be loaded.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading && isLaunchAdmin(user)) void load()
  }, [authLoading, user])

  const funnel = useMemo(() => {
    const labels = ["Signed up", "Onboarded", "Diagnostic", "Study session", "Upgrade intent", "Subscribed"]
    return labels.map((label, index) => ({ label, value: Number(data?.posthog.funnel[index] || 0) }))
  }, [data])

  const reviewPartner = async (id: string, status: "active" | "rejected" | "pending") => {
    setReviewing(id)
    const ok = await setAffiliateStatus(id, status)
    if (ok) setData((current) => current ? { ...current, partners: current.partners.map((partner) => partner.id === id ? { ...partner, status } : partner) } : current)
    else setError("The partner status could not be updated. Please try again.")
    setReviewing("")
  }

  if (authLoading) return null
  if (!isLaunchAdmin(user)) return <Navigate to="/" replace />

  return (
    <main style={{ minHeight: "100dvh", background: C.paper, color: C.ink }}>
      <header style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(250,250,247,.88)", backdropFilter: "blur(18px)", borderBottom: "1px solid rgba(20,20,26,.07)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "16px clamp(18px,4vw,36px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <ScholifyLockup size={28} color={C.ink} weight={850} />
          <div style={{ display: "flex", gap: 9 }}>
            <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 13px", borderRadius: 10, color: C.ink, textDecoration: "none", fontSize: 12, fontWeight: 800, border: "1px solid rgba(20,20,26,.1)", background: "#fff" }}><ArrowLeft size={14} /> Landing page</Link>
            <button onClick={() => void load()} disabled={loading} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 13px", borderRadius: 10, border: 0, background: C.ink, color: "#fff", fontSize: 12, fontWeight: 800, cursor: "pointer" }}><RefreshCw size={14} /> Refresh</button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "34px clamp(18px,4vw,36px) 80px" }}>
        <section style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, marginBottom: 26 }}>
          <div><div style={{ color: C.red, fontSize: 10, fontWeight: 900, letterSpacing: ".15em", textTransform: "uppercase" }}>Founder command centre · private</div><h1 style={{ fontSize: "clamp(30px,5vw,48px)", margin: "9px 0 7px", letterSpacing: "-.045em" }}>Scholify traction.</h1><p style={{ color: C.muted, margin: 0, fontSize: 14 }}>Waitlist, users, partner performance and product journeys in one secure view.</p></div>
          <div className="admin-charles"><CharlesMascot pose="chart" size={112} /></div>
        </section>

        <nav style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 3, marginBottom: 22 }}>
          {(["overview", "users", "waitlist", "partners", "journeys"] as const).map((item) => <button key={item} onClick={() => setTab(item)} style={{ border: 0, borderRadius: 999, padding: "9px 15px", cursor: "pointer", whiteSpace: "nowrap", textTransform: "capitalize", fontWeight: 800, fontSize: 12, background: tab === item ? C.ink : "#fff", color: tab === item ? "#fff" : C.muted, boxShadow: "0 0 0 1px rgba(20,20,26,.08)" }}>{item}</button>)}
        </nav>

        {loading && <div style={{ ...card, padding: 50, textAlign: "center", color: C.muted }}>Loading founder analytics…</div>}
        {error && <div style={{ ...card, padding: 24, color: C.red }}>{error}</div>}
        {data && !loading && <>
          {tab === "overview" && <Overview data={data} />}
          {tab === "users" && <Table title="Registered users" columns={["User", "Plan", "Joined", "Last sign-in", "Journey"]} rows={data.users.map((u) => [<span><b>{u.name || "Unnamed"}</b><small>{u.email}</small></span>, u.plan, date(u.createdAt), date(u.lastSignInAt), <Journey user={u} />])} />}
          {tab === "waitlist" && <Table title={`Launch waitlist · ${data.waitlist.length}`} columns={["Contact", "Source", "Joined"]} rows={data.waitlist.map((w) => [<span><b>{w.name}</b><small>{w.email}</small></span>, w.source || "website", date(w.created_at)])} />}
          {tab === "partners" && <PartnerTable partners={data.partners} reviewing={reviewing} onReview={reviewPartner} />}
          {tab === "journeys" && <Journeys data={data} funnel={funnel} />}
        </>}
      </div>
      <style>{`small{display:block;color:#777780;font-size:11px;margin-top:3px}.admin-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}@media(max-width:850px){.admin-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.admin-charles{display:none}}@media(max-width:520px){.admin-grid{grid-template-columns:1fr}}`}</style>
    </main>
  )
}

function PartnerTable({ partners, reviewing, onReview }: { partners: Data["partners"]; reviewing: string; onReview: (id: string, status: "active" | "rejected" | "pending") => Promise<void> }) {
  return <section style={{ ...card, overflow: "hidden" }}><div style={{ padding: "18px 20px", fontWeight: 850, borderBottom: "1px solid rgba(20,20,26,.07)" }}>Partner applications and traction · {partners.length}</div><div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}><thead><tr>{["Partner", "Status", "Clicks", "Sales", "Revenue", "Commission", "Decision"].map((column) => <th key={column} style={{ padding: "11px 16px", textAlign: "left", color: C.muted, background: "rgba(20,20,26,.025)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em" }}>{column}</th>)}</tr></thead><tbody>{partners.length ? partners.map((partner) => <tr key={partner.id}><td style={{ padding: "13px 16px", borderTop: "1px solid rgba(20,20,26,.055)", fontSize: 12 }}><b>{partner.name} · {partner.code}</b><small>{partner.email}</small></td><td style={{ padding: "13px 16px", borderTop: "1px solid rgba(20,20,26,.055)" }}><Pill value={partner.status} /></td>{[partner.clicks, partner.sales, money(partner.revenue), money(partner.commission)].map((value, index) => <td key={index} style={{ padding: "13px 16px", borderTop: "1px solid rgba(20,20,26,.055)", fontSize: 12 }}>{value}</td>)}<td style={{ padding: "10px 16px", borderTop: "1px solid rgba(20,20,26,.055)", whiteSpace: "nowrap" }}><div style={{ display: "flex", gap: 6 }}>{partner.status !== "active" && <Action label="Approve" disabled={reviewing === partner.id} onClick={() => void onReview(partner.id, "active")} primary />}{partner.status !== "rejected" && <Action label="Reject" disabled={reviewing === partner.id} onClick={() => void onReview(partner.id, "rejected")} />}{partner.status !== "pending" && <Action label="Pending" disabled={reviewing === partner.id} onClick={() => void onReview(partner.id, "pending")} />}</div></td></tr>) : <tr><td colSpan={7} style={{ padding: 30, color: C.muted, textAlign: "center" }}>No partner applications yet.</td></tr>}</tbody></table></div></section>
}

function Action({ label, disabled, onClick, primary = false }: { label: string; disabled: boolean; onClick: () => void; primary?: boolean }) {
  return <button type="button" disabled={disabled} onClick={onClick} style={{ border: primary ? 0 : "1px solid rgba(20,20,26,.12)", borderRadius: 8, padding: "7px 10px", background: primary ? C.ink : "#fff", color: primary ? "#fff" : C.ink, fontSize: 10, fontWeight: 850, cursor: disabled ? "wait" : "pointer", opacity: disabled ? .55 : 1 }}>{label}</button>
}

function Overview({ data }: { data: Data }) {
  const stats = [[Users, "Registered users", data.summary.users], [Activity, "Active · 7 days", data.summary.active7d], [Clock3, "Launch waitlist", data.summary.waitlist], [UserRoundCheck, "Active partners", data.summary.activePartners], [BarChart3, "Partner clicks", data.summary.partnerClicks], [CheckCircle2, "Partner sales", data.summary.partnerSales], [BarChart3, "Attributed revenue", money(data.summary.revenue)], [Activity, "PostHog", data.posthog.connected ? "Connected" : "Needs API key"]]
  return <><div className="admin-grid">{stats.map(([Icon, label, value]) => { const I = Icon as typeof Users; return <div key={String(label)} style={{ ...card, padding: 18 }}><I size={18} color={C.red} /><div style={{ fontSize: 25, fontWeight: 900, marginTop: 15 }}>{String(value)}</div><div style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>{String(label)}</div></div> })}</div><div style={{ ...card, padding: 20, marginTop: 16 }}><b>Data status</b><p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6, marginBottom: 0 }}>Supabase account, waitlist and partner records are live. {data.posthog.connected ? "PostHog’s private query API is connected and reporting the last 30 days." : "Add POSTHOG_PERSONAL_API_KEY and POSTHOG_PROJECT_ID in Vercel to display live event funnels and journeys here."}</p></div></>
}

function Journeys({ data, funnel }: { data: Data; funnel: Array<{ label: string; value: number }> }) {
  const max = Math.max(...funnel.map((x) => x.value), 1)
  return <div style={{ display: "grid", gap: 16 }}><div style={{ ...card, padding: 22 }}><div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><b>30-day product journey</b><Pill value={data.posthog.connected ? "connected" : "not connected"} /></div><div style={{ display: "grid", gap: 11, marginTop: 20 }}>{funnel.map((step) => <div key={step.label}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}><span>{step.label}</span><b>{step.value}</b></div><div style={{ height: 9, borderRadius: 99, background: "rgba(20,20,26,.06)", overflow: "hidden" }}><div style={{ width: `${(step.value / max) * 100}%`, height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#C80000,#E50068,#F4A405)" }} /></div></div>)}</div></div><Table title="Top PostHog events · 30 days" columns={["Event", "Events", "People"]} rows={data.posthog.events.map((row) => [String(row[0]), Number(row[1]), Number(row[2])])} /></div>
}

function Journey({ user }: { user: Data["users"][number] }) {
  const stages = [Boolean(user.createdAt), Boolean(user.firstTaskAt), user.day3, user.day7, user.converted]
  return <span style={{ display: "inline-flex", gap: 3 }}>{stages.map((done, i) => <i key={i} title={["Joined", "First task", "Day 3", "Day 7", "Paid"][i]} style={{ width: 8, height: 8, borderRadius: 99, background: done ? C.red : "rgba(20,20,26,.12)" }} />)}</span>
}

function Pill({ value }: { value: string }) {
  const good = value === "active" || value === "connected"
  return <span style={{ display: "inline-block", borderRadius: 999, padding: "5px 9px", background: good ? "rgba(30,158,90,.1)" : "rgba(244,164,5,.12)", color: good ? "#147A43" : "#9A6500", fontSize: 10, fontWeight: 900, textTransform: "uppercase", whiteSpace: "nowrap" }}>{value}</span>
}

function Table({ title, columns, rows }: { title: string; columns: string[]; rows: Array<Array<React.ReactNode>> }) {
  return <section style={{ ...card, overflow: "hidden" }}><div style={{ padding: "18px 20px", fontWeight: 850, borderBottom: "1px solid rgba(20,20,26,.07)" }}>{title}</div><div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}><thead><tr>{columns.map((c) => <th key={c} style={{ padding: "11px 16px", textAlign: "left", color: C.muted, background: "rgba(20,20,26,.025)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em" }}>{c}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} style={{ padding: "13px 16px", borderTop: "1px solid rgba(20,20,26,.055)", fontSize: 12, whiteSpace: j ? "nowrap" : "normal" }}>{cell}</td>)}</tr>) : <tr><td colSpan={columns.length} style={{ padding: 30, color: C.muted, textAlign: "center" }}>No data yet.</td></tr>}</tbody></table></div></section>
}
