import { ArrowUpLeft, ChevronDown } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Reveal } from '@/components/ui/Reveal'
import { LogoMark } from '@/components/ui/Logo'
import { NajdiPattern } from '@/components/ui/NajdiPattern'
import { Icon } from '@/components/ui/Icon'
import type { FloatingCard } from '@/data/siteContent'
import { hero } from '@/data/siteContent'
import { cn } from '@/lib/cn'

/** A single glassy floating service chip. */
function HeroCard({
  card,
  className,
  style,
}: {
  card: FloatingCard
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      style={style}
      className={cn(
        'flex items-center gap-3 rounded-2xl border border-sand-50/15 bg-charcoal-900/50 px-4 py-3 shadow-card ring-warm backdrop-blur-md',
        className,
      )}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-red/15 text-brand-gold-light">
        <Icon name={card.icon} className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-bold text-sand-50">{card.titleAr}</span>
        <span className="text-[0.65rem] uppercase tracking-[0.15em] text-sand-200/60">
          {card.titleEn}
        </span>
      </span>
    </div>
  )
}

// Per-card placement on the large "orbit" stage (lg+ only)
const stagePlacement = [
  'top-0 right-6',
  'top-1/3 left-0 -translate-x-4',
  'bottom-1/4 right-0 translate-x-3',
  'bottom-2 left-10',
]

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal-950 text-sand-50"
    >
      {/* Cinematic background image (replace /images/hero-bg.svg with a real photo) */}
      <img
        src="/images/hero-bg.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />

      {/* Gradient + warm-night overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/85 to-charcoal-900/50" />
      <div className="absolute inset-0 bg-night-glow" />
      <NajdiPattern className="absolute inset-0 h-full w-full text-brand-gold/[0.05]" />

      {/* Floating warm-light blobs */}
      <div className="pointer-events-none absolute -top-24 right-[12%] h-72 w-72 animate-float-slow rounded-full bg-brand-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[8%] left-[6%] h-64 w-64 animate-float rounded-full bg-brand-red/20 blur-3xl" />

      <div className="container-wahj relative z-10 grid items-center gap-14 py-28 lg:min-h-[100svh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-0">
        {/* Copy */}
        <div className="flex flex-col items-start gap-7">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-sand-50/15 bg-charcoal-900/40 px-4 py-1.5 text-xs font-medium tracking-wide text-sand-100 backdrop-blur-sm">
              <LogoMark className="h-4 w-4" />
              {hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="heading-display text-balance text-4xl leading-[1.15] sm:text-5xl lg:text-6xl">
              نصنع <span className="text-gold-gradient">حضورك الرقمي</span>
              <br />
              بأسلوب سعودي فاخر
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-sand-200/85 sm:text-lg">
              {hero.subheadline}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                href={hero.primaryCta.href}
                variant="primary"
                icon={<ArrowUpLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />}
              >
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="ghost-light">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="flex items-center gap-2 text-sm text-sand-200/60">
              <span className="h-px w-8 bg-brand-gold/60" aria-hidden="true" />
              موثوقون في تغطية الفعاليات الثقافية والحكومية
            </p>
          </Reveal>
        </div>

        {/* Visual stage — large orbit (lg+) */}
        <div className="relative hidden aspect-square w-full max-w-md justify-self-center lg:block">
          {/* concentric rings */}
          <div className="absolute inset-0 rounded-full border border-sand-50/10" />
          <div className="absolute inset-[12%] rounded-full border border-sand-50/10" />
          <div className="absolute inset-[26%] rounded-full border border-brand-gold/15" />
          {/* central glowing mark */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <LogoMark glow className="h-36 w-36 animate-glow drop-shadow-[0_0_45px_rgba(201,162,75,0.35)]" />
          </div>
          {/* floating cards */}
          {hero.floatingCards.map((card, i) => (
            <div
              key={card.titleEn}
              className={cn('absolute w-52 animate-float', stagePlacement[i])}
              style={{ animationDelay: `${i * 0.8}s`, animationDuration: `${6 + i}s` }}
            >
              <HeroCard card={card} />
            </div>
          ))}
        </div>

        {/* Visual stage — simple 2×2 grid (mobile / tablet) */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
          {hero.floatingCards.map((card, i) => (
            <Reveal key={card.titleEn} delay={i * 70}>
              <HeroCard card={card} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="تصفّح للأسفل"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-sand-200/60 transition-colors hover:text-sand-50 sm:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  )
}
