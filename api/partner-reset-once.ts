import { createHash, timingSafeEqual } from "node:crypto"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@supabase/supabase-js"

const TOKEN_HASH = "f1cff0d3fe10b29846fc9bb66bd63a46233867d7b79c7b4755490eff474c36fb"

function authorized(token: unknown): boolean {
  const actual = createHash("sha256").update(String(token || "")).digest()
  const expected = Buffer.from(TOKEN_HASH, "hex")
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST" || !authorized(req.body?.token)) {
    res.status(404).json({ ok: false })
    return
  }
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    res.status(500).json({ ok: false, reason: "not_configured" })
    return
  }
  const db = createClient(url, key, { auth: { persistSession: false } })
  const [applications, commissions] = await Promise.all([
    db.from("affiliates").select("id", { count: "exact", head: true }),
    db.from("affiliate_commissions").select("id", { count: "exact", head: true }),
  ])
  if (applications.error || commissions.error) {
    res.status(500).json({ ok: false, reason: "count_failed" })
    return
  }
  const before = { applications: applications.count ?? 0, commissions: commissions.count ?? 0 }
  if (req.body?.dryRun === true) {
    res.status(200).json({ ok: true, dryRun: true, before })
    return
  }
  const commissionDelete = await db.from("affiliate_commissions").delete().neq("id", "00000000-0000-0000-0000-000000000000")
  if (commissionDelete.error) {
    res.status(500).json({ ok: false, reason: "commission_delete_failed", before })
    return
  }
  const applicationDelete = await db.from("affiliates").delete().neq("id", "00000000-0000-0000-0000-000000000000")
  if (applicationDelete.error) {
    res.status(500).json({ ok: false, reason: "application_delete_failed", before })
    return
  }
  const [applicationsAfter, commissionsAfter] = await Promise.all([
    db.from("affiliates").select("id", { count: "exact", head: true }),
    db.from("affiliate_commissions").select("id", { count: "exact", head: true }),
  ])
  res.status(200).json({
    ok: !applicationsAfter.error && !commissionsAfter.error,
    before,
    after: {
      applications: applicationsAfter.count ?? null,
      commissions: commissionsAfter.count ?? null,
    },
  })
}
