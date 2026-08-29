import type { Metadata } from "next";
import { BookingWizard } from "@/components/ui/BookingWizard";

export const metadata: Metadata = {
  title: "Book a Service",
  description:
    "Request a booking for carpet cleaning, home cleaning, lawn care or snow removal.",
};

export default function BookingPage() {
  return (
    <>
      <section className="relative overflow-hidden gradient-bg-radial pt-28 pb-10 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-semibold tracking-wider text-electric uppercase">
            Book a Service
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold text-white break-words sm:text-4xl md:text-5xl">
            Request Your Appointment
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-ice/70 sm:text-base">
            Complete the form below and we&apos;ll review your request and contact you to confirm.
          </p>
        </div>
      </section>

      <section className="py-12 pb-32 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="rounded-2xl bg-white p-5 shadow-xl sm:p-8 md:p-10">
            <BookingWizard />
          </div>
        </div>
      </section>
    </>
  );
}
