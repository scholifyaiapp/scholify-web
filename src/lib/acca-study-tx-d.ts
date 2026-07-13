import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX (Taxation UK) · Area D — Value added tax (VAT).
 * UK FA2024/25 basis. Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 * Key figures stated in the text so the chapter teaches METHOD, not recall:
 *   registration threshold £90,000 · deregistration £88,000 ·
 *   standard 20% · reduced 5% · zero-rated 0% · exempt (no input recovery) ·
 *   cash & annual accounting turnover limit £1,350,000 · flat-rate limit £150,000.
 */

export const TX_D: StudyChapter = {
  paper: "TX",
  area: "D",
  title: "Value added tax (VAT)",
  minutes: 15,
  intro: "VAT is a tax on spending, but businesses do the collecting. Master one equation — output tax charged minus input tax suffered — and the whole area opens up.",
  outcomes: [
    "Explain how VAT works: output tax charged on sales minus input tax on purchases",
    "Apply the £90,000 registration threshold and the £88,000 deregistration threshold, and distinguish compulsory from voluntary registration",
    "Classify supplies as standard, reduced, zero-rated or exempt — and explain why the zero-rated vs exempt line decides input recovery",
    "Identify the tax point and the input tax that can never be recovered (cars and entertaining)",
    "Prepare a VAT return figure and choose between the cash, annual and flat-rate schemes",
  ],
  sections: [
    {
      id: "mechanism",
      heading: "How VAT actually works",
      blocks: [
        { kind: "text", md: "VAT is an **indirect tax** on consumer spending. The clever part is who does the work: HMRC does not chase millions of shoppers — instead every **VAT-registered business** in the supply chain collects a slice and hands the net to HMRC. The final consumer, who cannot reclaim anything, bears the whole cost." },
        { kind: "text", md: "A registered business deals with two flows. **Output tax** is the VAT it **charges** its customers on the sales (outputs) it makes. **Input tax** is the VAT it **suffers** on the purchases and expenses (inputs) it buys. Each VAT period it simply nets the two off." },
        { kind: "formula", name: "The VAT equation", expr: "Output tax − Input tax = VAT payable to (or refundable from) HMRC", note: "Output > input → pay HMRC. Input > output → HMRC refunds you." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "VAT is collected in stages along the chain",
          caption: "Each business pays HMRC only on the value IT added; the £30 final VAT is borne by the consumer.",
          data: {
            steps: [
              { label: "Manufacturer", sub: "sells for £100 + £20 VAT → pays HMRC £20" },
              { label: "Wholesaler", sub: "buys (input £20), sells £120 + £24 → pays £24 − £20 = £4" },
              { label: "Retailer", sub: "buys (input £24), sells £150 + £30 → pays £30 − £24 = £6" },
              { label: "Consumer", sub: "pays £180, reclaims nothing — bears the full £30" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one idea", md: "A registered business is an **unpaid tax collector**. It is broadly neutral for the business itself — it only ever pays HMRC the **net** of output tax over input tax. The tax truly sticks only to the **unregistered final consumer**." },
      ],
      check: {
        q: "In a quarter a registered business charges customers £48,000 of output tax and suffers £31,000 of recoverable input tax. What does it do?",
        options: [
          "Pay HMRC £79,000",
          "Pay HMRC £17,000",
          "Reclaim £17,000 from HMRC",
          "Pay HMRC £48,000 and reclaim £31,000 separately",
        ],
        correct: 1,
        explain: "Output tax minus input tax = £48,000 − £31,000 = £17,000. Because output exceeds input, that net £17,000 is paid to HMRC on the single VAT return. You never add the two (that gives £79,000) or settle them on separate returns.",
      },
    },
    {
      id: "registration",
      heading: "Registration and deregistration",
      blocks: [
        { kind: "text", md: "A business **must** register (compulsory registration) once its **taxable turnover** crosses the threshold. Taxable turnover means the value of standard-rated, reduced-rated **and** zero-rated supplies — it does **not** include exempt supplies or the sale of capital assets. There are two tests, and either one can trigger registration." },
        { kind: "table", caption: "The two compulsory registration tests — FA2024/25", head: ["Test", "Trigger", "Notify HMRC by", "Registered from"], rows: [
          ["Historic (backward)", "Taxable turnover in the previous 12 months exceeds **£90,000**", "30 days after the end of the month the limit was exceeded", "The 1st of the second month after exceeding"],
          ["Future (forward)", "Taxable turnover expected to exceed **£90,000** in the next **30 days alone**", "The end of that 30-day period", "The start of that 30-day period"],
        ] },
        { kind: "callout", tone: "rule", title: "Deregistration", md: "A business may **deregister** if it expects its taxable turnover in the next 12 months to fall below **£88,000**. Note the gap: you must register at **£90,000** but can only leave once you drop below **£88,000** — the £2,000 buffer stops businesses hopping in and out around the line." },
        { kind: "example", title: "Worked example — the historic threshold test", scenario: "Noor started a standard-rated business on 1 January 2025. Her taxable turnover was £88,500 for the 12 months to 30 September 2025, and October 2025 sales were £4,200. When must she notify HMRC, and from what date is she registered?", steps: [
          { label: "Roll the 12-month total forward", detail: "To 30 September the cumulative total is £88,500 — still under £90,000, so no trigger yet." },
          { label: "Add October", detail: "£88,500 + £4,200 = £92,700 at 31 October. The £90,000 threshold is first exceeded during October." },
          { label: "Notification deadline", detail: "Notify within 30 days of the end of the month exceeded → by **30 November 2025**." },
          { label: "Effective date of registration", detail: "Registered from the first day of the second month after the month exceeded → from **1 December 2025**." },
        ], result: "Notify by 30 November 2025; registered from 1 December 2025. From that date Noor must charge 20% output tax — and can start recovering input tax on her costs." },
        { kind: "callout", tone: "tip", title: "Voluntary registration", md: "A business **below** £90,000 may register **voluntarily**. It is worth doing when customers are themselves VAT-registered (they reclaim the VAT charged, so price is not an issue) and especially where the business makes **zero-rated** supplies — it charges 0% output tax but recovers all its input tax, producing regular **refunds**. The downsides are administration and having to add 20% to prices charged to non-registered customers." },
      ],
      check: {
        q: "A trader's rolling taxable turnover first exceeds £90,000 during the month of June. By when must HMRC be notified, and from when is the trader registered?",
        options: [
          "Notify by 30 June; registered from 1 July",
          "Notify by 30 July; registered from 1 August",
          "Notify by 30 July; registered from 1 June",
          "Notify by 31 December; registered from 1 January",
        ],
        correct: 1,
        explain: "Under the historic test you notify within 30 days of the end of the month exceeded (end of June → by 30 July), and registration takes effect from the first day of the second month after exceeding — so 1 August. Registering from 1 June would be the FUTURE test's rule, not the historic one.",
      },
    },
    {
      id: "supplies",
      heading: "Rates and types of supply — the critical distinction",
      blocks: [
        { kind: "text", md: "Not everything is taxed the same way. A supply falls into one of four boxes, and the box decides both the rate **charged** and — crucially — whether the supplier can **recover** its own input tax." },
        { kind: "table", caption: "The four types of supply — FA2024/25 rates", head: ["Type", "Rate", "Examples", "Can supplier recover input tax?"], rows: [
          ["Standard-rated", "**20%**", "Most goods and services", "Yes"],
          ["Reduced-rated", "**5%**", "Domestic fuel and power, children's car seats", "Yes"],
          ["Zero-rated", "**0%**", "Most food, books, children's clothing, public transport", "**Yes** — these are still taxable supplies"],
          ["Exempt", "No VAT", "Insurance, financial services, postal services, most health, some land/buildings", "**No** — input tax is irrecoverable"],
        ] },
        { kind: "callout", tone: "warn", title: "Zero-rated is NOT the same as exempt", md: "This is the single most examined trap in VAT. **Zero-rated** supplies are **taxable** — just at a 0% rate — so the supplier is a taxable person who registers and **recovers all input tax** (great news: it charges nothing but reclaims everything). **Exempt** supplies are **outside** the VAT net — the supplier cannot register in respect of them and **cannot recover** the related input tax, so that VAT becomes a real cost." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Zero-rated vs exempt — same 0 charged, opposite input recovery",
          data: {
            leftTitle: "Zero-rated (e.g. a baker)",
            rightTitle: "Exempt (e.g. an insurer)",
            rows: [
              { aspect: "VAT charged to customer", left: "0% (nil)", right: "None" },
              { aspect: "Is it a taxable supply?", left: "Yes — taxable at 0%", right: "No — outside the VAT system" },
              { aspect: "Can the business register?", left: "Yes (and often should)", right: "Not for these supplies" },
              { aspect: "Recover input tax on costs?", left: "Yes — full recovery", right: "No — input tax is a cost" },
              { aspect: "Typical VAT position", left: "Regular refunds from HMRC", right: "Bears its own input VAT" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — why the box matters in cash", scenario: "Two businesses each buy £50,000 (net) of standard-rated supplies, suffering £10,000 input tax, and make no output-taxable sales. Business A's sales are zero-rated; Business B's sales are exempt. What is each one's input tax recovery?", steps: [
          { label: "Business A — zero-rated", detail: "Zero-rated sales are taxable supplies, so A registers and recovers all input tax → reclaims **£10,000** from HMRC." },
          { label: "Business B — exempt", detail: "Exempt sales sit outside VAT, so B cannot recover input tax → the **£10,000 is an irrecoverable cost**." },
        ], result: "Same purchases, same £10,000 of VAT — but A gets it all back while B eats it. That single difference is worth £10,000 of cash flow." },
      ],
      check: {
        q: "A business makes ONLY exempt supplies and suffers £5,000 of input VAT on its costs. How much of that input VAT can it recover?",
        options: [
          "£5,000 — all of it",
          "£1,000 — at the reduced rate",
          "£0 — none of it",
          "£2,500 — half of it",
        ],
        correct: 2,
        explain: "Exempt supplies are outside the VAT system, so a business making only exempt supplies cannot register and cannot recover any input tax — the full £5,000 is an irrecoverable cost. If those sales had instead been zero-rated (taxable at 0%), all £5,000 would be recoverable. That is the whole zero-rated vs exempt distinction.",
      },
    },
    {
      id: "taxpoint",
      heading: "The tax point and blocked input tax",
      blocks: [
        { kind: "text", md: "The **tax point** is the date a supply is treated as taking place — it fixes which VAT return the transaction falls into. The **basic tax point** is when goods are removed or made available, or when a service is completed. But two things can override it." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Finding the tax point",
          caption: "Work through in order — the first override that applies wins.",
          data: {
            steps: [
              { label: "Basic tax point", sub: "Goods delivered / service completed" },
              { label: "Paid or invoiced earlier?", sub: "If payment received OR invoice issued BEFORE the basic tax point, that earlier date becomes the tax point" },
              { label: "Invoice within 14 days after?", sub: "If a VAT invoice is issued within 14 days AFTER the basic tax point, the invoice date becomes the tax point" },
              { label: "Otherwise", sub: "The basic tax point stands" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "Input tax that is blocked", md: "Even a registered business cannot recover input tax on everything. Two items are **always irrecoverable**: (1) **motor cars** with any private use available — VAT on the purchase is blocked (though VAT on genuine pool cars, vans, and on repairs and fuel is fine); and (2) **business entertaining** of UK customers. VAT on entertaining staff and on overseas customers can be recovered." },
        { kind: "text", md: "Watch the wording. VAT on **repairing** a car, or on **fuel** and **running costs**, is recoverable even though VAT on **buying** the car is not. And entertaining **employees** (a staff party) is recoverable — it is only entertaining **customers** that is blocked." },
      ],
      check: {
        q: "A registered business buys a company car (available for private use), pays to repair it, and takes a UK customer to lunch. On which of these is the input VAT recoverable?",
        options: [
          "The car purchase only",
          "The repair only",
          "The car purchase and the lunch",
          "The repair and the customer lunch",
        ],
        correct: 1,
        explain: "VAT on buying a car with private use available is blocked, and VAT on entertaining UK customers is blocked. But VAT on car repairs and running costs is always recoverable — so only the repair qualifies here.",
      },
    },
    {
      id: "return",
      heading: "The VAT return, payment and imports",
      blocks: [
        { kind: "text", md: "Most businesses file a VAT return **quarterly** under **Making Tax Digital** — kept in digital records and submitted through compatible software. Both the return **and** the payment are normally due **one month and seven days** after the end of the VAT period. The return reports total output tax, total recoverable input tax, and the net." },
        { kind: "example", title: "Worked example — a VAT return computation", scenario: "Priya runs a standard-rated retail business (all figures VAT-exclusive unless stated) for the quarter to 31 March 2025: standard-rated sales £180,000; zero-rated sales £20,000; standard-rated purchases and overheads £95,000; business entertaining of UK customers £1,500; and a new car (private use available) bought for £21,600 including VAT. Compute the VAT payable.", steps: [
          { label: "Output tax — standard sales", detail: "£180,000 × 20% = £36,000." },
          { label: "Output tax — zero-rated sales", detail: "£20,000 × 0% = £0 (still reported, but no tax)." },
          { label: "Input tax — purchases/overheads", detail: "£95,000 × 20% = £19,000 recoverable." },
          { label: "Input tax — entertaining", detail: "£1,500 × 20% = £300 — UK customer entertaining is **blocked**, recover £0." },
          { label: "Input tax — the car", detail: "Car with private use → purchase VAT is **blocked**, recover £0." },
          { label: "Net VAT", detail: "Output £36,000 − recoverable input £19,000 = **£17,000 payable**." },
        ], result: "VAT payable is £17,000, due by 7 May 2025. The zero-rated sales, the entertaining VAT and the car VAT all wash out to nil — the trap figures Priya must not deduct." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "Priya's VAT return — output tax bridged down to net VAT",
          caption: "Blocked input tax (entertaining £300, car) never enters the bridge.",
          data: {
            unit: "£",
            items: [
              { label: "Output tax", value: 36000, kind: "start" },
              { label: "Less input tax", value: -19000, kind: "delta" },
              { label: "Net VAT payable", value: 17000, kind: "total" },
            ],
          },
        } },
        { kind: "text", md: "**Imports and exports.** Goods **exported** outside the UK are **zero-rated**, so no output tax is charged. VAT on **imported** goods is dealt with through **postponed VAT accounting**: the importer accounts for the import VAT as **output tax** and simultaneously reclaims it as **input tax** on the **same** return — so for a fully taxable business the net cash effect is nil and no VAT is paid at the border." },
      ],
    },
    {
      id: "schemes",
      heading: "Special accounting schemes and penalties",
      blocks: [
        { kind: "text", md: "Small businesses can opt into schemes that simplify VAT or improve cash flow. All three below are aimed at smaller traders and each has a turnover ceiling." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The three special accounting schemes — FA2024/25",
          data: {
            items: [
              { title: "Cash accounting", sub: "Join if taxable turnover ≤ £1,350,000. Account for VAT on cash received/paid, not invoice dates — automatic bad-debt relief. Must leave when turnover exceeds £1,600,000." },
              { title: "Annual accounting", sub: "Join if taxable turnover ≤ £1,350,000. File ONE return a year with 9 monthly (or 3 quarterly) payments on account, balancing payment with the return." },
              { title: "Flat-rate scheme", sub: "Join if taxable turnover ≤ £150,000 (excl VAT). Pay a fixed % of VAT-inclusive turnover instead of tracking every input; simplest of all. Leave once total income exceeds £230,000." },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Which scheme, and why", md: "**Cash accounting** helps a business that sells on credit or has bad debts — you only pay output tax once the customer pays. **Annual accounting** smooths cash flow and cuts admin to one return. The **flat-rate scheme** trades a little accuracy for a lot of simplicity and suits very small businesses with few inputs." },
        { kind: "callout", tone: "rule", title: "The penalty points regime", md: "**Late submission** works on **points**: one point per late return. For quarterly returns a **£200** penalty is charged once **4 points** accumulate, and a further £200 for each later late return; points expire after a period of compliance. **Late payment** penalties escalate with delay — nothing if paid (or a time-to-pay agreed) within **15 days**, then **2%** of the tax outstanding if paid on days 16–30, rising further beyond that, with **interest** charged on top." },
      ],
      check: {
        q: "A business with expected taxable turnover of £120,000 (excluding VAT) wants the simplest possible VAT accounting, applying a fixed percentage instead of tracking each input. Which scheme fits?",
        options: [
          "The flat-rate scheme",
          "The cash accounting scheme",
          "The annual accounting scheme",
          "None — it is over every limit",
        ],
        correct: 0,
        explain: "The flat-rate scheme lets a business apply a fixed percentage to its VAT-inclusive turnover instead of tracking individual input tax, and its £150,000 joining limit comfortably covers £120,000. Cash and annual accounting simplify timing but still require full input-tax records.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating zero-rated and exempt supplies as the same thing.", fix: "Zero-rated is TAXABLE at 0% — full input recovery. Exempt is outside VAT — NO input recovery. It decides whether the trader gets refunds or eats the VAT." },
    { trap: "Including exempt supplies (or capital asset sales) in the £90,000 registration test.", fix: "Taxable turnover for the threshold is standard, reduced and zero-rated supplies only — exclude exempt income and one-off capital disposals." },
    { trap: "Recovering input VAT on a car purchase or on entertaining UK customers.", fix: "Both are blocked. But VAT on car repairs/fuel, and on entertaining staff or overseas customers, IS recoverable." },
    { trap: "Using £90,000 as the deregistration threshold.", fix: "You must register once turnover exceeds £90,000, but can only deregister when expected turnover falls below £88,000 — a deliberate £2,000 gap." },
    { trap: "Charging output tax on exported goods.", fix: "Exports outside the UK are zero-rated (0% output tax); imports use postponed accounting — output and input tax on the same return, net nil for a fully taxable business." },
  ],
  keyTerms: [
    { term: "Output tax", def: "The VAT a registered business charges its customers on the taxable supplies (sales) it makes." },
    { term: "Input tax", def: "The VAT a registered business suffers on its purchases and expenses, recoverable if it relates to taxable supplies." },
    { term: "Taxable turnover", def: "The value of standard, reduced and zero-rated supplies — used for the registration test; excludes exempt supplies and capital asset sales." },
    { term: "Zero-rated supply", def: "A taxable supply charged at 0%; the supplier charges no VAT but still recovers all related input tax." },
    { term: "Tax point", def: "The date a supply is treated as made, fixing the VAT return it falls in — basic tax point unless overridden by earlier payment/invoice or a VAT invoice within 14 days." },
  ],
  summary: [
    "VAT works on one equation: output tax charged minus recoverable input tax = the net paid to (or refunded by) HMRC.",
    "Register when taxable turnover exceeds £90,000 (historic or 30-day future test); deregister only when it is expected to fall below £88,000.",
    "Four supply types: standard 20%, reduced 5%, zero-rated 0% and exempt — and zero-rated allows full input recovery while exempt allows none.",
    "Input tax on cars (with private use) and on entertaining UK customers is always blocked; car repairs, fuel and staff entertaining are recoverable.",
    "Returns are usually quarterly under MTD (due 1 month + 7 days); cash, annual and flat-rate schemes simplify VAT, and late filing/payment attract points and penalties.",
  ],
}
