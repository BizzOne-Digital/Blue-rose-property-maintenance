import { catalogServiceToMarketing } from "@/lib/service-catalog/presentation";
import type { CatalogService } from "@/lib/service-catalog/types";

export type ServiceId = string;

export interface Service {
  id: ServiceId;
  name: string;
  shortDescription: string;
  description: string;
  startingPrice: string;
  image: string;
  featured?: boolean;
  items: string[];
  benefits: string[];
}

export function mapCatalogServiceToMarketing(service: CatalogService): Service {
  return catalogServiceToMarketing(service);
}
