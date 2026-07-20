import type { StudyChapter } from "@/lib/acca-study-content"
import { AA_A } from "@/lib/acca-study-aa-a"
import { AA_B } from "@/lib/acca-study-aa-b"
import { AA_C } from "@/lib/acca-study-aa-c"
import { AA_D } from "@/lib/acca-study-aa-d"
import { AA_E } from "@/lib/acca-study-aa-e"

export const AA_OFFICIAL_A = AA_A
export const AA_OFFICIAL_B = AA_B
export const AA_OFFICIAL_C = AA_C
export const AA_OFFICIAL_D = AA_D
export const AA_OFFICIAL_E = AA_E
export const AA_OFFICIAL_F: StudyChapter = {
  paper: "AA", area: "F", title: "Employability and technology skills", minutes: 17,
  intro: "Digital audit tools can test entire populations, but professional assurance still depends on controlled data, documented logic, sceptical investigation and a clear conclusion.",
  outcomes: ["Validate and navigate digital audit information", "Use spreadsheet and analytics functions with an audit trail", "Document procedures and conclusions professionally", "Present control findings and audit results effectively"],
  sections: [
    { id: "data", heading: "From client data to reliable audit evidence", blocks: [
      { kind: "text", md: "Before running a test, confirm the **entity, period, source system, fields and population**. Reconcile record counts and control totals to the general ledger. A sophisticated query over incomplete data produces a sophisticated wrong answer." },
      { kind: "diagram", diagram: { type: "flow", title: "Controlled analytics", data: { steps: ["Define audit objective", "Extract and reconcile population", "Validate query logic", "Run test", "Investigate exceptions", "Conclude and document"] } } },
      { kind: "callout", tone: "warn", title: "Exception is not error", md: "An unusual journal or duplicate payment indicator directs audit attention. It does not prove fraud or misstatement until investigated and corroborated." },
      { kind: "table", caption: "Useful automated tests", head: ["Test", "Audit use", "Control needed"], rows: [["Sequence gaps/duplicates", "Completeness or duplicate processing", "Confirm legitimate cancelled numbers"], ["Out-of-hours journals", "Management-override risk", "Investigate user, authority and support"], ["Receivable ageing", "Expected-credit-loss evidence", "Validate dates and subsequent receipts"], ["Full-population recalculation", "Accuracy", "Validate formula, fields and rounding"]] },
    ] },
    { id: "documentation", heading: "Reviewable electronic working papers and communication", blocks: [
      { kind: "text", md: "A working paper should state the **objective, source and population, procedure, result, exceptions and conclusion**, with preparer and reviewer evidence. Preserve versions, access permissions and cross-references so another experienced auditor can understand what was done and why." },
      { kind: "example", title: "Communicating a control deficiency", scenario: "The same user can create suppliers and release payments; analytics identifies three new suppliers paid within 24 hours of creation.", steps: [{ label: "Condition and criterion", detail: "Supplier creation and payment release are not segregated." }, { label: "Consequence", detail: "Unauthorised suppliers and payments may be created without independent prevention." }, { label: "Recommendation", detail: "Separate roles and require independent approval of new suppliers before payment." }, { label: "Evidence", detail: "Investigate the three exceptions; do not present them as fraud without corroboration." }], result: "The finding is specific, evidence-led and actionable." },
    ] },
  ],
  examTraps: [{ trap: "Treating analytics output as conclusive evidence.", fix: "Validate the population and query, then investigate and corroborate exceptions." }, { trap: "Writing 'checked, okay' in the audit file.", fix: "Document the procedure, evidence, result and conclusion so an experienced auditor can review it." }],
  keyTerms: [{ term: "Audit trail", def: "Traceable evidence linking source data, procedure, result, conclusion and review." }, { term: "Exception", def: "An item meeting defined unusual criteria that requires investigation." }],
  summary: ["Control the data before using the tool.", "Automated exceptions require sceptical investigation.", "Document enough for an experienced auditor to reperform or understand the work.", "Communicate findings clearly and proportionately."],
}
