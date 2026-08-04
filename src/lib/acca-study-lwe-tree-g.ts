import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area G — insolvency law.
 * Chapters 41–42 of the LW-ENG reading tree, mapped to syllabus group G1.
 *
 * ── Not the same area as Global's G ────────────────────────────
 * LW-Global's Area G is "companies in difficulty or in crisis", a broader and softer
 * treatment. ENG's Area G is INSOLVENCY LAW under the Insolvency Act 1986, examined on
 * the actual procedures and — above all — on the ORDER OF PAYMENT, which is a
 * computation a learner either can or cannot perform. That order is the single most
 * reliably examined thing in Area G, so it is set out as a numbered waterfall and then
 * worked through with figures.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth. Statutory wording is quoted AS a
 * quotation with the section named.
 */

/* ── Chapter 41 · G1(a), G1(b), G1(c) ──────────────────────────── */

export const LWE_TREE_41: StudyChapter = {
  id: "LWE-41",
  number: 41,
  paper: "LW",
  area: "G",
  title: "Liquidation, and the order in which debts are paid",
  minutes: 18,
  syllabusRefs: ["G1(a)", "G1(b)", "G1(c)"],
  intro:
    "Liquidation under the Insolvency Act 1986 is the end of the company's life, and the whole exercise comes down to one question: who gets paid, and in what order. Get the waterfall right and most of Area G answers itself.",
  outcomes: [
    "Distinguish members' from creditors' voluntary liquidation",
    "State the grounds for and the procedure in compulsory liquidation",
    "Apply the order in which company debts are paid",
    "Explain the prescribed part and the position of a floating charge holder",
    "Distribute a liquidation estate on given figures",
  ],
  sections: [
    {
      id: "types",
      heading: "The three routes into liquidation",
      blocks: [
        {
          kind: "table",
          caption: "Voluntary liquidation: the two kinds",
          head: ["", "Members' voluntary (MVL)", "Creditors' voluntary (CVL)"],
          rows: [
            ["**When used**", "The company is **SOLVENT** — it can pay its debts in full", "The company is **INSOLVENT**"],
            ["**The trigger**", "A **declaration of solvency** by the directors, that the company can pay its debts in full within a period not exceeding **12 months**", "**No** declaration of solvency is made, or the declaration cannot be given"],
            ["**Resolution**", "**Special resolution** of the members", "**Special resolution** of the members"],
            ["**Who appoints the liquidator**", "**The members**", "**The creditors**, whose choice prevails over the members'"],
            ["**Who controls it**", "The members", "**The creditors**"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The declaration of solvency is the dividing line — and making a false one is an offence",
          md: "What separates an MVL from a CVL is solvency, evidenced by the directors' **declaration**. Two consequences. If a liquidator in an MVL concludes the company **cannot** pay in full, the liquidation **converts into a CVL** and control passes to the **creditors**. And a director who makes a declaration of solvency **without reasonable grounds** commits a **criminal offence** — so the declaration is not a formality. A scenario in which directors declare solvency on optimistic figures is testing both points.",
        },
        {
          kind: "table",
          caption: "Compulsory liquidation",
          head: ["", "Detail"],
          rows: [
            ["**Who may petition**", "A **creditor** (the commonest), the **company** itself, the **directors**, a **contributory**, an **administrator** or administrative receiver, or the **Secretary of State**"],
            ["**The main ground**", "The company is **unable to pay its debts** — proved by an unsatisfied **statutory demand**, an unsatisfied **judgment**, or by showing that liabilities exceed assets"],
            ["**Other grounds**", "A **special resolution** that the company be wound up by the court; the company has **not commenced business within a year** of incorporation or has **suspended** business for a year; a **public company** has not been issued a trading certificate; or it is **just and equitable** to wind the company up"],
            ["**Procedure**", "Petition to the court, a **winding-up order**, and the **Official Receiver** becomes liquidator initially, with an insolvency practitioner usually appointed in their place"],
            ["**Effect of the order**", "The liquidator takes control, the directors' powers **cease**, employees are automatically **dismissed**, legal proceedings against the company are **stayed**, and any disposition of property after the petition is **void** unless the court orders otherwise"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The just and equitable ground",
          md: "It is the same idea as *Re Yenidje Tobacco* in partnership (chapter 29): where the relationship between those running a **quasi-partnership** company has broken down completely, or the company was formed for a fraudulent purpose, or a member is being excluded from management in a small company, the court may wind it up even though the company is **solvent**. It is a remedy of last resort, and a petitioner will usually be expected to consider whether an **unfair prejudice** claim would serve instead.",
        },
      ],
      check: {
        q: "Directors make a declaration of solvency and the company enters a members' voluntary liquidation. The liquidator finds it cannot pay in full. What happens?",
        options: [
          "The liquidation continues as an MVL with the members in control",
          "It converts into a creditors' voluntary liquidation and control passes to the creditors",
          "The court must make a compulsory winding-up order",
          "The liquidation is void and must be restarted",
        ],
        correct: 1,
        explain:
          "It CONVERTS into a CREDITORS' VOLUNTARY LIQUIDATION and control passes to the CREDITORS. The declaration of solvency is the dividing line between the two, and a director who made it WITHOUT REASONABLE GROUNDS commits a criminal offence.",
      },
    },
    {
      id: "waterfall",
      heading: "The order of payment",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "pyramid",
            title: "The liquidation waterfall",
            caption: "Each level is paid in full before the next receives anything.",
            data: {
              levels: [
                { label: "1 · Fixed charge holders", sub: "Out of the proceeds of their security" },
                { label: "2 · Liquidation expenses", sub: "Including the liquidator's remuneration" },
                { label: "3 · Preferential debts", sub: "Certain employee claims and some pension contributions" },
                { label: "4 · Prescribed part", sub: "Carved out of floating charge realisations for unsecured creditors" },
                { label: "5 · Floating charge holders", sub: "Out of the balance of their security" },
                { label: "6 · Unsecured creditors", sub: "Rateably, plus the prescribed part" },
                { label: "7 · Interest on debts", sub: "Post-liquidation interest" },
                { label: "8 · Members", sub: "Any surplus, per the articles and class rights" },
              ],
            },
          },
        },
        {
          kind: "list",
          style: "number",
          title: "The waterfall, stated precisely",
          items: [
            "**Fixed charge holders**, out of the proceeds of the assets charged. They stand **outside** the general estate to the extent of their security, which is why a fixed charge is worth having.",
            "**The expenses of the liquidation**, including the liquidator's remuneration.",
            "**Preferential debts** — principally **arrears of wages** for a limited period and up to a **capped amount per employee**, accrued **holiday pay**, and certain **occupational pension** contributions. They rank **equally** among themselves and **abate rateably** if there is not enough.",
            "**The prescribed part**, a slice carved out of **floating charge** realisations and set aside for the **unsecured** creditors.",
            "**Floating charge holders**, out of what remains of their security.",
            "**Unsecured (ordinary) creditors**, rateably — trade creditors, and the unsecured balance of any partly secured claim.",
            "**Interest** on debts accruing after the liquidation began.",
            "**Members**, taking any surplus in accordance with the articles and class rights — preference capital first where the terms so provide (chapter 34).",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Where the floating charge holder actually sits",
          md: "This is the point that separates a right answer from a wrong one. A floating charge holder is **not** paid immediately after the fixed charge holder. It ranks **behind** the liquidation **expenses**, behind the **preferential** debts, and behind the **prescribed part** that is carved out of its own security for the unsecured creditors. So the same £500,000 of floating charge realisations may yield very little once those three have taken their share — and that is precisely why lenders take fixed charges over anything identifiable (chapter 35).",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Two provisions that pull assets back in",
          md: "Before distributing, a liquidator can **increase** the estate. **Transactions at an undervalue** and **preferences** given within the relevant period before the onset of insolvency may be **set aside** by the court, so a payment made to a favoured creditor — or to a director — can be recovered. And **wrongful** or **fraudulent trading** contributions from directors swell the estate too (chapter 46). So the answer to \"the company has no assets\" is not always that the creditors get nothing.",
        },
        {
          kind: "example",
          title: "Distributing an estate",
          scenario:
            "Ravensden Ltd is in insolvent liquidation. Its realisations are: £300,000 from its factory, which is subject to a fixed charge to Bank P securing £340,000; and £500,000 from inventory and receivables, subject to a floating charge to Bank Q securing £450,000. Liquidation expenses are £60,000. Preferential debts — wage arrears within the cap and holiday pay — total £90,000. Unsecured trade creditors are owed £700,000. Assume the prescribed part applicable to the floating charge realisations is £48,000. Two months before liquidation the company repaid £70,000 to a director's personal loan, ahead of all trade creditors.",
          steps: [
            { label: "Consider clawback first", detail: "Repaying a DIRECTOR'S loan two months before liquidation, ahead of trade creditors, looks like a PREFERENCE, and the liquidator may apply to have it SET ASIDE. If recovered, the £70,000 goes into the ESTATE — so start by noting the estate may be larger than the realisations suggest." },
            { label: "Pay Bank P from its fixed charge", detail: "Bank P takes the FULL £300,000 factory proceeds, standing outside the general estate. Its debt was £340,000, so it has a £40,000 SHORTFALL, which becomes an UNSECURED claim ranking with the trade creditors." },
            { label: "Pay expenses and preferential debts", detail: "These come out of the floating charge realisations of £500,000, ahead of Bank Q. Expenses £60,000 and preferential debts £90,000 = £150,000, leaving £350,000." },
            { label: "Set aside the prescribed part", detail: "The £48,000 prescribed part is carved out of the floating charge realisations for the UNSECURED creditors, leaving £302,000 for Bank Q." },
            { label: "Pay Bank Q", detail: "Bank Q receives £302,000 against a secured debt of £450,000 — a £148,000 SHORTFALL, which also becomes an UNSECURED claim." },
            { label: "Distribute to the unsecured creditors", detail: "The pool is the £48,000 prescribed part, plus the £70,000 preference if recovered = £118,000. The claims are trade creditors £700,000 PLUS Bank P's £40,000 shortfall PLUS Bank Q's £148,000 shortfall = £888,000. So the dividend is roughly 13p in the pound, and nothing reaches interest or members." },
          ],
          result:
            "Bank P recovers **£300,000** and Bank Q **£302,000**, while the unsecured creditors share about **13p in the pound** — and both banks join them for their shortfalls. Two features drive the answer: the floating charge is **hollowed out** by expenses, preferential debts and the prescribed part, and the **preference clawback** is the only thing materially improving the unsecured position.",
        },
      ],
      check: {
        q: "Where does a floating charge holder rank in the order of payment?",
        options: [
          "Immediately after the fixed charge holder",
          "After liquidation expenses, preferential debts and the prescribed part",
          "Equally with the unsecured creditors",
          "Ahead of liquidation expenses but behind preferential debts",
        ],
        correct: 1,
        explain:
          "AFTER the liquidation EXPENSES, the PREFERENTIAL debts and the PRESCRIBED PART — the last being carved out of its own security for the unsecured creditors. That subordination is why lenders take fixed charges over anything identifiable, and it is the commonest error in an Area G computation.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Paying the floating charge holder straight after the fixed charge holder.",
      fix: "Expenses, preferential debts and the prescribed part all come first.",
    },
    {
      trap: "Forgetting that a secured creditor's shortfall becomes an unsecured claim.",
      fix: "It ranks with the trade creditors and dilutes their dividend.",
    },
    {
      trap: "Treating an MVL as available where the company cannot pay in full.",
      fix: "It requires a declaration of solvency; without one it is a CVL, and an MVL converts if the liquidator finds insolvency.",
    },
    {
      trap: "Concluding creditors get nothing because there are no assets.",
      fix: "Check for preferences, transactions at an undervalue, and wrongful trading contributions.",
    },
  ],
  keyTerms: [
    { term: "Members' voluntary liquidation", def: "A solvent winding up on a special resolution, supported by a declaration of solvency, with the members appointing the liquidator." },
    { term: "Creditors' voluntary liquidation", def: "An insolvent winding up on a special resolution, with the creditors' choice of liquidator prevailing." },
    { term: "Declaration of solvency", def: "The directors' statement that the company can pay its debts in full within not more than 12 months; making it without reasonable grounds is an offence." },
    { term: "Preferential debts", def: "Capped arrears of wages, holiday pay and certain pension contributions, ranking equally and abating rateably." },
    { term: "Prescribed part", def: "A slice of floating charge realisations set aside for unsecured creditors." },
    { term: "Preference", def: "A transaction putting a creditor in a better position before insolvency, which the court may set aside." },
    { term: "Just and equitable winding up", def: "A ground for compulsory liquidation even of a solvent company, used where a quasi-partnership has broken down." },
  ],
  summary: [
    "An MVL is solvent and members-controlled; a CVL is insolvent and creditor-controlled, the declaration of solvency being the dividing line.",
    "Compulsory liquidation is usually petitioned by a creditor on the ground of inability to pay debts.",
    "The waterfall runs fixed charges, expenses, preferential debts, prescribed part, floating charges, unsecured creditors, interest, members.",
    "A floating charge holder ranks behind expenses, preferential debts and the prescribed part carved out of its own security.",
    "A secured creditor's shortfall ranks as unsecured, and clawback of preferences and undervalues can enlarge the estate.",
  ],
  knowledgeDiagnostic: [
    { q: "State the order of payment on liquidation.", a: "Fixed charge holders, liquidation expenses, preferential debts, the prescribed part, floating charge holders, unsecured creditors, post-liquidation interest, then members." },
    { q: "What distinguishes an MVL from a CVL?", a: "Solvency, evidenced by the directors' declaration that the company can pay its debts in full within 12 months; in a CVL the creditors control and appoint the liquidator." },
    { q: "What happens to a secured creditor's shortfall?", a: "It ranks as an unsecured claim alongside the trade creditors." },
    { q: "Name two ways a liquidator can enlarge the estate.", a: "Setting aside preferences and transactions at an undervalue, and recovering contributions for wrongful or fraudulent trading." },
  ],
}

/* ── Chapter 42 · G1(d), G1(e) ─────────────────────────────────── */

export const LWE_TREE_42: StudyChapter = {
  id: "LWE-42",
  number: 42,
  paper: "LW",
  area: "G",
  title: "Administration as an alternative to winding up",
  minutes: 16,
  syllabusRefs: ["G1(d)", "G1(e)"],
  intro:
    "Liquidation kills the company; administration tries to save it, or at least to get more for the creditors than a liquidation would. The moratorium is what makes that possible.",
  outcomes: [
    "Explain the purpose of administration and its statutory hierarchy of objectives",
    "Explain how an administrator may be appointed, by each route",
    "Explain the effects of the appointment, especially the moratorium",
    "State the administrator's powers and duties",
    "Advise whether administration or liquidation is appropriate",
  ],
  sections: [
    {
      id: "purpose-appointment",
      heading: "The purpose, and getting an administrator appointed",
      blocks: [
        {
          kind: "definition",
          term: "Administration",
          md: "A procedure under which an **administrator**, who must be a qualified insolvency practitioner and is an **officer of the court**, takes control of a company in financial difficulty in order to pursue the statutory objectives. Its distinguishing feature is a **moratorium** that holds creditors off while a plan is worked out.",
        },
        {
          kind: "list",
          style: "number",
          title: "The hierarchy of objectives — they must be taken in order",
          items: [
            "**Rescuing the company as a going concern.** The primary objective, and the administrator must pursue it unless it is not reasonably practicable, or the second objective would produce a better result for the creditors as a whole.",
            "**Achieving a better result for the creditors as a whole** than would be likely on a winding up — pursued only if the first is not reasonably practicable.",
            "**Realising property to make a distribution to secured or preferential creditors** — permitted only if neither of the first two is reasonably practicable, and provided the administrator does not unnecessarily harm the interests of the creditors as a whole.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The hierarchy is not a menu",
          md: "An administrator may not simply choose the objective that suits the appointing creditor. The first objective must be pursued **unless** it is not reasonably practicable **or** the second would be better **for the creditors as a whole**; and the third is available only when the first two are not. That structure protects unsecured creditors from an administration run purely for the benefit of the bank that appointed the administrator — which is why the third objective carries the express qualification about not unnecessarily harming the general body of creditors.",
        },
        {
          kind: "table",
          caption: "The three routes to appointment",
          head: ["Route", "How it works"],
          rows: [
            ["**By the court**", "On an **administration application** by the company, its directors, or a **creditor**. The court must be satisfied the company \"is or is likely to become unable to pay its debts\" and that administration is likely to achieve its purpose"],
            ["**By the holder of a qualifying floating charge**", "**Out of court**, by filing the prescribed documents. The charge holder must give notice to any prior qualifying charge holder"],
            ["**By the company or its directors**", "**Out of court**, by filing the prescribed documents — but they must give **five business days' notice** to any qualifying floating charge holder, who may then appoint its own choice of administrator instead"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Why the out-of-court routes matter commercially",
          md: "The court route is slower and costlier, and a company in difficulty is usually short of both time and money. The **out-of-court** routes let a qualifying floating charge holder, or the directors, put a company into administration quickly — which is why most administrations begin that way. Note the asymmetry: when the **directors** appoint, they must give the **qualifying floating charge holder five business days' notice**, and that holder can substitute its **own** administrator. So the directors do not get to choose freely if there is a secured lender in the picture.",
        },
      ],
      check: {
        q: "The directors wish to appoint an administrator out of court, and the company has granted a qualifying floating charge. What must they do?",
        options: [
          "Nothing beyond filing the prescribed documents",
          "Give the qualifying floating charge holder five business days' notice, and that holder may appoint its own choice instead",
          "Obtain the charge holder's written consent, without which they cannot appoint",
          "Apply to the court, the out-of-court route being unavailable to directors",
        ],
        correct: 1,
        explain:
          "Give the qualifying floating charge holder FIVE BUSINESS DAYS' NOTICE, whereupon that holder may appoint ITS OWN choice of administrator instead. Consent is not required and the out-of-court route IS open to directors — but the secured lender effectively controls who gets appointed.",
      },
    },
    {
      id: "effects-powers",
      heading: "The effects of appointment, and the administrator's role",
      blocks: [
        {
          kind: "list",
          title: "What happens on appointment — the moratorium and more",
          items: [
            "**A moratorium**: no **winding-up petition** may proceed, no **security may be enforced**, no goods repossessed under hire purchase or retention of title, and **no legal proceedings** begun or continued — all without the **administrator's consent or the court's permission**. This is the heart of administration.",
            "**The directors remain in office but their powers are effectively suspended** — they may not exercise a management power without the administrator's consent.",
            "**The administrator takes control** of the company's property and management.",
            "**Any administrative receiver** must vacate office, and no new one may be appointed.",
            "**Company documents** must state that the company is in administration and name the administrator.",
            "**Employees are not automatically dismissed**, unlike on a compulsory winding-up order — which is part of what makes rescue possible.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The moratorium is the whole point",
          md: "Without it, the first secured creditor to move would seize its security, a supplier would repossess its stock under a retention of title clause, and the business would be dismembered before any rescue could be attempted — destroying value for everyone. The moratorium **freezes** enforcement so the administrator can trade the business, market it, or negotiate. That is why the comparison with **liquidation** is so stark: a winding-up order **dismisses the employees** and ends the business, while administration **preserves** it while the options are tested.",
        },
        {
          kind: "table",
          caption: "The administrator's powers and duties",
          head: ["Powers", "Duties"],
          rows: [
            ["Do **anything necessary or expedient** for the management of the company's affairs, business and property", "Act in the interests of the **creditors as a whole**, being an **officer of the court**"],
            ["**Remove and appoint directors**", "Take **custody and control** of the company's property"],
            ["**Carry on the business**, and sell property — including, with permission, property subject to a **fixed charge**", "**Produce proposals** for achieving the purpose of the administration and send them to creditors and the registrar within the prescribed period"],
            ["**Call meetings** of members or creditors", "**Seek a decision** from the creditors on the proposals, and act in accordance with any revised proposals approved"],
            ["**Apply to the court** for directions", "**Manage** in accordance with the proposals once approved"],
            ["**Make distributions** to secured and preferential creditors, and to unsecured creditors with the court's permission", "**Report** on the conduct of the directors, which may lead to disqualification (chapter 37)"],
          ],
        },
        {
          kind: "list",
          title: "How an administration ends",
          items: [
            "**Automatically after one year**, unless extended — by the court, or with creditors' consent for a limited further period.",
            "**On the administrator's application** to the court, or by filing a notice that the purpose has been achieved.",
            "By moving into a **creditors' voluntary liquidation**, where a distribution to unsecured creditors is to be made.",
            "By **dissolution**, where there is nothing to distribute.",
            "**On a creditor's application** alleging an improper motive, or on the court's own initiative.",
          ],
        },
        {
          kind: "example",
          title: "Choosing between administration and liquidation",
          scenario:
            "Beckwell Ltd designs and installs commercial kitchens. It has £1.4m of debt, an order book worth £2.2m, 40 skilled employees, and a cash crisis after a customer failed. Bank R holds a qualifying floating charge for £600,000 and wants its money. A trade supplier has presented a winding-up petition and another has served notice to repossess £180,000 of stock under a retention of title clause. The directors believe that with three months' breathing space the order book could be delivered and the business sold as a going concern for more than break-up value.",
          steps: [
            { label: "Test the first objective", detail: "RESCUING THE COMPANY as a going concern is the primary objective. With a £2.2m order book and 40 skilled staff, that is at least arguable — and the administrator must pursue it unless it is not reasonably practicable." },
            { label: "Test the second objective", detail: "If rescue of the COMPANY is not practicable, a sale of the BUSINESS as a going concern would very likely achieve a BETTER RESULT FOR THE CREDITORS AS A WHOLE than a break-up on winding up. Either way administration is justified on the hierarchy." },
            { label: "Identify what the moratorium achieves here", detail: "It stops the WINDING-UP PETITION proceeding, prevents Bank R ENFORCING its security, and prevents the supplier REPOSSESSING the £180,000 of stock under retention of title. Without that stock the order book cannot be delivered, so the moratorium is what makes the plan possible at all." },
            { label: "Compare a liquidation", detail: "A winding-up order would DISMISS the 40 employees automatically, ending the ability to deliver the order book, and the assets would fetch BREAK-UP value. The order book — the company's most valuable asset — would be worth almost nothing." },
            { label: "Advise on the route to appointment", detail: "Speed matters with a petition pending. The directors may appoint OUT OF COURT, but must give Bank R FIVE BUSINESS DAYS' NOTICE, and Bank R may substitute its own administrator. Bank R could also appoint out of court itself as qualifying floating charge holder. The court route is available but slower." },
            { label: "Note the limit on Bank R's influence", detail: "Bank R cannot insist the administration be run solely to repay it. The THIRD objective — realising property for secured and preferential creditors — is available only if the first two are not reasonably practicable, and even then the administrator must not unnecessarily harm the creditors as a whole." },
          ],
          result:
            "**Administration**, and quickly. The **moratorium** is the operative advantage — it halts the petition, the enforcement and the repossession together — and Bank R's floating charge gives it influence over **who** is appointed but not over **which objective** is pursued.",
        },
      ],
      check: {
        q: "What is the primary practical advantage of administration over liquidation for a business with a valuable order book?",
        options: [
          "The directors keep full control of the company",
          "The moratorium halts enforcement, petitions and repossessions, and employees are not automatically dismissed, so the business can keep trading",
          "Creditors lose their security permanently",
          "The company's debts are written off",
        ],
        correct: 1,
        explain:
          "The MORATORIUM, together with the fact that employees are NOT automatically dismissed. Enforcement, winding-up petitions and repossessions are all frozen without the administrator's consent or the court's permission, so the business can continue and the order book retains its value. Security is not lost, debts are not written off, and the directors' powers are effectively suspended.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Letting the administrator pick whichever objective suits the appointor.",
      fix: "The hierarchy is mandatory: rescue first, better result for creditors as a whole second, realisation for secured and preferential creditors last.",
    },
    {
      trap: "Saying the directors are removed on appointment.",
      fix: "They remain in office but cannot exercise management powers without the administrator's consent.",
    },
    {
      trap: "Assuming employees are dismissed as they are on a winding-up order.",
      fix: "They are not, which is part of what makes rescue possible.",
    },
    {
      trap: "Treating the out-of-court route as free of the secured lender.",
      fix: "Directors must give a qualifying floating charge holder five business days' notice, and it may appoint its own administrator.",
    },
  ],
  keyTerms: [
    { term: "Administration", def: "A procedure in which an administrator, an officer of the court, manages a company in difficulty under a moratorium." },
    { term: "Moratorium", def: "The freeze on enforcement, petitions, repossessions and proceedings during administration." },
    { term: "Qualifying floating charge holder", def: "A charge holder entitled to appoint an administrator out of court and to be notified of a directors' appointment." },
    { term: "Administration application", def: "The court route, requiring that the company is or is likely to become unable to pay its debts." },
    { term: "Hierarchy of objectives", def: "Rescue the company, then a better result for creditors as a whole, then realisation for secured and preferential creditors." },
  ],
  summary: [
    "Administration seeks to rescue the company, or failing that to do better for creditors than a winding up would.",
    "The three objectives form a mandatory hierarchy, not a choice.",
    "An administrator is appointed by the court, by a qualifying floating charge holder, or by the company or directors out of court.",
    "The moratorium freezes enforcement, petitions and repossessions, and employees are not automatically dismissed.",
    "Administration ends automatically after a year unless extended, and may lead into a CVL or dissolution.",
  ],
  knowledgeDiagnostic: [
    { q: "State the three statutory objectives in order.", a: "Rescue the company as a going concern; achieve a better result for the creditors as a whole than on a winding up; realise property for secured or preferential creditors without unnecessarily harming creditors as a whole." },
    { q: "What does the moratorium prevent?", a: "Winding-up petitions proceeding, security being enforced, repossession under hire purchase or retention of title, and legal proceedings, without the administrator's consent or the court's permission." },
    { q: "What must directors do before appointing out of court?", a: "Give five business days' notice to any qualifying floating charge holder, who may appoint its own administrator instead." },
    { q: "How long does an administration last?", a: "One year, ending automatically unless extended by the court or with creditors' consent for a limited period." },
  ],
}

export const LWE_TREE_AREA_G: StudyChapter[] = [LWE_TREE_41, LWE_TREE_42]
