import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/*
 * Supabase client.
 *
 * Real credentials come from environment variables:
 *   VITE_SUPABASE_URL       — your project URL
 *   VITE_SUPABASE_ANON_KEY  — your project anon/public key
 *
 * When those are missing (e.g. before the backend is connected) the app
 * falls back to a local DEMO mode so the whole auth flow still works
 * end-to-end without a server. See `isSupabaseConfigured`.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/** `true` only when real Supabase credentials are present. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// A syntactically valid placeholder keeps createClient from throwing at
// import time when env vars are absent — demo mode never calls the network.
export const supabase: SupabaseClient = createClient(
  supabaseUrl || "https://demo.scholify.supabase.co",
  supabaseAnonKey || "demo-anon-key",
)
