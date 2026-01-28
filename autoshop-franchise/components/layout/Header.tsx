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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#111114]/65 backdrop-blur-md text-white transition-all">
      <Container className="flex h-20 items-center justify-between">
        <Link href={locale === 'ru' ? '/ru' : '/'} className="flex items-center space-x-3 group">
           <div className="flex flex-col">
              <span className="font-heading font-extrabold text-2xl tracking-wide leading-none group-hover:text-primary transition-colors">
                RM
              </span>
           </div>
           <div className="h-8 w-px bg-white/20 mx-2"></div>
           <span className="font-medium text-sm text-white/80 uppercase tracking-widest group-hover:text-white transition-colors">
             Royal Motors<br/>Shymkent
           </span>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="relative text-sm font-semibold uppercase tracking-wide text-neutral-400 transition-colors hover:text-white group py-2">
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden xl:flex flex-col items-end mr-2">
             <a href={`tel:${brand.contact.phone}`} className="font-heading font-bold text-lg leading-none text-white hover:text-primary transition-colors">
               {brand.contact.phone}
             </a>
             <span className="text-[10px] text-primary uppercase tracking-wider mt-1">
               10:00 - 20:00
             </span>
          </div>

          <LanguageSwitcher locale={locale} />
          
          <Button asChild className="hidden md:inline-flex bg-transparent border border-white/20 text-white font-medium hover:bg-white/10 rounded-full h-11 px-6 transition-all" size="default">
            <Link href={`https://wa.me/${brand.contact.whatsapp}`} target="_blank">
               <Phone className="mr-2 h-4 w-4" />
               WhatsApp
            </Link>
          </Button>
          
          <Button className="hidden md:inline-flex bg-primary text-black font-bold hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(255,138,0,0.4)] rounded-full h-11 px-6 transition-all" size="default">
             <Link href={`tel:${brand.contact.phone}`}>
               {locale === 'ru' ? 'Позвонить' : 'Қоңырау шалу'}
             </Link>
          </Button>

          <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </Container>
    </header>
  );
}
