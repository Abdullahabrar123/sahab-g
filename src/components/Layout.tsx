import { useEffect, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppFloat } from './WhatsAppFloat'
import { ease } from './motion'

/** Keeps the outgoing page rendered while its exit animation plays. */
function FrozenOutlet() {
  const outlet = useOutlet()
  const [frozen] = useState(outlet)
  return frozen
}

export function Layout() {
  const location = useLocation()

  // Scroll to an in-page anchor (e.g. /contact#quote) once the new page has mounted.
  useEffect(() => {
    if (!location.hash) return
    const id = decodeURIComponent(location.hash.slice(1))
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 550)
    return () => window.clearTimeout(t)
  }, [location.pathname, location.hash, location.key])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })}>
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease } }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeIn' } }}
        >
          <FrozenOutlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
