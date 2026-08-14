import InfoPageLayout, { type InfoSection } from "@/components/info-page-layout"
import { useLanguage } from "@/i18n/LanguageProvider"

interface PageContent {
  title: string
  intro: string
  updated: string
  sections: InfoSection[]
}

const en: PageContent = {
  title: "Privacy Policy",
  updated: "August 14, 2026",
  intro:
    "Scholify helps you prepare for the ACCA exams. To do that well, we collect a small amount of information about you and how you use the app. This page explains exactly what we collect, why, and the control you have over it.",
  sections: [
    {
      heading: "Information we collect",
      body: [
        "Account details: your name and email address when you create an account. Authentication is handled by Supabase; Scholify does not receive or store your readable password.",
        "Learning data: the papers and exam dates you set, your study plans, answers, mock results, streaks and readiness scores — this is what powers your personalized experience.",
        "Conversations with Charles: messages you exchange with your AI race engineer, so he can give you relevant, continuous support.",
        "Usage and device data: product events, pages and features used, app version, and device or browser type. We use this to operate Scholify, understand conversion and improve the product.",
        "Billing data: Stripe processes your payment method and subscription. Scholify receives identifiers, plan and subscription status, but not your complete card number.",
        "Optional integrations: if you connect Google Calendar, we process the authorization tokens and calendar settings needed to provide synchronization until you disconnect it.",
      ],
    },
    {
      heading: "How we use your information",
      body: [
        "To build your study plans, track progress, and personalize Charles's coaching.",
        "To keep your account secure and to provide customer support when you need it.",
        "To understand which features help people learn, so we can make Scholify better.",
        "To protect one learner's record from account sharing, a new sign-in can replace older login sessions. Anyone holding your credentials could otherwise see and change your answers, notes, mock results, AI conversations and account settings, so you should never share your password.",
        "We do not sell your personal data. Ever.",
      ],
    },
    {
      heading: "How we share information",
      body: [
        "We share data only with service providers needed to run Scholify, including Supabase for authentication and data, Vercel for hosting, Stripe for billing, PostHog for product analytics, Resend for email, Google when you enable Calendar, and the configured AI provider for Charles. Their handling is governed by their service terms and our configuration.",
        "We may disclose information if required by law, or to protect the safety and rights of our users.",
      ],
    },
    {
      heading: "Data security",
      body: [
        "We use industry-standard encryption in transit and at rest. No system is perfectly secure, but we work hard to protect your data and to limit who on our team can access it.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "You can view and edit your account information at any time inside the app.",
        "You can export study data and delete your account from Settings. You may also request help, a copy, correction or deletion by emailing support@scholifyapp.com.",
      ],
    },
    {
      heading: "Children's privacy",
      body: [
        "Scholify is not directed to children under 13. If you believe a child has provided us personal information, contact us and we will remove it.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: [
        "We may update this policy as Scholify evolves. When we make significant changes, we will notify you in the app or by email. The date above always reflects the latest version.",
      ],
    },
  ],
}

const ru: PageContent = {
  title: "Политика конфиденциальности",
  updated: "14 августа 2026",
  intro:
    "Scholify помогает готовиться к экзаменам ACCA. Чтобы делать это хорошо, мы собираем небольшой объём информации о вас и о том, как вы пользуетесь приложением. На этой странице подробно описано, что именно мы собираем, зачем и как вы можете этим управлять.",
  sections: [
    {
      heading: "Какие данные мы собираем",
      body: [
        "Данные аккаунта: ваше имя и адрес электронной почты. Аутентификацию обрабатывает Supabase; Scholify не получает и не хранит ваш пароль в читаемом виде.",
        "Данные об обучении: выбранные экзамены и их даты, планы занятий, ответы, результаты пробных экзаменов, серии и показатели готовности — именно это обеспечивает персональный опыт.",
        "Разговоры с Чарльзом: сообщения, которыми вы обмениваетесь с ИИ-помощником, чтобы он мог давать актуальную поддержку.",
        "Данные об использовании и устройстве: события продукта, посещённые страницы и функции, версия приложения, тип устройства или браузера. Мы используем их для работы и улучшения Scholify.",
        "Платёжные данные: Stripe обрабатывает способ оплаты и подписку. Scholify получает идентификаторы, тариф и статус подписки, но не полный номер карты.",
        "Дополнительные интеграции: если вы подключаете Google Календарь, мы обрабатываем токены авторизации и настройки, необходимые для синхронизации, пока вы её не отключите.",
      ],
    },
    {
      heading: "Как мы используем вашу информацию",
      body: [
        "Чтобы составлять ваши планы занятий, отслеживать серии и персонализировать наставничество Чарльза.",
          "Чтобы защищать ваш аккаунт и оказывать поддержку, когда она вам нужна.",
          "Чтобы понимать, какие функции помогают людям учиться, и делать Scholify лучше.",
          "Чтобы защитить учебную историю одного человека от совместного использования аккаунта, новый вход может завершить предыдущие сессии. Любой, у кого есть ваши данные для входа, сможет увидеть и изменить ответы, заметки, результаты пробных экзаменов, разговоры с ИИ и настройки аккаунта, поэтому никому не сообщайте пароль.",
          "Мы не продаём ваши персональные данные. Никогда.",
      ],
    },
    {
      heading: "Как мы передаём информацию",
      body: [
        "Мы передаём данные только сервисам, необходимым для работы Scholify: Supabase для аккаунтов и данных, Vercel для хостинга, Stripe для оплаты, PostHog для аналитики, Resend для писем, Google при подключении Календаря и настроенному ИИ-провайдеру для Чарльза.",
        "Мы можем раскрыть информацию, если этого требует закон, или для защиты безопасности и прав наших пользователей.",
      ],
    },
    {
      heading: "Безопасность данных",
      body: [
        "Мы используем стандартное для отрасли шифрование при передаче и при хранении. Ни одна система не является идеально защищённой, но мы прилагаем все усилия, чтобы защитить ваши данные и ограничить доступ к ним внутри команды.",
      ],
    },
    {
      heading: "Ваши права",
      body: [
        "Вы можете просматривать и изменять данные своего аккаунта в любое время прямо в приложении.",
        "Вы можете экспортировать учебные данные и удалить аккаунт в Настройках. Также можно запросить помощь, копию, исправление или удаление данных по адресу support@scholifyapp.com.",
      ],
    },
    {
      heading: "Конфиденциальность детей",
      body: [
        "Scholify не предназначен для детей младше 13 лет. Если вы считаете, что ребёнок предоставил нам персональные данные, свяжитесь с нами, и мы их удалим.",
      ],
    },
    {
      heading: "Изменения в этой политике",
      body: [
        "Мы можем обновлять эту политику по мере развития Scholify. При существенных изменениях мы уведомим вас в приложении или по электронной почте. Дата выше всегда отражает последнюю версию.",
      ],
    },
  ],
}

export default function Privacy() {
  const { lang } = useLanguage()
  const c = lang === "ru" ? ru : en
  return (
    <InfoPageLayout title={c.title} intro={c.intro} updated={c.updated} sections={c.sections} />
  )
}
