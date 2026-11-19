import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PhoneLink } from "@/components/analytics/PhoneLink";

export function MobileBookingBar() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 grid grid-cols-2 gap-2 border-t border-electric/30 bg-near-black/95 p-3 shadow-lg backdrop-blur-md sm:hidden">
      <PhoneLink
        location="mobile-sticky-bar"
        className="flex items-center justify-center gap-2 rounded-xl border border-white/30 py-3.5 text-center text-sm font-bold text-white"
        aria-label={`Call ${siteConfig.phone}`}
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call Now
      </PhoneLink>
      <Link
        href="/booking"
        className="block rounded-xl bg-gradient-to-r from-royal to-electric py-3.5 text-center text-sm font-bold text-white shadow-md shadow-royal/40"
      >
        Book a Service
      </Link>
    </div>
  );
}
