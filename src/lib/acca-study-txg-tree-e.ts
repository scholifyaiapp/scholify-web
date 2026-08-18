import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX-GLOBAL · Area E — business and corporate taxation. Chapters 14–18.
 *
 * A company is a separate person for tax, and almost every complication in this area comes
 * from that one fact: profits are taxed in the company, taxed again when they reach the
 * owner, and can be moved between related companies at prices the group itself chooses.
 * Separate legal personality is the premise; loss relief, group rules, transfer pricing
 * and the salary-versus-dividend question are all consequences of it.
 *
 * Jurisdiction-neutral. Rates, thresholds, group ownership percentages, loss carry-back
 * windows and thin-capitalisation limits all differ; the structures do not.
 */

/* ── Chapter 14 ────────────────────────────────────────────────── */

export const TXG_TREE_14: StudyChapter = {
  id: "TXG-14",
  number: 14,
  paper: "TX",
  area: "E",
  title: "Corporate residence, scope and the accounting period",
  minutes: 18,
  intro:
    "Companies raise a question individuals do not: an entity has no home, no family and no habits, so residence must be defined artificially. How a jurisdiction defines it determines what it can tax.",
  outcomes: [
    "Explain the tests by which a company becomes resident",
    "Distinguish the charge on a resident company from that on a non-resident with a local presence",
    "Explain what a permanent establishment is and why the concept exists",
    "Identify the accounting period and explain how it differs from the period of account",
    "Explain why a company is taxed separately from its owners",
  ],
  sections: [
    {
      id: "corporate-residence",
      heading: "Where a company belongs, and what follows from it",
      blocks: [
        {
          kind: "text",
          md: "This is a **jurisdiction-neutral foundation track, not an ACCA exam variant**. Corporate residence rules and rates are among the most competitive areas of tax policy, so they change frequently and differ sharply between countries.\n\nStart from the premise everything else depends on. A company is a **separate legal person**: it owns its own assets, owes its own debts, and is charged tax in its own name on its own profits. The shareholders own the company, not its assets, and are taxed separately when profit reaches them. That separation is what creates the double layer of tax, and it is also what makes companies useful — liability is limited and the entity outlives its owners.",
        },
        {
          kind: "table",
          caption: "The two tests of corporate residence, usually applied together",
          head: ["Test", "What it asks", "Advantages", "Weakness"],
          rows: [
            ["**Incorporation**", "Under which country's law was the company formed?", "Certain, cheap to apply, cannot be manipulated after the fact", "Purely formal — a company can be incorporated anywhere and managed elsewhere"],
            ["**Central management and control**", "Where are the strategic decisions actually taken — where does the board really meet and decide?", "Reflects economic reality and is hard to fake convincingly", "Fact-heavy and arguable, and can shift as a business changes"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Central management and control is about strategy, not operations",
          md: "The test looks for where the **highest level of control** is exercised, which is not the same as where the business is run day to day.\n\nA company may have factories, staff and customers entirely in one country while its board — the people who decide what the company will do, what it will invest in and how it will be financed — meets in another. On the management and control test, the company is resident where the board genuinely decides.\n\nThe word doing the work is *genuinely*. Holding board meetings in a low-tax jurisdiction while the real decisions are made elsewhere and merely ratified at the meeting does not move residence, because the test looks at where control is actually exercised rather than where it is documented. That distinction between the formal record and the substance is one of the oldest in international tax, and it is why scenarios describe who actually decides rather than where the minutes were signed.",
        },
        {
          kind: "formula",
          name: "What each kind of company is charged on",
          expr: "RESIDENT COMPANY, worldwide basis\n     charged on   WORLDWIDE profits: trading profits, investment\n                  income and chargeable gains, wherever arising\n     with relief for foreign tax suffered\n\nNON-RESIDENT COMPANY\n     charged only on profits attributable to a\n     PERMANENT ESTABLISHMENT in the jurisdiction,\n     plus certain local-source income (rents, sometimes\n     gains on local land), often collected by WITHHOLDING\n\nNote what a company is charged on that an individual is not:\n     CHARGEABLE GAINS are taxed as part of the company's\n     profits, at the corporate rate -- companies do not\n     normally pay a separate capital gains tax.",
          note: "The single-charge treatment of gains is a structural difference worth remembering. A company's disposal produces a gain computed on the principles of Area C, but the result is added to its other profits rather than taxed separately. The practical effects are that a company's gains bear the corporate rate rather than a gains rate, that no annual exemption is available, and that capital losses can usually be set only against gains rather than against trading profits.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Permanent establishment: the threshold a jurisdiction sets before taxing a foreign business",
          md: "A country could in principle tax any foreign company that sells into it. Almost none do, because it would be unadministrable and would obstruct trade. Instead they set a threshold: a foreign company is taxed only where it has a **permanent establishment**.\n\nThe standard definition has two limbs. A **fixed place of business** through which the business is wholly or partly carried on — a branch, office, factory, workshop, mine, or a building site lasting beyond a stated period. Or a **dependent agent** habitually exercising authority to conclude contracts on the company's behalf.\n\nAnd there is a standard list of exclusions for activities that are merely **preparatory or auxiliary**: storing goods, maintaining a stock for delivery, purchasing, or collecting information. Each is treated as supporting the business rather than being it.\n\nThe threshold is what makes the international system workable. Selling goods into a country from abroad creates no charge there; establishing a branch does. That is why the question in any cross-border scenario is not whether a foreign company has customers in the jurisdiction, but whether it has crossed the permanent establishment line — and why so much planning is directed at staying on the right side of it.",
        },
      ],
      check: {
        q: "A company incorporated in Jurisdiction A has all its factories and staff in Jurisdiction B, but its board meets in and genuinely decides strategy from Jurisdiction A. Under a central management and control test, where is it resident?",
        options: [
          "Jurisdiction B, where the operations are",
          "Jurisdiction A, where strategic control is genuinely exercised",
          "Both, with profits split by turnover",
          "Neither, because the two tests conflict",
        ],
        correct: 1,
        explain:
          "THE TEST LOOKS AT THE HIGHEST LEVEL OF CONTROL, NOT AT OPERATIONS. Strategic decision-making sits in A, so central management and control is there. B will very likely tax the profits of a permanent establishment on its territory, but that is a source claim — it does not make the company resident in B.",
      },
    },
    {
      id: "periods",
      heading: "Accounting periods: the unit the charge is measured over",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "The period of account and the accounting period are different things",
          md: "A **period of account** is the period the company chooses to draw up accounts for — normally twelve months, but a company may prepare accounts for longer or shorter when it starts, ceases or changes its year end.\n\nAn **accounting period** for tax purposes can never exceed twelve months. So where a company draws up accounts for, say, eighteen months, that single period of account is split into **two accounting periods**: the first twelve months and the remaining six.\n\nThe apportionment is not arbitrary, and getting it right is a reliable source of marks:\n\n**Trading profit before capital allowances** is apportioned on a **time** basis, because it is assumed to accrue evenly.\n\n**Capital allowances** are computed **separately for each period**, with the annual limits scaled to the length of the period — a six-month period gets six months' worth.\n\n**Chargeable gains** fall into the period in which the **disposal actually occurred**, not by apportionment, because a disposal happens on a date.\n\n**Investment income** is normally allocated on an accruals basis to the period it relates to.",
        },
        {
          kind: "list",
          title: "What starts and ends an accounting period",
          items: [
            "**It starts** when the company comes within the charge — beginning to trade, or acquiring a source of income — or immediately after a previous accounting period ends.",
            "**It ends** on the earliest of: twelve months after it began; the end of the company's period of account; the company beginning or ceasing to trade; or the company ceasing to be within the charge.",
            "**Ceasing to trade ends a period even mid-year**, which is why a cessation scenario nearly always involves a short final period with scaled allowances.",
            "**Entering administration or liquidation** typically ends an accounting period too, because the company's status has changed fundamentally.",
          ],
        },
        {
          kind: "example",
          title: "Splitting a long period of account",
          scenario:
            "Vantar Ltd, resident in Jurisdiction Z, prepares accounts for the eighteen months to 30 June year 2, having previously had a 31 December year end. The accounts show trading profit before capital allowances of CU 900,000, accruing evenly. It sold an investment property on 1 May year 2 realising a chargeable gain of CU 120,000, and received rental income of CU 90,000 accruing evenly across the eighteen months. Capital allowances are computed at CU 80,000 for the first accounting period and CU 30,000 for the second.",
          steps: [
            { label: "Split the period of account", detail: "An accounting period cannot exceed twelve months, so this splits into: 1 January year 1 to 31 December year 1 (twelve months), and 1 January year 2 to 30 June year 2 (six months)." },
            { label: "Apportion the trading profit by time", detail: "CU 900,000 over eighteen months. First period: CU 900,000 × 12/18 = CU 600,000. Second period: CU 900,000 × 6/18 = CU 300,000." },
            { label: "Deduct capital allowances period by period", detail: "These are computed separately rather than apportioned: CU 80,000 against the first period and CU 30,000 against the second. Trading profits become CU 520,000 and CU 270,000." },
            { label: "Allocate the rental income on accruals", detail: "CU 90,000 over eighteen months, accruing evenly: CU 60,000 to the first period and CU 30,000 to the second." },
            { label: "Place the gain by DATE, not apportionment", detail: "The disposal happened on 1 May year 2, which falls in the SECOND accounting period. The whole CU 120,000 goes there. Apportioning it 12/18 and 6/18 is the error this scenario exists to catch." },
            { label: "State the taxable profits of each period", detail: "First period: CU 520,000 + CU 60,000 = CU 580,000. Second period: CU 270,000 + CU 30,000 + CU 120,000 = CU 420,000." },
          ],
          result:
            "**Taxable profits of CU 580,000 and CU 420,000.** Three different allocation rules were used in one computation — time for trading profit, separate computation for capital allowances, and actual date for the gain — and mixing them up is the most common way to lose marks in a long-period question.",
        },
      ],
      check: {
        q: "A company prepares accounts for 18 months and disposes of an asset in month 15. Which accounting period does the gain fall in?",
        options: [
          "It is apportioned 12/18 and 6/18 between the two periods",
          "The second period, because that is when the disposal actually occurred",
          "The first period, because it began earlier",
          "It is deferred until the following accounting period",
        ],
        correct: 1,
        explain:
          "GAINS ARE ALLOCATED BY DATE, NOT BY APPORTIONMENT. Month 15 falls in the second accounting period, so the whole gain is taxed there. Only trading profit is time-apportioned; capital allowances are computed separately for each period, and gains follow the date of disposal.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating a company's chargeable gains as subject to a separate gains tax.", fix: "Gains form part of a company's taxable profits at the corporate rate, with no annual exemption, and capital losses are usually restricted to gains." },
    { trap: "Deciding corporate residence from where the operations are.", fix: "Central management and control looks at where strategy is genuinely decided, which may be nowhere near the factories." },
    { trap: "Assuming any local sales create a taxable presence.", fix: "A foreign company is taxed only where it has a permanent establishment — a fixed place of business or a dependent agent concluding contracts. Preparatory and auxiliary activities are excluded." },
    { trap: "Apportioning a chargeable gain across a long period of account.", fix: "Gains fall in the accounting period containing the DATE of disposal. Only trading profit is time-apportioned." },
    { trap: "Apportioning capital allowances by time.", fix: "They are computed separately for each accounting period, with annual limits scaled to the period's length." },
  ],
  keyTerms: [
    { term: "Separate legal personality", def: "The principle that a company is a person distinct from its owners, owning its own assets and taxed in its own name." },
    { term: "Central management and control", def: "A residence test locating a company where its highest level of strategic decision-making genuinely takes place." },
    { term: "Permanent establishment", def: "A fixed place of business, or a dependent agent concluding contracts, through which a foreign company becomes taxable in a jurisdiction." },
    { term: "Preparatory or auxiliary activity", def: "Supporting activity such as storage or information gathering, excluded from the permanent establishment definition." },
    { term: "Period of account", def: "The period for which a company draws up its financial statements, which may exceed twelve months." },
    { term: "Accounting period", def: "The tax period, which can never exceed twelve months, so a long period of account is split into two." },
  ],
  summary: [
    "A company is a separate legal person taxed in its own name, which is what creates the double layer of tax on distributed profit.",
    "Residence is tested by incorporation, by central management and control, or both — and control means strategy, not operations.",
    "A resident company is taxed on worldwide profits including gains at the corporate rate; a non-resident only on a permanent establishment and local-source income.",
    "A permanent establishment is a fixed place of business or a dependent agent, excluding preparatory and auxiliary activity.",
    "An accounting period cannot exceed twelve months, so a long period of account splits into two.",
    "Trading profit is time-apportioned, capital allowances computed per period, and gains allocated by the date of disposal.",
  ],
}

/* ── Chapter 15 ────────────────────────────────────────────────── */

export const TXG_TREE_15: StudyChapter = {
  id: "TXG-15",
  number: 15,
  paper: "TX",
  area: "E",
  title: "Computing a company's taxable profits",
  minutes: 18,
  intro:
    "The adjustment of trading profit is the same exercise as for a sole trader, with three genuinely corporate differences: interest, the treatment of the owner's remuneration, and the fact that gains come into the same computation.",
  outcomes: [
    "Adjust a company's accounting profit to taxable trading profit",
    "Explain how interest paid and received is treated in a corporate computation",
    "Aggregate trading profits, investment income and gains into total taxable profits",
    "Explain the effect of a marginal or tapered rate structure",
    "Explain why deductibility of interest is commonly restricted",
  ],
  sections: [
    {
      id: "the-corporate-adjustment",
      heading: "Adjusting the profit, and the corporate differences",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Most of the adjustment is identical to Chapter 7",
          md: "Depreciation is added back and replaced with statutory allowances. Capital expenditure is disallowed. Entertaining and fines are disallowed. General provisions are added back and specific ones allowed. Income taxed under another heading is removed from the trading computation and shown separately. All of that transfers directly.\n\nThe three differences worth learning are the ones that only arise because the taxpayer is a company:\n\n**Directors' remuneration IS deductible.** A sole trader cannot employ themselves, so their salary is added back. A company is a separate person, so salary paid to a director is a genuine expense of the company — and taxable employment income of the director. This is the single most important structural difference and it drives Chapter 18.\n\n**Interest is handled by purpose, not by the general test.** Most systems route company interest through a separate regime rather than the wholly-and-exclusively rule.\n\n**Chargeable gains join the same computation.** They are not taxed separately, so a company's total profits include them.",
        },
        {
          kind: "formula",
          name: "From accounting profit to total taxable profits",
          expr: "     Net profit per the accounts                          X\n     add   depreciation, capital items, entertaining,\n           fines, general provisions, non-trade items      X\n     less  income taxed under another heading             (X)\n     less  depreciation allowances                        (X)\n                                                        -----\n           ADJUSTED TRADING PROFIT                         X\n\n     add   INVESTMENT INCOME (interest receivable on\n           non-trading loans, property income)             X\n     add   CHARGEABLE GAINS of the period                  X\n                                                        -----\n           TOTAL PROFITS                                   X\n\n     less  QUALIFYING DONATIONS and other reliefs\n           given against total profits                    (X)\n                                                        -----\n           TAXABLE TOTAL PROFITS                           X\n\n     x  the corporate rate  =  CORPORATION TAX LIABILITY",
          note: "Note where reliefs given against TOTAL profits sit — after everything has been aggregated, not inside the trading computation. That placement matters when losses are involved, because a relief deducted at this level can be wasted if a loss has already reduced total profits to nil, while a trading deduction taken earlier could not have been. Sequencing reliefs to avoid waste is a recurring theme in Chapter 16.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Interest: trading or non-trading, and why the distinction is drawn",
          md: "Companies borrow constantly, and a rule requiring each loan to pass the wholly-and-exclusively test would be unworkable. Most systems therefore classify interest by the **purpose of the borrowing**:\n\n**Trading interest** — borrowing to fund the trade, such as an overdraft or a loan to buy trading stock or plant. Deducted in arriving at trading profit.\n\n**Non-trading interest** — borrowing for investment purposes, such as acquiring shares or investment property. Pooled separately, with non-trading interest paid set against non-trading interest received, and the net result taxed or relieved as a separate stream.\n\nInterest is nearly always relieved on an **accruals** basis, matching the accounting treatment, rather than when paid.\n\nThe reason for separating the two streams is to stop a company sheltering trading profit with financing costs incurred for investment activity that may itself be taxed lightly or not at all. It is a structural anti-avoidance rule dressed as a classification.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Why jurisdictions cap interest deductions",
          md: "Interest is deductible; dividends are not. That asymmetry creates an obvious and very large planning opportunity for international groups: fund a subsidiary in a high-tax country with **debt** rather than equity, and profits are stripped out as deductible interest to a lender in a low-tax country.\n\nAlmost every developed jurisdiction now counters this, in one of two ways. **Thin capitalisation** rules deny relief where the debt-to-equity ratio exceeds a stated limit. **Earnings-stripping** rules cap total net interest deductions at a percentage of a profit measure — typically around 30% of earnings before interest, tax, depreciation and amortisation — regardless of how the debt is structured.\n\nThe second approach has largely displaced the first internationally, because a ratio can be engineered while a cap on the deduction relative to actual earnings is much harder to avoid. When a scenario gives you a highly leveraged subsidiary borrowing from a related party abroad, this is what it is pointing at.",
        },
      ],
      check: {
        q: "How is a director's salary treated in a company's tax computation, compared with a sole trader's own salary?",
        options: [
          "Both are added back as appropriations of profit",
          "Both are deductible expenses",
          "The director's salary is deductible for the company; a sole trader's own salary is added back",
          "Neither is deductible, but both give relief to the individual",
        ],
        correct: 2,
        explain:
          "SEPARATE LEGAL PERSONALITY IS WHAT MAKES THE DIFFERENCE. A company is a distinct person, so paying its director is a real expense of the company and taxable employment income of the director. A sole trader cannot employ themselves — the profit is already theirs — so their 'salary' is an appropriation and is added back.",
      },
    },
    {
      id: "rates-and-thresholds",
      heading: "Rate structures, and the trap in a tapered rate",
      blocks: [
        {
          kind: "table",
          caption: "How jurisdictions structure the corporate rate",
          head: ["Structure", "How it works", "Why it is used", "The complication"],
          rows: [
            ["**Single flat rate**", "One rate on all taxable profits", "Simple, certain, easy to administer and to advertise", "No relief for small companies with modest profits"],
            ["**Small profits rate plus main rate**", "A lower rate below a threshold, a higher rate above", "Supports small businesses and reduces the burden on start-ups", "A cliff edge at the threshold unless smoothed"],
            ["**Marginal relief / taper**", "A lower rate below one limit, the main rate above a higher one, and a smoothing formula between", "Removes the cliff edge so a small increase in profit cannot raise total tax", "Creates a marginal rate BETWEEN the limits that exceeds the main rate"],
          ],
        },
        {
          kind: "formula",
          name: "The marginal rate hidden inside a taper",
          expr: "Suppose the lower limit is L, the upper limit is U,\nthe small profits rate is s and the main rate is m.\n\nTax at L  =  L x s\nTax at U  =  U x m\n\nEFFECTIVE MARGINAL RATE between the limits\n     =  (U x m  -  L x s)  /  (U - L)\n\nBecause tax must climb from L x s all the way to U x m across the\nnarrow band from L to U, this figure is ALWAYS higher than m.\n\nMany systems also DIVIDE the limits by the number of\nassociated companies, so that a group cannot multiply the\nsmall profits band by splitting one business into several.",
          note: "The hidden marginal rate is the whole practical point of a tapered structure, and it is where planning questions live. A company sitting just below the upper limit faces a higher rate on its next unit of profit than a much larger company does — so accelerating a deductible expense, or making a pension or charitable payment, is worth more to it than the headline rate suggests. The associated-company division is the anti-avoidance counterpart, and it is why a scenario mentioning subsidiaries is usually testing whether you scale the limits.",
        },
        {
          kind: "example",
          title: "Computing the liability through a taper, with associated companies",
          scenario:
            "Jurisdiction Z charges a small profits rate of 19% on taxable total profits up to CU 50,000 and a main rate of 25% above CU 250,000, with marginal relief between. It divides both limits by the number of associated companies. Kestrel Ltd has taxable total profits of CU 180,000 and one associated company. Marginal relief is given by the formula: (upper limit − profits) × 3/200.",
          steps: [
            { label: "Scale the limits for associated companies", detail: "Two associated companies, so the limits are halved: lower limit CU 25,000, upper limit CU 125,000. Failing to do this is the error the scenario is built on." },
            { label: "Place the company against the scaled limits", detail: "Profits of CU 180,000 exceed the scaled upper limit of CU 125,000. So Kestrel is a MAIN RATE company — no marginal relief at all, despite profits that would have attracted it before scaling." },
            { label: "Compute the liability", detail: "CU 180,000 × 25% = CU 45,000." },
            { label: "Show what the unscaled answer would have been", detail: "Without scaling, CU 180,000 sits between CU 50,000 and CU 250,000, so tax would be CU 180,000 × 25% = CU 45,000 less marginal relief of (CU 250,000 − CU 180,000) × 3/200 = CU 1,050, giving CU 43,950. The scaling therefore costs CU 1,050." },
            { label: "State the planning consequence", detail: "Because the limits are divided, creating additional companies within a group does not multiply the small profits band — it dilutes it for everyone. A group considering incorporating a new subsidiary should know that it will raise the effective rate across the whole group, which is frequently the point of an advisory requirement." },
          ],
          result:
            "**A liability of CU 45,000, with the associated-company rule costing CU 1,050.** The instructive step is the first one: the limits must be scaled before the company is placed against them, and a candidate who computes marginal relief on the unscaled limits produces a plausible figure that is wrong for a structural reason.",
        },
      ],
      check: {
        q: "Why do jurisdictions divide the small profits limits by the number of associated companies?",
        options: [
          "To simplify the computation for groups",
          "To stop one business being split into several companies to multiply the lower-rate band",
          "Because associated companies file a single return",
          "To compensate for group relief being available",
        ],
        correct: 1,
        explain:
          "IT IS AN ANTI-FRAGMENTATION RULE. Without it, a business earning large profits could incorporate ten companies, put a tenth of the profit in each, and have all of it taxed at the small profits rate. Dividing the limits means splitting a business changes nothing, which removes the incentive entirely.",
      },
    },
  ],
  examTraps: [
    { trap: "Adding back directors' remuneration.", fix: "A company is a separate person, so salary to a director is deductible for the company and taxable on the director. Only a sole trader's own 'salary' is added back." },
    { trap: "Putting all interest into the trading computation.", fix: "Classify by the PURPOSE of the borrowing. Trading interest reduces trading profit; non-trading interest is pooled and netted as a separate stream." },
    { trap: "Taxing a company's gains separately from its other profits.", fix: "Gains are added to total profits and bear the corporate rate. There is no annual exemption, and capital losses are usually restricted to gains." },
    { trap: "Ignoring associated companies when applying rate limits.", fix: "Divide both limits by the number of associated companies BEFORE deciding which rate band applies. Doing it afterwards, or not at all, gives a wrong answer that looks right." },
    { trap: "Assuming the marginal rate between the limits equals the main rate.", fix: "It is always higher, because tax must climb from the lower band to the main rate across a narrow range. That is where the planning value sits." },
  ],
  keyTerms: [
    { term: "Taxable total profits", def: "Adjusted trading profit plus investment income plus chargeable gains, less reliefs given against total profits." },
    { term: "Trading interest", def: "Interest on borrowing for the purposes of the trade, deducted in computing trading profit." },
    { term: "Non-trading interest", def: "Interest on investment-purpose borrowing, pooled separately and netted against non-trading interest received." },
    { term: "Thin capitalisation", def: "A rule denying interest relief where a company's debt-to-equity ratio exceeds a stated limit." },
    { term: "Earnings-stripping rule", def: "A cap on net interest deductions set as a percentage of an earnings measure, regardless of how the debt is structured." },
    { term: "Marginal relief", def: "A smoothing formula between a small profits limit and a main rate limit, producing an effective marginal rate above the main rate." },
    { term: "Associated companies", def: "Companies under common control, whose number divides the rate limits so that fragmenting a business gains nothing." },
  ],
  summary: [
    "The corporate adjustment mirrors the unincorporated one, with three differences: directors' pay is deductible, interest is classified by purpose, and gains join the same computation.",
    "Trading interest reduces trading profit; non-trading interest is a separate netted stream, which stops financing costs sheltering trading profit.",
    "Interest deductions are commonly capped by thin capitalisation or earnings-stripping rules, because interest is deductible while dividends are not.",
    "Total profits aggregate trading profit, investment income and gains, then reliefs against total profits are deducted.",
    "Tapered rate structures hide a marginal rate above the main rate between the limits, which is where planning value sits.",
    "Rate limits are divided by the number of associated companies, so splitting a business into several cannot multiply the lower band.",
  ],
}

