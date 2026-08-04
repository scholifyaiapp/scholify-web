import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area D, fourth part — sales mix and quantity variances, and planning versus
 * operational variances. Chapters 26–27 of the PM reading tree, syllabus D4(d)–(f) and D4(g).
 *
 * Chapter 26 mirrors chapter 25's structure deliberately: the arithmetic is the same shape,
 * so the chapter spends its space on the two things that differ — the variances are valued
 * at PROFIT or CONTRIBUTION rather than cost, and a favourable mix here means selling
 * proportionately more of the high-margin product, which is a sales-management question
 * rather than a production one.
 *
 * Chapter 27 is where variance analysis earns its place in a PERFORMANCE MANAGEMENT paper
 * rather than a costing one: separating the part of a variance caused by a standard that was
 * wrong from the part caused by how the operation was run is the whole point of holding
 * managers to account for what they controlled.
 *
 * All wording is ORIGINAL Scholify teaching text.
 */

/* ── Chapter 26 · D4(d)–(f) ───────────────────────────────────── */

export const PM_TREE_26: StudyChapter = {
  id: "PM-26",
  number: 26,
  paper: "PM",
  area: "D",
  title: "Sales mix and quantity variances",
  minutes: 17,
  syllabusRefs: ["D4(d)", "D4(e)", "D4(f)"],
  intro:
    "The sales volume variance splits the same way usage does: how the sales mix shifted between products, and whether total volume was up or down. The difference is that these are valued at margin, not cost.",
  outcomes: [
    "Calculate the sales mix variance using the standard mix",
    "Calculate the sales quantity variance",
    "Reconcile mix and quantity to the total sales volume variance",
    "Explain why these variances are valued at standard profit or contribution",
    "Interpret a favourable mix alongside an adverse quantity, and vice versa",
  ],
  sections: [
    {
      id: "the-calculation",
      heading: "Splitting the sales volume variance",
      blocks: [
        {
          kind: "formula",
          name: "Sales mix and quantity",
          expr: "MIX       =  (Actual sales in ACTUAL mix  −  Actual sales in STANDARD mix)  ×  Standard margin per unit\n              for each product, then summed\n\nQUANTITY  =  (Actual total units in STANDARD mix  −  Budgeted units)  ×  Standard margin per unit\n              for each product, then summed\n\n   or more quickly:  (Actual total units − Budgeted total units) × Standard WEIGHTED AVERAGE margin\n\nCHECK:  Mix  +  Quantity  =  Total sales volume variance",
          note: "Note the direction reverses from the material mix variance: here ACTUAL comes first, because selling more of something is favourable whereas using more of something is adverse. 'Standard margin' means standard PROFIT per unit under absorption costing and standard CONTRIBUTION per unit under marginal costing — get this wrong and every figure is wrong by the fixed overhead per unit.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Margin, not cost — and which margin",
          md: "Sales variances are valued at **margin** because a sales manager sells revenue, not cost. Which margin depends on the costing system: standard **contribution** under marginal costing, standard **profit** under absorption. **Contribution is generally the better basis for decisions**, because it isolates what actually changes with volume — an absorption-based figure includes fixed overhead per unit, which does not vary with the units sold and so muddies the message. If a question gives both, read the requirement: if it says the company operates a standard absorption costing system, use profit.",
        },
        {
          kind: "example",
          title: "Computing sales mix and quantity",
          scenario:
            "Redmarley Ltd sells three products. Budget: Standard 6,000 units at £12 contribution, Premium 3,000 units at £25 contribution, Elite 1,000 units at £40 contribution — 10,000 units in total. Actual sales were Standard 5,400 units, Premium 3,600 units and Elite 1,800 units, a total of 10,800 units. Selling prices and unit costs were as standard.",
          steps: [
            { label: "Establish the standard mix and weighted average contribution", detail: "Budgeted mix is 60% Standard, 30% Premium, 10% Elite. Budgeted total contribution = (6,000 × £12) + (3,000 × £25) + (1,000 × £40) = £72,000 + £75,000 + £40,000 = £187,000, so the standard weighted average contribution is £187,000/10,000 = £18.70 per unit." },
            { label: "Restate actual total volume in the standard mix", detail: "10,800 units in the standard 60:30:10 mix would be Standard 6,480, Premium 3,240, Elite 1,080." },
            { label: "Sales mix variance", detail: "Standard: (5,400 − 6,480) × £12 = £12,960 ADVERSE. Premium: (3,600 − 3,240) × £25 = £9,000 FAVOURABLE. Elite: (1,800 − 1,080) × £40 = £28,800 FAVOURABLE. Total mix = £9,000 + £28,800 − £12,960 = £24,840 FAVOURABLE. The mix shifted towards the high-margin products, which is worth £24,840." },
            { label: "Sales quantity variance", detail: "Using the quick method: (10,800 − 10,000) × £18.70 = £14,960 FAVOURABLE. Or product by product: Standard (6,480 − 6,000) × £12 = £5,760 F; Premium (3,240 − 3,000) × £25 = £6,000 F; Elite (1,080 − 1,000) × £40 = £3,200 F; total £14,960 F ✓ — the two methods must agree, and it is a useful self-check." },
            { label: "Check against the total sales volume variance", detail: "Total volume variance, product by product: Standard (5,400 − 6,000) × £12 = £7,200 A; Premium (3,600 − 3,000) × £25 = £15,000 F; Elite (1,800 − 1,000) × £40 = £32,000 F; total £39,800 FAVOURABLE. Check: mix £24,840 F + quantity £14,960 F = £39,800 F ✓." },
            { label: "Interpret", detail: "Both parts are favourable, and the mix is the larger of the two. Redmarley sold 8% more units overall (worth £14,960) but the real gain came from selling proportionately more Premium and Elite (worth £24,840). So the sales effort shifted successfully up-market — and any bonus scheme based on unit volume alone would have credited only a third of the achievement." },
          ],
          result:
            "**Mix £24,840 F, quantity £14,960 F, total volume £39,800 F.** The mix variance is nearly twice the quantity variance, which is the finding: the value came from **what** was sold, not from how much.",
        },
      ],
      check: {
        q: "Actual total sales were 10,800 units against a budget of 10,000, and the standard weighted average contribution is £18.70. What is the sales quantity variance?",
        options: [
          "£14,960 favourable",
          "£14,960 adverse",
          "£39,800 favourable",
          "£24,840 favourable",
        ],
        correct: 0,
        explain:
          "£14,960 FAVOURABLE — (10,800 − 10,000) × £18.70. That is the quantity element alone. The £39,800 is the total volume variance and the £24,840 is the mix element, and the three are related by mix + quantity = total volume.",
      },
    },
    {
      id: "interpretation",
      heading: "What the split tells management",
      blocks: [
        {
          kind: "table",
          caption: "Reading mix against quantity",
          head: ["Mix", "Quantity", "What it means", "Action"],
          rows: [
            ["**Favourable**", "**Favourable**", "More units sold, and proportionately more of the profitable ones", "Understand what worked and repeat it; check capacity can sustain it"],
            ["**Favourable**", "**Adverse**", "Total volume fell but the mix improved — often a deliberate move up-market", "Compare the two figures. A smaller, richer sales base may be more profitable"],
            ["**Adverse**", "**Favourable**", "Volume grew by discounting or pushing the low-margin line", "**The trap.** Growth that dilutes mix may add little profit — very common where bonuses reward units"],
            ["**Adverse**", "**Adverse**", "Fewer units and a worse mix", "Both market and sales-effort problems; look at competitor pricing and product life cycles"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Why the split changes what you reward",
          md: "A sales team paid on **unit volume** will maximise units, and the cheapest way to do that is to push the **low-margin** product — producing a favourable quantity variance and an adverse mix. A team paid on **revenue** will discount, which produces volume at the expense of the sales price variance. Only a team paid on **contribution** is aligned with what the mix variance measures. So this pair of variances is not really a costing exercise: it is evidence about whether the **incentive scheme** is pointing the sales force at profit or merely at activity — which is precisely the Area E question (chapters 29–30).",
        },
        {
          kind: "list",
          title: "The limitations to state in an answer",
          items: [
            "**Interdependence with price.** A favourable mix achieved by discounting the premium line has a matching adverse sales price variance, so the two must be read together.",
            "**Mix may not be controllable.** Customers choose; a shift can reflect the market, a competitor's action, or a product reaching maturity rather than anything the sales team did.",
            "**Capacity constraints bite.** Selling more of the highest-margin product is only worthwhile if it can be made — which is the limiting-factor question of chapter 14, and the shadow price of chapter 16 may be the real value of the shift.",
            "**Standard margins go stale.** If the standards were set on outdated costs, the variances measure the standard rather than the performance — which is exactly what chapter 27 addresses.",
            "**The split needs several products with different margins.** With one product, or with equal margins, there is no mix variance to compute.",
          ],
        },
      ],
      check: {
        q: "A sales team is paid a bonus on units sold. Which variance pattern would you expect?",
        options: [
          "Favourable mix and adverse quantity",
          "Favourable quantity and adverse mix, because the cheapest way to add units is to push the low-margin line",
          "Both favourable, because incentives work",
          "Neither, because bonuses do not affect mix",
        ],
        correct: 1,
        explain:
          "Favourable QUANTITY and adverse MIX. Rewarding units makes the low-margin product the cheapest way to earn the bonus, so volume rises while the mix deteriorates. The variance pair is evidence about the incentive scheme, not just about sales.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Valuing sales variances at cost rather than margin.",
      fix: "Use standard contribution under marginal costing and standard profit under absorption.",
    },
    {
      trap: "Reversing the sign convention from the material mix variance.",
      fix: "For sales, actual comes first — selling more is favourable. For materials, standard comes first.",
    },
    {
      trap: "Treating a favourable quantity variance as good performance on its own.",
      fix: "Check the mix. Volume bought by pushing the low-margin line adds far less profit than the unit count suggests.",
    },
    {
      trap: "Forgetting that mix plus quantity must equal the total volume variance.",
      fix: "It is the only check on the split, and both methods for the quantity variance should also agree.",
    },
    {
      trap: "Ignoring the link to the sales price variance.",
      fix: "A mix improved by discounting shows up as an adverse price variance, so read them together.",
    },
  ],
  keyTerms: [
    { term: "Sales mix variance", def: "The margin effect of selling products in proportions different from budget, holding total units constant." },
    { term: "Sales quantity variance", def: "The margin effect of total units sold differing from budget, at the standard mix." },
    { term: "Standard weighted average margin", def: "Total budgeted margin divided by total budgeted units; the quick route to the quantity variance." },
  ],
  summary: [
    "The sales volume variance splits into mix and quantity, which must sum to it.",
    "Both are valued at standard margin — contribution under marginal costing, profit under absorption.",
    "The sign convention reverses from material mix: for sales, actual comes first.",
    "A favourable quantity with an adverse mix is the classic sign of volume bought by pushing low-margin products.",
    "The pair is evidence about whether the sales incentive scheme rewards profit or merely activity.",
  ],
  knowledgeDiagnostic: [
    { q: "At what value are sales mix and quantity variances computed?", a: "Standard margin per unit — contribution under marginal costing, profit under absorption costing." },
    { q: "What is the quick method for the sales quantity variance?", a: "Total actual units less total budgeted units, multiplied by the standard weighted average margin per unit." },
    { q: "Why does the sign convention differ from the material mix variance?", a: "Because selling more of a product is favourable whereas consuming more material is adverse, so actual is placed first." },
    { q: "What does a favourable quantity with an adverse mix usually indicate?", a: "Volume achieved by pushing the low-margin product, often driven by an incentive scheme based on units rather than contribution." },
  ],
}

/* ── Chapter 27 · D4(g) ───────────────────────────────────────── */

export const PM_TREE_27: StudyChapter = {
  id: "PM-27",
  number: 27,
  paper: "PM",
  area: "D",
  title: "Planning and operational variances",
  minutes: 18,
  syllabusRefs: ["D4(g)", "D4(h)"],
  intro:
    "If the standard was wrong, every variance measured against it is partly meaningless. Splitting a variance into planning and operational parts separates the standard-setter's error from the manager's performance.",
  outcomes: [
    "Explain why a variance measured against an out-of-date standard misleads",
    "Calculate planning and operational variances for materials, labour and sales",
    "Revise a standard and reconcile the split to the total variance",
    "Explain who is answerable for each part",
    "Discuss the advantages and problems of the approach, including ex post standards",
  ],
  sections: [
    {
      id: "why-split",
      heading: "Why the split exists",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "The problem in one sentence",
          md: "A variance compares actual with standard, so it only measures **performance** if the standard was achievable — and if the world moved after the standard was set, the variance measures the **world's** movement, not the manager's. A buyer facing a commodity price that rose 20% on an exchange gets a large adverse price variance whatever they do. Holding them to it is unfair, demoralising, and — worse for the business — it **buries the real signal**, because whether they bought well or badly within the new market is exactly what management needs to know and it is invisible inside one big adverse number.",
        },
        {
          kind: "formula",
          name: "The split",
          expr: "PLANNING (or revision) variance  =  ORIGINAL standard  −  REVISED standard\n                                     — uncontrollable; the standard-setter's error\n\nOPERATIONAL variance             =  REVISED standard  −  ACTUAL\n                                     — controllable; the manager's performance\n\nCHECK:  Planning  +  Operational  =  Total variance measured against the ORIGINAL standard",
          note: "The mechanism is a REVISED standard sitting between original and actual. Everything from original to revised is planning; everything from revised to actual is operational. Total variances are unchanged — the split reallocates the same number, it does not create or destroy any of it.",
        },
        {
          kind: "example",
          title: "Splitting material price and usage",
          scenario:
            "Bredon Ltd set a standard of 4 kg of material per unit at £6 per kg. After the budget was approved, the supplier's index-linked contract raised the market price to £6.75 per kg — a change outside the buyer's control — and a change in the product specification, agreed by the design team, raised the genuine requirement to 4.2 kg per unit. Actual results for the period: 9,000 units produced, 38,700 kg purchased and used at a total cost of £259,290.",
          steps: [
            { label: "Establish the three standards", detail: "ORIGINAL: 4 kg at £6 = £24 per unit. REVISED: 4.2 kg at £6.75 = £28.35 per unit. ACTUAL: £259,290 for 38,700 kg = £6.70 per kg, and 38,700/9,000 = 4.3 kg per unit." },
            { label: "Total variances against the ORIGINAL standard", detail: "Price: (£6.00 − £6.70) × 38,700 = £27,090 ADVERSE. Usage: ((9,000 × 4) − 38,700) × £6.00 = (36,000 − 38,700) × £6 = £16,200 ADVERSE. Total material variance = £43,290 ADVERSE — which, presented as it stands, looks like a disastrous period for both purchasing and production." },
            { label: "Price planning variance", detail: "(£6.00 − £6.75) × 38,700 kg = £29,025 ADVERSE. This is the market moving under an index-linked contract, and no buyer could have avoided it. Note it is valued on ACTUAL quantity, which is the convention to use unless a question directs otherwise." },
            { label: "Price operational variance", detail: "(£6.75 − £6.70) × 38,700 = £1,935 FAVOURABLE. Against the price actually available in the market, the buyer paid 5p per kg LESS. So purchasing performed well, which the £27,090 adverse total completely concealed. Check: £29,025 A + £1,935 F = £27,090 A ✓." },
            { label: "Usage planning variance", detail: "The specification change raised the requirement from 4 kg to 4.2 kg for each of the 9,000 units: (36,000 − 37,800) × £6.00 = £10,800 ADVERSE, valued at the original price to keep the price effect out of it. This belongs to the design decision, not to the production manager." },
            { label: "Usage operational variance", detail: "Against the revised allowance of 37,800 kg, 38,700 kg was used: (37,800 − 38,700) × £6.00 = £5,400 ADVERSE. So production did overuse material, but by £5,400 rather than the £16,200 the unadjusted figure suggested. Check: £10,800 A + £5,400 A = £16,200 A ✓." },
            { label: "Present the conclusion", detail: "Of £43,290 adverse, £39,825 (£29,025 + £10,800) is PLANNING — an index-linked price rise and an approved specification change, neither controllable by the managers being reported on. The genuine operational result is £1,935 favourable on price and £5,400 adverse on usage, a net £3,465 adverse. That is a completely different conversation from the one the original figures would have produced." },
          ],
          result:
            "**Planning £39,825 A (uncontrollable); operational £3,465 A net — purchasing £1,935 F, usage £5,400 A.** The split turns a £43,290 catastrophe into a £3,465 issue, and reveals that purchasing actually **beat** the market it was operating in.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The three columns that make this reliable",
          md: "Lay out **original standard / revised standard / actual** as three columns before computing anything, then compute each variance between adjacent columns. Two rules keep the arithmetic honest: use the **original price** when isolating a usage planning variance, so the price effect is not double-counted; and check that **planning plus operational equals the total against the original standard** for each variance separately, not just in aggregate. Nearly every error in this topic is a quantity or price taken from the wrong column.",
        },
      ],
      check: {
        q: "The original standard price was £6.00, the revised market price £6.75, the actual price paid £6.70, and 38,700 kg were bought. What is the price OPERATIONAL variance?",
        options: [
          "£27,090 adverse",
          "£29,025 adverse",
          "£1,935 favourable",
          "£1,935 adverse",
        ],
        correct: 2,
        explain:
          "£1,935 FAVOURABLE — (£6.75 − £6.70) × 38,700. Against the price actually available, the buyer paid 5p per kg less. The £29,025 adverse is the planning variance and the £27,090 adverse is the total against the original standard, which concealed the buyer's good performance entirely.",
      },
    },
    {
      id: "sales-and-evaluation",
      heading: "Sales planning variances, and whether the approach works",
      blocks: [
        {
          kind: "text",
          md: "The same split applies to sales. Where the **market itself** changed — the total market grew or shrank, or a competitor exited — the volume variance can be divided into a **market size** variance (planning: the market moved, valued on the company's budgeted share) and a **market share** variance (operational: whether the company held its share of the market as it actually turned out). This is often the more revealing pair in a Section C requirement, because a company can lose volume while gaining share in a shrinking market, and that is a success being reported as a failure.",
        },
        {
          kind: "example",
          title: "Market size and market share",
          scenario:
            "Kempley Ltd budgeted to sell 20,000 units, being a 25% share of an expected market of 80,000 units, at a standard contribution of £15 per unit. The market actually contracted to 64,000 units and Kempley sold 17,920 units.",
          steps: [
            { label: "Total sales volume variance", detail: "(17,920 − 20,000) × £15 = £31,200 ADVERSE. On its own this reads as a serious sales failure." },
            { label: "Market size (planning) variance", detail: "At its budgeted 25% share, a 64,000-unit market would have given 16,000 units. (16,000 − 20,000) × £15 = £60,000 ADVERSE — entirely the market contracting, which the sales team did not cause." },
            { label: "Market share (operational) variance", detail: "Kempley actually sold 17,920 of 64,000 units, a 28% share. Against the 16,000 units its budgeted share would have delivered: (17,920 − 16,000) × £15 = £28,800 FAVOURABLE. Check: £60,000 A + £28,800 F = £31,200 A ✓." },
            { label: "Interpret", detail: "The sales team GAINED share, from 25% to 28%, in a market that shrank by 20%. The unadjusted £31,200 adverse variance would have led to a reprimand; the split shows performance worth £28,800 favourable against the market as it turned out. Both figures are needed: the £60,000 is a strategic warning about the market, the £28,800 is a performance result." },
          ],
          result:
            "**Market size £60,000 A, market share £28,800 F.** Same £31,200 adverse total, opposite conclusion about the sales team — and the split also separates the strategic problem from the operational one.",
        },
        {
          kind: "table",
          caption: "Advantages and problems",
          head: ["Advantages", "Problems"],
          rows: [
            ["Managers are held to account only for what they **controlled**, which is the basic condition for a fair control system", "Deciding what is controllable is **subjective**, and the split can be manipulated to move blame"],
            ["Reporting is more **useful** — real operational performance stops being hidden inside market movements", "**Revising standards takes time and cost**, and doing it every period is a significant administrative burden"],
            ["It **feeds back into planning**: a recurring planning variance is evidence the standard-setting process itself needs fixing", "An **ex post** standard set with hindsight can excuse almost anything, so the operational variance shrinks towards zero"],
            ["It preserves **motivation**, because managers are not blamed for uncontrollable events (chapter 20's motivation point)", "A manager who negotiates the revision has an obvious **incentive to make it generous** to themselves"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The ex post standard problem — the discussion mark most candidates miss",
          md: "The revised standard is set **after** the event, with hindsight. That is what makes the split useful, and it is also what makes it dangerous: if managers can influence the revision, every adverse variance becomes a planning variance and the operational figure — the only one that measures performance — collapses to nothing. The controls are that revisions must be **based on evidence outside the manager's control** (a published index, an exchange rate, a signed supplier contract, an agreed specification change), must be **approved independently** of the manager being appraised, and must be **audited over time**: if planning variances recur in the same direction, the original standards are systematically wrong and the fix belongs in the standard-setting process, not in a monthly adjustment.",
        },
        {
          kind: "list",
          title: "When to recommend the split, and when not to",
          items: [
            "**Recommend it** where a genuinely uncontrollable, verifiable change has occurred — a commodity index, an exchange rate move, a legislated wage rate, an approved design change, a documented market contraction.",
            "**Recommend it** where standards are old, because a stale standard makes every variance a measure of the standard's age rather than of performance.",
            "**Do not recommend it** for events that are part of the manager's job — routine supplier negotiation, normal wastage, ordinary demand fluctuation. Those are what the operational variance is meant to capture.",
            "**Do not recommend it** where the revision would be a matter of opinion, because then it becomes a negotiation about the target rather than a measurement of performance.",
            "**Always** report both parts. A planning variance is not a nil variance: it is a strategic signal that the plan was wrong, and someone should still act on it.",
          ],
        },
      ],
      check: {
        q: "Why is an ex post standard a risk in this technique?",
        options: [
          "It makes the arithmetic harder",
          "It is set with hindsight, so if managers influence it every adverse variance becomes a planning variance and the operational figure collapses",
          "It always overstates the operational variance",
          "It cannot be reconciled to the total variance",
        ],
        correct: 1,
        explain:
          "Set with HINDSIGHT, it can excuse almost anything — if the manager influences the revision, the adverse result migrates into the uncontrollable planning variance and the operational figure that measures performance shrinks to nothing. The controls are external evidence, independent approval, and auditing recurring planning variances.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Valuing a usage planning variance at the revised price.",
      fix: "Use the ORIGINAL price, so the price effect is not double-counted between the two variances.",
    },
    {
      trap: "Treating a planning variance as nil or ignoring it.",
      fix: "It is a strategic signal that the plan was wrong, and it must still be reported and explained.",
    },
    {
      trap: "Assuming the split changes the total variance.",
      fix: "It reallocates the same number. Planning plus operational must equal the total against the original standard.",
    },
    {
      trap: "Computing a market share variance on the budgeted market size.",
      fix: "Use the ACTUAL market size at the budgeted share as the pivot, then compare actual sales with that figure.",
    },
    {
      trap: "Recommending the split for ordinary operational events.",
      fix: "Routine negotiation and normal wastage are the manager's job, so they belong in the operational variance.",
    },
  ],
  keyTerms: [
    { term: "Planning (revision) variance", def: "The difference between the original and revised standard; treated as uncontrollable." },
    { term: "Operational variance", def: "The difference between the revised standard and actual; the manager's controllable performance." },
    { term: "Ex post standard", def: "A standard revised after the event with hindsight, which is what makes the split both useful and open to manipulation." },
    { term: "Market size variance", def: "The volume effect of the total market differing from expectation, at the budgeted share." },
    { term: "Market share variance", def: "The volume effect of the company's share differing from budget, measured against the actual market size." },
  ],
  summary: [
    "A variance measured against an out-of-date standard measures the standard, not the performance.",
    "Planning is original less revised standard and is uncontrollable; operational is revised less actual and is controllable.",
    "The two must sum to the total variance against the original standard for each variance separately.",
    "Sales volume splits into market size (planning) and market share (operational), which can reverse the conclusion entirely.",
    "The ex post standard is the key weakness: without external evidence and independent approval, every adverse variance becomes a planning variance.",
  ],
  knowledgeDiagnostic: [
    { q: "What does a planning variance measure?", a: "The difference between the original and the revised standard — the standard-setter's error, treated as uncontrollable by the operating manager." },
    { q: "Which price values a usage planning variance?", a: "The original standard price, so that the price change is not double-counted in both variances." },
    { q: "How is a market share variance computed?", a: "Compare actual units sold with the units the budgeted share would have produced from the ACTUAL market size, valued at standard margin." },
    { q: "What is the principal danger of the technique?", a: "The revised standard is set with hindsight, so a manager able to influence it can move any adverse result into the uncontrollable planning variance." },
    { q: "Should a planning variance simply be written off?", a: "No. It is evidence the plan was wrong, and recurring planning variances mean the standard-setting process itself needs correcting." },
  ],
}

export const PM_TREE_AREA_D_PART4: StudyChapter[] = [PM_TREE_26, PM_TREE_27]
