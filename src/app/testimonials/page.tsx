import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    `Customer reviews and testimonials for Blue Rose Property Maintenance in ${siteConfig.city}.`,
};

export { default } from "./TestimonialsClient";
