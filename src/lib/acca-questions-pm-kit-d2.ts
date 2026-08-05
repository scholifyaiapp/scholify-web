import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-pm-kit-builders"

/*
 * PM · Area D question kit, second part — chapters 24 to 28.
 *
 * Fixed overhead variances, material mix and yield, sales mix and quantity, planning and
 * operational variances, and variance investigation with the limits of standard costing.
 *
 * The mix and yield questions deliberately test SIGN CONVENTION as well as arithmetic,
 * because the material and sales versions run in opposite directions and candidates who
 * learn one formula apply it to both. The planning/operational questions each require the
 * capacity or market position to be established before any figure can be right.
 *
 * Authored, applied, exam-standard at PM's uniform 2 marks. Original Scholify content.
 */

/* ── Chapter 24 · Fixed overhead variances ── */

const CH24: AccaQuestion[] = [
  num("PMK-24-01", "PM-24", "D", "easy",
    "Budgeted fixed overhead was £360,000 and actual fixed overhead £371,000. What is the fixed overhead EXPENDITURE variance, in £? Give an adverse variance as a negative number.",
    -11000, "£", 1,
    "£360,000 − £371,000 = £11,000 ADVERSE. This is the ONLY fixed overhead variance about spending — £11,000 more was spent than budgeted. Every other fixed overhead variance concerns absorption."),

  num("PMK-24-02", "PM-24", "D", "medium",
    "Budgeted production was 12,000 units and actual production 12,800 units. Standard fixed overhead is £30 per unit. What is the fixed overhead VOLUME variance, in £?",
    24000, "£", 1,
    "(12,800 − 12,000) × £30 = £24,000 FAVOURABLE. It means OVER-ABSORPTION: 800 more units were made than budgeted, so £24,000 more overhead was absorbed than the budget assumed. Fixed overhead itself did not change, so this says nothing about spending."),

  q("PMK-24-03", "PM-24", "D", "medium",
    "What does a FAVOURABLE fixed overhead volume variance indicate?",
    [
      "Fixed overhead spending was below budget",
      "More units were produced than budgeted, so more overhead was absorbed than incurred — over-absorption",
      "The absorption rate was set too high",
      "Production efficiency improved",
    ],
    1,
    "OVER-ABSORPTION FROM HIGHER PRODUCTION. It measures absorption, not spending — the expenditure variance does that. And it can be bad news: a favourable volume variance rewards production regardless of sales, so it may mean building unsold inventory."),

  num("PMK-24-04", "PM-24", "D", "medium",
    "Budgeted hours were 36,000 and 37,200 hours were actually worked. Standard fixed overhead is £10 per hour. What is the fixed overhead CAPACITY variance, in £?",
    12000, "£", 1,
    "(37,200 − 36,000) × £10 = £12,000 FAVOURABLE. The workforce was in attendance for 1,200 more hours than budgeted, so more overhead was absorbed. Capacity is about hours ATTENDED; efficiency is about what those hours produced."),

  num("PMK-24-05", "PM-24", "D", "medium",
    "Standard hours for actual production were 38,400 and 37,200 hours were worked. Standard fixed overhead is £10 per hour. What is the fixed overhead EFFICIENCY variance, in £?",
    12000, "£", 1,
    "(38,400 − 37,200) × £10 = £12,000 FAVOURABLE. Those hours produced MORE than the standard allowed. Check against the volume variance: capacity £12,000 F + efficiency £12,000 F = £24,000 F, which must equal the volume variance exactly."),

  q("PMK-24-06", "PM-24", "D", "medium",
    "Which fixed overhead variances exist under MARGINAL costing?",
    [
      "All four — expenditure, volume, capacity and efficiency",
      "Expenditure only, because fixed overhead is not absorbed into units",
      "Volume only",
      "None",
    ],
    1,
    "EXPENDITURE ONLY. Under marginal costing fixed overhead is charged in full as a period cost, so there is no absorption and therefore no volume, capacity or efficiency variance. Showing a volume variance under marginal costing is a straightforward error."),

  q("PMK-24-07", "PM-24", "D", "hard",
    "What arithmetic check applies to the fixed overhead volume variance?",
    [
      "It must equal the expenditure variance",
      "Capacity plus efficiency must equal volume exactly",
      "It must equal the labour efficiency variance",
      "It must be favourable when production exceeds budget and adverse otherwise, but no check on its size is possible",
    ],
    1,
    "CAPACITY PLUS EFFICIENCY EQUALS VOLUME. It holds always, and running it before writing anything up catches most errors in the topic — if the two parts do not sum to the volume variance, one of them uses the wrong hours."),

  num("PMK-24-08", "PM-24", "D", "hard",
    "Budgeted profit was £120,000. Actual contribution exceeded budget by £12,000, the fixed overhead volume variance was £24,000 favourable and the expenditure variance £11,000 adverse. What is actual profit under ABSORPTION costing, in £?",
    145000, "£", 1,
    "£120,000 + £12,000 F + £24,000 F − £11,000 A = £145,000. Under absorption costing the volume variance IS included in the reconciliation. Under marginal costing it is omitted, giving £120,000 + £12,000 − £11,000 = £121,000."),

  num("PMK-24-09", "PM-24", "D", "hard",
    "The same period gives absorption profit of £145,000 and marginal profit of £121,000. Production exceeded sales by 800 units. What is the standard fixed overhead per unit, in £?",
    30, "£ per unit", 0.01,
    "The £24,000 difference between the two profit figures is the fixed overhead carried in the 800 units of closing inventory, so £24,000/800 = £30 per unit. That relationship — absorption less marginal equals fixed overhead in the inventory movement — is the clearest demonstration of what the volume variance actually measures."),

  q("PMK-24-10", "PM-24", "D", "hard",
    "Why does a favourable fixed overhead volume variance sit badly with just-in-time principles?",
    [
      "Because JIT does not use standard costing",
      "Because it rewards production regardless of sales, creating exactly the inventory that JIT exists to eliminate",
      "Because JIT requires marginal costing",
      "Because it overstates fixed overhead spending",
    ],
    1,
    "IT REWARDS PRODUCTION IRRESPECTIVE OF SALES. A manager judged on it can improve the reported figure by making units nobody has ordered — absorbing more overhead, flattering profit and consuming cash in stock. This is the strongest argument for marginal-costing internal reporting."),

  multi("PMK-24-11", "PM-24", "D", "medium",
    "Which of the following would cause a favourable fixed overhead CAPACITY variance? Select TWO.",
    [
      "Working overtime or an additional shift",
      "Machine breakdown reducing available hours",
      "A wage rate increase",
      "Reduced absenteeism, so more hours were worked than budgeted",
    ],
    [0, 3],
    "OVERTIME OR EXTRA SHIFTS, and LOWER ABSENTEEISM. Both raise hours ATTENDED above budget, so more overhead is absorbed. Machine breakdown reduces hours and gives an adverse capacity variance, and a wage rate change affects only the labour rate variance."),

  q("PMK-24-12", "PM-24", "D", "medium",
    "An operating statement does not reconcile to actual profit. Which of these is NOT a likely cause?",
    [
      "The sales volume variance was valued at standard contribution under an absorption costing system",
      "The volume variance was omitted under absorption costing",
      "A sign error on one of the cost variances",
      "The actual profit figure was computed from actual revenue less actual costs",
    ],
    3,
    "Computing actual profit as actual revenue less actual costs is CORRECT — that is the figure the statement must reconcile TO. The other three are the standard causes: wrong valuation basis for the volume variance, an omitted volume variance, or a sign error. Never plug the difference; the gap is the diagnostic."),
]

