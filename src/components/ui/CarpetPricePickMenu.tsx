"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  carpetAddonOptions,
  carpetPackageIncludesLabel,
  carpetPlanOptions,
  formatCarpetPrice,
  type CarpetPlanId,
} from "@/data/carpet-pricing";

interface CarpetPricePickMenuProps {
  variant?: "light" | "dark" | "card";
  className?: string;
  interactive?: boolean;
  showAddons?: boolean;
  selectedPlan?: CarpetPlanId;
  selectedAddons?: string[];
  onPlanSelect?: (plan: CarpetPlanId) => void;
  onAddonToggle?: (label: string) => void;
  planError?: string;
}

function buildBookingHref(plan?: CarpetPlanId, addon?: string) {
  const params = new URLSearchParams({ service: "carpet-cleaning" });
  if (plan) params.set("plan", plan);
  if (addon) params.set("addon", addon);
  return `/booking?${params.toString()}`;
}

export function CarpetPricePickMenu({
  variant = "card",
  className,
  interactive = false,
  showAddons = false,
  selectedPlan,
  selectedAddons = [],
  onPlanSelect,
  onAddonToggle,
  planError,
}: CarpetPricePickMenuProps) {
  const isDark = variant === "dark";
  const isCard = variant === "card";

  const planRowClass = (selected: boolean) =>
    cn(
      "w-full rounded-xl border-2 p-4 text-left transition-all",
      interactive && selected
        ? "border-royal bg-ice shadow-sm"
        : isDark
          ? "border-white/20 bg-white/10 hover:bg-white/15"
          : "border-navy/10 bg-white hover:border-royal/30",
      !interactive && "block"
    );

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <p
          className={cn(
            "text-xs font-semibold tracking-wide uppercase",
            isDark ? "text-ice/70" : "text-navy/50"
          )}
        >
          Select plan
        </p>
        <p className={cn("mt-1 text-xs", isDark ? "text-ice/60" : "text-navy/50")}>
          Every package includes {carpetPackageIncludesLabel.toLowerCase()}.
        </p>
        <div className="mt-3 space-y-2">
          {carpetPlanOptions.map((plan) => {
            const selected = selectedPlan === plan.id;
            const content = (
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p
                      className={cn(
                        "font-heading text-sm font-bold uppercase",
                        isDark ? "text-white" : "text-navy"
                      )}
                    >
                      {plan.label}
                    </p>
                    {plan.quickPick && (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase",
                          isDark ? "bg-electric/30 text-electric" : "bg-royal/10 text-royal"
                        )}
                      >
                        Quick pick
                      </span>
                    )}
                  </div>
                  <p className={cn("mt-1 text-xs", isDark ? "text-ice/70" : "text-navy/60")}>
                    {plan.description}
                  </p>
                </div>
                <p
                  className={cn(
                    "shrink-0 font-heading text-lg font-bold",
                    isDark ? "text-electric" : "text-royal"
                  )}
                >
                  {plan.priceLabel}
                </p>
              </div>
            );

            if (interactive) {
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => onPlanSelect?.(plan.id)}
                  className={planRowClass(selected)}
                >
                  {content}
                </button>
              );
            }

            return (
              <Link key={plan.id} href={buildBookingHref(plan.id)} className={planRowClass(false)}>
                {content}
              </Link>
            );
          })}
        </div>
        {planError && <p className="mt-1 text-xs text-red-500">{planError}</p>}
      </div>

      {showAddons && (
        <div>
          <p
            className={cn(
              "text-xs font-semibold tracking-wide uppercase",
              isDark ? "text-ice/70" : "text-navy/50"
            )}
          >
            Add-ons (optional)
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
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
                  : isCard || isDark
                    ? isDark
                      ? "bg-white/10 text-ice hover:bg-white/20"
                      : "bg-navy/5 text-navy/70 hover:bg-navy/10"
                    : "border border-navy/10 bg-white text-navy hover:border-royal/30"
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
      )}
    </div>
  );
}
