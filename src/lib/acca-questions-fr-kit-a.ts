import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-fr-kit-builders"

/*
 * FR · Area A question kit — chapters 1 to 6.
 *
 * The conceptual and regulatory framework, and the concepts of groups. Area A is examined
 * almost entirely in Section A, and it is where the cheapest marks in the paper sit: the
 * definitions are fixed and the classifications are decidable.
 *
 * It is also where candidates most often answer from instinct rather than from the
 * framework — that an asset is something you own, that prudence means understating, that
 * consolidation follows the shareholding. Every distractor in this file is one of those
 * instincts, so the explanation can name it.
 *
 * MCQ carries almost all of Area A, because almost everything it examines is a
 * classification or a justification rather than a calculation. The numeric items are the
 * three places Area A does produce a figure: capital maintenance, an effective interest in
 * a sub-subsidiary, and the arithmetic of goodwill under the two NCI methods.
 *
 * Authored, applied, exam-standard at FR's uniform 2 marks.
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 1 · Why a framework, and who the statements are for ── */

const CH01: AccaQuestion[] = [
  q("FRK-01-01", "FR-01", "A", "easy",
    "According to the Conceptual Framework, financial statements are prepared primarily for which group?",
    [
      "Existing and potential investors, lenders and other creditors",
      "The directors and senior management of the entity",
      "Government departments and tax authorities",
      "Employees and their representatives",
    ],
    0,
    "EXISTING AND POTENTIAL INVESTORS, LENDERS AND OTHER CREDITORS. They are the primary users because they make decisions about providing resources to the entity and cannot compel the information they need. Management is excluded precisely because it CAN obtain internal information on demand; government can compel it; employees have a real interest but are not making resource-provision decisions."),

  q("FRK-01-02", "FR-01", "A", "easy",
    "What is the objective of general purpose financial reporting?",
    [
      "To provide information useful to primary users in making decisions about providing resources to the entity",
      "To report the value of the entity to its shareholders",
      "To demonstrate that the directors have complied with company law",
      "To calculate the amount of profit available for distribution",
    ],
    0,
    "TO PROVIDE INFORMATION USEFUL IN MAKING RESOURCE-PROVISION DECISIONS. Financial statements help users ESTIMATE the entity's value; they do not report it. Legal compliance and distributable profit are consequences of preparing them, not the objective."),

  q("FRK-01-03", "FR-01", "A", "medium",
    "An IFRS Standard requires a treatment that appears inconsistent with the Conceptual Framework. Which applies?",
    [
      "The Standard, because the Framework is not itself a Standard",
      "The Framework, because it sets out the underlying concepts",
      "Whichever produces the more relevant information",
      "The entity may choose, provided the choice is disclosed",
    ],
    0,
    "THE STANDARD. The Framework guides the IASB in developing Standards and helps a preparer reason where no Standard is decisive, but it never overrides one. This is why an answer arguing a treatment purely from the Framework, against an explicit Standard requirement, is wrong."),

  q("FRK-01-04", "FR-01", "A", "medium",
    "Which is a consequence of a RULES-based rather than principles-based approach to standard setting?",
    [
      "Transactions may be structured to fall the favourable side of a bright line while their substance is unchanged",
      "Preparers must exercise more judgement, reducing comparability",
      "Novel transactions can always be accounted for by reasoning from first principles",
      "Standard setting becomes less politically contested",
    ],
    0,
    "STRUCTURING. A detailed rule creates a boundary, and a boundary invites arrangements designed to fall the right side of it — a lease drafted at 4 years 11 months where the rule captures 5 years. The other three describe a PRINCIPLES-based system or are simply untrue: rules-based systems are, if anything, more contested because each rule is fought over individually."),

  q("FRK-01-05", "FR-01", "A", "medium",
    "Which statement about what financial statements provide is correct?",
    [
      "They provide information to help users estimate the entity's value, but do not report that value",
      "They report the value of the entity at the reporting date",
      "They contain all the information any particular user needs",
      "They provide forecasts of future cash flows",
    ],
    0,
    "THEY HELP USERS ESTIMATE VALUE. The gap between book equity and market capitalisation is not an error — it reflects unrecognised intangibles, expectations and market sentiment. Financial statements are historical, are general purpose rather than tailored, and contain no forecasts."),

  q("FRK-01-06", "FR-01", "A", "hard",
    "Why does the Conceptual Framework treat STEWARDSHIP as part of decision-usefulness rather than as a separate objective?",
    [
      "Because a user who assesses management as a poor steward will act on that assessment — by selling, voting against the board, or refusing to lend",
      "Because stewardship is a matter for corporate governance codes rather than financial reporting",
      "Because management is not a primary user of the financial statements",
      "Because stewardship cannot be measured in monetary terms",
    ],
    0,
    "BECAUSE THE ASSESSMENT DRIVES A DECISION. Users need to assess how efficiently and effectively management has discharged its responsibilities, and that assessment feeds directly into a resource-provision decision — which is what makes it part of decision-usefulness rather than something separate."),
]

