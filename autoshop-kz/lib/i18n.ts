import kz from '@/brand/content/kz.json';
import ru from '@/brand/content/ru.json';

export type Locale = 'kz' | 'ru';

export const i18n = {
  defaultLocale: 'kz',
  locales: ['kz', 'ru'],
} as const;

export function getDictionary(locale: Locale) {
  return locale === 'ru' ? ru : kz;
}
