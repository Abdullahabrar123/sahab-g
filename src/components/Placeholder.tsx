import { PencilLine } from 'lucide-react'

/** Clearly identifiable placeholder for business information not yet provided. */
export function Placeholder({ children }: { children: string }) {
  return (
    <span className="placeholder-tag" title="Placeholder — update in src/data/company.ts">
      <PencilLine className="size-3.5" aria-hidden />
      {children}
    </span>
  )
}
