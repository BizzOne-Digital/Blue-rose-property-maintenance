import { z } from "zod";

const addonSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  price: z.number().nullable(),
  priceDisplay: z.string().optional(),
});

const planSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  price: z.number(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  priceDisplay: z.string().optional(),
  description: z.string().optional(),
  quickPick: z.boolean().optional(),
  billingPeriod: z.enum(["one-time", "monthly"]).optional(),
});

const serviceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  active: z.boolean(),
  featured: z.boolean().optional(),
  mainPriceDisplay: z.string().min(1),
  pricingNote: z.string().optional(),
  packageIncludes: z.array(z.string()).optional(),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  items: z.array(z.string()),
  benefits: z.array(z.string()),
  bookingMode: z.enum(["plans", "bedrooms", "property-size"]),
  bedroomPrices: z
    .object({
      "1": z.number(),
      "2": z.number(),
      "3": z.number(),
    })
    .optional(),
  commercialNote: z.string().optional(),
  plans: z.array(planSchema),
  addons: z.array(addonSchema),
  extraPricingLines: z
    .array(z.object({ label: z.string(), priceDisplay: z.string() }))
    .optional(),
});

export const catalogSchema = z.object({
  updatedAt: z.string(),
  services: z.array(serviceSchema).min(1),
});
