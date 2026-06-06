import type { NewWordInput } from "@/lib/vocab"

/*
 * Language options + offline seed decks.
 *
 * Seeds let the product work end-to-end with zero API keys (demo mode) and give
 * brand-new learners instant content. Real, themed, level-appropriate words come
 * from the AI generator (vocab-api.ts) when ANTHROPIC_API_KEY is configured.
 */

export interface LanguageOption {
  code: string
  label: string
  flag: string
}

export const TARGET_LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "it", label: "Italian", flag: "🇮🇹" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "de", label: "German", flag: "🇩🇪" },
]

export const NATIVE_LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ru", label: "Russian", flag: "🇷🇺" },
  { code: "uz", label: "Uzbek", flag: "🇺🇿" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
]

export function languageLabel(code: string): string {
  return (
    TARGET_LANGUAGES.find((l) => l.code === code)?.label ||
    NATIVE_LANGUAGES.find((l) => l.code === code)?.label ||
    code
  )
}

export function languageFlag(code: string): string {
  return (
    TARGET_LANGUAGES.find((l) => l.code === code)?.flag ||
    NATIVE_LANGUAGES.find((l) => l.code === code)?.flag ||
    "🌐"
  )
}

type Seed = NewWordInput

/* SEEDS[targetLang][nativeLang] */
const SEEDS: Record<string, Record<string, Seed[]>> = {
  // Career / business English explained in Russian — the launch wedge.
  en: {
    ru: [
      { term: "deadline", translation: "крайний срок", example: "We must meet the deadline.", exampleTranslation: "Мы должны уложиться в срок.", theme: "Work" },
      { term: "meeting", translation: "встреча, совещание", example: "Let's schedule a meeting.", exampleTranslation: "Давайте назначим встречу.", theme: "Work" },
      { term: "deliverable", translation: "результат работы", example: "The deliverable is due Friday.", exampleTranslation: "Результат нужно сдать в пятницу.", theme: "Work" },
      { term: "stakeholder", translation: "заинтересованная сторона", example: "Update the stakeholders.", exampleTranslation: "Сообщите заинтересованным сторонам.", theme: "Work" },
      { term: "revenue", translation: "выручка, доход", example: "Revenue grew this quarter.", exampleTranslation: "Выручка выросла в этом квартале.", theme: "Business" },
      { term: "negotiate", translation: "вести переговоры", example: "We need to negotiate the price.", exampleTranslation: "Нам нужно обсудить цену.", theme: "Business" },
      { term: "proposal", translation: "предложение", example: "I sent the proposal.", exampleTranslation: "Я отправил предложение.", theme: "Business" },
      { term: "feedback", translation: "обратная связь", example: "Thanks for the feedback.", exampleTranslation: "Спасибо за обратную связь.", theme: "Work" },
      { term: "budget", translation: "бюджет", example: "The budget is tight.", exampleTranslation: "Бюджет ограничен.", theme: "Business" },
      { term: "client", translation: "клиент", example: "The client approved it.", exampleTranslation: "Клиент это одобрил.", theme: "Business" },
      { term: "requirement", translation: "требование", example: "List the requirements.", exampleTranslation: "Перечислите требования.", theme: "Work" },
      { term: "milestone", translation: "этап, веха", example: "We hit a milestone.", exampleTranslation: "Мы достигли важного этапа.", theme: "Work" },
      { term: "remote", translation: "удалённый", example: "I work remote.", exampleTranslation: "Я работаю удалённо.", theme: "Work" },
      { term: "interview", translation: "собеседование", example: "I have an interview tomorrow.", exampleTranslation: "У меня завтра собеседование.", theme: "Career" },
      { term: "resume", translation: "резюме", example: "Update your resume.", exampleTranslation: "Обновите своё резюме.", theme: "Career" },
      { term: "salary", translation: "зарплата", example: "Negotiate your salary.", exampleTranslation: "Обсудите свою зарплату.", theme: "Career" },
      { term: "promotion", translation: "повышение", example: "She got a promotion.", exampleTranslation: "Её повысили.", theme: "Career" },
      { term: "colleague", translation: "коллега", example: "My colleague helped me.", exampleTranslation: "Мой коллега мне помог.", theme: "Work" },
      { term: "report", translation: "отчёт", example: "Send me the report.", exampleTranslation: "Пришлите мне отчёт.", theme: "Work" },
      { term: "achievement", translation: "достижение", example: "That's a great achievement.", exampleTranslation: "Это большое достижение.", theme: "Career" },
    ],
  },
  es: {
    en: [
      { term: "hola", translation: "hello", example: "¡Hola! ¿Cómo estás?", theme: "Basics" },
      { term: "gracias", translation: "thank you", example: "Muchas gracias.", theme: "Basics" },
      { term: "por favor", translation: "please", theme: "Basics" },
      { term: "sí", translation: "yes", theme: "Basics" },
      { term: "no", translation: "no", theme: "Basics" },
      { term: "buenos días", translation: "good morning", theme: "Basics" },
      { term: "agua", translation: "water", example: "Un vaso de agua, por favor.", theme: "Food" },
      { term: "comer", translation: "to eat", example: "Quiero comer.", theme: "Food" },
      { term: "casa", translation: "house", example: "Mi casa es grande.", theme: "Home" },
      { term: "amigo", translation: "friend", example: "Es mi amigo.", theme: "People" },
      { term: "hoy", translation: "today", theme: "Time" },
      { term: "bien", translation: "well, good", example: "Estoy bien.", theme: "Basics" },
      { term: "perdón", translation: "sorry, excuse me", theme: "Basics" },
      { term: "¿dónde?", translation: "where?", example: "¿Dónde está el baño?", theme: "Basics" },
    ],
  },
  it: {
    en: [
      { term: "ciao", translation: "hi, bye", example: "Ciao, come stai?", theme: "Basics" },
      { term: "grazie", translation: "thank you", example: "Grazie mille!", theme: "Basics" },
      { term: "prego", translation: "you're welcome", theme: "Basics" },
      { term: "buongiorno", translation: "good morning", theme: "Basics" },
      { term: "sì", translation: "yes", theme: "Basics" },
      { term: "no", translation: "no", theme: "Basics" },
      { term: "per favore", translation: "please", theme: "Basics" },
      { term: "acqua", translation: "water", example: "Un bicchiere d'acqua.", theme: "Food" },
      { term: "mangiare", translation: "to eat", example: "Voglio mangiare.", theme: "Food" },
      { term: "casa", translation: "house, home", example: "La mia casa.", theme: "Home" },
      { term: "amico", translation: "friend", theme: "People" },
      { term: "oggi", translation: "today", theme: "Time" },
      { term: "bene", translation: "well, good", example: "Sto bene.", theme: "Basics" },
      { term: "scusa", translation: "sorry, excuse me", theme: "Basics" },
    ],
  },
  fr: {
    en: [
      { term: "bonjour", translation: "hello, good day", theme: "Basics" },
      { term: "merci", translation: "thank you", example: "Merci beaucoup.", theme: "Basics" },
      { term: "s'il vous plaît", translation: "please", theme: "Basics" },
      { term: "oui", translation: "yes", theme: "Basics" },
      { term: "non", translation: "no", theme: "Basics" },
      { term: "eau", translation: "water", example: "Un verre d'eau.", theme: "Food" },
      { term: "manger", translation: "to eat", example: "Je veux manger.", theme: "Food" },
      { term: "maison", translation: "house", theme: "Home" },
      { term: "ami", translation: "friend", theme: "People" },
      { term: "aujourd'hui", translation: "today", theme: "Time" },
      { term: "bien", translation: "well, good", example: "Ça va bien.", theme: "Basics" },
      { term: "pardon", translation: "sorry, excuse me", theme: "Basics" },
    ],
  },
  de: {
    en: [
      { term: "hallo", translation: "hello", theme: "Basics" },
      { term: "danke", translation: "thank you", example: "Danke schön!", theme: "Basics" },
      { term: "bitte", translation: "please, you're welcome", theme: "Basics" },
      { term: "ja", translation: "yes", theme: "Basics" },
      { term: "nein", translation: "no", theme: "Basics" },
      { term: "Wasser", translation: "water", example: "Ein Glas Wasser.", theme: "Food" },
      { term: "essen", translation: "to eat", example: "Ich möchte essen.", theme: "Food" },
      { term: "Haus", translation: "house", theme: "Home" },
      { term: "Freund", translation: "friend", theme: "People" },
      { term: "heute", translation: "today", theme: "Time" },
      { term: "gut", translation: "good", example: "Mir geht es gut.", theme: "Basics" },
      { term: "Entschuldigung", translation: "sorry, excuse me", theme: "Basics" },
    ],
  },
}

export function hasSeed(target: string, native: string): boolean {
  return (SEEDS[target]?.[native]?.length ?? 0) > 0
}

/**
 * Offline starter words for a language pair. Falls back to the English-native
 * deck for a target language when the exact native pairing has no seed yet.
 */
export function getSeedWords(target: string, native: string, count = 12): NewWordInput[] {
  const exact = SEEDS[target]?.[native]
  const fallback = SEEDS[target]?.en
  const list = exact && exact.length > 0 ? exact : fallback || []
  return list.slice(0, count)
}
