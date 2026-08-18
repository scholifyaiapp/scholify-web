/*
 * Per-route SEO metadata — the fix for the single-canonical problem.
 *
 * index.html ships ONE static head: every route declared
 * `canonical https://www.scholifyapp.com/` with the homepage title and
 * description, so Google consolidated /pricing, /terms, /support and
 * /partners/apply into the homepage and dropped them from the index — and
 * sharing /pricing on WhatsApp rendered the homepage card. Nothing in src/ ever
 * mutated the head.
 *
 * This module is that mutation: a registry keyed by the router's Page `name`,
 * applied on navigation by the <Page> wrapper. Public pages get their own
 * title / description / canonical / og; app-internal and auth pages get an
 * honest title plus `noindex` (they redirect or sit behind auth — indexing them
 * only produces bounce-on-auth results in search).
 *
 * SPA caveat, stated honestly: canonical/description changes applied by JS are
 * respected by Google (it renders), but social scrapers (WhatsApp, LinkedIn)
 * read the static HTML only. The og:* rewrites here help crawlers that execute
 * JS; the static head in index.html remains the fallback card for those that
 * don't. True per-route social cards need SSR or prerendering — out of scope.
 */

export const SITE_ORIGIN = "https://www.scholifyapp.com"

interface PageMeta {
  /** Browser-tab + SERP title. */
  title: string
  /** SERP snippet. Omitted → the site-wide default stays. */
  description?: string
  /** Canonical path ("/pricing"). Omitted → canonical is removed (noindex pages). */
  canonicalPath?: string
  /** Block indexing — auth, app-internal and callback pages. */
  noindex?: boolean
}

const DEFAULT_TITLE = "Scholify — AI Exam Prep for ACCA | From F1 to ACCA Member"

export const PAGE_META: Record<string, PageMeta> = {
  Home: {
    title: DEFAULT_TITLE,
    description:
      "AI exam prep for ACCA. Original question banks, timed mocks, flashcards and an AI Examiner that marks your written answers in seconds — every paper from BT to AAA.",
    canonicalPath: "/",
  },
  Pricing: {
    title: "Scholify Pricing — ACCA prep from $9.99/month",
    description:
      "Simple ACCA prep pricing: free diagnostic and study plan, Beginner from $9.99/month, Pro with the AI Examiner and timed mocks from $14.99/month. Cancel anytime.",
    canonicalPath: "/pricing",
  },
  Support: {
    title: "Scholify Support",
    description: "Get help with your Scholify account, billing, study plan or ACCA content — real answers from the team.",
    canonicalPath: "/support",
  },
  Terms: {
    title: "Scholify Terms of Service",
    description: "The terms that govern your use of Scholify's ACCA exam preparation platform.",
    canonicalPath: "/terms",
  },
  Privacy: {
    title: "Scholify Privacy Policy",
    description: "How Scholify collects, uses and protects your data while you prepare for your ACCA exams.",
    canonicalPath: "/privacy",
  },
  PartnersApply: {
    title: "Become a Scholify Partner — earn 27% helping ACCA students",
    description:
      "Join the Scholify partner programme: recommend the AI-powered ACCA prep platform to your audience and earn 27% of qualifying payments, with a 90-day attribution window.",
    canonicalPath: "/partners/apply",
  },
  NotFound: { title: "Page not found — Scholify", noindex: true },

  // Auth and app-internal surfaces: honest tab titles, kept out of the index.
  SignIn: { title: "Sign in — Scholify", noindex: true },
  SignUp: { title: "Create your account — Scholify", noindex: true },
  ResetPassword: { title: "Reset password — Scholify", noindex: true },
  AuthCallback: { title: "Signing you in… — Scholify", noindex: true },
  GoogleCalendarCallback: { title: "Connecting calendar… — Scholify", noindex: true },
  Welcome: { title: "Set up your plan — Scholify", noindex: true },
  Dashboard: { title: "Dashboard — Scholify", noindex: true },
  AccaStudy: { title: "Study — Scholify", noindex: true },
  AccaDiagnostic: { title: "Diagnostic — Scholify", noindex: true },
  AccaAnalytics: { title: "Analytics — Scholify", noindex: true },
  Settings: { title: "Settings — Scholify", noindex: true },
  AdminDashboard: { title: "Race control — Scholify", noindex: true },
  NotesHub: { title: "Notes — Scholify", noindex: true },
  Partners: { title: "Partner dashboard — Scholify", noindex: true },
}

function setNamedMeta(attr: "name" | "property", key: string, content: string | null): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (content === null) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

/** Apply a page's metadata. Unknown names fall back to the site default. */
export function applyPageMeta(name: string): void {
  const meta = PAGE_META[name] ?? { title: DEFAULT_TITLE, canonicalPath: undefined, noindex: true }

  document.title = meta.title
  setNamedMeta("property", "og:title", meta.title)

  if (meta.description) {
    setNamedMeta("name", "description", meta.description)
    setNamedMeta("property", "og:description", meta.description)
  }

  // Canonical: point at THIS page for indexable pages; remove it entirely on
  // noindex pages (a canonical on a noindexed page is a contradictory signal).
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (meta.canonicalPath) {
    if (!link) {
      link = document.createElement("link")
      link.rel = "canonical"
      document.head.appendChild(link)
    }
    link.href = `${SITE_ORIGIN}${meta.canonicalPath}`
    setNamedMeta("property", "og:url", `${SITE_ORIGIN}${meta.canonicalPath}`)
  } else {
    link?.remove()
  }

  setNamedMeta("name", "robots", meta.noindex ? "noindex, nofollow" : null)
}
