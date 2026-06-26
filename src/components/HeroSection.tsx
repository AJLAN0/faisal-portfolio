import { ArrowUpLeft, ChevronDown } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Reveal } from '@/components/ui/Reveal'
import { GlossySpark } from '@/components/ui/GlossySpark'
import { hero } from '@/data/siteContent'

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal-950 text-sand-50"
    >
      {/* solid black base + subtle depth */}
      <div className="absolute inset-0 bg-grain opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_55%,rgba(0,0,0,0.6)_100%)]" />

      {/* glossy spark — the hero centerpiece */}
      <GlossySpark className="pointer-events-none absolute left-1/2 top-1/2 w-[88vw] max-w-[42rem] -translate-x-1/2 -translate-y-1/2 rotate-[-11deg] animate-float-slow opacity-95 drop-shadow-[0_0_90px_rgba(193,39,45,0.4)]" />

      <div className="container-wahj relative z-10 grid items-center gap-12 py-28 lg:grid-cols-2 lg:gap-8 lg:py-0 lg:min-h-[100svh]">
        {/* Tagline (start / right in RTL) */}
        <div className="order-2 flex flex-col items-center gap-6 text-center lg:order-1 lg:items-start lg:text-start">

          <Reveal delay={90}>
            <h1 className="heading-display text-balance text-4xl leading-[1.15] sm:text-5xl lg:text-6xl">
              نصنع <span className="text-gold-gradient">حضورك الرقمي</span>
              <br />
              بأسلوب سعودي فاخر
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <span className="flex items-center gap-3 text-base font-medium tracking-wide text-sand-200/75 sm:text-lg">
              استراتيجية
              <span className="text-2xl font-bold text-brand-red">/</span>
              إبداعية
            </span>
          </Reveal>

          <Reveal delay={210}>
            <p className="max-w-xl text-pretty leading-relaxed text-sand-200/70">
              {hero.subheadline}
            </p>
          </Reveal>

          <Reveal delay={280}>
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
        </div>

        {/* Brand lockup (end / left in RTL) */}
        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="flex flex-col items-center gap-1.5 lg:items-end">
            <div className="relative">
              <span className="font-sans text-7xl font-black leading-none tracking-tight text-sand-50 sm:text-8xl">
                {hero.wordmark}
              </span>
              <span className="absolute -right-5 top-1 text-base text-sand-200/55 sm:text-lg">
                ®
              </span>
            </div>
            <span className="font-sans text-base font-bold tracking-[0.5em] text-brand-red sm:text-xl">
              {hero.wordmarkSub}
            </span>
          </div>
        </Reveal>
      </div>

      {/* scroll cue */}
      <a
        href="#about"
        aria-label="تصفّح للأسفل"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-sand-200/55 transition-colors hover:text-sand-50 lg:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  )
}
