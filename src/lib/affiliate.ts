import { supabase, isSupabaseConfigured } from "@/lib/supabase"

/*
 * Affiliate / partner program (Phase 1 — client helpers).
 *
 * A partner shares `scholifyapp.com/?aff=CODE`. We capture the code, ping the
 * public resolve endpoint for click tracking, and stash it so the next Stripe
 * checkout carries it (see src/lib/stripe.ts → api/stripe.ts metadata). The
 * server records 27% across the partner's earned 1/3/5-payment window.
 *
 * Applications go through /api/affiliate?action=apply (creates a PENDING row
 * you approve in Supabase). The dashboard reads the partner's own rows via RLS.
 */

const AFF_KEY = "scholify-affiliate-code"
export const AFFILIATE_ATTRIBUTION_DAYS = 90
const AFFILIATE_ATTRIBUTION_MS = AFFILIATE_ATTRIBUTION_DAYS * 86_400_000

interface CapturedAffiliate {
  code: string
  capturedAt: number
}

function cleanCode(input: string): string {
  return String(input || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 20)
}

/** Read ?aff= from the URL, count the visit, and preserve the first valid touch
 * for 90 days. A later link must not silently steal an earlier partner's lead. */
export function captureAffiliateRef(): void {
  try {
    const params = new URLSearchParams(window.location.search)
    const raw = params.get("aff") || ""
    const code = cleanCode(raw)
    if (!code) return
    if (!getCapturedAffiliate()) {
      window.localStorage.setItem(AFF_KEY, JSON.stringify({ code, capturedAt: Date.now() } satisfies CapturedAffiliate))
    }
    // Best-effort click tracking — only counts if it's an ACTIVE affiliate.
    void fetch("/api/affiliate?action=resolve", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code }),
    }).catch(() => {})
  } catch {
    /* ignore */
  }
}

export function getCapturedAffiliate(): string | null {
  try {
    const raw = window.localStorage.getItem(AFF_KEY)
    if (!raw) return null
    // Referrals captured before the timestamped policy shipped are migrated in
    // place instead of being erased and costing the partner a valid lead.
    if (!raw.trim().startsWith("{")) {
      const legacyCode = cleanCode(raw)
      if (!legacyCode) return null
      window.localStorage.setItem(AFF_KEY, JSON.stringify({ code: legacyCode, capturedAt: Date.now() } satisfies CapturedAffiliate))
      return legacyCode
    }
    const parsed = JSON.parse(raw) as Partial<CapturedAffiliate>
    const code = cleanCode(parsed.code ?? "")
    const capturedAt = Number(parsed.capturedAt)
    if (!code || !Number.isFinite(capturedAt) || Date.now() - capturedAt > AFFILIATE_ATTRIBUTION_MS) {
      window.localStorage.removeItem(AFF_KEY)
      return null
    }
    return code
  } catch {
    return null
  }
}

export function clearCapturedAffiliate(): void {
  try {
    window.localStorage.removeItem(AFF_KEY)
  } catch {
    /* ignore */
  }
}

export interface AffiliateApplication {
  name: string
  email: string
  university?: string
  country?: string
  socials?: string
  audienceSize?: string
  areaOfStudy?: string
  code?: string
}

export interface ApplyResult {
  ok: boolean
  code?: string
  status?: string
  reason?: string
}

/** Submit a partner application (auth optional — links the account if signed in). */
export async function applyToAffiliate(app: AffiliateApplication): Promise<ApplyResult> {
  let token: string | null = null
  if (isSupabaseConfigured) {
    try {
      const { data } = await supabase.auth.getSession()
      token = data.session?.access_token ?? null
    } catch {
      /* anonymous apply is allowed */
    }
  }
  try {
    const res = await fetch("/api/affiliate?action=apply", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(app),
    })
    return (await res.json()) as ApplyResult
  } catch {
    return { ok: false, reason: "network" }
  }
}

