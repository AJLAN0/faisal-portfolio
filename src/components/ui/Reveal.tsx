import type { ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/cn'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface RevealProps {
  children: ReactNode
  className?: string
  /** delay in ms before the entrance plays */
  delay?: number
  direction?: Direction
}

const hiddenOffset: Record<Direction, string> = {
  up: 'translate-y-8',
  down: '-translate-y-8',
  left: 'translate-x-8',
  right: '-translate-x-8',
  none: '',
}

/**
 * Wraps content and fades/slides it into view on scroll.
 * Honors prefers-reduced-motion via the `motion-reduce` utilities.
 */
export function Reveal({ children, className, delay = 0, direction = 'up' }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={cn(
        'transition-all duration-700 ease-premium will-change-transform',
        'motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
        visible
          ? 'translate-x-0 translate-y-0 opacity-100'
          : cn('opacity-0', hiddenOffset[direction]),
        className,
      )}
    >
      {children}
    </div>
  )
}
