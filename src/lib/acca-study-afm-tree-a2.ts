import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AFM · Area A, part two — ESG and ethics, the international environment,
 * multinational planning and dividend capacity.
 *
 *   AFM-05  ESG and sustainability in financial decisions      (A3a–b)
 *   AFM-06  Stakeholders, agency conflict, ethical governance  (A3c–h)
 *   AFM-07  International trade, institutions and markets      (A4)
 *   AFM-08  Strategic financial planning for the multinational (A5)
 *   AFM-09  Dividend capacity, remittances, transfer pricing   (A6)
 *
 * Split from acca-study-afm-tree-a.ts (AFM-01..04) only for file size — the two
 * modules are one syllabus area and the aggregator concatenates them in order.
 *
 * Written against the official ACCA AFM syllabus and study guide for September
 * 2026 to June 2027. Kaplan's AFM Study Text and Exam Kit (2020-21) informed
 * depth and structure only; all wording is original. Where the syllabus has
 * moved past the 2020-21 books — the ESG outcomes in A3, green finance, and
 * security token offerings — the content is written from the current syllabus.
 */

const AFM_TREE_05: StudyChapter = {
  paper: "AFM",
  id: "AFM-05",
  number: 5,
  area: "A",
  syllabusRefs: ["A3(a)", "A3(b)"],
  title: "ESG and sustainability in financial decisions",
  minutes: 16,
  intro:
    "ESG entered this syllabus as a financial topic, not a moral one. The examinable skill is putting environmental and social consequences into the same analysis as the cash flows — and saying honestly where they resist measurement.",
  outcomes: [
    "Assess how seriously an organisation's ESG commitment is meant, using evidence rather than its own statements",
    "Recognise and resolve conflicts between environmental, social and governance criteria that pull in different directions",
    "Assess the effect of a decision on the physical environment and on the sustainability of the resources it consumes",
    "Bring ESG consequences into an appraisal through cash flows, discount rates and constraints, and state the limits of each route",
    "Distinguish substantive sustainability performance from presentation designed to attract capital",
  ],
  sections: [
    {
      id: "esg-criteria",
      heading: "Assessing a commitment, not a statement",
      blocks: [
        {
          kind: "text",
          md: "The syllabus asks the adviser to **assess an organisation's commitment** to ESG criteria when it takes business, financial and investment decisions. The word doing the work is *commitment*: a policy document costs nothing to write, and the examiner's scenarios routinely contain an impressive statement of principles alongside a decision that contradicts it. Assessment means looking for what the organisation has actually given up.",
        },
        {
          kind: "table",
          caption: "Evidence that a commitment is real",
          head: ["Weak evidence", "Strong evidence"],
          rows: [
            ["A published sustainability policy", "Capital allocated to it in the approved budget"],
            ["A board-level statement of ambition", "Executive remuneration linked to measured outcomes"],
            ["Targets with distant, unowned deadlines", "Interim targets with a named accountable director"],
            ["Reporting selected metrics that flatter", "Reporting against an external framework, including the unflattering figures"],
            ["Claims of compliance", "Independent assurance over the reported data"],
            ["A project rejected on ESG grounds, mentioned nowhere", "A profitable project actually declined, with the cost disclosed"],
          ],
        },
        {
          kind: "text",
          md: "The last row is the strongest test available and the one candidates rarely use. A commitment that has never cost anything has never been tested. When a scenario shows an organisation forgoing a positive-NPV opportunity for environmental reasons and saying so publicly, that is evidence; when every ESG statement coincides with something it wanted to do anyway, that is marketing.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The three criteria genuinely conflict",
          md: "The syllabus asks how conflicts **between** the criteria may be resolved, which presumes they exist. Closing a polluting plant serves E and damages S — the community loses employment. Rapid decarbonisation may require capital the company can only raise by cutting the dividend, which its governance duty to shareholders resists. Say which criterion you are prioritising in this scenario and on what basis, rather than implying the three always align.",
        },
        {
          kind: "example",
          title: "Resolving an E-versus-S conflict",
          scenario:
            "A group can close an ageing plant in a single-industry town, cutting emissions by 30% of the group total. Closure costs 1,400 jobs in a region with no comparable employer. Retrofitting instead costs $180m and achieves 18%.",
          steps: [
            { label: "Quantify both", detail: "Cost the closure (redundancy, site remediation, lost contribution) and the retrofit ($180m capital, lower operating cost, longer asset life), and put the emissions difference in the same table." },
            { label: "Identify the binding constraint", detail: "Is the 30% needed to meet a regulatory or financing covenant, or is it an internal ambition? A binding external requirement changes the decision entirely." },
            { label: "Look for a third option", detail: "Phased closure with retraining and a staged retrofit may reach most of the environmental benefit while spreading the social cost over years." },
            { label: "Recommend and disclose", detail: "State the criterion prioritised, the cost accepted, and the mitigation funded — and say what will be reported publicly." },
          ],
          result:
            "The answer is not which criterion is more important in the abstract, but which constraint actually binds here and what the organisation is prepared to pay to honour the other.",
        },
      ],
      check: {
        q: "Which of the following would most strongly evidence that a company's stated environmental commitment is genuine?",
        options: [
          "A detailed sustainability report published annually on the corporate website",
          "Board approval of a policy statement aligned to an international framework",
          "A profitable investment declined on environmental grounds, with the forgone return disclosed",
          "Membership of an industry sustainability association",
        ],
        correct: 2,
        explain:
          "A commitment is evidenced by what it has cost. Declining a profitable project and disclosing the sacrifice is costly, verifiable and hard to fake. Reports, policies and memberships are all cheap to produce and are present in scenarios where the underlying conduct contradicts them — which is exactly the gap the assessment is meant to detect.",
      },
    },
    {
      id: "environmental",
      heading: "Physical environment and the sustainability of resources",
      blocks: [
        {
          kind: "text",
          md: "The second outcome asks what competing decisions would do to the **physical environment**, and whether the **natural resources** they draw on can go on being drawn on at that rate. Treat it as an analysis of dependency: what does this organisation consume that it cannot assume will keep being available at today's price, and what does it discharge that it may not be permitted to discharge for much longer?",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The dependency questions that generate marks",
          items: [
            "**Inputs** — water, energy, land, minerals, timber, fish stocks: is the consumption rate above the replacement rate?",
            "**Outputs** — emissions, effluent, waste: is any of it currently free that a carbon price, levy or permit regime could put a cost on?",
            "**Locations** — is any major asset exposed to flooding, drought, wildfire or heat stress within its remaining life?",
            "**Transition** — does demand for the product itself depend on a regulation or a fuel that is being phased out?",
            "**Supply chain** — does a supplier's environmental failure become the group's reputational and operational loss?",
          ],
        },
        {
          kind: "text",
          md: "Note the distinction between **physical risk** — the asset floods, the drought stops production — and **transition risk** — the asset becomes uneconomic because the rules or the market changed. They call for different responses. Physical risk is managed by location, resilience and insurance; transition risk is managed by changing what the business does, and no amount of resilience spending addresses it.",
        },
        {
          kind: "definition",
          term: "Stranded asset",
          md: "An asset that suffers a premature write-down or conversion to a liability because of changes in regulation, technology or demand — typically before the end of its expected economic life, and typically for reasons unrelated to its physical condition.",
        },
        {
          kind: "illustration",
          title: "A twenty-year appraisal with a ten-year market",
          md: "A group appraises a new plant over twenty years, with a terminal value assuming continuing operation. The product is a component for internal combustion engines in markets that have legislated an end to their sale within twelve years. The NPV is positive and the appraisal is worthless: the terminal value, which contributes most of the value, assumes a market the legislation has already removed. The environmental analysis here is not a separate section of the report — it is the correction to the cash flow forecast.",
        },
        {
          kind: "activity",
          title: "Turn a dependency into a number",
          prompt:
            "A manufacturer abstracts river water free of charge under a licence renewable in six years. A drought-management regime under consultation would introduce abstraction charges and volume caps. How should this enter the appraisal?",
          answer:
            "Not as a narrative caveat at the end. Model it: build a scenario in which charges begin in year seven at the consultation's proposed rate and volumes are capped at the proposed level, then re-run the net present value. If the project only works on free unlimited water, that is the finding — the project's viability rests on a licence renewal the organisation does not control. Then quantify the cost of the alternative, which is usually recirculation plant or an alternative supply, and compare that capital cost against the value at risk. Finally, state the assumption explicitly for the board, because a decision that depends on a regulatory outcome should be taken knowingly rather than by default.",
        },
      ],
      check: {
        q: "A coastal refinery with fifteen years of remaining life faces both rising sea levels and a national policy to phase out its principal product. Which describes the risks correctly?",
        options: [
          "Both are physical risks and are addressed by improving the sea defences",
          "Sea level rise is physical risk, addressed by resilience or relocation; the phase-out is transition risk, which resilience spending does not address and which may strand the asset",
          "Both are transition risks, since both arise from climate change",
          "Neither is examinable, as environmental matters are outside the financial appraisal",
        ],
        correct: 1,
        explain:
          "The two need different responses, which is why the distinction matters. Sea defences protect against water; nothing protects an asset whose product has been legislated out of its market. Conflating them, as options 0 and 2 do, leads to spending capital on the wrong problem, and option 3 contradicts the syllabus, which puts environmental consequences inside the investment decision.",
      },
    },
    {
      id: "esg-in-appraisal",
      heading: "Getting ESG into the numbers — and admitting where it will not go",
      blocks: [
        {
          kind: "text",
          md: "There are three routes for bringing an environmental or social consequence into a financial appraisal, and each has a failure mode. A strong answer picks a route, applies it, and says what the route cannot capture.",
        },
        {
          kind: "table",
          caption: "Three routes and their weaknesses",
          head: ["Route", "How it works", "Where it fails"],
          rows: [
            ["Cash flow adjustment", "Price the consequence — carbon cost, remediation, retraining — and put it in the forecast", "Only works for effects with a defensible price; understates uncertain future regulation"],
            ["Discount rate adjustment", "Raise the rate for a project carrying higher environmental or regulatory risk", "Crude: it penalises distant cash flows most, which may not be where the risk sits, and double-counts if also in cash flows"],
            ["Constraint", "Rule the option out, or require a minimum standard, regardless of NPV", "Gives no ranking among acceptable options, and can hide the cost of the constraint unless disclosed"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Prefer cash flows, use constraints openly",
          md: "Where a price exists — a carbon price, a licence fee, a remediation estimate — put it in the cash flows, because that keeps the analysis transparent and lets sensitivity analysis test it. Where no defensible price exists, say so and use an explicit constraint instead of inventing a number. What loses marks is a vague uplift to the discount rate that nobody can justify or test.",
        },
        {
          kind: "text",
          md: "**Green finance** connects this to Area B's financing decision. Green bonds, sustainability-linked loans and transition finance can lower the cost of debt or widen the investor base, but they carry covenants tied to measured environmental performance — so a missed target becomes a financing cost, and the ESG data becomes contractually material. Recommending green finance therefore means recommending the reporting and assurance capability to support it.",
        },
        {
          kind: "text",
          md: "Finally, keep **greenwashing** in view as an ethical and a financial risk. Overstating environmental performance to attract capital is a misrepresentation to investors; where it is tied to a sustainability-linked instrument it is also a potential breach of contract, and regulators in several markets now pursue it directly. When a scenario shows ambitious external claims and thin internal measurement, that gap is the finding.",
        },
      ],
      check: {
        q: "An appraisal team proposes adding two percentage points to the discount rate to reflect 'environmental risk' on a project whose main exposure is a possible carbon levy from year five. What is the better treatment?",
        options: [
          "The adjustment is appropriate, as risk should always be reflected in the discount rate",
          "Model the levy explicitly in the cash flows from year five at its consulted rate and run a sensitivity on it, keeping the discount rate for the project's systematic risk",
          "Ignore the levy, since it has not yet been enacted",
          "Reject the project outright, since environmental risk cannot be quantified",
        ],
        correct: 1,
        explain:
          "The exposure is a dated, priceable cash outflow, so it belongs in the forecast where it can be seen and tested. A blanket rate uplift penalises all cash flows including those unaffected, weighs hardest on the distant years, and cannot be sensitivity-tested meaningfully. Ignoring an exposure under active consultation fails the scepticism test, and rejecting outright discards a quantifiable analysis.",
      },
    },
  ],
  examTraps: [
    { trap: "Accepting a company's own ESG statements as evidence of commitment.", fix: "Look for what was given up — capital allocated, remuneration linked, a profitable option declined and disclosed." },
    { trap: "Writing as though environmental, social and governance goals always align.", fix: "Name the conflict in the scenario and say which criterion you are prioritising, and why." },
    { trap: "Adding an unexplained premium to the discount rate for 'ESG risk'.", fix: "Price the effect in the cash flows where a defensible price exists; use an explicit constraint where it does not." },
    { trap: "Treating a long terminal value as safe when the product faces a phase-out.", fix: "Test whether the market assumed in the terminal value still exists at that date." },
  ],
  keyTerms: [
    { term: "Transition risk", def: "The risk that regulation, technology or demand change makes an asset or business model uneconomic, independently of any physical damage." },
    { term: "Physical risk", def: "The risk of direct damage or disruption to assets and operations from environmental events such as flood, drought, storm or heat stress." },
    { term: "Green finance", def: "Funding whose terms are tied to environmental use of proceeds or to measured sustainability performance, typically carrying reporting covenants." },
    { term: "Greenwashing", def: "Presenting environmental performance as better than the evidence supports, in order to attract customers, capital or favourable terms." },
  ],
  summary: [
    "Assess commitment by what it has cost the organisation, not by what it has published.",
    "The three ESG criteria conflict; name the conflict and the basis for prioritising one.",
    "Separate physical risk from transition risk — resilience spending answers only the first.",
    "Prefer cash flow treatment, use explicit constraints where no price exists, and avoid untestable discount rate uplifts.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the strongest single evidence of a genuine ESG commitment?", a: "A profitable opportunity declined on ESG grounds with the forgone return disclosed — a commitment that has cost something and can be verified." },
    { q: "Why is a discount rate uplift a poor way to reflect a future carbon levy?", a: "The levy is a dated, priceable cash outflow; an uplift penalises all cash flows including unaffected ones, weighs hardest on distant years, and cannot be sensitivity-tested." },
    { q: "What does a sustainability-linked loan add to a group's obligations?", a: "Measured environmental performance becomes contractual, so missing a target raises the financing cost and the underlying data needs reporting and assurance capability." },
  ],
  furtherStudy: [
    "AFM-06 takes the governance and stakeholder-conflict half of Area A3.",
    "AFM-03 supplies the risk framework these environmental exposures are managed within.",
    "Area B covers green finance among the sources of finance available to an organisation.",
    "SBR develops the sustainability reporting architecture that produces the data relied on here.",
  ],
}

const AFM_TREE_06: StudyChapter = {
  paper: "AFM",
  id: "AFM-06",
  number: 6,
  area: "A",
  syllabusRefs: ["A3(c)", "A3(d)", "A3(e)", "A3(f)", "A3(g)", "A3(h)"],
  title: "Stakeholders, agency conflict and ethical governance",
  minutes: 17,
  intro:
    "Agency theory explains most of the bad behaviour AFM scenarios contain. Governance is the set of answers to it — and the adviser is usually the person who has to name the problem out loud.",
  outcomes: [
    "Map stakeholder groups by power and interest, and say what each one can actually do to the organisation",
    "Explain how investment and financing decisions transfer value between shareholders, lenders and other groups",
    "Identify agency problems in a scenario, including the ones created by the incentive scheme itself",
    "Recommend governance mechanisms matched to the specific conflict rather than a generic list",
    "Recommend an ethical framework for financial management, grounded in the profession's fundamental principles",
  ],
  sections: [
    {
      id: "stakeholders",
      heading: "Stakeholders: who can do what to you",
      blocks: [
        {
          kind: "text",
          md: "The examinable question is not who cares about the organisation but **who can affect it, and through what mechanism**. Power and interest is the standard mapping, and it earns marks only when each group's power is stated concretely — a lender's power is a covenant, a regulator's is a licence, an employee group's may be a strike or simply the loss of the people the business depends on.",
        },
        {
          kind: "table",
          caption: "Claims, power and the lever each group pulls",
          head: ["Group", "What they want", "What they can actually do"],
          rows: [
            ["Shareholders", "Return and growth in value", "Vote against the board, sell (depressing the price and inviting a bid), block a resolution"],
            ["Lenders and bondholders", "Certainty of interest and principal", "Enforce covenants, reprice, refuse refinancing, accelerate the debt"],
            ["Employees", "Security, pay, conditions", "Withdraw labour, or leave — taking the capability with them"],
            ["Customers", "Price, quality, continuity", "Switch, and in concentrated markets remove a large share of revenue at once"],
            ["Suppliers", "Payment and continuity", "Tighten credit terms, prioritise other customers, disrupt the supply chain"],
            ["Government and regulators", "Compliance, tax, employment", "Licences, penalties, price controls, tax changes, planning refusals"],
            ["Communities and society", "Environmental and social conduct", "Protest, litigation, planning objections, and reputational damage that reprices capital"],
          ],
        },
        {
          kind: "text",
          md: "The syllabus then asks about the effect of **investment and financing strategies** on stakeholders. This is where the analysis gets specific: financing decisions in particular transfer value between groups, often silently.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "How a financing decision moves value between groups",
          items: [
            "Raising debt against existing assets dilutes existing lenders' security — value moves from lenders to shareholders",
            "Paying a large special dividend funded by debt does the same, which is why covenants restrict distributions",
            "Taking on a much riskier project after debt is raised transfers value to shareholders, who hold the upside while lenders bear the downside — the classic risk-shifting problem",
            "Declining to invest because most of the gain would accrue to lenders is the debt overhang problem, and it destroys value for everyone",
          ],
        },
        {
          kind: "definition",
          term: "Risk shifting",
          md: "The incentive for shareholders of a geared company to prefer riskier projects after debt has been issued, because they capture the upside while lenders bear a disproportionate share of the downside." },
      ],
      check: {
        q: "A highly geared company chooses a high-risk project over a safer one with a higher expected NPV. Whose interests does this serve, and what is the mechanism?",
        options: [
          "Lenders, because higher risk carries a higher return",
          "Shareholders, through risk shifting — with limited liability they capture the upside while lenders absorb much of the downside, so a riskier project can suit them even when it destroys value overall",
          "Employees, because high-risk projects create more jobs",
          "Nobody — the choice is simply irrational",
        ],
        correct: 1,
        explain:
          "This is the standard agency conflict between shareholders and lenders in a geared firm, and it explains why loan agreements restrict the borrower's activities. It is not irrational: it is rational for shareholders and value-destroying for the firm as a whole, which is precisely why covenants exist. Lenders lose from the substitution, so option 0 has it backwards.",
      },
    },
    {
      id: "agency",
      heading: "Agency problems, including the ones the board created",
      blocks: [
        {
          kind: "text",
          md: "Agency theory says that where ownership and control are separated, the agent will sometimes act in their own interest. AFM scenarios supply the evidence in a recognisable set of forms — and the most examinable insight is that the **incentive scheme is often the cause**, not the cure.",
        },
        {
          kind: "table",
          caption: "Agency behaviour and the incentive that produced it",
          head: ["Behaviour in the scenario", "Likely incentive driving it"],
          rows: [
            ["Empire-building acquisitions with weak strategic logic", "Remuneration or status scaled to size rather than return"],
            ["Short-horizon decisions, deferred maintenance and capital expenditure", "Annual bonus on profit or EPS, with a departure date in sight"],
            ["Excessive caution, low gearing, cash hoarding", "Undiversified managers protecting their own position and human capital"],
            ["Aggressive accounting estimates near year end", "A bonus threshold or a covenant test falling just the wrong side"],
            ["Resistance to a takeover that shareholders would gain from", "Loss of office on completion"],
            ["Diversification into unrelated businesses", "Reducing managers' personal risk at shareholders' expense"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Read the remuneration exhibit as evidence, not background",
          md: "When a case study tells you the bonus is 60% of salary and triggers on EPS growth, and elsewhere shows a debt-funded buy-back proposal, those two exhibits are connected. Naming that link is a scepticism mark and a commercial acumen mark in one sentence — and candidates who treat remuneration detail as scene-setting leave both behind.",
        },
        {
          kind: "text",
          md: "Governance mechanisms answer specific conflicts. Match them: an over-powerful chief executive is answered by splitting the chair and chief executive roles and by strong independent non-executives; short-termism is answered by deferring and clawing back long-term incentives and by measuring returns over the asset's life; risk shifting by lenders is answered by covenants; information asymmetry is answered by independent assurance and by an audit committee with direct access to the auditors.",
        },
        {
          kind: "activity",
          title: "Name the mechanism, not the principle",
          prompt:
            "A scenario shows a founder-chief executive who is also chair, a board with two non-executives both former colleagues, and a proposed related-party acquisition of a company the founder's family partly owns. What do you recommend?",
          answer:
            "Three specific mechanisms rather than a call for better governance. First, the transaction should be referred to a committee of genuinely independent directors with the founder excluded from the decision and the vote, and — for a listed company — put to shareholders with the interested party's holding disqualified, because the conflict here is direct and personal. Second, an independent valuation of the target should be commissioned by that committee, not by management, since the price is the mechanism through which value would transfer. Third, the structural cause should be addressed: separate the chair and chief executive roles and appoint non-executives with no prior relationship, because two former colleagues cannot supply the challenge the role exists for. The point is that each recommendation attaches to a named defect in the scenario.",
        },
      ],
      check: {
        q: "A chief executive due to retire in eighteen months proposes deferring a major systems replacement and cutting the maintenance budget. Which agency problem is this, and which governance response fits best?",
        options: [
          "Risk shifting; the response is tighter loan covenants",
          "Short-termism arising from a horizon mismatch; the response is deferred long-term incentives with clawback, and measuring returns over the asset's life rather than the year",
          "Empire building; the response is a limit on acquisition size",
          "Information asymmetry; the response is more frequent management accounts",
        ],
        correct: 1,
        explain:
          "The problem is that the executive's remaining horizon is shorter than the consequences of the decision, so costs fall after their departure while the savings arrive before it. The fix has to reach past the departure date — deferral and clawback do exactly that. Covenants address the lender conflict, acquisition limits address empire building, and more frequent reporting does not change an incentive that is working as designed.",
      },
    },
    {
      id: "ethical-framework",
      heading: "Recommending an ethical and governance framework",
      blocks: [
        {
          kind: "text",
          md: "The final outcome asks for a recommended framework for financial management policies, aligned with the profession's ethical principles. A framework is not a code of conduct on a wall — it is the set of arrangements that make the right decision the path of least resistance when someone is under pressure.",
        },
        {
          kind: "table",
          caption: "The five fundamental principles, in financial management terms",
          head: ["Principle", "What it demands of the finance function"],
          rows: [
            ["Integrity", "Forecasts and valuations that represent the preparer's honest expectation, not the answer required"],
            ["Objectivity", "Assumptions chosen on evidence — not a discount rate selected because it makes the case work"],
            ["Professional competence and due care", "Techniques applied by people who understand their limits, with review proportionate to the sums at stake"],
            ["Confidentiality", "Price-sensitive deal information contained, with insider lists and dealing restrictions enforced"],
            ["Professional behaviour", "Tax planning, disclosure and market conduct that would survive publication"],
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "What to put in the recommendation",
          items: [
            "A stated tone from the top, evidenced by the board declining something it wanted",
            "Clear delegated authority limits, so it is unambiguous who may commit the organisation to what",
            "Separation of the people who prepare an investment case from those who review and approve it",
            "A confidential route for raising concerns that does not run through the person likely to be the subject",
            "Ethics and conduct in performance assessment, so behaviour affects reward alongside results",
            "Periodic independent review of the framework itself, reported to the audit committee",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The threats that bite hardest in senior finance",
          md: "**Self-interest** where remuneration depends on the number being produced; **intimidation** where a dominant executive pressures a subordinate's estimate; **familiarity** with a long-standing counterparty or adviser; and **self-review** where the person appraising the project is the one who proposed it. Name the threat, then name the safeguard — an answer that says only 'this is unethical' has stopped one step short of the mark.",
        },
        {
          kind: "text",
          md: "Where a safeguard cannot reduce the threat to an acceptable level, the professional answer escalates: raise it internally, take advice from the professional body, document the position, and ultimately decline to be associated with the report or resign. Say this plainly when a scenario warrants it — the examiner is looking for a candidate who will state the last resort rather than trail off after suggesting a discussion.",
        },
      ],
      check: {
        q: "A finance director is told by the chief executive to use a lower discount rate so a favoured project shows a positive NPV. Which threat is this, and what is the correct sequence of response?",
        options: [
          "Familiarity threat; accept the instruction but disclose it in the board papers",
          "Intimidation threat, with a self-interest element; state the objection and the evidence for the original rate, escalate to the audit committee or chair if it is not resolved, document throughout, and decline to be associated with a report presenting an unsupportable rate",
          "Self-review threat; the resolution is for the finance director to review their own work again",
          "No threat arises, since selecting a discount rate is a matter of judgement",
        ],
        correct: 1,
        explain:
          "Pressure from a superior to change an estimate is an intimidation threat to objectivity, sharpened where the director's own reward depends on the outcome. The examinable sequence is escalate, document, and if unresolved refuse association — a discount rate is a judgement, but a judgement made to reach a predetermined answer is not one. Option 3 is the argument the chief executive is making, and it is the one to reject.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing stakeholder groups without saying what each can actually do.", fix: "State the lever — covenant, licence, switching, strike, vote — and whether it binds here." },
    { trap: "Treating the remuneration exhibit as background detail.", fix: "Connect the incentive to the behaviour the scenario shows; that link is where the scepticism marks are." },
    { trap: "Recommending 'stronger corporate governance'.", fix: "Attach a named mechanism to a named defect — independent committee, split roles, clawback, covenant." },
    { trap: "Identifying an ethical problem and stopping there.", fix: "Name the threat, the safeguard, and the escalation route if the safeguard is insufficient." },
  ],
  keyTerms: [
    { term: "Agency problem", def: "The conflict arising where the agent managing an organisation has interests that diverge from those of the principals who own it." },
    { term: "Debt overhang", def: "The situation where a heavily indebted firm declines a positive-NPV project because most of the benefit would accrue to existing lenders rather than shareholders." },
    { term: "Clawback", def: "A contractual right to recover incentive pay already awarded, where later events show the performance it rewarded was misstated or unsustainable." },
    { term: "Intimidation threat", def: "The threat to objectivity arising when a professional accountant is deterred from acting objectively by pressure, actual or perceived, from another party." },
  ],
  summary: [
    "Map stakeholders by the lever they can pull, not by the interest they hold.",
    "Financing and investment decisions transfer value between shareholders and lenders — covenants exist because of it.",
    "The incentive scheme usually explains the agency behaviour; read the remuneration exhibit as evidence.",
    "An ethical framework works by making the right decision the easy one under pressure — and by having an escalation route when it is not.",
  ],
  knowledgeDiagnostic: [
    { q: "Why do loan agreements restrict what a borrower may invest in?", a: "Because of risk shifting: after debt is issued, shareholders gain from riskier projects since they keep the upside while lenders absorb much of the downside." },
    { q: "What is debt overhang and why does it destroy value?", a: "A heavily indebted firm declines positive-NPV projects because the benefit would largely accrue to lenders — so a value-creating investment is not made at all." },
    { q: "What is the final step when a safeguard cannot reduce an ethical threat to an acceptable level?", a: "Escalate internally, take professional advice, document the position, and decline to be associated with the report — resigning if necessary." },
  ],
  furtherStudy: [
    "AFM-05 covers the environmental and social half of Area A3.",
    "AFM-01 frames stakeholder claims as constraints on the shareholder wealth objective.",
    "Area C returns to agency conflict in takeover defences, where the target board's interests and its shareholders' can diverge sharply.",
    "ACCA's Ethics and Professional Skills module develops the threats-and-safeguards approach applied here.",
  ],
}

const AFM_TREE_07: StudyChapter = {
  paper: "AFM",
  id: "AFM-07",
  number: 7,
  area: "A",
  syllabusRefs: ["A4(a)", "A4(b)", "A4(c)", "A4(d)", "A4(e)", "A4(f)", "A4(g)"],
  title: "International trade, the institutions and world financial markets",
  minutes: 16,
  intro:
    "The only part of AFM where the exhibit is the world rather than the company. It is examined as consequence: what does this development do to *this* organisation's cash flows, funding and risk?",
  outcomes: [
    "Explain the case for free trade and the forms protection takes, in terms of who gains and who pays",
    "Assess what membership of a trade bloc or common market does to a specific business",
    "Describe what the World Trade Organisation, International Monetary Fund, World Bank and central banks actually do",
    "Explain how international financial markets serve global debt, emerging economies and financial stability",
    "Translate a macroeconomic development into its effect on a named organisation, and recommend a response",
  ],
  sections: [
    {
      id: "free-trade",
      heading: "Free trade, and the barriers that survive it",
      blocks: [
        {
          kind: "text",
          md: "The economic case for free trade rests on comparative advantage: countries gain by specialising in what they produce at the lowest opportunity cost and trading for the rest, so total output rises even where one country is absolutely better at everything. The case is strong in aggregate and silent about distribution, which is why protection persists — the gains are diffuse and the losses are concentrated in identifiable industries and regions that can organise politically.",
        },
        {
          kind: "table",
          caption: "Forms of protection and what each does to a business",
          head: ["Barrier", "Mechanism", "Effect on the organisation"],
          rows: [
            ["Tariff", "Tax on imports", "Raises landed cost; may make local production or sourcing viable"],
            ["Quota", "Volume limit", "Caps sales regardless of price; creates scarcity rents for those holding allocation"],
            ["Subsidy to domestic producers", "State support for local rivals", "Competitor's cost base falls below yours; margin compression in that market"],
            ["Technical and regulatory standards", "Specification, testing, labelling requirements", "Compliance cost and delay; sometimes an effective ban"],
            ["Exchange controls", "Restriction on currency movement", "Blocks or delays remittance of profits — see the multinational planning chapter"],
            ["Public procurement rules", "Preference for domestic suppliers", "Excludes you from a whole customer segment"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Answer as a business, not as an economist",
          md: "A requirement on trade barriers is never asking for an essay on comparative advantage. It is asking what a tariff does to *this* group's landed cost, sourcing decision, transfer prices and location choices. One sentence of theory, then the consequence, then the response.",
        },
        {
          kind: "text",
          md: "The response options are the examinable part: absorb the cost and lose margin, pass it on and lose volume, source locally to get inside the barrier, relocate production, or use the group's structure — routing through a jurisdiction with a favourable agreement, where that is legitimate rather than artificial.",
        },
      ],
      check: {
        q: "A tariff of 15% is imposed on a group's principal export market, where it currently supplies from a single overseas plant. Which response should the adviser evaluate first?",
        options: [
          "Immediately relocating all production into the tariff-imposing country",
          "Comparing the margin lost by absorbing or passing on the tariff against the cost and payback of local sourcing or assembly inside the barrier, allowing for how durable the tariff is likely to be",
          "Hedging the tariff exposure with currency futures",
          "Withdrawing from the market, since a 15% tariff eliminates any margin",
        ],
        correct: 1,
        explain:
          "The decision is an investment appraisal with a political assumption attached, and its answer turns on the tariff's expected durability — building a plant to escape a barrier that is removed in two years destroys value. Option 0 jumps to the most capital-intensive answer without the comparison, option 2 confuses a trade barrier with a currency exposure, and option 3 assumes a margin figure the scenario has not given.",
      },
    },
    {
      id: "agreements",
      heading: "Blocs, common markets and what membership changes",
      blocks: [
        {
          kind: "text",
          md: "The syllabus asks for an up-to-date understanding of major trade agreements and common markets, and for advice on their strategic implications for a **given** business. Learn the ladder of integration rather than a list of acronyms, because it is the depth of integration that determines the commercial consequence.",
        },
        {
          kind: "table",
          caption: "Degrees of integration",
          head: ["Form", "What members agree", "What it changes commercially"],
          rows: [
            ["Free trade area", "No tariffs between members; each keeps its own external tariff", "Rules of origin become critical — where value is added determines whether goods qualify"],
            ["Customs union", "Free internal trade plus a common external tariff", "Origin rules simplify; external sourcing decisions are made once for the bloc"],
            ["Common market", "Adds free movement of labour and capital", "Location of staff and financing becomes flexible; single supply chain across members"],
            ["Economic and monetary union", "Adds a shared currency and monetary policy", "Removes transaction exposure between members, and removes devaluation as an adjustment mechanism"],
          ],
        },
        {
          kind: "text",
          md: "Two effects to name when advising. **Trade creation** is the new trade generated because internal barriers fell — a genuine efficiency gain. **Trade diversion** is trade that shifts from an efficient external supplier to a less efficient internal one purely because of the tariff wall; the member gains, the excluded supplier loses, and world efficiency falls. If the organisation in the scenario is outside the bloc, diversion is the risk to flag.",
        },
        {
          kind: "illustration",
          title: "The same event, opposite advice",
          md: "A bloc lowers internal tariffs. For a group with plants inside it, the advice concerns consolidating production onto fewer, larger sites and serving the bloc from there — scale economies previously blocked by internal borders. For a competitor supplying from outside, the same event raises the effective barrier and the advice concerns acquiring or building capacity inside the bloc, or accepting a structurally weaker position. The development is one; the recommendation depends entirely on where the client stands.",
        },
      ],
      check: {
        q: "A group supplies a customs union from a plant outside it. Members reduce internal tariffs to zero while keeping the common external tariff unchanged. What is the principal risk?",
        options: [
          "Trade creation, which will increase the group's sales into the union",
          "Trade diversion — customers switch to internal suppliers who are now cheaper only because of the external tariff, so the group loses share without becoming less efficient",
          "Currency risk, as the union will adopt a single currency",
          "There is no effect, since the external tariff has not changed",
        ],
        correct: 1,
        explain:
          "The group's competitive position worsens even though nothing about the group changed: internal rivals now face zero barriers while it still faces the external tariff. That relative shift is trade diversion. Option 3 misses that competitiveness is relative, option 0 describes the gain accruing to members, and option 2 imports monetary union into a customs union scenario.",
      },
    },
    {
      id: "institutions",
      heading: "The institutions, and what each can actually do to you",
      blocks: [
        {
          kind: "text",
          md: "Four bodies are named in the syllabus, plus central banks. Candidates lose marks by describing purposes in general terms; the marks are for the transmission mechanism to the organisation.",
        },
        {
          kind: "table",
          caption: "The institutions and their reach into a multinational",
          head: ["Body", "Role", "How it reaches the organisation"],
          rows: [
            ["World Trade Organisation", "Administers trade rules and settles disputes between members", "A ruling can remove or authorise a tariff affecting your market access"],
            ["International Monetary Fund", "Supports members facing balance of payments crises, with conditions", "Its programme conditions drive devaluation, austerity and exchange controls in your host country"],
            ["World Bank", "Long-term development finance and project lending", "Funds the infrastructure your project depends on; procurement rules affect contract access"],
            ["Central banks", "Set monetary policy, act as lender of last resort, supervise banks", "Policy rates drive your cost of floating debt; intervention and guidance move your currency"],
          ],
        },
        {
          kind: "text",
          md: "The syllabus names the Federal Reserve, the Bank of England, the European Central Bank and the Bank of Japan specifically. What matters for advice is that their decisions are not confined to their own economies: a rise in United States policy rates raises the cost of dollar debt everywhere, strengthens the dollar, and pulls capital out of emerging markets — which is transmitted to a group with dollar borrowings and local-currency revenues as a squeeze on both sides at once.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "How a policy rate rise reaches a multinational",
            data: {
              steps: [
                { label: "Policy rate rises", sub: "Central bank tightens" },
                { label: "Capital flows shift", sub: "Funds move to the higher-yielding currency" },
                { label: "Currency strengthens", sub: "Emerging-market currencies weaken" },
                { label: "Group effect", sub: "Debt service up, translated earnings down, covenants tighter" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "Always finish at the organisation",
          md: "A macroeconomic requirement is marked on the last step. 'The Fed raised rates' is background; 'our $400m floating facility costs $10m more a year, cover falls from 4.1 to 3.4 times against a 3.0 covenant, and the naira revenues translating into it have fallen 12%' is the answer.",
        },
      ],
      check: {
        q: "A host country enters an International Monetary Fund programme. Which consequence should most concern a multinational with a profitable subsidiary there?",
        options: [
          "The World Bank will assume ownership of the subsidiary",
          "Programme conditions commonly involve currency devaluation, fiscal tightening and sometimes exchange controls — so the subsidiary's earnings translate into less, local demand contracts, and remitting profits may become restricted or delayed",
          "The subsidiary will be exempt from local taxation for the programme's duration",
          "The organisation must convert its local borrowings into International Monetary Fund loans",
        ],
        correct: 1,
        explain:
          "The relevant transmission runs through the programme's conditions: devaluation hits translated earnings and any hard-currency debt the subsidiary carries, austerity hits local demand, and capital or exchange controls hit the parent's ability to get cash out — which is precisely the risk the multinational planning outcomes address. The other options describe things the Fund does not do.",
      },
    },
    {
      id: "markets-developments",
      heading: "World financial markets and the developments to watch",
      blocks: [
        {
          kind: "text",
          md: "The international financial markets do three jobs the syllabus names: they intermediate **global debt**, they channel capital to **emerging economies**, and their functioning is what **financial stability** means in practice. For a multinational, they are simply where funding is priced — the eurobond market, syndicated loans, and international equity listings all sit here, and Area B returns to them as sources of finance.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Developments the syllabus asks you to be aware of",
          items: [
            "**Causes and effects of financial crisis** — leverage, maturity mismatch and correlated exposures turning a local shock into a systemic one; for a company the effect is that funding disappears at the moment it is most needed",
            "**Dark pool trading** — venues where orders are not publicly displayed before execution, reducing market impact for large trades but reducing pre-trade transparency and, at scale, weakening the public price-formation the rest of the market relies on",
            "**Removal of barriers to capital movement** — cheaper and wider funding access, at the cost of greater exposure to sudden reversals of flow",
            "**International anti-money-laundering regulation** — due diligence obligations on counterparties, ownership transparency requirements, and severe penalties, which raise the cost of operating in weakly regulated jurisdictions",
          ],
        },
        {
          kind: "text",
          md: "Money laundering deserves particular care in an AFM answer because it converts a commercial question into a conduct question. A joint venture partner whose beneficial ownership cannot be established, or a payment routed through a jurisdiction for no commercial reason, is not merely a reputational matter — it exposes the group and its officers to criminal liability, and the professional obligation is to decline rather than to price the risk.",
        },
        {
          kind: "activity",
          title: "From development to recommendation",
          prompt:
            "Capital is flowing out of emerging markets as major central banks tighten. Your client has a subsidiary in one such market, funded by dollar debt raised at group level, with revenues entirely in local currency. Give the analysis and two recommendations.",
          answer:
            "The analysis is a double squeeze: the local currency weakens, so the same local revenue services a dollar obligation that has not changed in size, while the tightening itself raises the coupon on any floating portion. Translated subsidiary earnings also fall, which reduces group interest cover just as the interest charge rises, so a covenant test can fail through no operational deterioration at all. Two recommendations, both of which address the structural mismatch rather than the symptom: first, refinance part of the exposure into local-currency debt so that the servicing obligation moves with the revenue that pays it — the natural hedge that no derivative reproduces over long horizons; second, quantify the covenant headroom under a defined devaluation scenario now and open the conversation with lenders before a breach, since a waiver negotiated in advance costs far less than one requested after the event.",
        },
      ],
      check: {
        q: "Why does a group with local-currency revenues and hard-currency debt face more than a translation problem?",
        options: [
          "It is purely a translation issue, resolved by the consolidation method chosen",
          "The obligation is real and unchanged in hard currency while the cash generated to service it has fallen in value, so it is an economic and cash exposure that can breach covenants without any operational decline",
          "Hard-currency debt is prohibited for subsidiaries in emerging markets",
          "The problem disappears if the debt is fixed rate",
        ],
        correct: 1,
        explain:
          "Translation affects the reported numbers; this affects the ability to pay. The mismatch between the currency of the cash flows and the currency of the obligation is an economic exposure, and its most immediate danger is a covenant test failing for currency reasons alone. A fixed rate protects against rate movements but does nothing about the currency mismatch, which is why the structural answer is to match the borrowing currency to the revenue currency.",
      },
    },
  ],
  examTraps: [
    { trap: "Writing an economics essay on comparative advantage.", fix: "One line of theory, then the effect on this organisation's costs, sourcing and location, then the response." },
    { trap: "Describing what the International Monetary Fund or World Trade Organisation is, and stopping.", fix: "Trace the transmission to the client's cash flows, funding or market access." },
    { trap: "Treating a trade bloc's effects as uniformly positive.", fix: "Ask whether the client is inside or outside — trade diversion makes the same event a threat." },
    { trap: "Pricing money-laundering exposure as a commercial risk.", fix: "It is a conduct and criminal matter; the professional answer is to decline, not to discount." },
  ],
  keyTerms: [
    { term: "Comparative advantage", def: "The principle that a country gains from specialising where its opportunity cost of production is lowest, even if another country produces everything more cheaply in absolute terms." },
    { term: "Trade diversion", def: "The shift of trade from a more efficient external supplier to a less efficient supplier inside a bloc, caused by the tariff differential rather than by relative efficiency." },
    { term: "Rules of origin", def: "The criteria determining where goods are deemed to originate, which decide whether they qualify for preferential treatment within a free trade area." },
    { term: "Dark pool", def: "A trading venue where orders are not displayed publicly before execution, reducing market impact for large trades at the cost of pre-trade transparency." },
  ],
  summary: [
    "Protection persists because free trade's gains are diffuse and its losses are concentrated and organised.",
    "The degree of integration — free trade area to monetary union — determines the commercial consequence.",
    "Institutions matter through their transmission mechanism: conditions, rulings, policy rates and capital flows.",
    "Finish every macroeconomic answer at the organisation's own cash flows, covenants and funding.",
  ],
  knowledgeDiagnostic: [
    { q: "Why are rules of origin critical in a free trade area but less so in a customs union?", a: "A free trade area lets each member keep its own external tariff, so goods could otherwise enter through the lowest-tariff member; a common external tariff removes that possibility." },
    { q: "How does a rise in United States policy rates reach a group with no United States operations?", a: "It raises the cost of dollar debt, strengthens the dollar and pulls capital from emerging markets — squeezing debt service and translated earnings simultaneously." },
    { q: "What is the professional response to a counterparty whose beneficial ownership cannot be established?", a: "Decline the relationship — this is a conduct and criminal-liability matter, not a commercial risk to be priced." },
  ],
  furtherStudy: [
    "AFM-08 applies this environment to the multinational's own planning framework.",
    "AFM-09 covers the remittance restrictions that exchange controls create.",
    "Area B prices international projects under alternative exchange rate assumptions and covers international sources of finance.",
    "Area E supplies the hedging instruments for the currency exposures identified here.",
  ],
}

const AFM_TREE_08: StudyChapter = {
  paper: "AFM",
  id: "AFM-08",
  number: 8,
  area: "A",
  syllabusRefs: ["A5(a)"],
  title: "Strategic financial planning for the multinational",
  minutes: 15,
  intro:
    "A group is not one company with foreign branches. Money that is earned abroad is not automatically money the parent can use — and planning that ignores this produces a strategy the group cannot fund.",
  outcomes: [
    "Build a financial planning framework that reflects how a multinational actually differs from a domestic group",
    "Assess the constraints national regulation places on raising and moving capital",
    "Explain how limits on remittances and transfer pricing rules restrict the mobility of capital within a group",
    "Compare risk exposures across national markets rather than treating the group as one portfolio",
    "Balance central coordination against local financial autonomy, and identify the agency costs of each",
  ],
  sections: [
    {
      id: "planning-framework",
      heading: "What makes multinational planning different",
      blocks: [
        {
          kind: "text",
          md: "Four things change once operations cross borders, and the syllabus outcome names all four. Cash is no longer freely movable; regulation is plural rather than singular; risk exposures differ by market rather than netting out; and the coordination problem between centre and subsidiary becomes an agency problem with distance and information asymmetry attached.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "radial",
            title: "The four constraints on a multinational plan",
            data: {
              centre: "Group financial plan",
              nodes: [
                { label: "Regulation", sub: "Listing rules, capital requirements, local law" },
                { label: "Capital mobility", sub: "Remittance limits, exchange controls, transfer pricing" },
                { label: "Risk pattern", sub: "Different exposures in each market" },
                { label: "Agency", sub: "Central control versus local autonomy" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The distinction that organises the whole answer",
          md: "Group profit is not group cash, and group cash is not **parent** cash. A plan that funds dividends, central debt service and head-office investment must be built on the cash the parent can actually access, after local retention requirements, withholding taxes and any exchange controls. This is exactly what the dividend capacity computation measures.",
        },
      ],
      check: {
        q: "Why is consolidated group profit an unreliable basis for planning the parent's dividend and debt service?",
        options: [
          "Consolidated profit is not audited",
          "It includes profits earned in subsidiaries that may be subject to retention requirements, withholding taxes or exchange controls, so the cash may not be available to the parent at all",
          "Consolidated profit always overstates cash because of depreciation",
          "It excludes the results of subsidiaries that are less than wholly owned",
        ],
        correct: 1,
        explain:
          "Consolidation reports economic performance across the group; it says nothing about where the cash sits or whether it can move to the entity with the obligations. Option 2 describes a general profit-versus-cash issue, real but not the multinational point, and option 3 misstates consolidation, which includes subsidiaries in full with a non-controlling interest presented separately.",
      },
    },
    {
      id: "regulatory-and-capital-mobility",
      heading: "Regulation, listings and the mobility of capital",
      blocks: [
        {
          kind: "text",
          md: "The syllabus names compliance with national regulatory requirements, giving stock exchange admission requirements as its example. A group choosing where to list is choosing a regulatory regime, an investor base and a set of ongoing obligations — and the choice affects the cost of capital.",
        },
        {
          kind: "table",
          caption: "What a listing decision actually decides",
          head: ["Dimension", "Consequence"],
          rows: [
            ["Investor base and liquidity", "Deeper markets reduce the liquidity premium and widen the pool for future issues"],
            ["Disclosure and governance obligations", "Ongoing compliance cost; higher standards can reduce the cost of capital by reducing information asymmetry"],
            ["Free float and minimum size requirements", "May force a larger issue, or the sale of more of the family or state holding than intended"],
            ["Index inclusion", "Passive demand for the shares, but also forced selling if the group later drops out"],
            ["Reporting framework and currency", "Cost of parallel reporting, and translation effects visible to investors"],
          ],
        },
        {
          kind: "text",
          md: "The second half of the outcome — how freely capital can actually cross a border, and the limits national rules place on remitting profits and on pricing intra-group supply — is where multinational planning becomes concrete. Cash can be trapped by several mechanisms at once, and each has a different partial remedy.",
        },
        {
          kind: "table",
          caption: "How cash gets trapped, and the legitimate responses",
          head: ["Restriction", "Effect", "Response"],
          rows: [
            ["Exchange controls", "Conversion or transfer blocked or rationed", "Reinvest locally, source locally, negotiate a government agreement in advance of investing"],
            ["Withholding tax on dividends", "A percentage lost on each remittance", "Use treaty rates where genuinely available; consider timing and alternative routes"],
            ["Legal reserve requirements", "A share of local profits cannot be distributed", "Plan around the retained portion; it is not lost, but it is not available either"],
            ["Thin capitalisation rules", "Interest on intra-group debt disallowed above a limit", "Fund with an equity/debt mix that respects the local limit"],
            ["Transfer pricing rules", "Prices between group entities challenged and adjusted", "Document arm's length pricing contemporaneously; expect scrutiny of any pattern that shifts profit to low-tax jurisdictions"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Where planning becomes evasion",
          md: "Routes that move cash by charging management fees, royalties or interest are legitimate only where the service, asset or loan is real and the price is arm's length. A charge invented to move profit is tax evasion or a transfer pricing abuse — and in an AFM answer, recommending it fails the ethics dimension however clever the structure. Say plainly which side of the line a proposal sits on.",
        },
      ],
      check: {
        q: "A subsidiary in a country with strict exchange controls generates strong profits the parent cannot remit. Which is the most appropriate strategic response?",
        options: [
          "Invoice the subsidiary for management fees at whatever rate extracts the cash fastest",
          "Redirect the trapped cash into local investment or local sourcing that reduces the group's future funding needs, while negotiating remittance terms with the authorities and factoring the restriction into any further investment appraisal",
          "Write the subsidiary's profits down to nil in the consolidated accounts",
          "Cease trading in the country immediately",
        ],
        correct: 1,
        explain:
          "The trapped cash still has value if it can be put to work where it sits, and the restriction should change the appraisal of further investment there rather than being discovered afterwards. Option 0 describes exactly the abusive charge that transfer pricing rules exist to catch. Option 2 confuses a cash restriction with an impairment question, and option 3 discards a profitable operation over a problem with partial remedies.",
      },
    },
    {
      id: "risk-pattern-and-agency",
      heading: "Risk by market, and the centre-versus-local balance",
      blocks: [
        {
          kind: "text",
          md: "The third element is the **shape** of the group's risk across its various national markets — economic exposures and every other kind. Shape rather than total, because the group's exposure is not the sum of its subsidiaries' exposures: some offset and some compound. Costs in one currency and revenues in another compound; a natural hedge exists where a subsidiary's costs and revenues share a currency; and political risk in two unrelated jurisdictions genuinely diversifies, whereas commodity exposure across all of them does not.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Building the exposure map",
          items: [
            "List each market's revenue and cost currencies, and identify where they already match",
            "Identify the common factors — one commodity, one customer industry, one funding currency — that make apparently separate exposures move together",
            "Separate what nets at group level from what is trapped in a single entity by regulation, because an offset that cannot be realised in cash is not a hedge",
            "Distinguish political and regulatory risk, which is jurisdiction-specific and diversifiable, from macroeconomic risk, which usually is not",
          ],
        },
        {
          kind: "text",
          md: "The final element is the agency issue in coordinating overseas operations: how much financial autonomy should a subsidiary have? Both extremes fail, and the examinable skill is placing a specific group on the spectrum using the evidence in the scenario.",
        },
        {
          kind: "table",
          caption: "Centralisation versus local autonomy",
          head: ["Dimension", "Centralised", "Autonomous"],
          rows: [
            ["Cash and funding", "Pooling and netting cut balances and financing cost; better rates from scale", "Local knowledge of banks and instruments; faster response to local conditions"],
            ["Risk management", "Group sees the netted exposure and avoids hedging offsetting positions twice", "Local team understands the real commercial exposure behind the numbers"],
            ["Investment decisions", "Consistent hurdle rates; capital goes to the best group opportunity", "Local proposals reflect market reality rather than a template"],
            ["Motivation and accountability", "Local management demotivated, and blames the centre for outcomes", "Ownership of results — but local optimisation at the group's expense"],
            ["Control risk", "Distance from the operation; slow to detect local problems", "Weaker oversight; the classic setting for unauthorised positions and local fraud"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The usual recommendation",
          md: "Centralise treasury — cash pooling, netting, external funding and hedging execution — because those benefit from scale and from seeing the whole exposure. Devolve commercial decisions within clear authority limits and a group hurdle rate. Then make performance measures consistent with the split: a subsidiary judged on results it does not control will manage the measure instead of the business.",
        },
        {
          kind: "activity",
          title: "Place the group on the spectrum",
          prompt:
            "A group has eleven subsidiaries, each arranging its own borrowings and hedging locally. Group treasury has discovered that two subsidiaries hold offsetting euro positions, both hedged, and that average borrowing margins are 80 basis points above what the parent achieves. What do you recommend and what do you leave alone?",
          answer:
            "Centralise the treasury functions where the evidence of loss is direct. The offsetting euro positions mean the group paid twice to hedge an exposure that was already close to flat at group level — netting removes that cost outright. The 80 basis point gap is the price of eleven small borrowers instead of one large one, so external funding should be raised centrally and on-lent, subject to local thin capitalisation limits and any withholding tax on interest, which need checking before the structure is fixed. What to leave alone is the commercial side: pricing, customer terms and local investment proposals stay with the subsidiaries, because that is where the market knowledge is, and removing it would demotivate the people who generate the results. The condition attached is a group hurdle rate, authority limits, and a reporting line so the centre sees exposures as they arise rather than at the year end.",
        },
      ],
      check: {
        q: "What is the strongest argument for centralising a multinational's treasury function?",
        options: [
          "Local managers cannot be trusted with financial decisions",
          "Only the centre can see the group's netted exposure, so it avoids paying to hedge positions that already offset, and it can raise funds at better rates through scale",
          "Centralisation removes exchange controls",
          "It eliminates the need for local bank relationships",
        ],
        correct: 1,
        explain:
          "The case rests on information and scale: netting requires seeing all positions at once, and borrowing capacity is cheaper in size. Option 0 is a slur rather than an argument and does not survive the counter-case for local knowledge. Option 2 is false — exchange controls are set by governments — and option 3 overstates it, since local banking relationships remain necessary for local operations.",
      },
    },
  ],
  examTraps: [
    { trap: "Planning from consolidated profit as though it were parent cash.", fix: "Work from what the parent can actually access after retention rules, withholding tax and controls." },
    { trap: "Treating group exposure as the sum of subsidiary exposures.", fix: "Identify what offsets, what compounds, and what is trapped where it cannot be realised." },
    { trap: "Recommending intra-group charges purely to extract trapped cash.", fix: "Charges must reflect a real service at an arm's length price; say so explicitly." },
    { trap: "Recommending full centralisation or full autonomy.", fix: "Centralise treasury and funding, devolve commercial decisions within limits, and align the performance measures." },
  ],
  keyTerms: [
    { term: "Blocked funds", def: "Cash generated in a subsidiary that exchange controls or other restrictions prevent from being remitted to the parent." },
    { term: "Thin capitalisation rules", def: "Tax rules disallowing interest deductions on intra-group debt above a specified level relative to equity, to prevent profit being stripped out as interest." },
    { term: "Netting", def: "Settling only the net amount of intra-group obligations in each currency, reducing both transaction costs and the exposure requiring a hedge." },
    { term: "Natural hedge", def: "An exposure offset arising from the business structure itself, such as costs and revenues arising in the same currency, requiring no financial instrument." },
  ],
  summary: [
    "Group profit is not parent cash — plan from what can actually reach the entity with the obligations.",
    "Listing choice, exchange controls, withholding taxes and thin capitalisation rules all restrict capital mobility.",
    "Map exposures by market, identifying what offsets, what compounds and what is trapped.",
    "Centralise treasury for netting and scale; devolve commercial decisions with limits and consistent measures.",
  ],
  knowledgeDiagnostic: [
    { q: "Name three mechanisms that can trap cash in a subsidiary.", a: "Exchange controls restricting conversion or transfer, withholding taxes reducing each remittance, and local legal reserve requirements preventing distribution of part of the profit." },
    { q: "Why is an offsetting exposure in another subsidiary not always a hedge?", a: "If regulation prevents the cash from moving between the entities, the offset cannot be realised — it nets in the accounts but not in the group's actual cash position." },
    { q: "What is the standard split between centre and subsidiary?", a: "Centralise treasury — pooling, netting, external funding and hedging — and devolve commercial decisions within authority limits and a group hurdle rate." },
  ],
  furtherStudy: [
    "AFM-09 computes the dividend capacity that this framework has to be funded from.",
    "AFM-07 supplies the international environment these constraints arise in.",
    "Area B appraises international projects under alternative exchange rate and remittance assumptions.",
    "Area E covers the netting, pooling and matching techniques a centralised treasury operates.",
  ],
}

const AFM_TREE_09: StudyChapter = {
  paper: "AFM",
  id: "AFM-09",
  number: 9,
  area: "A",
  syllabusRefs: ["A6(a)", "A6(b)"],
  title: "Dividend capacity, remittances and transfer pricing",
  minutes: 19,
  intro:
    "The one reliable computation in Area A, and the one candidates most often get half right: how much can the parent actually pay, given a capital programme to fund and subsidiaries whose cash has to cross a border to get here.",
  outcomes: [
    "Compute a group's dividend capacity as free cash flow to equity, from the parent's perspective",
    "Handle remittances from subsidiaries correctly, including withholding tax and any additional home-country tax",
    "Assess the effect of a capital investment programme on current and projected dividend capacity",
    "Explain how buy-backs and new issues change free cash flow to equity",
    "Explain how transfer pricing policy moves profit, cash and tax between group entities, and where the limits lie",
  ],
  sections: [
    {
      id: "dividend-capacity",
      heading: "Dividend capacity is free cash flow to equity",
      blocks: [
        {
          kind: "text",
          md: "Dividend capacity answers a cash question, not a profit question: what is the **maximum** the parent could distribute this year without borrowing to do it? The measure is free cash flow to equity — the cash left after the business has paid its operating costs, tax and interest, funded the investment it has committed to, and settled the net movement on its debt.",
        },
        {
          kind: "formula",
          name: "Dividend capacity (free cash flow to equity)",
          expr:
            "FCFE = Profit after tax + non-cash charges − investment in non-current assets − increase in working capital + net new borrowing + dividends received from subsidiaries (after all taxes)",
          note:
            "Start from the parent's own operating results, then add what actually arrives from subsidiaries. Depreciation is added back because it consumed no cash; the capital expenditure line is the real cash the assets cost this year.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The two mistakes that cost most of the marks",
          md: "First, adding the subsidiary's **whole profit** rather than the dividend it actually remits net of tax — the parent cannot distribute cash that never arrived. Second, forgetting **net new borrowing**: cash raised from lenders is available for distribution, and cash used to repay them is not, so both directions belong in the computation.",
        },
        {
          kind: "example",
          title: "Kestrel Holdings — full dividend capacity",
          scenario:
            "Kestrel (home currency $) has parent operating profit of $120m before tax at 25%, depreciation of $40m, committed capital expenditure of $70m, a $12m increase in working capital, and $25m of net new debt drawn. Its subsidiary Solano earns pre-tax profit of S$75m, taxed locally at 20%, and remits 60% of post-tax profit as a dividend. Withholding tax is 10% and the exchange rate is S$1.80 per $1. Kestrel's home rate on foreign dividends is 25%, with credit for foreign tax suffered.",
          steps: [
            { label: "Parent post-tax profit", detail: "120 × (1 − 0.25) = $90m." },
            { label: "Parent free cash flow", detail: "90 + 40 (depreciation) − 70 (capital expenditure) − 12 (working capital) + 25 (net new borrowing) = $73m." },
            { label: "Subsidiary dividend", detail: "Post-tax profit S$75m × 0.80 = S$60m; remitted 60% = S$36m." },
            { label: "Withholding tax", detail: "S$36m × 10% = S$3.6m, leaving S$32.4m." },
            { label: "Additional home tax?", detail: "The dividend carries underlying tax of 60% × S$15m = S$9m plus S$3.6m withheld = S$12.6m on gross profits of 60% × S$75m = S$45m, an effective 28%. That exceeds the 25% home rate, so no further tax is due (the excess credit is simply lost)." },
            { label: "Translate and total", detail: "S$32.4m ÷ 1.80 = $18.0m. Dividend capacity = 73 + 18 = $91m." },
          ],
          result:
            "$91m is the ceiling, not the recommendation — and the $25m of new borrowing inside it means $91m can only be paid by having financed part of the year's activity with debt.",
        },
        {
          kind: "text",
          md: "Note the last point, because it is where the judgement marks sit. A capacity figure inflated by new borrowing is not the same as one generated by trading. Always comment on the **quality** of the capacity: how much came from operations, how much from borrowing, and how much from a subsidiary whose remittance the parent does not fully control.",
        },
        {
          kind: "activity",
          title: "Test the sensitivity that matters",
          prompt:
            "In the Kestrel example, the local currency weakens from S$1.80 to S$2.10 per $1 and Solano reduces its payout ratio from 60% to 40%. What happens to dividend capacity?",
          answer:
            "Both changes hit the same line. The dividend becomes S$60m × 40% = S$24m, less 10% withholding = S$21.6m, translated at 2.10 = $10.3m rather than $18.0m. Dividend capacity falls from $91m to about $83.3m — a drop of roughly 8.5% from two changes neither of which touched the parent's own trading at all. The point for the board is that a material part of the group's distributable cash depends on a payout decision taken in another jurisdiction and on an exchange rate, so committing to a dividend at the top of the range exposes the parent to a shortfall it cannot fix through its own operations. In practice that argues for setting the ordinary dividend on the parent's own free cash flow and treating remittances as the source of any special distribution.",
        },
      ],
      check: {
        q: "A parent's own free cash flow is $60m. Its subsidiary earns post-tax profit of $50m but remits only $15m, of which $1.5m is lost to withholding tax. What is the dividend capacity?",
        options: [
          "$110m — parent free cash flow plus the subsidiary's post-tax profit",
          "$73.5m — parent free cash flow plus the dividend actually received net of withholding tax",
          "$75m — parent free cash flow plus the remitted dividend before withholding tax",
          "$60m — only the parent's own cash counts",
        ],
        correct: 1,
        explain:
          "Only cash that reaches the parent can be distributed by it: $60m + ($15m − $1.5m) = $73.5m. Option 0 counts profits retained in the subsidiary that the parent has not received, which is the commonest error. Option 2 ignores tax deducted at source, and option 3 wrongly excludes a remittance that did arrive.",
      },
    },
    {
      id: "remittances",
      heading: "Getting the cash home",
      blocks: [
        {
          kind: "text",
          md: "A dividend is only one of the routes by which cash moves from a subsidiary to a parent, and the syllabus expects you to know the alternatives and their tax consequences — because the choice of route changes how much arrives.",
        },
        {
          kind: "table",
          caption: "Routes for repatriating cash, and their characteristics",
          head: ["Route", "Nature", "Tax and practical points"],
          rows: [
            ["Dividend", "Distribution of post-tax profit", "Withholding tax; requires distributable profits; often the route restricted first by exchange controls"],
            ["Royalty", "Payment for use of intellectual property", "Deductible locally, so it reduces local tax; must reflect a real licence at an arm's length rate"],
            ["Management charge", "Payment for services provided by the centre", "Deductible if the service is real and priced at arm's length; heavily scrutinised"],
            ["Interest on intra-group loan", "Return on capital lent rather than subscribed", "Deductible locally, subject to thin capitalisation limits; withholding tax may apply"],
            ["Transfer price on goods", "Price charged on intra-group trade", "Moves profit continuously rather than periodically; the most closely policed route"],
            ["Loan repayment", "Return of principal", "Not income, so generally no tax — but only available if the funding was structured as debt at the outset"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The structure decision comes first",
          md: "Several of these routes exist only if the original investment was structured with them in mind — a loan can be repaid only if capital went in as a loan, and a royalty can be charged only if the intellectual property is genuinely held at the centre. This is why the syllabus asks about remittance timing at the **planning** stage, not as a later fix.",
        },
        {
          kind: "text",
          md: "**Timing** is the other lever the syllabus names. Where a currency is expected to weaken, remitting earlier preserves value; where a treaty rate is due to change, or a tax holiday to expire, the calendar matters. Leading and lagging intra-group payments is legitimate treasury practice within the limits local rules allow — and is one of the first things exchange controls restrict.",
        },
      ],
      check: {
        q: "A subsidiary in a high-tax jurisdiction is funded entirely by share capital from the parent. Which limitation does this create?",
        options: [
          "The subsidiary cannot pay dividends until it is profitable for three years",
          "There is no intra-group loan, so cash cannot be returned tax-efficiently as interest or as repayment of principal — every remittance must be a distribution of post-tax profit or a charge for a real service",
          "The parent cannot consolidate the subsidiary",
          "Withholding tax does not apply to equity-funded subsidiaries",
        ],
        correct: 1,
        explain:
          "Funding structure determines the routes available later. Equity in means dividends out, which are paid from profit already taxed locally and are then usually subject to withholding tax. A debt element — within thin capitalisation limits — would have allowed deductible interest and untaxed repayment of principal. The other options describe rules that do not exist.",
      },
    },
    {
      id: "transfer-pricing",
      heading: "Transfer pricing: where profit is recognised, and who decides",
      blocks: [
        {
          kind: "text",
          md: "A transfer price is the price charged when one group entity supplies another. It has no effect on consolidated profit, since it cancels on consolidation — but it determines **where** profit is recognised, and therefore where tax is paid, how much cash sits in each entity, and how each subsidiary's performance appears.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "The same transaction at two transfer prices",
            data: {
              leftTitle: "High transfer price",
              rightTitle: "Low transfer price",
              rows: [
                { aspect: "Profit recognised in", left: "Supplying entity", right: "Receiving entity" },
                { aspect: "Tax paid where", left: "Supplier's jurisdiction", right: "Receiver's jurisdiction" },
                { aspect: "Cash accumulates in", left: "Supplier", right: "Receiver" },
                { aspect: "Performance appears better for", left: "Supplying manager", right: "Receiving manager" },
                { aspect: "Consolidated profit", left: "Unchanged", right: "Unchanged" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Two motives compete, and confusing them is a classic error. The **tax motive** pushes profit toward low-tax jurisdictions and is constrained by law. The **management motive** wants a price that measures each division fairly and motivates the right decisions — and the price that does that is rarely the one that minimises tax. A group that sets transfer prices purely for tax will find its divisional performance measures meaningless, and managers making decisions that damage the group because their own reported result improves.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The constraints on transfer pricing",
          items: [
            "**The arm's length principle** — the price must be what independent parties would agree; tax authorities can adjust it and impose penalties if not",
            "**Documentation** — contemporaneous evidence supporting the method chosen is required in most jurisdictions, and its absence is itself penalised",
            "**Double taxation** — an adjustment in one country without a corresponding adjustment in the other means the same profit is taxed twice, and relief takes years",
            "**Customs duty** — a higher transfer price on physical goods raises duty payable, which can offset the tax saving entirely",
            "**Reputation** — aggressive structures that are legal can still be commercially and politically costly once public",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Do not recommend the tax-driven price",
          md: "An AFM answer that recommends setting transfer prices to shift profit into a low-tax jurisdiction, without addressing the arm's length requirement, fails on both technical and ethical grounds. State the commercial basis for the price, note the documentation requirement, and flag that a pattern with no commercial rationale invites adjustment, penalties and reputational damage.",
        },
        {
          kind: "text",
          md: "Finally, connect this back to dividend capacity, which is why the two sit in the same syllabus subsection. Transfer prices decide how much profit — and therefore how much distributable cash — accumulates in each entity. A policy that leaves profit in a subsidiary facing exchange controls has produced group profit the parent cannot use, while a policy that concentrates it at the centre may fail the arm's length test. The planning question is where the group **needs** the cash, tested against where it can legitimately be recognised.",
        },
      ],
      check: {
        q: "A group sets transfer prices to move profit into its lowest-tax subsidiary. Which consequence is most likely to be overlooked in the appraisal?",
        options: [
          "Consolidated profit will fall",
          "The tax authority in the higher-tax country may adjust the prices and levy penalties, customs duty may rise on the goods, and divisional performance measures cease to reflect real performance",
          "The group will be unable to prepare consolidated accounts",
          "Withholding tax rates will automatically increase",
        ],
        correct: 1,
        explain:
          "The overlooked costs are the offsetting ones: adjustment and penalty risk where the pricing cannot be defended as arm's length, higher duty on goods valued higher at the border, and the internal damage from performance measures that no longer mean anything. Consolidated profit is unaffected by transfer prices, which is precisely why the tax and control consequences are the whole story.",
      },
    },
  ],
  examTraps: [
    { trap: "Adding a subsidiary's full post-tax profit to dividend capacity.", fix: "Add only the dividend actually remitted, after withholding tax and any additional home-country tax." },
    { trap: "Omitting net new borrowing from free cash flow to equity.", fix: "Cash drawn is available and cash repaid is not — include the net movement in both directions." },
    { trap: "Presenting the capacity figure as the recommended dividend.", fix: "Comment on its quality: how much is operational, how much borrowed, how much dependent on a remittance decision taken abroad." },
    { trap: "Recommending transfer prices chosen to minimise tax.", fix: "Anchor on the arm's length principle, note the documentation requirement, and flag adjustment, duty and reputational risk." },
  ],
  keyTerms: [
    { term: "Dividend capacity", def: "The maximum a parent could distribute in a period without additional borrowing, measured as free cash flow to equity including remittances actually received." },
    { term: "Free cash flow to equity", def: "Cash generated after operating costs, tax, interest, investment in assets and working capital, and the net movement on borrowings — the cash genuinely available to shareholders." },
    { term: "Withholding tax", def: "Tax deducted at source in the paying country from a dividend, interest or royalty remitted abroad, often reduced by a double tax treaty." },
    { term: "Arm's length principle", def: "The requirement that prices charged between related entities be those that independent parties dealing at arm's length would have agreed." },
  ],
  summary: [
    "Dividend capacity is free cash flow to equity from the parent's viewpoint, not consolidated profit.",
    "Add only remittances that actually arrive, net of withholding and any additional home tax; include net new borrowing.",
    "The route home — dividend, royalty, interest, loan repayment — is fixed largely by how the investment was structured.",
    "Transfer prices decide where profit, tax and cash sit; the arm's length principle, duty and divisional motivation all constrain them.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is depreciation added back in the dividend capacity computation?", a: "It reduces reported profit but consumes no cash; the real cash cost of assets appears separately as the year's capital expenditure." },
    { q: "When is no additional home-country tax due on a foreign dividend?", a: "When the total foreign tax suffered — underlying tax plus withholding — already equals or exceeds the home rate applied to the grossed-up profits; any excess credit is generally lost." },
    { q: "Why does transfer pricing not affect consolidated profit?", a: "The charge is income to one group entity and cost to another, so it cancels on consolidation — what changes is where profit, tax and cash are located." },
  ],
  furtherStudy: [
    "AFM-08 covers the remittance restrictions and structural constraints this computation operates under.",
    "AFM-02 sets the distribution policy that the capacity figure informs.",
    "Area B forecasts free cash flow and free cash flow to equity for valuation purposes, using the same building blocks.",
  ],
}

export const AFM_TREE_AREA_A_PART2: StudyChapter[] = [AFM_TREE_05, AFM_TREE_06, AFM_TREE_07, AFM_TREE_08, AFM_TREE_09]
