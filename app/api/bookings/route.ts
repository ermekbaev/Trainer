import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// Public: submit a trial booking
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const goal = String(body?.goal ?? "").trim();

    if (!name || !phone) {
      return NextResponse.json({ error: "name and phone required" }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: { name, phone, goal: goal || "—" },
    });
    return NextResponse.json({ ok: true, id: booking.id });
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

// Admin: list bookings
export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(bookings);
}
