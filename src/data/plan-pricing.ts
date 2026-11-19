import type { CatalogService } from "@/lib/service-catalog/types";
import { formatMoney, calculatePlanEstimate } from "@/lib/service-catalog/format";

export function getPlanById(service: CatalogService, id: string) {
  return service.plans.find((plan) => plan.id === id);
}

export function getAddonByLabel(service: CatalogService, label: string) {
  return service.addons.find((option) => option.label === label);
}

export function formatAddonPrice(amount: number): string {
  return formatMoney(amount);
}

export function calculateServiceEstimate(
  service: CatalogService,
  planId: string | undefined,
  addons: string[]
): string {
  return calculatePlanEstimate(service, planId, addons);
}

export function packageIncludesLabel(service: CatalogService): string {
  return (service.packageIncludes ?? []).join(" · ");
}
