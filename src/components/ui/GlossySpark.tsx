import { useId } from 'react'

/**
 * Large glossy "glass" version of the brand spark — the hero centerpiece,
 * inspired by premium dark brand marks: deep maroon body, specular highlights
 * and a glowing red rim. Pair with a CSS drop-shadow for the outer glow.
 */
export function GlossySpark({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-body`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#6A1C28" />
          <stop offset="0.42" stopColor="#2C0D13" />
          <stop offset="1" stopColor="#0C0405" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="0.55" y2="0.9">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="0.22" stopColor="#FFD9DE" stopOpacity="0.12" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-rim`} cx="50%" cy="50%" r="50%">
          <stop offset="0.62" stopColor="#C1272D" stopOpacity="0" />
          <stop offset="0.92" stopColor="#E0455A" stopOpacity="0.45" />
          <stop offset="1" stopColor="#7A1620" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* spark body */}
      <path
        d="M120 8 Q139 101 232 120 Q139 139 120 232 Q101 139 8 120 Q101 101 120 8 Z"
        fill={`url(#${id}-body)`}
        stroke="#C1272D"
        strokeOpacity="0.55"
        strokeWidth="1.4"
      />
      {/* rim glow */}
      <path
        d="M120 8 Q139 101 232 120 Q139 139 120 232 Q101 139 8 120 Q101 101 120 8 Z"
        fill={`url(#${id}-rim)`}
      />
      {/* top-left specular sheen */}
      <path
        d="M120 8 Q139 101 232 120 Q139 139 120 232 Q101 139 8 120 Q101 101 120 8 Z"
        fill={`url(#${id}-shine)`}
      />
      {/* bright glints */}
      <path d="M120 18 Q133 96 150 110 Q122 92 112 56 Z" fill="#FFFFFF" opacity="0.16" />
      <circle cx="150" cy="92" r="5.5" fill="#FFFFFF" opacity="0.55" />
      <circle cx="96" cy="150" r="3" fill="#E0455A" opacity="0.5" />
    </svg>
  )
}
