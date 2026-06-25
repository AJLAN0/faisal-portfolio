import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'dark' | 'outline' | 'ghost-light'

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  dark: 'btn-dark',
  outline: 'btn-outline',
  'ghost-light': 'btn-ghost-light',
}

interface ButtonLinkProps {
  href: string
  children: ReactNode
  variant?: Variant
  className?: string
  /** trailing icon node (e.g. an arrow) */
  icon?: ReactNode
  onClick?: () => void
  ariaLabel?: string
  external?: boolean
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className,
  icon,
  onClick,
  ariaLabel,
  external = false,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(variantClass[variant], 'group', className)}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      <span>{children}</span>
      {icon}
    </a>
  )
}
