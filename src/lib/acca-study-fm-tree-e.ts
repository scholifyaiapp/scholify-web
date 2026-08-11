import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FM · Area E — business finance.
 *
 * Was one chapter (FM_D relabelled) for E1 to E5: every source of finance,
 * equity, debt, Islamic finance, the cost of each, WACC AND capital structure.
 *
 *   FM-14  Sources of finance and dividend policy   (E1)
 *   FM-15  Equity finance and rights issues         (E2)
 *   FM-16  Debt and Islamic finance                 (E3)
 *   FM-17  The cost of equity and the cost of debt  (E4)
 *   FM-18  WACC, gearing and capital structure      (E5)
 *
 * Written against the official ACCA FM syllabus and study guide — see
 * acca-study-fm-tree-a.ts for why no approved-provider text was used.
 */

const FM_TREE_14: StudyChapter = {
  paper: "FM",
  id: "FM-14",
  number: 14,
  area: "E",
  syllabusRefs: ["E1(a)", "E1(b)", "E1(c)", "E1(d)"],
  title: "Sources of finance and dividend policy",
  minutes: 18,
  intro:
    "Where the money comes from, how long you need it for, and how much of the returns you keep. Match the term of the finance to the life of the asset and most of this chapter follows.",
  outcomes: [
    "Identify short, medium and long-term sources of finance",
    "Explain the factors determining an appropriate source",
    "Discuss the finance problems facing small and medium enterprises",
    "Explain the practical and theoretical influences on dividend policy",
  ],
  sections: [
    {
      id: "sources",
      heading: "The sources, by term",
      blocks: [
        {
          kind: "table",
          caption: "Match the finance to the asset",
          head: ["Term", "Sources", "Typically funds"],
          rows: [
            ["Short (< 1 year)", "Overdraft, trade credit, short-term loan, invoice finance", "Fluctuating working capital"],
            ["Medium (1–7 years)", "Term loan, hire purchase, leasing", "Plant, vehicles, equipment"],
            ["Long (7+ years)", "Ordinary shares, bonds and loan notes, retained earnings", "Land, buildings, permanent working capital"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The matching principle",
          md: "Fund long-lived assets with long-term finance and short-lived needs with short-term finance. Break it and you get FM-08's aggressive policy: cheaper, and exposed to a lender withdrawing funding for an asset you cannot sell quickly.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "What decides the choice",
          items: [
            "**Cost** — including issue costs, not just the interest rate.",
            "**Duration** — how long the need lasts.",
            "**Gearing** — how much debt the company already carries and what its covenants allow.",
            "**Security available** — lenders want assets to lend against; a service business has few.",
            "**Control** — new equity dilutes existing shareholders; debt does not.",
            "**Cash-flow stability** — interest is compulsory, dividends are not.",
          ],
        },
      ],
      check: {
        q: "A company needs finance for a factory with a 30-year life. Which is most appropriate?",
        options: ["A three-year term loan", "An overdraft facility", "A long-term bond issue", "Extended trade credit"],
        correct: 2,
        explain:
          "Match the term of the finance to the life of the asset. A three-year loan on a 30-year asset forces repeated refinancing at unknown rates, and an overdraft is repayable on demand against an asset that cannot be liquidated quickly.",
      },
    },
    {
      id: "smes",
      heading: "Small and medium enterprises",
      blocks: [
        {
          kind: "definition",
          term: "The funding gap",
          md: "SMEs need more finance than the owners can provide, but too little — and with too little security or track record — to interest the capital markets. The gap is structural, not a failure of the individual business.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Why finance is harder to raise",
          items: [
            "**No track record** and often unaudited accounts, so lenders cannot assess risk.",
            "**Little security** — few tangible assets to pledge.",
            "**Cost of assessment** is fixed, so it is disproportionate on a small advance.",
            "**No access to public markets** — listing costs are prohibitive below a certain size.",
            "**Maturity gap** — owners want long-term money; lenders offer short-term facilities.",
          ],
        },
        {
          kind: "table",
          caption: "How the gap is bridged",
          head: ["Source", "What it offers", "What it costs"],
          rows: [
            ["Business angels", "Equity plus experience and contacts", "A stake, and often a say"],
            ["Venture capital", "Larger equity sums for high-growth firms", "A large stake, board seats, and an exit expectation"],
            ["Crowdfunding", "Small amounts from many investors", "Public exposure; regulatory conditions"],
            ["Government schemes", "Guarantees or subsidised lending", "Eligibility conditions and administration"],
            ["Supply-chain finance", "Early payment against approved invoices", "A discount to the buyer's credit rating"],
          ],
        },
      ],
    },
    {
      id: "dividends",
      heading: "Dividend policy",
      blocks: [
        {
          kind: "text",
          md: "A dividend paid is finance not retained, so this is a financing decision as much as a reward one — the point already made in FM-01.",
        },
        {
          kind: "table",
          caption: "The theories",
          head: ["View", "Claim"],
          rows: [
            ["Residual", "Pay out only what is left after every positive-NPV project is funded"],
            ["Dividend irrelevance (MM)", "In a perfect market, shareholders can manufacture their own dividend by selling shares, so policy does not affect value"],
            ["Signalling", "A change in dividend conveys management's private view of future prospects — which is why cuts are punished so hard"],
            ["Clientele effect", "Investors self-select for a payout pattern, so changing it drives away the shareholders you have"],
          ],
        },
        {
          kind: "list",
          style: "bullet",
          title: "Practical constraints",
          items: [
            "**Legal** — dividends can only be paid from distributable profits.",
            "**Liquidity** — a profit is not cash; the company must have the money.",
            "**Loan covenants** may restrict distributions.",
            "**Investment needs** — retained earnings are the cheapest finance available (no issue costs).",
            "**Stability** — most companies smooth dividends because a cut signals distress.",
          ],
        },
        {
          kind: "text",
          md: "**Alternatives to cash:** a **scrip dividend** issues extra shares instead of cash, conserving liquidity; a **share repurchase** returns cash while reducing the share count, which raises EPS and can support the price. Both change the shape of the return, not the underlying value creation.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "MM irrelevance holds only in a perfect market",
          md: "No tax, no transaction costs, no information asymmetry. Every real-world reason dividends matter — signalling, clienteles, the cost of selling shares — is a violation of one of those assumptions. Say which one the scenario breaks.",
        },
      ],
      check: {
        q: "A profitable company with strong cash flow announces a dividend cut to fund expansion. The share price falls sharply. Which explains this best?",
        options: [
          "Dividend irrelevance — the price move is random",
          "The signalling effect — investors read the cut as bad news about prospects",
          "The residual theory — the company is following it correctly",
          "The clientele effect alone",
        ],
        correct: 1,
        explain:
          "Signalling: shareholders cannot see management's information and read a cut as a warning, whatever the stated reason. Note the company IS applying residual theory correctly — the point is that being right does not protect you from the signal, which is why cuts are usually communicated very carefully.",
      },
    },
    {
      id: "choosing-a-source",
      heading: "Choosing a source, in a scenario",
      blocks: [
        {
          kind: "example",
          title: "Four companies, four different answers",
          scenario: "Each needs £3m. What should each raise, and why?",
          steps: [
            {
              label: "A · Listed retailer, gearing 15%, needs funds for a 25-year distribution centre",
              detail: "Long-term DEBT. Gearing is low so there is capacity; the asset is long-lived and matchable; debt is cheaper than equity and tax-deductible; and it avoids diluting existing shareholders. A bond issue or a long-term bank loan.",
            },
            {
              label: "B · Family company, gearing 65%, needs funds for seasonal working capital",
              detail: "SHORT-TERM facilities — an overdraft or invoice finance. The need is fluctuating, not permanent, and gearing is already high so more long-term debt may breach covenants and would be expensive. Equity is unattractive to a family unwilling to dilute control.",
            },
            {
              label: "C · Loss-making manufacturer, gearing 80%, needs funds to survive restructuring",
              detail: "EQUITY, most likely a rights issue. Debt is effectively unavailable at this gearing and would add compulsory interest to a company that cannot service it. Interest is contractual; dividends are not, which is exactly what a distressed company needs.",
            },
            {
              label: "D · Fast-growing unlisted software firm, no assets, needs funds to scale",
              detail: "VENTURE CAPITAL or business angels. No security means lenders will not advance; the growth profile suits equity investors seeking an exit. Expect to give up a large stake and board seats — the cost is control, not interest.",
            },
          ],
          result:
            "Note that C and D both point to equity for opposite reasons: C because it cannot afford interest, D because it has nothing to secure debt against. Naming the source is one mark; the reason is the rest, and the reason is always drawn from gearing, security, term and control.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Four things decide every answer",
          md: "**Gearing** (is there capacity?), **security** (is there anything to lend against?), **term** (how long is the need?), **control** (can they accept dilution?). Run those four over any scenario and the source chooses itself.",
        },
      ],
      check: {
        q: "A loss-making company with 80% gearing needs finance to fund a restructuring. Why is equity preferable to debt?",
        options: [
          "Debt is always more expensive than equity",
          "Interest is contractual and must be paid whatever happens, while dividends are discretionary",
          "Equity has no issue costs",
          "Lenders are not permitted to lend above 75% gearing",
        ],
        correct: 1,
        explain:
          "A company that cannot reliably generate cash cannot commit to contractual interest — default risk rises sharply. Dividends can be passed in a bad year. Debt is normally cheaper, not dearer; equity has substantial issue costs; and there is no legal gearing limit, only lender appetite.",
      },
    },
  ],
  examTraps: [
    { trap: "Funding a long-lived asset with short-term finance.", fix: "Match the term of the finance to the life of the asset." },
    { trap: "Treating retained earnings as free.", fix: "They carry the cost of equity — shareholders forgo a dividend and expect a return." },
    { trap: "Stating MM dividend irrelevance without its assumptions.", fix: "It requires a perfect market; name the assumption the scenario breaks." },
  ],
  keyTerms: [
    { term: "Matching principle", def: "Funding assets with finance of a similar term to the asset's life." },
    { term: "Funding gap", def: "The structural difficulty SMEs face in raising finance between owner funds and capital markets." },
    { term: "Scrip dividend", def: "A dividend paid in additional shares rather than cash." },
    { term: "Clientele effect", def: "Investors selecting companies whose dividend policy suits their own needs." },
  ],
  summary: [
    "Match the term of finance to the life of the asset.",
    "Choice depends on cost, duration, gearing, security, control and cash-flow stability.",
    "SMEs face a structural funding gap bridged by angels, venture capital and crowdfunding.",
    "Dividend theories: residual, MM irrelevance, signalling, clientele.",
    "Retained earnings are the cheapest source but are not free — they carry the cost of equity.",
  ],
  knowledgeDiagnostic: [
    { q: "State the matching principle.", a: "Fund long-lived assets with long-term finance and short-lived needs with short-term finance." },
    { q: "Give three reasons SMEs struggle to raise finance.", a: "No track record, little security, and disproportionate assessment costs. (Also no market access, and a maturity gap.)" },
    { q: "What does the signalling effect predict about a dividend cut?", a: "Investors read it as management's private information that prospects have worsened, so the share price falls even if the cash is being reinvested well." },
    { q: "Why are retained earnings not free finance?", a: "Shareholders forgo a dividend and require a return on the funds retained — they carry the cost of equity, just without issue costs." },
  ],
  furtherStudy: ["FM-17 puts a number on the cost of each of these sources."],
}

const FM_TREE_15: StudyChapter = {
  paper: "FM",
  id: "FM-15",
  number: 15,
  area: "E",
  syllabusRefs: ["E2(a)", "E2(b)", "E2(c)"],
  title: "Equity finance and rights issues",
  minutes: 17,
  intro:
    "Raising equity from existing shareholders is cheap, protects control — and produces the one calculation in this area that is guaranteed to appear: the theoretical ex-rights price.",
  outcomes: [
    "Describe the methods of raising equity finance",
    "Calculate the theoretical ex-rights price and the value of a right",
    "Evaluate the effect of a rights issue on shareholder wealth",
    "Explain the role and requirements of a stock market listing",
  ],
  sections: [
    {
      id: "methods",
      heading: "Ways to raise equity",
      blocks: [
        {
          kind: "table",
          caption: "Methods of issue",
          head: ["Method", "Who buys", "Notes"],
          rows: [
            ["Rights issue", "Existing shareholders, in proportion", "Cheapest; pre-emption rights preserved; no dilution of control"],
            ["Placing", "A small group of institutions", "Low cost, quick; dilutes existing holders"],
            ["Offer for sale", "The public, via an issuing house", "Expensive; used at flotation"],
            ["Public offer / IPO", "The public directly", "Highest cost and disclosure; creates a market in the shares"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why rights issues dominate",
          md: "**Pre-emption rights**: existing shareholders must be offered new shares first, in proportion to their holding. It protects them from dilution, and it makes the issue cheap — no underwriting of a public offer, no prospectus for new investors.",
        },
      ],
    },
    {
      id: "terp",
      heading: "The theoretical ex-rights price",
      blocks: [
        {
          kind: "formula",
          name: "TERP",
          expr: "TERP = ( N × cum-rights price + issue price ) / ( N + 1 )",
          note: "For a 1-for-N issue. N is the number of EXISTING shares needed to buy one new share.",
        },
        {
          kind: "example",
          title: "A 1-for-4 rights issue",
          scenario: "Shares trade at £4.00 cum-rights. A 1-for-4 rights issue is priced at £3.00.",
          steps: [
            { label: "Existing holding", detail: "4 shares × £4.00 = £16.00" },
            { label: "New share", detail: "1 share × £3.00 = £3.00" },
            { label: "Total", detail: "5 shares now worth £19.00" },
            { label: "TERP", detail: "£19.00 / 5 = £3.80" },
            { label: "Value of a right", detail: "TERP − issue price = £3.80 − £3.00 = £0.80 per NEW share" },
            { label: "Per existing share", detail: "£0.80 / 4 = £0.20" },
          ],
          result:
            "The price falls from £4.00 to £3.80 — but that is not a loss. A shareholder with 4 shares held £16.00 and now holds 5 shares worth £19.00, having paid £3.00. Wealth is unchanged, which is the whole point of the calculation.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Taking up, selling, or doing nothing",
          md: "**Take up the rights** — wealth unchanged. **Sell the rights** — wealth unchanged, as the cash received equals the fall in value. **Do nothing** — wealth FALLS, because the price drops and nothing compensates. That third case is what pre-emption rights exist to prevent, and it is a standard exam requirement.",
        },
        {
          kind: "activity",
          title: "Prove the third case",
          prompt:
            "Using the figures above, show what happens to a shareholder with 400 shares who ignores the rights issue entirely.",
          answer:
            "Before: 400 × £4.00 = £1,600. After: still 400 shares, now worth £3.80 = £1,520. A loss of £80 — exactly the £0.20 per existing share the rights were worth. Selling the rights for £80 would have left them whole; doing nothing gives that value to whoever bought them.",
        },
      ],
      check: {
        q: "Shares trade at £6.00. A 1-for-3 rights issue is priced at £4.20. What is the TERP?",
        options: ["£5.55", "£5.10", "£4.80", "£5.40"],
        correct: 0,
        explain:
          "(3 × £6.00 + £4.20) / 4 = £22.20 / 4 = £5.55. A common error is dividing by 3 instead of 4 — the denominator is the TOTAL shares held afterwards, N + 1.",
      },
    },
    {
      id: "listing",
      heading: "A stock market listing",
      blocks: [
        {
          kind: "table",
          caption: "Listing: both sides",
          head: ["Benefit", "Cost"],
          rows: [
            ["Access to a far larger pool of capital", "Substantial issue and ongoing compliance costs"],
            ["A market price, making shares realisable", "Continuous disclosure obligations"],
            ["Shares usable as acquisition currency", "Vulnerability to takeover"],
            ["Profile and credibility with lenders and customers", "Pressure for short-term results; loss of privacy"],
            ["Easier future fundraising", "Dilution of founders' control"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Answer for the company in the scenario",
          md: "A founder-controlled firm that values independence weighs \"vulnerability to takeover\" far more heavily than a firm needing capital for rapid expansion. Say which pressure dominates HERE rather than listing both columns.",
        },
      ],
      check: {
        q: "A family company holding 70% of its own shares is considering a listing to fund expansion. Which drawback should weigh heaviest in the answer?",
        options: [
          "Ongoing compliance costs",
          "Dilution of control and vulnerability to takeover",
          "The need to publish financial statements",
          "The cost of the prospectus",
        ],
        correct: 1,
        explain:
          "For a family that values independence, losing control is the decisive consideration — every other drawback is a cost they could absorb. The skill being tested is weighing the drawbacks for THIS company rather than listing all of them equally.",
      },
    },
  ],
  examTraps: [
    { trap: "Dividing by N instead of N + 1 in the TERP.", fix: "The denominator is total shares held after the issue." },
    { trap: "Calling the price fall from cum-rights to TERP a loss to shareholders.", fix: "Wealth is unchanged if they take up or sell the rights; it falls only if they do nothing." },
    { trap: "Confusing the value of a right per new share with per existing share.", fix: "Divide by N to convert to a per-existing-share value." },
  ],
  keyTerms: [
    { term: "Rights issue", def: "An offer of new shares to existing shareholders in proportion to their holdings." },
    { term: "Pre-emption rights", def: "The right of existing shareholders to be offered new shares before outsiders." },
    { term: "TERP", def: "The theoretical price per share after a rights issue." },
    { term: "Placing", def: "Selling a new issue to a small number of institutional investors." },
  ],
  summary: [
    "Rights issues are cheapest and preserve control through pre-emption rights.",
    "TERP = (N × cum-rights price + issue price) / (N + 1).",
    "Value of a right = TERP − issue price, per new share; divide by N for per existing share.",
    "Taking up or selling leaves wealth unchanged; doing nothing loses value.",
    "A listing buys capital and liquidity at the price of cost, disclosure and takeover exposure.",
  ],
  knowledgeDiagnostic: [
    { q: "State the TERP formula for a 1-for-N issue.", a: "(N × cum-rights price + issue price) / (N + 1)." },
    { q: "What are pre-emption rights?", a: "The right of existing shareholders to be offered new shares first, in proportion to their holding, protecting them from dilution." },
    { q: "What happens to a shareholder who neither takes up nor sells their rights?", a: "Their wealth falls by the value of the rights, because the share price drops to TERP and nothing compensates them." },
    { q: "Name two costs of obtaining a stock market listing.", a: "High issue and ongoing compliance costs, and vulnerability to takeover. (Also disclosure obligations and short-term performance pressure.)" },
  ],
  furtherStudy: ["FM-17 uses the resulting share price to compute the cost of equity."],
}

const FM_TREE_16: StudyChapter = {
  paper: "FM",
  id: "FM-16",
  number: 16,
  area: "E",
  syllabusRefs: ["E3(a)", "E3(b)", "E3(c)"],
  title: "Debt and Islamic finance",
  minutes: 17,
  intro:
    "Debt is cheaper than equity and it is compulsory. Islamic finance reaches the same commercial ends without interest — and the examiner wants the mechanism, not the label.",
  outcomes: [
    "Describe the main forms of debt finance and their features",
    "Distinguish operating and finance leases",
    "Explain the principles underlying Islamic finance",
    "Identify the main Islamic finance instruments and their conventional equivalents",
  ],
  sections: [
    {
      id: "debt-forms",
      heading: "Forms of debt",
      blocks: [
        {
          kind: "table",
          caption: "The main instruments",
          head: ["Instrument", "Feature"],
          rows: [
            ["Bank loan", "Negotiated, often secured, fixed or floating rate, covenants attached"],
            ["Overdraft", "Flexible and repayable ON DEMAND — short-term only"],
            ["Loan notes / bonds", "Tradeable debt, usually with a fixed coupon and a redemption date"],
            ["Irredeemable debt", "Never repaid; interest continues indefinitely"],
            ["Convertible debt", "Converts to shares at a set rate; carries a lower coupon in exchange"],
            ["Debt with warrants", "The right to buy shares later, attached to the loan note"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why debt is cheaper than equity — both reasons",
          md: "First, it is **less risky for the investor** — interest is contractual and ranks ahead of dividends, with security behind it. Second, **interest is tax deductible** and dividends are not. Only the first would be true without the tax system, so name both.",
        },
        {
          kind: "text",
          md: "**Leasing** is finance in substance. An **operating lease** is a rental — short relative to the asset's life, with the lessor bearing maintenance and obsolescence. A **finance lease** transfers substantially all the risks and rewards of ownership to the lessee and is, commercially, a purchase funded by borrowing.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Convertibles are not cheap debt",
          md: "The lower coupon is paid for with the conversion option — potential dilution of existing shareholders. An answer claiming convertibles \"reduce the cost of finance\" without mentioning that has answered half the question.",
        },
      ],
      check: {
        q: "Which is the strongest reason debt is cheaper than equity even before considering tax?",
        options: [
          "Debt is always secured",
          "Interest payments are contractual and rank ahead of dividends, so investors bear less risk",
          "Debt has no issue costs",
          "Debt holders have no voting rights",
        ],
        correct: 1,
        explain:
          "Lower risk to the investor means a lower required return. Not all debt is secured, debt does have issue costs, and the absence of votes is a consequence of the contract rather than the reason for the lower cost. Tax deductibility is the second reason, and it is separate.",
      },
    },
    {
      id: "islamic",
      heading: "Islamic finance",
      blocks: [
        {
          kind: "definition",
          term: "Riba",
          md: "Interest — forbidden under Sharia law. Islamic finance therefore structures returns as a share in **profit** or as a margin on a **real asset transaction**, rather than as a charge for the use of money.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The underlying principles",
          items: [
            "**No riba** — money has no time value in itself; return must come from real economic activity.",
            "**Risk sharing** — the financier participates in the outcome rather than being guaranteed a return.",
            "**Asset backing** — every transaction is linked to a tangible asset or service.",
            "**No gharar** (excessive uncertainty) and no investment in prohibited activities.",
          ],
        },
        {
          kind: "table",
          caption: "Instruments and their conventional cousins",
          head: ["Instrument", "How it works", "Closest conventional form"],
          rows: [
            ["Murabaha", "The bank buys the asset and resells it to the client at cost plus an agreed mark-up, payable later", "Trade credit / instalment credit"],
            ["Ijara", "The bank buys the asset and leases it to the client, retaining ownership risk", "Leasing"],
            ["Mudaraba", "One party supplies capital, the other expertise; profits shared by agreement, losses borne by the capital provider", "Equity / venture capital"],
            ["Musharaka", "Both parties contribute capital and share profits and losses in proportion", "Joint venture partnership"],
            ["Sukuk", "Certificates giving ownership of an underlying asset and a share of the income it generates", "Bonds"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Sukuk are not bonds",
          md: "A bondholder lends money and is owed interest. A sukuk holder **owns a share of an asset** and receives the income that asset generates — so if the asset underperforms, the return falls. Describing sukuk as \"Islamic bonds\" and stopping there misses the mark being tested.",
        },
        {
          kind: "illustration",
          title: "Mudaraba and musharaka, side by side",
          md: "A bank funds a restaurant.\n\nUnder **mudaraba** the bank provides all the capital and the entrepreneur provides the skill. Profits are split as agreed; if the venture loses money the BANK bears the financial loss, and the entrepreneur loses their time and effort.\n\nUnder **musharaka** both put in capital and both share profits and losses in proportion. It is closer to a partnership, and it is the structure to name when the question stresses shared control.",
        },
      ],
      check: {
        q: "A bank purchases machinery and sells it to a client for cost plus an agreed mark-up, payable in twelve monthly instalments. Which instrument is this?",
        options: ["Ijara", "Musharaka", "Murabaha", "Sukuk"],
        correct: 2,
        explain:
          "Murabaha — a cost-plus sale where ownership passes to the client and the profit is a trading margin, not interest. Ijara would keep ownership with the bank and charge for use; musharaka would be a shared-capital partnership.",
      },
    },
    {
      id: "matching-the-instrument",
      heading: "Matching the instrument to the need",
      blocks: [
        {
          kind: "text",
          md: "Islamic finance questions are almost always \"which instrument would be appropriate, and why\". The answer follows from two things: what the company needs the money **for**, and whether it is willing to share **profit and control**.",
        },
        {
          kind: "example",
          title: "Four needs, four instruments",
          scenario: "A company operating under Sharia principles needs finance in four different situations.",
          steps: [
            { label: "It needs a specific machine and wants to own it", detail: "MURABAHA. The bank buys the machine and resells it at cost plus an agreed mark-up, payable over time. Ownership passes to the company; the bank's return is a trading margin, not interest." },
            { label: "It needs use of a machine but not ownership", detail: "IJARA. The bank buys and leases it, retaining ownership and the associated risks. Conventional equivalent: a lease." },
            { label: "It has expertise but no capital for a new venture", detail: "MUDARABA. The bank provides all the capital, the company the management. Profits are shared as agreed; financial losses fall on the BANK, while the company loses its effort." },
            { label: "It wants a partner sharing both capital and control", detail: "MUSHARAKA. Both contribute capital and share profits and losses in proportion — closest to a joint-venture partnership." },
            { label: "And if it needs to raise from many investors at once", detail: "SUKUK. Certificates giving investors ownership of an underlying asset and a share of its income — NOT a debt owed to them, which is why the return falls if the asset underperforms." },
          ],
          result:
            "Two questions decide it: is this about an ASSET (murabaha, ijara, sukuk) or a VENTURE (mudaraba, musharaka)? And if a venture, who is putting up the capital? Answer those and the instrument follows.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Say what replaces interest",
          md: "Every answer should name the mechanism that produces the financier's return without riba — a **trading margin** (murabaha), a **rental** (ijara), a **share of profit** (mudaraba, musharaka), or a **share of asset income** (sukuk). Naming the instrument alone is half the mark.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Giving only tax deductibility as the reason debt is cheap.", fix: "Lower investor risk is the primary reason; tax relief is the second." },
    { trap: "Calling sukuk Islamic bonds without qualification.", fix: "Sukuk convey ownership of an asset and a share of its income, not a debt owed." },
    { trap: "Confusing mudaraba with musharaka.", fix: "Mudaraba: one supplies capital, one supplies expertise. Musharaka: both supply capital." },
  ],
  keyTerms: [
    { term: "Riba", def: "Interest — prohibited under Sharia law." },
    { term: "Murabaha", def: "A cost-plus sale where payment is deferred; the return is a trading margin." },
    { term: "Ijara", def: "A lease in which the financier retains ownership and the associated risks." },
    { term: "Sukuk", def: "Certificates of ownership in an underlying asset, giving a share of the income it produces." },
  ],
  summary: [
    "Debt ranges from on-demand overdrafts to irredeemable and convertible loan notes.",
    "Debt is cheaper because investors bear less risk, and because interest is tax deductible.",
    "A finance lease transfers the risks and rewards of ownership; an operating lease does not.",
    "Islamic finance forbids riba and requires risk sharing and asset backing.",
    "Murabaha, ijara, mudaraba, musharaka and sukuk each mirror a conventional instrument without interest.",
  ],
  knowledgeDiagnostic: [
    { q: "Give the two reasons debt is cheaper than equity.", a: "Lower risk to the investor, since interest is contractual and ranks ahead of dividends; and interest is tax deductible while dividends are not." },
    { q: "What distinguishes a finance lease from an operating lease?", a: "A finance lease transfers substantially all the risks and rewards of ownership to the lessee." },
    { q: "What is riba and how does Islamic finance work around it?", a: "Interest, which is prohibited. Returns are structured as a share of profit or a margin on a real asset transaction instead." },
    { q: "Distinguish mudaraba from musharaka.", a: "In mudaraba one party provides capital and the other expertise, with losses borne by the capital provider. In musharaka both contribute capital and share profits and losses proportionately." },
  ],
  furtherStudy: ["FM-17 computes the cost of each debt instrument, redeemable and irredeemable."],
}

const FM_TREE_17: StudyChapter = {
  paper: "FM",
  id: "FM-17",
  number: 17,
  area: "E",
  syllabusRefs: ["E4(a)", "E4(b)", "E4(c)"],
  title: "The cost of equity and the cost of debt",
  minutes: 19,
  intro:
    "Every discount rate in this paper is built here. Two ways to price equity, two to price debt, and one recurring trap in each.",
  outcomes: [
    "Calculate the cost of equity using the dividend growth model and CAPM",
    "Estimate the dividend growth rate from history and from Gordon's growth model",
    "Calculate the cost of irredeemable and redeemable debt, and of preference shares",
    "Explain the assumptions and limitations of each model",
  ],
  sections: [
    {
      id: "cost-of-equity",
      heading: "The cost of equity",
      blocks: [
        {
          kind: "formula",
          name: "Dividend growth model",
          expr: "P₀ = D₀(1 + g) / (Ke − g)      →      Ke = D₀(1 + g)/P₀ + g",
          note: "P₀ = EX-DIV market price · D₀ = dividend just paid · g = constant growth rate",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The price must be ex-div",
          md: "If you are given a **cum-div** price, subtract the dividend about to be paid before using it. Using the cum-div price understates Ke, and it is the single most common error in this calculation.",
        },
        {
          kind: "formula",
          name: "Estimating growth",
          expr: "Historic:  g = (D₀ / Dₙ)^(1/n) − 1\nGordon's growth model:  g = r × b",
          note: "n = number of years of GROWTH (one fewer than the number of dividends) · r = return on reinvested funds · b = proportion retained",
        },
        {
          kind: "example",
          title: "Cost of equity, both routes",
          scenario:
            "Dividends: four years ago £0.20, just paid £0.28. Share price £3.50 cum-div. Alternatively: risk-free rate 4%, equity risk premium 6%, equity beta 1.3.",
          steps: [
            { label: "Ex-div price", detail: "£3.50 − £0.28 = £3.22" },
            { label: "Historic growth", detail: "(0.28/0.20)^(1/4) − 1 = 1.4^0.25 − 1 = 8.8%" },
            { label: "DVM", detail: "Ke = 0.28(1.088)/3.22 + 0.088 = 0.0946 + 0.088 = 18.3%" },
            { label: "CAPM", detail: "Ke = 4% + 1.3 × 6% = 11.8%" },
          ],
          result:
            "18.3% against 11.8%. They differ because they use different inputs — the DVM extrapolates this company's dividend history, CAPM prices only systematic risk. Neither is wrong; state which you used and why the scenario supports it.",
        },
        {
          kind: "formula",
          name: "CAPM",
          expr: "Ke = Rf + β(Rm − Rf)",
          note: "(Rm − Rf) is the equity risk PREMIUM. If the question gives the market RETURN Rm, subtract Rf yourself.",
        },
        {
          kind: "table",
          caption: "Which model, and what it assumes",
          head: ["", "Dividend growth model", "CAPM"],
          rows: [
            ["Needs", "Dividend history and a market price", "Beta, risk-free rate, market premium"],
            ["Assumes", "Constant growth for ever", "Only systematic risk is rewarded; investors hold diversified portfolios"],
            ["Fails when", "Dividends are zero, erratic, or growth exceeds Ke", "Beta is unstable or the company is unlisted"],
          ],
        },
      ],
      check: {
        q: "Risk-free rate 5%, market RETURN 12%, beta 1.4. What is the cost of equity?",
        options: ["21.8%", "14.8%", "16.8%", "12.0%"],
        correct: 1,
        explain:
          "The premium is 12% − 5% = 7%. Ke = 5% + 1.4 × 7% = 14.8%. The 21.8% distractor uses the market RETURN as the premium (5 + 1.4 × 12) — exactly the error the wording is designed to catch.",
      },
    },
    {
      id: "cost-of-debt",
      heading: "The cost of debt and preference shares",
      blocks: [
        {
          kind: "formula",
          name: "Irredeemable debt and preference shares",
          expr: "Irredeemable debt:  Kd = i(1 − T) / P₀\nPreference shares:  Kp = D / P₀",
          note: "i = annual interest per £100 nominal · T = corporation tax rate · P₀ = ex-interest market price. Preference dividends are NOT tax deductible, so there is no (1 − T).",
        },
        {
          kind: "text",
          md: "**Redeemable debt** has no formula — its cost is the **IRR of the after-tax cash flows** from the company's point of view: the market price in now, then interest net of tax each year, then the redemption amount.",
        },
        {
          kind: "example",
          title: "Cost of redeemable debt",
          scenario: "8% loan notes redeemable at par in four years, currently £95 ex-interest. Tax is 30%.",
          steps: [
            { label: "T0", detail: "+£95 received by the company" },
            { label: "Years 1–4 interest after tax", detail: "£8 × (1 − 0.30) = −£5.60 a year" },
            { label: "Year 4 redemption", detail: "−£100" },
            { label: "Method", detail: "Find the IRR of (+95, −5.60, −5.60, −5.60, −105.60) by interpolating between two rates" },
          ],
          result:
            "Roughly 7%. The company receives less than par and repays par, so the cost exceeds the after-tax coupon rate of 5.6%. If it had been issued ABOVE par the reverse would hold — a useful sanity check on your answer.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Whose tax rate, and whose view",
          md: "The cost of debt to the COMPANY is after tax, because the company gets the relief. The return to the INVESTOR is before tax. A question asking for the investor's required return wants the gross figure — read which is being asked.",
        },
      ],
      check: {
        q: "Irredeemable 6% loan notes trade at £90 ex-interest. Tax is 25%. What is the cost of debt to the company?",
        options: ["6.7%", "5.0%", "4.5%", "6.0%"],
        correct: 1,
        explain:
          "Kd = 6(1 − 0.25)/90 = 4.5/90 = 5.0%. The 6.7% distractor omits the tax relief; 4.5% divides by 100 instead of the market price of 90.",
      },
    },
    {
      id: "choosing-the-model",
      heading: "Which model, and what to do when they disagree",
      blocks: [
        {
          kind: "text",
          md: "A question that gives you dividend history AND a beta is not being generous — it is asking which model the scenario supports, and why the two answers differ.",
        },
        {
          kind: "table",
          caption: "When each model breaks",
          head: ["Situation", "Which to use", "Why"],
          rows: [
            ["Stable, growing dividends; listed", "Either — and reconcile them", "Both have the inputs they need"],
            ["No dividend paid, or erratic", "CAPM", "The dividend model has nothing to work with"],
            ["Growth rate exceeds the cost of equity", "CAPM", "The DVM gives a negative or absurd price — the formula breaks down"],
            ["Unquoted company", "DVM, or a proxy beta regeared", "No market price and no observable beta of its own"],
            ["Company about to change gearing", "CAPM with a regeared beta", "The DVM's historic dividends reflect the OLD risk"],
          ],
        },
        {
          kind: "example",
          title: "Two models, 6.5 points apart",
          scenario:
            "Kirkby Co: dividends have grown from £0.20 to £0.28 over four years, dividend just paid £0.28, ex-div price £3.22. Risk-free rate 4%, equity risk premium 6%, equity beta 1.3.",
          steps: [
            { label: "DVM", detail: "g = (0.28/0.20)^(1/4) − 1 = 8.8%. Ke = 0.28(1.088)/3.22 + 0.088 = 18.3%" },
            { label: "CAPM", detail: "Ke = 4% + 1.3 × 6% = 11.8%" },
            { label: "Why they differ", detail: "The DVM extrapolates THIS company's own dividend history and assumes 8.8% growth continues for ever. CAPM prices only systematic risk and says nothing about company-specific growth expectations." },
            { label: "Which to trust", detail: "If 8.8% growth is genuinely sustainable, the DVM figure reflects information CAPM misses. If the growth came from a few unusually good years, 18.3% is an extrapolation of luck and CAPM is the safer input to a WACC." },
            { label: "What to write", detail: "Both figures, the reason for the gap, and a stated choice with its justification — not one number presented as the answer." },
          ],
          result:
            "A 6.5-point difference in Ke moves a WACC by several points and can flip an NPV. That is why the examiner asks for the assumptions: the number matters less than knowing what it depends on.",
        },
      ],
      check: {
        q: "A company pays no dividend and has never paid one. Which model can be used for its cost of equity?",
        options: [
          "The dividend growth model, using an assumed dividend",
          "CAPM",
          "Neither — the cost of equity cannot be estimated",
          "The dividend growth model, using industry average dividends",
        ],
        correct: 1,
        explain:
          "With no dividend history the DVM has no inputs. CAPM needs only the risk-free rate, the market premium and a beta — none of which depends on the company paying a dividend. Inventing a dividend to force the DVM produces a number with no evidential basis.",
      },
    },
  ],
  examTraps: [
    { trap: "Using a cum-div share price in the dividend growth model.", fix: "Subtract the imminent dividend to get the ex-div price first." },
    { trap: "Using the market return as the risk premium in CAPM.", fix: "The premium is Rm − Rf. Check which the question gives." },
    { trap: "Applying (1 − T) to preference dividends.", fix: "Preference dividends are not tax deductible — no tax adjustment." },
    { trap: "Using nominal value instead of market price as the denominator.", fix: "The cost of capital is always computed on MARKET value." },
  ],
  keyTerms: [
    { term: "Dividend growth model", def: "A valuation model deriving the cost of equity from the dividend, its growth rate and the ex-div price." },
    { term: "Equity risk premium", def: "The excess return of the market over the risk-free rate, Rm − Rf." },
    { term: "Irredeemable debt", def: "Debt with no repayment date; interest continues indefinitely." },
    { term: "Gordon's growth model", def: "Estimating growth as g = r × b, the return on reinvestment times the retention rate." },
  ],
  summary: [
    "DVM: Ke = D₀(1 + g)/P₀ + g, with an EX-DIV price.",
    "CAPM: Ke = Rf + β(Rm − Rf), and (Rm − Rf) is the premium.",
    "Growth comes from dividend history or from g = r × b.",
    "Irredeemable debt: Kd = i(1 − T)/P₀. Preference shares get no tax relief.",
    "Redeemable debt is the IRR of the after-tax cash flows.",
  ],
  knowledgeDiagnostic: [
    { q: "Write the dividend growth model rearranged for Ke.", a: "Ke = D₀(1 + g)/P₀ + g, where P₀ is the ex-div market price." },
    { q: "How is the cost of redeemable debt found?", a: "As the IRR of the after-tax cash flows: market price in, after-tax interest out each year, redemption amount out at the end." },
    { q: "Why is there no (1 − T) in the cost of preference shares?", a: "Preference dividends are an appropriation of profit, not a tax-deductible expense." },
    { q: "State Gordon's growth model.", a: "g = r × b — the return on reinvested funds multiplied by the proportion of earnings retained." },
  ],
  furtherStudy: ["FM-18 combines these into the WACC and asks when it is a valid discount rate."],
}

const FM_TREE_18: StudyChapter = {
  paper: "FM",
  id: "FM-18",
  number: 18,
  area: "E",
  syllabusRefs: ["E5(a)", "E5(b)", "E5(c)", "E5(d)"],
  title: "WACC, gearing and capital structure",
  minutes: 18,
  intro:
    "Combine the costs into one rate, then ask the harder question: does changing the mix of debt and equity change what the company is worth?",
  outcomes: [
    "Calculate the weighted average cost of capital using market values",
    "Distinguish business risk from financial risk",
    "Explain the traditional and Modigliani–Miller views of capital structure",
    "Explain when the WACC is and is not a valid discount rate",
  ],
  sections: [
    {
      id: "wacc",
      heading: "Calculating the WACC",
      blocks: [
        {
          kind: "formula",
          name: "WACC",
          expr: "WACC = [ Ke × E/(D+E) ] + [ Kd(1 − T) × D/(D+E) ]",
          note: "E and D are MARKET values, not book values. If Kd is already after tax, do not apply (1 − T) twice.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Market values, always",
          md: "Book values reflect what was raised historically, not what investors require now. Using them is the most frequently penalised error in a WACC question — and equity market value is **share price × number of shares**, not the balance-sheet figure.",
        },
        {
          kind: "example",
          title: "A full WACC",
          scenario:
            "10 million shares at £3.60; cost of equity 14%. £8m nominal of loan notes trading at £92 per £100; after-tax cost of debt 6%. ",
          steps: [
            { label: "Market value of equity", detail: "10m × £3.60 = £36m" },
            { label: "Market value of debt", detail: "£8m × 92/100 = £7.36m" },
            { label: "Total", detail: "£36m + £7.36m = £43.36m" },
            { label: "Equity weight", detail: "36 / 43.36 = 83.0%" },
            { label: "Debt weight", detail: "7.36 / 43.36 = 17.0%" },
            { label: "WACC", detail: "(14% × 0.830) + (6% × 0.170) = 11.62 + 1.02 = 12.6%" },
          ],
          result:
            "12.6%. Note how heavily equity dominates — at these weights, an error in Ke moves the WACC far more than the same error in Kd, which is worth knowing when time is short.",
        },
      ],
      check: {
        q: "A company has 5m shares at £2.00, and £4m nominal of debt trading at £105. What weight does equity carry?",
        options: ["71.4%", "70.4%", "55.6%", "29.6%"],
        correct: 1,
        explain:
          "Equity £10m; debt £4m × 1.05 = £4.2m; total £14.2m. Equity weight = 10/14.2 = 70.4%. The 71.4% distractor uses debt at nominal value (£4m) instead of market value.",
      },
    },
    {
      id: "risk",
      heading: "Business risk and financial risk",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Two risks, two sources",
            data: {
              leftTitle: "Business risk",
              rightTitle: "Financial risk",
              rows: [
                { aspect: "Arises from", left: "The nature of operations and cost structure", right: "The use of debt in the capital structure" },
                { aspect: "Increases with", left: "Operating gearing — fixed costs as a share of total", right: "Financial gearing — debt as a share of capital" },
                { aspect: "Affects", left: "Variability of operating profit", right: "Variability of earnings available to shareholders" },
                { aspect: "Changed by", left: "Changing what the business does", right: "Changing how it is funded" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Gearing is measured either as **debt / equity** or **debt / (debt + equity)**. Both are accepted; an unlabelled number is not. **Interest cover** (PBIT / finance cost) is the complementary measure — it asks whether the interest can actually be paid, which gearing alone does not.",
        },
      ],
    },
    {
      id: "capital-structure",
      heading: "Does the mix change value?",
      blocks: [
        {
          kind: "table",
          caption: "Three answers to one question",
          head: ["View", "Claim", "Implication"],
          rows: [
            ["Traditional", "There is an optimal gearing level where WACC is minimised", "Value is maximised at that point; managers should find it"],
            ["MM without tax", "WACC is constant — cheaper debt is exactly offset by a rising cost of equity", "Capital structure is irrelevant to value"],
            ["MM with tax", "WACC falls as gearing rises, because of the interest tax shield", "Value rises with gearing; theoretically, gear up to 100%"],
          ],
        },
        {
          kind: "formula",
          name: "MM with tax",
          expr: "Vg = Vu + (D × T)",
          note: "Vg = value geared · Vu = value ungeared · D × T = the present value of the tax shield.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why nobody gears to 100%",
          md: "MM with tax gives an absurd conclusion because its assumptions exclude the things that stop it: **bankruptcy and financial distress costs**, **agency costs** (lenders impose restrictive covenants), **tax exhaustion** (no taxable profit left to shield), and the loss of **debt capacity** for future opportunities. Naming those is how the discussion mark is earned.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "When the WACC is NOT a valid discount rate",
          items: [
            "The project's **business risk differs** from the company's existing operations — use a risk-adjusted rate built from a proxy company's asset beta instead.",
            "The project **materially changes the capital structure** — the weights themselves would move.",
            "The project is **large relative to the company**, so it changes the company's overall risk.",
          ],
        },
      ],
      check: {
        q: "A confectionery company is appraising a move into pharmaceuticals, funded so gearing is unchanged. Should it discount at its existing WACC?",
        options: [
          "Yes — the gearing is unchanged, so the WACC still applies",
          "No — the business risk differs, so a rate built from a pharmaceutical proxy's asset beta is needed",
          "Yes — WACC always applies to a company's own projects",
          "No — it should use the cost of equity instead",
        ],
        correct: 1,
        explain:
          "Unchanged gearing keeps the FINANCIAL risk constant but the BUSINESS risk is completely different. Ungear a pharmaceutical company's beta, regear it to this company's structure, and derive a project-specific rate.",
      },
    },
  ],
  examTraps: [
    { trap: "Using book values as WACC weights.", fix: "Market values, always: shares at share price, debt at its market price." },
    { trap: "Applying (1 − T) to a cost of debt that is already after tax.", fix: "Check what the question gave you before adjusting." },
    { trap: "Concluding from MM with tax that a company should be entirely debt financed.", fix: "Name the excluded costs: bankruptcy, agency, tax exhaustion, lost debt capacity." },
    { trap: "Using the WACC for a project in a different industry.", fix: "Different business risk needs a project-specific rate via a proxy asset beta." },
  ],
  keyTerms: [
    { term: "WACC", def: "The average cost of a company's finance, weighted by the market value of each source." },
    { term: "Business risk", def: "Variability in operating profit arising from the nature of operations and fixed costs." },
    { term: "Financial risk", def: "Additional variability in shareholder earnings arising from the use of debt." },
    { term: "Tax shield", def: "The value of the tax relief on debt interest, D × T under MM with tax." },
  ],
  summary: [
    "WACC weights the cost of each source by its MARKET value.",
    "Business risk comes from operations; financial risk comes from gearing.",
    "Traditional view: an optimal gearing minimises WACC. MM without tax: irrelevant. MM with tax: gear up.",
    "MM's conclusion breaks on bankruptcy costs, agency costs and tax exhaustion.",
    "WACC is only a valid discount rate where business risk and gearing are unchanged.",
  ],
  knowledgeDiagnostic: [
    { q: "Which values are used to weight the WACC, and why?", a: "Market values, because they reflect what investors currently require rather than what was historically raised." },
    { q: "Distinguish business risk from financial risk.", a: "Business risk arises from operations and operating gearing; financial risk arises from the use of debt." },
    { q: "State MM's proposition with tax.", a: "Vg = Vu + DT — the geared company is worth the ungeared value plus the present value of the tax shield." },
    { q: "Give two conditions under which the WACC should not be used as a discount rate.", a: "Where the project's business risk differs from existing operations, and where it materially changes the capital structure." },
  ],
  furtherStudy: [
    "Area F uses the WACC and the cost of equity to value a business.",
    "AFM develops this into adjusted present value and full capital-structure analysis.",
  ],
}

export const FM_TREE_AREA_E: StudyChapter[] = [FM_TREE_14, FM_TREE_15, FM_TREE_16, FM_TREE_17, FM_TREE_18]
