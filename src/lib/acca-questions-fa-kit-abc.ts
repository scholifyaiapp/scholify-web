import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-fa-kit-builders"

/*
 * FA · Areas A, B and C question kit — chapters 1 to 8.
 *
 * Authored, applied, exam-standard, all at the real Section A unit of two marks.
 * Numeric entry is used wherever the skill being tested is a calculation.
 *
 * Original Scholify content. No ACCA, Kaplan or BPP question is reproduced.
 */

/* ── Chapter 1 · Business entities and the purpose of financial reporting ── */

const CH01: AccaQuestion[] = [
  q("FAK-01-01", "FA-01", "A", "easy",
    "Financial reporting is best defined as:",
    [
      "The audit of a company's financial statements",
      "The recording, analysing and summarising of financial data",
      "The calculation of a business's tax liability",
      "The preparation of budgets and forecasts for management",
    ],
    1,
    "Financial reporting is the RECORDING, ANALYSING and SUMMARISING of financial data so that it can be communicated to those who need it. Audit is an independent opinion on the result, tax computation follows separate rules, and budgeting is management accounting."),

  q("FAK-01-02", "FA-01", "A", "medium",
    "A company with fully paid shares fails owing $180,000 more than its assets realise. What further liability do the shareholders have?",
    [
      "$180,000, shared in proportion to their holdings",
      "None — their liability was limited to the amount payable on their shares",
      "The nominal value of their shares, a second time",
      "Half of the shortfall, the remainder falling on the directors",
    ],
    1,
    "NONE. The shares are fully paid, so the shareholders have discharged their whole obligation. The $180,000 remains the COMPANY's debt — limited liability limits the shareholder's exposure, not the company's obligation, because the company is a separate legal person."),

  q("FAK-01-03", "FA-01", "A", "medium",
    "Which statement about a conventional partnership is correct?",
    [
      "It is a separate legal person from its partners",
      "The partners' liability for the firm's debts is unlimited and joint",
      "Its accounts must be filed publicly",
      "A partner's liability is limited to their capital contribution",
    ],
    1,
    "In a conventional partnership the partners are liable for the firm's debts WITHOUT LIMIT and JOINTLY, because the firm has no separate legal personality. That absence of a second legal person is exactly why liability cannot be limited, and it is why partnerships are not required to publish accounts."),

  multi("FAK-01-04", "FA-01", "A", "medium",
    "Which TWO are advantages of operating as a limited liability company rather than as a sole trader?",
    [
      "Complete privacy over the results of the business",
      "Access to capital by issuing shares to new investors",
      "Continuity independent of any individual owner",
      "Freedom from any formal registration requirement",
    ],
    [1, 2],
    "A company can raise capital by ISSUING SHARES and CONTINUES regardless of who holds them. Privacy and freedom from formality are advantages of the SOLE TRADER — a company must register and, in most jurisdictions, file its accounts publicly, which is the price of limited liability."),

  q("FAK-01-05", "FA-01", "A", "medium",
    "A bank is deciding whether to grant a five-year loan. Which information from the financial statements is most directly relevant?",
    [
      "The dividend paid to shareholders in the year",
      "Cash generation, existing borrowings and assets available as security",
      "The number of employees and the average wage",
      "The market value of the shares",
    ],
    1,
    "A LENDER's question is whether it will be repaid, so it looks at CASH GENERATION, existing commitments and available security. The dividend concerns the shareholders' return, employee numbers are not the lender's decision, and share price is not in the financial statements at all."),

  q("FAK-01-06", "FA-01", "A", "hard",
    "Which user group is NOT restricted to the published financial statements when assessing the business?",
    ["Suppliers", "Management", "Potential investors", "Employees' representatives"],
    1,
    "MANAGEMENT has continuous access to internal information in far more detail than is ever published — which is precisely why published statements exist for everyone else. Treating management as an ordinary user of published accounts misses the purpose of external reporting."),

  q("FAK-01-07", "FA-01", "A", "easy",
    "Which of the following is a limitation of published financial statements?",
    [
      "They are prepared using inconsistent measurement rules",
      "They are historic, summarised and already out of date when a user reads them",
      "They exclude the results of the business's trading",
      "They may not be relied on by anyone other than the directors",
    ],
    1,
    "Published statements are HISTORIC, SUMMARISED and general-purpose, and by the time a user reads them the position has moved on. They do report trading, they follow consistent standards, and external users are exactly who they are prepared for."),

  q("FAK-01-08", "FA-01", "A", "medium",
    "Which of the following is a consequence of separate legal personality?",
    [
      "The company's debts are the shareholders' debts",
      "The company can own assets and owe debts in its own name",
      "The directors must also be the shareholders",
      "The company's profits are taxed as the owners' personal income",
    ],
    1,
    "Separate legal personality means the company itself OWNS ASSETS AND OWES DEBTS. Everything else in the option list describes the sole trader position, where there is no second legal person — which is why the owner's liability is unlimited and the profits are the owner's income."),

  q("FAK-01-09", "FA-01", "A", "medium",
    "A supplier is deciding whether to raise a customer's credit limit. Which pair of measures is most relevant?",
    [
      "Revenue growth and the number of new products launched",
      "Short-term liquidity and the trend in how quickly the customer settles payables",
      "The carrying amount of non-current assets and the depreciation policy",
      "The share premium account and the revaluation surplus",
    ],
    1,
    "A supplier needs to be PAID IN THE SHORT TERM, so liquidity and payment speed are what matter. Revenue growth is compatible with running out of cash, non-current assets cannot settle next month's invoice, and the equity reserves say nothing about the customer's ability to pay."),

  q("FAK-01-10", "FA-01", "A", "hard",
    "Which statement correctly distinguishes bookkeeping from accounting?",
    [
      "Bookkeeping applies judgement about measurement; accounting simply records",
      "Bookkeeping records transactions; accounting analyses and summarises them into information, applying judgement",
      "They are alternative words for the same activity",
      "Bookkeeping is performed only by companies; accounting only by sole traders",
    ],
    1,
    "BOOKKEEPING captures transactions accurately and completely; ACCOUNTING turns those records into information, exercising judgement about periods, measurement and disclosure. The exam is careful about which word it uses, so it is worth reading the stem for it."),
]

