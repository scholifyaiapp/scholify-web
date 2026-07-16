import { describe, it, expect, beforeEach } from "vitest"
import { coverCrop, avatarUrlOf, getLocalAvatar, setLocalAvatar, onAvatarChange } from "@/lib/avatar"

/*
 * The avatar pipeline's testable core: the crop geometry (a wrong rectangle
 * distorts every photo), the read-path precedence (cloud must beat the local
 * stopgap or a stale device copy shadows the account photo forever), and the
 * local fallback's change signal (the sidebar re-reads on it).
 *
 * The vitest environment is node — no DOM — so window/localStorage are
 * stubbed with the smallest possible fakes.
 */

const store = new Map<string, string>()
;(globalThis as unknown as { localStorage: unknown }).localStorage = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => void store.set(k, v),
  removeItem: (k: string) => void store.delete(k),
}
;(globalThis as unknown as { window: unknown }).window = new EventTarget()

beforeEach(() => store.clear())

describe("coverCrop", () => {
  it("crops landscape to a horizontally centred square", () => {
    expect(coverCrop(400, 300)).toEqual({ sx: 50, sy: 0, side: 300 })
  })

  it("crops portrait to a vertically centred square", () => {
    expect(coverCrop(300, 500)).toEqual({ sx: 0, sy: 100, side: 300 })
  })

  it("leaves a square untouched", () => {
    expect(coverCrop(256, 256)).toEqual({ sx: 0, sy: 0, side: 256 })
  })

  it("rounds odd offsets to whole pixels", () => {
    expect(coverCrop(401, 300)).toEqual({ sx: 51, sy: 0, side: 300 })
  })
})

describe("local avatar stopgap", () => {
  it("round-trips set → get → clear", () => {
    expect(getLocalAvatar("u1")).toBeNull()
    setLocalAvatar("u1", "data:image/webp;base64,AAA")
    expect(getLocalAvatar("u1")).toBe("data:image/webp;base64,AAA")
    setLocalAvatar("u1", null)
    expect(getLocalAvatar("u1")).toBeNull()
  })

  it("is scoped per user id", () => {
    setLocalAvatar("u1", "data:one")
    expect(getLocalAvatar("u2")).toBeNull()
  })

  it("announces every change so mounted avatars re-read", () => {
    let fired = 0
    const off = onAvatarChange(() => fired++)
    setLocalAvatar("u1", "data:one")
    setLocalAvatar("u1", null)
    off()
    setLocalAvatar("u1", "data:two")
    expect(fired).toBe(2)
  })
})

describe("avatarUrlOf precedence", () => {
  it("prefers the account photo over the device copy", () => {
    setLocalAvatar("u1", "data:stale-local")
    const url = avatarUrlOf({ id: "u1", user_metadata: { avatar_url: "https://cdn/x.webp?v=1" } })
    expect(url).toBe("https://cdn/x.webp?v=1")
  })

  it("falls back to the device copy when the account has none", () => {
    setLocalAvatar("u1", "data:local")
    expect(avatarUrlOf({ id: "u1", user_metadata: {} })).toBe("data:local")
  })

  it("treats an empty-string cloud URL as absent", () => {
    setLocalAvatar("u1", "data:local")
    expect(avatarUrlOf({ id: "u1", user_metadata: { avatar_url: "" } })).toBe("data:local")
  })

  it("returns null for no user and for a user with nothing set", () => {
    expect(avatarUrlOf(null)).toBeNull()
    expect(avatarUrlOf({ id: "u9", user_metadata: {} })).toBeNull()
  })
})
