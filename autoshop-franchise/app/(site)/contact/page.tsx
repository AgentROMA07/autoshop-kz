import { Container } from '@/components/ui/Container';
import { ContactSection } from '@/components/sections/ContactSection';
import { getDictionary } from '@/lib/i18n';

export default function ContactPage() {
  const dictionary = getDictionary('kz');
  return (
    <div>
      <div className="bg-muted/30 py-12">
        <Container>
          <h1 className="text-4xl font-bold text-center">{dictionary.contact.title}</h1>
        </Container>
      </div>
      <ContactSection dictionary={dictionary} withTitle={false} />
    </div>
  );
}
