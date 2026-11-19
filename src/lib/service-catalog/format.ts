import type { CatalogAddon, CatalogPlan, CatalogService } from "./types";

export function formatMoney(amount: number): string {
  const rounded = Number.isInteger(amount) ? amount.toFixed(0) : amount.toFixed(2);
  return `$${rounded}`;
}

export function planPriceLabel(plan: CatalogPlan): string {
  if (plan.priceDisplay) return plan.priceDisplay;
  if (plan.price <= 0) return "Call for quote";
  if (plan.priceMin != null && plan.priceMax != null) {
    return `$${plan.priceMin}–$${plan.priceMax}`;
  }
  if (getPlanBilling(plan) === "monthly") return `${formatMoney(plan.price)}/mo`;
  return formatMoney(plan.price);
}

export function addonPriceLabel(addon: CatalogAddon): string {
  if (addon.priceDisplay) return addon.priceDisplay;
  if (addon.price == null) return "Call for quote";
  return formatMoney(addon.price);
}

export function calculatePlanEstimate(
  service: CatalogService,
  planId: string | undefined,
  addonLabels: string[]
): string {
  const plan = service.plans.find((p) => p.id === planId);
  const addonTotal = addonLabels.reduce((sum, label) => {
    const match = service.addons.find((a) => a.label === label);
    return sum + (match?.price ?? 0);
  }, 0);

  if (service.bookingMode === "bedrooms") {
    return service.mainPriceDisplay;
  }

  if (!plan) {
    if (service.plans.length === 1) {
      const only = service.plans[0];
      return planPriceLabel(only);
    }
    return service.mainPriceDisplay;
  }

  if (plan.price <= 0) {
    return planPriceLabel(plan);
  }

  if (getPlanBilling(plan) === "monthly") {
    return addonTotal > 0
      ? `${formatMoney(plan.price)}/mo + ${formatMoney(addonTotal)} add-on estimated`
      : `${formatMoney(plan.price)}/mo`;
  }

  if (plan.priceMin != null && plan.priceMax != null) {
    if (addonTotal > 0) {
      return `$${plan.priceMin}–$${(plan.priceMax + addonTotal).toFixed(0)} estimated`;
    }
    return `$${plan.priceMin}–$${plan.priceMax}`;
  }

  const total = plan.price + addonTotal;
  return addonTotal > 0 ? `${formatMoney(total)} estimated` : formatMoney(plan.price);
}

export function calculateBedroomEstimate(
  service: CatalogService,
  bedrooms: "1" | "2" | "3",
  addonLabels: string[]
): string {
  const base = service.bedroomPrices?.[bedrooms] ?? 0;
  const addonTotal = addonLabels.reduce((sum, label) => {
    const match = service.addons.find((a) => a.label === label);
    return sum + (match?.price ?? 0);
  }, 0);
  if (addonTotal > 0) {
    return `$${(base + addonTotal).toFixed(2)}+ estimated`;
  }
  return `$${base}+`;
}

export function slugifyId(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export interface PlanGroup {
  id: string;
  label: string;
  plans: CatalogPlan[];
}

/** Billing type for a plan. Plans saved without a billing period are inferred from their wording. */
export function getPlanBilling(plan: CatalogPlan): "one-time" | "monthly" {
  if (plan.billingPeriod) return plan.billingPeriod;
  const text = `${plan.label} ${plan.priceDisplay ?? ""} ${plan.description ?? ""} ${plan.id}`;
  return /monthly|\/\s?mo\b|per month|a month|\bmonth\b/i.test(text) ? "monthly" : "one-time";
}

export function getPlanGroupLabel(plan: CatalogPlan): string {
  const explicit = plan.group?.trim();
  if (explicit) return explicit;
  return getPlanBilling(plan) === "monthly" ? "Monthly plans" : "One-time service";
}

/**
 * Splits a service's plans into separate booking choices so one-time and monthly
 * options (and any custom groups, e.g. monthly driveway) are never mixed in one list.
 */
export function groupPlans(plans: CatalogPlan[]): PlanGroup[] {
  const groups: PlanGroup[] = [];
  for (const plan of plans) {
    const label = getPlanGroupLabel(plan);
    const id = slugifyId(label) || "plans";
    const existing = groups.find((g) => g.id === id);
    if (existing) existing.plans.push(plan);
    else groups.push({ id, label, plans: [plan] });
  }
  return groups;
}
