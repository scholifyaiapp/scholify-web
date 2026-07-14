import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/*
 * Supabase client.
 *
 * Real credentials come from environment variables:
 *   VITE_SUPABASE_URL       — your project URL
 *   VITE_SUPABASE_ANON_KEY  — your project anon/public key
 *
 * When those are missing, the app falls back to a local DEMO mode so the whole
 * auth flow still works end-to-end without a server. See `isSupabaseConfigured`.
 *
 * DEMO MODE IS A DEVELOPMENT AFFORDANCE AND MUST NEVER RUN IN PRODUCTION.
 * It accepts ANY email with ANY password and mints a `demo-<timestamp>` user
 * whose entire record lives in that one browser's localStorage. Shipped to a
 * public site with no Supabase keys — exactly the state production was in on
 * 2026-07-14 — every visitor "signs up", believes they have an account, and
 * loses everything on a cache clear or a second device, with no path to migrate
 * them to a real user later. That is worse than having no sign-up at all.
 *
 * So: demo auth is gated to DEV. In a production build without credentials the
 * app says plainly that accounts aren't open yet (see `authUnavailable`), and
 * the whole offline study engine still works for anyone who wants to try it.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/** `true` only when real Supabase credentials are present. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

/** Fake local accounts — only ever in a dev build. */
export const isDemoAuthAllowed = !isSupabaseConfigured && import.meta.env.DEV

/**
 * `true` when we cannot create real accounts AND must not fake them: a
 * production build with no backend. Sign-in/sign-up surfaces say so honestly.
 */
export const authUnavailable = !isSupabaseConfigured && !import.meta.env.DEV

// A syntactically valid placeholder keeps createClient from throwing at
// import time when env vars are absent — demo mode never calls the network.
export const supabase: SupabaseClient = createClient(
  supabaseUrl || "https://demo.scholify.supabase.co",
  supabaseAnonKey || "demo-anon-key",
)
