import { Container } from '@/components/ui/Container';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { getDictionary } from '@/lib/i18n';

export default function ServicesPage() {
  const dictionary = getDictionary('ru');
  return (
    <div>
      <div className="bg-muted/30 py-12">
        <Container>
          <h1 className="text-4xl font-bold text-center">{dictionary.nav.services}</h1>
        </Container>
      </div>
      <ServicesSection dictionary={dictionary} />
    </div>
  );
}
