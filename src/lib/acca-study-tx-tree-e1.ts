import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX-UK · Area E, first part — the corporation tax computation and the liability.
 * Chapters 21–22.
 *
 * ── The two figures a company computation turns on ───────────────
 * TAXABLE TOTAL PROFITS is what gets taxed. AUGMENTED PROFITS is what decides the RATE and
 * the payment method. They are different numbers — augmented profits adds non-group
 * dividends that are themselves exempt — and using one where the other belongs is the
 * commonest error in Area E. Chapter 21 builds TTP, chapter 22 uses augmented profits.
 *
 * ── FA2025 rates, all on the exam's rate sheet ───────────────────
 * Small profits rate 19% up to £50,000, main rate 25% above £250,000, marginal relief
 * between, standard fraction 3/200. Identical for FY2023, FY2024 and FY2025, which is a
 * relief: a period straddling 1 April needs no apportionment between rates.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

/* ── Chapter 21 · E1–E2 ───────────────────────────────────────── */

export const TX_TREE_21: StudyChapter = {
  id: "TX-21",
  number: 21,
  paper: "TX",
  area: "E",
  title: "Corporation tax: computing taxable total profits",
  minutes: 19,
  syllabusRefs: ["E1(a)", "E1(b)", "E1(c)", "E2(a)", "E2(b)", "E2(c)"],
  intro:
    "One computation gathers a company's income and its gains together. Most of the components are already familiar — the differences from an individual are what the marks are for.",
  outcomes: [
    "Define an accounting period and state when one begins and ends",
    "Explain how a company's residence is determined",
    "Compute taxable total profits from all sources",
    "Explain the treatment of qualifying charitable donations and dividends received",
    "Identify the differences from an individual's computation",
  ],
  sections: [
    {
      id: "the-proforma",
      heading: "The computation, and where it differs from an individual's",
      blocks: [
        {
          kind: "formula",
          name: "Taxable total profits",
          expr: "                                                              £\nTax adjusted TRADING PROFIT                                   X\nPROPERTY business income                                      X\nNON-TRADING LOAN RELATIONSHIP income (interest receivable)     X\nNet CHARGEABLE GAINS                                          X\n                                                          ─────\nTOTAL PROFITS                                                 X\nLess QUALIFYING CHARITABLE DONATIONS                        (X)\n                                                          ─────\nTAXABLE TOTAL PROFITS (TTP)                                   X\n                                                          ─────\n\nDIVIDENDS RECEIVED are NOT included — they are exempt. But they are\nadded to TTP to give AUGMENTED PROFITS, which decides the RATE\n(chapter 22).",
          note: "There is no personal allowance, no separate savings or dividend column and no nil rate bands: a company has one pot of profits taxed at one rate. That is why a company computation is shorter than an individual's despite covering more sources.",
        },
        {
          kind: "table",
          caption: "The differences from an individual that earn marks",
          head: ["", "Individual", "Company"],
          rows: [
            ["**Capital gains**", "Capital gains tax, with an annual exempt amount and 18%/24% rates", "Included in **TTP** and taxed at the **corporation tax** rate. **No** annual exempt amount"],
            ["**Charitable donations**", "Gift aid: paid **net**, extends the basic rate band", "**QCDs**: paid **GROSS** and **deducted** from total profits"],
            ["**Interest received**", "Savings income, with a nil rate band", "**Non-trading loan relationship** credit, taxed in full"],
            ["**Dividends received**", "Taxable, with a £500 nil rate band", "**Exempt** — but counted in augmented profits for the rate"],
            ["**Interest on late tax**", "Not deductible", "A **loan relationship debit**, so effectively deductible"],
            ["**Property income basis**", "**Cash** basis by default", "**Accruals** basis"],
            ["**Capital allowances**", "AIA up to £1m; no full expensing", "AIA plus **full expensing** at 100% and a **50%** special rate FYA"],
            ["**Period**", "Tax year, 6 April to 5 April", "**Accounting period**, which cannot exceed 12 months"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Accounting periods and residence",
          md: "An **accounting period** begins when a company starts to trade, or when it acquires a source of income, or immediately after a previous period ends. It ends on the earlier of **12 months** from its start, the end of the **period of account**, the company **ceasing** to trade, or the company entering **liquidation**.\n\nSo an accounting period **can never exceed 12 months**. A period of account of, say, 18 months is therefore split into a 12-month accounting period and a 6-month one, and each is taxed separately with its own limits time-apportioned. That splitting is a favourite exam requirement.\n\nA company is **UK resident** if it is **incorporated** in the UK, or if it is incorporated abroad but **centrally managed and controlled** from the UK. A UK resident company is chargeable on its **worldwide** profits.",
        },
        {
          kind: "example",
          title: "Building taxable total profits and augmented profits",
          scenario:
            "For its accounting period to 31 March 2026 Westmorland Ltd records: tax adjusted trading profit £420,000; property business income £36,000; bank interest receivable £14,000; a chargeable gain of £58,000; qualifying charitable donations paid of £10,000; and dividends of £25,000 received from a company in which it holds 10%.",
          steps: [
            { label: "Total the profits from all sources", detail: "£420,000 + £36,000 + £14,000 + £58,000 = £528,000. The chargeable gain goes into the same computation as the income — a company pays no capital gains tax." },
            { label: "Exclude the dividends", detail: "The £25,000 of dividends is EXEMPT and does not enter total profits. This is the single biggest structural difference from an individual's computation." },
            { label: "Deduct the qualifying charitable donations", detail: "£528,000 − £10,000 = £518,000 of taxable total profits. QCDs are paid gross and deducted here — they do not extend a band as an individual's gift aid does." },
            { label: "Compute augmented profits", detail: "TTP £518,000 + non-group dividends £25,000 = £543,000. The dividends are exempt but they still count for this purpose, because augmented profits is the measure that decides the RATE and whether the company pays by instalments." },
            { label: "Note which figure does which job", detail: "£518,000 is what gets taxed. £543,000 decides at what rate, and whether the £1,500,000 instalment threshold is crossed. Confusing them is the commonest error in the area — using TTP for the rate test would understate the rate where dividends are significant." },
            { label: "Note what would change if the dividends were from a group company", detail: "Dividends from a company in the same 51% group are excluded from augmented profits as well as from TTP, so augmented profits would remain £518,000. The 10% holding here is not a group holding, so they count." },
          ],
          result:
            "**Taxable total profits £518,000; augmented profits £543,000.** The two figures do different jobs and the £25,000 difference between them is exempt dividend income that nonetheless affects the rate.",
        },
      ],
      check: {
        q: "How are dividends received by a company treated?",
        options: [
          "Included in taxable total profits and taxed at the corporation tax rate",
          "Exempt and excluded from TTP, but added to TTP to give augmented profits for the rate test",
          "Taxed at 8.75%",
          "Deducted from total profits like a charitable donation",
        ],
        correct: 1,
        explain:
          "EXEMPT, BUT COUNTED FOR THE RATE. Dividends do not enter taxable total profits, so they are never taxed in the recipient company. But non-group dividends are added to TTP to give AUGMENTED PROFITS, which determines the rate of tax and whether quarterly instalments apply.",
      },
    },
    {
      id: "components",
      heading: "The components, and pre-trading expenditure",
      blocks: [
        {
          kind: "list",
          title: "Each source, and what differs from the individual's version",
          items: [
            "**Trading profit** — adjusted exactly as for a sole trader (chapter 10), with two differences: there are no owner's drawings or private-use adjustments to make, and **interest** on a trading loan goes through the **loan relationship** rules rather than being a simple trading expense.",
            "**Property income** — computed on the **ACCRUALS** basis, not the cash basis that applies to individuals. And there is no residential finance cost restriction: a company deducts its interest in full, through the loan relationship rules.",
            "**Non-trading loan relationships** — interest receivable on bank deposits and loans made, and interest payable on non-trade borrowing such as a loan to buy an investment property. Net the debits against the credits; a net debit is relieved like a loss.",
            "**Chargeable gains** — computed as in chapter 23, with indexation allowance and no annual exempt amount, then included net of current year capital losses.",
            "**Qualifying charitable donations** — all charitable donations by a company other than those allowable as a trading expense. Paid **gross** and deducted from total profits, so they give relief at the company's marginal rate.",
            "**Pre-trading expenditure** — expenditure in the **7 years** before trading begins is treated as incurred on the **first day of trading**, provided it would have been allowable had the trade already started.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Two traps in the QCD line",
          md: "**QCDs cannot create or increase a loss.** They are deducted from total profits, and if total profits are insufficient the excess is simply **wasted** — it cannot be carried forward, carried back or surrendered. So a loss claim that reduces total profits to nil also wastes that period's QCDs, which is a real cost to weigh when choosing a loss relief (chapter 24).\n\n**A donation allowable as a trading expense is not a QCD.** Small local donations with a trade benefit are deducted in arriving at the trading profit; everything else goes in the QCD line. Deducting the same donation twice is the error this distinction prevents.",
        },
      ],
      check: {
        q: "A company's total profits are £8,000 and its qualifying charitable donations are £14,000. What is the position?",
        options: [
          "TTP is a loss of £6,000, which can be carried forward",
          "TTP is nil and £6,000 of QCDs is wasted — QCDs cannot create or increase a loss",
          "The QCDs are carried forward to the next period",
          "The QCDs are restricted to 25% of profits",
        ],
        correct: 1,
        explain:
          "NIL TTP AND £6,000 WASTED. QCDs cannot create or increase a loss, and any excess over total profits is lost entirely — it cannot be carried forward, carried back or group relieved. That waste is a genuine cost to weigh when choosing between loss reliefs.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Including dividends received in taxable total profits.",
      fix: "They are exempt. Add them to TTP only to arrive at augmented profits for the rate test.",
    },
    {
      trap: "Treating a company's charitable donation like an individual's gift aid.",
      fix: "QCDs are paid gross and deducted from total profits; they do not extend a band.",
    },
    {
      trap: "Computing a company's property income on the cash basis.",
      fix: "A company uses the accruals basis, and deducts its finance costs in full.",
    },
    {
      trap: "Carrying forward excess QCDs.",
      fix: "They are wasted. They cannot create or increase a loss.",
    },
    {
      trap: "Allowing an accounting period longer than 12 months.",
      fix: "Split a longer period of account into a 12-month period and the balance, each with limits apportioned.",
    },
  ],
  keyTerms: [
    { term: "Taxable total profits", def: "Total profits from all sources including gains, less qualifying charitable donations." },
    { term: "Augmented profits", def: "TTP plus non-group dividends received; the measure that decides the rate and the payment method." },
    { term: "Qualifying charitable donation", def: "A company's charitable donation paid gross and deducted from total profits; cannot create a loss." },
    { term: "Non-trading loan relationship", def: "Interest receivable and non-trade interest payable, netted and included in total profits." },
    { term: "Accounting period", def: "The period charged to corporation tax; it can never exceed 12 months." },
  ],
  summary: [
    "TTP is trading profit, property income, non-trading interest and net gains, less QCDs.",
    "Dividends received are exempt but are added to TTP to give augmented profits for the rate test.",
    "A company has no personal allowance, no nil rate bands and no annual exempt amount.",
    "QCDs are paid gross, deducted from total profits, and wasted if profits are insufficient.",
    "An accounting period can never exceed 12 months, so a longer period of account is split.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the difference between taxable total profits and augmented profits?", a: "TTP is what is taxed; augmented profits is TTP plus non-group dividends and decides the rate and whether instalments apply." },
    { q: "How does a company's charitable donation differ from an individual's?", a: "A company pays it gross and deducts it from total profits; an individual pays net under gift aid and extends the basic rate band." },
    { q: "On what basis is a company's property income computed?", a: "The accruals basis, unlike an individual's cash basis, and with finance costs deductible in full." },
    { q: "What happens to QCDs that exceed total profits?", a: "They are wasted — they cannot create a loss, be carried forward or back, or be surrendered as group relief." },
    { q: "How is pre-trading expenditure treated?", a: "Expenditure in the seven years before trading begins is treated as incurred on the first day of trading, if it would otherwise have been allowable." },
  ],
}

/* ── Chapter 22 · E4 ──────────────────────────────────────────── */

export const TX_TREE_22: StudyChapter = {
  id: "TX-22",
  number: 22,
  paper: "TX",
  area: "E",
  title: "Corporation tax: the liability and marginal relief",
  minutes: 18,
  syllabusRefs: ["E4(a)", "E1(d)"],
  intro:
    "Three rates, one formula and one thing to count: how many companies are associated. That count moves the thresholds and can cost real tax.",
  outcomes: [
    "Apply the small profits rate, the main rate and marginal relief",
    "Compute marginal relief using the standard fraction",
    "Identify associated companies and adjust the limits",
    "Adjust the limits for a short accounting period",
    "Compute the liability for a period straddling a financial year",
  ],
  sections: [
    {
      id: "rates-and-relief",
      heading: "The rates, and the marginal relief formula",
      blocks: [
        {
          kind: "formula",
          name: "The corporation tax liability",
          expr: "Test AUGMENTED PROFITS against the limits:\n\n   Augmented profits ≤ £50,000            →  SMALL PROFITS RATE 19%\n   Augmented profits ≥ £250,000           →  MAIN RATE 25%\n   Between the two                        →  MAIN RATE less MARGINAL RELIEF\n\nLIABILITY  =  TTP × 25%   −   marginal relief\n\n                                                       TTP\n   MARGINAL RELIEF  =  (£250,000 − A)  ×  3/200  ×  ─────\n                                                        A\n\n   where  A  =  AUGMENTED PROFITS\n\nNote the tax is charged on TTP but the LIMITS are tested on AUGMENTED\nPROFITS, and the fraction TTP/A brings the two back into line.\n\nThe rates and limits are IDENTICAL for FY2023, FY2024 and FY2025, so a\nperiod straddling 1 April needs no apportionment between financial years.",
          note: "Where the company has no dividends, TTP equals augmented profits and the TTP/A fraction is 1, so it can be ignored. The fraction only does work where dividends are received — and then it reduces the relief, because part of the augmented profits is exempt income that should not attract relief.",
        },
        {
          kind: "example",
          title: "Marginal relief with dividends",
          scenario:
            "Grasmere Ltd's taxable total profits come to £180,000 for its accounting period to 31 March 2026, and it received £20,000 of dividends from a company in which it holds 6%. It has no associated companies.",
          steps: [
            { label: "Compute augmented profits and test the limits", detail: "£180,000 + £20,000 = £200,000. That falls between £50,000 and £250,000, so the main rate applies with marginal relief." },
            { label: "Compute tax at the main rate", detail: "The tax is charged on TTP, not augmented profits: £180,000 × 25% = £45,000." },
            { label: "Compute marginal relief", detail: "(£250,000 − £200,000) × 3/200 × £180,000/£200,000 = £50,000 × 0.015 × 0.9 = £675." },
            { label: "Compute the liability", detail: "£45,000 − £675 = £44,325, giving an effective rate of £44,325/£180,000 = 24.63%." },
            { label: "See what the dividends cost", detail: "Without the dividends, augmented profits would equal TTP at £180,000, and marginal relief would be (£250,000 − £180,000) × 3/200 × 1 = £1,050, giving a liability of £43,950. So receiving £20,000 of EXEMPT dividends has increased the corporation tax by £375 — because it pushed augmented profits up and cut the relief." },
            { label: "Note the general shape", detail: "Marginal relief tapers the benefit of the 19% rate away between £50,000 and £250,000. At exactly £50,000 the effective rate is 19%; at £250,000 it is 25%; in between it rises smoothly. That is why the effective rate here, 24.63%, sits just below 25% — £200,000 is near the top of the band." },
          ],
          result:
            "**Corporation tax £44,325.** The point worth stating is that exempt dividend income can still increase the liability, because it raises augmented profits and so reduces marginal relief.",
        },
      ],
      check: {
        q: "A company has TTP of £180,000 and augmented profits of £200,000. What is the marginal relief?",
        options: [
          "£1,050 — (£250,000 − £180,000) × 3/200",
          "£675 — (£250,000 − £200,000) × 3/200 × £180,000/£200,000",
          "£750",
          "Nil — the main rate applies without relief",
        ],
        correct: 1,
        explain:
          "£675. The bracket uses AUGMENTED profits, so (£250,000 − £200,000), and the TTP/A fraction of 0.9 scales the relief down because part of the augmented profits is exempt dividend income. Using TTP in the bracket would give £1,050 and overstate the relief.",
      },
    },
    {
      id: "associates-and-periods",
      heading: "Associated companies and short periods",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Divide the limits by the number of associated companies",
          md: "Both the £50,000 and £250,000 limits are **divided by the number of associated companies, including the company itself**. So a company with two associates tests its augmented profits against £16,667 and £83,333 rather than £50,000 and £250,000.\n\nA company is **associated** where one controls the other, or both are under common control — broadly a **51%** relationship. **Dormant** companies are ignored, and so are companies that are merely held as passive investments rather than controlled.\n\nThe effect can be substantial. A company with £180,000 of augmented profits and no associates pays £43,950; with **one** associate the limits halve to £25,000 and £125,000, augmented profits exceed the upper limit, and the full 25% applies — £45,000, so the associate costs £1,050. With enough associates a modest company pays the full main rate.",
        },
        {
          kind: "formula",
          name: "Short accounting periods",
          expr: "Where the accounting period is LESS than 12 months, TIME APPORTION\nboth limits:\n\n   Adjusted limit  =  limit  ×  months in the period / 12\n\nSo for a 9-month period with no associates:\n   lower limit  =  £50,000  × 9/12  =  £37,500\n   upper limit  =  £250,000 × 9/12  =  £187,500\n\nApply BOTH adjustments where they both bite: divide by the number of\nassociated companies AND time-apportion.\n\nThe rates themselves are NEVER apportioned — only the limits.",
          note: "Two adjustments, applied together, in either order. A 6-month period with one associate tests against £50,000 × ½ × 6/12 = £12,500 and £250,000 × ½ × 6/12 = £62,500. Note that a period of account longer than 12 months is split rather than apportioned: the first 12 months is one accounting period and the balance another.",
        },
        {
          kind: "example",
          title: "A long period of account, split",
          scenario:
            "Rydal Ltd prepares accounts for the 18 months ended 30 September 2026. Its tax adjusted trading profit for the whole period is £270,000, accruing evenly, and it received bank interest of £12,000 which accrued evenly. It sold an investment property on 20 August 2026, realising a chargeable gain of £40,000. It has one associated company.",
          steps: [
            { label: "Split the period of account", detail: "An accounting period cannot exceed 12 months, so there are two: the 12 months to 31 March 2026 and the 6 months to 30 September 2026." },
            { label: "Allocate the trading profit", detail: "It accrues evenly, so time-apportion: £270,000 × 12/18 = £180,000 to the first period and £270,000 × 6/18 = £90,000 to the second." },
            { label: "Allocate the interest", detail: "Also accruing evenly: £12,000 × 12/18 = £8,000 and £12,000 × 6/18 = £4,000." },
            { label: "Allocate the chargeable gain", detail: "A gain is allocated to the period in which the DISPOSAL occurred, not apportioned. The sale was on 20 August 2026, so the whole £40,000 falls in the second period. This is the step candidates most often get wrong." },
            { label: "Compute TTP for each period", detail: "First period: £180,000 + £8,000 = £188,000. Second period: £90,000 + £4,000 + £40,000 = £134,000." },
            { label: "Adjust the limits for each period", detail: "One associate, so divide by 2. First period, 12 months: £25,000 and £125,000. Second period, 6 months: £25,000 × 6/12 = £12,500 and £125,000 × 6/12 = £62,500." },
            { label: "Compute each liability", detail: "First period: £188,000 exceeds £125,000, so the main rate applies with no relief — £188,000 × 25% = £47,000. Second period: £134,000 exceeds £62,500, so again the main rate — £134,000 × 25% = £33,500. Total £80,500." },
          ],
          result:
            "**Two accounting periods, TTP of £188,000 and £134,000, and corporation tax of £47,000 and £33,500.** The two things that decide the answer are allocating the gain to the period of disposal rather than apportioning it, and halving the limits for the associate before time-apportioning the short period.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Why the associated company count is worth checking carefully",
          md: "It is the cheapest mark in Area E and the easiest to miss. A scenario mentioning a subsidiary, a fellow subsidiary, or a company under the same shareholder's control is telling you to divide the limits — and a scenario mentioning a **dormant** company or a small passive shareholding is telling you **not** to.\n\nCount the company itself. Two associates plus the company means dividing by **three**, not two. And note that **overseas** associated companies count too, even though they are not themselves within the UK charge.\n\nThe same 51% relationship also drives the **£1,500,000 quarterly instalment threshold** (chapter 3), so the count you make here does double duty.",
        },
      ],
      check: {
        q: "A company with one associate has a 6-month accounting period. What are its adjusted limits?",
        options: [
          "£50,000 and £250,000, unchanged",
          "£12,500 and £62,500 — halved for the associate, then halved again for the 6-month period",
          "£25,000 and £125,000",
          "£8,333 and £41,667",
        ],
        correct: 1,
        explain:
          "£12,500 AND £62,500. Both adjustments apply together: divide by two associated companies including itself, giving £25,000 and £125,000, then time-apportion by 6/12. The rates themselves are never apportioned — only the limits.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Testing the limits against TTP rather than augmented profits.",
      fix: "Augmented profits decides the rate; TTP is what gets taxed.",
    },
    {
      trap: "Using TTP in the marginal relief bracket.",
      fix: "The bracket is (£250,000 − augmented profits); TTP appears only in the TTP/A fraction.",
    },
    {
      trap: "Forgetting to count the company itself among the associates.",
      fix: "Two associates plus the company means dividing the limits by three.",
    },
    {
      trap: "Apportioning a chargeable gain across a split long period.",
      fix: "A gain falls entirely in the accounting period containing the disposal.",
    },
    {
      trap: "Time-apportioning the rates for a short period.",
      fix: "Only the limits are apportioned; the rates are unchanged.",
    },
  ],
  keyTerms: [
    { term: "Small profits rate", def: "19%, where augmented profits do not exceed the lower limit." },
    { term: "Main rate", def: "25%, where augmented profits reach or exceed the upper limit." },
    { term: "Marginal relief", def: "(Upper limit − augmented profits) × 3/200 × TTP/augmented profits." },
    { term: "Associated company", def: "A company under common control, broadly a 51% relationship; dormant companies are ignored." },
    { term: "Standard fraction", def: "3/200, used in the marginal relief formula for FY2023 to FY2025." },
  ],
  summary: [
    "19% up to £50,000 of augmented profits, 25% from £250,000, with marginal relief between.",
    "Marginal relief is (£250,000 − A) × 3/200 × TTP/A, where A is augmented profits.",
    "Divide both limits by the number of associated companies including the company itself.",
    "Time-apportion both limits for a short accounting period, but never the rates.",
    "Split a period of account over 12 months into two accounting periods, allocating a gain to the period of disposal.",
  ],
  knowledgeDiagnostic: [
    { q: "Which figure is tested against the £50,000 and £250,000 limits?", a: "Augmented profits — taxable total profits plus non-group dividends received." },
    { q: "Write out the marginal relief formula.", a: "(Upper limit less augmented profits) multiplied by 3/200, multiplied by TTP divided by augmented profits." },
    { q: "How do associated companies affect the computation?", a: "Both limits are divided by the number of associated companies including the company itself; dormant companies are ignored." },
    { q: "How is a gain allocated where an 18-month period of account is split?", a: "Entirely to the accounting period in which the disposal occurred; it is not time-apportioned." },
    { q: "Why can exempt dividend income increase a company's tax?", a: "Because it raises augmented profits, which reduces marginal relief even though the dividends themselves are never taxed." },
  ],
}

export const TX_TREE_AREA_E_PART1: StudyChapter[] = [TX_TREE_21, TX_TREE_22]
