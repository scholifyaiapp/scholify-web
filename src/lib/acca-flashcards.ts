/*
 * Scholify — ACCA flashcards + a lightweight spaced-repetition layer.
 *
 * Key facts, definitions and standards that reward memorisation (exactly what
 * SRS is for). Cards are original and syllabus-aligned. Scheduling is a simple
 * Leitner-style box system persisted in localStorage — separate from the
 * question-practice progress so the two never interfere.
 */

export interface Flashcard {
  id: string
  paper: string
  area: string
  front: string
  back: string
}

export const FLASHCARDS: Flashcard[] = [
  /* FA */
  { id: "FA-FC-1", paper: "FA", area: "A", front: "The accounting equation", back: "Assets = Capital + Liabilities. (Rearranged: Capital = Assets − Liabilities.)" },
  { id: "FA-FC-2", paper: "FA", area: "B", front: "The two FUNDAMENTAL qualitative characteristics", back: "Relevance and faithful representation." },
  { id: "FA-FC-3", paper: "FA", area: "B", front: "The four ENHANCING qualitative characteristics", back: "Comparability, verifiability, timeliness, understandability." },
  { id: "FA-FC-4", paper: "FA", area: "C", front: "The golden rule of double entry", back: "Every transaction has an equal debit and credit. Debits: increase assets & expenses. Credits: increase liabilities, capital & income." },
  { id: "FA-FC-5", paper: "FA", area: "D", front: "Straight-line depreciation formula", back: "(Cost − Residual value) ÷ Useful life." },
  { id: "FA-FC-6", paper: "FA", area: "D", front: "IAS 2 inventory measurement", back: "Lower of cost and net realisable value (NRV)." },
  { id: "FA-FC-7", paper: "FA", area: "H", front: "Current ratio", back: "Current assets ÷ Current liabilities. Measures short-term liquidity." },
  { id: "FA-FC-8", paper: "FA", area: "H", front: "Gross profit margin", back: "(Gross profit ÷ Revenue) × 100%." },

  /* FR */
  { id: "FR-FC-1", paper: "FR", area: "A", front: "Who issues IFRS Accounting Standards?", back: "The IASB (International Accounting Standards Board)." },
  { id: "FR-FC-2", paper: "FR", area: "B", front: "IFRS 15 — the five steps", back: "1) Identify the contract 2) Identify performance obligations 3) Determine the transaction price 4) Allocate the price 5) Recognise revenue as obligations are satisfied." },
  { id: "FR-FC-3", paper: "FR", area: "B", front: "IAS 37 — three provision criteria", back: "Present obligation from a past event; probable outflow of resources; a reliable estimate can be made." },
  { id: "FR-FC-4", paper: "FR", area: "B", front: "IAS 16 — the two measurement models", back: "Cost model (cost less accumulated depreciation & impairment) and revaluation model (fair value less subsequent depreciation & impairment)." },
  { id: "FR-FC-5", paper: "FR", area: "E", front: "Goodwill on acquisition formula", back: "Consideration transferred + NCI at acquisition − fair value of identifiable net assets acquired." },
  { id: "FR-FC-6", paper: "FR", area: "B", front: "Net realisable value (NRV)", back: "Estimated selling price − costs to complete − costs to sell." },
  { id: "FR-FC-7", paper: "FR", area: "B", front: "IFRS 16 — lessee accounting", back: "Recognise a right-of-use asset and a lease liability (except short-term and low-value leases)." },
  { id: "FR-FC-8", paper: "FR", area: "B", front: "IAS 38 — research vs development", back: "Research: expensed as incurred. Development: capitalised only if the strict criteria are met." },
  { id: "FR-FC-9", paper: "FR", area: "B", front: "IAS 36 — recoverable amount", back: "Higher of (a) fair value less costs of disposal and (b) value in use. Impairment = carrying amount − recoverable amount." },

  /* FA extra */
  { id: "FA-FC-9", paper: "FA", area: "H", front: "ROCE (return on capital employed)", back: "(Profit before interest & tax ÷ Capital employed) × 100%." },
  { id: "FA-FC-10", paper: "FA", area: "D", front: "Reducing-balance depreciation", back: "Charge a fixed % on the carrying amount (cost less accumulated depreciation) each year." },
  { id: "FA-FC-11", paper: "FA", area: "E", front: "Errors NOT shown by the trial balance", back: "Errors of omission, commission, principle, original entry, compensating errors, and complete reversal — all keep debits = credits." },
  { id: "FA-FC-12", paper: "FA", area: "D", front: "Profit / loss on disposal", back: "Sale proceeds − carrying amount at disposal. Positive = profit, negative = loss." },

  /* MA */
  { id: "MA-FC-1", paper: "MA", area: "A", front: "High-low method", back: "Variable cost/unit = (cost at high − cost at low) ÷ (units high − units low). Then find fixed cost by substitution." },
  { id: "MA-FC-2", paper: "MA", area: "C", front: "Contribution per unit", back: "Selling price per unit − variable cost per unit." },
  { id: "MA-FC-3", paper: "MA", area: "C", front: "Breakeven point (units)", back: "Fixed costs ÷ contribution per unit." },
  { id: "MA-FC-4", paper: "MA", area: "B", front: "Absorption vs marginal costing", back: "Absorption puts fixed production overhead into unit cost; marginal treats it as a period cost." },
  { id: "MA-FC-5", paper: "MA", area: "B", front: "Overhead absorption rate (OAR)", back: "Budgeted overheads ÷ budgeted activity level (e.g. labour or machine hours)." },
  { id: "MA-FC-6", paper: "MA", area: "E", front: "Return on investment (ROI)", back: "(Operating profit ÷ capital employed) × 100%." },

  /* AA */
  { id: "AA-FC-1", paper: "AA", area: "B", front: "Audit risk model", back: "Audit risk = inherent risk × control risk × detection risk. The auditor controls detection risk." },
  { id: "AA-FC-2", paper: "AA", area: "D", front: "Sufficient vs appropriate evidence", back: "Sufficient = quantity. Appropriate = quality (relevance + reliability)." },
  { id: "AA-FC-3", paper: "AA", area: "E", front: "Modified opinions", back: "Material but not pervasive → qualified ('except for'). Material & pervasive misstatement → adverse. Pervasive scope limitation → disclaimer." },
  { id: "AA-FC-4", paper: "AA", area: "A", front: "Level of assurance in an audit", back: "Reasonable (high, not absolute) assurance. A review engagement gives limited assurance." },
  { id: "AA-FC-5", paper: "AA", area: "C", front: "Tests of controls vs substantive procedures", back: "Tests of controls check controls operate effectively; substantive procedures test the figures for misstatement." },

  /* PM */
  { id: "PM-FC-1", paper: "PM", area: "A", front: "Target cost", back: "Target selling price − required profit margin. The gap to close is the 'cost gap'." },
  { id: "PM-FC-2", paper: "PM", area: "A", front: "Throughput per unit", back: "Sales price − direct material cost (only material is treated as variable)." },
  { id: "PM-FC-3", paper: "PM", area: "B", front: "Relevant vs sunk cost", back: "Relevant = future incremental cash flow that differs between options. Sunk = past cost, ignored." },
  { id: "PM-FC-4", paper: "PM", area: "B", front: "Limiting factor ranking", back: "Rank products by contribution per unit of the scarce (limiting) resource." },
  { id: "PM-FC-5", paper: "PM", area: "D", front: "Balanced scorecard — 4 perspectives", back: "Financial, customer, internal business process, learning & growth." },

  /* FM */
  { id: "FM-FC-1", paper: "FM", area: "B", front: "NPV decision rule", back: "Accept a project if NPV > 0 (it earns more than the cost of capital)." },
  { id: "FM-FC-2", paper: "FM", area: "B", front: "IRR", back: "The discount rate at which NPV = 0. Accept if IRR > cost of capital." },
  { id: "FM-FC-3", paper: "FM", area: "C", front: "Working capital cycle", back: "Inventory days + receivables days − payables days." },
  { id: "FM-FC-4", paper: "FM", area: "D", front: "WACC", back: "Weighted average of the cost of equity and cost of debt, weighted by market values." },
  { id: "FM-FC-5", paper: "FM", area: "E", front: "Dividend growth model", back: "P0 = D0(1 + g) ÷ (re − g), where re is the cost of equity and g the growth rate." },

  /* BT */
  { id: "BT-FC-1", paper: "BT", area: "A", front: "PESTEL analysis", back: "Political, Economic, Social, Technological, Environmental, Legal — a framework for the external macro-environment." },
  { id: "BT-FC-2", paper: "BT", area: "B", front: "Tuckman's team stages", back: "Forming → Storming → Norming → Performing (→ Adjourning)." },
  { id: "BT-FC-3", paper: "BT", area: "B", front: "Fayol's 5 functions of management", back: "Planning, organising, commanding, coordinating, controlling." },
  { id: "BT-FC-4", paper: "BT", area: "C", front: "ACCA's 5 fundamental ethical principles", back: "Integrity, objectivity, professional competence & due care, confidentiality, professional behaviour." },
  { id: "BT-FC-5", paper: "BT", area: "C", front: "The agency problem", back: "Directors (agents) may act in their own interest rather than that of the shareholders (principals)." },

  /* LW */
  { id: "LW-FC-1", paper: "LW", area: "B", front: "Essential elements of a simple contract", back: "Offer, acceptance, consideration, intention to create legal relations, and capacity." },
  { id: "LW-FC-2", paper: "LW", area: "B", front: "Invitation to treat", back: "An invitation to make an offer (e.g. shop displays, adverts) — not itself an offer that can be accepted." },
  { id: "LW-FC-3", paper: "LW", area: "B", front: "Negligence — what must be proved", back: "A duty of care owed, breach of that duty, and loss caused by the breach (not too remote)." },
  { id: "LW-FC-4", paper: "LW", area: "D", front: "Separate legal personality", back: "Salomon v Salomon: a company is a legal person distinct from its members (the veil of incorporation)." },
  { id: "LW-FC-5", paper: "LW", area: "D", front: "Limited liability (shares)", back: "A member's liability is limited to any amount unpaid on their shares." },

  /* TX */
  { id: "TX-FC-1", paper: "TX", area: "A", front: "Personal allowance taper", back: "The allowance is reduced by £1 for every £2 of adjusted net income above £100,000 (so it can taper to nil)." },
  { id: "TX-FC-2", paper: "TX", area: "A", front: "Key indicators of EMPLOYMENT (vs self-employment)", back: "Control by the engager, mutual obligation, personal service (no substitute), integration into the business, no financial risk." },
  { id: "TX-FC-3", paper: "TX", area: "B", front: "CGT exempt assets", back: "Motor cars, main residence (with PRR), assets in ISAs, gilts & qualifying corporate bonds, wasting chattels." },
  { id: "TX-FC-4", paper: "TX", area: "B", front: "Share matching order (individuals)", back: "1) Same-day acquisitions 2) Acquisitions in the following 30 days 3) The share pool." },
  { id: "TX-FC-5", paper: "TX", area: "C", front: "Adjustment of trading profits", back: "Add back disallowed items (depreciation, client entertaining, fines); deduct capital allowances." },
  { id: "TX-FC-6", paper: "TX", area: "D", front: "'Taxable supplies' for VAT registration", back: "Standard-rated + reduced-rated + zero-rated supplies. Exempt supplies never count towards the threshold." },
  { id: "TX-FC-7", paper: "TX", area: "E", front: "PET vs CLT", back: "Gift to an individual = potentially exempt transfer (exempt if donor survives 7 years). Gift into most trusts = chargeable lifetime transfer, taxed when made." },

  /* SBR */
  { id: "SBR-FC-1", paper: "SBR", area: "A", front: "Asset (Conceptual Framework 2018)", back: "A present economic resource controlled by the entity as a result of past events; an economic resource is a right with the potential to produce economic benefits." },
  { id: "SBR-FC-2", paper: "SBR", area: "A", front: "Liability (Conceptual Framework 2018)", back: "A present obligation of the entity to transfer an economic resource as a result of past events." },
  { id: "SBR-FC-3", paper: "SBR", area: "C", front: "IFRS 10 — three elements of control", back: "Power over the investee; exposure/rights to variable returns; ability to use power to affect those returns." },
  { id: "SBR-FC-4", paper: "SBR", area: "D", front: "IFRS 9 — financial asset categories", back: "Amortised cost (hold-to-collect + SPPI); FVOCI (collect & sell + SPPI, or elected equity); FVTPL (residual)." },
  { id: "SBR-FC-5", paper: "SBR", area: "D", front: "Expected credit loss stages", back: "Stage 1: 12-month ECL. Stage 2: lifetime ECL (significant increase in credit risk). Stage 3: credit-impaired — interest on the net amount." },
  { id: "SBR-FC-6", paper: "SBR", area: "B", front: "IFRS 2 — equity- vs cash-settled", back: "Equity-settled: grant-date fair value, not remeasured, credit to equity. Cash-settled: liability remeasured each period through P/L." },

  /* SBL */
  { id: "SBL-FC-1", paper: "SBL", area: "A", front: "The four roles of NEDs", back: "Strategy (challenge & contribute), scrutiny (monitor executives), risk (robust controls & reporting), people (remuneration & appointments)." },
  { id: "SBL-FC-2", paper: "SBL", area: "B", front: "Porter's five forces", back: "New entrants, supplier power, buyer power, substitutes, competitive rivalry." },
  { id: "SBL-FC-3", paper: "SBL", area: "B", front: "Mendelow's matrix quadrants", back: "Key players (manage closely), keep satisfied (high power), keep informed (high interest), minimal effort (low/low). Axes: power × interest." },
  { id: "SBL-FC-4", paper: "SBL", area: "C", front: "TARA risk responses", back: "Transfer (insure/outsource), Avoid (exit the activity), Reduce (controls), Accept (retain low/low risks)." },
  { id: "SBL-FC-5", paper: "SBL", area: "A", front: "The three key board committees", back: "Audit (financial reporting & controls), remuneration (executive pay), nomination (board appointments & succession) — staffed by NEDs." },
]

