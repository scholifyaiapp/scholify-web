import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "@supabase/supabase-js"

/*
 * /api/calendar-callback — Google OAuth code-for-token exchange.
 *
 * Two roles share this endpoint:
 *
 *   1. Initial connect — body: { action: "exchange", code, user_id }
 *      Trades the OAuth code for {access, refresh} tokens, persists them
 *      to Supabase, returns the new account row.
 *
 *   2. Refresh — body: { action: "refresh", refresh_token, user_id }
 *      Trades a refresh token for a fresh access token, updates Supabase,
 *      returns the new access token.
 *
 * Both rely on GOOGLE_CLIENT_SECRET, which must NEVER ship to the client.
 *
 * Best-effort: when Supabase or env vars are missing we still return the
 * tokens so the client can hold them in localStorage; the UI keeps working
 * but the user re-connects on each device.
 */

export const config = { runtime: "nodejs" }

const TOKEN_URL = "https://oauth2.googleapis.com/token"

interface ExchangeBody {
  action: "exchange"
  code: string
  user_id?: string
  redirect_uri?: string
}

interface RefreshBody {
  action: "refresh"
  refresh_token: string
  user_id?: string
}

type Body = ExchangeBody | RefreshBody

interface GoogleTokenResponse {
  access_token?: string
  refresh_token?: string
  expires_in?: number
  scope?: string
  token_type?: string
  error?: string
  error_description?: string
}

/**
 * Verify the caller's Supabase JWT and return THEIR user id.
 *
 * SECURITY: this endpoint writes Google credentials with the service-role key
 * (RLS bypassed). It used to key that write on a `user_id` taken from the
 * REQUEST BODY, with no auth at all — so anyone could POST their own Google
 * refresh token against a victim's id and hijack the victim's calendar sync
 * (and use us as a free proxy to Google's token endpoint). The id must come
 * from the token, and the body's `user_id` is now ignored entirely.
 */
async function authedUserId(req: VercelRequest): Promise<string | null> {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null

  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  if (!token) return null

  const supa = createClient(url, key, { auth: { persistSession: false } })
  const { data, error } = await supa.auth.getUser(token)
  if (error || !data?.user) return null
  return data.user.id
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." })
    return
  }

  const clientId = process.env.VITE_GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    res.status(503).json({ error: "Google Calendar not configured on server." })
    return
  }

  const userId = await authedUserId(req)
  if (!userId) {
    res.status(401).json({ error: "Sign in to connect a calendar." })
    return
  }

  let body: Body
  try {
    const parsed = typeof req.body === "string" ? JSON.parse(req.body) : req.body
    body = parsed as Body
  } catch {
    res.status(400).json({ error: "Invalid JSON body." })
    return
  }

  const redirectUri =
    (body as ExchangeBody).redirect_uri ||
    process.env.VITE_GOOGLE_REDIRECT_URI ||
    ""

  try {
    if (body.action === "exchange") {
      if (!body.code) {
        res.status(400).json({ error: "Missing OAuth code." })
        return
      }
      const tokens = await exchangeCode({
        code: body.code,
        clientId,
        clientSecret,
        redirectUri,
      })
      const persisted = await persistTokens(userId, tokens)
      res.status(200).json({
        success: true,
        // Honest signal: if this is false, nothing was saved server-side (no
        // Supabase config, or the write failed) — the caller got tokens for
        // this session only and should not assume cross-device sync.
        persisted,
        access_token: tokens.access_token,
        expires_in: tokens.expires_in,
      })
      return
    }

    if (body.action === "refresh") {
      if (!body.refresh_token) {
        res.status(400).json({ error: "Missing refresh_token." })
        return
      }
      const tokens = await refreshToken({
        refreshToken: body.refresh_token,
        clientId,
        clientSecret,
      })
      const persisted = await persistTokens(userId, {
        access_token: tokens.access_token,
        refresh_token: body.refresh_token,
        expires_in: tokens.expires_in,
      })
      res.status(200).json({
        success: true,
        persisted,
        access_token: tokens.access_token,
        expires_in: tokens.expires_in,
      })
      return
    }

    res.status(400).json({ error: "Unknown action." })
  } catch (err) {
    // Fixed reason code to the client, like every other endpoint here —
    // Google's error_description (or a raw thrown value) stays server-side
    // only, so a misconfigured redirect_uri or client secret never leaks
    // upstream detail to the caller.
    console.error("calendar-callback:", err)
    res.status(500).json({ error: "Google Calendar connection failed. Try again." })
  }
}

async function exchangeCode(params: {
  code: string
  clientId: string
  clientSecret: string
  redirectUri: string
}): Promise<GoogleTokenResponse> {
  const body = new URLSearchParams({
    code: params.code,
    client_id: params.clientId,
    client_secret: params.clientSecret,
    redirect_uri: params.redirectUri,
    grant_type: "authorization_code",
  })
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  })
  const json = (await res.json()) as GoogleTokenResponse
  if (!res.ok || json.error) {
    throw new Error(json.error_description || json.error || `HTTP ${res.status}`)
  }
  return json
}

async function refreshToken(params: {
  refreshToken: string
  clientId: string
  clientSecret: string
}): Promise<GoogleTokenResponse> {
  const body = new URLSearchParams({
    refresh_token: params.refreshToken,
    client_id: params.clientId,
    client_secret: params.clientSecret,
    grant_type: "refresh_token",
  })
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  })
  const json = (await res.json()) as GoogleTokenResponse
  if (!res.ok || json.error) {
    throw new Error(json.error_description || json.error || `HTTP ${res.status}`)
  }
  return json
}

async function persistTokens(
  userId: string | undefined,
  tokens: GoogleTokenResponse,
): Promise<boolean> {
  // Same fallback as authedUserId() above — this used to read only
  // VITE_SUPABASE_URL, so a deployment configured with SUPABASE_URL alone
  // would auth successfully and then silently fail to save anything here,
  // while the handler still reported success: true.
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey || !userId || !tokens.access_token) return false
  try {
    const admin = createClient(url, serviceKey)
    const expiresAt = new Date(
      Date.now() + (tokens.expires_in ?? 3600) * 1000,
    ).toISOString()
    await admin.from("calendar_accounts").upsert(
      {
        user_id: userId,
        provider: "google",
        google_access_token: tokens.access_token,
        ...(tokens.refresh_token
          ? { google_refresh_token: tokens.refresh_token }
          : {}),
        google_token_expiry: expiresAt,
        calendar_sync_enabled: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    return true
  } catch (err) {
    console.error("calendar-callback persist:", err)
    return false
  }
}
