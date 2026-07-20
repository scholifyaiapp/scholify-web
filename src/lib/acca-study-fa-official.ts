import type { StudyChapter, StudySection } from "@/lib/acca-study-content"
import { FA_A } from "@/lib/acca-study-fa-a"
import { FA_B } from "@/lib/acca-study-fa-b"
import { FA_C } from "@/lib/acca-study-fa-c"
import { FA_D } from "@/lib/acca-study-fa-d"
import { FA_E } from "@/lib/acca-study-fa-e"
import { FA_F } from "@/lib/acca-study-fa-f"
import { FA_G } from "@/lib/acca-study-fa-g"
import { FA_H } from "@/lib/acca-study-fa-h"

function sections(ids: string[]): StudySection[] {
  return ids.map((id) => {
    const section = FA_E.sections.find((item) => item.id === id)
    if (!section) throw new Error(`FA migration: missing section ${id}`)
    return section
  })
}

export const FA_OFFICIAL_A: StudyChapter = {
  ...FA_A,
  sections: [...FA_A.sections, {
    id: "regulation-governance",
    heading: "Regulation, sustainability reporting and governance",
    blocks: [
      { kind: "text", md: "The IFRS Foundation provides the institutional framework. The IASB issues IFRS Accounting Standards; the IFRS Interpretations Committee supports consistent application; the IFRS Advisory Council advises; and the ISSB issues global sustainability-disclosure standards. These roles are distinct from management's responsibility for the entity's financial statements." },
      { kind: "text", md: "Those charged with governance oversee the reporting process. Directors must maintain adequate records and controls, select and apply appropriate policies and estimates, assess going concern, approve statements that faithfully represent the entity, and guard against material misstatement from error or fraud." },
    ],
  }],
}
export const FA_OFFICIAL_B = FA_B
export const FA_OFFICIAL_C = FA_C
export const FA_OFFICIAL_D: StudyChapter = {
  ...FA_D,
  sections: [...FA_D.sections, {
    id: "intangibles-finance-capital",
    heading: "Intangibles, capital structure and finance costs",
    blocks: [
      { kind: "text", md: "An identifiable intangible asset lacks physical substance but is controlled and expected to generate benefits. Purchased intangibles are initially measured at cost. Research expenditure is expensed; development expenditure is capitalised only when the specified technical, commercial, resource and measurement criteria are demonstrated. Finite-life intangibles are amortised systematically." },
      { kind: "text", md: "Ordinary shares form equity; a share premium records proceeds above nominal value. A rights issue raises cash from existing shareholders, while bonus shares capitalise reserves without raising cash. Loan interest is a finance cost accrued to the period, separately from repayment of principal." },
    ],
  }],
}

export const FA_OFFICIAL_E: StudyChapter = {
  ...FA_E,
  area: "E",
  title: "Reconciliations",
  minutes: 22,
  intro: "Reconciliations explain differences between independently maintained records, correct errors in the appropriate record and establish a reliable balance.",
  outcomes: [
    "Prepare and explain bank reconciliations and the corrected bank general ledger balance",
    "Reconcile payables ledger information to supplier statements and control information",
  ],
  sections: sections(["control-accounts", "bank-rec"]),
}

export const FA_OFFICIAL_F: StudyChapter = {
  ...FA_E,
  area: "F",
  title: "Preparing a trial balance",
  minutes: 24,
  sections: sections(["what-is-tb", "errors-no-effect", "errors-and-suspense"]),
}

export const FA_OFFICIAL_G: StudyChapter = {
  ...FA_F,
  area: "G",
  title: "Preparing financial statements",
  sections: [...FA_F.sections, {
    id: "ifrs18-cashflows-events-incomplete",
    heading: "IFRS 18 presentation, cash flows, events and incomplete records",
    blocks: [
      { kind: "text", md: "For the 2025–26 FA syllabus, IFRS 18 presentation formats are examinable and IAS 1 is no longer examinable. At this level, focus on the prescribed statement structure and subtotals; management-defined performance measures are explicitly outside scope." },
      { kind: "text", md: "A statement of cash flows classifies cash movements as operating, investing and financing. Under the indirect approach, reconcile profit to cash from operating activities by removing non-cash items, non-operating gains or losses and working-capital movements before income taxes." },
      { kind: "text", md: "Adjusting events after the reporting period provide evidence about conditions existing at year end and change the statements. Material non-adjusting events arise from later conditions and are disclosed when omission could influence users." },
      { kind: "formula", name: "Missing figure from incomplete records", expr: "derive through the accounting equation, ledger control accounts, cash/bank summaries or gross-profit relationships" },
      { kind: "callout", tone: "warn", title: "Reconstruct—do not guess", md: "For incomplete records, build the relevant control account or equation, insert known opening, closing and movement figures with correct signs, then solve and cross-check the result against another relationship." },
    ],
  }],
}
export const FA_OFFICIAL_H: StudyChapter = { ...FA_G, area: "H", title: "Preparing basic consolidated financial statements" }
export const FA_OFFICIAL_I: StudyChapter = { ...FA_H, area: "I", title: "Interpretation of financial statements" }
