'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export function LanguageSwitcher({ locale }: { locale: 'kz' | 'ru' }) {
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    const newLocale = locale === 'kz' ? 'ru' : 'kz';
    // If current is /ru/..., remove /ru. If current is /..., add /ru.
    // Logic:
    // /ru/about -> /about
    // /about -> /ru/about
    // / -> /ru
    // /ru -> /

    let newPath = pathname;
    if (locale === 'ru') {
      // Remove /ru prefix
      newPath = pathname.replace(/^\/ru/, '') || '/';
    } else {
      // Add /ru prefix
      // If root '/', make it '/ru'
      if (pathname === '/') {
        newPath = '/ru';
      } else {
        newPath = `/ru${pathname}`;
      }
    }
    
    // Persist selection
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    router.push(newPath);
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage}>
      {locale === 'kz' ? 'RU' : 'KZ'}
    </Button>
  );
}
