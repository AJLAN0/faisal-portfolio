import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { LogoMark } from '@/components/ui/Logo'
import { NajdiPattern } from '@/components/ui/NajdiPattern'
import { brand } from '@/data/siteContent'
import { cn } from '@/lib/cn'

/**
 * Cinematic title sequence. The brand name "وهج" rises in very large, holds,
 * then smoothly shrinks + lifts + dissolves into the hero's brand emblem while
 * the dark curtain fades away — a movie-style hand-off into the page.
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
    const toOut = window.setTimeout(() => setPhase('out'), 1650)
    const toDone = window.setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = ''
    }, 2800)

    return () => {
      clearTimeout(toOut)
      clearTimeout(toDone)
      document.body.style.overflow = ''
    }
  }, [])

  if (phase === 'done') return null

  const out = phase === 'out'
  const nameAr = brand.nameAr.split(' ')[0] // "وهج" (without the slug)
  const nameEn = brand.nameEn.split(' ')[0] // "Wahj" → WAHJ

  return createPortal(
    <div
      aria-hidden="true"
      className={cn('fixed inset-0 z-[100] overflow-hidden', out && 'pointer-events-none')}
    >
      {/* Dark curtain + warm ambience — fades to reveal the hero underneath */}
      <div
        className={cn(
          'absolute inset-0 bg-charcoal-950 transition-opacity duration-[1000ms] ease-premium',
          out ? 'opacity-0' : 'opacity-100',
        )}
      />
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-700 ease-premium',
          out ? 'opacity-0' : 'opacity-100',
        )}
      >
        <div className="absolute inset-0 bg-night-glow" />
        <NajdiPattern className="absolute inset-0 h-full w-full text-brand-gold/[0.05]" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/15 blur-3xl" />
      </div>

      {/* Morphing brand title — shrinks, lifts and fades into the hero */}
      <div className="relative grid h-full place-items-center px-6">
        <div
          className={cn(
            'flex flex-col items-center gap-4 will-change-transform',
            'transition-all duration-[1150ms] ease-[cubic-bezier(0.7,0,0.2,1)]',
            out
              ? '-translate-y-[15vh] scale-[0.3] opacity-0'
              : 'translate-y-0 scale-100 opacity-100',
          )}
        >
          <LogoMark
            glow
            className="h-20 w-20 animate-glow drop-shadow-[0_0_60px_rgba(201,162,75,0.5)] sm:h-24 sm:w-24"
          />

          <div className="overflow-hidden pb-2">
            <span className="block animate-rise font-display text-[clamp(4.5rem,26vw,15rem)] font-bold leading-none tracking-tight text-sand-50">
              {nameAr}
            </span>
          </div>

          <span className="animate-fade-in text-xs font-medium uppercase tracking-[0.6em] text-brand-gold-light [animation-delay:0.5s] sm:text-sm">
            {nameEn}
          </span>

          <span className="mt-2 h-px w-48 origin-center animate-load-bar bg-gradient-to-l from-transparent via-brand-gold to-transparent" />
        </div>
      </div>
    </div>,
    document.body,
  )
}
