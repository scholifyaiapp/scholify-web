import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AFM · Area B, part one — discounted cash flow techniques (B1) and the
 * risk-and-uncertainty machinery that goes with them.
 *
 *   AFM-10  NPV with complex tax and inflation        (B1a i, ii)
 *   AFM-11  Risk and uncertainty in appraisal          (B1a iv, v, vi)
 *   AFM-12  Capital rationing and simulation           (B1a iii, B1b)
 *   AFM-13  IRR, MIRR and the return margin            (B1c)
 *
 * Area B is examined in EVERY sitting — the syllabus states that each exam
 * carries question(s) focused on B and E — so this is the area a candidate can
 * least afford to be shim-taught on. The legacy chapter it replaces covered
 * NPV, APV, Modigliani-Miller, beta, real options and international appraisal
 * in six sections.
 *
 * Written against the official ACCA AFM syllabus and study guide for September
 * 2026 to June 2027. Kaplan's AFM Study Text and Exam Kit (2020-21) informed
 * depth and chapter sizing only; all wording is original.
 *
 * House style reminder for the computational areas: every worked example must
 * be reconcilable — the reader should be able to see WHY the answer is what it
 * is, not just that the arithmetic closed. Where a common wrong method exists,
 * the figures are built so that it gives a visibly different answer.
 */