/* ── Chapter 2 · Qualitative characteristics ── */

const CH02: AccaQuestion[] = [
  q("FRK-02-01", "FR-02", "A", "easy",
    "Which TWO characteristics are FUNDAMENTAL under the Conceptual Framework?",
    [
      "Relevance and faithful representation",
      "Relevance and comparability",
      "Faithful representation and prudence",
      "Comparability and verifiability",
    ],
    0,
    "RELEVANCE AND FAITHFUL REPRESENTATION, and only those two. Information failing either is not useful at all, and no amount of comparability or timeliness rescues it. Comparability and verifiability are ENHANCING; prudence is not a characteristic at all — it supports neutrality."),

  multi("FRK-02-02", "FR-02", "A", "medium",
    "Which THREE of the following are components of FAITHFUL REPRESENTATION?",
    ["Complete", "Neutral", "Free from error", "Verifiable", "Timely", "Prudent"],
    [0, 1, 2],
    "COMPLETE, NEUTRAL and FREE FROM ERROR. Verifiability and timeliness are separate ENHANCING characteristics. Prudence is not a component — it is the exercise of caution that SUPPORTS neutrality."),

  q("FRK-02-03", "FR-02", "A", "medium",
    "What does 'free from error' require?",
    [
      "No errors in the description, and no error in selecting and applying the process used to produce the figure",
      "That every figure is exact",
      "That no estimates are used",
      "That an independent expert has verified each amount",
    ],
    0,
    "NO ERROR IN THE DESCRIPTION OR IN APPLYING THE PROCESS — not exactness. Many figures are necessarily estimates. A provision of $2m that settles at $2.4m was not an error if the estimate was properly made and described as an estimate. Recognising $2m when the best estimate was $3m IS one."),

  q("FRK-02-04", "FR-02", "A", "medium",
    "Which statement about PRUDENCE is consistent with the Conceptual Framework?",
    [
      "It is the exercise of caution under uncertainty and does not permit deliberate understatement of assets or income",
      "It requires that assets and income are understated and liabilities and expenses overstated",
      "It is one of the two fundamental qualitative characteristics",
      "It has been removed from the Framework entirely",
    ],
    0,
    "CAUTION UNDER UNCERTAINTY, SYMMETRICALLY APPLIED. Prudence supports neutrality, and deliberate understatement is as much a breach of neutrality as overstatement. The old asymmetric idea — recognise losses early and gains late — is not the current Framework's position, and writing it loses the mark."),

  q("FRK-02-05", "FR-02", "A", "medium",
    "An entity omits disclosure of a $25,000 loan made to a director during the year. Revenue is $180m. Is the omission material?",
    [
      "Yes — materiality has a qualitative dimension, and a transaction with a director is decision-relevant at any amount",
      "No — $25,000 is far below any reasonable quantitative threshold",
      "No, unless the loan was still outstanding at the reporting date",
      "Only if the entity has a stated policy of disclosing director transactions",
    ],
    0,
    "YES, QUALITATIVELY MATERIAL. Materiality is not purely a size test: a related party transaction with a director is something primary users scrutinise, and IAS 24 requires disclosure regardless of amount. Repayment before the year end does not undo the fact that it happened."),

  q("FRK-02-06", "FR-02", "A", "medium",
    "Which of the following is TRUE of comparability?",
    [
      "It is achieved through consistency, and it does not require uniformity between entities in different situations",
      "It requires all entities in an industry to apply identical accounting policies",
      "It is a fundamental qualitative characteristic",
      "It is the same thing as consistency",
    ],
    0,
    "ACHIEVED THROUGH CONSISTENCY, AND NOT UNIFORMITY. Two entities in genuinely different situations should report differently — forcing identical treatment would REDUCE comparability. Consistency is the means, not the characteristic, and comparability is enhancing rather than fundamental."),

  q("FRK-02-07", "FR-02", "A", "hard",
    "A material customer entered administration ten days before the reporting date and the loss cannot yet be reliably quantified. The finance director proposes delaying publication by four months until the administrator reports. Which is the best response?",
    [
      "Publish on time with the best estimate and full disclosure of the measurement uncertainty",
      "Delay publication, because faithful representation is fundamental and timeliness is only enhancing",
      "Publish on time and disclose nothing, since no reliable figure exists",
      "Publish on time recognising no loss, and adjust the following year's comparatives",
    ],
    0,
    "PUBLISH WITH THE ESTIMATE AND THE UNCERTAINTY DISCLOSED. The apparent conflict dissolves: 'complete' includes explaining the limitations of an estimate, so a disclosed estimate IS faithful. Delaying four months would destroy the information's relevance for users deciding now, and recognising nothing is neither relevant nor faithful."),

  q("FRK-02-08", "FR-02", "A", "hard",
    "Which situation would breach NEUTRALITY?",
    [
      "Presenting a one-off gain within 'underlying profit' while presenting a one-off loss as exceptional",
      "Recognising a provision at the entity's best estimate where the outcome is uncertain",
      "Applying the lower of cost and net realisable value to inventory",
      "Disclosing that a figure is subject to significant measurement uncertainty",
    ],
    0,
    "THE ASYMMETRIC PRESENTATION OF GAINS AND LOSSES. Selecting or presenting information to obtain a particular reaction from users is exactly what neutrality prohibits. The other three are required or permitted treatments — and note that the lower-of test is a deliberate asymmetry within IAS 2, justified on its own terms, not a breach of neutrality."),
]

