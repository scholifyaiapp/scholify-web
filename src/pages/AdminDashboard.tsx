import { useEffect, useMemo, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { Activity, ArrowLeft, BarChart3, CheckCircle2, Clock3, RefreshCw, Users, UserRoundCheck } from "lucide-react"
import { ScholifyLockup } from "@/components/brand"
import CharlesMascot from "@/components/CharlesMascot"
import { useAuth } from "@/lib/auth"
import { isLaunchAdmin } from "@/lib/launch"
import { supabase } from "@/lib/supabase"
import { markAffiliateDuePaid, setAffiliateStatus } from "@/lib/affiliate"

type Data = {
  generatedAt: string
  summary: { users: number; active7d: number; active30d?: number; waitlist: number; partners: number; activePartners: number; partnerClicks: number; partnerInvitedUsers: number; partnerPaidInvitedUsers: number; partnerSales: number; revenue: number; partnerCommission?: number; partnerDueCommission?: number; feedback: number; newFeedback: number }
  users: Array<{ id: string; email?: string; name: string; createdAt: string; lastSignInAt?: string; provider: string; plan: string; firstTaskAt?: string; day3: boolean; day7: boolean; converted: boolean }>
  waitlist: Array<{ id: string; email: string; name: string; source?: string; created_at: string }>
  partners: Array<{ id: string; name: string; email: string; code: string; status: string; clicks: number; invitedUsers: number; paidInvitedUsers: number; conversionRate: number; sales: number; revenue: number; commission: number; dueCommission: number; approvedCommission: number; created_at: string }>
  feedback: Array<{ id: string; name?: string; email: string; category: string; rating?: number; message: string; source: string; page_url?: string; status: string; created_at: string }>
  posthog: { connected: boolean; events: unknown[][]; funnel: unknown[]; error?: string }
  billing?: { connected: boolean; currency: string; mrrCents: number; activePaid: number; trialing: number; byPlan: Array<{ plan: string; count: number; mrrCents: number }>; gross90dCents: number; refunded90dCents: number; charges90d: number; refunds90d: number; daily: Array<{ day: string; grossCents: number; charges: number }>; error?: string }
  subscriptionsSummary?: { rows: number; paying: number; trialing: number; canceled: number; byPlan: Record<string, number> }
  ai?: { totalCalls: number; tokensIn: number; tokensOut: number; users: number; activeUsers7d: number; byAction: Array<{ action: string; calls: number; tokensIn: number; tokensOut: number }>; daily: Array<{ day: string; calls: number; tokensIn: number; tokensOut: number }> }
  study?: { learners: number; totalAnswered: number; medianAnswered: number; active7d: number; active30d: number; totalXp: number; avgLevel: number; streakTrees: number; reminders: number }
}

const C = { ink: "#14141A", muted: "#6B6B76", red: "#C80000", gold: "#F4A405", paper: "#FAFAF7" }
const card = { background: "rgba(255,255,255,.9)", border: "1px solid rgba(20,20,26,.08)", borderRadius: 18, boxShadow: "0 14px 40px rgba(20,20,26,.055)" }
const money = (cents: number) => new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(cents / 100)
const num = (value: number) => new Intl.NumberFormat("en").format(value)
const compact = (value: number) => new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value)
const date = (value?: string) => value ? new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "Never"

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth()
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [reviewing, setReviewing] = useState("")
  const [tab, setTab] = useState<"overview" | "revenue" | "usage" | "users" | "waitlist" | "partners" | "feedback" | "journeys">("overview")

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
    return labels.map((label, index) => ({ label, value: Number(data?.posthog?.funnel?.[index] || 0) }))
  }, [data])

  const reviewPartner = async (id: string, status: "active" | "rejected" | "pending") => {
    setReviewing(id)
    const ok = await setAffiliateStatus(id, status)
    if (ok) setData((current) => current ? { ...current, partners: current.partners.map((partner) => partner.id === id ? { ...partner, status } : partner) } : current)
    else setError("The partner status could not be updated. Please try again.")
    setReviewing("")
  }

  const markDuePaid = async (id: string) => {
    const reference = window.prompt("Enter the Visa/bank transfer reference. Only continue after the money has actually been sent.")?.trim()
    if (!reference) return
    if (!window.confirm("Confirm the external payout is complete and record these matured commissions as paid?")) return
    setReviewing(id)
    const ok = await markAffiliateDuePaid(id, reference)
    if (ok) await load()
    else setError("Payout was not recorded. Check the reference and matured commission balance.")
    setReviewing("")
  }

  const refundUser = async (id: string, email?: string) => {
    const reason = window.prompt(`Reason for fully refunding ${email || "this customer"}?`)?.trim()
    if (!reason) return
    if (!window.confirm("This will refund the latest paid invoice and immediately cancel access. Continue?")) return
    setReviewing(id)
    setError("")
    const { data: sessionData } = await supabase.auth.getSession()
    const response = await fetch("/api/stripe?action=refund", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionData.session?.access_token || ""}` },
      body: JSON.stringify({ userId: id, reason }),
    })
    const result = (await response.json().catch(() => ({}))) as { ok?: boolean; refundId?: string; reason?: string }
    if (result.ok) {
      window.alert(`Refund completed. Stripe reference: ${result.refundId || "available in Stripe"}`)
      await load()
    } else setError(`Refund failed: ${result.reason || "unknown_error"}. No access change was made by this screen.`)
    setReviewing("")
  }

  const updateFeedback = async (id: string, status: string) => {
    const { data: sessionData } = await supabase.auth.getSession()
    // POST, not PATCH: api/affiliate rejects every other method with a bare 405
    // before it even looks at `action`, so on PATCH each status button just
    // surfaced "Feedback status could not be updated." Every sibling call in
    // src/lib/affiliate.ts posts for the same reason.
    const response = await fetch("/api/affiliate?action=feedback-status", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionData.session?.access_token || ""}` },
      body: JSON.stringify({ id, status }),
    })
    const result = (await response.json().catch(() => ({}))) as { ok?: boolean }
    if (result.ok) setData((current) => current ? { ...current, feedback: current.feedback.map((item) => item.id === id ? { ...item, status } : item) } : current)
    else setError("Feedback status could not be updated.")
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
          {(["overview", "revenue", "usage", "users", "waitlist", "partners", "feedback", "journeys"] as const).map((item) => <button key={item} onClick={() => setTab(item)} style={{ border: 0, borderRadius: 999, padding: "9px 15px", cursor: "pointer", whiteSpace: "nowrap", textTransform: "capitalize", fontWeight: 800, fontSize: 12, background: tab === item ? C.ink : "#fff", color: tab === item ? "#fff" : C.muted, boxShadow: "0 0 0 1px rgba(20,20,26,.08)" }}>{item}{item === "feedback" && data?.summary.newFeedback ? ` · ${data.summary.newFeedback}` : ""}</button>)}
        </nav>

        {loading && <div style={{ ...card, padding: 50, textAlign: "center", color: C.muted }}>Loading founder analytics…</div>}
        {error && <div style={{ ...card, padding: 24, color: C.red }}>{error}</div>}
        {data && !loading && <>
          {tab === "overview" && <Overview data={data} />}
          {tab === "revenue" && <Revenue data={data} />}
          {tab === "usage" && <Usage data={data} />}
          {tab === "users" && <Table title="Registered users" columns={["User", "Plan", "Joined", "Last sign-in", "Journey", "Refund"]} rows={data.users.map((u) => [<span><b>{u.name || "Unnamed"}</b><small>{u.email}</small></span>, u.plan, date(u.createdAt), date(u.lastSignInAt), <Journey user={u} />, u.converted || u.plan !== "free" ? <Action label="Full refund" disabled={reviewing === u.id} onClick={() => void refundUser(u.id, u.email)} /> : "—"])} />}
          {tab === "waitlist" && <Table title={`Launch waitlist · ${data.waitlist.length}`} columns={["Contact", "Source", "Joined"]} rows={data.waitlist.map((w) => [<span><b>{w.name}</b><small>{w.email}</small></span>, w.source || "website", date(w.created_at)])} />}
          {tab === "partners" && <PartnerTable partners={data.partners} reviewing={reviewing} onReview={reviewPartner} onMarkPaid={markDuePaid} />}
          {tab === "feedback" && <FeedbackInbox feedback={data.feedback} onStatus={updateFeedback} />}
          {tab === "journeys" && <Journeys data={data} funnel={funnel} />}
        </>}
      </div>
      <style>{`small{display:block;color:#777780;font-size:11px;margin-top:3px}.admin-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}@media(max-width:850px){.admin-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.admin-charles{display:none}}@media(max-width:520px){.admin-grid{grid-template-columns:1fr}}`}</style>
    </main>
  )
}

