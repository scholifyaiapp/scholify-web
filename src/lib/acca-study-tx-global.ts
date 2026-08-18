import type { StudyChapter } from "@/lib/acca-study-content"
import type { TopicBrief } from "@/lib/acca-briefs"
import { TXG_AREA_A } from "@/lib/acca-study-txg-tree-a"
import { TXG_AREA_B } from "@/lib/acca-study-txg-tree-b"
import { TXG_AREA_C } from "@/lib/acca-study-txg-tree-c"
import { TXG_AREA_D } from "@/lib/acca-study-txg-tree-d"
import { TXG_AREA_E } from "@/lib/acca-study-txg-tree-e"
import { TXG_AREA_F } from "@/lib/acca-study-txg-tree-f"
import { TXG_AREA_G } from "@/lib/acca-study-txg-tree-g"

/*
 * TX-GLOBAL — the jurisdiction-neutral tax foundation track.
 *
 * ── WHAT THIS IS, AND WHY IT IS NOT A SHIM ANY MORE ──────────────
 * There is no ACCA "TX-Global" exam, and this file must never pretend otherwise. ACCA
 * examines TX only as jurisdiction variants — UK, Ireland, Malaysia, Singapore, Hong Kong
 * and the rest — and a candidate sits the one named on their exam entry. Both places this
 * track is offered say so: Settings labels it "International foundation (not an ACCA exam
 * variant)" and onboarding says "Jurisdiction-neutral principles · not an ACCA exam
 * variant, so no mocks". Chapter 1 of every area repeats it.
 *
 * The track exists for a real reader: somebody who has not yet chosen a variant, whose
 * jurisdiction's paper they cannot yet study, or who wants the transferable reasoning that
 * survives a change of country.
 *
 * ── THE DEFECT THIS REPLACES ─────────────────────────────────────
 * The previous version was SEVEN chapters produced by a .map() over a table of eight
 * term/definition pairs per area. One section each, three blocks, 2,967 words for the
 * entire track — against 53,643 for TX-UK. Every chapter had the same shape, the same five
 * outcomes and the same two exam traps, because none of them was written; they were
 * generated. At one chapter a day it was a seven-day course, and it taught vocabulary
 * rather than method.
 *
 * It was also invisible to both structural gates: validate-chapters.ts iterates the fifteen
 * paper ids plus an EXTRA_TREES list that contained only LW-ENG, and chaptersForPaper("TX")
 * returns the UK tree — so these chapters were in neither the validated count nor the
 * render test. Both now include TX-GLOBAL.
 *
 * ── THE TREE ─────────────────────────────────────────────────────
 *   Area A  TXG-01..03  purpose and administration of taxation
 *   Area B  TXG-04..08  individual income and employment
 *   Area C  TXG-09..11  capital gains and disposals
 *   Area D  TXG-12..13  transfers of wealth and estates
 *   Area E  TXG-14..18  business and corporate taxation
 *   Area F  TXG-19..21  consumption and indirect taxation
 *   Area G  TXG-22..24  ethics, planning and cross-border tax
 *
 * Areas B and E carry five chapters each because individual income and corporate taxation
 * are the two largest bodies of rules in any real variant, and the track would misrepresent
 * the subject if it gave them the same weight as, say, wealth transfers.
 *
 * ── THE RULE THE WHOLE TRACK IS BUILT ON ─────────────────────────
 * NO RATE, BAND, THRESHOLD OR TIME LIMIT IS EVER STATED AS FACT. Every one of them is a
 * political choice that does not transfer. What transfers is the structure — that a
 * liability is a base times a rate, that residence and source decide whose base it enters,
 * that a deduction and a credit are worth different amounts, that a deferral relief works
 * by reducing the cost of the next asset. Scenarios supply their own figures in a neutral
 * currency (CU) and neutral jurisdictions (Jurisdiction A, B, L, Z).
 *
 * These chapters carry no syllabusRefs, deliberately: there is no official syllabus to
 * reference, and inventing codes would imply one exists.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

export const TX_GLOBAL_CHAPTERS: StudyChapter[] = [
  ...TXG_AREA_A,
  ...TXG_AREA_B,
  ...TXG_AREA_C,
  ...TXG_AREA_D,
  ...TXG_AREA_E,
  ...TXG_AREA_F,
  ...TXG_AREA_G,
]

/*
 * One brief per area, in the order A–G. The accompanying test asserts exactly that set and
 * that order, which is what stops an area being dropped or duplicated as the track changes.
 *
 * A brief is the seven-minute orientation a learner reads before the chapters, so each one
 * states the area's governing idea rather than summarising its contents — the summary lives
 * in the chapters themselves.
 */