/* ── Chapter 3 · The elements, recognition and derecognition ── */

const CH03: AccaQuestion[] = [
  q("FRK-03-01", "FR-03", "A", "easy",
    "How does the Conceptual Framework define an asset?",
    [
      "A present economic resource controlled by the entity as a result of past events",
      "A resource owned by the entity from which future benefits are expected to flow",
      "Something of value that the entity can sell",
      "A right that will probably produce economic benefits",
    ],
    0,
    "A PRESENT ECONOMIC RESOURCE CONTROLLED AS A RESULT OF PAST EVENTS. Note the three words the wrong answers introduce: OWNED (control is the test, not ownership), EXPECTED and PROBABLY (probability was deliberately moved out of the definition into the recognition criteria in 2018)."),

  q("FRK-03-02", "FR-03", "A", "easy",
    "An entity leases a vehicle for four years; legal title remains with the lessor. Does the entity have an asset?",
    [
      "Yes — the right to use the vehicle for four years is a controlled economic resource",
      "No — the entity does not own the vehicle",
      "Only if the lease transfers substantially all the risks and rewards of ownership",
      "Only if the entity can purchase the vehicle at the end of the lease",
    ],
    0,
    "YES — A CONTROLLED RIGHT. The definition turns on control of a right, not on title, which is exactly why IFRS 16 puts a right-of-use asset on the lessee's balance sheet. The risks-and-rewards test belonged to the superseded lease classification approach and has no part in the definition."),

  q("FRK-03-03", "FR-03", "A", "medium",
    "What is the test for a PRESENT OBLIGATION?",
    [
      "The entity has no practical ability to avoid the duty or responsibility",
      "The entity is legally required to make a payment",
      "The entity has decided to make a payment",
      "A payment is probable and can be reliably estimated",
    ],
    0,
    "NO PRACTICAL ABILITY TO AVOID IT. Legal enforceability is sufficient but not necessary — a constructive obligation qualifies too. A decision alone is not an obligation, because it can be reversed. Probability and measurement are recognition questions, not definition ones."),

  q("FRK-03-04", "FR-03", "A", "medium",
    "On 18 December an entity's board resolves to close a division at a cost of $3m. No announcement is made before the 31 December year end. What is recognised?",
    [
      "Nothing — the board could reverse the decision, so the entity retains a practical ability to avoid the cost",
      "A provision of $3m, since the decision is a past event",
      "A contingent liability of $3m",
      "A provision of $3m, since closure is now virtually certain",
    ],
    0,
    "NOTHING. A board decision creates no obligation because it can be reversed. The obligation arises when the entity LOSES the ability to avoid the transfer — normally by announcing a detailed plan to those affected. Nor is there a contingent liability, since no possible obligation from a past event exists yet."),

  q("FRK-03-05", "FR-03", "A", "medium",
    "An entity has spent $2m developing a brand internally. Independent valuers assess it at $9m. Which statement is correct?",
    [
      "The brand meets the definition of an asset but is not recognised, because measurement uncertainty is too high for a faithful representation",
      "The brand does not meet the definition of an asset because it is not separable",
      "The brand should be recognised at $9m with a gain in profit or loss",
      "The brand should be recognised at the $2m cost incurred",
    ],
    0,
    "IT IS AN ASSET AND IS NOT RECOGNISED. This distinction is the whole point of separating the definition from the recognition criteria. The brand is a controlled right from past events with the potential to produce benefits — so it IS an asset — but the cost cannot be separated from developing the business as a whole and the valuation rests on unobservable assumptions, so no faithful representation is possible. IAS 38 turns this analysis into an outright prohibition."),

  q("FRK-03-06", "FR-03", "A", "medium",
    "Where does PROBABILITY appear in the Conceptual Framework?",
    [
      "In the recognition criteria, not in the definitions of asset and liability",
      "In the definition of an asset, which requires benefits to be probable",
      "In both the definitions and the recognition criteria",
      "Nowhere — the Framework does not refer to probability",
    ],
    0,
    "IN THE RECOGNITION CRITERIA. The 2018 revision deliberately moved it there. The definition of an economic resource requires only the POTENTIAL to produce benefits — capable of doing so in at least one circumstance — so a low-probability right is still an asset, and recognition is then decided separately."),

  q("FRK-03-07", "FR-03", "A", "medium",
    "Why is a dividend not an expense?",
    [
      "Because the definition of expenses expressly excludes distributions to holders of equity claims",
      "Because dividends are paid out of profit that has already been taxed",
      "Because dividends are discretionary",
      "Because dividends reduce cash rather than profit",
    ],
    0,
    "THE DEFINITION EXCLUDES DISTRIBUTIONS TO EQUITY HOLDERS. Income and expenses are defined as changes in assets and liabilities that change equity OTHER THAN through transactions with equity holders. That single exclusion is why a dividend never appears in profit or loss and why a share issue is not income."),

  q("FRK-03-08", "FR-03", "A", "hard",
    "A customer pays $80,000 in advance for goods to be delivered next year. Applying the Framework definitions, why is no income recognised now?",
    [
      "Cash has risen but a liability to deliver the goods has risen by the same amount, so equity is unchanged",
      "Income is only recognised when cash is earned rather than received",
      "The amount is a prepayment and prepayments are never income",
      "Income requires a legally enforceable right to consideration",
    ],
    0,
    "EQUITY IS UNCHANGED. Income is defined as an increase in assets or a decrease in liabilities that INCREASES EQUITY. Here an asset and a liability rise together, so nothing has been earned. Income arises when the goods are delivered and the liability falls with no matching asset decrease — which is IFRS 15's five-step model in miniature."),

  q("FRK-03-09", "FR-03", "A", "hard",
    "An airline is legally required to overhaul each aircraft every three years, and cannot fly it afterwards without the overhaul. At the reporting date one aircraft is two years into its cycle. What should be recognised?",
    [
      "No provision — the overhaul element is a component of the aircraft, depreciated over three years",
      "A provision for two-thirds of the overhaul cost",
      "A provision for the full overhaul cost, since it is legally required",
      "A contingent liability for the overhaul cost",
    ],
    0,
    "NO PROVISION — COMPONENTISED DEPRECIATION INSTEAD. The obligation to overhaul only bites if the airline chooses to keep flying that aircraft; it could ground or sell it, so it has a practical ability to avoid the cost. Contrast the position once the overhaul HAS been performed on credit: then there is an unavoidable obligation to pay for work already done, and that is a payable."),
]

