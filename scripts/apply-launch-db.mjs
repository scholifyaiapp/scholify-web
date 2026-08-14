import fs from "node:fs/promises"
import postgres from "postgres"

const production = process.env.VERCEL_ENV === "production"
const databaseUrl = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL

if (!production) {
  console.log("Launch database migrations: skipped outside Vercel production")
  process.exit(0)
}
if (!databaseUrl) throw new Error("Production database URL is missing; refusing an incomplete deployment")

/*
 * Every migration listed here runs on EVERY production build, so each one must be
 * safe to re-apply: DDL uses `if not exists`, and any data migration guards itself
 * (see the do-block in 0029, which gates its one-time backfill on the column
 * default it installs). Adding a migration that is not re-runnable to this list
 * will corrupt data slowly, one deploy at a time.
 */
const MIGRATIONS = [
  "0026_practice_reminders.sql",
  "0028_affiliate_payout_reference.sql",
  "0029_day_completion_email.sql",
  "0030_individual_account_sessions.sql",
]

/*
 * Columns the app's code paths REQUIRE. Verified after applying, so a migration
 * that silently no-ops fails the deploy instead of shipping a build whose emails
 * quietly stop sending.
 */
const REQUIRED_COLUMNS = {
  study_reminders: [
    "timezone",
    "practice_time",
    "lead_on",
    "soon_on",
    "catchup_on",
    "sent_lead_date",
    "sent_soon_date",
    "sent_catchup_date",
    // 0029 — the exactly-once guard for the day-completion congratulation email.
    "sent_done_date",
  ],
  affiliate_commissions: ["payout_reference"],
}

const REQUIRED_FUNCTIONS = ["is_current_auth_session_valid"]

const sql = postgres(databaseUrl, { max: 1, ssl: "require", connect_timeout: 20 })
try {
  for (const name of MIGRATIONS) {
    const migration = await fs.readFile(new URL(`../supabase/migrations/${name}`, import.meta.url), "utf8")
    await sql.begin(async (tx) => tx.unsafe(migration))
    console.log(`Launch database migration applied: ${name}`)
  }

  const tables = Object.keys(REQUIRED_COLUMNS)
  const wanted = Object.values(REQUIRED_COLUMNS).flat()
  const rows = await sql`
    select table_name, column_name
      from information_schema.columns
     where table_schema = 'public'
       and table_name = any(${tables})
       and column_name = any(${wanted})
  `
  // Name what is MISSING rather than reporting a count mismatch: "expected 10,
  // found 9" sends whoever is on the deploy hunting through three migrations.
  const found = new Set(rows.map((r) => `${r.table_name}.${r.column_name}`))
  const missing = Object.entries(REQUIRED_COLUMNS).flatMap(([table, columns]) =>
    columns.filter((column) => !found.has(`${table}.${column}`)).map((column) => `${table}.${column}`),
  )
  if (missing.length > 0) {
    throw new Error(`Launch schema verification failed — missing: ${missing.join(", ")}`)
  }

  const functionRows = await sql`
    select routine_name
      from information_schema.routines
     where routine_schema = 'public'
       and routine_name = any(${REQUIRED_FUNCTIONS})
  `
  const foundFunctions = new Set(functionRows.map((row) => row.routine_name))
  const missingFunctions = REQUIRED_FUNCTIONS.filter((name) => !foundFunctions.has(name))
  if (missingFunctions.length > 0) {
    throw new Error(`Launch schema verification failed — missing functions: ${missingFunctions.join(", ")}`)
  }
  console.log(`Launch database schema verified: ${found.size} columns and ${foundFunctions.size} security function present`)
} finally {
  await sql.end({ timeout: 5 })
}
