'use client';

import { useState, useEffect } from 'react';
import { Car } from '@/lib/cars';
import { CarForm } from './CarForm';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, LogOut } from 'lucide-react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { getCars, createCar, updateCar, deleteCar } from '@/app/actions';
import { adminDictionary } from '@/lib/admin-dictionary';

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [inventory, setInventory] = useState<Car[]>([]);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'ru' | 'kz'>('ru');

  const dict = adminDictionary[lang];

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getCars();
        setInventory(data);
      } catch (error) {
        console.error('Failed to load inventory:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSaveCar = async (car: Car) => {
    let success = false;
    if (editingCar) {
      success = await updateCar(car);
      if (success) {
        setInventory(inventory.map(c => c.id === car.id ? car : c));
      }
    } else {
      success = await createCar(car);
      if (success) {
        setInventory([car, ...inventory]);
      }
    }
    
    if (success) {
      setView('list');
      setEditingCar(null);
    } else {
      alert(dict.saveError);
    }
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setView('edit');
  };

  const handleDelete = async (id: string) => {
    if (confirm(dict.deleteConfirm)) {
      const success = await deleteCar(id);
      if (success) {
        setInventory(inventory.filter(c => c.id !== id));
      } else {
        alert(dict.deleteError);
      }
    }
  };

  if (view === 'add' || view === 'edit') {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{view === 'edit' ? dict.editCar : dict.addCarTitle}</h1>
          <Button variant="ghost" onClick={() => { setView('list'); setEditingCar(null); }}>{dict.backToList}</Button>
        </div>
        <CarForm 
          initialData={editingCar || undefined} 
          onSave={handleSaveCar} 
          onCancel={() => { setView('list'); setEditingCar(null); }} 
          lang={lang}
          dict={dict}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">{dict.dashboard}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-1 mr-2">
              <button 
                onClick={() => setLang('ru')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${lang === 'ru' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              >
                RU
              </button>
              <button 
                onClick={() => setLang('kz')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${lang === 'kz' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              >
                KZ
              </button>
            </div>
            <Button onClick={() => setView('add')} className="gap-2">
              <Plus className="h-4 w-4" /> {dict.addCar}
            </Button>
            <Button variant="outline" onClick={onLogout} className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="h-4 w-4" /> {dict.logout}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">{dict.inventory} ({inventory.length})</h2>
          </div>
          
          <div className="divide-y">
            {inventory.length === 0 && !loading ? (
               <div className="p-8 text-center text-gray-500">
                 {dict.noCars}
               </div>
            ) : null}
            
            {loading ? (
               <div className="p-8 text-center text-gray-500">
                 {dict.loading}
               </div>
            ) : null}

            {inventory.map((car) => (
              <div key={car.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                <div className="h-20 w-32 relative rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  <Image 
                    src={car.images[0]} 
                    alt={car.model}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg truncate">{car.make} {car.model}</h3>
                  <div className="text-sm text-gray-500 flex gap-4 mt-1">
                    <span>{car.year}</span>
                    <span>•</span>
                    <span>{formatPrice(car.price)}</span>
                    <span>•</span>
                    <span>{car.mileage.toLocaleString()} км</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={() => handleEdit(car)}
                  >
                    {dict.edit}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(car.id)}
                    title={dict.delete}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
