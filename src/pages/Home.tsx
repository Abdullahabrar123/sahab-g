import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, MapPinned, Quote, Truck, Building2 } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { company } from '../data/company'
import { cities, fleet, lanes, process, reasons, services } from '../data/content'
import { Button } from '../components/Button'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal, Stagger, StaggerItem, ease } from '../components/motion'
import { ServiceCard } from '../components/ServiceCard'
import { FleetCard } from '../components/FleetCard'
import { RouteMap } from '../components/RouteMap'
import { Counter } from '../components/Counter'
import { CTABanner } from '../components/CTABanner'
import { Placeholder } from '../components/Placeholder'

export default function Home() {
  useSeo(company.name, company.description)
  return (
    <>
      <Hero />
      <CityTicker />
      <Intro />
      <Services />
      <Process />
      <FleetPreview />
      <Routes />
      <WhyUs />
      <Testimonials />
      <CTABanner />
    </>
  )
}

/* ───────────────────────────── Hero ───────────────────────────── */

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '25%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '35%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const words = ['Moving', 'Pakistan']

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden" aria-label="Introduction">
      {/* background photo: slow zoom-in + scroll parallax */}
      <motion.div className="absolute inset-0 -z-30" style={{ y: imgY }}>
        <motion.img
          src="/images/hero-truck.webp"
          srcSet="/images/hero-truck-1280.webp 1280w, /images/hero-truck.webp 2400w"
          sizes="100vw"
          alt="A decorated Pakistani cargo truck on an open highway at sunset"
          fetchPriority="high"
          className="size-full object-cover object-[30%_60%]"
          initial={{ scale: reduce ? 1.05 : 1.25 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 2.8, ease }}
        />
      </motion.div>

      {/* overlays for legibility */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-ink/80 via-ink/35 to-transparent" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-t from-ink via-ink/5 to-ink/50" />
      <div className="absolute inset-0 -z-20 bg-ink/35 md:hidden" />
      <div className="grain absolute inset-0 -z-20" />

      {/* animated accent: speed lines */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        {[22, 48, 71].map((top, i) => (
          <motion.span
            key={top}
            className="absolute h-px w-[40vw] bg-gradient-to-r from-transparent via-accent to-transparent"
            style={{ top: `${top}%` }}
            initial={{ x: '-50vw', opacity: 0 }}
            animate={reduce ? { opacity: 0 } : { x: '120vw', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.5 + i, repeat: Infinity, delay: 1.5 + i * 1.3, ease: 'easeInOut' }}
          />
        ))}
        <motion.div
          className="stripes absolute -right-24 bottom-0 hidden h-[45%] w-24 skew-x-[-18deg] opacity-30 lg:block"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1.4, delay: 0.8, ease }}
        />
      </div>

      <motion.div className="container-x relative pb-36 pt-32 sm:pb-40" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.div
          className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 py-1.5 pl-1.5 pr-4 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          <span className="rounded-full bg-accent px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.15em]">Nationwide</span>
          <span className="text-xs font-medium text-white/85 sm:text-sm">Islamabad · Lahore · Karachi · Peshawar · Multan</span>
        </motion.div>

        <h1 className="mt-7 font-display [text-shadow:0_4px_30px_rgba(0,0,0,0.45)] text-[3.9rem] font-extrabold uppercase leading-[0.86] tracking-tight sm:text-8xl lg:text-[9.5rem]">
          {words.map((w, i) => (
            <span key={w} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.45 + i * 0.12, ease }}
              >
                {w}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden pb-2">
            <motion.span
              className="block bg-gradient-to-r from-accent via-accent-hot to-amber bg-clip-text italic text-transparent"
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.69, ease }}
            >
              Forward.
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="mt-7 max-w-xl text-lg leading-relaxed text-white/90 [text-shadow:0_2px_12px_rgba(0,0,0,0.6)] sm:text-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease }}
        >
          Reliable transportation and logistics solutions connecting businesses across Pakistan.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease }}
        >
          <Button to="/services" size="lg">
            Explore Our Services
            <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
          <Button to="/contact#quote" variant="outline" size="lg">
            Request a Quote
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </Button>
        </motion.div>
      </motion.div>

      {/* bottom info bar */}
      <motion.div
        className="absolute inset-x-0 bottom-0 hidden border-t border-white/10 bg-ink/50 backdrop-blur-md md:block"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 1.3, ease }}
      >
        <div className="container-x grid grid-cols-3 divide-x divide-white/10">
          {[
            { icon: MapPinned, title: 'Intercity lanes', text: 'Peshawar to Karachi' },
            { icon: Truck, title: 'Every vehicle size', text: 'Pickups to flatbed trailers' },
            { icon: Building2, title: 'Corporate & projects', text: 'Contract & dedicated hire' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4 px-6 py-5 first:pl-0">
              <span className="grid size-11 place-items-center rounded-xl bg-accent/15 text-accent">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-xl font-bold uppercase leading-none">{title}</p>
                <p className="mt-1 text-sm text-white/65">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* scroll indicator */}
      <motion.a
        href="#intro"
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/60 hover:text-white md:bottom-auto md:left-auto md:right-8 md:top-1/2 md:-translate-x-0 md:-translate-y-1/2 lg:right-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-white/40 pt-2">
          <span className="animate-scroll-dot block size-1.5 rounded-full bg-accent" />
        </span>
        <span className="md:[writing-mode:vertical-rl]">Scroll</span>
      </motion.a>
    </section>
  )
}

