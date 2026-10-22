import { useRef } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { ease } from './motion'

type Props = {
  eyebrow: string
  title: ReactNode
  text?: string
  image: string
  crumbs?: { to?: string; label: string }[]
  position?: string
  children?: ReactNode
}

/** Banner used at the top of every inner page. */
export function PageHero({ eyebrow, title, text, image, crumbs = [], position = 'center', children }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '22%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, reduce ? 1.05 : 1.15])

  return (
    <section ref={ref} className="relative isolate flex min-h-[62vh] items-end overflow-hidden pb-14 pt-36 sm:min-h-[66vh] sm:pb-20">
      <motion.img
        src={image}
        alt=""
        aria-hidden
        style={{ y, scale, objectPosition: position }}
        className="absolute inset-0 -z-20 size-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/65 to-ink/15" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/50" />
      <div className="grid-bg absolute inset-0 -z-10 opacity-40" />

      <div className="container-x">
        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
            <li>
              <Link to="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5" aria-hidden />
                {c.to ? (
                  <Link to={c.to} className="hover:text-accent">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </motion.nav>
        <motion.span className="eyebrow mt-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }}>
          {eyebrow}
        </motion.span>
        <h1 className="mt-4 max-w-4xl text-5xl font-extrabold uppercase sm:text-7xl lg:text-8xl">
          <motion.span className="block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.28, ease }}>
            {title}
          </motion.span>
        </h1>
        {text && (
          <motion.p
            className="mt-6 max-w-2xl text-base leading-relaxed text-mist/85 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease }}
          >
            {text}
          </motion.p>
        )}
        {children && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease }}>
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
