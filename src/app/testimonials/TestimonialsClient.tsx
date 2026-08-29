"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials, serviceFilterOptions } from "@/data/testimonials";
import { siteConfig } from "@/config/site";
import { TestimonialCard, TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { FinalCTA } from "@/components/sections/FinalCTA";
import type { ServiceId } from "@/data/services";
import { cn } from "@/lib/utils";

export default function TestimonialsClient() {
  const [filter, setFilter] = useState<ServiceId | "all">("all");

  const filtered =
    filter === "all"
      ? testimonials
      : testimonials.filter((t) => t.service === filter);

  return (
    <>
      <section className="relative overflow-hidden gradient-bg-radial pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-8 w-8 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h1 className="mt-4 font-heading text-3xl font-bold text-white break-words sm:text-4xl md:text-6xl">
            {siteConfig.googleRating} Google Rating
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ice/70">
            Hear from customers who trust Blue Rose for professional property maintenance.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-8 flex flex-wrap gap-2">
            {serviceFilterOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setFilter(opt.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  filter === opt.id
                    ? "bg-gradient-to-r from-royal to-electric text-white shadow-md"
                    : "bg-white text-navy/60 hover:bg-ice"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <TestimonialCard
                  name={t.name}
                  text={t.text}
                  rating={t.rating}
                  serviceId={t.service}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-16">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
