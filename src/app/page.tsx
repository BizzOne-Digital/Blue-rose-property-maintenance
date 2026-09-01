import type { Metadata } from "next";
import { Hero, ServiceTicker } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesIntro } from "@/components/sections/ServicesIntro";
import { ServiceSpotlight } from "@/components/sections/ServiceSpotlight";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { SeasonalSection } from "@/components/sections/SeasonalSection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServiceTicker />
      <ServicesIntro />
      <ServiceSpotlight />
      <WhyChoose />
      <SeasonalSection />
      <ProcessSteps />
      <PricingPreview />
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <TestimonialCarousel limit={5} />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
