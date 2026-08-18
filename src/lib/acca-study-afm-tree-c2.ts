import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AFM · Area C, part two — valuation for the bid, the regulatory framework, and
 * financing the offer.
 *
 *   AFM-27  Valuing a target: growth, models, premium   (C2a–c)
 *   AFM-28  Start-ups, loss-makers and valuation's limits (C2d)
 *   AFM-29  Regulation, the bid process and defences    (C3)
 *   AFM-30  Financing the offer and splitting the gain  (C4)
 *
 * Split from acca-study-afm-tree-c.ts (AFM-25..26) for file size only; the two
 * modules are one syllabus area and the aggregator concatenates them in order.
 *
 * AFM-27 deliberately APPLIES the models taught in Area B (AFM-21, AFM-22)
 * rather than re-teaching them — what it adds is the bid: the premium, the
 * bargaining range, and the re-rating question. AFM-30 then divides the gain,
 * and shows that the financing choice changes the division even when the total
 * gain is identical.
 *
 * Written against the official ACCA AFM syllabus and study guide for September
 * 2026 to June 2027. Kaplan's AFM Study Text and Exam Kit (2020-21) informed
 * depth and chapter sizing only; all wording is original.
 */

const AFM_TREE_27: StudyChapter = {
  paper: "AFM",
  id: "AFM-27",
  number: 27,
  area: "C",
  syllabusRefs: ["C2(a)", "C2(b)", "C2(c)"],
  title: "Valuing a target: growth, models and the premium",
  minutes: 20,
  intro:
    "Two numbers decide a bid: what the target is worth as it stands, and what it is worth in your hands. Everything between them is the negotiation.",
  outcomes: [
    "Estimate near-term and continuing growth from internal and external evidence",
    "Apply book-value-plus, market-based and cash flow models to a target",
    "Adjust for the change in risk profile that the acquisition itself causes",
    "Establish the bargaining range between the target's standalone value and the maximum worth paying",
    "Recognise when a post-merger price-earnings multiple is being assumed rather than earned",
  ],
  sections: [
    {
      id: "growth",
      heading: "Estimating growth, internally and externally",
      blocks: [
        {
          kind: "text",
          md: "Growth is the input that moves a valuation most, so the syllabus asks for it to be estimated by **both** internal and external measures — and for the two to be compared rather than one picked.",
        },
        {
          kind: "formula",
          name: "Internal estimate — Gordon's growth approximation",
          expr: "g = retention rate × return on reinvested funds",
          note:
            "Growth is what the business finances from within: the proportion of earnings retained multiplied by the return earned on them. A company paying out everything it earns and reinvesting nothing cannot grow from internal sources.",
        },
        {
          kind: "table",
          caption: "Two routes to a growth rate",
          head: ["Route", "Method", "Weakness"],
          rows: [
            ["Internal", "Retention × return on reinvestment", "Assumes future reinvestment earns what past reinvestment earned"],
            ["External — historic", "g = (Dₙ ÷ D₀)^(1/n) − 1 over past dividends or earnings", "Projects the past forward, including any period that will not repeat"],
            ["External — forecast", "Analyst estimates, order book, contracted revenue", "Optimism bias, and short horizons that say nothing about perpetuity"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Use two horizons",
          md: "Near-term growth and continuing growth are different questions and should be estimated separately: a company can plausibly grow at 12% for four years while its perpetual rate must be closer to the economy's. Building a valuation on one rate applied forever is the commonest way to produce an indefensible number.",
        },
      ],
      check: {
        q: "A company retains 40% of earnings and earns a 15% return on reinvested funds. What is its internally-financed growth rate?",
        options: [
          "15%, the return on reinvestment",
          "6%, being 40% × 15%",
          "40%, the retention rate",
          "37.5%, being 15% ÷ 40%",
        ],
        correct: 1,
        explain:
          "Growth funded from within is the share of earnings put back multiplied by what that money earns: 0.40 × 0.15 = 6%. The company could grow faster only by raising external finance or by improving the return it earns, which is why the two components are worth discussing separately when advising.",
      },
    },
    {
      id: "models-in-a-bid",
      heading: "The models, applied to a bid",
      blocks: [
        {
          kind: "text",
          md: "Area B established the three families and their assumptions. In a bid they take on specific roles, and knowing which role each plays is what turns three numbers into an argument.",
        },
        {
          kind: "table",
          caption: "What each model contributes to the negotiation",
          head: ["Model", "Role in the bid", "Watch for"],
          rows: [
            ["Book value plus", "The floor — what a break-up would realise", "Intangibles and brands that carry the real value are absent from it"],
            ["Market based (P/E, EV/EBITDA)", "The market's current view of the standalone business", "Comparator choice; a quoted multiple on an unquoted target needs a discount"],
            ["Cash flow (free cash flow, dividend model)", "The value in the ACQUIRER's hands, once synergy is added", "Growth and discount rate assumptions carry most of the answer"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The bargaining range",
          md: "The **minimum** the target's shareholders should accept is its standalone value. The **maximum** worth paying is that standalone value plus the whole of the synergy — pay more and the acquirer's shareholders are worse off. Everything between is negotiation, and stating the two boundaries explicitly is what an examiner is looking for.",
        },
        {
          kind: "example",
          title: "Setting the range",
          scenario:
            "Acquirer A is worth $500m (100m shares at $5.00). Target B is worth $150m (50m shares at $3.00). Combined, the businesses are estimated to be worth $700m.",
          steps: [
            { label: "Synergy", detail: "700 − 500 − 150 = $50m." },
            { label: "Minimum", detail: "$150m, or $3.00 a share — B's shareholders will not accept less than the market already gives them." },
            { label: "Maximum", detail: "150 + 50 = $200m, or $4.00 a share — above this A's shareholders lose." },
            { label: "The range", detail: "$3.00 to $4.00 a share. A bid of $3.60 gives B's shareholders $30m of the $50m and keeps $20m for A's." },
          ],
          result:
            "The range, not the point estimate, is the advice. Where inside it the deal settles depends on competing bidders, the target board's stance and how badly each side needs the transaction.",
        },
        {
          kind: "text",
          md: "The syllabus also asks for methods that reflect the **change in risk profile** the deal causes. If the target's business risk differs from the acquirer's, its cash flows should be discounted at a rate built from the target's own asset beta, re-geared to the structure it will be financed with — not at the acquirer's existing WACC. And where the acquisition materially changes the acquirer's gearing, adjusted present value is the technique, exactly as in Area B.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The changing price-earnings multiple",
          md: "A valuation that applies the **acquirer's** higher price-earnings ratio to the **target's** earnings assumes the market will re-rate those earnings on acquisition. That happens only if the acquirer genuinely makes them more valuable — better management, lower risk, real growth. If nothing changes but the ownership, the assumption is the bootstrap illusion, and it manufactures value out of arithmetic. State what would have to be true for the re-rating to be earned.",
        },
      ],
      check: {
        q: "An acquirer worth $800m bids for a target worth $200m standalone. Combined value is estimated at $1,080m. What is the maximum the acquirer should pay?",
        options: [
          "$200m, the target's standalone value",
          "$280m — the standalone value of $200m plus the whole $80m of synergy, above which the acquirer's shareholders are worse off",
          "$1,080m, the combined value",
          "$80m, the synergy alone",
        ],
        correct: 1,
        explain:
          "Synergy is 1,080 − 800 − 200 = $80m. Paying the standalone value plus all the synergy transfers the entire gain to the target's shareholders and leaves the acquirer exactly as well off as before; anything more destroys value for it. The floor is $200m, so the bargaining range is $200m to $280m.",
      },
    },
  ],
  examTraps: [
    { trap: "Applying one growth rate in perpetuity.", fix: "Estimate near-term and continuing growth separately, and cap the perpetual rate defensibly." },
    { trap: "Discounting the target's cash flows at the acquirer's WACC.", fix: "Use a rate built from the target's own asset beta, re-geared to the financing structure." },
    { trap: "Applying the acquirer's P/E to the target's earnings without justification.", fix: "Say what would have to change for the market to re-rate them — otherwise it is the bootstrap illusion." },
    { trap: "Producing one valuation figure for a bid.", fix: "State the bargaining range: standalone value as the floor, standalone plus synergy as the ceiling." },
  ],
  keyTerms: [
    { term: "Standalone value", def: "What a target is worth under its existing ownership and management, before any acquirer's synergy — the floor of the bargaining range." },
    { term: "Bargaining range", def: "The span between the target's standalone value and that value plus the whole of the expected synergy." },
    { term: "Gordon's growth approximation", def: "An internal estimate of growth as the retention rate multiplied by the return earned on reinvested funds." },
    { term: "Bootstrap illusion", def: "The apparent value created by applying a higher price-earnings multiple to acquired earnings, where nothing about those earnings has actually improved." },
  ],
  summary: [
    "Estimate growth internally and externally, over two horizons, and compare the answers.",
    "Book value is the floor, market multiples give the standalone view, cash flow gives the value in your hands.",
    "The bargaining range runs from standalone value to standalone plus the whole synergy.",
    "A post-merger re-rating has to be earned; assuming it is the bootstrap illusion.",
  ],
  knowledgeDiagnostic: [
    { q: "What sets the ceiling on what an acquirer should pay?", a: "The target's standalone value plus the entire expected synergy — beyond that the acquirer's shareholders are worse off." },
    { q: "Why not discount a target's cash flows at the acquirer's WACC?", a: "The target's business risk may differ, so the rate should be built from its own asset beta, re-geared to the intended financing." },
    { q: "When is applying the acquirer's P/E to acquired earnings legitimate?", a: "Only when the acquisition genuinely makes those earnings more valuable — through better management, lower risk or real growth — rather than merely changing who owns them." },
  ],
  furtherStudy: [
    "AFM-21 and AFM-22 supply the valuation models this chapter applies to a bid.",
    "AFM-25 quantifies the synergy that sets the top of the bargaining range.",
    "AFM-30 shows how the gain inside that range is actually divided by the financing choice.",
    "AFM-19 covers adjusted present value, the technique when the deal changes the acquirer's gearing.",
  ],
}

const AFM_TREE_28: StudyChapter = {
  paper: "AFM",
  id: "AFM-28",
  number: 28,
  area: "C",
  syllabusRefs: ["C2(d)"],
  title: "Start-ups, loss-makers and the limits of valuation",
  minutes: 15,
  intro:
    "Every model in the syllabus needs earnings, cash flows or assets. This chapter is about the companies that have none of them yet — and the ones that used to.",
  outcomes: [
    "Explain why conventional models fail for high-growth start-ups",
    "Apply staged forecasting, revenue multiples and the venture capital method",
    "Use real options thinking where most of the value is in what might follow",
    "Distinguish a temporary loss from a structural one, and value each appropriately",
    "State honestly how wide the resulting range is, and why",
  ],
  sections: [
    {
      id: "start-ups",
      heading: "Valuing a company with no earnings",
      blocks: [
        {
          kind: "text",
          md: "A high-growth start-up defeats the standard toolkit in a specific way. There are no earnings, so no price-earnings ratio. There are no dividends, so no dividend model. Cash flows are negative and will be for years. Net assets are trivial, because the value is in code, users or a brand that the accounts do not carry. Yet these businesses transact at large values, so the question is what the buyers are actually pricing.",
        },
        {
          kind: "table",
          caption: "Approaches that survive the absence of earnings",
          head: ["Approach", "How it works", "When it is defensible"],
          rows: [
            ["Staged discounted cash flow", "Forecast explicitly through the loss years to a normalised profitable year, then a terminal value", "The path to profitability is genuinely visible — a contracted pipeline, a proven unit economic"],
            ["Revenue or user multiple", "Apply a multiple from comparable transactions to revenue, subscribers or active users", "A reasonably close comparator set exists and the metric predicts eventual profit"],
            ["Venture capital method", "Estimate an exit value at a horizon and discount it at a very high rate reflecting failure risk", "Pricing a funding round rather than a whole-company acquisition"],
            ["Real options", "Value the business as the right to expand if the first stage succeeds", "Most of the value depends on a decision that has not been taken yet"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The high discount rate is doing failure's work",
          md: "Venture investors use rates of 30% to 60% or more. That is not a claim about systematic risk — it is a crude way of carrying the probability that the company fails altogether. The alternative, and the more transparent one, is to forecast a **success** case and multiply by the probability of reaching it. Both can be defended; mixing them double-counts the failure risk badly.",
        },
        {
          kind: "text",
          md: "The real options framing is often the most honest description of what is being bought. An early-stage company is largely a right to invest more if the first stage works — and, as Area B established, an option's value rises with volatility, which is why businesses with enormous uncertainty can rationally command high prices. It also explains staged funding: each round buys the right, not the obligation, to fund the next.",
        },
        {
          kind: "activity",
          title: "Justify a start-up valuation to a sceptical board",
          prompt:
            "Your team values a loss-making software company at $180m using a multiple of 9 times annual recurring revenue, taken from three recent transactions. The board asks why a company that has never made a profit is worth $180m. What do you say?",
          answer:
            "First, what the multiple is standing in for. Nine times recurring revenue is not a valuation method in itself - it is shorthand for a discounted cash flow the market has already done, and it only holds if this company's economics resemble the comparators'. So the questions I would want answered before relying on it are whether the three transactions had similar gross margins, similar customer retention and similar cost of acquiring a customer, because a business retaining 95% of its revenue each year is worth a different multiple from one retaining 70%, however similar the headline revenue looks. Second, I would cross-check with a staged forecast: project the loss years explicitly to the year the business turns cash positive, put a terminal value on it, and see whether the answer lands anywhere near $180m. If it lands at $90m, the multiple is pricing something the forecast does not support and we should say so. Third, I would be honest about the range. A start-up valuation is not a point estimate - I would present something like $120m to $210m, state that the width is genuine rather than a failure of analysis, and identify the one or two assumptions that drive it, which here will be retention and the growth rate. The board can then negotiate knowing what it is actually betting on.",
        },
      ],
      check: {
        q: "Why is a very high discount rate used in the venture capital method?",
        options: [
          "Because start-ups have unusually high systematic risk",
          "Because it is a crude way of carrying the probability that the company fails entirely — an alternative to forecasting a success case and applying a probability to it",
          "Because inflation is higher in technology sectors",
          "Because the method discounts pre-tax cash flows",
        ],
        correct: 1,
        explain:
          "The rate is absorbing failure risk, which is largely unsystematic and would not justify such a premium under the capital asset pricing model. That is why it can be replaced by a probability-weighted success forecast — and why doing both at once double-counts the same risk.",
      },
    },
    {
      id: "loss-makers",
      heading: "Loss-making companies: temporary or structural?",
      blocks: [
        {
          kind: "text",
          md: "For an established company that is losing money, the entire valuation turns on one diagnosis: is the loss **temporary** — a cyclical downturn, a one-off event, a fixable cost base — or **structural**, meaning the business as configured cannot earn its cost of capital?",
        },
        {
          kind: "table",
          caption: "Two diagnoses, two valuations",
          head: ["", "Temporary loss", "Structural loss"],
          rows: [
            ["Evidence", "Sector-wide downturn, one-off charge, recent restructuring", "Persistent decline, product obsolescence, permanent margin compression"],
            ["Basis of value", "Normalised sustainable earnings or mid-cycle cash flows", "Net realisable assets — a break-up basis"],
            ["What the buyer pays for", "The recovery, and the discount for taking the risk on it", "The assets, less closure and redundancy costs"],
            ["Key risk", "The recovery does not arrive, or arrives later", "Realisable values are optimistic and exit costs understated"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Adjust the assets before using them as a floor",
          md: "A break-up valuation is not the balance sheet. Deduct redundancy costs, lease exit payments, contract termination penalties, environmental remediation and pension obligations — all of which crystallise on closure and can exceed the realisable value of the assets themselves. For some businesses the honest floor is negative, and saying so is the finding.",
        },
        {
          kind: "text",
          md: "**Normalising** earnings is the technique for the temporary case: strip out non-recurring items, add back costs the acquirer would not incur, adjust owner-manager remuneration to a market rate, and average across a cycle where the business is cyclical. Every adjustment should be listed, because each one is a claim the seller will dispute and the buyer's board will test.",
        },
      ],
      check: {
        q: "A manufacturer has made losses for four consecutive years as its principal product has been displaced by newer technology. On what basis should it be valued?",
        options: [
          "Normalised earnings, averaged across the four years",
          "On a break-up basis — net realisable value of the assets less redundancy, lease exit and other closure costs — because the loss appears structural rather than cyclical",
          "A revenue multiple from comparable technology companies",
          "The value of its accumulated tax losses alone",
        ],
        correct: 1,
        explain:
          "Four years of loss driven by product displacement points to a business that cannot earn its cost of capital as configured, so there are no sustainable earnings to normalise. The realistic value is what the assets would fetch net of the costs of closing — which may be low or negative. Tax losses may add value to a buyer that can use them, but they are an adjunct rather than the basis.",
      },
    },
  ],
  examTraps: [
    { trap: "Applying a price-earnings ratio to a loss-making company.", fix: "A negative multiple is meaningless — normalise earnings, or value on assets if the loss is structural." },
    { trap: "Using a high discount rate and a probability of failure together.", fix: "Choose one — both carry the same risk, so using both double-counts it." },
    { trap: "Treating a revenue multiple as a method rather than a shorthand.", fix: "Test whether the comparators share this company's margins, retention and acquisition costs." },
    { trap: "Using balance sheet net assets as a break-up floor.", fix: "Deduct redundancy, lease exits, remediation and pension obligations — the floor can be negative." },
  ],
  keyTerms: [
    { term: "Venture capital method", def: "Valuing an early-stage business by estimating an exit value at a future horizon and discounting it at a rate high enough to absorb the probability of failure." },
    { term: "Normalised earnings", def: "Reported earnings adjusted for non-recurring items, owner remuneration and cyclicality, to give a sustainable figure a valuation can be based on." },
    { term: "Structural loss", def: "A loss arising because the business as configured cannot earn its cost of capital, as distinct from a temporary or cyclical downturn." },
    { term: "Break-up basis", def: "Valuation as the net realisable value of the assets less the costs that crystallise on closure." },
  ],
  summary: [
    "Start-ups defeat earnings-based models; use staged forecasts, comparable multiples, the venture capital method or option thinking.",
    "A very high discount rate is carrying failure risk — do not also apply a probability of failure.",
    "For a loss-maker, diagnose temporary versus structural before choosing a basis.",
    "A break-up floor must be net of redundancy, exit and remediation costs, and can be negative.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does real options thinking suit an early-stage company?", a: "Most of its value is the right to invest further if the first stage succeeds, and option value rises with the very uncertainty that defeats conventional models." },
    { q: "What single diagnosis drives the valuation of a loss-making company?", a: "Whether the loss is temporary — so normalised earnings apply — or structural, in which case the basis is a break-up valuation." },
    { q: "What must be deducted from realisable asset values on a break-up?", a: "Redundancy, lease exit payments, contract termination penalties, environmental remediation and pension obligations." },
  ],
  furtherStudy: [
    "AFM-27 covers the mainstream valuation approaches these companies fall outside.",
    "AFM-15 supplies the real options framework referred to here.",
    "AFM-16 covers venture capital and business angel finance as sources for these businesses.",
    "Area D returns to the failing company from the reconstruction side.",
  ],
}

const AFM_TREE_29: StudyChapter = {
  paper: "AFM",
  id: "AFM-29",
  number: 29,
  area: "C",
  syllabusRefs: ["C3(a)", "C3(b)"],
  title: "Regulation, the bid process and defences",
  minutes: 17,
  intro:
    "Takeover regulation exists because the people deciding whether to sell a company are not the people who own it. Everything in this chapter follows from that conflict.",
  outcomes: [
    "Explain the factors that have shaped takeover regulation internationally",
    "Compare the shareholder and stakeholder models of regulation",
    "Identify the regulatory issues a specific offer raises",
    "Assess whether an offer is in the target shareholders' best interests",
    "Advise a target board on defending a hostile bid within the rules that bind it",
  ],
  sections: [
    {
      id: "two-models",
      heading: "Two models of regulation",
      blocks: [
        {
          kind: "text",
          md: "Takeover regimes differ across the world because countries answer one question differently: **whose company is it?** The answer determines who decides on an offer and what a board may do to resist one.",
        },
        {
          kind: "table",
          caption: "Shareholder model against stakeholder model",
          head: ["", "Shareholder model", "Stakeholder model"],
          rows: [
            ["Premise", "The company belongs to its shareholders", "The company serves employees, lenders, communities and shareholders together"],
            ["Who decides on an offer", "The shareholders, individually", "The board and often employee representatives, with wider interests weighed"],
            ["Board's role in a bid", "Advise, and not frustrate — defensive action generally needs shareholder approval", "May resist in the company's broader interest"],
            ["Typical features", "Mandatory offer thresholds, equal treatment, strict timetable, squeeze-out", "Cross-shareholdings, two-tier boards, employee representation, restrictions on foreign control"],
            ["Consequence", "Hostile bids are possible and the market for corporate control is active", "Hostile bids are rare and usually negotiated with the board first"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The rule that changes the whole defence answer",
          md: "Under a shareholder-model code the target board is generally **prohibited from frustrating an offer** without shareholder approval. So the American repertoire — poison pills, staggered boards, selling the crown jewels — is largely unavailable. A defence answer written for one regime and applied to the other loses the marks, so establish which regime the scenario is in before recommending anything.",
        },
        {
          kind: "text",
          md: "The forces that shaped these regimes are worth naming: protecting **minority shareholders** from being squeezed out or paid less than a controlling holder; maintaining **competition**, which is why merger control sits alongside takeover rules; protecting **employment and national interest**, which produces foreign-ownership screening in strategic sectors; and preserving **market integrity**, through disclosure of stakebuilding and controls on insider dealing during a bid.",
        },
      ],
      check: {
        q: "A target board in a shareholder-model jurisdiction proposes to sell its most valuable division to make itself unattractive to a hostile bidder. What is the difficulty?",
        options: [
          "None — a board may take any action to protect the company",
          "It is frustrating action, which generally requires shareholder approval, because the decision on whether to accept an offer belongs to the shareholders and not to the board",
          "Divisional disposals are prohibited during a bid in every jurisdiction",
          "The board must first obtain the bidder's consent",
        ],
        correct: 1,
        explain:
          "Selling the asset that makes the company attractive destroys the shareholders' opportunity to accept a premium, and does so through a decision the board takes on its own behalf. That is why shareholder-model codes require such action to be approved by the shareholders themselves. It is not a universal prohibition — in a stakeholder-model regime a board has considerably more latitude.",
      },
    },
    {
      id: "process-and-interests",
      heading: "The offer, and whether it serves the shareholders",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The regulatory issues a bid raises",
          items: [
            "**Stakebuilding disclosure** — building a holding usually triggers disclosure at defined thresholds",
            "**Mandatory offer** — crossing a control threshold typically obliges a bid for the rest, on equivalent terms",
            "**Equal treatment** — all shareholders of a class must receive the same offer; side deals with large holders are restricted",
            "**Competition review** — clearance may be required, and remedies such as divestment may be imposed",
            "**Sector and national interest screening** — defence, utilities, media and technology often carry additional approvals",
            "**Timetable and disclosure** — a strict clock, with profit forecasts and asset valuations made during a bid subject to reporting requirements",
            "**Squeeze-out and sell-out** — the right to compel remaining minorities once a high acceptance level is reached, and their right to be bought out",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The target board's actual duty",
          md: "The board must give the shareholders a **reasoned opinion** on the offer. That opinion is about whether the price and terms fairly reflect the company's value and prospects — not about whether the directors would prefer to keep their jobs. When a scenario shows a board resisting an offer at a substantial premium with no alternative on the table, the agency conflict is the finding.",
        },
        {
          kind: "text",
          md: "Assessing whether an offer is in shareholders' best interests means comparing it against the realistic alternatives: the standalone value under the current plan (with a discount for execution risk), any competing offer, and the value of remaining independent as a minority once a bidder holds control. That last one matters — a shareholder who declines an offer that succeeds anyway is left holding an illiquid minority stake in a controlled company.",
        },
      ],
      check: {
        q: "An offer is pitched 45% above the target's pre-bid share price, but the board recommends rejection on the grounds that the standalone plan will deliver more within three years. What should shareholders be told to weigh?",
        options: [
          "Nothing — a 45% premium should always be accepted",
          "The present value of the standalone plan, discounted for the risk that it is not delivered, against a certain premium available today — and the fact that the plan's value is management's own forecast",
          "Only the board's recommendation, which is binding",
          "That rejecting an offer is prohibited once a premium exceeds 30%",
        ],
        correct: 1,
        explain:
          "The comparison is a certain amount now against a forecast amount later, made by the people whose positions depend on independence. That does not make the board wrong — a plan may genuinely be worth more — but the forecast should be discounted for delivery risk and its source should be stated. Options 2 and 3 invent rules; the decision belongs to each shareholder.",
      },
    },
    {
      id: "defences",
      heading: "Defending a hostile bid",
      blocks: [
        {
          kind: "text",
          md: "Defences divide into those prepared **before** a bid arrives, which are generally permissible, and those attempted **after** it, which in a shareholder-model regime are constrained.",
        },
        {
          kind: "table",
          caption: "Pre-bid and post-bid defences",
          head: ["Timing", "Defence", "Effect and limits"],
          rows: [
            ["Pre-bid", "Communicate strategy so the shares are fully rated", "The best defence — an undervalued company invites a bid"],
            ["Pre-bid", "Strong operational performance and a clear plan", "Removes the bidder's argument that the assets are underused"],
            ["Pre-bid", "Cross-holdings, employee share schemes, staggered boards", "Availability varies sharply by jurisdiction"],
            ["Post-bid", "Attack the offer's logic and price", "Always available; the core of any defence document"],
            ["Post-bid", "Revalue assets or issue a profit forecast", "Permitted but subject to reporting requirements during a bid"],
            ["Post-bid", "Find a white knight — a preferred alternative bidder", "Effective, but concedes that the company will be sold"],
            ["Post-bid", "Refer the bid to a competition authority", "Delay and possible prohibition, if there is a genuine competition issue"],
            ["Post-bid", "Sell key assets, issue new shares, buy back stock", "Frustrating action — usually needs shareholder approval"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The best defence is not a defence",
          md: "A company trading at a full rating, with a strategy the market understands and believes, is expensive to buy and therefore rarely attacked. Almost every hostile bid follows a period in which the shares were rated below what the assets could produce. So the honest advice to a board wanting protection is about performance and communication, not about tactics — and saying that scores better than listing eight manoeuvres.",
        },
        {
          kind: "activity",
          title: "Advise a target board",
          prompt:
            "A board in a shareholder-model jurisdiction receives a hostile all-cash offer at a 25% premium. It believes the company is worth substantially more. What do you advise, in order?",
          answer:
            "Start by being clear about who decides: the board's job is to give the shareholders a reasoned opinion, not to block the bid, and defensive action that frustrates the offer will need shareholder approval anyway - so the strategy has to be persuasion rather than obstruction. Then the substance. First, establish the value the board is claiming and evidence it: a defence resting on the assertion that the offer undervalues the company persuades nobody, whereas one resting on a specific plan with figures, a timetable and a track record of delivery can. Second, attack the offer's own logic - what synergy is the bidder expecting, and is the premium being offered a fair share of it? If the bidder is capturing most of a large synergy, the argument is not that the company is worth more standalone but that this price does not reflect what the company is worth to the bidder. Third, consider a white knight or a formal auction, which uses the bidder's own interest to establish a higher price, while accepting that this concedes the company will probably be sold. Fourth, check whether a genuine competition or sector-screening issue exists - not as a delaying tactic, but because if one exists the bid may not complete and shareholders need to know that before deciding. What I would not recommend is asset disposals or share issues designed to make the company unattractive: they need shareholder approval, they damage the business if they succeed, and they invite the accusation that the board is defending its own position rather than the shareholders' value.",
        },
      ],
      check: {
        q: "Which is the most effective long-term protection against a hostile bid?",
        options: [
          "A staggered board that prevents a bidder replacing directors quickly",
          "Trading at a full rating, achieved through strong performance and a strategy the market understands and believes — an undervalued company is what invites a bid in the first place",
          "Holding large cash balances to fund a defence",
          "Cross-shareholdings with friendly companies",
        ],
        correct: 1,
        explain:
          "Almost every hostile bid follows a period in which the shares were rated below what the assets could produce, so the durable protection is removing that gap. The structural devices in the other options are unavailable or heavily restricted in many jurisdictions, and large idle cash balances make a company more attractive to a bidder rather than less.",
      },
    },
  ],
  examTraps: [
    { trap: "Recommending poison pills or crown-jewel sales in a shareholder-model jurisdiction.", fix: "Frustrating action generally requires shareholder approval — establish the regime first." },
    { trap: "Treating the target board's view as the decision.", fix: "The board gives a reasoned opinion; each shareholder decides." },
    { trap: "Comparing an offer only with the current share price.", fix: "Compare with the standalone plan discounted for delivery risk, any competing offer, and life as a minority." },
    { trap: "Listing defence tactics without saying which are permitted here.", fix: "Split pre-bid from post-bid, and name the approval each post-bid action would need." },
  ],
  keyTerms: [
    { term: "Frustrating action", def: "Action by a target board that would defeat an offer or deny shareholders the chance to decide on it, generally requiring shareholder approval under a shareholder-model code." },
    { term: "Mandatory offer", def: "The obligation, on crossing a defined control threshold, to offer to acquire the remaining shares on equivalent terms." },
    { term: "White knight", def: "A more acceptable alternative bidder invited by a target board facing a hostile offer." },
    { term: "Squeeze-out", def: "The right of a bidder reaching a high acceptance level to compel the remaining minority to sell on the same terms." },
  ],
  summary: [
    "Regimes differ on whose company it is, and that determines who decides and what a board may do.",
    "Under a shareholder model, frustrating action needs shareholder approval — most classic defences are unavailable.",
    "The board owes a reasoned opinion on price and prospects, not a defence of its own position.",
    "The strongest defence is a full rating earned by performance and communication before any bid arrives.",
  ],
  knowledgeDiagnostic: [
    { q: "Why are hostile bids rarer under a stakeholder model?", a: "The board weighs wider interests and has far more latitude to resist, and features such as cross-shareholdings and two-tier boards make an unnegotiated approach impractical." },
    { q: "What must a target board provide to its shareholders?", a: "A reasoned opinion on whether the offer's price and terms fairly reflect the company's value and prospects." },
    { q: "Why is a white knight defence a partial concession?", a: "It may secure a better price, but it accepts that the company will be sold — only to a different buyer." },
  ],
  furtherStudy: [
    "AFM-30 covers the financing of the offer this chapter's regulation governs.",
    "AFM-06 develops the agency conflict behind a board resisting an offer its shareholders would accept.",
    "AFM-27 supplies the valuation the target board's reasoned opinion has to rest on.",
  ],
}

const AFM_TREE_30: StudyChapter = {
  paper: "AFM",
  id: "AFM-30",
  number: 30,
  area: "C",
  syllabusRefs: ["C4(a)", "C4(b)", "C4(c)"],
  title: "Financing the offer and splitting the gain",
  minutes: 19,
  intro:
    "Two offers can be worth exactly the same on announcement day and deliver quite different amounts. The difference is who keeps the synergy — and who carries the risk that it never arrives.",
  outcomes: [
    "Compare the sources available to fund a cash-based acquisition",
    "Evaluate pure and mixed consideration, and recommend an offer",
    "Compute how a merger's gain is divided under cash and under a share exchange",
    "Explain why a share exchange transfers synergy and risk to the target's shareholders",
    "Assess the effect of the chosen offer on the acquirer's reported position and performance",
  ],
  sections: [
    {
      id: "consideration",
      heading: "The forms of consideration",
      blocks: [
        {
          kind: "table",
          caption: "What each form does",
          head: ["Form", "Target shareholders get", "Effect on the acquirer"],
          rows: [
            ["Cash", "A certain, immediate, usually taxable amount", "Gearing rises or reserves fall; no dilution; keeps all the synergy"],
            ["Share exchange", "A continuing stake in the combined business", "No cash outflow; dilution of control and of the gain; often tax-deferred for the seller"],
            ["Loan notes or debt", "A fixed return, sometimes with a tax advantage on timing", "Gearing rises; a fixed obligation regardless of how the deal performs"],
            ["Convertibles", "Fixed income now with an option on the upside", "Lower initial cost; potential dilution later"],
            ["Earn-out", "Payment contingent on the acquired business performing", "Aligns the price with delivery; keeps vendors engaged; disputes over measurement"],
            ["Mixed", "A combination, often with an election between forms", "Balances cash cost, dilution and risk-sharing; widens acceptability"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Cash needs a source, and the source is the real question",
          md: "A cash offer is funded from reserves, from new debt, from an equity issue, or from disposal proceeds. Recommending cash without saying which is an incomplete answer — an equity issue to fund a 'cash' offer produces dilution anyway, and new debt puts the covenant analysis from Area B squarely back on the table.",
        },
        {
          kind: "text",
          md: "The **earn-out** deserves particular attention in a scenario where the target's value depends on its people. It ties part of the price to performance after completion, which both reduces the risk of overpaying and gives the vendors a reason to stay. Its cost is complexity: the measure has to be defined precisely, and the acquirer's own decisions after completion will affect it, which is where the disputes come from.",
        },
      ],
      check: {
        q: "An acquirer is confident the target is worth far more in its hands than the market realises, and the synergy is large. Which form of consideration best serves its own shareholders?",
        options: [
          "A share exchange, which conserves cash",
          "Cash, because it fixes what the target's shareholders receive and leaves the whole of the synergy with the acquirer's shareholders",
          "Convertible loan notes, which are always cheapest",
          "The form makes no difference to how the gain is divided",
        ],
        correct: 1,
        explain:
          "Cash caps the target shareholders' return at the agreed amount, so any synergy above what was priced accrues entirely to the acquirer. A share exchange hands the target's shareholders a continuing stake and therefore a share of that upside, which is the opposite of what an acquirer confident in the synergy wants.",
      },
    },
    {
      id: "splitting",
      heading: "How the gain actually divides",
      blocks: [
        {
          kind: "example",
          title: "Two offers, identical on announcement day",
          scenario:
            "Acquirer A has 100m shares at $5.00, so $500m. Target B has 50m shares at $3.00, so $150m. Combined, the businesses are worth $700m — a synergy of $50m. Compare a cash offer of $3.60 a share with a share exchange of 0.72 A shares for each B share. At $5.00, 0.72 shares is worth exactly $3.60.",
          steps: [
            { label: "Cash — cost", detail: "50m × $3.60 = $180m paid out." },
            { label: "Cash — A's shareholders", detail: "Combined value 700 less 180 paid = $520m over 100m shares = $5.20. Gain $20m." },
            { label: "Cash — B's shareholders", detail: "$180m received against $150m standalone. Gain $30m." },
            { label: "Shares — new share count", detail: "50m × 0.72 = 36m new shares, so 136m in total. Value per share = 700 ÷ 136 = $5.147." },
            { label: "Shares — the split", detail: "B's holders own 36m × 5.147 = $185.3m, a gain of $35.3m. A's holders own 100m × 5.147 = $514.7m, a gain of $14.7m." },
          ],
          result:
            "Both offers were 'worth $3.60' when announced. The cash offer gives A $20m and B $30m; the share offer gives A $14.7m and B $35.3m. The total gain is $50m either way — only the division changed.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Dividing the $50m gain",
            data: {
              leftTitle: "Cash at $3.60",
              rightTitle: "0.72 shares per share",
              rows: [
                { aspect: "Acquirer's shareholders", left: "+$20.0m", right: "+$14.7m" },
                { aspect: "Target's shareholders", left: "+$30.0m", right: "+$35.3m" },
                { aspect: "Value per acquirer share", left: "$5.20", right: "$5.147" },
                { aspect: "Who carries synergy risk", left: "Acquirer alone", right: "Shared" },
                { aspect: "If synergy disappoints", left: "Acquirer bears all of it", right: "Target's holders bear part of it" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "The mechanism, stated once",
          md: "A share exchange makes the target's shareholders **part-owners of the synergy**. They receive shares whose value already reflects the combined business, so they capture a slice of the gain the acquirer is creating. Cash fixes their return, leaving the acquirer with all of the upside — and all of the downside if the synergy proves illusory. That symmetry is the argument to put to a board: pay in shares when you are unsure of the synergy, in cash when you are confident.",
        },
        {
          kind: "text",
          md: "Two refinements worth stating. First, the share-exchange calculation must use the **combined** value per share, not the pre-bid price — using $5.00 rather than $5.147 understates what the target's shareholders receive and is the standard slip. Second, the target's shareholders bear the risk that the synergy estimate is wrong, which cuts both ways and is precisely why a target board sceptical of the acquirer's forecasts will push for cash.",
        },
      ],
      check: {
        q: "In a share-exchange offer, at what price should the shares given to the target's shareholders be valued?",
        options: [
          "The acquirer's pre-bid share price, since that is what the offer was based on",
          "The value per share of the COMBINED entity after the merger, because that is what the shares the target's holders receive are actually worth",
          "The target's pre-bid share price",
          "The average of the two companies' pre-bid prices",
        ],
        correct: 1,
        explain:
          "The target's shareholders end up holding shares in the merged company, so their value is the combined value divided by the enlarged share count. Using the pre-bid price ignores the synergy those shares now embody and understates what has been handed over — which is why a share offer often turns out to be more generous than it looked on announcement day.",
      },
    },
    {
      id: "reported-impact",
      heading: "What the offer does to the acquirer's reported numbers",
      blocks: [
        {
          kind: "text",
          md: "The final outcome asks for the effect of a given financial offer on the acquirer's **reported financial position and performance**. A board can approve a value-adding deal and still be surprised by what it does to the measures the market watches.",
        },
        {
          kind: "table",
          caption: "The same acquisition, funded three ways",
          head: ["Measure", "Cash from new debt", "Share exchange", "Cash from reserves"],
          rows: [
            ["Gearing", "Rises sharply", "Falls", "Rises slightly (equity unchanged, cash down)"],
            ["Interest cover", "Falls immediately", "Unchanged", "Broadly unchanged"],
            ["EPS", "Rises if the target's earnings exceed the after-tax interest cost", "Depends on the exchange ratio against relative P/E ratios", "Rises — no new shares, no interest"],
            ["Control", "Unchanged", "Diluted", "Unchanged"],
            ["Liquidity", "Preserved", "Preserved", "Consumed"],
            ["Credit rating", "At risk", "Neutral or positive", "Slight pressure"],
          ],
        },
        {
          kind: "text",
          md: "The EPS row is where the **bootstrap effect** appears. If the acquirer trades on a higher price-earnings ratio than the target, a share exchange mechanically increases earnings per share — it buys more earnings per share issued. That is arithmetic, not value creation, and the shares should only re-rate if the acquisition genuinely improves the earnings acquired. A board celebrating EPS accretion as evidence of a good deal is making the error the syllabus expects you to identify.",
        },
        {
          kind: "activity",
          title: "Recommend the structure",
          prompt:
            "An acquirer with interest cover of 3.6 times and a covenant at 2.5 wants to buy a target whose value depends heavily on retaining its founder-engineers. Synergy forecasts are dominated by revenue cross-selling. What consideration do you recommend?",
          answer:
            "A mixed structure, and the two facts in the scenario each point to a different component. Because the synergy is mostly revenue cross-selling, which is the least reliable class, the acquirer should not want to keep all of the risk - so some of the consideration should be in shares, which hands the target's shareholders a slice of both the upside and the disappointment. Because the value depends on the founder-engineers staying, part of the price should be an earn-out tied to performance over two or three years, which both protects against overpaying and gives those individuals a direct reason to remain; I would pair it with retention and non-compete terms rather than relying on the earn-out alone. I would keep the cash element modest and would want it funded without new debt if possible: cover at 3.6 against a 2.5 covenant leaves only about a third of headroom, and a debt-funded cash offer would consume it immediately while the revenue synergy - by its nature - arrives late if at all. So: shares as the core, an earn-out for the contingent portion, cash limited to what reserves and disposal proceeds can fund, and the covenant position modelled in the trough year before anything is committed.",
        },
      ],
      check: {
        q: "An acquirer on a P/E of 20 buys a target on a P/E of 10 in a share exchange. EPS rises immediately. What does this prove?",
        options: [
          "That the acquisition has created value for shareholders",
          "Nothing about value — it is the bootstrap effect, arithmetic arising from issuing shares rated at 20 to buy earnings rated at 10; value is created only if the acquired earnings actually improve or become less risky",
          "That the target was overvalued before the bid",
          "That the acquirer's share price will double",
        ],
        correct: 1,
        explain:
          "Buying cheaper earnings with dearer paper always raises earnings per share, whatever the merits of the deal. Whether value has been created depends on whether the combined business generates more cash than the two did apart — which the EPS movement does not test. Treating accretion as proof of a good deal is the specific error the syllabus asks candidates to recognise.",
      },
    },
  ],
  examTraps: [
    { trap: "Valuing a share exchange at the acquirer's pre-bid share price.", fix: "Use the combined value per share over the enlarged share count." },
    { trap: "Recommending cash without naming its source.", fix: "Reserves, new debt, an equity issue or disposals — each has a different consequence." },
    { trap: "Presenting EPS accretion as evidence of value.", fix: "It is the bootstrap effect; say what would have to improve for the re-rating to be earned." },
    { trap: "Ignoring who carries synergy risk.", fix: "Cash leaves it all with the acquirer; shares transfer part of it to the target's shareholders." },
  ],
  keyTerms: [
    { term: "Share exchange", def: "Consideration paid in the acquirer's own shares, giving the target's shareholders a continuing stake and a share of the synergy." },
    { term: "Earn-out", def: "Part of the purchase price made contingent on the acquired business meeting defined performance measures after completion." },
    { term: "Bootstrap effect", def: "The mechanical rise in earnings per share when a company on a high price-earnings ratio acquires one on a lower ratio using shares." },
    { term: "Mixed consideration", def: "An offer combining cash, shares and other instruments, often with an election, balancing cash cost, dilution and risk-sharing." },
  ],
  summary: [
    "Cash fixes the target shareholders' return and keeps all synergy — and all synergy risk — with the acquirer.",
    "A share exchange makes them part-owners of the gain, so it shares both upside and disappointment.",
    "Value the shares handed over at the COMBINED value per share, not the pre-bid price.",
    "EPS accretion from a share exchange is arithmetic; the re-rating has to be earned.",
  ],
  knowledgeDiagnostic: [
    { q: "Why can two offers worth the same on announcement day deliver different amounts?", a: "A share exchange gives the target's shareholders shares in the combined business, whose value already includes the synergy, so they receive more than the pre-bid arithmetic suggests." },
    { q: "When should an acquirer prefer to pay in shares?", a: "When it is unsure of the synergy — the target's shareholders then bear part of the disappointment as well as part of the gain." },
    { q: "What does the bootstrap effect demonstrate?", a: "Only that shares rated highly were used to buy cheaper earnings; it says nothing about whether the combined business generates more cash." },
  ],
  furtherStudy: [
    "AFM-27 establishes the bargaining range that this chapter's offer sits inside.",
    "AFM-25 quantifies and challenges the synergy being divided here.",
    "AFM-16 covers the sources available to fund the cash element.",
    "AFM-19 covers the covenant and reported-performance analysis a debt-funded offer requires.",
  ],
}

export const AFM_TREE_AREA_C_PART2: StudyChapter[] = [AFM_TREE_27, AFM_TREE_28, AFM_TREE_29, AFM_TREE_30]