/* ── Chapter 2 · The elements and the principal financial statements ── */

const CH02: AccaQuestion[] = [
  q("FAK-02-01", "FA-02", "A", "easy",
    "Which of the following meets the definition of an asset?",
    [
      "A skilled and loyal workforce with a low resignation rate",
      "Rent paid in advance for the next quarter",
      "An intention to purchase plant next year",
      "A brand built up internally over twenty years",
    ],
    1,
    "A PREPAYMENT is an asset: a right to receive a service already paid for, controlled and arising from a past event. A workforce is not CONTROLLED, an intention involves no past event, and an internally generated brand cannot be measured reliably or separated from the business."),

  q("FAK-02-02", "FA-02", "A", "medium",
    "Which of the following is a liability?",
    [
      "A board decision to spend $2m on new plant next year",
      "Electricity consumed before the year end but not yet invoiced",
      "A cash discount a customer may choose to take",
      "The share capital of the company",
    ],
    1,
    "Electricity CONSUMED before the year end is a present obligation arising from a past event — an accrual. A board decision creates no obligation, a discount the customer may take is not an obligation of the entity, and share capital is equity, not a liability."),

  q("FAK-02-03", "FA-02", "A", "medium",
    "Why is a dividend not an expense?",
    [
      "Because it is paid after the year end",
      "Because the definition of an expense excludes distributions to owners",
      "Because it is paid out of cash rather than profit",
      "Because it is not deductible for tax",
    ],
    1,
    "The definition of an expense specifically EXCLUDES DISTRIBUTIONS TO OWNERS. A dividend reduces equity directly and appears in the statement of changes in equity. The same exclusion means capital introduced is not income."),

  num("FAK-02-04", "FA-02", "A", "medium",
    "A sole trader's opening capital was $74,000. During the year she introduced $12,000, withdrew $21,000 and the business made a profit of $38,000. What is closing capital, in $?",
    103000, "$", 1,
    "Closing capital = opening $74,000 + introduced $12,000 + profit $38,000 − drawings $21,000 = $103,000. Capital introduced is not income and drawings are not an expense, so neither of them is inside the $38,000 profit figure."),

  num("FAK-02-05", "FA-02", "A", "hard",
    "A business had net assets of $196,000 at the start of the year and $242,000 at the end. The owner introduced $15,000 and withdrew $2,500 a month. What was the profit for the year, in $?",
    61000, "$", 1,
    "Profit = closing $242,000 − opening $196,000 − introduced $15,000 + drawings ($2,500 × 12 = $30,000) = $61,000. Prove it forwards: 196,000 + 15,000 + 61,000 − 30,000 = 242,000. Adding drawings instead of subtracting them is the standard error."),

  q("FAK-02-06", "FA-02", "A", "medium",
    "A five-year bank loan of $250,000 is repayable in equal annual instalments beginning in ten months' time. How is it presented?",
    [
      "$250,000 within non-current liabilities",
      "$50,000 within current liabilities and $200,000 within non-current liabilities",
      "$250,000 within current liabilities",
      "$50,000 within current liabilities and $200,000 within equity",
    ],
    1,
    "SPLIT IT. The instalment due within twelve months — $250,000 ÷ 5 = $50,000 — is a current liability; the remaining $200,000 is non-current. Showing the whole loan as non-current understates current liabilities and flatters every liquidity ratio."),

  q("FAK-02-07", "FA-02", "A", "easy",
    "Which statement is prepared AS AT a single date rather than for a period?",
    [
      "The statement of profit or loss and other comprehensive income",
      "The statement of financial position",
      "The statement of cash flows",
      "The statement of changes in equity",
    ],
    1,
    "The STATEMENT OF FINANCIAL POSITION reports assets, liabilities and equity as at a date — a photograph. The other three cover a period. Getting the preposition right is worth marks: inventory is measured AT the year end, cost of sales FOR the year."),

  q("FAK-02-08", "FA-02", "A", "hard",
    "Which of the following would appear in the statement of changes in equity but NOT in the statement of profit or loss?",
    [
      "Depreciation of office equipment",
      "A dividend paid to ordinary shareholders",
      "An irrecoverable debt written off",
      "Interest on a bank loan",
    ],
    1,
    "A DIVIDEND to ordinary shareholders is a distribution to owners, so it reduces retained earnings in the statement of changes in equity and never touches profit. Depreciation, irrecoverable debts and loan interest are all expenses in profit or loss."),

  multi("FAK-02-09", "FA-02", "A", "medium",
    "Which TWO items increase equity without being income?",
    [
      "Cash introduced by the proprietor",
      "Revenue from a credit sale",
      "An issue of shares for cash",
      "Rent receivable for the year",
    ],
    [0, 2],
    "CAPITAL INTRODUCED and a SHARE ISSUE are contributions from owners: they increase equity and are specifically excluded from the definition of income. Revenue and rent receivable are both income and pass through profit or loss on their way to equity."),

  num("FAK-02-10", "FA-02", "A", "medium",
    "Opening equity was $310,000. During the year the company made a profit of $84,000, revalued property upward by $30,000, issued shares for $50,000 and paid a dividend of $22,000. What is closing equity, in $?",
    452000, "$", 1,
    "$310,000 + $84,000 profit + $30,000 other comprehensive income + $50,000 shares − $22,000 dividend = $452,000. All four movements change equity, but only the first two are performance — the share issue and dividend are transactions with owners."),
]

