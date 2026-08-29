"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

const benefits = [
  "Reliable appointments",
  "Clear starting prices",
  "Professional equipment",
  "Convenient service booking",
  "Residential property care",
  "One company for multiple services",
];

export function WhyChoose() {
  return (
    <section className="relative w-full overflow-hidden gradient-bg-radial py-16 sm:py-24">
      <div className="absolute top-0 right-0 section-number text-white/5">03</div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <AnimatedHeading
          text="Why Choose Blue Rose"
          className="text-center font-heading text-3xl font-bold text-white md:text-5xl"
        />

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          <AnimatedCounter value={5} suffix="-Star" label="Google Rating" />
          <AnimatedCounter value={4} label="Core Services" />
          <AnimatedCounter value={1} label="Trusted Team" />
          <AnimatedCounter value={365} label="Days of Property Care" />
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit}
              className="flex items-center gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-electric to-royal">
                <Check className="h-4 w-4 text-white" />
              </span>
              <span className="text-sm font-medium text-ice/90">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
