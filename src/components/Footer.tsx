import { Logo } from '@/components/ui/Logo'
import { Icon } from '@/components/ui/Icon'
import { SocialIcon } from '@/components/ui/SocialIcons'
import { NajdiPattern } from '@/components/ui/NajdiPattern'
import { brand, contact, footer, socials } from '@/data/siteContent'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal-950 text-sand-200/80">
      <NajdiPattern className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full text-brand-gold/[0.05]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="container-wahj relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1.1fr]">
          {/* Brand */}
          <div className="flex flex-col items-start gap-5">
            <Logo variant="light" />
            <p className="max-w-sm text-pretty leading-relaxed text-sand-200/70">
              {footer.description}
            </p>
            <ul className="flex items-center gap-3" aria-label="حسابات التواصل الاجتماعي">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-sand-50/15 text-sand-200/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-red hover:bg-brand-red hover:text-sand-50"
                  >
                    <SocialIcon id={social.id} className="h-[1.05rem] w-[1.05rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-label="روابط الموقع">
            <h2 className="mb-4 font-display text-base font-bold text-sand-50">روابط سريعة</h2>
            <ul className="flex flex-col gap-3">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sand-200/75 transition-colors hover:text-brand-red"
                  >
                    <span className="h-1 w-1 rounded-full bg-brand-gold/70" aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="mb-4 font-display text-base font-bold text-sand-50">تواصل معنا</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-sand-50"
                >
                  <Icon name="whatsapp" className="h-4 w-4 text-brand-gold-light" />
                  <span dir="ltr">{contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-sand-50"
                >
                  <Icon name="mail" className="h-4 w-4 text-brand-gold-light" />
                  <span dir="ltr">{contact.email}</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5">
                <Icon name="pin" className="h-4 w-4 text-brand-gold-light" />
                {contact.locationAr}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-sand-50/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sand-200/60">{footer.copyright}</p>
          <p className="text-sand-200/50">
            صُنع بشغف في المملكة العربية السعودية
            <span className="mx-2 text-brand-gold/60">•</span>
            <span dir="ltr" className="uppercase tracking-[0.15em]">
              {brand.nameEn}
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
