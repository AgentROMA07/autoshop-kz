import { Container } from '@/components/ui/Container';
import { ShieldCheck, Banknote, FileCheck, RefreshCw, Percent, Headphones } from 'lucide-react';

interface BenefitsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}

const icons = [ShieldCheck, Banknote, RefreshCw, Percent, FileCheck, Headphones];

export function Benefits({ dictionary }: BenefitsProps) {
  const t = dictionary.benefits;

  return (
    <section className="py-24 bg-[#0B0B0D] relative overflow-hidden">
      <Container>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">{t.title}</h2>
          <p className="text-neutral-400 text-lg">{t.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((item: { title: string; desc: string }, index: number) => {
            const Icon = icons[index % icons.length];
            return (
              <div 
                key={index} 
                className="group p-8 bg-[#111114] rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300"
              >
                <div className="mb-6 inline-block p-3 rounded-lg bg-white/5 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-lg font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
