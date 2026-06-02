-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "spotsLeft" INTEGER NOT NULL DEFAULT 5,
    "showVideo" BOOLEAN NOT NULL DEFAULT true,
    "showTransformations" BOOLEAN NOT NULL DEFAULT true,
    "accent" TEXT NOT NULL DEFAULT '#2d6a4f',
    "priceStarter" TEXT NOT NULL DEFAULT '25 000',
    "priceSignature" TEXT NOT NULL DEFAULT '60 000',
    "priceFounder" TEXT NOT NULL DEFAULT '40 000',
    "heroEyebrow" TEXT NOT NULL DEFAULT 'Персональный тренинг · Бишкек / Online',
    "heroTitle" TEXT NOT NULL DEFAULT 'Сила|не находится.|Её|выковывают.',
    "heroSub" TEXT NOT NULL DEFAULT 'Я — начинающий тренер.',
    "heroPortraitUrl" TEXT,
    "promoVideoUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transformation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weeksLabel" TEXT NOT NULL DEFAULT '0 → 12 нед.',
    "kgFrom" INTEGER NOT NULL DEFAULT 0,
    "kgTo" INTEGER NOT NULL DEFAULT 0,
    "beforeImageUrl" TEXT,
    "afterImageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedItem" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT,
    "text" TEXT NOT NULL DEFAULT '',
    "sub" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "handled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
