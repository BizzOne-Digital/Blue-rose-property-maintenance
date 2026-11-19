import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { PageTransition } from "@/components/layout/PageTransition";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { CatalogProvider } from "@/lib/service-catalog/client";
import { readServiceCatalog } from "@/lib/service-catalog/server";
import { siteConfig } from "@/config/site";
import { GoogleTag } from "@/components/analytics/GoogleTag";

export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const heading = Barlow_Condensed({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Regina Property Maintenance Services`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "property maintenance services Regina",
    "lawn care Regina",
    "junk removal Regina",
    "lawn mowing service Regina",
    "yard cleanup Regina",
    "snow removal service Regina",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "/images/blue-rose-logo.png", width: 800, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/images/blue-rose-logo.png"],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialCatalog = await readServiceCatalog();

  return (
    <html lang="en" className={`${inter.variable} ${heading.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: siteConfig.name,
              description: siteConfig.description,
              url: siteConfig.url,
              telephone: siteConfig.phone,
              email: siteConfig.email,
              address: {
                "@type": "PostalAddress",
                addressLocality: siteConfig.city,
                addressRegion: siteConfig.region,
                addressCountry: "CA",
              },
              areaServed: siteConfig.serviceArea,
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <GoogleTag />
        <CatalogProvider key={initialCatalog.updatedAt} initialCatalog={initialCatalog}>
          <LoadingScreen />
          <SmoothScroll>
            <SiteChrome>
              <PageTransition>{children}</PageTransition>
            </SiteChrome>
          </SmoothScroll>
        </CatalogProvider>
      </body>
    </html>
  );
}
