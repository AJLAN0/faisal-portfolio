import { useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { toArabicDigits } from '@/lib/numerals'
import { process } from '@/data/siteContent'
import { cn } from '@/lib/cn'

// Zig-zag placement (physical left %) — right, left, a bit center-right, center
const LEFT_PCT = [67, 33, 58, 46]
const TOP_PCT = [11, 37, 63, 89]

interface Point {
  x: number
  y: number
}

function buildPath(pts: Point[]): string {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const cur = pts[i]
    const midY = (prev.y + cur.y) / 2
    d += ` C ${prev.x} ${midY}, ${cur.x} ${midY}, ${cur.x} ${cur.y}`
  }
  return d
}

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const [points, setPoints] = useState<Point[]>([])
  const [progress, setProgress] = useState(0)

  // Measure node centers → drive the SVG path
  useEffect(() => {
    const measure = () => {
      const cont = containerRef.current
      if (!cont) return
      const cr = cont.getBoundingClientRect()
      const pts = nodeRefs.current.map((node) => {
        if (!node) return { x: 0, y: 0 }
        const nr = node.getBoundingClientRect()
        return { x: nr.left + nr.width / 2 - cr.left, y: nr.top + nr.height / 2 - cr.top }
      })
      setDims({ w: cont.clientWidth, h: cont.clientHeight })
      setPoints(pts)
    }

    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', measure)
    const settle = window.setTimeout(measure, 400) // re-measure after fonts settle
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
      clearTimeout(settle)
    }
  }, [])

  // Scroll → progress (0…1) for the filling line
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1)
      return
    }
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const cont = containerRef.current
        if (!cont) return
        const rect = cont.getBoundingClientRect()
        const vh = window.innerHeight
        const p = (vh * 0.62 - rect.top) / (rect.height * 0.78)
        setProgress(Math.min(1, Math.max(0, p)))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const pathD = useMemo(() => buildPath(points), [points])

  // Per-node activation thresholds from cumulative chord length
  const thresholds = useMemo(() => {
    if (points.length < 2) return process.steps.map((_, i) => i / process.steps.length)
    const segs: number[] = []
    let total = 0
    for (let i = 1; i < points.length; i++) {
      const l = Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y)
      segs.push(l)
      total += l
    }
    const out = [0]
    let acc = 0
    for (const l of segs) {
      acc += l
      out.push(total ? acc / total : 0)
    }
    return out
  }, [points])

  const ready = dims.w > 0 && points.length === process.steps.length

  return (
    <section id="process" className="relative overflow-hidden bg-sand-50 py-24 sm:py-32">
      <div className="container-wahj">
        <SectionHeading
          eyebrow={process.eyebrow}
          title={process.title}
          subtitle={process.subtitle}
        />

        <div
          ref={containerRef}
          className="relative mx-auto mt-16 h-[64rem] max-w-3xl sm:h-[56rem] lg:h-[50rem]"
        >
          {/* Snaking progress line */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${dims.w || 1} ${dims.h || 1}`}
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="process-line"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="0"
                y2={dims.h || 1}
              >
                <stop offset="0" stopColor="#C1272D" />
                <stop offset="0.55" stopColor="#D83A40" />
                <stop offset="1" stopColor="#C9A24B" />
              </linearGradient>
            </defs>

            {ready && (
              <>
                {/* faint track */}
                <path
                  d={pathD}
                  stroke="#13100D"
                  strokeOpacity="0.1"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* animated fill */}
                <path
                  d={pathD}
                  stroke="url(#process-line)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset={1 - progress}
                  style={{ transition: 'stroke-dashoffset 0.15s linear' }}
                />
              </>
            )}
          </svg>

          {/* Step nodes */}
          {process.steps.map((step, i) => {
            const active = progress >= (thresholds[i] ?? 1) - 0.02
            return (
              <div
                key={step.title}
                className="absolute w-[13.5rem] -translate-x-1/2 -translate-y-1/2 sm:w-64 lg:w-72"
                style={{ left: `${LEFT_PCT[i]}%`, top: `${TOP_PCT[i]}%` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    ref={(el) => {
                      nodeRefs.current[i] = el
                    }}
                    className={cn(
                      'mb-3 grid h-16 w-16 place-items-center rounded-2xl ring-4 transition-all duration-500 ease-premium',
                      active
                        ? 'scale-105 bg-brand-red text-sand-50 shadow-glow-red ring-brand-red/15'
                        : 'bg-charcoal-900 text-brand-gold-light ring-sand-100',
                    )}
                  >
                    <Icon name={step.icon} className="h-7 w-7" />
                  </div>
                  <span
                    className={cn(
                      'text-xs font-bold transition-colors duration-500',
                      active ? 'text-brand-red' : 'text-charcoal-500/70',
                    )}
                  >
                    الخطوة {toArabicDigits(i + 1)}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-bold text-charcoal-900">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal-600">{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