/* ── Chapter 3 · The regulatory framework and governance ── */

const CH03: AccaQuestion[] = [
  q("FAK-03-01", "FA-03", "A", "easy",
    "Which body issues IFRS Accounting Standards?",
    [
      "The IFRS Foundation",
      "The International Accounting Standards Board",
      "The IFRS Advisory Council",
      "The IFRS Interpretations Committee",
    ],
    1,
    "The BOARD (IASB) issues IFRS Accounting Standards. The Foundation is the OVERSIGHT body — it governs the structure, appoints members and secures funding, but writes no standards. The Advisory Council advises on priorities and the Interpretations Committee deals with unclear application."),

  q("FAK-03-02", "FA-03", "A", "medium",
    "Two entities are applying the same standard in materially different ways. Which body addresses this?",
    [
      "The IFRS Advisory Council",
      "The IFRS Interpretations Committee",
      "The ISSB",
      "The IFRS Foundation",
    ],
    1,
    "The IFRS INTERPRETATIONS COMMITTEE exists precisely to address unclear or inconsistent application of existing standards. The Advisory Council only advises on the agenda, the ISSB issues sustainability disclosure standards, and the Foundation oversees."),

  q("FAK-03-03", "FA-03", "A", "easy",
    "What does the ISSB issue?",
    [
      "Interpretations of IFRS Accounting Standards",
      "IFRS Sustainability Disclosure Standards",
      "Auditing standards",
      "National company law requirements",
    ],
    1,
    "The International Sustainability Standards Board issues IFRS SUSTAINABILITY DISCLOSURE STANDARDS — sustainability-related financial disclosures for the same investor audience as the accounting standards. Interpretations come from the Interpretations Committee."),

  q("FAK-03-04", "FA-03", "A", "medium",
    "Who is responsible for preparing a company's financial statements?",
    [
      "The external auditor",
      "The directors",
      "The IASB",
      "The shareholders in general meeting",
    ],
    1,
    "The DIRECTORS prepare and approve the financial statements; the auditor gives an independent OPINION on them. This never reverses, however small the company, and attributing preparation to the auditor loses the mark outright."),

  multi("FAK-03-05", "FA-03", "A", "medium",
    "Which TWO are duties of directors in relation to the financial statements?",
    [
      "Expressing an opinion on whether the statements give a true and fair view",
      "Keeping adequate accounting records that explain the entity's transactions",
      "Assessing whether the entity is a going concern",
      "Setting the accounting standards the statements must follow",
    ],
    [1, 2],
    "Directors must KEEP ADEQUATE RECORDS and ASSESS GOING CONCERN, along with selecting suitable policies, safeguarding assets and approving the statements. Expressing an opinion is the auditor's role and setting standards is the Board's."),

  q("FAK-03-06", "FA-03", "A", "medium",
    "Which is an objective of regulating financial reporting?",
    [
      "To maximise the tax collected from businesses",
      "To make financial statements comparable and credible for users who cannot inspect the records",
      "To guarantee that a business will not fail",
      "To standardise every business's commercial strategy",
    ],
    1,
    "Regulation exists for COMPARABILITY and CREDIBILITY, plus a floor on disclosure and less scope for manipulation. Tax follows its own rules, no framework can prevent business failure, and standards govern reporting rather than strategy."),

  q("FAK-03-07", "FA-03", "A", "hard",
    "Which statement about the IFRS Advisory Council is correct?",
    [
      "It issues interpretations where a standard is unclear",
      "It advises the Foundation and the Board on the agenda and priorities, with no power to issue standards",
      "It appoints the members of the Board",
      "It approves each company's financial statements",
    ],
    1,
    "The Advisory Council ADVISES on the agenda, priorities and the views of interested parties, and issues nothing. Appointments are the Foundation's role, interpretations are the Interpretations Committee's, and no global body approves individual companies' statements."),

  q("FAK-03-08", "FA-03", "A", "medium",
    "In the context of financial reporting, governance is best described as:",
    [
      "The set of accounting standards an entity applies",
      "The arrangements by which those running the entity are held accountable for preparing and approving the financial statements",
      "The process of auditing the financial statements",
      "The system of internal bookkeeping controls",
    ],
    1,
    "Governance is about ACCOUNTABILITY for the reporting process — who prepares, who approves, who oversees, and to whom they answer. Standards decide the measurement, audit provides independent assurance, and internal controls are one part of the directors' response."),

  q("FAK-03-09", "FA-03", "A", "hard",
    "Why does the separation of ownership from control make external reporting necessary in a company?",
    [
      "Because directors are legally required to own shares",
      "Because the shareholders who own the business do not run it, and need an account from those who do",
      "Because companies are taxed differently from sole traders",
      "Because directors are not permitted to see the accounting records",
    ],
    1,
    "Shareholders OWN but do not RUN the company, so they need an account of what was done with their money from the people who did it. That stewardship relationship is the reason both external reporting and governance requirements exist, and a sole trader has neither problem nor duty."),

  q("FAK-03-10", "FA-03", "A", "medium",
    "What do IFRS Accounting Standards determine?",
    [
      "The commercial terms on which a business trades",
      "How transactions and balances are recognised, measured, presented and disclosed",
      "The amount of tax a business must pay",
      "The market value of a company's shares",
    ],
    1,
    "Standards decide RECOGNITION, MEASUREMENT, PRESENTATION and DISCLOSURE — which is what makes two entities' statements comparable. Without them the same machine could support three different profit figures depending on the preparer's preference."),
]

