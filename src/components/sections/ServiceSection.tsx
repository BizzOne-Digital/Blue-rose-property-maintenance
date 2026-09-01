"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Service } from "@/data/services";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CarpetPricePickMenu } from "@/components/ui/CarpetPricePickMenu";
import { cn } from "@/lib/utils";

interface ServiceSectionProps {
  service: Service;
  index: number;
}

function SnowParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="absolute animate-float rounded-full bg-white/60"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${(i * 17) % 100}%`,
            top: `${(i * 13) % 100}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${3 + (i % 4)}s`,
          }}
        />
      ))}
    </div>
  );
}

export function ServiceSection({ service, index }: ServiceSectionProps) {
  const isReversed = index % 2 === 1;
  const isSnow = service.id === "snow-removal";
  const isLawn = service.id === "lawn-care";
  const isCarpet = service.id === "carpet-cleaning";

  return (
    <section
      id={service.id}
      className={cn(
        "relative w-full scroll-mt-48 overflow-hidden py-16 sm:scroll-mt-52 sm:py-24",
        isSnow && "bg-gradient-to-b from-ice to-soft-gray"
      )}
    >
      {isSnow && <SnowParticles />}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={cn("grid min-w-0 items-center gap-8 sm:gap-12 lg:grid-cols-2", isReversed && "lg:[direction:rtl]")}>
          <motion.div
            className={cn("relative overflow-hidden rounded-3xl", isReversed && "lg:[direction:ltr]")}
            initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={cn("relative aspect-[4/3] overflow-hidden", isLawn && "group")}>
              <Image
                src={service.image}
                alt={`${service.name} service`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 50vw"
              />
              {isLawn && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-navy/80 to-transparent"
                  initial={{ x: "100%" }}
                  whileInView={{ x: "-100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
          </motion.div>

          <div className={cn(isReversed && "lg:[direction:ltr]")}>
            <span className="text-sm font-semibold tracking-wider text-royal uppercase">
              0{index + 1} — {service.name}
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold text-navy break-words sm:text-3xl md:text-4xl">
              {service.name}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy/70">{service.description}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-navy/80">
                  <Check className="h-4 w-4 shrink-0 text-electric" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <p className="font-heading text-2xl font-bold text-royal">{service.startingPrice}</p>
              <MagneticButton href={`/booking?service=${service.id}`}>
                Book This Service
              </MagneticButton>
            </div>

            {isCarpet && (
              <div className="mt-8 rounded-2xl border border-royal/10 bg-ice p-6">
                <p className="mb-4 font-heading text-lg font-bold text-navy">Carpet Cleaning Price Picks</p>
                <CarpetPricePickMenu />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
