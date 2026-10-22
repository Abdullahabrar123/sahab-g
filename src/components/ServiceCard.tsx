import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Service } from '../data/content'

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group relative flex h-full min-h-[25rem] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-panel p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_30px_60px_-30px_rgba(255,106,19,0.55)]"
    >
      <img
        src={service.image}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-55 transition-all duration-[1.2s] ease-out group-hover:scale-110 group-hover:opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/20" />
      <span className="absolute right-6 top-5 font-display text-6xl font-extrabold text-white/10 transition-colors duration-500 group-hover:text-accent/30">
        0{index + 1}
      </span>
      <div className="relative">
        <span className="grid size-14 place-items-center rounded-2xl bg-accent text-white shadow-lg shadow-accent/30 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
          <Icon className="size-6" aria-hidden />
        </span>
        <h3 className="mt-6 text-3xl font-bold uppercase leading-none">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-mist/75">{service.short}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          Learn more
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
