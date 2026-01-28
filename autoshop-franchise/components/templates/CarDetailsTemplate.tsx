"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Car, getAllCars } from '@/lib/cars';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { getBrandConfig } from '@/brand/brand.config';
import { 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings, 
  CheckCircle2, 
  Phone, 
  ArrowLeft,
  Info,
  ShieldCheck,
  Car as CarIcon
} from 'lucide-react';

interface CarDetailsTemplateProps {
  car: Car;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: Record<string, any>;
  locale: 'kz' | 'ru';
  similarCars?: Car[];
}

export function CarDetailsTemplate({ car, dictionary, locale, similarCars: propSimilarCars }: CarDetailsTemplateProps) {
  const brand = getBrandConfig();
  const t = dictionary.car_details;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'kk-KZ', { 
      style: 'currency',
      currency: 'KZT',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const similarCars = propSimilarCars || getAllCars()
    .filter(c => c.id !== car.id && c.bodyType === car.bodyType)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Breadcrumb / Back Link */}
      <div className="bg-[#111114] border-b border-white/10 py-4">
        <Container>
          <Link 
            href={locale === 'ru' ? '/ru/inventory' : '/inventory'}
            className="inline-flex items-center text-sm font-medium text-neutral-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.back_to_catalog}
          </Link>
        </Container>
      </div>

      <Container className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Gallery & Description */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-[#111114] rounded-2xl p-4 border border-white/10">
              <ImageGallery images={car.images} alt={`${car.make} ${car.model}`} />
            </div>

            {/* Description */}
            <Card className="border-white/10 bg-[#111114]">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
                  <Info className="h-6 w-6 text-primary" />
                  {t.description}
                </h3>
                <p className="text-lg leading-relaxed text-neutral-300">
                  {car.description[locale]}
                </p>
              </CardContent>
            </Card>

            {/* Features / Options */}
            <Card className="border-white/10 bg-[#111114]">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  {t.features}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {car.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="font-medium text-neutral-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Specs Table */}
            <Card className="border-white/10 bg-[#111114]">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
                  <Settings className="h-6 w-6 text-primary" />
                  {t.specs}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <SpecRow label={t.year} value={car.year} icon={Calendar} />
                  <SpecRow label={t.mileage} value={`${car.mileage.toLocaleString()} km`} icon={Gauge} />
                  <SpecRow label={t.body} value={car.bodyType} icon={CarIcon} />
                  <SpecRow label={t.fuel} value={car.fuelType} icon={Fuel} />
                  <SpecRow label={t.transmission} value={car.transmission} icon={Settings} />
                  <SpecRow label={t.drive} value={car.driveType} icon={Settings} />
                  <SpecRow label={t.engine} value={`${car.engineVolume}L / ${car.power} HP`} icon={Settings} />
                  <SpecRow label={t.color} value={car.color} icon={Info} />
                  {car.vin && <SpecRow label={t.vin} value={car.vin} icon={ShieldCheck} />}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Sticky Sidebar with Price & Actions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              <Card className="border-none shadow-lg overflow-hidden relative bg-[#111114]">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <CardContent className="p-6">
                  <h1 className="text-3xl font-black uppercase mb-2 text-white">
                    {car.make} <span className="text-neutral-500">{car.model}</span>
                  </h1>

                  <div className="mb-8">
                    <p className="text-sm text-neutral-500 font-medium uppercase tracking-wide mb-1">{t.price}</p>
                    <div className="text-4xl font-black text-primary" suppressHydrationWarning>
                      {formatPrice(car.price)}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full h-14 text-lg font-bold border-2 border-green-500 text-green-500 hover:bg-green-500/10 bg-transparent"
                    >
                      <Link href={`https://wa.me/${brand.contact.whatsapp}?text=I'm interested in ${car.make} ${car.model}`} target="_blank">
                        <Phone className="mr-2 h-5 w-5" />
                        {t.contact_whatsapp}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Dealer Info (Mini) */}
              <div className="bg-[#111114] p-6 rounded-xl border border-white/10">
                <div className="font-bold text-lg mb-2 text-white">{brand.identity.name}</div>
                <div className="text-neutral-400 text-sm mb-4">{brand.contact.address}</div>
                <div className="text-neutral-400 text-sm">{brand.contact.workingHours}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        {similarCars.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-bold mb-8 text-white">{t.similar_cars}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarCars.map(similar => (
                <Link key={similar.id} href={locale === 'ru' ? `/ru/inventory/${similar.id}` : `/inventory/${similar.id}`}>
                  <div className="group bg-[#111114] rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image 
                        src={similar.images[0]} 
                        alt={similar.model} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-1 text-white">{similar.make} {similar.model}</h3>
                      <div className="text-primary font-bold">{formatPrice(similar.price)}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

function SpecRow({ label, value, icon: Icon }: { label: string, value: string | number, icon: React.ElementType }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
      <div className="flex items-center gap-3 text-neutral-400">
        <Icon className="h-5 w-5 text-neutral-500" />
        <span className="font-medium">{label}</span>
      </div>
      <span className="font-bold text-white">{value}</span>
    </div>
  );
}
