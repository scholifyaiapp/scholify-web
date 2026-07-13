import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FM · Area A — The financial management function.
 * Rich study chapter: the three decisions, shareholder wealth vs profit, the
 * agency problem and goal congruence, stakeholders, not-for-profit value for
 * money, and the economic environment. Original, syllabus-aligned; no
 * ACCA/Kaplan/BPP text.
 */

export const FM_A: StudyChapter = {
  paper: "FM",
  area: "A",
  title: "The financial management function",
  minutes: 14,
  intro: "Every business is really three questions wearing a suit: what to invest in, how to pay for it, and what to hand back to the owners. Financial management is the discipline of answering all three well.",
  outcomes: [
    "Describe the nature and scope of financial management and its three core decisions",
    "Explain why maximising shareholder wealth — not accounting profit — is the primary financial objective, and measure it with total shareholder return",
    "Explain the agency problem between managers and shareholders and the mechanisms that promote goal congruence",
    "Identify the main stakeholder groups and their (often competing) objectives",
    "Explain financial objectives for not-for-profit entities using value for money and the three Es",
    "Explain how fiscal policy, monetary policy and the wider economic environment affect financial decisions",
  ],
  sections: [
    {
      id: "scope",
      heading: "The three decisions",
      blocks: [
        { kind: "text", md: "Financial management is not book-keeping and it is not just accounting. **Financial accounting** records what has already happened for outsiders; **management accounting** helps insiders plan and control. **Financial management** sits above both and is forward-looking: it decides how a company should raise and deploy long-term finance to build value for its owners." },
        { kind: "text", md: "However complex a business looks, its finance function is really answering three linked questions — and the whole of FM hangs off them." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The three financial management decisions",
          caption: "Each decision feeds the next: what you invest in drives how much finance you need, which drives what is left to distribute.",
          data: {
            steps: [
              { label: "Investment decision", sub: "Which projects and assets to commit capital to (capital budgeting, working capital)" },
              { label: "Financing decision", sub: "How to raise that capital — the mix of debt and equity" },
              { label: "Dividend decision", sub: "How much profit to return to shareholders vs retain and reinvest" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one idea", md: "Financial management makes three decisions — **investment, financing and dividend** — and each is judged by a single test: does it increase the **wealth of the shareholders**?" },
        { kind: "text", md: "The three are interdependent. A larger investment programme may need more finance, which changes gearing and risk; retaining more profit to fund investment leaves less for dividends. A good finance function does not optimise one in isolation — it balances all three." },
      ],
    },
    {
      id: "objective",
      heading: "The primary objective — shareholder wealth, not profit",
      blocks: [
        { kind: "text", md: "For a company, the classic primary financial objective is the **maximisation of shareholder wealth**. Shareholders own the company, and their wealth is the value of what they hold: the **market value of their shares plus the dividends** they receive. Anything the finance function does should ultimately push that value up." },
        { kind: "text", md: "A tempting alternative is **profit maximisation**, but profit is a poor master. Profit is an accounting figure, chosen using accounting policies; it ignores **risk**, ignores the **timing** of cash flows (a dollar of profit next year is worth less than one today), and ignores the **investment** needed to earn it. A manager can boost this year's profit by cutting maintenance, R&D or training — destroying long-term value while the profit line smiles." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Shareholder wealth vs profit maximisation",
          data: {
            leftTitle: "Shareholder wealth",
            rightTitle: "Profit maximisation",
            rows: [
              { aspect: "Based on", left: "Cash flows and share value", right: "Accounting profit" },
              { aspect: "Risk", left: "Explicitly reflected in the required return", right: "Ignored" },
              { aspect: "Time value of money", left: "Recognised — timing matters", right: "Ignored" },
              { aspect: "Horizon", left: "Long term", right: "Easily short-term" },
              { aspect: "Manipulation", left: "Harder — market sees through it", right: "Accounting-policy choices can flatter it" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "Total shareholder return (TSR)", md: "Shareholder return over a period combines **both** ways an investor gains: the **capital gain** on the share plus the **dividend** received, expressed as a percentage of the price paid at the start." },
        { kind: "formula", name: "Total shareholder return", expr: "TSR = ( (P1 − P0) + D1 ) / P0", note: "P0 = share price at start, P1 = share price at end, D1 = dividend received in the period. The bracket (P1 − P0) is the capital gain; D1 is the dividend yield component." },
        { kind: "example", title: "Worked example — measuring TSR", scenario: "An investor buys a share for $4.00. One year later the share is worth $4.30 and a dividend of $0.20 has been paid during the year. What total shareholder return did they earn?", steps: [
          { label: "Capital gain", detail: "P1 − P0 = $4.30 − $4.00 = $0.30 per share." },
          { label: "Dividend", detail: "D1 = $0.20 per share, paid in the year." },
          { label: "Total gain", detail: "$0.30 + $0.20 = $0.50 per share." },
          { label: "As a return", detail: "$0.50 / $4.00 = 0.125." },
        ], result: "Total shareholder return = 12.5% — roughly 7.5% from the capital gain plus 5% dividend yield. TSR captures the whole gain to the owner, which is exactly what wealth maximisation targets." },
        { kind: "text", md: "Because shareholder wealth can be hard to observe directly, companies set measurable **financial targets** as proxies — for example a target earnings-per-share growth, a target dividend per share, or a maximum gearing level. These are useful, but remember they are servants of the wealth objective, not replacements for it." },
      ],
      check: {
        q: "Why is maximising accounting profit generally rejected as the primary objective of a company?",
        options: [
          "Because profit is always lower than cash flow",
          "Because profit ignores risk and the timing of returns, and can be flattered by accounting choices",
          "Because shareholders are not interested in profit at all",
          "Because profit cannot be measured reliably",
        ],
        correct: 1,
        explain: "Profit is an accounting number that ignores the risk attached to returns, ignores the time value of money (when the returns arrive), and can be manipulated by accounting-policy choices or by cutting value-adding spend. Shareholder wealth — share value plus dividends — captures all of these, which is why it is preferred.",
      },
    },
    {
      id: "agency",
      heading: "The agency problem and goal congruence",
      blocks: [
        { kind: "text", md: "In a large company the owners (shareholders) do not run it — professional managers do. This split creates an **agency relationship**: shareholders are the **principals**, managers are their **agents**, appointed to act in the owners' best interests. The trouble is that agents have their own interests too." },
        { kind: "text", md: "The **agency problem** is the risk that managers pursue their own goals — bigger salaries, empire-building, job security, a quiet life, short-term bonuses — rather than maximising shareholder wealth. Managers also usually know more about the business than owners do (**asymmetric information**), so the owners cannot fully check what they are doing." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Whose interests? Shareholders vs managers",
          data: {
            leftTitle: "Shareholders want",
            rightTitle: "Managers may prefer",
            rows: [
              { aspect: "Objective", left: "Maximum long-term wealth", right: "Personal reward and status" },
              { aspect: "Risk appetite", left: "Diversified — accept sound risk", right: "Risk-averse — protect their own job" },
              { aspect: "Horizon", left: "Long term", right: "Short term — this year's bonus" },
              { aspect: "Growth", left: "Only value-adding growth", right: "Growth for its own sake (empire-building)" },
              { aspect: "Spare cash", left: "Reinvest well or return it", right: "Perks, prestige projects, retention" },
            ],
          },
        } },
        { kind: "text", md: "The cure is **goal congruence** — aligning managers' interests with owners' so that in serving themselves managers also serve the shareholders. This is achieved partly through **managerial reward schemes** and partly through **corporate governance**." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Mechanisms that encourage goal congruence",
          data: {
            items: [
              { title: "Performance-related pay", sub: "Bonuses linked to profit, EPS or targets that track value" },
              { title: "Share options", sub: "The right to buy shares cheaply later — managers gain when the share price rises, like owners" },
              { title: "Non-executive directors", sub: "Independent board members who monitor and challenge management" },
              { title: "Board structure & governance codes", sub: "Split chair/CEO roles, audit and remuneration committees" },
              { title: "The market for corporate control", sub: "Underperforming firms risk takeover — a discipline on managers" },
              { title: "Regulation & disclosure", sub: "Legal duties and transparent reporting to owners" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Reward schemes cut both ways", md: "Badly designed incentives can make agency worse. A bonus tied only to **short-term profit** can push managers to cut R&D or take on hidden risk. Link rewards to **longer-term, wealth-based** measures — such as multi-year share performance — to keep them honest." },
      ],
      check: {
        q: "A company grants its directors share options exercisable in five years. How does this most directly reduce the agency problem?",
        options: [
          "It guarantees the directors a higher fixed salary",
          "It ties the directors' personal wealth to a rising long-term share price, aligning them with shareholders",
          "It removes the need for non-executive directors",
          "It reduces the company's tax bill",
        ],
        correct: 1,
        explain: "Share options only become valuable if the share price rises above the exercise price, and the five-year horizon rewards long-term value creation. This makes managers gain when shareholders gain — the essence of goal congruence. It does not replace governance monitoring such as non-executive directors.",
      },
    },
    {
      id: "stakeholders",
      heading: "Stakeholders and not-for-profit objectives",
      blocks: [
        { kind: "text", md: "Shareholders are not the only group with a stake in the company. A **stakeholder** is anyone affected by, or able to affect, what the business does. Their objectives often pull in different directions, and management must balance them even while treating shareholder wealth as the primary financial objective." },
        { kind: "diagram", diagram: {
          type: "radial",
          title: "Stakeholders and what each one wants",
          caption: "The same decision — say, cutting costs — helps some groups and hurts others.",
          data: {
            centre: "The company",
            nodes: [
              { label: "Shareholders", sub: "wealth: dividends + share price" },
              { label: "Employees", sub: "pay, conditions, job security" },
              { label: "Lenders", sub: "interest paid, loan repaid on time" },
              { label: "Suppliers", sub: "prompt payment, ongoing orders" },
              { label: "Customers", sub: "quality, fair price, continuity" },
              { label: "Government", sub: "tax, employment, compliance" },
              { label: "Community", sub: "environment, local impact" },
            ],
          },
        } },
        { kind: "text", md: "These objectives frequently **conflict**. Paying suppliers faster helps them but drains cash from shareholders; higher wages help staff but cut profit; cheaper prices delight customers but squeeze margins. Managing these trade-offs is part of the financial management function — ignoring a powerful stakeholder can destroy value just as surely as a bad investment." },
        { kind: "text", md: "**Not-for-profit** organisations — charities, public hospitals, schools, government bodies — have no shareholders to enrich, so wealth maximisation makes no sense. Their aim is to meet a **need** as effectively as possible within a limited budget. The dominant financial objective becomes **value for money (VFM)**: getting the most social benefit from the resources available." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Value for money — the three Es",
          data: {
            items: [
              { title: "Economy", sub: "Buying the inputs needed at the lowest reasonable cost" },
              { title: "Efficiency", sub: "Getting the most output from those inputs — a good input-to-output ratio" },
              { title: "Effectiveness", sub: "Actually achieving the intended objectives and outcomes" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Keeping the three Es straight", md: "**Economy** is about the **cost of inputs**, **efficiency** is about **inputs versus outputs**, and **effectiveness** is about **outputs versus objectives**. A charity can be economical and efficient yet still ineffective if it is not achieving its actual mission." },
      ],
    },
    {
      id: "environment",
      heading: "The economic environment",
      blocks: [
        { kind: "text", md: "No company decides in a vacuum. Governments manage the wider economy through two levers, and every financial manager needs to read them because they move interest rates, demand, prices and exchange rates — the raw inputs to every investment and financing decision." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The two arms of macroeconomic policy",
          data: {
            items: [
              { title: "Fiscal policy", sub: "Government spending and taxation — set by the government/treasury to influence demand" },
              { title: "Monetary policy", sub: "Interest rates and the money supply — usually set by the central bank to control inflation" },
              { title: "Higher taxes / lower spending", sub: "Contractionary fiscal policy — cools demand" },
              { title: "Higher interest rates", sub: "Contractionary monetary policy — curbs borrowing and inflation" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "Fiscal vs monetary — don't mix them up", md: "**Fiscal** policy = **spending and taxation**, controlled by the **government**. **Monetary** policy = **interest rates and the money supply**, usually controlled by the **central bank**. Tax changes are fiscal; a change in the base rate is monetary." },
        { kind: "text", md: "The key economic variables the finance function watches are **interest rates**, **inflation** and **exchange rates**:" },
        { kind: "table", caption: "How the big variables hit financial decisions", head: ["Variable", "If it rises…", "Effect on the company"], rows: [
          ["Interest rates", "Cost of borrowing goes up", "Debt finance dearer; the discount rate rises so fewer projects look worthwhile; existing bond prices fall"],
          ["Inflation", "Prices and wages rise", "Higher input costs, distorted profit, pressure for higher pay; lenders demand higher rates"],
          ["Exchange rates", "Home currency strengthens", "Exports dearer and less competitive; imports cheaper; foreign earnings worth less when converted"],
        ] },
        { kind: "text", md: "Companies rarely raise or invest money by dealing directly with each other. Instead they use **financial intermediaries** — banks, pension funds, insurers — and **financial markets**. **Financial intermediation** is the process by which these institutions channel funds from those with surplus cash (savers) to those who need it (borrowers)." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Financial intermediation",
          caption: "The intermediary sits between saver and borrower, and adds value on both sides.",
          data: {
            steps: [
              { label: "Savers / lenders", sub: "Households and firms with surplus funds" },
              { label: "Financial intermediary", sub: "Bank, pension fund, insurer — pools and channels the funds" },
              { label: "Borrowers / investors", sub: "Companies and individuals needing finance" },
            ],
          },
        } },
        { kind: "text", md: "Intermediaries add value in ways direct lending cannot: **aggregation** (many small deposits become large loans), **maturity transformation** (short deposits fund long loans), and **risk pooling/reduction** (spreading default risk across many borrowers). The **money markets** handle short-term funds (under a year); the **capital markets** — such as a stock exchange — handle long-term debt and equity." },
      ],
      check: {
        q: "A central bank raises its base interest rate to fight inflation. This is an example of…",
        options: [
          "Contractionary fiscal policy",
          "Expansionary fiscal policy",
          "Contractionary monetary policy",
          "Financial intermediation",
        ],
        correct: 2,
        explain: "Interest rates and the money supply are the tools of MONETARY policy, controlled by the central bank. Raising rates to slow the economy and curb inflation is CONTRACTIONARY monetary policy. Fiscal policy would involve changing government spending or taxation instead.",
      },
    },
  ],
  examTraps: [
    { trap: "Naming profit maximisation as the primary corporate objective.", fix: "The primary objective is maximising SHAREHOLDER WEALTH — share value plus dividends. Profit ignores risk, timing and the investment required." },
    { trap: "Forgetting the dividend when calculating shareholder return.", fix: "Total shareholder return = capital gain PLUS dividend, all over the opening price: ((P1 − P0) + D1) / P0. Leaving out D1 understates the return." },
    { trap: "Confusing fiscal and monetary policy.", fix: "Fiscal = government spending & taxation. Monetary = interest rates & money supply (central bank). Tax change → fiscal; base-rate change → monetary." },
    { trap: "Mixing up the three Es.", fix: "Economy = cheap inputs; Efficiency = inputs vs outputs; Effectiveness = did we meet the objective? An organisation can be economical yet ineffective." },
    { trap: "Assuming any bonus scheme automatically fixes the agency problem.", fix: "A short-term profit bonus can worsen it by encouraging cost-cutting and risk-taking. Only rewards linked to long-term, wealth-based measures give real goal congruence." },
  ],
  keyTerms: [
    { term: "The three decisions", def: "Investment (which assets/projects), financing (the debt–equity mix) and dividend (how much to distribute vs retain) — the scope of financial management." },
    { term: "Shareholder wealth maximisation", def: "The primary financial objective of a company: increasing the value of shareholders' holdings, i.e. share price plus dividends." },
    { term: "Total shareholder return (TSR)", def: "The return to an owner over a period, combining the capital gain on the share and the dividend: ((P1 − P0) + D1) / P0." },
    { term: "Agency problem", def: "The risk that managers (agents) pursue their own interests rather than maximising the wealth of the shareholders (principals) who employ them." },
    { term: "Value for money / the three Es", def: "The dominant objective for not-for-profit entities: achieving economy, efficiency and effectiveness with the resources available." },
  ],
  summary: [
    "Financial management makes three interdependent decisions — investment, financing and dividend — all judged by their effect on shareholder wealth.",
    "The primary objective is maximising shareholder wealth (share value + dividends), not accounting profit, which ignores risk, timing and manipulation; total shareholder return measures it as ((P1 − P0) + D1) / P0.",
    "The agency problem arises when managers act for themselves instead of owners; reward schemes (share options, performance pay) and corporate governance promote goal congruence.",
    "Stakeholders (employees, lenders, suppliers, customers, government, community) have conflicting objectives; not-for-profit entities pursue value for money via the three Es — economy, efficiency, effectiveness.",
    "Fiscal policy (government spending & tax) and monetary policy (interest rates & money supply) shape interest rates, inflation and exchange rates, while financial intermediaries and markets channel funds from savers to borrowers.",
  ],
}