/* ── Chapter 4 · Measurement, capital maintenance, going concern ── */

const CH04: AccaQuestion[] = [
  q("FRK-04-01", "FR-04", "A", "easy",
    "Which measurement basis is a MARKET-based exit price, independent of the entity holding the asset?",
    ["Fair value", "Value in use", "Current cost", "Historical cost"],
    0,
    "FAIR VALUE — the price that would be received to sell the asset in an orderly transaction between market participants. Value in use is entity-specific; current cost is a current ENTRY price; historical cost reflects the entity's own past transaction."),

  q("FRK-04-02", "FR-04", "A", "medium",
    "Two entities own an identical machine. Entity A can use it in a highly profitable process; Entity B would have to sell it. Which is correct?",
    [
      "Their fair values are the same but their values in use differ",
      "Their values in use are the same but their fair values differ",
      "Both measures will be the same for each entity",
      "Fair value cannot be determined where intended use differs",
    ],
    0,
    "SAME FAIR VALUE, DIFFERENT VALUE IN USE. Fair value asks what market participants would pay and so does not depend on the holder. Value in use is the present value of the cash flows THAT entity expects. This is why IAS 36 takes the HIGHER of the two as recoverable amount — a rational entity takes the better of selling and keeping."),

  num("FRK-04-03", "FR-04", "A", "medium",
    "An entity begins the year with net assets of $500,000 and ends with $580,000, having paid no dividends and issued no shares. General inflation was 4%. Calculate profit under REAL financial capital maintenance, in $.",
    60000, "$", 1,
    "$60,000. Opening capital must be maintained in PURCHASING POWER terms, so it is uplifted for general inflation: $500,000 × 1.04 = $520,000. Profit is $580,000 − $520,000 = $60,000. The $80,000 answer is the NOMINAL figure, which does not maintain purchasing power; the $20,000 inflation adjustment is a capital maintenance adjustment in equity, not profit."),

  q("FRK-04-04", "FR-04", "A", "medium",
    "Which capital maintenance concept does IFRS apply?",
    [
      "Financial capital maintenance on a nominal basis",
      "Financial capital maintenance on a real basis",
      "Physical capital maintenance",
      "Entities may choose between them",
    ],
    0,
    "FINANCIAL CAPITAL MAINTENANCE, NOMINAL BASIS. This is why holding gains reach profit and why historical cost profit can be overstated in a period of rising prices. Physical capital maintenance would require current cost measurement and would treat price changes as capital maintenance adjustments in equity rather than as profit."),

  q("FRK-04-05", "FR-04", "A", "medium",
    "Events cast significant doubt on an entity's ability to continue trading, but management concludes it remains a going concern. What follows?",
    [
      "The statements are prepared on the going concern basis and the material uncertainty is disclosed",
      "The statements must be prepared on a break-up basis",
      "No disclosure is required, since management has concluded the entity is a going concern",
      "The statements are prepared on the going concern basis with the assets written down to realisable value",
    ],
    0,
    "GOING CONCERN BASIS, WITH THE MATERIAL UNCERTAINTY DISCLOSED. There are three outcomes, not two: no issue; going concern with a disclosed material uncertainty; and not a going concern, requiring a different basis with the reason disclosed. A scenario about refinancing negotiations that have not yet concluded is testing the middle one."),

  q("FRK-04-06", "FR-04", "A", "hard",
    "For an asset held to be consumed in the entity's own manufacturing process, with no second-hand market, which basis is likely to be most relevant and why?",
    [
      "Historical cost, because the asset contributes to cash flows only in combination with others and a fair value would carry high measurement uncertainty",
      "Fair value, because current values are always more relevant than past ones",
      "Value in use, because it reflects the cash flows the entity expects",
      "Current cost, because it shows what replacement would cost",
    ],
    0,
    "HISTORICAL COST. The Framework directs you to weigh how the asset contributes to cash flows: indirectly, in combination with the rest of the process, so its individual value tells a user little. And with no market, fair value would be a modelled figure with high estimation uncertainty — less faithful than a depreciated cost. Value in use is a recoverable-amount measure used for impairment, not a general carrying basis."),
]

