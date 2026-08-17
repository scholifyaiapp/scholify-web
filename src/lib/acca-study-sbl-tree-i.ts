import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBL · Area I — Professional skills.
 *
 * Twenty of the hundred marks, and the difference between a technically
 * competent script that fails and one that passes. The shim served the whole area
 * from four sections of the legacy professional-skills chapter — the same chapter
 * Area A used to be carved out of.
 *
 *   SBL-40  Communication         (I1)
 *   SBL-41  Commercial acumen     (I2)
 *   SBL-42  Analysis              (I3)
 *   SBL-43  Scepticism            (I4)
 *   SBL-44  Evaluation            (I5)
 *
 * One chapter per skill, because each is awarded separately, each is earned in a
 * different way, and candidates lose them for different reasons.
 *
 * The governing principle, stated in every chapter: professional skills marks are
 * awarded for HOW the technical content is delivered, not for anything written
 * separately. There is no paragraph you can add to earn them. A candidate who
 * knows the syllabus and writes an undifferentiated essay loses up to twenty
 * marks without getting a single technical point wrong.
 *
 * Written against the official ACCA SBL syllabus and study guide for September
 * 2026 to June 2027. Not derived from any approved-provider text.
 */

const SBL_TREE_40: StudyChapter = {
  paper: "SBL",
  id: "SBL-40",
  number: 40,
  area: "I",
  syllabusRefs: ["I1(a)", "I1(b)", "I1(c)"],
  title: "Communication",
  minutes: 17,
  intro:
    "The skill most easily earned and most casually thrown away. A task tells you the role you hold, who is receiving the answer and what form it should take — and a candidate who ignores all three has lost the marks before writing anything.",
  outcomes: [
    "Write in the format a task asks for, and know what each format actually looks like",
    "Pitch tone and technical level at the stated recipient, including where they are not an accountant",
    "Build a persuasive case, and deal with the opposing argument rather than ignoring it",
    "Make a complex matter clear to someone who has to act on it without your expertise",
  ],
  sections: [
    {
      id: "role-recipient-format",
      heading: "Role, recipient, format — read them before anything else",
      blocks: [
        {
          kind: "text",
          md: "Every SBL task places you in a role and gives you an audience. You may be an external consultant reporting to a board, a newly appointed finance director briefing a chief executive, an adviser preparing notes for a chair to use in a meeting, or an internal specialist writing to a committee. These are not decoration: they determine what you may assume, what you must explain, how directly you can criticise, and what the document should look like.",
        },
        {
          kind: "table",
          caption: "What each format actually requires",
          head: ["Format asked for", "Shape", "Common failure"],
          rows: [
            ["Report", "Title, addressee, purpose, headed sections, conclusion and recommendations", "No headings; recommendations buried in prose"],
            ["Briefing notes", "Short headed points for someone else to speak from", "Written as continuous prose the reader cannot use live"],
            ["Email or letter", "Salutation, purpose in the first line, short paragraphs, clear ask", "Report structure inside an email; no stated request"],
            ["Presentation slides", "A heading and a few supporting points per slide, with speaker notes if asked", "Paragraphs pasted onto slides"],
            ["Memorandum", "To, from, date, subject, then focused content", "Missing the header block entirely"],
            ["Statement or announcement", "Written for the external audience who will read it", "Written as internal analysis"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Give the marker the format's signals",
          md: "A marker awarding communication marks is looking for evidence that you answered in the requested form. So supply the visible signals: a heading block for a memo, a salutation and a clear ask for an email, section headings for a report, slide titles with bullets for slides. It costs three lines and it is the cheapest mark in the paper.",
        },
        {
          kind: "text",
          md: "Tone follows the recipient's position, not just their knowledge. Advising a board on a director's misconduct requires plain statement without accusation; writing to staff about redundancies requires directness with humanity; a report a regulator may read must be measured and evidenced. Where a task specifies an audience across cultures or jurisdictions, avoid idiom and assumptions about local practice, and state what you are assuming.",
        },
      ],
      check: {
        q: "A task asks for 'briefing notes for the chair to use when meeting the institutional shareholders'. What does this most require?",
        options: [
          "A formal report with an executive summary and appendices",
          "Short, headed points the chair can speak from directly, anticipating shareholder questions — written to be used aloud rather than read as prose",
          "A detailed technical analysis of the underlying issues",
          "An email to the shareholders setting out the position",
        ],
        correct: 1,
        explain:
          "Briefing notes are written for someone else to use in a live conversation, so they must be scannable, headed and short enough to speak from. A report is a different document with a different shape, and writing one here concedes the communication marks even if the content is right.",
      },
    },
    {
      id: "persuading",
      heading: "Persuading, and handling the counter-argument",
      blocks: [
        {
          kind: "text",
          md: "I1(b) asks for compelling and logical persuasion including the ability to counter-argue. That last part is where the marks concentrate, and it is counter-intuitive: a recommendation reads as *stronger*, not weaker, when it acknowledges the case against it and explains why it still holds.",
        },
        {
          kind: "list",
          style: "number",
          title: "A structure that persuades",
          items: [
            "**State the recommendation first** — a reader should not have to infer it",
            "**Give the reasons**, ranked, each grounded in the case's own evidence",
            "**Name the strongest objection**, fairly rather than as a straw man",
            "**Answer it** — why the objection does not defeat the recommendation, or what mitigates it",
            "**State what would change your advice**, which demonstrates judgement rather than advocacy",
            "**Say what happens next** — who does what, by when",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Recommendation first, always",
          md: "Boards read the conclusion and then decide how much of the reasoning to read. Building up to a recommendation in the final line means a busy reader may never reach it, and a marker looking for a clear recommendation has to hunt. Lead with it, then justify — the opposite of how most candidates instinctively write.",
        },
        {
          kind: "text",
          md: "There is a boundary worth knowing. Persuasion is not advocacy: as a professional adviser you present a balanced case and recommend, rather than arguing one side while suppressing what weakens it. Concealing the objection would be an integrity matter as well as a communication failure, and it is the advocacy threat from SBL-04 appearing in written form.",
        },
      ],
      check: {
        q: "Why does naming the strongest objection to your recommendation strengthen it?",
        options: [
          "It fills space when there is little else to write",
          "It shows the recommendation survives scrutiny and that the adviser has considered the alternative — and it pre-empts the challenge the reader would otherwise raise",
          "It transfers responsibility for the decision to the reader",
          "It is required by the marking scheme regardless of content",
        ],
        correct: 1,
        explain:
          "An unopposed recommendation reads as unexamined. Addressing the objection demonstrates the reasoning survived a test, and it answers the question the reader was already forming — which is exactly what the counter-argument outcome is asking for.",
      },
    },
    {
      id: "clarifying",
      heading: "Making the complex usable",
      blocks: [
        {
          kind: "text",
          md: "I1(c) is about clarifying and simplifying so an intended audience can understand and act. The test is not whether your explanation is accurate but whether the recipient could make a decision from it.",
        },
        {
          kind: "table",
          caption: "Techniques that earn the mark",
          head: ["Technique", "What it does"],
          rows: [
            ["Lead with the implication", "The reader gets the 'so what' before the mechanism"],
            ["Define a term once, in plain words", "Removes the barrier without patronising"],
            ["Quantify in the reader's units", "\"Three weeks of production\" beats a percentage variance"],
            ["Use a short table for comparisons", "Two options across four criteria is unreadable as prose"],
            ["One idea per paragraph", "Lets a reader skim and still follow"],
            ["State assumptions explicitly", "The reader knows what the conclusion depends on"],
            ["Say what remains uncertain", "Honest, and prevents false confidence"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Simplify without becoming vague",
          md: "Clarity is not the removal of content. \"There are risks to consider\" is simple and useless; \"the covenant is breached if operating profit falls below $4.2m, which last year's result would not have met\" is equally readable and actually informs. Aim at fewer words per idea, not fewer ideas.",
        },
        {
          kind: "example",
          title: "The same point, twice",
          scenario: "Explaining a working-capital problem to a chief executive who is an engineer by background.",
          steps: [
            { label: "Weak", detail: "\"The working capital cycle has deteriorated, with an adverse movement in receivable days impacting operating cash conversion and creating liquidity pressure relative to facility headroom.\"" },
            { label: "Why it fails", detail: "Every phrase is correct and the reader still does not know how bad it is, what caused it, or what to do." },
            { label: "Strong", detail: "\"Customers are taking 71 days to pay, up from 42. That is roughly $3.1m of cash sitting in unpaid invoices that was not there last year — more than the $2.4m still available on our overdraft. Unless collection improves within about two months, we will need to extend the facility.\"" },
            { label: "What changed", detail: "The implication came first, the figures are in cash rather than ratios, and the reader now knows the size, the cause and the deadline." },
          ],
          result: "Both versions contain the same analysis. Only the second lets a non-accountant act on it.",
        },
      ],
      check: {
        q: "Which sentence best demonstrates the clarification skill for a non-financial audience?",
        options: [
          "Adverse movements in the cash conversion cycle have compressed liquidity headroom against covenanted thresholds",
          "Customers now take 71 days to pay rather than 42, tying up about $3.1m more cash than last year — more than the $2.4m left on our overdraft",
          "There are significant working capital risks that the board should consider carefully",
          "Receivable days have increased by 69% year on year",
        ],
        correct: 1,
        explain:
          "It states the size in cash the reader understands, names the cause, and shows the consequence against a figure that matters. Option 0 is precise and impenetrable, option 2 says nothing, and option 3 gives a percentage with no sense of what it means.",
      },
    },
  ],
  examTraps: [
    { trap: "Writing continuous prose when a specific format was requested.", fix: "Supply the format's visible signals — headings, memo header block, salutation, slide titles." },
    { trap: "Building up to the recommendation at the end.", fix: "State it first, then justify; boards and markers both read for the conclusion." },
    { trap: "Presenting one side and suppressing the objection.", fix: "Name the strongest counter-argument and answer it — that is where the marks are, and it is also the professional position." },
    { trap: "Using technical vocabulary with a stated non-financial audience.", fix: "Lead with the implication, quantify in the reader's own units, define any term once." },
    { trap: "Simplifying into vagueness.", fix: "Fewer words per idea, not fewer ideas — keep the figures and the deadline." },
  ],
  keyTerms: [
    { term: "Briefing notes", def: "Short headed points prepared for someone else to speak from in a live discussion." },
    { term: "Counter-argument", def: "The strongest case against a recommendation, named fairly and then answered." },
    { term: "Tone", def: "The register appropriate to the recipient's position and relationship, distinct from technical level." },
  ],
  summary: [
    "Read the role, the recipient and the format before writing a word.",
    "Supply each format's visible signals — it is the cheapest mark available.",
    "Lead with the recommendation, then the reasons, then the objection answered.",
    "Persuasion is not advocacy; suppressing what weakens your case is an integrity failure.",
    "Clarity means fewer words per idea, with the figures and the deadline intact.",
  ],
  knowledgeDiagnostic: [
    { q: "What three things must be read from a task before writing?", a: "The role you hold, the recipient, and the format requested — each changes what you assume, explain and produce." },
    { q: "Why should the recommendation come first?", a: "Readers decide from the conclusion how much reasoning to read, and a marker should not have to hunt for it." },
    { q: "Why does addressing the counter-argument strengthen a recommendation?", a: "It shows the advice survived scrutiny and pre-empts the reader's own objection; concealing it would also be an advocacy problem." },
    { q: "What does clarification actually require?", a: "Leading with the implication, quantifying in the reader's units, one idea per paragraph, and stating assumptions — not removing content." },
  ],
  furtherStudy: [
    "SBL-41 covers commercial acumen, the skill most often assessed alongside this one",
    "SBL-46 covers producing the deliverable in the CBE tools",
    "SBL-44 covers reaching the conclusion this format presents",
    "SBL-04 covers the advocacy threat that suppressing a counter-argument creates",
  ],
}

const SBL_TREE_41: StudyChapter = {
  paper: "SBL",
  id: "SBL-41",
  number: 41,
  area: "I",
  syllabusRefs: ["I2(a)", "I2(b)", "I2(c)"],
  title: "Commercial acumen",
  minutes: 17,
  intro:
    "The skill that separates a technically correct answer from a useful one. It is demonstrated by advice that a real organisation, with this organisation's money, people and time, could actually act on next week.",
  outcomes: [
    "Show awareness of the organisation's own position and the external factors bearing on it",
    "Use judgement to identify which issue matters most, and propose something implementable",
    "Show insight into practical and human realities, including handling conflict",
    "Recognise recommendations that are technically right and commercially useless",
  ],
  sections: [
    {
      id: "what-it-is",
      heading: "What commercial acumen looks like on a page",
      blocks: [
        {
          kind: "text",
          md: "Commercial acumen is business judgement made visible. A marker cannot see you thinking, so it is evidenced by specific features of the answer: using the organisation's own numbers, respecting its constraints, prioritising, sequencing, and recommending things that could actually be done.",
        },
        {
          kind: "table",
          caption: "How the skill is evidenced, and how it is lost",
          head: ["Evidenced by", "Lost by"],
          rows: [
            ["Using figures from the exhibits in the advice", "Generic advice that would suit any company"],
            ["Recognising what the organisation can afford", "Recommending investment the case shows it cannot fund"],
            ["Prioritising — this first, that later", "A flat list of eight equally weighted actions"],
            ["Naming who does it and roughly when", "Recommendations with no owner or timescale"],
            ["Acknowledging a trade-off honestly", "Claiming a recommendation has no downside"],
            ["Noticing the commercial consequence of a technical point", "Correct analysis with no 'so what'"],
            ["Allowing for how people will react", "Assuming staff, customers and partners simply comply"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The affordability test catches most failures of this skill",
          md: "Before recommending anything, check the case for what the organisation actually has: cash, covenant headroom, management capacity, relevant skills, time before a deadline. SBL cases are built with those constraints stated, and a recommendation that ignores them signals no commercial awareness however sound the technique behind it. Where the right answer is unaffordable, say so and phase it — that is acumen, not compromise.",
        },
        {
          kind: "text",
          md: "Prioritisation deserves emphasis because it is the most reliable way to demonstrate the skill. A board can act on two or three things at once, not on nine. So say which matters most and why — usually because it is urgent, because it blocks the others, or because it carries the largest exposure — and be explicit that the rest follow. An unranked list transfers the judgement back to the reader, which is precisely the work they were paying for.",
        },
      ],
      check: {
        q: "A company has $0.4m of available cash, no covenant headroom, and a strategic need for a $6m systems replacement. Which response best demonstrates commercial acumen?",
        options: [
          "Recommend the $6m replacement, since it is strategically necessary",
          "Recommend a phased approach: address the highest-risk module now within available resource, prepare a funded business case for the remainder, and state what must be true before the next phase proceeds",
          "Recommend deferring any action until funding is available",
          "Recommend the cheapest available system regardless of fit",
        ],
        correct: 1,
        explain:
          "The need and the constraint are both real, so the useful answer works within the constraint while protecting the strategic aim. Recommending $6m the company cannot fund ignores the case; deferring entirely abandons the need; buying the cheapest ignores the requirement.",
      },
    },
    {
      id: "judgement-and-conflict",
      heading: "Judgement, insight and conflict",
      blocks: [
        {
          kind: "text",
          md: "I2(b) asks for judgement in identifying the key issue and proposing solutions. SBL cases are deliberately overloaded — more issues than can be addressed — so identifying which two or three genuinely matter is itself the examined skill.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Tests for whether an issue is the key issue",
          items: [
            "**Does it threaten survival or solvency?** — that outranks everything",
            "**Does it block other things?** — an issue whose resolution unlocks several others",
            "**Is there a deadline?** — a dated regulatory or contractual obligation forces sequence",
            "**Is the exposure large relative to the organisation?** — scale it against the case's own figures",
            "**Is it a cause or a symptom?** — treat causes; symptoms recur",
            "**Would the board be criticised for not addressing it?** — governance and public-interest matters",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Cause, not symptom",
          md: "This is the single most useful habit for this skill. Rising complaints, staff turnover, missed deliveries and margin erosion are usually symptoms of something upstream — a process, an incentive, a capability gap, a capacity constraint. Recommending action on a symptom produces effort with no improvement, and the marker can see which you addressed.",
        },
        {
          kind: "text",
          md: "I2(c) adds insight and perception, including the management of conflict. Conflict in SBL appears in recognisable forms: two directors disagreeing in the exhibits, a division protecting its position against a group interest, a family shareholder against external investors, staff against a change. Handling it well means naming the conflict without taking sides personally, identifying each party's legitimate interest, and recommending a process — evidence, a decision route, a forum — rather than declaring who is right.",
        },
        {
          kind: "example",
          title: "Handling a conflict in an exhibit",
          scenario:
            "The operations director says the new production line must be commissioned before the peak season. The finance director says the capital cannot be released until the refinancing completes, two months later. Both have written to the chair.",
          steps: [
            { label: "Name it neutrally", detail: "Both positions are legitimate: one protects the commercial opportunity, the other protects solvency and the lender relationship." },
            { label: "Establish the facts", detail: "What is the quantified cost of missing the peak, and what exactly does the refinancing require of the balance sheet during the period?" },
            { label: "Look for the third option", detail: "Staged commissioning, a bridging facility, lease rather than purchase, or a partial line — the exhibits usually support one." },
            { label: "Recommend a route", detail: "Put both quantified cases to the board with the third option appraised, and identify the decision as the board's rather than either director's." },
            { label: "Protect the relationship", detail: "Frame it as a sequencing question, not a dispute about competence." },
          ],
          result:
            "The advice resolves the decision without declaring a winner — which is what a board actually needs from an adviser and what the skill is testing.",
        },
      ],
      check: {
        q: "A case reports rising customer complaints, high staff turnover in the call centre, and a target of average call handling time under four minutes. What demonstrates commercial acumen?",
        options: [
          "Recommend recruiting more call centre staff to reduce pressure",
          "Identify the handling-time target as the likely cause of both symptoms — calls ended before resolution generate repeat contacts and complaints, and unachievable targets drive turnover — and recommend replacing it with paired measures",
          "Recommend additional customer service training",
          "Recommend a complaints-handling process improvement",
        ],
        correct: 1,
        explain:
          "Complaints and turnover are two symptoms with one plausible upstream cause, and the case supplies it. Recruiting, training or improving complaints handling all treat symptoms while the measure that produces them stays in place — the counter-measure point from SBL-33.",
      },
    },
  ],
  examTraps: [
    { trap: "Recommendations that would suit any organisation.", fix: "Use the case's own figures, constraints and circumstances in the advice itself." },
    { trap: "Recommending spending the case shows is unaffordable.", fix: "Check cash, covenant headroom, capacity and time; phase where the right answer is unaffordable now." },
    { trap: "Producing a flat list of equally weighted actions.", fix: "Rank them, say why the first is first, and note what follows." },
    { trap: "Treating symptoms.", fix: "Ask whether the issue is a cause or a consequence; symptoms recur after any amount of effort." },
    { trap: "Resolving a conflict by declaring one party right.", fix: "Name both legitimate interests, establish the facts, look for a third option, recommend a decision route." },
  ],
  keyTerms: [
    { term: "Commercial acumen", def: "Business judgement made visible through advice that fits the organisation's actual resources, constraints and circumstances." },
    { term: "Affordability test", def: "Checking a recommendation against the cash, headroom, capacity and time the case shows the organisation has." },
    { term: "Cause and symptom", def: "The distinction between the upstream driver of a problem and its visible consequences." },
  ],
  summary: [
    "Acumen is evidenced by using the case's figures, constraints and context in the advice.",
    "Apply the affordability test; where the right answer is unaffordable, phase it.",
    "Prioritise explicitly — an unranked list hands the judgement back to the reader.",
    "Address causes; symptoms recur however much effort is spent on them.",
    "Handle conflict by naming both legitimate interests and recommending a decision route.",
  ],
  knowledgeDiagnostic: [
    { q: "How is commercial acumen visible to a marker?", a: "Through use of the case's own figures, respect for its constraints, explicit prioritisation, named owners and timescales, and honest trade-offs." },
    { q: "What is the affordability test?", a: "Checking any recommendation against the cash, covenant headroom, management capacity, skills and time the case actually shows." },
    { q: "Which tests identify the key issue?", a: "Threat to survival, whether it blocks other things, a dated deadline, scale of exposure, whether it is a cause rather than a symptom, and governance or public-interest exposure." },
    { q: "How should a conflict between two directors be handled?", a: "Name both legitimate interests neutrally, establish the quantified facts, look for a third option, and recommend a decision route for the board rather than declaring a winner." },
  ],
  furtherStudy: [
    "SBL-40 covers communicating the advice this skill produces",
    "SBL-44 covers evaluation, with which this is often jointly assessed",
    "SBL-33 covers the measures that create the symptoms acumen traces upstream",
    "SBL-16 covers feasibility, the technical form of the affordability test",
  ],
}

const SBL_TREE_42: StudyChapter = {
  paper: "SBL",
  id: "SBL-42",
  number: 42,
  area: "I",
  syllabusRefs: ["I3(a)", "I3(b)", "I3(c)"],
  title: "Analysis",
  minutes: 16,
  intro:
    "Analysis means taking the exhibits apart and establishing what is actually going on. It is the skill most often confused with evaluation, and the confusion costs marks in both.",
  outcomes: [
    "Investigate the information in the exhibits, using techniques suited to what is there",
    "Establish the cause of a problem, or locate an opportunity, rather than restating the data",
    "Corroborate or contradict an assertion by testing it against other evidence",
    "Draw out what your findings imply, and keep analysis distinct from evaluation",
  ],
  sections: [
    {
      id: "analysis-not-description",
      heading: "Analysis, not description",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "The distinction that governs this whole area",
          md: "**Analysis** breaks information down and establishes what is happening and why. **Evaluation** weighs it and reaches a judgement. \"Revenue fell 12% while the market grew 6%, and the decline is concentrated entirely in the two products a new entrant has undercut\" is analysis. \"On balance the product line should be withdrawn\" is evaluation. Tasks are marked for one or both, and describing data is neither.",
        },
        {
          kind: "table",
          caption: "Three levels, and what each earns",
          head: ["Level", "Example", "Earns"],
          rows: [
            ["Description", "\"Revenue fell 12% and the gross margin fell 3 points.\"", "Little or nothing — the reader has the exhibit"],
            ["Analysis", "\"The fall is entirely in two products; both compete with a new entrant pricing 20% below us, and margin fell only on those lines.\"", "The analysis marks"],
            ["Evaluation", "\"Given no cost advantage on those lines, withdrawing them and redeploying capacity to the growing service business is the better use of capital.\"", "The evaluation marks"],
          ],
        },
        {
          kind: "text",
          md: "The practical difference is that analysis **combines** things. A single figure restated is description; the same figure set against a comparator, a segment, a period or another exhibit becomes analysis. That is why the highest-value habit in SBL is deliberately reading two exhibits together — the board minutes against the dashboard, the sales figures against the customer complaints, the strategy statement against the capital budget.",
        },
      ],
      check: {
        q: "Which statement is analysis rather than description?",
        options: [
          "Operating margin has declined from 14% to 11% over two years",
          "Margin decline is entirely attributable to the industrial division, where a fixed-price contract signed before the material cost rise still has 18 months to run",
          "Margins across the industry are under pressure",
          "The board should investigate the margin decline",
        ],
        correct: 1,
        explain:
          "It locates the decline in one division and identifies the mechanism causing it, with a duration attached. Option 0 restates the exhibit, option 2 is unevidenced context, and option 3 is a recommendation to do the analysis rather than the analysis.",
      },
    },
    {
      id: "techniques",
      heading: "Techniques, and using the exhibits together",
      blocks: [
        {
          kind: "table",
          caption: "What to do with what a case gives you",
          head: ["What the exhibits contain", "Technique", "What it establishes"],
          rows: [
            ["Financial statements over periods", "Trend and ratio analysis; common-size comparison", "Direction, and which line is driving it"],
            ["Segmental or divisional data", "Compare against the consolidated figure", "Which unit is causing a group-level result"],
            ["Budget against actual", "Variance analysis, split planning and operational", "Whether the plan or the performance was wrong"],
            ["Operational metrics", "Correlate against financial outcomes", "The operational cause of a financial effect"],
            ["Two sources on one topic", "Reconcile definitions, periods, populations", "Which is right, and what the difference reveals"],
            ["Statements by individuals", "Test against documented evidence", "Whether an assertion is supported"],
            ["A forecast", "Sensitivity — what must hold for it to be met", "Which assumption the outcome depends on"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Calculate something if the numbers are there",
          md: "SBL is not a computational paper and it does supply figures for a reason. A single relevant calculation — a margin, a ratio, a percentage of revenue, a breakeven point, days of headroom — anchors an argument far better than adjectives, and it is direct evidence of analysis. Keep it short and show the basis so the reader can follow it.",
        },
        {
          kind: "text",
          md: "I3(b) asks you to corroborate or dispute existing beliefs and opinions, which is where analysis meets scepticism. The mechanics are the same in every case: take the assertion, identify what evidence would support it, look for that evidence in the exhibits, and state whether it is there. Frequently it is not — and \"the claim that service has improved is not supported by any measure in the pack, while complaints have risen 40%\" is a finding, cleanly evidenced.",
        },
        {
          kind: "text",
          md: "Watch for the reconciliation trap the exam sets repeatedly: two exhibits give different figures for the same thing, on different bases or periods. Averaging them is wrong, choosing one silently is wrong, and ignoring the discrepancy is worst. Reconcile the bases, say what each measures, and state which is the appropriate one for the decision.",
        },
      ],
      check: {
        q: "A director's report states customer satisfaction has improved. The dashboard shows complaints up 40%, but covers a later period and a wider product range. What is the correct analytical response?",
        options: [
          "Average the two indicators to obtain a balanced view",
          "Reconcile the bases — state what each source measures, over what period and population — then say which is relevant to the decision and what remains unresolved",
          "Accept the director's report as the more authoritative source",
          "Disregard both as unreliable",
        ],
        correct: 1,
        explain:
          "The discrepancy is itself information: the two may both be true of different periods and populations. Reconciling and then choosing the relevant basis is analysis; averaging invents a figure that measures nothing, and discarding both throws away the evidence.",
      },
    },
    {
      id: "implications",
      heading: "Drawing out implications",
      blocks: [
        {
          kind: "text",
          md: "I3(c) asks you to think about what your findings actually mean and what the organisation could do with them. This is the bridge from analysis to advice, and it is a distinct step: having established what is happening, say what follows.",
        },
        {
          kind: "list",
          style: "number",
          title: "A pattern for every analytical finding",
          items: [
            "**The finding** — what the evidence shows, with the figure",
            "**The mechanism** — why it is happening",
            "**The consequence** — what it means if nothing changes, ideally quantified or dated",
            "**Who it affects** — which stakeholders, which objectives, which obligations",
            "**What it implies for the decision** in front of the board",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The missing 'so what' is the commonest way to waste correct analysis",
          md: "A candidate calculates accurately, identifies the cause correctly, and then moves to the next point without saying what any of it means. The analysis marks may survive; the reader has been given nothing to act on, and the evaluation and acumen marks are lost. One sentence of consequence after each finding is the fix.",
        },
        {
          kind: "text",
          md: "Finally, keep analysis honest about its limits. If a conclusion depends on an assumption, name it; if the data cannot answer the question, say what would be needed. An analysis presented with more certainty than the evidence supports fails on scepticism even where the arithmetic is right.",
        },
      ],
      check: {
        q: "A candidate calculates that the largest customer is 44% of revenue and correctly identifies the concentration. What is missing?",
        options: [
          "Nothing — the concentration has been identified",
          "The implication: what happens to profitability and covenant compliance if that customer leaves or renegotiates, and therefore what the board should do about the dependence",
          "A more precise calculation of the percentage",
          "A comparison with industry averages",
        ],
        correct: 1,
        explain:
          "The figure and the observation are the analysis; the consequence for profitability, covenants and the board's options is the 'so what' that makes it usable. Without it the reader has a fact rather than advice.",
      },
    },
  ],
  examTraps: [
    { trap: "Restating exhibit figures as though that were analysis.", fix: "Combine — set a figure against a comparator, a segment, a period or another exhibit." },
    { trap: "Reading each exhibit in isolation.", fix: "Deliberately read pairs together; the contradiction between them is usually the finding." },
    { trap: "Averaging two conflicting figures.", fix: "Reconcile the bases, state what each measures, and choose the one relevant to the decision." },
    { trap: "Writing no calculation when figures are supplied.", fix: "One short relevant calculation with its basis shown is direct evidence of the skill." },
    { trap: "Stopping at the finding.", fix: "Add the mechanism, the consequence, who is affected, and what it implies for the decision." },
  ],
  keyTerms: [
    { term: "Analysis", def: "Breaking information down and establishing what is happening and why." },
    { term: "Corroboration", def: "Testing an assertion against independent evidence to support or contradict it." },
    { term: "Reconciliation", def: "Explaining the difference between two sources by identifying their bases, periods and populations." },
    { term: "Implication", def: "What a finding means for the organisation's objectives, obligations and the decision at hand." },
  ],
  summary: [
    "Analysis establishes what and why; evaluation weighs and concludes; description earns neither.",
    "Analysis combines — a figure gains meaning against a comparator or another exhibit.",
    "Calculate something when figures are supplied, and show the basis.",
    "Reconcile conflicting sources rather than averaging or silently choosing.",
    "Every finding needs its mechanism, consequence, affected parties and implication.",
  ],
  knowledgeDiagnostic: [
    { q: "What distinguishes analysis from description and from evaluation?", a: "Description restates data; analysis breaks it down and establishes cause; evaluation weighs it and reaches a judgement." },
    { q: "What is the highest-value analytical habit in SBL?", a: "Reading two exhibits together — minutes against the dashboard, sales against complaints, strategy against the capital budget." },
    { q: "How should conflicting figures for the same measure be handled?", a: "Reconcile the bases, periods and populations, state what each measures, choose the relevant one and say what remains unresolved." },
    { q: "What five elements make an analytical finding usable?", a: "The finding with its figure, the mechanism, the consequence if nothing changes, who is affected, and the implication for the decision." },
  ],
  furtherStudy: [
    "SBL-43 covers scepticism, which analysis of assertions runs into",
    "SBL-44 covers evaluation, the judgement analysis feeds",
    "SBL-33 covers the ratios and measures used here",
    "SBL-23 covers the data quality analysis depends on",
  ],
}

const SBL_TREE_43: StudyChapter = {
  paper: "SBL",
  id: "SBL-43",
  number: 43,
  area: "I",
  syllabusRefs: ["I4(a)", "I4(b)", "I4(c)"],
  title: "Scepticism",
  minutes: 17,
  intro:
    "Not distrust of everything, and not agreement with everything. Scepticism is the disciplined habit of asking what supports an assertion — and SBL builds every case with assertions that will not survive the question.",
  outcomes: [
    "Probe beneath what an exhibit states, to the reason it is being said",
    "Question facts, opinions and assertions by asking what evidence would support them",
    "Challenge information or a decision where the evidence justifies it, professionally and courteously",
    "Distinguish scepticism from cynicism, and from simply disagreeing",
  ],
  sections: [
    {
      id: "what-it-is",
      heading: "Scepticism, cynicism and credulity",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Three postures",
            data: {
              leftTitle: "What it does",
              rightTitle: "How it reads in an answer",
              rows: [
                { aspect: "Credulity", left: "Accepts what the exhibits assert", right: "Repeats management's view as established fact" },
                { aspect: "Scepticism", left: "Asks what supports the assertion, and who is asserting it", right: "Names the claim, the missing evidence, and what would settle it" },
                { aspect: "Cynicism", left: "Assumes bad faith throughout", right: "Unevidenced accusation; loses professional-behaviour credit" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The three questions that generate scepticism marks",
          md: "**Who is saying this, and what is their interest?** A forecast from the executive whose bonus depends on it is not neutral. **What evidence would support it, and is that evidence here?** Absence of support is a finding in itself. **Does anything else in the pack contradict it?** SBL cases routinely contain the contradiction two exhibits apart.",
        },
        {
          kind: "text",
          md: "The distinction from cynicism matters for marks as well as for professionalism. Writing that a director is \"clearly acting dishonestly\" where the exhibits show only an unsupported claim overstates the evidence and reads as accusation. The professional formulation identifies what is unsupported and what would resolve it: \"the projected 30% growth is not supported by any analysis in the pack, and the director proposing it has a bonus linked to revenue — the board should ask for the underlying assumptions before approving.\"",
        },
      ],
      check: {
        q: "An exhibit records the sales director stating that the new product will achieve 30% market share within two years. No supporting analysis is provided, and the director's bonus depends on revenue growth. What is the sceptical response?",
        options: [
          "Accept the figure as the informed view of the person closest to the market",
          "State that the projection is unsupported by evidence in the pack, note that the proposer has an interest in the outcome, and identify what the board should require before relying on it",
          "Conclude that the director is deliberately misleading the board",
          "Substitute a more conservative estimate of your own",
        ],
        correct: 1,
        explain:
          "This names the assertion, the absence of support and the interest, then says what would resolve it — without alleging dishonesty the evidence does not establish. Option 2 is cynicism, and inventing your own figure in option 3 replaces one unsupported number with another.",
      },
    },
    {
      id: "where-to-look",
      heading: "Where the unsupported assertions hide",
      blocks: [
        {
          kind: "table",
          caption: "Recurring targets for scepticism in an SBL case",
          head: ["What you see", "Why to question it", "What to ask for"],
          rows: [
            ["A confident growth or savings forecast", "Often the basis of the whole business case", "The assumptions, and evidence for each"],
            ["\"Industry standard\" or \"best practice\"", "Asserted authority with no source", "The source, and whether it applies here"],
            ["A single supportive data point", "Selected rather than representative", "The full series, and the comparator"],
            ["An expert's or consultant's conclusion", "May be scoped narrowly, or paid for by an interested party", "The scope, the instructions given, and the basis"],
            ["A statement that a control 'operates effectively'", "Assurance from the people operating it", "Independent testing evidence"],
            ["Reassurance that a risk is 'being managed'", "No owner, measure or action stated", "Who owns it, what is being done, by when"],
            ["Figures that changed basis between periods", "Improvement may be redefinition", "Restated comparatives on one basis"],
            ["An urgent deadline for a decision", "Urgency discourages scrutiny", "Why now, and what happens if it slips"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Interest is the fastest route to a sceptical point",
          md: "Ask, of every significant assertion, who benefits if it is believed. The executive whose project it is, the division defending its budget, the family shareholder resisting dilution, the supplier proposing a longer contract — each has a legitimate position and a reason to present evidence selectively. Naming the interest is not an accusation; it is why independent verification exists.",
        },
        {
          kind: "text",
          md: "Also be sceptical about **silence**. What a pack does not contain is often more informative than what it does: a strategy paper with no risk section, a growth plan with no funding analysis, a control report with no weaknesses, an assurance statement whose scope is not stated. Each absence is a specific, defensible finding — and identifying one is usually easier than re-examining the numbers that are present.",
        },
      ],
      check: {
        q: "A board pack contains a detailed five-year growth strategy with no analysis of funding requirement or covenant impact. What is the sceptical observation?",
        options: [
          "The strategy is unrealistic and should be rejected",
          "A significant omission: the plan cannot be evaluated without knowing what it requires and whether the balance sheet can carry it, so the board should not approve it until the funding analysis is provided",
          "Funding analysis is the finance function's responsibility and need not appear",
          "The pack is adequate provided the strategy is sound",
        ],
        correct: 1,
        explain:
          "Scepticism about silence: the absence prevents evaluation, which is a finding about the pack rather than a judgement about the strategy. Rejecting the strategy outright, as option 0 does, asserts more than the evidence supports.",
      },
    },
    {
      id: "challenging-well",
      heading: "Challenging courteously, and knowing when to escalate",
      blocks: [
        {
          kind: "text",
          md: "I4(c) requires the challenge to be made where the evidence warrants it, courteously and as a professional — and made in the interests of the profession, of ethics, of the organisation or of the public rather than to score a point. Both halves are marked: the challenge must be made, and it must be made well.",
        },
        {
          kind: "table",
          caption: "The same challenge, badly and well",
          head: ["Weak", "Strong"],
          rows: [
            ["\"The finance director's forecast is obviously wrong.\"", "\"The forecast assumes 12% volume growth; the last three years averaged 2%, and no change in market conditions is identified. The basis should be provided before approval.\""],
            ["\"Management cannot be trusted on this.\"", "\"This assurance comes from the team operating the control. Independent testing has not been performed, so the board has no evidence of effectiveness.\""],
            ["\"The board is failing in its duties.\"", "\"The board has not received segmental information for two years, so it cannot see a division's performance — which is a gap in the information it needs to discharge its oversight.\""],
            ["\"This is unethical.\"", "\"The proposal would present a position the directors know to be misleading, engaging the integrity principle; the alternative treatment is available and should be adopted.\""],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Attack the evidence, not the person",
          md: "Every strong version above does the same three things: it identifies the specific claim, states precisely what is missing or contradictory, and says what should happen next. None characterises anyone's competence or motives. That formulation is both the professional standard and where the marks are — and it is far harder to dismiss than an accusation.",
        },
        {
          kind: "text",
          md: "Scepticism sometimes obliges escalation. Where a matter is material and unresolved — a misleading disclosure, a bypassed control, a concealed harm — the professional route from SBL-04 applies: raise it internally, in writing, through the appropriate channel; escalate to the audit committee or the board if it is not addressed; take advice; and in the last resort consider withdrawal. What is not acceptable is noticing and saying nothing, which is where scepticism becomes an ethics question rather than a skill.",
        },
      ],
      check: {
        q: "Which formulation best demonstrates professional scepticism?",
        options: [
          "The chief executive's projections cannot be relied upon given their record",
          "The projection assumes margins recover to 18%, a level not achieved in five years, and the pack identifies no change that would deliver it — the assumption should be evidenced or the case reworked",
          "The board should be more sceptical of management projections generally",
          "The projections are acceptable as management is closest to the business",
        ],
        correct: 1,
        explain:
          "It names the specific assumption, contradicts it with evidence from the case, and says what should happen — without characterising anyone. Option 0 attacks the person, option 2 is generic advice rather than a challenge, and option 3 is credulity.",
      },
    },
  ],
  examTraps: [
    { trap: "Repeating management's assertions as established fact.", fix: "Ask who is asserting it, what would support it, and whether anything contradicts it." },
    { trap: "Alleging dishonesty the evidence does not establish.", fix: "Identify what is unsupported and what would resolve it — cynicism loses professional credit." },
    { trap: "Only examining what the pack contains.", fix: "Be sceptical about silence — a missing risk section or funding analysis is a clean finding." },
    { trap: "Challenging the person rather than the evidence.", fix: "Name the claim, state what is missing or contradictory, say what should happen next." },
    { trap: "Noticing a material problem and not escalating it.", fix: "Raise it in writing through the proper channel; escalate if unaddressed." },
  ],
  keyTerms: [
    { term: "Professional scepticism", def: "A questioning attitude that asks what evidence supports an assertion, alert to the interests of whoever makes it." },
    { term: "Cynicism", def: "Assuming bad faith without evidence — not scepticism, and it loses credit." },
    { term: "Corroborating evidence", def: "Independent evidence that supports or contradicts an assertion." },
    { term: "Scepticism about silence", def: "Treating a significant omission from a pack as a finding in its own right." },
  ],
  summary: [
    "Scepticism sits between credulity and cynicism, and only one of the three earns marks.",
    "Ask who asserts it, what would support it, and what contradicts it.",
    "Interest is the fastest route to a sceptical point, and naming it is not an accusation.",
    "Be sceptical about omissions — a missing risk or funding section is a clean finding.",
    "Challenge the evidence, not the person, and escalate a material unresolved matter.",
  ],
  knowledgeDiagnostic: [
    { q: "What three questions generate scepticism marks?", a: "Who is asserting this and what is their interest; what evidence would support it and is it here; does anything else in the pack contradict it." },
    { q: "How does scepticism differ from cynicism?", a: "Scepticism asks what supports a claim and states what would resolve it; cynicism assumes bad faith without evidence and loses professional credit." },
    { q: "What is scepticism about silence?", a: "Treating a significant absence — no risk section, no funding analysis, no disclosed weaknesses, no stated assurance scope — as a finding in itself." },
    { q: "What are the three components of a well-made challenge?", a: "Identify the specific claim, state exactly what is missing or contradictory, and say what should happen next — without characterising the person." },
  ],
  furtherStudy: [
    "SBL-42 covers the analysis that tests an assertion",
    "SBL-04 covers the escalation route when a matter is unresolved",
    "SBL-29 covers scepticism applied to control and assurance reporting",
    "SBL-44 covers evaluation, which follows once assertions have been tested",
  ],
}

const SBL_TREE_44: StudyChapter = {
  paper: "SBL",
  id: "SBL-44",
  number: 44,
  area: "I",
  syllabusRefs: ["I5(a)", "I5(b)", "I5(c)"],
  title: "Evaluation",
  minutes: 17,
  intro:
    "The skill that requires you to decide. Candidates who analyse well and then decline to conclude lose these marks entirely — and a balanced discussion with no recommendation is the most common way a strong script becomes an average one.",
  outcomes: [
    "Exercise professional judgement on an issue or decision, taking its consequences into account",
    "Make a reasoned forecast of how internal and external factors, or an available decision, will play out",
    "Appraise facts, opinions and findings objectively, balancing cost, risk, benefit and opportunity",
    "Reach and state a conclusion, and say what would change it",
  ],
  sections: [
    {
      id: "reaching-a-conclusion",
      heading: "Balance, then decide",
      blocks: [
        {
          kind: "text",
          md: "Evaluation has two halves and both are marked. The first is genuine balance: setting the case for and against side by side, fairly, using the evidence. The second is the judgement — saying which way it goes and why. A candidate who does only the first has written a discussion; a candidate who does only the second has asserted.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "\"There are arguments on both sides\" is where the marks stop",
          md: "It is true of every SBL scenario by construction. The examinable act is weighing them — saying which consideration dominates *in this organisation's circumstances* and why. If two options are genuinely close, say that and give the tie-breaker: usually risk, reversibility, funding, or the deadline the case supplies.",
        },
        {
          kind: "list",
          style: "number",
          title: "A structure that earns evaluation marks",
          items: [
            "**The criteria** — what should decide this: value, risk, deliverability, stakeholder acceptance, obligation",
            "**The case for**, grounded in the evidence, strongest point first",
            "**The case against**, given equal seriousness",
            "**The weighing** — which criterion dominates here, and why",
            "**The conclusion** — stated plainly, with the action that follows",
            "**What would change it** — the assumption or event that would reverse the advice",
          ],
        },
        {
          kind: "text",
          md: "The last item is worth more than candidates expect. Saying \"this recommendation depends on the refinancing completing in March; if it slips, the phased option becomes the better course\" demonstrates judgement about the limits of your own advice — which is precisely what distinguishes an adviser from an advocate, and it is directly examinable under I5.",
        },
      ],
      check: {
        q: "A candidate sets out four arguments for an acquisition and four against, all well evidenced, and concludes that 'the board must weigh these factors carefully'. What has been lost?",
        options: [
          "Nothing — presenting a balanced view is the professional approach",
          "The evaluation marks: balance is only half the skill, and the judgement — which factor dominates here and therefore what should be done — has been handed back to the board",
          "The analysis marks, since the arguments were not quantified",
          "The communication marks, because no format was used",
        ],
        correct: 1,
        explain:
          "The balance would earn credit and the conclusion is where evaluation is actually assessed. Telling the board to weigh the factors returns the work they engaged an adviser to do, which is why this pattern converts a strong script into an average one.",
      },
    },
    {
      id: "forecasting",
      heading: "Reasoned forecasting",
      blocks: [
        {
          kind: "text",
          md: "I5(b) asks for estimates of trends and reasoned forecasts of how factors or decisions will play out. \"Reasoned\" is the operative word: SBL does not want a number pulled from nowhere, it wants a defensible expectation with its basis shown.",
        },
        {
          kind: "table",
          caption: "What makes a forecast defensible",
          head: ["Element", "Example"],
          rows: [
            ["A stated starting point", "\"Current volume is 240,000 units\""],
            ["A driver, not a rate", "\"Growth depends on the two contracts under tender, worth 40,000 units together\""],
            ["A range rather than a point", "\"Between flat and +15%, depending on whether one or both are won\""],
            ["The assumption made explicit", "\"Assuming pricing holds and no capacity constraint before 300,000\""],
            ["The consequence in each case", "\"At flat volume the covenant is met with $0.3m headroom; at +15% capital investment is required\""],
            ["An indicator to watch", "\"Tender outcomes are known in November — that is the decision point\""],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Forecast in ranges with triggers, not single numbers",
          md: "A point estimate for an uncertain future is either luck or false confidence, and a board cannot plan against it. A range with the driver identified and a date at which the uncertainty resolves is genuinely useful: it tells the board what to watch and when it will know. This is the scenario discipline from SBL-13 applied at the scale of a single decision.",
        },
        {
          kind: "text",
          md: "Be alert to the direction of your own error, too. Forecasts prepared by people invested in an outcome tend to be optimistic on volume and timing and light on cost — which is why SBL-43's question about interest applies to a forecast you are asked to evaluate, and why sensitivity analysis from SBL-32 is the natural companion to this skill.",
        },
      ],
      check: {
        q: "Which is the better-formed forecast for a board?",
        options: [
          "Revenue will grow by 8% next year",
          "Revenue depends on two contracts under tender worth $4m combined, decided in November: flat if neither is won, up to 11% if both are, with capacity investment needed above 9%",
          "Revenue growth is uncertain and difficult to predict",
          "Revenue should grow in line with the market",
        ],
        correct: 1,
        explain:
          "It names the driver, gives a range with what each end depends on, identifies when the uncertainty resolves, and flags the consequence at the upper end. A single percentage offers false precision, and options 2 and 3 give the board nothing to plan against.",
      },
    },
    {
      id: "appraising",
      heading: "Appraising objectively: cost, risk, benefit, opportunity",
      blocks: [
        {
          kind: "text",
          md: "I5(c) asks for objective appraisal balancing costs, risks, benefits and opportunities before recommending. The four together are the checklist — most weak answers cover two.",
        },
        {
          kind: "table",
          caption: "The four, and what each requires",
          head: ["Dimension", "Ask", "Commonly missed"],
          rows: [
            ["Cost", "What does it consume — cash, capacity, attention?", "Management attention, and the cost of not doing something else"],
            ["Risk", "What could go wrong, how badly, how likely?", "Downside case rather than base case; correlated exposures"],
            ["Benefit", "What is gained, quantified where possible, and when?", "Timing — benefits arriving after the decision point that matters"],
            ["Opportunity", "What does this open up, or foreclose?", "Option value, and what is given up by committing"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Opportunity cuts both ways — and foreclosure is the half candidates miss",
          md: "Committing to one option usually removes others: capital spent here cannot be spent there, an exclusive contract prevents a better partner, an outsourcing decision loses the capability to bring the work back. Naming what a recommendation *forecloses* is a mature evaluation point and directly examinable, since it is the opposite face of the option value in SBL-32.",
        },
        {
          kind: "text",
          md: "Objectivity, finally, means appraising against the criteria rather than against a preference formed early. Two habits protect it: state your criteria before examining the options, so they are not chosen to fit a conclusion; and set out the case against your own recommendation as strongly as you can, which is the same discipline as the counter-argument in SBL-40. Where the evidence genuinely does not settle the question, say so and recommend what would — an investigation, a pilot, a staged commitment — rather than manufacturing certainty.",
        },
      ],
      check: {
        q: "A recommendation to sign a five-year exclusive distribution agreement covers cost, risk and benefit. What is most likely missing?",
        options: [
          "A calculation of the net present value",
          "Opportunity — what the exclusivity forecloses, including the inability to appoint a better distributor or sell direct for five years, and what that option would have been worth",
          "The legal terms of the agreement",
          "A comparison of distributor commission rates",
        ],
        correct: 1,
        explain:
          "Exclusivity's defining feature is what it prevents, so the foreclosed alternatives are the dimension a three-way appraisal omits. That is the opportunity half of the appraisal, and it is where a five-year commitment most often turns out to have been expensive.",
      },
    },
  ],
  examTraps: [
    { trap: "Presenting balance and no conclusion.", fix: "Weigh the arguments, say which dominates here, and state the recommendation and next action." },
    { trap: "Concluding without having set out the case against.", fix: "Both halves are marked; an unbalanced conclusion is assertion." },
    { trap: "Giving a single-point forecast.", fix: "Give a range with its driver, the assumption, the consequence at each end, and when it resolves." },
    { trap: "Appraising cost, risk and benefit and omitting opportunity.", fix: "Say what the decision opens up and — especially — what it forecloses." },
    { trap: "Choosing criteria to fit a conclusion already formed.", fix: "State the criteria first, and argue the case against your own recommendation." },
  ],
  keyTerms: [
    { term: "Evaluation", def: "Weighing evidence and argument to reach and state a supported judgement." },
    { term: "Tie-breaker", def: "The consideration that decides between genuinely close options — usually risk, reversibility, funding or a deadline." },
    { term: "Reasoned forecast", def: "An expectation expressed as a range, with its driver, assumptions, consequences and the date the uncertainty resolves." },
    { term: "Foreclosure", def: "The options a commitment removes — the half of opportunity appraisal most often omitted." },
  ],
  summary: [
    "Evaluation is balance AND judgement; doing only one loses the marks.",
    "\"Both sides have arguments\" is true of every case and is where the marks stop.",
    "State what would change your advice — that is judgement about its limits.",
    "Forecast in ranges with drivers and a resolution date, not single numbers.",
    "Appraise cost, risk, benefit and opportunity — including what the decision forecloses.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the two halves of the evaluation skill?", a: "Genuine balance — the case for and against, fairly evidenced — and the judgement that says which dominates and what should be done." },
    { q: "What should be given when two options are genuinely close?", a: "Say so, and give the tie-breaker: usually risk, reversibility, funding or the deadline the case supplies." },
    { q: "What makes a forecast reasoned rather than asserted?", a: "A stated starting point, a named driver, a range, explicit assumptions, the consequence at each end, and when the uncertainty resolves." },
    { q: "Which of the four appraisal dimensions is most often missed, and why does it matter?", a: "Opportunity — particularly what a commitment forecloses, since committing to one option usually removes others." },
  ],
  furtherStudy: [
    "SBL-42 covers the analysis evaluation weighs",
    "SBL-43 covers testing assertions before relying on them",
    "SBL-32 covers sensitivity analysis and option value",
    "SBL-16 covers suitability, acceptability and feasibility as evaluation criteria",
  ],
}

export const SBL_TREE_AREA_I: StudyChapter[] = [
  SBL_TREE_40, SBL_TREE_41, SBL_TREE_42, SBL_TREE_43, SBL_TREE_44,
]
