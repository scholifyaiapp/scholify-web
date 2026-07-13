import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FA · Area D — Recording transactions and events.
 * The engine room of FA: how everyday transactions and the year-end adjustments
 * turn into the numbers on the statements. Original, syllabus-aligned; no
 * ACCA/Kaplan/BPP text. Every figure is re-solved from first principles.
 */

export const FA_D: StudyChapter = {
  paper: "FA",
  area: "D",
  title: "Recording transactions & events",
  minutes: 17,
  intro: "A business earns, spends, holds stock and wears out its machines every single day. This is where those events become entries — and where the year-end adjustments make the profit honest.",
  outcomes: [
    "Record sales and purchases and account for sales tax (VAT) correctly",
    "Value inventory at the lower of cost and net realisable value under IAS 2",
    "Split capital from revenue expenditure and depreciate non-current assets by both methods",
    "Account for the disposal of a non-current asset, including the profit or loss on disposal",
    "Apply the matching concept through accruals and prepayments",
    "Deal with irrecoverable debts and the allowance for receivables, and outline provisions under IAS 37",
  ],
  sections: [
    {
      id: "sales-tax",
      heading: "Sales, purchases and sales tax",
      blocks: [
        { kind: "text", md: "Every business has two engines: it **sells** (revenue) and it **buys** (purchases and expenses). Recording a sale looks simple — **debit** the customer (a receivable) or cash, and **credit** revenue. A purchase is the mirror: **debit** purchases, **credit** the supplier or cash. The complication most beginners trip on is the tax bolted onto the side: **sales tax**, called **VAT** in many countries." },
        { kind: "text", md: "Sales tax is a tax on the final consumer, not on the business. A registered business is simply an **unpaid collector**: it charges **output tax** on what it sells, reclaims **input tax** on what it buys, and pays the **difference** over to the tax authority. Because the tax passes straight through, it **never touches revenue or purchases** in the statement of profit or loss — those are always recorded **net of sales tax**." },
        { kind: "callout", tone: "rule", title: "The net rule", md: "Revenue and purchases are recorded **excluding** sales tax. The tax you charge customers is a **liability** (you owe it to the authority); the tax you are charged by suppliers is a **receivable** (you reclaim it). Only the **net** of the two is settled with the government." },
        { kind: "formula", name: "Sales tax payable to the authority", expr: "Output tax (on sales) − Input tax (on purchases)", note: "A positive figure is owed to the tax authority; a negative figure is reclaimable." },
        { kind: "example", title: "Worked example — a quarter of sales tax", scenario: "Bright Ltd is registered for sales tax at 20%. In one quarter it makes sales with a net value of $60,000 and incurs purchases and expenses with a net value of $35,000. What is recorded as revenue, and how much is paid to the tax authority?", steps: [
          { label: "Output tax on sales", detail: "$60,000 × 20% = $12,000 charged to customers — a liability, not income." },
          { label: "Input tax on purchases", detail: "$35,000 × 20% = $7,000 charged by suppliers — reclaimable." },
          { label: "Revenue in profit or loss", detail: "The net $60,000 only. The $12,000 output tax is excluded — it was never Bright's money." },
          { label: "Sales tax payable", detail: "Output $12,000 − input $7,000 = $5,000 owed to the tax authority." },
        ], result: "Revenue is $60,000 (net). Bright hands $5,000 to the tax authority — the tax it collected less the tax it suffered. Neither the $12,000 nor the $7,000 appears in profit or loss." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Sales tax is a flow-through, not a profit",
          caption: "The business keeps none of it — it remits output tax less the input tax it reclaims.",
          data: {
            unit: "$",
            items: [
              { label: "Output tax collected", value: 12000 },
              { label: "Input tax reclaimed", value: 7000 },
              { label: "Net paid to authority", value: 5000 },
            ],
          },
        } },
        { kind: "text", md: "A customer buying $60,000 of goods actually **pays** $72,000 — the net price plus $12,000 tax. That gross figure is what lands in the bank and what the receivable shows, but the split matters: **$60,000 is revenue, $12,000 is a liability**. Getting that split wrong overstates both revenue and profit." },
      ],
      check: {
        q: "A sales-tax-registered business sells goods with a net price of $2,000, with sales tax at 20%. How is this recorded?",
        options: [
          "Revenue $2,400 and no sales tax liability",
          "Revenue $2,000 and a sales tax liability of $400",
          "Revenue $2,400 and a sales tax liability of $400",
          "Revenue $2,000 and a sales tax liability of $2,400",
        ],
        correct: 1,
        explain: "Revenue is always recorded net of sales tax, so it is the $2,000 net price. The 20% output tax of $400 (2,000 × 20%) is money owed to the tax authority — a liability. The customer pays $2,400 in total, but only $2,000 is the business's revenue.",
      },
    },
    {
      id: "inventory",
      heading: "Inventory — the lower of cost and NRV (IAS 2)",
      blocks: [
        { kind: "text", md: "Unsold goods at the year-end are an **asset** called **inventory**. The question is what number to put on them. **IAS 2** gives a deliberately cautious answer: value inventory at the **lower of cost and net realisable value (NRV)**. Prudence says an asset should never be carried at more than it can bring in." },
        { kind: "formula", name: "Net realisable value (NRV)", expr: "Expected selling price − costs to complete − costs to sell", note: "What the goods will actually put in the bank, after any finishing and selling costs." },
        { kind: "callout", tone: "warn", title: "Item by item — not in total", md: "The lower-of-cost-and-NRV test is applied to **each line of inventory separately**, then added up. You may **not** compare total cost with total NRV — that would let a profit on one item hide a loss on another." },
        { kind: "example", title: "Worked example — valuing three product lines", scenario: "At the year-end Zerra Ltd holds three lines. Alpha: cost $12,000, expected selling price $15,000, selling costs $500. Beta: cost $8,000, selling price $7,500, selling costs $600. Gamma: cost $5,000, selling price $9,000, selling costs $400. At what total value is inventory carried?", steps: [
          { label: "Alpha", detail: "NRV = 15,000 − 500 = $14,500. Lower of cost $12,000 and NRV $14,500 → carry at $12,000." },
          { label: "Beta", detail: "NRV = 7,500 − 600 = $6,900. Lower of cost $8,000 and NRV $6,900 → carry at $6,900 (a $1,100 write-down)." },
          { label: "Gamma", detail: "NRV = 9,000 − 400 = $8,600. Lower of cost $5,000 and NRV $8,600 → carry at $5,000." },
          { label: "Total", detail: "12,000 + 6,900 + 5,000 = $23,900." },
        ], result: "Inventory is carried at $23,900. Total cost was $25,000, but Beta is written down by $1,100 because its NRV has fallen below cost. That $1,100 is charged as an expense in the period." },
        { kind: "text", md: "Notice what happened to the healthy items: Alpha and Gamma stay at **cost** even though they could sell for more. IAS 2 never lets you book that future profit early — you may only ever write inventory **down**, never up. Cost itself includes purchase price plus the costs of **bringing the goods to their present location and condition** (carriage in, import duties, conversion costs), but **never** selling costs or storage of finished goods." },
      ],
      check: {
        q: "An item cost $40. It can be sold for $48, but needs $12 of repairs before it can be sold. At what value is it included in inventory?",
        options: ["$48", "$40", "$36", "$28"],
        correct: 2,
        explain: "NRV = selling price 48 − costs to sell/complete 12 = $36. Inventory is carried at the lower of cost ($40) and NRV ($36), so $36. The item is written down by $4 because it cannot realise its cost.",
      },
    },
    {
      id: "nca-dep",
      heading: "Non-current assets, capital vs revenue, and depreciation",
      blocks: [
        { kind: "text", md: "When a business buys something that will earn profits for **many years** — a machine, a vehicle, a building — that is a **non-current asset**, and its cost is **capitalised** (put on the statement of financial position) rather than expensed at once. Deciding what to capitalise starts with the **capital vs revenue** split." },
        { kind: "text", md: "**Capital expenditure** buys or improves a long-term asset; it sits on the statement of financial position. **Revenue expenditure** is the day-to-day running cost of the business; it hits profit or loss immediately. Repairing a van is revenue; buying the van is capital. Miscoding one as the other misstates **both** profit and the asset." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Capital vs revenue expenditure",
          data: {
            leftTitle: "Capital expenditure",
            rightTitle: "Revenue expenditure",
            rows: [
              { aspect: "Buys", left: "A long-life asset or an improvement to one", right: "Day-to-day running of the business" },
              { aspect: "Examples", left: "Machine, delivery van, an extension to a building", right: "Fuel, repairs, wages, insurance" },
              { aspect: "Goes to", left: "Statement of financial position (an asset)", right: "Statement of profit or loss (an expense)" },
              { aspect: "Hits profit", left: "Gradually, via depreciation", right: "Immediately, in full" },
              { aspect: "Test", left: "Lasting benefit beyond this year", right: "Benefit used up this year" },
            ],
          },
        } },
        { kind: "text", md: "A capitalised asset does not stay at cost forever. As it is **used up**, its cost is spread across the years that benefit — this is **depreciation**, the accruals concept applied to long-life assets. Depreciation is **not** an attempt to value the asset and **not** a cash flow; it is simply the systematic allocation of cost to the periods that used the asset." },
        { kind: "formula", name: "Carrying amount", expr: "Cost − Accumulated depreciation", note: "The written-down book value — what is left on the statement of financial position, not the market value." },
        { kind: "formula", name: "Straight-line depreciation", expr: "(Cost − Residual value) ÷ Useful life", note: "The same charge every year — a flat line down towards the residual value." },
        { kind: "formula", name: "Reducing-balance depreciation", expr: "Carrying amount at start of year × Fixed %", note: "A bigger charge early, tailing off — applied to the falling carrying amount, never the original cost." },
        { kind: "example", title: "Worked example — straight-line depreciation", scenario: "A machine costs $50,000, has an estimated residual value of $5,000 and a useful life of 5 years. What is the annual depreciation, and the carrying amount after 3 years?", steps: [
          { label: "Depreciable amount", detail: "Cost 50,000 − residual 5,000 = $45,000 to spread." },
          { label: "Annual charge", detail: "$45,000 ÷ 5 years = $9,000 every year." },
          { label: "Accumulated after 3 years", detail: "3 × $9,000 = $27,000." },
          { label: "Carrying amount", detail: "Cost 50,000 − accumulated 27,000 = $23,000." },
        ], result: "Depreciation is $9,000 a year. After 3 years the machine's carrying amount is $23,000 — heading in equal steps towards its $5,000 residual value at the end of year 5." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "Cost bridges to carrying amount",
          caption: "The machine after 3 years: cost, less the depreciation charged so far, equals the carrying amount.",
          data: {
            unit: "$",
            items: [
              { label: "Cost", value: 50000, kind: "start" },
              { label: "Accumulated depreciation (3 × $9,000)", value: -27000, kind: "delta" },
              { label: "Carrying amount", value: 23000, kind: "total" },
            ],
          },
        } },
        { kind: "text", md: "The **reducing-balance** method charges a fixed **percentage** of the carrying amount instead. The charge is heavy early and lighter later — useful for assets like vehicles that lose most value in their first years." },
        { kind: "table", caption: "Reducing balance — a van costing $20,000 at 25% per year", head: ["Year", "Opening carrying amount", "Depreciation (25%)", "Closing carrying amount"], rows: [
          ["1", "$20,000", "$5,000", "$15,000"],
          ["2", "$15,000", "$3,750", "$11,250"],
          ["3", "$11,250", "$2,812.50", "$8,437.50"],
        ] },
        { kind: "callout", tone: "warn", title: "The classic reducing-balance error", md: "Apply the percentage to the **carrying amount at the start of each year**, never to the original cost. Year 2 here is 25% of $15,000 = $3,750 — **not** 25% of $20,000." },
      ],
      check: {
        q: "An asset costs $12,000, has a residual value of $2,000 and a useful life of 4 years. Using the straight-line method, what is the annual depreciation charge?",
        options: ["$3,000", "$2,500", "$2,000", "$1,250"],
        correct: 1,
        explain: "Straight-line = (cost − residual) ÷ life = (12,000 − 2,000) ÷ 4 = 10,000 ÷ 4 = $2,500. The trap answer $3,000 forgets the residual value and divides the full $12,000 by 4.",
      },
    },
    {
      id: "disposals",
      heading: "Disposing of a non-current asset",
      blocks: [
        { kind: "text", md: "When an asset is sold or scrapped, everything about it must **leave** the books: its original cost and all the depreciation piled up against it. Whatever the sale proceeds turn out to be, they will rarely equal the carrying amount — and the gap is a **profit or loss on disposal**." },
        { kind: "formula", name: "Profit or loss on disposal", expr: "Sale proceeds − Carrying amount at disposal", note: "Positive = profit; negative = loss. It compares proceeds with book value, not with original cost." },
        { kind: "text", md: "A **profit on disposal** is not really a trading profit — it means the asset was depreciated **too fast** (its carrying amount fell below what it was still worth). A **loss** means it was depreciated too slowly. The disposal figure is the accounts self-correcting for estimates that turned out imperfect." },
        { kind: "example", title: "Worked example — a disposal with a loss", scenario: "The $50,000 machine above (depreciated straight-line at $9,000 a year) is sold at the end of year 3 for $20,000 cash. What is the profit or loss on disposal?", steps: [
          { label: "Accumulated depreciation", detail: "3 years × $9,000 = $27,000." },
          { label: "Carrying amount at disposal", detail: "Cost 50,000 − accumulated 27,000 = $23,000." },
          { label: "Compare with proceeds", detail: "Proceeds $20,000 − carrying amount $23,000 = −$3,000." },
          { label: "Conclusion", detail: "Proceeds are below carrying amount, so there is a loss on disposal of $3,000, charged to profit or loss." },
        ], result: "A loss on disposal of $3,000. The machine was worth $23,000 in the books but only fetched $20,000 — the accounts had depreciated it slightly too slowly." },
        { kind: "text", md: "The tidiest way to handle this in the ledger is a **disposal account**: pour in the asset's cost (debit), then credit out the accumulated depreciation and the sale proceeds. Whatever is needed to balance the account is the profit or loss." },
        { kind: "diagram", diagram: {
          type: "tAccount",
          title: "Disposal account for the machine",
          caption: "Debits and credits both total $50,000; the $3,000 balancing figure on the credit side is the loss to profit or loss.",
          data: {
            name: "Machine disposal",
            debits: [
              { label: "Machine at cost", amount: 50000 },
            ],
            credits: [
              { label: "Accumulated depreciation", amount: 27000 },
              { label: "Cash — sale proceeds", amount: 20000 },
              { label: "Loss on disposal (to P/L)", amount: 3000 },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "Check your work: debits ($50,000) must equal credits ($27,000 + $20,000 + $3,000 = $50,000). If the balancing figure lands on the **credit** side it is a **loss**; on the **debit** side it is a **profit**." },
      ],
      check: {
        q: "An asset with a carrying amount of $8,000 is sold for $9,500. What is the result on disposal?",
        options: ["A loss of $1,500", "A profit of $1,500", "A profit of $9,500", "No profit or loss"],
        correct: 1,
        explain: "Profit or loss on disposal = proceeds − carrying amount = 9,500 − 8,000 = +$1,500, a profit. The proceeds beat the book value, so the asset had been depreciated a little too aggressively.",
      },
    },
    {
      id: "accruals",
      heading: "Accruals and prepayments — making the matching honest",
      blocks: [
        { kind: "text", md: "The **accruals (matching) concept** says an expense belongs to the period that **used** it, not the period that happened to **pay** for it. Cash and the calendar rarely line up perfectly, so at the year-end we adjust with two mirror-image entries: **accruals** and **prepayments**." },
        { kind: "text", md: "An **accrual** is an expense **used but not yet paid** — you owe for something you have already consumed, so you add it to the expense and record a **current liability**. A **prepayment** is an expense **paid but not yet used** — you have paid ahead, so you strip it out of this year's expense and carry it forward as a **current asset**." },
        { kind: "example", title: "Worked example — an accrual", scenario: "During the year Delta Ltd pays $3,300 of electricity bills. The final bill of $1,100, covering October to December, arrives in January and is unpaid at the 31 December year-end. What is the electricity expense for the year?", steps: [
          { label: "Cash paid in the year", detail: "$3,300 actually left the bank." },
          { label: "Used but unpaid", detail: "Oct–Dec electricity of $1,100 has been consumed this year but not yet paid." },
          { label: "Expense (matching)", detail: "3,300 + 1,100 = $4,400 belongs to this year." },
          { label: "Year-end entry", detail: "Add $1,100 to the expense and show a $1,100 accrual (current liability)." },
        ], result: "The expense is $4,400, not the $3,300 paid. The extra $1,100 is an accrued liability — electricity used this year that will be paid next year." },
        { kind: "example", title: "Worked example — a prepayment", scenario: "On 1 October Delta Ltd pays $2,400 for 12 months' insurance covering 1 October to 30 September next year. The year-end is 31 December. How much insurance expense belongs to this year?", steps: [
          { label: "Months used this year", detail: "October, November, December = 3 months of the 12 paid." },
          { label: "Expense this year", detail: "$2,400 × 3/12 = $600." },
          { label: "Paid but not used", detail: "$2,400 × 9/12 = $1,800 relates to next year." },
          { label: "Year-end entry", detail: "Remove $1,800 from the expense and carry it as a prepayment (current asset)." },
        ], result: "Only $600 is this year's insurance expense; the remaining $1,800 is a prepayment carried forward. (Check: 600 + 1,800 = the $2,400 paid.)" },
        { kind: "diagram", diagram: {
          type: "timeline",
          title: "The insurance payment straddles the year-end",
          caption: "Paid in full on 1 October, but only 3 of the 12 months fall in this accounting year.",
          data: {
            points: [
              { label: "1 Oct — pay $2,400", sub: "12 months' cover bought" },
              { label: "31 Dec — year-end", sub: "3 months used → $600 expense" },
              { label: "Carried forward", sub: "9 months → $1,800 prepayment" },
              { label: "30 Sep next year", sub: "cover ends" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The mirror", md: "**Accrual** = used but not paid → **add** to expense, create a **liability**. **Prepayment** = paid but not used → **subtract** from expense, create an **asset**. The same logic flipped for income gives accrued income and deferred (unearned) income." },
      ],
      check: {
        q: "On 1 November a business pays $1,800 for six months' rent in advance, covering November to April. The year-end is 31 December. What is the prepayment at the year-end?",
        options: ["$600", "$900", "$1,200", "$1,500"],
        correct: 2,
        explain: "Of the six months paid, only November and December (2 months) fall in this year, so 2/6 × 1,800 = $600 is this year's expense. The remaining four months (Jan–Apr) are prepaid: 4/6 × 1,800 = $1,200, carried forward as a current asset.",
      },
    },
    {
      id: "receivables",
      heading: "Receivables, irrecoverable debts and the allowance",
      blocks: [
        { kind: "text", md: "Sell on credit and some customers will never pay. Two tools deal with this: **irrecoverable debts** (a debt you now know is lost) and the **allowance for receivables** (a prudent estimate against debts that look **doubtful** but are not yet certainly gone)." },
        { kind: "text", md: "When a specific debt becomes **irrecoverable**, you **write it off**: remove it from receivables and charge it as an expense. The entry is **debit irrecoverable debts expense, credit receivables** — the customer disappears from the ledger entirely." },
        { kind: "example", title: "Worked example — writing off an irrecoverable debt", scenario: "A customer owing $1,500 is declared bankrupt and will pay nothing. How is this recorded?", steps: [
          { label: "The reality", detail: "The $1,500 will never arrive — it is a certain loss, not merely doubtful." },
          { label: "Remove the asset", detail: "Credit receivables $1,500 — the customer's balance is cleared out." },
          { label: "Record the cost", detail: "Debit irrecoverable debts expense $1,500 in profit or loss." },
        ], result: "Receivables fall by $1,500 and an expense of $1,500 is recognised. The debt is gone from the books completely." },
        { kind: "text", md: "The **allowance for receivables** is gentler. Some debts are merely **worrying**, not dead. Prudence says reduce receivables by an estimate without removing any specific customer. Crucially, only the **change** in the allowance from one year to the next hits profit or loss — you are topping up or releasing a cushion, not re-charging the whole thing each year." },
        { kind: "formula", name: "Charge to profit or loss for the allowance", expr: "Closing allowance required − Opening allowance", note: "An increase is an expense; a decrease is a credit (income) in profit or loss." },
        { kind: "example", title: "Worked example — the allowance movement", scenario: "At the year-end, receivables (after write-offs) are $80,000. A specific balance of $2,000 is doubtful, and the business wants a general allowance of 3% on the rest. The opening allowance was $3,000. What is charged to profit or loss?", steps: [
          { label: "Specific allowance", detail: "$2,000 against the named doubtful debt." },
          { label: "General allowance", detail: "Remaining receivables 80,000 − 2,000 = 78,000, × 3% = $2,340." },
          { label: "Closing allowance required", detail: "2,000 + 2,340 = $4,340." },
          { label: "Movement", detail: "Closing 4,340 − opening 3,000 = $1,340 increase, charged as an expense." },
        ], result: "The allowance is raised to $4,340, and only the $1,340 increase is charged to profit or loss. Receivables are shown net: 80,000 − 4,340 = $75,660." },
        { kind: "callout", tone: "warn", title: "Only the movement — never the whole allowance", md: "If the allowance were already $3,000 and now needs to be $4,340, the expense is the **$1,340 top-up**, not $4,340. Charging the full closing allowance every year would double-count last year's provision." },
      ],
      check: {
        q: "The opening allowance for receivables is $2,000 and the closing allowance required is $2,600. What is recorded in profit or loss?",
        options: ["A $2,600 expense", "A $600 expense", "A $600 credit (income)", "A $2,000 expense"],
        correct: 1,
        explain: "Only the movement in the allowance affects profit or loss. The allowance rises from $2,000 to $2,600, a $600 increase, so a $600 expense is charged. The full $2,600 is the balance carried forward, not the charge for the year.",
      },
    },
    {
      id: "provisions",
      heading: "Provisions and contingencies (IAS 37)",
      blocks: [
        { kind: "text", md: "Some liabilities are certain in fact but fuzzy in **timing or amount** — a warranty that will cost *something*, a lawsuit you will *probably* lose. **IAS 37** handles these as **provisions**, and draws a careful line between what must be **recognised** and what is only **disclosed**." },
        { kind: "callout", tone: "rule", title: "When to recognise a provision", md: "Recognise a provision only when **all three** hold: (1) there is a **present obligation** from a **past event**; (2) an **outflow of economic benefit is probable** (more likely than not); and (3) the amount can be **reliably estimated**. Miss any one and it is not a provision." },
        { kind: "text", md: "If an obligation is only **possible** rather than probable, or cannot be measured reliably, it is a **contingent liability** — **disclosed** in the notes but **not** recognised. A **contingent asset** (a possible inflow, such as a claim you might win) is treated even more cautiously: disclosed only when the inflow is **probable**, and recognised only when it is **virtually certain**. Prudence again: quick to record bad news, slow to record good." },
        { kind: "table", caption: "How likely? — the IAS 37 treatment", head: ["Likelihood", "Liability", "Asset"], rows: [
          ["Virtually certain", "Recognise (it is just a liability)", "Recognise the asset"],
          ["Probable (> 50%)", "Recognise a provision", "Disclose in the notes"],
          ["Possible (< 50%)", "Disclose as a contingent liability", "Ignore"],
          ["Remote", "Ignore", "Ignore"],
        ] },
        { kind: "example", title: "Worked example — provision or contingent liability?", scenario: "At the year-end a customer is suing Corvus Ltd for $40,000 over a faulty product supplied during the year. The lawyers advise it is probable Corvus will lose and pay around $40,000. How is this treated — and how would it differ if the lawyers said Corvus would probably win?", steps: [
          { label: "Present obligation", detail: "The faulty product was supplied in the year — a past event creating a present obligation." },
          { label: "Probable outflow", detail: "Losing is probable, and $40,000 is a reliable estimate — all three conditions met." },
          { label: "If probable loss", detail: "Recognise a provision: debit expense $40,000, credit provision (liability) $40,000." },
          { label: "If probable win", detail: "The outflow is only possible, not probable — recognise nothing, but disclose a contingent liability in the notes." },
        ], result: "A probable loss becomes a $40,000 provision on the statement of financial position. A merely possible loss is disclosed as a contingent liability and kept off the face of the statements." },
      ],
    },
  ],
  examTraps: [
    { trap: "Recording revenue or purchases inclusive of sales tax.", fix: "Revenue and purchases are always net of sales tax. Output tax is a liability; input tax is reclaimable — neither touches profit or loss." },
    { trap: "Comparing total cost with total NRV for inventory.", fix: "Apply lower of cost and NRV line by line, then add up. A gain on one item can never mask a loss on another." },
    { trap: "Dividing full cost by useful life and forgetting residual value in straight-line depreciation.", fix: "Straight-line = (cost − residual) ÷ life. The residual value is subtracted before dividing." },
    { trap: "Applying the reducing-balance rate to original cost every year.", fix: "The percentage always applies to the carrying amount at the start of that year, which is falling — not to the fixed original cost." },
    { trap: "Charging the whole closing allowance for receivables to profit or loss each year.", fix: "Only the movement (closing − opening allowance) hits profit or loss. An increase is an expense; a decrease is income." },
    { trap: "Recognising a merely possible obligation as a provision.", fix: "A provision needs a probable outflow. Only possible obligations are contingent liabilities — disclosed, not recognised." },
  ],
  keyTerms: [
    { term: "Capital expenditure", def: "Spending to acquire or improve a long-life asset; capitalised on the statement of financial position and depreciated over time." },
    { term: "Depreciation", def: "The systematic allocation of a non-current asset's cost (less residual value) over its useful life — an expense, not a valuation or a cash flow." },
    { term: "Carrying amount", def: "Cost less accumulated depreciation — the written-down book value of an asset, not its market value." },
    { term: "Net realisable value (NRV)", def: "Expected selling price less costs to complete and sell; inventory is held at the lower of cost and NRV." },
    { term: "Accrual", def: "An expense used but not yet paid at the year-end — added to the expense and shown as a current liability." },
    { term: "Allowance for receivables", def: "A prudent estimate against doubtful debts; only the year-on-year movement in it is charged to profit or loss." },
  ],
  summary: [
    "Revenue and purchases are recorded net of sales tax; the business only remits output tax less reclaimable input tax to the authority.",
    "Inventory is valued at the lower of cost and NRV under IAS 2, applied item by item.",
    "Capital expenditure is capitalised and depreciated; revenue expenditure hits profit at once. Straight-line and reducing-balance spread the cost differently.",
    "On disposal, remove cost and accumulated depreciation; proceeds less carrying amount is the profit or loss on disposal.",
    "Accruals and prepayments enforce matching, and the allowance for receivables and IAS 37 provisions recognise likely losses prudently — only the movement or a probable outflow is charged.",
  ],
}
