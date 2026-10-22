import { useEffect } from 'react'
import { company } from '../data/company'

/** Sets the document title and meta description for the current page. */
export function useSeo(title: string, description: string) {
  useEffect(() => {
    document.title = title === company.name ? `${company.name} | Transportation & Logistics Across Pakistan` : `${title} | ${company.name}`
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description
  }, [title, description])
}
