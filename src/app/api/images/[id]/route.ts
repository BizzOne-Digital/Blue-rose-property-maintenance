import { getDb, getMongoUri } from "@/lib/mongodb/client";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getMongoUri() || !/^[0-9a-f-]{36}$/.test(id)) {
    return new Response("Not found", { status: 404 });
  }
  const db = await getDb();
  const doc = await db
    .collection<{ _id: string; contentType: string; data: { buffer: Uint8Array } }>("images")
    .findOne({ _id: id });
  if (!doc) return new Response("Not found", { status: 404 });
  return new Response(Buffer.from(doc.data.buffer), {
    headers: {
      "Content-Type": doc.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
