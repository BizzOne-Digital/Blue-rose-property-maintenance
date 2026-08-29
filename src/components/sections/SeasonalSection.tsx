"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { images } from "@/data/images";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { cn } from "@/lib/utils";

const seasons = [
  { id: "spring", label: "Spring", service: "Yard Cleanup", image: images.seasonal.spring },
  { id: "summer", label: "Summer", service: "Lawn Mowing", image: images.seasonal.summer },
  { id: "fall", label: "Fall", service: "Home & Carpet Cleaning", image: images.seasonal.fall },
  { id: "winter", label: "Winter", service: "Snow Removal", image: images.seasonal.winter },
] as const;

export function SeasonalSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative w-full overflow-hidden bg-navy py-16 sm:py-24">
      <div className="absolute inset-0 overflow-hidden opacity-20" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 h-[min(600px,100vw)] w-[min(600px,100vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-electric to-royal blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <AnimatedHeading
            text="Year-Round Property Care"
            className="font-heading text-3xl font-bold text-white md:text-5xl"
          />
          <p className="mx-auto mt-4 max-w-2xl text-ice/70">
            From spring yard cleanup to winter snow removal — one team for every season.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2 px-2">
          {seasons.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                active === i
                  ? "bg-gradient-to-r from-electric to-royal text-white shadow-lg"
                  : "bg-white/10 text-ice/70 hover:bg-white/20"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="relative mt-6 h-[280px] overflow-hidden rounded-2xl sm:mt-8 sm:h-[400px] sm:rounded-3xl md:h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={seasons[active].image}
                alt={`${seasons[active].label} - ${seasons[active].service}`}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-16 sm:bottom-8 sm:left-8 sm:right-auto">
                <p className="text-xs font-medium text-electric sm:text-sm">{seasons[active].label}</p>
                <h3 className="font-heading text-xl font-bold text-white sm:text-3xl md:text-4xl">
                  {seasons[active].service}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute right-8 bottom-8 flex gap-2">
            {seasons.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === active ? "w-8 bg-electric" : "w-4 bg-white/30"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
