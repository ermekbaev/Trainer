# Iron — лендинг персонального тренера (Next.js)

Перенос статического лендинга (`../trainer`) на **Next.js 16 + Prisma (Postgres) + NextAuth v5**
с полноценной админкой: тренер сам меняет фото/видео, кейсы «до/после», тексты, цены и
число свободных мест — изменения сразу видят все посетители.

## Стек

- **Next.js 16** (App Router, Server Actions)
- **Prisma 6** + **PostgreSQL** (деплой: Railway)
- **NextAuth v5** (Credentials, защита `/admin`)
- Загрузка медиа в `public/uploads` (см. примечание про Railway ниже)

## Что редактируется из админки (`/admin`)

| Раздел | Что меняется |
|---|---|
| **Настройки** | свободные места (0–5), вкл/выкл секций «Видео» и «До/После», акцентный цвет, цены, тексты Hero, портрет, промо-видео |
| **До / После** | кейсы трансформаций: фото «до» и «после», имя, период, вес, порядок, публикация |
| **Лента** | плитки галереи: изображение, заголовок, подпись |
| **Заявки** | заявки с формы записи — отметка «обработана», удаление |

## Локальный запуск

```bash
npm install

# 1. Заполнить .env (скопировать из .env.example)
cp .env.example .env
#    DATABASE_URL  — строка подключения Postgres (можно сразу из Railway)
#    AUTH_SECRET   — npx auth secret
#    ADMIN_EMAIL / ADMIN_PASSWORD — первый вход в админку

# 2. Применить схему к БД и создать админа + демо-данные
npm run db:push      # или: npm run db:migrate
npm run db:seed

# 3. Запуск
npm run dev          # http://localhost:3000  → сайт
                     # http://localhost:3000/admin → панель
```

> Без подключения к БД сайт всё равно открывается — показываются значения по
> умолчанию (try/catch в `lib/site-data.ts`). Админка требует рабочую БД.

## Деплой на Railway

1. Создать проект на Railway, добавить **PostgreSQL** (плагин даёт `DATABASE_URL`).
2. Задеплоить этот репозиторий как сервис. Переменные окружения:
   - `DATABASE_URL` — из плагина Postgres (Reference Variable)
   - `AUTH_SECRET` — длинная случайная строка
   - `AUTH_URL` — публичный домен сервиса (`https://<app>.up.railway.app`)
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`
3. Команда сборки: `npm run build`; старт: `npm start`.
4. Один раз применить схему и сиды (Railway shell или локально с тем же `DATABASE_URL`):
   ```bash
   npx prisma migrate deploy
   npm run db:seed
   ```

### ⚠️ Про загрузку файлов на Railway

Сейчас медиа сохраняются в `public/uploads` на диске контейнера. На Railway файловая
система **эфемерна** — при каждом редеплое загруженные файлы пропадут. Варианты:

- **Railway Volume** — примонтировать том к пути загрузок (простое решение для диплома).
- **Облачное хранилище** (Cloudinary / S3 / UploadThing) — заменить запись в
  `app/api/upload/route.ts` на загрузку в облако и вернуть внешний URL. Остальной код
  трогать не нужно — он работает с любым URL.

## Структура

```
app/
  page.tsx              сайт (server) → тянет настройки/кейсы/ленту из БД
  layout.tsx            подключение шрифтов
  api/
    auth/[...nextauth]  NextAuth
    bookings            POST заявка (публично) / GET список (админ)
    upload              POST загрузка файла (админ)
  admin/
    layout.tsx          сайдбар + guard
    page.tsx            настройки
    transformations/    CRUD «до/после»
    feed/               CRUD ленты
    bookings/           заявки
    login/              вход
    actions.ts          server actions (все мутации)
components/
  site/                 Landing + примитивы (BeforeAfter, VideoPreview, …) — порт VariantB
  admin/                UploadField, поля форм
lib/
  prisma.ts  i18n.ts  palette.ts  site-data.ts
prisma/
  schema.prisma  seed.ts
```

## Источник дизайна

Вёрстка перенесена один-в-один из варианта **VariantB («Iron»)** статического прототипа
в `../trainer`. Логика админки на localStorage заменена на БД + сервер.
