import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- Admin user ---
  const email = process.env.ADMIN_EMAIL || "admin@erbol.kz";
  const password = process.env.ADMIN_PASSWORD || "changeme123";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, name: "Admin", role: "ADMIN" },
  });
  console.log(`✓ admin user: ${email}`);

  // --- Singleton settings ---
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {
      heroPortraitUrl: "/uploads/photo.jpeg",
      promoVideoUrl: "/uploads/IMG_9781.MP4",
    },
    create: {
      id: "main",
      heroSub:
        "Я — начинающий тренер. Через неделю заканчиваю 240-часовой курс и беру первых пять подопечных по интро-цене.",
      heroPortraitUrl: "/uploads/photo.jpeg",
      promoVideoUrl: "/uploads/IMG_9781.MP4",
    },
  });
  console.log("✓ site settings");

  // --- Sample transformations (before/after) ---
  const tCount = await prisma.transformation.count();
  if (tCount === 0) {
    await prisma.transformation.createMany({
      data: [
        { name: "A. Murat", weeksLabel: "0 → 16 нед.", kgFrom: 102, kgTo: 87, order: 0 },
        { name: "D. Kim", weeksLabel: "0 → 24 нед.", kgFrom: 71, kgTo: 84, order: 1 },
        { name: "T. Otar", weeksLabel: "0 → 12 нед.", kgFrom: 95, kgTo: 88, order: 2 },
      ],
    });
    console.log("✓ sample transformations");
  }

  // --- Sample feed items ---
  const fCount = await prisma.feedItem.count();
  if (fCount === 0) {
    await prisma.feedItem.createMany({
      data: [
        { text: "Deadlift", sub: "220KG × 3", order: 0 },
        { text: "Form", sub: "SQUAT DEPTH", order: 1 },
        { text: "Q&A", sub: "NUTRITION", order: 2 },
        { text: "Meet", sub: "IPF PREP", order: 3 },
        { text: "Bench", sub: "155KG × 5", order: 4 },
        { text: "Cycle", sub: "8WK BLOCK", order: 5 },
      ],
    });
    console.log("✓ sample feed items");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
