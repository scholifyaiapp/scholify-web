import type { StudyChapter } from "@/lib/acca-study-content"
import { SBR_TREE_AREA_A } from "@/lib/acca-study-sbr-tree-a"
import { SBR_TREE_AREA_B } from "@/lib/acca-study-sbr-tree-b"
import { SBR_TREE_AREA_C1 } from "@/lib/acca-study-sbr-tree-c1"
import { SBR_TREE_AREA_C2 } from "@/lib/acca-study-sbr-tree-c2"
import { SBR_TREE_AREA_C3 } from "@/lib/acca-study-sbr-tree-c3"
import { SBR_TREE_AREA_D } from "@/lib/acca-study-sbr-tree-d"
import { SBR_TREE_AREA_E } from "@/lib/acca-study-sbr-tree-e"
import { SBR_E } from "@/lib/acca-study-sbr-e"

const select = (base: StudyChapter, area: string, title: string, ids: string[], intro: string): StudyChapter => ({ ...base, area, title, intro, sections: base.sections.filter((section) => ids.includes(section.id)) })

/* Area A is a three-chapter authored tree — see acca-study-sbr-tree-a.ts. The
   shim served this area (twenty guaranteed marks: question two always pairs
   reporting implications with ethical implications) from ONE section of the
   legacy conceptual-framework chapter. */
export const SBR_OFFICIAL_A = SBR_TREE_AREA_A
/* Area B is a five-chapter authored tree — see acca-study-sbr-tree-b.ts. B1's
   five learning outcomes span standard-setting, useful information, elements
   and recognition, measurement, and P&L-versus-OCI — previously five sections
   of the legacy framework chapter relabelled wholesale. */
export const SBR_OFFICIAL_B = SBR_TREE_AREA_B
/* Area C is a sixteen-chapter authored tree in three modules (SBR-09..24):
   revenue and non-current assets (c1), instruments, leases and employee
   benefits (c2), and tax through other reporting issues (c3). The spliced
   legacy chapter that once served the whole area — legacy performance and
   instruments chapters relabelled wholesale — is retired, and the legacy
   files acca-study-sbr-b.ts and acca-study-sbr-d.ts are deleted. */
export const SBR_OFFICIAL_C: StudyChapter[] = [...SBR_TREE_AREA_C1, ...SBR_TREE_AREA_C2, ...SBR_TREE_AREA_C3]
/* Area D is a seven-chapter authored tree (SBR-25..31) — see
   acca-study-sbr-tree-d.ts. Question one's thirty marks examine this area
   every sitting; the shim served it with one relabelled legacy chapter.
   The legacy file acca-study-sbr-c.ts is deleted. */
export const SBR_OFFICIAL_D = SBR_TREE_AREA_D
/* Area E is a three-chapter authored tree (SBR-32..34) — see
   acca-study-sbr-tree-e.ts. The shim built this area from the legacy
   interpretation chapter minus its current-issues section, plus the
   commentary section lifted from the legacy framework chapter — whose file,
   acca-study-sbr-a.ts, is now unreferenced and deleted. */
export const SBR_OFFICIAL_E = SBR_TREE_AREA_E
export const SBR_OFFICIAL_F = select(SBR_E, "F", "The impact of changes and potential changes in accounting regulation", ["current-issues"], "Evaluate new standards and contemporary reporting issues, including digital assets, climate-related matters, global events, IFRS Sustainability Disclosure Standards and their relationship with ESRS.")

export const SBR_OFFICIAL_G: StudyChapter = {
  paper: "SBR", area: "G", title: "Employability and technology skills", minutes: 15,
  intro: "SBR digital competence means controlling evidence and calculations in the computer-based workspace, then presenting technically sound advice that a stakeholder can use.",
  outcomes: ["Navigate requirements and exhibits efficiently", "Prepare traceable spreadsheet adjustments", "Reconcile conflicting financial and non-financial information", "Present professional stakeholder-focused responses"],
  sections: [{ id: "digital-workspace", heading: "Requirement-led digital reporting", blocks: [
    { kind: "text", md: "Start with the **stakeholder, task verb and required output**. Map relevant exhibits before drafting. Validate entity, period, currency and definitions whenever sources conflict; software speed cannot repair a flawed basis." },
    { kind: "table", caption: "Digital controls", head: ["Action", "Professional result"], rows: [["Label each adjustment", "A reviewer can trace the standard, assumption and amount"], ["Link workings", "Changed inputs flow through without inconsistent hard-coding"], ["Reconcile totals", "The adjusted statement remains internally consistent"], ["Use purposeful headings", "Technical analysis answers the specified requirement"], ["State uncertainty", "Advice distinguishes evidence from assumption"]] },
    { kind: "example", title: "Conflicting group data", scenario: "A narrative says an acquisition occurred on 1 January, but the spreadsheet uses 1 April and a different currency scale.", steps: [{ label: "Validate", detail: "Confirm reporting date, acquisition date, entity and units from authoritative exhibits." }, { label: "Control", detail: "Record the chosen basis and keep alternative effects visible if unresolved." }, { label: "Calculate", detail: "Use labelled group adjustments and reconcile the consolidated statement." }, { label: "Advise", detail: "Explain both the reporting effect and why it matters to the named stakeholder." }], result: "The response is technically traceable and decision-useful rather than merely well formatted." },
  ] }],
  examTraps: [{ trap: "Reading exhibits without first analysing the requirement.", fix: "Map stakeholder, verb, output and evidence before drafting." }, { trap: "Hard-coding unexplained spreadsheet totals.", fix: "Use labelled workings and reconciliation checks." }],
  keyTerms: [{ term: "Traceable working", def: "A labelled calculation whose inputs, assumptions and effect can be followed and reviewed." }, { term: "Requirement map", def: "A compact link between the required task, stakeholder, output and relevant evidence." }],
  summary: ["Navigate from requirement to evidence.", "Validate the basis before calculating.", "Make group adjustments traceable and reconciled.", "Translate technical effects into stakeholder consequences."],
}
