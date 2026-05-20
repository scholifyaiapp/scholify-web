import InfoPageLayout, { type InfoSection } from "@/components/info-page-layout"
import { useLanguage } from "@/i18n/LanguageProvider"

interface PageContent {
  title: string
  intro: string
  updated: string
  sections: InfoSection[]
}

const en: PageContent = {
  title: "Support",
  updated: "May 20, 2026",
  intro:
    "Stuck on something, or just have a question? We are here to help you keep your learning streak alive. Here is how to get answers fast.",
  sections: [
    {
      heading: "Email us",
      body: [
        "The quickest way to reach a human is email: support@scholify.app.",
        "We answer most messages within 24 hours on weekdays. Tell us your account email and what is happening, and we will jump in.",
      ],
    },
    {
      heading: "Ask Lara first",
      body: [
        "For questions about your study plan, streaks, or how a feature works, Lara — your in-app AI partner — can often help you right away, any time of day.",
      ],
    },
    {
      heading: "Common questions",
      body: [
        "Lost your streak? Life Shields automatically protect your streak when you miss a day, so a single slip never sends you back to zero.",
        "Need to change your plan? Open Settings to adjust your goal, daily minutes, or deadline, and Lara will rebuild your plan around it.",
        "Billing or subscription help? Manage or cancel your plan in account settings, or email us and we will sort it out.",
        "Forgot your password? Use the \"Forgot password\" link on the sign-in page to reset it.",
      ],
    },
    {
      heading: "Report a bug or suggest a feature",
      body: [
        "Found something broken, or have an idea that would make Scholify better? Email support@scholify.app with the details — screenshots help a lot. Your feedback genuinely shapes what we build next.",
      ],
    },
    {
      heading: "Account and data requests",
      body: [
        "To export your data or delete your account, email us from your registered address and we will take care of it. See our Privacy Policy for more on how your data is handled.",
      ],
    },
  ],
}

const ru: PageContent = {
  title: "Поддержка",
  updated: "20 мая 2026",
  intro:
    "Застряли на чём-то или просто есть вопрос? Мы здесь, чтобы помочь вам сохранить вашу серию обучения. Вот как быстро получить ответы.",
  sections: [
    {
      heading: "Напишите нам",
      body: [
        "Быстрее всего связаться с человеком по электронной почте: support@scholify.app.",
        "В будни мы отвечаем на большинство сообщений в течение 24 часов. Укажите email вашего аккаунта и опишите, что происходит, — и мы подключимся.",
      ],
    },
    {
      heading: "Сначала спросите Лару",
      body: [
        "По вопросам о вашем плане занятий, сериях или о том, как работает та или иная функция, Лара — ваш ИИ-партнёр прямо в приложении — часто может помочь сразу же, в любое время суток.",
      ],
    },
    {
      heading: "Частые вопросы",
      body: [
        "Потеряли серию? Щиты жизни автоматически защищают вашу серию при пропуске дня, поэтому одна осечка никогда не отбрасывает вас к нулю.",
        "Нужно изменить план? Откройте «Настройки», чтобы изменить цель, ежедневные минуты или срок, — и Лара перестроит ваш план.",
        "Вопросы по оплате или подписке? Управляйте тарифом или отмените его в настройках аккаунта либо напишите нам, и мы всё уладим.",
        "Забыли пароль? Воспользуйтесь ссылкой «Забыли пароль?» на странице входа, чтобы сбросить его.",
      ],
    },
    {
      heading: "Сообщить об ошибке или предложить функцию",
      body: [
        "Нашли что-то сломанное или есть идея, которая сделает Scholify лучше? Напишите на support@scholify.app с подробностями — скриншоты очень помогают. Ваши отзывы по-настоящему определяют, что мы создадим дальше.",
      ],
    },
    {
      heading: "Запросы по аккаунту и данным",
      body: [
        "Чтобы экспортировать ваши данные или удалить аккаунт, напишите нам с зарегистрированного адреса, и мы всё сделаем. Подробнее об обращении с вашими данными — в нашей Политике конфиденциальности.",
      ],
    },
  ],
}

export default function Support() {
  const { lang } = useLanguage()
  const c = lang === "ru" ? ru : en
  return (
    <InfoPageLayout title={c.title} intro={c.intro} updated={c.updated} sections={c.sections} />
  )
}
