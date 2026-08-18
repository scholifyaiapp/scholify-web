import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX-GLOBAL · Area C — capital gains and disposals. Chapters 9–11.
 *
 * A capital gains tax is a jurisdiction's answer to an awkward question: an asset that
 * doubles in value has plainly made its owner richer, but no income has arisen. Charging
 * that enrichment requires deciding WHEN it crystallises, HOW to measure it, and WHICH
 * disposals should escape — and those three decisions are what these chapters teach.
 *
 * Jurisdiction-neutral: whether gains are taxed at all, at what rate, with what annual
 * exemption and with which reliefs, differs completely between countries. The mechanics of
 * a disposal, a part disposal, a share pool and a deferral relief do not.
 */

/* ── Chapter 9 ─────────────────────────────────────────────────── */

export const TXG_TREE_09: StudyChapter = {
  id: "TXG-09",
  number: 9,
  paper: "TX",
  area: "C",
  title: "The scope of a capital gains tax: chargeable persons, assets and disposals",
  minutes: 18,
  intro:
    "Three conditions must be met before a gain can be taxed at all: a chargeable person, a chargeable asset, and a chargeable disposal. Most exemptions work by removing one of the three, which makes this the fastest way to read a scenario.",
  outcomes: [
    "State the three conditions for a charge to arise on a gain",
    "Distinguish a capital gain from trading income and explain why the line matters",
    "Identify disposals that are exempt or treated as no gain and no loss",
    "Explain the timing rule for a disposal and why it differs from the payment date",
    "Explain why gifts and disposals between connected persons use market value",
  ],
  sections: [
    {
      id: "the-three-conditions",
      heading: "Person, asset, disposal — and the line against trading",
      blocks: [
        {
          kind: "text",
          md: "This is a **jurisdiction-neutral foundation track, not an ACCA exam variant**. Some jurisdictions do not tax capital gains at all; others fold them into income tax; others run a separate charge with its own rates and exemptions. What follows is the structure common to systems that do charge them.\n\nA gain is taxable only where **all three** of the following are present. Remove any one and there is no charge — which is exactly how most exemptions are built.",
        },
        {
          kind: "table",
          caption: "The three conditions, and how exemptions attack each one",
          head: ["Condition", "What it requires", "How a jurisdiction creates an exemption"],
          rows: [
            ["**A chargeable person**", "An individual, a company or a trustee within the charge", "Exempt bodies — charities, pension funds, sometimes non-residents on non-local assets"],
            ["**A chargeable asset**", "Property of any description unless excluded", "Excluding classes: the main home, cars, government securities, small personal items, wasting assets"],
            ["**A chargeable disposal**", "A sale, gift, exchange, loss or destruction — a transfer of ownership", "Treating a transfer as NO GAIN AND NO LOSS, typically between spouses, or on death"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The capital-versus-trading line, which decides which tax applies at all",
          md: "Buy a building, hold it for ten years and sell it: capital. Buy six buildings, refurbish and sell them within a year: that looks like a trade, and the profit is trading income taxed under Chapter 7's rules instead.\n\nThe distinction matters because the two charges differ in almost every respect — the rate, the availability of an annual exemption, whether losses can be set against other income, and whether reliefs apply. It is decided on **badges of trade**, a set of indicators developed by the courts:\n\n**Subject matter** — an asset yielding no income or enjoyment is more likely bought to resell. **Frequency** — repeated similar transactions look like a business. **Length of ownership** — a quick turnaround suggests trading. **Work done on the asset** — improving it to make it saleable suggests trading. **Circumstances of the sale** — a forced sale to raise cash suggests investment; a planned marketing campaign suggests trade. **Motive** — an intention to resell at a profit from the outset points to trading, though a stated intention is weak evidence against the facts.\n\nAs with employment status in Chapter 6, no single badge decides it. The question is the overall picture.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The timing rule catches people out every time",
          md: "A disposal normally occurs on the date of the **contract**, not the date of completion or of payment. Where the contract is conditional, it is the date the condition is satisfied.\n\nTwo consequences. First, a sale contracted in one tax period and completed in the next falls in the **earlier** period — which is what makes end-of-period contract dates a planning tool and a favourite scenario detail. Second, the tax is due under the ordinary payment rules for that period, which may be long before or, for some assets, shortly after the money arrives. A number of jurisdictions now require accelerated reporting and payment for disposals of residential property specifically, precisely because the ordinary cycle let large gains sit unpaid.",
        },
        {
          kind: "example",
          title: "Applying the three conditions and the badges of trade",
          scenario:
            "In Jurisdiction Z, gains are chargeable on residents; the main home, private cars and assets worth under CU 6,000 are exempt; transfers between spouses are no gain and no loss. During the year Ines: sold her main home for a gain of CU 200,000; sold a painting for CU 4,500 that cost CU 1,000; transferred shares worth CU 30,000, which cost her CU 12,000, to her husband; sold her car at a gain of CU 2,000; and, having bought four apartments off-plan, refurbished and sold all four within eight months for a total profit of CU 150,000.",
          steps: [
            { label: "The main home", detail: "A chargeable person and a disposal, but not a chargeable ASSET — the main home is excluded. No charge on the CU 200,000." },
            { label: "The painting", detail: "Chargeable person and disposal, and a painting is a chargeable asset in principle. But the proceeds of CU 4,500 are below the CU 6,000 threshold, so the exemption removes it. The gain of CU 3,500 is not charged." },
            { label: "The shares to her husband", detail: "A chargeable person and a chargeable asset, and a transfer of ownership has occurred — so there IS a disposal. But it is treated as NO GAIN AND NO LOSS, so no gain arises now. Her husband takes over her CU 12,000 cost, and the CU 18,000 of growth is charged on him when he eventually sells." },
            { label: "The car", detail: "Private cars are an excluded asset in most systems, on the sensible ground that they nearly always fall in value and allowing the losses would cost the exchequer far more than charging the rare gains. No charge." },
            { label: "The apartments — test the badges", detail: "Four similar transactions (frequency), held eight months (short ownership), refurbished before sale (work done to make them saleable), and bought off-plan with no personal use (subject matter and motive). Every badge points the same way." },
            { label: "Characterise the apartments correctly", detail: "This is a TRADE, not an investment. The CU 150,000 is trading income under Chapter 7, adjusted for allowable expenses, and is charged at income tax rates with social contributions potentially due — not as a capital gain with an annual exemption." },
          ],
          result:
            "**No capital gains arise at all; CU 150,000 is taxable as trading profit.** The instructive point is the last one: candidates who compute a careful gains position on the apartments have answered the wrong question, and no amount of accuracy afterwards recovers it. Test the badges BEFORE reaching for the gains computation.",
        },
      ],
      check: {
        q: "An individual transfers shares to their spouse under a no gain, no loss rule. What happens to the growth in value up to that date?",
        options: [
          "It is exempt permanently",
          "It is charged on the transferor at the date of transfer",
          "It passes to the spouse with the original cost, and is charged on them when they sell",
          "It is charged at half rate on each spouse",
        ],
        correct: 2,
        explain:
          "THE GAIN IS DEFERRED, NOT FORGIVEN. No gain arises on the transfer, but the recipient inherits the original base cost rather than the market value. All the growth from the transferor's original purchase is therefore charged on the spouse when they eventually dispose of the asset.",
      },
    },
    {
      id: "connected-persons-and-market-value",
      heading: "Gifts, connected persons and the market value rule",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "Why a gift can produce a tax bill with no cash to pay it",
          md: "If gifts were computed on actual consideration, a gains tax would collapse: everybody would give assets away rather than sell them, and a lifetime of growth would escape. So a disposal for **no consideration, or for less than market value between connected persons, is deemed to take place at market value**.\n\nThe consequence is uncomfortable and is exactly what scenarios test. A parent gifting an asset that has quadrupled in value makes a taxable gain on the whole increase and receives nothing with which to pay the tax. That is precisely why deferral reliefs exist — gift or holdover relief in Chapter 11 — allowing the gain to pass to the recipient with the asset instead of being charged immediately.\n\n**Connected persons** typically include close relatives, a spouse or partner, business partners, and companies under common control. Note the deliberate asymmetry in most systems: a **loss** arising on a disposal to a connected person can usually be set only against gains on disposals to that same person, which stops families manufacturing losses by shuffling assets between themselves.",
        },
        {
          kind: "formula",
          name: "Consideration — what actually goes into the computation",
          expr: "USE ACTUAL PROCEEDS where the disposal is:\n     a bargain at arm's length between unconnected parties\n\nUSE MARKET VALUE where the disposal is:\n     a gift, or at undervalue\n     between CONNECTED persons, whatever was actually paid\n     not at arm's length for any other reason\n     a distribution in specie, or a transfer out of a trust\n\nOn a LOSS or DESTRUCTION of an asset:\n     the disposal proceeds are any INSURANCE or COMPENSATION received,\n     and nil if none is received\n\nFrom the consideration, deduct INCIDENTAL COSTS OF DISPOSAL\n     (agent's commission, legal fees, advertising) --\n     they reduce the gain because they were never the owner's to keep.",
          note: "The market value rule is about the RELATIONSHIP and the BARGAIN, not about whether money changed hands. A sale at full market value to a connected person still uses market value — it just happens to be the same figure. And a sale at an undervalue to an unconnected person for genuine commercial reasons normally uses the actual price, because a bad bargain freely struck is still a bargain at arm's length.",
        },
        {
          kind: "list",
          title: "Disposals that commonly fall outside the charge",
          items: [
            "**Transfers between spouses or civil partners** — no gain, no loss, with the original cost passing to the recipient. It treats the couple as a single economic unit and is the basis of most simple gains planning.",
            "**Transfers on death** — in many systems the estate acquires assets at market value at death with no charge on the deceased's lifetime growth, on the ground that a wealth or inheritance tax is charging the same event. That uplift is a substantial relief and shapes a great deal of behaviour.",
            "**Gifts to charity** — no gain arises, since charging one would simply reduce what the charity receives.",
            "**Excluded assets** — the main home, private cars, small personal items below a stated threshold, certain government securities, and wasting assets with a short predictable life.",
            "**Transfers that are reorganisations rather than disposals** — exchanging shares for new shares in a takeover, where the new holding steps into the shoes of the old and no economic exit has occurred.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Exempt asset means exempt loss too, and candidates forget the second half",
          md: "An exclusion works in both directions. If gains on private cars are outside the charge, then **losses on private cars are not allowable either** — which matters, because cars nearly always fall in value.\n\nThat symmetry is usually the point of the exemption rather than an accident of it. Bringing cars into the charge would produce allowable losses for almost every household and taxable gains for almost none, so the exchequer excludes the class entirely. The same reasoning applies to small personal items and to the main home, where the number of properties sold at a loss in a falling market would be very large.\n\nSo when a scenario hands you a loss on an exempt asset, the answer is not to compute it — it is to say that it is not allowable, and why.",
        },
      ],
      check: {
        q: "A father sells an asset worth CU 100,000 to his daughter for CU 60,000. What consideration enters his gains computation?",
        options: [
          "CU 60,000, the amount actually received",
          "CU 100,000, because a transaction between connected persons uses market value",
          "CU 80,000, the average of the two",
          "Nil, because part of the transfer was a gift",
        ],
        correct: 1,
        explain:
          "CONNECTED PERSONS USE MARKET VALUE, WHATEVER WAS PAID. The full CU 100,000 is substituted for the CU 60,000 actually received, so the father is taxed on the whole gain to market value even though he received only part of it. This is the situation gift and holdover reliefs exist to address.",
      },
    },
  ],
  examTraps: [
    { trap: "Computing a gain on a series of quick, worked-on resales.", fix: "Test the badges of trade first. Frequency, short ownership, work done and a resale motive point to a TRADE, taxed as income under a different set of rules entirely." },
    { trap: "Using the completion or payment date as the date of disposal.", fix: "It is normally the CONTRACT date, which can move a gain into an earlier period than the cash." },
    { trap: "Treating a no gain, no loss transfer as an exemption.", fix: "It defers. The recipient inherits the original cost, so the whole accumulated gain is charged on them at their eventual disposal." },
    { trap: "Claiming a loss on an exempt asset.", fix: "An exclusion works both ways. No chargeable gain means no allowable loss — which is usually the reason the class was excluded." },
    { trap: "Using actual proceeds for a gift or a sale at undervalue to a relative.", fix: "Market value is substituted for connected-person and non-arm's-length disposals, whatever sum actually changed hands." },
  ],
  keyTerms: [
    { term: "Chargeable disposal", def: "Any transfer of ownership — sale, gift, exchange, loss or destruction — capable of giving rise to a gain." },
    { term: "Badges of trade", def: "Court-developed indicators distinguishing a trading transaction from a capital investment: subject matter, frequency, ownership period, work done, circumstances of sale and motive." },
    { term: "No gain, no loss", def: "A transfer producing neither gain nor loss, with the recipient inheriting the transferor's original cost so that the gain is deferred rather than removed." },
    { term: "Connected persons", def: "Close relatives, spouses, business partners and commonly controlled companies, whose transactions are computed at market value." },
    { term: "Incidental costs of disposal", def: "Selling costs such as commission, legal fees and advertising, deducted from proceeds in computing the gain." },
    { term: "Excluded asset", def: "An asset class outside the charge entirely, so that neither gains nor losses on it are recognised." },
  ],
  summary: [
    "A charge needs all three of a chargeable person, a chargeable asset and a chargeable disposal; exemptions work by removing one of them.",
    "The badges of trade decide whether a profit is a gain or trading income, and getting that wrong invalidates everything after it.",
    "Disposal normally happens on the CONTRACT date, which can fall in an earlier period than completion or payment.",
    "Gifts and connected-person transactions are computed at MARKET VALUE, which can create tax with no cash — the reason deferral reliefs exist.",
    "No gain, no loss transfers defer the gain by passing on the original cost; they do not remove it.",
    "Excluding an asset class removes its losses as well as its gains, and that symmetry is usually the purpose.",
  ],
}

/* ── Chapter 10 ────────────────────────────────────────────────── */

export const TXG_TREE_10: StudyChapter = {
  id: "TXG-10",
  number: 10,
  paper: "TX",
  area: "C",
  title: "Computing a gain: cost, part disposals and shares",
  minutes: 18,
  intro:
    "The basic computation is proceeds less cost, and it stays that simple until the asset was bought in pieces, sold in pieces, or is one of a thousand identical shares. Those three complications are where the marks are.",
  outcomes: [
    "Compute a straightforward chargeable gain or allowable loss",
    "Distinguish enhancement expenditure from repairs and from acquisition costs",
    "Apply the part disposal formula and explain why it takes that form",
    "Apply matching rules and a pooled cost to a disposal of shares",
    "Adjust a share pool for a bonus or rights issue",
  ],
  sections: [
    {
      id: "the-basic-computation",
      heading: "The computation, and the part disposal problem",
      blocks: [
        {
          kind: "formula",
          name: "The basic gain, and what may be deducted",
          expr: "     Disposal consideration (or MARKET VALUE if not arm's length)   X\n     less  incidental costs of DISPOSAL                            (X)\n                                                                 -----\n           NET PROCEEDS                                             X\n\n     less  original ACQUISITION cost                               (X)\n     less  incidental costs of ACQUISITION\n           (legal fees, stamp duties, survey costs)                (X)\n     less  ENHANCEMENT expenditure still reflected in\n           the asset at the date of disposal                       (X)\n                                                                 -----\n           CHARGEABLE GAIN or ALLOWABLE LOSS                        X\n\nNOT deductible:  repairs and maintenance (they are revenue, and\n                 relieved against rental income if let at all)\n                 any cost already relieved elsewhere -- a cost\n                 cannot be deducted twice",
          note: "Two conditions on enhancement expenditure are regularly tested. It must be CAPITAL — improving the asset rather than maintaining it, the same line as Chapter 7 — and it must still be REFLECTED IN THE ASSET when it is sold. A conservatory built and then demolished before sale fails the second test, and so does landscaping that has since been undone. The no-double-relief rule matters too: expenditure already deducted against rental income cannot reappear in the gains computation.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The part disposal formula, and why it is built that way",
          md: "Sell half a plot of land and a problem arises immediately: how much of the original cost belongs to the half sold? The land was bought as one lot for one price, and no invoice splits it.\n\nThe answer used almost everywhere apportions cost by **relative value at the date of disposal**:\n\n**Cost apportioned to the part sold = total cost × A / (A + B)**, where **A** is the consideration for the part disposed of and **B** is the market value of the part **retained**.\n\nThe formula uses values rather than area or quantity because value is what the tax is measuring. Half a field by area may be worth ninety per cent of the whole if it holds the road frontage, and apportioning by area would then hand the seller most of the cost against a small part of the value.\n\nThe balance of the cost is not lost — it stays with the retained part and is deducted when that part is eventually sold. **B must be the value of what is RETAINED**, not the value of the whole, and putting the whole into B is the single most common error in this computation.",
        },
        {
          kind: "example",
          title: "A part disposal, with enhancement expenditure",
          scenario:
            "Otto bought twelve hectares of land in Jurisdiction Z for CU 240,000, with legal fees of CU 6,000. Four years later he spent CU 30,000 installing drainage across the whole site, and CU 8,000 repairing a boundary wall. He now sells four hectares — the part with road access — for CU 300,000, incurring agent's fees of CU 9,000. The eight hectares he keeps are valued at CU 200,000.",
          steps: [
            { label: "Identify the total deductible cost", detail: "Acquisition CU 240,000 plus incidental acquisition costs CU 6,000 plus enhancement CU 30,000 = CU 276,000. The CU 8,000 wall repair is maintenance, not enhancement, so it is excluded — it restores rather than improves." },
            { label: "Set up the apportionment", detail: "A = consideration for the part sold = CU 300,000. B = market value of the part RETAINED = CU 200,000. A + B = CU 500,000. Note that the four hectares sold are worth more than the eight retained, which is exactly why value rather than area must be used." },
            { label: "Apportion the cost", detail: "CU 276,000 × 300,000 / 500,000 = CU 276,000 × 0.6 = CU 165,600. Apportioning by area instead would have given CU 276,000 × 4/12 = CU 92,000 and overstated the gain substantially." },
            { label: "Compute the gain", detail: "Proceeds CU 300,000 less disposal costs CU 9,000 = CU 291,000 net. Less apportioned cost CU 165,600 = a chargeable gain of CU 125,400." },
            { label: "Carry the balance forward", detail: "Cost remaining with the eight hectares retained = CU 276,000 − CU 165,600 = CU 110,400. That is deducted when those hectares are eventually sold; nothing has been lost." },
          ],
          result:
            "**A chargeable gain of CU 125,400, with CU 110,400 of cost carried forward.** The two errors this scenario is designed to catch are deducting the wall repair as enhancement and apportioning by area rather than by value — each of which changes the answer materially.",
        },
      ],
      check: {
        q: "In the part disposal formula A / (A + B), what does B represent?",
        options: [
          "The market value of the whole asset before the disposal",
          "The market value of the part retained after the disposal",
          "The original cost of the part retained",
          "The incidental costs of the disposal",
        ],
        correct: 1,
        explain:
          "B IS THE VALUE OF WHAT IS RETAINED. The formula splits the original cost between the part sold and the part kept, in proportion to what each is worth at the date of disposal. Putting the value of the whole into B would make the denominator far too large and understate the cost attributed to the sale.",
      },
    },
    {
      id: "shares",
      heading: "Shares: matching rules and the pool",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "Why shares need special rules at all",
          md: "Shares of the same class in the same company are **indistinguishable**. An investor who bought 1,000 shares in three separate purchases at different prices and now sells 1,200 cannot say which ones went — there is nothing to identify.\n\nLeft alone, the taxpayer would simply nominate whichever shares produced the best answer, choosing high-cost shares to reduce a gain and low-cost shares to create a loss on demand. So every jurisdiction imposes **matching rules**: a compulsory order deciding which acquisitions a disposal is set against.\n\nThe usual order matches disposals first against acquisitions made on the **same day**, then against those in a short following window (typically thirty days), and only then against the **pool** of everything held before. The short-window rule exists specifically to defeat *bed and breakfasting* — selling to crystallise a loss or use an annual exemption and buying the identical shares straight back. Matching the sale against the repurchase means the economic position never really changed, so no gain or loss arises.",
        },
        {
          kind: "formula",
          name: "The share pool, and what each event does to it",
          expr: "The pool records TWO running totals: NUMBER of shares and TOTAL COST.\n\n     PURCHASE          add the number, add the cost paid\n     BONUS ISSUE       add the number, add NOTHING to cost\n                       (free shares -- cost per share falls)\n     RIGHTS ISSUE      add the number, add the amount SUBSCRIBED\n                       (paid for, but usually below market price)\n     SALE              remove shares, and remove cost in the\n                       same PROPORTION:\n\n         cost removed  =  pool cost  x  shares sold / shares in pool\n\nAfter a sale the pool continues with the reduced number and the\nreduced cost, ready for the next disposal.",
          note: "The distinction between a bonus and a rights issue is the one to hold. A BONUS issue is free, so total cost is unchanged and only the share count rises — every share in the pool becomes cheaper. A RIGHTS issue is paid for, so the subscription cost is added. Neither is treated as a fresh acquisition for matching purposes: both are adjustments to a holding the investor already had, which is why they go straight into the pool rather than being matched separately.",
        },
        {
          kind: "example",
          title: "Running a share pool through a bonus issue and a sale",
          scenario:
            "Priya's dealings in Corveau plc shares in Jurisdiction Z, which matches disposals against same-day acquisitions, then acquisitions in the next 30 days, then the pool: January year 1, bought 4,000 shares for CU 20,000. March year 3, bought 2,000 shares for CU 16,000. September year 4, a 1-for-3 bonus issue. June year 6, sold 3,000 shares for CU 33,000. She made no other acquisitions.",
          steps: [
            { label: "Build the pool from the purchases", detail: "January year 1: 4,000 shares, cost CU 20,000. March year 3: add 2,000 shares and CU 16,000. Pool now 6,000 shares, cost CU 36,000 — an average of CU 6.00 per share." },
            { label: "Apply the bonus issue", detail: "1-for-3 on 6,000 shares gives 2,000 free shares. Add the number, add nothing to cost. Pool now 8,000 shares, cost still CU 36,000 — an average of CU 4.50 per share. The holding is not richer; the same cost is simply spread over more shares." },
            { label: "Match the disposal", detail: "No acquisitions on the day of sale and none in the following 30 days, so all 3,000 shares are matched against the pool." },
            { label: "Remove cost in proportion", detail: "Cost removed = CU 36,000 × 3,000 / 8,000 = CU 13,500." },
            { label: "Compute the gain", detail: "Proceeds CU 33,000 less cost CU 13,500 = a chargeable gain of CU 19,500." },
            { label: "Carry the pool forward", detail: "5,000 shares remain, at a cost of CU 36,000 − CU 13,500 = CU 22,500. That is the pool the next disposal will be matched against." },
          ],
          result:
            "**A chargeable gain of CU 19,500, with 5,000 shares and CU 22,500 of cost carried forward.** The bonus issue is the step that decides the answer: adding shares without adding cost dilutes the cost per share, so ignoring it would have removed CU 18,000 of cost instead of CU 13,500 and understated the gain by CU 4,500.",
        },
        {
          kind: "list",
          title: "Reorganisations and takeovers — when a share disposal is not a disposal",
          items: [
            "**Share-for-share exchange.** Where a shareholder receives new shares in the acquiring company in exchange for their old ones, there is normally NO disposal. The new holding steps into the shoes of the old, inheriting its cost and its acquisition date, because the investor has not cashed out — only the wrapper changed.",
            "**Cash received on a takeover.** Cash IS an exit, so the cash element is a part disposal computed on the formula from the first half of this chapter, with the value of the new shares acting as the retained part.",
            "**Mixed consideration.** Where shares and cash are both received, split them: the share element rolls over, the cash element is charged now. Scenarios use this deliberately because it tests both halves of the chapter at once.",
            "**Different classes issued.** Where a reorganisation produces more than one new class, the original pooled cost is apportioned between them by relative market value — the same principle as a part disposal, applied to the cost rather than to the asset.",
          ],
        },
      ],
      check: {
        q: "A shareholder receives a 1-for-4 bonus issue. What happens to the share pool?",
        options: [
          "Both the number of shares and the total cost increase",
          "The number of shares increases and the total cost is unchanged, so cost per share falls",
          "The pool is unaffected until the bonus shares are sold",
          "The bonus shares form a separate pool with a nil cost",
        ],
        correct: 1,
        explain:
          "FREE SHARES ADD NUMBER BUT NO COST. The shareholder paid nothing, so total pool cost is unchanged while the share count rises — diluting cost per share across the whole holding. They are not a separate acquisition, because the shareholder simply holds more units representing the same investment.",
      },
    },
  ],
  examTraps: [
    { trap: "Deducting repairs as enhancement expenditure.", fix: "Enhancement must be CAPITAL and must still be reflected in the asset at disposal. Maintenance is neither, and improvements since removed fail the second test." },
    { trap: "Using B as the value of the whole asset in the part disposal formula.", fix: "B is the market value of the part RETAINED. Using the whole inflates the denominator and understates the cost deducted." },
    { trap: "Apportioning cost by area, weight or number of units.", fix: "Apportion by VALUE at the date of disposal, because value is what the tax measures and parts of an asset are rarely equally valuable." },
    { trap: "Treating a bonus issue as adding cost to the pool.", fix: "Bonus shares are free: number rises, cost does not. Only a RIGHTS issue adds the amount actually subscribed." },
    { trap: "Ignoring the short matching window after a sale.", fix: "Disposals match against acquisitions in the following days before the pool, which defeats selling and immediately repurchasing to manufacture a loss." },
  ],
  keyTerms: [
    { term: "Enhancement expenditure", def: "Capital spending that improves an asset and is still reflected in it at disposal. Deductible in the gain, unlike repairs." },
    { term: "Part disposal", def: "A disposal of part of an asset, where cost is apportioned as A / (A + B) — consideration for the part sold over that plus the market value of the part retained." },
    { term: "Matching rules", def: "The compulsory order in which a disposal of shares is set against acquisitions, preventing the taxpayer from choosing the most favourable cost." },
    { term: "Share pool", def: "A running record of the number and total cost of shares of one class in one company, from which cost is removed proportionately on a sale." },
    { term: "Bonus issue", def: "Free additional shares issued to existing holders. Increases the pool's share count without increasing its cost." },
    { term: "Rights issue", def: "Additional shares offered to existing holders for subscription, usually below market price. Adds both shares and the amount paid to the pool." },
    { term: "Share-for-share exchange", def: "A reorganisation in which new shares replace old ones with no disposal, the new holding inheriting the original cost and acquisition date." },
  ],
  summary: [
    "A gain is net proceeds less acquisition cost, incidental costs and enhancement expenditure still reflected in the asset.",
    "Part disposals apportion cost by relative VALUE using A / (A + B), where B is the retained part; the balance of cost carries forward.",
    "Shares are indistinguishable, so matching rules impose an order: same day, then a short following window, then the pool.",
    "The short window defeats selling and immediately repurchasing to crystallise a loss or use an exemption.",
    "A bonus issue adds shares but no cost; a rights issue adds both. Neither is a fresh acquisition for matching.",
    "A share-for-share exchange is not a disposal, but any cash received is a part disposal charged immediately.",
  ],
}