/* ── Chapter 4 · Accounting principles and concepts ── */

const CH04: AccaQuestion[] = [
  q("FAK-04-01", "FA-04", "B", "medium",
    "A business will cease trading in two months and its assets will be sold individually. What is the main consequence for the financial statements?",
    [
      "A note is required but the figures are unchanged",
      "Assets must be remeasured to their expected recoverable amounts and further liabilities may arise",
      "The statements must be prepared on the cash basis",
      "Only the current/non-current classification changes",
    ],
    1,
    "The GOING CONCERN assumption no longer holds, so MEASUREMENT changes: assets fall to what they will realise, the current/non-current split loses meaning and closure costs may be recognised. Going concern is a measurement assumption, not a disclosure point."),

  q("FAK-04-02", "FA-04", "B", "easy",
    "A business receives an electricity invoice for $2,400 covering the four months to 28 February. Its year end is 31 December. Applying the accruals basis, how much is an expense of the year just ended?",
    ["$2,400", "$1,200", "$600", "Nil, because nothing has been paid"],
    1,
    "Two of the four months — November and December — fall in the year just ended: $2,400 × 2/4 = $1,200, recognised as an expense and an accrual. The accruals basis puts a cost in the period it relates to regardless of when the invoice arrives or the cash moves."),

  q("FAK-04-03", "FA-04", "B", "hard",
    "A business sells inventory to a finance company for $120,000 and must repurchase it in nine months for $129,000, retaining possession throughout. Which principle governs the treatment?",
    [
      "Prudence — recognise revenue and provide for the repurchase",
      "Substance over form — treat it as a secured loan with a $9,000 finance cost",
      "Materiality — the amount is not material so revenue recognition is acceptable",
      "Consistency — treat it like any other sale",
    ],
    1,
    "SUBSTANCE OVER FORM. The legal form is a sale but the reality is borrowing: the goods never leave, the risks stay, and a fixed price is payable back. So no revenue, the inventory stays on the statement of financial position, a $120,000 liability is recorded and the $9,000 difference is a finance cost."),

  q("FAK-04-04", "FA-04", "B", "medium",
    "The proprietor of a business pays for a family holiday from the business bank account. How is this recorded?",
    [
      "As a business expense, reducing profit",
      "As drawings, reducing capital",
      "As a prepayment, since the holiday is in the future",
      "It is not recorded at all",
    ],
    1,
    "The BUSINESS ENTITY concept makes it DRAWINGS — a reduction in capital. It never appears as an expense, so profit is unaffected. Expensing it would understate profit and overstate capital by the same amount, which is the classic double-sided consequence."),

  q("FAK-04-05", "FA-04", "B", "medium",
    "A business is owed $46,000 by a party to whom it also owes $19,000. There is no legal right of set-off. How are the balances reported?",
    [
      "Net, as a receivable of $27,000",
      "Gross, as a receivable of $46,000 and a payable of $19,000",
      "Net, as a payable of $27,000",
      "Only the receivable is reported",
    ],
    1,
    "GROSS. The offsetting principle prohibits netting assets against liabilities unless a standard permits it or a legal right of set-off exists. Netting would understate both total assets and total liabilities by $19,000 and distort every liquidity ratio."),

  q("FAK-04-06", "FA-04", "B", "hard",
    "Which of the following is a proper application of prudence?",
    [
      "Creating a provision that is not needed, so that profit can be released in a worse year",
      "Recognising an allowance against receivables whose collection is doubtful",
      "Valuing inventory at expected selling price to reflect its full worth",
      "Deferring recognition of a probable obligation until it is certain",
    ],
    1,
    "Prudence is CAUTION UNDER UNCERTAINTY — an allowance against doubtful receivables is exactly that. Deliberate over-provision to smooth profit is misstatement in the other direction and breaches neutrality, and deferring a probable obligation understates liabilities."),

  q("FAK-04-07", "FA-04", "B", "medium",
    "A company buys a $60 waste bin with an expected life of eight years and charges it to expenses. Which principle justifies this?",
    ["Consistency", "Materiality", "Substance over form", "Duality"],
    1,
    "MATERIALITY. Capitalising and depreciating $60 over eight years could not influence any user's decision, so separate treatment is not required. Note that materiality is relative to the entity, and some items are material by NATURE whatever their size."),

  q("FAK-04-08", "FA-04", "B", "easy",
    "Which principle states that every transaction has two equal and opposite effects on the accounting equation?",
    ["Consistency", "Duality", "Prudence", "Offsetting"],
    1,
    "DUALITY, also called the dual aspect concept, is the principle behind double entry: every transaction changes exactly two items by equal amounts in directions that keep the equation balanced."),

  q("FAK-04-09", "FA-04", "B", "medium",
    "A company changes its depreciation method each year to whichever produces the most favourable profit. Which principle is breached?",
    ["Duality", "Consistency", "Business entity", "Historical cost"],
    1,
    "CONSISTENCY requires like items to be treated alike from period to period so that figures are comparable over time. Choosing the method for its effect on profit also breaches NEUTRALITY, and disclosure of the change does not cure either failure."),

  multi("FAK-04-10", "FA-04", "B", "hard",
    "Which TWO statements about the going concern assumption are correct?",
    [
      "It assumes the entity will continue in operation for the foreseeable future",
      "It requires assets to be measured at what they would fetch in a forced sale",
      "Abandoning it changes the measurement of assets, not merely the disclosures",
      "It applies only to limited liability companies",
    ],
    [0, 2],
    "Going concern assumes CONTINUED OPERATION for the foreseeable future, and losing it changes MEASUREMENT — assets fall to recoverable amounts and new liabilities may arise. Forced-sale values apply only once the assumption has failed, and the assumption applies to any entity."),
]

