import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX-UK · Area C, second part — shares and securities, and the CGT reliefs.
 * Chapters 17–18.
 *
 * Chapter 17 is entirely mechanical once the matching order is known, and entirely wrong
 * if it is not: same day, then the following 30 days, then the pool. The 30-day rule looks
 * perverse — matching a sale against a LATER purchase — and the chapter explains why it
 * exists, because a candidate who understands the anti-bed-and-breakfasting purpose
 * remembers the order.
 *
 * Chapter 18 carries the reliefs, and the FA2025 figure that matters most: business asset
 * disposal relief is now taxed at 14%, not the 10% that was the rate for many years. The
 * lifetime limit is unchanged at £1,000,000.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

/* ── Chapter 17 · C4 ──────────────────────────────────────────── */

export const TX_TREE_17: StudyChapter = {
  id: "TX-17",
  number: 17,
  paper: "TX",
  area: "C",
  title: "Chargeable gains: shares and securities",
  minutes: 18,
  syllabusRefs: ["C4(a)", "C4(b)", "C4(c)", "C4(d)", "C4(e)"],
  intro:
    "Shares are identical, so the law has to decide which ones were sold. Three matching rules in a fixed order do that, and the middle one runs backwards in time.",
  outcomes: [
    "Apply the share identification rules in the correct order",
    "Maintain a share pool through acquisitions and disposals",
    "Deal with bonus and rights issues",
    "Deal with takeovers and reorganisations",
    "Identify the exemption for gilts and qualifying corporate bonds",
  ],
  sections: [
    {
      id: "matching-and-pool",
      heading: "The matching rules and the share pool",
      blocks: [
        {
          kind: "formula",
          name: "The identification rules for individuals",
          expr: "Match a disposal of shares against acquisitions of the SAME CLASS in\nthis order:\n\n   1.  Shares acquired on the SAME DAY as the disposal\n   2.  Shares acquired within the FOLLOWING 30 DAYS — earliest first\n   3.  Shares in the SHARE POOL, being all shares acquired BEFORE the\n       date of disposal, pooled together at aggregate cost\n\nThe pool is a single running total of NUMBER of shares and COST. On a\ndisposal from the pool:\n\n   Cost of shares sold  =  pool cost  ×  shares sold / shares in pool",
          note: "Rule 2 matches a sale against a purchase made AFTERWARDS, which is deliberately counter-intuitive. It exists to defeat 'bed and breakfasting' — selling shares to crystallise a loss or to use the annual exempt amount, then buying them straight back. Without the rule the taxpayer would establish a gain or loss without ever really parting with the shares.",
        },
        {
          kind: "example",
          title: "A disposal matched across all three rules",
          scenario:
            "Ines held 1,000 ordinary shares in Kirkby plc bought in 2012 for £4,200. In 2018 the company made a 1 for 4 bonus issue. In 2022 there was a 1 for 5 rights issue at £3.00 a share, which Ines took up in full. On 14 November 2025 she sold 900 shares for £9.40 each. She had also bought 200 shares on 14 November 2025 at £8.10 each, and a further 100 shares on 2 December 2025 at £8.60 each.",
          steps: [
            { label: "Build the pool — the bonus issue", detail: "A bonus issue is free, so it adds SHARES but NO COST. 1 for 4 on 1,000 shares gives 250 more: the pool becomes 1,250 shares at a cost of £4,200. The cost per share falls, which is the whole effect of a bonus issue." },
            { label: "Build the pool — the rights issue", detail: "A rights issue is a purchase, so it adds shares AND cost. 1 for 5 on 1,250 shares gives 250 shares at £3.00 = £750. The pool becomes 1,500 shares at a cost of £4,950." },
            { label: "Match rule 1 — same day", detail: "200 shares were bought on 14 November 2025, the day of disposal, so they are matched first. Gain = (200 × £9.40) − (200 × £8.10) = £1,880 − £1,620 = £260." },
            { label: "Match rule 2 — the following 30 days", detail: "100 shares were bought on 2 December 2025, within 30 days of the sale, so they are matched next. Gain = (100 × £9.40) − (100 × £8.60) = £940 − £860 = £80." },
            { label: "Match rule 3 — the pool", detail: "900 − 200 − 100 = 600 shares come from the pool. Cost = £4,950 × 600/1,500 = £1,980. Gain = (600 × £9.40) − £1,980 = £5,640 − £1,980 = £3,660." },
            { label: "Total the gain and update the pool", detail: "£260 + £80 + £3,660 = £4,000. The pool now holds 1,500 − 600 = 900 shares at a cost of £4,950 − £1,980 = £2,970." },
            { label: "Note what the matching achieved", detail: "The 300 shares Ines bought around the sale produced gains of only £340 between them, because they were bought at close to the sale price. Had the pool been matched first, the whole 900 would have carried the low pooled cost and the gain would have been substantially higher — which is exactly the effect the rules are designed to produce." },
          ],
          result:
            "**Total gain £4,000: £260 same day, £80 within 30 days and £3,660 from the pool.** The pool is left with 900 shares at £2,970, and the working order is the whole of the technique.",
        },
        {
          kind: "table",
          caption: "Bonus issues against rights issues",
          head: ["", "Bonus issue", "Rights issue"],
          rows: [
            ["**What it is**", "Free shares issued from reserves", "New shares offered to existing holders, usually below market price"],
            ["**Shares added to the pool**", "Yes", "Yes"],
            ["**Cost added to the pool**", "**None** — it is free", "**Yes**, the amount actually subscribed"],
            ["**Effect on cost per share**", "**Reduces** it", "Reduces it, but less so"],
            ["**Date treated as acquired**", "The date of the **ORIGINAL** shares, so no separate 30-day matching", "Likewise the date of the original shares"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Takeovers, reorganisations and the exempt securities",
          md: "On a **paper for paper** takeover — where shares are exchanged for shares or loan notes in the acquiring company — there is **NO DISPOSAL**. The original cost simply transfers to the new holding, and the gain arises only when the new shares are eventually sold. Where **more than one class** of new security is received, apportion the original cost between them **in proportion to their market values** at the date of the takeover.\n\nWhere **cash** is received as part of the consideration, that part **IS** a disposal, computed as a part disposal on the A/(A + B) fraction.\n\n**Gilt-edged securities and qualifying corporate bonds are EXEMPT.** The TX syllabus expects nothing more than that fact — so a gain on them is not chargeable and a loss on them is not allowable.\n\nOn a **gift of quoted shares**, the market value is used as the deemed proceeds, and a question will supply the figure.",
        },
      ],
      check: {
        q: "Why is a disposal of shares matched against acquisitions in the FOLLOWING 30 days?",
        options: [
          "Because the pool is only updated monthly",
          "To defeat 'bed and breakfasting' — selling to crystallise a gain or loss and buying straight back without really parting with the shares",
          "Because shares take 30 days to settle",
          "To give the taxpayer the lowest possible gain",
        ],
        correct: 1,
        explain:
          "TO DEFEAT BED AND BREAKFASTING. Without the rule a taxpayer could sell at the close of one day and repurchase the next morning, establishing a loss or using the annual exempt amount while retaining the shares throughout. Matching the sale against the repurchase removes the benefit.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Matching the pool before same-day and 30-day acquisitions.",
      fix: "The order is same day, then the following 30 days, then the pool.",
    },
    {
      trap: "Adding cost to the pool for a bonus issue.",
      fix: "A bonus issue adds shares but no cost. A rights issue adds both.",
    },
    {
      trap: "Treating a paper for paper takeover as a disposal.",
      fix: "There is no disposal; the cost transfers to the new holding. Only a cash element is a disposal.",
    },
    {
      trap: "Computing a gain or loss on gilts or qualifying corporate bonds.",
      fix: "Both are exempt, so neither a gain nor a loss arises.",
    },
    {
      trap: "Failing to update the pool after a disposal.",
      fix: "Deduct both the shares sold and their apportioned cost, and carry the balance forward.",
    },
  ],
  keyTerms: [
    { term: "Share pool", def: "All shares of a class acquired before the disposal, held as a running total of number and aggregate cost." },
    { term: "30-day matching rule", def: "Matching a disposal against acquisitions in the following 30 days, to defeat bed and breakfasting." },
    { term: "Bonus issue", def: "Free shares, adding to the pool's share count but not its cost." },
    { term: "Rights issue", def: "Shares offered to existing holders for payment, adding both shares and cost to the pool." },
    { term: "Paper for paper", def: "A share-for-share exchange on a takeover, which is not a disposal; the cost transfers to the new holding." },
  ],
  summary: [
    "Match a disposal against same-day acquisitions, then the following 30 days, then the pool.",
    "The 30-day rule exists to defeat bed and breakfasting.",
    "A bonus issue adds shares but no cost; a rights issue adds both.",
    "A paper for paper takeover is not a disposal, and cost is apportioned by market value between classes received.",
    "Gilts and qualifying corporate bonds are exempt, so neither gains nor losses arise on them.",
  ],
  knowledgeDiagnostic: [
    { q: "State the three matching rules in order.", a: "Same day, then acquisitions within the following 30 days earliest first, then the share pool." },
    { q: "How does a bonus issue affect the pool?", a: "It adds shares but no cost, so the cost per share falls." },
    { q: "How is cost apportioned where a takeover gives two classes of security?", a: "In proportion to the market values of the securities received at the date of the takeover." },
    { q: "What is the CGT treatment of qualifying corporate bonds?", a: "They are exempt, so no chargeable gain and no allowable loss arises." },
    { q: "How is the cost of shares sold from the pool computed?", a: "Pool cost multiplied by shares sold divided by shares in the pool." },
  ],
}

/* ── Chapter 18 · C3(c), C6 ───────────────────────────────────── */

export const TX_TREE_18: StudyChapter = {
  id: "TX-18",
  number: 18,
  paper: "TX",
  area: "C",
  title: "Chargeable gains: the reliefs",
  minutes: 20,
  syllabusRefs: ["C3(c)", "C6(a)", "C6(b)", "C6(c)", "C6(d)"],
  intro:
    "Five reliefs, and they do different things: two exempt a gain, two defer it and one changes the rate. Knowing which is which decides whether an answer makes sense.",
  outcomes: [
    "Compute private residence relief including deemed occupation",
    "Compute letting relief",
    "Apply business asset disposal relief and investors' relief at 14%",
    "Apply rollover relief, including a partial reinvestment",
    "Apply gift holdover relief, including the restriction where consideration is paid",
  ],
  sections: [
    {
      id: "prr",
      heading: "Private residence relief and letting relief",
      blocks: [
        {
          kind: "formula",
          name: "Private residence relief",
          expr: "                              periods of OCCUPATION\n   PRR  =  gain  ×  ─────────────────────────────────\n                          total period of OWNERSHIP\n\nPeriods of occupation include ACTUAL occupation plus DEEMED occupation:\n\n   (a)  the LAST 9 MONTHS of ownership — always, provided the property\n        was the main residence at some point\n   (b)  up to 3 YEARS of absence for ANY reason\n   (c)  ANY period living overseas by reason of employment\n   (d)  up to 4 YEARS of absence working elsewhere in the UK, employed\n        or self-employed\n\nThe absences in (b), (c) and (d) must be PRECEDED AND FOLLOWED by a\nperiod of ACTUAL occupation — except that the requirement to reoccupy\nis waived for (c) and (d) where the employer requires the individual\nto work elsewhere.",
          note: "Work in MONTHS throughout, and lay the periods out as a timeline before computing anything. Note that the two-year pre-occupation exemption is an EXCLUDED topic in TX, so do not apply it.",
        },
        {
          kind: "example",
          title: "PRR with deemed occupation",
          scenario:
            "Owain bought a house in April 2010 and sold it in April 2025 — 180 months of ownership — realising a gain of £252,000. He lived in it for the first 48 months. He then travelled for 48 months, returned and lived there for a further 24 months, and finally moved in with his family for the last 60 months of ownership, never returning to the house before it was sold. None of the absences was related to employment.",
          steps: [
            { label: "Lay out the timeline in months", detail: "48 actual occupation, 48 absence travelling, 24 actual occupation, 60 absence living with family. Check: 48 + 48 + 24 + 60 = 180 months ✓. Always start here — the arithmetic of the periods is where most errors happen." },
            { label: "The 48 months travelling — test it against the 3-year rule", detail: "Absence for ANY reason is deemed occupation for up to 3 years, so only 36 of the 48 months qualify. The excess 12 months is chargeable. The condition is met for the 36 months because the absence is preceded by 48 months of actual occupation and followed by 24 months of actual occupation." },
            { label: "The final 60 months — test the reoccupation condition", detail: "Owain never returned, and the absence was NOT employment-related, so the reoccupation waiver does not apply. None of this period qualifies as deemed occupation under rules (b), (c) or (d)." },
            { label: "But the last 9 months are always exempt", detail: "The final 9 months of ownership are exempt unconditionally provided the property was the main residence at some point, which it was. So 9 of those 60 months are exempt and the other 51 are chargeable." },
            { label: "Total the exempt and chargeable months", detail: "Exempt: 48 actual + 36 deemed + 24 actual + 9 final = 117 months. Chargeable: 12 excess travelling + 51 remaining final absence = 63 months. Check: 117 + 63 = 180 ✓." },
            { label: "Compute the relief and the chargeable gain", detail: "PRR = £252,000 × 117/180 = £163,800. Chargeable gain = £252,000 − £163,800 = £88,200." },
            { label: "Note what would have changed the answer", detail: "Had the final 60 months been spent working abroad for an employer, ALL of it would have been deemed occupation — employment abroad is unlimited in length and the reoccupation condition is waived where the employer required it — and the whole gain would have been exempt. The reason for an absence matters more than its length." },
          ],
          result:
            "**PRR £163,800, leaving a chargeable gain of £88,200.** The technique is a timeline in months, each absence tested against its own cap AND its own reoccupation condition, then the last 9 months added without double counting.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Letting relief is narrower than most candidates think",
          md: "Letting relief is available **only** where the owner lets **part** of the property **while still occupying the remainder**. It is **not** available for a buy-to-let, and **not** for a former main residence that was later let out **in its entirety** — which is the situation most candidates try to apply it to.\n\nWhere it does apply, it is the **LOWEST** of:\n\n· **£40,000**\n· the amount of the gain exempted by **PRR**\n· the part of the gain **still chargeable** that is attributable to the **letting**\n\nAnd note the exception: where the owner has a **lodger** who lives as a member of the family, sharing the accommodation and meals, **full PRR** is available and letting relief is not needed at all.",
        },
      ],
      check: {
        q: "An owner lived in a house, then worked abroad for their employer for five years and sold without returning. How much of the absence is deemed occupation?",
        options: [
          "Three years, the general absence limit",
          "All five years — employment abroad gives unlimited deemed occupation, and the requirement to reoccupy is waived where the employer required the move",
          "Four years",
          "None, because they never returned",
        ],
        correct: 1,
        explain:
          "ALL FIVE YEARS. Absence by reason of employment overseas is deemed occupation for ANY length of time, and although deemed occupation normally requires actual occupation before and after, that reoccupation condition is waived where the employer required the individual to work elsewhere.",
      },
    },
    {
      id: "business-reliefs",
      heading: "Business asset disposal relief, rollover and gift relief",
      blocks: [
        {
          kind: "table",
          caption: "The business reliefs, and what each actually does",
          head: ["Relief", "Effect", "Conditions"],
          rows: [
            ["**Business asset disposal relief**", "Taxes the gain at **14%** instead of 18%/24%. Lifetime limit **£1,000,000**", "Disposal of the whole or part of a trading business, its assets on cessation, or **shares** in a trading company where the individual held **5%+** and was an **officer or employee** — all for at least **2 years**"],
            ["**Investors' relief**", "Also **14%**, lifetime limit **£10,000,000**", "Newly issued unquoted trading company shares, held at least 3 years, where the individual is NOT an officer or employee"],
            ["**Rollover relief**", "**DEFERS** the gain by deducting it from the cost of a replacement asset", "Both old and new assets used in the trade and within the qualifying classes; reinvest between **1 year before** and **3 years after** the disposal"],
            ["**Gift holdover relief**", "**DEFERS** the gain into the donee's hands, reducing their base cost", "Gift of qualifying **business** assets by an individual; joint claim by donor and donee"],
            ["**Private residence relief**", "**EXEMPTS** the gain in proportion to occupation", "The property was the individual's only or main residence"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "14%, not 10% — the FA2025 change most likely to be misremembered",
          md: "Business asset disposal relief and investors' relief are both taxed at **14%** for 2025/26. The rate was **10%** for many years, and it is on the exam's rate sheet — so there is no excuse for using the old figure, but it is the single most likely number to be recalled wrongly.\n\nThe lifetime limits are unchanged: **£1,000,000** for business asset disposal relief and **£10,000,000** for investors' relief. Gains above the limit are taxed at the normal 18% or 24%.\n\nNote too that a BADR gain still **uses up basic rate band** for the purpose of taxing other gains, and the annual exempt amount is best set against gains taxed at 24% rather than against a BADR gain taxed at 14% — which is a planning point worth stating.",
        },
        {
          kind: "example",
          title: "BADR above the lifetime limit, and a partial rollover",
          scenario:
            "Part 1: Farida sells her trading business, which she has run for nine years, realising a gain of £1,250,000. She has made no previous claims and is an additional rate taxpayer with no basic rate band remaining. Assume her annual exempt amount is used against other gains. Part 2: Separately, Gethin sells a factory used in his trade for £400,000, realising a gain of £150,000, and buys a replacement factory for £370,000 within a year.",
          steps: [
            { label: "Part 1 — check the BADR conditions", detail: "Disposal of the whole of a trading business owned for at least two years, so business asset disposal relief applies. The lifetime limit is £1,000,000 and Farida has made no previous claims, so the full limit is available." },
            { label: "Part 1 — apply the two rates", detail: "The first £1,000,000 of gain qualifies for BADR at 14% = £140,000. The remaining £250,000 is taxed at the normal rate for an additional rate taxpayer, 24% = £60,000." },
            { label: "Part 1 — total the tax", detail: "£140,000 + £60,000 = £200,000. Note that at 10% the answer would have been £100,000 + £60,000 = £160,000, so using the old rate understates the liability by £40,000." },
            { label: "Part 2 — test whether the rollover is full or partial", detail: "Rollover relief is restricted where the proceeds are not fully reinvested. Proceeds £400,000, reinvested £370,000, so £30,000 was NOT reinvested." },
            { label: "Part 2 — compute the gain chargeable now", detail: "The amount chargeable immediately is the LOWER of the gain (£150,000) and the proceeds not reinvested (£30,000). So £30,000 is taxable now." },
            { label: "Part 2 — compute the gain rolled over", detail: "£150,000 − £30,000 = £120,000 is deferred, and is deducted from the cost of the new factory: base cost becomes £370,000 − £120,000 = £250,000. The deferred gain resurfaces when the replacement is sold." },
          ],
          result:
            "**Part 1: £200,000 of CGT — £1,000,000 at 14% and £250,000 at 24%. Part 2: £30,000 chargeable now and £120,000 rolled into a base cost of £250,000.** The two figures to get right are the 14% rate and the 'lower of gain and proceeds not reinvested' test.",
        },
        {
          kind: "list",
          title: "Gift holdover relief — the two restrictions",
          items: [
            "**A joint claim** by donor and donee is required. The donor's gain is held over and the **donee's base cost is reduced** by the held-over gain, so the tax is deferred rather than removed.",
            "**Where actual consideration is paid** and it **exceeds the original cost**, the excess is **chargeable immediately** on the donor. Only the balance of the gain is held over — so a sale at undervalue gets partial relief, not full.",
            "The asset must be a **qualifying business asset**: assets used in the donor's trade, or shares in an unquoted trading company, or shares in a quoted trading company where the donor holds at least 5%.",
            "An asset that was **never used for business purposes** does not qualify at all, however it is transferred.",
            "Where a business asset was used **partly** for non-business purposes, the relief is restricted to the business proportion.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How to choose between the reliefs in a scenario",
          md: "Ask what the taxpayer actually needs. If they have **sold and received cash** and are not reinvesting, the only reliefs available are **BADR** or **investors' relief** — a rate reduction, because there is nothing to defer into. If they are **replacing** a business asset, **rollover relief** defers the whole gain, and the cash flow benefit may be worth more than a 14% rate on a gain paid now. If they are **giving** a business asset away, **gift relief** is the answer, because they have no proceeds with which to pay tax.\n\nAnd note that BADR and rollover relief can interact: rolling a gain over defers it, but it may also defer it out of a year in which BADR was available and into one where the conditions are no longer met. Where a scenario offers both, say which is better and why.",
        },
      ],
      check: {
        q: "A trader sells a business asset for £400,000, realising a gain of £150,000, and reinvests £370,000 in a replacement. How much gain is chargeable now?",
        options: [
          "Nil — full rollover relief applies",
          "£30,000 — the lower of the gain and the proceeds not reinvested",
          "£150,000, as the reinvestment was incomplete",
          "£120,000",
        ],
        correct: 1,
        explain:
          "£30,000. Where proceeds are not fully reinvested, the amount chargeable immediately is the LOWER of the gain and the proceeds not reinvested — here £150,000 against £30,000. The remaining £120,000 is rolled into the replacement's base cost, reducing it to £250,000.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Taxing business asset disposal relief at 10%.",
      fix: "The FA2025 rate is 14%, and it is on the exam's rate sheet.",
    },
    {
      trap: "Claiming letting relief on a buy-to-let or a wholly let former residence.",
      fix: "It applies only where the owner lets part while still occupying the remainder.",
    },
    {
      trap: "Double counting the last 9 months of ownership where it overlaps another deemed period.",
      fix: "Lay out a timeline in months and count each month once.",
    },
    {
      trap: "Rolling over the whole gain where proceeds were not fully reinvested.",
      fix: "The lower of the gain and the proceeds not reinvested is chargeable immediately.",
    },
    {
      trap: "Giving full gift relief where consideration exceeded original cost.",
      fix: "The excess of consideration over cost is chargeable now; only the balance is held over.",
    },
  ],
  keyTerms: [
    { term: "Private residence relief", def: "Exempts the gain in the proportion that occupation bears to ownership." },
    { term: "Deemed occupation", def: "Periods treated as occupation: the last 9 months, 3 years for any reason, employment abroad, and 4 years working elsewhere in the UK." },
    { term: "Letting relief", def: "The lowest of £40,000, the PRR-exempt gain and the chargeable gain attributable to letting, where part is let while the owner remains in occupation." },
    { term: "Business asset disposal relief", def: "A 14% rate on up to £1,000,000 of qualifying gains over a lifetime." },
    { term: "Rollover relief", def: "Defers a gain into the base cost of a replacement business asset, restricted where proceeds are not fully reinvested." },
    { term: "Gift holdover relief", def: "Defers the gain on a gift of business assets into the donee's reduced base cost, on a joint claim." },
  ],
  summary: [
    "PRR exempts the gain in proportion to occupation, including the last 9 months and the deemed absences.",
    "Letting relief is the lowest of £40,000, the PRR-exempt gain and the let portion of the chargeable gain.",
    "Business asset disposal relief and investors' relief are taxed at 14%, with limits of £1m and £10m.",
    "Rollover relief defers the gain, but proceeds not reinvested are chargeable immediately.",
    "Gift relief defers the gain into the donee's base cost, restricted where consideration exceeds original cost.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the four periods of deemed occupation for PRR?", a: "The last 9 months of ownership, up to 3 years of absence for any reason, any period working overseas, and up to 4 years working elsewhere in the UK." },
    { q: "When is the reoccupation condition waived?", a: "For absences due to working overseas or elsewhere in the UK, where the employer required the individual to work away." },
    { q: "At what rate are business asset disposal relief gains taxed for 2025/26?", a: "14%, on up to £1,000,000 of qualifying gains over the individual's lifetime." },
    { q: "How is rollover relief restricted on a partial reinvestment?", a: "The lower of the gain and the proceeds not reinvested is chargeable immediately; the balance is rolled into the replacement's base cost." },
    { q: "What limits gift holdover relief where the donee pays something?", a: "Consideration above the donor's original cost is taxed there and then; whatever is left of the gain is what gets held over." },
  ],
}

export const TX_TREE_AREA_C_PART2: StudyChapter[] = [TX_TREE_17, TX_TREE_18]
