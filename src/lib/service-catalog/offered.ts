import { siteConfig } from "@/config/site";
import type { ServiceCatalog } from "./types";

/**
 * Restricts a catalog to the services Blue Rose currently offers (see siteConfig.offeredServiceIds).
 *
 * - Discontinued services (carpet cleaning, home cleaning) are removed.
 * - Offered services keep whatever was saved in the admin portal (prices, plans, add-ons).
 * - An offered service that is missing from the saved catalog (e.g. junk removal on first deploy)
 *   is added from the seed file so it shows up without a manual database edit.
 */
export function applyOfferedServices(
  catalog: ServiceCatalog,
  seed: ServiceCatalog
): ServiceCatalog {
  const services = siteConfig.offeredServiceIds.flatMap((id) => {
    const saved = catalog.services.find((s) => s.id === id);
    const fallback = seed.services.find((s) => s.id === id);
    const service = saved ?? fallback;
    return service ? [service] : [];
  });

  return { ...catalog, services };
}
