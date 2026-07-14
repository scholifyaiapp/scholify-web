import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBL · Area E — Professional skills & ethics.
 * The distinctive SBL area: the exam awards explicit PROFESSIONAL SKILLS marks
 * on top of technical marks. This chapter teaches the five skills, the fundamental
 * ethical principles, and the ethical decision models — applied, not memorised.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const SBL_E: StudyChapter = {
  paper: "SBL",
  area: "E",
  title: "Professional skills & ethics",
  minutes: 16,
  intro: "SBL is the only exam where HOW you answer earns marks in its own right. The technical point is half the job; showing the five professional skills — and reasoning ethically — is the other half.",
  outcomes: [
    "Name the five SBL professional skills and state exactly what each one requires you to DO",
    "Apply the IESBA/ACCA fundamental principles to a scenario and spot the threats to them",
    "Work an ethical dilemma through Tucker's five-question model and the AAA seven-step model",
    "Distinguish professional scepticism from mere suspicion, and analysis from evaluation",
    "Give a board balanced advice that weighs both sides and ends in a clear recommendation",
    "Explain the limitations of the data you are handed and why that caveats your advice",
  ],
  sections: [
    {
      id: "why-skills",
      heading: "Why SBL scores HOW you answer",
      blocks: [
        { kind: "text", md: "In every other ACCA exam, a mark is a mark: get the number right, earn the point. **SBL is different.** The examiner splits each requirement into **technical marks** (did you know the model, the standard, the risk?) and **professional skills marks** (did you *communicate, analyse, evaluate, apply commercial acumen and show scepticism* while you used that knowledge?). A candidate who lists ten textbook points in a wall of bullet text can score the technical marks and still lose most of the professional skills marks — because listing is not the same as **applying**." },
        { kind: "text", md: "Think of it like being hired as a consultant. Your client does not pay for a recital of theory; they pay for **judgement delivered in a usable form** — a board paper, a briefing, a recommendation. The professional skills marks reward exactly that: the difference between a student who *knows* and an adviser the board would actually trust." },
        { kind: "callout", tone: "key", title: "The one idea", md: "In SBL, **content and craft are marked separately.** You must be right, *and* you must communicate, analyse, evaluate, show commercial acumen and be sceptical while doing it. Ignore the skills and you cap your own mark." },
      ],
    },
    {
      id: "five-skills",
      heading: "The five professional skills — what each demands",
      blocks: [
        { kind: "text", md: "There are exactly **five** professional skills, and each has a precise meaning. Learn not the label but the **behaviour** each one rewards, because the exam requirement will name the skill it is testing (\"analyse\", \"evaluate\", \"demonstrate scepticism\") and mark you against that behaviour." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The five SBL professional skills",
          caption: "Each requirement targets one or more of these — and marks the behaviour, not the topic.",
          data: {
            items: [
              { title: "Communication", sub: "Right format, tone and audience — a board paper reads differently from an email" },
              { title: "Commercial acumen", sub: "Judgement in context: awareness of real constraints, cost, and what is practical" },
              { title: "Analysis", sub: "Use the data and evidence given — break it apart, draw meaning from it" },
              { title: "Scepticism", sub: "Probe and question; recognise bias and unstated assumptions — not blind trust" },
              { title: "Evaluation", sub: "Weigh both sides, then conclude with a clear, reasoned recommendation" },
            ],
          },
        } },
        { kind: "table", caption: "What each skill actually requires in an answer", head: ["Skill", "What it requires you to DO", "Weak vs strong signal"], rows: [
          ["Communication", "Match format (report/email/slides), tone and audience; structure with headings", "Weak: raw notes. Strong: a titled board paper an executive could table"],
          ["Commercial acumen", "Show awareness of constraints — cash, time, people, competition, feasibility", "Weak: ignores cost. Strong: 'attractive, but the $2m outlay strains our covenant'"],
          ["Analysis", "Work with the numbers/facts in the exhibit; interpret, don't just quote", "Weak: repeats the exhibit. Strong: 'margin fell 4 points because…'"],
          ["Scepticism", "Question the reliability of information; name the bias or assumption", "Weak: accepts the figures. Strong: 'these forecasts are management's own — untested'"],
          ["Evaluation", "Weigh advantages against disadvantages and REACH a conclusion", "Weak: lists pros and cons. Strong: 'on balance, proceed, because…'"],
        ] },
        { kind: "callout", tone: "tip", md: "A memory hook: **C-C-A-S-E** — **C**ommunication, **C**ommercial acumen, **A**nalysis, **S**cepticism, **E**valuation. Every professional skill mark you can earn lives in one of those five letters." },
      ],
      check: {
        q: "A requirement says: 'Assess the two proposed strategies and advise the board which to pursue.' Which professional skill is most directly being tested?",
        options: [
          "Analysis — because you must read the exhibits",
          "Communication — because it is addressed to the board",
          "Evaluation — because you must weigh both and reach a recommendation",
          "Scepticism — because strategies are uncertain",
        ],
        correct: 2,
        explain: "The verbs 'assess … and advise which' demand you weigh the options against each other and conclude with a recommendation — that is evaluation. Analysis and communication also feature (you must read the data and write to a board), but the mark-defining behaviour here is reaching a reasoned conclusion, which is evaluation.",
      },
    },
    {
      id: "scepticism-suspicion",
      heading: "Scepticism vs suspicion; analysis vs evaluation",
      blocks: [
        { kind: "text", md: "Two pairs of ideas are constantly confused, and each confusion costs marks. First, **scepticism is not suspicion.** Professional scepticism is a *questioning mindset*: you neither assume management is honest nor assume they are lying — you seek **evidence** before you accept a claim. Suspicion is an *emotional stance* that presumes wrongdoing; it is not professional, and it can bias your judgement just as badly as naive trust does." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Professional scepticism vs suspicion",
          data: {
            leftTitle: "Professional scepticism",
            rightTitle: "Suspicion",
            rows: [
              { aspect: "Starting point", left: "Neutral — neither trust nor distrust", right: "Presumes dishonesty or wrongdoing" },
              { aspect: "Driven by", left: "Evidence and corroboration", right: "Emotion, hunch or prejudice" },
              { aspect: "Question asked", left: "'What supports this claim?'", right: "'What are they hiding?'" },
              { aspect: "Effect on judgement", left: "Sharpens and balances it", right: "Biases it toward a conclusion" },
              { aspect: "Professional?", left: "Yes — the required mindset", right: "No — an unbalanced stance" },
            ],
          },
        } },
        { kind: "text", md: "Second, **analysis is not evaluation.** *Analysis* breaks information down — it interprets the data, spots the trend, works out *why* the margin moved. *Evaluation* takes that analysis, weighs competing considerations, and *concludes* — it answers 'so what should we do?'. Analysis is the engine; evaluation is the steering. A strong SBL answer does both: it mines the exhibit (analysis) and then decides (evaluation)." },
        { kind: "callout", tone: "warn", title: "The trap", md: "Writing 'the figures may be wrong so I distrust management' is **suspicion**, not scepticism — and it earns no skill marks. Scepticism sounds like: 'the forecast is management's own and unaudited, so I would corroborate it against market data before relying on it.'" },
      ],
      check: {
        q: "Which statement demonstrates PROFESSIONAL SCEPTICISM rather than suspicion?",
        options: [
          "'Management is clearly trying to mislead the board with these numbers.'",
          "'The synergy figure comes from the acquiring team who are incentivised on the deal, so I would seek independent support for it before relying on it.'",
          "'I don't trust any forecast, so I would reject the proposal.'",
          "'The directors have hidden something — we should investigate them.'",
        ],
        correct: 1,
        explain: "Scepticism is a neutral, evidence-seeking mindset that RECOGNISES a possible bias (the team is incentivised) and responds by seeking corroboration — not by presuming guilt. The other options presume dishonesty (suspicion) or reject everything wholesale, neither of which is professional or balanced.",
      },
    },
    {
      id: "principles",
      heading: "Applying the fundamental ethical principles",
      blocks: [
        { kind: "text", md: "Ethics in SBL rests on the **five fundamental principles** shared by the IESBA Code and the ACCA Code of Ethics and Conduct. In a scenario you are not asked to recite them — you are asked to spot **which principle is under pressure** and say what a professional accountant should do. Learn each as a test you can apply to a manager's behaviour." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The five fundamental principles (IESBA / ACCA)",
          caption: "In a scenario, ask: which of these is this situation threatening?",
          data: {
            items: [
              { title: "Integrity", sub: "Be straightforward and honest in all professional and business relationships" },
              { title: "Objectivity", sub: "Do not let bias, conflict of interest or undue influence override judgement" },
              { title: "Professional competence & due care", sub: "Maintain skill and knowledge; act diligently to a technical standard" },
              { title: "Confidentiality", sub: "Do not disclose information without authority, nor use it for personal gain" },
              { title: "Professional behaviour", sub: "Comply with laws and regulations; avoid conduct that discredits the profession" },
            ],
          },
        } },
        { kind: "text", md: "Threats to these principles are usually grouped into five kinds — **self-interest** (personal gain), **self-review** (checking your own work), **advocacy** (promoting a client's position), **familiarity** (too close a relationship), and **intimidation** (pressure or threats). Naming the *threat* as well as the *principle* is what turns a memorised list into applied ethics — and earns the marks." },
        { kind: "diagram", diagram: {
          type: "radial",
          title: "Threats to the fundamental principles",
          caption: "Each threat undermines one or more principles — name it, then respond with a safeguard.",
          data: {
            centre: "The five principles at risk",
            nodes: [
              { label: "Self-interest", sub: "a personal (often financial) stake" },
              { label: "Self-review", sub: "evaluating your own prior work" },
              { label: "Advocacy", sub: "promoting a position until objectivity is compromised" },
              { label: "Familiarity", sub: "too close or too trusting a relationship" },
              { label: "Intimidation", sub: "actual or perceived pressure" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — spotting the principle and the threat", scenario: "The finance director asks you, the management accountant, to delay recognising a large warranty provision until after the year-end so that reported profit hits the bonus target on which both of you are paid. What is the ethical issue, and how should you frame it?", steps: [
          { label: "Principle threatened", detail: "Integrity (deliberately misstating profit is dishonest) and objectivity (your judgement is compromised by the shared bonus)." },
          { label: "Name the threat", detail: "Self-interest — you personally gain from the bonus — reinforced by intimidation from a senior director." },
          { label: "Test the request", detail: "Deferring a provision that meets the recognition criteria breaches the accounting standard and misleads users — it is not a matter of opinion." },
          { label: "Respond, don't just refuse", detail: "Explain the principle at stake, decline to make the adjustment, document the discussion, and escalate (audit committee) if pressure continues." },
        ], result: "The answer that scores is not 'this is unethical' — it is naming the principle (integrity/objectivity), the threat (self-interest/intimidation) and a proportionate, professional response." },
      ],
    },
    {
      id: "models",
      heading: "Two decision models: Tucker and the AAA",
      blocks: [
        { kind: "text", md: "When a dilemma is genuinely hard, a structured model stops you jumping to a gut answer. SBL expects you to apply one. **Tucker's five-question model** is a fast screen: an action must pass **all five** tests to be acceptable. If it fails any one, it is not defensible." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Tucker's five-question model",
          caption: "A proposed decision must pass every gate — fail one and it is not acceptable.",
          data: {
            steps: [
              { label: "Is it profitable?", sub: "Does it make commercial sense?" },
              { label: "Is it legal?", sub: "Does it comply with the law?" },
              { label: "Is it fair?", sub: "To all affected parties?" },
              { label: "Is it right?", sub: "Morally, in conscience?" },
              { label: "Is it sustainable?", sub: "Environmentally & long-term?" },
            ],
          },
        } },
        { kind: "text", md: "Tucker screens *a* decision quickly, but it does not help you *work through* a messy situation. For that, the **American Accounting Association (AAA) seven-step model** walks you from the facts to a defensible action — it is the one to reach for when the scenario is tangled and you must show a reasoning trail." },
        { kind: "table", caption: "The AAA seven-step decision model", head: ["Step", "Question to answer"], rows: [
          ["1. Facts", "What are the facts of the case?"],
          ["2. Ethical issues", "What are the ethical issues and who is affected?"],
          ["3. Norms & principles", "Which values, norms and principles are relevant?"],
          ["4. Alternatives", "What are the alternative courses of action?"],
          ["5. Best fit", "Which alternative best fits the norms and principles?"],
          ["6. Consequences", "What are the consequences of each alternative?"],
          ["7. Decision", "What is the decision — the defensible course of action?"],
        ] },
        { kind: "callout", tone: "rule", title: "Which model, when", md: "Use **Tucker** as a quick five-gate test of a *proposed* action. Use the **AAA seven steps** to *work through* a complex dilemma and show your reasoning. The exam rewards applying the steps to the scenario — not defining the model." },
      ],
      check: {
        q: "A proposed cost-cutting plan is highly profitable and fully legal, but it quietly shifts a safety risk onto a supplier's workers. Under Tucker's five-question model, is it acceptable?",
        options: [
          "Yes — it passes the profitable and legal tests, which are the important ones",
          "No — it must pass ALL five questions, and it fails 'is it fair?' and 'is it right?'",
          "Yes — legality settles the ethical question",
          "It cannot be judged without knowing the exact profit figure",
        ],
        correct: 1,
        explain: "Tucker's model is a five-gate test: a decision is only acceptable if it passes ALL five questions. Being profitable and legal is not enough — shifting an undisclosed safety risk onto others fails the 'fair' and 'right' tests, so the plan is not defensible however profitable it is.",
      },
    },
    {
      id: "board-advice",
      heading: "Balanced advice — and the limits of the data",
      blocks: [
        { kind: "text", md: "The professional skills come together when you advise a board. **Balanced advice** presents both sides fairly *before* it concludes — a board is rightly suspicious of a paper that only argues one way, because it hides the risk. So evaluate the case *against* your recommendation honestly, then explain why, **on balance**, you still recommend a course of action. A recommendation without the counter-case looks like advocacy, not advice." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "How balanced advice is built",
          caption: "The order matters: weigh both sides first, then commit.",
          data: {
            steps: [
              { label: "The case for", sub: "benefits, upside, opportunity" },
              { label: "The case against", sub: "costs, risks, constraints" },
              { label: "Weigh", sub: "which considerations dominate, and why" },
              { label: "Recommend", sub: "a clear, reasoned conclusion" },
            ],
          },
        } },
        { kind: "text", md: "Good advice is also **honest about its own foundations.** Every recommendation rests on data, and data has limits. Forecasts may be management's own and untested; figures may be historic and no longer representative; a sample may be too small; definitions may differ between exhibits; and numbers rarely capture qualitative factors like reputation or staff morale. Flagging these limitations is not hedging — it is scepticism made visible, and it protects the board from over-relying on a single number." },
        { kind: "callout", tone: "warn", title: "Limitations to name", md: "**Source bias** (who prepared it, and are they incentivised?); **age** (is it still current?); **completeness** (what is missing?); **comparability** (same basis across exhibits?); and **the qualitative gap** (what can't the data show?). Naming even two of these turns a flat answer into a sceptical, professional one." },
        { kind: "callout", tone: "tip", md: "A board paper that ends 'I recommend X, subject to verifying the synergy forecast against independent market data' scores communication, evaluation AND scepticism in one sentence — because it concludes, but caveats the data it relied on." },
      ],
    },
  ],
  examTraps: [
    { trap: "Listing textbook points instead of applying them to the scenario.", fix: "Professional skill marks reward application. Tie every point to a fact in the exhibit — 'because revenue fell 8%…', not 'revenue is important'." },
    { trap: "Confusing scepticism with suspicion.", fix: "Scepticism is neutral and evidence-seeking; suspicion presumes wrongdoing. Say 'I would corroborate this', not 'they are hiding something'." },
    { trap: "Stopping at analysis and never evaluating.", fix: "Analysis interprets the data; evaluation weighs the options and CONCLUDES. If your answer has no recommendation, you have left evaluation marks on the table." },
    { trap: "Naming the principle but not the threat (or vice versa).", fix: "State both: which fundamental principle is at risk (e.g. objectivity) AND which threat causes it (e.g. self-interest). Then give a proportionate response." },
    { trap: "Giving one-sided advice with a recommendation but no counter-case.", fix: "Balanced advice weighs both sides first, then concludes 'on balance'. A one-sided paper reads as advocacy and loses evaluation marks." },
  ],
  keyTerms: [
    { term: "Professional skills marks", def: "Marks awarded in SBL for HOW you answer — communication, commercial acumen, analysis, scepticism and evaluation — separate from technical marks." },
    { term: "Commercial acumen", def: "Judgement applied in a real business context: awareness of constraints such as cost, cash, time, feasibility and competition." },
    { term: "Professional scepticism", def: "A neutral, questioning mindset that seeks evidence before accepting a claim, and recognises bias — distinct from suspicion, which presumes wrongdoing." },
    { term: "Fundamental principles", def: "The five IESBA/ACCA principles: integrity, objectivity, professional competence and due care, confidentiality, and professional behaviour." },
    { term: "Tucker's five-question model", def: "A screen for a proposed decision — is it profitable, legal, fair, right and sustainable? It must pass all five to be acceptable." },
    { term: "AAA seven-step model", def: "A structured ethical decision process: facts, ethical issues, norms, alternatives, best fit, consequences, decision." },
  ],
  summary: [
    "SBL marks content and craft separately: the five professional skills — communication, commercial acumen, analysis, scepticism, evaluation — earn marks in their own right.",
    "Scepticism is neutral and evidence-seeking, not suspicion; analysis interprets data while evaluation weighs options and concludes.",
    "The five fundamental principles are integrity, objectivity, professional competence and due care, confidentiality, and professional behaviour — name the principle AND the threat.",
    "Tucker's five questions screen a proposed action (all five must pass); the AAA seven steps work through a complex dilemma to a defensible decision.",
    "Advise a board with balanced two-sided reasoning ending in a clear recommendation, and flag the limitations of the data you relied on.",
  ],
}
