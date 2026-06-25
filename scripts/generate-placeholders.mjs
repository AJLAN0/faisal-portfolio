/**
 * Generates cinematic placeholder scenes (SVG) for the وهج برودكشن site:
 * warm Diriyah-night skies, Najdi mud-brick towers with triangular
 * crenellations, palm silhouettes and a soft golden glow.
 *
 * Run:  npm run gen:placeholders
 * Output: /public/images/*.svg
 *
 * Replace any file with a real photo (keep the name, or update the path in
 * src/data/siteContent.ts). Every <img> already uses object-cover + lazy load.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = resolve(__dirname, '../public/images')

/* ----------------------------- palette ---------------------------------- */
const THEMES = {
  'night-gold': { skyTop: '#140d0a', skyBot: '#3a2014', glow: '#d8ad57', ground: '#0c0806', back: '#1a1009', front: '#0a0705', window: '#f6c873', star: '#ffe6b0', palm: '#080605' },
  warm: { skyTop: '#2a180f', skyBot: '#7a4524', glow: '#f0c069', ground: '#1a0e07', back: '#2c1a0f', front: '#150b05', window: '#ffdc94', star: '#ffe6b0', palm: '#110903' },
  green: { skyTop: '#0a2419', skyBot: '#134333', glow: '#d2ab5d', ground: '#06160f', back: '#0e2a1f', front: '#06140d', window: '#f1d089', star: '#dbf0d2', palm: '#04110b' },
  maroon: { skyTop: '#240a0f', skyBot: '#5d1c26', glow: '#ecb96b', ground: '#170609', back: '#310f16', front: '#130508', window: '#ffd492', star: '#ffd9c4', palm: '#0f0405' },
  dark: { skyTop: '#120f0c', skyBot: '#2c2016', glow: '#cda25a', ground: '#0b0807', back: '#1c140d', front: '#080604', window: '#e9c478', star: '#ffe6b0', palm: '#070504' },
}

/* ------------------------- deterministic RNG ----------------------------- */
function rng(seedStr) {
  let h = 1779033703 ^ seedStr.length
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    h ^= h >>> 16
    return (h >>> 0) / 4294967296
  }
}

const round = (n) => Math.round(n * 100) / 100

/* --------------------------- scene elements ------------------------------ */
function stars(rand, w, horizon, count, color) {
  let s = ''
  for (let i = 0; i < count; i++) {
    const x = round(rand() * w)
    const y = round(rand() * horizon * 0.8)
    const r = round(0.6 + rand() * 1.6)
    s += `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${round(0.25 + rand() * 0.5)}"/>`
  }
  return s
}

/** A skyline band of Najdi towers with triangular crenellations + windows. */
function skyline(rand, w, horizon, color, windowColor, opts = {}) {
  const { minH = 80, maxH = 240, step = 110, drop = 24, windows = true } = opts
  let s = `<g fill="${color}">`
  let dots = windows ? `<g fill="${windowColor}">` : ''
  let x = -40
  while (x < w + 40) {
    const bw = round(step * (0.6 + rand() * 0.7))
    const bh = round(minH + rand() * (maxH - minH))
    const top = round(horizon - bh)
    const base = round(horizon + drop)
    // tower body
    s += `<rect x="${round(x)}" y="${top}" width="${bw}" height="${round(base - top)}"/>`
    // triangular crenellations along the top edge
    const tri = 11
    const triH = 12
    let path = `M${round(x)} ${top}`
    for (let tx = x; tx < x + bw; tx += tri) {
      path += ` L${round(Math.min(tx + tri / 2, x + bw))} ${round(top - triH)} L${round(Math.min(tx + tri, x + bw))} ${top}`
    }
    s += `<path d="${path} Z"/>`
    // windows (small recessed openings)
    if (windows && bh > 110) {
      const cols = Math.max(1, Math.floor(bw / 26))
      const rows = Math.max(1, Math.floor(bh / 60))
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          if (rand() < 0.55) continue
          const wx = round(x + 12 + c * 26)
          const wy = round(top + 26 + r * 56)
          if (wy > base - 22) continue
          dots += `<rect x="${wx}" y="${wy}" width="7" height="11" rx="1.5" opacity="${round(0.5 + rand() * 0.5)}"/>`
        }
      }
    }
    x += bw + round(rand() * 26)
  }
  s += '</g>'
  if (windows) s += dots + '</g>'
  return s
}

