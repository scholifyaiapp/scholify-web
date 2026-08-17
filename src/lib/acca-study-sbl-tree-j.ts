import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBL · Area J — Other employability and digital skills.
 *
 * The last area off the shim, and the one that was thinnest of all: 1 section and
 * 111 words. It is also the chapter that caused a live engine bug — it carried no
 * `id` and no `number`, so it sorted ahead of all 45 authored chapters and became
 * every SBL learner's day one, on an area holding three questions (see
 * acca-today-composer, chooseScope).
 *
 *   SBL-45  The pre-seen, the exhibits and the exam workspace  (J1, J3)
 *   SBL-46  Producing the deliverable, and presenting data     (J2, J4)
 *
 * J is examined THROUGH the other nine areas rather than on its own, so both
 * chapters are written as exam technique with the marks attached — the syllabus
 * itself frames this section as skills developed by practising for the exam.
 *
 * Written against the official ACCA SBL syllabus and study guide for September
 * 2026 to June 2027. Not derived from any approved-provider text. The exam
 * mechanics stated here — 3 hours 15 minutes including reading, planning and
 * reflection time, pre-seen released two weeks ahead and available in the exam,
 * three tasks totalling 80 technical and 20 professional skills marks — are taken
 * from that guide's "Approach to examining the syllabus".
 */

