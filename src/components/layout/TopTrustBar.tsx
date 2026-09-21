"use client";

import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { formatPhoneForTel } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function TopTrustBar({ embedded = false }: { embedded?: boolean }) {
  const telHref = `tel:${formatPhoneForTel(siteConfig.phone)}`;

  return (
    <div
      className={cn(
        "bg-[#0056b3]",
        embedded ? "relative py-2.5" : "fixed top-0 right-0 left-0 z-[60] py-2.5"
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:gap-4 lg:px-8">
        <p className="text-center text-xs font-bold tracking-wide text-white uppercase sm:text-left sm:text-sm">
          Professional Carpet Cleaning in {siteConfig.city}
        </p>
        <a
          href={telHref}
          className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-1.5 text-sm font-bold text-[#0056b3] shadow-sm transition-colors hover:bg-ice"
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{siteConfig.phone}</span>
        </a>
      </div>
    </div>
  );
}
