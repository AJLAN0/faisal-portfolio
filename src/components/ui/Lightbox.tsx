import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Film, X } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { PlayButton } from '@/components/ui/PlayButton'
import { toArabicDigits } from '@/lib/numerals'
import { portfolio } from '@/data/siteContent'
import type { PortfolioItem } from '@/data/siteContent'

interface LightboxProps {
  item: PortfolioItem | null
  onClose: () => void
}

/**
 * Accessible collection gallery. Opens to reveal every clip in a project as a
 * cinematic tile. The tiles are placeholders — to wire real videos, give each
 * clip a URL and turn the <button> tiles into links/players.
 */
export function Lightbox({ item, onClose }: LightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!item) return

    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      // simple focus trap inside the dialog
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  const clips = Array.from({ length: item.videoCount }, (_, i) => i + 1)
  const countLabel = `${toArabicDigits(item.videoCount)} ${
    item.videoCount === 1 ? portfolio.clipWord : portfolio.videosWord
  }`

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-charcoal-950/80 p-0 backdrop-blur-md animate-fade-in sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[2rem] border border-sand-50/10 bg-charcoal-900 text-sand-50 shadow-card-hover animate-scale-in sm:rounded-[2rem]"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-sand-50/10 bg-charcoal-950/40 p-6 sm:p-8">
          <div className="flex flex-col items-start gap-2.5">
            <Badge
              className="border-brand-gold/30 bg-brand-gold/10 text-brand-gold-light"
              icon={<Film className="h-3.5 w-3.5" />}
            >
              {countLabel}
            </Badge>
            <h3 id="lightbox-title" className="heading-display text-2xl sm:text-3xl">
              {item.titleAr}
            </h3>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-sand-200/60">
              {item.titleEn} · {item.category}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="إغلاق المعرض"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-sand-50/15 text-sand-100 transition-colors hover:border-brand-red hover:bg-brand-red hover:text-sand-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Clip grid */}
        <div className="grid grid-cols-2 gap-3 overflow-y-auto p-5 sm:grid-cols-3 sm:gap-4 sm:p-8">
          {clips.map((n) => (
            <a
              key={n}
              href="#contact"
              onClick={onClose}
              aria-label={`${item.titleAr} — ${portfolio.clipWord} ${toArabicDigits(n)}`}
              className="group/clip relative block overflow-hidden rounded-2xl bg-charcoal-950 ring-warm"
            >
              <img
                src={`/images/works/${item.slug}-${n}.svg`}
                alt={`${item.titleAr} — ${portfolio.clipWord} ${toArabicDigits(n)}`}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-premium group-hover/clip:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/65 to-transparent" />
              <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover/clip:opacity-100">
                <PlayButton size="sm" />
              </div>
              <span className="absolute bottom-2.5 right-3 text-sm font-bold text-sand-50">
                {portfolio.clipWord} {toArabicDigits(n)}
              </span>
              <span className="absolute left-3 top-3 rounded-full bg-charcoal-950/55 px-2 py-0.5 text-[0.6rem] font-medium text-sand-100 backdrop-blur-sm">
                {toArabicDigits(n)} / {toArabicDigits(item.videoCount)}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}