/* ── Chapter 5 · Qualitative characteristics ── */

const CH05: AccaQuestion[] = [
  q("FAK-05-01", "FA-05", "B", "easy",
    "Which pair are the FUNDAMENTAL qualitative characteristics of useful financial information?",
    [
      "Comparability and verifiability",
      "Relevance and faithful representation",
      "Timeliness and understandability",
      "Prudence and consistency",
    ],
    1,
    "RELEVANCE and FAITHFUL REPRESENTATION are the two fundamental characteristics: fail either and the information is not useful at all. Comparability, verifiability, timeliness and understandability are the four ENHANCING characteristics."),

  q("FAK-05-02", "FA-05", "B", "medium",
    "A set of financial statements is complete, neutral and free from error but is published fifteen months after the year end. Which characteristic is primarily failed?",
    ["Faithful representation", "Relevance", "Understandability", "Verifiability"],
    1,
    "RELEVANCE — information that arrives after the decision has been taken cannot make a difference to it. Faithful representation is precisely what these statements DO have. Timeliness is the enhancing characteristic in play, and losing it destroys relevance."),

  q("FAK-05-03", "FA-05", "B", "medium",
    "What are the three components of faithful representation?",
    [
      "Relevant, timely and comparable",
      "Complete, neutral and free from error",
      "Prudent, consistent and verifiable",
      "Accurate, audited and approved",
    ],
    1,
    "COMPLETE, NEUTRAL and FREE FROM ERROR. Note that free from error means no error in the description or the process — a properly made estimate, described as an estimate, satisfies it despite never being exactly right."),

  q("FAK-05-04", "FA-05", "B", "hard",
    "Directors estimate a probable legal settlement in a range of $300,000 to $500,000, most likely $380,000, and provide $300,000 to protect reported profit. Which characteristic is failed?",
    [
      "Timeliness, because the outcome is not yet known",
      "Neutrality, and therefore faithful representation",
      "Understandability, because the range is complex",
      "None — prudence permits the lowest figure",
    ],
    1,
    "Choosing a figure for its effect on reported profit breaches NEUTRALITY, so FAITHFUL REPRESENTATION — a fundamental characteristic — fails. Prudence is caution under uncertainty, not slanting an estimate, and no amount of clarity or timeliness compensates for a fundamental failure."),

  q("FAK-05-05", "FA-05", "B", "medium",
    "A transaction is complex and some users would struggle with it. What does understandability require?",
    [
      "A complex item may be omitted if some users would find it difficult",
      "Information is presented clearly for a user with reasonable business knowledge and a willingness to study it",
      "It requires all information to be presented in a single page",
      "It is one of the fundamental characteristics",
    ],
    1,
    "Understandability assumes a user with REASONABLE BUSINESS KNOWLEDGE who will study the information. It never justifies omitting a complex item — that would fail completeness, and therefore faithful representation. It is an ENHANCING characteristic."),

  q("FAK-05-06", "FA-05", "B", "medium",
    "Comparability requires that:",
    [
      "Every transaction is given the same treatment",
      "Like items are treated alike and unlike items differently, supported by consistency and policy disclosure",
      "All entities in a sector use identical accounting policies",
      "Prior-year figures are omitted to avoid confusion",
    ],
    1,
    "Comparability is LIKE ALIKE and UNLIKE DIFFERENTLY. Forcing two genuinely different transactions into one treatment destroys comparability rather than creating it. It is supported by consistency over time and by disclosure of policies, so users can adjust for differences between entities."),

  q("FAK-05-07", "FA-05", "B", "hard",
    "Which characteristic does verifiability describe?",
    [
      "That an entity's figures have been audited",
      "That independent knowledgeable observers could reach consensus that the information faithfully represents what it claims to",
      "That the information can be traced to a bank statement",
      "That the amounts are exactly accurate",
    ],
    1,
    "Verifiability means INDEPENDENT KNOWLEDGEABLE OBSERVERS COULD AGREE that the information is faithfully represented. It is not the same as having been audited, and it does not require exactness — disclosing the basis of an estimate is what makes it verifiable."),

  multi("FAK-05-08", "FA-05", "B", "medium",
    "Which TWO are enhancing qualitative characteristics?",
    ["Faithful representation", "Timeliness", "Relevance", "Comparability"],
    [1, 3],
    "TIMELINESS and COMPARABILITY are enhancing, along with verifiability and understandability. Relevance and faithful representation are the two FUNDAMENTAL characteristics — the enhancing four make useful information more useful but cannot rescue information that fails the fundamental pair."),

  q("FAK-05-09", "FA-05", "B", "medium",
    "An allowance for receivables can never be exactly right. Does this breach faithful representation?",
    [
      "Yes — the figure contains an error",
      "No — an estimate described as an estimate, made by a proper process from the best available inputs, faithfully represents",
      "Yes, unless the amount is immaterial",
      "No, because prudence overrides faithful representation",
    ],
    1,
    "NO. \"Free from error\" means no error in the DESCRIPTION or the PROCESS, not perfect accuracy. An estimate identified as an estimate, arrived at properly from the best inputs available, is faithfully represented — otherwise no set of accounts could ever satisfy the characteristic."),

  q("FAK-05-10", "FA-05", "B", "easy",
    "Relevance is described as information being:",
    [
      "Free from error in its description and process",
      "Capable of making a difference to a user's decision",
      "Available to every user at the same time",
      "Presented in a standard format",
    ],
    1,
    "Relevance is the capacity to MAKE A DIFFERENCE TO A DECISION, through predictive value, confirmatory value or both. Materiality is the entity-specific aspect of relevance — an immaterial item cannot change a decision."),
]

