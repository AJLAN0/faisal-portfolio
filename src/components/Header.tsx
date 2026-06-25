import { useEffect, useState } from 'react'
import { Menu, Sparkles, X } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { brand, navCta, navItems } from '@/data/siteContent'
import { cn } from '@/lib/cn'

const SECTION_IDS = navItems.map((n) => n.href.replace('#', ''))

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  // Transparent → solid on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scrollspy — highlight the section currently in view
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Lock scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const onSolid = scrolled || open

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium',
        onSolid
          ? 'border-b border-charcoal-900/5 bg-sand-50/90 shadow-[0_10px_34px_-22px_rgba(19,16,13,0.55)] backdrop-blur-lg'
          : 'bg-transparent',
      )}
    >
      <div className="container-wahj flex h-16 items-center justify-between sm:h-20">
        <a href="#home" aria-label={`${brand.nameAr} — الرئيسية`} className="shrink-0">
          <Logo variant={onSolid ? 'dark' : 'light'} />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="التنقل الرئيسي">
          {navItems.map((item) => {
            const isActive = active === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                  isActive
                    ? 'text-brand-red'
                    : onSolid
                      ? 'text-charcoal-700 hover:text-brand-red'
                      : 'text-sand-100/90 hover:text-sand-50',
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute inset-x-4 -bottom-0.5 h-px origin-center bg-brand-red transition-transform duration-300',
                    isActive ? 'scale-x-100' : 'scale-x-0',
                  )}
                  aria-hidden="true"
                />
              </a>
            )
          })}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink
            href={navCta.href}
            variant="primary"
            className="!px-5 !py-2.5"
            icon={<Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />}
          >
            {navCta.label}
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
          className={cn(
            'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden',
            onSolid
              ? 'border-charcoal-900/10 text-charcoal-800 hover:border-brand-red hover:text-brand-red'
              : 'border-sand-50/25 text-sand-50 hover:border-sand-50/60',
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          'origin-top overflow-hidden transition-all duration-500 ease-premium lg:hidden',
          open ? 'max-h-[34rem] opacity-100' : 'pointer-events-none max-h-0 opacity-0',
        )}
      >
        <div className="container-wahj pb-6 pt-1">
          <nav
            className="flex flex-col gap-1 rounded-3xl border border-charcoal-900/10 bg-sand-50/95 p-3 shadow-card backdrop-blur-lg"
            aria-label="التنقل للجوال"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium text-charcoal-800 transition-colors hover:bg-sand-100 hover:text-brand-red"
              >
                {item.label}
              </a>
            ))}
            <ButtonLink
              href={navCta.href}
              onClick={() => setOpen(false)}
              variant="primary"
              className="mt-2 w-full"
              icon={<Sparkles className="h-4 w-4" />}
            >
              {navCta.label}
            </ButtonLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
