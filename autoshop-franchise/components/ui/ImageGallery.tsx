"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#111114] group">
        <Image
          src={images[currentIndex]}
          alt={`${alt} - View ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          priority={currentIndex === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black opacity-0 shadow-lg transition-opacity hover:bg-white group-hover:opacity-100 z-10"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black opacity-0 shadow-lg transition-opacity hover:bg-white group-hover:opacity-100 z-10"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Zoom Button (Visual only for now) */}
        <button
          className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100 z-10"
        >
          <Maximize2 className="h-5 w-5" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-md z-10">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2 md:grid-cols-6 lg:grid-cols-8">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
              currentIndex === index
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            <Image
              src={image}
              alt={`${alt} thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="150px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
