"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  BEDROOM_OPTIONS,
  CARPET_PER_ROOM_PRICE,
  carpetAddonOptions,
  formatCarpetPrice,
  getCarpetBedroomPrice,
  type CarpetBedroomCount,
} from "@/data/carpet-pricing";

interface CarpetPricePickMenuProps {
  variant?: "light" | "dark" | "card";
  className?: string;
  showMinimumNote?: boolean;
  interactive?: boolean;
  selectedBedrooms?: CarpetBedroomCount;
  selectedAddons?: string[];
  onBedroomSelect?: (bedrooms: CarpetBedroomCount) => void;
  onAddonToggle?: (label: string) => void;
  bedroomError?: string;
}

function buildBookingHref(bedrooms?: CarpetBedroomCount, addon?: string) {
  const params = new URLSearchParams({ service: "carpet-cleaning" });
  if (bedrooms) params.set("bedrooms", bedrooms);
  if (addon) params.set("addon", addon);
  return `/booking?${params.toString()}`;
}

export function CarpetPricePickMenu({
  variant = "card",
  className,
  showMinimumNote = false,
  interactive = false,
  selectedBedrooms,
  selectedAddons = [],
  onBedroomSelect,
  onAddonToggle,
  bedroomError,
}: CarpetPricePickMenuProps) {
  const isDark = variant === "dark";
  const isCard = variant === "card";

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <p
          className={cn(
            "text-xs font-semibold tracking-wide uppercase",
            isDark ? "text-ice/70" : "text-navy/50"
          )}
        >
          Bedroom packages
        </p>
        <div
          className={cn(
            "mt-2 overflow-hidden rounded-xl border",
            isDark ? "border-white/20 bg-white/10" : "border-navy/10 bg-white"
          )}
        >
          <div
            className={cn(
              "grid grid-cols-2 px-4 py-2 text-xs font-semibold tracking-wide uppercase",
              isDark ? "bg-white/10 text-ice/70" : "bg-navy/5 text-navy/60"
            )}
          >
            <span>Bedrooms</span>
            <span className="text-right">Price</span>
          </div>
          {BEDROOM_OPTIONS.map((option) => {
            const selected = selectedBedrooms === option.value;
            const rowClass = cn(
              "grid w-full grid-cols-2 border-t px-4 py-3 text-left text-sm transition-colors",
              isDark
                ? "border-white/10 hover:bg-white/10"
                : "border-navy/10 hover:bg-ice",
              interactive && selected && "border-l-4 border-l-royal bg-ice"
            );
            const content = (
              <>
                <span className={cn("font-medium", isDark ? "text-white" : "text-navy")}>
                  {option.label}
                </span>
                <span
                  className={cn(
                    "text-right font-heading font-bold",
                    isDark ? "text-electric" : "text-royal"
                  )}
                >
                  {formatCarpetPrice(getCarpetBedroomPrice(option.value))}
                </span>
              </>
            );

            if (interactive) {
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onBedroomSelect?.(option.value)}
                  className={rowClass}
                >
                  {content}
                </button>
              );
            }

            return (
              <Link key={option.value} href={buildBookingHref(option.value)} className={rowClass}>
                {content}
              </Link>
            );
          })}
        </div>
        {bedroomError && <p className="mt-1 text-xs text-red-500">{bedroomError}</p>}
      </div>

      <div>
        <p
          className={cn(
            "text-xs font-semibold tracking-wide uppercase",
            isDark ? "text-ice/70" : "text-navy/50"
          )}
        >
          Options
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {interactive ? (
            <span
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold",
                isDark ? "bg-white/15 text-white" : "bg-royal/10 text-royal"
              )}
            >
              Per room · {formatCarpetPrice(CARPET_PER_ROOM_PRICE)}
            </span>
          ) : (
            <Link
              href={buildBookingHref("1")}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold transition-all",
                isCard || isDark
                  ? isDark
                    ? "bg-white/15 text-white hover:bg-white/25"
                    : "bg-royal text-white hover:bg-electric"
                  : "border border-navy/10 bg-white text-navy hover:border-royal/30"
              )}
            >
              Per room · {formatCarpetPrice(CARPET_PER_ROOM_PRICE)}
            </Link>
          )}
          {carpetAddonOptions.map((option) => {
            const selected = selectedAddons.includes(option.label);
            const pillClass = cn(
              "rounded-full px-4 py-2 text-xs font-medium transition-all",
              interactive
                ? selected
                  ? "bg-royal text-white"
                  : isDark
                    ? "bg-white/10 text-ice hover:bg-white/20"
                    : "bg-navy/5 text-navy/70 hover:bg-navy/10"
                : isDark
                  ? "bg-white/10 text-ice hover:bg-white/20"
                  : "bg-navy/5 text-navy/70 hover:bg-navy/10"
            );

            if (interactive) {
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onAddonToggle?.(option.label)}
                  className={pillClass}
                >
                  {option.label} · {formatCarpetPrice(option.price)}
                </button>
              );
            }

            return (
              <Link
                key={option.id}
                href={buildBookingHref(undefined, option.label)}
                className={pillClass}
              >
                {option.label} · {formatCarpetPrice(option.price)}
              </Link>
            );
          })}
        </div>
      </div>

      {showMinimumNote && (
        <p className={cn("text-xs", isDark ? "text-ice/60" : "text-navy/50")}>
          $99 minimum service · $59.99 per room · $90 living room option
        </p>
      )}
    </div>
  );
}
