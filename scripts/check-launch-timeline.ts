/*
 * Print what a visitor actually sees at each instant of the launch plan.
 *
 * The two gates are date-driven so that neither announcement depends on a
 * same-day code edit. That is only reassuring if the dates are right, so this
 * renders the timeline as a table: run it before announcing anything.
 *
 *   npx tsx --tsconfig tsconfig.app.json scripts/check-launch-timeline.ts
 */
import {
  isPrelaunchAt,
  isPartnerProgramVisibleAt,
  LAUNCH_DATE_ISO,
  PARTNER_LAUNCH_DATE_ISO,
} from "@/lib/launch"

const MINUTE = 60_000

const MOMENTS: { label: string; at: number }[] = [
  { label: "now", at: Date.now() },
  { label: "1 min BEFORE partner date", at: Date.parse(PARTNER_LAUNCH_DATE_ISO) - MINUTE },
  { label: "partner date (8 Aug 00:00 +05)", at: Date.parse(PARTNER_LAUNCH_DATE_ISO) },
  { label: "1 min AFTER partner date", at: Date.parse(PARTNER_LAUNCH_DATE_ISO) + MINUTE },
  { label: "1 min BEFORE launch", at: Date.parse(LAUNCH_DATE_ISO) - MINUTE },
  { label: "launch (10 Aug 00:00 +05)", at: Date.parse(LAUNCH_DATE_ISO) },
  { label: "1 min AFTER launch", at: Date.parse(LAUNCH_DATE_ISO) + MINUTE },
]

const tashkent = (ms: number) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tashkent",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(ms))

const rows = MOMENTS.map(({ label, at }) => {
  const prelaunch = isPrelaunchAt(at)
  const partner = isPartnerProgramVisibleAt(at)
  return {
    moment: label,
    tashkent: tashkent(at),
    // "/" renders Waitlist while prelaunch is on (for anyone but the admin).
    homepage: prelaunch ? "Waitlist" : "Landing",
    partnerLink: partner ? "VISIBLE" : "hidden",
    // The auth routes need ?team=1 while the gate is up.
    signIn: prelaunch ? "team-only" : "open",
    pricing: prelaunch ? "admin only" : "open",
  }
})

const pad = (v: string, w: number) => v.padEnd(w)
const W = { moment: 32, tashkent: 22, homepage: 9, partnerLink: 12, signIn: 10, pricing: 10 }
console.log(
  pad("MOMENT", W.moment) + pad("TASHKENT", W.tashkent) + pad('"/"', W.homepage) +
    pad("PARTNER", W.partnerLink) + pad("SIGN-IN", W.signIn) + "PRICING",
)
console.log("-".repeat(Object.values(W).reduce((a, b) => a + b, 0) + 7))
for (const r of rows) {
  console.log(
    pad(r.moment, W.moment) + pad(r.tashkent, W.tashkent) + pad(r.homepage, W.homepage) +
      pad(r.partnerLink, W.partnerLink) + pad(r.signIn, W.signIn) + r.pricing,
  )
}

/* The plan, asserted. Each of these is a promise made to an audience. */
const problems: string[] = []
const atPartner = Date.parse(PARTNER_LAUNCH_DATE_ISO)
const atLaunch = Date.parse(LAUNCH_DATE_ISO)

if (!isPartnerProgramVisibleAt(atPartner))
  problems.push("Partner link is NOT visible on the partner date — the 8 August social posts would point at a page without it.")
if (isPartnerProgramVisibleAt(atPartner - MINUTE))
  problems.push("Partner link is visible BEFORE the partner date — the programme leaks early.")
if (!isPrelaunchAt(atPartner))
  problems.push("The product is already open on the partner date — the partner link would sit on the Landing page, not the Waitlist.")
if (isPrelaunchAt(atLaunch))
  problems.push("The product is still gated at the launch instant — visitors would see the waitlist on launch day.")
if (!isPartnerProgramVisibleAt(atLaunch))
  problems.push("Partner link disappears at launch — it must stay after being announced.")
if (atPartner >= atLaunch) problems.push("The partner date is not before the launch date.")

console.log("")
if (problems.length) {
  console.log(`X ${problems.length} problem(s) with the launch timeline:`)
  for (const p of problems) console.log(`  - ${p}`)
  process.exit(1)
}
console.log("OK  8 Aug: waitlist + partner link.  10 Aug: landing, app and pricing open, partner link stays.")
