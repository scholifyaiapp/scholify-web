/*
 * LW-Global Areas E to H — capital and financing, management and administration,
 * insolvency, and corporate fraudulent and criminal behaviour.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * These areas are where LW's precision requirements bite hardest: the majority a
 * resolution needs, the order creditors are paid in, the exact ingredient that
 * distinguishes wrongful trading from fraudulent trading. Almost every distractor
 * here is a real rule with one element altered — a 50% majority where 75% is
 * required, preferential creditors placed above secured, dishonesty imported into
 * an offence that does not require it.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const LWG_PLANS_EFGH: ExamPlanMap = {
  /* ── LWG-22 · Share capital ──────────────────────────────────── */

  "LWG-22::types-of-capital": {
    title: "Telling the types of capital apart",
    format: "ot",
    marks: 2,
    requirement:
      "\"Called-up share capital\" means:\n\nA  The maximum capital the company is authorised to issue\nB  The total of shares the company has issued\nC  The amount of the issue price the company has required shareholders to pay, whether paid or not\nD  The amount shareholders have actually paid",
    plan: [
      {
        step: "Set the terms out as a sequence",
        detail:
          "ISSUED capital: shares actually allotted. CALLED-UP: the part of the issue price the company has demanded. PAID-UP: what has actually been received. Each is a subset of the one before.",
      },
      {
        step: "Locate the stem's term in the sequence",
        detail:
          "Called-up is the amount DEMANDED, paid or not. That is the middle stage, and the distinction from paid-up is the whole question.",
      },
      {
        step: "Note what the unpaid part represents",
        detail:
          "The difference between called-up and paid-up is a receivable from the members. And the amount uncalled is the extent of a member's remaining liability if the company is wound up.",
      },
      {
        step: "Reject the authorised-capital option",
        detail:
          "Option A describes authorised capital, a concept many jurisdictions have abolished. It is offered because the term is familiar from older material.",
      },
    ],
    answer:
      "**C — the amount of the issue price the company has required shareholders to pay, whether paid or not.**\n\nThe sequence runs: **issued** capital (shares actually allotted), **called-up** (the part of the issue price the company has demanded), and **paid-up** (what has actually been received). Each is a subset of the one before.\n\nThe difference between called-up and paid-up is a **receivable** from members. And the amount **uncalled** is the extent of a member's remaining liability if the company is wound up — which is where limited liability actually gets measured.\n\nOption A describes **authorised** capital, a ceiling many jurisdictions have abolished, and is offered because the term is familiar from older material.\n\n**Share premium** is the excess of issue price over nominal value, and it is a capital reserve — it cannot be distributed as a dividend, which is a point examined in its own right.",
    earns: [
      "Placing the term in the issued–called-up–paid-up sequence",
      "Knowing uncalled capital measures a member's remaining liability",
    ],
    loses: ["Confusing called-up with paid-up, which is the only distinction the question tests"],
  },

  "LWG-22::classes": {
    title: "What a preference share carries, and how rights are varied",
    format: "ot",
    marks: 2,
    requirement:
      "Unless the articles provide otherwise, a preference share carries:\n\nA  A right to a fixed dividend in priority to ordinary shares, and priority for capital on a winding up\nB  A right to vote on all resolutions\nC  A right to a variable dividend depending on profits\nD  A guaranteed dividend whether or not profits are available",
    plan: [
      {
        step: "State the two priorities a preference share carries",
        detail:
          "A fixed dividend paid before any ordinary dividend, and priority for the return of capital on a winding up. Priority is what the name describes.",
      },
      {
        step: "Note what it usually does NOT carry",
        detail:
          "Voting rights, generally, or only in limited circumstances such as where its dividend is in arrears. Option B reverses the usual position.",
      },
      {
        step: "Kill the guarantee misconception",
        detail:
          "A preference dividend is payable only if there are distributable profits and it is declared. Priority is not a guarantee, and option D confuses the two.",
      },
      {
        step: "Note the presumption on arrears",
        detail:
          "Preference shares are presumed CUMULATIVE unless stated otherwise, so an unpaid dividend carries forward and must be paid before any ordinary dividend later.",
      },
    ],
    answer:
      "**A — a right to a fixed dividend in priority to ordinary shares, and priority for capital on a winding up.**\n\nBoth priorities are what the name describes: the fixed dividend is paid before any ordinary dividend, and capital ranks ahead of the ordinary shares on a winding up.\n\n**Priority is not a guarantee.** A preference dividend is payable only if distributable profits exist and it is declared, so option D confuses the two — and the distinction matters, because a preference shareholder in a loss-making company receives nothing.\n\nPreference shares generally carry **no vote**, or a vote only in limited circumstances such as when the dividend is in arrears, so option B reverses the usual position.\n\nThey are presumed **cumulative** unless stated otherwise, so an unpaid dividend carries forward and must be cleared before any later ordinary dividend.\n\nClass rights are varied by the procedure in the articles, and a dissenting minority of the class may apply to court to have the variation cancelled.",
    earns: [
      "Separating priority from guarantee",
      "Knowing the cumulative presumption and the minority's right to object to a variation",
    ],
    loses: ["Treating a preference dividend as payable regardless of profits"],
  },

  "LWG-22::issues": {
    title: "Distinguishing a bonus issue from a rights issue",
    format: "ot",
    marks: 2,
    requirement:
      "A **bonus** issue of shares:\n\nA  Raises new cash for the company\nB  Is made to existing shareholders without payment, by capitalising reserves\nC  Is an offer to the public\nD  Reduces the company's issued share capital",
    plan: [
      {
        step: "Ask whether cash comes in",
        detail:
          "A BONUS issue raises none — shares are issued free by capitalising reserves. A RIGHTS issue is offered to existing members at a discount and does raise cash.",
      },
      {
        step: "Identify what funds the bonus issue",
        detail:
          "Reserves are capitalised: share premium or retained earnings is applied to pay up the new shares. So one part of equity increases and another decreases.",
      },
      {
        step: "Note the effect on total equity",
        detail:
          "Unchanged. Issued share capital rises and reserves fall by the same amount, which is why option D is wrong in the opposite direction.",
      },
      {
        step: "Recall pre-emption rights, since they belong to the rights issue",
        detail:
          "A rights issue exists because members generally have PRE-EMPTION rights — an entitlement to be offered new shares first, protecting them against dilution. It can be disapplied by special resolution.",
      },
    ],
    answer:
      "**B — is made to existing shareholders without payment, by capitalising reserves.**\n\nA bonus issue raises **no cash**. Reserves — share premium or retained earnings — are capitalised to pay up the new shares, so issued share capital rises and reserves fall by the same amount. **Total equity is unchanged**, which is why option D is wrong in the opposite direction.\n\nNothing of value is created: each member holds more shares in the same company, so the share price falls proportionately. The purposes are to make the shares more marketable at a lower price and to align share capital with the assets financed by it.\n\nA **rights issue** is the contrast: new shares offered to existing members, usually at a discount, and it does raise cash. It exists because members generally hold **pre-emption rights** — an entitlement to be offered new shares before outsiders, protecting them against dilution — which may be disapplied by special resolution.",
    earns: [
      "Asking whether cash arrives, then identifying which reserve is capitalised",
      "Naming pre-emption rights as the reason rights issues take the form they do",
    ],
    loses: ["Treating a bonus issue as a way of raising finance"],
  },

  /* ── LWG-23 · Loan capital and charges ───────────────────────── */

  "LWG-23::loan-capital": {
    title: "How debt differs from equity in the company's hands",
    format: "ot",
    marks: 2,
    requirement:
      "Which statement correctly distinguishes a debenture holder from a shareholder?\n\nA  A debenture holder is a member of the company and may vote at general meetings\nB  A debenture holder is a creditor entitled to interest whether or not profits are made\nC  A debenture holder ranks after shareholders on a winding up\nD  Interest on debentures may only be paid out of distributable profits",
    plan: [
      {
        step: "Classify each party",
        detail:
          "A shareholder is a MEMBER and an owner. A debenture holder is a CREDITOR. Every difference follows from that one classification.",
      },
      {
        step: "Derive the entitlement",
        detail:
          "Interest is a contractual obligation payable whether or not profits are made. A dividend is payable only out of distributable profits and only if declared — option D applies the dividend rule to interest.",
      },
      {
        step: "Derive the ranking",
        detail:
          "Creditors rank BEFORE members on a winding up. Option C reverses it, which would defeat the whole point of lending rather than investing.",
      },
      {
        step: "Derive the governance position",
        detail:
          "A debenture holder has no vote at general meetings, because it is not a member. Its protection comes from its contract — the trust deed and its covenants — not from governance rights.",
      },
    ],
    answer:
      "**B — a debenture holder is a creditor entitled to interest whether or not profits are made.**\n\nOne classification settles everything: a shareholder is a **member and owner**, a debenture holder is a **creditor**.\n\nFrom that: interest is a **contractual obligation** payable regardless of profits, while a dividend requires distributable profits and a declaration — so option D applies the dividend rule to interest. Creditors rank **before** members on a winding up, so option C is reversed. And a debenture holder has **no vote**, because it is not a member.\n\nThe consequence for the debenture holder is that its protection comes from its **contract** — the trust deed and its covenants — rather than from governance rights. That is why lending documents carry restrictions on further borrowing, on disposals and on dividends.\n\nInterest is also a deductible expense in computing profit, whereas a dividend is a distribution of it.",
    earns: [
      "Deriving every difference from creditor versus member",
      "Knowing the debenture holder's protection is contractual",
    ],
    loses: ["Applying the distributable profits condition to interest"],
  },

  "LWG-23::charges": {
    title: "What a floating charge is, and why registration matters",
    format: "ot",
    marks: 2,
    requirement:
      "A floating charge differs from a fixed charge in that the company:\n\nA  May continue to deal with the charged assets in the ordinary course of business until crystallisation\nB  Cannot grant any other charge over the same assets\nC  Retains no interest in the charged assets\nD  Need not register the charge",
    plan: [
      {
        step: "State the defining feature",
        detail:
          "A floating charge hovers over a class of assets — inventory, receivables — and the company may continue to deal with them in the ordinary course until the charge CRYSTALLISES and fixes on what is then there.",
      },
      {
        step: "Contrast with a fixed charge",
        detail:
          "A fixed charge attaches to a specific identified asset immediately, and the company cannot dispose of it without the chargee's consent. That is why fixed charges are taken over land and plant.",
      },
      {
        step: "Note the registration requirement applies to both",
        detail:
          "Option D is wrong: charges must be registered, and failure makes the charge void against a liquidator, administrator and other creditors — so the lender becomes unsecured.",
      },
      {
        step: "Note the ranking consequence",
        detail:
          "A fixed charge ranks ahead of a floating charge over the same assets, and preferential creditors are paid ahead of floating charge holders. So a floating charge is worth considerably less.",
      },
    ],
    answer:
      "**A — may continue to deal with the charged assets in the ordinary course of business until crystallisation.**\n\nA floating charge hovers over a **class** of assets — inventory, receivables — leaving the company free to deal with them in the ordinary course until the charge **crystallises** and fixes on whatever is then there. Crystallisation is triggered by events such as the appointment of a receiver or administrator, liquidation, or ceasing to trade.\n\nA **fixed** charge attaches to a specific identified asset immediately, and the company cannot dispose of it without consent — which is why fixed charges are taken over land and plant, and floating charges over circulating assets.\n\nOption D is wrong and the consequence is severe: charges must be **registered**, and failure makes the charge **void** against a liquidator, administrator and other creditors, leaving the lender unsecured.\n\nRanking matters too: a **fixed charge ranks ahead** of a floating charge over the same assets, and **preferential creditors** are paid ahead of floating charge holders.",
    earns: [
      "Naming crystallisation and what triggers it",
      "Knowing an unregistered charge is void against the liquidator",
    ],
    loses: ["Assuming a floating charge need not be registered"],
  },

  /* ── LWG-24 · Capital maintenance and dividends ──────────────── */

  "LWG-24::maintenance": {
    title: "What the capital maintenance doctrine protects",
    format: "ot",
    marks: 2,
    requirement:
      "The doctrine of capital maintenance exists principally to:\n\nA  Ensure shareholders receive a return on their investment\nB  Protect creditors, by preventing the return of capital to members except as permitted\nC  Maximise the company's share price\nD  Prevent the company from borrowing",
    plan: [
      {
        step: "Ask who the rule protects",
        detail:
          "Creditors. Members' liability is limited, so the capital contributed is the fund creditors look to. Allowing it to be returned freely would remove their security.",
      },
      {
        step: "State the general rule",
        detail:
          "Capital may not be returned to members except as the law permits. The rule is a prohibition with defined exceptions rather than a general discretion.",
      },
      {
        step: "Name the permitted exceptions",
        detail:
          "A properly effected reduction of capital, the purchase or redemption of own shares under the statutory conditions, and — where permitted — a purchase out of capital subject to safeguards.",
      },
      {
        step: "Reject the shareholder-facing options",
        detail:
          "A and C describe shareholder interests, which is the opposite of what the doctrine restrains. D is unrelated — borrowing is not a return of capital.",
      },
    ],
    answer:
      "**B — protect creditors, by preventing the return of capital to members except as permitted.**\n\nThe logic follows from limited liability. Because members are not personally liable, the **capital they contributed is the fund creditors look to**. If it could be returned freely, a company could take money from creditors, pay it out to members and leave nothing behind.\n\nSo the rule is a **prohibition with defined exceptions**: a properly effected **reduction of capital**, the **purchase or redemption** of own shares under statutory conditions, and, where permitted, a purchase out of capital subject to safeguards. Each exception has procedural protections — solvency statements, court confirmation or creditor objection rights — and those protections are the point.\n\nA and C describe shareholder interests, which is what the doctrine restrains. Borrowing is not a return of capital at all.\n\nThe dividend rules are the same doctrine applied to distributions: profits may be distributed, capital may not.",
    earns: [
      "Deriving the doctrine from limited liability and the creditors' fund",
      "Knowing the exceptions carry procedural safeguards",
    ],
    loses: ["Reading the doctrine as protecting shareholders"],
  },

  "LWG-24::dividends": {
    title: "What may lawfully be distributed",
    format: "ot",
    marks: 2,
    requirement:
      "A dividend may lawfully be paid out of:\n\nA  Accumulated realised profits less accumulated realised losses\nB  Share premium account\nC  Any reserve the directors choose\nD  Revaluation surplus on property still held",
    plan: [
      {
        step: "State the distributable profits test",
        detail:
          "Accumulated realised profits, so far as not previously distributed or capitalised, less accumulated realised losses so far as not previously written off. Cumulative, and realised.",
      },
      {
        step: "Apply the two limbs",
        detail:
          "CUMULATIVE means a current-year profit cannot be distributed while accumulated losses remain unwritten off. REALISED excludes unrealised gains such as an upward revaluation of property still held.",
      },
      {
        step: "Reject the capital reserves",
        detail:
          "Share premium is a capital reserve and is not distributable — capital maintenance again. Revaluation surplus on an asset still held is unrealised, so also not distributable.",
      },
      {
        step: "Note who decides and the consequence of getting it wrong",
        detail:
          "Directors RECOMMEND and members declare, typically by ordinary resolution; interim dividends are usually paid by the directors alone. An unlawful dividend is repayable by a member who knew, and directors may be personally liable.",
      },
    ],
    answer:
      "**A — accumulated realised profits less accumulated realised losses.**\n\nBoth limbs bite. **Cumulative** means a profitable year does not create distributable profits while accumulated losses remain unwritten off. **Realised** excludes unrealised gains — which is why option D fails: a revaluation surplus on property still held is not realised, and it becomes distributable only if the asset is sold.\n\n**Share premium** is a capital reserve and is not distributable, which is capital maintenance applied to distributions: profits may be distributed, capital may not.\n\nOption C gives directors a discretion the law does not.\n\nProcedure and consequence complete the topic. Directors **recommend** and members **declare**, usually by ordinary resolution and never above the recommended amount; interim dividends are typically paid by the directors alone. An **unlawful** dividend is repayable by a member who knew or had reasonable grounds to know it was unlawful, and the directors who paid it may be personally liable.",
    earns: [
      "Applying both the cumulative and the realised limbs",
      "Knowing the consequences of an unlawful dividend for both members and directors",
    ],
    loses: ["Treating share premium or an unrealised revaluation surplus as distributable"],
  },

  /* ── LWG-25 · Directors: types, appointment, removal ─────────── */

  "LWG-25::types": {
    title: "Recognising a de facto or shadow director",
    format: "ot",
    marks: 2,
    requirement:
      "A person who has never been appointed a director, but on whose instructions the board customarily acts, is:\n\nA  A non-executive director\nB  A shadow director\nC  A de facto director\nD  Not subject to directors' duties at all",
    plan: [
      {
        step: "Define the three informal categories",
        detail:
          "DE FACTO: acts as a director openly without valid appointment. SHADOW: does not act openly, but the board customarily acts on their instructions. NON-EXECUTIVE: validly appointed, not involved in daily management.",
      },
      {
        step: "Read the stem for openness",
        detail:
          "This person does not act as a director themselves; the BOARD acts on their instructions. That is the shadow director's defining feature and separates it from de facto.",
      },
      {
        step: "Reject the option denying liability",
        detail:
          "Option D is the answer the arrangement is designed to achieve and the law denies. Shadow and de facto directors are subject to directors' duties and to disqualification and wrongful trading.",
      },
      {
        step: "Say why the categories exist at all",
        detail:
          "To prevent someone controlling a company while escaping a director's responsibilities by not being appointed. Substance over form, and the whole reason the categories are examined.",
      },
    ],
    answer:
      "**B — a shadow director.**\n\nA **shadow** director does not act openly as a director, but the board **customarily acts on their instructions**. A **de facto** director does act openly as a director without a valid appointment. A **non-executive** director is validly appointed but not involved in daily management.\n\nThe stem gives the shadow director's defining feature: the board acts on their instructions rather than the person acting themselves.\n\nOption D is the outcome the arrangement is designed to achieve and the law denies. Shadow and de facto directors are **subject to directors' duties**, to disqualification, and to liability for wrongful trading.\n\nThat is precisely why the categories exist: to stop someone controlling a company while escaping a director's responsibilities simply by not being appointed. **Substance over form**, applied to office rather than to instruments.",
    earns: [
      "Separating shadow from de facto on whether the person acts openly",
      "Knowing both categories carry full directors' duties",
    ],
    loses: ["Assuming the absence of appointment avoids the duties"],
  },

  "LWG-25::appointment-and-loss": {
    title: "How a director may be removed",
    format: "ot",
    marks: 2,
    requirement:
      "A director may be removed from office by the members:\n\nA  By ordinary resolution, with special notice, notwithstanding anything in the articles or any agreement\nB  By special resolution only\nC  Only if the articles expressly permit removal\nD  Only for breach of duty proved in court",
    plan: [
      {
        step: "State the majority and the procedure",
        detail:
          "An ORDINARY resolution — simple majority — with SPECIAL NOTICE. The low majority is deliberate: members must be able to remove those managing their company.",
      },
      {
        step: "Note the override",
        detail:
          "The power applies notwithstanding anything in the articles or in any agreement. It cannot be contracted away, which is what makes it a genuine protection.",
      },
      {
        step: "Note the director's procedural right",
        detail:
          "The director is entitled to be heard at the meeting and to have written representations circulated. Removal is not a formality even though the majority is low.",
      },
      {
        step: "Note what removal does not extinguish",
        detail:
          "Removal from office does not end a claim for breach of a service CONTRACT. So a removed director may have no office and a substantial damages claim — which is the practical constraint.",
      },
    ],
    answer:
      "**A — by ordinary resolution, with special notice, notwithstanding anything in the articles or any agreement.**\n\nThe **simple majority** is deliberate: members must be able to remove those who manage their company, so the threshold is kept low. **Special notice** is required, and the power applies **notwithstanding anything in the articles or any agreement** — it cannot be contracted away, which is what makes it a real protection rather than a default.\n\nThe director's procedural rights qualify it: they are entitled to be **heard** at the meeting and to have **written representations** circulated. Removal is not a formality.\n\nThe practical constraint is the one candidates miss. Removal from **office** does not end a claim for breach of a **service contract**, so a removed director may have no office and a substantial damages claim for the unexpired term. That is why long service contracts are themselves regulated.\n\nA director may also vacate office by resignation, retirement by rotation, disqualification, bankruptcy or death.",
    earns: [
      "Knowing the power overrides the articles and any agreement",
      "Separating removal from office from liability under a service contract",
    ],
    loses: ["Requiring a special resolution, or making removal dependent on the articles"],
  },

  /* ── LWG-26 · Directors' powers and duties ───────────────────── */

  "LWG-26::powers": {
    title: "Whether an act outside the directors' powers binds the company",
    format: "ot",
    marks: 2,
    requirement:
      "Directors enter a contract exceeding a limit on their powers in the articles, with a third party dealing in good faith who is unaware of the limit. The company is:\n\nA  Not bound, because the directors exceeded their powers\nB  Bound, because in favour of a person dealing with the company in good faith the directors' power to bind is deemed free of limitations under the constitution\nC  Bound only if the members ratify\nD  Not bound, but the third party may sue the directors personally",
    plan: [
      {
        step: "Separate the internal position from the external one",
        detail:
          "Internally the directors have breached the articles. Externally the question is whether the company is bound to the third party. Two different questions with different answers.",
      },
      {
        step: "State the protection for a third party in good faith",
        detail:
          "In favour of a person dealing with the company in good faith, the directors' power to bind is deemed free of any limitation under the company's constitution. Good faith is presumed unless the contrary is shown.",
      },
      {
        step: "Note that knowledge of the constitution is not bad faith",
        detail:
          "A person is not bound to enquire into limitations, and knowing that an act exceeds the directors' powers does not by itself amount to bad faith — a point worth stating precisely.",
      },
      {
        step: "Complete the internal consequence",
        detail:
          "The company is bound AND the directors remain liable to the company for breach of duty. Ratification is not needed to bind the company, though members may ratify to release the directors.",
      },
    ],
    answer:
      "**B — bound, because in favour of a person dealing with the company in good faith the directors' power to bind is deemed free of limitations under the constitution.**\n\nSeparate the two questions. **Internally**, the directors have breached the articles and remain liable to the company for breach of duty. **Externally**, the company is bound to the third party.\n\nThe protection is that in favour of a person dealing with the company in **good faith**, the directors' power to bind is deemed free of any limitation under the constitution. Good faith is **presumed** unless the contrary is shown, and a person is not bound to enquire into limitations — knowing that an act exceeds the directors' powers does not by itself constitute bad faith.\n\nRatification is not needed to bind the company, so option C is wrong, though members may ratify to release the directors from liability.\n\nThe policy is that outsiders cannot be expected to police a company's internal arrangements, which is what makes trading with companies practical.",
    earns: [
      "Splitting the internal breach from the external effect",
      "Knowing good faith is presumed and knowledge alone is not bad faith",
    ],
    loses: ["Letting an internal limitation defeat an outsider's contract"],
  },

  "LWG-26::duties": {
    title: "Identifying which duty is engaged",
    format: "ot",
    marks: 2,
    requirement:
      "A director votes on a board proposal to award a contract to a company in which she holds a substantial personal interest, without disclosing it. She has breached the duty to:\n\nA  Exercise reasonable care, skill and diligence\nB  Avoid conflicts of interest and to declare an interest in a proposed transaction\nC  Act within powers\nD  Exercise independent judgement",
    plan: [
      {
        step: "List the duties before reading the options",
        detail:
          "Act within powers; promote the success of the company; exercise independent judgement; exercise reasonable care, skill and diligence; avoid conflicts of interest; not accept benefits from third parties; declare an interest in a proposed transaction.",
      },
      {
        step: "Match on the facts as stated",
        detail:
          "A personal interest in the counterparty, undisclosed, and she voted. That is the conflict duty together with the specific duty to declare an interest in a proposed transaction.",
      },
      {
        step: "Rank where more than one duty is engaged",
        detail:
          "Independent judgement is arguably engaged too, but the conflict and declaration duties describe the wrong precisely. Choose the duty the facts name rather than one they merely touch.",
      },
      {
        step: "Reject the two that do not fit",
        detail:
          "Care, skill and diligence concerns competence, and nothing suggests incompetence — the wrong is disloyalty. Acting within powers concerns the constitution, which is not mentioned.",
      },
    ],
    answer:
      "**B — avoid conflicts of interest and to declare an interest in a proposed transaction.**\n\nThe facts engage both limbs: a personal interest in the counterparty creates the conflict, and failing to disclose breaches the specific duty to declare an interest in a proposed transaction — which must be declared **before** the company enters the transaction.\n\nIndependent judgement is arguably engaged as well, but the conflict and declaration duties describe the wrong exactly. Where several duties are touched, choose the one the facts name.\n\n**Care, skill and diligence** concerns competence, judged by the standard of a reasonably diligent person with both the general knowledge and experience reasonably expected of someone in that role **and** the director's own actual knowledge and experience — a dual standard, so a qualified accountant is held to more. Nothing here suggests incompetence; the wrong is disloyalty.\n\nDuties are owed to the **company**, not to individual shareholders, which is why the company is normally the proper claimant.",
    earns: [
      "Naming both limbs, and knowing the declaration must precede the transaction",
      "Knowing the care and skill standard is dual — objective plus the director's own attributes",
    ],
    loses: ["Choosing care, skill and diligence as a catch-all for any director wrongdoing"],
  },

  /* ── LWG-27 · Company secretary and auditor ──────────────────── */

  "LWG-27::secretary": {
    title: "What the company secretary's role covers",
    format: "ot",
    marks: 1,
    requirement:
      "The company secretary's responsibilities typically include:\n\nA  Setting the company's commercial strategy\nB  Maintaining the statutory registers and ensuring filings are made\nC  Approving the financial statements\nD  Appointing the auditor",
    plan: [
      {
        step: "Characterise the role",
        detail:
          "Administrative and compliance-focused: statutory registers, filings, minutes of meetings, and advising the board on governance and procedure.",
      },
      {
        step: "Place the other options with their proper bodies",
        detail:
          "Strategy and approval of the financial statements belong to the BOARD. Appointment of the auditor belongs to the MEMBERS in general meeting.",
      },
      {
        step: "Note the secretary's apparent authority",
        detail:
          "A secretary has apparent authority to make contracts of an administrative nature — hiring office staff or ordering supplies — so the company may be bound by those.",
      },
    ],
    answer:
      "**B — maintaining the statutory registers and ensuring filings are made.**\n\nThe role is administrative and compliance-focused: statutory registers, filings with the registrar, minutes of board and general meetings, and advising the board on governance and procedure.\n\nStrategy and approval of the financial statements belong to the **board**. Appointment of the auditor belongs to the **members** in general meeting.\n\nOne point with commercial effect: a company secretary has **apparent authority** to make contracts of an administrative nature — engaging office staff, ordering supplies — so the company may be bound by those even without express authority.\n\nA public company must have a secretary, who must be suitably qualified; a private company generally need not.",
    earns: ["Knowing the secretary has apparent authority for administrative contracts"],
    loses: ["Attributing a board or member function to the secretary"],
  },

  "LWG-27::auditor": {
    title: "The auditor's rights on removal or resignation",
    format: "ot",
    marks: 2,
    requirement:
      "An auditor is removed from office before the expiry of their term. The auditor is entitled to:\n\nA  Nothing, as removal is at the members' discretion\nB  Make representations and have them circulated, and to attend and speak at the meeting at which the term would have expired\nC  Refuse to hand over the audit files in any circumstances\nD  Continue in office until the audit is complete",
    plan: [
      {
        step: "Identify what the protections are FOR",
        detail:
          "Not the auditor's job security — the protection of the MEMBERS. An auditor removed for raising uncomfortable questions must be able to tell the members why.",
      },
      {
        step: "State the rights",
        detail:
          "To make written representations and have them circulated to members, and to attend and be heard at the meeting at which the term would otherwise have expired.",
      },
      {
        step: "Add the statement on ceasing to hold office",
        detail:
          "A departing auditor must deposit a statement of any circumstances that should be brought to the members' or creditors' attention, or state that there are none — which is the strongest protection of the set.",
      },
      {
        step: "Reject the two options overstating the position",
        detail:
          "Removal is by ordinary resolution and does not require cause, so the auditor cannot insist on remaining. And an auditor cannot withhold files in all circumstances.",
      },
    ],
    answer:
      "**B — make representations and have them circulated, and to attend and speak at the meeting at which the term would have expired.**\n\nThese rights exist to protect the **members**, not the auditor's position. An auditor removed for raising uncomfortable questions must be able to tell the members why they are leaving — otherwise removal would be a way of silencing an audit.\n\nThe strongest protection completes the set: an auditor **ceasing to hold office** must deposit a statement of any circumstances that ought to be brought to the attention of members or creditors, or state that there are none. So a resignation prompted by a disagreement cannot pass unexplained.\n\nRemoval is by **ordinary resolution** and does not require cause, so option D is wrong, and an auditor may be removed mid-term.\n\nThe auditor's rights while in office are equally examinable: access to the company's books and records, explanations from officers, and the right to attend and speak at general meetings on matters concerning the audit.",
    earns: [
      "Explaining the rights as protection for the members rather than the auditor",
      "Naming the statement of circumstances on ceasing to hold office",
    ],
    loses: ["Assuming removal requires cause, or that the auditor can insist on completing the audit"],
  },

  /* ── LWG-28 · Meetings and resolutions ──────────────────────── */

  "LWG-28::meetings": {
    title: "Who can require a general meeting to be held",
    format: "ot",
    marks: 2,
    requirement:
      "Members holding what proportion of the paid-up voting share capital may require the directors to call a general meeting?\n\nA  5%\nB  10%\nC  25%\nD  50%",
    plan: [
      {
        step: "Recall the threshold",
        detail:
          "Members holding at least 5% of the paid-up capital carrying voting rights may require the directors to call a general meeting. The threshold is low on purpose.",
      },
      {
        step: "Understand why it is low",
        detail:
          "The board controls the calling of meetings, so without a low threshold a minority could never bring anything before the members. It is a minority protection.",
      },
      {
        step: "Note what happens if the directors do not comply",
        detail:
          "They must call the meeting within 21 days, to be held within 28 days of the notice. If they fail, the requisitioning members may call it themselves and recover their expenses from the company.",
      },
      {
        step: "Keep the percentages separate",
        detail:
          "5% requisitions a meeting. 75% passes a special resolution. Over 50% passes an ordinary one. Confusing a requisition threshold with a voting majority is the trap in this family.",
      },
    ],
    answer:
      "**A — 5%.**\n\nMembers holding at least 5% of the paid-up capital carrying voting rights may require the directors to call a general meeting. The threshold is deliberately low: the **board** controls the calling of meetings, so without it a minority could never bring anything before the members.\n\nThe mechanism has teeth. The directors must call the meeting within **21 days**, to be held within **28 days** of the notice — and if they fail, the requisitioning members may call it **themselves** and recover their expenses from the company.\n\nKeep the percentages separate, because that is the trap in this family of questions: **5%** requisitions a meeting, **over 50%** passes an ordinary resolution, **75%** passes a special resolution. A requisition threshold is not a voting majority.\n\nNotice periods: 14 days for a private company, 21 days for a public company's annual general meeting.",
    earns: [
      "Distinguishing a requisition threshold from a voting majority",
      "Knowing members may call the meeting themselves if the directors do not",
    ],
    loses: ["Answering with a resolution majority instead of the requisition threshold"],
  },

  "LWG-28::resolutions": {
    title: "Which resolution a decision requires",
    format: "ot",
    marks: 2,
    requirement:
      "Which decision requires a **special** resolution?\n\nA  Removing a director from office\nB  Altering the company's articles of association\nC  Appointing an auditor\nD  Approving the directors' recommended dividend",
    plan: [
      {
        step: "Fix the two majorities",
        detail:
          "ORDINARY: over 50% of votes cast. SPECIAL: at least 75%. Special resolutions are reserved for constitutional and fundamental matters.",
      },
      {
        step: "Sort the options by type of decision",
        detail:
          "Altering the articles is constitutional, so special. Removing a director, appointing an auditor and approving a dividend are all ordinary business.",
      },
      {
        step: "Notice that removing a director is deliberately ordinary",
        detail:
          "It is the most counter-intuitive item on the list. The majority is kept low precisely so members can remove directors, and it is the distractor this question is built on.",
      },
      {
        step: "Recall the other special resolution matters",
        detail:
          "Changing the name, reducing capital, disapplying pre-emption rights, and voluntary winding up. All constitutional or fundamental.",
      },
    ],
    answer:
      "**B — altering the company's articles of association.**\n\nAn **ordinary** resolution needs over 50% of votes cast; a **special** resolution needs at least **75%**, and is reserved for constitutional and fundamental matters: altering the articles, changing the name, reducing capital, disapplying pre-emption rights, and voluntary winding up.\n\nOption A is the deliberate distractor and the most counter-intuitive item on the list. **Removing a director requires only an ordinary resolution** — the majority is kept low precisely so members can remove those managing their company, and the power overrides anything in the articles.\n\nAppointing an auditor and approving a dividend are ordinary business.\n\nA **written resolution** is available to private companies as an alternative to a meeting, needing the same majorities calculated on total voting rights rather than votes cast — which is a stricter test than it first appears.",
    earns: [
      "Knowing director removal is ordinary, not special",
      "Knowing a written resolution's majority is measured on total voting rights",
    ],
    loses: ["Assuming removing a director must need a higher majority because it is serious"],
  },

  /* ── LWG-29 · Liquidation ────────────────────────────────────── */

  "LWG-29::voluntary": {
    title: "Telling a members' voluntary liquidation from a creditors' one",
    format: "ot",
    marks: 2,
    requirement:
      "A members' voluntary liquidation may be commenced only where:\n\nA  The company is insolvent\nB  The directors make a statutory declaration of solvency, stating the company can pay its debts in full within a specified period\nC  The creditors resolve to wind up\nD  The court makes an order",
    plan: [
      {
        step: "Split voluntary liquidation on solvency",
        detail:
          "MEMBERS' voluntary liquidation is for a SOLVENT company. CREDITORS' voluntary liquidation is for an insolvent one. Solvency is the whole distinction.",
      },
      {
        step: "State the gateway to a members' liquidation",
        detail:
          "A statutory declaration of solvency by the directors, stating that the company can pay its debts in full, with interest, within a specified period not exceeding twelve months.",
      },
      {
        step: "Note who controls each process",
        detail:
          "In a members' liquidation the MEMBERS appoint the liquidator and control the process, since they bear the outcome. In a creditors' liquidation the CREDITORS do, since the money is theirs.",
      },
      {
        step: "Note the consequence of a false declaration",
        detail:
          "A director making the declaration without reasonable grounds commits an offence. And if the company turns out to be insolvent the process converts to a creditors' voluntary liquidation.",
      },
    ],
    answer:
      "**B — the directors make a statutory declaration of solvency, stating the company can pay its debts in full within a specified period.**\n\nSolvency is the whole distinction. A **members'** voluntary liquidation is for a solvent company; a **creditors'** voluntary liquidation is for an insolvent one.\n\nThe gateway is the **declaration of solvency**: the directors state that the company can pay its debts in full, with interest, within a specified period not exceeding twelve months.\n\nControl follows the money. In a members' liquidation the **members** appoint the liquidator and control the process, because they bear the outcome. In a creditors' liquidation the **creditors** do.\n\nTwo consequences matter. A director who makes the declaration **without reasonable grounds** commits an offence — the declaration is not a formality. And if the company turns out to be insolvent, the process **converts** into a creditors' voluntary liquidation.\n\nBoth are commenced by resolution of the members, which is why the declaration rather than the resolution is what distinguishes them.",
    earns: [
      "Identifying solvency as the distinction and the declaration as the gateway",
      "Knowing the process converts if the company proves insolvent",
    ],
    loses: ["Assuming a members' liquidation is available to an insolvent company"],
  },

  "LWG-29::compulsory": {
    title: "The grounds for a compulsory winding-up order",
    format: "ot",
    marks: 2,
    requirement:
      "Which is a ground on which the court may make a compulsory winding-up order?\n\nA  The company is unable to pay its debts\nB  The company has made a loss for two consecutive years\nC  A shareholder wishes to sell their shares\nD  The directors disagree about strategy",
    plan: [
      {
        step: "Recall the grounds",
        detail:
          "Inability to pay debts, a special resolution that the company be wound up by the court, suspension of business for a year, the number of members falling below the minimum, and the just and equitable ground.",
      },
      {
        step: "Identify the principal ground",
        detail:
          "Inability to pay debts, which is the ground on which most petitions are brought and is usually evidenced by an unsatisfied statutory demand.",
      },
      {
        step: "Reject the three that describe ordinary difficulties",
        detail:
          "Losses, a shareholder wanting liquidity and boardroom disagreement are all ordinary commercial facts. None is a ground — winding up is not a remedy for dissatisfaction.",
      },
      {
        step: "Note the just and equitable ground's narrowness",
        detail:
          "It covers a deadlock or a breakdown in a quasi-partnership relationship, and it is a last resort. It is not a general discretion, which is what option D would require.",
      },
    ],
    answer:
      "**A — the company is unable to pay its debts.**\n\nThat is the principal ground and the one most petitions rest on, usually evidenced by an **unsatisfied statutory demand** or by an unpaid judgment.\n\nThe other grounds are a **special resolution** that the company be wound up by the court, **suspension of business** for a year, the number of members falling below the statutory minimum, and the **just and equitable** ground.\n\nLosses, a shareholder wanting liquidity and boardroom disagreement are ordinary commercial facts. Winding up is not a remedy for dissatisfaction, and treating it as one would put every struggling company at risk.\n\nThe **just and equitable** ground is narrow: a deadlock, or a breakdown in the relationship of a quasi-partnership company. It is a last resort rather than a general discretion — which is what option D would require.\n\nThe order stops the directors' powers, and the liquidator takes control of the company's affairs.",
    earns: [
      "Knowing inability to pay debts is evidenced by an unsatisfied statutory demand",
      "Treating the just and equitable ground as narrow rather than general",
    ],
    loses: ["Treating trading losses or internal disagreement as a ground for winding up"],
  },

  "LWG-29::priority": {
    title: "The order in which a liquidator pays creditors",
    format: "mtq",
    marks: 6,
    requirement:
      "A company in liquidation has the following claims: a bank with a fixed charge over the company's freehold property; the liquidator's fees and expenses; employees' unpaid wages for the four months before liquidation; a bank with a floating charge over inventory and receivables; unsecured trade suppliers; and the ordinary shareholders.\n\n(i) Set out the order in which these claims rank for payment.\n(ii) Explain why the fixed charge holder ranks where it does.",
    plan: [
      {
        step: "Learn the order as a fixed list and write it out before analysing anything",
        detail:
          "Fixed charge holders; liquidator's fees and expenses; preferential creditors; floating charge holders; unsecured creditors; shareholders. Six ranks, and the marks in part (i) are simply for the order.",
      },
      {
        step: "Note the two places candidates transpose",
        detail:
          "Preferential creditors come AFTER the liquidator's expenses but BEFORE floating charge holders — not before fixed charge holders. And floating charges rank below preferential creditors, which is what makes them worth less.",
      },
      {
        step: "Classify each claim in the scenario before ranking it",
        detail:
          "Employees' unpaid wages for a limited period are PREFERENTIAL. Trade suppliers are unsecured. The two banks rank differently despite both being secured, which is the point of the scenario.",
      },
      {
        step: "Answer part (ii) with the mechanism, not the conclusion",
        detail:
          "A fixed charge attaches to a specific asset, so the property is not available to the general body of creditors at all — the chargee is paid out of its own security. Saying \"because it is secured\" is not an explanation.",
      },
    ],
    answer:
      "**(i) The order of payment**\n\n1. **The bank with the fixed charge** over the freehold property — out of the proceeds of that property\n2. **The liquidator's fees and expenses**\n3. **Employees' unpaid wages** for the period before liquidation — preferential creditors, subject to a statutory limit on the amount and period\n4. **The bank with the floating charge** over inventory and receivables\n5. **Unsecured trade suppliers**\n6. **The ordinary shareholders** — only if a surplus remains\n\n**(ii) Why the fixed charge holder ranks first**\n\nA fixed charge attaches to a **specific identified asset**, so that asset is not part of the fund available to the general body of creditors. The chargee is paid out of the proceeds of its own security, and only any surplus on that asset falls into the estate.\n\nThe contrast with the floating charge is what makes the point. A floating charge covers a **class** of assets that the company was free to deal with until crystallisation, so it produces a weaker claim — ranking behind both the liquidator's expenses and preferential creditors. Two banks, both secured, in materially different positions.",
    earns: [
      "Writing out the six ranks in order before analysing the scenario",
      "Placing preferential creditors after the liquidator's expenses and before floating charges",
      "Explaining the fixed charge by the asset being outside the general estate, not just \"because it is secured\"",
    ],
    loses: [
      "Placing preferential creditors ahead of the fixed charge holder",
      "Ranking the two banks equally because both hold security",
      "Omitting the statutory limit on preferential employee claims",
    ],
  },

  /* ── LWG-30 · Administration ─────────────────────────────────── */

  "LWG-30::purpose-and-appointment": {
    title: "What administration is for",
    format: "ot",
    marks: 2,
    requirement:
      "The primary purpose of administration is to:\n\nA  Wind the company up and distribute its assets\nB  Rescue the company as a going concern\nC  Prosecute the directors\nD  Return capital to shareholders",
    plan: [
      {
        step: "State the hierarchy of objectives",
        detail:
          "Rescuing the company as a going concern comes first. If that is not reasonably practicable, achieving a better result for creditors as a whole than on a winding up. Failing that, realising property to distribute to secured or preferential creditors.",
      },
      {
        step: "Contrast administration with liquidation",
        detail:
          "Liquidation ENDS the company. Administration tries to SAVE it, or at least to achieve more for creditors than an immediate winding up would. Different destinations entirely.",
      },
      {
        step: "Note the mechanism that makes rescue possible",
        detail:
          "The MORATORIUM: on appointment, creditors cannot enforce their claims or commence proceedings without consent or permission of the court. Breathing space is what administration supplies.",
      },
      {
        step: "Reject the punitive and shareholder-facing options",
        detail:
          "Administration is not a prosecution, and shareholders rank last in any insolvency — returning capital to them is not an objective of an insolvency procedure.",
      },
    ],
    answer:
      "**B — rescue the company as a going concern.**\n\nThe objectives are hierarchical: **rescue the company as a going concern**; failing that, achieve a **better result for creditors as a whole** than on a winding up; failing that, **realise property** to distribute to secured or preferential creditors. The administrator must pursue them in that order.\n\nThe distinction from liquidation is the point: liquidation **ends** the company, administration tries to **save** it.\n\nWhat makes rescue possible is the **moratorium**. On appointment, creditors cannot enforce their claims or commence proceedings without consent or the permission of the court — so the company gets breathing space in which a rescue can be attempted, instead of being dismembered by the first creditor to act.\n\nAn administrator may be appointed by the **court**, by the holder of a **qualifying floating charge**, or by the **company or its directors**.",
    earns: [
      "Stating the objectives as a hierarchy rather than a list",
      "Naming the moratorium as the mechanism that makes rescue possible",
    ],
    loses: ["Treating administration as a form of liquidation"],
  },

  "LWG-30::effects-and-powers": {
    title: "What happens to the directors when an administrator is appointed",
    format: "ot",
    marks: 2,
    requirement:
      "On the appointment of an administrator:\n\nA  The directors are automatically dismissed\nB  The directors remain in office but may not exercise management powers without the administrator's consent\nC  The directors continue to manage the company as before\nD  The company is immediately dissolved",
    plan: [
      {
        step: "Separate holding office from exercising power",
        detail:
          "The directors remain IN OFFICE — they are not dismissed — but their management powers are suspended. Office and power are two different things, and the question depends on the difference.",
      },
      {
        step: "State what the administrator acquires",
        detail:
          "Control of the company's affairs, business and property, with power to remove or appoint directors and to do anything necessary for managing the company.",
      },
      {
        step: "Note why the directors are not simply dismissed",
        detail:
          "Their knowledge of the business is useful to a rescue, and they retain statutory duties, including to co-operate with the administrator and to provide a statement of affairs.",
      },
      {
        step: "Reject the option that changes nothing",
        detail:
          "Option C would make administration pointless. The whole procedure rests on control passing to an independent insolvency practitioner acting for the creditors as a whole.",
      },
    ],
    answer:
      "**B — the directors remain in office but may not exercise management powers without the administrator's consent.**\n\nHolding office and exercising power are different things. The directors are **not dismissed**, but their management powers are **suspended**: the administrator takes control of the company's affairs, business and property, with power to remove or appoint directors and to do whatever is necessary for managing the company.\n\nThey are not dismissed because their knowledge of the business is useful to a rescue, and because they retain statutory duties — including to **co-operate** with the administrator and to provide a **statement of affairs**.\n\nOption C would make administration pointless: the whole procedure rests on control passing to an independent insolvency practitioner acting for the **creditors as a whole** rather than for the members who appointed the board.\n\nThe administrator must also propose how the objective will be achieved and put the proposals to the creditors.",
    earns: [
      "Separating remaining in office from retaining management powers",
      "Knowing the directors' continuing duties to co-operate and to provide a statement of affairs",
    ],
    loses: ["Assuming appointment dismisses the board"],
  },

  /* ── LWG-31 · Insider dealing and market abuse ───────────────── */

  "LWG-31::insider-dealing": {
    title: "Identifying the elements of insider dealing",
    format: "ot",
    marks: 2,
    requirement:
      "Insider dealing requires that the information relied on is:\n\nA  Any information about the company\nB  Inside information: specific or precise, not public, relating to particular securities or issuers, and likely to have a significant effect on price if made public\nC  Information the dealer believes to be true\nD  Information obtained from a published source",
    plan: [
      {
        step: "Learn the four elements of inside information",
        detail:
          "Specific or precise; not made public; relating to particular securities or issuers; and likely, if made public, to have a significant effect on the price. All four are required.",
      },
      {
        step: "Test the options against all four",
        detail:
          "\"Any information about the company\" fails on precision, publicity and price sensitivity. Information from a published source fails on the not-public element outright.",
      },
      {
        step: "Note what the offences actually are",
        detail:
          "Dealing while in possession of inside information as an insider, ENCOURAGING another to deal, and DISCLOSING the information otherwise than in the proper performance of employment.",
      },
      {
        step: "Note that no profit is required",
        detail:
          "The offence is complete on dealing while in possession of the information. Whether the dealer profited, or even lost, is irrelevant — a point candidates frequently get wrong.",
      },
    ],
    answer:
      "**B — inside information: specific or precise, not public, relating to particular securities or issuers, and likely to have a significant effect on price if made public.**\n\nAll four elements are required, and a question will usually fail on one of them. \"Any information about the company\" fails on precision, publicity and price sensitivity together; information from a **published** source fails on the not-public element outright.\n\nThe **three offences** are worth holding separately: **dealing** while in possession of inside information as an insider, **encouraging** another to deal, and **disclosing** the information otherwise than in the proper performance of employment. So passing a tip on is an offence even if the tipper never trades.\n\nAnd **no profit is required**. The offence is complete on dealing while in possession of the information, whether the dealer profited or lost.\n\nDefences include showing the dealer did not expect a profit attributable to the information, or believed it had been widely disclosed.",
    earns: [
      "Requiring all four elements, and knowing disclosure and encouragement are separate offences",
      "Knowing no profit is needed for the offence to be complete",
    ],
    loses: ["Treating any confidential company information as inside information"],
  },

  "LWG-31::market-abuse": {
    title: "How market abuse differs from insider dealing",
    format: "ot",
    marks: 2,
    requirement:
      "A principal difference between market abuse and the criminal offence of insider dealing is that market abuse:\n\nA  Requires proof of dishonesty\nB  Is a civil regime, requiring a lower standard of proof and not requiring criminal intent\nC  Applies only to directors\nD  Carries a prison sentence",
    plan: [
      {
        step: "Classify each regime",
        detail:
          "Insider dealing is a CRIMINAL offence, so it needs proof beyond reasonable doubt. Market abuse is a CIVIL regime enforced by the regulator on the balance of probabilities.",
      },
      {
        step: "Derive the practical difference",
        detail:
          "The lower standard of proof, and the absence of any requirement of criminal intent, make market abuse markedly easier to establish — which is precisely why the civil regime exists alongside the criminal one.",
      },
      {
        step: "Reject the option reversing the intent requirement",
        detail:
          "Option A requires dishonesty for the civil regime. It is the criminal offence that needs the mental element; the civil regime is behaviour-based.",
      },
      {
        step: "Note what market abuse covers",
        detail:
          "Insider dealing, unlawful disclosure and market manipulation — including creating a false or misleading impression as to supply, demand or price. It is wider than the criminal offence.",
      },
    ],
    answer:
      "**B — is a civil regime, requiring a lower standard of proof and not requiring criminal intent.**\n\nInsider dealing is **criminal**, so it must be proved beyond reasonable doubt with the required mental element. Market abuse is a **civil** regime enforced by the regulator on the **balance of probabilities** and is behaviour-based.\n\nThat is exactly why the civil regime exists alongside the criminal one: it is markedly easier to establish, so conduct that could not be prosecuted can still be sanctioned by fines, public censure and restitution orders.\n\nOption A reverses the position — dishonesty belongs to the criminal offence, not the civil regime. Option D attributes a criminal penalty to a civil regime.\n\nMarket abuse is also **wider** in what it covers: insider dealing, unlawful **disclosure**, and market **manipulation**, including creating a false or misleading impression as to the supply of, demand for, or price of an investment.",
    earns: [
      "Deriving the difference from criminal versus civil classification",
      "Knowing market abuse covers manipulation as well as insider dealing",
    ],
    loses: ["Requiring dishonesty for the civil regime"],
  },

  /* ── LWG-32 · Money laundering ───────────────────────────────── */

  "LWG-32::the-offences": {
    title: "Naming the stage and the offence",
    format: "ot",
    marks: 2,
    requirement:
      "An accountant suspects a client is laundering money but does not report it to the appropriate authority. The accountant may commit the offence of:\n\nA  Tipping off\nB  Failure to disclose\nC  Money laundering itself\nD  No offence, as the suspicion may be unfounded",
    plan: [
      {
        step: "List the three offences and what each punishes",
        detail:
          "LAUNDERING: concealing, arranging, acquiring or using criminal property. FAILURE TO DISCLOSE: not reporting a knowledge or suspicion arising in the regulated sector. TIPPING OFF: alerting a suspect that a report has been made.",
      },
      {
        step: "Match the facts to the omission",
        detail:
          "The accountant has a suspicion and does not report it. That is failure to disclose — an offence of omission, which is why it catches professionals who do nothing.",
      },
      {
        step: "Reject the option that excuses inaction",
        detail:
          "Option D is the trap. The threshold is SUSPICION, not proof. An accountant need not be sure, and waiting for certainty is itself how the offence is committed.",
      },
      {
        step: "Note where the report goes",
        detail:
          "To the firm's nominated officer, or directly to the authority. And having reported, the accountant must not tell the client — which would be tipping off, the third offence.",
      },
    ],
    answer:
      "**B — failure to disclose.**\n\nThe three offences are **laundering** (concealing, arranging, acquiring or using criminal property), **failure to disclose** (not reporting a knowledge or suspicion arising in the regulated sector), and **tipping off** (alerting a suspect that a report has been made).\n\nOption D is the trap and it is worth being explicit about: the threshold is **suspicion**, not proof or certainty. An accountant need not be sure of anything, and waiting for certainty is precisely how the offence is committed.\n\nThe report goes to the firm's **nominated officer** — the money laundering reporting officer — or directly to the authority. Having reported, the accountant must **not** tell the client, which would be tipping off.\n\nA protected disclosure made in good faith does not breach the duty of **confidentiality**, which resolves the conflict the accountant would otherwise face between reporting and client confidence.",
    earns: [
      "Knowing suspicion is the threshold, and that failure to disclose is an offence of omission",
      "Naming the confidentiality override for a protected disclosure",
    ],
    loses: ["Treating uncertainty as a reason not to report"],
  },

  "LWG-32::the-controls": {
    title: "What a firm's anti-money laundering procedures must include",
    format: "ot",
    marks: 2,
    requirement:
      "A firm's anti-money laundering procedures must include:\n\nA  Customer due diligence, record keeping, a nominated officer, training, and internal reporting procedures\nB  Refusing to act for any client based overseas\nC  Reporting every transaction above a fixed value regardless of suspicion\nD  Publishing the identity of all clients",
    plan: [
      {
        step: "Recall the required elements as a set",
        detail:
          "Customer due diligence including identification and verification, record keeping, appointment of a nominated officer, training of staff, internal reporting procedures, and a risk assessment.",
      },
      {
        step: "Reject the blanket-refusal option",
        detail:
          "The obligation is risk-based, not to refuse whole categories of client. Overseas clients require appropriate due diligence, possibly enhanced, rather than exclusion.",
      },
      {
        step: "Reject the fixed-threshold reporting option",
        detail:
          "Reporting is triggered by SUSPICION, not by a value threshold. A mechanical rule would generate volume without judgement and miss the transactions that matter.",
      },
      {
        step: "Reject the publication option",
        detail:
          "Client identity is confidential. The obligation is to KNOW who the client is and to be able to demonstrate it, not to publish it.",
      },
    ],
    answer:
      "**A — customer due diligence, record keeping, a nominated officer, training, and internal reporting procedures.**\n\nThe required elements form a set: **customer due diligence** (identifying the client and verifying identity, and identifying beneficial owners), **record keeping**, appointment of a **nominated officer**, **training** of staff, **internal reporting** procedures, and a documented **risk assessment**.\n\nOption B misreads the obligation as exclusion. It is **risk-based**: an overseas client requires appropriate, possibly enhanced, due diligence rather than refusal.\n\nOption C substitutes a value threshold for judgement. Reporting is triggered by **suspicion**, and a mechanical rule would generate volume while missing what matters.\n\nOption D confuses knowing the client with publishing their identity — client information remains confidential, and the obligation is to know and be able to demonstrate it.\n\nEnhanced due diligence applies to higher-risk relationships, including politically exposed persons.",
    earns: [
      "Describing the obligation as risk-based rather than rule-based",
      "Knowing due diligence extends to beneficial owners",
    ],
    loses: ["Substituting a fixed reporting threshold for the suspicion test"],
  },

  /* ── LWG-33 · Bribery, fraudulent and wrongful trading ───────── */

  "LWG-33::bribery": {
    title: "The corporate offence and the defence to it",
    format: "ot",
    marks: 2,
    requirement:
      "A commercial organisation may be liable for failing to prevent bribery by a person associated with it. Its defence is to show that it had:\n\nA  No knowledge of the bribery\nB  Adequate procedures designed to prevent bribery by associated persons\nC  Dismissed the employee concerned\nD  Made a profit that did not depend on the bribe",
    plan: [
      {
        step: "Identify the nature of the corporate offence",
        detail:
          "It is a failure-to-prevent offence. The organisation is liable for bribery by an associated person, without needing to have known of it — which is what makes it so demanding.",
      },
      {
        step: "State the only defence",
        detail:
          "Adequate procedures designed to prevent bribery by associated persons. Procedures, not ignorance, and they must exist before the event.",
      },
      {
        step: "Explain why lack of knowledge is no defence",
        detail:
          "The offence exists precisely to prevent organisations insulating themselves through deliberate ignorance. Option A would defeat the whole provision.",
      },
      {
        step: "Note the other offences and the breadth of \"associated person\"",
        detail:
          "Offering, promising or giving a bribe; requesting or accepting one; bribing a foreign public official. And an associated person includes employees, agents and subsidiaries — extending liability across the supply chain.",
      },
    ],
    answer:
      "**B — adequate procedures designed to prevent bribery by associated persons.**\n\nThe corporate offence is one of **failing to prevent**, so the organisation is liable for bribery by an associated person **without needing to have known of it**. That is what makes it demanding, and it is why option A cannot be a defence: allowing lack of knowledge would let organisations insulate themselves through deliberate ignorance and defeat the provision entirely.\n\nThe defence is **procedures**, which must exist before the event — risk assessment, top-level commitment, due diligence on third parties, training, clear policies on gifts and hospitality, and monitoring.\n\nThe other offences are offering, promising or giving a bribe; requesting or accepting one; and bribing a **foreign public official**.\n\n\"**Associated person**\" is deliberately wide — employees, agents, subsidiaries and others performing services for the organisation — so liability extends across the supply chain, which is why third-party due diligence matters so much.",
    earns: [
      "Knowing procedures are the only defence and must pre-date the bribery",
      "Recognising how wide \"associated person\" is",
    ],
    loses: ["Offering absence of knowledge as a defence to a failure-to-prevent offence"],
  },

  "LWG-33::fraudulent-and-wrongful": {
    title: "The one element that separates wrongful from fraudulent trading",
    format: "ot",
    marks: 2,
    requirement:
      "Wrongful trading differs from fraudulent trading in that wrongful trading:\n\nA  Requires proof of dishonest intent\nB  Does not require dishonesty — it is enough that the director knew or ought to have concluded there was no reasonable prospect of avoiding insolvent liquidation and did not take every step to minimise loss to creditors\nC  Is a criminal offence only\nD  Applies only to public companies",
    plan: [
      {
        step: "Fix the single distinguishing element",
        detail:
          "DISHONESTY. Fraudulent trading requires an intent to defraud; wrongful trading does not. Everything else about the two is secondary to that.",
      },
      {
        step: "State the wrongful trading test in full",
        detail:
          "The director knew, or ought to have concluded, that there was no reasonable prospect of avoiding insolvent liquidation, and thereafter failed to take every step to minimise the potential loss to creditors.",
      },
      {
        step: "Note why the absence of dishonesty matters practically",
        detail:
          "It makes wrongful trading far easier to establish. Dishonesty is hard to prove, so fraudulent trading is rare while wrongful trading is the real risk for a director of a failing company.",
      },
      {
        step: "Note the consequence and the safe course",
        detail:
          "The court may order a personal contribution to the company's assets. The safe course is to take advice early, document the reasoning, and act to minimise creditor loss rather than trading on in hope.",
      },
    ],
    answer:
      "**B — does not require dishonesty — it is enough that the director knew or ought to have concluded there was no reasonable prospect of avoiding insolvent liquidation and did not take every step to minimise loss to creditors.**\n\n**Dishonesty** is the single distinguishing element. Fraudulent trading requires an **intent to defraud** creditors and carries both civil and criminal liability. Wrongful trading requires none.\n\nThe test has two limbs: the director **knew or ought to have concluded** there was no reasonable prospect of avoiding insolvent liquidation, and thereafter **failed to take every step** to minimise the potential loss to creditors. \"Ought to have concluded\" is objective, so honest optimism is no answer.\n\nThe practical consequence is that wrongful trading is far easier to establish — dishonesty is hard to prove, so fraudulent trading is rare while wrongful trading is the real exposure for a director of a failing company. The court may order a **personal contribution** to the company's assets.\n\nThe safe course is to take advice early, document the reasoning, and act to limit creditor loss rather than trading on in hope.",
    earns: [
      "Naming dishonesty as the single distinguishing element",
      "Knowing \"ought to have concluded\" is objective, so honest optimism is no defence",
    ],
    loses: ["Importing dishonesty into wrongful trading, which is what makes it hard to establish"],
  },
}
