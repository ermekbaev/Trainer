"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn, signOut, auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

/* ---------- auth ---------- */
export async function authenticate(_prev: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) return "Неверный email или пароль.";
    throw error; // re-throw NEXT_REDIRECT
  }
}

export async function logout() {
  await signOut({ redirectTo: "/admin/login" });
}

/* ---------- settings ---------- */
export async function saveSettings(formData: FormData) {
  await requireAdmin();
  const str = (k: string) => String(formData.get(k) ?? "");
  const has = (k: string) => formData.get(k) === "on" || formData.get(k) === "true";

  const titleLines = [str("heroTitle0"), str("heroTitle1"), str("heroTitle2"), str("heroTitle3")];

  const data = {
    spotsLeft: Math.max(0, Math.min(5, parseInt(str("spotsLeft") || "5", 10))),
    showVideo: has("showVideo"),
    showTransformations: has("showTransformations"),
    accent: str("accent") || "#2d6a4f",
    priceStarter: str("priceStarter"),
    priceSignature: str("priceSignature"),
    priceFounder: str("priceFounder"),
    heroEyebrow: str("heroEyebrow"),
    heroTitle: titleLines.join("|"),
    heroSub: str("heroSub"),
    heroPortraitUrl: str("heroPortraitUrl") || null,
    promoVideoUrl: str("promoVideoUrl") || null,
  };

  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: data,
    create: { id: "main", ...data },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

/* ---------- transformations ---------- */
export async function createTransformation() {
  await requireAdmin();
  const count = await prisma.transformation.count();
  await prisma.transformation.create({
    data: { name: "Новый кейс", weeksLabel: "0 → 12 нед.", kgFrom: 0, kgTo: 0, order: count },
  });
  revalidatePath("/admin/transformations");
  revalidatePath("/");
}

export async function saveTransformation(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const str = (k: string) => String(formData.get(k) ?? "");
  await prisma.transformation.update({
    where: { id },
    data: {
      name: str("name"),
      weeksLabel: str("weeksLabel"),
      kgFrom: parseInt(str("kgFrom") || "0", 10),
      kgTo: parseInt(str("kgTo") || "0", 10),
      beforeImageUrl: str("beforeImageUrl") || null,
      afterImageUrl: str("afterImageUrl") || null,
      order: parseInt(str("order") || "0", 10),
      published: formData.get("published") === "on",
    },
  });
  revalidatePath("/admin/transformations");
  revalidatePath("/");
}

export async function deleteTransformation(formData: FormData) {
  await requireAdmin();
  await prisma.transformation.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/transformations");
  revalidatePath("/");
}

/* ---------- feed ---------- */
export async function createFeedItem() {
  await requireAdmin();
  const count = await prisma.feedItem.count();
  await prisma.feedItem.create({ data: { text: "NEW", sub: "", order: count } });
  revalidatePath("/admin/feed");
  revalidatePath("/");
}

export async function saveFeedItem(formData: FormData) {
  await requireAdmin();
  const str = (k: string) => String(formData.get(k) ?? "");
  await prisma.feedItem.update({
    where: { id: String(formData.get("id")) },
    data: {
      text: str("text"),
      sub: str("sub"),
      imageUrl: str("imageUrl") || null,
      order: parseInt(str("order") || "0", 10),
      published: formData.get("published") === "on",
    },
  });
  revalidatePath("/admin/feed");
  revalidatePath("/");
}

export async function deleteFeedItem(formData: FormData) {
  await requireAdmin();
  await prisma.feedItem.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/feed");
  revalidatePath("/");
}

/* ---------- bookings ---------- */
export async function toggleBookingHandled(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const current = await prisma.booking.findUnique({ where: { id } });
  if (current) {
    await prisma.booking.update({ where: { id }, data: { handled: !current.handled } });
  }
  revalidatePath("/admin/bookings");
}

export async function deleteBooking(formData: FormData) {
  await requireAdmin();
  await prisma.booking.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/bookings");
}
