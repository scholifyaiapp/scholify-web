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
      await persistTokens(body.user_id, tokens)
      res.status(200).json({
        success: true,
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
      await persistTokens(body.user_id, {
        access_token: tokens.access_token,
        refresh_token: body.refresh_token,
        expires_in: tokens.expires_in,
      })
      res.status(200).json({
        success: true,
        access_token: tokens.access_token,
        expires_in: tokens.expires_in,
      })
      return
    }

    res.status(400).json({ error: "Unknown action." })
  } catch (err) {
    console.error("calendar-callback:", err)
    res
      .status(500)
      .json({ error: err instanceof Error ? err.message : String(err) })
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
): Promise<void> {
  const url = process.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey || !userId || !tokens.access_token) return
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
  } catch (err) {
    console.error("calendar-callback persist:", err)
  }
}
