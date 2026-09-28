export const CARPET_PER_ROOM_PRICE = 59.99;
export const CARPET_LIVING_ROOM_PRICE = 90;
export const CARPET_HALLWAY_PRICE = 50;

export const CARPET_PACKAGE_INCLUDES = [
  "Vacuum",
  "Pre-stain treatment",
  "Deep carpet cleaning",
] as const;

export const carpetPlanOptions = [
  {
    id: "living-only",
    label: "Living room only",
    price: 99,
    priceLabel: "$99",
    description: "Quick pick — living room package.",
    quickPick: true,
  },
  {
    id: "1br-living",
    label: "1 bedroom + living room",
    price: 150,
    priceLabel: "$150",
    description: "One bedroom and living room.",
    quickPick: false,
  },
  {
    id: "1br-living-hallway",
    label: "1 bedroom + living room & hallway",
    price: 180,
    priceLabel: "$180",
    description: "One bedroom, living room, and hallway.",
    quickPick: false,
  },
  {
    id: "2br-living-hallway",
    label: "2 bedrooms + living room & hallway",
    price: 250,
    priceLabel: "$250",
    description: "Two bedrooms, living room, and hallway.",
    quickPick: false,
  },
  {
    id: "living-hallway",
    label: "Living room + hallway",
    price: 150,
    priceLabel: "$150",
    description: "Standard living room and hallway package.",
    quickPick: false,
  },
] as const;

export type CarpetPlanId = (typeof carpetPlanOptions)[number]["id"];

export interface CarpetAddonOption {
  id: string;
  label: string;
  price: number;
}

export const carpetAddonOptions: CarpetAddonOption[] = [
  { id: "hallway", label: "Hallway", price: CARPET_HALLWAY_PRICE },
  { id: "rug", label: "Rug", price: 60 },
  { id: "stairs", label: "Stairs", price: 75 },
  { id: "couch", label: "Couch cleaning", price: 99 },
  { id: "recliner", label: "Recliner cleaning", price: 65 },
  { id: "mattress", label: "Mattress cleaning", price: 69 },
];

export function getCarpetPlanById(id: CarpetPlanId) {
  return carpetPlanOptions.find((plan) => plan.id === id);
}

export function formatCarpetPrice(amount: number): string {
  const rounded = Number.isInteger(amount) ? amount.toFixed(0) : amount.toFixed(2);
  return `$${rounded}`;
}

export function getCarpetAddonByLabel(label: string): CarpetAddonOption | undefined {
  return carpetAddonOptions.find((option) => option.label === label);
}

export function calculateCarpetEstimate(planId: CarpetPlanId | undefined, addons: string[]): string {
  const plan = planId ? getCarpetPlanById(planId) : undefined;
  if (!plan) return "from $99";

  const addonTotal = addons.reduce((sum, addon) => {
    const match = getCarpetAddonByLabel(addon);
    return sum + (match?.price ?? 0);
  }, 0);

  return addonTotal > 0
    ? `$${(plan.price + addonTotal).toFixed(0)} estimated`
    : `$${plan.price}`;
}

export const carpetPackageIncludesLabel = CARPET_PACKAGE_INCLUDES.join(" · ");
