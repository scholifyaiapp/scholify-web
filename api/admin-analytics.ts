import type { VercelRequest, VercelResponse } from "./vercel-types.js"
import Stripe from "stripe"
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js"

const ADMIN_EMAIL = "scholifyaiapp@gmail.com"
const ANALYTICS_BASELINE = "2026-07-24 10:56:32"
const DAY_MS = 86_400_000

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

const dayKey = (value: string | number | Date): string => new Date(value).toISOString().slice(0, 10)

type Billing = {
  connected: boolean
  currency: string
  mrrCents: number
  activePaid: number
  trialing: number
  byPlan: Array<{ plan: string; count: number; mrrCents: number }>
  gross90dCents: number
  refunded90dCents: number
  charges90d: number
  refunds90d: number
  daily: Array<{ day: string; grossCents: number; charges: number }>
  error?: string
}

/** Plan display name for a Stripe price id, from the same env vars api/stripe.ts uses. */
function planForPrice(priceId: string, nickname?: string | null): string {
  if (priceId && priceId === process.env.STRIPE_PRICE_BEGINNER) return "Beginner monthly"
  if (priceId && priceId === process.env.STRIPE_PRICE_BEGINNER_ANNUAL) return "Beginner annual"
  if (priceId && priceId === process.env.STRIPE_PRICE_PRO) return "Pro monthly"
  if (priceId && priceId === process.env.STRIPE_PRICE_ANNUAL) return "Pro annual"
  return nickname || "Other"
}

/** Normalise a recurring price to monthly cents so plans on different cycles sum into one MRR. */
function monthlyCents(unitAmount: number, interval: string, intervalCount: number): number {
  const per = unitAmount / Math.max(1, intervalCount)
  if (interval === "year") return per / 12
  if (interval === "week") return per * 4.345
  if (interval === "day") return per * 30.437
  return per
}

