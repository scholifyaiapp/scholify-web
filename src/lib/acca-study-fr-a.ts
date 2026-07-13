import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area A — The conceptual & regulatory framework.
 * Rich study chapter matching the FA·A exemplar in depth, tone and block
 * variety. Original prose, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const FR_A: StudyChapter = {
  paper: "FR",
  area: "A",
  title: "The conceptual & regulatory framework",
  minutes: 15,
  intro: "If every company invented its own accounting, no two sets of statements could be compared. This chapter is the rulebook behind the rulebook — why standards exist, who writes them, and the single framework that gives them a spine.",
  outcomes: [
    "Explain why a regulatory framework for financial reporting is needed",
    "Describe the IASB and the due process through which standards are set",
    "State the objective of financial reporting and the qualitative characteristics that make information useful",
    "Define the five elements and explain recognition, derecognition and measurement",
    "Distinguish measurement bases, explain capital maintenance and the reporting entity",
    "Contrast principles- and rules-based systems and explain the true and fair view",
  ],
  sections: [
    {
      id: "need",
      heading: "Why a regulatory framework is needed",
      blocks: [
        { kind: "text", md: "Suppose two identical companies each earn the same cash, own the same assets and owe the same debts — but one calls its delivery vans an **expense** the day they are bought while the other spreads their cost over eight years. Their profits would look wildly different, yet nothing real has changed. Without shared rules, financial statements become **opinion dressed as fact**, and no outsider could trust or compare them." },
        { kind: "text", md: "A **regulatory framework** is the system of standards, law and oversight that removes that freedom where it would mislead. Its job is to make financial information **comparable between companies**, **consistent over time**, and **credible** — so that investors and lenders across the world can rely on the same numbers meaning the same thing." },
        { kind: "callout", tone: "key", title: "The one idea", md: "A regulatory framework exists to turn accounting from a matter of **personal choice** into a matter of **shared discipline** — protecting the users who cannot see inside the business and must trust the report." },
        { kind: "table", caption: "What the framework delivers, and why it matters", head: ["It provides", "So that", "Without it"], rows: [
          ["A common set of standards", "Like items are treated alike", "Every company invents its own method"],
          ["Comparability & consistency", "Users can compare firms and years", "Numbers cannot be trusted side by side"],
          ["Credibility & discipline", "Managers cannot flatter the results at will", "Reporting becomes marketing"],
          ["A reference for new problems", "Novel transactions have a principled home", "Ad-hoc, inconsistent answers"],
        ] },
        { kind: "text", md: "Note the layers. **IFRS Accounting Standards** set the detailed rules; **the Conceptual Framework** supplies the underlying thinking those standards are built on; and **national law** (company legislation, listing rules) sits alongside, adding requirements such as audit and filing. FR is written around the IFRS system." },
      ],
    },
    {
      id: "iasb",
      heading: "The IASB and the standard-setting due process",
      blocks: [
        { kind: "text", md: "IFRS Accounting Standards are written by the **International Accounting Standards Board (IASB)** — an independent, expert board. It does not sit alone. Above it, the **IFRS Foundation** and its **Trustees** provide governance and funding, a **Monitoring Board** connects the system to public authorities, the **IFRS Advisory Council** offers strategic advice, and the **IFRS Interpretations Committee** issues guidance where a standard is unclear in practice." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The standard-setting due process",
          caption: "Standards are not decreed — they are consulted on publicly at every stage before issue.",
          data: {
            steps: [
              { label: "Agenda & research", sub: "identify an issue worth addressing" },
              { label: "Discussion paper", sub: "optional — early public debate" },
              { label: "Exposure draft", sub: "the proposed standard, out for comment" },
              { label: "Consider comments", sub: "public feedback deliberated" },
              { label: "Issue standard", sub: "the final IFRS is published" },
              { label: "Post-implementation review", sub: "check it works in practice" },
            ],
          },
        } },
        { kind: "text", md: "The defining feature is **due process**: openness and consultation. The **exposure draft** is published for anyone — companies, auditors, investors, regulators — to comment on, and those comments must be considered before a standard is finalised. This is what gives IFRS its legitimacy: standards are not imposed, they are **debated in public**." },
        { kind: "callout", tone: "tip", title: "Remember the order", md: "**Discussion paper → Exposure draft → Standard.** The discussion paper explores; the exposure *draft* proposes; the *standard* is final. A common trap swaps the draft and the paper — the paper comes first and is optional." },
      ],
      check: {
        q: "In the IASB's due process, which document is published to gather public comment on a specific proposed standard before it is finalised?",
        options: [
          "The final IFRS Accounting Standard",
          "The exposure draft",
          "The post-implementation review",
          "The annual report",
        ],
        correct: 1,
        explain: "The exposure draft sets out the IASB's actual proposals for a standard and is issued publicly for comment. Feedback on it must be considered before the final standard is issued. A discussion paper may come earlier for broad debate, but it is optional and less specific; the final standard is the outcome, not a consultation.",
      },
    },
    {
      id: "objective-qc",
      heading: "The Conceptual Framework — objective and qualitative characteristics",
      blocks: [
        { kind: "text", md: "The **Conceptual Framework for Financial Reporting** is not a standard you apply to a transaction — it is the **theory beneath the standards**. It guides the IASB when writing new standards and helps preparers where no standard directly applies. It starts by asking the most basic question of all: what is financial reporting *for*?" },
        { kind: "callout", tone: "rule", title: "The objective of general purpose financial reporting", md: "To provide financial information about the reporting entity that is **useful to existing and potential investors, lenders and other creditors** in making decisions about providing resources to the entity — decisions such as buying shares, or extending a loan." },
        { kind: "text", md: "If usefulness is the goal, the Framework then asks: what makes information useful? It answers with the **qualitative characteristics**, split into two tiers. The **fundamental** characteristics decide whether information is useful *at all*; the **enhancing** characteristics make already-useful information *more* useful." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "The qualitative characteristics of useful information",
          caption: "Fundamental characteristics must be met first; enhancing characteristics then raise the quality.",
          data: {
            levels: [
              { label: "Relevance", sub: "FUNDAMENTAL — capable of making a difference to a decision (predictive & confirmatory value); materiality is its entity-specific side" },
              { label: "Faithful representation", sub: "FUNDAMENTAL — complete, neutral and free from error; neutrality is supported by prudence" },
              { label: "Comparability · Verifiability · Timeliness · Understandability", sub: "ENHANCING — they boost information that is already relevant and faithful" },
            ],
          },
        } },
        { kind: "table", caption: "The characteristics unpacked", head: ["Characteristic", "Tier", "What it means"], rows: [
          ["Relevance", "Fundamental", "Can change a decision — has predictive and/or confirmatory value; material to the user"],
          ["Faithful representation", "Fundamental", "Depicts the substance completely, neutrally and free from error"],
          ["Comparability", "Enhancing", "Like with like — across companies and across periods"],
          ["Verifiability", "Enhancing", "Independent observers could agree it is a faithful depiction"],
          ["Timeliness", "Enhancing", "Available in time to influence the decision"],
          ["Understandability", "Enhancing", "Clear and concise for a reasonably informed user"],
        ] },
        { kind: "callout", tone: "warn", title: "Two easy confusions", md: "**Materiality** is not a third fundamental characteristic — it is the **entity-specific aspect of relevance**. And **prudence** does not mean deliberate understatement; it means **caution under uncertainty**, which *supports* neutrality rather than overriding it." },
        { kind: "text", md: "Two further ideas frame all of this. The **cost constraint** reminds us that information should not cost more to produce than the benefit it gives. And the underlying assumption of **going concern** means the statements are prepared assuming the business will continue operating for the foreseeable future — if it will not, a completely different (break-up) basis applies." },
      ],
      check: {
        q: "Which pairing correctly identifies the TWO fundamental qualitative characteristics?",
        options: [
          "Comparability and verifiability",
          "Relevance and faithful representation",
          "Timeliness and understandability",
          "Materiality and prudence",
        ],
        correct: 1,
        explain: "The two fundamental characteristics are relevance and faithful representation — information must have both to be useful. Comparability, verifiability, timeliness and understandability are the four enhancing characteristics. Materiality is the entity-specific aspect of relevance, and prudence supports faithful representation; neither is a standalone fundamental characteristic.",
      },
    },
    {
      id: "elements",
      heading: "The elements, recognition and derecognition",
      blocks: [
        { kind: "text", md: "Everything in a set of financial statements is built from just **five elements**. The 2018 revision of the Framework sharpened their definitions, moving the focus onto **rights, obligations and control** rather than the older language of \"probable\" inflows and outflows." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The five elements of financial statements",
          caption: "Assets and liabilities are defined first; income, expenses and equity flow from changes in them.",
          data: {
            items: [
              { title: "Asset", sub: "A present economic resource controlled by the entity as a result of past events (a right with potential to produce economic benefits)" },
              { title: "Liability", sub: "A present obligation to transfer an economic resource as a result of past events" },
              { title: "Equity", sub: "The residual interest in the assets after deducting all liabilities" },
              { title: "Income", sub: "Increases in assets or decreases in liabilities that increase equity — other than owner contributions" },
              { title: "Expense", sub: "Decreases in assets or increases in liabilities that decrease equity — other than owner distributions" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "Notice the architecture", md: "**Assets and liabilities lead.** Income and expenses are defined as *changes* in assets and liabilities, and equity is simply what is left (**Assets − Liabilities**). Get the asset and liability definitions right and the other three follow automatically." },
        { kind: "text", md: "Meeting a definition is necessary but not sufficient — an item must also be **recognised** (brought onto the face of the statements). Under the 2018 Framework, an asset or liability is recognised when doing so provides users with **relevant information** *and* a **faithful representation**, subject to the cost constraint. The old rigid \"probable, and reliably measurable\" hurdle was replaced by this judgement-based test." },
        { kind: "text", md: "The reverse process is **derecognition** — removing an asset or liability that has already been recognised. An **asset** is derecognised when the entity **loses control** of it (for example, it is sold); a **liability** is derecognised when the entity **no longer has a present obligation** (for example, the debt is settled)." },
        { kind: "example", title: "Worked example — applying the definitions", scenario: "In March, Delta Co receives a machine from a supplier and agrees to pay $40,000 in 60 days. It also spends $5,000 on staff training the same month. How does each meet — or fail — the element definitions?", steps: [
          { label: "The machine — asset?", detail: "It is a present economic resource (a right to use the machine) that Delta controls from past events (delivery). It meets the asset definition → recognise as an asset." },
          { label: "The $40,000 owed — liability?", detail: "A present obligation to transfer economic resources (cash) arising from a past event (receiving the machine). It meets the liability definition → recognise a payable." },
          { label: "The $5,000 training — asset?", detail: "Delta cannot control the trained staff (they can leave), so there is no controlled economic resource. It fails the asset definition → recognise as an expense now." },
          { label: "Effect on equity", detail: "The machine and payable net to zero on initial recognition; the $5,000 expense reduces equity via profit or loss." },
        ], result: "The machine is an asset and the amount owed a liability because each meets a precise definition; the training is expensed because control — the heart of the asset definition — is absent." },
      ],
      check: {
        q: "Under the 2018 Conceptual Framework, an asset is best defined as:",
        options: [
          "Something the entity owns that has a market value",
          "A present economic resource controlled by the entity as a result of past events",
          "A probable future inflow of cash the entity expects to receive",
          "Any cost the entity has incurred and not yet used up",
        ],
        correct: 1,
        explain: "The 2018 definition is a present economic resource controlled by the entity as a result of past events, where an economic resource is a right with the potential to produce economic benefits. Note it turns on control, not legal ownership, and no longer leads with the word probable — that older phrasing was deliberately dropped.",
      },
    },
    {
      id: "measurement",
      heading: "Measurement bases and capital maintenance",
      blocks: [
        { kind: "text", md: "Once an element is recognised, at **what amount** should it be carried? The Framework offers a choice of **measurement bases**, grouped into two families: **historical cost** and **current value**. Current value itself covers **fair value**, **value in use / fulfilment value**, and **current cost**." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Historical cost vs fair value",
          caption: "The trade-off is the classic tension in measurement: reliability versus relevance.",
          data: {
            leftTitle: "Historical cost",
            rightTitle: "Fair value (a current value)",
            rows: [
              { aspect: "Amount used", left: "Original transaction cost", right: "Current market-based exit price" },
              { aspect: "Updated for market?", left: "No — largely fixed", right: "Yes — remeasured each date" },
              { aspect: "Main strength", left: "Reliable, verifiable, cheap", right: "Relevant, up to date" },
              { aspect: "Main weakness", left: "Can become outdated", right: "Subjective if no active market" },
              { aspect: "Best when", left: "Stable, verifiable items", right: "Prices move and matter to users" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "Fair value — the IFRS 13 definition", md: "Fair value is **the price that would be received to sell an asset, or paid to transfer a liability, in an orderly transaction between market participants at the measurement date.** It is an **exit price** and is **market-based**, not entity-specific." },
        { kind: "text", md: "IFRS 13 gives fair value a **hierarchy** of inputs — Level 1 (quoted prices in active markets, the most reliable), Level 2 (other observable inputs), and Level 3 (unobservable inputs, the most judgemental). The higher the level number, the more estimation and the greater the risk of manipulation." },
        { kind: "text", md: "Finally, **capital maintenance** answers a subtle question: *when has a profit truly been made?* Profit only exists once the business has maintained its capital — you cannot count as profit what was needed just to stay where you started." },
        { kind: "table", caption: "Two concepts of capital maintenance", head: ["Concept", "Profit is earned only if…", "Measurement it implies"], rows: [
          ["Financial capital maintenance", "Net assets at the end exceed net assets at the start (excluding owner transactions)", "Nominal money or constant purchasing power units"],
          ["Physical capital maintenance", "Physical productive capacity at the end exceeds that at the start", "Current cost basis"],
        ] },
        { kind: "callout", tone: "tip", md: "Under **financial** capital maintenance a profit is any increase in the money value of net assets; under **physical** capital maintenance a profit arises only once the business can still produce as much as before — a tougher, current-cost test." },
      ],
      check: {
        q: "IFRS 13 defines fair value as the price to sell an asset in an orderly transaction between market participants at the measurement date. This makes fair value an:",
        options: [
          "Entry price based on what the entity originally paid",
          "Exit price based on current market conditions",
          "Entity-specific value in use",
          "Historical cost adjusted for inflation",
        ],
        correct: 1,
        explain: "Fair value is a market-based exit price — the amount that would be received to sell (not paid to buy). It is deliberately not entity-specific: it reflects what market participants would transact at, which is why it differs from value in use and from historical cost.",
      },
    },
    {
      id: "context",
      heading: "The reporting entity and the regulatory-ethical context",
      blocks: [
        { kind: "text", md: "The Framework also fixes the **boundary** of the report through the idea of the **reporting entity** — an entity that is required, or chooses, to prepare financial statements. It may be a **single entity**, a **portion** of an entity, or **more than one entity** together. When a parent and its subsidiaries report as one, the result is **consolidated** financial statements; the parent alone gives **unconsolidated** statements." },
        { kind: "text", md: "Standards themselves come in two broad philosophies. A **principles-based** system (IFRS) sets out broad objectives and relies on judgement to apply them; a **rules-based** system spells out detailed, prescriptive requirements for every situation. Each has a cost." },
        { kind: "table", caption: "Principles- vs rules-based standards", head: ["Aspect", "Principles-based (IFRS)", "Rules-based"], rows: [
          ["Style", "Broad objectives + judgement", "Detailed prescriptive rules"],
          ["Adapts to new transactions", "Yes — the principle still applies", "Poorly — gaps appear"],
          ["Risk", "Inconsistent judgements", "\"Box-ticking\" that misses substance"],
          ["Loopholes", "Fewer — substance governs", "More — meet the letter, dodge the spirit"],
        ] },
        { kind: "callout", tone: "key", title: "Substance over form", md: "A principles-based system leans on **substance over form**: transactions are reported according to their **commercial reality**, not merely their legal wrapper. This is what lets IFRS resist the loophole-hunting that dogs purely rules-based regimes." },
        { kind: "text", md: "The overriding quality goal in many jurisdictions is that the statements give a **true and fair view** (in IFRS terms, achieve a **fair presentation**). Applying IFRS properly is normally expected to achieve this. Underpinning it all is an **ethical** dimension — professional accountants are bound by principles of **integrity, objectivity, professional competence, confidentiality and professional behaviour**, so that the judgement a principles-based system demands is exercised honestly rather than to flatter the numbers." },
        { kind: "callout", tone: "warn", title: "True and fair is not \"perfectly accurate\"", md: "A true and fair view means the statements are **free from material misstatement and faithfully represent** the position — not that every figure is exact to the penny. Estimates and judgements are expected; bias and material error are not." },
      ],
      check: {
        q: "A lease transfers substantially all the risks and rewards of an asset to a company, though legal title stays with the lessor. Reporting the asset on the company's statement of financial position reflects which principle?",
        options: [
          "Prudence",
          "Substance over form",
          "Historical cost",
          "Physical capital maintenance",
        ],
        correct: 1,
        explain: "Substance over form requires transactions to be reported according to their commercial reality rather than their legal form. Although the company does not own the asset legally, it controls the economic benefits, so recognising the asset faithfully represents the substance of the arrangement.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing materiality or prudence as a fundamental qualitative characteristic.", fix: "The two fundamentals are relevance and faithful representation only. Materiality is the entity-specific aspect of relevance; prudence supports faithful representation." },
    { trap: "Confusing the discussion paper and the exposure draft.", fix: "Order is discussion paper (optional, exploratory) → exposure draft (specific proposals, out for comment) → final standard." },
    { trap: "Defining an asset as something the entity owns.", fix: "The 2018 definition turns on control of a present economic resource, not legal ownership — which is why leased and controlled items can be assets." },
    { trap: "Treating fair value as what the entity paid (an entry price).", fix: "IFRS 13 fair value is a market-based exit price — what would be received to sell — measured at the current date." },
    { trap: "Reading \"true and fair view\" as \"100% accurate\".", fix: "It means free from material misstatement and faithfully representative; reasonable estimates and judgement are expected." },
  ],
  keyTerms: [
    { term: "Conceptual Framework", def: "The IASB's underlying theory of financial reporting — it guides standard-setting and helps preparers where no standard applies; it is not itself a standard." },
    { term: "Faithful representation", def: "Information that depicts economic substance completely, neutrally and free from error — one of the two fundamental qualitative characteristics." },
    { term: "Asset (2018)", def: "A present economic resource controlled by the entity as a result of past events, where the resource is a right with potential to produce economic benefits." },
    { term: "Fair value", def: "The price to sell an asset or transfer a liability in an orderly transaction between market participants at the measurement date — a market-based exit price (IFRS 13)." },
    { term: "Substance over form", def: "Reporting transactions according to their commercial reality rather than merely their legal form." },
  ],
  summary: [
    "A regulatory framework exists to make financial statements comparable, consistent and credible; IFRS Standards sit on the Conceptual Framework and alongside national law.",
    "The IASB sets standards through open due process: discussion paper → exposure draft → final standard, with public consultation throughout.",
    "The objective is decision-useful information; usefulness needs the two fundamental characteristics (relevance, faithful representation), enhanced by comparability, verifiability, timeliness and understandability.",
    "Five elements — asset, liability, equity, income, expense — hinge on the 2018 control/obligation definitions; items are recognised when this gives relevant, faithful information and derecognised when control or the obligation ends.",
    "Measurement runs from historical cost to current value (incl. IFRS 13 fair value); profit depends on capital maintenance, and a principles-based, substance-over-form system aims at a true and fair view.",
  ],
}
