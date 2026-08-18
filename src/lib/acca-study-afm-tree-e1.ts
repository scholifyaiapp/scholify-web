import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AFM · Area E, part one — the treasury function, the derivatives market, and
 * currency exposure with its two core hedges.
 *
 *   AFM-35  The treasury function                     (E1a)
 *   AFM-36  How the derivatives market works          (E1b)
 *   AFM-37  Translation, transaction, economic exposure (E2a)
 *   AFM-38  Forwards and the money market hedge       (E2b i, ii)
 *
 * Area E and Area B are the two areas the syllabus guarantees in every sitting.
 * The legacy chapter covered treasury, interest rate hedging, currency hedging
 * and value at risk in six sections between them.
 *
 * House rule for the hedging chapters: every worked hedge must be SETTLED, not
 * just set up. A candidate who can size a hedge and cannot state the net cost
 * after the outcome is known scores about half the marks, so each example runs
 * through to an effective rate and compares it with the alternative.
 *
 * Written against the official ACCA AFM syllabus and study guide for September
 * 2026 to June 2027. Kaplan's AFM Study Text and Exam Kit (2020-21) informed
 * depth and chapter sizing only; all wording is original.
 */

const AFM_TREE_35: StudyChapter = {
  paper: "AFM",
  id: "AFM-35",
  number: 35,
  area: "E",
  syllabusRefs: ["E1(a)"],
  title: "The treasury function",
  minutes: 15,
  intro:
    "Treasury is where the group's cash, funding and risk meet. Its examinable question is not what it does but how much of it should be done centrally.",
  outcomes: [
    "Describe treasury's role in short-term cash management, long-term value and risk",
    "Weigh centralisation against local autonomy for a specific group",
    "Explain how pooling and netting reduce balances, costs and exposure",
    "Distinguish a cost centre from a profit centre treasury, and say why it matters",
    "Recommend the controls a treasury operation requires",
  ],
  sections: [
    {
      id: "three-roles",
      heading: "Three roles, one function",
      blocks: [
        {
          kind: "table",
          caption: "What treasury is responsible for",
          head: ["Horizon", "Role", "Typical activity"],
          rows: [
            ["Short term", "Managing the group's financial resources", "Cash forecasting, pooling, short-term investment and borrowing, working capital, banking relationships"],
            ["Long term", "Contributing to the maximisation of corporate value", "Raising funding, managing the capital structure, supporting investment appraisal, rating agency relations"],
            ["Continuous", "Managing risk exposure", "Identifying and hedging currency, interest rate and commodity exposures within policy"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Cost centre or profit centre",
          md: "A **cost centre** treasury exists to manage risk at minimum cost, and is judged on how well exposures are controlled. A **profit centre** treasury is expected to generate returns, which means taking positions the business does not require. The second sounds attractive and is how most treasury disasters have begun — the function best placed to take large positions is also the one furthest from the operations that would notice. Recommend a cost centre unless the scenario gives a compelling reason otherwise, and if a profit centre is retained, insist on limits, independent monitoring and segregation of dealing from settlement.",
        },
        {
          kind: "text",
          md: "The syllabus links treasury to **long-term maximisation of corporate value**, which is worth taking seriously in an answer. Treasury contributes to value not by making money on trades but by lowering the cost of capital, keeping funding available when it is needed, protecting the investment programme from cash shocks, and preventing a covenant breach that would force asset sales at the worst moment.",
        },
      ],
      check: {
        q: "A group's treasury is measured on the profit it generates from currency positions. What should an adviser recommend?",
        options: [
          "Nothing — a profit centre aligns treasury with shareholder returns",
          "Reverting to a cost centre, or at minimum imposing position limits, independent monitoring and segregation of dealing from settlement — because a profit target requires taking positions the business does not need, in the part of the group furthest from operational scrutiny",
          "Increasing the profit target to improve motivation",
          "Moving currency management to the operating subsidiaries",
        ],
        correct: 1,
        explain:
          "A profit target converts a risk-management function into a trading operation, and the resulting positions are unrelated to any underlying commercial exposure. The controls named — limits, independent monitoring, and separating the people who deal from those who settle and record — are the standard answer where the structure cannot be changed.",
      },
    },
    {
      id: "centralisation",
      heading: "Centralisation, pooling and netting",
      blocks: [
        {
          kind: "text",
          md: "The examinable judgement is how much treasury activity to centralise. The case for the centre rests on scale and on **seeing the whole position**; the case for the subsidiary rests on local knowledge and motivation.",
        },
        {
          kind: "table",
          caption: "The benefits of centralising",
          head: ["Benefit", "Mechanism"],
          rows: [
            ["Lower borrowing cost", "One large borrower obtains better terms than many small ones"],
            ["Less idle cash", "Pooling offsets one subsidiary's surplus against another's deficit"],
            ["Smaller hedging cost", "Netting exposures means only the residual is hedged, not each gross position"],
            ["Better expertise", "Specialists in one place rather than part-time treasurers in twelve"],
            ["Consistent policy", "One risk appetite, one set of limits, one reporting line"],
          ],
        },
        {
          kind: "example",
          title: "What netting actually saves",
          scenario:
            "Subsidiary A expects to receive €8m in three months; subsidiary B expects to pay €6m over the same period. Each currently hedges its own position.",
          steps: [
            { label: "Without netting", detail: "Two hedges are transacted, covering €14m of gross exposure, and the group pays the spread on both." },
            { label: "The real exposure", detail: "The group's net position is a €2m receipt." },
            { label: "With netting", detail: "One hedge covers €2m. The other €12m of gross exposure is offset internally at an agreed rate." },
            { label: "The saving", detail: "The dealing spread and any transaction cost on €12m of unnecessary hedging, plus the administrative cost of the second hedge." },
          ],
          result:
            "The group was paying twice to hedge a position that was largely flat. Only the centre could see this, which is the whole argument for centralising the risk function.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The related techniques",
          items: [
            "**Bilateral netting** — two group companies settle only the net amount between them",
            "**Multilateral netting** — a central point nets all intra-group obligations, so each subsidiary makes or receives one payment",
            "**Cash pooling** — balances are notionally or physically combined so surpluses fund deficits within the group",
            "**Matching** — receipts in a currency are used to fund payments in the same currency, avoiding conversion entirely",
            "**Leading and lagging** — accelerating or delaying intra-group settlement, within what local rules permit",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "What limits netting in practice",
          md: "Exchange controls may prohibit it, tax authorities may challenge the rates used for internal settlement, and some jurisdictions restrict intra-group lending. So a netting recommendation should name the jurisdictions that may not participate rather than assuming the whole group can.",
        },
      ],
      check: {
        q: "Why does multilateral netting reduce a group's hedging costs?",
        options: [
          "It eliminates currency exposure entirely",
          "Only the net residual exposure needs hedging externally, rather than each subsidiary's gross position — so the group stops paying the dealing spread on offsetting amounts",
          "It removes the need for a treasury function",
          "It converts all exposures into the home currency automatically",
        ],
        correct: 1,
        explain:
          "Offsetting positions inside a group cancel economically but are each hedged separately unless someone sees them together. Netting removes that duplication. It does not eliminate exposure — the residual remains and still needs a decision — which is why option 0 overstates it.",
      },
    },
  ],
  examTraps: [
    { trap: "Describing treasury's activities without addressing centralisation.", fix: "The examinable judgement is how much to centralise, and why, for this group." },
    { trap: "Endorsing a profit centre treasury.", fix: "It requires positions the business does not need; recommend a cost centre or insist on limits and segregation." },
    { trap: "Assuming every subsidiary can join a netting arrangement.", fix: "Exchange controls, tax challenge and lending restrictions exclude some jurisdictions." },
    { trap: "Claiming netting removes exposure.", fix: "It removes the duplication; the residual position still needs a hedging decision." },
  ],
  keyTerms: [
    { term: "Cash pooling", def: "Combining group bank balances, notionally or physically, so that surpluses in one entity offset deficits in another." },
    { term: "Multilateral netting", def: "Settling all intra-group obligations through a central point so each participant makes or receives a single net payment." },
    { term: "Matching", def: "Using receipts in a currency to meet payments in the same currency, removing the need to convert." },
    { term: "Profit centre treasury", def: "A treasury function expected to generate returns in its own right, which requires taking positions beyond the group's commercial exposures." },
  ],
  summary: [
    "Treasury covers short-term cash, long-term funding and value, and continuous risk management.",
    "Centralise for scale and for sight of the whole exposure; devolve where local knowledge matters.",
    "Netting, pooling and matching cut balances, costs and the amount that must be hedged externally.",
    "Prefer a cost centre; a profit centre needs limits, monitoring and segregation of duties.",
  ],
  knowledgeDiagnostic: [
    { q: "What can only the centre see, and why does it matter?", a: "The netted group position — subsidiaries hedging offsetting exposures separately pay twice to hedge a position that is largely flat." },
    { q: "Why is a profit centre treasury risky?", a: "Meeting a profit target requires positions unrelated to the group's commercial exposure, taken in the function furthest from operational scrutiny." },
    { q: "What can prevent a subsidiary joining a netting scheme?", a: "Exchange controls, restrictions on intra-group lending, and tax authorities challenging the rates used for internal settlement." },
  ],
  furtherStudy: [
    "AFM-36 covers the derivatives market treasury transacts in.",
    "AFM-08 covers the wider centralisation-versus-autonomy question for the whole finance function.",
    "AFM-03 sets the risk framework and appetite treasury operates within.",
  ],
}

const AFM_TREE_36: StudyChapter = {
  paper: "AFM",
  id: "AFM-36",
  number: 36,
  area: "E",
  syllabusRefs: ["E1(b)"],
  title: "How the derivatives market works",
  minutes: 17,
  intro:
    "Before hedging anything, know what you are buying: who stands behind the contract, what it costs to hold, and why the hedge will not be perfect.",
  outcomes: [
    "Compare exchange-traded and over-the-counter contracts on their real trade-offs",
    "Explain contract standardisation, tick size and margin, and compute a tick value",
    "Explain basis and basis risk, and how basis behaves as delivery approaches",
    "Describe delta, gamma and theta and what each measures",
    "Explain delta hedging and why a delta hedge has to be maintained",
  ],
  sections: [
    {
      id: "traded-vs-otc",
      heading: "Exchange traded against over the counter",
      blocks: [
        {
          kind: "table",
          caption: "The trade-off in full",
          head: ["", "Exchange traded", "Over the counter"],
          rows: [
            ["Terms", "Standardised size, dates and specification", "Tailored to the exposure exactly"],
            ["Counterparty", "The clearing house — so credit risk is minimal", "The bank — so its credit standing matters"],
            ["Cash flow", "Margin posted and marked to market daily", "Usually no margin; settlement at maturity"],
            ["Liquidity", "Can be closed out easily before maturity", "Closing early means negotiating with the same bank"],
            ["Cost", "Transparent, generally low", "Embedded in the price quoted"],
            ["Fit to exposure", "Imperfect — hence basis risk and rounding", "Exact, so no basis risk on amount or date"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The two consequences of standardisation",
          md: "First, the contract size will not divide exactly into the exposure, so the hedge is **rounded** and a small amount is left unhedged or over-hedged. Second, the contract's delivery dates will not match the exposure's date, which is where **basis risk** comes from. Both are the price of the clearing house's guarantee and the ability to close out at will.",
        },
        {
          kind: "text",
          md: "**Margin** is the mechanism that makes the clearing house's guarantee work. Initial margin is deposited when the position opens; the position is then marked to market daily, and variation margin is called whenever it moves against the holder. The examinable consequence is a **cash flow one**: a hedge that is working perfectly in economic terms can still require cash to be found each day, and a treasurer who has not arranged that liquidity can be forced to close a sound hedge at the worst moment.",
        },
        {
          kind: "formula",
          name: "Tick value",
          expr: "Tick value = contract size × tick size × time period of the contract",
          note:
            "For a three-month interest rate future on a $1m contract with a tick of 0.01%: 1,000,000 × 0.0001 × 3/12 = $25 per tick. The time fraction is there because the contract prices a three-month rate, and forgetting it overstates every gain and loss by four times.",
        },
      ],
      check: {
        q: "A company hedges with exchange-traded futures. The hedge is performing exactly as intended, yet the treasurer reports a cash problem. What has happened?",
        options: [
          "The hedge must have been sized incorrectly",
          "Variation margin is being called daily as the futures position is marked to market, so cash is required now even though the offsetting gain on the underlying exposure will not be realised until later",
          "Exchange-traded contracts require the full contract value to be paid up front",
          "The clearing house has defaulted",
        ],
        correct: 1,
        explain:
          "This is the classic timing mismatch of exchange-traded hedging. The derivative settles daily while the commercial exposure settles at its own date, so a hedge that is economically sound can consume liquidity throughout its life. Anticipating that requirement is part of recommending futures rather than a forward.",
      },
    },
    {
      id: "basis",
      heading: "Basis, and why a futures hedge is never exact",
      blocks: [
        {
          kind: "definition",
          term: "Basis",
          md: "The difference between the current spot price (or rate) and the futures price for the same underlying. It exists because the futures contract prices a point in the future, and it converges toward zero as the delivery date approaches, since at delivery the two must be the same thing." },
        {
          kind: "text",
          md: "**Basis risk** is the risk that basis does not behave as assumed between the day the hedge is placed and the day it is closed out. If the hedge is held to the contract's delivery date, basis is zero and the hedge is close to exact. If it is closed out early — which is normal, because the exposure rarely falls on a delivery date — some basis remains, and the amount is uncertain.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "timeline",
            title: "Basis converging to delivery",
            data: {
              points: [
                { label: "Hedge placed", sub: "Basis at its widest" },
                { label: "Time passes", sub: "Basis narrows, conventionally assumed to do so evenly" },
                { label: "Hedge closed out", sub: "Some basis remains — this residual is the risk" },
                { label: "Delivery date", sub: "Basis is zero" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The exam convention",
          md: "Questions normally assume basis narrows in a **straight line** to the delivery date, so if basis is 0.60 with six months to delivery and the hedge is closed after four, the remaining basis is 0.60 × 2/6 = 0.20. Say you have assumed linear convergence — it is an assumption, and stating it is worth a mark.",
        },
        {
          kind: "text",
          md: "Basis risk can be reduced but not removed: choose the contract whose delivery date is **just after** the exposure date, so the position is closed as close to convergence as possible, and choose the contract whose underlying most closely matches the exposure. What remains is why a forward contract — tailored to the exact date and amount — has no basis risk at all, and is often the better instrument for a known, dated exposure.",
        },
      ],
      check: {
        q: "A company needs to hedge an exposure maturing in July. Available futures contracts expire in June, September and December. Which should it use, and why?",
        options: [
          "June, because the nearest contract is always the most liquid",
          "September — the contract expiring just after the exposure date, so the hedge can be held as close to convergence as possible and the position still exists when it is needed",
          "December, to allow maximum flexibility",
          "It makes no difference, since all contracts track the same underlying",
        ],
        correct: 1,
        explain:
          "A June contract expires before the exposure arises, leaving the position unhedged for the final weeks. The contract expiring just after the exposure minimises the remaining basis while still covering the whole period. December would cover it but leaves more basis outstanding when the hedge is closed.",
      },
    },
    {
      id: "greeks",
      heading: "The Greeks, and delta hedging",
      blocks: [
        {
          kind: "table",
          caption: "The three the syllabus names",
          head: ["Measure", "What it measures", "Practical meaning"],
          rows: [
            ["Delta", "Change in the option's value for a unit change in the underlying", "How many units of the underlying an option position is equivalent to"],
            ["Gamma", "Rate of change of delta itself", "How quickly the hedge goes out of date — high gamma means frequent rebalancing"],
            ["Theta", "Change in value as time passes", "Time decay: an option loses value simply because expiry approaches"],
          ],
        },
        {
          kind: "formula",
          name: "Delta hedge",
          expr: "Number of options required = exposure ÷ delta",
          note:
            "In the Black-Scholes framework the delta of a call is N(d₁). A call with a delta of 0.5 moves 50 cents for each dollar the underlying moves, so twice as many options are needed to offset a given exposure.",
        },
        {
          kind: "text",
          md: "The practical point is that a delta hedge is only correct **at the moment it is set**. Delta changes as the underlying moves — that is exactly what gamma measures — so the position must be rebalanced to stay neutral. High gamma means the delta moves fast, which means frequent rebalancing, which means transaction costs. This is why delta hedging is a continuous activity rather than a single transaction, and why it belongs to a treasury with the systems to maintain it.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Theta is a cost, and it never reverses",
          md: "An option holder loses value every day the underlying does not move in their favour, because the time value is decaying toward zero. So an option hedge held for months is expensive even if it is never exercised — which is the honest counter to the appeal of options as a hedge that 'lets you keep the upside'. The upside has a price and theta is how it is paid.",
        },
      ],
      check: {
        q: "A treasurer sets up a delta hedge and does not adjust it. What goes wrong?",
        options: [
          "Nothing — a delta hedge is self-correcting",
          "As the underlying moves, delta itself changes (which is what gamma measures), so the hedge ratio becomes wrong and the position is no longer neutral",
          "The options expire worthless automatically",
          "Margin calls will be triggered immediately",
        ],
        correct: 1,
        explain:
          "Delta is a local measure, valid at the current price. Once the underlying moves, the correct number of options changes, and the unadjusted hedge drifts out of neutrality — quickly where gamma is high. Maintaining it is a continuous exercise, which is itself an argument against option hedging where the systems to do so do not exist.",
      },
    },
  ],
  examTraps: [
    { trap: "Omitting the time fraction from tick value.", fix: "A three-month contract needs × 3/12, or every gain and loss is four times too large." },
    { trap: "Forgetting that futures require variation margin.", fix: "The hedge consumes cash daily while the exposure settles later — arrange the liquidity." },
    { trap: "Treating a futures hedge as exact.", fix: "Standardisation forces rounding, and closing out before delivery leaves residual basis." },
    { trap: "Presenting options as a hedge with no downside.", fix: "The premium is paid regardless, and theta erodes the value every day." },
  ],
  keyTerms: [
    { term: "Basis", def: "The difference between the spot price and the futures price for the same underlying, converging to zero at the delivery date." },
    { term: "Variation margin", def: "Cash called daily as a futures position is marked to market, so that the clearing house is never exposed to an accumulated loss." },
    { term: "Delta", def: "The change in an option's value for a unit change in the value of the underlying — the hedge ratio." },
    { term: "Theta", def: "The rate at which an option loses value as time passes, independent of any movement in the underlying." },
  ],
  summary: [
    "Exchange traded gives a clearing house guarantee and liquidity, at the cost of standardisation, margin and basis risk.",
    "Tick value needs the contract's time fraction; margin is called daily and must be funded.",
    "Basis converges to zero at delivery — choose the contract expiring just after the exposure.",
    "Delta sizes an option hedge, gamma says how often to rebalance it, theta is what holding it costs.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does a futures hedge held to delivery have almost no basis risk?", a: "Basis converges to zero at the delivery date, so there is no residual difference between spot and futures to be uncertain about." },
    { q: "What cash flow problem is unique to exchange-traded hedging?", a: "Variation margin is called daily as the position is marked to market, while the offsetting commercial exposure settles only at its own date." },
    { q: "What does gamma tell a treasurer operating a delta hedge?", a: "How fast delta changes, and therefore how frequently the hedge must be rebalanced — and how much that will cost in transactions." },
  ],
  furtherStudy: [
    "AFM-38 and the chapters after it apply these instruments to currency and interest rate exposures.",
    "AFM-14 supplies the option pricing model that delta comes from.",
    "AFM-35 covers the treasury function that operates these positions and must fund the margin.",
  ],
}

const AFM_TREE_37: StudyChapter = {
  paper: "AFM",
  id: "AFM-37",
  number: 37,
  area: "E",
  syllabusRefs: ["E2(a)"],
  title: "Translation, transaction and economic exposure",
  minutes: 15,
  intro:
    "Three exposures with one name between them. Choosing an instrument before identifying which one you face is the fastest way to hedge the wrong thing.",
  outcomes: [
    "Distinguish translation, transaction and economic exposure by what each affects",
    "Identify which exposure a scenario actually presents",
    "Explain why translation exposure is usually left unhedged",
    "Explain why economic exposure cannot be hedged with financial instruments",
    "Recommend the operational responses that address economic exposure",
  ],
  sections: [
    {
      id: "three-exposures",
      heading: "Three exposures, three answers",
      blocks: [
        {
          kind: "table",
          caption: "What each one is",
          head: ["Exposure", "Arises from", "Affects", "Cash?", "Hedge with"],
          rows: [
            ["Transaction", "A contracted amount in a foreign currency, due on a date", "The amount of home currency paid or received", "Yes", "Forwards, money market, futures, options, swaps"],
            ["Translation", "Consolidating foreign subsidiaries' assets and results", "Reported figures — reserves, gearing, group profit", "No", "Matching assets with borrowings in the same currency"],
            ["Economic", "Long-run currency movements changing competitiveness", "The present value of all future cash flows", "Yes, eventually", "Operational change — location, sourcing, invoicing, diversification"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The order of importance",
          md: "**Economic exposure matters most and is hedged least**; translation matters least and is worried about most. Transaction exposure sits between them: it is genuinely a cash matter, it is straightforwardly hedgeable, and it is where most exam calculations live. Getting this ordering into an answer distinguishes a candidate who understands the topic from one who can price a forward.",
        },
        {
          kind: "text",
          md: "**Why translation exposure is usually left alone.** It is an accounting effect: no cash moves, and the value of the underlying foreign business has not changed because the exchange rate did. Hedging it would mean taking a real cash position to protect a reported number, which is a genuine cost incurred for a presentational benefit. The exception is where the reported number has **consequences** — most often a covenant defined on reported gearing, which a translation movement could breach. There, the answer is usually to fund the foreign assets with borrowings in the same currency, so both sides of the balance sheet move together.",
        },
        {
          kind: "text",
          md: "**Why economic exposure resists financial hedging.** It is not a dated amount; it is the effect of a sustained currency movement on the competitiveness of everything the business will do. A forward contract covers a known sum on a known date, and there is no forward market in 'our cost base being 15% higher than our Asian competitors' for the next decade'. Recognising this is the reason the syllabus keeps returning to operational answers.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "How economic exposure is actually managed",
          items: [
            "**Relocate or dual-source production**, so costs can shift toward whichever currency has weakened",
            "**Match currencies** — borrow, and buy inputs, in the currency the revenues arrive in",
            "**Diversify markets**, so no single currency pair determines the group's competitiveness",
            "**Change invoicing currency** where market power allows it — though this transfers the exposure rather than removing it",
            "**Build flexibility into the supply chain**, so the response can be made when it is needed rather than forecast in advance",
          ],
        },
      ],
      check: {
        q: "A group's foreign subsidiary's net assets fall in value on consolidation because the local currency weakened. Should this be hedged?",
        options: [
          "Yes, always — any adverse currency movement should be hedged",
          "Usually not: it is translation exposure, no cash has moved and the subsidiary is unchanged — unless the reported figure has consequences, such as a covenant defined on reported gearing, in which case matching the assets with borrowings in the same currency is the answer",
          "Yes, using currency options to protect the reported reserves",
          "No, because translation exposure cannot be measured",
        ],
        correct: 1,
        explain:
          "Hedging a purely accounting effect costs real cash to protect a presentational number. The exception is where the number is load-bearing — a covenant, a rating trigger — and even then the natural answer is a balance-sheet match rather than a derivative, because it costs nothing to maintain.",
      },
    },
    {
      id: "identifying",
      heading: "Identifying the exposure in a scenario",
      blocks: [
        {
          kind: "text",
          md: "Scenarios rarely label the exposure. Read for **what would change** if the rate moved.",
        },
        {
          kind: "table",
          caption: "Scenario clue to exposure",
          head: ["What the scenario says", "Exposure", "Why"],
          rows: [
            ["An invoice for €4m payable in 90 days", "Transaction", "A contracted amount on a date"],
            ["A tender submitted in dollars, outcome unknown", "Transaction, but contingent", "The exposure only exists if the tender is won — an option suits this"],
            ["Group reserves fell $30m on consolidation", "Translation", "A reported movement, no cash"],
            ["Competitors in a country whose currency has devalued", "Economic", "Relative competitiveness, all future cash flows"],
            ["Costs in one currency, revenues in another, long term", "Economic", "A structural mismatch, not a dated amount"],
            ["Foreign subsidiary funded by parent-currency debt", "Economic and transaction", "Servicing cost fixed while the cash to pay it varies"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The contingent exposure is worth spotting",
          md: "Where a foreign-currency amount depends on an uncertain event — a tender that may not be won, an acquisition that may not complete — a **forward contract is dangerous**, because it obliges you to deliver currency you may not have. That is the textbook case for an **option**: it protects the rate if the event happens and is simply abandoned if it does not. Naming this reason for choosing an option scores far better than 'options give flexibility'.",
        },
      ],
      check: {
        q: "A company has tendered for a contract worth $8m, with the result announced in three months. Which hedge suits it, and why?",
        options: [
          "A forward contract, because it is the cheapest hedge",
          "A currency option — the exposure is contingent on winning, and a forward would oblige the company to deliver currency it would not receive if the tender were lost",
          "A money market hedge, which fixes the rate at no cost",
          "No hedge, since the contract may not be won",
        ],
        correct: 1,
        explain:
          "A forward is an obligation. If the tender is lost the company must still settle it, which converts a hedge into a naked currency position. The option's premium is the price of covering an exposure that may not arise — which is precisely what the premium is for, and the reason to prefer it here.",
      },
    },
  ],
  examTraps: [
    { trap: "Hedging translation exposure with a derivative.", fix: "It is an accounting effect — match assets with same-currency borrowings if a covenant makes it matter." },
    { trap: "Proposing a forward for economic exposure.", fix: "It is structural and undated; the answers are operational — location, sourcing, matching, diversification." },
    { trap: "Using a forward for a contingent exposure.", fix: "A forward obliges delivery; an option covers an exposure that may never arise." },
    { trap: "Choosing an instrument before naming the exposure.", fix: "Read for what would change if the rate moved, then choose." },
  ],
  keyTerms: [
    { term: "Transaction exposure", def: "The risk that the home currency value of a contracted foreign currency receipt or payment changes before settlement." },
    { term: "Translation exposure", def: "The effect of exchange rate movements on the reported figures when foreign operations are consolidated — a reporting effect rather than a cash one." },
    { term: "Economic exposure", def: "The effect of long-run currency movements on an organisation's competitive position and the present value of its future cash flows." },
    { term: "Contingent exposure", def: "A foreign currency exposure that will arise only if an uncertain event occurs, such as winning a tender." },
  ],
  summary: [
    "Transaction is contracted and hedgeable; translation is reported and usually left alone; economic is structural and needs operational answers.",
    "Economic exposure matters most and is hedged least — say so.",
    "Hedge translation only where a reported figure has consequences, and prefer a balance-sheet match.",
    "A contingent exposure calls for an option, because a forward is an obligation.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is translation exposure usually left unhedged?", a: "No cash moves and the underlying business is unchanged, so hedging spends real money to protect a reported figure." },
    { q: "Why can no derivative hedge economic exposure?", a: "It is a sustained effect on competitiveness across all future cash flows, not a known amount on a known date." },
    { q: "What makes an option the right instrument for a tender?", a: "The exposure exists only if the tender is won, and a forward would oblige delivery of currency the company would not receive if it lost." },
  ],
  furtherStudy: [
    "AFM-38 covers the two core hedges for transaction exposure.",
    "AFM-03 places these exposures in the organisation's overall risk framework.",
    "AFM-24 covers matching the currency of borrowing to revenues, the structural answer to economic exposure.",
  ],
}

const AFM_TREE_38: StudyChapter = {
  paper: "AFM",
  id: "AFM-38",
  number: 38,
  area: "E",
  syllabusRefs: ["E2(b)"],
  title: "Forwards and the money market hedge",
  minutes: 19,
  intro:
    "The two hedges every AFM candidate must be able to build and settle. They should give almost the same answer — and when they do not, the difference is the recommendation.",
  outcomes: [
    "Apply a forward contract to a receipt and to a payment, using the right side of the quote",
    "Construct a money market hedge for a payment and for a receipt",
    "Compute the effective rate achieved by each and compare them",
    "Explain why interest rate parity keeps the two close together",
    "Recommend between them, and state what each one costs in flexibility",
  ],
  sections: [
    {
      id: "forward",
      heading: "The forward contract",
      blocks: [
        {
          kind: "text",
          md: "A forward contract fixes today the rate at which a currency amount will be exchanged on a future date. It is over the counter, so the amount and date match the exposure exactly, there is no basis risk and no margin. It is also an **obligation**: the currency must be delivered whether or not the underlying transaction happens, and the rate is fixed whether it turns out well or badly.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Take the rate that is worse for you",
          md: "Quotes come as a bid–offer pair, and the bank always transacts at the side in its own favour. The reliable rule: **you buy the foreign currency at the higher number of home units and sell it at the lower**. If a rate is quoted as $1.2470 − $1.2510 per £1, a company buying dollars with pounds receives the smaller number of dollars per pound, so it uses 1.2470. Working out which side applies from first principles each time is safer than memorising, and it is worth writing the reasoning down in the answer.",
        },
        {
          kind: "text",
          md: "Where a question gives a spot rate and forward **points** rather than an outright forward rate, the points are added when the currency is at a forward premium and deducted when it is at a discount — and the convention in most exam questions is that a **discount** is added to the spot and a **premium** deducted, when quoting the foreign currency per unit of home currency. Read the labelling carefully and, again, sanity-check: the currency with the higher interest rate should end up weaker forward, by interest rate parity.",
        },
      ],
      check: {
        q: "A UK company must pay $1.5m in three months. The three-month forward is quoted $1.2470 − $1.2510 per £1. What is the sterling cost?",
        options: [
          "£1,198,241, using 1.2510",
          "£1,202,887, using 1.2470 — buying dollars, the company receives the lower number of dollars per pound, so it needs more pounds",
          "£1,875,000, multiplying by the rate",
          "£1,200,564, using the mid rate",
        ],
        correct: 1,
        explain:
          "1,500,000 ÷ 1.2470 = £1,202,887. The company is buying dollars, so the bank gives it the rate that yields fewer dollars per pound — the lower figure — and it therefore needs more pounds. Option 0 uses the favourable side, option 2 multiplies when it should divide, and mid rates are not transactable.",
      },
    },
    {
      id: "money-market",
      heading: "The money market hedge",
      blocks: [
        {
          kind: "text",
          md: "A money market hedge builds the forward rate synthetically out of spot and two interest rates. The principle is simple once seen: **create an asset in the currency you will need, or a liability in the currency you will receive**, so the exposure is closed out today.",
        },
        {
          kind: "list",
          style: "number",
          title: "For a future PAYMENT in foreign currency",
          items: [
            "Compute the foreign amount to deposit **now** so it grows to exactly the payment due (divide by 1 + foreign deposit rate for the period)",
            "Buy that foreign amount today at the spot rate",
            "Borrow the home currency needed to do so",
            "The home currency cost is that borrowing plus its interest at maturity",
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "For a future RECEIPT in foreign currency",
          items: [
            "Borrow the foreign amount **now** that will grow to exactly the receipt (divide by 1 + foreign borrowing rate)",
            "Convert it to home currency today at spot",
            "Deposit the home currency",
            "The home currency received is that deposit plus its interest; the receipt repays the foreign loan",
          ],
        },
        {
          kind: "example",
          title: "Money market hedge of a payment, settled",
          scenario:
            "A UK company owes $1.5m in three months. Spot is $1.2500 per £1. US rates: deposit 3%, borrow 4%. UK rates: deposit 3.5%, borrow 5%. All rates are annual.",
          steps: [
            { label: "Dollars to deposit now", detail: "US deposit rate for 3 months = 3% ÷ 4 = 0.75%. So 1,500,000 ÷ 1.0075 = $1,488,834." },
            { label: "Buy them at spot", detail: "1,488,834 ÷ 1.2500 = £1,191,067." },
            { label: "Borrow that in sterling", detail: "UK borrowing for 3 months = 5% ÷ 4 = 1.25%." },
            { label: "Repay in three months", detail: "1,191,067 × 1.0125 = £1,205,956 — the fixed sterling cost." },
            { label: "Effective rate", detail: "1,500,000 ÷ 1,205,956 = $1.2438 per £1." },
          ],
          result:
            "£1,205,956 against the forward's £1,202,887. The forward is £3,069 cheaper here, so the recommendation is the forward — and the answer should say by how much.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Which rates, and why it is always four",
          md: "A money market hedge uses **two** of the four quoted rates, and choosing wrongly is the standard error. For a payment you **deposit** foreign currency and **borrow** home currency, so it is the foreign DEPOSIT rate and the home BORROWING rate. For a receipt it is the reverse: the foreign BORROWING rate and the home DEPOSIT rate. In both cases the company ends up on the unfavourable side of both spreads, which is why the money market hedge rarely beats a competitively priced forward.",
        },
        {
          kind: "text",
          md: "**Why the two are usually close.** Interest rate parity says the forward rate reflects the interest differential between the two currencies — which is exactly what the money market hedge constructs by borrowing in one and depositing in the other. If the two diverged materially, an arbitrage would exist and would close the gap. So expect similar answers, treat a large difference as a signal to check your working, and use the small residual difference to make the recommendation.",
        },
        {
          kind: "activity",
          title: "When would you use the money market hedge anyway?",
          prompt:
            "The forward is marginally cheaper in the example above. Give three circumstances in which the money market hedge would still be the right recommendation.",
          answer:
            "First, when no forward market exists for the currency or the maturity. Thinly traded emerging-market currencies often have no reliable forward beyond short dates, whereas deposits and borrowings can usually still be arranged, so the synthetic route may be the only route. Second, when the company has a use for the cash flows the hedge creates. A money market hedge of a payment leaves the company having borrowed home currency today - if it needed to borrow anyway, the hedge and the funding are the same transaction and the comparison changes, because the borrowing cost was going to be incurred regardless. Equally, a company with surplus foreign currency on deposit already holds the asset the hedge requires and does not need to construct it. Third, when the bank's forward pricing is uncompetitive, which is most likely for a smaller company without the credit standing or the volume to command fine forward pricing - the money market route uses ordinary deposit and borrowing facilities that may be priced better than a bespoke forward. I would add that the money market hedge appears on the balance sheet as a real borrowing and deposit, which affects reported gearing, so a company close to a covenant should check that before choosing it.",
        },
      ],
      check: {
        q: "In a money market hedge of a future foreign currency RECEIPT, which two rates are used?",
        options: [
          "The foreign deposit rate and the home borrowing rate",
          "The foreign borrowing rate and the home deposit rate — the company borrows foreign currency now, converts at spot, and deposits at home",
          "Both borrowing rates",
          "The forward rate and the spot rate",
        ],
        correct: 1,
        explain:
          "A receipt is hedged by creating a matching foreign liability: borrow the foreign currency now so the receipt repays it, convert the proceeds at today's spot, and deposit the home currency until needed. For a payment the two are reversed. Getting this the wrong way round produces a plausible-looking answer that is wrong by the whole interest differential.",
      },
    },
  ],
  examTraps: [
    { trap: "Taking the favourable side of a bid-offer quote.", fix: "The bank transacts in its own favour — reason it out and show the reasoning." },
    { trap: "Using annual rates for a three-month hedge.", fix: "Pro-rate every rate to the period of the exposure." },
    { trap: "Using the wrong pair of interest rates.", fix: "Payment: foreign deposit and home borrowing. Receipt: foreign borrowing and home deposit." },
    { trap: "Setting up a hedge without settling it.", fix: "Carry it through to the home currency amount and the effective rate, then compare with the alternative." },
  ],
  keyTerms: [
    { term: "Forward contract", def: "A binding over-the-counter agreement to exchange a currency amount at a fixed rate on a future date, matching the exposure exactly." },
    { term: "Money market hedge", def: "A synthetic forward built from a spot transaction plus a deposit in one currency and a borrowing in the other." },
    { term: "Effective rate", def: "The exchange rate implied by a hedge's outcome — the foreign amount divided by the home currency actually paid or received." },
    { term: "Interest rate parity", def: "The relationship by which the forward rate reflects the interest differential between two currencies, keeping the forward and money market hedges close." },
  ],
  summary: [
    "A forward matches the exposure exactly with no basis risk, and obliges delivery whatever happens.",
    "A money market hedge builds the same result from spot plus a deposit and a borrowing.",
    "Payment: foreign deposit and home borrowing. Receipt: foreign borrowing and home deposit.",
    "Interest rate parity keeps the two close — settle both, compare effective rates, and recommend.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does a money market hedge rarely beat a competitively priced forward?", a: "It puts the company on the unfavourable side of two interest spreads as well as the spot spread, whereas the forward carries one margin." },
    { q: "What is the first step in hedging a future foreign currency payment through the money market?", a: "Compute the foreign amount to deposit now that will grow to exactly the payment due, by dividing it by one plus the foreign deposit rate for the period." },
    { q: "When is the money market hedge preferable despite a worse rate?", a: "Where no forward market exists for that currency or maturity, where the company needed the borrowing or holds the deposit anyway, or where its forward pricing is uncompetitive." },
  ],
  furtherStudy: [
    "AFM-39 covers currency futures and options, the exchange-traded alternatives.",
    "AFM-37 identifies which exposure these instruments are appropriate for.",
    "AFM-23 uses the same parity relationships to forecast rates for project appraisal.",
  ],
}

export const AFM_TREE_AREA_E_PART1: StudyChapter[] = [AFM_TREE_35, AFM_TREE_36, AFM_TREE_37, AFM_TREE_38]