/* ── Chapter 5 · The regulatory framework and the preparer's duty ── */

const CH05: AccaQuestion[] = [
  q("FRK-05-01", "FR-05", "A", "easy",
    "Which body issues IFRS Accounting Standards?",
    ["The IASB", "The IFRS Foundation Trustees", "The IFRS Advisory Council", "The Monitoring Board"],
    0,
    "THE IASB. The Trustees appoint IASB and ISSB members, oversee governance and secure funding — they do not set standards, and attributing standard-setting to them is the commonest error in this topic. The Advisory Council advises on agenda and priorities with no technical authority; the Monitoring Board provides the link to public authorities."),

  q("FRK-05-02", "FR-05", "A", "easy",
    "What is the status of an IFRIC Interpretation?",
    [
      "Authoritative and mandatory, having been approved by the IASB",
      "Non-binding guidance that a preparer may weigh against other considerations",
      "Binding only on entities in jurisdictions that have adopted it separately",
      "An indication of the IASB's likely future position",
    ],
    0,
    "AUTHORITATIVE AND MANDATORY. Interpretations are approved by the IASB before issue and carry the same force as the Standard they interpret. Treating one as optional guidance is a two-mark error."),

  q("FRK-05-03", "FR-05", "A", "medium",
    "Why does the IASB's standard-setting process involve extensive public consultation?",
    [
      "Because the IASB has no power to enforce its Standards, so consultation builds the consensus that enforcement would otherwise supply",
      "Because company law in most jurisdictions requires it",
      "Because the IASB lacks the technical expertise to draft Standards unaided",
      "Because consultation shortens the time taken to issue a Standard",
    ],
    0,
    "BECAUSE THE IASB CANNOT ENFORCE ANYTHING. Adoption is a decision for each jurisdiction, and a jurisdiction will not adopt what its preparers were never consulted on. Consultation lengthens the process considerably — that is the price of the legitimacy it buys."),

  multi("FRK-05-04", "FR-05", "A", "medium",
    "Which THREE of the following are genuine OBSTACLES to the international harmonisation of financial reporting?",
    [
      "Legal systems in which the financial statements determine taxable profit or distributable profit",
      "Political reluctance to cede a national competence over financial reporting",
      "Business cultures less comfortable with the judgement that principles-based standards require",
      "Lower costs for multinational groups preparing one set of accounts",
      "Improved comparability for cross-border investors",
      "A potential reduction in the cost of capital",
    ],
    [0, 1, 2],
    "THE FIRST THREE. Tax and legal linkage, national sovereignty and business culture are structural obstacles. The last three are ARGUMENTS FOR harmonisation, and an answer listing only those has covered half the question — which is exactly the failure this item is built to expose."),

  q("FRK-05-05", "FR-05", "A", "medium",
    "A finance director argues that a presentation is acceptable because it complies with every applicable Standard, even though the overall picture is misleading. Why is this not a complete defence?",
    [
      "Because neutrality is a component of faithful representation, and IAS 1 requires FAIR PRESENTATION rather than only rule-by-rule compliance",
      "Because the Conceptual Framework overrides the Standards where they conflict",
      "Because compliance with Standards is only presumed to achieve fair presentation in listed entities",
      "Because the auditor rather than the director determines whether a presentation is acceptable",
    ],
    0,
    "NEUTRALITY AND FAIR PRESENTATION. Information presented so as to obtain a particular reaction is not neutral and therefore not a faithful representation, whatever individual rules were followed. IAS 1's requirement is fair presentation; compliance with Standards is PRESUMED to achieve it, and where it demonstrably has not, the presumption has failed."),

  q("FRK-05-06", "FR-05", "A", "hard",
    "A financial controller is asked to (i) capitalise costs of a project still in the research phase, (ii) release a warranty provision because claims experience has genuinely improved, and (iii) recognise revenue on goods held in the warehouse awaiting customer collection instructions. What is the appropriate response?",
    [
      "Refuse (i); investigate (ii) on the evidence, since it may be a legitimate change of estimate; challenge (iii) against IFRS 15's bill-and-hold conditions",
      "Refuse all three, since all are attempts to manipulate reported profit",
      "Accept all three, since each involves a matter of judgement",
      "Accept (ii) and (iii) and refuse only (i), which breaches a specific prohibition",
    ],
    0,
    "TAKE EACH ON ITS OWN MERITS. (i) is a breach — research must be expensed. (ii) may be entirely correct: IAS 37 REQUIRES remeasurement to the current best estimate, so a supportable release is the right accounting. (iii) turns on whether IFRS 15's bill-and-hold conditions are met — a substantive reason, goods identified as the customer's, ready for transfer, and not redirectable. A global refusal or a global acceptance both miss the distinction the question is testing."),
]