/** Live revenue truth from Stripe itself — the DB only stores webhook event ids. */
async function stripeBilling(): Promise<Billing> {
  const empty: Billing = { connected: false, currency: "usd", mrrCents: 0, activePaid: 0, trialing: 0, byPlan: [], gross90dCents: 0, refunded90dCents: 0, charges90d: 0, refunds90d: 0, daily: [] }
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return empty
  const stripe = new Stripe(key)
  try {
    const byPlan = new Map<string, { count: number; mrrCents: number }>()
    let mrrCents = 0
    let activePaid = 0
    let trialing = 0
    for (const status of ["active", "trialing"] as const) {
      let startingAfter: string | undefined
      for (let page = 0; page < 20; page++) {
        const batch = await stripe.subscriptions.list({ status, limit: 100, expand: ["data.items.data.price"], ...(startingAfter ? { starting_after: startingAfter } : {}) })
        for (const subscription of batch.data) {
          if (status === "trialing") trialing += 1
          else activePaid += 1
          for (const item of subscription.items.data) {
            const price = item.price
            if (!price?.recurring || typeof price.unit_amount !== "number") continue
            const cents = monthlyCents(price.unit_amount * (item.quantity || 1), price.recurring.interval, price.recurring.interval_count || 1)
            mrrCents += cents
            const plan = planForPrice(price.id, price.nickname)
            const entry = byPlan.get(plan) || { count: 0, mrrCents: 0 }
            entry.count += 1
            entry.mrrCents += cents
            byPlan.set(plan, entry)
          }
        }
        if (!batch.has_more) break
        startingAfter = batch.data[batch.data.length - 1]?.id
      }
    }

    const since = Math.floor((Date.now() - 90 * DAY_MS) / 1000)
    const daily = new Map<string, { grossCents: number; charges: number }>()
    let gross90dCents = 0
    let refunded90dCents = 0
    let charges90d = 0
    let refunds90d = 0
    let currency = "usd"
    let startingAfter: string | undefined
    for (let page = 0; page < 20; page++) {
      const batch = await stripe.charges.list({ created: { gte: since }, limit: 100, ...(startingAfter ? { starting_after: startingAfter } : {}) })
      for (const charge of batch.data) {
        if (charge.status !== "succeeded") continue
        currency = charge.currency || currency
        gross90dCents += charge.amount
        refunded90dCents += charge.amount_refunded
        charges90d += 1
        if (charge.amount_refunded > 0) refunds90d += 1
        const day = dayKey(charge.created * 1000)
        const entry = daily.get(day) || { grossCents: 0, charges: 0 }
        entry.grossCents += charge.amount
        entry.charges += 1
        daily.set(day, entry)
      }
      if (!batch.has_more) break
      startingAfter = batch.data[batch.data.length - 1]?.id
    }

    return {
      connected: true,
      currency,
      mrrCents: Math.round(mrrCents),
      activePaid,
      trialing,
      byPlan: [...byPlan.entries()].map(([plan, entry]) => ({ plan, count: entry.count, mrrCents: Math.round(entry.mrrCents) })).sort((a, b) => b.mrrCents - a.mrrCents),
      gross90dCents,
      refunded90dCents,
      charges90d,
      refunds90d,
      daily: [...daily.entries()].map(([day, entry]) => ({ day, ...entry })).sort((a, b) => a.day.localeCompare(b.day)),
    }
  } catch (error) {
    return { ...empty, error: error instanceof Error ? error.message : "stripe_failed" }
  }
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
    const [authUsers, profiles, waitlist, partners, commissions, partnerReferrals, feedback, subscriptionRows, aiUsage, progressRows, xpRows, streakRows, reminderRows, billing] = await Promise.all([
      allAuthUsers(admin),
      safeRows(admin, "profiles"),
      safeRows(admin, "launch_waitlist", "id,email,name,source,created_at"),
      safeRows(admin, "affiliates"),
      safeRows(admin, "affiliate_commissions"),
      safeRows(admin, "affiliate_referrals", "affiliate_id,referred_user_id"),
      safeRows(admin, "product_feedback", "id,name,email,category,rating,message,source,page_url,status,created_at"),
      safeRows(admin, "subscriptions"),
      safeRows(admin, "ai_usage", "user_id,day,action,count,tokens_in,tokens_out"),
      safeRows(admin, "acca_progress", "user_id,answered,updated_at"),
      safeRows(admin, "user_xp", "user_id,total_xp,level"),
      safeRows(admin, "streak_trees", "id,streak_milestone"),
      safeRows(admin, "study_reminders"),
      stripeBilling(),
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

    const partnerRows: Array<Row & { invitedUsers: number; paidInvitedUsers: number; conversionRate: number; sales: number; revenue: number; commission: number; dueCommission: number; approvedCommission: number }> = partners
      .map((partner) => {
        const rows = commissionByPartner.get(String(partner.id)) || []
        const validRows = rows.filter((row) => row.status !== "canceled")
        const invitedUsers = inviteCountByPartner.get(String(partner.id)) || 0
        const paidInvitedUsers = new Set(validRows.map((row) => String(row.stripe_customer_id || "")).filter(Boolean)).size
        return {
          ...partner,
          invitedUsers,
          paidInvitedUsers,
          conversionRate: invitedUsers ? Math.round((paidInvitedUsers / invitedUsers) * 1000) / 10 : 0,
          // A renewal is commissionable revenue, not another acquired customer.
          // Keep "Sales" aligned with the performance tiers: unique paid people.
          sales: paidInvitedUsers,
          revenue: validRows.reduce((sum, row) => sum + Number(row.sale_amount || 0), 0),
          commission: validRows.reduce((sum, row) => sum + Number(row.commission_amount || 0), 0),
          dueCommission: rows
            .filter((row) => row.status === "pending" && new Date(String(row.available_after)).getTime() <= Date.now())
            .reduce((sum, row) => sum + Number(row.commission_amount || 0), 0),
          approvedCommission: rows
            .filter((row) => row.status === "approved" || row.status === "paid")
            .reduce((sum, row) => sum + Number(row.commission_amount || 0), 0),
        } as Row & { invitedUsers: number; paidInvitedUsers: number; conversionRate: number; sales: number; revenue: number; commission: number; dueCommission: number; approvedCommission: number }
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

    // Database-side subscription state — cross-check for the live Stripe view.
    const payingStatuses = new Set(["active", "trialing"])
    const subscriptionsSummary = {
      rows: subscriptionRows.length,
      paying: subscriptionRows.filter((row) => String(row.plan || "free") !== "free" && payingStatuses.has(String(row.status || ""))).length,
      trialing: subscriptionRows.filter((row) => row.trial_ends_at && new Date(String(row.trial_ends_at)).getTime() > Date.now()).length,
      canceled: subscriptionRows.filter((row) => String(row.status || "") === "canceled").length,
      byPlan: subscriptionRows.reduce<Record<string, number>>((acc, row) => {
        const plan = String(row.plan || "free")
        acc[plan] = (acc[plan] || 0) + 1
        return acc
      }, {}),
    }

    // AI economics: per-action totals plus a 30-day daily series.
    const aiByAction = new Map<string, { calls: number; tokensIn: number; tokensOut: number }>()
    const aiDaily = new Map<string, { calls: number; tokensIn: number; tokensOut: number }>()
    const aiUsers = new Set<string>()
    const aiUsers7d = new Set<string>()
    const cutoff30 = Date.now() - 30 * DAY_MS
    const cutoff7 = Date.now() - 7 * DAY_MS
    let aiCalls = 0
    let aiTokensIn = 0
    let aiTokensOut = 0
    for (const row of aiUsage) {
      const calls = Number(row.count || 0)
      const tokensIn = Number(row.tokens_in || 0)
      const tokensOut = Number(row.tokens_out || 0)
      aiCalls += calls
      aiTokensIn += tokensIn
      aiTokensOut += tokensOut
      aiUsers.add(String(row.user_id))
      const time = new Date(String(row.day)).getTime()
      if (time >= cutoff7) aiUsers7d.add(String(row.user_id))
      const action = String(row.action || "other")
      const byAction = aiByAction.get(action) || { calls: 0, tokensIn: 0, tokensOut: 0 }
      byAction.calls += calls
      byAction.tokensIn += tokensIn
      byAction.tokensOut += tokensOut
      aiByAction.set(action, byAction)
      if (time >= cutoff30) {
        const day = dayKey(String(row.day))
        const daily = aiDaily.get(day) || { calls: 0, tokensIn: 0, tokensOut: 0 }
        daily.calls += calls
        daily.tokensIn += tokensIn
        daily.tokensOut += tokensOut
        aiDaily.set(day, daily)
      }
    }

    // Study engagement across the whole learner base.
    const answeredCounts = progressRows.map((row) => Number(row.answered || 0)).sort((a, b) => a - b)
    const study = {
      learners: progressRows.length,
      totalAnswered: answeredCounts.reduce((sum, value) => sum + value, 0),
      medianAnswered: answeredCounts.length ? answeredCounts[Math.floor(answeredCounts.length / 2)] : 0,
      active7d: progressRows.filter((row) => row.updated_at && new Date(String(row.updated_at)).getTime() >= cutoff7).length,
      active30d: progressRows.filter((row) => row.updated_at && new Date(String(row.updated_at)).getTime() >= cutoff30).length,
      totalXp: xpRows.reduce((sum, row) => sum + Number(row.total_xp || 0), 0),
      avgLevel: xpRows.length ? Math.round((xpRows.reduce((sum, row) => sum + Number(row.level || 1), 0) / xpRows.length) * 10) / 10 : 0,
      streakTrees: streakRows.length,
      reminders: reminderRows.length,
    }

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
        active30d: users.filter((user) => user.lastSignInAt && Date.now() - new Date(user.lastSignInAt).getTime() <= 30 * DAY_MS).length,
        waitlist: waitlist.length,
        partners: partnerRows.length,
        activePartners: partnerRows.filter((partner) => partner.status === "active").length,
        partnerClicks: partnerRows.reduce((sum, partner) => sum + Number(partner.clicks || 0), 0),
        partnerInvitedUsers: partnerReferrals.length,
        partnerPaidInvitedUsers: partnerRows.reduce((sum, partner) => sum + partner.paidInvitedUsers, 0),
        partnerSales: partnerRows.reduce((sum, partner) => sum + partner.paidInvitedUsers, 0),
        revenue: commissions.filter((row) => row.status !== "canceled").reduce((sum, row) => sum + Number(row.sale_amount || 0), 0),
        partnerCommission: commissions.filter((row) => row.status !== "canceled").reduce((sum, row) => sum + Number(row.commission_amount || 0), 0),
        partnerDueCommission: partnerRows.reduce((sum, partner) => sum + partner.dueCommission, 0),
        feedback: feedback.length,
        newFeedback: feedback.filter((row) => row.status === "new").length,
      },
      users,
      waitlist: waitlist.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at))),
      partners: partnerRows,
      feedback: feedback.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at))),
      posthog,
      billing,
      subscriptionsSummary,
      ai: {
        totalCalls: aiCalls,
        tokensIn: aiTokensIn,
        tokensOut: aiTokensOut,
        users: aiUsers.size,
        activeUsers7d: aiUsers7d.size,
        byAction: [...aiByAction.entries()].map(([action, entry]) => ({ action, ...entry })).sort((a, b) => b.calls - a.calls),
        daily: [...aiDaily.entries()].map(([day, entry]) => ({ day, ...entry })).sort((a, b) => a.day.localeCompare(b.day)),
      },
      study,
    })
  } catch (error) {
    console.error("admin analytics:", error)
    res.status(500).json({ ok: false, reason: "analytics_failed" })
  }
}
