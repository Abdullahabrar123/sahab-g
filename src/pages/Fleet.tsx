import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSeo } from '../hooks/useSeo'
import { fleet, type Vehicle } from '../data/content'
import { PageHero } from '../components/PageHero'
import { FleetCard } from '../components/FleetCard'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal, ease } from '../components/motion'
import { CTABanner } from '../components/CTABanner'

const filters: ('All' | Vehicle['category'])[] = ['All', 'Heavy', 'Medium', 'Light']

const guide = [
  { size: 'Light', vehicles: 'Pickup · Shahzore', when: 'Urgent or compact loads, city and nearby-city runs, tight-access locations.' },
  { size: 'Medium', vehicles: 'Mazda · 6-Wheeler', when: 'Medium to full loads between cities, distribution runs and contract hire.' },
  { size: 'Heavy', vehicles: 'Container · Flatbed', when: 'Long-haul, high-volume, heavy, oversized or project cargo.' },
]

export default function Fleet() {
  useSeo('Our Fleet', 'Trucks, flatbed trailers, Mazda trucks, Shahzore and pickups for every type of load across Pakistan.')
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const list = filter === 'All' ? fleet : fleet.filter((v) => v.category === filter)

  return (
    <>
      <PageHero
        eyebrow="Our fleet"
        title={
          <>
            Every load, <span className="text-accent">the right truck</span>
          </>
        }
        text="From pickups for urgent deliveries to flatbed trailers for heavy equipment — vehicles matched to your cargo, route and timeline."
        image="/images/kenworth.webp"
        crumbs={[{ label: 'Our Fleet' }]}
      />

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Available vehicles" title="Choose your vehicle" />
            <Reveal delay={0.1}>
              <div role="tablist" aria-label="Filter vehicles by size" className="inline-flex rounded-full border border-white/10 bg-panel p-1.5">
                {filters.map((f) => (
                  <button
                    key={f}
                    role="tab"
                    aria-selected={filter === f}
                    onClick={() => setFilter(f)}
                    className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${filter === f ? 'text-white' : 'text-mist/60 hover:text-white'}`}
                  >
                    {filter === f && <motion.span layoutId="fleet-filter" className="absolute inset-0 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                    <span className="relative">{f}</span>
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((v, i) => (
                <motion.div
                  key={v.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease }}
                  className="h-full"
                >
                  <FleetCard vehicle={v} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <p className="mt-8 text-xs text-steel">Photos are representative of each vehicle category. Availability depends on route and date — confirm when requesting a quote.</p>
        </div>
      </section>

      <section className="bg-paper py-20 text-ink sm:py-28">
        <div className="container-x">
          <SectionHeading tone="light" eyebrow="Sizing guide" title="Which vehicle do I need?" text="A quick guide — tell us about your cargo and we will confirm the best fit." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {guide.map((g, i) => (
              <Reveal key={g.size} delay={i * 0.1} className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
                <div className="flex items-end gap-1.5" aria-hidden>
                  {[0, 1, 2].map((b) => (
                    <span key={b} className={`w-3 rounded-sm ${b <= i ? 'bg-accent' : 'bg-zinc-200'}`} style={{ height: 14 + b * 10 }} />
                  ))}
                </div>
                <h3 className="mt-6 text-4xl font-extrabold uppercase">{g.size}</h3>
                <p className="mt-1 font-semibold text-accent">{g.vehicles}</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{g.when}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title="Need a specific vehicle?" text="Tell us the vehicle type, route and date — we will confirm availability and pricing." image="/images/flatbed.webp" />
    </>
  )
}
