'use client';

import { useState, useEffect, useMemo } from 'react';
import { Car } from '@/lib/cars';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { adminDictionary } from '@/lib/admin-dictionary';
import type { Locale } from '@/lib/i18n';

interface FilterState {
  make: string;
  model: string;
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  bodyTypes: string[];
  condition: string;
  fuelTypes: string[];
  transmissions: string[];
  driveTypes: string[];
  engineVolumeRanges: string[];
}

interface InventoryFiltersProps {
  cars: Car[];
  locale: Locale;
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export function InventoryFilters({ cars, locale, onFilterChange, className }: InventoryFiltersProps) {
  const dict = adminDictionary[locale].form;
  
  // Extract unique values for selects
  const uniqueMakes = useMemo(() => Array.from(new Set(cars.map(c => c.make))).sort(), [cars]);
  
  const [filters, setFilters] = useState<FilterState>({
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
  });

  const [isOpen, setIsOpen] = useState(false);

  // Filter models based on selected make
  const availableModels = useMemo(() => {
    if (!filters.make) return [];
    return Array.from(new Set(cars.filter(c => c.make === filters.make).map(c => c.model))).sort();
  }, [cars, filters.make]);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleCheckboxChange = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[category] as string[];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const toggleBodyType = (type: string) => {
    handleCheckboxChange('bodyTypes', type);
  };

  const engineRanges = [
    { id: 'small', label: '< 1.5L', min: 0, max: 1.5 },
    { id: 'medium', label: '1.6L - 2.4L', min: 1.6, max: 2.4 },
    { id: 'powerful', label: '2.5L - 3.5L', min: 2.5, max: 3.5 },
    { id: 'large', label: '> 4.0L', min: 4.0, max: 10.0 },
  ];

  return (
    <div className={cn("bg-[#111114] p-6 rounded-xl border border-white/10 text-white", className)}>
      <div className="flex items-center justify-between mb-6 md:hidden">
        <h3 className="font-bold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-white hover:bg-white/10">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>

      <div className={cn("space-y-8", isOpen ? "block" : "hidden md:block")}>
        {/* Basic Filters */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg border-b pb-2">Основные</h3>
          
          {/* Make & Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Марка</Label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={filters.make}
                onChange={(e) => setFilters(prev => ({ ...prev, make: e.target.value, model: '' }))}
              >
                <option value="">Все марки</option>
                {uniqueMakes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Модель</Label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={filters.model}
                onChange={(e) => setFilters(prev => ({ ...prev, model: e.target.value }))}
                disabled={!filters.make}
              >
                <option value="">Все модели</option>
                {availableModels.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Condition */}
          <div className="space-y-2">
            <Label>Состояние</Label>
            <div className="flex gap-2">
              <button
                onClick={() => setFilters(prev => ({ ...prev, condition: 'all' }))}
                className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors border", filters.condition === 'all' ? "bg-black text-white border-black" : "bg-white text-neutral-600 hover:bg-neutral-50")}
              >
                Все
              </button>
              <button
                onClick={() => setFilters(prev => ({ ...prev, condition: 'new' }))}
                className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors border", filters.condition === 'new' ? "bg-black text-white border-black" : "bg-white text-neutral-600 hover:bg-neutral-50")}
              >
                Новые
              </button>
              <button
                onClick={() => setFilters(prev => ({ ...prev, condition: 'used' }))}
                className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors border", filters.condition === 'used' ? "bg-black text-white border-black" : "bg-white text-neutral-600 hover:bg-neutral-50")}
              >
                С пробегом
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label>Цена (₸)</Label>
            <div className="flex gap-2 items-center">
              <Input 
                type="number" 
                placeholder="От" 
                value={filters.priceMin}
                onChange={(e) => setFilters(prev => ({ ...prev, priceMin: e.target.value }))}
              />
              <span>-</span>
              <Input 
                type="number" 
                placeholder="До" 
                value={filters.priceMax}
                onChange={(e) => setFilters(prev => ({ ...prev, priceMax: e.target.value }))}
              />
            </div>
          </div>

          {/* Year */}
          <div className="space-y-2">
            <Label>Год выпуска</Label>
            <div className="flex gap-2 items-center">
              <Input 
                type="number" 
                placeholder="От" 
                value={filters.yearMin}
                onChange={(e) => setFilters(prev => ({ ...prev, yearMin: e.target.value }))}
              />
              <span>-</span>
              <Input 
                type="number" 
                placeholder="До" 
                value={filters.yearMax}
                onChange={(e) => setFilters(prev => ({ ...prev, yearMax: e.target.value }))}
              />
            </div>
          </div>

          {/* Body Type */}
          <div className="space-y-2">
            <Label>Тип кузова</Label>
            <div className="flex flex-wrap gap-2">
              {(['sedan','suv','hatchback','coupe','wagon','minivan','pickup'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => toggleBodyType(type)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors capitalize",
                    filters.bodyTypes.includes(type)
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300"
                  )}
                >
                  {dict.bodyTypes[type] || type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Filters */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg border-b pb-2">Технические характеристики</h3>
          
          {/* Fuel Type */}
          <div className="space-y-2">
            <Label>Тип топлива</Label>
            <div className="grid grid-cols-2 gap-2">
              {(['petrol','diesel','gas','hybrid','electric'] as const).map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={filters.fuelTypes.includes(type)}
                    onChange={() => handleCheckboxChange('fuelTypes', type)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{dict.fuelTypes[type] || type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div className="space-y-2">
            <Label>Коробка передач</Label>
            <div className="grid grid-cols-2 gap-2">
              {(['automatic','manual','robot','cvt'] as const).map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={filters.transmissions.includes(type)}
                    onChange={() => handleCheckboxChange('transmissions', type)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">
                    {dict.transmissions[(type === 'cvt' ? 'variator' : type) as 'automatic' | 'manual' | 'robot' | 'variator'] || type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Drive Type */}
          <div className="space-y-2">
            <Label>Привод</Label>
            <div className="grid grid-cols-2 gap-2">
              {(['fwd','rwd','awd'] as const).map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={filters.driveTypes.includes(type)}
                    onChange={() => handleCheckboxChange('driveTypes', type)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{dict.driveTypes[type] || type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Engine Volume */}
          <div className="space-y-2">
            <Label>Объем двигателя</Label>
            <div className="grid grid-cols-1 gap-2">
              {engineRanges.map((range) => (
                <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={filters.engineVolumeRanges.includes(range.id)}
                    onChange={() => handleCheckboxChange('engineVolumeRanges', range.id)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{range.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full"
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
          Сбросить фильтры
        </Button>
      </div>
    </div>
  );
}
