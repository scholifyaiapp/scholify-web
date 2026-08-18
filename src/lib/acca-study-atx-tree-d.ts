import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * ATX-UK · the ethics chapter (C5), plus professional skills (D) and
 * employability and technology skills (E).
 *
 *   ATX-31  The ethics of tax planning            (C5)
 *   ATX-32  Professional skills                   (D)
 *   ATX-33  Employability and technology skills   (E)
 *
 * ATX-31 carries the FIVE ETHICS MARKS Section A awards in every sitting. They
 * are separately identified in the syllabus's marks breakdown — 35 technical,
 * 5 ethics, 10 professional skills — which makes them the most predictable
 * marks on the paper and the ones least often prepared for. The chapter is
 * therefore written as routines to follow rather than as a description of the
 * Code: a candidate needs to know what to DO when a client asks them to do
 * something wrong.
 *
 * See acca-study-atx-tree-a.ts for the Finance Act 2025 and rates rules
 * governing this whole paper.
 */

const ATX_TREE_31: StudyChapter = {
  paper: "ATX",
  id: "ATX-31",
  number: 31,
  area: "C",
  syllabusRefs: ["C5"],
  title: "The ethics of tax planning",
  minutes: 18,
  intro:
    "Five marks, every sitting, separately identified in the exam's own marks breakdown. They go to whoever knows the threat, the safeguard and — crucially — the sequence of actions.",
  outcomes: [
    "Identify the ethical threats arising in tax work and name them correctly",
    "Apply the fundamental principles to a tax adviser's situation",
    "Set out the correct sequence of actions where a client refuses to correct an error",
    "Explain the money laundering obligations and the prohibition on tipping off",
    "Advise on conflicts of interest and the limits of confidentiality",
  ],
  sections: [
    {
      id: "threats",
      heading: "The threats, in a tax setting",
      blocks: [
        {
          kind: "table",
          caption: "The five threats and how they arise in tax work",
          head: ["Threat", "How it appears", "Safeguard"],
          rows: [
            ["Self-interest", "A large fee, a fee contingent on the tax saved, or a client who is a major source of income", "Avoid contingent fees on tax positions; monitor fee dependency; second-partner review"],
            ["Self-review", "Advising on a scheme and then reporting the position it produced", "Separate teams; independent review of the filing position"],
            ["Advocacy", "Arguing a client's position so firmly that objectivity is lost", "Distinguish presenting a case from asserting a certainty; document the basis"],
            ["Familiarity", "A long relationship, personal friendship, or family connection", "Rotate staff; involve someone independent in judgement calls"],
            ["Intimidation", "A client threatening to leave, to complain, or to withhold fees unless a position is taken", "Escalate internally; document; be prepared to resign"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Name the threat, name the safeguard, then act",
          md: "An answer saying only 'this is unethical' has done a third of the work. The marks are for **identifying which threat**, **proposing a specific safeguard**, and **stating what the adviser should do** — in that order. Where no safeguard can reduce the threat to an acceptable level, the answer is to decline the engagement or resign, and saying so plainly is expected rather than dramatic.",
        },
        {
          kind: "text",
          md: "**Contingent fees** deserve their own mention because they arise so often in tax scenarios. A fee calculated as a percentage of the tax saved gives the adviser a direct financial interest in the position taken, which is a self-interest threat of the most obvious kind. It is generally inappropriate for work on tax positions, and identifying it in a scenario is a straightforward mark.",
        },
      ],
      check: {
        q: "A client offers a fee equal to 20% of any tax saved by a proposed arrangement. What is the issue and the response?",
        options: [
          "None — performance-based fees are normal commercial practice",
          "A self-interest threat: the adviser gains directly from a more aggressive position, compromising objectivity — so a contingent basis should not be used for advice on tax positions, and a fee based on time and complexity should be proposed instead",
          "An intimidation threat, resolved by documenting the advice",
          "A familiarity threat, resolved by rotating staff",
        ],
        correct: 1,
        explain:
          "Tying the fee to the tax saved aligns the adviser's income with aggression rather than with correctness, which is the definition of a self-interest threat. Naming the threat and proposing the alternative fee basis is the complete answer.",
      },
    },
    {
      id: "the-sequence",
      heading: "The error sequence — the routine to memorise",
      blocks: [
        {
          kind: "text",
          md: "The most frequently examined ethics scenario is this: the adviser discovers an error, or the client discloses one, and the client does not want it corrected. The examiner is testing whether the candidate knows the **order of actions**, so learn the sequence rather than the principles behind it.",
        },
        {
          kind: "list",
          style: "number",
          title: "The sequence",
          items: [
            "**Establish the facts** — is it an error at all, and is it material? Do not act on an assumption",
            "**Advise the client** to make full disclosure to HMRC, explaining that an unprompted disclosure attracts a far greater penalty reduction than a prompted one",
            "**Explain the consequences** of not disclosing — interest, higher penalties, and possible prosecution where the conduct was deliberate",
            "**Give them a reasonable opportunity** to correct it",
            "**If they refuse**, cease to act — write to the client explaining why, and do not be associated with a return you know to be wrong",
            "**Notify HMRC that you no longer act**, without disclosing the reason, since confidentiality survives the engagement",
            "**Consider whether a money laundering report is required**, since deliberate understatement is an offence and the proceeds are criminal property",
            "**Document everything** contemporaneously",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The two steps candidates get wrong",
          md: "**You do not report the error itself to HMRC.** Client confidentiality prevents it; you tell HMRC only that you have ceased to act, and not why. And **you must not tell the client you have made a money laundering report** — that is **tipping off**, a criminal offence in its own right. Candidates routinely propose disclosing the error to HMRC directly and warning the client about the report; both are wrong, and both cost marks.",
        },
        {
          kind: "text",
          md: "The **money laundering** obligation is separate from and overrides confidentiality. Deliberate tax evasion generates criminal property, so a suspicion must be reported internally to the firm's nominated officer, who decides on an external report. The reporting adviser has protection for the disclosure — and no discretion to stay silent because the client is long-standing or the amount is small.",
        },
      ],
      check: {
        q: "A client refuses to correct a deliberate understatement in a filed return. What should the adviser do?",
        options: [
          "Report the error to HMRC directly, since the public interest overrides confidentiality",
          "Cease to act; notify HMRC that they no longer act without giving the reason; report the suspicion internally under the money laundering rules; and not tell the client a report has been made, since that would be tipping off",
          "Continue to act but document the disagreement carefully",
          "Correct the return without the client's authority",
        ],
        correct: 1,
        explain:
          "Each element matters: confidentiality prevents disclosing the error itself, ceasing to act prevents association with it, the money laundering report is compulsory rather than discretionary, and telling the client about that report is a separate criminal offence. Option 0 is the most common wrong answer.",
      },
    },
    {
      id: "conflicts",
      heading: "Conflicts, confidentiality and new clients",
      blocks: [
        {
          kind: "table",
          caption: "Situations to recognise",
          head: ["Situation", "The issue", "The response"],
          rows: [
            ["Acting for both parties to a transaction", "Their interests diverge on price and structure", "Disclose to both; separate teams and information barriers; decline if it cannot be managed"],
            ["Acting for a divorcing couple", "Direct conflict", "Usually cannot act for both; establish which client is retained"],
            ["Acting for a company and its shareholders", "The extraction decision affects them differently", "Identify whose interests are being advised on each requirement"],
            ["A new client approaches", "Prior adviser, and the reason for the change", "Obtain the client's permission to contact the previous adviser and ask whether there is any reason not to accept"],
            ["Client asks about another client's affairs", "Confidentiality", "Decline; confidentiality is not limited to secrets and survives the relationship"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Professional clearance is a two-step process",
          md: "Before accepting a new client, the adviser must obtain the **client's permission** to approach the previous adviser, then ask that adviser whether there is any professional reason not to accept. If permission is refused, that refusal is itself significant and would normally lead to declining the engagement. Stating both steps is what earns the mark, and candidates typically state only the second.",
        },
        {
          kind: "text",
          md: "**Confidentiality** binds during and after the engagement and is not confined to information the client has marked sensitive. It yields to a legal obligation to disclose — most obviously a money laundering report — and to a professional duty to defend oneself in proceedings, but not to a general public interest in tax being paid.",
        },
      ],
      check: {
        q: "A prospective client refuses permission for the adviser to contact their previous accountant. What does this indicate?",
        options: [
          "Nothing — professional clearance is a courtesy",
          "It is a significant warning sign: the clearance process exists to reveal reasons not to accept, and a refusal to permit it would normally lead to declining the engagement",
          "The adviser should contact the previous accountant anyway",
          "The adviser should accept but charge a higher fee",
        ],
        correct: 1,
        explain:
          "The client's permission is required precisely because the enquiry might reveal something they would prefer concealed, so refusing it removes the safeguard and is itself the information. Contacting the previous adviser without permission — option 2 — would breach confidentiality.",
      },
    },
  ],
  examTraps: [
    { trap: "Saying an arrangement is unethical and stopping.", fix: "Name the threat, propose a safeguard, then state the action." },
    { trap: "Reporting the client's error to HMRC.", fix: "Confidentiality prevents it; notify only that you have ceased to act, without the reason." },
    { trap: "Telling the client a money laundering report has been made.", fix: "That is tipping off, a criminal offence." },
    { trap: "Omitting the client's permission from professional clearance.", fix: "Permission first, then the enquiry — and refusal is itself significant." },
  ],
  keyTerms: [
    { term: "Contingent fee", def: "A fee calculated by reference to the tax saved, creating a self-interest threat that generally makes it inappropriate for tax advice." },
    { term: "Tipping off", def: "Informing a person that a money laundering report has been made or an investigation is contemplated — a criminal offence." },
    { term: "Professional clearance", def: "The process of obtaining a prospective client's permission to approach their previous adviser, and asking whether there is any reason not to accept." },
  ],
  summary: [
    "Five ethics marks are awarded in Section A every sitting — they are the most predictable on the paper.",
    "Name the threat, the safeguard and the action, in that order.",
    "On a refused correction: cease to act, notify HMRC only that you no longer act, report internally, do not tip off.",
    "Professional clearance needs the client's permission first, and refusal is itself the answer.",
  ],
  knowledgeDiagnostic: [
    { q: "What do you tell HMRC when a client refuses to correct an error?", a: "Only that you have ceased to act — confidentiality prevents disclosing the error itself." },
    { q: "Why can you not warn the client about a money laundering report?", a: "Doing so is tipping off, which is a criminal offence separate from the underlying matter." },
    { q: "What makes a contingent fee inappropriate for tax advice?", a: "It gives the adviser a direct financial interest in a more aggressive position, which is a self-interest threat to objectivity." },
  ],
  furtherStudy: [
    "ATX-28 covers the planning-avoidance-evasion spectrum these duties police.",
    "ATX-26 covers the disclosure obligations that sit alongside them.",
    "ATX-32 covers the professional skills these ethical judgements demonstrate.",
  ],
}

const ATX_TREE_32: StudyChapter = {
  paper: "ATX",
  id: "ATX-32",
  number: 32,
  area: "D",
  syllabusRefs: ["D1", "D2", "D3", "D4"],
  title: "Professional skills",
  minutes: 15,
  intro:
    "Ten marks in Section A and five in each Section B question. They are earned in how the technical content is written, not in a section of their own.",
  outcomes: [
    "Communicate in the format and register the requirement specifies",
    "Analyse and evaluate the scenario's evidence rather than restating it",
    "Apply scepticism to a client's account and to the figures supplied",
    "Demonstrate commercial acumen in a tax recommendation",
    "Recognise where each skill is examined",
  ],
  sections: [
    {
      id: "where-examined",
      heading: "Where each skill is examined",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Communication is Section A only",
          md: "The syllabus states that Section A examines **all four** professional skills, while Section B examines a combination appropriate to the question — with each Section B question testing at least two from **analysis and evaluation, scepticism and commercial acumen**. Communication is **not** examined in Section B. So the letter-or-report format matters in Section A and the marks in Section B go to the other three.",
        },
        {
          kind: "table",
          caption: "What each looks like in a tax answer",
          head: ["Skill", "Demonstrated by"],
          rows: [
            ["Communication", "The requested format and recipient; a structure the client can follow; technical points explained in language they can act on"],
            ["Analysis and evaluation", "Comparing routes on total cost, timing and conditions; drawing a conclusion rather than listing consequences"],
            ["Scepticism", "Questioning the completeness of the facts, the client's account of a transaction, and figures that look inconsistent"],
            ["Commercial acumen", "Practicality, cost of implementation, the client's cash position, and the non-tax factors that decide the choice"],
          ],
        },
        {
          kind: "text",
          md: "**Scepticism in a tax context** is specific: clients describe transactions in the way most favourable to themselves, sometimes without realising it. A client who says they 'sold' something to a relative may have sold at an undervalue; one who says they 'left the UK' may not have met a split-year case; one who says a company is 'trading' may hold substantial investments. Testing the client's characterisation against the facts is exactly what the skill means here.",
        },
      ],
      check: {
        q: "A client states that they gifted shares to their son 'about eight years ago' and that the gift is therefore outside their estate. What does scepticism require?",
        options: [
          "Accepting the statement, as the client would know",
          "Establishing the exact date, since the seven-year rule turns on it and 'about eight years' may be six; and checking whether the client retained any benefit, which would make it a gift with reservation regardless of the period",
          "Assuming the gift was seven years ago to be prudent",
          "Recomputing the estate without the shares",
        ],
        correct: 1,
        explain:
          "Both parts matter: an approximate date cannot support a conclusion that depends on a precise one, and continued benefit would defeat the gift however long ago it was made. Testing a client's characterisation against the underlying facts is what scepticism means in tax work.",
      },
    },
    {
      id: "acumen",
      heading: "Commercial acumen in tax advice",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "What demonstrates it",
          items: [
            "**Cash flow** — when the tax falls due, and whether the client will have the money then",
            "**Cost of implementation** — professional fees and ongoing compliance against the saving",
            "**Proportionality** — not recommending a structure whose cost exceeds its benefit",
            "**Deliverability** — whether the client, and any third party whose claim is needed, will actually act",
            "**Sequencing** — the order in which steps must occur, and what must happen before a year end",
            "**The non-tax consequences** — control, security, family relationships, commercial credibility",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The sentence that earns the marks",
          md: "After the recommendation, add: **who must do what, by when, and what it will cost.** In a tax context that usually means naming the claim or election, the party who must join in it, and the deadline. It converts a technically correct conclusion into something the client can implement — which is the whole of commercial acumen in this paper.",
        },
        {
          kind: "text",
          md: "One further point specific to ATX: the client frequently **cannot afford** the tax-optimal route. Gift relief defers a gain but leaves the donee with a latent liability they may not be able to fund; business asset disposal relief costs cash now. Where a scenario tells you the client's cash position, it is telling you which route is actually available — and using that is commercial acumen rather than a caveat.",
        },
      ],
      check: {
        q: "Which addition to a recommendation best demonstrates commercial acumen?",
        options: [
          "A statement that the advice is based on current legislation",
          "A note that gift relief requires a joint claim with the donee within the time limit, that the donee should be told they are acquiring a latent liability, and that the client should confirm they can fund the professional costs before proceeding",
          "A summary of the tax saved",
          "A list of the alternative routes considered",
        ],
        correct: 1,
        explain:
          "It names who must act, by when, what the other party is taking on, and what it costs — the four things that decide whether the advice is implementable. The others are legitimate parts of the answer but none of them addresses deliverability.",
      },
    },
  ],
  examTraps: [
    { trap: "Writing a separate professional skills section.", fix: "They are demonstrated through how the technical content is presented." },
    { trap: "Using the letter format in Section B.", fix: "Communication is examined in Section A only." },
    { trap: "Accepting the client's characterisation of a transaction.", fix: "Test 'sold', 'gifted', 'left the UK' and 'trading' against the facts." },
    { trap: "Recommending without deliverability.", fix: "Name the claim, the party, the deadline and the cost." },
  ],
  keyTerms: [
    { term: "Professional scepticism", def: "Testing a client's account and the supplied figures rather than accepting the characterisation most favourable to them." },
    { term: "Deliverability", def: "Whether the client and any third party whose action is required will actually be able to implement the recommendation in time." },
  ],
  summary: [
    "Section A examines all four skills; Section B examines at least two, never communication.",
    "Scepticism means testing the client's characterisation against the underlying facts.",
    "Commercial acumen means cash flow, cost, proportionality, deliverability and sequencing.",
    "Close every recommendation with who must do what, by when, and at what cost.",
  ],
  knowledgeDiagnostic: [
    { q: "Which professional skill is not examined in Section B?", a: "Communication — Section B examines at least two of analysis and evaluation, scepticism and commercial acumen." },
    { q: "What does scepticism mean specifically in tax work?", a: "Testing the client's own characterisation of events — sold, gifted, left the UK, trading — against the underlying facts." },
    { q: "What single addition makes a recommendation implementable?", a: "Naming who must do what, by when, and at what cost — usually the claim, the party who must join it, and the deadline." },
  ],
  furtherStudy: [
    "ATX-25 covers presenting a recommendation these skills are demonstrated in.",
    "ATX-31 covers the ethics marks awarded alongside them in Section A.",
    "ATX-33 covers the tools used to present the answer.",
  ],
}

const ATX_TREE_33: StudyChapter = {
  paper: "ATX",
  id: "ATX-33",
  number: 33,
  area: "E",
  syllabusRefs: ["E1", "E2", "E3", "E4"],
  title: "Employability and technology skills",
  minutes: 13,
  intro:
    "A tax answer is judged partly on whether a marker can follow it. These are the habits that make workings traceable and the answer readable under time pressure.",
  outcomes: [
    "Access and navigate the exhibits efficiently",
    "Use the spreadsheet for computations and the word processor for advice",
    "Present tax computations so that method marks are available",
    "Produce the format the requirement specifies",
    "Manage time across a case study and two scenario questions",
  ],
  sections: [
    {
      id: "working-method",
      heading: "A working method for a tax exam",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The approach",
          items: [
            "**Read the requirements first**, then the exhibits — you will read the scenario once instead of twice",
            "**Note which exhibit holds what**: the client's circumstances, the transactions, the figures, the rates",
            "**Identify the taxes** before computing anything, using the seven-item scan",
            "**Build the answer's headings** from the requirement, so each part is visibly addressed",
            "**Compute in the spreadsheet** with live formulae; **advise in the word processor**",
            "**Allocate time by marks** — roughly a minute and a half per mark, and stop when the time is spent",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Time discipline decides more results than knowledge does",
          md: "Section A is worth 50 marks and Section B two lots of 25. A candidate who overruns on Section A by twenty minutes has taken that time from a question where the first marks are the easiest on the paper. **Move on when the time for a requirement is spent**, even mid-computation — the marginal mark in an unstarted requirement is always worth more than the last mark in a finished one.",
        },
      ],
      check: {
        q: "A candidate has spent the time allocated to Section A but has one requirement unfinished. What should they do?",
        options: [
          "Finish it, since incomplete answers score nothing",
          "Move to Section B — the opening marks of an unattempted question are the easiest available, and they are worth more than the final marks of a nearly complete requirement",
          "Split the remaining time evenly across everything left",
          "Finish it and reduce the time on the final question only",
        ],
        correct: 1,
        explain:
          "Marks are hardest to earn at the end of a requirement and easiest at the beginning of one, so time moved from a finished answer to an unstarted question buys more. Incomplete answers do score, which is why option 0's premise is wrong.",
      },
    },
    {
      id: "presenting",
      heading: "Presenting tax work",
      blocks: [
        {
          kind: "table",
          caption: "Which tool, and how",
          head: ["Output", "Tool", "Practice"],
          rows: [
            ["Tax computations", "Spreadsheet", "Live formulae, one row per item, labelled — so a corrected input flows through"],
            ["Comparison of routes", "Spreadsheet or a table", "Columns for each route, rows for each tax, a total row and a difference"],
            ["Advice, explanation, recommendation", "Word processor", "Headings from the requirement, short paragraphs, a stated conclusion"],
            ["Letter or memorandum", "Word processor", "Addressee, purpose, body, recommendation — the Section A format marks"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Label every figure with its tax and its year",
          md: "A tax answer contains numbers from several taxes and several years at once, and an unlabelled column of figures is unmarkable. Write the tax, the tax year or accounting period, and what the figure is. It costs seconds and it is the difference between a marker awarding method marks and being unable to.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Habits that protect marks",
          items: [
            "**State assumptions** where the scenario is ambiguous rather than choosing silently",
            "**Show the working**, not just the result — method marks depend on it",
            "**Cross-reference** the computation from the narrative, so the advice and the figures connect",
            "**Round consistently** and say what basis you used",
            "**Answer the requirement asked**, in the order asked, with a heading for each part",
          ],
        },
      ],
      check: {
        q: "Why does labelling each figure with its tax and period matter in an ATX answer?",
        options: [
          "It is a presentation convention with no effect on marks",
          "An answer contains figures from several taxes and years simultaneously, so unlabelled numbers cannot be marked — labelling is what makes method marks available even where the arithmetic is wrong",
          "It is required by the exam software",
          "It reduces the time taken to compute",
        ],
        correct: 1,
        explain:
          "The marker must be able to tell what a number is before they can credit it. In a paper where income tax, capital gains tax and inheritance tax figures for several years appear in one answer, the label is what makes the working followable.",
      },
    },
  ],
  examTraps: [
    { trap: "Reading the exhibits before the requirements.", fix: "It forces a second pass through a long scenario." },
    { trap: "Overrunning on Section A.", fix: "The opening marks of an unattempted question are worth more than the last marks of a finished one." },
    { trap: "Producing unlabelled figures.", fix: "State the tax, the period and what the number is." },
    { trap: "Typing computed results into the spreadsheet.", fix: "Live formulae show the method and survive a corrected input." },
  ],
  keyTerms: [
    { term: "Method marks", def: "Marks for a correct approach visible in the workings, available even where the arithmetic contains an error." },
  ],
  summary: [
    "Requirements first, then exhibits; identify the taxes before computing.",
    "Spreadsheet for computations with live formulae; word processor for advice.",
    "Label every figure with its tax and period, and state assumptions.",
    "Allocate time by marks and move on when it is spent.",
  ],
  knowledgeDiagnostic: [
    { q: "Why move on from an unfinished requirement when its time is spent?", a: "The first marks of an unattempted question are easier to earn than the last marks of a nearly finished one." },
    { q: "What makes method marks available?", a: "Visible workings, labelled with the tax and period, so the marker can follow the approach despite an arithmetic error." },
    { q: "Which tool for which output?", a: "Spreadsheet with live formulae for computations; word processor with headings for advice and the requested format." },
  ],
  furtherStudy: [
    "ATX-32 covers the professional skills this presentation supports.",
    "ATX-30 covers presenting a numerical demonstration of mitigation.",
    "ATX-01 covers the exam structure these time allocations follow.",
  ],
}

export const ATX_TREE_AREA_C2: StudyChapter[] = [ATX_TREE_31]
export const ATX_TREE_AREA_D: StudyChapter[] = [ATX_TREE_32]
export const ATX_TREE_AREA_E: StudyChapter[] = [ATX_TREE_33]
