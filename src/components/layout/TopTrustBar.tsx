import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { PhoneLink } from "@/components/analytics/PhoneLink";

export function TopTrustBar({ embedded = false }: { embedded?: boolean }) {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-royal via-electric to-royal",
        embedded ? "relative py-2.5" : "fixed top-0 right-0 left-0 z-[60] py-2.5"
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:gap-4 lg:px-8">
        <p className="text-center text-xs font-bold tracking-wide text-white uppercase sm:text-left sm:text-sm">
          Lawn Care · Snow Removal · Junk Removal in {siteConfig.city}
        </p>
        <PhoneLink
          location="top-bar"
          className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-1.5 text-sm font-bold text-royal shadow-sm transition-colors hover:bg-ice"
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{siteConfig.phoneCallToAction}</span>
          <span className="text-royal/40" aria-hidden="true">·</span>
          <span>{siteConfig.phone}</span>
        </PhoneLink>
      </div>
    </div>
  );
}
