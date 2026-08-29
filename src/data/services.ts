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
      "Professional extraction lifts embedded dirt and refreshes worn fibres for a cleaner, brighter home.",
    description:
      "Refresh carpets, upholstery and mattresses with professional cleaning designed to lift embedded dirt and improve the appearance of your space.",
    startingPrice: "from $99 minimum",
    image: images.carpetCleaning.hero,
    featured: true,
    items: [
      "Rooms",
      "Living rooms",
      "Hallways",
      "Couches",
      "Recliners",
      "Mattresses",
    ],
    benefits: [
      "Deep extraction cleaning",
      "Rooms, hallways and living spaces",
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
    startingPrice: "from $100",
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
      "Seasonal property cleanup",
    ],
    benefits: [
      "Professional mowing",
      "Yard debris removal",
      "Seasonal cleanup",
      "Neat, maintained lawns",
      "Residential outdoor care",
    ],
  },
  {
    id: "snow-removal",
    name: "Snow Removal",
    shortDescription:
      "Keep driveways and walkways clearer and safer during winter weather.",
    description:
      "Keep driveways and walkways clearer and safer during winter weather.",
    startingPrice: "from $99",
    image: images.snowRemoval.hero,
    items: [
      "Residential snow removal",
      "Driveway clearing",
      "Walkway clearing",
      "Ice-melt add-on",
    ],
    benefits: [
      "Driveway clearing",
      "Walkway clearing",
      "Ice-melt application",
      "Residential snow service",
      "Winter safety focus",
    ],
  },
];

export const getServiceById = (id: ServiceId) =>
  services.find((s) => s.id === id);
