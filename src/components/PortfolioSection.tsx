import { useState } from 'react'
import { ArrowLeft, Film } from 'lucide-react'
import { CountUp } from '@/components/ui/CountUp'
import { Lightbox } from '@/components/ui/Lightbox'
import { PlayButton } from '@/components/ui/PlayButton'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { toArabicDigits } from '@/lib/numerals'
import { portfolio } from '@/data/siteContent'

export function PortfolioSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const items = portfolio.items
  const totalVideos = items.reduce((sum, item) => sum + item.videoCount, 0)
  const activeItem = activeIndex !== null ? items[activeIndex] : null

  return (
    <section id="works" className="relative overflow-hidden bg-sand-100 bg-grain py-24 sm:py-32">
      <div className="container-wahj relative">
        <SectionHeading
          eyebrow={portfolio.eyebrow}
          title={portfolio.title}
          subtitle={portfolio.subtitle}
        />

        {/* Totals — projects + total clips (count up) */}
        <Reveal delay={120}>
          <div className="mx-auto mt-8 flex w-fit items-center gap-6 rounded-full border border-charcoal-900/10 bg-sand-50/70 px-7 py-3 shadow-card backdrop-blur-sm sm:gap-9">
            <div className="flex items-baseline gap-2">
              <span className="heading-display text-2xl text-brand-red sm:text-3xl">
                <CountUp value={items.length} format={toArabicDigits} />
              </span>
              <span className="text-sm text-charcoal-600">{portfolio.totalsProjectsLabel}</span>
            </div>
            <span className="h-8 w-px bg-charcoal-900/10" aria-hidden="true" />
            <div className="flex items-baseline gap-2">
              <span className="heading-display text-2xl text-brand-red sm:text-3xl">
                <CountUp value={totalVideos} format={toArabicDigits} />
              </span>
              <span className="text-sm text-charcoal-600">{portfolio.totalsVideosLabel}</span>
            </div>
          </div>
        </Reveal>

        {/* Project decks */}
        <div className="mt-14 grid gap-x-7 gap-y-9 md:grid-cols-2 lg:mt-16">
          {items.map((item, i) => {
            const countLabel = `${toArabicDigits(item.videoCount)} ${
              item.videoCount === 1 ? portfolio.clipWord : portfolio.videosWord
            }`
            return (
              <Reveal key={item.slug} delay={(i % 2) * 90}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-haspopup="dialog"
                  aria-label={`${item.titleAr} — ${countLabel}، ${portfolio.collectionCta}`}
                  className="group block w-full text-start"
                >
                  <div className="relative">
                    {/* stacked layers behind = "deck of clips" */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-3xl border border-charcoal-900/10 bg-charcoal-800/85 shadow-card transition-transform duration-500 ease-premium [transform:rotate(-3deg)_translateY(-8px)] group-hover:[transform:rotate(-6deg)_translateY(-16px)]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-3xl border border-charcoal-900/10 bg-charcoal-600/70 shadow-card transition-transform duration-500 ease-premium [transform:rotate(2.4deg)_translateY(-4px)] group-hover:[transform:rotate(4.5deg)_translateY(-9px)]"
                    />

                    {/* main media */}
                    <div className="relative overflow-hidden rounded-3xl border border-charcoal-900/10 shadow-card transition-all duration-500 ease-premium group-hover:-translate-y-1.5 group-hover:shadow-card-hover">
                      <img
                        src={item.image}
                        alt={`${item.titleAr} — ${item.titleEn}`}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/20 to-transparent" />

                      {/* prominent video-count badge */}
                      <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-brand-red px-3.5 py-1.5 text-sm font-bold text-sand-50 shadow-glow-red">
                        <Film className="h-4 w-4" strokeWidth={1.8} />
                        {countLabel}
                      </span>

                      {/* hover play */}
                      <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <PlayButton />
                      </div>

                      {/* title */}
                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                        <h3 className="heading-display text-balance text-xl text-sand-50 sm:text-2xl">
                          {item.titleAr}
                        </h3>
                        <p className="mt-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-sand-200/70">
                          {item.titleEn}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* footer row: category + collection CTA */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-charcoal-500">
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-red">
                      {portfolio.collectionCta}
                      <span className="grid h-6 min-w-[1.5rem] place-items-center rounded-full bg-brand-red/10 px-1.5 text-xs">
                        {toArabicDigits(item.videoCount)}
                      </span>
                      <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                    </span>
                  </div>
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>

      <Lightbox item={activeItem} onClose={() => setActiveIndex(null)} />
    </section>
  )
}
