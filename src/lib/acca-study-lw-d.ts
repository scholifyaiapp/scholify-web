import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW · Area D — Company law & corporate governance.
 * Rich study chapter: company types, separate legal personality (Salomon) and
 * the veil of incorporation, formation & the articles, share capital and
 * financing (shares, debentures, fixed vs floating charges), directors and
 * their seven codified duties, meetings & resolutions, insolvency & the order
 * of priority on liquidation, and governance principles. Original text.
 */

export const LW_D: StudyChapter = {
  paper: "LW",
  area: "D",
  title: "Company law & corporate governance",
  minutes: 18,
  intro: "A company is not its owners. That single legal fact — that the business is a person in its own right — shapes who is liable, who runs it, who gets paid when it fails, and who watches the watchers.",
  outcomes: [
    "Distinguish the main types of registered company and the effect of limited liability",
    "Explain separate legal personality (Salomon) and when the veil of incorporation is lifted",
    "Describe formation, the constitution and the role of the articles of association",
    "Compare ordinary and preference shares, and fixed and floating charges as company finance",
    "State the appointment, removal and seven codified general duties of directors",
    "Explain resolution types, the basics of liquidation and the order of priority of claims",
  ],
  sections: [
    {
      id: "types",
      heading: "Types of company & limited liability",
      blocks: [
        { kind: "text", md: "When people put money into a business, the one thing they fear most is losing more than they put in. The **registered company** answers that fear. By incorporating, the owners create a separate legal entity and cap their exposure: a member of a company **limited by shares** can lose the amount unpaid on their shares — no more. That protection, **limited liability**, is the reason the company is the dominant form of business worldwide." },
        { kind: "text", md: "Companies split first into **limited by shares** and **limited by guarantee**. In a company limited by shares, members contribute capital and their liability is the unpaid amount on those shares. In a company limited by **guarantee** there is usually **no share capital** — instead each member promises to pay a small fixed amount (say the nominal sum stated in the articles) **only if the company is wound up**. Guarantee companies are the natural home of clubs, charities and other **not-for-profit** bodies." },
        { kind: "text", md: "The second, more examined split is **private (Ltd)** versus **public (plc)**. A public company may offer its shares to the **public** and be listed on a market; a private company **cannot** offer shares to the public. In exchange for that fund-raising power, a public company carries heavier requirements — a minimum allotted share capital, a trading certificate before it can begin trading, at least two directors and a qualified company secretary." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Private vs public company",
          caption: "The public company can raise money from the public — and pays for it with tighter rules.",
          data: {
            leftTitle: "Private (Ltd)",
            rightTitle: "Public (plc)",
            rows: [
              { aspect: "Offer shares to public", left: "Prohibited", right: "Permitted" },
              { aspect: "Minimum share capital", left: "No minimum", right: "Minimum allotted capital (e.g. £50,000, 25% paid up)" },
              { aspect: "Minimum directors", left: "One", right: "Two" },
              { aspect: "Company secretary", left: "Optional", right: "Required, and qualified" },
              { aspect: "Start of trading", left: "On incorporation", right: "Needs a trading certificate first" },
              { aspect: "Written resolutions", left: "Allowed", right: "Not allowed — must hold a meeting" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one idea", md: "Incorporation swaps the owner's **unlimited personal risk** for a **capped, defined** risk. The price of that protection is regulation — disclosure, filing and, for a plc, minimum capital." },
      ],
    },
    {
      id: "salomon",
      heading: "Separate legal personality & the veil",
      blocks: [
        { kind: "text", md: "The foundation stone of company law is that a company is a **separate legal person**, distinct from the members who own it and the directors who run it. It can own property, make contracts, sue and be sued **in its own name**. The debts are the **company's** debts, not the members'. This principle was settled in **Salomon v A Salomon & Co Ltd**." },
        { kind: "example", title: "Salomon v A Salomon & Co Ltd (1897)", scenario: "Mr Salomon ran a boot business as a sole trader, then incorporated it, selling the business to the new company. He took most of the shares and also lent the company money secured by a debenture (a charge). The company failed. Unsecured creditors argued Salomon and the company were really the same person, so he should pay the company's debts.", steps: [
          { label: "The claim", detail: "Creditors said the company was a mere sham — Salomon in disguise — so he should be personally liable." },
          { label: "The principle", detail: "Once lawfully incorporated, the company is a separate legal person; its debts are its own." },
          { label: "The debenture", detail: "As a secured creditor, Salomon ranked ahead of the unsecured creditors on his valid charge." },
          { label: "The result", detail: "The House of Lords held Salomon was NOT personally liable. The company, not its owner, owed the debts." },
        ], result: "A properly formed company is a distinct legal person. The members' liability is limited even where one person effectively owns and controls the whole business." },
        { kind: "text", md: "The consequence of separate personality is often pictured as a **veil of incorporation** hanging between the company and its members — the law normally refuses to look behind it to reach the people. But the veil is **not absolute**. In limited circumstances a court, or a statute, will **lift (or pierce) the veil** and treat the company and its members as linked." },
        { kind: "table", caption: "When the veil is lifted", head: ["Route", "Example", "Effect"], rows: [
          ["Statute — fraudulent trading", "Carrying on business intending to defraud creditors", "Those knowingly party to it can be made personally liable"],
          ["Statute — wrongful trading", "Director keeps trading when insolvent liquidation was unavoidable", "Director may contribute to the company's assets"],
          ["Common law — sham/facade", "A company set up to evade an existing legal duty (e.g. a restraint of trade or a contract to sell land)", "Court looks through the company to the individual"],
          ["Group as single entity", "Rare cases treating a group as one economic unit", "Parent and subsidiary linked for that purpose"],
        ] },
        { kind: "callout", tone: "warn", title: "The default is the veil stays up", md: "Lifting the veil is the **exception**, not the rule. Simply owning or controlling a company, or setting one up to limit **future** liability, does **not** justify piercing it — that is the whole point of Salomon." },
      ],
      check: {
        q: "A sole trader incorporates his business, taking 99% of the shares, and the company later cannot pay its trade creditors. Applying Salomon, who is liable for the company's debts?",
        options: [
          "The majority shareholder personally, because he controls the company",
          "The company alone, as a separate legal person",
          "The directors personally, in all cases",
          "The creditors must share the loss equally with the shareholder",
        ],
        correct: 1,
        explain: "Salomon establishes that a validly incorporated company is a separate legal person, so the debts are the company's own. Control or near-total ownership does not, by itself, make a member personally liable — the veil stays up unless a lifting route (e.g. fraudulent or wrongful trading, or a sham) applies.",
      },
    },
    {
      id: "formation",
      heading: "Formation & the constitution",
      blocks: [
        { kind: "text", md: "A company comes into existence on **registration** at the companies registry. The subscribers deliver documents — an application stating the company name, whether it is public or private, the registered office and the proposed officers, a statement of capital (or of guarantee), and the **articles of association**. On approval the registrar issues a **certificate of incorporation**, which is conclusive evidence that the company exists from that date." },
        { kind: "text", md: "The **articles of association** are the company's rulebook — its **constitution**. They govern the internal running of the company: directors' powers, how meetings are called and run, how shares are issued and transferred, and how decisions are taken. A company may adopt the standard **model articles** or write its own. The articles form a **statutory contract** between the company and each member, and between the members themselves." },
        { kind: "callout", tone: "rule", title: "Objects and capacity", md: "A modern company has **unrestricted objects** unless its articles specifically restrict them, so the old doctrine of **ultra vires** rarely bites. An outsider dealing in good faith can generally rely on the company's acts even if the directors exceeded a limit in the articles." },
        { kind: "text", md: "Once formed, the company needs finance. It can raise money by issuing **share capital** (equity) or by **borrowing** (debt) — and the two carry very different rights." },
        { kind: "text", md: "**Share capital** is divided into classes. **Ordinary shares** carry a **variable dividend** (only if declared), one vote each, and the **residual** claim — they rank last on a winding up but take whatever is left after everyone else. **Preference shares** carry a **fixed dividend** and rank **ahead** of ordinary shares for that dividend and, usually, for the return of capital on a winding up; they normally carry **no vote**. Preference dividends are **cumulative** unless the terms say otherwise, so an unpaid year rolls forward and must be cleared before ordinary shareholders receive anything." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Share types — the trade-off between reward and priority",
          caption: "Ordinary = risk and control; preference = a safer, fixed, but capped return.",
          data: {
            items: [
              { title: "Ordinary shares", sub: "Variable dividend, votes, residual claim — last in the queue but unlimited upside" },
              { title: "Preference shares", sub: "Fixed dividend, priority for dividend & capital, usually no vote" },
              { title: "Cumulative preference", sub: "An unpaid dividend carries forward and must be cleared before ordinary dividends" },
              { title: "Debentures (loan capital)", sub: "Not shares at all — a creditor's debt, paid interest whether or not there is profit" },
            ],
          },
        } },
        { kind: "text", md: "Borrowing is documented by a **debenture** — the written acknowledgement of a company debt, often secured by a **charge** over the company's assets. A **debenture holder is a creditor, not a member**: they receive **interest** (payable regardless of profit) rather than dividends, and they rank ahead of shareholders. Security comes in two forms — the **fixed charge** and the **floating charge**." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Fixed vs floating charge",
          caption: "A fixed charge grips one asset; a floating charge hovers over a changing pool until it crystallises.",
          data: {
            leftTitle: "Fixed charge",
            rightTitle: "Floating charge",
            rows: [
              { aspect: "Attaches to", left: "A specific, identifiable asset (e.g. land, buildings)", right: "A shifting class of assets (e.g. stock, receivables)" },
              { aspect: "Dealing with the asset", left: "Company cannot sell without the lender's consent", right: "Company deals freely in the ordinary course of business" },
              { aspect: "When it fixes", left: "Fixed from creation", right: "Crystallises on default, liquidation or ceasing to trade" },
              { aspect: "Priority on insolvency", left: "Ranks first — paid from that asset before others", right: "Ranks after preferential creditors and the prescribed part" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Register the charge", md: "A charge must be **registered** (delivered to the registrar, generally within **21 days** of creation). An unregistered charge is **void against a liquidator and other creditors** — the debt survives but the **security is lost**, so the lender drops to an unsecured claim. Between charges, priority generally runs by **date of creation**, and a fixed charge outranks an earlier floating charge over the same asset." },
      ],
    },
    {
      id: "directors",
      heading: "Directors — powers & the seven duties",
      blocks: [
        { kind: "text", md: "A company is an artificial person, so real people must act for it. The **directors** manage the company; the **members** own it. This split of ownership from control is the heart of company law and of governance." },
        { kind: "text", md: "The **first directors** are named on formation. Afterwards the articles set the method — commonly appointment by **ordinary resolution** of the members or by the board itself. A director can be **removed** by the members by **ordinary resolution** (a simple majority) under a statutory power that cannot be excluded — but **special notice** (28 days) must be given, and the director has the right to be heard. Powers to manage are usually delegated to the **board collectively**, not to individual directors, by the articles." },
        { kind: "text", md: "Because directors handle **other people's money and property**, the law imposes **fiduciary** and skill duties. These are now set out as **seven codified general duties**. Learn them as a numbered set — the exam tests them by scenario." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The seven codified general duties of directors",
          caption: "Owed to the company itself — not directly to individual shareholders or creditors.",
          data: {
            items: [
              { title: "1 · Act within powers", sub: "Use powers for their proper purpose and stay within the constitution" },
              { title: "2 · Promote the success of the company", sub: "For the benefit of members as a whole, with regard to long-term and stakeholder factors" },
              { title: "3 · Exercise independent judgement", sub: "Do not fetter your discretion or simply follow another's instruction" },
              { title: "4 · Reasonable care, skill & diligence", sub: "The greater of an objective standard and the director's own actual skill" },
              { title: "5 · Avoid conflicts of interest", sub: "Do not let personal interests clash with the company's, or exploit its property/opportunities" },
              { title: "6 · Not accept benefits from third parties", sub: "Refuse bribes or benefits given because of the office held" },
              { title: "7 · Declare interest in a transaction", sub: "Disclose the nature and extent of any interest in a proposed arrangement" },
            ],
          },
        } },
        { kind: "text", md: "Two points examiners love. First, the **care, skill and diligence** standard (duty 4) is a **dual test**: the minimum is what a reasonably diligent person with the general knowledge of that role would show (objective), but if the director actually has **greater** skill, they are held to **that higher** standard (subjective). Second, duty 5 (**avoid conflicts**) captures the classic case of a director diverting a **corporate opportunity** to themselves — even if the company could not have taken it, the profit belongs to the company." },
        { kind: "callout", tone: "tip", md: "A member may enforce these duties on the company's behalf through a **derivative claim**, because the duties are owed to the **company**, not to the shareholder personally." },
      ],
      check: {
        q: "A director learns, through her board position, of a lucrative contract. She resigns, takes the contract personally and keeps the profit. Which general duty is most clearly breached?",
        options: [
          "The duty to exercise reasonable care, skill and diligence",
          "The duty to act within powers",
          "The duty to avoid conflicts of interest (exploiting a corporate opportunity)",
          "No duty — she resigned before taking the contract",
        ],
        correct: 2,
        explain: "Diverting a maturing business opportunity discovered through the office breaches the duty to avoid conflicts of interest. Resigning first does not cure it: the opportunity came from the position, so the profit belongs to the company. This is distinct from the care/skill duty (about competence) and acting within powers (about the constitution).",
      },
    },
    {
      id: "meetings",
      heading: "Meetings & resolutions",
      blocks: [
        { kind: "text", md: "Members exercise their power collectively through **resolutions** passed at a **general meeting** or, for a private company, in **writing**. The type of decision fixes the majority required, so knowing the thresholds is worth easy marks." },
        { kind: "text", md: "An **ordinary resolution** needs a **simple majority — more than 50%** of the votes cast. It is the default for everyday decisions: appointing and **removing directors**, approving dividends, and general business. A **special resolution** needs a **75% majority** and is reserved for fundamental changes: altering the **articles**, changing the company **name**, reducing capital, or resolving to **wind up** voluntarily." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Ordinary vs special resolution",
          caption: "The bigger the decision, the bigger the majority the law demands.",
          data: {
            leftTitle: "Ordinary resolution",
            rightTitle: "Special resolution",
            rows: [
              { aspect: "Threshold", left: "Simple majority — over 50%", right: "75% of votes cast" },
              { aspect: "Typical use", left: "Appoint/remove directors, declare dividends, routine business", right: "Alter articles, change name, reduce capital, voluntary winding up" },
              { aspect: "Notice of intention", left: "Standard notice", right: "The text must be set out and flagged as special" },
              { aspect: "Filing with registrar", left: "Only certain ones filed", right: "Must be filed within a set period" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "Removing a director", md: "Removal is by **ordinary resolution** (over 50%) — not special — but it needs **special notice** of 28 days and the director may make representations. Do not confuse the **special notice** (a procedural warning period) with a **special resolution** (a 75% vote)." },
      ],
    },
    {
      id: "insolvency",
      heading: "Insolvency, liquidation & governance",
      blocks: [
        { kind: "text", md: "When a company reaches the end of its life, **liquidation (winding up)** turns its assets into cash, pays claims in a strict order, and dissolves it. There are two broad routes." },
        { kind: "text", md: "**Compulsory liquidation** is ordered by the **court**, usually on a creditor's petition — most often because the company is **unable to pay its debts**, or on the **just and equitable** ground. **Voluntary liquidation** is started by the members' own **special resolution** and splits in two: a **members' voluntary liquidation** where the directors make a **declaration of solvency** (the company can pay in full), and a **creditors' voluntary liquidation** where it cannot, so the **creditors** take control of the process." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Routes into winding up",
          caption: "Solvent or insolvent, court-driven or member-driven — each path ends in dissolution.",
          data: {
            steps: [
              { label: "Trigger", sub: "Company cannot pay, or members decide to end it" },
              { label: "Choose route", sub: "Compulsory (court) or voluntary (members' resolution)" },
              { label: "Liquidator appointed", sub: "Takes control, realises the assets" },
              { label: "Distribute", sub: "Pay claims in the order of priority" },
              { label: "Dissolution", sub: "Company struck off and ceases to exist" },
            ],
          },
        } },
        { kind: "text", md: "The heart of the topic is the **order of priority** — who gets paid, and in what sequence, from the realised assets. Money flows **top to bottom**; a lower class is paid only once every class above it is satisfied in full. Ordinary shareholders, the owners, come **last** — the mirror image of their unlimited upside while the company thrives." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "Priority of claims on liquidation",
          caption: "Paid from the top down; each tier is met in full before the next receives anything.",
          data: {
            levels: [
              { label: "Fixed charge holders", sub: "Paid first from the proceeds of the charged asset" },
              { label: "Costs & expenses of the liquidation", sub: "Including the liquidator's remuneration" },
              { label: "Preferential debts", sub: "E.g. certain employee wages and holiday pay within limits" },
              { label: "Prescribed part", sub: "A ring-fenced slice of floating-charge funds kept back for unsecured creditors" },
              { label: "Floating charge holders", sub: "Paid from the remaining floating-charge assets" },
              { label: "Unsecured creditors", sub: "Trade creditors and other unsecured debts, rank equally" },
              { label: "Shareholders", sub: "Preference then ordinary — the residual owners, paid last" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Why the charge type decides the outcome", md: "This is why **fixed vs floating** matters so much. A **fixed** charge holder is near the top and usually paid in full; a **floating** charge holder sits **below** preferential creditors and the **prescribed part**, so often recovers little. An **unsecured** trade creditor ranks even lower — and shareholders, if anything is left at all, come **last**." },
        { kind: "text", md: "Insolvency exposes the danger of directors abusing the veil, which is where **corporate governance** comes in. Governance is the **system by which companies are directed and controlled** — it manages the **agency problem**: directors (agents) running the company may not act in the interests of the members (principals) who own it." },
        { kind: "text", md: "Core governance principles include **separating the roles of chair and chief executive** so no one person dominates; appointing **independent non-executive directors** to challenge and monitor the executives; using board **committees** (audit, remuneration, nomination) to handle conflicted areas; ensuring **accountability and transparency** to shareholders; and, in code-based systems, a **\"comply or explain\"** approach — follow the code, or publicly explain why not. Good governance does not guarantee success, but it makes abuse harder to hide." },
      ],
      check: {
        q: "On a liquidation, in what order are these paid: (i) unsecured trade creditors, (ii) preferential debts, (iii) fixed charge holders?",
        options: [
          "Unsecured creditors, then preferential debts, then fixed charge holders",
          "Fixed charge holders, then preferential debts, then unsecured creditors",
          "Preferential debts, then fixed charge holders, then unsecured creditors",
          "All three rank equally and share the assets pro rata",
        ],
        correct: 1,
        explain: "The order runs fixed charge holders (paid first from the charged asset), then liquidation costs, then preferential debts, then the prescribed part and floating charge holders, then unsecured creditors, and finally shareholders. So of these three: fixed charge → preferential → unsecured. They do not rank equally.",
      },
    },
  ],
  examTraps: [
    { trap: "Thinking a majority or sole shareholder is personally liable for company debts.", fix: "Salomon: the company is a separate legal person. Control does not lift the veil — only routes like fraudulent/wrongful trading or a sham do." },
    { trap: "Saying a director is removed by special resolution.", fix: "Removal is by ORDINARY resolution (over 50%) — but with special NOTICE of 28 days. Special notice is not a special resolution." },
    { trap: "Ranking a floating charge above preferential creditors.", fix: "Floating charge holders rank BELOW preferential debts and the prescribed part. A fixed charge, by contrast, is paid first from its asset." },
    { trap: "Treating a debenture holder as a member or listing only six directors' duties.", fix: "A debenture holder is a creditor (interest, ranks ahead of shares), not a shareholder. There are SEVEN codified general duties." },
    { trap: "Forgetting to register a charge, or missing why it matters.", fix: "A charge is generally registrable within 21 days. If unregistered it is void against the liquidator/creditors — the lender loses its security and drops to unsecured." },
  ],
  keyTerms: [
    { term: "Separate legal personality", def: "A company is a legal person distinct from its members and directors; its debts and property are its own (Salomon)." },
    { term: "Veil of incorporation", def: "The separation between a company and its members; lifted only exceptionally, e.g. fraudulent/wrongful trading or a sham." },
    { term: "Articles of association", def: "The company's constitution — its internal rulebook — forming a statutory contract between the company and its members." },
    { term: "Floating charge", def: "Security over a shifting class of assets that the company deals with freely until it crystallises on default or liquidation." },
    { term: "Special resolution", def: "A members' resolution needing a 75% majority, required for fundamental changes such as altering the articles." },
    { term: "Preferential debts", def: "Claims (e.g. certain employee wages within limits) paid ahead of floating charge holders and unsecured creditors on liquidation." },
  ],
  summary: [
    "Companies are limited by shares or guarantee, and private (Ltd) or public (plc) — the plc can raise money from the public but faces tighter rules.",
    "Salomon: a validly formed company is a separate legal person, so its debts are its own; the veil is lifted only exceptionally.",
    "The articles are the constitution; finance comes from shares (ordinary = votes/residual, preference = fixed dividend/priority) and debt secured by fixed or floating charges (register within 21 days).",
    "Directors manage the company and owe seven codified general duties — within powers, promote success, independent judgement, care/skill, avoid conflicts, refuse benefits, declare interests.",
    "Ordinary resolutions need over 50%; special resolutions need 75%; a director is removed by ordinary resolution with 28 days' special notice.",
    "Liquidation is compulsory (court) or voluntary; claims are paid fixed charge → costs → preferential → prescribed part → floating charge → unsecured → shareholders. Governance manages the agency problem between owners and directors.",
  ],
}
