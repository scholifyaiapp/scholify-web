import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AFM · Area E, part two — the remaining currency instruments and the whole of
 * interest rate hedging.
 *
 *   AFM-39  Currency futures and options        (E2b iii, vi)
 *   AFM-40  Currency swaps, FOREX swaps, netting (E2b iv, v; E2c)
 *   AFM-41  Interest rate risk: FRAs and futures (E3a i, ii)
 *   AFM-42  Interest rate swaps, options and collars (E3a iii, iv)
 *
 * Split from acca-study-afm-tree-e1.ts (AFM-35..38) for file size only; the two
 * modules are one syllabus area and the aggregator concatenates them in order.
 *
 * This module retires the last legacy chapter: with Area E authored,
 * acca-study-afm-e.ts is deleted and AFM's rebuild is complete.
 *
 * House rule, restated because it matters most here: every worked hedge is
 * SETTLED. A candidate who can size a hedge but cannot state the net cost once
 * the outcome is known scores about half the marks available, so each example
 * runs through to an effective rate and is compared against doing nothing.
 *
 * Written against the official ACCA AFM syllabus and study guide for September
 * 2026 to June 2027. Kaplan's AFM Study Text and Exam Kit (2020-21) informed
 * depth and chapter sizing only; all wording is original.
 */