/* ── Chapter 6 · Business documentation and the accounting system ── */

const CH06: AccaQuestion[] = [
  q("FAK-06-01", "FA-06", "C", "easy",
    "A customer returns goods invoiced at $850 as the wrong specification. Which document does the SELLER issue?",
    ["A debit note", "A credit note", "A remittance advice", "A goods received note"],
    1,
    "The SELLER issues a CREDIT NOTE, which reduces the receivable and reverses the sale. A DEBIT note is issued by the BUYER and merely requests that reduction; a remittance advice accompanies a payment; a goods received note is the buyer's record of what arrived."),

  q("FAK-06-02", "FA-06", "C", "medium",
    "From which document is a credit sale recorded in the accounting records?",
    ["The customer's purchase order", "The sales invoice", "The quotation", "The goods despatched note"],
    1,
    "The SALES INVOICE, which establishes the amount now due. An order is only a commitment to trade and a quotation is not even that — neither creates an accounting entry. The goods despatched note evidences delivery but does not set the amount receivable."),

  q("FAK-06-03", "FA-06", "C", "medium",
    "Before paying a supplier's invoice, a business compares it with two other documents. Which are they?",
    [
      "The quotation and the remittance advice",
      "The purchase order and the goods received note",
      "The sales order and the goods despatched note",
      "The supplier statement and the debit note",
    ],
    1,
    "The PURCHASE ORDER confirms the price and quantity ordered, and the GOODS RECEIVED NOTE confirms what actually arrived. That three-way match — order, GRN, invoice — is the standard control over purchases, and without the GRN a business can pay for goods it never received."),

  q("FAK-06-04", "FA-06", "C", "easy",
    "What is the purpose of a remittance advice?",
    [
      "To request a reduction in an invoice",
      "To identify which invoices a payment settles",
      "To confirm the goods that were despatched",
      "To offer a price for goods not yet ordered",
    ],
    1,
    "A remittance advice accompanies a payment and IDENTIFIES WHICH INVOICES IT SETTLES, which is what makes cash allocation to the right invoices possible. Requesting a reduction is a debit note; despatch is evidenced by the goods despatched note; a price offer is a quotation."),

  q("FAK-06-05", "FA-06", "C", "hard",
    "Which is a genuine limitation of a computerised accounting system?",
    [
      "It uses different double-entry rules from a manual system",
      "An input error is processed consistently and at speed, so it is repeated wherever the data flows",
      "It cannot produce a trial balance",
      "It cannot account for sales tax",
    ],
    1,
    "Automation carries an INPUT ERROR everywhere at once — a wrongly keyed customer is chased, aged and reconciled wrongly throughout. The underlying double entry is identical to a manual system, and totals, trial balances and sales tax are exactly what software handles best."),

  multi("FAK-06-06", "FA-06", "C", "medium",
    "Which TWO are drawbacks of holding accounting data on external servers (the cloud)?",
    [
      "Backups must be taken manually each night",
      "The business becomes dependent on its internet connection",
      "Reliance on the provider's own security and continuity arrangements",
      "The double entry must be reworked for cloud processing",
    ],
    [1, 2],
    "Cloud storage brings DEPENDENCE ON THE CONNECTION and on the PROVIDER's security and continuity, plus questions about where the data is physically held. Automatic backup is one of its benefits, and the double entry is unchanged wherever the data sits."),

  q("FAK-06-07", "FA-06", "C", "medium",
    "Which document does a BUYER issue when it believes a supplier's invoice is overstated?",
    ["A credit note", "A debit note", "A goods received note", "A supplier statement"],
    1,
    "The BUYER issues a DEBIT NOTE, claiming that the invoice is overstated or that goods are being returned. It only REQUESTS the reduction — the amount owed falls when the supplier's credit note arrives."),

  q("FAK-06-08", "FA-06", "C", "medium",
    "Which of these is a source of data in an accounting system rather than an output of one?",
    [
      "The trial balance",
      "Bank statements and internet banking records",
      "The statement of financial position",
      "An aged receivables analysis",
    ],
    1,
    "BANK STATEMENTS AND BANKING RECORDS are a data SOURCE — evidence of what actually moved. The trial balance, the statement of financial position and the aged receivables analysis are all produced BY the system from the data it captured."),

  q("FAK-06-09", "FA-06", "C", "hard",
    "What effect does an incorrect standing data record — a wrong customer credit limit or price — have in a computerised system?",
    [
      "It affects only the transaction being entered at the time",
      "It repeats itself in every subsequent transaction that uses the record",
      "It is automatically detected by the software",
      "It has no accounting effect until the year end",
    ],
    1,
    "Standing data is entered once and REUSED, so a wrong record repeats itself indefinitely across every transaction that draws on it. That is the flip side of the efficiency it buys, and it is why input controls over master records matter more than controls over individual entries."),

  q("FAK-06-10", "FA-06", "C", "easy",
    "Which document creates NO accounting entry?",
    ["A sales invoice", "A quotation", "A credit note received", "A petty cash voucher"],
    1,
    "A QUOTATION is an offer of price and terms with no commitment on either side, so nothing is recorded. An invoice, a credit note and a petty cash voucher each evidence a completed transaction and all three generate entries."),
]

