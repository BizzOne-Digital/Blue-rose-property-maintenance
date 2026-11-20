"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Snowflake, Sprout, Truck, type LucideIcon } from "lucide-react";
import { useCatalog } from "@/lib/service-catalog/client";
import type { CatalogService } from "@/lib/service-catalog/types";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { GoogleStarsBadge } from "@/components/ui/GoogleStarsBadge";
import { ServicePricePickMenu } from "@/components/ui/ServicePricePickMenu";
import { PhoneLink } from "@/components/analytics/PhoneLink";

const serviceIcons: Record<string, LucideIcon> = {
  "lawn-care": Sprout,
  "snow-removal": Snowflake,
  "junk-removal": Truck,
};

/** Quick pick: plans for services that have them, otherwise a free-quote card. */
function QuickPick({ service, variant }: { service: CatalogService; variant: "dark" | "light" }) {
  const dark = variant === "dark";
  if (service.plans.length > 0) {
    return (
      <ServicePricePickMenu
        key={service.id}
        serviceId={service.id}
        variant={variant}
        showAddons
      />
    );
  }

  return (
    <div className="space-y-3">
      <p
        className={cn(
          "text-xs font-semibold tracking-wide uppercase",
          dark ? "text-ice/70" : "text-navy/50"
        )}
      >
        {service.name}
      </p>
      <p className={cn("text-sm", dark ? "text-ice/80" : "text-navy/70")}>{service.shortDescription}</p>
      <p className="font-heading text-2xl font-bold text-electric">{service.mainPriceDisplay}</p>
      <div className="flex flex-wrap gap-2">
        <Link
          href={`/booking?service=${service.id}`}
          className="rounded-lg bg-gradient-to-r from-royal to-electric px-4 py-2.5 text-sm font-bold text-white"
        >
          Request a Free Quote
        </Link>
        <PhoneLink
          location={`hero-quick-pick-${service.id}`}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold",
            dark ? "border-white/30 text-white" : "border-navy/20 text-navy"
          )}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {siteConfig.phone}
        </PhoneLink>
      </div>
    </div>
  );
}

