import type { TopicBrief } from "@/lib/acca-briefs"
import { AAFM_BRIEFS } from "@/lib/acca-briefs-aafm"

export const AA_OFFICIAL_BRIEFS: TopicBrief[] = [
  ...AAFM_BRIEFS.filter((brief) => brief.paper === "AA"),
  { paper: "AA", area: "F", title: "Employability and technology skills", minutes: 5, sections: [
    { kind: "concept", heading: "Technology scales audit work, not judgement", body: "Analytics can test every transaction and expose patterns that sampling may miss. It only becomes evidence when the source population and query are validated, exceptions are investigated and the conclusion is documented." },
    { kind: "structure", heading: "Digital audit workflow", body: "Define the assertion and objective.\nConfirm entity, period and source.\nReconcile completeness and control totals.\nValidate the query or formula.\nRun the test and retain the output.\nInvestigate exceptions.\nConclude and obtain review sign-off." },
    { kind: "example", heading: "Out-of-hours journals", body: "A query finds 40 journals posted at weekends. This is not 40 misstatements. Reconcile the journal population, verify the time-field logic, identify authorised operational reasons, inspect support for genuinely unusual items and conclude on management override risk." },
    { kind: "traps", heading: "Common failures", body: "Testing an incomplete extraction.\nConfusing an exception with an error.\nUsing hidden or hard-coded spreadsheet logic.\nFailing to preserve versions and reviewer sign-off.\nReporting a deficiency without explaining risk and recommendation." },
  ] },
]
