import { Container } from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Car, RefreshCw, Banknote, Percent, FileCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServicesSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}

export function ServicesSection({ dictionary }: ServicesSectionProps) {
  const content = dictionary.services;
  const icons = [Car, RefreshCw, Banknote, Percent, FileCheck];

  return (
    <section className="py-24 bg-[#0B0B0D]">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">{content.title}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items.map((item: { title: string; desc: string }, index: number) => {
             const Icon = icons[index % icons.length];

             return (
              <Card 
                key={index} 
                className="relative overflow-hidden transition-all duration-300 border-white/10 bg-[#16161A] text-white hover:border-primary/50"
              >
                {/* Accent Glow for regular cards */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />

                <CardHeader className="relative z-10">
                  <div className="mb-4 w-12 h-12 rounded-lg flex items-center justify-center bg-white/5 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-sm text-neutral-400">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
             );
          })}
        </div>
      </Container>
    </section>
  );
}
