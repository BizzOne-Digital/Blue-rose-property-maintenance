export const siteConfig = {
  name: "Blue Rose Property Maintenance",
  shortName: "Blue Rose",
  tagline: "One Company. One Call. We Take Care of It All.",
  city: "Regina",
  region: "SK",
  serviceArea: "Regina, SK & surrounding areas",
  description:
    "Professional carpet cleaning, lawn care and snow removal in Regina from one trusted property maintenance team.",
  /** Set to true to show home cleaning across the site and booking flow. */
  homeCleaningEnabled: false,
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
} as const;

export type SiteConfig = typeof siteConfig;
