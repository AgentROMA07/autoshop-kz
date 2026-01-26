import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { getBrandConfig } from '@/lib/brand';
import { Locale } from '@/lib/i18n';
import { Menu, Phone } from 'lucide-react';
import fs from 'fs';
import path from 'path';

interface HeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
  locale: Locale;
}

export function Header({ dictionary, locale }: HeaderProps) {
  const brand = getBrandConfig();
  const nav = dictionary.nav;
  
  // Read logo SVG
  let logoSvg = '';
  try {
    const logoPath = path.join(process.cwd(), 'brand/assets/logo.svg');
    if (fs.existsSync(logoPath)) {
      logoSvg = fs.readFileSync(logoPath, 'utf-8');
    }
  } catch {
    // Ignore error
  }

  const links = [
    { href: locale === 'ru' ? '/ru' : '/', label: nav.home },
    { href: locale === 'ru' ? '/ru/inventory' : '/inventory', label: nav.cars },
    { href: locale === 'ru' ? '/ru/services' : '/services', label: nav.services },
    { href: locale === 'ru' ? '/ru/about' : '/about', label: nav.about },
    { href: locale === 'ru' ? '/ru/contact' : '/contact', label: nav.contacts },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur-md text-white transition-all">
      <Container className="flex h-20 items-center justify-between">
        <Link href={locale === 'ru' ? '/ru' : '/'} className="flex items-center space-x-2">
           <div className="h-10 flex items-center">
             {logoSvg ? (
                <div 
                  className="h-10 w-auto [&>svg]:h-full [&>svg]:w-auto text-primary fill-current" 
                  dangerouslySetInnerHTML={{ __html: logoSvg }} 
                />
             ) : (
                <span className="font-extrabold text-2xl uppercase tracking-wider text-white">
                  <span className="text-primary">AQYLBAY</span> Auto
                </span>
             )}
           </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-bold uppercase tracking-wide text-neutral-300 transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end mr-4">
             <span className="text-xs text-neutral-400">Свяжитесь с нами</span>
             <a href={`tel:${brand.contact.phone}`} className="font-bold text-lg leading-none hover:text-primary transition-colors">
               {brand.contact.phone}
             </a>
          </div>

          <LanguageSwitcher locale={locale} />
          <Button asChild className="hidden md:inline-flex bg-primary text-black font-bold hover:bg-yellow-400 border-none rounded-xl" size="lg">
            <Link href={`https://wa.me/${brand.contact.whatsapp}`} target="_blank">
               <Phone className="mr-2 h-4 w-4" />
               WhatsApp
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-neutral-800">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </Container>
    </header>
  );
}
