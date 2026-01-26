'use client';

import { useState, useEffect } from 'react';
import { Car } from '@/lib/cars';
import { CarDetailsTemplate } from './CarDetailsTemplate';
import { Loader2 } from 'lucide-react';
import { getCars } from '@/app/actions';

interface CarDetailsClientWrapperProps {
  id: string;
  initialCar?: Car;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
  locale: 'kz' | 'ru';
}

export function CarDetailsClientWrapper({ id, initialCar, dictionary, locale }: CarDetailsClientWrapperProps) {
  const [car, setCar] = useState<Car | undefined>(initialCar);
  const [isLoading, setIsLoading] = useState(!initialCar);
  const [similarCars, setSimilarCars] = useState<Car[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const allCars = await getCars();

        // If we don't have the car yet, try to find it in the full list
        let currentCar = car;
        if (!currentCar) {
          currentCar = allCars.find(c => c.id === id);
          if (currentCar) {
            setCar(currentCar);
          }
        }

        // Find similar cars based on the (potentially found) car
        if (currentCar) {
          const similar = allCars
            .filter(c => c.id !== currentCar.id && c.bodyType === currentCar.bodyType)
            .slice(0, 3);
          setSimilarCars(similar);
        }
      } catch (error) {
        console.error('Failed to load cars:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id, car]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Автомобиль не найден</h1>
        <p className="text-neutral-500">Возможно, он был удален или ссылка неверна.</p>
        <a href={locale === 'ru' ? '/ru/inventory' : '/inventory'} className="text-primary hover:underline">
          Вернуться в каталог
        </a>
      </div>
    );
  }

  return (
    <CarDetailsTemplate 
      car={car} 
      dictionary={dictionary} 
      locale={locale} 
      similarCars={similarCars.length > 0 ? similarCars : undefined} 
    />
  );
}
