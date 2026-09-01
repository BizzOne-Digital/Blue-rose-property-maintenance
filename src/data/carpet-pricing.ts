export const CARPET_PER_ROOM_PRICE = 59.99;
export const CARPET_MINIMUM = 99;
export const CARPET_LIVING_ROOM_PRICE = 90;

export const BEDROOM_OPTIONS = [
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
] as const;

export type CarpetBedroomCount = (typeof BEDROOM_OPTIONS)[number]["value"];

export interface CarpetAddonOption {
  id: string;
  label: string;
  price: number;
}

export const carpetAddonOptions: CarpetAddonOption[] = [
  { id: "living-room", label: "Living room", price: CARPET_LIVING_ROOM_PRICE },
  { id: "rug", label: "Rug", price: 60 },
  { id: "hallway", label: "Hallway", price: 30 },
  { id: "stairs", label: "Stairs", price: 75 },
  { id: "couch", label: "Couch cleaning", price: 99 },
  { id: "recliner", label: "Recliner cleaning", price: 65 },
  { id: "mattress", label: "Mattress cleaning", price: 69 },
];

export function getCarpetBedroomPrice(bedroomCount: CarpetBedroomCount): number {
  return Math.max(CARPET_MINIMUM, Number(bedroomCount) * CARPET_PER_ROOM_PRICE);
}

export function formatCarpetPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function getCarpetAddonByLabel(label: string): CarpetAddonOption | undefined {
  return carpetAddonOptions.find((option) => option.label === label);
}
