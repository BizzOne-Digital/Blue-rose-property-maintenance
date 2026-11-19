import { siteConfig } from "@/config/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Optional Google Ads conversion targets, in the form "AW-XXXXXXXXX/conversionLabel".
 * Set these in the hosting environment once the conversion actions exist in Google Ads.
 */
const PHONE_CONVERSION = process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION;
const LEAD_CONVERSION = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION;

function sendEvent(name: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    } else {
      // Tag not loaded yet (or blocked): queue in the same shape gtag would.
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push(["event", name, params]);
    }
  } catch {
    // Tracking must never break the page.
  }
}

function sendConversion(target: string | undefined, params: Record<string, unknown>) {
  if (!target) return;
  sendEvent("conversion", { send_to: target, ...params });
}

/** A visitor tapped a tel: link. Counts as a phone-call lead from the website. */
export function trackPhoneClick(location: string) {
  const params = {
    lead_source: siteConfig.leadSource,
    lead_type: "phone_call",
    click_location: location,
    phone_number: siteConfig.phone,
  };
  sendEvent("phone_call_click", params);
  sendConversion(PHONE_CONVERSION, params);
}

/** A visitor successfully submitted the booking or contact form. */
export function trackFormLead(form: "booking" | "contact", service?: string) {
  const params = {
    lead_source: siteConfig.leadSource,
    lead_type: `${form}_form`,
    ...(service ? { service } : {}),
  };
  sendEvent("generate_lead", params);
  sendConversion(LEAD_CONVERSION, params);
}
