import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { services } from '../data/content'
import { PageHero } from '../components/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/motion'
import { CTABanner } from '../components/CTABanner'
import { Button } from '../components/Button'

export default function Services() {
  useSeo(
    'Our Services',
    'Corporate transportation, intercity freight, commercial cargo, project logistics, dedicated vehicles and customised transport solutions across Pakistan.',
  )
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={
          <>
            Logistics that <span className="text-accent">delivers</span>
          </>
        }
        text="Six ways we keep your business moving — from single intercity loads to dedicated fleets and full project logistics."
        image="/images/semi-night.webp"
        crumbs={[{ label: 'Our Services' }]}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur transition-colors hover:border-accent hover:text-white"
            >
              {s.title}
            </a>
          ))}
        </div>
      </PageHero>

      <section className="py-16 sm:py-24">
        <div className="container-x space-y-24 sm:space-y-32">
          {services.map((s, i) => {
            const Icon = s.icon
            const flip = i % 2 === 1
            return (
              <article key={s.slug} id={s.slug} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <Reveal x={flip ? 40 : -40} y={0} className={`relative ${flip ? 'lg:order-2' : ''}`}>
                  <Link to={`/services/${s.slug}`} className="group block overflow-hidden rounded-[2rem]" aria-label={`${s.title} — details`}>
                    <img src={s.image} alt={s.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                  </Link>
                  <span className={`absolute -top-5 grid size-16 place-items-center rounded-2xl bg-accent shadow-xl shadow-accent/30 ${flip ? '-left-3 sm:-left-5' : '-right-3 sm:-right-5'}`}>
                    <Icon className="size-7" aria-hidden />
                  </span>
                </Reveal>
                <div>
                  <Reveal>
                    <span className="font-display text-7xl font-extrabold leading-none text-white/10">0{i + 1}</span>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <h2 className="-mt-6 text-4xl font-extrabold uppercase sm:text-6xl">{s.title}</h2>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="mt-5 text-lg leading-relaxed text-mist/80">{s.intro}</p>
                  </Reveal>
                  <Stagger as="ul" className="mt-7 grid gap-3 sm:grid-cols-2">
                    {s.features.slice(0, 4).map((f) => (
                      <StaggerItem as="li" key={f} className="flex items-start gap-2.5 text-sm text-white/90">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                        {f}
                      </StaggerItem>
                    ))}
                  </Stagger>
                  <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-3">
                    <Button to={`/services/${s.slug}`}>
                      Service details <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                    <Button to={`/contact?service=${s.slug}#quote`} variant="outline">
                      Get a quote
                    </Button>
                  </Reveal>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <CTABanner title="Not sure which service fits?" text="Describe your shipment and we will recommend the right service, vehicle and route." />
    </>
  )
}
