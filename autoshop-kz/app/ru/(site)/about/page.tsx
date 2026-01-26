import { Container } from '@/components/ui/Container';
import { getDictionary } from '@/lib/i18n';
import { getBrandConfig } from '@/lib/brand';

export default function AboutPage() {
  const dictionary = getDictionary('ru');
  const brand = getBrandConfig();
  
  return (
    <div>
      <div className="bg-muted/30 py-12">
        <Container>
          <h1 className="text-4xl font-bold text-center">{dictionary.nav.about}</h1>
        </Container>
      </div>
      <Container className="py-16">
        <div className="max-w-3xl mx-auto space-y-6 text-lg">
          <p>
            {brand.identity.name} - {dictionary.hero.subtitle}
          </p>
          <p>
            Наша цель - предоставить вам качественный сервис. (Content placeholder for About page).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
             <div className="bg-muted p-6 rounded-lg">
               <h3 className="font-bold text-xl mb-2">{dictionary.benefits.items[0].title}</h3>
               <p className="text-muted-foreground">{dictionary.benefits.items[0].desc}</p>
             </div>
             <div className="bg-muted p-6 rounded-lg">
               <h3 className="font-bold text-xl mb-2">{dictionary.benefits.items[2].title}</h3>
               <p className="text-muted-foreground">{dictionary.benefits.items[2].desc}</p>
             </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
