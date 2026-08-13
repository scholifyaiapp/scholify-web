/*
 * FM Areas A and B — the financial management function and its environment.
 *
 * These chapters are mostly examined through objective-test cases and short
 * discussion requirements. The route is therefore twofold: numerical questions
 * name the distractor produced by each plausible slip, while discussion plans
 * move from the scenario fact to its financial consequence and then to a
 * justified action. Definitions alone do not answer an FM scenario.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const FM_PLANS_AB: ExamPlanMap = {
  /* ── FM-01 · The financial management function ─────────────────────────── */

  "FM-01::what-fm-is": {
    title: "Distinguishing financial management from accounting",
    format: "ot",
    marks: 2,
    requirement:
      "Which activity is part of financial management rather than financial accounting or management accounting?\n\nA Preparing an IFRS statement of financial position\nB Comparing actual production cost with a flexed budget\nC Choosing whether a new factory should be financed by debt or equity\nD Calculating the historical cost of inventory for the annual accounts",
    plan: [
      {
        step: "Classify by the decision being made",
        detail:
          "Financial management is forward-looking and concerns investment, financing and dividend decisions. Financial accounting reports externally under rules; management accounting supplies internal planning and control information.",
      },
      {
        step: "Eliminate the reporting and control tasks",
        detail:
          "An IFRS statement and inventory valuation are regulated financial-reporting tasks. A flexed-budget comparison is internal performance control, so it belongs to management accounting even though a manager uses it.",
      },
      {
        step: "Confirm the surviving finance decision",
        detail:
          "Debt versus equity decides how a future investment will be funded. That is the financing decision, one of financial management's three linked decisions, and is therefore the only valid option.",
      },
    ],
    answer:
      "**C — choosing whether the factory should be financed by debt or equity.** This is a forward-looking **financing decision**, so it belongs to financial management. **A** and **D** are financial accounting: both contribute to regulated external statements and describe what has already happened. **B** is management accounting because flexed-budget variance analysis supports internal planning and control. The distractor is the word *management*: an activity performed for managers is not automatically financial management.",
    earns: [
      "Classifying the debt-or-equity choice as a financing decision",
      "Using purpose and time focus to distinguish the three disciplines",
    ],
    loses: [
      "Selecting flexed-budget control merely because managers use it",
      "Treating every task involving money as financial management",
    ],
  },

  "FM-01::three-decisions": {
    title: "Tracing the three financial decisions through one proposal",
    format: "written",
    marks: 10,
    requirement:
      "A company is considering a major expansion. Explain the investment, financing and dividend decisions involved, and discuss why the board cannot take the three decisions independently. (10 marks)",
    plan: [
      {
        step: "Allocate the marks before defining anything",
        detail:
          "Use about six marks for the three decisions — definition plus application for each — and four marks for links between them. Three isolated textbook definitions cannot earn the interdependence marks.",
      },
      {
        step: "Apply each decision to the expansion",
        detail:
          "Investment asks whether the project's risk-adjusted returns create value. Financing chooses debt, new equity or retained earnings. Dividend policy decides how much current return can be retained rather than paid out.",
      },
      {
        step: "Trace the cash link in both directions",
        detail:
          "A higher dividend reduces retained finance and increases the external funding need. More debt raises gearing and financial risk; new equity may dilute control. Either choice may change the relevant cost of capital.",
      },
      {
        step: "Close on wealth, not on three labels",
        detail:
          "Recommend the combination whose project cash flows, financing cost and payout consequences maximise shareholder wealth. A positive project can still be unaffordable, while a low-cost funding choice can still be unsuitable for its risk.",
      },
    ],
    answer:
      "The **investment decision** is whether the expansion's future cash flows justify the funds committed, allowing for timing and risk. The board should accept an investment only if it is expected to add shareholder wealth, normally shown by a positive NPV.\n\nThe **financing decision** is how to obtain the required funds — retained earnings, debt or new equity — and in what mixture. Debt may be cheaper and avoids ownership dilution, but increases fixed interest commitments and financial risk. New equity reduces default pressure but may be expensive and can dilute control.\n\nThe **dividend decision** is how much profit to distribute and how much to retain. Retention is a source of finance, but shareholders may value a stable cash return.\n\nThe decisions interlock. A larger dividend leaves less retained cash, increasing the debt or equity required. Extra debt changes gearing and may increase the cost of equity and the project's discount rate; an equity issue affects control and earnings per share. Conversely, valuable investment opportunities justify retention, while a company without positive-NPV projects should not retain cash merely to expand. The board must choose the combined investment, funding and payout policy that maximises wealth, not optimise each decision in isolation.",
    earns: [
      "Applying all three decisions to the same expansion rather than giving bare definitions",
      "Tracing dividend retention into the external finance need and then into risk and cost of capital",
      "Concluding with shareholder wealth as the common objective",
    ],
    loses: [
      "Writing three independent definitions and omitting their interaction",
      "Assuming debt is automatically best because its stated interest rate is lower",
      "Treating retained earnings as free finance with no shareholder opportunity cost",
    ],
  },

  "FM-01::strategy-levels": {
    title: "Matching finance decisions to strategic level",
    format: "mtq",
    marks: 10,
    requirement:
      "For each of five decisions made by a manufacturing company, identify whether it is strategic, tactical or operational and explain how the financial decision supports corporate strategy. The decisions include acquiring a competitor, setting a two-year borrowing mix, approving annual divisional capital budgets, managing next month's cash shortfall and changing daily credit-control procedures. (10 marks)",
    plan: [
      {
        step: "Fix the hierarchy before reading the examples",
        detail:
          "Strategic decisions set long-term direction and are board-level; tactical decisions translate strategy into medium-term plans and resource allocations; operational decisions execute those plans through short-term, recurring activity.",
      },
      {
        step: "Use time, scope and reversibility together",
        detail:
          "Do not classify on time alone. An acquisition changes the whole organisation and is hard to reverse; a capital budget allocates resources within an approved direction; cash and credit control keep daily activity functioning.",
      },
      {
        step: "Pair each label with a reason",
        detail:
          "Each two-mark task needs both the classification and the feature that proves it. A correct label with no link to organisational scope or implementation risks only half the available credit.",
      },
      {
        step: "Check that finance serves the corporate aim",
        detail:
          "The finance strategy is not separate from corporate strategy: acquisitions, funding capacity, divisional investment and liquidity must all support the chosen markets, risk appetite and growth objective.",
      },
    ],
    answer:
      "**Acquiring a competitor — strategic.** It changes the company's long-term market position, commits substantial resources and is difficult to reverse.\n\n**Setting a two-year borrowing mix — tactical.** It translates the board's risk and growth strategy into a medium-term funding plan, balancing cost, maturity and covenant capacity.\n\n**Approving annual divisional capital budgets — tactical.** It allocates scarce resources among divisions so the strategic priorities can be implemented. Individual exceptionally large projects may still require strategic board approval.\n\n**Managing next month's cash shortfall — operational.** It is a short-term liquidity action within the approved treasury policy, such as drawing an agreed overdraft or rescheduling cash flows.\n\n**Changing daily credit-control procedures — operational.** It concerns recurring execution: invoice follow-up, credit checks and collection.\n\nThe common trap is to call every decision involving a large sum *strategic*. Size matters, but scope, time horizon and reversibility decide the level. Financial strategy must provide the investment capacity and risk control required by corporate strategy; tactical budgets and operational treasury then make that strategy workable.",
    earns: [
      "Classifying all five decisions with an applied reason",
      "Distinguishing resource allocation from daily execution",
      "Explaining that financial strategy supports rather than competes with corporate strategy",
    ],
    loses: [
      "Using the amount of cash as the only classification test",
      "Calling an annual budget operational merely because it recurs",
      "Giving labels without explaining scope, horizon or reversibility",
    ],
  },

  /* ── FM-02 · Financial objectives and shareholder wealth ──────────────── */

  "FM-02::wealth-not-profit": {
    title: "Choosing wealth maximisation over reported profit",
    format: "ot",
    marks: 2,
    requirement:
      "Which statement best explains why maximising shareholder wealth is preferred to maximising accounting profit as a corporate financial objective?\n\nA Wealth maximisation ignores dividends and considers only the current share price\nB Profit automatically adjusts for the timing and risk of future cash flows\nC Market value reflects expected cash flows, their timing and risk, whereas accounting profit does not fully do so\nD Wealth maximisation guarantees that every stakeholder receives the return they want",
    plan: [
      {
        step: "Identify what profit leaves out",
        detail:
          "Accounting profit is period-based, affected by accounting policy and does not by itself price the timing or risk of future returns. It can rise while value falls if the gain is late or unusually risky.",
      },
      {
        step: "State what shareholder return contains",
        detail:
          "Shareholder wealth is the market value of shares, supported by expected future dividends and price gains. The market discounts expected cash flows for both time and risk, however imperfectly.",
      },
      {
        step: "Eliminate absolute claims",
        detail:
          "Wealth includes dividends, so A is inverted. Profit does not automatically adjust for risk, so B is false. Maximising one group's wealth cannot guarantee every stakeholder's preferred outcome, eliminating D.",
      },
    ],
    answer:
      "**C — market value reflects expected cash flows, timing and risk.** Shareholder wealth is the value of the shares held plus distributions received. That value depends on expectations of future cash flows and the return investors require for their timing and risk. Accounting profit is historic, depends on policies such as depreciation and may reward a late, risky return like an early, certain one. **A** wrongly excludes dividends; **B** attributes discounted-cash-flow qualities to profit; **D** confuses the primary corporate objective with guaranteed stakeholder satisfaction.",
    earns: [
      "Contrasting expected risk-adjusted cash flows with accounting profit",
      "Recognising that shareholder return includes dividends and capital gain",
    ],
    loses: [
      "Assuming a higher reported profit must mean higher value",
      "Claiming wealth maximisation removes all stakeholder conflict",
    ],
  },

  "FM-02::shareholder-ratios": {
    title: "Reading shareholder-return ratios without mixing their bases",
    format: "mtq",
    marks: 10,
    requirement:
      "Tern Co has 4 million shares in issue. Profit after tax is $1.2 million, dividends are $360,000, the current share price is $2.40 and the price one year ago was $2.10. Calculate earnings per share, dividend per share, dividend yield, price/earnings ratio and total shareholder return for the year. (10 marks)",
    plan: [
      {
        step: "Write each ratio's numerator and denominator",
        detail:
          "EPS and dividend per share divide company totals by the number of shares. Dividend yield divides dividend per share by CURRENT price. The P/E ratio divides current price by EPS, never the reverse.",
      },
      {
        step: "Keep cents and dollars consistent",
        detail:
          "Convert EPS and dividend per share to the same unit as the share price before dividing. Using 30 cents against $2.40 as though both were dollars makes the P/E one hundred times too small.",
      },
      {
        step: "Build total return from both components",
        detail:
          "Total shareholder return uses the dividend received during the year plus the price increase, divided by the opening share price. Dividend yield alone omits the capital gain.",
      },
      {
        step: "Sense-check the five outputs",
        detail:
          "Payout per share must be below earnings per share here; yield and return are percentages; P/E is a multiple. A result with the wrong unit usually exposes the wrong denominator.",
      },
    ],
    answer:
      "| Measure | Working | Result |\n|---|---:|---:|\n| EPS | $1.2m / 4m | **$0.30 or 30 cents** |\n| Dividend per share | $0.36m / 4m | **$0.09 or 9 cents** |\n| Dividend yield | $0.09 / $2.40 | **3.75%** |\n| P/E ratio | $2.40 / $0.30 | **8 times** |\n| Total shareholder return | ($0.09 + $2.40 − $2.10) / $2.10 | **18.57%** |\n\nThe 18.57% total return consists of a 14.29% capital gain and a 4.29% dividend return measured against the **opening** price. The common distractors are **12.5%** for the inverted EPS/price calculation presented as a P/E, **4.29%** for using the opening rather than current price in dividend yield, and **14.29%** for omitting the dividend from total shareholder return.",
    earns: [
      "Using the correct price base for each ratio",
      "Keeping cents and dollars consistent in the P/E calculation",
      "Including both dividend and capital gain in total shareholder return",
    ],
    loses: [
      "Inverting price and earnings to produce a percentage instead of a multiple",
      "Calling the capital gain alone total shareholder return",
      "Dividing company-wide profit or dividend directly by the share price",
    ],
  },

  "FM-02::targets": {
    title: "Designing financial targets that do not destroy value",
    format: "written",
    marks: 10,
    requirement:
      "A board proposes targets of 12% annual profit growth, a 20% return on capital employed and no increase in debt. Discuss the benefits and limitations of these targets as a means of achieving shareholder wealth maximisation. (10 marks)",
    plan: [
      {
        step: "Use five balanced points for ten marks",
        detail:
          "For each target, explain one useful behaviour and one possible dysfunctional consequence. A list of advantages or criticisms alone does not satisfy a requirement to discuss.",
      },
      {
        step: "Test alignment with value drivers",
        detail:
          "Ask whether the measure captures cash flow, timing, risk and the cost of capital. Profit growth and ROCE can be useful signals but are accounting measures and can conflict with positive-NPV investment.",
      },
      {
        step: "Use the scenario's absolute financing constraint",
        detail:
          "No increase in debt may control financial risk, yet it may reject valuable projects or force an expensive equity issue. The right gearing level depends on cash-flow stability and financing capacity, not a zero-change rule.",
      },
      {
        step: "Recommend a coherent target set",
        detail:
          "Retain clear, measurable milestones but add NPV/value creation, cash generation, risk limits and relevant non-financial drivers. Targets need time horizons, responsibility and periodic review rather than mechanical pursuit.",
      },
    ],
    answer:
      "Targets translate a broad objective into measurable performance and can coordinate managers. Profit growth encourages revenue growth and cost control, while ROCE discourages investment in assets that earn very little. A debt limit can preserve covenant headroom and protect the company when cash flows are volatile.\n\nHowever, none is shareholder wealth. **Profit growth** ignores cash timing and risk, is influenced by accounting policy and can be bought through value-destroying acquisition. **ROCE** encourages managers to reject a positive-NPV project whose initial return is below the division's existing average, even when it earns more than the cost of capital. It can also be increased by delaying necessary asset replacement. **No increase in debt** ignores the tax benefit and potentially lower cost of suitable borrowing; it may leave a valuable project unfunded. Conversely, pursuing profit growth with unrestricted debt could raise distress risk.\n\nThe board should use a balanced set: positive NPV and cash generation as value measures; ROCE and profit growth as supporting performance indicators; gearing, interest cover and liquidity as risk constraints; and operational drivers such as customer retention and project delivery. Targets should be challenging but attainable, time-specific, assigned to responsible managers and revised when conditions change. That keeps the targets as means to wealth creation rather than ends in themselves.",
    earns: [
      "Balancing the benefit and dysfunctional behaviour of each stated target",
      "Explaining why ROCE can reject a project that earns above the cost of capital",
      "Recommending value, cash, risk and non-financial measures as a coherent set",
    ],
    loses: [
      "Treating profit growth as identical to wealth creation",
      "Criticising debt without considering tax, cost and financing capacity",
      "Listing SMART terminology without applying it to the proposed targets",
    ],
  },

  /* ── FM-03 · Stakeholders, agency and not-for-profit objectives ───────── */

  "FM-03::stakeholders": {
    title: "Resolving stakeholder conflict from a finance proposal",
    format: "mtq",
    marks: 10,
    requirement:
      "A profitable manufacturer plans to close a local plant, automate production elsewhere and finance the project with additional borrowing. For five stakeholder groups, identify the objective affected and explain one likely conflict or response. (10 marks)",
    plan: [
      {
        step: "Take one scenario fact into each pair",
        detail:
          "Use five two-mark pairs: name the stakeholder's objective and apply a specific plant-closure, automation or borrowing consequence. Generic lists of stakeholders leave the application mark unearned.",
      },
      {
        step: "Separate fixed claims from residual claims",
        detail:
          "Lenders want interest and principal protected, whereas shareholders receive the residual return and may accept more risk. Extra debt can therefore please shareholders through leverage while worrying lenders through weaker covenant headroom.",
      },
      {
        step: "Identify operational stakeholders",
        detail:
          "Employees value security and conditions; customers value reliable quality and price; suppliers value continuing orders and prompt payment; the local community and government care about employment, tax and external effects.",
      },
      {
        step: "Finish with management of conflict",
        detail:
          "Acknowledge that shareholder wealth remains the corporate financial objective, but consultation, compensation, retraining, covenants and staged implementation can protect relationships on which long-term value depends.",
      },
    ],
    answer:
      "**Shareholders** seek sustainable dividends and capital growth. Automation may improve future cash flows, but extra borrowing raises financial risk and the closure may damage reputation.\n\n**Employees** seek pay, security and safe work. Plant employees face redundancy; the company can consult early, offer fair compensation and fund retraining or relocation.\n\n**Lenders** require interest, repayment and covenant compliance. Additional debt weakens their margin of safety, so they may demand security, covenants or a higher rate. This conflicts with shareholders, who receive the upside from leverage while lenders' return is capped.\n\n**Customers** want price, quality and continuity. Automation may reduce cost and defects, but transfer disruption could delay supply; dual running and quality testing can reduce that risk.\n\n**Suppliers and the local community/government** want continuing orders, prompt payment, employment and tax revenue. The closure removes local activity and may trigger political or reputational pressure. Transitional purchasing and redevelopment support may preserve goodwill.\n\nStakeholder management is not a substitute objective that gives every group a veto. It protects the relationships, licence to operate and cash flows that make long-term shareholder wealth possible.",
    earns: [
      "Five stakeholder-objective pairs applied to facts in the scenario",
      "Explaining the risk conflict between lenders and residual shareholders",
      "Proposing responses that protect long-term cash flows rather than merely naming conflict",
    ],
    loses: [
      "Listing stakeholder groups without their objective or scenario effect",
      "Assuming all shareholders welcome additional borrowing regardless of risk",
      "Claiming stakeholder interests can all be maximised simultaneously",
    ],
  },

  "FM-03::agency": {
    title: "Diagnosing and controlling an agency problem",
    format: "written",
    marks: 10,
    requirement:
      "The directors of Merrow Co receive bonuses based on revenue growth. They propose a large acquisition financed by debt, although its forecast return is below the company's cost of capital. Explain the agency problem and discuss controls shareholders could use. (10 marks)",
    plan: [
      {
        step: "Define the relationship through this fact pattern",
        detail:
          "Shareholders are principals and directors are agents with delegated decision authority. Information asymmetry and different objectives let directors pursue revenue and organisational size even when the acquisition destroys value.",
      },
      {
        step: "Name the agency costs visible here",
        detail:
          "The below-hurdle acquisition is a residual loss; monitoring includes audit, reporting and oversight; bonding includes contractual promises and incentive design. Linking terms to the proposal earns more than reciting definitions.",
      },
      {
        step: "Design controls around the cause",
        detail:
          "Replace revenue-only bonuses with long-term value measures, defer rewards and use share ownership or clawback. Require independent board approval, transparent NPV disclosure and shareholder approval where material.",
      },
      {
        step: "Evaluate each control's own cost",
        detail:
          "Monitoring is not free, share-based pay may encourage manipulation or excessive risk, and takeover discipline acts only after damage is visible. Recommend a package rather than claiming one mechanism removes agency conflict.",
      },
    ],
    answer:
      "An **agency relationship** exists because shareholders delegate control of their capital to directors. The parties have different objectives and directors possess better information. Here, a bonus based on revenue rewards company size rather than value. Directors can gain pay, status and job security from an acquisition whose return is below the cost of capital, while shareholders bear the negative NPV and extra financial risk.\n\nThe value lost from taking the project is a **residual agency loss**. Accounts, audit, independent directors and appraisal reviews are **monitoring costs**; contractual commitments by management are **bonding costs**.\n\nControls should target the faulty incentive. Bonuses could depend on long-term total shareholder return or economic value after a cost-of-capital charge, be deferred and subject to clawback. Directors could hold shares, but with diversification and sale restrictions so they do not simply manipulate a short-term price. An independent board committee should review the cash-flow assumptions and require a properly calculated NPV; material acquisitions may require shareholder approval and transparent disclosure. Audit, governance codes, the market for managerial labour and the threat of takeover provide further discipline.\n\nNo control is free. Heavy monitoring is costly, options may encourage excessive risk, and shareholder votes suffer from dispersed ownership and limited information. A combination of value-based incentives, independent challenge and disclosure is more credible than revenue growth alone.",
    earns: [
      "Linking the directors' revenue bonus to the negative-NPV acquisition",
      "Distinguishing monitoring, bonding and residual agency loss with scenario examples",
      "Evaluating limitations of the proposed controls",
    ],
    loses: [
      "Defining agency without applying the conflict to the acquisition",
      "Recommending more bonus pay without changing the performance measure",
      "Presenting governance mechanisms as costless or complete solutions",
    ],
  },

  "FM-03::reward-and-regulation": {
    title: "Selecting an incentive that aligns with shareholder value",
    format: "ot",
    marks: 2,
    requirement:
      "Which remuneration arrangement is most likely to reduce, rather than intensify, the agency problem?\n\nA An annual bonus based only on this year's revenue\nB Share options exercisable immediately after the annual results announcement\nC A deferred award based on three-year total shareholder return, subject to clawback and an independent remuneration committee\nD A fixed salary set solely by the chief executive",
    plan: [
      {
        step: "Test the performance horizon",
        detail:
          "A one-year revenue target rewards scale and can be increased through unprofitable sales or acquisitions. Immediate options invite short-term price management around the exercise date.",
      },
      {
        step: "Test governance and downside",
        detail:
          "Independent oversight constrains self-awarded pay, deferral exposes managers to later outcomes, and clawback recovers rewards when results were misstated or proved unsustainable.",
      },
      {
        step: "Choose alignment, not maximum variability",
        detail:
          "The best answer ties reward to long-term shareholder return while retaining challenge and downside. Variable pay alone does not align interests if its metric or timing is defective.",
      },
    ],
    answer:
      "**C — a deferred three-year total-shareholder-return award with clawback and independent oversight.** Its measure is close to the shareholder objective, its horizon discourages a one-period boost, clawback creates downside and an independent committee limits directors setting their own rewards. **A** rewards revenue even when margin or NPV is poor. **B** concentrates attention on a single short-term share price. **D** lacks independent governance and creates no performance link. The distractor is the belief that any share option automatically aligns interests; timing and conditions determine whether it does.",
    earns: [
      "Selecting a long-term value-based measure with independent control",
      "Recognising the purpose of deferral and clawback",
    ],
    loses: [
      "Equating revenue growth with shareholder wealth",
      "Assuming immediately exercisable options cannot encourage short-term manipulation",
    ],
  },

  "FM-03::not-for-profit": {
    title: "Assessing value for money in a not-for-profit body",
    format: "written",
    marks: 10,
    requirement:
      "A public health charity reports that spending was within budget and the number of clinics operated increased by 20%. Explain why profit is unsuitable as its primary objective and assess its performance using economy, efficiency and effectiveness. (10 marks)",
    plan: [
      {
        step: "Allocate two marks to the objective issue",
        detail:
          "Explain that the charity has no residual owners and exists to deliver a health mission under funding constraints. A surplus supports continuity but is a constraint and source of future capacity, not the final objective.",
      },
      {
        step: "Use the three Es in causal order",
        detail:
          "Economy asks what inputs cost and whether suitable quality was bought cheaply; efficiency links inputs to outputs; effectiveness asks whether outputs achieved the intended health outcome. Do not use the three as synonyms.",
      },
      {
        step: "Challenge both reported achievements",
        detail:
          "Being within budget says little about quality or outcomes, and more clinics are an output rather than an outcome. Ask for cost per clinic or patient, utilisation, waiting times and changes in the targeted health condition.",
      },
      {
        step: "Conclude with a balanced scorecard",
        detail:
          "Combine financial stewardship, service quantity, service quality and mission outcomes, with comparisons over time and against peers. One cheap input measure can conceal poor effectiveness.",
      },
    ],
    answer:
      "Profit is unsuitable as the charity's primary objective because it has no shareholders receiving a residual return; it exists to improve public health. It still needs cash, reserves and a sustainable surplus, but these enable the mission rather than define success.\n\n**Economy** concerns acquiring appropriate-quality inputs at the lowest cost. Being within budget may indicate economy, but only if staffing, medicines and facilities were not reduced below a safe quality. Compare unit purchase costs and procurement terms.\n\n**Efficiency** is the relationship between inputs and outputs. A 20% increase in clinics may show improved efficiency if resources rose by less than 20%. Measure cost and staff hours per clinic, cost per patient treated, utilisation and waiting time. The clinic count alone has no input denominator.\n\n**Effectiveness** is achievement of objectives. Clinics are outputs, not the health outcome. The charity needs evidence such as vaccination coverage, treatment completion, reduction in disease incidence and patient outcome or satisfaction, measured for the target population.\n\nPerformance should therefore be judged through a balanced set of financial stewardship, unit costs, service volume, quality and health outcomes, compared with targets, prior years and suitable peers. A service can be economical and efficient yet ineffective if it delivers the wrong intervention.",
    earns: [
      "Distinguishing a necessary surplus from the charity's primary mission",
      "Applying economy, efficiency and effectiveness as three different tests",
      "Separating clinic output from health outcome",
    ],
    loses: [
      "Calling any underspend good performance without testing quality",
      "Treating a higher number of clinics as proof of effectiveness",
      "Defining the three Es without proposing measurable evidence",
    ],
  },

  /* ── FM-19 · The economic environment for business ───────────────────── */

  "FM-19::policy": {
    title: "Tracing policy changes into company cash flows",
    format: "mtq",
    marks: 10,
    requirement:
      "An economy has high inflation and weak growth. For five policy actions or consequences, identify whether fiscal, monetary, exchange-rate or competition policy is involved and explain the likely transmission to a geared consumer-products company. (10 marks)",
    plan: [
      {
        step: "Classify the policy instrument first",
        detail:
          "Fiscal policy changes taxation and government spending; monetary policy changes interest rates, money or credit conditions; exchange-rate policy influences currency value; competition policy constrains market behaviour.",
      },
      {
        step: "Trace instrument to economy to company",
        detail:
          "Use a three-link chain: policy changes demand, financing cost, inflation or currency; that changes sales, margins or debt service; the final effect appears in cash flow, risk or value.",
      },
      {
        step: "Use the company's gearing and customer base",
        detail:
          "Higher rates hurt a geared borrower directly through interest and indirectly through weaker consumer demand. Tax or spending changes matter through disposable income and government demand, not merely through a policy label.",
      },
      {
        step: "Allow for conflicting effects and lags",
        detail:
          "Tighter policy may reduce inflation but also depress near-term revenue; exchange-rate changes help one side of trade and hurt the other. State assumptions rather than giving a direction as universally certain.",
      },
    ],
    answer:
      "A rise in the policy interest rate is **monetary policy**. It raises variable-rate debt service for the geared company and can reduce consumer borrowing and demand; cash flow and interest cover fall, although lower inflation may later stabilise input costs.\n\nA cut in income tax is **fiscal policy**. It increases disposable income and may lift consumer demand, but can increase the budget deficit or inflationary pressure.\n\nReduced government spending is also **fiscal**: aggregate demand and supplier contracts fall, with a multiplier effect through household incomes.\n\nIntervention to support the domestic currency is **exchange-rate policy**, often operating through interest rates or currency purchases. Appreciation makes imported inputs cheaper but exports less competitive and foreign profits worth less when translated.\n\nAction against collusive pricing is **competition policy**. It may constrain margins but can improve market access and reduce supplier power.\n\nThe mark-winning route is not “rates up = bad”. It traces each instrument through demand, financing cost, prices or exchange rates into the particular company's cash flows and risk, while recognising timing and offsetting effects.",
    earns: [
      "Correctly classifying the policy instrument in each task",
      "Completing the transmission chain into company cash flow or risk",
      "Using the company's gearing and consumer exposure",
    ],
    loses: [
      "Naming fiscal or monetary policy without explaining transmission",
      "Assuming a stronger currency is wholly beneficial",
      "Ignoring the lag and demand cost of anti-inflation policy",
    ],
  },

  "FM-19::interest-inflation-currency": {
    title: "Following interest, inflation and exchange-rate effects",
    format: "ot",
    marks: 2,
    requirement:
      "A UK company imports most inputs, exports little and has substantial floating-rate debt. Which combined change is most likely to reduce its short-term cash flow?\n\nA Lower domestic interest rates and appreciation of sterling\nB Higher domestic interest rates and depreciation of sterling\nC Higher domestic interest rates and appreciation of sterling\nD Lower domestic interest rates and depreciation of sterling, with import prices fixed in sterling",
    plan: [
      {
        step: "Split financing from trading exposure",
        detail:
          "Floating-rate debt makes higher rates a direct cash outflow. An importer with little export income is short of foreign currency, so domestic depreciation increases the home-currency cost of inputs.",
      },
      {
        step: "Combine rather than offset the effects",
        detail:
          "Choose the option where both identified exposures move adversely. Appreciation helps an importer, while lower interest rates help a floating-rate borrower, so mixed options contain at least one offset.",
      },
      {
        step: "Read the contractual qualification",
        detail:
          "If import prices are genuinely fixed in sterling, depreciation does not immediately raise that invoice. Objective tests often add such a fact specifically to remove what would otherwise be an adverse exchange effect.",
      },
    ],
    answer:
      "**B — higher rates and sterling depreciation.** Higher domestic rates increase interest paid on the company's floating-rate debt. Sterling depreciation means more pounds are required to buy the foreign currency needed for imported inputs, and the company has little export receipt to offset that exposure. **A** improves both cash-flow channels. **C** raises interest but reduces the sterling cost of imports, so effects oppose each other. In **D**, lower interest helps and the explicit sterling-price clause removes the immediate currency loss. The trap is to discuss the economy generally instead of mapping each change to the company's stated exposures.",
    earns: [
      "Mapping floating-rate debt to interest cash flow and import dependence to currency cash flow",
      "Combining two adverse movements before selecting the option",
    ],
    loses: [
      "Assuming depreciation helps every company because exporters may benefit",
      "Ignoring that the D option fixes the import price in sterling",
    ],
  },

  "FM-19::competition-regulation": {
    title: "Evaluating regulation of a dominant network business",
    format: "written",
    marks: 10,
    requirement:
      "A privately owned water utility is the only supplier in its region and proposes a large price increase to finance infrastructure renewal. Discuss why regulation may be needed and assess price-cap and rate-of-return regulation. (10 marks)",
    plan: [
      {
        step: "Allocate the discussion across the requirement",
        detail:
          "Use about three marks for why market failure exists, three for price-cap regulation, three for rate-of-return regulation and one for an applied conclusion. Do not spend all ten defining monopoly.",
      },
      {
        step: "Tie intervention to the natural monopoly",
        detail:
          "High fixed network costs and impractical duplication create entry barriers. Consumers cannot switch, water is essential and service quality has external health effects, so unchecked pricing can transfer wealth and reduce welfare.",
      },
      {
        step: "Evaluate each mechanism's incentive",
        detail:
          "A price cap can mimic competition and reward efficiency but risks underinvestment or quality cuts. A permitted return supports finance and investment but may reward an inflated asset base and weak cost control.",
      },
      {
        step: "Recommend a financeable safeguard package",
        detail:
          "Balance affordability with the cash needed for renewal through independently verified investment plans, service-quality standards, efficiency sharing and periodic review. Regulation that makes efficient finance impossible harms future consumers.",
      },
    ],
    answer:
      "The utility is a **natural monopoly**: the network has large fixed costs and duplicating it would be inefficient, so entry is unlikely. Water is essential, consumers cannot switch and poor quality creates wider health costs. Without regulation, the company could charge monopoly prices, restrict service or delay maintenance.\n\nA **price cap**, often based on inflation less an expected efficiency factor, limits the tariff path. The company keeps gains from beating the assumed efficiency target until review, giving a cost-control incentive similar to competition. But an unrealistic cap can make a necessary infrastructure programme unfinanceable or encourage cuts in maintenance and service quality. Forecasting efficient costs is difficult.\n\n**Rate-of-return regulation** allows prices that cover efficient cost plus a permitted return on the regulated asset base. It supports long-lived investment and financing confidence. Its weakness is the incentive to overinvest or overstate the asset base and costs, because allowed profit rises with capital employed; efficiency pressure is weaker.\n\nThe regulator should verify the renewal programme, set outcome and leakage standards, allow a reasonable return on efficient investment and share efficiency gains with consumers. Affordability and service quality need explicit protections. The objective is not the lowest immediate tariff, but a fair, financeable price for reliable long-term service.",
    earns: [
      "Explaining the natural-monopoly and essential-service reasons for regulation",
      "Evaluating the incentive created by each regulatory method",
      "Balancing consumer protection with finance for efficient investment",
    ],
    loses: [
      "Assuming a price cap cannot damage service quality or investment",
      "Describing rate-of-return regulation without its overinvestment incentive",
      "Concluding that the lowest possible price is automatically optimal",
    ],
  },

  /* ── FM-20 · Financial markets, institutions and fintech ──────────────── */

  "FM-20::markets": {
    title: "Choosing the correct market and instrument",
    format: "mtq",
    marks: 10,
    requirement:
      "For five financing or investment needs, identify the appropriate money or capital market, primary or secondary market, and suitable instrument. The needs include a three-month cash deficit, a ten-year project, an investor selling listed shares, a bank managing short-term liquidity and a company issuing shares for the first time. (10 marks)",
    plan: [
      {
        step: "Classify first by maturity",
        detail:
          "Money markets deal in short-term funds and instruments, generally up to one year. Capital markets provide longer-term debt and equity. Match financing life to asset life before choosing a named instrument.",
      },
      {
        step: "Then classify by whether funds reach the issuer",
        detail:
          "A primary-market issue raises new money for the issuer. A secondary-market trade transfers an existing security between investors and gives liquidity and price discovery, but no new cash to the original company.",
      },
      {
        step: "Select an instrument that fits the user",
        detail:
          "Commercial paper or a short bank facility can bridge a strong company's deficit; long-term debt or equity funds a durable project; certificates of deposit and interbank deposits manage bank liquidity.",
      },
      {
        step: "Explain the function, not just the label",
        detail:
          "Each task earns its second mark from the reason: maturity match, new funding, liquidity or risk. Calling every exchange trade a capital raising is the standard primary-versus-secondary error.",
      },
    ],
    answer:
      "**Three-month cash deficit:** the **money market**, using a short-term bank facility or commercial paper if the company has the standing to issue it. Short finance matches a temporary need.\n\n**Ten-year project:** the **capital market**, through long-term bonds, a term loan or equity, matching long-lived cash flows and refinancing risk.\n\n**Investor selling listed shares:** the **secondary capital market**. Ownership transfers between investors; the company receives no new funds, but market liquidity makes its securities more attractive and supports valuation.\n\n**Bank managing short-term liquidity:** the **money market**, for example an interbank deposit or negotiable certificate of deposit.\n\n**Company issuing shares for the first time:** the **primary capital market** through an initial public offer; proceeds go to the company, subject to issue costs and listing requirements.\n\nThe two dimensions answer different questions: money versus capital concerns **maturity**, while primary versus secondary concerns whether the security is **newly issued or already held**.",
    earns: [
      "Separating the maturity classification from the issue/trading classification",
      "Matching each need to an instrument and a reason",
      "Explaining the indirect financing benefit of a liquid secondary market",
    ],
    loses: [
      "Calling any transaction in shares a primary-market transaction",
      "Using permanent long-term finance for a predictable three-month fluctuation without evaluation",
      "Naming a market without explaining maturity or cash recipient",
    ],
  },

  "FM-20::intermediation-fintech": {
    title: "Assessing intermediation and fintech funding routes",
    format: "written",
    marks: 10,
    requirement:
      "A small growing company is considering a bank loan, peer-to-peer lending and equity crowdfunding. Explain the role of financial intermediation and discuss the benefits and risks of the three routes. (10 marks)",
    plan: [
      {
        step: "Reserve two marks for intermediation",
        detail:
          "Explain maturity transformation, risk pooling, screening and transaction-cost reduction. A bank does more than stand between saver and borrower; it transforms the characteristics of funds and produces information.",
      },
      {
        step: "Compare the routes on common criteria",
        detail:
          "For each route assess access, price, maturity, security, control, disclosure, speed and repayment risk. Using the same criteria prevents a list of unrelated fintech advantages.",
      },
      {
        step: "Keep debt and equity consequences separate",
        detail:
          "Bank and peer-to-peer funds require servicing and can default; equity crowdfunding has no compulsory repayment but dilutes ownership and exposes information to a large investor base.",
      },
      {
        step: "Conclude from company characteristics",
        detail:
          "A firm with predictable cash flows and security may prefer debt; a risky early-stage firm may need patient equity. Platform access does not remove credit, fraud, cyber or liquidity risk.",
      },
    ],
    answer:
      "A financial intermediary pools savers' funds, assesses borrowers, diversifies credit risk, reduces transaction and information costs, and performs **maturity transformation** by accepting shorter or withdrawable deposits while making longer loans. Monitoring continues after lending.\n\nA **bank loan** offers a known relationship, possible advice and a negotiated maturity. It may be quicker and more private than a public campaign, but the bank may demand security, covenants and a floating rate; repayment is compulsory regardless of performance.\n\n**Peer-to-peer lending** can widen access and produce competitive pricing through a platform. It remains debt: interest and principal are fixed claims. The platform may give less flexibility in distress, investors may demand a high rate for limited information, and operational, cyber, fraud and platform-failure risks remain.\n\n**Equity crowdfunding** avoids compulsory interest and can build a customer community, so it suits uncertain early-stage cash flows. It dilutes control and future returns, needs credible public disclosure, may create many small shareholders and can make later institutional funding harder if governance is untidy.\n\nThe company should compare the full effective cost, covenant and security burden, control dilution, cash-flow resilience and funding horizon. Fintech changes distribution and information processing; it does not make finance free or remove the underlying risk.",
    earns: [
      "Explaining risk pooling, screening and maturity transformation",
      "Comparing all three routes on cash obligation, control and risk",
      "Matching the recommendation to cash-flow predictability and growth stage",
    ],
    loses: [
      "Describing peer-to-peer lending as equity because it uses a platform",
      "Ignoring control dilution in crowdfunding",
      "Claiming fintech removes intermediation or credit risk entirely",
    ],
  },

  "FM-20::money-market-worked": {
    title: "Comparing money-market returns on one annual basis",
    format: "ot",
    marks: 2,
    requirement:
      "A company can invest $980,000 today in a 91-day money-market instrument that will repay $1,000,000. Using a 365-day year and simple annualisation, what is the annualised rate of return?\n\nA 2.00%\nB 2.04%\nC 8.02%\nD 8.19%",
    plan: [
      {
        step: "Measure return against cash invested",
        detail:
          "The 91-day gain is $20,000, but the amount at risk today is $980,000. Dividing by the $1,000,000 redemption value produces a discount yield, not the investor's rate of return.",
      },
      {
        step: "Annualise for the stated day count",
        detail:
          "Use simple annualisation because the requirement says so: multiply the 91-day holding-period return by 365/91. Do not use 91/365, which scales the return down a second time.",
      },
      {
        step: "Match each distractor to its slip",
        detail:
          "2.00% uses redemption value and does not annualise; 2.04% is the unannualised return on cost; 8.02% annualises the discount on redemption value. The remaining answer uses both correct bases.",
      },
    ],
    answer:
      "**D — 8.19%.**\n\nThe 91-day holding-period return is:\n\n$20,000 / $980,000 = **2.0408%**.\n\nAnnualised on the required simple 365-day basis:\n\n(20,000 / 980,000) × (365 / 91) = **8.19%** to two decimals.\n\n**A (2.00%)** divides the gain by the $1,000,000 redemption amount and stops. **B (2.04%)** uses the correct investment base but forgets to annualise. **C (8.02%)** annualises the gain as a discount on redemption value rather than an investor return on cash invested. In a two-mark OT, retain unrounded values until the final answer.",
    earns: [
      "Dividing the gain by the $980,000 cash invested",
      "Applying 365/91 and retaining precision until the final answer",
    ],
    loses: [
      "Stopping at the 91-day holding-period return",
      "Using the redemption amount as the investor's return denominator",
    ],
  },
}
