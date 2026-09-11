export const siteConfig = {
  name: "Blue Rose Property Maintenance",
  shortName: "Blue Rose",
  tagline: "One Company. One Call. We Take Care of It All.",
  city: "Regina",
  region: "SK",
  serviceArea: "Regina, SK & surrounding areas",
  description:
    "Professional carpet cleaning, home cleaning, lawn care and snow removal in Regina from one trusted property maintenance team.",
  url: "https://www.bluerosepropertymaintenance.com", // Replace with live domain
  email: "Bluerosepm9@gmail.com",
  phone: "(306) 393-9988",
  businessHours: {
    display: "8:00 AM – 6:00 PM, 7 days a week",
  },
  googleRating: 5.0,
  social: {
    google: "#", // Replace with Google Business profile URL
  },
} as const;

export type SiteConfig = typeof siteConfig;
