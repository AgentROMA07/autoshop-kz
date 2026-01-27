'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Card, CardContent, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Locale, type Dictionary } from '@/lib/i18n';
import { Gauge, Fuel, Zap, ArrowRight, SortAsc, Settings } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Car } from '@/lib/cars';
import { getBrandConfig } from '@/lib/brand';
import { InventoryFilters } from '@/components/features/InventoryFilters';

interface FeaturedCarsProps {
  dictionary: Dictionary;
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

  const [sort, setSort] = useState('price_asc');
  
  // Advanced filters state
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    yearMin: '',
    yearMax: '',
    priceMin: '',
    priceMax: '',
    bodyTypes: [] as string[],
    condition: 'all',
    fuelTypes: [] as string[],
    transmissions: [] as string[],
    driveTypes: [] as string[],
    engineVolumeRanges: [] as string[]
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'kk-KZ', {
      style: 'currency',
      currency: 'KZT',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const filteredCars = useMemo(() => {
    let result = [...cars];

    // 1. Make & Model
    if (filters.make) {
      result = result.filter(car => car.make === filters.make);
    }
    if (filters.model) {
      result = result.filter(car => car.model === filters.model);
    }

    // 2. Year
    if (filters.yearMin) {
      result = result.filter(car => car.year >= parseInt(filters.yearMin));
    }
    if (filters.yearMax) {
      result = result.filter(car => car.year <= parseInt(filters.yearMax));
    }

    // 3. Price
    if (filters.priceMin) {
      result = result.filter(car => car.price >= parseInt(filters.priceMin));
    }
    if (filters.priceMax) {
      result = result.filter(car => car.price <= parseInt(filters.priceMax));
    }

    // 4. Body Types
    if (filters.bodyTypes.length > 0) {
      result = result.filter(car => filters.bodyTypes.includes(car.bodyType));
    }

    // 5. Condition
    if (filters.condition !== 'all') {
      result = result.filter(car => (car.condition || 'used') === filters.condition);
    }

    // 6. Fuel Types
    if (filters.fuelTypes.length > 0) {
      result = result.filter(car => filters.fuelTypes.includes(car.fuelType));
    }

    // 7. Transmissions
    if (filters.transmissions.length > 0) {
      result = result.filter(car => filters.transmissions.includes(car.transmission));
    }

    // 8. Drive Types
    if (filters.driveTypes.length > 0) {
      result = result.filter(car => filters.driveTypes.includes(car.driveType));
    }

    // 9. Engine Volume
    if (filters.engineVolumeRanges.length > 0 && result.length > 0) {
      result = result.filter(car => {
        if (!car.engineVolume) return false;
        return filters.engineVolumeRanges.some(range => {
          if (range === 'small') return car.engineVolume! <= 1.5;
          if (range === 'medium') return car.engineVolume! >= 1.6 && car.engineVolume! <= 2.4;
          if (range === 'powerful') return car.engineVolume! >= 2.5 && car.engineVolume! <= 3.5;
          if (range === 'large') return car.engineVolume! >= 4.0;
          return false;
        });
      });
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
  }, [filters, sort, cars]);

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

        {/* Layout: Filters Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters (only if showFilters is true) */}
          {showFilters && (
            <div className="w-full lg:w-1/4 shrink-0">
              <InventoryFilters 
                cars={initialCars} 
                locale={locale} 
                onFilterChange={setFilters} 
              />
            </div>
          )}

          {/* Main Content */}
          <div className={cn("w-full", showFilters ? "lg:w-3/4" : "")}>
            
            {/* Sorting (moved here) */}
            {showFilters && (
              <div className="flex justify-end mb-6">
                 <div className="flex items-center gap-2">
                    <SortAsc className="w-5 h-5 text-primary shrink-0" />
                    <select 
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="px-4 py-2 rounded-xl font-bold text-sm bg-white border border-neutral-200 focus:ring-2 focus:ring-primary outline-none cursor-pointer shadow-sm"
                    >
                        <option value="price_asc">{content.filters?.price_asc || 'Price: Low to High'}</option>
                        <option value="price_desc">{content.filters?.price_desc || 'Price: High to Low'}</option>
                        <option value="year_new">{content.filters?.year_new || 'Year: Newest'}</option>
                        <option value="year_old">{content.filters?.year_old || 'Year: Oldest'}</option>
                    </select>
                </div>
              </div>
            )}

            <div className={cn(
              "grid gap-8", 
              showFilters ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            )}>
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
            
            {displayCars.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-neutral-300">
                 <p className="text-xl text-neutral-500">No cars found matching your filters.</p>
                 <Button 
                    variant="link" 
                    className="mt-2 text-primary"
                    onClick={() => setFilters({
                        make: '',
                        model: '',
                        yearMin: '',
                        yearMax: '',
                        priceMin: '',
                        priceMax: '',
                        bodyTypes: [],
                        condition: 'all',
                        fuelTypes: [],
                        transmissions: [],
                        driveTypes: [],
                        engineVolumeRanges: []
                    })}
                 >
                    Clear all filters
                 </Button>
              </div>
            )}
          </div>
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
