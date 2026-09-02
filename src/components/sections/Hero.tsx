"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { images } from "@/data/images";
import { services } from "@/data/services";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { CarpetPricePickMenu } from "@/components/ui/CarpetPricePickMenu";
import type { ServiceId } from "@/data/services";

const serviceImages: Record<ServiceId, string> = {
  "carpet-cleaning": images.carpetCleaning.hero,
  "home-cleaning": images.homeCleaning.hero,
  "lawn-care": images.lawnCare.hero,
  "snow-removal": images.snowRemoval.hero,
};

function CarpetIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
      <rect x="6" y="14" width="20" height="10" rx="2" stroke={active ? "#064EDB" : "#9CA3AF"} strokeWidth="1.5" />
      <path d="M10 14V10h12v4M8 24v2M24 24v2" stroke={active ? "#064EDB" : "#9CA3AF"} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 18h4" stroke={active ? "#2D7FFF" : "#D1D5DB"} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
      <path d="M6 14l10-8 10 8v12H6V14z" stroke={active ? "#064EDB" : "#9CA3AF"} strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="13" y="18" width="6" height="8" stroke={active ? "#064EDB" : "#9CA3AF"} strokeWidth="1.5" />
    </svg>
  );
}

function LawnIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
      <path d="M6 24h20" stroke={active ? "#064EDB" : "#9CA3AF"} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="8" y="16" width="16" height="8" rx="1" stroke={active ? "#064EDB" : "#9CA3AF"} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill={active ? "#2D7FFF" : "#D1D5DB"} />
      <circle cx="20" cy="10" r="2" fill={active ? "#2D7FFF" : "#D1D5DB"} />
    </svg>
  );
}

function SnowIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
      <path d="M8 22h16M10 18l12-6M22 18L10 12" stroke={active ? "#064EDB" : "#9CA3AF"} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="8" r="2" fill={active ? "#2D7FFF" : "#D1D5DB"} />
    </svg>
  );
}

const serviceIcons: Record<ServiceId, React.FC<{ active: boolean }>> = {
  "carpet-cleaning": CarpetIcon,
  "home-cleaning": HomeIcon,
  "lawn-care": LawnIcon,
  "snow-removal": SnowIcon,
};

export function Hero() {
  const [selectedService, setSelectedService] = useState<ServiceId>("carpet-cleaning");

  return (
    <>
    <section className="relative min-h-[calc(100dvh-var(--site-header-offset))] overflow-hidden bg-navy page-header-offset pb-20 md:pb-0">
      {/* Background image */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedService}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src={serviceImages[selectedService]}
              alt={`${services.find((s) => s.id === selectedService)?.name} service`}
              fill
              className="object-cover object-center"
              priority={selectedService === "carpet-cleaning"}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Left gradient overlay — matches reference */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(5, 11, 24, 0.97) 0%, rgba(5, 11, 24, 0.88) 35%, rgba(5, 11, 24, 0.45) 60%, rgba(5, 11, 24, 0.1) 80%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b18]/60 via-transparent to-transparent" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-var(--site-header-offset)-2rem)] max-w-7xl flex-col justify-center px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="w-full max-w-2xl min-w-0">
          <motion.p
            className="mb-4 text-[10px] font-semibold tracking-[0.12em] text-electric uppercase sm:text-xs sm:tracking-[0.2em]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Professional Property Care • All Year Round
          </motion.p>

          <motion.h1
            className="font-heading text-[clamp(1.75rem,8vw,3.75rem)] leading-[1.08] font-extrabold tracking-tight text-white uppercase break-words"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            A Cleaner Home.
            <br />
            A Better Yard.
            <br />
            Every Season.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-md text-sm leading-relaxed text-white/80 sm:text-base"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Professional carpet cleaning, home cleaning, lawn care and snow removal—all from one trusted {siteConfig.city} team.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <Link
              href="/booking"
              className="rounded-md bg-[#0056b3] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-royal/30 transition-all hover:bg-[#064EDB] hover:shadow-xl"
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

          {/* Google rating */}
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xs font-medium text-white/90 sm:text-sm">
              {siteConfig.googleRating}-Star Google Rating
            </span>
          </motion.div>
        </div>
      </div>

      {/* Floating service selector — bottom right */}
      <motion.div
        className="absolute right-4 bottom-16 z-20 hidden md:right-8 md:bottom-20 md:block lg:right-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="flex flex-col items-end gap-3">
          <div className="flex overflow-hidden rounded-xl bg-white shadow-2xl shadow-navy/20">
            {services.map((service) => {
              const Icon = serviceIcons[service.id];
              const active = selectedService === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedService(service.id)}
                  className={cn(
                    "flex w-[7.5rem] flex-col items-center gap-2 px-4 py-5 transition-all lg:w-[8.5rem]",
                    active ? "bg-ice" : "hover:bg-gray-50"
                  )}
                  aria-pressed={active}
                >
                  <Icon active={active} />
                  <span
                    className={cn(
                      "text-center text-[11px] leading-tight font-semibold",
                      active ? "text-royal" : "text-gray-400"
                    )}
                  >
                    {service.name}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedService === "carpet-cleaning" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-[min(100vw-2rem,28rem)] rounded-xl bg-white p-4 shadow-2xl shadow-navy/20"
            >
              <CarpetPricePickMenu />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Mobile service selector */}
      <div className="absolute right-0 bottom-16 left-0 z-20 px-3 sm:px-4 md:hidden">
        <div className="mx-auto flex max-w-full flex-col gap-2">
          <div className="flex gap-2 overflow-x-auto rounded-xl bg-white p-2 shadow-xl no-scrollbar">
            {services.map((service) => {
              const active = selectedService === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedService(service.id)}
                  className={cn(
                    "shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition-all",
                    active ? "bg-royal text-white" : "text-gray-500"
                  )}
                >
                  {service.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom wave swoosh */}
      <div className="absolute right-0 bottom-0 left-0 z-10 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path
            d="M0 40 Q360 0 720 40 T1440 40 L1440 80 L0 80 Z"
            fill="url(#waveGrad)"
          />
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#064EDB" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#2D7FFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#064EDB" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>

    {selectedService === "carpet-cleaning" && (
      <div className="border-b border-navy/5 bg-white px-4 py-6 shadow-sm md:hidden">
        <div className="mx-auto max-w-lg">
          <CarpetPricePickMenu />
        </div>
      </div>
    )}
    </>
  );
}

export function ServiceTicker() {
  const tickerItems = services.map((s) => s.name);

  return (
    <div className="marquee-container border-y border-royal/10 bg-white py-4">
      <div className="marquee-track">
        {[0, 1].map((set) => (
          <div key={set} className="flex">
            {tickerItems.map((name) => (
              <span
                key={`${set}-${name}`}
                className="mx-8 flex items-center gap-3 text-sm font-semibold tracking-wider text-navy/40 uppercase"
              >
                {name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
