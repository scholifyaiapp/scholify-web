import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area D, first part — agency and partnerships.
 * Chapters 28–30 of the LW-ENG reading tree, mapped to syllabus groups D1–D2.
 *
 * ── Forked from the Global tree, then specialised ──────────────
 * Areas D–H are shared with LW-Global in SUBSTANCE, so these chapters follow the
 * Global tree's structure. What changes is the content: the Global tree is deliberately
 * jurisdiction-neutral and tells the learner to "apply the threshold the scenario
 * supplies", because a Global candidate cannot be assumed to sit under any one
 * companies statute. An ENG candidate IS examined on the English rule, so every hedge
 * is replaced by the actual provision — here the Partnership Act 1890, the Limited
 * Partnerships Act 1907 and the Limited Liability Partnerships Act 2000.
 *
 * Global also compresses partnerships into one chapter. ENG splits it, because D2(a)
 * examines the legislation governing BOTH unlimited and limited partnerships and the
 * LLP is a distinct vehicle with a distinct statute.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth. Statutory wording is quoted AS a
 * quotation with the section named, and case names are citations for a proposition.
 */

/* ── Chapter 28 · D1 ───────────────────────────────────────────── */

export const LWE_TREE_28: StudyChapter = {
  id: "LWE-28",
  number: 28,
  paper: "LW",
  area: "D",
  title: "Agency: formation, authority and liability",
  minutes: 17,
  syllabusRefs: ["D1(a)", "D1(b)", "D1(c)", "D1(d)"],
  intro:
    "Agency is the doctrine that lets a company act at all, since a company can only ever act through people. Almost every question in it reduces to one issue: did the agent have authority?",
  outcomes: [
    "Define the agency relationship and give the examples the syllabus names",
    "Explain how agency is formed, including ratification and its conditions",
    "Distinguish express, implied, usual and apparent authority",
    "Explain the liability of principal and agent to a third party",
    "Decide, on given facts, whether the principal is bound",
  ],
  sections: [
    {
      id: "formation",
      heading: "What an agent is, and how the relationship arises",
      blocks: [
        {
          kind: "definition",
          term: "Agency",
          md: "A relationship in which one person, the **agent**, is authorised to act on behalf of another, the **principal**, so as to **affect the principal's legal relations** with third parties. The agent's job is to bring the **principal and the third party** into a contractual relationship — not to contract on its own account.",
        },
        {
          kind: "list",
          title: "The examples the syllabus names",
          items: [
            "**Partners.** Section 5 of the Partnership Act 1890 makes every partner an agent of the firm and of the other partners for the purposes of the partnership business — which is why one partner's contract can bind them all (chapter 29).",
            "**Company directors**, who are agents of the company. This is how an entity that exists only on paper enters contracts (chapter 38).",
            "**Employees**, within the scope of their role — a purchasing manager, or a shop assistant taking payment.",
            "**Professional intermediaries** — brokers, factors and commercial agents appointed to negotiate or conclude particular transactions.",
          ],
        },
        {
          kind: "table",
          caption: "How an agency relationship is formed",
          head: ["Route", "How it works"],
          rows: [
            ["**Express agreement**", "The principal appoints the agent in words, orally or in writing. No particular form is generally needed, though a **power of attorney** must be by deed"],
            ["**Implied agreement**", "Inferred from the parties' **conduct** or **relationship** — a person put in a position that ordinarily carries authority is taken to have it"],
            ["**Ratification**", "The principal **adopts** an unauthorised act afterwards, which makes it binding **retrospectively**"],
            ["**Necessity**", "In narrow circumstances an agent acquires authority to act to protect the principal's property in a genuine emergency where instructions cannot be obtained"],
            ["**Estoppel (apparent authority)**", "Not true formation: the principal is **prevented from denying** authority it has held out, even though none was given"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Ratification, and its three conditions",
          md: "Ratification makes an unauthorised act binding **from the outset**, but only if three things hold. The agent must have **purported to act for the principal** — not on its own account. The principal must have been **in existence and ascertainable** at the time of the act. And the principal must ratify with **full knowledge** of the material facts. A principal also cannot ratify **part** of a transaction and reject the rest, and cannot ratify once the third party has withdrawn. The second condition is the one that destroys pre-incorporation contracts, since a company that did not yet exist can never ratify (chapter 32).",
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
          "Three conditions: the agent PURPORTED to act for the principal, the principal EXISTED and was ascertainable at the time of the act, and ratification is made with FULL KNOWLEDGE of the material facts. The third party's consent is not required — though ratification comes too late once the third party has withdrawn — and the agent need not be appointed afterwards.",
      },
    },
    {
      id: "authority",
      heading: "The kinds of authority, and who is liable",
      blocks: [
        {
          kind: "table",
          caption: "Four kinds of authority, and what each turns on",
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
          title: "Apparent authority needs a representation BY THE PRINCIPAL",
          md: "The point most often got wrong is the source of the representation. **The agent cannot create its own apparent authority** by asserting that it has authority. The holding out must come from the **principal** — by appointing the agent to a position that ordinarily carries such authority, by permitting it to act that way before, or by saying so expressly. *Freeman & Lockyer v Buckhurst Park Properties* is the standard authority: a director allowed by the board to act as if he were managing director bound the company, because the **board's acquiescence** was the representation. And the third party must have **relied** on it, so someone who knew the agent lacked authority cannot invoke it.",
        },
        {
          kind: "table",
          caption: "Who is liable to the third party",
          head: ["Situation", "The position"],
          rows: [
            ["Agent acts **within** authority, principal **disclosed**", "The **principal** is bound and liable. The agent normally **drops out** of the transaction"],
            ["Agent acts **within** authority, principal **undisclosed**", "The third party may generally enforce against **either** the agent or the principal once discovered, subject to exceptions"],
            ["Agent acts **outside** authority", "The **principal is not bound**, unless it ratifies or apparent authority applies. The agent may be liable for **breach of warranty of authority**"],
            ["Agent acts for a **non-existent** principal", "The **agent is personally liable** — the position with pre-incorporation contracts under s.51 CA 2006 (chapter 32)"],
          ],
        },
        {
          kind: "list",
          title: "The agent's duties to the principal",
          items: [
            "**Perform the task personally**, and not delegate without authority.",
            "**Obey lawful instructions**, and exercise **reasonable care and skill**.",
            "**Act in good faith** — the relationship is **fiduciary**, so the agent must avoid conflicts of interest.",
            "**Account** for money and property received, and **not make a secret profit** or take a bribe. A secret profit must be handed over, and the principal may also dismiss the agent and rescind the transaction.",
            "**Not disclose confidential information** obtained in the agency.",
          ],
        },
        {
          kind: "example",
          title: "Deciding whether the principal is bound",
          scenario:
            "Ockborne Ltd's board never appointed a managing director, but for two years it allowed Tarrant, a director, to negotiate and sign supply contracts alone, and the board knew and said nothing. Ockborne's articles require any contract over £50,000 to be approved by the full board. Tarrant signs a £180,000 contract with Melbeck Ltd, telling Melbeck he is \"the managing director with full authority\". Melbeck has dealt with Ockborne through Tarrant many times before. Tarrant also privately accepts £6,000 from Melbeck to secure the deal. Ockborne refuses to honour the contract.",
          steps: [
            { label: "Test actual authority", detail: "Tarrant has no EXPRESS authority for a contract of this size — the articles require full board approval over £50,000. Nor is signing an unapproved £180,000 contract IMPLIED or INCIDENTAL to his role, given that express limit." },
            { label: "Test apparent authority", detail: "The board KNOWINGLY PERMITTED Tarrant to negotiate and sign supply contracts alone for two years. On Freeman & Lockyer that acquiescence is a REPRESENTATION BY THE PRINCIPAL that he had the authority of a managing director, and Melbeck RELIED on it, having dealt through him repeatedly." },
            { label: "Deal with Tarrant's own assertion", detail: "His statement that he was \"managing director with full authority\" adds NOTHING — an agent cannot create its own apparent authority. The board's conduct is what does the work here." },
            { label: "Deal with the internal limit in the articles", detail: "A third party dealing in good faith is generally NOT affected by a constitutional limit on the directors' powers, and Melbeck had no notice of it. So the £50,000 restriction binds Tarrant internally but does not defeat Melbeck." },
            { label: "Address the £6,000", detail: "That is a SECRET PROFIT and a BRIBE, in breach of Tarrant's FIDUCIARY duty. Ockborne may recover the £6,000 from Tarrant, dismiss him, and sue him for breach of duty. Critically, a bribe also entitles the principal to RESCIND the contract against a third party who paid it." },
            { label: "State the conclusion", detail: "On apparent authority alone Ockborne would be BOUND. But because MELBECK ITSELF paid the bribe, Ockborne may RESCIND the contract and still pursue Tarrant. Melbeck's own conduct destroys the protection apparent authority gave it." },
          ],
          result:
            "Apparent authority would have bound Ockborne — the board's two years of acquiescence is the representation — but **Melbeck's bribe** entitles Ockborne to **rescind**, and Tarrant is liable to account for the £6,000 and for breach of fiduciary duty. Remove the bribe and the contract stands.",
        },
      ],
      check: {
        q: "A board knowingly allows a director to act as though he were managing director for two years. He then signs a contract beyond his actual authority. Is the company bound?",
        options: [
          "No, because his actual authority was exceeded",
          "Yes — the board's acquiescence is a representation creating apparent authority, and the third party relied on it",
          "No, unless the articles permitted the appointment",
          "Yes, but only because the director said he had authority",
        ],
        correct: 1,
        explain:
          "YES, on APPARENT AUTHORITY. The board's knowing acquiescence is a HOLDING OUT BY THE PRINCIPAL (Freeman & Lockyer), and the third party relied on it. The director's own assertion of authority counts for nothing — an agent cannot create its own apparent authority — and an internal limit in the articles does not affect a good-faith third party without notice.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Letting the agent's own claim of authority create apparent authority.",
      fix: "The representation must come from the PRINCIPAL, by appointment, acquiescence or express statement.",
    },
    {
      trap: "Allowing a company to ratify a pre-incorporation contract.",
      fix: "The principal must have EXISTED at the time of the act, so a company cannot ratify what predates it (s.51 CA 2006).",
    },
    {
      trap: "Treating an internal limit in the articles as defeating a third party.",
      fix: "A good-faith third party without notice is generally unaffected by a constitutional limit on the directors' powers.",
    },
    {
      trap: "Stopping at the secret profit and forgetting its effect on the contract.",
      fix: "A bribe paid BY THE THIRD PARTY lets the principal rescind the contract as well as recover from the agent.",
    },
  ],
  keyTerms: [
    { term: "Agency", def: "A relationship in which an agent is authorised to affect the principal's legal relations with third parties." },
    { term: "Actual authority", def: "Authority expressly given, or implied as incidental to what was expressly given." },
    { term: "Usual authority", def: "The authority customarily attaching to an agent's position in that trade." },
    { term: "Apparent (ostensible) authority", def: "Authority arising from the principal's representation, relied on by the third party, which estops the principal from denying it." },
    { term: "Ratification", def: "Adoption of an unauthorised act, binding retrospectively, subject to three conditions." },
    { term: "Breach of warranty of authority", def: "The agent's liability to a third party for asserting an authority it did not have." },
    { term: "Secret profit", def: "An unauthorised benefit taken by an agent, recoverable by the principal as a breach of fiduciary duty." },
  ],
  summary: [
    "An agent affects the principal's legal relations with third parties; partners and directors are the syllabus's examples.",
    "Agency arises by express or implied agreement, ratification, necessity, or estoppel.",
    "Ratification requires that the agent purported to act for the principal, that the principal existed, and full knowledge of the facts.",
    "Apparent authority needs a holding out by the principal, relied on by the third party — never the agent's own assertion.",
    "An agent owes fiduciary duties, and a bribe lets the principal rescind against the third party who paid it.",
  ],
  knowledgeDiagnostic: [
    { q: "State the three conditions for ratification.", a: "The agent purported to act for the principal, the principal existed and was ascertainable at the time, and it ratifies with full knowledge of the material facts." },
    { q: "Where must the representation founding apparent authority come from?", a: "From the principal — by appointment to a position, acquiescence in past conduct, or an express statement. Never from the agent." },
    { q: "What is the effect of an agent taking a bribe from the third party?", a: "The principal may recover the bribe from the agent, dismiss the agent, sue for breach of fiduciary duty, and rescind the contract against the third party who paid it." },
    { q: "Which statutory provision makes a partner an agent of the firm?", a: "Section 5 of the Partnership Act 1890, for the purposes of the partnership business." },
  ],
}

/* ── Chapter 29 · D2 ───────────────────────────────────────────── */

export const LWE_TREE_29: StudyChapter = {
  id: "LWE-29",
  number: 29,
  paper: "LW",
  area: "D",
  title: "Partnerships: formation, authority and liability",
  minutes: 18,
  syllabusRefs: ["D2(a)", "D2(b)", "D2(c)", "D2(d)", "D2(e)"],
  intro:
    "A partnership can exist without anyone intending to create one, because it is defined by what people do rather than what they signed. That, and the fact that partners are liable without limit, is what makes the area dangerous in practice and examinable in principle.",
  outcomes: [
    "Apply the statutory definition of partnership and its three elements",
    "Explain how a partnership is formed and what the agreement usually covers",
    "Apply section 5 to decide whether a partner's act binds the firm",
    "Analyse the liability of partners for debts, wrongs, and debts arising before and after their time",
    "Explain dissolution and the order in which assets are applied",
  ],
  sections: [
    {
      id: "formation-authority",
      heading: "What a partnership is, and when a partner binds the firm",
      blocks: [
        {
          kind: "definition",
          term: "Partnership (Partnership Act 1890, s.1(1))",
          md: "\"The relation which subsists between persons carrying on a business in common with a view of profit.\" Unpack it into three elements: a **business**, carried on **in common**, with a **view of profit**. Note what is absent — no writing, no registration, no formality of any kind is required, so a partnership can come into existence purely from conduct.",
        },
        {
          kind: "list",
          title: "What is NOT enough to create a partnership",
          items: [
            "**Joint ownership** of property, by itself.",
            "**Sharing gross returns**, which s.2 expressly says does not of itself create a partnership.",
            "Receiving a **share of profits** as repayment of a debt, as remuneration, or as an annuity to a deceased partner's family — s.2 lists these as not making the recipient a partner.",
            "Calling the arrangement something else, or **not** calling it a partnership — the label does not decide it, any more than in employment status (chapter 23).",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why formality is irrelevant, and what a written agreement is actually for",
          md: "A written partnership agreement does **not** create the partnership and its absence does not prevent one. What it does is **displace the default rules** in the 1890 Act, which are often unattractive: equal sharing of profits regardless of contribution, no entitlement to a salary, no interest on capital, and dissolution by any partner's notice. So the agreement is about **overriding the statutory defaults** on profit shares, salaries, capital, decision-making, retirement, expulsion and dissolution — and where it is silent, the Act fills the gap.",
        },
        {
          kind: "definition",
          term: "A partner's authority (s.5)",
          md: "Every partner is an **agent of the firm** and of the other partners for the purposes of the partnership business. Acts done in the **usual way of business of the kind carried on** by the firm **bind the firm** — **unless** the partner had **no authority** in fact **and** the third party either **knew** of the lack of authority **or** did not know or believe them to be a partner.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The section 5 sequence, in order",
          md: "Ask three questions and the answer follows. **One: was the act in the usual way of business of this kind of firm?** If not, the firm is not bound unless the partner had actual authority. **Two: did the partner actually have authority?** If yes, the firm is bound and the enquiry ends. **Three: if the act was usual but authority was lacking, did the third party know that, or not know the person was a partner?** Only then does the firm escape. So a firm is bound by a usual act even where the partner broke an internal restriction — provided the third party knew nothing of it.",
        },
      ],
      check: {
        q: "Two people jointly own a building and divide the rent equally. Are they partners?",
        options: [
          "Yes, because they share the receipts",
          "No — joint ownership and sharing gross returns do not of themselves create a partnership under s.2",
          "Yes, provided the arrangement is in writing",
          "Only if they intended to be partners",
        ],
        correct: 1,
        explain:
          "NO. Section 2 of the Partnership Act 1890 expressly provides that joint ownership of property and the sharing of GROSS RETURNS do not of themselves create a partnership. What s.1(1) requires is a BUSINESS carried on IN COMMON with a VIEW OF PROFIT — passive co-ownership is not carrying on a business.",
      },
    },
    {
      id: "liability-dissolution",
      heading: "Liability, and dissolution",
      blocks: [
        {
          kind: "table",
          caption: "The liability provisions",
          head: ["Provision", "Effect"],
          rows: [
            ["**s.9** — contractual debts", "Every partner is liable **jointly** with the others for the firm's debts and obligations incurred while a partner. In practice a claimant can pursue any partner for the whole, and the partner then seeks contribution from the others"],
            ["**s.10** — wrongs", "The firm is liable for a partner's **wrongful acts or omissions** in the ordinary course of the business, or authorised by the partners. Liability here is **joint and several**"],
            ["**s.17(1)** — incoming partners", "A new partner is **not liable** for debts incurred **before** joining, unless they agree to assume them"],
            ["**s.17(2)** — retiring partners", "A retiring partner **remains liable** for debts incurred **while** a partner, unless released by agreement with the creditors and the continuing partners (a novation)"],
            ["**s.36** — apparent liability after leaving", "A retired partner may still be liable to those who deal with the firm afterwards, unless proper notice was given"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The notice a retiring partner must give — two different notices",
          md: "This is the trap in Area D. Retiring is not enough on its own. The former partner must give **actual notice** to **existing customers** who dealt with the firm, and must place a notice in the **London Gazette** to protect against **new** customers who had no previous dealings. Get the Gazette notice but skip the letters to existing customers, and the retired partner stays exposed to those customers; a scenario that mentions one form of notice and not the other is testing exactly this. **Unlimited liability** is what makes the point matter — the exposure is personal and uncapped.",
        },
        {
          kind: "table",
          caption: "Dissolution",
          head: ["Route", "How it arises"],
          rows: [
            ["**Expiry or completion**", "The fixed term ends, or the single venture the firm was formed for is completed (s.32)"],
            ["**Notice**", "Where the partnership is at will, **any partner** may dissolve it by notice (s.32) — one of the harsh defaults a written agreement usually overrides"],
            ["**Death or bankruptcy**", "Of any partner, subject to contrary agreement (s.33)"],
            ["**Illegality**", "The business or the partnership becomes unlawful (s.34) — this cannot be overridden by agreement"],
            ["**Court order**", "On grounds in s.35 including a partner's incapacity, prejudicial conduct, persistent breach, the business only being carried on at a loss, or where it is **just and equitable** to wind up — the ground relied on in *Re Yenidje Tobacco*, where two partners had become wholly unable to work together"],
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "Applying the assets on dissolution (s.44)",
          items: [
            "Pay the **outside creditors** of the firm in full.",
            "Repay to partners any **advances or loans** they made to the firm, beyond their capital.",
            "Repay the partners' **capital**.",
            "Divide any **surplus** between the partners in the profit-sharing ratio. A **deficiency** is borne in the same ratio, and because liability is unlimited the partners must make it good personally.",
          ],
        },
        {
          kind: "list",
          title: "Duties between partners",
          items: [
            "**Utmost good faith** to one another, the relationship being fiduciary.",
            "**Render true accounts and full information** on matters affecting the firm.",
            "**Account for any private profit** derived from the partnership, its property, name or business connection (s.29).",
            "**Not compete** with the firm without consent, and account for the profits of any competing business (s.30).",
          ],
        },
        {
          kind: "example",
          title: "Tracing partnership liability",
          scenario:
            "Halloway, Prewitt and Sanderson are partners in a firm of surveyors with no written agreement. In March the firm incurs a £90,000 debt to Coleford Ltd, a long-standing supplier. In May Sanderson retires; the firm places a notice in the London Gazette but writes to nobody. In June Prewitt, contrary to an oral agreement between the partners that no engagement over £20,000 be taken without unanimous consent, accepts a £70,000 survey commission from Newbold plc, a new client that knows nothing of the restriction. In July Trelow joins as a partner. In August the firm is dissolved with assets of £150,000 and total debts of £260,000.",
          steps: [
            { label: "Sanderson and the March debt", detail: "Under s.17(2) a retiring partner REMAINS LIABLE for debts incurred WHILE a partner. The £90,000 arose in March, so Sanderson is liable for it unless released by novation. Retirement changes nothing about past debts." },
            { label: "Sanderson and post-retirement dealings", detail: "Coleford is an EXISTING customer that dealt with the firm, so it was entitled to ACTUAL NOTICE. The firm gave only a GAZETTE notice, which protects against NEW customers. So Sanderson remains apparently liable to Coleford for dealings after May under s.36." },
            { label: "Prewitt's £70,000 commission", detail: "Run the s.5 sequence. Accepting a survey commission IS in the usual way of a surveying firm's business. Prewitt lacked actual authority because of the £20,000 restriction — but Newbold KNEW NOTHING of it and believed him a partner. So the firm IS BOUND." },
            { label: "Trelow and the earlier debts", detail: "Under s.17(1) an incoming partner is NOT liable for debts incurred BEFORE joining. Trelow joined in July, so he is not liable for the March debt or the June commission unless he agreed to assume them — but he IS liable for debts incurred from July." },
            { label: "Apply s.44 on dissolution", detail: "Assets £150,000 against debts £260,000. Outside CREDITORS are paid FIRST, so the £150,000 goes to them, leaving a £110,000 shortfall. Nothing is available for partners' loans or capital." },
            { label: "Deal with the shortfall", detail: "Liability is UNLIMITED, so the partners must make good the £110,000 PERSONALLY, in their profit-sharing ratio — which, with no written agreement, is EQUAL under the 1890 Act defaults regardless of what each contributed." },
          ],
          result:
            "Sanderson is caught by both **s.17(2)** and, for want of actual notice, **s.36**; the firm is bound by Prewitt's commission because Newbold knew nothing of the internal limit; Trelow escapes the earlier debts; and the £110,000 shortfall falls on the partners **personally and equally**. The absence of a written agreement costs them at every stage.",
        },
      ],
      check: {
        q: "A retiring partner places a notice in the London Gazette but does not write to existing customers. What is the position?",
        options: [
          "Fully protected against everyone, since the Gazette notice is public",
          "Still apparently liable to existing customers who dealt with the firm — they were entitled to actual notice",
          "Protected, because retirement itself ends all liability",
          "Liable only for debts incurred after the retirement",
        ],
        correct: 1,
        explain:
          "STILL LIABLE to EXISTING customers. Two notices are needed: ACTUAL notice to those who previously dealt with the firm, and a LONDON GAZETTE notice to protect against NEW customers with no prior dealings. The Gazette notice alone leaves the retired partner exposed under s.36 — and separately, s.17(2) keeps them liable for debts incurred while a partner.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Requiring a written agreement or registration for a partnership to exist.",
      fix: "No formality is needed. The agreement's function is to displace the 1890 Act's default rules.",
    },
    {
      trap: "Treating shared receipts or joint ownership as a partnership.",
      fix: "Section 2 says neither of itself creates one. Look for a BUSINESS carried on IN COMMON with a VIEW OF PROFIT.",
    },
    {
      trap: "Letting an internal restriction defeat a third party under s.5.",
      fix: "If the act was in the usual way of business and the third party knew nothing of the restriction, the firm is bound.",
    },
    {
      trap: "Giving only one form of retirement notice.",
      fix: "Actual notice to existing customers AND a London Gazette notice for new ones.",
    },
    {
      trap: "Repaying partners' capital before outside creditors on dissolution.",
      fix: "Section 44 order: outside creditors, then partners' advances, then capital, then surplus.",
    },
  ],
  keyTerms: [
    { term: "Partnership", def: "The relation between persons carrying on a business in common with a view of profit (s.1(1) PA 1890)." },
    { term: "Section 5 authority", def: "A partner binds the firm by acts in the usual way of its business, unless lacking authority and the third party knew or did not believe them a partner." },
    { term: "Section 9", def: "Partners are jointly liable for the firm's debts and obligations incurred while they were partners." },
    { term: "Section 17", def: "An incoming partner is not liable for prior debts; a retiring partner remains liable for debts incurred while a partner." },
    { term: "Section 36", def: "A retired partner may remain apparently liable to later dealings unless proper notice was given." },
    { term: "Section 44", def: "The order for applying assets on dissolution: creditors, partners' advances, capital, then surplus." },
    { term: "Just and equitable winding up", def: "A s.35 ground for dissolution by the court, as in Re Yenidje Tobacco." },
  ],
  summary: [
    "A partnership is a business carried on in common with a view of profit, and needs no formality.",
    "Joint ownership and sharing gross returns do not of themselves create one.",
    "Under s.5 an act in the usual way of business binds the firm unless the third party knew authority was lacking.",
    "Incoming partners escape prior debts; retiring partners remain liable for past debts and need two forms of notice.",
    "On dissolution s.44 pays outside creditors first, and any shortfall falls on the partners personally.",
  ],
  knowledgeDiagnostic: [
    { q: "State the statutory definition of a partnership.", a: "The relation which subsists between persons carrying on a business in common with a view of profit — s.1(1) Partnership Act 1890." },
    { q: "Run the section 5 test.", a: "Was the act in the usual way of that business; did the partner have actual authority; and if not, did the third party know that or not believe them a partner? The firm escapes only on the last." },
    { q: "What notice must a retiring partner give?", a: "Actual notice to existing customers who dealt with the firm, and a London Gazette notice against new customers." },
    { q: "State the section 44 order of application on dissolution.", a: "Outside creditors, then partners' advances or loans, then partners' capital, then any surplus in the profit-sharing ratio." },
    { q: "Name two default rules a written agreement usually displaces.", a: "Equal profit sharing regardless of contribution, and dissolution by notice from any partner in a partnership at will." },
  ],
}

export const LWE_TREE_AREA_D_PART1: StudyChapter[] = [LWE_TREE_28, LWE_TREE_29]