/* ── Chapter 6 · The concepts and principles of groups ── */

const CH06: AccaQuestion[] = [
  q("FRK-06-01", "FR-06", "A", "easy",
    "Which of these is required for CONTROL under IFRS 10?",
    [
      "Power over the investee, exposure to variable returns, AND the ability to use that power to affect those returns",
      "Ownership of more than 50% of the ordinary shares",
      "The right to appoint at least one director",
      "A shareholding of 20% or more together with board representation",
    ],
    0,
    "ALL THREE ELEMENTS TOGETHER. A majority shareholding is the usual route to power but is neither necessary nor sufficient. The third element — the LINK between power and returns — is what excludes an agent such as a fund manager, who may have extensive power but exercises it for others."),

  q("FRK-06-02", "FR-06", "A", "easy",
    "A parent owns 55% of a subsidiary. How much of the subsidiary's inventory is included in the consolidated statement of financial position?",
    ["All of it", "55% of it", "None of it, unless the inventory is held for group use", "55%, with the remainder shown as non-controlling interest"],
    0,
    "ALL OF IT. Consolidation follows CONTROL: the group controls the inventory, so all of it is shown. The 45% affects only how the resulting EQUITY is split between the parent's owners and the non-controlling interest. Proportionate consolidation of assets is never correct for a subsidiary."),

  q("FRK-06-03", "FR-06", "A", "medium",
    "Vale Co holds 45% of Weir Co. The remaining shares are held by several thousand investors, none with more than 1%, and no group of them acts together. How should Weir be accounted for?",
    [
      "Consolidated as a subsidiary, with a 55% non-controlling interest",
      "Equity accounted as an associate, since the holding is below 50%",
      "Measured as a financial asset under IFRS 9",
      "Consolidated proportionately at 45%",
    ],
    0,
    "CONSOLIDATED, WITH A 55% NCI. The register is so dispersed that no other party or combination can outvote Vale in practice — DE FACTO control. And because consolidation follows control, the assets go in at 100% with 55% of the equity shown as NCI. A non-controlling interest larger than the controlling one looks strange and is exactly right."),

  q("FRK-06-04", "FR-06", "A", "medium",
    "Marlow Co holds 70% of the shares of Corby Co. Those shares carry NO voting rights; the votes attach to a separate class held by another party. How should Corby be accounted for?",
    [
      "Not consolidated — without power there is no control, whatever the economic interest",
      "Consolidated as a subsidiary, since 70% exceeds half the shares",
      "Consolidated as a subsidiary, because a 70% economic interest gives exposure to variable returns",
      "Consolidated proportionately at 70%",
    ],
    0,
    "NOT CONSOLIDATED. Exposure to variable returns is present but POWER is absent, and all three elements are required. Corby would be a financial asset under IFRS 9, or an associate if the holding somehow conferred significant influence."),

  num("FRK-06-05", "FR-06", "A", "medium",
    "P Co owns 80% of S Co, which owns 80% of T Co. What is P's EFFECTIVE interest in T, as a percentage?",
    64, "%", 0.01,
    "64%. Multiply down the chain: 80% × 80% = 64%. This matters because different tests use different thresholds — 64% exceeds the 51% associated-company test and the 50% needed for a gains group, but FAILS the 75% effective test used for group relief in a tax context. In FR the practical point is that P CONTROLS T through S, so T is consolidated in full with a 36% non-controlling interest."),

  q("FRK-06-06", "FR-06", "A", "medium",
    "Why is an associate NOT consolidated line by line?",
    [
      "Because the investor does not control the associate's assets — it only influences the policy decisions about them",
      "Because the investor's holding is below 50%",
      "Because the associate is not a legal member of the group",
      "Because the associate's accounting policies may differ from the group's",
    ],
    0,
    "BECAUSE THERE IS NO CONTROL. Adding an associate's inventory to group inventory would assert a control the group does not have and would mislead a user about the resources the group can deploy. The equity method reports the group's INTEREST in the associate's net assets as one figure instead, which is what the group actually has."),

  q("FRK-06-07", "FR-06", "A", "medium",
    "Where is non-controlling interest presented, and why?",
    [
      "Within equity, separately from the equity attributable to the owners of the parent, because the group has no obligation to transfer resources to those shareholders",
      "In non-current liabilities, because it represents an external claim",
      "As a deduction from goodwill",
      "In a mezzanine section between liabilities and equity",
    ],
    0,
    "WITHIN EQUITY, SHOWN SEPARATELY. The non-controlling shareholders own a share of the residual, and the group has no obligation to pay them anything — so it is not a liability. Presenting it outside equity overstates liabilities and understates equity, distorting gearing, which is often the very ratio the next requirement asks about."),

  q("FRK-06-08", "FR-06", "A", "hard",
    "Marlow Co holds 30% of Dursley Co, plus options over a further 25% that are currently exercisable at a fixed price well below current value. Does Marlow control Dursley?",
    [
      "Yes — the options are substantive potential voting rights, giving Marlow the present ability to command 55%",
      "No — potential voting rights are ignored until exercised",
      "No — 30% confers only significant influence",
      "Only if Marlow intends to exercise the options",
    ],
    0,
    "YES. Potential voting rights count when they are SUBSTANTIVE — currently exercisable with no economic barrier to exercise. Deeply in-the-money options exercisable at will satisfy that, so Marlow has the present ability to direct the relevant activities. Intention is irrelevant: the test is ability, not plan."),

  q("FRK-06-09", "FR-06", "A", "hard",
    "An investor holds rights that allow it to veto any change in the investee's line of business, but no rights over day-to-day operating and financing decisions. What is the effect on the control assessment?",
    [
      "These are PROTECTIVE rights and do not give power over the relevant activities, so they do not confer control",
      "They confer control, because the investor can prevent the investee from changing its business",
      "They confer joint control, because a decision requires the investor's consent",
      "They confer significant influence and so create an associate",
    ],
    0,
    "PROTECTIVE RIGHTS — no control. A veto over a fundamental change protects the investor's interest but gives no ability to DIRECT the activities that significantly affect returns. This is the mirror image of de facto control: there, a minority holding conferred power; here, apparently powerful rights confer none."),
]

export const FR_KIT_A: AccaQuestion[] = [...CH01, ...CH02, ...CH03, ...CH04, ...CH05, ...CH06]