/* ── Chapter 25 · Material mix and yield ── */

const CH25: AccaQuestion[] = [
  q("PMK-25-01", "PM-25", "D", "medium",
    "When is a material mix and yield split MEANINGFUL?",
    [
      "Whenever more than one material is used",
      "Only where the materials are substitutable, so the proportions are genuinely a management choice",
      "Only where the materials cost the same",
      "Whenever the total usage variance is adverse",
    ],
    1,
    "ONLY WHERE THE MATERIALS ARE SUBSTITUTABLE. Where a product needs exactly one component of each type there is no choice of proportions, so splitting the usage variance produces figures that look meaningful and describe nothing. Food, chemicals, animal feed and alloys are the classic contexts."),

  num("PMK-25-02", "PM-25", "D", "medium",
    "The standard mix per 100 kg of input is 50 kg of A at £4, 30 kg of B at £6 and 20 kg of C at £9. What is the standard WEIGHTED AVERAGE price per kg of input, in £?",
    5.6, "£ per kg", 0.01,
    "(50 × £4) + (30 × £6) + (20 × £9) = £200 + £180 + £180 = £560 for 100 kg, so £5.60 per kg. This weighted average is what values the YIELD variance — using an individual material's price instead is a frequent error."),

  num("PMK-25-03", "PM-25", "D", "hard",
    "Total actual input was 100,000 kg. The standard mix is 50:30:20 for A, B and C at £4, £6 and £9 per kg. Actual input was A 46,000 kg, B 33,000 kg and C 21,000 kg. What is the material MIX variance, in £? Give an adverse variance as a negative number.",
    -11000, "£", 1,
    "In the standard mix, 100,000 kg would be A 50,000, B 30,000, C 20,000. A: (50,000 − 46,000) × £4 = £16,000 F. B: (30,000 − 33,000) × £6 = £18,000 A. C: (20,000 − 21,000) × £9 = £9,000 A. Total £11,000 ADVERSE — 4,000 kg of the £4 material was displaced by dearer materials, so the blend got more expensive."),

  num("PMK-25-04", "PM-25", "D", "hard",
    "Standard output is 90 kg from every 100 kg of input. Actual output was 88,200 kg from a total input of 100,000 kg. The standard weighted average price is £5.60 per kg of input. What is the material YIELD variance, in £? Give an adverse variance as a negative number.",
    -11200, "£", 1,
    "Standard input for the actual output = 88,200 × 100/90 = 98,000 kg. Yield = (98,000 − 100,000) × £5.60 = £11,200 ADVERSE. Two thousand kg of input was effectively wasted. Note the yield variance uses the WEIGHTED AVERAGE price, not any single material's price."),

  q("PMK-25-05", "PM-25", "D", "hard",
    "A favourable mix variance of £8,000 appears with an adverse yield variance of £13,000. What is the conclusion?",
    [
      "The cheaper mix saved £8,000, which is good news",
      "The substitution cost £5,000 net — the yield loss exceeded the mix saving, so the cheaper blend was a bad decision",
      "The two are unrelated and should be reported separately",
      "Production efficiency was poor and purchasing performed well",
    ],
    1,
    "£5,000 LOST NET. A cheaper blend ALWAYS produces a favourable mix variance, because the mix variance is valued at standard prices. Whether it was a good decision depends entirely on the yield — and here the yield loss more than took back the saving. The two must always be netted."),

  q("PMK-25-06", "PM-25", "D", "medium",
    "What is held CONSTANT in computing the material mix variance?",
    [
      "The output achieved",
      "The total actual input quantity, which is re-split into the standard proportions for comparison",
      "The actual prices paid",
      "The standard output per unit of input",
    ],
    1,
    "THE TOTAL ACTUAL INPUT. The mix variance re-splits the SAME total quantity into the standard proportions and compares that with the actual split, so it isolates the proportions question. The yield variance then deals with the total input differing from what the output required."),

  q("PMK-25-07", "PM-25", "D", "medium",
    "What arithmetic check applies to the mix and yield variances?",
    [
      "They must both be adverse or both favourable",
      "Mix plus yield must equal the total material usage variance",
      "Mix must equal yield",
      "Their sum must equal the total material cost variance",
    ],
    1,
    "MIX PLUS YIELD EQUALS TOTAL USAGE. It is the only check available on the split, so it should always be run. Note it reconciles to the USAGE variance, not the total material cost variance — the price variance sits outside the split."),

  multi("PMK-25-08", "PM-25", "D", "medium",
    "Which are likely causes of an adverse material YIELD variance? Select TWO.",
    [
      "A supplier price increase",
      "Poor-quality input material",
      "A change in the standard selling price",
      "Machine calibration drifting out of specification",
    ],
    [1, 3],
    "POOR-QUALITY MATERIAL and MACHINE CALIBRATION. Both mean the same total input produces less output. A supplier price increase affects the price variance, and the selling price affects neither."),

  q("PMK-25-09", "PM-25", "D", "hard",
    "Which four variances can arise from ONE decision to substitute a cheaper material?",
    [
      "Price, usage, rate and volume",
      "Favourable material price, favourable mix, adverse yield, and possibly adverse labour efficiency as staff work with a harder blend",
      "Mix, yield, capacity and expenditure",
      "Price, mix, yield and sales volume",
    ],
    1,
    "PRICE F, MIX F, YIELD A, and LABOUR EFFICIENCY A. Four variances, one decision — and identifying that is what a PM answer is for. Reporting them as four separate findings, each with its own owner, misses the point entirely."),

  num("PMK-25-10", "PM-25", "D", "hard",
    "Actual input at standard prices was £571,000 and the standard cost of input for the actual output was £548,800. What is the total material USAGE variance, in £? Give an adverse variance as a negative number.",
    -22200, "£", 1,
    "£548,800 − £571,000 = £22,200 ADVERSE. And this must equal mix plus yield: £11,000 A + £11,200 A = £22,200 A ✓. Both figures are computed at standard prices, which is what keeps the price effect out of the usage analysis."),

  q("PMK-25-11", "PM-25", "D", "medium",
    "Who is normally answerable for an adverse material MIX variance?",
    [
      "The production manager alone, in every case",
      "Whoever chose the blend — production management, or purchasing if a substitution was forced by a supply problem",
      "The management accountant who set the standard",
      "No one, since mix is determined by the recipe",
    ],
    1,
    "WHOEVER CHOSE THE BLEND. It is usually production management, but if purchasing was unable to obtain the specified material the responsibility moves there. And where the mix caused the yield loss, the yield variance belongs with the same decision maker."),

  q("PMK-25-12", "PM-25", "D", "hard",
    "Which consequence of a cheaper material blend do the mix and yield variances NOT capture at all?",
    [
      "The saving on purchase price",
      "The reduction in output achieved",
      "A fall in product QUALITY, which appears later as complaints, returns or lost sales",
      "The extra material consumed",
    ],
    2,
    "PRODUCT QUALITY. The variances measure cost and quantity; a cheaper blend that makes an inferior product shows up months later as customer complaints and lost sales, in a period whose variances have nothing to do with the decision. Naming this is a mark in a written answer."),
]

