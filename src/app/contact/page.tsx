import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { formatPhoneForTel } from "@/lib/utils";
import { ContactForm } from "@/components/ui/ContactForm";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { faqs } from "@/data/faqs";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Blue Rose Property Maintenance in ${siteConfig.city} for service inquiries and bookings.`,
};

const contactCards = [
  {
    icon: Phone,
    title: "Phone",
    value: siteConfig.phone,
    href: `tel:${formatPhoneForTel(siteConfig.phone)}`,
  },
  {
    icon: Mail,
    title: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    title: "Service Area",
    value: siteConfig.serviceArea,
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: `${siteConfig.businessHours.weekdays} | ${siteConfig.businessHours.saturday}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden gradient-bg-radial pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-semibold tracking-wider text-electric uppercase">
            Contact Us
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold text-white break-words sm:text-4xl md:text-6xl">
            Get In Touch
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ice/70">
            Have a question or ready to book? Reach out to our {siteConfig.city} team and we&apos;ll get back to you.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-royal text-white">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading font-bold text-navy">{card.title}</h3>
                {card.href ? (
                  <a href={card.href} className="mt-2 block text-sm text-navy/70 hover:text-royal">
                    {card.value}
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-navy/70">{card.value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy">Send Us a Message</h2>
              <p className="mt-2 text-navy/60">Fill out the form and we&apos;ll respond promptly.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy">Frequently Asked Questions</h2>
              <div className="mt-8">
                <FAQAccordion items={faqs} limit={4} />
              </div>
              <Link
                href="/booking"
                className="mt-8 inline-block rounded-xl bg-gradient-to-r from-royal to-electric px-8 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105"
              >
                Book a Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
