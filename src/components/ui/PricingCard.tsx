"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { PricingCategory } from "@/data/pricing";

export function PricingCard({ category }: { category: PricingCategory }) {
  return (
    <motion.div
      className="rounded-2xl bg-white p-6 shadow-lg gradient-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="font-heading text-xl font-bold text-navy">{category.name}</h3>
      <ul className="mt-6 space-y-3">
        {category.items.map((item) => (
          <li
            key={item.label}
            className="flex flex-col gap-1 border-b border-navy/5 pb-3 last:border-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-sm text-navy/70">{item.label}</span>
            <span className="font-heading text-sm font-bold text-royal sm:whitespace-nowrap">{item.price}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/booking?service=${category.id}`}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-royal to-electric py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
      >
        Book This Service <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}
