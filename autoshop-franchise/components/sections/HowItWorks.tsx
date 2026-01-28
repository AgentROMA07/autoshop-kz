import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { getBrandConfig } from '@/lib/brand';

interface HowItWorksProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}

export function HowItWorks({ dictionary }: HowItWorksProps) {
  const content = dictionary.how_it_works;
  const brand = getBrandConfig();

  return (
    <section className="py-24 bg-[#0B0B0D] relative overflow-hidden">
      <Container>
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">{content.title}</h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
            {/* Track Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-white/10" />
            {/* Track Line (Mobile) */}
            <div className="md:hidden absolute top-0 bottom-0 left-8 w-0.5 bg-white/10" />

            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {content.steps.map((step: any, index: number) => (
                <div key={index} className="relative flex flex-col md:items-center md:text-center pl-20 md:pl-0">
                    {/* Number */}
                    <div className="absolute left-0 top-0 md:relative md:left-auto md:top-auto w-16 h-16 md:w-24 md:h-24 flex items-center justify-center md:mb-6">
                         <span className="text-6xl md:text-8xl font-black text-white/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none">
                            0{index + 1}
                         </span>
                         <div className="w-4 h-4 bg-primary rounded-full relative z-10 shadow-[0_0_15px_rgba(255,138,0,0.5)]" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 relative z-10">{step.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed relative z-10 max-w-xs mx-auto">{step.desc}</p>
                </div>
            ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-[#16161A] border border-white/10 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             
             <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 relative z-10">
                {content.cta.title}
             </h3>
             
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <Button asChild size="lg" className="h-12 px-8 bg-primary text-black hover:bg-[#FFB24A] font-bold">
                    <Link href={`https://wa.me/${brand.contact.whatsapp}`} target="_blank">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        {content.cta.whatsapp}
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 border-white/10 bg-transparent text-white hover:bg-white/5 font-bold">
                    <Link href="/cars">
                        {content.cta.catalog}
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </Button>
             </div>
        </div>
      </Container>
    </section>
  );
}
