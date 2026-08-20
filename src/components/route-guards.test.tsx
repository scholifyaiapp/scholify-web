// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

/*
 * The fresh-device hold. ProtectedRoute must not paint a returning learner's
 * dashboard as zeros while their record is still on its way down from the
 * cloud — and must not make a learner who HAS local work wait on the network.
 * decideAppAccess stays real; only the edges (auth, cloud, storage counters)
 * are controlled.
 */

const fakeUser = { id: "user-one", email: "learner@example.com" }
let answeredLocally = 0
let loadSyncSettled = false
let resolveLoadSync: (() => void) | null = null

vi.mock("@/lib/auth", () => ({
  useAuth: () => ({ user: fakeUser, loading: false, signOut: async () => {} }),
}))
vi.mock("@/lib/supabase", () => ({ isSupabaseConfigured: true, supabase: {} }))
vi.mock("@/lib/launch", () => ({
  PRELAUNCH_MODE: false,
  LAUNCH_DATE_LABEL: "10 August 2026",
  isLaunchAdmin: () => false,
  signInPath: () => "/sign-in",
}))
vi.mock("@/lib/entitlement", () => ({ canAccessApp: () => true }))
vi.mock("@/lib/acca-profile", () => ({ isAccaOnboarded: () => true }))
vi.mock("@/lib/account-session", () => ({
  currentAuthSessionIsActive: async () => true,
  markSessionReplaced: () => {},
}))
vi.mock("@/lib/analytics", () => ({ trackEvent: () => {} }))
vi.mock("@/components/PaywallModal", () => ({ default: () => null }))
vi.mock("@/components/brand", () => ({ LogoSpinner: () => null }))
vi.mock("@/lib/acca", () => ({ progressAnsweredCount: () => answeredLocally }))
vi.mock("@/lib/acca-cloud", () => ({
  accaProgressLoadSyncSettled: () => loadSyncSettled,
  ensureAccaProgressLoadSync: () =>
    new Promise<void>((resolve) => {
      resolveLoadSync = () => {
        loadSyncSettled = true
        resolve()
      }
    }),
}))

const { ProtectedRoute } = await import("./route-guards")

function renderGuarded() {
  return render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <ProtectedRoute>
        <div>the workspace</div>
      </ProtectedRoute>
    </MemoryRouter>,
  )
}

afterEach(cleanup)

describe("ProtectedRoute fresh-device hold", () => {
  it("holds an empty browser behind the restore screen, then lets them through", async () => {
    answeredLocally = 0
    loadSyncSettled = false
    renderGuarded()
    expect(screen.getByText("Restoring your progress…")).toBeTruthy()
    expect(screen.queryByText("the workspace")).toBeNull()
    resolveLoadSync!()
    expect(await screen.findByText("the workspace")).toBeTruthy()
  })

  it("a browser with local work renders instantly — the reconcile stays in the background", () => {
    answeredLocally = 120
    loadSyncSettled = false
    renderGuarded()
    expect(screen.getByText("the workspace")).toBeTruthy()
    expect(screen.queryByText("Restoring your progress…")).toBeNull()
  })
})
