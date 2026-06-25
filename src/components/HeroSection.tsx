import { useEffect, useRef } from 'react'
import { ArrowUpLeft, ChevronDown } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Reveal } from '@/components/ui/Reveal'
import { LogoMark } from '@/components/ui/Logo'
import { NajdiPattern } from '@/components/ui/NajdiPattern'
import { hero } from '@/data/siteContent'

export function HeroSection() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  // Soft warm spotlight that follows the pointer (desktop, motion-safe)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (e: PointerEvent) => {
      const el = spotlightRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
      el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-charcoal-950 text-sand-50"
    >
      {/* Cinematic background (replace /images/hero-bg.svg with a real photo) */}
      <img
        src="/images/hero-bg.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/70 via-charcoal-950/85 to-charcoal-950" />
      <div
        ref={spotlightRef}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(34rem 34rem at var(--mx, 50%) var(--my, 28%), rgba(201,162,75,0.14), transparent 62%)',
        }}
      />
      <NajdiPattern className="absolute inset-0 h-full w-full text-brand-gold/[0.05]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 animate-float-slow rounded-full bg-brand-gold/15 blur-3xl" />

      {/* Centered stage */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        {/* concentric orbit backdrop */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <div className="h-[36rem] w-[36rem] rounded-full border border-sand-50/[0.06]" />
          <div className="absolute inset-[14%] rounded-full border border-sand-50/[0.05]" />
          <div className="absolute inset-[30%] rounded-full border border-brand-gold/[0.08]" />
          <div className="absolute inset-[46%] rounded-full border border-sand-50/[0.04]" />
        </div>

        <div className="container-wahj flex flex-col items-center gap-7 py-24 text-center">
          <Reveal>
            <div className="flex flex-col items-center gap-2">
              <LogoMark
                glow
                className="h-14 w-14 animate-glow drop-shadow-[0_0_40px_rgba(201,162,75,0.4)]"
              />
              <span className="font-display text-3xl font-bold tracking-tight text-sand-50 sm:text-4xl">
                وهج
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-sand-50/15 bg-charcoal-900/40 px-4 py-1.5 text-xs font-medium tracking-wide text-sand-100 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-glow rounded-full bg-brand-red" aria-hidden="true" />
              {hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={140}>
            <h1 className="heading-display mx-auto max-w-4xl text-balance text-4xl leading-[1.14] sm:text-5xl lg:text-6xl xl:text-7xl">
              نصنع <span className="text-gold-gradient">حضورك الرقمي</span> بأسلوب سعودي فاخر
            </h1>
          </Reveal>

          <Reveal delay={210}>
            <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-sand-200/85 sm:text-lg">
              {hero.subheadline}
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
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

        {/* scroll cue */}
        <a
          href="#about"
          aria-label="تصفّح للأسفل"
          className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-sand-200/60 transition-colors hover:text-sand-50 lg:flex"
        >
          <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>

      {/* Keyword marquee */}
      <div className="relative z-10 overflow-hidden border-y border-sand-50/10 bg-charcoal-950/50 py-3 backdrop-blur-sm">
        <div className="flex w-max animate-marquee items-center gap-6 whitespace-nowrap">
          {[...hero.keywords, ...hero.keywords].map((kw, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 text-sm font-medium text-sand-200/70"
            >
              {kw}
              <span className="text-brand-gold/60" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