/* ── Chapter 26 · Sales mix and quantity ── */

const CH26: AccaQuestion[] = [
  q("PMK-26-01", "PM-26", "D", "medium",
    "At what value are sales mix and quantity variances computed?",
    [
      "Standard cost per unit",
      "Standard margin per unit — contribution under marginal costing, profit under absorption costing",
      "Actual selling price",
      "Standard selling price",
    ],
    1,
    "STANDARD MARGIN. Contribution under marginal costing, profit under absorption. A sales manager sells revenue rather than cost, so a cost-based valuation measures the wrong thing — and choosing the wrong margin makes every figure wrong by the fixed overhead per unit."),

  num("PMK-26-02", "PM-26", "D", "medium",
    "Budget: 6,000 units at £12 contribution, 3,000 at £25 and 1,000 at £40 — 10,000 units in total. What is the standard WEIGHTED AVERAGE contribution per unit, in £?",
    18.7, "£ per unit", 0.01,
    "(6,000 × £12) + (3,000 × £25) + (1,000 × £40) = £72,000 + £75,000 + £40,000 = £187,000 over 10,000 units = £18.70. This is the quick route to the sales quantity variance."),

  num("PMK-26-03", "PM-26", "D", "medium",
    "Budgeted total sales were 10,000 units and actual sales 10,800 units. The standard weighted average contribution is £18.70. What is the sales QUANTITY variance, in £?",
    14960, "£", 1,
    "(10,800 − 10,000) × £18.70 = £14,960 FAVOURABLE. The quick method multiplies the total volume difference by the weighted average margin — and it must agree with the product-by-product calculation, which is a useful self-check."),

  num("PMK-26-04", "PM-26", "D", "hard",
    "The budgeted mix is 60:30:10 with contributions of £12, £25 and £40. Actual sales totalled 10,800 units, split 5,400, 3,600 and 1,800. What is the sales MIX variance, in £?",
    24840, "£", 1,
    "In the standard mix, 10,800 units would be 6,480, 3,240 and 1,080. Mix: (5,400 − 6,480) × £12 = £12,960 A; (3,600 − 3,240) × £25 = £9,000 F; (1,800 − 1,080) × £40 = £28,800 F. Total £24,840 FAVOURABLE — the mix shifted towards the high-margin products. Note ACTUAL comes first here, unlike the material mix variance."),

  q("PMK-26-05", "PM-26", "D", "hard",
    "Why does the sign convention for the sales mix variance REVERSE compared with the material mix variance?",
    [
      "Because sales variances are valued at margin",
      "Because selling MORE of a product is favourable, whereas consuming more of a material is adverse — so actual is placed first",
      "Because the sales mix is not controllable",
      "Because the two variances measure different periods",
    ],
    1,
    "BECAUSE MORE SALES IS GOOD AND MORE CONSUMPTION IS BAD. For sales, (actual − standard mix) × margin; for materials, (standard mix − actual) × price. Learning one formula and applying it to both reverses every sign, which is why the reversal is worth committing to memory."),

  q("PMK-26-06", "PM-26", "D", "hard",
    "A sales team is paid a bonus on UNITS sold. Which variance pattern would you expect, and why?",
    [
      "Favourable mix and adverse quantity, because the team focuses on premium products",
      "Favourable quantity and adverse mix, because the cheapest way to add units is to push the low-margin line",
      "Both favourable, because incentives work",
      "Neither, because bonus schemes do not affect mix",
    ],
    1,
    "FAVOURABLE QUANTITY, ADVERSE MIX. Rewarding units makes the low-margin product the cheapest route to the bonus. So the variance pair is evidence about the INCENTIVE SCHEME rather than just about sales, and the recommendation is to pay on contribution."),

  num("PMK-26-07", "PM-26", "D", "medium",
    "Sales mix variance is £24,840 favourable and sales quantity variance £14,960 favourable. What is the total sales VOLUME variance, in £?",
    39800, "£", 1,
    "£24,840 + £14,960 = £39,800 FAVOURABLE. Mix plus quantity must always equal the total volume variance — and here the mix element is nearly twice the quantity element, which is the finding: the value came from WHAT was sold rather than how much."),

  q("PMK-26-08", "PM-26", "D", "medium",
    "What does a favourable sales QUANTITY variance with an adverse sales MIX variance usually indicate?",
    [
      "A successful move up-market",
      "Volume achieved by discounting or pushing the low-margin product, so the profit gain is far less than the unit count suggests",
      "A market that has grown",
      "Improved production efficiency",
    ],
    1,
    "VOLUME BOUGHT BY PUSHING LOW-MARGIN PRODUCT. Total units rose but the blend deteriorated. Check the sales PRICE variance too — if the volume was won by discounting, there will be an adverse price variance completing the picture."),

  num("PMK-26-09", "PM-26", "D", "hard",
    "Budgeted sales were 4,000 units of X at £30 contribution and 6,000 of Y at £10. Actual sales were 5,500 of X and 5,500 of Y. What is the sales MIX variance, in £?",
    22000, "£", 1,
    "Total actual 11,000 units in the budgeted 40:60 mix would be X 4,400 and Y 6,600. X: (5,500 − 4,400) × £30 = £33,000 F. Y: (5,500 − 6,600) × £10 = £11,000 A. Total £22,000 FAVOURABLE — the mix shifted decisively towards the £30 product."),

  multi("PMK-26-10", "PM-26", "D", "medium",
    "Which limitations should be stated about sales mix and quantity variances? Select TWO.",
    [
      "They cannot be computed for more than three products",
      "Mix may not be controllable — customers choose, and a shift can reflect the market rather than the sales team",
      "They must be valued at standard cost",
      "A favourable mix achieved by discounting the premium line has a matching adverse price variance, so the two must be read together",
    ],
    [1, 3],
    "MIX MAY NOT BE CONTROLLABLE, and the LINK TO THE PRICE VARIANCE. Both are real limitations worth stating. There is no limit on product count, and the valuation is at margin rather than cost."),

  q("PMK-26-11", "PM-26", "D", "medium",
    "A company's sales mix shifts towards its highest-margin product but total volume falls. How should this be judged?",
    [
      "Unfavourably, since total volume fell",
      "Compare the two figures: a smaller, richer sales base may well be more profitable, and the mix gain may exceed the quantity loss",
      "Favourably in all cases",
      "It cannot be judged without the price variance",
    ],
    1,
    "COMPARE THEM. This pattern is often a deliberate and successful move up-market, and netting the favourable mix against the adverse quantity settles whether it worked. Judging on volume alone would condemn a good strategy."),

  q("PMK-26-12", "PM-26", "D", "hard",
    "Under what circumstance is there NO sales mix variance to compute?",
    [
      "When total volume equals budget",
      "When there is only one product, or when all products have the same standard margin",
      "When all variances are favourable",
      "When the company uses absorption costing",
    ],
    1,
    "ONE PRODUCT, or EQUAL MARGINS. The mix variance measures the margin effect of selling a different blend — with one product there is no blend, and with identical margins any blend gives the same result. The split needs several products with DIFFERENT margins to say anything."),
]

