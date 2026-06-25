import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { LogoMark } from '@/components/ui/Logo'
import { NajdiPattern } from '@/components/ui/NajdiPattern'
import { brand } from '@/data/siteContent'
import { cn } from '@/lib/cn'

/**
 * Simple cinematic intro: the brand name "وهج" rises in over a warm glow,
 * a loading bar fills, then the whole curtain lifts to reveal the site.
 * Skipped entirely when the user prefers reduced motion.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setPhase('done')
      return
    }

    document.body.style.overflow = 'hidden'
    const toOut = window.setTimeout(() => setPhase('out'), 1700)
    const toDone = window.setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = ''
    }, 2350)

    return () => {
      clearTimeout(toOut)
      clearTimeout(toDone)
      document.body.style.overflow = ''
    }
  }, [])

  if (phase === 'done') return null

  const nameAr = brand.nameAr.split(' ')[0] // "وهج" (without the slug)
  const nameEn = brand.nameEn.split(' ')[0] // "Wahj" → WAHJ

  return createPortal(
    <div
      aria-hidden="true"
      className={cn(
        'fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-charcoal-950 transition-all duration-700 ease-premium',
        phase === 'out' && 'pointer-events-none -translate-y-3 opacity-0',
      )}
    >
      <div className="absolute inset-0 bg-night-glow" />
      <NajdiPattern className="absolute inset-0 h-full w-full text-brand-gold/[0.05]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/15 blur-3xl" />

      <div className="relative flex flex-col items-center gap-5">
        <LogoMark
          glow
          className="h-20 w-20 animate-glow drop-shadow-[0_0_50px_rgba(201,162,75,0.45)]"
        />

        <div className="overflow-hidden pb-1">
          <span className="block animate-rise font-display text-6xl font-bold tracking-tight text-sand-50 sm:text-7xl">
            {nameAr}
          </span>
        </div>

        <span className="animate-fade-in text-xs font-medium uppercase tracking-[0.5em] text-brand-gold-light [animation-delay:0.45s]">
          {nameEn}
        </span>

        <span className="mt-1 h-px w-44 origin-right animate-load-bar bg-gradient-to-l from-brand-red via-brand-gold to-transparent" />
      </div>
    </div>,
    document.body,
  )
}
