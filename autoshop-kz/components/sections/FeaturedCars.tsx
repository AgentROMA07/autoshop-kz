'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Card, CardContent, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Locale } from '@/lib/i18n';
import { Gauge, Fuel, Zap, ArrowRight, Filter, SortAsc, Settings } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Car } from '@/lib/cars';
import { getBrandConfig } from '@/lib/brand';
  
  interface FeaturedCarsProps {
    dictionary: any;
    locale: Locale;
    limit?: number;
    showFilters?: boolean;
    initialCars?: Car[];
  }
  
  export function FeaturedCars({ dictionary, locale, limit, showFilters = true, initialCars = [] }: FeaturedCarsProps) {
    const content = dictionary.featured;
    const inventoryPath = locale === 'ru' ? '/ru/inventory' : '/inventory';
    const brand = getBrandConfig();
  
    const [cars, setCars] = useState<Car[]>(initialCars);

  useEffect(() => {
    setCars(initialCars);
  }, [initialCars]);

  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('price_asc');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'kk-KZ', {
      style: 'currency',
      currency: 'KZT',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const filteredCars = useMemo(() => {
    let result = [...cars];

    // Filter
    if (filter !== 'all') {
      result = result.filter(car => car.bodyType === filter);
    }

    // Sort
    result.sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      if (sort === 'year_new') return b.year - a.year;
      if (sort === 'year_old') return a.year - b.year;
      return 0;
    });

    return result;
  }, [filter, sort, cars]);

  const displayCars = limit ? filteredCars.slice(0, limit) : filteredCars;

  return (
    <section className="py-24 bg-neutral-50" id="catalog">
      <Container>
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-extrabold text-black uppercase tracking-tight">{content.title}</h2>
            <div className="h-1.5 w-24 bg-primary mt-4 mx-auto md:mx-0 rounded-full"></div>
          </div>
          {limit && (
            <Button asChild variant="outline" size="lg" className="hidden md:inline-flex border-black text-black hover:bg-black hover:text-white rounded-xl px-8 font-bold border-2 transition-all">
              <Link href={inventoryPath}>{content.view_details} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          )}
        </div>

        {/* Filters & Sorting */}
        {showFilters && (
        <div className="flex flex-col md:flex-row gap-4 mb-10 p-4 bg-white rounded-xl shadow-sm border border-neutral-100">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                <Filter className="w-5 h-5 text-primary shrink-0" />
                <button 
                    onClick={() => setFilter('all')}
                    className={cn("px-4 py-2 rounded-xl font-bold text-sm transition-all whitespace-nowrap", filter === 'all' ? "bg-black text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200")}
                >
                    {content.filters?.all || 'All'}
                </button>
                <button 
                    onClick={() => setFilter('sedan')}
                    className={cn("px-4 py-2 rounded-xl font-bold text-sm transition-all whitespace-nowrap", filter === 'sedan' ? "bg-black text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200")}
                >
                    {content.filters?.sedan || 'Sedan'}
                </button>
                <button 
                    onClick={() => setFilter('suv')}
                    className={cn("px-4 py-2 rounded-xl font-bold text-sm transition-all whitespace-nowrap", filter === 'suv' ? "bg-black text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200")}
                >
                    {content.filters?.suv || 'SUV'}
                </button>
            </div>

            <div className="md:ml-auto flex items-center gap-2">
                <SortAsc className="w-5 h-5 text-primary shrink-0" />
                <select 
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="px-4 py-2 rounded-xl font-bold text-sm bg-neutral-100 border-none focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                >
                    <option value="price_asc">{content.filters?.price_asc || 'Price: Low to High'}</option>
                    <option value="price_desc">{content.filters?.price_desc || 'Price: High to Low'}</option>
                    <option value="year_new">{content.filters?.year_new || 'Year: Newest'}</option>
                    <option value="year_old">{content.filters?.year_old || 'Year: Oldest'}</option>
                </select>
            </div>
        </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCars.map((car) => (
            <Card key={car.id} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl bg-white animate-in fade-in zoom-in-95 duration-500">
              {/* Image Container */}
              <div className="aspect-[4/3] w-full relative overflow-hidden bg-neutral-200">
                <Image 
                  src={car.images[0]} 
                  alt={`${car.make} ${car.model}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <CardTitle className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{car.make} {car.model}</CardTitle>
                    <p className="text-neutral-500 text-sm font-medium">{car.year} • {car.bodyType.toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-400 font-medium mb-1">{content.price_from}</p>
                    <p className="text-xl font-black text-primary" suppressHydrationWarning>{formatPrice(car.price)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                   <div className="flex items-center gap-2 text-sm text-neutral-600 bg-neutral-50 p-2 rounded-lg">
                      <Gauge className="w-4 h-4 text-primary" />
                      <span className="font-semibold" suppressHydrationWarning>{car.mileage.toLocaleString(locale === 'ru' ? 'ru-RU' : 'kk-KZ')} km</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-neutral-600 bg-neutral-50 p-2 rounded-lg">
                      <Fuel className="w-4 h-4 text-primary" />
                      <span className="font-semibold capitalize">{car.fuelType}</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-neutral-600 bg-neutral-50 p-2 rounded-lg">
                      <Settings className="w-4 h-4 text-primary" />
                      <span className="font-semibold capitalize">{car.transmission}</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-neutral-600 bg-neutral-50 p-2 rounded-lg">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="font-semibold">{car.engineVolume}L</span>
                   </div>
                </div>

                <div className="flex gap-3">
                  <Button asChild className="flex-1 font-bold bg-neutral-900 text-white hover:bg-black transition-all rounded-xl h-12">
                    <Link href={`${inventoryPath}/${car.id}`}>
                      {content.view_details}
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    variant="outline" 
                    className="flex-1 font-bold border-2 border-primary text-black hover:bg-primary hover:text-black transition-all rounded-xl h-12"
                  >
                    <Link href={`https://wa.me/${brand.contact.whatsapp}?text=I'm interested in ${car.make} ${car.model}`} target="_blank">
                       {locale === 'ru' ? 'Связаться' : 'Байланысу'}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {limit && (
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" className="w-full md:w-auto border-black text-black hover:bg-black hover:text-white rounded-xl px-8 font-bold border-2 transition-all">
                <Link href={inventoryPath}>{content.view_details} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
