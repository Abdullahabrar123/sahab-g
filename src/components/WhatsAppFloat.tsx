import { motion } from 'framer-motion'
import { whatsappLink } from '../data/company'
import { WhatsAppIcon } from './Icons'

/** Floating WhatsApp button — only rendered when a WhatsApp number is configured. */
export function WhatsAppFloat() {
  const href = whatsappLink()
  if (!href) return null
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] sm:bottom-7 sm:right-7"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="animate-pulse-ring absolute inset-0 rounded-full bg-[#25D366]" aria-hidden />
      <WhatsAppIcon className="relative size-7" />
    </motion.a>
  )
}