export interface AffiliateRow {
  id: string
  name: string
  code: string
  status: string
  clicks: number
  commission_rate: number
  stripe_account_id: string | null
}

export interface CommissionRow {
  id: string
  currency: string
  sale_amount: number
  commission_amount: number
  status: string
  available_after: string
  created_at: string
  payout_reference?: string | null
  billing_cycle?: number | null
  commission_cycles?: number | null
  plan?: string | null
}

export interface AffiliateDashboard {
  affiliate: AffiliateRow | null
  commissions: CommissionRow[]
  totals: { pending: number; approved: number; paid: number; sales: number; invitedUsers: number; paidInvitedUsers: number }
}

const EMPTY: AffiliateDashboard = {
  affiliate: null,
  commissions: [],
  totals: { pending: 0, approved: 0, paid: 0, sales: 0, invitedUsers: 0, paidInvitedUsers: 0 },
}

/** Credit the signed-in user to the captured partner once. Server-side uniqueness
 * makes retries, OAuth callbacks and repeated sign-ins safe. */
export async function claimCapturedAffiliate(): Promise<boolean> {
  const code = getCapturedAffiliate()
  if (!code || !isSupabaseConfigured) return false
  try {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    if (!token) return false
    const res = await fetch("/api/affiliate?action=claim", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ code }),
    })
    const json = (await res.json()) as { ok?: boolean }
    if (json.ok) clearCapturedAffiliate()
    return Boolean(json.ok)
  } catch {
    return false
  }
}

/** Load the signed-in partner's row, exact invite count and commissions. The
 * API also links an older anonymous application to a matching verified email. */
export async function fetchAffiliateDashboard(): Promise<AffiliateDashboard> {
  if (!isSupabaseConfigured) return EMPTY
  try {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    if (!token) return EMPTY
    const res = await fetch("/api/affiliate?action=dashboard", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
    })
    const json = (await res.json()) as AffiliateDashboard & { ok?: boolean }
    return json.ok ? json : EMPTY
  } catch {
    return EMPTY
  }
}

/* ── Approved partners land on their own dashboard ────────────────
 *
 * ── The problem ───────────────────────────────────────────────────
 * A partner's application is approved, they get the approval email, they sign in
 * with the address they applied with — and land on /dashboard, the STUDENT app.
 * Nothing in that screen mentions the partner program. Their tracked link,
 * clicks, commissions and payout status all live at /partners, which they have to
 * know exists and navigate to by hand every single time. For someone whose whole
 * relationship with Scholify is the partner program, the product opens on the
 * wrong page.
 *
 * ── The fix ───────────────────────────────────────────────────────
 * Post-auth landing asks one question first: is this verified address an ACTIVE
 * partner? The `dashboard` action already answers it, and already adopts an
 * application that was submitted anonymously before the account existed (matching
 * on the verified email), so a partner who applied without signing up is linked
 * on their first sign-in and routed correctly on the same trip.
 *
 * An explicit `?next=` always wins — a partner following a deep link into the
 * study app must still get there. The result is cached per user id so the check
 * costs one request per session, and a partner whose status is later revoked
 * stops being routed as soon as the cache is refreshed on their next sign-in.
 */

const PARTNER_LANDING_KEY = "scholify-partner-active"

interface PartnerLandingCache {
  userId: string
  active: boolean
  at: number
}

function readLandingCache(): PartnerLandingCache | null {
  try {
    const raw = window.localStorage.getItem(PARTNER_LANDING_KEY)
    const parsed = raw ? (JSON.parse(raw) as PartnerLandingCache) : null
    if (parsed && typeof parsed.userId === "string" && typeof parsed.active === "boolean") return parsed
  } catch {
    /* ignore */
  }
  return null
}

function writeLandingCache(userId: string, active: boolean): void {
  try {
    window.localStorage.setItem(PARTNER_LANDING_KEY, JSON.stringify({ userId, active, at: Date.now() } satisfies PartnerLandingCache))
  } catch {
    /* ignore */
  }
}

