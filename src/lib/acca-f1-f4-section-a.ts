import type { AccaQuestion } from "@/lib/acca-content"
import type { StudyChapter } from "@/lib/acca-study-content"
import { F1_F4_CONTENT_TARGET, F1_F4_PAPERS } from "@/lib/f1-f4-content-contract"

const TARGET_PAPERS = new Set<string>(F1_F4_PAPERS)

type ChoiceSeed = {
  id: string
  area: string
  stem: string
  answer: string
  distractors: string[]
  explanation: string
  difficulty: AccaQuestion["difficulty"]
  /**
   * Set for seeds built by permuting a glossary term or exam trap — retrieval
   * drills, not exam-standard measurement. Chapter `check` questions are
   * authored (a real stem with authored options and an authored explanation), so
   * they are NOT marked: they belong in a graded form. See AccaQuestion.recall.
   */
  recall?: true
}

function choiceQuestion(paper: string, seed: ChoiceSeed, ordinal: number): AccaQuestion {
  const raw = [seed.answer, ...seed.distractors.filter((item) => item !== seed.answer).slice(0, 3)]
  if (raw.length < 4) throw new Error(`${paper} ${seed.id} has fewer than four defensible choices`)
  const shift = ordinal % raw.length
  const options = [...raw.slice(shift), ...raw.slice(0, shift)]
  return {
    id: `study-a-${paper.toLowerCase()}-${seed.id}`,
    paper,
    area: seed.area,
    type: "mcq",
    stem: seed.stem,
    options,
    correct: options.indexOf(seed.answer),
    explanation: seed.explanation,
    marks: 2,
    difficulty: seed.difficulty,
    ...(seed.recall ? { recall: true as const } : {}),
  }
}

/**
 * Questions built FROM the study text, split by whether they are exam-standard.
 *
 * Two very different things come out of a chapter and they must not be pooled:
 *
 *  · `authored` — the chapter's inline `check` questions. Each is a real stem with
 *    authored options and an authored explanation, written to test application.
 *    They belong in a graded form and are counted as bank depth.
 *  · `drills` — prompts PERMUTED out of glossary terms, exam traps, recaps and
 *    outcomes. Real revision value, not measurement. Stamped `recall: true`.
 *
 * `target` is the combined inventory the paper is sized to, so the same items are
 * generated in the same order as before and every id a learner has already
 * answered stays stable.
 */
export interface StudyDerivedQuestions {
  authored: AccaQuestion[]
  drills: AccaQuestion[]
}

export function f1F4StudyDerived(
  paper: string,
  authored: AccaQuestion[],
  chapters: StudyChapter[],
): StudyDerivedQuestions {
  if (!TARGET_PAPERS.has(paper)) return { authored: [], drills: [] }
  return studyDerivedQuestions(paper, authored, chapters, F1_F4_CONTENT_TARGET.sectionA)
}

