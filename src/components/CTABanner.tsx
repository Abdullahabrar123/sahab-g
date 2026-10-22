import { ArrowUpRight, Phone } from 'lucide-react'
import { Button } from './Button'
import { Reveal } from './motion'
import { WhatsAppIcon } from './Icons'
import { phoneLink, whatsappLink } from '../data/company'

type Props = { title?: string; text?: string; image?: string }

export function CTABanner({
  title = 'Ready to move your cargo?',
  text = 'Tell us where it is going. We will recommend the right vehicle and route, and send you a clear quote.',
  image = '/images/semi-night.webp',
}: Props) {
  const wa = whatsappLink()
  const tel = phoneLink()
  return (
    <section className="container-x py-20 sm:py-28">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 px-6 py-14 sm:px-14 sm:py-20">
          <img src={image} alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-20 size-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-accent/40" />
          <div className="stripes absolute -right-10 top-0 -z-10 hidden h-full w-40 skew-x-[-12deg] opacity-25 md:block" />
          <div className="max-w-2xl">
            <span className="eyebrow">Get a quote</span>
            <h2 className="mt-4 text-4xl font-extrabold uppercase sm:text-6xl">{title}</h2>
            <p className="mt-5 text-base text-mist/85 sm:text-lg">{text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/contact#quote" size="lg">
                Request a Quote
                <ArrowUpRight className="size-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </Button>
              {wa && (
                <Button href={wa} variant="whatsapp" size="lg">
                  <WhatsAppIcon /> WhatsApp
                </Button>
              )}
              {tel ? (
                <Button href={tel} variant="outline" size="lg">
                  <Phone className="size-4" /> Call now
                </Button>
              ) : (
                <Button to="/contact" variant="outline" size="lg">
                  Contact details
                </Button>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
