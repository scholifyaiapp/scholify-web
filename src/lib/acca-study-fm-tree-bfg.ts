import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FM · Areas B, F and G — the environment, valuations and risk management.
 *
 * The last three areas of the FM rebuild. B was a single chapter; F and G were
 * ONE legacy chapter's sections filtered two different ways, which is why
 * "Business valuations" and "Risk management" shared examTraps and keyTerms
 * that had been regex-sorted between them.
 *
 *   FM-19  The economic environment for business   (B1, B2)
 *   FM-20  Financial markets, institutions and fintech (B3, B4, B5)
 *   FM-21  Business valuations                     (F1, F2)
 *   FM-22  Market efficiency                       (F3)
 *   FM-23  Foreign currency risk                   (G1, G2)
 *   FM-24  Interest rate risk                      (G3, G4)
 *
 * Written against the official ACCA FM syllabus and study guide.
 */

const FM_TREE_19: StudyChapter = {
  paper: "FM",
  id: "FM-19",
  number: 19,
  area: "B",
  syllabusRefs: ["B1(a)", "B1(b)", "B2(a)"],
  title: "The economic environment for business",
  minutes: 15,
  intro:
    "Interest rates, inflation and government policy change both the cash flows a business expects and the return investors demand of it. Both halves matter.",
  outcomes: [
    "Explain the objectives of macroeconomic policy",
    "Explain fiscal and monetary policy and their effect on financial decisions",
    "Explain the impact of inflation, interest and exchange rates on a business",
    "Describe how competition and regulatory policy affect business",
  ],
  sections: [
    {
      id: "policy",
      heading: "Policy and its transmission",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "The four macroeconomic objectives",
          items: [
            "**Economic growth** — sustainable increases in national output.",
            "**Full employment** — minimising involuntary unemployment.",
            "**Price stability** — low and predictable inflation.",
            "**Balance of payments equilibrium** — external trade broadly in balance.",
          ],
        },
        {
          kind: "text",
          md: "**Fiscal policy** works through taxation, government spending and borrowing. **Monetary policy** works through interest rates, money supply and credit conditions. Both reach the finance function through the same two channels: the cash flows a project will generate, and the rate at which those flows are discounted.",
        },
        {
          kind: "table",
          caption: "How policy reaches the finance decision",
          head: ["Change", "Effect on cash flows", "Effect on the discount rate"],
          rows: [
            ["Interest rates rise", "Higher interest cost; demand may weaken", "Cost of debt and WACC rise, so NPVs fall"],
            ["Inflation rises", "Nominal revenues and costs rise; working capital needs grow", "Money rate rises via the Fisher effect"],
            ["Currency depreciates", "Imports dearer; exporters more competitive", "Little direct effect unless funding is foreign"],
            ["Taxes rise", "After-tax cash flows fall; capital allowances worth more", "After-tax cost of debt changes"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The link back to Area D",
          md: "An economic forecast is only usable if cash flows and the discount rate share the same inflation assumption. That is the Fisher rule from FM-11, and it is the reason this area is examinable at all rather than being general knowledge.",
        },
      ],
      check: {
        q: "A central bank raises interest rates to control inflation. What is the most direct effect on a company's investment appraisal?",
        options: [
          "Project cash flows automatically fall",
          "The cost of debt and hence the WACC rise, reducing NPVs",
          "Capital allowances become worth less",
          "The company must switch to the real method",
        ],
        correct: 1,
        explain:
          "The discount rate is where a rate rise bites first and most directly: a higher cost of debt raises the WACC, so the same cash flows produce a lower NPV and marginal projects are rejected. Cash-flow effects follow through demand, but less directly.",
      },
    },
    {
      id: "competition-regulation",
      heading: "Competition and regulation",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "Where policy constrains the finance function",
          items: [
            "**Competition policy** — restricting monopolies, controlling mergers, and prohibiting anti-competitive agreements. A planned acquisition may simply be blocked.",
            "**Regulation of industries** — price caps and service obligations in utilities limit achievable returns.",
            "**Green and social policy** — environmental levies, reporting duties and subsidies change project cash flows directly.",
            "**Corporate governance codes** — shape board composition and disclosure, affecting the cost of capital through investor confidence.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Bring it back to a number",
          md: "This area is examined as short discussion, usually attached to a calculation. A sentence that names the policy AND the cash flow or rate it moves will outscore a paragraph of general economics.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Treating a fall in interest rates as unambiguously good.", fix: "Consider why rates fell, the effect on inflation and currency, and on any investment income." },
    { trap: "Writing general economics with no link to the finance decision.", fix: "Every point should end at a cash flow or a discount rate." },
  ],
  keyTerms: [
    { term: "Fiscal policy", def: "Government use of taxation, spending and borrowing to influence the economy." },
    { term: "Monetary policy", def: "Central bank use of interest rates and money supply to influence the economy." },
    { term: "Competition policy", def: "Regulation restricting monopoly power and anti-competitive behaviour." },
  ],
  summary: [
    "Policy objectives: growth, employment, price stability, external balance.",
    "Fiscal policy uses tax and spending; monetary policy uses rates and credit.",
    "Both reach finance through cash flows and the discount rate.",
    "Keep inflation assumptions consistent between the two — the Fisher rule.",
    "Competition and industry regulation can block or cap the returns a project assumes.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the four macroeconomic policy objectives.", a: "Economic growth, full employment, price stability and balance of payments equilibrium." },
    { q: "Distinguish fiscal from monetary policy.", a: "Fiscal uses taxation, government spending and borrowing; monetary uses interest rates, money supply and credit conditions." },
    { q: "By which two channels does policy affect an investment appraisal?", a: "Through the project's cash flows and through the discount rate applied to them." },
  ],
  furtherStudy: ["FM-20 covers the markets through which this policy is transmitted."],
}

