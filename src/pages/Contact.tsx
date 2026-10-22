import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Clock, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { company, emailLink, phoneLink, whatsappLink } from '../data/company'
import { cities, fleet, services } from '../data/content'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/motion'
import { Placeholder } from '../components/Placeholder'
import { Button } from '../components/Button'
import { WhatsAppIcon } from '../components/Icons'

type Fields = {
  name: string
  company: string
  phone: string
  email: string
  pickup: string
  destination: string
  vehicle: string
  service: string
  date: string
  details: string
  website: string // honeypot
}
type Errors = Partial<Record<keyof Fields, string>>
type Status = { kind: 'idle' | 'sending' | 'success' | 'error' | 'unconfigured'; message?: string }

const cityOptions = [...cities.map((c) => c.name).sort(), 'Other (specify in details)']

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your full name.'
  const digits = f.phone.replace(/[^\d]/g, '')
  if (!f.phone.trim()) e.phone = 'Please enter a phone number so we can reach you.'
  else if (!/^[+\d][\d\s-]+$/.test(f.phone.trim()) || digits.length < 10 || digits.length > 15)
    e.phone = 'Enter a valid number, e.g. 0300 1234567 or +92 300 1234567.'
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Enter a valid email address or leave it blank.'
  if (!f.pickup) e.pickup = 'Select a pickup city.'
  if (!f.destination) e.destination = 'Select a destination city.'
  if (f.pickup && f.destination && f.pickup === f.destination && !f.pickup.startsWith('Other'))
    e.destination = 'Destination should differ from pickup — for local moves, choose “Other” and explain in details.'
  if (f.details.trim().length < 15) e.details = 'Please describe the shipment (cargo type, approximate weight/volume) — at least 15 characters.'
  return e
}

function composeMessage(f: Fields) {
  const v = fleet.find((x) => x.id === f.vehicle)?.name ?? (f.vehicle || 'Not sure')
  const s = services.find((x) => x.slug === f.service)?.title ?? 'Not specified'
  return [
    `Transportation inquiry — ${company.name}`,
    '',
    `Name: ${f.name}`,
    f.company ? `Company: ${f.company}` : null,
    `Phone: ${f.phone}`,
    f.email ? `Email: ${f.email}` : null,
    `Route: ${f.pickup} → ${f.destination}`,
    `Vehicle: ${v}`,
    `Service: ${s}`,
    f.date ? `Preferred date: ${f.date}` : null,
    '',
    'Shipment details:',
    f.details,
  ]
    .filter((l): l is string => l !== null)
    .join('\n')
}