export function Hero() {
  const { mainServices: activeServices } = useCatalog();
  const [selectedId, setSelectedId] = useState<string>(activeServices[0]?.id ?? "");
  const selected = activeServices.find((s) => s.id === selectedId) ?? activeServices[0];

  return (
    <>
      <section className="relative min-h-[calc(100dvh-var(--site-header-offset))] overflow-hidden bg-near-black page-header-offset pb-24 md:pb-0">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected?.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              {selected && (
                <Image
                  src={selected.image}
                  alt={`${selected.name} service`}
                  fill
                  className="object-cover object-center lg:object-[65%_center]"
                  priority
                  sizes="100vw"
                />
              )}
            </motion.div>
          </AnimatePresence>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(3, 6, 13, 0.97) 0%, rgba(3, 6, 13, 0.9) 38%, rgba(3, 6, 13, 0.55) 62%, rgba(3, 6, 13, 0.2) 82%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-near-black/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-var(--site-header-offset)-2rem)] max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_min(22rem,24rem)] lg:gap-10 lg:px-8 lg:py-12 xl:grid-cols-[minmax(0,1fr)_min(26rem,30rem)]">
          <div className="w-full min-w-0 max-w-2xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4 lg:hidden"
            >
              <PhoneLink
                location="hero-mobile"
                className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md border border-white/30 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:text-base"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{siteConfig.phoneCallToAction}</span>
                <span className="text-white/60" aria-hidden="true">·</span>
                <span>{siteConfig.phone}</span>
              </PhoneLink>
            </motion.div>

            <motion.p
              className="mb-3 text-[11px] font-bold tracking-[0.16em] text-electric uppercase sm:text-xs sm:tracking-[0.22em]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              Snow Removal · Junk Removal
            </motion.p>

            <motion.h1
              className="font-heading text-[clamp(2.5rem,10vw,5rem)] leading-[0.98] font-extrabold tracking-tight text-white uppercase italic break-words"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              <span className="chrome-text">Your Property.</span>
              <br />
              Handled Year-Round
              <br />
              in {siteConfig.city}
            </motion.h1>

            <motion.p
              className="mt-5 max-w-md text-sm leading-relaxed text-white/80 sm:text-base"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Reliable snow removal and junk removal from one local team. Clear
              pricing, easy booking and a free quote when you need one.
            </motion.p>

            <motion.div
              className="mt-7 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <Link
                href="/booking"
                className="rounded-md bg-gradient-to-r from-royal to-electric px-6 py-3 text-sm font-bold text-white shadow-lg shadow-royal/40 transition-all hover:brightness-110"
              >
                Book a Service
              </Link>
              <Link
                href="/services"
                className="rounded-md border border-white/60 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Explore Services
              </Link>
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <GoogleStarsBadge />
            </motion.div>
          </div>

          {/* Desktop: service picker + quick pick */}
          <motion.div
            className="hidden min-w-0 flex-col gap-3 lg:flex"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="chrome-border flex overflow-hidden rounded-xl shadow-2xl shadow-black/40">
              {activeServices.map((service) => {
                const Icon = serviceIcons[service.id] ?? Sprout;
                const active = selected?.id === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedId(service.id)}
                    className={cn(
                      "flex min-w-0 flex-1 flex-col items-center gap-2 px-2 py-4 transition-all sm:px-3",
                      active ? "bg-royal/40" : "hover:bg-white/5"
                    )}
                    aria-pressed={active}
                  >
                    <Icon
                      className={cn("h-7 w-7", active ? "text-electric" : "text-chrome-dark")}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "text-center text-xs leading-tight font-bold",
                        active ? "text-white" : "text-chrome-dark"
                      )}
                    >
                      {service.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="chrome-border max-h-[min(52vh,30rem)] overflow-y-auto rounded-xl p-4 shadow-2xl shadow-black/40"
              >
                <QuickPick service={selected} variant="dark" />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Mobile service selector */}
        <div className="absolute right-0 bottom-16 left-0 z-20 px-3 sm:px-4 lg:hidden">
          <div className="chrome-border mx-auto flex max-w-full gap-2 overflow-x-auto rounded-xl p-2 shadow-xl no-scrollbar">
            {activeServices.map((service) => {
              const active = selected?.id === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedId(service.id)}
                  aria-pressed={active}
                  className={cn(
                    "shrink-0 grow rounded-lg px-3 py-2 text-xs font-bold transition-all",
                    active ? "bg-royal text-white" : "text-chrome"
                  )}
                >
                  {service.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10" aria-hidden="true">
          <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
            <path d="M0 40 Q360 0 720 40 T1440 40 L1440 80 L0 80 Z" fill="url(#waveGrad)" />
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0B49E6" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#C8D3E6" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0B49E6" stopOpacity="0.9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Mobile quick pick */}
      {selected && (
        <div className="border-b border-electric/20 bg-navy px-4 py-6 lg:hidden">
          <div className="mx-auto max-w-lg">
            <QuickPick service={selected} variant="dark" />
          </div>
        </div>
      )}
    </>
  );
}

export function ServiceTicker() {
  const { mainServices: activeServices } = useCatalog();
  const tickerItems = activeServices.map((s) => s.name);

  return (
    <div className="marquee-container border-y border-electric/20 bg-near-black py-4">
      <div className="marquee-track">
        {[0, 1].map((set) => (
          <div key={set} className="flex">
            {[...tickerItems, ...tickerItems].map((name, i) => (
              <span
                key={`${set}-${i}`}
                className="mx-8 flex items-center gap-3 text-sm font-bold tracking-[0.2em] text-chrome uppercase"
              >
                {name}
                <span className="text-electric" aria-hidden="true">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