export function studyDerivedQuestions(
  paper: string,
  authored: AccaQuestion[],
  chapters: StudyChapter[],
  target: number,
): StudyDerivedQuestions {
  const terms = chapters.flatMap((chapter) =>
    chapter.keyTerms.map((term, index) => ({
      ...term,
      area: chapter.area,
      key: `${chapter.area}-term-${index + 1}`,
    })),
  )
  const traps = chapters.flatMap((chapter) =>
    chapter.examTraps.map((trap, index) => ({
      ...trap,
      area: chapter.area,
      key: `${chapter.area}-trap-${index + 1}`,
    })),
  )
  const seeds: ChoiceSeed[] = []
  /**
   * Push seeds that PERMUTE study material (glossary terms, exam traps, recaps,
   * outcomes, chapter intros) into retrieval prompts. Everything routed through
   * here is stamped `recall: true`, which keeps it out of graded forms unless a
   * paper has nothing authored for an area. Authored chapter `check` questions
   * are pushed directly onto `seeds` and stay eligible for grading.
   */
  const pushRecall = (...items: Omit<ChoiceSeed, "recall">[]): void => {
    for (const item of items) {
      // Difficulty is forced to "easy", overriding whatever the seed claimed.
      // These are all one-step retrieval of a single fact, so the labels were
      // fiction: the SAME definition→term mapping was tagged "easy" as -name,
      // "medium" as -label and "hard" as -advice/-identify. DIFFICULTY_WEIGHT
      // scores the diagnostic by that label — the reveal literally promises "a
      // hard one right counts for more" — so a meaningless "hard" tag bought the
      // learner unearned readiness. Recall is easy; the authored bank supplies
      // the genuine medium and hard tiers.
      seeds.push({ ...item, difficulty: "easy", recall: true })
    }
  }

  chapters.forEach((chapter) => {
    chapter.sections.forEach((section, index) => {
      if (!section.check) return
      const check = section.check
      seeds.push({
        id: `${chapter.area}-check-${index + 1}`,
        area: chapter.area,
        stem: check.q,
        answer: check.options[check.correct],
        distractors: check.options.filter((_, optionIndex) => optionIndex !== check.correct),
        explanation: check.explain,
        difficulty: "medium",
      })
    })
  })

  terms.forEach((term, index) => {
    const otherTerms = terms.filter((candidate) => candidate.term !== term.term)
    const termDistractors = otherTerms.slice(index % Math.max(1, otherTerms.length))
      .concat(otherTerms)
      .map((candidate) => candidate.term)
    const definitionDistractors = otherTerms.slice((index * 3) % Math.max(1, otherTerms.length))
      .concat(otherTerms)
      .map((candidate) => candidate.def)
    // Vary the MEANING, hold the term. The distractors used to be
    // `otherTerm — term.def`, i.e. a different term paired with the SAME
    // definition — so the correct option was the only one whose left-hand side
    // matched the term named in the stem, and every one of these questions was
    // answerable by string-matching with zero ACCA knowledge. Pairing this term
    // against other definitions forces the candidate to actually know which
    // meaning belongs to it.
    const pairingDistractors = otherTerms.slice((index * 5) % Math.max(1, otherTerms.length))
      .concat(otherTerms)
      .map((candidate) => `${term.term} — ${candidate.def}`)

    pushRecall(
      {
        id: `${term.key}-name`,
        area: term.area,
        stem: `Which term is defined as: ${term.def}`,
        answer: term.term,
        distractors: termDistractors,
        explanation: `${term.term}: ${term.def}`,
        difficulty: "easy",
      },
      {
        id: `${term.key}-meaning`,
        area: term.area,
        stem: `Which definition correctly describes “${term.term}”?`,
        answer: term.def,
        distractors: definitionDistractors,
        explanation: `${term.term}: ${term.def}`,
        difficulty: "medium",
      },
      {
        id: `${term.key}-pair`,
        area: term.area,
        stem: `Which pairing correctly matches “${term.term}” to its meaning?`,
        answer: `${term.term} — ${term.def}`,
        distractors: pairingDistractors,
        explanation: `${term.term} is correctly paired with: ${term.def}`,
        difficulty: "medium",
      },
      {
        id: `${term.key}-review`,
        area: term.area,
        stem: `During a knowledge review, which statement about “${term.term}” should be retained?`,
        answer: term.def,
        distractors: definitionDistractors.slice(1).concat(definitionDistractors),
        explanation: `The accurate statement is: ${term.def}`,
        difficulty: "medium",
      },
      {
        id: `${term.key}-identify`,
        area: term.area,
        stem: `A scenario contains the following feature: “${term.def}” Which concept should the learner identify?`,
        answer: term.term,
        distractors: termDistractors.slice(2).concat(termDistractors),
        explanation: `That feature identifies ${term.term}.`,
        difficulty: "hard",
      },
      {
        id: `${term.key}-teach`,
        area: term.area,
        stem: `Which explanation would accurately teach a new learner the concept “${term.term}”?`,
        answer: term.def,
        distractors: definitionDistractors.slice(3).concat(definitionDistractors),
        explanation: `${term.term} means: ${term.def}`,
        difficulty: "easy",
      },
      {
        id: `${term.key}-label`,
        area: term.area,
        stem: `What is the most precise label for this syllabus description: “${term.def}”?`,
        answer: term.term,
        distractors: termDistractors.slice(3).concat(termDistractors),
        explanation: `The precise label is ${term.term}.`,
        difficulty: "medium",
      },
      {
        id: `${term.key}-advice`,
        area: term.area,
        stem: `Which concept should an adviser cite when explaining the following feature: “${term.def}”?`,
        answer: term.term,
        distractors: termDistractors.slice(4).concat(termDistractors),
        explanation: `${term.term} is the relevant concept: ${term.def}`,
        difficulty: "hard",
      },
      {
        id: `${term.key}-accuracy`,
        area: term.area,
        stem: `Which statement about “${term.term}” is technically accurate?`,
        answer: term.def,
        distractors: definitionDistractors.slice(4).concat(definitionDistractors),
        explanation: `The accurate statement is: ${term.def}`,
        difficulty: "hard",
      },
    )
  })

  traps.forEach((trap, index) => {
    const otherFixes = traps.filter((candidate) => candidate.fix !== trap.fix)
      .slice(index % Math.max(1, traps.length - 1))
      .concat(traps)
      .map((candidate) => candidate.fix)
    const otherTraps = traps.filter((candidate) => candidate.trap !== trap.trap)
      .slice((index * 3) % Math.max(1, traps.length - 1))
      .concat(traps)
      .map((candidate) => candidate.trap)
    pushRecall(
      {
        id: `${trap.key}-fix`,
        area: trap.area,
        stem: `A learner makes this exam mistake: “${trap.trap}” Which correction should they apply?`,
        answer: trap.fix,
        distractors: otherFixes,
        explanation: trap.fix,
        difficulty: "hard",
      },
      {
        id: `${trap.key}-spot`,
        area: trap.area,
        stem: `Which mistake is specifically prevented by this rule: “${trap.fix}”?`,
        answer: trap.trap,
        distractors: otherTraps,
        explanation: `The rule corrects this trap: ${trap.trap}`,
        difficulty: "hard",
      },
    )
  })

  const recaps = chapters.flatMap((chapter) =>
    chapter.summary.map((item, index) => ({ item, area: chapter.area, title: chapter.title, key: `${chapter.area}-recap-${index + 1}` })),
  )
  recaps.forEach((recap, index) => {
    const alternatives = recaps
      .filter((candidate) => candidate.item !== recap.item)
      .slice(index % Math.max(1, recaps.length - 1))
      .concat(recaps)
      .map((candidate) => candidate.item)
    pushRecall({
      id: `${recap.key}-apply`,
      area: recap.area,
      stem: `Which statement should be retained when reviewing ${recap.title.toLowerCase()}?`,
      answer: recap.item,
      distractors: alternatives,
      explanation: `The chapter recap states: ${recap.item}`,
      difficulty: "medium",
    })
    pushRecall({
      id: `${recap.key}-advise`,
      area: recap.area,
      stem: `An adviser is checking a conclusion about ${recap.title.toLowerCase()}. Which chapter principle provides the soundest basis?`,
      answer: recap.item,
      distractors: alternatives.slice(2).concat(alternatives),
      explanation: `The supported principle is: ${recap.item}`,
      difficulty: "hard",
    })
  })

  const outcomes = chapters.flatMap((chapter) =>
    chapter.outcomes.map((item, index) => ({ item, area: chapter.area, title: chapter.title, key: `${chapter.area}-outcome-${index + 1}` })),
  )
  outcomes.forEach((outcome, index) => {
    const alternatives = outcomes
      .filter((candidate) => candidate.item !== outcome.item)
      .slice((index * 2) % Math.max(1, outcomes.length - 1))
      .concat(outcomes)
      .map((candidate) => candidate.item)
    pushRecall({
      id: `${outcome.key}-skill`,
      area: outcome.area,
      stem: `Which capability is specifically developed in the ${outcome.title.toLowerCase()} study area?`,
      answer: outcome.item,
      distractors: alternatives,
      explanation: `The relevant capability is: ${outcome.item}`,
      difficulty: "hard",
    })
    pushRecall({
      id: `${outcome.key}-development`,
      area: outcome.area,
      stem: `Which learning objective best supports advanced work on ${outcome.title.toLowerCase()}?`,
      answer: outcome.item,
      distractors: alternatives.slice(1).concat(alternatives),
      explanation: `The applicable learning objective is: ${outcome.item}`,
      difficulty: "medium",
    })
  })

  chapters.forEach((chapter, index) => {
    const alternatives = chapters
      .filter((candidate) => candidate.intro !== chapter.intro)
      .slice(index)
      .concat(chapters)
      .map((candidate) => candidate.intro)
    pushRecall({
      id: `${chapter.area}-chapter-purpose`,
      area: chapter.area,
      stem: `Which statement best describes the purpose of the ${chapter.title.toLowerCase()} chapter?`,
      answer: chapter.intro,
      distractors: alternatives,
      explanation: chapter.intro,
      difficulty: "easy",
    })
  })

  const seenStems = new Set(authored.map((question) => question.stem.trim().toLowerCase()))
  const additions: AccaQuestion[] = []
  for (const seed of seeds) {
    const signature = seed.stem.trim().toLowerCase()
    if (seenStems.has(signature)) continue
    seenStems.add(signature)
    additions.push(choiceQuestion(paper, seed, additions.length))
    if (authored.length + additions.length === target) break
  }

  /*
   * A paper whose bank already MEETS its inventory target needs nothing from the
   * chapters, and one that overshoots is a good problem. Only a shortfall the
   * chapters cannot cover even with retrieval prompts is a real fault, because it
   * means the study text itself is too thin to revise from.
   */
  if (authored.length < target && authored.length + additions.length < target) {
    throw new Error(
      `${paper} has ${authored.length} bank + ${additions.length} study-derived items against a ${target} inventory; author more chapter source material`,
    )
  }
  return {
    authored: additions.filter((question) => !question.recall),
    drills: additions.filter((question) => question.recall),
  }
}
