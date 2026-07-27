import { describe, it, expect } from "vitest"
import { likeLiteral, emailsMatch } from "../../api/affiliate.js"

/*
 * Partner-identity matching. Both helpers exist because .ilike() was being
 * handed raw email addresses:
 *
 *   · `_` is a legal email character AND a LIKE "any single character" wildcard,
 *     so john_smith@gmail.com also matched johnXsmith@gmail.com.
 *   · `%` matches any run of characters, and /apply's email regex (\S+@\S+\.\S+)
 *     accepts `%@gmail.com` — which, unauthenticated, returned the matched
 *     partner's referral `code`.
 *   · /dashboard used the same match to decide which unlinked application to
 *     attach to the signed-in account.
 *
 * likeLiteral() narrows the query; emailsMatch() is the check that actually
 * authorises the match, so a wildcard that slips through still cannot select
 * another person's row.
 */

describe("likeLiteral", () => {
  it("leaves an ordinary address untouched", () => {
    expect(likeLiteral("founder@flowlifyai.com")).toBe("founder@flowlifyai.com")
  })

  it("escapes the single-character wildcard that real addresses contain", () => {
    expect(likeLiteral("john_smith@gmail.com")).toBe("john\\_smith@gmail.com")
  })

  it("escapes the run wildcard used to probe for any partner", () => {
    expect(likeLiteral("%@gmail.com")).toBe("\\%@gmail.com")
    expect(likeLiteral("%@%.%")).toBe("\\%@\\%.\\%")
  })

  it("escapes `*`, which PostgREST reads as `%` in like/ilike values", () => {
    expect(likeLiteral("*@gmail.com")).toBe("\\*@gmail.com")
  })

  it("escapes the escape character itself, so it cannot be smuggled through", () => {
    expect(likeLiteral("a\\_b@x.com")).toBe("a\\\\\\_b@x.com")
  })

  it("survives empty and nullish input", () => {
    expect(likeLiteral("")).toBe("")
    expect(likeLiteral(undefined as unknown as string)).toBe("")
  })
})

describe("emailsMatch", () => {
  it("matches the same address case-insensitively and ignoring surrounding space", () => {
    expect(emailsMatch("Founder@Flowlifyai.com", "founder@flowlifyai.com")).toBe(true)
    expect(emailsMatch("  founder@flowlifyai.com  ", "founder@flowlifyai.com")).toBe(true)
  })

  it("rejects a row that only pattern-matched the supplied address", () => {
    // What an unescaped ILIKE would have handed back for `john_smith@gmail.com`.
    expect(emailsMatch("johnXsmith@gmail.com", "john_smith@gmail.com")).toBe(false)
    // ...and for a deliberate wildcard probe.
    expect(emailsMatch("somepartner@gmail.com", "%@gmail.com")).toBe(false)
  })

  it("never treats a missing address as a match", () => {
    expect(emailsMatch(null, "founder@flowlifyai.com")).toBe(false)
    expect(emailsMatch("", "")).toBe(false)
    expect(emailsMatch(undefined, undefined)).toBe(false)
  })
})
