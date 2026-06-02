import { prisma } from "./prisma";

export type SettingsDTO = {
  spotsLeft: number;
  showVideo: boolean;
  showTransformations: boolean;
  accent: string;
  priceStarter: string;
  priceSignature: string;
  priceFounder: string;
  heroEyebrow: string;
  heroTitle: string[]; // 4 lines
  heroSub: string;
  heroPortraitUrl: string | null;
  promoVideoUrl: string | null;
};

export type TransformationDTO = {
  id: string;
  name: string;
  weeksLabel: string;
  kgFrom: number;
  kgTo: number;
  beforeImageUrl: string | null;
  afterImageUrl: string | null;
};

export type FeedDTO = {
  id: string;
  imageUrl: string | null;
  text: string;
  sub: string;
};

const DEFAULTS = {
  spotsLeft: 5,
  showVideo: true,
  showTransformations: true,
  accent: "#2d6a4f",
  priceStarter: "25 000",
  priceSignature: "60 000",
  priceFounder: "40 000",
  heroEyebrow: "Персональный тренинг · Бишкек / Online",
  heroTitle: "Сила|не находится.|Её|выковывают.",
  heroSub:
    "Я — начинающий тренер. Через неделю заканчиваю 240-часовой курс и беру первых пять подопечных по интро-цене.",
  heroPortraitUrl: null as string | null,
  promoVideoUrl: null as string | null,
};

/** Read the singleton settings, falling back to defaults if the DB is empty
 *  or unreachable (so the page still renders during local setup). */
export async function getSettings(): Promise<SettingsDTO> {
  let row = null;
  try {
    row = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  } catch {
    row = null;
  }
  const s = { ...DEFAULTS, ...(row ?? {}) };
  return {
    spotsLeft: s.spotsLeft,
    showVideo: s.showVideo,
    showTransformations: s.showTransformations,
    accent: s.accent,
    priceStarter: s.priceStarter,
    priceSignature: s.priceSignature,
    priceFounder: s.priceFounder,
    heroEyebrow: s.heroEyebrow,
    heroTitle: String(s.heroTitle).split("|"),
    heroSub: s.heroSub,
    heroPortraitUrl: s.heroPortraitUrl ?? null,
    promoVideoUrl: s.promoVideoUrl ?? null,
  };
}

export async function getTransformations(): Promise<TransformationDTO[]> {
  try {
    const rows = await prisma.transformation.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      weeksLabel: r.weeksLabel,
      kgFrom: r.kgFrom,
      kgTo: r.kgTo,
      beforeImageUrl: r.beforeImageUrl,
      afterImageUrl: r.afterImageUrl,
    }));
  } catch {
    return [];
  }
}

export async function getFeed(): Promise<FeedDTO[]> {
  try {
    const rows = await prisma.feedItem.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.map((r) => ({ id: r.id, imageUrl: r.imageUrl, text: r.text, sub: r.sub }));
  } catch {
    return [];
  }
}
