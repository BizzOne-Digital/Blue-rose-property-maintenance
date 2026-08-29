"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles as SparkleIcon } from "lucide-react";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

const serviceIcons: Record<string, React.ReactNode> = {
  "carpet-cleaning": (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 18h16M6 14l2-8h8l2 8M8 14v4M16 14v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "home-cleaning": (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12l9-8 9 8M5 10v10h14V10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "lawn-care": (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 20h16M7 20V12l5-6 5 6v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "snow-removal": (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v20M4 8l16 8M20 8L4 16" strokeLinecap="round" />
    </svg>
  ),
};

interface ServiceCardProps {
  service: Service;
  index?: number;
  featured?: boolean;
}

export function ServiceCard({ service, index = 0, featured }: ServiceCardProps) {
  return (
    <motion.article
      className={cn(
        "group relative min-w-0 overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-2xl",
        featured && "md:col-span-2 lg:row-span-2"
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <div className={cn("relative overflow-hidden", featured ? "h-72 md:h-full min-h-[320px]" : "h-48")}>
        <Image
          src={service.image}
          alt={`${service.name} service`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes={featured ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 100vw, 25vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />

        {featured && (
          <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-electric/90 px-3 py-1 text-xs font-bold text-white">
            <SparkleIcon className="h-3 w-3" />
            Featured
          </div>
        )}

        <div className="absolute bottom-0 left-0 p-6">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
            {serviceIcons[service.id]}
          </div>
          <h3 className="font-heading text-xl font-bold text-white md:text-2xl">
            {service.name}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm leading-relaxed text-navy/70">{service.shortDescription}</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-heading text-lg font-bold text-royal">{service.startingPrice}</span>
          <Link
            href={`/services#${service.id}`}
            className="group/link flex shrink-0 items-center gap-1 text-sm font-semibold text-navy transition-colors hover:text-royal"
          >
            Explore Service
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
