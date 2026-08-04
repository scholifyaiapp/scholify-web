import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area D, third part — fixed overhead variances, and material mix and yield.
 * Chapters 24–25 of the PM reading tree, mapped to syllabus groups D3(d) and D4.
 *
 * Chapter 24 exists because fixed overhead variances behave unlike every other variance in
 * the paper: they arise only under ABSORPTION costing, and the volume variance measures
 * over- or under-ABSORPTION rather than any over- or under-spending. Candidates who apply
 * the marginal-costing intuition to them get the signs backwards.
 *
 * Chapter 25's mix and yield variances are the first place where a FAVOURABLE variance is
 * routinely bad news, because a cheaper mix that reduces yield can cost more than it saves —
 * so the chapter is built to make the two figures be read together.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were used
 * only as a benchmark for structure and depth.
 */

/* ── Chapter 24 · D3(d) ───────────────────────────────────────── */

export const PM_TREE_24: StudyChapter = {
  id: "PM-24",
  number: 24,
  paper: "PM",
  area: "D",
  title: "Fixed overhead variances and the operating statement",
  minutes: 17,
  syllabusRefs: ["D3(d)", "D3(e)"],
  intro:
    "Fixed overhead variances are the odd ones out. They exist only under absorption costing, and the volume variance measures whether overhead was fully absorbed — not whether anything was overspent.",
  outcomes: [
    "Calculate the fixed overhead expenditure and volume variances",
    "Split the volume variance into capacity and efficiency",
    "Explain why these variances arise only under absorption costing",
    "Reconcile budgeted to actual profit under both marginal and absorption costing",
    "Explain what each fixed overhead variance does and does not tell management",
  ],
  sections: [
    {
      id: "the-variances",
      heading: "The fixed overhead variances",
      blocks: [
        {
          kind: "formula",
          name: "Fixed overhead variances",
          expr: "EXPENDITURE  =  Budgeted fixed overhead  −  Actual fixed overhead\n\nVOLUME       =  (Actual production  −  Budgeted production)  ×  Standard fixed overhead per unit\n\nsplit into:\n  CAPACITY   =  (Actual hours worked  −  Budgeted hours)  ×  Standard fixed overhead per hour\n  EFFICIENCY =  (Standard hours for actual production  −  Actual hours worked)  ×  Standard fixed overhead per hour",
          note: "Capacity plus efficiency equals volume — always, and it is the arithmetic check to run before writing anything down. Note the expenditure variance is the ONLY fixed overhead variance about spending; the volume variance and its two parts are about ABSORPTION. Under MARGINAL costing none of them exists except expenditure, because fixed overhead is not absorbed into units at all.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "What the volume variance actually measures",
          md: "Not overspending. Fixed overhead is **fixed**, so producing more units does not increase it — what changes is how much of it gets **absorbed** into production. Produce more than budgeted and more overhead is absorbed than was incurred: **over-absorption**, reported as a **favourable** volume variance. Produce less and overhead is **under-absorbed**, giving an adverse variance. So the volume variance is an artefact of the absorption method, and describing it as \"spending too much on overhead\" is simply wrong. That is also why it disappears entirely under marginal costing.",
        },
        {
          kind: "table",
          caption: "The two parts of the volume variance",
          head: ["Part", "Measures", "Caused by"],
          rows: [
            ["**Capacity**", "Whether the workforce was in attendance for **more or fewer hours** than budgeted", "Overtime, extra shifts, absence, industrial action, machine breakdown, or a deliberate change in operating hours"],
            ["**Efficiency**", "Whether those hours produced **more or fewer units** than the standard allowed", "The same causes as labour efficiency — skill, supervision, material quality, machine condition, learning (chapter 22)"],
          ],
        },
        {
          kind: "example",
          title: "Computing the variances and reconciling profit",
          scenario:
            "Alveston Ltd budgeted fixed production overhead of £360,000 for production and sales of 12,000 units, absorbed on labour hours at a standard 3 hours per unit. Actual results: 12,800 units produced but only 12,000 sold, 37,200 labour hours worked, and actual fixed overhead of £371,000. Budgeted contribution was £40 a unit and the actual contribution earned was £492,000.",
          steps: [
            { label: "Establish the absorption rates", detail: "Budgeted hours = 12,000 units × 3 = 36,000 hours. Rate per hour = £360,000/36,000 = £10. Rate per unit = 3 hours × £10 = £30." },
            { label: "Expenditure variance", detail: "£360,000 budgeted − £371,000 actual = £11,000 ADVERSE. This is the only fixed overhead variance about spending, and £11,000 more was spent than budgeted." },
            { label: "Volume variance", detail: "(12,800 − 12,000) × £30 = £24,000 FAVOURABLE. 800 more units were made than budgeted, so £24,000 more overhead was absorbed than the budget assumed — OVER-absorption, not a saving." },
            { label: "Capacity variance", detail: "Actual hours worked 37,200 against budgeted 36,000: (37,200 − 36,000) × £10 = £12,000 FAVOURABLE. The workforce was present for 1,200 more hours than budgeted, so more overhead was absorbed." },
            { label: "Efficiency variance", detail: "Standard hours for 12,800 units = 38,400. (38,400 − 37,200) × £10 = £12,000 FAVOURABLE. Those hours produced MORE than the standard allowed — 12,800 units in 37,200 hours where the standard needed 38,400." },
            { label: "Run the arithmetic check", detail: "Capacity £12,000 F + efficiency £12,000 F = £24,000 F = the volume variance ✓. If the two parts do not sum to the volume variance, one of them is wrong — do this before writing anything up." },
            { label: "Reconcile under ABSORPTION costing", detail: "Budgeted profit = (12,000 × £40) − £360,000 = £480,000 − £360,000 = £120,000. Sales were 12,000 as budgeted, so there is no sales volume variance. Add the contribution movement and the overhead variances: actual contribution £492,000 less budgeted £480,000 = £12,000 F; volume £24,000 F; expenditure £11,000 A. Actual profit = £120,000 + £12,000 + £24,000 − £11,000 = £145,000." },
            { label: "Reconcile under MARGINAL costing", detail: "The volume variance does NOT exist: fixed overhead is charged in full as a period cost. Actual profit = actual contribution £492,000 − actual fixed overhead £371,000 = £121,000. Equivalently: £120,000 budgeted + £12,000 F contribution − £11,000 A expenditure = £121,000." },
            { label: "Explain the £24,000 gap between the two", detail: "Absorption reports £145,000 and marginal £121,000. The £24,000 difference is the fixed overhead carried in the 800 units of closing inventory: 800 × £30 = £24,000. Because sales equalled budget here, that figure is also exactly the volume variance — the 800 units of over-production that absorbed extra overhead are the same 800 units sitting unsold in the warehouse." },
          ],
          result:
            "**Expenditure £11,000 A, volume £24,000 F (capacity £12,000 F + efficiency £12,000 F).** Absorption profit £145,000 against marginal £121,000, and the **£24,000 gap is fixed overhead held in the 800 units of closing inventory** — which is the clearest demonstration that the volume variance is about absorption rather than about spending.",
        },
      ],
      check: {
        q: "Actual production exceeded budget by 800 units and the standard fixed overhead per unit is £30. What is the volume variance and what does it mean?",
        options: [
          "£24,000 adverse — more overhead was spent",
          "£24,000 favourable — more overhead was absorbed than incurred, being over-absorption",
          "£24,000 favourable — overhead spending was controlled well",
          "Nil, because fixed overhead does not change with volume",
        ],
        correct: 1,
        explain:
          "£24,000 FAVOURABLE, and it means OVER-ABSORPTION. Fixed overhead did not change — producing 800 more units simply absorbed £24,000 more of it than the budget assumed. It says nothing about spending, which is measured by the expenditure variance alone.",
      },
    },
    {
      id: "statement-and-limits",
      heading: "The operating statement, and what these variances are worth",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "Building an operating statement",
          items: [
            "Start with **budgeted profit** (absorption) or **budgeted contribution** (marginal).",
            "Add the **sales volume variance**, valued at standard profit under absorption and standard contribution under marginal (chapter 23).",
            "That gives the **flexed budget** figure — the profit the budget would have predicted at actual volume.",
            "Add the **sales price variance**.",
            "Add each **cost variance** in turn, favourable positive and adverse negative, showing them individually rather than netted.",
            "Under **absorption** costing only, add the **fixed overhead volume variance**.",
            "The total must equal **actual profit**. If it does not, a variance is wrong or one has been omitted — the reconciliation is the check on the whole answer.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The reconciliation is the check, so never force it",
          md: "An operating statement that does not reconcile is telling you something. The usual causes are: valuing the **sales volume variance** on the wrong basis for the costing system in use, **omitting the volume variance** under absorption costing or including it under marginal, **double-counting** the fixed overhead efficiency variance alongside the labour efficiency variance when the volume variance is already shown, or a **sign error**. Plugging the difference to make it balance destroys the one control the technique offers, and an examiner can see it immediately.",
        },
        {
          kind: "table",
          caption: "What fixed overhead variances do and do not tell management",
          head: ["Variance", "Useful for", "Its limitation"],
          rows: [
            ["**Expenditure**", "Genuine control — it identifies overspending on rent, salaries, insurance and depreciation", "Much fixed overhead is **committed** long in advance, so it is often uncontrollable in the short run"],
            ["**Volume**", "Explaining why reported profit differs from budget under absorption costing", "It is an **absorption artefact**, not a performance measure. A favourable variance may mean producing for inventory, which is bad"],
            ["**Capacity**", "Showing whether the resource was made available as planned", "Says nothing about whether the output was useful — hours attended is not output sold"],
            ["**Efficiency**", "Duplicates what the labour efficiency variance already says", "Adds little beyond it; the overhead element merely restates the same hours at a different rate"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The behavioural warning worth stating",
          md: "A **favourable volume variance rewards production**, whether or not the units are sold. So a manager judged on it has an incentive to **produce for inventory** — which absorbs more overhead, improves the reported figure, and ties up cash in stock nobody has ordered. That is exactly the behaviour throughput accounting (chapter 8) and just-in-time thinking exist to prevent, and it is the strongest argument for **marginal costing** for internal reporting: with no volume variance, there is no reward for making things that are not needed.",
        },
      ],
      check: {
        q: "Why might a favourable fixed overhead volume variance be bad news?",
        options: [
          "It always indicates overspending",
          "It rewards production regardless of sales, so it can mean producing for inventory",
          "It means the absorption rate was set too low",
          "It reduces reported profit",
        ],
        correct: 1,
        explain:
          "It REWARDS PRODUCTION whether or not units are sold. A manager judged on it has an incentive to produce for INVENTORY, which absorbs more overhead, flatters the reported figure and ties up cash in unsold stock — the behaviour just-in-time and throughput accounting exist to prevent.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Describing the volume variance as over- or underspending.",
      fix: "It measures over- or under-ABSORPTION. Only the expenditure variance is about spending.",
    },
    {
      trap: "Showing a volume variance under marginal costing.",
      fix: "It does not exist there — fixed overhead is charged in full as a period cost.",
    },
    {
      trap: "Failing to check that capacity plus efficiency equals volume.",
      fix: "They must sum exactly. Run the check before writing up.",
    },
    {
      trap: "Plugging an operating statement so it balances.",
      fix: "The reconciliation is the control. A gap means a variance is wrong, misvalued or missing.",
    },
    {
      trap: "Treating a favourable volume variance as good performance.",
      fix: "It may mean producing for inventory, which absorbs overhead while tying up cash.",
    },
  ],
  keyTerms: [
    { term: "Fixed overhead expenditure variance", def: "Budgeted less actual fixed overhead; the only fixed overhead variance about spending." },
    { term: "Fixed overhead volume variance", def: "The over- or under-absorption caused by producing more or fewer units than budgeted." },
    { term: "Capacity variance", def: "The absorption effect of working more or fewer hours than budgeted." },
    { term: "Fixed overhead efficiency variance", def: "The absorption effect of those hours producing more or fewer units than standard." },
    { term: "Over-absorption", def: "More overhead charged to production than was incurred, reported as a favourable volume variance." },
  ],
  summary: [
    "The expenditure variance is budgeted less actual fixed overhead and is the only one about spending.",
    "The volume variance measures over- or under-absorption and exists only under absorption costing.",
    "Capacity and efficiency split the volume variance and must sum to it exactly.",
    "An operating statement must reconcile to actual profit, and the reconciliation is the check on the whole answer.",
    "A favourable volume variance rewards production regardless of sales, so it can encourage producing for inventory.",
  ],
  knowledgeDiagnostic: [
    { q: "What does the fixed overhead volume variance measure?", a: "Over- or under-absorption caused by producing more or fewer units than budgeted — not spending, which the expenditure variance measures." },
    { q: "Which fixed overhead variances exist under marginal costing?", a: "Expenditure only. Fixed overhead is not absorbed into units, so there is no volume, capacity or efficiency variance." },
    { q: "What arithmetic check applies to the volume variance?", a: "Capacity plus efficiency must equal volume exactly." },
    { q: "Why can a favourable volume variance be undesirable?", a: "Because it rewards production irrespective of sales, giving a manager an incentive to build unsold inventory that absorbs overhead and consumes cash." },
  ],
}

/* ── Chapter 25 · D4 ──────────────────────────────────────────── */

export const PM_TREE_25: StudyChapter = {
  id: "PM-25",
  number: 25,
  paper: "PM",
  area: "D",
  title: "Material mix and yield variances",
  minutes: 18,
  syllabusRefs: ["D4(a)", "D4(b)", "D4(c)"],
  intro:
    "Where several materials can substitute for one another, the usage variance splits in two: how the mix was chosen, and how much output the mix produced. And a favourable mix is very often bad news.",
  outcomes: [
    "Explain when mix and yield variances are meaningful",
    "Calculate the material mix variance using the standard mix",
    "Calculate the material yield variance",
    "Reconcile mix and yield to the total usage variance",
    "Interpret the two variances together and explain their interdependence",
  ],
  sections: [
    {
      id: "the-calculation",
      heading: "Splitting the usage variance",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "When the split is meaningful, and when it is not",
          md: "Mix and yield variances only mean anything where the materials are **substitutable** — where a manager genuinely chooses the proportions, as in food, chemicals, animal feed, or an alloy. Where a product needs exactly one component of each type, there is **no choice of mix**, so splitting the usage variance produces figures that look meaningful and describe nothing. A question that gives several materials with a stated standard mix is inviting the split; one that gives a bill of materials with fixed quantities is not.",
        },
        {
          kind: "formula",
          name: "Mix and yield",
          expr: "MIX      =  (Actual quantity in STANDARD mix  −  Actual quantity in ACTUAL mix)  ×  Standard price\n             for each material, then summed\n\n   where 'actual quantity in standard mix' = total actual input × that material's standard proportion\n\nYIELD    =  (Standard quantity for actual output  −  Total actual input)  ×  Standard WEIGHTED AVERAGE price per unit of input\n\nCHECK:  Mix  +  Yield  =  Total material usage variance",
          note: "The key to the mix variance is that the TOTAL input is held constant — it re-splits the same total quantity into standard proportions and compares. The yield variance then deals with the total input being different from what the output required. The weighted average price is the standard cost of one unit of the standard mix divided by its total quantity; using a single material's price is a frequent error.",
        },
        {
          kind: "example",
          title: "Computing mix and yield",
          scenario:
            "Ledbury Foods blends three materials to a standard mix per 100 kg of input: 50 kg of A at £4 per kg, 30 kg of B at £6 per kg and 20 kg of C at £9 per kg. Standard output is 90 kg of finished product from every 100 kg of input. In April, actual input was 46,000 kg of A, 33,000 kg of B and 21,000 kg of C, and output was 88,200 kg of finished product. Actual prices equalled standard.",
          steps: [
            { label: "Establish the standard cost of the mix", detail: "Per 100 kg of input: (50 × £4) + (30 × £6) + (20 × £9) = £200 + £180 + £180 = £560. So the standard WEIGHTED AVERAGE price is £5.60 per kg of input, and the standard cost of 90 kg of output is £560, or £6.222 per kg of output." },
            { label: "Total the actual input and split it into standard proportions", detail: "Total actual input = 46,000 + 33,000 + 21,000 = 100,000 kg. In the STANDARD mix that 100,000 kg would be A 50,000, B 30,000 and C 20,000 kg." },
            { label: "Compute the mix variance material by material", detail: "A: (50,000 − 46,000) × £4 = £16,000 FAVOURABLE, because 4,000 kg less of A was used than the standard mix required. B: (30,000 − 33,000) × £6 = £18,000 ADVERSE. C: (20,000 − 21,000) × £9 = £9,000 ADVERSE. Total mix variance = £16,000 F − £18,000 A − £9,000 A = £11,000 ADVERSE. Read only the total: the individual figures are mechanical, and what they add up to is that 4,000 kg of the £4 material was displaced by 4,000 kg of £6 and £9 materials, so the blend got dearer." },
            { label: "Compute the yield variance", detail: "Standard input for 88,200 kg of output = 88,200 × 100/90 = 98,000 kg. Yield = (98,000 − 100,000) × £5.60 = £11,200 ADVERSE. So 100,000 kg of input produced what 98,000 kg should have produced — 2,000 kg of input was effectively wasted." },
            { label: "Check against the total usage variance", detail: "Total usage variance = standard cost of input for actual output less actual cost of input = (98,000 × £5.60) − (100,000 × £5.60) computed material by material. Actual input at standard prices = (46,000 × £4) + (33,000 × £6) + (21,000 × £9) = £184,000 + £198,000 + £189,000 = £571,000. Standard cost of input for actual output = 98,000 × £5.60 = £548,800. Usage variance = £548,800 − £571,000 = £22,200 ADVERSE. Check: mix £11,000 A + yield £11,200 A = £22,200 A ✓." },
            { label: "Interpret the two together", detail: "Ledbury used LESS of the cheapest material A and MORE of the dearer B and C, giving an adverse mix of £11,000. And that richer mix did NOT improve yield — output fell short by 2,000 kg of input equivalent, costing a further £11,200. So the mix change was expensive AND ineffective, which is the worst of the four possible combinations." },
          ],
          result:
            "**Mix £11,000 adverse, yield £11,200 adverse, total usage £22,200 adverse** — and the check confirms they sum. The substance is that a richer, more expensive mix failed to deliver any yield improvement, so both figures point the same way.",
        },
      ],
      check: {
        q: "Total actual input was 100,000 kg. Standard input for the actual output was 98,000 kg and the standard weighted average price is £5.60. What is the yield variance?",
        options: [
          "£11,200 adverse",
          "£11,200 favourable",
          "£2,000 adverse",
          "Cannot be computed without individual material prices",
        ],
        correct: 0,
        explain:
          "£11,200 ADVERSE — (98,000 − 100,000) × £5.60. More input was consumed than the output required, so 2,000 kg was effectively wasted. The yield variance uses the standard WEIGHTED AVERAGE price of the mix, not any individual material's price.",
      },
    },
    {
      id: "interpretation",
      heading: "Reading the two variances together",
      blocks: [
        {
          kind: "table",
          caption: "The four combinations, and what each means",
          head: ["Mix", "Yield", "What happened", "Verdict"],
          rows: [
            ["**Favourable**", "**Favourable**", "A cheaper mix that also produced more output", "**Genuinely good** — but check quality has not suffered in ways the variances cannot see"],
            ["**Favourable**", "**Adverse**", "A cheaper mix bought at the cost of lower yield", "**The classic trap.** Compare the two: the saving is only real if the mix variance exceeds the yield loss"],
            ["**Adverse**", "**Favourable**", "A richer mix that raised output", "**Possibly sensible** — a deliberate trade-off, worthwhile if the yield gain exceeds the extra mix cost"],
            ["**Adverse**", "**Adverse**", "A dearer mix that also produced less", "**The worst case.** Either poor control, or poor-quality materials substituted in"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "A favourable mix variance is often bad news",
          md: "This is the point the topic exists to teach. Substituting cheaper materials **always** produces a favourable mix variance, because the mix variance is valued at standard prices and a cheaper blend costs less. Whether it was a good decision depends entirely on the **yield**: if the cheaper blend produces less output, the yield variance takes back the saving and may exceed it. So the two variances must be **netted and compared** — and a report showing a favourable mix without its yield is close to useless. There is also a consequence the variances cannot capture at all: a cheaper blend may reduce **product quality**, which shows up later as customer complaints or lost sales rather than as a variance.",
        },
        {
          kind: "list",
          title: "What causes each variance",
          items: [
            "**Mix** — deliberate substitution to save cost, a material shortage forcing substitution, a change in supplier or specification, or simply careless blending.",
            "**Yield** — material quality, machine condition and calibration, operator skill, the mix itself, process temperature or timing, and losses through spillage or contamination.",
            "**Both together** — a single decision to change the blend, which is why they should be reported and explained as a pair rather than separately.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Who is answerable, and the interdependence with other variances",
          md: "The **mix** variance usually belongs to whoever chose the blend — production management, or purchasing if a substitution was forced by supply. The **yield** variance is production's, **unless** it was caused by the mix or by poor-quality material, in which case it belongs with whoever made that decision. The links run further: substituting cheap material typically also produces a **favourable material price** variance and may produce **adverse labour efficiency** as staff work with a harder blend (chapter 23). So four variances can come from one decision, and identifying that is what a PM answer is for.",
        },
      ],
      check: {
        q: "A favourable mix variance of £8,000 appears with an adverse yield variance of £13,000. What should be concluded?",
        options: [
          "The cheaper mix saved £8,000, which is good news",
          "The substitution cost £5,000 net — the yield loss exceeded the mix saving",
          "The two are unrelated and should be reported separately",
          "Production efficiency was poor",
        ],
        correct: 1,
        explain:
          "The substitution cost £5,000 NET. A cheaper blend always shows a favourable mix, so the question is whether the yield holds up — and here it did not, so the £13,000 yield loss more than took back the £8,000 saving. The two must be netted, and a report showing the mix alone would have looked like good news.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Computing mix and yield where materials are not substitutable.",
      fix: "The split only means anything where the proportions are genuinely a choice.",
    },
    {
      trap: "Using an individual material's price for the yield variance.",
      fix: "Use the standard WEIGHTED AVERAGE price per unit of input.",
    },
    {
      trap: "Failing to hold total input constant in the mix variance.",
      fix: "The mix variance re-splits the SAME total actual input into standard proportions.",
    },
    {
      trap: "Reporting a favourable mix variance as a saving.",
      fix: "Net it against the yield variance. A cheaper blend that reduces yield may cost more than it saves.",
    },
    {
      trap: "Omitting the check that mix plus yield equals total usage.",
      fix: "They must sum exactly, and it is the only check available on the split.",
    },
  ],
  keyTerms: [
    { term: "Material mix variance", def: "The cost effect of using materials in proportions different from standard, holding total input constant." },
    { term: "Material yield variance", def: "The cost effect of the total input producing more or less output than standard, valued at the weighted average price." },
    { term: "Standard weighted average price", def: "The standard cost of the standard mix divided by its total input quantity." },
    { term: "Substitutable materials", def: "Materials whose proportions are genuinely a management choice, without which the split is meaningless." },
  ],
  summary: [
    "Mix and yield split the usage variance, and only mean anything where materials are substitutable.",
    "The mix variance re-splits the same total actual input into standard proportions, valued at standard prices.",
    "The yield variance compares total input with the standard input for actual output at the weighted average price.",
    "Mix plus yield must equal the total usage variance.",
    "A favourable mix is often bad news, because a cheaper blend may reduce yield by more than it saves.",
  ],
  knowledgeDiagnostic: [
    { q: "When is a mix and yield split meaningful?", a: "Only where the materials are substitutable, so the proportions are genuinely a management choice." },
    { q: "What is held constant in the mix variance?", a: "The total actual input, which is re-split into the standard proportions for comparison." },
    { q: "Which price values the yield variance?", a: "The standard weighted average price per unit of input, not any individual material's price." },
    { q: "Why is a favourable mix variance often bad news?", a: "Because a cheaper blend always produces one, and the yield may fall by more than the mix saved — so the two must be netted." },
    { q: "Which four variances can arise from one decision to substitute cheap material?", a: "Favourable material price, favourable mix, adverse yield, and possibly adverse labour efficiency as staff work with a harder blend." },
  ],
}

export const PM_TREE_AREA_D_PART3: StudyChapter[] = [PM_TREE_24, PM_TREE_25]
