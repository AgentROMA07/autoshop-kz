'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Locale, type Dictionary } from '@/lib/i18n';
import { ArrowRight, SortAsc, MessageCircle } from 'lucide-react';
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
    <section className="py-24 bg-background" id="catalog">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-tight">
              {content.title}
            </h2>
            {limit && (
              <p className="text-neutral-400 font-medium text-lg">
                {content.subtitle}
              </p>
            )}
          </div>
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
            
            {/* Sorting */}
            {showFilters && (
              <div className="flex justify-end mb-6">
                 <div className="flex items-center gap-2">
                    <SortAsc className="w-5 h-5 text-primary shrink-0" />
                    <select 
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="px-4 py-2 rounded-xl font-bold text-sm bg-[#16161A] border border-white/10 text-white focus:ring-2 focus:ring-primary outline-none cursor-pointer shadow-sm"
                    >
                        <option value="price_asc">{content.filters?.price_asc || 'Price: Low to High'}</option>
                        <option value="price_desc">{content.filters?.price_desc || 'Price: High to Low'}</option>
                        <option value="year_new">{content.filters?.year_new || 'Year: Newest'}</option>
                        <option value="year_old">{content.filters?.year_old || 'Year: Oldest'}</option>
                    </select>
                </div>
              </div>
            )}

            {/* Cards Grid */}
            <div className={cn(
              "grid gap-8", 
              showFilters ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            )}>
              {displayCars.map((car) => (
                <Card key={car.id} className="group overflow-hidden bg-[#16161A] border border-white/10 rounded-2xl shadow-lg hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-300">
                  {/* Image Area */}
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-neutral-900">
                    <Image 
                      src={car.images[0]} 
                      alt={`${car.make} ${car.model}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                    
                    {/* Hover Overlay with Quick Actions (Desktop) */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                         <Button asChild size="icon" className="h-12 w-12 rounded-full bg-primary text-black hover:bg-[#FFB24A]">
                            <Link href={`https://wa.me/${brand.contact.whatsapp}?text=I'm interested in ${car.make} ${car.model}`} target="_blank">
                                <MessageCircle className="w-6 h-6" />
                            </Link>
                         </Button>
                         <Button asChild size="icon" className="h-12 w-12 rounded-full bg-white text-black hover:bg-neutral-200">
                            <Link href={`${inventoryPath}/${car.id}`}>
                                <ArrowRight className="w-6 h-6" />
                            </Link>
                         </Button>
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4">
                        <Badge className="bg-[#19C37D] text-white hover:bg-[#19C37D] border-none px-3 py-1">
                            {locale === 'ru' ? 'В наличии' : 'Сатылымда'}
                        </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-black/50 backdrop-blur-md border-white/20 text-white px-3 py-1">
                            Trade-in
                        </Badge>
                    </div>

                    {/* Bottom Price */}
                    <div className="absolute bottom-4 left-5 right-5">
                         <p className="text-2xl font-black text-white tracking-tight" suppressHydrationWarning>
                            {formatPrice(car.price)}
                         </p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <CardContent className="p-5">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
                            {car.make} {car.model}
                        </h3>
                        <div className="flex items-center gap-2 text-sm font-medium text-neutral-400">
                            <span suppressHydrationWarning>{car.year}</span>
                            <span className="w-1 h-1 rounded-full bg-neutral-600" />
                            <span suppressHydrationWarning>{car.mileage.toLocaleString()} km</span>
                            <span className="w-1 h-1 rounded-full bg-neutral-600" />
                            <span>{car.engineVolume}L</span>
                        </div>
                    </div>

                    {/* Bottom Buttons */}
                    <div className="grid grid-cols-[1fr_auto] gap-3">
                      <Button asChild variant="outline" className="w-full border-white/10 text-white hover:bg-white hover:text-black transition-colors rounded-xl font-semibold">
                        <Link href={`${inventoryPath}/${car.id}`}>
                          {content.view_details}
                        </Link>
                      </Button>
                      <Button asChild className="aspect-square p-0 bg-[#25D366] hover:bg-[#20b858] text-white rounded-xl border-none">
                        <Link href={`https://wa.me/${brand.contact.whatsapp}?text=I'm interested in ${car.make} ${car.model}`} target="_blank">
                          <MessageCircle className="w-5 h-5" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {displayCars.length === 0 && (
              <div className="text-center py-20 bg-[#16161A] rounded-2xl border border-dashed border-white/10">
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
        
        {/* Bottom "All Catalog" Button */}
        {limit && (
          <div className="mt-16 text-center space-y-3">
            <Button asChild size="lg" className="w-full md:w-auto h-14 px-10 text-base font-bold rounded-xl shadow-[0_0_20px_rgba(255,138,0,0.15)]">
                <Link href={inventoryPath}>
                    {content.all_catalog} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
            <p className="text-sm text-neutral-500 font-medium">
                {content.daily_update}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
