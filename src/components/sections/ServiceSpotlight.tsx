"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { images } from "@/data/images";
import { getServiceById } from "@/data/services";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Sparkles } from "@/components/ui/Sparkles";
import { CarpetPricePickMenu } from "@/components/ui/CarpetPricePickMenu";

const carpetService = getServiceById("carpet-cleaning")!;

export function ServiceSpotlight() {
  return (
    <section className="relative w-full overflow-hidden py-16 carpet-texture sm:py-24">
      <div className="absolute top-0 right-0 section-number text-royal">02</div>
      <Sparkles count={10} />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid min-w-0 items-center gap-8 sm:gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-royal/10 to-electric/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-royal uppercase">
              Carpet Cleaning Spotlight
            </span>
            <AnimatedHeading
              text="Bring Your Carpets Back to Life"
              className="font-heading text-3xl font-bold text-navy md:text-5xl"
            />
            <p className="mt-6 text-lg leading-relaxed text-navy/70">
              Professional extraction helps lift embedded dirt, refresh worn fibres and give your rooms and living rooms a cleaner, brighter appearance.
            </p>

            <ul className="mt-8 space-y-3">
              {carpetService.items.map((item, i) => (
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

            <div className="mt-8 rounded-2xl bg-gradient-to-br from-navy to-royal p-6 text-white shadow-xl">
              <p className="text-sm text-ice/70">Carpet cleaning pricing</p>
              <p className="font-heading text-3xl font-bold">$59.99 per room</p>
              <p className="mt-2 text-sm text-ice/70">$90 living room option</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <MagneticButton href="/booking">Book Carpet Cleaning</MagneticButton>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:text-electric"
              >
                View Pricing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <BeforeAfterSlider
              beforeSrc={images.carpetCleaning.before}
              afterSrc={images.carpetCleaning.after}
              beforeAlt="Carpet before professional cleaning"
              afterAlt="Carpet after professional cleaning"
            />
            <motion.div
              className="relative h-48 overflow-hidden rounded-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={images.carpetCleaning.equipment}
                alt="Professional carpet extraction equipment"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/60 to-transparent" />
              <p className="absolute bottom-4 left-4 max-w-xs text-sm font-medium text-white">
                Professional-grade extraction equipment for deep, visible results.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="relative mt-12 rounded-2xl border border-royal/10 bg-white p-6 shadow-lg sm:p-8">
          <p className="mb-4 font-heading text-lg font-bold text-navy">Carpet Cleaning Price Picks</p>
          <CarpetPricePickMenu />
        </div>
      </div>
    </section>
  );
}
