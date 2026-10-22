import { ArrowRight, Check, Eye, Target } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { company } from '../data/company'
import { cities, fleet, services, values } from '../data/content'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal, Stagger, StaggerItem } from '../components/motion'
import { Button } from '../components/Button'
import { CTABanner } from '../components/CTABanner'
import { Placeholder } from '../components/Placeholder'

const capabilities = [
  'Full-truck-load movements between major cities',
  'Light, medium and heavy vehicles — pickups to flatbed trailers',
  'Dedicated vehicles on daily, monthly or contract terms',
  'Phased project logistics for corporate and infrastructure work',
  'Coordinated loading, transit and delivery handover',
  'A single point of contact for every consignment',
]

export default function About() {
  useSeo(
    'About Us',
    `Learn about ${company.name} — a Pakistani transportation company providing corporate, intercity and project logistics across Pakistan.`,
  )
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Built on <span className="text-accent">reliability</span>
          </>
        }
        text="A Pakistani transportation company keeping businesses moving between the country’s major cities."
        image="/images/rural-road-truck.webp"
        position="center 40%"
        crumbs={[{ label: 'About Us' }]}
      />

      {/* overview */}
      <section className="py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Company profile" title="Who we are" />
            <Reveal delay={0.15}>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-mist/80 sm:text-lg">
                <p>
                  {company.name} provides road transportation and logistics for businesses across Pakistan. We move cargo between Islamabad, Rawalpindi, Lahore,
                  Karachi, Peshawar, Faisalabad, Multan and other cities — using vehicles sized to each job, from pickups and Shahzore trucks to Mazda trucks,
                  container trucks and flatbed trailers.
                </p>
                <p>
                  Our work spans corporate transportation, intercity freight, commercial cargo, dedicated vehicle arrangements and project-based logistics. Corporate
                  clients — including technology companies such as ZTE — rely on us for transport that is planned, documented and delivered as agreed.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 rounded-2xl border border-dashed border-amber/40 bg-amber/5 p-5 text-sm text-mist/80">
              <p className="mb-2 font-semibold text-white">Company facts</p>
              <ul className="space-y-1.5">
                <li>
                  Founded: <Placeholder>Year established</Placeholder>
                </li>
                <li>
                  Head office: <Placeholder>City / address</Placeholder>
                </li>
                <li>
                  Registration: <Placeholder>Company registration / NTN</Placeholder>
                </li>
              </ul>
            </Reveal>
          </div>
          <div className="relative">
            <Reveal x={40} y={0}>
              <img src="/images/container-highway.webp" alt="Container trucks travelling on a highway through hills" loading="lazy" className="aspect-[4/3] w-full rounded-[2rem] object-cover" />
            </Reveal>
            <Stagger className="mt-5 grid grid-cols-3 gap-4">
              {[
                { n: cities.filter((c) => c.core).length, l: 'Major cities' },
                { n: fleet.length, l: 'Vehicle types' },
                { n: services.length, l: 'Service lines' },
              ].map((s) => (
                <StaggerItem key={s.l} className="rounded-2xl border border-white/10 bg-panel p-5 text-center">
                  <p className="font-display text-5xl font-extrabold text-accent">{s.n}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-mist/70">{s.l}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* mission & vision */}
      <section className="bg-paper py-24 text-ink sm:py-32">
        <div className="container-x">
          <SectionHeading tone="light" eyebrow="Purpose" title="Mission & vision" align="center" />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Target,
                title: 'Our mission',
                text: 'To provide safe, reliable and accountable transportation that helps Pakistani businesses move their goods with confidence — matching the right vehicle to every load and delivering on what we agree.',
              },
              {
                icon: Eye,
                title: 'Our vision',
                text: 'To be a trusted transportation partner for corporate and industrial clients nationwide, recognised for dependable service on every route we run — moving Pakistan forward, one delivery at a time.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title} className="group relative overflow-hidden rounded-3xl bg-white p-9 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] sm:p-12">
                <span className="absolute -right-6 -top-6 size-32 rounded-full bg-accent/10 transition-transform duration-700 group-hover:scale-[3]" />
                <Icon className="relative size-11 text-accent" aria-hidden />
                <h3 className="relative mt-6 text-4xl font-extrabold uppercase">{title}</h3>
                <p className="relative mt-4 leading-relaxed text-zinc-600 sm:text-lg">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* values */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Our values" title="How we do business" text="The principles behind every consignment we carry." />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ title, text, icon: Icon }, i) => (
              <StaggerItem key={title} className="group rounded-3xl border border-white/10 bg-panel p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50">
                <div className="flex items-center justify-between">
                  <Icon className="size-9 text-accent" aria-hidden />
                  <span className="font-display text-3xl font-extrabold text-white/10">0{i + 1}</span>
                </div>
                <h3 className="mt-8 text-3xl font-bold uppercase">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist/70">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* capabilities */}
      <section className="relative overflow-hidden bg-coal py-24 sm:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal x={-40} y={0} className="relative">
            <img src="/images/flatbed.webp" alt="A flatbed trailer loaded with heavy cargo" loading="lazy" className="aspect-[5/4] w-full rounded-[2rem] object-cover" />
            <div className="stripes absolute -bottom-4 -left-4 -z-10 h-32 w-32 rounded-2xl opacity-60" aria-hidden />
          </Reveal>
          <div>
            <SectionHeading eyebrow="Business approach" title="Operational capabilities" text="We approach every job the same way: understand the cargo, choose the vehicle, plan the route, and communicate until it is delivered." />
            <Stagger as="ul" className="mt-8 space-y-3">
              {capabilities.map((c) => (
                <StaggerItem as="li" key={c} className="flex items-start gap-3 rounded-xl border border-white/8 bg-ink/50 px-4 py-3.5">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  <span className="text-white/90">{c}</span>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-3">
              <Button to="/services">
                Our services <ArrowRight className="size-4" />
              </Button>
              <Button to="/team" variant="outline">
                Meet the team
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
