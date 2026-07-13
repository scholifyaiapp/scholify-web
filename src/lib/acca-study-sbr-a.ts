import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBR · Area A — The conceptual & regulatory framework.
 * Strategic level: the Conceptual Framework is not recited but USED — as the
 * argument you fall back on when no standard fits, and the yardstick you judge
 * an entity's aggressive accounting against. Original, syllabus-aligned.
 */

export const SBR_A: StudyChapter = {
  paper: "SBR",
  area: "A",
  title: "The conceptual & regulatory framework",
  minutes: 16,
  intro: "At FR you learned the standards. At SBR you are asked the harder question: are the standards themselves coherent, and what do you do when a transaction slips between them? The Conceptual Framework is the answer — and the ethical backbone of the whole discipline.",
  outcomes: [
    "Evaluate the objective of financial reporting and the tension between stewardship and decision-usefulness",
    "Apply the qualitative characteristics as a hierarchy, and reason about the trade-offs between them",
    "Use the 2018 definitions of the elements to argue whether an item should be recognised or derecognised",
    "Critically compare historical cost and current value measurement, including the IFRS 13 fair value hierarchy",
    "Explain how the regulatory framework is set, and appraise its limits",
    "Identify threats to objectivity in aggressive or creative accounting and respond as an ethical professional",
  ],
  sections: [
    {
      id: "objective",
      heading: "The objective — and why it is contested",
      blocks: [
        { kind: "text", md: "The **IASB Conceptual Framework** (2018) opens by declaring a single objective: to provide financial information about the reporting entity that is **useful to existing and potential investors, lenders and other creditors** in making decisions about providing resources to the entity. Everything downstream — the characteristics, the elements, the measurement bases — is engineered to serve that one goal. At SBR you are expected not merely to recite it but to **weigh** it." },
        { kind: "text", md: "The objective embeds a long-running tension. **Decision-usefulness** looks forward: investors want information that helps them predict future cash flows, which pulls towards **current values**. **Stewardship** looks back: it holds management accountable for the resources entrusted to them, which pulls towards **verifiable, transaction-based** numbers. The 2018 revision deliberately re-elevated stewardship — assessing how efficiently and effectively management has discharged its responsibilities — after critics argued the 2010 version had let it fade. A strong SBR answer recognises that a single set of statements is being asked to do two jobs that sometimes point in opposite directions." },
        { kind: "callout", tone: "key", title: "Why the Framework matters at Strategic level", md: "The Framework is **not a standard** and never overrides one. Its real power is as the **reasoning of last resort**: when no IFRS specifically applies, IAS 8 sends you to the Framework's definitions and characteristics to develop a policy. It is also the lens through which you **critique** an entity that has followed the letter of a standard while defeating its purpose." },
      ],
    },
    {
      id: "qualitative",
      heading: "The qualitative characteristics as a hierarchy",
      blocks: [
        { kind: "text", md: "Information is only useful if it has the right qualities, and the Framework ranks them. The **fundamental** characteristics are **relevance** and **faithful representation** — information must have both to be useful at all. The **enhancing** characteristics — **comparability, verifiability, timeliness and understandability** — improve useful information but cannot rescue information that fails a fundamental test. Above all sits the **cost constraint**: the benefit of reporting must justify the cost." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "The qualitative characteristics",
          caption: "Fundamental characteristics must both be met; enhancing ones then refine — never replace — them.",
          data: {
            levels: [
              { label: "Cost constraint", sub: "Benefit of the information must justify the cost of providing it" },
              { label: "Fundamental: Relevance", sub: "Predictive value, confirmatory value — filtered by materiality" },
              { label: "Fundamental: Faithful representation", sub: "Complete, neutral (prudence), free from error" },
              { label: "Enhancing: Comparability & Verifiability", sub: "Like-with-like across entities and time; independent corroboration" },
              { label: "Enhancing: Timeliness & Understandability", sub: "Available in time to decide; clear to an informed user" },
            ],
          },
        } },
        { kind: "text", md: "Two subtleties are heavily examined. First, **neutrality is supported by prudence** — the 2018 Framework restored prudence, but defined it as the exercise of **caution under uncertainty**, explicitly *not* the deliberate understatement of assets or overstatement of liabilities. Asymmetric conservatism is not required. Second, **substance over form** is now folded into faithful representation: a representation that reflects only the legal form of a transaction, not its economic substance, is not a faithful one — this is the hook for evaluating off-balance-sheet financing." },
        { kind: "callout", tone: "warn", title: "The trade-offs are the marks", md: "Enhancing characteristics routinely conflict. **Timeliness** fights **verifiability** (reporting fast means reporting before every figure is corroborated). A change that improves relevance can destroy **comparability**. SBR rewards candidates who name the specific trade-off in the scenario rather than listing all six characteristics generically." },
      ],
      check: {
        q: "An entity adopts a new, more relevant measurement policy that makes this year's statements NOT comparable with last year's. How should the Framework guide the resolution?",
        options: [
          "Comparability is enhancing, so it must never be sacrificed for relevance",
          "Relevance is fundamental; comparability is enhancing, so relevance takes priority — but the effect must be disclosed to preserve comparability as far as possible",
          "The entity must keep the old policy because consistency always wins",
          "Both are fundamental, so the entity cannot make the change",
        ],
        correct: 1,
        explain: "Relevance and faithful representation are FUNDAMENTAL; comparability is only ENHANCING. Enhancing characteristics cannot make useful information out of irrelevant information, and cannot block a change that improves a fundamental quality. The right answer is to make the change AND disclose its effect (restating comparatives where practicable) so comparability is preserved as far as possible. Option 1 and 3 wrongly elevate comparability; option 4 misclassifies it as fundamental.",
      },
    },
    {
      id: "elements",
      heading: "The elements and the 2018 definitions",
      blocks: [
        { kind: "text", md: "The 2018 Framework rewrote the definitions of the elements, and the changes are precisely what SBR tests. An **asset** is now *a present economic resource controlled by the entity as a result of past events*, where an **economic resource** is *a right that has the potential to produce economic benefits*. A **liability** is *a present obligation to transfer an economic resource as a result of past events*." },
        { kind: "callout", tone: "rule", title: "What changed — and why it matters", md: "The old definitions required an inflow/outflow of benefits that was **'expected'** or **'probable'**. The 2018 definitions strip the probability threshold out of the *definition* and relocate it to the *recognition* decision. An asset now exists if the right has the **potential** to produce benefits **even if that potential is low** — the likelihood is dealt with later, at recognition and measurement. This decouples *existence* from *probability*, which changes how you argue borderline cases such as options, guarantees and contingent rights." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The five elements",
          data: {
            items: [
              { title: "Asset", sub: "A present economic resource (a right with potential to produce benefits) controlled by the entity from a past event" },
              { title: "Liability", sub: "A present obligation to transfer an economic resource as a result of a past event" },
              { title: "Equity", sub: "The residual interest in the assets after deducting all liabilities" },
              { title: "Income", sub: "Increases in assets, or decreases in liabilities, that increase equity (other than owner contributions)" },
              { title: "Expenses", sub: "Decreases in assets, or increases in liabilities, that decrease equity (other than owner distributions)" },
            ],
          },
        } },
        { kind: "text", md: "**Recognition** is a separate hurdle. An item that meets a definition is recognised only if doing so provides users with **relevant information** and a **faithful representation** — subject to the cost constraint. Crucially, recognition is no longer governed by a rigid 'probable + reliably measurable' test; instead, the Framework accepts that where an inflow is highly uncertain or measurement requires an exceptionally wide range of estimates, **non-recognition with disclosure** may give a more faithful picture. **Derecognition** aims to faithfully represent both the assets and liabilities **retained** after the transaction and the **change** — the core problem in questions on factoring receivables and repo transactions, where control, not merely legal transfer, drives the answer." },
        { kind: "example", title: "Applying the definitions — a disputed receivable", scenario: "An entity is suing a customer for $2m of disputed fees. Its lawyers say a win is possible but not probable. Under the 2018 Framework, is there an asset, and should it be recognised?", steps: [
          { label: "Does an asset exist?", detail: "A legal claim is a right. Under the 2018 definition the right only needs the POTENTIAL to produce benefits — probability is not part of the definition — so an economic resource (asset) exists." },
          { label: "Should it be recognised?", detail: "Recognition requires relevant information AND faithful representation. With a low-probability, highly uncertain outcome, recognising $2m would not be a faithful representation of a near-certain inflow." },
          { label: "Resolve", detail: "Do not recognise the asset; disclose it as a contingent asset. Note the symmetry with IAS 37 — the Framework and the standard reach the same destination by the same logic." },
        ], result: "The item IS an asset by definition but fails the recognition test — a distinction the pre-2018 definitions blurred. Separating 'does it exist' from 'do we recognise it' is exactly the analytical move SBR rewards." },
      ],
      check: {
        q: "Under the 2018 Conceptual Framework, why can an item meet the definition of an asset yet still not be recognised in the statement of financial position?",
        options: [
          "Because only tangible items can ever be recognised",
          "Because probability of inflow sits in the recognition decision, not the definition — recognition also demands relevance and faithful representation",
          "Because the item must first be measured at fair value",
          "Because equity items are never recognised",
        ],
        correct: 1,
        explain: "The 2018 revision deliberately separated EXISTENCE (the definition, which needs only the potential to produce benefits) from RECOGNITION (which additionally requires that recognition gives relevant information and a faithful representation, subject to cost). So a low-probability right is an asset by definition but may fail recognition. The other options misstate the Framework — recognition is not limited to tangible or fair-valued items, and equity is recognised.",
      },
    },
    {
      id: "measurement",
      heading: "Measurement — historical cost vs current value",
      blocks: [
        { kind: "text", md: "The 2018 Framework, for the first time, gave a structured account of **measurement bases** rather than leaving each standard to improvise. It groups them into two families. **Historical cost** measures an asset or liability using information from the transaction that created it, updated for consumption, impairment and collection. **Current value** re-measures using conditions at the measurement date, and comes in three forms: **fair value**, **value in use / fulfilment value**, and **current cost**." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The measurement bases",
          data: {
            items: [
              { title: "Historical cost", sub: "Transaction-based; updated for depreciation, impairment and collection. Verifiable but can be stale" },
              { title: "Fair value", sub: "Exit price in an orderly market between market participants (IFRS 13) — a market view, entity-independent" },
              { title: "Value in use / fulfilment value", sub: "Entity-specific present value of the cash flows an asset will generate or a liability will require" },
              { title: "Current cost", sub: "The cost of an equivalent asset today (replacement cost) — reflects current input prices" },
            ],
          },
        } },
        { kind: "text", md: "The Framework does not crown a single basis. Instead it says the choice should be driven by how the asset contributes to cash flows and by the qualitative characteristics: fair value maximises **relevance** for assets held for their price movements; historical cost often wins on **verifiability** and cost for assets used in operations. This is why mixed-measurement statements are not a flaw to apologise for but a **deliberate** consequence of matching the basis to the item." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Historical cost vs fair value — the strategic trade-off",
          data: {
            leftTitle: "Historical cost",
            rightTitle: "Fair value",
            rows: [
              { aspect: "Relevance", left: "Can become stale and misleading over time", right: "Reflects current conditions — decision-useful" },
              { aspect: "Faithful representation", left: "Highly verifiable, low estimation", right: "Reliable only where inputs are observable" },
              { aspect: "Volatility", left: "Smooth; gains crystallise only on disposal", right: "Introduces volatility, including unrealised swings" },
              { aspect: "Comparability", left: "Same asset bought on different dates differs", right: "Same asset carries the same value regardless of when bought" },
              { aspect: "Risk", left: "Understates gains; hides holding losses until sale", right: "Prone to management bias where markets are thin (Levels 2-3)" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "IFRS 13 and the fair value hierarchy", md: "**IFRS 13** defines fair value as the **exit price** — the price to sell an asset (or transfer a liability) in an **orderly transaction between market participants** at the measurement date. It maximises the use of observable inputs through a three-level hierarchy: **Level 1** — unadjusted quoted prices in active markets for identical items (most reliable); **Level 2** — other observable inputs (quoted prices for similar items, yield curves); **Level 3** — unobservable inputs using the entity's own assumptions (least reliable, highest bias risk). The lower the level, the greater the estimation, so the greater the disclosure and audit scrutiny." },
        { kind: "text", md: "The final measurement idea is **capital maintenance**. Profit is only earned once the entity has maintained its capital. Under **financial capital maintenance** (the IFRS default), profit arises when closing net assets exceed opening net assets in **money** (or constant purchasing power) terms, after adjusting for owner transactions. Under **physical capital maintenance**, profit arises only after preserving the **operating capacity** of the business, and holding gains are treated as capital adjustments, not profit. The concept chosen determines what counts as profit versus a mere maintenance of capital — a point that becomes live in high-inflation scenarios." },
      ],
      check: {
        q: "An entity fair-values an unquoted equity investment using its own cash-flow forecasts because no market prices for similar instruments exist. Where does this sit in the IFRS 13 hierarchy, and what is the reporting consequence?",
        options: [
          "Level 1 — it is a quoted, reliable measure needing little disclosure",
          "Level 2 — observable inputs, so moderate disclosure",
          "Level 3 — unobservable inputs, so extensive disclosure and higher estimation/bias risk",
          "It falls outside IFRS 13 and must use historical cost",
        ],
        correct: 2,
        explain: "Using the entity's OWN forecasts, with no observable market data for identical or similar items, is the definition of a Level 3 input. IFRS 13 therefore requires the most extensive disclosures (valuation techniques, sensitivity, reconciliations) precisely because Level 3 measurements carry the greatest estimation uncertainty and the greatest scope for management bias. It is not Level 1 (no quoted price) or Level 2 (inputs are not observable), and it is within IFRS 13's scope.",
      },
    },
    {
      id: "regulatory",
      heading: "The regulatory framework and standard-setting",
      blocks: [
        { kind: "text", md: "Standards are not handed down; they are **built through due process**, and SBR expects you to understand — and appraise — that machinery. The **IFRS Foundation** oversees and funds the system. The **IASB** develops IFRS Accounting Standards. The **IFRS Interpretations Committee (IFRIC)** issues interpretations on emerging application questions, and the **Advisory Council** provides strategic input from a wide stakeholder base. Since 2021 the Foundation also oversees the **ISSB**, which sets sustainability disclosure standards — a reminder that the regulatory perimeter is expanding beyond pure financial reporting." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "How a standard is set — the due process",
          caption: "Transparency, full consultation and accountability legitimise the resulting standard.",
          data: {
            steps: [
              { label: "Agenda", sub: "Board identifies an issue; adds it to the work plan" },
              { label: "Research & DP", sub: "Research programme; optional Discussion Paper for public comment" },
              { label: "Exposure Draft", sub: "Formal proposals published for public comment" },
              { label: "Redeliberation", sub: "Comment letters analysed; proposals revised" },
              { label: "Issue standard", sub: "IFRS issued with a Basis for Conclusions and effective date" },
              { label: "Post-implementation", sub: "Review after adoption; feedback loops back to the agenda" },
            ],
          },
        } },
        { kind: "text", md: "A principles-based framework is a **strategic choice with costs**. Its strength is flexibility — principles adapt to novel transactions and are harder to arbitrage than bright-line rules. Its weakness is that principles demand **judgement**, which reduces comparability and opens the door to divergent treatments of identical facts. This is the deeper reason the IASB pursues global convergence and constrains judgement with disclosure: the framework is only as trustworthy as the honesty of the people applying it — which brings us to ethics." },
        { kind: "callout", tone: "tip", title: "Evaluate, don't just describe", md: "If a question asks you to appraise the regulatory framework, contrast **principles vs rules** (IFRS vs a more rules-based regime), name the **enforcement gap** (standards without robust enforcement achieve little), and note the **political pressure** the IASB faces during due process — banks lobbying over financial-instrument rules is the classic example." },
      ],
    },
    {
      id: "ethics",
      heading: "Ethics, creative accounting and the public interest",
      blocks: [
        { kind: "text", md: "SBR is unique among the papers in **integrating ethics into every sitting**. The **IESBA Code of Ethics** binds professional accountants to five **fundamental principles**: **integrity, objectivity, professional competence and due care, confidentiality, and professional behaviour**. Underpinning all of them is a duty to act in the **public interest** — the accountancy profession's licence to operate rests on users trusting the numbers, so a preparer's loyalty is not owed solely to the directors who employ them." },
        { kind: "text", md: "**Creative or aggressive accounting** is where the Framework and ethics meet. It is the use of judgement — earnings smoothing, off-balance-sheet structuring, opportunistic recognition timing, boundary-pushing fair values at Level 3 — to present a picture management prefers rather than a **faithful representation**. It often stays within the letter of a standard while defeating its **substance**, which is exactly why substance over form and neutrality sit inside faithful representation." },
        { kind: "table", caption: "The IESBA threats — recognising the pressure to misstate", head: ["Threat", "In an aggressive-reporting scenario"], rows: [
          ["Self-interest", "A profit-linked bonus or share options tempt the preparer to inflate reported profit"],
          ["Self-review", "Being asked to report on figures or systems you yourself designed or advised on"],
          ["Advocacy", "Promoting the entity's position (e.g. to lenders) so strongly that objectivity is compromised"],
          ["Familiarity", "A long, close relationship with directors erodes professional scepticism"],
          ["Intimidation", "Threats — dismissal, lost fees, pressure from a dominant CEO — deter you from the correct treatment"],
        ] },
        { kind: "callout", tone: "warn", title: "The professional response", md: "When you spot a threat, evaluate its significance and apply **safeguards** until it is at an acceptable level: gather the facts, refer to the Framework and the specific IFRS, escalate internally (audit committee, those charged with governance), document your reasoning, and seek advice from your professional body. **Objectivity and integrity are never negotiable** — if aggressive treatment cannot be corrected, professional behaviour may ultimately require disassociation. In the exam, always tie the accounting error to the fundamental principle it breaches and propose a concrete action." },
        { kind: "example", title: "Ethics in practice — the year-end revenue push", scenario: "Two weeks before year-end, the CEO — whose bonus depends on hitting a profit target — instructs the reporting accountant to recognise revenue on goods dispatched to a distributor under a sale-or-return arrangement where the distributor can return anything unsold. How should the accountant respond?", steps: [
          { label: "Identify the accounting issue", detail: "Under IFRS 15, control has not passed where the customer can return goods and the entity retains the risks of ownership; recognising revenue now is not a faithful representation." },
          { label: "Identify the ethical threats", detail: "Self-interest and intimidation act on the accountant via the CEO's bonus-driven pressure; the CEO faces a clear self-interest threat." },
          { label: "Name the principles at risk", detail: "Integrity and objectivity — and the public-interest duty to users who will rely on the overstated profit." },
          { label: "Act", detail: "Decline to book the revenue, explain the IFRS 15 position in writing, and escalate to the audit committee / those charged with governance if pressure persists; document everything." },
        ], result: "The correct treatment defers the revenue; the correct professional conduct resists the pressure and escalates. SBR marks the accounting AND the ethics together — you must do both." },
      ],
      check: {
        q: "A finance director whose bonus depends on reported profit pressures the reporting accountant to capitalise routine repair costs as assets. Which IESBA threat MOST directly acts on the accountant, and what is the first correct step?",
        options: [
          "Advocacy threat — the accountant should promote the director's view to the auditors",
          "Intimidation threat — the accountant should resign immediately without discussion",
          "Self-interest / intimidation threat — evaluate its significance, refer to the standard (repairs are expenses, not assets), and escalate internally with documentation",
          "There is no threat because the director outranks the accountant",
        ],
        correct: 2,
        explain: "Pressure from a superior whose reward depends on the outcome creates an intimidation threat (and a self-interest threat on the director) to the accountant's objectivity and integrity. The professional response is NOT to comply, promote the view, or immediately resign — it is to apply safeguards: establish the facts, apply the correct treatment (routine repairs fail the asset definition and are expensed), escalate to those charged with governance, and document. Resignation is a last resort only if the matter cannot be resolved.",
      },
    },
    {
      id: "commentary",
      heading: "Management commentary and materiality",
      blocks: [
        { kind: "text", md: "Numbers alone rarely tell the story, so the Framework's ecosystem includes narrative and judgement guidance issued as **IFRS Practice Statements** — authoritative guidance that is **not a standard**, so applying it is encouraged rather than mandatory unless local regulators require it." },
        { kind: "text", md: "**Practice Statement 1, Management Commentary**, frames the narrative report that accompanies the statements: the entity's business model, strategy, resources, principal risks and relationships, and the performance and prospects that the numbers cannot fully convey. A revised version aligns management commentary with connected sustainability and value-creation reporting — again signalling the widening perimeter of corporate reporting. Evaluate it as the bridge between the audited numbers and the wider information investors actually use." },
        { kind: "callout", tone: "rule", title: "Materiality — Practice Statement 2", md: "**Practice Statement 2, Making Materiality Judgements**, operationalises the definition: information is **material** if omitting, misstating or **obscuring** it could reasonably be expected to influence the decisions of primary users. Two strategic points: materiality is **entity-specific** (no universal percentage threshold), and it has a **qualitative** dimension — a small number can be material by its nature (a related-party transaction, a director's fraud, a covenant breach). The 2018 addition of **'obscuring'** targets a real abuse: burying material information under immaterial clutter is now itself a materiality failure." },
        { kind: "text", md: "The through-line of this whole area: the Framework tells you what makes information **useful**, the standards turn that into rules, ethics governs the **judgement** the rules leave open, and materiality decides what actually reaches the user. At SBR you are examined on the **joins** between these — the moments where a preparer's judgement, honestly or aggressively exercised, decides what the financial statements really say." },
      ],
    },
  ],
  examTraps: [
    { trap: "Treating the Conceptual Framework as a standard that can override an IFRS.", fix: "It is not a standard. It guides policy only where no IFRS applies (via IAS 8) and is used to critique treatments — it never overrides a specific standard." },
    { trap: "Putting probability inside the 2018 definition of an asset or liability.", fix: "Post-2018, existence needs only the POTENTIAL to produce/transfer benefits. Probability is handled at RECOGNITION, not in the definition — so an item can be an asset yet not be recognised." },
    { trap: "Calling any current-date estimate 'fair value'.", fix: "IFRS 13 fair value is a market-based EXIT price. Value in use and fulfilment value are entity-specific; current cost is a replacement cost. They are distinct current-value bases." },
    { trap: "Listing all qualitative characteristics generically instead of naming the trade-off in the scenario.", fix: "Relevance and faithful representation are fundamental; the other four are enhancing and cannot rescue a failed fundamental. Marks come from identifying the specific conflict (e.g. timeliness vs verifiability)." },
    { trap: "Answering an ethics scenario as pure accounting, or pure ethics, but not both.", fix: "SBR integrates them. State the correct IFRS treatment, name the IESBA threat and fundamental principle breached, and propose a concrete safeguard/action such as escalating to those charged with governance." },
  ],
  keyTerms: [
    { term: "Faithful representation", def: "A fundamental characteristic: information that is complete, neutral (supported by prudence) and free from error, reflecting economic substance over legal form." },
    { term: "Economic resource (2018 asset)", def: "A right that has the potential to produce economic benefits; an asset is such a resource controlled by the entity from a past event — no probability threshold in the definition." },
    { term: "Fair value (IFRS 13)", def: "The exit price to sell an asset or transfer a liability in an orderly transaction between market participants at the measurement date, maximising observable inputs via the Level 1-3 hierarchy." },
    { term: "Capital maintenance", def: "The concept that profit is earned only after capital is maintained — financial (money/purchasing-power terms, the IFRS default) or physical (operating capacity)." },
    { term: "Self-interest threat", def: "An IESBA threat where a financial or other interest (e.g. a profit-linked bonus) inappropriately influences the accountant's judgement, endangering objectivity and integrity." },
    { term: "Materiality", def: "Information is material if omitting, misstating or obscuring it could reasonably influence primary users' decisions; entity-specific, with a qualitative as well as quantitative dimension (IFRS Practice Statement 2)." },
  ],
  summary: [
    "The Framework's objective — decision-useful information for investors, lenders and creditors — embeds a stewardship-vs-forward-looking tension; it guides but never overrides standards.",
    "Qualitative characteristics form a hierarchy: relevance and faithful representation are fundamental; comparability, verifiability, timeliness and understandability are enhancing, all under the cost constraint.",
    "The 2018 element definitions move probability out of the definition and into recognition, so an item can be an asset/liability yet not be recognised; derecognition follows control and faithful representation.",
    "Measurement is a deliberate mix of historical cost and current value (fair value per IFRS 13's three-level hierarchy, value in use/fulfilment, current cost), chosen by relevance vs verifiability; capital maintenance defines when profit exists.",
    "Standards are set by IASB due process; ethics (IESBA five principles, the threats, public interest) and materiality (Practice Statement 2) govern the judgement the rules leave open — SBR examines the joins between all of these.",
  ],
}
