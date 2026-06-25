/**
 * ============================================================================
 *  وهج برودكشن — Site Content (single source of truth)
 * ============================================================================
 *  Edit everything here. No copy is hard-coded inside components.
 *
 *  WHAT TO REPLACE:
 *   • brand.name*          → your real brand name (AR / EN)
 *   • contact.*            → real email / phone / location / WhatsApp
 *   • socials[].href       → real Instagram / TikTok / X / LinkedIn links
 *   • *.image paths        → drop real photos in /public/images and update here
 *
 *  IMAGES: placeholder cinematic SVGs live in /public/images. To use a real
 *  photo, just overwrite the file (keep the name) OR point the path below to a
 *  new /images/your-photo.jpg — every <img> already uses object-cover + lazy.
 * ============================================================================
 */

import type { IconName } from '@/components/ui/Icon'

/* -------------------------------------------------------------------------- */
/*  Brand                                                                     */
/* -------------------------------------------------------------------------- */
export const brand = {
  nameAr: 'وهج برودكشن',
  nameEn: 'Wahj Production',
  /** short English support label shown under the logo */
  kicker: 'Saudi Creative Studio',
  /** Replace with your real logo at /public/images/logo.svg (or .png) */
  logo: '/images/logo.svg',
  year: 2026,
} as const

/* -------------------------------------------------------------------------- */
/*  Contact + Socials  (placeholders — replace with real values)              */
/* -------------------------------------------------------------------------- */
export const contact = {
  email: 'hello@wahj.sa',
  phone: '+966 50 000 0000',
  /** used for the WhatsApp CTA — international format, no “+” or spaces */
  whatsapp: '966500000000',
  locationAr: 'الرياض، المملكة العربية السعودية',
  locationEn: 'Riyadh, Saudi Arabia',
} as const

export interface SocialLink {
  id: 'instagram' | 'tiktok' | 'x' | 'linkedin'
  label: string
  href: string
}

export const socials: SocialLink[] = [
  { id: 'instagram', label: 'Instagram', href: '#' },
  { id: 'tiktok', label: 'TikTok', href: '#' },
  { id: 'x', label: 'X', href: '#' },
  { id: 'linkedin', label: 'LinkedIn', href: '#' },
]

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */
export interface NavItem {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'الرئيسية', href: '#home' },
  { label: 'من نحن', href: '#about' },
  { label: 'خدماتنا', href: '#services' },
  { label: 'أعمالنا', href: '#works' },
  { label: 'الدرعية', href: '#diriyah' },
  { label: 'تواصل معنا', href: '#contact' },
]

export const navCta = { label: 'ابدأ مشروعك', href: '#contact' } as const

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */
export interface FloatingCard {
  icon: IconName
  titleAr: string
  titleEn: string
}

export const hero = {
  eyebrow: 'وكالة إبداعية سعودية',
  headline: 'نصنع حضورك الرقمي بأسلوب سعودي فاخر',
  subheadline:
    'وكالة إبداعية متخصصة في صناعة المحتوى، إدارة الحسابات، تغطية الفعاليات، وإنتاج الفيديوهات التي تترك أثرًا.',
  primaryCta: { label: 'شاهد أعمالنا', href: '#works' },
  secondaryCta: { label: 'تواصل معنا', href: '#contact' },
  floatingCards: [
    { icon: 'pen', titleAr: 'صناعة المحتوى', titleEn: 'Content Creation' },
    { icon: 'camera', titleAr: 'تغطية الفعاليات', titleEn: 'Event Coverage' },
    { icon: 'share', titleAr: 'إدارة الحسابات', titleEn: 'Social Media' },
    { icon: 'film', titleAr: 'إنتاج الفيديو', titleEn: 'Video Production' },
  ] satisfies FloatingCard[],
} as const

/* -------------------------------------------------------------------------- */
/*  About                                                                     */
/* -------------------------------------------------------------------------- */
export interface ValueCard {
  icon: IconName
  title: string
  desc: string
}

export const about = {
  eyebrow: 'من نحن',
  title: 'نحوّل اللحظات إلى قصص تُشاهد',
  body: 'نؤمن أن المحتوى القوي لا يعتمد فقط على الصورة الجميلة، بل على الفكرة، الإحساس، والتوقيت. نعمل مع الجهات، الفعاليات، والعلامات التجارية لصناعة محتوى يعكس هويتها ويصل لجمهورها بأسلوب احترافي.',
  values: [
    {
      icon: 'eye',
      title: 'رؤية إبداعية',
      desc: 'نبدأ من الفكرة قبل الكاميرا، ونبني تصورًا بصريًا يخدم رسالتك ويميّزك عن غيرك.',
    },
    {
      icon: 'gem',
      title: 'تنفيذ احترافي',
      desc: 'فريق وأدوات بمعايير عالية، من التصوير حتى المونتاج النهائي، بجودة تليق بهويتك.',
    },
    {
      icon: 'trending',
      title: 'محتوى قابل للانتشار',
      desc: 'نصمّم المحتوى ليُشاهد ويُشارك، بما يناسب خوارزميات المنصات وذائقة جمهورك.',
    },
  ] satisfies ValueCard[],
} as const

