import { z } from "zod";
import type { ServiceCatalog } from "./types";

export const bookingFieldsSchema = z.object({
  service: z.string().min(1, "Please select a service"),
  propertyType: z.enum(["House", "Apartment"]).optional(),
  propertySize: z.string().optional(),
  bedrooms: z.enum(["1", "2", "3"]).optional(),
  selectedPlan: z.string().optional(),
  addons: z.array(z.string()).optional(),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time is required"),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  notes: z.string().optional(),
  contactPreference: z.enum(["email", "phone", "either"]),
  agreeContact: z.literal(true, {
    errorMap: () => ({ message: "You must agree to be contacted" }),
  }),
});

export type BookingFormData = z.infer<typeof bookingFieldsSchema>;

export function createBookingSchema(catalog: ServiceCatalog) {
  return bookingFieldsSchema.superRefine((data, ctx) => {
    const svc = catalog.services.find((s) => s.id === data.service && s.active);
    if (!svc) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select an active service",
        path: ["service"],
      });
      return;
    }

    if (svc.bookingMode === "plans" && svc.plans.length > 0 && !data.selectedPlan) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select a plan",
        path: ["selectedPlan"],
      });
    }

    if (svc.bookingMode === "bedrooms") {
      if (!data.propertyType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select House or Apartment",
          path: ["propertyType"],
        });
      }
      if (!data.bedrooms) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select number of bedrooms",
          path: ["bedrooms"],
        });
      }
    }

    if (svc.bookingMode === "property-size" && !data.propertySize?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Property size is required",
        path: ["propertySize"],
      });
    }
  });
}

export function getServiceDetailFields(
  serviceId: string,
  catalog: ServiceCatalog
): (keyof BookingFormData)[] {
  const svc = catalog.services.find((s) => s.id === serviceId);
  if (!svc) return [];
  switch (svc.bookingMode) {
    case "plans":
      return svc.plans.length > 0 ? ["selectedPlan"] : [];
    case "bedrooms":
      return ["propertyType", "bedrooms"];
    case "property-size":
      return ["propertySize"];
    default:
      return [];
  }
}
