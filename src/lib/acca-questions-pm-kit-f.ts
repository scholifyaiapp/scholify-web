import type { AccaQuestion } from "@/lib/acca-content"

/*
 * PM · Area F question kit — employability and technology skills.
 *
 * ── Why this file exists, and why it is small ───────────────────
 * PM's study guide declares SIX areas. A to E are management accounting content, taught by
 * chapters 1 to 33. Area F is different in kind: it is about operating the computer-based
 * exam itself — using the spreadsheet and word processor to produce workings and
 * commentary, structuring an answer so a marker can follow it, and presenting figures so a
 * conclusion is visible. Chapter 34 teaches it, and this is its kit.
 *
 * It is small because the area is small, and because most of what it examines is judgement
 * rather than knowledge. But it is not optional: Section C is 40 of PM's 100 marks, it is
 * answered entirely in those two tools, and a candidate who buries a variance calculation
 * in prose loses method marks they had already earned.
 *
 * ── The id prefix is belt and braces ────────────────────────────
 * `PM-F-O` is whitelisted in acca-pm-syllabus-map.ts. The legacy PM bank was authored when
 * the paper had five areas, so the mapper shifts every legacy item up one area (A→B, B→C
 * and so on). These questions carry a `chapter`, which already exempts them, but the prefix
 * matches the convention the mapper was built around and costs nothing to keep.
 *
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

function q(
  id: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  options: string[],
  correct: number,
  explanation: string,
): AccaQuestion {
  return { id, paper: "PM", area: "F", chapter: "PM-34", type: "mcq", stem, options, correct, explanation, marks: 2, difficulty }
}

export const PM_KIT_AREA_F: AccaQuestion[] = [
  q("PM-F-O-01", "easy",
    "In the CBE, which tool should be used to present the WORKINGS for a Section C variance calculation?",
    [
      "The word processor, typed as continuous prose",
      "The spreadsheet, so each figure sits in its own cell and the marker can follow the calculation",
      "The scratch pad, which is submitted with the answer",
      "Either — presentation carries no marks",
    ],
    1,
    "THE SPREADSHEET. Workings laid out cell by cell let a marker follow the calculation and award method marks even where a figure is wrong. Prose workings bury the method, and the scratch pad is NOT submitted — anything written there is lost."),

  q("PM-F-O-02", "easy",
    "A Section C requirement asks you to 'calculate and comment'. How should the answer be structured in the CBE?",
    [
      "All calculations in the spreadsheet and all commentary in the word processor, each clearly labelled to the requirement part",
      "Everything in the spreadsheet, with commentary in cell comments",
      "Everything in the word processor, with figures typed inline",
      "Whichever is quicker on the day",
    ],
    0,
    "SPREADSHEET FOR FIGURES, WORD PROCESSOR FOR COMMENTARY, both LABELLED to the requirement part. Marks for parts (a) and (c) are awarded separately, so an unlabelled answer risks the marker not finding the part they are marking. Cell comments are not a reliable place to put anything you want read."),

  q("PM-F-O-03", "medium",
    "Which spreadsheet practice most improves the marker's ability to award method marks on a calculation that contains an arithmetic error?",
    [
      "Formatting the final answer in bold",
      "Entering each step on its own row with a label, so the method is visible independently of the final figure",
      "Hard-coding every figure rather than using formulae",
      "Presenting only the final answer, to save time",
    ],
    1,
    "ONE LABELLED STEP PER ROW. Method marks are awarded for the approach, so a visible sequence — contribution per unit, then per limiting factor, then the ranking, then the allocation — earns most of the marks even if one multiplication is wrong. A single unexplained figure earns everything or nothing."),

  q("PM-F-O-04", "medium",
    "Why is using cell REFERENCES rather than re-typed numbers valuable in a CBE spreadsheet answer?",
    [
      "It is required by the examiner",
      "A later part of the requirement often revises an assumption, and referenced cells update automatically while re-typed figures must all be found and changed by hand",
      "Referenced cells are marked more generously",
      "It reduces the file size of the answer",
    ],
    1,
    "BECAUSE REQUIREMENTS REVISE ASSUMPTIONS. A question that asks for a plan, then asks what changes if the constraint is relaxed, is far quicker to answer if the model recalculates. Re-typed figures also introduce transcription errors that cost marks in both parts."),

  q("PM-F-O-05", "hard",
    "You have 45 minutes for a 20-mark Section C question with parts worth 8, 7 and 5 marks. Part (a)'s calculation is not reconciling. What is the best use of the remaining time?",
    [
      "Keep working on part (a) until it reconciles, since later parts depend on it",
      "Note the imbalance and your best explanation for it, state the figures you would carry forward, and move to parts (b) and (c) — where the marks are still fully available",
      "Abandon the question and start the other Section C question",
      "Split the remaining time equally between the three parts regardless",
    ],
    1,
    "MOVE ON, CARRYING FORWARD YOUR FIGURES. Later parts are usually marked on the FIGURES YOU PRODUCED, so an unreconciled part (a) does not forfeit parts (b) and (c) — but time spent hunting one error does. Noting the imbalance and your explanation for it can itself earn a mark, since recognising that a reconciliation has failed is part of the skill."),

  q("PM-F-O-06", "hard",
    "A requirement asks you to 'assess the performance of the division and advise the board'. Which presentation earns the most marks?",
    [
      "A table of every ratio you can compute, with no commentary",
      "A short table of the relevant measures, followed by commentary that links each movement to something in the scenario and closes with a clear recommendation",
      "Continuous prose with the figures embedded in sentences",
      "A bullet list of the ratios with their formulae shown",
    ],
    1,
    "A SHORT TABLE PLUS LINKED COMMENTARY AND A RECOMMENDATION. 'Assess and advise' is asking for a conclusion, and the marks sit in the interpretation rather than in the arithmetic. A page of ratios with no commentary scores badly however many are correct, and embedding figures in prose makes both the figures and the argument hard to follow."),
]
