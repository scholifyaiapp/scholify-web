// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest"
import { applyPageMeta, PAGE_META, SITE_ORIGIN } from "@/lib/page-meta"

/*
 * The per-route SEO applier — the fix for every page sharing the homepage's
 * canonical. Asserts the head actually mutates: title, description, canonical
 * pointing at THIS page, and noindex on auth/app pages.
 */
beforeEach(() => {
  document.head.innerHTML = ""
  document.title = ""
})

describe("applyPageMeta", () => {
  it("gives /pricing its own title, description and canonical", () => {
    applyPageMeta("Pricing")
    expect(document.title).toContain("Pricing")
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute("content")).toContain("$9.99")
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(`${SITE_ORIGIN}/pricing`)
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull()
  })

  it("marks auth pages noindex and removes the canonical", () => {
    applyPageMeta("Pricing") // seed a canonical first
    applyPageMeta("SignIn")
    expect(document.title).toContain("Sign in")
    expect(document.head.querySelector('meta[name="robots"]')?.getAttribute("content")).toContain("noindex")
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull()
  })

  it("navigating from a noindex page back to a public one restores indexability", () => {
    applyPageMeta("SignIn")
    applyPageMeta("Home")
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull()
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(`${SITE_ORIGIN}/`)
  })

  it("unknown page names fall back to noindex with the default title", () => {
    applyPageMeta("SomethingUnregistered")
    expect(document.head.querySelector('meta[name="robots"]')?.getAttribute("content")).toContain("noindex")
  })

  it("every registered page has a non-empty title, and every indexable one a canonical + description", () => {
    for (const [name, meta] of Object.entries(PAGE_META)) {
      expect(meta.title.length, `${name} title`).toBeGreaterThan(0)
      if (!meta.noindex) {
        expect(meta.canonicalPath, `${name} canonical`).toBeTruthy()
        expect(meta.description, `${name} description`).toBeTruthy()
      }
    }
  })
})
