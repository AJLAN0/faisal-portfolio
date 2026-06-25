import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Small pill. Border color follows text color by default (currentColor),
 * so pass a `text-*` class to recolor both at once.
 */
export function Badge({
  children,
  className,
  icon,
}: {
  children: ReactNode
  className?: string
  icon?: ReactNode
}) {
  return (
    <span className={cn('badge', className)}>
      {icon}
      {children}
    </span>
  )
}
