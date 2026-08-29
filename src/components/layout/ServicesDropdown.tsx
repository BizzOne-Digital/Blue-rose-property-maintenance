"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { serviceLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = pathname === "/services" || pathname.startsWith("/services");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "relative flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors",
          isActive || open ? "text-royal" : "text-navy/70 hover:text-royal"
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Services
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 opacity-60 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
        {(isActive || open) && (
          <motion.span
            layoutId="nav-indicator"
            className="absolute right-3 bottom-0 left-3 h-0.5 rounded-full bg-royal"
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 z-50 mt-2 w-56 -translate-x-1/2 overflow-hidden rounded-xl border border-navy/5 bg-white shadow-xl shadow-navy/10"
            role="menu"
          >
            <div className="p-1.5">
              <Link
                href="/services"
                className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-ice hover:text-royal"
                role="menuitem"
              >
                All Services
              </Link>
              <div className="my-1 h-px bg-navy/5" />
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-4 py-2.5 text-sm text-navy/70 transition-colors hover:bg-ice hover:text-royal"
                  role="menuitem"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
