import { useId } from 'react'

/**
 * Tiling Najdi-inspired geometric pattern (interlocking triangles).
 * Purely decorative — keep opacity low and let it sit behind content.
 */
export function NajdiPattern({
  className,
  stroke = 'currentColor',
  strokeWidth = 1,
}: {
  className?: string
  stroke?: string
  strokeWidth?: number
}) {
  const id = useId()
  return (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id={`najdi-${id}`}
          width="44"
          height="22"
          patternUnits="userSpaceOnUse"
          patternTransform="translate(0 0)"
        >
          <path
            d="M0 22 L11 2 L22 22 L33 2 L44 22"
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <path
            d="M0 0 L11 20 L22 0 L33 20 L44 0"
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            opacity="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#najdi-${id})`} />
    </svg>
  )
}

/**
 * A short centered row of solid Najdi triangles — used as a delicate
 * section accent / divider.
 */
export function NajdiTriangles({
  className,
  count = 5,
  color = 'currentColor',
}: {
  className?: string
  count?: number
  color?: string
}) {
  return (
    <span className={className} aria-hidden="true">
      <svg width={count * 16} height="12" viewBox={`0 0 ${count * 16} 12`} fill="none">
        {Array.from({ length: count }).map((_, i) => (
          <path
            key={i}
            d={`M${i * 16} 12 L${i * 16 + 8} 0 L${i * 16 + 16} 12`}
            stroke={color}
            strokeWidth="1.4"
            strokeLinejoin="round"
            opacity={i === Math.floor(count / 2) ? 1 : 0.45}
          />
        ))}
      </svg>
    </span>
  )
}
