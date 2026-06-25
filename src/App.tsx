import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { ServicesSection } from '@/components/ServicesSection'
import { DiriyahSection } from '@/components/DiriyahSection'
import { PortfolioSection } from '@/components/PortfolioSection'
import { ProcessSection } from '@/components/ProcessSection'
import { StatsSection } from '@/components/StatsSection'
import { CTASection } from '@/components/CTASection'
import { Footer } from '@/components/Footer'

export default function App() {
  return (
    <>
      {/* Accessibility: skip straight to content */}
      <a
        href="#home"
        className="sr-only z-[60] rounded-full bg-brand-red px-5 py-2 text-sm font-bold text-sand-50 focus:not-sr-only focus:fixed focus:right-4 focus:top-4"
      >
        تخطّ إلى المحتوى
      </a>

      <Header />

      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <DiriyahSection />
        <PortfolioSection />
        <ProcessSection />
        <StatsSection />
        <CTASection />
      </main>

      <Footer />
    </>
  )
}
