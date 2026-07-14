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
;(globalAny.window as Record<string, unknown>).localStorage = localStorage

// Every test starts from a clean slate: state leaking between tests is how a
// suite starts lying to you.
beforeEach(() => {
  localStorage.clear()
})
