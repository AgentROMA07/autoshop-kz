import { getDictionary } from "@/lib/i18n";
import { Hero } from "@/components/sections/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { FeaturedCars } from "@/components/sections/FeaturedCars";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FAQ } from "@/components/sections/FAQ";
import { ContactSection } from "@/components/sections/ContactSection";
import { getCars } from "@/app/actions";

export default async function Home() {
  const locale = 'kz';
  const dictionary = getDictionary(locale);
  const cars = await getCars();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero dictionary={dictionary} locale={locale} />
      {/* Catalog Preview (FeaturedCars) - only 3 items, no filters */}
      <FeaturedCars dictionary={dictionary} locale={locale} limit={3} showFilters={false} initialCars={cars} />
      <Benefits dictionary={dictionary} />
      <ServicesSection dictionary={dictionary} />
      <HowItWorks dictionary={dictionary} />
      {/* <Testimonials dictionary={dictionary} /> */}
      <FAQ dictionary={dictionary} />
      <ContactSection dictionary={dictionary} />
    </main>
  );
}