/* ── Chapter 27 · Planning and operational variances ── */

const CH27: AccaQuestion[] = [
  q("PMK-27-01", "PM-27", "D", "medium",
    "What does a PLANNING variance measure?",
    [
      "The difference between the revised standard and actual performance",
      "The difference between the ORIGINAL and the REVISED standard — the standard-setter's error, treated as uncontrollable",
      "The total variance against the original standard",
      "The difference between budgeted and actual volume",
    ],
    1,
    "ORIGINAL LESS REVISED STANDARD. It is the part of the variance caused by the standard being wrong rather than by how the operation was run, and it is treated as outside the operating manager's control."),

  num("PMK-27-02", "PM-27", "D", "medium",
    "The original standard price was £6.00 per kg and the revised market price £6.75. 38,700 kg were purchased. What is the material price PLANNING variance, in £? Give an adverse variance as a negative number.",
    -29025, "£", 1,
    "(£6.00 − £6.75) × 38,700 = £29,025 ADVERSE. An index-linked market movement no buyer could avoid. Value it on the ACTUAL quantity, which is the convention unless a question directs otherwise."),

  num("PMK-27-03", "PM-27", "D", "medium",
    "The revised market price was £6.75 per kg and the actual price paid £6.70. 38,700 kg were purchased. What is the material price OPERATIONAL variance, in £?",
    1935, "£", 1,
    "(£6.75 − £6.70) × 38,700 = £1,935 FAVOURABLE. Against the price actually available in the market the buyer paid 5p per kg LESS — so purchasing performed well, which the £27,090 adverse total variance concealed entirely."),

  num("PMK-27-04", "PM-27", "D", "hard",
    "The original standard was 4 kg per unit and the revised requirement, after an approved specification change, is 4.2 kg. 9,000 units were produced. The original standard price is £6.00 per kg. What is the material usage PLANNING variance, in £? Give an adverse variance as a negative number.",
    -10800, "£", 1,
    "(36,000 − 37,800) × £6.00 = £10,800 ADVERSE. Value it at the ORIGINAL price, so the price change is not double-counted between the two variances. This belongs to the design decision, not to the production manager."),

  num("PMK-27-05", "PM-27", "D", "hard",
    "The revised allowance is 4.2 kg per unit for 9,000 units, and 38,700 kg was actually used. The standard price is £6.00. What is the material usage OPERATIONAL variance, in £? Give an adverse variance as a negative number.",
    -5400, "£", 1,
    "Revised allowance = 9,000 × 4.2 = 37,800 kg against 38,700 used: (37,800 − 38,700) × £6.00 = £5,400 ADVERSE. Production did overuse material, but by £5,400 rather than the £16,200 the unadjusted variance suggested."),

  q("PMK-27-06", "PM-27", "D", "medium",
    "What check must the planning and operational split satisfy?",
    [
      "Planning must always be adverse",
      "Planning plus operational must equal the total variance measured against the ORIGINAL standard, for each variance separately",
      "The two must be equal in size",
      "Operational must always be favourable",
    ],
    1,
    "THEY MUST SUM TO THE TOTAL AGAINST THE ORIGINAL STANDARD, variance by variance rather than only in aggregate. The split REALLOCATES the same number; it does not create or destroy any of it."),

  num("PMK-27-07", "PM-27", "D", "hard",
    "A company budgeted to sell 20,000 units, being 25% of an expected 80,000-unit market, at £15 standard contribution. The market contracted to 64,000 units. What is the MARKET SIZE variance, in £? Give an adverse variance as a negative number.",
    -60000, "£", 1,
    "At its budgeted 25% share, a 64,000-unit market gives 16,000 units. (16,000 − 20,000) × £15 = £60,000 ADVERSE — entirely the market contracting, which the sales team did not cause. This is the PLANNING half of the sales volume variance."),

  num("PMK-27-08", "PM-27", "D", "hard",
    "The company actually sold 17,920 units into a market of 64,000, against a budgeted 25% share. Standard contribution is £15. What is the MARKET SHARE variance, in £?",
    28800, "£", 1,
    "Its budgeted share of the actual market would have been 16,000 units; it sold 17,920. (17,920 − 16,000) × £15 = £28,800 FAVOURABLE. The team GAINED share from 25% to 28% in a market that shrank 20% — and the unadjusted £31,200 adverse volume variance would have led to a reprimand."),

  q("PMK-27-09", "PM-27", "D", "hard",
    "What is the principal DANGER of the planning and operational split?",
    [
      "The arithmetic is complex",
      "The revised standard is set with hindsight, so a manager able to influence it can move any adverse result into the uncontrollable planning variance",
      "It always understates the total variance",
      "It cannot be applied to sales variances",
    ],
    1,
    "THE EX POST STANDARD. Set after the event, it can excuse almost anything — and if the manager influences the revision, the operational figure that measures performance collapses towards zero. The controls are external evidence, independent approval, and auditing recurring planning variances."),

  multi("PMK-27-10", "PM-27", "D", "medium",
    "In which circumstances should the planning and operational split be recommended? Select TWO.",
    [
      "Routine supplier negotiation went less well than expected",
      "A published commodity index rose after the budget was approved",
      "Normal wastage was slightly above standard",
      "The standards are several years old and have not been reviewed",
    ],
    [1, 3],
    "A PUBLISHED INDEX MOVEMENT, and STALE STANDARDS. Both are verifiable and outside the manager's control. Routine negotiation and normal wastage are part of the manager's job and belong in the operational variance — treating them as planning variances is how the technique gets abused."),

  q("PMK-27-11", "PM-27", "D", "medium",
    "Should a planning variance simply be written off as uncontrollable?",
    [
      "Yes — by definition nobody is responsible for it",
      "No — it is evidence the plan was wrong, and a recurring planning variance means the standard-setting process itself needs correcting",
      "Yes, provided it is disclosed in the operating statement",
      "Only if it is favourable",
    ],
    1,
    "NO. It is uncontrollable by the OPERATING manager, which is not the same as unimportant. A planning variance is a strategic signal, and if planning variances recur in the same direction the standards are systematically wrong — which is a fixable process failure."),

  q("PMK-27-12", "PM-27", "D", "medium",
    "How is a market share variance computed?",
    [
      "Actual sales less budgeted sales, at standard margin",
      "Compare actual units sold with the units the BUDGETED share would have produced from the ACTUAL market size, at standard margin",
      "Actual market share less budgeted market share, multiplied by budgeted volume",
      "Budgeted share applied to the budgeted market size",
    ],
    1,
    "PIVOT ON THE BUDGETED SHARE OF THE ACTUAL MARKET. That figure is the dividing line: everything from budget to it is market size, and everything from it to actual sales is market share. Using the budgeted market size instead conflates the two."),
]

