import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-pm-kit-builders"

/*
 * PM · Area C question kit, second part — chapters 16 to 19.
 *
 * Shadow prices and slack, demand and the profit-maximising price, pricing strategies and
 * short-term decisions, and risk and uncertainty.
 *
 * The shadow price questions are built round the error the chapter is organised to
 * prevent: quoting a shadow price as the maximum payable rather than as the PREMIUM over
 * the existing price. The pricing questions are built round MR = MC and the fact that
 * revenue maximisation is not profit maximisation.
 *
 * Authored, applied, exam-standard at PM's uniform 2 marks. Original Scholify content.
 */

/* ── Chapter 16 · Shadow prices and slack ── */

const CH16: AccaQuestion[] = [
  q("PMK-16-01", "PM-16", "C", "medium",
    "What does a SHADOW PRICE of £8.57 per machine hour mean?",
    [
      "The maximum the company should pay per machine hour is £8.57",
      "One extra machine hour would increase total contribution by £8.57, so the company could pay up to £8.57 MORE than the current rate for it",
      "Machine hours currently cost £8.57 each",
      "The company should reduce machine hours until the shadow price is nil",
    ],
    1,
    "IT IS THE PREMIUM, not the ceiling. An extra hour adds £8.57 of contribution, so the maximum TOTAL payable is the existing variable cost of an hour PLUS £8.57. Quoting the shadow price as the maximum price is the error this chapter exists to prevent, and it understates what the company can afford."),

  q("PMK-16-02", "PM-16", "C", "easy",
    "What is the shadow price of a resource that has SLACK at the optimum?",
    ["Equal to its variable cost", "Nil", "Equal to the contribution of the marginal product", "Negative"],
    1,
    "NIL. A resource with slack is not limiting anything, so one more unit of it would add nothing to contribution. Only BINDING constraints have a positive shadow price, and that is the practical test for which resource is worth acquiring more of."),

  num("PMK-16-03", "PM-16", "C", "medium",
    "At the optimum, 5,400 of the 6,000 available labour hours are used. What is the slack on labour, in hours?",
    600, "hours", 1,
    "6,000 − 5,400 = 600 hours of slack. And because labour is not binding, its shadow price is nil — so paying overtime for labour would add cost and no contribution while the real constraint is elsewhere."),

  num("PMK-16-04", "PM-16", "C", "hard",
    "Two constraints bind at the optimum: machine hours 2m + 4l = 40 and labour 5m + 3l = 60, where m and l are the shadow prices of machine hours and labour respectively. What is the shadow price of LABOUR, in £ to two decimal places?",
    5.71, "£ per hour", 0.01,
    "From the first equation m = 20 − 2l. Substituting into the second: 5(20 − 2l) + 3l = 60, so 100 − 10l + 3l = 60, giving 7l = 40 and l = £5.71. The machine shadow price is then m = 20 − 2(5.714) = £8.57 — and note the two differ, so it matters which resource an offer relates to."),

  q("PMK-16-05", "PM-16", "C", "hard",
    "Machine hours have a shadow price of £8.57 and currently cost £11 an hour in variable cost. A supplier offers additional machine hours at £19 an hour. Should the company accept?",
    [
      "No, because £19 exceeds the £8.57 shadow price",
      "Yes, because the ceiling is £11 + £8.57 = £19.57, and £19 is below it",
      "No, because the shadow price applies only to labour",
      "Yes, because any additional capacity is worthwhile",
    ],
    1,
    "YES — the ceiling is £19.57 and £19 is below it, so each hour bought adds £0.57 of contribution. Comparing £19 with £8.57 alone would reject a profitable offer, which is precisely the premium-versus-ceiling error."),

  q("PMK-16-06", "PM-16", "C", "medium",
    "Machine hours have a shadow price of £8.57 and cost £11 an hour. A supplier offers hours at £24. What is the position?",
    [
      "Accept — £24 is above the current cost, which is expected for extra capacity",
      "Reject — the ceiling is £19.57 and £24 exceeds it, so each hour bought would lose £4.43 of contribution",
      "Accept only the first 100 hours",
      "The shadow price is irrelevant to the decision",
    ],
    1,
    "REJECT: the ceiling is £19.57 so each hour at £24 destroys £4.43 of contribution. The shadow price is exactly the tool for this decision, and it gives a clean accept-or-reject answer once the premium is added to the existing cost rather than used alone."),

  q("PMK-16-07", "PM-16", "C", "hard",
    "Why does a shadow price apply only over a limited RANGE?",
    [
      "Because contribution per unit changes with volume",
      "Because as more of the scarce resource is acquired, a different constraint eventually becomes binding, at which point the extra resource stops adding contribution",
      "Because suppliers' prices change",
      "Because slack must remain positive",
    ],
    1,
    "BECAUSE ANOTHER CONSTRAINT EVENTUALLY BINDS. Add machine hours and at some point labour, material or market demand becomes the limit instead — beyond that, further machine hours add nothing and the shadow price collapses to nil. Any recommendation should state that the figure holds only over a range."),

  multi("PMK-16-08", "PM-16", "C", "medium",
    "How should management use shadow prices? Select TWO.",
    [
      "As the maximum total price payable for a scarce resource",
      "To prioritise which constraint to relax first, the highest shadow price giving the biggest gain per unit relaxed",
      "To set the selling price of the finished product",
      "As the premium payable above existing cost for additional units of a scarce resource",
    ],
    [1, 3],
    "PRIORITISING WHICH CONSTRAINT TO RELAX, and as the PREMIUM above existing cost. Both are the technique's real management uses. It is not the total price payable, and it says nothing about the selling price of the output."),

  q("PMK-16-09", "PM-16", "C", "medium",
    "How does the shadow price relate to limiting factor analysis in chapter 14?",
    [
      "They are unrelated techniques",
      "With ONE constraint the shadow price is simply the contribution per unit of the limiting factor earned by the marginal product; with two or more it must be found by solving the binding constraints simultaneously",
      "The shadow price replaces contribution per limiting factor",
      "Limiting factor analysis has no shadow price",
    ],
    1,
    "IT IS THE SAME IDEA. With a single constraint, one more unit of the resource goes to the marginal product, so the shadow price is that product's contribution per unit of the limiting factor. Two constraints require simultaneous equations because relaxing one changes how both are used."),

  num("PMK-16-10", "PM-16", "C", "medium",
    "A single scarce material limits output. At the optimum the marginal product earns £13.50 of contribution per kg of the material. The material costs £9 per kg. What is the maximum a company should pay per kg for additional supplies, in £?",
    22.5, "£ per kg", 0.01,
    "£9 + £13.50 = £22.50. The shadow price is the £13.50 PREMIUM, and the ceiling is that premium plus the price already being paid. Answering £13.50 is the error — it would reject any supplier charging more than £13.50 even though up to £22.50 is worth paying."),

  q("PMK-16-11", "PM-16", "C", "medium",
    "A constraint's shadow price is nil. What does this tell management?",
    [
      "The resource is free",
      "The constraint is not binding — there is slack — so acquiring more of that resource would add nothing to contribution",
      "The resource should be sold",
      "The optimum has been computed incorrectly",
    ],
    1,
    "IT IS NOT BINDING. Slack exists, so more of it cannot help. This is practically useful: it tells management not to spend on overtime, extra machines or extra material for that resource, and to look at whichever constraint has a positive shadow price instead."),

  q("PMK-16-12", "PM-16", "C", "hard",
    "A company relaxes its highest-shadow-price constraint by buying a second machine. What should it expect?",
    [
      "The shadow price of that constraint to stay the same",
      "A new constraint to become binding, so the optimum, the shadow prices and the best product mix all change and must be recomputed",
      "All shadow prices to become nil",
      "Contribution to increase indefinitely",
    ],
    1,
    "A NEW BINDING CONSTRAINT and a fresh optimum. Relaxing a constraint moves the limitation rather than removing it — which is the same 'repeat' step as in the theory of constraints, and the reason a linear programming answer should never be presented as a permanent solution."),
]

