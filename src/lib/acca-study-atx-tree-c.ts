import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * ATX-UK · Area C (tax planning and its ethics), D (professional skills) and
 * E (employability and technology skills).
 *
 *   ATX-27  Investments and expenditure that reduce tax (C1)
 *   ATX-28  Legitimate planning measures                (C2)
 *   ATX-29  Suitability for the particular client       (C3)
 *   ATX-30  Demonstrating the mitigation                (C4)
 *   ATX-31  The ethics of tax planning                  (C5)
 *   ATX-32  Professional skills                         (D)
 *   ATX-33  Employability and technology skills         (E)
 *
 * ATX-31 carries the five ethics marks that Section A awards in EVERY sitting.
 * They are the most reliably available marks on the paper and the ones least
 * often prepared for, which is why the chapter is written as a set of routines
 * rather than as a description of the Code.
 *
 * See acca-study-atx-tree-a.ts for the Finance Act 2025 and rates rules
 * governing this whole paper.
 */

const ATX_TREE_27: StudyChapter = {
  paper: "ATX",
  id: "ATX-27",
  number: 27,
  area: "C",
  syllabusRefs: ["C1"],
  title: "Investments and expenditure that reduce tax",
  minutes: 15,
  intro:
    "Parliament offers relief where it wants behaviour changed. Knowing which behaviour each relief is buying tells you both when it applies and when recommending it would be wrong.",
  outcomes: [
    "Identify the investments and expenditure that reduce an individual's or a business's tax",
    "Explain the behaviour each relief is designed to encourage",
    "Quantify the after-tax cost of a reliefed investment",
    "Recognise where relief is available but the underlying investment is unsuitable",
    "Match a relief to a client's actual position",
  ],
  sections: [
    {
      id: "the-menu",
      heading: "What reduces tax, and why it exists",
      blocks: [
        {
          kind: "table",
          caption: "Relief, and the behaviour it buys",
          head: ["Relief", "Encourages", "Available to"],
          rows: [
            ["Pension contributions", "Long-term saving for retirement", "Individuals, and employers contributing for staff"],
            ["Venture capital schemes", "Investment in small, high-risk trading companies", "Individuals"],
            ["Gift aid", "Charitable giving", "Individuals; extends the basic rate band"],
            ["Capital allowances", "Investment in plant and qualifying assets", "Businesses"],
            ["Research and development relief", "Advancing science and technology", "Companies"],
            ["Business and agricultural property relief", "Keeping businesses and farms intact across generations", "Estates and lifetime transfers"],
            ["Rollover and gift relief", "Reinvestment and business succession rather than extraction", "Businesses and owners"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Reading the purpose tells you the conditions",
          md: "Every condition attaching to a relief exists to make sure the behaviour actually happens. Venture capital schemes carry **minimum holding periods** because Parliament wanted patient capital, not a round trip. Business property relief requires the donee to **still own qualifying property at death** because it is protecting continuing businesses, not sheltering value. Reasoning from purpose to condition is far more reliable than memorising lists, and it produces the right answer on an unfamiliar variant.",
        },
        {
          kind: "example",
          title: "The after-tax cost of a reliefed investment",
          scenario:
            "A higher-rate taxpayer invests £20,000 in a scheme giving income tax relief as a tax reducer at 30%, with gains exempt after the holding period. Figures are illustrative.",
          steps: [
            { label: "Relief", detail: "£20,000 × 30% = £6,000 reduction in the tax liability, provided the liability is at least that." },
            { label: "Net cost", detail: "£20,000 − £6,000 = £14,000 of the client's own money at risk." },
            { label: "The break-even", detail: "The investment can fall by 30% before the client is worse off than not investing." },
            { label: "The caveat", detail: "Relief is capped at the tax otherwise payable, and is withdrawn if the shares are sold within the holding period." },
          ],
          result:
            "Expressing relief as a reduction in the amount genuinely at risk is what makes it meaningful to a client — and it also frames the risk honestly, since 30% of a total loss is still a total loss of the remaining 70%.",
        },
      ],
      check: {
        q: "Why do venture capital schemes impose a minimum holding period?",
        options: [
          "To simplify HMRC's administration",
          "Because the relief exists to encourage patient capital in small companies — without a holding period an investor could take the relief and exit immediately, which would not deliver the behaviour Parliament was buying",
          "Because share values are volatile in the first years",
          "To prevent investors from claiming relief twice",
        ],
        correct: 1,
        explain:
          "Reasoning from the purpose of a relief to its conditions is a reliable technique across the whole paper. It explains not just this condition but the clawback on early disposal, and it generalises to reliefs you have not memorised.",
      },
    },
    {
      id: "suitability-preview",
      heading: "Relief available is not the same as advice justified",
      blocks: [
        {
          kind: "callout",
          tone: "warn",
          title: "The tail wagging the dog",
          md: "A relief makes an investment **cheaper**; it does not make it **suitable**. A client who needs access to their money within three years should not be in a venture capital scheme however attractive the relief, and a client with no appetite for risk should not hold unquoted trading shares. An answer recommending a relief without addressing whether the underlying investment suits the client has given advice a regulator would criticise — and the examiner marks it as incomplete.",
        },
        {
          kind: "table",
          caption: "Checks before recommending a tax-motivated investment",
          head: ["Check", "The question"],
          rows: [
            ["Liquidity", "Will the client need this money before the holding period ends?"],
            ["Risk", "Can they bear a total loss of the net amount invested?"],
            ["Concentration", "How much of their wealth would be in one small company?"],
            ["Tax capacity", "Is their liability large enough to absorb the relief?"],
            ["Alternatives", "Would a pension or ISA achieve more of what they want?"],
            ["Exit", "How and when will they realise the investment?"],
          ],
        },
        {
          kind: "text",
          md: "The **tax capacity** check is the one most often missed. Relief given as a tax reducer cannot exceed the liability otherwise payable, so a client whose liability is £4,000 gains nothing from relief nominally worth £6,000. Checking that the client can actually use the relief before recommending the investment is elementary and frequently omitted.",
        },
      ],
      check: {
        q: "A client with an income tax liability of £3,000 is offered an investment giving relief nominally worth £9,000. What is the position?",
        options: [
          "They will receive a £6,000 repayment",
          "Relief as a tax reducer cannot exceed the liability, so only £3,000 is usable — the remainder is wasted, and the investment should be sized to the client's actual tax capacity",
          "The excess relief carries forward automatically",
          "The relief can be transferred to their spouse",
        ],
        correct: 1,
        explain:
          "A tax reducer can bring the liability to nil but no further, so relief beyond that produces nothing. Sizing the investment to the liability is the practical advice, and it is a check that takes seconds and is routinely skipped.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing reliefs without connecting them to the client's position.", fix: "Match each to the client's liability, objectives and risk tolerance." },
    { trap: "Recommending relief exceeding the client's tax capacity.", fix: "A tax reducer cannot exceed the liability otherwise payable." },
    { trap: "Treating a relief as making an investment suitable.", fix: "It makes it cheaper; suitability is a separate question." },
    { trap: "Memorising conditions.", fix: "Reason from the behaviour the relief exists to encourage." },
  ],
  keyTerms: [
    { term: "Tax capacity", def: "The liability available to absorb a tax reducer, beyond which further relief produces no benefit." },
    { term: "After-tax cost", def: "The amount of a client's own money genuinely at risk in a reliefed investment, after the tax relief obtained." },
  ],
  summary: [
    "Every relief buys a behaviour, and its conditions exist to ensure that behaviour happens.",
    "Express relief as the reduction in money genuinely at risk.",
    "Check tax capacity — a tax reducer cannot exceed the liability.",
    "Relief makes an investment cheaper, never automatically suitable.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does reasoning from a relief's purpose beat memorising its conditions?", a: "The conditions exist to ensure the intended behaviour occurs, so the purpose predicts them — and generalises to reliefs you have not memorised." },
    { q: "What limits the benefit of a tax reducer?", a: "The tax liability otherwise payable; relief cannot reduce it below nil or generate a repayment." },
    { q: "What must be established before recommending a tax-motivated investment?", a: "Liquidity needs, risk tolerance, concentration, tax capacity, alternatives and the exit route." },
  ],
  furtherStudy: [
    "ATX-06 covers the venture capital schemes in technical detail.",
    "ATX-29 develops the suitability assessment introduced here.",
    "ATX-31 covers the ethical dimension of recommending tax-motivated arrangements.",
  ],
}

const ATX_TREE_28: StudyChapter = {
  paper: "ATX",
  id: "ATX-28",
  number: 28,
  area: "C",
  syllabusRefs: ["C2"],
  title: "Legitimate planning measures",
  minutes: 16,
  intro:
    "The distinction the paper is built on: arranging affairs to use the reliefs Parliament provided, versus constructing arrangements to defeat what Parliament intended.",
  outcomes: [
    "Distinguish tax planning, avoidance and evasion",
    "Identify the standard legitimate planning measures across the taxes",
    "Explain why substance and commercial purpose determine the outcome",
    "Recognise arrangements likely to be challenged",
    "Advise a client who proposes an aggressive arrangement",
  ],
  sections: [
    {
      id: "the-spectrum",
      heading: "Planning, avoidance and evasion",
      blocks: [
        {
          kind: "table",
          caption: "The spectrum",
          head: ["", "Planning", "Avoidance", "Evasion"],
          rows: [
            ["What it is", "Using reliefs as Parliament intended", "Arrangements complying with the letter while defeating the purpose", "Misrepresenting or concealing the facts"],
            ["Legality", "Lawful", "Lawful in form, but may be counteracted", "Criminal"],
            ["Examples", "Pension contributions, spouse transfers, timing a disposal, claiming a relief", "Contrived steps with no commercial purpose beyond tax", "Understating income, hiding a gain, false expense claims"],
            ["Adviser's position", "Recommend where suitable", "Advise on risk, cost and reputation; decline where it crosses into abuse", "Must never assist; reporting obligations arise"],
            ["Likely outcome", "Works", "May be counteracted, with interest, penalties and cost", "Prosecution and penalties"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Substance is what separates the first two",
          md: "A transaction with a **genuine commercial purpose**, whose tax treatment follows from what actually happened, is planning. A series of steps inserted **solely** to produce a tax outcome, which a person would not otherwise take, is avoidance — and the general anti-abuse rule, targeted anti-avoidance rules and the courts' purposive approach to construction all attack it. So the question to ask about any arrangement is: **would the client do this if there were no tax saving?**",
        },
        {
          kind: "text",
          md: "The consequence for advice is that 'it works technically' is no longer an answer. An arrangement may be counteracted years later, with interest running throughout, penalties, professional costs and — increasingly — reputational exposure for both client and adviser. Setting out those consequences is the honest response to a client attracted by an aggressive scheme, and it is usually more persuasive than a moral argument.",
        },
      ],
      check: {
        q: "A client proposes a series of transactions that individually comply with the legislation but exist only to generate a loss. How should the adviser respond?",
        options: [
          "Implement it, since each step is lawful",
          "Explain that arrangements without commercial purpose are vulnerable to the general anti-abuse rule and targeted provisions — so the saving may be counteracted with interest, penalties and cost years later — and decline to be associated with it if it is abusive",
          "Report the client to HMRC immediately",
          "Implement it but exclude liability in the engagement letter",
        ],
        correct: 1,
        explain:
          "Technical compliance no longer determines the outcome, so the professional answer sets out the real risk and cost rather than either implementing or moralising. Reporting arises only where there is suspicion of a criminal offence such as evasion, which proposing an aggressive but lawful scheme is not, and a disclaimer does not cure participation in abuse.",
      },
    },
    {
      id: "the-standard-measures",
      heading: "The measures that are simply good practice",
      blocks: [
        {
          kind: "table",
          caption: "Legitimate planning across the taxes",
          head: ["Tax", "Standard measures"],
          rows: [
            ["Income tax", "Pension contributions; gift aid; using both spouses' allowances and bands; timing income where there is discretion; choosing between salary and dividend"],
            ["Capital gains tax", "Using the annual exempt amount every year; splitting disposals across tax years; transferring to a spouse before sale; claiming the appropriate business relief"],
            ["Inheritance tax", "Using the annual and normal expenditure exemptions; making gifts early enough to survive seven years; preserving business and agricultural relief; claiming a transferable nil rate band"],
            ["Corporation tax", "Group relief to the highest-rate company; timing capital expenditure; claiming research and development relief where it genuinely applies"],
            ["VAT and stamp taxes", "Using the going concern rules; considering the share-versus-asset structure on a sale"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "This table is the answer to most planning requirements",
          md: "None of it is clever, and that is the point. The overwhelming majority of marks in ATX planning questions come from applying **ordinary, intended reliefs correctly to the client's facts** — using allowances that would otherwise expire, spacing gifts, choosing the right relief, timing a disposal. Candidates reaching for something ingenious usually miss the straightforward marks sitting in front of them.",
        },
      ],
      check: {
        q: "Which best describes the planning that earns most marks in an ATX question?",
        options: [
          "Ingenious structures that produce large savings",
          "Straightforward application of ordinary reliefs to the client's facts — using annual allowances, spacing gifts across seven years, choosing the right relief, timing disposals across tax years",
          "Offshore arrangements",
          "Arrangements that have been disclosed to HMRC",
        ],
        correct: 1,
        explain:
          "The examinable skill is applying the intended reliefs precisely to a specific set of facts, not inventing schemes. Most available marks sit in allowances that would otherwise be wasted and in the correct choice between competing reliefs.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating avoidance and evasion as the same.", fix: "One is lawful but challengeable; the other is criminal, and the adviser's duties differ entirely." },
    { trap: "Concluding an arrangement works because each step is lawful.", fix: "Ask whether the client would do it absent the tax saving." },
    { trap: "Reaching for ingenious planning.", fix: "Most marks are in ordinary reliefs applied correctly." },
    { trap: "Relying on a disclaimer.", fix: "It does not cure participation in an abusive arrangement." },
  ],
  keyTerms: [
    { term: "Tax avoidance", def: "Arrangements complying with the letter of the law while defeating its purpose, which may be counteracted." },
    { term: "Tax evasion", def: "Misrepresenting or concealing facts to reduce tax — a criminal offence the adviser must never assist." },
    { term: "Commercial purpose", def: "A genuine non-tax reason for a transaction, which is what distinguishes planning from avoidance." },
  ],
  summary: [
    "Planning uses intended reliefs; avoidance defeats their purpose; evasion misrepresents the facts.",
    "Substance decides: would the client do this absent the tax saving?",
    "Technical compliance no longer guarantees the outcome.",
    "Most ATX planning marks come from ordinary reliefs applied precisely.",
  ],
  knowledgeDiagnostic: [
    { q: "What single question separates planning from avoidance?", a: "Would the client undertake this transaction if there were no tax saving?" },
    { q: "Why is 'it works technically' insufficient?", a: "The general anti-abuse rule, targeted provisions and purposive construction can counteract arrangements years later, with interest, penalties and cost." },
    { q: "Where do most ATX planning marks actually sit?", a: "In applying ordinary reliefs correctly — annual allowances, spacing gifts, choosing the right relief and timing disposals." },
  ],
  furtherStudy: [
    "ATX-31 covers the adviser's ethical duties when a client proposes an aggressive arrangement.",
    "ATX-26 covers the disclosure regime and the general anti-abuse rule.",
    "ATX-27 covers the reliefs this chapter recommends applying.",
  ],
}

const ATX_TREE_29: StudyChapter = {
  paper: "ATX",
  id: "ATX-29",
  number: 29,
  area: "C",
  syllabusRefs: ["C3"],
  title: "Suitability for the particular client",
  minutes: 15,
  intro:
    "The syllabus asks whether a measure is appropriate given the taxpayer's circumstances or stated objectives. That word — appropriate — is what stops tax advice being arithmetic.",
  outcomes: [
    "Assess whether a planning measure suits a specific client's circumstances",
    "Identify the client facts that change the recommendation",
    "Recognise when the tax-optimal answer is the wrong advice",
    "Weigh a client's stated objectives against their unstated needs",
    "State the circumstances in which the advice would change",
  ],
  sections: [
    {
      id: "the-facts-that-decide",
      heading: "The client facts that decide the answer",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Scenario detail is never decoration",
          md: "An ATX scenario states the client's **age, health, family, income needs, other assets, attitude to risk and intentions** because those facts decide between routes that are otherwise close. A candidate who computes without using them has treated the question as arithmetic. When a scenario mentions that a client is in poor health, or that a daughter has no interest in the business, the examiner has just told you what the answer is.",
        },
        {
          kind: "table",
          caption: "How a fact changes the recommendation",
          head: ["Client fact", "Consequence for advice"],
          rows: [
            ["Elderly or in poor health", "The seven-year survival period is unlikely — gifting may incur a gain without escaping inheritance tax"],
            ["Needs the income from the asset", "Outright gifting is unavailable; consider retaining an income interest or gifting a different asset"],
            ["Donee may sell soon", "Deferral reliefs transfer a liability rather than removing it; and business relief could be lost"],
            ["Low risk tolerance", "Venture capital schemes are unsuitable whatever the relief"],
            ["Cash constrained", "A relief producing a repayment now beats a larger saving later"],
            ["Family disagreement", "Trust arrangements offering flexibility may be preferable to outright transfers"],
            ["Intends to emigrate", "Timing relative to 5 April and the residence tests changes everything"],
          ],
        },
        {
          kind: "text",
          md: "The **unstated need** matters as much as the stated objective. A client who says they want to minimise inheritance tax usually also wants to keep enough to live on, retain some control, and be fair between their children. Advice that achieves the stated objective while defeating the unstated ones will not be taken — and identifying the tension is exactly what the professional-skills marks reward.",
        },
      ],
      check: {
        q: "A client aged 78 wants to reduce their estate but relies on the rental income from the property in question. What is the difficulty with an outright gift?",
        options: [
          "None — the gift removes the property from the estate after seven years",
          "It removes the income they depend on, and if they continue to receive it the gift with reservation rules mean the property stays in the estate anyway — so the arrangement fails on both counts",
          "The property cannot be gifted while let",
          "The seven-year period does not apply to property",
        ],
        correct: 1,
        explain:
          "The client cannot both give the asset away and keep its benefit: retaining the income makes it a gift with reservation, so it remains in the estate while the capital gain may still have been triggered. Identifying that the stated objective conflicts with an unstated need is the substance of the advice.",
      },
    },
    {
      id: "when-optimal-is-wrong",
      heading: "When the tax-optimal answer is the wrong advice",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "Situations where the lowest tax loses",
          items: [
            "**The client cannot afford the risk** — a relief attached to an unsuitable investment",
            "**The saving is conditional on events they do not control** — survival, a donee's decisions, continued qualifying status",
            "**It removes flexibility they will need** — locking assets into a trust when family circumstances are unsettled",
            "**It costs more to implement than it saves** — professional fees and ongoing administration on a modest saving",
            "**It creates family conflict** — an arrangement favouring one child over another",
            "**The client will not understand or maintain it** — a structure requiring annual compliance the client will not do",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The last one is more common than it sounds",
          md: "A structure needing annual elections, records and filings only works if somebody actually does them. A client who will not maintain it ends up worse off than with a simpler arrangement — relief lost, penalties incurred, and the cost of unwinding it. Recommending the **simpler** route on those grounds is a genuine and defensible piece of commercial judgement.",
        },
        {
          kind: "text",
          md: "Finish every recommendation with the **sensitivity**: which fact, if it changed, would change the advice. It anchors the recommendation in the client's circumstances, tells them when to come back, and demonstrates that the adviser understood the decision rather than the computation.",
        },
      ],
      check: {
        q: "A complex structure would save a client £4,000 a year but requires annual elections and filings the client is unlikely to maintain. What should be recommended?",
        options: [
          "The structure, since it produces the largest saving",
          "A simpler arrangement — a structure that is not maintained loses its relief and can incur penalties, so the realistic saving is lower and may be negative once the client's likely behaviour is taken into account",
          "The structure, with a warning about the filings",
          "No planning at all",
        ],
        correct: 1,
        explain:
          "Advice must reflect what the client will actually do, not what an ideal client would do. A structure requiring maintenance the client will not provide fails in practice, so recommending the simpler route is the commercially sound answer rather than a timid one.",
      },
    },
  ],
  examTraps: [
    { trap: "Ignoring the client's age, health and income needs.", fix: "They are supplied because they decide the answer." },
    { trap: "Recommending an outright gift where the client needs the benefit.", fix: "Gift with reservation rules leave the asset in the estate." },
    { trap: "Assuming the lowest tax is the best advice.", fix: "Risk, flexibility, conditionality and implementation all count." },
    { trap: "Omitting the sensitivity.", fix: "Say which changed fact would change the recommendation." },
  ],
  keyTerms: [
    { term: "Gift with reservation", def: "A gift from which the donor continues to benefit, so that the property remains in their estate for inheritance tax despite the transfer." },
    { term: "Suitability", def: "Whether a planning measure fits the client's circumstances, objectives and capacity, as distinct from whether it saves tax." },
  ],
  summary: [
    "Scenario facts about age, health, needs and intentions decide between close routes.",
    "A client cannot give an asset away and keep its benefit.",
    "The lowest-tax route loses where it is risky, conditional, inflexible or unmaintainable.",
    "End with the sensitivity: which changed fact would change the advice.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is a client's age and health supplied in a gifting scenario?", a: "Because the seven-year survival period determines whether a gift escapes inheritance tax, so their likelihood of surviving it decides the recommendation." },
    { q: "What is a gift with reservation?", a: "A gift from which the donor continues to benefit, leaving the asset in their estate despite the transfer." },
    { q: "When is a simpler arrangement the better recommendation?", a: "Where a complex structure requires ongoing compliance the client will not maintain, so the relief is lost and penalties may follow." },
  ],
  furtherStudy: [
    "ATX-25 covers weighing the alternatives this suitability assessment chooses between.",
    "ATX-27 covers the reliefs whose suitability is being tested.",
    "ATX-31 covers the ethical duty to give advice the client can act on.",
  ],
}

const ATX_TREE_30: StudyChapter = {
  paper: "ATX",
  id: "ATX-30",
  number: 30,
  area: "C",
  syllabusRefs: ["C4"],
  title: "Demonstrating the mitigation",
  minutes: 15,
  intro:
    "The syllabus asks for mitigation shown by numerical analysis and reasoned argument. Both words matter — a number without an argument, or an argument without a number, is half an answer.",
  outcomes: [
    "Present a numerical comparison that supports a recommendation",
    "Show the saving achieved by the recommended course",
    "Set out the reasoning where a numerical comparison is not possible",
    "Present workings a marker can follow and give method marks for",
    "Combine calculation and narrative as the exam requires",
  ],
  sections: [
    {
      id: "showing-the-saving",
      heading: "Showing the saving",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Compute both positions, then the difference",
          md: "The clearest demonstration of mitigation is **the liability without the measure, the liability with it, and the saving** — three figures a client can read at a glance. Candidates frequently compute only the recommended position, which shows the answer but not the benefit, and leaves the marker to infer the comparison the requirement asked for.",
        },
        {
          kind: "example",
          title: "The shape of the presentation",
          scenario:
            "A client is considering transferring half a holding to their spouse before a disposal. Illustrative figures.",
          steps: [
            { label: "Position one — no transfer", detail: "Gain, less the client's annual exempt amount, taxed at their rate. Show the workings line by line." },
            { label: "Position two — after transfer", detail: "Half the gain each, each covered by an annual exempt amount, with the spouse's unused basic rate band applied to their half." },
            { label: "The saving", detail: "State the difference explicitly as a single figure." },
            { label: "The conditions", detail: "The transfer must be outright and before the disposal, and the spouse genuinely owns their share afterwards." },
          ],
          result:
            "Three numbers and a condition. A client can act on that; a single computed liability tells them nothing about whether to act.",
        },
        {
          kind: "text",
          md: "**Presentation earns marks independently.** Label every figure, show the working rather than the result alone, state assumptions where the scenario is ambiguous, and use a clear layout with each tax separated. A marker who can follow the method can award method marks even where an arithmetic slip has occurred — and a marker who cannot follow it cannot.",
        },
      ],
      check: {
        q: "A requirement asks the candidate to demonstrate the tax saving from a proposed course of action. What should the answer contain?",
        options: [
          "The liability under the proposed course only",
          "Both positions — the liability without the measure and with it — and the difference stated explicitly, together with any conditions the saving depends on",
          "A narrative explanation with no figures",
          "The saving as a percentage only",
        ],
        correct: 1,
        explain:
          "A saving is by definition a comparison, so only one of the two positions being computed leaves it unquantified. Stating the difference as its own figure, and naming the conditions it depends on, is what makes the demonstration usable.",
      },
    },
    {
      id: "reasoned-argument",
      heading: "Reasoned argument where numbers cannot decide",
      blocks: [
        {
          kind: "text",
          md: "Some mitigation cannot be quantified reliably: the value of flexibility, the risk that a relief is lost, the effect of a future rate change, or the consequence of family circumstances. The syllabus anticipates this by asking for numerical analysis **and/or** reasoned argument.",
        },
        {
          kind: "table",
          caption: "When to reason rather than compute",
          head: ["Situation", "The argument to make"],
          rows: [
            ["The saving depends on survival for seven years", "State the probability qualitatively from the client's age and health, and quantify the outcome each way"],
            ["A relief may not still qualify at death", "Identify what would remove it and who controls that"],
            ["Future rates or rules may change", "Note the exposure without speculating on the change; prefer routes robust to it"],
            ["The benefit is flexibility", "Describe the circumstances in which it would be valuable"],
            ["Figures are not supplied", "Set out the method and state which figures would be needed to complete it"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The last row is worth knowing",
          md: "Where a scenario deliberately withholds figures, the marks are for the **method**: setting out how the comparison would be made and identifying the information required. Writing 'the comparison would need the market value at transfer and the client's marginal rate in each year' demonstrates exactly the competence being assessed — and candidates who cannot produce a number often produce nothing instead.",
        },
      ],
      check: {
        q: "A requirement asks for advice but the scenario does not supply the figures needed for a full computation. What should the answer do?",
        options: [
          "State that the advice cannot be given",
          "Set out the method — how the comparison would be made, which figures are needed, and how each would affect the conclusion — since the marks are for the approach where the data is deliberately withheld",
          "Invent reasonable figures and compute",
          "Give only the narrative advantages",
        ],
        correct: 1,
        explain:
          "Withholding data is a deliberate examiner device to test whether a candidate understands the method rather than the arithmetic. Setting out the approach and the information required earns the marks; inventing figures risks an answer that appears precise and is unfounded.",
      },
    },
  ],
  examTraps: [
    { trap: "Computing only the recommended position.", fix: "A saving is a comparison — show both positions and the difference." },
    { trap: "Presenting a result without workings.", fix: "Method marks require a method the marker can follow." },
    { trap: "Producing nothing where figures are missing.", fix: "Set out the method and identify the information needed." },
    { trap: "Quantifying what cannot be quantified.", fix: "Use reasoned argument for conditionality, flexibility and future risk." },
  ],
  keyTerms: [
    { term: "Method marks", def: "Marks awarded for a correct approach shown in the workings, available even where an arithmetic error has occurred." },
  ],
  summary: [
    "Show the position without the measure, with it, and the difference.",
    "Label figures, show workings and state assumptions — presentation earns marks.",
    "Where the saving is conditional, argue it rather than forcing a number.",
    "Where figures are withheld, the marks are for the method and the data required.",
  ],
  knowledgeDiagnostic: [
    { q: "Why compute both positions rather than the recommended one?", a: "A saving is a difference, so computing one position leaves the benefit unquantified and the comparison the requirement asked for unanswered." },
    { q: "What earns marks when a scenario withholds the figures?", a: "Setting out the method, the information that would be needed, and how each figure would affect the conclusion." },
    { q: "Why do workings matter beyond the final answer?", a: "A marker who can follow the method can award method marks despite an arithmetic slip." },
  ],
  furtherStudy: [
    "ATX-25 covers the comparison this chapter presents.",
    "ATX-32 covers the professional skills marks presentation contributes to.",
    "ATX-33 covers using the exam's tools to present workings clearly.",
  ],
}

export const ATX_TREE_AREA_C: StudyChapter[] = [ATX_TREE_27, ATX_TREE_28, ATX_TREE_29, ATX_TREE_30]
