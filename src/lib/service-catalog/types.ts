export type BookingMode = "plans" | "bedrooms" | "property-size";

export interface CatalogAddon {
  id: string;
  label: string;
  price: number | null;
  priceDisplay?: string;
}

export interface CatalogPlan {
  id: string;
  label: string;
  price: number;
  priceMin?: number;
  priceMax?: number;
  priceDisplay?: string;
  description?: string;
  quickPick?: boolean;
  billingPeriod?: "one-time" | "monthly";
}

export interface PricingLine {
  label: string;
  priceDisplay: string;
}

export interface CatalogService {
  id: string;
  name: string;
  active: boolean;
  featured?: boolean;
  mainPriceDisplay: string;
  pricingNote?: string;
  packageIncludes?: string[];
  shortDescription: string;
  description: string;
  image: string;
  items: string[];
  benefits: string[];
  bookingMode: BookingMode;
  bedroomPrices?: Record<"1" | "2" | "3", number>;
  commercialNote?: string;
  plans: CatalogPlan[];
  addons: CatalogAddon[];
  extraPricingLines?: PricingLine[];
}

export interface ServiceCatalog {
  updatedAt: string;
  services: CatalogService[];
}
