import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FA · Area A — Context & purpose of financial reporting.
 * The flagship exemplar chapter: this sets the depth, tone and visual bar for
 * every rich study chapter. Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const FA_A: StudyChapter = {
  paper: "FA",
  area: "A",
  title: "Context & purpose of financial reporting",
  minutes: 14,
  intro: "Before a single debit is posted, one question matters: who reads these numbers, and what decision are they making? Everything in FA is built to answer it.",
  outcomes: [
    "Explain why financial reporting exists and whose decisions it serves",
    "Identify the primary users of general purpose financial statements and their needs",
    "Distinguish financial accounting from management accounting",
    "Name the components of a set of financial statements and what each answers",
    "Explain stewardship, the role of regulation, and the accruals basis of profit",
  ],
  sections: [
    {
      id: "why",
      heading: "Why financial reporting exists",
      blocks: [
        { kind: "text", md: "Imagine you lend money to a friend's coffee shop. A year later you want to know one thing: **how is my money doing?** You can't stand behind the counter every day, so you need a report — a fair, honest summary of what the business owns, what it owes, and whether it made a profit. That is financial reporting in a sentence: it lets people **outside** a business see reliably **inside** it." },
        { kind: "text", md: "The people who rely on that view are called **users**. They never see the day-to-day running of the business, so the statements are the lens through which they judge it — and they make real decisions on what they see: to invest or not, to lend or not, to supply on credit or demand cash up front." },
        { kind: "diagram", diagram: {
          type: "radial",
          title: "The financial statements sit at the centre of many decisions",
          caption: "Each user group reads the same statements, but for a different decision.",
          data: {
            centre: "Financial statements",
            nodes: [
              { label: "Investors", sub: "buy, hold or sell shares" },
              { label: "Lenders", sub: "lend, and on what terms" },
              { label: "Suppliers", sub: "extend credit?" },
              { label: "Employees", sub: "job security & pay" },
              { label: "Customers", sub: "will they still be here?" },
              { label: "Government", sub: "tax & regulation" },
              { label: "Public", sub: "impact on the community" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one idea", md: "Financial reporting exists to give **outside** users the information they need to make **economic decisions** about a business they cannot see for themselves." },
      ],
    },
    {
      id: "users",
      heading: "The primary users — and everyone else",
      blocks: [
        { kind: "text", md: "The IASB's Conceptual Framework is deliberately specific about who comes first. The **primary users** are existing and potential **investors, lenders and other creditors** — the people who provide the business with finance and cannot demand information directly. The statements are built to serve their needs first." },
        { kind: "text", md: "Everyone else — employees, customers, suppliers wanting operational detail, government, the public — are **other users**. Their needs are real, but the statements are not tailored to them; if serving a primary user and another user conflict, the primary user wins. This is why exam questions about \"who is a primary user\" so often list a supplier, an employee or a tax authority as tempting-but-wrong options." },
        { kind: "table", caption: "What each user is really asking", head: ["User", "The decision", "What they look at"], rows: [
          ["Investor", "Buy, hold or sell?", "Profitability, growth, dividends, risk"],
          ["Lender", "Lend, and how much?", "Cash flows, gearing, ability to repay"],
          ["Supplier", "Give credit?", "Liquidity — can they pay on time?"],
          ["Employee", "Is my job safe?", "Stability and profitability"],
          ["Government", "How much tax?", "Reported profit and compliance"],
        ] },
      ],
      check: {
        q: "Which of the following is a PRIMARY user of general purpose financial statements?",
        options: [
          "A tax inspector assessing the company's corporation tax",
          "An existing shareholder deciding whether to hold or sell",
          "A journalist writing about the company",
          "A customer choosing where to shop",
        ],
        correct: 1,
        explain: "Primary users are investors, lenders and other creditors. An existing shareholder is an investor — the clearest primary user. A tax inspector, journalist and customer are all 'other users': their needs matter, but the statements are not built around them.",
      },
    },
    {
      id: "fin-vs-mgmt",
      heading: "Financial vs management accounting",
      blocks: [
        { kind: "text", md: "Two very different jobs share the word \"accounting\". **Financial accounting** looks backwards, follows external rules, and is prepared for outsiders — usually once a year. **Management accounting** looks forwards (budgets, forecasts, costings), follows no external rules, and is prepared for insiders whenever a decision needs it. FA is about the first kind." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Two kinds of accounting",
          data: {
            leftTitle: "Financial accounting",
            rightTitle: "Management accounting",
            rows: [
              { aspect: "Audience", left: "External users", right: "Internal managers" },
              { aspect: "Timing", left: "Usually annual, backward-looking", right: "Any time, forward-looking" },
              { aspect: "Rules", left: "Governed by IFRS", right: "No external rules" },
              { aspect: "Format", left: "Standardised statements", right: "Whatever aids the decision" },
              { aspect: "Purpose", left: "Stewardship & accountability", right: "Planning, control, decisions" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "In the exam, a giveaway word usually tells you which one: **\"budget\", \"forecast\", \"per unit\", \"variance\"** → management accounting. **\"annual report\", \"published\", \"IFRS\", \"shareholders\"** → financial accounting." },
      ],
    },
    {
      id: "toolkit",
      heading: "The reporting toolkit — five statements",
      blocks: [
        { kind: "text", md: "A complete set of financial statements is not one document but five parts, each answering a different question. Learn what each one **answers** and half of FA falls into place." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "A complete set of financial statements",
          data: {
            items: [
              { title: "Statement of financial position", sub: "What does it own and owe, at a point in time?" },
              { title: "Statement of profit or loss", sub: "What did it earn over the period?" },
              { title: "Statement of cash flows", sub: "Where did cash come from and go?" },
              { title: "Statement of changes in equity", sub: "How did the owners' interest move?" },
              { title: "The notes", sub: "The accounting policies and the detail behind the numbers" },
            ],
          },
        } },
        { kind: "text", md: "The position statement is a **snapshot** — a photograph taken on the last day of the year. The other statements are **films** — they cover everything that happened across the whole period. Confusing the two (a point in time vs a period) is one of the most common beginner errors." },
      ],
    },
    {
      id: "stewardship",
      heading: "Stewardship, regulation and the accruals idea",
      blocks: [
        { kind: "text", md: "Managers run a business with **other people's money**. Reporting is therefore also about **stewardship**: showing the owners how well their resources have been looked after. Because so much rides on the numbers, they are prepared to a shared rulebook — **IFRS Accounting Standards**, issued by the **IASB** — rather than however each manager fancies. National law (companies legislation) adds requirements such as audit." },
        { kind: "callout", tone: "rule", title: "The accruals basis", md: "Profit is measured on the **accruals basis**: income is recognised when it is **earned** and expenses when they are **incurred** — not when cash moves. This single rule is why profit and cash are almost never the same number." },
        { kind: "example", title: "Worked example — profit is not cash", scenario: "In December, Maya's shop sells $10,000 of goods to a customer on credit (cash due in January) and pays $3,000 of rent in cash. The goods sold had cost her $4,000. What is December's profit, and what is December's cash movement?", steps: [
          { label: "Revenue (accruals)", detail: "The sale is earned in December, even though cash arrives later → recognise $10,000 revenue." },
          { label: "Cost of sales", detail: "Match the $4,000 cost of those goods to the sale → expense $4,000." },
          { label: "Rent expense", detail: "Rent is incurred in December → expense $3,000." },
          { label: "Profit", detail: "$10,000 − $4,000 − $3,000 = $3,000 profit." },
          { label: "Cash movement", detail: "Cash in December: nothing received (credit sale) − $3,000 rent paid = −$3,000." },
        ], result: "December profit is +$3,000 but cash fell $3,000. Same month, opposite signs — because profit follows the accruals basis, not the bank balance." },
      ],
      check: {
        q: "A business sells $8,000 of goods on credit in December and receives the cash in January. Under the accruals basis, when is the revenue recognised?",
        options: [
          "In January, when the cash is received",
          "In December, when the sale is made",
          "Split equally across December and January",
          "Only once the invoice has been chased",
        ],
        correct: 1,
        explain: "Accruals means revenue is recognised when it is EARNED — the sale happened in December, so the $8,000 is December revenue. The January cash receipt affects the cash flow statement and the receivable, not when revenue is recognised.",
      },
    },
  ],
  examTraps: [
    { trap: "Calling a supplier or employee a 'primary user'.", fix: "Primary users are investors, lenders and other creditors only. Everyone else is an 'other user'." },
    { trap: "Treating the statement of financial position as covering the whole year.", fix: "It's a snapshot at ONE date. Only the P/L, cash flows and changes in equity cover the period." },
    { trap: "Assuming profit equals cash generated.", fix: "Profit is on the accruals basis; cash is on a receipts-and-payments basis. Credit sales, prepayments and depreciation all split them apart." },
    { trap: "Confusing financial and management accounting.", fix: "External + rule-bound + annual = financial. Internal + forward-looking + no external rules = management." },
  ],
  keyTerms: [
    { term: "Primary users", def: "Existing and potential investors, lenders and other creditors — the users the statements serve first." },
    { term: "Stewardship", def: "Management's accountability to owners for how the business's resources have been used." },
    { term: "Accruals basis", def: "Recognising income when earned and expenses when incurred, regardless of when cash moves." },
    { term: "IASB", def: "The International Accounting Standards Board — the body that issues IFRS Accounting Standards." },
    { term: "Going concern", def: "The assumption that the business will continue in operation for the foreseeable future." },
  ],
  summary: [
    "Financial reporting gives outside users a reliable view for economic decisions.",
    "Primary users = investors, lenders and other creditors; everyone else is an 'other user'.",
    "Financial accounting: external, rule-bound (IFRS), backward-looking. Management accounting: internal, forward-looking, no external rules.",
    "A complete set = position, profit or loss, cash flows, changes in equity, and notes.",
    "Profit uses the accruals basis — earned/incurred, not cash in/out — so profit and cash rarely match.",
  ],
}
