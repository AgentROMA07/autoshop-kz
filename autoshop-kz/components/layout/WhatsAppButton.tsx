'use client';

import { Button } from '@/components/ui/Button';
import { getBrandConfig } from '@/lib/brand';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function WhatsAppButton() {
  const brand = getBrandConfig();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after a small delay or scroll
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <span className="absolute -top-2 -right-2 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
      </span>
      
      <Button 
        asChild 
        size="icon" 
        className="h-16 w-16 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 border-4 border-white"
      >
        <Link href={`https://wa.me/${brand.contact.whatsapp}`} target="_blank" aria-label="Chat on WhatsApp">
          <MessageCircle className="h-8 w-8 fill-current" />
        </Link>
      </Button>
      
      {/* Tooltip bubble */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-lg whitespace-nowrap hidden md:block animate-in fade-in slide-in-from-right-4 duration-700 delay-1000">
        <p className="font-bold text-sm text-neutral-900">Online</p>
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 transform"></div>
      </div>
    </div>
  );
}
