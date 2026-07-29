import type { StudyChapter } from "@/lib/acca-study-content"
import { BT_TREE_AREA_A } from "@/lib/acca-study-bt-tree-a"
import { BT_TREE_AREA_B } from "@/lib/acca-study-bt-tree-b"
import { BT_TREE_AREA_C } from "@/lib/acca-study-bt-tree-c"
import { BT_TREE_AREA_D } from "@/lib/acca-study-bt-tree-d"
import { BT_TREE_AREA_E, BT_TREE_AREA_F } from "@/lib/acca-study-bt-tree-ef"

/*
 * BT · the Study reading tree — 26 chapters across the six official syllabus
 * areas, for the ACCA BT/FBT study guide September 2025 to August 2026.
 *
 * ── Why a tree, and what it replaced ──────────────────────────
 * BT used to have exactly SIX study chapters, one per syllabus area. That put
 * nine syllabus sub-topics (A1–A9) into a single 28-minute chapter: organisation
 * types, stakeholders, political and legal factors, macro-economics,
 * micro-economics, social, technological, environmental AND competitive factors,
 * in one sitting. The whole paper came to roughly 9,100 words.
 *
 * The approved-provider study texts organise the same syllabus as ~19–25
 * chapters, and they do that because it is the only way each sub-topic gets the
 * room to be taught rather than mentioned. This tree follows the same logic: ONE
 * CHAPTER PER SYLLABUS SUB-TOPIC GROUP, so the mapping to the official study
 * guide is explicit (every chapter carries its `syllabusRefs`) and no chapter has
 * to cover ground it cannot cover properly.
 *
 *   Area A · 7 chapters (A1 … A9)   The organisation and its environment
 *   Area B · 4 chapters (B1 … B5)   Structure, culture, committees, governance
 *   Area C · 6 chapters (C1 … C8)   Accounting, systems, control, fraud, fintech
 *   Area D · 5 chapters (D1 … D7)   Leading and managing individuals and teams
 *   Area E · 2 chapters (E1 … E5)   Personal effectiveness and communication
 *   Area F · 2 chapters (F1 … F4)   Professional ethics
 *
 * Each chapter carries the full teaching apparatus the model now supports:
 * syllabus references, learning outcomes, numbered sections, boxed key-term
 * definitions, illustrations, attempt-then-reveal activities with model answers,
 * inline knowledge checks, worked examples, diagrams, exam traps paired with
 * their fixes, a glossary, a bullet summary, a question-and-answer knowledge
 * diagnostic, and onward links to later papers.
 *
 * ── Provenance ────────────────────────────────────────────────
 * Every word is ORIGINAL Scholify teaching text. What is followed is the PUBLIC
 * ACCA syllabus and study guide structure, which is not anyone's intellectual
 * property. No ACCA, Kaplan or BPP prose, question or answer is reproduced.
 */

/** All 26 BT chapters, in reading order. */
export const BT_OFFICIAL_CHAPTERS: StudyChapter[] = [
  ...BT_TREE_AREA_A,
  ...BT_TREE_AREA_B,
  ...BT_TREE_AREA_C,
  ...BT_TREE_AREA_D,
  ...BT_TREE_AREA_E,
  ...BT_TREE_AREA_F,
]