function PartnerTable({ partners, reviewing, onReview, onMarkPaid }: { partners: Data["partners"]; reviewing: string; onReview: (id: string, status: "active" | "rejected" | "pending") => Promise<void>; onMarkPaid: (id: string) => Promise<void> }) {
  const columns = ["Partner", "Status", "Clicks", "Invited", "Paid invites", "Conversion", "Sales", "Revenue", "Commission", "Decision / payout"]
  return <section style={{ ...card, overflow: "hidden" }}><div style={{ padding: "18px 20px", fontWeight: 850, borderBottom: "1px solid rgba(20,20,26,.07)" }}>Partner applications and traction · {partners.length}</div><div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1180 }}><thead><tr>{columns.map((column) => <th key={column} style={{ padding: "11px 16px", textAlign: "left", color: C.muted, background: "rgba(20,20,26,.025)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em" }}>{column}</th>)}</tr></thead><tbody>{partners.length ? partners.map((partner) => <tr key={partner.id}><td style={{ padding: "13px 16px", borderTop: "1px solid rgba(20,20,26,.055)", fontSize: 12 }}><b>{partner.name} · {partner.code}</b><small>{partner.email}</small></td><td style={{ padding: "13px 16px", borderTop: "1px solid rgba(20,20,26,.055)" }}><Pill value={partner.status} /></td>{[partner.clicks, partner.invitedUsers, partner.paidInvitedUsers, `${partner.conversionRate}%`, partner.sales, money(partner.revenue), money(partner.commission)].map((value, index) => <td key={index} style={{ padding: "13px 16px", borderTop: "1px solid rgba(20,20,26,.055)", fontSize: 12 }}>{value}</td>)}<td style={{ padding: "10px 16px", borderTop: "1px solid rgba(20,20,26,.055)", whiteSpace: "nowrap" }}><div style={{ display: "flex", gap: 6 }}>{partner.status !== "active" && <Action label="Approve" disabled={reviewing === partner.id} onClick={() => void onReview(partner.id, "active")} primary />}{partner.status !== "rejected" && <Action label="Reject" disabled={reviewing === partner.id} onClick={() => void onReview(partner.id, "rejected")} />}{partner.status !== "pending" && <Action label="Pending" disabled={reviewing === partner.id} onClick={() => void onReview(partner.id, "pending")} />}{partner.dueCommission > 0 && <Action label={`Record payout ${money(partner.dueCommission)}`} disabled={reviewing === partner.id} onClick={() => void onMarkPaid(partner.id)} primary />}</div></td></tr>) : <tr><td colSpan={columns.length} style={{ padding: 30, color: C.muted, textAlign: "center" }}>No partner applications yet.</td></tr>}</tbody></table></div></section>
}