/* ── Chapter 7 · The accounting equation and double entry ── */

const CH07: AccaQuestion[] = [
  q("FAK-07-01", "FA-07", "C", "easy",
    "Which is a correct statement of the accounting equation?",
    [
      "Assets + Liabilities = Capital",
      "Assets = Capital + Liabilities",
      "Capital = Assets + Liabilities",
      "Assets − Capital = Liabilities + Drawings",
    ],
    1,
    "ASSETS = CAPITAL + LIABILITIES, equivalently Capital = Assets − Liabilities. Resources must equal the claims on them, which is why the equation holds after every transaction rather than by coincidence."),

  q("FAK-07-02", "FA-07", "C", "medium",
    "A business buys a vehicle for $24,000, paying $7,000 cash and taking a loan for the balance. What is the effect on the accounting equation?",
    [
      "Assets up $24,000; liabilities up $24,000",
      "Assets up $17,000; liabilities up $17,000",
      "Assets up $24,000; capital up $7,000; liabilities up $17,000",
      "Assets unchanged; liabilities up $17,000",
    ],
    1,
    "Three movements: the vehicle up $24,000, the bank down $7,000 — a NET asset increase of $17,000 — and the loan up $17,000. Capital is untouched, because buying an asset is not an expense and no owner transaction occurred."),

  q("FAK-07-03", "FA-07", "C", "medium",
    "Which of the following is NOT income, despite increasing the bank balance?",
    [
      "A cash sale of goods",
      "Cash received from a customer settling an existing receivable",
      "Rent received from subletting part of the premises",
      "Commission earned and received in cash",
    ],
    1,
    "A RECEIPT SETTLING AN EXISTING RECEIVABLE swaps one asset for another — the income was recognised when the sale was made. Recording it as income counts the same sale twice, which is the error the accounting equation exposes instantly."),

  num("FAK-07-04", "FA-07", "C", "medium",
    "A business has assets of $312,000 and liabilities of $148,000. What is capital, in $?",
    164000, "$", 1,
    "Capital = assets − liabilities = $312,000 − $148,000 = $164,000, which is also net assets. This rearrangement of the accounting equation is what every incomplete-records question starts from."),

  q("FAK-07-05", "FA-07", "C", "easy",
    "Which entry records an increase in an expense?",
    ["A credit", "A debit", "Either, depending on the expense", "Neither — expenses are not double-entered"],
    1,
    "A DEBIT. Expenses reduce capital, which is a movement on the left of the accounting equation, and an increase on the left is a debit. This is where the DEAD CLIC memory aid comes from — but the equation is the reasoning behind it."),

  q("FAK-07-06", "FA-07", "C", "medium",
    "A credit sale of goods costing $4,000 is made for $6,200. Which pair of entries is required?",
    [
      "Debit receivables $6,200, credit revenue $6,200 only",
      "Debit receivables $6,200 and credit revenue $6,200; debit cost of sales $4,000 and credit inventory $4,000",
      "Debit revenue $6,200, credit receivables $6,200; debit inventory $4,000, credit cost of sales $4,000",
      "Debit receivables $2,200, credit revenue $2,200",
    ],
    1,
    "TWO pairs are needed: the selling price to receivables and revenue, then the COST out of inventory and into cost of sales. Omitting the second pair overstates both inventory and profit — the goods would still appear to be on the shelf."),

  num("FAK-07-07", "FA-07", "C", "hard",
    "Opening capital was $88,000. The owner introduced $9,000 and withdrew $27,000, and closing capital was $105,000. What was the profit for the year, in $?",
    35000, "$", 1,
    "Profit = closing $105,000 − opening $88,000 − introduced $9,000 + drawings $27,000 = $35,000. Prove it forwards: 88,000 + 9,000 + 35,000 − 27,000 = 105,000. If the forward proof fails, a sign is wrong."),

  q("FAK-07-08", "FA-07", "C", "medium",
    "A business pays $3,600 cash for shop fittings. What is the effect on total assets?",
    [
      "Total assets increase by $3,600",
      "Total assets are unchanged",
      "Total assets decrease by $3,600",
      "Total assets increase by $3,600 and capital decreases by $3,600",
    ],
    1,
    "UNCHANGED. One asset (fittings) rises and another (bank) falls by the same amount — the first of the four possible patterns a transaction can take. Buying an asset is not an expense, so capital is untouched."),

  multi("FAK-07-09", "FA-07", "C", "medium",
    "Which TWO transactions increase both total assets and total claims on them?",
    [
      "Buying inventory for cash",
      "Buying inventory on credit",
      "Introducing capital in cash",
      "Paying a supplier",
    ],
    [1, 2],
    "Buying inventory ON CREDIT raises an asset and a liability; INTRODUCING CAPITAL raises an asset and capital. Buying inventory for cash swaps one asset for another, and paying a supplier reduces an asset and a liability together."),

  q("FAK-07-10", "FA-07", "C", "hard",
    "Which statement about drawings is correct?",
    [
      "They are an expense of the business and reduce profit",
      "They are a reduction in capital and never affect profit",
      "They increase liabilities",
      "They are income of the business",
    ],
    1,
    "Drawings REDUCE CAPITAL and never touch profit — the definition of an expense excludes distributions to owners. Treating drawings as an expense understates profit and overstates capital by the same amount."),
]

/* ── Chapter 8 · Books of prime entry, ledgers and journals ── */

