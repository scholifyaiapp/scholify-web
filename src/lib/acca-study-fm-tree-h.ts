import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FM · Area H — employability and technology skills.
 *
 * The last chapter of the FM rebuild, and the only one that had been left as a
 * legacy body: one section, no syllabusRefs, no inline check, no knowledge
 * diagnostic. A quality sweep across F1–F9 found it and its AA twin as the only
 * two chapters in nine papers missing that furniture.
 *
 * ACCA examines this area through the CBE itself rather than as separate
 * knowledge, so the chapter teaches the working method a marker can see: a model
 * whose assumptions are visible, a calculation that can be followed, and a
 * recommendation that survives contact with a board.
 */

const FM_TREE_25: StudyChapter = {
  paper: "FM",
  id: "FM-25",
  number: 25,
  area: "H",
  syllabusRefs: ["H1(a)", "H2(a)", "H3(a)", "H4(a)"],
  title: "Employability and technology skills",
  minutes: 16,
  intro:
    "The marks in a computer-based exam are not only in the answer. They are in whether someone else can follow it, trust it, and act on it.",
  outcomes: [
    "Build a spreadsheet model that separates assumptions, calculations and outputs",
    "Use spreadsheet functions appropriate to financial appraisal",
    "Perform and present sensitivity analysis without destroying the base case",
    "Turn a numerical output into a professional recommendation",
  ],
  sections: [
    {
      id: "model-structure",
      heading: "A model another professional can trust",
      blocks: [
        {
          kind: "text",
          md: "Separate **inputs, calculations, outputs and checks**. Every assumption lives in one labelled cell that the calculations reference — never typed into the middle of a formula, where nobody will find it and nobody can change it.",
        },
        {
          kind: "table",
          caption: "Model controls and what each prevents",
          head: ["Control", "What it prevents"],
          rows: [
            ["Dedicated assumption cells, labelled with units", "A hard-coded number nobody knows is there"],
            ["An explicit timeline row (T0, T1, T2…)", "Discounting a year-1 flow as if it were at T0"],
            ["Currency and units stated on every block", "Mixing £000s with £, the most expensive silent error"],
            ["Control totals and cross-checks", "Omissions and broken links going unnoticed"],
            ["A preserved base case, with scenarios as copies", "Overwriting the approved answer while exploring"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The hard-coded number is the classic fault",
          md: "A tax rate typed as `0.3` inside a formula cannot be found, cannot be reviewed and cannot be changed for a scenario. Put it in a cell called *Tax rate*, and reference that cell everywhere. A marker looking for evidence of method will see it; so will the colleague who inherits the file.",
        },
      ],
      check: {
        q: "In an NPV model, where should the discount rate live?",
        options: [
          "Typed into each discounting formula so the calculation is self-contained",
          "In a single labelled assumption cell that every formula references",
          "In a comment attached to the first formula",
          "In the file name, so it is visible at a glance",
        ],
        correct: 1,
        explain:
          "One labelled cell, referenced everywhere. It makes the assumption visible, reviewable, and changeable for a scenario in one edit rather than dozens — which is exactly what makes sensitivity analysis possible at all.",
      },
    },
    {
      id: "functions",
      heading: "The functions that do the work",
      blocks: [
        {
          kind: "table",
          caption: "What to reach for",
          head: ["Task", "Approach"],
          rows: [
            ["Discounting a series of cash flows", "Build explicit discount factors in a row, or use a present-value function — but show the factors so the working is visible"],
            ["Finding the internal rate of return", "An IRR function on the cash flow row, or interpolate between two NPVs as in FM-10"],
            ["Level annual flows", "Multiply by an annuity factor rather than discounting each year separately"],
            ["Testing one variable across a range", "A data table, or a column of scenarios beside the base case"],
            ["Ranking projects under rationing", "Compute the profitability index in a column, then sort — never re-order by hand"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Show the factors, not just the answer",
          md: "A single function returning one number gives a marker nothing to award if it is wrong. A visible row of discount factors, with the arithmetic beside it, earns method marks even when the final figure is off — and lets you spot your own error.",
        },
        {
          kind: "example",
          title: "Sensitivity, laid out so it can be read",
          scenario: "A project has a base-case NPV of £57,920. Management wants to know how fragile that is.",
          steps: [
            { label: "Keep the base case", detail: "Leave the original column untouched and build scenarios alongside it." },
            { label: "Change one assumption at a time", detail: "Sales volume −5%, −10%, −15% in three adjacent columns, each referencing the same assumption cell." },
            { label: "Compute the switching value", detail: "NPV ÷ PV of the flow affected — the percentage move that takes NPV to zero." },
            { label: "Label the conclusion", detail: "\"Sales volume can fall 5.0% before this project destroys value.\"" },
          ],
          result:
            "The reader sees the base case, the range tested and the breaking point, side by side. A single recalculated number with the original overwritten shows none of that — and cannot be checked.",
        },
      ],
      check: {
        q: "You are asked to test how sensitive an NPV is to material cost. What is the best approach?",
        options: [
          "Change the material cost cell and note the new NPV, overwriting the original",
          "Retype the whole model with the new cost",
          "Add scenario columns beside a preserved base case, each varying only material cost",
          "Change several assumptions together to save time",
        ],
        correct: 2,
        explain:
          "Preserve the base case and vary ONE assumption per scenario in adjacent columns. Overwriting loses the comparison; changing several at once means you cannot attribute the change to any single variable, which is the whole point of sensitivity analysis.",
      },
    },
    {
      id: "recommendation",
      heading: "Turning output into advice",
      blocks: [
        {
          kind: "text",
          md: "A number is not a recommendation. The professional skill being examined is converting an appraisal into something a board can decide on — which means stating the decision, the assumptions it rests on, what would change it, and the factors the model does not capture.",
        },
        {
          kind: "list",
          style: "number",
          title: "The structure of a board-ready answer",
          items: [
            "**The figure and the decision rule** — \"NPV is positive at £57,920, so on financial grounds the project should be accepted.\"",
            "**The assumptions it depends on** — name the two or three that matter, not all of them.",
            "**The switching point** — \"a 5% shortfall in sales volume eliminates the entire NPV\".",
            "**Non-financial factors** — capacity, staffing, strategic fit, reputational and regulatory considerations.",
            "**A conditional recommendation** — \"accept, provided the volume forecast is corroborated and monitored monthly\".",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Conditional beats confident",
          md: "\"Accept\" invites the reader to ask what happens if you are wrong. \"Accept, subject to verifying the volume assumption, which the project cannot survive a 5% miss on\" answers that before it is asked — and is what a professional-marks scheme is looking for.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Typing a calculated answer into the output cell.", fix: "Use a visible formula linked to labelled assumption cells and workings." },
    { trap: "Giving an NPV with no recommendation, assumptions or risk discussion.", fix: "State the decision, the assumptions, the switching value and the non-financial factors." },
    { trap: "Overwriting the base case while running scenarios.", fix: "Keep the base case and build scenarios alongside it." },
    { trap: "Hiding a rate or a tax percentage inside a formula.", fix: "One labelled cell, referenced everywhere." },
  ],
  keyTerms: [
    { term: "Switching value", def: "The change in an input that reduces a project's NPV to zero." },
    { term: "Model control", def: "A design feature or check that prevents, detects or exposes an error in a model." },
    { term: "Base case", def: "The approved central set of assumptions, preserved so scenarios can be compared against it." },
  ],
  summary: [
    "Separate inputs, calculations, outputs and checks.",
    "Assumptions live in labelled cells and are referenced, never hard-coded.",
    "Show discount factors and workings so method is visible and checkable.",
    "Vary one assumption at a time beside a preserved base case.",
    "Convert the number into a conditional recommendation with assumptions and non-financial factors.",
  ],
  knowledgeDiagnostic: [
    { q: "Why should assumptions sit in dedicated cells rather than inside formulas?", a: "So they are visible, reviewable and changeable in one edit — which is what makes review and sensitivity analysis possible at all." },
    { q: "What is a switching value?", a: "The change in an input that reduces the NPV to zero — the point at which the decision reverses." },
    { q: "Name three things a recommendation should contain beyond the NPV.", a: "The assumptions it depends on, the switching point, and the non-financial factors — plus a conditional decision." },
  ],
  furtherStudy: [
    "FM-10 and FM-12 supply the appraisal and sensitivity techniques this chapter presents.",
    "AFM extends the same modelling discipline to acquisitions and multi-currency appraisal.",
  ],
}

export const FM_TREE_AREA_H: StudyChapter[] = [FM_TREE_25]
