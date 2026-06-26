import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'

/**
 * Intro: the word "WAHJ" sits as a hairline outline on a solid dark screen,
 * a red "liquid" rises to fill it, then the whole curtain slides up to reveal
 * the hero. Skipped entirely when the user prefers reduced motion.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<'fill' | 'out' | 'done'>('fill')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setPhase('done')
      return
    }

    document.body.style.overflow = 'hidden'
    const toOut = window.setTimeout(() => setPhase('out'), 2050) // after the fill completes
    const toDone = window.setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = ''
    }, 2850)

    return () => {
      clearTimeout(toOut)
      clearTimeout(toDone)
      document.body.style.overflow = ''
    }
  }, [])

  if (phase === 'done') return null

  return createPortal(
    <div
      aria-hidden="true"
      className={cn(
        'fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-charcoal-950',
        'transition-transform duration-[750ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform',
        phase === 'out' ? '-translate-y-full' : 'translate-y-0',
      )}
    >
      {/* faint warm aura behind the word — keeps the BG essentially solid */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[40rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/10 blur-3xl" />

      <span className="liquid-text select-none font-sans text-[clamp(4rem,22vw,13rem)] font-black leading-none tracking-tight">
        WAHJ
      </span>
    </div>,
    document.body,
  )
}