/* ── Chapter 17 · Demand, elasticity and the profit-maximising price ── */

const CH17: AccaQuestion[] = [
  num("PMK-17-01", "PM-17", "C", "medium",
    "Demand is 8,000 units at £50. For every £2 reduction in price, demand rises by 400 units. What is the value of 'b' in the demand equation P = a − bQ? Give your answer to three decimal places.",
    0.005, "£ per unit", 0.0001,
    "b = change in price / change in quantity = £2/400 = 0.005. Always compute b as the price change divided by the QUANTITY change; inverting it — 400/2 = 200 — is the standard error and makes every subsequent figure wrong."),

  num("PMK-17-02", "PM-17", "C", "medium",
    "Demand is 8,000 units at £50 and b = 0.005. What is the value of 'a' in P = a − bQ, in £?",
    90, "£", 0.01,
    "a = P + bQ = £50 + (0.005 × 8,000) = £50 + £40 = £90. 'a' is the theoretical price at which demand would be zero — so it should always be comfortably above the current price, which is a useful sanity check on the arithmetic."),

  q("PMK-17-03", "PM-17", "C", "medium",
    "Given P = a − bQ, what is the marginal revenue function?",
    ["MR = a − bQ", "MR = a − 2bQ", "MR = 2a − bQ", "MR = a + bQ"],
    1,
    "MR = a − 2bQ. Marginal revenue falls at TWICE the rate of price, because selling one more unit requires cutting the price on every unit sold. Forgetting to double b is the commonest slip in the whole topic, and it produces a price that is too high."),

  num("PMK-17-04", "PM-17", "C", "hard",
    "P = 90 − 0.005Q and marginal cost is £30 per unit. What is the profit-maximising QUANTITY, in units?",
    6000, "units", 1,
    "Set MR = MC: 90 − 0.01Q = 30, so 0.01Q = 60 and Q = 6,000 units. Profit is maximised where marginal revenue equals marginal cost — the last unit that adds more revenue than it costs is the last one worth making."),

  num("PMK-17-05", "PM-17", "C", "hard",
    "P = 90 − 0.005Q and marginal cost is £30. What is the profit-maximising PRICE, in £?",
    60, "£", 0.01,
    "The optimal quantity is 6,000 (from MR = MC), and the price comes from the DEMAND equation, not the MR equation: P = 90 − (0.005 × 6,000) = £60. Substituting into MR would give £30, which is the marginal revenue at that volume rather than the price — a very common and very costly error."),

  q("PMK-17-06", "PM-17", "C", "medium",
    "Why must the profit-maximising price be read from the DEMAND equation rather than the marginal revenue equation?",
    [
      "Because the MR equation is only an approximation",
      "Because MR = MC identifies the optimal QUANTITY; the price customers will pay for that quantity is given by the demand curve",
      "Because marginal revenue is always negative at the optimum",
      "Because the demand equation includes fixed costs",
    ],
    1,
    "MR = MC GIVES THE QUANTITY; DEMAND GIVES THE PRICE. Marginal revenue is what the last unit adds to revenue, which is much lower than the price charged. Reading the price off the MR line understates it substantially — here by half."),

  q("PMK-17-07", "PM-17", "C", "medium",
    "Demand is described as ELASTIC. What does a price INCREASE do to total revenue?",
    [
      "Increases it, since each unit earns more",
      "Reduces it, because the percentage fall in quantity exceeds the percentage rise in price",
      "Leaves it unchanged",
      "The effect cannot be determined",
    ],
    1,
    "REDUCES IT. Elastic means quantity responds more than proportionately, so revenue falls when price rises. Note this concerns REVENUE only — the profit effect also depends on the variable cost saved on the units no longer made, which is why elasticity alone never settles a pricing decision."),

  q("PMK-17-08", "PM-17", "C", "hard",
    "A company's analysis shows that revenue is maximised at a price of £45 and profit is maximised at £60. Which should it choose, and why?",
    [
      "£45, because revenue maximisation increases market share",
      "£60, because the objective is profit — revenue maximisation ignores the cost of the extra units sold at the lower price",
      "The average of the two, at £52.50",
      "£45 in the short run and £60 in the long run",
    ],
    1,
    "£60, THE PROFIT-MAXIMISING PRICE. Revenue is maximised where MR = 0, profit where MR = MC — and since marginal cost is positive, the profit-maximising price is always the higher of the two. Elasticity speaks only to revenue, which is why it cannot answer this on its own."),

  multi("PMK-17-09", "PM-17", "C", "medium",
    "Which factors tend to make demand for a product INELASTIC? Select TWO.",
    [
      "Many close substitutes are available",
      "The product is a necessity or is habit-forming",
      "The product represents a large proportion of the customer's income",
      "There are few or no substitutes and switching is difficult",
    ],
    [1, 3],
    "NECESSITY OR HABIT, and NO CLOSE SUBSTITUTES. Both mean the customer cannot easily respond to a price rise. Available substitutes and a large share of income both make demand MORE elastic, because the customer has both the alternative and the motive to switch."),

  num("PMK-17-10", "PM-17", "C", "hard",
    "Demand is 12,000 units at £80, and each £5 price reduction raises demand by 1,000 units. Marginal cost is £26. What is the profit-maximising price, in £?",
    83, "£", 0.01,
    "b = £5/1,000 = 0.005; a = £80 + (0.005 × 12,000) = £140. MR = MC: 140 − 0.01Q = 26, so Q = 11,400 units. Price = 140 − (0.005 × 11,400) = £83. The optimal price is ABOVE the current £80 — the company is currently under-pricing, which is a perfectly common finding."),

  q("PMK-17-11", "PM-17", "C", "medium",
    "What does the tabular approach to finding the optimal price involve, and when is it preferable?",
    [
      "It is never preferable to the algebraic method",
      "Setting out price, quantity, total revenue, total cost and profit at each candidate price and selecting the best — preferable where price can only move in discrete steps or where cost is not linear",
      "It is used only where demand is inelastic",
      "It replaces the need for a marginal cost figure",
    ],
    1,
    "TABULATE AND SELECT THE BEST. Where prices move in set steps, or where marginal cost changes at certain volumes because of bulk discounts or overtime, the algebra's linearity assumption fails and a table gives the right answer where MR = MC would not."),

  q("PMK-17-12", "PM-17", "C", "hard",
    "A company computes an optimal price using P = a − bQ from two observed price/volume points. What is the principal limitation of the result?",
    [
      "The arithmetic is unreliable",
      "It assumes the demand relationship is LINEAR and stable, when it is estimated from two points and takes no account of competitor reaction, seasonality or the product's life-cycle stage",
      "It cannot be used for services",
      "Marginal cost must be constant for the method to work at all",
    ],
    1,
    "LINEARITY AND STABILITY, ESTIMATED FROM TWO POINTS. The demand curve is unlikely to be a straight line, will shift as competitors react, and describes a moment rather than a period. So the output is a well-reasoned starting point for a pricing discussion rather than an answer."),
]

