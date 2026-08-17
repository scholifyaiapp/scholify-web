import type { StudyChapter } from "@/lib/acca-study-content"
import { SBL_E } from "@/lib/acca-study-sbl-e"
import { SBL_TREE_AREA_A } from "@/lib/acca-study-sbl-tree-a"
import { SBL_TREE_AREA_B } from "@/lib/acca-study-sbl-tree-b"
import { SBL_TREE_AREA_C } from "@/lib/acca-study-sbl-tree-c"
import { SBL_TREE_AREA_D } from "@/lib/acca-study-sbl-tree-d"
import { SBL_TREE_AREA_E } from "@/lib/acca-study-sbl-tree-e"
import { SBL_TREE_AREA_F } from "@/lib/acca-study-sbl-tree-f"
import { SBL_TREE_AREA_G } from "@/lib/acca-study-sbl-tree-g"
import { SBL_TREE_AREA_H } from "@/lib/acca-study-sbl-tree-h"

/*
 * SBL is mid-rebuild, from a single chapter per syllabus area to a chapter TREE
 * (see acca-study-sbl-tree-a.ts for the standard and the reasoning).
 *
 * Areas still on the legacy bodies below are served by `subset`, which re-cuts
 * five old chapters into ten official areas. That is a shim, not authored
 * content, and it is why the pre-rebuild paper carried ~9,900 words across the
 * whole syllabus: Areas D and F are two slices of ONE legacy chapter, Areas C
 * and E are legacy chapters relabelled wholesale, and Area A used to be carved
 * out of the legacy PROFESSIONAL SKILLS chapter. Each area is replaced by a real
 * tree in turn; delete `subset`, the SBL_A–SBL_E imports and the legacy files
 * once the last area is off it.
 */
function subset(source: StudyChapter, area: string, title: string, ids: string[], intro: string, outcomes: string[]): StudyChapter {
  return { ...source, area, title, intro, outcomes, sections: source.sections.filter((section) => ids.includes(section.id)) }
}

/* Area A is a four-chapter tree — see acca-study-sbl-tree-a.ts. It replaces two
   sections lifted from the legacy professional-skills chapter, and now teaches
   A3's ethical codes, conflicts, threats, safeguards and economic crime, none of
   which the paper covered at all. */
export const SBL_OFFICIAL_A = SBL_TREE_AREA_A
/* Area B is a seven-chapter tree — see acca-study-sbl-tree-b.ts. The largest area
   in the paper, and the one the shim compressed hardest: five sections of one
   legacy chapter served all of B1–B6, so public sector governance (B6) and
   integrated reporting and sustainability (B4) were barely taught. */
export const SBL_OFFICIAL_B = SBL_TREE_AREA_B
/* Area C is a six-chapter tree — see acca-study-sbl-tree-c.ts. The shim relabelled
   one legacy chapter as the whole of Area C; Kaplan spends four chapters and 128
   pages on the same material, and splits strategic choice from the methods of
   development, which is the split adopted here. */
export const SBL_OFFICIAL_C = SBL_TREE_AREA_C
/* Area D is a four-chapter tree — see acca-study-sbl-tree-d.ts. It was three
   sections of legacy chapter SBL_C taking `outcomes.slice(0, 3)`, with the OTHER
   half of the same chapter serving Area F — two syllabus areas cut from one body
   of text. Area D has fifteen learning outcomes. */
export const SBL_OFFICIAL_D = SBL_TREE_AREA_D
/* Area E is a five-chapter tree — see acca-study-sbl-tree-e.ts. The shim
   relabelled legacy chapter SBL_D as the whole area. Kaplan spends 116 pages on
   this material and predates E3 (machine learning, AI and robotics) entirely. */
export const SBL_OFFICIAL_E = SBL_TREE_AREA_E
/* Area F is a three-chapter tree — see acca-study-sbl-tree-f.ts. It was the OTHER
   half of legacy chapter SBL_C: three section ids and `outcomes.slice(3)`, while
   Area D took `.slice(0, 3)` of the same chapter. Both are now authored, so SBL_C
   is retired. */
export const SBL_OFFICIAL_F = SBL_TREE_AREA_F
export const SBL_OFFICIAL_I = subset(SBL_E, "I", "Professional skills", ["why-skills", "five-skills", "scepticism-suspicion", "board-advice"], "Professional skills are how a senior adviser converts evidence into communication, analysis, scepticism, commercial judgement and balanced evaluation that another leader can act on.", SBL_E.outcomes.slice(0, 4))

/* Area G is a four-chapter tree — see acca-study-sbl-tree-g.ts. Unlike most of
   this file, the chapter it replaces was genuinely authored rather than shim-built
   — and it was 2 sections and 183 words for what is the biggest chapter in
   Kaplan's text at 76 pages. Its two best ideas are kept and developed: that a
   positive NPV is where advice starts rather than ends, and that a KPI needs a
   definition, owner, target, source and decision response. */
export const SBL_OFFICIAL_G = SBL_TREE_AREA_G

/* Area H is a six-chapter tree — see acca-study-sbl-tree-h.ts. Like Area G the
   chapter it replaces was genuinely authored, and it was 2 sections and 169 words
   for six sub-topics carrying twenty-one learning outcomes. It also held the flow
   diagram whose steps were plain strings, so it rendered as empty boxes. */
export const SBL_OFFICIAL_H = SBL_TREE_AREA_H

export const SBL_OFFICIAL_J: StudyChapter = {
  paper: "SBL", area: "J", title: "Other employability and digital skills", minutes: 15,
  intro: "The SBL workspace rewards disciplined navigation and professional production: understand the requirement, control the evidence and create the deliverable a real recipient needs.",
  outcomes: ["Navigate pre-seen and live exhibits efficiently", "Use digital response tools professionally", "Reconcile and manipulate evidence transparently", "Present decision-ready outputs"],
  sections: [{ id: "workspace", heading: "Requirement-led digital execution", blocks: [
    { kind: "text", md: "Map every requirement to the **role, recipient, task verb, output and relevant exhibits**. The pre-seen supplies context; live exhibits supply task evidence. Do not force a rehearsed model onto facts that point elsewhere." },
    { kind: "table", caption: "Digital response controls", head: ["Action", "Professional result"], rows: [["Exhibit map", "Focused evidence without omission"], ["Purposeful headings", "Readable structure matched to the deliverable"], ["Traceable calculations", "Reviewable assumptions and conclusions"], ["Conflict log", "Visible reconciliation of inconsistent sources"], ["Final requirement check", "Every requested action answered"]] },
    { kind: "example", title: "Conflicting evidence", scenario: "A director says service improved, while the dashboard shows complaints rising; the periods and definitions differ.", steps: [{ label: "Validate", detail: "Reconcile periods, populations and definitions." }, { label: "Quantify", detail: "Restate comparable trends where the data permits." }, { label: "Challenge", detail: "Explain what the evidence supports and what remains uncertain." }, { label: "Communicate", detail: "Recommend a consistent measure and action, not an arbitrary average." }], result: "Digital judgement converts inconsistency into a transparent decision issue." },
  ] }],
  examTraps: [{ trap: "Copying exhibits into a generic essay.", fix: "Synthesise evidence for the recipient, decision and required output." }, { trap: "Ignoring conflicting definitions or periods.", fix: "Reconcile the bases and state unresolved limitations." }],
  keyTerms: [{ term: "Exhibit map", def: "A requirement-led index connecting evidence sources to tasks and outputs." }],
  summary: ["Start from role, verb, recipient and output.", "Use pre-seen as context, not a rehearsed answer.", "Control calculations and conflicting evidence.", "Finish with prioritised action."],
}