/* ───────────────────────────── City ticker ───────────────────────────── */

function CityTicker() {
  const items = [...cities.map((c) => c.name), 'Nationwide Road Freight']
  return (
    <div className="relative overflow-hidden border-y border-accent bg-accent py-4" aria-hidden>
      <div className="animate-marquee flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {items.map((name) => (
              <span key={name + k} className="flex items-center font-display text-2xl font-extrabold uppercase tracking-wide text-ink sm:text-3xl">
                <span className="px-6">{name}</span>
                <Truck className="size-5 text-white" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ───────────────────────────── Intro ───────────────────────────── */

function Intro() {
  const core = cities.filter((c) => c.core).length
  const facts = [
    { value: core, suffix: '', label: 'Major cities connected' },
    { value: fleet.length, suffix: '', label: 'Vehicle categories' },
    { value: services.length, suffix: '', label: 'Specialised services' },
  ]
  return (
    <section id="intro" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-10 size-[32rem] rounded-full bg-accent/10 blur-[150px]" aria-hidden />
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <Reveal x={-40} y={0} className="relative">
            <div className="overflow-hidden rounded-[2rem]">
              <img src="/images/decorated-trucks.webp" alt="Decorated Pakistani cargo trucks lined up on a road" loading="lazy" className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]" />
            </div>
          </Reveal>
          <Reveal delay={0.25} className="absolute -bottom-8 -right-2 w-[52%] sm:-right-8 lg:-right-10">
            <div className="overflow-hidden rounded-3xl border-[6px] border-ink shadow-2xl">
              <img src="/images/loading-cargo.webp" alt="Cargo being loaded onto a truck" loading="lazy" className="aspect-square w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.4} className="absolute -left-2 top-8 sm:-left-6">
            <div className="rounded-2xl bg-accent px-5 py-4 shadow-xl shadow-accent/30">
              <p className="font-display text-4xl font-extrabold leading-none">PK</p>
              <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.2em]">Coast to mountains</p>
            </div>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Who we are"
            title={
              <>
                Your cargo. <span className="text-accent">Our road.</span>
              </>
            }
            text={`${company.name} is a Pakistani transportation company moving goods for businesses between Islamabad, Rawalpindi, Lahore, Karachi, Peshawar, Faisalabad, Multan and other cities. We pair the right vehicle with every load, and keep you informed from pickup to delivery.`}
          />
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist/70">
              From single pickups to dedicated contract fleets and project logistics, we work with corporate clients who need a dependable partner on Pakistan’s roads.
            </p>
          </Reveal>

          <Stagger className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {facts.map((f) => (
              <StaggerItem key={f.label} className="rounded-2xl border border-white/10 bg-panel/70 p-4 sm:p-5">
                <Counter value={f.value} suffix={f.suffix} className="font-display text-5xl font-extrabold text-accent sm:text-6xl" />
                <p className="mt-2 text-xs font-medium leading-snug text-mist/70 sm:text-sm">{f.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
          {company.verifiedStats.length > 0 && (
            <Stagger className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {company.verifiedStats.map((s) => (
                <StaggerItem key={s.label} className="rounded-2xl border border-white/10 bg-panel/70 p-5">
                  <Counter value={s.value} suffix={s.suffix} className="font-display text-5xl font-extrabold text-white" />
                  <p className="mt-2 text-sm text-mist/70">{s.label}</p>
                </StaggerItem>
              ))}
            </Stagger>
          )}

          <Reveal delay={0.2} className="mt-10">
            <Button to="/about" variant="outline">
              More about us <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────────── Services ───────────────────────────── */

function Services() {
  return (
    <section className="relative bg-coal py-24 sm:py-32">
      <div className="grid-bg absolute inset-0 opacity-50" aria-hidden />
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Transport services <br className="hidden sm:block" />
                built for business
              </>
            }
          />
          <Reveal delay={0.2}>
            <Button to="/services" variant="outline">
              All services <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <StaggerItem key={s.slug} className="h-full">
              <ServiceCard service={s} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ───────────────────────────── Process ───────────────────────────── */

function Process() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="How it works" title="From quote to delivery" align="center" />
        <Stagger className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4" gap={0.14}>
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent lg:block" aria-hidden />
          {process.map((p) => (
            <StaggerItem key={p.step} className="group relative text-center">
              <div className="relative mx-auto grid size-[4.5rem] place-items-center rounded-full border border-white/15 bg-ink font-display text-2xl font-extrabold text-accent transition-all duration-500 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                {p.step}
              </div>
              <h3 className="mt-6 text-2xl font-bold uppercase">{p.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-mist/70">{p.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ───────────────────────────── Fleet preview ───────────────────────────── */

function FleetPreview() {
  const featured = ['container-truck', 'flatbed', 'mazda', 'shahzore'].map((id) => fleet.find((v) => v.id === id)!)
  return (
    <section className="relative overflow-hidden bg-paper py-24 text-ink sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            tone="light"
            eyebrow="Our fleet"
            title={
              <>
                The right truck <br className="hidden sm:block" />
                for every load
              </>
            }
            text="From pickups for urgent small loads to flatbed trailers for heavy equipment — vehicles matched to your cargo."
          />
          <Reveal delay={0.2}>
            <Link to="/fleet" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-accent">
              View full fleet <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((v) => (
            <StaggerItem key={v.id} className="h-full">
              <FleetCard vehicle={v} compact />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ───────────────────────────── Routes ───────────────────────────── */

function Routes() {
  const top = lanes.slice(0, 5)
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-40 bottom-0 size-[30rem] rounded-full bg-accent/10 blur-[150px]" aria-hidden />
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Cities & routes"
            title={
              <>
                Connecting Pakistan, <span className="text-accent">north to south</span>
              </>
            }
            text="Along the motorway and national highway network — from Peshawar and Islamabad through Punjab’s industrial heartland to the port city of Karachi."
          />
          <Stagger className="mt-10 space-y-3">
            {top.map((l) => (
              <StaggerItem key={l.from + l.to}>
                <Link
                  to={`/contact?from=${l.from}&to=${l.to}#quote`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-panel/60 px-5 py-4 transition-all duration-300 hover:border-accent/60 hover:bg-panel"
                >
                  <span className="flex flex-wrap items-center gap-x-3 font-display text-xl font-bold uppercase sm:text-2xl">
                    {l.from}
                    <span className="relative inline-block h-px w-8 bg-accent sm:w-12">
                      <span className="absolute -right-0.5 -top-[3px] size-[7px] rotate-45 border-r border-t border-accent" />
                    </span>
                    {l.to}
                  </span>
                  <span className="flex shrink-0 items-center gap-3 text-xs text-steel">
                    <span className="hidden sm:inline">≈ {l.km.toLocaleString()} km</span>
                    <ArrowUpRight className="size-5 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
            <Button to="/routes">
              Explore coverage <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
            <Button to="/contact?subject=route#quote" variant="outline">
              Ask about a route
            </Button>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="mx-auto w-full max-w-lg rounded-[2rem] border border-white/10 bg-gradient-to-b from-panel to-coal p-5 sm:p-8">
          <RouteMap />
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────────── Why us ───────────────────────────── */

function WhyUs() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <img src="/images/mountain-highway.webp" alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-20 size-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-ink/90" />
      <div className="container-x">
        <SectionHeading eyebrow="Why choose us" title="Trusted on every kilometre" align="center" text="What our clients can expect on every consignment." />
        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ title, text, icon: Icon }) => (
            <StaggerItem key={title} className="group relative bg-ink/80 p-8 backdrop-blur-sm transition-colors duration-500 hover:bg-panel">
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              <Icon className="size-9 text-accent transition-transform duration-500 group-hover:-translate-y-1" aria-hidden />
              <h3 className="mt-6 text-2xl font-bold uppercase">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist/70">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ───────────────────────────── Testimonials ───────────────────────────── */

function Testimonials() {
  const list = company.testimonials
  return (
    <section className="bg-coal py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Client voices" title="What our clients say" />
          <Reveal delay={0.2}>
            <Button to="/clients" variant="outline">
              Clients & contracts <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {(list.length ? list : [0, 1, 2]).map((t, i) => (
            <StaggerItem key={i} className="relative flex flex-col rounded-3xl border border-white/10 bg-panel p-8">
              <Quote className="size-10 text-accent" aria-hidden />
              {typeof t === 'number' ? (
                <>
                  <p className="mt-6 flex-1 text-lg leading-relaxed text-white/50 italic">
                    “A verified testimonial from a client will appear here once approved for publication.”
                  </p>
                  <div className="mt-8 border-t border-white/10 pt-5">
                    <Placeholder>{`Client testimonial ${i + 1}`}</Placeholder>
                    <p className="mt-2 text-sm text-steel">Name · Role · Company</p>
                  </div>
                </>
              ) : (
                <>
                  <p className="mt-6 flex-1 text-lg leading-relaxed text-white/90">“{t.quote}”</p>
                  <div className="mt-8 border-t border-white/10 pt-5">
                    <p className="font-display text-xl font-bold uppercase">{t.name}</p>
                    <p className="text-sm text-steel">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </>
              )}
            </StaggerItem>
          ))}
        </Stagger>
        {company.clients.length > 0 && (
          <Reveal className="mt-16 flex flex-col items-center gap-6 border-t border-white/10 pt-12 sm:flex-row sm:justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-steel">Trusted by corporate clients including</p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {company.clients.map((c) =>
                c.logo ? (
                  <img key={c.name} src={c.logo} alt={c.name} className="h-10 w-auto opacity-80" loading="lazy" />
                ) : (
                  <span key={c.name} className="font-display text-4xl font-extrabold tracking-[0.12em] text-white/85">
                    {c.name}
                  </span>
                ),
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
