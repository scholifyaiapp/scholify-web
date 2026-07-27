/**
 * Routes that receive an auth hash of their own and must consume it themselves.
 *
 * Supabase delivers password recovery to `redirectTo` with the SAME
 * `#access_token=…&type=recovery` hash shape an OAuth return uses, so the global
 * OAuth return handler cannot tell them apart by hash alone — it has to check
 * the path. Left unguarded it strips the hash (racing Supabase's
 * detectSessionInUrl) and then navigates to /dashboard when the session is ready
 * or /auth/callback when it is not. Either way the learner leaves
 * /reset-password before the "choose a new password" form is usable, so a reset
 * link silently just signs them in and the OLD password stays valid.
 */
export const AUTH_HASH_OWNED_PATHS = ["/reset-password"] as const

/** True when this path handles its own auth hash and must not be intercepted. */
export function ownsAuthHash(pathname: string | null | undefined): boolean {
  const path = String(pathname || "").replace(/\/+$/, "").toLowerCase() || "/"
  return (AUTH_HASH_OWNED_PATHS as readonly string[]).includes(path)
}

/** Accept a same-origin app path and reject protocol-relative/backslash tricks. */
export function safeInternalPath(value: string | null | undefined, fallback = "/dashboard"): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return fallback
  try {
    const base = new URL("https://scholifyapp.com")
    const resolved = new URL(value, base)
    return resolved.origin === base.origin ? `${resolved.pathname}${resolved.search}${resolved.hash}` : fallback
  } catch {
    return fallback
  }
}
