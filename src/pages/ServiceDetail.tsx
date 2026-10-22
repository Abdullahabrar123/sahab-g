import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { services, vehicleById, process } from '../data/content'
import { PageHero } from '../components/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/motion'
import { Button } from '../components/Button'
import { FleetCard } from '../components/FleetCard'
import { CTABanner } from '../components/CTABanner'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams()
  const index = services.findIndex((s) => s.slug === slug)
  const s = services[index]
  useSeo(s ? s.title : 'Service not found', s ? s.intro : 'The requested service could not be found.')
  if (!s) return <NotFound />

  const next = services[(index + 1) % services.length]
  const Icon = s.icon
  const vehicles = s.vehicles.map(vehicleById).filter((v): v is NonNullable<typeof v> => Boolean(v))

  return (
    <>
      <PageHero
        eyebrow={`Service 0${index + 1}`}
        title={s.title}
        text={s.intro}
        image={s.image}
        crumbs={[{ to: '/services', label: 'Our Services' }, { label: s.title }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to={`/contact?service=${s.slug}#quote`} size="lg">
            Request a Quote <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <span className="grid size-16 place-items-center rounded-2xl bg-accent shadow-xl shadow-accent/30">
                <Icon className="size-7" aria-hidden />
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 text-4xl font-extrabold uppercase sm:text-5xl">Overview</h2>
            </Reveal>
            {s.body.map((p, i) => (
              <Reveal key={i} delay={0.15 + i * 0.05}>
                <p className="mt-5 text-lg leading-relaxed text-mist/80">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.1}>
              <h2 className="mt-14 text-4xl font-extrabold uppercase sm:text-5xl">What’s included</h2>
            </Reveal>
            <Stagger as="ul" className="mt-7 grid gap-3 sm:grid-cols-2">
              {s.features.map((f) => (
                <StaggerItem as="li" key={f} className="flex items-start gap-3 rounded-xl border border-white/10 bg-panel px-4 py-4">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  <span className="text-sm text-white/90">{f}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal className="rounded-3xl border border-white/10 bg-panel p-7">
              <h3 className="text-2xl font-bold uppercase">Ideal for</h3>
              <ul className="mt-4 space-y-2.5">
                {s.idealFor.map((x) => (
                  <li key={x} className="flex items-center gap-2.5 text-sm text-mist/85">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="rounded-3xl border border-white/10 bg-panel p-7">
              <h3 className="text-2xl font-bold uppercase">How it works</h3>
              <ol className="mt-4 space-y-4">
                {process.map((p) => (
                  <li key={p.step} className="flex gap-4">
                    <span className="font-display text-xl font-extrabold text-accent">{p.step}</span>
                    <div>
                      <p className="font-semibold">{p.title}</p>
                      <p className="text-sm text-mist/70">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={0.15} className="rounded-3xl bg-accent p-7">
              <h3 className="text-3xl font-extrabold uppercase">Need this service?</h3>
              <p className="mt-2 text-sm text-white/90">Share your pickup, destination and cargo details for a quote.</p>
              <Button to={`/contact?service=${s.slug}#quote`} variant="light" className="mt-5">
                Request a Quote <ArrowRight className="size-4" />
              </Button>
            </Reveal>
          </aside>
        </div>
      </section>

      {vehicles.length > 0 && (
        <section className="bg-coal py-20 sm:py-28">
          <div className="container-x">
            <Reveal>
              <span className="eyebrow">Suitable vehicles</span>
              <h2 className="mt-4 text-4xl font-extrabold uppercase sm:text-6xl">Vehicles for this service</h2>
            </Reveal>
            <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {vehicles.slice(0, 4).map((v) => (
                <StaggerItem key={v.id} className="h-full">
                  <FleetCard vehicle={v} compact />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <section className="border-y border-white/10">
        <div className="container-x flex flex-col items-stretch justify-between gap-4 py-8 sm:flex-row sm:items-center">
          <Link to="/services" className="group inline-flex items-center gap-2 text-sm font-semibold text-mist/80 hover:text-white">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> All services
          </Link>
          <Link to={`/services/${next.slug}`} className="group text-right">
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-steel">Next service</span>
            <span className="inline-flex items-center gap-2 font-display text-2xl font-bold uppercase transition-colors group-hover:text-accent sm:text-3xl">
              {next.title} <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
