import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { unstable_noStore } from "next/cache";
import type { ServiceCatalog } from "./types";
import { catalogSchema } from "./catalog-schema";
import { syncCatalogDisplayFields } from "./presentation";
import { getDb, getMongoUri } from "@/lib/mongodb/client";

export { catalogSchema } from "./catalog-schema";

const catalogPath = path.join(process.cwd(), "data", "service-catalog.json");
const CATALOG_DOC_ID = "main";

function readCatalogFromFile(): ServiceCatalog {
  if (!existsSync(catalogPath)) {
    throw new Error("Missing data/service-catalog.json");
  }
  const raw = readFileSync(catalogPath, "utf8");
  return catalogSchema.parse(JSON.parse(raw)) as ServiceCatalog;
}

function writeCatalogToFile(catalog: ServiceCatalog): ServiceCatalog {
  writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  return catalog;
}

export async function readServiceCatalog(): Promise<ServiceCatalog> {
  unstable_noStore();
  if (getMongoUri()) {
    try {
      const db = await getDb();
      const doc = await db.collection<{ _id: string; data: ServiceCatalog }>("catalog").findOne({
        _id: CATALOG_DOC_ID,
      });
      if (doc?.data) {
        return catalogSchema.parse(doc.data) as ServiceCatalog;
      }
    } catch (error) {
      console.error("MongoDB catalog read failed, falling back to file:", error);
    }
  }
  return readCatalogFromFile();
}

export async function writeServiceCatalog(catalog: ServiceCatalog): Promise<ServiceCatalog> {
  const parsed = catalogSchema.parse(
    syncCatalogDisplayFields({
      ...catalog,
      updatedAt: new Date().toISOString(),
    })
  );

  if (getMongoUri()) {
    const db = await getDb();
    await db.collection<{ _id: string; data: ServiceCatalog; updatedAt: Date }>("catalog").updateOne(
      { _id: CATALOG_DOC_ID },
      { $set: { data: parsed, updatedAt: new Date() } },
      { upsert: true }
    );
  }
  writeCatalogToFile(parsed);

  return parsed;
}

export async function getCatalogService(id: string) {
  const catalog = await readServiceCatalog();
  return catalog.services.find((s) => s.id === id);
}

export async function getActiveCatalogServices() {
  const catalog = await readServiceCatalog();
  return catalog.services.filter((s) => s.active);
}

/** Used by seed script and file-only fallback */
export function readServiceCatalogFromFile(): ServiceCatalog {
  return readCatalogFromFile();
}