export function getFlashcards(paperId: string): Flashcard[] {
  return FLASHCARDS.filter((c) => c.paper === paperId)
}

/* ── Leitner scheduling (localStorage) ────────────────────────── */

const KEY = "scholify-acca-flashcards"
/** Days until a card in each box is due again. */
const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 16, 35]

interface CardState {
  box: number
  due: string // yyyy-MM-dd
}

type Store = Record<string, CardState>

function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
}

function addDaysStr(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
}

function read(): Store {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as Store
  } catch {
    /* ignore */
  }
  return {}
}

function write(s: Store): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    /* ignore */
  }
}

/** Cards due for review today for a paper (new cards count as due). */
export function getDueFlashcards(paperId: string): Flashcard[] {
  const store = read()
  const today = todayStr()
  return getFlashcards(paperId).filter((c) => {
    const st = store[c.id]
    if (!st) return true
    return st.due <= today
  })
}

/** Grade a card: known → advance a box; unknown → back to box 1. Persists. */
export function reviewFlashcard(cardId: string, known: boolean): void {
  const store = read()
  const prev = store[cardId] ?? { box: 0, due: todayStr() }
  const box = known ? Math.min(BOX_INTERVAL_DAYS.length - 1, prev.box + 1) : 1
  store[cardId] = { box, due: addDaysStr(BOX_INTERVAL_DAYS[box]) }
  write(store)
}

export function flashcardStats(paperId: string): { total: number; due: number; mastered: number } {
  const store = read()
  const cards = getFlashcards(paperId)
  let mastered = 0
  for (const c of cards) if ((store[c.id]?.box ?? 0) >= 4) mastered += 1
  return { total: cards.length, due: getDueFlashcards(paperId).length, mastered }
}
