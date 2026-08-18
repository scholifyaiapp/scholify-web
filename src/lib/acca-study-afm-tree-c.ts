import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AFM · Area C — acquisitions and mergers.
 *
 *   AFM-25  Why acquire, and where the value comes from  (C1a–e)
 *   AFM-26  Alternative routes to a listing              (C1f)
 *   AFM-27  Valuing a target: growth, models, premium    (C2a–c)
 *   AFM-28  Start-ups, loss-makers and valuation's limits (C2d)
 *   AFM-29  Regulation, the bid process and defences     (C3)
 *   AFM-30  Financing the offer and splitting the gain   (C4)
 *
 * C1(f) — SPACs, direct listings, Dutch auctions and reverse takeovers — is a
 * current-issues outcome that post-dates the 2020-21 provider texts, so AFM-26
 * is written from the syllabus rather than calibrated against them.
 *
 * The boundary with Area B: B4 owns the valuation MODELS and their assumptions,
 * while this area owns the BID — synergy, the control premium, how the gain is
 * divided between the two sets of shareholders, and what the financing choice
 * does to that division. AFM-27 therefore applies the B4 models rather than
 * re-teaching them.
 *
 * Written against the official ACCA AFM syllabus and study guide for September
 * 2026 to June 2027. Kaplan's AFM Study Text and Exam Kit (2020-21) informed
 * depth and chapter sizing only; all wording is original.
 */

