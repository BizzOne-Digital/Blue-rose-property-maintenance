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
      "Professional room, living room, hallway and upholstery carpet cleaning with deep extraction for a cleaner, brighter home.",
    description:
      "Refresh rooms, living rooms, hallways, couches, recliners and mattresses with professional cleaning designed to lift embedded dirt and improve the appearance of your space.",
    startingPrice: "$59.99 per room · $90 living room",
    image: images.carpetCleaning.hero,
    featured: true,
    items: [
      "Rooms",
      "Living rooms",
      "Rugs",
      "Hallways",
      "Couches",
      "Recliners",
      "Mattresses",
    ],
    benefits: [
      "Deep extraction cleaning",
      "Rooms and living rooms",
      "Rug cleaning",
      "Hallways",
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
    startingPrice: "from $150",
    image: images.homeCleaning.hero,
    items: [
      "Standard one-bedroom cleaning",
      "Fridge cleaning add-on",
      "Stove cleaning add-on",
      "Move-out cleaning",
      "One-, two- and three-bedroom options",
    ],
    benefits: [
      "Regular and deep cleaning",
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
      "Sidewalks snow removal with optional driveway clearing to keep your property safer in winter.",
    description:
      "Sidewalks snow removal with optional driveway clearing and ice-melt add-ons to keep walkways safer during winter weather.",
    startingPrice: "from $99",
    image: images.snowRemoval.hero,
    items: [
      "Sidewalks snow removal",
      "Driveway clearing add-on",
      "Ice-melt add-on",
    ],
    benefits: [
      "Sidewalks snow removal",
      "Driveway clearing add-on",
      "Ice-melt application",
      "Residential snow service",
      "Winter safety focus",
    ],
  },
];

export const getServiceById = (id: ServiceId) =>
  services.find((s) => s.id === id);
