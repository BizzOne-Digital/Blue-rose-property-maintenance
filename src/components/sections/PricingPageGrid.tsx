"use client";

import { getPricingFromCatalogData, PRICING_NOTICE } from "@/lib/service-catalog/presentation";
import { useCatalog } from "@/lib/service-catalog/client";
import { PricingCard } from "@/components/ui/PricingCard";

export function PricingPageGrid() {
  const { catalog } = useCatalog();
  const categories = getPricingFromCatalogData(catalog).categories;

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2">
        {categories.map((category) => (
          <PricingCard key={category.id} category={category} />
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-royal/10 bg-ice p-6 text-center">
        <p className="text-sm leading-relaxed text-navy/70">{PRICING_NOTICE}</p>
      </div>
    </>
  );
}
