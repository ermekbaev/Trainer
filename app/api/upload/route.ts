import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const runtime = "nodejs";

const MAX_BYTES = 200 * 1024 * 1024; // 200 MB (videos)
const ALLOWED = /^(image\/(jpeg|png|webp|gif|avif)|video\/(mp4|webm|quicktime))$/;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no file" }, { status: 400 });
  }
  if (!ALLOWED.test(file.type)) {
    return NextResponse.json({ error: `unsupported type: ${file.type}` }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "file too large" }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || guessExt(file.type);
  const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buf);

  const url = `/uploads/${filename}`;
  await prisma.media.create({
    data: { url, filename, mime: file.type, size: file.size },
  });

  return NextResponse.json({ ok: true, url });
}

function guessExt(mime: string) {
  const map: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/avif": ".avif",
    "video/mp4": ".mp4",
    "video/webm": ".webm",
    "video/quicktime": ".mov",
  };
  return map[mime] ?? "";
}
