import { Container } from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Car, Banknote, Repeat, Shield } from 'lucide-react';

interface ServicesSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}

export function ServicesSection({ dictionary }: ServicesSectionProps) {
  const content = dictionary.services;
  const icons = [Banknote, Car, Repeat, Shield];

  return (
    <section className="py-20 bg-background">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-12">{content.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.items.map((item: { title: string; desc: string }, index: number) => {
             const Icon = icons[index % icons.length];
             return (
              <Card key={index} className="hover:border-primary/50 transition-colors duration-300">
                <CardHeader>
                  <Icon className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
             );
          })}
        </div>
      </Container>
    </section>
  );
}
