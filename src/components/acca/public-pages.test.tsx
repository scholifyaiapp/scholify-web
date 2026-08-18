// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest"
import { render, cleanup } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Suspense, type ReactNode } from "react"
import { AuthProvider } from "@/lib/auth"
import { LanguageProvider } from "@/i18n/LanguageProvider"
import Landing from "@/pages/Landing"
import Pricing from "@/pages/Pricing"
import Privacy from "@/pages/Privacy"
import Terms from "@/pages/Terms"
import Support from "@/pages/Support"
import SignIn from "@/pages/SignIn"
import SignUp from "@/pages/SignUp"
import NotFound from "@/pages/NotFound"

/*
 * THE FRONT DOOR, RENDERED.
 *
 * A student's journey starts before any account exists: the landing page, pricing,
 * the legal pages, support, and the sign-in/sign-up forms. None of these had a
 * render test, and they are exactly the surfaces where a crash costs a SIGNUP
 * rather than a session — a visitor who gets a white screen does not file a bug,
 * they leave.
 *
 * Rendered inside the SAME provider tree main.tsx mounts — LanguageProvider,
 * AuthProvider (which degrades to demo mode when Supabase is unconfigured, as
 * it is under vitest) and a router — so the pages' own useT/useAuth/useNavigate
 * calls are genuine rather than mocked. A page that renders here but not in
 * production would mean main.tsx dropped a provider, and that is the failure
 * this harness would then reproduce.
 */
afterEach(cleanup)

function Page({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MemoryRouter>
          <Suspense fallback={null}>{children}</Suspense>
        </MemoryRouter>
      </AuthProvider>
    </LanguageProvider>
  )
}

describe("public pages render without crashing", () => {
  it("Landing — the first thing any visitor sees", () => {
    const { container } = render(<Page><Landing /></Page>)
    expect(container.textContent?.length ?? 0).toBeGreaterThan(100)
  })

  it("Pricing", () => {
    const { container } = render(<Page><Pricing /></Page>)
    expect(container.textContent?.length ?? 0).toBeGreaterThan(50)
  })

  it("Privacy and Terms — the legal pages", () => {
    render(<Page><Privacy /></Page>)
    cleanup()
    render(<Page><Terms /></Page>)
  })

  it("Support", () => {
    render(<Page><Support /></Page>)
  })

  it("SignIn and SignUp — the conversion surfaces", () => {
    const { container } = render(<Page><SignIn /></Page>)
    expect(container.querySelectorAll("input").length).toBeGreaterThan(0)
    cleanup()
    const signup = render(<Page><SignUp /></Page>)
    expect(signup.container.querySelectorAll("input").length).toBeGreaterThan(0)
  })

  it("NotFound — the catch-all", () => {
    render(<Page><NotFound /></Page>)
  })
})
