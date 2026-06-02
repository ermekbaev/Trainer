// Static language packs (ru / en) for the public site.
// Admin edits only the RU-side editable fields (hero, prices, spots, media,
// transformations, feed) — those override the values below at render time.

export type Lang = "ru" | "en";

export const I18N = {
  ru: {
    nav: { about: "Тренер", services: "Программы", pricing: "Тарифы", method: "Метод", faq: "FAQ", contact: "Контакты" },
    hero: {
      eyebrow: "Персональный тренинг · Бишкек / Online",
      title: ["Сила", "не находится.", "Её", "выковывают."],
      sub: "Я — начинающий тренер. Через неделю заканчиваю 240-часовой курс и беру первых пять подопечных по интро-цене.",
      cta: "Записаться на пробную",
      meta: "Первая тренировка — бесплатно, 60 мин",
    },
    stats: [
      { n: 5, suf: "", label: "Мест в первой группе — все свободны" },
      { n: 240, suf: " ч", label: "Пройдено по курсу персонального тренера" },
      { n: 6, suf: " лет", label: "Собственных тренировок в зале" },
      { n: 12, suf: " нед", label: "Длина полного цикла программы" },
    ],
    about: {
      kicker: "01 — Тренер",
      title: "Канатбеков Эрбол",
      role: "Персональный тренер. Курс 240 ч. — диплом совсем скоро.",
      bio: [
        "Бишкек, 22 года. Шесть лет тренируюсь сам — приседаю 180, тяну 220, жму 130. Не чемпион. Но в зале знаю каждую штангу.",
        "В прошлом году решил, что хочу делать это для других. Пошёл на 240-часовой курс персонального тренера — диплом через неделю. Ищу первых пятерых подопечных.",
        "Что обещаю сейчас — полное внимание, программу под тебя и работу честно. Чего не обещаю — фоток с двадцатью клиентами, которых у меня пока нет.",
      ],
      creds: ["Курс 240 ч.", "First Aid", "6 лет личных тренировок"],
    },
    services: {
      kicker: "02 — Программы",
      title: "Три формата.\nОдин стандарт внимания.",
      items: [
        { tag: "Flagship", title: "Personal 1-на-1", body: "Зал, рядом со мной. Программа, питание, восстановление, еженедельная корректировка.", meta: "3 × нед · от 12 нед", price: "60 000 с / мес" },
        { tag: "Online", title: "Online-coaching", body: "Полное сопровождение удалённо. Видео-разбор техники, чат в Telegram, корректировки каждое воскресенье.", meta: "из любой точки", price: "25 000 с / мес" },
        { tag: "Hybrid", title: "Hybrid Pro", body: "Две очные сессии в месяц + online-программа. Для тех, кто часто в разъездах.", meta: "2 + online", price: "40 000 с / мес" },
      ],
    },
    pricing: {
      kicker: "03 — Тарифы",
      title: "Интро-цены\nдля первых пятерых.",
      plans: [
        { name: "Starter", price: "25 000", per: "с / мес", desc: "Online-программа, обратная связь раз в неделю.", features: ["Индивидуальная программа", "Чат в Telegram", "Видео-разбор техники"], cta: "Начать" },
        { name: "Signature", price: "60 000", per: "с / мес", desc: "Личные тренировки 3 раза в неделю.", features: ["Тренировки 3 × нед", "Шаблон питания", "Замеры и фото-контроль", "Отвечаю в течение дня"], cta: "Записаться", featured: true },
        { name: "Founder", price: "40 000", per: "с / мес", desc: "Hybrid: 2 очные + online. Цена закрепляется навсегда.", features: ["2 очных × мес", "Online в будни", "Цена не вырастет никогда"], cta: "Обсудить" },
      ],
    },
    results: {
      kicker: "04 — Метод",
      title: "Три принципа,\nна которых стоит всё.",
      items: [
        { n: "01", t: "Прогрессия", b: "Каждый подход записывается. Прогресс — в цифрах, а не в «вроде стал больше». Без прибавки веса или повторов в неделю — меняем входные.", kpi: "+1–3%\nв неделю" },
        { n: "02", t: "Техника", b: "Движение важнее веса. Никаких кривых спин, проваленных колен, резких рывков. Снимаем видео каждый рабочий сет в базовых.", kpi: "RPE 7–9\nне выше" },
        { n: "03", t: "Восстановление", b: "Сон, питание, разгрузочные недели каждые 4–6. Ты не растёшь от тренировки. Ты растёшь после неё.", kpi: "7–9 ч\nсна" },
      ],
    },
    program: {
      kicker: "05 — Неделя",
      title: "Так выглядит\nтипичная неделя.",
      days: [
        { d: "Пн", f: "Грудь · Трицепс", vol: "24 подхода", dur: "75 мин" },
        { d: "Вт", f: "Спина · Бицепс", vol: "26 подходов", dur: "80 мин" },
        { d: "Ср", f: "Восстановление", vol: "мобилити + сауна", dur: "45 мин" },
        { d: "Чт", f: "Ноги · Квадрицепс", vol: "22 подхода", dur: "90 мин" },
        { d: "Пт", f: "Плечи · Кор", vol: "20 подходов", dur: "70 мин" },
        { d: "Сб", f: "Ноги · Бицепс бедра", vol: "18 подходов", dur: "75 мин" },
        { d: "Вс", f: "Off · Walk 10k", vol: "—", dur: "low" },
      ],
    },
    testimonials: {
      kicker: "06 — Первая группа",
      title: "Пять мест.\nПервые подопечные.",
      sub: "Это честно: отзывов у меня пока нет — потому что нет клиентов. Но есть пять мест в первой группе и кое-что, что ты получишь, если придёшь первым:",
      perks: [
        { k: "A", t: "Цена навсегда", b: "Сколько бы ни росли тарифы через год или пять — у тебя остаётся интро-цена." },
        { k: "B", t: "Максимум внимания", b: "Пока подопечных мало — ты вовлечёшь меня в твой процесс полностью. Отвечаю в течение часа." },
        { k: "C", t: "Пример в портфолио", b: "Твой результат (с разрешения) станет одним из первых кейсов на этом сайте." },
        { k: "D", t: "Прямая обратная связь", b: "Раз в месяц — 30 мин звонок, где мы вместе смотрим на программу и решаем, что меняем в следующем блоке." },
      ],
      cta: "Занять место",
      counter: "осталось",
    },
    faq: {
      kicker: "07 — FAQ",
      title: "Частые вопросы",
      items: [
        { q: "Ты же только отучился. Почему я должен идти к тебе?", a: "Хороший вопрос. У меня нет двухсот клиентов и десяти лет стажа. Есть: 6 лет собственного тренинга, 240 часов методики и обещание полного внимания, пока подопечных мало. Если хочешь готовый бренд — иди к кому-то старше. Если готов начать со мной — место есть." },
        { q: "Что входит в пробную тренировку?", a: "Часовая сессия в зале: оценка подвижности, разбор техники в базовых движениях и разговор про цели. По итогам присылаю план первой недели на email или в Telegram." },
        { q: "Я никогда не тренировался. Подойдёт?", a: "Да, и я буду рад. Первые 4–6 недель — техника и адаптация связок, без героизма. С нуля даже проще: не приходится переучивать кривую технику." },
        { q: "Можно ли заниматься онлайн, если я не в Бишкеке?", a: "Да. Нужен зал с базовым оборудованием и смартфон для записи подходов. Обратная связь по Telegram в течение дня." },
        { q: "Питание входит в стоимость?", a: "Шаблон питания — да. Глубокий нутрициологический план я пока не беру: без отдельной квалификации было бы нечестно. При необходимости порекомендую коллег." },
        { q: "Что я получу за 12 недель?", a: "Честно: процесс, дисциплину и план, основанный на доказанных принципах. Цифры зависят от твоей стартовой точки, восстановления и питания. Если ищешь «минус 15 кг за месяц» — я не тот тренер." },
      ],
    },
    contact: { kicker: "08 — Заявка", title: "Пробная тренировка", sub: "Заполни — свяжусь в течение дня.", name: "Имя", phone: "Телефон", goal: "Цель", goals: ["Набор массы", "Сжигание жира", "Силовые показатели", "Просто привести себя в форму"], submit: "Отправить заявку", privacy: "Нажимая «Отправить», ты соглашаешься на обработку данных." },
    insta: { kicker: "09 — @erbol.kanatbekov", title: "В ленте", cta: "Подписаться" },
    footer: { tagline: "Strength is crafted.", rights: "© Эрбол Канатбеков. Все права защищены." },
    book: "Записаться",
    play: "Смотреть промо · 0:42",
  },
  en: {
    nav: { about: "Coach", services: "Programs", pricing: "Pricing", method: "Method", faq: "FAQ", contact: "Contact" },
    hero: {
      eyebrow: "Personal training · Bishkek / Online",
      title: ["Strength", "is not found.", "It is", "forged."],
      sub: "I’m a new coach. In a week I finish a 240-hour personal training course and take on my first five clients at founders’ pricing.",
      cta: "Book a trial session",
      meta: "First session free · 60 min",
    },
    stats: [
      { n: 5, suf: "", label: "Spots in the first cohort — all open" },
      { n: 240, suf: " hrs", label: "Hours of coursework completed" },
      { n: 6, suf: " yrs", label: "Of training myself in the gym" },
      { n: 12, suf: " wks", label: "Length of a full program cycle" },
    ],
    about: {
      kicker: "01 — The Coach",
      title: "Erbol Kanatbekov",
      role: "Personal trainer. 240-hour course — diploma very soon.",
      bio: [
        "Bishkek, 22. Six years training myself — squat 180, deadlift 220, bench 130. Not a champion. But I know every barbell in the room.",
        "Last year I decided I wanted to do this for other people. Took the 240-hour personal training course — diploma in a week. Looking for my first five clients.",
        "What I can promise right now — full attention, a program built for you, and an honest workrate. What I cannot promise — photos with twenty clients I do not yet have.",
      ],
      creds: ["Course 240 h", "First Aid", "6 years of personal training"],
    },
    services: {
      kicker: "02 — Programs",
      title: "Three formats.\nOne standard of attention.",
      items: [
        { tag: "Flagship", title: "Personal 1-on-1", body: "In the gym, next to you. Programming, nutrition template, recovery, weekly recalibration.", meta: "3 × per week · from 12 wks", price: "KGS 60,000 / mo" },
        { tag: "Online", title: "Online coaching", body: "Full remote support. Video form reviews, Telegram chat, weekly Sunday updates.", meta: "anywhere", price: "KGS 25,000 / mo" },
        { tag: "Hybrid", title: "Hybrid Pro", body: "Two in-person sessions a month + online programming. For frequent travellers.", meta: "2 + online", price: "KGS 40,000 / mo" },
      ],
    },
    pricing: {
      kicker: "03 — Pricing",
      title: "Intro pricing\nfor the first five.",
      plans: [
        { name: "Starter", price: "25,000", per: "KGS / mo", desc: "Online program with weekly check-ins.", features: ["Custom program", "Telegram chat", "Video form review"], cta: "Start" },
        { name: "Signature", price: "60,000", per: "KGS / mo", desc: "In-person training, three times a week.", features: ["3 × per week", "Nutrition template", "Measurements & photo log", "Reply within the day"], cta: "Book", featured: true },
        { name: "Founder", price: "40,000", per: "KGS / mo", desc: "Hybrid: 2 in-person + online. Price locked for life.", features: ["2 in-person / mo", "Online on weekdays", "Price never goes up"], cta: "Discuss" },
      ],
    },
    results: {
      kicker: "04 — Method",
      title: "Three principles\nthe whole thing rests on.",
      items: [
        { n: "01", t: "Progression", b: "Every working set is logged. Progress is measured in numbers, not in “I think I’m bigger.” When weight or reps stop moving for a week — we change inputs.", kpi: "+1–3%\nper week" },
        { n: "02", t: "Technique", b: "The movement matters more than the load. No collapsed backs, no caving knees, no jerky reps. We film every working set on the main lifts.", kpi: "RPE 7–9\nnever above" },
        { n: "03", t: "Recovery", b: "Sleep, nutrition, deload weeks every 4–6. You don’t grow from training. You grow after it.", kpi: "7–9 hrs\nsleep" },
      ],
    },
    program: {
      kicker: "05 — The Week",
      title: "What a typical\nweek looks like.",
      days: [
        { d: "Mon", f: "Chest · Triceps", vol: "24 sets", dur: "75 min" },
        { d: "Tue", f: "Back · Biceps", vol: "26 sets", dur: "80 min" },
        { d: "Wed", f: "Recovery", vol: "mobility + sauna", dur: "45 min" },
        { d: "Thu", f: "Legs · Quad", vol: "22 sets", dur: "90 min" },
        { d: "Fri", f: "Shoulders · Core", vol: "20 sets", dur: "70 min" },
        { d: "Sat", f: "Legs · Hamstring", vol: "18 sets", dur: "75 min" },
        { d: "Sun", f: "Off · Walk 10k", vol: "—", dur: "low" },
      ],
    },
    testimonials: {
      kicker: "06 — First cohort",
      title: "Five spots.\nThe founding clients.",
      sub: "Honest part: I don’t have testimonials yet — because I don’t have clients. What I do have is five spots in the first cohort, and a few things you get if you come in first:",
      perks: [
        { k: "A", t: "Price for life", b: "However tariffs grow in a year or five — yours stays at the intro rate." },
        { k: "B", t: "Maximum attention", b: "While the roster is small, you have all of me. I answer within an hour." },
        { k: "C", t: "A case in the portfolio", b: "With your permission, your result becomes one of the first cases on this site." },
        { k: "D", t: "Direct feedback loop", b: "Once a month — a 30 min call where we look at the program together and decide what to change." },
      ],
      cta: "Claim a spot",
      counter: "left",
    },
    faq: {
      kicker: "07 — FAQ",
      title: "Frequent questions",
      items: [
        { q: "You just finished training. Why should I work with you?", a: "Fair question. I don’t have two hundred clients or ten years on the floor. What I have: six years of personal training, 240 hours of coursework, and the promise of full attention while the roster is small. If you want a brand — work with someone older. If you’re ready to start with me — there’s a spot." },
        { q: "What does the trial session include?", a: "One hour in the gym: mobility screen, technique on the main lifts, a goal conversation. You leave with a first-week plan in your inbox or Telegram." },
        { q: "I have never trained. Is it for me?", a: "Yes, and I’ll be glad. The first 4–6 weeks are pure technique and tendon adaptation, no heroics. Starting from zero is actually easier — there’s nothing to unlearn." },
        { q: "Can I train online if I’m not in Bishkek?", a: "Yes. You need a gym with basic equipment and a phone to film working sets. I reply on Telegram within the day." },
        { q: "Is nutrition included?", a: "A template, yes. A deep nutrition plan I don’t take on yet — doing so without a separate qualification would be dishonest. I can refer you to colleagues." },
        { q: "What will I get in 12 weeks?", a: "Honestly: process, discipline and a plan grounded in proven principles. The numbers depend on your starting point, recovery and nutrition. If you’re looking for “−15 kg in a month” — I’m not the coach." },
      ],
    },
    contact: { kicker: "08 — Apply", title: "Trial session", sub: "Fill this in — I get back within the day.", name: "Name", phone: "Phone", goal: "Goal", goals: ["Build muscle", "Lose fat", "Strength", "Get into shape"], submit: "Send application", privacy: "By submitting you agree to data processing." },
    insta: { kicker: "09 — @erbol.kanatbekov", title: "On the feed", cta: "Follow" },
    footer: { tagline: "Strength is crafted.", rights: "© Erbol Kanatbekov. All rights reserved." },
    book: "Book",
    play: "Watch promo · 0:42",
  },
} as const;
