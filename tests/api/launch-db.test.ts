import { describe, it, expect } from "vitest"
import { readFileSync, readdirSync } from "node:fs"
import { resolve } from "node:path"

/*
 * The production migration runner (scripts/apply-launch-db.mjs).
 *
 * ── Why this is tested by reading the file rather than importing it ──────────
 * The script has top-level side effects and calls process.exit() when it is not
 * running on Vercel production — importing it from a test would end the test
 * process. So these assertions are static, which is fine, because every failure
 * mode below IS static.
 *
 * ── The failure modes ───────────────────────────────────────────────────────
 * 1. A column added to the verification list with no migration that creates it.
 *    The deploy then fails on every build with "missing: x.y" and nobody can find
 *    the migration, because there isn't one.
 * 2. A migration listed that does not exist on disk — the readFile throws mid-run,
 *    after earlier migrations have already been applied.
 * 3. A migration that is NOT SAFE TO RE-RUN. This is the dangerous one: the runner
 *    applies every listed migration on every production build, so a bare
 *    `update`/`insert`/`delete` fires again on each deploy. That corrupts data
 *    slowly and invisibly — the symptom (a preference silently reverting) appears
 *    weeks later with nothing in the app to explain it.
 * 4. A `*​/` inside a block comment, which terminates the comment early and
 *    truncates the file. This actually happened (commit ea3a700: a cron
 *    expression in a comment in 0026).
 */

const ROOT = resolve(__dirname, "../..")
const RUNNER = readFileSync(resolve(ROOT, "scripts/apply-launch-db.mjs"), "utf8")
const MIGRATIONS_DIR = resolve(ROOT, "supabase/migrations")

/** The migration filenames the runner applies, in order. */
function listedMigrations(): string[] {
  const block = /const MIGRATIONS = \[([\s\S]*?)\]/.exec(RUNNER)
  expect(block, "MIGRATIONS array not found in the runner").toBeTruthy()
  return [...block![1].matchAll(/"([^"]+\.sql)"/g)].map((m) => m[1])
}

/** table → columns the runner verifies after applying. */
function requiredColumns(): Record<string, string[]> {
  const block = /const REQUIRED_COLUMNS = \{([\s\S]*?)\n\}/.exec(RUNNER)
  expect(block, "REQUIRED_COLUMNS object not found in the runner").toBeTruthy()
  const out: Record<string, string[]> = {}
  for (const entry of block![1].matchAll(/(\w+):\s*\[([\s\S]*?)\]/g)) {
    out[entry[1]] = [...entry[2].matchAll(/"([^"]+)"/g)].map((m) => m[1])
  }
  return out
}

const listed = listedMigrations()
const required = requiredColumns()
const sqlOf = (name: string) => readFileSync(resolve(MIGRATIONS_DIR, name), "utf8")

describe("the runner's migration list", () => {
  it("names at least one migration, in a parseable form", () => {
    expect(listed.length).toBeGreaterThan(0)
    for (const name of listed) expect(name).toMatch(/^\d{4}_[a-z0-9_]+\.sql$/)
  })

  it("lists only migrations that exist on disk", () => {
    const onDisk = new Set(readdirSync(MIGRATIONS_DIR))
    for (const name of listed) expect(onDisk.has(name), `${name} is listed but missing`).toBe(true)
  })

  it("applies migrations in ascending order", () => {
    const numbers = listed.map((n) => Number(n.slice(0, 4)))
    expect([...numbers].sort((a, b) => a - b)).toEqual(numbers)
  })
})

describe("every verified column has a migration that creates it", () => {
  it("finds each required column in the SQL the runner applies", () => {
    const allSql = listed.map(sqlOf).join("\n")
    for (const [table, columns] of Object.entries(required)) {
      for (const column of columns) {
        // The runner fails the deploy when a column is absent from the database.
        // If no listed migration even MENTIONS it, that failure is unfixable by
        // re-deploying and the migration itself was forgotten.
        expect(allSql.includes(column), `${table}.${column} is verified but no listed migration mentions it`).toBe(true)
      }
    }
  })
})

describe("every listed migration is safe to re-run", () => {
  /*
   * DDL is made re-runnable with `if not exists` / `or replace`. A DATA statement
   * cannot be, so it must sit inside a guard (a `do $$ ... end $$` block that
   * checks state first). Anything else re-fires on every deploy.
   */
  it("guards or omits data-modifying statements", () => {
    for (const name of listed) {
      const sql = sqlOf(name)
      // Strip line comments so prose about an `update` is not mistaken for one.
      const code = sql.replace(/--[^\n]*/g, "")
      const guardedRegions = [...code.matchAll(/do\s*\$\$[\s\S]*?end\s*\$\$/gi)].map((m) => m[0])
      // DML inside a stored function is its runtime body, not a data migration
      // executed while this SQL file is applied. Remove those definitions too.
      const functionRegions = [...code.matchAll(/create\s+or\s+replace\s+function[\s\S]*?\bas\s*\$\$[\s\S]*?\$\$\s*;/gi)].map((m) => m[0])
      const unguarded = [...guardedRegions, ...functionRegions].reduce((acc, region) => acc.replace(region, ""), code)
      const dataStatements = [...unguarded.matchAll(/\b(update|delete\s+from|insert\s+into)\s+public\./gi)]

      for (const statement of dataStatements) {
        // 0026's one-time carry-over of `reminder_time` is idempotent by its own
        // WHERE clause (it only rewrites rows still holding the default), so it is
        // allowed. Everything else must be inside a guard.
        const context = unguarded.slice(Math.max(0, statement.index! - 40), statement.index! + 400)
        const idempotentByWhere = /where[\s\S]*?(is not null|<>|=\s*'19:00')/i.test(context)
        expect(
          idempotentByWhere,
          `${name}: "${statement[1]}" runs on every deploy and is not guarded — wrap it in a do-block that checks state first`,
        ).toBe(true)
      }
    }
  })

  it("uses `if not exists` on every column it adds", () => {
    for (const name of listed) {
      const code = sqlOf(name).replace(/--[^\n]*/g, "")
      for (const add of code.matchAll(/add\s+column\s+(if\s+not\s+exists\s+)?/gi)) {
        expect(add[1], `${name}: an "add column" without "if not exists" fails on the second deploy`).toBeTruthy()
      }
    }
  })
})

