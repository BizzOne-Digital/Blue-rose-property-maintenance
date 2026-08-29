"use client";

import { motion } from "framer-motion";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

const steps = [
  { number: "01", title: "Choose Your Service", description: "Select carpet cleaning, home cleaning, lawn care or snow removal." },
  { number: "02", title: "Select a Preferred Date", description: "Pick your preferred date and time for the service." },
  { number: "03", title: "Receive Confirmation", description: "Our team reviews your request and confirms your appointment." },
  { number: "04", title: "We Take Care of the Rest", description: "Sit back while our professionals handle your property care." },
];

export function ProcessSteps() {
  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-24">
      <div className="absolute top-10 left-0 section-number text-royal">04</div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <AnimatedHeading
            text="Property Care Without the Hassle"
            className="font-heading text-3xl font-bold text-navy md:text-5xl"
          />
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-4">
          <svg
            className="absolute top-16 right-0 left-0 hidden h-2 w-full md:block"
            viewBox="0 0 800 8"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M0 4 Q200 0 400 4 T800 4"
              fill="none"
              stroke="url(#pathGrad)"
              strokeWidth="3"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            />
            <defs>
              <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#064EDB" />
                <stop offset="100%" stopColor="#2D7FFF" />
              </linearGradient>
            </defs>
          </svg>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative rounded-2xl bg-white p-6 shadow-lg gradient-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <span className="font-heading text-4xl font-bold text-electric/30">{step.number}</span>
              <h3 className="mt-2 font-heading text-lg font-bold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm text-navy/60">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
