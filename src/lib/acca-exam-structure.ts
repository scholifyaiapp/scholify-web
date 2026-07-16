/*
 * Scholify — the OFFICIAL ACCA CBE exam structure, paper by paper.
 *
 * This is the specialist layer the whole CBE experience hangs off: what the
 * real computer-based exam looks like for each paper — sections, question
 * styles, marks, timing, and which on-screen answer tools ACCA gives you.
 *
 * Ground truth (current CBE specifications):
 *   · BT / MA / FA / LW      — 2h, 100% objective-test. Sections A + B only.
 *   · PM / TX / FR / FM      — 3h, Sections A (OT) + B (OT cases) + C
 *                              (constructed response in the CBE word processor
 *                              and spreadsheet).
 *   · AA                     — 3h, Section A (3 OT cases) + Section B (100%
 *                              constructed — there is NO Section C in AA).
 *   · SBR / AFM / APM / ATX / AAA — 3h15, fully constructed response.
 *   · SBL                    — 4h, one case, fully constructed, 20 of the 100
 *                              marks are professional skills.
 *
 * Where an exam provides reference material (MA/PM/FM formulae sheets and
 * tables, TX/ATX tax rates and allowances), `providedInExam` says exactly
 * what — and papers that provide NOTHING say so, because walking into FR
 * expecting a formula sheet is a mistake a tutor corrects early.
 */

export type SectionKind = "ot" | "otcase" | "constructed"

export interface ExamSection {
  id: "A" | "B" | "C"
  kind: SectionKind
  /** e.g. "15 objective-test questions" */
  makeup: string
  marks: number
}

export interface ExamBlueprint {
  paper: string
  /** Total exam time in minutes (SBL includes its integrated reading time). */
  durationMin: number
  sections: ExamSection[]
  /** What ACCA hands you on screen in this exam, or null if nothing. */
  providedInExam: string | null
  /** CBE constructed-response answer tools (empty for pure-OT exams). */
  cbeTools: ("word" | "spreadsheet")[]
  /** One tutor sentence a candidate should know about this exam's shape. */
  tutorNote: string
}

const ot = (makeup: string, marks: number): ExamSection => ({ id: "A", kind: "ot", makeup, marks })
const otB = (makeup: string, marks: number): ExamSection => ({ id: "B", kind: "otcase", makeup, marks })
const con = (id: "A" | "B" | "C", makeup: string, marks: number): ExamSection => ({ id, kind: "constructed", makeup, marks })

