import { beforeEach, describe, expect, it, vi } from "vitest"

/*
 * The app-load reconcile gate. ProtectedRoute holds a fresh device's first
 * paint until ensureAccaProgressLoadSync settles, so the dashboard never
 * renders a returning learner's record as zeros. These tests pin the gate's
 * contract: once per user per page load, in-flight reuse (StrictMode mounts
 * twice), reset on account switch, and the timeout that stops a dead network
 * from holding the whole app shut.
 */

let cloudReads = 0
let readMode: "resolve" | "hang" = "resolve"

vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: true,
  supabase: {
    auth: {
      getSession: async () => ({ data: { session: { user: { id: "user-one" } } } }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: () => {
            cloudReads += 1
            if (readMode === "hang") return new Promise(() => {})
            return Promise.resolve({ data: null, error: null })
          },
        }),
      }),
      upsert: async () => ({ error: null }),
    }),
  },
}))

vi.mock("@/lib/acca", () => ({
  snapshotProgress: () => ({}),
  restoreProgress: () => {},
  progressAnsweredCount: () => 0,
}))

const { accaProgressLoadSyncSettled, ensureAccaProgressLoadSync } = await import("./acca-cloud")

describe("app-load progress reconcile gate", () => {
  beforeEach(() => {
    cloudReads = 0
    readMode = "resolve"
  })

  it("settles once per user and reuses the in-flight promise", async () => {
    expect(accaProgressLoadSyncSettled("user-a")).toBe(false)
    const first = ensureAccaProgressLoadSync("user-a")
    const second = ensureAccaProgressLoadSync("user-a")
    expect(second).toBe(first)
    await first
    expect(accaProgressLoadSyncSettled("user-a")).toBe(true)
    // A later mount (route change) joins the settled promise — no new read.
    await ensureAccaProgressLoadSync("user-a")
    expect(cloudReads).toBe(1)
  })

  it("an account switch resets the gate and reconciles the new account", async () => {
    await ensureAccaProgressLoadSync("user-a")
    expect(accaProgressLoadSyncSettled("user-b")).toBe(false)
    await ensureAccaProgressLoadSync("user-b")
    expect(accaProgressLoadSyncSettled("user-b")).toBe(true)
    // The old account's gate is gone with it — signing back re-reconciles.
    expect(accaProgressLoadSyncSettled("user-a")).toBe(false)
  })

  it("a dead network cannot hold the gate shut past its timeout", async () => {
    readMode = "hang"
    await ensureAccaProgressLoadSync("user-c", 20)
    expect(accaProgressLoadSyncSettled("user-c")).toBe(true)
  })
})