/** Simple palm-tree silhouette. */
function palm(x, baseY, scale, color) {
  const h = 150 * scale
  const trunkTop = baseY - h
  let s = `<g fill="${color}">`
  // trunk (slightly curved)
  s += `<path d="M${round(x - 5 * scale)} ${round(baseY)} Q ${round(x + 6 * scale)} ${round(baseY - h * 0.5)} ${round(x)} ${round(trunkTop)} L ${round(x + 4 * scale)} ${round(trunkTop)} Q ${round(x + 12 * scale)} ${round(baseY - h * 0.5)} ${round(x + 5 * scale)} ${round(baseY)} Z"/>`
  // fronds
  const fl = 60 * scale
  const cx = x + 2 * scale
  const angles = [-150, -120, -90, -60, -30, -170, -10]
  for (const a of angles) {
    const rad = (a * Math.PI) / 180
    const ex = round(cx + Math.cos(rad) * fl)
    const ey = round(trunkTop + Math.sin(rad) * fl)
    const mx = round(cx + Math.cos(rad) * fl * 0.5 - Math.sin(rad) * 10 * scale)
    const my = round(trunkTop + Math.sin(rad) * fl * 0.5 + Math.cos(rad) * 10 * scale)
    s += `<path d="M${round(cx)} ${round(trunkTop)} Q ${mx} ${my} ${ex} ${ey} Q ${round(mx + 4)} ${round(my + 4)} ${round(cx)} ${round(trunkTop + 4)} Z"/>`
  }
  s += '</g>'
  return s
}

function sparkMark(cx, cy, r, redA, redB, gold) {
  const i = r * 0.16
  const main = `M${round(cx)} ${round(cy - r)} Q ${round(cx + i)} ${round(cy - i)} ${round(cx + r)} ${round(cy)} Q ${round(cx + i)} ${round(cy + i)} ${round(cx)} ${round(cy + r)} Q ${round(cx - i)} ${round(cy + i)} ${round(cx - r)} ${round(cy)} Q ${round(cx - i)} ${round(cy - i)} ${round(cx)} ${round(cy - r)} Z`
  const sr = r * 0.34
  const sx = cx + r * 0.62
  const sy = cy - r * 0.6
  const si = sr * 0.18
  const tw = `M${round(sx)} ${round(sy - sr)} Q ${round(sx + si)} ${round(sy - si)} ${round(sx + sr)} ${round(sy)} Q ${round(sx + si)} ${round(sy + si)} ${round(sx)} ${round(sy + sr)} Q ${round(sx - si)} ${round(sy + si)} ${round(sx - sr)} ${round(sy)} Q ${round(sx - si)} ${round(sy - si)} ${round(sx)} ${round(sy - sr)} Z`
  return `
    <defs><linearGradient id="spk" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="${redA}"/><stop offset="1" stop-color="${redB}"/></linearGradient></defs>
    <path d="${main}" fill="url(#spk)"/>
    <path d="${tw}" fill="${gold}"/>`
}

const esc = (str) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const arabicDigits = (v) => String(v).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)])

