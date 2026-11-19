export const siteConfig = {
  name: "Blue Rose Property Maintenance",
  shortName: "Blue Rose",
  tagline: "One Company. One Call. We Take Care of It All.",
  city: "Regina",
  region: "SK",
  serviceArea: "Regina, SK & surrounding areas",
  description:
    "Lawn care, snow removal and junk removal in Regina from one trusted property maintenance team.",
  /**
   * The only services Blue Rose offers. The catalog (including anything saved in the
   * admin portal) is filtered to these, in this order. Carpet and home cleaning are discontinued.
   */
  offeredServiceIds: ["lawn-care", "snow-removal", "junk-removal"],
  url: "https://www.bluerosepropertymaintenance.com", // Replace with live domain
  email: "Bluerosepm9@gmail.com",
  phone: "(306) 393-9988",
  phoneCallToAction: "For a Quote",
  businessHours: {
    display: "10:00 AM – 6:00 PM, 7 days a week",
  },
  social: {
    google: "#", // Replace with Google Business profile URL
  },
  /** Every lead coming from this site is tagged with this source (emails + Google tag events). */
  leadSource: "website",
} as const;

export type SiteConfig = typeof siteConfig;
