import { cn } from '@/lib/cn'

/**
 * Cinematic play overlay for video cards. Decorative only — the parent
 * card is the actual link/button. Fills with the red brand accent on
 * group-hover. The triangle stays right-pointing (universal "play").
 */
export function PlayButton({
  className,
  size = 'md',
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const dim =
    size === 'lg' ? 'h-20 w-20' : size === 'sm' ? 'h-12 w-12' : 'h-16 w-16'
  const iconDim = size === 'lg' ? 'h-7 w-7' : size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'

  return (
    <span
      className={cn(
        'relative inline-flex items-center justify-center rounded-full bg-sand-50/15 ring-1 ring-inset ring-sand-50/40 backdrop-blur-md transition-all duration-500 ease-premium group-hover:scale-110',
        dim,
        className,
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-full bg-brand-red/0 transition-colors duration-500 group-hover:bg-brand-red/95" />
      <svg
        viewBox="0 0 24 24"
        className={cn('relative translate-x-[1px] fill-sand-50', iconDim)}
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  )
}
