import type { VercelRequest, VercelResponse } from "./vercel-types.js"
import postgres from "postgres"
import { createClient } from "@supabase/supabase-js"

// The waitlist SIGNUP path and its emails were retired at launch (see the
// handler). Only the admin `?action=list` reader and the pure, tested
// waitlistRejectReason remain.
const ADMIN_EMAIL = "scholifyaiapp@gmail.com"

async function listContacts(req: VercelRequest, res: VercelResponse): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  if (!supabaseUrl || !serviceKey || !token) {
    res.status(401).json({ ok: false, reason: "unauthorized" })
    return
  }

  const auth = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })
  const { data, error } = await auth.auth.getUser(token)
  if (error || data.user?.email?.toLowerCase() !== ADMIN_EMAIL) {
    res.status(403).json({ ok: false, reason: "forbidden" })
    return
  }

  const connection = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL
  if (!connection) {
    res.status(503).json({ ok: false, reason: "database_not_configured" })
    return
  }
  const sql = postgres(connection, { max: 1, prepare: false, connect_timeout: 10, idle_timeout: 5 })
  try {
    const contacts = await sql`
      select id, email, name, source, created_at
      from public.launch_waitlist
      order by created_at desc
      limit 500
    `
    const [{ total }] = await sql<{ total: number }[]>`
      select count(*)::int as total from public.launch_waitlist
    `
    res.status(200).json({ ok: true, contacts, total })
  } finally {
    await sql.end({ timeout: 5 })
  }
}

/** Fastest a human plausibly submits — below this it is a script. */
const MIN_ELAPSED_MS = 1500
/**
 * Oldest page load still accepted.
 *
 * `startedAt` is stamped once at PAGE LOAD (Waitlist.tsx), not at first
 * keystroke, so this window measures how long the TAB has been open — not how
 * long the form took to fill. It used to be one hour, which silently rejected
 * anyone who left the launch page open longer than that and then signed up, and
 * showed them a generic "invalid". On the page that IS the public product until
 * 10 August that is a lost signup. A day is still a sane staleness bound and
 * costs no spam protection: the honeypot and MIN_ELAPSED_MS do that work.
 */
const MAX_ELAPSED_MS = 86_400_000

/** Why this submission should be dropped, or null to accept it. Pure + exported
 *  so the launch signup gate is actually covered by tests. */
export function waitlistRejectReason(input: {
  name: string
  email: string
  website: string
  elapsedMs: number
}): "honeypot" | "name" | "email" | "too_fast" | "stale" | null {
  if (input.website) return "honeypot"
  if (!input.name) return "name"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) return "email"
  if (!Number.isFinite(input.elapsedMs) || input.elapsedMs < MIN_ELAPSED_MS) return "too_fast"
  if (input.elapsedMs > MAX_ELAPSED_MS) return "stale"
  return null
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader("Cache-Control", "no-store")
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, reason: "post_only" })
    return
  }
  if (String(req.query.action || "") === "list") {
    try {
      await listContacts(req, res)
    } catch (error) {
      console.error("waitlist list:", error)
      res.status(500).json({ ok: false, reason: "list_failed" })
    }
    return
  }
  // The waitlist SIGNUP path is retired. Scholify launched on 10 Aug 2026, so
  // enrolling a new "waitlist" contact — and emailing them "launching 10 August,
  // we'll send access as the lights go out" a week late — is wrong. The admin
  // `?action=list` branch above still works for the dashboard. New visitors sign
  // up for the product directly.
  res.status(410).json({ ok: false, reason: "waitlist_closed", message: "Scholify has launched — sign up to start studying." })
}
