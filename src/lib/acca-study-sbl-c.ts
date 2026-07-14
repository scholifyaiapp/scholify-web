import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBL · Area C — Risk & control.
 * Applied, evaluative depth: risk assessment and the risk map, appetite vs
 * capacity, gross vs residual risk, the 4Ts response, ERM, COSO internal
 * control, the three lines of defence, internal audit, fraud and the ethics
 * of risk. Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const SBL_C: StudyChapter = {
  paper: "SBL",
  area: "C",
  title: "Risk & control",
  minutes: 16,
  intro: "Every strategy is a bet on an uncertain future. Risk and control is the discipline that decides which bets are worth taking, how big to make them, and what to put in place when they go wrong.",
  outcomes: [
    "Identify and assess risk using likelihood and impact, and plot it on a risk map",
    "Distinguish risk appetite from risk capacity, and gross risk from residual risk",
    "Select the correct response from the 4Ts and map each T to the right part of the risk map",
    "Contrast an enterprise-wide (ERM) approach with a silo approach to risk",
    "Explain the COSO components of internal control and the three lines of defence",
    "Distinguish the risk committee from the audit committee, and evaluate the fraud triangle",
  ],
  sections: [
    {
      id: "assess",
      heading: "Identifying and assessing risk",
      blocks: [
        { kind: "text", md: "Risk is not simply \"bad things happening\". It is the effect of **uncertainty on objectives** — and uncertainty cuts both ways. A new product might fail (downside) or capture a market (upside). Strategic Business Leader is almost never about avoiding risk; it is about taking the **right** risks **knowingly**, with the controls to survive the ones that turn against you." },
        { kind: "text", md: "Every risk is assessed on two axes. **Likelihood** is how probable the event is; **impact** (consequence) is how much it would hurt objectives if it happened. Multiplying a rough score for each gives a crude but powerful ranking — the basis of the **risk map** (also called a heat map), which sorts risks into quadrants so the board can see instantly which ones demand attention." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The risk map — four quadrants of likelihood x impact",
          caption: "Position on the map drives the response. Read this alongside the 4Ts in the next section.",
          data: {
            items: [
              { title: "Low likelihood / Low impact", sub: "Minor, unlikely — not worth costly action. Accept and monitor." },
              { title: "Low likelihood / High impact", sub: "Rare but catastrophic — the classic case for insurance or hedging. Transfer." },
              { title: "High likelihood / Low impact", sub: "Frequent nuisances — build controls to lower the odds or cost. Reduce." },
              { title: "High likelihood / High impact", sub: "Likely and severe — often not worth doing at all. Avoid." },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "Two words that trip students up", md: "**Risk appetite** is how much risk an organisation is **willing** to take to pursue its objectives — a choice. **Risk capacity** is the maximum risk it could **absorb** before failing — a limit set by its resources. A bold board may have a large appetite but a small capacity; running appetite above capacity is how firms collapse on a single event." },
        { kind: "callout", tone: "rule", title: "Gross vs net (residual) risk", md: "**Gross (inherent) risk** is the risk **before** any controls are applied. **Residual (net) risk** is what remains **after** controls. The whole point of internal control is to move a risk from an unacceptable gross position to a residual level that sits **within appetite**. If residual risk is still above appetite, the response has failed — you need stronger controls or a different response." },
        { kind: "text", md: "The audit trail for all of this is the **risk register**: a live document listing each risk, its owner, the gross likelihood and impact, the controls in place, the residual score, and the chosen response. It is the board's evidence that risk is being managed deliberately rather than by luck." },
      ],
      check: {
        q: "A retailer says it is \"willing to accept up to $2m of losses a year chasing new markets\", but its cash reserves mean a single $5m loss would make it insolvent. Which statement is correct?",
        options: [
          "Its risk appetite is $5m and its risk capacity is $2m",
          "Its risk appetite is $2m and its risk capacity is around $5m",
          "Appetite and capacity are the same thing here",
          "Neither figure describes appetite or capacity",
        ],
        correct: 1,
        explain: "Appetite is what it is WILLING to take ($2m — a chosen target). Capacity is the maximum it could ABSORB before failing (around $5m — the insolvency limit). Appetite should sit safely below capacity, which it does here, leaving a buffer against a single severe event.",
      },
    },
    {
      id: "tara",
      heading: "Responding to risk — the 4Ts",
      blocks: [
        { kind: "text", md: "Once a risk is assessed, the board chooses a response. The four options are the **4Ts** (also called **TARA**): **Transfer, Avoid, Reduce, Accept**. The skill the examiner rewards is not listing them — it is matching the **right** T to a risk's position on the map, because the map's two axes point to different responses." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The 4Ts / TARA — and where each belongs on the risk map",
          caption: "The correct T is driven by the combination of likelihood and impact.",
          data: {
            items: [
              { title: "Transfer (share)", sub: "Low likelihood, HIGH impact. Pass the financial consequence to someone else — insurance, hedging, outsourcing, contractual indemnities." },
              { title: "Avoid (terminate)", sub: "HIGH likelihood, HIGH impact. The risk is too great to bear — do not enter the activity, or exit it entirely." },
              { title: "Reduce (treat/mitigate)", sub: "HIGH likelihood, low impact. Keep the activity but install controls to lower the probability or the cost." },
              { title: "Accept (tolerate/retain)", sub: "Low likelihood, low impact. The cost of acting exceeds the benefit — retain the risk and monitor it." },
            ],
          },
        } },
        { kind: "example", title: "Worked example — choosing the T", scenario: "An airline is assessing three risks: (1) a passenger jet being destroyed in a crash; (2) minor baggage-handling damage claims, which happen weekly; (3) a proposal to launch flights over an active war zone where an incident is both likely and would be catastrophic. Which T fits each?", steps: [
          { label: "Jet destroyed", detail: "Very LOW likelihood but HIGH impact (hundreds of millions). Classic Transfer — this is exactly what aviation insurance exists for." },
          { label: "Baggage damage", detail: "HIGH likelihood but LOW impact per claim. Reduce — better handling processes, staff training and packaging controls to cut frequency and cost." },
          { label: "War-zone route", detail: "HIGH likelihood AND HIGH impact. Avoid — do not fly the route. No control or insurance makes this acceptable." },
        ], result: "Transfer for rare-but-severe, Reduce for frequent-but-minor, Avoid for likely-and-severe. A tiny, trivial risk (a coffee spill in the lounge) would simply be Accepted." },
        { kind: "callout", tone: "warn", title: "The examiner's favourite trap", md: "Students reflexively write \"reduce\" for everything. **Reduce** suits **high-likelihood, low-impact** risks. A rare catastrophe should be **Transferred**, not reduced; a likely catastrophe should be **Avoided**. Justify the T against **both** axes, not just \"it sounds prudent\"." },
      ],
      check: {
        q: "A bank identifies a risk that is very UNLIKELY to occur but would be CATASTROPHIC if it did (for example, a major data-centre fire). Which response from the 4Ts is most appropriate?",
        options: [
          "Accept — because it is unlikely",
          "Avoid — abandon the activity entirely",
          "Transfer — for example through insurance and disaster-recovery contracts",
          "Reduce — add a few extra controls and move on",
        ],
        correct: 2,
        explain: "Low likelihood + high impact points to Transfer: the event is too rare to justify avoiding the whole activity, but too severe to simply accept, so the financial consequence is shared via insurance/recovery arrangements. Accept suits low-impact risks; Avoid suits high-LIKELIHOOD, high-impact risks.",
      },
    },
    {
      id: "erm",
      heading: "Enterprise risk management vs the silo approach",
      blocks: [
        { kind: "text", md: "How an organisation is **structured** to manage risk matters as much as the responses it picks. In a **silo approach**, each department manages its own risks in isolation — treasury watches currency, IT watches cyber, operations watches supply. It feels tidy, but it is dangerous: no one sees how risks **interact**, the same risk gets double-counted or missed entirely, and opportunities to offset one risk against another are lost." },
        { kind: "text", md: "**Enterprise risk management (ERM)** takes the opposite view: risk is managed **holistically, across the whole organisation**, driven top-down by the board and embedded in strategy. ERM aggregates risks so correlations are visible, aligns the total risk taken to a single **appetite**, and treats risk as something to be **exploited** as well as guarded against. It is the difference between many people each watching one instrument and a single cockpit seeing the whole flight." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The risk-management cycle",
          caption: "A continuous loop, not a one-off exercise — the board revisits it as strategy and the environment change.",
          data: {
            steps: [
              { label: "Identify", sub: "Find the risks facing objectives — internal and external" },
              { label: "Assess", sub: "Score likelihood x impact; plot on the risk map" },
              { label: "Respond", sub: "Choose a T: transfer, avoid, reduce or accept" },
              { label: "Control", sub: "Implement controls to reach residual within appetite" },
              { label: "Monitor & report", sub: "Track, update the register, feed back to the board" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "In a case study, spot silo failure by the symptoms: risks \"falling between departments\", nobody owning an emerging threat, or two functions unknowingly hedging against each other. The recommendation is almost always to move toward **ERM** with clear ownership and board-level oversight." },
      ],
    },
    {
      id: "control",
      heading: "Internal control and the COSO framework",
      blocks: [
        { kind: "text", md: "**Internal control** is the system of processes that gives reasonable assurance that objectives will be met — reliable reporting, efficient operations, and compliance with laws. It is designed and owned by the **board and management**, not by the auditors, and it can only ever give **reasonable** (never absolute) assurance, because human error, collusion and management override can defeat any control." },
        { kind: "text", md: "The most widely used model is the **COSO framework**, which breaks a sound control system into **five components**. A common exam error is to reduce internal control to \"control activities\" alone — that is only one of the five, and a system missing the other four is fragile." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The five components of internal control (COSO)",
          caption: "Control activities are just one layer — the environment, risk assessment, information and monitoring hold the system together.",
          data: {
            items: [
              { title: "Control environment", sub: "The tone at the top — integrity, ethics, board oversight, structure and accountability. The foundation everything else rests on." },
              { title: "Risk assessment", sub: "Identifying and analysing the risks to objectives so controls can be targeted where they matter." },
              { title: "Control activities", sub: "The actual controls — authorisation, reconciliations, segregation of duties, physical and IT controls." },
              { title: "Information & communication", sub: "Capturing and sharing the right information, up, down and across, so people can act on it." },
              { title: "Monitoring activities", sub: "Ongoing and separate evaluations that check controls still work and fix deficiencies." },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "Controls have costs", md: "A control is only worth having if its benefit exceeds its cost. **Over-control** is a real failure mode: excessive sign-offs slow the business, frustrate staff and can push people to bypass the system. The board's job is proportionality — controls sized to the residual risk they are managing." },
      ],
      check: {
        q: "A company boasts of \"strong internal control\" but its directors routinely override procedures and set a poor ethical example. Which COSO component is most fundamentally weak?",
        options: [
          "Control activities",
          "The control environment",
          "Information and communication",
          "Monitoring activities",
        ],
        correct: 1,
        explain: "The control environment — the 'tone at the top' — is the foundation of the whole system. If directors override controls and model poor ethics, no amount of control activities will hold, because the environment they sit in is compromised. This is why COSO puts the environment first.",
      },
    },
    {
      id: "governance",
      heading: "Governing risk — committees, the three lines and internal audit",
      blocks: [
        { kind: "text", md: "Two board committees are constantly confused. The **risk committee** is **forward-looking**: it advises the board on risk **appetite** and **strategy**, and oversees the risk-management framework across the enterprise. The **audit committee** is more **backward-looking** and assurance-focused: it oversees financial reporting, the internal control system, internal audit and the relationship with the external auditor. In smaller entities one committee may do both, but their orientations differ." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Risk committee vs audit committee",
          data: {
            leftTitle: "Risk committee",
            rightTitle: "Audit committee",
            rows: [
              { aspect: "Orientation", left: "Forward-looking — future risks", right: "Assurance-focused — largely retrospective" },
              { aspect: "Core question", left: "How much risk should we take?", right: "Are our controls and reporting sound?" },
              { aspect: "Owns", left: "Risk appetite & the ERM framework", right: "Financial reporting integrity & control oversight" },
              { aspect: "Relationship", left: "Advises the board on risk strategy", right: "Oversees internal & external audit" },
              { aspect: "Membership", left: "Mix of execs & NEDs with risk expertise", right: "Independent non-executive directors" },
            ],
          },
        } },
        { kind: "text", md: "To keep responsibilities clear, good governance uses the **three lines of defence** model. Each line has a distinct job, and — crucially — the lines must stay **independent** of one another. Collapsing them (for example, letting operational managers grade their own assurance) destroys the model's value." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The three lines of defence",
          caption: "Ownership, oversight and independent assurance — three separate roles that must not be merged.",
          data: {
            items: [
              { title: "1st line — Operational management", sub: "OWNS and MANAGES risk day to day. Front-line staff and their managers who run the controls in the business." },
              { title: "2nd line — Risk & compliance functions", sub: "OVERSEES and monitors. Risk management, compliance and quality functions that set policy and challenge the first line." },
              { title: "3rd line — Internal audit", sub: "INDEPENDENT assurance. Objectively evaluates whether the first two lines work, reporting to the audit committee." },
            ],
          },
        } },
        { kind: "text", md: "**Internal audit** is that third line: an independent, objective function that evaluates and improves risk management, control and governance. Its independence is protected by reporting to the **audit committee** rather than to the executives whose work it examines. Note the contrast with **external audit**, which is appointed by shareholders and gives an opinion on the financial statements — internal audit's scope is far wider (operations, value for money, compliance) and set by the board." },
      ],
      check: {
        q: "In the three lines of defence model, which function provides INDEPENDENT assurance that the first and second lines are working, and to whom should it report to protect that independence?",
        options: [
          "Operational management, reporting to the CEO",
          "The compliance function, reporting to the finance director",
          "Internal audit, reporting to the audit committee",
          "External audit, reporting to the risk committee",
        ],
        correct: 2,
        explain: "Internal audit is the third line — independent, objective assurance over the first line (operational management, which owns risk) and the second line (risk and compliance oversight). Reporting to the audit committee, rather than to the executives it reviews, is what safeguards its independence.",
      },
    },
    {
      id: "fraud",
      heading: "Fraud, business continuity and the ethics of risk",
      blocks: [
        { kind: "text", md: "Some risks are created deliberately from inside. **Fraud** — intentional deception for unlawful gain — is best understood through the **fraud triangle**: three conditions that must usually be present together for fraud to occur. Remove any one side and the risk falls sharply, which is exactly how controls are targeted." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "The fraud triangle",
          caption: "Fraud risk peaks when all three sides coincide. Controls work by knocking out a side — usually opportunity.",
          data: {
            levels: [
              { label: "Pressure / motivation", sub: "A reason to do it — personal debt, unrealistic targets, bonus or covenant pressure, addiction" },
              { label: "Opportunity", sub: "A way to do it — weak controls, poor segregation of duties, management override, unmonitored systems" },
              { label: "Rationalisation / attitude", sub: "A way to justify it — 'I'm underpaid', 'I'll pay it back', 'the company won't miss it'" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Which side can management actually control?", md: "Pressure and rationalisation live largely in an individual's mind and circumstances. **Opportunity** is the side management most directly controls — through segregation of duties, authorisation limits, reconciliations and monitoring. That is why strengthening controls is the front-line anti-fraud response." },
        { kind: "text", md: "Even a well-run organisation will suffer disruptive events — a fire, a cyber-attack, a supplier collapse. **Business continuity management** is the planning that lets it keep critical operations running and recover quickly: identifying critical processes, setting recovery time objectives, and maintaining a tested **business continuity plan** and disaster-recovery arrangements. A plan that has never been tested is a false comfort." },
        { kind: "callout", tone: "rule", title: "The ethics of risk", md: "Risk decisions are also **ethical** decisions. A firm may transfer or accept a risk that is financially rational yet unfairly dumps harm onto customers, employees, communities or the environment. Good governance weighs risk against the interests of **all stakeholders**, not just the shareholders' balance sheet — treating a safety or environmental risk as merely a number to be priced is an ethical failure, however clever the calculation." },
      ],
      check: {
        q: "According to the fraud triangle, which side of the triangle is MOST directly within management's power to reduce through internal controls?",
        options: [
          "Pressure — by removing all financial stress from employees' lives",
          "Rationalisation — by changing how individuals justify their actions",
          "Opportunity — through segregation of duties, authorisation limits and monitoring",
          "None — the fraud triangle cannot be influenced by controls",
        ],
        correct: 2,
        explain: "Pressure and rationalisation stem largely from an individual's personal circumstances and mindset, which management cannot fully control. Opportunity — the ability to commit and conceal fraud — is created by weak controls, so tightening segregation of duties, authorisation and monitoring is the side management can most directly attack.",
      },
    },
  ],
  examTraps: [
    { trap: "Writing \"reduce\" as the response to every risk.", fix: "Match the T to the map: Transfer for rare-but-severe, Avoid for likely-and-severe, Reduce for likely-but-minor, Accept for minor-and-rare. Justify against BOTH likelihood and impact." },
    { trap: "Treating risk appetite and risk capacity as the same thing.", fix: "Appetite is how much risk you are WILLING to take (a choice); capacity is the maximum you could ABSORB before failing (a limit). Appetite should sit below capacity." },
    { trap: "Reducing internal control to 'control activities' only.", fix: "COSO has FIVE components — control environment, risk assessment, control activities, information & communication, and monitoring. The environment (tone at the top) is the foundation." },
    { trap: "Confusing the risk committee with the audit committee.", fix: "Risk committee = forward-looking, sets appetite and oversees ERM. Audit committee = assurance-focused, oversees financial reporting, controls and audit." },
    { trap: "Saying internal control gives absolute assurance and prevents all fraud.", fix: "Control gives only REASONABLE assurance — human error, collusion and management override can defeat it. It reduces, not eliminates, risk and fraud." },
  ],
  keyTerms: [
    { term: "Risk appetite", def: "The amount and type of risk an organisation is willing to take to pursue its objectives — a deliberate choice set by the board." },
    { term: "Risk capacity", def: "The maximum level of risk an organisation could absorb before its survival is threatened — a limit set by its resources." },
    { term: "Residual (net) risk", def: "The risk that remains after controls have been applied; it should sit within appetite. Contrasts with gross (inherent) risk, which is before controls." },
    { term: "The 4Ts (TARA)", def: "The four risk responses — Transfer, Avoid, Reduce, Accept — chosen according to a risk's likelihood and impact." },
    { term: "Three lines of defence", def: "Operational management (owns risk), risk & compliance functions (oversee), and internal audit (independent assurance) — kept separate from one another." },
    { term: "Fraud triangle", def: "The three conditions usually present for fraud — pressure/motivation, opportunity, and rationalisation; removing any one lowers fraud risk." },
  ],
  summary: [
    "Assess every risk on likelihood x impact and plot it on the risk map; appetite is what you'll take, capacity is what you can survive, and controls move gross risk down to a residual within appetite.",
    "The 4Ts respond to position on the map: Transfer rare-but-severe, Avoid likely-and-severe, Reduce likely-but-minor, Accept minor-and-rare.",
    "Enterprise risk management (ERM) manages risk holistically and top-down, exposing interactions a silo approach misses.",
    "Internal control gives only reasonable assurance; COSO frames it in five components, with the control environment as the foundation, and the three lines of defence keep ownership, oversight and independent assurance separate.",
    "The risk committee sets appetite and strategy while the audit committee oversees control and reporting; fraud needs pressure, opportunity and rationalisation, and risk decisions carry ethical weight for all stakeholders.",
  ],
}
