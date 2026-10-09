import { siteConfig } from "@/config/site";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
] as const;

const allServiceLinks = [
  { href: "/services#carpet-cleaning", label: "Carpet Cleaning" },
  { href: "/services#home-cleaning", label: "Home Cleaning" },
  { href: "/services#lawn-care", label: "Lawn Care" },
  { href: "/services#snow-removal", label: "Snow Removal" },
] as const;

export const serviceLinks = siteConfig.homeCleaningEnabled
  ? allServiceLinks
  : allServiceLinks.filter((link) => !link.href.includes("home-cleaning"));
