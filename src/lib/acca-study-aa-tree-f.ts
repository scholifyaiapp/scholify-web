import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AA · Area F — employability and technology skills.
 *
 * The twin of FM's Area H, and the other of the only two chapters across F1–F9
 * that a quality sweep found without syllabusRefs, an inline check or a
 * knowledge diagnostic. Both were legacy bodies left in place while the rest of
 * their paper was rebuilt.
 *
 * ACCA examines this through the CBE itself, so the chapter teaches the working
 * method a reviewer can see: a population that has been validated, a working
 * paper another auditor could re-perform, and a finding written so management
 * can act on it.
 */

const AA_TREE_23: StudyChapter = {
  paper: "AA",
  id: "AA-23",
  number: 23,
  area: "F",
  syllabusRefs: ["F1(a)", "F2(a)", "F3(a)", "F4(a)"],
  title: "Employability and technology skills",
  minutes: 16,
  intro:
    "Data analytics can test an entire population in seconds. It can also produce a confident wrong answer in seconds, which is why the discipline around it is the examinable part.",
  outcomes: [
    "Validate a population before testing it",
    "Use analytics appropriately and interpret exceptions",
    "Prepare working papers another auditor could review",
    "Communicate findings so management can act",
  ],
  sections: [
    {
      id: "validate",
      heading: "From client data to reliable evidence",
      blocks: [
        {
          kind: "text",
          md: "Before running any test, establish what you actually have: the **entity, the period, the source system, the fields and the population**. Reconcile record counts and control totals to the general ledger. A sophisticated query over an incomplete extract produces a sophisticated wrong answer, and nothing in the output will tell you.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Controlled analytics",
            data: {
              steps: [
                { label: "Define the objective", sub: "which assertion is this testing?" },
                { label: "Extract and reconcile", sub: "agree counts and totals to the ledger" },
                { label: "Validate the logic", sub: "test the query on known data first" },
                { label: "Run and investigate", sub: "exceptions are leads, not conclusions" },
                { label: "Conclude and document", sub: "against the objective you started with" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "warn",
          title: "An exception is not an error",
          md: "A duplicate payment indicator, an out-of-hours journal or a gap in an invoice sequence **directs audit attention**. It does not prove fraud or misstatement until it has been investigated and corroborated. Reporting exceptions as findings, without investigation, is the fastest way to lose credibility with a client.",
        },
        {
          kind: "table",
          caption: "Useful automated tests, and what each still needs",
          head: ["Test", "Audit use", "What you must still confirm"],
          rows: [
            ["Sequence gaps and duplicates", "Completeness; duplicate processing", "Whether the gaps are legitimately cancelled documents"],
            ["Journals posted out of hours", "Management override risk", "The user, their authority, and the supporting evidence"],
            ["Receivables ageing recalculated", "Expected credit loss evidence", "That invoice dates and subsequent receipts are accurate"],
            ["Full-population recalculation of depreciation", "Accuracy", "The formula, the fields used, and rounding treatment"],
          ],
        },
      ],
      check: {
        q: "Audit software identifies 40 payments to suppliers created in the previous 24 hours. What is the correct next step?",
        options: [
          "Report 40 instances of suspected fraud to the audit committee",
          "Investigate the 40 items — who created them, what authorised them, whether the goods exist",
          "Conclude that controls over supplier creation are effective",
          "Extend the query to the whole population",
        ],
        correct: 1,
        explain:
          "These are exceptions: they direct attention and prove nothing yet. Investigation and corroboration come before any conclusion, and certainly before an allegation. The query has done its job by narrowing 100,000 payments to 40.",
      },
    },
    {
      id: "working-papers",
      heading: "Working papers another auditor could review",
      blocks: [
        {
          kind: "text",
          md: "The ISA 230 test from AA-10 applies just as much to a spreadsheet as to a manual schedule: an **experienced auditor with no previous connection** to the engagement must be able to understand what was done and why.",
        },
        {
          kind: "list",
          style: "number",
          title: "What every working paper states",
          items: [
            "**The objective** — which assertion, on which balance.",
            "**The source and the population** — system, period, record count, and how it was reconciled.",
            "**The procedure** — including how the sample was selected and why that method.",
            "**The result**, including every exception found, not only the ones that mattered.",
            "**The conclusion**, expressed against the objective stated at the top.",
            "**Preparer and reviewer**, with dates.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "\"Checked — satisfactory\" is not a working paper",
          md: "It records neither what was checked, nor against what, nor what would have counted as unsatisfactory. If the file could not be defended to a regulator or in court, the work is treated as not having been done — however carefully it was actually performed.",
        },
      ],
      check: {
        q: "What is the standard a working paper must meet?",
        options: [
          "The engagement partner can follow it",
          "An experienced auditor with no previous connection to the audit can understand the work, results and conclusions",
          "It follows the firm's template",
          "The client agrees with it",
        ],
        correct: 1,
        explain:
          "ISA 230 deliberately sets an outsider as the benchmark — someone with audit experience but no knowledge of this engagement. That is what makes a file reviewable by a regulator, a court, or a successor firm.",
      },
    },
    {
      id: "communicating",
      heading: "Communicating what you found",
      blocks: [
        {
          kind: "example",
          title: "A control deficiency, written so it can be acted on",
          scenario:
            "The same user can create suppliers and release payments. Analytics identifies three new suppliers paid within 24 hours of creation.",
          steps: [
            { label: "Condition", detail: "Supplier creation and payment release are not segregated, and no independent review of new suppliers exists." },
            { label: "Consequence", detail: "Fictitious suppliers could be created and paid, misappropriating cash and overstating purchases and payables, potentially undetected for a long period." },
            { label: "Recommendation", detail: "Restrict supplier creation to a separate individual; require independent approval of new suppliers before any payment; circulate a monthly report of new suppliers to the financial controller for review." },
            { label: "Evidence discipline", detail: "Investigate the three exceptions before reporting them; do not present them as fraud without corroboration." },
          ],
          result:
            "Specific, evidence-led and actionable — the same deficiency / implication / recommendation structure as AA-14, with the analytics supplying the evidence rather than replacing the judgement.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The technology changes the evidence, not the standard",
          md: "Testing 100% of a population removes sampling risk for that test. It removes nothing else: the population still has to be complete, the query still has to be right, the exceptions still have to be investigated, and the conclusion is still the auditor's professional judgement.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Treating analytics output as conclusive evidence.", fix: "Validate the population and the query, then investigate and corroborate every exception." },
    { trap: "Writing \"checked, okay\" in the file.", fix: "Objective, source and population, procedure, result, conclusion, preparer and reviewer." },
    { trap: "Reporting exceptions as fraud.", fix: "An exception directs attention; an allegation needs corroborated evidence." },
    { trap: "Claiming full-population testing removes the need for judgement.", fix: "It removes sampling risk only — completeness, query logic and interpretation all remain." },
  ],
  keyTerms: [
    { term: "Audit trail", def: "Traceable evidence linking source data, procedure, result, conclusion and review." },
    { term: "Exception", def: "An item meeting defined unusual criteria, requiring investigation before any conclusion." },
    { term: "Population validation", def: "Confirming the extract is complete and agrees to the ledger before testing it." },
  ],
  summary: [
    "Validate the entity, period, source, fields and population before any test.",
    "Reconcile record counts and control totals to the ledger.",
    "An exception directs attention; it is not a finding until investigated.",
    "Working papers must satisfy an experienced auditor with no prior connection.",
    "Full-population testing removes sampling risk and nothing else.",
  ],
  knowledgeDiagnostic: [
    { q: "What must be confirmed about a data extract before testing it?", a: "The entity, period, source system, fields and completeness of the population — reconciled by record count and control totals to the general ledger." },
    { q: "Why is an exception not a finding?", a: "It meets an unusual criterion and directs audit attention, but proves nothing until investigated and corroborated." },
    { q: "What does testing an entire population remove, and what does it not?", a: "It removes sampling risk for that test. It does not remove the need for a complete population, correct query logic, investigation of exceptions, or professional judgement." },
  ],
  furtherStudy: [
    "AA-10 sets the ISA 230 documentation standard this chapter applies to electronic files.",
    "AA-14 supplies the deficiency, implication and recommendation structure used here.",
  ],
}

export const AA_TREE_AREA_F: StudyChapter[] = [AA_TREE_23]
