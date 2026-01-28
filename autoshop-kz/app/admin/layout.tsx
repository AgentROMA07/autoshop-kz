import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Admin Panel | Aqylbay",
  description: "Admin dashboard for Aqylbay",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body 
        className={`${inter.className} bg-gray-50 text-gray-900`}
        style={{
          // Override theme variables to match Royal Motors admin style (Orange + Rounded)
          // defined in autoshop-franchise globals.css
          '--primary': '32 100% 50%',       /* Orange #FF8A00 */
          '--primary-foreground': '0 0% 0%',
          '--radius': '1rem',               /* Rounded 16px */
          '--ring': '32 100% 50%',
        } as React.CSSProperties}
      >
        {children}
      </body>
    </html>
  );
}
