import type { Metadata } from "next";
import Script from "next/script";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Tips and guides on property maintenance, carpet cleaning, lawn care and snow removal from Blue Rose Property Maintenance in ${siteConfig.city}.`,
};

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div id="soro-blog" />
      <Script
        src="https://app.trysoro.com/api/embed/08ea970a-12b6-4cd9-9160-908b1a20cd6c"
        strategy="afterInteractive"
      />
    </section>
  );
}