/* ── Chapter 18 · Pricing strategies, make-or-buy and short-term decisions ── */

const CH18: AccaQuestion[] = [
  q("PMK-18-01", "PM-18", "C", "medium",
    "Which pricing strategy involves setting a HIGH initial price to recover development cost from early adopters before competitors enter?",
    ["Penetration pricing", "Market skimming", "Cost-plus pricing", "Complementary product pricing"],
    1,
    "MARKET SKIMMING. It suits a genuinely novel product with high development cost, inelastic early demand and a barrier to imitation. Penetration pricing is the opposite — a low launch price to build volume and market share quickly."),

  q("PMK-18-02", "PM-18", "C", "medium",
    "In which circumstances is PENETRATION pricing most appropriate?",
    [
      "A patented product with no competitors",
      "A market where economies of scale are significant, demand is elastic and building share quickly deters entrants",
      "A luxury product where a high price signals quality",
      "A product at the end of its life cycle",
    ],
    1,
    "SCALE ECONOMIES, ELASTIC DEMAND AND ENTRY DETERRENCE. Volume drives the unit cost down and the established share makes entry unattractive. The risk is that the low price is hard to raise later, and that it may signal low quality."),

  q("PMK-18-03", "PM-18", "C", "hard",
    "What is the fundamental weakness of COST-PLUS pricing, stated properly?",
    [
      "It is difficult to calculate",
      "It ignores demand and competitors entirely, and it is circular where fixed cost per unit is used — the price affects volume, which affects the cost per unit the price was based on",
      "It always produces a price that is too low",
      "It cannot be used for services",
    ],
    1,
    "IT IGNORES DEMAND AND IS CIRCULAR. Ignoring the market is the obvious half; the circularity is the sharper point — a full cost per unit depends on the volume assumed, and volume depends on the price being set from that cost. Both halves earn marks."),

  num("PMK-18-04", "PM-18", "C", "medium",
    "A component can be bought for £34. Making it costs: material £14, labour £9, variable overhead £4 and absorbed fixed overhead £11. There is spare capacity. What is the financial advantage per unit of MAKING rather than buying, in £?",
    7, "£ per unit", 0.01,
    "Relevant cost of making = £14 + £9 + £4 = £27 (the £11 absorbed fixed overhead is incurred either way). Buying costs £34, so making is £7 per unit cheaper. Including the fixed overhead would give a make cost of £38 and wrongly recommend buying."),

  num("PMK-18-05", "PM-18", "C", "hard",
    "A component's variable cost of manufacture is £27 and it can be bought in for £34. Making it uses 1.5 hours of a labour resource that is scarce and has a shadow price of £6 per hour. Should the company make or buy, and by what margin per unit, in £? Give the advantage of the better option.",
    2, "£ per unit", 0.01,
    "With a constraint, add the opportunity cost: relevant cost of making = £27 + (1.5 × £6) = £36, against £34 to buy. So BUYING is better by £2 per unit. Without the constraint making was £7 cheaper — the shadow price reverses the decision, which is why the capacity position must always be established first."),

  q("PMK-18-06", "PM-18", "C", "medium",
    "In a make-or-buy decision with NO constraint, what is the decision rule?",
    [
      "Compare the full absorbed cost of making with the buy-in price",
      "Compare the VARIABLE cost of making with the buy-in price, since fixed overhead is incurred either way",
      "Always buy, to preserve capacity",
      "Compare the buy-in price with the selling price of the finished product",
    ],
    1,
    "COMPARE VARIABLE COST OF MAKING WITH THE BUY-IN PRICE. Absorbed fixed overhead does not change with the decision, so including it biases the comparison towards buying. With a constraint, add the opportunity cost of the resource used."),

  num("PMK-18-07", "PM-18", "C", "hard",
    "A division's results: revenue £480,000, variable costs £310,000, allocated head office fixed costs £95,000 and division-specific fixed costs of £140,000 of which £90,000 would be avoided on closure. What is the annual financial effect of closing the division, in £? Give a worsening of profit as a negative number.",
    -80000, "£", 1,
    "Contribution lost = £480,000 − £310,000 = £170,000. Fixed cost saved = £90,000 only (the £95,000 allocated head office cost continues, and £50,000 of the division's own fixed cost is unavoidable). Effect of closure = £90,000 − £170,000 = −£80,000, so closing makes the company £80,000 WORSE off. The figure that decides a shutdown is AVOIDABLE fixed cost, not total fixed cost."),

  q("PMK-18-08", "PM-18", "C", "medium",
    "In a decision on whether to process a joint product further, how is the joint (common) cost treated?",
    [
      "Apportioned between the products on a sales value basis",
      "Ignored entirely — it is incurred before the decision point and is identical under both options",
      "Added to the further processing cost",
      "Deducted from the incremental revenue",
    ],
    1,
    "IGNORED. The joint cost is incurred to produce all the products and does not change with the further-processing decision, so it is irrelevant. The decision compares the INCREMENTAL revenue from processing with the INCREMENTAL cost of doing so — and apportioning joint cost is the trap that turns a profitable option into an apparent loss."),

  num("PMK-18-09", "PM-18", "C", "medium",
    "A joint product can be sold at the separation point for £14 per litre, or processed further at a cost of £6 per litre and sold for £23. Joint costs apportioned to it are £9 per litre. What is the incremental gain per litre from further processing, in £?",
    3, "£ per litre", 0.01,
    "Incremental revenue = £23 − £14 = £9; incremental cost = £6. Gain = £3 per litre. The £9 of apportioned joint cost is irrelevant — including it would show a £6 loss and lead to abandoning a profitable option."),

  multi("PMK-18-10", "PM-18", "C", "medium",
    "Which qualitative factors should be weighed in a make-or-buy decision? Select TWO.",
    [
      "The absorbed fixed overhead of the making department",
      "Reliability and quality control of the external supplier, and the risk of becoming dependent on it",
      "The apportionment basis used for head office cost",
      "Loss of in-house skills and capacity that would be difficult to rebuild",
    ],
    [1, 3],
    "SUPPLIER RELIABILITY AND DEPENDENCE, and LOSS OF IN-HOUSE CAPABILITY. Both regularly outweigh a small financial advantage, and both are marks in a written answer. The two accounting-allocation options are irrelevant to the decision on either basis."),

  q("PMK-18-11", "PM-18", "C", "hard",
    "A company is offered a one-off export order at a price below its normal selling price. Which consideration is MOST likely to make rejection correct despite a positive relevant-cost margin?",
    [
      "The order uses spare capacity",
      "The risk that existing customers learn of the lower price and demand it, or that the price sets a precedent for future negotiations",
      "The order is from overseas",
      "Fixed overhead would be under-absorbed",
    ],
    1,
    "PRECEDENT AND EXISTING-CUSTOMER REACTION. A positive relevant-cost margin makes the order worthwhile in isolation; the danger is that it is not isolated. This is the standard qualitative point on special orders and it frequently decides the answer."),

  q("PMK-18-12", "PM-18", "C", "medium",
    "Which pricing approach charges different prices to different customer groups for essentially the same product?",
    ["Penetration pricing", "Price discrimination", "Skimming", "Marginal cost pricing"],
    1,
    "PRICE DISCRIMINATION — by time, place, customer type or product version, as with off-peak rail fares or student tickets. It requires that the groups can be kept separate and that they have different elasticities, otherwise arbitrage between them destroys the higher price."),
]

