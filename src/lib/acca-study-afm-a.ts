import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AFM · Area A — Role of the senior financial adviser.
 * Strategic-level opener for Advanced Financial Management: the adviser's remit,
 * the three interacting financial decisions, the economic/regulatory backdrop,
 * agency & stakeholder tension, professional ethics, integrated reporting and a
 * first look at behavioural finance. Original, syllabus-aligned; no ACCA/BPP text.
 */

export const AFM_A: StudyChapter = {
  paper: "AFM",
  area: "A",
  title: "Role of the senior financial adviser",
  minutes: 15,
  intro: "At AFM level you stop being the person who fills in the spreadsheet and become the person the board turns to. The question is no longer \"what is the NPV?\" but \"should we do this at all, and can we still look our stakeholders and our regulator in the eye afterwards?\"",
  outcomes: [
    "Describe the role and responsibilities of senior financial management and the adviser to the board",
    "Explain how the investment, financing and dividend decisions interact within a coherent financial strategy",
    "Assess how the economic and regulatory environment shapes financial strategy",
    "Analyse stakeholder and agency conflicts at senior level and the mechanisms that manage them",
    "Recognise the ethical threats specific to advanced financial management and the ideas behind integrated reporting and behavioural finance",
  ],
  sections: [
    {
      id: "role",
      heading: "What a senior financial adviser is actually for",
      blocks: [
        { kind: "text", md: "Lower down the ACCA ladder, finance is about **getting the number right**. At AFM the number is assumed — a competent analyst can compute an NPV, a WACC or a bond price. What the board pays a senior adviser for is **judgement**: which numbers to trust, which risks to run, and how a financial decision lands with shareholders, lenders, regulators and society. You are hired to turn analysis into a **defensible recommendation**." },
        { kind: "text", md: "The senior financial function has three broad responsibilities. First, **stewardship of capital** — allocating scarce funds to the projects that create the most value. Second, **management of financial risk** — currency, interest rate, credit and liquidity exposures that could sink an otherwise sound business. Third, **communication and assurance** — telling a credible, honest story to the capital markets so the firm can raise finance on good terms. A great adviser holds all three at once." },
        { kind: "diagram", diagram: {
          type: "radial",
          title: "The senior financial adviser's remit",
          caption: "One role, several duties that must be balanced rather than traded off.",
          data: {
            centre: "Senior financial adviser",
            nodes: [
              { label: "Capital allocation", sub: "fund the value-creating projects" },
              { label: "Financing & capital structure", sub: "raise funds at the lowest sustainable cost" },
              { label: "Risk management", sub: "FX, interest, credit, liquidity" },
              { label: "Dividend & payout policy", sub: "return cash without starving growth" },
              { label: "Stakeholder communication", sub: "credible signals to the market" },
              { label: "Governance & ethics", sub: "act with integrity and objectivity" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one idea", md: "The senior adviser's job is not to compute value but to **create and protect** it — allocating capital, managing risk and communicating honestly, so the board can act with confidence and the firm keeps its licence to operate." },
      ],
    },
    {
      id: "three-decisions",
      heading: "Financial strategy: three decisions that will not sit still",
      blocks: [
        { kind: "text", md: "Financial strategy is built from three decisions: **investment** (which assets and projects to hold), **financing** (how to fund them — debt, equity or retained earnings) and **dividend** (how much cash to return to shareholders versus reinvest). The exam-defining truth is that these three are **not independent** — pull one lever and the other two move." },
        { kind: "text", md: "Follow the chain. A large **investment** programme needs funding, so it drives the **financing** decision. If the firm chooses to fund it from retained earnings rather than new debt or equity, there is less cash left for shareholders, so it constrains the **dividend** decision. Equally, a promise of high, stable dividends limits retained earnings, forcing the firm toward external finance for its investments — which changes gearing, and therefore the cost of capital used to appraise the very investments you started with. The loop closes on itself." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The three financial decisions interact",
          caption: "Each decision constrains the next; the dividend loops back to reshape investment appraisal.",
          data: {
            steps: [
              { label: "Investment decision", sub: "which projects create value?" },
              { label: "Funds required", sub: "how much capital, and when?" },
              { label: "Financing decision", sub: "debt vs equity vs retained earnings" },
              { label: "Cash available for owners", sub: "what is left after reinvestment" },
              { label: "Dividend decision", sub: "pay out or retain?" },
              { label: "Retained earnings & gearing", sub: "feeds back into next round of investment" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "The unifying objective", md: "In a listed company the three decisions are reconciled against one goal: **maximising shareholder wealth**, usually proxied by long-run share price and total shareholder return. A decision that raises NPV but is financed or signalled so badly that the share price falls has **not** created wealth." },
        { kind: "example", title: "Worked example — total shareholder return", scenario: "An investor bought shares in Aster plc at $4.00. One year later the share price is $4.40 and the company has paid a dividend of $0.20 per share. Management claims it \"delivered for shareholders\". Quantify the return and interpret it against a cost of equity of 12%.", steps: [
          { label: "Capital gain", detail: "Price moved $4.00 → $4.40, a gain of $0.40 per share." },
          { label: "Income", detail: "Dividend received = $0.20 per share." },
          { label: "Total shareholder return (TSR)", detail: "TSR = (dividend + capital gain) / opening price = ($0.20 + $0.40) / $4.00 = $0.60 / $4.00 = 15.0%." },
          { label: "Compare to required return", detail: "Shareholders required 12% (the cost of equity). TSR of 15% exceeds it by 3 percentage points." },
        ], result: "Aster delivered a 15% TSR against a 12% required return, so it created shareholder value this year. TSR is powerful because it captures BOTH the dividend and the capital-gain effect of the three decisions in a single figure — exactly the combined outcome the senior adviser is accountable for." },
      ],
      check: {
        q: "A company announces a much larger capital-investment programme but insists its dividend per share will be unchanged and it will issue no new equity. What is the most likely consequence?",
        options: [
          "Nothing — the three financial decisions are independent of one another",
          "It will need to raise more debt, increasing gearing and altering its cost of capital",
          "Its share price must fall because investment always destroys value",
          "The cost of equity will fall because dividends are protected",
        ],
        correct: 1,
        explain: "The decisions interlock. Holding the dividend fixed removes retained earnings as a funding source, and ruling out new equity leaves debt to fund the extra investment. Higher gearing changes the capital structure and the cost of capital — which then feeds back into how future projects are appraised. This interaction is the heart of Area A.",
      },
    },
    {
      id: "environment",
      heading: "The economic and regulatory weather",
      blocks: [
        { kind: "text", md: "No financial strategy is set in a vacuum. The senior adviser reads the **economic environment** — interest rates, inflation, exchange rates, the availability of credit and the phase of the business cycle — because each reprices the firm's decisions. Rising interest rates lift the cost of debt and the discount rate, shrinking the pool of positive-NPV projects and making highly geared strategies dangerous. A weakening home currency flatters exporters but punishes firms that import inputs or service foreign-currency debt." },
        { kind: "text", md: "The **regulatory environment** sets the rules of the game. Company law, listing rules, competition and anti-trust authorities, capital-adequacy regimes for financial firms, tax law and cross-border controls all constrain what a strategy may legally do. Regulation is not merely a cost: a firm that anticipates a regulatory shift — say tighter emissions rules or a financial-transactions tax — can position early and turn compliance into advantage. The adviser's task is to fold this weather into every recommendation, not bolt it on afterwards." },
        { kind: "table", caption: "How the environment reprices the three decisions", head: ["Environmental change", "Effect on strategy", "Adviser's response"], rows: [
          ["Interest rates rise", "Higher discount rate; debt costlier; fewer viable projects", "Reappraise the project pipeline; reconsider gearing and hedging"],
          ["Home currency weakens", "Exporters gain; importers and FX-debt holders lose", "Match currency of income and finance; hedge net exposure"],
          ["Credit market tightens", "External finance scarce and expensive", "Lean on retained earnings; protect liquidity and covenants"],
          ["New regulation or tax", "Legal constraints and compliance cost change project value", "Model the rules into appraisal; position ahead of the change"],
        ] },
        { kind: "callout", tone: "tip", md: "In a case-study question, always scan the scenario for **environmental triggers** — a rate rise, a currency move, a new regulator. They are rarely decoration: they are usually the reason the \"obvious\" financial answer is wrong." },
      ],
    },
    {
      id: "agency",
      heading: "Whose interests? Stakeholders and the agency problem",
      blocks: [
        { kind: "text", md: "A company is financed by shareholders but **run by managers** — and the two are not the same people. This separation of ownership from control creates the **agency problem**: managers (the agents) may pursue their own goals — empire-building, excessive perks, risk-averse choices that protect their jobs, or short-term earnings that flatter their bonus — instead of maximising the wealth of the shareholders (the principals) they serve." },
        { kind: "text", md: "Around the shareholders sit other **stakeholders** — lenders, employees, customers, suppliers, governments and the wider community — each with a claim on the firm and each capable of conflict with the others. Lenders want safety and covenants; shareholders may want the firm to take risk. Employees want security; a takeover may promise shareholder gains through job cuts. The senior adviser cannot please everyone, but must **understand** each claim and manage the tensions rather than ignore them." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Stakeholders and what each one wants",
          caption: "Every major financial decision is read differently by each group.",
          data: {
            items: [
              { title: "Shareholders", sub: "growth in wealth: dividends plus share price" },
              { title: "Lenders", sub: "interest paid, covenants kept, principal repaid" },
              { title: "Managers", sub: "reward, security, status — the agency risk" },
              { title: "Employees", sub: "fair pay and job security" },
              { title: "Customers & suppliers", sub: "a reliable, solvent partner" },
              { title: "Government & society", sub: "tax, compliance and responsible conduct" },
            ],
          },
        } },
        { kind: "text", md: "Agency conflict is managed, never fully eliminated, through **goal congruence** mechanisms: performance-linked pay and share options to align managers with owners; **corporate governance** structures (independent non-executive directors, audit and remuneration committees, board oversight); and the discipline of the market — the threat of takeover, and lenders' covenants — which punishes managers who let value slide. These are the tools the senior adviser recommends when a board asks how to keep management honest." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Two lenses on the corporate objective",
          data: {
            leftTitle: "Shareholder wealth view",
            rightTitle: "Stakeholder view",
            rows: [
              { aspect: "Primary goal", left: "Maximise shareholder wealth", right: "Balance all stakeholders' interests" },
              { aspect: "Time horizon", left: "Long-run share price and TSR", right: "Long-run legitimacy and licence to operate" },
              { aspect: "Measure of success", left: "NPV, TSR, value added", right: "Value created across the capitals" },
              { aspect: "Risk", left: "Short-termism if mismanaged", right: "Diluted focus if unprioritised" },
              { aspect: "Reporting fit", left: "Traditional financial statements", right: "Integrated reporting" },
            ],
          },
        } },
      ],
      check: {
        q: "Directors reject a project with a clearly positive NPV because it would raise the firm's risk profile and might threaten their own job security. This is best described as:",
        options: [
          "Sound risk management fully aligned with shareholders",
          "An agency problem — managers pursuing their own interests over the owners'",
          "A regulatory constraint imposed from outside the firm",
          "A stakeholder conflict between customers and suppliers",
        ],
        correct: 1,
        explain: "Rejecting positive-NPV value purely to protect the managers' own position is the classic agency problem: the agents (managers) put their interests ahead of the principals (shareholders). The fix is goal-congruence — incentives and governance that reward value creation — not simply telling directors to try harder.",
      },
    },
    {
      id: "ethics-ir",
      heading: "Ethics, integrated reporting and the human factor",
      blocks: [
        { kind: "text", md: "Seniority multiplies ethical exposure. The adviser sits close to price-sensitive information, to large fee-earning deals and to competing loyalties, so AFM tests ethics with real teeth. Three threats recur. **Conflicts of interest** — advising both sides of a transaction, or holding a personal stake in the outcome — corrode objectivity. **Inducements** — gifts, hospitality or facilitation payments offered to sway a recommendation — threaten integrity and can shade into bribery. And **market abuse** — trading on inside information, or manipulating a price or a market — is not merely unethical but criminal." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Ethical threats specific to senior finance",
          caption: "Name the threat, then apply a safeguard — the professional's response.",
          data: {
            items: [
              { title: "Conflict of interest", sub: "self-interest or advocacy threat; disclose, recuse, use information barriers" },
              { title: "Inducements", sub: "gifts and facilitation payments; decline, log, apply a clear policy" },
              { title: "Insider dealing", sub: "trading on price-sensitive information; restrict access, keep insider lists" },
              { title: "Market manipulation", sub: "false trades or rumours to move a price; never engage, report it" },
              { title: "Confidentiality breach", sub: "leaking client or deal data; safeguard and never exploit it" },
              { title: "Intimidation / undue pressure", sub: "a client pushing an aggressive treatment; stand firm on objectivity" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Ethics is not optional colour", md: "In an AFM case, ethical issues carry marks and can override the numbers: a strategy that is value-accretive but relies on market abuse or a hidden conflict is simply **not recommendable**. Identify the threat, judge its significance, then propose a concrete safeguard." },
        { kind: "text", md: "Ethics also reaches into how the firm **reports** its value. **Integrated reporting** (IR) connects financial results to the broader resources — the **capitals** — a business uses and affects: **financial, manufactured, intellectual, human, social and relationship, and natural** capital. The idea is to show how the organisation creates value **over time** across all six, not just this year's profit. It answers the stakeholder view directly: value is more than the bottom line, and reporting should say so." },
        { kind: "text", md: "Finally, the adviser must remember that markets are made of **people**, not calculators. **Behavioural finance** studies the systematic biases that push real decisions away from the rational ideal. **Overconfidence** leads managers to overrate their forecasts and overpay in acquisitions. **Herding** drives investors and boards to follow the crowd into bubbles and out of them in panic. Anchoring, loss aversion and confirmation bias distort appraisal and negotiation. A senior adviser who knows these biases can guard against them — building challenge, independent review and evidence into the decision — rather than being captured by them." },
      ],
      check: {
        q: "A finance director insists a proposed acquisition \"cannot fail\" and dismisses the analysts' downside scenarios without evidence, having personally led two earlier deals. Which behavioural bias is most clearly at work?",
        options: [
          "Herding — blindly following the wider market",
          "Overconfidence — overrating one's own judgement and forecasts",
          "Loss aversion — weighting losses more heavily than gains",
          "Integrated thinking across the six capitals",
        ],
        correct: 1,
        explain: "Dismissing evidenced downside risk on the strength of past personal successes is overconfidence — a systematic tendency to overrate one's own forecasts and control. Herding is following the crowd, and loss aversion is over-weighting losses; neither fits. The safeguard is structured, independent challenge to the decision.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating the investment, financing and dividend decisions as three separate topics.", fix: "They interact. Changing one reshapes the others — a fixed dividend forces external finance, which changes gearing and the cost of capital used to appraise investments." },
    { trap: "Recommending a value-adding strategy while ignoring an ethical breach in the scenario.", fix: "Ethics can override the numbers. Identify the threat (conflict, inducement, market abuse), judge its significance, and propose a safeguard before signing off." },
    { trap: "Confusing a stakeholder conflict with the agency problem.", fix: "The agency problem is specifically managers (agents) versus owners (principals). A lender-versus-shareholder clash is a stakeholder conflict, not agency." },
    { trap: "Describing integrated reporting as just adding CSR paragraphs to the accounts.", fix: "It reports value creation over time across the six capitals — financial, manufactured, intellectual, human, social & relationship, and natural — connected to strategy, not bolted on." },
    { trap: "Ignoring the economic or regulatory triggers planted in a case scenario.", fix: "A rate rise, currency move or new regulation is usually the reason the obvious financial answer fails — build it into the appraisal, don't note it and move on." },
  ],
  keyTerms: [
    { term: "Agency problem", def: "The conflict that arises when managers (agents) pursue their own interests instead of maximising the wealth of the shareholders (principals) who own the firm." },
    { term: "Goal congruence", def: "Aligning managers' incentives and governance so that acting in their own interest also serves the shareholders' — e.g. share options, performance pay and board oversight." },
    { term: "Total shareholder return (TSR)", def: "The return to a shareholder over a period combining dividend income and capital gain: (dividend + price change) / opening price." },
    { term: "Integrated reporting", def: "A reporting framework showing how an organisation creates value over time across six capitals — financial, manufactured, intellectual, human, social & relationship and natural." },
    { term: "Market abuse", def: "Illegitimate conduct in financial markets, chiefly insider dealing (trading on price-sensitive information) and market manipulation (distorting a price or market)." },
  ],
  summary: [
    "The senior financial adviser exists to create and protect value — allocating capital, managing risk and communicating honestly — not merely to compute numbers.",
    "Financial strategy rests on three interacting decisions — investment, financing and dividend — reconciled against the goal of maximising shareholder wealth.",
    "The economic and regulatory environment reprices every decision; scan case scenarios for rate, currency, credit and regulatory triggers.",
    "The agency problem (managers vs owners) and wider stakeholder conflicts are managed through goal congruence, corporate governance and market discipline.",
    "Ethics can override the numbers (conflicts, inducements, market abuse); integrated reporting frames value across six capitals, and behavioural biases like overconfidence and herding must be guarded against.",
  ],
}
