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

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const homeStyle = isHome && !scrolled;

  return (
    <>
      <motion.header
        className={cn(
          "fixed right-0 left-0 z-50 transition-all duration-300",
          isHome ? "top-10" : "top-0",
          homeStyle
            ? "bg-white shadow-sm"
            : scrolled || !isHome
              ? "bg-white/98 shadow-md backdrop-blur-md"
              : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 lg:px-8">
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <div className="rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-navy/5 sm:p-2">
              <Image
                src="/images/blue-rose-logo.png"
                alt="Blue Rose Property Maintenance logo"
                width={72}
                height={72}
                className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-heading text-base leading-tight font-bold tracking-tight text-navy">
                Blue Rose
              </p>
              <p className="text-[11px] leading-tight font-medium tracking-wider text-royal uppercase">
                Property Maintenance
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
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
                    "relative flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors",
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

          <div className="flex items-center gap-3">
            <Link
              href="/booking"
              className="hidden rounded-md bg-[#0056b3] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#064EDB] sm:inline-flex"
            >
              Book a Service
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-navy lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu onClose={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