/* -------------------------------------------------------------------------- */
/*  Services                                                                  */
/* -------------------------------------------------------------------------- */
export interface ServiceItem {
  icon: IconName
  title: string
  desc: string
}

export const services = {
  eyebrow: 'ماذا نقدّم',
  title: 'خدماتنا',
  subtitle: 'حلول محتوى متكاملة من الفكرة حتى النشر، بمعايير تليق بالجهات والعلامات الرائدة.',
  items: [
    {
      icon: 'pen',
      title: 'صناعة المحتوى',
      desc: 'تصوير، تحرير، كتابة أفكار، وإنتاج محتوى متكامل للمنصات الرقمية.',
    },
    {
      icon: 'share',
      title: 'إدارة حسابات التواصل',
      desc: 'تخطيط محتوى، جدولة، تحسين الظهور، وإدارة الهوية الرقمية.',
    },
    {
      icon: 'camera',
      title: 'تغطية الفعاليات',
      desc: 'تغطية احترافية للفعاليات، المؤتمرات، الأمسيات، والمعارض.',
    },
    {
      icon: 'clapper',
      title: 'إنتاج الفيديو والريلز',
      desc: 'فيديوهات قصيرة، إعلانات، Reels، ومحتوى سريع الانتشار.',
    },
    {
      icon: 'mic',
      title: 'المقابلات والتوثيق',
      desc: 'تصوير مقابلات، قصص ضيوف، وتوثيق لحظات مهمة بأسلوب سينمائي.',
    },
    {
      icon: 'megaphone',
      title: 'الحملات الإعلانية',
      desc: 'أفكار إبداعية وتنفيذ بصري يدعم الحملات التسويقية.',
    },
  ] satisfies ServiceItem[],
} as const

/* -------------------------------------------------------------------------- */
/*  Diriyah Showcase                                                          */
/* -------------------------------------------------------------------------- */
export interface DiriyahCard {
  titleAr: string
  titleEn: string
  image: string
}

export const diriyah = {
  label: 'Featured Cultural Coverage',
  eyebrow: 'من قلب الدرعية',
  title: 'أعمالنا في الدرعية',
  subtitle: 'من قلب الدرعية، وثّقنا لحظات تجمع بين الثقافة، المكان، والتجربة.',
  featured: {
    titleAr: 'موسم الدرعية',
    titleEn: 'Diriyah Season — Cultural Coverage',
    desc: 'تغطية سينمائية لليالي الدرعية ومواسمها، تجمع بين دفء الإضاءة الليلية وروح العمارة النجدية.',
    image: '/images/diriyah-hero.svg',
  },
  cards: [
    { titleAr: 'موسم الدرعية', titleEn: 'Diriyah Season', image: '/images/diriyah-01.svg' },
    { titleAr: 'تغطية ليالي الدرعية', titleEn: 'Diriyah Nights', image: '/images/diriyah-02.svg' },
    { titleAr: 'موسم الدرعية — سوق الموسم', titleEn: 'Season Souq', image: '/images/diriyah-03.svg' },
    { titleAr: 'ليالي الدرعية — مطعم 963', titleEn: 'Restaurant 963', image: '/images/diriyah-04.svg' },
    { titleAr: 'تغطية مسلسل موسم الدرعية', titleEn: 'Season Series', image: '/images/diriyah-05.svg' },
    { titleAr: 'حفل صدى الوادي الغنائي', titleEn: 'Sada Al-Wadi Concert', image: '/images/diriyah-06.svg' },
    { titleAr: 'ليالي الدرعية — مطعم bibi', titleEn: 'bibi Restaurant', image: '/images/diriyah-07.svg' },
    { titleAr: 'سوق الموسم — الجزء الثاني', titleEn: 'Season Souq 2', image: '/images/diriyah-08.svg' },
  ] satisfies DiriyahCard[],
} as const

/* -------------------------------------------------------------------------- */
/*  Works / Portfolio                                                         */
/* -------------------------------------------------------------------------- */
export interface PortfolioItem {
  titleAr: string
  titleEn: string
  category: string
  image: string
}

