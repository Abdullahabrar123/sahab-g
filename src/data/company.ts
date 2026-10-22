/**
 * ─────────────────────────────────────────────────────────────────────────
 *  COMPANY CONFIGURATION — edit this file to put real business details live.
 * ─────────────────────────────────────────────────────────────────────────
 *  Anything left as `null` / empty is rendered on the site as a clearly
 *  marked placeholder (amber dashed tag) or hidden entirely. Nothing here
 *  is invented: fill in only verified information.
 */

export type Testimonial = { quote: string; name: string; role: string; company: string }
export type TeamMember = { name: string | null; role: string; photo?: string; bio?: string }
export type Client = { name: string; logo?: string; note?: string }
export type Stat = { value: number; suffix?: string; label: string }

export const company = {
  name: 'S.J International Movers',
  shortName: 'S.J Movers',
  tagline: 'Moving Pakistan Forward',
  description:
    'Reliable transportation and logistics solutions connecting businesses across Pakistan — from Islamabad and Peshawar to Lahore, Faisalabad, Multan and Karachi.',

  /** International format without spaces, e.g. '+923001234567'. */
  phone: null as string | null,
  /** Display version of the phone number, e.g. '+92 300 123 4567'. */
  phoneDisplay: null as string | null,
  /** WhatsApp number in international format WITHOUT '+', e.g. '923001234567'.
   *  When set, the floating WhatsApp button and all WhatsApp CTAs appear. */
  whatsapp: null as string | null,
  email: null as string | null,
  address: null as string | null,
  officeHours: null as string | null,

  /** Optional form backend (e.g. a Formspree / Getform / own API URL that accepts JSON POST).
   *  If empty, the inquiry form hands the message off to WhatsApp or email instead. */
  inquiryEndpoint: '' as string,

  /** Verified headline statistics only (e.g. { value: 12, suffix: '+', label: 'Years in operation' }).
   *  Leave empty to hide the "verified figures" counters. */
  verifiedStats: [] as Stat[],

  /** Verified client testimonials only. While empty, placeholder cards are shown. */
  testimonials: [] as Testimonial[],

  /** Team members. `name: null` renders a clearly marked placeholder card. */
  team: [
    { name: null, role: 'Chief Executive / Managing Director' },
    { name: null, role: 'Head of Operations' },
    { name: null, role: 'Fleet Manager' },
    { name: null, role: 'Client Relations Manager' },
    { name: null, role: 'Route & Dispatch Coordinator' },
    { name: null, role: 'Accounts & Documentation' },
  ] as TeamMember[],

  /** Corporate clients. Only list companies that have approved being named.
   *  ZTE is listed per the business brief; add a logo file only with permission. */
  clients: [{ name: 'ZTE', note: 'Corporate transportation client' }] as Client[],

  /** Completed project case studies — leave empty until details are approved. */
  projects: [] as { title: string; client?: string; summary: string; image?: string }[],
}

export const hasWhatsApp = () => Boolean(company.whatsapp)

export const whatsappLink = (message = `Hello ${company.name}, I would like a transportation quote.`) =>
  company.whatsapp ? `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}` : null

export const phoneLink = () => (company.phone ? `tel:${company.phone}` : null)
export const emailLink = (subject?: string, body?: string) => {
  if (!company.email) return null
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const q = params.toString().replace(/\+/g, '%20')
  return `mailto:${company.email}${q ? `?${q}` : ''}`
}