const AFM_TREE_10: StudyChapter = {
  paper: "AFM",
  id: "AFM-10",
  number: 10,
  area: "B",
  syllabusRefs: ["B1(a)"],
  title: "NPV with complex tax and inflation",
  minutes: 20,
  intro:
    "The foundation every other Area B technique builds on. Most marks lost here are not lost on the discounting — they are lost on tax timing and on mixing a real rate with money cash flows.",
  outcomes: [
    "Apply the money and real methods correctly, and know why they must give the same answer",
    "Inflate cash flows at specific rates where the scenario gives them, rather than at one general rate",
    "Handle tax allowable depreciation, including the balancing figure in the final year",
    "Deal with a one-year lag in tax payments and with tax exhaustion",
    "Present an appraisal a board can read, with the assumptions stated where they can be challenged",
  ],
  sections: [
    {
      id: "two-routes",
      heading: "Two routes to the same number",
      blocks: [
        {
          kind: "text",
          md: "There are two internally consistent ways to handle inflation in an appraisal, and the single commonest error in this paper is combining halves of both.",
        },
        {
          kind: "table",
          caption: "The two methods",
          head: ["Method", "Cash flows", "Discount rate"],
          rows: [
            ["Money (nominal)", "Inflated to the actual amounts expected in each year", "The money rate — the rate actually quoted"],
            ["Real", "Stated in today's purchasing power, uninflated", "The real rate, derived from the money rate"],
          ],
        },
        {
          kind: "formula",
          name: "Fisher relationship",
          expr: "(1 + i) = (1 + r) × (1 + h)",
          note:
            "i is the money (nominal) rate, r the real rate, h the general rate of inflation. Rearranged to find the real rate: r = (1 + i) ÷ (1 + h) − 1. Note it is multiplicative, not additive — subtracting inflation from the money rate is an approximation that drifts as rates rise.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The mismatch that costs the most marks",
          md: "Discounting **money** cash flows at a **real** rate overstates the NPV badly, because inflation is credited to the cash flows and never charged in the rate. It is the error most likely to turn a rejection into an acceptance, which is why the examiner keeps setting it.",
        },
        {
          kind: "text",
          md: "Use the **money method** whenever the scenario gives different inflation rates for different items — and it usually does. The real method only works cleanly when every cash flow inflates at the same general rate, because you cannot deflate a mixed bundle with one divisor. Tax is the decisive reason: tax allowable depreciation is calculated on the original cost and does not inflate at all, so a real-method appraisal has to convert it anyway.",
        },
        {
          kind: "example",
          title: "The two methods agree",
          scenario:
            "A project generates a real cash flow of $500,000 a year for two years. General inflation is 5%, and the money cost of capital is 12.35%.",
          steps: [
            { label: "Find the real rate", detail: "r = 1.1235 ÷ 1.05 − 1 = 0.07, so 7%." },
            { label: "Real method", detail: "500,000 × (1.07⁻¹ + 1.07⁻²) = 500,000 × 1.8080 = $904,000." },
            { label: "Money method — inflate", detail: "Year 1: 500,000 × 1.05 = 525,000. Year 2: 500,000 × 1.05² = 551,250." },
            { label: "Money method — discount", detail: "525,000 ÷ 1.1235 + 551,250 ÷ 1.1235² = 467,290 + 436,710 = $904,000." },
          ],
          result:
            "Identical, as they must be — the money method inflates the numerator and the denominator by the same factor, so it cancels. Seeing that cancellation is what stops you mixing the two.",
        },
        {
          kind: "text",
          md: "**Specific price variation** is the reason the money method dominates in practice. When labour rises at 6%, materials at 3% and selling prices at 4%, each line inflates at its own rate — and the resulting margin squeeze is often the real finding in the question. A single general rate would hide it entirely.",
        },
      ],
      check: {
        q: "A project's cash flows have been inflated at their specific rates. The company's cost of capital is quoted as 11% and general inflation is 4%. Which rate should be used?",
        options: [
          "The real rate of about 6.7%, since specific inflation has been applied",
          "11%, the money rate, because the cash flows are in money terms — the quoted rate is already a money rate",
          "7%, being 11% less 4%",
          "The average of the specific inflation rates",
        ],
        correct: 1,
        explain:
          "Inflated cash flows are money cash flows, so they need the money rate — and a quoted cost of capital is a money rate unless the question says otherwise. Options 0 and 2 both create the overstating mismatch, and option 2 additionally uses the additive approximation rather than the Fisher relationship. Option 3 confuses inflating cash flows with discounting them.",
      },
    },
    {
      id: "tax",
      heading: "Tax: three moving parts",
      blocks: [
        {
          kind: "text",
          md: "Tax in an AFM appraisal is never one line. It has three components and each is examined separately, so it pays to lay them out as separate rows rather than netting them in your head.",
        },
        {
          kind: "list",
          style: "number",
          title: "The three parts",
          items: [
            "**Tax on operating cash flows** — the rate applied to the net trading inflow each year",
            "**Tax relief on tax allowable depreciation** — the allowance multiplied by the tax rate, which is a saving, not a cash cost",
            "**The balancing allowance or charge** — the correction in the final year, when the written down value is compared with the disposal proceeds",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Depreciation itself never appears",
          md: "Accounting depreciation is not a cash flow and must be excluded. What enters the appraisal is the **tax saved** because the tax authority allows a deduction — allowance × tax rate. Candidates who deduct depreciation as a cost and then also claim the tax relief have charged it twice.",
        },
        {
          kind: "example",
          title: "Tax allowable depreciation with a balancing figure",
          scenario:
            "An asset costs $800,000, is held for three years and sold for $300,000. Tax allowable depreciation is 25% reducing balance, tax is 20%, and tax is paid in the year it arises.",
          steps: [
            { label: "Year 1", detail: "Allowance 800,000 × 25% = 200,000; relief 200,000 × 20% = $40,000. Written down value 600,000." },
            { label: "Year 2", detail: "Allowance 600,000 × 25% = 150,000; relief = $30,000. Written down value 450,000." },
            { label: "Year 3 — balancing", detail: "The asset is sold, so no ordinary allowance. Written down value 450,000 less proceeds 300,000 = a balancing ALLOWANCE of 150,000; relief = $30,000." },
            { label: "Check the total", detail: "Total allowances 200,000 + 150,000 + 150,000 = 500,000, which is exactly cost 800,000 less proceeds 300,000. Total relief $100,000 = 500,000 × 20%." },
          ],
          result:
            "That final check is the one to build into your working: over the asset's life the allowances must sum to the net cost. If they do not, the balancing figure is wrong.",
        },
        {
          kind: "text",
          md: "Two variations to watch for. If proceeds **exceed** the written down value there is a balancing **charge** — extra tax, not relief. And where a question says tax is paid **one year in arrears**, every tax figure moves one year later, which usually adds a cash flow in the year after the project ends. Set the timing convention out at the top of your working so the marker can follow it.",
        },
        {
          kind: "definition",
          term: "Tax exhaustion",
          md: "The position where an organisation's taxable profits are insufficient to absorb the tax relief available, so the relief cannot be taken in full when it arises — it is deferred, restricted, or lost. An appraisal that assumes full relief for a company with no taxable profits overstates the project's value.",
        },
        {
          kind: "activity",
          title: "Spot the tax exhaustion consequence",
          prompt:
            "A start-up subsidiary with no other trade buys a $10m asset. It expects tax losses for its first four years. How should the appraisal treat the tax allowable depreciation?",
          answer:
            "Not at the full rate in the year it arises, which is the default assumption and is wrong here. With no taxable profits there is nothing for the allowance to reduce, so the relief cannot be taken as it accrues. Depending on the regime the losses are carried forward and the relief is obtained later — which means the cash benefit still arrives but is worth less once discounted — or, in the worst case, is restricted or lost. The examinable move is to model it explicitly: delay the relief until the year taxable profits are forecast to be sufficient, and say what the delay costs in present-value terms. Then note the alternative the scenario may be steering toward, which is to hold the asset in a profitable group company, or to lease rather than buy so the relief is taken by a lessor who can use it and passed back through a lower rental.",
        },
      ],
      check: {
        q: "An asset with a written down value of $180,000 is sold for $240,000. Tax is 25%. What enters the appraisal in the year of disposal?",
        options: [
          "A balancing allowance of $60,000, giving tax relief of $15,000",
          "A balancing charge of $60,000, giving additional tax of $15,000",
          "A profit on disposal of $60,000, taxed at 25% and also credited as a cash inflow of $60,000",
          "Nothing — disposals are outside the scope of investment appraisal",
        ],
        correct: 1,
        explain:
          "Proceeds above the written down value mean too much relief has already been given, so it is clawed back as a balancing charge: $240,000 − $180,000 = $60,000 charged at 25% = $15,000 of extra tax. Option 0 reverses the direction. Option 2 double counts — the $240,000 proceeds are already in the appraisal as an inflow, so the accounting profit is not a separate receipt.",
      },
    },
    {
      id: "presenting",
      heading: "Presenting an appraisal a board can challenge",
      blocks: [
        {
          kind: "text",
          md: "AFM's marks for an NPV are not only for the number. A Section A requirement asks for a report, and the layout is part of the professional-skills assessment. A working nobody can follow cannot be challenged, and a board that cannot challenge an analysis cannot rely on it.",
        },
        {
          kind: "table",
          caption: "What a marker looks for in the presentation",
          head: ["Feature", "Why it earns marks"],
          rows: [
            ["Years as columns, cash flow types as rows", "Lets the reader trace a single item across the project's life"],
            ["A stated timing convention", "Removes ambiguity about whether year 1 means now or in twelve months"],
            ["Assumptions listed separately", "Makes the fragile inputs visible and challengeable, which is the point"],
            ["Tax shown as its own rows", "Separates operating tax from relief and from the balancing figure"],
            ["A conclusion in the recipient's language", "Answers the requirement rather than restating the spreadsheet"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "State your assumptions where they can be attacked",
          md: "Writing 'assumed the tax rate remains at 25% throughout, and that relief is obtained in the year the allowance arises' costs one line and does two jobs: it protects the answer if the marker reads the scenario differently, and it demonstrates the scepticism the professional marks reward. Candidates who bury assumptions inside the arithmetic get neither benefit.",
        },
        {
          kind: "text",
          md: "Finally, remember what the NPV **is**: an estimate of the value added to the organisation, in today's terms, if the forecasts prove correct. Say that in the conclusion, along with the fact that it is a point estimate resting on a specific set of assumptions — which is the natural bridge into the sensitivity work the next chapter covers, and usually into the next requirement of the question.",
        },
      ],
      check: {
        q: "Why does AFM award marks for stating assumptions explicitly rather than simply producing the correct NPV?",
        options: [
          "Because the marker cannot otherwise check the arithmetic",
          "Because a point estimate is only meaningful alongside the inputs it depends on — stating them lets the board see which forecasts the decision actually rests on, and it evidences professional scepticism",
          "Because ACCA requires a minimum word count for calculation questions",
          "Because assumptions replace the need for sensitivity analysis",
        ],
        correct: 1,
        explain:
          "The value of an NPV to a decision-maker lies in knowing what it depends on. Stated assumptions convert a single number into something a board can interrogate, and doing so is exactly the behaviour the professional-skills marks describe. Option 3 has it backwards — stated assumptions are what sensitivity analysis then tests.",
      },
    },
  ],
  examTraps: [
    { trap: "Discounting inflated cash flows at a real rate.", fix: "Money cash flows take the money rate; a quoted cost of capital is a money rate unless stated otherwise." },
    { trap: "Inflating everything at one general rate when specific rates are given.", fix: "Inflate each line at its own rate — the margin squeeze is often the finding." },
    { trap: "Deducting depreciation as a cost as well as claiming the tax relief.", fix: "Depreciation never enters; only the tax saved on the allowance does." },
    { trap: "Forgetting the balancing allowance or charge in the disposal year.", fix: "Check that total allowances equal cost less disposal proceeds." },
    { trap: "Assuming full tax relief for a company with no taxable profits.", fix: "Model tax exhaustion — defer the relief and cost the delay." },
  ],
  keyTerms: [
    { term: "Money (nominal) cash flow", def: "A cash flow expressed in the actual amount expected to be paid or received at that future date, including the effect of inflation." },
    { term: "Real cash flow", def: "A cash flow expressed in today's purchasing power, with the effect of inflation removed." },
    { term: "Tax allowable depreciation", def: "The deduction a tax authority permits for the cost of a capital asset, generating a cash saving equal to the allowance multiplied by the tax rate." },
    { term: "Balancing charge", def: "An addition to taxable profit on disposal, arising where sale proceeds exceed the asset's written down value because too much relief has already been given." },
  ],
  summary: [
    "Money cash flows with the money rate, or real with real — never a mixture.",
    "Use the money method whenever specific inflation rates differ between lines.",
    "Tax has three parts: on operating flows, relief on allowances, and the final balancing figure.",
    "Check that total allowances equal cost less proceeds, and state the timing convention you used.",
  ],
  knowledgeDiagnostic: [
    { q: "Why must the money and real methods give the same NPV?", a: "The money method inflates the cash flows and discounts at a rate containing the same inflation, so the inflation factor cancels." },
    { q: "Why does the money method dominate in practice?", a: "Because specific inflation rates usually differ between lines, and because tax allowable depreciation is based on original cost and does not inflate at all." },
    { q: "What does tax exhaustion do to an appraisal?", a: "Relief cannot be taken as it arises because there are no taxable profits to absorb it, so it must be deferred — and the delay reduces its present value or loses it entirely." },
  ],
  furtherStudy: [
    "AFM-11 tests how much confidence the NPV produced here can carry.",
    "AFM-13 compares this net present value with the internal rate of return the same cash flows imply.",
    "Area B later re-appraises the same project when the financing structure changes, using adjusted present value.",
  ],
}

const AFM_TREE_11: StudyChapter = {
  paper: "AFM",
  id: "AFM-11",
  number: 11,
  area: "B",
  syllabusRefs: ["B1(a)"],
  title: "Risk and uncertainty in investment appraisal",
  minutes: 18,
  intro:
    "An NPV is one number standing for a range of possible futures. This chapter is about saying how wide the range is — and which single assumption the whole decision is resting on.",
  outcomes: [
    "Distinguish risk from uncertainty, and match the technique to which one you face",
    "Calculate and interpret the sensitivity of an NPV to each input",
    "Use expected values correctly, and state plainly what they conceal",
    "Apply a risk-adjusted discount rate, and say why it is a blunt instrument",
    "Use project duration as a measure of how exposed a project's value is to timing",
  ],
  sections: [
    {
      id: "risk-vs-uncertainty",
      heading: "Risk, uncertainty, and why the distinction changes the tool",
      blocks: [
        {
          kind: "text",
          md: "**Risk** describes a situation where the possible outcomes and their probabilities can be estimated — often from history. **Uncertainty** describes one where they cannot: a genuinely novel product, a political outcome, a technology that may or may not work. The distinction matters because probability-based techniques require probabilities, and inventing them for a genuinely uncertain situation dresses a guess in arithmetic.",
        },
        {
          kind: "table",
          caption: "Matching the technique to the situation",
          head: ["Technique", "Needs", "Answers"],
          rows: [
            ["Sensitivity analysis", "No probabilities at all", "How far can this input move before the decision changes?"],
            ["Expected values", "Outcomes and probabilities", "What is the mean outcome across the distribution?"],
            ["Simulation", "Distributions for several inputs", "What does the whole distribution of NPVs look like?"],
            ["Risk-adjusted discount rate", "A view on systematic risk", "What return should this project's risk class command?"],
            ["Duration", "The cash flow profile", "How exposed is the value to timing and to rate changes?"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Sensitivity analysis is the honest default",
          md: "Where the scenario gives no probabilities, sensitivity analysis is the right tool precisely because it needs none. It converts 'we are not sure about the volume forecast' into 'volume can fall 14% before this project destroys value', which is a statement a board can act on.",
        },
      ],
      check: {
        q: "A company is appraising a product using a technology never before deployed commercially. Which approach is most defensible?",
        options: [
          "Assign probabilities to three outcomes and compute an expected NPV",
          "Use sensitivity analysis to establish how far each key input can move before the NPV turns negative, since there is no reliable basis for probabilities",
          "Apply the company's standard discount rate and accept the resulting NPV",
          "Reject the project, as uncertainty cannot be appraised",
        ],
        correct: 1,
        explain:
          "This is uncertainty rather than risk: there is no history from which to derive probabilities, so an expected value would be arithmetic performed on invented inputs. Sensitivity analysis needs no probabilities and produces exactly the margin-of-safety information a board needs. Option 2 ignores that the project's risk differs from the company's average, and option 3 discards a decision that can still be reasoned about.",
      },
    },
    {
      id: "sensitivity",
      heading: "Sensitivity: the margin of safety on each input",
      blocks: [
        {
          kind: "formula",
          name: "Sensitivity of an input",
          expr: "Sensitivity = NPV ÷ present value of the cash flows affected by that input",
          note:
            "Expressed as a percentage, it is how far that one input can move adversely before the NPV reaches zero — everything else held constant. The denominator is the PV of the flows the input actually drives, NOT the total PV of the project.",
        },
        {
          kind: "example",
          title: "Which assumption is the decision really resting on?",
          scenario:
            "A project has an NPV of $1.2m. The present value of sales revenue is $24m, of variable costs $15m, and of the initial investment $6m.",
          steps: [
            { label: "Sales revenue", detail: "1.2 ÷ 24 = 5.0% — revenue can fall 5% before the project breaks even." },
            { label: "Variable costs", detail: "1.2 ÷ 15 = 8.0% — costs can rise 8%." },
            { label: "Initial investment", detail: "1.2 ÷ 6 = 20.0% — the capital cost can overrun by 20%." },
            { label: "Rank and interpret", detail: "Revenue is the binding constraint at 5%. The recommendation should focus on the reliability of the sales forecast, not on capital cost control." },
          ],
          result:
            "The technique's value is the ranking. A board told 'the NPV is $1.2m' learns less than a board told 'a 5% shortfall in revenue eliminates the entire return'.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The limitation to state every time",
          md: "Sensitivity analysis moves **one variable at a time**. In reality a volume shortfall usually arrives with price pressure and with under-absorbed fixed costs, so the true margin of safety is narrower than any single figure suggests. Say this — it is a standard mark, and it is the reason simulation exists.",
        },
        {
          kind: "text",
          md: "Note also what sensitivity does not tell you: it says nothing about how **likely** the movement is. A 5% sensitivity on a contracted revenue stream is comfortable; a 20% sensitivity on a speculative one is not. Always pair the percentage with a judgement on the reliability of that particular forecast.",
        },
      ],
      check: {
        q: "A project with an NPV of $800,000 has a present value of labour costs of $4m. What is the sensitivity to labour costs, and what does it mean?",
        options: [
          "20% — labour costs can rise by 20% before the NPV becomes negative",
          "20% — labour costs must fall by 20% for the project to be viable",
          "5% — the ratio of NPV to the total project value",
          "It cannot be calculated without the probability of a labour cost increase",
        ],
        correct: 0,
        explain:
          "800,000 ÷ 4,000,000 = 20%: an adverse movement of that size in labour costs alone would consume the whole NPV. Option 1 reverses the direction, since the project is already viable. Option 2 uses the wrong denominator — the calculation uses the present value of the flows that input drives. Option 3 is the point of the technique: no probability is needed.",
      },
    },
    {
      id: "expected-values",
      heading: "Expected values, and what a mean conceals",
      blocks: [
        {
          kind: "text",
          md: "An expected value weights each outcome by its probability. It is the right measure for a decision that will be **repeated** many times, because the mean is what you actually experience over many trials. It is a much weaker guide for a large one-off decision, because the organisation experiences one outcome, not the average of several.",
        },
        {
          kind: "example",
          title: "The mean that nobody receives",
          scenario:
            "A project has a 60% chance of an NPV of +$10m and a 40% chance of −$12m.",
          steps: [
            { label: "Expected value", detail: "(0.6 × 10) + (0.4 × −12) = 6 − 4.8 = +$1.2m." },
            { label: "Read the actual outcomes", detail: "No outcome of $1.2m exists. The organisation either gains $10m or loses $12m." },
            { label: "Test survivability", detail: "The question is whether a $12m loss is survivable given the group's size, gearing and covenant headroom." },
            { label: "Advise", detail: "A positive expected value supports proceeding only if the downside is bearable; if it is not, the mean is the wrong decision criterion." },
          ],
          result:
            "The expected value says 'accept'. Whether the board should is a question about the downside, and saying so is where the judgement marks are.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "State these limitations when using expected values",
          items: [
            "The mean may be an outcome that cannot actually occur",
            "It ignores the spread — two projects with identical expected values can have very different risk",
            "It assumes the decision-maker is risk-neutral, which a geared company near a covenant is not",
            "It is only as good as the probabilities, which are frequently subjective estimates",
            "For a one-off decision the organisation experiences a single draw, not the average",
          ],
        },
        {
          kind: "text",
          md: "Where a scenario supplies a **joint** probability table — say, three demand levels crossed with two cost levels — work through it systematically, compute the NPV for each combination, and then report not just the expected value but the **probability of a negative NPV**. That last figure is usually more useful to the board than the mean, and it is frequently what the requirement actually asks for.",
        },
      ],
      check: {
        q: "Two projects each have an expected NPV of $3m. Project X ranges from $2m to $4m; project Y ranges from −$15m to +$21m. What does the expected value fail to capture?",
        options: [
          "Nothing — identical expected values mean the projects are equivalent",
          "The dispersion of outcomes: Y carries a substantial probability of a loss large enough to threaten the organisation, which a risk-averse or highly geared company must weigh",
          "The time value of money, which is excluded from expected value calculations",
          "The tax treatment, which differs between the two projects",
        ],
        correct: 1,
        explain:
          "The mean is a single point on a distribution and says nothing about its width. Y's downside could breach covenants or threaten solvency, so the two projects are not equivalent to any decision-maker who is not perfectly risk-neutral. The time value of money is already inside each NPV, so option 2 misreads the measure.",
      },
    },
    {
      id: "radr-duration",
      heading: "Risk-adjusted rates and project duration",
      blocks: [
        {
          kind: "text",
          md: "A **risk-adjusted discount rate** reflects the systematic risk of the project rather than the average risk of the company. This is the right correction when a project's business risk differs from the existing operations — and applying the company's WACC in that situation systematically accepts risky projects and rejects safe ones.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The blunt instrument problem",
          md: "A single uplifted rate compounds over time, so it penalises distant cash flows far more than near ones. That is appropriate when risk genuinely grows with time, and wrong when the risk is concentrated in an early event — a licence decision, a trial result. Where the risk is dated, model it in the cash flows or as a decision point instead.",
        },
        {
          kind: "text",
          md: "**Project duration** is the syllabus's measure of risk through timing. It is the weighted average time to receive the project's cash flows, weighting each year by the present value arriving in it. A long duration means the value depends on distant flows, which are the least reliable forecasts and the most sensitive to a change in the discount rate.",
        },
        {
          kind: "formula",
          name: "Macaulay duration of a project",
          expr: "Duration = Σ (t × PV of cash flow at t) ÷ Σ (PV of cash flows)",
          note:
            "Measured in years. Two projects with the same NPV but different durations are not equally risky — the longer-duration project has more of its value in the years hardest to forecast, and loses more value if rates rise.",
        },
        {
          kind: "example",
          title: "Same NPV, different exposure",
          scenario:
            "Project P returns present values of $400k, $300k and $200k in years 1 to 3. Project Q returns $100k, $300k and $500k over the same period. Both total $900k.",
          steps: [
            { label: "P's duration", detail: "[(1 × 400) + (2 × 300) + (3 × 200)] ÷ 900 = (400 + 600 + 600) ÷ 900 = 1.78 years." },
            { label: "Q's duration", detail: "[(1 × 100) + (2 × 300) + (3 × 500)] ÷ 900 = (100 + 600 + 1,500) ÷ 900 = 2.44 years." },
            { label: "Interpret", detail: "Q's value sits further out, so it is more exposed to forecast error, to a rise in the discount rate and to anything that shortens the project's life." },
            { label: "Advise", detail: "If the two have equal NPVs, prefer P on risk grounds — or require a higher return from Q to compensate for the additional exposure." },
          ],
          result:
            "Duration turns 'Q's cash flows come later' into a single comparable number, which is what makes it usable as a ranking criterion.",
        },
      ],
      check: {
        q: "Why is applying the company's existing WACC to a project in a different industry likely to lead to poor decisions over time?",
        options: [
          "The WACC is only valid for projects lasting less than five years",
          "It reflects the systematic risk of the existing business, so it under-discounts projects riskier than average and over-discounts safer ones — biasing the company toward accepting risky projects and rejecting safe ones",
          "The WACC excludes the cost of equity for new projects",
          "New projects must always be discounted at the cost of equity alone",
        ],
        correct: 1,
        explain:
          "A single company-wide rate prices every project as though it carried average risk. Riskier projects then clear a hurdle that is too low and safer ones fail one that is too high, so the bias accumulates and the company's risk profile drifts upward. The remedy is a project-specific rate built from a proxy company's beta, which Area B develops.",
      },
    },
  ],
  examTraps: [
    { trap: "Computing sensitivity on the project's total present value.", fix: "Divide the NPV by the present value of the flows that input actually drives." },
    { trap: "Presenting an expected value as the decision.", fix: "Report the spread and the probability of a negative outcome, and test whether the downside is survivable." },
    { trap: "Inventing probabilities where the scenario gives none.", fix: "That is uncertainty — use sensitivity analysis, which needs no probabilities." },
    { trap: "Adding a vague premium to the discount rate for 'risk'.", fix: "Justify it from systematic risk, and where the risk is dated, model it in the cash flows instead." },
  ],
  keyTerms: [
    { term: "Sensitivity", def: "The percentage by which an input can move adversely, in isolation, before a project's net present value falls to zero." },
    { term: "Expected value", def: "The probability-weighted mean of the possible outcomes — appropriate for repeated decisions, weak for large one-off ones." },
    { term: "Risk-adjusted discount rate", def: "A discount rate reflecting the systematic risk of the specific project rather than the average risk of the organisation." },
    { term: "Project duration", def: "The weighted average time to receipt of a project's cash flows, weighted by present value — a measure of how far out its value sits." },
  ],
  summary: [
    "Risk has probabilities; uncertainty does not — match the technique to which you actually face.",
    "Sensitivity ranks the inputs by margin of safety, and needs no probabilities.",
    "An expected value hides the spread; report the downside and whether it is survivable.",
    "Duration turns 'the cash comes later' into a comparable number for ranking risk.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the denominator in a sensitivity calculation?", a: "The present value of the cash flows that the input being tested actually drives — not the total present value of the project." },
    { q: "When is an expected value a poor decision criterion?", a: "For a large one-off decision, because the organisation experiences a single outcome rather than the average, and the mean may hide a loss it could not survive." },
    { q: "Why does a longer project duration mean more risk?", a: "More of the value sits in distant years, which are the hardest to forecast and lose the most present value if the discount rate rises." },
  ],
  furtherStudy: [
    "AFM-10 builds the base-case appraisal that these techniques test.",
    "AFM-12 extends this into capital rationing and into simulation, which relaxes the one-variable-at-a-time limitation.",
    "AFM-03 sets the risk framework that decides how much of this exposure the organisation is prepared to carry.",
  ],
}

const AFM_TREE_12: StudyChapter = {
  paper: "AFM",
  id: "AFM-12",
  number: 12,
  area: "B",
  syllabusRefs: ["B1(a)", "B1(b)"],
  title: "Capital rationing and simulation",
  minutes: 17,
  intro:
    "Two situations the base-case NPV rule cannot handle alone: not enough capital to take every good project, and too many uncertain inputs to move one at a time.",
  outcomes: [
    "Distinguish hard from soft rationing, and say what each implies about the organisation",
    "Rank divisible projects by profitability index and select the optimal combination",
    "Recognise why ranking fails for indivisible projects, and test combinations instead",
    "Explain why multi-period rationing is a different and harder problem",
    "Interpret simulation output, including project value at risk, without being able to run one",
  ],
  sections: [
    {
      id: "rationing",
      heading: "Hard rationing, soft rationing, and what each tells you",
      blocks: [
        {
          kind: "text",
          md: "Capital rationing means there is not enough capital to fund every project with a positive NPV. Where it comes from changes the advice entirely.",
        },
        {
          kind: "table",
          caption: "Two very different constraints",
          head: ["Type", "Source", "What it means", "Advice"],
          rows: [
            ["Hard", "External — the capital market will not supply funds on acceptable terms", "Lenders or investors doubt the organisation, or markets are closed", "Address the underlying cause: information, security, track record, or accept a smaller programme"],
            ["Soft", "Internal — management has imposed a limit", "A deliberate choice: control, caution, or forcing project quality", "Challenge it — turning down positive-NPV projects destroys value, so the limit needs a justification"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Soft rationing deserves a challenge, not compliance",
          md: "If projects with positive NPVs are being declined because of a self-imposed ceiling, the organisation is choosing to forgo value. There can be good reasons — a limit on how much change management can absorb, scepticism about the forecasts, a desire to preserve debt capacity — but the adviser should make the cost of the constraint explicit, in NPV terms, so the board decides knowingly.",
        },
      ],
      check: {
        q: "A board caps annual capital spending at $50m although $80m of positive-NPV projects are available and funding could be raised. How should the adviser respond?",
        options: [
          "Accept the constraint and optimise within it, since board policy is not the adviser's concern",
          "Quantify the NPV forgone by the cap and present it to the board, so the limit is retained or relaxed as a conscious decision rather than a default",
          "Recommend the cap be removed immediately, since all positive-NPV projects must be accepted",
          "Recommend the projects be deferred to next year, when the cap resets",
        ],
        correct: 1,
        explain:
          "This is soft rationing, and the adviser's job is to make its cost visible: the board may have a legitimate reason — implementation capacity, forecast scepticism, preserving headroom — but should be choosing with the number in front of it. Option 0 abdicates the advisory role, option 2 ignores that the constraint may be rational, and option 3 assumes deferral is free when it usually is not.",
      },
    },
    {
      id: "divisible-indivisible",
      heading: "Ranking works for divisible projects, and fails for indivisible ones",
      blocks: [
        {
          kind: "text",
          md: "With a single period's capital constrained, the objective is to maximise total NPV from the limited fund. For **divisible** projects — those that can be taken in part, with proportionate returns — the answer is to rank by NPV per unit of the scarce resource.",
        },
        {
          kind: "formula",
          name: "Profitability index",
          expr: "PI = NPV ÷ initial investment",
          note:
            "NPV generated per $1 of the constrained capital. Some texts define it as PV of inflows ÷ initial investment, which ranks identically — just be consistent and say which you used.",
        },
        {
          kind: "example",
          title: "The ranking that gets the wrong answer",
          scenario:
            "Capital available is $50m. Project A costs $30m with an NPV of $9m; B costs $20m with an NPV of $8m; C costs $25m with an NPV of $7.5m; D costs $15m with an NPV of $7.5m.",
          steps: [
            { label: "Profitability indices", detail: "A 9/30 = 0.30; B 8/20 = 0.40; C 7.5/25 = 0.30; D 7.5/15 = 0.50." },
            { label: "If divisible — rank and fill", detail: "Take D ($15m, NPV 7.5), then B ($20m, NPV 8.0), then half of A ($15m of $30m, NPV 4.5). Total NPV $20.0m." },
            { label: "If indivisible — test combinations", detail: "D+B = $35m, NPV 15.5. D+A = $45m, NPV 16.5. B+C = $45m, NPV 15.5. **A+B = $50m, NPV 17.0.**" },
            { label: "Compare", detail: "The ranking says start with D, but the best indivisible combination excludes D entirely — A+B uses the fund exactly and yields $17.0m against D+B's $15.5m." },
          ],
          result:
            "Ranking maximises NPV per dollar only when every dollar can be used. With indivisible projects the leftover cash earns nothing, so the winning combination is the one that fits — which ranking cannot find.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Read whether projects are divisible before ranking",
          md: "This is the trap the examiner sets. If the question says projects cannot be undertaken in part, the profitability index is still worth computing as a first screen, but the answer must come from testing feasible combinations against the constraint. Presenting a ranked list as the answer to an indivisible problem loses the marks even when the arithmetic is perfect.",
        },
        {
          kind: "text",
          md: "**Multi-period rationing** — where capital is constrained in more than one year — cannot be solved this way at all, because taking a project in year one changes what is affordable in year two. The syllabus limits this to discussion, so know why it is harder: the problem becomes one of simultaneous optimisation across periods, normally handled with linear programming, and the intuition is that a project's opportunity cost is now the best alternative use of capital **in each year it consumes capital**.",
        },
      ],
      check: {
        q: "Four indivisible projects compete for a fixed capital sum. Why is ranking by profitability index insufficient?",
        options: [
          "The profitability index ignores the time value of money",
          "Because projects cannot be part-funded, unused capital earns nothing — so the optimal answer is the feasible combination that maximises total NPV, which may exclude the highest-ranked project",
          "The profitability index cannot be calculated for indivisible projects",
          "Indivisible projects should be ranked by NPV alone instead",
        ],
        correct: 1,
        explain:
          "Ranking assumes the fund can be exhausted, which only holds if projects are divisible. Once they are not, a highly ranked small project can leave a remainder too small to use, while a lower-ranked combination fits the constraint exactly and yields more. The profitability index already uses discounted figures, so option 0 is wrong, and option 3 would produce a different but equally unreliable ranking.",
      },
    },
    {
      id: "simulation",
      heading: "Monte Carlo simulation and project value at risk",
      blocks: [
        {
          kind: "text",
          md: "The syllabus is explicit that candidates will not be asked to run a simulation — the requirement is to **outline** the application and to interpret the output. So the marks are for understanding what it does that sensitivity analysis cannot, and for reading a distribution.",
        },
        {
          kind: "list",
          style: "number",
          title: "What a simulation does",
          items: [
            "A probability distribution is specified for each uncertain input, rather than a single point estimate",
            "Correlations between inputs are specified, so that volume and price can be made to move together if that is realistic",
            "The model draws one value from each distribution at random and computes an NPV — one trial",
            "The process repeats many thousands of times, building a distribution of NPVs rather than one figure",
            "The output is read as a distribution: its mean, its spread, and the proportion of trials that were negative",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The one advantage to name",
          md: "Simulation relaxes the **one-variable-at-a-time** limitation of sensitivity analysis: it moves every uncertain input simultaneously, and it can build in the correlations between them. That is why it produces a probability of loss, which sensitivity analysis cannot.",
        },
        {
          kind: "table",
          caption: "Reading the output",
          head: ["Output", "What it tells the board"],
          rows: [
            ["Mean NPV", "The central estimate — comparable to the base-case NPV but reflecting the full input distributions"],
            ["Standard deviation", "How wide the range of outcomes is; a proxy for the project's total risk"],
            ["Probability of a negative NPV", "The likelihood the project destroys value — usually the single most useful figure"],
            ["Project value at risk", "The loss that will not be exceeded at a stated confidence level, e.g. '5% chance of a loss worse than $8m'"],
            ["Shape of the distribution", "Skew matters: a long left tail means rare but severe downside that the mean conceals"],
          ],
        },
        {
          kind: "definition",
          term: "Project value at risk",
          md: "The worst net present value outcome expected at a specified confidence level over the project's life — for example, a 95% confidence level meaning that in only 5% of simulated outcomes would the result be worse than the figure stated." },
        {
          kind: "activity",
          title: "Interpret a simulation for a board",
          prompt:
            "A simulation of 10,000 trials returns a mean NPV of $6.2m, a standard deviation of $9.8m, and a negative NPV in 27% of trials. The base-case NPV was $6.5m. What do you tell the board?",
          answer:
            "Start with the reassurance and then remove it. The mean of $6.2m is close to the base-case $6.5m, so the base case is not systematically optimistic — the point estimate is a fair central figure. But the standard deviation of $9.8m is larger than the mean, and more than a quarter of outcomes destroy value, so the project is far riskier than a single positive NPV suggests. The decision therefore is not 'is the NPV positive' but 'can the group absorb the bad quarter of outcomes', which turns on gearing, covenant headroom and whether this project is one of many or a concentrated bet. I would also ask two questions before relying on the output: what distributions were assumed for the inputs, since a simulation is only as good as those, and whether correlations were modelled — if volume and price were treated as independent when in reality they move together, the spread is understated and the 27% is too low.",
        },
        {
          kind: "text",
          md: "That last point is the standard limitation. Simulation output has an air of precision that its inputs do not support: the distributions are usually estimated, correlations are hard to specify, and the model can only reflect relationships someone thought to build into it. Say so — the marks for 'limitations' are reliably available and reliably forgotten.",
        },
      ],
      check: {
        q: "What can Monte Carlo simulation tell a board that sensitivity analysis cannot?",
        options: [
          "The exact NPV of the project",
          "The probability that the project will produce a negative NPV, because it varies all uncertain inputs simultaneously and can reflect the correlations between them",
          "Which single input the project is most sensitive to",
          "Whether the discount rate used is correct",
        ],
        correct: 1,
        explain:
          "Sensitivity analysis moves one variable at a time and returns no probabilities. Simulation varies them together, so it produces a distribution of outcomes from which a probability of loss and a value at risk can be read. Option 2 is precisely what sensitivity analysis does well, and neither technique validates the discount rate.",
      },
    },
  ],
  examTraps: [
    { trap: "Ranking by profitability index when projects are indivisible.", fix: "Test feasible combinations against the constraint — the best one may exclude the highest-ranked project." },
    { trap: "Treating a self-imposed capital limit as a given.", fix: "Quantify the NPV forgone so the board retains or relaxes the cap knowingly." },
    { trap: "Applying single-period ranking logic to multi-period rationing.", fix: "It is a simultaneous optimisation across years; the syllabus limits it to discussion for that reason." },
    { trap: "Reporting simulation output as precise.", fix: "Name the limitations — estimated input distributions, unmodelled correlations, and only the relationships built in." },
  ],
  keyTerms: [
    { term: "Hard capital rationing", def: "A funding limit imposed externally, because the capital market will not supply funds on acceptable terms." },
    { term: "Soft capital rationing", def: "A funding limit imposed internally by management, which forgoes positive-NPV projects and therefore needs justification." },
    { term: "Profitability index", def: "Net present value per unit of the constrained resource, used to rank divisible projects under single-period rationing." },
    { term: "Monte Carlo simulation", def: "A technique that repeatedly samples from probability distributions for each uncertain input to build a distribution of possible net present values." },
  ],
  summary: [
    "Hard rationing is an external constraint to address; soft rationing is a management choice to challenge.",
    "Rank divisible projects by profitability index; test combinations when projects are indivisible.",
    "Multi-period rationing is a simultaneous optimisation, and the syllabus limits it to discussion.",
    "Simulation's advantage is varying all inputs together, producing a probability of loss and a value at risk.",
  ],
  knowledgeDiagnostic: [
    { q: "When does ranking by profitability index give the wrong answer?", a: "When projects are indivisible, because unused capital earns nothing and a combination that fits the constraint exactly can beat the highest-ranked selection." },
    { q: "Why should soft rationing be challenged?", a: "It forgoes positive-NPV projects by choice, so the value being given up should be quantified and put to the board rather than absorbed silently." },
    { q: "What is the key limitation of simulation output?", a: "It is only as good as the assumed input distributions and the correlations modelled — precision in the output does not reflect precision in the inputs." },
  ],
  furtherStudy: [
    "AFM-11 covers the sensitivity and expected-value techniques simulation extends.",
    "AFM-13 completes the appraisal toolkit with the internal rate of return and its modified form.",
    "Area E returns to value at risk as a treasury measure rather than a project one.",
  ],
}

const AFM_TREE_13: StudyChapter = {
  paper: "AFM",
  id: "AFM-13",
  number: 13,
  area: "B",
  syllabusRefs: ["B1(c)"],
  title: "IRR, MIRR and the return margin",
  minutes: 15,
  intro:
    "Boards like a percentage. This chapter is about giving them one without letting it make the decision — and about the modified measure that fixes the worst of the original's flaws.",
  outcomes: [
    "Calculate an internal rate of return by interpolation and state what it means",
    "Explain why NPV is theoretically superior, in terms a non-specialist board will accept",
    "Identify the situations where IRR actively misleads: mutually exclusive projects and non-conventional cash flows",
    "Calculate and interpret the modified internal rate of return",
    "Advise on a project's return margin over its cost of capital",
  ],
  sections: [
    {
      id: "irr",
      heading: "What the internal rate of return actually is",
      blocks: [
        {
          kind: "text",
          md: "The internal rate of return is the discount rate at which a project's NPV is zero — the return the project earns on the capital tied up in it. Its appeal is that it is a percentage, comparable across projects of different sizes and directly comparable with the cost of capital. Its problems all follow from the same source: a percentage discards information about scale.",
        },
        {
          kind: "formula",
          name: "IRR by linear interpolation",
          expr: "IRR ≈ a + [NPVa ÷ (NPVa − NPVb)] × (b − a)",
          note:
            "a and b are two discount rates with NPVs of opposite sign. The estimate is only approximate because the NPV profile is a curve, not a line — so keep the two rates close together, and expect a small error if they are far apart.",
        },
        {
          kind: "example",
          title: "Interpolating an IRR",
          scenario:
            "A project costs $10m now and returns $4m, $5m and $6m at the ends of years 1 to 3. The cost of capital is 10%.",
          steps: [
            { label: "NPV at 10%", detail: "4/1.1 + 5/1.21 + 6/1.331 = 3.636 + 4.132 + 4.508 = 12.277, less 10 = +$2.277m." },
            { label: "NPV at 20%", detail: "4/1.2 + 5/1.44 + 6/1.728 = 3.333 + 3.472 + 3.472 = 10.278, less 10 = +$0.278m." },
            { label: "NPV at 22%", detail: "3.279 + 3.359 + 3.304 = 9.942, less 10 = −$0.058m — now negative, so the IRR lies between 20% and 22%." },
            { label: "Interpolate", detail: "20 + [0.278 ÷ (0.278 + 0.058)] × 2 = 20 + 0.827 × 2 = 21.7%." },
          ],
          result:
            "An IRR of about 21.7% against a 10% cost of capital — a comfortable margin, and consistent with the positive NPV of $2.28m.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The return margin is the useful output",
          md: "The syllabus asks you to advise on a project's **return margin** — the gap between the IRR and the cost of capital. Here it is 11.7 percentage points, which tells the board how far the cost of capital could rise, or the return fall, before the project stops adding value. That is a genuinely useful piece of information and it is the best use of an IRR.",
        },
      ],
      check: {
        q: "A project has an NPV of +$4m at 8% and −$1m at 12%. What is the approximate IRR?",
        options: [
          "10.0%",
          "11.2%",
          "9.6%",
          "It cannot be estimated from two points",
        ],
        correct: 1,
        explain:
          "Interpolating: 8 + [4 ÷ (4 + 1)] × (12 − 8) = 8 + 0.8 × 4 = 11.2%. The NPV falls from +4 to −1 across the four-point range, so the crossing point sits four-fifths of the way along, not halfway — which is why option 0 is the intuitive but wrong answer.",
      },
    },
    {
      id: "irr-problems",
      heading: "Where the IRR misleads",
      blocks: [
        {
          kind: "text",
          md: "Three failures are examinable, and the first is the one that reaches a board most often.",
        },
        {
          kind: "table",
          caption: "The three failures",
          head: ["Problem", "What happens", "Why it matters"],
          rows: [
            ["Scale blindness", "A small project can have a higher IRR than a much larger one with far more NPV", "A percentage cannot tell you how much wealth is created — 40% of $1m beats 15% of $50m only on the ratio"],
            ["Mutually exclusive projects", "IRR and NPV can rank two alternatives differently", "Only one can be taken, so the ranking IS the decision — and NPV is the one that maximises wealth"],
            ["Non-conventional cash flows", "More than one sign change gives multiple IRRs, or none at all", "A project with a large decommissioning cost at the end can have two mathematically valid IRRs, neither meaningful"],
          ],
        },
        {
          kind: "text",
          md: "There is also the **reinvestment assumption**. The IRR calculation implicitly assumes interim cash flows are reinvested at the IRR itself, which for a high-return project is optimistic — there is no reason to think the company can keep finding 22% opportunities. The NPV rule assumes reinvestment at the cost of capital, which is the realistic assumption and is what the modified measure restores.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The line to use with a board",
          md: "'The IRR tells you the rate of return; the NPV tells you how much richer the company will be. When the two disagree, follow the NPV, because shareholders bank pounds and not percentages.' State it once and then use the IRR for what it is good at — expressing the margin of safety over the cost of capital.",
        },
        {
          kind: "activity",
          title: "Resolve a conflicting ranking",
          prompt:
            "Project S costs $2m and has an NPV of $0.8m with an IRR of 31%. Project L costs $20m and has an NPV of $3.4m with an IRR of 17%. Only one can be undertaken and the cost of capital is 10%. Which do you recommend?",
          answer:
            "Project L, on NPV grounds: it adds $3.4m of value against S's $0.8m, and since the two are mutually exclusive the company can only bank one of them. S's superior IRR reflects that it earns a higher rate on a much smaller base, which is not the same as creating more wealth. The way to see this is incremental: the extra $18m committed to L generates an extra $2.6m of NPV, so the increment itself has a positive net present value at the cost of capital and is therefore worth making. The honest caveat is that this holds only if the $18m has no better use — under capital rationing, S plus something else might beat L, which is why the rationing question and the mutually-exclusive question have to be kept separate.",
        },
      ],
      check: {
        q: "A project involves an initial outlay, positive cash flows for eight years, and a large decommissioning payment in year nine. What problem may arise with its IRR?",
        options: [
          "The IRR will always be negative",
          "The cash flows change sign twice, so there may be two mathematically valid IRRs — or none — and neither can be compared meaningfully with the cost of capital",
          "The IRR cannot be calculated for projects longer than five years",
          "The IRR will equal the cost of capital exactly",
        ],
        correct: 1,
        explain:
          "Non-conventional cash flows — more than one sign change — can produce multiple roots to the NPV equation. Both are genuine solutions and neither supports a decision, so the NPV rule must be used instead. Nothing about the project's length or the sign of the return follows automatically, so the other options are unfounded.",
      },
    },
    {
      id: "mirr",
      heading: "The modified internal rate of return",
      blocks: [
        {
          kind: "text",
          md: "MIRR repairs the two worst defects: it assumes reinvestment at the cost of capital rather than at the project's own return, and because it produces a single value it removes the multiple-IRR problem entirely.",
        },
        {
          kind: "formula",
          name: "Modified internal rate of return",
          expr: "MIRR = [(PV of return phase ÷ PV of investment phase)^(1/n) × (1 + re)] − 1",
          note:
            "PVR is the present value of the inflows, PVI the present value of the outflows, n the project's life in years, and re the cost of capital. Both present values are taken at time zero at the cost of capital.",
        },
        {
          kind: "example",
          title: "MIRR on the same project",
          scenario:
            "The project from earlier: $10m out now, then $4m, $5m and $6m in years 1 to 3, at a 10% cost of capital. Its IRR was 21.7%.",
          steps: [
            { label: "PV of the return phase", detail: "3.636 + 4.132 + 4.508 = $12.277m." },
            { label: "PV of the investment phase", detail: "$10m, already at time zero." },
            { label: "Apply the formula", detail: "(12.277 ÷ 10)^(1/3) × 1.10 − 1 = 1.2277^0.3333 × 1.10 − 1 = 1.0708 × 1.10 − 1." },
            { label: "Result", detail: "1.1778 − 1 = 17.8%." },
          ],
          result:
            "MIRR of 17.8% against an IRR of 21.7%. The gap is the value of dropping the assumption that interim cash flows earn 21.7% — MIRR credits them with 10%, which is what the company can actually expect.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "MIRR is always between the IRR and the cost of capital",
          md: "For a conventional project with a positive NPV, MIRR sits below the IRR and above the cost of capital. If your answer falls outside that range, the arithmetic is wrong — usually the exponent, which is 1/n where n is the number of years, not the number of cash flows.",
        },
        {
          kind: "text",
          md: "MIRR still ranks by percentage, so it does not cure scale blindness: for mutually exclusive projects of different sizes, NPV remains the criterion. Its proper use is as a **better percentage** — one that can be quoted to a board alongside the NPV, and that supports a defensible statement of the return margin over the cost of capital.",
        },
      ],
      check: {
        q: "A project has an IRR of 24%, a MIRR of 16% and a cost of capital of 9%. What does the gap between the IRR and the MIRR represent?",
        options: [
          "An error in one of the two calculations",
          "The effect of the reinvestment assumption — the IRR credits interim cash flows with earning 24%, while the MIRR credits them with the 9% the company can realistically obtain",
          "The project's risk premium",
          "The rate of inflation over the project's life",
        ],
        correct: 1,
        explain:
          "The two measures differ only in what they assume happens to cash received during the project. The IRR's assumption flatters high-return projects, and the MIRR replaces it with reinvestment at the cost of capital — so the MIRR sits between the IRR and the cost of capital, exactly as these figures show.",
      },
    },
  ],
  examTraps: [
    { trap: "Recommending the higher-IRR project when two are mutually exclusive.", fix: "Follow the NPV — it measures wealth created, and check the incremental investment's own NPV to show why." },
    { trap: "Interpolating between two rates that are far apart.", fix: "The NPV profile is a curve; keep the rates close and acknowledge the approximation." },
    { trap: "Quoting an IRR for a project with more than one sign change.", fix: "Non-conventional flows give multiple or no IRRs — use NPV, and say why." },
    { trap: "Using n as the number of cash flows in the MIRR exponent.", fix: "n is the project's life in years; check the answer lies between the IRR and the cost of capital." },
  ],
  keyTerms: [
    { term: "Internal rate of return", def: "The discount rate at which a project's net present value is zero — the return earned on the capital invested in it." },
    { term: "Return margin", def: "The gap between a project's internal rate of return and the cost of capital, indicating how far returns can fall before value is destroyed." },
    { term: "Non-conventional cash flows", def: "A cash flow pattern with more than one change of sign, which can produce multiple internal rates of return or none." },
    { term: "Modified internal rate of return", def: "A return measure that assumes interim cash flows are reinvested at the cost of capital rather than at the project's own rate, giving a single unambiguous value." },
  ],
  summary: [
    "The IRR is the rate at which NPV is zero; its useful output is the margin over the cost of capital.",
    "It is blind to scale, can rank mutually exclusive projects wrongly, and breaks on non-conventional cash flows.",
    "MIRR fixes the reinvestment assumption and the multiple-root problem, and sits between the IRR and the cost of capital.",
    "When percentage and NPV disagree, follow the NPV — shareholders bank money, not rates.",
  ],
  knowledgeDiagnostic: [
    { q: "Why can the IRR rank mutually exclusive projects incorrectly?", a: "It is a percentage and ignores scale, so a small project earning a high rate can outrank a larger one that creates far more wealth." },
    { q: "What causes multiple internal rates of return?", a: "Non-conventional cash flows — more than one change of sign, typically from a large closure or decommissioning cost at the end of the project." },
    { q: "What does MIRR change about the IRR's assumptions?", a: "It assumes interim cash flows are reinvested at the cost of capital rather than at the project's own internal rate, which is the realistic assumption." },
  ],
  furtherStudy: [
    "AFM-10 produces the net present value this chapter's percentages are compared against.",
    "AFM-11 supplies the sensitivity analysis that complements the return margin as a measure of safety.",
    "Area B later establishes the project-specific cost of capital that the return margin is measured over.",
  ],
}

export const AFM_TREE_AREA_B_PART1: StudyChapter[] = [AFM_TREE_10, AFM_TREE_11, AFM_TREE_12, AFM_TREE_13]
