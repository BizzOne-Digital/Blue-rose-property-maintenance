"use client";

import { CheckCircle, Shield, Star, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const items = [
  { icon: CheckCircle, label: `Serving ${siteConfig.city}` },
  { icon: Shield, label: "Fully Insured" },
  { icon: Star, label: "Satisfaction Guaranteed" },
  { icon: Clock, label: "Reliable, On-Time Service" },
];

export function TopTrustBar({ embedded = false }: { embedded?: boolean }) {
  return (
    <div
      className={cn(
        "bg-[#050b18]",
        embedded ? "relative py-2" : "fixed top-0 right-0 left-0 z-[60] py-2.5"
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-4 sm:gap-x-8 lg:justify-between lg:px-8">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <item.icon className="h-3.5 w-3.5 text-electric" strokeWidth={2.5} />
            <span className="text-[10px] font-medium tracking-wide text-white/90 sm:text-xs">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
