import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { Binary } from "mongodb";
import { isAdminAuthenticated } from "@/lib/service-catalog/auth";
import { getDb, getMongoUri } from "@/lib/mongodb/client";

export const dynamic = "force-dynamic";

const MAX_BYTES = 4 * 1024 * 1024;
const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }
    const ext = TYPES[file.type];
    if (!ext) {
      return NextResponse.json({ error: "Only JPG, PNG or WebP images are allowed." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Image is too large (max 4 MB)." }, { status: 400 });
    }
    const bytes = Buffer.from(await file.arrayBuffer());
    const id = randomUUID();

    if (getMongoUri()) {
      const db = await getDb();
      await db.collection("images").insertOne({
        _id: id as never,
        contentType: file.type,
        data: new Binary(bytes),
        createdAt: new Date(),
      });
      return NextResponse.json({ url: `/api/images/${id}` });
    }

    const dir = path.join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, `${id}.${ext}`), bytes);
    return NextResponse.json({ url: `/uploads/${id}.${ext}` });
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json({ error: "Image upload failed. Please try again." }, { status: 500 });
  }
}
