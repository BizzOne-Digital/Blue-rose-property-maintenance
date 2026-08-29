import type { Metadata } from "next";
import { pricingCategories, pricingNotice } from "@/data/pricing";
import { PricingCard } from "@/components/ui/PricingCard";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent starting prices for carpet cleaning, home cleaning, lawn care and snow removal services.",
};

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden gradient-bg-radial pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-semibold tracking-wider text-electric uppercase">
            Pricing
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold text-white break-words sm:text-4xl md:text-6xl">
            Clear, Transparent Pricing
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ice/70">
            Upfront starting prices for every service. Request a booking for an exact quote.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {pricingCategories.map((category) => (
              <PricingCard key={category.id} category={category} />
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-royal/10 bg-ice p-6 text-center">
            <p className="text-sm leading-relaxed text-navy/70">{pricingNotice}</p>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
