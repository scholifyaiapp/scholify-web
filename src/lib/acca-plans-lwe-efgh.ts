/*
 * LW-ENG Areas E to H — capital and financing, management and administration,
 * insolvency and administration, and corporate fraudulent and criminal behaviour.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * This is where LW-ENG demands the most precision, and where its distractors are
 * real rules with one element altered: a 75% majority where a simple one is
 * required, preferential creditors placed above a fixed charge, dishonesty imported
 * into an offence that does not require it. So each plan states the element the
 * distractor moves.
 *
 * Statutory provisions are cited by section where their wording is used, which is
 * the condition on which quoting statute is legitimate at all.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const LWE_PLANS_EFGH: ExamPlanMap = {
  /* ── LWE-34 · Share capital ─────────────────────────────────── */

  "LWE-34::capital-and-classes": {
    title: "The types of capital, and what a preference share carries",
    format: "ot",
    marks: 2,
    requirement:
      "Unless the articles provide otherwise, preference shares are presumed to be:\n\nA  Cumulative, so an unpaid dividend carries forward\nB  Non-cumulative, so an unpaid dividend is lost\nC  Redeemable at the holder's option\nD  Carrying full voting rights",
    plan: [
      {
        step: "Recall the presumption",
        detail:
          "Preference shares are presumed CUMULATIVE unless stated otherwise. So an unpaid preference dividend carries forward and must be cleared before any later ordinary dividend.",
      },
      {
        step: "Note what a preference share does and does not carry",
        detail:
          "A fixed dividend in priority, and priority for capital on a winding up. Generally NO voting rights, or only where the dividend is in arrears — so option D reverses the position.",
      },
      {
        step: "Separate priority from guarantee",
        detail:
          "A preference dividend is payable only if there are distributable profits and it is declared. Priority is not a guarantee, and a preference shareholder in a loss-making company receives nothing.",
      },
      {
        step: "Recall the capital vocabulary",
        detail:
          "ISSUED capital: shares allotted. CALLED-UP: the part of the price demanded, paid or not. PAID-UP: what has been received. The uncalled amount measures a member's remaining liability.",
      },
    ],
    answer:
      "**A — cumulative, so an unpaid dividend carries forward.**\n\nThe presumption is cumulative unless the articles say otherwise, so an unpaid preference dividend accumulates and must be cleared before any later ordinary dividend.\n\nA preference share carries a **fixed dividend in priority** and **priority for capital** on a winding up, but generally **no vote** — or a vote only where the dividend is in arrears, which is when the holder's economic interest is actually at risk. Option D reverses that.\n\n**Priority is not a guarantee**: the dividend is payable only if there are distributable profits and it is declared, so a preference shareholder in a loss-making company receives nothing.\n\nThe capital vocabulary runs **issued** (shares allotted), **called-up** (the part of the price demanded, paid or not) and **paid-up** (what has been received) — with the **uncalled** amount measuring a member's remaining liability on a winding up.\n\nClass rights are varied by the articles' procedure, and a dissenting minority of the class may apply to court to cancel the variation.",
    earns: [
      "Knowing the cumulative presumption and that voting rights are the exception",
      "Separating priority from guarantee",
    ],
    loses: ["Assuming preference shares carry votes because they are shares"],
  },

  "LWE-34::issues": {
    title: "Pre-emption rights, and how a bonus issue differs",
    format: "ot",
    marks: 2,
    requirement:
      "Statutory pre-emption rights require that new shares be offered:\n\nA  To the public first\nB  To existing shareholders in proportion to their holdings, before outsiders\nC  To the directors first\nD  To the company's creditors first",
    plan: [
      {
        step: "State what pre-emption protects",
        detail:
          "Against DILUTION. A member who is not offered new shares first sees their proportionate holding, and their voting power, reduced by an issue they had no chance to take part in.",
      },
      {
        step: "State the mechanism",
        detail:
          "New equity must be offered to existing shareholders in proportion to their existing holdings before it is offered to outsiders. That is what a rights issue is.",
      },
      {
        step: "Note that the right can be disapplied",
        detail:
          "By special resolution, or by the articles in a private company. So the protection is a default the members can waive when they want to issue shares to a new investor.",
      },
      {
        step: "Distinguish the bonus issue",
        detail:
          "A bonus issue raises NO cash — reserves are capitalised to pay up free shares. Total equity is unchanged, and no dilution arises because every member receives shares proportionately.",
      },
    ],
    answer:
      "**B — to existing shareholders in proportion to their holdings, before outsiders.**\n\nPre-emption protects against **dilution**: a member not offered new shares first sees their proportionate holding and voting power reduced by an issue they had no chance to join. Offering proportionately preserves the balance.\n\nThat is what a **rights issue** is — new shares offered to existing members, usually at a discount to market, and it raises cash.\n\nThe right can be **disapplied** by special resolution, or by the articles in a private company, so the protection is a default the members may waive when they want to bring in a new investor.\n\nA **bonus issue** is the contrast: no cash is raised, reserves are capitalised to pay up free shares, **total equity is unchanged**, and no dilution arises because every member receives shares proportionately. Each member simply holds more shares in the same company, so the share price falls proportionately.",
    earns: [
      "Explaining pre-emption through dilution rather than as a formality",
      "Knowing a bonus issue raises no cash and causes no dilution",
    ],
    loses: ["Treating a bonus issue as a way of raising finance"],
  },

  /* ── LWE-35 · Loan capital and charges ──────────────────────── */

  "LWE-35::loan-capital": {
    title: "Debt against equity in the company's hands",
    format: "ot",
    marks: 2,
    requirement:
      "Which statement about a debenture holder is correct?\n\nA  They are a member of the company and may vote at general meetings\nB  They are a creditor, entitled to interest whether or not profits are made, and rank ahead of members on a winding up\nC  Their interest may only be paid out of distributable profits\nD  They rank after ordinary shareholders on a winding up",
    plan: [
      {
        step: "Classify the party once, then derive everything",
        detail:
          "A debenture holder is a CREDITOR, not a member. Entitlement, ranking and governance rights all follow from that single classification.",
      },
      {
        step: "Derive the entitlement and the ranking",
        detail:
          "Interest is a contractual obligation payable regardless of profits, and creditors rank BEFORE members on a winding up. Options C and D each apply a member's rule to a creditor.",
      },
      {
        step: "Derive the governance position",
        detail:
          "No vote at general meetings, because they are not a member. Their protection is the trust deed and its covenants, not governance rights.",
      },
      {
        step: "Note the tax difference",
        detail:
          "Interest is deductible in computing profit; a dividend is a distribution of profit. That difference is a real reason companies use debt.",
      },
    ],
    answer:
      "**B — they are a creditor, entitled to interest whether or not profits are made, and rank ahead of members on a winding up.**\n\nOne classification settles everything: a debenture holder is a **creditor**, not a member.\n\nFrom that: interest is a **contractual obligation** payable regardless of profits, while a dividend needs distributable profits and a declaration — so option C applies the dividend rule to interest. Creditors rank **before** members, so option D is reversed. And there is **no vote**, because they are not a member.\n\nTheir protection is therefore **contractual** — the trust deed and its covenants restricting further borrowing, disposals and dividends — rather than any say in how the company is run.\n\nThe tax difference is a real commercial driver: **interest is deductible** in computing profit, whereas a dividend is a distribution of it.",
    earns: [
      "Deriving every difference from creditor versus member",
      "Naming the deductibility of interest as a reason for using debt",
    ],
    loses: ["Applying a member's rule — voting, or distributable profits — to a creditor"],
  },

  "LWE-35::charges": {
    title: "Crystallisation, ranking and the consequence of not registering",
    format: "ot",
    marks: 2,
    requirement:
      "A company grants a charge but fails to register it within the required period. The charge is:\n\nA  Valid against everyone\nB  Void against a liquidator, administrator and other creditors, so the lender is effectively unsecured\nC  Valid but unenforceable against the company\nD  Automatically converted into a fixed charge",
    plan: [
      {
        step: "State the consequence of non-registration precisely",
        detail:
          "The charge is void against a liquidator, an administrator and other creditors. The debt itself survives, but the SECURITY does not — so the lender joins the unsecured queue.",
      },
      {
        step: "Note who the rule protects",
        detail:
          "Other creditors, who need to know what security has already been given before lending. Registration is a public notice system, and the sanction is what makes it work.",
      },
      {
        step: "Distinguish the two kinds of charge",
        detail:
          "A FIXED charge attaches to a specific asset immediately. A FLOATING charge hovers over a class of assets the company may deal with until CRYSTALLISATION fixes it on what is then there.",
      },
      {
        step: "Note the ranking, since it is what makes a floating charge weaker",
        detail:
          "A fixed charge ranks ahead of a floating charge over the same assets, and preferential creditors are paid ahead of floating charge holders. So a floating charge is worth materially less.",
      },
    ],
    answer:
      "**B — void against a liquidator, administrator and other creditors, so the lender is effectively unsecured.**\n\nThe debt itself survives — the company still owes the money — but the **security** does not, so the lender joins the unsecured queue and recovers pence in the pound. It is one of the most expensive administrative failures in company law.\n\nThe rule protects **other creditors**, who need to know what security has already been given before they lend. Registration is a public notice system, and the sanction is what makes it function.\n\nThe two kinds: a **fixed** charge attaches to a specific identified asset immediately, so the company cannot dispose of it without consent. A **floating** charge hovers over a class of assets — inventory, receivables — that the company may deal with in the ordinary course until **crystallisation** fixes it on whatever is then there, triggered by liquidation, administration, the appointment of a receiver, or ceasing to trade.\n\nRanking makes the floating charge materially weaker: a **fixed charge ranks ahead** of it, and **preferential creditors** are paid ahead of it too.",
    earns: [
      "Distinguishing the surviving debt from the lost security",
      "Naming crystallisation triggers and the ranking that weakens a floating charge",
    ],
    loses: ["Assuming an unregistered charge remains valid because the loan is genuine"],
  },

  /* ── LWE-36 · Capital maintenance and dividends ─────────────── */

  "LWE-36::maintenance": {
    title: "Whom capital maintenance protects",
    format: "ot",
    marks: 2,
    requirement:
      "The doctrine of capital maintenance exists to protect:\n\nA  Shareholders, by guaranteeing a return\nB  Creditors, by preventing the return of capital to members except as the law permits\nC  Directors, from personal liability\nD  Employees, by preserving jobs",
    plan: [
      {
        step: "Reason from limited liability",
        detail:
          "Because members are not personally liable, the capital they contributed is the fund creditors look to. If it could be returned freely, creditors would be left with nothing behind the company.",
      },
      {
        step: "State the rule's structure",
        detail:
          "A prohibition with defined exceptions, not a general discretion. Capital may not be returned to members except as the law permits.",
      },
      {
        step: "Name the exceptions and their safeguards",
        detail:
          "A reduction of capital by special resolution with a solvency statement or court confirmation, and the purchase or redemption of own shares under statutory conditions. Each carries procedural protection for creditors.",
      },
      {
        step: "Reject the shareholder-facing option",
        detail:
          "Option A inverts the doctrine — it RESTRAINS what shareholders may take out, and guarantees them nothing. That inversion is the error the question tests.",
      },
    ],
    answer:
      "**B — creditors, by preventing the return of capital to members except as the law permits.**\n\nThe logic runs from limited liability: because members are not personally liable, **the capital they contributed is the fund creditors look to**. If it could be returned freely, a company could take money from creditors, pay it to members and leave nothing behind.\n\nThe rule is a **prohibition with defined exceptions**, not a discretion. The exceptions are a **reduction of capital** by special resolution supported by a solvency statement or confirmed by the court, and the **purchase or redemption of own shares** under statutory conditions — each with procedural safeguards for creditors, which are the point rather than the paperwork.\n\nOption A inverts the doctrine: it **restrains** what shareholders may take out and guarantees them nothing.\n\nThe dividend rules are the same doctrine applied to distributions — profits may be distributed, capital may not.",
    earns: [
      "Deriving the doctrine from limited liability and the creditors' fund",
      "Knowing the exceptions carry creditor safeguards",
    ],
    loses: ["Reading the doctrine as protecting shareholders' returns"],
  },

  "LWE-36::dividends": {
    title: "The two tests a distribution must satisfy",
    format: "ot",
    marks: 2,
    requirement:
      "A public company wishes to pay a dividend. It must satisfy:\n\nA  Only that it has accumulated realised profits\nB  The distributable profits test, and additionally that net assets are not less than called-up share capital plus undistributable reserves\nC  Only that its directors consider it prudent\nD  Only that its creditors consent",
    plan: [
      {
        step: "State the test that applies to every company",
        detail:
          "Distributable profits: accumulated realised profits not previously distributed or capitalised, less accumulated realised losses not previously written off. Cumulative, and realised.",
      },
      {
        step: "Add the extra test for a public company",
        detail:
          "A public company must ALSO show that its net assets are not less than called-up share capital plus undistributable reserves, and that the distribution does not reduce them below that.",
      },
      {
        step: "See what the extra test catches",
        detail:
          "Unrealised LOSSES. The profits test ignores them, so a public company with distributable profits but depleted net assets is caught by the second test and cannot distribute.",
      },
      {
        step: "Note the consequence of an unlawful dividend",
        detail:
          "Repayable by a member who knew or had reasonable grounds to know it was unlawful, and the directors who paid it may be personally liable.",
      },
    ],
    answer:
      "**B — the distributable profits test, and additionally that net assets are not less than called-up share capital plus undistributable reserves.**\n\nEvery company must satisfy the **distributable profits** test: accumulated **realised** profits not previously distributed or capitalised, less accumulated **realised** losses not previously written off. Both limbs bite — a profitable year creates nothing distributable while accumulated losses remain unwritten off, and unrealised gains such as a revaluation surplus on an asset still held do not count.\n\nA **public** company must satisfy a **second, stricter** test: net assets must be not less than called-up share capital plus undistributable reserves, and the distribution must not reduce them below that.\n\nWhat the second test catches is **unrealised losses**, which the profits test ignores. So a public company with distributable profits but depleted net assets cannot distribute.\n\nAn **unlawful** dividend is repayable by a member who knew or had reasonable grounds to know, and the directors who paid it may be **personally liable**.",
    earns: [
      "Knowing the second test applies to public companies and what it catches",
      "Naming the consequences for both members and directors",
    ],
    loses: ["Applying only the profits test to a public company"],
  },

  /* ── LWE-37 · Directors ─────────────────────────────────────── */

  "LWE-37::types-appointment": {
    title: "Who counts as a director",
    format: "ot",
    marks: 2,
    requirement:
      "A person on whose instructions the board customarily acts, but who has never been appointed, is a:\n\nA  Non-executive director, owing reduced duties\nB  Shadow director, subject to directors' duties\nC  Consultant, owing no duties to the company\nD  De facto director, because they act openly as a director",
    plan: [
      {
        step: "Define the informal categories against each other",
        detail:
          "DE FACTO: acts openly as a director without valid appointment. SHADOW: does not act openly, but the board customarily acts on their instructions. NON-EXECUTIVE: validly appointed, not in daily management.",
      },
      {
        step: "Read the stem for openness",
        detail:
          "The BOARD acts on their instructions; the person does not act as a director themselves. That is the shadow director, and it is what separates it from de facto.",
      },
      {
        step: "Reject the no-duties option",
        detail:
          "Option C is the outcome the arrangement is designed to produce and the law denies. Shadow and de facto directors are subject to directors' duties, disqualification and wrongful trading.",
      },
      {
        step: "Note that a non-executive owes the SAME duties",
        detail:
          "Option A is wrong on that point too. A non-executive director owes the same general duties as an executive — the role differs, the duties do not.",
      },
    ],
    answer:
      "**B — shadow director, subject to directors' duties.**\n\nThe defining feature is that the **board acts on their instructions** while the person does not act as a director themselves. A **de facto** director does act openly as a director without a valid appointment, which is why option D is the wrong half of the distinction.\n\nOption C is the outcome the arrangement is engineered to produce, and the law denies it: shadow and de facto directors are subject to **directors' duties**, to **disqualification** and to **wrongful trading**. The categories exist precisely to stop someone controlling a company while escaping a director's responsibilities by not being appointed — substance over form.\n\nOption A is wrong on a second point worth knowing: a **non-executive** director owes the **same general duties** as an executive. The role differs — no daily management, a scrutiny and governance function — but the duties do not.\n\nA sole director is possible in a private company; a public company needs at least two.",
    earns: [
      "Separating shadow from de facto on whether the person acts openly",
      "Knowing a non-executive owes the same duties, not reduced ones",
    ],
    loses: ["Assuming the absence of appointment or of an executive role reduces the duties"],
  },

  "LWE-37::leaving-disqualification": {
    title: "How a director leaves office, and on what grounds they can be barred",
    format: "ot",
    marks: 2,
    requirement:
      "A director may be removed from office by the members by:\n\nA  Special resolution, with 28 days' notice\nB  Ordinary resolution with special notice, notwithstanding anything in the articles or any agreement\nC  Ordinary resolution, but only if the articles permit\nD  Written resolution of the directors",
    plan: [
      {
        step: "Fix the majority, which is the element distractors move",
        detail:
          "An ORDINARY resolution — simple majority — with special notice. The low threshold is deliberate: members must be able to remove those managing their company.",
      },
      {
        step: "Note the override",
        detail:
          "The power applies notwithstanding anything in the articles or any agreement, so it cannot be contracted away. That is what makes it a genuine protection rather than a default.",
      },
      {
        step: "Note the director's procedural rights",
        detail:
          "Entitled to be heard at the meeting and to have written representations circulated. Removal is not a formality even though the majority is low.",
      },
      {
        step: "Separate removal from the service contract",
        detail:
          "Removal from OFFICE does not end a claim for breach of the service CONTRACT. So a removed director may have no office and a substantial damages claim for the unexpired term.",
      },
    ],
    answer:
      "**B — ordinary resolution with special notice, notwithstanding anything in the articles or any agreement.**\n\nThe **simple majority** is the element the distractors move, and it is deliberately low: members must be able to remove those who manage their company. **Special notice** is required, and the power applies **notwithstanding anything in the articles or any agreement**, so it cannot be contracted away.\n\nThe director's procedural rights qualify it: they may be **heard** at the meeting and have **written representations** circulated.\n\nThe practical constraint is the one candidates miss. Removal from **office** does not end a claim for breach of the **service contract**, so a removed director may have no office and a substantial damages claim for the unexpired term — which is why long service contracts are themselves regulated and need member approval beyond a statutory period.\n\n**Disqualification** is separate and follows a court order — on grounds including unfitness, wrongful or fraudulent trading, or persistent filing default — for up to fifteen years.",
    earns: [
      "Knowing the power overrides the articles and any agreement",
      "Separating removal from office from liability under the service contract",
    ],
    loses: ["Requiring a special resolution, or making removal depend on the articles"],
  },

  /* ── LWE-38 · Directors' powers and duties ──────────────────── */

  "LWE-38::powers": {
    title: "Whether a limit in the articles binds a third party",
    format: "ot",
    marks: 2,
    requirement:
      "Directors exceed a limit in the articles in contracting with a third party dealing in good faith. The company is:\n\nA  Not bound, and the third party must sue the directors\nB  Bound, because in favour of a person dealing in good faith the directors' power is deemed free of limitations under the constitution\nC  Bound only if the members ratify\nD  Not bound, because the third party is deemed to know the articles",
    plan: [
      {
        step: "Separate the internal from the external question",
        detail:
          "Internally the directors have breached the articles and are liable to the company. Externally the company is bound to the third party. Two questions, two answers.",
      },
      {
        step: "State the statutory protection",
        detail:
          "In favour of a person dealing with the company in good faith, the directors' power to bind is deemed free of any limitation under the constitution. Good faith is presumed unless the contrary is shown.",
      },
      {
        step: "Note that constructive notice is gone",
        detail:
          "Option D relies on the old doctrine of constructive notice of the articles, which has been abolished for this purpose. A person is not bound to enquire into limitations.",
      },
      {
        step: "Note that knowledge alone is not bad faith",
        detail:
          "Even knowing that an act exceeds the directors' powers does not by itself amount to bad faith — a point that must be stated precisely rather than approximated.",
      },
    ],
    answer:
      "**B — bound, because in favour of a person dealing in good faith the directors' power is deemed free of limitations under the constitution.**\n\nSeparate the two questions. **Internally**, the directors have breached the articles and are liable to the company for breach of duty. **Externally**, the company is bound to the third party.\n\nGood faith is **presumed** unless the contrary is shown, and a person is **not bound to enquire** into limitations — which is what disposes of option D. That option relies on the old doctrine of **constructive notice** of the articles, abolished for this purpose precisely because it made trading with companies impractical.\n\nEven **knowing** that an act exceeds the directors' powers does not by itself amount to bad faith, and that needs stating precisely rather than approximated.\n\nRatification is not required to bind the company, though the members may ratify to release the directors from liability.\n\nThe policy is that outsiders cannot be expected to police a company's internal arrangements.",
    earns: [
      "Splitting internal breach from external effect, and knowing good faith is presumed",
      "Knowing constructive notice of the articles has been abolished for this purpose",
    ],
    loses: ["Relying on constructive notice, which no longer defeats a third party"],
  },

  "LWE-38::duties": {
    title: "The seven general duties, and the standard of care",
    format: "ot",
    marks: 2,
    requirement:
      "The duty to exercise reasonable care, skill and diligence is judged by the standard of a reasonably diligent person with:\n\nA  No particular knowledge or experience\nB  The general knowledge and experience reasonably expected of a person in that role, AND the director's own actual knowledge and experience\nC  The director's own actual knowledge only\nD  The knowledge of a professional accountant in every case",
    plan: [
      {
        step: "Recognise the standard as dual",
        detail:
          "An OBJECTIVE limb — the general knowledge, skill and experience reasonably expected of someone in that role — and a SUBJECTIVE limb: the director's own actual knowledge, skill and experience.",
      },
      {
        step: "See how the two limbs interact",
        detail:
          "The objective limb is a floor nobody falls below, so inexperience is no defence. The subjective limb can only RAISE the standard, so a qualified accountant is held to more than a lay director.",
      },
      {
        step: "Reject the purely subjective option",
        detail:
          "Option C would let an incompetent director escape by being genuinely incompetent, which is exactly what the objective floor prevents.",
      },
      {
        step: "Recall the other six duties",
        detail:
          "Act within powers; promote the success of the company; exercise independent judgement; avoid conflicts of interest; not accept benefits from third parties; declare an interest in a proposed transaction.",
      },
    ],
    answer:
      "**B — the general knowledge and experience reasonably expected of a person in that role, AND the director's own actual knowledge and experience.**\n\nThe standard is **dual**, and how the limbs interact is the whole point. The **objective** limb is a **floor** nobody falls below, so inexperience is no defence — a director who did not understand the accounts is judged as someone in that role ought to have understood them. The **subjective** limb can only **raise** the standard, so a qualified accountant is held to more than a lay director on the same board.\n\nOption C is purely subjective and would let a genuinely incompetent director escape by being incompetent, which the objective floor exists to prevent.\n\nThe seven general duties are: **act within powers**; **promote the success of the company**; **exercise independent judgement**; **exercise reasonable care, skill and diligence**; **avoid conflicts of interest**; **not accept benefits from third parties**; and **declare an interest in a proposed transaction** — which must be declared **before** the company enters it.\n\nDuties are owed to the **company**, not to individual shareholders.",
    earns: [
      "Explaining the objective limb as a floor and the subjective limb as raising it",
      "Knowing an interest must be declared before the transaction is entered",
    ],
    loses: ["Making the standard purely subjective, which would excuse incompetence"],
  },

  /* ── LWE-39 · Secretary and auditor ─────────────────────────── */

  "LWE-39::secretary": {
    title: "The company secretary's role and authority",
    format: "ot",
    marks: 1,
    requirement:
      "A company secretary has apparent authority to bind the company by:\n\nA  Contracts of an administrative nature, such as engaging office staff\nB  Any contract whatever\nC  No contracts at all\nD  Only contracts approved by the members",
    plan: [
      {
        step: "Characterise the role",
        detail:
          "Administrative and compliance-focused: statutory registers, filings, minutes, and advising the board on governance and procedure. The authority follows the role.",
      },
      {
        step: "Match the authority to the function",
        detail:
          "Apparent authority extends to administrative contracts — engaging office staff, ordering supplies — because those are the kind of thing a secretary is understood to do.",
      },
      {
        step: "Reject the two extremes",
        detail:
          "Any contract whatever would give a secretary the board's powers. No contracts at all ignores the recognised apparent authority for administrative matters.",
      },
    ],
    answer:
      "**A — contracts of an administrative nature, such as engaging office staff.**\n\nThe secretary's role is administrative and compliance-focused — statutory registers, filings with the registrar, minutes of board and general meetings, and advising the board on governance and procedure — and the apparent authority follows the role.\n\nSo a third party may rely on a secretary to make administrative contracts of the kind a secretary is understood to make. It does not extend to trading or borrowing decisions, which belong to the board, so option B would hand the secretary the board's powers.\n\nOption C ignores the recognised authority altogether.\n\nA **public** company must have a secretary, who must be suitably qualified; a **private** company generally need not have one.",
    earns: ["Deriving the scope of the authority from the nature of the role"],
    loses: ["Denying any apparent authority, or extending it to trading decisions"],
  },

  "LWE-39::auditor": {
    title: "The auditor's rights on ceasing to hold office",
    format: "ot",
    marks: 2,
    requirement:
      "An auditor resigns during their term. They must:\n\nA  Do nothing further\nB  Deposit a statement of any circumstances that should be brought to the members' or creditors' attention, or state that there are none\nC  Complete the audit before leaving\nD  Obtain the members' consent to resign",
    plan: [
      {
        step: "Identify whose interest the obligation serves",
        detail:
          "The members' and creditors'. An auditor resigning because of a disagreement holds information those parties need, and the obligation exists so the resignation cannot pass unexplained.",
      },
      {
        step: "State the requirement",
        detail:
          "A statement of any circumstances that ought to be brought to their attention, or a statement that there are none. The 'or none' limb matters — silence is not an option either way.",
      },
      {
        step: "Reject the option that traps the auditor in office",
        detail:
          "An auditor may resign and need not complete the audit, and members' consent is not required. The safeguard is disclosure, not compulsion.",
      },
      {
        step: "Recall the removal rights alongside",
        detail:
          "An auditor removed before the end of their term may make representations and have them circulated, and may attend and speak at the meeting at which the term would have expired.",
      },
    ],
    answer:
      "**B — deposit a statement of any circumstances that should be brought to the members' or creditors' attention, or state that there are none.**\n\nThe obligation serves the **members and creditors**, not the auditor. An auditor resigning because of a disagreement holds exactly the information those parties need, so the requirement ensures a resignation cannot pass unexplained.\n\nThe **\"or none\"** limb matters: silence is not an option in either direction, so a bare resignation letter does not discharge the duty.\n\nAn auditor **may** resign and need not complete the audit, and members' consent is not required — the safeguard is **disclosure**, not compulsion, which is what options C and D get wrong.\n\nOn **removal** the parallel rights apply: the auditor may make representations and have them circulated, and may attend and speak at the meeting at which their term would have expired.\n\nWhile in office the auditor has a right of access to the company's books and records, to explanations from officers, and to attend and speak at general meetings on audit matters.",
    earns: [
      "Explaining the obligation as protection for members and creditors",
      "Knowing the \"or none\" limb, so silence never discharges the duty",
    ],
    loses: ["Assuming an auditor must finish the audit or obtain consent to resign"],
  },

  /* ── LWE-40 · Meetings and resolutions ──────────────────────── */

  "LWE-40::meetings": {
    title: "Who can require a general meeting",
    format: "ot",
    marks: 2,
    requirement:
      "Members holding at least what proportion of the paid-up voting share capital may require the directors to call a general meeting?\n\nA  5%\nB  10%\nC  50%\nD  75%",
    plan: [
      {
        step: "Recall the threshold and why it is low",
        detail:
          "5%. The board controls the calling of meetings, so without a low threshold a minority could never bring anything before the members. It is a minority protection.",
      },
      {
        step: "Note the mechanism's teeth",
        detail:
          "The directors must call the meeting within 21 days, to be held within 28 days of the notice. If they fail, the requisitioning members may call it themselves and recover their expenses.",
      },
      {
        step: "Keep the percentages separate",
        detail:
          "5% requisitions a meeting. Over 50% passes an ordinary resolution. 75% passes a special resolution. Confusing a requisition threshold with a voting majority is the trap in this family.",
      },
      {
        step: "Recall the notice periods",
        detail:
          "14 days for a private company, 21 days for a public company's annual general meeting. Shorter notice is possible with the required member consent.",
      },
    ],
    answer:
      "**A — 5%.**\n\nThe threshold is deliberately low because the **board** controls the calling of meetings — without it, a minority could never bring anything before the members at all.\n\nThe mechanism has teeth: the directors must call the meeting within **21 days**, to be held within **28 days** of the notice, and if they fail the requisitioning members may **call it themselves** and recover their expenses from the company.\n\nKeeping the percentages separate is what the question tests, because it is the trap across this whole family: **5%** requisitions a meeting, **over 50%** passes an ordinary resolution, **75%** passes a special resolution. A requisition threshold is not a voting majority.\n\nNotice periods are **14 days** for a private company and **21 days** for a public company's annual general meeting, with shorter notice possible on the required member consent. A public company must hold an AGM; a private company need not.",
    earns: [
      "Distinguishing a requisition threshold from a voting majority",
      "Knowing members may call the meeting themselves if the directors do not",
    ],
    loses: ["Answering with a resolution majority instead of the requisition threshold"],
  },

  "LWE-40::resolutions": {
    title: "Which majority a decision needs",
    format: "ot",
    marks: 2,
    requirement:
      "Which requires a special resolution?\n\nA  Removing a director\nB  Reducing the company's share capital\nC  Appointing an auditor\nD  Approving the directors' report",
    plan: [
      {
        step: "Fix the two majorities",
        detail:
          "ORDINARY: over 50% of votes cast. SPECIAL: at least 75%, reserved for constitutional and fundamental matters.",
      },
      {
        step: "Sort the options",
        detail:
          "Reducing capital is fundamental — it touches the creditors' fund — so special. Removing a director, appointing an auditor and approving the report are ordinary business.",
      },
      {
        step: "Note the deliberate distractor",
        detail:
          "Removing a director is the most counter-intuitive item, and it needs only an ORDINARY resolution. The threshold is low precisely so members can remove those managing the company.",
      },
      {
        step: "Recall the other special resolution matters, and written resolutions",
        detail:
          "Altering the articles, changing the name, disapplying pre-emption rights, voluntary winding up. A private company may use a written resolution, with the majority measured on TOTAL voting rights.",
      },
    ],
    answer:
      "**B — reducing the company's share capital.**\n\nAn **ordinary** resolution needs over 50% of votes cast; a **special** resolution needs at least **75%** and is reserved for constitutional and fundamental matters. Reducing capital qualifies because it touches the **creditors' fund**, which is why it also carries a solvency statement or court confirmation.\n\nOption A is the deliberate distractor and the most counter-intuitive item: **removing a director needs only an ordinary resolution**, and the threshold is low precisely so members can remove those managing their company. It also overrides anything in the articles.\n\nThe other special resolution matters are altering the **articles**, changing the **name**, **disapplying pre-emption rights**, and **voluntary winding up**.\n\nA private company may use a **written resolution** instead of a meeting, needing the same majorities but calculated on **total voting rights** rather than votes cast — a stricter test than it first appears, since abstentions count against.",
    earns: [
      "Knowing director removal is ordinary despite its gravity",
      "Knowing a written resolution's majority is measured on total voting rights",
    ],
    loses: ["Assuming a serious decision must need a special resolution"],
  },

  /* ── LWE-41 · Liquidation ───────────────────────────────────── */

  "LWE-41::types": {
    title: "The three routes into liquidation",
    format: "ot",
    marks: 2,
    requirement:
      "A members' voluntary liquidation requires:\n\nA  A court order\nB  A statutory declaration of solvency by the directors, that the company can pay its debts in full within a specified period not exceeding 12 months\nC  The consent of a majority of creditors\nD  That the company be insolvent",
    plan: [
      {
        step: "Name the three routes",
        detail:
          "Members' voluntary liquidation (solvent), creditors' voluntary liquidation (insolvent), and compulsory liquidation by court order. Solvency separates the first two.",
      },
      {
        step: "State the gateway to a members' liquidation",
        detail:
          "The declaration of solvency: the directors state the company can pay its debts in full, with interest, within a period not exceeding twelve months.",
      },
      {
        step: "Note who controls each",
        detail:
          "Members appoint the liquidator and control a members' voluntary liquidation, because they bear the outcome. Creditors control a creditors' voluntary liquidation, because the money is theirs.",
      },
      {
        step: "Note the two consequences of getting the declaration wrong",
        detail:
          "A director making it without reasonable grounds commits an offence, and if the company proves insolvent the process CONVERTS to a creditors' voluntary liquidation.",
      },
    ],
    answer:
      "**B — a statutory declaration of solvency by the directors, that the company can pay its debts in full within a specified period not exceeding 12 months.**\n\nThe three routes are **members' voluntary** liquidation (solvent), **creditors' voluntary** liquidation (insolvent), and **compulsory** liquidation by court order. **Solvency** is what separates the first two, and both voluntary routes begin with a members' resolution — so it is the **declaration**, not the resolution, that distinguishes them.\n\nControl follows the money: **members** appoint the liquidator and control a members' voluntary liquidation because they bear the outcome; **creditors** control a creditors' voluntary liquidation.\n\nTwo consequences if the declaration is wrong: a director who makes it **without reasonable grounds commits an offence**, and if the company proves insolvent the process **converts** into a creditors' voluntary liquidation.\n\nThe grounds for **compulsory** liquidation include inability to pay debts — usually shown by an unsatisfied statutory demand — and the just and equitable ground.",
    earns: [
      "Identifying the declaration rather than the resolution as what distinguishes the two voluntary routes",
      "Knowing the process converts if the company proves insolvent",
    ],
    loses: ["Assuming a members' voluntary liquidation is available to an insolvent company"],
  },

  "LWE-41::waterfall": {
    title: "The order in which a liquidator pays",
    format: "mtq",
    marks: 6,
    requirement:
      "A company in liquidation has: a bank with a fixed charge over its freehold; the liquidator's fees; four months of employees' unpaid wages; a bank with a floating charge over stock and book debts; unsecured trade creditors; and ordinary shareholders.\n\n(i) Set out the order of payment.\n(ii) Explain why the two banks rank differently.",
    plan: [
      {
        step: "Write the six ranks out before analysing the scenario",
        detail:
          "Fixed charge holders; liquidator's fees and expenses; preferential creditors; floating charge holders; unsecured creditors; shareholders. Part (i)'s marks are for the order alone.",
      },
      {
        step: "Note the two places candidates transpose",
        detail:
          "Preferential creditors come AFTER the liquidator's expenses but BEFORE floating charge holders — never ahead of a fixed charge. And floating charges rank below preferential creditors, which is what makes them weaker.",
      },
      {
        step: "Classify each claim before placing it",
        detail:
          "Employees' unpaid wages for a limited period are PREFERENTIAL, subject to a statutory cap on amount and period. Trade suppliers are unsecured. The two banks are both secured and rank differently.",
      },
      {
        step: "Answer (ii) with the mechanism, not the label",
        detail:
          "A fixed charge attaches to a specific asset, so that asset is outside the general estate. A floating charge covered assets the company was free to deal with until crystallisation. \"Because one is fixed\" is not an explanation.",
      },
    ],
    answer:
      "**(i) The order of payment**\n\n1. **The bank with the fixed charge** — out of the proceeds of the freehold\n2. **The liquidator's fees and expenses**\n3. **Employees' unpaid wages** — preferential creditors, subject to a statutory cap on the amount and the period\n4. **The bank with the floating charge**\n5. **Unsecured trade creditors**\n6. **Ordinary shareholders**, only if a surplus remains\n\n**(ii) Why the two banks rank differently**\n\nA **fixed charge** attaches to a **specific identified asset**, so the freehold is not part of the fund available to the general body of creditors at all. That bank is paid out of the proceeds of its own security, and only a surplus on that asset falls into the estate.\n\nA **floating charge** covered a **class** of assets — stock and book debts — which the company remained free to deal with in the ordinary course until **crystallisation**. Because the company could dispose of them right up to that moment, the security is inherently weaker, and it ranks behind both the liquidator's expenses and the preferential creditors.\n\nSo two banks, both secured, in materially different positions — which is exactly why a lender prefers a fixed charge and takes a floating one only over circulating assets it cannot fix on.",
    earns: [
      "Writing the six ranks out in order before analysing the facts",
      "Placing preferential creditors after the liquidator's expenses and before floating charges",
      "Explaining the fixed charge by the asset being outside the general estate",
      "Noting the statutory cap on preferential employee claims",
    ],
    loses: [
      "Placing preferential creditors ahead of the fixed charge holder",
      "Ranking the two banks equally because both hold security",
      "Answering (ii) with \"one is fixed and one is floating\", which restates rather than explains",
    ],
  },

  /* ── LWE-42 · Administration ────────────────────────────────── */

  "LWE-42::purpose-appointment": {
    title: "What administration is for, and what makes rescue possible",
    format: "ot",
    marks: 2,
    requirement:
      "The first objective of administration is to:\n\nA  Realise property to distribute to secured creditors\nB  Rescue the company as a going concern\nC  Wind the company up\nD  Prosecute the directors",
    plan: [
      {
        step: "State the objectives as a hierarchy",
        detail:
          "Rescue the company as a going concern; failing that, achieve a better result for creditors as a whole than on a winding up; failing that, realise property for secured or preferential creditors. In that order.",
      },
      {
        step: "Note that the order is binding",
        detail:
          "The administrator must pursue the first objective unless it is not reasonably practicable, and cannot simply choose the easiest. Option A is the THIRD objective offered as the first.",
      },
      {
        step: "Name the mechanism that makes rescue possible",
        detail:
          "The MORATORIUM: on appointment, creditors cannot enforce their claims or begin proceedings without consent or the court's permission. Breathing space is what administration supplies.",
      },
      {
        step: "Recall the three routes to appointment",
        detail:
          "By the court, by the holder of a qualifying floating charge, or by the company or its directors. The out-of-court routes make it quick, which matters when a company is failing.",
      },
    ],
    answer:
      "**B — rescue the company as a going concern.**\n\nThe objectives are **hierarchical** and the order binds: rescue the company as a going concern; failing that, achieve a **better result for creditors as a whole** than on a winding up; failing that, **realise property** to distribute to secured or preferential creditors. The administrator must pursue the first unless it is not reasonably practicable, and cannot simply pick the easiest — option A is the **third** objective offered as the first.\n\nWhat makes rescue possible is the **moratorium**: on appointment, creditors cannot enforce their claims or commence proceedings without consent or the permission of the court. Without it the first creditor to act would dismember the company before any rescue could be attempted.\n\nThe distinction from liquidation is the point: liquidation **ends** the company, administration tries to **save** it.\n\nAppointment is by the **court**, by the holder of a **qualifying floating charge**, or by the **company or its directors** — the out-of-court routes making it fast, which matters when a company is failing.",
    earns: [
      "Stating the objectives as a binding hierarchy, not a menu",
      "Naming the moratorium as the mechanism rescue depends on",
    ],
    loses: ["Offering the third objective as the first, or treating administration as liquidation"],
  },

  "LWE-42::effects-powers": {
    title: "What happens to the directors on appointment",
    format: "ot",
    marks: 2,
    requirement:
      "On the appointment of an administrator, the directors:\n\nA  Are automatically dismissed\nB  Remain in office but may not exercise management powers without the administrator's consent\nC  Continue to manage as before\nD  Become personally liable for the company's debts",
    plan: [
      {
        step: "Separate holding office from exercising power",
        detail:
          "The directors remain IN OFFICE — they are not dismissed — but their management powers are suspended. Office and power are different, and the question turns on the difference.",
      },
      {
        step: "State what the administrator acquires",
        detail:
          "Control of the company's affairs, business and property, with power to remove and appoint directors and to do anything necessary for managing the company.",
      },
      {
        step: "Explain why the directors are not simply dismissed",
        detail:
          "Their knowledge of the business is useful to a rescue, and they retain duties — to co-operate with the administrator and to provide a statement of affairs.",
      },
      {
        step: "Reject the personal liability option",
        detail:
          "Appointment does not itself make directors personally liable. That arises separately through wrongful or fraudulent trading, or breach of duty — not from the administration.",
      },
    ],
    answer:
      "**B — remain in office but may not exercise management powers without the administrator's consent.**\n\nHolding office and exercising power are different things. The directors are **not dismissed**, but their management powers are **suspended**: the administrator takes control of the company's affairs, business and property, with power to remove and appoint directors and to do whatever is necessary for managing the company.\n\nThey are not dismissed because their **knowledge** of the business is useful to a rescue, and because they retain duties — to **co-operate** with the administrator and to provide a **statement of affairs**.\n\nOption C would make administration pointless, since the whole procedure rests on control passing to an independent insolvency practitioner acting for the **creditors as a whole** rather than for the members who appointed the board.\n\nOption D is wrong: appointment does not itself impose personal liability, which arises separately through **wrongful** or **fraudulent trading** or breach of duty.\n\nThe administrator must propose how the objective will be achieved and put the proposals to the creditors.",
    earns: [
      "Separating remaining in office from retaining management powers",
      "Knowing personal liability arises from wrongful trading, not from the appointment",
    ],
    loses: ["Assuming appointment dismisses the board or makes it personally liable"],
  },

  /* ── LWE-43 · Insider dealing and market abuse ──────────────── */

  "LWE-43::insider-dealing": {
    title: "The elements and the three offences",
    format: "ot",
    marks: 2,
    requirement:
      "An insider passes inside information to a friend, who deals. The insider who passed it on:\n\nA  Commits no offence, having not dealt\nB  Commits the offence of disclosing inside information otherwise than in the proper performance of employment\nC  Commits an offence only if they profited\nD  Commits an offence only if the friend profited",
    plan: [
      {
        step: "Name the three offences",
        detail:
          "DEALING while in possession of inside information as an insider; ENCOURAGING another to deal; and DISCLOSING the information otherwise than in the proper performance of employment. Three separate offences.",
      },
      {
        step: "Match the facts to the right one",
        detail:
          "Passing information on is the disclosure offence. It is complete on the disclosure, so not having dealt is irrelevant — which is what option A gets wrong.",
      },
      {
        step: "Note that profit is not an element",
        detail:
          "Neither the insider's profit nor the friend's is required. The offence is complete regardless, which disposes of options C and D together.",
      },
      {
        step: "Recall the four elements of inside information",
        detail:
          "Specific or precise; not made public; relating to particular securities or issuers; and likely to have a significant effect on price if made public. All four are required.",
      },
    ],
    answer:
      "**B — commits the offence of disclosing inside information otherwise than in the proper performance of employment.**\n\nThere are **three separate offences**: **dealing** while in possession of inside information as an insider, **encouraging** another to deal, and **disclosing** the information otherwise than in the proper performance of employment.\n\nPassing information to a friend is the disclosure offence, and it is complete on the **disclosure** — so not having dealt is irrelevant. That is what option A misses, and it is the most common misconception about the regime.\n\n**Profit is not an element**, for either party, which disposes of options C and D together. The offence is complete whether anyone gained or lost.\n\n**Inside information** requires all four elements: **specific or precise**, **not made public**, **relating to particular securities or issuers**, and **likely to have a significant effect on price** if made public.\n\nDefences include showing the person did not expect a profit attributable to the information, or believed it had been widely disclosed.",
    earns: [
      "Knowing disclosure is a free-standing offence complete without dealing",
      "Knowing profit is not an element for any of the three offences",
    ],
    loses: ["Assuming an insider who does not trade commits no offence"],
  },

  "LWE-43::market-abuse": {
    title: "Why the civil regime exists alongside the criminal one",
    format: "ot",
    marks: 2,
    requirement:
      "Market abuse differs from the criminal offence of insider dealing principally in that market abuse:\n\nA  Requires proof of dishonesty\nB  Is a civil regime, proved on the balance of probabilities and requiring no criminal intent\nC  Carries a prison sentence\nD  Applies only to directors",
    plan: [
      {
        step: "Classify each regime",
        detail:
          "Insider dealing is CRIMINAL, requiring proof beyond reasonable doubt with the necessary mental element. Market abuse is CIVIL, enforced by the regulator on the balance of probabilities.",
      },
      {
        step: "Derive why the civil regime exists",
        detail:
          "The lower standard and the absence of any intent requirement make it markedly easier to establish. So conduct that could not be prosecuted can still be sanctioned.",
      },
      {
        step: "Reject the reversed option",
        detail:
          "Option A requires dishonesty for the civil regime. Dishonesty belongs to the criminal offence; the civil regime is behaviour-based, and importing intent inverts it.",
      },
      {
        step: "Note that market abuse is wider in scope",
        detail:
          "It covers insider dealing, unlawful disclosure and MARKET MANIPULATION — including creating a false or misleading impression as to supply, demand or price. Manipulation has no criminal counterpart in the same terms.",
      },
    ],
    answer:
      "**B — is a civil regime, proved on the balance of probabilities and requiring no criminal intent.**\n\nInsider dealing is **criminal** — proof beyond reasonable doubt with the required mental element. Market abuse is **civil**, enforced by the regulator on the **balance of probabilities**, and is **behaviour-based**.\n\nThat is why the civil regime exists alongside the criminal one: the lower standard and the absence of any intent requirement make it markedly easier to establish, so conduct that could not be prosecuted can still be met with **fines, public censure and restitution orders**.\n\nOption A reverses the position by importing dishonesty into the civil regime. Option C attributes a criminal penalty to it.\n\nMarket abuse is also **wider in scope**: it covers insider dealing, **unlawful disclosure** and **market manipulation** — including creating a false or misleading impression as to the supply of, demand for, or price of an investment. Manipulation has no criminal counterpart in the same terms, which is much of the regime's value.",
    earns: [
      "Deriving the practical difference from the criminal/civil classification",
      "Knowing market abuse reaches manipulation, which the criminal offence does not",
    ],
    loses: ["Requiring dishonesty for the civil regime"],
  },

  /* ── LWE-44 · Money laundering ──────────────────────────────── */

  "LWE-44::offences": {
    title: "The stages, the offences, and the threshold for reporting",
    format: "ot",
    marks: 2,
    requirement:
      "An accountant in practice suspects a client of laundering but takes no action because they cannot prove it. The accountant:\n\nA  Commits no offence, as suspicion is not proof\nB  May commit the offence of failure to disclose, since the threshold is suspicion rather than proof\nC  Commits the offence of money laundering itself\nD  Should tell the client first",
    plan: [
      {
        step: "Name the three offences",
        detail:
          "LAUNDERING: concealing, arranging, acquiring or using criminal property. FAILURE TO DISCLOSE: not reporting a knowledge or suspicion arising in the regulated sector. TIPPING OFF: alerting a suspect that a report has been made.",
      },
      {
        step: "Fix the threshold, because it is the whole question",
        detail:
          "SUSPICION, not proof. An accountant need not be sure of anything, and waiting for certainty is itself how the offence of failure to disclose is committed.",
      },
      {
        step: "Reject the option that would be tipping off",
        detail:
          "Telling the client is the third offence. Option D describes exactly what must not be done, which is why it is offered.",
      },
      {
        step: "Note where the report goes and the confidentiality position",
        detail:
          "To the firm's nominated officer or the authority. A protected disclosure made in good faith does not breach the duty of confidentiality, which resolves the apparent conflict.",
      },
    ],
    answer:
      "**B — may commit the offence of failure to disclose, since the threshold is suspicion rather than proof.**\n\nThe threshold is **suspicion**, not proof, and that is the whole question. An accountant need not be sure of anything — and waiting for certainty is precisely how the offence of failure to disclose is committed.\n\nOption D is the trap worth naming: telling the client is **tipping off**, the third offence. So the instinct to raise it with the client is itself criminal once a report has been made.\n\nThe three offences are **laundering** (concealing, arranging, acquiring or using criminal property), **failure to disclose** (in the regulated sector), and **tipping off**.\n\nThe report goes to the firm's **nominated officer** — the money laundering reporting officer — or directly to the authority. A **protected disclosure** made in good faith does **not** breach the duty of confidentiality, which resolves the conflict the accountant would otherwise face between reporting and client confidence.\n\nThe stages are **placement**, **layering** and **integration**.",
    earns: [
      "Knowing suspicion is the threshold and that delay for certainty is the offence",
      "Naming the confidentiality override for a protected disclosure",
    ],
    loses: ["Treating uncertainty as a reason not to report, or raising it with the client"],
  },

  "LWE-44::controls": {
    title: "What a firm's procedures must include",
    format: "ot",
    marks: 2,
    requirement:
      "A firm's anti-money laundering procedures must include:\n\nA  Refusing all overseas clients\nB  Customer due diligence, record keeping, a nominated officer, staff training, internal reporting procedures and a risk assessment\nC  Reporting every transaction over a fixed amount regardless of suspicion\nD  Publishing a list of clients",
    plan: [
      {
        step: "Recall the required elements as a set",
        detail:
          "Customer due diligence including identification, verification and identifying beneficial owners; record keeping; a nominated officer; staff training; internal reporting procedures; and a documented risk assessment.",
      },
      {
        step: "Characterise the obligation as risk-based",
        detail:
          "Not rule-based. Higher-risk relationships attract ENHANCED due diligence — politically exposed persons among them — rather than refusal.",
      },
      {
        step: "Reject the threshold-reporting option",
        detail:
          "Reporting is triggered by SUSPICION, not by a value threshold. A mechanical rule generates volume without judgement and misses the transactions that matter.",
      },
      {
        step: "Reject the publication option",
        detail:
          "The obligation is to KNOW who the client is and be able to demonstrate it. Client identity remains confidential, so publishing it would breach a separate duty.",
      },
    ],
    answer:
      "**B — customer due diligence, record keeping, a nominated officer, staff training, internal reporting procedures and a risk assessment.**\n\nCustomer due diligence covers identifying the client, **verifying** identity, and identifying **beneficial owners** — which is where ownership structures designed to obscure control are caught.\n\nThe obligation is **risk-based**, not rule-based. Higher-risk relationships — **politically exposed persons** among them — attract **enhanced** due diligence rather than refusal, so option A misreads the duty as exclusion.\n\nOption C substitutes a value threshold for judgement. Reporting is triggered by **suspicion**, and a mechanical rule would generate volume while missing what matters.\n\nOption D confuses knowing the client with publishing their identity — client information remains **confidential**, and the obligation is to know it and be able to demonstrate that you do.",
    earns: [
      "Describing the obligation as risk-based, with enhanced due diligence for higher risk",
      "Knowing due diligence extends to beneficial owners",
    ],
    loses: ["Substituting a fixed reporting threshold for the suspicion test"],
  },

  /* ── LWE-45 · Bribery and other corporate offences ──────────── */

  "LWE-45::bribery": {
    title: "The corporate offence and its only defence",
    format: "ot",
    marks: 2,
    requirement:
      "Under the Bribery Act 2010, a commercial organisation's defence to the offence of failing to prevent bribery by an associated person is that it had:\n\nA  No knowledge of the bribery\nB  Adequate procedures designed to prevent bribery by associated persons\nC  Dismissed the individual concerned\nD  Made no profit from the bribe",
    plan: [
      {
        step: "Identify the nature of the corporate offence",
        detail:
          "A FAILURE TO PREVENT offence. The organisation is liable for bribery by an associated person without needing to have known of it, which is what makes it demanding.",
      },
      {
        step: "State the only defence",
        detail:
          "Adequate procedures designed to prevent bribery by associated persons. Procedures, not ignorance, and they must exist before the event.",
      },
      {
        step: "Explain why ignorance cannot be a defence",
        detail:
          "The offence exists precisely to stop organisations insulating themselves through deliberate ignorance. Allowing option A would defeat the provision entirely.",
      },
      {
        step: "Note how wide \"associated person\" is",
        detail:
          "Employees, agents, subsidiaries and others performing services for the organisation. So liability extends across the supply chain, which is why third-party due diligence matters so much.",
      },
    ],
    answer:
      "**B — adequate procedures designed to prevent bribery by associated persons.**\n\nThe corporate offence is one of **failing to prevent**, so the organisation is liable for bribery by an associated person **without needing to have known of it**. That is what makes option A impossible as a defence: allowing lack of knowledge would let organisations insulate themselves through deliberate ignorance and defeat the provision.\n\nThe defence is **procedures**, and they must exist **before** the event: risk assessment, top-level commitment, due diligence on third parties, training, clear policies on gifts and hospitality, and monitoring.\n\n\"**Associated person**\" is deliberately wide — employees, agents, subsidiaries and others performing services for the organisation — so liability extends across the **supply chain**, which is why third-party due diligence carries so much weight.\n\nThe other offences are offering, promising or giving a bribe; requesting or accepting one; and bribing a **foreign public official**. There is no requirement that the bribe succeeded or that the organisation profited.",
    earns: [
      "Knowing procedures are the only defence and must pre-date the bribery",
      "Recognising how far \"associated person\" reaches",
    ],
    loses: ["Offering absence of knowledge as a defence to a failure-to-prevent offence"],
  },

  "LWE-45::tax-evasion-other": {
    title: "The pattern the failure-to-prevent offences share",
    format: "ot",
    marks: 2,
    requirement:
      "The corporate offence of failing to prevent the facilitation of tax evasion is modelled on the Bribery Act offence in that it:\n\nA  Requires the company's directors to have known of the facilitation\nB  Imposes liability without proof of knowledge, with a defence of reasonable prevention procedures\nC  Applies only to companies with more than 250 employees\nD  Is a civil rather than a criminal matter",
    plan: [
      {
        step: "Identify the shared structure",
        detail:
          "Strict corporate liability for the acts of associated persons, with a defence of having reasonable or adequate prevention procedures. That pattern recurs deliberately across the offences.",
      },
      {
        step: "Note why the pattern is used",
        detail:
          "Proving that senior management knew is very hard in a large organisation, so the old approach caught almost nobody. Shifting to procedures makes the corporate liability real.",
      },
      {
        step: "Reject the knowledge requirement",
        detail:
          "Option A restores the very element the offence was designed to remove, which is the error the question tests.",
      },
      {
        step: "Reject the size and civil options",
        detail:
          "There is no employee threshold, and these are criminal offences. Their practical effect is to force procedures on organisations of every size.",
      },
    ],
    answer:
      "**B — imposes liability without proof of knowledge, with a defence of reasonable prevention procedures.**\n\nThe shared structure is **strict corporate liability for the acts of associated persons, with a procedures defence** — and recognising the pattern is more useful than memorising each offence separately, because the same shape recurs.\n\nThe reason the pattern is used is practical: proving that **senior management knew** is extremely hard in a large organisation, so the old approach caught almost nobody. Shifting the question to whether **procedures** were in place makes corporate liability real, and it changes what an organisation must actually do — assess risk, train, and diligence its third parties.\n\nOption A restores the very element the offence was designed to remove.\n\nThere is no employee threshold, and these are **criminal** offences, so option C and D are both wrong. Their practical effect is to force prevention procedures on organisations of every size.\n\nAlongside them sit **fraudulent trading**, **wrongful trading** and **directors' disqualification**.",
    earns: [
      "Recognising the shared failure-to-prevent pattern rather than treating each offence separately",
      "Explaining why the pattern replaced a knowledge requirement",
    ],
    loses: ["Reinstating proof of knowledge, which the offence exists to dispense with"],
  },

  /* ── LWE-46 · Fraudulent and wrongful trading ───────────────── */

  "LWE-46::the-two": {
    title: "The one element that separates the two provisions",
    format: "ot",
    marks: 2,
    requirement:
      "Wrongful trading differs from fraudulent trading in that wrongful trading:\n\nA  Requires an intent to defraud creditors\nB  Requires no dishonesty — it is enough that the director knew or ought to have concluded there was no reasonable prospect of avoiding insolvent liquidation and failed to take every step to minimise creditor loss\nC  Is a criminal offence only\nD  Applies only to public companies",
    plan: [
      {
        step: "Fix the single distinguishing element",
        detail:
          "DISHONESTY. Fraudulent trading requires an intent to defraud; wrongful trading requires none. Everything else about the comparison is secondary.",
      },
      {
        step: "State the wrongful trading test in full",
        detail:
          "The director knew, or OUGHT TO HAVE CONCLUDED, that there was no reasonable prospect of avoiding insolvent liquidation, and thereafter failed to take every step to minimise the potential loss to creditors.",
      },
      {
        step: "Note that the second limb is objective",
        detail:
          "\"Ought to have concluded\" means honest optimism is no answer. A director who genuinely believed things would improve is still caught if a reasonable director would have concluded otherwise.",
      },
      {
        step: "Note the consequence and the safe course",
        detail:
          "The court may order a personal contribution to the company's assets. The safe course is to take advice early, document the reasoning, and act to minimise creditor loss rather than trading on in hope.",
      },
    ],
    answer:
      "**B — requires no dishonesty; it is enough that the director knew or ought to have concluded there was no reasonable prospect of avoiding insolvent liquidation and failed to take every step to minimise creditor loss.**\n\n**Dishonesty** is the single distinguishing element. **Fraudulent** trading requires an **intent to defraud** creditors and carries both civil and criminal liability. **Wrongful** trading requires none.\n\nThe test has two limbs, and the second is **objective**: \"**ought to have concluded**\" means honest optimism is no answer. A director who genuinely believed things would improve is still caught if a reasonable director would have concluded otherwise — which is what makes this the real exposure rather than a theoretical one.\n\nBecause dishonesty is hard to prove, **fraudulent trading is rare while wrongful trading is the live risk** for a director of a failing company. The court may order a **personal contribution** to the company's assets.\n\nThe safe course: take advice early, **document** the reasoning, and act to limit creditor loss rather than trading on in hope.",
    earns: [
      "Naming dishonesty as the single distinguishing element",
      "Knowing the second limb is objective, so honest optimism is no defence",
    ],
    loses: ["Importing dishonesty into wrongful trading, which is what makes it easy to establish"],
  },

  "LWE-46::pulling-together": {
    title: "Recognising which area of the paper a scenario belongs to",
    format: "ot",
    marks: 2,
    requirement:
      "A director of an insolvent company continued to trade for six months, paid herself a dividend when there were no distributable profits, and granted a charge to her own company that was never registered. Which is **not** a consequence?\n\nA  Personal liability for wrongful trading\nB  Liability to repay the unlawful dividend\nC  The charge being void against the liquidator\nD  The company's separate legal personality being retrospectively removed",
    plan: [
      {
        step: "Take each fact and route it to its own provision",
        detail:
          "Continuing to trade → wrongful trading. Dividend with no distributable profits → unlawful distribution. Unregistered charge → void against the liquidator. Three facts, three separate consequences.",
      },
      {
        step: "Check each option against the routed provisions",
        detail:
          "A, B and C each match a fact exactly. Only D describes something that does not happen — and the stem's polarity means that is the answer.",
      },
      {
        step: "State why separate personality is not removed",
        detail:
          "Even where directors are personally liable, the COMPANY remains a separate legal person. Liability is imposed on the director by statute; it does not undo the incorporation.",
      },
      {
        step: "Note that the consequences are cumulative",
        detail:
          "All three genuine consequences apply together, and none excludes the others. A scenario stacking facts is testing whether each is routed separately rather than answered as one issue.",
      },
    ],
    answer:
      "**D — the company's separate legal personality being retrospectively removed.**\n\nRoute each fact to its own provision. Continuing to trade with no reasonable prospect of avoiding insolvent liquidation → **wrongful trading**, and the court may order a personal contribution. Paying a dividend with no distributable profits → an **unlawful distribution**, repayable by a member who knew, with the directors who paid it personally liable. Granting a charge that was never registered → **void against the liquidator**, so the security is lost while the debt survives.\n\nAll three are genuine and **cumulative** — none excludes the others.\n\nWhat does **not** happen is the removal of separate legal personality. Even where directors are personally liable, the **company remains a separate legal person**: liability is imposed on the director **by statute**, and that is a different thing from undoing the incorporation or lifting the veil at common law.\n\nA scenario stacking facts like this is testing whether each is routed to its own provision rather than answered as a single issue — which is the skill the whole paper builds toward.",
    earns: [
      "Routing each fact to its own provision rather than treating the scenario as one issue",
      "Knowing statutory personal liability does not remove separate legal personality",
    ],
    loses: ["Treating personal liability as equivalent to the veil being lifted"],
  },
}
