import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBL · Area B — Governance and sustainability.
 *
 * The largest area in the paper: six sub-topics, and the one the legacy shim
 * compressed hardest. `subset(SBL_A, "B", ...)` served all of B1 to B6 from five
 * sections of one legacy chapter — agency, codes, boards, committees and
 * reporting-culture — so public sector governance (B6) and the whole of
 * integrated reporting and sustainability (B4) were taught in passing or not at
 * all. Kaplan gives the board 46 pages and reporting to stakeholders 48; the
 * shim gave the two of them about 700 words between them.
 *
 *   SBL-05  Agency, ownership and control                        (B1)
 *   SBL-06  Stakeholders, power and social responsibility        (B2)
 *   SBL-07  Governance scope and approaches                      (B3)
 *   SBL-08  The board of directors                               (B5a-e)
 *   SBL-09  Board committees and directors' remuneration         (B5f-h)
 *   SBL-10  Reporting to stakeholders and sustainability         (B4)
 *   SBL-11  Public sector governance                             (B6)
 *
 * Written against the official ACCA SBL syllabus and study guide for September
 * 2026 to June 2027. Not derived from any approved-provider text.
 */

const SBL_TREE_05: StudyChapter = {
  paper: "SBL",
  id: "SBL-05",
  number: 5,
  area: "B",
  syllabusRefs: ["B1(a)", "B1(b)"],
  title: "Agency, ownership and control",
  minutes: 16,
  intro:
    "Governance exists because the people who own an organisation are usually not the people running it. Every governance mechanism in this area is an answer to that one problem, so it is worth understanding properly before meeting the mechanisms.",
  outcomes: [
    "Explain the principal–agent relationship and why it creates a governance problem",
    "Analyse the consequences of separating ownership from control",
    "Identify the specific costs an owner incurs to constrain an agent",
    "Explain how governance mechanisms reduce, but never remove, the underlying conflict",
  ],
  sections: [
    {
      id: "the-relationship",
      heading: "Principal, agent, and the gap between them",
      blocks: [
        {
          kind: "definition",
          term: "Agency relationship",
          md: "An arrangement in which one party (the agent) acts on behalf of another (the principal), and in doing so exercises judgement that affects the principal's interests.",
        },
        {
          kind: "text",
          md: "In a company the shareholders are principals and the directors are agents. The relationship is entirely normal and unavoidable: shareholders neither want nor are able to run the business day to day. The difficulty is not that agency exists but that three things are true at once — the agent's interests differ from the principal's, the agent knows more than the principal, and the principal cannot observe most of what the agent does.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "radial",
            title: "Why the relationship strains",
            data: {
              centre: "Agency problem",
              nodes: [
                { label: "Different interests", sub: "Security, status, pay, empire versus return on capital" },
                { label: "Information asymmetry", sub: "The agent knows the business; the principal reads a report" },
                { label: "Unobservable effort", sub: "Outcome is visible, the diligence behind it is not" },
                { label: "Different risk appetite", sub: "A diversified owner can bear risk a director's career cannot" },
                { label: "Different horizons", sub: "Tenure and bonus periods are shorter than the investment" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "The horizon difference deserves particular attention because it is the one SBL uses most. A director whose bonus depends on this year's operating profit has a rational reason to defer maintenance, cut development spend, or push a sale into the current period. None of those decisions requires dishonesty; each is simply the sensible response to the incentive the owners themselves designed.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The conflict is structural, not moral",
          md: "Answers improve sharply when you stop treating agency problems as evidence of bad people. Honest, competent directors facing a badly designed incentive will still produce the wrong behaviour — which is why the recommendation is usually to change the mechanism, not to appeal to integrity.",
        },
      ],
      check: {
        q: "A divisional director defers essential plant maintenance to protect the current-year margin on which their bonus depends. What best describes this?",
        options: [
          "Fraud, because the accounts are deliberately distorted",
          "An agency problem — the incentive rewards a short horizon at the owners' longer-term cost",
          "Sound commercial judgement, since margin improved",
          "A control weakness in the maintenance department",
        ],
        correct: 1,
        explain:
          "Nothing here is misreported and no rule is broken, which is exactly why option 0 is wrong and why the situation is dangerous — the incentive produced the outcome legitimately. The fix is the reward design, not an investigation.",
      },
    },
    {
      id: "separation",
      heading: "Consequences of separating ownership from control",
      blocks: [
        {
          kind: "text",
          md: "Separation brings real benefits: capital can be raised from many owners who lack managerial skill, management can be selected for competence rather than shareholding, and ownership can change hands without disturbing operations. B1(b) asks you to analyse what it costs.",
        },
        {
          kind: "table",
          caption: "What separation produces",
          head: ["Consequence", "Mechanism", "Case signal"],
          rows: [
            ["Agency costs", "Owners must monitor, incentivise and bond the agent", "Audit fees, NED costs, bonus schemes, covenants"],
            ["Residual loss", "Even after all that, some divergence remains", "Value-destroying acquisition that survived board challenge"],
            ["Short-termism", "Reward and tenure horizons are shorter than the assets", "Deferred investment; earnings management near period end"],
            ["Empire building", "Size brings status and pay; not all growth adds value", "Acquisitions with no articulated synergy"],
            ["Risk mismatch", "Diversified owners want risks a career cannot bear", "Excessive caution, or excessive gearing for personal upside"],
            ["Weak accountability", "Dispersed owners each free-ride on monitoring", "Low voting turnout; resolutions passed unexamined"],
          ],
        },
        {
          kind: "text",
          md: "**Agency costs** are worth splitting three ways, because each maps to a different governance recommendation. *Monitoring* costs are what the principal spends to observe the agent — audit, non-executive time, reporting requirements. *Bonding* costs are what the agent spends to reassure the principal — submitting to covenants, holding shares, accepting restrictions. *Residual loss* is the value still lost after both, and it is never zero: perfect alignment would cost more than it saves.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Never claim a mechanism removes the conflict",
          md: "Governance narrows the gap. A strong answer says what a proposed mechanism reduces, what it costs, and what it leaves exposed — that balance is what evaluation marks are for. Claiming a remuneration committee or an independent chair 'solves' agency is the single easiest way to lose them.",
        },
        {
          kind: "example",
          title: "Reading agency in an exhibit",
          scenario:
            "A founder-chief executive holds 4% of the shares and has proposed acquiring a loss-making competitor. The board papers describe strategic fit but contain no valuation, no synergy quantification and no integration plan. The CEO's bonus is based on group revenue.",
          steps: [
            { label: "Name the divergence", detail: "Revenue-based reward pays for size; shareholders are paid by return on capital. An acquisition can serve the first while destroying the second." },
            { label: "Note the asymmetry", detail: "The board is being asked to approve without the valuation and synergy evidence needed to challenge it." },
            { label: "Identify the failed mechanism", detail: "Monitoring has broken down — the papers do not enable challenge, so NED scrutiny cannot function however capable the NEDs are." },
            { label: "Recommend on the mechanism", detail: "Require valuation, quantified synergies and an integration plan before approval; rebase the incentive on returns rather than revenue; consider an independent review of the case." },
          ],
          result:
            "The recommendation attacks the incentive and the information, which are the two things producing the behaviour, rather than questioning the CEO's motives.",
        },
      ],
      check: {
        q: "Which item is a BONDING cost rather than a monitoring cost?",
        options: [
          "The external audit fee paid by the company",
          "Fees paid to non-executive directors for board oversight",
          "A director accepting a contractual restriction on selling their shareholding",
          "The cost of preparing quarterly reports for shareholders",
        ],
        correct: 2,
        explain:
          "Bonding is what the AGENT gives up to reassure the principal — here, accepting a restriction on their own freedom. Audit, NED fees and reporting are all spent by the principal to observe the agent, which makes them monitoring costs.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating agency problems as evidence of dishonest directors.", fix: "The conflict is structural; honest people follow the incentives they are given. Recommend changing the mechanism." },
    { trap: "Claiming a governance mechanism eliminates the agency conflict.", fix: "Say what it reduces, what it costs and what remains exposed — residual loss is never zero." },
    { trap: "Listing agency costs without connecting them to the case.", fix: "Point at the specific audit, NED, covenant or bonus arrangement in the exhibit and say which cost it is." },
  ],
  keyTerms: [
    { term: "Principal", def: "The party whose interests an agent is engaged to serve — in a company, the shareholders." },
    { term: "Information asymmetry", def: "The agent's superior knowledge of the business, which limits the principal's ability to evaluate their decisions." },
    { term: "Monitoring costs", def: "Costs the principal incurs to observe and verify the agent's behaviour, such as audit and non-executive oversight." },
    { term: "Bonding costs", def: "Costs the agent accepts to reassure the principal, such as covenants or restrictions on share dealing." },
    { term: "Residual loss", def: "The value still lost to divergent interests after monitoring and bonding — never nil, because perfect alignment costs more than it saves." },
  ],
  summary: [
    "Governance answers one problem: owners are not managers, and cannot observe them.",
    "Divergent interests, information asymmetry and unobservable effort make the conflict structural.",
    "Separation costs agency costs — monitoring, bonding — plus an irreducible residual loss.",
    "Short horizons and empire building are rational responses to badly designed reward.",
    "Mechanisms narrow the gap; never claim one closes it.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does the agency relationship create a governance problem?", a: "Because interests diverge, the agent knows more than the principal, and most of what the agent does cannot be observed." },
    { q: "What are the three components of agency cost?", a: "Monitoring by the principal, bonding by the agent, and the residual loss remaining after both." },
    { q: "Why is residual loss never zero?", a: "Because achieving perfect alignment would cost more than the divergence it removes." },
    { q: "What is the usual recommendation when an incentive produces value-destroying behaviour?", a: "Change the mechanism — the measure, the horizon or the information — rather than appeal to the individual's integrity." },
  ],
  furtherStudy: [
    "SBL-06 covers stakeholders beyond shareholders",
    "SBL-07 covers the governance approaches built on this problem",
    "SBL-09 covers remuneration design, the mechanism most often at fault",
    "SBL-11 examines agency where there are no shareholders at all",
  ],
}

const SBL_TREE_06: StudyChapter = {
  paper: "SBL",
  id: "SBL-06",
  number: 6,
  area: "B",
  syllabusRefs: ["B2(a)", "B2(b)", "B2(c)"],
  title: "Stakeholders, power and social responsibility",
  minutes: 17,
  intro:
    "Mendelow's grid is the most used and most misused model in SBL. Used properly it tells a board who can stop a strategy and who must merely be informed; used lazily it becomes a four-box diagram with names dropped in and no advice attached.",
  outcomes: [
    "Assess stakeholder power and interest using the Mendelow framework, and apply it to a strategy",
    "Evaluate stakeholders' claims and interests, and advise where they conflict",
    "Explain social responsibility in the context of governance and sustainability",
    "Recognise that power and interest shift, and that a strategy changes the map",
  ],
  sections: [
    {
      id: "mapping",
      heading: "Mapping power and interest",
      blocks: [
        {
          kind: "text",
          md: "A **stakeholder** is any party affected by, or able to affect, the organisation's activities. The list is long, so the point of mapping is to work out where attention and negotiation should go. Mendelow's framework does that on two axes: how much **power** a stakeholder has to influence outcomes, and how much **interest** they take in the matter at hand.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "The four positions, and what each demands",
            data: {
              leftTitle: "Low power",
              rightTitle: "High power",
              rows: [
                { aspect: "High interest", left: "Keep informed — they will lobby and can build coalitions", right: "KEY PLAYERS — engage before deciding; they can stop this" },
                { aspect: "Low interest", left: "Minimal effort — monitor for change", right: "Keep satisfied — do not activate their interest carelessly" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Power and interest are per-issue, not permanent",
          md: "The same stakeholder occupies different boxes on different decisions. A lender is low-interest while covenants are comfortable and becomes a key player the moment headroom tightens. Map stakeholders **against the specific decision in the task**, and say what would move someone between boxes — that movement is usually where the marks are.",
        },
        {
          kind: "text",
          md: "The 'keep satisfied' box is the one candidates handle worst, and it is where the commercial judgement sits. These stakeholders could stop you but currently are not paying attention. The advice is not to ignore them: it is to avoid taking action that activates their interest, and to know what would. A regulator with no current concern, a large customer with an untested contract, a founder shareholder who has not attended a meeting in years — each becomes a key player instantly under the right trigger.",
        },
        {
          kind: "table",
          caption: "Sources of stakeholder power",
          head: ["Source", "How it bites"],
          rows: [
            ["Legal or contractual right", "Consent, veto, covenant, licence or statutory approval"],
            ["Control of a critical resource", "Finance, a scarce skill, a sole-source input"],
            ["Regulatory authority", "Sanction, licence withdrawal, mandated change"],
            ["Voting or ownership rights", "Removing directors; blocking resolutions"],
            ["Ability to withdraw", "Customers leaving; key staff resigning; supply halting"],
            ["Influence over reputation", "Media, campaign groups, professional bodies, employees online"],
          ],
        },
      ],
      check: {
        q: "A bank has provided a facility with covenants the company currently meets comfortably, and has taken no active interest for two years. A proposed acquisition would raise gearing close to the covenant limit. How should the bank be treated?",
        options: [
          "Low interest, low power — no engagement needed",
          "Currently keep satisfied, but the acquisition would move it to key player, so engage before committing",
          "High interest, low power — inform after the decision",
          "Key player throughout, as lenders always hold the most power",
        ],
        correct: 1,
        explain:
          "This is precisely the movement the framework exists to reveal: high power that is dormant until a specific decision activates it. Waiting until the covenant is breached surrenders the negotiation. Option 3 is wrong because permanent classification defeats the model — power matters only in relation to the decision in front of you.",
      },
    },
    {
      id: "claims-and-conflicts",
      heading: "Conflicting claims, and how to advise on them",
      blocks: [
        {
          kind: "text",
          md: "B2(b) asks you to evaluate stakeholders' roles, claims and interests and how they may conflict and be resolved. Note the word *conflict*: SBL tasks are built so that a decision cannot satisfy everyone, and pretending otherwise is the failure mode. The examiner wants a recommendation that names the losers and addresses them.",
        },
        {
          kind: "table",
          caption: "Typical claims, and where they collide",
          head: ["Stakeholder", "Claim", "Collides with"],
          rows: [
            ["Shareholders", "Return on capital, growth in value", "Employee cost, environmental investment, price restraint"],
            ["Employees", "Security, pay, conditions, development", "Cost reduction, automation, relocation"],
            ["Customers", "Quality, price, continuity, data protection", "Margin improvement, cost cutting"],
            ["Suppliers", "Fair terms, prompt payment, continuity", "Working-capital targets, sourcing changes"],
            ["Lenders", "Ability to repay, covenant compliance", "Gearing for growth, distribution policy"],
            ["Community and environment", "Reduced harm, local employment", "Lowest-cost operations, site closure"],
            ["Regulators", "Compliance, transparency, market conduct", "Speed and commercial confidentiality"],
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "Resolving a stakeholder conflict in a task",
          items: [
            "**State the conflict precisely** — whose claim against whose, over what decision",
            "**Weigh by power and legitimacy** — who can stop this, and whose claim has the stronger moral or legal basis",
            "**Recommend a decision** — do not describe the tension and stop; the board asked for advice",
            "**Name what the losers lose**, and mitigate — phasing, consultation, compensation, redeployment, disclosure",
            "**Say how it will be communicated**, and to whom first — sequencing is part of the recommendation",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Power is not the same as legitimacy",
          md: "A powerful stakeholder may have a weak claim, and a powerless one may have an overwhelming claim — an affected community, or a customer whose data has been exposed. Deciding by power alone is how organisations arrive at defensible-but-indefensible positions. Say when a weak-power claim should still prevail, and why.",
        },
      ],
      check: {
        q: "A closure decision will save the company significantly and will remove the main employer from a small town. The community has little formal power. What is the strongest advisory position?",
        options: [
          "Proceed without consultation, since the community cannot prevent the closure",
          "Abandon the closure, because community harm outweighs all financial considerations",
          "Recommend the closure if it is strategically necessary, while addressing the community claim through notice, consultation, phased exit and support — and disclosing the reasoning",
          "Delay the decision until the community's power increases",
        ],
        correct: 2,
        explain:
          "Low power does not mean a low claim, but nor does a legitimate claim automatically defeat a necessary decision. The answer that earns marks makes the commercial call and then takes the affected claim seriously — which is also the position that protects licence to operate.",
      },
    },
    {
      id: "social-responsibility",
      heading: "Social responsibility, governance and sustainability",
      blocks: [
        {
          kind: "text",
          md: "Social responsibility is the idea that an organisation's obligations extend beyond its owners and beyond the strict requirements of law — that because it draws on people, infrastructure and natural resources it owes something to the setting that sustains it. B2(c) frames this within governance and sustainability *for the public good*, which is the link that matters: responsibility is not charity bolted onto the side, it is a factor the board weighs when deciding.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "pyramid",
            title: "Layers of organisational obligation",
            data: {
              levels: [
                { label: "Discretionary", sub: "Voluntary contribution beyond expectation" },
                { label: "Ethical", sub: "What is right, beyond what is required" },
                { label: "Legal", sub: "Compliance with law and regulation" },
                { label: "Economic", sub: "Remain viable — no obligation survives insolvency" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Two positions are worth being able to argue, because SBL sometimes asks you to evaluate rather than assert. The **narrow** view holds that a company's responsibility is to generate returns lawfully, and that directors spending owners' money on wider causes are making political choices with other people's capital. The **broad** view holds that an organisation's licence to operate depends on social consent, that costs pushed onto communities and the environment are real costs merely unrecorded, and that ignoring them defers rather than avoids them.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The reconciling argument, which is the one to use",
          md: "Over any horizon a board actually plans for, the two views converge: unmanaged social and environmental harm returns as regulation, litigation, remediation cost, lost customers and difficulty recruiting. So responsibility can be argued on ordinary commercial grounds without pretending shareholders are irrelevant — and that is the argument a sceptical board will accept.",
        },
        {
          kind: "text",
          md: "**Sustainability** in this context means operating so that the organisation's demands on resources and communities can continue indefinitely. It has a governance dimension the exam tests directly: someone on the board must own it, it needs measurement and target-setting like any other objective, and it must be reported — otherwise it remains an aspiration in the annual report while the operating decisions carry on unchanged. SBL-10 develops the reporting side.",
        },
      ],
      check: {
        q: "Which argument is most likely to persuade a sceptical, shareholder-focused board to fund emissions reduction?",
        options: [
          "It is the morally right thing to do regardless of financial consequence",
          "Competitors are doing it, so the company should follow",
          "Unmanaged emissions create foreseeable regulatory, remediation and customer costs, so acting now is the lower-cost path over the investment horizon",
          "Emissions reporting is legally required in every jurisdiction",
        ],
        correct: 2,
        explain:
          "The reconciling argument works because it does not require the board to abandon its duty to owners — it reframes the harm as a deferred cost. Option 0 may be true but gives a shareholder-focused board nothing to weigh; option 3 overstates the legal position.",
      },
    },
  ],
  examTraps: [
    { trap: "Drawing the Mendelow grid, placing names in boxes, and offering no advice.", fix: "Each position implies an action — engage, keep satisfied, inform, monitor. Say what the board does about each." },
    { trap: "Treating power and interest as permanent attributes of a stakeholder.", fix: "Map against the specific decision, and say what would move someone into the key-player box." },
    { trap: "Describing a stakeholder conflict without resolving it.", fix: "Recommend a decision, name who loses, and mitigate — the board asked for advice, not a summary of the tension." },
    { trap: "Deciding purely on power and ignoring legitimacy.", fix: "Say where a low-power claim should still prevail, and why licence to operate depends on it." },
  ],
  keyTerms: [
    { term: "Stakeholder", def: "Any party affected by the organisation's activities or able to affect them." },
    { term: "Mendelow framework", def: "A mapping of stakeholders by power and interest that indicates how each should be managed on a given decision." },
    { term: "Key player", def: "A high-power, high-interest stakeholder who must be engaged before a decision is taken." },
    { term: "Legitimacy of a claim", def: "The moral or legal strength of a stakeholder's claim, which is independent of their power to enforce it." },
    { term: "Sustainability", def: "Operating so that demands on resources and communities can be sustained indefinitely, with board ownership, measurement and reporting." },
  ],
  summary: [
    "Map stakeholders by power and interest against the specific decision, not in general.",
    "Each position implies an action; 'keep satisfied' means know what would activate them.",
    "SBL tasks are built so someone loses — name them, decide, and mitigate.",
    "Power and legitimacy are different; a weak-power claim can still be the stronger one.",
    "Social responsibility and sustainability are board decisions needing owners, measures and reporting.",
  ],
  knowledgeDiagnostic: [
    { q: "What do the two axes of the Mendelow framework measure?", a: "The stakeholder's power to influence the outcome, and their level of interest in the matter being decided." },
    { q: "How should a high-power, low-interest stakeholder be handled?", a: "Keep satisfied — avoid action that activates their interest, and know what would move them to key player." },
    { q: "What must a stakeholder-conflict answer contain beyond the conflict itself?", a: "A recommended decision, who loses by it, mitigation for them, and how and in what order it is communicated." },
    { q: "What is the reconciling argument for social responsibility?", a: "Unmanaged harm returns as regulation, litigation, remediation and lost custom, so acting is usually the lower-cost path over the planning horizon." },
  ],
  furtherStudy: [
    "SBL-05 explains the agency problem underlying stakeholder governance",
    "SBL-10 covers reporting to stakeholders, integrated reporting and sustainability accounting",
    "SBL-13 uses stakeholder analysis within macro-environmental assessment",
    "SBL-11 applies stakeholder thinking where there are no shareholders",
  ],
}

const SBL_TREE_07: StudyChapter = {
  paper: "SBL",
  id: "SBL-07",
  number: 7,
  area: "B",
  syllabusRefs: ["B3(a)", "B3(b)", "B3(c)", "B3(d)"],
  title: "Governance scope and approaches",
  minutes: 17,
  intro:
    "Rules or principles; family firm or listed company; institutional investors engaged or absent. The governance arrangement that suits an organisation depends on who owns it and who is watching — and SBL expects you to advise, not to recite one model.",
  outcomes: [
    "Analyse how far institutional shareholders actually shape an organisation's governance, and where their oversight stops",
    "Compare rules-based and principles-based approaches and advise when each is appropriate",
    "Explain how different ownership models produce different governance regimes",
    "Apply internationally recognised governance principles, such as those of the ICGN, to an organisation",
  ],
  sections: [
    {
      id: "institutional-investors",
      heading: "Institutional investors",
      blocks: [
        {
          kind: "text",
          md: "Institutional investors — pension funds, insurers, asset managers, sovereign funds — matter to governance because they hold blocks large enough to make monitoring worth their while. A retail shareholder with a hundred shares rationally free-rides: the cost of scrutiny exceeds their share of the benefit. An institution holding five per cent cannot afford to ignore the company, and cannot easily sell without moving the price.",
        },
        {
          kind: "table",
          caption: "How institutions exercise influence",
          head: ["Route", "What it looks like", "Limits"],
          rows: [
            ["Private engagement", "Meetings with the chair or NEDs before matters escalate", "Invisible to other owners; depends on access"],
            ["Voting", "Supporting or opposing resolutions, including on pay", "Often advisory; outcome may not bind"],
            ["Public statements", "Declaring an intention to vote against", "Reputational pressure; can harden positions"],
            ["Requisitioning", "Calling a meeting or proposing a resolution", "High threshold; slow; adversarial"],
            ["Coalition", "Acting with other institutions", "Regulatory constraints on acting in concert"],
            ["Exit", "Selling the holding", "Abandons influence; may crystallise loss"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Institutional oversight has real limits — say so",
          md: "Many institutions are themselves agents, holding on behalf of savers, and face the same short-horizon incentives they criticise. Index-tracking holders may have little appetite for engagement. So do not present institutional investors as a reliable governance safeguard; assess whether the ones in the case are actually engaged, and what the exhibit shows about it.",
        },
      ],
      check: {
        q: "Why do institutional investors monitor more actively than dispersed retail shareholders?",
        options: [
          "They have superior legal rights attached to their shares",
          "Their holdings are large enough that the benefit of scrutiny exceeds its cost, and exit is not costless",
          "They are legally required to vote on every resolution",
          "They are represented on the board by right",
        ],
        correct: 1,
        explain:
          "This is the free-rider point: monitoring costs are fixed while benefits scale with holding, so only a large holder finds scrutiny worthwhile — and a large holder cannot exit quietly. Their rights are usually identical per share, which rules out option 0.",
      },
    },
    {
      id: "rules-vs-principles",
      heading: "Rules-based and principles-based approaches",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Two ways to require good governance",
            data: {
              leftTitle: "Rules-based",
              rightTitle: "Principles-based",
              rows: [
                { aspect: "Form", left: "Legally binding requirements", right: "Principles with 'comply or explain' reporting" },
                { aspect: "Compliance test", left: "Did you meet the rule?", right: "Did you achieve the outcome, or explain why not?" },
                { aspect: "Enforcement", left: "Legal sanction", right: "Shareholder and market judgement" },
                { aspect: "Strength", left: "Certain, comparable, enforceable", right: "Flexible; proportionate to size and circumstance" },
                { aspect: "Weakness", left: "Box-ticking; costly for small entities; gaps exploited", right: "Depends on informed, willing shareholders; explanations may be boilerplate" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "The key insight is that each fails in a characteristic way, and naming the failure mode is what earns marks. A rules regime can be complied with while its purpose is defeated — the letter is satisfied and the substance is not. A principles regime can be complied with in form by publishing an explanation nobody reads or challenges, which is only as strong as the shareholders receiving it.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "'Comply or explain' means the explanation is the compliance",
          md: "Departing from a principle is legitimate — a smaller company may reasonably combine roles, or run without a separate committee. What is *not* legitimate is departing silently, or explaining in terms that could apply to any company. Assess the quality of the explanation, not merely its presence.",
        },
        {
          kind: "table",
          caption: "Advising which approach suits",
          head: ["Circumstance", "Leaning", "Why"],
          rows: [
            ["Large listed company, dispersed owners", "Principles, robustly applied", "Sophisticated owners can evaluate explanations"],
            ["Small or owner-managed entity", "Principles, proportionate", "Full rule compliance costs more than the benefit"],
            ["After serious market failure or fraud", "Rules for the specific failure", "Certainty and sanction are needed to restore confidence"],
            ["Weak investor base or poor enforcement", "Rules", "'Explain' only works where someone reads and challenges"],
            ["Diverse group of very different entities", "Principles", "One rule set cannot fit every structure sensibly"],
          ],
        },
      ],
      check: {
        q: "A company departs from a governance principle and states only that 'the board considers its current arrangements appropriate'. How should this be assessed?",
        options: [
          "Acceptable — under comply or explain, any explanation satisfies the requirement",
          "A breach of law requiring immediate correction",
          "Formally compliant but substantively inadequate: the explanation gives shareholders nothing to evaluate, defeating the mechanism",
          "Irrelevant, as governance codes are voluntary",
        ],
        correct: 2,
        explain:
          "The explanation is the whole safeguard — it is what lets owners judge whether the departure is reasonable. Boilerplate that could be written by any company transmits no information, so the mechanism has been satisfied in form only. It is not usually a breach of law, which is why option 1 overstates it.",
      },
    },
    {
      id: "ownership-models",
      heading: "Ownership models, and the ICGN principles",
      blocks: [
        {
          kind: "text",
          md: "B3(c) asks how different ownership models produce different governance regimes. The governance problem does not disappear when ownership concentrates — it changes shape. In a widely held joint-stock company the risk is that management escapes owner control. In a family or closely held firm the risk inverts: the dominant owner controls management completely, and the exposed party becomes the minority shareholder.",
        },
        {
          kind: "table",
          caption: "Ownership model and its characteristic risk",
          head: ["Model", "Governance strength", "Characteristic risk"],
          rows: [
            ["Widely held joint-stock company", "Market scrutiny; liquid shares; disclosure", "Dispersed owners free-ride; management entrenches"],
            ["Family or founder-controlled", "Long horizon; committed capital; clear accountability", "Minority interests overridden; succession by birth; weak challenge"],
            ["Concentrated block holder", "Genuine monitoring incentive", "Related-party dealing; benefits not shared with minorities"],
            ["State-owned", "Public accountability; policy alignment", "Political interference; unclear or conflicting objectives"],
            ["Partnership or mutual", "Owner-managers aligned; member focus", "Capital constrained; weak external challenge"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The family-firm answer that earns marks",
          md: "Family control brings genuine advantages SBL expects you to acknowledge — patient capital and a horizon a listed board cannot match. The recommendation is therefore not 'become a listed company'. It is to add the specific safeguards the model lacks: genuinely independent directors, a related-party approval process the family cannot decide alone, appointment on merit including from outside the family, and protections for minority shareholders.",
        },
        {
          kind: "text",
          md: "For B3(d), the **International Corporate Governance Network** publishes global governance principles used by investors across markets, which is why the syllabus names them: they give you a benchmark that does not depend on any one country's code. Their thrust is that the board is accountable to shareholders while having regard to wider stakeholders and long-term value; that it should be competent, sufficiently independent and diverse; that remuneration should align with sustained performance; that shareholder rights — including voting and equitable treatment of minorities — must be protected; and that disclosure should be reliable and cover material non-financial matters including sustainability.",
        },
        {
          kind: "example",
          title: "Applying the principles to an unlisted family group",
          scenario:
            "A third-generation family group is taking external investment. All five directors are family members, the chair is also chief executive, property is leased from a family trust on undisclosed terms, and there is no audit committee.",
          steps: [
            { label: "Board composition", detail: "No independent voice exists, so no mechanism can challenge the family. Appoint independent NEDs with real authority." },
            { label: "Split the roles", detail: "Combined chair and chief executive concentrates power in one family member; separate them, or appoint a senior independent director as a minimum." },
            { label: "Related parties", detail: "Undisclosed trust leases are the classic minority-expropriation route; require disclosure and independent approval." },
            { label: "Assurance", detail: "Establish an audit committee with independent membership, given the incoming investor will rely on reported information." },
            { label: "Minority protection", detail: "Agree reserved matters, information rights and exit provisions before the investment completes." },
          ],
          result:
            "Each recommendation names the exposure it closes for the incoming minority investor, rather than asserting that listed-company practice should be adopted wholesale.",
        },
      ],
      check: {
        q: "In a family-controlled company, which party is most exposed by weak governance?",
        options: [
          "The controlling family, who bear all the business risk",
          "Minority shareholders, who cannot influence decisions and may be disadvantaged by related-party dealing",
          "Executive management, who are family appointees",
          "Nobody, since concentrated ownership resolves the agency problem",
        ],
        correct: 1,
        explain:
          "Concentration does not remove the agency problem, it moves it — from owners-versus-managers to majority-versus-minority. Option 3 is the trap: it is true that the classic conflict weakens, which conceals the new one that replaces it.",
      },
    },
  ],
  examTraps: [
    { trap: "Presenting institutional investors as a dependable safeguard.", fix: "Assess whether the institutions in the case actually engage; many are agents with short horizons of their own." },
    { trap: "Comparing rules and principles in the abstract.", fix: "Recommend for this organisation's size, ownership and investor base, and name each approach's failure mode." },
    { trap: "Accepting any explanation as satisfying 'comply or explain'.", fix: "The explanation is the compliance — assess whether it gives owners something specific to evaluate." },
    { trap: "Advising a family firm to adopt listed-company governance wholesale.", fix: "Keep the model's advantages; add the specific safeguards it lacks, especially for minorities and related parties." },
  ],
  keyTerms: [
    { term: "Institutional investor", def: "An organisation investing on others' behalf — pension fund, insurer, asset manager — holding stakes large enough to make monitoring worthwhile." },
    { term: "Rules-based governance", def: "Legally binding governance requirements enforced by sanction." },
    { term: "Comply or explain", def: "A principles-based mechanism where departure is permitted provided it is disclosed and justified to shareholders." },
    { term: "ICGN principles", def: "Global governance principles published by the International Corporate Governance Network, used by investors as a cross-market benchmark." },
    { term: "Minority expropriation", def: "A controlling owner extracting value at minority shareholders' expense, often through undisclosed related-party terms." },
  ],
  summary: [
    "Institutions monitor because scale makes scrutiny worthwhile and exit costly — but many are agents themselves.",
    "Rules give certainty and invite box-ticking; principles give flexibility and depend on engaged owners.",
    "Under comply or explain the explanation IS the compliance; boilerplate defeats it.",
    "Concentrated ownership moves the agency problem to majority against minority.",
    "Advise proportionately: keep a model's advantages, add the safeguards it lacks.",
  ],
  knowledgeDiagnostic: [
    { q: "Why do dispersed retail shareholders under-monitor?", a: "Monitoring costs are fixed while the benefit scales with holding, so a small holder rationally free-rides on others." },
    { q: "How does each governance approach characteristically fail?", a: "Rules are complied with while their purpose is defeated; principles are satisfied by an explanation nobody reads or challenges." },
    { q: "Who is most exposed in a family-controlled firm, and to what?", a: "Minority shareholders — particularly to related-party dealing on undisclosed terms and appointment by family rather than merit." },
    { q: "What do the ICGN principles broadly require?", a: "Board accountability to shareholders with regard to wider stakeholders and long-term value; competence, independence and diversity; pay aligned to sustained performance; protected shareholder rights; and reliable disclosure including material non-financial matters." },
  ],
  furtherStudy: [
    "SBL-05 sets out the agency problem these approaches address",
    "SBL-08 and SBL-09 cover the board and remuneration in detail",
    "SBL-10 covers the disclosure the ICGN principles require",
    "SBL-11 covers governance where the state is the owner",
  ],
}

const SBL_TREE_08: StudyChapter = {
  paper: "SBL",
  id: "SBL-08",
  number: 8,
  area: "B",
  syllabusRefs: ["B5(a)", "B5(b)", "B5(c)", "B5(d)", "B5(e)"],
  title: "The board of directors",
  minutes: 19,
  intro:
    "The board is where SBL puts most of its governance marks, because it is where the paper's evidence lives: an exhibit describing who sits on a board, who chairs it, and how it behaves is an invitation to find defects.",
  outcomes: [
    "Assess directors' duties and the board's functions, including responsibility for tone and organisational impact",
    "Evaluate unitary and two-tier board structures",
    "Assess the purpose, responsibilities and performance of non-executive directors",
    "Assess induction, appraisal and continuing development of directors",
    "Evaluate board diversity, and explain what it is for",
  ],
  sections: [
    {
      id: "duties-and-functions",
      heading: "What a board is for",
      blocks: [
        {
          kind: "text",
          md: "A board has two functions that pull against each other, and most board failures are a failure to hold both. It must **direct** — set strategy, approve major commitments, appoint and if necessary remove the chief executive — and it must **control**, by scrutinising the performance of the executives who carry the strategy out. A board that only directs becomes a cheerleader; a board that only controls never leads.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Core board responsibilities",
          items: [
            "Set and approve strategy, and the risk appetite within which it is pursued",
            "Appoint, appraise, remunerate and if needed replace the chief executive and senior team",
            "Approve major commitments — capital, acquisitions, financing, entry and exit",
            "Ensure internal control and risk management are effective, and that assurance is independent",
            "Approve reporting to owners and regulators, and be answerable for its truthfulness",
            "Set the tone from the top and be accountable for the organisation's performance and impact",
            "Plan succession, for itself as well as for management",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Accountable for impact, not just performance",
          md: "The syllabus wording on directors' duties reaches beyond financial results to the organisation's *impact*. So a board that hits its numbers while generating environmental harm, unsafe conditions or mis-sold products has not discharged its duty — and saying that explicitly is worth marks a purely financial answer never reaches.",
        },
        {
          kind: "text",
          md: "Directors owe duties individually as well as collectively: to act within their powers, to promote the organisation's success, to exercise independent judgement, to apply reasonable care, skill and diligence, to avoid conflicts, not to accept benefits from third parties, and to declare interests in transactions. Two of those do particular work in SBL. **Independent judgement** is breached by the director who simply follows the chief executive; **reasonable care and diligence** is breached by the director who did not read the papers, which is why 'I was not told' is a finding rather than a defence.",
        },
      ],
      check: {
        q: "A board approves every proposal the chief executive brings, having met its financial targets for five years. What is the strongest assessment?",
        options: [
          "The board is effective, as results demonstrate",
          "The board may be discharging its directing role but is not exercising the independent judgement its control role requires",
          "The board should replace the chief executive as a matter of principle",
          "Approval rates are not a governance matter",
        ],
        correct: 1,
        explain:
          "Unanimity over five years is evidence about the board's behaviour, not about the proposals' quality — the control function requires challenge, and none is visible. Good results are precisely what makes this trap effective: they make the absence of scrutiny look like alignment.",
      },
    },
    {
      id: "structures",
      heading: "Unitary and two-tier structures, and splitting the top roles",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Two structures",
            data: {
              leftTitle: "Unitary board",
              rightTitle: "Two-tier board",
              rows: [
                { aspect: "Composition", left: "Executives and non-executives on one board", right: "Separate management board and supervisory board" },
                { aspect: "Information", left: "NEDs sit with executives and see the business directly", right: "Supervisory board receives information through the management board" },
                { aspect: "Challenge", left: "Depends on NED independence and courage", right: "Structurally separated, so challenge is built in" },
                { aspect: "Speed", left: "Faster — one decision-making body", right: "Slower; can duplicate discussion" },
                { aspect: "Risk", left: "NEDs captured by executive colleagues", right: "Supervisory board too distant to challenge on substance" },
                { aspect: "Stakeholders", left: "Usually shareholder-focused", right: "Often includes employee representation" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Neither is better in the abstract, and an answer claiming one is will not score. The trade-off is between **proximity** and **independence**: unitary boards buy engagement at the risk of capture, two-tier boards buy separation at the risk of distance.",
        },
        {
          kind: "text",
          md: "The recurring SBL issue is the **combined chair and chief executive**. It concentrates power in one person, and it removes the specific safeguard that matters most: the chair runs the board that holds the chief executive to account, so combining them makes the chief executive responsible for scrutinising themselves. It also controls the agenda and the information the board receives, which determines what the board is able to challenge at all.",
        },
        {
          kind: "table",
          caption: "The two top roles",
          head: ["Role", "Responsibility", "Why separation matters"],
          rows: [
            ["Chair", "Leads the board, sets agenda, ensures information and challenge, evaluates the board", "Must be able to hold the chief executive to account"],
            ["Chief executive", "Leads the business and executes strategy", "Is the person being held to account"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "If the roles cannot be split, name the mitigation",
          md: "In a smaller company splitting may be impractical. Then recommend the compensating safeguards: a senior independent director, a strong independent majority among NEDs, non-executives meeting without the executive present, and an externally facilitated board evaluation. A recommendation that ignores practicality reads as a checklist; one that offers mitigation reads as advice.",
        },
      ],
      check: {
        q: "Which is the strongest single objection to combining the chair and chief executive roles?",
        options: [
          "It increases the individual's workload unreasonably",
          "The person leading the body that holds the chief executive to account is the chief executive, so accountability is self-directed",
          "Governance codes prohibit it in all jurisdictions",
          "It reduces the number of board members",
        ],
        correct: 1,
        explain:
          "The objection is structural: the chair's core purpose is to run the board that scrutinises the chief executive, and combining the roles removes the scrutiny rather than merely straining it. Workload is a real but secondary concern, and codes generally discourage rather than prohibit.",
      },
    },
    {
      id: "neds",
      heading: "Non-executive directors",
      blocks: [
        {
          kind: "text",
          md: "Non-executive directors bring four contributions the executives cannot supply for themselves: **strategic** input from outside the organisation's assumptions, **scrutiny** of executive performance, **risk and control** oversight through the audit committee, and **people** decisions — appointing, appraising and setting the pay of the executives they monitor.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Independence is the whole point, and it is easy to lose",
          md: "A NED is not independent merely by lacking an executive contract. Independence is compromised by long tenure, a material business relationship with the company, cross-directorships, employment there in the recent past, a close relationship with an executive, a significant shareholding, or pay that matters materially to their income. Check each NED in the exhibit against these — that is where the findings are.",
        },
        {
          kind: "table",
          caption: "Common independence defects, and what to recommend",
          head: ["Exhibit fact", "Effect", "Recommendation"],
          rows: [
            ["NED has served fourteen years", "Familiarity; identification with management", "Do not classify as independent; plan refreshment"],
            ["NED's consultancy bills the company", "Financial dependence on executive goodwill", "End the relationship or reclassify the director"],
            ["NED is the former chief executive", "Reviewing their own prior decisions", "Not independent; particularly unsuitable for audit committee"],
            ["NED sits on a board with an executive of this company", "Reciprocal restraint on challenge", "Disclose; avoid where possible"],
            ["Only NED with financial expertise chairs audit and remuneration", "Overload; no challenge to their view", "Recruit further financial expertise"],
          ],
        },
        {
          kind: "text",
          md: "The paradox to keep in mind is that NEDs need enough involvement to understand the business and enough distance to challenge it. Too little time and they cannot see problems; too much and they become executives in all but name. When a case shows NEDs who meet four times a year and receive only management's summary, the honest finding is that they lack the information to discharge the role, whatever their calibre.",
        },
      ],
      check: {
        q: "A NED who chairs the audit committee is the company's former finance director, having left three years ago. What is the primary concern?",
        options: [
          "Insufficient financial expertise for the role",
          "Self-review — they would be assessing controls and judgements they themselves established",
          "Excessive time commitment",
          "No concern; prior experience makes them well qualified",
        ],
        correct: 1,
        explain:
          "Their expertise is not in doubt, which is what makes option 3 tempting — but audit committee membership demands independence precisely because the role reviews the finance function's own work. Recent employment there compromises exactly that.",
      },
    },
    {
      id: "induction-appraisal-diversity",
      heading: "Induction, development, appraisal and diversity",
      blocks: [
        {
          kind: "text",
          md: "B5(d) and B5(e) are easy marks that candidates skip. **Induction** matters because a director cannot exercise judgement on a business they do not understand — it should cover the strategy, the risks, the control environment, the key sites and the major relationships, not just the governance handbook. **Continuing development** matters because the risks change: a director appointed before the organisation depended on data and cloud services may need to be equipped to challenge on them.",
        },
        {
          kind: "text",
          md: "**Appraisal** of the board is the mechanism that makes the rest real. It should cover the board collectively, its committees, the chair, and each director individually — and the chair's own appraisal has to be led by someone else, usually the senior independent director, or nobody appraises the person who appraises everybody. External facilitation periodically is what stops it becoming a self-congratulatory exercise.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cycle",
            title: "Keeping a board effective",
            data: {
              steps: [
                { label: "Skills audit against strategy" },
                { label: "Appointment on merit, openly" },
                { label: "Induction into this business" },
                { label: "Continuing development" },
                { label: "Appraisal, externally facilitated" },
                { label: "Refreshment and succession" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "**Diversity** is where SBL rewards precision and punishes platitude. Diversity means difference among directors — of gender, ethnicity, age, background, nationality, professional discipline and experience. Its governance purpose is not representation for its own sake: it is that a board of people with similar histories tends to share assumptions, and shared assumptions are exactly what a board is supposed to test. A homogeneous board is vulnerable to groupthink, and groupthink is how obvious risks pass unchallenged.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "State the counter-arguments — that is what 'critically evaluate' means",
          md: "Appointments must remain on merit, and quota-driven appointment risks tokenism where the appointee lacks authority in the room. The reconciling point is that a genuinely open, well-specified search usually widens the candidate pool rather than lowering the bar, and that 'merit' assessed through a narrow network was never neutral to begin with.",
        },
      ],
      check: {
        q: "What is the strongest governance argument for board diversity?",
        options: [
          "It improves the organisation's public image and reporting",
          "Directors with differing backgrounds are less likely to share unexamined assumptions, so challenge and risk identification improve",
          "It is required by law in most jurisdictions",
          "It allows each stakeholder group to be represented on the board",
        ],
        correct: 1,
        explain:
          "The governance case runs through groupthink: a board exists to test assumptions, and cannot test the ones all its members share. Image is a by-product, legal mandates vary, and option 3 confuses diversity with stakeholder representation — directors owe duties to the organisation, not to a constituency.",
      },
    },
  ],
  examTraps: [
    { trap: "Concluding a board is effective because results are good.", fix: "Look for evidence of challenge: unanimous approval over years is a finding, not reassurance." },
    { trap: "Calling every non-executive independent.", fix: "Test tenure, business relationships, past employment, cross-directorships and shareholdings individually." },
    { trap: "Recommending role separation with no regard to practicality.", fix: "Where splitting is impractical, name the mitigations — senior independent director, NED-only meetings, external evaluation." },
    { trap: "Asserting diversity is beneficial without argument.", fix: "Run the groupthink mechanism, and address merit and tokenism directly." },
  ],
  keyTerms: [
    { term: "Unitary board", def: "A single board on which executive and non-executive directors serve together." },
    { term: "Two-tier board", def: "Separate management and supervisory boards, structurally dividing execution from oversight." },
    { term: "Senior independent director", def: "An independent NED who leads the chair's appraisal and provides an alternative channel for shareholders." },
    { term: "Independence (of a NED)", def: "Freedom from relationships — tenure, employment, business, family, shareholding — that could compromise objective judgement." },
    { term: "Groupthink", def: "Convergence on a view within a like-minded group, suppressing the challenge a board exists to provide." },
    { term: "Board evaluation", def: "Periodic appraisal of the board, its committees, the chair and individual directors, ideally externally facilitated." },
  ],
  summary: [
    "A board must both direct and control; most failures drop one of the two.",
    "Directors are accountable for the organisation's impact, not only its results.",
    "Unitary buys proximity at the risk of capture; two-tier buys independence at the risk of distance.",
    "Combining chair and chief executive makes accountability self-directed — mitigate if it cannot be split.",
    "Test each NED's independence individually; diversity's purpose is defeating groupthink.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the board's two competing functions?", a: "Directing — strategy, major decisions, appointments — and controlling, through scrutiny of executive performance." },
    { q: "Why does combining chair and chief executive matter structurally?", a: "The chair leads the body that holds the chief executive to account, so combining the roles makes that accountability self-directed, and gives one person control of agenda and information." },
    { q: "Name five things that can compromise NED independence.", a: "Long tenure, a material business relationship, recent employment by the company, cross-directorships, a significant shareholding, or a close relationship with an executive." },
    { q: "Who should lead the chair's appraisal, and why?", a: "The senior independent director — otherwise the person who appraises everyone else is appraised by nobody." },
    { q: "What is diversity's governance purpose?", a: "Reducing shared unexamined assumptions, so the board can perform the challenge and risk identification it exists for." },
  ],
  furtherStudy: [
    "SBL-09 covers the board's committees and directors' remuneration",
    "SBL-07 covers the ownership models that shape board composition",
    "SBL-26 covers the audit committee's relationship with internal audit",
    "SBL-19 covers risk culture, which the board sets through tone",
  ],
}

const SBL_TREE_09: StudyChapter = {
  paper: "SBL",
  id: "SBL-09",
  number: 9,
  area: "B",
  syllabusRefs: ["B5(f)", "B5(g)", "B5(h)"],
  title: "Board committees and directors' remuneration",
  minutes: 18,
  intro:
    "Committees exist to put independent people in charge of the decisions executives should not make about themselves. Remuneration is the sharpest of those decisions, and the one SBL most often uses to show a governance system failing quietly.",
  outcomes: [
    "Assess the purpose, responsibilities and accountability of the main board committees",
    "Explain the principles of remunerating directors, and how reward can be aligned with stakeholder interests",
    "Analyse the regulatory, strategic and labour-market pressures shaping directors' pay",
    "Diagnose a remuneration package that rewards the wrong behaviour, and recommend specific changes",
  ],
  sections: [
    {
      id: "committees",
      heading: "The main board committees",
      blocks: [
        {
          kind: "text",
          md: "Each committee exists because of a specific conflict of interest. Recognising which conflict a committee neutralises is what lets you say why its composition matters, rather than reciting a list of duties.",
        },
        {
          kind: "table",
          caption: "The four committees and the conflict each removes",
          head: ["Committee", "Responsibilities", "Conflict it neutralises"],
          rows: [
            ["Audit", "Integrity of reporting; internal control and risk oversight; internal audit; external auditor appointment, fees and independence", "Executives would otherwise judge the reliability of their own reporting"],
            ["Remuneration", "Policy and packages for executives and senior management", "Executives would otherwise set their own pay"],
            ["Nomination", "Board composition, succession, appointment process", "Executives would otherwise choose the people who monitor them"],
            ["Risk", "Risk appetite, risk framework and exposures (often merged with audit)", "Executives would otherwise assess the risk of their own strategy"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Composition is the mechanism — assess it first",
          md: "A committee only removes the conflict if the people on it are independent of the executives concerned. So the first finding in any committee task is who sits on it. An audit committee including the finance director, a remuneration committee containing the chief executive, or a nomination committee chaired by the person whose succession is in question each defeats its own purpose completely.",
        },
        {
          kind: "text",
          md: "Two further points earn marks. First, the audit committee needs at least one member with recent, relevant financial experience, because it must be able to challenge management's judgements rather than accept them. Second, committees must be **accountable**: with delegated authority they should report their activity and decisions to the board and, for remuneration and audit, to shareholders — otherwise delegation becomes a way of moving a decision out of sight.",
        },
      ],
      check: {
        q: "A remuneration committee comprises three independent NEDs, and the chief executive attends every meeting and is consulted on all packages including their own. How should this be assessed?",
        options: [
          "Compliant, since the committee's members are all independent",
          "The composition is correct but the practice defeats it — the chief executive is participating in setting their own pay",
          "Sound, because executive input on market rates is essential",
          "The committee should be abolished and pay set by the whole board",
        ],
        correct: 1,
        explain:
          "This is the gap between structure and substance the exam keeps testing: membership is right and the safeguard is still absent. A chief executive may properly advise on others' pay, but must be absent from any discussion of their own — otherwise the conflict the committee exists to remove is back in the room.",
      },
    },
    {
      id: "remuneration-principles",
      heading: "Remunerating directors",
      blocks: [
        {
          kind: "text",
          md: "Remuneration is an agency mechanism: pay is structured to make the agent's interests resemble the principal's. That framing tells you what to look for — whether the package rewards what the owners actually want, over the period they want it, and whether it can pay out when they have lost.",
        },
        {
          kind: "table",
          caption: "Components, and what each buys",
          head: ["Component", "Purpose", "Distortion it can introduce"],
          rows: [
            ["Basic salary", "Attract and retain; reflect role and market", "Ratchets upward through benchmarking; unrelated to performance"],
            ["Annual bonus", "Reward delivery in the period", "Short horizon; encourages earnings management near year end"],
            ["Share options", "Align with share price growth", "Rewards market-wide rises; one-sided payoff encourages excess risk"],
            ["Long-term share awards", "Align with sustained performance", "Weak if the period is short or conditions undemanding"],
            ["Pension and benefits", "Long-term security", "Can be opaque and large relative to visible pay"],
            ["Severance terms", "Allow removal of an underperformer", "Can reward failure if unduly generous"],
          ],
        },
        {
          kind: "list",
          style: "bullet",
          title: "Design principles worth recommending",
          items: [
            "**Align the horizon with the strategy** — multi-year vesting where value takes years to build",
            "**Use more than one measure**, including non-financial ones the strategy depends on",
            "**Set demanding, disclosed conditions** — a target management is certain to hit is not a condition",
            "**Require shareholding**, held into and beyond departure, so directors carry the downside",
            "**Include clawback and withholding** for misstatement, misconduct or later failure",
            "**Keep severance proportionate** so removing an underperformer is affordable",
            "**Disclose enough to be judged**, and put the policy to shareholders",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The one-sided payoff argument, which reliably earns marks",
          md: "An option holder gains from an upside and loses nothing beyond the option's value on a downside. That asymmetry makes riskier strategies rationally attractive to the holder and not to the owners. Requiring genuine shareholding rather than options alone restores the downside — this is the sharpest single point available on remuneration.",
        },
        {
          kind: "example",
          title: "Diagnosing a package",
          scenario:
            "A chief executive receives basic salary, an annual bonus based solely on reported operating profit, and options vesting after twelve months. The strategy is a five-year shift to subscription revenue requiring heavy upfront investment. Customer retention is falling.",
          steps: [
            { label: "Horizon mismatch", detail: "Annual bonus and twelve-month options against a five-year strategy — the package pays for deferring the very investment the strategy requires." },
            { label: "Single measure", detail: "Operating profit alone ignores retention, the leading indicator of subscription value, and is the measure investment depresses first." },
            { label: "Asymmetry", detail: "Options give upside without downside, and short vesting rewards a share-price move rather than delivery." },
            { label: "Recommend", detail: "Extend vesting across the strategy period; add retention and recurring-revenue conditions; replace short options with shares held beyond departure; add clawback for restatement." },
          ],
          result:
            "The diagnosis explains why a rational, honest chief executive would under-invest under this package — which is a far stronger finding than observing that the pay is high.",
        },
      ],
      check: {
        q: "Why do share options encourage greater risk-taking than an equivalent holding of shares?",
        options: [
          "Options are always larger in value than share awards",
          "The holder gains from upside but does not share the downside beyond the option's value, so the payoff is asymmetric",
          "Options vest immediately whereas shares do not",
          "Options are excluded from remuneration disclosure",
        ],
        correct: 1,
        explain:
          "Asymmetry is the mechanism: a failed gamble leaves the option worthless, while a successful one pays in full, so expected value rises with volatility for the holder but not for the owner. Shares move with the loss as well as the gain, which is why requiring shareholding is the standard fix.",
      },
    },
    {
      id: "pressures-on-pay",
      heading: "Regulatory, strategic and labour-market pressures",
      blocks: [
        {
          kind: "text",
          md: "B5(h) asks you to analyse the pressures determining directors' pay, which is really a question about why boards find this decision so hard to get right.",
        },
        {
          kind: "table",
          caption: "Three pressures pulling in different directions",
          head: ["Pressure", "What it pushes for", "Consequence"],
          rows: [
            ["Regulatory", "Disclosure, shareholder approval, clawback, ratio reporting", "Greater transparency; also benchmarking that ratchets pay upward"],
            ["Strategic", "Conditions tied to what the strategy needs, over its horizon", "Complexity; measures that can be gamed if poorly chosen"],
            ["Labour market", "Competitive packages for scarce, mobile executives", "Upward pressure; 'market rate' cited to justify almost anything"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Disclosure has a perverse effect worth naming",
          md: "Publishing pay was intended to restrain it, and partly does the opposite: every board can now see what its peers pay, nobody wishes to signal a below-median chief executive, and benchmarking to the upper quartile pushes the median up each year. Recognising this makes an answer noticeably more sophisticated than one treating transparency as a straightforward good.",
        },
        {
          kind: "text",
          md: "Wider considerations increasingly reach the board: internal pay ratios and their effect on employee morale, public and political reaction to awards made while staff are cut, and the reputational cost of paying a departing executive well after a failure. These are legitimate governance factors, not merely presentational — they affect trust, recruitment and licence to operate.",
        },
        {
          kind: "text",
          md: "For public sector and not-for-profit bodies the pressures differ again: pay is constrained by public accountability and funder expectation, share-based reward is usually impossible, and the comparison is with public service rather than the private market. Recommending private-sector incentive design in that setting without acknowledging the constraint is a common misstep.",
        },
      ],
      check: {
        q: "A remuneration committee sets the chief executive's salary at the upper quartile of a peer group each year, citing the need to retain talent. What is the governance concern?",
        options: [
          "Upper-quartile benchmarking is prohibited by governance codes",
          "Systematically targeting above the median ratchets pay upward across all companies without reference to performance",
          "Peer groups are irrelevant to executive pay",
          "There is no concern, since retention is a legitimate objective",
        ],
        correct: 1,
        explain:
          "If every committee aims above median, the median rises every year and the process becomes self-inflating — pay rises without any corresponding change in performance or scarcity. Retention is legitimate, which is what makes option 3 tempting; the defect is the mechanism used to pursue it.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing committee duties without examining who sits on the committee.", fix: "Composition is the mechanism — an executive on the wrong committee defeats it entirely." },
    { trap: "Observing that pay is high rather than that it rewards the wrong thing.", fix: "Test horizon, measures, asymmetry and clawback against the strategy in the case." },
    { trap: "Treating share options as straightforward alignment.", fix: "Name the one-sided payoff and recommend genuine shareholding held beyond departure." },
    { trap: "Recommending private-sector incentive structures in a public sector body.", fix: "Acknowledge public accountability, funder expectation and the absence of share-based reward." },
  ],
  keyTerms: [
    { term: "Audit committee", def: "Independent NEDs overseeing reporting integrity, internal control, internal audit and the external auditor." },
    { term: "Remuneration committee", def: "Independent NEDs setting executive pay, so executives do not determine their own reward." },
    { term: "Nomination committee", def: "Directors overseeing board composition, appointment and succession, so executives do not select their own monitors." },
    { term: "Clawback", def: "A contractual right to recover paid reward where results are restated or misconduct emerges." },
    { term: "Asymmetric payoff", def: "A reward structure giving upside participation without downside exposure, which makes risk rationally attractive to the holder." },
  ],
  summary: [
    "Each committee neutralises one conflict; independent composition is what makes it work.",
    "Audit committees need recent, relevant financial expertise to challenge management's judgements.",
    "Diagnose pay by horizon, number of measures, asymmetry, shareholding and clawback.",
    "Options without shareholding make excess risk rational for the holder.",
    "Disclosure and benchmarking can ratchet pay upward — say so, and note public sector constraints.",
  ],
  knowledgeDiagnostic: [
    { q: "Which conflict does each main committee remove?", a: "Audit — executives judging their own reporting; remuneration — setting their own pay; nomination — choosing their own monitors; risk — assessing the risk of their own strategy." },
    { q: "May a chief executive attend the remuneration committee?", a: "They may advise on others' packages but must be absent from any discussion of their own." },
    { q: "Why do options encourage more risk than shares?", a: "The payoff is asymmetric — full upside, limited downside — so expected value rises with volatility for the holder but not for the owner." },
    { q: "How can pay disclosure raise pay?", a: "Every committee can see peer pay and none wants a below-median chief executive, so benchmarking above the median lifts the median each year." },
  ],
  furtherStudy: [
    "SBL-08 covers the board and NED independence these committees depend on",
    "SBL-04 covers the self-interest threats reward design creates",
    "SBL-26 covers internal audit's reporting line to the audit committee",
    "SBL-10 covers the remuneration disclosure shareholders judge",
  ],
}

const SBL_TREE_10: StudyChapter = {
  paper: "SBL",
  id: "SBL-10",
  number: 10,
  area: "B",
  syllabusRefs: ["B4(a)", "B4(b)", "B4(c)", "B4(d)", "B4(e)", "B4(f)"],
  title: "Reporting to stakeholders, integrated reporting and sustainability",
  minutes: 19,
  intro:
    "Kaplan gives this 48 pages and the legacy Scholify chapter gave it a few sentences. It is also where SBL's sustainability content lives — the six capitals, environmental footprints, environmental management systems and whether any of it can be assured.",
  outcomes: [
    "Discuss what determines an organisation's policy on reporting to stakeholders",
    "Judge what integrated reporting adds for stakeholders, and what makes sustainability so hard to account for",
    "Advise on the guiding principles, content elements and six capitals of an integrated report",
    "Assess social and environmental footprints and how they are reported",
    "Describe internal management systems underpinning environmental and sustainability accounting",
    "Examine whether the audit of integrated reports can give stakeholders adequate assurance",
  ],
  sections: [
    {
      id: "reporting-policy",
      heading: "What determines reporting policy",
      blocks: [
        {
          kind: "text",
          md: "Beyond what law and listing rules compel, an organisation chooses how much to tell whom. B4(a) asks what drives that choice, and stakeholder power and interest are explicitly part of the answer — which connects this directly back to SBL-06.",
        },
        {
          kind: "table",
          caption: "Drivers of the reporting decision",
          head: ["Driver", "Effect on disclosure"],
          rows: [
            ["Legal and listing requirements", "Sets the floor, not the ceiling"],
            ["Stakeholder power and interest", "Powerful, interested parties extract disclosure whether or not it is required"],
            ["Cost of preparation and assurance", "Restrains voluntary reporting, especially where data are not yet collected"],
            ["Commercial sensitivity", "Argues against disclosure that would inform competitors"],
            ["Cost of capital", "Better disclosure can reduce perceived risk and so the required return"],
            ["Reputation and legitimacy", "Disclosure demonstrates control; silence is read as concealment"],
            ["Comparability pressure", "Peer and framework practice becomes an expectation"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The argument for going beyond the minimum",
          md: "Voluntary disclosure is not generosity: information asymmetry makes investors price uncertainty into their required return. An organisation that explains its risks, its strategy and its non-financial performance credibly can lower its cost of capital — which is the argument to put to a board that sees reporting purely as cost.",
        },
      ],
      check: {
        q: "Which is the strongest commercial argument for disclosing beyond the mandatory minimum?",
        options: [
          "It guarantees a higher share price",
          "Reducing information asymmetry can lower investors' required return, and so the cost of capital",
          "It removes the need for external audit",
          "Competitors will disclose the same information in response",
        ],
        correct: 1,
        explain:
          "Investors price uncertainty, so credible disclosure of risk and strategy can reduce the risk premium they demand. Note 'can' — option 0 overstates it into a guarantee, which is how this point is usually got wrong.",
      },
    },
    {
      id: "integrated-reporting",
      heading: "Integrated reporting and the six capitals",
      blocks: [
        {
          kind: "text",
          md: "Integrated reporting, denoted **&lt;IR&gt;**, addresses a real limitation of financial statements: they record transactions but explain little about how an organisation actually creates value over time, or what it depends on to keep doing so. An integrated report brings together how the organisation is directed, what it has achieved and where it expects to go, read against the conditions it operates in — and it accounts for value creation across a wider set of resources than money alone.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "The six capitals",
            data: {
              items: [
                { title: "Financial", sub: "Funds available for use in production or service provision" },
                { title: "Manufactured", sub: "Physical assets — buildings, equipment, infrastructure" },
                { title: "Intellectual", sub: "Knowledge-based intangibles: systems, protocols, brand, rights" },
                { title: "Human", sub: "People's skills, experience, motivation and ethical alignment" },
                { title: "Social and relationship", sub: "Trust and standing with communities, customers and partners" },
                { title: "Natural", sub: "Environmental resources and ecosystems the organisation draws on" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The capitals are a trade-off tool, not a list to recite",
          md: "Their analytical value is that a strategy usually **increases one capital while depleting another**: automation raises manufactured and financial capital and reduces human capital; cutting training raises this year's profit and erodes human and intellectual capital; extracting a resource faster consumes natural capital. In a task, name the capital being built and the one being consumed. That is the marks — a labelled list of six is not.",
        },
        {
          kind: "text",
          md: "The framework's **guiding principles** shape how a report is written: it should have a strategic focus and future orientation; show the connectivity between strategy, governance, performance and prospects; address key stakeholder relationships; be limited to material matters; be concise; be reliable and complete, including unfavourable matters; and be consistent and comparable over time.",
        },
        {
          kind: "text",
          md: "Its **content elements** are, in substance, a series of questions the report should answer: what the organisation does and the circumstances it operates in; how it is governed; its business model; the risks and opportunities affecting it; its strategy and resource allocation; its performance against objectives; its outlook; and the basis on which matters were judged material and measured.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Two honest criticisms — include them when asked to evaluate",
          md: "First, breadth invites selectivity: an organisation choosing its own material matters and its own non-financial measures can present a flattering picture that is difficult to contradict. Second, comparability suffers, because two organisations may measure the same capital quite differently. Both are reasons assurance matters, which is the next section.",
        },
      ],
      check: {
        q: "A company reports increased profit and return on capital after halving its training budget and outsourcing customer service. In six-capitals terms, what should the report show?",
        options: [
          "An unambiguous improvement, since financial capital increased",
          "Financial capital increased while human and social/relationship capital were depleted — a trade-off, not a gain",
          "Only natural capital is relevant to sustainability reporting",
          "Nothing, as training and outsourcing are operational matters",
        ],
        correct: 1,
        explain:
          "This is exactly the use the capitals are for: the financial gain is real and partly funded by consuming capitals that will not show up in this year's accounts. Reporting the increase alone is the selectivity criticism in action.",
      },
    },
    {
      id: "footprints-and-systems",
      heading: "Footprints, environmental reporting and management systems",
      blocks: [
        {
          kind: "text",
          md: "B4(d) uses the language of **footprints** — the measurable imprint economic activity leaves on society and the environment. A footprint converts a diffuse harm into a quantity that can be targeted, reduced and reported, which is what makes it a governance tool rather than a slogan.",
        },
        {
          kind: "table",
          caption: "Impacts, and how they are measured and reported",
          head: ["Impact", "Typical measure", "Reporting difficulty"],
          rows: [
            ["Greenhouse gas emissions", "Tonnes of CO₂ equivalent, by scope", "Emissions in the supply chain are hard to obtain and verify"],
            ["Water", "Volume abstracted and discharged; quality", "Local scarcity matters more than total volume"],
            ["Waste", "Tonnes by stream; proportion diverted from landfill", "Downstream fate often outside the entity's records"],
            ["Land and biodiversity", "Area affected; habitat and species measures", "No single accepted unit; long time lags"],
            ["Social impact", "Employment, safety incidents, pay ratios, community investment", "Attribution — did the organisation cause the outcome?"],
          ],
        },
        {
          kind: "text",
          md: "**Full cost accounting** is the underlying ambition: to bring the external costs an organisation imposes — pollution, depletion, health effects — into its own accounts so decisions reflect them. In practice it runs into measurement and valuation problems that make the numbers contestable, which is why it informs internal decision-making more often than published statements.",
        },
        {
          kind: "text",
          md: "B4(e) asks about the internal systems that make any of this credible. An **environmental management system** is the internal apparatus for setting environmental policy and objectives, assigning responsibility, measuring performance, auditing compliance and improving over time. Two recognised reference points are named in the syllabus: the **ISO 14000** family of international standards on environmental management, and **EMAS**, the European scheme, which additionally requires a validated public environmental statement.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why the system matters more than the target",
          md: "A published emissions target with no ownership, measurement or internal audit behind it is an aspiration. The system is what converts the target into data a board can govern and an assurer can test — so when a case shows ambitious environmental commitments and no management system, the finding is that the commitment is unmanaged, not merely unmet.",
        },
      ],
      check: {
        q: "A company publishes a 2030 net-zero commitment. Its emissions data are compiled annually by one manager from supplier estimates, with no internal audit and no board owner. What is the primary finding?",
        options: [
          "The target is too ambitious and should be revised",
          "The commitment is unmanaged — without ownership, reliable measurement or assurance the board cannot govern or evidence it",
          "Emissions reporting is voluntary, so no issue arises",
          "The company should engage an external auditor to set the target",
        ],
        correct: 1,
        explain:
          "The defect is the absence of a management system, not the level of ambition. Unowned, unaudited data compiled from estimates cannot support governance of the target or credible reporting on it — which is what environmental management systems exist to provide.",
      },
    },
    {
      id: "assurance",
      heading: "Can an integrated report be assured?",
      blocks: [
        {
          kind: "text",
          md: "B4(f) asks you to examine whether the audit of integrated reports can give stakeholders adequate assurance over relevance and reliability. The honest answer is a qualified one, and saying why is the point of the requirement.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Why assuring &lt;IR&gt; is harder than auditing financial statements",
            data: {
              leftTitle: "Financial statements",
              rightTitle: "Integrated report",
              rows: [
                { aspect: "Criteria", left: "Established reporting framework", right: "Entity often chooses its own measures and definitions" },
                { aspect: "Evidence", left: "Transactions with documentary support", right: "Estimates, survey data, third-party and supply-chain data" },
                { aspect: "Subject matter", left: "Largely historical and quantified", right: "Substantially forward-looking and narrative" },
                { aspect: "Materiality", left: "Assessed against a monetary base", right: "Multi-dimensional; matters to different stakeholders differently" },
                { aspect: "Expertise", left: "Accounting and auditing", right: "Also environmental, social and data expertise" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "The practical consequences are worth stating plainly. Assurance over non-financial information is often given at **limited** rather than reasonable level, and frequently covers only selected indicators rather than the whole report — so a report may carry an assurance statement while its most contestable claims sit outside the scope. Forward-looking statements cannot be verified at all, only assessed for whether the basis is reasonable and disclosed.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Read the scope, not the presence of a statement",
          md: "When an exhibit mentions that the sustainability report is 'independently assured', the finding is usually in the small print: which indicators, at what level of assurance, against which criteria. A limited-assurance opinion on three of twenty metrics is not assurance over the report, and stakeholders routinely read it as though it were.",
        },
        {
          kind: "text",
          md: "There are real improvements to recommend: adopting a recognised reporting framework so criteria are external rather than self-chosen; extending scope to the indicators that matter most rather than those easiest to verify; seeking reasonable assurance where data quality allows; strengthening internal control and internal audit over non-financial data before external assurance is sought; and disclosing the assurance scope and its limitations prominently rather than in a footnote.",
        },
      ],
      check: {
        q: "A sustainability report states it is 'independently assured'. The statement covers three of twenty indicators at limited assurance level. How should this be assessed?",
        options: [
          "Adequate assurance has been obtained over the report",
          "Misleadingly incomplete — most indicators are unassured and the level obtained is lower than an audit, so the scope and limitations should be disclosed prominently",
          "No assurance has been obtained at all",
          "Limited assurance is equivalent to reasonable assurance for non-financial data",
        ],
        correct: 1,
        explain:
          "Something real was obtained, so option 2 goes too far — but it covers a small minority of indicators at the lower level, while the prominent claim invites readers to assume the whole report is covered. The recommendation concerns scope and transparency about it.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing the six capitals without identifying a trade-off.", fix: "Name the capital the strategy builds and the one it depletes — that is the analytical use." },
    { trap: "Presenting integrated reporting as unambiguously good.", fix: "Include selectivity and weak comparability, which is why assurance and external frameworks matter." },
    { trap: "Treating a published environmental target as evidence of management.", fix: "Ask who owns it, how it is measured, and whether internal audit tests the data." },
    { trap: "Accepting 'independently assured' at face value.", fix: "Check which indicators, at what level, against which criteria — scope is where the finding is." },
  ],
  keyTerms: [
    { term: "Integrated reporting <IR>", def: "Reporting that explains how an organisation creates value over time across financial and non-financial capitals, in the context of its environment." },
    { term: "Six capitals", def: "Financial, manufactured, intellectual, human, social and relationship, and natural resources on which value creation draws." },
    { term: "Footprint", def: "A quantified measure of the social or environmental imprint of an organisation's activity." },
    { term: "Full cost accounting", def: "Attempting to bring external social and environmental costs into the organisation's own accounts so decisions reflect them." },
    { term: "Environmental management system", def: "Internal apparatus for environmental policy, objectives, responsibility, measurement, audit and improvement — ISO 14000 and EMAS being recognised reference points." },
    { term: "Limited assurance", def: "A lower level of assurance than an audit, expressed negatively, common for non-financial information." },
  ],
  summary: [
    "Reporting policy is driven by law, stakeholder power, cost, sensitivity, cost of capital and legitimacy.",
    "Integrated reporting explains value creation across six capitals; use them to expose trade-offs.",
    "Its guiding principles stress strategic focus, connectivity, materiality, conciseness and reliability.",
    "Footprints quantify impact; management systems such as ISO 14000 and EMAS make the data governable.",
    "Assurance over <IR> is usually limited and partial — read the scope, and recommend improving it.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the six capitals.", a: "Financial, manufactured, intellectual, human, social and relationship, and natural." },
    { q: "What is the analytical use of the capitals?", a: "Exposing trade-offs — showing which capital a strategy builds and which it depletes, including depletion invisible in this year's profit." },
    { q: "Give two criticisms of integrated reporting.", a: "Selectivity, because the entity chooses its material matters and measures; and weak comparability, because organisations measure the same capital differently." },
    { q: "Why is assuring an integrated report harder than auditing financial statements?", a: "Criteria are often self-chosen, evidence is estimated or third-party, much of the content is forward-looking and narrative, materiality is multi-dimensional, and other expertise is needed." },
    { q: "What should you check when a report claims independent assurance?", a: "Which indicators are within scope, at what level of assurance, and against which criteria." },
  ],
  furtherStudy: [
    "SBL-06 covers the stakeholder power that drives reporting policy",
    "SBL-27 covers internal control over reporting, including sustainability data",
    "SBL-26 covers the internal audit function that should test non-financial data",
    "SBR develops the financial reporting side of this material",
  ],
}

const SBL_TREE_11: StudyChapter = {
  paper: "SBL",
  id: "SBL-11",
  number: 11,
  area: "B",
  syllabusRefs: ["B6(a)", "B6(b)", "B6(c)", "B6(d)"],
  title: "Public sector governance",
  minutes: 17,
  intro:
    "The legacy paper barely mentioned this, and SBL sets cases on public bodies, charities and NGOs regularly. The governance problem does not vanish without shareholders — it becomes harder, because there is no share price to tell anyone whether the organisation is succeeding.",
  outcomes: [
    "Distinguish public sector, private sector, charitable and non-governmental organisational forms by agency relationship, objectives and performance criteria",
    "Assess how a public body's aims, leadership and governance arrangements differ from a commercial one's",
    "Explain how democratic accountability, political direction and the delivery of policy interact",
    "Discuss obligations to deliver economy, effectiveness and efficiency, and to promote public value",
  ],
  sections: [
    {
      id: "forms",
      heading: "Four forms, four different agency relationships",
      blocks: [
        {
          kind: "table",
          caption: "Who is the principal, and what counts as success",
          head: ["Form", "Principal", "Primary objective", "Performance criteria"],
          rows: [
            ["Private company", "Shareholders", "Return on capital", "Profit, return, share price, growth"],
            ["Public sector body", "Citizens, via elected representatives", "Deliver policy and public service", "Service outcomes, value for money, equity of access"],
            ["Charity", "Beneficiaries; trustees hold funds on trust", "Deliver charitable purpose", "Outcomes for beneficiaries, ratio of spend to purpose"],
            ["NGO / quasi-NGO", "Members, donors, or a founding mandate", "Advance a defined mission", "Mission progress, independence, donor confidence"],
          ],
        },
        {
          kind: "text",
          md: "Three consequences follow, and they drive most public sector findings in SBL. First, **objectives are multiple and often conflicting** — a health body must improve outcomes, widen access, control cost and satisfy political direction, and these do not reconcile automatically as a single financial objective would. Second, **there is no market signal**: nobody can read a share price to learn whether the organisation is doing well, so performance measurement has to do work the market does elsewhere, and it must be designed rather than assumed. Third, **exit is usually impossible** — a citizen cannot decline the service and take their custom elsewhere, which removes the discipline that keeps a commercial provider honest and puts the weight on scrutiny and transparency instead.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The agency problem is worse, not absent",
          md: "In a company one principal has one objective and a mechanism — votes and share sales — to enforce it. In a public body the principals are diffuse, the objectives are plural and contested, and the enforcement route runs through an election every few years. That is why public sector governance leans so heavily on transparency, audit and formal accountability: they substitute for the mechanisms that are missing.",
        },
        {
          kind: "text",
          md: "Charities add their own feature worth knowing: trustees are usually unpaid, are personally accountable for applying funds to the charitable purpose, and must manage a divide between the people who provide the money and the people who benefit from it. Donors are not beneficiaries, so satisfying donors and serving beneficiaries can pull apart — which is exactly the tension a case will use.",
        },
      ],
      check: {
        q: "Why is performance measurement more demanding in a public sector body than in a listed company?",
        options: [
          "Public bodies have no performance data available",
          "There is no market signal or exit option, and objectives are multiple and contested, so measures must be deliberately designed rather than inferred from profit",
          "Public bodies are not accountable to anyone",
          "Public sector managers are less capable",
        ],
        correct: 1,
        explain:
          "Profit and share price aggregate performance automatically in a company; nothing does that job in a public body, and its aims genuinely conflict. So the measurement framework has to be constructed, and constructing it badly is the usual finding.",
      },
    },
    {
      id: "arrangements",
      heading: "Objectives, leadership and governance arrangements",
      blocks: [
        {
          kind: "text",
          md: "Public sector governance arrangements look superficially like corporate ones and differ in important respects. There is normally a board or governing body with non-executive members, an accounting officer or chief executive personally accountable for the proper use of funds, an audit committee, and both internal and external audit — but external audit's remit is wider, typically covering regularity and value for money as well as the accounts.",
        },
        {
          kind: "table",
          caption: "Where public sector governance differs",
          head: ["Feature", "Private sector", "Public sector"],
          rows: [
            ["Objective", "Single financial objective", "Multiple, contested, politically set"],
            ["Accountability route", "Shareholders, AGM, share price", "Ministers, legislature, electorate, regulators"],
            ["Audit remit", "Truth and fairness of the accounts", "Also regularity, propriety and value for money"],
            ["Transparency expectation", "Commercial confidentiality respected", "Presumption of openness; freedom of information"],
            ["Reward", "Market-based, share-linked", "Constrained; share-based reward unavailable"],
            ["Consequence of failure", "Insolvency, takeover, removal", "Political intervention, special measures, restructuring"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The most common misstep in a public sector task",
          md: "Importing private-sector recommendations wholesale: share options to align management, growth targets, a single profit measure. None of these fits an organisation with no shares, no profit motive and a duty of equitable access. Recommend the substance — clear objectives, independent challenge, robust measurement, personal accountability for funds — in a form that suits the sector.",
        },
        {
          kind: "text",
          md: "Leadership in the public sector carries a particular difficulty: the strategic direction may be set by political decision rather than by the board, and may change with a change of administration. A chief executive must therefore deliver a mandate they did not choose, while remaining personally accountable for the propriety of spending — and must be able to advise honestly that a directed policy is undeliverable within the funding provided. That the advice was given and recorded matters as much as whether it was accepted.",
        },
      ],
      check: {
        q: "Which recommendation is LEAST appropriate for a publicly funded body?",
        options: [
          "Establish an audit committee with independent members",
          "Introduce share-option incentives to align managers with performance",
          "Define measurable service outcomes and report against them publicly",
          "Make the chief executive personally accountable for regularity of expenditure",
        ],
        correct: 1,
        explain:
          "There are no shares, and even where a proxy existed it would align managers to a financial objective the body does not have. The other three transfer well because they concern independent challenge, measurement and personal accountability rather than equity reward.",
      },
    },
    {
      id: "democratic-control",
      heading: "Democratic control, political influence and policy implementation",
      blocks: [
        {
          kind: "text",
          md: "Public bodies are ultimately answerable to citizens through elected representatives, and the chain is long: electorate → legislature → minister → department → arm's-length body → service. Every link adds distance between the citizen and the decision, which is precisely why formal accountability documents exist — mandates, framework agreements, published objectives and annual reports laid before the legislature.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The accountability chain, and where it weakens",
            data: {
              steps: [
                { label: "Electorate", sub: "Infrequent, aggregate signal" },
                { label: "Legislature", sub: "Scrutiny committees, public audit" },
                { label: "Minister", sub: "Sets policy; politically exposed" },
                { label: "Department", sub: "Funds and directs" },
                { label: "Body / board", sub: "Delivers within mandate" },
                { label: "Service user", sub: "Experiences the outcome; cannot exit" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Political influence is legitimate — policy is *supposed* to be set democratically — but it produces recurring governance tensions that SBL uses directly. Objectives can change mid-cycle with an administration; short electoral horizons discourage investment whose benefits arrive after the next election; announcements may commit an organisation before feasibility work is done; and there is pressure to report success in politically useful terms.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Separate policy from implementation, and say which you are advising on",
          md: "It is not for a board or an adviser to overturn a democratic policy choice. It *is* their duty to state the cost, the risk, the timetable and the trade-offs honestly, to record that advice, and to refuse to misreport the outcome. That distinction — accept the mandate, be truthful about deliverability — is the professionally correct position and the one that earns the marks.",
        },
      ],
      check: {
        q: "A minister announces a service expansion the board believes is undeliverable within the funding provided. What is the correct governance response?",
        options: [
          "Refuse to implement the policy, as the board's judgement should prevail",
          "Implement it and report success regardless of outcome",
          "Accept the mandate, formally advise on the funding gap, risks and timetable, record that advice, and report actual performance honestly",
          "Resign as a body, since the policy is unachievable",
        ],
        correct: 2,
        explain:
          "Policy is legitimately political and delivery advice is legitimately the board's — so the answer keeps both: implement the mandate, put the deliverability problem on the record, and never dress up the outcome. Option 0 substitutes the board for the democratic process; option 1 is the failure the record exists to prevent.",
      },
    },
    {
      id: "three-es",
      heading: "Economy, effectiveness, efficiency and public value",
      blocks: [
        {
          kind: "text",
          md: "The three Es are how public sector performance is assessed in the absence of profit, and precision about them separates a strong answer from a vague one.",
        },
        {
          kind: "table",
          caption: "The three Es",
          head: ["E", "Question", "Relates", "Failure it detects"],
          rows: [
            ["Economy", "Were inputs obtained at least cost for the quality required?", "Cost to inputs", "Overpaying for staff, goods or services"],
            ["Efficiency", "How much output was produced per unit of input?", "Inputs to outputs", "Waste, poor process, idle capacity"],
            ["Effectiveness", "Did the activity achieve the intended outcome?", "Outputs to objectives", "Busy delivery of something that does not help"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The three pull against each other — that is the exam point",
          md: "Pursuing economy alone buys the cheapest input and can destroy effectiveness: an untrained, minimally staffed service is economical and may achieve nothing. Pursuing efficiency alone maximises throughput and can too — more patients seen per hour, with worse outcomes. Effectiveness is the one that asks whether any of it mattered, and it is the hardest to measure, which is exactly why organisations report the other two.",
        },
        {
          kind: "text",
          md: "Some add **equity** as a fourth: whether the service is distributed fairly across those entitled to it. It matters because economy and efficiency can both be improved by quietly serving the cheapest-to-serve users and neglecting the rest — a distributional failure invisible in an average.",
        },
        {
          kind: "text",
          md: "**Public value** is the wider notion these measures serve: the benefit the organisation creates for the public, including outcomes, the fairness of how they are delivered, and the trust and legitimacy created in the process. It is the public sector's counterpart to shareholder value, and a board should be able to say what public value it exists to create and how it knows whether it is doing so.",
        },
        {
          kind: "example",
          title: "Applying the three Es",
          scenario:
            "A council reduces the unit cost of home care visits by 18% by shortening each visit and contracting the cheapest provider. Visits per day are up 22%. Hospital readmissions among recipients have risen, and complaints have doubled.",
          steps: [
            { label: "Economy", detail: "Improved — inputs cost less per visit." },
            { label: "Efficiency", detail: "Improved — more visits per unit of input." },
            { label: "Effectiveness", detail: "Deteriorated — the objective is maintaining people safely at home, and readmissions indicate it is being missed." },
            { label: "Equity", detail: "Test whether shortened visits fall hardest on those with the greatest need." },
            { label: "Conclude", detail: "Economy and efficiency gains have been bought at the cost of the outcome; report all three together and revisit the specification, not just the price." },
          ],
          result:
            "Reporting only cost and volume would show a successful programme. Adding effectiveness reverses the conclusion — which is the whole reason the three are assessed together.",
        },
      ],
      check: {
        q: "A body reports lower cost per unit of service and higher units delivered, while the outcome the service exists to achieve has worsened. What does this demonstrate?",
        options: [
          "Improved value for money overall",
          "Gains in economy and efficiency achieved at the cost of effectiveness",
          "Improved effectiveness, since more people were served",
          "A measurement error, as the three Es always move together",
        ],
        correct: 1,
        explain:
          "Cost per unit is economy, units delivered is efficiency, and neither speaks to whether the intended outcome was achieved. The three routinely move in opposite directions, which is why reporting only the two that improved is the classic public sector distortion.",
      },
    },
  ],
  examTraps: [
    { trap: "Assuming no shareholders means no agency problem.", fix: "Principals are diffuse and objectives contested, so the problem is harder — hence transparency, audit and formal accountability." },
    { trap: "Recommending share-based incentives or profit targets in the public sector.", fix: "Recommend the substance — clear objectives, independent challenge, measurement, personal accountability — in a form the sector allows." },
    { trap: "Advising a board to overrule democratically set policy.", fix: "Accept the mandate, advise formally on cost, risk and deliverability, record it, and report performance honestly." },
    { trap: "Treating lower cost and higher volume as value for money.", fix: "Add effectiveness, and equity — economy and efficiency gains are often bought from the outcome." },
  ],
  keyTerms: [
    { term: "Accounting officer", def: "The individual personally accountable to the legislature for the regularity and propriety of a public body's spending." },
    { term: "Economy", def: "Obtaining inputs at the lowest cost consistent with the quality required." },
    { term: "Efficiency", def: "The relationship between inputs consumed and outputs produced." },
    { term: "Effectiveness", def: "The extent to which outputs achieve the intended outcome or objective." },
    { term: "Equity (public sector)", def: "Fair distribution of a service across those entitled to it, which averages can conceal." },
    { term: "Value for money", def: "The combination of economy, efficiency and effectiveness, assessed together rather than separately." },
  ],
  summary: [
    "Different organisational forms have different principals, objectives and performance criteria.",
    "Without a market signal or exit, measurement and transparency must substitute — the agency problem is harder, not absent.",
    "Public sector audit covers regularity and value for money as well as the accounts.",
    "Accept democratic policy; advise honestly on deliverability and record it.",
    "Economy, efficiency and effectiveness conflict — report all three, and consider equity.",
  ],
  knowledgeDiagnostic: [
    { q: "Who is the principal in a public sector body?", a: "Citizens, acting through elected representatives — a diffuse principal with plural, contested objectives." },
    { q: "Why must public sector performance measurement be deliberately designed?", a: "There is no profit or share price to aggregate performance, and no exit option to discipline the provider." },
    { q: "Define the three Es.", a: "Economy — inputs at least cost for the quality needed; efficiency — outputs per unit of input; effectiveness — whether the intended outcome was achieved." },
    { q: "What is the correct response to a policy the board thinks undeliverable?", a: "Accept the democratic mandate, formally advise on the funding gap, risk and timetable, record the advice, and report actual performance honestly." },
    { q: "Why add equity to the three Es?", a: "Because economy and efficiency can be improved by serving the cheapest users and neglecting others — a distributional failure invisible in an average." },
  ],
  furtherStudy: [
    "SBL-06 covers the stakeholder and social responsibility ideas this applies",
    "SBL-03 covers public value and acting in the public interest",
    "SBL-30 covers performance measures and KPIs",
    "SBL-16 covers the public sector portfolio matrix within strategic choice",
  ],
}

export const SBL_TREE_AREA_B: StudyChapter[] = [
  SBL_TREE_05, SBL_TREE_06, SBL_TREE_07, SBL_TREE_08, SBL_TREE_09, SBL_TREE_10, SBL_TREE_11,
]
