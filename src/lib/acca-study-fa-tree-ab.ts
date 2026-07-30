import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FA · Areas A and B — the context and purpose of financial reporting, and the
 * principles and qualitative characteristics that govern it.
 *
 * Chapters 1–5 of the FA reading tree, mapped to syllabus groups A1–A5 and B1–B2.
 *
 * FA is a RECORDING paper: almost every mark in Areas C to I is earned by putting
 * a figure in the right place with the right sign. These first five chapters are
 * the only ones that are not, and they are what stops the rest from being
 * mechanical — a candidate who cannot say why a prepayment is an asset will not
 * reliably decide which side of the ledger it belongs on.
 *
 * Structure follows the official ACCA FA/FFA study guide. All wording is ORIGINAL
 * Scholify teaching text — the approved-provider texts were used only as a
 * benchmark for structure and depth, never as a source of prose.
 */

/* ── Chapter 1 · A1, A2 ────────────────────────────────────────── */

export const FA_TREE_01: StudyChapter = {
  id: "FA-01",
  number: 1,
  paper: "FA",
  area: "A",
  title: "Business entities and the purpose of financial reporting",
  minutes: 15,
  syllabusRefs: ["A1(a)", "A1(b)", "A1(c)", "A1(d)", "A1(e)", "A2(a)"],
  intro:
    "Financial reporting exists because someone outside the business has to make a decision about it and cannot walk in and look at the books. Everything else in this paper is machinery built to serve that one fact.",
  outcomes: [
    "Define financial reporting as the recording, analysing and summarising of financial data",
    "Identify and define the sole trader, the partnership and the limited liability company",
    "Explain the legal differences between the three, and the consequences for liability and reporting",
    "State the advantages and disadvantages of operating through each structure",
    "Identify the users of financial statements and say what each one needs from them",
  ],
  sections: [
    {
      id: "what-reporting-is",
      heading: "What financial reporting actually is",
      blocks: [
        {
          kind: "definition",
          term: "Financial reporting",
          md: "The **recording**, **analysing** and **summarising** of financial data so that it can be communicated to those who need it. Three verbs, in that order — and the paper is organised around them.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The three verbs, and where each one is examined",
            caption: "Recording is Areas C–F. Summarising is Area G. Analysing is Area I.",
            data: {
              steps: [
                { label: "Record", sub: "Every transaction, as it happens" },
                { label: "Summarise", sub: "Into the financial statements" },
                { label: "Analyse", sub: "So a user can draw a conclusion" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "A transaction is recorded once, in a ledger, at the time it occurs. At the period end those ledgers are summarised into a small set of statements. Someone then reads those statements and decides something — to lend, to invest, to supply on credit, to stay in the job. If any of the three steps fails, the decision is taken on the wrong information.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why bookkeeping and accounting are not the same word",
          md: "**Bookkeeping** is the recording step: capturing transactions accurately and completely. **Accounting** takes those records and turns them into information — applying judgement about when income belongs to a period, what an asset is worth, and what a reader needs to be told. FA teaches both, and the exam is careful about which one it is asking for.",
        },
      ],
    },
    {
      id: "entity-types",
      heading: "The three types of business entity",
      blocks: [
        {
          kind: "definition",
          term: "Sole trader",
          md: "One individual in business on their own account. The business has **no separate legal existence** from the owner: its debts are the owner's debts without limit, and its profits are the owner's income.",
        },
        {
          kind: "definition",
          term: "Partnership",
          md: "Two or more people in business together, sharing capital, profits and — in a conventional partnership — **unlimited joint liability** for the firm's debts. The terms are usually set out in a partnership agreement.",
        },
        {
          kind: "definition",
          term: "Limited liability company",
          md: "A **separate legal person**, distinct from the shareholders who own it and the directors who run it. Because the company owes its own debts, a shareholder's loss is limited to the amount they agreed to pay for their shares.",
        },
        {
          kind: "table",
          caption: "The comparison the exam keeps coming back to",
          head: ["", "Sole trader", "Partnership", "Limited liability company"],
          rows: [
            ["Separate legal person", "No", "No (conventional partnership)", "**Yes**"],
            ["Owner's liability for debts", "Unlimited", "Unlimited, and joint", "**Limited** to the amount payable on the shares"],
            ["Owned by", "The proprietor", "The partners", "The shareholders"],
            ["Run by", "The proprietor", "The partners", "The **directors**, who may be different people"],
            ["Ease of formation", "Immediate, no formality", "An agreement between the partners", "Registration and constitutional documents"],
            ["Publication of accounts", "Private", "Private", "Filed publicly in most jurisdictions"],
            ["Access to capital", "Owner's funds and borrowing", "Partners' funds and borrowing", "Can issue shares to new investors"],
            ["Continuity", "Ends with the owner", "Disturbed by a partner leaving", "Continues regardless of who holds the shares"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The point that carries most of the marks",
          md: "**Limited liability is a consequence of separate legal personality, not a favour.** Because the company is its own legal person, the company's creditors have a claim against the company. Once a shareholder has paid for their shares they owe nothing more, however much the company owes. In a sole trader or a conventional partnership there is no second legal person to owe anything, so the owners owe it all personally.",
        },
        {
          kind: "illustration",
          title: "The same failure, three structures",
          md: "A business collapses owing $400,000 more than it can pay.\n\nAs a **sole trader**, the proprietor owes the $400,000 personally — the house is within reach of the creditors.\n\nAs a **partnership** of three, the partners owe it jointly; if two have nothing, the third can be pursued for the lot.\n\nAs a **limited liability company** whose shares were fully paid, the shareholders lose the value of their investment and no more; the unpaid $400,000 falls on the creditors. That reallocation of risk is precisely why the law demands that the company publish accounts — the creditors need something to look at before they extend credit.",
        },
        {
          kind: "list",
          title: "The trade-off, honestly stated",
          items: [
            "**Incorporation buys** limited liability, continuity independent of the owners, access to share capital, and — often — credibility with suppliers and lenders.",
            "**Incorporation costs** formality and expense to set up and maintain, public disclosure of results, statutory duties for directors, and a separation between ownership and control that has to be managed.",
            "**A sole trader buys** simplicity, privacy and complete control, and pays for it with unlimited liability and a ceiling on how much capital can be raised.",
          ],
        },
      ],
      check: {
        q: "A company has issued 100,000 fully paid $1 shares. It fails owing creditors $250,000 more than its assets realise. What is the shareholders' further liability?",
        options: [
          "$250,000, shared between them in proportion to their holdings",
          "Nothing further — their liability was limited to the amount payable on their shares",
          "$100,000, being the nominal value of the shares",
          "$150,000, being the shortfall less the share capital",
        ],
        correct: 1,
        explain:
          "NOTHING FURTHER. The shares are FULLY PAID, so the shareholders have already met their whole obligation; the unpaid $250,000 is the company's debt and the company is a separate legal person. Note what limited liability limits: the shareholder's liability, not the company's. The company owes the full $250,000 — it simply cannot pay it.",
      },
    },
    {
      id: "users",
      heading: "Who reads the financial statements, and what each one is looking for",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "radial",
            title: "The users of published financial statements",
            caption: "Each has a different decision to take, so each reads a different part.",
            data: {
              centre: "Financial statements",
              nodes: [
                { label: "Investors", sub: "Buy, hold or sell?" },
                { label: "Lenders", sub: "Will we be repaid?" },
                { label: "Suppliers", sub: "Do we grant credit?" },
                { label: "Customers", sub: "Will they still be here?" },
                { label: "Employees", sub: "Is the job secure?" },
                { label: "Government", sub: "Tax and statistics" },
                { label: "The public", sub: "Impact on the community" },
                { label: "Management", sub: "Running the business" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "What each user needs, and which figure they go to",
          head: ["User", "The decision", "What they look for"],
          rows: [
            ["**Investors** and potential investors", "Buy, hold or sell; how much to pay", "Profitability, dividends, risk, growth in net assets"],
            ["**Lenders** (banks, loan note holders)", "Whether to lend, and on what security", "Cash generation, existing borrowings, assets available as security, interest cover"],
            ["**Suppliers** and other trade payables", "Whether to supply on credit, and what limit", "Short-term liquidity — can they pay us in 30 days"],
            ["**Customers**", "Whether to depend on this supplier", "Continuity: will they be there to honour the warranty"],
            ["**Employees** and their representatives", "Job security, pay bargaining", "Stability, profitability, plans for the business"],
            ["**Government and its agencies**", "Tax, regulation, national statistics", "Profit measured on a consistent basis, turnover, employment"],
            ["**The public**", "Accepting the business in the community", "Environmental and social impact, local employment"],
            ["**Management**", "Running the business day to day", "Everything — and far more detail than is ever published"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How this is examined",
          md: "You will be given a user and asked what they most need, or given a need and asked whose it is. Two reliable discriminators: **lenders and suppliers care about being paid**, which means cash and liquidity rather than profit; and **management is the only user with access to more than the published statements**, which is why published accounts are prepared for the others.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "A limitation worth stating explicitly",
          md: "Published financial statements are **historic**, **summarised**, and prepared to a general purpose. They do not report the value of the workforce, the strength of the brand, the order book or the quality of management, and they are already weeks or months old when a user reads them. A conclusion drawn from them is provisional — which is exactly the point Area I develops.",
        },
      ],
      check: {
        q: "A supplier is deciding whether to increase a customer's credit limit from $20,000 to $60,000. Which information from the customer's financial statements is MOST directly relevant?",
        options: [
          "The growth in revenue over the last five years",
          "The current ratio and the trend in trade payables payment days",
          "The total of non-current assets held",
          "The dividend paid to shareholders",
        ],
        correct: 1,
        explain:
          "A supplier's decision is about being PAID IN THE SHORT TERM, so short-term liquidity and how quickly the customer settles its payables are what matter. Revenue growth is compatible with running out of cash; non-current assets cannot be used to pay next month's invoice; and the dividend tells the supplier about the shareholders' return, not about their own risk.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying limited liability means the company's liability is limited.",
      fix: "It limits the SHAREHOLDERS' liability. The company owes its debts in full — it is a separate legal person and its creditors have a claim against it.",
    },
    {
      trap: "Treating a partnership as a separate legal entity like a company.",
      fix: "A conventional partnership is not a separate legal person: the partners are liable for the firm's debts jointly and without limit.",
    },
    {
      trap: "Answering a lender's or supplier's information need with profitability.",
      fix: "Those users want to be PAID. Direct them to liquidity, cash generation and existing commitments; profit and cash are not the same thing.",
    },
    {
      trap: "Listing management as a user of the published financial statements in the same sense as the others.",
      fix: "Management has access to internal information continuously. Published statements exist for users who do NOT — which is why they are called external reporting.",
    },
    {
      trap: "Confusing bookkeeping with accounting when the question names one of them.",
      fix: "Bookkeeping records transactions; accounting analyses and summarises them into information, applying judgement. Read which word the question used.",
    },
  ],
  keyTerms: [
    { term: "Financial reporting", def: "Recording, analysing and summarising financial data so it can be communicated to those who need it." },
    { term: "Sole trader", def: "An individual in business on their own account, with no legal separation between owner and business and no limit on personal liability." },
    { term: "Partnership", def: "Two or more persons in business together sharing capital and profits, with joint and unlimited liability in a conventional partnership." },
    { term: "Limited liability company", def: "A separate legal person owned by shareholders, whose liability is limited to the amount payable on their shares." },
    { term: "Separate legal personality", def: "The principle that a company exists in law independently of its owners, so it holds its own assets and owes its own debts." },
    { term: "Users of financial statements", def: "The external parties whose decisions the statements are prepared to serve — investors, lenders, suppliers, customers, employees, government and the public." },
  ],
  summary: [
    "Financial reporting is recording, analysing and summarising financial data for those who must decide something about the business.",
    "A sole trader and a conventional partnership have no legal existence separate from their owners, so the owners' liability is unlimited.",
    "A limited liability company is a separate legal person; the shareholders' liability is limited to the amount payable on their shares, and in exchange the company reports publicly.",
    "Incorporation buys limited liability, continuity and access to share capital, at the cost of formality, disclosure and directors' duties.",
    "Each user reads for a different decision: investors for return and risk, lenders and suppliers for the ability to pay, employees for stability, government for tax.",
    "Published statements are historic, summarised and general-purpose, which bounds every conclusion drawn from them.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the three activities that make up financial reporting?", a: "Recording, analysing and summarising financial data so that it can be communicated to users." },
    { q: "Why is a shareholder's liability limited when a sole trader's is not?", a: "Because the company is a separate legal person that owes its own debts. There is no second legal person in a sole trader, so the proprietor owes everything personally." },
    { q: "Name two costs of incorporation.", a: "Public disclosure of the results, and the formality and expense of formation, statutory filing and directors' duties. Separation of ownership from control is a third." },
    { q: "Which two users are most interested in liquidity rather than profit, and why?", a: "Lenders and suppliers — their decision is whether they will be paid, and a profitable business can still run out of cash." },
    { q: "Why can management not be treated as an ordinary user of published accounts?", a: "Management has continuous access to internal information in far more detail; published statements exist for users who have no such access." },
  ],
  furtherStudy: [
    "Chapter 2 identifies the elements — asset, liability, equity, income, expense — that the statements are built from.",
    "Chapter 3 explains who sets the rules those statements must follow, and where directors' responsibility sits.",
    "Area I (chapters 30–31) returns to the users' questions and answers them with ratios.",
  ],
}

/* ── Chapter 2 · A3 ────────────────────────────────────────────── */

export const FA_TREE_02: StudyChapter = {
  id: "FA-02",
  number: 2,
  paper: "FA",
  area: "A",
  title: "The elements and the principal financial statements",
  minutes: 16,
  syllabusRefs: ["A3(a)", "A3(b)"],
  intro:
    "Five words carry the whole paper: asset, liability, equity, income, expense. Every entry you will ever make is a movement in two of them, and every statement is a summary of some of them.",
  outcomes: [
    "Say what each of the principal statements is for, and which question it answers for a user",
    "Define an asset, a liability, equity, income and an expense, and apply the definitions to given items",
    "Explain what a statement of financial position reports and what it does not",
    "Show how a period's performance feeds the position reported at the end of it",
    "Classify assets and liabilities as current or non-current",
  ],
  sections: [
    {
      id: "the-elements",
      heading: "The five elements",
      blocks: [
        {
          kind: "definition",
          term: "Asset",
          md: "A resource the entity **controls now**, arising from something that has **already happened**, and carrying the potential to produce economic benefits. Three tests — a present resource, control, a past event — and an item must pass all three.",
        },
        {
          kind: "definition",
          term: "Liability",
          md: "An obligation the entity has **now** to hand over an economic resource, arising from something that has **already happened**. The entity must have no practical ability to avoid it.",
        },
        {
          kind: "definition",
          term: "Equity",
          md: "What is left of the entity's assets once every liability has been deducted — a **residual interest**, not a resource in its own right. That is why equity moves whenever either side of the equation moves.",
        },
        {
          kind: "definition",
          term: "Income and expenses",
          md: "**Income** lifts equity by raising assets or reducing liabilities — but never counts what the owners themselves put in. **Expenses** are the mirror image: they reduce equity by lowering assets or raising liabilities, and never count what is handed back to owners.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Read the exclusions — they are where the marks are",
          md: "Income and expenses specifically EXCLUDE transactions with owners. Cash introduced by the proprietor is not income; a dividend is not an expense. Both change equity, neither goes near profit. A candidate who misses this reports the owner's own money as profit, which is the single most common conceptual error at this level.",
        },
        {
          kind: "table",
          caption: "Applying the definitions to items the exam actually uses",
          head: ["Item", "Element", "Why"],
          rows: [
            ["A machine in use", "Asset", "A controlled resource from a past purchase, with future benefit"],
            ["Rent paid for next quarter (a prepayment)", "Asset", "A right to receive a service already paid for"],
            ["Trade receivable", "Asset", "A right to receive cash from a past sale"],
            ["A skilled and loyal workforce", "**Not an asset**", "Not controlled by the entity — the staff may leave"],
            ["Electricity consumed but not yet invoiced (an accrual)", "Liability", "A present obligation from past consumption"],
            ["A bank loan", "Liability", "A present obligation to transfer cash"],
            ["An intention to buy plant next year", "**Neither**", "No past event and no present obligation — an intention is not a liability"],
            ["Share capital", "Equity", "A contribution from owners, not income"],
            ["Retained earnings", "Equity", "Accumulated profit not yet distributed"],
          ],
        },
      ],
      check: {
        q: "A company has a highly trained workforce with an unusually low resignation rate, and management estimates it would cost $2m to replace. How is this reported?",
        options: [
          "As an intangible asset of $2m",
          "It is not recognised as an asset at all",
          "As a contingent asset in the notes",
          "As an addition to equity of $2m",
        ],
        correct: 1,
        explain:
          "It is NOT RECOGNISED. An asset must be a resource CONTROLLED by the entity, and an employer does not control its employees — they can resign tomorrow. This is one of the clearest examples of a limitation of financial statements: something of obvious value to the business is simply absent from them.",
      },
    },
    {
      id: "the-statements",
      heading: "The principal statements and what each one is for",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "The set of financial statements",
            caption: "Two report a period; one reports a moment; one explains the difference in cash.",
            data: {
              items: [
                { title: "Statement of financial position", sub: "Assets, liabilities and equity AT a date" },
                { title: "Statement of profit or loss and OCI", sub: "Performance FOR a period" },
                { title: "Statement of changes in equity", sub: "Every movement in equity for the period" },
                { title: "Statement of cash flows", sub: "Where cash came from and went" },
                { title: "Notes", sub: "The detail behind the face of the statements" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "Purpose, and the question each statement answers",
          head: ["Statement", "Covers", "The user's question it answers"],
          rows: [
            ["Statement of financial position", "A **single date**", "What does the business own and owe, and what is left for the owners?"],
            ["Statement of profit or loss and other comprehensive income", "A **period**", "How did it perform — did it make money, and from what?"],
            ["Statement of changes in equity", "A **period**", "How did the owners' interest move, and how much of that was profit rather than a transaction with owners?"],
            ["Statement of cash flows", "A **period**", "Where did the cash actually come from and go?"],
            ["Notes to the financial statements", "Both", "What policies, detail and uncertainty lie behind the headline figures?"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Position is a photograph; performance is a film",
          md: "The statement of financial position is drawn up **as at** a date and is out of date the following morning. The statement of profit or loss covers a period **ended** on that date. Getting the two prepositions right is worth marks on its own, and it explains why the exam asks for inventory \"at\" the year end but cost of sales \"for\" the year.",
        },
      ],
    },
    {
      id: "how-they-link",
      heading: "How the statements link together",
      blocks: [
        {
          kind: "formula",
          name: "The accounting equation",
          expr: "Assets − Liabilities = Equity",
          note: "Equivalently: Assets = Equity + Liabilities. Chapter 7 develops it into the mechanism of double entry.",
        },
        {
          kind: "formula",
          name: "The link between the two main statements",
          expr: "Closing equity = Opening equity + Profit or loss + Other comprehensive income + Capital introduced − Distributions to owners",
        },
        {
          kind: "example",
          title: "Following one year through both statements",
          scenario:
            "Marlow Co begins the year with net assets of $310,000, made up of share capital $100,000 and retained earnings $210,000. During the year it makes a profit for the year of $84,000, revalues its property upward by $30,000 (reported in other comprehensive income), issues shares for $50,000 cash and pays a dividend of $22,000.",
          steps: [
            { label: "Start from opening equity", detail: "Share capital $100,000 + retained earnings $210,000 = $310,000, which equals opening net assets." },
            { label: "Add the period's performance", detail: "Profit for the year $84,000 and other comprehensive income $30,000 — both increase equity, and both are reported within total comprehensive income for the year." },
            { label: "Add transactions with owners", detail: "Shares issued $50,000 increases equity but is NOT income; the dividend of $22,000 reduces equity but is NOT an expense. Both belong in the statement of changes in equity." },
            { label: "Arrive at closing equity", detail: "$310,000 + $84,000 + $30,000 + $50,000 − $22,000 = $452,000." },
            { label: "Cross-check against the position statement", detail: "Closing net assets in the statement of financial position must also be $452,000. If they are not, something has been recorded on one side only." },
          ],
          result:
            "Closing equity is $452,000, of which retained earnings are $210,000 + $84,000 − $22,000 = $272,000, share capital is $150,000 and the revaluation surplus is $30,000. The check that matters: closing equity per the movement above and closing net assets per the statement of financial position are the SAME number, and the $50,000 share issue and $22,000 dividend never touched profit.",
        },
        {
          kind: "list",
          style: "number",
          title: "Current or non-current — the classification behind every statement of financial position",
          items: [
            "An asset is **current** if it is cash, or is expected to be realised or consumed within twelve months or the entity's normal operating cycle — inventory, receivables, prepayments, cash.",
            "Everything else is **non-current** — property, plant and equipment, intangibles, long-term investments.",
            "A liability is **current** if it falls due within twelve months — trade payables, accruals, the bank overdraft, tax payable, the portion of a loan repayable within a year.",
            "A liability is **non-current** if settlement is due later — the remainder of a bank loan, loan notes, long-term provisions.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The split loan",
          md: "A five-year loan repayable in equal annual instalments is **not** wholly non-current. The instalment due within twelve months is a current liability and the rest is non-current. The exam sets this deliberately, and the whole mark is in splitting it.",
        },
      ],
      check: {
        q: "A sole trader's business has opening capital of $60,000. During the year the owner introduces $15,000, withdraws $9,000, and the business makes a profit of $24,000. What is closing capital?",
        options: ["$90,000", "$84,000", "$99,000", "$75,000"],
        correct: 0,
        explain:
          "$60,000 + $15,000 introduced + $24,000 profit − $9,000 withdrawn = $90,000. Note that the capital introduced is NOT income and the drawings are NOT an expense — neither appears in profit, and both change capital. Profit of $24,000 has already been arrived at without them.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Recognising a valuable workforce, brand or customer list built up internally as an asset.",
      fix: "An asset must be CONTROLLED as a result of a PAST EVENT. Staff can resign and internally generated goodwill is not recognised — which is a stated limitation of the statements, not an oversight.",
    },
    {
      trap: "Treating capital introduced as income, or drawings and dividends as expenses.",
      fix: "The definitions of income and expenses exclude transactions with owners. Both go to equity, via the statement of changes in equity, and never through profit.",
    },
    {
      trap: "Reporting the whole of a multi-year loan as non-current.",
      fix: "Split it: the amount repayable within twelve months is a current liability, the remainder is non-current.",
    },
    {
      trap: "Calling an intention or a plan a liability.",
      fix: "A liability needs a PRESENT obligation arising from a PAST event, which the entity has no practical ability to avoid. A board decision to spend next year is neither.",
    },
    {
      trap: "Describing the statement of financial position as covering the year.",
      fix: "It is prepared AS AT a date. Only the profit or loss, changes in equity and cash flow statements cover a PERIOD.",
    },
  ],
  keyTerms: [
    { term: "Asset", def: "A resource the entity controls now, arising from a past event, with the potential to produce economic benefits." },
    { term: "Liability", def: "An obligation the entity has now to hand over an economic resource, arising from a past event and unavoidable in practice." },
    { term: "Equity", def: "What remains of the entity's assets once all its liabilities have been deducted — a residual, not a resource." },
    { term: "Income", def: "Anything that lifts equity by raising assets or reducing liabilities, apart from what the owners themselves contribute." },
    { term: "Expense", def: "Anything that reduces equity by lowering assets or raising liabilities, apart from what is distributed to owners." },
    { term: "Current asset", def: "Cash, or an asset expected to be realised or consumed within twelve months or the normal operating cycle." },
    { term: "Statement of changes in equity", def: "The statement reporting every movement in equity for the period, separating performance from transactions with owners." },
  ],
  summary: [
    "Every entry in this paper is a movement in two of five elements: asset, liability, equity, income, expense.",
    "An asset requires control arising from a past event; a liability requires a present unavoidable obligation from a past event.",
    "Equity is a residual — assets less liabilities — so it moves whenever either side moves.",
    "Income and expenses exclude transactions with owners, so capital introduced, drawings and dividends never appear in profit.",
    "The statement of financial position reports a date; profit or loss, changes in equity and cash flows report a period.",
    "Closing equity equals opening equity plus profit and other comprehensive income, plus capital introduced, less distributions.",
    "Assets and liabilities are split current and non-current, and a loan repayable by instalments is split across both.",
  ],
  knowledgeDiagnostic: [
    { q: "State the three tests an item must pass to be an asset.", a: "It must be a present economic resource, controlled by the entity, arising from a past event — with potential to produce economic benefits." },
    { q: "Why is a dividend not an expense?", a: "The definition of an expense excludes distributions to owners. A dividend reduces equity directly and appears in the statement of changes in equity." },
    { q: "Write the accounting equation in both of its usual forms.", a: "Assets − Liabilities = Equity, or equivalently Assets = Equity + Liabilities." },
    { q: "How is a five-year loan repayable in equal instalments presented?", a: "Split: the instalment due within twelve months as a current liability, the balance as non-current." },
    { q: "Which statement reconciles opening to closing equity, and why is it needed?", a: "The statement of changes in equity — because equity moves for two quite different reasons, performance and transactions with owners, and users need them separated." },
  ],
  furtherStudy: [
    "Chapter 7 turns the accounting equation into the mechanics of double entry.",
    "Chapters 24–25 prepare the statements in full, in the format the exam marks.",
    "FR develops the same definitions through the Conceptual Framework and applies them to harder recognition problems.",
  ],
}

/* ── Chapter 3 · A4, A5 ────────────────────────────────────────── */

export const FA_TREE_03: StudyChapter = {
  id: "FA-03",
  number: 3,
  paper: "FA",
  area: "A",
  title: "The regulatory framework and governance",
  minutes: 14,
  syllabusRefs: ["A4(a)", "A4(b)", "A5(a)", "A5(b)"],
  intro:
    "If every entity chose its own rules, no two sets of accounts could be compared and none could be trusted. This chapter is about who writes the rules, and who is answerable for applying them.",
  outcomes: [
    "Explain the purpose and objectives of the regulatory system for financial reporting",
    "Distinguish the roles of the IFRS Foundation, the Board, the IFRS Advisory Council, the Interpretations Committee and the ISSB",
    "Explain the role of IFRS Accounting Standards in preparing financial statements",
    "Explain what governance means in the context of preparing financial statements",
    "Describe the duties and responsibilities of directors for the financial statements",
  ],
  sections: [
    {
      id: "why-regulate",
      heading: "Why financial reporting is regulated at all",
      blocks: [
        {
          kind: "list",
          title: "What regulation is trying to achieve",
          items: [
            "**Comparability** — two entities' statements can be read against each other, and one entity's this year against last year.",
            "**Credibility** — a user who cannot inspect the books needs a reason to rely on them.",
            "**A floor on disclosure** — the preparer cannot simply omit what is unflattering.",
            "**Reduced scope for manipulation** — where a standard prescribes the treatment, the result does not depend on the preparer's preference.",
            "**Efficient capital markets** — capital flows to where it earns the best return only if the reported numbers mean the same thing everywhere.",
          ],
        },
        {
          kind: "text",
          md: "Regulation comes from more than one direction at once: company law sets out what must be prepared and filed, accounting standards set out how transactions are measured and presented, and — for listed entities — market rules add further requirements. FA examines the standard-setting structure.",
        },
      ],
    },
    {
      id: "who-sets-the-rules",
      heading: "The standard-setting structure",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "pyramid",
            title: "The IFRS Foundation structure",
            caption: "Oversight above, standard-setting in the middle, support alongside.",
            data: {
              levels: [
                { label: "IFRS Foundation", sub: "Oversight, governance, funding and appointments" },
                { label: "The Board (IASB) · the ISSB", sub: "The two standard-setting boards" },
                { label: "IFRS Interpretations Committee · IFRS Advisory Council", sub: "Consistent application, and advice on the agenda" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "Who does what — the distinction the exam tests",
          head: ["Body", "Role"],
          rows: [
            ["**IFRS Foundation**", "The oversight body. It governs the structure, appoints members, secures funding and holds the boards accountable. It does **not** write standards."],
            ["**The International Accounting Standards Board (the Board)**", "**Issues IFRS Accounting Standards** and amendments, following its due process of consultation."],
            ["**The International Sustainability Standards Board (ISSB)**", "**Issues IFRS Sustainability Disclosure Standards** — sustainability-related financial disclosures for the same investor audience."],
            ["**IFRS Interpretations Committee**", "Addresses questions where a standard is being applied inconsistently or a new issue is unclear, and issues interpretations."],
            ["**IFRS Advisory Council**", "Advises the Foundation and the Board on the agenda, priorities and views of interested parties. **Advisory only** — it has no power to issue anything."],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The two confusions the examiner sets",
          md: "**The Foundation does not issue standards — the Board does.** Oversight and standard-setting are deliberately separate.\n\n**The Advisory Council advises and the Interpretations Committee interprets.** Neither issues a standard, and only one of them deals with application problems.",
        },
        {
          kind: "definition",
          term: "IFRS Accounting Standards",
          md: "The requirements that determine how transactions and balances are **recognised**, **measured**, **presented** and **disclosed**. Where a standard applies, it is followed; a policy chosen by the preparer is only available where the standards leave a genuine choice or are silent.",
        },
        {
          kind: "illustration",
          title: "What a standard actually decides for you",
          md: "A company buys a machine for $50,000 with a five-year life and no residual value.\n\nWithout standards, the preparer could charge the whole $50,000 in year one, spread it over ten years, or leave it as an asset indefinitely — three profit figures for the same machine.\n\nWith standards, the cost is capitalised and depreciated systematically over the period the asset is used, the method must reflect the pattern of consumption, and the choice made must be disclosed and applied consistently. Two companies with identical machines then report comparable results, which is what the user was promised.",
        },
      ],
      check: {
        q: "Which body issues IFRS Accounting Standards?",
        options: [
          "The IFRS Foundation",
          "The IFRS Advisory Council",
          "The International Accounting Standards Board",
          "The IFRS Interpretations Committee",
        ],
        correct: 2,
        explain:
          "The BOARD (IASB) issues IFRS Accounting Standards. The Foundation is the OVERSIGHT body — it governs the structure and appoints members but writes nothing. The Advisory Council advises on priorities, and the Interpretations Committee deals with inconsistent application of standards that already exist.",
      },
    },
    {
      id: "governance",
      heading: "Governance and the directors' responsibilities",
      blocks: [
        {
          kind: "definition",
          term: "Governance, in the reporting context",
          md: "The arrangements by which those charged with running an entity are held accountable for the financial statements — who prepares them, who approves them, who oversees that process, and to whom they answer.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The distinction that carries the marks",
          md: "**The financial statements are the DIRECTORS' responsibility**, not the auditor's. The directors prepare and approve them; an auditor forms an independent opinion on them. A candidate who attributes preparation to the auditor loses the mark, and the answer is the same however small the company.",
        },
        {
          kind: "list",
          style: "number",
          title: "What the directors are responsible for",
          items: [
            "**Keeping adequate accounting records** that show and explain the entity's transactions and disclose its position with reasonable accuracy.",
            "**Preparing financial statements** that give a faithful presentation of the entity's position and performance, in accordance with the applicable framework.",
            "**Selecting suitable accounting policies** and applying them consistently, and making judgements and estimates that are reasonable.",
            "**Assessing going concern**, and saying so where there is material uncertainty about the entity's ability to continue.",
            "**Safeguarding the assets** and establishing internal controls to prevent and detect fraud and error.",
            "**Approving and signing** the statements, and filing them where the law requires.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Directors run a company they do not own",
          md: "In a company, ownership and control are separated: shareholders own, directors control. That separation is the reason both external reporting and governance requirements exist — the owners need an account of what was done with their money from the people who did it. A sole trader has no such problem, and no such duty.",
        },
      ],
      check: {
        q: "Who is responsible for preparing a company's financial statements, and who reports an independent opinion on them?",
        options: [
          "The auditor prepares them; the directors report on them",
          "The directors prepare them; the auditor reports an opinion on them",
          "The Board (IASB) prepares them; the directors approve them",
          "The shareholders prepare them; the auditor approves them",
        ],
        correct: 1,
        explain:
          "The DIRECTORS prepare and approve the financial statements; the AUDITOR gives an independent opinion on them. This never reverses. The directors' related duties are to keep adequate records, choose suitable policies, assess going concern and safeguard the assets.",
      },
    },
    {
      id: "how-a-standard-is-made",
      heading: "How a standard comes into being, and what else regulates reporting",
      blocks: [
        {
          kind: "text",
          md: "A standard is not simply announced. The Board follows a public **due process**, and that process is the reason standards command the authority they do — every interested party has had the chance to object before the requirement becomes binding.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The Board's due process, simplified",
            caption: "Public consultation at two stages, which is what makes the outcome defensible.",
            data: {
              steps: [
                { label: "Agenda", sub: "An issue is added, often on the Advisory Council's advice" },
                { label: "Research", sub: "The problem and existing practice are examined" },
                { label: "Discussion paper", sub: "Published for comment" },
                { label: "Exposure draft", sub: "The proposed standard, published for comment" },
                { label: "Deliberation", sub: "Comments considered and the draft revised" },
                { label: "Standard issued", sub: "With an effective date" },
              ],
            },
          },
        },
        {
          kind: "list",
          title: "The three layers that regulate a company's reporting",
          items: [
            "**Company law** — requires that accounts be prepared, filed and, for many entities, audited; imposes duties on directors and sets out what must be kept.",
            "**Accounting standards** — decide how transactions are recognised, measured, presented and disclosed. This is the layer FA examines.",
            "**Market rules**, for listed entities — additional requirements on interim reporting, timeliness and governance disclosures, imposed by the exchange or the securities regulator.",
          ],
        },
        {
          kind: "definition",
          term: "A principles-based framework",
          md: "IFRS Accounting Standards set out **principles** and require judgement in applying them, rather than attempting a rule for every fact pattern. The advantage is that the principle covers transactions nobody anticipated; the cost is that two preparers can reach different answers in good faith — which is why **disclosure of the policy chosen** matters so much.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "What this means for an exam answer",
          md: "When a question gives an unusual transaction and no obvious rule, go back to the **definitions** and the **principles**: is there an asset? is there a present obligation? where do the risks and rewards sit? A principles-based framework is precisely what makes that approach the right one, and it is how the examiner expects an unfamiliar scenario to be tackled.",
        },
      ],
      check: {
        q: "At which stage of the Board's due process are the actual proposed requirements published for public comment?",
        options: ["The research stage", "The discussion paper", "The exposure draft", "The effective date"],
        correct: 2,
        explain:
          "The EXPOSURE DRAFT sets out the proposed requirements for comment. A discussion paper comes earlier and explores the problem rather than proposing the answer; research precedes both; and the effective date simply states when the finished standard bites. Two public consultation stages are what give the final standard its authority.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying the IFRS Foundation issues accounting standards.",
      fix: "The Foundation OVERSEES. The Board (IASB) issues IFRS Accounting Standards; the ISSB issues sustainability disclosure standards.",
    },
    {
      trap: "Confusing the Advisory Council with the Interpretations Committee.",
      fix: "The Advisory Council ADVISES on priorities and has no power to issue anything. The Interpretations Committee addresses inconsistent or unclear APPLICATION of existing standards.",
    },
    {
      trap: "Attributing preparation of the financial statements to the auditor.",
      fix: "The directors prepare and approve them. The auditor independently reports an opinion — a separate role, and stating it correctly is worth the mark.",
    },
    {
      trap: "Listing only preparation among the directors' duties.",
      fix: "They must also keep adequate records, select and consistently apply suitable policies, assess going concern, and safeguard assets against fraud and error.",
    },
    {
      trap: "Assuming regulation exists mainly to raise tax.",
      fix: "Its objects are comparability, credibility, a disclosure floor, less scope for manipulation and efficient capital markets. Tax follows its own rules.",
    },
  ],
  keyTerms: [
    { term: "IFRS Foundation", def: "The oversight body that governs the standard-setting structure, appoints members and secures funding; it does not issue standards." },
    { term: "The Board (IASB)", def: "The board that issues IFRS Accounting Standards and their amendments following public due process." },
    { term: "ISSB", def: "The International Sustainability Standards Board, which issues IFRS Sustainability Disclosure Standards for investors." },
    { term: "IFRS Interpretations Committee", def: "The body that addresses unclear or inconsistent application of existing standards and issues interpretations." },
    { term: "IFRS Advisory Council", def: "The advisory forum that gives the Foundation and the Board views on the agenda and priorities, with no power to issue standards." },
    { term: "Governance (reporting context)", def: "The arrangements by which those running an entity are held accountable for preparing, approving and reporting the financial statements." },
  ],
  summary: [
    "Regulation exists to make statements comparable and credible, to floor disclosure and to limit manipulation.",
    "The IFRS Foundation oversees; the Board issues IFRS Accounting Standards; the ISSB issues sustainability disclosure standards.",
    "The Interpretations Committee resolves inconsistent application; the Advisory Council advises on priorities and issues nothing.",
    "Standards decide recognition, measurement, presentation and disclosure, which is what makes two entities' results comparable.",
    "The directors — not the auditor — prepare and approve the financial statements.",
    "Directors must also keep adequate records, apply suitable policies consistently, assess going concern and safeguard the assets.",
  ],
  knowledgeDiagnostic: [
    { q: "Which body oversees, and which body sets accounting standards?", a: "The IFRS Foundation oversees; the Board (IASB) sets IFRS Accounting Standards." },
    { q: "What does the ISSB issue, and for whom?", a: "IFRS Sustainability Disclosure Standards — sustainability-related financial disclosures for the same investor audience as the accounting standards." },
    { q: "A standard is being applied two different ways by two entities. Which body deals with that?", a: "The IFRS Interpretations Committee, which addresses inconsistent or unclear application of existing standards." },
    { q: "Name four directors' responsibilities in relation to the financial statements.", a: "Keeping adequate accounting records; preparing statements that faithfully present position and performance; selecting and consistently applying suitable policies; assessing going concern. Safeguarding assets and approving the statements are two more." },
    { q: "Why does the separation of ownership from control matter to reporting?", a: "Shareholders own but do not run the company, so they need an account from those who do — which is the reason external reporting and governance requirements exist." },
  ],
  furtherStudy: [
    "Chapters 4 and 5 give the principles and qualitative characteristics the standards are built on.",
    "AA examines the auditor's side of this relationship, and SBL the governance framework in depth.",
  ],
}

/* ── Chapter 4 · B1 ────────────────────────────────────────────── */

export const FA_TREE_04: StudyChapter = {
  id: "FA-04",
  number: 4,
  paper: "FA",
  area: "B",
  title: "Accounting principles and concepts",
  minutes: 17,
  syllabusRefs: ["B1(a)"],
  intro:
    "Ten principles decide almost every judgement call in this paper. Learn them as rules you apply, not as a list you recite — the exam gives you a transaction and asks which one governs it.",
  outcomes: [
    "Define and apply going concern, accruals, materiality, offsetting, consistency and prudence",
    "Define and apply duality, the business entity concept, historical cost and current value, and substance over form",
    "Identify which principle governs a given accounting treatment",
    "Explain the consequences of abandoning the going concern assumption",
    "Distinguish prudence from deliberate understatement",
  ],
  sections: [
    {
      id: "going-concern-accruals",
      heading: "The two assumptions everything else rests on",
      blocks: [
        {
          kind: "definition",
          term: "Going concern",
          md: "Statements are drawn up on the footing that the business will **still be trading for the foreseeable future** — that it neither intends nor is forced to wind itself up or cut its operations back materially.",
        },
        {
          kind: "definition",
          term: "Accruals accounting (the accruals basis)",
          md: "Transactions are recognised **in the period in which they occur**, not in the period in which cash is received or paid. Income is matched to the period it was earned in; expenses to the period whose benefit they relate to.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why going concern changes the numbers, not just the wording",
          md: "On a going concern basis, non-current assets are carried at cost less depreciation, because the business will use them up in operations. If the entity is NOT a going concern, that basis is wrong: assets fall to be measured at what they would fetch in a forced sale, the current/non-current split loses meaning, and further liabilities such as redundancy costs may arise. Abandoning the assumption is one of the few things that rewrites a whole set of statements.",
        },
        {
          kind: "illustration",
          title: "Accruals accounting in one invoice",
          md: "A business receives an electricity bill for $1,800 covering the three months to 31 January, and its year end is 31 December.\n\nTwo of the three months — $1,200 — were consumed in the year just ended. Under the accruals basis, $1,200 is an expense of the year and a liability at the year end, even though nothing has been paid and the invoice is dated after the year end. The remaining $600 belongs to the next year.\n\nA cash-basis answer would report the whole $1,800 next year, understating this year's costs and overstating next year's. That is why the accruals basis exists, and it is the mechanism chapter 16 works through in detail.",
        },
      ],
      check: {
        q: "A company will cease trading in three months and its assets will be sold individually. What is the main consequence for its financial statements?",
        options: [
          "Only a note is required; the figures are unchanged",
          "Assets can no longer be carried on a going concern basis and must be remeasured to their expected recoverable amounts",
          "The statements must be prepared on the cash basis",
          "Depreciation must be charged at twice the normal rate",
        ],
        correct: 1,
        explain:
          "The going concern ASSUMPTION no longer holds, so measurement changes: assets are written down to what they will actually realise, the current/non-current distinction loses its meaning and additional liabilities such as closure costs may be recognised. Going concern is an assumption about measurement, not a disclosure point — which is why losing it rewrites the statements.",
      },
    },
    {
      id: "the-eight",
      heading: "The remaining principles, and the transaction each one decides",
      blocks: [
        {
          kind: "table",
          caption: "Each principle, stated as the rule you apply",
          head: ["Principle", "What it requires", "A transaction it decides"],
          rows: [
            ["**Materiality**", "Information is material if omitting or misstating it could influence a user's decision. Immaterial items need not be reported separately.", "A $40 stapler with a five-year life is expensed rather than capitalised and depreciated"],
            ["**Offsetting**", "Assets and liabilities, and income and expenses, are **not** netted off unless a standard requires or permits it.", "A $30,000 receivable from a customer is not netted against a $12,000 payable to the same party without a right of set-off"],
            ["**Consistency**", "The same treatment is applied to like items from period to period, so figures can be compared over time.", "A depreciation method is not switched from straight line to reducing balance to flatter one year's profit"],
            ["**Prudence**", "Caution in exercising judgement under uncertainty: do not overstate assets or income, or understate liabilities or expenses.", "An allowance is made against doubtful receivables; a probable loss is provided for"],
            ["**Duality (dual aspect)**", "Every transaction has two effects of equal amount and opposite direction on the accounting equation.", "Buying $5,000 of inventory on credit raises assets and liabilities equally"],
            ["**Business entity**", "The business is accounted for separately from its owner, whatever the legal position.", "The proprietor's private car and personal grocery bills stay out of the business's accounts"],
            ["**Historical cost and current value**", "Items may be measured at the amount originally paid, or at a current amount such as fair value; the basis chosen is disclosed.", "Property carried at cost less depreciation, or revalued to fair value under a revaluation policy"],
            ["**Substance over form**", "Report the commercial reality of a transaction, not merely its legal wrapper.", "A sale with an obligation to buy the same goods back at a fixed price is accounted for as a loan secured on inventory, not as a sale"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Prudence is caution, not pessimism",
          md: "Prudence permits — indeed requires — caution where the outcome is uncertain. It does **not** permit deliberately understating an asset or creating a provision that is not needed in order to hold profit back for a worse year. That is not prudence; it is misstatement in the other direction, and it fails faithful representation just as badly as overstatement.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Materiality cuts both ways",
          md: "Materiality is not a licence to ignore small numbers. A $500 error is immaterial in a business with revenue of $40m and material in one with revenue of $60,000 — it depends on size relative to the user's decision. And some items are material because of their NATURE whatever their size: a director's remuneration, or a small fraud.",
        },
        {
          kind: "example",
          title: "Applying the business entity concept",
          scenario:
            "Devi runs a design studio as a sole trader. During the month she pays $3,200 from the business bank account for studio rent, $900 for her own family's holiday, and $1,400 for a laptop she uses four days a week for client work and at weekends for personal use. She also uses $260 of business stationery for her son's school fundraiser.",
          steps: [
            { label: "Studio rent $3,200", detail: "A business expense in full. Recorded as rent expense." },
            { label: "Family holiday $900", detail: "Not a business cost at all. The business entity concept requires it to be treated as DRAWINGS — a reduction in capital, not an expense." },
            { label: "Laptop $1,400", detail: "Used substantially in the business, so recognised as an asset and depreciated. Any material private use element is treated as drawings; at this level the exam will tell you the split if it wants one." },
            { label: "Stationery $260 for the fundraiser", detail: "A private benefit taken out of the business, so drawings again — even though no cash left the bank." },
            { label: "Recheck the effect on profit", detail: "Only the rent, and the depreciation on the laptop, reduce profit. The $900 and the $260 reduce capital without touching profit." },
          ],
          result:
            "The month's expenses are $3,200 of rent plus laptop depreciation; drawings are $1,160. The check that matters: drawings never appear in the statement of profit or loss, so a candidate who expensed the holiday would understate profit by $900 AND overstate capital by the same amount — the classic double-sided consequence of ignoring the business entity concept.",
        },
      ],
      check: {
        q: "A business sells goods to a finance company for $80,000 and is obliged to repurchase them in six months for $86,000, retaining possession throughout. Which principle determines the treatment, and what is it?",
        options: [
          "Prudence — recognise the $80,000 as revenue but provide for the repurchase",
          "Substance over form — treat it as a loan of $80,000 secured on the inventory, with $6,000 finance cost",
          "Consistency — treat it the same way as ordinary sales",
          "Materiality — the amount is small so revenue recognition is acceptable",
        ],
        correct: 1,
        explain:
          "SUBSTANCE OVER FORM. The legal form is a sale, but the commercial reality is borrowing: the goods never leave, the risks stay with the seller, and a fixed price is payable back six months later. So no revenue is recognised, the inventory stays on the statement of financial position, an $80,000 liability is recorded, and the $6,000 difference is a finance cost.",
      },
    },
    {
      id: "principles-in-conflict",
      heading: "When two principles point different ways",
      blocks: [
        {
          kind: "text",
          md: "The principles are not a checklist to be applied one at a time. In a real scenario several bear on the same transaction, and occasionally they pull against each other — which is where the examinable judgement lies.",
        },
        {
          kind: "table",
          caption: "The tensions the exam builds scenarios around",
          head: ["Tension", "How it is resolved"],
          rows: [
            ["**Prudence** against **neutrality**", "Prudence permits caution under uncertainty; it does not permit slanting a figure. Where the two appear to conflict, the estimate must still be the best available, not the most cautious available."],
            ["**Accruals** against **prudence**", "The accruals basis recognises income when earned — but not where recovery is doubtful. So revenue is recognised and an allowance made against the receivable, rather than the sale being omitted."],
            ["**Materiality** against **completeness**", "Materiality allows immaterial items to go unreported separately; it never allows a material item to be omitted, and some items are material by nature whatever their size."],
            ["**Consistency** against **relevance**", "Consistency is not a bar to changing a policy where the new one gives more relevant information — but the change and its effect must be disclosed."],
            ["**Substance** against **legal form**", "Substance wins. The reporting follows where the risks and rewards actually sit."],
          ],
        },
        {
          kind: "activity",
          title: "Activity — name the governing principle",
          prompt:
            "For each of the following, say which principle governs the treatment and what the treatment is.\n\n1) A business has spent $18,000 on a marketing campaign it hopes will bring customers over the next three years.\n2) A customer owing $30,000 is in financial difficulty; the business expects to recover about half.\n3) The proprietor's son works unpaid in the shop each weekend.\n4) A machine's market value has risen, and the directors wish to stop depreciating it.\n5) A supplier's invoice for $210 has been mislaid and the amount is unknown at the year end.",
          answer:
            "1) **Accruals, and the definition of an asset.** There is no controlled resource — the benefit is a hope, not a right — so the $18,000 is an expense of the period. Deferring it as an asset because a benefit is expected is the error.\n\n2) **Prudence.** The sale stands and the receivable stays on the books; an allowance is made for the doubtful half. Prudence does not require the whole balance to be written off, because the claim has not failed.\n\n3) **Business entity, and measurement.** No cost has been incurred by the business, so nothing is recorded. The value of the unpaid labour is real but unmeasurable and uncontrolled — a limitation of the statements, not an omission.\n\n4) **Depreciation is an allocation, not a valuation** (an application of accruals). The charge continues for as long as the asset is in use; a rising market value is irrelevant. If the directors want the value in the accounts they must revalue the asset AND keep depreciating the revalued amount.\n\n5) **Accruals with materiality.** The cost was incurred, so it is accrued at the best estimate available. That the exact amount is unknown does not justify omission — an estimated accrual is preferable to a known understatement, and $210 is in any case likely to be immaterial to the disclosure decision while still belonging in the figures.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The habit to build",
          md: "Ask three questions of any unfamiliar transaction. **Whose period does it belong to?** (accruals) **Is there really an asset or an obligation?** (the definitions) **Where do the risks and rewards sit?** (substance). Those three settle the large majority of judgement calls in this paper, and they are the reasoning the examiner is looking for when no rule obviously applies.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Treating going concern as a disclosure issue only.",
      fix: "It is a MEASUREMENT assumption. Lose it and assets must be remeasured to recoverable amounts and further liabilities may arise.",
    },
    {
      trap: "Using prudence to justify an excessive provision or a deliberately low asset figure.",
      fix: "Prudence is caution under uncertainty, not understatement. Creating profit-smoothing provisions fails faithful representation.",
    },
    {
      trap: "Netting a receivable against a payable for the same party without a right of set-off.",
      fix: "The offsetting principle prohibits it. Report both gross unless a standard permits offset or a legal right of set-off exists.",
    },
    {
      trap: "Recording the owner's private expenditure as a business expense.",
      fix: "The business entity concept makes it DRAWINGS: a reduction in capital, never an expense, so profit is unaffected.",
    },
    {
      trap: "Answering \"substance over form\" questions from the legal documentation.",
      fix: "Ask where the risks and rewards actually sit. A sale-and-repurchase at a fixed price is financing, whatever the contract is titled.",
    },
    {
      trap: "Treating materiality as a fixed money threshold.",
      fix: "It is relative to the entity and to the user's decision, and some items are material by NATURE whatever their size.",
    },
  ],
  keyTerms: [
    { term: "Going concern", def: "The assumption that the entity will continue in operation for the foreseeable future, with no intention or need to liquidate or materially curtail operations." },
    { term: "Accruals basis", def: "Recognising transactions in the period in which they occur rather than when cash moves." },
    { term: "Materiality", def: "Information is material if omitting or misstating it could influence a user's decision; immateriality is judged relative to the entity and can turn on nature as well as size." },
    { term: "Offsetting", def: "The principle that assets and liabilities, and income and expenses, are reported gross unless a standard requires or permits netting." },
    { term: "Prudence", def: "Caution in judging an uncertain outcome, so that neither assets nor income are pitched too high, and neither liabilities nor expenses too low." },
    { term: "Duality (dual aspect)", def: "Every transaction has two equal and opposite effects on the accounting equation." },
    { term: "Business entity concept", def: "The business is accounted for as an entity separate from its owner, whatever the legal position." },
    { term: "Substance over form", def: "Transactions are reported according to their commercial reality rather than their legal form." },
  ],
  summary: [
    "Going concern and the accruals basis are the two assumptions the rest of the paper depends on.",
    "Losing going concern changes measurement, not just disclosure: assets fall to recoverable amounts and new liabilities may arise.",
    "The accruals basis puts income and expenses in the period they belong to, whatever the cash does.",
    "Materiality is relative to the entity and the decision, and some items are material by nature.",
    "Offsetting is prohibited unless permitted; consistency keeps periods comparable; prudence is caution, never understatement.",
    "Duality gives double entry its two equal and opposite effects; the business entity concept sends the owner's private spending to drawings.",
    "Substance over form asks where the risks and rewards really sit, not what the contract is called.",
  ],
  knowledgeDiagnostic: [
    { q: "What changes in the financial statements if the going concern assumption fails?", a: "Measurement: assets are written down to expected recoverable amounts, the current/non-current split loses meaning, and additional liabilities such as closure costs may be recognised." },
    { q: "State the accruals basis in one sentence.", a: "Transactions are recognised in the period in which they occur rather than in the period in which cash is received or paid." },
    { q: "Where is the line between prudence and misstatement?", a: "Prudence is caution under genuine uncertainty. Deliberately understating an asset or over-providing to hold profit back is misstatement, and fails faithful representation." },
    { q: "How is the owner's private expenditure paid from the business account treated?", a: "As drawings — a reduction in capital. It never appears as an expense, so profit is unaffected." },
    { q: "A business sells goods and must buy them back at a fixed price, keeping possession. Which principle applies and what is the treatment?", a: "Substance over form: it is financing, so no revenue is recognised, the inventory stays, a liability is recorded and the price difference is a finance cost." },
  ],
  furtherStudy: [
    "Chapter 5 sets these principles alongside the qualitative characteristics of useful information.",
    "Chapters 11–19 are the principles in action: accruals, prudence and substance decide almost every adjustment.",
  ],
}

/* ── Chapter 5 · B2 ────────────────────────────────────────────── */

export const FA_TREE_05: StudyChapter = {
  id: "FA-05",
  number: 5,
  paper: "FA",
  area: "B",
  title: "Qualitative characteristics of useful financial information",
  minutes: 13,
  syllabusRefs: ["B2(a)"],
  intro:
    "Two characteristics decide whether information is useful at all. Four more decide how useful it is. Knowing which group a characteristic belongs to is half of what this topic examines.",
  outcomes: [
    "Define relevance and faithful representation, and explain why they are fundamental",
    "Define comparability, verifiability, timeliness and understandability, and explain why they are enhancing",
    "Apply the characteristics to decide whether given information is useful",
    "Explain the trade-off between relevance and faithful representation, and between timeliness and completeness",
  ],
  sections: [
    {
      id: "fundamental",
      heading: "The two fundamental characteristics",
      blocks: [
        {
          kind: "definition",
          term: "Relevance",
          md: "Information is relevant if it is **capable of making a difference to a user's decision**. It does so by having predictive value, confirmatory value, or both — and relevance is where **materiality** bites, because an immaterial item cannot change a decision.",
        },
        {
          kind: "definition",
          term: "Faithful representation",
          md: "Information faithfully represents what it purports to represent when it is **complete**, **neutral** and **free from error**. Complete means nothing needed is left out; neutral means not slanted to encourage a particular conclusion; free from error means no errors in the description or the process, which is not the same as perfectly accurate.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why these two are the fundamental pair",
          md: "Fail either and the information is not useful at all. Information that is perfectly faithful but irrelevant cannot change a decision; information that is highly relevant but not faithful changes the decision **in the wrong direction**. The other four characteristics make useful information more useful — they cannot rescue information that fails these two.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "\"Free from error\" is not \"exactly right\"",
          md: "An estimate — an allowance for doubtful debts, a useful life, a provision — can never be exactly right, and that does not stop it faithfully representing. What is required is that it is described as an estimate, that a proper process was followed, and that the inputs are the best available. The exam tests this: a reasoned estimate is not a breach of faithful representation.",
        },
      ],
      check: {
        q: "A company's statements are complete, neutral and free from error, but are published fourteen months after the year end. Which characteristic is primarily failed?",
        options: ["Faithful representation", "Relevance", "Verifiability", "Understandability"],
        correct: 1,
        explain:
          "RELEVANCE — information that arrives too late can no longer make a difference to a decision, so it has lost its capacity to be relevant. Faithful representation is precisely what the statements DO have. Timeliness is the enhancing characteristic in play, and the reason it matters is that losing it destroys relevance.",
      },
    },
    {
      id: "enhancing",
      heading: "The four enhancing characteristics",
      blocks: [
        {
          kind: "table",
          caption: "What each adds, and how each fails",
          head: ["Characteristic", "Means", "A typical failure"],
          rows: [
            ["**Comparability**", "Like items are treated alike, so this entity can be compared with another and with its own prior periods", "Changing depreciation method with no reason and no disclosure"],
            ["**Verifiability**", "Independent, knowledgeable observers could reach consensus that the information is faithfully represented", "A valuation with no supporting basis that no one else could arrive at"],
            ["**Timeliness**", "It is available in time to influence a decision", "Accounts published more than a year after the period they cover"],
            ["**Understandability**", "It is classified, characterised and presented clearly for a user with reasonable business knowledge", "Burying a material commitment in unexplained detail"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Understandability does not license omission",
          md: "Information is not left out because some users would find it difficult. The standard assumes a user with **reasonable knowledge of business and a willingness to study** the information — complex transactions must still be reported, presented as clearly as their nature allows.",
        },
        {
          kind: "list",
          title: "Comparability is not uniformity",
          items: [
            "Comparability requires that **like things look alike and unlike things look different**. Forcing two genuinely different transactions into one treatment destroys comparability rather than creating it.",
            "It needs **consistency** — the same treatment period to period — plus **disclosure** of the policies used, so a user can adjust for a difference between entities.",
            "It is why a change of policy must be disclosed and, where required, applied to the comparative figures too.",
          ],
        },
        {
          kind: "example",
          title: "Judging one disclosure against all six characteristics",
          scenario:
            "Halloway Co is being sued by a customer. The directors' legal advisers put the probable settlement at $400,000 to $600,000, most likely $480,000, with a decision expected in eight months. The draft accounts, signed three weeks after the year end, include a provision of $480,000 and a note explaining the claim, the range, the basis of the estimate and the expected timing.",
          steps: [
            { label: "Relevance", detail: "Passes. A probable $480,000 outflow is capable of changing a lender's or investor's decision, and the note has both predictive and confirmatory value." },
            { label: "Faithful representation", detail: "Passes. It is complete (the range and basis are given), neutral (the most likely figure, not the lowest), and free from error in process — an estimate properly made is not an error." },
            { label: "Comparability and verifiability", detail: "Comparability is served by treating this like any other probable obligation; verifiability by disclosing the basis, so another knowledgeable observer could evaluate it." },
            { label: "Timeliness", detail: "Passes — three weeks after the year end, well before the decision it might influence." },
            { label: "Understandability", detail: "Passes. The note explains the claim, the range and the timing in terms a reasonably informed user can follow." },
            { label: "Test the alternative", detail: "Had the directors provided the minimum $400,000 to protect reported profit, relevance would survive but NEUTRALITY would fail — so faithful representation would fail, and no amount of clarity or timeliness could repair it." },
          ],
          result:
            "The treatment is useful on all six characteristics. The instructive part is the last step: slanting the estimate to the bottom of the range breaks a FUNDAMENTAL characteristic, and the four enhancing ones cannot compensate. That hierarchy — fundamental first, enhancing afterwards — is what the exam is testing when it asks which characteristic is \"primarily\" failed.",
        },
      ],
      check: {
        q: "A company changes its inventory valuation method each year to whichever produces the highest profit, disclosing the change each time. Which characteristic is most clearly failed?",
        options: [
          "Understandability, because users cannot follow the change",
          "Timeliness, because the change is disclosed late",
          "Comparability, because like items are no longer treated alike over time",
          "Verifiability, because the figures cannot be checked",
        ],
        correct: 2,
        explain:
          "COMPARABILITY. It requires consistent treatment of like items from period to period so that trends mean something; a method chosen annually to maximise profit destroys that, and disclosure does not cure it. Note also that choosing the method for its effect on profit breaches NEUTRALITY, so faithful representation is failed too — and that is the more serious failure.",
      },
    },
    {
      id: "trade-offs-and-cost",
      heading: "The trade-offs, and the cost constraint",
      blocks: [
        {
          kind: "text",
          md: "The six characteristics cannot all be maximised at once. Reporting sooner means reporting on less complete information; reporting more precisely means reporting later. Recognising which characteristic is being traded away is what turns a definition into an answer.",
        },
        {
          kind: "table",
          caption: "The trade-offs the exam sets",
          head: ["Trade-off", "What is given up", "How it is resolved"],
          rows: [
            ["**Timeliness** against **completeness**", "Publishing before every figure is settled means some are estimates", "Report on time, disclose the estimates and the uncertainty. Late but perfect information is not relevant."],
            ["**Relevance** against **faithful representation**", "The most decision-useful measure may be the least verifiable", "Where a relevant measure cannot be faithfully represented, it is not reported as though it could be — it is disclosed with its basis."],
            ["**Comparability** against **relevance**", "Keeping an old policy for comparability may keep a less useful measure", "Change the policy where the new one is more relevant, and disclose the change and its effect."],
            ["**Understandability** against **completeness**", "A simpler presentation may leave something out", "Present the complex item as clearly as its nature allows. Omission is never the answer."],
          ],
        },
        {
          kind: "definition",
          term: "The cost constraint",
          md: "Reporting has a **cost** — gathering, verifying, presenting and auditing the information — and that cost is ultimately borne by the entity's own investors and customers. Information is therefore required only where the **benefit to users exceeds the cost of providing it**. This is a pervasive constraint on all six characteristics, not one of them.",
        },
        {
          kind: "illustration",
          title: "The cost constraint in practice",
          md: "A retailer with 400 stores could report revenue, margin and staff costs **store by store**. Some investors would find it useful.\n\nBut the cost is substantial: the systems to produce it reliably, the audit work to verify it, and the commercial cost of telling competitors exactly which locations are profitable. Set against the benefit to users — most of whom are assessing the business as a whole — the requirement is not justified, and no standard imposes it.\n\nNote what the constraint does NOT excuse: the cost of producing information a standard **does** require. \"It would be expensive\" is not a basis for omitting a disclosure that has already been judged worth its cost.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Two things the cost constraint is not",
          md: "It is **not a qualitative characteristic** — it is a constraint that applies across all of them.\n\nAnd it is **not a defence for non-compliance**. Where a standard requires a disclosure, the cost-benefit judgement has already been made by the standard-setter, and the preparer does not get to remake it.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Listing relevance and faithful representation among the enhancing characteristics.",
      fix: "They are the two FUNDAMENTAL ones. Comparability, verifiability, timeliness and understandability are the four enhancing.",
    },
    {
      trap: "Reading \"free from error\" as \"completely accurate\".",
      fix: "It means no error in the description or the process. A properly made estimate, described as an estimate, faithfully represents.",
    },
    {
      trap: "Justifying omission of a complex item on the grounds of understandability.",
      fix: "The assumed user has reasonable business knowledge and will study the information. Complex items are reported, presented as clearly as possible.",
    },
    {
      trap: "Treating comparability as requiring identical treatment of everything.",
      fix: "Like items alike, unlike items differently — plus consistency and disclosure of policies so users can adjust.",
    },
    {
      trap: "Answering \"which characteristic is failed\" with an enhancing one when a fundamental one has gone.",
      fix: "Check relevance and faithful representation first. A slanted estimate fails NEUTRALITY, which is a fundamental failure, however comparable and timely it is.",
    },
  ],
  keyTerms: [
    { term: "Relevance", def: "Information capable of making a difference to a user's decision, through predictive value, confirmatory value or both." },
    { term: "Faithful representation", def: "Information that is complete, neutral and free from error in its description and process." },
    { term: "Comparability", def: "Treating like items alike and unlike items differently, so an entity can be compared with others and with its own past." },
    { term: "Verifiability", def: "Independent knowledgeable observers could reach consensus that the information faithfully represents what it claims to." },
    { term: "Timeliness", def: "Information is available in time to be capable of influencing a decision." },
    { term: "Understandability", def: "Information is classified, characterised and presented clearly for a user with reasonable business knowledge." },
  ],
  summary: [
    "Relevance and faithful representation are fundamental: fail either and information is not useful at all.",
    "Relevance means capable of changing a decision, through predictive or confirmatory value; materiality is its entity-specific aspect.",
    "Faithful representation means complete, neutral and free from error — and a properly made estimate satisfies it.",
    "Comparability, verifiability, timeliness and understandability enhance useful information but cannot rescue useless information.",
    "Comparability requires like treated alike and unlike treated differently, supported by consistency and policy disclosure.",
    "Understandability assumes a reasonably informed user and never justifies leaving a complex item out.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the two fundamental characteristics and the four enhancing ones.", a: "Fundamental: relevance and faithful representation. Enhancing: comparability, verifiability, timeliness and understandability." },
    { q: "What are the three components of faithful representation?", a: "Complete, neutral and free from error." },
    { q: "Why does late publication fail relevance rather than faithful representation?", a: "Because relevance is the capacity to make a difference to a decision; information that arrives after the decision cannot. The figures may still be complete, neutral and free from error." },
    { q: "Does prudent under-estimation satisfy faithful representation?", a: "No. Deliberately choosing a low figure breaches neutrality, so a fundamental characteristic fails — and enhancing characteristics cannot compensate." },
    { q: "Can understandability justify omitting a complex disclosure?", a: "No. The assumed user has reasonable business knowledge and will study the information; complex items must be reported as clearly as their nature allows." },
  ],
  furtherStudy: [
    "Chapter 4's principles and these characteristics are examined together — the exam often gives a scenario and asks which of either is in play.",
    "Area I uses comparability directly: a ratio is only meaningful against a comparable base.",
  ],
}

/** Chapters 1–5 — Areas A and B, in reading order. */
export const FA_TREE_AREA_A: StudyChapter[] = [FA_TREE_01, FA_TREE_02, FA_TREE_03]
export const FA_TREE_AREA_B: StudyChapter[] = [FA_TREE_04, FA_TREE_05]
