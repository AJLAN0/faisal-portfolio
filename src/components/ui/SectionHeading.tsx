import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  align?: 'center' | 'start'
  tone?: 'light' | 'dark'
  className?: string
  titleClassName?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'light',
  className,
  titleClassName,
}: SectionHeadingProps) {
  const isDark = tone === 'dark'
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-start',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className={cn('eyebrow', isDark && 'text-brand-gold')}>
            <span className="h-px w-7 bg-current" aria-hidden="true" />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal delay={70}>
        <h2
          className={cn(
            'heading-display text-balance text-3xl sm:text-4xl lg:text-[2.95rem]',
            isDark ? 'text-sand-50' : 'text-charcoal-900',
            titleClassName,
          )}
        >
          {title}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal delay={140}>
          <p
            className={cn(
              'max-w-2xl text-pretty text-base leading-relaxed sm:text-lg',
              isDark ? 'text-sand-200/80' : 'text-charcoal-600',
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
