import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone, Clock } from 'lucide-react'
import { nav, services, cities } from '../data/content'
import { company, emailLink, phoneLink, whatsappLink } from '../data/company'
import { Placeholder } from './Placeholder'
import { WhatsAppIcon } from './Icons'
import { Button } from './Button'

const shortServiceName = (title: string) =>
  title === 'Dedicated Truck & Vehicle Arrangements' ? 'Dedicated Vehicles' : title.replace(' Transportation', '')

export function Footer() {
  const wa = whatsappLink()
  const tel = phoneLink()
  const mail = emailLink()
  const year = new Date().getFullYear()

  return (
    <footer className="grain relative overflow-hidden border-t border-white/8 bg-coal">
      <div className="stripes h-1.5 w-full opacity-90" aria-hidden />
      <div className="pointer-events-none absolute -left-40 top-20 size-[28rem] rounded-full bg-accent/10 blur-[140px]" aria-hidden />

      <div className="container-x relative pt-16 pb-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" aria-label={`${company.name} — home`} className="inline-block">
              <img src="/logo-light.png" alt={company.name} width={640} height={425} loading="lazy" className="h-20 w-auto" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist/70">{company.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/contact#quote">
                Request a Quote <ArrowUpRight className="size-4" />
              </Button>
              {wa && (
                <Button href={wa} variant="whatsapp">
                  <WhatsAppIcon className="size-4" /> WhatsApp us
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            <FooterCol title="Company">
              {nav.map((n) => (
                <FooterLink key={n.to} to={n.to}>
                  {n.label}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title="Services">
              {services.map((s) => (
                <FooterLink key={s.slug} to={`/services/${s.slug}`}>
                  {shortServiceName(s.title)}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title="Cities served">
              {cities
                .filter((c) => c.core)
                .map((c) => (
                  <FooterLink key={c.name} to="/routes#lanes">
                    {c.name}
                  </FooterLink>
                ))}
              <FooterLink to="/routes#network">+ more on request</FooterLink>
            </FooterCol>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-lg font-bold uppercase tracking-[0.15em] text-white">Get in touch</h3>
            <ul className="mt-5 space-y-4 text-sm text-mist/80">
              <ContactRow icon={<Phone className="size-4" />}>
                {tel ? (
                  <a className="hover:text-accent" href={tel}>
                    {company.phoneDisplay ?? company.phone}
                  </a>
                ) : (
                  <Placeholder>Phone number</Placeholder>
                )}
              </ContactRow>
              <ContactRow icon={<WhatsAppIcon className="size-4" />}>
                {wa ? (
                  <a className="hover:text-accent" href={wa} target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                ) : (
                  <Placeholder>WhatsApp number</Placeholder>
                )}
              </ContactRow>
              <ContactRow icon={<Mail className="size-4" />}>
                {mail ? (
                  <a className="break-all hover:text-accent" href={mail}>
                    {company.email}
                  </a>
                ) : (
                  <Placeholder>Email address</Placeholder>
                )}
              </ContactRow>
              <ContactRow icon={<MapPin className="size-4" />}>{company.address ?? <Placeholder>Office address</Placeholder>}</ContactRow>
              <ContactRow icon={<Clock className="size-4" />}>{company.officeHours ?? <Placeholder>Office hours</Placeholder>}</ContactRow>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/8 pt-8 text-xs text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-white/40">Moving Pakistan Forward</p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-lg font-bold uppercase tracking-[0.15em] text-white">{title}</h3>
      <ul className="mt-5 space-y-2.5">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <li>
      <Link to={to} className="group inline-flex items-center gap-1.5 text-sm text-mist/70 transition-colors hover:text-white">
        <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />
        {children}
      </Link>
    </li>
  )
}

function ContactRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-white/5 text-accent">{icon}</span>
      <span className="pt-1.5">{children}</span>
    </li>
  )
}
