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
  updated: "May 20, 2026",
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
        "Scholify offers free and paid plans. Paid plans renew automatically until you cancel, and you can cancel at any time from your account settings.",
        "Unless required by law, fees already paid are non-refundable. Prices may change, and we will give you notice before any change affects you.",
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
  updated: "20 мая 2026",
  intro:
    "Эти условия — соглашение между вами и Scholify. Создавая аккаунт или пользуясь приложением, вы соглашаетесь с ними. Мы постарались сделать их максимально простыми и короткими.",
  sections: [
    {
      heading: "Использование Scholify",
      body: [
        "Scholify даёт вам инструменты, чтобы ставить учебные цели, следовать планам занятий, поддерживать серии и получать наставничество от Лары — нашего ИИ-партнёра по обучению.",
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
        "Scholify предлагает бесплатный и платные тарифы. Платные тарифы продлеваются автоматически до отмены, и вы можете отменить их в любой момент в настройках аккаунта.",
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
      heading: "Рекомендации ИИ от Лары",
      body: [
        "Лара — это ИИ-партнёр по обучению. Её советы, объяснения и планы занятий призваны помочь вам учиться, но они могут быть неполными или ошибочными.",
        "Лара не предоставляет профессиональных, медицинских, юридических или финансовых консультаций. В важных решениях всегда полагайтесь на собственное суждение.",
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
