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
    <footer className="border-t bg-muted/40">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{brand.identity.name}</h3>
            <p className="text-sm text-muted-foreground">
              {dictionary.hero.subtitle}
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">{nav.contacts}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>{brand.contact.address}</li>
              <li>{brand.contact.phone}</li>
              <li>{brand.contact.email}</li>
              <li>{brand.contact.workingHours}</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">{nav.services}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>{dictionary.services.items[0].title}</li>
              <li>{dictionary.services.items[1].title}</li>
              <li>{dictionary.services.items[2].title}</li>
              <li>{dictionary.services.items[3].title}</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Links</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href={locale === 'ru' ? '/ru/inventory' : '/inventory'}>{nav.cars}</Link></li>
              <li><Link href={locale === 'ru' ? '/ru/about' : '/about'}>{nav.about}</Link></li>
              <li><Link href={locale === 'ru' ? '/ru/contact' : '/contact'}>{nav.contacts}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {brand.identity.name}. {t.rights}</p>
          <Link href="/admin" className="text-xs opacity-30 hover:opacity-100 transition-opacity flex items-center gap-1">
            Админ
          </Link>
        </div>
      </Container>
    </footer>
  );
}