/* ── Chapter 16 ────────────────────────────────────────────────── */

export const TXG_TREE_16: StudyChapter = {
  id: "TXG-16",
  number: 16,
  paper: "TX",
  area: "E",
  title: "Corporate losses: using them, and using them well",
  minutes: 18,
  intro:
    "A loss is an asset, and like any asset it can be wasted. The computational part of loss relief is easy; the marks are in choosing between the options and saying why.",
  outcomes: [
    "Identify the ways a trading loss may be relieved",
    "Apply a loss against total profits of the same and earlier periods",
    "Explain the restrictions on carrying losses forward",
    "Explain why capital losses are treated differently from trading losses",
    "Choose between loss relief options and justify the choice",
  ],
  sections: [
    {
      id: "the-options",
      heading: "What can be done with a trading loss",
      blocks: [
        {
          kind: "table",
          caption: "The four standard routes, and what each is worth",
          head: ["Route", "How it works", "Main advantage", "Main drawback"],
          rows: [
            ["**Against total profits of the SAME period**", "Set the loss against other income and gains of the loss-making period", "Immediate; uses the loss at once", "May waste reliefs deducted against total profits"],
            ["**CARRY BACK to an earlier period**", "Set against profits of the previous period, or longer on cessation", "Generates a REPAYMENT of tax already paid — actual cash", "Limited window; may relieve profit taxed at a lower rate"],
            ["**CARRY FORWARD**", "Set against future profits, often indefinitely", "Nothing is lost; usually the default", "No cash now; value depends on future profitability and may be restricted"],
            ["**GROUP RELIEF**", "Surrender the loss to a profitable group company", "Uses the loss immediately somewhere in the group", "Requires the ownership relationship, and needs a payment arrangement to be fair between companies"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Cash now beats relief later, but not always",
          md: "The instinct that a carry-back is best because it produces a repayment is usually right and is not always right. Three considerations decide it, and a good answer names them.\n\n**Rate arbitrage.** A loss relieved against profits taxed at 19% saves 19%; the same loss carried forward against profits expected to bear 25% saves more. Where a jurisdiction's rates are rising, or the company expects to move above a small profits limit, carrying forward can be worth substantially more even after allowing for delay.\n\n**Waste of other reliefs.** Relief against total profits is usually **all or nothing** — the loss cannot be restricted to preserve a charitable donation or a foreign tax credit that is deducted at the same level. Those reliefs are then lost. A carry-forward that leaves them intact may be better even though it is slower.\n\n**Certainty.** A carry-back gives a definite repayment now. A carry-forward is worth nothing if the company never returns to profit — and a company that has just made a large loss may be exactly the company that will not.\n\nThe honest answer to \"which relief should we claim?\" is therefore a comparison, not a rule.",
        },
        {
          kind: "example",
          title: "Choosing between carry-back and carry-forward",
          scenario:
            "Sorenne Ltd, in Jurisdiction Z, has a trading loss of CU 400,000 in the year to 31 December year 3. In year 2 it had taxable total profits of CU 350,000, taxed at 19%, after deducting qualifying charitable donations of CU 20,000. It expects profits of CU 500,000 in year 4, which will be taxed at 25%. Relief against total profits is all or nothing and is given before charitable donations.",
          steps: [
            { label: "Option 1 — carry back to year 2", detail: "The loss is set against year 2's total profits. Relief is capped at those profits, so CU 350,000 of the loss is used and CU 50,000 remains to carry forward. Tax repaid: CU 350,000 × 19% = CU 66,500." },
            { label: "Identify what the carry-back costs", detail: "Because relief is given BEFORE charitable donations and cannot be restricted, the CU 20,000 of donations in year 2 is wasted — there are no profits left for it to reduce. At 19% that is CU 3,800 of relief lost. Net benefit of the carry-back: CU 66,500 − CU 3,800 = CU 62,700, plus CU 50,000 of loss still carried forward, worth CU 12,500 at 25%." },
            { label: "Value option 1 in total", detail: "CU 62,700 received now, plus CU 12,500 of relief in year 4. Total CU 75,200, of which CU 62,700 arrives immediately." },
            { label: "Option 2 — carry the whole loss forward", detail: "The full CU 400,000 is set against year 4 profits of CU 500,000, all taxed at 25%. Relief: CU 400,000 × 25% = CU 100,000. Year 2's charitable donations are preserved, so nothing is wasted." },
            { label: "Compare", detail: "Carrying forward is worth CU 100,000 against CU 75,200 — CU 24,800 more — because the loss meets a higher rate and no donations are wasted. But all of it arrives a year later than the CU 62,700 the carry-back would produce now." },
            { label: "Give a reasoned recommendation", detail: "On these figures the carry-forward is better by a wide margin, and the difference is too large to be overturned by a year's time value. The recommendation would reverse if the company's cash position were precarious, if the year 4 profits were uncertain, or if the rate were not rising." },
          ],
          result:
            "**Carry forward: CU 100,000 against CU 75,200, driven by the rate difference and the wasted donations.** The point of the exercise is that the answer turns on facts the scenario supplied deliberately — the rate change and the donations — and a candidate who simply prefers cash now has not read them.",
        },
      ],
      check: {
        q: "Relief against total profits is 'all or nothing'. Why does that matter?",
        options: [
          "It means the loss must be used in the earliest possible period",
          "The claim cannot be restricted, so other reliefs deducted at the same level — such as charitable donations — may be wasted",
          "It means only trading losses qualify",
          "It prevents any part of the loss being carried forward",
        ],
        correct: 1,
        explain:
          "THE CLAIM CANNOT BE TAILORED. Because the loss must be set against the whole of total profits rather than a chosen amount, reliefs deducted at that same level have nothing left to reduce and are lost. That cost has to be weighed against the tax the claim saves.",
      },
    },
    {
      id: "capital-losses-and-restrictions",
      heading: "Capital losses, and the limits on carrying forward",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Capital losses are ring-fenced, and the reason is structural",
          md: "A company's **capital losses can normally be set only against chargeable gains** — of the same period, or carried forward against future gains. They cannot reduce trading profit.\n\nThe reason is that gains and trading profit are measured on completely different principles. A gain reflects the change in an asset's value over years of ownership, much of which may be inflation rather than real profit; trading profit is the result of a period's activity. Allowing losses to flow freely between them would let a company shelter genuine operating profit with paper losses on assets it chose the timing of.\n\nIt also protects the exchequer against a timing asymmetry that would otherwise be irresistible: a company can generally choose **when** to realise a capital loss, by selecting which asset to sell and when. If those losses could be set against trading profits, every company would realise losses in its most profitable years.\n\nNote the asymmetry that follows: trading losses can usually be set against gains, but capital losses cannot be set against trading profits. The restriction runs one way only.",
        },
        {
          kind: "list",
          title: "Why jurisdictions restrict losses carried forward",
          items: [
            "**Loss buying.** Without restriction, a profitable group could buy a company with large accumulated losses purely to use them. Most systems therefore deny or restrict carried-forward losses after a **change in ownership combined with a major change in what the business does, or in how it does it** — either alone is generally not enough, because businesses legitimately change hands and legitimately evolve.",
            "**Streaming.** Many systems require carried-forward losses to be used against profits of the SAME trade, so a company cannot shelter a new and profitable activity with losses from an abandoned one.",
            "**Annual caps.** Several jurisdictions now limit the proportion of a year's profits that carried-forward losses may relieve — commonly around half above a generous allowance — so that very large historic losses cannot keep a substantial company out of tax indefinitely. The losses are not lost, merely spread.",
            "**Time limits.** Some systems still cap the number of years a loss may be carried, on the administrative ground that verifying a twenty-year-old computation is impractical. Indefinite carry-forward is now more common, paired with an annual cap instead.",
            "**Cessation.** When a trade ends, carried-forward losses generally die with it, because there will be no future profits of that trade. That is why an extended carry-back on cessation exists in many systems — it is the last chance to get value from them.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The order of relief decides whether a loss is wasted",
          md: "When several reliefs compete for the same profits, sequence them deliberately. The general principle is to **use first the reliefs that would otherwise be lost**, and to preserve those that survive.\n\nA carried-forward loss usually keeps indefinitely; a charitable donation or an unused foreign tax credit generally does not. So where a choice exists, take the relief that expires and leave the one that persists.\n\nApply the same logic to group relief in Chapter 17: surrendering a loss to another company uses it now, but a company with its own future profits may do better keeping it — unless a restriction means it will not be usable in full.\n\nThe examinable skill throughout is not computing each relief, which is straightforward, but **choosing among them and saying why**. A recommendation without a reason earns very little, however accurate the arithmetic behind it.",
        },
      ],
      check: {
        q: "A company has a capital loss of CU 90,000 and a trading profit of CU 200,000, with no gains. What relief is available for the capital loss?",
        options: [
          "It reduces the trading profit to CU 110,000",
          "It is carried forward against future chargeable gains only",
          "It may be surrendered as group relief against another company's trading profits",
          "It is relieved against total profits of the previous period",
        ],
        correct: 1,
        explain:
          "CAPITAL LOSSES ARE RING-FENCED TO GAINS. With no gains this period, the loss is carried forward and set against future chargeable gains. It cannot touch trading profit — which stops a company sheltering operating profit with losses on assets whose disposal it controls the timing of.",
      },
    },
  ],
  examTraps: [
    { trap: "Recommending a carry-back automatically because it produces cash.", fix: "Compare the rates, check whether other reliefs will be wasted, and weigh how certain future profits are. Sometimes carrying forward is worth substantially more." },
    { trap: "Restricting a claim against total profits to preserve a donation.", fix: "The claim is all or nothing. If the donation will be wasted, that cost has to be weighed against the relief obtained — it cannot be avoided by tailoring the claim." },
    { trap: "Setting a capital loss against trading profits.", fix: "Capital losses go against gains only. Trading losses, by contrast, can usually be set against gains — the restriction runs one way." },
    { trap: "Assuming carried-forward losses survive a takeover.", fix: "A change in ownership COMBINED with a major change in the trade commonly forfeits them, and many systems also cap the proportion of annual profits they may relieve." },
    { trap: "Computing every relief without recommending one.", fix: "The marks are in the choice and the reason. Use first the relief that would otherwise expire, and preserve the one that keeps." },
  ],
  keyTerms: [
    { term: "Relief against total profits", def: "Setting a trading loss against all profits of the period, including investment income and gains. Usually an all-or-nothing claim." },
    { term: "Carry-back", def: "Setting a loss against profits of an earlier period, generating a repayment of tax already paid." },
    { term: "Carry-forward", def: "Setting a loss against future profits, often indefinitely but commonly subject to streaming and annual caps." },
    { term: "Streaming", def: "A requirement that carried-forward losses be used against profits of the same trade that produced them." },
    { term: "Loss buying", def: "Acquiring a company for its accumulated losses, countered by rules denying relief after a change of ownership plus a major change in the trade." },
    { term: "Ring-fencing", def: "Restricting a loss to a particular category of profit — as with capital losses, usable only against chargeable gains." },
  ],
  summary: [
    "A trading loss can be set against total profits of the same period, carried back, carried forward, or surrendered as group relief.",
    "Carry-back gives cash now; carry-forward may be worth more where rates are rising or where a claim would waste other reliefs.",
    "Relief against total profits is all or nothing, so donations and credits at the same level can be lost.",
    "Capital losses are ring-fenced to gains, because a company chooses when to realise them and gains are measured on different principles.",
    "Carried-forward losses are restricted by anti-loss-buying rules, streaming, annual caps and cessation of the trade.",
    "Sequence reliefs to use first what would expire and preserve what keeps — and always justify the recommendation.",
  ],
}

/* ── Chapter 17 ────────────────────────────────────────────────── */

export const TXG_TREE_17: StudyChapter = {
  id: "TXG-17",
  number: 17,
  paper: "TX",
  area: "E",
  title: "Groups: relief, gains and transfer pricing",
  minutes: 18,
  intro:
    "A group is one economic business run through several legal persons. Tax has to decide how far to respect the legal form and how far to look through it — and every group rule is an answer to that question.",
  outcomes: [
    "Explain why group relief exists and the ownership relationship it requires",
    "Apply group relief for losses between group companies",
    "Explain the no gain, no loss transfer of assets within a gains group",
    "Explain the arm's length principle and why transfer pricing rules exist",
    "Identify the adjustment required where a related-party price is not at arm's length",
  ],
  sections: [
    {
      id: "group-relief-and-gains",
      heading: "Looking through the legal form",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "The problem groups create, and the principle behind the answer",
          md: "A business run as one company with a loss-making division and a profitable division is taxed on the net result — the loss reduces the profit automatically. Run the identical business through two subsidiaries and, without special rules, the profitable one pays tax in full while the loss sits unused in the other.\n\nThat outcome is indefensible: identical economic activity would bear very different tax purely because of how it was legally structured, which offends the neutrality criterion from Chapter 1.\n\nSo jurisdictions provide **group relief**, allowing losses to be surrendered between sufficiently connected companies, and **no gain, no loss transfers**, allowing assets to move within a group without triggering a charge. Both are a deliberate decision to look through the legal form to the economic reality.\n\nThe qualification is that they look through it **only so far**. The ownership threshold is what defines that limit, and it is deliberately high — because the further apart two companies are in ownership, the less credible it is that they are one business.",
        },
        {
          kind: "table",
          caption: "The two main group regimes, which usually have DIFFERENT thresholds",
          head: ["", "Group relief for losses", "Gains group"],
          rows: [
            ["**Typical threshold**", "Higher — commonly 75% ownership, direct or indirect", "Often lower, or measured differently, and can extend further down a chain"],
            ["**What it permits**", "Surrender of losses from one company to another for the same period", "Transfer of assets between members with no gain and no loss"],
            ["**Effect on the recipient**", "Reduces the claimant's taxable profits", "The transferee inherits the transferor's base cost, so the gain is deferred not removed"],
            ["**Common restriction**", "Only for corresponding periods, and often only to the extent of the claimant's profits", "A charge may arise if the company LEAVES the group still holding the asset"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The degrouping charge, and why it must exist",
          md: "If assets could move around a group tax-free and a company could then simply be sold, the gains tax on corporate assets would be avoidable in two steps: transfer the asset into a subsidiary at no gain and no loss, then sell the shares in that subsidiary instead of selling the asset.\n\nMost jurisdictions therefore impose a **degrouping charge**. Where a company leaves a group within a stated period still holding an asset acquired from another member on a no gain, no loss basis, a gain is computed as if it had sold and immediately reacquired the asset at market value when it received it.\n\nThe charge is usually added to the consideration for the share sale rather than charged on the departing company, which puts it on the seller who actually extracted the value. Recognising this in a scenario where a subsidiary is being sold shortly after an intra-group transfer is exactly what an advisory requirement is looking for.",
        },
        {
          kind: "example",
          title: "Group relief with a rate difference",
          scenario:
            "In Jurisdiction Z, group relief requires 75% ownership and a company may claim only up to its own taxable profits. Rates are 19% up to CU 50,000 of profits and 25% above CU 250,000, with the limits divided by the number of group companies. Aldar Ltd owns 100% of Brune Ltd and 80% of Corvo Ltd. For the year: Aldar has profits of CU 600,000; Brune has a trading loss of CU 220,000; Corvo has profits of CU 90,000. All have the same accounting period.",
          steps: [
            { label: "Confirm the group relationships", detail: "Brune is 100% owned and Corvo 80% owned, both above the 75% threshold, so losses can be surrendered to either. Three companies in the group, so the rate limits are divided by three: lower CU 16,667, upper CU 83,333." },
            { label: "Identify where the loss is worth most", detail: "Aldar's profits of CU 600,000 are well above the scaled upper limit, so its marginal rate is 25%. Corvo's CU 90,000 also exceeds CU 83,333, so it too is at 25% — but only just, and relief taking it below CU 83,333 would enter the marginal relief band where the effective rate is HIGHER than 25%." },
            { label: "Surrender to the company where relief is most valuable", detail: "Relief in the marginal band is worth more per unit than relief at the main rate. So the first tranche of loss is best used by Corvo, bringing it down through the marginal band, and the balance surrendered to Aldar." },
            { label: "Quantify a sensible allocation", detail: "Surrender CU 73,333 to Corvo, reducing its profits from CU 90,000 to CU 16,667 — the scaled lower limit, where the small profits rate applies. Surrender the remaining CU 146,667 to Aldar, reducing its profits to CU 453,333 and saving 25% on that amount." },
            { label: "Check nothing is wasted", detail: "Total loss CU 220,000 is fully used: CU 73,333 + CU 146,667. Neither claimant has been taken below nil, so no relief is lost, and Brune has no profits of its own to shelter." },
            { label: "State the principle rather than just the numbers", detail: "Losses should be surrendered first to the company facing the HIGHEST marginal rate, which in a tapered system is the company sitting between the limits — not necessarily the largest company." },
          ],
          result:
            "**Surrender to the marginal-rate company first, then to the main-rate company.** The scenario is constructed so that the intuitive answer — give it all to the biggest company — is not the best one. The examinable skill is recognising that a tapered rate structure makes the marginal band the most valuable place to put relief.",
        },
      ],
      check: {
        q: "A subsidiary receives an asset from its parent on a no gain, no loss basis, and is sold out of the group two years later. What normally happens?",
        options: [
          "Nothing — the transfer was tax-free and remains so",
          "A degrouping charge arises, computed as if the subsidiary had sold and reacquired the asset at market value when it received it",
          "The original transfer is retrospectively cancelled",
          "The parent must repay the group relief it claimed",
        ],
        correct: 1,
        explain:
          "THE DEGROUPING CHARGE CLOSES THE TWO-STEP AVOIDANCE ROUTE. Without it, an asset could be moved into a subsidiary tax-free and the subsidiary's shares sold instead of the asset. The charge is usually added to the consideration for the share disposal, so it falls on the seller who extracted the value.",
      },
    },
    {
      id: "transfer-pricing",
      heading: "Transfer pricing and the arm's length principle",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "Why a group's internal prices cannot be left to the group",
          md: "When two unconnected businesses trade, the price is set by negotiation and each side pushes in the opposite direction. That tension is what makes the price reliable.\n\nInside a group the tension disappears. If a parent in a high-tax country buys components from its own subsidiary in a low-tax country, the group is indifferent to the price as a commercial matter — the money stays in the same hands. But it is not indifferent to it as a **tax** matter: setting the price high moves profit out of the high-tax country and into the low-tax one, and the group's total tax falls.\n\nSo every developed jurisdiction requires related-party transactions to be priced as if the parties were independent. That is the **arm's length principle**, and it applies to far more than goods: services, management charges, royalties for intellectual property, and the interest rate on intra-group loans are all within it. Intellectual property and financing are where the largest adjustments arise, precisely because they are hardest to value.",
        },
        {
          kind: "formula",
          name: "The transfer pricing adjustment",
          expr: "Compare  the price ACTUALLY charged between related parties\nwith     the price that WOULD have been charged between\n         independent parties dealing at arm's length\n\nIf the actual price gives the taxpayer a LOWER taxable profit\nin this jurisdiction, SUBSTITUTE the arm's length price:\n\n     Taxable profit as reported                     X\n     add   the transfer pricing ADJUSTMENT          X\n           ( = arm's length profit - reported profit )\n                                                  -----\n           ADJUSTED TAXABLE PROFIT                   X\n\nThe adjustment is normally ONE-WAY in domestic law: it applies\nwhere the actual price REDUCES profit here, not where it\nincreases it. A CORRESPONDING adjustment in the other country\nrelieves the resulting double taxation, but usually only where\na treaty provides for it and the other authority agrees.",
          note: "The one-way nature of the domestic rule is the point candidates most often miss, and it has a real consequence: a group mispricing a transaction can be adjusted upwards in the high-tax country without any automatic reduction in the low-tax one. The result is genuine double taxation until a corresponding adjustment is negotiated — which is why documentation prepared in advance matters so much more here than in most areas of tax.",
        },
        {
          kind: "example",
          title: "Adjusting a mispriced intra-group supply",
          scenario:
            "Norvell Ltd is resident in Jurisdiction Z, where the corporate rate is 25%. It buys all its components from Pell SA, a fellow subsidiary resident in Jurisdiction L, where the rate is 9%. Both are wholly owned by the same parent. Norvell paid CU 8,000,000 for components during the year. Independent suppliers of identical components sell them for CU 6,200,000. Norvell's reported taxable profit is CU 1,500,000.",
          steps: [
            { label: "Identify that the parties are related", detail: "Both are wholly owned by the same parent, so they are connected and the transaction is within the transfer pricing rules. The rules do not apply to genuinely independent parties, however unusual the price." },
            { label: "Establish the arm's length price", detail: "Comparable independent suppliers charge CU 6,200,000 for identical components. This is a comparable uncontrolled price, the most direct and most reliable of the standard methods where genuine comparables exist." },
            { label: "Quantify the adjustment", detail: "Norvell paid CU 8,000,000 against an arm's length CU 6,200,000, so its costs are overstated by CU 1,800,000 and its profit understated by the same amount." },
            { label: "Adjust the taxable profit", detail: "Reported CU 1,500,000 + CU 1,800,000 = CU 3,300,000. Additional tax in Z: CU 1,800,000 × 25% = CU 450,000." },
            { label: "Show what the group was attempting", detail: "The overpricing moved CU 1,800,000 of profit from a 25% jurisdiction to a 9% one, saving CU 1,800,000 × 16% = CU 288,000 a year. That saving is what the rules exist to remove." },
            { label: "Note the double taxation risk", detail: "Z now taxes CU 1,800,000 that Jurisdiction L has ALSO taxed in Pell's hands. Unless L makes a corresponding adjustment — normally available only under a treaty and often only after a lengthy procedure — the group suffers real double taxation on that amount." },
          ],
          result:
            "**An upward adjustment of CU 1,800,000 and CU 450,000 of additional tax, with double taxation until a corresponding adjustment is agreed.** The lesson for an advisory answer is that the cost of getting transfer pricing wrong is not just the adjustment — it is the adjustment plus tax already paid elsewhere plus penalties, which is why contemporaneous documentation supporting the price is the standard recommendation.",
        },
        {
          kind: "list",
          title: "How an arm's length price is established",
          items: [
            "**Comparable uncontrolled price.** Find the price charged between independent parties for the same thing in comparable circumstances. The most reliable method, and the least often available — genuinely comparable transactions are rare.",
            "**Resale price.** Start from the price at which the goods are resold to an independent customer and work back by deducting an appropriate gross margin. Suited to distributors that add little value.",
            "**Cost plus.** Take the supplier's costs and add an appropriate mark-up. Suited to manufacturers and to service providers where costs are measurable.",
            "**Transactional net margin.** Compare the net profit margin earned on the transaction with margins earned by independent parties in comparable activity. Widely used in practice because it tolerates imperfect comparables.",
            "**Profit split.** Divide the combined profit between the parties in proportion to their contributions. Reserved for genuinely integrated operations where each side contributes unique value and no one-sided method works.",
            "**Documentation.** Whichever method is used, most jurisdictions require the analysis to be documented contemporaneously. Producing it after an enquiry begins is much weaker evidence, and penalties commonly turn on whether it existed at the time.",
          ],
        },
      ],
      check: {
        q: "A subsidiary in a 25% jurisdiction pays an inflated price to a fellow subsidiary in a 9% jurisdiction. What does the transfer pricing adjustment do?",
        options: [
          "It reduces the price paid and refunds the difference",
          "It increases the taxable profit in the 25% jurisdiction to the arm's length figure, with double taxation until a corresponding adjustment is agreed",
          "It taxes the group as a single entity",
          "It applies only if the two companies are in the same country",
        ],
        correct: 1,
        explain:
          "THE ADJUSTMENT IS ONE-WAY AND DOMESTIC. The high-tax jurisdiction substitutes the arm's length price and taxes the profit that should have arisen there. The low-tax jurisdiction does not automatically reduce its own charge, so the same profit is taxed twice until a corresponding adjustment is negotiated, usually under a treaty.",
      },
    },
  ],
  examTraps: [
    { trap: "Assuming one ownership threshold covers all group regimes.", fix: "Loss relief and gains groups commonly use different thresholds and different tests. Check each separately." },
    { trap: "Surrendering losses to the largest group company by default.", fix: "Surrender first where the MARGINAL rate is highest, which in a tapered system is a company sitting between the limits, not necessarily the biggest." },
    { trap: "Treating an intra-group asset transfer as permanently tax-free.", fix: "It is no gain, no loss — the transferee inherits the base cost. A degrouping charge arises if the company leaves the group still holding the asset." },
    { trap: "Applying transfer pricing rules to unconnected parties.", fix: "They apply to related-party transactions. An unusual price between independent parties is simply the price." },
    { trap: "Assuming a transfer pricing adjustment is automatically matched abroad.", fix: "Domestic adjustments are one-way. A corresponding adjustment normally requires a treaty and the other authority's agreement, so double taxation persists in the meantime." },
  ],
  keyTerms: [
    { term: "Group relief", def: "The surrender of losses from one group company to another, so that a group is not taxed worse than the same business run through a single company." },
    { term: "Gains group", def: "A grouping permitting assets to move between members with no gain and no loss, the transferee inheriting the transferor's base cost." },
    { term: "Degrouping charge", def: "A charge arising when a company leaves a group still holding an asset received intra-group, computed as if it had sold and reacquired it at market value." },
    { term: "Arm's length principle", def: "The requirement that related parties price transactions as independent parties would have done." },
    { term: "Comparable uncontrolled price", def: "A transfer pricing method using the price charged between independent parties for the same thing in comparable circumstances." },
    { term: "Corresponding adjustment", def: "A reduction in the other jurisdiction's charge to relieve the double taxation created by a transfer pricing adjustment, usually available only under a treaty." },
  ],
  summary: [
    "Group rules exist so that a business is not taxed worse for being run through several companies than through one.",
    "Loss relief and gains groups often use different ownership thresholds, so test each separately.",
    "Surrender losses first to the company facing the highest marginal rate, which a taper can make a mid-sized company.",
    "Intra-group asset transfers are no gain, no loss, with a degrouping charge if the company leaves still holding the asset.",
    "The arm's length principle applies to goods, services, royalties and intra-group interest, because a group has no internal price tension.",
    "Domestic transfer pricing adjustments are one-way, so double taxation persists until a corresponding adjustment is agreed — which is why documentation matters.",
  ],
}

