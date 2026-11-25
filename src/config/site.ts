export const siteConfig = {
  name: "Blue Rose Property Maintenance",
  shortName: "Blue Rose",
  tagline: "One Company. One Call. We Take Care of It All.",
  city: "Regina",
  region: "SK",
  serviceArea: "Regina, SK & surrounding areas",
  description:
    "Snow removal, lawn care and junk removal in Regina, SK from one trusted property maintenance team. Request a free quote or book online.",
  /**
   * The only services Blue Rose offers. The catalog (including anything saved in the
   * admin portal) is filtered to these, in this order. Carpet and home cleaning are discontinued.
   */
  offeredServiceIds: ["snow-removal", "junk-removal", "lawn-care"],
  /**
   * Services kept off the home page and the booking service list (lawn care is a summer
   * service). They stay on the Services page and menu, and can still be booked from there.
   */
  hiddenFromMainServiceIds: ["lawn-care"],
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
