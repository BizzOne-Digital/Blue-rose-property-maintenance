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
  email: "info@blueroseproperty.example", // Replace with real business email
  phone: "(000) 000-0000", // Replace with real phone number
  businessHours: {
    weekdays: "Monday – Friday: 8:00 AM – 6:00 PM",
    saturday: "Saturday: 9:00 AM – 4:00 PM",
    sunday: "Sunday: Closed",
  },
  googleRating: 5.0,
  social: {
    google: "#", // Replace with Google Business profile URL
  },
} as const;

export type SiteConfig = typeof siteConfig;
