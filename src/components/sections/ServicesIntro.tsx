"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

export function ServicesIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={ref} className="relative w-full overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute top-20 left-0 w-full overflow-hidden" aria-hidden="true">
        <motion.div
          className="font-heading font-bold text-ice select-none whitespace-nowrap"
          style={{ x: bgX, fontSize: "clamp(3rem, 12vw, 10rem)" }}
        >
          SERVICES
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-2xl">
          <AnimatedHeading
            text="Your Property, Professionally Cared For"
            className="font-heading text-3xl font-bold text-navy md:text-5xl"
          />
          <p className="mt-6 text-lg leading-relaxed text-navy/70">
            From deep-cleaned carpets to tidy homes, maintained lawns and safe winter walkways, Blue Rose makes year-round property care simple.
          </p>
        </div>

        <div className="mt-12 grid min-w-0 gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              featured={service.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
