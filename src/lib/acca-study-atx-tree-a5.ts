import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * ATX-UK · Area A, part five — overseas corporation tax and special companies
 * (A4), stamp taxes (A5), and VAT with tax administration (A6).
 *
 *   ATX-17  Overseas aspects of corporation tax   (A4 overseas)
 *   ATX-18  Special types of company and reliefs  (A4 special)
 *   ATX-19  Stamp taxes                           (A5)
 *   ATX-20  VAT, administration and the tax system (A6)
 *
 * See acca-study-atx-tree-a.ts for the Finance Act 2025 and rates rules
 * governing this whole paper.
 */

const ATX_TREE_17: StudyChapter = {
  paper: "ATX",
  id: "ATX-17",
  number: 17,
  area: "A",
  syllabusRefs: ["A4(c)"],
  title: "Overseas aspects of corporation tax",
  minutes: 17,
  intro:
    "Expanding abroad raises one structural question before any computation: branch or subsidiary? The answer turns on where the losses will be and how long they will last.",
  outcomes: [
    "Determine a company's residence and the consequences of it",
    "Compare trading abroad through a branch with using a subsidiary",
    "Explain the treatment of an overseas branch and the exemption election",
    "Apply double tax relief to a company's overseas income",
    "Outline the controlled foreign company rules and transfer pricing",
  ],
  sections: [
    {
      id: "branch-or-subsidiary",
      heading: "Branch or subsidiary",
      blocks: [
        {
          kind: "text",
          md: "A **branch** is part of the UK company, so its results form part of the UK company's own profits. A **subsidiary** is a separate company, usually resident abroad, whose profits are not the UK company's at all. That single structural difference produces every consequence below.",
        },
        {
          kind: "table",
          caption: "The comparison",
          head: ["", "Overseas branch", "Overseas subsidiary"],
          rows: [
            ["Profits", "Included in UK taxable total profits, with double tax relief", "Outside UK corporation tax; only dividends flow back"],
            ["Losses", "Relievable against UK profits immediately", "Trapped in the subsidiary, relievable only there"],
            ["Capital allowances", "Available on the branch's plant", "Not available to the UK company"],
            ["Later flexibility", "Can be incorporated later", "Harder to unwind"],
            ["Exemption", "An election can exempt branch profits — irrevocable, and it exempts losses too", "Not applicable"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The standard advice, and why it is standard",
          md: "Start as a **branch** while the venture is loss-making, so the losses relieve UK profits immediately, then **incorporate** once it turns profitable so the profits sit outside the UK charge. That sequence uses each structure where it is worth most, and recognising it is one of the most reliable planning marks in the corporation tax part of the paper.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The branch exemption election is irrevocable and symmetric",
          md: "A company can elect to exempt the profits of **all** its overseas branches — but the election is **irrevocable**, applies to every branch, and exempts **losses** as well as profits. So making it while a branch is still loss-making throws away the relief that made the branch attractive in the first place. The timing of the election is the examinable judgement.",
        },
      ],
      check: {
        q: "A UK company plans an overseas venture expected to make losses for three years and profits thereafter. What structure should be advised?",
        options: [
          "A subsidiary from the outset, to ring-fence the losses",
          "A branch initially, so the losses relieve UK profits immediately, then incorporate once it becomes profitable — and do not make the branch exemption election while losses are still arising",
          "A branch throughout, with the exemption election made at once",
          "Neither; the venture should be delayed",
        ],
        correct: 1,
        explain:
          "Losses in a subsidiary are trapped abroad and may take years to use, whereas branch losses reduce UK profits now. Once the venture turns profitable the reverse applies, so the sequence captures both benefits — provided the exemption election is not made prematurely, since it would exempt the losses too.",
      },
    },
    {
      id: "anti-avoidance",
      heading: "Double tax relief, controlled foreign companies and transfer pricing",
      blocks: [
        {
          kind: "text",
          md: "**Double tax relief** for a company works as it does for an individual: the lower of the UK tax on the overseas source and the overseas tax suffered, computed source by source. Unrelieved foreign tax is generally lost, so overseas income should be treated as the top slice where the computation allows.",
        },
        {
          kind: "table",
          caption: "The two anti-avoidance regimes to know",
          head: ["Regime", "The problem it addresses", "Effect"],
          rows: [
            ["Controlled foreign companies", "Profits artificially diverted to a low-tax subsidiary abroad", "Apportions those profits back to the UK parent and charges them, with exemptions for genuine commercial operations"],
            ["Transfer pricing", "Prices between connected companies set to move profit out of the UK", "Requires arm's length pricing, with adjustment and documentation requirements; small and medium enterprises are generally exempt"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The theme both share",
          md: "Each regime attacks arrangements with **no commercial substance beyond the tax saving**. A genuine overseas operation with real people, real functions and real risk is generally outside them; a company existing only to hold a licence and receive royalties is not. That distinction — substance rather than form — is also the ethical dividing line Area C examines, and connecting the two earns marks.",
        },
        {
          kind: "text",
          md: "For transfer pricing, the practical advice is about **documentation**: prices must be defensible as arm's length, and the burden of showing that falls on the taxpayer. So a group setting intra-group prices should record the basis contemporaneously rather than reconstructing it during an enquiry, and the exemption for smaller enterprises should be checked before the burden is assumed.",
        },
      ],
      check: {
        q: "A UK group establishes a company in a low-tax jurisdiction with one employee, to receive royalties for intellectual property developed and still managed in the UK. What is the concern?",
        options: [
          "None, provided the company is properly incorporated",
          "The controlled foreign company rules are likely to apportion the profits back to the UK, because the arrangement has little commercial substance — the functions, people and risk remain in the UK while the profit does not",
          "Transfer pricing does not apply to intellectual property",
          "The royalties will simply be exempt in the UK",
        ],
        correct: 1,
        explain:
          "The regime targets precisely this: profit separated from the activity generating it. Where the development, management and risk stay in the UK, a single employee abroad does not give the arrangement substance — and transfer pricing would independently challenge the royalty rate.",
      },
    },
  ],
  examTraps: [
    { trap: "Recommending a subsidiary for a loss-making venture.", fix: "Branch losses relieve UK profits immediately; subsidiary losses are trapped abroad." },
    { trap: "Electing for branch exemption while losses arise.", fix: "The election is irrevocable, covers all branches, and exempts losses too." },
    { trap: "Treating any low-tax structure as effective.", fix: "Controlled foreign company rules and transfer pricing attack arrangements lacking substance." },
    { trap: "Assuming transfer pricing applies to every group.", fix: "Smaller enterprises are generally exempt — check before assuming the burden." },
  ],
  keyTerms: [
    { term: "Permanent establishment", def: "A fixed place of business through which a company trades in another country, whose profits are generally taxable there." },
    { term: "Branch exemption election", def: "An irrevocable election exempting the profits — and losses — of all a company's overseas branches from UK corporation tax." },
    { term: "Controlled foreign company", def: "A low-taxed overseas company controlled from the UK, whose artificially diverted profits can be apportioned back and charged." },
  ],
  summary: [
    "Branch profits and losses are the UK company's; a subsidiary's are its own.",
    "Branch first while loss-making, incorporate when profitable — the standard sequence.",
    "The branch exemption election is irrevocable, universal and exempts losses.",
    "Both anti-avoidance regimes attack arrangements without commercial substance.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does a loss-making venture favour a branch?", a: "Branch losses form part of the UK company's results and relieve UK profits immediately, whereas subsidiary losses are trapped in the overseas company." },
    { q: "What makes the branch exemption election dangerous?", a: "It is irrevocable, applies to all branches, and exempts losses as well as profits." },
    { q: "What do the controlled foreign company and transfer pricing regimes have in common?", a: "Both attack arrangements whose only purpose is tax, where profit has been separated from the substance generating it." },
  ],
  furtherStudy: [
    "ATX-15 covers the loss reliefs branch losses feed into.",
    "ATX-16 covers whether an overseas company can join a UK group.",
    "Area C covers the ethical line between planning and avoidance that these regimes police.",
  ],
}

const ATX_TREE_18: StudyChapter = {
  paper: "ATX",
  id: "ATX-18",
  number: 18,
  area: "A",
  syllabusRefs: ["A4(d)"],
  title: "Special types of company and additional reliefs",
  minutes: 15,
  intro:
    "A handful of company types and reliefs sit outside the general rules, and each exists to make a specific behaviour cheaper. Knowing which behaviour is the point.",
  outcomes: [
    "Identify the treatment of close companies and the charge on loans to participators",
    "Explain the consequences of being an investment company rather than a trading company",
    "Outline research and development relief and what qualifies",
    "Identify the treatment of intangible fixed assets",
    "Recognise where a company's status changes the reliefs available to its shareholders",
  ],
  sections: [
    {
      id: "close-companies",
      heading: "Close companies",
      blocks: [
        {
          kind: "text",
          md: "A **close company** is one controlled by a small number of participators — broadly five or fewer, or by its directors. Most owner-managed companies are close, so the rules apply far more often than candidates expect.",
        },
        {
          kind: "table",
          caption: "The two consequences that matter",
          head: ["Situation", "Consequence"],
          rows: [
            ["A loan to a participator", "The company must pay a charge on the amount lent, refundable when the loan is repaid or written off"],
            ["The loan is written off", "Treated as a distribution — taxed on the participator as a dividend, and the company's charge is repaid"],
            ["A benefit provided to a participator who is not an employee", "Treated as a distribution rather than an employment benefit"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The director's loan account is the classic scenario",
          md: "An owner-manager who draws money from their company during the year, expecting to declare a dividend later, has taken a **loan to a participator**. If it is still outstanding at the relevant date the company pays the charge — real cash, temporarily lost — and if it is written off the participator is taxed as though it were a dividend. Advising the client to clear the account in time, or to formalise the drawings as salary or dividend when taken, is a practical and frequently examined recommendation.",
        },
      ],
      check: {
        q: "An owner-manager withdraws money from their close company throughout the year with no formal salary or dividend. What is the position?",
        options: [
          "Nothing arises until a dividend is declared",
          "The drawings are a loan to a participator, so the company faces a charge on any amount still outstanding at the relevant date — refundable on repayment, but a real cash cost meanwhile, and a write-off would be taxed on them as a distribution",
          "The drawings are automatically treated as salary",
          "Close company rules apply only to quoted companies",
        ],
        correct: 1,
        explain:
          "Informal drawings are a loan whatever the intention, and the charge is on the company. The practical advice is to clear the account within the permitted period or to formalise the extraction at the time — which also lets the salary-versus-dividend comparison be made properly.",
      },
    },
    {
      id: "reliefs",
      heading: "Reliefs that reward specific behaviour",
      blocks: [
        {
          kind: "table",
          caption: "The reliefs to recognise",
          head: ["Relief", "What it rewards", "The condition that decides it"],
          rows: [
            ["Research and development relief", "Advancing science or technology, resolving genuine uncertainty", "Routine improvement and cosmetic change do not qualify — the advance must be more than an increment"],
            ["Intangible fixed assets regime", "Acquisition and creation of intangibles such as goodwill and intellectual property", "Relief follows the accounting treatment; debits and credits are trading in nature where the asset is used in the trade"],
            ["Rollover relief on intangibles", "Reinvestment in replacement intangible assets", "A separate regime from the capital gains rollover relief for tangible assets"],
            ["Substantial shareholding exemption", "Disposals of substantial trading company shareholdings by companies", "Exempts the gain entirely where the conditions on holding size, period and trading status are met"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The substantial shareholding exemption changes deal structure",
          md: "Where a company sells shares in a trading subsidiary and the conditions are met, the gain is **exempt** — not deferred, exempt. That is why a corporate seller usually prefers to sell **shares** while a buyer usually prefers to buy **assets**, since the buyer wants a base cost uplift and does not want the target's history. Identifying that tension, and the price adjustment it produces, is a strong commercial acumen point.",
        },
        {
          kind: "text",
          md: "**Research and development** relief is examined mostly through its qualifying condition. The activity must seek an advance in science or technology by resolving scientific or technological uncertainty — so developing a genuinely new process qualifies while a cosmetic redesign, a routine software update or a market-research exercise does not. Where a scenario lists several projects, the examinable step is sorting them rather than computing the relief.",
        },
      ],
      check: {
        q: "A company sells its subsidiary. Why might the seller and buyer disagree about whether to sell shares or assets?",
        options: [
          "There is no tax difference between the two",
          "The seller prefers a share sale, where the substantial shareholding exemption can make the gain exempt, while the buyer prefers an asset purchase for a base cost uplift and to avoid inheriting the target's liabilities and history",
          "The buyer always prefers a share purchase",
          "Asset sales are not permitted between companies",
        ],
        correct: 1,
        explain:
          "The two preferences are genuinely opposed and both are rational, which is why the structure is negotiated and usually reflected in the price. Recognising the tension — rather than simply stating the exemption — is what earns the commercial marks.",
      },
    },
  ],
  examTraps: [
    { trap: "Overlooking close company status.", fix: "Most owner-managed companies are close, so the loan and benefit rules apply." },
    { trap: "Treating informal drawings as a dividend.", fix: "They are a loan to a participator until formally declared otherwise." },
    { trap: "Claiming research and development relief for routine work.", fix: "It requires an advance in science or technology resolving genuine uncertainty." },
    { trap: "Assuming buyer and seller want the same deal structure.", fix: "The substantial shareholding exemption pulls them in opposite directions." },
  ],
  keyTerms: [
    { term: "Close company", def: "A company controlled by five or fewer participators or by its directors, subject to specific rules on loans and benefits to participators." },
    { term: "Loan to a participator", def: "An advance from a close company to a shareholder, triggering a refundable charge on the company while it remains outstanding." },
    { term: "Substantial shareholding exemption", def: "An exemption for gains on the disposal by a company of a substantial shareholding in a trading company, where the conditions are met." },
  ],
  summary: [
    "Most owner-managed companies are close, so the loan to participator charge applies frequently.",
    "Informal drawings are loans; formalise or clear them in time.",
    "Research and development relief needs a genuine technological advance, not routine improvement.",
    "The substantial shareholding exemption makes sellers prefer shares and buyers prefer assets.",
  ],
  knowledgeDiagnostic: [
    { q: "What happens when a loan to a participator is written off?", a: "It is treated as a distribution and taxed on the participator as a dividend, and the company's charge is repaid." },
    { q: "What must research and development activity achieve to qualify?", a: "An advance in science or technology through the resolution of genuine scientific or technological uncertainty." },
    { q: "Why does the substantial shareholding exemption create tension in a deal?", a: "It makes a share sale attractive to a corporate seller, while a buyer prefers assets for the base cost uplift and to avoid inherited liabilities." },
  ],
  furtherStudy: [
    "ATX-02 covers the salary-versus-dividend comparison the loan account scenario leads into.",
    "ATX-16 covers groups, within which the substantial shareholding exemption usually arises.",
    "Area B covers the sale of a business as a transaction engaging several taxes at once.",
  ],
}

const ATX_TREE_19: StudyChapter = {
  paper: "ATX",
  id: "ATX-19",
  number: 19,
  area: "A",
  syllabusRefs: ["A5"],
  title: "Stamp taxes",
  minutes: 13,
  intro:
    "A small topic that appears constantly, because almost every transaction ATX examines involves transferring shares or land — and the buyer pays.",
  outcomes: [
    "Distinguish stamp duty on shares from the land transaction tax",
    "Identify who bears stamp taxes and on what amount",
    "Apply the group relief available on intra-group transfers",
    "Recognise the effect of stamp taxes on choosing between a share sale and an asset sale",
    "Identify the compliance obligations and their deadlines",
  ],
  sections: [
    {
      id: "the-charges",
      heading: "The two charges",
      blocks: [
        {
          kind: "table",
          caption: "Shares and land",
          head: ["", "Transfers of shares", "Transfers of land"],
          rows: [
            ["Charged on", "The consideration given", "The consideration, on a banded basis"],
            ["Paid by", "The purchaser", "The purchaser"],
            ["Rate structure", "A single low percentage", "Progressive bands, with different scales for residential and non-residential property"],
            ["Exemptions", "Transfers below a small threshold; gifts", "Certain reliefs and thresholds"],
            ["Group relief", "Available on intra-group transfers, subject to conditions", "Available, but clawed back if the company leaves the group within a defined period"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why stamp taxes decide deal structure more often than they should",
          md: "The rate on **shares** is materially lower than the rate on **land**. So where a property-owning company is being sold, buying the shares can cost far less in stamp taxes than buying the property directly — which pulls against the buyer's other preference for an asset purchase. Setting that tension out, alongside the substantial shareholding exemption from ATX-18, is how a share-versus-asset requirement should be answered.",
        },
        {
          kind: "text",
          md: "**The purchaser pays** in both cases, which matters for advice: a seller indifferent between structures is not the party bearing this cost, so the point belongs in the negotiation and usually in the price. And **gifts** generally escape the charge because there is no consideration — so a transaction structured as a gift for other reasons may carry an incidental stamp tax saving worth mentioning.",
        },
      ],
      check: {
        q: "A buyer is acquiring a company whose main asset is a commercial property. Why might the stamp tax position favour a share purchase?",
        options: [
          "Share purchases are exempt from all stamp taxes",
          "The rate charged on transfers of shares is materially lower than the rate on transfers of land, so acquiring the company can cost far less than acquiring the property directly — though this pulls against the buyer's preference for an asset purchase on other grounds",
          "The seller pays the stamp tax on shares",
          "Land transactions between companies are exempt",
        ],
        correct: 1,
        explain:
          "The rate differential is the point, and it is why property-rich companies are so often sold as companies. The complete answer notes that it conflicts with the buyer's wish for a base cost uplift and a clean liability history, so the structure is a negotiation rather than a calculation.",
      },
    },
    {
      id: "groups-compliance",
      heading: "Group relief and compliance",
      blocks: [
        {
          kind: "text",
          md: "**Intra-group transfers** can be relieved, since moving an asset between companies under common control is not a commercial sale. The relief is conditional, and — as with the capital gains degrouping charge — it is **clawed back** if the transferee leaves the group within a defined period still holding the asset.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The same trap, in a second tax",
          md: "Transferring a property into a subsidiary and then selling that subsidiary can trigger **both** a capital gains degrouping charge and a stamp tax clawback. Candidates who spot one frequently miss the other. When a scenario moves an asset within a group shortly before a sale, check both — that pairing is a deliberate examiner construction.",
        },
        {
          kind: "text",
          md: "**Compliance** carries its own deadlines: a return and payment are due within a short period of the effective date of a land transaction, independently of any other filing, and penalties and interest run from that date. As elsewhere in this paper, the deadline is part of the advice.",
        },
      ],
      check: {
        q: "A group transfers a property to a subsidiary claiming stamp tax group relief, then sells the subsidiary eighteen months later. What should be checked?",
        options: [
          "Only the capital gains degrouping charge",
          "Both the stamp tax clawback, since the transferee has left the group within the relevant period still holding the asset, and the capital gains degrouping charge — the same fact pattern triggers two separate charges",
          "Neither, as group relief is unconditional",
          "Only the stamp tax clawback",
        ],
        correct: 1,
        explain:
          "The two regimes police the same behaviour independently, so the arrangement is caught twice. Identifying both is what separates a complete answer, and it is why the scenario places the transfer shortly before the sale.",
      },
    },
  ],
  examTraps: [
    { trap: "Charging stamp taxes to the seller.", fix: "The purchaser bears them, so the point belongs in the negotiation and the price." },
    { trap: "Ignoring stamp taxes in a share-versus-asset comparison.", fix: "The rate differential often decides the structure for a property-rich company." },
    { trap: "Spotting the capital gains degrouping charge and missing the stamp tax clawback.", fix: "The same pre-sale transfer triggers both." },
    { trap: "Omitting the filing deadline.", fix: "A return and payment are due shortly after the effective date, with penalties running independently." },
  ],
  keyTerms: [
    { term: "Stamp tax group relief", def: "Relief from stamp taxes on transfers between companies under common control, clawed back if the transferee leaves the group within a defined period." },
    { term: "Effective date", def: "The date from which the land transaction filing and payment deadline runs, usually completion or earlier substantial performance." },
  ],
  summary: [
    "The purchaser bears stamp taxes on both shares and land.",
    "The share rate is much lower than the land rate, which shapes deal structure.",
    "Intra-group relief is clawed back if the transferee leaves the group holding the asset.",
    "A pre-sale intra-group transfer can trigger both a degrouping charge and a stamp tax clawback.",
  ],
  knowledgeDiagnostic: [
    { q: "Who pays stamp taxes?", a: "The purchaser, on both share and land transactions." },
    { q: "Why are property-rich companies often sold as companies?", a: "The rate on share transfers is materially lower than on land transfers, so the stamp tax cost is much smaller." },
    { q: "What two charges can a pre-sale intra-group property transfer trigger?", a: "A capital gains degrouping charge and a stamp tax group relief clawback." },
  ],
  furtherStudy: [
    "ATX-18 covers the substantial shareholding exemption, the other half of the share-versus-asset decision.",
    "ATX-16 covers the capital gains degrouping charge that pairs with the clawback here.",
    "Area B covers the sale of a business as a multi-tax transaction.",
  ],
}

const ATX_TREE_20: StudyChapter = {
  paper: "ATX",
  id: "ATX-20",
  number: 20,
  area: "A",
  syllabusRefs: ["A6"],
  title: "VAT, administration and the tax system",
  minutes: 17,
  intro:
    "The tax most likely to be forgotten in a scenario about something else — and the compliance framework whose deadlines cost money whatever the underlying liability.",
  outcomes: [
    "Identify the VAT consequences of transactions ATX examines",
    "Explain the treatment of a transfer of a going concern",
    "Apply the partial exemption and capital goods considerations at an outline level",
    "State the self-assessment obligations, deadlines and penalty structure for individuals and companies",
    "Explain HMRC's powers of enquiry and the taxpayer's rights",
  ],
  sections: [
    {
      id: "vat",
      heading: "VAT in an ATX scenario",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "VAT is the tax candidates forget",
          md: "It rarely gets its own requirement, but it attaches to transactions the requirement is about: selling a business, transferring property, incorporating, expanding overseas, or a group restructuring. A scenario involving any of those has a VAT consequence, and a sentence identifying it is often worth a mark that most candidates never claim.",
        },
        {
          kind: "table",
          caption: "The VAT points that recur",
          head: ["Transaction", "VAT consequence"],
          rows: [
            ["Sale of a business as a going concern", "Outside the scope if the conditions are met — no VAT charged, which materially affects the cash needed to complete"],
            ["Sale of an asset alone", "Standard rated unless an exemption applies, so VAT must be funded even if recoverable"],
            ["Commercial property", "Exempt unless the option to tax has been exercised, which makes it standard rated"],
            ["Group registration", "Supplies within the VAT group are disregarded, simplifying administration but making members jointly liable"],
            ["Partial exemption", "A business making exempt supplies cannot recover all its input tax, so the exempt activity carries a hidden cost"],
          ],
        },
        {
          kind: "text",
          md: "The **transfer of a going concern** rules matter commercially rather than technically: where they apply, no VAT is charged, so the buyer does not need to find the cash and reclaim it months later. Where they do not, the buyer funds the VAT in the interim. Since the conditions include the buyer being registered and continuing the same kind of business, checking them before completion is a practical recommendation.",
        },
      ],
      check: {
        q: "A client is buying a business as a going concern and asks whether they need to fund VAT on the purchase price. What is the answer?",
        options: [
          "Yes, VAT is always charged on a business sale",
          "If the transfer of a going concern conditions are met the sale is outside the scope, so no VAT is charged — which is a real cash flow advantage, and the conditions should be confirmed before completion",
          "No, business sales are always exempt",
          "Only the property element attracts VAT",
        ],
        correct: 1,
        explain:
          "The rules exist to avoid VAT being charged and reclaimed on a transaction that changes nothing economically. Since the treatment depends on conditions — including the buyer's registration and continuation of the business — confirming them beforehand is the practical advice.",
      },
    },
    {
      id: "administration",
      heading: "Self-assessment, penalties and enquiries",
      blocks: [
        {
          kind: "table",
          caption: "The compliance framework",
          head: ["", "Individuals", "Companies"],
          rows: [
            ["Return", "Filed after the tax year, with an earlier deadline on paper than online", "Filed within twelve months of the end of the accounting period"],
            ["Payment", "Payments on account during the year plus a balancing payment", "Nine months and a day after the period end, or quarterly instalments if large"],
            ["Records", "Retained for a defined period, longer for a business", "Retained for a defined period from the end of the period"],
            ["Enquiry window", "A fixed period from the filing date, extended where a return is late", "The same principle from the filing date"],
            ["Discovery", "A longer window where an error was careless or deliberate", "The same, with the window lengthening with culpability"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Penalties scale with behaviour, not with the amount",
          md: "The penalty for an inaccuracy depends on whether it was **careless**, **deliberate**, or **deliberate and concealed**, and is reduced for **unprompted** disclosure far more than for prompted disclosure. So the single most valuable thing an adviser can do on discovering an error is to disclose it **before HMRC asks**. That is a practical, examinable recommendation and it connects directly to the ethics marks in Area C.",
        },
        {
          kind: "text",
          md: "The **enquiry** framework matters for advice because it defines how long a position stays open. HMRC may open an enquiry within a window running from the filing date; once it closes, the return is generally final unless a **discovery** applies — and the discovery window lengthens where the taxpayer was careless or deliberate. So a client asking how long they must keep records, or how long a filed position remains challengeable, is asking about this framework.",
        },
      ],
      check: {
        q: "An adviser discovers a material error in a client's filed return. What is the most important immediate consideration?",
        options: [
          "Waiting to see whether HMRC opens an enquiry",
          "Disclosing promptly and unprompted, because penalties depend on behaviour and are reduced substantially more for unprompted disclosure than for disclosure prompted by an HMRC enquiry",
          "Amending the following year's return instead",
          "Nothing, since the enquiry window may expire",
        ],
        correct: 1,
        explain:
          "The reduction for unprompted disclosure is the largest single lever over the penalty, and it disappears the moment HMRC makes contact. Waiting also raises the ethical issue in Area C, since an adviser who knows of an error and does nothing risks association with it.",
      },
    },
  ],
  examTraps: [
    { trap: "Omitting VAT from a business sale or property scenario.", fix: "Identify the consequence in a sentence — the going concern rules, or the option to tax." },
    { trap: "Assuming VAT is always recoverable.", fix: "Partial exemption means exempt activities carry irrecoverable input tax." },
    { trap: "Treating penalties as a function of the amount.", fix: "They scale with behaviour, and unprompted disclosure reduces them most." },
    { trap: "Ignoring the enquiry and discovery windows.", fix: "They determine how long a filed position remains open, and lengthen with culpability." },
  ],
  keyTerms: [
    { term: "Transfer of a going concern", def: "A business sale outside the scope of VAT where the conditions are met, so no VAT is charged on the transfer." },
    { term: "Option to tax", def: "An election making supplies of otherwise exempt commercial property standard rated, allowing related input tax to be recovered." },
    { term: "Unprompted disclosure", def: "Disclosure of an error made before the taxpayer has reason to believe HMRC has discovered it, attracting the largest penalty reduction." },
  ],
  summary: [
    "VAT attaches to the transactions ATX examines even when it has no requirement of its own.",
    "The going concern rules remove VAT from a business sale where conditions are met.",
    "Penalties scale with behaviour; unprompted disclosure is the strongest mitigation.",
    "Enquiry and discovery windows determine how long a position stays challengeable.",
  ],
  knowledgeDiagnostic: [
    { q: "Why do the transfer of a going concern rules matter commercially?", a: "No VAT is charged, so the buyer does not have to fund an amount they would only reclaim months later." },
    { q: "What determines the size of a penalty for an inaccuracy?", a: "The behaviour behind it — careless, deliberate, or deliberate and concealed — and whether disclosure was unprompted." },
    { q: "What extends the period during which HMRC can challenge a filed return?", a: "A discovery, with the window lengthening where the taxpayer was careless or deliberate." },
  ],
  furtherStudy: [
    "Area B covers statutory obligations and time limits across the taxes.",
    "Area C covers the ethical duties arising when an error is discovered.",
    "ATX-15 covers the corporation tax payment timing referred to here.",
  ],
}

export const ATX_TREE_AREA_A_PART5: StudyChapter[] = [ATX_TREE_17, ATX_TREE_18, ATX_TREE_19, ATX_TREE_20]