const AFM_TREE_39: StudyChapter = {
  paper: "AFM",
  id: "AFM-39",
  number: 39,
  area: "E",
  syllabusRefs: ["E2(b)"],
  title: "Currency futures and options",
  minutes: 20,
  intro:
    "The exchange-traded route. Harder to set up than a forward, imperfect by construction — and the only instruments that leave the upside available.",
  outcomes: [
    "Decide whether to buy or sell currency futures for a given exposure",
    "Size a futures hedge and account for the rounding standardisation forces",
    "Settle a futures hedge and compute the effective rate achieved",
    "Choose between a call and a put option, and at which exercise price",
    "Compare futures, options and forwards, and recommend with reasons",
  ],
  sections: [
    {
      id: "futures",
      heading: "Currency futures, set up and settled",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Buy or sell — the decision that governs everything",
          md: "Ask what you will need to **do** with the currency at the future date, then take the futures position that gains if that becomes more expensive. If you will BUY the currency the contract is denominated in, buy futures. If you will SELL it, sell futures. Get this backwards and the hedge doubles the exposure instead of removing it, so it is worth one line of explicit reasoning in the answer.",
        },
        {
          kind: "formula",
          name: "Number of contracts",
          expr: "Contracts = exposure (in the contract's currency) ÷ contract size",
          note:
            "Round to the nearest whole number and state that you have done so — the unrounded remainder is left unhedged, and acknowledging it is part of the answer. Where the exposure is in the other currency, convert it first at the current futures price.",
        },
        {
          kind: "example",
          title: "A currency futures hedge, settled",
          scenario:
            "A UK company will receive $3m in four months. Sterling futures are quoted in dollars per pound with a contract size of £62,500, currently trading at $1.2600. The company will convert dollars into sterling, so it fears sterling strengthening.",
          steps: [
            { label: "Direction", detail: "It will BUY sterling, so it buys sterling futures — which gain if sterling rises." },
            { label: "Size", detail: "$3m at 1.2600 = £2,380,952. Contracts = 2,380,952 ÷ 62,500 = 38.1, so buy 38 contracts (covering £2,375,000)." },
            { label: "Outcome", detail: "Spot moves to $1.3000 and the futures price to $1.2980." },
            { label: "Futures gain", detail: "(1.2980 − 1.2600) × 62,500 × 38 = 0.0380 × 2,375,000 = $90,250." },
            { label: "Convert and add", detail: "$3m at 1.3000 = £2,307,692, plus the $90,250 gain converted at 1.3000 = £69,423. Total £2,377,115." },
            { label: "Effective rate", detail: "3,000,000 ÷ 2,377,115 = $1.2620 per £1." },
          ],
          result:
            "Unhedged the company would have received £2,307,692. The hedge recovered £69,423 of the £73,260 sterling's rise would have cost — the shortfall being the rounding and the residual basis.",
        },
        {
          kind: "text",
          md: "Notice the two imperfections, both stated in the answer rather than hidden: the position covered £2,375,000 against an exposure of about £2,381,000, and the futures price did not move exactly with spot. Those are standardisation and basis, and they are why a forward — exact in amount and date — remains the cleaner instrument for a certain, dated exposure.",
        },
      ],
      check: {
        q: "A eurozone company must pay $5m in six months. Dollar futures are available. What position should it take?",
        options: [
          "Sell dollar futures, because it is paying dollars away",
          "Buy dollar futures — it will need to acquire dollars, so it should hold a position that gains if dollars become more expensive",
          "Buy euro futures and sell dollar futures simultaneously",
          "No futures position is possible, as the company is not a financial institution",
        ],
        correct: 1,
        explain:
          "The company's risk is that dollars cost more euros in six months. A long dollar futures position gains exactly when that happens, offsetting the increased cost. Selling would profit if dollars got cheaper — precisely when the company needed no help — and would compound the loss when they got dearer.",
      },
    },
    {
      id: "options",
      heading: "Currency options: paying for the upside",
      blocks: [
        {
          kind: "text",
          md: "An option gives the right, not the obligation, to exchange at the exercise price. That asymmetry is the whole product: the holder is protected against an adverse movement and keeps the benefit of a favourable one. The premium is what that costs, and it is paid whether or not the option is used.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Call or put — decide from the contract's own currency",
          md: "Say what you want the **right to do**, in terms of the currency the option is written on. A company needing to buy dollars wants the right to buy dollars — a dollar call. On a sterling-denominated contract, the same exposure is the right to sell sterling — a sterling put. Both describe the identical hedge, which is why stating the underlying explicitly prevents the confusion.",
        },
        {
          kind: "table",
          caption: "Choosing the exercise price",
          head: ["Exercise price", "Premium", "Protection", "Suits"],
          rows: [
            ["Favourable to the holder (in the money)", "High", "Strong — a better worst case", "Low risk tolerance, or a critical exposure"],
            ["Near the current rate (at the money)", "Moderate", "Locks in roughly today's rate", "The usual compromise"],
            ["Unfavourable (out of the money)", "Low", "Weak — a poor worst case, but cheap", "Catastrophe cover, where only a large move matters"],
          ],
        },
        {
          kind: "text",
          md: "The examinable comparison is a **three-column table**: what the outcome is under a forward, under an option, and unhedged, at two or three exchange rates. That comparison shows the shape of each instrument — the forward flat, the unhedged line sloping, the option flat on the bad side and sloping on the good side, displaced downward by the premium. A candidate who builds that table has answered the question; one who describes the instruments has not.",
        },
        {
          kind: "example",
          title: "Where the option earns its premium, and where it does not",
          scenario:
            "A company must pay $2m in three months. A forward is available at $1.2500 per £1, or a sterling put at an exercise price of $1.2500 costing £18,000 in premium.",
          steps: [
            { label: "If spot falls to $1.2000", detail: "Forward: £1,600,000. Option: exercise at 1.2500, so £1,600,000 plus £18,000 premium = £1,618,000. Unhedged: £1,666,667." },
            { label: "If spot rises to $1.3200", detail: "Forward: £1,600,000. Option: abandon, buy at spot for £1,515,152 plus premium = £1,533,152. Unhedged: £1,515,152." },
            { label: "The pattern", detail: "The forward is best when the rate moves against you; the option is best when it moves for you, by the favourable movement less the premium." },
            { label: "The judgement", detail: "The option costs £18,000 for the right to participate in a favourable move. It is worth it only if a favourable move is plausible and the company can afford the certain premium." },
          ],
          result:
            "At $1.3200 the option saves £66,848 against the forward; at $1.2000 it costs £18,000 more. The recommendation depends on the company's view and its tolerance, and saying so is the answer.",
        },
      ],
      check: {
        q: "A company hedges with an option and the exchange rate moves in its favour, so the option is abandoned. Was the hedge a mistake?",
        options: [
          "Yes — the premium was wasted",
          "No. The premium bought certainty about the worst case while leaving the upside available, and the company captured a favourable movement it would have lost under a forward. It is insurance that was not claimed on",
          "Yes, a forward would have been better in every circumstance",
          "It depends on whether the premium exceeded the transaction value",
        ],
        correct: 1,
        explain:
          "Judging a hedge by the outcome that happened rather than by the risk it removed is hindsight, and it is the reasoning that leads boards to stop hedging just before they need to. The correct test is whether buying that protection was reasonable given what was known when the decision was taken.",
      },
    },
  ],
  examTraps: [
    { trap: "Taking the wrong side of the futures position.", fix: "Reason from what you will do with the currency, and write the reasoning down." },
    { trap: "Ignoring the rounding on contract numbers.", fix: "State the unhedged remainder — it is part of the answer, not an untidiness." },
    { trap: "Setting up an option hedge without settling it at two or three rates.", fix: "Build the three-column comparison against forward and unhedged." },
    { trap: "Judging an abandoned option as wasted money.", fix: "It bought a known worst case; assess the decision on what was known when it was taken." },
  ],
  keyTerms: [
    { term: "Currency future", def: "A standardised exchange-traded contract to exchange a fixed currency amount at a set date, margined daily through a clearing house." },
    { term: "Currency option", def: "The right, without obligation, to exchange currency at a stated exercise price, protecting the downside while leaving the upside available." },
    { term: "Exercise price", def: "The rate at which an option holder may transact — a more favourable one costs a higher premium." },
    { term: "Effective rate", def: "The exchange rate a hedge actually delivered, computed from the net home currency amount after all gains, losses and premiums." },
  ],
  summary: [
    "Take the futures position that gains when the thing you must do becomes more expensive.",
    "Size, round, and say what the rounding leaves unhedged; then settle to an effective rate.",
    "Options cost a certain premium for an uncertain benefit — the asymmetry is the product.",
    "Compare forward, option and unhedged at several rates; the table is the answer.",
  ],
  knowledgeDiagnostic: [
    { q: "How do you decide whether to buy or sell currency futures?", a: "Identify what you will do with the currency at the future date and take the position that gains if that action becomes more expensive." },
    { q: "Why is a currency futures hedge never exact?", a: "Standardised contract sizes force rounding, and closing out before the delivery date leaves residual basis." },
    { q: "What does the option premium actually buy?", a: "A known worst case while leaving the favourable outcome available — insurance, whose value is judged on the risk removed rather than the outcome that happened." },
  ],
  furtherStudy: [
    "AFM-38 covers forwards and the money market hedge, the alternatives these are compared against.",
    "AFM-36 explains the margin, tick and basis mechanics behind the futures calculation.",
    "AFM-14 supplies the option pricing model that determines the premium.",
  ],
}