const CH08: AccaQuestion[] = [
  q("FAK-08-01", "FA-08", "C", "easy",
    "A business sells goods for $520 to a customer who pays immediately by bank transfer. In which book of prime entry is this first recorded?",
    ["Sales day book", "Cash book", "Journal", "Sales returns day book"],
    1,
    "The CASH BOOK. Day books record CREDIT transactions — those creating a receivable — and here no receivable ever exists. Questions on \"which book of prime entry\" are usually testing whether you noticed the word \"credit\"."),

  q("FAK-08-02", "FA-08", "C", "medium",
    "Why are books of prime entry used rather than posting each invoice directly to the general ledger?",
    [
      "Because the general ledger cannot record credit transactions",
      "To summarise — the day book is totalled and the total is posted, instead of hundreds of individual entries",
      "Because day books form part of the double entry and the ledger does not",
      "To keep the individual customer accounts outside the records",
    ],
    1,
    "They SUMMARISE. High-volume transactions are listed and totalled so that one figure reaches the general ledger. The double entry happens in the general LEDGER, not in the day book, and the memorandum ledgers are a separate matter."),

  q("FAK-08-03", "FA-08", "C", "medium",
    "At the year end, which account is closed to profit or loss rather than carried forward?",
    ["Accumulated depreciation", "Discounts received", "Share premium", "Trade payables"],
    1,
    "DISCOUNTS RECEIVED is income, and income accounts describe a PERIOD, so the balance transfers to profit or loss and the account restarts at nil. Accumulated depreciation, share premium and trade payables are all position accounts and carry forward."),

  q("FAK-08-04", "FA-08", "C", "hard",
    "A payment of $520 for office stationery was correctly recorded in the bank account but debited to the purchases account. What journal corrects it?",
    [
      "Debit stationery $520, credit bank $520",
      "Debit stationery $520, credit purchases $520",
      "Debit purchases $520, credit stationery $520",
      "Debit stationery $1,040, credit purchases $1,040",
    ],
    1,
    "Only the DEBIT is in the wrong account, so only the debit moves: debit stationery, credit purchases. The bank entry was correct and must not be touched. Doubling the amount would be right only if the entry had been posted to the wrong SIDE."),

  q("FAK-08-05", "FA-08", "C", "medium",
    "What is the journal entry to record depreciation of $7,400 for the year?",
    [
      "Debit accumulated depreciation $7,400, credit depreciation expense $7,400",
      "Debit depreciation expense $7,400, credit accumulated depreciation $7,400",
      "Debit depreciation expense $7,400, credit the asset at cost $7,400",
      "Debit the asset at cost $7,400, credit bank $7,400",
    ],
    1,
    "Debit DEPRECIATION EXPENSE and credit ACCUMULATED DEPRECIATION. The cost account is untouched — it holds original cost until the asset is disposed of, and the disclosure note needs both figures separately."),

  q("FAK-08-06", "FA-08", "C", "medium",
    "The individual customer accounts in the receivables ledger are best described as:",
    [
      "Part of the double entry, replacing the control account",
      "Memorandum records outside the double entry",
      "A book of prime entry",
      "A summary of the day book totals",
    ],
    1,
    "They are MEMORANDUM records, kept so the business knows who owes what. The double entry lives in the general ledger's receivables control account, which is why the two must be reconciled rather than added together."),

  q("FAK-08-07", "FA-08", "C", "easy",
    "In which book of prime entry is a year-end accrual first recorded?",
    ["Cash book", "Journal", "Purchases day book", "Petty cash book"],
    1,
    "The JOURNAL, which takes everything with no routine home — corrections, year-end adjustments, payroll, opening balances and transfers. Nothing has been invoiced or paid, so no day book or cash book applies."),

  q("FAK-08-08", "FA-08", "C", "hard",
    "The owner takes goods that cost $1,900 out of inventory for personal use. What is the journal?",
    [
      "Debit drawings $1,900, credit purchases $1,900",
      "Debit purchases $1,900, credit drawings $1,900",
      "Debit drawings $1,900, credit revenue $1,900",
      "No entry is required as no cash moved",
    ],
    0,
    "Debit DRAWINGS and credit PURCHASES (or inventory) with the COST of the goods. No cash moved but value has left the business for the owner's benefit, so the business entity concept requires the entry — and it is drawings, not a sale, so revenue is not involved."),

  multi("FAK-08-09", "FA-08", "C", "medium",
    "Which TWO features must a properly written journal entry have?",
    [
      "Equal debit and credit totals",
      "A narrative explaining what the entry does",
      "The category of account, such as \"assets\"",
      "Approval by the external auditor",
    ],
    [0, 1],
    "A journal must BALANCE and must carry a NARRATIVE that explains it. It also names the EXACT account rather than a category — \"debit motor vehicles\", not \"debit assets\" — and auditor approval has nothing to do with recording an entry."),

  q("FAK-08-10", "FA-08", "C", "medium",
    "A payment of $780 for insurance was omitted from the records entirely. What journal is required?",
    [
      "Debit insurance $780, credit bank $780",
      "Debit insurance $780, credit rent $780",
      "Debit insurance $1,560, credit bank $1,560",
      "Debit suspense $780, credit insurance $780",
    ],
    0,
    "Nothing was recorded, so BOTH sides are missing: debit insurance and credit bank. Because both sides were absent the trial balance still agreed, so suspense is not involved — that distinguishes an omission from a one-sided error."),
]

/** FA's authored question kit for Areas A, B and C — chapters 1 to 8. */
export const FA_KIT_ABC: AccaQuestion[] = [
  ...CH01,
  ...CH02,
  ...CH03,
  ...CH04,
  ...CH05,
  ...CH06,
  ...CH07,
  ...CH08,
]
