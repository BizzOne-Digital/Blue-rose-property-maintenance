"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { mapCatalogServiceToMarketing, type ServiceId } from "@/data/services";
import { calculateCarpetEstimate, getCarpetPlanById } from "@/data/carpet-pricing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { CarpetPricePickMenu } from "@/components/ui/CarpetPricePickMenu";
import { useCatalog } from "@/lib/service-catalog/client";
import {
  calculateBedroomEstimate,
  addonPriceLabel,
} from "@/lib/service-catalog/format";
import {
  createBookingSchema,
  getServiceDetailFields,
  type BookingFormData,
} from "@/lib/service-catalog/booking-schema";

const STEPS = [
  "Select Service",
  "Service Details",
  "Date & Time",
  "Contact Info",
  "Review",
];

const BEDROOM_OPTIONS = [
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
] as const;

type BedroomCount = (typeof BEDROOM_OPTIONS)[number]["value"];

function BedroomSelector({
  value,
  onChange,
  error,
}: {
  value?: BedroomCount;
  onChange: (value: BedroomCount) => void;
  error?: string;
}) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-navy">Bedrooms</p>
      <div className="grid grid-cols-3 gap-3">
        {BEDROOM_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-xl border-2 px-3 py-3 text-sm font-medium transition-all",
              value === option.value
                ? "border-royal bg-ice text-navy shadow-sm"
                : "border-navy/10 text-navy/60 hover:border-royal/30"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function formatBedrooms(bedrooms?: string) {
  if (!bedrooms) return "";
  return `${bedrooms} bedroom${bedrooms === "1" ? "" : "s"}`;
}

const EMPTY_ADDONS: string[] = [];

function BookingWizardInner() {
  const { catalog, activeServices, getService } = useCatalog();
  const bookingSchema = useMemo(() => createBookingSchema(catalog), [catalog]);

  const searchParams = useSearchParams();
  const requestedService = searchParams.get("service") as ServiceId | null;
  const defaultServiceId =
    activeServices.find((s) => s.id === "carpet-cleaning")?.id ?? activeServices[0]?.id ?? "";
  const initialService =
    requestedService && getService(requestedService)?.active
      ? requestedService
      : defaultServiceId;

  const initialServiceConfig = getService(initialService);
  const planParam = searchParams.get("plan");
  const defaultPlanId =
    initialServiceConfig?.plans.find((p) => p.quickPick)?.id ??
    initialServiceConfig?.plans[0]?.id;
  const initialPlan =
    planParam && initialServiceConfig?.plans.some((plan) => plan.id === planParam)
      ? planParam
      : defaultPlanId;

  const initialBedrooms = (searchParams.get("bedrooms") as BedroomCount) || "1";
  const initialAddon = searchParams.get("addon");
  const initialAddons =
    initialAddon &&
    initialServiceConfig?.addons.some((option) => option.label === initialAddon)
      ? [initialAddon]
      : [];

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const isFirstServiceEffect = useRef(true);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: initialService,
      addons: initialAddons,
      contactPreference: "either",
      agreeContact: undefined,
      city: siteConfig.city,
      bedrooms: initialBedrooms,
      selectedPlan:
        initialServiceConfig?.bookingMode === "plans" ? initialPlan : undefined,
    },
  });

  const selectedService = useWatch({ control, name: "service", defaultValue: initialService });
  const selectedAddons = useWatch({ control, name: "addons" }) ?? EMPTY_ADDONS;
  const bedrooms = useWatch({ control, name: "bedrooms" });
  const selectedPlan = useWatch({ control, name: "selectedPlan" });
  const serviceConfig = getService(selectedService);
  const bookingMode = serviceConfig?.bookingMode;

  useEffect(() => {
    if (isFirstServiceEffect.current) {
      isFirstServiceEffect.current = false;
    } else {
      setValue("addons", []);
    }

    const svc = getService(selectedService);
    if (!svc) return;

    if (svc.bookingMode === "plans") {
      const fallback =
        svc.plans.find((p) => p.quickPick)?.id ?? svc.plans[0]?.id;
      if (!getValues("selectedPlan") && fallback) {
        setValue("selectedPlan", fallback);
      }
      setValue("bedrooms", undefined);
      setValue("propertyType", undefined);
    } else if (svc.bookingMode === "bedrooms") {
      if (!getValues("bedrooms")) {
        setValue("bedrooms", "1");
      }
      setValue("selectedPlan", undefined);
    } else {
      setValue("bedrooms", undefined);
      setValue("selectedPlan", undefined);
    }

    if (svc.bookingMode === "property-size") {
      setValue("propertyType", undefined);
    }
  }, [selectedService, setValue, getValues, getService]);

  const estimatedPrice = useMemo(() => {
    if (!serviceConfig) return "";
    if (serviceConfig.bookingMode === "plans") {
      return calculateCarpetEstimate(serviceConfig, selectedPlan, selectedAddons);
    }
    if (serviceConfig.bookingMode === "bedrooms" && bedrooms) {
      return calculateBedroomEstimate(serviceConfig, bedrooms, selectedAddons);
    }
    if (serviceConfig.bookingMode === "property-size") {
      const base = serviceConfig.plans[0]?.price ?? 0;
      const addonTotal = selectedAddons.reduce((sum, label) => {
        const match = serviceConfig.addons.find((a) => a.label === label);
        return sum + (match?.price ?? 0);
      }, 0);
      return addonTotal > 0 ? `$${base + addonTotal}+ estimated` : serviceConfig.mainPriceDisplay;
    }
    return serviceConfig.mainPriceDisplay;
  }, [serviceConfig, selectedPlan, selectedAddons, bedrooms]);

  const toggleAddon = (addon: string) => {
    const current = selectedAddons;
    if (current.includes(addon)) {
      setValue("addons", current.filter((a) => a !== addon));
    } else {
      setValue("addons", [...current, addon]);
    }
  };

  const nextStep = async () => {
    const service = getValues("service");
    const fieldsPerStep: (keyof BookingFormData)[][] = [
      ["service"],
      getServiceDetailFields(service, catalog),
      ["preferredDate", "preferredTime"],
      [
        "fullName",
        "email",
        "phone",
        "address",
        "city",
        "postalCode",
        "contactPreference",
        "agreeContact",
      ],
      [],
    ];
    const valid = await trigger(fieldsPerStep[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: BookingFormData) => {
    const svcMeta = getService(data.service);
    const serviceName = svcMeta
      ? mapCatalogServiceToMarketing(svcMeta).name
      : data.service;

    const svc = getService(data.service);
    const serviceDetails: string[] = [];
    if (svc?.bookingMode === "plans" && data.selectedPlan) {
      serviceDetails.push(
        `Plan: ${getCarpetPlanById(svc, data.selectedPlan)?.label ?? data.selectedPlan}`
      );
      if (svc.packageIncludes?.length) {
        serviceDetails.push(`Includes: ${svc.packageIncludes.join(", ")}`);
      }
    }
    if (svc?.bookingMode === "bedrooms") {
      serviceDetails.push(`Property Type: ${data.propertyType}`);
      serviceDetails.push(`Bedrooms: ${formatBedrooms(data.bedrooms)}`);
    }
    if (svc?.bookingMode === "property-size") {
      serviceDetails.push(`Property / yard size: ${data.propertySize}`);
    }
    serviceDetails.push(`Add-ons: ${data.addons?.join(", ") || "None"}`);
    if (svc?.commercialNote) {
      serviceDetails.push(`Note: ${svc.commercialNote}`);
    }

    const body = [
      "BOOKING REQUEST",
      "================",
      `Service: ${serviceName}`,
      ...serviceDetails,
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
      `Estimated Starting Price: ${estimatedPrice}`,
    ].join("\n");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `Booking Request - ${serviceName}`,
          replyTo: data.email,
          body,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send booking request");
      }

      setSubmitted(true);
    } catch {
      const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Booking Request - ${serviceName}`)}&body=${encodeURIComponent(body)}`;
      globalThis.location.assign(mailto);
      setSubmitted(true);
    }
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
        <h2 className="font-heading text-2xl font-bold text-navy">Request Sent</h2>
        <p className="mt-4 text-navy/70" role="status" aria-live="polite">
          Your booking request has been sent to our team. Your appointment is not confirmed until
          Blue Rose reviews the request and contacts you.
        </p>
      </div>
    );
  }

  return (
    <div>
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
              <span className="mt-1 hidden text-[10px] font-medium text-navy/50 sm:block">
                {label}
              </span>
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
            key={`${step}-${selectedService}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {activeServices.map((service) => (
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
                    <p className="mt-1 text-sm text-navy/60">{service.mainPriceDisplay}</p>
                  </label>
                ))}
              </div>
            )}

            {step === 1 && bookingMode === "plans" && (serviceConfig?.plans.length ?? 0) > 0 && (
              <div className="space-y-5">
                <CarpetPricePickMenu
                  serviceId={selectedService}
                  interactive
                  showAddons
                  selectedPlan={selectedPlan}
                  selectedAddons={selectedAddons}
                  planError={errors.selectedPlan?.message}
                  onPlanSelect={(value) =>
                    setValue("selectedPlan", value, { shouldValidate: true })
                  }
                  onAddonToggle={toggleAddon}
                />
                {serviceConfig?.commercialNote ? (
                  <p className="text-xs text-navy/60">{serviceConfig.commercialNote}</p>
                ) : null}
                <div className="rounded-xl bg-gradient-to-r from-navy to-royal p-4 text-white">
                  <p className="text-sm text-ice/70">Estimated starting price</p>
                  <p className="font-heading text-2xl font-bold">{estimatedPrice}</p>
                </div>
              </div>
            )}

            {step === 1 && bookingMode === "bedrooms" && (
              <div className="space-y-5">
                <div className="rounded-xl border border-royal/20 bg-ice p-4">
                  <p className="text-sm font-medium text-navy">Standard cleaning pricing</p>
                  <p className="mt-1 text-sm text-navy/70">
                    Starting prices below are for standard home cleaning.
                  </p>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Property Type</label>
                  <select
                    {...register("propertyType")}
                    className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm"
                  >
                    <option value="">Select type</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                  </select>
                  {errors.propertyType && (
                    <p className="mt-1 text-xs text-red-500">{errors.propertyType.message}</p>
                  )}
                </div>

                <BedroomSelector
                  value={bedrooms}
                  onChange={(value) => setValue("bedrooms", value, { shouldValidate: true })}
                  error={errors.bedrooms?.message}
                />

                <div>
                  <p className="mb-1 text-sm font-medium text-navy">Add-ons (optional)</p>
                  <p className="mb-3 text-xs text-navy/50">
                    Add carpet cleaning, inside fridge/oven/cabinet cleaning, or move-out service
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(serviceConfig?.addons ?? []).map((addon) => (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.label)}
                        className={cn(
                          "rounded-full px-4 py-2 text-xs font-medium transition-all",
                          selectedAddons.includes(addon.label)
                            ? "bg-royal text-white"
                            : "bg-navy/5 text-navy/60 hover:bg-navy/10"
                        )}
                      >
                        {addon.label} · {addonPriceLabel(addon)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-gradient-to-r from-navy to-royal p-4 text-white">
                  <p className="text-sm text-ice/70">Estimated standard cleaning price</p>
                  <p className="font-heading text-2xl font-bold">{estimatedPrice}</p>
                </div>
              </div>
            )}

            {step === 1 && bookingMode === "property-size" && (
              <div className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Yard Size</label>
                  <input
                    {...register("propertySize")}
                    placeholder="e.g. small city lot, large corner lot, front and back"
                    className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm"
                  />
                  {errors.propertySize && (
                    <p className="mt-1 text-xs text-red-500">{errors.propertySize.message}</p>
                  )}
                </div>

                <div>
                  <p className="mb-3 text-sm font-medium text-navy">Add-ons (optional)</p>
                  <div className="flex flex-wrap gap-2">
                    {(serviceConfig?.addons ?? []).map((addon) => (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.label)}
                        className={cn(
                          "rounded-full px-4 py-2 text-xs font-medium transition-all",
                          selectedAddons.includes(addon.label)
                            ? "bg-royal text-white"
                            : "bg-navy/5 text-navy/60 hover:bg-navy/10"
                        )}
                      >
                        {addon.label} · {addonPriceLabel(addon)}
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
                  <input
                    type="date"
                    {...register("preferredDate")}
                    className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm"
                  />
                  {errors.preferredDate && (
                    <p className="mt-1 text-xs text-red-500">{errors.preferredDate.message}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Preferred Time</label>
                  <select
                    {...register("preferredTime")}
                    className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm"
                  >
                    <option value="">Select time</option>
                    <option value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM</option>
                    <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                    <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
                  </select>
                  {errors.preferredTime && (
                    <p className="mt-1 text-xs text-red-500">{errors.preferredTime.message}</p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy">Full Name</label>
                    <input
                      {...register("fullName")}
                      className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy">Email</label>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Phone</label>
                  <input
                    type="tel"
                    {...register("phone")}
                    className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Address</label>
                  <input
                    {...register("address")}
                    className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm"
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>
                  )}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy">City</label>
                    <input
                      {...register("city")}
                      className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm"
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-navy">Postal Code</label>
                    <input
                      {...register("postalCode")}
                      className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm"
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-xs text-red-500">{errors.postalCode.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Contact Preference</label>
                  <select
                    {...register("contactPreference")}
                    className="w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm"
                  >
                    <option value="either">Either email or phone</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy">Additional Notes</label>
                  <textarea
                    {...register("notes")}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm"
                  />
                </div>
                <label className="flex items-start gap-3">
                  <input type="checkbox" {...register("agreeContact")} className="mt-1" />
                  <span className="text-sm text-navy/70">
                    I agree to be contacted about this booking request.
                  </span>
                </label>
                {errors.agreeContact && (
                  <p className="text-xs text-red-500">{errors.agreeContact.message}</p>
                )}
              </div>
            )}

            {step === 4 &&
              (() => {
                const values = getValues();
                return (
                  <div className="space-y-4 rounded-xl bg-ice p-6">
                    <h3 className="font-heading text-lg font-bold text-navy">Booking Summary</h3>
                    <div className="space-y-2 text-sm text-navy/70">
                      <p>
                        <strong>Service:</strong>{" "}
                        {getService(values.service)?.name}
                      </p>
                      {serviceConfig?.bookingMode === "plans" && values.selectedPlan ? (
                        <p>
                          <strong>Plan:</strong>{" "}
                          {getCarpetPlanById(serviceConfig, values.selectedPlan)?.label}
                        </p>
                      ) : null}
                      {serviceConfig?.bookingMode === "bedrooms" ? (
                        <p>
                          <strong>Standard cleaning:</strong> {values.propertyType} —{" "}
                          {formatBedrooms(values.bedrooms)}
                        </p>
                      ) : null}
                      {serviceConfig?.bookingMode === "property-size" ? (
                        <p>
                          <strong>Yard / property size:</strong> {values.propertySize}
                        </p>
                      ) : null}
                      <p>
                        <strong>Add-ons:</strong>{" "}
                        {selectedAddons.length ? selectedAddons.join(", ") : "None"}
                      </p>
                      <p>
                        <strong>Date:</strong> {values.preferredDate} at {values.preferredTime}
                      </p>
                      <p>
                        <strong>Name:</strong> {values.fullName}
                      </p>
                      <p>
                        <strong>Email:</strong> {values.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {values.phone}
                      </p>
                      <p>
                        <strong>Address:</strong> {values.address}, {values.city},{" "}
                        {values.postalCode}
                      </p>
                      {values.notes && (
                        <p>
                          <strong>Notes:</strong> {values.notes}
                        </p>
                      )}
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
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-1 text-sm font-medium text-navy/60 hover:text-navy"
            >
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