function Action({ label, disabled, onClick, primary = false }: { label: string; disabled: boolean; onClick: () => void; primary?: boolean }) {
  return <button type="button" disabled={disabled} onClick={onClick} style={{ border: primary ? 0 : "1px solid rgba(20,20,26,.12)", borderRadius: 8, padding: "7px 10px", background: primary ? C.ink : "#fff", color: primary ? "#fff" : C.ink, fontSize: 10, fontWeight: 850, cursor: disabled ? "wait" : "pointer", opacity: disabled ? .55 : 1 }}>{label}</button>
}

function FeedbackInbox({ feedback, onStatus }: { feedback: Data["feedback"]; onStatus: (id: string, status: string) => Promise<void> }) {
  return <section style={{ display: "grid", gap: 12 }}>{feedback.length ? feedback.map((item) => <article key={item.id} style={{ ...card, padding: 20, borderLeft: `4px solid ${item.status === "new" ? C.red : item.status === "planned" ? C.gold : "rgba(20,20,26,.12)"}` }}><div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}><div><b>{item.name || "Anonymous learner"}</b><small>{item.email} · {item.source} · {date(item.created_at)}</small></div><div style={{ display: "flex", gap: 7, alignItems: "center" }}><Pill value={item.category} /><span style={{ color: C.gold, letterSpacing: 1 }}>{item.rating ? "★".repeat(item.rating) : "—"}</span></div></div><p style={{ whiteSpace: "pre-wrap", lineHeight: 1.65, color: C.ink, fontSize: 14, margin: "16px 0" }}>{item.message}</p><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{["reviewed", "planned", "completed", "archived"].map((status) => <Action key={status} label={status} disabled={item.status === status} onClick={() => void onStatus(item.id, status)} primary={status === "planned"} />)}</div></article>) : <div style={{ ...card, padding: 36, textAlign: "center", color: C.muted }}>No feedback yet.</div>}</section>
}

