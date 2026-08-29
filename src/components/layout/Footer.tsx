import Link from "next/link";
import Image from "next/image";
import { Star, Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { navLinks, serviceLinks } from "@/data/navigation";
import { formatPhoneForTel } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path
            d="M0 200 Q300 100 600 200 T1200 200 L1200 400 L0 400 Z"
            fill="url(#footerGrad)"
          />
          <defs>
            <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#064EDB" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#2D7FFF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#064EDB" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5 inline-block rounded-2xl bg-white p-2.5 sm:p-3">
              <Image
                src="/images/blue-rose-logo.png"
                alt="Blue Rose Property Maintenance"
                width={120}
                height={120}
                className="h-24 w-24 object-contain sm:h-28 sm:w-28"
              />
            </div>
            <h3 className="font-heading text-xl font-bold">Blue Rose</h3>
            <p className="text-sm text-ice/70">Property Maintenance</p>
            <p className="mt-4 text-sm leading-relaxed text-ice/60">
              Professional carpet cleaning, home cleaning, lawn care and snow removal in{" "}
              {siteConfig.city} — one trusted team for year-round property care.
            </p>
            <div className="mt-4 flex items-center gap-1 text-sm text-ice/80">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{siteConfig.googleRating} Google Rating</span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold tracking-wider uppercase">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ice/70 transition-colors hover:text-electric"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold tracking-wider uppercase">
              Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ice/70 transition-colors hover:text-electric"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold tracking-wider uppercase">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-ice/70">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                <a href={`tel:${formatPhoneForTel(siteConfig.phone)}`} className="hover:text-white">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                <span>{siteConfig.serviceArea}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                <div>
                  <p>{siteConfig.businessHours.weekdays}</p>
                  <p>{siteConfig.businessHours.saturday}</p>
                  <p>{siteConfig.businessHours.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-ice/50">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-ice/50">
            Prices are subject to confirmation.
          </p>
          <Link
            href="/booking"
            className="rounded-full bg-gradient-to-r from-electric to-royal px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-electric/20 transition-transform hover:scale-105"
          >
            Book a Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
