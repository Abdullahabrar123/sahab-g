# S.J International Movers — Website

Multi-page transportation & logistics website built with **React 18 + Vite + TypeScript**, **Tailwind CSS v4**, **Framer Motion** and **React Router**.

## Run

```bash
npm install
npm run dev       # development server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — hero, intro, services, process, fleet, routes map, why us, testimonials, CTA |
| `/about` | About Us — profile, mission & vision, values, capabilities |
| `/services` | Our Services — overview of all six services |
| `/services/:slug` | Service detail pages (6) |
| `/fleet` | Our Fleet — filterable vehicle cards + sizing guide |
| `/routes` | Routes & coverage — animated network map, intercity lanes, route inquiry |
| `/team` | Our Team |
| `/clients` | Clients & Contracts |
| `/contact` | Contact details + validated transportation inquiry form |

## Putting real business details live

All company-specific information lives in **`src/data/company.ts`**. Anything left `null`/empty shows as an amber dashed **placeholder tag** (or is hidden), so nothing invented appears on the site.

- `phone`, `phoneDisplay`, `email`, `address`, `officeHours`
- `whatsapp` — set it (e.g. `'923001234567'`) and the floating WhatsApp button plus all WhatsApp CTAs appear automatically
- `inquiryEndpoint` — a JSON form backend (Formspree, Getform, or your own API). Without it, the form hands the inquiry off to WhatsApp, then email; if neither is configured, it tells the visitor to use the contact details instead
- `verifiedStats`, `testimonials`, `team`, `clients`, `projects` — add only verified/approved content

Services, fleet, cities and route lanes are in `src/data/content.ts`. Route distances are approximate road distances.

## Images

Photos in `public/images/` come from Unsplash (Unsplash License) and are representative. Replace them with photos of your own fleet when available, keeping the same file names. The logo variants are `public/logo.png` (original colours) and `public/logo-light.png` (for dark backgrounds).

## Deployment

`vercel.json` and `public/_redirects` (Netlify) are included so client-side routes work on refresh.
