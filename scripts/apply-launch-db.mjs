import fs from "node:fs/promises"
import postgres from "postgres"

const production = process.env.VERCEL_ENV === "production"
const databaseUrl = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL

if (!production) {
  console.log("Launch database migrations: skipped outside Vercel production")
  process.exit(0)
}
if (!databaseUrl) throw new Error("Production database URL is missing; refusing an incomplete deployment")

const sql = postgres(databaseUrl, { max: 1, ssl: "require", connect_timeout: 20 })
try {
  for (const name of ["0026_practice_reminders.sql", "0028_affiliate_payout_reference.sql"]) {
    const migration = await fs.readFile(new URL(`../supabase/migrations/${name}`, import.meta.url), "utf8")
    await sql.begin(async (tx) => tx.unsafe(migration))
    console.log(`Launch database migration applied: ${name}`)
  }

  const columns = await sql`
    select table_name, column_name
      from information_schema.columns
     where table_schema = 'public'
       and ((table_name = 'study_reminders' and column_name in
         ('timezone','practice_time','lead_on','soon_on','catchup_on','sent_lead_date','sent_soon_date','sent_catchup_date'))
         or (table_name = 'affiliate_commissions' and column_name = 'payout_reference'))
  `
  if (columns.length !== 9) throw new Error(`Launch schema verification failed: expected 9 columns, found ${columns.length}`)
  console.log("Launch database schema verified: reminders and payout references ready")
} finally {
  await sql.end({ timeout: 5 })
}