/* ------------------------------ scene ------------------------------------ */
function buildScene({ name, w, h, theme, layout = 'card', titleAr = '', titleEn = '', clipIndex = 0, clipTotal = 0, projectAr = '' }) {
  const t = THEMES[theme]
  const rand = rng(name)
  const horizon = round(h * 0.7)

  const titleSize = round(Math.min(w, h) * (layout === 'brand' ? 0.085 : 0.072))
  const enSize = round(titleSize * 0.34)

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(titleAr || 'وهج برودكشن')}">`

  svg += `<defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${t.skyTop}"/>
      <stop offset="0.62" stop-color="${t.skyBot}"/>
      <stop offset="1" stop-color="${t.ground}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="${round((horizon / h) * 100)}%" r="62%">
      <stop offset="0" stop-color="${t.glow}" stop-opacity="0.85"/>
      <stop offset="42%" stop-color="${t.glow}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${t.glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig" cx="50%" cy="48%" r="75%">
      <stop offset="55%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>
    </radialGradient>
  </defs>`

  // sky + glow + stars
  svg += `<rect width="${w}" height="${h}" fill="url(#sky)"/>`
  svg += `<rect width="${w}" height="${h}" fill="url(#glow)"/>`
  svg += stars(rand, w, horizon, Math.round(w / 22), t.star)
  // soft moon orb
  svg += `<circle cx="${round(w * 0.5)}" cy="${round(horizon * 0.92)}" r="${round(h * 0.04)}" fill="${t.glow}" opacity="0.7"/>`

  // back wall (Diriyah perimeter wall) + back skyline
  svg += `<rect x="0" y="${round(horizon - 26)}" width="${w}" height="40" fill="${t.back}" opacity="0.85"/>`
  svg += skyline(rand, w, horizon, t.back, t.window, { minH: 60, maxH: 150, step: 150, drop: 60, windows: false })
  // front skyline (detailed, glowing windows)
  svg += skyline(rand, w, horizon + 10, t.front, t.window, { minH: 120, maxH: 270, step: 120, drop: 70 })

  // ground
  svg += `<rect x="0" y="${round(horizon + 8)}" width="${w}" height="${round(h - horizon)}" fill="${t.ground}"/>`

  // palms in foreground
  svg += palm(round(w * 0.12), round(horizon + 30), Math.min(w, h) / 520 + 0.4, t.palm)
  svg += palm(round(w * 0.88), round(horizon + 44), Math.min(w, h) / 470 + 0.5, t.palm)

  // vignette
  svg += `<rect width="${w}" height="${h}" fill="url(#vig)"/>`

  // bottom darkening for text legibility
  svg += `<rect x="0" y="${round(h * 0.6)}" width="${w}" height="${round(h * 0.4)}" fill="#000000" opacity="0.28"/>`

  const fontStack = `'Tajawal','Segoe UI',-apple-system,'Noto Sans Arabic',sans-serif`

  if (layout === 'brand') {
    const cx = w / 2
    svg += `<g transform="translate(${round(cx)}, ${round(h * 0.34)})">${sparkMark(0, 0, round(h * 0.1), '#D83A40', '#9C1B20', '#C9A24B')}</g>`
    svg += `<text x="${round(cx)}" y="${round(h * 0.62)}" text-anchor="middle" font-family="${fontStack}" font-weight="700" font-size="${titleSize}" fill="#FAF6EE" direction="rtl">${esc(titleAr)}</text>`
    if (titleEn)
      svg += `<text x="${round(cx)}" y="${round(h * 0.62 + titleSize * 0.9)}" text-anchor="middle" font-family="${fontStack}" font-weight="500" letter-spacing="6" font-size="${enSize}" fill="${t.glow}">${esc(titleEn.toUpperCase())}</text>`
  } else if (layout === 'card') {
    // small spark accent above the title
    svg += `<g transform="translate(${round(w / 2)}, ${round(h * 0.74)})">${sparkMark(0, 0, round(Math.min(w, h) * 0.035), '#D83A40', '#9C1B20', '#C9A24B')}</g>`
    svg += `<text x="${round(w / 2)}" y="${round(h * 0.86)}" text-anchor="middle" font-family="${fontStack}" font-weight="700" font-size="${titleSize}" fill="#FAF6EE" direction="rtl">${esc(titleAr)}</text>`
    if (titleEn)
      svg += `<text x="${round(w / 2)}" y="${round(h * 0.86 + titleSize * 0.92)}" text-anchor="middle" font-family="${fontStack}" font-weight="500" letter-spacing="${round(enSize * 0.35)}" font-size="${enSize}" fill="${t.glow}">${esc(titleEn.toUpperCase())}</text>`
  } else if (layout === 'clip') {
    const clipSize = round(Math.min(w, h) * 0.12)
    const idxSize = round(clipSize * 0.42)
    // project label (top)
    svg += `<text x="${round(w / 2)}" y="${round(h * 0.16)}" text-anchor="middle" font-family="${fontStack}" font-weight="500" letter-spacing="2" font-size="${idxSize}" fill="${t.glow}" direction="rtl" opacity="0.92">${esc(projectAr)}</text>`
    // "مقطع NN" (bottom)
    svg += `<g transform="translate(${round(w / 2)}, ${round(h * 0.64)})">${sparkMark(0, 0, round(Math.min(w, h) * 0.05), '#D83A40', '#9C1B20', '#C9A24B')}</g>`
    svg += `<text x="${round(w / 2)}" y="${round(h * 0.84)}" text-anchor="middle" font-family="${fontStack}" font-weight="700" font-size="${clipSize}" fill="#FAF6EE" direction="rtl">مقطع ${arabicDigits(String(clipIndex).padStart(2, '0'))}</text>`
    // index NN / TT (corner)
    svg += `<text x="${round(w * 0.5)}" y="${round(h * 0.93)}" text-anchor="middle" font-family="${fontStack}" font-weight="500" font-size="${round(idxSize * 0.78)}" fill="${t.glow}" direction="rtl">${arabicDigits(String(clipIndex).padStart(2, '0'))} / ${arabicDigits(String(clipTotal).padStart(2, '0'))}</text>`
  }

  svg += '</svg>'
  return svg
}

