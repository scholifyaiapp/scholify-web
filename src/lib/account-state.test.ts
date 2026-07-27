import { beforeEach, describe, expect, it } from "vitest"
import type { User } from "@supabase/supabase-js"
import { hydrateAccountSetup } from "./account-state"

const user = (id: string, setup?: Record<string, string>) => ({
  id,
  created_at: new Date().toISOString(),
  app_metadata: {},
  user_metadata: setup ? { scholify_acca_setup: setup } : {},
}) as unknown as User

beforeEach(() => localStorage.clear())

describe("account setup isolation", () => {
  it("adopts an existing pre-migration browser for its current account", () => {
    localStorage.setItem("scholify-acca-onboarded", "1")
    hydrateAccountSetup(user("one"))
    expect(localStorage.getItem("scholify-acca-onboarded")).toBe("1")
    expect(localStorage.getItem("scholify-account-state-owner")).toBe("one")
  })

  it("does not leak onboarding state into another account", () => {
    localStorage.setItem("scholify-acca-onboarded", "1")
    hydrateAccountSetup(user("one"))
    hydrateAccountSetup(user("two"))
    expect(localStorage.getItem("scholify-acca-onboarded")).toBeNull()
    expect(localStorage.getItem("scholify-account-state-owner")).toBe("two")
  })

  it("restores setup from durable user metadata on a new browser", () => {
    hydrateAccountSetup(user("one", {
      "scholify-acca-onboarded": "1",
      "scholify-acca-current-paper": "AA",
    }))
    expect(localStorage.getItem("scholify-acca-onboarded")).toBe("1")
    expect(localStorage.getItem("scholify-acca-current-paper")).toBe("AA")
  })
})
