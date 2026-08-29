"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Sparkles } from "@/components/ui/Sparkles";

export function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden gradient-bg-radial py-16 sm:py-24">
      <Sparkles count={12} />
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 1200 400">
          <motion.path
            d="M0 300 Q300 200 600 300 T1200 300"
            fill="none"
            stroke="#2D7FFF"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
          />
          <motion.path
            d="M0 350 Q400 250 800 350 T1200 350"
            fill="none"
            stroke="#064EDB"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.3 }}
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
        <AnimatedHeading
          text="One Call. Every Season. Total Property Care."
          as="h2"
          className="font-heading text-3xl font-bold text-white md:text-5xl"
        />
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ice/70">
          Book carpet cleaning, home cleaning, lawn care or snow removal — all from one trusted team.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href="/booking" variant="light">
            Book Your Service
          </MagneticButton>
          <MagneticButton href="/pricing" variant="secondary">
            View Pricing
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
