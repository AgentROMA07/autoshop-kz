import { getDictionary } from "@/lib/i18n";
import { FeaturedCars } from "@/components/sections/FeaturedCars";
import { getCars } from "@/app/actions";

export default async function InventoryPage() {
  const locale = 'kz';
  const dictionary = getDictionary(locale);
  const cars = await getCars();

  return (
    <main className="min-h-screen bg-neutral-50">
      <FeaturedCars dictionary={dictionary} locale={locale} initialCars={cars} />
    </main>
  );
}
