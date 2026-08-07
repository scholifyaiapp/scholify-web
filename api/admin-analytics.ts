import type { VercelRequest, VercelResponse } from "./vercel-types.js"
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js"

const ADMIN_EMAIL = "scholifyaiapp@gmail.com"
const ANALYTICS_BASELINE = "2026-07-24 10:56:32"

type Row = Record<string, unknown>

async function requireFounder(req: VercelRequest): Promise<SupabaseClient | null> {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  if (!url || !key || !token) return null
  const admin = createClient(url, key, { auth: { persistSession: false } })
  const { data, error } = await admin.auth.getUser(token)
  if (error || data.user?.email?.toLowerCase() !== ADMIN_EMAIL) return null
  return admin
}

async function safeRows(admin: SupabaseClient, table: string, select = "*"): Promise<Row[]> {
  // Page through in batches so counts/sums aren't silently capped by PostgREST's
  // max-rows limit once a table grows past it — the founder's traction numbers
  // (users, waitlist, revenue) must stay accurate at scale.
  const all: Row[] = []
  const size = 1000
  for (let from = 0; from < 500_000; from += size) {
    const { data, error } = await admin.from(table).select(select).range(from, from + size - 1)
    if (error) {
      console.warn(`admin analytics: ${table}`, error.message)
      break
    }
    const rows = (data || []) as unknown as Row[]
    all.push(...rows)
    if (rows.length < size) break
  }
  return all
}

/** Every auth user, paged until an empty page (listUsers caps a single page). */
async function allAuthUsers(admin: SupabaseClient): Promise<User[]> {
  const users: User[] = []
  const perPage = 200
  for (let page = 1; page <= 500; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage })
    const batch = data?.users || []
    if (error || batch.length === 0) break
    users.push(...batch)
    if (batch.length < perPage) break
  }
  return users
}

