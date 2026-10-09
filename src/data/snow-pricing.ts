import { calculatePlanEstimate, planPriceLabel } from "@/lib/service-catalog/format";
import type { CatalogService } from "@/lib/service-catalog/types";

export type SnowPlanId = string;

export function getSnowPlans(service: CatalogService) {
  return service.plans;
}

export function getSnowAddons(service: CatalogService) {
  return service.addons;
}

export function getSnowPlanById(service: CatalogService, id: string) {
  return service.plans.find((plan) => plan.id === id);
}

export function calculateSnowEstimate(
  service: CatalogService,
  planId: string | undefined,
  addons: string[]
): string {
  return calculatePlanEstimate(service, planId, addons);
}

export { planPriceLabel as snowPlanPriceLabel };
