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
    id: "1",
    name: "Sarah M.",
    service: "carpet-cleaning",
    rating: 5,
    text: "Our living room carpet looks brand new. The extraction made a huge difference and the team was professional from start to finish.",
    date: "2025-11-12",
  },
  {
    id: "2",
    name: "James T.",
    service: "home-cleaning",
    rating: 5,
    text: "Reliable home cleaning with clear pricing. They paid attention to detail and left our place spotless before guests arrived.",
    date: "2025-10-28",
  },
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
  {
    id: "5",
    name: "Emily R.",
    service: "carpet-cleaning",
    rating: 5,
    text: "Had our couch and hallway carpets cleaned. Visible improvement right away. Booking was simple and confirmation was fast.",
    date: "2025-08-03",
  },
  {
    id: "6",
    name: "David P.",
    service: "home-cleaning",
    rating: 5,
    text: "Move-out cleaning was thorough and fairly priced. They handled appliances and every room with care.",
    date: "2025-07-19",
  },
];

export const serviceFilterOptions: { id: ServiceId | "all"; label: string }[] = [
  { id: "all", label: "All Reviews" },
  { id: "carpet-cleaning", label: "Carpet Cleaning" },
  { id: "home-cleaning", label: "Home Cleaning" },
  { id: "lawn-care", label: "Lawn Care" },
  { id: "snow-removal", label: "Snow Removal" },
];
