import { beforeEach, describe, expect, it, vi } from "vitest"

const mocks = vi.hoisted(() => ({
  signOut: vi.fn(),
  rpc: vi.fn(),
}))

vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: true,
  supabase: {
    auth: { signOut: mocks.signOut },
    rpc: mocks.rpc,
  },
}))

import {
  ACTIVE_LOGIN_LIMIT,
  consumeSessionReplacedNotice,
  currentAuthSessionIsActive,
  markSessionReplaced,
  secureLatestLogin,
} from "@/lib/account-session"

class MemoryStorage {
  private values = new Map<string, string>()
  getItem(key: string) { return this.values.get(key) ?? null }
  removeItem(key: string) { this.values.delete(key) }
  setItem(key: string, value: string) { this.values.set(key, value) }
}

beforeEach(() => {
  mocks.signOut.mockReset().mockResolvedValue({ error: null })
  mocks.rpc.mockReset().mockResolvedValue({ data: true, error: null })
  ;(window as unknown as { sessionStorage: MemoryStorage }).sessionStorage = new MemoryStorage()
})

describe("individual-account login policy", () => {
  it("allows one active login", () => {
    expect(ACTIVE_LOGIN_LIMIT).toBe(1)
  })

  it("keeps the newest login and revokes all older Supabase sessions", async () => {
    await expect(secureLatestLogin()).resolves.toBeNull()
    expect(mocks.signOut).toHaveBeenCalledWith({ scope: "others" })
  })

  it("returns a security error instead of pretending revocation succeeded", async () => {
    mocks.signOut.mockResolvedValueOnce({ error: { message: "network unavailable" } })
    await expect(secureLatestLogin()).resolves.toBe("network unavailable")
  })

  it("distinguishes a revoked session from an unavailable server check", async () => {
    mocks.rpc.mockResolvedValueOnce({ data: false, error: null })
    await expect(currentAuthSessionIsActive()).resolves.toBe(false)

    mocks.rpc.mockResolvedValueOnce({ data: null, error: { message: "offline" } })
    await expect(currentAuthSessionIsActive()).resolves.toBeNull()
  })

  it("shows the replaced-session warning once", () => {
    markSessionReplaced()
    expect(consumeSessionReplacedNotice()).toBe(true)
    expect(consumeSessionReplacedNotice()).toBe(false)
  })
})
