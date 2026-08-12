/*
 * LW-ENG Area D — the formation and constitution of business organisations:
 * agency, partnerships, LLPs, corporate personality, promoters and registration.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * Two errors account for most lost marks in this area, and the plans are built
 * around both. The first is collapsing TWO RELATIONSHIPS into one — a private
 * instruction to an agent binds the principal to the third party while still giving
 * the principal a claim against the agent, and answering for one relationship when
 * the question asks about the other is the single commonest mistake. The second is
 * treating a company as identical to its members, which the veil exists to prevent.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const LWE_PLANS_D: ExamPlanMap = {
  /* ── LWE-28 · Agency ────────────────────────────────────────── */

  "LWE-28::formation": {
    title: "How an agency arises, and the conditions on ratification",
    format: "ot",
    marks: 2,
    requirement:
      "An agent contracts without authority. The principal wishes to ratify. Ratification is effective only if the principal:\n\nA  Ratifies within seven days\nB  Existed and had capacity when the act was done, ratifies within a reasonable time, and adopts the whole transaction\nC  Ratifies in writing\nD  Compensates the agent",
    plan: [
      {
        step: "Recall the routes into agency",
        detail:
          "Express agreement, implied agreement, ratification, necessity, and estoppel or holding out. Ratification is the route that operates retrospectively, which is why it has conditions.",
      },
      {
        step: "State the three conditions on ratification",
        detail:
          "The principal must have existed and had capacity at the time of the act; must ratify within a reasonable time; and must adopt the whole transaction, not the profitable parts alone.",
      },
      {
        step: "See why the existence condition matters",
        detail:
          "It is the reason a company cannot ratify a pre-incorporation contract — there was no principal at the time of the act. The same condition decides two different topics.",
      },
      {
        step: "Reject the invented formalities",
        detail:
          "No fixed period applies, no writing is required, and no compensation to the agent is a condition. Each option supplies a formality agency law does not impose.",
      },
    ],
    answer:
      "**B — existed and had capacity when the act was done, ratifies within a reasonable time, and adopts the whole transaction.**\n\nAll three conditions are required, and each does real work. Ratification operates **retrospectively**, treating the contract as authorised from the start, which is why the law constrains it.\n\nThe **existence** condition is the one that reaches beyond this topic: it is precisely why a company **cannot ratify a pre-incorporation contract** — there was no principal in existence when the act was done. One condition, two examinable topics.\n\nThe **whole transaction** condition prevents cherry-picking: a principal cannot ratify the profitable parts and disclaim the rest.\n\nThe routes into agency are express agreement, implied agreement, **ratification**, **necessity** (a genuine emergency, inability to communicate, and action in the principal's interests), and **estoppel** where the principal held the agent out as authorised.",
    earns: [
      "Naming all three conditions and connecting the existence condition to pre-incorporation contracts",
      "Knowing ratification cannot be partial",
    ],
    loses: ["Supplying a fixed period or a writing requirement the law does not impose"],
  },

  "LWE-28::authority": {
    title: "Which authority binds, and who bears the loss",
    format: "ot",
    marks: 2,
    requirement:
      "An agent exceeds a private limit on its authority in contracting with a third party who is unaware of the limit but for whom the transaction is of a usual kind. The correct analysis is that:\n\nA  The principal is not bound and the third party has no claim\nB  The principal is bound to the third party, and may sue the agent for exceeding its authority\nC  The agent alone is bound to the third party\nD  The contract is void",
    plan: [
      {
        step: "Identify the two separate relationships",
        detail:
          "PRINCIPAL and THIRD PARTY — governed by apparent authority. PRINCIPAL and AGENT — governed by the agency agreement. Each has its own answer, and the correct option must address both.",
      },
      {
        step: "Resolve the external relationship",
        detail:
          "Apparent authority covers what the third party may reasonably believe, including the authority usual for such an agent. A private limit the third party knows nothing of cannot reduce it, so the principal is bound.",
      },
      {
        step: "Resolve the internal relationship",
        detail:
          "The agent breached its actual authority, so the principal may sue the agent for the loss. Being bound externally and having a claim internally are entirely compatible.",
      },
      {
        step: "Reject the options that pick one relationship only",
        detail:
          "A and C each answer for one relationship and get it wrong. D is wrong outright — an agent exceeding authority does not make a contract void.",
      },
    ],
    answer:
      "**B — the principal is bound to the third party, and may sue the agent for exceeding its authority.**\n\nThere are **two relationships** and each has its own answer, which is what the option list is testing.\n\n**Externally**, apparent authority covers what the third party may reasonably believe, including the authority **usual** for such an agent. A private limit the third party knows nothing about cannot cut that down, so the principal is bound.\n\n**Internally**, the agent breached its **actual** authority, so the principal has a claim against the agent for the loss. Being bound to the third party and having a claim against the agent are entirely compatible — and recognising that is what a correct answer looks like.\n\nThe practical lesson: a private limit is worthless against a third party unless the third party is **told** of it.\n\nThe kinds of authority are **actual** (express or implied), **apparent** or ostensible, and **usual** authority arising from the position the agent holds.",
    earns: [
      "Answering for both relationships rather than one",
      "Knowing a private limit must be communicated to bind the third party",
    ],
    loses: ["Choosing an option that resolves only the external or only the internal question"],
  },

  /* ── LWE-29 · Partnerships ─────────────────────────────────── */

  "LWE-29::formation-authority": {
    title: "When a partner's act binds the firm",
    format: "ot",
    marks: 2,
    requirement:
      "A partnership exists where persons carry on a business in common with a view of profit. A partner binds the firm by an act:\n\nA  Of any kind whatever\nB  Carried on in the usual way of business of the kind carried on by the firm, unless the partner lacked authority and the third party knew that\nC  Only if all partners consented in writing\nD  Only if the partnership agreement expressly permits it",
    plan: [
      {
        step: "Recognise the partner as an agent",
        detail:
          "Every partner is an agent of the firm and of the other partners. So the analysis is the apparent authority analysis applied to a partnership, and the agency reasoning transfers directly.",
      },
      {
        step: "State the usual-way test and its exception",
        detail:
          "An act carried on in the usual way of business of the kind carried on by the firm binds it, unless the partner had no authority AND the third party knew that, or did not know they were a partner.",
      },
      {
        step: "Note that no writing or unanimity is required",
        detail:
          "Options C and D would make a partnership unworkable — every transaction would need collective approval. The usual-way test exists precisely so third parties can deal with one partner.",
      },
      {
        step: "Note that the partnership itself needs no formality",
        detail:
          "A partnership can arise without any written agreement, and without the parties intending to create one. Default rules then fill the gaps — equal profit sharing among them.",
      },
    ],
    answer:
      "**B — carried on in the usual way of business of the kind carried on by the firm, unless the partner lacked authority and the third party knew that.**\n\nEvery partner is an **agent** of the firm and of the other partners, so this is the apparent authority analysis applied to a partnership — and the agency reasoning transfers directly.\n\nThe test is whether the act was in the **usual way** of business of the kind the firm carries on. The exception has two limbs and both are needed: the partner lacked authority **and** the third party knew that, or did not know they were dealing with a partner.\n\nOptions C and D would make a partnership unworkable, requiring collective approval for every transaction. The usual-way test exists so that third parties can safely deal with one partner.\n\nA partnership needs **no formality** and can arise without any written agreement and without the parties intending one — after which default rules fill the gaps, including **equal** profit sharing regardless of unequal contributions.",
    earns: [
      "Transferring the agency analysis, and requiring both limbs of the exception",
      "Knowing a partnership can arise without agreement or intention",
    ],
    loses: ["Requiring unanimity or writing, which would make the firm unable to trade"],
  },

  "LWE-29::liability-dissolution": {
    title: "How far a partner's liability runs",
    format: "ot",
    marks: 2,
    requirement:
      "In a general partnership, the partners' liability for the firm's debts is:\n\nA  Limited to their capital contribution\nB  Joint, and unlimited, so a partner's personal assets are exposed\nC  Limited to the firm's assets\nD  Borne only by the managing partner",
    plan: [
      {
        step: "State the position and its cause",
        detail:
          "A general partnership has NO separate legal personality, so it cannot owe debts of its own. The partners owe them, jointly and without limit, and their personal assets are exposed.",
      },
      {
        step: "Contrast with the limited forms",
        detail:
          "An LLP and a company each have separate personality and limit their members' liability. That is the whole reason those forms exist, and the reason they must file public accounts.",
      },
      {
        step: "Note when liability begins and ends",
        detail:
          "A partner is not liable for debts incurred before joining. On leaving, they remain liable for debts incurred while a partner — and may remain liable for later ones unless proper notice of retirement is given.",
      },
      {
        step: "Note the dissolution waterfall",
        detail:
          "Outside creditors, then partners' advances, then capital, then surplus as profits. A deficiency is made up by the partners in their profit-sharing ratio, which is where unlimited liability bites.",
      },
    ],
    answer:
      "**B — joint, and unlimited, so a partner's personal assets are exposed.**\n\nA general partnership has **no separate legal personality**, so it cannot owe debts of its own — the **partners** owe them, jointly and without limit.\n\nThat is precisely why the **LLP** and the **company** exist: each has separate personality and limits its members' liability, at the price of public filing.\n\nThe timing rules are examined and are easy to lose marks on. A partner is **not** liable for debts incurred **before** joining. On leaving, a partner remains liable for debts incurred **while** a partner, and may remain liable for **later** debts unless proper **notice of retirement** is given to existing customers and by advertisement.\n\nOn dissolution the order is outside creditors, then partners' **advances**, then **capital**, then any surplus as profits. A deficiency is made up by the partners in their **profit-sharing** ratio — which is where unlimited liability actually bites.",
    earns: [
      "Deriving unlimited liability from the absence of separate personality",
      "Knowing a retiring partner must give notice to end exposure to future debts",
    ],
    loses: ["Limiting liability to the capital contribution, which is the company position"],
  },

  /* ── LWE-30 · Limited partnerships and LLPs ─────────────────── */

  "LWE-30::limited-partnership": {
    title: "What a limited partner may and may not do",
    format: "ot",
    marks: 2,
    requirement:
      "In a limited partnership, a limited partner who takes part in the management of the business:\n\nA  Retains limited liability regardless\nB  Loses the protection of limited liability and becomes liable as a general partner\nC  Must be expelled from the firm\nD  Becomes the firm's agent for all purposes",
    plan: [
      {
        step: "State the structure",
        detail:
          "A limited partnership must have at least one GENERAL partner with unlimited liability, and may have limited partners whose liability is capped at their contribution.",
      },
      {
        step: "State the condition on the limited partner's protection",
        detail:
          "The limited partner must not take part in the management of the business. Doing so forfeits the protection and makes them liable as a general partner.",
      },
      {
        step: "Explain why the condition exists",
        detail:
          "The protection is for a passive investor. Someone who runs the business but risks nothing would be able to expose creditors to decisions they bear no consequence for.",
      },
      {
        step: "Distinguish it from an LLP",
        detail:
          "In an LLP ALL members have limited liability AND may participate in management, because the LLP itself has separate legal personality. The limited partnership has no such personality.",
      },
    ],
    answer:
      "**B — loses the protection of limited liability and becomes liable as a general partner.**\n\nA limited partnership must have at least one **general** partner with unlimited liability, and may have **limited** partners whose liability is capped at their contribution — on the condition that they take **no part in management**.\n\nThe condition exists because the protection is designed for a **passive investor**. Someone who runs the business while risking nothing could expose creditors to decisions whose consequences they never bear.\n\nThat is exactly the difference from an **LLP**, and the comparison is what the topic is for: in an LLP **all** members have limited liability **and** may participate in management, because the LLP itself has **separate legal personality** and owes its own debts. A limited partnership has no separate personality, so the liability has to rest on someone.\n\nA limited partnership must also be **registered**, and a limited partner may not withdraw their contribution during the partnership.",
    earns: [
      "Explaining the management condition by reference to the passive investor rationale",
      "Contrasting it with an LLP, where members may manage and still be protected",
    ],
    loses: ["Assuming limited liability survives participation in management"],
  },

  "LWE-30::llp": {
    title: "What separate personality gives an LLP",
    format: "ot",
    marks: 2,
    requirement:
      "Which statement about a limited liability partnership is correct?\n\nA  It has no separate legal personality\nB  It has separate legal personality, owns its own assets, and must file accounts publicly\nC  Its members have unlimited liability\nD  It is taxed as a company",
    plan: [
      {
        step: "State what separate personality brings",
        detail:
          "The LLP owns its own assets, owes its own debts, and contracts and litigates in its own name. Members' liability is limited, and the LLP has perpetual succession.",
      },
      {
        step: "Identify the price of that protection",
        detail:
          "Public filing. Because outsiders bear the risk of the liability limit, an LLP must register and file accounts — the same trade-off as for a company.",
      },
      {
        step: "Note the tax position, which is the hybrid feature",
        detail:
          "An LLP is generally taxed as a PARTNERSHIP — members are taxed on their share of profits — not as a company. That combination is what makes the form attractive to professional firms.",
      },
      {
        step: "Confirm the false options",
        detail:
          "A and C deny the two defining features. D states the tax position of a company, which is the one respect in which an LLP resembles a partnership rather than a company.",
      },
    ],
    answer:
      "**B — it has separate legal personality, owns its own assets, and must file accounts publicly.**\n\nSeparate personality means the LLP owns its own assets, owes its own debts, contracts and litigates in its own name, has perpetual succession, and limits its members' liability.\n\nThe **price** is public filing: because outsiders bear the risk of the liability limit, an LLP must register and file accounts — the same trade-off that applies to a company.\n\nThe **tax** position is the hybrid feature and is what option D gets wrong. An LLP is generally taxed as a **partnership**, with members taxed on their share of the profits rather than the LLP paying corporation tax. That combination — corporate protection with partnership taxation and internal flexibility — is why professional firms adopt the form.\n\nA and C deny the two defining features outright.\n\nAn LLP must have at least two designated members responsible for filing obligations.",
    earns: [
      "Naming the public filing requirement as the price of limited liability",
      "Knowing the tax treatment follows a partnership, not a company",
    ],
    loses: ["Assuming an LLP is taxed as a company because it has corporate features"],
  },

  /* ── LWE-31 · Corporate personality and the veil ────────────── */

  "LWE-31::personality": {
    title: "The consequences of a company being a separate person",
    format: "ot",
    marks: 2,
    requirement:
      "A company's sole shareholder and director is owed money by the company under a secured debenture. On the company's insolvency the shareholder:\n\nA  Ranks last, as a member\nB  Ranks as a secured creditor, because the company is a separate legal person capable of owing them money\nC  Cannot be a creditor of their own company\nD  Must waive the debt",
    plan: [
      {
        step: "Apply separate personality to the relationship",
        detail:
          "The company is a distinct legal person, so it can owe money to its own shareholder. A person may hold two capacities — member and creditor — and each is treated on its own terms.",
      },
      {
        step: "Rank each capacity separately",
        detail:
          "As a secured creditor under the debenture they rank with the secured creditors. As a member they rank last. The two capacities do not merge.",
      },
      {
        step: "Note the practical significance",
        detail:
          "A controller who lends to their company on security can recover ahead of unsecured trade creditors. That is a legitimate consequence of incorporation and is a reason lending is documented that way.",
      },
      {
        step: "Reject the options that collapse the two persons",
        detail:
          "C says a shareholder cannot be a creditor of their own company, which denies separate personality. A applies the member ranking to a creditor claim.",
      },
    ],
    answer:
      "**B — ranks as a secured creditor, because the company is a separate legal person capable of owing them money.**\n\nA company is a distinct legal person, so it can owe money to its own shareholder — and a person may hold **two capacities** at once, member and creditor, each treated on its own terms.\n\nSo they rank **with the secured creditors** on the debenture, and **last** on their shares. The capacities do not merge.\n\nThe practical significance is real: a controller who lends to their company **on security** can recover ahead of unsecured trade creditors. That is a legitimate consequence of incorporation, and it is a reason such lending is documented as a secured debenture rather than as capital.\n\nOption C denies separate personality outright. Option A applies the member's ranking to a creditor's claim.\n\nThe other consequences of separate personality are perpetual succession, the company holding its own property, suing and being sued in its own name, and limited liability for members.",
    earns: [
      "Ranking the two capacities separately rather than merging them",
      "Naming the commercial consequence for unsecured trade creditors",
    ],
    loses: ["Denying that a shareholder can be a creditor of their own company"],
  },

  "LWE-31::veil": {
    title: "When the court looks behind the company",
    format: "ot",
    marks: 2,
    requirement:
      "The court is **least** likely to lift the veil of incorporation where:\n\nA  A company was formed specifically to evade an existing contractual obligation\nB  A director has continued trading with no reasonable prospect of avoiding insolvent liquidation\nC  A group of companies operates as a single economic unit and the result of respecting the veil seems unjust\nD  The company is a mere façade concealing the true facts",
    plan: [
      {
        step: "Read the stem's polarity",
        detail:
          "LEAST likely. So three options will be recognised grounds and one will be a ground the courts have refused — the reverse of the usual construction.",
      },
      {
        step: "Identify the refused ground",
        detail:
          "A single economic unit, plus a sense of injustice, is precisely what the courts have declined to accept. \"In the interests of justice\" has been repeatedly rejected as a free-standing ground.",
      },
      {
        step: "Confirm the other three are genuine",
        detail:
          "Evasion of an existing obligation and a mere façade are recognised. Wrongful trading is statutory and imposes personal liability directly rather than lifting the veil at common law.",
      },
      {
        step: "Explain why the refusal is principled",
        detail:
          "A discretionary exception would destroy the certainty that makes incorporation useful. Investors and lenders price the veil, so a court that lifted it whenever the result seemed unfair would remove its value.",
      },
    ],
    answer:
      "**C — a group of companies operates as a single economic unit and the result of respecting the veil seems unjust.**\n\nThe stem asks which is **least** likely, so three options are recognised grounds and one is a ground the courts have refused — and this is it. Neither a group structure nor a general sense of injustice is enough: **\"in the interests of justice\"** has been repeatedly rejected as a free-standing ground.\n\nThe refusal is principled rather than harsh. A discretionary exception would destroy the **certainty** that makes incorporation useful — investors and lenders price the veil, and a court lifting it whenever an outcome seemed unfair would remove the value of the whole institution.\n\nThe genuine grounds: **evasion** of an existing legal obligation, a company that is a **mere façade** concealing the true facts, and the **statutory** provisions — **wrongful** and **fraudulent trading** — which impose personal liability on directors directly.\n\nEach group company is a separate person, so a parent is not liable for a subsidiary's debts merely because it owns it.",
    earns: [
      "Reading the reversed polarity and identifying the refused ground",
      "Explaining the refusal by reference to certainty rather than calling it harsh",
    ],
    loses: ["Treating a group structure or general injustice as a ground to lift the veil"],
  },

  /* ── LWE-32 · Promoters and pre-incorporation contracts ─────── */

  "LWE-32::promoters": {
    title: "The promoter's fiduciary duty and its remedies",
    format: "ot",
    marks: 2,
    requirement:
      "A promoter's principal duty to the company being formed is to:\n\nA  Guarantee the company's debts\nB  Avoid making a secret profit, and to disclose any interest in a transaction with the company\nC  Act as its first director\nD  Provide all its share capital",
    plan: [
      {
        step: "Classify the duty",
        detail:
          "Fiduciary. Its core is loyalty: not to make a secret profit from the promotion, and to disclose any interest in a transaction with the company being formed.",
      },
      {
        step: "Locate the wrong in the concealment",
        detail:
          "Making a profit is permitted. Making an UNDISCLOSED one is not, and disclosure to an independent board or to the members cures it.",
      },
      {
        step: "Name the remedies",
        detail:
          "Rescission of the contract, or recovery of the undisclosed profit. The company elects between them. Damages may also be available for breach of duty.",
      },
      {
        step: "Note how the label attaches",
        detail:
          "A promoter is anyone who takes steps to form the company and set it going. The status arises from CONDUCT, not from any title — so someone can be a promoter without being called one.",
      },
    ],
    answer:
      "**B — avoid making a secret profit, and to disclose any interest in a transaction with the company.**\n\nThe duty is **fiduciary**, and its core is loyalty. Making a profit from the promotion is **permitted**; making an **undisclosed** one is not, and disclosure to an independent board or to the members cures it. The wrong lies in the concealment.\n\nThe remedies are **rescission** of the contract or **recovery** of the undisclosed profit, with the company electing between them, and damages may also be available for breach of duty.\n\nThe status attaches by **conduct**: a promoter is anyone who takes steps to form the company and set it going, so someone can be a promoter without holding any title — and without becoming a director, which is what option C confuses it with.\n\nA promoter is not required to guarantee the company's debts or provide its capital, though they commonly do both in practice.",
    earns: [
      "Locating the wrong in the non-disclosure rather than the profit",
      "Knowing the status arises from conduct rather than title",
    ],
    loses: ["Confusing the promoter's role with a director's or a guarantor's"],
  },

  "LWE-32::pre-incorporation": {
    title: "Who is bound before the company exists",
    format: "ot",
    marks: 2,
    requirement:
      "A promoter signs a contract \"on behalf of\" a company not yet incorporated. After incorporation the company wishes to take the benefit of it. The company should:\n\nA  Ratify the contract\nB  Enter a new contract on the same terms, by novation\nC  Do nothing, as the contract already binds it\nD  Sue the promoter to enforce it",
    plan: [
      {
        step: "Establish why ratification cannot work",
        detail:
          "Ratification requires the principal to have existed at the time of the act. The company did not exist, so there is nothing it can ratify — the same condition met in LWE-28.",
      },
      {
        step: "Establish who is currently bound",
        detail:
          "The promoter, personally, unless otherwise agreed. The contract is not void — someone is bound, and it is the individual who signed.",
      },
      {
        step: "Identify the only route to the company being bound",
        detail:
          "A NEW contract after incorporation, on the same terms — novation. That creates an obligation the company can hold and releases the promoter.",
      },
      {
        step: "Note the protective drafting",
        detail:
          "A promoter should contract expressly on terms that they are released once the company is formed and adopts the agreement. Otherwise the personal liability simply persists.",
      },
    ],
    answer:
      "**B — enter a new contract on the same terms, by novation.**\n\nRatification cannot work, and the reason connects two topics: **ratification requires the principal to have existed at the time of the act** (LWE-28), and the company did not exist. So there is nothing to ratify.\n\nMeanwhile the **promoter is personally bound**, unless otherwise agreed. The contract is not void — someone is liable on it, and it is the person who signed.\n\nThe only route to the company being bound is a **new contract** after incorporation on the same terms, which is a **novation**: it creates an obligation the company holds and releases the promoter.\n\nThe protective drafting matters commercially: a promoter should contract expressly on terms that they are **released** once the company is formed and adopts the agreement. Without that, the personal liability persists even after the company begins performing.",
    earns: [
      "Explaining why ratification fails, by the same condition that governs agency",
      "Naming novation and the protective drafting that limits the promoter's exposure",
    ],
    loses: ["Suggesting the company can ratify, which the existence condition forbids"],
  },

  /* ── LWE-33 · Registration, constitution and names ──────────── */

  "LWE-33::registration-records": {
    title: "What incorporation requires, and what follows it",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following must a company do **after** incorporation?\n\nA  Deliver a statement of compliance to the registrar\nB  Keep statutory registers and file annual accounts and a confirmation statement\nC  Deliver a statement of proposed officers\nD  Apply for a certificate of incorporation",
    plan: [
      {
        step: "Split the obligations by timing",
        detail:
          "BEFORE incorporation: the application for registration, a statement of capital and initial shareholdings, a statement of proposed officers, and a statement of compliance. AFTER: registers, accounts and a confirmation statement.",
      },
      {
        step: "Read the stem's timing word",
        detail:
          "After. Three options are pre-incorporation steps, and the certificate is ISSUED by the registrar rather than applied for separately — so all three fail on sequence.",
      },
      {
        step: "Name the ongoing obligations",
        detail:
          "Registers of members, directors and charges; annual accounts; a confirmation statement; and notification of changes in officers, registered office and capital.",
      },
      {
        step: "State why the obligations exist",
        detail:
          "They are the price of limited liability. Outsiders bear the risk of the liability limit, so they are given public information in exchange — which is the same trade-off as for an LLP.",
      },
    ],
    answer:
      "**B — keep statutory registers and file annual accounts and a confirmation statement.**\n\nSplit the obligations by timing. **Before** incorporation: the application for registration, a statement of **capital and initial shareholdings**, a statement of **proposed officers**, and a statement of **compliance**, with the articles unless model articles are adopted. **After**: the ongoing obligations.\n\nOptions A and C are pre-incorporation steps, and the **certificate of incorporation** is issued by the registrar as conclusive evidence that the company exists — it is not applied for separately. All three fail on sequence.\n\nThe ongoing obligations are registers of **members**, **directors** and **charges**; annual **accounts**; a **confirmation statement**; and notification of changes in officers, registered office and capital.\n\nThey exist as the **price of limited liability**: outsiders bear the risk of the liability limit and are given public information in exchange — the same trade-off that applies to an LLP.",
    earns: [
      "Sorting the obligations by whether they precede or follow incorporation",
      "Knowing the certificate is issued rather than applied for",
    ],
    loses: ["Listing a pre-incorporation document as an ongoing obligation"],
  },

  "LWE-33::constitution-names": {
    title: "Altering the articles, and the limit on the power",
    format: "ot",
    marks: 2,
    requirement:
      "The articles of association may be altered by special resolution, subject to the alteration being:\n\nA  Approved by the registrar\nB  Bona fide in the interests of the company as a whole\nC  Unanimous\nD  Approved by the company's creditors",
    plan: [
      {
        step: "State the procedural requirement",
        detail:
          "A special resolution of the MEMBERS at 75%. The board cannot alter the articles, since they are the members' constitutional bargain.",
      },
      {
        step: "State the substantive limit",
        detail:
          "The power must be exercised bona fide in the interests of the company as a whole. So a formally valid special resolution can still be challenged.",
      },
      {
        step: "See what the limit protects",
        detail:
          "A minority against a majority altering the articles to expropriate it. Without the limit, 75% could rewrite the constitution against the remaining 25% at will.",
      },
      {
        step: "Note entrenchment and the constitutional contract",
        detail:
          "Provisions may be ENTRENCHED to need more than a special resolution, though entrenchment yields to unanimous agreement. And the articles bind the company and its members in respect of rights AS MEMBERS only.",
      },
    ],
    answer:
      "**B — bona fide in the interests of the company as a whole.**\n\nProcedurally the alteration needs a **special resolution** of the **members** at 75% — the board cannot alter the articles, because they are the members' constitutional bargain, not management's.\n\nThe **substantive limit** is what makes this more than a procedural question: a formally valid special resolution can still be challenged if the power was not exercised bona fide in the interests of the company as a whole.\n\nWhat it protects is a **minority**. Without it, 75% could rewrite the constitution to expropriate the remaining 25% at will.\n\nProvisions may be **entrenched** so they require more than a special resolution, though entrenchment **yields to the unanimous agreement** of all members. And no member can be required by an alteration to take more shares or increase their liability without consenting in writing.\n\nThe articles form a contract binding the company and its members — but only in respect of rights **as members**.",
    earns: [
      "Naming the substantive limit as well as the majority, and what it protects",
      "Knowing entrenchment yields to unanimity",
    ],
    loses: ["Requiring registrar or creditor approval, neither of which is involved"],
  },
}
