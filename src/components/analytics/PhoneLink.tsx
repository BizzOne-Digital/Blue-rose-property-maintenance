"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { formatPhoneForTel } from "@/lib/utils";
import { trackPhoneClick } from "@/lib/analytics";

interface PhoneLinkProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  /** Where on the site the link sits (header, hero, footer...). Shows up in Google tag events. */
  location: string;
  children: ReactNode;
}

/** Clickable tel: link that records a website phone-call lead in the Google tag. */
export function PhoneLink({ location, children, onClick, ...props }: PhoneLinkProps) {
  return (
    <a
      {...props}
      href={`tel:${formatPhoneForTel(siteConfig.phone)}`}
      onClick={(event) => {
        trackPhoneClick(location);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
