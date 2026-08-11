import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FM · Area D — investment appraisal.
 *
 * The core of the paper and the most likely Section C question. It was ONE
 * chapter for D1 to D4: payback, ARR, NPV, IRR, tax, inflation, risk,
 * lease-or-buy, replacement AND capital rationing, together.
 *
 *   FM-09  Payback and return on capital employed        (D1)
 *   FM-10  Discounted cash flow: NPV and IRR             (D1)
 *   FM-11  Tax and inflation in DCF                      (D2)
 *   FM-12  Risk and uncertainty                          (D3)
 *   FM-13  Lease or buy, replacement, capital rationing  (D4)
 *
 * Written against the official ACCA FM syllabus and study guide, not derived
 * from any approved-provider text — see acca-study-fm-tree-a.ts.
 */

const FM_TREE_09: StudyChapter = {
  paper: "FM",
  id: "FM-09",
  number: 9,
  area: "D",
  syllabusRefs: ["D1(a)", "D1(b)"],
  title: "Payback and return on capital employed",
  minutes: 15,
  intro:
    "Two appraisal methods that ignore the time value of money — and are still used by most boards in the world. Knowing why they survive is as examinable as knowing why they are wrong.",
  outcomes: [
    "Calculate payback period, including for uneven cash flows",
    "Calculate return on capital employed (accounting rate of return)",
    "Discuss the advantages and limitations of each",
    "Explain why neither is sufficient on its own",
  ],
  sections: [
    {
      id: "payback",
      heading: "Payback period",
      blocks: [
        {
          kind: "definition",
          term: "Payback period",
          md: "The time taken for the **cumulative cash inflows** to recover the initial investment. A decision rule needs a target: accept if payback is shorter than the company's maximum acceptable period.",
        },
        {
          kind: "example",
          title: "Payback with uneven flows",
          scenario: "An investment of £250,000 generates: year 1 £80,000, year 2 £90,000, year 3 £110,000, year 4 £70,000.",
          steps: [
            { label: "End of year 1", detail: "Cumulative £80,000 — £170,000 still to recover" },
            { label: "End of year 2", detail: "Cumulative £170,000 — £80,000 still to recover" },
            { label: "Year 3 recovers it", detail: "£80,000 needed from a year-3 inflow of £110,000" },
            { label: "Fraction of year 3", detail: "80,000 / 110,000 = 0.73 of a year" },
          ],
          result:
            "Payback is 2.73 years, or about 2 years 9 months. The fraction assumes cash arrives EVENLY through year 3 — say so, because in most businesses it does not.",
        },
        {
          kind: "table",
          caption: "Payback, judged honestly",
          head: ["Why it survives", "Why it is not enough"],
          rows: [
            ["Simple to calculate and to explain to non-financial managers", "Ignores everything after the payback point — a project could pay back fast and then lose money"],
            ["Focuses on liquidity, which matters to a cash-constrained business", "Ignores the time value of money entirely"],
            ["Reduces exposure to distant, less reliable forecasts", "Gives no measure of profitability or of the increase in shareholder wealth"],
            ["Useful in fast-moving industries where later years are guesswork", "The target period is arbitrary — no theory sets it"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Discounted payback",
          md: "Discount the cash flows first, then compute payback. It fixes the time-value criticism and none of the others — it still ignores everything beyond the payback point. Worth a mark for naming it as a partial improvement.",
        },
      ],
      check: {
        q: "Project A pays back in 2 years then generates nothing. Project B pays back in 3 years then generates £500,000 a year for a decade. On payback alone, which is chosen?",
        options: ["B, because total cash is far higher", "A, because payback is shorter", "Neither — payback cannot compare them", "Both are equally acceptable"],
        correct: 1,
        explain:
          "Payback picks A, which is obviously the wrong decision. That is the point of the question: payback ignores everything after the payback point, so it must never be the only method used.",
      },
    },
    {
      id: "roce",
      heading: "Return on capital employed",
      blocks: [
        {
          kind: "formula",
          name: "ROCE / accounting rate of return",
          expr: "ROCE = Average annual accounting PROFIT / Initial (or average) investment × 100",
          note: "Average investment = (Initial cost + Scrap value) / 2. Read the question — it will tell you which basis to use, and the two give different answers.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "PROFIT, not cash",
          md: "This is the one appraisal method in FM that uses accounting profit — so depreciation IS deducted, unlike everywhere else in this area. Using cash flows here is a guaranteed lost mark, and using profit in an NPV is the same error in reverse.",
        },
        {
          kind: "example",
          title: "ROCE on both bases",
          scenario:
            "An asset costs £400,000, has a four-year life and a scrap value of £40,000. Annual cash inflows are £150,000. Depreciation is straight line.",
          steps: [
            { label: "Annual depreciation", detail: "(400,000 − 40,000) / 4 = £90,000" },
            { label: "Annual profit", detail: "£150,000 cash − £90,000 depreciation = £60,000" },
            { label: "ROCE on initial", detail: "60,000 / 400,000 × 100 = 15.0%" },
            { label: "Average investment", detail: "(400,000 + 40,000) / 2 = £220,000" },
            { label: "ROCE on average", detail: "60,000 / 220,000 × 100 = 27.3%" },
          ],
          result:
            "15.0% or 27.3% — from identical facts. The basis must be stated. If the question gives a target return it will normally also state the basis; if it does not, say which you used.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The criticisms that carry marks",
          items: [
            "**Uses profit, not cash** — and profit is affected by accounting policy, especially depreciation.",
            "**Ignores the time value of money** — a percentage with no timing in it.",
            "**A relative measure**, so it takes no account of project size: 30% on £10,000 is worth less than 20% on £1m.",
            "**The target is arbitrary**, and comparing a project ROCE with a company ROCE can reject good projects that dilute a high current return.",
          ],
        },
      ],
      check: {
        q: "An asset costs £600,000 with no scrap value and a five-year life. Annual cash flow is £200,000. What is ROCE on the initial investment?",
        options: ["33.3%", "13.3%", "26.7%", "20.0%"],
        correct: 1,
        explain:
          "Depreciation = 600,000/5 = £120,000. Profit = 200,000 − 120,000 = £80,000. ROCE = 80,000/600,000 = 13.3%. The 33.3% distractor uses the cash flow without deducting depreciation — the classic error.",
      },
    },
  ],
  examTraps: [
    { trap: "Using cash flows in ROCE.", fix: "ROCE uses accounting profit, so depreciation is deducted. It is the only appraisal method here that does." },
    { trap: "Not stating whether ROCE is on initial or average investment.", fix: "The two differ substantially. Say which, every time." },
    { trap: "Recommending a project on payback alone.", fix: "Payback ignores everything after the payback point. Use it alongside NPV, never instead of it." },
  ],
  keyTerms: [
    { term: "Payback period", def: "The time for cumulative cash inflows to recover the initial investment." },
    { term: "Discounted payback", def: "Payback calculated on discounted cash flows, addressing the time-value criticism only." },
    { term: "ROCE / ARR", def: "Average annual accounting profit as a percentage of the initial or average investment." },
  ],
  summary: [
    "Payback is time to recover the outlay; simple, liquidity-focused, and blind after that point.",
    "Interpolating within a year assumes cash arrives evenly — state the assumption.",
    "ROCE uses PROFIT, so depreciation is deducted.",
    "Average investment is (initial + scrap) / 2, and the basis must be stated.",
    "Neither method discounts, so neither measures the change in shareholder wealth.",
  ],
  knowledgeDiagnostic: [
    { q: "What does payback measure, and what does it ignore?", a: "The time for cumulative cash inflows to repay the initial investment. It ignores all cash flows after payback and the time value of money." },
    { q: "Which appraisal method uses accounting profit rather than cash flow?", a: "ROCE / accounting rate of return." },
    { q: "How is average investment calculated?", a: "(Initial cost + scrap value) / 2." },
    { q: "Why is discounted payback only a partial improvement?", a: "It fixes the time-value criticism but still ignores every cash flow after the payback point." },
  ],
  furtherStudy: ["FM-10 introduces the methods that do measure the change in shareholder wealth."],
}

const FM_TREE_10: StudyChapter = {
  paper: "FM",
  id: "FM-10",
  number: 10,
  area: "D",
  syllabusRefs: ["D1(c)", "D1(d)", "D1(e)"],
  title: "Discounted cash flow: NPV and IRR",
  minutes: 19,
  intro:
    "NPV is the amount by which a project increases shareholder wealth. That single sentence is why it outranks every other method in this paper.",
  outcomes: [
    "Calculate net present value and apply the decision rule",
    "Calculate internal rate of return by interpolation",
    "Explain the assumptions underlying DCF appraisal",
    "Explain why NPV is superior to IRR where the two conflict",
  ],
  sections: [
    {
      id: "npv",
      heading: "Net present value",
      blocks: [
        {
          kind: "formula",
          name: "Net present value",
          expr: "NPV = Σ [ CFt / (1 + r)ᵗ ] − I₀",
          note: "CFt = net cash flow in year t · r = cost of capital · I₀ = initial investment at T0",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why NPV is the right answer",
          md: "A positive NPV is the increase in shareholder wealth, measured in today's money, after paying the providers of capital their required return. That is precisely the objective from FM-02 — which is why NPV is not just one method among several.",
        },
        {
          kind: "list",
          style: "number",
          title: "Rules that decide most of the marks",
          items: [
            "**Cash flows, not profits.** Add back depreciation if you are given profit. Depreciation is not a cash flow.",
            "**Relevant cash flows only** — future, incremental and cash. Ignore sunk costs, apportioned fixed overheads and any cost that occurs regardless.",
            "**T0 is now.** The initial investment is not discounted; year-1 flows are discounted once.",
            "**Working capital** is an outflow when invested, an outflow for each increase, and is **recovered in full in the final year**. Forgetting the recovery is a very common omission.",
            "**Include opportunity costs** — the contribution forgone by using a resource on this project rather than its next best use.",
          ],
        },
        {
          kind: "example",
          title: "A short NPV",
          scenario:
            "Investment £500,000 at T0. Net cash inflows £180,000 a year for four years. Working capital of £40,000 is required at T0 and recovered at the end of year 4. Cost of capital 10%.",
          steps: [
            { label: "T0", detail: "−500,000 − 40,000 = −£540,000 (not discounted)" },
            { label: "Years 1–4 inflows", detail: "£180,000 × 4-year annuity factor at 10% = 180,000 × 3.170 = £570,600" },
            { label: "Working capital recovered, year 4", detail: "40,000 × 0.683 = £27,320" },
            { label: "NPV", detail: "570,600 + 27,320 − 540,000 = £57,920" },
          ],
          result:
            "Positive, so accept — the project adds £57,920 to shareholder wealth in today's terms. Note the annuity factor for the level flows: adding four separate discount factors gets the same answer and wastes exam minutes.",
        },
      ],
      check: {
        q: "Which of these is a relevant cash flow in an NPV appraisal?",
        options: [
          "The market research already commissioned and paid for",
          "A share of head office rent apportioned to the project",
          "Contribution lost on existing sales that the new product will cannibalise",
          "Depreciation of the new machine",
        ],
        correct: 2,
        explain:
          "Lost contribution is future, incremental and cash — a genuine opportunity cost of going ahead. Market research already paid for is sunk; apportioned rent is not incremental; depreciation is not cash.",
      },
    },
    {
      id: "irr",
      heading: "Internal rate of return",
      blocks: [
        {
          kind: "definition",
          term: "Internal rate of return",
          md: "The discount rate at which a project's **NPV is exactly zero**. Accept if the IRR exceeds the cost of capital.",
        },
        {
          kind: "formula",
          name: "IRR by linear interpolation",
          expr: "IRR ≈ a + [ NPVa / (NPVa − NPVb) ] × (b − a)",
          note: "a and b are the two discount rates tried; NPVa and NPVb are the NPVs at those rates. Keep the signs — NPVb is normally negative, so the denominator grows.",
        },
        {
          kind: "example",
          title: "Interpolating",
          scenario: "At 10% a project has an NPV of +£57,920. At 15% it has an NPV of −£18,400.",
          steps: [
            { label: "Substitute", detail: "10 + [57,920 / (57,920 − (−18,400))] × (15 − 10)" },
            { label: "Denominator", detail: "57,920 + 18,400 = 76,320" },
            { label: "Fraction", detail: "57,920 / 76,320 = 0.759" },
            { label: "IRR", detail: "10 + (0.759 × 5) = 13.8%" },
          ],
          result:
            "IRR ≈ 13.8%, comfortably above a 10% cost of capital, so accept. It is an ESTIMATE: interpolation draws a straight line through a curve, so quote one decimal place at most and keep the two rates close together.",
        },
        {
          kind: "table",
          caption: "Where IRR goes wrong and NPV does not",
          head: ["Problem", "What happens"],
          rows: [
            ["Non-conventional cash flows", "More than one sign change gives MULTIPLE IRRs, none of them meaningful"],
            ["Mutually exclusive projects", "IRR can favour a small project with a high percentage over a large one that adds far more wealth"],
            ["Scale is invisible", "A percentage says nothing about how much wealth is created"],
            ["Reinvestment assumption", "IRR implicitly assumes interim cash is reinvested at the IRR; NPV assumes the cost of capital, which is realistic"],
            ["Changing cost of capital", "NPV handles a different rate each year; a single IRR cannot be compared against several"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "When they conflict, NPV wins",
          md: "Always. NPV measures the absolute increase in shareholder wealth; IRR measures a rate. If a question sets them against each other it is testing exactly this, and the answer is to follow NPV and explain why.",
        },
      ],
      check: {
        q: "Project X: invest £10,000, NPV £3,000, IRR 30%. Project Y: invest £100,000, NPV £18,000, IRR 20%. They are mutually exclusive. Which should be chosen?",
        options: ["X, because its IRR is higher", "Y, because its NPV is higher", "Either — both exceed the cost of capital", "X, because it uses less capital"],
        correct: 1,
        explain:
          "Y adds £18,000 to shareholder wealth against X's £3,000. IRR's higher percentage on a small base is exactly the trap — unless capital is rationed, which is a different question (see FM-13).",
      },
    },
    {
      id: "assumptions",
      heading: "What DCF assumes",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "Assumptions worth stating in a written answer",
          items: [
            "Cash flows are **known with certainty** and occur at **year ends** — a simplification, since real flows arrive throughout the year.",
            "The **cost of capital is known and constant** over the project's life.",
            "**Capital markets are perfect** — funds are available at that rate in any quantity needed.",
            "Cash flows are the **only relevant consequence**, so non-financial factors are excluded.",
            "**Inflation and tax** are handled consistently — the subject of the next chapter.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How to earn the discussion marks",
          md: "After computing the NPV, name two or three assumptions that the SCENARIO makes doubtful, and say which direction the error would run. \"Cash flows are assumed certain\" is generic; \"the year-4 volume assumes a contract renewal that is not yet agreed\" is worth the mark.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Discounting the initial investment.", fix: "T0 is today. Its discount factor is 1." },
    { trap: "Forgetting to recover working capital in the final year.", fix: "It comes back in full, discounted at the final year's factor." },
    { trap: "Including depreciation, sunk costs or apportioned overheads.", fix: "Relevant cash flows only: future, incremental and cash." },
    { trap: "Choosing the higher IRR between mutually exclusive projects.", fix: "Follow the NPV and explain that IRR ignores scale." },
  ],
  keyTerms: [
    { term: "Net present value", def: "The present value of a project's cash flows less its initial investment — the increase in shareholder wealth." },
    { term: "Internal rate of return", def: "The discount rate at which NPV is zero." },
    { term: "Relevant cash flow", def: "A cash flow that is future, incremental and arises only because of the decision." },
    { term: "Opportunity cost", def: "The benefit forgone by using a resource for this project rather than its best alternative." },
  ],
  summary: [
    "NPV is the increase in shareholder wealth in today's money; accept if positive.",
    "Use cash flows, not profits, and only relevant ones.",
    "T0 is undiscounted; working capital is recovered in the final year.",
    "IRR is found by interpolation and is an estimate.",
    "Where NPV and IRR disagree, NPV is correct — IRR ignores scale and can be multiple.",
  ],
  knowledgeDiagnostic: [
    { q: "What does a positive NPV actually mean?", a: "The project increases shareholder wealth by that amount in present-value terms, after the providers of capital receive their required return." },
    { q: "State the IRR interpolation formula.", a: "a + [NPVa / (NPVa − NPVb)] × (b − a)." },
    { q: "Give two reasons NPV is preferred to IRR.", a: "IRR ignores project scale and can produce multiple values with non-conventional cash flows; it also assumes reinvestment at the IRR rather than the cost of capital." },
    { q: "Name three relevant-cash-flow rules.", a: "Exclude sunk costs, exclude apportioned fixed overheads, include opportunity costs. (Also: cash not profit, so add back depreciation.)" },
  ],
  furtherStudy: [
    "FM-11 adds the two complications every real appraisal has: tax and inflation.",
    "AFM extends NPV to adjusted present value, real options and international projects.",
  ],
}

const FM_TREE_11: StudyChapter = {
  paper: "FM",
  id: "FM-11",
  number: 11,
  area: "D",
  syllabusRefs: ["D2(a)", "D2(b)", "D2(c)"],
  title: "Tax and inflation in DCF",
  minutes: 19,
  intro:
    "Two complications that appear in almost every Section C appraisal, and the place most marks are lost — not through difficulty, but through inconsistency.",
  outcomes: [
    "Incorporate taxation on operating flows and capital allowances into an NPV",
    "Handle tax paid in arrears and balancing allowances or charges",
    "Distinguish the money (nominal) and real approaches to inflation",
    "Apply the Fisher effect and keep cash flows and discount rates consistent",
  ],
  sections: [
    {
      id: "tax",
      heading: "Taxation",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "Three tax effects, and none may be missed",
          items: [
            "**Tax on operating cash flows** — the taxable profit multiplied by the tax rate, as an outflow.",
            "**Tax saved by capital allowances** — writing-down allowances on the asset, multiplied by the tax rate, as an inflow.",
            "**A balancing allowance or charge on disposal** — the difference between the tax written-down value and the sale proceeds, giving a final saving or extra charge.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Read the timing sentence twice",
          md: "\"Tax is payable one year in arrears\" moves every tax flow one year later, which changes every discount factor applied to it. It is one line in the question and it is worth several marks.",
        },
        {
          kind: "example",
          title: "Capital allowances on a reducing balance",
          scenario:
            "An asset costs £100,000, is sold for £30,000 after three years, and attracts writing-down allowances at 25% reducing balance. Tax is 30%.",
          steps: [
            { label: "Year 1 WDA", detail: "100,000 × 25% = £25,000 → tax saved 25,000 × 30% = £7,500" },
            { label: "Year 2 WDA", detail: "75,000 × 25% = £18,750 → tax saved £5,625" },
            { label: "Written-down value at disposal", detail: "100,000 − 25,000 − 18,750 = £56,250" },
            { label: "Balancing allowance", detail: "56,250 − 30,000 proceeds = £26,250 → tax saved £7,875" },
            { label: "Check", detail: "Total allowances 25,000 + 18,750 + 26,250 = £70,000 = cost £100,000 − proceeds £30,000 ✓" },
          ],
          result:
            "Total tax relief is on the £70,000 the asset actually cost the business. That check — total allowances equal net cost — catches nearly every arithmetic error in this calculation.",
        },
      ],
      check: {
        q: "An asset cost £80,000 and has a tax written-down value of £45,000 when sold for £52,000. What arises?",
        options: [
          "A balancing allowance of £7,000",
          "A balancing charge of £7,000",
          "A balancing allowance of £28,000",
          "Nothing — the asset was sold at a profit",
        ],
        correct: 1,
        explain:
          "Proceeds exceed the written-down value, so too much relief was given and it is clawed back: a balancing CHARGE of £52,000 − £45,000 = £7,000, which increases the tax paid. An allowance arises the other way round.",
      },
    },
    {
      id: "inflation",
      heading: "Inflation",
      blocks: [
        {
          kind: "formula",
          name: "The Fisher effect",
          expr: "(1 + i) = (1 + r) × (1 + h)",
          note: "i = money (nominal) rate · r = real rate · h = general inflation. Rearranged: (1 + r) = (1 + i) / (1 + h)",
        },
        {
          kind: "table",
          caption: "Two methods, one rule",
          head: ["Method", "Cash flows", "Discount rate", "When to use"],
          rows: [
            ["Money / nominal", "Inflated to actual amounts", "Money rate", "Always safe — and essential when flows inflate at DIFFERENT rates"],
            ["Real", "In today's prices", "Real rate", "Only when every flow inflates at the same general rate"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The rule that prevents the classic error",
          md: "**Money cash flows at the money rate; real cash flows at the real rate.** Mixing them — inflating the cash flows and then discounting at the real rate — double-counts inflation and is the single most common mistake in this area.",
        },
        {
          kind: "example",
          title: "Different inflation rates force the money method",
          scenario:
            "Sales inflate at 5% a year, costs at 8%. The real cost of capital is 7% and general inflation is 4%.",
          steps: [
            { label: "Why real fails", detail: "Sales and costs inflate at different rates, so no single deflation restores today's prices" },
            { label: "Money rate", detail: "(1 + 0.07)(1 + 0.04) = 1.1128 → 11.28%, say 11%" },
            { label: "Year 2 sales", detail: "Current sales × 1.05²" },
            { label: "Year 2 costs", detail: "Current costs × 1.08²" },
          ],
          result:
            "Inflate each line at its OWN specific rate, then discount everything at the money rate of 11%. Whenever a question gives you more than one inflation rate, it is telling you to use the money method.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Tax and inflation together",
          md: "Capital allowances are based on **historic cost**, so they never inflate. In a money-method appraisal every operating flow is inflated and the allowances are not — a difference candidates routinely miss.",
        },
      ],
      check: {
        q: "The real cost of capital is 6% and general inflation is 5%. What is the money cost of capital?",
        options: ["11.0%", "11.3%", "1.2%", "10.7%"],
        correct: 1,
        explain:
          "(1.06)(1.05) = 1.113, so 11.3%. Simply adding 6% + 5% = 11% is close but wrong — the Fisher relationship is multiplicative, and the examiner sets 11.0% as the distractor for exactly that reason.",
      },
    },
  ],
  examTraps: [
    { trap: "Inflating cash flows and then discounting at the real rate.", fix: "Money flows at the money rate; real flows at the real rate. Never cross them." },
    { trap: "Adding the real rate and inflation instead of compounding them.", fix: "(1 + i) = (1 + r)(1 + h) — multiply, don't add." },
    { trap: "Inflating capital allowances.", fix: "They are computed on historic cost and never inflate." },
    { trap: "Ignoring the one-year lag on tax.", fix: "Move every tax flow a year later and discount accordingly." },
  ],
  keyTerms: [
    { term: "Money (nominal) rate", def: "A discount rate including the effect of inflation." },
    { term: "Real rate", def: "A discount rate excluding inflation, applied to cash flows in today's prices." },
    { term: "Writing-down allowance", def: "Tax relief on capital expenditure, usually on a reducing-balance basis." },
    { term: "Balancing charge", def: "A clawback where disposal proceeds exceed the tax written-down value." },
  ],
  summary: [
    "Tax has three effects: on operating flows, through capital allowances, and on disposal.",
    "Total allowances over an asset's life equal cost less proceeds — use it as a check.",
    "Fisher: (1 + i) = (1 + r)(1 + h), multiplicative, not additive.",
    "Money flows at the money rate; real flows at the real rate.",
    "Different inflation rates per line force the money method; capital allowances never inflate.",
  ],
  knowledgeDiagnostic: [
    { q: "State the Fisher effect.", a: "(1 + money rate) = (1 + real rate) × (1 + inflation rate)." },
    { q: "When can the real method be used?", a: "Only when every cash flow inflates at the same general rate; otherwise use the money method." },
    { q: "What check confirms your capital allowances are right?", a: "Total allowances over the asset's life equal cost less disposal proceeds." },
    { q: "What is a balancing charge?", a: "A clawback of excess relief where disposal proceeds exceed the tax written-down value; it increases tax paid." },
  ],
  furtherStudy: ["FM-12 asks what happens when the cash flows in this appraisal are not certain at all."],
}

const FM_TREE_12: StudyChapter = {
  paper: "FM",
  id: "FM-12",
  number: 12,
  area: "D",
  syllabusRefs: ["D3(a)", "D3(b)", "D3(c)"],
  title: "Risk and uncertainty in appraisal",
  minutes: 17,
  intro:
    "Every NPV so far has assumed the cash flows are known. They are not. This chapter is about saying how wrong they could be before the decision matters.",
  outcomes: [
    "Distinguish risk from uncertainty",
    "Perform and interpret sensitivity analysis",
    "Apply expected values and explain their limitations",
    "Describe simulation, adjusted payback and risk-adjusted discount rates",
  ],
  sections: [
    {
      id: "risk-uncertainty",
      heading: "Risk is not uncertainty",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Two different problems",
            data: {
              leftTitle: "Risk",
              rightTitle: "Uncertainty",
              rows: [
                { aspect: "Definition", left: "Several outcomes, probabilities CAN be assigned", right: "Outcomes unknown, probabilities cannot be assigned" },
                { aspect: "Source", left: "Repeated experience or reliable data", right: "Novelty — a new market, a new technology" },
                { aspect: "Tool", left: "Expected values, simulation", right: "Sensitivity analysis, shorter payback" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Matching the tool to the problem is the mark",
          md: "Expected values need probabilities, so they are a RISK technique. Sensitivity analysis needs none, so it works under UNCERTAINTY. A question describing an unprecedented project and asking for a technique is testing that distinction.",
        },
      ],
    },
    {
      id: "sensitivity",
      heading: "Sensitivity analysis",
      blocks: [
        {
          kind: "formula",
          name: "Sensitivity of a variable",
          expr: "Sensitivity % = NPV / Present value of the flow affected × 100",
          note: "The percentage the variable can move adversely before the NPV reaches zero. Also called the switching value.",
        },
        {
          kind: "example",
          title: "Which assumption is fragile?",
          scenario:
            "A project has an NPV of £57,920. The PV of sales revenue is £1,158,400; the PV of labour cost is £289,600; the PV of the initial investment is £540,000.",
          steps: [
            { label: "Sales", detail: "57,920 / 1,158,400 = 5.0%" },
            { label: "Labour", detail: "57,920 / 289,600 = 20.0%" },
            { label: "Investment", detail: "57,920 / 540,000 = 10.7%" },
          ],
          result:
            "Sales revenue is the critical variable — a 5% shortfall wipes out the entire NPV, while labour could rise 20% before the project fails. The recommendation follows directly: verify the sales forecast, and manage volume risk before worrying about wage inflation.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "What sensitivity analysis cannot do",
          items: [
            "It changes **one variable at a time**, while in reality several move together.",
            "It gives **no probability** that the change will occur — only how much would break the project.",
            "It does not say what to **do**; it identifies where to look.",
          ],
        },
      ],
      check: {
        q: "A project's NPV is £40,000 and the PV of its material costs is £250,000. What is the sensitivity to material cost?",
        options: ["16.0%", "6.25%", "625%", "0.16%"],
        correct: 0,
        explain:
          "40,000 / 250,000 = 0.16, so 16%. Material costs could rise 16% before the NPV reached zero. The 6.25% distractor inverts the fraction (250,000/40,000 = 6.25, then misread as a percentage) — always divide the NPV BY the present value of the flow affected.",
      },
    },
    {
      id: "expected-values",
      heading: "Expected values and the other techniques",
      blocks: [
        {
          kind: "formula",
          name: "Expected value",
          expr: "EV = Σ ( probability × outcome )",
          note: "A probability-weighted average of the possible outcomes.",
        },
        {
          kind: "example",
          title: "An expected NPV",
          scenario: "NPV outcomes: £200,000 with probability 0.3; £80,000 with probability 0.5; −£60,000 with probability 0.2.",
          steps: [
            { label: "Best case", detail: "200,000 × 0.3 = £60,000" },
            { label: "Most likely", detail: "80,000 × 0.5 = £40,000" },
            { label: "Worst case", detail: "−60,000 × 0.2 = −£12,000" },
            { label: "Expected NPV", detail: "60,000 + 40,000 − 12,000 = £88,000" },
          ],
          result:
            "An expected NPV of £88,000 — a figure that will never actually occur, since the outcomes are £200,000, £80,000 or −£60,000. Note also the 20% chance of a loss, which the average conceals entirely.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Limitations that carry the discussion marks",
          items: [
            "**The EV may be an impossible outcome**, as above.",
            "**It ignores the decision-maker's attitude to risk** — treating a certain £88,000 as equal to a gamble including a loss.",
            "**It is a long-run average**, so it is weak justification for a one-off decision that cannot be repeated.",
            "**The probabilities are usually subjective**, and the answer is only as good as they are.",
          ],
        },
        {
          kind: "table",
          caption: "The remaining techniques",
          head: ["Technique", "What it does", "Weakness"],
          rows: [
            ["Simulation", "Models many variables at once with random sampling, giving a distribution of NPVs", "Complex, costly, and still only as good as the input assumptions"],
            ["Adjusted payback", "Requires a shorter payback for riskier projects", "Crude, and inherits every payback limitation"],
            ["Risk-adjusted discount rate", "Adds a premium to the discount rate for riskier projects", "The premium is often arbitrary; it also penalises later flows more heavily, which may not match the actual risk"],
          ],
        },
      ],
      check: {
        q: "Which technique is most appropriate for a genuinely unprecedented project with no reliable probabilities?",
        options: ["Expected values", "Sensitivity analysis", "A probability-weighted simulation", "Adjusting the discount rate by the historic industry premium"],
        correct: 1,
        explain:
          "Sensitivity analysis needs no probabilities — it asks how far each variable can move before the decision changes, which is exactly what you can still answer under uncertainty. The other three all require probability estimates or historic data that does not exist here.",
      },
    },
  ],
  examTraps: [
    { trap: "Using expected values where no probabilities are available.", fix: "That is uncertainty, not risk — use sensitivity analysis." },
    { trap: "Inverting the sensitivity fraction.", fix: "NPV divided by the PV of the affected flow." },
    { trap: "Presenting an expected NPV without mentioning the spread.", fix: "State the probability of a negative outcome; the average hides it." },
  ],
  keyTerms: [
    { term: "Risk", def: "Several possible outcomes to which probabilities can be assigned." },
    { term: "Uncertainty", def: "Outcomes that cannot be assigned reliable probabilities." },
    { term: "Sensitivity / switching value", def: "The percentage change in a variable that reduces NPV to zero." },
    { term: "Expected value", def: "The probability-weighted average of possible outcomes." },
  ],
  summary: [
    "Risk has probabilities; uncertainty does not — the tool must match.",
    "Sensitivity = NPV / PV of the affected flow; the smallest percentage is the critical variable.",
    "Sensitivity changes one variable at a time and gives no probability.",
    "An expected value may be an outcome that cannot occur, and hides the spread.",
    "Simulation, adjusted payback and risk-adjusted rates each trade rigour against practicality.",
  ],
  knowledgeDiagnostic: [
    { q: "Distinguish risk from uncertainty.", a: "Risk means probabilities can be assigned to the possible outcomes; uncertainty means they cannot." },
    { q: "How is sensitivity to a variable calculated?", a: "NPV divided by the present value of the cash flow affected, as a percentage." },
    { q: "Give two criticisms of expected values.", a: "The EV may be an outcome that cannot occur, and it ignores the decision-maker's attitude to risk. (Also: weak for one-off decisions; probabilities are subjective.)" },
    { q: "Why is a risk-adjusted discount rate imperfect?", a: "The premium is often arbitrary, and discounting penalises later cash flows more heavily whether or not the risk actually grows over time." },
  ],
  furtherStudy: ["AFM develops this into real options, value at risk and full Monte Carlo simulation."],
}

const FM_TREE_13: StudyChapter = {
  paper: "FM",
  id: "FM-13",
  number: 13,
  area: "D",
  syllabusRefs: ["D4(a)", "D4(b)", "D4(c)"],
  title: "Lease or buy, asset replacement and capital rationing",
  minutes: 18,
  intro:
    "Three specific decisions with three specific methods. Each has one step candidates skip, and each of those steps is where the marks are.",
  outcomes: [
    "Evaluate a lease-or-buy decision using the after-tax cost of borrowing",
    "Determine an optimum replacement cycle using equivalent annual cost",
    "Distinguish hard from soft capital rationing",
    "Rank divisible projects by profitability index and handle indivisible ones",
  ],
  sections: [
    {
      id: "lease-buy",
      heading: "Lease or buy",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "It is a FINANCING decision",
          md: "The investment decision — should we have this asset at all — is settled first, by NPV at the cost of capital. Lease-or-buy then asks only how to pay for it, so it is discounted at the **after-tax cost of borrowing**, not the WACC. Using the WACC here is the standard error.",
        },
        {
          kind: "list",
          style: "number",
          title: "The method",
          items: [
            "Compute the PV of the **borrow-to-buy** option: purchase cost, capital allowance tax savings, maintenance if the buyer bears it, less any scrap proceeds.",
            "Compute the PV of the **leasing** option: lease payments and the tax relief on them.",
            "Discount BOTH at the after-tax cost of borrowing.",
            "Choose the **lower present value of cost**.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Who gets the capital allowances",
          md: "Only the **owner** claims them. Under a lease the lessor owns the asset, so the lessee gets tax relief on the lease payments instead — never both. Giving capital allowances to the lessee is a frequent and expensive slip.",
        },
      ],
      check: {
        q: "At which rate should a lease-or-buy comparison be discounted?",
        options: ["The company's WACC", "The after-tax cost of borrowing", "The project's IRR", "The risk-free rate"],
        correct: 1,
        explain:
          "It is a financing decision between two forms of debt-like commitment, so the relevant rate is the after-tax cost of borrowing. The WACC belongs to the earlier investment decision about whether to have the asset at all.",
      },
    },
    {
      id: "replacement",
      heading: "Asset replacement",
      blocks: [
        {
          kind: "text",
          md: "As an asset ages, maintenance rises and resale value falls. Replace too often and you pay for capital repeatedly; too rarely and running costs consume the saving. The optimum cycle is the one with the lowest cost **per year**.",
        },
        {
          kind: "formula",
          name: "Equivalent annual cost",
          expr: "EAC = PV of costs over one cycle / Annuity factor for the cycle length",
          note: "Compare cycles of different lengths on the same basis. Choose the LOWEST EAC.",
        },
        {
          kind: "example",
          title: "Choosing the cycle",
          scenario: "At 10%: a 2-year cycle has a PV of costs of £18,000; a 3-year cycle has a PV of costs of £24,000. Annuity factors: 2 years 1.736, 3 years 2.487.",
          steps: [
            { label: "2-year EAC", detail: "18,000 / 1.736 = £10,369 a year" },
            { label: "3-year EAC", detail: "24,000 / 2.487 = £9,650 a year" },
          ],
          result:
            "Replace every three years — it costs about £719 a year less. Comparing the raw PVs (£18,000 against £24,000) would wrongly favour the two-year cycle, because they cover different periods. That is exactly what EAC exists to correct.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The assumption to state",
          md: "EAC assumes the replacement cycle **repeats indefinitely** with unchanged costs and technology. On an asset facing rapid technological change, say so — it is a legitimate limitation worth a mark.",
        },
      ],
      check: {
        q: "Cycle A: PV of costs £30,000, annuity factor 3.791. Cycle B: PV of costs £21,000, annuity factor 2.487. Which is optimal?",
        options: ["B, because its PV of costs is lower", "A, because its EAC is lower", "B, because its EAC is lower", "They are equivalent"],
        correct: 1,
        explain:
          "A: 30,000/3.791 = £7,914 a year. B: 21,000/2.487 = £8,444 a year. A is cheaper per year despite the higher total, because it covers more years — the whole reason raw PVs cannot be compared across different cycle lengths.",
      },
    },
    {
      id: "rationing",
      heading: "Capital rationing",
      blocks: [
        {
          kind: "table",
          caption: "Two kinds of shortage",
          head: ["", "Hard rationing", "Soft rationing"],
          rows: [
            ["Source", "External — the capital market will not supply funds", "Internal — management imposes a ceiling"],
            ["Causes", "Poor track record, no security, market conditions, small size", "Caution, wanting projects to compete, limited management capacity"],
            ["Implication", "Genuinely cannot raise the money", "Self-imposed, so arguably irrational: it rejects positive-NPV projects"],
          ],
        },
        {
          kind: "formula",
          name: "Profitability index",
          expr: "PI = NPV / Initial investment      (or PV of inflows / Initial investment)",
          note: "NPV per £1 invested. Used to rank DIVISIBLE projects under single-period rationing. State which definition you used — both are accepted, the decision is the same.",
        },
        {
          kind: "example",
          title: "Ranking divisible projects",
          scenario: "£100,000 available. P: invest £60,000, NPV £24,000. Q: invest £50,000, NPV £15,000. R: invest £40,000, NPV £20,000.",
          steps: [
            { label: "PI for P", detail: "24,000 / 60,000 = 0.40" },
            { label: "PI for Q", detail: "15,000 / 50,000 = 0.30" },
            { label: "PI for R", detail: "20,000 / 40,000 = 0.50" },
            { label: "Rank", detail: "R (0.50), then P (0.40), then Q (0.30)" },
            { label: "Allocate", detail: "R in full £40,000; P in full £60,000; total £100,000 — Q gets nothing" },
          ],
          result:
            "Total NPV £44,000. Ranking by raw NPV would have taken P first, then Q — using £110,000 and, restricted to £100,000, delivering less. The PI ranks by wealth created per scarce pound, which is what rationing actually constrains.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Indivisible projects break the index",
          md: "The PI assumes a project can be taken in part. If projects are **all-or-nothing**, rank by PI to get a sense of the field, then test the feasible COMBINATIONS by total NPV — the best combination is often not the top-ranked project. And multi-period rationing needs linear programming, which is beyond FM.",
        },
      ],
      check: {
        q: "Under single-period rationing with divisible projects, how should they be ranked?",
        options: ["By NPV, highest first", "By IRR, highest first", "By profitability index, highest first", "By payback, shortest first"],
        correct: 2,
        explain:
          "The scarce resource is capital, so rank by NPV generated per £1 invested. Ranking by absolute NPV ignores how much of the constrained budget each project consumes, which is exactly the constraint that binds.",
      },
    },
  ],
  examTraps: [
    { trap: "Discounting lease-or-buy at the WACC.", fix: "It is a financing decision — use the after-tax cost of borrowing." },
    { trap: "Giving capital allowances to the lessee.", fix: "Only the owner claims them; the lessee gets relief on the lease payments." },
    { trap: "Comparing replacement cycles on total PV of costs.", fix: "Different lengths need EAC to be comparable." },
    { trap: "Ranking by NPV under capital rationing.", fix: "Rank by profitability index — NPV per £1 of the scarce resource." },
  ],
  keyTerms: [
    { term: "Equivalent annual cost", def: "PV of costs over one replacement cycle divided by the annuity factor for that cycle." },
    { term: "Hard capital rationing", def: "An externally imposed limit — the market will not provide the funds." },
    { term: "Soft capital rationing", def: "A limit imposed internally by management." },
    { term: "Profitability index", def: "NPV per £1 invested, used to rank divisible projects under rationing." },
  ],
  summary: [
    "Lease-or-buy is a financing decision, discounted at the after-tax cost of borrowing.",
    "Only the owner claims capital allowances; the lessee gets relief on lease payments.",
    "Compare replacement cycles by equivalent annual cost, never by total PV.",
    "Hard rationing is external, soft rationing is management-imposed.",
    "Rank divisible projects by profitability index; test combinations when indivisible.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is lease-or-buy discounted at the after-tax cost of borrowing?", a: "The investment decision is already made; this is purely a choice between two financing methods, so the relevant rate is the cost of debt after tax." },
    { q: "How is equivalent annual cost calculated?", a: "PV of the costs over one cycle divided by the annuity factor for the length of that cycle." },
    { q: "Distinguish hard from soft capital rationing.", a: "Hard is externally imposed by the capital market; soft is imposed internally by management." },
    { q: "How are divisible projects ranked under single-period rationing?", a: "By profitability index — NPV per £1 invested — highest first." },
  ],
  furtherStudy: [
    "Area E supplies the cost of borrowing this chapter discounts at.",
    "AFM extends rationing to multi-period problems and international capital budgeting.",
  ],
}

export const FM_TREE_AREA_D: StudyChapter[] = [FM_TREE_09, FM_TREE_10, FM_TREE_11, FM_TREE_12, FM_TREE_13]
