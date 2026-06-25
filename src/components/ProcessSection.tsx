import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { process } from '@/data/siteContent'

export function ProcessSection() {
  return (
    <section id="process" className="relative overflow-hidden bg-sand-50 py-24 sm:py-32">
      <div className="container-wahj relative">
        <SectionHeading
          eyebrow={process.eyebrow}
          title={process.title}
          subtitle={process.subtitle}
        />

        <div className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* connecting line (desktop) */}
          <span
            className="absolute inset-x-[12%] top-14 hidden h-px bg-gradient-to-r from-transparent via-charcoal-900/15 to-transparent lg:block"
            aria-hidden="true"
          />

          {process.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-charcoal-900/[0.07] bg-white p-7 shadow-card transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-card-hover">
                <span className="absolute left-6 top-4 font-display text-6xl font-bold text-charcoal-900/[0.05]">
                  0{i + 1}
                </span>

                <span className="relative mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-charcoal-900 text-brand-gold-light shadow-card transition-colors duration-500 ease-premium group-hover:bg-brand-red group-hover:text-sand-50">
                  <Icon name={step.icon} className="h-7 w-7" />
                </span>

                <h3 className="relative mb-2 font-display text-lg font-bold text-charcoal-900">
                  {step.title}
                </h3>
                <p className="relative leading-relaxed text-charcoal-600">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
