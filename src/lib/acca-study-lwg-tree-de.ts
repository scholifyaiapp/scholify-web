import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-GLOBAL · the rest of Area D, and Area E.
 * Chapters 19–24: corporate personality and company formation, then share capital,
 * loan capital and capital maintenance.
 *
 * Company law is common ground between the two LW variants, so the treatment here is
 * jurisdiction-neutral: the principle and its elements rather than one country's
 * statute. Where a rule depends on a domestic companies act — a filing period, a
 * percentage threshold — the chapter says so and directs the learner to the figure the
 * scenario supplies. That is the honest way to teach a Global variant, and it is also
 * how the examiner frames the questions.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth.
 */

/* ── Chapter 19 · D3 ───────────────────────────────────────────── */

export const LWG_TREE_19: StudyChapter = {
  id: "LWG-19",
  number: 19,
  paper: "LW",
  area: "D",
  title: "Corporations, limited liability and lifting the veil",
  minutes: 16,
  syllabusRefs: ["D3(a)", "D3(b)", "D3(c)", "D3(d)", "D3(e)"],
  intro:
    "One idea underlies the whole of company law: the company is a person in its own right. Everything else — limited liability, perpetual succession, the veil and the exceptions to it — is a consequence of that.",
  outcomes: [
    "Distinguish sole traders, partnerships and companies",
    "Explain the meaning and effect of limited liability",
    "Analyse the different types of company, especially private and public",
    "Illustrate the effect of separate personality and the veil of incorporation",
    "Recognise the instances in which separate personality will be ignored",
  ],
  sections: [
    {
      id: "separate-personality",
      heading: "Separate legal personality and its consequences",
      blocks: [
        {
          kind: "definition",
          term: "Separate legal personality",
          md: "On incorporation a company becomes a **legal person distinct from its members and its directors**. It holds its own property, makes its own contracts, owes its own debts, sues and is sued in its own name, and continues in existence regardless of who owns or runs it.",
        },
        {
          kind: "table",
          caption: "Comparing the three structures",
          head: ["", "Sole trader", "Partnership", "Company"],
          rows: [
            ["**Separate legal person**", "No", "No (general partnership)", "**Yes**"],
            ["**Owner's liability**", "Unlimited", "Unlimited and joint", "**Limited** to the amount payable on the shares"],
            ["**Owns the assets**", "The proprietor", "The partners jointly", "**The company itself**"],
            ["**Continuity**", "Ends with the owner", "Disturbed by a partner leaving", "**Perpetual succession**"],
            ["**Who manages**", "The proprietor", "The partners", "The **directors**, who need not be members"],
            ["**Transfer of interest**", "Sell the business", "Needs the partners' agreement", "**Transfer shares**, freely in a public company"],
            ["**Public disclosure**", "None", "None", "Accounts and returns are filed"],
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "Five practical consequences of separate personality",
          items: [
            "**The company owns the business assets**, not the shareholders — so a member has no right to use company property, and cannot insure it as their own.",
            "**The company owes the debts.** Creditors have a claim against the company, and against members only for what remains unpaid on their shares.",
            "**The company can contract with its own members**, including as employee, lender or landlord.",
            "**Perpetual succession**: death, bankruptcy or departure of members does not affect the company's existence.",
            "**The company can commit wrongs and be liable for them**, and in some cases commit offences — which is the foundation of Area H.",
          ],
        },
        {
          kind: "illustration",
          title: "What separate personality actually decides",
          md: "Marston owns 100% of the shares in Marston Haulage Ltd and is its only director. He insures the company's lorries **in his own name**. When one is destroyed, the insurer refuses to pay.\n\nThe insurer is right. The lorries belong to the **company**, a different legal person, and Marston has no insurable interest in them personally. He owns **shares** — not lorries.\n\nThe same principle helps him elsewhere: when the company cannot pay its creditors, they cannot reach his house. He is protected by exactly the separation that defeated his insurance claim. It cuts both ways, which is the point candidates most often miss.",
        },
      ],
      check: {
        q: "A sole shareholder and director insures the company's plant in their own name. The plant is destroyed. Can they claim?",
        options: [
          "Yes, since they own the whole company",
          "No — the plant belongs to the company, a separate legal person, so they have no insurable interest in it",
          "Yes, up to the value of their shareholding",
          "Only if the company is a private company",
        ],
        correct: 1,
        explain:
          "NO. The company is a SEPARATE LEGAL PERSON and the plant is its property. The shareholder owns SHARES, not assets, so has no insurable interest in the plant. The same separation is what protects their personal assets from the company's creditors.",
      },
    },
    {
      id: "types",
      heading: "Types of company",
      blocks: [
        {
          kind: "table",
          caption: "Private and public companies compared",
          head: ["", "Private", "Public"],
          rows: [
            ["**Offering shares to the public**", "**Cannot**", "**May**"],
            ["**Minimum share capital**", "Generally none", "A **statutory minimum**, which the scenario will state"],
            ["**Trading before capital is raised**", "May trade from incorporation", "May need a **trading certificate** in some jurisdictions"],
            ["**Company secretary**", "Often optional", "Usually **required**"],
            ["**Annual general meeting**", "Often not required", "Usually **required**"],
            ["**Written resolutions**", "**Available** instead of a meeting", "Generally **not** available"],
            ["**Transfer of shares**", "Often **restricted** by the articles", "Freely transferable, and listed shares are traded"],
            ["**Filing and disclosure**", "Lighter", "Heavier, plus market rules if listed"],
          ],
        },
        {
          kind: "list",
          title: "Other classifications the syllabus expects",
          items: [
            "**Limited by shares** — members' liability is the amount unpaid on their shares. The commercial norm.",
            "**Limited by guarantee** — members undertake to contribute a nominal sum on winding up. Used for non-profit bodies.",
            "**Unlimited** — members have no limit on liability, in exchange for lighter disclosure. Rare.",
            "**Holding company and subsidiary** — a group relationship based on control, which matters for consolidated accounts and for some of the veil-lifting cases below.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "\"Limited liability\" limits the MEMBER, not the company",
          md: "The company remains liable for its debts **in full**; it simply may not be able to pay them. What is limited is the **member's** obligation — to the amount unpaid on their shares, which for fully paid shares is **nothing**. An answer saying \"the company's liability is limited to its share capital\" has the proposition backwards.",
        },
      ],
      check: {
        q: "Which is a feature of a private company but generally NOT of a public one?",
        options: [
          "Separate legal personality",
          "The ability to pass a written resolution instead of holding a meeting",
          "Limited liability for its members",
          "The obligation to file accounts",
        ],
        correct: 1,
        explain:
          "WRITTEN RESOLUTIONS are generally available to PRIVATE companies as a substitute for a meeting, and generally not to public ones. Separate personality, limited liability and filing obligations apply to both.",
      },
    },
    {
      id: "lifting-the-veil",
      heading: "The veil of incorporation, and when it is lifted",
      blocks: [
        {
          kind: "definition",
          term: "The veil of incorporation",
          md: "The metaphor for the separation between the company and its members: the court looks at the **company** and not **through** it to the people behind. **Lifting** (or piercing) the veil means disregarding that separation and treating the members or directors as responsible for what the company did.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The veil is lifted rarely, and never merely because it would be fair",
          md: "The starting point is that the separation is **respected**, even where a company is a one-person vehicle deliberately used to limit exposure — that is what incorporation is **for**. So an answer must identify a **recognised ground**. A general appeal to justice, or the fact that a group is run as a single economic unit, is not enough on its own.",
        },
        {
          kind: "table",
          caption: "The recognised grounds, grouped",
          head: ["Ground", "Example"],
          rows: [
            ["**Statute expressly provides for it**", "Liability for **fraudulent** or **wrongful trading**; disqualified persons acting as directors; provisions on groups and consolidated accounts"],
            ["**Fraud or a sham**", "The company is a mere façade concealing the true facts, or incorporated to evade an existing legal obligation"],
            ["**Evading an existing liability**", "Transferring assets to a new company to defeat a judgment or a restrictive covenant already binding the individual"],
            ["**Agency**", "The company is genuinely acting as **agent** for its controller on the facts, not merely controlled by them"],
            ["**Group as a single entity**, where a statute or accounting requirement so provides", "Consolidated accounts; some employment and taxation provisions"],
            ["**Public interest or national emergency**", "Wartime cases treating an enemy-controlled company as an enemy"],
          ],
        },
        {
          kind: "example",
          title: "Applying the veil to two attempts to use it",
          scenario:
            "Kelvern Ltd owes a judgment debt of $600,000 to a creditor. Its sole shareholder, Doran, incorporates Ashby Trading Ltd, transfers Kelvern's customer contracts and equipment to it for a nominal sum, and continues the identical business from the same premises with the same staff. Separately, Doran also owns Petronel Ltd, a genuinely separate subsidiary with its own management, staff, premises and customers, which happens to have made large profits. The creditor seeks to recover from both Ashby and Petronel.",
          steps: [
            { label: "Start from the presumption", detail: "Each company is a separate legal person. The creditor's judgment is against KELVERN, and neither Ashby nor Petronel is party to that debt. The veil is respected unless a ground is made out." },
            { label: "Examine the transfer to Ashby", detail: "Assets were moved for a nominal sum to a new vehicle carrying on the IDENTICAL business, after the liability arose. That is the classic pattern of using incorporation to EVADE AN EXISTING LIABILITY — a recognised ground." },
            { label: "Characterise Ashby", detail: "On those facts Ashby looks like a FAÇADE: same business, same premises, same staff, no real consideration. The court can lift the veil, and the transfer is also likely to be attackable as a transaction defrauding creditors (chapter 29)." },
            { label: "Examine Petronel", detail: "Petronel has its own management, staff, premises and customers. It is not a façade and was not used to evade anything — it is simply a profitable company with a common owner." },
            { label: "Reject the group argument", detail: "That Doran controls both, or that they could be described as one economic unit, is NOT a ground. Common ownership and control do not make one company liable for another's debts." },
            { label: "State the conclusion", detail: "The creditor may realistically reach ASHBY, on the evasion or sham ground. It cannot reach PETRONEL. Doran's personal assets are also out of reach unless a separate ground — such as wrongful trading against him as a director of Kelvern — is established." },
          ],
          result:
            "Ashby yes, Petronel no. The distinction that decides it is **abuse versus ordinary use**: incorporating to limit exposure on future trading is legitimate and the veil stands, while moving assets into a new shell to escape a liability **already incurred** is exactly what the exceptions exist for. Common control, by itself, never suffices.",
        },
      ],
      check: {
        q: "A creditor of one company in a group argues the court should treat the group as a single economic unit and make the profitable parent liable. Will that succeed?",
        options: [
          "Yes — groups are always treated as one entity",
          "Generally no — common ownership and control are not a ground for lifting the veil, absent statute, fraud, a sham or evasion of an existing liability",
          "Yes, if the parent owns more than 75%",
          "Only if the subsidiary is insolvent",
        ],
        correct: 1,
        explain:
          "GENERALLY NO. Each company is a separate legal person, and single-economic-unit reasoning is not itself a ground. A recognised ground is needed — statute, fraud or a sham, evasion of an existing liability, or genuine agency. Insolvency of the subsidiary is the usual reason for trying, not a ground in itself.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying the company's liability is limited.",
      fix: "The COMPANY owes its debts in full. It is the MEMBER's liability that is limited, to the amount unpaid on their shares.",
    },
    {
      trap: "Letting a shareholder claim on company assets as their own.",
      fix: "The company owns them. A member owns shares, and has no insurable interest in company property.",
    },
    {
      trap: "Lifting the veil because the outcome seems unfair.",
      fix: "A recognised ground is needed: statute, fraud or a sham, evasion of an existing liability, genuine agency, or a statutory group provision.",
    },
    {
      trap: "Treating common control of a group as a ground.",
      fix: "It is not. Single-economic-unit reasoning does not by itself make one company liable for another's debts.",
    },
    {
      trap: "Treating the use of a company to limit future exposure as abuse.",
      fix: "That is what incorporation is for. The exceptions target evasion of liabilities ALREADY incurred, and shams.",
    },
    {
      trap: "Confusing limited by guarantee with limited by shares.",
      fix: "Guarantee members undertake to contribute a nominal sum on winding up; share members owe the amount unpaid on their shares.",
    },
  ],
  keyTerms: [
    { term: "Separate legal personality", def: "A company's existence in law as a person distinct from its members and directors, owning its own assets and owing its own debts." },
    { term: "Limited liability", def: "The limit on a MEMBER's obligation to the amount unpaid on their shares — nothing further where the shares are fully paid." },
    { term: "Perpetual succession", def: "A company's continued existence regardless of changes in, or the death of, its members." },
    { term: "Veil of incorporation", def: "The separation between a company and those behind it, which the court will disregard only on recognised grounds." },
    { term: "Lifting the veil", def: "Disregarding separate personality — under statute, or for fraud, a sham, evasion of an existing liability, or genuine agency." },
    { term: "Public company", def: "A company permitted to offer its shares to the public, subject to a minimum capital and heavier disclosure." },
  ],
  summary: [
    "Incorporation creates a legal person distinct from members and directors.",
    "The company owns the assets and owes the debts; members own shares and owe only what is unpaid on them.",
    "Perpetual succession means the company survives changes in membership.",
    "Private companies cannot offer shares to the public but may use written resolutions; public companies face a capital minimum and heavier disclosure.",
    "The veil is respected even for one-person companies, because limiting exposure is what incorporation is for.",
    "It is lifted only on recognised grounds: statute, fraud or a sham, evasion of an existing liability, genuine agency, or statutory group provisions.",
    "Common ownership and control of a group is not a ground.",
  ],
  knowledgeDiagnostic: [
    { q: "Whose liability does limited liability limit?", a: "The member's, to the amount unpaid on their shares. The company remains liable for its debts in full." },
    { q: "Why can a sole shareholder not insure company assets in their own name?", a: "The assets belong to the company, a separate legal person, so the shareholder has no insurable interest in them." },
    { q: "Name four grounds for lifting the veil.", a: "An express statutory provision, fraud or a sham, evasion of an existing liability, and genuine agency. Statutory group provisions and public interest are further ones." },
    { q: "Is running a group as a single economic unit a ground for lifting the veil?", a: "No. Common ownership and control do not make one company liable for another's debts." },
    { q: "Give three differences between a private and a public company.", a: "A public company may offer shares to the public, must meet a minimum capital and usually needs a secretary and an AGM; a private company generally may use written resolutions instead of meetings." },
  ],
  furtherStudy: [
    "Chapter 20 covers how a company is brought into existence.",
    "Chapter 33 applies statutory veil-lifting through fraudulent and wrongful trading.",
  ],
}

/* ── Chapter 20 · D4(a)–(d) ────────────────────────────────────── */

export const LWG_TREE_20: StudyChapter = {
  id: "LWG-20",
  number: 20,
  paper: "LW",
  area: "D",
  title: "Promoters, pre-incorporation contracts and registration",
  minutes: 15,
  syllabusRefs: ["D4(a)", "D4(b)", "D4(c)", "D4(d)"],
  intro:
    "Before a company exists somebody has to do the work of bringing it into being — and anything they sign in its name before registration is a trap, because you cannot contract with a person who does not yet exist.",
  outcomes: [
    "Explain the role and duties of company promoters, the consequences of breach and the remedies available",
    "Explain the rules relating to pre-incorporation contracts",
    "Describe the procedure for registering a company, including streamlined registration",
    "Describe the statutory books, records and returns a company must keep or make",
  ],
  sections: [
    {
      id: "promoters",
      heading: "Promoters and their duties",
      blocks: [
        {
          kind: "definition",
          term: "Promoter",
          md: "A person who **takes the steps necessary to bring a company into existence** — instructing its formation, negotiating for assets or business to be acquired by it, finding subscribers. It is a question of **fact, not title**, and a person acting purely in a professional capacity, such as a solicitor carrying out instructions, is generally not a promoter.",
        },
        {
          kind: "list",
          style: "number",
          title: "The promoter's duties and the remedies for breach",
          items: [
            "A promoter stands in a **fiduciary** position toward the company being formed: they must act in its interests and **must not make a secret profit**.",
            "**Full disclosure** of any interest in a transaction with the company is required — to an **independent board** or to the members — and disclosure cures what secrecy condemns.",
            "**Remedies** for breach: the company may **rescind** the contract; **recover the secret profit**; or claim **damages** for breach of fiduciary duty.",
            "**Fair dealing.** A promoter who sells their own property to the company must disclose the fact and the profit; selling at an undisclosed mark-up is the standard breach.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Disclosure is the whole defence",
          md: "A promoter is **not** forbidden to profit — they are forbidden to profit **secretly**. Properly disclosed to an independent board or to the members, the same profit is unobjectionable. So the first question in any promoter scenario is: **was it disclosed, and to whom?**",
        },
      ],
    },
    {
      id: "pre-incorporation",
      heading: "Pre-incorporation contracts",
      blocks: [
        {
          kind: "definition",
          term: "Pre-incorporation contract",
          md: "A contract purportedly made **on behalf of a company before it has been incorporated**. Because the company **does not yet exist**, it has no capacity to contract and no agent can act for it — so the general rule is that the **person who signed is personally liable**, and entitled to enforce it.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The company cannot ratify",
          md: "Ratification requires a principal **in existence** at the time of the act (chapter 17). A company incorporated afterwards was not, so it **cannot ratify** the contract, however much it wants to. That is the single most examined proposition in this chapter, and the reason the workarounds below exist.",
        },
        {
          kind: "table",
          caption: "How to get the company bound instead",
          head: ["Route", "How it works"],
          rows: [
            ["**Novation**", "After incorporation, the company, the third party and the promoter agree a **new contract** on the same terms, releasing the promoter. The cleanest solution"],
            ["**A new contract** after incorporation", "The company simply contracts afresh. Requires the third party's co-operation"],
            ["**Draft the contract to exclude personal liability**", "An express term that the signatory incurs no personal liability, or that the agreement lapses if the company does not adopt it within a period"],
            ["**Buy the assets after incorporation**", "Avoid contracting before registration at all — the safest course"],
          ],
        },
        {
          kind: "example",
          title: "Working a pre-incorporation problem",
          scenario:
            "Halloran intends to form Brackenhall Ltd to run a restaurant. Before registration she signs a two-year lease of premises \"for and on behalf of Brackenhall Ltd\", and orders $40,000 of kitchen equipment in the company's name. Brackenhall Ltd is incorporated three weeks later. At its first board meeting the company resolves to \"ratify and adopt\" both agreements. The restaurant fails after four months and the landlord and the equipment supplier are unpaid. Both look to the company; the company has no assets.",
          steps: [
            { label: "Identify the problem", detail: "Both agreements were made BEFORE incorporation, when Brackenhall Ltd did not exist. There was no principal capable of contracting and no agent capable of acting for it." },
            { label: "Deal with the board resolution", detail: "The resolution to \"ratify and adopt\" is INEFFECTIVE as ratification: a company cannot ratify a contract made before it existed, because ratification needs a principal in existence at the time of the act." },
            { label: "Locate the liability", detail: "HALLORAN is personally liable on both the lease and the equipment order, and is correspondingly entitled to enforce them. The creditors' claims lie against her, not the company." },
            { label: "Consider whether anything binds the company", detail: "Only if there was a NOVATION — a fresh tripartite agreement releasing Halloran — or a new contract after incorporation. A unilateral board resolution is neither, because the third parties were not party to it." },
            { label: "Test the equipment order for a possible new contract", detail: "If the equipment was in fact delivered to the company after incorporation, and the company accepted and paid for part of it, a NEW contract may be inferred from the parties' conduct — which would bind the company alongside or instead of Halloran." },
            { label: "State what should have been done", detail: "Either wait and contract after registration, or include an express term excluding personal liability and providing for the agreement to lapse if the company did not adopt it — and then novate." },
          ],
          result:
            "Halloran is personally liable on both agreements, and the company's resolution achieves nothing. The trap is that the board resolution **looks** like the answer: candidates see \"ratify\" and accept it. The rule is that a company **cannot ratify** a pre-incorporation contract, and the only routes to binding it are **novation** or a **fresh contract**.",
        },
      ],
      check: {
        q: "A promoter signs a supply contract in the name of a company not yet incorporated. After registration the board resolves to ratify it. Who is liable?",
        options: [
          "The company, because it has ratified",
          "The promoter personally — a company cannot ratify a contract made before it existed",
          "Neither, as the contract is void",
          "Both jointly and severally",
        ],
        correct: 1,
        explain:
          "The PROMOTER personally. Ratification needs a principal in existence at the time of the act, and the company was not. The board resolution is ineffective; only NOVATION or a fresh contract after incorporation can bind the company.",
      },
    },
    {
      id: "registration-and-records",
      heading: "Registration, and the records a company must keep",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The registration procedure, in outline",
          items: [
            "**Deliver an application** to the registrar stating the proposed **name**, the situation of the **registered office**, whether liability is limited and by what means, and whether the company is private or public.",
            "**A statement of capital and initial shareholdings** — or, for a company limited by guarantee, a statement of guarantee.",
            "**A statement of the proposed officers** — directors and, where required, the secretary.",
            "**The articles of association**, unless the company adopts the applicable **model articles** by default.",
            "**A statement of compliance** that the requirements have been met.",
            "**The registrar registers** the company and issues a **certificate of incorporation**, which is **conclusive evidence** that the company exists and has been duly registered. A public company may additionally require a **trading certificate** before it may trade.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Streamlined registration",
          md: "Many jurisdictions now offer an **electronic, standardised** route: a short online application, adoption of the **model articles** without amendment, and same-day or near-immediate incorporation, often integrated with tax registration. The trade-off is **less flexibility** — a company wanting bespoke articles, unusual share classes or special rights must use the full procedure. The certificate and its effect are identical either way.",
        },
        {
          kind: "table",
          caption: "The statutory books, records and returns",
          head: ["Record", "What it contains"],
          rows: [
            ["**Register of members**", "Names and addresses of members, shares held and dates of becoming and ceasing to be a member"],
            ["**Register of directors**, and of directors' residential addresses", "Particulars of each director, with residential addresses protected from public inspection"],
            ["**Register of secretaries**", "Where a secretary is required or appointed"],
            ["**Register of people with significant control**", "Those who ultimately own or control the company, so that beneficial ownership is transparent"],
            ["**Register of charges**", "Charges created over the company's assets, with copies of the instruments"],
            ["**Minute books**", "Minutes of members' meetings and of directors' meetings"],
            ["**Accounting records**", "Sufficient to show and explain transactions and disclose the company's position with reasonable accuracy"],
            ["**Confirmation statement** (annual return)", "A periodic confirmation to the registrar that the filed information is up to date, or notification of changes"],
            ["**Annual accounts and reports**", "Filed with the registrar and laid before members where required"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Why the PSC register exists",
          md: "The register of people with **significant control** was introduced because a chain of holding companies can conceal who ultimately benefits. It is a transparency measure aimed at exactly the concerns behind Area H — money laundering, sanctions evasion and the misuse of corporate structures — so a question linking beneficial ownership to money laundering controls is joining up two parts of the syllabus deliberately.",
        },
      ],
      check: {
        q: "What is the legal effect of the certificate of incorporation?",
        options: [
          "It is evidence of the company's solvency",
          "It is conclusive evidence that the company exists and has been duly registered",
          "It authorises a public company to trade without further formality",
          "It binds the company to its pre-incorporation contracts",
        ],
        correct: 1,
        explain:
          "It is CONCLUSIVE EVIDENCE of existence and due registration. It says nothing about solvency, does not bind the company to pre-incorporation contracts, and a public company may still need a separate TRADING CERTIFICATE before it may trade.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Letting a company ratify a pre-incorporation contract.",
      fix: "It cannot — ratification needs a principal in existence at the time of the act. Only novation or a fresh contract binds the company.",
    },
    {
      trap: "Treating a board resolution to \"adopt\" as effective.",
      fix: "The third party is not party to it. Adoption requires a NOVATION agreed by all three, or a new contract.",
    },
    {
      trap: "Saying a promoter may never profit from the company.",
      fix: "A promoter may profit if it is fully DISCLOSED to an independent board or the members. Only a SECRET profit is a breach.",
    },
    {
      trap: "Treating anyone involved in formation as a promoter.",
      fix: "It is a question of fact, and a person acting purely in a professional capacity on instructions is generally not one.",
    },
    {
      trap: "Reading the certificate of incorporation as saying something about the company's finances.",
      fix: "It is conclusive evidence of existence and due registration, nothing more.",
    },
    {
      trap: "Assuming streamlined registration allows bespoke articles.",
      fix: "It depends on adopting the model articles unamended. Special rights or share classes need the full procedure.",
    },
  ],
  keyTerms: [
    { term: "Promoter", def: "A person who takes the steps necessary to bring a company into existence; a question of fact, not of title." },
    { term: "Secret profit", def: "A benefit a promoter takes from a transaction with the company without full disclosure, recoverable by the company." },
    { term: "Pre-incorporation contract", def: "A contract purportedly made for a company before it exists, on which the signatory is personally liable and which the company cannot ratify." },
    { term: "Novation", def: "A fresh tripartite agreement replacing a pre-incorporation contract and releasing the promoter." },
    { term: "Certificate of incorporation", def: "The registrar's certificate, conclusive evidence that the company exists and has been duly registered." },
    { term: "Register of people with significant control", def: "The register of those who ultimately own or control the company, maintained for beneficial-ownership transparency." },
  ],
  summary: [
    "A promoter brings the company into existence and owes it fiduciary duties, including not to make a secret profit.",
    "Disclosure to an independent board or the members cures what secrecy condemns; remedies are rescission, recovery of the profit or damages.",
    "A pre-incorporation contract binds the signatory personally, because the company did not exist.",
    "The company cannot ratify it; only novation or a fresh contract will bind the company.",
    "Registration requires an application, statements of capital, officers and compliance, and articles unless model articles apply.",
    "The certificate of incorporation is conclusive evidence of existence and due registration.",
    "A company must keep registers of members, directors, secretaries, significant control and charges, plus minutes and accounting records, and file a confirmation statement.",
  ],
  knowledgeDiagnostic: [
    { q: "Why can a company not ratify a pre-incorporation contract?", a: "Ratification requires a principal in existence at the time of the act, and the company did not then exist." },
    { q: "How can a pre-incorporation contract be made binding on the company?", a: "By novation — a fresh agreement between company, third party and promoter releasing the promoter — or by a new contract after incorporation." },
    { q: "When may a promoter keep a profit made from the company?", a: "Where it has been fully disclosed to an independent board or to the members. Only a secret profit is a breach." },
    { q: "What is the effect of the certificate of incorporation?", a: "It is conclusive evidence that the company exists and has been duly registered." },
    { q: "Why is a register of people with significant control required?", a: "To make beneficial ownership transparent, because chains of companies can otherwise conceal who ultimately owns or controls the business." },
  ],
  furtherStudy: [
    "Chapter 21 covers the constitution the registration process delivers.",
    "Chapter 17 supplies the ratification rule that defeats pre-incorporation contracts.",
  ],
}

/* ── Chapter 21 · D4(e)–(h) ────────────────────────────────────── */

export const LWG_TREE_21: StudyChapter = {
  id: "LWG-21",
  number: 21,
  paper: "LW",
  area: "D",
  title: "The constitution, the articles and company names",
  minutes: 14,
  syllabusRefs: ["D4(e)", "D4(f)", "D4(g)", "D4(h)"],
  intro:
    "The articles are the company's rulebook, and they are a contract — but only between particular people, for particular purposes, which is what decides who can sue on them.",
  outcomes: [
    "Analyse the effect of a company's constitutional documents",
    "Describe the contents of model articles of association",
    "Explain how articles of association can be changed",
    "Explain the controls over the names companies may or may not use",
  ],
  sections: [
    {
      id: "the-constitution",
      heading: "What the constitution is, and whom it binds",
      blocks: [
        {
          kind: "definition",
          term: "The constitution",
          md: "Principally the **articles of association** — the company's internal rulebook — together with certain **resolutions and agreements** affecting the company's constitution. In many jurisdictions a short **memorandum** records the subscribers' intention to form the company, and it is the articles that carry the substance.",
        },
        {
          kind: "table",
          caption: "The effect of the articles: a contract, but a limited one",
          head: ["Between", "Enforceable?", "Note"],
          rows: [
            ["**Company and each member**", "**Yes**, in respect of **membership rights**", "A member may enforce a right qua member — to a dividend declared, to vote, to a share certificate"],
            ["**Member and member**", "Generally through the company", "Some rights, such as pre-emption on transfer, operate between members"],
            ["**Company and an outsider**", "**No**", "An outsider cannot enforce the articles even if named in them"],
            ["**A member in a non-member capacity**", "**No**", "A member who is also the company's solicitor cannot use the articles to enforce a right to be employed as solicitor"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Only rights \"qua member\" are enforceable",
          md: "The articles bind the company and the members **in their capacity as members**. So a provision appointing someone the company's solicitor or managing director for life gives that person **no** contractual right under the articles, even if they are also a shareholder — the right is not a membership right. This is the distinction scenarios are built on: identify the **capacity** in which the claimant is complaining.",
        },
        {
          kind: "list",
          title: "What model articles typically contain",
          items: [
            "**Directors' powers and responsibilities** — a general power to manage, and how it is exercised.",
            "**Decision-making by directors** — board meetings, quorum, notice, majority decisions, the chair's casting vote where provided, and conflicts of interest.",
            "**Appointment and removal of directors**, and termination of office.",
            "**Shares** — issue, transfer, share certificates, and pre-emption where provided.",
            "**Dividends and distributions**, including interim dividends.",
            "**Members' decision-making** — general meetings, notice, quorum, voting, proxies, and written resolutions for a private company.",
            "**Administrative arrangements** — communications, company seal, indemnity and insurance for directors.",
          ],
        },
      ],
      check: {
        q: "The articles state that a named shareholder shall be the company's solicitor for life. The company engages a different firm. Can the shareholder sue on the articles?",
        options: [
          "Yes, because the articles are a contract binding the company",
          "No — the articles bind only in respect of membership rights, and being the company's solicitor is not one",
          "Yes, because they are a member",
          "Only if they hold more than 50% of the shares",
        ],
        correct: 1,
        explain:
          "NO. The articles are enforceable in respect of rights held QUA MEMBER. A right to be engaged as the company's solicitor is not a membership right, so it is unenforceable under the articles even though the claimant is a shareholder. The size of the holding is irrelevant.",
      },
    },
    {
      id: "altering-articles",
      heading: "Altering the articles",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The mechanism and its limits",
          items: [
            "Articles are altered by **special resolution** of the members — a **supermajority**, whose exact percentage the scenario will state.",
            "**A copy of the amended articles** and the resolution must be **filed** with the registrar within the prescribed period.",
            "**Entrenchment.** Specified provisions may be **entrenched**, so that they can be amended only if additional conditions are met or a higher majority obtained. Entrenchment does not prevent amendment by unanimous agreement of all members.",
            "**Bona fide for the benefit of the company as a whole.** An alteration must be made in good faith in the company's interests, not to expropriate a minority.",
            "**No increase in a member's liability** to contribute to share capital without that member's written consent.",
            "**Class rights.** Where an alteration varies the rights of a class of shares, the **class consent** procedure must also be followed (chapter 22).",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "An alteration cannot be blocked by a contract with a member",
          md: "A company cannot deprive itself of the statutory power to alter its articles by contracting with a member not to do so. What it may face is a **damages** claim for breaching that contract — the alteration stands, but it may be expensive. Distinguishing \"the alteration is invalid\" from \"the alteration is valid but actionable\" is the point being tested.",
        },
        {
          kind: "example",
          title: "Testing an alteration",
          scenario:
            "Cranmere Ltd has four members. Its articles contain a pre-emption clause requiring any member wishing to transfer shares to offer them to the others first, and an entrenchment provision stating that this clause may be altered only with the consent of all members. The three majority members pass a special resolution deleting the pre-emption clause so that one of them can sell to an outside buyer at a premium. The fourth member, Whitlow, objects. The three also pass a resolution requiring every member to subscribe for a further 1,000 shares each.",
          steps: [
            { label: "Test the deletion against entrenchment", detail: "The pre-emption clause is ENTRENCHED, alterable only with the consent of ALL members. A special resolution of three of four does not satisfy that condition, so the deletion is INEFFECTIVE." },
            { label: "Test it against good faith", detail: "Even without entrenchment, the alteration was made so that a majority member could sell at a premium to an outsider, defeating the minority's pre-emption right. That is difficult to justify as bona fide FOR THE BENEFIT OF THE COMPANY AS A WHOLE." },
            { label: "Test the subscription resolution", detail: "Requiring members to subscribe for further shares INCREASES their liability to contribute to capital. That cannot be imposed on Whitlow without his WRITTEN CONSENT, so it does not bind him." },
            { label: "Note what does bind the others", detail: "The three who voted for it may be bound by their own agreement to subscribe, but the alteration cannot be enforced against the dissenting member." },
            { label: "Consider what the majority could lawfully do", detail: "Obtain Whitlow's consent; or offer the shares under the pre-emption clause as it stands; or, if the commercial case is genuine and even-handed, alter the clause prospectively in a way that does not simply strip the minority of a right for one member's benefit." },
            { label: "Identify Whitlow's remedies", detail: "Resist the alterations as ineffective, and if the majority persist, consider a claim founded on conduct unfairly prejudicial to the minority." },
          ],
          result:
            "Both resolutions fail against Whitlow: the first on **entrenchment** and on **good faith**, the second because **no member's liability to contribute capital can be increased without written consent**. The pattern to notice is that an alteration must survive **three** separate tests — the required majority, any entrenchment, and the bona fide requirement — and a scenario usually attacks it on more than one.",
        },
      ],
      check: {
        q: "A special resolution alters the articles to require each member to subscribe for additional shares. One member did not consent in writing. Is that member bound?",
        options: [
          "Yes, because a special resolution binds all members",
          "No — a member's liability to contribute to share capital cannot be increased without their written consent",
          "Yes, if the alteration benefits the company",
          "Only if they attended the meeting",
        ],
        correct: 1,
        explain:
          "NOT BOUND. An alteration cannot increase a member's liability to contribute to share capital without that member's WRITTEN CONSENT. A special resolution is not enough, and the benefit to the company does not override the requirement.",
      },
    },
    {
      id: "names",
      heading: "Controls over company names",
      blocks: [
        {
          kind: "table",
          caption: "What a name may not do",
          head: ["Restriction", "Reason"],
          rows: [
            ["**Not the same as** an existing registered name", "Avoids confusion on the register"],
            ["**Not offensive**, or one whose use would be a **criminal offence**", "Public policy"],
            ["**Not suggest a connection** with government or a public authority without approval", "Prevents implied official endorsement"],
            ["**Sensitive or regulated words** need approval", "Words implying particular status or a regulated activity"],
            ["**Must carry the appropriate indicator** of status — the required suffix or designation for a limited or public company", "Puts third parties on notice of limited liability"],
          ],
        },
        {
          kind: "list",
          title: "Changing a name, and being made to",
          items: [
            "A company may **change its name voluntarily** by special resolution, or by any other means its articles provide, and the change takes effect when a **new certificate** is issued.",
            "The **registrar may direct a change** where a name is the **same as or too like** an existing one, or where misleading information was given on registration.",
            "An **adjudication or similar procedure** may require a change where a name was registered opportunistically to exploit another's goodwill.",
            "A name change **does not affect** the company's rights, obligations or legal proceedings — it is the same legal person.",
            "**Passing off** remains available to a business whose goodwill is damaged by another's use of a confusingly similar name, independently of the registration rules.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Registration of a name is not permission to use it",
          md: "The registrar's acceptance of a name means only that it passed the **registration** controls. It is **no defence** to a passing off claim, or to infringement of a registered trade mark. So a company can be lawfully incorporated under a name it is then restrained from trading under — which is why a name should be checked against trade marks and existing goodwill, not just against the register.",
        },
      ],
      check: {
        q: "A company registers a name very similar to that of a well-known competitor and begins trading. What is the position?",
        options: [
          "The registration protects it, since the registrar accepted the name",
          "The registrar may direct a change, and the competitor may separately sue for passing off or trade mark infringement",
          "Nothing can be done once the certificate has been issued",
          "The company must be wound up",
        ],
        correct: 1,
        explain:
          "Both routes are open: the REGISTRAR may direct a change where the name is the same as or too like an existing one, and the competitor has independent remedies in PASSING OFF and for trade mark infringement. Acceptance by the registrar is not permission to use the name.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Letting an outsider, or a member acting in another capacity, enforce the articles.",
      fix: "They bind the company and members in respect of MEMBERSHIP rights only.",
    },
    {
      trap: "Allowing an alteration to increase a member's capital liability without consent.",
      fix: "That requires the member's WRITTEN consent, whatever majority was obtained.",
    },
    {
      trap: "Treating a contract not to alter the articles as preventing alteration.",
      fix: "The alteration is still valid; the company may be liable in damages for breaching the contract.",
    },
    {
      trap: "Ignoring entrenchment or the bona fide requirement.",
      fix: "An alteration must clear the required majority, any entrenched condition, AND the bona fide test.",
    },
    {
      trap: "Treating acceptance of a name by the registrar as permission to use it.",
      fix: "It is no defence to passing off or trade mark infringement, and the registrar may still direct a change.",
    },
    {
      trap: "Thinking a change of name creates a new company.",
      fix: "It is the same legal person; rights, obligations and proceedings are unaffected.",
    },
  ],
  keyTerms: [
    { term: "Articles of association", def: "The company's internal rulebook, forming a contract between company and members in respect of membership rights." },
    { term: "Qua member", def: "In the capacity of a member — the only capacity in which the articles are enforceable." },
    { term: "Special resolution", def: "The supermajority members' resolution required to alter the articles, whose percentage the scenario will state." },
    { term: "Entrenchment", def: "A provision making specified articles alterable only on additional conditions or a higher majority." },
    { term: "Model articles", def: "Default articles applying unless the company adopts its own, covering directors' powers, decision-making, shares, dividends and members' meetings." },
    { term: "Passing off", def: "The claim protecting business goodwill against a misrepresentation likely to cause damage, available independently of the name registration rules." },
  ],
  summary: [
    "The constitution is principally the articles, together with constitutional resolutions and agreements.",
    "The articles bind company and members in respect of membership rights only; outsiders cannot enforce them.",
    "Model articles cover directors' powers and decision-making, appointments, shares, dividends and members' meetings.",
    "Articles are altered by special resolution, filed with the registrar, subject to entrenchment and the bona fide test.",
    "A member's liability to contribute capital cannot be increased without written consent.",
    "A contract not to alter the articles does not prevent alteration, but may give rise to damages.",
    "Name controls prevent duplication and misleading names; registration is no defence to passing off.",
  ],
  knowledgeDiagnostic: [
    { q: "In what capacity are the articles enforceable?", a: "Qua member — in respect of membership rights. An outsider, or a member acting in another capacity, cannot enforce them." },
    { q: "What three tests must an alteration of the articles pass?", a: "The required special majority, any entrenchment condition, and the requirement that it be bona fide for the benefit of the company as a whole." },
    { q: "Can a special resolution require a member to subscribe for more shares?", a: "Not against a member who has not given written consent — liability to contribute to capital cannot be increased without it." },
    { q: "What is the effect of a contract by the company not to alter its articles?", a: "It does not prevent alteration. The alteration is valid, but the company may be liable in damages for breach." },
    { q: "Does registration of a company name protect it against a passing off claim?", a: "No. Registration only means the name passed the registration controls; passing off and trade mark rights are independent." },
  ],
  furtherStudy: [
    "Chapter 22 covers class rights, whose variation the articles must respect.",
    "Chapter 28 covers the resolutions and meetings the articles regulate.",
  ],
}

/* ── Chapter 22 · E1 ───────────────────────────────────────────── */

export const LWG_TREE_22: StudyChapter = {
  id: "LWG-22",
  number: 22,
  paper: "LW",
  area: "E",
  title: "Share capital, classes of shares and issues",
  minutes: 16,
  syllabusRefs: ["E1(a)", "E1(b)", "E1(c)", "E1(d)"],
  intro:
    "Equity finance, and the vocabulary that goes with it. The distinctions that earn marks are between the kinds of capital, between classes of share, and between the two ways of issuing more.",
  outcomes: [
    "Examine the different types of capital",
    "Illustrate the differences between classes of shares, including treasury shares, and the procedure for altering class rights",
    "Explain allotment of shares and distinguish a rights issue from a bonus issue",
    "Examine the effect of issuing shares at a discount or at a premium",
  ],
  sections: [
    {
      id: "types-of-capital",
      heading: "The types of capital",
      blocks: [
        {
          kind: "table",
          caption: "The vocabulary",
          head: ["Term", "Meaning"],
          rows: [
            ["**Authorised (nominal) capital**", "The maximum the company may issue, where a jurisdiction still requires a ceiling. Many have abolished it"],
            ["**Issued (allotted) capital**", "The nominal value of shares actually issued to members"],
            ["**Called-up capital**", "The part of the issued capital the company has demanded payment of"],
            ["**Paid-up capital**", "The part actually paid"],
            ["**Share premium**", "Consideration received **above** nominal value, credited to a separate, restricted account"],
            ["**Loan capital**", "Borrowing, not share capital at all — chapter 23"],
          ],
        },
        {
          kind: "definition",
          term: "Nominal value and the no-discount rule",
          md: "Every share has a **nominal (par) value**, which fixes the shareholder's minimum contribution. A share may be issued **at a premium** — for more than nominal value — but **not at a discount**. An allottee of a share issued at a discount is liable to pay up the **shortfall**, with interest.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why the premium account is restricted",
          md: "Share premium is treated as part of the company's **capital**, not as distributable profit, so it cannot be paid out as a dividend. Its permitted uses are narrow — typically writing off issue expenses or financing a bonus issue. The purpose is **creditor protection**: money subscribed as capital should stay in the company, which is the theme of chapter 24.",
        },
      ],
      check: {
        q: "A company issues 100,000 $1 shares at $2.50 each. How is the consideration recorded?",
        options: [
          "$250,000 to share capital",
          "$100,000 to share capital and $150,000 to share premium",
          "$100,000 to share capital and $150,000 to distributable profits",
          "$250,000 to share premium",
        ],
        correct: 1,
        explain:
          "Share capital takes the NOMINAL amount — 100,000 × $1 = $100,000 — and the excess of $150,000 goes to SHARE PREMIUM, a restricted account that is not distributable as a dividend.",
      },
    },
    {
      id: "classes",
      heading: "Classes of shares, and varying their rights",
      blocks: [
        {
          kind: "table",
          caption: "The principal classes",
          head: ["Class", "Typical rights"],
          rows: [
            ["**Ordinary shares**", "Vote, receive a dividend at the directors' discretion, and take the **surplus** on winding up after everyone else. The residual risk and the residual reward"],
            ["**Preference shares**", "A **fixed** dividend paid **before** ordinary dividends, and priority for capital on winding up; usually **no vote**, or a vote only in defined circumstances"],
            ["**Cumulative** preference shares", "Unpaid dividends **accumulate** and must be paid before ordinary dividends. Presumed cumulative unless stated otherwise"],
            ["**Participating** preference shares", "The preference plus a share in surplus profits or assets"],
            ["**Redeemable** shares", "Issued on terms that they may be **bought back**; economically closer to debt, and the return on a redeemable preference share is treated as a finance cost"],
            ["**Treasury shares**", "Shares the company has bought back and **holds itself** rather than cancelling"],
          ],
        },
        {
          kind: "definition",
          term: "Treasury shares",
          md: "Shares reacquired by the company and held **in treasury** instead of being cancelled. While held, the company **may not vote** them and they carry **no dividend**; they may later be **cancelled, sold or transferred** to an employees' scheme. They give a company flexibility to return capital and then re-issue without a fresh authorisation.",
        },
        {
          kind: "list",
          style: "number",
          title: "Varying class rights",
          items: [
            "The variation procedure is that set out in the **articles**; failing one, a statutory default applies.",
            "The usual requirement is **consent of the class** — a written consent of a specified proportion of the class, or a **special resolution passed at a separate class meeting**.",
            "A **minority of the class** who did not consent may typically **apply to the court** to have the variation cancelled, within a short period.",
            "**Notice to the registrar** of the variation is required.",
            "**What counts as a variation** is narrowly construed: an action that affects the **value** or **enjoyment** of a class right without altering the right itself is often held **not** to be a variation — issuing more shares of the same class, for instance, dilutes voting power without varying the right to one vote per share.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Dilution is usually not a variation",
          md: "This catches candidates out. A preference shareholder whose 40% of the votes falls to 20% because more shares were issued has suffered a real commercial loss, but their **right** — the same vote per share — is unchanged. So the class consent machinery is generally **not** triggered, and the complaint must be founded elsewhere, such as on the directors' duties or unfair prejudice.",
        },
      ],
      check: {
        q: "Preference shares carry one vote each. The company issues many more ordinary shares, reducing the preference shareholders' proportion of the votes. Is that a variation of class rights?",
        options: [
          "Yes, because their voting power has fallen",
          "Generally no — the right itself is unchanged; only its value or enjoyment is affected",
          "Yes, because preference shares are involved",
          "Only if their proportion falls below 25%",
        ],
        correct: 1,
        explain:
          "GENERALLY NOT a variation. The RIGHT — one vote per share — is untouched; what has changed is its value and enjoyment. So the class consent procedure is not triggered, and any complaint must be founded on the directors' duties or unfair prejudice instead.",
      },
    },
    {
      id: "issues",
      heading: "Allotment, and the two kinds of issue",
      blocks: [
        {
          kind: "list",
          title: "Allotment: the constraints on the directors",
          items: [
            "Directors need **authority** to allot, from the articles or a members' resolution, unless the jurisdiction dispenses with it for a private company with one class of shares.",
            "**Pre-emption rights** usually require a new issue for cash to be offered **first to existing members** in proportion to their holdings, so their percentage is not diluted without their consent. Pre-emption may be **disapplied** by special resolution.",
            "The directors must act **for a proper purpose** and in the company's interests — issuing shares principally to defeat a takeover or to shift control is a breach of duty even if the power exists.",
            "**Consideration** must be received; shares must not be allotted at a discount, and a public company faces further rules on non-cash consideration and valuation.",
          ],
        },
        {
          kind: "table",
          caption: "Rights issue against bonus issue",
          head: ["", "Rights issue", "Bonus (capitalisation) issue"],
          rows: [
            ["**Cash raised**", "**Yes**, at the issue price", "**None**"],
            ["**Offered to**", "Existing members in proportion to holdings", "Existing members in proportion to holdings"],
            ["**Price**", "Usually **below market**, to encourage take-up", "**Free**"],
            ["**Funded from**", "The subscribers' cash", "Capitalising a **reserve** — share premium first where available, otherwise retained earnings"],
            ["**Effect on total equity**", "**Increases** by the cash received", "**No change**"],
            ["**Effect on the member's proportion**", "Unchanged **if taken up**; diluted if not", "Unchanged"],
            ["**Why do it**", "Raise capital cheaply from those who already know the company", "Reward members without cash leaving; lower the share price to improve marketability"],
          ],
        },
        {
          kind: "example",
          title: "Working an issue",
          scenario:
            "Harlow Ltd has 600,000 ordinary shares of $0.50, share premium of $180,000 and retained earnings of $940,000. It makes a 1-for-4 rights issue at $1.80, fully taken up, and then a 1-for-5 bonus issue using share premium as far as possible. A preference shareholder complains that the bonus issue has reduced its proportion of the votes.",
          steps: [
            { label: "Rights issue — the numbers", detail: "600,000 ÷ 4 = 150,000 new shares at $1.80 = $270,000 cash. Share capital takes 150,000 × $0.50 = $75,000; share premium takes the remaining $195,000." },
            { label: "Position after the rights issue", detail: "Shares 750,000; share capital $375,000; share premium $180,000 + $195,000 = $375,000; retained earnings unchanged. Total equity has risen by exactly the $270,000 raised." },
            { label: "Bonus issue — the numbers", detail: "750,000 ÷ 5 = 150,000 bonus shares at $0.50 nominal = $75,000, capitalised from share premium, which is more than sufficient. Share premium falls to $300,000." },
            { label: "Effect of the bonus issue on equity", detail: "NONE. An amount moved from one equity account to another; no cash arrived and total equity is unchanged. That is the defining feature of a bonus issue." },
            { label: "Deal with the preference shareholder", detail: "Its proportion of the votes has fallen, but its RIGHT is unchanged. Dilution of the value or enjoyment of a right is generally not a VARIATION, so the class consent procedure was not required." },
            { label: "Identify where a complaint could go instead", detail: "If the issue was made for an improper purpose — to shift control rather than to raise or capitalise capital — the objection is to the DIRECTORS' breach of duty, or unfair prejudice, not to a variation of class rights." },
          ],
          result:
            "Share capital $450,000, share premium $300,000, retained earnings $940,000, and the preference shareholder has no class-rights complaint. Two points carry the marks: **total equity rises only by the rights issue cash**, because a bonus issue creates nothing; and **dilution is not variation**, so the complaint has to be re-framed as breach of duty or unfair prejudice.",
        },
      ],
      check: {
        q: "What distinguishes a bonus issue from a rights issue?",
        options: [
          "A bonus issue is offered to outsiders and a rights issue to members",
          "A bonus issue raises no cash and leaves total equity unchanged, being funded by capitalising a reserve",
          "A bonus issue must be at a premium",
          "A rights issue requires no members' involvement",
        ],
        correct: 1,
        explain:
          "A BONUS ISSUE raises NO CASH and leaves TOTAL EQUITY UNCHANGED — an amount is capitalised from a reserve, share premium first where available, into share capital. A rights issue raises cash from existing members, usually at a discount to market.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Crediting the whole issue proceeds to share capital.",
      fix: "Share capital takes NOMINAL value; the excess goes to share premium, which is restricted and not distributable.",
    },
    {
      trap: "Issuing shares at a discount to nominal value.",
      fix: "Prohibited. The allottee remains liable for the shortfall with interest.",
    },
    {
      trap: "Treating dilution of voting power as a variation of class rights.",
      fix: "Generally it is not — the right is unchanged, only its value. Re-frame the complaint as breach of duty or unfair prejudice.",
    },
    {
      trap: "Overlooking pre-emption rights on a cash issue.",
      fix: "New shares for cash must usually be offered to existing members first, unless pre-emption is disapplied by special resolution.",
    },
    {
      trap: "Forgetting that treasury shares carry no vote and no dividend.",
      fix: "While held in treasury the company may not vote them or take a dividend on them.",
    },
    {
      trap: "Thinking a bonus issue changes total equity.",
      fix: "It capitalises a reserve into share capital. No cash, no change in total equity.",
    },
  ],
  keyTerms: [
    { term: "Nominal (par) value", def: "The face value of a share, fixing the minimum contribution and the amount credited to share capital." },
    { term: "Share premium", def: "Consideration received above nominal value, credited to a restricted account and not distributable as a dividend." },
    { term: "Preference share", def: "A share carrying a fixed dividend paid before ordinary dividends and priority for capital, usually without a vote." },
    { term: "Treasury shares", def: "Shares bought back and held by the company, carrying no vote and no dividend while held." },
    { term: "Rights issue", def: "An issue of new shares to existing members in proportion to their holdings, usually below market price, raising cash." },
    { term: "Bonus (capitalisation) issue", def: "Free shares issued to members by capitalising a reserve, raising no cash and leaving total equity unchanged." },
    { term: "Variation of class rights", def: "An alteration of the rights attached to a class, requiring the class consent procedure — narrowly construed, so dilution is generally excluded." },
  ],
  summary: [
    "Capital is described as authorised, issued, called-up and paid-up, with premium recorded separately.",
    "Shares may be issued at a premium but never at a discount to nominal value.",
    "Share premium is restricted and not distributable, protecting creditors.",
    "Ordinary shares carry the residual risk and reward; preference shares carry a fixed prior dividend and usually no vote.",
    "Treasury shares are held by the company and carry no vote or dividend while held.",
    "Class rights are varied by the articles' procedure or the statutory default, with a right for a dissenting minority to apply to the court.",
    "A rights issue raises cash; a bonus issue capitalises a reserve and leaves total equity unchanged.",
  ],
  knowledgeDiagnostic: [
    { q: "Where does the excess over nominal value go on a share issue, and why does it matter?", a: "To share premium, a restricted account that is not distributable as a dividend — a creditor-protection measure." },
    { q: "May shares be issued at a discount to nominal value?", a: "No. The allottee remains liable for the shortfall with interest." },
    { q: "What rights do treasury shares carry?", a: "None while held: no vote and no dividend. They may later be cancelled, sold, or transferred to an employees' scheme." },
    { q: "Is dilution of voting power a variation of class rights?", a: "Generally no. The right itself is unchanged; only its value or enjoyment is affected, so class consent is not triggered." },
    { q: "Contrast the effect of a rights issue and a bonus issue on total equity.", a: "A rights issue increases total equity by the cash raised. A bonus issue leaves it unchanged, capitalising a reserve into share capital." },
  ],
  furtherStudy: [
    "Chapter 23 covers the other side of the balance sheet — loan capital and charges.",
    "Chapter 24 explains why share premium and capital are protected from distribution.",
  ],
}

/** Chapters 19–22. Chapters 23–24 complete Area E in acca-study-lwg-tree-ef.ts. */
export const LWG_TREE_AREA_D_PART2: StudyChapter[] = [LWG_TREE_19, LWG_TREE_20, LWG_TREE_21]
export const LWG_TREE_AREA_E_PART1: StudyChapter[] = [LWG_TREE_22]
