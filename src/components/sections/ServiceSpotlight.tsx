"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Phone } from "lucide-react";
import { mapCatalogServiceToMarketing } from "@/data/services";
import { siteConfig } from "@/config/site";
import { useCatalog } from "@/lib/service-catalog/client";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ServicePricePickMenu } from "@/components/ui/ServicePricePickMenu";
import { PhoneLink } from "@/components/analytics/PhoneLink";

export function ServiceSpotlight() {
  const { getService } = useCatalog();
  const snowCatalog = getService("snow-removal");
  const junkCatalog = getService("junk-removal");
  const snow = snowCatalog?.active ? mapCatalogServiceToMarketing(snowCatalog) : null;
  const junk = junkCatalog?.active ? mapCatalogServiceToMarketing(junkCatalog) : null;

  return (
    <>
      {snow && (
        <section className="relative w-full overflow-hidden bg-soft-gray py-16 sm:py-24">
          <div className="absolute top-0 right-0 section-number text-royal">02</div>

          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid min-w-0 items-start gap-8 sm:gap-12 lg:grid-cols-2">
              <div>
                <span className="mb-4 inline-block rounded-full bg-royal/10 px-4 py-1.5 text-xs font-bold tracking-wider text-royal uppercase">
                  Snow Removal Plans
                </span>
                <AnimatedHeading
                  text="Winter Handled. Pick Your Plan."
                  className="font-heading text-4xl font-bold text-navy md:text-6xl"
                />
                <p className="mt-6 text-lg leading-relaxed text-navy/70">{snow.description}</p>

                <ul className="mt-8 space-y-3">
                  {snow.benefits.map((item, i) => (
                    <motion.li
                      key={item}
                      className="flex items-center gap-3 text-navy/80"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-electric to-royal text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                  <MagneticButton href="/booking?service=snow-removal">Book Snow Removal</MagneticButton>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:text-electric"
                  >
                    View Pricing <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative h-56 overflow-hidden rounded-2xl sm:h-72">
                  <Image
                    src={snow.image}
                    alt="Snow removal service"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-near-black/70 to-transparent" />
                </div>
                {snowCatalog?.secondaryImage && (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                    <Image
                      src={snowCatalog.secondaryImage}
                      alt="Snow removal crew clearing a home and driveway"
                      fill
                      className="object-cover"
                      sizes="(max-width:1024px) 100vw, 40vw"
                    />
                  </div>
                )}
                <div className="rounded-2xl border border-royal/10 bg-white p-6 shadow-lg">
                  <p className="mb-4 font-heading text-xl font-bold text-navy">Snow Removal Price Picks</p>
                  <ServicePricePickMenu serviceId="snow-removal" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {junk && (
        <section className="relative w-full overflow-hidden bg-near-black py-16 sm:py-20">
          <div className="absolute inset-0 opacity-40" aria-hidden="true">
            <div className="absolute top-1/2 right-0 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-royal blur-[120px]" />
          </div>
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2 lg:px-8">
            <div>
              <span className="mb-4 inline-block rounded-full bg-electric/15 px-4 py-1.5 text-xs font-bold tracking-wider text-electric uppercase">
                Junk Removal
              </span>
              <h2 className="chrome-text font-heading text-4xl font-bold italic uppercase md:text-6xl">
                We Haul It. You Relax.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ice/75">{junk.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton href="/booking?service=junk-removal">Get a Free Quote</MagneticButton>
                <PhoneLink
                  location="junk-removal-spotlight"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.phone}
                </PhoneLink>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {junk.items.map((item) => (
                <li
                  key={item}
                  className="chrome-border flex items-center gap-3 rounded-xl p-4 text-sm font-medium text-ice/90"
                >
                  <Check className="h-4 w-4 shrink-0 text-electric" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
