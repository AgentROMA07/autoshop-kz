import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getDictionary } from "@/lib/i18n";
import { getBrandConfig } from "@/lib/brand";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: getBrandConfig().meta.title.kz,
  description: getBrandConfig().meta.description.kz,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = 'kz';
  const dictionary = getDictionary(locale);

  return (
    <html lang="kk">
      <body className={inter.className}>
        <Header dictionary={dictionary} locale={locale} />
        {children}
        <WhatsAppButton />
        <Footer dictionary={dictionary} locale={locale} />
      </body>
    </html>
  );
}
