"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { pricingPreview } from "@/data/pricing";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

export function PricingPreview() {
  return (
    <section className="relative w-full overflow-hidden bg-soft-gray py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <AnimatedHeading
            text="Transparent Starting Prices"
            className="font-heading text-3xl font-bold text-navy md:text-5xl"
          />
          <Link
            href="/pricing"
            className="group flex items-center gap-2 font-semibold text-royal hover:text-electric"
          >
            View All Pricing
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricingPreview.map((item, i) => (
            <motion.div
              key={item.id}
              className="group rounded-2xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="font-heading text-lg font-bold text-navy">{item.service}</h3>
              <p className="mt-2 font-heading text-2xl font-bold text-royal">{item.price}</p>
              <Link
                href={`/booking?service=${item.id}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy/60 transition-colors group-hover:text-royal"
              >
                Book Now <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
