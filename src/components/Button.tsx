import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost' | 'light' | 'whatsapp'

const styles: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-hot shadow-[0_10px_30px_-10px_rgba(255,106,19,0.7)] hover:shadow-[0_14px_40px_-10px_rgba(255,106,19,0.9)]',
  outline: 'border border-white/30 text-white hover:border-white hover:bg-white hover:text-ink backdrop-blur-sm',
  ghost: 'text-white hover:text-accent px-0!',
  light: 'bg-white text-ink hover:bg-paper',
  whatsapp: 'bg-[#25D366] text-[#06210f] hover:bg-[#3be27a] shadow-[0_10px_30px_-12px_rgba(37,211,102,0.8)]',
}

type Props = {
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: Variant
  size?: 'md' | 'lg'
  className?: string
  children: ReactNode
  disabled?: boolean
  ariaLabel?: string
}

export function Button({ to, href, onClick, type = 'button', variant = 'primary', size = 'md', className = '', children, disabled, ariaLabel }: Props) {
  const cls = `group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none ${
    size === 'lg' ? 'px-7 py-4 text-[0.95rem]' : 'px-5 py-3 text-sm'
  } ${styles[variant]} ${className}`
  if (to) return <Link to={to} className={cls} aria-label={ariaLabel}>{children}</Link>
  if (href)
    return (
      <a href={href} className={cls} aria-label={ariaLabel} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    )
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
