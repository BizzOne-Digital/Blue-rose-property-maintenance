import Script from "next/script";

/**
 * Loads the Google tag (gtag.js) site-wide.
 *
 * Set NEXT_PUBLIC_GOOGLE_TAG_ID in the hosting environment. It accepts one ID or several,
 * comma separated (e.g. "G-XXXXXXXXXX,AW-XXXXXXXXX" for GA4 + Google Ads).
 * Without it nothing loads, and a warning is logged on the server.
 */
export function GoogleTag() {
  const ids = (process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (ids.length === 0) {
    if (process.env.NODE_ENV === "production") {
      console.warn("NEXT_PUBLIC_GOOGLE_TAG_ID is not set: the Google tag is NOT installed.");
    }
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ids[0])}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
${ids.map((id) => `gtag('config', ${JSON.stringify(id)});`).join("\n")}`}
      </Script>
    </>
  );
}