/* ── Chapter 11 ────────────────────────────────────────────────── */

export const TXG_TREE_11: StudyChapter = {
  id: "TXG-11",
  number: 11,
  paper: "TX",
  area: "C",
  title: "Losses, exemptions and the reliefs that defer a gain",
  minutes: 18,
  intro:
    "Two questions decide most gains planning: in what order are losses and the annual exemption used, and can this gain be postponed rather than paid? Both have answers that follow from the design of the tax rather than from memory.",
  outcomes: [
    "Apply the correct order of set-off for losses and an annual exemption",
    "Distinguish current-year from brought-forward loss treatment and explain why they differ",
    "Explain the mechanism and effect of a rollover relief",
    "Explain the mechanism and effect of a gift or holdover relief",
    "Explain the purpose of a reduced rate for business disposals",
  ],
  sections: [
    {
      id: "losses-and-the-exemption",
      heading: "Losses and the annual exemption: the order matters more than the arithmetic",
      blocks: [
        {
          kind: "formula",
          name: "The order of set-off, and the reason for each step",
          expr: "     Total chargeable GAINS of the year                    X\n     less  ALLOWABLE LOSSES of the SAME year               (X)\n           -- compulsory, in FULL, even if this wastes\n              the annual exemption\n                                                         -----\n           NET GAINS                                       X\n\n     less  ANNUAL EXEMPT AMOUNT                            (X)\n           -- capped at the net gains; the unused part is\n              LOST, it cannot be carried forward\n                                                         -----\n           Gains after exemption                            X\n\n     less  LOSSES BROUGHT FORWARD from earlier years       (X)\n           -- only DOWN TO the annual exempt amount, so\n              the exemption is not wasted; the rest stays\n              carried forward\n                                                         -----\n           TAXABLE GAINS                                    X\n\nUNUSED CURRENT-YEAR LOSSES carry forward indefinitely.",
          note: "The asymmetry between current-year and brought-forward losses is deliberate and is the most examinable point in the chapter. Current-year losses MUST be set off in full, even where that pushes net gains below the annual exemption and wastes it. Brought-forward losses are restricted so that the exemption is used first and only the excess is absorbed — because a loss carried forward has already survived one year and there is no reason to destroy an exemption with it. Getting this the wrong way round throws away either the exemption or the loss.",
        },
        {
          kind: "example",
          title: "Two years of gains and losses, in the right order",
          scenario:
            "Jurisdiction Z gives an annual exempt amount of CU 5,000. In year 1 Sanjay has gains of CU 9,000 and losses of CU 8,000. In year 2 he has gains of CU 30,000 and no current-year losses.",
          steps: [
            { label: "Year 1 — set off current-year losses in full", detail: "Gains CU 9,000 less losses CU 8,000 = net gains CU 1,000. The set-off is compulsory and cannot be restricted, even though it is about to waste most of the exemption." },
            { label: "Year 1 — apply the annual exemption", detail: "Net gains are CU 1,000, so only CU 1,000 of the CU 5,000 exemption can be used. Taxable gains are nil. The remaining CU 4,000 of exemption is LOST — it cannot be carried forward." },
            { label: "Year 1 — carry forward what is left", detail: "All CU 8,000 of losses were used against gains, so nothing carries forward. Sanjay pays no tax but has effectively wasted CU 4,000 of exemption, which is simply the price of the compulsory rule." },
            { label: "Year 2 — restate with a brought-forward loss to show the contrast", detail: "Suppose instead that year 1's losses had been CU 3,000, leaving CU 6,000 net gains, CU 5,000 exemption used and CU 1,000 taxable — and that CU 7,000 of losses had been brought forward from an earlier year. In year 2, gains are CU 30,000." },
            { label: "Year 2 — exemption first, then the brought-forward loss", detail: "Deduct the CU 5,000 annual exemption from CU 30,000, leaving CU 25,000. Now apply brought-forward losses, but only down to that point: all CU 7,000 can be used, giving taxable gains of CU 18,000. Had gains been only CU 9,000, brought-forward losses would have been restricted to CU 4,000 — enough to reduce gains to the CU 5,000 exemption and no further, with CU 3,000 staying carried forward." },
          ],
          result:
            "**Current-year losses are compulsory and can waste the exemption; brought-forward losses are restricted so that they cannot.** The restriction is a taxpayer protection, not a limitation — it preserves a relief that would otherwise be destroyed by a loss that will keep indefinitely anyway.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "An annual exemption is use-it-or-lose-it, and that is a planning fact",
          md: "Because the unused part cannot be carried forward, an exemption that goes unused each year is permanently gone. Two consequences follow, and both appear in scenarios.\n\n**Spread disposals across periods.** Selling half a holding either side of the year end uses two annual exemptions instead of one. The saving is the exemption multiplied by the marginal rate, every year it is repeated.\n\n**Use a spouse's exemption.** Since transfers between spouses are no gain and no loss (Chapter 9), an asset can be transferred before sale so that part of the gain arises on a person with an unused exemption and possibly a lower rate. This is entirely ordinary planning and is precisely what the no gain, no loss rule enables — though a scenario may expect you to note that the transfer must be genuine and outright, not a device where the transferor keeps the proceeds.",
        },
      ],
      check: {
        q: "Gains are CU 20,000, brought-forward losses are CU 18,000 and the annual exemption is CU 5,000. What are the taxable gains?",
        options: [
          "Nil, with CU 3,000 of losses carried forward",
          "CU 5,000, with all losses used",
          "CU 5,000 of taxable gains after using CU 15,000 of losses, with CU 3,000 carried forward",
          "CU 2,000, after using all losses and then the exemption",
        ],
        correct: 0,
        explain:
          "DEDUCT THE EXEMPTION FIRST, THEN RESTRICT THE BROUGHT-FORWARD LOSSES. CU 20,000 less the CU 5,000 exemption leaves CU 15,000, so only CU 15,000 of the CU 18,000 brought-forward losses is used, reducing taxable gains to nil. The remaining CU 3,000 carries forward — the restriction preserves the exemption rather than letting the loss consume it.",
      },
    },
    {
      id: "deferral-reliefs",
      heading: "Reliefs that postpone a gain rather than remove it",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "Almost every gains relief is a deferral, and knowing that tells you how it works",
          md: "Very few reliefs make a gain disappear. What they nearly always do is **postpone** it, and the mechanism is almost always the same: **reduce the base cost of some other asset by the amount of the deferred gain.**\n\nThat single sentence explains rollover relief, gift relief, incorporation relief and reinvestment reliefs across most jurisdictions. The gain is not charged now; instead a smaller cost is carried into the future, so a correspondingly larger gain arises on the next disposal.\n\nOnce you see that, two things follow that scenarios test directly. The relief is worth the **time value of the deferred tax**, not the tax itself — so an answer claiming it saves the whole charge is wrong. And the deferred gain can be deferred again, and again, so an asset can roll through a career and crystallise only at the end — or, in jurisdictions with a death uplift, never.",
        },
        {
          kind: "table",
          caption: "The two deferral reliefs that appear in nearly every system",
          head: ["", "Rollover (replacement of business asset)", "Gift / holdover relief"],
          rows: [
            ["**The problem it solves**", "A business sells an asset and buys a replacement — no cash has been extracted, so a charge would obstruct ordinary reinvestment", "A gift produces a market-value charge with no proceeds to pay it"],
            ["**Who defers**", "The SAME person, into a new asset", "The gain moves to the RECIPIENT with the asset"],
            ["**The mechanism**", "Deduct the gain from the cost of the replacement asset", "Deduct the gain from the recipient's deemed acquisition cost"],
            ["**Typical conditions**", "Both assets used in the trade, both within a qualifying class, reinvestment within a set window around the disposal", "Usually business assets or shares in a trading company; often a JOINT claim by both parties"],
            ["**When it is charged**", "On disposal of the replacement, unless rolled over again", "On the recipient's eventual disposal"],
          ],
        },
        {
          kind: "example",
          title: "Rollover relief through two disposals",
          scenario:
            "Halvard runs a business in Jurisdiction Z, where rollover relief defers a gain on a qualifying business asset to the extent the proceeds are reinvested in another qualifying asset within the window. He sells a workshop for CU 500,000 which cost CU 180,000, and buys a larger workshop for CU 620,000 four months later. Six years on, he sells the second workshop for CU 900,000 and does not reinvest.",
          steps: [
            { label: "Compute the gain on the first disposal", detail: "CU 500,000 − CU 180,000 = CU 320,000." },
            { label: "Test the reinvestment", detail: "All CU 500,000 of proceeds was reinvested — indeed more, CU 620,000 — and within the window. Full rollover is available, so none of the CU 320,000 is charged now. Had he reinvested only CU 450,000, the CU 50,000 not reinvested would have been charged immediately." },
            { label: "Reduce the cost of the replacement", detail: "The replacement's base cost becomes CU 620,000 − CU 320,000 = CU 300,000. This is the whole mechanism: the gain is stored in a reduced cost rather than taxed." },
            { label: "Compute the gain on the second disposal", detail: "CU 900,000 − CU 300,000 = CU 600,000 chargeable now." },
            { label: "Show what the CU 600,000 consists of", detail: "The second workshop's own growth is CU 900,000 − CU 620,000 = CU 280,000. Add the CU 320,000 deferred from the first, and the CU 600,000 is accounted for exactly. Nothing was forgiven; it was carried." },
            { label: "State what the relief was actually worth", detail: "Halvard had the use of the tax on CU 320,000 for six years. At a marginal rate of, say, 20%, that is CU 64,000 of tax deferred — worth the return he made on that money over six years, not CU 64,000 itself." },
          ],
          result:
            "**CU 600,000 is charged on the second disposal, being CU 280,000 of new growth plus the CU 320,000 rolled over.** Showing the split is what demonstrates understanding: a candidate who computes CU 600,000 without explaining where it came from has done the arithmetic without showing they know why the cost was reduced.",
        },
        {
          kind: "list",
          title: "Other reliefs that recur, and the purpose behind each",
          items: [
            "**Reduced rate for business disposals.** Many jurisdictions tax gains on the sale of a business, or of a substantial shareholding in a trading company, at a lower rate — usually with minimum ownership and involvement conditions and a lifetime cap. The stated purpose is to reward entrepreneurship; the practical effect is to make the qualifying conditions worth checking carefully, because the rate difference is large.",
            "**Main residence relief.** Exempts the gain on a person's only or main home, usually with rules for periods of absence, for land beyond a permitted area, and for parts used exclusively for business. Where a person has two homes, an election usually decides which qualifies.",
            "**Incorporation relief.** Defers the gain when a sole trader transfers a business to a company in exchange for shares, by reducing the base cost of those shares. The logic matches rollover: the owner has changed the form of the investment, not exited it.",
            "**Reinvestment reliefs into qualifying companies.** Defer or exempt a gain reinvested in shares in small or start-up companies, as a deliberate subsidy to a class of investment the government wants to encourage.",
            "**Loss on a loan or on shares that become worthless.** Many systems allow a negligible-value claim treating an asset as disposed of and reacquired at nil, so a loss can be crystallised without finding a buyer for something nobody wants.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Say what a relief costs as well as what it saves",
          md: "A question asking whether a client should claim a deferral relief is not asking you to confirm that a relief exists. The complete answer weighs both sides.\n\n**In favour:** no tax now, so cash stays in the business at the moment it is being reinvested; the deferral may run for many years; and in jurisdictions with a death uplift the gain may never be charged at all.\n\n**Against:** the gain accumulates, so a single very large charge may arise later, possibly at a higher rate than applies today if rates rise; the annual exemption for the current year may be wasted, since a deferred gain cannot use it; and where a lower rate is available now for a business disposal, deferring may forfeit it.\n\nThat last point is the one most often missed. **Claiming a deferral is not always right**, and a candidate who says so — with a reason — is answering the question that was asked.",
        },
      ],
      check: {
        q: "A gain of CU 80,000 is rolled over into a replacement asset costing CU 300,000. What is the replacement's base cost?",
        options: [
          "CU 300,000, because the relief does not affect cost",
          "CU 380,000, because the deferred gain is added",
          "CU 220,000, because the deferred gain is deducted from cost",
          "CU 80,000, being the deferred gain itself",
        ],
        correct: 2,
        explain:
          "DEFERRAL WORKS BY REDUCING THE COST OF THE NEXT ASSET. CU 300,000 − CU 80,000 = CU 220,000. The lower cost means a correspondingly larger gain when the replacement is sold, which is how the postponed gain is eventually brought into charge.",
      },
    },
  ],
  examTraps: [
    { trap: "Restricting current-year losses to preserve the annual exemption.", fix: "Current-year losses are compulsory and set off in FULL, even where that wastes the exemption. Only BROUGHT-FORWARD losses are restricted." },
    { trap: "Carrying forward an unused annual exemption.", fix: "It cannot be carried forward. Unused, it is gone — which is why spreading disposals across periods is worth doing." },
    { trap: "Describing a deferral relief as removing the gain.", fix: "It reduces the base cost of another asset, so a larger gain arises later. The benefit is the time value of the deferred tax, not the tax." },
    { trap: "Assuming full rollover where only part of the proceeds is reinvested.", fix: "The amount NOT reinvested is normally charged immediately, and only the reinvested part is deferred." },
    { trap: "Recommending a deferral claim without weighing it.", fix: "Deferral can waste the current year's exemption, forfeit a lower business rate available now, and build a single large future charge. Say so." },
  ],
  keyTerms: [
    { term: "Annual exempt amount", def: "A yearly slice of net gains that is not charged. Unused amounts cannot be carried forward." },
    { term: "Allowable loss", def: "A loss on a chargeable disposal, set against gains — compulsorily in the year it arises, and with restriction once carried forward." },
    { term: "Rollover relief", def: "Deferral of a gain on a business asset reinvested in a replacement, achieved by reducing the replacement's base cost." },
    { term: "Gift (holdover) relief", def: "Deferral of a gain on a gift by passing it to the recipient through a reduced acquisition cost, usually on a joint claim." },
    { term: "Incorporation relief", def: "Deferral of the gain when a business is transferred to a company for shares, by reducing the base cost of those shares." },
    { term: "Negligible value claim", def: "A claim treating a worthless asset as sold and reacquired at nil, crystallising a loss without an actual sale." },
    { term: "Main residence relief", def: "Exemption of the gain on an only or main home, subject to rules on absence, land area and business use." },
  ],
  summary: [
    "Set off current-year losses in full first, then the annual exemption, then brought-forward losses restricted so the exemption survives.",
    "The annual exemption cannot be carried forward, so spreading disposals across periods and using a spouse's exemption are ordinary planning.",
    "Nearly every gains relief defers rather than removes, by reducing the base cost of another asset.",
    "Rollover moves a gain into a replacement business asset; gift relief moves it to the recipient of a gift.",
    "Only the reinvested portion of proceeds attracts rollover; the balance is charged immediately.",
    "Deferral is worth the time value of the tax, and it can cost a wasted exemption or a forfeited lower rate — so recommend it only with reasons.",
  ],
}

export const TXG_AREA_C: StudyChapter[] = [TXG_TREE_09, TXG_TREE_10, TXG_TREE_11]
