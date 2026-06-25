# وهج برودكشن — Wahj Production

A premium, Arabic‑first (RTL) one‑page website for a Saudi marketing / creative
agency. The design is cinematic and heritage‑inspired — Diriyah nights, Najdi
mud‑brick architecture, palm silhouettes, warm golden lighting — built as a
high‑end portfolio, not a generic template.

> Brand name, contact details, social links and images are **placeholders**.
> See **[Customize](#-customize-replace-placeholders)** to make it yours.

---

## ✨ Stack

| | |
|---|---|
| Framework | **React 18 + TypeScript** |
| Build tool | **Vite 5** |
| Styling | **Tailwind CSS 3** (custom brand theme) |
| Icons | **lucide-react** + custom inline SVG (socials, logo) |
| Fonts | **Tajawal** (body) + **El Messiri** (display) via Google Fonts |
| Animations | IntersectionObserver scroll‑reveal + CSS (no animation library) |

No backend. Fully static — deploy the `dist/` folder anywhere (Vercel, Netlify,
GitHub Pages, S3, …).

---

## 🚀 Run

```bash
npm install          # install dependencies

npm run dev          # start dev server  → http://localhost:5173
npm run build        # type-check + production build → dist/
npm run preview      # preview the production build
npm run lint         # TypeScript type-check (no emit)

npm run gen:placeholders   # regenerate the placeholder image scenes
```

---

## 🗂️ Structure

```
public/
  favicon.svg
  images/                     # placeholder scenes (swap with real photos)
    logo.svg                  # brand mark (also used in OG/meta)
    og-image.svg              # social share image (1200×630)
    hero-bg.svg               # hero background
    diriyah-hero.svg          # Diriyah featured card
    diriyah-01..08.svg        # Diriyah grid cards
    portfolio-*.svg           # works / portfolio thumbnails
scripts/
  generate-placeholders.mjs   # builds the SVG placeholder scenes
src/
  data/
    siteContent.ts            # ← ALL text, links, images & numbers live here
  hooks/
    useReveal.ts              # IntersectionObserver scroll-reveal hook
  lib/
    cn.ts                     # tiny className helper
  components/
    Header.tsx  HeroSection.tsx  AboutSection.tsx  ServicesSection.tsx
    DiriyahSection.tsx  PortfolioSection.tsx  ProcessSection.tsx
    StatsSection.tsx  CTASection.tsx  Footer.tsx
    ui/                       # reusable building blocks
      Logo.tsx  ButtonLink.tsx  Badge.tsx  PlayButton.tsx
      SectionHeading.tsx  Reveal.tsx  CountUp.tsx
      Icon.tsx  SocialIcons.tsx  NajdiPattern.tsx
  App.tsx  main.tsx  index.css
```

---

## 🛠️ Customize (replace placeholders)

Almost everything is data‑driven from a single file:
**[`src/data/siteContent.ts`](src/data/siteContent.ts)**.

| What | Where |
|---|---|
| **Brand name** (AR/EN) + kicker | `brand` object |
| **Contact** — email, phone, WhatsApp, location | `contact` object |
| **Social links** (Instagram, TikTok, X, LinkedIn) | `socials[].href` |
| **Nav items / CTA** | `navItems`, `navCta` |
| **Hero / About / Services / Process copy** | matching objects |
| **Diriyah cards** & featured | `diriyah` |
| **Portfolio works** (title, category, image) | `portfolio.items` |
| **Stat numbers** (count up automatically) | `stats` |
| **Footer** description, links, copyright | `footer` |
| **Page `<title>`, meta description, OG image** | `index.html` |

### Images

The site ships with cinematic **SVG placeholders** in `public/images/`. To use
real photos, either:

1. **Overwrite** the file at the same path (keep the name), or
2. Drop a new file (e.g. `public/images/my-photo.jpg`) and update its path in
   `siteContent.ts`.

Every `<img>` already uses `object-cover`, `loading="lazy"` and descriptive
`alt` text, so any aspect ratio crops cleanly.

### Logo

The brand mark is a crisp inline SVG component (`src/components/ui/Logo.tsx`) —
themeable and used in the navbar, hero glow, CTA and footer. A matching
`public/images/logo.svg` is provided for meta/OG use. To use a raster logo,
replace `logo.svg` or swap `<LogoMark />` for `<img src={brand.logo} />`.

### Brand colors

Defined in [`tailwind.config.js`](tailwind.config.js) under `theme.extend.colors`:

- `charcoal` — deep black / charcoal (dark sections)
- `sand` — warm beige / off‑white backgrounds
- `brand.red` — strong red accent (buttons, active, hovers)
- `brand.green` — Saudi heritage dark green (secondary)
- `brand.maroon` — burgundy (CTA / accents)
- `brand.gold` — warm Diriyah‑night glow

---

## ♿ Accessibility & SEO

- Semantic landmarks (`header` / `main` / `footer` / `nav`), skip‑to‑content link.
- Keyboard‑accessible menu with `aria-expanded` / `aria-controls`, `Esc` to close.
- `alt` text on all images, `aria-label`s on icon buttons & social links.
- Scrollspy highlights the active section; respects `prefers-reduced-motion`.
- `<html lang="ar" dir="rtl">`, Open Graph + Twitter tags, Arabic meta description.

---

## 📦 Deploy

```bash
npm run build      # outputs static files to dist/
```

Upload `dist/` to any static host. No environment variables required.
