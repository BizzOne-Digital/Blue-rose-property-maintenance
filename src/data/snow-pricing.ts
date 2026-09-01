export const SNOW_ONE_TIME_PRICE = 80;
export const SNOW_MONTHLY_RESIDENTIAL_PRICE = 200;
export const SNOW_ICE_MELT_PRICE = 50;

export const SNOW_ONE_TIME_INCLUDES = [
  "Driveway",
  "Sidewalk",
  "Walkway",
  "Steps",
] as const;

export const snowPlanOptions = [
  {
    id: "one-time",
    label: "One-time snow removal",
    price: SNOW_ONE_TIME_PRICE,
    priceLabel: "$80",
    description: "Driveway + sidewalk + walkway + steps included.",
  },
  {
    id: "monthly-residential",
    label: "Residential monthly",
    price: SNOW_MONTHLY_RESIDENTIAL_PRICE,
    priceLabel: "$200/mo",
    description: "Ongoing residential snow removal throughout the season.",
  },
] as const;

export type SnowPlanId = (typeof snowPlanOptions)[number]["id"];

export const snowAddonOptions = [
  { id: "ice-melt", label: "Ice-melt application", price: SNOW_ICE_MELT_PRICE },
] as const;

export function getSnowPlanById(id: SnowPlanId) {
  return snowPlanOptions.find((plan) => plan.id === id);
}

export function calculateSnowEstimate(planId: SnowPlanId | undefined, addons: string[]): string {
  const plan = planId ? getSnowPlanById(planId) : undefined;
  if (!plan) return "from $80";

  const addonTotal = addons.reduce((sum, addon) => {
    const match = snowAddonOptions.find((option) => option.label === addon);
    return sum + (match?.price ?? 0);
  }, 0);

  if (plan.id === "monthly-residential") {
    return addonTotal > 0
      ? `$${plan.price}/mo + $${addonTotal} add-on estimated`
      : `$${plan.price}/mo`;
  }

  return addonTotal > 0
    ? `$${(plan.price + addonTotal).toFixed(0)} estimated`
    : `$${plan.price}`;
}