export const TX_GLOBAL_BRIEFS: TopicBrief[] = [
  {
    paper: "TX",
    area: "A",
    title: "Purpose and administration of taxation",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Why a tax exists before what it charges",
        body: "A tax is asked to do four things: raise revenue, redistribute, change behaviour and price environmental cost. Reliefs are spending delivered through the tax system, so every one of them narrows the base and needs a higher rate to make up. Judge any tax against equity, certainty, convenience, efficiency, neutrality and flexibility — and expect certainty and equity to pull against each other, which is why real tax codes are long.",
      },
      {
        kind: "structure",
        heading: "Classify, then locate the charge",
        body: "Three independent questions: who bears it (direct or indirect), what is taxed (revenue or capital), and how the AVERAGE rate moves as the base grows (progressive, proportional or regressive). Progressivity is about the average rate, not the number of rates — a flat rate above a fixed allowance is progressive. Then read any charging provision by asking who is chargeable, on what, for what period, at what rate and less what.",
      },
      {
        kind: "example",
        heading: "Where an item enters decides what it is worth",
        body: "Draw the liability line. Exemptions, deductions and allowances sit above it, change the BASE, and are worth the amount times the taxpayer's marginal rate — so they give most to those who need it least. Credits sit below it, change the TAX, and are worth their face value to everyone. A CU 2,000 deduction saves a 20% taxpayer CU 400; a CU 2,000 credit saves them CU 2,000. Then ask whether the credit is refundable, because that decides whether it reaches anyone with no tax to pay.",
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: "Treating the authority's manuals as law rather than as its view; assuming double taxation means somebody erred, when residence and source are independent legitimate claims; subtracting a credit from the base or an allowance from the tax; calling a single-rate tax proportional without testing the average rate; and confusing interest, which compensates and cannot be mitigated, with a penalty, which punishes and can be.",
      },
    ],
  },
  {
    paper: "TX",
    area: "B",
    title: "Individual income and employment",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Residence decides how much a jurisdiction can reach",
        body: "Before any figure is computed, status decides the scope of the charge. A resident of a worldwide-basis jurisdiction is taxed on income wherever arising; a non-resident only on what arises locally. Split-year rules divide a year at a move but are conditional, and they never switch off the source claim — property, local business, locally performed duties and payments by local payers all stay in charge after residence ends.",
      },
      {
        kind: "structure",
        heading: "The computation has a load-bearing order",
        body: "Total income, less reliefs to NET income, less allowances to TAXABLE income, then rates, then tax reducers, then tax already withheld to reach tax PAYABLE. Net income is what allowance-withdrawal tests bite on, which is why reliefs must be deducted first. A withdrawn allowance creates an effective marginal rate well above the headline rate, and that is what planning questions exploit.",
      },
      {
        kind: "example",
        heading: "Status, benefits and contributions",
        body: "Employment or self-employment is judged as a whole picture — control, personal service, mutuality, financial risk, equipment, integration — not by counting factors or reading the contract's label. Benefits are valued at cost or market value, reduced for employee contributions and business use, apportioned for part-year provision; a lent asset is charged on its value WHEN FIRST LENT, and a cheap loan on the interest shortfall. Social contributions are charged on earnings only, often with a ceiling that makes them regressive above it.",
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: "Deducting the personal allowance before reliefs; testing an allowance withdrawal against total or taxable income instead of net; applying the self-employed 'wholly and exclusively' test to an employee, who usually needs 'wholly, exclusively AND NECESSARILY'; valuing a lent asset at current rather than original value; comparing employment with self-employment without including the EMPLOYER contribution, which is usually the largest figure in the comparison.",
      },
    ],
  },
  {
    paper: "TX",
    area: "C",
    title: "Capital gains and disposals",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Three conditions, and exemptions that remove one of them",
        body: "A gain is charged only where there is a chargeable person, a chargeable asset and a chargeable disposal. Most exemptions work by removing one — excluding an asset class, or treating a transfer as no gain and no loss. And an exclusion works BOTH ways: no chargeable gain means no allowable loss, which is usually why the class was excluded in the first place.",
      },
      {
        kind: "structure",
        heading: "Test the badges of trade before computing anything",
        body: "Frequent, short-held, worked-on resales are a TRADE taxed as income, not a series of capital gains. Getting that wrong invalidates everything after it, however accurate. Then: disposal happens on the CONTRACT date, and gifts and connected-person transactions are computed at MARKET VALUE whatever actually changed hands — which can create tax with no cash, and is precisely why deferral reliefs exist.",
      },
      {
        kind: "example",
        heading: "Part disposals, share pools and the order of set-off",
        body: "Apportion cost by relative VALUE — A/(A+B), where B is the part RETAINED — never by area or unit count. Shares are indistinguishable, so matching rules impose an order and a pool carries a running number and cost; a bonus issue adds shares but no cost, a rights issue adds both. Set off current-year losses in FULL first even if that wastes the annual exemption, then the exemption, then brought-forward losses restricted so the exemption survives.",
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: "Deducting repairs as enhancement expenditure; using the whole asset's value as B in the part disposal formula; treating a no gain, no loss transfer as an exemption when it defers by passing on the original cost; describing a deferral relief as removing a gain, when it reduces the base cost of another asset; and recommending a deferral claim without noting that it can waste the current exemption or forfeit a lower business rate.",
      },
    ],
  },
  {
    paper: "TX",
    area: "D",
    title: "Transfers of wealth and estates",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Cumulation is what makes the tax work at all",
        body: "A charge looking at each gift in isolation is defeated in an afternoon by splitting an estate into parcels. So transfers share a single running nil-rate amount applied in chronological order, usually over a lookback period so old gifts eventually drop out. Every rule in the area follows from that: why the ORDER of gifts matters, why dates matter, and why the first question is always what this person has already given.",
      },
      {
        kind: "structure",
        heading: "Measure the loss to the donor, not the gain to the donee",
        body: "A transfer of value is the estate before less the estate after. Giving away enough shares to lose control costs the donor far more than the recipient gains, and the loss measure captures that while a gain measure would not. Where the DONOR bears the tax, gross up — paying it is itself a further reduction in the estate.",
      },
      {
        kind: "example",
        heading: "Death, reliefs and the interaction with gains tax",
        body: "The estate is assets at open market value less debts and funeral costs, less exempt legacies and reliefs. Business and agricultural reliefs exist so the tax does not force the sale of productive assets — so watch for a will that wastes them by leaving relieved property to an already-exempt spouse. And in systems with an uplift, death is NOT a disposal for gains: the lifetime growth is extinguished for ever, which is what makes lifetime giving and retention genuine alternatives rather than one obviously right answer.",
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: "Valuing a gift by what the recipient received; giving each gift a fresh nil-rate amount instead of cumulating; forgetting to gross up when the donor pays; reaching for a small annual allowance when a pattern of gifts from surplus income qualifies for the unlimited normal-expenditure exemption; deducting administration costs from an estate; and recommending lifetime gifts generally without weighing the survival period and the lost uplift.",
      },
    ],
  },
  {
    paper: "TX",
    area: "E",
    title: "Business and corporate taxation",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Separate legal personality is the premise",
        body: "A company is a person distinct from its owners, which is what creates the double layer of tax on distributed profit — and what makes a director's salary deductible where a sole trader's own 'salary' is added back. Residence is tested by incorporation or by central management and control, and control means where strategy is genuinely decided, not where the factories are. A non-resident is reached only through a permanent establishment.",
      },
      {
        kind: "structure",
        heading: "Adjust, aggregate, then apply the rate",
        body: "Add back depreciation, capital items, entertaining, fines and general provisions; remove income taxed under another heading; deduct statutory depreciation allowances. Then aggregate trading profit, investment income and chargeable gains — companies pay no separate gains tax — and deduct reliefs against total profits. An accounting period never exceeds twelve months, so split a long period of account: trading profit by time, capital allowances separately, gains by the DATE of disposal.",
      },
      {
        kind: "example",
        heading: "Losses, groups and getting money out",
        body: "A loss can go against total profits, back, forward, or to a group company — and the choice turns on rates, whether other reliefs will be wasted by an all-or-nothing claim, and how certain future profits are. Surrender losses first where the MARGINAL rate is highest, which a taper can make a mid-sized company. Extracting profit as salary is deductible but attracts contributions on both sides; a dividend is not deductible but escapes them — and the uncapped employer charge is usually what decides the comparison.",
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: "Adding back directors' remuneration; putting all interest into the trading computation instead of classifying it by purpose; apportioning a gain across a long period of account; ignoring associated companies when scaling rate limits; setting a capital loss against trading profits when it is ring-fenced to gains; treating an intra-group asset transfer as permanently tax-free and missing the degrouping charge; and assuming a transfer pricing adjustment is automatically matched abroad.",
      },
    ],
  },
  {
    paper: "TX",
    area: "F",
    title: "Consumption and indirect taxation",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Charged at every stage, borne only at the last",
        body: "Every registered business charges output tax and recovers input tax, so each pays over only the tax on the value IT added and none of them bears any of it. The final consumer bears the lot. That self-cancelling mechanism is why a registered business is a collector rather than a taxpayer, why no cascade arises however long the supply chain, and why almost all planning in the area is about cash flow rather than about reducing tax.",
      },
      {
        kind: "structure",
        heading: "Zero-rated and exempt are opposites",
        body: "Zero-rated is a TAXABLE supply at a nil rate: register, charge nothing, recover everything, and sit in a permanent repayment position. Exempt is OUTSIDE the system: charge nothing, recover nothing, and bear the tax as a real cost. They look identical to the customer and are opposites to the business. Zero-rated supplies count towards the registration threshold; exempt supplies do not.",
      },
      {
        kind: "example",
        heading: "Timing, recovery and crossing a border",
        body: "The basic tax point is overridden by an earlier invoice or payment, and by an invoice issued shortly after — so a deposit creates a liability before the supply and a late invoice can defer a quarter. Extract tax from gross amounts with r/(100+r). Partly exempt businesses recover directly attributable taxable input tax in full and a ratio of residual overheads. Across a border the destination principle governs: exports zero-rated, imports taxed on arrival, and services reverse-charged onto the customer.",
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: "Treating zero-rated and exempt as equivalent; excluding zero-rated turnover from the registration threshold; adding earlier turnover into the forward test, which asks about the coming period ALONE; recovering input tax on a car available for private use or on customer entertaining; forgetting the deemed supply on deregistration; assuming the reverse charge is cost-free, when it nets to nil only for a fully taxable customer; and presenting a flat rate scheme as a tax saving rather than testing it against actual input tax.",
      },
    ],
  },
  {
    paper: "TX",
    area: "G",
    title: "Ethics, planning and cross-border tax",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Concealment is what makes conduct criminal",
        body: "Planning, acceptable avoidance, abusive avoidance and evasion form a spectrum, not two boxes. The reliable test is not how aggressive an arrangement is but whether the facts were stated honestly: a fully disclosed artificial scheme is avoidance, open to counteraction under a general anti-abuse rule but not criminal. Misstating or hiding the facts is evasion, however small the amount.",
      },
      {
        kind: "structure",
        heading: "The sequence when a client has erred",
        body: "Establish the facts; advise disclosure and explain the consequences, including that an unprompted disclosure is worth far more than one made after an enquiry opens; give them the chance to correct it; cease to act if they refuse; report where the law requires; do NOT tell the client you reported; and do NOT tell the authority why you resigned. The reporting duty overrides confidentiality — nothing else does, and merging those two points loses both marks.",
      },
      {
        kind: "example",
        heading: "Relieving the overlap, and working with tools",
        body: "A treaty allocates and limits taxing rights and never creates a charge, so establish the domestic position first. Dual residence is resolved by a strict cascade — permanent home, centre of vital interests, habitual abode, nationality — stopping at the first test that decides. Exemption leaves the taxpayer bearing the source rate; credit is capped at the domestic tax on that income, so it leaves them bearing the HIGHER of the two rates. And software applies rules to the data it is given: classification remains a judgement, which is why clean output can be confidently wrong.",
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: "Stopping at 'avoidance is legal, evasion is illegal'; advising the adviser to report evasion to the tax authority, which breaches confidentiality; telling the client a report has been made, which is a separate offence; using a treaty to create a charge; weighing the residence tie-breakers together instead of applying them in order; crediting the full foreign tax rather than the lower of the two; and accepting software output because it looks professional.",
      },
    ],
  },
]
