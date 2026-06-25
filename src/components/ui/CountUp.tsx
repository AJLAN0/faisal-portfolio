import { useEffect, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

interface CountUpProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
}

/**
 * Counts from 0 → value once it scrolls into view.
 * Falls back to the final number instantly when reduced motion is preferred.
 */
export function CountUp({ value, duration = 1600, prefix = '', suffix = '' }: CountUpProps) {
  const { ref, visible } = useReveal<HTMLSpanElement>({ once: true, threshold: 0.4 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!visible) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setDisplay(value)
      return
    }

    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setDisplay(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [visible, value, duration])

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
