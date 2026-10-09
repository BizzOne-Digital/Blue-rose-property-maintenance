import {
  catalogServiceToMarketing,
  getMarketingServicesFromCatalogData,
} from "@/lib/service-catalog/presentation";
import { getCatalogService, readServiceCatalog } from "@/lib/service-catalog/server";
import type { Service, ServiceId } from "./services";

export async function getServiceById(id: ServiceId): Promise<Service | undefined> {
  const fromCatalog = await getCatalogService(id);
  return fromCatalog ? catalogServiceToMarketing(fromCatalog) : undefined;
}

export async function isServiceActive(id: ServiceId): Promise<boolean> {
  const service = await getCatalogService(id);
  return service?.active ?? false;
}

export async function getActiveServices(): Promise<Service[]> {
  const catalog = await readServiceCatalog();
  return getMarketingServicesFromCatalogData(catalog);
}
