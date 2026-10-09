import {
  getPricingFromCatalogData,
  PRICING_NOTICE,
} from "@/lib/service-catalog/presentation";
import { readServiceCatalog } from "@/lib/service-catalog/server";
import type { ServiceId } from "./services";

export interface PricingItem {
  label: string;
  price: string;
}

export interface PricingCategory {
  id: ServiceId;
  name: string;
  items: PricingItem[];
  note?: string;
}

export { PRICING_NOTICE };

export async function getActivePricingCategories(): Promise<PricingCategory[]> {
  const catalog = await readServiceCatalog();
  return getPricingFromCatalogData(catalog).categories;
}

export async function getPricingPreview() {
  const catalog = await readServiceCatalog();
  return getPricingFromCatalogData(catalog).preview;
}
