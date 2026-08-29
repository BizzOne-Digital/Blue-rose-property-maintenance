import type { Metadata } from "next";
import { services } from "@/data/services";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional carpet cleaning, home cleaning, lawn care and snow removal services for residential properties.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden gradient-bg-radial pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-semibold tracking-wider text-electric uppercase">
            Our Services
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold text-white break-words sm:text-4xl md:text-6xl">
            Professional Care for Every Part of Your Property
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ice/70">
            From deep carpet extraction to lawn mowing and winter snow removal — comprehensive property maintenance in one place.
          </p>
        </div>
      </section>

      {services.map((service, i) => (
        <ServiceSection key={service.id} service={service} index={i} />
      ))}

      <FinalCTA />
    </>
  );
}
