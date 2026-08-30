import type { ServiceId } from "./services";

export interface PricingItem {
  label: string;
  price: string;
}

export interface PricingCategory {
  id: ServiceId;
  name: string;
  items: PricingItem[];
  note?: string;
}

export const pricingCategories: PricingCategory[] = [
  {
    id: "carpet-cleaning",
    name: "Carpet Cleaning",
    items: [
      { label: "Per room", price: "$59.99" },
      { label: "Living room", price: "$90" },
      { label: "Rug", price: "$60" },
      { label: "Hallway", price: "$30" },
      { label: "Couch", price: "$99" },
      { label: "Recliner", price: "$65" },
      { label: "Mattress cleaning", price: "starting at $69" },
    ],
  },
  {
    id: "home-cleaning",
    name: "Standard Home Cleaning",
    note: "Starting prices shown are for standard cleaning.",
    items: [
      { label: "One-bedroom standard cleaning", price: "starting at $150" },
      { label: "Two-bedroom standard cleaning", price: "starting at $225" },
      { label: "Three-bedroom standard cleaning", price: "starting at $300" },
      { label: "Fridge or stove cleaning add-on", price: "$30" },
      { label: "Move-out cleaning", price: "starting at $200" },
      { label: "One-bedroom move-out", price: "$225+" },
      { label: "Two-bedroom move-out", price: "$300+" },
      { label: "Three-bedroom move-out", price: "$375+" },
    ],
  },
  {
    id: "lawn-care",
    name: "Lawn Care",
    items: [
      { label: "One-time lawn mowing", price: "starting at $60" },
      { label: "Yard cleanup", price: "starting at $150" },
    ],
  },
  {
    id: "snow-removal",
    name: "Snow Removal",
    items: [
      { label: "Sidewalks snow removal", price: "starting at $99" },
      { label: "Driveway clearing add-on", price: "add-on" },
      { label: "Ice-melt add-on", price: "starting at $50" },
    ],
  },
];

export const pricingNotice =
  "Prices shown are starting prices. Final pricing may vary depending on property size, condition, service area and specific requirements. Request a quote or booking confirmation for an exact total.";

export const pricingPreview = [
  { service: "Carpet Cleaning", price: "$59.99 per room · $90 living room", id: "carpet-cleaning" as ServiceId },
  { service: "Standard Home Cleaning", price: "Standard cleaning from $150", id: "home-cleaning" as ServiceId },
  { service: "Lawn Mowing", price: "from $60", id: "lawn-care" as ServiceId },
  { service: "Snow Removal", price: "from $99", id: "snow-removal" as ServiceId },
];