const AFM_TREE_40: StudyChapter = {
  paper: "AFM",
  id: "AFM-40",
  number: 40,
  area: "E",
  syllabusRefs: ["E2(b)", "E2(c)"],
  title: "Currency swaps, FOREX swaps and netting",
  minutes: 18,
  intro:
    "The long-horizon instruments, plus the technique that removes exposure before any instrument is needed at all.",
  outcomes: [
    "Explain a currency swap and the exposures it addresses",
    "Distinguish a currency swap from a FOREX swap and a synthetic agreement",
    "Explain how comparative advantage produces a gain both parties can share",
    "Compute the reduction in flows and cost that multilateral netting achieves",
    "Advise on matching and on the barriers that limit these techniques",
  ],
  sections: [
    {
      id: "currency-swap",
      heading: "Currency swaps",
      blocks: [
        {
          kind: "text",
          md: "A **currency swap** exchanges principal and interest obligations in one currency for those in another, usually over several years. Principal is exchanged at the outset at the spot rate, interest payments are exchanged over the life, and the principal is re-exchanged at maturity, conventionally at the original rate.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "What a currency swap is for",
          items: [
            "**Long horizons** — swaps run for years, where forward markets thin out beyond a year or two",
            "**Matching** — converting a borrowing into the currency of the revenues that will service it, which is the structural answer to economic exposure",
            "**Market access** — a company can borrow where it is known and swap into the currency it needs",
            "**Comparative advantage** — where each party borrows more cheaply in its own market, both can gain by borrowing there and swapping",
          ],
        },
        {
          kind: "illustration",
          title: "Comparative advantage in one paragraph",
          md: "A British company is well known to sterling lenders and can borrow sterling cheaply, but needs dollars for a United States investment. An American company faces the mirror position. Each borrows where it is cheap, then swaps: the British company services the American's dollar obligation and vice versa. Both end up with the currency they wanted, at a lower cost than borrowing it directly — and both have created a natural hedge, since each is now servicing debt in the currency its new assets generate.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Currency swap against FOREX swap",
          md: "A **FOREX swap** is a spot transaction combined with a simultaneous forward in the opposite direction — a short-dated instrument for managing liquidity or rolling a hedge forward, with no exchange of interest payments. A **currency swap** exchanges interest streams over years. Both are called swaps and they are different instruments; the syllabus lists them separately, and confusing them is a straightforward mark lost.",
        },
        {
          kind: "text",
          md: "Note also **synthetic foreign exchange agreements**, which the syllabus names. These settle in a convertible currency by reference to a non-convertible one, so a company with exposure to a currency that cannot be freely traded can still hedge the value — no delivery of the restricted currency takes place, only a cash settlement of the difference.",
        },
      ],
      check: {
        q: "What is the difference between a currency swap and a FOREX swap?",
        options: [
          "There is none; the terms are interchangeable",
          "A currency swap exchanges principal and interest obligations in two currencies over several years; a FOREX swap is a spot deal plus a simultaneous opposite forward, short dated, with no exchange of interest",
          "A currency swap is exchange traded and a FOREX swap is over the counter",
          "A FOREX swap involves three or more currencies",
        ],
        correct: 1,
        explain:
          "The horizon and the interest exchange are what separate them. A currency swap is a funding instrument that converts a multi-year obligation from one currency into another; a FOREX swap is a treasury tool for moving liquidity between currencies or rolling a hedge, with no interest component.",
      },
    },
    {
      id: "netting",
      heading: "Netting and matching, quantified",
      blocks: [
        {
          kind: "text",
          md: "Before hedging anything, remove what does not need hedging. **Matching** uses receipts in a currency to fund payments in the same currency. **Netting** settles only the difference between intra-group obligations. Both cost almost nothing and both reduce the amount any instrument has to cover.",
        },
        {
          kind: "example",
          title: "What multilateral netting removes",
          scenario:
            "Four subsidiaries owe each other the following, in $000: A owes B 300 and C 150; B owes A 200 and D 250; C owes A 100 and B 180; D owes C 220 and A 90.",
          steps: [
            { label: "Gross flows", detail: "300 + 150 + 200 + 250 + 100 + 180 + 220 + 90 = $1,490k would cross borders." },
            { label: "A's position", detail: "Receives 200 + 100 + 90 = 390; pays 300 + 150 = 450. Net: A pays 60." },
            { label: "B and C", detail: "B receives 300 + 180 = 480, pays 200 + 250 = 450, so B receives 30. C receives 150 + 220 = 370, pays 100 + 180 = 280, so C receives 90." },
            { label: "D's position", detail: "Receives 250; pays 220 + 90 = 310. Net: D pays 60. Check: −60 + 30 + 90 − 60 = 0." },
            { label: "Net flows", detail: "A and D each pay 60, B receives 30 and C receives 90 — $120k in total against $1,490k gross." },
          ],
          result:
            "A 92% reduction in the amount crossing borders. At a transaction and conversion cost of 0.4%, that is a saving of about $5,500 on one cycle — repeated monthly, it is the cost of running the netting centre several times over.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The barriers to state",
          md: "Netting requires cash to move between jurisdictions, so **exchange controls** can exclude a subsidiary entirely. Tax authorities may challenge the rates at which internal obligations are settled. Some countries restrict intra-group lending, and the timing of intra-group settlement — leading and lagging — is itself often regulated. A netting recommendation that does not name the jurisdictions likely to be excluded is incomplete.",
        },
        {
          kind: "text",
          md: "**Bilateral** netting is the same idea between two entities only, and it needs no central function — which makes it the practical starting point for a group that has not centralised. Multilateral netting needs a centre, a calendar, and agreed rates, and it repays that overhead only where the volume of intra-group trade is substantial.",
        },
      ],
      check: {
        q: "A group's subsidiaries owe each other $1,490,000 gross, which nets to $120,000. What is the principal benefit?",
        options: [
          "The group's total liabilities fall by $1,370,000",
          "Only $120,000 crosses borders, so the group pays conversion and transaction costs — and hedges exposure — on the net amount rather than the gross",
          "The subsidiaries no longer owe each other anything",
          "The group's reported profit increases by the amount netted",
        ],
        correct: 1,
        explain:
          "Netting changes how obligations are settled, not whether they exist — they are still recorded and still discharged. What falls is the cash actually moved, and therefore the transaction costs, conversion spreads and the exposure requiring an external hedge. Options 0, 2 and 3 all confuse settlement with the underlying obligation.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating a currency swap and a FOREX swap as the same instrument.", fix: "One exchanges interest over years; the other is a spot plus an opposite forward, short dated." },
    { trap: "Reaching for a forward for a five-year exposure.", fix: "Forward markets thin beyond a year or two; a currency swap covers the horizon." },
    { trap: "Recommending netting for the whole group.", fix: "Name the jurisdictions exchange controls or lending restrictions will exclude." },
    { trap: "Claiming netting reduces liabilities.", fix: "It reduces the cash moved and the exposure hedged, not the obligations themselves." },
  ],
  keyTerms: [
    { term: "Currency swap", def: "An exchange of principal and interest obligations in one currency for those in another over a period of years, with principal re-exchanged at maturity." },
    { term: "FOREX swap", def: "A spot currency transaction combined with a simultaneous forward in the opposite direction, used for short-term liquidity management." },
    { term: "Synthetic foreign exchange agreement", def: "A contract settled in a convertible currency by reference to a non-convertible one, allowing exposure to a restricted currency to be hedged without delivering it." },
    { term: "Bilateral netting", def: "Settlement of only the net amount owed between two group entities, requiring no central netting function." },
  ],
  summary: [
    "A currency swap converts a multi-year obligation into another currency, which is the structural answer to economic exposure.",
    "A FOREX swap is short dated with no interest exchange — do not confuse the two.",
    "Match and net before hedging: it costs almost nothing and shrinks what any instrument must cover.",
    "Exchange controls, tax challenge and lending restrictions limit which subsidiaries can participate.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does a currency swap suit a long-term overseas investment?", a: "It runs for years where forward markets thin out, and it converts the borrowing into the currency the new assets will generate — a natural hedge." },
    { q: "What does multilateral netting actually reduce?", a: "The cash crossing borders, and therefore the conversion and transaction costs and the exposure needing an external hedge — not the underlying obligations." },
    { q: "What is a synthetic foreign exchange agreement for?", a: "Hedging exposure to a currency that cannot be freely traded, by settling the difference in a convertible currency instead of delivering the restricted one." },
  ],
  furtherStudy: [
    "AFM-35 covers the treasury centralisation that makes multilateral netting possible.",
    "AFM-24 covers matching the currency of borrowing to revenues, which a currency swap achieves synthetically.",
    "AFM-08 covers the exchange controls that limit which subsidiaries can participate.",
  ],
}

