import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AFM · Area B, part two — option pricing theory in investment decisions (B2).
 *
 *   AFM-14  The Black-Scholes model and its five drivers   (B2a)
 *   AFM-15  Real options: delay, expand, redeploy, withdraw (B2b, B2c)
 *
 * The legacy Area B chapter taught real options in one section, using
 * Black-Scholes for an option to delay and nothing else. The syllabus asks for
 * the model's assumptions and limitations, for classification into archetypes,
 * and for all four named option types — so the split is one chapter on the
 * instrument and one on the application.
 *
 * Written against the official ACCA AFM syllabus and study guide for September
 * 2026 to June 2027. Kaplan's AFM Study Text and Exam Kit (2020-21) informed
 * depth and chapter sizing only; all wording is original.
 *
 * A note on the numbers: the worked example in AFM-15 is deliberately built so
 * the conventional NPV is NEGATIVE (-$5m) while the option to delay is worth
 * $8.42m. A project that a base-case appraisal rejects and flexibility makes
 * valuable is the whole point of the topic, and an example where both agree
 * teaches nothing.
 */

const AFM_TREE_14: StudyChapter = {
  paper: "AFM",
  id: "AFM-14",
  number: 14,
  area: "B",
  syllabusRefs: ["B2(a)"],
  title: "The Black-Scholes model and its five drivers",
  minutes: 18,
  intro:
    "A formula sheet gives you Black-Scholes. What the sheet cannot give you is which real-world quantity goes in which slot — and that mapping is where the marks are won and lost.",
  outcomes: [
    "Identify the five drivers of an option's value and say which way each pushes it",
    "Apply the Black-Scholes model to value a call, using the normal distribution tables correctly",
    "Use put-call parity to value a put from the corresponding call",
    "State the model's assumptions and explain which of them fail in a real-asset setting",
    "Separate an option's intrinsic value from its time value, and use the split to interpret an answer",
  ],
  sections: [
    {
      id: "five-drivers",
      heading: "The five drivers, and the direction each pushes",
      blocks: [
        {
          kind: "text",
          md: "The syllabus asks you to determine and discuss the five principal drivers of option value. Knowing the **direction** of each effect is worth more than the arithmetic, because it lets you sanity-check any answer and it supports the discussion marks that always accompany the calculation.",
        },
        {
          kind: "table",
          caption: "The five drivers of a call option's value",
          head: ["Driver", "Symbol", "Effect on a call", "Why"],
          rows: [
            ["Value of the underlying asset", "Pa", "Higher → more valuable", "You have the right to acquire something worth more"],
            ["Exercise price", "Pe", "Higher → less valuable", "You must pay more to acquire it"],
            ["Time to expiry", "t", "Longer → more valuable", "More time for the underlying to move in your favour, and the exercise price is paid later"],
            ["Volatility of the underlying", "s", "Higher → more valuable", "The upside is unlimited while the downside is capped at the premium — asymmetry rewards variability"],
            ["Risk-free rate", "r", "Higher → more valuable", "The present value of the exercise price you will pay falls"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Volatility is the counter-intuitive one — and the most examined",
          md: "Everywhere else in finance, more risk reduces value. For an option it **increases** value, because the holder is not obliged to exercise: a worse outcome is simply not taken up, so the loss is floored at the premium while the gain is not capped. Say this explicitly whenever volatility appears in a requirement — it is a reliable mark and it is the point candidates most often get backwards.",
        },
        {
          kind: "formula",
          name: "Black-Scholes call value",
          expr: "c = Pa·N(d₁) − Pe·N(d₂)·e^(−rt)",
          note:
            "d₁ = [ln(Pa/Pe) + (r + 0.5s²)t] ÷ (s√t), and d₂ = d₁ − s√t. N(d) is the cumulative normal probability. The exam supplies the formula and the tables — what it does not supply is the mapping from the scenario to Pa, Pe, t, s and r.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Reading the normal distribution tables",
          md: "ACCA's tables give the area between zero and d, not the cumulative probability. So for a positive d, N(d) = 0.5 + table value; for a negative d, N(d) = 0.5 − table value for |d|. Getting this wrong produces an answer that is wrong by roughly half the underlying's value, which is large enough to spot — if you check that your N(d) figures lie between 0 and 1 and that N(d₁) exceeds N(d₂).",
        },
      ],
      check: {
        q: "An analyst argues that a project's higher-than-expected volatility reduces the value of the option to delay investing in it. What is wrong with this?",
        options: [
          "Nothing — higher volatility always reduces value",
          "Volatility increases an option's value, because the holder can decline to exercise: the downside is capped at what was paid for the option while the upside is not capped",
          "Volatility has no effect on option value, only on the discount rate",
          "Volatility only affects put options, not calls",
        ],
        correct: 1,
        explain:
          "The asymmetry is the whole reason options are valuable. Wider dispersion raises the expected payoff of a position whose losses are truncated, so both calls and puts gain value from volatility. The analyst has applied ordinary risk intuition to an instrument built to exploit risk.",
      },
    },
    {
      id: "applying",
      heading: "Applying the model, and splitting the answer",
      blocks: [
        {
          kind: "example",
          title: "Valuing a call step by step",
          scenario:
            "A call option on an asset currently worth $50m, with an exercise price of $55m, expiring in 2 years. Volatility is 30% a year and the risk-free rate is 5%.",
          steps: [
            { label: "d₁ numerator", detail: "ln(50/55) = −0.0953; (r + 0.5s²)t = (0.05 + 0.5 × 0.09) × 2 = 0.19. Sum = 0.0947." },
            { label: "d₁ denominator", detail: "s√t = 0.30 × √2 = 0.4243. So d₁ = 0.0947 ÷ 0.4243 = 0.22." },
            { label: "d₂", detail: "d₂ = 0.22 − 0.4243 = −0.20." },
            { label: "Normal values", detail: "N(0.22) = 0.5 + 0.0871 = 0.5871. N(−0.20) = 0.5 − 0.0793 = 0.4207." },
            { label: "Substitute", detail: "c = 50 × 0.5871 − 55 × 0.4207 × e^(−0.05×2) = 29.355 − 55 × 0.4207 × 0.9048 = 29.355 − 20.938." },
          ],
          result: "c = $8.42m. Note that N(d₁) > N(d₂), as it always must be, since d₂ is d₁ less a positive quantity.",
        },
        {
          kind: "text",
          md: "Now split the answer, because the split is what makes it interpretable. **Intrinsic value** is what the option would be worth if exercised today: here the asset is worth $50m and exercise costs $55m, so intrinsic value is **nil** — it is out of the money. The whole $8.42m is therefore **time value**: it is paid entirely for the possibility that the asset's value rises above $55m within two years.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "waterfall",
            title: "Composition of the call value ($m)",
            data: {
              unit: "$m",
              items: [
                { label: "Intrinsic value", value: 0, kind: "start" },
                { label: "Time value", value: 8.42, kind: "delta" },
                { label: "Call value", value: 8.42, kind: "total" },
              ],
            },
          },
        },
        {
          kind: "formula",
          name: "Put-call parity",
          expr: "p = c − Pa + Pe·e^(−rt)",
          note:
            "Values a put from the corresponding call with the same underlying, exercise price and expiry. In the example above: p = 8.42 − 50 + 55 × 0.9048 = 8.42 − 50 + 49.77 = $8.19m.",
        },
        {
          kind: "text",
          md: "Put-call parity matters beyond the arithmetic: it is why an option to **abandon** (a put) can be valued from the same inputs as an option to **expand** (a call), and it is the relationship that lets the model be used on the equity-and-debt application the syllabus mentions in B4 — equity as a call option on the firm's assets, with the debt's face value as the exercise price.",
        },
      ],
      check: {
        q: "A Black-Scholes valuation returns a call value of $6m on an asset worth $40m with an exercise price of $45m. What is the intrinsic value and what does the answer consist of?",
        options: [
          "Intrinsic value $6m; the option is in the money",
          "Intrinsic value nil, because exercising today would cost $45m to acquire something worth $40m — so the entire $6m is time value, paid for the chance the asset rises above $45m before expiry",
          "Intrinsic value $5m, being the difference between the exercise price and the asset value",
          "Intrinsic value $40m, being the value of the underlying",
        ],
        correct: 1,
        explain:
          "A call's intrinsic value is the greater of nil and (asset value − exercise price), so it cannot be negative — the holder would simply not exercise. Here that is nil, and the whole valuation is time value. Option 2 takes the difference the wrong way round and ignores that intrinsic value has a floor of zero.",
      },
    },
    {
      id: "assumptions",
      heading: "The assumptions, and which of them break",
      blocks: [
        {
          kind: "text",
          md: "The syllabus asks explicitly for the model's underlying assumptions, structure, application **and limitations**. This is reliably examined as a discussion requirement attached to the calculation, and it is where a candidate who has only learned the formula runs out of material.",
        },
        {
          kind: "table",
          caption: "Assumption, and how it fares on a real project",
          head: ["Assumption", "Holds for a traded share option?", "Holds for a real option?"],
          rows: [
            ["The underlying is freely traded, with an observable price", "Yes", "No — a project has no market price, so Pa must be estimated as the PV of its cash flows"],
            ["Volatility is known and constant", "Approximately, from historic data", "No — there is no price history for a project, so volatility is a proxy or an estimate"],
            ["The option is European, exercisable only at expiry", "Depends on the contract", "No — most real options can be exercised at any time, which makes them worth more than the model says"],
            ["No dividends or leakage from the underlying", "Adjustable", "Often not — a delayed project loses cash flows to competitors entering first"],
            ["Returns are lognormally distributed", "Reasonable", "Doubtful — project outcomes are often lumpy or bimodal"],
            ["Frictionless markets, constant risk-free rate", "Approximately", "Approximately"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The direction of the error is examinable",
          md: "Two assumptions break in opposite directions. Treating an American-style real option as European **understates** its value, because early exercise is a right the model ignores. Ignoring leakage — the competitor who takes the market while you wait — **overstates** it. Saying which way the estimate is likely to be wrong is far stronger than listing limitations neutrally.",
        },
        {
          kind: "activity",
          title: "Justify the inputs you had to invent",
          prompt:
            "You have valued an option to delay a project using a volatility of 35% and a Pa taken as the present value of the project's forecast cash flows. A director asks how confident you are in the $12m answer. What do you say?",
          answer:
            "That the $12m is an indication of the order of magnitude of the flexibility, not a price. Two of the five inputs are estimates rather than observations. Pa is not a market price at all but the present value of our own forecasts, so it carries every uncertainty the base-case NPV carries, and the option value moves broadly with it. Volatility of 35% is a proxy - most likely taken from the share price volatility of quoted companies in the same sector, which reflects their whole business and financing risk rather than this project's. I would show the option value across a range of volatilities, say 25% to 45%, so the board sees the sensitivity rather than one figure. I would also say which way the model is likely to be biased: it treats the option as exercisable only at the end, when in practice we could commit at any point, which understates the value - while it ignores the competitor who may take the market while we wait, which overstates it. The defensible conclusion is that the flexibility is worth something substantial and clearly more than nil, which is what the base-case NPV implicitly assumed.",
        },
      ],
      check: {
        q: "Why does applying the Black-Scholes model to a real project tend to understate the value of the flexibility in one specific respect?",
        options: [
          "Because the model assumes volatility is zero",
          "Because the model prices a European option exercisable only at expiry, whereas most real options can be exercised at any point up to that date — a right that has value the model ignores",
          "Because the model ignores the risk-free rate",
          "Because the model assumes the exercise price rises with inflation",
        ],
        correct: 1,
        explain:
          "The right to act early is a genuine additional right, so an American-style option is worth at least as much as the European equivalent. The model prices the European version, so its answer is a floor in that respect — though other assumptions, notably the absence of leakage to competitors, push the estimate the other way.",
      },
    },
  ],
  examTraps: [
    { trap: "Saying higher volatility reduces the option's value.", fix: "It increases it — the downside is capped at the premium while the upside is not." },
    { trap: "Reading N(d) straight from the table.", fix: "ACCA's tables give the area from zero to d; add 0.5 for positive d, subtract from 0.5 for negative d." },
    { trap: "Reporting a negative intrinsic value.", fix: "Intrinsic value has a floor of nil — an option that would lose money is simply not exercised." },
    { trap: "Listing the model's limitations without direction.", fix: "Say which way each error runs: European treatment understates, ignored leakage overstates." },
  ],
  keyTerms: [
    { term: "Intrinsic value", def: "What an option would be worth if exercised immediately — for a call, the greater of nil and the underlying's value less the exercise price." },
    { term: "Time value", def: "The excess of an option's total value over its intrinsic value, paid for the possibility of favourable movement before expiry." },
    { term: "Put-call parity", def: "The fixed relationship linking the values of a put and a call with the same underlying, exercise price and expiry date." },
    { term: "Volatility", def: "The standard deviation of returns on the underlying, expressed per annum — the driver that raises option value because losses are truncated and gains are not." },
  ],
  summary: [
    "Five drivers: underlying value, exercise price, time, volatility and the risk-free rate.",
    "Volatility raises option value, which is the opposite of ordinary risk intuition and the most-examined point.",
    "Split the answer into intrinsic and time value — it is what makes the number interpretable.",
    "The assumptions break in both directions on a real project; say which way the estimate is biased.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does higher volatility increase an option's value?", a: "The holder is not obliged to exercise, so the loss is capped at what was paid while the gain is not — wider dispersion therefore raises the expected payoff." },
    { q: "How are ACCA's normal distribution tables read into N(d)?", a: "They give the area from zero to d, so N(d) = 0.5 + table value for positive d, and 0.5 − table value for |d| when d is negative." },
    { q: "Name one assumption that makes a real-option valuation too low and one that makes it too high.", a: "Too low: pricing it as European when it can be exercised early. Too high: ignoring leakage, such as a competitor capturing the market while the decision is deferred." },
  ],
  furtherStudy: [
    "AFM-15 applies this model to the four real option archetypes the syllabus names.",
    "AFM-11 covers the sensitivity analysis this chapter recommends running over the volatility input.",
    "Area B returns to option pricing to value equity and debt, treating equity as a call on the firm's assets.",
  ],
}

const AFM_TREE_15: StudyChapter = {
  paper: "AFM",
  id: "AFM-15",
  number: 15,
  area: "B",
  syllabusRefs: ["B2(b)", "B2(c)"],
  title: "Real options: delay, expand, redeploy and withdraw",
  minutes: 19,
  intro:
    "A conventional NPV assumes management commits now and then does nothing for twenty years. Real options price the fact that managers can wait, grow, switch and quit — and that those rights are worth money.",
  outcomes: [
    "Explain why a base-case NPV systematically undervalues a project containing flexibility",
    "Classify an embedded option into the correct archetype from the scenario",
    "Map a project's facts onto the five Black-Scholes inputs for each archetype",
    "Value an option to delay and interpret it against a negative base-case NPV",
    "Advise on the total value of a project as base-case NPV plus the value of its options",
  ],
  sections: [
    {
      id: "why-options",
      heading: "What the base-case NPV leaves out",
      blocks: [
        {
          kind: "text",
          md: "A discounted cash flow appraisal is a **passive** model. It assumes the decision is taken once, at the outset, and that the forecast then unfolds regardless of what management learns. Real projects are not like that: a board can wait for information before committing, expand if the first phase succeeds, switch the asset to another use, or shut down and recover what it can.",
        },
        {
          kind: "formula",
          name: "Total project value",
          expr: "Total value = base-case NPV + value of the embedded real options",
          note:
            "The options are additive to the NPV, not a substitute for it. A project with a small negative NPV and a large option value can be worth pursuing; one with a large positive NPV needs no option analysis to be approved.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Flexibility is worth most exactly where the NPV is least reliable",
          md: "Option value rises with volatility. So the projects whose base-case NPV deserves the least confidence — high uncertainty, wide range of outcomes — are precisely the ones whose flexibility is worth the most. That inverse relationship is the argument to put to a board that wants to reject an uncertain project on its point estimate alone.",
        },
        {
          kind: "table",
          caption: "The four archetypes the syllabus names",
          head: ["Option", "Type", "The right it confers", "Typical scenario clue"],
          rows: [
            ["Delay (defer)", "Call", "To invest later, once uncertainty resolves", "A licence or lease giving exclusive rights for a period"],
            ["Expand (follow-on)", "Call", "To make a further investment if phase one succeeds", "A pilot, a first store, a platform investment"],
            ["Redeploy (switch)", "Call or put", "To change the asset's use, inputs or outputs", "Dual-fuel plant, flexible tooling, a convertible facility"],
            ["Withdraw (abandon)", "Put", "To exit and recover a residual value", "A stated resale value, or a contract with a break clause"],
          ],
        },
      ],
      check: {
        q: "A company holds a five-year exclusive licence to develop a mineral deposit. Commodity prices are highly volatile and the project's current NPV is slightly negative. What should the appraisal recognise?",
        options: [
          "The project should be rejected, as the NPV is negative",
          "The licence is an option to delay — a call whose value rises with the price volatility — so the opportunity may be worth substantially more than the negative NPV suggests, and it should not be abandoned",
          "The NPV should be recalculated at a lower discount rate to make it positive",
          "The licence has no value until development begins",
        ],
        correct: 1,
        explain:
          "Exclusivity for a defined period is precisely an option to delay: the company can wait and commit only if prices rise. High volatility makes that right more valuable, not less. Rejecting on the base-case NPV discards the flexibility, and option 2 would manufacture the desired answer by manipulating the rate rather than valuing the right.",
      },
    },
    {
      id: "mapping",
      heading: "Mapping the scenario onto the five inputs",
      blocks: [
        {
          kind: "text",
          md: "This is the step that separates candidates. The formula is given; deciding what Pa and Pe **are** in a particular scenario is the examinable judgement, and it differs by archetype.",
        },
        {
          kind: "table",
          caption: "Input mapping by archetype",
          head: ["Archetype", "Pa (underlying)", "Pe (exercise price)", "t"],
          rows: [
            ["Delay", "PV of the project's future cash flows", "The investment cost that would be paid", "The period the right lasts"],
            ["Expand", "PV of the FOLLOW-ON project's cash flows", "The cost of the follow-on investment", "Time until the follow-on decision must be taken"],
            ["Redeploy", "PV of cash flows in the new use", "Cost of switching", "Period over which switching remains possible"],
            ["Withdraw", "PV of the project's remaining cash flows", "The abandonment or resale proceeds", "Period over which abandonment is possible"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The expansion trap",
          md: "For an option to expand, Pa and Pe are the **follow-on** project's figures, not the original project's. Candidates routinely value the wrong asset here. The first project's own NPV stays where it is; the option adds the value of the right to make a second, separate investment on favourable terms.",
        },
        {
          kind: "text",
          md: "One further judgement: **the exercise price is usually not discounted by you**, because the model discounts it — that is what the e^(−rt) term does. Where the investment cost is stated as a future amount, use it as given. Where a scenario gives today's cost and says it will rise with inflation, inflate it to the exercise date first, then let the model discount it at the risk-free rate.",
        },
      ],
      check: {
        q: "A company invests $30m in a pilot plant with an NPV of −$2m. Success would allow a $90m full-scale plant in three years, whose cash flows have a present value today of $85m. What are Pa and Pe for the expansion option?",
        options: [
          "Pa = $30m and Pe = $2m",
          "Pa = $85m, the present value of the full-scale plant's cash flows, and Pe = $90m, the cost of the full-scale investment",
          "Pa = $90m and Pe = $85m",
          "Pa = $85m and Pe = $30m, the pilot's cost",
        ],
        correct: 1,
        explain:
          "The option is the right to build the full-scale plant, so the underlying is that plant's value and the exercise price is what it costs to build. The pilot's own $30m cost and −$2m NPV belong in the base-case appraisal, not in the option inputs. Option 2 reverses the two, which would value the right to sell rather than to build.",
      },
    },
    {
      id: "worked",
      heading: "Valuing an option to delay, against a negative NPV",
      blocks: [
        {
          kind: "example",
          title: "The project the base case rejects",
          scenario:
            "A company holds the right for 2 years to invest $55m in a project whose future cash flows have a present value of $50m. The volatility of comparable projects' returns is 30% a year and the risk-free rate is 5%.",
          steps: [
            { label: "Base-case NPV", detail: "50 − 55 = −$5m. On a conventional appraisal the project is rejected." },
            { label: "Map the inputs", detail: "Pa = 50 (PV of cash flows), Pe = 55 (investment cost), t = 2, s = 0.30, r = 0.05." },
            { label: "Black-Scholes", detail: "d₁ = 0.22, d₂ = −0.20; N(d₁) = 0.5871, N(d₂) = 0.4207." },
            { label: "Option value", detail: "c = 50 × 0.5871 − 55 × 0.4207 × 0.9048 = 29.355 − 20.938 = $8.42m." },
            { label: "Total value", detail: "The right to invest is worth $8.42m today, against a base case that says the investment destroys $5m." },
          ],
          result:
            "Recommendation: do NOT invest now — the base case is correctly negative. But do not abandon the opportunity either: the right to invest later is worth $8.42m, and selling or surrendering it for less would destroy value.",
        },
        {
          kind: "text",
          md: "Read the result carefully, because the two conclusions coexist and candidates usually report only one. The base-case NPV answers 'should we commit today?' — no. The option value answers 'what is the opportunity worth?' — $8.42m. A board that conflates the two either invests in a value-destroying project or gives away a valuable right.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Two questions, two answers",
            data: {
              leftTitle: "Base-case NPV",
              rightTitle: "Option to delay",
              rows: [
                { aspect: "Question answered", left: "Commit now?", right: "What is the right worth?" },
                { aspect: "Value", left: "−$5m", right: "+$8.42m" },
                { aspect: "Assumes", left: "Decision taken today, irreversibly", right: "Decision can wait for information" },
                { aspect: "Effect of higher volatility", left: "None directly", right: "Raises the value" },
                { aspect: "Recommendation", left: "Do not invest today", right: "Retain the right; do not sell it cheaply" },
              ],
            },
          },
        },
        {
          kind: "activity",
          title: "What would make the delay worthless?",
          prompt:
            "Name two circumstances in which the $8.42m above would substantially overstate the value of waiting.",
          answer:
            "First, competitive leakage. If a rival can enter the same market while we wait, the cash flows we are preserving the right to are being consumed by someone else - so the underlying asset is shrinking during the option's life. Black-Scholes assumes no such leakage, and where it exists the model overstates the option badly; the practical consequence is that first-mover advantage can make immediate investment right even when waiting looks attractive on the arithmetic. Second, if waiting resolves no uncertainty. The value of delay comes from information arriving - a price becoming observable, a regulation being settled, a trial reporting. If nothing will be known in two years that is not known now, then all the delay does is postpone the cash flows, and there is no informational reason to hold back. A third and more practical one is if the right is not genuinely exclusive: an option only has value if nobody else can take the underlying opportunity, so a licence others also hold is not the option the model is pricing.",
        },
      ],
      check: {
        q: "A project has a base-case NPV of −$3m and an option to abandon valued at $5m. What should be advised?",
        options: [
          "Reject the project, since the base-case NPV is negative",
          "Accept it: total value is −3 + 5 = +$2m, because the right to exit and recover value is worth more than the base case's shortfall — provided the abandonment value is genuinely realisable",
          "Accept it, because an option to abandon always makes a project viable",
          "The two figures cannot be added together",
        ],
        correct: 1,
        explain:
          "Option values are additive to the base-case NPV, so total value is +$2m and the project adds value once the flexibility is priced. The qualification matters, though: the abandonment value must be genuinely obtainable, since a resale figure for a specialised asset with no market is an assumption rather than a value. Option 2 overstates it into a rule.",
      },
    },
  ],
  examTraps: [
    { trap: "Using the original project's figures for an option to expand.", fix: "Pa and Pe are the follow-on investment's present value and cost." },
    { trap: "Reporting only the option value and dropping the base case.", fix: "They answer different questions — commit now, versus what the right is worth." },
    { trap: "Treating the option value as replacing the NPV.", fix: "Total value is base-case NPV plus option value; the two are additive." },
    { trap: "Valuing an option to delay where waiting resolves nothing.", fix: "Delay is only valuable if information arrives, and if the opportunity is genuinely exclusive." },
  ],
  keyTerms: [
    { term: "Real option", def: "A right, not an obligation, to take a future course of action on a real asset — to delay, expand, redeploy or withdraw — which has value because management can respond to what it learns." },
    { term: "Option to delay", def: "The right to postpone an investment until uncertainty has partly resolved, valued as a call on the project's cash flows with the investment cost as exercise price." },
    { term: "Follow-on option", def: "The right to make a further, larger investment if an initial project succeeds — valued on the follow-on project's own figures." },
    { term: "Leakage", def: "Loss of the underlying opportunity's value while an option is held unexercised, typically to competitors entering the market first." },
  ],
  summary: [
    "A base-case NPV assumes an irreversible decision taken once, so it undervalues any project containing flexibility.",
    "Option value rises with volatility, so it is largest exactly where the point estimate is least reliable.",
    "Classify the archetype first, then map the scenario onto Pa, Pe and t — expansion uses the follow-on's figures.",
    "Total value is base-case NPV plus option value; report both, because they answer different questions.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does a conventional NPV undervalue a flexible project?", a: "It models a single irreversible commitment and assumes management takes no further decisions, so the rights to wait, expand, switch or exit are priced at nil." },
    { q: "For an option to expand, what is the underlying asset?", a: "The follow-on project's cash flows, valued at present value — not the original project's." },
    { q: "When is an option to delay worth little despite high volatility?", a: "When waiting resolves no uncertainty, when the opportunity is not exclusive, or when competitors erode the underlying value while the decision is deferred." },
  ],
  furtherStudy: [
    "AFM-14 supplies the model, the five drivers and the assumptions this chapter applies.",
    "AFM-12's stage-gating discussion is the practical mechanism that preserves the options priced here.",
    "AFM-03 covers the monitoring systems that let a board actually exercise an abandonment option in time.",
  ],
}

export const AFM_TREE_AREA_B_PART2: StudyChapter[] = [AFM_TREE_14, AFM_TREE_15]
