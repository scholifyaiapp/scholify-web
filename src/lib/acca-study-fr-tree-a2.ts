import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area A — chapters 4 to 6: measurement, the regulatory framework, and the concepts
 * behind consolidation.
 *
 * Chapter 6 is the one to notice. The CONCEPTS and principles of groups sit in Area A of
 * the syllabus (A4), not in Area D — Area D is the mechanics. That split is not
 * administrative: a candidate who can produce a consolidated statement of financial
 * position without being able to say what control is, or why a subsidiary's assets are
 * added in full while an associate's are not, will be defeated by any question that varies
 * the facts. So the concepts get their own chapter, before any consolidation arithmetic,
 * and chapters 26 to 29 then assume it.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

export const FR_TREE_04: StudyChapter = {
  id: "FR-04",
  number: 4,
  paper: "FR",
  area: "A",
  title: "Measurement bases, capital maintenance and going concern",
  minutes: 16,
  syllabusRefs: ["A2(d)", "A2(e)", "A1(e)"],
  intro:
    "Once an item is recognised, something has to decide what number to attach to it — and IFRS offers a menu rather than an answer.",
  outcomes: [
    "Distinguish historical cost from the three current value bases",
    "Explain what fair value, value in use, fulfilment value and current cost each measure",
    "Select between measurement bases by reference to relevance and faithful representation",
    "Explain the going concern assumption and the effect of its absence",
    "Distinguish financial from physical capital maintenance and explain why it matters in inflation",
  ],
  sections: [
    {
      id: "the-bases",
      heading: "Historical cost, and the three current values",
      blocks: [
        {
          kind: "text",
          md: "The framework identifies two **categories** of measurement basis. Historical cost is one basis; current value is a category containing three.",
        },
        {
          kind: "table",
          caption: "The measurement bases",
          head: ["Basis", "What it measures", "Whose perspective", "Where FR uses it"],
          rows: [
            ["**Historical cost**", "The consideration paid to acquire the asset, or received to incur the liability, plus transaction costs — updated only for consumption, impairment or collection", "The entity's own past transaction", "PPE cost model, inventories, amortised cost financial assets"],
            ["**Fair value**", "The price that would be received to sell an asset, or paid to transfer a liability, in an orderly transaction between market participants at the measurement date", "MARKET participants, not the entity", "Revaluation model, investment property, FVTPL and FVTOCI financial assets"],
            ["**Value in use** (assets)", "The present value of the cash flows the ENTITY expects to derive from continuing use of the asset and from its ultimate disposal", "The entity's own expectations", "IAS 36 impairment — one of the two components of recoverable amount"],
            ["**Fulfilment value** (liabilities)", "The present value of the cash the entity expects to be obliged to transfer in fulfilling the liability", "The entity's own expectations", "IAS 37 provisions measured at present value"],
            ["**Current cost**", "The cost of an equivalent asset at the measurement date, comprising the consideration that would be paid plus transaction costs that would be incurred", "Current market entry price", "Not used in FR's standards; examinable as a concept"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The distinction candidates most often miss",
          md: "**Fair value is an exit price observed from the MARKET. Value in use is an entity-specific figure.**\n\nTwo entities holding an identical machine must report the same fair value, because fair value asks what market participants would pay. They may report very different values in use, because one may have a more profitable use for it than the other.\n\nThis is exactly why IAS 36 defines recoverable amount as the HIGHER of fair value less costs of disposal and value in use: a rational entity would take whichever is greater — sell it, or keep using it — so the asset is only impaired if BOTH are below carrying amount.",
        },
        {
          kind: "list",
          title: "Choosing a basis: what the framework says to weigh",
          items: [
            "**Relevance.** Which basis produces information users can use? For an asset held to sell, fair value; for one held to be consumed in operations, historical cost usually says more about the margin the entity earns.",
            "**Faithful representation.** Can the basis be applied without measurement uncertainty so high that the figure misleads? An unobservable fair value built on unverifiable assumptions may be less faithful than a cost figure.",
            "**The nature of the item and how it contributes to cash flows.** An asset used in combination with others (a factory) contributes indirectly; measuring it at fair value tells a user little. A financial asset traded independently contributes directly, and its market price is the most relevant number.",
            "**Consistency of measurement across related items.** Measuring an asset at fair value and a directly related liability at historical cost can produce a meaningless net figure and an accounting mismatch in profit.",
            "**Cost.** The constraint applies to measurement too — a valuation exercise that costs more than the information is worth is not required.",
          ],
        },
        {
          kind: "activity",
          title: "Which basis, and why?",
          prompt:
            "Suggest, with reasons, the most relevant measurement basis for each:\n\n(i) A city-centre office block held to earn rentals.\n(ii) A specialised furnace used in the entity's only production process, with no second-hand market.\n(iii) A portfolio of listed shares held for short-term gain.\n(iv) A provision for decommissioning a plant in 15 years' time.",
          answer:
            "(i) FAIR VALUE. The asset is held to earn rentals and capital appreciation, so its market price is what users want; IAS 40 permits exactly this. Historical cost of a property bought thirty years ago tells a user almost nothing about the entity's current position.\n\n(ii) HISTORICAL COST. There is no market, so fair value would be a modelled figure with high measurement uncertainty. The furnace also contributes to cash flows only in combination with the rest of the process — its individual value is not decision-useful. Cost, depreciated, faithfully represents the consumption of the resource.\n\n(iii) FAIR VALUE, through profit or loss. The shares are traded independently, generate cash flows directly, and are held for gain. Market price is both the most relevant number and highly verifiable.\n\n(iv) FULFILMENT VALUE — the present value of the expected outflow. The entity will not sell the obligation, so an exit price is not the point; what matters is what it expects to have to pay, discounted because the outflow is fifteen years away.",
        },
      ],
      check: {
        q: "Two entities each own an identical machine. Entity A can use it in a highly profitable process; Entity B cannot and would have to sell it. Which statement is correct?",
        options: [
          "Their fair values are the same but their values in use differ",
          "Their values in use are the same but their fair values differ",
          "Both the fair values and the values in use will be the same",
          "Fair value cannot be determined because the entities' uses differ",
        ],
        correct: 0,
        explain:
          "Fair value is a market-based exit price and does not depend on the holder, so it is the same for both. Value in use is entity-specific — the present value of the cash flows THAT entity expects — so A's exceeds B's. This is why recoverable amount under IAS 36 is the higher of the two measures.",
      },
    },
    {
      id: "going-concern",
      heading: "The going concern assumption",
      blocks: [
        {
          kind: "definition",
          term: "Going concern assumption",
          md: "Financial statements are prepared on the assumption that the entity is a going concern and will **continue in operation for the foreseeable future** — that it has neither the intention nor the need to liquidate or curtail materially the scale of its operations.",
        },
        {
          kind: "text",
          md: "The assumption is not a piece of optimism; it is what makes most of IFRS coherent. Depreciating an asset over ten years only makes sense if the entity expects to be there for ten years. Classifying a liability as non-current only makes sense if the entity is not about to be wound up. Carrying inventory at cost only makes sense if there will be an ordinary course of business in which to sell it.",
        },
        {
          kind: "list",
          title: "What changes if the entity is NOT a going concern",
          items: [
            "The statements are prepared on a **different basis** — typically a break-up or realisable-value basis, and the fact and the basis must be **disclosed** together with the reason the entity is not regarded as a going concern.",
            "The current/non-current **distinction loses meaning**, because everything is about to be realised or settled.",
            "**Assets** are written down to what they will actually realise in a forced sale, which is generally far below both cost and fair value in an orderly transaction.",
            "**Liabilities** may crystallise early — loans become repayable on breach of covenant, and onerous contract and redundancy obligations arise.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Material uncertainty is not the same as not being a going concern",
          md: "There is a middle state, and FR questions use it. Where events cast **significant doubt** on the entity's ability to continue but management still concludes it is a going concern, the statements are prepared on the **going concern basis** and the **material uncertainty is disclosed**.\n\nSo three outcomes, not two: going concern with no issue; going concern with a disclosed material uncertainty; and not a going concern, with a change of basis. A candidate who offers only the first and third will misanswer any scenario built on refinancing negotiations that have not yet concluded.",
        },
      ],
    },
    {
      id: "capital-maintenance",
      heading: "Capital maintenance: two concepts, two definitions of profit",
      blocks: [
        {
          kind: "text",
          md: "Profit can be defined as the amount by which the entity is better off at the end of a period than at the beginning, after maintaining its capital. That leaves open what \"capital\" means, and the two answers give different profits.",
        },
        {
          kind: "table",
          caption: "Financial against physical capital maintenance",
          head: ["", "Financial capital maintenance", "Physical capital maintenance"],
          rows: [
            ["Capital is…", "The **monetary amount** of the net assets — the shareholders' invested money", "The **operating capability** — the physical productive capacity of the entity"],
            ["Profit is…", "The increase in the monetary amount of net assets over the period, after excluding distributions and contributions", "The increase in the physical productive capacity over the period, after excluding distributions and contributions"],
            ["Price changes are…", "Holding gains — part of profit under the nominal basis, or excluded to the extent they represent general inflation under the real basis", "**Capital maintenance adjustments** — never profit. They go to equity"],
            ["Measurement basis it requires", "Any, including historical cost", "**Current cost** — you cannot measure productive capacity at historical cost"],
            ["Which IFRS uses", "**Financial**, on a nominal basis. Physical capital maintenance is examinable as a concept but is not the IFRS model", "—"],
          ],
        },
        {
          kind: "example",
          title: "Why the choice changes profit",
          scenario:
            "A trader begins the year with $100,000 cash and no liabilities. It buys 1,000 units at $100 each, and sells all 1,000 during the year for $130,000. By the year end the replacement cost of a unit has risen to $118. General inflation over the year was 6%.",
          steps: [
            { label: "Financial capital maintenance, NOMINAL basis", detail: "Opening capital $100,000. Closing net assets $130,000. Profit = $130,000 − $100,000 = $30,000. Every dollar of the increase is profit, however it arose." },
            { label: "Financial capital maintenance, REAL basis", detail: "Opening capital must be uplifted for general inflation to be maintained in real terms: $100,000 × 1.06 = $106,000. Profit = $130,000 − $106,000 = $24,000. The $6,000 difference is a capital maintenance adjustment, not profit." },
            { label: "Physical capital maintenance", detail: "Capital is the ability to hold 1,000 units. Replacing them now costs 1,000 × $118 = $118,000, so that is the capital to be maintained. Profit = $130,000 − $118,000 = $12,000." },
            { label: "Explain the spread", detail: "Same transactions, three profits: $30,000, $24,000 and $12,000. The difference is entirely about what has to be preserved before a surplus can be called profit — the money invested, its purchasing power, or the operating capability." },
            { label: "Draw out the practical point", detail: "Under physical capital maintenance the trader may distribute only $12,000 and still be able to restock. Under nominal financial capital maintenance it may distribute $30,000 — and then find it can buy only 1,101 units' worth of stock at the new price with $118,000 needed for 1,000. The concept is about whether a distribution erodes the business." },
          ],
          result:
            "**$30,000 nominal financial, $24,000 real financial, $12,000 physical.** IFRS uses nominal financial capital maintenance, which is why holding gains reach profit and why the framework acknowledges that this is a policy choice rather than a fact.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How this is examined",
          md: "Almost always as a two-mark Section A calculation of profit under one named concept, or as a short discussion of why historical cost profit can be overstated when prices are rising. The examinable skill is the arithmetic in the example above plus the ability to say **which capital is being maintained** — so learn the three lines, not a description.",
        },
      ],
      check: {
        q: "An entity starts the year with net assets of $500,000 and ends with $580,000, having paid no dividends and issued no shares. General inflation was 4%. What is profit under REAL financial capital maintenance?",
        options: ["$60,000", "$80,000", "$20,000", "$83,200"],
        correct: 0,
        explain:
          "Opening capital is uplifted for general inflation: $500,000 × 1.04 = $520,000. Profit is $580,000 − $520,000 = $60,000. The $80,000 answer is the NOMINAL figure, which does not maintain purchasing power; $20,000 is the inflation adjustment itself.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating fair value and value in use as interchangeable.", fix: "Fair value is a market exit price, identical for all holders. Value in use is entity-specific. Recoverable amount is the HIGHER of the two." },
    { trap: "Describing current cost as an exit price.", fix: "Current cost is a current ENTRY price — what it would cost to acquire an equivalent asset now, including transaction costs that would be incurred." },
    { trap: "Assuming a material uncertainty means the going concern basis must be abandoned.", fix: "Three outcomes: no issue; going concern basis with the material uncertainty disclosed; or a different basis entirely with the reason disclosed." },
    { trap: "Using the nominal figure when the question asks for real financial capital maintenance.", fix: "Uplift opening capital by general inflation first, then compare with closing net assets." },
    { trap: "Applying physical capital maintenance with historical cost figures.", fix: "It requires current cost, because it measures operating capability rather than money." },
  ],
  keyTerms: [
    { term: "Historical cost", def: "Consideration paid to acquire an asset or received to incur a liability, including transaction costs, updated only for consumption, impairment or collection." },
    { term: "Fair value", def: "The price that would be received to sell an asset or paid to transfer a liability in an orderly transaction between market participants at the measurement date." },
    { term: "Value in use", def: "The present value of the cash flows the entity expects to derive from continuing use of an asset and from its ultimate disposal. Entity-specific." },
    { term: "Fulfilment value", def: "The present value of the cash the entity expects to be obliged to transfer in fulfilling a liability." },
    { term: "Current cost", def: "The consideration that would be paid to acquire an equivalent asset now, plus transaction costs that would be incurred — a current entry price." },
    { term: "Going concern assumption", def: "That the entity will continue in operation for the foreseeable future, with neither the intention nor the need to liquidate or materially curtail operations." },
    { term: "Financial capital maintenance", def: "Capital is the monetary amount of net assets; profit is the increase in that amount, on a nominal or a real (inflation-adjusted) basis. The IFRS model, on the nominal basis." },
    { term: "Physical capital maintenance", def: "Capital is operating capability; profit arises only after the entity's productive capacity is maintained. Requires current cost measurement." },
  ],
  summary: [
    "Two categories: historical cost, and current value — the latter comprising fair value, value in use (assets), fulfilment value (liabilities) and current cost.",
    "Fair value is market-based and holder-independent; value in use and fulfilment value are entity-specific.",
    "The basis is chosen by weighing relevance, faithful representation, how the asset contributes to cash flows, consistency with related items, and cost.",
    "The going concern assumption underpins depreciation, the current/non-current split and cost-based measurement. A material uncertainty is disclosed, not a change of basis.",
    "Financial capital maintenance (nominal) is the IFRS model. Real financial and physical capital maintenance produce lower profits when prices rise.",
    "Under physical capital maintenance, price changes are capital maintenance adjustments in equity, never profit.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the four current value measurement bases in the framework.", a: "Fair value, value in use (assets), fulfilment value (liabilities) and current cost." },
    { q: "Why can two entities holding the same asset report the same fair value but different values in use?", a: "Fair value is a market exit price and does not depend on the holder; value in use is the present value of the cash flows that particular entity expects." },
    { q: "What are the three possible going concern outcomes?", a: "Going concern with no issue; going concern basis with a material uncertainty disclosed; and not a going concern, requiring a different basis with the reason disclosed." },
    { q: "Which capital maintenance concept does IFRS use?", a: "Financial capital maintenance on a nominal basis." },
    { q: "How is profit computed under real financial capital maintenance?", a: "Closing net assets less opening net assets uplifted for general inflation, adjusted for distributions and contributions." },
  ],
  furtherStudy: [
    "Chapter 8 — the revaluation model, which is fair value measurement applied to PPE",
    "Chapter 11 — IAS 36, where fair value less costs of disposal and value in use are compared directly",
    "Chapter 33 — why comparing a historical cost entity with a revaluing one distorts every ratio",
  ],
}

export const FR_TREE_05: StudyChapter = {
  id: "FR-05",
  number: 5,
  paper: "FR",
  area: "A",
  title: "The regulatory framework and the duty of the preparer",
  minutes: 15,
  syllabusRefs: ["A3(a)", "A3(b)", "A3(c)"],
  intro:
    "Who writes IFRS, how, and what a preparer is supposed to do when the directors want a number the standards do not support.",
  outcomes: [
    "Describe the structure of the IFRS Foundation and the roles of its bodies",
    "Outline the IASB's standard-setting due process and explain why each stage exists",
    "Explain the role of the IFRS Interpretations Committee",
    "Explain what harmonisation achieves and the obstacles to it",
    "Identify creative accounting techniques and state the preparer's professional duty",
  ],
  sections: [
    {
      id: "the-bodies",
      heading: "Who does what",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "pyramid",
            title: "The IFRS Foundation structure",
            caption: "Oversight at the top, standard-setting in the middle, advice and interpretation supporting it.",
            data: {
              levels: [
                { label: "Monitoring Board", sub: "Public authorities — provides the link to capital market regulators and holds the Trustees accountable" },
                { label: "IFRS Foundation Trustees", sub: "Appoint IASB and ISSB members, oversee governance and secure funding. Do NOT set standards" },
                { label: "IASB", sub: "Sets IFRS Accounting Standards. The technical body — and the only one that issues a standard" },
                { label: "IFRS Interpretations Committee", sub: "Addresses questions on existing standards; issues IFRIC Interpretations, approved by the IASB" },
                { label: "IFRS Advisory Council", sub: "Advises on agenda and priorities. Advisory only — no technical authority" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "The three things Section A tests here",
          md: "**The Trustees do not write standards.** They appoint, oversee and fund. Attributing standard-setting to them is the most common error in this topic.\n\n**The Advisory Council advises; it does not approve.** It has no technical authority at all.\n\n**An IFRIC Interpretation is authoritative and must be applied.** It is not guidance a preparer may weigh — it carries the same force as the standard it interprets, and the IASB approves it before issue.",
        },
        {
          kind: "text",
          md: "The **ISSB** — the International Sustainability Standards Board — sits alongside the IASB under the same Trustees and issues IFRS Sustainability Disclosure Standards. It is worth knowing it exists and that it is a **separate board with a separate output**: FR examines IFRS Accounting Standards, and an answer that attributes a sustainability disclosure requirement to the IASB has the structure wrong.",
        },
      ],
    },
    {
      id: "due-process",
      heading: "How a standard is made, and why the stages exist",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "IASB due process",
            caption: "Each stage is a consultation. The length of the process is the price of legitimacy, not inefficiency.",
            data: {
              steps: [
                { label: "Agenda consultation", sub: "Is this problem worth the Board's time?" },
                { label: "Research programme", sub: "Discussion Paper — is there a problem, and what are the possible approaches?" },
                { label: "Standard-setting", sub: "Exposure Draft — the Board's proposal, with a comment period" },
                { label: "Deliberation", sub: "Comment letters analysed publicly; the proposal is revised or withdrawn" },
                { label: "Issue", sub: "The Standard, with a Basis for Conclusions explaining the Board's reasoning" },
                { label: "Post-implementation review", sub: "Did it work in practice? Feeds the next agenda consultation" },
              ],
            },
          },
        },
        {
          kind: "list",
          title: "What each stage is protecting",
          items: [
            "**Public consultation** gives the eventual standard legitimacy. A body with no enforcement power of its own depends on jurisdictions choosing to adopt its output, and they will not adopt what their preparers were never consulted on.",
            "**The Discussion Paper** stage separates 'is there a problem' from 'here is our answer'. Skipping it produces standards that solve a problem nobody had.",
            "**The comment period on the Exposure Draft** is the stage that most often changes the outcome — IFRS 16's treatment of short-life and low-value leases is a direct product of it.",
            "**The Basis for Conclusions** records WHY the Board decided as it did, including the arguments it rejected. It is not part of the standard but it is the best available guide to a standard's intention.",
            "**Post-implementation review** closes the loop, and is why standards are amended rather than left to decay.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The exam angle on due process",
          md: "Questions rarely ask you to list the stages. They ask why the process takes years, or why the IASB cannot simply impose a solution. Both answers are the same: the IASB has **no power to enforce anything**. Adoption is a decision for each jurisdiction, so the process has to build the consensus that enforcement would otherwise supply.",
        },
      ],
      check: {
        q: "Which body issues IFRS Accounting Standards?",
        options: [
          "The IASB",
          "The IFRS Foundation Trustees",
          "The IFRS Advisory Council",
          "The Monitoring Board",
        ],
        correct: 0,
        explain:
          "Only the IASB issues Standards. The Trustees appoint, oversee and fund; the Advisory Council advises on agenda and priorities with no technical authority; the Monitoring Board provides the link to public authorities and holds the Trustees accountable.",
      },
    },
    {
      id: "harmonisation",
      heading: "Harmonisation: the case, and the obstacles",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Arguments on harmonisation",
            data: {
              leftTitle: "For",
              rightTitle: "Against, or obstacles to it",
              rows: [
                { aspect: "Investors", left: "Can compare entities across borders without restating; lower cost of analysis", right: "Users in some jurisdictions are used to a national framework and lose familiarity" },
                { aspect: "Multinationals", left: "One reporting framework across the group instead of many local GAAPs; cheaper consolidation and audit", right: "Transition cost is real and falls before the benefit" },
                { aspect: "Cost of capital", left: "Better comparability lowers perceived risk and so the cost of capital", right: "The effect is disputed and hard to isolate" },
                { aspect: "Legal systems", left: "—", right: "IFRS suits a system where accounts serve investors. Where they are the basis of tax or distributable profit, a national framework is entrenched" },
                { aspect: "National interest", left: "—", right: "Loss of sovereignty over financial reporting is politically difficult, and some jurisdictions carve out individual standards" },
                { aspect: "Business culture", left: "—", right: "Principles-based standards require a professional culture comfortable with judgement; not universal" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Note the asymmetry when you write about this. The arguments **for** harmonisation are largely economic and easy to state. The obstacles are **structural** — tax systems, legal systems, and the political difficulty of ceding a national competence. A candidate who lists only cost savings and comparability has answered half the question.",
        },
      ],
    },
    {
      id: "ethics",
      heading: "Creative accounting and the preparer's duty",
      blocks: [
        {
          kind: "text",
          md: "**Creative accounting** is the use of accounting choices, judgements and transaction structuring to present a picture that flatters the entity while remaining arguably within the letter of the standards. It is not always fraud, and that is what makes it a professional problem rather than a legal one.",
        },
        {
          kind: "table",
          caption: "Techniques, and what each one distorts",
          head: ["Technique", "What is done", "What it distorts"],
          rows: [
            ["**Profit smoothing**", "Over-provide in a good year and release the provision in a bad one", "The trend, which is the most decision-relevant thing in the statements"],
            ["**Off balance sheet finance**", "Structure borrowing so it is not recognised as a liability", "Gearing and interest cover; IFRS 16 closed the largest route to this"],
            ["**Window dressing**", "Time transactions round the year end — settle payables early, delay purchases, arrange short-term financing", "Liquidity ratios at the one date users can see"],
            ["**Capitalising expenditure**", "Treat costs as assets when the recognition criteria are not met", "Both profit and total assets, and so every return measure"],
            ["**Revenue recognised early**", "Recognise before control passes, or gross as principal when acting as agent", "Revenue, margin and growth"],
            ["**Reclassification**", "Move recurring costs into an 'exceptional' or 'non-underlying' heading", "The user's view of sustainable earnings, without changing profit at all"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Why 'it complies with the standards' is not a defence",
          md: "Two reasons, and both are examinable.\n\n**Neutrality is a component of faithful representation.** Information presented so as to obtain a particular reaction from users is not neutral, and therefore is not a faithful representation — regardless of whether any specific rule has been broken.\n\n**IAS 1 requires fair presentation.** Compliance with individual standards is presumed to achieve it, but the requirement is fair presentation, and an entity that has complied with every rule while producing a misleading overall picture has not met it.\n\nA question that gives you a director arguing 'we are within the standards' is inviting you to make exactly this point.",
        },
        {
          kind: "example",
          title: "A pressured preparer",
          scenario:
            "You are the financial controller. The draft accounts show a loss of $1.2m; a loan covenant requires a profit. The finance director asks you to (i) capitalise $900,000 of staff costs on a research project as development expenditure, (ii) release $600,000 of a warranty provision on the ground that claims have been low, and (iii) recognise $500,000 of revenue on goods held in the warehouse pending customer collection instructions. Each, they argue, is a matter of judgement.",
          steps: [
            { label: "Take each item on its technical merits, not as a package", detail: "The pressure invites a global answer. The professional response is item by item, because they are not equally objectionable and the analysis differs." },
            { label: "(i) The development costs", detail: "IAS 38 permits capitalisation only when ALL SIX criteria are met, including technical feasibility and the intention and ability to complete. The scenario says RESEARCH, and research must be expensed. If any criterion is unmet, capitalisation is not a judgement — it is a breach. REFUSE." },
            { label: "(ii) The warranty provision release", detail: "This one may be legitimate. If the best estimate of the obligation has genuinely fallen because claims experience has improved, IAS 37 requires the provision to be remeasured, and a release is the correct accounting. The test is whether the revised estimate is supportable by evidence — not whether a release is convenient. CHALLENGE, and seek the claims data." },
            { label: "(iii) The revenue", detail: "Under IFRS 15, revenue arises when control transfers. Bill-and-hold can qualify, but only on strict conditions: a substantive reason for the arrangement, the goods identified as the customer's, ready for physical transfer, and not capable of being redirected to another customer. Ask whether those hold; if they do not, REFUSE." },
            { label: "State the professional obligations engaged", detail: "OBJECTIVITY — do not allow the covenant pressure to determine the accounting. INTEGRITY — do not be associated with statements that are misleading. PROFESSIONAL COMPETENCE AND DUE CARE — apply the standards properly. Note also that the covenant itself is now a disclosure issue: a probable breach is material information for users, and concealing it by manipulating the accounts is the opposite of what should happen." },
            { label: "Follow the escalation", detail: "Document the analysis. Raise it with the finance director in writing, then the audit committee or those charged with governance. Take advice from the professional body's ethics helpline. If the entity insists, consider resignation — and take legal advice before doing so." },
          ],
          result:
            "**Refuse (i) and probably (iii); investigate (ii) on the evidence.** The examinable skill is separating the item that may be a genuine change of estimate from the two that are breaches dressed as judgement — and then naming the principles and the escalation route rather than only saying 'this is unethical'.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Attributing standard-setting to the IFRS Foundation Trustees.", fix: "The Trustees appoint, oversee and fund. Only the IASB issues Standards." },
    { trap: "Treating an IFRIC Interpretation as optional guidance.", fix: "It is authoritative, IASB-approved, and must be applied." },
    { trap: "Listing only the benefits of harmonisation.", fix: "The obstacles are structural — tax and legal systems, national sovereignty, and business culture. Half the marks are there." },
    { trap: "Accepting 'it complies with the standards' as a defence to creative accounting.", fix: "Neutrality is part of faithful representation, and IAS 1 requires fair presentation — not merely rule-by-rule compliance." },
    { trap: "Answering an ethics scenario with a single global judgement.", fix: "Take each proposed adjustment on its own technical merits. Usually one is defensible and the others are not, and the marks are in the distinction." },
  ],
  keyTerms: [
    { term: "IASB", def: "The International Accounting Standards Board — the technical body that develops and issues IFRS Accounting Standards." },
    { term: "IFRS Foundation Trustees", def: "The body that appoints IASB and ISSB members, oversees governance and secures funding. It does not set standards." },
    { term: "IFRS Interpretations Committee", def: "Addresses questions arising on existing standards and issues Interpretations, which are approved by the IASB and are authoritative." },
    { term: "Exposure Draft", def: "The IASB's public proposal for a new or amended standard, issued for comment before finalisation." },
    { term: "Basis for Conclusions", def: "The document accompanying a standard that records the Board's reasoning, including arguments it rejected. Not part of the standard." },
    { term: "Harmonisation", def: "The process of reducing differences between national financial reporting frameworks so that financial statements are comparable across jurisdictions." },
    { term: "Creative accounting", def: "Using accounting choices, judgements or transaction structuring to present a flattering picture while remaining arguably within the letter of the standards." },
    { term: "Window dressing", def: "Timing transactions around the reporting date to improve the appearance of the position at that date, typically liquidity." },
  ],
  summary: [
    "The Monitoring Board oversees the Trustees; the Trustees appoint and fund; the IASB sets standards; the Interpretations Committee interprets them; the Advisory Council advises only.",
    "An IFRIC Interpretation is authoritative and must be applied.",
    "Due process runs from agenda consultation through Discussion Paper and Exposure Draft to the Standard and a post-implementation review. Consultation substitutes for enforcement power the IASB does not have.",
    "Harmonisation improves comparability and cuts multinational reporting cost; its obstacles are tax systems, legal systems, sovereignty and business culture.",
    "Creative accounting breaches neutrality and so faithful representation, even where no individual rule is broken.",
    "In an ethics scenario, analyse each proposed adjustment separately, name the principles engaged, and set out the escalation route.",
  ],
  knowledgeDiagnostic: [
    { q: "Which body appoints IASB members?", a: "The IFRS Foundation Trustees." },
    { q: "Is an IFRIC Interpretation mandatory?", a: "Yes. It is approved by the IASB and carries the same authority as the standard it interprets." },
    { q: "Why does the IASB consult so extensively?", a: "It has no power to enforce its standards. Adoption is a decision for each jurisdiction, so consultation builds the consensus that enforcement would otherwise supply." },
    { q: "Give two structural obstacles to harmonisation.", a: "Legal systems in which the accounts determine tax or distributable profit, and political reluctance to cede a national competence." },
    { q: "Why is 'we complied with every standard' not a defence to a misleading presentation?", a: "Neutrality is a component of faithful representation, and IAS 1 requires fair presentation overall — not only rule-by-rule compliance." },
  ],
  furtherStudy: [
    "Chapter 2 — neutrality, the characteristic creative accounting breaches",
    "Chapter 24 — IAS 1 and the fair presentation requirement",
    "Chapter 33 — how the techniques in this chapter distort the ratios a user computes",
  ],
}

export const FR_TREE_06: StudyChapter = {
  id: "FR-06",
  number: 6,
  paper: "FR",
  area: "A",
  title: "The concepts and principles of groups",
  minutes: 18,
  syllabusRefs: ["A4(a)", "A4(b)", "A4(c)", "A4(d)"],
  intro:
    "Before any consolidation arithmetic: what control means, why a group's accounts exist at all, and why a subsidiary is added in full while an associate is not.",
  outcomes: [
    "Explain the single economic entity concept and why consolidated statements are prepared",
    "Define control and apply the three elements of the IFRS 10 definition",
    "Identify control where the holding is 50% or less, and its absence where the holding exceeds 50%",
    "Distinguish a subsidiary, an associate and a joint venture, and explain the accounting each attracts",
    "Explain what non-controlling interest represents and why it appears within equity",
  ],
  sections: [
    {
      id: "why-consolidate",
      heading: "The single economic entity concept",
      blocks: [
        {
          kind: "text",
          md: "A parent's own financial statements show its investment in a subsidiary as one line: **cost of investment**. That single figure tells a user almost nothing. It does not reveal what the subsidiary owns, what it owes, what it earns, or what risks the group has taken on.\n\nConsolidated financial statements present the parent and its subsidiaries **as if they were one entity** — the single economic entity concept. The legal boundaries between the companies are ignored, because they do not describe the economic unit the user is investing in.",
        },
        {
          kind: "list",
          style: "number",
          title: "What consolidation does mechanically, and why each step follows from the concept",
          items: [
            "**Add the subsidiary's assets and liabilities in FULL**, line by line, however much of it the parent owns. If the parent controls the resources, the group's statements should show the resources — the ownership percentage affects who the returns belong to, not who controls the assets.",
            "**Replace the cost of investment with what it bought** — the subsidiary's identifiable net assets at acquisition plus goodwill. Keeping both would double count.",
            "**Eliminate intra-group balances and transactions.** A single entity cannot owe itself money or sell to itself, so a receivable in one company against a payable in another is not a group asset, and intra-group revenue is not group revenue.",
            "**Show the part of the subsidiary the parent does not own as NON-CONTROLLING INTEREST**, within equity. The group controls all the assets; some of the resulting equity belongs to other shareholders.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The one sentence that unlocks group questions",
          md: "**Consolidation follows CONTROL, not ownership.**\n\nControl decides whether a company is consolidated at all, and drives the full addition of its assets and liabilities. Ownership percentage decides only how the resulting equity and profit are SPLIT between the parent's shareholders and the non-controlling interest.\n\nCandidates who consolidate 80% of a subsidiary's assets have merged the two ideas. Candidates who exclude a company because the parent holds only 45% have looked at ownership when they should have looked at control.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "What the parent's own statements show, against the consolidated ones",
            data: {
              leftTitle: "Parent's individual statements",
              rightTitle: "Consolidated statements",
              rows: [
                { aspect: "The subsidiary appears as", left: "Investment at cost, one line", right: "Its assets and liabilities, in full, line by line" },
                { aspect: "Income from the subsidiary", left: "Dividends received, when declared", right: "The subsidiary's own revenue and expenses, from the date of acquisition" },
                { aspect: "The subsidiary's borrowings", left: "Invisible", right: "Included in group liabilities — which is why group gearing can differ sharply" },
                { aspect: "Intra-group trading", left: "Shown as revenue and purchases", right: "Eliminated entirely" },
                { aspect: "Who the equity belongs to", left: "The parent's shareholders", right: "Split: owners of the parent, and non-controlling interest" },
              ],
            },
          },
        },
      ],
    },
    {
      id: "control",
      heading: "Control: the definition, and the cases that test it",
      blocks: [
        {
          kind: "definition",
          term: "Control (IFRS 10)",
          md: "An investor controls an investee when it is **exposed, or has rights, to variable returns** from its involvement with the investee **and has the ability to affect those returns** through its **power** over the investee. All **three** elements must be present.",
        },
        {
          kind: "list",
          style: "number",
          title: "The three elements",
          items: [
            "**POWER over the investee** — existing rights giving the current ability to direct the activities that significantly affect the investee's returns. Usually a majority of the voting rights, but not necessarily.",
            "**EXPOSURE to variable returns** — the returns must have the potential to vary with the investee's performance. Returns include dividends, changes in the value of the investment, fees, residual interests and cost savings. A fixed, guaranteed return is not variable.",
            "**A LINK between the two** — the ability to use the power to affect the returns. This element rules out an agent: a fund manager may have extensive power over an investee but exercises it on behalf of others, so the link is absent.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Where control is NOT the same as more than half the shares",
          md: "FR examines this deliberately, and in both directions.\n\n**Control with 50% or less.** A holding of, say, 45% can confer control where the remaining shares are widely dispersed and no other shareholder or organised group can outvote the investor in practice — *de facto* control. Control also arises from a contractual agreement with other shareholders, from rights to appoint or remove a majority of the board, or from holding substantive potential voting rights such as currently exercisable options or convertibles.\n\n**No control with more than 50%.** A 60% holding does not confer control if the shares carry no voting rights, if a contract gives another party the right to direct the relevant activities, or if the investee is in administration and the administrator controls it. Nor does it if the only rights held are **protective** — a veto over changing the investee's line of business protects the investor's interest but does not let it direct day-to-day activities.",
        },
        {
          kind: "example",
          title: "Four holdings, four answers",
          scenario:
            "Determine whether Marlow Co controls each investee.\n\n(i) 55% of the ordinary shares of Ashby Co, all carrying one vote each.\n(ii) 42% of Bewdley Co. The remaining 58% is held by around 3,000 shareholders, none with more than 1%, and attendance at general meetings has never exceeded 20% of the shares.\n(iii) 70% of the shares of Corby Co, whose shares carry no voting rights; the voting rights are attached to a separate class held by another party.\n(iv) 30% of Dursley Co, plus currently exercisable options over a further 25% that Marlow can settle at any time for a fixed price well below the current value.",
          steps: [
            { label: "(i) Ashby — 55% with votes", detail: "Power through a majority of voting rights; exposure to variable returns through dividends and value; the link is present. CONTROL. Consolidate as a subsidiary with a 45% non-controlling interest." },
            { label: "(ii) Bewdley — 42% and a dispersed register", detail: "The other 58% is so fragmented that no combination realistically opposes Marlow, and historic attendance means 42% of the shares is comfortably a majority of votes CAST. This is de facto control. CONSOLIDATE — with a 58% non-controlling interest, which surprises candidates but follows directly from control driving consolidation and ownership driving the split." },
            { label: "(iii) Corby — 70% without votes", detail: "No power, because the shares confer no ability to direct the relevant activities and another party holds the votes. NO CONTROL despite a 70% economic interest. Account for it as a financial asset under IFRS 9, or as an associate if the holding gives significant influence." },
            { label: "(iv) Dursley — 30% plus substantive options", detail: "Potential voting rights count when they are SUBSTANTIVE — currently exercisable, and with no economic barrier to exercise. Deeply in-the-money options exercisable at will are substantive, giving Marlow the present ability to command 55%. CONTROL." },
            { label: "Note what did the work in each", detail: "Not the percentage. In (i) the votes, in (ii) the dispersion of the register, in (iii) the absence of votes, in (iv) the substantive nature of the options. The percentage was the least informative fact in three of the four." },
          ],
          result:
            "**Consolidate Ashby, Bewdley and Dursley; do not consolidate Corby.** A 42% holding is consolidated and a 70% holding is not, which is exactly why the syllabus puts the concepts of control in Area A before any arithmetic in Area D.",
        },
      ],
      check: {
        q: "Vale Co holds 45% of Weir Co. The remaining shares are held by several thousand investors, none holding more than 1%, and no other shareholder group acts together. How should Vale account for Weir?",
        options: [
          "Consolidate it as a subsidiary, with a 55% non-controlling interest",
          "Equity account for it as an associate, since 45% is below 50%",
          "Measure it as a financial asset under IFRS 9",
          "Consolidate 45% of its assets and liabilities",
        ],
        correct: 0,
        explain:
          "The dispersed register means no other shareholder or group can outvote Vale, so Vale has de facto control and Weir is a subsidiary. Consolidation follows control, so the assets and liabilities are added in FULL — never proportionately — with the 55% the parent does not own shown as non-controlling interest within equity.",
      },
    },
    {
      id: "sub-assoc-jv",
      heading: "Subsidiary, associate, joint venture — and the accounting each attracts",
      blocks: [
        {
          kind: "table",
          caption: "The three relationships",
          head: ["Relationship", "The test", "Usual indicator", "Accounting"],
          rows: [
            ["**Subsidiary**", "**CONTROL** (IFRS 10)", "More than 50% of voting rights, but see chapter above", "**Full consolidation** — assets and liabilities added in full, with non-controlling interest"],
            ["**Associate**", "**SIGNIFICANT INFLUENCE** — the power to participate in financial and operating policy decisions, without control", "20% to 50% of voting rights, presumed", "**Equity method** (IAS 28) — a single line, cost plus share of post-acquisition profits"],
            ["**Joint venture**", "**JOINT CONTROL** — contractually agreed sharing of control, requiring unanimous consent for decisions about the relevant activities", "Governed by the contract, not the percentage", "**Equity method** — the same as an associate in FR"],
            ["**Investment**", "None of the above", "Below 20%, presumed", "**IFRS 9 financial asset** at fair value"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Significant influence: the evidence, not the percentage",
          md: "The 20% threshold is a **presumption**, rebuttable in both directions. What demonstrates significant influence is:\n\n· representation on the board of directors;\n· participation in policy-making, including decisions about dividends and distributions;\n· material transactions between the two entities;\n· an interchange of management personnel; or\n· the provision of essential technical information.\n\nSo a 15% holding with a board seat and a technology-supply agreement can be an associate, and a 25% holding whose board seat is refused and whose votes are consistently overridden may not be. Say which evidence you are relying on.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Classifying an investment",
            caption: "Work down. The first test passed determines the accounting.",
            data: {
              steps: [
                { label: "Does the investor CONTROL?", sub: "Power + variable returns + the link → SUBSIDIARY, consolidate in full" },
                { label: "Is control JOINT and contractual?", sub: "Unanimous consent required → JOINT VENTURE, equity method" },
                { label: "Is there SIGNIFICANT INFLUENCE?", sub: "Participation without control → ASSOCIATE, equity method" },
                { label: "None of these", sub: "→ FINANCIAL ASSET under IFRS 9, at fair value" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "The reason a subsidiary is consolidated line by line and an associate is not follows from the concepts. The group **controls** the subsidiary's assets, so presenting them as the group's own is a faithful representation. It does **not** control an associate's assets — it merely influences the decisions about them — so adding its inventory to group inventory would assert a control that does not exist. The equity method reports the group's **interest in the associate's net assets** as one figure instead, which is what the group actually has.",
        },
      ],
    },
    {
      id: "nci",
      heading: "Non-controlling interest: what it is, and why it sits in equity",
      blocks: [
        {
          kind: "definition",
          term: "Non-controlling interest",
          md: "The **equity** in a subsidiary **not attributable, directly or indirectly, to the parent**. Presented **within equity** in the consolidated statement of financial position, separately from the equity attributable to the owners of the parent.",
        },
        {
          kind: "text",
          md: "It follows from the single economic entity concept. The group's statements show all of the subsidiary's assets and liabilities, so the equity they generate must be attributed in full too — part to the parent's shareholders, part to the other shareholders of the subsidiary. Neither part is a liability: the group has no obligation to transfer resources to the non-controlling shareholders, who simply own a share of the residual.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Two errors that follow from misreading NCI",
          md: "**Presenting NCI outside equity**, as a liability or as a 'mezzanine' item between liabilities and equity. It is equity, and putting it elsewhere overstates liabilities and understates equity — distorting gearing, which is often the very ratio a Section C requirement asks about.\n\n**Deducting NCI from group profit to reach 'group profit'.** Consolidated profit is the profit of the whole economic entity. It is then ATTRIBUTED between the owners of the parent and the NCI, below the profit line. Total profit does not change, and the entity does not report a profit figure net of NCI.",
        },
        {
          kind: "activity",
          title: "Test the concepts before the arithmetic",
          prompt:
            "A parent acquires 75% of a subsidiary whose only assets are inventory of $400,000 and a building of $1,000,000, and whose only liability is a bank loan of $600,000.\n\nIn the consolidated statement of financial position, what figures appear for inventory, the building and the loan? And what does the non-controlling interest represent?",
          answer:
            "Inventory $400,000, the building $1,000,000 and the loan $600,000 — all in FULL, not at 75%. The group controls the assets and has assumed the obligation, so the single economic entity reports all of them.\n\nThe non-controlling interest represents the other shareholders' 25% share of the subsidiary's net assets — that is, 25% of the equity the subsidiary's $800,000 of net assets generates, adjusted for any fair value adjustments at acquisition and for the group's chosen measurement of NCI at that date.\n\nThe thing to hold onto: the ASSETS are never proportionately consolidated. Only the EQUITY is split. Every consolidation error a candidate makes in Area D can be traced back to one of these two sentences.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Consolidating a percentage of the subsidiary's assets and liabilities.", fix: "Always 100%, however small the holding. The percentage affects only the split of equity and profit between the parent's owners and the NCI." },
    { trap: "Deciding whether to consolidate by looking at the shareholding.", fix: "The test is CONTROL. A 42% holding over a dispersed register is consolidated; a 70% non-voting holding is not." },
    { trap: "Ignoring substantive potential voting rights.", fix: "Currently exercisable, in-the-money options and convertibles count towards power." },
    { trap: "Treating a 20% holding as automatically an associate.", fix: "It is a rebuttable presumption. Look for board representation, participation in policy, material transactions, interchange of management or essential technical information." },
    { trap: "Presenting non-controlling interest outside equity.", fix: "It is equity, shown separately from the equity attributable to the owners of the parent. Misplacing it distorts gearing." },
    { trap: "Reporting group profit net of the NCI share.", fix: "Consolidated profit is the whole entity's. It is ATTRIBUTED below the profit line; the total is unchanged." },
  ],
  keyTerms: [
    { term: "Single economic entity concept", def: "The principle that a parent and its subsidiaries are presented as one entity, the legal boundaries between them being ignored." },
    { term: "Control", def: "Exposure or rights to variable returns from involvement with an investee, combined with power over the investee and the ability to use that power to affect those returns." },
    { term: "De facto control", def: "Control arising without a majority of voting rights, typically because the remaining holdings are so dispersed that no other party or group can outvote the investor in practice." },
    { term: "Substantive potential voting rights", def: "Options or convertibles that are currently exercisable with no economic barrier to exercise, and which therefore count in assessing power." },
    { term: "Protective rights", def: "Rights designed to protect an investor's interest without giving power over the relevant activities — for example a veto over a change in the investee's line of business." },
    { term: "Significant influence", def: "The power to participate in the financial and operating policy decisions of an investee without controlling or jointly controlling those policies. Presumed at 20% to 50%." },
    { term: "Joint control", def: "The contractually agreed sharing of control, existing only when decisions about the relevant activities require the unanimous consent of the sharing parties." },
    { term: "Non-controlling interest", def: "The equity in a subsidiary not attributable, directly or indirectly, to the parent; presented within consolidated equity, separately from the owners of the parent." },
  ],
  summary: [
    "Consolidated statements present the parent and its subsidiaries as a SINGLE ECONOMIC ENTITY, because the legal boundaries do not describe the unit a user invests in.",
    "CONTROL decides whether to consolidate; OWNERSHIP decides only how equity and profit are split.",
    "Control = power + exposure to variable returns + the ability to use the power to affect them. All three.",
    "Control can exist below 50% (de facto control, agreements, substantive options) and can be absent above 50% (non-voting shares, another party's contractual rights, administration).",
    "Subsidiary → full consolidation. Associate (significant influence) and joint venture (joint control) → equity method. Otherwise → IFRS 9 financial asset.",
    "A subsidiary's assets are added in full because the group CONTROLS them; an associate's are not, because it does not.",
    "Non-controlling interest is EQUITY, shown separately within it, and consolidated profit is attributed rather than reduced.",
  ],
  knowledgeDiagnostic: [
    { q: "State the three elements of control.", a: "Power over the investee, exposure or rights to variable returns, and the ability to use the power to affect those returns." },
    { q: "A parent holds 60% of a company whose shares carry no votes, the votes being held by another party. Consolidate?", a: "No. Without power there is no control, whatever the economic interest." },
    { q: "How much of a 55%-owned subsidiary's inventory is consolidated?", a: "All of it. Consolidation follows control; the 45% affects only the split of equity." },
    { q: "Why is an associate not consolidated line by line?", a: "Because the investor does not control its assets — it only influences policy decisions. The equity method reports the interest in the associate's net assets as one figure." },
    { q: "Where does non-controlling interest appear?", a: "Within equity, presented separately from the equity attributable to the owners of the parent." },
    { q: "When can potential voting rights create control?", a: "When they are substantive — currently exercisable with no economic barrier to exercise." },
  ],
  furtherStudy: [
    "Chapters 26 to 28 — the consolidation mechanics that assume everything in this chapter",
    "Chapter 29 — IAS 28 and the equity method in detail",
    "Chapter 32 — why a mid-year acquisition makes a group's ratios non-comparable, which is a direct consequence of the single economic entity concept",
  ],
}