const AFM_TREE_41: StudyChapter = {
  paper: "AFM",
  id: "AFM-41",
  number: 41,
  area: "E",
  syllabusRefs: ["E3(a)"],
  title: "Interest rate risk: forward rate agreements and futures",
  minutes: 19,
  intro:
    "Two ways to fix a borrowing rate before you borrow. One is tailored and settles once; the other is standardised, margined daily, and never quite exact.",
  outcomes: [
    "Apply a forward rate agreement and compute the compensating payment",
    "Show that an FRA locks the rate whichever way the market moves",
    "Decide whether to buy or sell interest rate futures",
    "Size an interest rate futures hedge, allowing for the loan period",
    "Settle a futures hedge to an effective rate, and account for basis",
  ],
  sections: [
    {
      id: "fra",
      heading: "The forward rate agreement",
      blocks: [
        {
          kind: "text",
          md: "An FRA is an over-the-counter agreement fixing an interest rate for a notional amount over a future period. No principal is lent — only the **difference** between the agreed rate and the actual rate is settled, which is why it hedges the rate without affecting who the company borrows from.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Reading the notation",
          md: "A **3v9** FRA covers a six-month period beginning in three months and ending in nine. The first number is when the period starts, the second when it ends, and the difference is its length. A borrower **buys** an FRA (and is compensated if rates rise); a depositor **sells** one.",
        },
        {
          kind: "example",
          title: "An FRA locks the rate — both ways",
          scenario:
            "A company will borrow $10m for six months, starting in three months. It buys a 3v9 FRA at 5.5%.",
          steps: [
            { label: "If the rate rises to 6.2%", detail: "Compensation received = (6.2% − 5.5%) × 10m × 6/12 = $35,000." },
            { label: "Net cost", detail: "Interest paid 6.2% × 10m × 0.5 = $310,000, less $35,000 received = $275,000." },
            { label: "If the rate falls to 4.8%", detail: "The company PAYS (5.5% − 4.8%) × 10m × 0.5 = $35,000 to the bank." },
            { label: "Net cost", detail: "Interest paid 4.8% × 10m × 0.5 = $240,000, plus $35,000 paid = $275,000." },
          ],
          result:
            "$275,000 in both cases — exactly 5.5% × $10m × 6/12. The FRA is symmetric: it removes the risk and the opportunity together, which is the honest way to describe it to a board.",
        },
        {
          kind: "text",
          md: "The advantages are that it matches the amount and dates exactly, requires no margin, and is simple to settle. The disadvantages are that it is a binding obligation with no upside, that it carries the bank's credit risk, and that it is generally available only for shorter periods and larger amounts than a small company can access.",
        },
      ],
      check: {
        q: "A company buys a 3v9 FRA at 5.5% on $10m, and the actual rate turns out to be 4.8%. What happens?",
        options: [
          "It receives compensation, since it has hedged successfully",
          "It pays the bank (5.5% − 4.8%) × $10m × 6/12 = $35,000, so its net cost is still exactly 5.5% — the FRA removes the benefit of the fall as well as the risk of a rise",
          "Nothing, as the FRA only operates if rates rise",
          "It can abandon the FRA and borrow at 4.8%",
        ],
        correct: 1,
        explain:
          "An FRA is an obligation, not an option, so it settles in both directions. That symmetry is exactly what distinguishes it from an interest rate option, and a board expecting to keep the benefit of a fall has misunderstood which instrument it bought.",
      },
    },
    {
      id: "futures",
      heading: "Interest rate futures",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Prices move inversely to rates",
          md: "An interest rate future is priced as **100 minus the interest rate**, so 94.50 implies 5.5%. When rates rise the price falls. A borrower fears rising rates, therefore fears falling prices, therefore **SELLS** futures. A depositor fears falling rates, so buys. Derive it from the pricing convention every time rather than memorising it.",
        },
        {
          kind: "formula",
          name: "Number of interest rate futures contracts",
          expr: "Contracts = (loan amount ÷ contract size) × (loan period ÷ contract period)",
          note:
            "The second fraction is the step candidates omit. A six-month exposure hedged with three-month contracts needs TWICE as many contracts, because each contract covers only three months of the rate. Leaving it out halves the hedge.",
        },
        {
          kind: "example",
          title: "An interest rate futures hedge, settled",
          scenario:
            "A company will borrow $12m for six months, beginning in three months. Three-month contracts of $1m are trading at 94.50, implying 5.5%. Rates rise to 6.2%, and at close-out the futures price is 93.85 — leaving 0.05 of basis.",
          steps: [
            { label: "Direction and size", detail: "Borrowing, so SELL. Contracts = (12 ÷ 1) × (6 ÷ 3) = 24." },
            { label: "Tick value", detail: "$1,000,000 × 0.0001 × 3/12 = $25 per tick." },
            { label: "Futures gain", detail: "94.50 − 93.85 = 0.65, or 65 ticks. Gain = 65 × $25 × 24 = $39,000." },
            { label: "Interest paid", detail: "6.2% × $12m × 6/12 = $372,000." },
            { label: "Net and effective rate", detail: "372,000 − 39,000 = $333,000. Effective = 333,000 ÷ (12m × 0.5) = 5.55%." },
          ],
          result:
            "5.55% against the 5.5% the futures price implied when the hedge was placed. The 0.05% shortfall is the residual basis — and reporting it, rather than claiming a perfect hedge, is what an examiner is looking for.",
        },
        {
          kind: "table",
          caption: "FRA against futures for the same exposure",
          head: ["", "FRA", "Futures"],
          rows: [
            ["Amount and dates", "Exact", "Standardised — rounding required"],
            ["Basis risk", "None", "Present unless held to delivery"],
            ["Cash flow during the hedge", "None until settlement", "Variation margin daily"],
            ["Counterparty", "The bank", "The clearing house"],
            ["Closing early", "Negotiate with the bank", "Trade out on the exchange"],
            ["Availability", "Larger amounts, shorter periods", "Whatever the exchange lists"],
          ],
        },
      ],
      check: {
        q: "A company will borrow $8m for nine months in two months' time. Three-month interest rate futures have a contract size of $1m. How many contracts are needed?",
        options: [
          "8 contracts",
          "24 contracts — (8 ÷ 1) × (9 ÷ 3), because each three-month contract covers only a third of the nine-month exposure",
          "3 contracts",
          "72 contracts",
        ],
        correct: 1,
        explain:
          "The amount ratio gives 8 and the period ratio gives 3, so 24 contracts are required. Omitting the period ratio — option 0 — leaves the exposure two-thirds unhedged, which is the single most common error in this calculation and produces an answer that looks entirely reasonable.",
      },
    },
  ],
  examTraps: [
    { trap: "Expecting an FRA to preserve the benefit of a rate fall.", fix: "It is symmetric and settles both ways; only an option keeps the upside." },
    { trap: "Buying futures when borrowing.", fix: "Prices are 100 minus the rate, so a borrower fearing higher rates sells." },
    { trap: "Omitting the loan-period ratio from the contract count.", fix: "A six-month exposure needs twice as many three-month contracts." },
    { trap: "Reporting a futures hedge as exact.", fix: "State the residual basis and the effective rate actually achieved." },
  ],
  keyTerms: [
    { term: "Forward rate agreement", def: "An over-the-counter contract fixing an interest rate on a notional amount for a future period, settled by paying the difference against the actual rate." },
    { term: "3v9 FRA", def: "An agreement covering the six-month period beginning in three months and ending in nine." },
    { term: "Tick", def: "The minimum price movement of a futures contract, whose money value is contract size × tick size × the contract's time period." },
    { term: "Effective interest rate", def: "The rate a hedge actually delivered, computed from the net interest cost after the derivative's gain or loss." },
  ],
  summary: [
    "An FRA settles the difference against an agreed rate, locking the cost whichever way rates move.",
    "Futures are priced at 100 minus the rate, so a borrower sells.",
    "Size on both the amount ratio and the loan-period ratio — omitting the second halves the hedge.",
    "Settle to an effective rate and report the residual basis rather than claiming exactness.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does an FRA produce the same net cost whether rates rise or fall?", a: "It is a binding two-way contract: the company receives the difference if rates rise above the agreed rate and pays it if they fall below, so the net always equals the agreed rate." },
    { q: "Why does a borrower sell interest rate futures?", a: "Prices are quoted as 100 minus the rate, so rising rates mean falling prices, and a short position gains as prices fall." },
    { q: "What does the loan-period ratio do in the contract calculation?", a: "It scales the hedge for exposures longer than the contract's own period — a six-month exposure needs twice as many three-month contracts." },
  ],
  furtherStudy: [
    "AFM-42 covers swaps, options and collars, the remaining interest rate instruments.",
    "AFM-36 explains basis, tick value and margin, which this chapter applies.",
    "AFM-20 measures the interest rate exposure these instruments hedge, using duration.",
  ],
}

