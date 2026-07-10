import type { Flashcard } from "@/lib/acca-flashcards"

/* Flashcard wave 2 — FA/FR/PM/TX to revision depth (2026-07-10). */
export const FLASHCARDS_WAVE2: Flashcard[] = [
  /* ── FA — Financial Accounting (48) ─────────────────────────── */

  /* FA A — Context & purpose (5) */
  { id: "FA-FC2-01", paper: "FA", area: "A", front: "Statement of financial position vs statement of profit or loss — what does each show?", back: "Position: assets, liabilities and equity at a point in time. Profit or loss: performance (income less expenses) over a period." },
  { id: "FA-FC2-02", paper: "FA", area: "A", front: "Primary users of financial statements (Conceptual Framework)", back: "Existing and potential investors, lenders and other creditors — not managers, who already have internal information." },
  { id: "FA-FC2-03", paper: "FA", area: "A", front: "What does 'stewardship' mean in financial reporting?", back: "Showing the owners how well management has looked after the resources entrusted to it — a key reason external reporting exists." },
  { id: "FA-FC2-04", paper: "FA", area: "A", front: "Three differences: financial vs management accounting", back: "Financial: external users, governed by IFRS, historical and usually annual. Management: internal users, no external rules, forward-looking and prepared whenever needed." },
  { id: "FA-FC2-05", paper: "FA", area: "A", front: "The accruals basis in one line", back: "Recognise income when EARNED and expenses when INCURRED — not when cash moves. A profitable business can still hold no cash." },

  /* FA B — Qualitative characteristics (6) */
  { id: "FA-FC2-06", paper: "FA", area: "B", front: "Definition of materiality", back: "Information is material if omitting, misstating or obscuring it could reasonably be expected to influence primary users' decisions. Judged by size AND nature — no universal threshold." },
  { id: "FA-FC2-07", paper: "FA", area: "B", front: "The three components of faithful representation", back: "Complete, neutral and free from error — which is not the same as perfectly precise." },
  { id: "FA-FC2-08", paper: "FA", area: "B", front: "What makes information relevant?", back: "It has predictive value and/or confirmatory value — it is capable of changing a user's decision. Materiality sits inside relevance." },
  { id: "FA-FC2-09", paper: "FA", area: "B", front: "Prudence — the Framework meaning", back: "Caution when making judgements under uncertainty, supporting neutrality. It is NOT deliberate understatement or hidden reserves." },
  { id: "FA-FC2-10", paper: "FA", area: "B", front: "The cost constraint on useful reporting", back: "Information should only be demanded where the benefit to users justifies the cost of producing it — decision-useful, not perfect, information is the goal." },
  { id: "FA-FC2-11", paper: "FA", area: "B", front: "The underlying assumption of financial statements", back: "Going concern — the entity is assumed to continue operating for the foreseeable future. It is an assumption, not a qualitative characteristic." },

  /* FA C — Double-entry & accounting systems (6) */
  { id: "FA-FC2-12", paper: "FA", area: "C", front: "Closing capital of a sole trader — the formula", back: "Opening capital + capital introduced + profit − drawings." },
  { id: "FA-FC2-13", paper: "FA", area: "C", front: "Are drawings an expense?", back: "No — drawings reduce capital directly and never appear in profit or loss." },
  { id: "FA-FC2-14", paper: "FA", area: "C", front: "Name the main books of prime entry and what each lists", back: "Sales day book (credit sales), purchase day book (credit purchases), the two returns day books, cash book, petty cash book, and the journal (corrections, depreciation, one-offs)." },
  { id: "FA-FC2-15", paper: "FA", area: "C", front: "Are day books part of the double entry?", back: "No — they are lists. The double entry happens when their totals are posted to the nominal (general) ledger." },
  { id: "FA-FC2-16", paper: "FA", area: "C", front: "Receivables ledger vs receivables control account", back: "The ledger holds one memorandum account per customer; the control account is a single summary account inside the nominal ledger — the double-entry side." },
  { id: "FA-FC2-17", paper: "FA", area: "C", front: "What does the journal record?", back: "Everything with no other book of prime entry: error corrections, depreciation charges, irrecoverable-debt write-offs and other one-off entries." },

  /* FA D — Recording transactions & events (8) */
  { id: "FA-FC2-18", paper: "FA", area: "D", front: "Find the net amount from a gross (tax-inclusive) figure", back: "Net = gross ÷ (1 + tax rate); tax = gross − net. Never multiply the gross figure by the tax rate." },
  { id: "FA-FC2-19", paper: "FA", area: "D", front: "Trap: a gross invoice is $1,200 including 20% sales tax — how much is the tax?", back: "$200 (1,200 × 20/120; net = $1,000). Multiplying $1,200 by 20% gives the wrong $240." },
  { id: "FA-FC2-20", paper: "FA", area: "D", front: "How are sales and purchases recorded when sales tax applies?", back: "Net of tax. The tax itself sits in the sales tax account — a liability (usually) — and never touches profit or loss." },
  { id: "FA-FC2-21", paper: "FA", area: "D", front: "Expense for the year from cash paid — accruals version", back: "Expense = cash paid + closing accrual − opening accrual." },
  { id: "FA-FC2-22", paper: "FA", area: "D", front: "Expense for the year from cash paid — prepayments version", back: "Expense = cash paid − closing prepayment + opening prepayment." },
  { id: "FA-FC2-23", paper: "FA", area: "D", front: "Accrual and prepayment — where does each sit in the statement of financial position?", back: "Accrual: current liability. Prepayment: current asset." },
  { id: "FA-FC2-24", paper: "FA", area: "D", front: "Irrecoverable debts and the allowance — the order of operations", back: "Write off irrecoverable debts FIRST, then calculate the allowance on the remainder. Only the MOVEMENT in the allowance goes to profit or loss." },
  { id: "FA-FC2-25", paper: "FA", area: "D", front: "Which depreciation method never uses residual value?", back: "Reducing balance — the fixed percentage is applied to the carrying amount each year. Only straight line deducts residual value." },

  /* FA E — Preparing a trial balance (6) */
  { id: "FA-FC2-26", paper: "FA", area: "E", front: "Errors that DO throw the trial balance out", back: "One-sided postings, two debits or two credits, a transposition on one side only, and addition errors." },
  { id: "FA-FC2-27", paper: "FA", area: "E", front: "Which side does a suspense account open on?", back: "The side that fills the smaller column: debit suspense if credits exceed debits, credit suspense if debits exceed credits. It must end at nil." },
  { id: "FA-FC2-28", paper: "FA", area: "E", front: "When does an error correction go through suspense?", back: "Only if the error unbalanced the trial balance. Errors that leave it balanced (omission, commission, principle, etc.) are corrected without touching suspense." },
  { id: "FA-FC2-29", paper: "FA", area: "E", front: "Bank reconciliation — items adjusted in the CASH BOOK", back: "Bank charges, direct debits/standing orders, dishonoured cheques, and cash-book errors." },
  { id: "FA-FC2-30", paper: "FA", area: "E", front: "Bank reconciliation — items adjusted on the bank statement side", back: "Timing differences only: unpresented cheques (deduct) and outstanding lodgements (add)." },
  { id: "FA-FC2-31", paper: "FA", area: "E", front: "Error of commission vs error of principle", back: "Commission: right amount, wrong account of the SAME type. Principle: wrong TYPE of account (e.g. an expense posted as an asset). Both leave the trial balance balanced." },

  /* FA F — Preparing basic financial statements (6) */
  { id: "FA-FC2-32", paper: "FA", area: "F", front: "Cost of sales — the formula", back: "Opening inventory + purchases (+ carriage inwards) − closing inventory." },
  { id: "FA-FC2-33", paper: "FA", area: "F", front: "Carriage inwards vs carriage outwards", back: "Inwards is part of cost of sales; outwards is a selling/distribution expense." },
  { id: "FA-FC2-34", paper: "FA", area: "F", front: "Closing inventory — its two effects", back: "It reduces cost of sales in profit or loss AND appears as a current asset. Every year-end adjustment lands once in each statement." },
  { id: "FA-FC2-35", paper: "FA", area: "F", front: "Where do dividends paid appear?", back: "In the statement of changes in equity, as a deduction from retained earnings — never as an expense in profit or loss." },
  { id: "FA-FC2-36", paper: "FA", area: "F", front: "Statement of profit or loss — the skeleton", back: "Revenue − cost of sales = gross profit; less operating expenses plus other income = profit before tax; less income tax = profit for the year." },
  { id: "FA-FC2-37", paper: "FA", area: "F", front: "What replaces the owner's capital account in a company?", back: "Share capital, share premium and retained earnings — with the statement of changes in equity tracking the movements." },

  /* FA G — Simple consolidated financial statements (6) */
  { id: "FA-FC2-38", paper: "FA", area: "G", front: "What normally gives a parent control of a subsidiary?", back: "Owning more than half the voting shares — the group is then reported as if it were a single entity." },
  { id: "FA-FC2-39", paper: "FA", area: "G", front: "Two ways to measure NCI at acquisition", back: "At fair value (giving full goodwill) or at the NCI share of the fair value of net assets (proportionate goodwill)." },
  { id: "FA-FC2-40", paper: "FA", area: "G", front: "PURP — profit under a margin vs a mark-up", back: "Margin: profit = selling price × margin %. Mark-up: profit = selling price × mark-up ÷ (100 + mark-up). Then multiply by the proportion still in inventory." },
  { id: "FA-FC2-41", paper: "FA", area: "G", front: "Intragroup sales in the consolidated profit or loss", back: "Remove them from BOTH revenue and cost of sales — removing only one side double-counts." },
  { id: "FA-FC2-42", paper: "FA", area: "G", front: "Parent owns 80% — how much of the subsidiary's revenue is consolidated?", back: "100%. Control is all-or-nothing; the NCI line then shows the outsiders' 20% of profit and equity." },
  { id: "FA-FC2-43", paper: "FA", area: "G", front: "Group retained earnings — the formula", back: "Parent's retained earnings + parent's share of the subsidiary's POST-acquisition profits − PURP where the parent is the seller. Pre-acquisition profits never enter." },

  /* FA H — Interpretation of financial statements (5) */
  { id: "FA-FC2-44", paper: "FA", area: "H", front: "Quick (acid-test) ratio", back: "(Current assets − inventory) ÷ current liabilities. Excluding inventory is the whole point of the test." },
  { id: "FA-FC2-45", paper: "FA", area: "H", front: "Receivables collection period", back: "Trade receivables ÷ credit sales × 365 days." },
  { id: "FA-FC2-46", paper: "FA", area: "H", front: "Inventory holding period — and the classic denominator trap", back: "Inventory ÷ COST OF SALES × 365 days. Inventory is carried at cost, so revenue is the wrong denominator." },
  { id: "FA-FC2-47", paper: "FA", area: "H", front: "Capital employed", back: "Equity + non-current borrowings (equivalently, total assets − current liabilities) — the denominator of ROCE." },
  { id: "FA-FC2-48", paper: "FA", area: "H", front: "Trap: paying a supplier from cash — effect on the current ratio?", back: "Both sides shrink equally, so the ratio moves FURTHER from 1 in whichever direction it already leans: above 1 it rises, below 1 it falls." },

  /* ── FR — Financial Reporting (52) ──────────────────────────── */

  /* FR A — Conceptual & regulatory framework (8) */
  { id: "FR-FC2-01", paper: "FR", area: "A", front: "Substance over form — what does it demand?", back: "Account for the economic substance (who controls the asset, who bears risks and rewards, is there an unavoidable obligation) rather than the legal label on the contract." },
  { id: "FR-FC2-02", paper: "FR", area: "A", front: "Definition of fair value", back: "The EXIT price: the price to sell an asset or transfer a liability in an orderly transaction between market participants at the measurement date — not an entry or entity-specific value." },
  { id: "FR-FC2-03", paper: "FR", area: "A", front: "The standard-setting chain", back: "IFRS Foundation (oversight) → IASB (issues IFRS Accounting Standards) → IFRS Interpretations Committee (handles ambiguities)." },
  { id: "FR-FC2-04", paper: "FR", area: "A", front: "Recognition criteria under the 2018 Framework", back: "Recognise an element when doing so gives users RELEVANT information that FAITHFULLY REPRESENTS the item, subject to cost. Probability and measurement uncertainty feed that judgement — they are not standalone hurdles." },
  { id: "FR-FC2-05", paper: "FR", area: "A", front: "The four measurement bases", back: "Historical cost; fair value (exit price); value in use (present value of expected cash flows); current cost." },
  { id: "FR-FC2-06", paper: "FR", area: "A", front: "Sale-and-repurchase agreement — how is it accounted for?", back: "As a secured LOAN: inventory stays on the books, the cash received is a liability, and the excess repurchase price unwinds as finance cost. No revenue is recognised." },
  { id: "FR-FC2-07", paper: "FR", area: "A", front: "Equity, income and expenses per the Framework", back: "Equity = assets − liabilities. Income and expenses = changes in assets or liabilities, other than those from contributions to or distributions from owners." },
  { id: "FR-FC2-08", paper: "FR", area: "A", front: "Principles-based vs rules-based standards", back: "IFRS is principles-based: judgement guided by the Framework. Rules-based regimes try to legislate every case — and invite structuring around the rules." },

  /* FR B — Accounting for transactions, IFRS (15) */
  { id: "FR-FC2-09", paper: "FR", area: "B", front: "IFRS 16: how is the right-of-use asset initially measured?", back: "Lease liability + payments made before commencement + initial direct costs + estimated restoration costs." },
  { id: "FR-FC2-10", paper: "FR", area: "B", front: "IFRS 16: initial measurement of the lease liability", back: "The present value of the lease payments not yet paid, discounted at the interest rate implicit in the lease. Initial direct costs go to the ASSET, not the liability." },
  { id: "FR-FC2-11", paper: "FR", area: "B", front: "IFRS 16: over what period is the ROU asset depreciated?", back: "The SHORTER of the lease term and the asset's useful life. Interest meanwhile unwinds on the liability, so the total charge is front-loaded." },
  { id: "FR-FC2-12", paper: "FR", area: "B", front: "IAS 23: borrowing costs on a qualifying asset", back: "CAPITALISE them during construction, deducting any investment income earned on temporarily surplus borrowed funds." },
  { id: "FR-FC2-13", paper: "FR", area: "B", front: "IAS 38: the development capitalisation criteria", back: "Capitalise only once ALL are met: probable economic benefits, intention to complete, adequate resources, ability to use or sell, reliably measurable expenditure, technical feasibility. Costs incurred before the criteria are met stay expensed." },
  { id: "FR-FC2-14", paper: "FR", area: "B", front: "IAS 40 fair value model — where do gains on investment property go?", back: "To profit or loss — NOT to OCI. The opposite routing to an IAS 16 revaluation of owner-occupied property." },
  { id: "FR-FC2-15", paper: "FR", area: "B", front: "IAS 16: routing of revaluation gains and losses", back: "Gain → OCI and the revaluation surplus (unless reversing a previous P/L loss). Loss → profit or loss (unless reversing a surplus on the same asset)." },
  { id: "FR-FC2-16", paper: "FR", area: "B", front: "IFRS 15: agent vs principal — whose revenue?", back: "An agent recognises only its COMMISSION as revenue; a principal recognises the gross amount. Recognising gross sales as an agent is a classic error." },
  { id: "FR-FC2-17", paper: "FR", area: "B", front: "IAS 10: adjusting vs non-adjusting events", back: "Adjusting: evidence of conditions that existed AT the reporting date — adjust the figures. Non-adjusting: conditions arising after — disclose if material." },
  { id: "FR-FC2-18", paper: "FR", area: "B", front: "IFRS 9: the amortised cost roll-forward", back: "Opening balance + effective interest − cash paid = closing balance." },
  { id: "FR-FC2-19", paper: "FR", area: "B", front: "IAS 12: deferred tax — the formula", back: "Deferred tax = (carrying amount − tax base) × tax rate. An asset's carrying amount above its tax base creates a deferred tax LIABILITY." },
  { id: "FR-FC2-20", paper: "FR", area: "B", front: "IAS 20: government grant related to an asset", back: "Match it to the related costs: hold as deferred income and release to profit or loss over the asset's life (or deduct it from the asset's carrying amount)." },
  { id: "FR-FC2-21", paper: "FR", area: "B", front: "IAS 37: measuring a provision for a large population of items", back: "Use EXPECTED VALUES (probability-weighted outcomes); a single obligation uses the most likely outcome. Discount where the time value of money is material." },
  { id: "FR-FC2-22", paper: "FR", area: "B", front: "Contingent liability — recognised or disclosed?", back: "Never recognised: disclose it in the notes, unless the possibility of outflow is remote (then nothing)." },
  { id: "FR-FC2-23", paper: "FR", area: "B", front: "IAS 16: which costs are capitalised into PPE?", back: "Costs directly attributable to bringing the asset to the location and condition for use — including the estimated cost of dismantling obligations." },

  /* FR C — Analysing & interpreting financial statements (8) */
  { id: "FR-FC2-24", paper: "FR", area: "C", front: "The ROCE decomposition", back: "ROCE = operating profit margin × net asset turnover. When ROCE moves, ask: was it the margin, the turnover, or the capital base?" },
  { id: "FR-FC2-25", paper: "FR", area: "C", front: "Net asset turnover", back: "Revenue ÷ capital employed — how many dollars of sales each dollar of capital generates." },
  { id: "FR-FC2-26", paper: "FR", area: "C", front: "Interest cover", back: "Operating profit (PBIT) ÷ finance costs — how comfortably profit covers the interest bill." },
  { id: "FR-FC2-27", paper: "FR", area: "C", front: "Effect of an upward property revaluation on ROCE", back: "Capital employed rises, so ROCE and asset turnover FALL — with no real change in trading performance. Blame the denominator, not the business." },
  { id: "FR-FC2-28", paper: "FR", area: "C", front: "How does a mid-year acquisition distort group ratios?", back: "The statement of financial position is consolidated in full but only part-year profits are included — so return ratios are understated in the acquisition year." },
  { id: "FR-FC2-29", paper: "FR", area: "C", front: "The two gearing definitions", back: "Debt ÷ (debt + equity), or debt ÷ equity. They give different numbers from the same figures — state which you are using and stay consistent." },
  { id: "FR-FC2-30", paper: "FR", area: "C", front: "Rising gross margin but falling operating margin — the usual story?", back: "Overheads grew. Trading itself (buying and selling) did not deteriorate — the gap opened below gross profit." },
  { id: "FR-FC2-31", paper: "FR", area: "C", front: "Name four things that break ratio comparability between companies", back: "Different accounting policies (cost vs revaluation), different estimates, different year ends/seasonality, and one-off events or window dressing." },

  /* FR D — Preparation of financial statements (8) */
  { id: "FR-FC2-32", paper: "FR", area: "D", front: "What goes in other comprehensive income at FR level?", back: "Revaluation gains on PPE (and their reversals). Profit for the year + OCI = total comprehensive income." },
  { id: "FR-FC2-33", paper: "FR", area: "D", front: "The income tax expense — three components", back: "Current-year estimate ± prior-year under/over-provision ± the movement in deferred tax." },
  { id: "FR-FC2-34", paper: "FR", area: "D", front: "Indirect-method cash flow: the first adjustments to profit before tax", back: "Add back depreciation/amortisation and finance costs; deduct investment income and any profit on disposal (add a loss); then adjust for working capital." },
  { id: "FR-FC2-35", paper: "FR", area: "D", front: "Working capital signs in the statement of cash flows", back: "An INCREASE in inventory or receivables REDUCES cash; an increase in payables ADDS to cash. Decreases reverse the sign." },
  { id: "FR-FC2-36", paper: "FR", area: "D", front: "Loan notes issued part-way through the year — the interest trap", back: "Accrue the effective interest for the months in issue (e.g. rate × 6/12), even if nothing has been paid. Charging a full year — or only the cash paid — is wrong." },
  { id: "FR-FC2-37", paper: "FR", area: "D", front: "Structure of the statement of changes in equity", back: "One column per equity component (share capital, share premium, revaluation surplus, retained earnings); rows for profit, OCI, dividends and share issues." },
  { id: "FR-FC2-38", paper: "FR", area: "D", front: "Where does the depreciation charge sit in the profit or loss?", back: "In cost of sales or operating expenses, according to what the asset is used for." },
  { id: "FR-FC2-39", paper: "FR", area: "D", front: "Total comprehensive income", back: "Profit for the year + other comprehensive income. In equity, the two strands stay separate: retained earnings vs the revaluation surplus." },

  /* FR E — Consolidated financial statements (13) */
  { id: "FR-FC2-40", paper: "FR", area: "E", front: "Subsidiary vs associate — the ownership tests", back: "Control (usually over 50% of votes) makes a SUBSIDIARY: consolidate line by line. Significant influence (typically 20-50%) makes an ASSOCIATE: equity method, one line." },
  { id: "FR-FC2-41", paper: "FR", area: "E", front: "How are the subsidiary's net assets measured at acquisition?", back: "At FAIR VALUE. The uplifts are then depreciated over the assets' remaining lives, reducing post-acquisition profits every year after." },
  { id: "FR-FC2-42", paper: "FR", area: "E", front: "Is goodwill amortised?", back: "No — it is measured once at acquisition and then tested for IMPAIRMENT." },
  { id: "FR-FC2-43", paper: "FR", area: "E", front: "Goodwill impairment — who bears it?", back: "Under full goodwill (NCI at fair value): shared between the group and the NCI. Under proportionate goodwill: the parent's shareholders alone." },
  { id: "FR-FC2-44", paper: "FR", area: "E", front: "NCI share of profit for the year — the full formula", back: "NCI % × (subsidiary's profit − PURP if the sub is the seller − fair-value-uplift depreciation − goodwill impairment if the full-goodwill method is used)." },
  { id: "FR-FC2-45", paper: "FR", area: "E", front: "Mid-year acquisition — what gets consolidated?", back: "Only post-acquisition results: consolidate the subsidiary's revenue and expenses × months controlled ÷ 12." },
  { id: "FR-FC2-46", paper: "FR", area: "E", front: "The equity method — both statements", back: "SOFP: one line — cost + share of post-acquisition retained profits − impairment. P/L: one line — the investor's share of the associate's profit. Never line-by-line." },
  { id: "FR-FC2-47", paper: "FR", area: "E", front: "Intragroup trading with an associate — eliminated?", back: "No line-by-line elimination of trading or balances — but the investor's SHARE of any unrealised profit is removed." },
  { id: "FR-FC2-48", paper: "FR", area: "E", front: "PURP — whose profit is adjusted?", back: "The SELLER's. It therefore affects the NCI only when the SUBSIDIARY sold the goods; a parent-as-seller PURP hits group retained earnings alone." },
  { id: "FR-FC2-49", paper: "FR", area: "E", front: "Trap: 20% mark-up vs 20% margin on a $24,000 intragroup sale", back: "Mark-up: 24,000 × 20 ÷ 120 = $4,000. Margin: 24,000 × 20% = $4,800. Mark-up is on cost; margin is on the selling price." },
  { id: "FR-FC2-50", paper: "FR", area: "E", front: "Margin 25% — what mark-up is that?", back: "33⅓%. Margin is profit over selling price (25/100); on the cost of 75 the same profit is 25/75 = one third mark-up." },
  { id: "FR-FC2-51", paper: "FR", area: "E", front: "Proportionate NCI at acquisition — how measured, and the goodwill effect?", back: "NCI % × fair value of the identifiable net assets. The resulting goodwill belongs to the parent only, so it is smaller than (or equal to) full goodwill." },
  { id: "FR-FC2-52", paper: "FR", area: "E", front: "Why are pre-acquisition profits excluded from group retained earnings?", back: "They were BOUGHT, not earned by the group — they sit inside net assets at acquisition and are consumed by the goodwill calculation. Only post-acquisition profits are group earnings." },

  /* ── PM — Performance Management (48) ───────────────────────── */

  /* PM A — Specialist cost & management accounting (10) */
  { id: "PM-FC2-01", paper: "PM", area: "A", front: "ABC in five steps", back: "1) Identify the major activities 2) Pool each activity's overhead cost 3) Identify each pool's cost driver 4) Driver rate = pool cost ÷ total driver volume 5) Charge products by the drivers they consume." },
  { id: "PM-FC2-02", paper: "PM", area: "A", front: "When does traditional absorption costing distort product costs?", back: "When overheads are driven by batches, orders and complexity rather than volume — high-volume simple products then subsidise low-volume complex ones." },
  { id: "PM-FC2-03", paper: "PM", area: "A", front: "The cost gap (target costing)", back: "Estimated current cost − target cost. Close it by redesigning the product or process — never by raising the price, which the market sets." },
  { id: "PM-FC2-04", paper: "PM", area: "A", front: "Formula for TPAR?", back: "Return per factory hour ÷ cost per factory hour — it must exceed 1 for the product to be worthwhile." },
  { id: "PM-FC2-05", paper: "PM", area: "A", front: "Return per factory (bottleneck) hour", back: "Throughput per unit ÷ bottleneck time per unit, where throughput = sales price − direct material cost." },
  { id: "PM-FC2-06", paper: "PM", area: "A", front: "Cost per factory hour", back: "Total factory cost ÷ total bottleneck hours available." },
  { id: "PM-FC2-07", paper: "PM", area: "A", front: "Life-cycle costing — the design-stage fact examiners test", back: "Around 70-90% of a product's lifetime cost is COMMITTED at the design stage. Life-cycle cost per unit = total lifetime costs ÷ total lifetime units." },
  { id: "PM-FC2-08", paper: "PM", area: "A", front: "How can a TPAR actually be improved?", back: "More throughput per bottleneck hour (raise price, cut material cost, speed the bottleneck) or lower total factory costs. Producing more on non-bottleneck machines just builds inventory." },
  { id: "PM-FC2-09", paper: "PM", area: "A", front: "Four environmental management accounting techniques", back: "Input/output analysis, flow cost accounting, environmental activity-based costing, and life-cycle costing." },
  { id: "PM-FC2-10", paper: "PM", area: "A", front: "Trap: is labour a variable cost in throughput accounting?", back: "No — only direct materials are treated as variable; labour and overheads are part of fixed factory cost." },

  /* PM B — Decision-making techniques (12) */
  { id: "PM-FC2-11", paper: "PM", area: "B", front: "Relevant cost of materials in regular use", back: "Replacement cost — using them here means buying more." },
  { id: "PM-FC2-12", paper: "PM", area: "B", front: "Relevant cost of materials that will NOT be replaced", back: "The higher of scrap value and the value in any alternative use." },
  { id: "PM-FC2-13", paper: "PM", area: "B", front: "Relevant cost of labour — spare vs full capacity", back: "Spare capacity: nil. Full capacity: the labour cost PLUS the contribution lost from the work it is diverted away from." },
  { id: "PM-FC2-14", paper: "PM", area: "B", front: "Breakeven revenue", back: "Fixed costs ÷ C/S ratio, where the C/S ratio = contribution ÷ sales." },
  { id: "PM-FC2-15", paper: "PM", area: "B", front: "Units needed for a target profit", back: "(Fixed costs + target profit) ÷ contribution per unit. Forgetting to add the target profit to the numerator is the classic slip." },
  { id: "PM-FC2-16", paper: "PM", area: "B", front: "Margin of safety %", back: "(Budgeted sales − breakeven sales) ÷ budgeted sales × 100." },
  { id: "PM-FC2-17", paper: "PM", area: "B", front: "Shadow price of a scarce resource", back: "The contribution per unit of the resource earned by the MARGINAL product — the maximum premium above the normal price worth paying for one more unit." },
  { id: "PM-FC2-18", paper: "PM", area: "B", front: "Demand-curve pricing — the two equations", back: "P = a − bQ and MR = a − 2bQ. Profit is maximised where MR = MC." },
  { id: "PM-FC2-19", paper: "PM", area: "B", front: "Expected value — formula and when it is appropriate", back: "EV = Σ(outcome × probability). Suits a risk-NEUTRAL decision-maker and repeated decisions — not one-offs or the risk-averse." },
  { id: "PM-FC2-20", paper: "PM", area: "B", front: "Maximax vs maximin vs minimax regret", back: "Maximax: the optimist takes the best best-case. Maximin: the pessimist takes the best worst-case. Minimax regret: minimise the maximum opportunity loss." },
  { id: "PM-FC2-21", paper: "PM", area: "B", front: "Four costs that are NEVER relevant to a decision", back: "Sunk costs, committed costs, depreciation, and apportioned fixed overheads." },
  { id: "PM-FC2-22", paper: "PM", area: "B", front: "Make-or-buy — what do you compare?", back: "The external purchase price against the RELEVANT (avoidable) internal cost, including opportunity costs — not the full absorption cost." },

  /* PM C — Budgeting & control (15) */
  { id: "PM-FC2-23", paper: "PM", area: "C", front: "Materials price variance", back: "(Standard price − actual price) × actual quantity BOUGHT." },
  { id: "PM-FC2-24", paper: "PM", area: "C", front: "Materials usage variance", back: "(Standard quantity for ACTUAL output − actual quantity used) × standard price." },
  { id: "PM-FC2-25", paper: "PM", area: "C", front: "Labour rate variance", back: "(Standard rate − actual rate) × actual hours PAID." },
  { id: "PM-FC2-26", paper: "PM", area: "C", front: "Labour efficiency variance", back: "(Standard hours for actual output − actual hours WORKED) × standard rate. Hours worked, not hours paid." },
  { id: "PM-FC2-27", paper: "PM", area: "C", front: "Idle time variance", back: "Idle hours (hours paid − hours worked) × standard rate — always adverse." },
  { id: "PM-FC2-28", paper: "PM", area: "C", front: "Fixed overhead expenditure and volume variances", back: "Expenditure = budgeted − actual fixed overhead. Volume = (actual units − budgeted units) × standard fixed overhead per unit — absorption costing only." },
  { id: "PM-FC2-29", paper: "PM", area: "C", front: "Sales volume variance — valued at what?", back: "Standard CONTRIBUTION per unit under marginal costing; standard PROFIT per unit under absorption. Never at selling price." },
  { id: "PM-FC2-30", paper: "PM", area: "C", front: "Sales price variance", back: "(Actual price − standard price) × actual units sold." },
  { id: "PM-FC2-31", paper: "PM", area: "C", front: "Planning vs operational variances", back: "Planning: original standard vs revised standard — a standard-setting fault, not the manager's. Operational: revised standard vs actual — real performance." },
  { id: "PM-FC2-32", paper: "PM", area: "C", front: "Why flex the budget before calculating variances?", back: "Comparing actuals with the original fixed budget mixes volume effects with efficiency effects. Restate the budget at ACTUAL output first, then compare." },
  { id: "PM-FC2-33", paper: "PM", area: "C", front: "The learning curve formula", back: "y = ax^b, where y = cumulative AVERAGE time per unit, a = time for the first unit, x = cumulative units, and b = log r ÷ log 2 for learning rate r." },
  { id: "PM-FC2-34", paper: "PM", area: "C", front: "Zero-based vs incremental budgeting", back: "ZBB starts every line at nil and makes each activity justify itself — rigorous but costly. Incremental adds a percentage to last year — quick but bakes in old inefficiency." },
  { id: "PM-FC2-35", paper: "PM", area: "C", front: "Rolling budget", back: "A new period is added as each one closes, keeping the plan permanently twelve months long — suited to fast-changing environments." },
  { id: "PM-FC2-36", paper: "PM", area: "C", front: "When is there NO fixed overhead volume variance?", back: "Under marginal costing — it exists only when fixed overheads are absorbed into units." },
  { id: "PM-FC2-37", paper: "PM", area: "C", front: "Mix and yield variances — what do they split?", back: "The materials USAGE variance, when the input materials can substitute for one another." },

  /* PM D — Performance measurement & control (11) */
  { id: "PM-FC2-38", paper: "PM", area: "D", front: "ROI vs RI — the decision conflict", back: "A manager judged on ROI rejects any project below their CURRENT ROI, even if it beats the cost of capital. RI accepts anything with positive RI — so RI is goal-congruent." },
  { id: "PM-FC2-39", paper: "PM", area: "D", front: "Residual income — the formula", back: "Controllable divisional profit − (capital employed × notional cost of capital)." },
  { id: "PM-FC2-40", paper: "PM", area: "D", front: "The weakness of residual income", back: "It is an absolute figure, so it cannot compare divisions of different sizes — the one thing ROI does well." },
  { id: "PM-FC2-41", paper: "PM", area: "D", front: "The controllability principle", back: "Judge a manager only on revenues, costs and assets they can influence. Apportioned head-office costs belong in the DIVISION's evaluation, not the MANAGER's." },
  { id: "PM-FC2-42", paper: "PM", area: "D", front: "Minimum transfer price (the seller's floor)", back: "Marginal cost + any contribution lost on displaced external sales. With spare capacity the lost contribution is nil, so the floor is marginal cost." },
  { id: "PM-FC2-43", paper: "PM", area: "D", front: "Maximum transfer price (the buyer's ceiling)", back: "The LOWER of the external market price and the buying division's net revenue from using the item." },
  { id: "PM-FC2-44", paper: "PM", area: "D", front: "Why does ROI rise as a division's assets age?", back: "Accumulated depreciation shrinks the denominator, so ROI climbs while the division merely gets older — which discourages reinvestment." },
  { id: "PM-FC2-45", paper: "PM", area: "D", front: "Fitzgerald & Moon's building blocks", back: "Dimensions (results: financial performance, competitiveness; determinants: quality, flexibility, resource utilisation, innovation); standards (ownership, achievability, equity); rewards (clarity, motivation, controllability)." },
  { id: "PM-FC2-46", paper: "PM", area: "D", front: "The 3Es for not-for-profit bodies", back: "Economy — cheap inputs. Efficiency — output per unit of input. Effectiveness — outputs achieving the objectives. Value for money, not profit." },
  { id: "PM-FC2-47", paper: "PM", area: "D", front: "The balanced scorecard's cause-and-effect chain", back: "Learning & growth drives internal processes, which drive customer outcomes, which drive financial results — four linked perspectives, not four unrelated lists." },
  { id: "PM-FC2-48", paper: "PM", area: "D", front: "Transfer price set outside the min-max range — the consequence?", back: "One division is pushed to trade externally against the group's interest — e.g. buying outside while a sister division sits with spare capacity." },

  /* ── TX — Taxation, UK FA2024 (52) ──────────────────────────── */

  /* TX A — Income tax & NIC (13) */
  { id: "TX-FC2-01", paper: "TX", area: "A", front: "The UK tax year — its dates", back: "6 April to 5 April: 2024/25 runs from 6 April 2024 to 5 April 2025." },
  { id: "TX-FC2-02", paper: "TX", area: "A", front: "Personal allowance for 2024/25", back: "£12,570, deducted from net income to give taxable income (tapered above £100,000 of adjusted net income; nil from £125,140)." },
  { id: "TX-FC2-03", paper: "TX", area: "A", front: "The order income is stacked in the computation", back: "Non-savings, then savings, then dividends — always. Reordering changes which rate bands each layer falls into." },
  { id: "TX-FC2-04", paper: "TX", area: "A", front: "2024/25 rate bands for non-savings income", back: "Basic rate 20% on the first £37,700 of taxable income; higher rate 40% up to £125,140; additional rate 45% above." },
  { id: "TX-FC2-05", paper: "TX", area: "A", front: "Dividend tax rates 2024/25", back: "8.75% basic, 33.75% higher, 39.35% additional — after a £500 dividend nil-rate band available to every taxpayer." },
  { id: "TX-FC2-06", paper: "TX", area: "A", front: "The savings nil-rate bands 2024/25", back: "£1,000 for basic-rate taxpayers, £500 for higher-rate, nil for additional-rate — plus the £5,000 starting rate at 0% where non-savings taxable income is below £5,000." },
  { id: "TX-FC2-07", paper: "TX", area: "A", front: "Effect of gift aid and personal pension contributions on the bands", back: "The basic-rate (and higher-rate) band is EXTENDED by the gross amount. The payment is made net of 20%; higher-rate relief comes through the extension." },
  { id: "TX-FC2-08", paper: "TX", area: "A", front: "Class 1 employee NIC 2024/25", back: "8% on earnings between £12,570 and £50,270, then 2% above £50,270." },
  { id: "TX-FC2-09", paper: "TX", area: "A", front: "Class 1 employer NIC 2024/25", back: "13.8% on earnings above £9,100, with no upper limit — less the £5,000 employment allowance for most small employers." },
  { id: "TX-FC2-10", paper: "TX", area: "A", front: "Class 1A NIC — who pays it, on what?", back: "The EMPLOYER only, at 13.8% on taxable benefits (cars, loans, accommodation)." },
  { id: "TX-FC2-11", paper: "TX", area: "A", front: "Class 4 NIC 2024/25", back: "Paid by the self-employed on trading profits: 6% between £12,570 and £50,270, then 2% above." },
  { id: "TX-FC2-12", paper: "TX", area: "A", front: "Which income carries NIC?", back: "Earnings only: salary (Class 1), benefits (Class 1A, employer), trading profits (Class 4). Dividends, interest and property income carry NO NIC." },
  { id: "TX-FC2-13", paper: "TX", area: "A", front: "The 60% trap between £100,000 and £125,140", back: "Each £2 of income costs 40% tax AND strips £1 of personal allowance, giving an effective marginal rate of about 60% inside this band." },

  /* TX B — Chargeable gains (10) */
  { id: "TX-FC2-14", paper: "TX", area: "B", front: "CGT annual exempt amount 2024/25", back: "£3,000, deducted from net gains after losses. Companies get no annual exempt amount." },
  { id: "TX-FC2-15", paper: "TX", area: "B", front: "CGT rates 2024/25", back: "10% within any unused basic-rate band and 20% above it — 18% and 24% respectively for residential property." },
  { id: "TX-FC2-16", paper: "TX", area: "B", front: "Business asset disposal relief", back: "Qualifying business disposals taxed at 10%, subject to a £1,000,000 LIFETIME limit; those gains use the basic-rate band first." },
  { id: "TX-FC2-17", paper: "TX", area: "B", front: "Gifts and disposals to connected persons — what proceeds?", back: "Deemed MARKET VALUE, not actual proceeds. A gift is taxed as if sold at full value." },
  { id: "TX-FC2-18", paper: "TX", area: "B", front: "Losses vs the annual exempt amount — the order", back: "Current-year losses offset gains in full BEFORE the exempt amount (and can waste it); brought-forward losses only reduce gains DOWN TO the exempt amount." },
  { id: "TX-FC2-19", paper: "TX", area: "B", front: "Part disposal — the allowable cost formula", back: "Cost × A ÷ (A + B), where A = proceeds of the part sold and B = market value of the part retained." },
  { id: "TX-FC2-20", paper: "TX", area: "B", front: "The chattels rules", back: "Exempt if bought AND sold for £6,000 or less; sold above, the gain is capped at 5/3 × (gross proceeds − £6,000). Wasting chattels are exempt." },
  { id: "TX-FC2-21", paper: "TX", area: "B", front: "Admin for a UK residential property disposal", back: "A 60-day return and payment on account — the normal 31 January self-assessment date does not apply to that payment." },
  { id: "TX-FC2-22", paper: "TX", area: "B", front: "Private residence relief — the final-period rule", back: "PRR covers periods of actual (and deemed) occupation PLUS, always, the final 9 months of ownership." },
  { id: "TX-FC2-23", paper: "TX", area: "B", front: "How are a company's chargeable gains taxed?", back: "Through corporation tax — no CGT and no annual exempt amount; indexation allowance is frozen at December 2017." },

  /* TX C — Corporation tax (12) */
  { id: "TX-FC2-24", paper: "TX", area: "C", front: "Corporation tax rates FY2024", back: "19% where augmented profits are £50,000 or less; 25% at £250,000 or more; in between, 25% less marginal relief." },
  { id: "TX-FC2-25", paper: "TX", area: "C", front: "The marginal relief formula", back: "3/200 × (£250,000 − augmented profits) × TTP ÷ augmented profits, deducted from tax at 25%." },
  { id: "TX-FC2-26", paper: "TX", area: "C", front: "The marginal rate between £50,000 and £250,000", back: "26.5% on each extra pound of profit inside the band — higher than the 25% main rate itself." },
  { id: "TX-FC2-27", paper: "TX", area: "C", front: "Augmented profits", back: "Taxable total profits + dividends received. Used only to pick the rate — the dividends themselves are (mostly) not taxed, but they push the company up the rate scale." },
  { id: "TX-FC2-28", paper: "TX", area: "C", front: "How are the £50,000/£250,000 limits adjusted?", back: "Shared between associated companies and prorated for short accounting periods." },
  { id: "TX-FC2-29", paper: "TX", area: "C", front: "The annual investment allowance", back: "100% relief on the first £1,000,000 of qualifying plant and machinery per 12-month period — never on cars." },
  { id: "TX-FC2-30", paper: "TX", area: "C", front: "Full expensing", back: "Companies buying NEW main-rate plant claim 100% first-year relief with no cap (50% first-year allowance for new special-rate assets)." },
  { id: "TX-FC2-31", paper: "TX", area: "C", front: "Writing-down allowance rates", back: "Main pool 18% reducing balance; special rate pool 6% (integral features and cars over 50g/km)." },
  { id: "TX-FC2-32", paper: "TX", area: "C", front: "Capital allowances on cars", back: "New zero-emission: 100% FYA. 1-50g/km: main pool 18%. Over 50g/km: special rate pool 6%. Cars never qualify for AIA or full expensing." },
  { id: "TX-FC2-33", paper: "TX", area: "C", front: "Corporation tax payment and filing deadlines", back: "Payment 9 months + 1 day after the period end (large companies with profits over £1.5m pay quarterly instalments); the return is due 12 months after the period end." },
  { id: "TX-FC2-34", paper: "TX", area: "C", front: "Client vs staff entertaining for corporation tax", back: "Client entertaining is NEVER deductible; staff entertaining IS allowed. Questions place the two side by side deliberately." },
  { id: "TX-FC2-35", paper: "TX", area: "C", front: "Taxable total profits — the composition", back: "Trading profit + property income + interest income + chargeable gains − qualifying charitable donations. No personal allowance exists for companies." },

  /* TX D — VAT (9) */
  { id: "TX-FC2-36", paper: "TX", area: "D", front: "VAT registration threshold and test?", back: "£90,000 of taxable supplies. Historic test: any rolling 12 months, checked monthly — registration effective from the start of the second month after. Future test: next 30 days ALONE expected to exceed £90,000 — effective immediately." },
  { id: "TX-FC2-37", paper: "TX", area: "D", front: "VAT deregistration threshold", back: "£88,000 of expected taxable turnover." },
  { id: "TX-FC2-38", paper: "TX", area: "D", front: "Zero-rated vs exempt supplies", back: "Both charge no VAT, but zero-rated supplies are TAXABLE: input tax is recoverable and they count towards the registration threshold. Exempt supplies allow neither." },
  { id: "TX-FC2-39", paper: "TX", area: "D", front: "Extracting VAT from a gross (VAT-inclusive) amount", back: "Gross × 1/6 at the 20% standard rate. Multiplying the gross figure by 20% is the classic error." },
  { id: "TX-FC2-40", paper: "TX", area: "D", front: "Input tax that is always blocked", back: "VAT on cars with any private use, and on UK client entertaining — however business-related they feel." },
  { id: "TX-FC2-41", paper: "TX", area: "D", front: "Bad debt relief — the two conditions", back: "The debt is at least 6 months overdue from the DUE date, AND it has been written off in the books." },
  { id: "TX-FC2-42", paper: "TX", area: "D", front: "The tax point rules", back: "Basic tax point = delivery date; overridden by an EARLIER invoice or payment; an invoice within 14 days after delivery moves the tax point to the invoice date." },
  { id: "TX-FC2-43", paper: "TX", area: "D", front: "VAT return and payment deadline", back: "Quarterly, filed and paid electronically 1 month + 7 days after the period end (Making Tax Digital)." },
  { id: "TX-FC2-44", paper: "TX", area: "D", front: "The three special VAT schemes and their turnover limits", back: "Cash accounting ≤ £1,350,000 (VAT on cash flows; automatic bad debt relief). Annual accounting ≤ £1,350,000 (one return, instalments). Flat rate ≤ £150,000 (flat % of VAT-inclusive turnover; no input recovery except capital assets of £2,000+)." },

  /* TX E — Inheritance tax (8) */
  { id: "TX-FC2-45", paper: "TX", area: "E", front: "IHT nil rate band and residence nil rate band", back: "NRB £325,000 (refreshed on a 7-year cycle; unused proportion transfers to a surviving spouse). RNRB up to £175,000 where a home passes to direct descendants — tapered away above a £2m estate." },
  { id: "TX-FC2-46", paper: "TX", area: "E", front: "The taper relief table", back: "Death 3-4 years after the gift: 20% off the TAX; 4-5 years: 40%; 5-6 years: 60%; 6-7 years: 80%. Within 3 years: no taper at all." },
  { id: "TX-FC2-47", paper: "TX", area: "E", front: "CLT — the lifetime and death rates", back: "Lifetime: 20% above the available nil rate band (25% grossed up if the DONOR pays). Recomputed at 40% on death within 7 years, with credit for the lifetime tax — but no refund." },
  { id: "TX-FC2-48", paper: "TX", area: "E", front: "The annual exemption for lifetime gifts", back: "£3,000 per tax year — current year first, then one year brought forward (so up to £6,000 can shelter a gift). The brought-forward amount lapses if unused for one year." },
  { id: "TX-FC2-49", paper: "TX", area: "E", front: "Small gifts and marriage exemptions", back: "Small gifts: £250 per donee per year, all or nothing — a £300 gift gets no relief. Marriage: £5,000 from a parent, £2,500 from a grandparent or the other party, £1,000 from anyone else." },
  { id: "TX-FC2-50", paper: "TX", area: "E", front: "The death estate rate — and the charity rate", back: "40% above whatever nil rate band remains; 36% where at least 10% of the baseline estate is left to charity." },
  { id: "TX-FC2-51", paper: "TX", area: "E", front: "Who pays the IHT?", back: "Lifetime tax on a CLT: the donor (grossed up) or the trustees. Death tax on lifetime gifts: the DONEE. Tax on the estate: the personal representatives." },
  { id: "TX-FC2-52", paper: "TX", area: "E", front: "How is the nil rate band used at death?", back: "Lifetime gifts within 7 years of death consume it FIRST, in chronological order — the estate only gets what remains." },
]
