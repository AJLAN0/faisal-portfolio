import { Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { PlayButton } from '@/components/ui/PlayButton'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { NajdiPattern, NajdiTriangles } from '@/components/ui/NajdiPattern'
import { diriyah } from '@/data/siteContent'

export function DiriyahSection() {
  const { featured } = diriyah

  return (
    <section
      id="diriyah"
      className="relative overflow-hidden bg-charcoal-950 py-24 text-sand-50 sm:py-32"
    >
      {/* warm golden Diriyah-night lighting */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-night-glow" />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-brand-gold/10 blur-3xl" />
      <NajdiPattern className="pointer-events-none absolute inset-0 h-full w-full text-brand-gold/[0.05]" />

      <div className="container-wahj relative">
        <div className="flex flex-col items-start gap-5">
          <Reveal>
            <Badge
              className="border-brand-gold/30 bg-brand-gold/10 text-brand-gold-light"
              icon={<Sparkles className="h-3.5 w-3.5" />}
            >
              {diriyah.label}
            </Badge>
          </Reveal>
          <SectionHeading
            align="start"
            tone="dark"
            eyebrow={diriyah.eyebrow}
            title={diriyah.title}
            subtitle={diriyah.subtitle}
          />
          <Reveal delay={120}>
            <NajdiTriangles className="text-brand-gold/70" count={7} />
          </Reveal>
        </div>

        {/* Featured large card */}
        <Reveal delay={80} className="mt-12">
          <a
            href="#works"
            className="group relative block overflow-hidden rounded-[2rem] ring-warm"
            aria-label={`${featured.titleAr} — ${featured.titleEn}`}
          >
            <img
              src={featured.image}
              alt={`تغطية ${featured.titleAr}`}
              loading="lazy"
              className="aspect-[16/11] w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105 sm:aspect-[2/1] lg:aspect-[2.5/1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/45 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />

            <div className="absolute inset-0 grid place-items-center">
              <PlayButton size="lg" />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2.5 p-7 sm:p-10">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-gold-light/90">
                {featured.titleEn}
              </span>
              <h3 className="heading-display text-2xl sm:text-4xl">{featured.titleAr}</h3>
              <p className="max-w-xl text-pretty text-sm leading-relaxed text-sand-200/80 sm:text-base">
                {featured.desc}
              </p>
            </div>
          </a>
        </Reveal>

        {/* Project-type grid */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {diriyah.cards.map((card, i) => (
            <Reveal key={card.titleEn} delay={(i % 4) * 80}>
              <a
                href="#works"
                className="group relative block overflow-hidden rounded-2xl ring-warm"
                aria-label={`${card.titleAr} — ${card.titleEn}`}
              >
                <img
                  src={card.image}
                  alt={card.titleAr}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/25 to-transparent" />
                <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <PlayButton size="sm" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h4 className="font-display text-sm font-bold leading-snug sm:text-base">
                    {card.titleAr}
                  </h4>
                  <p className="mt-1 text-[0.62rem] uppercase tracking-[0.16em] text-brand-gold-light/75">
                    {card.titleEn}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
