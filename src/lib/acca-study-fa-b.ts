import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FA · Area B — Qualitative characteristics of financial information.
 * Matches the FA_A exemplar for depth, tone, block variety and visual quality.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const FA_B: StudyChapter = {
  paper: "FA",
  area: "B",
  title: "Qualitative characteristics of financial information",
  minutes: 15,
  intro: "Numbers only help a decision if you can trust them and understand them. This chapter is the quality-control rulebook the Framework uses to decide what makes financial information genuinely useful.",
  outcomes: [
    "State the objective of financial reporting and how the characteristics serve it",
    "Explain the two fundamental characteristics — relevance and faithful representation — and their sub-parts",
    "Apply materiality as the entity-specific side of relevance",
    "Explain the four enhancing characteristics and the cost constraint that limits them all",
    "Explain prudence, substance over form, and going concern as the underlying assumption",
  ],
  sections: [
    {
      id: "objective",
      heading: "The objective — useful information",
      blocks: [
        { kind: "text", md: "In Area A you met the **users** and learned that reporting exists to serve their decisions. But that raises an obvious follow-up: what actually makes a number **useful** to them? A figure can be precise to the penny and still be useless if it answers the wrong question, arrives too late, or quietly flatters the business. The Conceptual Framework answers this with a set of **qualitative characteristics** — the quality-control checklist that separates decision-useful information from noise." },
        { kind: "text", md: "The characteristics come in two tiers. **Fundamental** characteristics are non-negotiable: without them, information is not useful at all. **Enhancing** characteristics make already-useful information *more* useful, but they can never rescue information that fails the fundamentals. Sitting over the whole system is a single **cost constraint** — the benefit of reporting must justify the cost of producing it." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "The hierarchy of qualitative characteristics",
          caption: "Read top to bottom: get the fundamentals right first, then enhance; the whole thing is bounded by cost.",
          data: {
            levels: [
              { label: "Objective: useful financial information", sub: "for investors, lenders and other creditors" },
              { label: "Fundamental: Relevance", sub: "predictive value · confirmatory value · materiality" },
              { label: "Fundamental: Faithful representation", sub: "complete · neutral · free from error" },
              { label: "Enhancing: comparability · verifiability · timeliness · understandability", sub: "make useful information more useful" },
              { label: "Constraint: cost vs benefit", sub: "reporting must be worth what it costs" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one idea", md: "Information must be **both relevant and faithfully represented** to be useful. The enhancing characteristics only raise the quality of information that already clears those two bars — they cannot make irrelevant or unfaithful information useful." },
      ],
    },
    {
      id: "relevance",
      heading: "Fundamental 1 — Relevance",
      blocks: [
        { kind: "text", md: "Information is **relevant** if it is capable of making a difference to a user's decision. Notice the wording: *capable of* making a difference. It doesn't matter whether a particular user actually acts on it — what matters is that it *could* change a decision. Information does this in two ways, and it often does both at once." },
        { kind: "table", caption: "The two forms of relevance", head: ["Form", "What it means", "Everyday example"], rows: [
          ["Predictive value", "Helps users forecast future outcomes", "This year's revenue trend helps predict next year's cash"],
          ["Confirmatory value", "Confirms or corrects earlier expectations", "Actual profit confirms (or overturns) last year's forecast"],
        ] },
        { kind: "text", md: "The two are not opposites — the same figure usually has both. Last year you predicted a profit; this year's actual result both **confirms** whether that prediction was right *and* gives you a fresh base to **predict** next year. That feedback loop is exactly why relevant information keeps decisions honest over time." },
        { kind: "callout", tone: "rule", title: "Materiality — relevance made specific", md: "**Materiality** is the entity-specific side of relevance. Information is material if omitting, misstating or obscuring it could reasonably influence users' decisions. It is judged by **size and nature together** — a small amount can still be material because of *what* it is (for example, a fraud by a director, or a payment that tips a profit into a loss)." },
        { kind: "example", title: "Worked example — is it material?", scenario: "Delta Ltd reports revenue of $40 million and profit of $2 million. Two issues arise: (a) a $15,000 error in the office stationery expense, and (b) a $9,000 unauthorised payment made personally to a director that was hidden in 'sundry expenses'. Which, if either, is material?", steps: [
          { label: "Test (a) by size", detail: "$15,000 against $2m profit is under 1% and routine in nature → unlikely to change any user's decision." },
          { label: "Conclusion on (a)", detail: "Not material by size or nature — correcting it would not sway a decision." },
          { label: "Test (b) by size", detail: "$9,000 is even smaller than the stationery error, so by amount alone it looks trivial." },
          { label: "Test (b) by nature", detail: "But it is an undisclosed related-party payment to a director, hidden from users — its *nature* is what matters." },
          { label: "Conclusion on (b)", detail: "Material despite the tiny amount: users care that a director took company money without authority." },
        ], result: "Materiality is not just a percentage. A larger figure (a) can be immaterial while a much smaller one (b) is material because of what it reveals. Always test size AND nature." },
      ],
      check: {
        q: "A financial figure is described as having 'confirmatory value'. What does this mean?",
        options: [
          "It helps users predict the company's future results",
          "It confirms or corrects users' previous evaluations",
          "It is large enough to influence a decision",
          "It has been checked and confirmed by the auditor",
        ],
        correct: 1,
        explain: "Confirmatory value means the information provides feedback on — confirms or changes — earlier expectations. Predicting the future is predictive value; being large enough to matter is materiality; auditor checking relates to verifiability. All are separate ideas.",
      },
    },
    {
      id: "faithful",
      heading: "Fundamental 2 — Faithful representation",
      blocks: [
        { kind: "text", md: "Relevant information is worthless if it is wrong. **Faithful representation** means the numbers depict the economic reality they claim to depict — not a flattering or convenient version of it. The Framework breaks a *perfectly* faithful representation into three attributes. You will rarely achieve all three perfectly, but they are the target." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The three attributes of faithful representation",
          caption: "A perfectly faithful representation would be all three; in practice, maximise each as far as cost allows.",
          data: {
            items: [
              { title: "Complete", sub: "Includes all information needed to understand the item — nothing material left out" },
              { title: "Neutral", sub: "Free from bias — not slanted to produce a desired result, supported by prudence" },
              { title: "Free from error", sub: "No errors or omissions in the description and process — not the same as perfectly accurate" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "\"Free from error\" is not \"100% accurate\"", md: "Free from error means there are no errors in the *process* and no misleading omissions — **not** that every figure is exact to the penny. Many amounts are **estimates** (a depreciation rate, a doubtful-debt allowance). An estimate can be faithfully represented as long as it is described clearly as an estimate and the method is applied without error." },
        { kind: "text", md: "**Neutrality** is the attribute most under pressure in real life. Managers are paid on the results they report, so there is a constant pull toward optimistic numbers. Neutrality resists that pull — the accounts should not be tilted to make performance look better or worse than it was. As you will see, **prudence** is what supports neutrality rather than working against it." },
      ],
      check: {
        q: "A company records a machine at its depreciated estimate of $48,000 rather than an exact figure. Providing the estimate is described clearly and calculated properly, this can still be:",
        options: [
          "Irrelevant, because estimates are never useful",
          "A faithful representation, because 'free from error' allows well-made estimates",
          "A breach of neutrality",
          "Impossible under the accruals basis",
        ],
        correct: 1,
        explain: "'Free from error' does not demand perfect accuracy — it allows estimates provided they are clearly described as estimates and the method is applied without error. Depreciation is inherently an estimate, so a properly made and disclosed figure is faithfully represented.",
      },
    },
    {
      id: "enhancing",
      heading: "The four enhancing characteristics",
      blocks: [
        { kind: "text", md: "Once information is relevant and faithfully represented, four **enhancing** characteristics push its usefulness higher. They are the polish, not the substance — the memory hook is **\"CVTU\"**: **C**omparability, **V**erifiability, **T**imeliness, **U**nderstandability. Crucially, they cannot make bad information good, and they sometimes pull against each other." },
        { kind: "diagram", diagram: {
          type: "radial",
          title: "The four enhancing characteristics",
          caption: "Each raises the usefulness of information that is already relevant and faithful.",
          data: {
            centre: "Useful information",
            nodes: [
              { label: "Comparability", sub: "across time and between entities" },
              { label: "Verifiability", sub: "independent observers agree" },
              { label: "Timeliness", sub: "available before it loses value" },
              { label: "Understandability", sub: "clear to a diligent user" },
            ],
          },
        } },
        { kind: "table", caption: "The four enhancing characteristics, unpacked", head: ["Characteristic", "What it demands", "Watch out for"], rows: [
          ["Comparability", "Like items look alike across periods and entities; consistency of policy supports it", "Comparability is NOT the same as uniformity — different things should look different"],
          ["Verifiability", "Knowledgeable, independent observers could agree the figure is a faithful depiction", "Direct (recount the cash) vs indirect (re-run the method) verification"],
          ["Timeliness", "Information is available in time to influence the decision", "Old information loses relevance; but rushing can harm faithful representation"],
          ["Understandability", "Presented clearly and concisely for a user with reasonable business knowledge", "Complex items are NOT omitted just because they are hard — that would lose relevance"],
        ] },
        { kind: "callout", tone: "tip", title: "Two classic clarifications", md: "**Comparability ≠ uniformity:** forcing unlike transactions to look identical destroys comparability rather than helping it. **Understandability** assumes a user with *reasonable* diligence and business knowledge — genuinely complex information is still reported, not dropped, because leaving it out would break relevance." },
        { kind: "text", md: "Because the four can conflict, preparers **balance** them. The sharpest trade-off is **timeliness vs faithful representation**: wait for every last figure to be perfect and the report may be too late to matter; publish too fast and you risk errors. The Framework accepts a sensible balance rather than pretending one always wins." },
      ],
      check: {
        q: "Which statement about the enhancing characteristics is correct?",
        options: [
          "They can make irrelevant information useful if applied together",
          "Comparability requires every entity to use identical accounting policies",
          "They enhance information that is already relevant and faithfully represented, and can trade off against each other",
          "Timeliness always overrides faithful representation",
        ],
        correct: 2,
        explain: "Enhancing characteristics only raise the quality of information that is already relevant and faithful — they cannot rescue poor information, and they can conflict (e.g. timeliness vs faithful representation) so preparers balance them. Comparability is not uniformity, and no single characteristic automatically overrides another.",
      },
    },
    {
      id: "prudence-substance",
      heading: "Prudence, substance over form and the cost constraint",
      blocks: [
        { kind: "text", md: "Three ideas make the characteristics work in practice. Two support **faithful representation**; the third **limits** the whole system." },
        { kind: "callout", tone: "rule", title: "Prudence supports neutrality", md: "**Prudence** is caution when making judgements under uncertainty: assets and income are not overstated, and liabilities and expenses are not understated. Modern prudence is **not** deliberately pessimistic — it does *not* mean creating hidden reserves or understating profit on purpose. That would breach neutrality just as much as over-optimism does. Prudence exists to *protect* neutrality, not to override it." },
        { kind: "text", md: "**Substance over form** means transactions are reported according to their **economic reality**, not merely their legal wrapping. When the two diverge, substance wins — otherwise a business could hide reality behind clever paperwork and still claim faithful representation." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Substance over form — when legal form and reality diverge",
          caption: "The accounts follow the right-hand column.",
          data: {
            leftTitle: "Legal form (what the paperwork says)",
            rightTitle: "Economic substance (what really happens)",
            rows: [
              { aspect: "Asset sold then leased back", left: "Legally sold — no longer owned", right: "Still used and controlled by the seller" },
              { aspect: "Goods 'on sale or return'", left: "Legally delivered to the customer", right: "Risks and rewards may still sit with the seller" },
              { aspect: "Reported treatment", left: "Ignore — form alone can mislead", right: "Follow substance for a faithful picture" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "The cost constraint", md: "Reporting is not free — gathering, checking and disclosing information costs money and effort. The **cost constraint** says the **benefit** of information must justify the **cost** of providing it. It is the only constraint that applies to the whole framework, and it explains why the Framework demands *useful* information rather than *all conceivable* information." },
        { kind: "text", md: "Underlying everything is one **assumption**: **going concern**. The statements are prepared on the basis that the business will continue in operation for the foreseeable future — so assets are carried at cost-based values rather than fire-sale amounts, and liabilities fall due on their normal terms. If that assumption fails — the business is closing or forced to liquidate — a completely different, break-up basis of measurement applies, and users must be told." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Going concern — the assumption behind measurement",
          caption: "Assess going concern first; it decides which measurement basis the whole statements use.",
          data: {
            steps: [
              { label: "Assess going concern", sub: "will the business continue for the foreseeable future?" },
              { label: "If yes → going concern basis", sub: "normal cost-based measurement" },
              { label: "If no → break-up basis", sub: "assets at recoverable/net realisable amounts" },
              { label: "Disclose", sub: "tell users the basis used and any material uncertainty" },
            ],
          },
        } },
      ],
    },
  ],
  examTraps: [
    { trap: "Thinking prudence means deliberately understating profit or creating hidden reserves.", fix: "Prudence is caution under uncertainty — don't overstate assets/income or understate liabilities/expenses. Deliberate understatement breaches neutrality." },
    { trap: "Treating 'free from error' as 'perfectly accurate'.", fix: "It allows well-made, clearly-described estimates. It means no errors in the process and no misleading omissions — not penny-perfect figures." },
    { trap: "Confusing comparability with uniformity.", fix: "Comparability means like looks like, and unlike looks different. Forcing everything to look identical destroys comparability." },
    { trap: "Judging materiality on size alone.", fix: "Materiality depends on size AND nature. A tiny amount (e.g. a director's fraud) can be material because of what it is." },
    { trap: "Calling relevance or faithful representation an 'enhancing' characteristic.", fix: "Those two are FUNDAMENTAL. The four enhancing ones are comparability, verifiability, timeliness, understandability." },
  ],
  keyTerms: [
    { term: "Relevance", def: "Information is relevant if it is capable of making a difference to a user's decision — through predictive value, confirmatory value, or both." },
    { term: "Materiality", def: "The entity-specific side of relevance: information is material if omitting, misstating or obscuring it could reasonably influence users' decisions, judged by size and nature." },
    { term: "Faithful representation", def: "Depicting economic reality completely, neutrally and free from error, rather than a flattering or convenient version of it." },
    { term: "Prudence", def: "The exercise of caution under uncertainty so assets and income are not overstated and liabilities and expenses are not understated — supporting neutrality, not deliberate pessimism." },
    { term: "Substance over form", def: "Reporting transactions according to their economic reality rather than merely their legal form when the two differ." },
  ],
  summary: [
    "The objective is useful information; characteristics are the quality-control checklist that delivers it.",
    "Two FUNDAMENTAL characteristics: relevance (predictive/confirmatory value + materiality) and faithful representation (complete, neutral, free from error).",
    "Four ENHANCING characteristics — comparability, verifiability, timeliness, understandability — raise usefulness but cannot rescue poor information and can trade off.",
    "Prudence supports neutrality (no over- or understatement); substance over form follows economic reality; a cost constraint bounds the whole framework.",
    "Going concern is the underlying assumption; if it fails, a break-up basis applies and users must be told.",
  ],
}
