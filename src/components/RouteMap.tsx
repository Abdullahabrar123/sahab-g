import { useState, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cities, corridors, type City } from '../data/content'

const K = 44
const project = (c: Pick<City, 'lat' | 'lon'>) => ({ x: 24 + (c.lon - 66.3) * K * 0.866, y: 26 + (35 - c.lat) * K })
const byName = Object.fromEntries(cities.map((c) => [c.name, { ...c, ...project(c) }]))

// label placement to keep names from colliding
const labelPos: Record<string, { dx: number; dy: number; anchor: 'start' | 'end' }> = {
  Islamabad: { dx: 12, dy: -8, anchor: 'start' },
  Rawalpindi: { dx: 12, dy: 14, anchor: 'start' },
  Peshawar: { dx: -12, dy: -6, anchor: 'end' },
  Lahore: { dx: 12, dy: 5, anchor: 'start' },
  Faisalabad: { dx: -12, dy: 4, anchor: 'end' },
  Multan: { dx: -12, dy: 5, anchor: 'end' },
  Gujranwala: { dx: 10, dy: 4, anchor: 'start' },
  Sialkot: { dx: 10, dy: -6, anchor: 'start' },
  Sukkur: { dx: 12, dy: 5, anchor: 'start' },
  Hyderabad: { dx: 12, dy: 5, anchor: 'start' },
  Karachi: { dx: 12, dy: 5, anchor: 'start' },
  Quetta: { dx: -12, dy: 5, anchor: 'end' },
}

const toPath = (names: string[]) => {
  const pts = names.map((n) => byName[n])
  return pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
}

const mainLine = toPath(['Peshawar', 'Islamabad', 'Lahore', 'Multan', 'Sukkur', 'Hyderabad', 'Karachi'])

/** Stylised network map of Pakistan's main road-freight corridors (city positions by real coordinates). */
export function RouteMap({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 400 520" className="h-auto w-full" role="img" aria-labelledby="map-title map-desc">
        <title id="map-title">Transportation network across Pakistan</title>
        <desc id="map-desc">Corridors linking Peshawar, Islamabad, Rawalpindi, Lahore, Faisalabad, Multan and Karachi, with further cities on request.</desc>
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff6a13" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ff6a13" stopOpacity="0" />
          </radialGradient>
          <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.1" fill="rgba(255,255,255,0.09)" />
          </pattern>
        </defs>
        <rect width="400" height="520" fill="url(#dots)" />

        {/* corridors */}
        {corridors.map((c, i) => {
          const d = toPath(c.path)
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={c.dashed ? 2 : 7} strokeLinecap="round" strokeLinejoin="round" />
              <motion.path
                d={d}
                fill="none"
                stroke={c.dashed ? 'rgba(255,255,255,0.45)' : '#ff6a13'}
                strokeWidth={c.dashed ? 1.5 : 2.5}
                strokeDasharray={c.dashed ? '4 6' : undefined}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: reduce ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, delay: 0.2 + i * 0.25, ease: 'easeInOut' }}
              />
              {!c.dashed && (
                <path d={d} fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="1" strokeDasharray="2 18" className="animate-road-dash" />
              )}
            </g>
          )
        })}

        {/* moving "truck" along the main north–south corridor */}
        {!reduce && (
          <motion.circle
            r="5"
            fill="#ffb81c"
            style={{ offsetPath: `path('${mainLine}')`, offsetRotate: '0deg' } as CSSProperties}
            initial={{ offsetDistance: '0%' }}
            animate={{ offsetDistance: ['0%', '100%', '0%'] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            cx={0}
            cy={0}
          />
        )}

        {/* cities */}
        {cities.map((c, i) => {
          const p = byName[c.name]
          const l = labelPos[c.name]
          const hot = active === c.name
          return (
            <motion.g
              key={c.name}
              initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 260, damping: 18 }}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              onMouseEnter={() => setActive(c.name)}
              onMouseLeave={() => setActive(null)}
              className="cursor-default"
            >
              {c.core && <circle cx={p.x} cy={p.y} r="22" fill="url(#glow)" />}
              {c.core && <circle cx={p.x} cy={p.y} r="6" fill="#ff6a13" className="animate-pulse-ring" opacity="0.6" />}
              <circle cx={p.x} cy={p.y} r={c.core ? 6 : 4} fill={c.core ? '#ff6a13' : '#0b0c0e'} stroke={c.core ? '#fff' : 'rgba(255,255,255,0.6)'} strokeWidth={c.core ? 2 : 1.5} />
              <text
                x={p.x + l.dx}
                y={p.y + l.dy}
                textAnchor={l.anchor}
                className="font-display uppercase"
                style={{ fontSize: c.core ? 15 : 12, fontWeight: c.core ? 700 : 600, letterSpacing: '0.06em', transition: 'fill .3s' }}
                fill={hot ? '#ffb81c' : c.core ? '#fff' : 'rgba(255,255,255,0.55)'}
              >
                {c.name}
              </text>
            </motion.g>
          )
        })}
      </svg>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-mist/70">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full border-2 border-white bg-accent" /> Major city served
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full border border-white/60 bg-ink" /> Other cities — on request
        </span>
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-5 bg-accent" /> Main corridor
        </span>
        <span className="text-steel">City positions to scale; corridors simplified.</span>
      </div>
    </div>
  )
}