/* ── Chapter 19 · Risk and uncertainty ── */

const CH19: AccaQuestion[] = [
  q("PMK-19-01", "PM-19", "C", "easy",
    "What is the difference between RISK and UNCERTAINTY in decision making?",
    [
      "They are synonyms",
      "Risk means the possible outcomes and their probabilities are known; uncertainty means the probabilities are not known",
      "Risk applies to costs and uncertainty to revenues",
      "Uncertainty can be quantified but risk cannot",
    ],
    1,
    "RISK HAS KNOWN PROBABILITIES; UNCERTAINTY DOES NOT. The distinction determines the technique: expected values need probabilities, so with genuine uncertainty the maximin, maximax and minimax regret rules are what remain."),

  num("PMK-19-02", "PM-19", "C", "medium",
    "Outcomes are: profit £40,000 with probability 0.3, £25,000 with probability 0.5 and a loss of £10,000 with probability 0.2. What is the expected value, in £?",
    22500, "£", 1,
    "(0.3 × £40,000) + (0.5 × £25,000) + (0.2 × −£10,000) = £12,000 + £12,500 − £2,000 = £22,500. Note the expected value is not one of the possible outcomes — it is a long-run average, which is the basis of the principal criticism of it."),

  q("PMK-19-03", "PM-19", "C", "medium",
    "What is the principal criticism of using an expected value for a ONE-OFF decision?",
    [
      "It is difficult to calculate",
      "It is a long-run average that may not be a possible outcome at all, and it ignores the decision maker's attitude to risk and the spread of outcomes",
      "It requires more than three outcomes",
      "It cannot handle negative outcomes",
    ],
    1,
    "IT IS A LONG-RUN AVERAGE, POSSIBLY UNATTAINABLE, AND IT IGNORES SPREAD AND RISK ATTITUDE. For a decision taken once, an expected value of £22,500 gives no comfort if one branch is a ruinous loss. It works where the decision repeats many times — which is exactly when the average is realised."),

  q("PMK-19-04", "PM-19", "C", "medium",
    "Which decision rule selects the option with the best of its WORST possible outcomes?",
    ["Maximax", "Maximin", "Minimax regret", "Expected value"],
    1,
    "MAXIMIN — maximise the minimum. It is the risk-averse or pessimistic rule, appropriate where a bad outcome would be very damaging. Maximax is the optimist's rule, taking the option with the best possible best outcome."),

  q("PMK-19-05", "PM-19", "C", "hard",
    "How is a MINIMAX REGRET decision reached?",
    [
      "Choose the option with the highest expected value",
      "For each state of the world compute the regret from not having chosen the best option, then choose the option whose MAXIMUM regret is smallest",
      "Choose the option with the best worst-case outcome",
      "Choose the option with the smallest range of outcomes",
    ],
    1,
    "BUILD A REGRET TABLE, THEN MINIMISE THE MAXIMUM REGRET. Regret is the opportunity loss from having picked the wrong option for the state that actually occurred, and the rule suits a decision maker who wants to avoid looking badly wrong whatever happens."),

  num("PMK-19-06", "PM-19", "C", "hard",
    "A payoff table shows: option A gives £30,000 / £50,000 / £70,000 under low / medium / high demand; option B gives £45,000 / £55,000 / £58,000. Under the MAXIMIN rule, which option is chosen and what is its minimum payoff, in £?",
    45000, "£", 1,
    "A's worst outcome is £30,000 and B's is £45,000. Maximin selects the better of the worst, so option B is chosen with a minimum of £45,000. Note maximax would choose A, on its £70,000 best case — which is why naming the rule matters as much as the arithmetic."),

  num("PMK-19-07", "PM-19", "C", "hard",
    "Using the same payoffs — A: £30,000 / £50,000 / £70,000 and B: £45,000 / £55,000 / £58,000 — what is option A's MAXIMUM regret, in £?",
    15000, "£", 1,
    "Under low demand the best is B's £45,000, so A's regret is £15,000. Under medium the best is B's £55,000, so A's regret is £5,000. Under high, A is best so its regret is nil. A's maximum regret is therefore £15,000. B's maximum regret is £12,000 (under high demand), so minimax regret selects B."),

  q("PMK-19-08", "PM-19", "C", "medium",
    "What does a DECISION TREE do that a payoff table cannot?",
    [
      "Handle more than three outcomes",
      "Represent SEQUENTIAL decisions, where a later choice depends on an earlier outcome, and it makes the timing of information explicit",
      "Compute expected values",
      "Incorporate probabilities",
    ],
    1,
    "REPRESENT SEQUENTIAL DECISIONS AND THE TIMING OF INFORMATION. A payoff table handles one decision under several states; a tree handles 'test the market first, then decide whether to launch' — and it shows exactly when the decision maker learns what."),

  q("PMK-19-09", "PM-19", "C", "medium",
    "How is a decision tree evaluated?",
    [
      "Left to right, following the highest probability at each node",
      "By ROLLING BACK from right to left: compute expected values at chance nodes and select the best option at decision nodes",
      "By computing the expected value of every path and choosing the highest",
      "By eliminating the lowest payoffs first",
    ],
    1,
    "ROLL BACK FROM RIGHT TO LEFT. Expected values at chance nodes (round), best choice at decision nodes (square). Working forwards is impossible because an earlier decision's value depends on what will optimally be done later."),

  num("PMK-19-10", "PM-19", "C", "hard",
    "A project's expected value with perfect information is £68,000. Without information the best expected value is £52,000. What is the maximum a company should pay for perfect information, in £?",
    16000, "£", 1,
    "£68,000 − £52,000 = £16,000. The value of perfect information is what it improves the expected outcome BY — no more. Note perfect information does not remove risk; it lets the best decision be taken in each state of the world, which is worth less than eliminating the bad states."),

  q("PMK-19-11", "PM-19", "C", "medium",
    "Why does SIMULATION address the main criticism of expected values?",
    [
      "Because it removes uncertainty",
      "Because it produces a DISTRIBUTION of possible outcomes rather than a single average, so the spread and the probability of a loss are visible",
      "Because it needs no probabilities",
      "Because it is more accurate than a decision tree",
    ],
    1,
    "IT SHOWS THE WHOLE DISTRIBUTION. The expected value's weakness is that it collapses the spread into one figure; simulation runs many iterations over the input distributions and shows the range, giving management the probability that the project loses money rather than just its average outcome."),

  multi("PMK-19-12", "PM-19", "C", "medium",
    "Which techniques help a decision maker deal with UNCERTAINTY where probabilities are unknown? Select TWO.",
    [
      "Expected values",
      "Sensitivity analysis, showing how far a variable can move before the decision changes",
      "Decision trees with assigned probabilities",
      "Maximin, maximax and minimax regret rules",
    ],
    [1, 3],
    "SENSITIVITY ANALYSIS and the MAXIMIN/MAXIMAX/MINIMAX REGRET rules. Neither needs probabilities. Expected values and probability-weighted decision trees both require them, which is precisely why they belong to risk rather than to uncertainty."),
]

export const PM_KIT_AREA_C_PART2: AccaQuestion[] = [...CH16, ...CH17, ...CH18, ...CH19]