function Overview({ data }: { data: Data }) {
  const stats = [[Users, "Registered users", data.summary.users], [Activity, "Active · 7 days", data.summary.active7d], [Activity, "Active · 30 days", data.summary.active30d ?? "—"], [BarChart3, "MRR · live Stripe", money(data.billing?.mrrCents || 0)], [CheckCircle2, "Gross · 90 days", money(data.billing?.gross90dCents || 0)], [Clock3, "Launch waitlist", data.summary.waitlist], [UserRoundCheck, "Active partners", data.summary.activePartners], [BarChart3, "Partner clicks", data.summary.partnerClicks], [Users, "Partner invited users", data.summary.partnerInvitedUsers], [CheckCircle2, "Paid invited users", data.summary.partnerPaidInvitedUsers], [Users, "AI learners · 7 days", data.ai?.activeUsers7d ?? 0], [Activity, "New feedback", data.summary.newFeedback]]
  return <><div className="admin-grid">{stats.map(([Icon, label, value]) => { const I = Icon as typeof Users; return <div key={String(label)} style={{ ...card, padding: 18 }}><I size={18} color={C.red} /><div style={{ fontSize: 25, fontWeight: 900, marginTop: 15 }}>{String(value)}</div><div style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>{String(label)}</div></div> })}</div><div style={{ ...card, padding: 20, marginTop: 16 }}><b>Data status</b><p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6, marginBottom: 0 }}>Supabase account, waitlist and partner records are live. {data.posthog?.connected ? "PostHog’s private query API is connected and reporting the last 30 days." : "Add POSTHOG_PERSONAL_API_KEY and POSTHOG_PROJECT_ID in Vercel to display live event funnels and journeys here."}</p></div></>
}

function MiniBars({ title, points, format }: { title: string; points: Array<{ day: string; value: number; hint?: string }>; format: (value: number) => string }) {
  const max = Math.max(...points.map((point) => point.value), 1)
  const total = points.reduce((sum, point) => sum + point.value, 0)
  return <section style={{ ...card, padding: 22 }}>
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 16 }}><b>{title}</b><b style={{ color: C.red }}>{format(total)}</b></div>
    {points.length ? <>
      <div style={{ display: "flex", gap: 2, height: 120, borderBottom: "1px solid rgba(20,20,26,.1)" }}>
        {points.map((point) => <div key={point.day} title={`${point.day} · ${format(point.value)}${point.hint ? ` · ${point.hint}` : ""}`} style={{ flex: 1, minWidth: 2, display: "flex", alignItems: "flex-end" }}><div style={{ width: "100%", height: `${(point.value / max) * 100}%`, background: C.red, borderRadius: "3px 3px 0 0" }} /></div>)}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: C.muted, fontSize: 10, marginTop: 6 }}><span>{points[0].day}</span><span>peak {format(max)}</span><span>{points[points.length - 1].day}</span></div>
    </> : <div style={{ color: C.muted, fontSize: 13 }}>No activity recorded yet.</div>}
  </section>
}

function StatGrid({ stats }: { stats: Array<[typeof Users, string, string | number]> }) {
  return <div className="admin-grid">{stats.map(([Icon, label, value]) => <div key={label} style={{ ...card, padding: 18 }}><Icon size={18} color={C.red} /><div style={{ fontSize: 25, fontWeight: 900, marginTop: 15 }}>{String(value)}</div><div style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>{label}</div></div>)}</div>
}

function Revenue({ data }: { data: Data }) {
  const billing = data.billing
  const subs = data.subscriptionsSummary
  if (!billing?.connected) return <div style={{ ...card, padding: 36, color: C.muted, lineHeight: 1.65 }}>Live Stripe reporting is not connected yet. {billing?.error ? `Stripe answered: ${billing.error}.` : "Add STRIPE_SECRET_KEY in Vercel and this tab fills itself with live MRR, subscriptions and 90-day revenue."}</div>
  const avgCharge = billing.charges90d ? Math.round(billing.gross90dCents / billing.charges90d) : 0
  const stats: Array<[typeof Users, string, string | number]> = [[BarChart3, "MRR · live Stripe", money(billing.mrrCents)], [CheckCircle2, "Paying subscriptions", num(billing.activePaid)], [Clock3, "Trialing now", num(billing.trialing)], [BarChart3, "Gross · 90 days", money(billing.gross90dCents)], [Activity, "Refunded · 90 days", money(billing.refunded90dCents)], [CheckCircle2, "Charges · 90 days", num(billing.charges90d)], [Activity, "Refunds · 90 days", num(billing.refunds90d)], [BarChart3, "Average charge", money(avgCharge)]]
  return <div style={{ display: "grid", gap: 16 }}>
    <StatGrid stats={stats} />
    <MiniBars title="Daily gross revenue · 90 days" points={billing.daily.map((day) => ({ day: day.day, value: day.grossCents, hint: `${day.charges} charge${day.charges === 1 ? "" : "s"}` }))} format={money} />
    <Table title="Live subscriptions by plan" columns={["Plan", "Subscribers", "MRR / month"]} rows={billing.byPlan.map((plan) => [<b>{plan.plan}</b>, num(plan.count), money(plan.mrrCents)])} />
    <div style={{ ...card, padding: 20 }}><b>Database cross-check</b><p style={{ color: C.muted, fontSize: 13, lineHeight: 1.65, margin: "10px 0 0" }}>Webhook-written subscription rows: {num(subs?.rows || 0)} total · {num(subs?.paying || 0)} paying · {num(subs?.trialing || 0)} trialing · {num(subs?.canceled || 0)} canceled. By plan: {Object.entries(subs?.byPlan || {}).map(([plan, count]) => `${plan} ${count}`).join(" · ") || "none yet"}. If these drift from the live Stripe numbers above, a webhook was missed — check the Stripe event log.</p></div>
    <div style={{ ...card, padding: 20 }}><b>Partner economics</b><p style={{ color: C.muted, fontSize: 13, lineHeight: 1.65, margin: "10px 0 0" }}>Partner-attributed revenue {money(data.summary.revenue)} · commission earned {money(data.summary.partnerCommission || 0)} · matured and due for payout now {money(data.summary.partnerDueCommission || 0)}. Record payouts from the partners tab once the transfer has actually been sent.</p></div>
  </div>
}

