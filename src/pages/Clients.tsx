import { Briefcase, FileSignature, Handshake, Building2 } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { company } from '../data/company'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal, Stagger, StaggerItem } from '../components/motion'
import { Placeholder } from '../components/Placeholder'
import { CTABanner } from '../components/CTABanner'
import { Counter } from '../components/Counter'

const engagement = [
  { icon: FileSignature, title: 'Contract transportation', text: 'Ongoing agreements with agreed lanes, vehicle types and rates for recurring movements.' },
  { icon: Briefcase, title: 'Project contracts', text: 'Transport planned and delivered for the duration of a specific project or rollout.' },
  { icon: Building2, title: 'Dedicated fleet arrangements', text: 'Vehicles reserved exclusively for a client’s operation on monthly or term basis.' },
  { icon: Handshake, title: 'Per-trip engagements', text: 'Individual movements quoted and arranged as and when needed.' },
]

export default function Clients() {
  useSeo('Clients & Contracts', `Corporate clients and contracts of ${company.name}, including ZTE and other approved corporate clients.`)
  const slots = Math.max(0, 6 - company.clients.length)

  return (
    <>
      <PageHero
        eyebrow="Clients & contracts"
        title={
          <>
            Trusted by <span className="text-accent">corporate Pakistan</span>
          </>
        }
        text="We work with corporate clients who need dependable, accountable transportation — on contract, by project, or trip by trip."
        image="/images/handshake.webp"
        crumbs={[{ label: 'Clients & Contracts' }]}
      />

      {/* client wall */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Our clients" title="Who we work with" text="Clients are listed only with their approval." />
          <Stagger className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {company.clients.map((c) => (
              <StaggerItem key={c.name} className="group relative grid aspect-[3/2] place-items-center overflow-hidden rounded-3xl border border-white/10 bg-panel p-6 text-center transition-all duration-500 hover:border-accent/60">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 transition-all duration-500 group-hover:from-accent/10 group-hover:to-transparent" />
                <div className="relative">
                  {c.logo ? (
                    <img src={c.logo} alt={c.name} loading="lazy" className="mx-auto h-14 w-auto" />
                  ) : (
                    <p className="font-display text-5xl font-extrabold tracking-[0.12em] sm:text-6xl">{c.name}</p>
                  )}
                  {c.note && <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-steel">{c.note}</p>}
                </div>
              </StaggerItem>
            ))}
            {Array.from({ length: slots }).map((_, i) => (
              <StaggerItem key={i} className="grid aspect-[3/2] place-items-center rounded-3xl border border-dashed border-white/15 p-6 text-center">
                <div>
                  <Placeholder>Approved client</Placeholder>
                  <p className="mt-2 text-xs text-steel">Name or logo with permission</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* verified stats (only when provided) */}
      {company.verifiedStats.length > 0 && (
        <section className="border-y border-white/10 bg-coal py-16">
          <div className="container-x grid grid-cols-2 gap-8 md:grid-cols-4">
            {company.verifiedStats.map((s) => (
              <div key={s.label} className="text-center">
                <Counter value={s.value} suffix={s.suffix} className="font-display text-6xl font-extrabold text-accent" />
                <p className="mt-2 text-sm text-mist/70">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* engagement models */}
      <section className="bg-paper py-20 text-ink sm:py-28">
        <div className="container-x">
          <SectionHeading tone="light" eyebrow="Contracts" title="How we work with clients" />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {engagement.map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title} className="group rounded-3xl bg-white p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1">
                <span className="grid size-14 place-items-center rounded-2xl bg-ink text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold uppercase">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* projects */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Project highlights" title="Completed projects" />
          {company.projects.length > 0 ? (
            <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
              {company.projects.map((p) => (
                <StaggerItem key={p.title} className="overflow-hidden rounded-3xl border border-white/10 bg-panel">
                  {p.image && <img src={p.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />}
                  <div className="p-7">
                    {p.client && <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{p.client}</p>}
                    <h3 className="mt-2 text-3xl font-bold uppercase">{p.title}</h3>
                    <p className="mt-3 text-sm text-mist/75">{p.summary}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
              {['/images/project-site.webp', '/images/container-highway.webp', '/images/loading-cargo.webp'].map((img, i) => (
                <StaggerItem key={img} className="overflow-hidden rounded-3xl border border-white/10 bg-panel">
                  <div className="relative">
                    <img src={img} alt="" aria-hidden loading="lazy" className="aspect-[16/10] w-full object-cover opacity-50 grayscale" />
                    <div className="absolute inset-0 grid place-items-center">
                      <Placeholder>{`Project case study ${i + 1}`}</Placeholder>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-steel">Project title, client (with approval), scope and outcome will be shown here.</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          )}
          <Reveal className="mt-6">
            <p className="text-xs text-steel">Figures and project details are published only once verified and approved by the client.</p>
          </Reveal>
        </div>
      </section>

      <CTABanner title="Become a client" text="Discuss a contract, project or dedicated fleet arrangement with our team." />
    </>
  )
}
