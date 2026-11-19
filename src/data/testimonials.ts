import type { ServiceId } from "./services";

/**
 * IMPORTANT: All sample testimonials below are placeholders for development only.
 * Replace every review with verified Google review content before production launch.
 * Do not invent review counts or claim unverified ratings beyond the stated Google rating.
 */
export interface Testimonial {
  id: string;
  name: string;
  service: ServiceId;
  rating: number;
  text: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "3",
    name: "Linda K.",
    service: "lawn-care",
    rating: 5,
    text: "The lawn mowing and yard cleanup transformed our outdoor space. Neat stripes and all debris removed — highly recommend.",
    date: "2025-09-15",
  },
  {
    id: "4",
    name: "Robert H.",
    service: "snow-removal",
    rating: 5,
    text: "Driveway and walkway were cleared quickly after the storm. Ice-melt add-on made a real difference for safety.",
    date: "2025-01-22",
  },
];

const allServiceFilterOptions: { id: ServiceId | "all"; label: string }[] = [
  { id: "all", label: "All Reviews" },
  { id: "lawn-care", label: "Lawn Care" },
  { id: "snow-removal", label: "Snow Removal" },
  { id: "junk-removal", label: "Junk Removal" },
];

export const allServiceFilterOptionsList = allServiceFilterOptions;

export function getVisibleTestimonials(activeServiceIds?: string[]) {
  if (!activeServiceIds) return testimonials;
  const active = new Set(activeServiceIds);
  return testimonials.filter((t) => active.has(t.service));
}

export function getServiceFilterOptions(activeServiceIds: string[]) {
  const active = new Set(activeServiceIds);
  return allServiceFilterOptions.filter(
    (opt) => opt.id === "all" || active.has(opt.id)
  );
}
