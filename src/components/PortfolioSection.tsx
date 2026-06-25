import { CirclePlay } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { PlayButton } from '@/components/ui/PlayButton'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { portfolio } from '@/data/siteContent'
import { cn } from '@/lib/cn'

export function PortfolioSection() {
  return (
    <section id="works" className="relative overflow-hidden bg-sand-100 bg-grain py-24 sm:py-32">
      <div className="container-wahj relative">
        <SectionHeading
          eyebrow={portfolio.eyebrow}
          title={portfolio.title}
          subtitle={portfolio.subtitle}
        />

        <div className="mt-14 flex flex-col gap-6 lg:mt-16 lg:gap-7">
          {portfolio.items.map((item, i) => {
            const mediaRight = i % 2 === 1 // alternate sides on desktop
            return (
              <Reveal key={item.titleEn} delay={60}>
                <article className="group grid overflow-hidden rounded-[1.75rem] border border-charcoal-900/[0.07] bg-sand-50 shadow-card transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-card-hover sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr]">
                  {/* Media (video thumbnail with play overlay) */}
                  <a
                    href="#contact"
                    aria-label={`عرض تفاصيل: ${item.titleAr}`}
                    className={cn(
                      'relative block overflow-hidden bg-charcoal-900',
                      mediaRight && 'sm:order-last',
                    )}
                  >
                    <img
                      src={item.image}
                      alt={`${item.titleAr} — ${item.titleEn}`}
                      loading="lazy"
                      className="h-60 w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105 sm:h-full sm:min-h-[20rem]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-charcoal-950/10 to-transparent" />
                    <div className="absolute inset-0 grid place-items-center">
                      <PlayButton />
                    </div>
                    <span className="absolute right-4 top-4 rounded-full bg-charcoal-950/55 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-sand-50 backdrop-blur-sm">
                      Video
                    </span>
                  </a>

                  {/* Content */}
                  <div className="flex flex-col items-start justify-center gap-4 p-7 sm:p-9 lg:p-10">
                    <Badge className="border-brand-red/25 bg-brand-red/5 text-brand-red">
                      {item.category}
                    </Badge>
                    <h3 className="heading-display text-balance text-2xl text-charcoal-900 sm:text-[1.7rem]">
                      {item.titleAr}
                    </h3>
                    <p className="text-sm font-medium uppercase tracking-[0.12em] text-charcoal-500">
                      {item.titleEn}
                    </p>
                    <ButtonLink
                      href="#contact"
                      variant="outline"
                      className="mt-1"
                      icon={<CirclePlay className="h-4 w-4" />}
                    >
                      {portfolio.cardCta}
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
