import { ArrowLeft } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { NajdiPattern } from '@/components/ui/NajdiPattern'
import { services } from '@/data/siteContent'

export function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-sand-50 py-24 sm:py-32">
      <NajdiPattern className="pointer-events-none absolute inset-x-0 top-0 h-40 w-full text-charcoal-900/[0.03]" />

      <div className="container-wahj relative">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.title}
          subtitle={services.subtitle}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
          {services.items.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 90}>
              <article className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-charcoal-900/[0.07] bg-white p-7 shadow-card transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-brand-red/30 hover:shadow-card-hover sm:p-8">
                {/* folded Najdi corner */}
                <span className="absolute -right-7 -top-7 h-20 w-20 rotate-45 bg-brand-red/[0.05] transition-colors duration-500 group-hover:bg-brand-red/10" />

                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-charcoal-900 text-brand-gold-light transition-all duration-500 ease-premium group-hover:bg-brand-red group-hover:text-sand-50">
                  <Icon name={service.icon} className="h-7 w-7" />
                </span>

                <h3 className="relative font-display text-xl font-bold text-charcoal-900">
                  {service.title}
                </h3>
                <p className="relative flex-1 leading-relaxed text-charcoal-600">
                  {service.desc}
                </p>

                <span className="relative inline-flex -translate-x-2 items-center gap-1.5 text-sm font-bold text-brand-red opacity-0 transition-all duration-500 ease-premium group-hover:translate-x-0 group-hover:opacity-100">
                  اعرف المزيد
                  <ArrowLeft className="h-4 w-4" />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
