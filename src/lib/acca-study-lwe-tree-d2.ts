import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area D, second part — limited partnerships, LLPs, and corporate personality.
 * Chapters 30–31 of the LW-ENG reading tree, mapped to syllabus groups D2(a) and D3.
 *
 * Chapter 30 has no Global counterpart: the Global tree compresses all partnership
 * forms into one chapter, but ENG's D2(a) examines the legislation governing BOTH
 * unlimited and limited partnerships, and the LLP is a separate vehicle under its own
 * statute with consequences — separate personality, filing, clawback — that a learner
 * has to be able to contrast with both a general partnership and a company.
 *
 * Chapter 31 forks the Global personality chapter and names the English authorities:
 * Salomon for the principle, and the actual veil-lifting grounds under the Insolvency
 * Act 1986 and the case law rather than a jurisdiction-neutral summary.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth.
 */

/* ── Chapter 30 · D2(a) ────────────────────────────────────────── */

export const LWE_TREE_30: StudyChapter = {
  id: "LWE-30",
  number: 30,
  paper: "LW",
  area: "D",
  title: "Limited partnerships and limited liability partnerships",
  minutes: 15,
  syllabusRefs: ["D2(a)"],
  intro:
    "Two vehicles that soften the unlimited liability of a general partnership, in very different ways — and the limited partner's protection comes with a condition that is easy to breach and fatal when breached.",
  outcomes: [
    "Explain the limited partnership under the Limited Partnerships Act 1907",
    "Explain the condition on which a limited partner's protection depends",
    "Explain the LLP under the Limited Liability Partnerships Act 2000",
    "Compare a general partnership, a limited partnership, an LLP and a company",
    "Choose the appropriate vehicle on given facts",
  ],
  sections: [
    {
      id: "limited-partnership",
      heading: "The limited partnership",
      blocks: [
        {
          kind: "definition",
          term: "Limited partnership (Limited Partnerships Act 1907)",
          md: "A partnership with at least **one general partner**, whose liability is **unlimited** and who manages the firm, and one or more **limited partners**, whose liability is **limited to the amount they contributed**. It must be **registered** with the Registrar of Companies — unlike a general partnership, registration is a requirement, and without it the firm is a general partnership with unlimited liability for all.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "A limited partner must not manage — and loses everything if they do",
          md: "This is the whole examinable point of the 1907 Act. A limited partner may **not take part in the management** of the firm, and may not have power to bind it. A limited partner who **does** participate in management becomes **liable as a general partner** for the debts incurred while they did so — the protection simply evaporates. So the limited partner is a **passive investor**: they may inspect the books and advise, but the moment they start making operational decisions or signing contracts, the shield goes. Scenarios put a limited partner in a management meeting for exactly this reason.",
        },
        {
          kind: "list",
          title: "Other features of a limited partnership",
          items: [
            "A limited partner **cannot withdraw** their contribution during the life of the partnership; withdrawing it makes them liable for the amount withdrawn.",
            "The **death or bankruptcy of a limited partner does not dissolve** the firm, which is one of its attractions over a general partnership.",
            "A limited partner **cannot dissolve** the partnership by notice.",
            "It has **no separate legal personality** — unlike an LLP or a company, the firm is not a person distinct from its partners.",
          ],
        },
      ],
      check: {
        q: "A limited partner begins attending management meetings and signing contracts for the firm. What is the consequence?",
        options: [
          "Nothing, since liability was fixed on registration",
          "They become liable as a general partner for the debts incurred while participating in management",
          "The partnership is automatically dissolved",
          "They must be re-registered as a general partner before any liability arises",
        ],
        correct: 1,
        explain:
          "They become LIABLE AS A GENERAL PARTNER for the debts incurred while taking part in management. The 1907 Act conditions the limited partner's protection on remaining PASSIVE — they may inspect the books and advise, but managing or binding the firm forfeits the limitation.",
      },
    },
    {
      id: "llp",
      heading: "The limited liability partnership",
      blocks: [
        {
          kind: "definition",
          term: "LLP (Limited Liability Partnerships Act 2000)",
          md: "A **body corporate** with **separate legal personality**, whose **members** ordinarily enjoy **limited liability** while being free to manage the business. It is the vehicle that gives partnership-style flexibility and internal governance with a company's liability shield — which is why professional firms use it.",
        },
        {
          kind: "table",
          caption: "The four vehicles compared",
          head: ["", "General partnership", "Limited partnership", "LLP", "Company"],
          rows: [
            ["**Separate legal person**", "**No**", "**No**", "**Yes**", "**Yes**"],
            ["**Members' liability**", "**Unlimited**", "Unlimited for general partners; limited for limited partners", "**Limited**", "**Limited** to amounts unpaid on shares"],
            ["**May members manage?**", "Yes", "General partners only — a limited partner who manages loses protection", "**Yes**, all members may manage", "Managed by **directors**, who need not be members"],
            ["**Registration**", "**None required**", "**Required**", "**Required**", "**Required**"],
            ["**Public filing of accounts**", "**No**", "No", "**Yes**", "**Yes**"],
            ["**Governed internally by**", "The 1890 Act defaults, or the agreement", "The 1907 Act and the agreement", "The **members' agreement**, with statutory defaults", "The **articles** and the Companies Act 2006"],
            ["**Share capital**", "None", "None", "**None**", "**Yes**"],
            ["**Taxation**", "Members taxed as individuals", "Same", "Members taxed **as partners**, not as a company", "**Corporation tax** on the company"],
          ],
        },
        {
          kind: "list",
          title: "The obligations that come with an LLP",
          items: [
            "**Incorporation** by registration, with two or more persons associated for carrying on a lawful business with a view of profit.",
            "**Designated members**, who carry the administrative and filing responsibilities — broadly comparable to a company secretary's role.",
            "**Filing of accounts and a confirmation statement**, so the trade-off for limited liability is **public disclosure**, exactly as with a company.",
            "**Registration of charges** over its property.",
            "The **insolvency regime applies**, including winding up, administration, and the clawback provisions on **wrongful trading** and **transactions at an undervalue** — so members are not beyond reach where they have acted improperly.",
            "The **members' agreement** governs internal relations; where it is silent, statutory default rules apply, including equal sharing of profits.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The LLP's trade-off, stated plainly",
          md: "An LLP buys **limited liability and separate personality** at the price of **transparency and regulation**: accounts on the public record, a confirmation statement, registrable charges, and exposure to the insolvency clawback provisions. A general partnership pays nothing and discloses nothing, but every partner is exposed **without limit**. That is the choice a scenario is usually asking you to make, and the right answer names the price as well as the benefit.",
        },
        {
          kind: "example",
          title: "Choosing the vehicle",
          scenario:
            "Four architects want to practise together. Two will run the practice day to day. A third wants to work in the business but is anxious about personal exposure, having been through an earlier firm's failure. A fourth will contribute £200,000 but take no part in running it and wants no exposure beyond that sum. They are also concerned that a rival will see their financial results, and they want the flexibility to agree unequal profit shares reflecting their contributions.",
          steps: [
            { label: "Rule out a general partnership", detail: "It needs no registration and discloses nothing, which suits the confidentiality concern — but ALL FOUR would face UNLIMITED personal liability. That defeats the third and fourth architects' requirements outright." },
            { label: "Test the limited partnership", detail: "It would protect the FOURTH architect, who is content to be PASSIVE and cap exposure at his £200,000 contribution. But it does NOT help the THIRD, who wants to WORK in the business: a limited partner who takes part in management loses the protection, and there must be at least one general partner with unlimited liability." },
            { label: "Test the LLP", detail: "It gives SEPARATE PERSONALITY and LIMITED LIABILITY to ALL FOUR while allowing every member to MANAGE — which resolves the third architect's problem, the one a limited partnership cannot. The members' agreement can set UNEQUAL PROFIT SHARES freely." },
            { label: "Name the price of the LLP", detail: "ACCOUNTS ON THE PUBLIC RECORD, a confirmation statement, registrable charges, and exposure to the insolvency clawback provisions. So the rival WILL be able to see the results — the confidentiality wish cannot be satisfied alongside limited liability." },
            { label: "Compare a company briefly", detail: "A company would also give limited liability and disclosure, but management would sit with DIRECTORS and the structure imposes SHARE CAPITAL and corporation tax. An LLP keeps partnership-style internal governance and taxes the members as partners, which suits a professional practice better." },
            { label: "Recommend", detail: "An LLP, with a members' agreement fixing the profit shares and the fourth architect's position — and clear advice that PUBLIC DISCLOSURE OF ACCOUNTS is the unavoidable cost of what they are asking for." },
          ],
          result:
            "The **LLP** is the only vehicle meeting all the liability and management requirements. The confidentiality wish is **incompatible** with limited liability, and saying so is part of the answer — the third architect's desire to both manage and be protected is precisely what rules out the limited partnership.",
        },
      ],
      check: {
        q: "Which vehicle gives every member limited liability while allowing all of them to manage the business?",
        options: [
          "A general partnership",
          "A limited liability partnership",
          "A limited partnership",
          "None — management always requires unlimited liability",
        ],
        correct: 1,
        explain:
          "An LLP. It is a BODY CORPORATE with SEPARATE PERSONALITY whose members have LIMITED liability and may ALL take part in management. A limited partnership protects only PASSIVE limited partners and requires at least one general partner with unlimited liability; a general partnership gives no protection at all.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Letting a limited partner manage without consequence.",
      fix: "Participating in management makes them liable as a GENERAL partner for debts incurred while doing so.",
    },
    {
      trap: "Treating a limited partnership as having separate legal personality.",
      fix: "It does not. Only an LLP and a company do.",
    },
    {
      trap: "Recommending an LLP without mentioning public disclosure.",
      fix: "Accounts on the public record, a confirmation statement and registrable charges are the price of limited liability.",
    },
    {
      trap: "Assuming LLP members are beyond the insolvency provisions.",
      fix: "Winding up, administration and the clawback rules including wrongful trading all apply.",
    },
  ],
  keyTerms: [
    { term: "Limited partnership", def: "A registered partnership under the 1907 Act with at least one unlimited general partner and passive limited partners." },
    { term: "Limited partner", def: "A partner whose liability is capped at their contribution, provided they take no part in management." },
    { term: "LLP", def: "A body corporate under the 2000 Act with separate personality, limited liability for members, and partnership-style management." },
    { term: "Designated members", def: "The LLP members carrying the administrative and filing responsibilities." },
    { term: "Members' agreement", def: "The document governing an LLP's internal relations, displacing the statutory defaults such as equal profit sharing." },
  ],
  summary: [
    "A limited partnership needs registration and at least one general partner with unlimited liability.",
    "A limited partner's protection depends on staying passive; managing makes them liable as a general partner.",
    "A limited partnership has no separate legal personality; an LLP does.",
    "An LLP gives all members limited liability and the right to manage, taxed as partners.",
    "The price of an LLP is public accounts, a confirmation statement, registrable charges and the insolvency clawback regime.",
  ],
  knowledgeDiagnostic: [
    { q: "What condition attaches to a limited partner's limited liability?", a: "They must take no part in the management of the firm and have no power to bind it; participating makes them liable as a general partner." },
    { q: "Which partnership forms have separate legal personality?", a: "Only the LLP. Both general and limited partnerships do not." },
    { q: "What does an LLP have to disclose publicly?", a: "Its accounts and a confirmation statement, and it must register charges over its property." },
    { q: "How are LLP members taxed?", a: "As partners on their share of profits, not through corporation tax on the entity." },
  ],
}

/* ── Chapter 31 · D3 ───────────────────────────────────────────── */

export const LWE_TREE_31: StudyChapter = {
  id: "LWE-31",
  number: 31,
  paper: "LW",
  area: "D",
  title: "Corporate personality, limited liability and lifting the veil",
  minutes: 17,
  syllabusRefs: ["D3(a)", "D3(b)", "D3(c)", "D3(d)", "D3(e)"],
  intro:
    "One idea underlies the whole of company law: the company is a person in its own right. Limited liability, perpetual succession, the veil and every exception to it are consequences of that single proposition.",
  outcomes: [
    "Explain separate legal personality and its practical consequences",
    "Explain the meaning and effect of limited liability",
    "Distinguish private from public companies, and the other classifications",
    "Identify the statutory and case-law grounds for lifting the veil",
    "Apply the principle and the exceptions to given facts",
  ],
  sections: [
    {
      id: "personality",
      heading: "Separate personality, and its consequences",
      blocks: [
        {
          kind: "definition",
          term: "Separate legal personality",
          md: "On incorporation a company becomes a **legal person distinct from its members and its directors**. *Salomon v A Salomon & Co Ltd* settled it: a company validly incorporated is a separate person even where one individual owns virtually all the shares and controls it entirely, so his loan secured by a debenture ranked ahead of unsecured creditors. The company holds its own property, makes its own contracts, owes its own debts, sues and is sued in its own name, and continues regardless of who owns or runs it.",
        },
        {
          kind: "list",
          style: "number",
          title: "Five practical consequences",
          items: [
            "**The company owns the business assets**, not the shareholders — so a member has no right to use company property and cannot insure it as their own.",
            "**The company owes the debts.** Creditors have a claim against the company, and against members only for what remains unpaid on their shares.",
            "**The company can contract with its own members**, including as employee, lender or landlord — which is what *Salomon* turned on.",
            "**Perpetual succession**: the death, bankruptcy or departure of members does not affect the company's existence.",
            "**The company can commit wrongs and offences** in its own right, which is the foundation of Area H.",
          ],
        },
        {
          kind: "definition",
          term: "Limited liability",
          md: "The liability of the **members**, not of the company. In a company **limited by shares** a member can be required to pay only the amount **unpaid on their shares** — once those are fully paid, they owe nothing more, however large the company's debts. The **company's** own liability for its debts is always **unlimited**.",
        },
        {
          kind: "table",
          caption: "Private and public companies",
          head: ["", "Private", "Public (plc)"],
          rows: [
            ["**Offering shares to the public**", "**Cannot**", "**May**"],
            ["**Minimum share capital**", "None prescribed", "**£50,000** nominal, at least a **quarter paid up** plus any premium"],
            ["**Trading certificate**", "Not required", "**Required** before it may trade"],
            ["**Company secretary**", "**Optional**", "**Required**, and must be qualified"],
            ["**Annual general meeting**", "Not required unless the articles say so", "**Required**"],
            ["**Written resolutions**", "**Available** instead of a meeting", "**Not** available"],
            ["**Name must end**", "\"Limited\" or \"Ltd\"", "\"public limited company\" or \"plc\""],
            ["**Minimum directors**", "**One**", "**Two**"],
          ],
        },
        {
          kind: "list",
          title: "The other classifications",
          items: [
            "**Limited by shares** — a member can be called on for whatever part of the share price is outstanding, and no more. The commercial norm.",
            "**Limited by guarantee** — members undertake to contribute a nominal sum on winding up. Used by non-profit bodies, which have no share capital.",
            "**Unlimited** — members have no limit on liability, in exchange for lighter disclosure. Rare.",
            "**Holding company and subsidiary** — a group relationship based on control, which matters for consolidated accounts and for some of the veil cases below.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "\"Limited liability\" limits the MEMBER, not the company",
          md: "A very common slip. The company is liable for its debts **in full** and to the last of its assets; what is limited is how much a **member** can be made to contribute. So a company with £3m of debts and £200,000 of assets is liable for all £3m — the creditors simply go unpaid, and the members with fully paid shares owe nothing.",
        },
      ],
      check: {
        q: "A sole shareholder and director insures the company's machinery in his own name. It is destroyed. Can he claim?",
        options: [
          "Yes, since he owns the whole company",
          "No — the machinery belongs to the company, a separate legal person, so he has no insurable interest in it",
          "Yes, up to the value of his shareholding",
          "Only if the company is a private company",
        ],
        correct: 1,
        explain:
          "NO. On SALOMON the company is a SEPARATE LEGAL PERSON and the machinery is its property. The shareholder owns SHARES, not assets, so he has no insurable interest. The same separation is what protects his personal assets from the company's creditors — it cuts both ways.",
      },
    },
    {
      id: "veil",
      heading: "Lifting the veil of incorporation",
      blocks: [
        {
          kind: "table",
          caption: "Statutory grounds",
          head: ["Ground", "Effect"],
          rows: [
            ["**Fraudulent trading** — s.213 IA 1986", "Anyone knowingly party to carrying on the business with intent to defraud creditors may be ordered to **contribute personally** (chapter 46)"],
            ["**Wrongful trading** — s.214 IA 1986", "A director who continued trading when they knew or ought to have concluded there was no reasonable prospect of avoiding insolvent liquidation may be ordered to contribute (chapter 46)"],
            ["**Disqualified persons**", "A disqualified director who takes part in management is **personally liable** for the debts incurred while doing so (chapter 37)"],
            ["**Trading without a trading certificate**", "A plc doing so exposes its officers to liability"],
            ["**Group accounts**", "A holding company must prepare **consolidated accounts**, treating the group as one economic entity for reporting purposes"],
          ],
        },
        {
          kind: "table",
          caption: "Case-law grounds",
          head: ["Ground", "Illustration"],
          rows: [
            ["**Façade or sham**", "The company was formed or used to **evade an existing legal obligation** — *Gilford Motor v Horne*, where a company was set up to get round a personal restraint of trade covenant, and *Jones v Lipman*, where a company was used to avoid completing a sale of land"],
            ["**The evasion principle**", "*Prest v Petrodel Resources* confined veil-piercing to cases where a person **deliberately frustrates the enforcement of an existing liability** by interposing a company — and stressed that other legal routes usually make piercing unnecessary"],
            ["**Agency**", "Where the company is in reality carrying on business as the **agent** of its controller, on ordinary agency principles"],
            ["**National emergency or public policy**", "Wartime cases treating a company as an enemy alien by reference to the residence of those in control"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The single economic unit argument generally FAILS",
          md: "Candidates reach for it constantly and it is usually wrong. *Adams v Cape Industries* rejected the proposition that a group of companies can be treated as **one entity** simply because it is run as a single commercial enterprise: each company in the group remains a **separate legal person**, and a parent is **not** liable for a subsidiary's debts merely because it controlled it. So the fact that a group operated as one business is **not** a ground for lifting the veil. *Prest* then narrowed matters further, confining piercing to deliberate **evasion of an existing liability** and pointing out that trust, agency or direct-duty analyses will usually answer the problem instead.",
        },
        {
          kind: "example",
          title: "Deciding whether the veil comes down",
          scenario:
            "Rowsley Holdings owns three subsidiaries. (a) Rowsley Transport, deliberately kept with almost no assets, performs the group's haulage while the vehicles are owned by another subsidiary; a claimant injured by a Transport lorry finds Transport cannot pay, and argues the group is one economic unit. (b) Kelston, a Rowsley director bound by a valid covenant not to solicit former clients, incorporates Kelston Consulting Ltd and solicits them through it. (c) Rowsley Fabrication's directors continued trading for nine months after it was plainly beyond rescue, incurring £600,000 of new credit, and it is now in insolvent liquidation. (d) Rowsley Holdings gave no guarantee for Fabrication's debts but had publicly described the group as \"one business, one balance sheet\".",
          steps: [
            { label: "Advise on (a) the injured claimant", detail: "The SINGLE ECONOMIC UNIT argument FAILS on Adams v Cape — each subsidiary is a separate legal person and the group being run as one enterprise is not a ground for piercing. The claimant's better routes lie ELSEWHERE: a direct duty of care owed by another group company, or vicarious liability, rather than veil-lifting." },
            { label: "Advise on (b) the covenant", detail: "The veil COMES DOWN. This is Gilford Motor v Horne precisely: a company incorporated and used to EVADE AN EXISTING legal obligation is a FAÇADE, and on the Prest evasion principle a deliberate frustration of an existing liability is the paradigm case. An injunction will bind both Kelston and the company." },
            { label: "Advise on (c) the directors of Fabrication", detail: "WRONGFUL TRADING under s.214 IA 1986 — they continued when they ought to have concluded there was no reasonable prospect of avoiding insolvent liquidation. The court may order them to CONTRIBUTE PERSONALLY. This is a STATUTORY route, and no dishonesty need be shown." },
            { label: "Advise on (d) the parent's public statements", detail: "Describing the group as one business does NOT make Rowsley Holdings liable for Fabrication's debts — Adams v Cape again, and there was no guarantee. Liability would need a guarantee, an assumption of responsibility on Hedley Byrne principles (chapter 22), or the evasion principle, none of which is present." },
            { label: "State the organising point", detail: "Three of the four fail as veil-lifting cases. The one that succeeds does so because the company was used to ESCAPE AN OBLIGATION THAT ALREADY EXISTED — which is the narrow modern test." },
          ],
          result:
            "Only **(b)** lifts the veil, and **(c)** succeeds by a **statutory** route rather than by piercing at all. Both single-economic-unit arguments fail. The discipline to carry into the exam is to reach for **statute first**, then the **evasion principle**, and to treat \"they ran it as one business\" as a non-argument.",
        },
      ],
      check: {
        q: "A parent runs its subsidiaries as a single commercial enterprise. A subsidiary cannot pay its creditors. Is the parent liable?",
        options: [
          "Yes, because the group is in substance one economic unit",
          "No — Adams v Cape rejects the single economic unit argument; each company remains a separate legal person",
          "Yes, since a parent always guarantees its subsidiaries",
          "Only if the parent holds all the shares",
        ],
        correct: 1,
        explain:
          "NO. ADAMS v CAPE INDUSTRIES rejected the single economic unit argument: each company in a group is a SEPARATE LEGAL PERSON and control alone does not make a parent liable for a subsidiary's debts. Liability would need a guarantee, an assumed direct duty, or the narrow Prest evasion principle.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying limited liability limits the company's own liability.",
      fix: "The company is liable in full. What is limited is how much a MEMBER can be required to contribute.",
    },
    {
      trap: "Using the single economic unit argument to reach a parent.",
      fix: "Adams v Cape rejects it. Each group company is a separate legal person.",
    },
    {
      trap: "Piercing the veil whenever a company was used to avoid something.",
      fix: "Prest confines it to deliberately frustrating an EXISTING liability, and other routes usually apply instead.",
    },
    {
      trap: "Forgetting the statutory grounds.",
      fix: "Fraudulent and wrongful trading and disqualified-director liability reach individuals without piercing at all.",
    },
  ],
  keyTerms: [
    { term: "Separate legal personality", def: "A company's existence as a legal person distinct from its members and directors (Salomon)." },
    { term: "Limited liability", def: "A member's liability confined to the amount unpaid on their shares; the company's own liability is unlimited." },
    { term: "Perpetual succession", def: "A company's continued existence regardless of changes in its membership." },
    { term: "Veil of incorporation", def: "The separation between a company and its members, which is lifted only exceptionally." },
    { term: "Single economic unit argument", def: "The rejected contention that a group may be treated as one entity (Adams v Cape)." },
    { term: "Evasion principle", def: "The narrow ground in Prest v Petrodel permitting piercing where a company is interposed to frustrate an existing liability." },
    { term: "Trading certificate", def: "The certificate a plc requires before it may trade." },
  ],
  summary: [
    "Salomon establishes that a company is a person distinct from its members, even where one person controls it.",
    "Limited liability limits the member to the amount unpaid on their shares; the company remains liable in full.",
    "A plc needs £50,000 nominal capital a quarter paid up, a trading certificate, a qualified secretary, an AGM and two directors.",
    "Statutory veil-lifting covers fraudulent and wrongful trading and disqualified directors.",
    "Case-law piercing is confined to façades and the Prest evasion principle; the single economic unit argument fails.",
  ],
  knowledgeDiagnostic: [
    { q: "What did Salomon establish?", a: "That a validly incorporated company is a separate legal person from its members, even where one individual owns and controls it almost entirely." },
    { q: "State four differences between a private company and a plc.", a: "A plc may offer shares to the public, needs £50,000 nominal capital a quarter paid up, requires a trading certificate and a qualified secretary, must hold an AGM, cannot use written resolutions, and needs two directors." },
    { q: "Why does the single economic unit argument fail?", a: "Adams v Cape held that each company in a group remains a separate legal person, so running a group as one enterprise does not make the parent liable." },
    { q: "State the modern test for piercing the veil at common law.", a: "The Prest evasion principle: a company interposed to deliberately frustrate the enforcement of an existing liability, other legal routes usually making piercing unnecessary." },
  ],
}

export const LWE_TREE_AREA_D_PART2: StudyChapter[] = [LWE_TREE_30, LWE_TREE_31]
