import InfoPageLayout, { type InfoSection } from "@/components/info-page-layout"
import { useLanguage } from "@/i18n/LanguageProvider"

interface PageContent {
  title: string
  intro: string
  updated: string
  sections: InfoSection[]
}

const en: PageContent = {
  title: "Terms of Service",
  updated: "August 7, 2026",
  intro:
    "These terms are the agreement between you and Scholify. By creating an account or using the app, you agree to them. We have kept them as plain and short as we can.",
  sections: [
    {
      heading: "Using Scholify",
      body: [
        "Scholify gives you tools to set learning goals, follow study plans, keep streaks, and get coaching from Charles, our AI race engineer.",
        "You must be at least 13 years old to use Scholify. If you use it on behalf of an organization, you confirm you are authorized to accept these terms for them.",
      ],
    },
    {
      heading: "Your account",
      body: [
        "You are responsible for keeping your login details secure and for activity that happens under your account.",
        "Please give us accurate information when you sign up, and let us know promptly if you suspect any unauthorized use.",
      ],
    },
    {
      heading: "Subscriptions and billing",
      body: [
        "Onboarding, diagnosis and your personalised plan are free. Pro may include a 3-day trial after you add a payment method at checkout. Unless you cancel before the trial deadline shown by Stripe, the selected subscription starts automatically when the trial ends.",
        "Beginner subscriptions start billing at checkout. Paid subscriptions renew automatically until cancelled. You can cancel from account settings; access continues until the end of the current paid or trial period.",
        "Fees already paid are non-refundable, including for part-used billing periods and for periods you do not use after cancelling. Cancelling stops future renewals; it does not refund the current period. Nothing here limits rights you have under mandatory consumer law in your country, which apply regardless of this clause.",
        "Prices may change, and we will give you notice before any change affects you.",
      ],
    },
    {
      heading: "Acceptable use",
      body: [
        "Please do not misuse Scholify: no attempting to break or overload the service, no reverse engineering, no using it for unlawful purposes, and no abusive behavior toward our team or other users.",
        "We may suspend or close accounts that break these rules.",
      ],
    },
    {
      heading: "AI guidance from Charles",
      body: [
        "Charles is a fictional Scholify AI race engineer. His suggestions, explanations, and study plans are meant to help you learn, but they can be incomplete or wrong.",
        "Charles does not provide professional, medical, legal, or financial advice. Always use your own judgment for important decisions.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "Scholify, including its design, content, and software, belongs to us and is protected by law.",
        "The learning content and notes you create remain yours. By using the app, you give us permission to store and process them so we can provide the service to you.",
      ],
    },
    {
      heading: "Disclaimers and liability",
      body: [
        "Scholify is provided \"as is.\" We work hard to keep it running well, but we cannot guarantee it will always be available or error-free.",
        "To the extent the law allows, Scholify is not liable for indirect or incidental damages arising from your use of the app.",
      ],
    },
    {
      heading: "Changes and contact",
      body: [
        "We may update these terms as Scholify grows. We will notify you of significant changes in the app or by email, and the date above shows the latest version.",
        "Questions about these terms? Email support@scholifyapp.com.",
      ],
    },
  ],
}

const ru: PageContent = {
  title: "Условия использования",
  updated: "7 августа 2026",
  intro:
    "Эти условия — соглашение между вами и Scholify. Создавая аккаунт или пользуясь приложением, вы соглашаетесь с ними. Мы постарались сделать их максимально простыми и короткими.",
  sections: [
    {
      heading: "Использование Scholify",
      body: [
        "Scholify даёт вам инструменты, чтобы ставить учебные цели, следовать планам занятий, поддерживать серии и получать наставничество от Чарльза — нашего ИИ-партнёра по обучению.",
        "Чтобы пользоваться Scholify, вам должно быть не менее 13 лет. Если вы используете его от имени организации, вы подтверждаете, что уполномочены принять эти условия за неё.",
      ],
    },
    {
      heading: "Ваш аккаунт",
      body: [
        "Вы несёте ответственность за сохранность данных для входа и за действия, совершаемые под вашим аккаунтом.",
        "Пожалуйста, указывайте достоверные данные при регистрации и сразу сообщайте нам, если подозреваете несанкционированный доступ.",
      ],
    },
    {
      heading: "Подписки и оплата",
      body: [
        "Регистрация, диагностика и персональный план бесплатны. Pro может включать 3-дневный пробный период после добавления способа оплаты в Stripe. Если вы не отмените подписку до указанного срока, выбранный тариф начнёт действовать автоматически после окончания пробного периода.",
        "Тариф Beginner оплачивается сразу при оформлении. Платные подписки продлеваются автоматически до отмены. Отменить подписку можно в настройках аккаунта; доступ сохранится до конца оплаченного или пробного периода.",
        "Если иное не требуется законом, уже уплаченные суммы возврату не подлежат. Цены могут меняться, и мы уведомим вас до того, как изменение вас коснётся.",
      ],
    },
    {
      heading: "Допустимое использование",
      body: [
        "Пожалуйста, не злоупотребляйте Scholify: не пытайтесь взломать или перегрузить сервис, не занимайтесь обратной разработкой, не используйте его в противоправных целях и не допускайте оскорбительного поведения по отношению к нашей команде или другим пользователям.",
        "Мы можем приостановить или закрыть аккаунты, нарушающие эти правила.",
      ],
    },
    {
      heading: "Рекомендации ИИ от Чарльза",
      body: [
        "Чарльз — это ИИ-партнёр по обучению. Его советы, объяснения и планы занятий призваны помочь вам учиться, но они могут быть неполными или ошибочными.",
        "Чарльз не предоставляет профессиональных, медицинских, юридических или финансовых консультаций. В важных решениях всегда полагайтесь на собственное суждение.",
      ],
    },
    {
      heading: "Интеллектуальная собственность",
      body: [
        "Scholify, включая его дизайн, контент и программное обеспечение, принадлежит нам и защищён законом.",
        "Учебный контент и заметки, которые вы создаёте, остаются вашими. Пользуясь приложением, вы даёте нам разрешение хранить и обрабатывать их, чтобы мы могли предоставлять вам сервис.",
      ],
    },
    {
      heading: "Оговорки и ответственность",
      body: [
        "Scholify предоставляется «как есть». Мы прилагаем все усилия, чтобы он работал хорошо, но не можем гарантировать его постоянную доступность или отсутствие ошибок.",
        "В пределах, допустимых законом, Scholify не несёт ответственности за косвенный или случайный ущерб, возникший в связи с использованием приложения.",
      ],
    },
    {
      heading: "Изменения и контакты",
      body: [
        "Мы можем обновлять эти условия по мере развития Scholify. О существенных изменениях мы уведомим вас в приложении или по электронной почте, а дата выше показывает последнюю версию.",
        "Вопросы по этим условиям? Пишите на support@scholifyapp.com.",
      ],
    },
  ],
}

export default function Terms() {
  const { lang } = useLanguage()
  const c = lang === "ru" ? ru : en
  return (
    <InfoPageLayout title={c.title} intro={c.intro} updated={c.updated} sections={c.sections} />
  )
}
