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
      "Professional room, living room, hallway, stairs and upholstery carpet cleaning with deep extraction for a cleaner, brighter home.",
    description:
      "Refresh rooms, living rooms, hallways, stairs, couches, recliners and mattresses with professional cleaning designed to lift embedded dirt and improve the appearance of your space.",
    startingPrice: "$59.99 per room · $90 living room",
    image: images.carpetCleaning.hero,
    featured: true,
    items: [
      "Rooms",
      "Living rooms",
      "Rugs",
      "Hallways",
      "Stairs",
      "Couches",
      "Recliners",
      "Mattresses",
    ],
    benefits: [
      "Deep extraction cleaning",
      "Rooms and living rooms",
      "Rug cleaning",
      "Hallways",
      "Stairs",
      "Couch and recliner cleaning",
      "Mattress cleaning",
      "Clear starting prices",
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
      "Fridge cleaning add-on",
      "Stove cleaning add-on",
      "Move-out cleaning",
      "One-, two- and three-bedroom options",
    ],
    benefits: [
      "Regular and deep cleaning",
      "Carpet cleaning add-ons",
      "Move-out preparation",
      "Add-on appliance cleaning",
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

export const getServiceById = (id: ServiceId) =>
  services.find((s) => s.id === id);
