import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Locale } from '@/lib/i18n';
import { Car, CreditCard, RefreshCcw, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';

interface HeroProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
  locale: Locale;
}

export function Hero({ dictionary, locale }: HeroProps) {
  const content = dictionary.hero;
  
  const inventoryPath = locale === 'ru' ? '/ru/inventory' : '/inventory';
  // const contactPath = locale === 'ru' ? '/ru/contact' : '/contact'; // WhatsApp button will likely be an external link or modal, but for now specific path or just #
  const whatsappLink = "https://wa.me/77771234567"; // Placeholder, should ideally come from config

  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-background overflow-hidden pt-20 pb-12 lg:pt-0">
      {/* Background Glow Effect (Left) */}
      <div className="absolute left-[-20%] top-[20%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
          
          {/* Left Column: Text + CTA */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-heading font-extrabold leading-[1.1] tracking-tight text-white">
                {content.title}
              </h1>
              
              <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed max-w-xl border-l-2 border-primary/30 pl-6">
                {content.subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button asChild size="lg" className="h-14 px-8 text-base font-bold rounded-xl shadow-[0_0_20px_rgba(255,138,0,0.25)]">
                <Link href={inventoryPath}>
                  {content.cta_browse}
                </Link>
              </Button>
              
              <Button asChild variant="secondary" size="lg" className="h-14 px-8 text-base font-bold rounded-xl border border-white/10 bg-transparent text-white hover:bg-white/5">
                <Link href={whatsappLink} target="_blank">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {content.cta_whatsapp}
                </Link>
              </Button>
            </div>

            {/* Benefits Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/5">
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-full bg-[#16161A] flex items-center justify-center text-primary border border-white/5">
                  <Car className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-neutral-300 leading-tight">{content.benefits.offers}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-full bg-[#16161A] flex items-center justify-center text-primary border border-white/5">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-neutral-300 leading-tight">{content.benefits.credit}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-full bg-[#16161A] flex items-center justify-center text-primary border border-white/5">
                  <RefreshCcw className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-neutral-300 leading-tight">{content.benefits.tradein}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-full bg-[#16161A] flex items-center justify-center text-primary border border-white/5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-neutral-300 leading-tight">{content.benefits.check}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Card */}
          <div className="relative hidden lg:block perspective-1000">
             {/* Decorative Elements behind card */}
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl opacity-30 transform translate-x-10 translate-y-10" />
             
             <div className="relative bg-[#16161A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-500 group">
                {/* Image Area */}
                <div className="relative h-[400px] w-full bg-neutral-900">
                  <Image 
                    src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop"
                    alt="Premium Car"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16161A] via-transparent to-transparent opacity-90" />
                  
                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-6 left-6 z-10">
                    <p className="text-sm text-neutral-400 font-medium uppercase tracking-wider mb-1">Toyota Camry 75</p>
                    <p className="text-3xl font-bold text-white tabular-nums">14 500 000 ₸</p>
                  </div>
                </div>

                {/* Card Footer Info */}
                <div className="p-6 flex items-center justify-between border-t border-white/5 bg-[#16161A]/50 backdrop-blur-sm">
                  <div className="flex items-center gap-4 text-sm font-medium text-neutral-400">
                    <span>2021</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-600" />
                    <span>45 000 км</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-600" />
                    <span>2.5 л</span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="rounded-full h-10 px-6 border-white/10 hover:bg-white hover:text-black group-hover:border-white/20">
                    {content.card.view}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
             </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
