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