function Usage({ data }: { data: Data }) {
  const ai = data.ai
  const study = data.study
  const aiStats: Array<[typeof Users, string, string | number]> = [[Activity, "AI calls · all time", num(ai?.totalCalls || 0)], [Users, "Learners who used AI", num(ai?.users || 0)], [UserRoundCheck, "AI active · 7 days", num(ai?.activeUsers7d || 0)], [BarChart3, "Tokens in", compact(ai?.tokensIn || 0)], [BarChart3, "Tokens out", compact(ai?.tokensOut || 0)], [Activity, "Tokens out / call", compact(ai?.totalCalls ? Math.round((ai.tokensOut || 0) / ai.totalCalls) : 0)]]
  const studyStats: Array<[typeof Users, string, string | number]> = [[Users, "Learners with progress", num(study?.learners || 0)], [CheckCircle2, "Questions answered", num(study?.totalAnswered || 0)], [BarChart3, "Median per learner", num(study?.medianAnswered || 0)], [Activity, "Studying · 7 days", num(study?.active7d || 0)], [Activity, "Studying · 30 days", num(study?.active30d || 0)], [BarChart3, "Total XP earned", compact(study?.totalXp || 0)], [CheckCircle2, "Streak trees grown", num(study?.streakTrees || 0)], [Clock3, "Study reminders set", num(study?.reminders || 0)]]
  return <div style={{ display: "grid", gap: 16 }}>
    <StatGrid stats={aiStats} />
    <MiniBars title="Daily AI calls · 30 days" points={(ai?.daily || []).map((day) => ({ day: day.day, value: day.calls, hint: `${compact(day.tokensIn)} in / ${compact(day.tokensOut)} out` }))} format={num} />
    <Table title="AI usage by action" columns={["Action", "Calls", "Tokens in", "Tokens out"]} rows={(ai?.byAction || []).map((action) => [<b>{action.action}</b>, num(action.calls), compact(action.tokensIn), compact(action.tokensOut)])} />
    <div style={{ fontWeight: 850, margin: "6px 0 -4px" }}>Study engagement</div>
    <StatGrid stats={studyStats} />
  </div>
}

function Journeys({ data, funnel }: { data: Data; funnel: Array<{ label: string; value: number }> }) {
  const max = Math.max(...funnel.map((x) => x.value), 1)
  return <div style={{ display: "grid", gap: 16 }}><div style={{ ...card, padding: 22 }}><div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><b>30-day product journey</b><Pill value={data.posthog?.connected ? "connected" : "not connected"} /></div><div style={{ display: "grid", gap: 11, marginTop: 20 }}>{funnel.map((step) => <div key={step.label}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}><span>{step.label}</span><b>{step.value}</b></div><div style={{ height: 9, borderRadius: 99, background: "rgba(20,20,26,.06)", overflow: "hidden" }}><div style={{ width: `${(step.value / max) * 100}%`, height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#C80000,#E50068,#F4A405)" }} /></div></div>)}</div></div><Table title="Top PostHog events · 30 days" columns={["Event", "Events", "People"]} rows={(data.posthog?.events ?? []).map((row) => [String(row[0]), Number(row[1]), Number(row[2])])} /></div>
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
