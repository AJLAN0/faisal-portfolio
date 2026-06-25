import { CountUp } from '@/components/ui/CountUp'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { NajdiPattern } from '@/components/ui/NajdiPattern'
import { stats } from '@/data/siteContent'

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-brand-green-dark py-20 text-sand-50 sm:py-24">
      {/* heritage gradient + warm pattern */}
      <div className="absolute inset-0 bg-gradient-to-bl from-brand-green-dark via-charcoal-950 to-brand-maroon-dark" />
      <NajdiPattern className="pointer-events-none absolute inset-0 h-full w-full text-brand-gold/[0.06]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl" />

      <div className="container-wahj relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 90}>
            <div className="flex h-full flex-col items-start gap-3 rounded-3xl border border-sand-50/10 bg-sand-50/[0.04] p-6 backdrop-blur-sm transition-colors duration-500 hover:border-brand-gold/30 sm:p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sand-50/10 text-brand-gold-light">
                <Icon name={stat.icon} className="h-6 w-6" />
              </span>
              <span className="heading-display text-4xl text-sand-50 sm:text-5xl">
                {typeof stat.value === 'number' ? (
                  <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                ) : (
                  stat.text
                )}
              </span>
              <span className="text-sm leading-relaxed text-sand-200/75">{stat.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
