/*
 * Русский словарь маркетинговых страниц (лендинг, прайсинг, футер).
 *
 * Keys are the EXACT English runtime strings passed to t("…") on the landing
 * surfaces; values are the Russian copy. The app itself stays English — ACCA is
 * examined in English, so the STUDY content must be English; this dictionary is
 * the door in for the RU/CIS market, not a translation of the course.
 *
 * Rules used throughout: brand and exam terms stay untranslated (Scholify,
 * Charles, ACCA, Pro, Beginner, paper codes BT…AAA); prices unchanged; «вы» —
 * professional, not familiar. The completeness test (ru-dictionary.test.ts)
 * fails the build if a t("…") string on a landing surface has no entry here,
 * so the two can't silently drift.
 */
export const RU: Record<string, string> = {
  // ── Nav & CTAs ──
  "Features": "Возможности",
  "How it works": "Как это работает",
  "Pricing": "Тарифы",
  "Partners": "Партнёрам",
  "Sign in": "Войти",
  "Start for free": "Начать бесплатно",
  "Start free": "Начать бесплатно",
  "Start": "Начать",
  "Next": "Далее",
  "Back to Scholify": "Назад в Scholify",
  "Back to top": "Наверх",
  "Footer": "Подвал",

  // ── Hero ──
  "From the F1 to ACCA member.": "От первого экзамена — до члена ACCA.",
  "Meet Charles": "Знакомьтесь: Charles",
  "— your AI race engineer for ACCA": "— ваш AI-инженер по подготовке к ACCA",
  "Scholify shows you where marks were lost, builds a focused daily comeback plan, and keeps adjusting it toward your next sitting.":
    "Scholify показывает, где вы теряете баллы, строит ежедневный план восстановления и постоянно подстраивает его под вашу следующую сессию.",
  "Scholify performance telemetry": "Телеметрия Scholify",
  "expert-written questions": "вопросов от экспертов",
  "flashcards": "карточек",
  "ACCA papers": "экзаменов ACCA",
  "Free to start": "Бесплатный старт",
  "Start. Pass. Repeat.": "Начал. Сдал. Повторил.",
  "Until you're ACCA.": "Пока вы не станете ACCA.",

  // ── Pass-rate section ──
  "Half of ACCA candidates fail each sitting.": "Половина кандидатов ACCA проваливает каждую сессию.",
  "Scholify exists to put you in the other half.": "Scholify существует, чтобы вы были в другой половине.",
  "pass a typical Applied Skills exam. The difference isn't brains — it's practice, fast feedback, and a plan. Scholify is all three.":
    "сдают типичный экзамен Applied Skills. Дело не в способностях — дело в практике, быстрой обратной связи и плане. Scholify — это всё три сразу.",
  "average pass rate on Applied Skills exams": "средний процент сдачи экзаменов Applied Skills",
  "Published ACCA global pass rates": "Официальная мировая статистика ACCA",
  "exams to qualify — one system for all of them": "экзаменов до квалификации — одна система для всех",
  "BT to Strategic Professional": "От BT до Strategic Professional",
  "written practice tasks with examiner rubrics": "письменных заданий с критериями экзаменатора",
  "Built into the AI Examiner": "Встроено в AI-экзаменатора",

  // ── How it works demo ──
  "HOW IT WORKS": "КАК ЭТО РАБОТАЕТ",
  "A plan built from your real constraints": "План, построенный из ваших реальных возможностей",
  "YOUR GOAL": "ВАША ЦЕЛЬ",
  "Pass FR (F7) in": "Сдать FR (F7) за",
  "days": "дней",
  "min/day": "мин/день",
  "Charles is reading your telemetry…": "Charles читает вашу телеметрию…",
  "PLAN READY": "ПЛАН ГОТОВ",
  "YOUR ANSWER": "ВАШ ОТВЕТ",
  "MARKED IN SECONDS": "ПРОВЕРЕНО ЗА СЕКУНДЫ",
  "YOUR MARK": "ВАША ОЦЕНКА",
  "A human marker takes days. Charles takes seconds.": "Человек проверяет днями. Charles — за секунды.",
  "YOUR AI PARTNER · ONLINE": "ВАШ AI-ПАРТНЁР · ОНЛАЙН",
  "Meet Charles, your race engineer.": "Знакомьтесь: Charles, ваш гоночный инженер.",
  "Your AI race engineer. He knows your papers, readiness and today's strategy — every explanation is shaped around your telemetry.":
    "Ваш AI-инженер. Он знает ваши экзамены, готовность и сегодняшнюю стратегию — каждое объяснение строится вокруг вашей телеметрии.",
  "typing…": "печатает…",
  "Week": "Неделя",
  "LAST 30 DAYS": "ПОСЛЕДНИЕ 30 ДНЕЙ",
  "Share": "Поделиться",
  "STORY · 1080×1920": "STORY · 1080×1920",
  "Day": "День",
  "Still here.": "Всё ещё здесь.",

  // ── Features ──
  "FEATURES": "ВОЗМОЖНОСТИ",
  "Everything you need to pass — in one place.": "Всё, что нужно для сдачи, — в одном месте.",
  "BUILT FOR EVERY PAPER": "ДЛЯ КАЖДОГО ЭКЗАМЕНА",
  "Six tools that": "Шесть инструментов, которые",
  "get you exam-ready.": "готовят вас к экзамену.",
  "Swipe through the deck — every card is a real piece of how the app works.":
    "Листайте колоду — каждая карточка показывает, как приложение работает на самом деле.",
  "DRAG TO SWIPE · LEFT OR RIGHT": "ЛИСТАЙТЕ ВЛЕВО ИЛИ ВПРАВО",
  "AI PRACTICE": "AI-ПРАКТИКА",

  // ── Full qualification ──
  "THE FULL QUALIFICATION": "ВСЯ КВАЛИФИКАЦИЯ",
  "Fifteen papers.": "Пятнадцать экзаменов.",
  "One roadmap.": "Один маршрут.",
  "Expert-written question banks for every Applied Knowledge and Applied Skills exam. Unlimited AI practice across all fifteen papers. One roadmap that follows you from your first exam to full ACCA membership.":
    "Банки вопросов от экспертов для каждого экзамена Applied Knowledge и Applied Skills. Безлимитная AI-практика по всем пятнадцати экзаменам. Один маршрут — от первого экзамена до полного членства в ACCA.",
  "TAP ANY PAPER TO START FREE": "НАЖМИТЕ НА ЛЮБОЙ ЭКЗАМЕН — НАЧНИТЕ БЕСПЛАТНО",
  "THE FULL ROUTE TO THOSE LETTERS": "ПОЛНЫЙ ПУТЬ К ЗАВЕТНЫМ БУКВАМ",
  "Passing every paper is most of it — but not all of it. Membership needs three things, and Scholify tracks all three.":
    "Сдать все экзамены — это большая часть пути, но не весь путь. Для членства нужны три вещи, и Scholify отслеживает все три.",
  "The letters after your name. Scholify takes you to the exams; it tracks the other two the whole way.":
    "Буквы после вашего имени. Scholify ведёт вас к экзаменам и отслеживает остальные два условия на всём пути.",
  "WHERE THE ROADMAP LEADS": "КУДА ВЕДЁТ МАРШРУТ",
  "Every paper closes with": "Каждый экзамен завершается",
  "a real document.": "настоящим документом.",
  "ACCA issues the certificate. Scholify gets you there.": "Сертификат выдаёт ACCA. Scholify доводит вас до него.",
  "Your qualification.folder": "Ваша квалификация.folder",
  "Drag any card down to close": "Потяните карточку вниз, чтобы закрыть",

  // ── 2027 redesign ──
  "OFFICIAL · THE 2027 REDESIGN": "ОФИЦИАЛЬНО · РЕФОРМА 2027",
  "The next roadmap.": "Следующий маршрут.",
  "From 2027.": "С 2027 года.",
  "ACCA relaunches the qualification in 2027: four levels, new exam names, and a brand-new Data Science option. Your current passes carry across — and Scholify will support the new structure from day one.":
    "В 2027 году ACCA перезапускает квалификацию: четыре уровня, новые названия экзаменов и новая опция Data Science. Ваши текущие сдачи засчитываются — а Scholify поддержит новую структуру с первого дня.",
  "SOURCE: ACCAGLOBAL.COM · FIRST EXAMS JULY–SEPTEMBER 2027 · CURRENT PASSES CARRY TRANSITION CREDIT":
    "ИСТОЧНИК: ACCAGLOBAL.COM · ПЕРВЫЕ ЭКЗАМЕНЫ ИЮЛЬ–СЕНТЯБРЬ 2027 · ТЕКУЩИЕ СДАЧИ ЗАСЧИТЫВАЮТСЯ",

  // ── Transformation ──
  "THE TRANSFORMATION": "ТРАНСФОРМАЦИЯ",
  "You're not just passing exams.": "Вы не просто сдаёте экзамены.",
  "You're becoming an ACCA member.": "Вы становитесь членом ACCA.",
  "Drag the slider — see what 60 days of Scholify actually changes.":
    "Потяните ползунок — посмотрите, что реально меняют 60 дней со Scholify.",
  "BEFORE SCHOLIFY": "ДО SCHOLIFY",
  "AFTER SCHOLIFY": "ПОСЛЕ SCHOLIFY",
  "A student before using Scholify — distracted, surrounded by unfinished courses and unused notebooks.":
    "Студент до Scholify — рассеян, вокруг незаконченные курсы и пустые конспекты.",
  "A student after 60 days of Scholify — focused, organized, on a streak.":
    "Студент после 60 дней со Scholify — собран, организован, держит серию.",

  // ── ROI ──
  "THE ROI": "ВЫГОДА",
  "Same destination.": "Та же цель.",
  "A fraction of the cost.": "В разы дешевле.",
  "Tuition centres charge €390–730 per paper. Scholify Pro costs less per month than one hour with a tutor — for every paper, every mode, every day.":
    "Учебные центры берут €390–730 за один экзамен. Scholify Pro стоит в месяц меньше, чем час с репетитором, — и это все экзамены, все режимы, каждый день.",
  "MARKET RATES: PUBLISHED ONLINE-COURSE PRICES PER PAPER (CIS TUITION CENTRES, 2026) AND TYPICAL ON-DEMAND COURSE PRICING. SCHOLIFY: PRO AT $14.99/MO OR $119.99/YR. EXAM ENTRY FEES PAYABLE TO ACCA ARE SEPARATE EVERYWHERE.":
    "РЫНОЧНЫЕ ЦЕНЫ: ОПУБЛИКОВАННЫЕ ЦЕНЫ ОНЛАЙН-КУРСОВ ЗА ЭКЗАМЕН (УЧЕБНЫЕ ЦЕНТРЫ СНГ, 2026). SCHOLIFY: PRO — $14.99/МЕС ИЛИ $119.99/ГОД. ЭКЗАМЕНАЦИОННЫЕ ВЗНОСЫ ACCA ОПЛАЧИВАЮТСЯ ОТДЕЛЬНО ВЕЗДЕ.",
  "YOUR NUMBERS": "ВАШИ ЦИФРЫ",
  "Drag the sliders to your reality.": "Настройте ползунки под свою реальность.",
  "Papers left to pass": "Осталось сдать экзаменов",
  "Course price per paper (your local rate)": "Цена курса за экзамен (ваша местная ставка)",
  "Months you study per paper": "Месяцев подготовки на экзамен",
  "mo": "мес",
  "YOU KEEP": "ВЫ СОХРАНЯЕТЕ",
  "kept in your pocket on the way to the same letters.": "остаются у вас на пути к тем же буквам.",
  "Tuition-centre route": "Через учебный центр",
  "Scholify Pro route": "Через Scholify Pro",
  "Keep the difference — start free": "Сохраните разницу — начните бесплатно",
  "Scholify at €14/mo (Pro monthly; annual is cheaper still). ACCA exam entry fees are separate on every route.":
    "Scholify — €14/мес (Pro помесячно; годовой ещё дешевле). Экзаменационные взносы ACCA оплачиваются отдельно на любом маршруте.",

  // ── Why ACCA ──
  "WHY ACCA": "ПОЧЕМУ ACCA",
  "The qualification is the hard part.": "Квалификация — это сложная часть.",
  "We handle that.": "Её мы берём на себя.",
  "A few reasons candidates put in the work.": "Несколько причин, ради которых кандидаты вкладываются.",

  // ── Pricing ──
  "PRICING": "ТАРИФЫ",
  "Start free.": "Начните бесплатно.",
  "Upgrade when you're ready.": "Апгрейд — когда будете готовы.",
  "Build your plan free. Pro starts with 3 free days. Annual saves 33%.":
    "Постройте план бесплатно. Pro начинается с 3 бесплатных дней. Годовой тариф экономит 33%.",
  "Beginner": "Beginner",
  "Pro": "Pro",
  "Choose Beginner": "Выбрать Beginner",
  "Choose Pro": "Выбрать Pro",
  "WHAT'S INCLUDED": "ЧТО ВХОДИТ",
  "Every paper. Every mode.": "Каждый экзамен. Каждый режим.",
  "The Pro trial unlocks all 15 papers, mocks, the AI Examiner and custom AI practice for 3 days.":
    "Пробный Pro открывает все 15 экзаменов, пробные экзамены, AI-экзаменатора и персональную AI-практику на 3 дня.",
  "ACCOUNT & SESSION PRIVACY": "АККАУНТ И ПРИВАТНОСТЬ СЕССИЙ",
  "One learner. One private account.": "Один учащийся. Один личный аккаунт.",
  "Every Scholify plan — including Beginner and Pro, monthly or annual — is licensed to one learner. You can switch devices, but only one login stays active. A new sign-in ends older sessions to protect your answers, mock results, study history and billing access.":
    "Каждый тариф Scholify — включая Beginner и Pro, помесячно или на год — лицензируется на одного учащегося. Можно менять устройства, но активен только один вход. Новый вход завершает предыдущие сессии, защищая ваши ответы, результаты пробных экзаменов, историю обучения и доступ к оплате.",
  "No charge today on Pro. Cancel during the 3-day trial and pay nothing.":
    "Pro — без списаний сегодня. Отмените в течение 3-дневного пробного периода и не платите ничего.",
  "Monthly": "Помесячно",
  "Yearly": "На год",
  "/month": "/мес",
  "Popular": "Популярный",

  // ── Partner programme ──
  "PARTNER PROGRAMME": "ПАРТНЁРСКАЯ ПРОГРАММА",
  "Share the plan.": "Делитесь планом.",
  "Grow the earning window.": "Расширяйте окно заработка.",
  "The rate stays simple at 27%. Performance unlocks more monthly payments for every new learner you bring: one at launch, three from learner 300, and five from learner 600.":
    "Ставка проста — 27%. Результат открывает больше ежемесячных выплат за каждого приведённого учащегося: одна на старте, три — с 300-го учащегося, пять — с 600-го.",
  "Preview commission tiers": "Посмотреть уровни комиссии",
  "Explore the partner programme": "Узнать о партнёрской программе",
  "Free to apply · First valid partner wins · Self-referrals excluded":
    "Заявка бесплатна · Засчитывается первый партнёр · Самореферальство исключено",
  "HOW THE MILESTONE WORKS": "КАК РАБОТАЕТ РУБЕЖ",
  "The 300th learner starts a three-payment window; the 600th starts a five-payment window. The upgrade applies prospectively, so earlier referrals keep the window recorded when they first paid.":
    "300-й учащийся открывает окно в три выплаты; 600-й — в пять. Апгрейд действует на будущее: за ранними рефералами сохраняется окно, зафиксированное при их первой оплате.",
  "Partner programme — earn 27% for up to 5 payments": "Партнёрская программа — 27% с до 5 платежей",

  // ── Final CTA ──
  "Then the next one.": "Потом следующий.",
  "Pass this paper.": "Сдайте этот экзамен.",
  "Start prepping — free": "Начать подготовку — бесплатно",
  "Free diagnosis · 3 free days on Pro · Cancel anytime":
    "Бесплатная диагностика · 3 бесплатных дня Pro · Отмена в любой момент",

  // ── Mobile ──
  "MOBILE — COMING SOON": "МОБИЛЬНОЕ ПРИЛОЖЕНИЕ — СКОРО",
  "Your study plan.": "Ваш план подготовки.",
  "Now in your pocket.": "Теперь в кармане.",
  "Practice, review and keep your exam-day momentum wherever the day takes you. Your progress stays in sync across web and mobile.":
    "Практикуйтесь, повторяйте и держите темп подготовки, где бы вы ни были. Прогресс синхронизируется между веб-версией и мобильной.",
  "Coming soon": "Скоро",
  "iOS & Android": "iOS и Android",
  "The Scholify mobile experience is coming to iOS and Android, with your progress in sync across web and mobile.":
    "Мобильный Scholify выходит на iOS и Android — с синхронизацией прогресса между веб-версией и мобильной.",
  "Runs in any browser — install it to your home screen from your browser menu.":
    "Работает в любом браузере — добавьте на главный экран через меню браузера.",

  // ── Voice / misc ──
  "Talk with Charles": "Поговорить с Charles",
  "Last updated": "Обновлено",
  "Questions? Email us at": "Вопросы? Напишите нам:",

  // ── The method / loop ──
  "Diagnostic": "Диагностика",
  "~15 min → your Readiness Score, area by area.": "~15 минут → ваш показатель готовности по каждой теме.",
  "Roadmap": "Маршрут",
  "Four phases, dated back from exam day.": "Четыре фазы, рассчитанные от дня экзамена.",
  "Daily mission": "Дневная миссия",
  "Three tasks a day, chosen for you.": "Три задания в день, подобранные для вас.",
  "Progress check": "Контроль прогресса",
  "Every answer moves your Readiness Score.": "Каждый ответ двигает ваш показатель готовности.",
  "The 60% gate": "Порог 60%",
  "Mocks unlock only when you're ready.": "Пробные экзамены открываются, только когда вы готовы.",
  "Mock 1 → 2 → 3": "Пробный 1 → 2 → 3",
  "Timed, no hints — proven under exam conditions.": "На время, без подсказок — проверено в экзаменационных условиях.",
  "The real exam": "Настоящий экзамен",
  "You walk in rehearsed. It's a repeat of your mocks.": "Вы приходите отрепетированным. Это повтор ваших пробных.",
  "Recovery run": "Восстановительный круг",
  "Missed it? Import your mark — we win the lost marks back.": "Не сдали? Загрузите результат — вернём потерянные баллы.",
  "THE METHOD": "МЕТОД",
  "One closed loop —": "Один замкнутый цикл —",
  "until you pass": "пока вы не сдадите",
  "Not a question bank you wander through — a GPS. Every action feeds a learner model that hands you the next best task. No \"finished\" until you pass.":
    "Не банк вопросов, по которому вы блуждаете, а GPS. Каждое действие питает модель учащегося, которая выдаёт следующее лучшее задание. «Готово» не существует, пока вы не сдали.",
  "OF": "ИЗ",
  "STAGE": "ЭТАП",
  "Tap any stage to read it": "Нажмите на этап, чтобы прочитать",
  "THE PROMISE": "ОБЕЩАНИЕ",
  "Fail a sitting and it's a stage, not an ending.": "Провал сессии — это этап, а не конец.",
  "You'll see exactly where marks were lost. The model recalibrates, the plan rebuilds — targeted drills, a fresh mock, then the retake from strength.":
    "Вы увидите, где именно потеряны баллы. Модель перекалибруется, план перестраивается — точечные тренировки, новый пробный экзамен и пересдача с позиции силы.",
  "Enter the loop — free": "Войти в цикл — бесплатно",
  "REPEATS FOR EVERY PAPER": "ПОВТОРЯЕТСЯ ДЛЯ КАЖДОГО ЭКЗАМЕНА",
  "HOW SCHOLIFY WORKS": "КАК РАБОТАЕТ SCHOLIFY",
  "Five stages,": "Пять этапов,",
  "one loop.": "один цикл.",
  "Onboarding happens once. The four stages after it run again for every paper you sit.":
    "Настройка проходит один раз. Четыре следующих этапа повторяются для каждого экзамена.",
  "Tap a stage to see what it does": "Нажмите на этап, чтобы увидеть, что он делает",

  // ── A day, actual size ──
  "ONE DAY, ACTUAL SIZE": "ОДИН ДЕНЬ, В НАТУРАЛЬНУЮ ВЕЛИЧИНУ",
  "A 50-minute day looks like this": "Вот как выглядит день на 50 минут",
  "MIN": "МИН",
  "A 50-minute day, split into five blocks": "50-минутный день из пяти блоков",
  "START": "СТАРТ",
  "DONE FOR THE DAY": "НА СЕГОДНЯ ВСЁ",
  "min": "мин",
  "Then it closes. Tomorrow's plan is visible but locked until your study time — because rest is part of the plan.":
    "Затем день закрывается. Завтрашний план виден, но закрыт до вашего времени занятий — потому что отдых тоже часть плана.",

  // ── Compounding ──
  "THE COMPOUNDING RUN": "ЭФФЕКТ НАКОПЛЕНИЯ",
  "“Tiny changes, remarkable results.”": "«Маленькие изменения — выдающиеся результаты».",
  "JAMES CLEAR · ATOMIC HABITS": "ДЖЕЙМС КЛИР · «АТОМНЫЕ ПРИВЫЧКИ»",
  "90 minutes, six evenings a week": "90 минут, шесть вечеров в неделю",
  "Whenever there's time": "Когда будет время",
  "ACCA PASS · 50%": "СДАЧА ACCA · 50%",
  "DAY": "ДЕНЬ",
  "DAY 1": "ДЕНЬ 1",
  "evenings": "вечеров",
  "h a week": "ч в неделю",
  "BT is about": "BT — это примерно",
  "hours": "часов",
  "DAYS": "ДНЕЙ",

  // ── Mission / founder ──
  "OUR MISSION": "НАША МИССИЯ",
  "Make a professional qualification": "Сделать профессиональную квалификацию",
  "reachable": "достижимой",
  "from anywhere.": "из любой точки мира.",
  "Founder & CEO": "Основатель и CEO",
  "of Scholify": "Scholify",
  "WHY WE BUILT IT": "ЗАЧЕМ МЫ ЭТО ПОСТРОИЛИ",
  "Three reasons": "Три причины,",
  "Scholify exists": "почему Scholify существует",
  "Not features. The three problems it was built to solve.": "Не список функций — три проблемы, ради которых он создан.",

  // ── Feature card labels ──
  "15 ACCA Papers": "15 экзаменов ACCA",
  "Charles · AI Race Engineer": "Charles · AI-инженер",
  "AI Examiner": "AI-экзаменатор",
  "Daily Goal & Streak": "Дневная цель и серия",
  "Timed Mocks": "Пробные экзамены на время",

  // ── Footer ──
  "Follow Scholify": "Scholify в соцсетях",
  "Crafted for learners by": "Создано для учащихся командой",
}
