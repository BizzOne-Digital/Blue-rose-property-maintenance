import type { PricingCategory } from "@/data/pricing";
import type { Service, ServiceId } from "@/data/services";
import { addonPriceLabel, planPriceLabel } from "./format";
import type { CatalogService, ServiceCatalog } from "./types";

export function getServiceDisplayItems(service: CatalogService): string[] {
  const lines: string[] = [];

  for (const plan of service.plans) {
    lines.push(`${plan.label} — ${planPriceLabel(plan)}`);
  }

  if (service.bookingMode === "bedrooms" && service.bedroomPrices) {
    lines.push(
      `One-bedroom — starting at $${service.bedroomPrices["1"]}`,
      `Two-bedroom — starting at $${service.bedroomPrices["2"]}`,
      `Three-bedroom — starting at $${service.bedroomPrices["3"]}`
    );
  }

  for (const addon of service.addons) {
    lines.push(`${addon.label} — ${addonPriceLabel(addon)}`);
  }

  for (const line of service.extraPricingLines ?? []) {
    lines.push(`${line.label} — ${line.priceDisplay}`);
  }

  if (service.commercialNote) {
    lines.push(service.commercialNote);
  }

  return lines.length > 0 ? lines : service.items;
}

export function catalogServiceToMarketing(service: CatalogService): Service {
  return {
    id: service.id as ServiceId,
    name: service.name,
    shortDescription: service.shortDescription,
    description: service.description,
    startingPrice: service.mainPriceDisplay,
    image: service.image,
    featured: service.featured,
    items: getServiceDisplayItems(service),
    benefits: service.benefits,
  };
}

export function syncCatalogDisplayFields(catalog: ServiceCatalog): ServiceCatalog {
  return {
    ...catalog,
    services: catalog.services.map((service) => ({
      ...service,
      items: getServiceDisplayItems(service),
    })),
  };
}

export function catalogServiceToPricingCategory(service: CatalogService): PricingCategory {
  const items: PricingCategory["items"] = [];

  for (const plan of service.plans) {
    items.push({
      label: plan.quickPick ? `${plan.label} (quick pick)` : plan.label,
      price: planPriceLabel(plan),
    });
  }

  if (service.bookingMode === "bedrooms" && service.bedroomPrices) {
    items.push(
      { label: "One-bedroom standard cleaning", price: `starting at $${service.bedroomPrices["1"]}` },
      { label: "Two-bedroom standard cleaning", price: `starting at $${service.bedroomPrices["2"]}` },
      { label: "Three-bedroom standard cleaning", price: `starting at $${service.bedroomPrices["3"]}` }
    );
  }

  for (const addon of service.addons) {
    items.push({
      label: addon.label,
      price: addonPriceLabel(addon),
    });
  }

  for (const line of service.extraPricingLines ?? []) {
    items.push({ label: line.label, price: line.priceDisplay });
  }

  return {
    id: service.id as ServiceId,
    name: service.name,
    note: service.pricingNote,
    items,
  };
}

export const PRICING_NOTICE =
  "Prices shown are starting prices. Final pricing may vary depending on property size, condition, service area and specific requirements. Request a quote or booking confirmation for an exact total.";

export function getPricingFromCatalogData(catalog: ServiceCatalog) {
  const active = catalog.services.filter((s) => s.active);
  return {
    categories: active.map(catalogServiceToPricingCategory),
    preview: active.map((s) => ({
      service: s.name,
      price: s.mainPriceDisplay,
      id: s.id as ServiceId,
    })),
    notice: PRICING_NOTICE,
  };
}

export function getMarketingServicesFromCatalogData(catalog: ServiceCatalog): Service[] {
  return catalog.services.filter((s) => s.active).map(catalogServiceToMarketing);
}
