import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import type { Vehicle } from '../data/content'

const badge: Record<Vehicle['category'], string> = {
  Heavy: 'bg-accent text-white',
  Medium: 'bg-amber text-ink',
  Light: 'bg-white text-ink',
}

export function FleetCard({ vehicle, compact = false }: { vehicle: Vehicle; compact?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-panel text-white transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]">
      <div className={`relative overflow-hidden ${compact ? 'aspect-[4/3]' : 'aspect-[16/11]'}`}>
        <img
          src={vehicle.image}
          alt={`${vehicle.name} — representative image`}
          loading="lazy"
          style={{ objectPosition: vehicle.position ?? 'center' }}
          className="size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.15em] ${badge[vehicle.category]}`}>
          {vehicle.category}
        </span>
        <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.9rem] font-bold uppercase leading-none">{vehicle.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-mist/75">{vehicle.description}</p>
        {!compact && (
          <>
            <p className="mt-5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-steel">Best for</p>
            <ul className="mt-2.5 space-y-2">
              {vehicle.uses.map((u) => (
                <li key={u} className="flex items-start gap-2.5 text-sm text-white/90">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  {u}
                </li>
              ))}
            </ul>
          </>
        )}
        <Link
          to={`/contact?vehicle=${vehicle.id}#quote`}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent transition-colors hover:text-accent-hot"
        >
          Request this vehicle
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  )
}
