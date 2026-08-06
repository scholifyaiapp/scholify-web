import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area A — chapters 1 to 3: the conceptual framework.
 *
 * ── Why Area A gets six chapters and not one ─────────────────────
 * The paper this replaces had ONE chapter for the whole of Area A, which is a syllabus
 * area covering the objective of financial reporting, the qualitative characteristics,
 * the definitions of the five elements, four measurement bases, two capital maintenance
 * concepts, the standard-setting machinery, AND the concepts underlying consolidation.
 * Seven distinct bodies of material in one sitting.
 *
 * It also mattered more than a candidate expects. Area A looks like the soft opening of a
 * computational paper and gets skimmed. But the framework is what every Section A question
 * beginning "which of the following is consistent with…" tests, and — far more valuable —
 * it is the thing that lets a candidate REASON about a transaction they have not seen
 * before. A learner who can apply the definition of a liability does not need to have met
 * the exact scenario.
 *
 * ── The organising idea ─────────────────────────────────────────
 * These three chapters build one chain: WHO the accounts are for (ch 1), WHAT makes
 * information useful to them (ch 2), and WHICH items therefore go in (ch 3). Each chapter
 * is written round the wrong answer a candidate gives when the chain is missing — that the
 * accounts are for management, that prudence means understating, that an asset is
 * something you own.
 *
 * All wording is ORIGINAL Scholify teaching text. The IFRS Standards and the Conceptual
 * Framework are public documents; their definitions are quoted as definitions and cited,
 * and everything round them is written from scratch.
 */

