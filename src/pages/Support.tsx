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
        "The quickest way to reach a human is email: support@scholifyapp.com.",
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
        "Lost your streak? A streak counts the consecutive days you answer questions — miss a day and it restarts, but every answer, readiness score and mock result you have earned is kept.",
        "Need to change your plan? Open Settings to adjust your goal, daily minutes, or deadline, and Lara will rebuild your plan around it.",
        "Billing or subscription help? Manage or cancel your plan in account settings, or email us and we will sort it out.",
        "Forgot your password? Click \"Forgot password?\" on the sign-in page and we will email you a reset link. Open it and you are signed in — then set a new password under Settings → Account.",
      ],
    },
    {
      heading: "Report a bug or suggest a feature",
      body: [
        "Found something broken, or have an idea that would make Scholify better? Email support@scholifyapp.com with the details — screenshots help a lot. Your feedback genuinely shapes what we build next.",
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
        "Быстрее всего связаться с человеком по электронной почте: support@scholifyapp.com.",
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
        "Потеряли серию? Серия — это подряд идущие дни, когда вы отвечали на вопросы: пропустили день — счёт начинается заново, но все ваши ответы, показатели готовности и результаты пробных экзаменов сохраняются.",
        "Нужно изменить план? Откройте «Настройки», чтобы изменить цель, ежедневные минуты или срок, — и Лара перестроит ваш план.",
        "Вопросы по оплате или подписке? Управляйте тарифом или отмените его в настройках аккаунта либо напишите нам, и мы всё уладим.",
        "Забыли пароль? Нажмите «Забыли пароль?» на странице входа — мы пришлём ссылку для сброса. Откройте её, и вы войдёте в аккаунт; затем задайте новый пароль в «Настройки → Аккаунт».",
      ],
    },
    {
      heading: "Сообщить об ошибке или предложить функцию",
      body: [
        "Нашли что-то сломанное или есть идея, которая сделает Scholify лучше? Напишите на support@scholifyapp.com с подробностями — скриншоты очень помогают. Ваши отзывы по-настоящему определяют, что мы создадим дальше.",
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
