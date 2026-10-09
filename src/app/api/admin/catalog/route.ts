import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/service-catalog/auth";
import { catalogSchema, readServiceCatalog, writeServiceCatalog } from "@/lib/service-catalog/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await readServiceCatalog());
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const parsed = catalogSchema.parse(body);
    const saved = await writeServiceCatalog(parsed);
    revalidatePath("/", "layout");
    revalidatePath("/pricing");
    revalidatePath("/services");
    revalidatePath("/booking");
    revalidatePath("/admin");
    return NextResponse.json(saved);
  } catch (error) {
    console.error("Failed to save catalog:", error);
    if (error instanceof z.ZodError) {
      const detail = error.errors[0]?.message ?? "Validation failed";
      return NextResponse.json({ error: `Invalid catalog data: ${detail}` }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to save catalog" }, { status: 500 });
  }
}
