import { siteConfig } from "@/config/site";
import { images } from "./images";

export type ServiceId =
  | "carpet-cleaning"
  | "home-cleaning"
  | "lawn-care"
  | "snow-removal";

export interface Service {
  id: ServiceId;
  name: string;
  shortDescription: string;
  description: string;
  startingPrice: string;
  image: string;
  featured?: boolean;
  items: string[];
  benefits: string[];
}

export const services: Service[] = [
  {
    id: "carpet-cleaning",
    name: "Carpet Cleaning",
    shortDescription:
      "Thorough carpet cleaning that helps remove dirt, stains, pet messes, odors, and everyday buildup — ideal for homes, apartments, offices, move-outs, and rental properties.",
    description:
      "Bring your carpets back to life. We provide thorough carpet cleaning that helps remove dirt, stains, pet messes, odors, and everyday buildup. Our service is ideal for homes, apartments, offices, move-outs, and rental properties.",
    startingPrice: "$59.99 per room · $90 living room",
    image: images.carpetCleaning.hero,
    featured: true,
    items: [
      "Deep carpet cleaning",
      "Stain and spot treatment",
      "Pet odor & dirt removal",
      "Fast, professional service",
      "Great for move-in/move-out cleaning",
      "Affordable pricing & reliable service",
    ],
    benefits: [
      "Deep carpet cleaning",
      "Stain and spot treatment",
      "Pet odor & dirt removal",
      "Fast, professional service",
      "Great for move-in/move-out cleaning",
      "Affordable pricing & reliable service",
    ],
  },
  {
    id: "home-cleaning",
    name: "Home Cleaning",
    shortDescription:
      "Flexible residential cleaning for regular upkeep, detailed cleans and move-out preparation.",
    description:
      "Flexible residential cleaning for regular upkeep, detailed cleaning and move-out preparation.",
    startingPrice: "Standard cleaning from $150",
    image: images.homeCleaning.hero,
    items: [
      "Standard one-bedroom cleaning",
      "Carpet cleaning — per room add-on",
      "Carpet cleaning — living room add-on",
      "Inside fridge cleaning add-on",
      "Inside oven cleaning add-on",
      "Inside cabinets & drawers add-on",
      "Move-out cleaning",
      "One-, two- and three-bedroom options",
    ],
    benefits: [
      "Regular and deep cleaning",
      "Carpet cleaning add-ons",
      "Move-out preparation",
      "Inside fridge, oven, cabinets & drawers add-ons",
      "Flexible scheduling",
      "Residential property care",
    ],
  },
  {
    id: "lawn-care",
    name: "Lawn Care",
    shortDescription:
      "Keep outdoor areas neat, maintained and ready to enjoy all season long.",
    description:
      "Keep outdoor areas neat, maintained and ready to enjoy.",
    startingPrice: "from $60",
    image: images.lawnCare.hero,
    items: [
      "One-time lawn mowing",
      "Yard cleanup",
    ],
    benefits: [
      "Professional mowing",
      "Yard debris removal",
      "Neat, maintained lawns",
      "Residential outdoor care",
    ],
  },
  {
    id: "snow-removal",
    name: "Snow Removal",
    shortDescription:
      "One-time snow removal or monthly residential service — driveway, sidewalk, walkway and steps cleared.",
    description:
      "Choose one-time snow removal with driveway, sidewalk, walkway and steps included, or sign up for residential monthly service. Optional ice-melt add-on available.",
    startingPrice: "One-time $80 · $200/mo residential",
    image: images.snowRemoval.hero,
    items: [
      "One-time snow removal — $80",
      "Driveway, sidewalk, walkway & steps included",
      "Residential monthly — $200/mo",
      "Ice-melt add-on",
    ],
    benefits: [
      "One-time service from $80",
      "Driveway, sidewalk, walkway & steps",
      "Residential monthly option",
      "Ice-melt application available",
      "Winter safety focus",
    ],
  },
];

const PAUSED_SERVICE_IDS: ServiceId[] = siteConfig.homeCleaningEnabled
  ? []
  : ["home-cleaning"];

export const getServiceById = (id: ServiceId) =>
  services.find((s) => s.id === id);

export function isServiceActive(id: ServiceId): boolean {
  return !PAUSED_SERVICE_IDS.includes(id);
}

export function getActiveServices(): Service[] {
  return services.filter((s) => isServiceActive(s.id));
}
