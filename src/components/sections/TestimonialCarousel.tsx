"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { services } from "@/data/services";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function TestimonialCard({
  name,
  text,
  rating,
  serviceId,
}: {
  name: string;
  text: string;
  rating: number;
  serviceId: string;
}) {
  const serviceName = services.find((s) => s.id === serviceId)?.name ?? "";

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <Quote className="h-8 w-8 text-electric/30" />
      <p className="mt-4 text-sm leading-relaxed text-navy/70">&ldquo;{text}&rdquo;</p>
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="font-semibold text-navy">{name}</p>
          <p className="text-xs text-navy/50">{serviceName}</p>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TestimonialCarousel({ limit }: { limit?: number }) {
  const items = limit ? testimonials.slice(0, limit) : testimonials;
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % items.length);
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="font-heading text-lg font-bold text-navy sm:text-xl">
            {siteConfig.googleRating} Google Rating
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            className="rounded-full border border-navy/10 p-2 hover:bg-ice"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-full border border-navy/10 p-2 hover:bg-ice"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
          >
            <TestimonialCard
              name={items[current].name}
              text={items[current].text}
              rating={items[current].rating}
              serviceId={items[current].service}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={cn(
              "h-2 rounded-full transition-all",
              i === current ? "w-6 bg-royal" : "w-2 bg-navy/20"
            )}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
