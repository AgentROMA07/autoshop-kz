import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getBrandConfig } from '@/lib/brand';
import { Locale } from '@/lib/i18n';

interface FooterProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
  locale: Locale;
}

export function Footer({ dictionary, locale }: FooterProps) {
  const brand = getBrandConfig();
  const t = dictionary.footer;
  const nav = dictionary.nav;

  return (
    <footer className="border-t border-white/10 bg-[#0B0B0D] pt-20 pb-10">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-heading font-bold text-white">{brand.identity.name}</h3>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              {dictionary.hero.subtitle}
            </p>
          </div>
          
          <div>
            <h4 className="mb-6 text-sm font-bold text-white uppercase tracking-wider">{nav.contacts}</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li>{brand.contact.address}</li>
              <li>{brand.contact.phone}</li>
              <li>{brand.contact.email}</li>
              <li>{brand.contact.workingHours}</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold text-white uppercase tracking-wider">{nav.services}</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li>{dictionary.services.items[0].title}</li>
              <li>{dictionary.services.items[1].title}</li>
              <li>{dictionary.services.items[2].title}</li>
              <li>{dictionary.services.items[3].title}</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold text-white uppercase tracking-wider">Menu</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li><Link href={locale === 'ru' ? '/ru/inventory' : '/inventory'} className="hover:text-primary transition-colors">{nav.cars}</Link></li>
              <li><Link href={locale === 'ru' ? '/ru/about' : '/about'} className="hover:text-primary transition-colors">{nav.about}</Link></li>
              <li><Link href={locale === 'ru' ? '/ru/contact' : '/contact'} className="hover:text-primary transition-colors">{nav.contacts}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} {brand.identity.name}. {t.rights}</p>
          <Link href="/admin" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
            Admin Panel
          </Link>
        </div>
      </Container>
    </footer>
  );
}
