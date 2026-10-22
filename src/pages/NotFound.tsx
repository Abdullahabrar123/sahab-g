import { ArrowLeft } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { Button } from '../components/Button'

export default function NotFound() {
  useSeo('Page not found', 'The page you are looking for could not be found.')
  return (
    <section className="relative isolate grid min-h-[80vh] place-items-center overflow-hidden px-4 pt-28 pb-16 text-center">
      <div className="grid-bg absolute inset-0 -z-10 opacity-60" />
      <div>
        <p className="font-display text-[9rem] font-extrabold leading-none text-accent sm:text-[13rem]">404</p>
        <h1 className="text-4xl font-extrabold uppercase sm:text-6xl">Wrong turn</h1>
        <p className="mx-auto mt-4 max-w-md text-mist/75">This road doesn’t lead anywhere. Let’s get you back on route.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/">
            <ArrowLeft className="size-4" /> Back to home
          </Button>
          <Button to="/contact" variant="outline">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  )
}
