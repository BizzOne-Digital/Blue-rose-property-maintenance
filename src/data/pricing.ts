import type { ServiceId } from "./services";
import { isServiceActive } from "./services";

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
    note: "Every package includes vacuum, pre-stain treatment, and deep carpet cleaning.",
    items: [
      { label: "Living room only (quick pick)", price: "$99" },
      { label: "1 bedroom + living room", price: "$150" },
      { label: "1 bedroom + living room & hallway", price: "$180" },
      { label: "2 bedrooms + living room & hallway", price: "$250" },
      { label: "Living room + hallway", price: "$150" },
      { label: "Hallway add-on", price: "$50" },
      { label: "Rug", price: "$60" },
      { label: "Stairs", price: "$75" },
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
      { label: "Inside fridge cleaning add-on", price: "$50" },
      { label: "Inside oven cleaning add-on", price: "$50" },
      { label: "Inside cabinets & drawers add-on", price: "$50" },
      { label: "Carpet cleaning — per room add-on", price: "$59.99" },
      { label: "Carpet cleaning — living room add-on", price: "$90" },
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
      {
        label: "One-time snow removal",
        price: "$80 — driveway, sidewalk, walkway & steps included",
      },
      { label: "Residential monthly", price: "$200/mo" },
      { label: "Ice-melt add-on", price: "starting at $50" },
    ],
  },
];

export const pricingNotice =
  "Prices shown are starting prices. Final pricing may vary depending on property size, condition, service area and specific requirements. Request a quote or booking confirmation for an exact total.";

const allPricingPreview = [
  { service: "Carpet Cleaning", price: "Packages from $99", id: "carpet-cleaning" as ServiceId },
  { service: "Standard Home Cleaning", price: "Standard cleaning from $150", id: "home-cleaning" as ServiceId },
  { service: "Lawn Mowing", price: "from $60", id: "lawn-care" as ServiceId },
  { service: "Snow Removal", price: "One-time $80 · $200/mo residential", id: "snow-removal" as ServiceId },
];

export const pricingPreview = allPricingPreview.filter((item) => isServiceActive(item.id));

export function getActivePricingCategories(): PricingCategory[] {
  return pricingCategories.filter((category) => isServiceActive(category.id));
}
