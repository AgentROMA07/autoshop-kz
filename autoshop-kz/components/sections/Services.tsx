import { Container } from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Car, BadgeDollarSign, RefreshCw, Shield } from 'lucide-react';

interface ServicesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}

const icons = [Car, BadgeDollarSign, RefreshCw, Shield];

export function Services({ dictionary }: ServicesProps) {
  const t = dictionary.services;

  return (
    <section className="py-16 bg-muted/30">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-12">{t.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {t.items.map((item: any, index: number) => {
             const Icon = icons[index % icons.length];
             return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{item.desc}</CardDescription>
                </CardContent>
              </Card>
             );
          })}
        </div>
      </Container>
    </section>
  );
}