/* ── Chapter 18 ────────────────────────────────────────────────── */

export const TXG_TREE_18: StudyChapter = {
  id: "TXG-18",
  number: 18,
  paper: "TX",
  area: "E",
  title: "Distributions and the owner-managed company",
  minutes: 18,
  intro:
    "An owner-manager can take money out as salary or as dividend, and the two routes are taxed very differently. Comparing them properly is the most practical calculation in the whole track.",
  outcomes: [
    "Explain the double layer of tax on distributed corporate profit",
    "Compare the total tax cost of extracting profit as salary and as dividend",
    "Explain why the two routes differ, principally through social contributions",
    "Identify the non-tax factors that bear on the extraction decision",
    "Explain why jurisdictions counter incorporation purely for tax advantage",
  ],
  sections: [
    {
      id: "the-two-routes",
      heading: "Salary or dividend: where the difference comes from",
      blocks: [
        {
          kind: "table",
          caption: "The two extraction routes compared, mechanism by mechanism",
          head: ["", "Salary / bonus", "Dividend"],
          rows: [
            ["**In the company**", "DEDUCTIBLE — reduces taxable profit", "NOT deductible — paid out of profit already taxed"],
            ["**Employer contributions**", "Usually payable by the company on the salary", "None"],
            ["**In the owner's hands**", "Employment income at full rates", "Often a reduced dividend rate, or with a credit"],
            ["**Worker contributions**", "Usually payable", "Normally none — dividends are not earnings"],
            ["**Timing**", "Deductible when accrued; taxed when paid", "Requires distributable profits; taxed when declared or paid"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The whole comparison turns on two opposing forces",
          md: "**Pulling towards salary:** it is deductible, so it escapes the corporate charge entirely. Every unit paid as salary reduces taxable profit by that unit.\n\n**Pulling towards dividend:** it escapes social contributions on both sides, and is usually taxed at a reduced personal rate to relieve the corporate tax already suffered.\n\nWhich wins depends on the arithmetic in the particular jurisdiction — specifically on whether the corporate rate plus the dividend rate together exceed the income tax rate plus both sets of contributions. There is no universal answer, and a scenario that supplies all the rates is asking you to work it rather than to recall a rule.\n\nThe **employer contribution is usually the decisive figure**, because it is charged on top of the salary rather than out of it, and in many systems it is uncapped. That is why dividends so often win for owner-managers, and it is also why a scenario will sometimes remove the employer charge above a ceiling specifically to reverse the answer.",
        },
        {
          kind: "example",
          title: "Extracting CU 100,000 of pre-tax profit, both ways",
          scenario:
            "Larisa owns and runs Talvi Ltd in Jurisdiction Z. The company has CU 100,000 of profit available before any extraction. The corporate rate is 25%. Salary is deductible for the company. Employer contributions are 14% of salary with no ceiling; worker contributions are 10% of salary. Larisa's income tax rate on further employment income is 40%, and her dividend rate is 33.75%. Her allowances are fully used.",
          steps: [
            { label: "Route 1 — salary: work out how much can be paid", detail: "The CU 100,000 must cover both the salary and the 14% employer contribution on it. So salary × 1.14 = CU 100,000, giving a salary of CU 87,719 and employer contributions of CU 12,281." },
            { label: "Route 1 — tax the salary in her hands", detail: "Income tax: CU 87,719 × 40% = CU 35,088. Worker contributions: CU 87,719 × 10% = CU 8,772. Total deducted CU 43,860." },
            { label: "Route 1 — net to Larisa", detail: "CU 87,719 − CU 43,860 = CU 43,859. Total tax and contributions across both parties: CU 12,281 + CU 35,088 + CU 8,772 = CU 56,141, an effective rate of 56.1%." },
            { label: "Route 2 — dividend: tax the company first", detail: "A dividend is not deductible, so the company pays corporate tax on the full CU 100,000: CU 100,000 × 25% = CU 25,000. Distributable profit: CU 75,000." },
            { label: "Route 2 — tax the dividend in her hands", detail: "CU 75,000 × 33.75% = CU 25,313. No contributions arise on a dividend, from either party." },
            { label: "Route 2 — net to Larisa", detail: "CU 75,000 − CU 25,313 = CU 49,687. Total tax: CU 25,000 + CU 25,313 = CU 50,313, an effective rate of 50.3%." },
            { label: "Compare and explain the gap", detail: "The dividend leaves Larisa CU 5,828 better off. The corporate charge of CU 25,000 is more than offset by escaping CU 12,281 of employer contributions and CU 8,772 of worker contributions — CU 21,053 of contributions avoided. Contributions, not income tax, are what decide it." },
          ],
          result:
            "**Dividend: CU 49,687 net against CU 43,859 for salary — a difference of CU 5,828 on CU 100,000.** The decisive figure is the uncapped employer contribution. Remove it, or cap it below this level of pay, and the comparison narrows sharply or reverses, which is exactly why the ceiling in a scenario is never incidental detail.",
        },
      ],
      check: {
        q: "In most systems, what is the single largest factor making dividends cheaper than salary for an owner-manager?",
        options: [
          "Dividends are deductible for the company",
          "Escaping social contributions, particularly an uncapped employer charge",
          "Dividends are exempt from personal tax",
          "Corporate tax rates are always lower than income tax rates",
        ],
        correct: 1,
        explain:
          "CONTRIBUTIONS, NOT INCOME TAX, USUALLY DECIDE IT. Dividends are not deductible and are still taxed personally, so neither of those helps. What they escape is contributions on both sides — and because the employer charge sits on top of the salary and is often uncapped, it is typically the largest single amount in the comparison.",
      },
    },
    {
      id: "beyond-the-arithmetic",
      heading: "What the calculation leaves out",
      blocks: [
        {
          kind: "callout",
          tone: "warn",
          title: "A recommendation based on the tax alone is incomplete",
          md: "Scenarios reward candidates who go past the arithmetic, because a real adviser who recommended dividends purely on a rate comparison would sometimes be giving harmful advice.\n\n**Distributable profits are required.** A dividend can only be paid out of accumulated realised profits. A company with losses brought forward may be legally unable to pay one, however attractive the tax position — and an unlawful distribution can have to be repaid.\n\n**Contributions often buy entitlement.** Paying nothing through the earnings system can reduce or destroy a state pension record and eligibility for contributory benefits. The saving is real; so is what it costs.\n\n**Dividends must follow shareholdings.** They are paid per share, so in a company with several shareholders a dividend cannot be directed to one person the way a bonus can. Different classes of share can solve this, but that is a structuring decision with its own consequences.\n\n**Borrowing capacity and evidence of income.** Lenders and immigration authorities frequently look at salary rather than dividends, which affects mortgages and visas.\n\n**Pension contributions are usually based on relevant earnings**, so a very low salary can restrict how much can be paid into a pension with relief.\n\nThe standard practical answer is therefore a **combination** — a salary sufficient to preserve entitlement and support pension contributions, with the balance as dividend — rather than one route to the exclusion of the other.",
        },
        {
          kind: "list",
          title: "How jurisdictions push back against extraction planning",
          items: [
            "**Rules for personal service companies.** Where an individual would have been an employee but for interposing a company, many systems tax the income broadly as employment income anyway. The company is respected as a legal fact but disregarded for this purpose.",
            "**Loans to participators.** Extracting money as a loan from the company rather than as income would sidestep the charge entirely, so most jurisdictions impose a charge on the company when it lends to an owner, refundable when the loan is repaid, plus a benefit charge on the individual for cheap credit.",
            "**Close company rules.** Companies controlled by a small number of people attract additional provisions, because the usual discipline between a company and its owners is absent when they are the same people.",
            "**Alignment of rates.** The cleanest counter is structural: setting dividend rates so that the combined corporate and dividend burden approximates the burden on salary. Several jurisdictions have moved this way precisely to remove the incentive rather than police it.",
            "**Anti-fragmentation.** Dividing the rate limits by the number of associated companies, as in Chapter 15, stops a business being split across several companies to multiply the lower-rate band."
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Incorporation is a broader question than extraction",
          md: "The salary-versus-dividend comparison assumes a company already exists. Whether to incorporate at all is a wider question, and a scenario will sometimes ask it.\n\n**In favour:** the corporate rate may be lower than personal rates on retained profits, so a business that reinvests rather than extracts can defer a great deal of tax. Limited liability protects personal assets, the entity can outlive its owner, and it may be easier to sell or bring investors into.\n\n**Against:** profits are exposed to two layers of tax when eventually extracted; there are real compliance costs in accounts, filings and payroll; losses in the early years are locked in the company rather than being set against the owner's other income, which matters most for a start-up; and assets transferred into the company may trigger gains charges unless a deferral relief applies.\n\nThe deciding factor is usually **how much profit will be retained rather than extracted**. A business that distributes everything gains little from incorporation and pays for the privilege; one that reinvests can defer tax for years.",
        },
      ],
      check: {
        q: "An owner-manager takes a very small salary and the rest as dividends. What non-tax risk should the adviser raise?",
        options: [
          "Dividends are illegal below a minimum salary",
          "Contribution records, pension contribution capacity and evidence of income for lenders may all be damaged",
          "The company loses its right to deduct any expenses",
          "Dividends become subject to social contributions below a salary threshold",
        ],
        correct: 1,
        explain:
          "THE SAVING HAS COSTS THE COMPUTATION DOES NOT SHOW. Contributions frequently buy state pension and benefit entitlement; pension contribution limits are usually based on relevant earnings; and lenders assess salary. That is why the standard recommendation is a combination rather than dividends alone.",
      },
    },
  ],
  examTraps: [
    { trap: "Comparing salary and dividend using income tax rates only.", fix: "Include BOTH sets of social contributions and the corporate tax on undeducted dividends. Contributions usually decide the answer." },
    { trap: "Forgetting that the employer contribution comes out of the same pot.", fix: "Where a fixed sum is available, salary × (1 + employer rate) must equal that sum — so the salary payable is less than the amount available." },
    { trap: "Recommending dividends without checking distributable profits.", fix: "A dividend can only be paid from accumulated realised profits. A company with brought-forward losses may be legally unable to pay one." },
    { trap: "Ignoring that dividends follow shareholdings.", fix: "They are paid per share and cannot be directed to one individual the way a bonus can, which constrains companies with several shareholders." },
    { trap: "Treating a loan from the company as a tax-free extraction.", fix: "Most systems charge the company on loans to owners, refundable on repayment, plus a benefit charge on cheap credit for the individual." },
  ],
  keyTerms: [
    { term: "Distribution", def: "A payment out of a company's profits to its shareholders, not deductible for the company because it is an appropriation rather than an expense." },
    { term: "Distributable profits", def: "Accumulated realised profits less accumulated realised losses — the legal limit on what a company may pay as a dividend." },
    { term: "Owner-manager", def: "An individual who both owns and works in a company, and can therefore choose between salary and dividend as the route for extracting profit." },
    { term: "Personal service company rules", def: "Provisions taxing income broadly as employment income where an individual would have been an employee but for an interposed company." },
    { term: "Loan to participator", def: "A loan from a close company to an owner, typically triggering a refundable charge on the company and a benefit charge on the individual." },
    { term: "Close company", def: "A company controlled by a small number of participators, subject to additional rules because the usual arm's length discipline between company and owners is absent." },
  ],
  summary: [
    "Salary is deductible but attracts contributions from both sides; a dividend is not deductible but escapes contributions and often bears a reduced rate.",
    "The comparison usually turns on social contributions, and the uncapped employer charge is typically the largest single figure.",
    "Where a fixed sum is available, the employer contribution must come out of it, so the salary payable is less than the amount available.",
    "A dividend requires distributable profits, follows shareholdings, and cannot be directed at one person the way a bonus can.",
    "Low salaries can damage contribution records, pension capacity and borrowing, so a combination is usually recommended.",
    "Jurisdictions counter extraction planning through personal service company rules, charges on loans to owners, close company provisions and rate alignment.",
    "Whether to incorporate at all turns mainly on how much profit will be retained rather than extracted.",
  ],
}

export const TXG_AREA_E: StudyChapter[] = [TXG_TREE_14, TXG_TREE_15, TXG_TREE_16, TXG_TREE_17, TXG_TREE_18]
