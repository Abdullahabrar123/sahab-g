import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'
import { nav } from '../data/content'
import { company, phoneLink, whatsappLink } from '../data/company'
import { Button } from './Button'
import { WhatsAppIcon } from './Icons'
import { ease } from './motion'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open
  const wa = whatsappLink()
  const tel = phoneLink()

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          solid ? 'border-b border-white/8 bg-ink/85 backdrop-blur-xl' : 'border-b border-transparent bg-gradient-to-b from-black/60 to-transparent'
        }`}
      >
        <div className={`container-x flex items-center justify-between gap-6 transition-all duration-500 ${scrolled ? 'h-[68px]' : 'h-[84px]'}`}>
          <Link to="/" className="relative z-10 flex shrink-0 items-center gap-3" aria-label={`${company.name} — home`}>
            <img
              src="/logo-light.png"
              alt={company.name}
              width={640}
              height={425}
              className={`w-auto transition-all duration-500 ${scrolled ? 'h-11' : 'h-14'}`}
            />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `relative block rounded-full px-3 py-2 text-[0.84rem] font-semibold whitespace-nowrap transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-white/70 hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button to="/contact#quote" className="hidden sm:inline-flex">
              Request a Quote
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="relative z-10 grid size-12 place-items-center rounded-full border border-white/15 bg-white/5 backdrop-blur transition-colors hover:border-accent xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <span className="relative block h-3.5 w-5">
                <motion.span
                  className="absolute left-0 top-0 h-0.5 w-5 rounded bg-white"
                  animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
                  transition={{ duration: 0.3, ease }}
                />
                <motion.span
                  className="absolute left-0 top-1.5 h-0.5 w-3.5 rounded bg-accent"
                  animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute left-0 top-3 h-0.5 w-5 rounded bg-white"
                  animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
                  transition={{ duration: 0.3, ease }}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 -z-10 overflow-y-auto bg-ink xl:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 42px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 42px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 42px)' }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
            <div className="pointer-events-none absolute -right-32 top-1/3 size-96 rounded-full bg-accent/20 blur-[120px]" />
            <nav aria-label="Mobile" className="container-x relative flex min-h-full flex-col pb-10 pt-28">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease }}
                    className="border-b border-white/8"
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `group flex items-center justify-between py-3.5 font-display text-[2rem] font-bold uppercase leading-none transition-colors sm:text-4xl ${
                          isActive ? 'text-accent' : 'text-white hover:text-accent'
                        }`
                      }
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-sans text-xs font-semibold text-steel">0{i + 1}</span>
                        {item.label}
                      </span>
                      <ArrowUpRight className="size-6 opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="mt-8 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button to="/contact#quote" size="lg">
                  Request a Quote <ArrowUpRight className="size-4" />
                </Button>
                {wa && (
                  <Button href={wa} variant="whatsapp" size="lg">
                    <WhatsAppIcon /> WhatsApp
                  </Button>
                )}
                {tel && (
                  <Button href={tel} variant="outline" size="lg">
                    <Phone className="size-4" /> Call us
                  </Button>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