export const EXAM_BLUEPRINTS: Record<string, ExamBlueprint> = {
  BT: {
    paper: "BT",
    durationMin: 120,
    sections: [
      ot("46 objective-test questions (30 × 2 marks, 16 × 1 mark)", 76),
      otB("6 multi-task questions × 4 marks", 24),
    ],
    providedInExam: null,
    cbeTools: [],
    tutorNote: "Pure objective-test: breadth beats depth — every syllabus area appears, so leave no chapter unread.",
  },
  MA: {
    paper: "MA",
    durationMin: 120,
    sections: [
      ot("35 objective-test questions × 2 marks", 70),
      otB("3 multi-task questions × 10 marks (budgeting, standard costing, performance measurement)", 30),
    ],
    providedInExam: "A formulae sheet (regression, EOQ/EBQ and more) — provided on screen",
    cbeTools: [],
    tutorNote: "The formulae sheet is given — the marks are for knowing WHEN to use each formula, not memorising it.",
  },
  FA: {
    paper: "FA",
    durationMin: 120,
    sections: [
      ot("35 objective-test questions × 2 marks", 70),
      otB("2 multi-task questions × 15 marks (consolidation and interpretation)", 30),
    ],
    providedInExam: null,
    cbeTools: [],
    tutorNote: "Section B is always consolidation + interpretation — rehearse those two MTQ styles until they're routine.",
  },
  LW: {
    paper: "LW",
    durationMin: 120,
    sections: [
      ot("45 objective-test questions (25 × 2 marks, 20 × 1 mark)", 70),
      otB("5 multi-task questions × 6 marks", 30),
    ],
    providedInExam: null,
    cbeTools: [],
    tutorNote: "One-mark questions are deliberately quick — bank them fast and spend the saved time on the scenario MTQs.",
  },
  PM: {
    paper: "PM",
    durationMin: 180,
    sections: [
      ot("15 objective-test questions × 2 marks", 30),
      otB("3 OT cases × 5 questions × 2 marks", 30),
      con("C", "2 constructed-response questions × 20 marks", 40),
    ],
    providedInExam: "Formulae sheet (learning curve, demand/MR) — provided on screen",
    cbeTools: ["word", "spreadsheet"],
    tutorNote: "Section C is where PM is passed or failed: 40 marks of workings + commentary in the spreadsheet and word processor.",
  },
  TX: {
    paper: "TX",
    durationMin: 180,
    sections: [
      ot("15 objective-test questions × 2 marks", 30),
      otB("3 OT cases × 5 questions × 2 marks", 30),
      con("C", "3 constructed-response questions (10 + 15 + 15 marks)", 40),
    ],
    providedInExam: "Tax rates and allowances — provided on screen (Scholify content states rates in the question, FA2024 basis)",
    cbeTools: ["word", "spreadsheet"],
    tutorNote: "The 15-markers are income tax and corporation tax computations — build them in the spreadsheet, label every line.",
  },
  FR: {
    paper: "FR",
    durationMin: 180,
    sections: [
      ot("15 objective-test questions × 2 marks", 30),
      otB("3 OT cases × 5 questions × 2 marks", 30),
      con("C", "2 constructed-response questions × 20 marks (preparation + interpretation)", 40),
    ],
    providedInExam: null,
    cbeTools: ["word", "spreadsheet"],
    tutorNote: "No formula sheet in FR — statement formats and ratio definitions must be in your head before exam day.",
  },
  AA: {
    paper: "AA",
    durationMin: 180,
    sections: [
      ot("3 OT cases × 5 questions × 2 marks", 30),
      con("B", "3 constructed-response questions (30 + 20 + 20 marks)", 70),
    ],
    providedInExam: null,
    cbeTools: ["word"],
    tutorNote: "AA has NO Section C — Section B is 70 marks of written answers, so the word processor is your main tool.",
  },
  FM: {
    paper: "FM",
    durationMin: 180,
    sections: [
      ot("15 objective-test questions × 2 marks", 30),
      otB("3 OT cases × 5 questions × 2 marks", 30),
      con("C", "2 constructed-response questions × 20 marks", 40),
    ],
    providedInExam: "Formulae sheet + present value and annuity tables — provided on screen",
    cbeTools: ["word", "spreadsheet"],
    tutorNote: "NPV and working-capital 20-markers live in the spreadsheet — one clean labelled table earns method marks even with a slip.",
  },
  SBR: {
    paper: "SBR",
    durationMin: 195,
    sections: [
      con("A", "2 questions (30 + 20 marks) — groups and ethics are compulsory ground", 50),
      con("B", "2 questions × 25 marks (scenario and current issues)", 50),
    ],
    providedInExam: null,
    cbeTools: ["word", "spreadsheet"],
    tutorNote: "Marks follow explained IFRS reasoning — a conclusion without the 'because' scores almost nothing.",
  },
  SBL: {
    paper: "SBL",
    durationMin: 240,
    sections: [con("A", "One integrated case — all tasks compulsory (80 technical + 20 professional skills marks)", 100)],
    providedInExam: null,
    cbeTools: ["word", "spreadsheet"],
    tutorNote: "20 marks are professional skills — answer in role, in format (report, briefing, slides), or you cap your own score.",
  },
  AFM: {
    paper: "AFM",
    durationMin: 195,
    sections: [
      con("A", "1 compulsory question × 50 marks", 50),
      con("B", "2 questions × 25 marks", 50),
    ],
    providedInExam: "Formulae sheet + tables (BSOP, parity, PV/annuity) — provided on screen",
    cbeTools: ["word", "spreadsheet"],
    tutorNote: "Q1's 50 marks usually hinge on an NPV/APV or hedging model — build it in the spreadsheet, then advise on it.",
  },
  APM: {
    paper: "APM",
    durationMin: 195,
    sections: [
      con("A", "1 compulsory question × 50 marks", 50),
      con("B", "2 questions × 25 marks", 50),
    ],
    providedInExam: null,
    cbeTools: ["word", "spreadsheet"],
    tutorNote: "APM gives you NO formulae sheet — and rewards evaluation of numbers already given far more than recalculating them.",
  },
  ATX: {
    paper: "ATX",
    durationMin: 195,
    sections: [
      con("A", "2 compulsory questions (35 + 25 marks)", 60),
      con("B", "2 compulsory questions × 20 marks", 40),
    ],
    providedInExam: "Tax rates and allowances — provided on screen (Scholify content states rates in the question, FA2024 basis)",
    cbeTools: ["word", "spreadsheet"],
    tutorNote: "ATX marks advice, not arithmetic — lead with the planning point, support it with the computation.",
  },
  AAA: {
    paper: "AAA",
    durationMin: 195,
    sections: [
      con("A", "1 compulsory case × 50 marks", 50),
      con("B", "2 questions × 25 marks", 50),
    ],
    providedInExam: null,
    cbeTools: ["word"],
    tutorNote: "Risks and procedures must be SPECIFIC to the scenario — generic lists score zero at this level.",
  },
}

/** The blueprint for a paper, or undefined for an unknown id. */
export function examBlueprint(paperId: string): ExamBlueprint | undefined {
  return EXAM_BLUEPRINTS[paperId]
}

/** Does this paper's real exam include constructed-response sections? */
export function hasConstructedSection(paperId: string): boolean {
  return (EXAM_BLUEPRINTS[paperId]?.sections ?? []).some((s) => s.kind === "constructed")
}

/** The constructed section's id ("C" for Skills, "B" for AA, "A/B" Strategic). */
export function constructedSectionLabel(paperId: string): string {
  const ids = (EXAM_BLUEPRINTS[paperId]?.sections ?? []).filter((s) => s.kind === "constructed").map((s) => s.id)
  return ids.length ? `Section ${ids.join(" & ")}` : "Constructed response"
}

/**
 * Exam-standard time for a question of `marks` marks in this paper:
 * total minutes ÷ 100 marks × marks, rounded to the half-minute — the pacing
 * every ACCA tutor drills (1.8 min/mark at Applied Skills, 1.95 at Strategic).
 */
export function examSecondsFor(paperId: string, marks: number): number {
  const bp = EXAM_BLUEPRINTS[paperId]
  const perMark = bp ? bp.durationMin / 100 : 1.8
  return Math.round((perMark * marks * 60) / 30) * 30
}
