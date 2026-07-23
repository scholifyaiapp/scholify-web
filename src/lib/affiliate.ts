import { supabase, isSupabaseConfigured } from "@/lib/supabase"

/*
 * Affiliate / partner program (Phase 1 — client helpers).
 *
 * A partner shares `scholifyapp.com/?aff=CODE`. We capture the code, ping the
 * public resolve endpoint for click tracking, and stash it so the next Stripe
 * checkout carries it (see src/lib/stripe.ts → api/stripe.ts metadata). The
 * server records a 35% commission on the completed purchase.
 *
 * Applications go through /api/affiliate?action=apply (creates a PENDING row
 * you approve in Supabase). The dashboard reads the partner's own rows via RLS.
 */

const AFF_KEY = "scholify-affiliate-code"

function cleanCode(input: string): string {
  return String(input || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 20)
}

/** Read ?aff= (or a partner ?ref=) from the URL, remember it, count the click. */
export function captureAffiliateRef(): void {
  try {
    const params = new URLSearchParams(window.location.search)
    const raw = params.get("aff") || params.get("ref") || ""
    const code = cleanCode(raw)
    if (!code) return
    window.localStorage.setItem(AFF_KEY, code)
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
    return window.localStorage.getItem(AFF_KEY)
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
}

export interface AffiliateDashboard {
  affiliate: AffiliateRow | null
  commissions: CommissionRow[]
  totals: { pending: number; approved: number; paid: number; sales: number }
}

const EMPTY: AffiliateDashboard = {
  affiliate: null,
  commissions: [],
  totals: { pending: 0, approved: 0, paid: 0, sales: 0 },
}

/** Load the signed-in partner's own affiliate row + commissions (via RLS). */
export async function fetchAffiliateDashboard(): Promise<AffiliateDashboard> {
  if (!isSupabaseConfigured) return EMPTY
  try {
    const { data: affiliate } = await supabase
      .from("affiliates")
      .select("id, name, code, status, clicks, commission_rate, stripe_account_id")
      .maybeSingle()
    if (!affiliate) return EMPTY

    const { data: rows } = await supabase
      .from("affiliate_commissions")
      .select("id, currency, sale_amount, commission_amount, status, available_after, created_at")
      .order("created_at", { ascending: false })

    const commissions = (rows ?? []) as CommissionRow[]
    const totals = { pending: 0, approved: 0, paid: 0, sales: 0 }
    for (const c of commissions) {
      totals.sales += c.sale_amount
      if (c.status === "pending") totals.pending += c.commission_amount
      else if (c.status === "approved") totals.approved += c.commission_amount
      else if (c.status === "paid") totals.paid += c.commission_amount
    }
    return { affiliate: affiliate as AffiliateRow, commissions, totals }
  } catch {
    return EMPTY
  }
}

/** Cents → "$12.34" for display. */
export function formatMoney(cents: number, currency = "usd"): string {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(
      cents / 100,
    )
  } catch {
    return `$${(cents / 100).toFixed(2)}`
  }
}
