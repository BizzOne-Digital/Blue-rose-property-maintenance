"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ServicesDropdown } from "@/components/layout/ServicesDropdown";
import { TopTrustBar } from "@/components/layout/TopTrustBar";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-shadow duration-300",
          scrolled ? "shadow-lg shadow-navy/10" : "shadow-sm"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="border-b border-navy/5 bg-white">
          <Link
            href="/"
            className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2 sm:py-3"
          >
            <Image
              src="/images/blue-rose-logo.png"
              alt="Blue Rose Property Maintenance"
              width={120}
              height={120}
              className="h-20 w-auto object-contain sm:h-24"
              priority
            />
          </Link>
        </div>

        <TopTrustBar embedded />

        <div className="border-b border-navy/5 bg-white/98 backdrop-blur-md">
          <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2.5 sm:px-4 lg:px-8">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-navy lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-6 w-6" />
            </button>

            <nav
              className="hidden flex-1 items-center justify-center gap-0.5 lg:flex"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => {
                const active = pathname === link.href;
                const isServices = link.href === "/services";

                if (isServices) {
                  return <ServicesDropdown key={link.href} />;
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-3.5 py-2 text-sm font-medium transition-colors",
                      active ? "text-royal" : "text-navy/70 hover:text-royal"
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute right-3 bottom-0 left-3 h-0.5 rounded-full bg-royal"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/booking"
              className={cn(
                "rounded-md bg-[#0056b3] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#064EDB] sm:px-5 sm:py-2.5 sm:text-sm",
                "lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2"
              )}
            >
              Book a Service
            </Link>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
