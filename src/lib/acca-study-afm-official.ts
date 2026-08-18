import type { StudyChapter } from "@/lib/acca-study-content"
import { AFM_TREE_AREA_A_PART1 } from "@/lib/acca-study-afm-tree-a"
import { AFM_TREE_AREA_A_PART2 } from "@/lib/acca-study-afm-tree-a2"
import { AFM_TREE_AREA_B_PART1 } from "@/lib/acca-study-afm-tree-b1"
import { AFM_TREE_AREA_B_PART2 } from "@/lib/acca-study-afm-tree-b2"
import { AFM_TREE_AREA_B_PART3 } from "@/lib/acca-study-afm-tree-b3"
import { AFM_TREE_AREA_B_PART4 } from "@/lib/acca-study-afm-tree-b4"
import { AFM_TREE_AREA_C_PART1 } from "@/lib/acca-study-afm-tree-c"
import { AFM_TREE_AREA_C_PART2 } from "@/lib/acca-study-afm-tree-c2"
import { AFM_TREE_AREA_D_PART1 } from "@/lib/acca-study-afm-tree-d"
import { AFM_TREE_AREA_E_PART1 } from "@/lib/acca-study-afm-tree-e1"
import { AFM_TREE_AREA_E_PART2 } from "@/lib/acca-study-afm-tree-e2"

/*
 * THE SHIM IS GONE. Until August 2026 this file was a relabelling layer: five
 * legacy chapters (AFM_A–AFM_E) were mapped 1:1 onto the official syllabus
 * areas, with Area A additionally given a new title. Those five chapters
 * carried the entire paper at ~12,000 words, against 37,000–40,000 for the
 * finished Strategic Professional papers, and six of Area A's syllabus
 * subsections shared a single chapter.
 *
 * AFM's shim differed from SBL's and SBR's in one useful respect: it was a
 * straight relabel rather than a `subset()` re-cut, so the area MAPPING was
 * already correct and the defect was depth alone. Every area is now an authored
 * tree and all five legacy files are deleted.
 *
 *   Area A  AFM-01..09  acca-study-afm-tree-a.ts, -a2.ts
 *   Area B  AFM-10..24  acca-study-afm-tree-b1.ts … -b4.ts
 *   Area C  AFM-25..30  acca-study-afm-tree-c.ts, -c2.ts
 *   Area D  AFM-31..34  acca-study-afm-tree-d.ts
 *   Area E  AFM-35..42  acca-study-afm-tree-e1.ts, -e2.ts
 *   Area F  professional skills (authored, below)
 *   Area G  employability and technology skills (authored, below)
 *
 * If you are adding to an area, add a chapter to that area's tree module — do
 * not reintroduce a helper that derives one area's content from another's.
 */

/* Area A is a nine-chapter authored tree, split across two modules for file
   size only. The shim served all six of its syllabus subsections — including
   international trade and finance, multinational planning and dividend
   capacity, which carry real technical marks — from one legacy chapter written
   mainly about the adviser's role and ethics. */
export const AFM_OFFICIAL_A: StudyChapter[] = [...AFM_TREE_AREA_A_PART1, ...AFM_TREE_AREA_A_PART2]

/* Area B is a fifteen-chapter authored tree, AFM-10..24, and the legacy splice
   is GONE — acca-study-afm-b.ts is deleted. The syllabus states that EVERY exam
   carries question(s) focused on B and E, so this was the area a candidate
   could least afford to meet as a shim, and it was one chapter of six sections
   covering NPV, APV, Modigliani-Miller, beta, real options and international
   appraisal between them.

     B1  discounted cash flow techniques      AFM-10..13
     B2  option pricing in investment         AFM-14..15
     B3  impact of financing (11 outcomes)    AFM-16..20
     B4  valuation and free cash flows        AFM-21..22
     B5  international investment and finance AFM-23..24 */
export const AFM_OFFICIAL_B: StudyChapter[] = [
  ...AFM_TREE_AREA_B_PART1,
  ...AFM_TREE_AREA_B_PART2,
  ...AFM_TREE_AREA_B_PART3,
  ...AFM_TREE_AREA_B_PART4,
]
/* Area C is a six-chapter authored tree, AFM-25..30, in two modules split for
   file size only. C1(f) — SPACs, direct listings, Dutch auctions and reverse
   takeovers — is a current-issues outcome that post-dates the 2020-21 provider
   texts, so AFM-26 is written from the syllabus alone. The boundary with Area
   B: B4 owns the valuation MODELS, this area owns the BID — synergy, the
   control premium, and how the financing choice divides the gain. */
export const AFM_OFFICIAL_C: StudyChapter[] = [...AFM_TREE_AREA_C_PART1, ...AFM_TREE_AREA_C_PART2]
/* Area D is a four-chapter authored tree, AFM-31..34. It is the smallest
   technical area — two subsections, five outcomes — but it carries the paper's
   only genuinely adversarial arithmetic, because every party to a
   reconstruction measures the scheme against its own alternative. AFM-32
   therefore teaches the better-off test as a comparison of columns, built from
   the liquidation waterfall, rather than as a definition. */
