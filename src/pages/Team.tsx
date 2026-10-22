import { UserRound } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { company } from '../data/company'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/SectionHeading'
import { Stagger, StaggerItem, Reveal } from '../components/motion'
import { Placeholder } from '../components/Placeholder'
import { CTABanner } from '../components/CTABanner'

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')

export default function Team() {
  useSeo('Our Team', `Meet the management and operations team at ${company.name}.`)
  const team = company.team
  const hasPlaceholders = team.some((m) => !m.name)

  return (
    <>
      <PageHero
        eyebrow="Our team"
        title={
          <>
            The people <span className="text-accent">behind the wheel</span>
          </>
        }
        text="Management and operations professionals who plan, dispatch and deliver every consignment."
        image="/images/unloading.webp"
        position="center 30%"
        crumbs={[{ label: 'Our Team' }]}
      />

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Management & operations" title="Meet the team" text="Experienced people coordinating fleets, routes and client relationships across Pakistan." />
          {hasPlaceholders && (
            <Reveal className="mt-6">
              <Placeholder>Team names, photos & bios to be added</Placeholder>
            </Reveal>
          )}
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <StaggerItem key={i} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-panel transition-all duration-500 hover:-translate-y-1 hover:border-accent/50">
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-coal to-panel">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name ?? m.role} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="grid-bg grid size-full place-items-center">
                      <span className="grid size-28 place-items-center rounded-full border border-white/10 bg-ink/60 font-display text-4xl font-extrabold text-white/30 transition-colors duration-500 group-hover:border-accent/50 group-hover:text-accent">
                        {m.name ? initials(m.name) : <UserRound className="size-12" aria-hidden />}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                </div>
                <div className="p-6">
                  {m.name ? <h3 className="text-3xl font-bold uppercase">{m.name}</h3> : <Placeholder>Name to be added</Placeholder>}
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-accent">{m.role}</p>
                  {m.bio && <p className="mt-3 text-sm text-mist/70">{m.bio}</p>}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTABanner title="Talk to our operations team" text="Our team will plan your shipment and keep you updated from pickup to delivery." />
    </>
  )
}
