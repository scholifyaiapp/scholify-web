/*
 * TX-UK Areas C and D — chargeable gains for individuals, and inheritance tax.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * No plan here states a rate, band, exemption limit or annual exempt amount as a
 * figure to be learned: the exam supplies them and they change with every Finance
 * Act. See the header of acca-plans-tx-ab.ts for the full reasoning.
 *
 * Inheritance tax is the area where candidates most often produce a correct-looking
 * computation that is wrong in structure, because the ORDER of the seven-year
 * cumulation and the direction of the nil rate band both have to be right before any
 * figure means anything. Those plans therefore establish the sequence first.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const TX_PLANS_CD: ExamPlanMap = {
  /* ── TX-15 · Chargeable gains: computation and tax ─────────── */

  "TX-15::scope-and-computation": {
    title: "Which disposals are chargeable, and computing the gain",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is a **chargeable** disposal for capital gains tax?\n\nA  A gift of shares to a spouse living with the taxpayer\nB  A sale of shares to an unconnected third party\nC  A transfer of assets on death\nD  A gift of a car to a friend",
    plan: [
      {
        step: "Establish that both the disposal and the asset must be chargeable",
        detail:
          "Two separate tests. Some DISPOSALS are exempt or on a no gain no loss basis; some ASSETS are exempt whatever the disposal. Both have to be checked.",
      },
      {
        step: "Apply the disposal test",
        detail:
          "A transfer between spouses living together is on a NO GAIN NO LOSS basis. A transfer on DEATH is not a chargeable disposal at all — the estate acquires at market value.",
      },
      {
        step: "Apply the asset test",
        detail:
          "Exempt assets include cars, most chattels below a limit, gilts and qualifying corporate bonds, ISA investments, and a main residence covered by relief. A car is exempt whoever it is given to.",
      },
      {
        step: "Confirm the survivor passes both tests",
        detail:
          "Shares are a chargeable asset and a sale to an unconnected party is a chargeable disposal. Both tests pass, so a gain arises.",
      },
    ],
    answer:
      "**B — a sale of shares to an unconnected third party.**\n\nTwo separate tests must both be satisfied: the **disposal** must be chargeable, and the **asset** must be chargeable.\n\nOn the **disposal** test: a transfer between **spouses living together** is on a **no gain no loss** basis — the transferee inherits the transferor's base cost, so the gain is deferred rather than escaped. A transfer on **death** is **not a chargeable disposal at all**, and the estate acquires at market value, so the gain accrued in the deceased's lifetime disappears — which is the single most important interaction between CGT and inheritance tax.\n\nOn the **asset** test: exempt assets include **cars**, most **chattels** below a limit, **gilts and qualifying corporate bonds**, **ISA** investments, and a main residence covered by relief. A car is exempt whoever it is given to, so option D fails on the asset rather than the disposal.\n\nThe gain is **proceeds less incidental costs of disposal less allowable cost less enhancement expenditure**. A **gift** or a transfer between **connected persons** uses **market value** rather than actual consideration.",
    earns: [
      "Applying both the disposal and the asset test, and knowing spouse transfers defer rather than exempt",
      "Knowing death is not a chargeable disposal and the estate acquires at market value",
    ],
    loses: ["Testing only one of the two limbs, which lets an exempt asset or disposal through"],
  },

  "TX-15::losses-and-tax": {
    title: "The order in which losses and the annual exempt amount are used",
    format: "ot",
    marks: 2,
    requirement:
      "In computing capital gains tax, capital losses brought forward are:\n\nA  Set against gains before the annual exempt amount, even if this wastes the exemption\nB  Set against gains only to the extent that gains exceed the annual exempt amount\nC  Set against total income\nD  Carried forward indefinitely and never used",
    plan: [
      {
        step: "Distinguish current year losses from brought forward losses",
        detail:
          "CURRENT year losses must be set against current year gains in full, even if that wastes the annual exempt amount. BROUGHT FORWARD losses are used only down to the exempt amount.",
      },
      {
        step: "State the brought forward rule precisely",
        detail:
          "They are set against gains only to the extent gains exceed the annual exempt amount, so the exemption is preserved and the unused loss carries forward again.",
      },
      {
        step: "See why the two rules differ",
        detail:
          "Current year losses are compulsory and immediate. Brought forward losses are a stored relief, so the rules let the taxpayer keep the annual exemption rather than wasting it.",
      },
      {
        step: "Note the order of the computation",
        detail:
          "Gains less current year losses, less brought forward losses down to the exempt amount, less the exempt amount — then tax the balance at the rate set by the taxpayer's income and the asset type.",
      },
    ],
    answer:
      "**B — set against gains only to the extent that gains exceed the annual exempt amount.**\n\nThe two kinds of loss follow **different rules**, and that difference is the question. **Current year** losses must be set against current year gains **in full**, even where that **wastes** the annual exempt amount — the taxpayer has no choice. **Brought forward** losses are used only **down to** the exempt amount, so the exemption is preserved and any unused loss carries forward again.\n\nThe reason for the difference: current year losses are compulsory and immediate, while brought forward losses are a **stored** relief, so the rules allow the taxpayer to keep the annual exemption rather than burn it.\n\nThe order of the computation follows: gains, **less current year losses**, **less brought forward losses down to the exempt amount**, **less the exempt amount**, then tax the balance.\n\nThe **rate** depends on two things: the taxpayer's **taxable income**, which determines how much basic rate band remains, and the **type of asset** — residential property attracts a higher rate than other assets. So the CGT computation cannot be completed until the income tax computation has been done, which is why the two appear together in Section C.",
    earns: [
      "Distinguishing the compulsory current year rule from the preserved brought forward rule",
      "Knowing the CGT rate depends on remaining basic rate band, so income tax comes first",
    ],
    loses: ["Applying the current year rule to brought forward losses and wasting the exemption"],
  },

  /* ── TX-16 · Part disposals, chattels, wasting assets ─────── */

  "TX-16::part-disposals": {
    title: "Apportioning cost on a part disposal",
    format: "ot",
    marks: 2,
    requirement:
      "On a part disposal, the allowable cost is apportioned using the fraction:\n\nA  A ÷ (A + B), where A is the proceeds of the part sold and B is the market value of the part retained\nB  A ÷ (A + B), where A is the cost of the part sold and B is the cost of the part retained\nC  The proportion of the physical area sold\nD  Half the total cost",
    plan: [
      {
        step: "State the fraction and what each letter is",
        detail:
          "A ÷ (A + B), where A is the PROCEEDS of the part sold and B is the MARKET VALUE of the part retained at the date of disposal. Both are values, not costs.",
      },
      {
        step: "See why market value of the remainder is needed",
        detail:
          "The apportionment reflects relative VALUE, not relative size. So the market value of what is kept must be established at the disposal date, and the question will supply it.",
      },
      {
        step: "Reject the physical apportionment",
        detail:
          "Selling half the area of a plot does not mean selling half the value — the part sold may be the more valuable half. Option C is the intuitive but wrong basis.",
      },
      {
        step: "Note the small part disposal of land let-out",
        detail:
          "Where proceeds are small relative to the value of the whole, the taxpayer may deduct the proceeds from the base cost instead of computing a gain, deferring it to the eventual disposal.",
      },
    ],
    answer:
      "**A — A ÷ (A + B), where A is the proceeds of the part sold and B is the market value of the part retained.**\n\nBoth letters are **values**, not costs: A is the **proceeds** of the part sold, B the **market value of the remainder at the date of disposal**. So the question must supply that market value, and a stem that gives it is signalling a part disposal.\n\nThe apportionment reflects relative **value**, not relative **size** — which is why option C fails. Selling half the area of a plot of land does not mean selling half the value, since the part sold may be the more valuable half, and apportioning by area would give the wrong cost.\n\nThe **small part disposal of land** let-out is worth knowing: where the proceeds are small relative to the value of the whole, the taxpayer may **deduct the proceeds from the base cost** instead of computing a gain — deferring it to the eventual disposal of the remainder, and avoiding a computation for a trivial sum.\n\nIncidental costs of the part disposal are deducted in full; only the **original cost** is apportioned.",
    earns: [
      "Knowing A and B are values and that market value of the remainder is required",
      "Knowing incidental costs are not apportioned, only original cost",
    ],
    loses: ["Apportioning by physical size or by cost rather than by value"],
  },

  "TX-16::chattels": {
    title: "How the chattels rules limit a gain",
    format: "ot",
    marks: 2,
    requirement:
      "A chattel is sold for proceeds slightly above the chattels exemption limit. The gain is:\n\nA  Fully chargeable in the normal way\nB  Restricted to five thirds of the excess of proceeds over the limit, if lower than the normal gain\nC  Exempt\nD  Half the normal gain",
    plan: [
      {
        step: "Identify the three possible outcomes for a chattel",
        detail:
          "Proceeds AT OR BELOW the limit: exempt. Proceeds just above: the marginal relief caps the gain. Proceeds well above: the normal gain applies because it is lower than the cap.",
      },
      {
        step: "State the marginal relief",
        detail:
          "The gain is restricted to five thirds of the excess of proceeds over the limit — and the taxpayer takes the LOWER of that and the normal gain, so the relief never increases a gain.",
      },
      {
        step: "See why the relief exists",
        detail:
          "Without it, proceeds one pound above the limit would move a chattel from wholly exempt to fully taxable. The taper smooths the cliff edge.",
      },
      {
        step: "Note the loss rule, which runs the other way",
        detail:
          "On a LOSS, proceeds are DEEMED to be the exemption limit — so the allowable loss is restricted. The rules limit gains and losses symmetrically.",
      },
    ],
    answer:
      "**B — restricted to five thirds of the excess of proceeds over the limit, if lower than the normal gain.**\n\nThere are three outcomes for a chattel. Proceeds **at or below** the limit: **exempt**. Proceeds **just above**: the marginal relief caps the gain at **five thirds of the excess** over the limit. Proceeds **well above**: the normal gain applies, because by then it is **lower** than the cap.\n\nThe words \"if lower\" matter — the taxpayer takes the **lower** of the capped figure and the normal gain, so the relief can never increase a gain.\n\nThe relief exists to smooth a **cliff edge**: without it, proceeds one pound above the limit would move a chattel from wholly exempt to fully taxable.\n\nThe **loss** rule runs the other way and is examined: where a chattel is sold at a loss for proceeds **below** the limit, the proceeds are **deemed to be the limit**, which **restricts** the allowable loss. So the rules limit gains and losses symmetrically — a taxpayer cannot claim a full loss on an asset that would have been exempt had it gone up.\n\n**Wasting chattels** — with a predictable life not exceeding 50 years — are exempt entirely unless used in a business and eligible for capital allowances.",
    earns: [
      "Knowing to take the lower of the capped and normal gain",
      "Knowing the loss rule deems proceeds to be the limit, restricting the loss",
    ],
    loses: ["Applying the cap without comparing it to the normal gain"],
  },

  /* ── TX-17 · Shares and securities ────────────────────────── */

  "TX-17::matching-and-pool": {
    title: "Matching a share disposal against acquisitions",
    format: "ot",
    marks: 2,
    requirement:
      "An individual disposing of shares matches the disposal against acquisitions in the order:\n\nA  The share pool, then same day, then the following 30 days\nB  Same day, then the following 30 days, then the share pool\nC  The following 30 days, then same day, then the share pool\nD  Whichever order gives the lowest gain",
    plan: [
      {
        step: "Learn the order and note that it is fixed",
        detail:
          "Same day acquisitions first, then acquisitions in the following 30 days, then the share pool. It is statutory, not a choice — which disposes of option D.",
      },
      {
        step: "See why the 30-day rule exists",
        detail:
          "To defeat bed and breakfasting — selling to crystallise a gain or loss and reacquiring immediately. Matching against the reacquisition means the disposal achieves nothing.",
      },
      {
        step: "Note that the 30 days runs FORWARD",
        detail:
          "Acquisitions in the 30 days AFTER the disposal, not before. Reading it backwards is the standard error and produces the wrong matching entirely.",
      },
      {
        step: "Note how the pool works",
        detail:
          "A running total of shares and cost. On a disposal, cost is removed in the proportion the shares disposed of bear to the shares in the pool — so the pool is an average cost, not a queue.",
      },
    ],
    answer:
      "**B — same day, then the following 30 days, then the share pool.**\n\nThe order is **statutory**, not a choice, which disposes of option D immediately.\n\nThe **30-day rule exists to defeat bed and breakfasting** — selling shares to crystallise a gain or a loss and reacquiring them almost immediately. Matching the disposal against the **reacquisition** means the transaction achieves nothing for tax purposes.\n\nThe 30 days runs **forward**: acquisitions in the 30 days **after** the disposal. Reading it backwards is the standard error and produces entirely the wrong matching.\n\nThe **share pool** is a running total of **shares and cost**. On a disposal, cost is removed in the proportion the shares disposed of bear to the shares in the pool — so the pool operates as an **average cost**, not as a queue, and there is no FIFO within it.\n\nA **bonus issue** adds shares to the pool at no cost, diluting the average. A **rights issue** adds shares and the cost paid, so the average moves according to the price. Neither is a disposal.\n\nFor **companies** the matching rules differ and indexation is available, which is why the two must be kept apart.",
    earns: [
      "Knowing the 30 days runs forward and why the rule exists",
      "Treating the pool as an average cost rather than a queue",
    ],
    loses: ["Matching against acquisitions in the 30 days before the disposal"],
  },

  /* ── TX-18 · The CGT reliefs ──────────────────────────────── */

  "TX-18::prr": {
    title: "Computing private residence relief",
    format: "ot",
    marks: 2,
    requirement:
      "Private residence relief exempts the proportion of the gain relating to periods of:\n\nA  Actual occupation only\nB  Actual occupation, plus deemed occupation periods, plus the final period of ownership\nC  Ownership, regardless of occupation\nD  Letting",
    plan: [
      {
        step: "State the three components of qualifying occupation",
        detail:
          "ACTUAL occupation, DEEMED occupation periods, and the FINAL period of ownership which qualifies regardless of occupation. The relief is the qualifying months over total months of ownership.",
      },
      {
        step: "Name the deemed occupation periods",
        detail:
          "Up to three years for any reason, any period working abroad, and up to four years working elsewhere in the UK — each requiring a period of actual occupation before and, generally, after.",
      },
      {
        step: "Note the condition on the deemed periods",
        detail:
          "They must be sandwiched by actual occupation. A period of absence never followed by a return generally does not qualify, which is what the question usually turns on.",
      },
      {
        step: "Note the final period rule",
        detail:
          "The last months of ownership qualify regardless of occupation, so an owner who moves out before selling is not penalised for the delay in finding a buyer.",
      },
    ],
    answer:
      "**B — actual occupation, plus deemed occupation periods, plus the final period of ownership.**\n\nThe relief is the **qualifying months over total months of ownership**, applied to the gain. Three components qualify.\n\n**Actual** occupation. **Deemed** occupation — up to **three years for any reason**, any period **working abroad**, and up to **four years working elsewhere in the UK**. And the **final period** of ownership, which qualifies **regardless of occupation** so that an owner who moves out before selling is not penalised for the time taken to find a buyer.\n\nThe condition on the deemed periods is what most questions turn on: they must be **sandwiched by actual occupation** — a period of absence never followed by a return generally does **not** qualify. So the timeline in the stem has to be read for whether the taxpayer came back.\n\nWhere part of the house was **let**, that proportion of the gain is not covered by the main relief, and **letting relief** is now available only where the owner was in **shared occupation** with the tenant.\n\nBusiness use of part of the property also restricts the relief for that part.",
    earns: [
      "Naming all three components and the sandwich condition on deemed occupation",
      "Knowing letting relief now requires shared occupation",
    ],
    loses: ["Relieving a period of absence that was never followed by a return"],
  },

  "TX-18::business-reliefs": {
    title: "Choosing between the business reliefs",
    format: "ot",
    marks: 2,
    requirement:
      "Gift relief (holdover relief) on a gift of qualifying business assets works by:\n\nA  Exempting the gain entirely\nB  Deferring the gain by reducing the donee's base cost by the held-over gain\nC  Taxing the gain at a lower rate\nD  Deferring the gain until the donor's death",
    plan: [
      {
        step: "Distinguish exemption from deferral",
        detail:
          "Gift relief DEFERS. The donor's gain is held over and the DONEE's base cost is reduced by it, so the gain is taxed when the donee eventually disposes of the asset.",
      },
      {
        step: "Note who bears the deferred gain",
        detail:
          "The donee. That is the point a full answer must make — the relief transfers a tax liability to the recipient, so a joint claim is required and the donee should understand what they are accepting.",
      },
      {
        step: "Contrast with business asset disposal relief",
        detail:
          "BADR does not defer: it charges the gain at a LOWER rate, subject to a lifetime limit and to qualifying conditions on the asset, the holding and the period of ownership.",
      },
      {
        step: "Contrast with rollover relief",
        detail:
          "Rollover defers a gain on a business asset SOLD, by reinvesting the proceeds in a replacement qualifying asset within a window — the deferral attaches to the new asset's base cost.",
      },
    ],
    answer:
      "**B — deferring the gain by reducing the donee's base cost by the held-over gain.**\n\nGift relief **defers** rather than exempts. The donor's gain is **held over** and the **donee's base cost is reduced** by it, so the gain is taxed when the donee eventually disposes of the asset.\n\nWho bears it is the point a full answer must make: the **donee**. The relief transfers a tax liability to the recipient, which is why a **joint claim** by donor and donee is required — and why advising a client to make the gift without explaining that to the donee is incomplete advice.\n\nThe three business reliefs do different things and are frequently confused:\n\n**Gift relief** — defers a gain on a **gift** of qualifying business assets, onto the donee's base cost.\n**Rollover relief** — defers a gain on a business asset **sold**, by reinvesting the proceeds in a replacement qualifying asset within a window, onto the new asset's base cost.\n**Business asset disposal relief** — does **not** defer: it charges the gain at a **lower rate**, subject to a **lifetime limit** and to conditions on the asset, the size of the holding and the period of ownership.\n\nSo the first question in a reliefs problem is whether the asset was **given** or **sold**, because that alone rules out one of the three.",
    earns: [
      "Distinguishing deferral from a lower rate, and knowing the donee inherits the liability",
      "Splitting the three reliefs on gift versus sale",
    ],
    loses: ["Treating gift relief as an exemption, which leaves the donee's position unexplained"],
  },

  /* ── TX-19 · IHT: lifetime transfers ─────────────────────── */

  "TX-19::transfers-and-exemptions": {
    title: "Classifying a lifetime transfer",
    format: "ot",
    marks: 2,
    requirement:
      "A gift by an individual to a trust during their lifetime is:\n\nA  A potentially exempt transfer\nB  A chargeable lifetime transfer, potentially attracting tax immediately\nC  Exempt in all cases\nD  Chargeable only on death",
    plan: [
      {
        step: "Split lifetime transfers into the two kinds",
        detail:
          "A POTENTIALLY EXEMPT TRANSFER is a gift to an individual: no tax now, and it becomes exempt if the donor survives seven years. A CHARGEABLE LIFETIME TRANSFER is a gift to most trusts: tax may be due immediately.",
      },
      {
        step: "Match the stem",
        detail:
          "A gift to a trust is a chargeable lifetime transfer, so lifetime tax may arise at the time of the gift — which is what distinguishes it from a gift to a person.",
      },
      {
        step: "Note that both are revisited on death within seven years",
        detail:
          "A PET becomes chargeable if the donor dies within seven years. A CLT is recomputed at the death rate, with credit for the lifetime tax already paid. Neither escapes death review.",
      },
      {
        step: "Recall the exemptions that apply before either classification bites",
        detail:
          "Transfers between spouses, the annual exemption with one year's carry forward, small gifts, gifts on marriage, and normal expenditure out of income. Apply exemptions first, then classify what remains.",
      },
    ],
    answer:
      "**B — a chargeable lifetime transfer, potentially attracting tax immediately.**\n\nLifetime transfers divide in two. A **potentially exempt transfer** is a gift to an **individual**: no tax at the time, and it becomes **fully exempt if the donor survives seven years**. A **chargeable lifetime transfer** is a gift to most **trusts**: **lifetime tax may be due at the time of the gift**, at the lifetime rate.\n\nSo the classification turns on **who receives it**, and that is the first question in any IHT problem.\n\nBoth are revisited on death within seven years. A **PET becomes chargeable**. A **CLT is recomputed at the death rate**, with **credit** for the lifetime tax already paid — but the credit cannot create a repayment.\n\nThe **exemptions** apply **before** either classification bites, and applying them in the wrong place is a structural error that corrupts everything after it: transfers between **spouses**, the **annual exemption** with one year's carry forward, **small gifts**, gifts **on marriage**, and **normal expenditure out of income**.\n\nSo the sequence is: deduct exemptions, classify what remains, then compute.",
    earns: [
      "Classifying on who receives the transfer, and applying exemptions before classifying",
      "Knowing both kinds are revisited on death within seven years",
    ],
    loses: ["Treating a gift to a trust as potentially exempt, which defers tax that is due now"],
  },

  "TX-19::computing-the-tax": {
    title: "The seven-year cumulation and the nil rate band",
    format: "ot",
    marks: 2,
    requirement:
      "In computing the tax on a chargeable lifetime transfer, the nil rate band available is reduced by:\n\nA  All previous transfers of any kind\nB  Chargeable transfers made in the seven years before the current transfer\nC  Transfers made in the seven years after the current transfer\nD  The taxpayer's total lifetime gifts",
    plan: [
      {
        step: "State what the cumulation looks at",
        detail:
          "Chargeable transfers in the seven years BEFORE the current transfer. The band available is the full band less those earlier transfers, so it is a rolling seven-year window.",
      },
      {
        step: "Note the direction, since it is the error the question tests",
        detail:
          "Backwards, not forwards. Option C reverses it, and reversing the direction produces a wholly different band and therefore a wholly different tax.",
      },
      {
        step: "Note which transfers enter the cumulation",
        detail:
          "CHARGEABLE transfers. A PET that has not become chargeable does not use up the band while the donor is alive, so it is excluded from a lifetime computation.",
      },
      {
        step: "Note the grossing up point",
        detail:
          "Where the DONOR pays the lifetime tax, the transfer must be GROSSED UP, because the tax paid is itself a further reduction in the donor's estate. Where the trustees pay, no grossing up arises.",
      },
    ],
    answer:
      "**B — chargeable transfers made in the seven years before the current transfer.**\n\nThe cumulation looks **backwards** over a rolling **seven-year window**: the band available is the full band less chargeable transfers in the seven years before the current one.\n\nOption C reverses the direction, and reversing it produces a different band and therefore a different tax — which is why establishing the direction before computing anything is the first step.\n\nOnly **chargeable** transfers enter the cumulation. A **PET that has not become chargeable** does not use up the band while the donor is alive, so it is **excluded** from a lifetime computation — and including it is a common structural error.\n\nThe **grossing up** point is where marks are most often lost. Where the **donor** pays the lifetime tax, the transfer must be **grossed up**, because the tax the donor pays is itself a further reduction in their estate. Where the **trustees** pay, no grossing up arises and the tax is computed on the transfer as made.\n\nSo the question \"who pays the tax?\" has to be answered before the computation starts, and a stem stating it is telling you which method to use.",
    earns: [
      "Establishing the seven-year direction before computing, and excluding unchargeable PETs",
      "Asking who pays the tax, since that determines whether to gross up",
    ],
    loses: ["Cumulating forward, or grossing up where the trustees are paying"],
  },

  /* ── TX-20 · IHT: the death estate and planning ──────────── */

  "TX-20::the-estate": {
    title: "Valuing the death estate and applying the bands",
    format: "ot",
    marks: 2,
    requirement:
      "In computing the inheritance tax on a death estate, the residence nil rate band is available where:\n\nA  Any property is included in the estate\nB  A residence is left to direct descendants, subject to tapering for large estates\nC  The deceased owned a residence at any time\nD  The estate exceeds the nil rate band",
    plan: [
      {
        step: "State the two conditions on the residence nil rate band",
        detail:
          "A residence must be included in the estate, AND it must pass to DIRECT DESCENDANTS — children, grandchildren and their spouses. Both conditions are required.",
      },
      {
        step: "Note the taper",
        detail:
          "The band is tapered where the net estate exceeds a threshold, reducing to nil for a large estate. So it is not available to every estate that includes a home.",
      },
      {
        step: "Note the transferable element",
        detail:
          "Any unused nil rate band and residence nil rate band transfer to a surviving spouse, so a couple can have up to double each. This is what makes spousal planning so effective.",
      },
      {
        step: "Note the order of application",
        detail:
          "The residence nil rate band is applied FIRST against the residence, then the ordinary nil rate band against the rest of the estate, then the death rate on the balance.",
      },
    ],
    answer:
      "**B — a residence is left to direct descendants, subject to tapering for large estates.**\n\nTwo conditions, both required: a **residence** must be included in the estate, **and** it must pass to **direct descendants** — children, grandchildren, and their spouses. A residence left to a sibling does not qualify, which is why option A is insufficient.\n\nThe band is **tapered** where the net estate exceeds a threshold, reducing to nil for a large estate — so it is not available to every estate containing a home.\n\nThe **transferable** element is what makes spousal planning so effective: any **unused** nil rate band **and** unused residence nil rate band **transfer to a surviving spouse**, so a couple can have up to double each available on the second death. That is the single most valuable planning point in the area.\n\nThe **order of application** matters for the computation: the residence nil rate band is applied **first against the residence**, then the ordinary nil rate band against the rest of the estate, then the death rate on the balance.\n\nThe estate is valued at **market value at death**, less debts and funeral expenses. A **transfer to a spouse is exempt**, and a reduced death rate applies where a sufficient proportion of the estate passes to charity.",
    earns: [
      "Requiring both conditions and knowing the band tapers",
      "Naming the transferable bands as the key planning point, and the order of application",
    ],
    loses: ["Allowing the residence band where the property passes to someone other than a descendant"],
  },

  "TX-20::planning": {
    title: "Basic inheritance tax planning",
    format: "ot",
    marks: 2,
    requirement:
      "Which is the most effective basic inheritance tax planning step for a married couple?\n\nA  Leaving everything to the surviving spouse and nothing to the children\nB  Making use of both spouses' nil rate bands, including the transferable unused band, and making lifetime gifts early\nC  Making a single large gift immediately before death\nD  Holding all assets in one spouse's name",
    plan: [
      {
        step: "Identify the two mechanisms available to a couple",
        detail:
          "Both nil rate bands, including the transferable unused band on the second death. And lifetime gifts, which become exempt if the donor survives seven years.",
      },
      {
        step: "See why timing is the whole point of lifetime gifting",
        detail:
          "A PET needs seven years to become exempt, so gifts made EARLY work and gifts made late do not. Option C is the opposite of the advice.",
      },
      {
        step: "Test the leave-everything-to-the-spouse option",
        detail:
          "It is not wrong — the spouse exemption defers tax and the unused band transfers — but it does not by itself use the reliefs efficiently, and it defers rather than reduces.",
      },
      {
        step: "Note the tapering relief on death within seven years",
        detail:
          "Where death occurs between three and seven years after a PET, the tax on it is reduced by taper. So a gift that has survived four years is already partly worthwhile.",
      },
    ],
    answer:
      "**B — making use of both spouses' nil rate bands, including the transferable unused band, and making lifetime gifts early.**\n\nA married couple has two mechanisms. **Both nil rate bands**, with any unused band and unused residence nil rate band **transferring** to the survivor — so a couple can have up to double each available on the second death. And **lifetime gifts**, which become **fully exempt** if the donor survives **seven years**.\n\n**Timing** is the whole point of lifetime gifting, which is why option C is the opposite of the advice: a gift made immediately before death achieves almost nothing, since the PET becomes chargeable in full. Gifts made **early** work.\n\n**Taper relief** softens the middle ground: where death occurs between **three and seven years** after a PET, the tax on it is **reduced**. So a gift that has survived four years is already partly worthwhile even if the donor does not reach seven.\n\nOption A is not wrong so much as incomplete — the spouse exemption **defers** tax and the unused band transfers, but on its own it does not use the reliefs efficiently.\n\nThe other planning tools: using the **annual exemption** every year, **normal expenditure out of income**, gifts on **marriage**, and **business and agricultural property relief** where the assets qualify.",
    earns: [
      "Naming both mechanisms and explaining why timing decides whether a lifetime gift works",
      "Knowing taper relief makes a partially-survived gift still worthwhile",
    ],
    loses: ["Recommending a deathbed gift, which is when a PET is least effective"],
  },
}
