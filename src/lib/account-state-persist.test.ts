import { beforeEach, describe, expect, it, vi } from "vitest"

/*
 * persistAccountSetup() writes the setup snapshot into Supabase auth metadata.
 * AuthProvider calls it on a 30s interval AND on every pagehide/visibilitychange,
 * and updateUser is a network write that emits USER_UPDATED — which re-renders
 * every auth-context consumer. Writing when nothing changed therefore cost a
 * round trip plus a full app re-render every 30 seconds, per signed-in user,
 * forever. These tests pin the dirty check that stops that.
 *
 * Lives in its own file because it must mock @/lib/supabase, which
 * account-state.test.ts (pure hydrate logic) deliberately does not.
 *
 * The dirty-check fingerprint is module-level state, so every test loads a FRESH
 * copy of the module — otherwise one test's last write silently suppresses the
 * next test's first one.
 */

const updateUser = vi.fn(async () => ({ data: {}, error: null }))
let currentUserId: string | null = "user-one"

vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: true,
  supabase: {
    auth: {
      getSession: async () => ({
        data: { session: currentUserId ? { user: { id: currentUserId } } : null },
      }),
      updateUser,
    },
  },
}))

async function freshPersist() {
  vi.resetModules()
  return (await import("./account-state")).persistAccountSetup
}

beforeEach(() => {
  localStorage.clear()
  updateUser.mockClear()
  currentUserId = "user-one"
})

describe("persistAccountSetup", () => {
  it("writes the first time there is something to persist", async () => {
    const persist = await freshPersist()
    localStorage.setItem("scholify-acca-onboarded", "1")
    await persist()
    expect(updateUser).toHaveBeenCalledTimes(1)
  })

  it("does not re-write an unchanged snapshot", async () => {
    const persist = await freshPersist()
    localStorage.setItem("scholify-acca-onboarded", "1")
    await persist()
    expect(updateUser).toHaveBeenCalledTimes(1)

    // The 30s heartbeat and a few tab switches, with no setup change between.
    await persist()
    await persist()
    await persist()
    expect(updateUser, "an unchanged snapshot must not hit the auth API").toHaveBeenCalledTimes(1)
  })

  it("writes again as soon as the setup really changes", async () => {
    const persist = await freshPersist()
    localStorage.setItem("scholify-acca-onboarded", "1")
    await persist()
    await persist()
    expect(updateUser).toHaveBeenCalledTimes(1)

    localStorage.setItem("scholify-acca-current-paper", "FR")
    await persist()
    expect(updateUser).toHaveBeenCalledTimes(2)
  })

  it("writes for a different account even when the snapshot is identical", async () => {
    const persist = await freshPersist()
    localStorage.setItem("scholify-acca-onboarded", "1")
    await persist()
    expect(updateUser).toHaveBeenCalledTimes(1)

    currentUserId = "user-two"
    await persist()
    expect(updateUser, "the fingerprint is keyed by user id").toHaveBeenCalledTimes(2)
  })

  it("stays dirty and retries after a failed write", async () => {
    const persist = await freshPersist()
    localStorage.setItem("scholify-acca-onboarded", "1")
    updateUser.mockRejectedValueOnce(new Error("offline"))
    await persist() // swallowed — local state is still usable
    expect(updateUser).toHaveBeenCalledTimes(1)

    // The snapshot never reached the server, so the next attempt must try again.
    await persist()
    expect(updateUser, "a failed write must not be recorded as persisted").toHaveBeenCalledTimes(2)
  })

  it("does nothing when nobody is signed in", async () => {
    const persist = await freshPersist()
    currentUserId = null
    localStorage.setItem("scholify-acca-onboarded", "1")
    await persist()
    expect(updateUser).not.toHaveBeenCalled()
  })
})