export const AFM_OFFICIAL_D: StudyChapter[] = AFM_TREE_AREA_D_PART1
/* Area E is an eight-chapter authored tree, AFM-35..42, in two modules split
   for file size only. With Area B it is one of the two areas the syllabus
   guarantees in EVERY sitting, and the legacy chapter covered treasury,
   interest rate hedging, currency hedging and value at risk in six sections
   between them.

   House rule for these chapters: every worked hedge is SETTLED, not merely set
   up — each runs through to an effective rate and is compared against the
   alternative, because a candidate who can size a hedge and cannot state the
   net cost once the outcome is known scores about half the marks. */
export const AFM_OFFICIAL_E: StudyChapter[] = [...AFM_TREE_AREA_E_PART1, ...AFM_TREE_AREA_E_PART2]

export const AFM_OFFICIAL_F: StudyChapter = {
  paper: "AFM", area: "F", title: "Professional skills", minutes: 16,
  intro: "AFM marks the quality of senior advice as well as the calculation: communicate for the recipient, analyse relationships, challenge assumptions and recommend a commercially viable course.",
  outcomes: ["Communicate in the requested professional format", "Analyse and evaluate financial and strategic evidence", "Apply professional scepticism to claims and assumptions", "Demonstrate commercial acumen in recommendations"],
  sections: [{ id: "professional-advice", heading: "From financial model to board decision", blocks: [
    { kind: "table", caption: "Four professional-skill lenses", head: ["Skill", "Observable evidence"], rows: [["Communication", "Purposeful structure, relevant tone, clear findings and action"], ["Analysis and evaluation", "Relationships, quantified consequences, balanced alternatives and judgement"], ["Scepticism", "Challenge assumptions, identify bias and seek sufficient evidence"], ["Commercial acumen", "Integrate value with funding, strategy, operations, stakeholders and feasibility"]] },
    { kind: "text", md: "A technically correct NPV or hedge is an **input**, not a recommendation. Explain what drives it, how fragile it is, whether the organisation can finance and implement it, and what conditions or controls should attach to approval." },
    { kind: "example", title: "Acquisition under pressure", scenario: "Management's proposed acquisition creates value only if volume rises 18%, while debt funding leaves little covenant headroom.", steps: [{ label: "Analyse", detail: "Separate stand-alone value, control premium and forecast synergy." }, { label: "Challenge", detail: "Test the 18% assumption, integration costs and break-even synergy." }, { label: "Evaluate", detail: "Model liquidity and covenant downside alongside strategic fit." }, { label: "Advise", detail: "Recommend rejection, renegotiation or conditional approval with quantified limits." }], result: "The board receives a defensible decision, not a repeated management forecast." },
  ] }],
  examTraps: [{ trap: "Giving a recommendation from one headline number.", fix: "Evaluate assumptions, financeability, risk and strategic consequences." }, { trap: "Listing professional skills.", fix: "Demonstrate them through evidence-led analysis and tailored communication." }],
  keyTerms: [{ term: "Professional scepticism", def: "An enquiring mind that challenges assertions and seeks sufficient evidence before accepting conclusions." }, { term: "Commercial acumen", def: "Judgement that connects financial evidence to the organisation, market, stakeholders and practical feasibility." }],
  summary: ["Write for the specified recipient and purpose.", "Analyse drivers and alternatives, not only outputs.", "Challenge optimistic or incomplete evidence.", "Recommend a viable action with conditions and consequences."],
}

export const AFM_OFFICIAL_G: StudyChapter = {
  paper: "AFM", area: "G", title: "Employability and technology skills", minutes: 14,
  intro: "The digital workspace should make complex finance controllable: validated evidence, transparent models, consistent scenarios and decision-ready presentation.",
  outcomes: ["Navigate requirements and exhibits efficiently", "Build transparent valuation and risk models", "Control multi-currency and multi-period evidence", "Present analysis professionally with digital tools"],
  sections: [{ id: "digital-finance", heading: "Controlled digital financial advice", blocks: [
    { kind: "text", md: "Map each requirement to its recipient, verb, output and exhibits. Before combining inputs, validate **dates, currencies, units, tax bases and nominal/real assumptions**. Separate model inputs, calculations and outputs so sensitivities remain consistent and reviewable." },
    { kind: "table", caption: "Model controls", head: ["Control", "Purpose"], rows: [["Input sheet", "Visible assumptions, sources and units"], ["Linked calculations", "Consistent changes without hidden hard-coding"], ["Base/downside comparison", "Transparent risk and decision thresholds"], ["Reconciliation", "Bridge enterprise/equity value, NPV/APV or exposure/hedge result"], ["Output summary", "Relevant findings, limitations and actions for the recipient"]] },
  ] }],
  examTraps: [{ trap: "Mixing currencies or nominal and real inputs.", fix: "Validate and label the basis before modelling." }, { trap: "Showing calculations without decision meaning.", fix: "Translate model effects into risks, choices and recommendations." }],
  keyTerms: [{ term: "Model integrity", def: "Consistency, traceability and reviewability across assumptions, calculations, scenarios and outputs." }],
  summary: ["Start from the requirement and evidence map.", "Validate every input basis.", "Keep models linked, labelled and reconciled.", "Present decision meaning, not spreadsheet volume."],
}
