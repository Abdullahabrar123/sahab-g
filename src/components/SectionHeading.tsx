import { Reveal } from './motion'
import type { ReactNode } from 'react'

type Props = { eyebrow: string; title: ReactNode; text?: ReactNode; align?: 'left' | 'center'; tone?: 'dark' | 'light'; className?: string }

export function SectionHeading({ eyebrow, title, text, align = 'left', tone = 'dark', className = '' }: Props) {
  const center = align === 'center'
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <Reveal>
        <span className={`eyebrow ${center ? 'justify-center' : ''}`}>{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className={`mt-4 text-[2.6rem] font-extrabold uppercase sm:text-6xl lg:text-[4.25rem] ${tone === 'light' ? 'text-ink' : 'text-white'}`}>{title}</h2>
      </Reveal>
      {text && (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-base leading-relaxed sm:text-lg ${tone === 'light' ? 'text-zinc-600' : 'text-mist/80'} ${center ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>{text}</p>
        </Reveal>
      )}
    </div>
  )
}