const AFM_TREE_42: StudyChapter = {
  paper: "AFM",
  id: "AFM-42",
  number: 42,
  area: "E",
  syllabusRefs: ["E3(a)"],
  title: "Interest rate swaps, options and collars",
  minutes: 19,
  intro:
    "The long-dated instrument, the one that keeps the upside, and the structure that pays for the second with part of the first.",
  outcomes: [
    "Explain an interest rate swap and what it converts",
    "Compute the gain available from comparative advantage and how it is shared",
    "Design a swap that delivers each party its target rate",
    "Explain interest rate options and the choice of exercise rate",
    "Explain a collar and why it costs less than a cap alone",
  ],
  sections: [
    {
      id: "swaps",
      heading: "Interest rate swaps",
      blocks: [
        {
          kind: "text",
          md: "An interest rate swap exchanges interest obligations on a notional principal in the same currency — typically fixed for floating. No principal changes hands and the original borrowings remain in place: the swap sits alongside them and changes the **net** cost. It is the instrument of choice for long horizons, where FRAs and futures run out.",
        },
        {
          kind: "table",
          caption: "Why a company enters a swap",
          head: ["Motive", "What it achieves"],
          rows: [
            ["Convert floating to fixed", "Certainty of cost, protecting cover and covenants"],
            ["Convert fixed to floating", "Participation if rates are expected to fall; matching floating-rate assets"],
            ["Comparative advantage", "A lower net cost than borrowing directly in the desired form"],
            ["Long horizons", "Cover for five or ten years, where short-dated instruments cannot reach"],
            ["Restructure without refinancing", "Change the interest profile without repaying and reissuing debt"],
          ],
        },
        {
          kind: "formula",
          name: "The gain available from a swap",
          expr: "Total gain = |difference in fixed rates| − |difference in floating rates|",
          note:
            "This is the comparative advantage. If the gap between the two parties' fixed rates is wider than the gap between their floating rates, a swap can make both better off — and the total benefit is the difference between the two gaps, shared by agreement.",
        },
        {
          kind: "example",
          title: "Designing the swap",
          scenario:
            "Company A can borrow fixed at 6% or floating at LIBOR + 0.5%. Company B can borrow fixed at 8% or floating at LIBOR + 1.5%. A wants floating; B wants fixed. They agree to share the gain equally.",
          steps: [
            { label: "The gain", detail: "Fixed gap = 8 − 6 = 2%. Floating gap = 1.5 − 0.5 = 1%. Total gain = 2 − 1 = 1%, so 0.5% each." },
            { label: "Borrow against advantage", detail: "A has the larger advantage in fixed, so A borrows FIXED at 6%. B borrows FLOATING at LIBOR + 1.5%." },
            { label: "The targets", detail: "A wants floating and would otherwise pay LIBOR + 0.5%, so its target is LIBOR. B wants fixed and would otherwise pay 8%, so its target is 7.5%." },
            { label: "The swap", detail: "A pays LIBOR to B; B pays 6% to A." },
            { label: "Check A", detail: "Pays 6% externally, receives 6% from B, pays LIBOR to B. Net = LIBOR. Target met, saving 0.5%." },
            { label: "Check B", detail: "Pays LIBOR + 1.5% externally, receives LIBOR from A, pays 6% to A. Net = 7.5%. Target met, saving 0.5%." },
          ],
          result:
            "Both reach their target. The check is the discipline: compute each party's net position line by line and confirm it equals the target, because a swap that does not reconcile has been designed wrongly.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Two things the arithmetic hides",
          md: "A bank intermediating the swap takes a margin, so the gain shared between the parties is less than the theoretical 1% — questions often state the bank's share explicitly. And each party takes **counterparty credit risk** on the other for the life of the swap: if B fails, A is left paying LIBOR with nothing coming in, holding fixed-rate debt it did not want. Naming that risk is a reliable mark.",
        },
      ],
      check: {
        q: "Company X borrows fixed at 5% or floating at LIBOR + 0.4%. Company Y borrows fixed at 7.5% or floating at LIBOR + 1.2%. What total gain is available from a swap?",
        options: [
          "2.5%, the difference in fixed rates",
          "1.7% — fixed gap 2.5% less floating gap 0.8%",
          "0.8%, the difference in floating rates",
          "3.3%, the sum of the two differences",
        ],
        correct: 1,
        explain:
          "The gain comes from the difference between the two differences: 2.5% − 0.8% = 1.7%, to be shared between the parties and any intermediating bank. The individual gaps are not themselves the gain — they only measure where each party's comparative advantage lies.",
      },
    },
    {
      id: "options-collars",
      heading: "Interest rate options and collars",
      blocks: [
        {
          kind: "text",
          md: "An interest rate option gives protection against an adverse rate movement while leaving the favourable one available. For a borrower this is a **cap**: the right to a maximum rate. For a depositor it is a **floor**: the right to a minimum. Both cost a premium paid whatever happens.",
        },
        {
          kind: "table",
          caption: "The three structures",
          head: ["Structure", "What it is", "Cost", "Outcome"],
          rows: [
            ["Cap", "Buy a cap: maximum rate guaranteed", "Premium paid", "Protected above the cap; full benefit below it"],
            ["Floor", "Buy a floor: minimum rate guaranteed", "Premium paid", "Protected below the floor; full benefit above it"],
            ["Collar", "Buy a cap AND sell a floor", "Net premium — the floor's income offsets the cap's cost", "Rate confined between the two; benefit below the floor given up"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "A collar is the honest compromise",
          md: "A cap is expensive because it gives protection and keeps all the upside. A collar reduces that cost by **selling** some of the upside: the borrower gives up the benefit of rates falling below the floor, and the premium received for that funds most or all of the cap. A **zero-cost collar** is one where the two premiums exactly offset. Say what has been given up, or the structure looks like free protection.",
        },
        {
          kind: "example",
          title: "A collar's outcomes",
          scenario:
            "A borrower buys a cap at 6% and sells a floor at 4%, with the premiums offsetting exactly. Its cost is the market rate, confined by the collar.",
          steps: [
            { label: "If rates reach 7.5%", detail: "The cap operates: the borrower pays 6%. It has saved 1.5%." },
            { label: "If rates are 5%", detail: "Neither operates: the borrower pays 5%, the market rate." },
            { label: "If rates fall to 3%", detail: "The floor operates against it: it pays 4%, giving up 1% of benefit." },
            { label: "The trade", detail: "Cost is confined between 4% and 6% at no net premium — certainty of range bought by surrendering the extreme upside." },
          ],
          result:
            "The borrower has converted an open-ended exposure into a two-percentage-point band for nothing in cash — which is why collars are common, and why the surrendered benefit must be stated.",
        },
        {
          kind: "text",
          md: "Choosing between the instruments comes down to view and tolerance. **Swap** if certainty over a long horizon is what matters and no upside is wanted. **FRA or futures** for a shorter, dated exposure. **Cap** if a favourable move is genuinely plausible and the premium is affordable. **Collar** if protection is needed but the premium is not. Say which and why, in one sentence each — that comparison is what the requirement usually asks for.",
        },
      ],
      check: {
        q: "A borrower enters a zero-cost collar with a cap at 6% and a floor at 4%. Rates fall to 2.5%. What does the borrower pay?",
        options: [
          "2.5%, the market rate",
          "4% — the floor it sold operates against it, so it surrenders the benefit of rates below that level, which is what funded the cap",
          "6%, the cap rate",
          "Nothing, since the collar cost nothing",
        ],
        correct: 1,
        explain:
          "Selling the floor is what made the structure zero-cost, and the price is exactly this outcome: the borrower cannot benefit below 4%. A collar is not free protection — it is protection paid for with the upside, and an answer that omits the surrendered benefit has described only half the instrument.",
      },
    },
  ],
  examTraps: [
    { trap: "Taking the fixed-rate gap as the swap gain.", fix: "The gain is the difference between the fixed gap and the floating gap." },
    { trap: "Designing a swap without checking each party's net position.", fix: "Compute both nets line by line and confirm each equals its target." },
    { trap: "Ignoring the bank's margin and the counterparty risk.", fix: "The intermediary reduces the shared gain, and each party carries the other's credit risk for the swap's life." },
    { trap: "Presenting a zero-cost collar as free protection.", fix: "It is funded by surrendering the benefit below the floor — say what has been given up." },
  ],
  keyTerms: [
    { term: "Interest rate swap", def: "An exchange of interest obligations on a notional principal in the same currency, typically fixed for floating, with no principal changing hands." },
    { term: "Comparative advantage", def: "The condition, where two borrowers' fixed-rate differential exceeds their floating-rate differential, that makes a mutually beneficial swap possible." },
    { term: "Cap", def: "An interest rate option guaranteeing a borrower a maximum rate while leaving the benefit of lower rates available." },
    { term: "Collar", def: "Buying a cap and selling a floor, so the rate is confined to a band and the floor's premium offsets the cap's cost." },
  ],
  summary: [
    "A swap exchanges interest streams alongside the original borrowings, and reaches horizons futures cannot.",
    "The gain is the fixed differential less the floating differential — check each party's net against its target.",
    "A cap protects and keeps the upside; a floor is its depositor equivalent.",
    "A collar funds the cap by selling the benefit below the floor — name what has been surrendered.",
  ],
  knowledgeDiagnostic: [
    { q: "Where does a swap's benefit come from?", a: "Comparative advantage — the fixed-rate differential between the parties exceeding the floating-rate differential, with the excess shared between them." },
    { q: "What risk does a swap create that an FRA over three months largely does not?", a: "Counterparty credit risk over many years — if the other party fails, the company is left with the borrowing it did not want and no offsetting receipt." },
    { q: "What makes a collar cheaper than a cap?", a: "The premium received for selling the floor offsets the cap's cost, paid for by surrendering the benefit of rates below the floor." },
  ],
  furtherStudy: [
    "AFM-41 covers the shorter-dated interest rate instruments this chapter is compared against.",
    "AFM-40 covers currency swaps, which exchange principal as well as interest.",
    "AFM-20 measures the exposure being hedged, through duration and modified duration.",
    "AFM-16 covers the underlying borrowings whose interest profile a swap restructures.",
  ],
}

export const AFM_TREE_AREA_E_PART2: StudyChapter[] = [AFM_TREE_39, AFM_TREE_40, AFM_TREE_41, AFM_TREE_42]