export const portfolio = {
  eyebrow: 'أعمال مختارة',
  title: 'أعمال مختارة',
  subtitle: 'نماذج من تغطياتنا للجهات الثقافية والحكومية والعلامات التجارية.',
  cardCta: 'عرض التفاصيل',
  items: [
    {
      titleAr: 'الدرعية',
      titleEn: 'Diriyah',
      category: 'Event Coverage / Cultural Content',
      image: '/images/portfolio-diriyah.svg',
    },
    {
      titleAr: 'أمسيات شعرية',
      titleEn: 'Poetry Evenings',
      category: 'Event Coverage / Cultural Documentation',
      image: '/images/portfolio-poetry.svg',
    },
    {
      titleAr: 'تدشين دليل الثقافة والفنون لوزارة الثقافة',
      titleEn: 'Launch of the Culture & Arts Guide — Ministry of Culture',
      category: 'Government / Cultural Launch Coverage',
      image: '/images/portfolio-culture-guide.svg',
    },
    {
      titleAr: 'ريلز فيديوهات إعلانية — جهاز استشفاء',
      titleEn: 'Promotional Video Reels — Recovery Device',
      category: 'Product Reels / Promotional Content',
      image: '/images/portfolio-recovery-device.svg',
    },
    {
      titleAr: 'معايدة وزارة الموارد البشرية',
      titleEn: 'Ministry of Human Resources Greeting',
      category: 'Government Greeting / Social Content',
      image: '/images/portfolio-hr-greeting.svg',
    },
    {
      titleAr: 'مقابلات معرض 20/20',
      titleEn: '20/20 Exhibition Interviews',
      category: 'Interviews / Exhibition Coverage',
      image: '/images/portfolio-2020-interviews.svg',
    },
  ] satisfies PortfolioItem[],
} as const

/* -------------------------------------------------------------------------- */
/*  Process                                                                   */
/* -------------------------------------------------------------------------- */
export interface ProcessStep {
  icon: IconName
  title: string
  desc: string
}

export const process = {
  eyebrow: 'منهجية العمل',
  title: 'كيف نعمل؟',
  subtitle: 'أربع مراحل واضحة، من فهم الهدف حتى تسليم محتوى جاهز للنشر.',
  steps: [
    {
      icon: 'target',
      title: 'نفهم الهدف',
      desc: 'نبدأ بفهم الرسالة، الجمهور، وطبيعة المناسبة أو العلامة.',
    },
    {
      icon: 'lightbulb',
      title: 'نبني الفكرة',
      desc: 'نحوّل الهدف إلى فكرة محتوى واضحة وقابلة للتنفيذ.',
    },
    {
      icon: 'clapper',
      title: 'ننتج باحتراف',
      desc: 'تصوير، إخراج، مونتاج، وتنسيق بصري بجودة عالية.',
    },
    {
      icon: 'send',
      title: 'نسلّم محتوى جاهز للنشر',
      desc: 'مخرجات منظمة ومناسبة للمنصات الرقمية المختلفة.',
    },
  ] satisfies ProcessStep[],
} as const

/* -------------------------------------------------------------------------- */
/*  Stats  (edit numbers freely — numeric values count up on scroll)          */
/* -------------------------------------------------------------------------- */
export interface StatItem {
  icon: IconName
  /** numeric value to count up to; omit for a text-only stat */
  value?: number
  prefix?: string
  suffix?: string
  /** used instead of a number, e.g. “كل المنصات” */
  text?: string
  label: string
}

export const stats: StatItem[] = [
  { icon: 'layers', prefix: '+', value: 50, label: 'محتوى تم إنتاجه' },
  { icon: 'calendar', prefix: '+', value: 10, label: 'فعاليات تم تغطيتها' },
  { icon: 'aperture', value: 100, suffix: '%', label: 'تركيز على التفاصيل' },
  { icon: 'monitor', text: 'كل المنصات', label: 'محتوى مناسب للنشر الرقمي' },
]

/* -------------------------------------------------------------------------- */
/*  Final CTA                                                                 */
/* -------------------------------------------------------------------------- */
export const cta = {
  eyebrow: 'لنبدأ',
  title: 'جاهز نصنع حضورك القادم؟',
  body: 'خلّنا نحوّل فكرتك أو فعاليتك إلى محتوى يليق بهويتك.',
  primaryCta: { label: 'تواصل معنا الآن', href: '#contact' },
  secondaryCta: { label: 'استعرض الأعمال', href: '#works' },
} as const

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */
export const footer = {
  description:
    'وكالة إبداعية سعودية متخصصة في صناعة المحتوى وتغطية الفعاليات وإنتاج الفيديو بأسلوب سينمائي مستوحى من الدرعية والتراث النجدي.',
  links: [
    { label: 'الرئيسية', href: '#home' },
    { label: 'خدماتنا', href: '#services' },
    { label: 'أعمالنا', href: '#works' },
    { label: 'تواصل معنا', href: '#contact' },
  ] satisfies NavItem[],
  copyright: `© ${brand.year} ${brand.nameAr}. جميع الحقوق محفوظة.`,
} as const
