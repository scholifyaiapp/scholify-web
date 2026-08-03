import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-GLOBAL · Area D — formation and constitution of business organisations.
 * Chapters 17–21 of the LW-Global reading tree, mapped to syllabus groups D1–D4.
 *
 * This area IS shared with LW-ENG in substance — agency, partnerships, corporate
 * personality and company formation are common to both variants — so the reasoning
 * here is deliberately jurisdiction-neutral: the principle and its elements, not one
 * country's statute. Where a rule depends on a domestic companies statute the chapter
 * says so, and tells the learner to apply the figure the scenario supplies.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth.
 */

/* ── Chapter 17 · D1 ───────────────────────────────────────────── */

export const LWG_TREE_17: StudyChapter = {
  id: "LWG-17",
  number: 17,
  paper: "LW",
  area: "D",
  title: "Agency: formation, authority and liability",
  minutes: 16,
  syllabusRefs: ["D1(a)", "D1(b)", "D1(c)", "D1(d)"],
  intro:
    "Agency is the doctrine that lets a company act at all, because a company can only ever act through people. Almost every question in it reduces to one issue: did the agent have authority?",
  outcomes: [
    "Define the role of an agent and give examples, including partners and company directors",
    "Explain how an agency relationship is formed",
    "Distinguish express, implied, apparent and usual authority, and ratification",
    "Explain the liability of principal and agent to a third party",
    "Apply the rules on authority to decide whether a principal is bound",
  ],
  sections: [
    {
      id: "formation",
      heading: "What an agent is, and how the relationship arises",
      blocks: [
        {
          kind: "definition",
          term: "Agency",
          md: "A relationship in which one person, the **agent**, is authorised to act on behalf of another, the **principal**, so as to **affect the principal's legal relations** with third parties. The agent's function is to bring the **principal and the third party** into a contractual relationship — not to contract on its own account.",
        },
        {
          kind: "list",
          title: "The examples the syllabus names",
          items: [
            "**Partners** are agents of the firm and of each other for the purpose of the partnership business — which is why one partner's contract can bind them all (chapter 18).",
            "**Company directors** are agents of the company, which is how a company that exists only on paper enters contracts (chapter 24).",
            "**Employees** may be agents within the scope of their role — a purchasing manager, a shop assistant taking payment.",
            "**Professional intermediaries** — brokers, factors, commercial agents — appointed to negotiate or conclude specific transactions.",
          ],
        },
        {
          kind: "table",
          caption: "How an agency relationship is formed",
          head: ["Route", "How it works"],
          rows: [
            ["**Express agreement**", "The principal appoints the agent in words, orally or in writing. No particular form is generally required unless a domestic rule demands it for a specific act"],
            ["**Implied agreement**", "Inferred from the parties' **conduct** or their **relationship** — a person put in a position that ordinarily carries authority is taken to have it"],
            ["**Ratification**", "The principal **adopts** an unauthorised act after the event, which makes it binding **retrospectively**"],
            ["**Necessity**", "In limited circumstances an agent acquires authority to act to protect the principal's property in an emergency where it cannot obtain instructions"],
            ["**Apparent authority (estoppel)**", "Not truly formation: the principal is **prevented from denying** authority it has held out, even if none was given"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Ratification and its limits",
          md: "Ratification makes an unauthorised act binding **from the outset**, but only if three things hold: the agent **purported to act for the principal**, the principal was **in existence and ascertainable** at the time of the act, and the principal ratifies with **full knowledge** of the material facts. A principal cannot ratify **part** of a transaction and reject the rest, and cannot ratify once the third party has withdrawn. This is exactly the mechanism chapter 20 applies to pre-incorporation contracts — where the second condition is the problem.",
        },
      ],
      check: {
        q: "An agent contracts without authority. What must be true before the principal can ratify?",
        options: [
          "Only that the principal is willing to be bound",
          "The agent purported to act for the principal, the principal existed and was ascertainable at the time, and it ratifies with full knowledge of the material facts",
          "That the third party consents to the ratification",
          "That the agent has since been formally appointed",
        ],
        correct: 1,
        explain:
          "Three conditions: the agent PURPORTED to act for the principal, the principal EXISTED and was ascertainable at the time of the act, and ratification is made with FULL KNOWLEDGE of the material facts. The third party's consent is not needed — though ratification is too late once the third party has withdrawn — and the agent need not be appointed afterwards.",
      },
    },
    {
      id: "authority",
      heading: "The kinds of authority",
      blocks: [
        {
          kind: "table",
          caption: "Four kinds, and what each turns on",
          head: ["Kind", "Source", "Test"],
          rows: [
            ["**Express** (actual)", "What the principal actually told the agent it could do", "The terms of the appointment"],
            ["**Implied** (actual)", "What is **incidental or necessary** to carrying out the express authority", "What an agent in that role would ordinarily need to do"],
            ["**Usual**", "What an agent **in that position** in that trade customarily has", "The customary authority of the office or role"],
            ["**Apparent** (ostensible)", "What the principal **represented** to the third party, by words or conduct", "A **holding out** by the principal, **relied on** by the third party"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Apparent authority protects the third party, and needs a representation BY THE PRINCIPAL",
          md: "The point most often got wrong is the source of the representation. **The agent cannot create its own apparent authority** by asserting that it has authority. The holding out must come from the **principal** — by appointing the agent to a position that ordinarily carries such authority, by allowing it to act in that way before, or by expressly saying so. And the third party must have **relied** on it, so a third party who knew the agent lacked authority cannot invoke it.",
        },
        {
          kind: "illustration",
          title: "Where apparent authority comes from",
          md: "A company appoints Hallam as \"sales director\" and for two years lets him agree supply contracts up to $200,000 without board involvement. Internally, the board resolved that his limit is $50,000, but no third party is told.\n\nHallam agrees a $180,000 contract with a new customer.\n\nThe internal limit binds Hallam to the company — he has exceeded his **actual** authority and may be liable to it. But the company **held him out** as a sales director who agreed contracts of that size, and the customer relied on that. So the company is bound by **apparent authority**, and must perform.\n\nHad Hallam simply told the customer \"I can sign up to $200,000\" with nothing from the company to support it, there would be no holding out — the representation must come from the **principal**.",
        },
        {
          kind: "example",
          title: "Working an authority problem",
          scenario:
            "Brannock Logistics employs Petrie as depot manager. Her written appointment authorises her to buy consumables and to hire agency drivers, but says vehicle purchases require board approval. Over three years Petrie has bought four vans, each time with the board approving afterwards without comment, and the supplier Cawdor Motors has dealt with her throughout. This month Petrie orders two vans from Cawdor for $96,000, and separately orders a forklift for $28,000 from Tarnside Plant, a supplier Brannock has never used, telling Tarnside \"I have full authority for plant purchases\". The board refuses both.",
          steps: [
            { label: "Start with express authority", detail: "Petrie's written appointment covers consumables and agency drivers, and expressly EXCLUDES vehicle purchases without board approval. So she had no express authority for either order." },
            { label: "Consider implied authority", detail: "Implied authority covers what is incidental or necessary to the express authority. Buying vans and a forklift is not incidental to buying consumables and hiring drivers — and an express EXCLUSION defeats an implied authority that would contradict it." },
            { label: "Apply apparent authority to Cawdor", detail: "Brannock let Petrie buy four vans from Cawdor and RATIFIED each without comment. That course of dealing is a HOLDING OUT by the principal that she may buy vehicles, and Cawdor relied on it. Brannock is BOUND on the $96,000 order." },
            { label: "Apply apparent authority to Tarnside", detail: "Tarnside is a NEW supplier with no course of dealing, and its only basis is Petrie's OWN assertion of authority. An agent cannot create its own apparent authority, so there is no holding out by Brannock. It is NOT bound on the $28,000 order." },
            { label: "Consider the position of the agent", detail: "Petrie exceeded her actual authority in both cases. Brannock may have a claim against her for breach of her duty as agent — and on the Tarnside order she may be personally liable to Tarnside for breach of warranty of authority." },
            { label: "Note what would change the Tarnside answer", detail: "If Brannock RATIFIED the forklift order — for instance by accepting and using the machine with knowledge of the facts — it would be bound retrospectively, and could not then keep the forklift while rejecting the price." },
          ],
          result:
            "Bound to Cawdor, not bound to Tarnside. The whole answer turns on **where the representation came from**: a course of dealing the principal permitted is a holding out; the agent's own assertion is not. And the agent's exposure runs two ways — to the principal for exceeding authority, and to the third party for warranting authority it did not have.",
        },
      ],
      check: {
        q: "An agent tells a supplier it has authority to place orders up to $100,000. The principal has never dealt with that supplier or said anything to it. Is the principal bound by a $90,000 order?",
        options: [
          "Yes, because the agent represented that it had authority",
          "No — apparent authority requires a holding out by the principal, and an agent cannot create its own",
          "Yes, because $90,000 is within the amount stated",
          "Only if the agent is a director",
        ],
        correct: 1,
        explain:
          "NOT BOUND. Apparent authority needs a representation BY THE PRINCIPAL, relied on by the third party. An agent cannot manufacture its own authority by asserting it. The supplier's recourse is against the AGENT, for breach of warranty of authority.",
      },
    },
    {
      id: "liability",
      heading: "Who is liable to the third party",
      blocks: [
        {
          kind: "table",
          caption: "The pattern of liability",
          head: ["Situation", "Principal liable?", "Agent liable?"],
          rows: [
            ["Agent acts **within authority**, principal **named**", "**Yes**", "No — the agent drops out of the transaction"],
            ["Agent acts within authority for an **unnamed but disclosed** principal", "**Yes**", "Generally no, unless the agent contracted personally"],
            ["Agent acts within authority for an **undisclosed** principal", "**Yes**, once disclosed the third party may elect", "**Yes** — the third party may sue either, but not both"],
            ["Agent acts **outside authority**, no apparent authority, no ratification", "**No**", "**Yes** — breach of warranty of authority"],
            ["Agent acts outside actual authority but within **apparent** authority", "**Yes**", "Liable to the **principal** for exceeding authority"],
            ["Principal **ratifies** an unauthorised act", "**Yes**, retrospectively", "No"],
          ],
        },
        {
          kind: "list",
          title: "The agent's duties to the principal",
          items: [
            "**Perform the task** with reasonable care and skill, and follow lawful instructions.",
            "**Act personally**, and not delegate without authority.",
            "**Act in the principal's interests**, avoiding a conflict — a **fiduciary** duty.",
            "**Not to make a secret profit**, and to **account** for any benefit received by virtue of the position. A secret commission must be handed over, and may allow the principal to terminate and to rescind the tainted transaction.",
            "**Keep accounts** and disclose material information.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Secret profit is strict",
          md: "The agent does not escape by showing the principal suffered no loss, or that the deal was a good one. The obligation is to **account for the benefit** received through the position. Scenarios where an agent takes a supplier's \"introduction fee\" are testing this, and the answer is that the fee belongs to the principal.",
        },
      ],
      check: {
        q: "An agent, acting within authority for a principal whose existence it did not disclose, contracts with a supplier. The supplier later learns of the principal. Whom may it sue?",
        options: [
          "The principal only",
          "The agent only",
          "Either the principal or the agent, at its election, but not both",
          "Neither, as the contract is void for non-disclosure",
        ],
        correct: 2,
        explain:
          "With an UNDISCLOSED principal the third party may, on discovering it, ELECT to sue either the principal or the agent — but not both. Non-disclosure does not make the contract void; the agent contracted personally and remains liable until the election is made.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Letting an agent create its own apparent authority.",
      fix: "The holding out must come from the PRINCIPAL, and the third party must have relied on it.",
    },
    {
      trap: "Finding implied authority that contradicts an express exclusion.",
      fix: "Implied authority covers what is incidental to the express authority. An express exclusion defeats it.",
    },
    {
      trap: "Allowing partial ratification.",
      fix: "A principal must ratify the whole transaction or none, with full knowledge of the material facts, and cannot ratify after the third party withdraws.",
    },
    {
      trap: "Excusing a secret profit because the principal lost nothing.",
      fix: "The duty is to ACCOUNT for the benefit received through the position. Absence of loss is no answer.",
    },
    {
      trap: "Suing both principal and agent where the principal was undisclosed.",
      fix: "The third party ELECTS between them; it cannot recover from both.",
    },
    {
      trap: "Forgetting that the agent is exposed even where the principal is bound.",
      fix: "An agent within apparent but outside actual authority is liable to the PRINCIPAL for exceeding it.",
    },
  ],
  keyTerms: [
    { term: "Agency", def: "A relationship in which an agent is authorised to act for a principal so as to affect the principal's legal relations with third parties." },
    { term: "Express authority", def: "The authority the principal actually conferred in words." },
    { term: "Implied authority", def: "Authority to do what is incidental or necessary to carrying out the express authority." },
    { term: "Usual authority", def: "The authority an agent holding a particular position customarily has in that trade." },
    { term: "Apparent (ostensible) authority", def: "Authority arising from the principal's holding out, relied on by the third party, even where no actual authority was given." },
    { term: "Ratification", def: "The principal's retrospective adoption of an unauthorised act, requiring that the agent purported to act for it, that it existed and was ascertainable, and full knowledge of the facts." },
    { term: "Breach of warranty of authority", def: "The agent's liability to a third party for representing an authority it did not have." },
  ],
  summary: [
    "An agent affects the principal's legal relations with third parties; partners and directors are the leading examples.",
    "Agency arises by express or implied agreement, by ratification, by necessity, or through apparent authority by estoppel.",
    "Ratification is retrospective but requires a purported agency, an existing ascertainable principal and full knowledge.",
    "Authority may be express, implied, usual or apparent; apparent authority needs a holding out by the principal.",
    "An agent cannot create its own apparent authority by asserting it.",
    "Where the agent acts within authority for a named principal, the principal alone is liable.",
    "An agent owes fiduciary duties, must not make a secret profit, and must account for benefits received through the position.",
  ],
  knowledgeDiagnostic: [
    { q: "What must a third party show to rely on apparent authority?", a: "A holding out by the principal — by appointment, prior conduct or express statement — and its own reliance on that representation." },
    { q: "State the three conditions for ratification.", a: "The agent purported to act for the principal; the principal existed and was ascertainable at the time; and it ratifies with full knowledge of the material facts." },
    { q: "Who is liable where an agent exceeds its authority and there is no apparent authority or ratification?", a: "The agent, for breach of warranty of authority. The principal is not bound." },
    { q: "What must an agent do with a commission received from a supplier without the principal's knowledge?", a: "Account for it to the principal. It is a secret profit, and the absence of loss to the principal is no defence." },
    { q: "Whom may a third party sue on discovering an undisclosed principal?", a: "Either the principal or the agent, at its election — but not both." },
  ],
  furtherStudy: [
    "Chapter 18 applies agency to partners, who are agents of the firm.",
    "Chapter 24 applies it to directors, whose authority binds the company.",
  ],
}

/* ── Chapter 18 · D2 ───────────────────────────────────────────── */

export const LWG_TREE_18: StudyChapter = {
  id: "LWG-18",
  number: 18,
  paper: "LW",
  area: "D",
  title: "Partnerships",
  minutes: 15,
  syllabusRefs: ["D2(a)", "D2(b)", "D2(c)", "D2(d)", "D2(e)"],
  intro:
    "A partnership needs no formality to exist, which is its attraction and its danger: partners can find themselves liable for debts they never agreed to, incurred by someone they never authorised.",
  outcomes: [
    "Demonstrate knowledge of the legislation governing unlimited and limited partnerships",
    "Discuss the formation of a partnership",
    "Explain the authority of partners in relation to partnership activity",
    "Analyse the liability of partners for partnership debts",
    "Explain the termination of a partnership and partners' subsequent rights and liabilities",
  ],
  sections: [
    {
      id: "formation-and-types",
      heading: "Formation, and the types of partnership",
      blocks: [
        {
          kind: "definition",
          term: "Partnership",
          md: "The relationship which exists between persons **carrying on a business in common with a view of profit**. Three elements: a **business**, carried on **in common**, with the **intention of making a profit**. No written agreement, registration or formality is required — a partnership can exist because of what people do.",
        },
        {
          kind: "list",
          title: "What does NOT by itself create a partnership",
          items: [
            "**Sharing gross returns** — dividing takings is not the same as sharing profit.",
            "**Receiving a share of profits as a lender or seller** — a creditor paid out of profits, or a retiring owner paid by instalments from profits, is not thereby a partner.",
            "**Joint ownership of property**, without carrying on a business in common.",
            "**Describing the arrangement as something else.** Conversely, calling it a partnership does not make it one if the elements are absent — substance decides.",
          ],
        },
        {
          kind: "table",
          caption: "Types of partnership",
          head: ["Type", "Liability", "Formality"],
          rows: [
            ["**Unlimited (general) partnership**", "Every partner is liable **without limit** for the firm's debts", "None required; a written agreement is usual but optional"],
            ["**Limited partnership**", "At least one **general** partner with unlimited liability, plus **limited** partners whose liability is capped at their contribution", "**Registration** required, and a limited partner who takes part in management loses the protection"],
            ["**Limited liability partnership** (where a jurisdiction provides for one)", "The **entity** is liable; members' liability is limited", "Incorporation and filing requirements, closer to a company"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "A limited partner who manages loses the limit",
          md: "The protection given to a limited partner is conditional on **staying out of management**. A limited partner who takes part in managing the business becomes liable **as a general partner** for the debts incurred while doing so. Scenarios put a limited partner in a negotiation or a hiring decision precisely to test this.",
        },
      ],
      check: {
        q: "Two people jointly own a warehouse and let it, dividing the rent equally. Are they partners?",
        options: [
          "Yes, because they share the income equally",
          "No — joint ownership and sharing receipts is not carrying on a business in common with a view of profit",
          "Yes, because letting property is a business",
          "Only if they have a written agreement",
        ],
        correct: 1,
        explain:
          "NOT PARTNERS. Joint ownership of property and division of receipts does not by itself amount to carrying on a BUSINESS IN COMMON with a view of profit. Sharing gross returns is expressly not enough — and a written agreement is neither necessary nor sufficient.",
      },
    },
    {
      id: "authority-and-liability",
      heading: "Authority and liability",
      blocks: [
        {
          kind: "definition",
          term: "Each partner as agent of the firm",
          md: "Every partner is an **agent of the firm and of the other partners** for the purpose of the partnership business. So a partner's act **binds the firm** where it is done for carrying on, **in the usual way**, business of the kind the firm carries on — **unless** the partner had **no authority** to act and the third party either **knew** that, or **did not know or believe** the person to be a partner.",
        },
        {
          kind: "list",
          style: "number",
          title: "Applying that test in order",
          items: [
            "**Is the act of the kind the firm's business involves?** An act plainly outside the firm's trade does not bind it.",
            "**Was it done in the usual way** for that business? An unusual transaction puts the third party on notice.",
            "**Did the partner have authority?** If yes, the firm is bound and the analysis stops.",
            "**If not, did the third party know that, or not believe them to be a partner?** If either applies, the firm escapes. Otherwise it is bound.",
          ],
        },
        {
          kind: "table",
          caption: "Who bears the liability",
          head: ["Liability", "Who, and to what extent"],
          rows: [
            ["**Debts and obligations** of the firm", "Every partner, **jointly** and without limit; the firm's assets are applied first in practice but the partners' personal assets follow"],
            ["**Wrongs** committed in the ordinary course of the business", "The firm, and the partners are liable for them"],
            ["A partner's **misapplication** of money or property received for the firm", "The firm is liable"],
            ["**A new partner**", "Not liable for debts incurred **before** joining, unless they agree to be"],
            ["**A retiring partner**", "Remains liable for debts incurred **while** a partner, unless released; and may remain liable for **later** debts to those who still believe them a partner unless notice is given"],
            ["**A person held out as a partner**", "Liable to a third party who gave credit on the faith of that appearance"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Retirement without notice is the classic exposure",
          md: "A partner who retires stays liable for what was incurred while they were in the firm — and, unless proper **notice** is given to existing customers and generally to the world, may also be caught by **later** debts, because those dealing with the firm still believe them to be a partner. Giving notice on retirement is the single most practical point in the topic, and scenarios rarely mention it by accident.",
        },
        {
          kind: "example",
          title: "Working a partnership liability problem",
          scenario:
            "Ashwell, Bracken and Calder are partners in a firm of commercial surveyors. Their written agreement says no partner may borrow more than $20,000 without the others' consent. Without telling the others, Calder borrows $150,000 from Ridgeworth Bank in the firm's name to fund a property speculation of his own; the bank knows the firm and has lent to it before. Separately, Bracken retires on 1 March. No notice is given to clients. On 20 April a long-standing client engages \"the firm\" for a survey and is later owed damages for negligent work done by Ashwell. Calder's speculation fails.",
          steps: [
            { label: "The borrowing — is it the firm's kind of business?", detail: "Borrowing is something a surveying firm might well do in the usual way, and the bank has lent to the firm before. So on its face the act is within the kind of business the firm carries on." },
            { label: "Did Calder have authority?", detail: "No — the agreement caps borrowing at $20,000 without consent, and he did not obtain it. So he acted outside his ACTUAL authority." },
            { label: "Does the internal limit protect the firm?", detail: "Only if the bank KNEW of the lack of authority, or did not believe Calder to be a partner. The internal agreement was not communicated to the bank, so neither applies: the FIRM IS BOUND on the $150,000." },
            { label: "Calder's position", detail: "Calder is liable to his partners for breach of the agreement and for applying the money to his own speculation. The firm's liability to the bank does not save him internally." },
            { label: "Bracken and the April engagement", detail: "The negligence occurred AFTER Bracken retired, but NO NOTICE was given. A long-standing client who still believed Bracken a partner may hold him liable for that later obligation." },
            { label: "Bracken and pre-retirement debts", detail: "Bracken also remains liable for anything incurred WHILE a partner — including the borrowing, which pre-dated 1 March — unless the bank released him." },
          ],
          result:
            "The firm is bound to the bank for $150,000, all three partners are exposed without limit, and Bracken is caught by both the earlier borrowing and the later negligence for want of notice. Two rules do the work: an **internal limit binds only those who know of it**, and **retirement without notice leaves the retiring partner exposed** to those who reasonably still treat them as a partner.",
        },
      ],
      check: {
        q: "A partnership agreement limits each partner to contracts of $10,000. A partner signs a $60,000 contract, of the kind the firm ordinarily makes, with a supplier who knows nothing of the limit. Is the firm bound?",
        options: [
          "No, because the partner exceeded the agreed limit",
          "Yes — an internal restriction does not affect a third party who neither knew of it nor doubted the partner's status",
          "Yes, but only up to $10,000",
          "No, unless the other partners later ratify",
        ],
        correct: 1,
        explain:
          "BOUND. A partner binds the firm for acts done in the usual way of its business unless the third party KNEW of the lack of authority or did not believe them to be a partner. An internal cap the supplier never heard of does neither. The partner is liable to the others internally, and the contract is not scaled down to the limit.",
      },
    },
    {
      id: "termination",
      heading: "Termination, and what follows",
      blocks: [
        {
          kind: "table",
          caption: "How a partnership comes to an end",
          head: ["Event", "Effect"],
          rows: [
            ["**Expiry of a fixed term**, or completion of the venture", "Dissolution, unless the partners continue"],
            ["**Notice** by a partner, where the partnership is at will", "Dissolution on the date stated"],
            ["**Death or bankruptcy** of a partner", "Dissolution, subject to contrary agreement"],
            ["**Illegality** of the business", "Dissolution"],
            ["**Court order**", "On grounds such as a partner's incapacity, persistent breach, conduct prejudicial to the business, losses, or where it is just and equitable"],
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "The order of application of assets on dissolution",
          items: [
            "**Outside creditors** of the firm are paid first.",
            "**Partners' advances** — loans made by partners to the firm, as distinct from capital — are repaid next.",
            "**Partners' capital** is returned.",
            "**Any surplus** is divided between the partners in the same proportions as profits were shared.",
            "**A deficiency** is borne by the partners in the profit-sharing proportions — which is where unlimited liability bites.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Advances rank ahead of capital",
          md: "A partner who lends money to the firm ranks **after outside creditors but ahead of the return of capital**. Distinguishing an **advance** from **capital** therefore changes the order of payment, and a scenario that says a partner \"lent the firm $40,000\" rather than \"contributed further capital\" is telling you which rung it sits on.",
        },
        {
          kind: "list",
          title: "Continuing authority and duties after dissolution",
          items: [
            "Partners retain authority to do what is **necessary to wind up** the firm's affairs and complete transactions begun but unfinished.",
            "The duty of **good faith** continues during winding up.",
            "**Notice** of dissolution should be given, for the same reason as on retirement.",
            "A partner may **apply to the court** for the affairs to be wound up if the others will not co-operate.",
          ],
        },
      ],
      check: {
        q: "On dissolution the firm's assets are $300,000. Outside creditors are owed $180,000, one partner made a $50,000 loan to the firm, and total capital contributions were $120,000. What happens?",
        options: [
          "Creditors take $180,000, the loan is repaid $50,000, and the remaining $70,000 is applied to capital, leaving a $50,000 capital shortfall borne in profit-sharing proportions",
          "Capital is returned first, then the loan, then creditors",
          "The loan ranks equally with capital",
          "Creditors and the partner's loan rank equally",
        ],
        correct: 0,
        explain:
          "The order is OUTSIDE CREDITORS, then partners' ADVANCES, then CAPITAL, then any surplus in profit-sharing proportions. So $180,000 to creditors, $50,000 to repay the advance, and only $70,000 left against $120,000 of capital — the $50,000 shortfall falls on the partners in their profit-sharing proportions.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Requiring a written agreement or registration for a general partnership.",
      fix: "None is needed. A partnership exists where persons carry on a business in common with a view of profit.",
    },
    {
      trap: "Treating a share of profits as conclusive of partnership.",
      fix: "Sharing gross returns, or receiving profits as a lender or a retiring owner, does not by itself create a partnership.",
    },
    {
      trap: "Letting an internal authority limit defeat a third party.",
      fix: "It binds only a third party who knew of it, or who did not believe the person to be a partner.",
    },
    {
      trap: "Assuming retirement ends all liability.",
      fix: "The retiring partner stays liable for debts incurred while a partner, and — without notice — may be caught by later ones.",
    },
    {
      trap: "Letting a limited partner manage the business.",
      fix: "Taking part in management makes them liable as a general partner for debts incurred while doing so.",
    },
    {
      trap: "Repaying capital before a partner's loan.",
      fix: "The order is outside creditors, then partners' advances, then capital, then surplus.",
    },
  ],
  keyTerms: [
    { term: "Partnership", def: "The relationship between persons carrying on a business in common with a view of profit, requiring no formality to exist." },
    { term: "Limited partnership", def: "A registered partnership with at least one general partner of unlimited liability and limited partners whose liability is capped, provided they take no part in management." },
    { term: "Partner as agent", def: "Each partner's capacity to bind the firm by acts done in the usual way of business of the kind the firm carries on." },
    { term: "Holding out", def: "Appearing to be a partner, making a person liable to a third party who gave credit on the faith of that appearance." },
    { term: "Advance", def: "A loan by a partner to the firm, ranking after outside creditors but ahead of the return of capital." },
    { term: "Dissolution", def: "The ending of the partnership, by expiry, notice, death or bankruptcy, illegality or court order." },
  ],
  summary: [
    "A partnership exists where persons carry on a business in common with a view of profit; no formality is needed.",
    "Sharing gross returns, or taking profits as a lender, does not by itself create one.",
    "A limited partnership needs registration, and a limited partner who manages loses the limit.",
    "Every partner is an agent of the firm for acts done in the usual way of its business.",
    "An internal authority limit binds only a third party who knew of it or doubted the partner's status.",
    "Partners are liable without limit; a new partner escapes earlier debts and a retiring partner needs notice to escape later ones.",
    "On dissolution: outside creditors, then partners' advances, then capital, then surplus in profit-sharing proportions.",
  ],
  knowledgeDiagnostic: [
    { q: "State the three elements of a partnership.", a: "A business, carried on in common, with a view of profit." },
    { q: "When does a partner's unauthorised act NOT bind the firm?", a: "Where the third party knew the partner lacked authority, or did not know or believe them to be a partner — or where the act is not of the kind the firm's business involves." },
    { q: "What is the position of a retiring partner?", a: "Liable for debts incurred while a partner unless released, and potentially for later debts to those who still believe them a partner unless notice is given." },
    { q: "What does a limited partner risk by taking part in management?", a: "Liability as a general partner for the debts incurred while doing so." },
    { q: "Give the order of application of assets on dissolution.", a: "Outside creditors, then partners' advances, then return of capital, then any surplus divided in profit-sharing proportions." },
  ],
  furtherStudy: [
    "Chapter 19 contrasts the partnership with the company and its separate legal personality.",
    "Chapter 17 supplies the agency principles that make a partner able to bind the firm.",
  ],
}

/** Chapters 17–18. The remaining Area D chapters are in acca-study-lwg-tree-d2.ts. */
export const LWG_TREE_AREA_D_PART1: StudyChapter[] = [LWG_TREE_17, LWG_TREE_18]
