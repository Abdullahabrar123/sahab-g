import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { cities, lanes } from '../data/content'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal, Stagger, StaggerItem } from '../components/motion'
import { RouteMap } from '../components/RouteMap'
import { Button } from '../components/Button'
import { CTABanner } from '../components/CTABanner'

export default function RoutesPage() {
  useSeo('Routes & Coverage', 'Transportation between Islamabad, Rawalpindi, Lahore, Karachi, Peshawar, Faisalabad, Multan and other cities across Pakistan.')
  const core = cities.filter((c) => c.core)
  const more = cities.filter((c) => !c.core)

  return (
    <>
      <PageHero
        eyebrow="Routes & coverage"
        title={
          <>
            From the Khyber <span className="text-accent">to the coast</span>
          </>
        }
        text="Intercity transportation along Pakistan’s motorway and highway network — connecting the north, Punjab and Sindh."
        image="/images/mountain-highway.webp"
        crumbs={[{ label: 'Routes' }]}
      />

      {/* network */}
      <section id="network" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Our network" title="Cities we serve" text="Our core coverage links Pakistan’s major commercial cities. Other destinations can be arranged on request." />
            <Stagger className="mt-10 grid grid-cols-2 gap-3">
              {core.map((c) => (
                <StaggerItem key={c.name} className="group rounded-2xl border border-white/10 bg-panel p-4 transition-colors hover:border-accent/60">
                  <MapPin className="size-5 text-accent transition-transform group-hover:-translate-y-0.5" aria-hidden />
                  <p className="mt-3 font-display text-2xl font-bold uppercase leading-none">{c.name}</p>
                  <p className="mt-1 text-xs text-steel">{c.province}</p>
                </StaggerItem>
              ))}
              <StaggerItem className="rounded-2xl border border-dashed border-white/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-steel">On request</p>
                <p className="mt-2 text-sm text-mist/80">{more.map((c) => c.name).join(', ')} & more</p>
              </StaggerItem>
            </Stagger>
          </div>
          <Reveal delay={0.1} className="mx-auto w-full max-w-xl rounded-[2rem] border border-white/10 bg-gradient-to-b from-panel to-coal p-5 sm:p-8">
            <RouteMap />
          </Reveal>
        </div>
      </section>

      {/* lanes */}
      <section id="lanes" className="scroll-mt-24 bg-coal py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Popular lanes" title="Major intercity routes" text="Approximate road distances, for orientation. Click any route to request a quote for it." />
          <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lanes.map((l) => (
              <StaggerItem key={l.from + l.to} className="h-full">
                <Link
                  to={`/contact?from=${l.from}&to=${l.to}#quote`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-panel p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-steel">From</p>
                      <p className="font-display text-3xl font-bold uppercase leading-none">{l.from}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-steel">To</p>
                      <p className="font-display text-3xl font-bold uppercase leading-none">{l.to}</p>
                    </div>
                  </div>
                  {/* animated road */}
                  <svg viewBox="0 0 300 24" className="my-6 h-6 w-full" aria-hidden>
                    <circle cx="6" cy="12" r="5" fill="#ff6a13" />
                    <line x1="14" y1="12" x2="286" y2="12" stroke="rgba(255,255,255,0.15)" strokeWidth="6" strokeLinecap="round" />
                    <line x1="14" y1="12" x2="286" y2="12" stroke="#ff6a13" strokeWidth="2" strokeDasharray="10 10" className="animate-road-dash" />
                    <circle cx="294" cy="12" r="5" fill="none" stroke="#fff" strokeWidth="2" />
                  </svg>
                  <div className="mt-auto flex items-end justify-between gap-4">
                    <div>
                      <p className="font-display text-4xl font-extrabold text-accent">≈ {l.km.toLocaleString()} km</p>
                      <p className="text-xs text-mist/70">via {l.via}</p>
                    </div>
                    <span className="grid size-11 place-items-center rounded-full border border-white/15 transition-all group-hover:border-accent group-hover:bg-accent">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* route inquiry */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-panel p-8 sm:p-14">
            <div className="stripes absolute -right-16 -top-16 size-48 rotate-12 rounded-3xl opacity-20" aria-hidden />
            <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
              <div>
                <span className="eyebrow">Route inquiry</span>
                <h2 className="mt-4 text-4xl font-extrabold uppercase sm:text-6xl">Don’t see your route?</h2>
                <p className="mt-4 max-w-xl text-mist/80">
                  We arrange transport to many more cities than listed here. Send us your pickup and destination and we will confirm the route, vehicle and price.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button to="/contact?subject=route#quote" size="lg">
                  Ask about a route <ArrowUpRight className="size-4" />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner image="/images/container-highway.webp" />
    </>
  )
}
