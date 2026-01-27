import { getDictionary } from '@/lib/i18n';
import { getCar } from '@/app/actions';
import { CarDetailsClientWrapper } from '@/components/templates/CarDetailsClientWrapper';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const car = await getCar(id);
  
  if (!car) {
    return {
      title: 'Aqylbay auto market',
    };
  }

  return {
    title: `${car.make} ${car.model} | Aqylbay auto market`,
    description: `Сатып алыңыз ${car.year} ${car.make} ${car.model}. Бағасы: ${car.price} KZT. ${car.description.kz.substring(0, 120)}...`,
    openGraph: {
      images: car.images[0] ? [car.images[0]] : [],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await getCar(id);
  const locale = 'kz';
  const dictionary = getDictionary(locale);

  return <CarDetailsClientWrapper id={id} initialCar={car || undefined} dictionary={dictionary} locale={locale} />;
}