const AFM_TREE_25: StudyChapter = {
  paper: "AFM",
  id: "AFM-25",
  number: 25,
  area: "C",
  syllabusRefs: ["C1(a)", "C1(b)", "C1(c)", "C1(d)", "C1(e)"],
  title: "Why acquire, and where the value comes from",
  minutes: 18,
  intro:
    "Most acquisitions fail to deliver what was promised. The syllabus says so explicitly, and asks you to explain why — so this chapter is as much about scepticism as about synergy.",
  outcomes: [
    "Argue for and against acquisition as a route to expansion, against the alternatives",
    "Evaluate the corporate and competitive logic of a specific proposal",
    "Advise on the criteria for choosing a target",
    "Classify synergy as revenue, cost or financial, and say which claims are credible",
    "Explain why acquisitions frequently fail to enhance shareholder value, overvaluation included",
  ],
  sections: [
    {
      id: "why-and-whether",
      heading: "Acquisition against the alternatives",
      blocks: [
        {
          kind: "text",
          md: "An acquisition is one way of obtaining a capability. It is rarely the only way, and the first move in any answer is to say what the alternatives were and why this route was chosen.",
        },
        {
          kind: "table",
          caption: "Four routes to the same capability",
          head: ["Route", "Speed", "Cost and risk", "Best when"],
          rows: [
            ["Organic growth", "Slow", "Lowest cost; risk is execution over time", "The market is growing and there is time to build"],
            ["Acquisition", "Immediate", "Highest cost — a control premium — and integration risk", "Speed matters, or the capability cannot be built quickly"],
            ["Joint venture or alliance", "Moderate", "Shared cost and risk; control is shared too", "Entering an unfamiliar market or technology with a partner who knows it"],
            ["Licensing or franchising", "Fast", "Low capital; limited control and limited upside", "The value is in intellectual property that can be lent"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The argument that carries most weight",
          md: "Acquisition buys **time**. Everything else about it is worse: you pay a premium for something you could otherwise build, you inherit liabilities and a culture, and you take on integration risk. So a proposal's defence has to rest on why speed is worth the premium here — a closing window, a scarce licence, a target a competitor would otherwise take.",
        },
        {
          kind: "text",
          md: "The syllabus also asks you to evaluate the **corporate and competitive nature** of a proposal. Corporate: does it fit the group's strategy, its capabilities and its financial capacity? Competitive: what does it do to market structure, and will a regulator permit it? A horizontal acquisition of a direct rival raises both questions at once; a vertical one raises supply-chain control; a conglomerate one raises the diversification objection from Area A.",
        },
      ],
      check: {
        q: "A group can enter a new geographic market by acquiring an established local firm or by building its own operation over three years. Which argument most strongly supports acquiring?",
        options: [
          "Acquisition is always cheaper than organic growth",
          "A competitor is expected to enter within twelve months, so the three years needed to build organically would forfeit first-mover position — the premium buys time that cannot otherwise be obtained",
          "Acquisition avoids all integration risk",
          "Organic growth requires regulatory approval, which acquisition does not",
        ],
        correct: 1,
        explain:
          "Speed is the genuine advantage, and it is only worth a premium when time is actually scarce — which the competitor's expected entry establishes. Options 0 and 2 state the opposite of the truth: acquisition costs more precisely because of the premium, and integration risk is the characteristic risk it introduces. Option 3 reverses the regulatory position, since it is acquisitions that attract competition review.",
      },
    },
    {
      id: "synergy",
      heading: "Synergy, classified and challenged",
      blocks: [
        {
          kind: "text",
          md: "The syllabus asks for synergy separated into three named classes. The classification matters because their credibility differs sharply, and a scenario that promises mostly the least credible kind is telling you something.",
        },
        {
          kind: "table",
          caption: "The three classes, and how much to believe",
          head: ["Class", "Source", "Credibility", "The challenge to make"],
          rows: [
            ["Cost synergy", "Duplicated functions removed, purchasing scale, closed sites", "Highest — largely within the acquirer's control", "Has the redundancy and closure cost been included, and the timing?"],
            ["Revenue synergy", "Cross-selling, wider distribution, combined product range", "Lowest — depends on customers behaving as hoped", "What proportion of customers actually buy the second product, and by when?"],
            ["Financial synergy", "Lower cost of capital, greater debt capacity, tax benefits", "Mixed — real in specific cases, illusory in general", "Is this available only through the merger, or could either party obtain it alone?"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The financial synergy that is not one",
          md: "'Combining reduces risk and therefore lowers the cost of capital' is the diversification argument from Area A, and shareholders can achieve it more cheaply in their own portfolios. Genuine financial synergy is narrower: usable tax losses, a real increase in debt capacity from more stable combined cash flows, or access to funding the target could not obtain alone. Name which one you mean.",
        },
        {
          kind: "text",
          md: "The examinable discipline is to **quantify and time** the synergy, and then to test what it needs to be for the deal to work. If a bid pays a premium of $60m and the synergy is claimed at $80m, the deal survives a 25% shortfall — and the useful sentence for a board is exactly that: 'the acquisition breaks even if 75% of the forecast synergy is delivered'.",
        },
        {
          kind: "activity",
          title: "Challenge a synergy forecast",
          prompt:
            "An acquirer forecasts $40m of annual synergy: $9m cost savings from head office consolidation, $25m of revenue synergy from cross-selling, and $6m from a lower cost of capital through diversification. What do you say?",
          answer:
            "That the composition is the problem, not the total. Only the $9m of head office savings is reliable, and even that needs the redundancy and property exit costs charged against it in the early years, so the net benefit arrives later than the run rate suggests. The $25m of revenue synergy is nearly two thirds of the case and is the least controllable component - it assumes the target's customers will buy the acquirer's products, which depends on their purchasing decisions rather than on anything management can implement. I would want the assumed take-up rate stated explicitly and benchmarked against what the acquirer has achieved in previous integrations, because a cross-sell assumption is usually the single figure the whole valuation rests on. The $6m from diversification I would strike out entirely: that is the portfolio argument, and shareholders can diversify for the cost of a trade, so it is not value the acquirer creates and should not be paid for. Restating the case at $9m certain plus $25m contingent, and asking what premium is justified by the certain part alone, is the analysis the board actually needs.",
        },
      ],
      check: {
        q: "Which type of synergy is generally the most reliable, and why?",
        options: [
          "Revenue synergy, because cross-selling opportunities are easy to identify",
          "Cost synergy, because eliminating duplicated functions is largely within the acquirer's own control, whereas revenue synergy depends on customers behaving as forecast",
          "Financial synergy, because a lower cost of capital is automatic on combination",
          "All three are equally reliable if quantified",
        ],
        correct: 1,
        explain:
          "Controllability is what makes cost synergy the most credible: management can close a site or remove a duplicated function by deciding to. Revenue synergy requires third parties to act as hoped, and the general form of financial synergy is the diversification argument shareholders can replicate themselves.",
      },
    },
    {
      id: "why-fail",
      heading: "Why acquisitions fail, and how to choose a target",
      blocks: [
        {
          kind: "text",
          md: "The syllabus names the failure of acquisitions to enhance shareholder value as an examinable topic, with **overvaluation** singled out. The causes cluster into four groups, and a good answer attributes the failure in the scenario to a specific one rather than listing all four.",
        },
        {
          kind: "table",
          caption: "Why the value does not arrive",
          head: ["Cause", "Mechanism", "The clue in the scenario"],
          rows: [
            ["Overpayment", "The premium exceeds the synergy, transferring value to the target's shareholders", "A competitive auction, a rising offer, a rumoured price anchoring the bid"],
            ["Over-optimistic synergy", "Forecasts that were never achievable, or arrive years late", "Revenue synergy dominating the case; no benchmark from previous deals"],
            ["Integration failure", "Systems, processes and cultures that do not combine; key people leave", "Different countries, different sectors, a founder-led target, retention unaddressed"],
            ["Weak strategic logic", "The deal served management's interests rather than shareholders'", "Size-linked remuneration, an unrelated business, a board resisting scrutiny"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The winner's curse, restated",
          md: "In a contested sale the winning bidder is by construction the one who valued the target most highly — which, if valuations are distributed around the truth, means the one most likely to have overestimated it. So winning an auction is weak evidence that you have overpaid. This is why walk-away discipline, set before the process begins, is the single most valuable control in a bid.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Criteria for choosing a target",
          items: [
            "**Strategic fit** — does it supply a capability the strategy actually needs, rather than one that is merely available?",
            "**Synergy potential** — and specifically whether it is cost synergy the acquirer can execute",
            "**Cultural and operational compatibility** — the most common cause of integration failure and the least often assessed",
            "**Financial position** — hidden liabilities, pension deficits, contingent obligations, tax exposures",
            "**Price and competition** — how many other bidders, and what the walk-away price is",
            "**Regulatory feasibility** — whether the deal can actually be approved, and at what cost in remedies",
            "**Retention** — who must stay for the value to exist, and what will keep them",
          ],
        },
        {
          kind: "text",
          md: "That last criterion deserves emphasis in a professional-skills answer. Where a target's value is in its people — a consultancy, a software team, a design house — the acquirer is buying assets that can resign. Recommending retention arrangements, earn-outs tied to the vendors staying, and non-compete terms is concrete commercial acumen, and it is exactly the kind of condition an examiner rewards attaching to an approval.",
        },
      ],
      check: {
        q: "An acquirer wins a competitive auction for a target after four rounds of bidding. What should the adviser flag?",
        options: [
          "That the price is validated by the competitive process",
          "The winner's curse: the winning bid is by construction the most optimistic valuation, so success in the auction is itself evidence of possible overpayment — and the walk-away price set beforehand should be checked against what was actually paid",
          "That competition law prevents auctions of this kind",
          "That the target's board has breached its duties by running an auction",
        ],
        correct: 1,
        explain:
          "A competitive process establishes what the most optimistic bidder would pay, not what the target is worth. Option 0 inverts the logic, which is precisely the reassurance boards give themselves after a contested deal. Auctions are a normal and generally proper way for a target board to discharge its duty to shareholders, so options 2 and 3 are unfounded.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating acquisition as the only route to the capability.", fix: "Compare with organic growth, joint venture and licensing, and say why speed justifies the premium here." },
    { trap: "Accepting a synergy total without decomposing it.", fix: "Split into cost, revenue and financial, and challenge the revenue and diversification components hardest." },
    { trap: "Claiming a lower cost of capital from diversification as synergy.", fix: "Shareholders can diversify themselves — name a specific tax or debt-capacity benefit instead." },
    { trap: "Listing all four causes of acquisition failure.", fix: "Attribute the risk in this scenario to the one the exhibits actually evidence." },
  ],
  keyTerms: [
    { term: "Revenue synergy", def: "Additional income expected from combining, typically through cross-selling or wider distribution — the least controllable class." },
    { term: "Financial synergy", def: "A funding or tax benefit available only through combination, such as usable tax losses or genuinely increased debt capacity." },
    { term: "Control premium", def: "The excess of the offer price over the target's standalone market value, paid to obtain control." },
    { term: "Walk-away price", def: "The maximum an acquirer will pay, set before a competitive process begins so that the discipline survives the bidding." },
  ],
  summary: [
    "Acquisition buys time; everything else about it is worse, so speed must justify the premium.",
    "Split synergy into cost, revenue and financial — credibility falls in that order.",
    "Diversification is not synergy: shareholders can do it more cheaply.",
    "Failure comes from overpayment, optimistic synergy, integration or weak logic — attribute it to one.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the genuine advantage of acquiring over building?", a: "Speed — the capability is obtained immediately, which is worth a premium only when time is actually scarce." },
    { q: "Why is 'lower cost of capital through diversification' a weak synergy claim?", a: "Shareholders can diversify in their own portfolios far more cheaply, so it is not value the acquirer creates." },
    { q: "What does winning a competitive auction suggest about the price paid?", a: "That the bid was the most optimistic valuation in the field — the winner's curse — so it is evidence of possible overpayment rather than validation." },
  ],
  furtherStudy: [
    "AFM-27 values the target and quantifies the premium this chapter's synergy has to justify.",
    "AFM-30 covers how the gain is divided between the two sets of shareholders.",
    "AFM-04 explains the biases — overconfidence, anchoring, herding — behind the failure patterns here.",
  ],
}

const AFM_TREE_26: StudyChapter = {
  paper: "AFM",
  id: "AFM-26",
  number: 26,
  area: "C",
  syllabusRefs: ["C1(f)"],
  title: "Alternative routes to a listing",
  minutes: 14,
  intro:
    "The initial public offering is no longer the only door. The syllabus names four alternatives, and each trades cost, speed, certainty and scrutiny differently.",
  outcomes: [
    "Describe how a special purpose acquisition company takes a business public",
    "Explain a direct listing and say which companies it suits",
    "Explain a Dutch auction and what it is intended to correct",
    "Explain a reverse takeover and the risks it carries",
    "Recommend a route for a specific company and defend it against the conventional offering",
  ],
  sections: [
    {
      id: "why-alternatives",
      heading: "What is wrong with a conventional offering",
      blocks: [
        {
          kind: "text",
          md: "A traditional initial public offering is slow, expensive and uncertain. Underwriters take a fee of several per cent, the process takes months, and the price is set by bookbuilding shortly before trading starts — which exposes the issuer to whatever the market is doing that week. Each alternative attacks one of those weaknesses.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Underpricing is a cost, not a gift",
          md: "Conventional offerings are routinely priced below where the shares then trade — a first-day rise looks like success and is in fact money the issuer did not raise. On a large issue that gap can exceed the underwriting fee several times over. It is the specific defect that direct listings and Dutch auctions exist to address.",
        },
        {
          kind: "table",
          caption: "The four alternatives at a glance",
          head: ["Route", "How it works", "Attacks", "Principal risk"],
          rows: [
            ["SPAC", "A listed cash shell raises money, then merges with a private target, which thereby becomes listed", "Speed and price certainty", "Dilution from sponsor shares; weaker diligence; redemptions leaving less cash than expected"],
            ["Direct listing", "Existing shares are admitted to trading with no new shares issued and no underwriter", "Fees and underpricing", "Raises no new capital; no price support; needs a company already well known"],
            ["Dutch auction", "Investors bid price and quantity; a single clearing price is set where the issue is filled", "Underpricing and allocation opacity", "Unfamiliar to some investors; a thin book can clear at a poor price"],
            ["Reverse takeover", "A private company acquires a listed shell and takes its listing", "Cost and time", "Inherits the shell's history and liabilities; reputational taint; often illiquid"],
          ],
        },
      ],
      check: {
        q: "A company's shares close 40% above the offer price on the first day of trading. How should this be interpreted?",
        options: [
          "As a clear success, since demand exceeded expectations",
          "As underpricing — the company sold its shares for less than the market would have paid, so the 40% represents capital it could have raised and did not",
          "As evidence that the underwriters performed well",
          "As a normal outcome that has no cost to the issuer",
        ],
        correct: 1,
        explain:
          "The rise accrues to the investors who were allocated shares, not to the company. Every share sold at the offer price rather than the market price is money left behind, which is why it is measured as a cost of the offering and why alternative mechanisms exist to reduce it.",
      },
    },
    {
      id: "the-routes",
      heading: "The four routes in detail",
      blocks: [
        {
          kind: "text",
          md: "**Special purpose acquisition companies.** A sponsor raises cash into a listed shell that has no operations, on a promise to find a target within a stated period. The target then merges into the shell and inherits the listing. For the target this is fast and the price is negotiated with one counterparty rather than discovered in a book — genuine advantages when markets are volatile.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "What to say about SPACs when they appear in a scenario",
          items: [
            "The sponsor typically takes a substantial founder stake for a nominal sum, which dilutes everyone else — quantify it rather than mentioning it",
            "Investors can usually redeem rather than participate in the merger, so the cash actually delivered can be far below the amount raised",
            "Diligence and disclosure have historically been lighter than in a conventional offering, which several regulators have moved to tighten",
            "If no target is found within the deadline the cash is returned, so the sponsor faces pressure to complete a deal — which is exactly the wrong incentive at the negotiating table",
          ],
        },
        {
          kind: "text",
          md: "**Direct listing.** Existing shares are simply admitted to trading. No new capital is raised, no underwriter is paid, and the opening price is set by supply and demand on the day. It suits a company that is already well known, does not need money, and wants to give existing shareholders and employees liquidity. It is unsuitable for a company that needs to raise capital or that no investor has heard of.",
        },
        {
          kind: "text",
          md: "**Dutch auction.** Investors submit the price and quantity they will take. Bids are ranked from the highest price downward until the issue is filled, and the price of the last bid needed becomes the single price everyone pays. The mechanism is designed to capture the demand curve rather than leave the issuer guessing, and to allocate on the basis of price rather than relationship.",
        },
        {
          kind: "text",
          md: "**Reverse takeover.** A private company acquires a company that already has a listing — often a shell with little or no business — and takes the listing with it. It is cheap and quick. The risks are that the shell may carry liabilities, litigation or a poor reputation that the private business inherits; that the resulting shareholder register may be fragmented and the shares illiquid; and that the route attracts more regulatory and investor scepticism than a conventional admission.",
        },
        {
          kind: "activity",
          title: "Recommend a route",
          prompt:
            "A profitable, widely recognised consumer brand wants its long-standing private shareholders and employees to be able to sell, but has no need for new capital. Which route, and why not the others?",
          answer:
            "A direct listing. It matches the two facts that decide the question: the company does not need capital, and it is already well known. Since no new shares are being issued there is nothing to underwrite, so the underwriting fee and the underpricing discount are both avoided, and the existing holders get the liquidity they want. A conventional offering would be the wrong instrument - paying several per cent to underwriters and leaving more on the table through underpricing, in order to raise money the company has said it does not want. A SPAC would be worse still: it exists partly to give an unknown company a route to public markets and a negotiated price, neither of which this company needs, and the sponsor's founder stake would dilute the very shareholders the exercise is meant to serve. A reverse takeover would import someone else's corporate history into a business whose brand is its principal asset, which is a poor trade at any price. The one caution I would give the board is that a direct listing has no underwriter providing price support and no lock-up in the usual form, so the opening days can be volatile - and with the existing holders all free to sell, the supply arriving on day one needs managing through a staged approach.",
        },
      ],
      check: {
        q: "Which route would suit a company that needs to raise substantial new capital and is not widely known to investors?",
        options: [
          "A direct listing, because it avoids underwriting fees",
          "A conventional underwritten offering or a SPAC merger — a direct listing raises no new capital and relies on investors already knowing the company",
          "A reverse takeover, because it is the cheapest route",
          "Any of them, since the choice makes no difference to capital raised",
        ],
        correct: 1,
        explain:
          "A direct listing admits existing shares to trading and issues none, so it cannot raise capital, and it depends on pre-existing investor familiarity to establish a sensible opening price. Both facts rule it out here. A reverse takeover is cheap but likewise brings no new money in, and adds inherited-liability risk.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating a first-day price rise as evidence of a successful offering.", fix: "It measures underpricing — capital the issuer did not raise." },
    { trap: "Recommending a direct listing for a company that needs money.", fix: "No new shares are issued, so no capital is raised." },
    { trap: "Describing a SPAC without its dilution and redemption features.", fix: "Quantify the sponsor's stake and note that redemptions can leave far less cash than was raised." },
    { trap: "Presenting a reverse takeover as simply a cheap listing.", fix: "The shell's liabilities, history and shareholder register come with it." },
  ],
  keyTerms: [
    { term: "Special purpose acquisition company", def: "A listed shell that raises cash on a promise to acquire an unidentified private business, which thereby obtains a listing." },
    { term: "Direct listing", def: "Admission of a company's existing shares to trading without issuing new shares or using an underwriter, so no capital is raised." },
    { term: "Dutch auction", def: "An issue mechanism in which investors bid price and quantity and a single clearing price is set at the level that fills the offer." },
    { term: "Underpricing", def: "The gap between an offer price and the price at which the shares subsequently trade, representing capital the issuer forwent." },
  ],
  summary: [
    "Conventional offerings are slow, expensive and underpriced; each alternative attacks one of those.",
    "SPACs offer speed and a negotiated price, at the cost of dilution, redemptions and weaker diligence.",
    "Direct listings suit a known company wanting liquidity, not capital.",
    "Dutch auctions target underpricing; reverse takeovers are cheap but import the shell's history.",
  ],
  knowledgeDiagnostic: [
    { q: "Why can a direct listing not be used to fund an expansion?", a: "It admits existing shares to trading without issuing new ones, so no money comes into the company." },
    { q: "What incentive problem does a SPAC's deadline create?", a: "If no target is found the cash is returned and the sponsor loses their economics, so there is pressure to complete a deal — the wrong incentive when negotiating price." },
    { q: "What does a Dutch auction set out to correct?", a: "Underpricing and opaque allocation, by discovering the demand curve directly and clearing at a single price determined by bids." },
  ],
  furtherStudy: [
    "AFM-16 covers the wider menu of finance a company chooses among before deciding to list at all.",
    "AFM-29 covers the regulatory framework a listed company enters.",
    "AFM-25 sets the acquisition context in which a reverse takeover sits.",
  ],
}

export const AFM_TREE_AREA_C_PART1: StudyChapter[] = [AFM_TREE_25, AFM_TREE_26]
