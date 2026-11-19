"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatAddonPrice, packageIncludesLabel } from "@/data/plan-pricing";
import { useCatalog } from "@/lib/service-catalog/client";
import { addonPriceLabel, groupPlans, planPriceLabel } from "@/lib/service-catalog/format";

interface ServicePricePickMenuProps {
  serviceId: string;
  variant?: "light" | "dark" | "card";
  className?: string;
  /** Interactive mode is used inside the booking form; otherwise rows link to /booking. */
  interactive?: boolean;
  showAddons?: boolean;
  selectedPlan?: string;
  selectedAddons?: string[];
  onPlanSelect?: (plan: string) => void;
  onAddonToggle?: (label: string) => void;
  planError?: string;
}

function buildBookingHref(serviceId: string, plan?: string, addon?: string) {
  const params = new URLSearchParams({ service: serviceId });
  if (plan) params.set("plan", plan);
  if (addon) params.set("addon", addon);
  return `/booking?${params.toString()}`;
}

export function ServicePricePickMenu({
  serviceId,
  variant = "card",
  className,
  interactive = false,
  showAddons = false,
  selectedPlan,
  selectedAddons = [],
  onPlanSelect,
  onAddonToggle,
  planError,
}: ServicePricePickMenuProps) {
  const { getService } = useCatalog();
  const service = getService(serviceId);
  const groups = service ? groupPlans(service.plans) : [];

  // Which service type tab is open. Follows the selected plan; otherwise the first group.
  const selectedGroupId = groups.find((g) => g.plans.some((p) => p.id === selectedPlan))?.id;
  const [openGroupId, setOpenGroupId] = useState<string | undefined>(undefined);
  const activeGroup =
    groups.find((g) => g.id === (openGroupId ?? selectedGroupId)) ?? groups[0];

  if (!service || groups.length === 0 || !activeGroup) return null;

  const includesLabel = packageIncludesLabel(service);
  const isDark = variant === "dark";
  const isCard = variant === "card";
  const hasMultipleGroups = groups.length > 1;

  const pickGroup = (groupId: string) => {
    setOpenGroupId(groupId);
    if (!interactive) return;
    const group = groups.find((g) => g.id === groupId);
    // Switching service type clears the old plan so a one-time plan can never be
    // booked together with a monthly plan.
    const next = group?.plans.find((p) => p.quickPick) ?? group?.plans[0];
    if (next && !group?.plans.some((p) => p.id === selectedPlan)) onPlanSelect?.(next.id);
  };

  const planRowClass = (selected: boolean) =>
    cn(
      "w-full rounded-xl border-2 p-4 text-left transition-all",
      interactive && selected
        ? "border-royal bg-ice shadow-sm"
        : isDark
          ? "border-white/20 bg-white/10 hover:bg-white/15"
          : "border-navy/10 bg-white hover:border-royal/40",
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
          {hasMultipleGroups ? "Choose your service type" : "Select plan"}
        </p>

        {hasMultipleGroups && (
          <div
            role="tablist"
            aria-label="Service type"
            className={cn(
              "mt-2 grid gap-2",
              groups.length === 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-3"
            )}
          >
            {groups.map((group) => {
              const active = group.id === activeGroup.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => pickGroup(group.id)}
                  className={cn(
                    "rounded-xl border-2 px-3 py-2.5 text-center text-xs leading-tight font-bold transition-all",
                    active
                      ? "border-royal bg-royal text-white shadow-md shadow-royal/30"
                      : isDark
                        ? "border-white/20 bg-white/10 text-ice hover:bg-white/15"
                        : "border-navy/10 bg-white text-navy/70 hover:border-royal/40"
                  )}
                >
                  {group.label}
                </button>
              );
            })}
          </div>
        )}

        {includesLabel ? (
          <p className={cn("mt-2 text-xs", isDark ? "text-ice/60" : "text-navy/50")}>
            Every package includes {includesLabel.toLowerCase()}.
          </p>
        ) : null}

        <div className="mt-3 space-y-2">
          {activeGroup.plans.map((plan) => {
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
                  {plan.description ? (
                    <p className={cn("mt-1 text-xs", isDark ? "text-ice/70" : "text-navy/60")}>
                      {plan.description}
                    </p>
                  ) : null}
                </div>
                <p
                  className={cn(
                    "shrink-0 text-right font-heading text-base font-bold",
                    isDark ? "text-electric" : "text-royal"
                  )}
                >
                  {planPriceLabel(plan)}
                </p>
              </div>
            );

            if (interactive) {
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => onPlanSelect?.(plan.id)}
                  aria-pressed={selected}
                  className={planRowClass(selected)}
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={plan.id}
                href={buildBookingHref(serviceId, plan.id)}
                className={planRowClass(false)}
              >
                {content}
              </Link>
            );
          })}
        </div>
        {planError && <p className="mt-1 text-xs text-red-500">{planError}</p>}
      </div>

      {showAddons && service.addons.length > 0 && (
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
            {service.addons.map((option) => {
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
                    {option.label} ·{" "}
                    {option.price != null && !option.priceDisplay
                      ? formatAddonPrice(option.price)
                      : addonPriceLabel(option)}
                  </button>
                );
              }

              return (
                <Link
                  key={option.id}
                  href={buildBookingHref(serviceId, undefined, option.label)}
                  className={pillClass}
                >
                  {option.label} · {addonPriceLabel(option)}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