const SBL_TREE_45: StudyChapter = {
  paper: "SBL",
  id: "SBL-45",
  number: 45,
  area: "J",
  syllabusRefs: ["J1", "J3"],
  title: "The pre-seen, the exhibits and the exam workspace",
  minutes: 17,
  intro:
    "SBL gives you more material than you can use and less time than you would like. Everything in this chapter is about converting that into a plan before you start typing — which is what the reading, planning and reflection time exists for.",
  outcomes: [
    "Use the pre-seen material properly in the two weeks before the exam, and know its limits",
    "Work through the exam's exhibits to find what each task actually needs",
    "Allocate the 195 minutes across three tasks by their marks",
    "Move around the workspace efficiently, and keep track of what you have and have not answered",
  ],
  sections: [
    {
      id: "pre-seen",
      heading: "The pre-seen, and what to do with two weeks",
      blocks: [
        {
          kind: "text",
          md: "Pre-seen material is released two weeks before the sitting. It describes the fictitious organisation and the industry it operates in, and it is available again during the exam — the paper is closed book but the pre-seen is not withheld. Its purpose is to remove the cost of understanding the setting so that exam time goes on the tasks.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Familiarise, do not research — and do not pre-write an answer",
          md: "The examining team is explicit that further research into the industry is not expected. What *is* expected is that you arrive understanding the organisation's business model, its structure, who its stakeholders are, its financial position and the terms the pre-seen uses. The one thing that reliably damages candidates is arriving with a rehearsed answer: the exhibits in the exam are new, and a prepared analysis forced onto facts that point elsewhere reads worse than no preparation at all.",
        },
        {
          kind: "table",
          caption: "Useful preparation from the pre-seen",
          head: ["Do this", "Why it pays in the exam"],
          rows: [
            ["Summarise the business model on one page", "You can locate any task instantly in what the organisation does"],
            ["List the stakeholders and what each wants", "Half the tasks turn on a stakeholder claim"],
            ["Note the financial position and any covenant or funding constraint", "Recommendations must respect what it can afford"],
            ["Note the governance structure — board, committees, ownership", "Governance defects are usually visible from the pre-seen alone"],
            ["Learn the industry vocabulary the pre-seen uses", "Saves re-reading in the exam, and using their terms reads professionally"],
            ["Identify the obvious strategic pressures", "Gives you context, not an answer"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The trap: an answer built only from the pre-seen",
          md: "Technical marks come from applying knowledge to the *new* exhibits. A response drawn entirely from the pre-seen recites the background the examiner supplied and misses the task, which is why the pre-seen is context and the exhibits are evidence. If you have written a paragraph that would have been true two weeks ago, it is probably not earning anything.",
        },
      ],
      check: {
        q: "How should the two weeks before the exam be spent on the pre-seen?",
        options: [
          "Researching the real industry the fictitious organisation is modelled on",
          "Understanding the organisation's model, stakeholders, financial position, governance and vocabulary — without drafting answers, since the exhibits and tasks are new",
          "Preparing model answers on the strategic issues the pre-seen implies",
          "Memorising the pre-seen in full, as it is not available during the exam",
        ],
        correct: 1,
        explain:
          "Further research is not expected and the pre-seen IS available in the exam, so memorising is wasted effort. The real risk is option 2: a rehearsed answer gets forced onto new exhibits that point somewhere else.",
      },
    },
    {
      id: "reading-the-requirement",
      heading: "Reading the task, then the exhibits",
      blocks: [
        {
          kind: "text",
          md: "The order matters. Read the **task** first, so you know what you are looking for, then read the exhibits it points to. Reading every exhibit first and then discovering the requirement means reading everything twice and remembering neither.",
        },
        {
          kind: "table",
          caption: "What to extract from a requirement before reading anything else",
          head: ["Element", "Question", "Why it changes the answer"],
          rows: [
            ["Role", "Who am I in this task?", "Determines what you may assume and how directly you can criticise"],
            ["Recipient", "Who receives this?", "Sets tone and technical level"],
            ["Output", "Report, notes, email, slides?", "Communication marks depend on it"],
            ["Verb", "Evaluate, advise, assess, explain, recommend?", "Determines the depth and whether a conclusion is required"],
            ["Subject", "About what, exactly?", "Narrow subjects are lost by writing about the topic generally"],
            ["Marks", "How many, and any stated split?", "Sets the time and the number of points"],
            ["Skills named", "Which professional skills are being assessed?", "Tells you how the marks are earned, not just what to write"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The verb is the instruction — and the marks follow it",
          md: "**Explain** wants the mechanism and the reason. **Assess** and **evaluate** want both sides and a conclusion. **Advise** and **recommend** want a decision with actions attached. **Analyse** wants the components and the cause. A candidate who explains where the task said evaluate has answered a different question competently, and the marker cannot award the conclusion marks that were never written.",
        },
        {
          kind: "text",
          md: "Then build an **exhibit map**: a short index of which exhibit carries the evidence for which task. Exhibits in SBL are deliberately mixed — board minutes, an email exchange, a spreadsheet extract, a press comment, a consultant's summary — and material for one task is scattered across several while some exhibits serve more than one task. Mapping first stops you reading the whole pack three times.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Keep a conflict log as you read",
          md: "SBL plants inconsistencies: a director's assertion contradicted by the dashboard, two figures on different bases, a period that does not match. Note them the moment you see them rather than trusting yourself to remember, because each one is a scepticism mark waiting to be claimed and they are easy to lose track of once you start writing.",
        },
      ],
      check: {
        q: "A task says: 'As an external consultant, evaluate the board's proposed response to the supply disruption and recommend a course of action. (14 marks, including 4 professional skills marks for evaluation.)' What does the requirement tell you to produce?",
        options: [
          "An explanation of why supply disruptions occur, with examples",
          "A balanced assessment of the proposed response reaching a conclusion, plus a recommended course of action — with the evaluation skill earning marks through how the weighing is done",
          "A description of the board's proposal as set out in the exhibits",
          "An analysis of the causes of the disruption",
        ],
        correct: 1,
        explain:
          "Two verbs are given and both must be answered: evaluate — weigh and conclude — and recommend — decide and say what happens. The named professional skill confirms the weighing itself is being marked, so a description or a causes-only analysis leaves most of the marks unclaimed.",
      },
    },
    {
      id: "time-and-navigation",
      heading: "Time, and moving around the workspace",
      blocks: [
        {
          kind: "text",
          md: "The exam is **3 hours 15 minutes — 195 minutes — for 100 marks**, and that time includes reading, planning and reflection, which can be used flexibly at any point rather than being a fixed block at the start. The arithmetic that follows is the most useful number in this chapter.",
        },
        {
          kind: "formula",
          name: "Minutes per mark",
          expr: "195 minutes ÷ 100 marks ≈ 1.95 minutes per mark",
          note: "So a 20-mark task deserves about 39 minutes including its share of reading and planning, and a 30-mark task about 58.",
        },
        {
          kind: "table",
          caption: "Working a task to its marks",
          head: ["Task marks", "Total time", "Roughly: read and plan", "Write"],
          rows: [
            ["20", "39 min", "10–12 min", "27–29 min"],
            ["30", "58 min", "14–17 min", "41–44 min"],
            ["40", "78 min", "18–22 min", "56–60 min"],
            ["50", "97 min", "22–28 min", "69–75 min"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "All three tasks are compulsory, so the marginal mark is always in the task you have not started",
          md: "The first points on an unattempted task are the easiest marks in the paper, and the last points on a task you have already answered well are the hardest. Overrunning on a strong task to gain two more marks while leaving a task unstarted is the single most expensive error available in SBL. Set a stop time per task before you begin and move when it arrives, even mid-sentence.",
        },
        {
          kind: "text",
          md: "Planning is not lost time. Five minutes deciding the points, their order and the format saves more than that in re-writing, and it protects the structure the communication marks depend on. A short plan also means that if you run short you can convert the remaining points into brief statements rather than stopping mid-argument with nothing to show for the analysis you did.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Workspace discipline",
          items: [
            "**Answer each requirement in its own clearly headed response** so the marker never has to search",
            "**Use the requirement's own words as headings** — it proves you addressed it",
            "**Keep the exhibit and your answer visible together** rather than switching repeatedly",
            "**Type into the response area, not into a scratchpad you then have to copy**",
            "**Save or confirm as you go**, in whatever way the platform provides",
            "**Leave two minutes per task** to check every requirement has been answered",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The final requirement check catches the commonest avoidable loss",
          md: "Tasks routinely contain two or three distinct instructions in one paragraph — evaluate *and* recommend, or advise on the risk *and* the control. Candidates answer the first and stop, and the marks for the second are simply unclaimed. Re-read each requirement at the end and tick each instruction off against your answer.",
        },
      ],
      check: {
        q: "With 25 minutes remaining you have written a strong answer to task 2 and have not begun task 3, worth 30 marks. What should you do?",
        options: [
          "Continue improving task 2, since a strong answer secures those marks",
          "Move to task 3 immediately — the opening marks on an unattempted 30-mark task are far easier to obtain than further marks on a task already answered well",
          "Split the remaining time equally between refining task 2 and starting task 3",
          "Write a brief note explaining that time ran short",
        ],
        correct: 1,
        explain:
          "Marks are not equally hard to get: the first few on a fresh 30-mark task come from stating obvious relevant points, while additional marks on a good answer require increasingly fine analysis. All tasks are compulsory, which is what makes leaving one unstarted so costly.",
      },
    },
  ],
  examTraps: [
    { trap: "Arriving with a pre-written answer based on the pre-seen.", fix: "The exhibits are new; use the pre-seen as context and answer the task in front of you." },
    { trap: "Reading all the exhibits before reading the task.", fix: "Read the requirement first, then map which exhibit serves which task." },
    { trap: "Answering a different verb from the one set.", fix: "Explain gives mechanism; evaluate weighs and concludes; advise decides and acts." },
    { trap: "Overrunning a strong task while another is unstarted.", fix: "Set a stop time per task by its marks and move when it arrives." },
    { trap: "Answering the first instruction in a requirement and missing the second.", fix: "Tick every instruction off against your answer before moving on." },
  ],
  keyTerms: [
    { term: "Pre-seen material", def: "Background on the organisation and its industry released two weeks before the exam and available during it." },
    { term: "Exhibit", def: "New information supplied in the exam — minutes, emails, spreadsheets, reports — carrying the evidence for the tasks." },
    { term: "Exhibit map", def: "A short index linking each task to the exhibits holding its evidence." },
    { term: "Conflict log", def: "A running note of inconsistencies between sources, each a potential scepticism mark." },
    { term: "Reading, planning and reflection time", def: "Time included within the 195 minutes, usable flexibly rather than as a fixed opening block." },
  ],
  summary: [
    "Use the pre-seen to learn the organisation, not to draft answers — the exhibits are new.",
    "Read the task first: role, recipient, output, verb, subject, marks and named skills.",
    "Build an exhibit map and keep a conflict log while reading.",
    "195 minutes for 100 marks is about 1.95 minutes a mark — set a stop time per task.",
    "The easiest remaining marks are always in the task you have not started.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the pre-seen for, and what is it not for?", a: "Understanding the organisation, its stakeholders, finances, governance and vocabulary — not for research into the real industry, and not for drafting answers to unseen tasks." },
    { q: "What seven things should be read out of a requirement?", a: "Role, recipient, output format, the verb, the precise subject, the marks, and any professional skills named." },
    { q: "How much time does a mark deserve?", a: "About 1.95 minutes — 195 minutes for 100 marks — inclusive of that task's share of reading and planning." },
    { q: "Why is leaving a task unstarted so costly?", a: "All tasks are compulsory, and the opening marks on a fresh task are far easier than further marks on one already answered well." },
  ],
  furtherStudy: [
    "SBL-46 covers producing the deliverable itself",
    "SBL-40 covers the format and tone the requirement specifies",
    "SBL-43 covers the scepticism a conflict log feeds",
    "SBL-44 covers answering an 'evaluate' verb properly",
  ],
}

const SBL_TREE_46: StudyChapter = {
  paper: "SBL",
  id: "SBL-46",
  number: 46,
  area: "J",
  syllabusRefs: ["J2", "J4"],
  title: "Producing the deliverable, and presenting data",
  minutes: 16,
  intro:
    "The exam expects you to work as you would in the workplace, using a word processor and a spreadsheet to produce something a real recipient could act on. This chapter is about making that work for you rather than against the clock.",
  outcomes: [
    "Work up a response using the tools the exam provides, as the workplace would expect",
    "Lay out a written response so a marker can follow it and find every requirement",
    "Use a spreadsheet so the figures are visible, checkable and support the argument",
    "Present data and information so the recipient can see the point without decoding it",
  ],
  sections: [
    {
      id: "word-processing",
      heading: "The written response",
      blocks: [
        {
          kind: "text",
          md: "Most SBL marks are earned in prose typed into a word processor, and layout affects the score. A marker working through a script awards points they can find: a wall of undifferentiated text hides its own content, while a headed and spaced response makes each point visible.",
        },
        {
          kind: "table",
          caption: "Layout that earns rather than costs",
          head: ["Do", "Instead of", "Why"],
          rows: [
            ["Heading per requirement, in the requirement's words", "One continuous response", "Proves each instruction was addressed"],
            ["Short paragraphs, one point each", "Long combined paragraphs", "A point buried mid-paragraph is easily missed"],
            ["Bold the recommendation or key figure", "Uniform text", "Directs the reader to the conclusion"],
            ["Bullets for lists of factors or actions", "Prose lists", "Faster to write, easier to mark"],
            ["Prose for reasoning and judgement", "Bullets throughout", "A bullet cannot carry an evaluation"],
            ["A closing recommendation section", "Recommendations scattered through", "The reader needs the decision in one place"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Bullets for factors, prose for judgement",
          md: "This is the balance candidates get wrong in both directions. A page of bullet fragments cannot demonstrate evaluation, because weighing requires connected reasoning — \"however\", \"on balance\", \"which matters more here because\". Equally, listing eight risk factors as full paragraphs wastes time you need elsewhere. Use bullets to cover ground and prose where a mark depends on the thinking being visible.",
        },
        {
          kind: "text",
          md: "Write for the recipient the task named. A report to a board takes headings and a recommendations section; briefing notes take short scannable points; an email opens with its purpose and closes with a clear request. Where slides are asked for, one message per slide with a few supporting points beneath it — and if speaker notes are requested, that is where the explanation goes, not on the slide.",
        },
      ],
      check: {
        q: "A task worth 12 marks asks you to evaluate two options and recommend one. Which layout serves best?",
        options: [
          "A single flowing narrative covering both options and ending with a preference",
          "A heading per option with bulleted advantages and disadvantages, then a short prose passage weighing them and a bold recommendation with next steps",
          "Bullet points throughout, including the comparison and the conclusion",
          "A table of the two options with no narrative",
        ],
        correct: 1,
        explain:
          "Bullets cover the factors efficiently and prose carries the weighing that evaluation marks require — the balance the requirement needs. All-bullets cannot demonstrate judgement, and a single narrative or a bare table makes the marker hunt for the points.",
      },
    },
    {
      id: "spreadsheet",
      heading: "Using the spreadsheet",
      blocks: [
        {
          kind: "text",
          md: "SBL is not a computational paper, and a small amount of calculation frequently makes an argument that adjectives cannot. The spreadsheet exists so figures can be worked and shown; the skill is producing something a reader can follow rather than a block of numbers.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Spreadsheet practice that earns marks",
          items: [
            "**Label every row and column** — an unlabelled figure earns nothing",
            "**State the units and the period**, once, clearly",
            "**Show the calculation** rather than only the result, so the method is visible even if a figure is wrong",
            "**Use formulae referencing cells** rather than typing computed values, so a corrected input flows through",
            "**Keep inputs separate from calculations** so an assumption can be changed and seen",
            "**State assumptions beside the figures**, not in a separate paragraph the reader must find",
            "**Round sensibly** — three decimal places on a forecast implies precision that does not exist",
            "**Say what the numbers mean** in the written response; the spreadsheet supports the argument, it is not the argument",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Method marks survive an arithmetic error — but only if the method is visible",
          md: "A wrong figure with the workings shown demonstrates that you knew what to calculate and why, and that reasoning can still be credited. The same wrong figure with no workings shows nothing. This is the single strongest reason to show calculations rather than typing an answer, and it applies just as much to a two-line ratio as to a full appraisal.",
        },
        {
          kind: "text",
          md: "Two habits protect you against the exam's data problems. **Reconcile before combining**: if two exhibits give figures on different bases or periods, say which basis you have used rather than mixing them silently. And **flag what you cannot compute** — \"the working-capital requirement cannot be quantified from the information given; the disclosure needed is X\" is an honest, creditable statement, and considerably better than inventing a number.",
        },
      ],
      check: {
        q: "You calculate a break-even volume, make an arithmetic slip, and reach the wrong figure. What determines whether any credit is available?",
        options: [
          "Nothing — an incorrect figure earns nothing",
          "Whether the method is visible: labelled workings showing what you calculated and why can still be credited, where a bare wrong answer cannot",
          "Whether the error is small enough to be immaterial",
          "Whether you noted that the figure might be wrong",
        ],
        correct: 1,
        explain:
          "Marks follow demonstrated understanding, so visible workings show you knew which calculation the situation required even when the arithmetic failed. That is why showing the method is worth the extra seconds it costs.",
      },
    },
    {
      id: "presenting-data",
      heading: "Presenting data so the point lands",
      blocks: [
        {
          kind: "text",
          md: "J4 asks you to present data and information effectively using appropriate tools. The test is whether the recipient sees the point without having to work it out — which means choosing the right form and doing the interpretation for them.",
        },
        {
          kind: "table",
          caption: "Choosing the form",
          head: ["What you are showing", "Best form", "Avoid"],
          rows: [
            ["Two or three options against several criteria", "A comparison table", "Prose the reader must hold in their head"],
            ["A trend over several periods", "A short series with the change stated", "A long table of raw figures"],
            ["Composition of a total", "Proportions with the largest first", "Unordered lists of components"],
            ["A single decisive figure", "A sentence with the figure in bold", "A table containing one number"],
            ["A sequence of steps or a process", "A numbered list", "A paragraph describing the order"],
            ["A calculation supporting an argument", "Spreadsheet workings, referenced from the prose", "Numbers dropped in with no explanation"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Never present data without its interpretation",
          md: "A table or a figure states a fact; the mark comes from what it means. Follow every presented number with the consequence: \"receivable days have risen from 42 to 71 — about $3.1m of cash, against $2.4m of remaining facility, so the shortfall arrives within two months.\" The data alone leaves the reader to do the analysis, which is the work they engaged you for.",
        },
        {
          kind: "text",
          md: "Order for the reader, not for yourself. Put the most significant item first — the largest exposure, the strongest option, the nearest deadline — rather than in the sequence the exhibits happened to supply. Ranking is itself a judgement and it demonstrates the commercial acumen from SBL-41 as well as satisfying this outcome.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The professional finish",
          md: "Before submitting a task: does every requirement have a headed answer; is the recommendation stated and findable; are figures labelled with units; are assumptions stated; is the format the one asked for; and would the named recipient be able to act on this without asking you a question? That last one is the real test of every skill in Areas I and J together.",
        },
      ],
      check: {
        q: "Which presentation of the same information is most effective for a board?",
        options: [
          "A table of monthly receivable days for 24 months",
          "\"Receivable days have risen from 42 to 71, tying up roughly $3.1m more cash than a year ago against $2.4m of remaining facility — so collection must improve within about two months\"",
          "A statement that working capital has deteriorated significantly",
          "A spreadsheet of all customer balances with ageing",
          ],
        correct: 1,
        explain:
          "It gives the movement, its size in cash, the comparison that makes it urgent and the deadline — the interpretation the board needs. Raw tables leave the analysis undone, and option 2 gives a conclusion with nothing supporting it.",
      },
    },
  ],
  examTraps: [
    { trap: "One continuous block of text for a multi-part requirement.", fix: "A heading per requirement, in the requirement's own words." },
    { trap: "Answering entirely in bullet points.", fix: "Bullets cover factors; evaluation needs connected prose to be visible." },
    { trap: "Typing calculated values with no workings.", fix: "Show the method — it can be credited when the arithmetic fails." },
    { trap: "Mixing figures from different bases or periods.", fix: "Reconcile, state which basis you used, and flag what cannot be computed." },
    { trap: "Presenting a table or figure with no interpretation.", fix: "Follow every number with what it means and what follows from it." },
  ],
  keyTerms: [
    { term: "Method marks", def: "Credit for demonstrating the correct approach, available where workings are visible even if a figure is wrong." },
    { term: "Basis of preparation", def: "The stated definitions, period and units behind a figure, which must be given when sources differ." },
    { term: "Interpretation", def: "The statement of what a presented figure means and what follows from it — where the mark actually sits." },
  ],
  summary: [
    "Layout affects the score: a heading per requirement, short paragraphs, findable recommendations.",
    "Bullets for factors, prose for judgement — evaluation cannot be shown in fragments.",
    "Show workings; method can be credited when the arithmetic is wrong.",
    "Reconcile differing bases and say honestly what cannot be computed.",
    "Never present data without its interpretation, and order it by significance.",
  ],
  knowledgeDiagnostic: [
    { q: "When should bullets be used, and when prose?", a: "Bullets to cover factors and actions efficiently; prose wherever a mark depends on connected reasoning, such as evaluation and weighing." },
    { q: "Why show spreadsheet workings?", a: "Method can be credited even when a figure is wrong; a bare incorrect answer demonstrates nothing." },
    { q: "What should be done when two exhibits give figures on different bases?", a: "Reconcile them, state which basis has been used, and say what remains unresolved rather than mixing them silently." },
    { q: "What is the final check before submitting a task?", a: "Every requirement headed and answered, the recommendation findable, figures labelled with units, assumptions stated, the requested format used — and whether the recipient could act without asking a question." },
  ],
  furtherStudy: [
    "SBL-45 covers planning the task before producing it",
    "SBL-40 covers the format, tone and structure this delivers",
    "SBL-42 covers the analysis the figures support",
    "SBL-33 covers the ratios most often calculated in a task",
  ],
}

export const SBL_TREE_AREA_J: StudyChapter[] = [SBL_TREE_45, SBL_TREE_46]
