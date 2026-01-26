import { Container } from '@/components/ui/Container';
import { ShieldCheck, Banknote, FileCheck, Key, Star } from 'lucide-react';

interface BenefitsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}

const icons = [ShieldCheck, Banknote, FileCheck, Key];

export function Benefits({ dictionary }: BenefitsProps) {
  const t = dictionary.benefits;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-100 via-transparent to-transparent opacity-50" />
      
      <Container className="relative">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center p-2 bg-primary/5 rounded-full mb-4">
            <Star className="w-5 h-5 text-primary fill-current" />
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">{t.title}</h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.items.map((item: { title: string; desc: string }, index: number) => {
            const Icon = icons[index % icons.length];
            return (
              <div 
                key={index} 
                className="group relative p-8 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="h-16 w-16 rounded-2xl bg-neutral-50 group-hover:bg-primary/10 flex items-center justify-center mb-6 text-neutral-900 group-hover:text-primary transition-colors duration-300 mx-auto">
                  <Icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-center">{item.title}</h3>
                <p className="text-neutral-500 text-center leading-relaxed">{item.desc}</p>
                
                <div className="mt-6 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="h-1 w-8 bg-primary rounded-full" />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