export const FR_TREE_01: StudyChapter = {
  id: "FR-01",
  number: 1,
  paper: "FR",
  area: "A",
  title: "Why a conceptual framework, and who the financial statements are for",
  minutes: 16,
  syllabusRefs: ["A1(a)", "A1(b)", "A1(c)", "A3(a)"],
  intro:
    "Before any standard tells you how to account for a lease, something has to decide what the accounts are trying to do — and for whom.",
  outcomes: [
    "Explain what a conceptual framework is and what financial reporting would look like without one",
    "State the objective of general purpose financial reporting and identify the primary users",
    "Distinguish the primary users from the other parties who read financial statements",
    "Explain why the objective is decision-usefulness and not stewardship alone",
    "Recognise the consequences of a principles-based approach for a preparer facing a novel transaction",
  ],
  sections: [
    {
      id: "why-a-framework",
      heading: "What a framework is for, and the alternative",
      blocks: [
        {
          kind: "text",
          md: "A **conceptual framework** is a statement of the ideas that underpin financial reporting: what the accounts are for, who reads them, what makes the information in them useful, and what an asset, a liability and income actually are. It is not itself a standard. No entity applies the framework instead of IFRS 16, and where a standard conflicts with the framework, the **standard wins**.\n\nSo it is fair to ask what a document that never overrides anything is for. The answer is what happens without it.",
        },
        {
          kind: "list",
          title: "Financial reporting without a framework",
          items: [
            "**Standards contradict each other.** If each standard is written from first principles by a different committee at a different time, two of them will eventually define a liability differently — and an entity will be able to choose which definition suits it.",
            "**Novel transactions have no answer.** Standards are written after transactions become common. A preparer meeting something genuinely new has nothing to reason from, so the treatment becomes whatever the entity prefers.",
            "**Standard-setting becomes political.** Every proposal is argued on whose profit it raises rather than on whether it faithfully represents the transaction. A framework does not remove lobbying, but it forces the argument onto grounds that can be tested.",
            "**Comparability collapses.** Two entities in the same industry with the same transaction report different numbers, and a user cannot tell whether the difference is commercial or accounting.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The framework's real job",
          md: "It gives the IASB something to be consistent WITH, and it gives a preparer something to reason FROM. Both matter in the exam. A question that asks you to justify a treatment wants the framework's reasoning — is there a present obligation, does the entity control the resource — not a recital of the standard's paragraph number.",
        },
        {
          kind: "text",
          md: "The alternative approach is a **rules-based** system: a very detailed rule for every case. It sounds safer and is in one respect — compliance is easier to demonstrate. But detailed rules invite **structuring**, where a transaction is arranged so that it falls the right side of a bright line while its substance is unchanged. A lease drafted to run 4 years and 11 months when the rule captures leases of 5 years or more is accounting-driven, not commercially driven.\n\nIFRS is **principles-based**: it states the principle and requires judgement in applying it. That is why FR asks you to justify treatments rather than only to compute them.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Principles-based against rules-based",
            caption: "FR is examined on a principles-based system, which is why its questions ask you to justify rather than only to compute.",
            data: {
              leftTitle: "Principles-based (IFRS)",
              rightTitle: "Rules-based",
              rows: [
                { aspect: "What the standard states", left: "The principle, with guidance on applying it", right: "A detailed rule for each fact pattern" },
                { aspect: "Judgement required", left: "Substantial, and disclosed", right: "Minimal — the rule decides" },
                { aspect: "Novel transactions", left: "Reasoned from the framework", right: "Often no answer until a rule is written" },
                { aspect: "Main weakness", left: "Two entities may reach different defensible answers", right: "Structuring — arranging a transaction to fall the favourable side of a bright line" },
                { aspect: "How it is examined", left: "Justify the treatment, then compute it", right: "Recall and apply the rule" },
              ],
            },
          },
        },
      ],
    },
    {
      id: "the-objective",
      heading: "The objective of general purpose financial reporting",
      blocks: [
        {
          kind: "definition",
          term: "The objective of general purpose financial reporting",
          md: "To provide financial information about the reporting entity that is **useful** to existing and potential **investors, lenders and other creditors** in making **decisions relating to providing resources** to the entity. *(Conceptual Framework para 1.2)*",
        },
        {
          kind: "text",
          md: "Every word in that definition does work, and each one rules something out.\n\n**\"General purpose\"** — the statements serve a broad readership with common needs. They are not tailored to any one user, which is why they never contain everything any particular user wants.\n\n**\"Useful… in making decisions\"** — the test is prospective. Information earns its place because it helps someone decide, not because it records what happened.\n\n**\"Investors, lenders and other creditors\"** — the PRIMARY users. Not management, not employees, not government.\n\n**\"Providing resources\"** — the decisions are whether to buy, sell or hold equity and debt, whether to lend, and how to vote on or otherwise influence management's use of the resources already provided.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "radial",
            title: "Who reads financial statements, and who they are FOR",
            caption: "Only the three at the top are primary users. The others read the same statements but the IASB does not write them for their needs.",
            data: {
              centre: "General purpose financial statements",
              nodes: [
                { label: "Existing and potential investors", sub: "PRIMARY — buy, sell or hold equity" },
                { label: "Lenders", sub: "PRIMARY — will the loan be serviced and repaid" },
                { label: "Other creditors", sub: "PRIMARY — extend credit, on what terms" },
                { label: "Management", sub: "NOT primary — has internal information on demand" },
                { label: "Employees", sub: "Reads them, but job security is not the objective" },
                { label: "Government and agencies", sub: "Can compel the information it needs" },
                { label: "The public", sub: "Legitimate interest, not the reporting objective" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Why management is NOT a primary user — and the mark it costs",
          md: "This is the single most common Area A error, and it is not a technicality. Management is excluded **because it does not need general purpose financial statements**: it can obtain any internal information it wants, whenever it wants, in whatever form. A user group whose needs are already met cannot be the reason the statements exist.\n\nThe same logic excludes government and regulators — they have statutory power to demand what they need. Employees and the public are excluded on different grounds: their interests are real but they are not decisions about **providing resources to the entity**.",
        },
        {
          kind: "activity",
          title: "Apply the definition",
          prompt:
            "A bank is deciding whether to renew a $4m overdraft facility. A trade union is preparing for a pay negotiation. A tax authority is checking a corporation tax return. The finance director is deciding whether to close a loss-making division.\n\nWhich of these four is the objective of general purpose financial reporting aimed at, and why are the other three excluded?",
          answer:
            "Only the BANK. It is a lender making a decision about providing resources to the entity, which is exactly the objective.\n\nThe union is not making a resource-provision decision — it is bargaining over the distribution of resources already inside the entity. The tax authority has statutory power to demand whatever information it needs and is not relying on general purpose statements. The finance director is management, with unlimited access to internal information.\n\nNote what this does NOT mean. The other three all read the statements, and nothing stops them. The objective determines whose needs the IASB optimises for when the needs conflict — not who is permitted to read.",
        },
      ],
      check: {
        q: "Which one of the following is a PRIMARY user of general purpose financial statements under the Conceptual Framework?",
        options: [
          "A supplier deciding whether to sell goods to the entity on 60-day credit",
          "The entity's operations director deciding whether to replace a machine",
          "A tax authority verifying the entity's corporation tax computation",
          "A local resident concerned about the entity's environmental record",
        ],
        correct: 0,
        explain:
          "A supplier considering credit terms is an 'other creditor' making a decision about providing resources — a primary user. The operations director is management, who can obtain internal information on demand. The tax authority can compel the information it needs. The resident has a legitimate interest but is not making a resource-provision decision.",
      },
    },
    {
      id: "stewardship-and-limits",
      heading: "Stewardship, and what financial statements cannot do",
      blocks: [
        {
          kind: "text",
          md: "Financial statements do more than support a buy-or-sell decision. Users also need to assess **how efficiently and effectively management has discharged its responsibilities** for the entity's resources — the **stewardship** role. The framework treats this as part of decision-usefulness rather than a separate objective, because a user who concludes management has been a poor steward will act on it: sell, vote against the board, refuse to lend.",
        },
        {
          kind: "list",
          title: "What general purpose financial statements do NOT provide",
          items: [
            "**The value of the entity.** They help users ESTIMATE it. They do not report it, and the difference between a company's book equity and its market capitalisation is not an error.",
            "**Everything any user needs.** Users must also consider general economic conditions, industry outlook, political developments and the entity's own announcements.",
            "**Forecasts.** Financial statements report past transactions and present positions. Their usefulness lies in helping a user form their OWN expectations.",
            "**Precision.** Much of the content depends on estimates and judgements — useful lives, recoverable amounts, provisions. An estimate is not a failure of the accounts; it is unavoidable, and the framework's answer is to require disclosure of the judgement.",
          ],
        },
        {
          kind: "illustration",
          title: "Two entities, the same profit, and why the framework matters",
          md: "Two retailers each report profit of $12m. The first earned it from trading. The second earned $4m from trading and $8m from revaluing its head office upwards.\n\nBoth figures are correct under IFRS. A user assessing the return they can expect NEXT year needs to distinguish them, which is why the framework insists that information be useful for **assessing the prospects for future net cash inflows** — and why IFRS pushes the revaluation gain into other comprehensive income rather than profit, and requires the statements to be read as a set rather than as a single number.\n\nA candidate who treats 'profit' as one undifferentiated figure will misread both entities. This is what Area C of the syllabus is built on, and it starts here."
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How Area A is actually examined",
          md: "Rarely as \"state the objective\". Far more often as a **two-mark Section A question testing whether you can apply it**, or as a couple of marks inside a Section C requirement — \"explain why the directors' proposed treatment is not acceptable\". The framework is the vocabulary of the second kind of answer, and it is worth marks precisely because most candidates answer with an assertion instead.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Naming management as a primary user.", fix: "Management is excluded BECAUSE it can obtain internal information on demand. A user whose needs are already met cannot be the reason the statements exist." },
    { trap: "Naming government or a tax authority as a primary user.", fix: "They have statutory power to compel the information they need, so they do not rely on general purpose statements." },
    { trap: "Stating that financial statements show the value of the entity.", fix: "They provide information to help users ESTIMATE its value. Book equity is not market value, and the gap is not an error." },
    { trap: "Treating the framework as overriding a standard.", fix: "The framework is not a standard. Where the two conflict, the standard applies — the framework guides the IASB in writing standards and the preparer in reasoning about gaps." },
    { trap: "Arguing a treatment from what 'looks fairer' rather than from the framework.", fix: "Marks come from the framework's own criteria: control of an economic resource, a present obligation, faithful representation. Say them explicitly." },
  ],
  keyTerms: [
    { term: "Conceptual framework", def: "A statement of the concepts underlying financial reporting — the objective, the qualitative characteristics, the elements, recognition and measurement. Not a standard, and overridden by one where they conflict." },
    { term: "General purpose financial statements", def: "Statements directed at the common information needs of a broad range of users, rather than tailored to any one user." },
    { term: "Primary users", def: "Existing and potential investors, lenders and other creditors — the parties making decisions about providing resources to the entity." },
    { term: "Stewardship", def: "The assessment of how efficiently and effectively management has discharged its responsibility for the entity's resources; treated as part of decision-usefulness." },
    { term: "Principles-based standards", def: "Standards that state a principle and require judgement in its application, rather than prescribing a detailed rule for every case." },
  ],
  summary: [
    "A conceptual framework gives the IASB consistency and gives a preparer something to reason from when no standard fits.",
    "The objective: information useful to existing and potential investors, lenders and other creditors in making decisions about providing resources.",
    "Those three groups are the PRIMARY users. Management, government, employees and the public are not — the first two can obtain what they need directly, the last two are not making resource-provision decisions.",
    "Stewardship is part of decision-usefulness, not a separate objective.",
    "Financial statements help a user estimate the entity's value; they do not report it, and they do not contain everything any user needs.",
    "IFRS is principles-based, so FR asks you to JUSTIFY treatments as well as compute them.",
  ],
  knowledgeDiagnostic: [
    { q: "State the objective of general purpose financial reporting.", a: "To provide financial information about the reporting entity that is useful to existing and potential investors, lenders and other creditors in making decisions relating to providing resources to the entity." },
    { q: "Why is management not a primary user?", a: "Because it can obtain any internal information it needs on demand, so it does not depend on general purpose financial statements." },
    { q: "If the Conceptual Framework and an IFRS Standard conflict, which applies?", a: "The Standard. The framework is not itself a standard." },
    { q: "Name two things general purpose financial statements do not provide.", a: "The value of the entity, and everything that any particular user needs — users must also consider economic, industry and political information." },
    { q: "What is the risk of a rules-based rather than principles-based system?", a: "Structuring: a transaction is arranged to fall the favourable side of a bright line while its commercial substance is unchanged." },
  ],
  furtherStudy: [
    "Chapter 2 — the qualitative characteristics that make the information in the objective actually useful",
    "Chapter 6 — the framework's concepts applied to groups, where 'control' does the same work it does in the definition of an asset",
    "SBR builds directly on this chapter: the framework becomes the tool for arguing a treatment where no standard is decisive",
  ],
}

export const FR_TREE_02: StudyChapter = {
  id: "FR-02",
  number: 2,
  paper: "FR",
  area: "A",
  title: "Qualitative characteristics: what makes financial information useful",
  minutes: 18,
  syllabusRefs: ["A1(b)", "A1(c)", "A1(d)"],
  intro:
    "Two fundamental characteristics decide whether information is worth reporting; four enhancing ones decide how well it is reported. Prudence is not one of them.",
  outcomes: [
    "Distinguish the two fundamental qualitative characteristics from the four enhancing ones",
    "Explain relevance in terms of predictive value, confirmatory value and materiality",
    "Explain the three components of faithful representation",
    "State what prudence means in the current framework and what it does not mean",
    "Apply the enhancing characteristics, and explain the trade-offs between them and the cost constraint",
  ],
  sections: [
    {
      id: "the-two-tiers",
      heading: "Two tiers, and why the distinction matters",
      blocks: [
        {
          kind: "text",
          md: "The framework splits the qualitative characteristics into two tiers, and the split is not cosmetic.\n\n**FUNDAMENTAL** characteristics — relevance and faithful representation — decide whether information is useful **at all**. Information that fails either one is not made useful by being timely or comparable. Both must be present.\n\n**ENHANCING** characteristics — comparability, verifiability, timeliness and understandability — make useful information **more** useful. They cannot rescue information that is irrelevant or unfaithful, and they can be traded off against one another.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "pyramid",
            title: "The qualitative characteristics",
            caption: "The two fundamental characteristics are the gate. The four enhancing ones improve what gets through. The cost constraint sits over the whole structure.",
            data: {
              levels: [
                { label: "FUNDAMENTAL: Relevance", sub: "Predictive value · confirmatory value · materiality" },
                { label: "FUNDAMENTAL: Faithful representation", sub: "Complete · neutral · free from error" },
                { label: "ENHANCING: Comparability · Verifiability", sub: "Like with like; independent observers agree" },
                { label: "ENHANCING: Timeliness · Understandability", sub: "In time to influence a decision; classified and presented clearly" },
                { label: "CONSTRAINT: Cost", sub: "The benefit of reporting must justify the cost of providing it" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The classic six-item trap",
          md: "A Section A question lists six characteristics and asks which are FUNDAMENTAL. The answer is always **two**: relevance and faithful representation. Comparability is the most frequently mis-selected — it feels fundamental because comparison is what users do, but comparable nonsense is still nonsense.",
        },
      ],
    },
    {
      id: "relevance",
      heading: "Relevance, and materiality as its entity-specific aspect",
      blocks: [
        {
          kind: "definition",
          term: "Relevance",
          md: "Information is relevant if it is **capable of making a difference to the decisions** made by users. It need not actually change a particular user's decision, and it is relevant even if some users already know it from another source.",
        },
        {
          kind: "list",
          title: "The two ways information can make a difference",
          items: [
            "**Predictive value** — it can be used as an input to a user's own process for predicting future outcomes. Revenue by segment has predictive value; so does an analysis of a provision.",
            "**Confirmatory value** — it provides feedback about, confirming or changing, previous evaluations. This year's actual outcome against last year's estimate has confirmatory value.",
            "**Both, usually.** The two are interrelated: current-year revenue confirms last year's growth prediction AND feeds next year's. Information does not have to have both, but most useful information does.",
          ],
        },
        {
          kind: "definition",
          term: "Materiality",
          md: "Information is material if omitting, misstating or **obscuring** it could reasonably be expected to influence the decisions that primary users make on the basis of the financial statements. Materiality is an **entity-specific** aspect of relevance — the framework sets no threshold and no formula.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Three things about materiality that earn marks",
          md: "**It is entity-specific.** $50,000 is immaterial to a global bank and material to a small manufacturer. So the framework cannot and does not specify a uniform quantitative threshold, and a candidate who quotes \"5% of profit\" as a rule is stating a common audit heuristic, not IFRS.\n\n**It has a QUALITATIVE dimension.** A small figure can be material because of what it is: a director's transaction, a first-time loss, a breach of a loan covenant, or an amount that turns a profit into a loss.\n\n**Obscuring counts.** Since 2018 the definition explicitly covers information that is present but buried — aggregated with unlike items, or disclosed so vaguely that a user cannot find it. Adding immaterial detail can itself be a failure, because it obscures what matters.",
        },
        {
          kind: "activity",
          title: "Material or not?",
          prompt:
            "An entity with revenue of $400m and profit before tax of $30m is considering four items. Which are material?\n\n(i) An error of $180,000 in the depreciation charge.\n(ii) A $40,000 loan to a director, repaid before the year end.\n(iii) A $2m legal claim that the entity expects to win.\n(iv) An $80,000 penalty that, if recognised, changes a reported small profit in a subsidiary into a loss.",
          answer:
            "(i) Probably NOT material on size alone — $180,000 is 0.6% of profit before tax and 0.045% of revenue, and nothing about depreciation makes it qualitatively significant.\n\n(ii) MATERIAL, on qualitative grounds despite being tiny. A related party transaction with a director is exactly what users scrutinise, and repayment before the year end does not remove the fact that it happened. IAS 24 requires disclosure regardless of amount.\n\n(iii) MATERIAL. At $2m it is 6.7% of profit before tax, and the existence of the claim is decision-relevant even where the outcome is judged favourable — which is why IAS 37 requires a contingent liability disclosure rather than silence.\n\n(iv) MATERIAL, again qualitatively. An amount that flips a result from profit to loss is material at any size, because profit-or-loss is a threshold users react to.\n\nThe pattern: (i) is a pure size judgement and fails it; the other three are material for reasons size does not capture.",
        },
      ],
      check: {
        q: "An entity omits disclosure of a $30,000 loan made to its chief executive during the year. Revenue is $250m. Is the omission material?",
        options: [
          "Yes — materiality has a qualitative dimension, and a transaction with a director is decision-relevant at any amount",
          "No — $30,000 is far below any reasonable quantitative threshold",
          "No — the amount is immaterial and the loan was to an individual, not another entity",
          "Only if the loan remained outstanding at the reporting date",
        ],
        correct: 0,
        explain:
          "Materiality is not purely quantitative. A related party transaction with a director is something primary users scrutinise, so the disclosure is material despite the small amount — and IAS 24 requires it regardless of size. Whether the loan was repaid before the year end does not change that it occurred.",
      },
    },
    {
      id: "faithful-representation",
      heading: "Faithful representation, and where prudence went",
      blocks: [
        {
          kind: "text",
          md: "Relevance asks whether the information is about something that matters. **Faithful representation** asks whether it depicts that thing accurately. A perfectly faithful depiction has three characteristics.",
        },
        {
          kind: "table",
          caption: "The three components of faithful representation",
          head: ["Component", "What it requires", "How it fails in practice"],
          rows: [
            ["**Complete**", "All information necessary for a user to understand the item — description, figure, and any explanation of its nature and the judgements involved", "A provision recognised at a number with no note explaining what it is for or how it was estimated"],
            ["**Neutral**", "Free from bias in selection or presentation. Not slanted, weighted, emphasised or de-emphasised to obtain a particular reaction", "Presenting a one-off gain as 'underlying' while a one-off loss is 'exceptional'"],
            ["**Free from error**", "No errors or omissions in the description, and the process used to produce it applied with no error. NOT the same as perfectly accurate", "Applying an amortisation method wrongly. An estimate that turns out too high is not an error if the method was applied properly"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "\"Free from error\" does not mean \"exact\"",
          md: "This is the component candidates misread. Many figures in financial statements are **estimates** and cannot be exact. An estimate is faithfully represented if the amount is described clearly as an estimate, the nature and limitations of the process are explained, and no error has been made in selecting and applying that process.\n\nSo a provision of $2m that settles at $2.4m was not an error. Recognising $2m when the entity's own best estimate was $3m is one — and so is failing to say that the figure is an estimate at all.",
        },
        {
          kind: "text",
          md: "**Measurement uncertainty** interacts with both fundamental characteristics. Where an item can only be measured with a high level of estimation uncertainty, the most relevant measure may not be faithfully representable. The framework's answer is not automatic exclusion: it weighs whether the information remains useful with the uncertainty disclosed, and only where the uncertainty is so high that the depiction is not faithful does a less relevant but more measurable basis become preferable.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Prudence: what it IS and what it is not",
          md: "Prudence is **not** a qualitative characteristic in the current framework, and it is not a licence to understate.\n\nWhat the framework says is that neutrality is **supported by the exercise of prudence**, and prudence means the exercise of **CAUTION when making judgements under conditions of uncertainty**. It is explicitly symmetrical: prudence does **not** permit the deliberate understatement of assets or income, nor the deliberate overstatement of liabilities or expenses, because that would be just as biased — just as un-neutral — as the reverse.\n\nThe old idea of 'asymmetric prudence' — recognise losses early, gains late — is not the framework's position. A candidate who writes that prudence requires understating assets is describing a framework the IASB deliberately moved away from, and will lose the mark.",
        },
        {
          kind: "illustration",
          title: "Where asymmetry does still appear — and why that is not prudence-as-a-principle",
          md: "Individual standards DO contain asymmetric requirements. Inventory is measured at the lower of cost and net realisable value, never above cost. An impairment is recognised but a subsequent recovery of internally generated goodwill never is. IAS 37 recognises a probable outflow as a provision but requires a probable inflow to be a contingent asset, disclosed only.\n\nThese are deliberate choices in specific standards, each justified on its own terms — usually that overstatement of an asset does more harm to users than understatement. They are not the general principle that when in doubt you should report the lower number. Read the standard, not a disposition."
        },
      ],
      check: {
        q: "Which statement about prudence is consistent with the Conceptual Framework?",
        options: [
          "Prudence is the exercise of caution under uncertainty, and does not permit deliberate understatement of assets or income",
          "Prudence requires that assets and income are understated and liabilities and expenses overstated",
          "Prudence is one of the two fundamental qualitative characteristics",
          "Prudence has been removed from the framework entirely and has no role",
        ],
        correct: 0,
        explain:
          "Prudence supports neutrality and means caution in making judgements under uncertainty. It is explicitly symmetrical — deliberate understatement of assets or income is as much a breach of neutrality as overstatement. It is not a fundamental characteristic, and it has not been removed: it appears as support for neutrality.",
      },
    },
    {
      id: "enhancing-and-cost",
      heading: "The four enhancing characteristics, and the cost constraint",
      blocks: [
        {
          kind: "table",
          caption: "The enhancing characteristics",
          head: ["Characteristic", "What it means", "What it is NOT"],
          rows: [
            ["**Comparability**", "A user can identify and understand similarities and differences between items — the same entity over time, or different entities in the same period", "**Not uniformity.** Two entities in genuinely different situations should NOT report identically. Forcing them to would reduce comparability, not improve it"],
            ["**Verifiability**", "Knowledgeable, independent observers could reach consensus that a depiction is a faithful representation — directly, by observing the amount, or indirectly, by checking the model and inputs", "Not certainty. A forward-looking estimate can be verifiable if the assumptions and method are disclosed and can be tested"],
            ["**Timeliness**", "Information is available in time to be capable of influencing decisions. Generally, the older it is, the less useful", "Not instantaneous. Some older information stays useful — trend data, for instance"],
            ["**Understandability**", "Information is classified, characterised and presented clearly and concisely", "**Not simplification by omission.** Complex information that is relevant may not be excluded on the ground that some users will find it difficult. The framework assumes users have reasonable business and economic knowledge"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Consistency is the means; comparability is the end",
          md: "**Consistency** — using the same methods for the same items, period to period and entity to entity — is not itself a qualitative characteristic. It is how comparability is achieved. That is why IAS 8 permits a change of accounting policy only in narrow circumstances and requires retrospective application: the change is allowed because it improves the information, and the restatement is required so that comparability survives it.",
        },
        {
          kind: "text",
          md: "The **cost constraint** applies to the whole structure: the benefit of reporting information must justify the cost of providing it. The costs fall on preparers, but ultimately on users too — through lower returns — and users bear their own cost of analysing what is reported. This is the constraint that explains why disclosure requirements are not unlimited, and why the IASB consults on the cost of a proposal rather than only on its conceptual merit.",
        },
        {
          kind: "example",
          title: "Trading off the characteristics",
          scenario:
            "An entity's largest customer entered administration nine days before the reporting date. The recoverable amount of the $6.8m receivable cannot yet be reliably estimated; the administrator's first report is expected in four months. The finance director wants to delay publication until that report arrives.",
          steps: [
            { label: "Identify the characteristics in tension", detail: "TIMELINESS pushes for publishing now. FAITHFUL REPRESENTATION — specifically freedom from error and the treatment of measurement uncertainty — pushes for waiting until the loss can be measured." },
            { label: "Note which tier each sits in", detail: "Faithful representation is FUNDAMENTAL; timeliness is only ENHANCING. So where they genuinely conflict, faithful representation is not sacrificed for timeliness." },
            { label: "Ask whether they actually conflict here", detail: "They do not have to. The entity can recognise its best estimate of the impairment loss, disclose that the amount is subject to significant measurement uncertainty, describe the administration, and give the range of outcomes. That is a faithful representation of an uncertain amount — 'complete' includes explaining the limitations of the estimate." },
            { label: "Consider relevance", detail: "A four-month delay would cost the information most of its relevance. Users deciding now cannot wait, and information that arrives after the decision has no predictive or confirmatory value for it." },
            { label: "Reach a conclusion", detail: "Publish on time with the best estimate and full disclosure of the uncertainty. Delaying to achieve precision trades a fundamental characteristic's supposed improvement against a certain loss of relevance and timeliness." },
          ],
          result:
            "**Report now, with the estimate and the uncertainty disclosed.** The instinct that faithful representation requires waiting misreads it: an estimate accompanied by an honest account of its limitations IS faithful. What would not be faithful is a confident-looking figure with no disclosure, or silence.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Naming comparability as a fundamental characteristic.", fix: "There are exactly TWO fundamental characteristics — relevance and faithful representation. Comparability, verifiability, timeliness and understandability are enhancing." },
    { trap: "Writing that prudence requires understating assets and income.", fix: "Prudence is the exercise of caution under uncertainty and is SYMMETRICAL. Deliberate understatement is as much a breach of neutrality as overstatement." },
    { trap: "Treating 'free from error' as meaning exact.", fix: "Estimates cannot be exact. An estimate is faithful if it is described as an estimate, the process is explained and no error was made in applying it." },
    { trap: "Quoting a percentage as the materiality threshold.", fix: "The framework sets no threshold. Materiality is entity-specific and has a qualitative dimension — director transactions, covenant breaches and profit-to-loss flips are material at any size." },
    { trap: "Confusing comparability with uniformity.", fix: "Different situations should be reported differently. Consistency is the means to comparability, not a characteristic in its own right." },
    { trap: "Excluding complex but relevant information for 'understandability'.", fix: "Understandability is about clear classification and presentation. Relevant complexity may not be omitted; the framework assumes a reasonably knowledgeable user." },
  ],
  keyTerms: [
    { term: "Relevance", def: "Information capable of making a difference to users' decisions, through predictive value, confirmatory value or both." },
    { term: "Materiality", def: "An entity-specific aspect of relevance: information is material if omitting, misstating or obscuring it could reasonably be expected to influence primary users' decisions." },
    { term: "Faithful representation", def: "A depiction that is complete, neutral and free from error." },
    { term: "Neutral", def: "Free from bias in selection or presentation — not slanted, weighted, emphasised or de-emphasised to produce a particular user reaction." },
    { term: "Prudence", def: "The exercise of caution when making judgements under conditions of uncertainty. It supports neutrality and does not permit deliberate understatement or overstatement." },
    { term: "Comparability", def: "Information that enables users to identify and understand similarities in, and differences among, items. Achieved through consistency; not the same as uniformity." },
    { term: "Verifiability", def: "Knowledgeable and independent observers could reach consensus that a depiction is a faithful representation, whether directly or by testing the model and inputs." },
    { term: "Cost constraint", def: "The pervasive constraint that the benefits of reporting information must justify the costs of providing and using it." },
  ],
  summary: [
    "Two FUNDAMENTAL characteristics: relevance and faithful representation. Both must be present or the information is not useful at all.",
    "Relevance = predictive value and/or confirmatory value. Materiality is its entity-specific aspect, with no numerical threshold and a real qualitative dimension.",
    "Faithful representation = complete, neutral, free from error. Free from error means the process was applied properly, not that the figure is exact.",
    "Prudence is caution under uncertainty, supporting neutrality. It is symmetrical and does not license understatement.",
    "Four ENHANCING characteristics: comparability, verifiability, timeliness, understandability. They improve useful information; they cannot rescue useless information.",
    "Consistency is how comparability is achieved, and comparability is not uniformity.",
    "The cost constraint applies over the whole structure.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the two fundamental qualitative characteristics.", a: "Relevance and faithful representation." },
    { q: "What are the three components of faithful representation?", a: "Complete, neutral and free from error." },
    { q: "Does the framework specify a materiality threshold?", a: "No. Materiality is entity-specific, and small amounts can be material qualitatively — for example a director transaction or an amount that turns a profit into a loss." },
    { q: "What does prudence mean in the current framework?", a: "The exercise of caution in making judgements under uncertainty. It supports neutrality and is symmetrical — it does not permit deliberate understatement of assets or income." },
    { q: "Is consistency a qualitative characteristic?", a: "No. It is the means by which comparability, which IS a characteristic, is achieved." },
    { q: "If timeliness and faithful representation conflict, which gives way?", a: "Timeliness. It is only enhancing, whereas faithful representation is fundamental — though the usual answer is to report on time with the uncertainty disclosed, since a faithful depiction of an estimate includes explaining its limitations." },
  ],
  furtherStudy: [
    "Chapter 3 — the definitions of the elements, which the recognition criteria then test against relevance and faithful representation",
    "Chapter 23 — IAS 8, where comparability is protected by retrospective restatement",
    "Chapter 33 — the limitations of interpretation, which are largely the qualitative characteristics seen from the user's side",
  ],
}

export const FR_TREE_03: StudyChapter = {
  id: "FR-03",
  number: 3,
  paper: "FR",
  area: "A",
  title: "The elements, recognition and derecognition",
  minutes: 18,
  syllabusRefs: ["A2(a)", "A2(b)", "A2(c)"],
  intro:
    "An asset is not something you own, and a liability is not something you have agreed to pay. Both definitions turn on words most candidates skip.",
  outcomes: [
    "State and apply the framework definitions of asset, liability, equity, income and expenses",
    "Explain the definition of an economic resource and why 'potential' does not require certainty",
    "Apply the definition of a liability, including the 'no practical ability to avoid' test",
    "Explain the recognition criteria and why a definition being met does not guarantee recognition",
    "Explain derecognition and apply it to a partial transfer",
  ],
  sections: [
    {
      id: "assets",
      heading: "The asset definition, taken apart",
      blocks: [
        {
          kind: "definition",
          term: "Asset",
          md: "A **present economic resource controlled** by the entity **as a result of past events**. An **economic resource** is a **right** that has the **potential to produce economic benefits**. *(Conceptual Framework paras 4.3–4.4)*",
        },
        {
          kind: "text",
          md: "Note what is absent: **ownership**, **certainty**, and any reference to an **inflow of cash**. All three are what candidates supply from instinct, and each supplies a wrong answer.",
        },
        {
          kind: "list",
          style: "number",
          title: "The four tests, and what each one excludes",
          items: [
            "**A RIGHT.** Not a physical object. A right may be over a physical object (to use a machine) or not (a licence, a patent, a right to receive cash). Crucially, a right can be an asset without ownership — a lessee has no title to the asset it leases but does have a right to use it, which is precisely why IFRS 16 puts a right-of-use asset on its balance sheet.",
            "**POTENTIAL to produce economic benefits.** The potential need not be certain, or even probable. It only needs to EXIST — the right must be capable of producing benefits in at least one circumstance beyond those available to all other parties. This is why a research project with an uncertain outcome can still be an economic resource, and why probability belongs to recognition rather than to the definition.",
            "**CONTROL.** The entity has the present ability to direct the use of the resource and obtain the benefits from it, and can prevent others from doing so. Control is what makes the resource THIS entity's asset rather than someone else's, and it is what replaces ownership in the definition.",
            "**A PAST EVENT.** The right must already exist. An intention to buy a machine next year, however firm, creates nothing now. This is the test that disposes of most 'is this an asset?' distractors.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why 'potential' rather than 'probable' matters",
          md: "The 2018 framework deliberately moved probability OUT of the definition of an asset and into the recognition criteria. The old definition required that benefits were 'expected to flow', which meant a low-probability right was not an asset at all.\n\nUnder the current definition, a right with a 10% chance of producing benefits IS an economic resource and IS an asset — and then the question of whether to recognise it is answered separately, by asking whether recognition would provide relevant information that faithfully represents it. Splitting the two questions is what lets the framework say 'this is an asset, but we do not put it on the statement of financial position', which is exactly the position of internally generated brands.",
        },
        {
          kind: "activity",
          title: "Asset or not?",
          prompt:
            "Apply the four tests to each:\n\n(i) A skilled and loyal workforce.\n(ii) A signed contract to buy a machine in six months for $500,000, non-cancellable.\n(iii) A patent bought for $2m whose commercial viability is doubtful.\n(iv) A machine held under a five-year lease, title remaining with the lessor.\n(v) A brand the entity has built up over twenty years through advertising.",
          answer:
            "(i) NOT an asset. The entity has no RIGHT over its employees — they can leave, and it cannot prevent them. It fails control, and arguably fails 'right' altogether. The benefits are real but the entity does not control the resource producing them.\n\n(ii) An asset — of a sort, and the subtlety is worth noting. The entity has a right under the contract as a result of a past event (signing). But the machine itself is not yet its asset; what it holds is a contractual right, and it also has a corresponding obligation to pay. IFRS generally does not recognise such executory contracts because the two sides offset, which is a RECOGNITION decision, not a failure of definition.\n\n(iii) An ASSET, and this is where the current definition differs from the old one. The patent is a right, controlled, from a past event, with the POTENTIAL to produce benefits — the doubt about viability does not remove the potential. Whether $2m or a lower figure is carried forward is an impairment question under IAS 36.\n\n(iv) An ASSET. Ownership is irrelevant; the right to use for five years is the resource, and the lessee controls it. This is IFRS 16's right-of-use asset.\n\n(v) An ASSET by the definition — but NOT recognised. IAS 38 prohibits recognising internally generated brands, because the cost cannot be distinguished from the cost of developing the business as a whole, so a faithful representation cannot be produced. Definition met; recognition denied. Keep the two apart.",
        },
      ],
      check: {
        q: "An entity leases a delivery vehicle for four years. Legal title remains with the lessor throughout. Does the entity have an asset under the Conceptual Framework?",
        options: [
          "Yes — the right to use the vehicle for four years is an economic resource the entity controls",
          "No — the entity does not own the vehicle, so it cannot be the entity's asset",
          "Only if the lease transfers substantially all the risks and rewards of ownership",
          "Only if the entity has the option to purchase the vehicle at the end of the lease",
        ],
        correct: 0,
        explain:
          "The definition of an asset turns on a controlled right, not on ownership. The right to use the vehicle for four years is an economic resource, the entity controls it, and it arose from a past event. The risks-and-rewards test belonged to the superseded lease classification approach, not to the definition of an asset.",
      },
    },
    {
      id: "liabilities",
      heading: "The liability definition, and the obligation that cannot be avoided",
      blocks: [
        {
          kind: "definition",
          term: "Liability",
          md: "A **present obligation** of the entity to **transfer an economic resource** as a result of **past events**. An obligation is a duty or responsibility the entity has **no practical ability to avoid**. *(Conceptual Framework paras 4.26, 4.29)*",
        },
        {
          kind: "list",
          style: "number",
          title: "The three tests",
          items: [
            "**A PRESENT OBLIGATION.** It must exist now, and there must be no practical ability to avoid it. Legal enforceability is sufficient but not necessary — a constructive obligation created by the entity's own established practice or public statements also qualifies, because it too cannot practically be avoided.",
            "**TO TRANSFER AN ECONOMIC RESOURCE.** Cash, goods, services, or another asset. Note that the obligation need not be to pay MONEY, and the amount need not be certain — an obligation to repair goods under warranty is a liability even though neither the number of claims nor their cost is known.",
            "**AS A RESULT OF PAST EVENTS.** The entity must already have obtained the economic benefits or taken the action that makes the transfer unavoidable. A decision to incur expenditure, on its own, is not a past event of the right kind.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The 'no practical ability to avoid' test, and the restructuring trap",
          md: "This test is where FR's provisions questions are won and lost, so it is worth being precise.\n\nA board decision to restructure creates **no liability**. The board can change its mind, so the entity has a practical ability to avoid the transfer. What creates the obligation is the point at which the entity **loses** that ability — typically by announcing a detailed plan to those affected in a way that raises a valid expectation it will be carried out.\n\nApply the same test to future operating costs. An entity that intends to keep trading will incur staff costs next year, but at the reporting date it has no obligation for them: it could cease operations, however commercially unattractive that is. \"We will certainly spend it\" is not the test. \"We cannot now avoid spending it\" is.",
        },
        {
          kind: "illustration",
          title: "Two obligations that look identical and are not",
          md: "An airline is legally required to overhaul each aircraft every three years, and cannot fly it after that without the overhaul. At the reporting date, one aircraft is two years into its cycle.\n\nThere is **no liability** for the overhaul. The obligation to overhaul only bites if the airline chooses to keep flying that aircraft — it could ground it or sell it, so it has a practical ability to avoid the cost. The correct accounting is not a provision but **depreciation**: the overhaul element of the aircraft's cost is a separate component, depreciated over three years.\n\nNow change one fact. The airline has already had the overhaul performed, on credit. Now there is an obligation to pay for work already done, which cannot be avoided by any future decision. That is a liability — a payable.\n\nSame cash, same amount, opposite answers. The past event is what separates them."
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Testing for a liability",
            caption: "Each gate must be passed. Failing any one means there is no liability — which does not mean there is nothing to disclose.",
            data: {
              steps: [
                { label: "Is there a duty or responsibility?", sub: "Legal OR constructive" },
                { label: "Does the entity have NO practical ability to avoid it?", sub: "A board decision alone fails here" },
                { label: "Will it transfer an economic resource?", sub: "Cash, goods, services or another asset" },
                { label: "Has the past event already occurred?", sub: "Benefits obtained, or the action taken" },
                { label: "LIABILITY EXISTS", sub: "Then ask whether to recognise it, and at what amount" },
              ],
            },
          },
        },
      ],
      check: {
        q: "On 20 December 20X5 an entity's board resolves to close a division at a cost of $4m. No announcement is made to staff or customers before the 31 December 20X5 year end. What should be recognised?",
        options: [
          "Nothing — the board can reverse its decision, so the entity retains a practical ability to avoid the transfer",
          "A provision of $4m, because the decision is a past event",
          "A contingent liability of $4m only",
          "A provision of $4m, because the closure is now virtually certain",
        ],
        correct: 0,
        explain:
          "A board decision alone does not create a present obligation: the board can change its mind, so the entity has a practical ability to avoid the cost. The obligation arises when the entity loses that ability — normally by announcing a detailed plan to those affected. Nor is there a contingent liability, since no possible obligation arising from a past event exists yet.",
      },
    },
    {
      id: "equity-income-expenses",
      heading: "Equity, income and expenses",
      blocks: [
        {
          kind: "definition",
          term: "Equity",
          md: "The **residual interest** in the assets of the entity after deducting all its liabilities. Equity is defined by subtraction — it is not measured directly, and it is not the value of the entity.",
        },
        {
          kind: "text",
          md: "Because equity is a residual, the whole of the recognition and measurement effort in IFRS goes into assets and liabilities. Get those right and equity follows. This is also why the classification of an instrument as **debt or equity** — chapter 18 — matters so much: it is the one place where an item's characterisation changes both the liability total and the residual, and with them gearing, interest cover and reported profit.",
        },
        {
          kind: "table",
          caption: "Income and expenses, defined through the elements",
          head: ["Element", "Definition", "The point to notice"],
          rows: [
            ["**Income**", "Increases in assets, or decreases in liabilities, that result in an increase in equity — OTHER than contributions from holders of equity claims", "It is defined through changes in assets and liabilities, not as 'money received'. And a share issue increases equity but is not income"],
            ["**Expenses**", "Decreases in assets, or increases in liabilities, that result in a decrease in equity — OTHER than distributions to holders of equity claims", "A dividend reduces equity but is not an expense. This is why dividends never appear in profit or loss"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Income and expenses are consequences, not starting points",
          md: "The framework defines income and expenses **in terms of** assets and liabilities. That ordering is deliberate and it is a practical tool: when you cannot see whether something is income, ask instead whether an asset has increased or a liability decreased.\n\nA customer pays $100,000 in advance. Cash (an asset) rises by $100,000 — but a liability to deliver the goods rises by the same amount, so equity has not changed and there is no income. When the goods are delivered, the liability falls with no corresponding asset decrease, equity rises, and THAT is when income arises. IFRS 15's five steps are an elaboration of this single test.",
        },
      ],
    },
    {
      id: "recognition-derecognition",
      heading: "Recognition, and derecognition",
      blocks: [
        {
          kind: "text",
          md: "**Recognition** is the process of including an item in the statement of financial position or the statement(s) of financial performance. Meeting a definition is **necessary but not sufficient**.",
        },
        {
          kind: "list",
          title: "The recognition criteria",
          items: [
            "An asset or liability is recognised only if recognition provides users with **RELEVANT information** about it, and a **FAITHFUL REPRESENTATION** of it — together with the resulting income, expenses or changes in equity.",
            "Recognition may fail on **relevance** where it is uncertain whether the asset or liability exists, or where the probability of an inflow or outflow is very low. Note this is where probability now lives.",
            "Recognition may fail on **faithful representation** where measurement uncertainty is so high that the resulting figure would not faithfully represent the item — internally generated brands are the standard example.",
            "The **cost constraint** applies here too: recognition is not required where its cost outweighs its benefit.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The two-question discipline",
          md: "Whenever FR asks you to justify a treatment, answer in two moves:\n\n**Does it meet the definition?** Right, controlled, past event, potential benefits — or present obligation, transfer, past event.\n\n**Should it be recognised?** Does recognition give relevant information and a faithful representation?\n\nCandidates who merge the two produce answers that assert a conclusion. Answers that separate them collect marks at each stage, and they also handle the awkward cases — an item that is an asset but is not recognised, or a liability whose amount is so uncertain that only disclosure is appropriate.",
        },
        {
          kind: "text",
          md: "**Derecognition** is the removal of all or part of a recognised item. For an **asset**, it normally occurs when the entity loses control of all or part of it. For a **liability**, when the entity no longer has a present obligation for all or part of it.\n\nThe difficulty arises on a **partial** transfer, where the entity keeps some of the rights. The framework's aim is that the accounting faithfully represents both the rights and obligations retained AND the change resulting from the transfer — which sometimes means continuing to recognise a retained component, and disclosing the arrangement, rather than removing the whole asset and reporting a gain.",
        },
        {
          kind: "example",
          title: "Definition, recognition and the answer that separates them",
          scenario:
            "An entity spends $3m developing a new brand name, all on advertising and market research. Independent valuers assess the brand as worth $11m. The finance director proposes recognising an intangible asset of $11m with a gain in profit or loss, arguing that the brand plainly produces economic benefits.",
          steps: [
            { label: "Test the definition", detail: "The brand is a right (the entity can prevent others from using the name), it is controlled, it arose from past events, and it has the potential to produce economic benefits. It IS an asset within the framework's definition. Saying otherwise loses the first mark." },
            { label: "Test recognition — relevance", detail: "Relevance is satisfied. Information about a valuable brand is exactly what users want, and there is no doubt the asset exists." },
            { label: "Test recognition — faithful representation", detail: "This is where it fails. The $3m spent cannot be separated from the cost of developing the business as a whole, and the $11m valuation depends wholly on unobservable assumptions about future cash flows attributable to the name alone. Measurement uncertainty is so high that neither figure would faithfully represent the asset." },
            { label: "Apply the standard", detail: "IAS 38 reaches the same conclusion as a bright-line prohibition: internally generated brands, mastheads, publishing titles and customer lists are not recognised. The $3m is expensed as incurred." },
            { label: "Deal with the proposed gain", detail: "Even if the asset were recognised, recognising $11m against profit would be wrong twice over: the entity has not transacted, and income is defined as an increase in assets resulting in an increase in equity — the framework does not permit recognising an internally generated asset at a valuation and taking the uplift to profit." },
          ],
          result:
            "**Expense the $3m; recognise nothing.** The valuable point for the exam is the shape of the answer: the brand IS an asset and is NOT recognised, and the reason is faithful representation, not the absence of an asset. An answer that says 'it is not an asset' reaches the right number by the wrong route and loses the reasoning marks.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Requiring ownership for an asset.", fix: "The definition is a controlled RIGHT. A lessee's right of use is an asset with no title at all." },
    { trap: "Requiring that benefits are probable for an asset to exist.", fix: "The definition needs only the POTENTIAL to produce benefits. Probability was deliberately moved to the recognition criteria in 2018." },
    { trap: "Treating a board decision as creating a liability.", fix: "The board can reverse it, so the entity retains a practical ability to avoid the transfer. The obligation arises when that ability is lost." },
    { trap: "Providing for future operating costs or future overhauls.", fix: "No past event has occurred and the entity could avoid the cost by ceasing to operate or by grounding the asset. Overhauls are dealt with by componentised depreciation." },
    { trap: "Calling a dividend an expense, or a share issue income.", fix: "Both definitions expressly exclude transactions with holders of equity claims." },
    { trap: "Answering 'it is not an asset' when the real reason is non-recognition.", fix: "Separate the two questions. Internally generated brands meet the definition and fail recognition on measurement uncertainty — say both." },
  ],
  keyTerms: [
    { term: "Asset", def: "A present economic resource controlled by the entity as a result of past events." },
    { term: "Economic resource", def: "A right that has the potential to produce economic benefits. The potential need not be probable — only capable of existing in at least one circumstance." },
    { term: "Control", def: "The present ability to direct the use of an economic resource and obtain the benefits from it, and to prevent others from doing so." },
    { term: "Liability", def: "A present obligation to transfer an economic resource as a result of past events, which the entity has no practical ability to avoid." },
    { term: "Equity", def: "The residual interest in the assets of the entity after deducting all its liabilities." },
    { term: "Income", def: "Increases in assets or decreases in liabilities that result in increases in equity, other than contributions from holders of equity claims." },
    { term: "Expenses", def: "Decreases in assets or increases in liabilities that result in decreases in equity, other than distributions to holders of equity claims." },
    { term: "Recognition", def: "Including an item in the statement of financial position or performance. Requires that doing so gives relevant information and a faithful representation." },
    { term: "Derecognition", def: "Removing all or part of a recognised asset or liability — for an asset, on loss of control; for a liability, when the present obligation ceases." },
  ],
  summary: [
    "Asset = a present economic resource CONTROLLED as a result of past events; an economic resource is a RIGHT with the POTENTIAL to produce benefits. No ownership, no probability.",
    "Liability = a present obligation to transfer an economic resource from past events, which the entity has NO PRACTICAL ABILITY TO AVOID.",
    "Equity is a residual, which is why all the measurement effort goes into assets and liabilities.",
    "Income and expenses are defined THROUGH changes in assets and liabilities, and both exclude transactions with equity holders.",
    "Meeting a definition is not enough: recognition also requires relevant information and a faithful representation.",
    "Probability lives in the RECOGNITION criteria, not in the definitions — which is how an item can be an asset and still not appear.",
    "Derecognition follows loss of control (assets) or cessation of the obligation (liabilities), and a partial transfer may require a retained component to stay recognised.",
  ],
  knowledgeDiagnostic: [
    { q: "Define an asset.", a: "A present economic resource controlled by the entity as a result of past events — an economic resource being a right with the potential to produce economic benefits." },
    { q: "Is ownership required for an asset?", a: "No. Control of a right is what matters, which is why a lessee recognises a right-of-use asset without holding title." },
    { q: "Where does probability appear in the framework?", a: "In the recognition criteria, not in the definitions of asset and liability." },
    { q: "What is the test for a present obligation?", a: "That the entity has no practical ability to avoid the duty or responsibility. Legal enforceability suffices but a constructive obligation also qualifies." },
    { q: "Why is a dividend not an expense?", a: "Because expenses expressly exclude distributions to holders of equity claims." },
    { q: "Give an example of an item that meets the asset definition but is not recognised.", a: "An internally generated brand. Measurement uncertainty is so high that no figure would faithfully represent it, and IAS 38 prohibits recognition." },
  ],
  furtherStudy: [
    "Chapter 4 — the measurement bases that put a number on a recognised element",
    "Chapter 17 — IAS 37, which is the liability definition and the 'no practical ability to avoid' test applied in detail",
    "Chapter 10 — IAS 38, the standard that turns the recognition analysis of internally generated intangibles into a rule",
  ],
}
