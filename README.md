# Blue Rose Property Maintenance

Premium frontend website for **Blue Rose Property Maintenance** — a property maintenance business offering carpet cleaning, home cleaning, lawn care, and snow removal.

## Tech Stack

- **Next.js** (App Router) with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lenis** for smooth scrolling
- **React Hook Form + Zod** for form validation
- **Lucide React** for icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Before Launch — Replace Placeholder Content

### Business Details

Edit `src/config/site.ts` to update:

- Business email
- Phone number
- Service area
- Website URL
- Business hours
- Google Business profile link

### Testimonials

Replace all sample reviews in `src/data/testimonials.ts` with **verified Google review content** before production. Sample reviews are clearly marked with developer comments.

### Logo

The logo is stored at `public/images/blue-rose-logo.png`. Replace it if you receive an updated brand asset.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/services` | Service details |
| `/pricing` | Transparent pricing |
| `/testimonials` | Customer reviews |
| `/booking` | Multi-step booking request |
| `/contact` | Contact form and info |

## Forms

This is a **frontend-only** site. Booking and contact forms open a pre-filled `mailto:` link using the business email from `site.config.ts`. No data is stored in a database.

## Deployment

Deploy to Vercel, Netlify, or any platform that supports Next.js:

```bash
npm run build
```

Ensure environment variables are not required — all configuration is in `src/config/site.ts`.

## License

Private — Blue Rose Property Maintenance.

## Services offered

The site only offers Lawn Care, Snow Removal and Junk Removal. The list lives in `offeredServiceIds` in `src/config/site.ts`; anything else saved in the admin catalog (carpet cleaning, home cleaning) is filtered out. Prices and plans for the three services are still edited in `/admin`.

Snow removal plans are booked as separate choices (one-time, monthly driveway only, monthly unlimited). In `/admin`, each plan has a Billing type and a Booking group; plans in different groups never appear in the same list.

## Google tag and lead tracking

Set these in the hosting environment (see `.env.example`):

- `NEXT_PUBLIC_GOOGLE_TAG_ID` - GA4 and/or Google Ads tag ID(s), comma separated. Without it the tag is not installed.
- `NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION` and `NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION` - optional Google Ads conversion targets (`AW-XXXXXXXXX/label`).

Events sent, all with `lead_source = website`:

- `phone_call_click` when a visitor taps any phone link (`click_location` says where).
- `generate_lead` when the booking form or contact form is submitted (`lead_type` = `booking_form` or `contact_form`).

Lead emails are subject-tagged `[Website Lead]` and include a `Lead Source: website` line. In GA4, mark `phone_call_click` and `generate_lead` as key events.
