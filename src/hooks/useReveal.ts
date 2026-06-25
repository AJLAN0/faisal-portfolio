import { useEffect, useRef, useState } from 'react'

interface RevealOptions {
  threshold?: number
  rootMargin?: string
  /** stop observing after the first reveal (default: true) */
  once?: boolean
}

/**
 * Lightweight scroll-reveal powered by IntersectionObserver.
 * Returns a ref to attach and a `visible` flag to drive CSS transitions —
 * no animation library, stays smooth on mobile.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options: RevealOptions = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = options
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // SSR / very old browsers — just show content.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, visible }
}