/** Forget the cached partner flag — call on sign-out so the next account re-checks. */
export function clearPartnerLandingCache(): void {
  try {
    window.localStorage.removeItem(PARTNER_LANDING_KEY)
  } catch {
    /* ignore */
  }
}

/**
 * True when the signed-in account is an APPROVED partner.
 *
 * `pending` and `rejected` deliberately return false: a pending applicant sent to
 * the partner dashboard would see an empty earnings screen and read it as a
 * broken approval, which is worse than landing in the study app and checking
 * status from the partner page when they choose to.
 */
export async function isActivePartner(): Promise<boolean> {
  if (!isSupabaseConfigured) return false
  try {
    const { data } = await supabase.auth.getSession()
    const userId = data.session?.user?.id
    if (!userId) return false
    const cached = readLandingCache()
    // A fresh cache for THIS user answers immediately; the check itself is cheap
    // but it is on the critical path of the first paint after sign-in.
    if (cached && cached.userId === userId && Date.now() - cached.at < 12 * 60 * 60 * 1000) return cached.active
    const dash = await fetchAffiliateDashboard()
    const active = dash.affiliate?.status === "active"
    writeLandingCache(userId, active)
    return active
  } catch {
    return false
  }
}

/**
 * Where this account should land after signing in.
 *
 * `requested` is the `?next=` the guard captured when it bounced them to sign-in.
 * It wins outright — the partner check only decides the DEFAULT landing.
 */
export async function resolveAuthLanding(requested: string | null, fallback = "/dashboard"): Promise<string> {
  if (requested) return requested
  return (await isActivePartner()) ? "/partners" : fallback
}

/* ── Admin (Scholify staff only — server verifies the JWT email) ── */

export interface AdminAffiliate {
  id: string
  name: string
  email: string
  university: string | null
  country: string | null
  socials: string | null
  audience_size: string | null
  code: string
  status: string
  clicks: number
  created_at: string
}

async function adminToken(): Promise<string | null> {
  if (!isSupabaseConfigured) return null
  try {
    const { data } = await supabase.auth.getSession()
    return data.session?.access_token ?? null
  } catch {
    return null
  }
}

/** Admin: fetch all affiliate applications (newest first). */
export async function listAffiliates(): Promise<AdminAffiliate[]> {
  const token = await adminToken()
  if (!token) return []
  try {
    const res = await fetch("/api/affiliate?action=list", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
    })
    const json = (await res.json()) as { ok: boolean; affiliates?: AdminAffiliate[] }
    return json.ok ? json.affiliates ?? [] : []
  } catch {
    return []
  }
}

/** Admin: set an affiliate's status (active | rejected | pending). */
export async function setAffiliateStatus(id: string, status: string): Promise<boolean> {
  const token = await adminToken()
  if (!token) return false
  try {
    const res = await fetch("/api/affiliate?action=approve", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, status }),
    })
    const json = (await res.json()) as { ok: boolean }
    return json.ok
  } catch {
    return false
  }
}

/** Admin: after manually sending money, mark all matured pending commissions
 * for one partner as paid. The server refuses commissions still on hold. */
export async function markAffiliateDuePaid(id: string, reference: string): Promise<boolean> {
  const token = await adminToken()
  if (!token) return false
  try {
    const res = await fetch("/api/affiliate?action=mark-due-paid", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, reference }),
    })
    const json = (await res.json()) as { ok: boolean }
    return json.ok
  } catch {
    return false
  }
}

/** Cents → "$12.34" for display. */
export function dollarsFromCents(cents: number): number {
  return Number.isFinite(cents) ? cents / 100 : 0
}

export function formatMoney(cents: number, currency = "usd"): string {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(
      dollarsFromCents(cents),
    )
  } catch {
    return `$${dollarsFromCents(cents).toFixed(2)}`
  }
}
