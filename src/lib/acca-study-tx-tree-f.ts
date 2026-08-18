import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX-UK · Areas F and G — value added tax, and employability and technology skills.
 * Chapters 26–29, completing the TX-UK reading tree at 29 chapters.
 *
 * VAT is worth roughly ten marks of every sitting and is the most self-contained part of
 * the paper: nothing in it depends on income tax or corporation tax. That makes it the
 * cheapest area to secure, and the one candidates most often leave until it is too late.
 *
 * Excluded from these chapters because they are excluded from the syllabus: the second-hand
 * goods scheme, the capital goods scheme, the special scheme for retailers, and the rules
 * for imported goods below £135.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

/* ── Chapter 26 · F1 ──────────────────────────────────────────── */

export const TX_TREE_26: StudyChapter = {
  id: "TX-26",
  number: 26,
  paper: "TX",
  area: "F",
  title: "VAT: scope, registration and deregistration",
  minutes: 17,
  syllabusRefs: ["F1(a)", "F1(b)", "F1(c)", "F2(f)"],
  intro:
    "Two registration tests, running on different clocks and producing different registration dates. Getting the date right is most of the marks in this chapter.",
  outcomes: [
    "Explain the scope of VAT and identify taxable, zero-rated and exempt supplies",
    "Apply the historic and future prospects registration tests",
    "State the notification deadline and the effective date of registration",
    "Explain voluntary registration and deregistration",
    "Explain pre-registration input VAT and VAT groups",
  ],
  sections: [
    {
      id: "scope",
      heading: "The scope of VAT, and the three kinds of supply",
      blocks: [
        {
          kind: "table",
          caption: "Standard-rated, zero-rated and exempt — the difference that matters",
          head: ["", "Output VAT charged", "Input VAT recoverable", "Counts as taxable turnover for registration"],
          rows: [
            ["**Standard-rated** (20%)", "Yes, at 20%", "**Yes**", "**Yes**"],
            ["**Reduced-rated** (5%)", "Yes, at 5% — domestic fuel, some energy-saving materials", "**Yes**", "**Yes**"],
            ["**Zero-rated** (0%)", "Yes, at **0%** — so none in money terms", "**YES**", "**YES**"],
            ["**Exempt**", "**No**", "**NO**", "**No**"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Zero-rated and exempt are not the same thing at all",
          md: "A **zero-rated** supply is a **taxable** supply charged at 0%. So the trader is in the VAT system: they recover their input VAT in full, and their zero-rated turnover **counts** towards the registration threshold. A zero-rated trader is usually in a **repayment** position, which is why they register voluntarily.\n\nAn **exempt** supply is **outside** the charge. The trader cannot recover input VAT on costs attributable to it, and exempt turnover does **not** count towards registration. So exemption is worse for the trader than zero-rating — it removes the output charge but takes the input recovery with it.\n\nPrincipal **zero-rated**: most food, books and newspapers, children's clothing, public transport, new residential construction, drugs on prescription, and exports. Principal **exempt**: insurance, financial services, postal services, education, health, betting, and rent on land and buildings.",
        },
        {
          kind: "list",
          title: "Input VAT that can never be recovered",
          items: [
            "**VAT on a car**, unless it is used wholly for business — which in practice means a pool car with no private use. VAT on a **van** or a **lorry** IS recoverable.",
            "**Business entertaining**, other than entertaining **staff** or **overseas** customers.",
            "VAT on supplies used for **exempt** activities, or for **non-business** purposes.",
            "VAT on the **private** proportion of a mixed-use supply, though the business proportion is recoverable.",
            "VAT with **no valid invoice** to support it — the invoice is the evidence and without it there is no claim.",
            "Note that VAT on **fuel** for private motoring IS recoverable in full, with an output tax **scale charge** applied instead to reflect the private use.",
          ],
        },
      ],
      check: {
        q: "Why is a zero-rated trader in a better position than an exempt one?",
        options: [
          "Zero-rated traders charge more output VAT",
          "A zero-rated supply is taxable at 0%, so input VAT is fully recoverable and the turnover counts for registration; an exempt supply is outside the charge, so input VAT is lost",
          "Exempt traders pay VAT at 5%",
          "There is no practical difference",
        ],
        correct: 1,
        explain:
          "ZERO-RATED IS TAXABLE AT 0%, SO INPUT VAT IS RECOVERED. The trader charges nothing but reclaims everything, usually producing a repayment. An exempt trader is outside the system: no output VAT, but no input recovery either, so the VAT on their costs is a real cost.",
      },
    },
    {
      id: "registration",
      heading: "The two registration tests",
      blocks: [
        {
          kind: "formula",
          name: "Compulsory registration",
          expr: "HISTORIC TEST — looking BACKWARDS\n   Taxable turnover in any ROLLING 12-MONTH period exceeds £90,000\n   ·  test at the END of each month, looking back up to 12 months\n   ·  NOTIFY HMRC within 30 DAYS of the END of the month in which\n      the limit was exceeded\n   ·  REGISTERED from the FIRST DAY of the SECOND month after that\n\nFUTURE PROSPECTS TEST — looking FORWARDS\n   Taxable turnover expected to exceed £90,000 in the NEXT 30 DAYS ALONE\n   ·  NOTIFY HMRC BEFORE the end of that 30-day period\n   ·  REGISTERED from the START of that 30-day period\n\nTaxable turnover means standard-rated PLUS reduced-rated PLUS ZERO-RATED\nsupplies, EXCLUDING exempt supplies and sales of capital assets.\n\nDEREGISTRATION — taxable turnover for the NEXT 12 months expected to\nfall below £88,000. Notify within 30 days.",
          note: "The two tests produce very different dates from the same threshold. The historic test gives up to two months of grace; the future prospects test registers the trader from the START of the period, so registration is effectively immediate. A question giving month-by-month turnover is testing the historic test; one giving a single large contract is testing the future test.",
        },
        {
          kind: "example",
          title: "Applying the historic test",
          scenario:
            "Threlkeld Ltd began trading on 1 January 2025 making standard-rated supplies. Its cumulative taxable turnover reached £86,000 by the end of September 2025, £91,500 by the end of October 2025 and £98,000 by the end of November 2025.",
          steps: [
            { label: "Test at the end of each month", detail: "The historic test looks back over the rolling 12 months at each month end. At 30 September cumulative turnover was £86,000, which is below £90,000, so no obligation arose." },
            { label: "Identify the month the limit was exceeded", detail: "At 31 October 2025 cumulative turnover was £91,500, which exceeds £90,000. So October 2025 is the relevant month." },
            { label: "Compute the notification deadline", detail: "Notify HMRC within 30 days of the end of that month: by 30 NOVEMBER 2025." },
            { label: "Compute the effective date of registration", detail: "Registered from the first day of the second month after the month in which the limit was exceeded. October is the month, so the second month after it is December: registration takes effect from 1 DECEMBER 2025." },
            { label: "State the consequence of the dates", detail: "Threlkeld must charge output VAT on supplies made from 1 December 2025. Supplies in October and November are outside the registration and carry no VAT — which is why the exact date matters commercially as well as for the marks." },
            { label: "Note the failure-to-notify consequence", detail: "Had Threlkeld not notified, it would still be treated as registered from 1 December 2025 and would owe the output VAT on all supplies since — out of its own pocket if it did not charge it — plus a penalty for late notification." },
          ],
          result:
            "**Notify by 30 November 2025; registered from 1 December 2025.** The month the limit is exceeded drives both dates, and the registration date is the first day of the SECOND month after it.",
        },
        {
          kind: "table",
          caption: "Voluntary registration, groups and pre-registration input VAT",
          head: ["", "Rules"],
          rows: [
            ["**Voluntary registration**", "Permitted below the threshold. Worth it where supplies are **zero-rated** or customers are **VAT-registered**, since input VAT becomes recoverable. Not worth it where customers are the **public**, since prices effectively rise by 20%"],
            ["**Pre-registration input VAT**", "Recoverable on **goods** bought in the **4 years** before registration, still held at registration and used in the business; and on **services** supplied in the **6 months** before registration"],
            ["**VAT groups**", "Companies under **common control** may register as a group. One return, one payment, and supplies **between** members are **outside** the scope of VAT — but every member is **jointly and severally liable** for the group's VAT"],
            ["**Transfer as a going concern**", "Not a supply, so no VAT is charged, provided the business is transferred as a going concern and the purchaser is or becomes registered"],
          ],
        },
      ],
      check: {
        q: "Cumulative taxable turnover first exceeds £90,000 at the end of October 2025. When must the trader notify HMRC, and from when is it registered?",
        options: [
          "Notify by 30 November 2025, registered from 1 November 2025",
          "Notify by 30 November 2025, registered from 1 December 2025",
          "Notify by 31 October 2025, registered from 1 November 2025",
          "Notify by 1 December 2025, registered from 1 January 2026",
        ],
        correct: 1,
        explain:
          "NOTIFY BY 30 NOVEMBER, REGISTERED FROM 1 DECEMBER. Notification is within 30 days of the end of the month in which the limit was exceeded, and registration takes effect from the first day of the SECOND month after that month — so October gives 1 December.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Excluding zero-rated supplies from taxable turnover for registration.",
      fix: "Zero-rated supplies COUNT. Only exempt supplies and capital asset sales are excluded.",
    },
    {
      trap: "Registering from the first day of the NEXT month under the historic test.",
      fix: "It is the first day of the SECOND month after the month the limit was exceeded.",
    },
    {
      trap: "Applying the historic test's dates to the future prospects test.",
      fix: "The future test registers from the START of the 30-day period, with notification before it ends.",
    },
    {
      trap: "Recovering input VAT on a car used partly privately.",
      fix: "VAT on a car is irrecoverable unless there is no private use at all. Vans are recoverable.",
    },
    {
      trap: "Treating exemption as equivalent to zero-rating.",
      fix: "Zero-rating keeps input recovery; exemption loses it.",
    },
  ],
  keyTerms: [
    { term: "Taxable turnover", def: "Standard, reduced and zero-rated supplies, excluding exempt supplies and capital asset sales." },
    { term: "Historic test", def: "Registration where rolling 12-month taxable turnover exceeds £90,000, tested at each month end." },
    { term: "Future prospects test", def: "Registration where turnover is expected to exceed £90,000 in the next 30 days alone." },
    { term: "Zero-rated supply", def: "A taxable supply at 0%, preserving input VAT recovery." },
    { term: "Exempt supply", def: "A supply outside the charge, with no output VAT and no input recovery." },
    { term: "VAT group", def: "Companies under common control filing one return, with intra-group supplies outside the scope and joint liability." },
  ],
  summary: [
    "Zero-rated supplies are taxable at 0% and preserve input recovery; exempt supplies do not.",
    "The historic test uses rolling 12-month turnover over £90,000, tested at each month end.",
    "Notify within 30 days of the month end and register from the first day of the second month after.",
    "The future prospects test registers the trader from the start of the 30-day period.",
    "Deregistration applies where turnover for the next 12 months is expected to fall below £88,000.",
  ],
  knowledgeDiagnostic: [
    { q: "Do zero-rated supplies count towards the registration threshold?", a: "Yes. Taxable turnover includes standard, reduced and zero-rated supplies; only exempt supplies and capital asset sales are excluded." },
    { q: "What are the two dates under the historic test?", a: "Notify within 30 days of the end of the month the limit was exceeded, and register from the first day of the second month after that month." },
    { q: "When would voluntary registration be worthwhile?", a: "Where supplies are zero-rated or customers are VAT-registered, so input VAT becomes recoverable without effectively raising prices." },
    { q: "How far back can pre-registration input VAT be recovered?", a: "Four years for goods still held and used in the business, and six months for services." },
    { q: "What is the main disadvantage of a VAT group?", a: "Every member is jointly and severally liable for the whole group's VAT." },
  ],
}

/* ── Chapter 27 · F2 ──────────────────────────────────────────── */

export const TX_TREE_27: StudyChapter = {
  id: "TX-27",
  number: 27,
  paper: "TX",
  area: "F",
  title: "VAT: computing the liability, tax points and administration",
  minutes: 18,
  syllabusRefs: ["F2(a)", "F2(b)", "F2(c)", "F2(d)", "F2(e)", "F2(g)", "F2(h)", "F2(i)", "F2(j)", "F3(a)"],
  intro:
    "Output tax less input tax, and a set of dates. The tax point decides which return a supply falls into, and the penalty regime for late payment is unusual enough to be worth learning properly.",
  outcomes: [
    "Compute the VAT payable or recoverable for a period",
    "Determine the tax point for a supply of goods or services",
    "Apply the valuation rules including discounts and goods for own use",
    "Claim relief for impairment losses on trade debts",
    "State the return and payment deadlines and the penalties for default",
  ],
  sections: [
    {
      id: "computing",
      heading: "The computation, tax points and valuation",
      blocks: [
        {
          kind: "formula",
          name: "The VAT return",
          expr: "OUTPUT VAT on supplies made                                X\n   standard-rated at 20%, reduced-rated at 5%,\n   zero-rated at 0%\nPlus output VAT on GOODS FOR OWN USE and the FUEL SCALE CHARGE  X\n                                                        ─────\nTOTAL OUTPUT VAT                                           X\n\nLess INPUT VAT on supplies received                       (X)\n   excluding irrecoverable input VAT (cars, entertaining,\n   exempt and non-business use)\nLess input VAT on IMPAIRMENT LOSSES                       (X)\n                                                        ─────\nVAT PAYABLE to HMRC (or RECOVERABLE)                        X\n                                                        ─────\n\nTo extract VAT from a VAT-INCLUSIVE figure, multiply by 20/120 (or 1/6).\nTo add VAT to a VAT-EXCLUSIVE figure, multiply by 20%.",
          note: "Reading whether a figure is VAT-inclusive or VAT-exclusive is worth more marks in VAT than anything else. A question that gives 'sales of £120,000 including VAT' wants £20,000 of output tax, not £24,000.",
        },
        {
          kind: "table",
          caption: "The tax point — which return a supply falls into",
          head: ["", "Rule"],
          rows: [
            ["**Basic tax point**", "The date the **goods are removed or made available**, or the date the **service is completed**"],
            ["**Actual tax point — earlier**", "Where an **invoice is issued** or **payment received** BEFORE the basic tax point, that earlier date becomes the tax point"],
            ["**Actual tax point — 14 day rule**", "Where an invoice is issued **within 14 days AFTER** the basic tax point, the **invoice date** becomes the tax point"],
            ["**Continuous supplies**", "The earlier of the invoice date and the date payment is received"],
            ["**Deposits**", "Create a tax point when received, for the amount received"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Valuation, discounts and goods for own use",
          md: "**Value** is the amount the customer pays, excluding VAT. Three cases need care:\n\n· A **trade or bulk discount** reduces the value, so VAT is charged on the discounted amount.\n· A **prompt payment (settlement) discount** — VAT is charged on the amount **actually paid**, so if the customer takes the discount, VAT is on the reduced figure.\n· **Goods taken for the owner's own use** are a supply: **output VAT** is charged on their **cost** to the business. Note this differs from the income tax rule (chapter 10), where they are added back at **selling** price.\n· **Gifts of goods** are a supply unless they cost £50 or less per person per year. **Gifts of services** are not a supply.\n· **Private fuel** — recover the input VAT in full and apply the **fuel scale charge** as output VAT, based on the car's CO2 emissions.",
        },
        {
          kind: "example",
          title: "A VAT return",
          scenario:
            "Glenridding Ltd's quarter ended 31 March 2026 shows: standard-rated sales of £258,000 excluding VAT; zero-rated sales of £46,000; standard-rated purchases and expenses of £141,600 including VAT; entertaining UK customers costing £3,600 including VAT; a new car for the sales director costing £28,800 including VAT; and a trade debt of £9,600 including VAT, six months overdue and written off.",
          steps: [
            { label: "Compute output VAT", detail: "Standard-rated sales £258,000 × 20% = £51,600. Zero-rated sales of £46,000 carry output VAT of nil, but they are still taxable supplies and belong on the return." },
            { label: "Compute recoverable input VAT on purchases", detail: "£141,600 is VAT-inclusive, so the VAT is £141,600 × 20/120 = £23,600. Using 20% on the inclusive figure would give £28,320 and overstate the claim." },
            { label: "Exclude the irrecoverable items", detail: "Entertaining UK customers: input VAT of £600 is IRRECOVERABLE. The car: input VAT of £4,800 is IRRECOVERABLE, since it is not used wholly for business. Neither may be claimed." },
            { label: "Claim relief on the impaired debt", detail: "The debt is more than six months overdue from the due date and has been written off, so relief is available: £9,600 × 20/120 = £1,600 of input VAT recoverable." },
            { label: "Compute the VAT payable", detail: "Output £51,600, less input £23,600, less impairment relief £1,600 = £26,400 payable to HMRC." },
            { label: "State the deadline", detail: "The return and payment are due one month and seven days after the end of the period: by 7 MAY 2026." },
          ],
          result:
            "**£26,400 payable by 7 May 2026.** The three decisions are extracting VAT at 20/120 from inclusive figures, excluding the car and the UK customer entertaining, and claiming the £1,600 of impairment relief.",
        },
      ],
      check: {
        q: "Standard-rated purchases of £141,600 INCLUDING VAT were made. What input VAT is recoverable?",
        options: [
          "£28,320 — £141,600 × 20%",
          "£23,600 — £141,600 × 20/120",
          "£141,600",
          "£14,160",
        ],
        correct: 1,
        explain:
          "£23,600. The figure is VAT-inclusive, so extract the VAT with the 20/120 fraction — equivalently one sixth. Applying 20% to an inclusive figure overstates the VAT by a fifth, and reading inclusive against exclusive is where most VAT marks are lost.",
      },
    },
    {
      id: "administration",
      heading: "Returns, payment and penalties",
      blocks: [
        {
          kind: "table",
          caption: "The dates and the penalty regime",
          head: ["", "Rule"],
          rows: [
            ["**Return and payment**", "Due **one month and seven days** after the end of the VAT period. Returns are filed online under **Making Tax Digital**"],
            ["**Late SUBMISSION**", "A **points-based** regime: one point per late return, and a **£200** penalty once the points threshold is reached, then £200 for each further late return"],
            ["**Late PAYMENT — up to 15 days**", "**No penalty**"],
            ["**Late PAYMENT — 16 to 30 days**", "**3%** of the outstanding amount"],
            ["**Late PAYMENT — more than 30 days**", "**6%**, PLUS a daily penalty at an **annual rate of 10%** on the amount outstanding from day 31"],
            ["**Interest**", "Charged from the due date to the date of payment, in addition to any penalty"],
            ["**Impairment loss relief**", "Available where the debt is **6 months** overdue from the due date and has been **written off** in the accounts"],
            ["**Errors on a return**", "Errors below the greater of £10,000 and 1% of turnover, capped at £50,000, may be corrected on the **next return**; larger errors must be separately disclosed"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The late payment regime is unlike any other in the paper",
          md: "Every other late payment penalty in TX is a flat percentage at fixed intervals. VAT's is **graduated**, and it has a **15-day grace period** during which nothing is charged at all. So a payment three days late costs only interest; a payment 20 days late costs 3%; and a payment 40 days late costs 6% **plus** a daily charge accruing at an annual rate of 10% from day 31.\n\nThat structure has a clear purpose — it makes paying **something quickly** far cheaper than paying everything eventually — and it is examinable precisely because it differs from the income tax and corporation tax regimes a candidate has just learnt. The percentages are on the exam's **rate sheet**, so the marks are for applying the right band, not for recalling the figures.",
        },
        {
          kind: "list",
          title: "The special schemes, and when each helps",
          items: [
            "**Cash accounting** — account for VAT on **cash received and paid** rather than on invoices. Join if taxable turnover does not exceed **£1,350,000**; leave if it exceeds **£1,600,000**. Helps a business that gives **long credit** or suffers **bad debts**, and it makes impairment relief unnecessary. It does NOT help a business paid in cash at the point of sale.",
            "**Annual accounting** — one return a year, with **nine monthly payments on account** of 10% of the previous year's liability and a balancing payment with the return. Same **£1,350,000** and **£1,600,000** thresholds. Helps **cash flow certainty** and reduces administration, but a business whose turnover is falling overpays during the year.",
            "**Flat rate scheme** — apply a flat percentage to **VAT-INCLUSIVE TOTAL turnover**, including zero-rated and exempt supplies, and recover **no input VAT**. Join if expected taxable turnover excluding VAT does not exceed **£150,000**; leave if VAT-inclusive turnover exceeds **£230,000**. The percentage is given in the exam, with **16.5%** applying to businesses with limited purchases of goods.",
            "**Combining them** — the flat rate scheme can be used with **annual accounting** but **not** with cash accounting, though a flat rate trader may apply the percentage to cash actually received.",
            "To advise on a scheme, compare the VAT payable under it with the VAT payable normally, and add the **administrative** and **cash flow** effects. A scheme that saves £400 of VAT and a day a month of bookkeeping is a recommendation; one that saves £40 is not.",
          ],
        },
      ],
      check: {
        q: "A business pays its VAT 40 days late. What penalty arises?",
        options: [
          "3% of the outstanding amount",
          "6% of the outstanding amount, plus a daily penalty at an annual rate of 10% from day 31",
          "No penalty, only interest",
          "A flat £200",
        ],
        correct: 1,
        explain:
          "6% PLUS A DAILY PENALTY. More than 30 days late attracts 6% of the outstanding amount and a further daily charge accruing at an annual rate of 10% from day 31. Nothing is charged in the first 15 days, and 16 to 30 days attracts 3% — a graduated structure unlike any other penalty regime in the paper.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Applying 20% to a VAT-inclusive figure.",
      fix: "Use 20/120, or one sixth, to extract VAT from an inclusive amount.",
    },
    {
      trap: "Recovering input VAT on entertaining UK customers.",
      fix: "Only staff and overseas customer entertaining is recoverable.",
    },
    {
      trap: "Adding goods for own use at selling price for VAT.",
      fix: "Output VAT is charged on COST for VAT, though income tax adds them back at selling price.",
    },
    {
      trap: "Claiming impairment relief before the debt is six months overdue.",
      fix: "It must be six months overdue from the due date AND written off in the accounts.",
    },
    {
      trap: "Applying a flat 5% or 10% late payment penalty.",
      fix: "VAT's regime is graduated: nil to 15 days, 3% to 30 days, then 6% plus a daily charge.",
    },
  ],
  keyTerms: [
    { term: "Tax point", def: "The date determining which return a supply falls into; the basic date, overridden by an earlier invoice or payment or by the 14-day rule." },
    { term: "Impairment loss relief", def: "Recovery of output VAT on a debt six months overdue and written off." },
    { term: "Cash accounting", def: "Accounting for VAT on cash received and paid; thresholds £1,350,000 and £1,600,000." },
    { term: "Annual accounting", def: "One annual return with nine monthly payments on account; same thresholds." },
    { term: "Flat rate scheme", def: "A percentage of VAT-inclusive total turnover with no input recovery; join at £150,000, leave at £230,000." },
  ],
  summary: [
    "VAT payable is output tax less recoverable input tax, with 20/120 used to extract VAT from inclusive figures.",
    "The tax point is the basic date unless an earlier invoice or payment, or the 14-day rule, displaces it.",
    "Returns and payment are due one month and seven days after the period end.",
    "Late payment is graduated: nothing to 15 days, 3% to 30 days, then 6% plus a daily charge at 10% a year.",
    "Cash and annual accounting run to £1,350,000; the flat rate scheme joins at £150,000 and leaves at £230,000.",
  ],
  knowledgeDiagnostic: [
    { q: "How do you extract VAT from a VAT-inclusive figure?", a: "Multiply by 20/120, equivalently one sixth." },
    { q: "What is the 14-day rule?", a: "Where an invoice is issued within 14 days after the basic tax point, the invoice date becomes the tax point." },
    { q: "When is impairment loss relief available?", a: "Where the debt is six months overdue from the due date and has been written off in the accounts." },
    { q: "What is the VAT late payment penalty for a payment 20 days late?", a: "3% of the outstanding amount; nothing is charged in the first 15 days." },
    { q: "How is the flat rate scheme percentage applied?", a: "To VAT-inclusive TOTAL turnover, including zero-rated and exempt supplies, with no input VAT recovered." },
  ],
}

/* ── Chapter 28 · F2(f)–(g) ───────────────────────────────────── */

export const TX_TREE_28: StudyChapter = {
  id: "TX-28",
  number: 28,
  paper: "TX",
  area: "F",
  title: "VAT: overseas aspects",
  minutes: 14,
  syllabusRefs: ["F2(k)", "F2(l)"],
  intro:
    "Goods and services leaving or entering the UK, and a mechanism designed so that neither the exporter nor the importer is left funding VAT.",
  outcomes: [
    "Explain the VAT treatment of exports and imports of goods",
    "Explain postponed VAT accounting",
    "Explain the VAT treatment of services supplied to and received from overseas",
    "Apply the reverse charge",
    "Explain why these rules leave most traders in a neutral position",
  ],
  sections: [
    {
      id: "goods-and-services",
      heading: "Goods, services and the reverse charge",
      blocks: [
        {
          kind: "table",
          caption: "Goods across the border",
          head: ["", "Treatment"],
          rows: [
            ["**Exports of goods** from the UK", "**ZERO-RATED**, so no output VAT — but they are taxable supplies, so they count towards the registration threshold and input VAT on related costs is recoverable"],
            ["**Imports of goods** into the UK", "VAT is due at the same rate as a UK supply. Under **POSTPONED VAT ACCOUNTING** the importer accounts for the VAT as **output tax** on its return and simultaneously claims it as **input tax**"],
            ["The **net effect** of postponed accounting", "**Nil** for a fully taxable trader — the two entries cancel. Its purpose is cash flow: without it the importer would pay VAT at the border and reclaim it later"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The reverse charge on services",
          md: "Where a UK business **receives** a service from an overseas supplier, the **REVERSE CHARGE** applies: the UK recipient accounts for the VAT itself, charging **output tax** on the value of the service and simultaneously reclaiming the same amount as **input tax**.\n\nSo for a **fully taxable** business the net effect is **nil**, exactly as with postponed accounting for goods. The mechanism exists to stop UK businesses buying services from outside the UK to escape VAT, which would otherwise disadvantage domestic suppliers.\n\nTwo consequences are examinable. Where the recipient makes **exempt** supplies, the input tax is **not recoverable**, so the reverse charge is a **real cost** rather than a wash. And the value of reverse-charge services **counts** towards the recipient's **registration threshold**, which can force a small business to register when it would not otherwise have needed to.\n\nWhere a UK business **supplies** services to an overseas **business** customer, the supply is generally **outside the scope** of UK VAT — the customer accounts for it under their own reverse charge.",
        },
        {
          kind: "example",
          title: "A quarter with imports and overseas services",
          scenario:
            "Patterdale Ltd is fully taxable. In its quarter to 30 June 2026 it made UK standard-rated sales of £340,000 excluding VAT and exported goods worth £62,000. It imported goods costing £48,000 and used postponed VAT accounting. It also received consultancy services from a German firm costing £15,000. UK purchases were £96,000 excluding VAT.",
          steps: [
            { label: "Output VAT on UK sales", detail: "£340,000 × 20% = £68,000." },
            { label: "Exports", detail: "Zero-rated, so output VAT is nil. But the £62,000 is a taxable supply — it counts towards registration and does not restrict input recovery in any way." },
            { label: "Imported goods under postponed accounting", detail: "Account for output VAT of £48,000 × 20% = £9,600, and claim the same £9,600 as input VAT. Net effect nil." },
            { label: "Overseas services under the reverse charge", detail: "Account for output VAT of £15,000 × 20% = £3,000, and reclaim the same £3,000 as input VAT. Again net nil, because Patterdale is fully taxable." },
            { label: "Input VAT on UK purchases", detail: "£96,000 × 20% = £19,200." },
            { label: "Compute the VAT payable", detail: "Output: £68,000 + £9,600 + £3,000 = £80,600. Input: £19,200 + £9,600 + £3,000 = £31,800. Payable = £48,800 — which is exactly £68,000 − £19,200, the figure it would have been had the import and the reverse charge been ignored entirely." },
            { label: "State why that matters", detail: "For a fully taxable trader both mechanisms are administratively significant and financially neutral. The answer changes only if the trader makes exempt supplies, in which case the input side is restricted and the charges become real cost." },
          ],
          result:
            "**£48,800 payable — the same figure as if the import and the reverse charge had been ignored.** Showing the entries on both sides and then observing that they cancel is what demonstrates understanding, rather than omitting them.",
        },
      ],
      check: {
        q: "A UK business receives services from an overseas supplier. What is the net VAT effect if the business is fully taxable?",
        options: [
          "Output VAT is due with no recovery, so it is a real cost",
          "Nil — output VAT is accounted for under the reverse charge and the same amount is reclaimed as input VAT",
          "No VAT arises at all",
          "The overseas supplier accounts for UK VAT",
        ],
        correct: 1,
        explain:
          "NIL FOR A FULLY TAXABLE BUSINESS. The reverse charge requires the recipient to account for output VAT and permits it to reclaim the same amount as input VAT, so the two cancel. It becomes a real cost only where the recipient makes exempt supplies and cannot recover the input tax.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating exports as outside the scope of VAT.",
      fix: "They are ZERO-RATED taxable supplies, so they count for registration and preserve input recovery.",
    },
    {
      trap: "Omitting the postponed accounting entries because they cancel.",
      fix: "Show both sides. Omitting them loses the marks for understanding the mechanism.",
    },
    {
      trap: "Assuming the reverse charge is always neutral.",
      fix: "It is a real cost where the recipient makes exempt supplies and cannot recover the input tax.",
    },
    {
      trap: "Ignoring reverse charge services in the registration test.",
      fix: "Their value counts towards the recipient's taxable turnover.",
    },
    {
      trap: "Charging UK VAT on services supplied to an overseas business customer.",
      fix: "Generally outside the scope of UK VAT; the customer applies its own reverse charge.",
    },
  ],
  keyTerms: [
    { term: "Postponed VAT accounting", def: "Accounting for import VAT as output tax on the return and reclaiming it as input tax, rather than paying at the border." },
    { term: "Reverse charge", def: "The recipient of an overseas service accounting for the output VAT and reclaiming it as input VAT." },
    { term: "Outside the scope", def: "A supply on which no UK VAT arises, as with most services to overseas business customers." },
  ],
  summary: [
    "Exports of goods are zero-rated taxable supplies, so they count for registration and preserve input recovery.",
    "Imports use postponed VAT accounting: output tax and input tax on the same return, netting to nil.",
    "The reverse charge applies to services received from overseas, with the same nil net effect.",
    "Both become a real cost where the recipient makes exempt supplies.",
    "Reverse charge services count towards the recipient's registration threshold.",
  ],
  knowledgeDiagnostic: [
    { q: "How are exports of goods treated?", a: "Zero-rated — taxable supplies at 0%, so they count towards registration and do not restrict input recovery." },
    { q: "What is postponed VAT accounting for?", a: "Cash flow: the importer accounts for import VAT on its return and reclaims it simultaneously, rather than paying at the border and reclaiming later." },
    { q: "When is the reverse charge NOT neutral?", a: "Where the recipient makes exempt supplies, so the input tax is irrecoverable and the output charge is a real cost." },
    { q: "Why do reverse charge services affect registration?", a: "Because their value counts towards the recipient's taxable turnover, which can force registration." },
  ],
}

/* ── Chapter 29 · G ───────────────────────────────────────────── */

export const TX_TREE_29: StudyChapter = {
  id: "TX-29",
  number: 29,
  paper: "TX",
  area: "G",
  title: "Employability and technology skills: answering TX in the CBE",
  minutes: 14,
  syllabusRefs: ["G1", "G2", "G3", "G4"],
  intro:
    "Forty marks of TX are typed into a spreadsheet and a word processor, against a rate sheet you are given. This chapter is about not losing marks you have already earned.",
  outcomes: [
    "Use the exam's rate sheet efficiently rather than memorising what it provides",
    "Lay out a tax computation so that method marks survive an arithmetic error",
    "Structure a Section C answer against the requirement's parts",
    "Manage time across a three-part requirement",
    "Present a recommendation so that the conclusion is visible",
  ],
  sections: [
    {
      id: "layout",
      heading: "Using the rate sheet, and laying out a computation",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "What the rate sheet gives you, and the handful of things it does not",
          md: "The exam provides a **tax rates and allowances** sheet on screen. It carries the income tax bands and rates, the personal allowance and its income limit, the residence day-count table, the car benefit percentages and the fuel and van figures, the ISA and rent-a-room limits, the pension allowances, the capital allowance rates and the AIA limit, the corporation tax rates and limits with the standard fraction and the marginal relief formula, the quarterly instalment threshold, the VAT rate and thresholds with the late payment penalties, the IHT nil rate bands and taper table, the CGT rates and annual exempt amount with the BADR figures, all the NIC rates and the employment allowance, the official rate of interest, and the penalty-for-errors table.\n\nSo there is very little worth **memorising**. The exceptions are worth knowing precisely because they are **not** on the sheet: the **4% diesel supplement** and the **37% cap** on the car benefit percentage, the **expensive accommodation formula**, the **£6,000 chattels** threshold and the **5/3** fraction, the **£75,000** accommodation threshold, and the **£40,000** letting relief cap.\n\nSpend the first minute of a computational question **finding the figures you need on the sheet** rather than recalling them. It is faster and it removes a whole class of error.",
        },
        {
          kind: "list",
          style: "number",
          title: "Laying out a tax computation in the spreadsheet",
          items: [
            "**One row per line of the proforma**, labelled. An income tax computation should read down the page exactly as chapter 4's proforma does, with the three columns across.",
            "**Show the workings for any figure that is not simply given.** A car benefit of £6,384 earns one mark; \"(£32,400 − £2,000) × 28% × 9/12\" earns the method marks even if the arithmetic slips.",
            "**Label the tax year or accounting period** at the top. A TX answer that does not say which period it computes cannot be marked confidently.",
            "**Use a separate small block for the workings** rather than burying them in the main computation, and cross-reference them as (W1), (W2) and so on. The examiner's own answers are laid out this way.",
            "**State your assumptions** where the question leaves something open — whether a car meets the RDE2 standard, whether an absence was employer-required. A stated assumption is markable; an unstated one is invisible.",
            "**Round to the nearest £**, which the exam's own instructions permit, and **apportion to the nearest month**.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The scratch pad is not submitted",
          md: "Anything on the CBE's scratch pad is **discarded**. It is useful for sketching a PRR timeline or a group structure while you think, but nothing on it earns a mark. Every figure you want credited belongs in the **spreadsheet or the word processor** for that requirement part.\n\nThis matters more in TX than in most papers, because so many TX computations start with a rough timeline or diagram — a PRR occupation timeline, a group structure with percentages, a loss memorandum tracking what has been used. Sketch it on the scratch pad if it helps, then **put the version that supports your answer into the spreadsheet**.",
        },
      ],
      check: {
        q: "Which of these figures is NOT provided on the exam's rate sheet?",
        options: [
          "The corporation tax marginal relief formula",
          "The 37% cap on the car benefit percentage",
          "The inheritance tax taper relief table",
          "The VAT registration and deregistration limits",
        ],
        correct: 1,
        explain:
          "THE 37% CAP IS NOT PROVIDED, and neither is the 4% diesel supplement. The car benefit percentages up to the 55 g/km base level, the hybrid ranges and the £28,200 fuel figure all are. The short list of things not on the sheet is what is actually worth memorising.",
      },
    },
    {
      id: "time-and-answers",
      heading: "Time, and writing a recommendation",
      blocks: [
        {
          kind: "example",
          title: "Managing a 15-mark Section C question",
          scenario:
            "A Section C question is worth 15 marks with parts of 8, 4 and 3 marks, and you have allocated about 27 minutes to it at 1.8 minutes a mark. Twelve minutes in, the income tax computation in part (a) will not agree to the figure the question later refers to, and you cannot see why.",
          steps: [
            { label: "Recognise the time position", detail: "Twelve minutes on an 8-mark part whose fair share is about 14 minutes. There is a little room, but not much — and parts (b) and (c) carry 7 marks that are entirely available." },
            { label: "Check the three things that go wrong most often", detail: "Give it two focused minutes on the usual suspects rather than rereading everything: has a nil rate band been treated as exempt rather than as a band using the basic rate limit; has the band been extended for gift aid or pensions; and has the personal allowance been abated. Those three account for most income tax discrepancies." },
            { label: "If it still does not agree, write down where you are", detail: "State the figure you have reached and note briefly what you think the difference might be. Recognising a discrepancy and naming a plausible cause is itself creditable, and it tells the marker you understood the mechanism." },
            { label: "Carry your figures forward explicitly", detail: "Write \"carried to part (b): taxable income £43,830, income tax liability £9,348\". Later parts are marked on YOUR figures under the own-figure rule, so a wrong part (a) does not forfeit parts (b) and (c) — but only if the marker can see which numbers you are using." },
            { label: "Move on and use the full remaining time", detail: "Seven marks remain across two parts. Part (c) at 3 marks is very often a short explanation or a planning point, which is quick to write and does not depend on part (a) reconciling at all." },
            { label: "Return only if time allows", detail: "If you finish with three minutes spare, look again. A fresh eye after other work finds an error far more often than continued staring." },
          ],
          result:
            "**Two focused minutes on the three usual causes, then carry the figures forward and move on.** A question that could have scored 4 scores 11 or 12, and the difference is entirely in the decision to stop.",
        },
        {
          kind: "list",
          title: "Writing the discursive parts",
          items: [
            "**Answer the question asked.** \"Explain\" wants reasons, \"state\" wants a fact, \"calculate\" wants a figure, and \"advise\" wants a recommendation in its own sentence. TX requirements are precisely worded and the verb tells you the form.",
            "**Use the scenario's own facts.** A general statement about loss reliefs earns little; naming the taxpayer's actual income, the years available and the allowance that would be wasted earns the marks.",
            "**Quantify wherever possible.** \"A claim against total income wastes the personal allowance\" is worth less than \"wastes £12,570 of personal allowance, costing £2,514 of relief at 20%\".",
            "**Give the dates.** Filing dates, payment dates and claim deadlines are cheap marks and are frequently asked for explicitly.",
            "**Reach a conclusion.** Where a question asks which relief or which structure is better, say which and why. A balanced discussion with no answer loses the final mark every time.",
            "**Keep it short.** Two or three sentences per mark is the right density. TX discursive parts reward precision, not length.",
          ],
        },
      ],
      check: {
        q: "Your part (a) computation will not reconcile after twelve minutes of an 8-mark part. What should you do?",
        options: [
          "Keep working until it agrees, since later parts depend on it",
          "Check the three usual causes briefly, then state your figure, carry it forward explicitly and move to parts (b) and (c)",
          "Leave the question and start another",
          "Insert the figure the question implies without workings",
        ],
        correct: 1,
        explain:
          "CHECK BRIEFLY, THEN CARRY FORWARD AND MOVE ON. Later parts are marked on your own figures, so an unreconciled part (a) does not forfeit them — provided the marker can see which figures you are using. Time spent hunting one error costs marks elsewhere at the same rate.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Memorising figures the rate sheet provides.",
      fix: "Learn only what is NOT on it: the diesel supplement, the 37% cap, the accommodation formula, the chattels rules and the letting relief cap.",
    },
    {
      trap: "Presenting a single figure with no workings.",
      fix: "Show the calculation, so method marks survive an arithmetic slip.",
    },
    {
      trap: "Leaving a timeline or group diagram on the scratch pad.",
      fix: "It is discarded. Put anything that supports the answer into the spreadsheet.",
    },
    {
      trap: "Overrunning one part until later parts go unanswered.",
      fix: "Budget 1.8 minutes a mark and carry your figures forward explicitly.",
    },
    {
      trap: "Discussing both sides without recommending one.",
      fix: "Where the requirement says advise or recommend, give the answer in its own sentence.",
    },
  ],
  keyTerms: [
    { term: "Rate sheet", def: "The tax rates and allowances provided on screen, which removes most of the need to memorise figures." },
    { term: "Own-figure rule", def: "The marking practice of crediting later parts on the figures the candidate produced earlier, even if wrong." },
    { term: "Method mark", def: "A mark for a correct step in a computation, awarded independently of the final answer." },
    { term: "Scratch pad", def: "The CBE's rough working area, which is not submitted and cannot earn marks." },
  ],
  summary: [
    "The rate sheet provides almost every figure; learn only the short list it omits.",
    "Lay out computations one labelled row per line, with workings cross-referenced as (W1), (W2).",
    "State the period and any assumptions, round to the nearest pound and apportion to the nearest month.",
    "Budget 1.8 minutes a mark, and carry your figures forward explicitly when a part will not reconcile.",
    "Answer the verb the requirement uses, quantify, give the dates, and reach a conclusion.",
  ],
  knowledgeDiagnostic: [
    { q: "Name three figures that are NOT on the exam's rate sheet.", a: "The 4% diesel supplement, the 37% car benefit cap, and the expensive accommodation formula — along with the £6,000 chattels threshold and the £40,000 letting relief cap." },
    { q: "Why show workings for every computed figure?", a: "Because most marks are method marks and a marker can only award them for steps they can see." },
    { q: "What is the own-figure rule?", a: "Later parts of a question are marked on the figures the candidate produced earlier, so an error in part (a) does not forfeit the marks in later parts." },
    { q: "How much time should a 15-mark question receive?", a: "About 27 minutes, at roughly 1.8 minutes a mark across a three-hour, 100-mark paper." },
    { q: "What does the verb in a requirement tell you?", a: "The form of the answer: explain wants reasons, state wants a fact, calculate wants a figure, and advise wants a recommendation in its own sentence." },
  ],
}

export const TX_TREE_AREA_F: StudyChapter[] = [TX_TREE_26, TX_TREE_27, TX_TREE_28]
export const TX_TREE_AREA_G: StudyChapter[] = [TX_TREE_29]
