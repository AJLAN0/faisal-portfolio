import { ArrowLeft } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Icon } from '@/components/ui/Icon'
import { LogoMark } from '@/components/ui/Logo'
import { Reveal } from '@/components/ui/Reveal'
import { NajdiPattern } from '@/components/ui/NajdiPattern'
import { contact, cta } from '@/data/siteContent'

const contactInfo = [
  { icon: 'whatsapp' as const, label: contact.phone, href: `https://wa.me/${contact.whatsapp}`, external: true },
  { icon: 'mail' as const, label: contact.email, href: `mailto:${contact.email}`, external: false },
  { icon: 'pin' as const, label: contact.locationAr, href: undefined, external: false },
]

export function CTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-brand-maroon py-24 text-sand-50 sm:py-32"
    >
      <NajdiPattern className="pointer-events-none absolute inset-0 h-full w-full text-brand-gold/[0.07]" />
      <div className="pointer-events-none absolute left-1/2 top-[-6rem] h-72 w-72 -translate-x-1/2 rounded-full bg-brand-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      <div className="container-wahj relative flex flex-col items-center gap-6 text-center">
        <Reveal>
          <LogoMark glow className="h-14 w-14 animate-glow" />
        </Reveal>

        <Reveal delay={70}>
          <span className="eyebrow text-brand-gold-light">
            <span className="h-px w-7 bg-current" aria-hidden="true" />
            {cta.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="heading-display text-balance text-3xl sm:text-5xl lg:text-6xl">
            {cta.title}
          </h2>
        </Reveal>

        <Reveal delay={180}>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-sand-100/85 sm:text-lg">
            {cta.body}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              href={`https://wa.me/${contact.whatsapp}`}
              external
              variant="primary"
              icon={<Icon name="whatsapp" className="h-4 w-4" />}
            >
              {cta.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={cta.secondaryCta.href}
              variant="ghost-light"
              icon={<ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />}
            >
              {cta.secondaryCta.label}
            </ButtonLink>
          </div>
        </Reveal>

        {/* Quick contact row */}
        <Reveal delay={300}>
          <ul className="mt-6 flex flex-col flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-sand-100/80 sm:flex-row">
            {contactInfo.map((info) => {
              const content = (
                <span className="inline-flex items-center gap-2">
                  <Icon name={info.icon} className="h-4 w-4 text-brand-gold-light" />
                  <span dir={info.icon === 'pin' ? 'rtl' : 'ltr'}>{info.label}</span>
                </span>
              )
              return (
                <li key={info.label}>
                  {info.href ? (
                    <a
                      href={info.href}
                      {...(info.external
                        ? { target: '_blank', rel: 'noreferrer noopener' }
                        : {})}
                      className="transition-colors hover:text-sand-50"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
