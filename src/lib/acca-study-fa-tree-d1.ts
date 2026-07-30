import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FA · Area D (part 1) — recording transactions and events.
 * Chapters 9–14 of the FA reading tree: sales and purchases, cash, inventory, and
 * tangible non-current assets through acquisition, depreciation and disposal.
 *
 * Area D is the largest group in the FA syllabus and the one the old single-chapter
 * treatment served worst: ten sub-topic groups, most of them computational, shared
 * one 20-minute read. Here each gets its own chapter, and each computational
 * chapter carries a `formula` block and at least one worked `example` that ends
 * with the CHECK that catches the error — the tax reconciles, total cost is the
 * same under FIFO and AVCO, carrying amount plus accumulated depreciation equals
 * cost, the disposal account clears to the gain or loss.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth.
 */

/* ── Chapter 9 · D1 ────────────────────────────────────────────── */

export const FA_TREE_09: StudyChapter = {
  id: "FA-09",
  number: 9,
  paper: "FA",
  area: "D",
  title: "Sales, purchases, returns, sales tax and discounts",
  minutes: 18,
  syllabusRefs: ["D1(a)", "D1(b)", "D1(c)", "D1(d)", "D1(e)", "D1(f)"],
  intro:
    "Sales tax and discounts turn a simple invoice into an arithmetic problem with three figures that can each be wrong. The order you apply them in decides all three.",
  outcomes: [
    "Record sales, purchases and their returns in the general ledger accounts",
    "Explain how a sales tax works and why the business is a collector rather than the taxpayer",
    "Calculate sales tax on a transaction and record it in the sales tax account",
    "Account for discounts received, and for trade and settlement discounts allowed",
    "Determine the sales tax balance payable to or recoverable from the tax authority",
  ],
  sections: [
    {
      id: "sales-and-purchases",
      heading: "The core entries, and the returns that reverse them",
      blocks: [
        {
          kind: "table",
          caption: "The four transactions and their double entry",
          head: ["Transaction", "Debit", "Credit"],
          rows: [
            ["Credit sale", "Trade receivables", "Revenue"],
            ["Credit purchase", "Purchases", "Trade payables"],
            ["Sales return (credit note issued)", "Sales returns", "Trade receivables"],
            ["Purchase return (credit note received)", "Trade payables", "Purchases returns"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Returns are recorded separately, not netted off",
          md: "Sales returns are debited to a **sales returns** account, not credited straight to revenue, and purchase returns are credited to **purchases returns**. Both are deducted in arriving at the figures reported — revenue net of returns, purchases net of returns — but the gross figures are visible on the way. A business that nets returns off invisibly cannot tell whether returns are rising, and the exam expects the separate accounts.",
        },
        {
          kind: "formula",
          name: "Cost of sales",
          expr: "Opening inventory + Purchases (net of returns) + Carriage inwards − Closing inventory",
          note: "Carriage INWARDS is a cost of getting goods in, so it belongs in cost of sales. Carriage OUTWARDS is a distribution expense.",
        },
      ],
    },
    {
      id: "sales-tax",
      heading: "How a sales tax works",
      blocks: [
        {
          kind: "definition",
          term: "Sales tax",
          md: "A tax charged on the value of goods and services at each stage of supply, collected by the seller on behalf of the tax authority. A registered business charges **output tax** on what it sells, reclaims **input tax** on what it buys, and pays over the difference. The business is a **collector**, not the taxpayer — which is why sales tax is neither income nor an expense to it.",
        },
        {
          kind: "formula",
          name: "Adding and extracting sales tax at a rate of 20%",
          expr: "Gross = Net × 1.20   ·   Tax = Net × 20%   ·   Tax from a gross figure = Gross × 20/120",
          note: "The exam will give you either the net or the gross figure and expects you to notice which. \"Plus sales tax\" means the figure is net; \"including sales tax\" means it is gross.",
        },
        {
          kind: "table",
          caption: "Where each figure goes",
          head: ["Transaction", "Debit", "Credit"],
          rows: [
            ["Credit sale, $1,000 net plus 20% tax", "Receivables $1,200", "Revenue $1,000 and sales tax $200"],
            ["Credit purchase, $600 net plus 20% tax", "Purchases $600 and sales tax $120", "Payables $720"],
            ["Payment of the quarter's tax to the authority", "Sales tax", "Bank"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Three consequences worth memorising",
          md: "**Revenue is always the NET figure.** Output tax collected is a liability, never income.\n\n**Receivables and payables are always the GROSS figure**, because that is what the customer actually owes and what the business actually owes the supplier.\n\n**Irrecoverable input tax is different.** Where input tax cannot be reclaimed — the exam will say so — it is not recoverable from the authority, so it becomes part of the cost of the item purchased.",
        },
        {
          kind: "example",
          title: "One quarter's sales tax account",
          scenario:
            "Ferndown Co is registered for sales tax at 20%. In the quarter it made credit sales of $84,000 excluding tax, cash sales of $18,000 including tax, credit purchases of $46,000 excluding tax, and expenses of $7,200 including tax on which input tax is recoverable. It also had sales returns of $2,400 excluding tax. The opening sales tax balance was $3,100 owed to the authority, and $3,100 was paid during the quarter.",
          steps: [
            { label: "Output tax on credit sales", detail: "Net $84,000 × 20% = $16,800 output tax. Receivables are debited with the gross $100,800 and revenue credited with $84,000." },
            { label: "Output tax on cash sales", detail: "The $18,000 is GROSS, so tax = $18,000 × 20/120 = $3,000, and revenue is $15,000. Extracting rather than adding is the step candidates miss." },
            { label: "Output tax on returns", detail: "Returns reverse output tax: $2,400 × 20% = $480 debited to the sales tax account. Returns reduce what is owed to the authority." },
            { label: "Input tax on purchases and expenses", detail: "Purchases $46,000 × 20% = $9,200. Expenses are gross, so $7,200 × 20/120 = $1,200. Total input tax of $10,400 is debited to the sales tax account." },
            { label: "Build the account", detail: "Credits: opening $3,100 + output $16,800 + $3,000 = $22,900. Debits: returns $480 + input $10,400 + payment $3,100 = $13,980." },
            { label: "Find the closing balance", detail: "$22,900 − $13,980 = $8,920 credit — a liability owed to the tax authority at the quarter end." },
          ],
          result:
            "Sales tax payable at the quarter end is $8,920, a current liability. Revenue for the quarter is $84,000 + $15,000 − $2,400 = $96,600, and none of the tax touches it. The check that matters: every figure entering revenue, purchases or expenses is NET, every figure entering receivables or payables is GROSS, and the tax account holds the difference — if tax has leaked into revenue, revenue will exceed the net sales the question gave.",
        },
      ],
      check: {
        q: "A business makes a cash sale of $2,760 including sales tax at 15%. What is revenue and what is the output tax?",
        options: [
          "Revenue $2,760 and tax $414",
          "Revenue $2,400 and tax $360",
          "Revenue $2,346 and tax $414",
          "Revenue $3,174 and tax $414",
        ],
        correct: 1,
        explain:
          "The $2,760 is GROSS, so the tax is extracted: $2,760 × 15/115 = $360, and revenue is $2,400. Check it forwards — $2,400 × 1.15 = $2,760. Option 3 applies 15% to the gross figure instead of 15/115, which is the standard trap, and option 1 leaves the tax inside revenue.",
      },
    },
    {
      id: "discounts",
      heading: "Trade discounts and settlement discounts",
      blocks: [
        {
          kind: "definition",
          term: "Trade discount",
          md: "A **reduction in the list price**, given because of who the customer is — trade status, volume, a negotiated rate. It is deducted **before** anything else, and the transaction is simply recorded at the discounted amount. There is no separate discount account.",
        },
        {
          kind: "definition",
          term: "Settlement (cash) discount",
          md: "A reduction offered for **paying early**. Whether it is taken depends on the customer's later choice, so at the point of sale the seller must consider whether the customer is **expected** to take it and record revenue at the amount it expects to receive.",
        },
        {
          kind: "list",
          style: "number",
          title: "The order of operations on an invoice",
          items: [
            "Start with the **list price**.",
            "Deduct any **trade discount** — this establishes the invoice value of the goods.",
            "Deduct any **settlement discount expected to be taken**, for the purpose of measuring revenue.",
            "Apply **sales tax** to the resulting figure, per the terms the question gives.",
            "The **gross** total is what goes to receivables.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The two-sided asymmetry candidates get wrong",
          md: "**Discounts allowed** to customers, where not already expected and netted from revenue, are a reduction of revenue. **Discounts received** from suppliers are **income** — a credit — because they reduce the amount the business must pay. So one appears as a deduction and the other as a credit, and mixing them reverses two figures at once.",
        },
        {
          kind: "example",
          title: "An invoice with both discounts and tax",
          scenario:
            "Ashwood Co sells goods with a list price of $8,000 to a trade customer, allowing a 15% trade discount. Terms offer a further 4% settlement discount for payment within 10 days, and Ashwood expects this customer to take it, based on their consistent history. Sales tax is 20% and is charged on the amount after both discounts. The customer does pay within 10 days.",
          steps: [
            { label: "Deduct the trade discount", detail: "$8,000 × 85% = $6,800. This is the invoice value of the goods; no discount account is involved." },
            { label: "Deduct the expected settlement discount", detail: "$6,800 × 96% = $6,528. Because the customer is EXPECTED to take it, revenue is measured at $6,528 — the amount the seller expects to receive." },
            { label: "Apply sales tax", detail: "$6,528 × 20% = $1,305.60 of output tax." },
            { label: "Record the sale", detail: "Debit receivables $7,833.60; credit revenue $6,528 and sales tax $1,305.60." },
            { label: "Record the receipt", detail: "The customer pays $7,833.60 within 10 days: debit bank, credit receivables. The receivable clears exactly, because the expectation was correct." },
            { label: "Consider the alternative", detail: "Had the customer NOT taken the discount, they would owe $6,800 plus tax. The extra $272 plus its tax is additional revenue recognised when the expectation changes — the receivable is adjusted upward, not written off." },
          ],
          result:
            "Revenue of $6,528, output tax of $1,305.60 and a receivable of $7,833.60 that settles in full. The check that matters: the receivable balance after the receipt is NIL. A candidate who recorded revenue at $6,800 while expecting the discount would be left with a $272 receivable that never gets paid, and would have overstated revenue by exactly that amount.",
        },
      ],
      check: {
        q: "A business receives a supplier invoice for $5,000 and takes a 2% settlement discount for early payment. How is the $100 discount recorded?",
        options: [
          "As a reduction of purchases",
          "As discounts received — income",
          "As a reduction of the bank payment only, with no other entry",
          "As an expense described as discounts allowed",
        ],
        correct: 1,
        explain:
          "Discounts RECEIVED are income: debit payables $5,000, credit bank $4,900 and credit discounts received $100. The payable is cleared in full because the obligation has been discharged. \"Discounts allowed\" is the opposite side of the trade — what the business gives its own customers — and would be the wrong account entirely.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Applying the tax rate to a gross figure.",
      fix: "\"Including sales tax\" means extract: gross × rate/(100 + rate). Only a NET figure is multiplied by the rate itself.",
    },
    {
      trap: "Including sales tax in revenue or in purchases.",
      fix: "Revenue and purchases are always NET. The tax is a liability to, or a receivable from, the tax authority — never income or expense.",
    },
    {
      trap: "Recording receivables or payables net of sales tax.",
      fix: "They are GROSS, because that is the amount actually owed by the customer or to the supplier.",
    },
    {
      trap: "Confusing discounts allowed with discounts received.",
      fix: "Allowed is given to customers and reduces revenue; received is obtained from suppliers and is income. They sit on opposite sides.",
    },
    {
      trap: "Applying the trade discount after the sales tax.",
      fix: "Trade discount comes first, then any expected settlement discount, and tax is charged on the discounted figure.",
    },
    {
      trap: "Netting sales returns against revenue with no returns account.",
      fix: "Debit sales returns and credit receivables. The returns figure is deducted in presenting revenue but is recorded separately.",
    },
  ],
  keyTerms: [
    { term: "Output tax", def: "Sales tax charged by a registered business on its own sales, owed to the tax authority." },
    { term: "Input tax", def: "Sales tax paid by a business on its purchases and expenses, generally recoverable from the tax authority." },
    { term: "Trade discount", def: "A reduction in list price given because of the customer's status or volume, deducted before anything else and never recorded separately." },
    { term: "Settlement discount", def: "A reduction offered for early payment; revenue is measured at the amount the seller expects to receive." },
    { term: "Discounts received", def: "Settlement discounts obtained from suppliers, recorded as income." },
    { term: "Carriage inwards", def: "The cost of bringing purchased goods in, included in cost of sales." },
    { term: "Carriage outwards", def: "The cost of delivering goods to customers, treated as a distribution expense." },
  ],
  summary: [
    "Sales, purchases and their returns each have their own account; returns are recorded separately and deducted on presentation.",
    "A registered business collects output tax, reclaims input tax and pays the difference — the tax is never its income or expense.",
    "Net figures go to revenue and purchases; gross figures go to receivables and payables.",
    "\"Plus tax\" means multiply by the rate; \"including tax\" means extract with rate/(100 + rate).",
    "Trade discount is deducted first and needs no account; a settlement discount expected to be taken reduces measured revenue.",
    "Discounts allowed reduce revenue; discounts received are income.",
    "Irrecoverable input tax is added to the cost of the item purchased.",
  ],
  knowledgeDiagnostic: [
    { q: "A figure is described as including sales tax at 20%. How do you find the tax?", a: "Multiply by 20/120. Multiplying by 20% would overstate the tax because the base is already gross." },
    { q: "Why is sales tax neither income nor an expense of the business?", a: "The business collects it on behalf of the tax authority. Output tax is a liability and input tax is recoverable, so it passes through without affecting profit." },
    { q: "In what order are trade discount, settlement discount and sales tax applied?", a: "Trade discount first, then any settlement discount expected to be taken, then sales tax on the resulting figure." },
    { q: "How is a settlement discount received from a supplier recorded?", a: "Debit payables with the full invoice amount, credit bank with the amount paid and credit discounts received with the difference." },
    { q: "Where does carriage inwards go, and where does carriage outwards go?", a: "Carriage inwards is part of cost of sales; carriage outwards is a distribution expense." },
  ],
  furtherStudy: [
    "Chapter 11 completes cost of sales by measuring the inventory figures at each end.",
    "Chapter 21 reconciles the payables the gross figures create to what the supplier says.",
  ],
}

/* ── Chapter 10 · D2 ───────────────────────────────────────────── */

export const FA_TREE_10: StudyChapter = {
  id: "FA-10",
  number: 10,
  paper: "FA",
  area: "D",
  title: "Cash, the bank account and petty cash",
  minutes: 12,
  syllabusRefs: ["D2(a)", "D2(b)"],
  intro:
    "Cash is the one balance a business can verify by counting. That makes it the easiest to control and the most damaging to leave uncontrolled.",
  outcomes: [
    "Record cash receipts and payments in the bank general ledger account",
    "Distinguish transactions that pass through the bank account from those that do not",
    "Explain the need for a record of petty cash transactions",
    "Operate an imprest system and calculate the reimbursement required",
    "Identify why the bank ledger balance and the bank statement balance differ",
  ],
  sections: [
    {
      id: "the-bank-account",
      heading: "The bank account in the general ledger",
      blocks: [
        {
          kind: "table",
          caption: "What debits and credits the bank account",
          head: ["Debit the bank (money in)", "Credit the bank (money out)"],
          rows: [
            ["Receipts from customers", "Payments to suppliers"],
            ["Cash sales banked", "Cash purchases and expenses paid"],
            ["Capital introduced by the owner", "Drawings and dividends paid"],
            ["Loans received", "Loan repayments and interest"],
            ["Proceeds from selling a non-current asset", "Purchase of a non-current asset"],
            ["Interest and other income received", "Bank charges"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "A debit balance on the bank is an asset; a credit balance is an overdraft",
          md: "The bank account is the one account most likely to swing between the two. A credit balance means the business owes the bank, so it is a **current liability** — an overdraft — and must be presented as one, not as a negative asset. The exam sets this deliberately in statement-of-financial-position questions.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The ledger is not the statement",
          md: "The business's bank ledger account records what the business has **recorded**; the bank statement records what the bank has **processed**. They differ for timing reasons and for errors, and the reconciliation in chapter 20 is what establishes which of the two is right about each item.",
        },
      ],
      check: {
        q: "At the year end a company's bank general ledger account has a credit balance of $6,400. How is this presented in the statement of financial position?",
        options: [
          "As a negative current asset of $6,400",
          "As a current liability — a bank overdraft — of $6,400",
          "As a non-current liability of $6,400",
          "Netted against the petty cash balance",
        ],
        correct: 1,
        explain:
          "A credit balance means the business owes the bank, so it is a CURRENT LIABILITY — an overdraft, repayable on demand. It is not shown as a negative asset, and it must not be netted against cash in hand: the offsetting principle prohibits netting an asset against a liability without a right of set-off.",
      },
    },
    {
      id: "petty-cash",
      heading: "Petty cash and the imprest system",
      blocks: [
        {
          kind: "definition",
          term: "Petty cash",
          md: "A small float of physical cash kept to pay small expenses — postage, taxi fares, refreshments, minor stationery — where raising a bank payment would cost more than the item. It needs its own record because these payments are numerous, small and easy to lose track of.",
        },
        {
          kind: "definition",
          term: "Imprest system",
          md: "The float is fixed at an agreed amount, the **imprest**. Every payment is supported by a voucher, and at intervals the float is **topped back up to the imprest** by an amount exactly equal to the vouchers. The system's virtue is that vouchers plus cash remaining must always equal the imprest, so a shortfall is visible immediately.",
        },
        {
          kind: "formula",
          name: "Imprest reimbursement",
          expr: "Reimbursement = Imprest amount − Cash remaining = Total of vouchers",
          note: "If the three do not agree, cash is missing or a voucher is not recorded — which is the control the system exists to provide.",
        },
        {
          kind: "example",
          title: "Restoring the imprest, and finding the discrepancy",
          scenario:
            "Hartfield Co runs a petty cash imprest of $400. At the month end the tin holds $63 in cash and vouchers totalling $329 — for postage $84, taxi fares $121, refreshments $56 and stationery $68.",
          steps: [
            { label: "Test the imprest identity", detail: "Cash remaining $63 + vouchers $329 = $392, against an imprest of $400. There is a shortfall of $8." },
            { label: "Investigate before recording", detail: "$8 of cash is unsupported by a voucher. It may be an unrecorded payment, an error in giving change, or a loss. It is not written off silently — it is reported and investigated." },
            { label: "Record the vouchered expenses", detail: "Debit postage $84, taxi fares $121, refreshments $56 and stationery $68; credit petty cash $329." },
            { label: "Record the shortfall", detail: "Debit sundry expenses (cash shortage) $8; credit petty cash $8. Petty cash is now $63." },
            { label: "Reimburse to the imprest", detail: "Debit petty cash $337 and credit bank $337, restoring the float to $400." },
          ],
          result:
            "Expenses of $337 are recorded, and the float stands at exactly $400 again. The check that matters is the imprest identity: cash plus vouchers must equal the imprest. It failed by $8 here, which is precisely the discrepancy the system is designed to reveal — under a system with no fixed float, that $8 would simply have disappeared into the month's expenses unnoticed.",
        },
        {
          kind: "list",
          title: "Controls over cash the exam expects you to name",
          items: [
            "A **fixed imprest** with authorised reimbursement, so the float cannot quietly grow.",
            "A **voucher for every payment**, approved by someone other than the person holding the cash.",
            "A **maximum value** per petty cash payment, so larger items go through the bank where the controls are stronger.",
            "**Regular independent counts** of the float, reconciled to vouchers and the ledger balance.",
            "**Segregation of duties** — the person who records petty cash is not the person who holds it.",
            "**Physical security**: a locked tin, held by a named custodian.",
          ],
        },
      ],
      check: {
        q: "A business operates a petty cash imprest of $250. At the period end vouchers total $186 and the tin contains $61. What reimbursement is required and what does the position reveal?",
        options: [
          "$186, and the float reconciles exactly",
          "$189, and there is a $3 shortfall to investigate",
          "$64, and there is a $3 surplus",
          "$250, because the float is always restored in full",
        ],
        correct: 1,
        explain:
          "Reimbursement restores the float, so it is imprest $250 − cash held $61 = $189. But the vouchers total only $186, so $3 of cash is unsupported and must be investigated. The imprest identity — cash plus vouchers equals the imprest — is what exposes it; $61 + $186 = $247, not $250.",
      },
    },
    {
      id: "cash-equivalents-and-controls",
      heading: "Cash and cash equivalents, and controlling receipts and payments",
      blocks: [
        {
          kind: "definition",
          term: "Cash and cash equivalents",
          md: "**Cash** is cash in hand and demand deposits. **Cash equivalents** are short-term, highly liquid investments readily convertible to a known amount of cash and subject to insignificant risk of a change in value — a deposit maturing within about three months of acquisition, for instance. A **bank overdraft repayable on demand** forms part of cash and cash equivalents for the statement of cash flows, even though the position statement presents it among current liabilities.",
        },
        {
          kind: "table",
          caption: "In or out of cash and cash equivalents",
          head: ["Item", "Included?", "Why"],
          rows: [
            ["Notes and coin in the till", "**Yes**", "Cash in hand"],
            ["Current account balance", "**Yes**", "A demand deposit"],
            ["A 30-day deposit taken out this month", "**Yes**", "Short-term, liquid, negligible risk of value change"],
            ["A two-year fixed-term bond", "**No**", "Not short term and not readily convertible without loss"],
            ["Shares held as an investment", "**No**", "The amount realisable is not known — the value moves"],
            ["Bank overdraft repayable on demand", "**Yes**, as a negative", "It fluctuates as part of the entity's cash management"],
            ["A three-year bank loan", "**No**", "Financing, not cash management"],
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "Controls over receipts and payments the exam expects you to name",
          items: [
            "**Segregation of duties** — the person who records receipts is not the person who banks them, and the person who authorises a payment is not the person who makes it.",
            "**Bank all receipts intact and promptly**, so that the amount recorded and the amount banked are the same figure and can be compared.",
            "**Authorisation limits** for payments, with a second signatory above a stated amount.",
            "**Match before paying** — the supplier invoice against the purchase order and the goods received note (chapter 6).",
            "**Independent bank reconciliation**, prepared and reviewed by someone who neither records nor handles cash (chapter 20).",
            "**Restricted access** to the accounting system, to cheque stationery and to payment authorisation credentials.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why banking receipts intact matters so much",
          md: "If money is taken out of receipts before banking — as it routinely is in a small owner-managed business — the banked figure is **no longer the amount received**, and every figure derived from it is wrong. Chapter 27 turns exactly this into an exam question: sales reconstructed from the banked total alone are understated by whatever was taken first. Banking intact removes the problem; where it is not done, the amounts taken must be recorded as drawings.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The overdraft's two homes",
          md: "The same overdraft appears in **current liabilities** in the statement of financial position and **inside cash and cash equivalents** in the statement of cash flows. That is not an inconsistency: the position statement reports what is owed, while the cash flow statement explains the movement in the net cash the business actually manages day to day.",
        },
      ],
      check: {
        q: "Which of the following forms part of cash and cash equivalents?",
        options: [
          "A two-year fixed-term deposit",
          "A bank overdraft repayable on demand",
          "Equity shares held as a short-term investment",
          "A three-year bank loan",
        ],
        correct: 1,
        explain:
          "A BANK OVERDRAFT REPAYABLE ON DEMAND is included, as a negative amount, because it fluctuates as part of day-to-day cash management — while the position statement still shows it within current liabilities. A two-year deposit is not short term, shares have no known realisable amount, and a three-year loan is financing. Note that the position statement still presents the overdraft among CURRENT LIABILITIES.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Presenting an overdrawn bank balance as a negative asset.",
      fix: "A credit bank balance is a bank overdraft — a current liability — and is not netted against cash in hand.",
    },
    {
      trap: "Reimbursing petty cash by the voucher total when cash does not reconcile.",
      fix: "Reimbursement equals imprest less cash held. When that differs from the vouchers, the difference is a discrepancy to investigate, not an adjustment to hide.",
    },
    {
      trap: "Recording capital introduced or a loan received as income because it arrived in the bank.",
      fix: "Both are increases in the bank matched by increases in capital or liabilities. Neither touches profit.",
    },
    {
      trap: "Treating the bank statement balance as the ledger balance.",
      fix: "They record different things and legitimately differ. Chapter 20's reconciliation establishes which one is right about each item.",
    },
    {
      trap: "Putting large payments through petty cash.",
      fix: "A maximum per-payment limit is part of the control; larger items go through the bank, where authorisation and the audit trail are stronger.",
    },
  ],
  keyTerms: [
    { term: "Bank overdraft", def: "A credit balance on the bank account, meaning the business owes the bank; presented as a current liability." },
    { term: "Petty cash", def: "A small float of physical cash held for minor expenses, recorded separately because the payments are numerous and small." },
    { term: "Imprest system", def: "A petty cash system with a fixed float, restored at intervals by the exact total of the approved vouchers." },
    { term: "Imprest amount", def: "The fixed float the petty cash balance is always restored to." },
    { term: "Petty cash voucher", def: "The approved document supporting each petty cash payment, without which the payment is unsupported." },
  ],
  summary: [
    "The bank account is debited with money in and credited with money out, including capital, loans and asset proceeds.",
    "A credit bank balance is an overdraft and a current liability, never a negative asset.",
    "Petty cash needs its own record because its payments are small, numerous and easily lost.",
    "Under an imprest system the float is fixed and restored by the exact total of approved vouchers.",
    "Cash held plus vouchers must equal the imprest; a difference is a discrepancy to investigate.",
    "Controls include a fixed float, authorised vouchers, payment limits, independent counts and segregation of duties.",
  ],
  knowledgeDiagnostic: [
    { q: "How is an overdrawn bank balance presented?", a: "As a bank overdraft within current liabilities, not as a negative asset, and not netted against cash in hand." },
    { q: "What is the reimbursement under an imprest system?", a: "The imprest amount less the cash actually held — which should equal the total of the approved vouchers." },
    { q: "What does it mean if cash held plus vouchers is less than the imprest?", a: "Cash is unaccounted for: an unrecorded payment, an error or a loss. It is investigated and reported, not absorbed silently." },
    { q: "Why does petty cash need a separate book at all?", a: "The payments are numerous and individually small, so putting each through the bank ledger would cost more in processing than the items are worth and would obscure the bank account." },
    { q: "Name three controls over petty cash.", a: "A fixed imprest with authorised reimbursement, an approved voucher for every payment, and regular independent counts. A per-payment limit and segregation of duties are two more." },
  ],
  furtherStudy: [
    "Chapter 20 reconciles the bank ledger account to the bank statement.",
    "Chapter 26 traces cash movements into the statement of cash flows.",
  ],
}

/* ── Chapter 11 · D3 ───────────────────────────────────────────── */

export const FA_TREE_11: StudyChapter = {
  id: "FA-11",
  number: 11,
  paper: "FA",
  area: "D",
  title: "Inventory",
  minutes: 19,
  syllabusRefs: ["D3(a)", "D3(b)", "D3(c)", "D3(d)", "D3(e)", "D3(f)", "D3(g)"],
  intro:
    "Closing inventory is the single figure that appears in both statements at once, and it changes profit dollar for dollar. That is why the exam attacks it from four directions: what is included, how it is valued, which method, and what happens if it is wrong.",
  outcomes: [
    "Explain why an adjustment for inventory is needed in preparing financial statements",
    "Record cost of sales and closing inventory",
    "Apply the IAS 2 measurement rule and identify which costs are included",
    "Calculate closing inventory using FIFO and AVCO, both periodic and continuous",
    "Identify the effect of the valuation method, and of an inventory error, on profit and on assets",
  ],
  sections: [
    {
      id: "why-adjust",
      heading: "Why inventory has to be adjusted at all",
      blocks: [
        {
          kind: "text",
          md: "Purchases are recorded as they are made, throughout the year. But not everything bought has been sold, and the accruals basis requires that only the cost of goods actually **sold** is matched against the revenue from selling them. The inventory adjustment is what moves the cost of unsold goods out of this year's expense and into next year's, where the revenue will arise.",
        },
        {
          kind: "table",
          caption: "The double entry at each end of the year",
          head: ["Step", "Debit", "Credit"],
          rows: [
            ["Recognise closing inventory", "Inventory (current asset)", "Cost of sales"],
            ["Release opening inventory into the new year", "Cost of sales", "Inventory"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The one-line consequence to hold on to",
          md: "**Closing inventory up ⇒ cost of sales down ⇒ profit up ⇒ assets up.** Both statements move in the same direction and by the same amount, which is why an inventory error is always a double error: overstating closing inventory by $10,000 overstates both profit and net assets by $10,000. It also reverses next year, because this year's closing inventory is next year's opening figure.",
        },
        {
          kind: "definition",
          term: "Continuous and period-end inventory records",
          md: "A **continuous** (perpetual) record updates the inventory account on every movement, so a book quantity and value are available at any moment; it supports control and is what a computerised system provides. A **period-end** record establishes inventory by physically **counting** at the reporting date, with cost of sales derived as a residual. Most businesses do both: continuous records for control, and a count to verify them.",
        },
      ],
    },
    {
      id: "measurement",
      heading: "Measurement: cost, and the lower-of rule",
      blocks: [
        {
          kind: "formula",
          name: "The IAS 2 measurement rule",
          expr: "Carry inventory at whichever is LOWER: what it cost, or what it will realise net of the costs of getting there",
          note: "Applied item by item (or by group of similar items) — never by comparing the total cost of all inventory with the total NRV of all inventory.",
        },
        {
          kind: "definition",
          term: "Cost and net realisable value",
          md: "**Cost** comprises purchase price plus import duties and non-recoverable taxes, plus carriage inwards and other costs of bringing the item to its present location and condition — and, for manufactured goods, direct costs and an appropriate share of production overheads.\n\n**Net realisable value** is the expected selling price less the costs still to be incurred to complete the item and to sell it.",
        },
        {
          kind: "table",
          caption: "Included in cost, and excluded",
          head: ["Included", "Excluded"],
          rows: [
            ["Purchase price, net of trade discount", "Selling and distribution costs"],
            ["Import duties and non-recoverable taxes", "Administrative overheads"],
            ["Carriage inwards, handling to present location", "Storage costs, unless necessary to the production process"],
            ["Conversion costs: direct labour and materials", "Abnormal waste and idle capacity"],
            ["A systematic share of production overheads", "Finance costs"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Item by item, and the reason it matters",
          md: "Comparing totals lets a profitable line hide a loss-making one. Take two products: A at cost $5,000 with NRV $7,000, and B at cost $4,000 with NRV $1,500. Item by item gives $5,000 + $1,500 = **$6,500**. Comparing totals — cost $9,000 against NRV $8,500 — gives $8,500 and quietly carries B at $4,000 when it will realise $1,500. The difference of $2,000 is the loss the rule exists to recognise.",
        },
        {
          kind: "example",
          title: "Valuing four lines of inventory",
          scenario:
            "At its year end Kelbrook Co holds four lines. Line 1: cost $12,000, expected to sell for $19,000. Line 2: cost $8,400, damaged, expected to sell for $9,000 after remedial work of $1,900. Line 3: cost $5,600, superseded by a new model, expected to sell for $4,000 with selling costs of $300. Line 4: cost $3,100, sells normally for $4,800 with selling costs of $200.",
          steps: [
            { label: "Line 1", detail: "NRV $19,000 exceeds cost $12,000, so carry at COST $12,000. Inventory is never written UP to NRV." },
            { label: "Line 2", detail: "NRV = $9,000 − $1,900 remedial = $7,100, below cost $8,400. Carry at $7,100 — a write-down of $1,300." },
            { label: "Line 3", detail: "NRV = $4,000 − $300 = $3,700, below cost $5,600. Carry at $3,700 — a write-down of $1,900." },
            { label: "Line 4", detail: "NRV = $4,800 − $200 = $4,600, above cost $3,100. Carry at cost $3,100." },
            { label: "Total, item by item", detail: "$12,000 + $7,100 + $3,700 + $3,100 = $25,900." },
            { label: "Test the wrong method", detail: "Total cost is $29,100 and total NRV is $33,300, so a totals comparison would carry inventory at $29,100 — $3,200 too high, exactly the write-downs on lines 2 and 3 that lines 1 and 4 would have masked." },
          ],
          result:
            "Closing inventory is $25,900, with $3,200 of write-downs charged to cost of sales. The check that matters: the write-down equals the sum of the individual shortfalls, $1,300 + $1,900 — and if your answer equals total cost, you have compared totals instead of items and both profit and assets are overstated by $3,200.",
        },
      ],
      check: {
        q: "Inventory cost $9,400. It can be sold for $11,000 but only after rectification costing $2,100 and selling costs of $400. At what amount is it carried?",
        options: ["$9,400", "$11,000", "$8,500", "$8,900"],
        correct: 2,
        explain:
          "NRV = $11,000 − $2,100 rectification − $400 selling costs = $8,500, which is below cost of $9,400, so inventory is carried at $8,500 and a $900 write-down is charged. Both costs still to be incurred are deducted — a candidate who deducts only the rectification gets $8,900 and understates the write-down.",
      },
    },
    {
      id: "fifo-avco",
      heading: "FIFO and AVCO",
      blocks: [
        {
          kind: "definition",
          term: "FIFO — first in, first out",
          md: "Assumes the **oldest** units are sold first, so the units remaining are the **most recently purchased**. Closing inventory is therefore valued at the latest prices.",
        },
        {
          kind: "definition",
          term: "AVCO — average cost",
          md: "Values units at a weighted average. **Periodic** AVCO computes one average for the whole period. **Continuous** AVCO recomputes the average after **every purchase**, and issues are then made at the average ruling at that moment.",
        },
        {
          kind: "formula",
          name: "Weighted average cost",
          expr: "Average cost per unit = Total cost of units available ÷ Total number of units available",
          note: "Under continuous AVCO this is recalculated on each receipt, not on each issue — an issue reduces quantity and value at the existing average and leaves the average unchanged.",
        },
        {
          kind: "example",
          title: "The same transactions under three methods",
          scenario:
            "Norbury Co had no opening inventory. It bought 100 units at $10 on 3 March, 150 units at $12 on 12 March and 200 units at $15 on 24 March — 450 units costing $5,800 in total. It sold 120 units on 15 March and 180 units on 28 March, so 300 units were sold and 150 remain.",
          steps: [
            { label: "FIFO — identify the units left", detail: "300 units sold: the 100 at $10, the 150 at $12 and 50 of the 24 March batch. The remaining 150 units are the newest, all from the 24 March batch at $15 = $2,250." },
            { label: "FIFO — cost of sales", detail: "Total cost available $5,800 − closing inventory $2,250 = cost of sales $3,550." },
            { label: "Periodic AVCO — one average", detail: "(100 × 10) + (150 × 12) + (200 × 15) = 1,000 + 1,800 + 3,000 = $5,800 for 450 units, so the average is $12.89. Closing inventory = 150 × $12.89 = $1,933." },
            { label: "Periodic AVCO — cost of sales", detail: "$5,800 − $1,933 = $3,867. One average is applied to the whole period, so the date of each sale is irrelevant under this method." },
            { label: "Continuous AVCO — first sale", detail: "Before 15 March, holdings are 100 at $10 plus 150 at $12 = 250 units costing $2,800, an average of $11.20. Issue 120 units at $11.20 = $1,344, leaving 130 units at $1,456." },
            { label: "Continuous AVCO — second sale", detail: "The 24 March purchase makes holdings 130 + 200 = 330 units costing $1,456 + $3,000 = $4,456, an average of $13.50. Issue 180 at $13.50 = $2,430, leaving 150 units at $2,026." },
            { label: "Compare and check", detail: "Closing inventory: FIFO $2,250; periodic AVCO $1,933; continuous AVCO $2,026. Cost of sales is $5,800 less each of those figures, so in every case the two add back to $5,800." },
          ],
          result:
            "FIFO gives the highest closing inventory and therefore the highest profit, because prices were RISING and FIFO leaves the newest, dearest units in inventory. The check that matters: closing inventory plus cost of sales must equal the total cost of goods available ($5,800) under every method — the methods only decide how much of that total sits in the closing asset and how much has gone through cost of sales; they never change the total itself.",
        },
        {
          kind: "table",
          caption: "The effect of the method when prices are rising",
          head: ["", "Closing inventory", "Cost of sales", "Profit"],
          rows: [
            ["**FIFO**", "Higher — newest, dearest units remain", "Lower", "**Higher**"],
            ["**AVCO**", "Lower than FIFO — averaging pulls old cheap prices in", "Higher", "**Lower**"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Reason it out, do not memorise the table",
          md: "Ask which prices the method leaves **in inventory**. FIFO leaves the newest. If prices rose, the newest are the dearest, so FIFO inventory is higher — and because closing inventory and cost of sales must sum to the same total, cost of sales is lower and profit is higher. If prices FELL, every conclusion reverses. Memorising \"FIFO gives higher profit\" fails the moment the examiner uses falling prices.",
        },
      ],
      check: {
        q: "A business had 200 units at $8. It buys 300 at $11, then sells 350, then buys 100 at $13. Under CONTINUOUS AVCO, what is the value of closing inventory?",
        options: ["$2,583", "$2,770", "$2,950", "$2,450"],
        correct: 1,
        explain:
          "Before the sale, holdings are 200 × $8 + 300 × $11 = $4,900 for 500 units, an average of $9.80. Selling 350 leaves 150 units at $1,470. The later purchase adds 100 × $13 = $1,300, giving closing inventory of 250 units at $2,770. The purchase came AFTER the sale, so it cannot affect the issue price: $2,583 is periodic AVCO, $2,950 is FIFO, and $2,450 values all 250 units at the old average.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Comparing total cost with total net realisable value.",
      fix: "The lower-of rule is applied item by item, or by group of similar items. Comparing totals lets a profitable line hide a loss-making one.",
    },
    {
      trap: "Deducting only some of the costs still to be incurred when computing NRV.",
      fix: "NRV is selling price less ALL costs to complete AND to sell — rectification, finishing and selling costs alike.",
    },
    {
      trap: "Writing inventory UP to net realisable value when NRV exceeds cost.",
      fix: "Inventory is carried at the LOWER figure. When NRV is higher, cost stands; the profit is recognised on sale.",
    },
    {
      trap: "Including selling, distribution or administrative costs in the cost of inventory.",
      fix: "Only costs of bringing the item to its present location and condition, including production overheads, are included.",
    },
    {
      trap: "Recomputing the continuous AVCO average on an issue, or including a purchase made after the sale.",
      fix: "The average is recalculated on each RECEIPT only, and issues are priced at the average ruling at the moment of the issue.",
    },
    {
      trap: "Memorising that FIFO gives the higher profit.",
      fix: "It does when prices RISE. Reason from which prices the method leaves in inventory; falling prices reverse the conclusion.",
    },
    {
      trap: "Adjusting only one statement for an inventory error.",
      fix: "Closing inventory affects cost of sales AND the asset by the same amount, so an error misstates both profit and net assets — and reverses next year.",
    },
  ],
  keyTerms: [
    { term: "Net realisable value", def: "Expected selling price less the costs still to be incurred to complete and sell the item." },
    { term: "FIFO", def: "First in, first out — the oldest units are assumed sold first, so closing inventory holds the most recent prices." },
    { term: "AVCO", def: "Average cost — units are valued at a weighted average, computed once for the period (periodic) or after every receipt (continuous)." },
    { term: "Continuous inventory record", def: "A record updated on every movement, giving a book quantity and value at any moment." },
    { term: "Period-end inventory record", def: "Inventory established by physical count at the reporting date, with cost of sales derived as a residual." },
    { term: "Carriage inwards", def: "The cost of bringing purchased goods to their present location, included in the cost of inventory." },
  ],
  summary: [
    "The inventory adjustment moves the cost of unsold goods out of this year's cost of sales and into the asset.",
    "Closing inventory up means cost of sales down, profit up and assets up — so an inventory error is always a double error.",
    "Inventory is carried at whichever is lower — what it cost, or what it will realise net of costs to complete and sell — assessed item by item.",
    "Cost includes purchase price, duties, carriage inwards and a share of production overheads; it excludes selling, administrative and abnormal costs.",
    "NRV is selling price less all costs to complete and to sell.",
    "FIFO leaves the newest prices in inventory; periodic AVCO averages the whole period; continuous AVCO re-averages on each receipt.",
    "Closing inventory plus cost of sales equals the cost of goods available under every method.",
  ],
  knowledgeDiagnostic: [
    { q: "State the IAS 2 measurement rule and the level it is applied at.", a: "The lower of cost and net realisable value, applied item by item or by group of similar items — never by comparing totals." },
    { q: "How is net realisable value computed?", a: "Expected selling price less all costs still to be incurred to complete the item and to sell it." },
    { q: "Why does an overstatement of closing inventory overstate two figures?", a: "It reduces cost of sales, so profit rises, and it increases the inventory asset. Both move by the same amount, and the error reverses next year through opening inventory." },
    { q: "Under continuous AVCO, when is the average recalculated?", a: "On every receipt. An issue is priced at the average ruling at that moment and leaves the average unchanged." },
    { q: "Which method gives the higher closing inventory when prices are falling, and why?", a: "AVCO. FIFO leaves the newest units in inventory, and when prices fall those are the cheapest — so the reasoning, not the memorised table, gives the answer." },
  ],
  furtherStudy: [
    "Chapter 24 puts closing inventory into both statements at once.",
    "Chapter 27 uses gross profit percentages to derive a missing inventory or sales figure.",
    "FR develops IAS 2 further and adds inventory in a group context.",
  ],
}

/* ── Chapter 12 · D4 (acquisition) ─────────────────────────────── */

export const FA_TREE_12: StudyChapter = {
  id: "FA-12",
  number: 12,
  paper: "FA",
  area: "D",
  title: "Tangible non-current assets: capital or revenue, and acquisition",
  minutes: 16,
  syllabusRefs: ["D4(a)", "D4(b)", "D4(c)", "D4(d)", "D4(e)", "D4(j)"],
  intro:
    "One decision governs this whole chapter: is the expenditure an asset or an expense? Get it wrong and you have misstated profit, assets and every year's depreciation that follows.",
  outcomes: [
    "Define non-current assets and distinguish them from current assets",
    "Explain the difference between asset and expense items and classify expenditure correctly",
    "Determine the cost at which a tangible non-current asset is initially recognised",
    "Post the acquisition of a tangible non-current asset, and decide which costs belong in it",
    "Say what an asset register is for and how it is reconciled to the ledger",
  ],
  sections: [
    {
      id: "capital-or-revenue",
      heading: "Capital expenditure or revenue expenditure",
      blocks: [
        {
          kind: "definition",
          term: "Non-current asset",
          md: "An asset acquired for **use in the business over more than one accounting period**, rather than for resale. The test is the intended use, not the item: a van is a non-current asset to a delivery business and inventory to a van dealer.",
        },
        {
          kind: "definition",
          term: "Capital and revenue expenditure",
          md: "**Capital expenditure** acquires, or improves the earning capacity of, a non-current asset; it is **capitalised** and charged to profit over the asset's life through depreciation. **Revenue expenditure** maintains the asset's existing capacity or relates to the period's trading; it is **expensed** immediately.",
        },
        {
          kind: "table",
          caption: "The classification the exam sets again and again",
          head: ["Expenditure", "Treatment", "Why"],
          rows: [
            ["Purchase price of a machine", "**Capitalise**", "Acquires the asset"],
            ["Delivery and installation of that machine", "**Capitalise**", "Cost of bringing it to its location and working condition"],
            ["Testing to confirm it functions", "**Capitalise**", "Necessary to make the asset ready for use"],
            ["Legal fees on buying a building", "**Capitalise**", "Directly attributable to acquiring the asset"],
            ["Extension adding a new floor to a building", "**Capitalise**", "Enhances earning capacity"],
            ["Repainting the same building", "Expense", "Maintains existing capacity"],
            ["Annual servicing and repairs", "Expense", "Maintenance, not enhancement"],
            ["Staff training on how to use the machine", "Expense", "Not part of the asset itself"],
            ["Replacing a broken part to restore the original standard", "Expense", "Restores rather than enhances"],
            ["Machine insurance and road fund licence", "Expense", "A cost of the period, not of the asset"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The question to ask, in one sentence",
          md: "**Does the spending make the asset better than it was, or keep it as it was?** Better is capital; keep is revenue. And once the asset is in use and working, further spending is presumed revenue unless it genuinely enhances capacity — which is why installation is capital and next year's service is not.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The double error a misclassification causes",
          md: "Treating $40,000 of capital expenditure as repairs **understates** profit by $40,000 this year and **understates** non-current assets by the same amount — then **overstates** profit in every later year, because the depreciation that should have been charged never is. One error, four misstatements, and the exam frequently asks you to correct it two years later.",
        },
        {
          kind: "example",
          title: "Deciding the cost of one machine",
          scenario:
            "Wilbrook Co buys a production machine. The supplier's invoice shows a list price of $92,000 less a 10% trade discount, plus delivery of $2,400 and installation of $5,600. Wilbrook also pays $3,000 to train two operators, $1,800 for a twelve-month maintenance contract starting on installation, and $4,200 to a contractor for strengthening the factory floor, which was necessary before the machine could be sited. Sales tax is fully recoverable.",
          steps: [
            { label: "Start from the price actually payable", detail: "$92,000 × 90% = $82,800. A trade discount is deducted, never recorded separately." },
            { label: "Add costs of getting it there and working", detail: "Delivery $2,400 and installation $5,600 are directly attributable and are capitalised." },
            { label: "Consider the floor strengthening", detail: "$4,200 was necessary to bring the asset to its required location and condition, so it is capitalised — this is the judgement the question is really testing." },
            { label: "Exclude the training", detail: "$3,000 of training is not part of the asset. It is an expense, however necessary it was." },
            { label: "Exclude the maintenance contract", detail: "$1,800 maintains rather than acquires, and covers a future period — it is an expense, spread as a prepayment if it straddles the year end." },
            { label: "Total the capitalised cost", detail: "$82,800 + $2,400 + $5,600 + $4,200 = $95,000. Debit plant and machinery $95,000; expense $4,800 of training and maintenance." },
          ],
          result:
            "The machine is recognised at $95,000, and $4,800 goes to profit or loss. The check that matters: every item capitalised must be answerable to \"was this necessary to get the asset to where it is and working?\" — training and maintenance both fail that test even though the business could not operate without them, and each dollar wrongly capitalised also inflates every future year's depreciation.",
        },
      ],
      check: {
        q: "A company buys a delivery vehicle for $34,000, pays $900 to have its livery applied, $1,100 for the first year's insurance and $600 for the annual road licence. What is capitalised?",
        options: ["$34,000", "$34,900", "$36,000", "$36,600"],
        correct: 1,
        explain:
          "$34,900 — the purchase price plus the livery, which is a cost of bringing the vehicle to the condition in which it will be used. Insurance and the road licence are costs of OPERATING the vehicle for a period, not of acquiring it, so both are expenses. Capitalising them would inflate the asset and every future depreciation charge.",
      },
    },
    {
      id: "recording-and-register",
      heading: "Recording the acquisition, and the asset register",
      blocks: [
        {
          kind: "table",
          caption: "Acquisition entries",
          head: ["Situation", "Debit", "Credit"],
          rows: [
            ["Asset bought for cash", "Non-current asset (cost)", "Bank"],
            ["Asset bought on credit", "Non-current asset (cost)", "Payables"],
            ["Asset bought with a loan", "Non-current asset (cost)", "Loan"],
            ["Directly attributable costs paid separately", "Non-current asset (cost)", "Bank or payables"],
            ["Expenditure wrongly capitalised, being corrected", "The relevant expense", "Non-current asset (cost)"],
          ],
        },
        {
          kind: "definition",
          term: "Non-current asset register",
          md: "A detailed record of **every individual asset** the business holds: description and identification number, location, date of purchase, cost, depreciation method and rate, depreciation charged to date, carrying amount, and details of disposal. It sits **outside** the double entry — a memorandum record, like the receivables ledger.",
        },
        {
          kind: "list",
          title: "What the register is for",
          items: [
            "**Control over the physical assets** — the register can be compared with what is actually on the premises, which is how missing assets are found.",
            "**Reconciliation** — the total carrying amount per the register should agree with the general ledger, and a difference points to an unrecorded acquisition, disposal or depreciation error.",
            "**Correct depreciation** — the charge depends on each asset's own cost, date, method and life, which only an individual record can hold.",
            "**Disposal accounting** — you cannot compute a gain or loss without knowing that asset's cost and accumulated depreciation.",
            "**Disclosure** — the note reconciling opening to closing cost and depreciation is built from it.",
            "**Insurance and maintenance planning** — what is held, where, and how old.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How the register is examined",
          md: "Questions give a register total and a ledger total that differ, and ask what could explain it. The usual candidates: an asset bought and not entered in the register, a disposal recorded in the ledger but not removed from the register, depreciation charged in one and not the other, or an asset recorded at the wrong cost. Naming a plausible reconciling item is the mark.",
        },
      ],
      check: {
        q: "Why is a non-current asset register maintained when the general ledger already records non-current assets?",
        options: [
          "Because the general ledger cannot record depreciation",
          "Because the ledger holds only totals, while depreciation, disposals and physical control all require details of each individual asset",
          "Because the register forms part of the double entry and the ledger does not",
          "Because standards require the register to be published",
        ],
        correct: 1,
        explain:
          "The ledger holds TOTALS by class. Depreciating each asset over its own life, computing a gain or loss on a specific disposal, and checking that the assets physically exist all need per-asset detail. The register is a MEMORANDUM record outside the double entry, and it is not published — the disclosure note is built from it.",
      },
    },
    {
      id: "subsequent-expenditure",
      heading: "Spending on an asset already in use",
      blocks: [
        {
          kind: "text",
          md: "The capital-or-revenue decision does not end at acquisition. Money is spent on assets throughout their lives, and each item has to be classified again — which is where most of the exam's marks on this topic actually sit, because the acquisition invoice is the easy case.",
        },
        {
          kind: "table",
          caption: "Subsequent expenditure, classified",
          head: ["Expenditure", "Treatment", "Reasoning"],
          rows: [
            ["Routine servicing and inspection", "Expense", "Maintains the asset's existing capacity"],
            ["Replacing a worn part so the asset works as before", "Expense", "Restores rather than enhances"],
            ["Fitting a component that increases output by 20%", "**Capitalise**", "Enhances earning capacity"],
            ["An extension to a building", "**Capitalise**", "Adds to the asset"],
            ["Repainting after the extension is built", "Expense", "Maintenance, even though it followed capital work"],
            ["Relocating a machine to a new site to allow a new production line", "**Capitalise**", "A cost of bringing the asset to the location required for its intended use"],
            ["Repairing damage caused by an accident", "Expense", "Restores the pre-existing condition"],
            ["A major overhaul that extends the useful life by three years", "**Capitalise**", "Increases the benefit the entity will obtain"],
          ],
        },
        {
          kind: "example",
          title: "Reconciling the register to the ledger",
          scenario:
            "Denholm Co's plant and machinery cost account shows $742,000 at the year end, while the non-current asset register totals $698,000 at cost. Investigation finds: a machine costing $31,000 acquired in November was posted to the ledger but not entered in the register; a machine costing $18,000 was disposed of during the year, removed from the ledger but still listed in the register; and a machine was entered in the register at $9,000 when the invoice, correctly posted to the ledger, was for $40,000.",
          steps: [
            { label: "Start from the register total", detail: "$698,000 as it stands." },
            { label: "Add the unrecorded acquisition", detail: "The $31,000 machine exists and is in the ledger, so the REGISTER is understated: $698,000 + $31,000 = $729,000." },
            { label: "Remove the disposed machine", detail: "It has left the business and the ledger is right, so the register must lose it: $729,000 − $18,000 = $711,000." },
            { label: "Correct the understated cost", detail: "The register shows $9,000 against an invoice of $40,000, so it is understated by $31,000: $711,000 + $31,000 = $742,000." },
            { label: "Compare", detail: "The corrected register total of $742,000 now agrees with the ledger." },
            { label: "Note what was NOT adjusted", detail: "Every correction was to the REGISTER. The ledger was right throughout, which is the usual pattern — the ledger is inside the double entry and is reconciled to the bank and the trial balance, so a difference is more often a register omission." },
          ],
          result:
            "The register reconciles to the ledger at $742,000 after three corrections. The check that matters: identify for each difference WHICH record is wrong before adjusting anything. A candidate who adjusts the ledger to match the register will have removed a real asset or invented a disposal, and the trial balance will then disagree as well.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The question behind every classification",
          md: "Ask what the business could do **after** the spending that it could not do **before**. If the answer is \"nothing — it can carry on as it was\", the spending is revenue. If it is \"produce more, produce for longer, or produce somewhere new\", it is capital. That formulation handles the awkward cases — a relocation, an overhaul, a part replacement — far more reliably than trying to remember a list.",
        },
      ],
      check: {
        q: "A machine is overhauled at a cost of $26,000, extending its remaining useful life from two years to five. How is the expenditure treated?",
        options: [
          "Expensed, because an overhaul is maintenance",
          "Capitalised, because it increases the benefit the entity will obtain from the asset",
          "Half capitalised and half expensed",
          "Expensed, but the useful life is revised",
        ],
        correct: 1,
        explain:
          "CAPITALISED. The overhaul makes the asset better than it was — three additional years of use — so it enhances rather than maintains. The carrying amount, including the $26,000, is then depreciated over the revised remaining life of five years, which is the change-in-estimate treatment from chapter 13.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Capitalising staff training, insurance or a licence because the asset could not be used without them.",
      fix: "Only costs of bringing the ASSET to its location and working condition are capitalised. Training and operating costs are expenses.",
    },
    {
      trap: "Expensing delivery, installation or testing costs.",
      fix: "All three are directly attributable to getting the asset ready for use and are capitalised.",
    },
    {
      trap: "Capitalising a repair that restores the original standard.",
      fix: "Restoring is revenue; enhancing capacity is capital. Ask whether the asset is now BETTER than it was, not merely working again.",
    },
    {
      trap: "Correcting a misclassification in the current year only.",
      fix: "Wrongly expensed capital expenditure also removed the depreciation from every later year. Restate the asset, then charge the depreciation that should have been charged.",
    },
    {
      trap: "Treating the asset register as part of the double entry.",
      fix: "It is a memorandum record. Its totals should RECONCILE to the ledger; it does not post to it.",
    },
  ],
  keyTerms: [
    { term: "Non-current asset", def: "An asset held for use in the business over more than one accounting period rather than for resale." },
    { term: "Capital expenditure", def: "Expenditure that acquires a non-current asset or enhances its earning capacity, capitalised and depreciated over its life." },
    { term: "Revenue expenditure", def: "Expenditure that maintains existing capacity or relates to the period's trading, charged to profit or loss immediately." },
    { term: "Directly attributable costs", def: "Costs necessary to bring an asset to the location and condition needed for its intended use, such as delivery, installation and testing." },
    { term: "Non-current asset register", def: "A memorandum record of every individual asset — cost, date, depreciation, carrying amount and disposal — reconciled to the general ledger." },
  ],
  summary: [
    "A non-current asset is held for use over more than one period; the test is intended use, not the item.",
    "Capital expenditure acquires or enhances and is capitalised; revenue expenditure maintains and is expensed.",
    "Cost includes purchase price net of trade discount, delivery, installation, testing and site preparation.",
    "Training, insurance, licences and maintenance are expenses, however necessary they are.",
    "Misclassifying capital as revenue misstates this year's profit and assets and every later year's depreciation.",
    "The asset register holds per-asset detail outside the double entry and should reconcile to the ledger.",
  ],
  knowledgeDiagnostic: [
    { q: "State the test for capital versus revenue expenditure.", a: "Does the spending make the asset better than it was, or keep it as it was? Better is capital; keep is revenue." },
    { q: "Which costs on an invoice for new plant are capitalised?", a: "Purchase price net of trade discount, plus delivery, installation, testing and any site preparation necessary to use the asset." },
    { q: "Why is staff training on a new machine not capitalised?", a: "It is not a cost of the asset itself — the machine is complete and working without it. It is an expense of the period." },
    { q: "What four misstatements follow from expensing capital expenditure?", a: "This year's profit and non-current assets are understated; later years' profits are overstated because the depreciation that should have been charged is not." },
    { q: "Give three reasons a register total might differ from the ledger.", a: "An acquisition not entered in the register, a disposal not removed from it, or depreciation recorded in one and not the other. An asset entered at the wrong cost is a fourth." },
  ],
  furtherStudy: [
    "Chapter 13 spreads the capitalised cost over the asset's life.",
    "Chapter 14 deals with what happens when the asset is sold or revalued.",
    "Chapter 25 draws the non-current asset disclosure note from the register.",
  ],
}

/* ── Chapter 13 · D5 ───────────────────────────────────────────── */

export const FA_TREE_13: StudyChapter = {
  id: "FA-13",
  number: 13,
  paper: "FA",
  area: "D",
  title: "Depreciation",
  minutes: 18,
  syllabusRefs: ["D5(a)", "D5(b)", "D5(c)", "D5(d)", "D5(f)", "D5(g)"],
  intro:
    "Depreciation is not an attempt to value anything and it is not a fund for replacement. It is the accruals basis applied to an asset used up over several years.",
  outcomes: [
    "Explain the purpose of depreciation",
    "Calculate depreciation using the straight-line and reducing-balance methods",
    "Identify the circumstances in which each method is appropriate",
    "Record the depreciation charge and accumulated depreciation in the general ledger",
    "Calculate the adjustment required when the estimated useful life or residual value changes",
  ],
  sections: [
    {
      id: "purpose",
      heading: "What depreciation is for",
      blocks: [
        {
          kind: "definition",
          term: "Depreciation",
          md: "Spreading an asset's cost, less anything expected back at the end, **systematically across the periods that use it up**. It matches the cost of using an asset to the periods that benefit — the **accruals** basis applied to a long-lived asset, not a measurement of value.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Three things depreciation is not",
          md: "**Not a valuation.** Carrying amount is cost less depreciation charged so far, and no one claims it equals market value.\n\n**Not a cash fund.** No money is set aside; the entry never touches the bank.\n\n**Not optional for assets still in use.** An asset in use is being consumed, so a charge arises — even if its market value has risen. Land is the standard exception, because it does not have a limited useful life.",
        },
        {
          kind: "formula",
          name: "Straight-line depreciation",
          expr: "Annual charge = (Cost − Residual value) ÷ Useful life in years",
          note: "Often quoted instead as a percentage of cost, e.g. 20% straight line means five years with no residual value.",
        },
        {
          kind: "formula",
          name: "Reducing-balance depreciation",
          expr: "Annual charge = Carrying amount at the start of the year × Rate",
          note: "Carrying amount = cost − accumulated depreciation. The charge falls each year and never quite reaches zero, so residual value is not deducted first.",
        },
        {
          kind: "table",
          caption: "Choosing the method",
          head: ["Method", "Pattern of charge", "Appropriate when"],
          rows: [
            ["**Straight line**", "Equal every year", "Benefit is consumed evenly — buildings, fixtures, fittings, licences and most equipment used at a steady rate"],
            ["**Reducing balance**", "High at first, falling", "Benefit is greatest in the early years, or maintenance costs rise with age — vehicles, IT equipment, plant that loses efficiency"],
          ],
        },
      ],
      check: {
        q: "A company's property has risen in market value every year since purchase and is not revalued in the accounts. What depreciation is charged?",
        options: [
          "None, because the asset has not lost value",
          "Depreciation is still charged over the building's useful life",
          "Only the increase in value is recorded, with no charge",
          "Depreciation is charged only when the value eventually falls",
        ],
        correct: 1,
        explain:
          "Depreciation continues. It ALLOCATES the cost of using the building over the periods that benefit — it is not a measure of value, so a rising market price is irrelevant. Note that the land element is not depreciated, because land does not have a limited useful life; the building on it does.",
      },
    },
    {
      id: "computing",
      heading: "Computing and recording the charge",
      blocks: [
        {
          kind: "table",
          caption: "The entries, and where each figure appears",
          head: ["Step", "Debit", "Credit"],
          rows: [
            ["Charge for the year", "Depreciation expense", "Accumulated depreciation"],
            ["Presentation", "Expense in profit or loss", "Deducted from cost in the statement of financial position"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Two accounts, and why the cost account never changes",
          md: "The **cost** account holds the original cost until the asset leaves. The **accumulated depreciation** account collects every charge ever made against that class. Carrying amount is the difference. Debiting the cost account with depreciation destroys both figures and the disclosure note that depends on them.",
        },
        {
          kind: "example",
          title: "Both methods on the same asset, with a part-year",
          scenario:
            "Ravensworth Co buys a machine on 1 April 20X4 for $60,000, with an estimated residual value of $6,000 and a useful life of four years. The year end is 31 December. Depreciation is charged from the date of acquisition on a monthly basis. Compare straight line with reducing balance at 35%.",
          steps: [
            { label: "Straight line — full-year charge", detail: "($60,000 − $6,000) ÷ 4 = $13,500 a year." },
            { label: "Straight line — 20X4", detail: "Nine months from 1 April: $13,500 × 9/12 = $10,125. Carrying amount at 31 December 20X4 is $49,875." },
            { label: "Straight line — 20X5", detail: "A full year, $13,500. Accumulated depreciation $23,625; carrying amount $36,375." },
            { label: "Reducing balance — 20X4", detail: "Residual value is NOT deducted. $60,000 × 35% × 9/12 = $15,750. Carrying amount $44,250." },
            { label: "Reducing balance — 20X5", detail: "$44,250 × 35% = $15,487.50. Accumulated depreciation $31,237.50; carrying amount $28,762.50." },
            { label: "Check both", detail: "In each case cost $60,000 = accumulated depreciation + carrying amount. Straight line: 23,625 + 36,375 = 60,000. Reducing balance: 31,237.50 + 28,762.50 = 60,000." },
          ],
          result:
            "After two periods the carrying amount is $36,375 under straight line and $28,762.50 under reducing balance — the same asset, the same cost, a different allocation. The check that matters: cost always equals accumulated depreciation plus carrying amount, and the reducing-balance charge is applied to the CARRYING AMOUNT with no deduction for residual value. Deducting residual value first is the single most common reducing-balance error.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Read the depreciation policy before calculating",
          md: "A question will state one of: **monthly** (pro-rate by months owned), a **full year whenever the asset is bought**, or a **full year on acquisition with nothing charged in the year it leaves**. Each gives a different answer from identical facts, and the policy is always in the question. Applying your own convention instead is the fastest way to lose an otherwise correct computation.",
        },
      ],
      check: {
        q: "An asset costing $80,000 with a residual value of $8,000 is depreciated at 25% reducing balance. What is the charge in the second full year?",
        options: ["$18,000", "$15,000", "$13,500", "$20,000"],
        correct: 1,
        explain:
          "Year 1: $80,000 × 25% = $20,000, leaving a carrying amount of $60,000. Year 2: $60,000 × 25% = $15,000. Residual value is NOT deducted under reducing balance — deducting it first would give $18,000 in year 1 and $13,500 in year 2, which is exactly the trap the distractors set.",
      },
    },
    {
      id: "changes-in-estimate",
      heading: "When the estimate changes",
      blocks: [
        {
          kind: "text",
          md: "Useful life and residual value are estimates, and an estimate can turn out to be wrong. When it does, the answer is not to restate the past: the depreciation already charged was the best estimate at the time. Instead, the **remaining** carrying amount is spread over the **revised remaining** life.",
        },
        {
          kind: "formula",
          name: "Revised depreciation after a change in estimate",
          expr: "Revised annual charge = (Carrying amount at the date of change − Revised residual value) ÷ Remaining useful life",
        },
        {
          kind: "example",
          title: "A revised life, three years in",
          scenario:
            "A machine cost $150,000 on 1 January 20X1 and was depreciated straight line over ten years with no residual value. On 1 January 20X4, after three years, the directors conclude that its total useful life will be eight years rather than ten, and that it will have a residual value of $10,000.",
          steps: [
            { label: "Depreciation charged so far", detail: "$150,000 ÷ 10 = $15,000 a year × 3 years = $45,000." },
            { label: "Carrying amount at the date of change", detail: "$150,000 − $45,000 = $105,000. The past is NOT restated." },
            { label: "Remaining useful life", detail: "Revised total life of eight years less three already elapsed = five years remaining." },
            { label: "Apply the formula", detail: "($105,000 − $10,000) ÷ 5 = $19,000 a year from 20X4 onwards." },
            { label: "Prove it to the end", detail: "Five years × $19,000 = $95,000, plus the $45,000 already charged = $140,000 total depreciation, leaving exactly the $10,000 residual value." },
          ],
          result:
            "The charge rises from $15,000 to $19,000 a year. The check that matters: total depreciation over the asset's whole life must equal cost less residual value — $150,000 − $10,000 = $140,000 — and the proof at the last step is what confirms the remaining life and residual value were both handled correctly.",
        },
      ],
      check: {
        q: "An asset cost $40,000 and has been depreciated straight line over five years with no residual value. After two years the remaining useful life is revised to six more years. What is the new annual charge?",
        options: ["$8,000", "$4,000", "$6,667", "$5,000"],
        correct: 1,
        explain:
          "Depreciation to date is 2 × $8,000 = $16,000, so the carrying amount is $24,000. Spread over the revised remaining life of SIX years gives $4,000 a year. Prior years are not restated — the change affects the future only, which is why the numerator is the carrying amount and not the original cost.",
      },
    },
    {
      id: "depreciating-a-class",
      heading: "Depreciating a whole class, with additions and disposals in the year",
      blocks: [
        {
          kind: "text",
          md: "Exam questions rarely give you one asset in isolation. The realistic case is a class of assets with something bought and something sold during the year, and the marks are for applying the stated policy consistently to each.",
        },
        {
          kind: "formula",
          name: "The class working",
          expr: "Charge for the year = Charge on assets held all year + Charge on additions (pro-rated per the policy) + Charge on disposals up to the disposal date (if the policy requires one)",
        },
        {
          kind: "example",
          title: "One year's charge on a class of plant",
          scenario:
            "Aldercote Co's plant at 1 January 20X6 cost $600,000 with accumulated depreciation of $216,000. During the year it bought plant for $150,000 on 1 May and sold plant which had cost $80,000, and had accumulated depreciation of $44,000 at 1 January, on 31 August. Plant is depreciated at 15% on cost, charged monthly from acquisition to disposal. The year end is 31 December.",
          steps: [
            { label: "Split the opening cost", detail: "Of the $600,000 opening cost, $80,000 relates to the asset sold, so $520,000 was held all year." },
            { label: "Charge on assets held all year", detail: "$520,000 × 15% = $78,000 for the full twelve months." },
            { label: "Charge on the addition", detail: "$150,000 × 15% × 8/12 (May to December) = $15,000." },
            { label: "Charge on the disposal", detail: "$80,000 × 15% × 8/12 (January to August) = $8,000, charged up to the date of disposal as the policy requires." },
            { label: "Total the charge", detail: "$78,000 + $15,000 + $8,000 = $101,000 for the year." },
            { label: "Work the disposal", detail: "Accumulated depreciation on the asset sold = $44,000 brought forward + $8,000 for the year = $52,000, so its carrying amount at disposal was $80,000 − $52,000 = $28,000. That is the figure compared with proceeds in chapter 14." },
            { label: "Reconcile the class", detail: "Closing cost = $600,000 + $150,000 − $80,000 = $670,000. Closing accumulated depreciation = $216,000 + $101,000 − $52,000 eliminated on disposal = $265,000. Carrying amount $405,000." },
          ],
          result:
            "A charge of $101,000, closing cost of $670,000 and accumulated depreciation of $265,000. Two checks matter. First, the depreciation on the DISPOSED asset must be charged up to the disposal date and then ELIMINATED from accumulated depreciation — it is easy to do one and forget the other. Second, the class reconciliation gives the non-current assets disclosure note in chapter 25 directly, so getting it to balance is doing two questions at once.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Do not depreciate the opening cost in full",
          md: "The commonest error in a class question is charging 15% on the whole opening cost of $600,000 — which depreciates the asset that was sold for a full year and gives $90,000 instead of $78,000 + $8,000. Split the opening cost between what was held all year and what left, and handle each separately.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Deducting residual value before applying a reducing-balance rate.",
      fix: "Reducing balance applies the rate to the CARRYING AMOUNT with no deduction. Only straight line deducts residual value.",
    },
    {
      trap: "Applying your own part-year convention instead of the stated policy.",
      fix: "The question always states it — monthly, or a full year in the year of acquisition. Read it first; identical facts give different answers under each.",
    },
    {
      trap: "Restating prior years when the useful life changes.",
      fix: "Spread the CARRYING AMOUNT less revised residual value over the REMAINING life. The past charges stand.",
    },
    {
      trap: "Crediting depreciation to the asset cost account.",
      fix: "Credit ACCUMULATED DEPRECIATION. The cost account holds original cost until disposal, and the disclosure note needs both figures.",
    },
    {
      trap: "Omitting depreciation because the asset's market value has risen.",
      fix: "Depreciation allocates cost over the period of use; it is not a valuation. Only land, having no limited useful life, escapes.",
    },
    {
      trap: "Treating depreciation as setting cash aside for replacement.",
      fix: "The entry never touches the bank. It charges profit and accumulates against the asset — no fund is created.",
    },
  ],
  keyTerms: [
    { term: "Depreciation", def: "The systematic allocation of an asset's depreciable amount over its useful life, applying the accruals basis." },
    { term: "Depreciable amount", def: "Cost less residual value — the amount to be charged to profit or loss over the asset's life." },
    { term: "Residual value", def: "The amount expected to be recovered at the end of an asset's useful life, deducted under straight line but not under reducing balance." },
    { term: "Carrying amount", def: "Cost less accumulated depreciation to date." },
    { term: "Accumulated depreciation", def: "The total depreciation charged against an asset class since acquisition, deducted from cost on the face of the statement of financial position." },
    { term: "Change in estimate", def: "A revision to useful life or residual value, applied by spreading the remaining carrying amount over the revised remaining life without restating the past." },
  ],
  summary: [
    "Depreciation allocates the cost of using an asset to the periods that benefit; it is not a valuation or a cash fund.",
    "Straight line charges (cost − residual value) ÷ life; reducing balance charges a rate on the carrying amount.",
    "Straight line suits even consumption; reducing balance suits assets whose benefit is greatest early.",
    "Debit depreciation expense and credit accumulated depreciation; the cost account is untouched until disposal.",
    "Cost always equals accumulated depreciation plus carrying amount.",
    "A change in estimated life or residual value spreads the remaining carrying amount over the revised remaining life.",
    "Total depreciation over the whole life must equal cost less final residual value.",
  ],
  knowledgeDiagnostic: [
    { q: "What is depreciation actually measuring?", a: "The allocation of an asset's cost to the periods that benefit from using it — an application of the accruals basis, not a change in value." },
    { q: "How does the reducing-balance calculation differ from straight line?", a: "The rate is applied to the carrying amount at the start of the year, and residual value is not deducted first." },
    { q: "How is a revision of useful life accounted for?", a: "Prospectively: the carrying amount less any revised residual value is spread over the revised remaining life. Prior years are not restated." },
    { q: "Which account is credited with the annual charge, and why not the cost account?", a: "Accumulated depreciation. The cost account must retain original cost for the disposal calculation and the disclosure note." },
    { q: "Is depreciation charged on an asset whose market value has increased?", a: "Yes, for as long as it is in use with a limited useful life. Only land is excepted, because its useful life is not limited." },
  ],
  furtherStudy: [
    "Chapter 14 uses accumulated depreciation to compute the gain or loss on disposal.",
    "Chapter 15 applies the same logic to intangibles as amortisation.",
  ],
}

/* ── Chapter 14 · D4(f)–(i), D5(e) ─────────────────────────────── */

export const FA_TREE_14: StudyChapter = {
  id: "FA-14",
  number: 14,
  paper: "FA",
  area: "D",
  title: "Disposals, part-exchange and revaluation",
  minutes: 19,
  syllabusRefs: ["D4(f)", "D4(g)", "D4(h)", "D4(i)", "D5(e)"],
  intro:
    "Every disposal question is the same question: what was the asset still worth in the books, and what did we get for it? The apparatus exists so you can answer that without losing a figure.",
  outcomes: [
    "Calculate and record the gain or loss on disposal of a tangible non-current asset",
    "Account for a disposal settled partly by part-exchange",
    "Record the revaluation of a tangible non-current asset and present it correctly",
    "Work out the result on disposing of an asset that has been revalued",
    "Move the extra depreciation on a revalued asset from the surplus into retained earnings",
  ],
  sections: [
    {
      id: "disposals",
      heading: "The disposal account",
      blocks: [
        {
          kind: "formula",
          name: "Gain or loss on disposal",
          expr: "Proceeds − Carrying amount at the date of disposal = Gain (if positive) or Loss (if negative)",
          note: "Carrying amount = cost − accumulated depreciation to the date of disposal, including any charge for the part-year up to disposal if the policy requires one.",
        },
        {
          kind: "list",
          style: "number",
          title: "The four entries, in order",
          items: [
            "**Remove the cost**: debit disposals, credit the asset cost account with the original cost.",
            "**Remove the accumulated depreciation**: debit accumulated depreciation, credit disposals with the depreciation charged on that asset.",
            "**Record the proceeds**: debit bank (or receivables), credit disposals.",
            "**Balance the disposal account**: the remaining balance is the gain or the loss, transferred to profit or loss. A credit balance is a gain; a debit balance is a loss.",
          ],
        },
        {
          kind: "diagram",
          diagram: {
            type: "tAccount",
            title: "A disposal account that produces a gain",
            caption: "Cost in on the debit side, depreciation and proceeds in on the credit side; the balance is the result.",
            data: {
              name: "Disposal",
              debits: [
                { label: "Asset at cost", amount: 40000 },
                { label: "Gain to profit or loss", amount: 3000 },
              ],
              credits: [
                { label: "Accumulated depreciation", amount: 28000 },
                { label: "Proceeds", amount: 15000 },
              ],
            },
          },
        },
        {
          kind: "example",
          title: "A straightforward disposal",
          scenario:
            "Alderney Co sells a machine on 30 September 20X6 for $15,000. It cost $40,000 on 1 January 20X3 and is depreciated at 20% straight line with no residual value. The company's policy is to charge depreciation monthly, including in the year of disposal. The year end is 31 December.",
          steps: [
            { label: "Annual charge", detail: "$40,000 × 20% = $8,000 a year." },
            { label: "Depreciation to the date of disposal", detail: "20X3 to 20X5 is three full years = $24,000, plus nine months of 20X6 at $8,000 × 9/12 = $6,000. Total accumulated depreciation $30,000." },
            { label: "Carrying amount at disposal", detail: "$40,000 − $30,000 = $10,000." },
            { label: "Compare with proceeds", detail: "Proceeds $15,000 − carrying amount $10,000 = a GAIN of $5,000." },
            { label: "Record it", detail: "Debit disposals $40,000 / credit cost $40,000; debit accumulated depreciation $30,000 / credit disposals $30,000; debit bank $15,000 / credit disposals $15,000. The disposal account has a $5,000 credit balance — the gain." },
            { label: "Check the trap", detail: "Omitting the nine months of 20X6 depreciation would give a carrying amount of $16,000 and a LOSS of $1,000 — the same facts producing the opposite sign, which is why the part-year charge is the first thing to look for." },
          ],
          result:
            "A gain on disposal of $5,000, credited to profit or loss and disclosed separately if material. The check that matters: the disposal account must clear to exactly the gain or loss — if anything is left over, either the cost or the accumulated depreciation for that specific asset was wrong.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The gain is not revenue",
          md: "A gain on disposal is not revenue and is not \"profit on sale of goods\". It is the correction of an accumulated over-charge of depreciation — the business depreciated the asset more heavily than the market ultimately did. Presenting it within revenue overstates revenue and distorts every margin computed from it.",
        },
      ],
      check: {
        q: "An asset costing $50,000 with accumulated depreciation of $34,000 is sold for $12,000. What is recorded in profit or loss?",
        options: ["A loss of $4,000", "A gain of $12,000", "A loss of $38,000", "A gain of $4,000"],
        correct: 0,
        explain:
          "Carrying amount is $50,000 − $34,000 = $16,000, and proceeds are $12,000, so there is a LOSS of $4,000. The $38,000 figure comes from comparing proceeds with cost, which ignores four years of depreciation already charged — the commonest error on disposals.",
      },
    },
    {
      id: "part-exchange",
      heading: "Part-exchange",
      blocks: [
        {
          kind: "text",
          md: "In a part-exchange the old asset is not sold for cash — its agreed trade-in allowance forms part of the payment for the new one. Nothing about the disposal logic changes: the **allowance is the proceeds**, and the new asset's cost is the allowance plus whatever cash is paid.",
        },
        {
          kind: "formula",
          name: "Part-exchange",
          expr: "Proceeds on the old asset = Trade-in allowance   ·   Cost of the new asset = Trade-in allowance + Cash paid",
        },
        {
          kind: "example",
          title: "Replacing a vehicle by part-exchange",
          scenario:
            "Brackley Co replaces a van on 1 July 20X7. The old van cost $26,000 on 1 July 20X4 and has been depreciated at 25% reducing balance, charging a full year whenever an asset is bought and nothing in the year it leaves. The dealer allows $9,000 against a new van priced at $34,000, and Brackley pays the balance in cash.",
          steps: [
            { label: "Depreciate the old van", detail: "20X4: $26,000 × 25% = $6,500, carrying amount $19,500. 20X5: $4,875, carrying amount $14,625. 20X6: $3,656.25, carrying amount $10,968.75. No charge in 20X7, the year of disposal." },
            { label: "Accumulated depreciation", detail: "$6,500 + $4,875 + $3,656.25 = $15,031.25, and $26,000 − $15,031.25 = a carrying amount of $10,968.75." },
            { label: "Identify the proceeds", detail: "The trade-in allowance of $9,000 IS the proceeds. No cash is received for the old van." },
            { label: "Compute the result", detail: "$9,000 − $10,968.75 = a LOSS on disposal of $1,968.75." },
            { label: "Record the new asset", detail: "Cost = allowance $9,000 + cash paid $25,000 = $34,000. Debit motor vehicles $34,000; credit disposals $9,000 and bank $25,000." },
            { label: "Check the cash", detail: "Cash paid is the $34,000 price less the $9,000 allowance = $25,000, and the new asset is still recognised at its full $34,000 cost." },
          ],
          result:
            "A loss on disposal of $1,968.75, and a new van recognised at $34,000. The check that matters: the new asset's cost is the FULL price, not the cash paid. Recognising it at $25,000 understates the asset and every future depreciation charge, and it is the error the part-exchange structure is designed to provoke.",
        },
      ],
      check: {
        q: "A machine with a carrying amount of $7,500 is traded in against a new machine costing $30,000. The supplier allows $6,000 for the old machine and the balance is paid in cash. What is recorded?",
        options: [
          "A loss of $1,500 and a new asset of $24,000",
          "A loss of $1,500 and a new asset of $30,000",
          "No gain or loss, and a new asset of $30,000",
          "A gain of $6,000 and a new asset of $24,000",
        ],
        correct: 1,
        explain:
          "The allowance of $6,000 is the proceeds, so the loss is $6,000 − $7,500 = $1,500. The new machine is recognised at its full cost of $30,000 — the $6,000 allowance plus $24,000 cash. Recognising it at the cash paid alone is the trap, and it would understate the asset by exactly the allowance.",
      },
    },
    {
      id: "revaluation",
      heading: "Revaluation, and the excess-depreciation transfer",
      blocks: [
        {
          kind: "text",
          md: "A business may choose to carry a class of assets — most often property — at **fair value** rather than at cost less depreciation. The uplift is not profit: the asset has not been sold and no income has been earned, so the gain goes to **other comprehensive income** and accumulates in a **revaluation surplus** within equity.",
        },
        {
          kind: "list",
          style: "number",
          title: "Recording a revaluation upward",
          items: [
            "Increase the asset to the revalued amount: **debit** the asset account with the uplift on cost.",
            "Eliminate the accumulated depreciation on that asset: **debit** accumulated depreciation with the whole balance.",
            "**Credit the revaluation surplus** with the total of the two — the difference between fair value and the previous carrying amount.",
            "Report the gain in **other comprehensive income** for the year, not in profit or loss.",
            "Depreciate the **revalued** amount over the **remaining** useful life from that point.",
          ],
        },
        {
          kind: "formula",
          name: "The revaluation gain, and the excess depreciation transfer",
          expr: "Gain = Fair value − Carrying amount   ·   Excess depreciation = Depreciation on the revalued amount − Depreciation on the original cost",
          note: "The excess is transferred from the revaluation surplus to retained earnings — a movement WITHIN equity, never through profit or loss.",
        },
        {
          kind: "example",
          title: "A revaluation, and the year that follows it",
          scenario:
            "Crayford Co owns a building that cost $500,000 on 1 January 20X1, depreciated straight line over 50 years with no residual value. On 1 January 20X6 it is revalued to $675,000, with the remaining useful life unchanged at 45 years. Crayford transfers excess depreciation between reserves each year.",
          steps: [
            { label: "Carrying amount before revaluation", detail: "Annual charge $500,000 ÷ 50 = $10,000. Five years to 31 December 20X5 = $50,000. Carrying amount $450,000." },
            { label: "The revaluation gain", detail: "$675,000 − $450,000 = $175,000, credited to the revaluation surplus and reported in other comprehensive income — NOT in profit or loss." },
            { label: "The entries", detail: "Debit building cost $175,000 and debit accumulated depreciation $50,000; credit revaluation surplus $225,000. The asset now stands at $675,000 with no accumulated depreciation." },
            { label: "Depreciation from 20X6", detail: "$675,000 ÷ 45 remaining years = $15,000 a year, charged to profit or loss." },
            { label: "The excess depreciation", detail: "$15,000 on the revalued amount less $10,000 that would have been charged on cost = $5,000 a year." },
            { label: "Transfer the excess", detail: "Debit revaluation surplus $5,000, credit retained earnings $5,000. Both sides are equity, so total equity is unchanged and profit is untouched." },
          ],
          result:
            "A revaluation surplus of $175,000 in other comprehensive income, a depreciation charge that rises from $10,000 to $15,000, and an annual transfer of $5,000 within equity. The check that matters: the transfer does not change total equity or profit — it moves an amount that is now realised through use out of a non-distributable surplus and into retained earnings, and a candidate who routes either the gain or the transfer through profit or loss overstates profit twice.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Disposal of a revalued asset",
          md: "The gain or loss is still **proceeds less carrying amount** — and the carrying amount is now based on the **revalued** figure. The balance remaining in the revaluation surplus for that asset is **not** part of the gain: it is transferred directly to retained earnings, within equity. So a revalued asset sold at exactly its carrying amount produces no gain in profit or loss, whatever sits in the surplus.",
        },
      ],
      check: {
        q: "A property with a carrying amount of $300,000 is revalued to $420,000. How is the $120,000 reported?",
        options: [
          "As a gain in profit or loss for the year",
          "In other comprehensive income, accumulating in a revaluation surplus within equity",
          "As deferred income within liabilities",
          "As a reduction of accumulated depreciation only, with no gain reported",
        ],
        correct: 1,
        explain:
          "The uplift goes to OTHER COMPREHENSIVE INCOME and accumulates in the revaluation surplus in equity. It is not profit — nothing has been sold and no income earned. Routing it through profit or loss would overstate distributable profit by $120,000 on a gain that is entirely unrealised.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Comparing proceeds with cost instead of with carrying amount.",
      fix: "The gain or loss is proceeds less CARRYING AMOUNT. Cost alone ignores every year of depreciation already charged.",
    },
    {
      trap: "Omitting the part-year depreciation charge up to the date of disposal.",
      fix: "Apply the stated policy. On a monthly policy the charge to the disposal date is required, and omitting it can flip a gain into a loss.",
    },
    {
      trap: "Recognising a part-exchanged asset at the cash paid.",
      fix: "Cost is the trade-in allowance PLUS the cash. The allowance is simultaneously the proceeds on the old asset.",
    },
    {
      trap: "Reporting a revaluation gain in profit or loss.",
      fix: "It goes to other comprehensive income and the revaluation surplus in equity. Nothing has been realised.",
    },
    {
      trap: "Depreciating the original cost after a revaluation.",
      fix: "Depreciate the REVALUED amount over the REMAINING useful life, and transfer the excess over the old charge within equity.",
    },
    {
      trap: "Adding the revaluation surplus to the gain when a revalued asset is sold.",
      fix: "The gain is still proceeds less carrying amount. The remaining surplus is transferred directly to retained earnings, inside equity.",
    },
  ],
  keyTerms: [
    { term: "Disposal account", def: "The working account holding an asset's cost, its accumulated depreciation and the proceeds, whose balance is the gain or loss." },
    { term: "Gain on disposal", def: "The excess of proceeds over carrying amount — a correction of over-depreciation, not revenue." },
    { term: "Part-exchange allowance", def: "The amount a supplier allows for an old asset against a new one; it is the proceeds on disposal and part of the new asset's cost." },
    { term: "Revaluation surplus", def: "The equity reserve accumulating unrealised gains on revalued assets, credited through other comprehensive income." },
    { term: "Excess depreciation", def: "The extra depreciation charged because an asset is carried at a revalued amount, transferred from revaluation surplus to retained earnings within equity." },
  ],
  summary: [
    "Gain or loss on disposal is proceeds less carrying amount at the date of disposal.",
    "The disposal account takes in the cost, the accumulated depreciation and the proceeds, and clears to the gain or loss.",
    "A part-exchange allowance is the proceeds on the old asset and part of the new asset's cost.",
    "A revaluation gain goes to other comprehensive income and the revaluation surplus, never to profit or loss.",
    "After a revaluation, depreciate the revalued amount over the remaining life.",
    "Excess depreciation is transferred from revaluation surplus to retained earnings — a movement within equity.",
    "On disposal of a revalued asset the gain is still proceeds less carrying amount; the surplus goes straight to retained earnings.",
  ],
  knowledgeDiagnostic: [
    { q: "What is compared with proceeds to find the gain or loss?", a: "The carrying amount at the date of disposal — cost less accumulated depreciation, including any part-year charge the policy requires." },
    { q: "In a part-exchange, what are the proceeds and what is the new asset's cost?", a: "The trade-in allowance is the proceeds; the new asset's cost is that allowance plus the cash paid." },
    { q: "Where is an upward revaluation reported?", a: "In other comprehensive income, accumulating in the revaluation surplus within equity. It is not profit." },
    { q: "How is excess depreciation on a revalued asset dealt with?", a: "Transferred from revaluation surplus to retained earnings — within equity, so total equity and profit are unaffected." },
    { q: "Does the revaluation surplus form part of the gain when the asset is sold?", a: "No. The gain is proceeds less carrying amount; the remaining surplus is transferred directly to retained earnings." },
  ],
  furtherStudy: [
    "Chapter 25 presents the non-current asset note that reconciles cost, revaluation, depreciation and disposals.",
    "Chapter 26 treats disposal proceeds as an investing cash flow and removes the gain from profit.",
    "FR develops revaluation, impairment and the revaluation of a downward movement.",
  ],
}

/** Chapters 9–14 — the first half of Area D, in reading order. */
export const FA_TREE_AREA_D1: StudyChapter[] = [
  FA_TREE_09,
  FA_TREE_10,
  FA_TREE_11,
  FA_TREE_12,
  FA_TREE_13,
  FA_TREE_14,
]
