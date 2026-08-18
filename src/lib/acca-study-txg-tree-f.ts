import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX-GLOBAL · Area F — consumption and indirect taxation. Chapters 19–21.
 *
 * A value added tax is the most widely adopted tax of the last seventy years, and its
 * design is genuinely elegant: it is charged at every stage of a supply chain but borne
 * only by the final consumer, because every registered business recovers what it paid.
 * Understanding that self-cancelling mechanism explains registration, the distinction
 * between zero-rated and exempt supplies, and the whole of cross-border VAT.
 *
 * Jurisdiction-neutral. Rates, registration thresholds, filing frequencies and the
 * boundaries of the reduced and zero rates all differ between countries; the mechanism
 * and the reasoning behind it do not.
 */

/* ── Chapter 19 ────────────────────────────────────────────────── */

export const TXG_TREE_19: StudyChapter = {
  id: "TXG-19",
  number: 19,
  paper: "TX",
  area: "F",
  title: "How a value added tax works, and who must register",
  minutes: 18,
  intro:
    "Charged at every stage, borne at the last. Once the self-cancelling mechanism is clear, registration, recovery and the difference between zero-rated and exempt all follow from it rather than needing to be memorised.",
  outcomes: [
    "Explain how a value added tax collects revenue without taxing businesses",
    "Distinguish taxable, zero-rated and exempt supplies and their consequences",
    "Explain compulsory and voluntary registration and the tests for each",
    "Explain when deregistration is required or advisable",
    "Explain the purpose of grouping several companies into one registration",
  ],
  sections: [
    {
      id: "the-mechanism",
      heading: "The mechanism, and why businesses are collectors rather than payers",
      blocks: [
        {
          kind: "text",
          md: "This is a **jurisdiction-neutral foundation track, not an ACCA exam variant**. Consumption taxes go by different names — value added tax, goods and services tax, a general sales tax — and their rates and thresholds vary widely. The mechanism described here is the value added type used in most of the world.\n\nThe design solves a problem older sales taxes could not. A tax charged only at the final sale is easy to evade and hard to police at the retail stage. A tax charged at every stage without relief **cascades**: tax is charged on a price that already includes tax, so the total burden depends on how many businesses the goods passed through, which distorts the structure of industry. Value added tax charges at every stage and then refunds the tax borne on inputs, so the cascade disappears.",
        },
        {
          kind: "formula",
          name: "The self-cancelling mechanism through a supply chain",
          expr: "Assume a rate of 20%. Each business charges tax on what it sells\n(OUTPUT tax) and recovers tax on what it buys (INPUT tax).\n\n                     Sells for   Output   Input    PAYS OVER\n  Forester             CU 100    CU 20    CU  0     CU 20\n  Sawmill              CU 300    CU 60    CU 20     CU 40\n  Furniture maker      CU 700    CU 140   CU 60     CU 80\n  Retailer             CU 1,000  CU 200   CU 140    CU 60\n                                                   -------\n  TOTAL COLLECTED BY THE AUTHORITY                  CU 200\n\n  And the CONSUMER paid  CU 1,000 x 20%  =  CU 200.\n\nEach business paid over tax only on the VALUE IT ADDED, and none of\nthem bore any of it. The whole CU 200 was borne by the final consumer.",
          note: "This table is worth being able to reproduce, because almost every conceptual question in the area is answered by pointing at it. It shows why a registered business is a COLLECTOR rather than a taxpayer, why the tax is neutral between long and short supply chains, and why the revenue is collected in instalments along the chain rather than all at the end — which is what makes it far more robust against evasion than a single-stage retail tax.",
        },
        {
          kind: "table",
          caption: "The three categories of supply, and why the difference is not cosmetic",
          head: ["", "Standard or reduced rated", "Zero-rated", "Exempt"],
          rows: [
            ["**Output tax charged**", "Yes, at the applicable rate", "Yes — at 0%", "No"],
            ["**Input tax recoverable**", "Yes, in full", "**YES, IN FULL**", "**NO**"],
            ["**Counts towards the registration threshold**", "Yes", "Yes", "No"],
            ["**Effect on the business**", "Neutral — a collector", "**Better than neutral** — recovers input tax while charging nothing", "**Bears the tax** as an unrecoverable cost"],
            ["**Typical use**", "Most goods and services", "Necessities the government wants untaxed: basic food, children's clothing, books, exports", "Activities where valuing the supply is impractical: financial services, insurance, health, education, land"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Zero-rated and exempt look identical to the customer and are opposites to the business",
          md: "In both cases the customer is charged no tax. That is where the similarity ends.\n\nA **zero-rated** supply is a **taxable** supply on which the rate happens to be nil. The business makes taxable supplies, so it registers, charges 0%, and **recovers all its input tax**. It is in a permanently repayment position — the authority pays it money each period. This is the most favourable status in the system.\n\nAn **exempt** supply is **outside** the taxable system. The business charges nothing and **recovers nothing**, so the tax on its purchases becomes a real cost that it must absorb or build into its prices. An exempt business is the one party in the chain that genuinely bears the tax.\n\nThe consequence for scenarios is direct: a business making only exempt supplies **cannot register at all**, and one making a mixture must apportion its input tax between recoverable and non-recoverable. Confusing the two categories reverses the answer completely, which is why it is the most examinable distinction in the area.",
        },
      ],
      check: {
        q: "A business makes only zero-rated supplies. What is its position?",
        options: [
          "It cannot register, because it charges no tax",
          "It registers, charges 0%, and recovers input tax in full — normally receiving repayments",
          "It registers but cannot recover input tax",
          "It is treated the same as an exempt business",
        ],
        correct: 1,
        explain:
          "ZERO-RATED SUPPLIES ARE TAXABLE SUPPLIES AT A NIL RATE. Because they are taxable, the business registers and recovers input tax in full while charging nothing — so it is permanently in a repayment position. An EXEMPT business is the opposite: outside the system, recovering nothing, and bearing the tax itself.",
      },
    },
    {
      id: "registration",
      heading: "Registration: compulsory, voluntary and grouped",
      blocks: [
        {
          kind: "formula",
          name: "The two registration tests, which run in parallel",
          expr: "HISTORIC (backward-looking) TEST\n     At the end of each month, look back over the previous\n     rolling period (commonly twelve months).\n     If TAXABLE SUPPLIES exceeded the threshold, register.\n\nFUTURE (forward-looking) TEST\n     At any time, if taxable supplies in the NEXT short period\n     (commonly thirty days) are expected ALONE to exceed the\n     threshold, register immediately.\n\nWhat counts towards the threshold:\n     standard, reduced AND ZERO-RATED supplies\nWhat does NOT:\n     exempt supplies, and sales of capital assets\n\nA business must MONITOR CONTINUOUSLY. The historic test uses a\nROLLING period, not the accounting year -- so it can be breached\nin any month, not only at the year end.",
          note: "The forward test exists to catch a business that will obviously exceed the threshold immediately — signing a single large contract, for instance — without waiting a year for the historic test to notice. It looks at the short period ALONE, not cumulatively with what came before, which is the detail most often got wrong. And because zero-rated supplies count towards the threshold, a wholly zero-rated business can be obliged to register even though it will never charge a penny of output tax.",
        },
        {
          kind: "example",
          title: "Applying both registration tests",
          scenario:
            "Jurisdiction Z has a registration threshold of CU 90,000 of taxable supplies on a rolling twelve-month historic test, and a thirty-day forward test. Merrow Design began trading on 1 January. Its monthly taxable supplies were CU 6,000 for January to June, then CU 9,000 for July to November. In December it makes taxable supplies of CU 11,000 and, on 5 December, signs a contract to deliver CU 95,000 of work during January.",
          steps: [
            { label: "Test the historic position at the end of November", detail: "January to June: 6 × CU 6,000 = CU 36,000. July to November: 5 × CU 9,000 = CU 45,000. Cumulative CU 81,000, below the CU 90,000 threshold. No obligation yet." },
            { label: "Test the historic position at the end of December", detail: "CU 81,000 + CU 11,000 = CU 92,000, which exceeds CU 90,000. The historic test is breached at 31 December, and registration would follow under the jurisdiction's stated notification and effective-date rules." },
            { label: "Now apply the forward test to the contract", detail: "On 5 December the business expects taxable supplies of CU 95,000 in January alone. That single period exceeds CU 90,000 by itself, so the forward test is breached on 5 DECEMBER — before the historic test bites at the month end." },
            { label: "Identify which test governs", detail: "The forward test is triggered first, on 5 December, so it is the one that decides the registration date. Registration under the forward test is normally IMMEDIATE — typically from the date the expectation arose rather than after a notification period." },
            { label: "State the practical consequence", detail: "From that date Merrow must charge output tax on its supplies. If it does not, the tax is still due — the authority will treat the consideration received as tax-inclusive, so the CU 95,000 becomes CU 95,000 × 20/120 = CU 15,833 of output tax out of money already received, borne by Merrow rather than its customer." },
          ],
          result:
            "**The forward test bites on 5 December, before the historic test at 31 December.** The lesson is that both tests must be applied, at every point rather than only at the year end, and that the consequence of missing registration is not merely a penalty — it is having to fund output tax out of prices that were set without it.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Voluntary registration is worth it for some businesses and harmful for others",
          md: "A business below the threshold may usually register anyway. Whether it should depends almost entirely on **who its customers are**.\n\n**Register voluntarily if:** its customers are themselves registered businesses, who recover whatever they are charged and are therefore indifferent to it. The business then recovers its own input tax at no commercial cost. A business making zero-rated supplies should almost always register, since it recovers input tax while charging nothing.\n\n**Do not register if:** its customers are private consumers, who cannot recover. Registering means either raising prices by the full rate — losing competitiveness against unregistered rivals — or absorbing the tax out of the existing price, which cuts the margin directly.\n\nThe secondary considerations are the compliance burden of returns and records, and the credibility that registration can lend a small business, since the threshold reveals something about turnover. But the customer question is the one that decides it, and an answer that names it is answering properly.",
        },
        {
          kind: "list",
          title: "Deregistration and grouping",
          items: [
            "**Compulsory deregistration** where the business ceases to make taxable supplies at all — it stops trading, or is sold, or its supplies become wholly exempt. The obligation is to notify within a stated period.",
            "**Voluntary deregistration** where taxable supplies fall below a stated lower threshold, usually set a little under the registration threshold so that a business hovering around it is not forced in and out repeatedly.",
            "**The sting on deregistration:** most systems charge output tax on the stock and capital assets still held, because input tax was recovered on them and they will now be used or sold outside the system. Overlooking this is a standard error in a cessation scenario.",
            "**Group registration** treats several commonly controlled companies as a single taxable person. Supplies BETWEEN members are disregarded, which removes cash flow and administration entirely, and one return is filed for all of them.",
            "**The cost of grouping:** every member becomes **jointly and severally liable** for the whole group's tax, so one member's failure exposes the others. Where a group contains an exempt or partly exempt member, grouping can also worsen overall recovery — which is why it is a decision rather than an automatic saving.",
          ],
        },
      ],
      check: {
        q: "A small business sells only to private consumers and is below the registration threshold. Should it register voluntarily?",
        options: [
          "Yes, because input tax recovery always outweighs the cost",
          "Generally no — its customers cannot recover, so it must raise prices or absorb the tax",
          "Yes, because registration is compulsory once trading begins",
          "It makes no difference either way",
        ],
        correct: 1,
        explain:
          "THE CUSTOMER BASE DECIDES IT. Private consumers cannot recover what they are charged, so registering forces the business either to raise prices against unregistered competitors or to absorb the tax from its margin. Voluntary registration pays where customers are registered businesses, who are indifferent because they recover it.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating zero-rated and exempt supplies as equivalent.", fix: "Zero-rated is TAXABLE at 0% with full input recovery; exempt is outside the system with NO recovery. They are opposites from the business's point of view." },
    { trap: "Excluding zero-rated supplies from the registration threshold.", fix: "They count. Only exempt supplies and capital asset sales are excluded, so a wholly zero-rated business can be obliged to register." },
    { trap: "Applying the historic test only at the accounting year end.", fix: "It uses a ROLLING period tested every month, so it can be breached at any month end." },
    { trap: "Adding earlier turnover into the forward test.", fix: "The forward test asks whether the NEXT short period ALONE will exceed the threshold. It is not cumulative." },
    { trap: "Forgetting the deemed supply on deregistration.", fix: "Output tax is normally charged on stock and capital assets still held, because input tax was recovered on them." },
  ],
  keyTerms: [
    { term: "Output tax", def: "Tax a registered business charges on its taxable supplies." },
    { term: "Input tax", def: "Tax a registered business is charged on its purchases, recoverable to the extent it relates to taxable supplies." },
    { term: "Taxable supply", def: "A supply within the scope of the tax, whether standard, reduced or zero rated. Zero-rated supplies are taxable supplies at a nil rate." },
    { term: "Exempt supply", def: "A supply outside the taxable system, on which no output tax is charged and no related input tax may be recovered." },
    { term: "Historic test", def: "The backward-looking registration test, applying to taxable supplies over a rolling period." },
    { term: "Future test", def: "The forward-looking registration test, triggered where supplies in a short coming period alone will exceed the threshold." },
    { term: "Group registration", def: "Treating commonly controlled companies as one taxable person, disregarding supplies between them but creating joint and several liability." },
  ],
  summary: [
    "Tax is charged at every stage and recovered by every registered business, so only the final consumer bears it and no cascade arises.",
    "Zero-rated supplies are taxable at 0% with full recovery; exempt supplies are outside the system with no recovery — they are opposites.",
    "Registration is tested historically over a rolling period and prospectively over a short coming period, and zero-rated supplies count towards the threshold.",
    "Missing registration means funding output tax from prices already set, because the consideration is treated as tax-inclusive.",
    "Voluntary registration pays where customers are registered businesses and harms a business selling to consumers.",
    "Deregistration usually triggers output tax on stock and assets still held, and group registration trades administrative saving for joint and several liability.",
  ],
}

/* ── Chapter 20 ────────────────────────────────────────────────── */

export const TXG_TREE_20: StudyChapter = {
  id: "TXG-20",
  number: 20,
  paper: "TX",
  area: "F",
  title: "Computing the liability: tax points, recovery and records",
  minutes: 18,
  intro:
    "Output tax less input tax is the whole computation. The difficulty is entirely in deciding which period a supply falls into, and which input tax may be recovered at all.",
  outcomes: [
    "Compute a period's liability from output and input tax",
    "Apply the basic and actual tax point rules and explain their purpose",
    "Distinguish tax-inclusive from tax-exclusive amounts and compute each",
    "Identify input tax that is blocked from recovery and explain why",
    "Apply a partial exemption apportionment",
  ],
  sections: [
    {
      id: "tax-points-and-computation",
      heading: "Which period does a supply fall into?",
      blocks: [
        {
          kind: "formula",
          name: "The tax point rules, and the tax-inclusive fraction",
          expr: "BASIC TAX POINT\n     goods:     when they are removed or made available\n     services:  when they are performed\n\nThe basic tax point is OVERRIDDEN if:\n     an INVOICE is issued or PAYMENT received BEFORE it\n         -> that earlier date becomes the tax point\n     an invoice is issued WITHIN a short period AFTER it\n         (commonly 14 days)\n         -> the invoice date becomes the tax point\n\nSo in practice:  payment or invoice EARLIER always wins;\n                 an invoice shortly after also wins.\n\nEXTRACTING TAX FROM A TAX-INCLUSIVE PRICE, at rate r:\n     tax  =  gross amount  x    r / (100 + r)\n     at 20%:  x 20/120  =  x 1/6\n     at 15%:  x 15/115\n\nFROM A TAX-EXCLUSIVE (net) amount:\n     tax  =  net amount  x  r/100",
          note: "The tax point decides the RETURN PERIOD, which is a cash flow question rather than a question of how much tax is due overall. Its practical importance is that issuing an invoice early accelerates the liability while delaying it — within the permitted window — defers it. The tax-inclusive fraction is the single most useful piece of arithmetic in the area: a scenario saying 'sales of CU 60,000 including tax' is not giving you the base, and treating it as if it were overstates output tax by the full rate.",
        },
        {
          kind: "example",
          title: "A period's computation, with tax points and blocked input tax",
          scenario:
            "Kestrel Supplies is registered in Jurisdiction Z, where the rate is 20% and entertaining customers and cars available for private use are blocked from recovery. For the quarter to 31 March it records: sales invoiced in the quarter of CU 480,000 excluding tax; goods delivered on 28 March but invoiced on 8 April for CU 36,000 excluding tax; a deposit of CU 24,000 including tax received on 15 March for goods to be delivered in May; purchases of stock of CU 180,000 excluding tax; a car for a sales manager, available for private use, costing CU 30,000 including tax; customer entertaining of CU 6,000 including tax; and office equipment of CU 18,000 excluding tax.",
          steps: [
            { label: "Output tax on ordinary sales", detail: "CU 480,000 × 20% = CU 96,000." },
            { label: "The goods delivered 28 March, invoiced 8 April", detail: "The basic tax point is 28 March, when the goods were removed. The invoice was issued on 8 April, within the 14-day window, so the INVOICE date becomes the tax point — 8 April, which falls in the NEXT quarter. No output tax this period." },
            { label: "The deposit received 15 March", detail: "Payment received before the basic tax point creates a tax point at that date, even though the goods will not be delivered until May. The deposit is tax-inclusive: CU 24,000 × 20/120 = CU 4,000 of output tax, due THIS quarter." },
            { label: "Total output tax", detail: "CU 96,000 + CU 4,000 = CU 100,000." },
            { label: "Recoverable input tax on stock and equipment", detail: "Stock CU 180,000 × 20% = CU 36,000. Office equipment CU 18,000 × 20% = CU 3,600. Both wholly for taxable business purposes, so both fully recoverable." },
            { label: "The blocked items", detail: "The car is available for private use, so its input tax of CU 30,000 × 1/6 = CU 5,000 is blocked entirely. Customer entertaining of CU 6,000 × 1/6 = CU 1,000 is also blocked. Neither may be recovered — and note the blocked tax becomes part of the cost of the asset or expense." },
            { label: "Compute the payment due", detail: "Output CU 100,000 less recoverable input (CU 36,000 + CU 3,600) = CU 60,400 payable to the authority." },
          ],
          result:
            "**CU 60,400 is payable.** Three deliberate traps: the deposit created a tax point long before the supply, the late invoice moved a March delivery into the next quarter, and CU 6,000 of blocked input tax had to be identified and excluded rather than netted off.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Blocked input tax, and why each block exists",
          md: "Some input tax is irrecoverable however genuinely business the purpose, because the alternative would be unworkable.\n\n**Cars available for private use.** Almost every car bought by a business has some private use, and policing the split for every vehicle would be impossible. So systems block recovery outright, usually with exceptions for vehicles used exclusively for business such as taxis, driving school cars and pool cars. Note the contrast with **running costs**, on which recovery is frequently allowed in full or in part.\n\n**Business entertaining of customers.** Blocked because the line between entertaining a client and enjoying a meal is unpoliceable. Entertaining **staff** is usually recoverable, being a reward for employment rather than hospitality — so read which one a scenario describes.\n\n**Non-business and private expenditure.** Not blocked so much as never eligible: it was not incurred for the business, so there is nothing to recover.\n\n**Purchases relating to exempt supplies.** Irrecoverable because the output was outside the system, which is the partial exemption problem below.\n\n**Purchases without a valid invoice.** Recovery normally requires evidence in the prescribed form. This is procedural rather than substantive, but it is the most common practical reason for a claim being refused.",
        },
      ],
      check: {
        q: "Goods are delivered on 28 March and invoiced on 8 April, within the jurisdiction's 14-day window. Which is the tax point?",
        options: [
          "28 March, the basic tax point",
          "8 April, because an invoice issued within the permitted period after the basic tax point overrides it",
          "The date payment is received",
          "The end of the quarter in which delivery occurred",
        ],
        correct: 1,
        explain:
          "THE INVOICE DATE OVERRIDES THE BASIC TAX POINT WITHIN THE WINDOW. So the supply falls into the following period, deferring the output tax by a quarter. Had the invoice been issued after the window closed, the basic tax point of 28 March would have stood.",
      },
    },
    {
      id: "partial-exemption-and-records",
      heading: "Partial exemption, bad debts and the administrative cycle",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Partial exemption: a business that does both must split its input tax",
          md: "A business making **both** taxable and exempt supplies cannot recover all its input tax, and cannot be denied all of it either. So input tax is divided into three:\n\n**Directly attributable to taxable supplies** — fully recoverable.\n\n**Directly attributable to exempt supplies** — not recoverable at all.\n\n**Residual (overheads)** — rent, audit fees, utilities, head office costs, which support both. These are apportioned, normally by the **ratio of taxable supplies to total supplies**, and the taxable proportion is recovered.\n\nMost systems add a **de minimis** rule: where the irrecoverable amount is small in both absolute and proportionate terms, the business may recover everything. The purpose is administrative — the calculation costs more than it collects for businesses with a trivial exempt element, such as a trading company earning a little bank interest.\n\nExpect an annual adjustment as well. Quarterly recovery is provisional, based on that quarter's ratio, and is trued up at the year end against the annual figures — because a single quarter can be unrepresentative.",
        },
        {
          kind: "example",
          title: "A partial exemption calculation",
          scenario:
            "Brant Financial in Jurisdiction Z makes taxable supplies of CU 900,000 and exempt supplies of CU 300,000 in a quarter. Its input tax is: CU 40,000 directly attributable to taxable supplies, CU 15,000 directly attributable to exempt supplies, and CU 24,000 of residual overheads. The de minimis limit is irrecoverable input tax below CU 2,000 per quarter and below 50% of total input tax.",
          steps: [
            { label: "Deal with the directly attributable amounts", detail: "CU 40,000 attributable to taxable supplies is recoverable in full. CU 15,000 attributable to exempt supplies is irrecoverable in full. No apportionment is needed for either." },
            { label: "Compute the recovery ratio", detail: "Taxable supplies / total supplies = CU 900,000 / CU 1,200,000 = 75%. The exempt supplies are included in the denominator, which is what makes the ratio meaningful." },
            { label: "Apportion the residual input tax", detail: "CU 24,000 × 75% = CU 18,000 recoverable, and CU 6,000 irrecoverable." },
            { label: "Total the irrecoverable amount", detail: "CU 15,000 directly attributable to exempt supplies + CU 6,000 residual = CU 21,000." },
            { label: "Test de minimis", detail: "CU 21,000 far exceeds the CU 2,000 limit, so de minimis does not apply and the restriction stands. Had the exempt element been trivial, all CU 79,000 would have been recoverable." },
            { label: "State the recoverable figure", detail: "CU 40,000 + CU 18,000 = CU 58,000 recoverable out of CU 79,000 of input tax. The CU 21,000 irrecoverable is a real cost to Brant, absorbed into its expenses." },
          ],
          result:
            "**CU 58,000 recoverable, with CU 21,000 becoming a cost of the business.** That last sentence is the one worth writing: irrecoverable input tax is not a timing difference or a deferral, it is a permanent cost, and it is why exempt businesses such as banks and insurers structure their purchasing so carefully.",
        },
        {
          kind: "list",
          title: "The administrative cycle and the reliefs within it",
          items: [
            "**Returns and payment.** Usually quarterly, sometimes monthly for repayment traders who prefer the cash flow, with the return and payment due a fixed period after the period end. Filing and payment are separate obligations, as in Chapter 3.",
            "**Invoices.** A registered supplier must issue a compliant invoice to another registered business, showing the prescribed particulars. The invoice is the customer's evidence for recovery, so a defective one costs the CUSTOMER rather than the supplier.",
            "**Records.** Sales and purchase records, invoices and a summary account must be kept for a stated period. The tax is transaction-based, so record failures are more damaging here than in most taxes.",
            "**Bad debt relief.** Output tax already paid over on an invoice that is never paid can usually be reclaimed once the debt is a stated age and has been written off in the accounts. Without it a business would bear tax on income it never received.",
            "**Errors.** Small errors are commonly corrected on the next return; larger ones must be separately disclosed. As in Chapter 3, an unprompted disclosure attracts the largest penalty reduction.",
            "**Interest and penalties.** Late filing and late payment attract their own charges, increasingly on a points or escalating basis so that repeated lateness costs more than an isolated slip.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Cash flow is the real subject of most VAT planning",
          md: "Because a registered business bears no VAT, planning is almost never about reducing the tax — it is about **when** the money moves.\n\nA business that invoices promptly and is paid slowly funds the authority out of its own working capital: output tax is due by reference to the tax point, not by reference to payment. A business that is paid before it supplies holds the authority's money for a period.\n\nThat is why the choices in this area are cash flow choices: **when to issue invoices**, whether to use a **cash accounting** scheme that shifts the tax point to payment (Chapter 21), whether to file **monthly** returns to accelerate repayments, and how quickly to claim **bad debt relief**.\n\nStating that a measure improves cash flow rather than reducing tax is what shows the mechanism has been understood, and it is a distinction weak answers routinely miss.",
        },
      ],
      check: {
        q: "A partly exempt business has taxable supplies of CU 600,000 and exempt supplies of CU 200,000, with residual input tax of CU 16,000. How much residual tax is recoverable?",
        options: [
          "CU 16,000, because residual tax is always recoverable",
          "CU 12,000, being 600,000 / 800,000 = 75%",
          "CU 4,000, being the exempt proportion",
          "Nil, because residual tax cannot be attributed",
        ],
        correct: 1,
        explain:
          "APPORTION BY TAXABLE SUPPLIES OVER TOTAL SUPPLIES. CU 600,000 / CU 800,000 = 75%, so CU 16,000 × 75% = CU 12,000 is recoverable and CU 4,000 is not — subject to the de minimis test, which could restore the whole amount if the irrecoverable figure were small enough.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating a tax-inclusive amount as the net figure.", fix: "Extract the tax with r/(100+r) — one sixth at 20%. Multiplying a gross figure by the rate overstates output tax substantially." },
    { trap: "Ignoring a deposit received before the supply.", fix: "Payment received creates a tax point at that date, even though the goods are delivered months later." },
    { trap: "Recovering input tax on a car available for private use or on customer entertaining.", fix: "Both are blocked. Note that staff entertaining and car running costs are commonly recoverable, so read which one is described." },
    { trap: "Apportioning directly attributable input tax.", fix: "Only RESIDUAL overheads are apportioned. Directly attributable amounts are recovered in full or not at all." },
    { trap: "Describing a scheme as reducing the tax.", fix: "A registered business bears no tax. Schemes and invoicing choices change the TIMING — say cash flow, not saving." },
  ],
  keyTerms: [
    { term: "Tax point", def: "The date a supply is treated as taking place, deciding which return period it falls into." },
    { term: "Basic tax point", def: "Removal or availability of goods, or performance of services, before any invoice or payment override." },
    { term: "Tax-inclusive fraction", def: "r/(100+r), used to extract tax from a gross amount — one sixth at a 20% rate." },
    { term: "Blocked input tax", def: "Input tax that cannot be recovered regardless of business purpose, typically on cars available for private use and customer entertaining." },
    { term: "Partial exemption", def: "The apportionment of input tax where a business makes both taxable and exempt supplies." },
    { term: "Residual input tax", def: "Input tax on overheads supporting both taxable and exempt supplies, apportioned by the ratio of taxable to total supplies." },
    { term: "De minimis", def: "A rule allowing full recovery where irrecoverable input tax is small in both absolute and proportionate terms." },
    { term: "Bad debt relief", def: "Recovery of output tax already paid on an invoice that has gone unpaid for a stated period and been written off." },
  ],
  summary: [
    "The liability is output tax less recoverable input tax; the difficulty is timing and eligibility, not the subtraction.",
    "The basic tax point is overridden by an earlier invoice or payment, and by an invoice issued shortly afterwards.",
    "Extract tax from gross amounts with r/(100+r) — a gross figure is not the base.",
    "Input tax on cars available for private use and on customer entertaining is blocked; staff entertaining and running costs usually are not.",
    "Partly exempt businesses recover directly attributable taxable input tax in full, none of the exempt, and a ratio of residual overheads — subject to de minimis.",
    "Irrecoverable input tax is a permanent cost, not a timing difference.",
    "Planning in this area is about cash flow, because a registered business bears no tax.",
  ],
}

/* ── Chapter 21 ────────────────────────────────────────────────── */

export const TXG_TREE_21: StudyChapter = {
  id: "TXG-21",
  number: 21,
  paper: "TX",
  area: "F",
  title: "Cross-border supplies and the special schemes",
  minutes: 18,
  intro:
    "A consumption tax should be borne where the consumption happens. Everything about cross-border VAT follows from that single principle, including the reverse charge that makes it work without policing every foreign supplier.",
  outcomes: [
    "Explain the destination principle and why it governs cross-border supplies",
    "Explain the zero-rating of exports and the taxation of imports",
    "Explain the reverse charge and the problem it solves",
    "Apply place of supply rules to services",
    "Explain the operation and advantages of the common special schemes",
  ],
  sections: [
    {
      id: "destination-and-reverse-charge",
      heading: "Taxing consumption where it happens",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "The destination principle, and what it implies",
          md: "A consumption tax should be borne in the country where the goods or services are **consumed**, not where they were produced. Two consequences follow, and between them they explain nearly all cross-border VAT.\n\n**Exports leave untaxed.** Goods sent abroad are **zero-rated**: no output tax is charged, and — because zero-rating is a taxable supply — the exporter still recovers all its input tax. The goods leave the country carrying no tax at all, which is exactly right, since they will be taxed on arrival.\n\n**Imports are taxed on arrival**, at the importing country's own rate, so that imported goods bear the same tax as domestic ones. Without this, imports would be systematically cheaper than local production and the tax would distort trade.\n\nNotice how neatly zero-rating fits the purpose. If exports were merely **exempt**, the exporter could not recover input tax, so the goods would leave carrying hidden domestic tax embedded in their price and would then be taxed again on arrival. Zero-rating is what makes the goods genuinely tax-free at the border — and it is the clearest illustration of why the zero-rated/exempt distinction from Chapter 19 matters.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The reverse charge: how a country taxes a supplier it cannot reach",
          md: "Imported **services** create a problem that imported goods do not. Goods cross a physical border where they can be stopped and taxed. A consultancy report emailed from abroad crosses nothing.\n\nRequiring the foreign supplier to register and account for tax in every country its customers live in would be unenforceable — the authority has no jurisdiction over it and no practical means of collection.\n\nThe **reverse charge** solves this by moving the obligation to the **customer**. The customer accounts for output tax on the supply as if it had made the supply itself, and simultaneously recovers the same amount as input tax under the ordinary rules.\n\nFor a **fully taxable** customer the two entries cancel and the net effect is nil — it is a compliance exercise rather than a cost. But for an **exempt or partly exempt** customer the output tax is due in full while the input tax is restricted, so a real cost arises. That asymmetry is the whole point: it stops a bank or an insurer buying services from abroad tax-free when the same service bought domestically would have carried irrecoverable tax. Without the reverse charge, exempt businesses would offshore every service they could.",
        },
        {
          kind: "table",
          caption: "Place of supply — the general rules for services",
          head: ["Situation", "Where the supply is treated as made", "Who accounts for the tax"],
          rows: [
            ["**Business to business (B2B)**", "Where the CUSTOMER belongs", "The customer, by reverse charge"],
            ["**Business to consumer (B2C)**", "Generally where the SUPPLIER belongs", "The supplier, in its own country"],
            ["**Services relating to land**", "Where the LAND is situated", "Determined by the location of the property, whoever the parties are"],
            ["**Admission to events, restaurant and physical services**", "Where the service is PHYSICALLY PERFORMED", "The supplier, in the country of performance"],
            ["**Digital services to consumers**", "Where the CONSUMER belongs, under most modern rules", "The supplier, often through a simplified single registration"],
          ],
        },
        {
          kind: "example",
          title: "Applying place of supply and the reverse charge",
          scenario:
            "Ardent Insurance is established in Jurisdiction Z, where the rate is 20%. Its supplies are wholly exempt. During a quarter it receives: consultancy services costing CU 200,000 from a firm established in Jurisdiction A; architectural services costing CU 80,000 relating to an office building it owns in Jurisdiction B, supplied by a firm in Jurisdiction A; and it pays CU 50,000 to a Jurisdiction A conference organiser for staff to attend an event physically held in Jurisdiction A.",
          steps: [
            { label: "The consultancy — identify the rule", detail: "This is a business-to-business supply of general services, so the place of supply is where the CUSTOMER belongs: Jurisdiction Z." },
            { label: "The consultancy — apply the reverse charge", detail: "Ardent accounts for output tax of CU 200,000 × 20% = CU 40,000 as if it had made the supply. It then seeks to recover the same amount as input tax." },
            { label: "The consultancy — apply Ardent's recovery position", detail: "Ardent is wholly exempt, so it recovers NONE of that input tax. The CU 40,000 is a real and permanent cost. Had Ardent been fully taxable, the two entries would have cancelled to nil." },
            { label: "The architectural services — a land rule overrides", detail: "Services relating to land are supplied where the LAND is, regardless of where either party belongs. The building is in Jurisdiction B, so the place of supply is B — outside Z's scope entirely. No reverse charge arises in Z; Ardent may have an obligation in B under B's own rules." },
            { label: "The conference — a performance rule overrides", detail: "Admission to events is supplied where the event is physically held. The event is in Jurisdiction A, so A's tax applies and the organiser charges it. Again no reverse charge in Z, and any A tax charged is not recoverable by Ardent in Z." },
            { label: "State the net position in Jurisdiction Z", detail: "Only the consultancy falls within Z. Ardent must account for CU 40,000 of output tax under the reverse charge and can recover none of it." },
          ],
          result:
            "**CU 40,000 of irrecoverable reverse charge tax, with the other two supplies outside Z's scope.** The scenario is built to show that the specific rules — land and physical performance — override the general business-to-business rule, and that the reverse charge only bites where the general rule brings the supply home.",
        },
      ],
      check: {
        q: "Why does the reverse charge produce a real cost for an exempt business but not for a fully taxable one?",
        options: [
          "Because exempt businesses pay a higher rate",
          "Because the output tax is due in full while the input tax is restricted by the customer's exempt status",
          "Because exempt businesses cannot use the reverse charge",
          "Because the supplier charges tax as well",
        ],
        correct: 1,
        explain:
          "THE TWO ENTRIES ONLY CANCEL IF THE INPUT TAX IS RECOVERABLE. A fully taxable customer accounts for output tax and recovers the identical amount, netting to nil. An exempt customer accounts for the output tax and recovers nothing — which is exactly the intended effect, since buying the service domestically would also have carried irrecoverable tax.",
      },
    },
    {
      id: "special-schemes",
      heading: "The special schemes, and who each one suits",
      blocks: [
        {
          kind: "table",
          caption: "The three schemes that appear in most systems",
          head: ["Scheme", "How it works", "Who benefits", "Who should avoid it"],
          rows: [
            ["**Cash accounting**", "Tax point becomes the date of PAYMENT rather than of invoice, for both sales and purchases", "Businesses giving credit to customers, and any business with slow payers — bad debt relief becomes automatic", "Businesses paid immediately but buying on credit, which lose the timing benefit on purchases"],
            ["**Annual accounting**", "One return a year, with instalments on account during the year based on the prior year", "Businesses wanting predictable payments and less administration", "Growing businesses, whose instalments lag behind, and repayment traders who would wait a year for money"],
            ["**Flat rate**", "Pay a fixed percentage of tax-inclusive turnover; do not reclaim input tax on most purchases", "Very small businesses with low input costs, mainly selling services", "Businesses with substantial purchases or capital spending, and zero-rated businesses"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Cash accounting gives bad debt relief automatically, and that is often its real value",
          md: "Under normal rules output tax is due by reference to the tax point, so a business pays tax on an invoice whether or not it is ever paid, and must then make a separate bad debt relief claim months later once the debt is old enough and written off.\n\nUnder cash accounting the tax point **is** payment. If the customer never pays, no output tax ever becomes due — no claim, no waiting period, no write-off requirement.\n\nFor a business with slow or unreliable customers this is worth more than the headline cash flow advantage, and saying so is what distinguishes a full answer. The trade-off is symmetrical and must be mentioned: **input tax also moves to the date of payment**, so a business that buys on credit and is paid immediately loses more than it gains and should stay on the normal method.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "A flat rate scheme is a simplification, not a saving — and it can cost money",
          md: "The flat percentage is set below the standard rate to approximate the input tax the business is giving up. Whether it is better than normal accounting depends entirely on how much input tax the business actually incurs.\n\n**It suits** a service business with few purchases — a consultant whose main cost is their own time — because there was little input tax to lose. Administration falls sharply, since input tax on most purchases need not be tracked at all.\n\n**It harms** a business with significant purchases, because it surrenders recovery it would otherwise have had. It is usually disastrous for a **zero-rated** business, which under normal rules charges nothing and recovers everything: under a flat rate scheme it would pay a percentage of turnover on supplies that should bear no tax at all.\n\nMost systems soften the second point by allowing recovery on **capital assets above a threshold**, so a large one-off purchase is not lost. But the general principle stands: test the scheme against the business's actual input tax before recommending it, and never present it as a tax saving.",
        },
        {
          kind: "example",
          title: "Testing whether a flat rate scheme is worth using",
          scenario:
            "Two businesses in Jurisdiction Z, where the standard rate is 20% and a flat rate scheme charges 13% of tax-inclusive turnover. Each has annual sales of CU 200,000 excluding tax, all standard rated. Halden Consulting incurs standard-rated purchases of CU 15,000 excluding tax. Ferrow Catering incurs standard-rated purchases of CU 90,000 excluding tax.",
          steps: [
            { label: "Compute tax-inclusive turnover", detail: "CU 200,000 × 1.20 = CU 240,000 for both businesses, since the flat rate applies to the gross figure." },
            { label: "Flat rate liability, same for both", detail: "CU 240,000 × 13% = CU 31,200 payable, with no recovery on ordinary purchases." },
            { label: "Halden under normal accounting", detail: "Output tax CU 200,000 × 20% = CU 40,000, less input tax CU 15,000 × 20% = CU 3,000. Net payable CU 37,000." },
            { label: "Halden's comparison", detail: "Flat rate CU 31,200 against normal CU 37,000 — the scheme saves CU 5,800 a year and removes most of the record-keeping. Halden should use it." },
            { label: "Ferrow under normal accounting", detail: "Output tax CU 40,000 less input tax CU 90,000 × 20% = CU 18,000. Net payable CU 22,000." },
            { label: "Ferrow's comparison", detail: "Flat rate CU 31,200 against normal CU 22,000 — the scheme costs CU 9,200 a year. Ferrow should not use it." },
            { label: "State the principle the two cases share", detail: "The break-even is where input tax equals the difference between output tax and the flat rate charge: CU 40,000 − CU 31,200 = CU 8,800, which is input tax on purchases of CU 44,000. Below that level of purchases the scheme wins; above it, the scheme loses." },
          ],
          result:
            "**Identical turnover, opposite recommendations — the scheme saves Halden CU 5,800 and costs Ferrow CU 9,200.** Computing the break-even is what turns the answer from an assertion into advice, and it generalises: the scheme suits low-input businesses and penalises purchase-heavy ones.",
        },
      ],
      check: {
        q: "Why is a flat rate scheme usually a poor choice for a wholly zero-rated business?",
        options: [
          "Because zero-rated businesses cannot register",
          "Because it would pay a percentage of turnover on supplies that should bear no tax, while giving up the input tax recovery it would otherwise receive",
          "Because zero-rated supplies are excluded from turnover",
          "Because the flat percentage is higher for zero-rated businesses",
        ],
        correct: 1,
        explain:
          "IT TURNS A REPAYMENT POSITION INTO A PAYMENT. Under normal rules a zero-rated business charges no output tax and recovers all its input tax, so the authority pays it. Under a flat rate scheme it pays a percentage of its turnover and recovers almost nothing — the worst possible outcome.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating exports as exempt rather than zero-rated.", fix: "Zero-rating lets the exporter recover input tax, so goods leave genuinely tax-free. Exemption would leave hidden domestic tax embedded in the price." },
    { trap: "Applying the general business-to-business rule to land or event services.", fix: "Specific rules override. Land is taxed where the property is; admission and physical services where they are performed." },
    { trap: "Assuming the reverse charge is always cost-free.", fix: "It nets to nil only for a fully taxable customer. For an exempt or partly exempt one the output tax is due and the input tax restricted — which is the point of it." },
    { trap: "Recommending cash accounting without checking purchase terms.", fix: "The tax point moves for purchases too. A business paid immediately but buying on credit loses more than it gains." },
    { trap: "Presenting a special scheme as reducing tax.", fix: "Cash and annual accounting change TIMING. A flat rate scheme changes the amount, and can easily increase it — test it against the business's actual input tax." },
  ],
  keyTerms: [
    { term: "Destination principle", def: "The rule that consumption should be taxed where it occurs, so exports leave untaxed and imports are taxed on arrival." },
    { term: "Reverse charge", def: "A mechanism requiring the customer to account for output tax on a supply received from abroad, and to recover it under the ordinary rules." },
    { term: "Place of supply", def: "The rules deciding which jurisdiction's tax applies to a supply, generally the customer's country for business-to-business services." },
    { term: "Cash accounting scheme", def: "A scheme moving the tax point to the date of payment for both sales and purchases, giving automatic bad debt relief." },
    { term: "Annual accounting scheme", def: "A scheme replacing periodic returns with one annual return plus instalments based on the prior year." },
    { term: "Flat rate scheme", def: "A simplification charging a fixed percentage of tax-inclusive turnover in place of ordinary output and input tax accounting." },
  ],
  summary: [
    "The destination principle taxes consumption where it happens: exports are zero-rated and imports taxed on arrival.",
    "Zero-rating rather than exemption is what lets goods leave genuinely free of tax.",
    "The reverse charge moves the obligation to the customer, because a foreign supplier cannot be compelled to register everywhere.",
    "It nets to nil for a fully taxable customer and creates a real cost for an exempt one — which is exactly its purpose.",
    "Place of supply is the customer's country for business-to-business services, with overriding rules for land and for physically performed services.",
    "Cash accounting shifts timing and gives automatic bad debt relief; annual accounting smooths payments; a flat rate scheme trades recovery for simplicity.",
    "Test a flat rate scheme against actual input tax — it suits low-input service businesses and penalises purchase-heavy and zero-rated ones.",
  ],
}

export const TXG_AREA_F: StudyChapter[] = [TXG_TREE_19, TXG_TREE_20, TXG_TREE_21]
