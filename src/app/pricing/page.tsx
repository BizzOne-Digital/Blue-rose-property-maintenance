import type { Metadata } from "next";
import { PricingPageGrid } from "@/components/sections/PricingPageGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    `Transparent starting prices for carpet cleaning, lawn care and snow removal in ${siteConfig.city}.`,
};

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden gradient-bg-radial page-header-offset pb-16 sm:pb-20">
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
          <PricingPageGrid />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
