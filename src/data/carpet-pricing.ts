import type { CatalogService } from "@/lib/service-catalog/types";
import { formatMoney, planPriceLabel } from "@/lib/service-catalog/format";

export type CarpetPlanId = string;

export function getCarpetPlans(service: CatalogService) {
  return service.plans;
}

export function getCarpetAddons(service: CatalogService) {
  return service.addons;
}

export function getCarpetPlanById(service: CatalogService, id: string) {
  return service.plans.find((plan) => plan.id === id);
}

export function formatCarpetPrice(amount: number): string {
  return formatMoney(amount);
}

export function getCarpetAddonByLabel(service: CatalogService, label: string) {
  return service.addons.find((option) => option.label === label);
}

export function calculateCarpetEstimate(
  service: CatalogService,
  planId: string | undefined,
  addons: string[]
): string {
  const plan = planId ? getCarpetPlanById(service, planId) : undefined;
  if (!plan) return service.mainPriceDisplay;

  const addonTotal = addons.reduce((sum, addon) => {
    const match = getCarpetAddonByLabel(service, addon);
    return sum + (match?.price ?? 0);
  }, 0);

  const total = plan.price + addonTotal;
  return addonTotal > 0 ? `${formatMoney(total)} estimated` : planPriceLabel(plan);
}

export function carpetPackageIncludesLabel(service: CatalogService): string {
  return (service.packageIncludes ?? []).join(" · ");
}