describe("no migration truncates itself", () => {
  it("has no comment-terminating sequence outside a block comment", () => {
    // The ea3a700 bug: "*/5 * * * *" inside a /* … */ block closed the comment,
    // so the rest of the file was parsed as SQL and the migration failed.
    for (const name of listed) {
      const sql = sqlOf(name)
      let depth = 0
      for (let i = 0; i < sql.length - 1; i += 1) {
        const pair = sql.slice(i, i + 2)
        if (pair === "/*") { depth += 1; i += 1; continue }
        if (pair === "*/") {
          expect(depth, `${name}: a "*/" at index ${i} closes a comment that was never opened`).toBeGreaterThan(0)
          depth -= 1
          i += 1
        }
      }
      expect(depth, `${name}: an unterminated block comment swallows the rest of the file`).toBe(0)
    }
  })

  it("balances dollar-quoted bodies", () => {
    for (const name of listed) {
      const code = sqlOf(name).replace(/--[^\n]*/g, "").replace(/\/\*[\s\S]*?\*\//g, "")
      const markers = (code.match(/\$\$/g) ?? []).length
      expect(markers % 2, `${name}: an odd number of $$ markers leaves a body unterminated`).toBe(0)
    }
  })

  it("uses no $N placeholders, which the driver would interpolate as parameters", () => {
    for (const name of listed) {
      const code = sqlOf(name).replace(/--[^\n]*/g, "").replace(/\/\*[\s\S]*?\*\//g, "")
      expect(/\$\d/.test(code), `${name}: a $1-style token is treated as a bound parameter by postgres.js`).toBe(false)
    }
  })
})

describe("0029 — the day-completion email column", () => {
  const sql = sqlOf("0029_day_completion_email.sql")

  it("adds sent_done_date, which the exactly-once guard depends on", () => {
    expect(sql).toMatch(/add column if not exists sent_done_date date/i)
  })

  it("is verified by the runner, so a silent no-op fails the deploy", () => {
    expect(required.study_reminders).toContain("sent_done_date")
  })

  it("gates the lead_on backfill on the default it installs, so it runs once", () => {
    // Without the gate, every deploy switches the 3-hour reminder back off for
    // learners who deliberately turned it on in Settings.
    expect(sql).toMatch(/do\s*\$\$/i)
    expect(sql).toMatch(/column_default/i)
    expect(sql).toMatch(/not like '%false%'/i)
    const guarded = /do\s*\$\$[\s\S]*?end\s*\$\$/i.exec(sql)?.[0] ?? ""
    expect(guarded).toMatch(/update public\.study_reminders set lead_on = false/i)
  })
})

describe("0030 — individual-account session enforcement", () => {
  const sql = sqlOf("0030_individual_account_sessions.sql")

  it("checks the authenticated caller's session_id against auth.sessions", () => {
    expect(sql).toMatch(/create or replace function public\.is_current_auth_session_valid\(\)/i)
    expect(sql).toMatch(/from auth\.sessions/i)
    expect(sql).toMatch(/session\.user_id = auth\.uid\(\)/i)
    expect(sql).toMatch(/auth\.jwt\(\)\s*->>\s*'session_id'/i)
  })

  it("exposes only the boolean check to authenticated users", () => {
    expect(sql).toMatch(/revoke all on function public\.is_current_auth_session_valid\(\) from public/i)
    expect(sql).toMatch(/grant execute on function public\.is_current_auth_session_valid\(\) to authenticated/i)
  })

  it("is applied and verified by the production migration runner", () => {
    expect(listed).toContain("0030_individual_account_sessions.sql")
    expect(RUNNER).toMatch(/REQUIRED_FUNCTIONS = \[[^\]]*"is_current_auth_session_valid"[^\]]*\]/)
  })
})

describe("0031 — performance partner commissions", () => {
  const sql = sqlOf("0031_partner_commission_tiers.sql")

  it("persists the referral window and one idempotency key per Stripe invoice", () => {
    expect(sql).toMatch(/affiliate_referrals[\s\S]*commission_cycles/i)
    expect(sql).toMatch(/affiliate_commissions[\s\S]*stripe_invoice_id/i)
    expect(sql).toMatch(/unique index[\s\S]*stripe_invoice_id/i)
  })

  it("installs and verifies atomic click tracking", () => {
    expect(sql).toMatch(/create or replace function public\.increment_affiliate_click/i)
    expect(listed).toContain("0031_partner_commission_tiers.sql")
    expect(RUNNER).toMatch(/REQUIRED_FUNCTIONS = \[[^\]]*"increment_affiliate_click"[^\]]*\]/)
  })
})