const FM_TREE_20: StudyChapter = {
  paper: "FM",
  id: "FM-20",
  number: 20,
  area: "B",
  syllabusRefs: ["B3(a)", "B4(a)", "B5(a)"],
  title: "Financial markets, institutions and fintech",
  minutes: 15,
  intro:
    "Where the money is raised, who moves it, and what changes when software does the intermediating.",
  outcomes: [
    "Distinguish money markets from capital markets",
    "Explain financial intermediation and the transformations it performs",
    "Identify the main money-market instruments",
    "Evaluate the effect of fintech on access, cost and risk",
  ],
  sections: [
    {
      id: "markets",
      heading: "Money markets and capital markets",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Two markets, split by term",
            data: {
              leftTitle: "Money market",
              rightTitle: "Capital market",
              rows: [
                { aspect: "Term", left: "Short — under one year", right: "Long — years to perpetuity" },
                { aspect: "Purpose", left: "Liquidity and short-term funding", right: "Investment and permanent finance" },
                { aspect: "Instruments", left: "Treasury bills, CDs, commercial paper", right: "Shares, bonds and loan notes" },
                { aspect: "Typical user", left: "Treasurer managing a cash surplus or shortfall", right: "Board funding an expansion" },
              ],
            },
          },
        },
        {
          kind: "list",
          style: "bullet",
          title: "Money-market instruments",
          items: [
            "**Treasury bills** — short-term government debt issued at a discount to face value; effectively risk-free.",
            "**Certificates of deposit** — a bank's receipt for a term deposit, tradeable before maturity.",
            "**Commercial paper** — unsecured short-term corporate debt, available only to strong credits.",
            "**Repurchase agreements** — selling securities with an agreement to buy them back, effectively secured borrowing.",
          ],
        },
      ],
      check: {
        q: "A treasurer with £2m surplus for six weeks needs it back on a known date with no capital risk. Which is most appropriate?",
        options: ["Ordinary shares in a listed company", "A treasury bill or certificate of deposit", "A ten-year corporate bond", "A convertible loan note"],
        correct: 1,
        explain:
          "Short-term, liquid and capital-secure — the money market exists for exactly this. Equities risk capital; long bonds carry interest-rate risk before maturity and must be sold at whatever price the market offers on the day the cash is needed.",
      },
    },
    {
      id: "intermediation-fintech",
      heading: "Intermediation and fintech",
      blocks: [
        {
          kind: "definition",
          term: "Financial intermediation",
          md: "Institutions channelling funds from those with a surplus to those with a deficit, performing three transformations: **maturity** (short deposits fund long loans), **risk** (many small loans diversify), and **size** (aggregating small deposits into large advances).",
        },
        {
          kind: "table",
          caption: "Fintech, honestly assessed",
          head: ["What it improves", "What it introduces"],
          rows: [
            ["Lower transaction costs through automation", "Cyber and operational risk concentrated in software"],
            ["Faster, data-driven credit assessment", "Model bias and poor data quality producing unfair or wrong decisions"],
            ["Access for borrowers banks will not serve — P2P, crowdfunding", "Platforms that are less regulated and may fail"],
            ["Real-time payments and treasury visibility", "Dependence on third-party providers and APIs"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The examinable judgement",
          md: "Fintech questions are not about naming technologies. They ask whether a specific finance function is better off — cheaper and faster, against new control and regulatory exposure. Answer for the company described.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Classifying a long-dated bond as a money-market instrument.", fix: "Classify by maturity: money markets are short-term." },
    { trap: "Listing fintech benefits with no risks.", fix: "Name the cyber, data-quality, regulatory and dependency exposures too." },
  ],
  keyTerms: [
    { term: "Money market", def: "The market for short-term borrowing, lending and liquidity instruments." },
    { term: "Financial intermediary", def: "An institution channelling funds between savers and borrowers while transforming maturity, risk and size." },
    { term: "Commercial paper", def: "Unsecured short-term corporate debt issued by strong credits." },
    { term: "Disintermediation", def: "Borrowers and lenders dealing directly, bypassing traditional intermediaries." },
  ],
  summary: [
    "Money markets are short term; capital markets are long term.",
    "Intermediaries transform maturity, risk and size.",
    "Treasury bills, CDs, commercial paper and repos are the main money-market instruments.",
    "Fintech lowers cost and widens access while adding cyber, data and regulatory risk.",
  ],
  knowledgeDiagnostic: [
    { q: "What distinguishes the money market from the capital market?", a: "Term: money markets deal in short-term instruments under a year; capital markets in long-term shares and debt." },
    { q: "Name the three transformations an intermediary performs.", a: "Maturity transformation, risk transformation and size transformation." },
    { q: "Give one benefit and one risk of fintech in the finance function.", a: "Benefit: lower transaction costs and faster credit assessment. Risk: cyber and operational exposure, or reliance on lightly regulated platforms." },
  ],
  furtherStudy: ["FM-22 asks how efficiently these markets price the securities traded on them."],
}

const FM_TREE_21: StudyChapter = {
  paper: "FM",
  id: "FM-21",
  number: 21,
  area: "F",
  syllabusRefs: ["F1(a)", "F2(a)", "F2(b)", "F2(c)"],
  title: "Business valuations",
  minutes: 18,
  intro:
    "Three families of method, three different answers, and no single right one. The mark is in choosing appropriately and saying what your figure excludes.",
  outcomes: [
    "Explain the reasons for valuing a business or financial asset",
    "Apply asset-based valuation methods",
    "Apply income-based methods: P/E, earnings yield and the dividend valuation model",
    "Apply the discounted cash flow method and explain the limitations of each",
  ],
  sections: [
    {
      id: "why-and-asset",
      heading: "Why value, and the asset basis",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "When a valuation is needed",
          items: [
            "A **takeover or merger** — the central case.",
            "A **flotation**, to set an issue price.",
            "Buying or selling an **unquoted holding**, where no market price exists.",
            "**Tax** purposes, and shareholder disputes.",
            "Establishing a **management buy-out** price.",
          ],
        },
        {
          kind: "table",
          caption: "Asset-based valuations",
          head: ["Basis", "What it gives", "Use"],
          rows: [
            ["Book value", "Historic cost less depreciation", "Almost never realistic — a starting point only"],
            ["Net realisable value", "What the assets would fetch if sold", "A FLOOR: the seller should accept no less"],
            ["Replacement cost", "Cost to acquire equivalent assets", "A CEILING for a buyer who could build instead"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Asset methods ignore the business",
          md: "They value the things a company owns, not its ability to earn. That omits brand, workforce, customer relationships and know-how — which for a service company is most of the value. Use them for asset-rich businesses and as a floor, not as the answer.",
        },
      ],
    },
    {
      id: "income",
      heading: "Income-based methods",
      blocks: [
        {
          kind: "formula",
          name: "P/E valuation",
          expr: "Value = Maintainable earnings × P/E ratio",
          note: "Use a P/E from a comparable QUOTED company, then discount it — typically by a third — for an unquoted target whose shares are not readily marketable.",
        },
        {
          kind: "formula",
          name: "Earnings yield and the dividend valuation model",
          expr: "Earnings yield method:  Value = Earnings / Earnings yield\nDVM:  P₀ = D₀(1 + g) / (Ke − g)",
          note: "The DVM values a minority stake well — a minority shareholder receives dividends and cannot change policy.",
        },
        {
          kind: "example",
          title: "Valuing an unquoted company on P/E",
          scenario:
            "Target earnings £1.2m, expected to be maintainable. A quoted competitor trades on a P/E of 15. The target is unquoted.",
          steps: [
            { label: "Unadjusted", detail: "£1.2m × 15 = £18.0m" },
            { label: "Marketability discount", detail: "Reduce the P/E by about one third: 15 × 2/3 = 10" },
            { label: "Adjusted value", detail: "£1.2m × 10 = £12.0m" },
          ],
          result:
            "£12m rather than £18m. The discount reflects that the shares cannot be sold easily. State the discount you applied and why — an unadjusted quoted P/E applied to an unquoted company overstates value and the examiner is looking for that adjustment.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Match the method to the STAKE",
          md: "A **minority** holding receives dividends and controls nothing, so the DVM fits. A **controlling** stake commands the whole cash flow and can change policy, so DCF or an earnings basis fits. Choosing the wrong one for the stake is a substantive error, not a presentational one.",
        },
      ],
      check: {
        q: "You are valuing a 5% holding in an unquoted company. Which method is most appropriate?",
        options: [
          "Discounted cash flow of the whole business",
          "Net realisable value of the assets",
          "The dividend valuation model",
          "Replacement cost",
        ],
        correct: 2,
        explain:
          "A 5% holder receives dividends and cannot influence policy or access the underlying cash flows, so the value of the holding is the present value of its expected dividends. DCF of the whole business values control, which this shareholder does not have.",
      },
    },
    {
      id: "dcf",
      heading: "Discounted cash flow, and choosing between methods",
      blocks: [
        {
          kind: "text",
          md: "The **DCF method** values the business as the present value of its expected free cash flows, discounted at a rate reflecting their risk. Theoretically it is the soundest of the three families — it is the only one that values what the business will actually produce.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Why it is still not the automatic answer",
          items: [
            "It requires **forecasts far into the future**, which are estimates compounding on estimates.",
            "The **terminal value** is often most of the answer and is highly sensitive to the assumed growth rate.",
            "The **discount rate** must reflect the target's risk, not the acquirer's.",
            "Small changes in assumptions produce large changes in value — always present a RANGE.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "What a valuation answer should conclude",
          md: "Not a single number. Compute two or three bases, state what each captures and omits, give a range, and say where within it you would open negotiations and why. That structure is what the marks follow.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Applying a quoted P/E to an unquoted company unadjusted.", fix: "Discount it, typically by around a third, for lack of marketability, and say so." },
    { trap: "Using DCF of the whole business to value a small minority stake.", fix: "Match the method to the stake — minority holdings are valued on dividends." },
    { trap: "Presenting one number as the valuation.", fix: "Give a range from several bases, with the assumptions stated." },
  ],
  keyTerms: [
    { term: "Maintainable earnings", def: "The sustainable level of earnings, adjusted for one-off items." },
    { term: "Marketability discount", def: "A reduction applied to an unquoted company's valuation because its shares cannot be sold readily." },
    { term: "Terminal value", def: "The value of cash flows beyond the explicit forecast period, often the majority of a DCF valuation." },
  ],
  summary: [
    "Asset methods give a floor (NRV) and a ceiling (replacement cost) and ignore earning power.",
    "P/E uses maintainable earnings and a comparable multiple, discounted if unquoted.",
    "The DVM suits minority stakes; DCF and earnings bases suit control.",
    "DCF is theoretically soundest and most sensitive to terminal value and growth.",
    "Conclude with a range and stated assumptions, never a single figure.",
  ],
  knowledgeDiagnostic: [
    { q: "Which asset basis represents a floor value, and why?", a: "Net realisable value — the seller would do better breaking the business up than accepting less." },
    { q: "Why discount a quoted P/E when valuing an unquoted company?", a: "Its shares lack marketability, so an investor requires a higher return and will pay a lower multiple." },
    { q: "Which valuation method suits a minority shareholding?", a: "The dividend valuation model, because a minority holder receives dividends and cannot access or change the underlying cash flows." },
    { q: "What is the main weakness of a DCF valuation?", a: "It depends on long-range forecasts and a terminal value that is highly sensitive to the assumed growth rate." },
  ],
  furtherStudy: ["AFM extends valuation to synergies, free cash flow to equity and acquisition pricing."],
}

const FM_TREE_22: StudyChapter = {
  paper: "FM",
  id: "FM-22",
  number: 22,
  area: "F",
  syllabusRefs: ["F3(a)", "F3(b)"],
  title: "Market efficiency",
  minutes: 14,
  intro:
    "If share prices already reflect everything knowable, most of what analysts do is worthless — and several exam answers change. That is why this short topic keeps appearing.",
  outcomes: [
    "Explain the three forms of the efficient market hypothesis",
    "Explain the implications of each for financial management",
    "Describe evidence and behavioural challenges to market efficiency",
  ],
  sections: [
    {
      id: "forms",
      heading: "The three forms",
      blocks: [
        {
          kind: "table",
          caption: "What each form says prices already reflect",
          head: ["Form", "Prices reflect", "Therefore useless"],
          rows: [
            ["Weak", "All PAST price movements", "Technical analysis — chart patterns cannot beat the market"],
            ["Semi-strong", "All past prices AND all publicly available information", "Fundamental analysis of published data — accounts, announcements"],
            ["Strong", "All information, public AND private", "Even insider information — nobody can beat the market"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The forms are cumulative",
          md: "Semi-strong includes weak; strong includes both. So evidence that public information is instantly impounded is evidence for semi-strong AND weak. Evidence that insiders profit disproves only the strong form.",
        },
        {
          kind: "text",
          md: "Most developed markets are generally regarded as **semi-strong efficient**. Insider dealing is illegal precisely because it works — which is itself evidence against the strong form.",
        },
      ],
      check: {
        q: "A study finds that investors who trade on published annual reports earn no abnormal returns, but company directors consistently do. Which form does this support?",
        options: [
          "The strong form only",
          "Semi-strong efficiency, but not strong-form efficiency",
          "Weak form only",
          "No form — the market is inefficient",
        ],
        correct: 1,
        explain:
          "Public information giving no advantage supports semi-strong (and therefore weak). Insiders profiting means private information is NOT in the price, which disproves the strong form. This is the standard shape of an EMH question.",
      },
    },
    {
      id: "implications",
      heading: "What it means for the finance director",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "If the market is semi-strong efficient",
          items: [
            "**Timing an issue is pointless** — there is no systematically \"cheap\" moment; the price is fair now.",
            "**Cosmetic accounting changes will not fool anyone** — the market sees through policy changes with no cash effect.",
            "**The share price is a fair measure of management performance**, which justifies using it in reward schemes.",
            "**Investing in a positive-NPV project should raise the price immediately**, once announced.",
            "**Acquisitions must be justified by real synergies**, since the target's standalone price is already fair.",
          ],
        },
        {
          kind: "text",
          md: "**Behavioural finance** challenges all of this: investors are not consistently rational. Overconfidence, herding, anchoring and loss aversion produce bubbles and crashes that efficiency alone struggles to explain. Market anomalies — small-firm and calendar effects — point the same way.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The balanced conclusion",
          md: "Markets are efficient enough that consistently beating them is very hard, and not so perfectly efficient that bubbles are impossible. An answer asserting either extreme is weaker than one holding both.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Treating the three forms as alternatives.", fix: "They are cumulative — strong includes semi-strong includes weak." },
    { trap: "Claiming efficiency means prices are always correct.", fix: "It means prices reflect available information, not that the information is right or the future known." },
  ],
  keyTerms: [
    { term: "Weak-form efficiency", def: "Prices reflect all past price movements, so technical analysis cannot beat the market." },
    { term: "Semi-strong efficiency", def: "Prices reflect all publicly available information." },
    { term: "Behavioural finance", def: "The study of how psychological biases cause investors to depart from rationality." },
  ],
  summary: [
    "Weak, semi-strong and strong forms are cumulative.",
    "Most developed markets are considered semi-strong efficient.",
    "Efficiency makes issue timing and cosmetic accounting pointless.",
    "Behavioural finance and market anomalies challenge strict efficiency.",
  ],
  knowledgeDiagnostic: [
    { q: "What does semi-strong efficiency say prices reflect?", a: "All past price movements and all publicly available information." },
    { q: "Give one implication of semi-strong efficiency for a finance director.", a: "There is no point trying to time a share issue, and cosmetic accounting changes will not raise the price." },
    { q: "What evidence argues against strong-form efficiency?", a: "That insiders can and do earn abnormal returns, which is why insider dealing is illegal." },
  ],
  furtherStudy: ["FM-21's valuation methods assume a market efficient enough for comparable multiples to mean something."],
}

const FM_TREE_23: StudyChapter = {
  paper: "FM",
  id: "FM-23",
  number: 23,
  area: "G",
  syllabusRefs: ["G1(a)", "G1(b)", "G2(a)", "G2(b)"],
  title: "Foreign currency risk",
  minutes: 18,
  intro:
    "Three kinds of currency exposure, two parity theories that predict rates, and a set of hedges. Identify the exposure correctly and the hedge follows.",
  outcomes: [
    "Distinguish transaction, translation and economic risk",
    "Apply purchasing power parity and interest rate parity",
    "Apply forward contracts, money market hedges and derivatives",
    "Explain internal hedging techniques",
  ],
  sections: [
    {
      id: "exposures",
      heading: "Three exposures",
      blocks: [
        {
          kind: "table",
          caption: "Identify before you hedge",
          head: ["Exposure", "What it is", "Hedge"],
          rows: [
            ["Transaction", "A known future cash flow in a foreign currency — a receipt or payment already contracted", "Forwards, money market hedge, futures, options"],
            ["Translation", "Retranslating foreign assets and liabilities on consolidation — an accounting effect", "Matching assets with liabilities in the same currency"],
            ["Economic", "Long-term change in competitiveness and present value from exchange-rate movements", "Diversifying operations, markets and suppliers"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Translation risk is not a cash flow",
          md: "It changes reported figures, not money. Spending real cash to hedge a purely accounting exposure is usually poor treasury policy — a point worth making explicitly when a question offers it.",
        },
      ],
      check: {
        q: "A UK exporter finds a competitor's home currency has depreciated, making their goods permanently cheaper in export markets. Which exposure is this?",
        options: ["Transaction risk", "Translation risk", "Economic risk", "No exposure — there is no foreign-currency transaction"],
        correct: 2,
        explain:
          "Economic risk: a lasting change in competitiveness and therefore in the present value of future cash flows. There is no specific contracted amount to hedge, which is why the response is operational — diversifying markets and supply — rather than a forward contract.",
      },
    },
    {
      id: "parity",
      heading: "Predicting the rate",
      blocks: [
        {
          kind: "formula",
          name: "Purchasing power parity and interest rate parity",
          expr: "PPP:  S₁ = S₀ × (1 + hc) / (1 + hb)\nIRP:  F₀ = S₀ × (1 + ic) / (1 + ib)",
          note: "c = the counter (variable) currency, b = the base currency. h = inflation, i = interest rate.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Which rate goes on top",
          md: "The currency quoted as the **counter** — the variable one, second in the pair — takes the **top** of the fraction. Getting this the wrong way round inverts the movement and turns a gain into a loss, so check it before substituting.",
        },
        {
          kind: "text",
          md: "PPP says currencies move to equalise the price of goods over the long run, so the higher-inflation currency depreciates. IRP says forward rates already reflect the interest differential, so the higher-interest currency trades at a forward discount. IRP holds well in practice because arbitrage enforces it; PPP is a long-run tendency, not a forecast.",
        },
      ],
    },
    {
      id: "hedges",
      heading: "Hedging techniques",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The money market hedge, step by step",
          items: [
            "**Receipt in foreign currency:** borrow the foreign currency now, convert to home currency at spot, deposit at home. The receipt repays the borrowing.",
            "**Payment in foreign currency:** deposit foreign currency now (buying it at spot with home currency, borrowed if necessary), so the deposit matures exactly to meet the payment.",
            "In both cases the rate is **fixed today** using spot plus interest rates, replicating a forward.",
          ],
        },
        {
          kind: "table",
          caption: "The instruments compared",
          head: ["Method", "Certainty", "Cost", "Keeps upside?"],
          rows: [
            ["Forward contract", "Rate fixed exactly", "Built into the rate; no premium", "No — binding both ways"],
            ["Money market hedge", "Rate fixed exactly", "Interest differential", "No"],
            ["Currency futures", "Near — standardised amounts leave basis risk", "Margin and commission", "No"],
            ["Currency options", "A worst case, not a fixed rate", "Premium payable up front", "YES — abandon if the rate moves your way"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Options cost money for a reason",
          md: "An option is the only hedge that keeps the upside, and the premium is the price of that. If a question emphasises uncertainty about WHETHER the transaction will happen — a contract not yet won — the option is usually the answer, because a forward would leave the company hedging an exposure it does not have.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Internal hedging, before any instrument",
          items: [
            "**Invoicing in the home currency** — passes the risk to the counterparty, if they accept.",
            "**Matching** receipts and payments in the same currency, so only the net is exposed.",
            "**Netting** intra-group balances before settling.",
            "**Leading and lagging** — accelerating or delaying settlement in anticipation of a move.",
          ],
        },
      ],
      check: {
        q: "A company has tendered for a contract that will produce a US dollar receipt if won, with the result unknown for three months. Which hedge fits best?",
        options: [
          "A forward contract for the full amount",
          "A money market hedge",
          "A currency option",
          "No hedge — the exposure is uncertain",
        ],
        correct: 2,
        explain:
          "The exposure is contingent: it exists only if the tender succeeds. An option can be abandoned at the cost of the premium if the contract is lost, whereas a forward is binding — leaving the company obliged to deliver dollars it never receives.",
      },
    },
  ],
  examTraps: [
    { trap: "Hedging translation exposure with cash instruments.", fix: "It is an accounting effect; match currency assets with currency liabilities instead." },
    { trap: "Inverting the parity fraction.", fix: "The counter currency's rate goes on top." },
    { trap: "Recommending a forward for a contingent exposure.", fix: "Use an option — a forward binds you to an exposure that may never arise." },
  ],
  keyTerms: [
    { term: "Transaction risk", def: "Exposure on a known future foreign-currency cash flow." },
    { term: "Translation risk", def: "Accounting exposure from retranslating foreign assets and liabilities on consolidation." },
    { term: "Economic risk", def: "Long-term exposure of competitiveness and present value to exchange-rate movements." },
    { term: "Money market hedge", def: "Fixing a rate today by borrowing and depositing in the two currencies instead of using a forward." },
  ],
  summary: [
    "Identify the exposure first: transaction, translation or economic.",
    "Translation risk is accounting only and rarely worth cash to hedge.",
    "PPP uses inflation; IRP uses interest rates; the counter currency goes on top.",
    "Forwards and money market hedges fix a rate; options buy a worst case and keep the upside.",
    "Try internal methods — invoicing, matching, netting, leading and lagging — first.",
  ],
  knowledgeDiagnostic: [
    { q: "Distinguish transaction risk from economic risk.", a: "Transaction risk is exposure on a specific known future foreign-currency cash flow; economic risk is the long-term effect of rate movements on competitiveness and the present value of future cash flows." },
    { q: "State interest rate parity.", a: "F₀ = S₀ × (1 + counter-currency interest) / (1 + base-currency interest)." },
    { q: "When is an option preferable to a forward?", a: "When the exposure is contingent or uncertain, or when the company wants to retain the benefit of a favourable move; the premium is the price of that flexibility." },
    { q: "Name three internal hedging techniques.", a: "Invoicing in the home currency, matching receipts and payments, and netting intra-group balances. (Also leading and lagging.)" },
  ],
  furtherStudy: ["AFM extends this to swaps, complex option strategies and multinational treasury policy."],
}

const FM_TREE_24: StudyChapter = {
  paper: "FM",
  id: "FM-24",
  number: 24,
  area: "G",
  syllabusRefs: ["G3(a)", "G4(a)", "G4(b)"],
  title: "Interest rate risk",
  minutes: 15,
  intro:
    "The same logic as currency risk, applied to the cost of borrowing — plus one idea, the yield curve, that explains why short-term money is usually cheaper.",
  outcomes: [
    "Explain the causes of interest rate risk",
    "Describe the term structure of interest rates and the theories explaining it",
    "Apply forward rate agreements, futures, options and swaps",
    "Explain internal methods of managing interest rate exposure",
  ],
  sections: [
    {
      id: "exposure-yield-curve",
      heading: "Exposure and the yield curve",
      blocks: [
        {
          kind: "text",
          md: "A company faces interest rate risk when it borrows at a **floating rate** (the cost may rise), when it plans to borrow in future (the rate may rise before it does), or when it holds **fixed-rate** debt while rates fall and it is locked into paying more.",
        },
        {
          kind: "definition",
          term: "The yield curve",
          md: "A plot of yield against maturity. Normally **upward sloping**, so long-term borrowing costs more than short-term — which is exactly the trade-off behind the aggressive funding policy in FM-08.",
        },
        {
          kind: "table",
          caption: "Why the curve has its shape",
          head: ["Theory", "Explanation"],
          rows: [
            ["Liquidity preference", "Investors require a premium to tie money up for longer, so long rates exceed short"],
            ["Expectations", "Long rates reflect expected future short rates; the curve inverts when rates are expected to fall"],
            ["Market segmentation", "Short and long markets have different participants, so their rates are set largely independently"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "An inverted curve is a signal",
          md: "When long rates fall below short rates, the market expects rate cuts — usually because it expects a slowdown. A question describing an inverted curve is inviting you to say so.",
        },
      ],
      check: {
        q: "Which theory explains an inverted yield curve most directly?",
        options: ["Liquidity preference", "Expectations theory", "Market segmentation", "Purchasing power parity"],
        correct: 1,
        explain:
          "Expectations theory: long rates are an average of expected future short rates, so if the market expects rates to fall, long rates sit below current short rates. Liquidity preference alone always implies an upward slope, so it cannot explain inversion.",
      },
    },
    {
      id: "instruments",
      heading: "Managing the exposure",
      blocks: [
        {
          kind: "table",
          caption: "The instruments",
          head: ["Instrument", "What it does"],
          rows: [
            ["Forward rate agreement (FRA)", "Fixes the interest rate on a notional future borrowing; the parties settle the difference in cash"],
            ["Interest rate futures", "Exchange-traded, standardised; hedges by taking an offsetting position, leaving basis risk"],
            ["Interest rate options / caps", "Set a maximum rate while keeping the benefit of a fall; a premium is payable"],
            ["Interest rate swap", "Exchange fixed-rate obligations for floating (or vice versa) with a counterparty"],
          ],
        },
        {
          kind: "text",
          md: "A **swap** lets each party obtain the type of interest it wants at a lower cost than borrowing that way directly, exploiting each one's **comparative advantage** in the fixed or floating market. Both can end up better off, which is why swaps exist at all.",
        },
        {
          kind: "illustration",
          title: "Why a swap benefits both",
          md: "Company A borrows fixed at 6% or floating at LIBOR + 1%. Company B borrows fixed at 8% or floating at LIBOR + 2%.\n\nA is better in BOTH markets — but its advantage is larger in fixed (2% better) than floating (1% better). So A borrows fixed, B borrows floating, and they swap. The 1% difference in comparative advantage is the total saving, shared between them.\n\nThe examinable point is that an absolute advantage in both markets does not remove the gain: it is the DIFFERENCE in advantage that creates it.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Internal methods first",
          items: [
            "**Matching** — pair floating-rate assets with floating-rate liabilities so movements offset.",
            "**Smoothing** — hold a balance of fixed and floating debt so no single move is severe.",
            "**Netting** — offset group exposures before hedging the remainder externally.",
          ],
        },
      ],
      check: {
        q: "A company will borrow £5m in three months and fears rates will rise. Which instrument fixes the rate with no premium payable?",
        options: ["An interest rate option", "A forward rate agreement", "A currency swap", "An interest rate cap"],
        correct: 1,
        explain:
          "An FRA fixes the rate on a notional future borrowing with no up-front premium; the parties simply settle the difference in cash. Options and caps both cost a premium, which is what buys the right to walk away if rates fall.",
      },
    },
  ],
  examTraps: [
    { trap: "Assuming the yield curve always slopes upward.", fix: "It inverts when the market expects rates to fall — usually a slowdown signal." },
    { trap: "Concluding a swap is impossible where one party is better in both markets.", fix: "The gain comes from the DIFFERENCE in comparative advantage, not absolute advantage." },
    { trap: "Recommending an option where certainty is wanted at no premium.", fix: "An FRA or swap fixes the rate; the option premium buys flexibility that was not asked for." },
  ],
  keyTerms: [
    { term: "Yield curve", def: "The relationship between yield and maturity for otherwise similar debt." },
    { term: "Forward rate agreement", def: "An agreement fixing the interest rate on a notional future borrowing, settled in cash." },
    { term: "Interest rate swap", def: "An exchange of fixed-rate for floating-rate interest obligations between counterparties." },
    { term: "Basis risk", def: "The risk that a hedge and the underlying exposure do not move exactly together." },
  ],
  summary: [
    "Exposure arises from floating-rate debt, future borrowing, and being locked into fixed rates.",
    "The yield curve normally slopes upward; liquidity preference, expectations and segmentation explain its shape.",
    "FRAs and swaps fix rates without a premium; options and caps buy a ceiling and keep the upside.",
    "Swaps work through comparative, not absolute, advantage.",
    "Match, smooth and net internally before hedging externally.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the three theories explaining the shape of the yield curve.", a: "Liquidity preference, expectations theory and market segmentation." },
    { q: "What does a forward rate agreement do?", a: "Fixes the interest rate on a notional future borrowing; the difference against the actual rate is settled in cash, with no premium." },
    { q: "Why can both parties gain from an interest rate swap?", a: "Because each has a comparative advantage in one market; the difference in those advantages is the total saving, which they share." },
    { q: "Give two internal methods of managing interest rate risk.", a: "Matching floating-rate assets with floating-rate liabilities, and smoothing by holding a balance of fixed and floating debt." },
  ],
  furtherStudy: ["AFM develops swaps, collars and full treasury risk policy."],
}

export const FM_TREE_AREA_B: StudyChapter[] = [FM_TREE_19, FM_TREE_20]
export const FM_TREE_AREA_F: StudyChapter[] = [FM_TREE_21, FM_TREE_22]
export const FM_TREE_AREA_G: StudyChapter[] = [FM_TREE_23, FM_TREE_24]
