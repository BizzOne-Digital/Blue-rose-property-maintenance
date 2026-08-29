"use client";

import { Sparkles } from "@/components/ui/Sparkles";

export function TrustBar() {
  const text =
    "5-Star Rated • Reliable Service • Transparent Pricing • One Company for Every Season • ";

  return (
    <div className="relative marquee-container overflow-hidden bg-gradient-to-r from-navy via-royal to-navy py-3">
      <div className="marquee-track whitespace-nowrap">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="mx-4 text-sm font-medium tracking-wide text-white/90"
          >
            {text.repeat(3)}
          </span>
        ))}
      </div>
      <Sparkles count={6} className="opacity-40" />
    </div>
  );
}
