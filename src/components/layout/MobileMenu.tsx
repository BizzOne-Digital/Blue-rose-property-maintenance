"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { navLinks, serviceLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-[60] lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.nav
        className="absolute top-0 right-0 flex h-full w-[min(100%,320px)] flex-col gradient-bg-radial p-6 shadow-2xl"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        aria-label="Mobile navigation"
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white p-1.5">
              <Image
                src="/images/blue-rose-logo.png"
                alt="Blue Rose"
                width={44}
                height={44}
                className="h-10 w-10 object-contain"
              />
            </div>
            <div>
              <p className="font-heading text-sm font-bold text-white">Blue Rose</p>
              <p className="text-[10px] tracking-wider text-ice/70 uppercase">
                Property Maintenance
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-white"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <ul className="flex flex-col gap-1">
          {navLinks.map((link, i) => {
            const isServices = link.href === "/services";

            if (isServices) {
              return (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => setServicesOpen((prev) => !prev)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-4 py-3 text-lg font-medium transition-colors",
                      pathname === "/services"
                        ? "bg-white/10 text-white"
                        : "text-ice/80 hover:bg-white/5 hover:text-white"
                    )}
                    aria-expanded={servicesOpen}
                  >
                    Services
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-200",
                        servicesOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden pl-4"
                      >
                        <li>
                          <Link
                            href="/services"
                            onClick={onClose}
                            className="block rounded-lg px-4 py-2.5 text-sm font-medium text-ice/90 hover:bg-white/5"
                          >
                            All Services
                          </Link>
                        </li>
                        {serviceLinks.map((s) => (
                          <li key={s.href}>
                            <Link
                              href={s.href}
                              onClick={onClose}
                              className="block rounded-lg px-4 py-2.5 text-sm text-ice/70 hover:bg-white/5 hover:text-white"
                            >
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            }

            return (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-lg font-medium transition-colors",
                    pathname === link.href
                      ? "bg-white/10 text-white"
                      : "text-ice/80 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <motion.div
          className="mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/booking"
            onClick={onClose}
            className="block w-full rounded-xl bg-gradient-to-r from-electric to-royal py-4 text-center font-semibold text-white shadow-lg shadow-electric/30"
          >
            Book a Service
          </Link>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
}
