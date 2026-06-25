import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { NajdiTriangles } from '@/components/ui/NajdiPattern'
import { about } from '@/data/siteContent'

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-sand-100 bg-grain py-24 sm:py-32">
      {/* soft corner glow */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-brand-green/5 blur-3xl" />

      <div className="container-wahj relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              align="start"
              eyebrow={about.eyebrow}
              title={about.title}
            />
            <Reveal delay={120}>
              <NajdiTriangles className="mt-6 block text-brand-red" count={7} />
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={160}>
              <p className="text-pretty text-lg leading-loose text-charcoal-600">
                {about.body}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
          {about.values.map((value, i) => (
            <Reveal key={value.title} delay={i * 100}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-charcoal-900/[0.07] bg-sand-50 p-7 shadow-card transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-card-hover sm:p-8">
                {/* faint editorial index */}
                <span className="absolute left-6 top-5 font-display text-5xl font-bold text-charcoal-900/[0.04]">
                  0{i + 1}
                </span>

                <span className="relative mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-brand-green/10 text-brand-green transition-colors duration-500 group-hover:bg-brand-red group-hover:text-sand-50">
                  <Icon name={value.icon} className="h-7 w-7" />
                </span>

                <h3 className="mb-2 font-display text-xl font-bold text-charcoal-900">
                  {value.title}
                </h3>
                <p className="leading-relaxed text-charcoal-600">{value.desc}</p>

                {/* hover accent line */}
                <span className="absolute inset-x-8 bottom-0 h-0.5 origin-right scale-x-0 bg-gradient-to-l from-brand-red to-brand-gold transition-transform duration-500 ease-premium group-hover:scale-x-100" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
