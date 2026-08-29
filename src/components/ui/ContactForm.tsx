"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { services } from "@/data/services";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone number is required"),
  subject: z.string().min(3, "Subject is required"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Service: ${data.service}`,
      `Subject: ${data.subject}`,
      "",
      data.message,
    ].join("\n");

    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
    globalThis.location.assign(mailto);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy">
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3 text-sm transition-colors focus:border-electric focus:outline-none",
              errors.name ? "border-red-400" : "border-navy/10"
            )}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3 text-sm transition-colors focus:border-electric focus:outline-none",
              errors.email ? "border-red-400" : "border-navy/10"
            )}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3 text-sm transition-colors focus:border-electric focus:outline-none",
              errors.phone ? "border-red-400" : "border-navy/10"
            )}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-navy">
            Service of Interest
          </label>
          <select
            id="service"
            {...register("service")}
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3 text-sm transition-colors focus:border-electric focus:outline-none",
              errors.service ? "border-red-400" : "border-navy/10"
            )}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
          {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-navy">
          Subject
        </label>
        <input
          id="subject"
          {...register("subject")}
          className={cn(
            "w-full rounded-xl border bg-white px-4 py-3 text-sm transition-colors focus:border-electric focus:outline-none",
            errors.subject ? "border-red-400" : "border-navy/10"
          )}
        />
        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className={cn(
            "w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm transition-colors focus:border-electric focus:outline-none",
            errors.message ? "border-red-400" : "border-navy/10"
          )}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-royal via-electric to-royal bg-[length:200%_100%] py-4 font-semibold text-white shadow-lg transition-all hover:bg-right"
      >
        Send Message
      </button>

      {isSubmitSuccessful && (
        <p className="text-center text-sm text-royal" role="status" aria-live="polite">
          Your email client will open with your message. We&apos;ll respond as soon as possible.
        </p>
      )}
    </form>
  );
}