async function posthogQuery(query: string): Promise<unknown[][] | null> {
  const key = process.env.POSTHOG_PERSONAL_API_KEY
  const project = process.env.POSTHOG_PROJECT_ID
  const host = (process.env.POSTHOG_API_HOST || "https://us.posthog.com").replace(/\/$/, "")
  if (!key || !project) return null
  const response = await fetch(`${host}/api/projects/${project}/query/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: { kind: "HogQLQuery", query } }),
  })
  if (!response.ok) throw new Error(`posthog_${response.status}`)
  const json = (await response.json()) as { results?: unknown[][] }
  return json.results || []
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader("Cache-Control", "private, no-store")
  if (req.method !== "GET") {
    res.status(405).json({ ok: false, reason: "get_only" })
    return
  }
  const admin = await requireFounder(req)
  if (!admin) {
    res.status(403).json({ ok: false, reason: "forbidden" })
    return
  }

  try {
    const [authUsers, profiles, waitlist, partners, commissions, partnerReferrals, feedback] = await Promise.all([
      allAuthUsers(admin),
      safeRows(admin, "profiles"),
      safeRows(admin, "launch_waitlist", "id,email,name,source,created_at"),
      safeRows(admin, "affiliates"),
      safeRows(admin, "affiliate_commissions"),
      safeRows(admin, "affiliate_referrals", "affiliate_id,referred_user_id"),
      safeRows(admin, "product_feedback", "id,name,email,category,rating,message,source,page_url,status,created_at"),
    ])

    const commissionByPartner = new Map<string, Row[]>()
    for (const commission of commissions) {
      const id = String(commission.affiliate_id || "")
      commissionByPartner.set(id, [...(commissionByPartner.get(id) || []), commission])
    }

    const inviteCountByPartner = new Map<string, number>()
    for (const referral of partnerReferrals) {
      const id = String(referral.affiliate_id || "")
      inviteCountByPartner.set(id, (inviteCountByPartner.get(id) || 0) + 1)
    }

    const partnerRows: Array<Row & { invitedUsers: number; sales: number; revenue: number; commission: number; dueCommission: number; approvedCommission: number }> = partners
      .map((partner) => {
        const rows = commissionByPartner.get(String(partner.id)) || []
        const validRows = rows.filter((row) => row.status !== "canceled")
        return {
          ...partner,
          invitedUsers: inviteCountByPartner.get(String(partner.id)) || 0,
          sales: validRows.length,
          revenue: validRows.reduce((sum, row) => sum + Number(row.sale_amount || 0), 0),
          commission: validRows.reduce((sum, row) => sum + Number(row.commission_amount || 0), 0),
          dueCommission: rows
            .filter((row) => row.status === "pending" && new Date(String(row.available_after)).getTime() <= Date.now())
            .reduce((sum, row) => sum + Number(row.commission_amount || 0), 0),
          approvedCommission: rows
            .filter((row) => row.status === "approved" || row.status === "paid")
            .reduce((sum, row) => sum + Number(row.commission_amount || 0), 0),
        } as Row & { invitedUsers: number; sales: number; revenue: number; commission: number; dueCommission: number; approvedCommission: number }
      })
      .sort((a, b) => String(b["created_at"]).localeCompare(String(a["created_at"])))

    const profileById = new Map(profiles.map((profile) => [String(profile.id || profile.user_id), profile]))
    const users = authUsers.map((user) => {
      const profile = profileById.get(user.id) || {}
      return {
        id: user.id,
        email: user.email,
        createdAt: user.created_at,
        lastSignInAt: user.last_sign_in_at,
        name:
          [user.user_metadata?.first_name, user.user_metadata?.last_name].filter(Boolean).join(" ") ||
          user.user_metadata?.full_name ||
          "",
        provider: user.app_metadata?.provider || "",
        plan: user.app_metadata?.plan || user.app_metadata?.plan_status || "free",
        firstTaskAt: profile.first_task_completed_at || null,
        day3: Boolean(profile.day3_retained),
        day7: Boolean(profile.day7_retained),
        converted: Boolean(profile.converted_to_paid),
      }
    })

    let posthog: { connected: boolean; events: unknown[][]; funnel: unknown[]; error?: string } = {
      connected: false,
      events: [],
      funnel: [],
    }
    try {
      const [events, funnel] = await Promise.all([
        posthogQuery(
          `SELECT event, count() AS events, uniqExact(person_id) AS people FROM events WHERE timestamp >= toDateTime('${ANALYTICS_BASELINE}') GROUP BY event ORDER BY events DESC LIMIT 20`,
        ),
        posthogQuery(
          `SELECT countIf(event='signup_completed'), countIf(event='onboarding_complete'), countIf(event='diagnostic_completed'), countIf(event='session_completed'), countIf(event='upgrade_started'), countIf(event='subscription_activated') FROM events WHERE timestamp >= toDateTime('${ANALYTICS_BASELINE}')`,
        ),
      ])
      if (events && funnel) posthog = { connected: true, events, funnel: funnel[0] || [] }
    } catch (error) {
      posthog = { connected: false, events: [], funnel: [], error: error instanceof Error ? error.message : "query_failed" }
    }

    res.status(200).json({
      ok: true,
      generatedAt: new Date().toISOString(),
      analyticsBaseline: `${ANALYTICS_BASELINE}Z`,
      summary: {
        users: users.length,
        active7d: users.filter((user) => user.lastSignInAt && Date.now() - new Date(user.lastSignInAt).getTime() <= 604_800_000).length,
        waitlist: waitlist.length,
        partners: partnerRows.length,
        activePartners: partnerRows.filter((partner) => partner.status === "active").length,
        partnerClicks: partnerRows.reduce((sum, partner) => sum + Number(partner.clicks || 0), 0),
        partnerInvitedUsers: partnerReferrals.length,
        partnerSales: commissions.filter((row) => row.status !== "canceled").length,
        revenue: commissions.filter((row) => row.status !== "canceled").reduce((sum, row) => sum + Number(row.sale_amount || 0), 0),
        feedback: feedback.length,
        newFeedback: feedback.filter((row) => row.status === "new").length,
      },
      users,
      waitlist: waitlist.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at))),
      partners: partnerRows,
      feedback: feedback.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at))),
      posthog,
    })
  } catch (error) {
    console.error("admin analytics:", error)
    res.status(500).json({ ok: false, reason: "analytics_failed" })
  }
}
