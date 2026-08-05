import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX-UK · Area B, second part — property income and employment income. Chapters 6–8.
 *
 * Chapter 6 leads on the point most candidates get wrong before they start: for an
 * individual or a partnership, property income in TX is computed on the CASH BASIS unless
 * the question says otherwise. The examining team has said so explicitly, and a candidate
 * who accrues by habit produces a different profit from the marking guide.
 *
 * Chapters 7 and 8 split employment income deliberately. The EARNINGS side is about what
 * counts and what can be deducted, and it is largely rules; the BENEFITS side is almost
 * entirely computation, with the car, fuel, accommodation and loan calculations appearing
 * in nearly every sitting. Teaching them together buries the computations.
 *
 * Everything is FA2025 (2025/26). Two figures in chapter 8 are NOT on the exam's rate
 * sheet and must be known: the 4% diesel supplement and the 37% cap on the car benefit
 * percentage. The content flags both.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

/* ── Chapter 6 · B4 ───────────────────────────────────────────── */

export const TX_TREE_06: StudyChapter = {
  id: "TX-06",
  number: 6,
  paper: "TX",
  area: "B",
  title: "Property income",
  minutes: 18,
  syllabusRefs: ["B4(a)", "B4(b)", "B4(c)", "B4(d)", "B4(e)"],
  intro:
    "Use the cash basis unless told otherwise, deduct repairs but not improvements, and remember that residential mortgage interest is not an expense at all — it is a tax reducer.",
  outcomes: [
    "Compute property business profits on the cash basis",
    "Distinguish deductible repairs from non-deductible improvements",
    "Apply the finance cost restriction for residential property",
    "Compute the amount assessable on the grant of a short lease",
    "Apply rent-a-room relief and explain how a property business loss is relieved",
  ],
  sections: [
    {
      id: "computing-the-profit",
      heading: "The cash basis, and what can be deducted",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "The cash basis is the default — and this is an examining team instruction",
          md: "For an **individual or a partnership**, property income in TX is computed on the **CASH BASIS** unless the question specifically says otherwise. The examining team has stated that directly. So the computation is **rent actually RECEIVED in the tax year less allowable expenses actually PAID in the tax year** — not amounts accrued.\n\nTwo consequences follow and both are examinable. **Irrecoverable rent needs no separate treatment**: it was never received, so it never entered the computation, and there is no bad debt expense to claim. And an expense **paid in advance** is deducted when paid rather than being apportioned. A **company's** property income is different and is dealt with under corporation tax (chapter 21).",
        },
        {
          kind: "formula",
          name: "Property business profit — cash basis",
          expr: "Rent RECEIVED in the tax year                              X\nPremiums assessable on grant of a short lease              X\n                                                        ─────\n                                                            X\nLess allowable expenses PAID in the tax year:\n   Repairs and maintenance                               (X)\n   Insurance                                             (X)\n   Agent's and management fees                           (X)\n   Council tax and water rates, if borne by the landlord (X)\n   Advertising for tenants, legal and accountancy fees   (X)\n   Interest on a loan for a NON-residential property     (X)\n                                                        ─────\nPROPERTY BUSINESS PROFIT                                    X\n                                                        ─────\n\nAll properties of one landlord form a SINGLE property business, so a loss\non one is automatically set against a profit on another.",
          note: "Interest on a loan to buy a RESIDENTIAL letting property is NOT in this list. It is not deductible at all — relief comes instead as a basic rate tax reducer, below.",
        },
        {
          kind: "table",
          caption: "Repairs against improvements — the line that decides the mark",
          head: ["Deductible repair", "Non-deductible improvement (capital)"],
          rows: [
            ["Replacing broken roof tiles", "Adding an extension or a conservatory"],
            ["Repainting and redecorating", "Installing central heating where there was none"],
            ["Replacing a worn-out kitchen with a similar one", "Upgrading a basic kitchen to a luxury one"],
            ["Repairing an existing boiler", "Converting a loft into a bedroom"],
            ["Replacing single-glazed windows with double glazing — treated as a repair, being the modern equivalent", "Replacing a garage with a larger one"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The residential finance cost restriction is a TAX REDUCER",
          md: "Interest and other finance costs on a loan relating to a **residential** letting get **no deduction** in computing property income. Instead the landlord receives a **tax reducer of 20% of the finance cost**, deducted from the income tax **liability** after it has been computed.\n\nSo a higher rate landlord gets relief at 20% rather than 40%, which is the whole point of the restriction. Two things to state in an answer: it is deducted from the **liability**, not from income; and it therefore does **not** reduce **adjusted net income**, so it does not help with the personal allowance abatement or the child benefit charge the way a pension contribution would.",
        },
        {
          kind: "example",
          title: "A property business on the cash basis",
          scenario:
            "Elena lets two properties. During 2025/26 she received rent of £18,600 in total and paid: repairs of £2,450, insurance of £780, letting agent's fees of £1,116, and mortgage interest of £9,200 on the residential property she lets. She also granted a 30-year lease on a small commercial unit on 1 June 2025, receiving a premium of £60,000. Elena's other income is employment income of £62,000.",
          steps: [
            { label: "Compute the assessable premium", detail: "A lease of 50 years or less is a SHORT lease, so part of the premium is property income. Assessable = P − (2% × (n − 1) × P), where n is the lease length in years: £60,000 − (2% × 29 × £60,000) = £60,000 − £34,800 = £25,200. The balance of £34,800 is a capital receipt dealt with under chargeable gains." },
            { label: "Compute the rental profit on the cash basis", detail: "Rent received £18,600, less repairs £2,450, insurance £780 and agent's fees £1,116 = £14,254. The mortgage interest is NOT deducted — the property is residential." },
            { label: "Total the property income", detail: "£14,254 + £25,200 = £39,454. Both properties form one property business, so the figures are aggregated rather than reported separately." },
            { label: "Compute the finance cost tax reducer", detail: "£9,200 × 20% = £1,840. This is deducted from Elena's income tax LIABILITY, not from her property income." },
            { label: "Note the effect on her marginal rate", detail: "Elena's total income is £62,000 + £39,454 = £101,454, so she is a higher rate taxpayer and the £39,454 of property income is taxed largely at 40%. Her interest relief is only 20%, so the restriction costs her £1,840 — the difference between 40% and 20% relief on £9,200." },
            { label: "Note what the reducer does NOT do", detail: "Because it is deducted from the liability, the £9,200 does not reduce adjusted net income. Elena's adjusted net income of £101,454 exceeds £100,000, so her personal allowance is abated — and unlike a pension contribution, the interest cannot restore it." },
          ],
          result:
            "**Property income £39,454, plus a £1,840 tax reducer.** The two figures that separate a good answer are the £25,200 assessable premium and the fact that £9,200 of interest appears nowhere in the property computation.",
        },
      ],
      check: {
        q: "How is interest on a loan to buy a residential letting property relieved?",
        options: [
          "Deducted in full from property income",
          "Not deducted from income at all; relief is a tax reducer of 20% of the finance cost against the liability",
          "Deducted from total income as a relief",
          "Deducted at the landlord's marginal rate",
        ],
        correct: 1,
        explain:
          "A 20% TAX REDUCER AGAINST THE LIABILITY. It is not an expense of the property business. So a higher rate landlord gets 20% relief rather than 40%, and because it does not reduce income it also does not reduce adjusted net income — no help with the personal allowance abatement.",
      },
    },
    {
      id: "leases-rooms-losses",
      heading: "Short lease premiums, rent-a-room relief and losses",
      blocks: [
        {
          kind: "formula",
          name: "Premium on the grant of a short lease",
          expr: "A SHORT lease is one of 50 YEARS OR LESS.\n\nAmount assessable as PROPERTY INCOME:\n\n   P  −  (2%  ×  (n − 1)  ×  P)\n\n   where  P  =  the premium received\n          n  =  the length of the lease in years\n\nThe REMAINDER of the premium is a capital receipt, dealt with under\nchargeable gains.\n\nA lease of MORE than 50 years is a long lease: the whole premium is\ncapital and none of it is property income.",
          note: "The (n − 1) is what catches people: a 30-year lease uses 29, not 30. Sanity check the direction — the LONGER the lease, the SMALLER the income element, because a long lease is closer in substance to selling the property. At exactly 50 years only 2% of the premium is income; at 2 years, 98% is.",
        },
        {
          kind: "table",
          caption: "Rent-a-room relief — letting a room in your own home",
          head: ["Gross rents", "Treatment"],
          rows: [
            ["**£7,500 or less**", "**Fully exempt** — no property income, and no expenses deductible"],
            ["**More than £7,500**", "The taxpayer **chooses** whichever is better: the **normal** basis (rents less actual expenses), or the **excess** basis (gross rents less £7,500, with no expenses deductible)"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Which rent-a-room basis wins, and why",
          md: "The **excess basis** is better where actual expenses are **less than £7,500**, which is usually the case for a single let room. Compare directly: rents of £9,300 with £1,900 of expenses gives £7,400 on the normal basis against £9,300 − £7,500 = **£1,800** on the excess basis — so the excess basis saves tax on £5,600 of income. Where the room is let with substantial expenses the normal basis can win, so **compute both and choose** rather than assuming. The limit is **£7,500** for the whole property and is halved where two people share the letting income.",
        },
        {
          kind: "list",
          title: "Property business losses",
          items: [
            "All of a landlord's UK properties form **one property business**, so a loss on one property is automatically netted against profits on others within the year.",
            "A net loss on the property business as a whole is **carried forward** and set against the **first available future profits of the same property business**.",
            "It is **not** available against general income and it cannot be carried back — which is a real difference from trading losses (chapter 13) and a favourite comparison question.",
            "The carry forward is **automatic**, so there is no claim to make and no time limit to state.",
          ],
        },
      ],
      check: {
        q: "A 30-year lease is granted for a premium of £60,000. How much is assessable as property income?",
        options: [
          "£60,000 — the whole premium",
          "£25,200 — £60,000 less (2% × 29 × £60,000)",
          "£24,000 — £60,000 less (2% × 30 × £60,000)",
          "Nil — a premium is always capital",
        ],
        correct: 1,
        explain:
          "£25,200. The formula is P − (2% × (n − 1) × P), so 29 years not 30: £60,000 − £34,800 = £25,200. The remaining £34,800 is a capital receipt for chargeable gains. Using n rather than (n − 1) gives £24,000 and is the standard error.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Computing property income on the accruals basis.",
      fix: "The cash basis is the default for individuals and partnerships unless the question says otherwise.",
    },
    {
      trap: "Deducting residential mortgage interest from property income.",
      fix: "It is not an expense. Relief is a 20% tax reducer against the liability.",
    },
    {
      trap: "Using n instead of (n − 1) in the lease premium formula.",
      fix: "A 30-year lease uses 29. Sanity check: a longer lease gives a smaller income element.",
    },
    {
      trap: "Deducting expenses under the rent-a-room excess basis.",
      fix: "The excess basis is gross rents less £7,500 with NO expenses. Compute both bases and choose.",
    },
    {
      trap: "Setting a property loss against general income.",
      fix: "It carries forward automatically against future profits of the same property business only.",
    },
  ],
  keyTerms: [
    { term: "Cash basis", def: "Rent received less expenses paid in the tax year; the default for individuals and partnerships." },
    { term: "Short lease", def: "A lease of 50 years or less, part of whose premium is assessable as property income." },
    { term: "Finance cost tax reducer", def: "20% of residential finance costs, deducted from the income tax liability rather than from income." },
    { term: "Rent-a-room relief", def: "£7,500 exemption for letting a room in the taxpayer's own home, with a choice of basis above that." },
    { term: "Property business", def: "All of a landlord's UK properties taken together, so losses and profits net automatically." },
  ],
  summary: [
    "Compute on the cash basis: rent received less expenses paid, unless the question says otherwise.",
    "Repairs are deductible and improvements are not; a modern equivalent replacement counts as a repair.",
    "Residential finance costs give a 20% tax reducer against the liability, not a deduction from income.",
    "A short lease premium is assessable at P − (2% × (n − 1) × P), the balance being capital.",
    "Property losses carry forward automatically against future profits of the same property business only.",
  ],
  knowledgeDiagnostic: [
    { q: "Which basis applies to property income in a TX question?", a: "The cash basis, for individuals and partnerships, unless the question specifically states otherwise." },
    { q: "Why does the finance cost tax reducer not help with the personal allowance abatement?", a: "Because it is deducted from the tax liability rather than from income, so it does not reduce adjusted net income." },
    { q: "How is the assessable part of a short lease premium computed?", a: "P less (2% × (n − 1) × P), where n is the lease length in years; the balance is a capital receipt." },
    { q: "When is the rent-a-room excess basis better?", a: "Where actual expenses are less than £7,500, since the excess basis deducts the £7,500 instead of expenses." },
    { q: "How is a property business loss relieved?", a: "Carried forward automatically against the first available future profits of the same property business; it cannot go against general income or be carried back." },
  ],
}

/* ── Chapter 7 · B3 ───────────────────────────────────────────── */

export const TX_TREE_07: StudyChapter = {
  id: "TX-07",
  number: 7,
  paper: "TX",
  area: "B",
  title: "Employment income: earnings and allowable deductions",
  minutes: 17,
  syllabusRefs: ["B3(a)", "B3(b)", "B3(c)", "B3(g)", "B3(h)"],
  intro:
    "Whether someone is employed or self-employed decides which tax rules apply to everything else, and the deduction test for an employee is far stricter than for a trader.",
  outcomes: [
    "Distinguish employment from self-employment and state the factors that decide it",
    "Apply the receipts basis to determine when earnings are taxable",
    "Identify allowable deductions from employment income",
    "Compute mileage allowance relief or the taxable excess",
    "Explain the operation of PAYE and real time information",
  ],
  sections: [
    {
      id: "status-and-basis",
      heading: "Employment or self-employment, and when earnings are taxed",
      blocks: [
        {
          kind: "table",
          caption: "The factors that decide status",
          head: ["Points to EMPLOYMENT", "Points to SELF-EMPLOYMENT"],
          rows: [
            ["**Control** — the engager decides what, how, when and where", "The worker decides how the work is done"],
            ["**No substitution** — the worker must do the work personally", "The worker may send a substitute"],
            ["**Equipment** provided by the engager", "The worker provides their own equipment"],
            ["**No financial risk** — paid whatever happens", "Bears the risk of loss, and the chance of profit from efficiency"],
            ["**Integration** into the organisation, with a job title and staff benefits", "Works for several clients, and is not part of the organisation"],
            ["**Mutuality of obligation** — the engager must offer work and the worker must accept it", "No obligation either way between engagements"],
            ["Paid a **regular wage**, with holiday and sick pay", "Paid per job or per invoice, with no paid leave"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why status matters so much, and what to say about it",
          md: "The consequences are large in both directions. An **employee** suffers **PAYE and Class 1 NIC** deducted at source, has a **very restrictive** deduction test, and is taxed on **benefits**. A **self-employed** person pays tax later through self assessment, gets a **much wider** deduction for expenses, pays **Class 4** NIC rather than employee Class 1, and generates **no employer's NIC** for the engager.\n\nSo the engager saves 15% employer's NIC by treating a worker as self-employed, which is exactly why HMRC challenges it. In an answer, do not simply list the factors: apply them to the facts given, say which way each points, and reach a conclusion — no single factor is decisive, and the courts look at the **overall picture**.",
        },
        {
          kind: "formula",
          name: "The receipts basis",
          expr: "Employment income is taxed in the tax year of RECEIPT, being the\nEARLIER of:\n\n   ·  the date the payment is actually received, and\n   ·  the date the employee becomes ENTITLED to it\n\nFor a DIRECTOR, also the earliest of:\n\n   ·  the date the amount is credited in the company's records\n   ·  the end of the period, where the amount was determined before it ended\n   ·  the date the amount was determined, where determined after the period end",
          note: "The extra director rules exist because a director can influence when they are paid, so the legislation removes the choice. In a question, a bonus DETERMINED in one tax year and PAID in the next is taxed in the year of entitlement for an employee and potentially earlier still for a director.",
        },
      ],
      check: {
        q: "Which factor points most strongly towards self-employment?",
        options: [
          "The worker is paid a regular monthly wage",
          "The worker may send a substitute to do the work",
          "The engager provides all the equipment",
          "The worker has a job title and staff benefits",
        ],
        correct: 1,
        explain:
          "THE RIGHT OF SUBSTITUTION. A contract of employment is personal — the employee must do the work themselves — so a genuine right to send someone else is a strong indicator of self-employment. The other three all point towards employment, and no single factor is decisive; the courts weigh the overall picture.",
      },
    },
    {
      id: "deductions",
      heading: "Allowable deductions, and mileage",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "The test: wholly, exclusively AND necessarily in the performance of the duties",
          md: "All four words bite, and it is a **much stricter** test than the trader's \"wholly and exclusively for the purposes of the trade\". **Necessarily** means the duties could not be performed without the expense — not merely that it was helpful or that the employer asked for it. **In the performance of** the duties excludes anything incurred to put the employee in a position to do the job: so training to acquire a qualification, and travel from home to a permanent workplace, both fail. This is why so few employee expenses are deductible, and why a question listing five expenses usually allows only one or two.",
        },
        {
          kind: "table",
          caption: "Deductible against not deductible",
          head: ["Deductible", "Not deductible"],
          rows: [
            ["Travel on business, and between two workplaces of the same employer", "**Ordinary commuting** from home to a permanent workplace"],
            ["Contributions to the employer's **occupational pension** scheme", "Personal pension contributions — these extend the band instead (chapter 5)"],
            ["**Professional subscriptions** to an approved body relevant to the duties", "Subscriptions to a gym or a social club"],
            ["Donations under **payroll giving**", "A donation the employee makes personally — that is gift aid"],
            ["**Capital allowances** on plant the employee must provide, and interest on a loan to buy it", "The cost of ordinary clothing, even if worn only for work"],
            ["The excess of business mileage over the approved amount, as a deduction", "Training to obtain a new qualification"],
          ],
        },
        {
          kind: "formula",
          name: "Approved mileage allowance payments",
          expr: "APPROVED AMOUNT  =  first 10,000 business miles  ×  45p\n                    plus miles over 10,000        ×  25p\n\nCompare with what the employer actually PAID:\n\n   Paid MORE than approved   →  the EXCESS is taxable employment income\n   Paid LESS than approved   →  the SHORTFALL is an allowable DEDUCTION\n   Paid nothing              →  the whole approved amount is a deduction\n\nThe 10,000-mile threshold applies per EMPLOYMENT per TAX YEAR, and\nBUSINESS miles only — commuting does not count.",
          note: "Relief works in BOTH directions, which is the half candidates forget. An employee reimbursed at less than the approved rate is not merely untaxed — they have a positive deduction to claim.",
        },
        {
          kind: "example",
          title: "Mileage relief where the employer underpays",
          scenario:
            "Tomas drove 14,200 business miles in 2025/26 using his own car, and his employer reimbursed him at 32p a mile. He also drove 3,100 miles commuting from home to his permanent office, for which he received nothing.",
          steps: [
            { label: "Identify the business mileage", detail: "14,200 miles. The 3,100 commuting miles are NOT business miles — home to a permanent workplace is ordinary commuting — so they are excluded entirely and no relief arises on them." },
            { label: "Compute the approved amount", detail: "First 10,000 miles at 45p = £4,500. The remaining 4,200 miles at 25p = £1,050. Approved amount = £5,550." },
            { label: "Compute what was actually paid", detail: "14,200 × 32p = £4,544." },
            { label: "Compare and identify the direction", detail: "Paid £4,544 against an approved amount of £5,550, so Tomas was UNDER-reimbursed by £1,006. That is an allowable DEDUCTION from his employment income, not a taxable benefit." },
            { label: "State the effect", detail: "£1,006 is deducted from Tomas's employment income. If he is a higher rate taxpayer that is worth £402 of tax; the reimbursement itself is not taxable because it is below the approved amount." },
            { label: "Note the reverse case", detail: "Had the employer paid 50p a mile, the total would have been £7,100 against £5,550 approved, and the £1,550 EXCESS would have been taxable employment income. The same comparison answers both questions — only the sign changes." },
          ],
          result:
            "**A deduction of £1,006.** Two things decide it: excluding the commuting miles, and recognising that under-reimbursement produces a deduction rather than simply no charge.",
        },
        {
          kind: "list",
          title: "PAYE and real time information",
          items: [
            "**PAYE** collects income tax and Class 1 NIC from employees at source, so most employees never file a return.",
            "The employer operates it by reference to the employee's **tax code**, which builds in the personal allowance and adjusts for benefits, underpayments and allowances.",
            "**Real time information (RTI)** requires the employer to report each payment to HMRC **on or before the date it is made**, rather than annually.",
            "PAYE and NIC are payable to HMRC by the **22nd** of the following month where paid electronically, or the 19th by cheque. Small employers may pay quarterly.",
            "**Form P60** is the year-end summary given to the employee by 31 May; **form P11D** reports benefits, and is due by **6 July** after the tax year.",
            "The employer must give a leaving employee a **form P45**.",
          ],
        },
      ],
      check: {
        q: "An employee drives 14,200 business miles and is reimbursed at 32p per mile. What is the tax effect?",
        options: [
          "A taxable benefit of £4,544",
          "A deduction of £1,006, being the approved amount of £5,550 less the £4,544 reimbursed",
          "No tax effect, since the rate is below 45p",
          "A taxable benefit of £1,006",
        ],
        correct: 1,
        explain:
          "A DEDUCTION OF £1,006. The approved amount is (10,000 × 45p) + (4,200 × 25p) = £5,550, against £4,544 actually paid. Under-reimbursement gives a positive deduction — relief runs in both directions, which is the half most candidates miss.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Listing the status factors without applying them to the facts.",
      fix: "Say which way each points on the given facts and reach a conclusion; no single factor decides it.",
    },
    {
      trap: "Applying the trader's 'wholly and exclusively' test to an employee.",
      fix: "An employee's test adds 'necessarily' and 'in the performance of the duties', and is far stricter.",
    },
    {
      trap: "Allowing a deduction for home-to-work travel.",
      fix: "Ordinary commuting is never deductible; travel between two workplaces of the same employer is.",
    },
    {
      trap: "Treating under-reimbursed mileage as simply not taxable.",
      fix: "The shortfall against the approved amount is an allowable deduction.",
    },
    {
      trap: "Counting commuting miles in the 10,000-mile threshold.",
      fix: "Business miles only.",
    },
  ],
  keyTerms: [
    { term: "Receipts basis", def: "Employment income is taxed in the year of the earlier of receipt and entitlement." },
    { term: "Wholly, exclusively and necessarily", def: "The employee's deduction test, requiring the expense to be unavoidable in performing the duties." },
    { term: "Approved mileage allowance payment", def: "45p for the first 10,000 business miles and 25p thereafter." },
    { term: "Real time information", def: "The requirement to report each payment of earnings to HMRC on or before the date it is made." },
    { term: "Form P11D", def: "The return of an employee's benefits, due by 6 July after the tax year." },
  ],
  summary: [
    "Status turns on control, substitution, equipment, financial risk, integration and mutuality, weighed as a whole.",
    "Employment income is taxed on the earlier of receipt and entitlement, with extra rules for directors.",
    "The employee deduction test is wholly, exclusively AND necessarily in the performance of the duties.",
    "Mileage relief compares the approved amount with what was paid, and works in both directions.",
    "PAYE collects tax and NIC at source under real time information, with P60 by 31 May and P11D by 6 July.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does an engager prefer a worker to be self-employed?", a: "It avoids employer's Class 1 NIC at 15%, and removes the PAYE and benefits obligations." },
    { q: "When is a bonus taxed on an employee?", a: "In the tax year of the earlier of actual receipt and entitlement to it." },
    { q: "Why is training for a new qualification not deductible?", a: "Because it is incurred to put the employee in a position to perform the duties, not in the performance of them." },
    { q: "What is the approved amount for 14,200 business miles?", a: "(10,000 × 45p) + (4,200 × 25p) = £5,550." },
    { q: "By when must a P11D be submitted?", a: "6 July following the end of the tax year." },
  ],
}

/* ── Chapter 8 · B3 ───────────────────────────────────────────── */

export const TX_TREE_08: StudyChapter = {
  id: "TX-08",
  number: 8,
  paper: "TX",
  area: "B",
  title: "Employment income: taxable and exempt benefits",
  minutes: 20,
  syllabusRefs: ["B3(d)", "B3(e)", "B3(f)"],
  intro:
    "Four computations appear over and over: the car, the fuel, expensive accommodation and a beneficial loan. Learn those four and most benefit questions answer themselves.",
  outcomes: [
    "Identify exempt benefits",
    "Compute the car and fuel benefits, including the diesel supplement and the cap",
    "Compute the van and van fuel benefits",
    "Compute the accommodation benefit including the expensive accommodation charge",
    "Compute beneficial loan, use of asset and gift of asset benefits",
  ],
  sections: [
    {
      id: "cars-and-vans",
      heading: "Cars, fuel and vans",
      blocks: [
        {
          kind: "formula",
          name: "The car and fuel benefits",
          expr: "CAR BENEFIT  =  LIST PRICE  ×  appropriate percentage\n\n   List price = the manufacturer's list price when first registered,\n                PLUS optional accessories,\n                LESS any capital contribution by the employee (max £5,000)\n\n   Appropriate percentage, for a petrol car (or diesel meeting RDE2):\n      ·  CO2 emissions ROUNDED DOWN to the nearest 5 g/km\n      ·  55 g/km  =  17%   (the relevant base level)\n      ·  then  +1%  for every additional 5 g/km above 55\n      ·  51–54 g/km  =  16%\n      ·  0 g/km (electric)  =  3%\n      ·  1–50 g/km hybrid  =  by electric range (130+ miles 3%, 70–129 6%,\n                              40–69 9%, 30–39 13%, under 30 15%)\n      ·  ADD 4% for a diesel car NOT meeting the RDE2 standard\n      ·  MAXIMUM 37%\n\nFUEL BENEFIT  =  £28,200  ×  the SAME appropriate percentage",
          note: "Two figures here are NOT on the exam's rate sheet and must be memorised: the 4% DIESEL SUPPLEMENT and the 37% CAP. Everything else — the base level, the percentages up to it, the hybrid ranges and the £28,200 — is provided.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Three things that make the fuel benefit unusual",
          md: "**It is a flat £28,200 × the percentage, regardless of how much fuel is provided or what it cost.** So a small amount of private fuel can produce a benefit far larger than the fuel is worth, which is why employees are frequently advised to reimburse the employer for private fuel instead.\n\n**Partial reimbursement gives nothing.** Unlike almost every other benefit, the charge is reduced only if the employee reimburses the employer for the **FULL** cost of private fuel — in which case there is no benefit at all. Reimbursing half gives no reduction whatever.\n\n**It is withdrawn only from the date provision ceases**, and if fuel is provided again later in the same tax year the full charge is reinstated for the whole year.",
        },
        {
          kind: "example",
          title: "Car and fuel for a part year",
          scenario:
            "Aisha was provided with a petrol company car on 6 July 2025. It has a list price of £32,400 and CO2 emissions of 112 g/km. Her employer also pays for all her fuel, including private motoring, and she makes no reimbursement. She contributed £2,000 towards the capital cost of the car.",
          steps: [
            { label: "Compute the list price for benefit purposes", detail: "£32,400 less the capital contribution of £2,000 = £30,400. A capital contribution reduces the list price, up to a maximum of £5,000 — so the whole £2,000 counts here." },
            { label: "Round the emissions down", detail: "112 g/km rounds DOWN to 110 g/km. Always round down to the nearest 5, never to the nearest." },
            { label: "Compute the appropriate percentage", detail: "The base level is 55 g/km at 17%. 110 − 55 = 55 g/km above the base, which is 55/5 = 11 increments of 1%. So the percentage is 17% + 11% = 28%. It is a petrol car, so no diesel supplement, and 28% is below the 37% cap." },
            { label: "Compute the car benefit and time-apportion it", detail: "£30,400 × 28% = £8,512 for a full year. The car was available from 6 July 2025, which is 9 months of 2025/26: £8,512 × 9/12 = £6,384." },
            { label: "Compute the fuel benefit", detail: "£28,200 × 28% = £7,896 for a full year, likewise time-apportioned: £7,896 × 9/12 = £5,922. Note the fuel benefit uses the SAME percentage but the fixed £28,200, not the list price." },
            { label: "Total the benefits", detail: "£6,384 + £5,922 = £12,306 of taxable benefit. Her employer also pays Class 1A NIC on this at 15%, being £1,845.90." },
            { label: "Note the planning point", detail: "The fuel benefit of £5,922 costs a higher rate Aisha £2,369 in tax. If her actual private fuel is worth less than that, she is better off reimbursing her employer in FULL for private fuel — partial reimbursement would achieve nothing." },
          ],
          result:
            "**Car benefit £6,384 and fuel benefit £5,922, a total of £12,306.** The three steps candidates drop are the capital contribution, rounding 112 DOWN to 110, and time-apportioning both benefits by 9/12.",
        },
        {
          kind: "table",
          caption: "Vans",
          head: ["Item", "Charge"],
          rows: [
            ["Van benefit", "**£4,020** flat, where there is private use beyond home-to-work travel"],
            ["Van fuel benefit", "**£769** flat"],
            ["Zero-emission van", "**0%** — no benefit"],
            ["Insignificant private use", "**No benefit**, and ordinary home-to-work commuting in a van counts as insignificant"],
          ],
        },
      ],
      check: {
        q: "A petrol car has CO2 emissions of 112 g/km. What is the appropriate percentage?",
        options: [
          "29%, using 115 g/km",
          "28%, rounding 112 down to 110 g/km: 17% at the 55 g base plus 11 increments",
          "31%, using 112 g/km directly",
          "17%, the base level percentage",
        ],
        correct: 1,
        explain:
          "28%. Round emissions DOWN to the nearest 5, giving 110 g/km. The base level of 55 g/km carries 17%, and 110 − 55 = 55 g/km is 11 further increments of 1% each. Rounding up, or failing to round at all, is the commonest error in the topic.",
      },
    },
    {
      id: "accommodation-loans-assets",
      heading: "Accommodation, loans and the use of assets",
      blocks: [
        {
          kind: "formula",
          name: "Living accommodation",
          expr: "BASIC CHARGE  =  the HIGHER of:\n                    ·  the ANNUAL VALUE of the property, and\n                    ·  the RENT paid by the employer, if it is rented\n\nPLUS, where the property cost MORE than £75,000:\n\n   EXPENSIVE ACCOMMODATION CHARGE\n      =  (cost of providing the accommodation − £75,000)  ×  ORI\n\n   Cost of providing  =  original cost (or market value, see below)\n                         PLUS capital improvements made BEFORE the\n                         start of the current tax year\n\n   ORI = official rate of interest, 3.75% for 2025/26\n\nWhere the employer acquired the property MORE THAN 6 YEARS before first\nproviding it, use the MARKET VALUE when first provided instead of cost.\n\nJOB-RELATED accommodation is EXEMPT: necessary for the duties, or\ncustomary and better performance, or provided for security.",
          note: "The expensive accommodation formula is NOT provided in the exam and must be known. Note also that the £75,000 test uses original cost plus improvements — so a property whose original cost was below £75,000 escapes the additional charge even if its market value now far exceeds it.",
        },
        {
          kind: "example",
          title: "Accommodation with an additional charge",
          scenario:
            "Bardsey Ltd provides Ravi with a house throughout 2025/26. The company bought it in 2019 for £280,000 and spent £30,000 on an extension in March 2024. Its annual value is £4,200 and its current market value is £360,000. Ravi pays no rent and the accommodation is not job-related. The official rate of interest is 3.75%.",
          steps: [
            { label: "Compute the basic charge", detail: "The higher of the annual value of £4,200 and the rent paid by the employer, which is nil because the company owns the property. So the basic charge is £4,200." },
            { label: "Establish which value to use", detail: "The company bought the house in 2019 and first provided it before six years had elapsed, so use the ORIGINAL COST of £280,000 rather than the market value. The £360,000 market value is a distractor." },
            { label: "Compute the cost of providing the accommodation", detail: "£280,000 original cost + £30,000 improvements completed in March 2024, which is before the start of 2025/26 = £310,000. An improvement made DURING 2025/26 would not be included until the following year." },
            { label: "Compute the expensive accommodation charge", detail: "(£310,000 − £75,000) × 3.75% = £235,000 × 3.75% = £8,812.50." },
            { label: "Total the benefit", detail: "£4,200 + £8,812.50 = £13,012.50. The additional charge is more than twice the basic charge, which is typical — the £75,000 threshold has not moved in decades." },
            { label: "Note what would change the answer", detail: "If the accommodation were JOB-RELATED — necessary for the duties, customary in the trade, or provided for security — the whole £13,012.50 would be exempt. And if the company had owned the house for more than six years before first providing it, the £360,000 market value would replace the £280,000 cost, raising the charge substantially." },
          ],
          result:
            "**£13,012.50 of benefit.** Three figures decide it: using cost rather than market value, including only improvements made before the tax year began, and applying the ORI to the excess over £75,000.",
        },
        {
          kind: "table",
          caption: "Loans, assets and the other common benefits",
          head: ["Benefit", "Charge"],
          rows: [
            ["**Beneficial loan**", "(Loan outstanding × **ORI 3.75%**) less interest actually paid. **EXEMPT where all loans total £10,000 or less** throughout the year"],
            ["**Use of an asset**", "**20%** of the market value when **first provided**, time-apportioned"],
            ["**Gift of an asset** previously used", "Market value at the date of gift, less amounts already taxed as use-of-asset benefits"],
            ["**Gift of a new asset**", "The cost to the employer"],
            ["**Private medical insurance**", "Cost to the employer"],
            ["**Vouchers and credit cards**", "Cost to the employer"],
            ["**Employer-provided services** such as a gym subscription", "Cost to the employer"],
          ],
        },
        {
          kind: "list",
          title: "Exempt benefits worth knowing",
          items: [
            "**One** mobile phone per employee — a second phone IS taxable.",
            "**Workplace parking**, and workplace childcare or a nursery.",
            "Employer contributions to a **registered pension** scheme, and pensions advice up to £500.",
            "**Trivial benefits** costing £50 or less, and staff entertaining up to **£150 per head per year**, which is an exempt amount rather than a deduction — exceed it by a pound and the whole cost is taxable.",
            "**Removal expenses** up to £8,000 on a job-related relocation.",
            "**Long service awards** of up to £50 per year of service, after at least 20 years.",
            "**Bicycles** and cycling safety equipment for commuting, and up to £6 a week for **working from home**.",
            "**Job-related accommodation**, and a **beneficial loan** where the total does not exceed £10,000.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The employer's side, which a good answer mentions",
          md: "Nearly every taxable benefit also attracts **Class 1A national insurance** on the **employer** at **15%** for 2025/26, payable by 22 July following the tax year. So the £12,306 of car and fuel benefit in the earlier example costs the employer a further £1,845.90 on top of providing it. A Section C answer that computes the employee's benefit and stops has left the employer's cost — and often a planning recommendation — on the table.",
        },
      ],
      check: {
        q: "An employer bought a house for £280,000 in 2019, spent £30,000 on improvements in March 2024, and its market value is now £360,000. What is the cost of providing the accommodation for the 2025/26 expensive accommodation charge?",
        options: [
          "£360,000, the market value",
          "£310,000 — original cost plus improvements completed before the tax year began",
          "£280,000, the original cost only",
          "£390,000 — market value plus improvements",
        ],
        correct: 1,
        explain:
          "£310,000. Use ORIGINAL COST because the employer first provided the property within six years of acquiring it, and add capital improvements completed BEFORE the start of the tax year. Market value would only be used had the employer held the property for more than six years before first providing it.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Rounding CO2 emissions up or to the nearest 5.",
      fix: "Always round DOWN to the nearest 5 g/km.",
    },
    {
      trap: "Reducing the fuel benefit for partial reimbursement.",
      fix: "Only FULL reimbursement of private fuel removes the charge; partial gives nothing.",
    },
    {
      trap: "Using market value for the expensive accommodation charge by default.",
      fix: "Use original cost plus pre-year improvements, unless the employer held it more than six years before first providing it.",
    },
    {
      trap: "Charging a beneficial loan benefit on a loan of £10,000 or less.",
      fix: "Loans totalling £10,000 or less throughout the year are exempt.",
    },
    {
      trap: "Forgetting the employer's Class 1A NIC at 15%.",
      fix: "Nearly every taxable benefit attracts it, and mentioning it earns marks.",
    },
  ],
  keyTerms: [
    { term: "List price", def: "The manufacturer's price when first registered plus accessories, less a capital contribution capped at £5,000." },
    { term: "Appropriate percentage", def: "The CO2-based percentage applied to both the car and the fuel benefit; minimum 3%, maximum 37%." },
    { term: "Official rate of interest", def: "3.75% for 2025/26, used for beneficial loans and the expensive accommodation charge." },
    { term: "Job-related accommodation", def: "Accommodation necessary for the duties, customary, or provided for security; wholly exempt." },
    { term: "Class 1A NIC", def: "Employer-only national insurance on taxable benefits, at 15% for 2025/26." },
  ],
  summary: [
    "Car benefit is list price times the appropriate percentage, with emissions rounded DOWN to the nearest 5 g/km.",
    "Fuel benefit is £28,200 times the same percentage, and only full reimbursement removes it.",
    "Accommodation is the higher of annual value and rent, plus (cost over £75,000) times the official rate.",
    "Beneficial loans are charged at the official rate less interest paid, and are exempt at £10,000 or less.",
    "The diesel supplement of 4% and the 37% cap are not on the rate sheet and must be memorised.",
  ],
  knowledgeDiagnostic: [
    { q: "How are CO2 emissions treated before applying the percentage table?", a: "Rounded DOWN to the nearest 5 g/km." },
    { q: "Which two car benefit figures are not provided in the exam?", a: "The 4% supplement for a diesel car not meeting RDE2, and the 37% maximum percentage." },
    { q: "When is there no fuel benefit?", a: "Where the employee reimburses the employer for the FULL cost of private fuel; partial reimbursement gives no reduction." },
    { q: "What is the charge for the use of an asset?", a: "20% of its market value when first provided to the employee, time-apportioned." },
    { q: "What rate of employer's national insurance applies to benefits in 2025/26?", a: "Class 1A at 15%, payable by 22 July following the tax year." },
  ],
}

export const TX_TREE_AREA_B_PART2: StudyChapter[] = [TX_TREE_06, TX_TREE_07, TX_TREE_08]
