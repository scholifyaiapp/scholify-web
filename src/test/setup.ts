import { beforeEach } from "vitest"

/*
 * The ACCA engine is localStorage-first by design (it must work offline with
 * zero keys), so almost every module reads and writes `window.localStorage`.
 * Node has neither, so we provide a real in-memory implementation — not a mock
 * with stubbed returns, because several of the bugs this suite guards against
 * only appear when a WRITE is read back (corrupt data, quota, wrong types).
 */
class MemoryStorage implements Storage {
  private store = new Map<string, string>()

  get length(): number {
    return this.store.size
  }
  clear(): void {
    this.store.clear()
  }
  getItem(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) as string) : null
  }
  key(index: number): string | null {
    return [...this.store.keys()][index] ?? null
  }
  removeItem(key: string): void {
    this.store.delete(key)
  }
  setItem(key: string, value: string): void {
    this.store.set(key, String(value))
  }
}

const localStorage = new MemoryStorage()

// The engine reaches for `window.localStorage`, and a few modules guard on
// `typeof window === "undefined"` — so window must exist AND carry the storage.
const globalAny = globalThis as unknown as Record<string, unknown>
globalAny.localStorage = localStorage
globalAny.window = globalAny.window ?? {}
const win = globalAny.window as Record<string, unknown>
win.localStorage = localStorage

/*
 * DOM shims for the jsdom render tests (files with `@vitest-environment jsdom`).
 * jsdom omits matchMedia, the observers and rAF, which framer-motion's
 * useReducedMotion and the chart components reach for — without these a render
 * test throws before it can assert anything. Guarded (only added when missing)
 * and additive, so the node-env logic tests are untouched.
 */
if (typeof win.matchMedia !== "function") {
  win.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })
  globalAny.matchMedia = win.matchMedia
}
if (typeof globalAny.ResizeObserver !== "function") {
  class ResizeObserverStub {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }
  globalAny.ResizeObserver = ResizeObserverStub
  win.ResizeObserver = ResizeObserverStub
}
if (typeof globalAny.IntersectionObserver !== "function") {
  class IntersectionObserverStub {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): [] {
      return []
    }
  }
  globalAny.IntersectionObserver = IntersectionObserverStub
  win.IntersectionObserver = IntersectionObserverStub
}
if (typeof globalAny.requestAnimationFrame !== "function") {
  globalAny.requestAnimationFrame = (cb: (t: number) => void) => setTimeout(() => cb(Date.now()), 0) as unknown as number
  globalAny.cancelAnimationFrame = (id: number) => clearTimeout(id)
  win.requestAnimationFrame = globalAny.requestAnimationFrame
  win.cancelAnimationFrame = globalAny.cancelAnimationFrame
}

// Every test starts from a clean slate: state leaking between tests is how a
// suite starts lying to you.
beforeEach(() => {
  localStorage.clear()
})
