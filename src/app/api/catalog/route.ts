import { NextResponse } from "next/server";
import { readServiceCatalog } from "@/lib/service-catalog/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const catalog = await readServiceCatalog();
    return NextResponse.json(catalog, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Failed to read service catalog:", error);
    return NextResponse.json({ error: "Catalog unavailable" }, { status: 500 });
  }
}