export default function Contact() {
  useSeo('Contact Us', `Contact ${company.name} for a transportation quote — phone, WhatsApp, email and an online inquiry form.`)
  const [params] = useSearchParams()

  const initial = useMemo<Fields>(() => {
    const pick = (v: string | null) => (v && cityOptions.includes(v) ? v : '')
    const vehicle = params.get('vehicle')
    const service = params.get('service')
    return {
      name: '',
      company: '',
      phone: '',
      email: '',
      pickup: pick(params.get('from')),
      destination: pick(params.get('to')),
      vehicle: vehicle && fleet.some((f) => f.id === vehicle) ? vehicle : '',
      service: service && services.some((s) => s.slug === service) ? service : '',
      date: '',
      details: params.get('subject') === 'route' ? 'Route inquiry: ' : '',
      website: '',
    }
  }, [params])

  const [fields, setFields] = useState<Fields>(initial)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const formRef = useRef<HTMLFormElement>(null)

  // re-apply prefill when arriving with new query params while already on this page
  useEffect(() => {
    setFields((f) => ({
      ...f,
      pickup: initial.pickup || f.pickup,
      destination: initial.destination || f.destination,
      vehicle: initial.vehicle || f.vehicle,
      service: initial.service || f.service,
      details: f.details || initial.details,
    }))
  }, [initial])

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    const next = { ...fields, [k]: e.target.value }
    setFields(next)
    if (touched[k]) setErrors(validate(next))
  }
  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors(validate(fields))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (fields.website) return // bot
    const errs = validate(fields)
    setErrors(errs)
    setTouched(Object.fromEntries(Object.keys(fields).map((k) => [k, true])))
    if (Object.keys(errs).length) {
      setStatus({ kind: 'error', message: 'Please correct the highlighted fields.' })
      const first = Object.keys(errs)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    const message = composeMessage(fields)
    setStatus({ kind: 'sending' })

    if (company.inquiryEndpoint) {
      try {
        const { website: _hp, ...payload } = fields
        void _hp
        const res = await fetch(company.inquiryEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...payload, message }),
        })
        if (!res.ok) throw new Error(String(res.status))
        setStatus({ kind: 'success', message: 'Thank you — your inquiry has been received. Our team will contact you shortly.' })
        setFields({ ...initial, pickup: '', destination: '', vehicle: '', service: '', details: '' })
        setTouched({})
      } catch {
        setStatus({ kind: 'error', message: 'We could not send your inquiry right now. Please try again, or contact us by phone or WhatsApp.' })
      }
      return
    }

    const wa = whatsappLink(message)
    if (wa) {
      window.open(wa, '_blank', 'noopener,noreferrer')
      setStatus({ kind: 'success', message: 'Your inquiry is ready in WhatsApp — press send there to deliver it to our team.' })
      return
    }
    const mail = emailLink(`Transportation inquiry: ${fields.pickup} → ${fields.destination}`, message)
    if (mail) {
      window.location.href = mail
      setStatus({ kind: 'success', message: 'Your email app has opened with the inquiry — press send to deliver it to our team.' })
      return
    }
    setStatus({
      kind: 'unconfigured',
      message: 'Your details are valid, but online inquiries are not connected yet. Please contact us directly using the details on this page.',
    })
  }

  const fieldProps = (k: keyof Fields) => ({
    id: k,
    name: k,
    value: fields[k],
    onChange: set(k),
    onBlur: blur(k),
    'aria-invalid': touched[k] && errors[k] ? true : undefined,
    'aria-describedby': touched[k] && errors[k] ? `${k}-error` : undefined,
    className: 'field',
  })
  const err = (k: keyof Fields) => (touched[k] && errors[k] ? errors[k] : undefined)

  const tel = phoneLink()
  const wa = whatsappLink()
  const mail = emailLink()

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={
          <>
            Let’s move <span className="text-accent">your cargo</span>
          </>
        }
        text="Request a quote, ask about a route or discuss a contract. Share your shipment details and our team will get back to you."
        image="/images/truck-road-blue.webp"
        crumbs={[{ label: 'Contact Us' }]}
      />

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
          {/* contact details */}
          <div className="space-y-4">
            <Reveal>
              <span className="eyebrow">Reach us</span>
              <h2 className="mt-4 text-4xl font-extrabold uppercase sm:text-5xl">Contact details</h2>
            </Reveal>
            <ContactCard icon={<Phone className="size-5" />} title="Phone" delay={0.05}>
              {tel ? (
                <a href={tel} className="text-lg font-semibold hover:text-accent">
                  {company.phoneDisplay ?? company.phone}
                </a>
              ) : (
                <Placeholder>Phone number</Placeholder>
              )}
            </ContactCard>
            <ContactCard icon={<WhatsAppIcon className="size-5" />} title="WhatsApp" delay={0.1}>
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:text-accent">
                  Start a chat
                </a>
              ) : (
                <Placeholder>WhatsApp number</Placeholder>
              )}
            </ContactCard>
            <ContactCard icon={<Mail className="size-5" />} title="Email" delay={0.15}>
              {mail ? (
                <a href={mail} className="break-all text-lg font-semibold hover:text-accent">
                  {company.email}
                </a>
              ) : (
                <Placeholder>Email address</Placeholder>
              )}
            </ContactCard>
            <ContactCard icon={<MapPin className="size-5" />} title="Office" delay={0.2}>
              {company.address ? <span className="text-base">{company.address}</span> : <Placeholder>Office address</Placeholder>}
            </ContactCard>
            <ContactCard icon={<Clock className="size-5" />} title="Office hours" delay={0.25}>
              {company.officeHours ? <span className="text-base">{company.officeHours}</span> : <Placeholder>Office hours</Placeholder>}
            </ContactCard>

            {(tel || wa) && (
              <Reveal delay={0.3} className="flex flex-wrap gap-3 pt-2">
                {tel && (
                  <Button href={tel}>
                    <Phone className="size-4" /> Call now
                  </Button>
                )}
                {wa && (
                  <Button href={wa} variant="whatsapp">
                    <WhatsAppIcon className="size-4" /> WhatsApp
                  </Button>
                )}
              </Reveal>
            )}
          </div>

          {/* inquiry form */}
          <Reveal delay={0.1}>
            <div id="quote" className="relative scroll-mt-28 overflow-hidden rounded-[2rem] border border-white/10 bg-panel p-6 sm:p-10">
              <div className="stripes absolute inset-x-0 top-0 h-1.5 opacity-90" aria-hidden />
              <h2 className="text-4xl font-extrabold uppercase sm:text-5xl">Transportation inquiry</h2>
              <p className="mt-2 text-sm text-mist/70">
                Fields marked <span className="text-accent">*</span> are required.
              </p>

              <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field label="Full name" k="name" required error={err('name')}>
                  <input {...fieldProps('name')} type="text" autoComplete="name" placeholder="Your name" />
                </Field>
                <Field label="Company" k="company" error={err('company')}>
                  <input {...fieldProps('company')} type="text" autoComplete="organization" placeholder="Company name (optional)" />
                </Field>
                <Field label="Phone number" k="phone" required error={err('phone')}>
                  <input {...fieldProps('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="03XX XXXXXXX" />
                </Field>
                <Field label="Email" k="email" error={err('email')}>
                  <input {...fieldProps('email')} type="email" autoComplete="email" placeholder="you@company.com (optional)" />
                </Field>
                <Field label="Pickup city" k="pickup" required error={err('pickup')}>
                  <select {...fieldProps('pickup')}>
                    <option value="">Select pickup city</option>
                    {cityOptions.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Destination city" k="destination" required error={err('destination')}>
                  <select {...fieldProps('destination')}>
                    <option value="">Select destination city</option>
                    {cityOptions.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Vehicle type" k="vehicle" error={err('vehicle')}>
                  <select {...fieldProps('vehicle')}>
                    <option value="">Not sure — recommend one</option>
                    {fleet.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Service" k="service" error={err('service')}>
                  <select {...fieldProps('service')}>
                    <option value="">Select a service (optional)</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Preferred date" k="date" error={err('date')} className="sm:col-span-2">
                  <input {...fieldProps('date')} type="date" min={new Date().toISOString().slice(0, 10)} className="field [color-scheme:dark]" />
                </Field>
                <Field label="Shipment details" k="details" required error={err('details')} className="sm:col-span-2">
                  <textarea {...fieldProps('details')} rows={5} placeholder="Cargo type, approximate weight / volume, number of trips, loading requirements…" />
                </Field>

                {/* honeypot */}
                <div className="hidden" aria-hidden>
                  <label>
                    Website <input name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={set('website')} />
                  </label>
                </div>

                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-steel">We use your details only to respond to this inquiry.</p>
                  <Button type="submit" size="lg" disabled={status.kind === 'sending'} className="sm:min-w-52">
                    {status.kind === 'sending' ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send inquiry <Send className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="sm:col-span-2" aria-live="polite" role="status">
                  <AnimatePresence mode="wait">
                    {status.message && status.kind !== 'sending' && (
                      <motion.div
                        key={status.kind + status.message}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className={`flex items-start gap-3 rounded-2xl border p-4 text-sm ${
                          status.kind === 'success'
                            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                            : status.kind === 'unconfigured'
                              ? 'border-amber/40 bg-amber/10 text-amber'
                              : 'border-red-500/40 bg-red-500/10 text-red-200'
                        }`}
                      >
                        {status.kind === 'success' ? <CheckCircle2 className="mt-0.5 size-5 shrink-0" /> : <AlertCircle className="mt-0.5 size-5 shrink-0" />}
                        <span>{status.message}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Field({ label, k, required, error, className = '', children }: { label: string; k: string; required?: boolean; error?: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={k} className="mb-2 block text-sm font-semibold text-white/90">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p id={`${k}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <AlertCircle className="size-3.5 shrink-0" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function ContactCard({ icon, title, delay, children }: { icon: ReactNode; title: string; delay: number; children: ReactNode }) {
  return (
    <Reveal delay={delay} className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-panel p-5 transition-colors hover:border-accent/50">
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-white">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-steel">{title}</p>
        <div className="mt-1">{children}</div>
      </div>
    </Reveal>
  )
}
