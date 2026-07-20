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
  updated: "May 20, 2026",
  intro:
    "Scholify helps you prepare for the ACCA exams. To do that well, we collect a small amount of information about you and how you use the app. This page explains exactly what we collect, why, and the control you have over it.",
  sections: [
    {
      heading: "Information we collect",
      body: [
        "Account details: your name, email address, and password (stored encrypted) when you create an account.",
        "Learning data: the papers and exam dates you set, your study plans, answers, mock results, streaks and readiness scores — this is what powers your personalized experience.",
        "Conversations with Charles: messages you exchange with your AI race engineer, so he can give you relevant, continuous support.",
        "Usage and device data: basic analytics such as which features you use, app version, and device type, used only to improve Scholify.",
      ],
    },
    {
      heading: "How we use your information",
      body: [
        "To build your study plans, track progress, and personalize Charles's coaching.",
        "To keep your account secure and to provide customer support when you need it.",
        "To understand which features help people learn, so we can make Scholify better.",
        "We do not sell your personal data. Ever.",
      ],
    },
    {
      heading: "How we share information",
      body: [
        "We share data only with trusted service providers who help us run Scholify — for example, cloud hosting and the AI provider that powers Charles. They may only use it to deliver their service to us.",
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
        "You can request a copy of your data, or ask us to delete your account and associated data, by emailing support@scholifyapp.com.",
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
  updated: "20 мая 2026",
  intro:
    "Scholify помогает готовиться к экзаменам ACCA. Чтобы делать это хорошо, мы собираем небольшой объём информации о вас и о том, как вы пользуетесь приложением. На этой странице подробно описано, что именно мы собираем, зачем и как вы можете этим управлять.",
  sections: [
    {
      heading: "Какие данные мы собираем",
      body: [
        "Данные аккаунта: ваше имя, адрес электронной почты и пароль (хранится в зашифрованном виде) при создании аккаунта.",
        "Данные об обучении: выбранные экзамены и их даты, планы занятий, ответы, результаты пробных экзаменов, серии и показатели готовности — именно это обеспечивает персональный опыт.",
        "Разговоры с Ларой: сообщения, которыми вы обмениваетесь с вашим ИИ-партнёром по обучению, чтобы она могла давать актуальную и постоянную поддержку.",
        "Данные об использовании и устройстве: базовая аналитика — какими функциями вы пользуетесь, версия приложения и тип устройства — используется только для улучшения Scholify.",
      ],
    },
    {
      heading: "Как мы используем вашу информацию",
      body: [
        "Чтобы составлять ваши планы занятий, отслеживать серии и персонализировать наставничество Лары.",
        "Чтобы защищать ваш аккаунт и оказывать поддержку, когда она вам нужна.",
        "Чтобы понимать, какие функции помогают людям учиться, и делать Scholify лучше.",
        "Мы не продаём ваши персональные данные. Никогда.",
      ],
    },
    {
      heading: "Как мы передаём информацию",
      body: [
        "Мы передаём данные только проверенным поставщикам услуг, которые помогают нам обеспечивать работу Scholify — например, облачному хостингу и ИИ-провайдеру, на котором работает Лара. Они могут использовать данные только для оказания своих услуг нам.",
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
        "Вы можете запросить копию своих данных или попросить удалить аккаунт и связанные с ним данные, написав на support@scholifyapp.com.",
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
