import { Container } from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

interface TestimonialsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}

export function Testimonials({ dictionary }: TestimonialsProps) {
  const content = dictionary.testimonials;
  
  const testimonials = [
    { 
        name: 'Azamat Kaliev', 
        role: 'Entrepreneur', 
        text: 'I was looking for a Toyota Camry for a long time. Found the perfect condition here. The staff is very professional!', 
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    { 
        name: 'Elena Smirnova', 
        role: 'Accountant', 
        text: 'Sold my car through Trade-in. Got a fair price and left with a new crossover the same day. Highly recommended!', 
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
    },
    { 
        name: 'Dmitry Volkov', 
        role: 'Driver', 
        text: 'Transparent history and real mileage. I checked everything myself - no issues. Very trustworthy dealership.', 
        rating: 5,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    },
  ];

  return (
    <section className="py-24 bg-neutral-50" id="reviews">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-black uppercase tracking-tight mb-4">{content.title}</h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-white relative pt-12 overflow-visible">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-neutral-200 relative">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                </div>
              </div>
              
              <CardContent className="px-8 pb-8 pt-4 text-center">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`} />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-primary/20 mx-auto mb-4" />
                
                <p className="text-neutral-600 mb-6 italic leading-relaxed">&quot;{item.text}&quot;</p>
                
                <div className="border-t border-neutral-100 pt-6">
                  <div className="font-bold text-lg text-neutral-900">{item.name}</div>
                  <div className="text-sm text-primary font-medium uppercase tracking-wide">{item.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