/* ------------------------------ specs ------------------------------------ */
const SPECS = [
  { name: 'hero-bg', w: 1600, h: 1000, theme: 'night-gold', layout: 'bg' },
  { name: 'og-image', w: 1200, h: 630, theme: 'night-gold', layout: 'brand', titleAr: 'وهج برودكشن', titleEn: 'Saudi Creative Studio' },
  { name: 'diriyah-hero', w: 1600, h: 900, theme: 'night-gold', layout: 'card', titleAr: 'موسم الدرعية', titleEn: 'Diriyah Season' },

  { name: 'diriyah-01', w: 800, h: 1000, theme: 'night-gold', layout: 'card', titleAr: 'موسم الدرعية', titleEn: 'Diriyah Season' },
  { name: 'diriyah-02', w: 800, h: 1000, theme: 'maroon', layout: 'card', titleAr: 'ليالي الدرعية', titleEn: 'Diriyah Nights' },
  { name: 'diriyah-03', w: 800, h: 1000, theme: 'warm', layout: 'card', titleAr: 'سوق الموسم', titleEn: 'Season Souq' },
  { name: 'diriyah-04', w: 800, h: 1000, theme: 'night-gold', layout: 'card', titleAr: 'مطعم 963', titleEn: 'Restaurant 963' },
  { name: 'diriyah-05', w: 800, h: 1000, theme: 'dark', layout: 'card', titleAr: 'مسلسل الموسم', titleEn: 'Season Series' },
  { name: 'diriyah-06', w: 800, h: 1000, theme: 'maroon', layout: 'card', titleAr: 'صدى الوادي', titleEn: 'Sada Al-Wadi' },
  { name: 'diriyah-07', w: 800, h: 1000, theme: 'warm', layout: 'card', titleAr: 'مطعم bibi', titleEn: 'bibi Restaurant' },
  { name: 'diriyah-08', w: 800, h: 1000, theme: 'green', layout: 'card', titleAr: 'سوق الموسم ٢', titleEn: 'Season Souq 2' },

  { name: 'portfolio-diriyah', w: 1200, h: 900, theme: 'night-gold', layout: 'card', titleAr: 'الدرعية', titleEn: 'Diriyah' },
  { name: 'portfolio-poetry', w: 1200, h: 900, theme: 'maroon', layout: 'card', titleAr: 'أمسيات شعرية', titleEn: 'Poetry Evenings' },
  { name: 'portfolio-culture-guide', w: 1200, h: 900, theme: 'dark', layout: 'card', titleAr: 'دليل الثقافة والفنون', titleEn: 'Culture & Arts Guide' },
  { name: 'portfolio-recovery-device', w: 1200, h: 900, theme: 'warm', layout: 'card', titleAr: 'ريلز إعلانية', titleEn: 'Promo Reels' },
  { name: 'portfolio-hr-greeting', w: 1200, h: 900, theme: 'green', layout: 'card', titleAr: 'معايدة الموارد البشرية', titleEn: 'HR Greeting' },
  { name: 'portfolio-2020-interviews', w: 1200, h: 900, theme: 'dark', layout: 'card', titleAr: 'مقابلات 20/20', titleEn: '20/20 Interviews' },
]

/* ------------------------------ write ------------------------------------ */
mkdirSync(OUT_DIR, { recursive: true })
let count = 0
for (const spec of SPECS) {
  const svg = buildScene(spec)
  writeFileSync(resolve(OUT_DIR, `${spec.name}.svg`), svg, 'utf8')
  count++
}

/* ------------------ per-project clip thumbnails (lightbox) --------------- */
// slug + count must match portfolio.items in src/data/siteContent.ts
const WORKS = [
  { slug: 'diriyah', theme: 'night-gold', projectAr: 'الدرعية', count: 6 },
  { slug: 'poetry', theme: 'maroon', projectAr: 'أمسيات شعرية', count: 4 },
  { slug: 'culture-guide', theme: 'dark', projectAr: 'دليل الثقافة والفنون', count: 1 },
  { slug: 'recovery-device', theme: 'warm', projectAr: 'ريلز جهاز استشفاء', count: 3 },
  { slug: 'hr-greeting', theme: 'green', projectAr: 'معايدة الموارد البشرية', count: 1 },
  { slug: 'interviews-2020', theme: 'dark', projectAr: 'مقابلات معرض 20/20', count: 9 },
]

const WORKS_DIR = resolve(OUT_DIR, 'works')
mkdirSync(WORKS_DIR, { recursive: true })
let clipCount = 0
for (const work of WORKS) {
  for (let i = 1; i <= work.count; i++) {
    const svg = buildScene({
      name: `${work.slug}-${i}`,
      w: 800,
      h: 600,
      theme: work.theme,
      layout: 'clip',
      clipIndex: i,
      clipTotal: work.count,
      projectAr: work.projectAr,
    })
    writeFileSync(resolve(WORKS_DIR, `${work.slug}-${i}.svg`), svg, 'utf8')
    clipCount++
  }
}

console.log(`✓ Generated ${count} scenes + ${clipCount} clip thumbnails → public/images/`)
