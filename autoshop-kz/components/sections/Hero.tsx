import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Locale } from '@/lib/i18n';

interface HeroProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
  locale: Locale;
}

export function Hero({ dictionary, locale }: HeroProps) {
  const content = dictionary.hero;
  
  const inventoryPath = locale === 'ru' ? '/ru/inventory' : '/inventory';
  const contactPath = locale === 'ru' ? '/ru/contact' : '/contact';

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
         <Image 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Background" 
            fill
            className="object-cover opacity-60 blur-sm scale-105"
            priority
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-80" />
      </div>
      
      <Container className="relative z-20 text-center space-y-10 max-w-6xl">
        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase animate-in fade-in slide-in-from-bottom-8 duration-1000 flex flex-col gap-2 drop-shadow-2xl">
          <span className="text-white">{content.title.split(' ')[0]}</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-primary">{content.title.split(' ').slice(1).join(' ')}</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-neutral-200 max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 drop-shadow-lg">
          {content.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
          <Button asChild size="lg" className="text-xl font-bold px-12 h-16 bg-primary text-black hover:bg-yellow-300 border-none shadow-[0_0_40px_rgba(255,192,0,0.4)] hover:shadow-[0_0_60px_rgba(255,192,0,0.6)] hover:scale-105 transition-all duration-300 rounded-full">
            <Link href={inventoryPath}>{content.cta_browse}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-xl font-bold px-12 h-16 bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 rounded-full">
            <Link href={contactPath}>{content.cta_sell}</Link>
          </Button>
        </div>
      </Container>
      
      {/* Bottom Gold Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-primary to-black shadow-[0_-5px_20px_rgba(255,192,0,0.5)]" />
    </section>
  );
}
