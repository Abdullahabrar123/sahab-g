import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

export const ease = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'span'
}

/** Fades & slides content in once when it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 32, x = 0, as = 'div' }: RevealProps) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </M>
  )
}

/** Parent that staggers its <StaggerItem> children into view. */
export function Stagger({ children, className, gap = 0.09, as = 'div' }: { children: ReactNode; className?: string; gap?: number; as?: 'div' | 'ul' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </M>
  )
}

export function StaggerItem({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'li' | 'article' }) {
  const M = motion[as]
  return (
    <M className={className} variants={fadeUp}>
      {children}
    </M>
  )
}
