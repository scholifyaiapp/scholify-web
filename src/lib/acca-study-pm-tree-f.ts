import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area F — chapter 34, employability and technology skills.
 *
 * ── Why this chapter is different in kind from the other 33 ──────
 * Areas A to E are management accounting. Area F is about operating the exam itself: the
 * CBE's spreadsheet and word processor, and how to lay an answer out so a marker can find
 * and award the marks in it. Every other paper with an employability area carries a
 * chapter for it (see acca-study-fm-official.ts), and PM needs one more than most —
 * Section C is 40 of the 100 marks, it is answered entirely in those two tools, and it is
 * where the paper is passed or failed.
 *
 * ── What it deliberately is not ─────────────────────────────────
 * Not a spreadsheet tutorial. A candidate sitting PM can already enter a formula. What
 * loses them marks is different, and specific: workings typed as prose so the method is
 * invisible, an answer that does not say which requirement part it belongs to, hard-coded
 * figures that must all be retyped when part (c) revises an assumption, and thirty minutes
 * spent hunting one error in part (a) while parts (b) and (c) go unanswered. So the chapter
 * is built around those four, because they are what actually costs marks.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

export const PM_TREE_34: StudyChapter = {
  id: "PM-34",
  number: 34,
  paper: "PM",
  area: "F",
  title: "Employability and technology skills: answering PM in the CBE",
  minutes: 15,
  syllabusRefs: ["F1(a)", "F1(b)", "F2(a)", "F2(b)", "F3(a)"],
  intro:
    "Forty of PM's hundred marks are written into a spreadsheet and a word processor. This chapter is about not losing marks you have already earned.",
  outcomes: [
    "Lay out spreadsheet workings so that method marks survive an arithmetic error",
    "Structure a Section C answer against the requirement's parts",
    "Use cell references so a revised assumption recalculates rather than being retyped",
    "Manage time across a multi-part requirement, including when a calculation will not reconcile",
    "Present figures and commentary so a conclusion is visible to the marker",
  ],
  sections: [
    {
      id: "laying-out-the-answer",
      heading: "Laying out an answer the marker can mark",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "The one thing to understand about Section C marking",
          md: "Most Section C marks are **method** marks, not answer marks. A marker awarding four marks for a variance calculation is looking for the standard quantity, the actual quantity, the standard price and the correct sign — and will award three of those four even when the multiplication at the end is wrong. **But only if they can see them.** A single unexplained figure in a cell earns everything or nothing, and usually nothing. So the layout is not presentation: it is the mechanism by which partial credit reaches you.",
        },
        {
          kind: "list",
          style: "number",
          title: "How to lay out a calculation",
          items: [
            "**One step per row, each labelled.** \"Standard quantity for actual output\", \"Actual quantity used\", \"Difference\", \"× standard price\", \"Variance\". Five rows, five visible decisions.",
            "**Label every figure with its unit** — kg, hours, £, £ per kg. A number with no unit cannot be checked, by the marker or by you.",
            "**State the sign convention once**, at the top, and use it throughout: adverse in brackets or marked A, favourable marked F. Mixed conventions inside one answer lose marks the arithmetic had earned.",
            "**Show the check where one exists.** Capacity plus efficiency equals volume; mix plus yield equals usage; planning plus operational equals the total. Writing the check down demonstrates you know it is there.",
            "**Put each requirement part in its own clearly headed block**, using the question's own labels — (a), (b), (c). A marker marking part (b) should not have to search for it.",
          ],
        },
        {
          kind: "table",
          caption: "Which CBE tool for which requirement",
          head: ["Requirement asks you to…", "Use", "Because"],
          rows: [
            ["**Calculate** a variance, a plan, an optimum", "**Spreadsheet**", "Cell-by-cell layout makes the method visible, and formulae recalculate if an input changes"],
            ["**Explain**, **discuss**, **advise**, **comment**", "**Word processor**", "It is prose, and prose crammed into cells is hard to read and easy to truncate"],
            ["**Calculate AND comment** in one part", "**Both**, cross-referenced", "Put the figures in the spreadsheet and the commentary in the word processor, each headed with the same part label"],
            ["Show a **reconciliation** or an operating statement", "**Spreadsheet**", "The column structure is the answer; a reconciliation written as prose cannot be followed"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The scratch pad is not submitted",
          md: "Anything written on the CBE's scratch pad is **discarded when you finish**. It is genuinely useful for jotting a quick number or sketching a graph while you think, but nothing on it can earn a mark. Every figure and every sentence you want credited must be in the **spreadsheet or the word processor** for that requirement part. Candidates lose real marks to this every sitting, usually by working out part (b) on the scratch pad and only transcribing the final answer.",
        },
      ],
      check: {
        q: "Why does laying out a calculation one labelled step per row matter for marks?",
        options: [
          "It looks more professional to the marker",
          "Most Section C marks are METHOD marks, and a marker can only award them for steps they can see — a single unexplained figure earns all or nothing",
          "The examiner requires a specific spreadsheet format",
          "It makes the answer shorter",
        ],
        correct: 1,
        explain:
          "METHOD MARKS NEED TO BE VISIBLE. A marker will award most of a calculation's marks even when the final figure is wrong, provided the standard quantity, actual quantity, price and sign are all shown. One unexplained number in a cell forfeits that partial credit entirely.",
      },
    },
    {
      id: "models-and-time",
      heading: "Building a model that survives, and managing the clock",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Reference cells, do not retype figures",
          md: "PM requirements very often **revise an assumption partway through**: compute the optimal plan, then say what changes if a second machine is acquired; compute the variances, then recompute them against a revised standard. If your part (a) is built from cell references, part (b) is a single input change and a re-read. If it is built from retyped numbers, part (b) means finding and changing every one of them under time pressure — and each retyped figure is also a transcription error waiting to happen. Build the input assumptions in a small block at the top and refer to them everywhere else.",
        },
        {
          kind: "example",
          title: "Managing a 20-mark question that will not reconcile",
          scenario:
            "A Section C question is worth 20 marks, with parts of 8, 7 and 5 marks, and you have allocated 36 minutes to it — roughly 1.8 minutes a mark. Fourteen minutes in, part (a)'s operating statement does not reconcile to actual profit: there is a £3,400 difference you cannot find, and you have already checked the material and labour variances twice.",
          steps: [
            { label: "Stop the search at a fixed point", detail: "You have spent 14 minutes on an 8-mark part whose fair share is about 14 minutes. Continuing to hunt costs marks in parts (b) and (c) at exactly the same rate — 1.8 minutes each — while the chance of finding the error falls the longer you look for it." },
            { label: "Write the imbalance down rather than hiding it", detail: "Add a line: \"Statement does not reconcile by £3,400 adverse. Most likely cause: the sales volume variance may have been valued at standard profit rather than standard contribution, the company operating a marginal costing system.\" That sentence can itself earn a mark, because recognising that a reconciliation has failed — and knowing the usual causes — is part of the skill being tested." },
            { label: "Never plug the difference", detail: "Inserting a £3,400 balancing figure to make the statement add up is visible to any marker and destroys the credibility of the whole answer. The reconciliation exists to be a control; a plugged one is worse than an honest imbalance." },
            { label: "State the figures you carry forward", detail: "Parts (b) and (c) are almost always marked on YOUR figures. Write \"carried forward to part (b): total material variance £6,720 A, total labour variance £2,900 F\" so the marker knows which numbers your later commentary refers to, and can follow it even though part (a) is wrong." },
            { label: "Move on and spend the full time on (b) and (c)", detail: "Twelve marks remain and they are entirely available. Part (c)'s five marks are usually discussion — where the causes of the variances lie, whether they are controllable, what management should do — and none of that depends on part (a) reconciling." },
            { label: "Return only if time remains", detail: "If you finish (b) and (c) with four minutes left, come back. A fresh look after twenty minutes on other work finds an error far more often than another twenty minutes of staring at it." },
          ],
          result:
            "**Fourteen minutes on the error, then move.** The imbalance is stated with its likely cause and the figures carried forward, so parts (b) and (c) are answered in full — turning a question that could have scored 4 into one that scores 14 or 15.",
        },
        {
          kind: "list",
          title: "Time management across the paper",
          items: [
            "**1.8 minutes a mark.** Three hours for 100 marks, so a 20-mark question gets 36 minutes and a 2-mark OT gets about 3.6. Write the finish time for each section at the start.",
            "**Section A and B first, at pace.** Sixty marks of objective tests, and an OT you cannot do in three minutes you will not do in eight — flag it and come back.",
            "**Never overrun Section C's first question into the second.** Two 20-mark questions with 18 marks each beats one with 20 and one with 8, and the marks at the START of a question are always the easiest in it.",
            "**Answer every part.** A discussion part you have not started scores zero; three sensible sentences in it usually score two or three.",
            "**Leave the last five minutes** to check that every part is labelled, both tools have been used where needed, and nothing is still sitting on the scratch pad.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Presenting figures so the conclusion is visible",
          md: "A requirement that says **assess**, **advise** or **recommend** is asking for a conclusion, and the marks sit in reaching it. Present a **short table** of the measures that matter — not every ratio you can compute — then commentary that ties each movement to something in the scenario, then a **clear recommendation in its own sentence**. Two well-chosen measures with a reason each beat twelve with none. And put the recommendation where it can be seen: a conclusion buried in the middle of a paragraph is a conclusion the marker may not credit.",
        },
      ],
      check: {
        q: "Your part (a) calculation will not reconcile after fourteen minutes of an 8-mark part. What is the best action?",
        options: [
          "Keep working until it reconciles, since later parts depend on it",
          "Note the imbalance and its likely cause, state the figures you carry forward, and move to parts (b) and (c) where the marks are fully available",
          "Insert a balancing figure so the statement adds up",
          "Abandon the question entirely",
        ],
        correct: 1,
        explain:
          "NOTE IT, CARRY FORWARD, AND MOVE ON. Later parts are marked on YOUR figures, so an unreconciled part (a) does not forfeit them — but time spent hunting one error does. Recognising that a reconciliation has failed can itself earn a mark; plugging the difference destroys the answer's credibility.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Typing workings as prose in the word processor.",
      fix: "Calculations belong in the spreadsheet, one labelled step per row, so method marks are visible.",
    },
    {
      trap: "Leaving working on the scratch pad.",
      fix: "It is discarded on submission. Everything you want credited goes in the spreadsheet or word processor.",
    },
    {
      trap: "Hard-coding figures instead of referencing an input block.",
      fix: "A later part usually revises an assumption; referenced cells recalculate, retyped ones must all be found.",
    },
    {
      trap: "Overrunning on one part until later parts go unanswered.",
      fix: "Budget 1.8 minutes a mark. The marks at the start of a part are the easiest marks in it.",
    },
    {
      trap: "Plugging a reconciliation so it balances.",
      fix: "State the imbalance and its likely cause instead — that can earn a mark, and a plug is visible.",
    },
    {
      trap: "Answering \"assess and advise\" with a table of ratios and no conclusion.",
      fix: "Few measures, commentary tied to the scenario, and the recommendation in its own sentence.",
    },
  ],
  keyTerms: [
    { term: "Method mark", def: "A mark awarded for a correct step in a calculation, independent of whether the final figure is right." },
    { term: "Own-figure rule", def: "The marking practice of crediting later parts on the figures the candidate produced earlier, even where those were wrong." },
    { term: "Input block", def: "A small area of a spreadsheet holding the question's assumptions, referenced by every calculation so a revision recalculates." },
    { term: "Scratch pad", def: "The CBE's rough-working area, which is not submitted and cannot earn marks." },
  ],
  summary: [
    "Most Section C marks are method marks, so the layout is how partial credit reaches you.",
    "Calculations go in the spreadsheet one labelled step per row; explanation goes in the word processor.",
    "Reference an input block rather than retyping figures, because later parts routinely revise an assumption.",
    "Budget 1.8 minutes a mark and never let one part consume another's time.",
    "A reconciliation that fails should be stated with its likely cause, never plugged.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does spreadsheet layout affect the mark?", a: "Because most Section C marks are method marks and a marker can only award them for steps they can see." },
    { q: "What happens to work left on the scratch pad?", a: "It is discarded on submission and cannot earn any mark." },
    { q: "Why use cell references rather than retyped numbers?", a: "Later requirement parts commonly revise an assumption; a referenced model recalculates while retyped figures must all be found and changed." },
    { q: "How much time should a 20-mark Section C question get?", a: "About 36 minutes, at roughly 1.8 minutes a mark across a three-hour, 100-mark paper." },
    { q: "What should you do with a reconciliation that will not balance?", a: "State the imbalance and its most likely cause, list the figures carried forward, and move to the remaining parts — never insert a balancing plug." },
  ],
}

export const PM_TREE_AREA_F: StudyChapter[] = [PM_TREE_34]