/* ── Chapter 28 · Investigation, interdependence and limits ── */

const CH28: AccaQuestion[] = [
  q("PMK-28-01", "PM-28", "D", "medium",
    "Which test is the MOST valuable in deciding whether to investigate a variance?",
    [
      "Absolute size, because large variances matter most",
      "The trend over several periods, because it distinguishes genuine drift from random fluctuation",
      "Whether the variance is adverse rather than favourable",
      "Whether it exceeds 5% of the standard cost",
    ],
    1,
    "THE TREND. A small variance worsening month after month signals a real and growing problem; a large one-off may be pure noise. Size alone ignores scale and context, and confining attention to adverse variances misses loose standards and quality being cut."),

  multi("PMK-28-02", "PM-28", "D", "medium",
    "Why should FAVOURABLE variances be investigated? Select TWO.",
    [
      "To reward the responsible manager",
      "They may reveal that the standard is too loose, so the whole budget is understated",
      "They may indicate quality has been cut or maintenance and training skipped",
      "Favourable variances always indicate good performance",
    ],
    [1, 2],
    "A LOOSE STANDARD, or QUALITY AND MAINTENANCE CUT. Both are real problems reported as good news — and in a performance management paper a favourable variance obtained by damaging the business is a more interesting finding than an adverse one obtained honestly."),

  q("PMK-28-03", "PM-28", "D", "medium",
    "Name the five tests for whether to investigate a variance.",
    [
      "Size, sign, source, sector and sequence",
      "Materiality, controllability, trend, cost versus benefit, and reliability of the standard",
      "Accuracy, timeliness, completeness, relevance and cost",
      "Price, usage, mix, yield and volume",
    ],
    1,
    "MATERIALITY, CONTROLLABILITY, TREND, COST VERSUS BENEFIT, and RELIABILITY OF THE STANDARD. Investigating costs management time, so it must be justified — and an uncontrollable variance is information for the planners rather than a task for the manager."),

  q("PMK-28-04", "PM-28", "D", "hard",
    "An operating statement shows favourable material price of £8,400, adverse material usage of £11,200, favourable labour rate of £2,600 and adverse labour efficiency of £9,800. What is the finding?",
    [
      "Purchasing performed well and production performed badly",
      "Two substitution decisions — cheaper material and cheaper labour — cost about £10,000 between them, and the two favourable variances represent value lost rather than gained",
      "The variances are unrelated and should be investigated separately",
      "The standards need revising",
    ],
    1,
    "TWO SUBSTITUTIONS, ABOUT £10,000 LOST. Cheaper material saved £8,400 and wasted £11,200; cheaper labour saved £2,600 and lost £9,800 in time. Grouping by CAUSE rather than by variance type is what produces this answer, and note the two clusters overlap since harder material also takes longer."),

  q("PMK-28-05", "PM-28", "D", "medium",
    "Which cluster of variances signals that a machine broke down or an untrained shift worked?",
    [
      "Favourable material price with adverse usage",
      "Adverse material usage, adverse labour efficiency and adverse fixed overhead efficiency — one event, three variances",
      "Adverse sales price with favourable volume",
      "Favourable mix with adverse yield",
    ],
    1,
    "ADVERSE USAGE, LABOUR EFFICIENCY AND OVERHEAD EFFICIENCY TOGETHER. One event produces all three, so it should be investigated once rather than three times — and reporting three separate findings to three managers wastes the very management time the investigation decision is meant to conserve."),

  q("PMK-28-06", "PM-28", "D", "hard",
    "Why is standard costing poorly suited to a business with highly customised products?",
    [
      "Because variances cannot be computed for bespoke work",
      "Because there is no repeated standard unit for which to set a standard, so cost management must move to the design stage using target costing",
      "Because labour is a small proportion of cost",
      "Because overheads cannot be absorbed",
    ],
    1,
    "THERE IS NO REPEATED STANDARD UNIT. A standard describes an identical unit made many times; with customised output there is nothing to standardise. Target costing and job-level costing are the alternatives, which is why chapter 6's technique belongs in the same conversation."),

  multi("PMK-28-07", "PM-28", "D", "medium",
    "Which limitations of standard costing arise in a MODERN manufacturing environment? Select TWO.",
    [
      "Labour is often a small proportion of cost, so detailed labour variances analyse very little",
      "Standard costing cannot value inventory",
      "Continuous improvement is the goal, but a static standard defines success as 'no worse than last year'",
      "Variances cannot be computed monthly",
    ],
    [0, 2],
    "SMALL LABOUR PROPORTION, and STATIC STANDARDS VERSUS CONTINUOUS IMPROVEMENT. Both are genuine. Standard costing remains perfectly good for inventory valuation, and monthly variance reporting is exactly what it does — the criticisms are about relevance, not mechanics."),

  q("PMK-28-08", "PM-28", "D", "hard",
    "Which conclusion about standard costing earns the marks?",
    [
      "It is obsolete in modern business",
      "Its usefulness depends on the environment: still valuable for repetitive processes, inventory valuation and budgeting, but it needs supplementing with non-financial measures and far more frequent revision",
      "It should be replaced entirely by activity-based costing",
      "It works well everywhere provided standards are accurate",
    ],
    1,
    "IT DEPENDS ON THE ENVIRONMENT — supplement rather than abandon. Claiming obsolescence overstates the case and loses marks: standard costing remains useful where processes repeat and inputs are measurable, and universally for inventory valuation and budget preparation."),

  q("PMK-28-09", "PM-28", "D", "medium",
    "What is KAIZEN costing, and how does it differ from standard costing?",
    [
      "It is standard costing applied to services",
      "Standards are tightened deliberately each period to embed continuous improvement, rather than held static as a benchmark to be met",
      "It uses activity-based drivers",
      "It removes the need for variance analysis",
    ],
    1,
    "STANDARDS THAT TIGHTEN EACH PERIOD. A static standard makes success mean 'no worse than before', which is the opposite of continuous improvement. Kaizen costing builds the improvement into the target, so meeting it requires getting better."),

  multi("PMK-28-10", "PM-28", "D", "medium",
    "Which behavioural consequences of variance reporting should a discussion answer name? Select TWO.",
    [
      "Budgetary slack, as managers inflate standards so favourable variances follow automatically",
      "Improved accuracy of the accounting records",
      "A blame culture, in which adverse variances lead to problems being hidden rather than reported",
      "Reduced need for management judgement",
    ],
    [0, 2],
    "BUDGETARY SLACK and BLAME CULTURE. Both change behaviour in ways nobody intended, and both are readily available marks — along with short-termism, dysfunctional buying decisions, producing for stock, and silo behaviour between departments."),

  q("PMK-28-11", "PM-28", "D", "hard",
    "A company sets an investigation rule of 'anything over £5,000'. What is the weakness?",
    [
      "£5,000 is too high a threshold",
      "An absolute rule ignores scale, so it over-investigates large cost centres and under-investigates small ones — a percentage test alongside an absolute floor works better",
      "It cannot be applied to favourable variances",
      "It requires statistical control limits",
    ],
    1,
    "IT IGNORES SCALE. £5,000 on a £2m cost pool is noise; £5,000 on a £40,000 pool is 12.5% and a serious problem. Most real systems combine a percentage test with an absolute floor, because each rule corrects the other's weakness."),

  q("PMK-28-12", "PM-28", "D", "hard",
    "Why does throughput accounting sit awkwardly with a standard costing system that rewards favourable purchase price variances?",
    [
      "Because throughput accounting has no material cost",
      "Because a favourable price variance rewards bulk buying, which creates exactly the inventory that just-in-time and throughput thinking exist to remove",
      "Because throughput accounting does not use standards",
      "Because purchase prices are uncontrollable",
    ],
    1,
    "BECAUSE IT REWARDS BULK BUYING AND THEREFORE INVENTORY. The buyer earns a favourable price variance by ordering large quantities, tying up cash and warehouse space in stock the JIT system is designed to eliminate. Two control systems pulling in opposite directions is a real finding in a scenario."),
]

export const PM_KIT_AREA_D_PART2: AccaQuestion[] = [...CH24, ...CH25, ...CH26, ...CH27, ...CH28]
