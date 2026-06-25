import type { SVGProps } from 'react'
import type { SocialLink } from '@/data/siteContent'

/**
 * Brand social glyphs as inline SVG (lucide v1 dropped brand marks).
 * Each uses currentColor so it inherits text color on hover.
 */

function Instagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  )
}

function TikTok(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M13.2 3.5v9.6a3 3 0 1 1-2.4-2.94"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.2 3.5c.3 1.9 1.9 3.4 3.9 3.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function X(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 4l16 16M20 4L4 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function LinkedIn(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 10v7M7 7.2v.01" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path
        d="M11 17v-4a2.2 2.2 0 0 1 4.4 0v4M11 17v-7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const map: Record<SocialLink['id'], (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  instagram: Instagram,
  tiktok: TikTok,
  x: X,
  linkedin: LinkedIn,
}

export function SocialIcon({
  id,
  className,
}: {
  id: SocialLink['id']
  className?: string
}) {
  const Cmp = map[id]
  return <Cmp className={className} />
}
