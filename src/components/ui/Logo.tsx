import { useId } from 'react'
import { brand } from '@/data/siteContent'
import { cn } from '@/lib/cn'

/**
 * Brand mark for "وهج" (glow / radiance) — a sharp four-point spark with a
 * smaller gold twinkle. Transparent background, themeable via props.
 *
 * To use a real uploaded logo instead, either replace
 * /public/images/logo.svg or swap <LogoMark /> for an <img src={brand.logo} />.
 */
export function LogoMark({
  className,
  glow = false,
}: {
  className?: string
  glow?: boolean
}) {
  const id = useId()
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-red`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#D83A40" />
          <stop offset="1" stopColor="#9C1B20" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#C9A24B" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#C1272D" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#C1272D" stopOpacity="0" />
        </radialGradient>
      </defs>

      {glow && <circle cx="20" cy="20" r="20" fill={`url(#${id}-glow)`} />}

      {/* main four-point spark */}
      <path
        d="M20 3 Q 21.7 18.3 37 20 Q 21.7 21.7 20 37 Q 18.3 21.7 3 20 Q 18.3 18.3 20 3 Z"
        fill={`url(#${id}-red)`}
      />
      {/* small gold twinkle */}
      <path
        d="M30 8 Q 30.7 11.3 34 12 Q 30.7 12.7 30 16 Q 29.3 12.7 26 12 Q 29.3 11.3 30 8 Z"
        fill="#C9A24B"
      />
    </svg>
  )
}

interface LogoProps {
  variant?: 'dark' | 'light'
  showText?: boolean
  glow?: boolean
  className?: string
}

export function Logo({
  variant = 'dark',
  showText = true,
  glow = false,
  className,
}: LogoProps) {
  const isLight = variant === 'light'
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark glow={glow} className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-display text-lg font-bold tracking-tight sm:text-xl',
              isLight ? 'text-sand-50' : 'text-charcoal-900',
            )}
          >
            {brand.nameAr}
          </span>
          <span
            className={cn(
              'mt-0.5 text-[0.58rem] font-medium uppercase tracking-[0.22em]',
              isLight ? 'text-sand-200/70' : 'text-charcoal-500',
            )}
          >
            {brand.kicker}
          </span>
        </span>
      )}
    </span>
  )
}
