/** Unsplash — trade / profile figures (client-requested representation). */
const stockFigures = {
  maintenancePro:
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&q=80",
  serviceTeamMember:
    "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=1200&q=80",
} as const;

export const images = {
  carpetCleaning: {
    hero: stockFigures.maintenancePro,
    equipment: stockFigures.maintenancePro,
    before: "/images/carpet-before.png",
    after: "/images/carpet-after.png",
    extraction: stockFigures.maintenancePro,
  },
  homeCleaning: {
    hero: stockFigures.serviceTeamMember,
    detail: stockFigures.maintenancePro,
  },
  lawnCare: {
    hero: stockFigures.maintenancePro,
    mowing: stockFigures.maintenancePro,
    stripes: stockFigures.serviceTeamMember,
    cleanup: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  },
  snowRemoval: {
    hero: stockFigures.serviceTeamMember,
    blower: stockFigures.maintenancePro,
    driveway: stockFigures.serviceTeamMember,
    iceMelt: "https://images.unsplash.com/photo-1449824913935-59a10b8d2001?w=1200&q=80",
  },
  seasonal: {
    spring: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    summer: "/images/lawn-care-hero.png",
    fall: "/images/carpet-cleaning-hero.png",
    winter: "/images/snow-removal-hero.png",
  },
} as const;
