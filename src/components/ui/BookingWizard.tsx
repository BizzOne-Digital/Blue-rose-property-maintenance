"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { services, type ServiceId } from "@/data/services";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const STEPS = [
  "Select Service",
  "Service Details",
  "Date & Time",
  "Contact Info",
  "Review",
];

const bookingSchema = z.object({
  service: z.enum(["carpet-cleaning", "home-cleaning", "lawn-care", "snow-removal"]),
  propertyType: z.string().min(1, "Property type is required"),
  propertySize: z.string().min(1, "Property size is required"),
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
  agreeContact: z.literal(true, { errorMap: () => ({ message: "You must agree to be contacted" }) }),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const serviceAddons: Record<ServiceId, string[]> = {
  "carpet-cleaning": ["Couch cleaning", "Recliner cleaning", "Mattress cleaning", "Hallway"],
  "home-cleaning": ["Fridge cleaning", "Stove cleaning", "Move-out cleaning"],
  "lawn-care": ["Yard cleanup", "Seasonal property cleanup"],
  "snow-removal": ["Ice-melt application", "Walkway clearing"],
};

const estimatedPrices: Record<ServiceId, string> = {
  "carpet-cleaning": "$99 minimum",
  "home-cleaning": "$100+",
  "lawn-care": "$60+",
  "snow-removal": "$99+",
};

function BookingWizardInner() {
  const searchParams = useSearchParams();
  const initialService = (searchParams.get("service") as ServiceId) || "carpet-cleaning";
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: initialService,
      addons: [],
      contactPreference: "either",
      agreeContact: undefined,
    },
  });

  const selectedService = watch("service");
  const selectedAddons = watch("addons") || [];

  const estimatedPrice = useMemo(
    () => estimatedPrices[selectedService],
    [selectedService]
  );

  const toggleAddon = (addon: string) => {
    const current = selectedAddons;
    if (current.includes(addon)) {
      setValue("addons", current.filter((a) => a !== addon));
    } else {
      setValue("addons", [...current, addon]);
    }
  };

  const nextStep = async () => {
    const fieldsPerStep: (keyof BookingFormData)[][] = [
      ["service"],
      ["propertyType", "propertySize"],
      ["preferredDate", "preferredTime"],
      ["fullName", "email", "phone", "address", "city", "postalCode", "contactPreference", "agreeContact"],
      [],
    ];
    const valid = await trigger(fieldsPerStep[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (data: BookingFormData) => {
    const serviceName = services.find((s) => s.id === data.service)?.name ?? data.service;
    const body = [
      "BOOKING REQUEST",
      "================",
      `Service: ${serviceName}`,
      `Property Type: ${data.propertyType}`,
      `Property Size: ${data.propertySize}`,
      `Add-ons: ${data.addons?.join(", ") || "None"}`,
      `Preferred Date: ${data.preferredDate}`,
      `Preferred Time: ${data.preferredTime}`,
      "",
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Address: ${data.address}, ${data.city}, ${data.postalCode}`,
      `Contact Preference: ${data.contactPreference}`,
      `Notes: ${data.notes || "None"}`,
      "",
      `Estimated Starting Price: ${estimatedPrices[data.service]}`,
    ].join("\n");

    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Booking Request - ${serviceName}`)}&body=${encodeURIComponent(body)}`;
    globalThis.location.assign(mailto);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-6 inline-block rounded-2xl bg-white p-4 shadow-lg">
          <Image
            src="/images/blue-rose-logo.png"
            alt="Blue Rose Property Maintenance"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
        <h2 className="font-heading text-2xl font-bold text-navy">Request Prepared</h2>
        <p className="mt-4 text-navy/70" role="status" aria-live="polite">
          Your booking request has been prepared. Your appointment is not confirmed until the Blue Rose team reviews the request and contacts you.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8 overflow-hidden">
        <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar sm:gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex min-w-[2.5rem] flex-1 flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all",
                  i < step
                    ? "bg-royal text-white"
                    : i === step
                      ? "bg-gradient-to-r from-electric to-royal text-white shadow-lg"
                      : "bg-navy/10 text-navy/40"
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className="mt-1 hidden text-[10px] font-medium text-navy/50 sm:block">{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-electric to-royal"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((service) => (
                  <label
                    key={service.id}
                    className={cn(
                      "cursor-pointer rounded-xl border-2 p-5 transition-all",
                      selectedService === service.id
                        ? "border-royal bg-ice shadow-md"
                        : "border-navy/10 hover:border-royal/30"
                    )}
                  >
                    <input
                      type="radio"
                      value={service.id}
                      {...register("service")}
                      className="sr-only"
                    />
                    <p className="font-heading font-bold text-navy">{service.name}</p>
                    <p className="mt-1 text-sm text-navy/60">{service.startingPrice}</p>
                  </label>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Property Type</label>
                  <select {...register("propertyType")} className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm">
                    <option value="">Select type</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                  </select>
                  {errors.propertyType && <p className="mt-1 text-xs text-red-500">{errors.propertyType.message}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Number of Rooms / Property Size</label>
                  <input {...register("propertySize")} placeholder="e.g. 3 bedrooms, 1500 sq ft" className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm" />
                  {errors.propertySize && <p className="mt-1 text-xs text-red-500">{errors.propertySize.message}</p>}
                </div>
                <div>
                  <p className="mb-3 text-sm font-medium text-navy">Add-ons (optional)</p>
                  <div className="flex flex-wrap gap-2">
                    {serviceAddons[selectedService].map((addon) => (
                      <button
                        key={addon}
                        type="button"
                        onClick={() => toggleAddon(addon)}
                        className={cn(
                          "rounded-full px-4 py-2 text-xs font-medium transition-all",
                          selectedAddons.includes(addon)
                            ? "bg-royal text-white"
                            : "bg-navy/5 text-navy/60 hover:bg-navy/10"
                        )}
                      >
                        {addon}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-gradient-to-r from-navy to-royal p-4 text-white">
                  <p className="text-sm text-ice/70">Estimated starting price</p>
                  <p className="font-heading text-2xl font-bold">{estimatedPrice}</p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Preferred Date</label>
                  <input type="date" {...register("preferredDate")} className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm" />
                  {errors.preferredDate && <p className="mt-1 text-xs text-red-500">{errors.preferredDate.message}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Preferred Time</label>
                  <select {...register("preferredTime")} className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm">
                    <option value="">Select time</option>
                    <option value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM</option>
                    <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                    <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
                  </select>
                  {errors.preferredTime && <p className="mt-1 text-xs text-red-500">{errors.preferredTime.message}</p>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy">Full Name</label>
                    <input {...register("fullName")} className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm" />
                    {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy">Email</label>
                    <input type="email" {...register("email")} className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm" />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Phone</label>
                  <input type="tel" {...register("phone")} className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm" />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Address</label>
                  <input {...register("address")} className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm" />
                  {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy">City</label>
                    <input {...register("city")} className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm" />
                    {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy">Postal Code</label>
                    <input {...register("postalCode")} className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm" />
                    {errors.postalCode && <p className="mt-1 text-xs text-red-500">{errors.postalCode.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Contact Preference</label>
                  <select {...register("contactPreference")} className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm">
                    <option value="either">Either email or phone</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Additional Notes</label>
                  <textarea {...register("notes")} rows={3} className="w-full resize-none rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm" />
                </div>
                <label className="flex items-start gap-3">
                  <input type="checkbox" {...register("agreeContact")} className="mt-1" />
                  <span className="text-sm text-navy/70">I agree to be contacted about this booking request.</span>
                </label>
                {errors.agreeContact && <p className="text-xs text-red-500">{errors.agreeContact.message}</p>}
              </div>
            )}

            {step === 4 && (() => {
              const values = getValues();
              return (
              <div className="space-y-4 rounded-xl bg-ice p-6">
                <h3 className="font-heading text-lg font-bold text-navy">Booking Summary</h3>
                <div className="space-y-2 text-sm text-navy/70">
                  <p><strong>Service:</strong> {services.find((s) => s.id === values.service)?.name}</p>
                  <p><strong>Property:</strong> {values.propertyType} — {values.propertySize}</p>
                  <p><strong>Add-ons:</strong> {selectedAddons.length ? selectedAddons.join(", ") : "None"}</p>
                  <p><strong>Date:</strong> {values.preferredDate} at {values.preferredTime}</p>
                  <p><strong>Name:</strong> {values.fullName}</p>
                  <p><strong>Email:</strong> {values.email}</p>
                  <p><strong>Phone:</strong> {values.phone}</p>
                  <p><strong>Address:</strong> {values.address}, {values.city}, {values.postalCode}</p>
                  {values.notes && <p><strong>Notes:</strong> {values.notes}</p>}
                </div>
                <div className="rounded-lg bg-gradient-to-r from-navy to-royal p-4 text-white">
                  <p className="text-sm text-ice/70">Estimated starting price</p>
                  <p className="font-heading text-xl font-bold">{estimatedPrice}</p>
                </div>
              </div>
              );
            })()}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          {step > 0 ? (
            <button type="button" onClick={prevStep} className="flex items-center gap-1 text-sm font-medium text-navy/60 hover:text-navy">
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <div />
          )}
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-1 rounded-full bg-gradient-to-r from-royal to-electric px-6 py-3 text-sm font-semibold text-white shadow-md"
            >
              Continue <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-royal to-electric px-8 py-3 text-sm font-semibold text-white shadow-md"
            >
              Submit Booking Request
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export function BookingWizard() {
  return (
    <Suspense fallback={<div className="text-center text-navy/60">Loading booking form...</div>}>
      <BookingWizardInner />
    </Suspense>
  );
}
